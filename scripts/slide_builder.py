import json

def make_rich_slide(sid, order, eyebrow, headline, subheadline, items, takeaway, diagram=None, chart=None, metrics=None):
    """
    Builds a slide packed with information:
    - 4 structured listItems
    - bulletPoints for compatibility
    - Optional diagram (visual process/architecture flow with steps, tech, latency/metrics)
    - Optional chart (visual data bars, percentage comparisons, badges)
    - Optional metricsGrid (key KPI cards)
    - Prominent takeaway banner
    """
    list_items = []
    bullet_points = []
    
    for idx, it in enumerate(items):
        num_str = f"0{idx+1}"
        title = it.get("title", f"Core Principle {idx+1}")
        desc = it.get("desc", it.get("description", ""))
        list_items.append({
            "number": num_str,
            "title": title,
            "description": desc
        })
        bullet_points.append(f"{title}: {desc}")
        
    slide = {
        "id": sid,
        "order": order,
        "type": "LIST",
        "eyebrow": eyebrow,
        "headline": headline,
        "subheadline": subheadline,
        "title": headline,
        "subtitle": subheadline,
        "listItems": list_items,
        "bulletPoints": bullet_points,
        "takeaway": takeaway
    }
    
    if diagram:
        slide["diagram"] = diagram
    if chart:
        slide["chart"] = chart
    if metrics:
        slide["metricsGrid"] = metrics
        
    return slide
