import Link from "next/link";
import { notFound } from "next/navigation";

interface ArticleContent {
  slug: string;
  image: string;
  category: string;
  title: string;
  content: string[];
}

const articleDetails: Record<string, ArticleContent> = {
  "how-plugd-works": {
    slug: "how-plugd-works",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80&auto=format&fit=crop",
    category: "GETTING STARTED",
    title: "How Plugd Works",
    content: [
      "Plugd is a referral program. That's the whole thing. You pay a one-time entry fee depending on your chosen plan tier (Starter: ₹199, Pro: ₹499, Max: ₹999) to join, you get a unique referral link, and every time someone joins through your link you earn a commission based on your plan tier (₹100, ₹250, or ₹500).",
      "There's no product to sell. No inventory. No customer service. Your job is one thing: share your link with people who might want to earn too.",
      "The entry fee exists to keep the network serious. It filters out people who aren't committed, which means the people you're referring are joining a real platform with real earners, not a spam list. That makes your referrals more likely to refer others, which compounds your earnings over time.",
      "There's no cap on how many people you can refer. There's no expiry on your link. As long as Plugd runs, your link works."
    ]
  },
  "how-to-share-your-link": {
    slug: "how-to-share-your-link",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80&auto=format&fit=crop",
    category: "GETTING STARTED",
    title: "How to Share Your Link",
    content: [
      "Your referral link is only as powerful as where you put it and how you frame it. A link dropped into a group chat with no context gets ignored. The same link with three good sentences around it gets clicks.",
      "The platforms that convert best for Plugd are the ones where you already have trust: WhatsApp groups, close Instagram followers, Discord servers you're active in, and X. These are places where people know you and your word carries weight.",
      "Don't spam. One well-placed message in the right group will outperform fifty cold posts every time. Think about who in your life is always looking for ways to make extra money. Send them a direct message, not a broadcast.",
      "The best performing shares include three things: what Plugd is in one sentence, what they earn, and a line that makes it personal. Something like: \"I've been using this, it's ₹199 to join and you earn ₹100 to ₹500 for everyone you bring in depending on your tier, so I figured you'd be into it.\"",
      "Consistency matters more than volume. Share once a week in a new place rather than blasting everywhere once and never again."
    ]
  },
  "first-10-referrals": {
    slug: "first-10-referrals",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&auto=format&fit=crop",
    category: "STRATEGY",
    title: "How to Get Your First 10 Referrals",
    content: [
      "Your first 10 referrals are the hardest. After that, the people you referred start referring others and your earnings start compounding without you doing anything extra.",
      "Start with your inner circle. Not a mass message: send individual texts to 5 people you know who are always talking about making money on the side. Personalize each one. \"Thought of you specifically\" converts better than \"thought some of you might like this.\"",
      "Next, go one layer out. Post in a WhatsApp group you're active in, such as a college group, a work group, or a hobby community. Frame it as something you're doing, not something you're selling. \"I just joined this referral thing, it's actually simple\" is more believable than \"amazing opportunity.\"",
      "Third: post once on your Instagram story. Not a sales post, but a genuine one. \"Anyone want a way to make money just by sharing a link, DM me.\" You'll get more responses than you expect.",
      "By the time you've done these three things you'll have your first 10. The key insight is that 10 people who each refer 5 people is 50 more referrals you didn't have to make yourself."
    ]
  },
  "best-platforms": {
    slug: "best-platforms",
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80&auto=format&fit=crop",
    category: "STRATEGY",
    title: "Which Platforms Convert Best",
    content: [
      "Not all platforms are equal when it comes to referral conversions. Here's the honest ranking based on how referral programs generally perform.",
      "WhatsApp is the highest converter. Messages feel personal, the audience is people who already know you, and the friction to click a link is almost zero. A message in a WhatsApp group of 30 people who trust you is worth more than 1,000 X impressions.",
      "Instagram DMs and Stories come second. Stories work best when you post authentically, showing your earnings or asking who's interested. DMs work best for direct outreach to specific followers.",
      "X is one of the highest-ceiling platforms for referral sharing. A single post from the right account at the right time can drive dozens of referrals in hours. Unlike WhatsApp where you're limited to people you know, X lets your message travel to people who don't know you yet but are already interested in making money. If X is your main network, it should be your primary channel for Plugd.",
      "Discord and Telegram communities are underrated. If you're in a server or group focused on side hustles, finance, or hustle culture, a genuine post from an active member converts very well. Don't drop a link without context.",
      "Reddit is the most unpredictable. A post can go nowhere or reach thousands depending on timing and framing. Worth doing but don't rely on it as your primary channel.",
      "TikTok is a long game. If you make videos about making money online, a Plugd mention in a video can drive consistent referrals over weeks. High effort but high ceiling."
    ]
  },
  "writing-your-message": {
    slug: "writing-your-message",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&auto=format&fit=crop",
    category: "STRATEGY",
    title: "How to Write a Message That Gets People to Join",
    content: [
      "The message you write around your referral link is doing more work than the link itself. Most people skip writing it. That's why most people get ignored.",
      "A good referral message has three parts: context, the offer, and a personal hook. Context tells them what it is. The offer tells them what they get. The personal hook tells them why you're telling them specifically.",
      "Bad message: \"Hey check this out [link]\"",
      "Good message: \"This is a referral program: ₹199 to join, you earn ₹100 to ₹500 for everyone you bring in. Payouts twice a month. Thought of you because you're always looking for side income things.\"",
      "The biggest mistake people make is being vague. Vague messages make people suspicious. Specific messages with actual numbers and mechanics build instant credibility.",
      "Don't oversell. You don't need to tell them it'll change their life. Tell them exactly what it is and let them decide. People can smell desperation in a message. Calm confidence converts.",
      "One more thing: follow up once. If someone didn't respond, one follow-up three days later doubles your conversion rate. More than one follow-up and you're pushing them away."
    ]
  },
  "how-payouts-work": {
    slug: "how-payouts-work",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop",
    category: "MONEY",
    title: "How Payouts Work",
    content: [
      "Payments are processed through Dodo Payments. Processing times vary by region but are typically 1 to 3 business days after the payout date.",
      "Your earnings are tracked in real time on your Dashboard. Every time someone joins through your link, your plan tier commission (₹100, ₹250, or ₹500) is added to your balance immediately. You can watch it grow between payouts.",
      "There's no maximum on how much you can withdraw. If you've referred 500 people on the Starter tier, you have ₹50,000 waiting. Request it all at once or let it accumulate, depending on your preference."
    ]
  },
  "realistic-earnings": {
    slug: "realistic-earnings",
    image: "https://plus.unsplash.com/premium_photo-1681469490587-cf7ff1d6fc00?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "MONEY",
    title: "How Much Can You Realistically Earn",
    content: [
      "Let's look at the actual data and mathematics from our live leaderboard so you can see exactly what is possible.",
      "Our Top Promoters board provides clear evidence of what is achievable. Across over ₹100 Crore in total platform payouts, our top promoters have achieved impressive scale. The 50th top promoter on the platform has crossed ₹5,00,000 in total payouts. Rank 2 has cleared ₹55,00,000. And our number one promoter has crossed the ₹1 Crore mark in lifetime earnings (currently standing at over ₹1,10,00,000). All of this is done with a single link, no inventory, no overhead, and no marketing teams.",
      "When we look at daily earnings, the numbers are just as solid. The top 50 promoters on the platform earn between ₹5,000 and ₹40,000 every single day. Depending on their plan tier, they earn up to ₹500 for every direct referral who joins. They achieve this by consistently sharing their link across their primary channels—like WhatsApp groups, close Instagram communities, Discord servers, and X.",
      "But you don't need a massive initial following to start earning. The overall average earning for promoters on the platform is ₹5L/month. Getting your first 10 referrals pays you ₹1,000 on the Starter plan, which covers your initial ₹199 entry fee and puts you in profit. From there, scaling is a matter of consistency: sharing once a day, targeting active communities where people are looking for side income, and following up on clicks.",
      "Volume and persistence beat any single viral moment. The floor is whatever effort you put in. The ceiling is shown right on our Top Promoters board. Start small, share daily, and watch your earnings grow."
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(articleDetails).map((slug) => ({
    slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleDetails[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white py-16 relative">
      {/* Fixed back link for larger screens */}
      <Link 
        href="/resources" 
        className="fixed top-8 left-8 text-green-500 text-sm hover:text-green-400 transition-colors items-center gap-1 font-sans z-50 hidden lg:inline-flex"
      >
        ← Back
      </Link>

      {/* Inline back link for mobile/tablet screens */}
      <div className="max-w-2xl mx-auto px-6 mb-8 text-left lg:hidden">
        <Link 
          href="/resources" 
          className="text-green-500 text-sm hover:text-green-400 transition-colors inline-flex items-center gap-1 font-sans"
        >
          ← Back
        </Link>
      </div>

      <article className="max-w-2xl mx-auto px-6 text-left">
        {/* Hero image */}
        <div className="w-full h-64 overflow-hidden rounded-xl mb-8 relative">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Category tag */}
        <span className="bg-green-500/10 text-green-400 text-xs font-mono px-2.5 py-1 rounded-full inline-block mb-4">
          {article.category}
        </span>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-8 leading-tight font-sans">
          {article.title}
        </h1>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8" />

        {/* Body content */}
        <div className="space-y-6 text-white/70 text-lg leading-9 font-serif">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <p className="text-[11px] text-white/20 font-medium font-sans mt-16 pt-6 border-t border-white/5 select-none">
          *Earning statistics, ranks, and daily figures mentioned in these articles are based on illustrative simulations to demonstrate platform potential. Actual results vary by promoter activity.
        </p>
      </article>
    </div>
  );
}
