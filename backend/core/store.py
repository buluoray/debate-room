"""Saved debates and decisions, on top of the app's own key-value storage.

``storage`` is Kiro Crew's ``ctx.storage`` (``get``, ``set``, ``delete``,
``list_keys``). Tests pass a dict-backed fake.
"""

from __future__ import annotations

import uuid
from datetime import datetime, timezone

DEBATE_PREFIX = "debate-"
DECISION_PREFIX = "decision-"


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def new_id() -> str:
    return uuid.uuid4().hex[:12]


class Store:
    def __init__(self, storage):
        self.storage = storage

    # Debates -------------------------------------------------------------
    def create_debate(self, question: str, slots: dict[str, str], debate_id: str | None = None) -> dict:
        debate = {
            "id": debate_id or new_id(),
            "question": question,
            "slots": slots,
            "created_at": now_iso(),
            "decision_id": None,
        }
        self.storage.set(DEBATE_PREFIX + debate["id"], debate)
        return debate

    def get_debate(self, debate_id: str) -> dict | None:
        value = self.storage.get(DEBATE_PREFIX + debate_id)
        return value if isinstance(value, dict) else None

    # Decisions -----------------------------------------------------------
    def save_decision(self, debate: dict, record: dict) -> dict:
        decision = {
            "id": new_id(),
            "debate_id": debate["id"],
            "question": debate["question"],
            "created_at": now_iso(),
            **record,
        }
        self.storage.set(DECISION_PREFIX + decision["id"], decision)
        debate["decision_id"] = decision["id"]
        self.storage.set(DEBATE_PREFIX + debate["id"], debate)
        return decision

    def get_decision(self, decision_id: str) -> dict | None:
        value = self.storage.get(DECISION_PREFIX + decision_id)
        return value if isinstance(value, dict) else None

    def list_decisions(self) -> list[dict]:
        decisions = []
        for key in self.storage.list_keys():
            if key.startswith(DECISION_PREFIX):
                value = self.storage.get(key)
                if isinstance(value, dict):
                    decisions.append(value)
        decisions.sort(key=lambda d: d.get("created_at", ""), reverse=True)
        return decisions
