"""POST /debates starts a debate; GET /debates/{debate_id} reads one.

The page creates the three chat sessions itself (through the dashboard chat
API, so ``ChatEmbed`` can show them). This route picks the session names and
the opening prompt for each persona, and saves the debate.
"""

from __future__ import annotations

from ..core.http import error, read_json, reply
from ..core.personas import load_personas
from ..core.prompts import opening_prompt
from ..core.route import Route
from ..core.store import Store, new_id

MAX_QUESTION = 2000
MIN_QUESTION = 10


def plan_debate(question: str, personas: list[dict], debate_id: str) -> dict:
    """The session name, agent and opening prompt for each persona."""
    return {
        p["id"]: {
            "slot": f"debate-room-{debate_id}-{p['id']}",
            "agent": p["agent"],
            "title": f"{p['label']}: {question[:48]}",
            "prompt": opening_prompt(question, p),
        }
        for p in personas
    }


async def start_debate(request, ctx):
    body = await read_json(request)
    question = str(body.get("question") or "").strip()
    if not question:
        return error("Write a question first.")
    if len(question) < MIN_QUESTION:
        return error(f"Ask a full question (at least {MIN_QUESTION} characters).")
    if len(question) > MAX_QUESTION:
        return error(f"Keep the question under {MAX_QUESTION} characters.")
    debate_id = new_id()
    plan = plan_debate(question, load_personas(), debate_id)
    slots = {pid: item["slot"] for pid, item in plan.items()}
    debate = Store(ctx.storage).create_debate(question, slots, debate_id)
    return reply({"debate": debate, "plan": plan})


async def get_debate(request, ctx):
    debate = Store(ctx.storage).get_debate(request.match_info["debate_id"])
    if debate is None:
        return error("No such debate.", 404, "not_found")
    return reply({"debate": debate})


ROUTES = [
    Route("POST", "/debates", start_debate),
    Route("GET", "/debates/{debate_id}", get_debate),
]
