import json
import tempfile
import unittest
from pathlib import Path

from backend.core.personas import load_personas


class PersonaEnabledTest(unittest.TestCase):
    def test_disabled_persona_is_skipped(self):
        with tempfile.TemporaryDirectory() as tmp:
            folder = Path(tmp)
            files = {
                "on": {"id": "on", "label": "On", "agent": "a-on", "enabled": True},
                "off": {"id": "off", "label": "Off", "agent": "a-off", "enabled": False},
                "plain": {"id": "plain", "label": "Plain", "agent": "a-plain"},
            }
            for name, data in files.items():
                (folder / f"{name}.json").write_text(json.dumps(data), encoding="utf-8")
            ids = sorted(p["id"] for p in load_personas(folder))
            self.assertEqual(ids, ["on", "plain"])


if __name__ == "__main__":
    unittest.main()
