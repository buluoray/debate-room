import unittest

from backend.core.store import Store
from tests.fakes import FakeStorage


class StoreTest(unittest.TestCase):
    def test_save_decision_links_debate(self):
        store = Store(FakeStorage())
        debate = store.create_debate("Q?", {"cost": "s"})
        decision = store.save_decision(debate, {"choice": "A", "why": "w", "risks": []})
        self.assertEqual(store.get_debate(debate["id"])["decision_id"], decision["id"])
        self.assertEqual(store.get_decision(decision["id"])["question"], "Q?")

    def test_list_decisions_newest_first(self):
        storage = FakeStorage()
        # Save the older one first so key order alone cannot pass the test.
        storage.set("decision-old", {"id": "old", "created_at": "2026-01-01T00:00:00Z"})
        storage.set("decision-new", {"id": "new", "created_at": "2026-02-01T00:00:00Z"})
        store = Store(storage)
        self.assertEqual([d["id"] for d in store.list_decisions()], ["new", "old"])
        self.assertEqual([d["id"] for d in store.list_decisions(limit=1)], ["new"])


if __name__ == "__main__":
    unittest.main()
