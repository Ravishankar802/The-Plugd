import Link from "next/link";
import FadeInSection from "./FadeInSection";

export const metadata = {
  title: "LEGACY | The Plugd",
  description: "The art of earning by sharing. A story as old as commerce itself.",
};

export default function LegacyPage() {
  return (
    <main 
      className="min-h-screen text-white bg-[#0a0a0a]"
      style={{ 
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 60%)'
      }}
    >
      <style>{`
        @keyframes fadeInHero {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInHero {
          animation: fadeInHero 1.2s ease forwards;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="absolute top-8 left-8 z-50">
          <Link href="/" className="text-green-500 hover:text-green-400 text-sm font-medium tracking-wide transition-colors">
            &larr; Back
          </Link>
        </div>
        
        <div className="animate-fadeInHero opacity-0">
          <p className="text-green-500 text-xs tracking-widest uppercase mb-4 font-bold">
            ESSAY · 5 MIN READ
          </p>
          <h1 
            className="text-7xl md:text-8xl lg:text-[10rem] font-bold uppercase tracking-widest mb-6 leading-none"
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
          <p className="text-white/50 text-xl italic max-w-xl mx-auto">
            The art of earning by sharing. A story as old as commerce itself.
          </p>
          <div className="w-24 border-t border-amber-500/40 mt-8 mx-auto"></div>
        </div>
      </section>

      {/* Section 1 */}
      <section className="mb-32">
        <FadeInSection>
          <div className="w-full relative overflow-hidden mb-16">
            <img 
              src="https://images.unsplash.com/photo-1559526324-593bc073d938?w=1400&q=90&auto=format&fit=crop" 
              alt="It Started Before the Internet"
              crossOrigin="anonymous"
              className="w-full h-[500px] object-cover hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          </div>
        </FadeInSection>
        
        <div className="max-w-3xl mx-auto px-6">
          <FadeInSection>
            <p className="text-amber-500 text-xs tracking-[0.3em] font-mono mb-2">01</p>
            <h2 className="text-5xl font-bold text-white mt-4 mb-6 leading-tight">
              It Started Before the Internet
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8 font-medium">
              Long before algorithms and affiliate links, there was the oldest marketing channel in the world: a person telling another person about something worth knowing.
            </p>
            <p className="text-white/75 text-xl leading-9 mb-8">
              In the 1800s, traveling salesmen were paid commissions for every customer they brought in. Newspaper boys who recruited new subscribers got a cut. The milkman who referred a neighbor got a free week of deliveries. The system had no name then. It didn't need one. It was just how trust moved through a community, and money followed trust.
            </p>
          </FadeInSection>

          <FadeInSection>
            <blockquote className="text-3xl italic text-white/90 font-serif border-l-4 border-amber-500 pl-8 my-16 max-w-2xl">
              Businesses knew that a warm introduction was worth ten cold advertisements. They paid for it accordingly.
            </blockquote>
          </FadeInSection>

          <FadeInSection>
            <p className="text-white/75 text-xl leading-9 mb-8">
              This wasn't charity. It was economics. When someone puts their reputation on the line to recommend a product, the friction of a cold sale is instantly eliminated.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-32">
        <FadeInSection>
          <div className="w-full relative overflow-hidden mb-16">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=90&auto=format&fit=crop" 
              alt="Then the Internet Arrived and Everything Exploded"
              crossOrigin="anonymous"
              className="w-full h-[500px] object-cover hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          </div>
        </FadeInSection>

        <div className="max-w-3xl mx-auto px-6">
          <FadeInSection>
            <p className="text-amber-500 text-xs tracking-[0.3em] font-mono mb-2">02</p>
            <h2 className="text-5xl font-bold text-white mt-4 mb-6 leading-tight">
              Then the Internet Arrived
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8 font-medium">
              In 1999, PayPal was bleeding money on traditional ads. So they tried something different: pay people $10 to sign up, and $10 more for every friend they brought in.
            </p>
            <p className="text-white/75 text-xl leading-9 mb-8">
              Within months they were adding 7 to 10 percent new users every single day. That referral program didn't just grow PayPal. It funded the careers of the people who would go on to build YouTube, LinkedIn, Tesla, and SpaceX. They called it the PayPal Mafia. Referrals built the mafia.
            </p>
            <p className="text-white/75 text-xl leading-9 mb-8">
              In 2008, Dropbox was a file storage startup with a $300 cost-per-acquisition through Google Ads. They scrapped the ads and launched a referral program: free storage for you, free storage for your friend.
            </p>
          </FadeInSection>

          <FadeInSection>
            <blockquote className="text-3xl italic text-white/90 font-serif border-l-4 border-amber-500 pl-8 my-16 max-w-2xl">
              Signups increased by 3,900 percent in fifteen months. They went from 100,000 users to 4,000,000. No ad budget did that. People did that.
            </blockquote>
          </FadeInSection>

          <FadeInSection>
            <p className="text-white/75 text-xl leading-9 mb-8">
              Uber. Airbnb. Robinhood. Cash App. Every major consumer platform of the last two decades has a referral program baked into its DNA. Not as an afterthought, but as the engine.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-32">
        <FadeInSection>
          <div className="w-full relative overflow-hidden mb-16">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=90&auto=format&fit=crop" 
              alt="The Everyday Hustler Figured It Out"
              crossOrigin="anonymous"
              className="w-full h-[500px] object-cover hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          </div>
        </FadeInSection>

        <div className="max-w-3xl mx-auto px-6">
          <FadeInSection>
            <p className="text-amber-500 text-xs tracking-[0.3em] font-mono mb-2">03</p>
            <h2 className="text-5xl font-bold text-white mt-4 mb-6 leading-tight">
              The Everyday Hustler Figured It Out
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8 font-medium">
              You don't need a startup to play this game anymore.
            </p>
            <p className="text-white/75 text-xl leading-9 mb-8">
              Somewhere right now, a 22-year-old is making $4,000 a month dropping referral links in Reddit threads. A mom of three runs a deals newsletter with 8,000 subscribers and earns a full-time income from affiliate commissions. A college student built a Discord server around a niche hobby, and every product recommendation he makes earns him a cut.
            </p>
            <p className="text-white/75 text-xl leading-9 mb-8">
              None of them have investors. None of them have employees. They have audiences, even small ones.
            </p>
          </FadeInSection>

          <FadeInSection>
            <blockquote className="text-3xl italic text-white/90 font-serif border-l-4 border-amber-500 pl-8 my-16 max-w-2xl">
              They understood one thing early: attention that you've earned is worth more than attention you've bought.
            </blockquote>
          </FadeInSection>

          <FadeInSection>
            <p className="text-white/75 text-xl leading-9 mb-8">
              The referral economy is not a side hustle trend. It is a permanent restructuring of how value flows between people. The middlemen didn't disappear. They just became individuals.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Section 4 */}
      <section className="mb-32">
        <FadeInSection>
          <div className="w-full relative overflow-hidden mb-16">
            <img 
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=90&auto=format&fit=crop" 
              alt="Why It Works: The Psychology of Trust"
              crossOrigin="anonymous"
              className="w-full h-[500px] object-cover hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          </div>
        </FadeInSection>

        <div className="max-w-3xl mx-auto px-6">
          <FadeInSection>
            <p className="text-amber-500 text-xs tracking-[0.3em] font-mono mb-2">04</p>
            <h2 className="text-5xl font-bold text-white mt-4 mb-6 leading-tight">
              The Psychology of Trust
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8 font-medium">
              Nielsen's research is unambiguous: 92 percent of consumers trust recommendations from people they know above every other form of advertising. Not 52 percent. Not 72 percent. 92.
            </p>
            <p className="text-white/75 text-xl leading-9 mb-8">
              When a friend tells you about something, your brain skips the skepticism. The mental work of evaluating whether to trust the source is already done. You trust your friend. So you trust the thing they're telling you about. This is not manipulation. It is the natural architecture of human social networks doing what it was built to do.
            </p>
          </FadeInSection>

          <FadeInSection>
            <blockquote className="text-3xl italic text-white/90 font-serif border-l-4 border-amber-500 pl-8 my-16 max-w-2xl">
              Nothing a brand produces converts as well as one honest message from someone who actually uses the product.
            </blockquote>
          </FadeInSection>

          <FadeInSection>
            <p className="text-white/75 text-xl leading-9 mb-8">
              Brands spend billions trying to manufacture that feeling artificially through influencers, sponsored content, and carefully crafted brand voices. But the math is brutal and simple: a referred customer costs less to acquire, converts at a higher rate, stays longer, and refers more people themselves. Every referral is a compounding asset.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Section 5 / CTA */}
      <section>
        <FadeInSection>
          <div className="w-full relative overflow-hidden mb-16">
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1400&q=90&auto=format&fit=crop" 
              alt="This Is Your Moment"
              crossOrigin="anonymous"
              className="w-full h-[500px] object-cover hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          </div>
        </FadeInSection>

        <div className="max-w-3xl mx-auto px-6 mb-20">
          <FadeInSection>
            <p className="text-amber-500 text-xs tracking-[0.3em] font-mono mb-2">05</p>
            <h2 className="text-5xl font-bold text-white mt-4 mb-6 leading-tight">
              This Is Your Moment
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8 font-medium">
              The PayPal founders didn't invent referral marketing. The Dropbox team didn't either. They just recognized the moment they were in and built the right structure around a timeless human behavior.
            </p>
            <p className="text-white/75 text-xl leading-9 mb-8">
              You are living in the most connected moment in human history. Your network, however large or small you think it is, has real, measurable economic value. The question is not whether that value exists. The question is whether you're capturing any of it.
            </p>
            <p className="text-white/75 text-xl leading-9 mb-8">
              Every person you know who joins Plugd puts a dollar in your pocket. That's not a metaphor. That's the structure. Share your link, earn your cut, withdraw when you're ready.
            </p>
          </FadeInSection>

          <FadeInSection>
            <blockquote className="text-3xl italic text-amber-400 font-serif border-l-4 border-amber-500 pl-8 my-16 max-w-2xl">
              The legacy of every great referral business is the same: someone decided their network was worth something, and acted on it before everyone else did.
            </blockquote>
          </FadeInSection>
        </div>

        <FadeInSection>
          <div 
            className="w-full py-32 text-center"
            style={{ 
              backgroundColor: '#15803d', 
              backgroundImage: 'radial-gradient(ellipse at 0% 0%, #eab308 0%, transparent 35%), radial-gradient(ellipse at 100% 100%, #f59e0b 0%, transparent 45%), radial-gradient(ellipse at 0% 100%, #eab308 0%, transparent 35%), radial-gradient(ellipse at 100% 0%, #22c55e 0%, transparent 70%), radial-gradient(ellipse at 50% 50%, #16a34a 0%, transparent 100%)' 
            }}
          >
            <p className="text-amber-500 text-xs tracking-[0.4em] font-mono mb-6 uppercase">
              YOUR TURN
            </p>
            <h3 
              className="text-5xl md:text-6xl text-white font-serif italic mb-4"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Your network is worth something.
            </h3>
            <p className="text-white/50 text-lg mt-4 mb-10">
              Every person you refer puts $1 in your pocket. Payouts twice a month.
            </p>
            <Link 
              href="/"
              className="inline-block bg-[#0a0a0a] hover:bg-black text-white font-bold text-lg px-8 py-4 rounded-full transition-all hover:scale-105 shadow-xl ring-1 ring-white/10"
            >
              Join Plugd
            </Link>
          </div>
        </FadeInSection>
      </section>

    </main>
  );
}
