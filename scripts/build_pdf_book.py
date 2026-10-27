import json
import os
import re
import html
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, Image as RLImage, HRFlowable
)
from reportlab.pdfgen import canvas

# Dimensions
PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN = 54  # 0.75 in
CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN

class BookCanvas(canvas.Canvas):
    """
    Two-pass canvas that generates exact page counts, running headers,
    footers with 'Page X of Y', and hierarchical PDF bookmarks for the PDF reader outline.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []
        self.bookmarks_to_add = [] # (title, key, level, page_num)
        self.current_header = ""

    def showPage(self):
        self._saved_page_states.append({
            'state': dict(self.__dict__),
            'page_num': self._pageNumber,
            'header': self.current_header
        })
        self._startPage()

    def record_bookmark(self, title, key, level=0):
        # Record bookmark for the current page
        self.bookmarks_to_add.append((title, key, level, self._pageNumber))

    def save(self):
        total_pages = len(self._saved_page_states)
        
        # In second pass, draw headers, footers, and register outline
        for entry in self._saved_page_states:
            self.__dict__.update(entry['state'])
            page_num = entry['page_num']
            header_text = entry['header']

            # Skip header and footer on cover and title pages (pages 1 to 3)
            if page_num > 3:
                self.saveState()
                
                # Header
                self.setFont('Helvetica', 8)
                self.setFillColor(HexColor('#78716c'))
                # Book title on left
                self.drawString(MARGIN, PAGE_HEIGHT - 36, "I Sell PDFs With AI and It Changed My Life")
                # Chapter title on right
                if header_text:
                    truncated_header = header_text[:45] + ("..." if len(header_text) > 45 else "")
                    self.drawRightString(PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 36, truncated_header)
                
                # Header separator line
                self.setStrokeColor(HexColor('#e7e5e4'))
                self.setLineWidth(0.5)
                self.line(MARGIN, PAGE_HEIGHT - 42, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 42)

                # Footer separator line
                self.line(MARGIN, 46, PAGE_WIDTH - MARGIN, 46)

                # Footer
                self.setFont('Helvetica', 8)
                self.drawString(MARGIN, 34, "Plugd Digital Playbook Edition · Unabridged")
                self.drawRightString(PAGE_WIDTH - MARGIN, 34, f"Page {page_num} of {total_pages}")

                self.restoreState()

            canvas.Canvas.showPage(self)

        # Register all bookmarks in PDF outline
        for title, key, level, page_num in self.bookmarks_to_add:
            try:
                self.bookmarkPage(key)
                self.addOutlineEntry(title, key, level=level, closed=(level > 0))
            except Exception as e:
                pass

        canvas.Canvas.save(self)


def safe_xml(text):
    """Safely escape text for ReportLab Paragraphs while preserving bold/italic/code tags."""
    if not text:
        return ""
    # First escape &, <, >
    t = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    
    # Restore allowed ReportLab tags
    # Bold: **word** -> <b>word</b>
    t = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', t)
    # Italic: *word* -> <i>\1</i>
    t = re.sub(r'\*(.*?)\*', r'<i>\1</i>', t)
    # Code: `code` -> <font name="Courier" color="#1e293b">\1</font>
    t = re.sub(r'`(.*?)`', r'<font name="Courier" color="#0f172a"><b>\1</b></font>', t)
    return t


def parse_markdown_to_flowables(md_text, styles, canvas_tracker, part_title="", chapter_title=""):
    flowables = []
    lines = md_text.split('\n')
    i = 0
    in_table = False
    table_rows = []

    def flush_table():
        nonlocal in_table, table_rows
        if not table_rows:
            in_table = False
            return
        
        # Calculate column widths
        col_count = max(len(row) for row in table_rows)
        # Pad shorter rows
        for row in table_rows:
            while len(row) < col_count:
                row.append("")
        
        col_width = CONTENT_WIDTH / col_count
        
        table_data = []
        for r_idx, row in enumerate(table_rows):
            formatted_row = []
            for cell in row:
                style = styles['TableHeader'] if r_idx == 0 else styles['TableCell']
                formatted_row.append(Paragraph(safe_xml(cell), style))
            table_data.append(formatted_row)
        
        t = Table(table_data, colWidths=[col_width] * col_count)
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), HexColor('#1e293b')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
            ('LEFTPADDING', (0, 0), (-1, -1), 6),
            ('RIGHTPADDING', (0, 0), (-1, -1), 6),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor('#ffffff'), HexColor('#f8fafc')]),
            ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#cbd5e1')),
        ]))
        flowables.append(Spacer(1, 6))
        flowables.append(t)
        flowables.append(Spacer(1, 8))
        table_rows = []
        in_table = False

    while i < len(lines):
        line = lines[i].strip()

        # Check for table line
        if line.startswith('|') and line.endswith('|'):
            # Table separator check
            if re.match(r'^\|[\s\-:|]+\|$', line):
                # separator line, skip
                i += 1
                continue
            cells = [c.strip() for c in line.strip('|').split('|')]
            in_table = True
            table_rows.append(cells)
            i += 1
            continue
        elif in_table:
            flush_table()

        if not line:
            i += 1
            continue

        # Headers
        if line.startswith('# '):
            # Chapter or Part Title
            title = line[2:].strip()
            flowables.append(Paragraph(safe_xml(title), styles['BookHeading1']))
            flowables.append(Spacer(1, 6))
        elif line.startswith('## '):
            subtitle = line[3:].strip()
            flowables.append(Paragraph(safe_xml(subtitle), styles['BookHeading2']))
            flowables.append(Spacer(1, 6))
        elif line.startswith('### '):
            section_title = line[4:].strip()
            flowables.append(Spacer(1, 8))
            flowables.append(Paragraph(safe_xml(section_title), styles['BookHeading3']))
            flowables.append(Spacer(1, 4))
        elif line.startswith('#### '):
            sub_title = line[5:].strip()
            flowables.append(Paragraph(safe_xml(sub_title), styles['BookHeading4']))
            flowables.append(Spacer(1, 4))
        elif line.startswith('> '):
            # Blockquote / Callout box
            quote_text = line[2:].strip()
            # Group consecutive quote lines
            while i + 1 < len(lines) and lines[i + 1].strip().startswith('> '):
                i += 1
                quote_text += " " + lines[i].strip()[2:].strip()
            
            box_data = [[Paragraph(f"<i>“{safe_xml(quote_text)}”</i>", styles['Callout'])]]
            callout_table = Table(box_data, colWidths=[CONTENT_WIDTH])
            callout_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, -1), HexColor('#f1f5f9')),
                ('LINEBEFORE', (0, 0), (0, -1), 3.5, HexColor('#2563eb')),
                ('TOPPADDING', (0, 0), (-1, -1), 8),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
                ('LEFTPADDING', (0, 0), (-1, -1), 12),
                ('RIGHTPADDING', (0, 0), (-1, -1), 10),
            ]))
            flowables.append(Spacer(1, 6))
            flowables.append(callout_table)
            flowables.append(Spacer(1, 6))
        elif line.startswith('- ') or line.startswith('* '):
            bullet_text = line[2:].strip()
            flowables.append(Paragraph(f"• &nbsp; {safe_xml(bullet_text)}", styles['BulletItem']))
            flowables.append(Spacer(1, 2))
        elif re.match(r'^\d+\.\s', line):
            # Numbered list
            num_match = re.match(r'^(\d+)\.\s*(.*)$', line)
            if num_match:
                num = num_match.group(1)
                text = num_match.group(2)
                flowables.append(Paragraph(f"<b>{num}.</b> &nbsp; {safe_xml(text)}", styles['BulletItem']))
                flowables.append(Spacer(1, 2))
        else:
            flowables.append(Paragraph(safe_xml(line), styles['BookBody']))
            flowables.append(Spacer(1, 4))

        i += 1

    if in_table:
        flush_table()

    return flowables


def build_complete_book():
    output_pdf = "public/books/i-sell-pdfs-with-ai-and-it-changed-my-life-revealing-everything.pdf"
    os.makedirs(os.path.dirname(output_pdf), exist_ok=True)

    with open('scripts/pdf_book_data.json', 'r', encoding='utf-8') as f:
        modules_data = json.load(f)

    # Setup styles
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(
        name='CoverTag',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=HexColor('#93c5fd'),
        alignment=1, # Center
        spaceAfter=12
    ))

    styles.add(ParagraphStyle(
        name='CoverTitle',
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=32,
        textColor=colors.white,
        alignment=1,
        spaceAfter=10
    ))

    styles.add(ParagraphStyle(
        name='CoverSubtitle',
        fontName='Helvetica',
        fontSize=13,
        leading=18,
        textColor=HexColor('#cbd5e1'),
        alignment=1,
        spaceAfter=20
    ))

    styles.add(ParagraphStyle(
        name='CoverAuthor',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=HexColor('#e2e8f0'),
        alignment=1
    ))

    styles.add(ParagraphStyle(
        name='TitlePageTitle',
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=HexColor('#0f172a'),
        alignment=1,
        spaceAfter=12
    ))

    styles.add(ParagraphStyle(
        name='TitlePageSubtitle',
        fontName='Helvetica',
        fontSize=13,
        leading=18,
        textColor=HexColor('#475569'),
        alignment=1,
        spaceAfter=30
    ))

    styles.add(ParagraphStyle(
        name='TitlePageImprint',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=HexColor('#64748b'),
        alignment=1
    ))

    styles.add(ParagraphStyle(
        name='CopyrightText',
        fontName='Helvetica',
        fontSize=8.5,
        leading=13,
        textColor=HexColor('#475569')
    ))

    styles.add(ParagraphStyle(
        name='TOCHeader',
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=HexColor('#0f172a'),
        spaceAfter=16
    ))

    styles.add(ParagraphStyle(
        name='TOCPart',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=HexColor('#1d4ed8'),
        spaceBefore=8,
        spaceAfter=3
    ))

    styles.add(ParagraphStyle(
        name='TOCChapter',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=HexColor('#334155'),
        spaceAfter=2
    ))

    styles.add(ParagraphStyle(
        name='PartOpenerTag',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=HexColor('#2563eb'),
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        name='PartOpenerTitle',
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=28,
        textColor=HexColor('#0f172a'),
        spaceAfter=10
    ))

    styles.add(ParagraphStyle(
        name='PartOpenerDesc',
        fontName='Helvetica',
        fontSize=10.5,
        leading=16,
        textColor=HexColor('#475569'),
        spaceAfter=20
    ))

    styles.add(ParagraphStyle(
        name='ChapterTag',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=HexColor('#2563eb'),
        spaceAfter=4
    ))

    styles.add(ParagraphStyle(
        name='BookHeading1',
        fontName='Helvetica-Bold',
        fontSize=17,
        leading=22,
        textColor=HexColor('#0f172a'),
        spaceBefore=10,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        name='BookHeading2',
        fontName='Helvetica-Bold',
        fontSize=13.5,
        leading=18,
        textColor=HexColor('#1e293b'),
        spaceBefore=8,
        spaceAfter=4
    ))

    styles.add(ParagraphStyle(
        name='BookHeading3',
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=16,
        textColor=HexColor('#334155'),
        spaceBefore=8,
        spaceAfter=3
    ))

    styles.add(ParagraphStyle(
        name='BookHeading4',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=HexColor('#475569'),
        spaceBefore=6,
        spaceAfter=2
    ))

    styles.add(ParagraphStyle(
        name='BookBody',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14.5,
        textColor=HexColor('#1e293b')
    ))

    styles.add(ParagraphStyle(
        name='BulletItem',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=HexColor('#1e293b'),
        leftIndent=12
    ))

    styles.add(ParagraphStyle(
        name='Callout',
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=HexColor('#1e293b')
    ))

    styles.add(ParagraphStyle(
        name='TableHeader',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.white
    ))

    styles.add(ParagraphStyle(
        name='TableCell',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=HexColor('#1e293b')
    ))

    doc = SimpleDocTemplate(
        output_pdf,
        pagesize=letter,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN
    )

    story = []

    # ================= PAGE 1: COVER PAGE =================
    cover_table_data = [
        [Paragraph("PLUGD DIGITAL PLAYBOOK EDITION · OFFICIAL MASTER CLASS", styles['CoverTag'])],
        [Spacer(1, 10)],
    ]
    
    if os.path.exists('scripts/cover_art.png'):
        # Aspect ratio of cover image
        img_w = 480
        img_h = 480 * (941 / 1672)
        cover_table_data.append([RLImage('scripts/cover_art.png', width=img_w, height=img_h)])
        cover_table_data.append([Spacer(1, 16)])

    cover_table_data.extend([
        [Paragraph("I SELL PDFs WITH AI AND IT CHANGED MY LIFE", styles['CoverTitle'])],
        [Paragraph("Revealing Everything: The 7-Figure Zero-Inventory Digital Media Architecture", styles['CoverSubtitle'])],
        [Spacer(1, 10)],
        [Paragraph("<b>PLUGD RESEARCH &amp; EDITORIAL</b><br/><font size='9' color='#94a3b8'>FOREWORD BY THE SOVEREIGN OPERATOR ALLIANCE</font>", styles['CoverAuthor'])]
    ])

    cover_table = Table(cover_table_data, colWidths=[CONTENT_WIDTH])
    cover_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), HexColor('#0b1120')),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 24),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 24),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    story.append(cover_table)
    story.append(PageBreak())

    # ================= PAGE 2: TITLE PAGE =================
    story.append(Spacer(1, 60))
    story.append(Paragraph("I SELL PDFs WITH AI AND IT CHANGED MY LIFE", styles['TitlePageTitle']))
    story.append(Paragraph("Revealing Everything: The Complete Blueprint to 95%+ Margins, Automated Digital Assets &amp; Sovereign Cash Flow", styles['TitlePageSubtitle']))
    story.append(HRFlowable(width="60%", thickness=1, color=HexColor('#e2e8f0'), spaceAfter=40))
    story.append(Spacer(1, 120))
    story.append(Paragraph("<b>PLUGD RESEARCH &amp; EDITORIAL</b><br/><font size='9' color='#64748b'>SAN FRANCISCO · NEW YORK · LONDON</font>", styles['TitlePageImprint']))
    story.append(Spacer(1, 20))
    story.append(Paragraph("<font size='8' color='#94a3b8'>WWW.THEPLUGD.COM</font>", styles['TitlePageImprint']))
    story.append(PageBreak())

    # ================= PAGE 3: COPYRIGHT PAGE =================
    story.append(Spacer(1, 140))
    story.append(Paragraph("<b>I Sell PDFs With AI and It Changed My Life (Revealing Everything)</b>", styles['CopyrightText']))
    story.append(Paragraph("Copyright © 2026 Plugd Group Inc. All rights reserved.", styles['CopyrightText']))
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "No part of this digital book or accompanying tactical frameworks may be reproduced, "
        "distributed, or transmitted in any form or by any means, including photocopying, recording, or "
        "other electronic or mechanical methods, without the prior written permission of the publisher, "
        "except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses "
        "permitted by copyright law.",
        styles['CopyrightText']
    ))
    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>Digital Edition Cataloging-in-Publication Data:</b>", styles['CopyrightText']))
    story.append(Paragraph("Plugd Playbook Catalog: PLG-AI-PDF-002", styles['CopyrightText']))
    story.append(Paragraph("Category: AI Businesses &amp; Sovereign Digital Products", styles['CopyrightText']))
    story.append(Paragraph("Standard One-Time Access Edition · Verified Complete Manuscript", styles['CopyrightText']))
    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>Disclaimer &amp; Financial Notice:</b>", styles['CopyrightText']))
    story.append(Paragraph(
        "The economic models, daily revenue milestones ($373/day, $10,000+/month), and cash flow frameworks "
        "presented herein are educational, tactical illustrations grounded in unit economics. Individual financial "
        "outcomes depend on relentless execution, market demand, customer acquisition, and capital discipline. "
        "Neither the publisher nor the authors guarantee specific financial returns.",
        styles['CopyrightText']
    ))
    story.append(Spacer(1, 20))
    story.append(Paragraph("First Digital Edition: 2026<br/>Published in the United States of America", styles['CopyrightText']))
    story.append(PageBreak())

    # ================= PAGES 4-6: TABLE OF CONTENTS =================
    story.append(Paragraph("Table of Contents", styles['TOCHeader']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=HexColor('#0f172a'), spaceAfter=14))
    
    story.append(Paragraph("<b>Front Matter:</b> Preface &amp; The Sovereign Media Thesis", styles['TOCPart']))
    story.append(Spacer(1, 8))

    ch_counter = 1
    for mIdx, mod in enumerate(modules_data):
        part_num = mIdx + 1
        story.append(Paragraph(f"<b>PART {part_num}: {html.escape(mod.get('title', ''))}</b>", styles['TOCPart']))
        for les in mod.get('lessons', []):
            les_title = les.get('title', '')
            story.append(Paragraph(f"&nbsp;&nbsp;&nbsp;&nbsp;<b>Chapter {ch_counter}:</b> {safe_xml(les_title)}", styles['TOCChapter']))
            ch_counter += 1
        story.append(Spacer(1, 4))

    story.append(Paragraph("<b>Back Matter:</b> Epilogue &amp; The Sovereign Operator's Code", styles['TOCPart']))
    story.append(PageBreak())

    # ================= PREFACE =================
    story.append(Paragraph("PREFACE", styles['PartOpenerTag']))
    story.append(Paragraph("The Zero-Marginal-Cost Media Thesis", styles['BookHeading1']))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor('#e2e8f0'), spaceAfter=14))
    
    preface_text = """
The modern economic paradigm is undergoing a quiet, violent divergence. On one side of the divide sits the traditional knowledge worker: trading finite biological time for linear salary, trapped beneath middle-management overhead, and vulnerable to organizational restructuring. On the other side stands the sovereign digital operator: building zero-marginal-cost information assets, commanding 95%+ net profit margins, and leveraging algorithmic distribution to generate perpetual cash flow.

A physical business is shackled by inventory, shipping delays, breakage, warehouse leases, and raw material volatility. An agency is chained to human headcount, client scope creep, and synchronous communication. A software startup is weighed down by continuous server maintenance, security vulnerabilities, and high developer burn rates.

A well-crafted, hyper-focused digital guide—delivered as an instant PDF or Notion template—carries none of these burdens. 

Once created, the cost of replicating and distributing that guide to a thousand, ten thousand, or one hundred thousand paying readers is mathematically zero. Every dollar received flows directly to the operator's bottom line. 

This playbook is the unredacted operational manual for building that machine. From identifying high-bleed consumer pain points on Reddit and YouTube, to engineering authoritative documents with modern large language models, to driving viral attention through 7-second hooks, and establishing automated checkout pipelines: this volume contains every formula, decision matrix, and technical workflow required to cross $10,000 per month without employees.

Read with discipline. Execute with velocity.
    """
    for p in preface_text.strip().split('\n\n'):
        story.append(Paragraph(safe_xml(p.strip()), styles['BookBody']))
        story.append(Spacer(1, 6))

    story.append(Spacer(1, 16))
    story.append(Paragraph("<i>— The Plugd Research &amp; Editorial Collective</i>", styles['BookBody']))
    story.append(PageBreak())

    # ================= CHAPTER CONTENT =================
    global_ch_num = 1
    for mIdx, mod in enumerate(modules_data):
        part_num = mIdx + 1
        part_title = mod.get('title', '')
        part_desc = mod.get('description', '')

        # PART OPENER PAGE
        story.append(Spacer(1, 80))
        story.append(Paragraph(f"PART {part_num}", styles['PartOpenerTag']))
        story.append(Paragraph(html.escape(part_title), styles['PartOpenerTitle']))
        story.append(HRFlowable(width="100%", thickness=2, color=HexColor('#2563eb'), spaceAfter=14))
        story.append(Paragraph(html.escape(part_desc), styles['PartOpenerDesc']))
        
        story.append(Paragraph("<b>Chapters in this Part:</b>", styles['BookHeading4']))
        story.append(Spacer(1, 6))
        for lIdx, les in enumerate(mod.get('lessons', [])):
            ch_n = global_ch_num + lIdx
            story.append(Paragraph(f"• <b>Chapter {ch_n}:</b> {html.escape(les.get('title', ''))}", styles['BulletItem']))
            story.append(Spacer(1, 3))
        
        story.append(PageBreak())

        # LESSONS IN THIS PART
        for les in mod.get('lessons', []):
            ch_title = les.get('title', '')
            written = les.get('writtenLesson', '')

            # Chapter Opener
            story.append(Paragraph(f"PART {part_num} · CHAPTER {global_ch_num}", styles['ChapterTag']))
            story.append(Paragraph(html.escape(ch_title), styles['BookHeading1']))
            story.append(HRFlowable(width="100%", thickness=0.8, color=HexColor('#cbd5e1'), spaceAfter=12))

            # Flowables for the written markdown
            parsed_flowables = parse_markdown_to_flowables(
                written, styles, None, part_title=part_title, chapter_title=ch_title
            )
            story.extend(parsed_flowables)

            story.append(PageBreak())
            global_ch_num += 1

    # ================= EPILOGUE =================
    story.append(Spacer(1, 60))
    story.append(Paragraph("EPILOGUE", styles['PartOpenerTag']))
    story.append(Paragraph("The Sovereign Operator's Code", styles['BookHeading1']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=HexColor('#0f172a'), spaceAfter=16))

    epilogue_text = """
The difference between an amateur who dabbles in digital hustles and a sovereign operator who builds enduring wealth comes down to four non-negotiable operational principles:

1. **Leverage Trumps Effort**: Working 14 hours inside an unscalable, linear vehicle only produces exhaustion. Spending 90 monastic minutes daily refining an automated, high-margin asset engine produces generational freedom.

2. **Speed Over Perfection**: A published $9 guide solving a genuine problem today is infinitely more valuable than an unfinished masterpiece trapped in drafts. Deploy early, gather market signal, and iterate with feedback.

3. **Defend The War Chest**: True net worth is not what flows through your Stripe dashboard; it is what remains protected in liquid sovereign reserves. Quarantine your personal cost of living and reinvest surplus cashflow into compounding assets.

4. **Move In Silence**: Real wealth is invisible. While amateurs broadcast superficial metrics on social feeds, the true titan quietly optimizes conversion rates, builds email retention channels, and compounds enterprise cashflow with zero employees.

You now possess the entire architecture. The only remaining variable is your execution.
    """
    for p in epilogue_text.strip().split('\n\n'):
        story.append(Paragraph(safe_xml(p.strip()), styles['BookBody']))
        story.append(Spacer(1, 6))

    print(f"Building document with {len(story)} flowables...")

    # Build with custom BookCanvas
    doc.build(story, canvasmaker=BookCanvas)
    print(f"Document successfully created at {output_pdf}!")


if __name__ == '__main__':
    build_complete_book()
