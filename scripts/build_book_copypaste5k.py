"""
Generate outline.json for 'copy-paste-this-strategy-to-make-your-first-5-000-online'
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from batch5b_author_engine import write_outline

SLUG = "copy-paste-this-strategy-to-make-your-first-5-000-online"

chapters = [
    ("01-the-first-five-thousand-mindset-and-reality-check.md", "The First Five Thousand Mindset and Reality Check"),
    ("02-the-high-ticket-service-arbitrage-model.md", "The High-Ticket Service Arbitrage Model"),
    ("03-selecting-your-high-value-b2b-niche.md", "Selecting Your High-Value B2B Niche"),
    ("04-crafting-the-irresistible-grand-slam-offer.md", "Crafting the Irresistible Grand Slam Offer"),
    ("05-building-a-conversion-focused-one-page-dossier.md", "Building a Conversion-Focused One-Page Dossier"),
    ("06-prospecting-and-lead-scraping-architecture.md", "Prospecting and Lead Scraping Architecture"),
    ("07-cold-email-infrastructure-deliverability-and-domains.md", "Cold Email Infrastructure: Deliverability and Domains"),
    ("08-the-cold-outreach-copywriting-framework.md", "The Cold Outreach Copywriting Framework"),
    ("09-linkedin-and-social-direct-message-playbooks.md", "LinkedIn and Social Direct Message Playbooks"),
    ("10-the-discovery-call-and-pain-diagnosis-script.md", "The Discovery Call and Pain Diagnosis Script"),
    ("11-closing-the-deal-and-overcoming-objections.md", "Closing the Deal and Overcoming Objections"),
    ("12-contract-generation-and-securing-upfront-deposits.md", "Contract Generation and Securing Upfront Deposits"),
    ("13-service-delivery-playbooks-and-standard-operating-procedures.md", "Service Delivery Playbooks and Standard Operating Procedures"),
    ("14-fulfillment-arbitrage-and-vetted-subcontracting.md", "Fulfillment Arbitrage and Vetted Subcontracting"),
    ("15-client-onboarding-and-the-first-forty-eight-hours.md", "Client Onboarding and the First Forty-Eight Hours"),
    ("16-reporting-results-and-building-undeniable-case-studies.md", "Reporting Results and Building Undeniable Case Studies"),
    ("17-converting-one-off-projects-into-monthly-retainers.md", "Converting One-Off Projects into Monthly Retainers"),
    ("18-referral-engines-and-inbound-client-flywheels.md", "Referral Engines and Inbound Client Flywheels"),
    ("19-managing-cash-flow-taxes-and-banking-infrastructure.md", "Managing Cash Flow, Taxes, and Banking Infrastructure"),
    ("20-scaling-from-five-thousand-to-twenty-thousand-monthly.md", "Scaling from Five Thousand to Twenty Thousand Monthly")
]

outline_data = {
    "slug": SLUG,
    "title": "Copy-Paste This Strategy to Make Your First $5,000 Online",
    "subtitle": "The Step-by-Step Tactical Manual for Generating High-Ticket B2B Cash Flow with Zero Capital",
    "label": "CASH FLOW",
    "tagline": "A battle-tested blueprint for acquiring B2B clients, delivering outsized value, and pocketing your first five thousand dollars online.",
    "dedication": "Dedicated to the relentless operators who reject online guru fantasies, embrace the unglamorous mechanics of direct client outreach, and dare to claim their financial independence through disciplined execution.",
    "chapters": chapters
}

write_outline(SLUG, outline_data)

print(f"[{SLUG}] outline.json written successfully.")
