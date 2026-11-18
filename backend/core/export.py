"""Render a decision record as Markdown, for the Export button."""

from __future__ import annotations


def to_markdown(decision: dict) -> str:
    lines = [
        f"# Decision: {decision.get('choice', '')}",
        "",
        f"**Question:** {decision.get('question', '')}",
        f"**Decided:** {decision.get('created_at', '')}",
        "",
        "## Why",
        "",
        str(decision.get("why", "")),
        "",
        "## Risks",
        "",
    ]
    risks = decision.get("risks") or []
    if not risks:
        lines.append("None named.")
    for number, risk in enumerate(risks):
        lines.append(f"{number}. {risk}")
    return "\n".join(lines) + "\n"
