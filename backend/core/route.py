"""The route object Kiro Crew's hook loader reads (method, path, handler)."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Callable


@dataclass(frozen=True)
class Route:
    method: str
    path: str
    handler: Callable[..., Any]
