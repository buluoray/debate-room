"""POST /debates/{debate_id}/decide: the Judge reads the debate and decides.

Body: ``{"transcripts": {"<persona id>": "<what that agent said>"}}``.
"""

from __future__ import annotations

import asyncio

from ..core.decision import parse_decision
from ..core.http import error, read_json, reply
from ..core.personas import load_personas
from ..core.prompts import judge_prompt
from ..core.route import Route
from ..core.store import Store

# kiro-cli knows an app agent by the name its file declares ("judge"); the
# namespaced form is the file name Kiro Crew registers it under.
JUDGE_AGENTS = ("judge", "debate-room--judge")
JUDGE_TIMEOUT_SECS = 240


async def run_judge(turns, key: str, prompt: str) -> str:
    """Run the Judge, trying each spelling of its agent name once."""
    refusal: PermissionError | None = None
    for agent in JUDGE_AGENTS:
        try:
            return await turns.run(key, prompt, agent=agent, timeout_secs=JUDGE_TIMEOUT_SECS)
        except PermissionError as exc:  # AgentTurnRefused: this name is not allowed
            refusal = exc
    raise refusal or PermissionError("no judge agent")


async def decide(request, ctx):
    store = Store(ctx.storage)
    debate = store.get_debate(request.match_info["debate_id"])
    if debate is None:
        return error("No such debate.", 404, "not_found")
    turns = getattr(ctx, "turns", None)
    if turns is None:
        return error("Agent turns are not available on this Kiro Crew.", 503, "no_turns")
    body = await read_json(request)
    transcripts = body.get("transcripts") or {}
    if not isinstance(transcripts, dict) or not any(str(v).strip() for v in transcripts.values()):
        return error("Nothing to judge yet: wait for the agents to reply.")
    labels = {p["id"]: p["label"] for p in load_personas()}
    prompt = judge_prompt(debate["question"], {k: str(v) for k, v in transcripts.items()}, labels)
    try:
        answer = await run_judge(turns, f"debate-room-judge-{debate['id']}", prompt)
    except asyncio.TimeoutError:
        return error("The Judge took too long. Try Decide again.", 504, "judge_timeout")
    except PermissionError as exc:
        return error(f"Kiro Crew refused the Judge: {exc}", 403, "judge_refused")
    decision = store.save_decision(debate, parse_decision(answer or ""))
    return reply({"decision": decision})


ROUTES = [Route("POST", "/debates/{debate_id}/decide", decide)]
