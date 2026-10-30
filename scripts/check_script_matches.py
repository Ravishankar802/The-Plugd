with open('scripts/author_ch08_to_ch14.py', 'r', encoding='utf-8') as f:
    text = f.read()
import re
print(re.findall(r'"([0-9]{2}-[^"]+\.md)"', text))
