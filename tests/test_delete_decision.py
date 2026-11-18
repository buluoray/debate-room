import unittest

from backend.core.store import Store
from backend.routes import decisions
from tests.fakes import FakeCtx, FakeRequest, call


class DeleteDecisionTest(unittest.TestCase):
    def setUp(self):
        self.ctx = FakeCtx()
        store = Store(self.ctx.storage)
        self.debate = store.create_debate("Tabs or spaces?", {})
        self.decision = store.save_decision(self.debate, {"choice": "Tabs"})

    def delete(self, decision_id):
        return call(decisions.delete_decision, FakeRequest(match_info={"decision_id": decision_id}), self.ctx)

    def test_delete_removes_decision_and_clears_debate(self):
        status, data = self.delete(self.decision["id"])
        self.assertEqual(status, 200)
        self.assertEqual(data, {"deleted": self.decision["id"]})
        store = Store(self.ctx.storage)
        self.assertIsNone(store.get_decision(self.decision["id"]))
        self.assertIsNone(store.get_debate(self.debate["id"])["decision_id"])

    def test_unknown_or_bad_id_is_404(self):
        for bad in ["nope", "", "../x"]:
            status, data = self.delete(bad)
            self.assertEqual(status, 404)
            self.assertEqual(data["code"], "not_found")
            self.assertIn("error", data)


if __name__ == "__main__":
    unittest.main()
