import unittest

from backend.routes import history, stats
from tests.fakes import FakeCtx, FakeRequest, call


class HistoryStatsTest(unittest.TestCase):
    def test_history_rejects_a_bad_limit(self):
        status, _ = call(history.history, FakeRequest(query={"limit": "abc"}), FakeCtx())
        self.assertEqual(status, 400)

    def test_history_reports_the_limit_it_used(self):
        status, data = call(history.history, FakeRequest(query={"limit": "500"}), FakeCtx())
        self.assertEqual(status, 200)
        self.assertEqual(data["limit"], 100)

    def test_history_returns_exactly_limit_decisions(self):
        ctx = FakeCtx()
        for i in range(3):
            ctx.storage.set(f"decision-{i}", {"id": str(i), "created_at": f"2026-01-0{i + 1}"})
        for limit, want in (("1", 1), ("2", 2), ("3", 3), ("5", 3)):
            _, data = call(history.history, FakeRequest(query={"limit": limit}), ctx)
            self.assertEqual(len(data["decisions"]), want, f"limit={limit}")

    def test_stats_counts_debates(self):
        ctx = FakeCtx()
        ctx.storage.set("debate-a", {"id": "a"})
        ctx.storage.set("debate-b", {"id": "b"})
        _, data = call(stats.stats, FakeRequest(), ctx)
        self.assertEqual(data["debates"], 2)

    def test_stats_counts_decisions_apart_from_debates(self):
        ctx = FakeCtx()
        ctx.storage.set("debate-a", {"id": "a", "decision_id": "x"})
        ctx.storage.set("debate-b", {"id": "b", "decision_id": None})
        ctx.storage.set("decision-x", {"id": "x"})
        _, data = call(stats.stats, FakeRequest(), ctx)
        self.assertEqual(data["debates"], 2)
        self.assertEqual(data["decisions"], 1)

    def test_stats_with_no_data(self):
        _, data = call(stats.stats, FakeRequest(), FakeCtx())
        self.assertEqual(data, {"debates": 0, "decisions": 0})


if __name__ == "__main__":
    unittest.main()
