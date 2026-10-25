from generate_batch_4_configs import CONFIGS_BATCH_4
from generate_batch_4_playbooks import file_prefixes

with open("tests/populated-24-playbooks.test.cjs", "r", encoding="utf-8") as f:
    text = f.read()

# Generate new entries for 25 to 32
batch_4_entries = ""
for cfg in CONFIGS_BATCH_4:
    slug = cfg["slug"]
    prefix = file_prefixes[slug]
    batch_4_entries += f'''  {{
    id: "{cfg["id"]}",
    slug: "{slug}",
    title: "{cfg["title"]}",
    dataFile: "src/lib/playbooks/{prefix}-data.ts",
    detailFile: "src/lib/playbooks/{prefix}-detail.ts",
    routeDir: "src/app/{slug}",
    expectedModules: {cfg["modulesCount"]},
    expectedLessons: {cfg["lessonsCount"]},
    expectedSlides: {cfg["slidesCount"]}
  }},
'''

# Replace in POPULATED_PLAYBOOKS
target = '    expectedSlides: 128\n  }\n];'
new_text = text.replace(target, f'    expectedSlides: 128\n  }},\n{batch_4_entries.rstrip()[:-1]}\n];')

# Replace all "24" with "32" in test descriptions
new_text = new_text.replace("24", "32")

with open("tests/populated-32-playbooks.test.cjs", "w", encoding="utf-8") as f:
    f.write(new_text)

print("Generated tests/populated-32-playbooks.test.cjs successfully!")
