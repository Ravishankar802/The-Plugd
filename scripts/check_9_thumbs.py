import sys
sys.path.insert(0, 'scripts')
from patch_9_thumbnails import thumbnails_data

t = open('src/lib/playbooks-catalog.ts', encoding='utf-8').read()

all_good = True
for item in thumbnails_data:
    cid = item['id']
    url = item['url']
    has_thumb = f'"thumbnail": "{url}"' in t
    print(f'{cid} ({item["title"][:30]}...): thumbnail set = {has_thumb}')
    if not has_thumb:
        all_good = False

print(f"All 9 thumbnails verified in catalog: {all_good}")
