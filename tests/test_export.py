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


if __name__ == "__main__":
    unittest.main()
