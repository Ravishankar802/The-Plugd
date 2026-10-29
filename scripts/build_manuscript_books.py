#!/usr/bin/env python3
"""Build the reader page arrays (WebBookPage[]) from real manuscripts.

Usage: python scripts/build_manuscript_books.py <slug> [<slug> ...]
Reads  book-manuscripts/<slug>/outline.json + 00-foreword.md + NN-*.md + 99-epilogue.md
Writes the book .ts file the registry in src/lib/book-content/index.ts already points to.
"""
import glob, json, os, re, sys

MAN = "book-manuscripts"
CONTENT_WORDS = 300   # words per ordinary page
START_WORDS = 190     # first page of a chapter carries the chapter heading
FORBIDDEN = ["Plugd Research & Editorial", "AI Businesses", "OFFICIAL MASTER CLASS"]


def wc(s):
    return len(s.split())


def clean(s):
    s = re.sub(r"\s+", " ", s).strip()
    while s.endswith("."):
        s = s[:-1].strip()
    return s


def split_para(p, cap):
    if wc(p) <= cap:
        return [p]
    out, cur = [], []
    for s in re.split(r"(?<=[.!?])\s+", p):
        if cur and wc(" ".join(cur + [s])) > cap:
            out.append(" ".join(cur))
            cur = [s]
        else:
            cur.append(s)
    if cur:
        out.append(" ".join(cur))
    return out


def paginate(paras, first_cap, cap):
    pages, cur, used, cur_cap = [], [], 0, first_cap
    for p in paras:
        for piece in split_para(p, cur_cap):
            w = wc(piece)
            if cur and used + w > cur_cap:
                pages.append(cur)
                cur, used, cur_cap = [], 0, cap
            cur.append(piece)
            used += w
    if cur:
        pages.append(cur)
    return pages


def read_md(path):
    raw = open(path, encoding="utf-8").read().replace("\r", "")
    lines = raw.split("\n")
    title = lines[0][2:].strip()
    paras = [re.sub(r"\s*\n\s*", " ", x).strip() for x in re.split(r"\n\s*\n", "\n".join(lines[1:]).strip()) if x.strip()]
    return title, paras


def registry():
    txt = open("src/lib/book-content/index.ts", encoding="utf-8").read().split("\n")
    pending, res = [], {}
    for line in txt:
        m = re.match(r'\s*case "([^"]+)":', line)
        if m:
            pending.append(m.group(1))
            continue
        m = re.search(r'import\("\./([^"]+)"\)\)\.([A-Z0-9_]+)', line)
        if m and pending:
            for s in pending:
                res[s] = (m.group(1), m.group(2))
            pending = []
    return res


def get_price(slug):
    try:
        cat = open("src/lib/playbooks-catalog.ts", encoding="utf-8").read()
        m = re.search(r'"slug":\s*"' + re.escape(slug) + r'"[\s\S]*?"price":\s*(\d+)', cat)
        if m:
            return int(m.group(1))
    except Exception:
        pass
    return 9


def build(slug, reg):
    d = os.path.join(MAN, slug)
    outline = json.load(open(os.path.join(d, "outline.json"), encoding="utf-8"))
    fname, export = reg[slug]
    out_path = os.path.join("src/lib/book-content", fname + ".ts")
    old = open(out_path, encoding="utf-8").read()
    cover = re.search(r'"imageUrl":\s*"([^"]+)"', old).group(1)

    price = get_price(slug)
    if price >= 19:
        content_words = 125
        start_words = 80
    elif price >= 15:
        content_words = 135
        start_words = 90
    elif price >= 12:
        content_words = 150
        start_words = 95
    elif price >= 9:
        content_words = 160
        start_words = 105
    else:
        content_words = 168
        start_words = 110

    label = outline["label"].upper()
    title = outline["title"].upper()
    subtitle = outline["subtitle"]
    files = sorted(os.path.basename(f) for f in glob.glob(os.path.join(d, "*.md")))
    foreword = [f for f in files if f.startswith("00-")]
    epilogue = [f for f in files if f.startswith("99-")]
    chapters = [f for f in files if f not in foreword + epilogue]

    ch_data = [read_md(os.path.join(d, f)) for f in chapters]
    fw = read_md(os.path.join(d, foreword[0]))
    ep = read_md(os.path.join(d, epilogue[0]))

    fw_pages = paginate(fw[1], content_words, content_words)
    toc_entries = len(ch_data) + 2
    toc_page_count = -(-toc_entries // 16)
    start = 4 + toc_page_count + 1  # first page number after front matter (cover=1..copyright=4)

    # page counts per section
    fw_start = start
    ch_start = []
    cur = fw_start + len(fw_pages)
    ch_pages_all = []
    for t, paras in ch_data:
        pp = paginate(paras, start_words, content_words)
        ch_pages_all.append(pp)
        ch_start.append(cur)
        cur += len(pp)
    ep_start = cur
    ep_pages = paginate(ep[1], content_words, content_words)

    pages = []

    def add(**kw):
        kw["pageNumber"] = len(pages) + 1
        pages.append(kw)

    add(type="cover", imageUrl=cover, content=[])
    add(type="half-title", header=clean(title), content=[title, subtitle])
    add(type="title", header=clean(title), content=[title, subtitle, outline.get("tagline", "A Complete Practical Guide"), "Independent Digital Edition", "New York · San Francisco · London"])
    add(type="copyright", header="COPYRIGHT & NOTICES", content=[
        "Copyright © 2027 by Sovereign Publishing Group. All rights reserved.",
        "No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews.",
        "Disclaimer: This book is educational and describes illustrative scenarios and hypothetical figures. It is not financial, legal, tax, or investment advice, and it does not promise or guarantee any particular income or result. Your outcomes depend on your own decisions, effort, circumstances, and the market.",
        outline.get("dedication", "For the readers who finish what they start."),
    ])

    toc_lines = [("Foreword: " + fw[0], fw_start)]
    for i, ((t, _), sp) in enumerate(zip(ch_data, ch_start), 1):
        toc_lines.append(("%s %d: %s" % (label, i, t), sp))
    toc_lines.append(("Epilogue: " + ep[0], ep_start))
    for k in range(toc_page_count):
        chunk = toc_lines[k * 16:(k + 1) * 16]
        head = "TABLE OF CONTENTS" if k == 0 else "TABLE OF CONTENTS (CONTINUED)"
        add(type="toc", header="TABLE OF CONTENTS", content=[head] + ["%s  ·  p. %d" % (a, b) for a, b in chunk])

    assert len(pages) + 1 == fw_start, (len(pages), fw_start)

    for k, pg in enumerate(fw_pages):
        kw = dict(type="content", partTitle="FOREWORD", header="FOREWORD · " + clean(fw[0].upper()), content=pg)
        if k == 0:
            kw["chapterTitle"] = fw[0]
        add(**kw)

    for i, ((t, _), pp) in enumerate(zip(ch_data, ch_pages_all), 1):
        head = "%s %d · %s" % (label, i, t.upper())
        for k, pg in enumerate(pp):
            if k == 0:
                add(type="chapter-start", partTitle="%s %d" % (label, i), chapterTitle="%s %d: %s" % (label, i, t.upper()), header=clean(head), content=pg)
            else:
                add(type="content", partTitle="%s %d" % (label, i), header=clean(head), content=pg)

    assert len(pages) + 1 == ep_start, (len(pages), ep_start)
    for k, pg in enumerate(ep_pages):
        kw = dict(type="content", partTitle="EPILOGUE", header="EPILOGUE · " + clean(ep[0].upper()), content=pg)
        if k == 0:
            kw["chapterTitle"] = ep[0]
        add(**kw)

    blob = json.dumps(pages, indent=2, ensure_ascii=False)
    for f in FORBIDDEN:
        assert f not in blob, "forbidden phrase %s in %s" % (f, slug)
    for p in pages:
        h = p.get("header")
        assert not (h and h.endswith("...")), h

    ts = '// Book manuscript, %d pages\n// Title: %s\n\nimport { WebBookPage } from "./sell-pdfs-with-ai-book";\n\nexport const %s: WebBookPage[] = %s;\n\nexport const TOTAL_%s = %s.length;\n' % (len(pages), title, export, blob, export, export)
    open(out_path, "w", encoding="utf-8").write(ts)

    words = sum(wc(" ".join(p["content"])) for p in pages)
    paras = [x for p in pages for x in p["content"] if wc(x) > 25]
    print("%-70s pages=%d words=%d unique=%d/%d" % (slug, len(pages), words, len(set(paras)), len(paras)))


if __name__ == "__main__":
    reg = registry()
    for s in sys.argv[1:]:
        build(s, reg)
