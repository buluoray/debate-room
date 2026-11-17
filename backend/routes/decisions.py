"""GET /decisions lists saved decisions; GET /decisions/{decision_id} reads one."""

from __future__ import annotations

from ..core.http import error, reply
from ..core.route import Route
from ..core.store import Store


async def list_decisions(request, ctx):
    return reply({"decisions": Store(ctx.storage).list_decisions()})


async def get_decision(request, ctx):
    decision = Store(ctx.storage).get_decision(request.match_info["decision_id"])
    if decision is None:
        return error("No such decision.", 404, "not_found")
    return reply({"decision": decision})


ROUTES = [
    Route("GET", "/decisions", list_decisions),
    Route("GET", "/decisions/{decision_id}", get_decision),
]
