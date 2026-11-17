"""Test doubles for the parts of Kiro Crew the backend uses."""

from __future__ import annotations

import asyncio
import json


class FakeStorage:
    """Dict-backed stand-in for ``ctx.storage``."""

    def __init__(self):
        self.data = {}

    def get(self, key):
        return self.data.get(key)

    def set(self, key, value):
        self.data[key] = json.loads(json.dumps(value))

    def delete(self, key):
        return self.data.pop(key, None) is not None

    def list_keys(self):
        return list(self.data)


class FakeTurns:
    def __init__(self, answer='{"choice": "Postgres", "why": "Simple.", "risks": ["ops"]}'):
        self.answer = answer
        self.calls = []

    async def run(self, key, text, *, agent="", timeout_secs=None):
        self.calls.append({"key": key, "text": text, "agent": agent})
        return self.answer


class FakeCtx:
    def __init__(self, turns=None):
        self.name = "debate-room"
        self.storage = FakeStorage()
        self.turns = turns


class FakeRequest:
    def __init__(self, body=None, match_info=None):
        self._body = body
        self.match_info = match_info or {}

    async def json(self):
        if self._body is None:
            raise ValueError("no body")
        return self._body


def call(handler, request, ctx):
    """Run an async route handler and return (status, data)."""
    result = asyncio.run(handler(request, ctx))
    if hasattr(result, "data"):
        return result.status, result.data
    return result.status, json.loads(result.text)
