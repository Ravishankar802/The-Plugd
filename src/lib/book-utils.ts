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
