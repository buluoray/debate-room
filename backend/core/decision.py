"""Turn the Judge's reply into a decision record."""

from __future__ import annotations

import json
import re

_FENCE = re.compile(r"^```(?:json)?\s*|\s*```$", re.MULTILINE)


def _first_json_object(text: str) -> dict | None:
    cleaned = _FENCE.sub("", text.strip())
    start = cleaned.find("{")
    end = cleaned.rfind("}")
    if start == -1 or end <= start:
        return None
    try:
        data = json.loads(cleaned[start : end + 1])
    except json.JSONDecodeError:
        return None
    return data if isinstance(data, dict) else None


def parse_decision(reply: str) -> dict:
    """Read ``choice``, ``why`` and ``risks`` from the Judge's reply.

    A reply that is not JSON still gives a record: the whole text becomes ``why``.
    """
    data = _first_json_object(reply) or {}
    risks = data.get("risks") or []
    if isinstance(risks, str):
        risks = [risks]
    return {
        "choice": str(data.get("choice") or "No clear choice").strip(),
        "why": str(data.get("why") or reply).strip(),
        "risks": [str(r).strip() for r in risks if str(r).strip()],
    }
