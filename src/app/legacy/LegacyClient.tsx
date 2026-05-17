"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LegacyClient() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // Enable smooth scrolling locally to the container, though snap handles most of it
    document.documentElement.style.scrollBehavior = "smooth";
    
    const sections = document.querySelectorAll('.snap-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          setActiveSection(Number(entry.target.getAttribute('data-index')));
        }
      });
    }, { threshold: 0.5 });
    
    sections.forEach(sec => observer.observe(sec));
    
    return () => {
      observer.disconnect();
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="bg-[#080808] text-[#f5f5f0] font-sans antialiased overflow-hidden h-screen w-full">
      <style>{`
        html { scroll-behavior: smooth; }
        .snap-container {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          /* Hide scrollbars for clean experience */
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .snap-container::-webkit-scrollbar {
          display: none;
        }
        .snap-section {
          height: 100vh;
          scroll-snap-align: start;
          position: relative;
          overflow: hidden;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(1.08); }
          to { opacity: 1; transform: scale(1); }
        }
        .anim-fadeup { opacity: 0; }
        .in-view .anim-fadeup { animation: fadeUp 1s ease forwards; }
        
        .anim-scalein { opacity: 0; }
        .in-view .anim-scalein { animation: scaleIn 1.2s ease forwards; }
        
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .delay-4 { animation-delay: 0.8s; }
        
        .font-serif-custom { font-family: Georgia, 'Times New Roman', serif; }
      `}</style>

      {/* FIXED NAV */}
      <Link 
        href="/" 
        className="fixed top-6 left-8 z-50 text-green-400 text-sm font-mono hover:text-green-300 transition-colors"
      >
        &larr; Back
      </Link>

      {/* FIXED DOTS */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <div 
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSection === idx ? 'bg-green-500 scale-150' : 'bg-white/20'}`}
          />
        ))}
      </div>

      <div className="snap-container">
        {/* SECTION 0 */}
        <section className="snap-section flex flex-col items-center justify-center text-center bg-[#080808]" data-index="0">
          <p className="anim-fadeup delay-1 text-amber-500 text-xs tracking-[0.6em] font-mono mb-8 uppercase font-bold">
            ESSAY · 7 MIN READ
          </p>
          <h1 
            className="anim-fadeup delay-2 font-serif-custom text-white font-bold"
            style={{ fontSize: 'clamp(8rem, 20vw, 18rem)', lineHeight: 0.85 }}
          >
            LEGACY
          </h1>
          <div className="anim-fadeup delay-3 w-[80px] h-[1px] bg-[#d97706] mx-auto mt-10 mb-8"></div>
          <p className="anim-fadeup delay-4 text-white/40 text-xl italic font-serif-custom max-w-xl mx-auto px-4">
            The art of earning by sharing. A story as old as commerce itself.
          </p>
          
          <div className="absolute bottom-12 text-white/20 text-2xl animate-bounce pointer-events-none">
            &darr;
          </div>
        </section>

        {/* SECTION 1 */}
        <section className="snap-section bg-[#080808]" data-index="1">
          <img 
            src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=1600&q=90&auto=format&fit=crop" 
            alt="Ancient Coins"
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover anim-scalein"
          />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%)' }}
          ></div>
          
          <div 
            className="absolute top-8 right-8 font-serif-custom font-black pointer-events-none text-[rgba(255,255,255,0.03)]"
            style={{ fontSize: '30vw', lineHeight: 1 }}
          >
            3000
          </div>

          <div className="absolute bottom-0 left-0 p-16 md:p-20 max-w-[700px] w-full">
            <p className="anim-fadeup delay-1 text-amber-500 text-xs tracking-[0.5em] font-mono mb-4 uppercase">
              01
            </p>
            <h2 
              className="anim-fadeup delay-2 font-serif-custom font-bold text-white whitespace-pre-wrap"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}
            >
              {"Before Google.\nBefore Newspapers.\nBefore Money Had a Name."}
            </h2>
            <p className="anim-fadeup delay-3 text-white/70 text-lg leading-8 mt-6">
              In 3000 BC, Egyptian merchants carved referrals into clay tablets passed to travelers heading to distant cities. The oldest written endorsement in human history is not an ad. It is a referral. Greek merchants in 500 BC paid ordinary citizens — not criers — to spread the word through neighborhoods no official could reach. They paid commissions. In ancient Greece. Twenty-five centuries before Silicon Valley invented the word affiliate. In 1270 AD, the Venetian government passed a law regulating referral broker commissions. The system was so powerful it needed legislation.
            </p>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="snap-section bg-[#080808]" data-index="2">
          <img 
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=90&auto=format&fit=crop" 
            alt="PayPal"
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover anim-scalein"
          />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92) 50%, rgba(0,0,0,0.3) 100%)' }}
          ></div>
          
          <div 
            className="absolute top-8 right-8 font-serif-custom font-black pointer-events-none text-[rgba(255,255,255,0.03)]"
            style={{ fontSize: '30vw', lineHeight: 1 }}
          >
            $1.5B
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 px-16 md:px-20 max-w-[650px] w-full">
            <p className="anim-fadeup delay-1 text-amber-500 text-xs tracking-[0.5em] font-mono mb-4 uppercase">
              02
            </p>
            <h2 
              className="anim-fadeup delay-1 font-serif-custom font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}
            >
              The Day PayPal Broke Mathematics
            </h2>
            
            <div className="anim-fadeup delay-2">
              <div 
                className="text-[#22c55e] font-serif-custom font-black leading-none"
                style={{ fontSize: 'clamp(5rem, 12vw, 10rem)' }}
              >
                1,650%
              </div>
              <p className="text-amber-400 text-sm font-mono tracking-wider mt-2 mb-6">
                annual growth rate. The industry average is 45%.
              </p>
            </div>
            
            <p className="anim-fadeup delay-3 text-white/70 text-lg leading-8">
              PayPal gave $20 to anyone who joined and $20 to whoever referred them. At peak they were adding users at 10% per day. Not per year. Per day. They spent $70 million on referral bonuses and sold for $1.5 billion. Every dollar spent on referrals returned over twenty dollars in exit value. The team that built this went on to found YouTube, LinkedIn, Tesla, and SpaceX. They are called the PayPal Mafia. Referrals didn't just build PayPal. They funded the next two decades of civilization.
            </p>
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="snap-section bg-[#080808]" data-index="3">
          <img 
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=90&auto=format&fit=crop" 
            alt="Dropbox"
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover anim-scalein"
          />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.92) 50%, rgba(0,0,0,0.3) 100%)' }}
          ></div>
          
          <div 
            className="absolute top-8 left-8 font-serif-custom font-black pointer-events-none text-[rgba(255,255,255,0.03)]"
            style={{ fontSize: '30vw', lineHeight: 1 }}
          >
            4M
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-0 px-16 md:px-20 max-w-[650px] w-full text-right ml-auto">
            <p className="anim-fadeup delay-1 text-amber-500 text-xs tracking-[0.5em] font-mono mb-4 uppercase">
              03
            </p>
            <h2 
              className="anim-fadeup delay-1 font-serif-custom font-bold text-white mb-6 ml-auto"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}
            >
              Dropbox Did It With No Marketing Team. Zero.
            </h2>
            
            <div className="anim-fadeup delay-2">
              <div 
                className="text-[#22c55e] font-serif-custom font-black leading-none"
                style={{ fontSize: 'clamp(5rem, 12vw, 10rem)' }}
              >
                3,900%
              </div>
              <p className="text-amber-400 text-sm font-mono tracking-wider mt-2 mb-6">
                growth in 15 months. No full-time marketer.
              </p>
            </div>
            
            <p className="anim-fadeup delay-3 text-white/70 text-lg leading-8">
              In 2008 Dropbox tried Google Ads. Each new customer cost $388 to acquire on a $99 product. The math was fatal. So they scrapped the ads and launched a referral program. Give existing users free storage for every friend they brought in. Within the first month, 35% of all daily signups came through referrals. By April 2010 users were sending 2.8 million referral invites in a single month. From 100,000 users to 4,000,000. No ad budget. No PR. No marketing team. Just people telling other people. Dropbox is now worth over $10 billion.
            </p>
          </div>
        </section>

        {/* SECTION 4 */}
        <section className="snap-section bg-[#080808]" data-index="4">
          <img 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=90&auto=format&fit=crop" 
            alt="Trust"
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover anim-scalein"
          />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 100%)' }}
          ></div>
          
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif-custom font-black pointer-events-none text-[rgba(255,255,255,0.03)]"
            style={{ fontSize: '40vw', lineHeight: 1 }}
          >
            92
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 w-full">
            <div className="max-w-[800px] w-full">
              <p className="anim-fadeup delay-1 text-amber-500 text-xs tracking-[0.5em] font-mono mb-4 uppercase">
                04
              </p>
              <h2 
                className="anim-fadeup delay-1 font-serif-custom font-bold text-white mx-auto"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}
              >
                92% of People Will Trust Your Recommendation Over Any Ad Ever Made
              </h2>
              
              <div className="anim-fadeup delay-2 my-8">
                <div 
                  className="text-[#22c55e] font-serif-custom font-black leading-none"
                  style={{ fontSize: 'clamp(5rem, 12vw, 10rem)' }}
                >
                  92%
                </div>
                <p className="text-amber-400 text-sm font-mono tracking-wider mt-2">
                  Nielsen Global Survey. Every year. Barely moves.
                </p>
              </div>
              
              <p className="anim-fadeup delay-3 text-white/70 text-lg leading-8 mx-auto">
                Not 52 percent. Not 72 percent. 92 percent of consumers trust a recommendation from someone they know above every other form of marketing. No Super Bowl ad, no celebrity endorsement, no algorithmically targeted campaign has ever come close. A referred customer costs less to acquire, converts at a higher rate, stays longer, and refers more people themselves. Every referral compounds. One share from the right person can seed an entire network. The referral economy does not care about your follower count. It cares about trust. And trust is the one thing you already have.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 */}
        <section 
          className="snap-section flex flex-col items-center justify-center text-center px-8" 
          data-index="5"
          style={{
            backgroundColor: '#15803d',
            backgroundImage: `
              radial-gradient(ellipse at 50% 40%, #22c55e 0%, transparent 60%),
              radial-gradient(ellipse at 20% 50%, #16a34a 0%, transparent 50%),
              radial-gradient(ellipse at 80% 50%, #16a34a 0%, transparent 50%),
              radial-gradient(ellipse at 25% 90%, #92400e 0%, transparent 35%),
              radial-gradient(ellipse at 75% 90%, #92400e 0%, transparent 35%)
            `
          }}
        >
          <div className="max-w-[700px] mx-auto w-full">
            <p className="anim-fadeup delay-1 text-white/30 font-mono text-xs tracking-[0.5em] mb-6 uppercase">
              05
            </p>
            <h2 
              className="anim-fadeup delay-2 font-serif-custom font-bold text-white whitespace-pre-wrap"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1 }}
            >
              {"Your network is worth something.\nStart acting like it."}
            </h2>
            <p className="anim-fadeup delay-3 text-white/60 text-xl mt-6 mb-10">
              Every person you refer puts $1 in your pocket. Payouts on the 1st and 15th.
            </p>
            <div className="anim-fadeup delay-4">
              <Link 
                href="/"
                className="inline-block bg-white text-black font-bold hover:bg-white/90 transition-all shadow-2xl hover:scale-[1.03]"
                style={{ padding: '1.2rem 3.5rem', borderRadius: '9999px', fontSize: '1.1rem' }}
              >
                Join Plugd
              </Link>
            </div>
            <p className="anim-fadeup delay-4 text-white/30 text-sm font-mono tracking-wider mt-5">
              $2 to join &middot; $1 per referral &middot; $10 minimum withdrawal
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
