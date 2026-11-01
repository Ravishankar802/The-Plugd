import { PlaybookArticle } from "./types";

export const HOW_TO_BUILD_10K_WEBSITES_ARTICLE: PlaybookArticle = {
  slug: "how-to-build-10k-websites-in-minutes-claude-ai",
  title: "How to Build $10K Websites in Minutes (Claude AI)",
  readingTime: "25 min read",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793015288/How_to_Build_10K_Websites_in_Minutes_Claude_AI.png",
  publishedDate: "2026",
  authorName: "Caleb Sterling",
  authorTitle: "Principal Sovereign Operator & Systems Architect",
  introParagraphs: [
    "In this Playbook, I'm going to tell you how to build a $10,000 website using Claude Code.",
    "First install Claude Code, level it up with two design skills, write one prompt, polish the result, and put it on a real domain.",
    "The site is going to look like the work of a freelance developer charging $10,000 and nobody who visits it is going to know an AI made it.",
    "Read the playbook till the end, especially chapter seven. That's where the cursor effects and motion design take the build from professional to expensive.",
    "And by the very end, I'll tell you the cheapest way to put it live on the internet at a custom domain, but first, what exactly is Claude Code?"
  ],
  chapters: [
    {
      id: "chapter-1",
      number: 1,
      title: "What is Claude Code, and what is a $10K website?",
      paragraphs: [
        "Claude Code is an AI coding assistant. You describe a website to it in natural language and it writes the code for you while you watch.",
        "Use the Claude Code desktop app because it gives you everything you need in one window with no extra developer setup.",
        "Before we build anything, I want to define what a $10,000 website actually looks like.",
        "So I asked Claude, there are eight things that separate a $10,000 website from a $200 one:",
        "1. Point of view\n2. Typography\n3. Colour\n4. Hierarchy\n5. Imagery\n6. Motion\n7. Mobile\n8. Invisible stuff that makes a site feel fast and finished.",
        "Those eight items fall into three groups: Taste, Substance, and Felt quality. We're hitting all eight.",
        "Here's why Claude Code can hit a $10,000 bar and why most no-code website builders can't.",
        "When you use a tool like Wix or Squarespace, you start with a template and whatever you build ends up looking like every other site that started from that template.",
        "Claude Code doesn't work that way. It writes the code for your site from scratch based on what you describe, so you can get a completely custom result without ever having to learn to code yourself.",
        "On top of that, Claude can install design skills that level up everything it makes. You can drop in pre-made components from libraries online, the kind of things that used to require a real developer, and you can keep iterating with Claude on every detail until the site actually feels expensive.",
        "We're going to learn all of that. The first step is getting Claude Code set up on your computer."
      ]
    },
    {
      id: "chapter-2",
      number: 2,
      title: "Setup",
      paragraphs: [
        "Go to claude.com and pick the pro plan. It's only $20 per month and that's going to cover everything.",
        "Get yourself signed up and I'll skip past the boring stuff.",
        "Once you're logged in, in the bottom left corner of the page, click the download icon, navigate to the Claude Code section, download the desktop app version, then open the file to run the installer.",
        "Once you get it installed, open the desktop app, then sign in.",
        "At this point I need to mention, depending on when you read this playbook, the actual software interface might look different for you than it does for me when I wrote this playbook.",
        "Claude gets updated regularly, so if things don't look the exact same, don't panic. Just try to understand the general concepts I'm explaining and apply them to how the software looks when you're using it.",
        "When you get signed in, switch from chat mode to code mode. That tab is available in the upper left. Alternatively, you can also press Command 3 on your keyboard on a Mac or Ctrl 3 on Windows to switch to code mode.",
        "Claude Code works best when it has its own folder to live in. Create one anywhere on your computer, then click the folder select button near the chat box and select your new folder to open it inside the app. That folder is going to be your workspace for this project from now on.",
        "Alright, that's the setup done."
      ]
    },
    {
      id: "chapter-3",
      number: 3,
      title: "Adding the Skills",
      paragraphs: [
        "Now we're going to level Claude up by installing two skills.",
        "Out of the box, Claude is a general purpose AI, it knows a lot about a lot of things, but its default design output is just okay. It tends to reach for the same fonts, the same colours, and the same predictable layouts you've seen on every other AI-generated website. This is why a lot of AI websites end up looking generic.",
        "Skills fix that. A skill is like an instruction manual for Claude, a text file that levels up Claude's knowledge in one specific area. You install it once and Claude uses it forever. We're installing two skills today and both of them are free.",
        "The first skill we're installing is called Front End Design. It's built by Anthropic, the company behind Claude. It runs in the background and it quietly makes Claude smarter at design. What it actually does is ban the most overused fonts on the internet and push Claude toward bold design direction instead of generic AI output.",
        "To install it, grab this [Front End Design skill repository](https://github.com/anthropics/skills/tree/main/skills/frontend-design) and paste it into Claude Code with the message: \"Install this skill\", then send the message and let it run. Allow the edits when it asks and install it globally.",
        "The second skill is community built. It's called UI UX Pro Max. It ships with 57 UI styles, 95 colour palettes and 56 font pairings. Unlike the first skill, this one we call directly when we want a big design intervention, and that's exactly how we're going to build our site today.",
        "To install it, grab this [UI UX Pro Max skill repository](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) and paste it into Claude Code with the message: \"Instal this plugin using NPM.\" That exact phrasing matters because it's what gets it to install cleanly, using the terminal. Allow the edits when it asks and install it globally.",
        "Now there's one last setup move before we start building. Click the mode selector in the bottom left under your chat and switch it to auto mode. This lets Claude work without stopping to ask for permission at every step. With mode on and both skills installed, we're ready to write the prompt that builds the site."
      ]
    },
    {
      id: "chapter-4",
      number: 4,
      title: "References + The Build Prompt",
      paragraphs: [
        "There's one more thing worth talking about first. The other big thing that separates a great result from a mediocre one is the brief you give Claude. The more specific you are, the better the result.",
        "If you already know exactly what you want, you can just describe it, but describing visual taste in words is hard, especially if you're newer to design. You don't speak the design language yet and that makes it tough to tell Claude what you want.",
        "If you're in that spot, references are your shortcut. References are just screenshots of sites you like that you give to Claude so it can match the visual style. It's a lot easier to show Claude what you want than to describe it.",
        "References are also useful for refining your own direction before you commit. You scroll, you find things you like and you start to understand what your taste actually is. And you can always just search Pinterest for the kind of site you want to build. It pulls examples from everywhere. Here I searched for modern website design restaurant. Find three to five sites you like and save screenshots of them. You're not copying these sites. Instead, you're showing Claude what you like and how you want your own design to end up.",
        "For my build, I'm creating a website for a restaurant in Seattle. Here is the exact prompt I used:",
        "/ui-ux-pro-max Build a website worth $10k for a steakhouse in Seattle, Washington. It should include elegant animations that load well on any device. Ask me any clarifying questions you need before building.",
        "This is the whole prompt in a single sentence. /ui-ux-pro-max is how we call the design skill we just installed. Then we type out the brief for the AI.",
        "The trick to making this work is this last line: \"Ask me clarifying questions.\" That's the line that makes Claude stop and think before it starts building.",
        "Here Claude comes back with seven questions. They cover the restaurant name, the style direction, which sections we want, who's writing the content, the tech stack, the animation level, and anything else we wanna specify.",
        "And here's the part that really matters: Claude offers three style directions to choose from: a Manhattan steakhouse with dark moody energy, a Pacific Northwest modern look, or a classic old school chophouse. It's giving you the menu of style options. I picked dark moody luxury, but with Pacific Northwest grounding so it doesn't look like a Manhattan steakhouse.",
        "Five sections total, no gallery, no booking system, just a single page that scrolls all the way through. This is the most important moment in the entire build. The answers you give here become the entire site. The more specific you are at this stage, the less you'll have to fight Claude later to make revisions. Really take your time to answer the questions thoughtfully.",
        "Then send to watch the magic begin. Now, Claude reads the brief and it takes about three minutes before it writes a single line of code. Then it spends another four or five minutes or so actually building. So I'll skip ahead to the fun part: the reveal."
      ]
    },
    {
      id: "chapter-5",
      number: 5,
      title: "First Reveal",
      paragraphs: [
        "And there it is. This is already better than most AI website demos I've seen and we haven't even started polishing yet.",
        "So how does this stack up against our $10,000 website checklist?",
        "Let's start with point of view. Look at the brief we gave Claude. We had a real direction in mind when we answered its questions, not just a mood board.",
        "Then there's typography. Claude picked Fraunces for the headlines and Inter for the body. Now we'll swap out Inter later because it's one of the most overused AI fonts on the internet right now.",
        "For colour, Claude landed on five hex values: near black, warm cream, oxblood, brass, and slate. There are no rainbow palettes here. Restraint with colour is what signals quality.",
        "Then there's hierarchy. Look at how this section is laid out. The city name is huge, the address is medium sized and the room description is small. That's not random sizing. It's telling your eye what to read first, second, and third. Without that, a site feels flat and hard to scan. Dry-Aged Ribeye, 16 ounce, 60-day, hearth-fired. That's not generic AI text. That's restaurant copy that reads like a real chef wrote it. We're going to come back to this in chapter seven.",
        "Alright, that's four boxes checked. We've still got four to go, and the next ones are going to need a bit more work."
      ]
    },
    {
      id: "chapter-6",
      number: 6,
      title: "Imagery + Premade Components",
      paragraphs: [
        "Number five on the checklist is imagery. This is one pillar Claude can't fully solve on its own. You're going to have to bring some assets yourself. The best thing you can have on a premium website is custom photography or custom graphics, work that's been shot or designed specifically for your brand. If you've got that, great, drop it into your project folder and you're set. Just tell Claude what and where it is and what to do with it.",
        "But many people don't have a professional photoshoot budget. So the next best thing is AI image and video generation. The tools are good enough now that used right, nobody can tell the difference.",
        "For a single image, ChatGPT is the fastest path if you've got a subscription already. Its latest image model is excellent for photoreal work, but there's a catch: ChatGPT can't make video, so if your site needs any kind of animation like the hero scroll effect I'm about to build, ChatGPT alone won't get you there. That's where aggregator tools come in. These tools give you access to every major image and video generation model from one tab. The one I use is [11ElevenLabs](https://elevenlabs.io/?utm_campaign=affiliates-_c3b4c03d5019&utm_medium=affiliates&utm_source=affiliates&pscd=try.elevenlabs.io&ps_partner_key=YzNiNGMwM2Q1MDE5&sid=MHD&ps_xid=8BuM79MTJXKNOe&gsxid=8BuM79MTJXKNOe&gspk=YzNiNGMwM2Q1MDE5).",
        "11ElevenLabs is a paid service, but their plans are reasonable, and if you use the [11ElevenLabs 50% discount partner link](https://elevenlabs.io/?utm_campaign=affiliates-_c3b4c03d5019&utm_medium=affiliates&utm_source=affiliates&pscd=try.elevenlabs.io&ps_partner_key=YzNiNGMwM2Q1MDE5&sid=MHD&ps_xid=8BuM79MTJXKNOe&gsxid=8BuM79MTJXKNOe&gspk=YzNiNGMwM2Q1MDE5) you'll get 50% off your first month of the creator plan, which gets you access to everything.",
        "Inside 11ElevenLabs here, I generate an image with ChatGPT's image model. Once that renders, I'll pick one of the four options and then drop that exact image in as the starting frame for Google's Veo 3.1 to turn it into a video. Then once I get the output for that, I'll select one of the options, then upscale the result with Topaz, all without leaving the tab. That's the workflow we're using to create the hero asset for our steakhouse here.",
        "Here's the trick that makes this fast: You don't have to write the image prompt yourself. Claude already knows your project, so you can ask Claude to write the image generation prompt for you. You paste that prompt into your image generator and you get something that matches your brand and your existing design aesthetic on the first try. Once you have your asset, drop it into your project folder and Claude has everything it needs.",
        "Okay, that covers imagery, but what about when you wanna level up visuals on your site that aren't photos or videos? That's where [21st.dev](https://21st.dev) comes in.",
        "21st.dev is a library of pre-made web components, animations, scroll effects, buttons and more, all built by real developers and all free to grab. You can use 21st.dev two ways: you can browse around for visual inspiration if you're not sure what you want to add to your site, or if you find a specific design or element you like, you can copy a prompt that tells Claude exactly how to recreate it in your project.",
        "For our build, I want to build something visually striking for the hero section, a really cool image effect that makes the site feel premium right when someone lands on it. Scrolling through 21st.dev, I find a smooth scroll image component I like, so I'll click the copy prompt button on it, and back in Claude Code I'll paste that prompt in, add the steak video we just generated and tell Claude to use the component to build out the hero.",
        "Now watch what Claude does next. It pushes back. The 21st.dev component I picked is for a system called React. React is a more complex setup than what we're using here. Our project is a simple static site, so Claude says no to dropping in the React component as is, because it would change how our whole project works.",
        "For your project, you might actually want something more complex than what we're doing here, like a dashboard, a checkout flow, or a site with a login. In that case, Claude would say yes to React because it fits your project. The point is that Claude protects the architecture you set up. It doesn't break things just because you asked. For our static site, single file HTML is the right choice, and you'll see why when we deploy in chapter eight.",
        "So Claude rebuilds the hero without React and the first attempt doesn't work. The video shows up on the page, but it isn't scrolling, so I tell Claude what's happening. It finds two bugs and fixes them. The page is still broken though, so I ask Claude to dig deeper. It actually opens the page itself in my browser, inspects what's happening live and finds the real problem.",
        "Three layers in, it works. The lesson here is to keep pushing when something breaks. Just explain what went wrong and what you were expecting instead. Claude can usually solve it, if you give it the chance to look closer. And there it is, a cinematic hero, scroll driven, exactly like we asked for.",
        "Next, we do one more pass on the hero, making the text readable against the bright background image and making the hero reveal its content as the user scrolls. The key thing to know is that you can keep iterating like this until your hero feels right. Once your hero section is locked in, it's time to step back and check yourself against the bigger picture."
      ]
    },
    {
      id: "chapter-7",
      number: 7,
      title: "Polish Pass + Re-evaluating the Checklist",
      paragraphs: [
        "Once you've got the bones of your site in place, you should grade yourself against the original checklist before you keep polishing. This is the move that separates a polished result from a generic one. You set the bar high at the start and now you check yourself against it.",
        "To do this, paste that checklist into Claude and ask: \"Where does this site land against each of these criteria? Be honest.\"",
        "In my case, Claude goes through each one calling out what's strong, what's mixed, and what's missing. For our build, Claude comes back with point of view strong, colour strong, hierarchy strong, and typography mixed, imagery, motion, mobile and the invisible stuff are all mixed. You'll probably get a similar split on your project and that's fine. The point is to know exactly what's left to do.",
        "For the items that need work, don't ask Claude to fix them one at a time. Ask Claude to propose a batch of fixes instead and lead your ask with intent, not specifics.",
        "Here's the exact prompt I use for our build. I tell Claude: \"We need more handcrafted micro interactions. The lower sections feel a bit generic. We don't need to make them busier, just more expensive.\"",
        "Notice what I'm doing there. I'm not telling Claude what to add. I'm telling Claude how I want it to feel. Claude is better at translating intent into specifics than most people are at writing specifications.",
        "Claude comes back with a batch: film grain across the whole site, animated brass hairlines between sections, a glowing ember effect in the Reserve a Table section, word-by-word reveals on the headlines and a few other small details on top. Five small changes in one prompt. I approve them and Claude ships them all at once. There's less back and forth that way. You spend fewer tokens and the result feels more cohesive than if you drip feed Claude one tweak at a time.",
        "Now, here's the move most people skip, and it's the move that does the most work on whether your site feels expensive. Once that batch of edits lands, scroll through your site section by section and find the ones that still feel flat, a little boring. There's always going to be a couple. Claude won't catch them because Claude can't feel your site the way you can.",
        "This pass, you have to drive yourself. For each flat section you give Claude one specific motion or cursor interaction to add, one per section, all of them restrained and subtle. You can ask for something specific, grab something you like from 21st.dev or just ask Claude what makes sense to add.",
        "In our Reserve a Table section, the ember glow from the batch is in, but it's still static. There's no movement, so I tell Claude: \"Make the embers move like fire. Have them react to the cursor as it moves around the page.\" Claude adds a parallax effect on the embers that follows your cursor. Now the fire effect feels alive.",
        "Then I scroll into the story section and it's still flat, so I tell Claude: \"Add some elegant micro movements and cursor interactions here. This section is feeling very static.\" Claude adds a soft candlelight halo that follows the cursor as you read. Its first attempt though is too obvious, so I push back. I say: \"Make it more subtle, more refined.\" Claude adds trailing motion to the halo so it lags a bit behind the cursor. That's the version we'll ship.",
        "Two prompts, two sections. That's all this layer takes, but that layer is the difference between a site that looks expensive and one that feels expensive as visitors navigate the pages. The pattern is to review every section, find the ones that feel flat, ask Claude for one cursor interaction or piece of movement per section and tell Claude to make it more subtle, until the section feels alive without being noisy and obnoxious.",
        "Speaking of polish: copy. The written content on your site is another place where AI tends to fall short by default. AI generated copy usually over explains, uses too many adjectives and tries to sound impressive.",
        "Take a look at this line: \"Six dishes, one fire.\" That's restraint, not adjectives. That's what separates a $10,000 menu from a $200 one. The front end design skill we installed at the start of this playbook is what helps Claude to write copy like this. Restrained sensory writing is one of the things that skill pushes Claude toward, which is another reason it earns its place in every project.",
        "Here's another quick win you can apply to any AI generated site: There's one font called Inter that's so overused on AI generated sites, it instantly screams \"AI made this.\" If you see Inter in your output, ask Claude to swap it out. For our build Claude swaps Inter for a font called Geist. It's a small change, but it makes a real difference to how the site reads.",
        "Item seven on the checklist is mobile that's actually designed, not just shrunk down. By default, Claude makes your site responsive, meaning it'll fit on phones or other small screens, but responsive isn't the same as designed for phones. Phones are going to see your site way more often than desktops will, and if your mobile version is just your desktop version squished smaller, your viewers will feel it.",
        "You have to ask Claude for it specifically. So tell Claude to do a dedicated pass on the mobile version. Tell it to think about what should be hidden on small screens, what should be tighter and what should resize. For our build, the navigation collapses on phones. The word mark gets tighter spacing and the buttons get a smaller variant.",
        "With those polished passes done, all eight checklist items are complete. Your site looks $10,000. Now we have to actually put it online."
      ]
    },
    {
      id: "chapter-8",
      number: 8,
      title: "Deploy Online with Custom Domain",
      paragraphs: [
        "You can build the most beautiful site in the world, but up to this point, your site only exists on your computer. So if you copy the URL from your preview right now, the one that starts with localhost and send it to a friend, they're going to be very disappointed. That URL only works on your machine. To share your site with the world, you have to put it on a real server at a real custom URL.",
        "Hosting is the service that runs your website on a server 24/7 so anyone in the world can reach it. It's the boring part of owning a website, but every real site needs one.",
        "I use Hostinger because it's the cheapest professional host I know of that gives you a free domain for the first year on top of your plan. For the kind of site we built in this Playbook, a simple static site with no login, no checkout and no real database, Hostinger's premium plan covers everything. That's the one we're picking, but if your project is more complex than what we did here, like a site with user accounts, a payment flow or a database in the background, premium won't cut it. For projects like that, you want Hostinger's business plan instead. It supports Node.js and more advanced setups Claude tends to use for complex sites.",
        "Remember when Claude said no to React back in Chapter 6? That's the kind of moment that tells you which plan you need. If Claude kept your site simple, premium is fine. If Claude built you something with a real backend, you want business. For our steakhouse, premium is the right pick.",
        "Open this [Hostinger discount link](https://www.hostinger.com/in/recommended/mm10?utm_medium=affiliate&utm_source=aff118104&utm_campaign=557&session=102b2698c62bb825b1737456972362). Click Start Now, and that'll scroll you down to the pricing panels.",
        "Select the plan you want. Set the term to 12 months. 12 months is the minimum term that gets you a free domain for the first year.",
        "Now, search for the domain you want. If it's available, claim it. Your cart total is going to depend on whatever promotion Hostinger has running when you sign up. For me, it comes out to about $43 for the year. That's hosting plus a domain plus a free email account, all in. The exact number you see might be a few dollars different, but using the link above is always going to get you the best available price.",
        "If you add a month of Claude Pro on top of that, which is about 20 bucks, you've built a $10,000 website for roughly $60 total.",
        "Click Continue. Then add your email and a password to register an account. On the next page, enter your billing information to complete the transaction.",
        "After checkout is complete, the onboarding flow asks what kind of site you have. Since we're uploading our own files, pick Migrate Existing Site, then upload backup files. Then select the domain you just bought. Now return to your project folder on your computer so you can see the files that Claude built: your index.html plus any images, videos or subfolders sitting inside.",
        "Here's the part that matters: You don't want to zip the project folder itself. You want to zip the files inside the folder. If you zip the whole folder, Hostinger unzips it on their server and your site ends up one directory deeper than it should, your domain loads a blank page. So select everything inside your project folder: that's Command A on Mac or Ctrl A on Windows, then right click on your selection. On Mac hit Compress, on Windows pick Send To, then Compressed Folder. You get one zip file with your index.html sitting right at the top level. That's exactly what Hostinger wants.",
        "You can drag the zip file back out to the same level as your parent folder, and then give it a relevant name. Drag that zip into Hostinger and once the files finish uploading, click Next. Then click Submit Request.",
        "Once it loads, click on your domain and there it is. That's your $10,000 website, live at your own custom domain built with just a handful of prompts.",
        "If you want yours online too, grab Hostinger using this [Hostinger exclusive link](https://www.hostinger.com/in/recommended/mm10?utm_medium=affiliate&utm_source=aff118104&utm_campaign=557&session=102b2698c62bb825b1737456972362). That's how you lock in your 10% discount on top of whatever promotion they already have running. It's the cheapest way I know of to put a real professional website on the internet.",
        "Thanks for reading."
      ]
    }
  ]
};
