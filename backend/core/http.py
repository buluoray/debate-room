"""Small helpers shared by the route handlers."""

from __future__ import annotations

import json
from typing import Any


class PlainReply:
    """What ``reply`` returns when aiohttp is not installed (unit tests)."""

    def __init__(self, data: Any, status: int):
        self.data = data
        self.status = status


def reply(data: Any, status: int = 200):
    try:
        from aiohttp import web  # provided by the Kiro Crew gateway
    except ImportError:
        return PlainReply(data, status)
    return web.json_response(data, status=status)


def error(message: str, status: int = 400, code: str = "bad_request"):
    return reply({"error": message, "code": code}, status=status)


async def read_json(request) -> dict:
    try:
        body = await request.json()
    except (ValueError, json.JSONDecodeError):
        return {}
    return body if isinstance(body, dict) else {}
