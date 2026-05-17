import Link from "next/link";

interface Article {
  slug: string;
  image: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
}

export const articles: Article[] = [
  {
    slug: "how-plugd-works",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80&auto=format&fit=crop",
    category: "GETTING STARTED",
    title: "How Plugd Works",
    description: "The full breakdown — pay once, share your link, earn for every person who joins. Simple as that.",
    readTime: "3 MIN READ"
  },
  {
    slug: "how-to-share-your-link",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80&auto=format&fit=crop",
    category: "GETTING STARTED",
    title: "How to Share Your Link",
    description: "The best platforms, the best messages, and what actually gets people to click and join.",
    readTime: "4 MIN READ"
  },
  {
    slug: "first-10-referrals",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&auto=format&fit=crop",
    category: "STRATEGY",
    title: "How to Get Your First 10 Referrals",
    description: "A practical, no-fluff playbook for getting your first 10 people in — even if you think you have no audience.",
    readTime: "5 MIN READ"
  },
  {
    slug: "best-platforms",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&auto=format&fit=crop",
    category: "STRATEGY",
    title: "Which Platforms Convert Best",
    description: "WhatsApp, Instagram, Twitter, Reddit — ranked by how well referral links actually convert on each one.",
    readTime: "4 MIN READ"
  },
  {
    slug: "writing-your-message",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&auto=format&fit=crop",
    category: "STRATEGY",
    title: "How to Write a Message That Gets People to Join",
    description: "The difference between a link that gets ignored and one that converts is the three sentences around it.",
    readTime: "4 MIN READ"
  },
  {
    slug: "how-payouts-work",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop",
    category: "MONEY",
    title: "How Payouts Work",
    description: "When you get paid, how you get paid, minimums, processing times — everything about getting your money out.",
    readTime: "3 MIN READ"
  },
  {
    slug: "realistic-earnings",
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80&auto=format&fit=crop",
    category: "MONEY",
    title: "How Much Can You Realistically Earn",
    description: "Honest math, real scenarios. What 10 referrals looks like, what 100 looks like, and what it takes to get there.",
    readTime: "5 MIN READ"
  }
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white py-12 pb-24">
      {/* Header section */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-2 text-left relative">
        <Link href="/" className="text-green-500 text-sm hover:text-green-400 transition-colors inline-flex items-center gap-1 mb-8 font-sans">
          ← Back
        </Link>
        <h1 className="text-5xl font-bold text-white tracking-tight font-sans">Resources</h1>
        <p className="text-white/40 text-lg mt-2 mb-12 font-sans">
          Everything you need to earn more, faster.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link 
              key={article.slug}
              href={`/resources/${article.slug}`}
              className="group bg-[#111] rounded-xl overflow-hidden border border-white/5 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
            >
              {/* Cover Image */}
              <div className="w-full h-48 overflow-hidden relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 text-left">
                <div>
                  <span className="bg-green-500/10 text-green-400 text-xs font-mono px-2 py-1 rounded-full inline-block mb-3">
                    {article.category}
                  </span>
                  <h2 className="text-white font-semibold text-lg leading-snug mb-2 font-sans group-hover:text-green-400 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-white/40 text-sm leading-6 font-sans">
                    {article.description}
                  </p>
                </div>
                
                {/* Read time */}
                <div className="text-white/20 text-xs mt-auto pt-4 font-mono">
                  {article.readTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
