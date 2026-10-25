import sys
import re

def audit_file(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Check $373
    has_373 = "373" in content
    if has_373:
        print(f"FAILED: {path} contains '373'")
    else:
        print(f"PASSED: {path} has 0 occurrences of '373'")
        
    # Check writtenLesson count and lengths
    matches = list(re.finditer(r'"writtenLesson":\s*"(.*?)(?<!\\)"', content, re.DOTALL))
    lengths = [len(m.group(1)) for m in matches]
    if lengths:
        print(f"Lessons count: {len(lengths)}, Min length: {min(lengths)}, Max: {max(lengths)}, All >2000 chars: {all(l > 2000 for l in lengths)}")
    else:
        print(f"No writtenLesson strings found in {path}")

if __name__ == "__main__":
    audit_file(sys.argv[1])
