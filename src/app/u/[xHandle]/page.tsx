import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { 
  Share2, 
  Check, 
  Bookmark, 
  X as XIcon,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import ProfileActions from "@/components/ProfileActions";
import Footer from "@/components/Footer";

// Force dynamic to ensure we get fresh data
export const dynamic = "force-dynamic";

interface ProfilePageProps {
  params: Promise<{ xHandle: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { xHandle } = await params;
  const cleanHandle = xHandle.replace(/^@+/, "");

  // Fetch current account
  const account = await prisma.account.findFirst({
    where: {
      xHandle: {
        equals: cleanHandle,
        mode: "insensitive",
      },
      status: "paid",
    },
  });

  if (!account) {
    notFound();
  }

  // Fetch 3 random accounts for "Discover More"
  // Using a simpler approach: fetch a larger subset and pick 3 random ones
  const allPaidAccounts = await prisma.account.findMany({
    where: {
      status: "paid",
      id: { not: account.id },
    },
    take: 50, // Get a good sample size
  });

  const randomAccounts = allPaidAccounts
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // Helper for initials avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(account.name);
  const profileUrl = `https://the-plugd.vercel.app/u/${cleanHandle}`;

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 pt-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-muted text-sm font-medium mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Plugd</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{account.name}</span>
        </nav>

        {/* Main Profile Card */}
        <div className="w-full bg-card border border-border rounded-2xl p-6 md:p-10 mb-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="relative shrink-0">
              {account.avatarUrl ? (
                <img 
                  src={account.avatarUrl} 
                  alt={account.name} 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-background shadow-xl"
                />
              ) : (
                <div 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background shadow-xl flex items-center justify-center text-3xl md:text-4xl font-bold text-white"
                  style={{ 
                    backgroundColor: `hsl(${account.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360}, 60%, 40%)` 
                  }}
                >
                  {initials}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-[800] tracking-tight mb-1">{account.name}</h1>
                  <p className="text-muted text-lg font-mono-custom">@{cleanHandle}</p>
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-2xl md:text-3xl font-mono-custom font-[800] text-muted opacity-40">#{account.id}</span>
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted opacity-30 cursor-not-allowed bg-pill">
                        <Check className="w-4 h-4" />
                      </div>
                      <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted opacity-30 cursor-not-allowed bg-pill">
                        <Bookmark className="w-4 h-4" />
                      </div>
                      <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted opacity-30 cursor-not-allowed bg-pill">
                        <XIcon className="w-4 h-4" />
                      </div>
                   </div>
                </div>
              </div>

              <p className="text-foreground/90 text-lg leading-relaxed mb-6 whitespace-pre-wrap">
                {account.bio}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {account.niche.map((n) => (
                  <span key={n} className="px-3 py-1 rounded-full bg-pill border border-border text-sm font-semibold text-muted">
                    {n}
                  </span>
                ))}
              </div>

              <ProfileActions handle={cleanHandle} />
            </div>
          </div>
        </div>

        {/* Claim Card */}
        <div className="w-full bg-pill border border-border rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Is this you?</h2>
            <p className="text-muted">Claim this account to manage your account.</p>
          </div>
          <button className="px-6 py-3 bg-foreground text-background rounded-xl font-bold hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer">
            Claim this account
          </button>
        </div>

        {/* Discover More Section */}
        <section className="w-full mb-20">
          <h2 className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-6">DISCOVER MORE ON PLUGD</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {randomAccounts.map((acc) => (
              <Link 
                key={acc.id} 
                href={`/u/${acc.xHandle.replace(/^@+/, "")}`}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-muted-foreground/30 transition-all flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  {acc.avatarUrl ? (
                    <img src={acc.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover border border-border" />
                  ) : (
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white border border-border shrink-0"
                      style={{ 
                        backgroundColor: `hsl(${acc.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360}, 60%, 40%)` 
                      }}
                    >
                      {getInitials(acc.name)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-bold truncate">{acc.name}</p>
                    <p className="text-muted text-xs truncate">@{acc.xHandle.replace(/^@+/, "")}</p>
                  </div>
                </div>
                <p className="text-sm text-muted line-clamp-2 mb-4 flex-1">
                  {acc.bio}
                </p>
                <div className="pt-4 border-t border-border flex items-center justify-between">
                   <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted opacity-30 bg-pill">
                        <Check className="w-3 h-3" />
                      </div>
                      <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted opacity-30 bg-pill">
                        <Bookmark className="w-3 h-3" />
                      </div>
                      <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted opacity-30 bg-pill">
                        <XIcon className="w-3 h-3" />
                      </div>
                   </div>
                   <ChevronRight className="w-4 h-4 text-muted group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
