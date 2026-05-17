import Link from "next/link";
import ClientObserver from "./ClientObserver";

export const metadata = {
  title: "LEGACY | The Plugd",
  description: "The art of earning by sharing. A story as old as commerce itself.",
};

export default function LegacyPage() {
  return (
    <main className="bg-[#080808] text-[#f5f5f0] font-sans antialiased overflow-x-hidden">
      <ClientObserver />
      
      <style>{`
        .reveal { 
          opacity: 0; 
          transform: translateY(40px); 
          transition: opacity 0.9s ease, transform 0.9s ease; 
        }
        .reveal.visible { 
          opacity: 1; 
          transform: translateY(0); 
        }
        .reveal-delay-1 { transition-delay: 0.15s; }
        .reveal-delay-2 { transition-delay: 0.3s; }
        .reveal-delay-3 { transition-delay: 0.45s; }
        .font-serif-custom { font-family: Georgia, "Times New Roman", serif; }
      `}</style>

      {/* SECTION 0 — HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#080808]">
        <div className="absolute top-8 left-8 z-50">
          <Link href="/" className="text-green-500 hover:text-green-400 text-sm font-medium transition-colors">
            &larr; Back
          </Link>
        </div>
        
        <div className="reveal visible">
          <p className="text-amber-500 text-xs tracking-[0.5em] font-mono mb-8 font-bold uppercase">
            ESSAY · 7 MIN READ
          </p>
          <h1 
            className="text-7xl md:text-[10rem] leading-none font-bold tracking-tight mb-6 font-serif-custom"
            style={{ 
              background: 'linear-gradient(135deg, #4ade80, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            LEGACY
          </h1>
          <p className="text-white/50 text-xl italic font-serif-custom mt-6 max-w-xl mx-auto">
            The art of earning by sharing. A story as old as commerce itself.
          </p>
          <div className="w-24 h-px bg-amber-500/50 mx-auto mt-10"></div>
        </div>
        
        <div className="absolute bottom-12 text-white/20 animate-bounce text-xl pointer-events-none">
          &darr;
        </div>
      </section>

      {/* SECTION 1 */}
      <section className="mb-32">
        <div className="relative w-full h-[60vh] mb-16 overflow-hidden bg-[#080808]">
          <img 
            src="https://images.unsplash.com/photo-1559526324-593bc073d938?w=1400&q=90&auto=format&fit=crop" 
            alt="Before Google. Before Newspapers. Before Money Had a Name."
            crossOrigin="anonymous"
            className="w-full h-full object-cover reveal"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808] pointer-events-none"></div>
        </div>

        <div className="max-w-2xl mx-auto px-6">
          <p className="text-amber-500/60 text-xs tracking-[0.5em] font-mono mb-4 reveal">01</p>
          <h2 className="text-4xl md:text-5xl font-serif-custom text-white leading-tight mb-8 reveal reveal-delay-1">
            Before Google. Before Newspapers. Before Money Had a Name.
          </h2>
          <div className="space-y-6 text-white/70 text-lg md:text-xl leading-9 reveal reveal-delay-2">
            <p>
              In 3000 BC, Egyptian merchants carved their names and reputations into clay tablets and passed them to travelers heading to distant cities. Not advertisements. Referrals. A record that said: this person traded with me, and I vouch for them. The oldest known written endorsement in human history is a referral.
            </p>
            <p>
              Greek merchants in 500 BC hired town criers whose sole job was to walk through the Agora announcing the arrival of ships. But the smart merchants paid citizens, regular people, to spread the word through neighborhoods the criers never reached. They paid commissions. In ancient Greece. Twenty-five centuries before Silicon Valley invented the word "affiliate."
            </p>
            <p>
              In medieval Venice, the Silk Road traders created an entire class of professional middlemen called sensali, licensed brokers paid a percentage of every deal they connected. The Venetian government regulated their commissions by law in 1270 AD. Referral programs were so powerful they needed legislation.
            </p>
          </div>

          <blockquote className="text-3xl md:text-4xl italic font-serif-custom text-amber-400 border-l-4 border-amber-500 pl-10 my-16 max-w-3xl reveal">
            "The oldest written endorsement in human history is a referral. Carved in clay. 5,000 years ago."
          </blockquote>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="mb-32">
        <div className="relative w-full h-[60vh] mb-16 overflow-hidden bg-[#080808]">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=90&auto=format&fit=crop" 
            alt="The Day PayPal Broke Mathematics"
            crossOrigin="anonymous"
            className="w-full h-full object-cover reveal"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808] pointer-events-none"></div>
        </div>

        <div className="max-w-2xl mx-auto px-6">
          <p className="text-amber-500/60 text-xs tracking-[0.5em] font-mono mb-4 reveal">02</p>
          <h2 className="text-4xl md:text-5xl font-serif-custom text-white leading-tight mb-8 reveal reveal-delay-1">
            The Day PayPal Broke Mathematics
          </h2>
          <div className="space-y-6 text-white/70 text-lg md:text-xl leading-9 reveal reveal-delay-2">
            <p>
              The average company grows 15 to 45 percent per year. That's considered exceptional. PayPal grew 1,650 percent per year. Not over a decade. In its first years of operation. The referral program that caused this was so simple it bordered on absurd: give $20 to anyone who joins, give $20 more to whoever referred them.
            </p>
            <p>
              At peak, PayPal was adding users at a rate of 7 to 10 percent. Per day. Not per year. Per day. They went from 1 million users to 5 million users in six months. Elon Musk, reflecting on this later, described it as "bacteria growing in a petri dish." The company spent $60 to $70 million on referral bonuses. They sold for $1.5 billion. Every dollar spent on referrals returned over twenty dollars in exit value.
            </p>
            <p>
              The people who built that referral program went on to found YouTube, LinkedIn, Tesla, Palantir, and SpaceX. They are collectively called the PayPal Mafia. The referral program didn't just build PayPal. It funded the companies that defined the next two decades of civilization.
            </p>
          </div>

          <blockquote className="text-3xl md:text-4xl italic font-serif-custom text-amber-400 border-l-4 border-amber-500 pl-10 my-16 max-w-3xl reveal">
            "PayPal grew 1,650% per year. The referral program that caused it offered two things: $20 and trust."
          </blockquote>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="mb-32">
        <div className="relative w-full h-[60vh] mb-16 overflow-hidden bg-[#080808]">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=90&auto=format&fit=crop" 
            alt="Dropbox Did It With No Marketing Team. Zero."
            crossOrigin="anonymous"
            className="w-full h-full object-cover reveal"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808] pointer-events-none"></div>
        </div>

        <div className="max-w-2xl mx-auto px-6">
          <p className="text-amber-500/60 text-xs tracking-[0.5em] font-mono mb-4 reveal">03</p>
          <h2 className="text-4xl md:text-5xl font-serif-custom text-white leading-tight mb-8 reveal reveal-delay-1">
            Dropbox Did It With No Marketing Team. Zero.
          </h2>
          <div className="space-y-6 text-white/70 text-lg md:text-xl leading-9 reveal reveal-delay-2">
            <p>
              In 2008, Dropbox tried Google Ads. Each new customer cost $388 to acquire. Their product cost $99 per year. The math was a death sentence. So they fired the ads and launched a referral program. Give existing users 500MB of free storage for every friend they brought in. The friend got storage too.
            </p>
            <p>
              35 percent of all new daily signups came through referrals within the first month. By April 2010, users were sending 2.8 million referral invites in a single month. In 15 months, Dropbox went from 100,000 users to 4,000,000. That is 3,900 percent growth. With no full-time marketer. No ad budget. No PR agency. Just people telling other people.
            </p>
            <p>
              Dropbox is now worth over $10 billion. The referral program cost a few hundred megabytes of server storage per user. The return on that investment is mathematically difficult to express.
            </p>
          </div>

          <blockquote className="text-3xl md:text-4xl italic font-serif-custom text-green-400 border-l-4 border-green-500 pl-10 my-16 max-w-3xl reveal">
            "3,900% growth. No marketer. No ad budget. Just people telling other people."
          </blockquote>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="mb-32">
        <div className="relative w-full h-[60vh] mb-16 overflow-hidden bg-[#080808]">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=90&auto=format&fit=crop" 
            alt="Your Neighbor Is Making $4,000 a Month and You Don't Know It"
            crossOrigin="anonymous"
            className="w-full h-full object-cover reveal"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808] pointer-events-none"></div>
        </div>

        <div className="max-w-2xl mx-auto px-6">
          <p className="text-amber-500/60 text-xs tracking-[0.5em] font-mono mb-4 reveal">04</p>
          <h2 className="text-4xl md:text-5xl font-serif-custom text-white leading-tight mb-8 reveal reveal-delay-1">
            Your Neighbor Is Making $4,000 a Month and You Don't Know It
          </h2>
          <div className="space-y-6 text-white/70 text-lg md:text-xl leading-9 reveal reveal-delay-2">
            <p>
              Nielsen has studied consumer trust for decades. The number has barely moved: 92 percent of people trust recommendations from someone they know above every other form of advertising. Not 52. Not 72. 92. No billboard, no celebrity endorsement, no Super Bowl ad has ever come close to matching the conversion rate of a friend saying "try this."
            </p>
            <p>
              This is why a referred customer costs less to acquire, converts at a higher rate, pays more over their lifetime, and refers more people themselves. Every referral compounds. The person who joins because you shared a link might refer five people. Those five might each refer three. A single share from the right person can seed an entire network.
            </p>
            <p>
              Right now, there are people earning $2,000, $5,000, $10,000 a month from referral programs. Not influencers with millions of followers. Regular people with regular networks who understood one thing early: attention you have earned is worth more than attention you have bought. The referral economy does not care about your follower count. It cares about trust.
            </p>
          </div>

          <blockquote className="text-3xl md:text-4xl italic font-serif-custom text-amber-400 border-l-4 border-amber-500 pl-10 my-16 max-w-3xl reveal">
            "92% of people trust a recommendation from a friend above every other form of advertising. Every other form."
          </blockquote>
        </div>
      </section>

      {/* SECTION 5 / CTA */}
      <section 
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-8"
        style={{ 
          backgroundColor: '#15803d', 
          backgroundImage: 'radial-gradient(ellipse at 50% 40%, #22c55e 0%, transparent 60%), radial-gradient(ellipse at 20% 50%, #16a34a 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, #16a34a 0%, transparent 50%), radial-gradient(ellipse at 25% 90%, #92400e 0%, transparent 35%), radial-gradient(ellipse at 75% 90%, #92400e 0%, transparent 35%)' 
        }}
      >
        <div className="max-w-2xl mx-auto w-full reveal">
          <p className="text-white/30 text-xs tracking-[0.5em] font-mono mb-6 uppercase">05</p>
          
          <h2 className="text-3xl md:text-4xl font-serif-custom text-white leading-snug mb-8 reveal reveal-delay-1">
            "The PayPal founders didn't invent this. Neither did Dropbox. Neither did you. But you can use it."
          </h2>
          
          <div className="text-white/80 text-lg leading-9 mb-12 space-y-6 reveal reveal-delay-2 font-sans text-left md:text-center">
            <p>
              You are living in the most connected moment in human history. Your network, however large or small you think it is, has real, measurable economic value. The question is not whether that value exists. It does. The question is whether you are capturing any of it.
            </p>
            <p>
              Every person you know who joins Plugd puts a dollar in your pocket. That is not a metaphor. That is the structure. Share your link. Earn your cut. Withdraw when you're ready. Payouts on the 1st and 15th of every month.
            </p>
          </div>
          
          <div className="reveal reveal-delay-3">
            <Link 
              href="/"
              className="inline-block bg-white hover:bg-white/90 text-black font-bold text-lg px-10 py-4 rounded-full transition-colors shadow-2xl"
            >
              Join Plugd
            </Link>
            <p className="text-white/40 text-sm mt-4">
              $2 to join. $1 per referral. $10 minimum payout.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
