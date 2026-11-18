import unittest

from backend.routes import debates, decide, decisions, personas
from tests.fakes import FakeCtx, FakeRequest, FakeTurns, call


class DebateRoutesTest(unittest.TestCase):
    def setUp(self):
        self.ctx = FakeCtx(turns=FakeTurns())

    def start(self, question="Postgres or DynamoDB for a 2-person startup?"):
        return call(debates.start_debate, FakeRequest({"question": question}), self.ctx)

    def test_start_debate_plans_one_session_per_persona(self):
        status, data = self.start()
        self.assertEqual(status, 200)
        plan = data["plan"]
        self.assertEqual(set(plan), {"security", "cost", "speed", "compliance"})
        debate_id = data["debate"]["id"]
        self.assertEqual(plan["cost"]["slot"], f"debate-room-{debate_id}-cost")
        self.assertEqual(plan["cost"]["agent"], "cost")
        self.assertIn("Postgres or DynamoDB", plan["speed"]["prompt"])

    def test_empty_question_is_refused(self):
        status, _ = self.start("   ")
        self.assertEqual(status, 400)

    def test_get_debate(self):
        _, data = self.start()
        debate_id = data["debate"]["id"]
        status, got = call(debates.get_debate, FakeRequest(match_info={"debate_id": debate_id}), self.ctx)
        self.assertEqual(status, 200)
        self.assertEqual(got["debate"]["question"], data["debate"]["question"])
        status, _ = call(debates.get_debate, FakeRequest(match_info={"debate_id": "nope"}), self.ctx)
        self.assertEqual(status, 404)

    def test_decide_saves_a_decision_that_is_listed(self):
        _, data = self.start()
        debate_id = data["debate"]["id"]
        body = {"transcripts": {"security": "Use Postgres.", "cost": "Dynamo.", "speed": "Postgres."}}
        status, out = call(decide.decide, FakeRequest(body, {"debate_id": debate_id}), self.ctx)
        self.assertEqual(status, 200)
        self.assertEqual(out["decision"]["choice"], "Postgres")
        self.assertEqual(self.ctx.turns.calls[0]["agent"], "judge")
        self.assertIn("Security advocate", self.ctx.turns.calls[0]["text"])
        _, listed = call(decisions.list_decisions, FakeRequest(), self.ctx)
        self.assertEqual([d["id"] for d in listed["decisions"]], [out["decision"]["id"]])

    def test_decide_needs_some_text(self):
        _, data = self.start()
        req = FakeRequest({"transcripts": {"security": " "}}, {"debate_id": data["debate"]["id"]})
        status, _ = call(decide.decide, req, self.ctx)
        self.assertEqual(status, 400)

    def test_personas_route(self):
        status, data = call(personas.list_personas, FakeRequest(), self.ctx)
        self.assertEqual(status, 200)
        ids = [p["id"] for p in data["personas"]]
        self.assertEqual(ids, ["security", "cost", "speed", "compliance"])


if __name__ == "__main__":
    unittest.main()
