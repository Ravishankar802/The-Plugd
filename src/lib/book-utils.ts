// Utility helpers for Digital Playbook / Book Architecture

export interface BookReview {
  id: string;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  badge?: string;
  headline: string;
  content: string;
  likes: number;
}

export interface AuthorProfile {
  name: string;
  avatar: string;
  booksCount: number;
  followersCount: string;
  bio: string;
}

/**
 * Returns total page count based on price tier according to user rules:
 * - $3: 100 - 150 pages
 * - $4: ~135 - 165 pages
 * - $5: 150 - 200 pages
 * - $6: ~185 - 215 pages
 * - $7: 200 - 250 pages
 * - $9: 250 - 300 pages
 * - $12: 300 - 400 pages
 * - $15: 500 - 700 pages
 * - $19: 700 - 1000 pages
 */
export function getPlaybookPageCount(price: number, slug = ""): number {
  const hash = slug.split("").reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0);
  const offset = Math.abs(hash % 25);

  if (price <= 3) return 118 + (offset % 24); // 118 - 141 (Range: 100-150)
  if (price <= 4) return 138 + (offset % 20); // 138 - 157
  if (price <= 5) return 164 + (offset % 28); // 164 - 191 (Range: 150-200)
  if (price <= 6) return 188 + (offset % 20); // 188 - 207
  if (price <= 7) return 214 + (offset % 28); // 214 - 241 (Range: 200-250)
  if (price <= 9) return 262 + (offset % 30); // 262 - 291 (Range: 250-300)
  if (price <= 12) return 332 + (offset % 50); // 332 - 381 (Range: 300-400)
  if (price <= 15) return 540 + (offset * 5); // 540 - 660 (Range: 500-700)
  return 760 + (offset * 8); // 760 - 952 (Range: 700-1000)
}

/**
 * Returns page range for an individual chapter within the total book pages
 */
export function getChapterPageRange(
  chapterIndex: number,
  totalChapters: number,
  totalPages: number
): { startPage: number; endPage: number } {
  const frontMatterPages = 8;
  const contentPages = Math.max(totalPages - frontMatterPages, totalChapters * 2);
  const avgPagesPerChapter = contentPages / Math.max(totalChapters, 1);

  const startPage = Math.floor(frontMatterPages + chapterIndex * avgPagesPerChapter) + 1;
  const endPage = Math.min(
    totalPages,
    Math.floor(frontMatterPages + (chapterIndex + 1) * avgPagesPerChapter)
  );

  return {
    startPage: Math.max(1, startPage),
    endPage: Math.max(startPage, endPage),
  };
}

/**
 * Social reading stats (Goodreads-style)
 */
export function getReadingStats(slug = ""): {
  currentlyReading: string;
  wantToRead: string;
} {
  const hash = Math.abs(slug.split("").reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0));
  const reading = 3400 + (hash % 5800);
  const want = 12400 + ((hash * 7) % 18200);

  return {
    currentlyReading: reading.toLocaleString(),
    wantToRead: want.toLocaleString(),
  };
}

/**
 * Author profile for About the Author section
 */
export function getAuthorProfile(categoryName = "AI", slug = ""): AuthorProfile {
  if (slug === "youre-stuck-in-the-matrix-heres-how-you-escape" || slug === "ai-businesses-29") {
    return {
      name: "Sean O'Brien",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "you-have-5-years-to-get-rich-before-ai-takes-over" || slug === "ai-businesses-30") {
    return {
      name: "Luka Horvat",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "investing-for-beginners-in-25-minutes" || slug === "ai-businesses-31") {
    return {
      name: "Pranav Joshi",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "laziest-ways-to-make-money-with-ai-for-beginners" || slug === "ai-businesses-32") {
    return {
      name: "Felix Weber",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "how-to-use-trading-212-in-2026-full-investing-guide" || slug === "ai-businesses-33") {
    return {
      name: "Dylan Scott",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "7-side-hustles-students-can-start-in-2026" || slug === "ai-businesses-34") {
    return {
      name: "Austin Bailey",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "making-money-online-is-easy-actually-just-copy-me") {
    return {
      name: "Naveen Shetty",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "how-to-make-your-first-10-000-as-a-teen-stupid-simple") {
    return {
      name: "Yash Thakur",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "the-only-investing-video-youll-ever-need-start-with-100") {
    return {
      name: "Jiho Kim",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "7-proven-ways-to-make-money-with-ai-no-experience") {
    return {
      name: "Jack Robertson",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "how-to-actually-lock-in-no-bullsh-t-guide") {
    return {
      name: "Jacob Wilson",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "18-years-of-ugly-business-advice-in-19-minutes") {
    return {
      name: "Alex Turner",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m") {
    return {
      name: "Alex Turner",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "there-are-only-3-types-of-profitable-businesses-pick-one") {
    return {
      name: "Elias Andersen",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "if-you-dont-understand-leadership-youll-never-win") {
    return {
      name: "Stefan Müller",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "i-built-a-business-with-ai-in-24-hours") {
    return {
      name: "Rishabh Jain",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "copy-paste-this-strategy-to-make-your-first-5-000-online") {
    return {
      name: "Liam Foster",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "7-remote-jobs-you-can-do-from-home") {
    return {
      name: "Ronit Meitei",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "i-asked-ai-to-make-me-as-much-money-as-possible") {
    return {
      name: "Sneha Mishra",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "these-are-the-best-business-books-to-read-7-billionaire-books") {
    return {
      name: "Sneha Mishra",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "master-higgsfield-ai-in-20-minutes-beginner-tutorial") {
    return {
      name: "Nathan Cole",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "my-honest-advice-to-someone-who-wants-to-get-rich") {
    return {
      name: "Kunal Raj",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "the-30k-month-al-faceless-shorts-method-nobodys-talking-about") {
    return {
      name: "Seiji Kai-Lun",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "how-to-build-10k-websites-in-minutes-claude-ai") {
    return {
      name: "Caleb Sterling",
      avatar: "",
      booksCount: 6,
      followersCount: "18.4k",
      bio: "Your go-to source for in-depth playbooks on the best website builders and online platforms. Whether you're creating your first website, launching an online store, expanding your business, or simply exploring the latest digital tools, I’ve got you covered. My mission is to make it easier for you to find the right tool for your business and learn how to use it effectively. Read my playbooks for unbiased insights, expert guidance, and practical tips to help you succeed online.",
    };
  }

  return {
    name: "Plugd Research & Editorial",
    avatar: "",
    booksCount: 60,
    followersCount: "34.2k",
    bio: "Plugd Research & Editorial publishes authoritative, zero-fluff digital playbooks for modern entrepreneurs, digital builders, and independent operators. Grounded in first-principles thinking, operational unit economics, and production systems.",
  };
}

/**
 * High quality, realistic community reviews
 */
export function getCuratedCommunityReviews(
  title: string,
  rating: number,
  slug = ""
): BookReview[] {
  if (slug === "youre-stuck-in-the-matrix-heres-how-you-escape" || slug === "ai-businesses-29") {
    return [
      {
        id: "rev-1",
        name: "Connor",
        avatar: "",
        date: "August 19 2026",
        rating: 5,
        headline: "",
        content: "This made me question so many things I had accepted without thinking. The chapters on social conditioning and independent thinking really hit differently.",
        likes: 80,
      },
      {
        id: "rev-2",
        name: "Kyle",
        avatar: "",
        date: "September 30 2026",
        rating: 5,
        headline: "",
        content: "More than just motivation. I loved how it turns big ideas into actual exercises and a 90-day plan. Definitely made me rethink how I spend my time.",
        likes: 64,
      },
      {
        id: "rev-3",
        name: "Harry Clarke",
        avatar: "",
        date: "October 14 2026",
        rating: 5,
        headline: "",
        content: "The section about becoming high agency was my favourite. Instead of waiting for opportunities or permission, it pushes you to start solving problems yourself.",
        likes: 62,
      },
      {
        id: "rev-4",
        name: "Callum",
        avatar: "",
        date: "October 21 2026",
        rating: 5,
        headline: "",
        content: "A genuinely useful read. The ideas about self-directed learning, building your own vision, and creating value are things I wish I had started practising years ago.",
        likes: 45,
      },
    ];
  }

  if (slug === "you-have-5-years-to-get-rich-before-ai-takes-over" || slug === "ai-businesses-30") {
    return [
      {
        id: "rev-1",
        name: "Andrew Cooper",
        avatar: "",
        date: "August 30 2026",
        rating: 5,
        headline: "",
        content: "This genuinely changed how I think about AI and money. The focus on ownership instead of just earning a salary is something I hadn't considered deeply before.",
        likes: 80,
      },
      {
        id: "rev-2",
        name: "Nicholas",
        avatar: "",
        date: "September 28 2026",
        rating: 5,
        headline: "",
        content: "Loved the practical approach. The 90-day plan gives you something concrete to work on instead of just worrying about what AI might do to the future.",
        likes: 64,
      },
      {
        id: "rev-3",
        name: "Daniel Foster",
        avatar: "",
        date: "October 04 2026",
        rating: 5,
        headline: "",
        content: "A refreshing perspective. It explains why learning AI alone isn't enough and why understanding customers, building systems, and owning assets actually matter.",
        likes: 67,
      },
      {
        id: "rev-4",
        name: "Christopher",
        avatar: "",
        date: "October 01 2026",
        rating: 5,
        headline: "",
        content: "Very actionable and well organised. It helped me think beyond my current job and start planning for the long term.",
        likes: 58,
      },
    ];
  }

  if (slug === "investing-for-beginners-in-25-minutes" || slug === "ai-businesses-31") {
    return [
      {
        id: "rev-1",
        name: "Arjun Nair",
        avatar: "",
        date: "August 23 2026",
        rating: 5,
        headline: "",
        content: "Finally, an investing guide that explains things in a way beginners can actually understand. The portfolio and diversification sections were especially helpful.",
        likes: 75,
      },
      {
        id: "rev-2",
        name: "Rahul",
        avatar: "",
        date: "September 02 2026",
        rating: 5,
        headline: "",
        content: "Really well structured. I went from barely understanding ETFs and bonds to having a much clearer idea of how to approach long-term investing.",
        likes: 51,
      },
      {
        id: "rev-3",
        name: "Aditya",
        avatar: "",
        date: "October 09 2026",
        rating: 5,
        headline: "",
        content: "The best part is that it doesn't just tell you what to buy. It teaches you how to think about risk, research companies, and build a proper investment strategy.",
        likes: 58,
      },
      {
        id: "rev-4",
        name: "Karthik",
        avatar: "",
        date: "October 15 2026",
        rating: 5,
        headline: "",
        content: "A genuinely useful beginner's resource. The practical checklists and 30-day plan make it much easier to turn the knowledge into an actual routine.",
        likes: 42,
      },
    ];
  }

  if (slug === "laziest-ways-to-make-money-with-ai-for-beginners" || slug === "ai-businesses-32") {
    return [
      {
        id: "rev-1",
        name: "Maxime Leroy",
        avatar: "",
        date: "August 31 2026",
        rating: 5,
        headline: "",
        content: "Exactly what I was looking for. Instead of throwing random AI tools at me, it explains actual business models and how to get started with each one.",
        likes: 90,
      },
      {
        id: "rev-2",
        name: "Julien Dubois",
        avatar: "",
        date: "September 18 2026",
        rating: 5,
        headline: "",
        content: "Really useful breakdown. I especially liked the sections on finding clients, understanding costs, and turning an AI skill into something people will actually pay for.",
        likes: 51,
      },
      {
        id: "rev-3",
        name: "Tim Becker",
        avatar: "",
        date: "October 11 2026",
        rating: 5,
        headline: "",
        content: "The 30-day plan is my favourite part. It makes everything feel much more actionable instead of just reading about another online business idea.",
        likes: 58,
      },
      {
        id: "rev-4",
        name: "Lars Bakker",
        avatar: "",
        date: "October 19 2026",
        rating: 5,
        headline: "",
        content: "A solid beginner-friendly guide. It covers seven different opportunities without pretending they're effortless or guaranteed money. Very practical and well organised.",
        likes: 42,
      },
    ];
  }

  if (slug === "how-to-use-trading-212-in-2026-full-investing-guide" || slug === "ai-businesses-33") {
    return [
      {
        id: "rev-1",
        name: "Matthew Collins",
        avatar: "",
        date: "August 20 2026",
        rating: 5,
        headline: "",
        content: "I've always found investing confusing, especially when it comes to choosing funds and building a portfolio. This explained everything in a really simple and structured way.",
        likes: 73,
      },
      {
        id: "rev-2",
        name: "Nathan",
        avatar: "",
        date: "September 06 2026",
        rating: 5,
        headline: "",
        content: "The three-fund portfolio section was my favourite. I finally understand how diversification works and why you don't need dozens of different stocks to get started.",
        likes: 59,
      },
      {
        id: "rev-3",
        name: "Jordan",
        avatar: "",
        date: "October 10 2026",
        rating: 5,
        headline: "",
        content: "Really appreciate that this goes beyond explaining what investing is. It walks through account setup, order types, recurring contributions, and portfolio management. Very useful.",
        likes: 61,
      },
      {
        id: "rev-4",
        name: "Justin Parker",
        avatar: "",
        date: "October 22 2026",
        rating: 5,
        headline: "",
        content: "Loved the emphasis on consistency, patience, and avoiding emotional decisions. It helped me understand that building wealth is a long-term process, not about chasing quick profits.",
        likes: 50,
      },
    ];
  }

  if (slug === "7-side-hustles-students-can-start-in-2026" || slug === "ai-businesses-34") {
    return [
      {
        id: "rev-1",
        name: "Ethan Miller",
        avatar: "",
        date: "August 17 2026",
        rating: 5,
        headline: "",
        content: "I've gone through so many side hustle videos, but this actually puts everything together. Loved the breakdown of each business model and how to get started.",
        likes: 88,
      },
      {
        id: "rev-2",
        name: "Ryan",
        avatar: "",
        date: "September 04 2026",
        rating: 5,
        headline: "",
        content: "The 30-day plan is my favourite part. Instead of just reading about opportunities, you actually get a clear direction on what to do next.",
        likes: 68,
      },
      {
        id: "rev-3",
        name: "Brandon Wilson",
        avatar: "",
        date: "October 01 2026",
        rating: 5,
        headline: "",
        content: "I never really considered brand-deal brokerage or short-form content strategy before. The explanations made these business models surprisingly easy to understand.",
        likes: 76,
      },
      {
        id: "rev-4",
        name: "Tyler",
        avatar: "",
        date: "October 12 2026",
        rating: 5,
        headline: "",
        content: "Straightforward, well-organised, and genuinely useful. I especially appreciate the focus on understanding costs, finding customers, and testing ideas before spending money.",
        likes: 45,
      },
    ];
  }

  if (slug === "making-money-online-is-easy-actually-just-copy-me") {
    return [
      {
        id: "rev-1",
        name: "Praveen Gowda",
        avatar: "",
        date: "August 19 2026",
        rating: 5,
        headline: "",
        content: "This playbook breaks down the entire online business journey in a way that's easy to understand and actually follow. I especially loved the four-stage framework because it helped me identify where I was going wrong and what I needed to focus on next. Definitely worth reading!",
        likes: 82,
      },
      {
        id: "rev-2",
        name: "Abhinav Bhat",
        avatar: "",
        date: "September 14 2026",
        rating: 5,
        headline: "",
        content: "I've consumed so much online business content, but this playbook brings everything together in one place. From choosing a business model to understanding customers, creating content, and reinvesting profits, it covers the bigger picture. Practical, straightforward, and genuinely valuable.",
        likes: 78,
      },
      {
        id: "rev-3",
        name: "Harish Murthy",
        avatar: "",
        date: "October 15 2026",
        rating: 5,
        headline: "",
        content: "What I liked most is that it doesn't make starting an online business sound effortless or promise overnight success. It explains the process, highlights common mistakes, and gives you actionable checklists and templates. A great resource for anyone serious about building an online income stream.",
        likes: 67,
      },
      {
        id: "rev-4",
        name: "Shubham Jaiswal",
        avatar: "",
        date: "October 14 2026",
        rating: 5,
        headline: "",
        content: "The section on Shiny Object Syndrome really hit home! I used to jump between different business ideas without giving any of them enough attention. This playbook helped me understand the importance of consistency, customer research, and making decisions based on evidence. It's a fantastic guide for anyone ready to stop overthinking and start executing.",
        likes: 49,
      },
    ];
  }

  if (slug === "how-to-make-your-first-10-000-as-a-teen-stupid-simple") {
    return [
      {
        id: "rev-1",
        name: "Varun Choudhary",
        avatar: "",
        date: "October 10 2026",
        rating: 5,
        headline: "",
        content: "This playbook breaks down the entire process of making money from your skills into simple, actionable steps. I especially loved the four income engines and the skill pyramid. Instead of just talking about success, it shows you exactly what to focus on and how to get started. A must-read for anyone serious about building an income stream!",
        likes: 99,
      },
      {
        id: "rev-2",
        name: "Saurabh Tripathi",
        avatar: "",
        date: "October 14 2026",
        rating: 5,
        headline: "",
        content: "What makes this playbook stand out is that it doesn't stop at earning money. It teaches you how to find clients, position your services, build systems, manage cash flow, and eventually turn your income into wealth. The practical templates and 90-day roadmap make it incredibly useful. Definitely worth reading!",
        likes: 63,
      },
      {
        id: "rev-3",
        name: "Karthik Subramanian",
        avatar: "",
        date: "October 05 2026",
        rating: 5,
        headline: "",
        content: "I used to feel overwhelmed by all the different ways to make money online. This playbook helped me understand the options and choose a direction instead of jumping between random business ideas. The explanations are straightforward, the examples are relatable, and the action steps make everything feel achievable. A genuinely valuable resource!",
        likes: 59,
      },
      {
        id: "rev-4",
        name: "Arvind Krishnan",
        avatar: "",
        date: "October 22 2026",
        rating: 5,
        headline: "",
        content: "My biggest takeaway was learning that earning money is only the beginning. Building a valuable skill, creating a repeatable business, managing what you earn, and investing for the future are all connected. This playbook brings those ideas together beautifully. It's the kind of guide you'll want to revisit as you grow.",
        likes: 42,
      },
    ];
  }

  if (slug === "the-only-investing-video-youll-ever-need-start-with-100") {
    return [
      {
        id: "rev-1",
        name: "Brandon Walker",
        avatar: "",
        date: "September 05 2026",
        rating: 5,
        headline: "I've always wanted to start investing but never knew where to begin.",
        content: "I've always wanted to start investing but never knew where to begin. This playbook breaks everything down in such a simple and practical way. I finally understand the difference between stocks, REITs, crypto, gold, and index funds. A fantastic starting point!",
        likes: 90,
      },
      {
        id: "rev-2",
        name: "Connor Walsh",
        avatar: "",
        date: "September 13 2026",
        rating: 5,
        headline: "What I loved most is how this guide explains both the opportunities and risks of investing.",
        content: "What I loved most is how this guide explains both the opportunities and risks of investing. The $100 comparisons made everything easier to understand, and the worksheets are incredibly useful. Definitely worth reading!",
        likes: 78,
      },
      {
        id: "rev-3",
        name: "Nathaniel Price",
        avatar: "",
        date: "October 09, 2026",
        rating: 5,
        headline: "This is exactly the kind of investing guide I was looking for.",
        content: "This is exactly the kind of investing guide I was looking for. It's well-organised, beginner-friendly, and packed with valuable information. I especially enjoyed learning about diversification, compounding, and how to evaluate different investment options.",
        likes: 66,
      },
      {
        id: "rev-4",
        name: "Cameron Stewart",
        avatar: "",
        date: "October 16 2026",
        rating: 5,
        headline: "A brilliant resource for anyone looking to become more financially confident.",
        content: "A brilliant resource for anyone looking to become more financially confident. It doesn't just tell you what investments are; it teaches you how to think about risk, make informed decisions, and avoid common beginner mistakes. Practical, informative, and motivating!",
        likes: 43,
      },
    ];
  }

  if (slug === "7-proven-ways-to-make-money-with-ai-no-experience") {
    return [
      {
        id: "rev-1",
        name: "Jonathan Morris",
        avatar: "",
        date: "September 02 2026",
        rating: 5,
        headline: "I've been interested in making money with AI but never really knew where to start.",
        content: "I've been interested in making money with AI but never really knew where to start. This playbook breaks everything down into practical business opportunities that actually make sense. I especially love the client acquisition strategies and step-by-step launch plan. Definitely worth reading!",
        likes: 77,
      },
      {
        id: "rev-2",
        name: "Patrick Murphy",
        avatar: "",
        date: "September 01 2026",
        rating: 5,
        headline: "What I love most about this guide is that it focuses on selling real business solutions rather than just playing around with AI tools.",
        content: "What I love most about this guide is that it focuses on selling real business solutions rather than just playing around with AI tools. The six business models gave me several ideas I could realistically start exploring right away. Clear, actionable, and packed with value.",
        likes: 65,
      },
      {
        id: "rev-3",
        name: "Scott Reynolds",
        avatar: "",
        date: "October 12, 2026",
        rating: 5,
        headline: "So many AI guides talk about building the next big app or becoming a tech expert.",
        content: "So many AI guides talk about building the next big app or becoming a tech expert. This playbook takes a much more practical approach. It shows how to use tools that already exist to solve problems businesses are willing to pay for. The pricing, outreach examples, and recurring revenue strategies make it especially useful.",
        likes: 59,
      },
      {
        id: "rev-4",
        name: "Tyler Richardson",
        avatar: "",
        date: "October 17 2026",
        rating: 5,
        headline: "This guide connects all the dots, from choosing a profitable service and finding potential clients to delivering quality work and building monthly retainers.",
        content: "This guide connects all the dots, from choosing a profitable service and finding potential clients to delivering quality work and building monthly retainers. The templates and 30-day action plan are excellent additions. If you're serious about turning AI skills into a service business, this is a great place to start.",
        likes: 43,
      },
    ];
  }

  if (slug === "how-to-actually-lock-in-no-bullsh-t-guide") {
    return [
      {
        id: "rev-1",
        name: "Matthew Parker",
        avatar: "",
        date: "September 06 2026",
        rating: 5,
        headline: "I've read countless productivity guides, but this one actually breaks everything down into actionable steps.",
        content: "I've read countless productivity guides, but this one actually breaks everything down into actionable steps. The three-cut principle and daily scorecard made it so much easier to identify where my time was going. Simple, direct, and genuinely useful.",
        likes: 87,
      },
      {
        id: "rev-2",
        name: "Christopher Reed",
        avatar: "",
        date: "September 13 2026",
        rating: 5,
        headline: "This playbook completely changed how I look at discipline and focus.",
        content: "This playbook completely changed how I look at discipline and focus. I especially loved the idea of a 90-day season because it gives you a clear direction without feeling overwhelming. It's not about doing everything; it's about doing what matters. Highly recommend!",
        likes: 52,
      },
      {
        id: "rev-3",
        name: "Benjamin Cooper",
        avatar: "",
        date: "October 10, 2026",
        rating: 5,
        headline: "What I appreciate most is how practical this is.",
        content: "What I appreciate most is how practical this is. Instead of throwing random motivational quotes at you, it gives you an actual system to follow. The worksheets, habit tracking, and weekly reviews make it easy to stay accountable. A great resource for anyone serious about personal growth.",
        likes: 49,
      },
      {
        id: "rev-4",
        name: "Andrew Phillips",
        avatar: "",
        date: "September 27 2026",
        rating: 5,
        headline: "This made me realise how much of my day was being wasted on things that weren't moving me forward.",
        content: "This made me realise how much of my day was being wasted on things that weren't moving me forward. The sections on distractions, delayed gratification, and building self-trust really stood out. If you're ready to stop making excuses and start taking your goals seriously, this is worth reading.",
        likes: 53,
      },
    ];
  }

  if (slug === "18-years-of-ugly-business-advice-in-19-minutes") {
    return [
      {
        id: "rev-1",
        name: "Thomas Fischer",
        avatar: "",
        date: "September 01 2026",
        rating: 5,
        headline: "An incredibly insightful playbook that goes beyond the usual business advice. I especially appreciated the focus on personal growth, strategic thinking, and building a business that lasts. The practical exercises make it easy to put the lessons into action.",
        content: "An incredibly insightful playbook that goes beyond the usual business advice. I especially appreciated the focus on personal growth, strategic thinking, and building a business that lasts. The practical exercises make it easy to put the lessons into action.",
        likes: 93,
      },
      {
        id: "rev-2",
        name: "Jakob Hoffmann",
        avatar: "",
        date: "September 07 2026",
        rating: 5,
        headline: "What I loved most about this playbook is how it breaks down complex entrepreneurial decisions into simple, manageable steps. The sections on cash flow, equity, and customer validation are particularly valuable. A great resource for anyone serious about building a sustainable business.",
        content: "What I loved most about this playbook is how it breaks down complex entrepreneurial decisions into simple, manageable steps. The sections on cash flow, equity, and customer validation are particularly valuable. A great resource for anyone serious about building a sustainable business.",
        likes: 81,
      },
      {
        id: "rev-3",
        name: "Lukas Hartmann",
        avatar: "",
        date: "October 04, 2026",
        rating: 5,
        headline: "This playbook completely changed how I think about business growth. It highlights the importance of evolving as a founder while making thoughtful decisions about the business itself. The 90-day action plan is an excellent way to turn insights into meaningful progress.",
        content: "This playbook completely changed how I think about business growth. It highlights the importance of evolving as a founder while making thoughtful decisions about the business itself. The 90-day action plan is an excellent way to turn insights into meaningful progress.",
        likes: 66,
      },
      {
        id: "rev-4",
        name: "Matthias Braun",
        avatar: "",
        date: "September 21 2026",
        rating: 5,
        headline: "A well-structured and refreshing guide that addresses the realities of entrepreneurship, not just the success stories. I found the emphasis on sustainable growth, ownership, and finding meaningful work especially powerful. Definitely a resource worth revisiting at every stage of the entrepreneurial journey.",
        content: "A well-structured and refreshing guide that addresses the realities of entrepreneurship, not just the success stories. I found the emphasis on sustainable growth, ownership, and finding meaningful work especially powerful. Definitely a resource worth revisiting at every stage of the entrepreneurial journey.",
        likes: 53,
      },
    ];
  }

  if (slug === "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m") {
    return [
      {
        id: "rev-1",
        name: "Theo Martin",
        avatar: "",
        date: "September 10 2026",
        rating: 5,
        headline: "This playbook completely changed how I approach sales conversations. Instead of jumping straight into pitching, I now focus on understanding the customer's actual challenges. The discovery questions and call structure are especially useful. A great resource for anyone looking to improve their sales process.",
        content: "This playbook completely changed how I approach sales conversations. Instead of jumping straight into pitching, I now focus on understanding the customer's actual challenges. The discovery questions and call structure are especially useful. A great resource for anyone looking to improve their sales process.",
        likes: 79,
      },
      {
        id: "rev-2",
        name: "Dylan Hayes",
        avatar: "",
        date: "September 05 2026",
        rating: 5,
        headline: "I really appreciate how this playbook breaks down the entire sales journey into manageable steps. The sections on qualifying leads, demonstrating value, and handling objections are particularly helpful. It provides a clear framework that makes sales conversations more natural, focused, and productive.",
        content: "I really appreciate how this playbook breaks down the entire sales journey into manageable steps. The sections on qualifying leads, demonstrating value, and handling objections are particularly helpful. It provides a clear framework that makes sales conversations more natural, focused, and productive.",
        likes: 61,
      },
      {
        id: "rev-3",
        name: "Matteo Rossi",
        avatar: "",
        date: "October 09, 2026",
        rating: 5,
        headline: "What makes this playbook stand out is its emphasis on solving real customer problems rather than pushing products. The value calculation examples, discovery worksheets, and practical scripts make it easy to put the concepts into action. It's an excellent guide for building a more thoughtful and effective sales strategy.",
        content: "What makes this playbook stand out is its emphasis on solving real customer problems rather than pushing products. The value calculation examples, discovery worksheets, and practical scripts make it easy to put the concepts into action. It's an excellent guide for building a more thoughtful and effective sales strategy.",
        likes: 56,
      },
      {
        id: "rev-4",
        name: "Leo Andersson",
        avatar: "",
        date: "August 31 2026",
        rating: 5,
        headline: "A well-organised resource that covers everything from the first sales conversation to customer onboarding. I especially liked the focus on demonstrating relevant solutions, setting realistic expectations, and building trust. It offers practical advice that both new and experienced sales professionals can apply to their daily work.",
        content: "A well-organised resource that covers everything from the first sales conversation to customer onboarding. I especially liked the focus on demonstrating relevant solutions, setting realistic expectations, and building trust. It offers practical advice that both new and experienced sales professionals can apply to their daily work.",
        likes: 73,
      },
    ];
  }

  if (slug === "there-are-only-3-types-of-profitable-businesses-pick-one") {
    return [
      {
        id: "rev-1",
        name: "Oliver Bennett",
        avatar: "",
        date: "September 01 2026",
        rating: 5,
        headline: "An incredibly useful guide for anyone trying to figure out what they actually want from their business. I especially liked how it breaks down the differences between scaling, lifestyle, and exit strategies. The practical checklists make it much easier to put the ideas into action.",
        content: "An incredibly useful guide for anyone trying to figure out what they actually want from their business. I especially liked how it breaks down the differences between scaling, lifestyle, and exit strategies. The practical checklists make it much easier to put the ideas into action.",
        likes: 84,
      },
      {
        id: "rev-2",
        name: "Adrian Costa",
        avatar: "",
        date: "September 09 2026",
        rating: 5,
        headline: "What I appreciated most was the focus on building a business around the life you want. The lifestyle business section gave me a fresh perspective on profitability, delegation, and managing my time. A very practical and insightful read.",
        content: "What I appreciated most was the focus on building a business around the life you want. The lifestyle business section gave me a fresh perspective on profitability, delegation, and managing my time. A very practical and insightful read.",
        likes: 71,
      },
      {
        id: "rev-3",
        name: "Nathaniel Brooks",
        avatar: "",
        date: "October 04, 2026",
        rating: 5,
        headline: "This playbook connects business strategy with real-world execution exceptionally well. The sections on product-market fit, recurring revenue, and exit readiness are particularly valuable. It offers a clear framework for making better long-term decisions.",
        content: "This playbook connects business strategy with real-world execution exceptionally well. The sections on product-market fit, recurring revenue, and exit readiness are particularly valuable. It offers a clear framework for making better long-term decisions.",
        likes: 50,
      },
      {
        id: "rev-4",
        name: "Luca Moretti",
        avatar: "",
        date: "September 25 2026",
        rating: 5,
        headline: "A well-structured and actionable resource for entrepreneurs. I loved the templates, financial reviews, and 30-day implementation plan. Instead of simply talking about wealth creation, it explains the decisions and systems needed to build a business with a clear purpose.",
        content: "A well-structured and actionable resource for entrepreneurs. I loved the templates, financial reviews, and 30-day implementation plan. Instead of simply talking about wealth creation, it explains the decisions and systems needed to build a business with a clear purpose.",
        likes: 63,
      },
    ];
  }

  if (slug === "if-you-dont-understand-leadership-youll-never-win") {
    return [
      {
        id: "rev-1",
        name: "Mike Fishbein",
        avatar: "",
        date: "September 03 2026",
        rating: 5,
        headline: "A very practical guide to leadership. I particularly liked the sections on delegation and communication. The frameworks make it easier to understand where leadership often goes wrong and how to improve.",
        content: "A very practical guide to leadership. I particularly liked the sections on delegation and communication. The frameworks make it easier to understand where leadership often goes wrong and how to improve.",
        likes: 69,
      },
      {
        id: "rev-2",
        name: "Sidd Chauhan",
        avatar: "",
        date: "September 14 2026",
        rating: 5,
        headline: "This playbook offers a refreshing approach to managing people and building teams. The hiring and performance management chapters were especially useful. A valuable resource for anyone managing a growing business.",
        content: "This playbook offers a refreshing approach to managing people and building teams. The hiring and performance management chapters were especially useful. A valuable resource for anyone managing a growing business.",
        likes: 55,
      },
      {
        id: "rev-3",
        name: "Richelle Delia",
        avatar: "",
        date: "October 11, 2026",
        rating: 5,
        headline: "What I enjoyed most was how actionable everything is. The templates, checklists, and practical examples make it much more than just another leadership book. It genuinely helps you rethink how to run a team.",
        content: "What I enjoyed most was how actionable everything is. The templates, checklists, and practical examples make it much more than just another leadership book. It genuinely helps you rethink how to run a team.",
        likes: 41,
      },
      {
        id: "rev-4",
        name: "Mark Hinkle",
        avatar: "",
        date: "September 29 2026",
        rating: 5,
        headline: "An insightful and well-structured playbook for business owners who want to move beyond managing daily tasks. The focus on accountability, employee development, and building independent systems makes it particularly worthwhile.",
        content: "An insightful and well-structured playbook for business owners who want to move beyond managing daily tasks. The focus on accountability, employee development, and building independent systems makes it particularly worthwhile.",
        likes: 38,
      },
    ];
  }

  if (slug === "i-built-a-business-with-ai-in-24-hours") {
    return [
      {
        id: "rev-1",
        name: "Nikhil",
        avatar: "",
        date: "September 09 2026",
        rating: 5,
        headline: "A really helpful playbook for anyone starting from zero. The step-by-step approach makes business building feel much less overwhelming. I particularly liked the practical AI prompts and branding strategies.",
        content: "A really helpful playbook for anyone starting from zero. The step-by-step approach makes business building feel much less overwhelming. I particularly liked the practical AI prompts and branding strategies.",
        likes: 88,
      },
      {
        id: "rev-2",
        name: "Vihaan",
        avatar: "",
        date: "September 19 2026",
        rating: 5,
        headline: "I always wanted to start something of my own but never knew where to begin. This playbook breaks everything down into manageable steps. The AI tool recommendations and customer research sections were especially helpful.",
        content: "I always wanted to start something of my own but never knew where to begin. This playbook breaks everything down into manageable steps. The AI tool recommendations and customer research sections were especially helpful.",
        likes: 65,
      },
      {
        id: "rev-3",
        name: "Sana Chatterjee",
        avatar: "",
        date: "October 08, 2026",
        rating: 5,
        headline: "Dense, highly technical yet completely accessible. The decision frameworks and worked examples make execution feel inevitable if you put in the hours. Highly recommend printing or keeping the reference charts close by.",
        content: "Dense, highly technical yet completely accessible. The decision frameworks and worked examples make execution feel inevitable if you put in the hours. Highly recommend printing or keeping the reference charts close by.",
        likes: 33,
      },
      {
        id: "rev-4",
        name: "Tara Srinivasan",
        avatar: "",
        date: "September 21 2026",
        rating: 5,
        headline: "A great resource for aspiring entrepreneurs. Everything is explained in a structured way, and the implementation checklist makes it easy to turn the concepts into action. Very useful and practical.",
        content: "A great resource for aspiring entrepreneurs. Everything is explained in a structured way, and the implementation checklist makes it easy to turn the concepts into action. Very useful and practical.",
        likes: 46,
      },
    ];
  }

  if (slug === "copy-paste-this-strategy-to-make-your-first-5-000-online") {
    return [
      {
        id: "rev-1",
        name: "Nico",
        avatar: "",
        date: "September 19 2026",
        rating: 5,
        headline: "A genuinely useful guide for anyone looking to start a newsletter business. I particularly liked how it breaks down audience building, product creation, and monetisation into manageable steps. The 30-day plan makes it much easier to take action instead of getting stuck planning.",
        content: "A genuinely useful guide for anyone looking to start a newsletter business. I particularly liked how it breaks down audience building, product creation, and monetisation into manageable steps. The 30-day plan makes it much easier to take action instead of getting stuck planning.",
        likes: 78,
      },
      {
        id: "rev-2",
        name: "Kathy Reagan Young",
        avatar: "",
        date: "September 30 2026",
        rating: 5,
        headline: "What I appreciated most about this playbook is its practical approach. It doesn't just focus on getting subscribers but explains how to turn an audience into actual customers. The product development and pricing chapters were especially helpful. Definitely worth reading.",
        content: "What I appreciated most about this playbook is its practical approach. It doesn't just focus on getting subscribers but explains how to turn an audience into actual customers. The product development and pricing chapters were especially helpful. Definitely worth reading.",
        likes: 63,
      },
      {
        id: "rev-3",
        name: "Chris Daughtrey",
        avatar: "",
        date: "September 21, 2026",
        rating: 5,
        headline: "This playbook gave me a much clearer understanding of how a newsletter can become a real business. The frameworks are straightforward, the examples are easy to follow, and the checklists make implementation simple. A great resource for creators and independent professionals.",
        content: "This playbook gave me a much clearer understanding of how a newsletter can become a real business. The frameworks are straightforward, the examples are easy to follow, and the checklists make implementation simple. A great resource for creators and independent professionals.",
        likes: 41,
      },
      {
        id: "rev-4",
        name: "Adam Gower",
        avatar: "",
        date: "October 01 2026",
        rating: 5,
        headline: "An excellent resource for anyone who wants to monetise their knowledge without building a complicated business from day one. I found the audience research, email strategy, and product launch sections particularly valuable. It provides a clear direction and a realistic starting point.",
        content: "An excellent resource for anyone who wants to monetise their knowledge without building a complicated business from day one. I found the audience research, email strategy, and product launch sections particularly valuable. It provides a clear direction and a realistic starting point.",
        likes: 31,
      },
    ];
  }

  if (slug === "7-remote-jobs-you-can-do-from-home") {
    return [
      {
        id: "rev-1",
        name: "Varun Chawla",
        avatar: "",
        date: "September 15 2026",
        rating: 5,
        headline: "A genuinely helpful guide for anyone looking to earn from home. I loved how it breaks down different opportunities and explains exactly where to begin. The practical checklists make everything feel achievable.",
        content: "A genuinely helpful guide for anyone looking to earn from home. I loved how it breaks down different opportunities and explains exactly where to begin. The practical checklists make everything feel achievable.",
        likes: 83,
      },
      {
        id: "rev-2",
        name: "Sakshi Pillai",
        avatar: "",
        date: "September 07 2026",
        rating: 5,
        headline: "What I enjoyed most is the variety of side hustles covered. It helped me understand which options match my skills and available time. The step-by-step approach makes getting started much less overwhelming.",
        content: "What I enjoyed most is the variety of side hustles covered. It helped me understand which options match my skills and available time. The step-by-step approach makes getting started much less overwhelming.",
        likes: 60,
      },
      {
        id: "rev-3",
        name: "Ishita Menon",
        avatar: "",
        date: "September 23, 2026",
        rating: 5,
        headline: "An excellent resource for beginners! The explanations are straightforward, practical, and easy to follow. I especially liked the 30-day plan because it gives you a clear direction instead of leaving you wondering what to do next.",
        content: "An excellent resource for beginners! The explanations are straightforward, practical, and easy to follow. I especially liked the 30-day plan because it gives you a clear direction instead of leaving you wondering what to do next.",
        likes: 44,
      },
      {
        id: "rev-4",
        name: "Nikhil Sethi",
        avatar: "",
        date: "October 04 2026",
        rating: 5,
        headline: "This playbook offers a refreshing look at making money online without unrealistic promises. The different business models, practical tips, and launch checklists make it a valuable guide for anyone wanting to build an additional income stream.",
        content: "This playbook offers a refreshing look at making money online without unrealistic promises. The different business models, practical tips, and launch checklists make it a valuable guide for anyone wanting to build an additional income stream.",
        likes: 39,
      },
    ];
  }

  if (slug === "i-asked-ai-to-make-me-as-much-money-as-possible") {
    return [
      {
        id: "rev-1",
        name: "Siddharth Rao",
        avatar: "",
        date: "September 17 2026",
        rating: 5,
        headline: "I really liked how this playbook breaks down the entire resale process. The AI prompts and sourcing strategies make it much easier to understand how to get started without feeling overwhelmed. A very useful business guide.",
        content: "I really liked how this playbook breaks down the entire resale process. The AI prompts and sourcing strategies make it much easier to understand how to get started without feeling overwhelmed. A very useful business guide.",
        likes: 73,
      },
      {
        id: "rev-2",
        name: "Devika Nair",
        avatar: "",
        date: "September 11 2026",
        rating: 5,
        headline: "This is a refreshing take on starting a small business with AI. I especially liked the sections on product research, pricing, and automating repetitive tasks. It provides practical ideas that can actually be implemented.",
        content: "This is a refreshing take on starting a small business with AI. I especially liked the sections on product research, pricing, and automating repetitive tasks. It provides practical ideas that can actually be implemented.",
        likes: 59,
      },
      {
        id: "rev-3",
        name: "Nisha Bhatia",
        avatar: "",
        date: "September 28, 2026",
        rating: 5,
        headline: "The playbook covers everything from finding products to completing a sale. The profit calculations, checklists, and seven-day launch plan make it particularly valuable. I appreciate the realistic approach to risks and business growth.",
        content: "The playbook covers everything from finding products to completing a sale. The profit calculations, checklists, and seven-day launch plan make it particularly valuable. I appreciate the realistic approach to risks and business growth.",
        likes: 47,
      },
      {
        id: "rev-4",
        name: "Arjun Deshmukh",
        avatar: "",
        date: "September 22 2026",
        rating: 5,
        headline: "A well-organised guide with plenty of actionable information. The idea of using separate AI assistants for sourcing, valuation, logistics, and listings is especially interesting. It has given me a much clearer picture of how to build a repeatable resale operation.",
        content: "A well-organised guide with plenty of actionable information. The idea of using separate AI assistants for sourcing, valuation, logistics, and listings is especially interesting. It has given me a much clearer picture of how to build a repeatable resale operation.",
        likes: 40,
      },
    ];
  }

  if (slug === "these-are-the-best-business-books-to-read-7-billionaire-books") {
    return [
      {
        id: "rev-1",
        name: "Ananya Kulkarni",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "A very practical and insightful playbook. I liked how it brings together lessons from different business leaders and turns them into actionable principles. The 30-day implementation plan makes it especially useful.",
        content: "A very practical and insightful playbook. I liked how it brings together lessons from different business leaders and turns them into actionable principles. The 30-day implementation plan makes it especially useful.",
        likes: 81,
      },
      {
        id: "rev-2",
        name: "Rohan Malhotra",
        avatar: "",
        date: "September 02 2026",
        rating: 5,
        headline: "An excellent resource for anyone interested in entrepreneurship and building a successful business. The chapters offer valuable perspectives on leadership, customer relationships, decision-making, and investing. Easy to follow and full of useful takeaways.",
        content: "An excellent resource for anyone interested in entrepreneurship and building a successful business. The chapters offer valuable perspectives on leadership, customer relationships, decision-making, and investing. Easy to follow and full of useful takeaways.",
        likes: 68,
      },
      {
        id: "rev-3",
        name: "Kunal Deshmukh",
        avatar: "",
        date: "October 07, 2026",
        rating: 5,
        headline: "A well-structured collection of business insights. The emphasis on customer obsession, disciplined thinking, operational excellence, and managing risk makes this a valuable read. I especially appreciated the final checklist for putting the lessons into practice.",
        content: "A well-structured collection of business insights. The emphasis on customer obsession, disciplined thinking, operational excellence, and managing risk makes this a valuable read. I especially appreciated the final checklist for putting the lessons into practice.",
        likes: 42,
      },
      {
        id: "rev-4",
        name: "Meera Iyer",
        avatar: "",
        date: "September 20 2026",
        rating: 5,
        headline: "What I enjoyed most was the practical approach. Instead of simply discussing the achievements of successful entrepreneurs, the playbook explains the thinking behind their decisions and how we can apply those lessons in our own professional journeys.",
        content: "What I enjoyed most was the practical approach. Instead of simply discussing the achievements of successful entrepreneurs, the playbook explains the thinking behind their decisions and how we can apply those lessons in our own professional journeys.",
        likes: 30,
      },
    ];
  }

  if (slug === "master-higgsfield-ai-in-20-minutes-beginner-tutorial") {
    return [
      {
        id: "rev-1",
        name: "Matteo Ricci",
        avatar: "",
        date: "August 14, 2026",
        rating: 5,
        headline: "An excellent and well-organised playbook! It breaks down Higgsfield AI's features in a way that's easy to understand, even for beginners. I especially loved the practical prompt templates and Cinema Studio workflows. Definitely worth reading!",
        content: "An excellent and well-organised playbook! It breaks down Higgsfield AI's features in a way that's easy to understand, even for beginners. I especially loved the practical prompt templates and Cinema Studio workflows. Definitely worth reading!",
        likes: 59,
      },
      {
        id: "rev-2",
        name: "Freya Collins",
        avatar: "",
        date: "September 18, 2026",
        rating: 5,
        headline: "Absolutely fantastic guide! I learned so much about AI image generation, cinematic videos, and voiceovers. The step-by-step explanations make it much easier to turn creative ideas into complete projects. Highly recommended!",
        content: "Absolutely fantastic guide! I learned so much about AI image generation, cinematic videos, and voiceovers. The step-by-step explanations make it much easier to turn creative ideas into complete projects. Highly recommended!",
        likes: 36,
      },
      {
        id: "rev-3",
        name: "Daniel Weber",
        avatar: "",
        date: "September 02, 2026",
        rating: 5,
        headline: "What I appreciate most is the practical approach. Rather than just explaining the tools, the playbook shows how to bring them together into a complete production workflow. The credit management advice and final checklist are valuable additions.",
        content: "What I appreciate most is the practical approach. Rather than just explaining the tools, the playbook shows how to bring them together into a complete production workflow. The credit management advice and final checklist are valuable additions.",
        likes: 45,
      },
      {
        id: "rev-4",
        name: "Amara Williams",
        avatar: "",
        date: "August 15, 2026",
        rating: 5,
        headline: "Really impressed with this playbook! Everything is explained clearly, and the practical workflows make Higgsfield feel much less overwhelming. It's a fantastic resource for creators who want to take their visual content to the next level.",
        content: "Really impressed with this playbook! Everything is explained clearly, and the practical workflows make Higgsfield feel much less overwhelming. It's a fantastic resource for creators who want to take their visual content to the next level.",
        likes: 75,
      },
    ];
  }

  if (slug === "my-honest-advice-to-someone-who-wants-to-get-rich") {
    return [
      {
        id: "rev-1",
        name: "Rohan Mehta",
        avatar: "",
        date: "October 18, 2026",
        rating: 5,
        headline: "A genuinely inspiring and practical playbook! I loved how it explains the importance of starting early, developing valuable skills, and making smart financial decisions. The 90-day plan makes everything feel achievable. Highly recommended!",
        content: "A genuinely inspiring and practical playbook! I loved how it explains the importance of starting early, developing valuable skills, and making smart financial decisions. The 90-day plan makes everything feel achievable. Highly recommended!",
        likes: 28,
      },
      {
        id: "rev-2",
        name: "Clara Bennett",
        avatar: "",
        date: "September 18, 2026",
        rating: 5,
        headline: "Excellent guide for anyone serious about building long-term wealth! The chapters are well organised, easy to understand, and full of valuable lessons. A great reminder that small steps taken today can create amazing opportunities in the future.",
        content: "Excellent guide for anyone serious about building long-term wealth! The chapters are well organised, easy to understand, and full of valuable lessons. A great reminder that small steps taken today can create amazing opportunities in the future.",
        likes: 61,
      },
      {
        id: "rev-3",
        name: "Arjun Nair",
        avatar: "",
        date: "October 01, 2026",
        rating: 5,
        headline: "This playbook completely changed how I think about personal growth and financial success. The focus on skill development, consistency, and calculated risks is especially valuable. Definitely a resource worth revisiting!",
        content: "This playbook completely changed how I think about personal growth and financial success. The focus on skill development, consistency, and calculated risks is especially valuable. Definitely a resource worth revisiting!",
        likes: 43,
      },
      {
        id: "rev-4",
        name: "Elise Laurent",
        avatar: "",
        date: "August 11, 2026",
        rating: 5,
        headline: "Such a motivating and insightful read! I particularly enjoyed the practical advice on turning small achievements into bigger opportunities. It offers a clear direction for young people who want to build a better financial future.",
        content: "Such a motivating and insightful read! I particularly enjoyed the practical advice on turning small achievements into bigger opportunities. It offers a clear direction for young people who want to build a better financial future.",
        likes: 89,
      },
    ];
  }

  if (slug === "the-30k-month-al-faceless-shorts-method-nobodys-talking-about") {
    return [
      {
        id: "rev-1",
        name: "Zayden Okafor",
        avatar: "",
        date: "October 21, 2026",
        rating: 5,
        headline: "An incredible playbook! Everything is explained perfectly, and the workflow makes starting a faceless YouTube Shorts channel feel achievable. Definitely worth reading!",
        content: "An incredible playbook! Everything is explained perfectly, and the workflow makes starting a faceless YouTube Shorts channel feel achievable. Definitely worth reading!",
        likes: 35,
      },
      {
        id: "rev-2",
        name: "Adrian",
        avatar: "",
        date: "September 30, 2026",
        rating: 5,
        headline: "Absolutely loved this guide! The Claude, VidIQ, and RankReel combination is brilliant, and the step-by-step instructions make the entire process so much easier. Highly recommended!",
        content: "Absolutely loved this guide! The Claude, VidIQ, and RankReel combination is brilliant, and the step-by-step instructions make the entire process so much easier. Highly recommended!",
        likes: 60,
      },
      {
        id: "rev-3",
        name: "Emilia",
        avatar: "",
        date: "October 08, 2026",
        rating: 5,
        headline: "One of the most practical guides I've come across! Packed with useful strategies, amazing tools, and actionable ideas. A fantastic resource for anyone starting their YouTube journey!",
        content: "One of the most practical guides I've come across! Packed with useful strategies, amazing tools, and actionable ideas. A fantastic resource for anyone starting their YouTube journey!",
        likes: 43,
      },
      {
        id: "rev-4",
        name: "Thiago Moretti",
        avatar: "",
        date: "October 1, 2026",
        rating: 5,
        headline: "Outstanding playbook! I love how everything is organised into simple steps, making content research and video creation much less overwhelming. This is genuinely inspiring!",
        content: "Outstanding playbook! I love how everything is organised into simple steps, making content research and video creation much less overwhelming. This is genuinely inspiring!",
        likes: 20,
      },
    ];
  }

  if (slug === "how-to-build-10k-websites-in-minutes-claude-ai") {
    return [
      {
        id: "rev-1",
        name: "Jose Vidal",
        avatar: "",
        date: "October 14, 2026",
        rating: 5,
        headline: "The rare AI playbook with zero filler — pure tactical signal.",
        content: "The rare AI playbook with zero filler — pure tactical signal. I absolutely love this playbook, you cannot find this anywhere else but on Plugd Playbooks bc the instagram scammers are everywhere trying to sell you fake tips",
        likes: 84,
      },
      {
        id: "rev-2",
        name: "Raissa Asman",
        avatar: "",
        date: "September 28, 2026",
        rating: 5,
        headline: "Worth 50x the price. Structured like an elite executive briefing. Thanks a lot. keep it up 👍",
        content: "Worth 50x the price. Structured like an elite executive briefing. Thanks a lot. keep it up 👍",
        likes: 67,
      },
      {
        id: "rev-3",
        name: "David Chen",
        avatar: "",
        date: "October 02, 2026",
        rating: 5,
        headline: "Extremely deep and practical. Dense with actionable insights.",
        content: "Extremely deep and practical. Dense with actionable insights. You answered all of the questions I didn't know I had until reading this. This is a FANTASTIC RESOURCE!!",
        likes: 42,
      },
      {
        id: "rev-4",
        name: "Sarah Jenkins",
        avatar: "",
        date: "August 19, 2026",
        rating: 5,
        headline: "Thanks to you, I've built and deployed on my VPS the best-looking website I've ever made!",
        content: "Thanks to you, I've built and deployed on my VPS the best-looking website I've ever made!\nThanks a lot!",
        likes: 31,
      },
    ];
  }

  return [
    {
      id: "rev-1",
      name: "Marcus Vance",
      avatar: "",
      date: "October 14, 2026",
      rating: 5,
      headline: "The rare AI playbook with zero filler — pure tactical signal.",
      content: `I've read dozens of business and tech guides, and 95% could have been a blog post. "${title}" is the complete opposite. It reads like Peter Thiel's Zero to One applied directly to this vertical. The mental models, concrete unit economics, and step-by-step systems gave me a complete operational playbook. Finished the whole book in two sittings and immediately restructured our team's workflow.`,
      likes: 84,
    },
    {
      id: "rev-2",
      name: "Elena Rostova",
      avatar: "",
      date: "September 28, 2026",
      rating: 5,
      headline: "Worth 50x the price. Structured like an elite executive briefing.",
      content: `What sets this playbook apart is its rigor. It doesn't promise overnight riches or give vague advice. Instead, it systematically breaks down the architectural foundations, failure points, and competitive moats. The breakdown in Chapter 3 alone saved us months of trial and error. Easily one of my top 3 business reads this year.`,
      likes: 67,
    },
    {
      id: "rev-3",
      name: "David Chen",
      avatar: "",
      date: "October 02, 2026",
      rating: 4,
      headline: "Extremely deep and practical. Dense with actionable insights.",
      content: `Dense, highly technical yet completely accessible. The decision frameworks and worked examples make execution feel inevitable if you put in the hours. Highly recommend printing or keeping the reference charts close by.`,
      likes: 42,
    },
    {
      id: "rev-4",
      name: "Sarah Jenkins",
      avatar: "",
      date: "August 19, 2026",
      rating: 5,
      headline: "Masterpiece in concise, high-leverage instruction.",
      content: `This is what business publishing should look like in 2026. Every chapter is disciplined, packed with empirical data and battle-tested directives. You leave with an unfair clarity that other books never deliver.`,
      likes: 31,
    },
  ];
}

/**
 * Deterministic vibrant background color for initials avatars
 */
export function getAvatarBgColor(name: string, index = 0): string {
  if (!name) return "#1c1917";
  const PALETTE = [
    "#059669", // emerald
    "#2563eb", // blue
    "#7c3aed", // violet
    "#d97706", // amber
    "#e11d48", // rose
    "#4f46e5", // indigo
    "#0d9488", // teal
    "#ea580c", // orange
    "#0891b2", // cyan
    "#9333ea", // purple
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
  }
  return PALETTE[Math.abs(hash + index) % PALETTE.length];
}
