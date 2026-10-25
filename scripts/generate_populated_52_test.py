import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from generate_batch_6_configs import CONFIGS_BATCH_6
from generate_batch_6_full import file_prefixes

with open("tests/populated-40-playbooks.test.cjs", "r", encoding="utf-8") as f:
    orig = f.read()

idx_insert = orig.rfind("  }\n];")
if idx_insert == -1:
    idx_insert = orig.rfind("  }\r\n];")

new_items = []
for pb in CONFIGS_BATCH_6:
    slug = pb["slug"]
    fn = file_prefixes[slug]
    mods = len(pb["modules"])
    item = {
        "id": pb["id"],
        "slug": slug,
        "title": pb["title"],
        "dataFile": f"src/lib/playbooks/{fn}-data.ts",
        "detailFile": f"src/lib/playbooks/{fn}-detail.ts",
        "routeDir": f"src/app/{slug}",
        "expectedModules": mods,
        "expectedLessons": mods * 4,
        "expectedSlides": mods * 16
    }
    new_items.append("  " + json.dumps(item, indent=4).replace("\n", "\n  "))

insertion_text = ",\n" + ",\n".join(new_items)

new_test_content = orig[:idx_insert + 3] + insertion_text + orig[idx_insert + 3:]
new_test_content = new_test_content.replace("All 40", "All 52")
new_test_content = new_test_content.replace("all 40", "all 52")

with open("tests/populated-52-playbooks.test.cjs", "w", encoding="utf-8") as f:
    f.write(new_test_content)

print("Created tests/populated-52-playbooks.test.cjs successfully!")
