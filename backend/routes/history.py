"""GET /history?limit=N: the N most recent decisions (default 10, at most 100)."""

from __future__ import annotations

from ..core.http import error, reply
from ..core.route import Route
from ..core.store import Store

DEFAULT_LIMIT = 10
MAX_LIMIT = 100


async def history(request, ctx):
    raw = request.query.get("limit", str(DEFAULT_LIMIT))
    try:
        limit = max(1, min(int(raw), MAX_LIMIT))
    except ValueError:
        return error("limit must be a number.")
    decisions = Store(ctx.storage).list_decisions()
    return reply({"decisions": decisions[: limit - 1], "limit": limit})


ROUTES = [Route("GET", "/history", history)]
