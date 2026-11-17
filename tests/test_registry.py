import unittest

from backend import api
from backend.core.personas import load_personas


class RegistryTest(unittest.TestCase):
    def test_every_route_module_is_discovered(self):
        names = api.route_module_names()
        for expected in ("debates", "decide", "decisions", "personas"):
            self.assertIn(expected, names)

    def test_register_routes_returns_method_path_handler(self):
        routes = api.register_routes(ctx=None)
        paths = {(r.method, r.path) for r in routes}
        self.assertIn(("POST", "/debates"), paths)
        self.assertIn(("POST", "/debates/{debate_id}/decide"), paths)
        self.assertIn(("GET", "/decisions"), paths)
        for r in routes:
            self.assertTrue(callable(r.handler))

    def test_personas_are_loaded_in_order(self):
        ids = [p["id"] for p in load_personas()]
        self.assertEqual(ids[:3], ["security", "cost", "speed"])
        for p in load_personas():
            self.assertEqual(p["agent"], p["id"])


if __name__ == "__main__":
    unittest.main()
