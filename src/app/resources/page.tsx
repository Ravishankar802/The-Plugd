import Link from "next/link";

interface Article {
  slug: string;
  image: string;
  category: string;
  title: string;
  description: string;
}

export const articles: Article[] = [
  {
    slug: "how-plugd-works",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80&auto=format&fit=crop",
    category: "GETTING STARTED",
    title: "How Plugd Works",
    description: "The full breakdown: pay once, share your link, and earn for every person who joins. Simple as that."
  },
  {
    slug: "how-to-share-your-link",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80&auto=format&fit=crop",
    category: "GETTING STARTED",
    title: "How to Share Your Link",
    description: "The best platforms, the best messages, and what actually gets people to click and join."
  },
  {
    slug: "first-10-referrals",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&auto=format&fit=crop",
    category: "STRATEGY",
    title: "How to Get Your First 10 Referrals",
    description: "A practical, no-fluff playbook for getting your first 10 people in, even if you think you have no audience."
  },
  {
    slug: "best-platforms",
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80&auto=format&fit=crop",
    category: "STRATEGY",
    title: "Which Platforms Convert Best",
    description: "WhatsApp, Instagram, X, Reddit — ranked by how well referral links actually convert on each one."
  },
  {
    slug: "writing-your-message",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&auto=format&fit=crop",
    category: "STRATEGY",
    title: "How to Write a Message That Gets People to Join",
    description: "The difference between a link that gets ignored and one that converts is the three sentences around it."
  },
  {
    slug: "how-payouts-work",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop",
    category: "MONEY",
    title: "How Payouts Work",
    description: "When you get paid, how you get paid, minimums, processing times, and everything about getting your money out."
  },
  {
    slug: "realistic-earnings",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80",
    category: "MONEY",
    title: "How Much Can You Realistically Earn",
    description: "Honest math, real scenarios. What 10 referrals looks like, what 100 looks like, and what it takes to get there."
  }
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white pt-6 pb-24">
      {/* Header section */}
      <div className="max-w-5xl mx-auto px-6 pt-0 pb-2 text-left relative">
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
                {article.slug === "best-platforms" ? (
                  <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center gap-6 px-4 group-hover:scale-105 transition-transform duration-500">
                    {/* WhatsApp */}
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>

                    {/* Instagram */}
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
                        <defs>
                          <linearGradient id="insta-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#E1306C" />
                            <stop offset="100%" stopColor="#F77737" />
                          </linearGradient>
                        </defs>
                        <path 
                          fill="url(#insta-grad)" 
                          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                        />
                      </svg>
                    </div>

                    {/* X */}
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>

                    {/* Discord */}
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg className="w-full h-full text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                      </svg>
                    </div>

                    {/* TikTok */}
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg className="w-full h-full text-[#EE1D52]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.032 2.61-.016 3.91-.016.08 1.62.74 3.12 1.8 4.26 1.13 1.19 2.68 1.9 4.35 1.94v3.91c-1.22-.03-2.42-.4-3.48-1.06-.94-.6-1.7-1.44-2.22-2.41l-.03 8.33c.12 4.41-3.23 8.16-7.65 8.43-4.99.3-9.28-3.5-9.28-8.52 0-4.42 3.27-8.16 7.67-8.43.91-.06 1.83.1 2.68.47v4.13c-.6-.31-1.27-.47-1.95-.45-2.23.08-3.95 1.98-3.83 4.21.1 2.03 1.77 3.65 3.8 3.62 2.37-.02 4.14-2.07 3.97-4.46V.02z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
