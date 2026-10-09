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
      "Understand how attraction develops, why romantic interest differs between people, and how physical attraction, personality, emotional connection, and compatibility interact.",
    lessons: [
      { id: "01-1", number: "1.1", title: "The Anatomy of Romantic Attraction" },
      { id: "01-2", number: "1.2", title: "Physical Attraction, Personality & Emotional Connection" },
      { id: "01-3", number: "1.3", title: "First Impressions and the Formation of Interest" },
      { id: "01-4", number: "1.4", title: "Confidence, Competence & Social Presence" },
      { id: "01-5", number: "1.5", title: "The Difference Between Attraction, Chemistry & Compatibility" },
      { id: "01-6", number: "1.6", title: "Familiarity, Proximity and the Psychology of Interest" },
      { id: "01-7", number: "1.7", title: "Attraction Myths, Individual Preferences & Human Complexity" },
    ],
  },
  {
    id: "module-02",
    number: "02",
    title: "Becoming the Man",
    description:
      "Build the personal foundation for a fulfilling dating life through appearance, lifestyle, self-respect, emotional stability, and an identity that does not depend on romantic validation.",
    lessons: [
      { id: "02-1", number: "2.1", title: "Appearance, Grooming & Personal Presentation" },
      { id: "02-2", number: "2.2", title: "Fitness, Health, Energy & Lifestyle" },
      { id: "02-3", number: "2.3", title: "Building a Life That Makes You Interesting" },
      { id: "02-4", number: "2.4", title: "Self-Respect, Standards & Personal Boundaries" },
      { id: "02-5", number: "2.5", title: "Confidence Without Arrogance or Performance" },
      { id: "02-6", number: "2.6", title: "Emotional Independence and the Need for Validation" },
      { id: "02-7", number: "2.7", title: "Becoming Comfortable With Who You Are" },
    ],
  },
  {
    id: "module-03",
    number: "03",
    title: "Social Confidence & Charisma",
    description:
      "Learn to navigate social environments naturally, communicate with confidence, read social cues, and become comfortable initiating interactions.",
    lessons: [
      { id: "03-1", number: "3.1", title: "Overcoming Social Hesitation and Approach Anxiety" },
      { id: "03-2", number: "3.2", title: "Body Language, Eye Contact & Vocal Presence" },
      { id: "03-3", number: "3.3", title: "Starting Conversations Without Forced Openers" },
      { id: "03-4", number: "3.4", title: "Reading Social Cues and Conversational Energy" },
      { id: "03-5", number: "3.5", title: "Humor, Playfulness & Making Interactions Enjoyable" },
      { id: "03-6", number: "3.6", title: "Listening, Curiosity & Making People Feel Understood" },
      { id: "03-7", number: "3.7", title: "Developing Social Confidence Through Real-World Practice" },
    ],
  },
  {
    id: "module-04",
    number: "04",
    title: "Flirting, Chemistry & Romantic Tension",
    description:
      "Move beyond friendly conversation and understand how to communicate romantic interest while respecting the other person's comfort and boundaries.",
    lessons: [
      { id: "04-1", number: "4.1", title: "Recognizing the Difference Between Friendly and Romantic Interest" },
      { id: "04-2", number: "4.2", title: "Communicating Intent Without Being Overbearing" },
      { id: "04-3", number: "4.3", title: "Playful Teasing, Banter & Shared Humor" },
      { id: "04-4", number: "4.4", title: "Compliments That Feel Genuine and Specific" },
      { id: "04-5", number: "4.5", title: "Building Chemistry Through Conversation and Shared Experiences" },
      { id: "04-6", number: "4.6", title: "Reciprocity, Escalation & Recognizing Mutual Interest" },
      { id: "04-7", number: "4.7", title: "Consent, Boundaries & Knowing When to Slow Down" },
    ],
  },
  {
    id: "module-05",
    number: "05",
    title: "Meeting Women & Creating Opportunities",
    description:
      "Build practical ways to meet compatible women in everyday life, social circles, events, and dating apps without treating every interaction as a performance or every woman as a target.",
    lessons: [
      { id: "05-1", number: "5.1", title: "Expanding Your Social Circle and Opportunities to Meet" },
      { id: "05-2", number: "5.2", title: "Meeting Women Through Friends, Hobbies & Events" },
      { id: "05-3", number: "5.3", title: "Approaching in Different Social Contexts" },
      { id: "05-4", number: "5.4", title: "Dating Apps: Profiles, Photos & First Impressions" },
      { id: "05-5", number: "5.5", title: "Writing a Dating Profile That Reflects Your Real Life" },
      { id: "05-6", number: "5.6", title: "Moving From an Online Match to a Real Conversation" },
      { id: "05-7", number: "5.7", title: "Creating More Opportunities Without Making Dating Your Entire Life" },
    ],
  },
  {
    id: "module-06",
    number: "06",
    title: "Texting & Setting Up Dates",
    description:
      "Use messaging to establish a connection, communicate clearly, and arrange enjoyable dates instead of getting trapped in endless texting or overanalyzing every reply.",
    lessons: [
      { id: "06-1", number: "6.1", title: "The Purpose of Texting in Modern Dating" },
      { id: "06-2", number: "6.2", title: "Starting Conversations After Meeting or Matching" },
      { id: "06-3", number: "6.3", title: "Conversational Rhythm, Playfulness & Genuine Interest" },
      { id: "06-4", number: "6.4", title: "Texting Frequency, Response Times & Avoiding Overanalysis" },
      { id: "06-5", number: "6.5", title: "Showing Interest Without Chasing Constant Reassurance" },
      { id: "06-6", number: "6.6", title: "Asking Her Out Clearly and Making Concrete Plans" },
      { id: "06-7", number: "6.7", title: "Handling Slow Replies, Uncertainty and Unanswered Messages" },
    ],
  },
  {
    id: "module-07",
    number: "07",
    title: "The Art of the Date",
    description:
      "Turn the principles of attraction and communication into real dating experiences, from planning the first date to building connection, expressing romantic interest, and deciding what comes next.",
    lessons: [
      { id: "07-1", number: "7.1", title: "Planning a Date That Encourages Real Connection" },
      { id: "07-2", number: "7.2", title: "First-Date Conversation Without Interview Mode" },
      { id: "07-3", number: "7.3", title: "Balancing Humor, Vulnerability & Romantic Interest" },
      { id: "07-4", number: "7.4", title: "Reading Mutual Engagement During a Date" },
      { id: "07-5", number: "7.5", title: "Managing Nervousness, Awkward Pauses & Uncertainty" },
      { id: "07-6", number: "7.6", title: "Physical Intimacy, Consent & Respecting the Pace" },
      { id: "07-7", number: "7.7", title: "Ending the Date and Communicating What Comes Next" },
    ],
  },
  {
    id: "module-08",
    number: "08",
    title: "Rejection, Setbacks & Emotional Resilience",
    description:
      "Handle romantic uncertainty, disappointment, rejection, and unreciprocated interest without resentment, manipulation, or losing confidence in yourself.",
    lessons: [
      { id: "08-1", number: "8.1", title: "Understanding Rejection Without Making It Your Identity" },
      { id: "08-2", number: "8.2", title: "Responding to Disinterest With Dignity" },
      { id: "08-3", number: "8.3", title: "Recognizing Mixed Signals Without Inventing Certainty" },
      { id: "08-4", number: "8.4", title: "Handling Ghosting, Cancellations & Unreturned Interest" },
      { id: "08-5", number: "8.5", title: "Managing Jealousy, Insecurity & Comparison" },
      { id: "08-6", number: "8.6", title: "Learning From Dating Experiences Without Obsessing Over Them" },
      { id: "08-7", number: "8.7", title: "Building Resilience While Staying Open to Connection" },
    ],
  },
  {
    id: "module-09",
    number: "09",
    title: "Choosing the Right Woman",
    description:
      "Move beyond attracting interest to recognizing compatibility, assessing character, establishing healthy standards, and making informed decisions about whom to pursue.",
    lessons: [
      { id: "09-1", number: "9.1", title: "Chemistry Versus Long-Term Compatibility" },
      { id: "09-2", number: "9.2", title: "Values, Lifestyle, Ambition & Relationship Expectations" },
      { id: "09-3", number: "9.3", title: "Emotional Availability, Consistency & Reciprocal Effort" },
      { id: "09-4", number: "9.4", title: "Green Flags, Red Flags & Patterns Worth Noticing" },
      { id: "09-5", number: "9.5", title: "Boundaries, Conflict Styles & Respect" },
      { id: "09-6", number: "9.6", title: "Recognizing Unhealthy Dynamics Without Overdiagnosing People" },
      { id: "09-7", number: "9.7", title: "Choosing Someone Who Is Right for You, Not Just Attractive to You" },
    ],
  },
  {
    id: "module-10",
    number: "10",
    title: "Building a Relationship That Lasts",
    description:
      "Apply everything learned to create and maintain a healthy romantic relationship through honest communication, trust, emotional intimacy, conflict resolution, and shared commitment.",
    lessons: [
      { id: "10-1", number: "10.1", title: "Moving From Dating to an Exclusive Relationship" },
      { id: "10-2", number: "10.2", title: "Honest Communication, Needs & Expectations" },
      { id: "10-3", number: "10.3", title: "Emotional Intimacy, Trust & Vulnerability" },
      { id: "10-4", number: "10.4", title: "Conflict Resolution, Repair & Accountability" },
      { id: "10-5", number: "10.5", title: "Maintaining Attraction, Affection & Individual Identity" },
      { id: "10-6", number: "10.6", title: "Building a Relationship That Fits Both People's Lives" },
    ],
  },
];

export const TOTAL_MODULES_COUNT = DATING_PLAYBOOK_MODULES.length;
export const TOTAL_LESSONS_COUNT = DATING_PLAYBOOK_MODULES.reduce(
  (sum, mod) => sum + mod.lessons.length,
  0
);
