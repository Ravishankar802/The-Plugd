import Link from "next/link";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#ff6b00]/30">
      <div className="max-w-[800px] mx-auto px-6 pt-16 pb-12 flex flex-col items-center">
        
        {/* Page Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Link href="/" className="flex items-center gap-4 mb-8 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10">
              <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-[#ff6b00] stroke-[1.5]">
                <line x1="20" y1="20" x2="8" y2="8" className="opacity-60" />
                <line x1="20" y1="20" x2="32" y2="8" className="opacity-60" />
                <line x1="20" y1="20" x2="37" y2="25" className="opacity-60" />
                <line x1="20" y1="20" x2="25" y2="37" className="opacity-60" />
                <line x1="20" y1="20" x2="3" y2="28" className="opacity-60" />
                <circle cx="20" cy="20" r="5" className="fill-[#ff6b00] stroke-none" />
                <circle cx="8" cy="8" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
                <circle cx="32" cy="8" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
                <circle cx="37" cy="25" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
                <circle cx="25" cy="37" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
                <circle cx="3" cy="28" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
              </svg>
            </div>
            <span className="text-3xl font-[800] tracking-[-0.02em] text-[#52525b]">Plugd</span>
          </Link>
          <h1 className="text-[2.5rem] font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-[#8b8b8b] text-[1rem] font-medium tracking-tight">Last updated: May 1, 2026</p>
        </div>

        {/* Content Sections */}
        <div className="w-full space-y-8 mb-16">
          
          <Section 
            title="1. Introduction" 
            content="Welcome to The Plugd. These Terms govern your use of theplugd.com — a paid directory platform where X creators get listed and discovered. By using The Plugd, you agree to these Terms." 
          />

          <Section 
            title="2. What The Plugd Does" 
            content="The Plugd is a public directory of X accounts. Users pay a one-time $1 fee to submit their profile and get listed. Anyone can browse the directory for free. The Plugd does not guarantee followers, impressions, growth, or any specific outcome from being listed." 
          />

          <Section 
            title="3. The $1 Listing Fee" 
            content="Getting listed on The Plugd requires a one-time payment of $1 processed via Dodo Payments. This fee is non-refundable once your listing goes live. The fee covers your permanent listing on the platform. We do not charge recurring fees or subscriptions." 
          />

          <Section 
            title="4. What You Submit" 
            content="When you add your account you submit: your full name, X username, a one-line bio, a profile picture, your niche, your follower range, and your email. You confirm this information is accurate and belongs to you. Submitting false, misleading, or someone else's information is a violation of these Terms and will result in removal with no refund." 
          />

          <Section 
            title="5. Public Visibility" 
            content="All submitted information except your email is displayed publicly on The Plugd directory. Your name, X username, bio, profile picture, niche and follower range will be visible to anyone who visits the site. Do not submit information you do not want to be publicly visible." 
          />

          <Section 
            title="6. No Verification or Guarantee" 
            content="The Plugd does not verify the identity of users or the accuracy of submitted information. Being listed on The Plugd does not imply endorsement, verification, or recommendation by The Plugd. We do not guarantee any increase in followers, impressions, or growth as a result of being listed." 
          />

          <Section 
            title="7. Payments and Refunds" 
            content="All payments are processed securely via Dodo Payments. The $1 listing fee is non-refundable after your account is successfully listed. If a technical error prevents your listing from going live after payment, contact us and we will resolve it or issue a refund at our discretion." 
          />

          <Section 
            title="8. Prohibited Use" 
            content={
              <div className="space-y-3">
                <p>You may not use The Plugd to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Submit profiles that belong to someone else</li>
                  <li>Submit fake, bot, or spam accounts</li>
                  <li>Submit misleading or deceptive information</li>
                  <li>Attempt to manipulate or abuse the directory</li>
                  <li>Scrape, copy, or misuse platform data</li>
                </ul>
                <p>Violations will result in permanent removal with no refund.</p>
              </div>
            }
          />

          <Section 
            title="9. User Responsibility" 
            content="You are solely responsible for the accuracy of your submitted information. Any connections, collaborations, or interactions that happen as a result of being discovered on The Plugd occur independently and outside our platform. The Plugd is not responsible for any outcomes from such interactions." 
          />

          <Section 
            title="10. Intellectual Property" 
            content="All branding, design, UI, and original content of The Plugd are protected by intellectual property laws. You may not copy, reproduce, or redistribute any part of The Plugd without permission. You retain ownership of your submitted profile content but grant The Plugd a non-exclusive license to display it on the platform." 
          />

          <Section 
            title="11. Removal of Listings" 
            content="The Plugd reserves the right to remove any listing at any time without notice if it violates these Terms, contains false information, or is deemed harmful to the platform or its users. No refund will be issued for removed listings that violate these Terms." 
          />

          <Section 
            title="12. Limitation of Liability" 
            content="The Plugd is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Use of The Plugd is entirely at your own risk." 
          />

          <Section 
            title="13. Changes to These Terms" 
            content="We may update these Terms at any time. Continued use of The Plugd after updates constitutes acceptance of the revised Terms. The &quot;Last updated&quot; date at the top of this page will reflect the most recent changes." 
          />

          <Section 
            title="14. Contact" 
            content="For any questions about these Terms or your listing, contact us at: support@theplugd.com" 
          />

        </div>

        <div className="w-full">
          <Footer />
        </div>
      </div>
    </main>
  );
}

function Section({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="bg-[#161616] border border-[#2a2a2a] rounded-[12px] p-8 shadow-sm">
      <h2 className="text-[1.25rem] font-bold text-white mb-4">{title}</h2>
      <div className="text-[#8b8b8b] text-[1rem] leading-[1.8] font-medium">
        {content}
      </div>
    </div>
  );
}
