import { PlaybookArticle } from "./types";

export const FACELESS_SHORTS_30K_ARTICLE: PlaybookArticle = {
  slug: "the-30k-month-al-faceless-shorts-method-nobodys-talking-about",
  title: "The $30K/Month AI Faceless Shorts Method Nobody's Talking About",
  readingTime: "25 min read",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793019211/The_30KMonth_Al_Faceless_Shorts_Method_Nobody_s_Talking_About.png",
  publishedDate: "2026",
  authorName: "Seiji Kai-Lun",
  authorTitle: "YouTube Shorts Systems & AI Automation Specialist",
  introParagraphs: [
    "Channels Making $30K/Month with Faceless Shorts",
    "Build a faceless YouTube Shorts channel using Claude for research and ideation, then use a dedicated video tool to assemble ranking videos.",
    "The workflow in this playbook covers choosing a niche, finding channels worth studying, using VidIQ insights with Claude to identify proven topics, building ranking videos in RankReel, and publishing consistently.",
    "The central idea is to build a repeatable content system. Claude helps you understand what is already working and generate ideas from that research. A video creation tool handles much of the editing and assembly. Your job is to choose good topics, select suitable clips, shape the ranking, review the finished video, and publish on a reliable schedule.",
    "The examples below focus on ranking-style Shorts. The revenue figures mentioned in the source material are estimates and illustrations, not typical outcomes or guarantees. A channel's actual performance depends on its audience, content quality, eligibility for monetization, qualified views, geography, and other factors."
  ],
  chapters: [
    {
      id: "chapter-1",
      number: 1,
      title: "Why Faceless Shorts Are Worth Exploring",
      paragraphs: [
        "Faceless YouTube channels do not require you to appear on camera, maintain a studio, or film every video yourself. A ranking channel can be built around short clips, a clear theme, concise labels, and an intentional order.",
        "The model becomes more manageable when you separate the work into a few repeatable stages:\n1. Research channels and identify formats that already attract viewers.\n2. Use Claude to analyse successful videos and generate related ideas.\n3. Find suitable clips for the chosen topic.\n4. Assemble and edit the video in RankReel.\n5. Publish consistently and study the results.",
        "The opportunity is not that every faceless channel automatically earns money. It is that a focused format can make production more systematic, allowing a small creator to publish without filming an entirely new video from scratch every time.",
        "### Understanding the opportunity",
        "The video uses two types of information to explain why the creator believes this is a promising format:\n- Interest in YouTube automation: Google Trends data is used to illustrate changes in search interest over time. The creator's argument is that fewer people searching for YouTube automation could mean less competition from new entrants.\n- Shorts revenue per thousand views: RPM is the amount earned per thousand eligible views. The creator points to higher US Shorts RPM estimates as another reason the model may be attractive.",
        "These figures should be treated as a snapshot of the market at the time they were discussed. Search interest does not directly measure competition between channels, and a decline in searches does not prove that a niche is easier to enter. Shorts RPM also varies and not every view qualifies for monetization.",
        "### How the revenue calculation works",
        "Use qualified views rather than total views when estimating potential Shorts revenue.\n\nFor example, the video gives an illustrative calculation:\n- Total views: 14 million\n- Assumed qualified views: approximately 7 million\n- Illustrative RPM: $0.40 per 1,000 qualified views\n\nThe calculation is:\n7,000,000 ÷ 1,000 × $0.40 = $2,800\n\nThis produces an estimated $2,800 for that example. It is not a promise of what a video will earn. Actual revenue can be materially different depending on eligibility, audience location, monetization rules, and the RPM the channel receives.",
        "### Where Claude fits into the workflow",
        "Claude can help with the research-heavy parts of running a channel:\n- Analysing successful channels.\n- Identifying the topics and formats behind their strongest videos.\n- Generating new video ideas based on that evidence.\n- Organising research into a report you can use.\n- Reducing the time spent deciding what to make next.",
        "A separate video tool can then help assemble the clips into a finished vertical video. The aim is to use AI to make the process more efficient while keeping editorial decisions in your hands."
      ]
    },
    {
      id: "chapter-2",
      number: 2,
      title: "Choose a Ranking-Style Niche",
      paragraphs: [
        "The niche you choose determines the audience, the topics you can cover, and the kinds of clips you need to find. A weak or overly broad niche makes it harder to develop a recognisable channel. A focused format gives viewers a clearer reason to watch.",
        "The example recommended in the video is ranking videos.",
        "A ranking Short brings together several clips around one theme and places them in an order. The ranking can be based on humour, skill, surprise, intensity, creativity, or another clear criterion.",
        "Examples include:\n- Funniest football moments.\n- Most unbelievable near-miss driving moments.\n- Most satisfying moments.\n- Wildest sports moments.\n- Funniest unexpected reactions.",
        "The format is simple to understand: viewers know what is being ranked, each clip gives them another reason to keep watching, and the final position creates an endpoint they may want to see.",
        "### Why ranking videos are a useful starting format",
        "Ranking videos have a repeatable structure. You do not need to invent a completely new format for every upload. Once you establish the style, each new video can follow the same production process while exploring a different topic.",
        "The channels discussed in the source video demonstrate how ranking content can attract large audiences. One example focuses on funny football moments, while other examples cover different themes. These channels are useful as references for format and execution, not as proof that copying their results will produce the same outcome.",
        "### Build a collection of inspiration channels",
        "Before making videos, find several established or fast-growing channels in the ranking format.\n\nUse YouTube Shorts to discover them:\n1. Search for a ranking topic that interests you.\n2. Open channels publishing videos in that format.\n3. Review their recent uploads and identify recurring themes.\n4. Pay attention to videos that have significantly more views than the channel's usual uploads.\n5. Save the channels that consistently publish ideas you can learn from.",
        "Start with three to five inspiration channels. You can expand the list as you discover more examples.",
        "Spend time studying their content rather than only looking at subscriber counts. Notice:\n- Which topics they choose.\n- How they phrase their video titles.\n- How many clips they include.\n- How they label individual clips.\n- How they arrange the ranking.\n- How long their videos are.\n- Whether certain themes repeatedly outperform others.",
        "Engaging with ranking content on YouTube can also help train your recommendations feed to surface more channels in the same format. Watch relevant Shorts and interact naturally with videos you genuinely find useful. This can make further research easier.",
        "### Do not copy a channel blindly",
        "An inspiration channel is a source of evidence about what viewers respond to. It is not a template to duplicate word for word.",
        "Look for the underlying idea behind a successful upload. A video about funny football moments, for example, may suggest other ways to explore football humour, surprising mistakes, unbelievable saves, or unexpected reactions.",
        "Use the format as a starting point, then develop your own topic choices, editorial angle, clip selection, and ranking."
      ]
    },
    {
      id: "chapter-3",
      number: 3,
      title: "Set Up Claude and the Free VidIQ Extension",
      paragraphs: [
        "Claude will be used to analyse inspiration channels and generate video ideas from their performance data. To connect that research workflow, install the VidIQ Chrome extension and link its YouTube insights feature to Claude.",
        "### Step 1: Install VidIQ",
        "Follow these steps to set up the browser extension:\n1. Open Google and search for VidIQ Chrome extension.\n2. Find the VidIQ extension for YouTube and Instagram.\n3. Add the extension to your Chrome browser.\n4. Open Claude and create an account if you do not already have one.\n5. Refresh Claude after installing the extension.\n\nThe extension should become available within Claude once the integration is recognised.",
        "### Step 2: Connect YouTube insights",
        "Link your channel insights into Claude:\n1. Open the VidIQ dropdown inside Claude.\n2. Select Connect YouTube Insights.\n3. Follow the connection flow to the authorisation page.\n4. Authorise the connection.\n5. Return to Claude and check the VidIQ dropdown to confirm that it is connected.",
        "Once connected, Claude can use the available VidIQ integration to retrieve channel insights for your research.",
        "Software interfaces and integration options can change. If the labels differ, look for the equivalent VidIQ connection or YouTube insights option."
      ]
    },
    {
      id: "chapter-4",
      number: 4,
      title: "Find Proven Video Ideas with Claude",
      paragraphs: [
        "The goal of channel research is to understand what has already worked for a specific audience. Instead of brainstorming topics without evidence, use a channel's strongest videos as the starting point for your own ideas.",
        "### Step 1: Choose an inspiration channel",
        "Select one of the ranking channels you collected in Chapter 2.\n\nA useful channel to study should have a clear format and enough successful uploads to reveal patterns. A newer channel that consistently receives strong view counts can be particularly interesting because its recent performance may offer clues about topics that are currently resonating.\n\nDo not choose a channel based on one viral upload alone. Look for repeated performance across multiple videos.",
        "### Step 2: Copy the channel ID",
        "Open the selected channel on YouTube:\n1. Open the channel's More menu.\n2. Select Share channel.\n3. Choose Copy channel ID.\n\nKeep the channel ID available because you will use it in Claude's VidIQ competitor breakdown.",
        "### Step 3: Run a competitor breakdown",
        "In Claude:\n1. Start a conversation or open the chat you want to use for research.\n2. Select the + control.\n3. Open Connectors.\n4. Choose the VidIQ option for Claude.\n5. Select Competitor Breakdown.\n6. Paste the channel ID you copied from YouTube.\n7. Add the generated prompt to the conversation and send it.",
        "Claude will use the connected VidIQ capability to analyse the channel. Depending on the permissions requested, approve the access needed for the analysis to proceed. Review permission requests rather than automatically granting access you do not understand.\n\nAllow the analysis to finish before asking for ideas. The time required will vary.",
        "### Step 4: Understand the research report",
        "The breakdown can provide a structured view of the channel, including its top-performing videos, channel metrics, and growth over time.\n\nUse the report to identify patterns such as:\n- Topics that appear repeatedly among the strongest videos.\n- Formats that generate unusually high view counts.\n- Themes that perform well across multiple uploads.\n- How the channel's performance has changed over time.\n- Which successful topics could lead to related ideas.",
        "The purpose is not simply to collect a list of popular videos. It is to understand why certain topics may have worked and what kinds of ideas are worth exploring.",
        "### Step 5: Ask Claude for video topics",
        "Once the breakdown is available, continue in the same Claude conversation. The channel research gives Claude context for generating ideas based on the actual examples it has analysed.\n\nUse this prompt:",
        "Based on the competitor breakdown and the channel's best-performing videos, generate a list of original ranking-video topics for my channel. Prioritise topics that reflect the patterns behind the channel's strongest uploads. Focus on specific, interesting ideas with a clear ranking angle. Avoid generic suggestions and explain briefly why each topic is worth considering.",
        "Review the suggestions and select a topic you genuinely want to make.\n\nThe source video's example is a ranking video about the most insane near-miss driving moments. Other examples include ranking funny football moments. The important principle is to build your idea list from evidence gathered during competitor research.",
        "### Step 6: Choose the topic with the strongest potential",
        "Before moving into production, check each idea against a few practical questions:\n- Is the topic immediately understandable?\n- Can you find enough suitable clips for it?\n- Does it give viewers a reason to stay until the final ranking?\n- Can you make the ranking feel distinct rather than assembling unrelated clips?\n- Does the idea fit the audience you want the channel to attract?",
        "Choose one topic and move into production. Repeat the research process whenever you need a fresh batch of ideas."
      ]
    },
    {
      id: "chapter-5",
      number: 5,
      title: "Create the Ranking Video in RankReel",
      paragraphs: [
        "RankReel is the video creation tool used in the source workflow. It is designed around ranking videos: you enter a title, add clips to ranking slots, name each clip, choose the playback order, and generate a vertical video.\n\nThe production process has five main parts:\n1. Create the title.\n2. Find suitable clips.\n3. Add and label each clip.\n4. Arrange the ranking.\n5. Generate and review the video.",
        "### Step 1: Enter your video topic",
        "Open RankReel and create a new ranking video.\n\nEnter the topic you selected from Claude. For the example in this playbook, use:\n\n**Ranking Best Football Moments**\n\nThe title should communicate the subject immediately. A viewer scrolling through Shorts should be able to understand what the video is about without having to interpret a long sentence.",
        "### Step 2: Format the title in two lines",
        "A useful title treatment for this format is two lines of text.\n\nAvoid making the title a single long line or splitting it into too many fragments. The two-line layout creates a clear visual structure and gives you room to emphasise the most important words.\n\nFor example:\n\n**Ranking Best**\n**Football Moments**\n\nThe exact wording can change to suit your topic. The goal is to make the subject instantly recognisable.",
        "### Step 3: Highlight the important keywords",
        "Use colour to distinguish the words that communicate the topic.\n\nIn the football example, Football Moments carries more information than the word Best. Emphasise the subject rather than colouring every word.\n\nA restrained accent colour such as teal can make the key phrase stand out. Keep the treatment consistent and readable.\n\nThe title should answer one question immediately: what is this Short ranking?",
        "### Step 4: Find clips for your ranking",
        "TikTok is the discovery source recommended in the video because its search feature can surface popular clips around a specific topic:\n1. Open TikTok.\n2. Search for the topic of your ranking video.\n3. Review the results and look for clips that are already attracting substantial engagement.\n4. Open promising clips and assess whether they actually fit your ranking.\n5. Collect enough suitable clips to build a coherent video.",
        "The source recommends prioritising clips that have already demonstrated strong audience interest rather than choosing clips with only a few hundred likes.",
        "However, popularity alone is not enough. A clip must also fit the video's theme and make sense within the ranking. Use material you have the right to use, and do not assume that a publicly available TikTok video is automatically free to reuse on YouTube. Where necessary, obtain permission or use appropriately licensed material.",
        "### Step 5: Add clips to RankReel",
        "Once you have selected your clips:\n1. Download or otherwise obtain the clips you are authorised to use.\n2. Return to RankReel.\n3. Add the first clip to the appropriate ranking slot.\n4. Repeat the process for the remaining clips.",
        "RankReel places each clip into the video structure. You can then give each one a short label so viewers understand what they are watching.\n\nFor example, a clip showing an amusing moment could be labelled Instant Karma. Keep labels short, specific, and easy to read.\n\nAvoid vague labels that do not help viewers understand the moment.",
        "### Step 6: Use the right number of clips",
        "The source recommends keeping ranking videos in the range of five to seven clips, with approximately six as a useful starting point.\n\nThere is a balance:\n- Too many clips can make the video feel crowded and may reduce the chance that viewers finish it.\n- Too few clips can leave the video feeling underdeveloped and limit the progression of the ranking.\n\nUse five to seven clips as a starting guideline, not a fixed rule. The right number depends on the topic, clip length, and pacing. Every clip should contribute something meaningful.",
        "### Step 7: Arrange a custom playback order",
        "The order in which clips appear can influence how long viewers stay.\n\nA predictable countdown that moves neatly from the lowest position to the highest can become repetitive. The source recommends using a shuffled playback order so the ranking jumps between positions rather than following a simple descending sequence.\n\nFor example, instead of showing positions in a predictable order, you might introduce number two, move to number six, then number four, before building toward number one.",
        "In RankReel:\n1. Enable Custom Playback Order.\n2. Use the shuffle option to create an initial arrangement.\n3. Review the sequence.\n4. Drag clips manually if you want to change the order.\n5. Keep the strongest or most anticipated entry for the end.",
        "The purpose is to create curiosity. Viewers should have a reason to keep watching because they do not know which clip is coming next.\n\nDo not let random shuffling replace editorial judgement. Make sure the sequence feels intentional and that the final position delivers a satisfying payoff.",
        "### Step 8: Generate the video",
        "After the title, clips, labels, and playback order are ready:\n1. Review the complete ranking.\n2. Check that every clip is assigned to the correct position.\n3. Confirm that labels are readable.\n4. Check the playback order.\n5. Select Generate Video.\n\nRankReel will assemble the clips into a vertical ranking video.\n\nBefore publishing, watch the finished video from beginning to end. Check the pacing, transitions, title readability, clip quality, and whether the ranking makes sense. Fix anything that feels confusing or unfinished."
      ]
    },
    {
      id: "chapter-6",
      number: 6,
      title: "The Posting Strategy",
      paragraphs: [
        "A repeatable production system only becomes useful when you publish consistently. The source recommends posting one to two Shorts every day.\n\nThe channels used as examples publish frequently, often with one or two uploads per day. Their consistency is presented as an important part of their strategy.",
        "### Build a schedule you can maintain",
        "Use the following workflow to make daily publishing manageable:\n1. Research several topics in one session.\n2. Build a list of ideas worth producing.\n3. Collect suitable clips for each selected topic.\n4. Assemble the videos in RankReel.\n5. Review and prepare the finished Shorts.\n6. Publish one or two videos each day when you can maintain that pace.\n\nBatching the work can reduce the pressure of creating a new idea and producing a complete video every single day.",
        "### Prioritise consistency without sacrificing quality",
        "The source strongly emphasises avoiding gaps in your upload schedule. The practical lesson is to establish a publishing rhythm and stick to it.\n\nHowever, consistency does not mean uploading unfinished or low-quality videos just to meet a target. A sustainable schedule is more useful than an aggressive schedule that you cannot maintain.\n\nKeep an eye on your own channel's performance. Review which topics attract viewers, which videos hold attention, and which formats are worth repeating. Use those observations to improve your next batch of ideas.",
        "### Repeat the research-to-publishing cycle",
        "The complete workflow is:\n1. Find ranking channels worth studying.\n2. Connect VidIQ to Claude.\n3. Run competitor breakdowns.\n4. Ask Claude for topic ideas based on successful videos.\n5. Choose a topic.\n6. Find suitable clips.\n7. Build the ranking in RankReel.\n8. Review the finished Short.\n9. Publish consistently.\n10. Use your own results to guide the next round of research.\n\nOver time, this gives you a repeatable system for planning and producing content instead of relying on random inspiration every day."
      ]
    },
    {
      id: "chapter-7",
      number: 7,
      title: "Final Checklist",
      paragraphs: [
        "Use this checklist before starting and whenever you prepare a new Short.",
        "### Channel research",
        "- [ ] Choose a focused ranking format.\n- [ ] Find three to five inspiration channels.\n- [ ] Study their most successful uploads.\n- [ ] Look for recurring topics and formats.",
        "### Claude and VidIQ",
        "- [ ] Install the VidIQ Chrome extension.\n- [ ] Connect YouTube Insights to Claude.\n- [ ] Copy an inspiration channel's ID.\n- [ ] Run a competitor breakdown.\n- [ ] Ask Claude for original ranking topics based on the report.\n- [ ] Select a topic with enough suitable material.",
        "### Video production",
        "- [ ] Enter a clear two-line title.\n- [ ] Highlight the most important keywords.\n- [ ] Find relevant, high-interest clips.\n- [ ] Confirm you have permission or appropriate rights to use each clip.\n- [ ] Add five to seven clips as a starting point.\n- [ ] Give each clip a short, descriptive label.\n- [ ] Set a custom playback order.\n- [ ] Keep the strongest entry for the end.\n- [ ] Generate and review the finished video.",
        "### Publishing",
        "- [ ] Set a realistic schedule.\n- [ ] Aim for one to two Shorts per day if you can sustain it.\n- [ ] Review your channel's performance.\n- [ ] Use the results to improve future topics and videos.",
        "The system is straightforward: research what works, use Claude to turn that research into ideas, assemble the videos efficiently, and publish on a schedule you can maintain. The tools can reduce the workload, but the quality of your topic selection, clip choices, editing decisions, and consistency will still determine how well the channel develops."
      ]
    }
  ]
};
