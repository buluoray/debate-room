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

    def test_stats_counts_debates(self):
        ctx = FakeCtx()
        ctx.storage.set("debate-a", {"id": "a"})
        ctx.storage.set("debate-b", {"id": "b"})
        _, data = call(stats.stats, FakeRequest(), ctx)
        self.assertEqual(data["debates"], 2)


if __name__ == "__main__":
    unittest.main()
