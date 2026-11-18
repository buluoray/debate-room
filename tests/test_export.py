import unittest

from backend.core.export import to_markdown


class ExportTest(unittest.TestCase):
    def test_markdown_has_choice_question_and_sections(self):
        md = to_markdown({"choice": "Postgres", "question": "Which DB?", "why": "Simple.", "risks": [],
                          "created_at": "2026-11-18T09:00:00+00:00"})
        self.assertTrue(md.startswith("# Decision: Postgres\n"))
        self.assertIn("**Question:** Which DB?", md)
        self.assertIn("## Why\n\nSimple.", md)
        self.assertIn("## Risks\n\nNone named.", md)

    def test_risks_are_numbered_from_one(self):
        md = to_markdown({"choice": "X", "risks": ["Lock-in", "Ops load"]})
        self.assertIn("## Risks\n\n1. Lock-in\n2. Ops load\n", md)
        self.assertNotIn("0. ", md)

    def test_single_risk_is_numbered_one(self):
        md = to_markdown({"choice": "X", "risks": ["Only one"]})
        self.assertIn("## Risks\n\n1. Only one\n", md)


if __name__ == "__main__":
    unittest.main()
