"""GET /decisions lists saved decisions; GET /decisions/{decision_id} reads one;
DELETE /decisions/{decision_id} removes one."""

from __future__ import annotations

from ..core.http import error, reply
from ..core.route import Route
from ..core.store import DEBATE_PREFIX, DECISION_PREFIX, Store


async def list_decisions(request, ctx):
    return reply({"decisions": Store(ctx.storage).list_decisions()})


async def get_decision(request, ctx):
    decision = Store(ctx.storage).get_decision(request.match_info["decision_id"])
    if decision is None:
        return error("No such decision.", 404, "not_found")
    return reply({"decision": decision})


async def delete_decision(request, ctx):
    decision_id = request.match_info.get("decision_id", "")
    # Ids are short hex strings; refuse anything else before touching storage.
    if not decision_id or len(decision_id) > 64 or not decision_id.isalnum():
        return error("No such decision.", 404, "not_found")
    store = Store(ctx.storage)
    decision = store.get_decision(decision_id)
    if decision is None:
        return error("No such decision.", 404, "not_found")
    ctx.storage.delete(DECISION_PREFIX + decision_id)
    debate = store.get_debate(str(decision.get("debate_id", "")))
    if debate is not None and debate.get("decision_id") == decision_id:
        debate["decision_id"] = None
        ctx.storage.set(DEBATE_PREFIX + debate["id"], debate)
    return reply({"deleted": decision_id})


ROUTES = [
    Route("GET", "/decisions", list_decisions),
    Route("GET", "/decisions/{decision_id}", get_decision),
    Route("DELETE", "/decisions/{decision_id}", delete_decision),
]
