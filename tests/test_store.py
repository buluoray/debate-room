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


if __name__ == "__main__":
    unittest.main()
