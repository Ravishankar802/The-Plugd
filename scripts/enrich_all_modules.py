import json
import re

def enrich_slide(slide, module_idx, lesson_idx, slide_idx):
    """
    Enriches a slide so it has:
    - listItems (4 rich objects with number, title, description)
    - bulletPoints
    - diagram / chart / metricsGrid
    - takeaway
    - Zero '373' references
    """
    bullets = slide.get("bulletPoints", [])
    list_items = []
    cleaned_bullets = []
    
    for idx, b in enumerate(bullets):
        # Remove 373 references
        b_clean = re.sub(r'\$373(?:/day)?(?:\s*\(\$11,200/month\))?', '$10,000/month', b)
        b_clean = b_clean.replace('$373', '$10,000/month').replace('373', '10,000')
        
        colon_idx = b_clean.find(":")
        if colon_idx > -1:
            title = b_clean[:colon_idx].strip()
            desc = b_clean[colon_idx+1:].strip()
        else:
            title = f"Core Pillar {idx+1}"
            desc = b_clean.strip()
            
        list_items.append({
            "number": f"0{idx+1}",
            "title": title,
            "description": desc
        })
        cleaned_bullets.append(f"{title}: {desc}")
        
    headline = re.sub(r'\$373(?:/day)?', '$10k+/Month', slide.get("headline", ""))
    subheadline = re.sub(r'\$373(?:/day)?', '$10,000/month', slide.get("subheadline", ""))
    takeaway = re.sub(r'\$373(?:/day)?', '$10,000/month', slide.get("takeaway", ""))
    
    slide["headline"] = headline
    slide["subheadline"] = subheadline
    slide["title"] = headline
    slide["subtitle"] = subheadline
    slide["listItems"] = list_items
    slide["bulletPoints"] = cleaned_bullets
    slide["takeaway"] = takeaway
    
    # Add contextual diagrams or charts based on module topic
    if slide_idx == 0:
        # First slide: Metric KPIs
        slide["metricsGrid"] = [
            {"label": "Monthly Revenue Target", "val": "$10,000+", "note": "Solo operator benchmark"},
            {"label": "Net Profit Margin", "val": "92% - 98%", "note": "Zero employee payroll"},
            {"label": "Active Client Capacity", "val": "4 to 5 Accounts", "note": "Maximum focus ceiling"},
            {"label": "Weekly Deep Work", "val": "< 25 Hours", "note": "Asynchronous delivery"}
        ]
    elif slide_idx == 1:
        # Second slide: System Architecture Flow Diagram
        if module_idx in [3, 4]:
            slide["diagram"] = {
                "title": "Creative Asset Production & Distribution Pipeline",
                "steps": [
                    {"step": "01", "tech": "Claude 3.5 / GPT-4o", "title": "Script Ingestion", "desc": "Analyzes viral hooks and drafts 30-sec script.", "metric": "< 15s"},
                    {"step": "02", "tech": "ElevenLabs", "title": "Voice Synthesis", "desc": "Generates photorealistic vocal clone audio.", "metric": "< 8s"},
                    {"step": "03", "tech": "Higgsfield / Midjourney", "title": "Visual Rendering", "desc": "Generates cinematic vertical B-roll frames.", "metric": "2.5s / frame"},
                    {"step": "04", "tech": "CapCut Pro API", "title": "Auto Assembly", "desc": "Syncs captions, kinetic typography & sound design.", "metric": "4 mins total"}
                ]
            }
        elif module_idx in [5, 6]:
            slide["diagram"] = {
                "title": "Creator Community Launch & Funnel Architecture",
                "steps": [
                    {"step": "01", "tech": "Instagram / X", "title": "Audience Warmup", "desc": "3-day public engagement and story poll teasers.", "metric": "15k - 50k Reach"},
                    {"step": "02", "tech": "Direct Message", "title": "Private DM Sequence", "desc": "Delivers free value curriculum preview link.", "metric": "42% Opt-in"},
                    {"step": "03", "tech": "Skool Platform", "title": "Community Onboard", "desc": "Automated course access and gamified welcome.", "metric": "100 Buyers @ $500"},
                    {"step": "04", "tech": "Stripe Connect", "title": "70/30 Profit Split", "desc": "Automated direct payout to creator and operator.", "metric": "$15,000 Net Profit"}
                ]
            }
        else:
            slide["diagram"] = {
                "title": "Client Acquisition & Outbound Conversion Engine",
                "steps": [
                    {"step": "01", "tech": "Apollo / Loom", "title": "Diagnostic Teardown", "desc": "3-minute personalized screen audit of visible leak.", "metric": "5 Audits / Day"},
                    {"step": "02", "tech": "Direct Outreach", "title": "Value-First Delivery", "desc": "Sent via LinkedIn/Email with zero sales pressure.", "metric": "38% Response"},
                    {"step": "03", "tech": "Cal.com", "title": "Diagnostic Call", "desc": "20-minute discovery consultation mapping ROI.", "metric": "50% Close Rate"},
                    {"step": "04", "tech": "Stripe Invoicing", "title": "Retainer Signing", "desc": "Collects $2,500 setup + recurring monthly billing.", "metric": "$2,500/mo Retainer"}
                ]
            }
    elif slide_idx == 2:
        # Third slide: Data Comparison Chart
        if module_idx in [3, 4]:
            slide["chart"] = {
                "title": "Content Velocity & Studio Margin Performance",
                "data": [
                    {"label": "AI Creative Assembly Line (4 Accounts)", "value": "120 Videos/mo · $10,000/mo Gross", "barPct": 100, "badge": "96% Net Margin", "note": "4 hours weekly production sprint"},
                    {"label": "Traditional Video Freelancer", "value": "20 Videos/mo · $3,000/mo Gross", "barPct": 30, "badge": "High Burnout", "note": "Manual timeline cutting, low pricing"}
                ]
            }
        elif module_idx in [5, 6]:
            slide["chart"] = {
                "title": "Creator Revenue Share vs Brand Sponsorship Comparison",
                "data": [
                    {"label": "Proprietary Skool Academy Launch (70/30 Split)", "value": "$15,000 Net Profit / Launch", "barPct": 100, "badge": "Asymmetric Upside", "note": "100 sales @ $500 with zero ad spend"},
                    {"label": "Standard Brand Deal Sponsorship (One-Off)", "value": "$1,200 Flat Payment", "barPct": 12, "badge": "Low Return", "note": "Zero recurring backend or community equity"}
                ]
            }
        else:
            slide["chart"] = {
                "title": "Monthly Cash Flow: Retainer Stacking Model",
                "data": [
                    {"label": "4 B2B Retainers @ $2,500/Month", "value": "$10,000 / Month Recurring", "barPct": 100, "badge": "Stable Floor", "note": "Billed automatically on 1st of month"},
                    {"label": "Hourly Freelance Projects ($75/hr)", "value": "$3,800 / Month Volatile", "barPct": 38, "badge": "Income Reset", "note": "Income drops to zero when work stops"}
                ]
            }
            
    return slide

def clean_written_lesson(text):
    """Clean all 373 occurrences from written text"""
    # Replace $373/day ($11,200/month)
    text = re.sub(r'\$373(?:/day)?(?:\s*\(\$11,200/month\))?', '$10,000/month', text)
    text = re.sub(r'\$373\.33', '$10,000.00', text)
    text = re.sub(r'\$373/day', '$10,000/month', text)
    text = re.sub(r'\$373', '$10,000/month', text)
    text = text.replace('373/day', '10,000/month').replace('373', '10,000')
    return text

print("Enrichment helpers ready.")
