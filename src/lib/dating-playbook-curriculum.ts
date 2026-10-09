export interface PlaybookLesson {
  id: string;
  number: string;
  title: string;
}

export interface PlaybookModule {
  id: string;
  number: string;
  title: string;
  description: string;
  lessons: PlaybookLesson[];
}

export const DATING_PLAYBOOK_MODULES: PlaybookModule[] = [
  {
    id: "module-01",
    number: "01",
    title: "The Psychology of Attraction",
    description:
      "Understand what creates attraction, how physical appearance, personality, confidence, compatibility, timing, and context interact, and why attraction is different from approval or validation.",
    lessons: [
      { id: "01-1", number: "1.1", title: "Physical Attraction & First Impressions" },
      { id: "01-2", number: "1.2", title: "Personality, Warmth & Interpersonal Appeal" },
      { id: "01-3", number: "1.3", title: "Chemistry vs. Compatibility" },
      { id: "01-4", number: "1.4", title: "Authentic Confidence vs. Arrogance" },
      { id: "01-5", number: "1.5", title: "Initial Attraction vs. Lasting Interest" },
      { id: "01-6", number: "1.6", title: "Context, Timing & Individual Preferences" },
      { id: "01-7", number: "1.7", title: "Common Misconceptions About What Women Want" },
    ],
  },
  {
    id: "module-02",
    number: "02",
    title: "Become the Man",
    description:
      "Build a life, appearance, social presence, and sense of self that make you more confident and more comfortable meeting people.",
    lessons: [
      { id: "02-1", number: "2.1", title: "Grooming, Style, Fitness & Personal Presentation" },
      { id: "02-2", number: "2.2", title: "Self-Respect & Emotional Independence" },
      { id: "02-3", number: "2.3", title: "Building an Engaging Life Beyond Dating" },
      { id: "02-4", number: "2.4", title: "Cultivating Lifestyle, Social Circles & Hobbies" },
      { id: "02-5", number: "2.5", title: "Developing Natural Confidence Without Performing" },
      { id: "02-6", number: "2.6", title: "Direction, Ambition & Personal Stability" },
      { id: "02-7", number: "2.7", title: "Improving Yourself Without Making Dating Your Entire Identity" },
    ],
  },
  {
    id: "module-03",
    number: "03",
    title: "Social Skills & Meeting Women",
    description:
      "Learn how to meet women naturally, start conversations, read social situations, and make interactions feel comfortable instead of forced.",
    lessons: [
      { id: "03-1", number: "3.1", title: "Where and How to Meet Potential Partners Naturally" },
      { id: "03-2", number: "3.2", title: "Respectful, Low-Pressure Approaches & Conversation Starters" },
      { id: "03-3", number: "3.3", title: "Active Listening & Engaging Conversation Flow" },
      { id: "03-4", number: "3.4", title: "Humor, Playfulness & Compelling Storytelling" },
      { id: "03-5", number: "3.5", title: "Reading Social Cues Without Overinterpreting" },
      { id: "03-6", number: "3.6", title: "Group Settings, Social Events & Warm Introductions" },
      { id: "03-7", number: "3.7", title: "Recognizing Disinterest & Exiting Gracefully" },
    ],
  },
  {
    id: "module-04",
    number: "04",
    title: "Flirting, Chemistry & Sexual Tension",
    description:
      "Understand how playful conversation, romantic intent, body language, and mutual interest turn an ordinary interaction into a potential romantic connection.",
    lessons: [
      { id: "04-1", number: "4.1", title: "Friendly Conversation vs. Clear Romantic Interest" },
      { id: "04-2", number: "4.2", title: "Flirting Naturally Without Rehearsed Lines" },
      { id: "04-3", number: "4.3", title: "Playfulness, Teasing & Conversational Rhythm" },
      { id: "04-4", number: "4.4", title: "Body Language, Proximity & Eye Contact" },
      { id: "04-5", number: "4.5", title: "Expressing Interest Without Overwhelming" },
      { id: "04-6", number: "4.6", title: "Recognizing Mutual Chemistry & Reciprocation" },
      { id: "04-7", number: "4.7", title: "Consent, Boundaries & Respecting Signals" },
    ],
  },
  {
    id: "module-05",
    number: "05",
    title: "Texting & Modern Communication",
    description:
      "Make digital conversations more natural, understand when to move toward an actual date, and stop treating every message as a test you must pass.",
    lessons: [
      { id: "05-1", number: "5.1", title: "Starting and Maintaining Digital Conversations" },
      { id: "05-2", number: "5.2", title: "Message Examples: Weak Texts vs. Calibrated Responses" },
      { id: "05-3", number: "5.3", title: "Humor & Conversational Momentum" },
      { id: "05-4", number: "5.4", title: "Seamlessly Moving From Texting to Arranging a Date" },
      { id: "05-5", number: "5.5", title: "Understanding Delayed Replies & Inconsistent Communication" },
      { id: "05-6", number: "5.6", title: "Avoiding Overmessaging, Manipulation & Scarcity Games" },
      { id: "05-7", number: "5.7", title: "Communicating Boundaries & Clear Intentions" },
    ],
  },
  {
    id: "module-06",
    number: "06",
    title: "Dating, Intimacy & Relationship Skills",
    description:
      "Navigate first dates, build emotional connection, understand compatibility, and develop the skills needed to turn mutual attraction into a healthy relationship.",
    lessons: [
      { id: "06-1", number: "6.1", title: "Planning and Navigating First Dates Confidently" },
      { id: "06-2", number: "6.2", title: "Conversation, Depth & Emotional Connection" },
      { id: "06-3", number: "6.3", title: "Making Romantic Intentions Clear Without Pressure" },
      { id: "06-4", number: "6.4", title: "Physical Intimacy, Consent & Pacing" },
      { id: "06-5", number: "6.5", title: "Emotional Availability & Healthy Vulnerability" },
      { id: "06-6", number: "6.6", title: "Assessing Compatibility, Values & Expectations" },
      { id: "06-7", number: "6.7", title: "Exclusivity Conversations & Sustaining Attraction Long-Term" },
    ],
  },
  {
    id: "module-07",
    number: "07",
    title: "Lover Boy vs. Playboy: The Two Approaches",
    description:
      "Explore two very different dating styles, what makes each appealing, where each can go wrong, and how to choose an approach that fits your personality and goals.",
    lessons: [
      { id: "07-1", number: "7.1", title: "The Romantic Approach: Emotional Openness & Attentiveness" },
      { id: "07-2", number: "7.2", title: "Lover Boy Pitfalls: Overinvestment, Idealization & People-Pleasing" },
      { id: "07-3", number: "7.3", title: "The Casual Approach: Independence, Playfulness & Novelty" },
      { id: "07-4", number: "7.4", title: "Playboy Pitfalls: Emotional Detachment & Shallow Connections" },
      { id: "07-5", number: "7.5", title: "Short-Term Dating vs. Long-Term Partnership Trade-Offs" },
      { id: "07-6", number: "7.6", title: "Selective Standards vs. Manufactured Indifference" },
      { id: "07-7", number: "7.7", title: "Choosing the Right Approach for Your Authentic Goals" },
    ],
  },
  {
    id: "module-08",
    number: "08",
    title: "Rejection, Standards & Mastery",
    description:
      "Bring everything together: handle rejection, recognize unhealthy patterns, communicate honestly, make better dating decisions, and develop a sustainable approach to relationships.",
    lessons: [
      { id: "08-1", number: "8.1", title: "Handling Rejection Without Resentment or Bitterness" },
      { id: "08-2", number: "8.2", title: "Rebuilding Confidence & Resetting After Setbacks" },
      { id: "08-3", number: "8.3", title: "Recognizing Mismatched Interest & Moving On Early" },
      { id: "08-4", number: "8.4", title: "Setting Non-Negotiable Standards & Healthy Boundaries" },
      { id: "08-5", number: "8.5", title: "Identifying Unhealthy Patterns, Insecurity & Jealousy" },
      { id: "08-6", number: "8.6", title: "Knowing When to Pursue, Step Back, or Walk Away" },
      { id: "08-7", number: "8.7", title: "Creating Your Personal Sustainable Dating Framework" },
    ],
  },
];
