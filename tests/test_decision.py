import unittest

from backend.core.decision import parse_decision


class ParseDecisionTest(unittest.TestCase):
    def test_plain_json(self):
        d = parse_decision('{"choice": "DynamoDB", "why": "Cheap.", "risks": ["lock-in"]}')
        self.assertEqual(d, {"choice": "DynamoDB", "why": "Cheap.", "risks": ["lock-in"]})

    def test_fenced_json_with_prose(self):
        d = parse_decision('Here you go:\n```json\n{"choice": "Postgres", "why": "x", "risks": "ops load"}\n```')
        self.assertEqual(d["choice"], "Postgres")
        self.assertEqual(d["risks"], ["ops load"])

    def test_not_json_keeps_text(self):
        d = parse_decision("I pick Postgres because it is simple.")
        self.assertEqual(d["choice"], "No clear choice")
        self.assertIn("Postgres", d["why"])
        self.assertEqual(d["risks"], [])


if __name__ == "__main__":
    unittest.main()
