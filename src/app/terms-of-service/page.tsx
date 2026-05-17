import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground/10 flex flex-col font-['Georgia',_serif]">
      <Link href="/" className="fixed top-4 left-6 z-50 hover:opacity-80 transition-opacity">
        <Image src="/logo.png" alt="Plugd" width={80} height={80} className="cursor-pointer" />
      </Link>
      <div className="max-w-[840px] mx-auto px-6 pt-16 flex flex-col items-center flex-1">
        
        {/* Page Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-[2.5rem] font-bold tracking-tight mb-2 text-foreground">Terms of Service</h1>
          <p className="text-muted text-[1rem] font-medium tracking-tight">Last updated: May 17, 2026</p>
        </div>

        {/* Content Sections */}
        <div className="w-full space-y-10">
          
          <Section 
            title="1. Introduction" 
            content="Welcome to Plugd. These Terms govern your use of theplugd.com, a referral platform where promoters earn by sharing their referral link. By using Plugd, you agree to these Terms." 
          />

          <Section 
            title="2. What Plugd Does" 
            content="Plugd is a referral program. Promoters pay a one-time $2 fee to join, receive a unique referral link, and earn $1 for every new person who joins through that link. Plugd does not guarantee any specific earnings." 
          />

          <Section 
            title="3. The $2 Joining Fee" 
            content="Joining Plugd as a promoter requires a one-time payment of $2 processed via Dodo Payments. This fee is non-refundable once your account is activated." 
          />

          <Section 
            title="4. Earning Referrals" 
            content="You earn $1 for each person who joins Plugd through your unique referral link and completes the $2 payment. Earnings are tracked in your Vault and paid out twice a month via PayPal or UPI, whichever you have set in your profile. The minimum withdrawal amount is $50." 
          />

          <Section 
            title="5. Payout Eligibility" 
            content="To receive a payout, your account must have a valid payout method (PayPal or UPI) saved in your profile. Plugd reserves the right to withhold payouts if fraudulent activity is suspected." 
          />

          <Section 
            title="6. Prohibited Conduct" 
            content={
              <div className="space-y-4">
                <p>You may not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use bots, scripts, or fake accounts to generate referrals</li>
                  <li>Self-refer or manipulate the referral system in any way</li>
                  <li>Share false or misleading information to get people to join</li>
                  <li>Attempt to abuse, reverse-engineer, or exploit the platform</li>
                </ul>
                <p>Violations will result in permanent account removal and forfeiture of any pending earnings.</p>
              </div>
            }
          />

          <Section 
            title="7. User Responsibility" 
            content="You are responsible for the accuracy of your payout details. Plugd is not liable for failed payouts resulting from incorrect information provided by you." 
          />

          <Section 
            title="8. Intellectual Property" 
            content="All branding, design, and content of Plugd are protected by intellectual property laws. You may not copy, reproduce, or redistribute any part of Plugd without permission." 
          />

          <Section 
            title="9. Limitation of Liability" 
            content='Plugd is provided on an "as is" basis. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.' 
          />

          <Section 
            title="10. Changes to These Terms" 
            content="We may update these Terms at any time. Continued use of Plugd after updates constitutes acceptance of the revised Terms." 
          />

          <Section 
            title="11. Contact" 
            content={
              <span>
                For any questions, contact us at{" "}
                <a href="mailto:support@theplugd.com" className="text-foreground hover:underline">
                  support@theplugd.com
                </a>
                .
              </span>
            }
          />

        </div>
      </div>

      {/* Footer - Wider container matching homepage */}
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        <Footer showBorder={false} hideLinks={true} />
      </div>
    </main>
  );
}

function Section({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-[12px] p-10 shadow-sm">
      <h2 className="text-[1.5rem] font-bold text-foreground mb-6">{title}</h2>
      <div className="text-muted text-[1.125rem] leading-[1.8] font-medium">
        {content}
      </div>
    </div>
  );
}
