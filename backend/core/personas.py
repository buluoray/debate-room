"""Persona registry.

Each persona is one JSON file in ``backend/personas/``. Adding a persona is a
new JSON file plus its agent file in ``agents/`` (listed in ``app.json``).
"""

from __future__ import annotations

import json
from pathlib import Path

PERSONAS_DIR = Path(__file__).resolve().parent.parent / "personas"
REQUIRED = ("id", "label", "agent")


def load_personas(directory: Path = PERSONAS_DIR) -> list[dict]:
    personas = []
    for path in sorted(directory.glob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        if all(data.get(k) for k in REQUIRED) and data.get("enabled", True) is not False:
            personas.append(data)
    personas.sort(key=lambda p: p.get("order", 99))
    return personas


def get_persona(persona_id: str, directory: Path = PERSONAS_DIR) -> dict | None:
    for persona in load_personas(directory):
        if persona["id"] == persona_id:
            return persona
    return None
