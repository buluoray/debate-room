"""GET /stats: how many debates were started and how many were decided."""

from __future__ import annotations

from ..core.http import reply
from ..core.route import Route
from ..core.store import DEBATE_PREFIX, DECISION_PREFIX

async def stats(request, ctx):
    keys = ctx.storage.list_keys()
    debates = sum(1 for k in keys if k.startswith(DEBATE_PREFIX))
    decisions = sum(1 for k in keys if k.startswith(DECISION_PREFIX))
    return reply({"debates": debates, "decisions": decisions})


ROUTES = [Route("GET", "/stats", stats)]
