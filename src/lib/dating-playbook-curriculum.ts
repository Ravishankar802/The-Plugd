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
    title: "The Foundations of Attraction",
    description:
      "Understand how attraction develops, what creates a genuine connection, why people choose one another, and how physical attraction, personality, emotional connection, timing, and compatibility interact.",
    lessons: [
      { id: "01-1", number: "1.1", title: "What Attraction Actually Is" },
      { id: "01-2", number: "1.2", title: "Physical Attraction, Personality & Emotional Connection" },
      { id: "01-3", number: "1.3", title: "First Impressions and Initial Interest" },
      { id: "01-4", number: "1.4", title: "Chemistry vs. Compatibility" },
      { id: "01-5", number: "1.5", title: "Attraction vs. Validation: Understanding What You Really Want" },
      { id: "01-6", number: "1.6", title: "The Psychology of Interest, Curiosity & Connection" },
      { id: "01-7", number: "1.7", title: "Why Attraction Cannot Be Forced" },
      { id: "01-8", number: "1.8", title: "Common Myths About Dating and Relationships" },
      { id: "01-9", number: "1.9", title: "Individual Preferences, Personalities & Different Types of Attraction" },
      { id: "01-10", number: "1.10", title: "Building a Realistic Understanding of Dating" },
    ],
  },
  {
    id: "module-02",
    number: "02",
    title: "Becoming Your Most Attractive Self",
    description:
      "Develop the appearance, lifestyle, confidence, emotional stability, and social skills that help you feel better about yourself and form healthier connections.",
    lessons: [
      { id: "02-1", number: "2.1", title: "Defining Your Own Dating Goals" },
      { id: "02-2", number: "2.2", title: "Grooming, Hygiene & Personal Presentation" },
      { id: "02-3", number: "2.3", title: "Style, Clothing & Dressing for Yourself" },
      { id: "02-4", number: "2.4", title: "Fitness, Health, Sleep & Energy" },
      { id: "02-5", number: "2.5", title: "Confidence vs. Arrogance" },
      { id: "02-6", number: "2.6", title: "Building a Life You Genuinely Enjoy" },
      { id: "02-7", number: "2.7", title: "Hobbies, Interests & Having Something to Talk About" },
      { id: "02-8", number: "2.8", title: "Body Language, Eye Contact & Presence" },
      { id: "02-9", number: "2.9", title: "Managing Insecurity, Comparison & Self-Doubt" },
      { id: "02-10", number: "2.10", title: "Emotional Maturity and Self-Awareness" },
      { id: "02-11", number: "2.11", title: "Building Confidence Through Action" },
      { id: "02-12", number: "2.12", title: "Creating Your Personal Improvement Plan" },
    ],
  },
  {
    id: "module-03",
    number: "03",
    title: "Meeting People & Creating Opportunities",
    description:
      "Learn where and how to meet compatible people, start conversations naturally, expand your social life, and recognize appropriate opportunities to express interest.",
    lessons: [
      { id: "03-1", number: "3.1", title: "Where People Actually Meet Potential Partners" },
      { id: "03-2", number: "3.2", title: "Expanding Your Social Circle" },
      { id: "03-3", number: "3.3", title: "Meeting People Through Friends, Hobbies & Events" },
      { id: "03-4", number: "3.4", title: "Starting Conversations With Strangers Respectfully" },
      { id: "03-5", number: "3.5", title: "Reading Social Context and Situational Awareness" },
      { id: "03-6", number: "3.6", title: "Approaching Someone Without Making It Awkward" },
      { id: "03-7", number: "3.7", title: "Opening Lines That Sound Natural" },
      { id: "03-8", number: "3.8", title: "Starting Conversations in Everyday Situations" },
      { id: "03-9", number: "3.9", title: "Recognizing Interest, Disinterest & Social Cues" },
      { id: "03-10", number: "3.10", title: "Respecting Boundaries and Knowing When Not to Approach" },
      { id: "03-11", number: "3.11", title: "Turning a Good Conversation Into a Future Meeting" },
      { id: "03-12", number: "3.12", title: "Building a Consistent Social Life" },
    ],
  },
  {
    id: "module-04",
    number: "04",
    title: "Conversation, Flirting & Chemistry",
    description:
      "Develop the ability to communicate naturally, create playful chemistry, show romantic interest, and build a connection without pretending to be someone else.",
    lessons: [
      { id: "04-1", number: "4.1", title: "The Difference Between Friendly and Flirtatious" },
      { id: "04-2", number: "4.2", title: "Playfulness, Humor & Light Teasing" },
      { id: "04-3", number: "4.3", title: "Asking Better Questions" },
      { id: "04-4", number: "4.4", title: "Active Listening and Genuine Curiosity" },
      { id: "04-5", number: "4.5", title: "Telling Stories Instead of Listing Facts" },
      { id: "04-6", number: "4.6", title: "Expressing Interest Without Overdoing It" },
      { id: "04-7", number: "4.7", title: "Compliments That Feel Genuine" },
      { id: "04-8", number: "4.8", title: "Creating Emotional Connection Through Conversation" },
      { id: "04-9", number: "4.9", title: "Managing Awkward Silences" },
      { id: "04-10", number: "4.10", title: "Understanding Reciprocal Flirting" },
      { id: "04-11", number: "4.11", title: "Reading Body Language Without Overinterpreting It" },
      { id: "04-12", number: "4.12", title: "Handling Nervousness During Romantic Interactions" },
      { id: "04-13", number: "4.13", title: "Knowing When to Escalate, Slow Down or Step Back" },
      { id: "04-14", number: "4.14", title: "Being Yourself Instead of Performing a Character" },
    ],
  },
  {
    id: "module-05",
    number: "05",
    title: "Online Dating, DMs & Texting",
    description:
      "Learn how to present yourself online, use dating apps and social media effectively, start conversations through messages, maintain momentum, and move from chatting to meeting in person.",
    lessons: [
      { id: "05-1", number: "5.1", title: "Choosing the Right Dating Platforms" },
      { id: "05-2", number: "5.2", title: "Building an Authentic Dating Profile" },
      { id: "05-3", number: "5.3", title: "Photos, Bios & First Impressions Online" },
      { id: "05-4", number: "5.4", title: "Understanding Dating-App Dynamics" },
      { id: "05-5", number: "5.5", title: "Starting Conversations in DMs" },
      { id: "05-6", number: "5.6", title: "Opening Messages That Give Someone Something to Respond To" },
      { id: "05-7", number: "5.7", title: "Keeping Text Conversations Interesting" },
      { id: "05-8", number: "5.8", title: "Humor, Flirting & Personality Over Text" },
      { id: "05-9", number: "5.9", title: "Message Length, Timing & Communication Preferences" },
      { id: "05-10", number: "5.10", title: "Double Texting, Slow Replies & Uncertainty" },
      { id: "05-11", number: "5.11", title: "Recognizing Low Interest Without Obsessing Over It" },
      { id: "05-12", number: "5.12", title: "Moving From Messaging to a Date" },
      { id: "05-13", number: "5.13", title: "Asking Someone Out Clearly" },
      { id: "05-14", number: "5.14", title: "Avoiding Endless Texting Without Progress" },
      { id: "05-15", number: "5.15", title: "Online Dating Safety, Privacy & Scam Awareness" },
    ],
  },
  {
    id: "module-06",
    number: "06",
    title: "Dates, Romantic Progression & Intimacy",
    description:
      "Navigate the first date and subsequent dates with confidence, create enjoyable experiences, communicate romantic interest, and approach physical and emotional intimacy with respect.",
    lessons: [
      { id: "06-1", number: "6.1", title: "Planning a First Date That Feels Natural" },
      { id: "06-2", number: "6.2", title: "Choosing the Right Setting and Activity" },
      { id: "06-3", number: "6.3", title: "First-Date Conversation and Getting Comfortable" },
      { id: "06-4", number: "6.4", title: "Managing First-Date Anxiety" },
      { id: "06-5", number: "6.5", title: "Creating a Mutual Sense of Chemistry" },
      { id: "06-6", number: "6.6", title: "Expressing Romantic Intentions Clearly" },
      { id: "06-7", number: "6.7", title: "Reading the Room Without Making Assumptions" },
      { id: "06-8", number: "6.8", title: "Physical Intimacy, Consent & Pacing" },
      { id: "06-9", number: "6.9", title: "Communicating Boundaries and Preferences" },
      { id: "06-10", number: "6.10", title: "Kissing: Timing, Communication & Mutual Interest" },
      { id: "06-11", number: "6.11", title: "Navigating Different Comfort Levels" },
      { id: "06-12", number: "6.12", title: "Handling the End of a Date" },
      { id: "06-13", number: "6.13", title: "Following Up After a Date" },
      { id: "06-14", number: "6.14", title: "Planning the Second and Third Dates" },
      { id: "06-15", number: "6.15", title: "Understanding When and How Dating Progresses" },
      { id: "06-16", number: "6.16", title: "What to Do When the Chemistry Is Not Mutual" },
    ],
  },
  {
    id: "module-07",
    number: "07",
    title: "Dating Dynamics, Expectations & Decisions",
    description:
      "Understand different dating intentions, assess mutual interest, navigate ambiguity, make decisions about compatibility, and avoid confusing attention with a meaningful connection.",
    lessons: [
      { id: "07-1", number: "7.1", title: "Casual Dating vs. Relationship-Oriented Dating" },
      { id: "07-2", number: "7.2", title: "Understanding Your Own Intentions" },
      { id: "07-3", number: "7.3", title: "Understanding What the Other Person Wants" },
      { id: "07-4", number: "7.4", title: "Recognizing Mutual Effort and Reciprocal Interest" },
      { id: "07-5", number: "7.5", title: "Consistency vs. Intensity: What Actually Matters" },
      { id: "07-6", number: "7.6", title: "Mixed Signals, Ambiguity & Unclear Intentions" },
      { id: "07-7", number: "7.7", title: "Attachment Patterns and Their Influence on Dating" },
      { id: "07-8", number: "7.8", title: "Managing Expectations Without Rushing Things" },
      { id: "07-9", number: "7.9", title: "Dating Multiple People: Honesty, Boundaries & Expectations" },
      { id: "07-10", number: "7.10", title: "Talking About Exclusivity" },
      { id: "07-11", number: "7.11", title: "When to Keep Exploring and When to Move On" },
      { id: "07-12", number: "7.12", title: "Balancing Dating With Your Personal Life" },
      { id: "07-13", number: "7.13", title: "Avoiding Overinvestment Before Compatibility Is Clear" },
      { id: "07-14", number: "7.14", title: "Making Dating Decisions Based on Evidence, Not Fantasy" },
    ],
  },
  {
    id: "module-08",
    number: "08",
    title: "Rejection, Emotional Resilience & Standards",
    description:
      "Learn how to handle rejection, disappointment, uncertainty, unhealthy patterns, and dating setbacks while maintaining self-respect and emotional balance.",
    lessons: [
      { id: "08-1", number: "8.1", title: "Handling Rejection Without Resentment or Bitterness" },
      { id: "08-2", number: "8.2", title: "Why Rejection Does Not Define Your Worth" },
      { id: "08-3", number: "8.3", title: "Recovering From Ghosting" },
      { id: "08-4", number: "8.4", title: "Handling Unrequited Feelings" },
      { id: "08-5", number: "8.5", title: "Identifying Unhealthy Patterns, Insecurity & Jealousy" },
      { id: "08-6", number: "8.6", title: "Recognizing Manipulation, Dishonesty & Disrespect" },
      { id: "08-7", number: "8.7", title: "Setting Boundaries Without Becoming Controlling" },
      { id: "08-8", number: "8.8", title: "Standards vs. Unrealistic Expectations" },
      { id: "08-9", number: "8.9", title: "Managing Dating Anxiety and Overthinking" },
      { id: "08-10", number: "8.10", title: "Avoiding Desperation, Obsession & Emotional Dependence" },
      { id: "08-11", number: "8.11", title: "Knowing When to Pursue, Step Back or Walk Away" },
      { id: "08-12", number: "8.12", title: "Coping With Breakups and Disappointment" },
      { id: "08-13", number: "8.13", title: "Rebuilding Confidence After a Difficult Experience" },
      { id: "08-14", number: "8.14", title: "Developing Emotional Independence and Resilience" },
    ],
  },
  {
    id: "module-09",
    number: "09",
    title: "Building a Healthy Relationship",
    description:
      "Move beyond attraction and early dating to understand communication, trust, emotional availability, conflict resolution, compatibility, intimacy, and the habits that sustain a healthy relationship.",
    lessons: [
      { id: "09-1", number: "9.1", title: "Moving From Dating to a Committed Relationship" },
      { id: "09-2", number: "9.2", title: "Defining What a Healthy Relationship Looks Like" },
      { id: "09-3", number: "9.3", title: "Emotional Availability and Healthy Vulnerability" },
      { id: "09-4", number: "9.4", title: "Communicating Needs Clearly" },
      { id: "09-5", number: "9.5", title: "Listening, Empathy & Understanding Different Perspectives" },
      { id: "09-6", number: "9.6", title: "Trust, Honesty & Reliability" },
      { id: "09-7", number: "9.7", title: "Handling Disagreements Without Escalation" },
      { id: "09-8", number: "9.8", title: "Apologies, Accountability & Repairing Conflict" },
      { id: "09-9", number: "9.9", title: "Maintaining Attraction While Building Emotional Security" },
      { id: "09-10", number: "9.10", title: "Physical Intimacy and Ongoing Communication" },
      { id: "09-11", number: "9.11", title: "Personal Space, Independence & Healthy Boundaries" },
      { id: "09-12", number: "9.12", title: "Jealousy, Insecurity & Trust Issues" },
      { id: "09-13", number: "9.13", title: "Money, Lifestyle, Values & Future Expectations" },
      { id: "09-14", number: "9.14", title: "Family, Friends & External Influences" },
      { id: "09-15", number: "9.15", title: "Recognizing Incompatibility and Serious Red Flags" },
      { id: "09-16", number: "9.16", title: "Maintaining a Relationship Through Changing Circumstances" },
      { id: "09-17", number: "9.17", title: "Making Decisions About Long-Term Commitment" },
    ],
  },
  {
    id: "module-10",
    number: "10",
    title: "Your Personal Dating System",
    description:
      "Bring everything together into a practical, sustainable approach to dating. Learn from your experiences, make intentional decisions, build better habits, and create a dating life that fits your personality and goals.",
    lessons: [
      { id: "10-1", number: "10.1", title: "Defining Your Ideal Dating Life" },
      { id: "10-2", number: "10.2", title: "Identifying Your Strengths and Growth Areas" },
      { id: "10-3", number: "10.3", title: "Building a Repeatable Social and Dating Routine" },
      { id: "10-4", number: "10.4", title: "Setting Realistic Dating Goals" },
      { id: "10-5", number: "10.5", title: "Practising Conversation and Social Confidence" },
      { id: "10-6", number: "10.6", title: "Learning From Dates Without Overanalyzing Everything" },
      { id: "10-7", number: "10.7", title: "Recognizing Your Repeating Patterns" },
      { id: "10-8", number: "10.8", title: "Improving Your Approach Through Honest Reflection" },
      { id: "10-9", number: "10.9", title: "Balancing Dating, Work, Friends & Personal Goals" },
      { id: "10-10", number: "10.10", title: "Knowing When to Take a Break From Dating" },
      { id: "10-11", number: "10.11", title: "Creating Your Personal Standards and Boundaries" },
      { id: "10-12", number: "10.12", title: "Building a Sustainable Long-Term Approach to Relationships" },
      { id: "10-13", number: "10.13", title: "Your 30-Day Practical Action Plan" },
      { id: "10-14", number: "10.14", title: "The Complete Dating Playbook: Putting It All Together" },
    ],
  },
];

export const TOTAL_MODULES_COUNT = DATING_PLAYBOOK_MODULES.length;
export const TOTAL_LESSONS_COUNT = DATING_PLAYBOOK_MODULES.reduce(
  (sum, mod) => sum + mod.lessons.length,
  0
);
