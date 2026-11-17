"""GET /personas: the debate voices, in display order."""

from __future__ import annotations

from ..core.http import reply
from ..core.personas import load_personas
from ..core.route import Route


async def list_personas(request, ctx):
    return reply({"personas": load_personas()})


ROUTES = [Route("GET", "/personas", list_personas)]
