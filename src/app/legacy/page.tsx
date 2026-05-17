import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "LEGACY | The Plugd",
  description: "The art of earning by sharing — a story as old as commerce itself.",
};

export default function LegacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-block text-white/40 hover:text-white text-sm mb-16 transition-colors">
          &larr; Back
        </Link>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center mb-20 text-center">
          <h1 
            className="text-7xl font-bold uppercase tracking-widest mb-6"
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
          <p className="text-white/50 text-lg italic max-w-2xl">
            The art of earning by sharing — a story as old as commerce itself.
          </p>
        </section>

        {/* Section 1 */}
        <section className="mb-12">
          <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e" 
              alt="It Started Before the Internet"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">It Started Before the Internet</h2>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            Long before algorithms and affiliate links, there was the oldest marketing channel in the world: a person telling another person about something worth knowing.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            In the 1800s, traveling salesmen were paid commissions for every customer they brought in. Newspaper boys who recruited new subscribers got a cut. The milkman who referred a neighbor got a free week of deliveries. The system had no name then. It didn't need one. It was just how trust moved through a community — and money followed trust.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            This wasn't charity. It was economics. Businesses knew that a warm introduction was worth ten cold advertisements. They paid for it accordingly.
          </p>
        </section>

        <div className="border-t border-white/10 my-12"></div>

        {/* Section 2 */}
        <section className="mb-12">
          <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3" 
              alt="Then the Internet Arrived and Everything Exploded"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Then the Internet Arrived and Everything Exploded</h2>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            In 1999, PayPal was bleeding money on traditional ads. So they tried something different: pay people $10 to sign up, and $10 more for every friend they brought in. Within months they were adding 7 to 10 percent new users every single day. That referral program didn't just grow PayPal — it funded the careers of the people who would go on to build YouTube, LinkedIn, Tesla, and SpaceX. They called it the PayPal Mafia. Referrals built the mafia.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            In 2008, Dropbox was a file storage startup with a $300 cost-per-acquisition through Google Ads. They scrapped the ads and launched a referral program — free storage for you, free storage for your friend. Signups increased by 3,900 percent in fifteen months. They went from 100,000 users to 4,000,000. No ad budget did that. People did that.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            Uber. Airbnb. Robinhood. Cash App. Every major consumer platform of the last two decades has a referral program baked into its DNA. Not as an afterthought — as the engine.
          </p>
        </section>

        <div className="border-t border-white/10 my-12"></div>

        {/* Section 3 */}
        <section className="mb-12">
          <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d" 
              alt="The Everyday Hustler Figured It Out"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">The Everyday Hustler Figured It Out</h2>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            You don't need a startup to play this game anymore.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            Somewhere right now, a 22-year-old is making $4,000 a month dropping referral links in Reddit threads. A mom of three runs a deals newsletter with 8,000 subscribers and earns a full-time income from affiliate commissions. A college student built a Discord server around a niche hobby, and every product recommendation he makes earns him a cut.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            None of them have investors. None of them have employees. They have audiences — even small ones — and they understood one thing early: attention that you've earned is worth more than attention you've bought.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            The referral economy is not a side hustle trend. It is a permanent restructuring of how value flows between people. The middlemen didn't disappear. They just became individuals.
          </p>
        </section>

        <div className="border-t border-white/10 my-12"></div>

        {/* Section 4 */}
        <section className="mb-12">
          <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216" 
              alt="Why It Works: The Psychology of Trust"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Why It Works: The Psychology of Trust</h2>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            Nielsen's research is unambiguous: 92 percent of consumers trust recommendations from people they know above every other form of advertising. Not 52 percent. Not 72 percent. 92.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            When a friend tells you about something, your brain skips the skepticism. The mental work of evaluating whether to trust the source is already done. You trust your friend. So you trust the thing they're telling you about. This is not manipulation — it is the natural architecture of human social networks doing what it was built to do.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            Brands spend billions trying to manufacture that feeling artificially through influencers, sponsored content, and carefully crafted brand voices. And yet nothing they produce converts as well as one honest message from someone who actually uses the product.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            The math is brutal and simple: a referred customer costs less to acquire, converts at a higher rate, stays longer, and refers more people themselves. Every referral is a compounding asset.
          </p>
        </section>

        <div className="border-t border-white/10 my-12"></div>

        {/* Section 5 */}
        <section className="mb-12">
          <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
              alt="This Is Your Moment"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">This Is Your Moment</h2>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            The PayPal founders didn't invent referral marketing. The Dropbox team didn't either. They just recognized the moment they were in and built the right structure around a timeless human behavior.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            You are living in the most connected moment in human history. Your network — however large or small you think it is — has real, measurable economic value. The question is not whether that value exists. The question is whether you're capturing any of it.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            Every person you know who joins Plugd puts a dollar in your pocket. That's not a metaphor. That's the structure. Share your link, earn your cut, withdraw when you're ready.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            The legacy of every great referral business is the same: someone decided their network was worth something, and acted on it before everyone else did.
          </p>
        </section>

      </div>
    </main>
  );
}
