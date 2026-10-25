import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
from generate_batch_4_configs import CONFIGS_BATCH_4

configs_by_slug = {c["slug"]: c for c in CONFIGS_BATCH_4}

with open("src/lib/playbooks-catalog.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
current_slug = None

for line in lines:
    for slug in configs_by_slug:
        if f'"slug": "{slug}"' in line:
            current_slug = slug
            break
    
    if current_slug and current_slug in configs_by_slug:
        cfg = configs_by_slug[current_slug]
        if line.strip().startswith('"headline":'):
            line = f'    "headline": "{cfg["headline"]}",\n'
        elif line.strip().startswith('"description":'):
            line = f'    "description": "{cfg["description"]}",\n'
        elif line.strip().startswith('"modulesCount":'):
            line = f'    "modulesCount": {cfg["modulesCount"]},\n'
        elif line.strip().startswith('"lessonsCount":'):
            line = f'    "lessonsCount": {cfg["lessonsCount"]},\n'
        elif line.strip().startswith('"hoursOfMaterial":'):
            line = f'    "slidesCount": {cfg["slidesCount"]},\n    "hoursOfMaterial": "{cfg["hoursOfMaterial"]}",\n'
        elif line.strip().startswith('"badge":'):
            line = f'    "badge": "{cfg["badge"]}",\n'
        elif line.strip().startswith('"href":'):
            line = f'    "rating": {cfg["rating"]},\n    "ratingCount": {cfg["ratingCount"]},\n    "href": "/{current_slug}",\n'
            current_slug = None  # finished block
    
    new_lines.append(line)

with open("src/lib/playbooks-catalog.ts", "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Catalog patched successfully for Batch 4 playbooks!")
