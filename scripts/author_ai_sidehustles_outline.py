"""
Create outline.json for 'the-best-ai-side-hustles-to-start-in-2026-no-skills'
"""
import json
import os

SLUG = "the-best-ai-side-hustles-to-start-in-2026-no-skills"
dir_path = os.path.join("book-manuscripts", SLUG)
os.makedirs(dir_path, exist_ok=True)

outline = {
    "slug": SLUG,
    "label": "AI SIDE HUSTLES",
    "title": "The Best AI Side Hustles to Start in 2026 (No Skills)",
    "subtitle": "The Practical Guide to Building Sustainable Online Income Streams with Modern Artificial Intelligence Tools",
    "parts": [
        {"number": 1, "title": "The 2026 AI Opportunity Landscape"},
        {"number": 2, "title": "Five Core High-Margin AI Side Hustles"},
        {"number": 3, "title": "Packaging, Pricing, and Client Acquisition"},
        {"number": 4, "title": "Scaling, Systems, and Sustainable Income"}
    ],
    "chapters": [
        {"number": 1, "filename": "01-the-demise-of-prompt-gimmicks-and-the-rise-of-applied-ai-services.md", "title": "The Demise of Prompt Gimmicks and the Rise of Applied AI Services", "part": 1, "partTitle": "The 2026 AI Opportunity Landscape"},
        {"number": 2, "filename": "02-the-zero-skill-paradox-leveraging-pre-trained-intelligence.md", "title": "The Zero-Skill Paradox: Leveraging Pre-Trained Intelligence", "part": 1, "partTitle": "The 2026 AI Opportunity Landscape"},
        {"number": 3, "filename": "03-selecting-your-service-lane-high-demand-versus-commoditization.md", "title": "Selecting Your Service Lane: High Demand versus Commoditization", "part": 1, "partTitle": "The 2026 AI Opportunity Landscape"},
        {"number": 4, "filename": "04-the-tool-stack-choosing-reliable-production-ai-applications.md", "title": "The Tool Stack: Choosing Reliable Production AI Applications", "part": 1, "partTitle": "The 2026 AI Opportunity Landscape"},
        {"number": 5, "filename": "05-positioning-and-ethical-client-communication.md", "title": "Positioning and Ethical Client Communication", "part": 1, "partTitle": "The 2026 AI Opportunity Landscape"},
        {"number": 6, "filename": "06-hustle-one-ai-powered-local-business-content-and-listing-optimization.md", "title": "Hustle One: AI-Powered Local Business Content and Listing Optimization", "part": 2, "partTitle": "Five Core High-Margin AI Side Hustles"},
        {"number": 7, "filename": "07-hustle-two-automated-short-form-video-repurposing-for-creators.md", "title": "Hustle Two: Automated Short-Form Video Repurposing for Creators", "part": 2, "partTitle": "Five Core High-Margin AI Side Hustles"},
        {"number": 8, "filename": "08-hustle-three-specialized-document-summarization-and-research-dossiers.md", "title": "Hustle Three: Specialized Document Summarization and Research Dossiers", "part": 2, "partTitle": "Five Core High-Margin AI Side Hustles"},
        {"number": 9, "filename": "09-hustle-four-visual-asset-generation-for-e-commerce-and-digital-stores.md", "title": "Hustle Four: Visual Asset Generation for E-Commerce and Digital Stores", "part": 2, "partTitle": "Five Core High-Margin AI Side Hustles"},
        {"number": 10, "filename": "10-hustle-five-customer-support-knowledge-bases-and-interactive-faq-portals.md", "title": "Hustle Five: Customer Support Knowledge Bases and Interactive FAQ Portals", "part": 2, "partTitle": "Five Core High-Margin AI Side Hustles"},
        {"number": 11, "filename": "11-crafting-productized-service-packages-that-sell-themselves.md", "title": "Crafting Productized Service Packages that Sell Themselves", "part": 3, "partTitle": "Packaging, Pricing, and Client Acquisition"},
        {"number": 12, "filename": "12-pricing-models-transitioning-from-hourly-rates-to-fixed-value.md", "title": "Pricing Models: Transitioning from Hourly Rates to Fixed Value", "part": 3, "partTitle": "Packaging, Pricing, and Client Acquisition"},
        {"number": 13, "filename": "13-the-cold-outreach-protocol-securing-your-first-five-paying-clients.md", "title": "The Cold Outreach Protocol: Securing Your First Five Paying Clients", "part": 3, "partTitle": "Packaging, Pricing, and Client Acquisition"},
        {"number": 14, "filename": "14-delivering-fast-proof-of-concept-to-eliminate-buyer-skepticism.md", "title": "Delivering Fast Proof of Concept to Eliminate Buyer Skepticism", "part": 3, "partTitle": "Packaging, Pricing, and Client Acquisition"},
        {"number": 15, "filename": "15-managing-client-expectations-and-avoiding-scope-creep.md", "title": "Managing Client Expectations and Avoiding Scope Creep", "part": 3, "partTitle": "Packaging, Pricing, and Client Acquisition"},
        {"number": 16, "filename": "16-building-standard-operating-procedures-for-routine-production.md", "title": "Building Standard Operating Procedures for Routine Production", "part": 4, "partTitle": "Scaling, Systems, and Sustainable Income"},
        {"number": 17, "filename": "17-converting-one-off-projects-into-recurring-monthly-retainers.md", "title": "Converting One-Off Projects into Recurring Monthly Retainers", "part": 4, "partTitle": "Scaling, Systems, and Sustainable Income"},
        {"number": 18, "filename": "18-quality-control-and-human-in-the-loop-verification.md", "title": "Quality Control and Human-in-the-Loop Verification", "part": 4, "partTitle": "Scaling, Systems, and Sustainable Income"},
        {"number": 19, "filename": "19-managing-invoicing-taxes-and-operating-cash-flow.md", "title": "Managing Invoicing, Taxes, and Operating Cash Flow", "part": 4, "partTitle": "Scaling, Systems, and Sustainable Income"},
        {"number": 20, "filename": "20-the-path-from-five-hundred-to-five-thousand-dollars-monthly.md", "title": "The Path from Five Hundred to Five Thousand Dollars Monthly", "part": 4, "partTitle": "Scaling, Systems, and Sustainable Income"}
    ]
}

with open(os.path.join(dir_path, "outline.json"), "w", encoding="utf-8") as f:
    json.dump(outline, f, indent=2)

print("Created outline.json for", SLUG)
