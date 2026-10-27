import json
import re
import pypdf

reader = pypdf.PdfReader('public/books/i-sell-pdfs-with-ai-and-it-changed-my-life-revealing-everything.pdf')
modules = json.load(open('scripts/pdf_book_data.json', encoding='utf-8'))

part_pages = {}
chapter_pages = {}
preface_page = 6 # 0-indexed (Page 7)
epilogue_page = None

# Scan pages starting after Table of Contents (page index >= 6)
for p_idx in range(6, len(reader.pages)):
    txt = reader.pages[p_idx].extract_text() or ''
    first_lines = [l.strip() for l in txt.split('\n') if l.strip()][:4]
    combined_header = " ".join(first_lines)

    # Check for PART opener (e.g. 'PART 1', 'PART 2') where first line is 'PART X'
    part_match = re.search(r'^PART\s+(\d+)\b', first_lines[0] if first_lines else '')
    if part_match and 'CHAPTER' not in first_lines[0]:
        p_num = int(part_match.group(1))
        if p_num not in part_pages:
            part_pages[p_num] = p_idx
            print(f"PART {p_num} opener on page {p_idx + 1}")

    # Check for Chapter opener (e.g. 'PART X · CHAPTER Y' or 'CHAPTER Y')
    ch_match = re.search(r'CHAPTER\s+(\d+)\b', combined_header)
    if ch_match:
        c_num = int(ch_match.group(1))
        if c_num not in chapter_pages:
            chapter_pages[c_num] = p_idx
            print(f"  CHAPTER {c_num} on page {p_idx + 1}")

    if "The Sovereign Operator's Code" in combined_header or "EPILOGUE" in combined_header:
        if epilogue_page is None:
            epilogue_page = p_idx
            print(f"EPILOGUE on page {p_idx + 1}")

print(f"Found {len(part_pages)} part openers and {len(chapter_pages)} chapters.")

# Build hierarchical bookmarks in writer
writer = pypdf.PdfWriter()
for page in reader.pages:
    writer.add_page(page)

# Front matter
writer.add_outline_item("Cover", 0)
writer.add_outline_item("Title Page", 1)
writer.add_outline_item("Copyright & Publishing Details", 2)
writer.add_outline_item("Table of Contents", 3)
writer.add_outline_item("Preface: The Zero-Marginal-Cost Media Thesis", preface_page)

global_ch = 1
for m_idx, mod in enumerate(modules):
    p_num = m_idx + 1
    p_page = part_pages.get(p_num, 7)
    part_outline = writer.add_outline_item(f"Part {p_num}: {mod['title']}", p_page)

    for les in mod.get('lessons', []):
        c_page = chapter_pages.get(global_ch, p_page)
        writer.add_outline_item(f"{global_ch}. {les['title']}", c_page, parent=part_outline)
        global_ch += 1

if epilogue_page is not None:
    writer.add_outline_item("Epilogue: The Sovereign Operator's Code", epilogue_page)

output_path = 'public/books/i-sell-pdfs-with-ai-and-it-changed-my-life-revealing-everything.pdf'
with open(output_path, 'wb') as f_out:
    writer.write(f_out)

print("Hierarchical PDF bookmarks successfully written!")
