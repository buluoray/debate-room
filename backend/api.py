"""Route registry for Debate Room.

Every module in ``backend/routes/`` that defines a ``ROUTES`` list is picked up
here, so a new endpoint is a new file and this file never changes.
Kiro Crew mounts each route under ``/api/apps/debate-room/``.
"""

from __future__ import annotations

import importlib
from pathlib import Path

ROUTES_DIR = Path(__file__).resolve().parent / "routes"


def route_module_names() -> list[str]:
    """Names of the route modules, in a stable order."""
    return sorted(
        p.stem for p in ROUTES_DIR.glob("*.py") if not p.stem.startswith("_")
    )


def register_routes(ctx):
    routes = []
    for name in route_module_names():
        module = importlib.import_module(f"{__package__}.routes.{name}")
        routes.extend(getattr(module, "ROUTES", []))
    return routes
