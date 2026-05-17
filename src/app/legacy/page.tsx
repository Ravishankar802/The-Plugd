import Link from "next/link";

export const metadata = {
  title: "LEGACY | The Plugd",
  description: "The art of earning by sharing — a story as old as commerce itself.",
};

export default function LegacyPage() {
  return (
    <main 
      className="min-h-screen text-white pb-24"
      style={{ 
        backgroundColor: '#0a0a0a',
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 60%)'
      }}
    >
      <div className="max-w-2xl mx-auto px-6 pt-16">
        <Link href="/" className="inline-block text-green-500 hover:text-green-400 text-sm font-medium tracking-wide mb-16 transition-colors">
          &larr; Back
        </Link>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center mb-20 text-center">
          <p className="text-green-500 text-xs tracking-widest uppercase mb-4 font-bold">
            ESSAY · 5 MIN READ
          </p>
          <h1 
            className="text-7xl md:text-8xl font-bold uppercase tracking-widest mb-6"
            style={{ 
              fontFamily: '"Times New Roman", Times, serif',
              background: 'linear-gradient(135deg, #22c55e, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            LEGACY
          </h1>
          <p className="text-white/50 text-lg md:text-xl italic max-w-xl">
            The art of earning by sharing — a story as old as commerce itself.
          </p>
          <div className="w-full max-w-sm border-t border-amber-500/40 mt-8"></div>
        </section>

        {/* Section 1 */}
        <section>
          <img 
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80&auto=format&fit=crop" 
            alt="It Started Before the Internet"
            crossOrigin="anonymous"
            className="w-full h-72 object-cover rounded-xl ring-1 ring-white/10 mb-8 mt-2 shadow-2xl"
          />
          <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-green-500 pl-4 leading-tight">
            It Started Before the Internet
          </h2>
          <p className="text-xl text-white/90 leading-relaxed mb-6 font-medium">
            Long before algorithms and affiliate links, there was the oldest marketing channel in the world: a person telling another person about something worth knowing.
          </p>
          <p className="text-white/80 text-lg leading-8 mb-6">
            In the 1800s, traveling salesmen were paid commissions for every customer they brought in. Newspaper boys who recruited new subscribers got a cut. The milkman who referred a neighbor got a free week of deliveries. The system had no name then. It didn't need one. It was just how trust moved through a community — and money followed trust.
          </p>

          <blockquote className="bg-white/5 rounded-xl p-6 my-8 border border-white/10">
            <p className="text-xl font-medium italic text-white/90">
              "Businesses knew that a warm introduction was worth ten cold advertisements. They paid for it accordingly."
            </p>
          </blockquote>

          <p className="text-white/80 text-lg leading-8 mb-6">
            This wasn't charity. It was economics. When someone puts their reputation on the line to recommend a product, the friction of a cold sale is instantly eliminated.
          </p>
        </section>

        <div className="text-center text-white/20 text-xl my-16 tracking-[1em] select-none">· · ·</div>

        {/* Section 2 */}
        <section>
          <img 
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80&auto=format&fit=crop" 
            alt="Then the Internet Arrived and Everything Exploded"
            crossOrigin="anonymous"
            className="w-full h-72 object-cover rounded-xl ring-1 ring-white/10 mb-8 mt-2 shadow-2xl"
          />
          <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-green-500 pl-4 leading-tight">
            Then the Internet Arrived
          </h2>
          <p className="text-xl text-white/90 leading-relaxed mb-6 font-medium">
            In 1999, PayPal was bleeding money on traditional ads. So they tried something different: pay people $10 to sign up, and $10 more for every friend they brought in.
          </p>
          <p className="text-white/80 text-lg leading-8 mb-6">
            Within months they were adding 7 to 10 percent new users every single day. That referral program didn't just grow PayPal — it funded the careers of the people who would go on to build YouTube, LinkedIn, Tesla, and SpaceX. They called it the PayPal Mafia. Referrals built the mafia.
          </p>
          <p className="text-white/80 text-lg leading-8 mb-6">
            In 2008, Dropbox was a file storage startup with a $300 cost-per-acquisition through Google Ads. They scrapped the ads and launched a referral program — free storage for you, free storage for your friend.
          </p>

          <blockquote className="bg-white/5 rounded-xl p-6 my-8 border border-white/10">
            <p className="text-xl font-medium italic text-white/90">
              "Signups increased by 3,900 percent in fifteen months. They went from 100,000 users to 4,000,000. No ad budget did that. People did that."
            </p>
          </blockquote>

          <p className="text-white/80 text-lg leading-8 mb-6">
            Uber. Airbnb. Robinhood. Cash App. Every major consumer platform of the last two decades has a referral program baked into its DNA. Not as an afterthought — as the engine.
          </p>
        </section>

        <div className="text-center text-white/20 text-xl my-16 tracking-[1em] select-none">· · ·</div>

        {/* Section 3 */}
        <section>
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&auto=format&fit=crop" 
            alt="The Everyday Hustler Figured It Out"
            crossOrigin="anonymous"
            className="w-full h-72 object-cover rounded-xl ring-1 ring-white/10 mb-8 mt-2 shadow-2xl"
          />
          <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-green-500 pl-4 leading-tight">
            The Everyday Hustler Figured It Out
          </h2>
          <p className="text-xl text-white/90 leading-relaxed mb-6 font-medium">
            You don't need a startup to play this game anymore.
          </p>
          <p className="text-white/80 text-lg leading-8 mb-6">
            Somewhere right now, a 22-year-old is making $4,000 a month dropping referral links in Reddit threads. A mom of three runs a deals newsletter with 8,000 subscribers and earns a full-time income from affiliate commissions. A college student built a Discord server around a niche hobby, and every product recommendation he makes earns him a cut.
          </p>
          <p className="text-white/80 text-lg leading-8 mb-6">
            None of them have investors. None of them have employees. They have audiences — even small ones.
          </p>

          <blockquote className="bg-white/5 rounded-xl p-6 my-8 border border-white/10">
            <p className="text-xl font-medium italic text-white/90">
              "They understood one thing early: attention that you've earned is worth more than attention you've bought."
            </p>
          </blockquote>

          <p className="text-white/80 text-lg leading-8 mb-6">
            The referral economy is not a side hustle trend. It is a permanent restructuring of how value flows between people. The middlemen didn't disappear. They just became individuals.
          </p>
        </section>

        <div className="text-center text-white/20 text-xl my-16 tracking-[1em] select-none">· · ·</div>

        {/* Section 4 */}
        <section>
          <img 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80&auto=format&fit=crop" 
            alt="Why It Works: The Psychology of Trust"
            crossOrigin="anonymous"
            className="w-full h-72 object-cover rounded-xl ring-1 ring-white/10 mb-8 mt-2 shadow-2xl"
          />
          <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-green-500 pl-4 leading-tight">
            The Psychology of Trust
          </h2>
          <p className="text-xl text-white/90 leading-relaxed mb-6 font-medium">
            Nielsen's research is unambiguous: 92 percent of consumers trust recommendations from people they know above every other form of advertising. Not 52 percent. Not 72 percent. 92.
          </p>
          <p className="text-white/80 text-lg leading-8 mb-6">
            When a friend tells you about something, your brain skips the skepticism. The mental work of evaluating whether to trust the source is already done. You trust your friend. So you trust the thing they're telling you about. This is not manipulation — it is the natural architecture of human social networks doing what it was built to do.
          </p>

          <blockquote className="bg-white/5 rounded-xl p-6 my-8 border border-white/10">
            <p className="text-xl font-medium italic text-white/90">
              "Nothing a brand produces converts as well as one honest message from someone who actually uses the product."
            </p>
          </blockquote>

          <p className="text-white/80 text-lg leading-8 mb-6">
            Brands spend billions trying to manufacture that feeling artificially through influencers, sponsored content, and carefully crafted brand voices. But the math is brutal and simple: a referred customer costs less to acquire, converts at a higher rate, stays longer, and refers more people themselves. Every referral is a compounding asset.
          </p>
        </section>

        {/* Section 5 (Special Treatment CTA) */}
        <div className="bg-gradient-to-br from-green-950 to-black border border-green-800/40 rounded-2xl p-8 md:p-10 mt-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none"></div>
          <div className="relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80&auto=format&fit=crop" 
              alt="This Is Your Moment"
              crossOrigin="anonymous"
              className="w-full h-72 object-cover rounded-xl ring-1 ring-white/10 mb-8 shadow-2xl"
            />
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-amber-500 pl-4 leading-tight">
              This Is Your Moment
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-6 font-medium">
              The PayPal founders didn't invent referral marketing. The Dropbox team didn't either. They just recognized the moment they were in and built the right structure around a timeless human behavior.
            </p>
            <p className="text-white/80 text-lg leading-8 mb-6">
              You are living in the most connected moment in human history. Your network — however large or small you think it is — has real, measurable economic value. The question is not whether that value exists. The question is whether you're capturing any of it.
            </p>
            <p className="text-white/80 text-lg leading-8 mb-6">
              Every person you know who joins Plugd puts a dollar in your pocket. That's not a metaphor. That's the structure. Share your link, earn your cut, withdraw when you're ready.
            </p>
            <p className="text-xl text-amber-400 font-medium italic mt-8 border-t border-white/10 pt-8">
              The legacy of every great referral business is the same: someone decided their network was worth something, and acted on it before everyone else did.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
