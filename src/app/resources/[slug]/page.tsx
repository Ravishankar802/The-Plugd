import Link from "next/link";
import { notFound } from "next/navigation";

interface ArticleContent {
  slug: string;
  image: string;
  category: string;
  title: string;
  readTime: string;
  content: string[];
}

const articleDetails: Record<string, ArticleContent> = {
  "how-plugd-works": {
    slug: "how-plugd-works",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80&auto=format&fit=crop",
    category: "GETTING STARTED",
    title: "How Plugd Works",
    readTime: "3 MIN READ",
    content: [
      "Plugd is a referral program. That's the whole thing. You pay $2 to join, you get a unique referral link, and every time someone joins through your link you earn $1. When your balance hits $10, you can request a withdrawal. Payouts go out on the 1st and 15th of every month.",
      "There's no product to sell. No inventory. No customer service. Your job is one thing: share your link with people who might want to earn too.",
      "The $2 entry fee exists to keep the network serious. It filters out people who aren't committed, which means the people you're referring are joining a real platform with real earners — not a spam list. That makes your referrals more likely to refer others, which compounds your earnings over time.",
      "There's no cap on how many people you can refer. There's no expiry on your link. As long as Plugd runs, your link works."
    ]
  },
  "how-to-share-your-link": {
    slug: "how-to-share-your-link",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80&auto=format&fit=crop",
    category: "GETTING STARTED",
    title: "How to Share Your Link",
    readTime: "4 MIN READ",
    content: [
      "Your referral link is only as powerful as where you put it and how you frame it. A link dropped into a group chat with no context gets ignored. The same link with three good sentences around it gets clicks.",
      "The platforms that convert best for Plugd are the ones where you already have trust — WhatsApp groups, close Instagram followers, Discord servers you're active in. These are places where people know you and your word carries weight.",
      "Don't spam. One well-placed message in the right group will outperform fifty cold posts every time. Think about who in your life is always looking for ways to make extra money. Send them a direct message, not a broadcast.",
      "The best performing shares include three things: what Plugd is in one sentence, what they earn, and a line that makes it personal. Something like: \"I've been using this, it's $2 to join and you earn $1 for everyone you bring in — figured you'd be into it.\"",
      "Consistency matters more than volume. Share once a week in a new place rather than blasting everywhere once and never again."
    ]
  },
  "first-10-referrals": {
    slug: "first-10-referrals",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&auto=format&fit=crop",
    category: "STRATEGY",
    title: "How to Get Your First 10 Referrals",
    readTime: "5 MIN READ",
    content: [
      "Your first 10 referrals are the hardest. After that, the people you referred start referring others and your earnings start compounding without you doing anything extra.",
      "Start with your inner circle. Not a mass message — individual texts to 5 people you know who are always talking about making money on the side. Personalize each one. \"Thought of you specifically\" converts better than \"thought some of you might like this.\"",
      "Next, go one layer out. Post in a WhatsApp group you're active in — a college group, a work group, a hobby community. Frame it as something you're doing, not something you're selling. \"I just joined this referral thing, it's actually simple\" is more believable than \"amazing opportunity.\"",
      "Third: post once on your Instagram story. Not a sales post — a genuine one. \"Anyone want a way to make money just by sharing a link, DM me.\" You'll get more responses than you expect.",
      "By the time you've done these three things you'll have your first 10. The key insight is that 10 people who each refer 5 people is 50 more referrals you didn't have to make yourself."
    ]
  },
  "best-platforms": {
    slug: "best-platforms",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&auto=format&fit=crop",
    category: "STRATEGY",
    title: "Which Platforms Convert Best",
    readTime: "4 MIN READ",
    content: [
      "Not all platforms are equal when it comes to referral conversions. Here's the honest ranking based on how referral programs generally perform.",
      "WhatsApp is the highest converter. Messages feel personal, the audience is people who already know you, and the friction to click a link is almost zero. A message in a WhatsApp group of 30 people who trust you is worth more than 1,000 Twitter impressions.",
      "Instagram DMs and Stories come second. Stories work best when you post authentically — showing your earnings, asking who's interested. DMs work best for direct outreach to specific followers.",
      "Discord and Telegram communities are underrated. If you're in a server or group focused on side hustles, finance, or hustle culture, a genuine post from an active member converts very well. Don't drop a link without context.",
      "Twitter and Reddit are the most unpredictable. A post can go nowhere or reach thousands depending on timing and framing. Worth doing but don't rely on them as your primary channel.",
      "TikTok is a long game. If you make videos about making money online, a Plugd mention in a video can drive consistent referrals over weeks. High effort but high ceiling."
    ]
  },
  "writing-your-message": {
    slug: "writing-your-message",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&auto=format&fit=crop",
    category: "STRATEGY",
    title: "How to Write a Message That Gets People to Join",
    readTime: "4 MIN READ",
    content: [
      "The message you write around your referral link is doing more work than the link itself. Most people skip writing it. That's why most people get ignored.",
      "A good referral message has three parts: context, the offer, and a personal hook. Context tells them what it is. The offer tells them what they get. The personal hook tells them why you're telling them specifically.",
      "Bad message: \"Hey check this out [link]\"",
      "Good message: \"This is a referral program — $2 to join, you earn $1 for everyone you bring in. Payouts twice a month. Thought of you because you're always looking for side income things.\"",
      "The biggest mistake people make is being vague. Vague messages make people suspicious. Specific messages — actual numbers, actual mechanics — build instant credibility.",
      "Don't oversell. You don't need to tell them it'll change their life. Tell them exactly what it is and let them decide. People can smell desperation in a message. Calm confidence converts.",
      "One more thing: follow up once. If someone didn't respond, one follow-up three days later doubles your conversion rate. More than one follow-up and you're pushing them away."
    ]
  },
  "how-payouts-work": {
    slug: "how-payouts-work",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop",
    category: "MONEY",
    title: "How Payouts Work",
    readTime: "3 MIN READ",
    content: [
      "Plugd pays out on the 1st and 15th of every month. To request a payout you need a minimum balance of $10 in your account.",
      "When you hit $10, you'll see a withdrawal option in your Vault. Submit your request before the payout date and it'll be processed in that cycle. Requests submitted after the cutoff go into the next cycle.",
      "Payments are processed through Dodo Payments. Processing times vary by region but are typically 1 to 3 business days after the payout date.",
      "Your earnings are tracked in real time in your Vault. Every time someone joins through your link, $1 is added to your balance immediately. You can watch it grow between payouts.",
      "There's no maximum on how much you can withdraw. If you've referred 500 people, you have $500 waiting. Request it all at once or let it accumulate — up to you."
    ]
  },
  "realistic-earnings": {
    slug: "realistic-earnings",
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80&auto=format&fit=crop",
    category: "MONEY",
    title: "How Much Can You Realistically Earn",
    readTime: "5 MIN READ",
    content: [
      "Let's do the actual math so there are no surprises.",
      "10 referrals: $10. That's your $2 back plus $8 profit. At this point you're in the green and you've barely started.",
      "50 referrals: $50. If each of those 50 people refers just 2 more, that's 100 additional referrals you didn't make — but those earnings go to them, not you. Your earnings come from your direct referrals only.",
      "100 referrals: $100. Achievable for anyone with an active social presence over 2 to 3 months of consistent sharing.",
      "The people earning the most on Plugd aren't doing anything magical. They're sharing consistently across multiple platforms, writing good messages, and following up. Volume and consistency beat any single viral moment.",
      "The realistic ceiling for someone putting in 30 minutes a week is 20 to 40 referrals a month. That's $20 to $40 per month, every month, for work you mostly did once. Over a year that's $240 to $480 from a $2 investment.",
      "The realistic ceiling for someone who treats it seriously — creating content, building an audience around it, optimizing their message — is much higher. Some referral earners on similar platforms clear $500 to $2,000 a month. It depends entirely on how wide your network is and how well you communicate."
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
        <h1 className="text-4xl font-bold text-white mb-4 leading-tight font-sans">
          {article.title}
        </h1>

        {/* Read time */}
        <div className="text-white/30 text-xs font-mono mb-8">
          {article.readTime}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8" />

        {/* Body content */}
        <div className="space-y-6 text-white/70 text-lg leading-9 font-serif">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
