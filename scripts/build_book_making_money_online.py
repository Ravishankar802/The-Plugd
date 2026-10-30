"""
Master Author Script for Book 2 of Batch 5B:
'making-money-online-is-easy-actually-just-copy-me'
"""

import os
import sys
import json
import re

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from batch5b_author_engine import write_and_verify_chapter, write_outline

SLUG = "making-money-online-is-easy-actually-just-copy-me"

outline_data = {
  "slug": SLUG,
  "title": "Making Money Online Is Easy, Actually (Just Copy Me)",
  "subtitle": "The Reverse-Engineering Playbook: Ethical Model Replication, High-Converting Funnels, and Digital Leverage",
  "label": "TACTICS",
  "tagline": "Reinventing the wheel is a poverty habit; copy proven winners with operational rigor.",
  "dedication": "For every ambitious operator ready to stop overcomplicating commerce and start executing proven blueprints.",
  "chapters": [
    ["01-the-myth-of-originality-and-the-replication-mindset.md", "The Myth of Originality and the Replication Mindset"],
    ["02-ethical-copying-versus-plagiarism-the-rules-of-arbitrage.md", "Ethical Copying Versus Plagiarism: The Rules of Arbitrage"],
    ["03-reverse-engineering-proven-commercial-offers.md", "Reverse-Engineering Proven Commercial Offers"],
    ["04-audience-aggregation-and-borrowed-attention-channels.md", "Audience Aggregation and Borrowed Attention Channels"],
    ["05-the-no-code-digital-product-assembly-line.md", "The No-Code Digital Product Assembly Line"],
    ["06-high-converting-landing-page-architecture.md", "High-Converting Landing Page Architecture"],
    ["07-the-five-email-automated-conversion-machine.md", "The Five-Email Automated Conversion Machine"],
    ["08-organic-short-form-distribution-and-hook-sourcing.md", "Organic Short-Form Distribution and Hook Sourcing"],
    ["09-pricing-psychology-and-tier-optimization.md", "Pricing Psychology and Tier Optimization"],
    ["10-the-tripwire-funnel-monetizing-cold-traffic-at-breakeven.md", "The Tripwire Funnel: Monetizing Cold Traffic at Breakeven"],
    ["11-high-ticket-consulting-and-productized-service-upsells.md", "High-Ticket Consulting and Productized Service Upsells"],
    ["12-paid-traffic-unit-economics-and-ad-arbitrage.md", "Paid Traffic Unit Economics and Ad Arbitrage"],
    ["13-customer-onboarding-retention-and-churn-minimization.md", "Customer Onboarding, Retention, and Churn Minimization"],
    ["14-automated-affiliate-and-strategic-partner-networks.md", "Automated Affiliate and Strategic Partner Networks"],
    ["15-building-the-solo-operator-tech-stack.md", "Building the Solo Operator Tech Stack"],
    ["16-operational-hygiene-and-merchant-processor-protection.md", "Operational Hygiene and Merchant Processor Protection"],
    ["17-delegating-routine-operations-to-offshore-specialists.md", "Delegating Routine Operations to Offshore Specialists"],
    ["18-the-ten-thousand-dollar-month-operating-milestone.md", "The Ten-Thousand-Dollar Month Operating Milestone"],
    ["19-exit-readiness-and-digital-asset-multiples.md", "Exit Readiness and Digital Asset Multiples"],
    ["20-the-replicated-empire-twenty-four-hour-execution-blueprint.md", "The Replicated Empire Twenty-Four-Hour Execution Blueprint"]
  ]
}

write_outline(SLUG, outline_data)
print("Outline saved successfully.")
