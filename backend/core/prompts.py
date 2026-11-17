"""Prompt text sent to the persona agents and to the Judge."""

from __future__ import annotations


def opening_prompt(question: str, persona: dict) -> str:
    return (
        f"Debate question: {question.strip()}\n\n"
        f"Give your opening position as the {persona['label']} advocate."
    )


def judge_prompt(question: str, transcripts: dict[str, str], labels: dict[str, str]) -> str:
    parts = [f"Debate question: {question.strip()}", ""]
    for persona_id, text in transcripts.items():
        label = labels.get(persona_id, persona_id)
        parts.append(f"=== {label} advocate ===")
        parts.append(text.strip() or "(said nothing)")
        parts.append("")
    parts.append("Write the decision record as the JSON object described in your instructions.")
    return "\n".join(parts)
