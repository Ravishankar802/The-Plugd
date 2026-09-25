import Link from "next/link";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground/10 flex flex-col font-['Georgia',_serif]">
      <Link
        href="/"
        className="relative md:fixed top-0 md:top-4 left-0 md:left-6 z-50 flex justify-center md:inline-block mx-auto md:mx-0 pt-8 md:pt-0 hover:opacity-80 transition-opacity"
      >
        <Image src="/logo.png" alt="Plugd" width={80} height={80} className="cursor-pointer" />
      </Link>
      <div className="max-w-[840px] mx-auto px-6 pt-16 flex flex-col items-center flex-1 pb-16">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-[2.5rem] font-bold tracking-tight mb-2 text-foreground">Privacy Policy</h1>
          <p className="text-muted text-[1rem] font-medium tracking-tight">Last updated: May 17, 2026</p>
        </div>

        {/* Content Sections */}
        <div className="w-full space-y-10">
          <Section
            title="1. Information We Collect"
            content="We collect information you provide directly to us when creating a Plugd account, managing your wishlist, or communicating with us. This includes your name, email address, phone number for verification, username, and wishlist preferences."
          />

          <Section
            title="2. How We Use Your Information"
            content="We use your information to operate and maintain your Plugd wishlist, process account authentication, enable friends and supporters to discover and gift items on your wishlist, and communicate important updates regarding the service."
          />

          <Section
            title="3. Information Sharing"
            content="Plugd does not sell, rent, or trade your personal information to third parties. Public wishlist items and your chosen username are visible to visitors whom you share your profile link with. We only share data with trusted service providers necessary to operate our infrastructure."
          />

          <Section
            title="4. Data Security"
            content="We employ modern industry-standard security measures, encryption, and secure database protocols to protect your personal information from unauthorized access, alteration, or disclosure."
          />

          <Section
            title="5. Your Choices & Data Rights"
            content="You may access, update, or remove your profile information and wishlist items at any time through your dashboard. If you wish to delete your account or request data removal, please contact our support team."
          />

          <Section
            title="6. Contact Us"
            content={
              <span>
                If you have questions or concerns regarding this Privacy Policy, please reach out to us at{" "}
                <a href="mailto:support@theplugd.com" className="text-foreground hover:underline">
                  support@theplugd.com
                </a>
                .
              </span>
            }
          />
        </div>
      </div>
    </main>
  );
}

function Section({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-[12px] p-10 shadow-sm">
      <h2 className="text-[1.5rem] font-bold text-foreground mb-6">{title}</h2>
      <div className="text-muted text-[1.125rem] leading-[1.8] font-medium">{content}</div>
    </div>
  );
}
