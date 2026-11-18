"""GET /decisions/{decision_id}/markdown: one decision as a Markdown file."""

from __future__ import annotations

from ..core.export import to_markdown
from ..core.http import error, reply
from ..core.route import Route
from ..core.store import Store


async def export_markdown(request, ctx):
    decision = Store(ctx.storage).get_decision(request.match_info["decision_id"])
    if decision is None:
        return error("No such decision.", 404, "not_found")
    return reply({"filename": f"decision-{decision['id']}.md", "markdown": to_markdown(decision)})


ROUTES = [Route("GET", "/decisions/{decision_id}/markdown", export_markdown)]
