import { PlaybookArticle } from "./types";

export const BUILD_10K_WEBSITE_GPT6_ARTICLE: PlaybookArticle = {
  "slug": "how-to-build-a-10000-website-with-gpt-6-astra-full-tutorial",
  "title": "How To Build a $10,000 Website with GPT-6 Astra (Full Tutorial)",
  "readingTime": "35 min read",
  "categoryName": "AI",
  "categorySlug": "ai-businesses",
  "thumbnail": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996171/How_To_Build_a_10_000_Website_with_GPT-6_Astra_Full_Tutorial.png",
  "publishedDate": "2026",
  "authorName": "Diego Valera",
  "authorTitle": "Generative Web Architect & Digital Agency Strategist",
  "introParagraphs": [
    "How To Build a $10,000 Website with GPT-6 Astra\nA Practical Step-by-Step Playbook for Branding, Designing, Building, Optimising, Deploying, and Selling Professional Websites\nImportant context\nThis playbook turns the supplied tutorial into a reusable website-building workflow. The example project is a landscaping business called Coast & Grove Landscaping, serving Orange County, California. The process can be adapted to other local businesses, portfolios, service providers, and small-business websites.",
    "The “$10,000 website” phrase describes a professional visual and functional standard, not a verified market valuation or guaranteed selling price. The tutorial's claims about building in roughly an hour, hosting prices, model access, integrations, performance scores, and potential client fees are examples from one demonstration. They are not guaranteed outcomes and may change with product plans, interfaces, hosting offers, and technical requirements.",
    "The tutorial uses product names such as GPT-6 Astra and Hostinger as part of its demonstrated workflow. Availability, model names, plan eligibility, connector support, and interface steps can change. Check the current product interface and pricing before committing money or promising a client a particular setup."
  ],
  "chapters": [
    {
      "id": "chapter-1",
      "number": 1,
      "title": "Chapter 1 — What makes a website look professionally designed?",
      "paragraphs": [
        "A premium-looking website is rarely the result of one spectacular effect. It is the combination of many deliberate decisions that make the experience feel coherent, custom, trustworthy, and easy to use.",
        "The tutorial's eight-point quality checklist is the foundation of this playbook:\nRequirement\tWhat it means\tWhat to inspect\nCustom brand\tA distinct business identity\tName, logo, colours, typography, tone\nCustom imagery\tVisuals selected or created for the business\tRelevant, consistent, correctly sized images\nProfessional layout\tA considered structure rather than an obvious generic template\tHierarchy, spacing, section order, alignment\nAnimations\tMotion that adds polish and guides attention\tSubtle transitions, hover states, section movement\nMobile readiness\tThe website works on narrow screens\tReadability, navigation, buttons, forms, images\nWorking lead form\tVisitors can make an enquiry\tValidation, submission, delivery, confirmation\nFast loading\tPages appear quickly and remain responsive\tImage weight, unused assets, page performance\nCustom domain and SSL\tA branded web address with secure HTTPS\tDNS, domain status, certificate, redirects",
        "A website can look beautiful in a preview and still fail as a business tool if its form does not send leads, its mobile layout is broken, or its domain is not configured.\nThe quality principle\nTreat these eight points as a delivery checklist, not a design mood board. A website is not finished when the screenshot looks good. It is finished when the important visitor journeys work."
      ]
    },
    {
      "id": "chapter-2",
      "number": 2,
      "title": "Chapter 2 — Define the website's job before designing it",
      "paragraphs": [
        "The demonstration is a local landscaping website, but the same workflow starts with a clear business objective.",
        "Write down:\n- Business: What is the business called?\n- Audience: Who should visit the site?\n- Location: Where does the business operate?\n- Offer: What services or products does it provide?\n- Primary action: What should a visitor do?\n- Proof: What evidence makes the business credible?\n- Constraints: What information, claims, images, or features must be excluded?\nFor a local service business, the primary action may be requesting a quote, booking a consultation, or calling the business. For a portfolio, it may be viewing work or contacting the creator. For a product business, it may be exploring a product or starting checkout.",
        "Do not start by asking an AI model to “make a beautiful website” without explaining what the site needs to accomplish.\nWebsite brief template\nBusiness name:\nBusiness type:\nPrimary audience:\nService area:\nMain products or services:\nMost important customer problem:\nMain website goal:\nPrimary call to action:\nSecondary call to action:\nProof available:\nRequired pages or sections:\nBrand personality:\nExisting logo / images / assets:\nCompetitors or design references:\nRequired integrations:\nInformation that must not be invented:"
      ]
    },
    {
      "id": "chapter-3",
      "number": 3,
      "title": "Chapter 3 — Prepare your GPT-6 Astra workspace",
      "paragraphs": [
        "The demonstrated workflow keeps the work inside one ChatGPT Project so the brand information and earlier decisions remain available across the website-building process.\nSetup workflow\n1. Open ChatGPT.\n2. Create a new Project for the website.\n3. Give it a clear name, such as Website Build — Coast & Grove.\n4. Start a new conversation inside that Project.\n5. Select the available GPT-6 Astra model and choose a reasoning level appropriate to the task.\n6. Keep the brand brief, approved logo direction, design references, generated assets, and website iterations in this workspace.\nThe tutorial recommends a desktop experience because the workflow involves files, screenshots, previews, and deployment. Use the interface that gives you reliable access to these features.\nWhy use one Project?\nA website has many connected decisions:\n- business positioning;\n- brand identity;\n- visual assets;\n- page structure;\n- copy;\n- design references;\n- functionality;\n- deployment details.\nKeeping these together reduces the need to repeatedly re-explain the same context. It also makes it easier to request focused revisions while preserving the established design direction.\nProject instructions you can add\nYou are helping me plan, design, build, test, and deploy a professional website.",
        "Treat the information and approved decisions in this Project as the source of truth.\nMaintain consistent brand colours, typography, logo usage, imagery, tone, and layout.\nAsk clarifying questions when required information is missing.\nDo not invent business facts, customer reviews, credentials, awards, statistics,\naddresses, contact details, or guarantees.\nWhen changing an existing design, preserve everything outside the requested scope.\nExplain any assumptions, limitations, integrations, or actions that require my approval.\nPrioritise responsive design, accessibility, performance, security, and working forms."
      ]
    },
    {
      "id": "chapter-4",
      "number": 4,
      "title": "Chapter 4 — Generate a complete brand kit before building the page",
      "paragraphs": [
        "The tutorial begins with a brand-generation request rather than jumping directly into website code. This is important: the website needs a coherent visual system.",
        "Ask the model to propose:\n1. Five business name ideas.\n2. A recommended name and a brief reason.\n3. Brand colours with HEX codes.\n4. A heading font and a body font, preferably available through Google Fonts.\n5. A logo direction and initial logo concept.\n6. A recommended homepage section order.\n7. A list of images needed for each section.\nDo not let the model proceed to final logo creation until you have approved the business name.\nBrand-kit prompt\nI am creating a website for a [BUSINESS TYPE] serving [LOCATION].",
        "First, create a complete brand direction for this business.",
        "Please provide:\n1. Five distinctive business name ideas.\n2. Your recommended name and why it is the strongest option.\n3. A colour palette with HEX codes, including primary, secondary,\n   accent, background, and text colours.\n4. A heading font and body font, with suitable Google Fonts options.\n5. A logo concept and visual direction.\n6. A suggested homepage structure, in the order visitors should see it.\n7. A complete image list showing what visual assets each section needs.\n8. A short brand voice guide with examples of suitable wording.",
        "Do not generate the final logo yet. Ask me to confirm the business name first.\nDo not invent company history, certifications, awards, reviews, or results.\nReview the brand kit\nBefore approving it, check:\n- Does the name sound credible for the market?\n- Is it easy to pronounce and remember?\n- Are the colours appropriate for the business?\n- Do the fonts work together and remain readable?\n- Does the logo work at small sizes?\n- Does the proposed page structure support the primary conversion goal?\n- Are the image requirements realistic and relevant?\nA brand kit is a starting proposal. You are responsible for approving the identity."
      ]
    },
    {
      "id": "chapter-5",
      "number": 5,
      "title": "Chapter 5 — Approve the logo and generate a consistent image library",
      "paragraphs": [
        "After choosing the business name, ask the model to create the logo concept. Review the result rather than accepting it automatically.",
        "Inspect:\n- legibility at small sizes;\n- contrast against light and dark backgrounds;\n- whether the mark is distinctive enough;\n- whether it resembles another company's identity;\n- whether it works in a horizontal header and a compact layout.\nIf the image-generation interface supports targeted visual comments, use them to request specific edits. For example, ask to simplify a symbol, improve spacing, remove an unwanted element, or make the typography more legible.\nGenerate website images one by one\nThe tutorial asks for each image to be generated individually, consistently styled, and named according to its website placement.",
        "This makes the asset library easier to organise and reduces the chance of mixing up images later.\nImage-generation prompt\nNow create the website image assets from the approved brand kit.",
        "Generate each required image one by one.\nKeep all images visually consistent with the approved brand identity:\n- use the approved colour palette;\n- maintain a coherent photographic / visual style;\n- use realistic subject matter appropriate to the business;\n- avoid text embedded in images unless explicitly requested;\n- avoid visual elements that contradict the business or location.",
        "Name each file according to its intended website placement, for example:\n- hero-image\n- services-landscaping\n- services-irrigation\n- project-before\n- project-after\n- about-team\n- testimonial-background",
        "Before generating, show me the proposed asset list.\nAfter generating, provide the images in an organised downloadable package.\nUse real business assets when available\nAI-generated imagery is optional. If the business already has genuine photographs of its work, staff, premises, products, or completed projects, those may be more useful than generated images.",
        "For a service business, authentic project photographs can provide stronger evidence than generic AI scenes.\nImportant rules for imagery\n- Do not present generated people as actual employees.\n- Do not present generated project images as completed client work.\n- Do not use fabricated before-and-after images as proof of real results.\n- Do not use images without the necessary rights.\n- Check that generated visuals do not contain distorted logos, text, tools, equipment, or other obvious errors.\n- Optimise images for the actual display dimensions."
      ]
    },
    {
      "id": "chapter-6",
      "number": 6,
      "title": "Chapter 6 — Organise the brand assets",
      "paragraphs": [
        "Download the generated image package and inspect the files. Keep the names descriptive.",
        "A practical folder structure:\nCoast-and-Grove/\n├── brand/\n│   ├── logo/\n│   ├── colours-and-fonts.md\n│   └── brand-guidelines.md\n├── website-images/\n│   ├── hero/\n│   ├── services/\n│   ├── projects/\n│   ├── about/\n│   └── backgrounds/\n├── design-references/\n├── website-exports/\n└── launch-checklist.md\nThe tutorial's example generated nine images and downloaded them as a ZIP archive. Your actual image count should depend on the approved page structure."
      ]
    },
    {
      "id": "chapter-7",
      "number": 7,
      "title": "Chapter 7 — Research visual inspiration",
      "paragraphs": [
        "The demonstrated workflow uses Dribbble to explore website designs and find a layout direction. Search for the relevant industry or design category, then inspect examples that match the type of business.",
        "For example:\n- landscaping website;\n- architecture studio website;\n- premium cleaning service website;\n- local dental practice website;\n- consultant portfolio website.\nLook for:\n- hero composition;\n- navigation style;\n- typography hierarchy;\n- section spacing;\n- image treatment;\n- service cards;\n- project galleries;\n- calls to action;\n- motion and interaction patterns.\nWhat to capture\nChoose a reference that demonstrates a useful design direction. Take a screenshot of the relevant page or section and save it in the Project's reference folder.",
        "You can also use multiple references for different elements:\n- one for the hero;\n- one for service cards;\n- one for typography;\n- one for the footer.\nUse inspiration responsibly\nThe tutorial suggests using a screenshot as a reference for general style and layout. Treat that as visual direction, not permission to copy another company's identity or reproduce its protected design exactly.",
        "Do not copy:\n- another company's logo;\n- proprietary illustrations;\n- exact marketing copy;\n- unique brand assets;\n- a distinctive layout wholesale.\nUse references to communicate the desired level of polish, hierarchy, and visual style. The finished site should have its own brand expression."
      ]
    },
    {
      "id": "chapter-8",
      "number": 8,
      "title": "Chapter 8 — Build the first website draft",
      "paragraphs": [
        "Once the brand kit and image assets are ready, attach the design reference if you have one and ask Astra to create the website using the approved information.",
        "The tutorial's build request includes:\n- the chosen business name;\n- the screenshot as general visual inspiration;\n- a more custom and professional design direction;\n- approved logo, colours, and fonts;\n- generated website images;\n- a before-and-after slider;\n- a review section;\n- a free quote form;\n- clarifying questions before implementation.\nWebsite-build prompt\nBuild a professional, custom-looking website for [BUSINESS NAME].",
        "Use the approved brand kit and all relevant image assets in this Project.\nIf I have attached a design reference, use it only for general inspiration\nfor visual hierarchy, layout, spacing, and overall design quality.\nDo not copy its branding, exact layout, images, or text.",
        "Requirements:\n1. Create a distinctive, polished homepage.\n2. Use the approved logo, colours, fonts, and imagery consistently.\n3. Make the page feel custom-designed rather than like an untouched template.\n4. Use strong visual hierarchy, deliberate spacing, and clear calls to action.\n5. Include the agreed business sections in the approved order.\n6. Include a before-and-after slider if appropriate for the business.\n7. Include a review/testimonial section, but do not invent real reviews.\n   Use clearly labelled placeholders until genuine reviews are supplied.\n8. Include a quote or enquiry form.\n9. Make the website responsive for desktop, tablet, and mobile.\n10. Use accessible text contrast, keyboard-friendly controls, and readable type.\n11. Keep the code and assets organised.\n12. Do not invent business facts, addresses, contact information, credentials,\n    service guarantees, statistics, or customer outcomes.",
        "Before you begin, ask me all important clarifying questions about:\n- services and exclusions;\n- service areas;\n- primary and secondary calls to action;\n- genuine reviews and project photos;\n- contact details and lead destination;\n- required sections and functionality.",
        "Do not begin the full build until I have answered the questions.\nWhy the questions matter\nA website designer needs a business brief. The AI needs one too.",
        "For the landscaping example, the tutorial answers questions about:\n- which services to include;\n- which services to exclude;\n- the service area;\n- before-and-after project content;\n- reviews;\n- the email destination for leads;\n- placeholder information.\nMore accurate input generally leads to a more relevant first draft.\nUse voice dictation when it helps\nThe demonstration uses dictation to answer the model's questions rather than typing every response. This can be useful when describing services, audience, business background, or design preferences.",
        "Still review the transcribed answers before submitting. Voice input can misrecognise business names, locations, service terms, and exclusions."
      ]
    },
    {
      "id": "chapter-9",
      "number": 9,
      "title": "Chapter 9 — Handle placeholders correctly",
      "paragraphs": [
        "The demonstration uses placeholder reviews and contact information during the build. This is acceptable for a private prototype, but placeholders must never be mistaken for live business facts.",
        "Use obvious labels such as:\n- [Add verified customer review]\n- [Insert business phone number]\n- [Confirm service area]\n- [Connect lead destination]\nBefore launch, replace every placeholder with accurate information or remove the section.",
        "Never publish fabricated reviews, invented customer names, false project results, or made-up credentials."
      ]
    },
    {
      "id": "chapter-10",
      "number": 10,
      "title": "Chapter 10 — Review the first draft systematically",
      "paragraphs": [
        "Open the generated preview in a browser. If the built-in preview is unreliable, the tutorial downloads the preview file and opens it locally.",
        "Review the website as a visitor, not only as the person who requested it.\nFirst-draft review checklist\nBrand\n- Is the logo visible and correctly sized?\n- Are the approved colours used consistently?\n- Are the fonts applied correctly?\n- Does the page feel like one coherent brand?\nLayout\n- Is the main message clear immediately?\n- Is the most important action easy to find?\n- Are the sections in a sensible order?\n- Is the page visually balanced?\n- Are there unnecessary sections or repeated messages?\nImages\n- Are images relevant to the section?\n- Are they cropped correctly?\n- Do they look consistent?\n- Are there obvious AI-generation defects?\n- Do they load at an appropriate size?\nContent\n- Are service descriptions accurate?\n- Are the calls to action clear?\n- Are claims supported?\n- Are placeholders clearly identified?\nFunctionality\n- Does navigation work?\n- Does the before-and-after slider work?\n- Do buttons go to the correct destination?\n- Can a visitor complete the form?\n- Are there broken links or missing assets?\nRecord the issues before asking for changes. This prevents random revisions."
      ]
    },
    {
      "id": "chapter-11",
      "number": 11,
      "title": "Chapter 11 — Add subtle animations",
      "paragraphs": [
        "The tutorial identifies animations as one of the details that can make a website feel more polished.",
        "Examples from the demonstration include:\n- subtle movement in the hero image;\n- small transitions that visually connect sections;\n- hover effects on text or cards;\n- interactive visual states.\nThe goal is to add refinement without making the page distracting or slow.\nAnimation prompt: hero section\nAdd subtle, professional motion to the main hero image so the first section\nfeels more dynamic and premium.",
        "Preserve the existing design, brand identity, content, spacing, and layout.\nDo not change anything else.\nKeep the motion restrained, smooth, and suitable for a professional\nlocal-business website.\nRespect reduced-motion accessibility preferences.\nAnimation prompt: section transitions\nAdd subtle animations that help connect the different sections of the page.",
        "Use restrained transitions, carefully chosen hover states, and gentle movement.\nKeep the effects consistent with the brand and avoid excessive motion.\nDo not change the existing copy, imagery, section order, or layout.\nDo not change anything outside the animation scope.\nFull hero video versus subtle animation\nThe demonstration distinguishes between a small animated effect and a full video background. It notes that a separate video-generation tool may be needed for a full hero video.",
        "If you use a video:\n- ensure it is relevant;\n- compress it;\n- provide a fallback image;\n- avoid autoplay audio;\n- consider mobile data usage;\n- respect reduced-motion preferences;\n- check that text remains readable over it.\nDo not add motion simply because it is possible. It should support the design."
      ]
    },
    {
      "id": "chapter-12",
      "number": 12,
      "title": "Chapter 12 — Make focused revisions",
      "paragraphs": [
        "A common problem with AI-assisted website editing is that a broad request can cause unrelated parts of the page to change.",
        "The tutorial repeatedly recommends saying “Don't change anything else.”",
        "Use this structure:\nChange only [SPECIFIC ELEMENT].",
        "Current issue:\n[Describe exactly what is wrong.]",
        "Desired result:\n[Describe the expected appearance or behaviour.]",
        "Preserve:\n- all other sections;\n- existing copy;\n- brand colours and fonts;\n- current image choices;\n- navigation;\n- working functionality;\n- responsive behaviour.",
        "Do not make unrelated changes.\nAfter the edit, summarise exactly what changed.\nExamples of focused revision requests\n- “Reduce the hero image height on desktop only. Do not change the mobile layout.”\n- “Improve the spacing between the services section and the project gallery. Keep the existing typography.”\n- “Make the primary quote button more visible without changing its text or destination.”\n- “Fix the mobile navigation menu. Do not change the desktop header.”\n- “Add a subtle hover effect to the service cards. Preserve their current dimensions.”\nAfter each significant edit, inspect the page again. Do not assume that a successful AI response means the website remains correct."
      ]
    },
    {
      "id": "chapter-13",
      "number": 13,
      "title": "Chapter 13 — Optimise the mobile experience",
      "paragraphs": [
        "A responsive website must be usable on a phone, not merely squeezed into a narrow screen.",
        "The tutorial checks mobile by changing the preview's aspect ratio. The same principle can be applied using browser responsive mode and real devices.\nMobile checklist\n- Logo remains legible.\n- Navigation is usable.\n- Text does not become too small.\n- Headings wrap naturally.\n- Buttons are easy to tap.\n- Images crop appropriately.\n- Cards stack in a sensible order.\n- Forms are easy to complete.\n- Sliders and interactive elements work with touch.\n- No horizontal scrolling appears unexpectedly.\n- Important content is not hidden behind overlays.\n- The page remains visually coherent.\nMobile-only revision prompt\nReview the website at a narrow mobile viewport.",
        "Identify any mobile-specific issues with:\n- spacing;\n- typography;\n- navigation;\n- image cropping;\n- buttons;\n- card stacking;\n- forms;\n- sliders;\n- horizontal overflow.",
        "Fix only the mobile layout.\nPreserve the desktop design and existing content.\nDo not remove important information to make the page fit.\nAfter the changes, explain what was adjusted.\nTest at more than one viewport width. A page that works on one phone size may still break on another."
      ]
    },
    {
      "id": "chapter-14",
      "number": 14,
      "title": "Chapter 14 — Make the lead form actually work",
      "paragraphs": [
        "A visible form is not the same as a functioning lead-generation system.",
        "The tutorial plans to configure the form during hosting setup. It stresses that enquiries should reach the business's email, CRM, or chosen destination.\nDefine the form before connecting it\nFor a local service business, useful fields may include:\n- name;\n- email;\n- phone number, if genuinely needed;\n- service requested;\n- location or postcode;\n- project description;\n- preferred contact method.\nOnly collect information necessary for the enquiry. Avoid asking for sensitive details that the business does not need.\nForm implementation checklist\nVisitor experience\n- Labels are clear.\n- Required fields are marked.\n- Validation messages explain errors.\n- The submit button has a clear label.\n- The visitor sees a success or failure state.\n- The form works on mobile.\nDelivery\n- Submissions reach the intended inbox or CRM.\n- The destination is controlled by the business.\n- Failed submissions are detectable.\n- Duplicate submissions are handled sensibly.\n- Spam protection is considered.\n- The form does not expose private credentials in front-end code.\nPrivacy and security\n- The business explains how submitted information is used.\n- The form uses secure transport.\n- Access to lead data is restricted.\n- Retention and deletion practices are appropriate.\n- Any third-party form service is reviewed before use.\nForm connection prompt\nAudit the current enquiry form and explain what is required to make it\nfully functional.",
        "The intended destination is:\n[BUSINESS EMAIL / CRM / FORM SERVICE]",
        "Please:\n1. Identify the current form implementation.\n2. Explain whether submissions are actually being delivered.\n3. Connect the form using a secure, supported method.\n4. Keep secrets and API keys out of client-side code.\n5. Add clear validation and success/error states.\n6. Add appropriate spam protection.\n7. Test a real submission end to end.\n8. Tell me exactly where the submitted lead appears.",
        "Do not claim the form works until a test submission has been received.\nTest the entire journey\nSubmit a test enquiry using a controlled test address and verify:\n1. The page accepts valid input.\n2. Invalid input receives a useful error.\n3. The submission reaches the correct destination.\n4. The business can read the submitted details.\n5. The visitor receives a clear confirmation.\n6. No sensitive information is exposed.\nDo not launch with a form that only displays a success message but does not deliver the lead."
      ]
    },
    {
      "id": "chapter-15",
      "number": 15,
      "title": "Chapter 15 — Optimise image weight and loading speed",
      "paragraphs": [
        "Large images are a common source of unnecessary page weight. The tutorial asks the model to compress every image and improve loading speed without changing the appearance.",
        "It reports a 71% image-size reduction in its demonstration. That figure is specific to the example and is not a guaranteed result for every website.\nPerformance optimisation prompt\nOptimise the website's loading performance without changing its visual design.",
        "Please:\n1. Compress and resize images for their actual display dimensions.\n2. Use appropriate modern image formats where supported.\n3. Avoid loading oversized image files.\n4. Remove unused assets and unnecessary code.\n5. Avoid adding heavy libraries without a clear need.\n6. Lazy-load suitable below-the-fold images.\n7. Preserve image quality at normal viewing sizes.\n8. Avoid layout shifts while assets load.\n9. Preserve all existing interactions and responsive behaviour.",
        "Report what was changed and identify any trade-offs.\nDo not claim a performance improvement without measuring it.\nPerformance review\nCheck:\n- image dimensions and file sizes;\n- font loading;\n- unnecessary scripts;\n- large background media;\n- layout shifts;\n- mobile loading behaviour;\n- unused assets;\n- third-party integrations.\nUse a current performance-testing tool after deployment. Record desktop and mobile results separately.",
        "The tutorial reports a 92 performance score for its example, with mobile performing somewhat lower. Treat that as a demonstration result, not a target that every project is guaranteed to reach."
      ]
    },
    {
      "id": "chapter-16",
      "number": 16,
      "title": "Chapter 16 — Understand preview versus a live website",
      "paragraphs": [
        "A preview is not the same as a deployed website.",
        "During the build, the site may be visible only through a temporary preview or a locally downloaded file. A public website needs hosting and a configured domain.",
        "The tutorial explains hosting as renting a computer that remains available so visitors can access the site. More precisely, a hosting provider supplies infrastructure and services that serve the website over the internet.",
        "Before choosing a host, consider:\n- expected traffic;\n- storage and bandwidth;\n- supported deployment method;\n- SSL and domain management;\n- form or backend requirements;\n- backups;\n- support;\n- renewal pricing;\n- cancellation and migration options."
      ]
    },
    {
      "id": "chapter-17",
      "number": 17,
      "title": "Chapter 17 — Prepare the website for deployment",
      "paragraphs": [
        "Before moving the site to hosting, make sure you have:\n- the latest website files;\n- all required image and font assets;\n- any configuration files;\n- a clear list of external services;\n- the correct form destination;\n- no placeholder content;\n- no secrets embedded in public code.\nDownload or export the website package using the supported method available in the current interface. The demonstration uses a ZIP file as one possible deployment route.\nPre-deployment prompt\nPrepare this website for production deployment.",
        "Please:\n1. Identify the files and assets required to run the website.\n2. Check that all referenced images and fonts are included or correctly linked.\n3. Check for broken internal links and missing assets.\n4. Identify any environment variables or server-side services required.\n5. Confirm whether the website is static or requires a backend.\n6. Check that no secrets or private credentials are exposed.\n7. Remove development-only content and clearly labelled placeholders.\n8. Provide a deployment checklist and the correct export package.",
        "Do not deploy yet. First report any blockers."
      ]
    },
    {
      "id": "chapter-18",
      "number": 18,
      "title": "Chapter 18 — Set up hosting and a custom domain",
      "paragraphs": [
        "The tutorial demonstrates deployment through Hostinger. The exact plans, prices, domain offers, and dashboard labels can change, so use the current provider's official information before purchasing.\nGeneral hosting workflow\n1. Choose a hosting plan that supports the website's technical requirements.\n2. Check the renewal price, not only the introductory price.\n3. Confirm whether a domain is included and for how long.\n4. Register or connect the desired domain.\n5. Complete the provider's account and domain setup.\n6. Select the correct deployment or migration workflow.\n7. Upload the website package or use a supported connector.\n8. Configure the domain and SSL.\n9. Test the live website.\nDomain-selection checklist\nA good domain should be:\n- easy to spell;\n- easy to say aloud;\n- relevant to the business;\n- free of confusing punctuation where possible;\n- consistent with the business name;\n- legally and commercially appropriate.\nCheck availability and potential trademark conflicts before committing.\nHosting-cost caution\nThe demonstration mentions an example Hostinger plan and promotional pricing. Do not treat those amounts as current or universal. Introductory prices may require a longer term and renew at a different rate. Compare the full cost over the intended ownership period."
      ]
    },
    {
      "id": "chapter-19",
      "number": 19,
      "title": "Chapter 19 — Deploy through a supported connector when available",
      "paragraphs": [
        "The demonstration searches for a Hostinger connector in ChatGPT, connects the hosting account, and asks the assistant to deploy the website to a selected domain.",
        "This can simplify deployment, but connector availability and supported actions depend on the current product setup and account permissions.\nGeneral connector deployment workflow\n1. Open the available connector or app directory.\n2. Search for the hosting provider.\n3. Review the connector's permissions and supported actions.\n4. Connect the correct hosting account.\n5. Confirm that the target domain belongs to the intended account.\n6. Ask the assistant to deploy the prepared website.\n7. Review the proposed action and approve it.\n8. Wait for the provider to report the deployment result.\n9. Open the live domain and test it independently.\nDeployment prompt\nDeploy the approved website to my connected hosting account.",
        "Target domain:\n[YOUR DOMAIN]",
        "Use the latest approved production files from this Project.\nBefore deploying:\n- confirm the correct website and domain;\n- check that required assets are included;\n- identify any missing configuration;\n- confirm that no placeholder content remains;\n- identify any action that could overwrite an existing website.",
        "Ask for my approval before making irreversible changes.\nAfter deployment, provide the live URL and a list of any remaining setup steps.\nIf the connector does not work, use the provider's supported manual deployment process. The demonstration mentions restarting the ChatGPT app and checking for the correct connector/account connection as possible troubleshooting steps, but these are not guaranteed fixes."
      ]
    },
    {
      "id": "chapter-20",
      "number": 20,
      "title": "Chapter 20 — Verify the domain and SSL",
      "paragraphs": [
        "A domain may take time to become active after registration or DNS changes. The demonstration shows the domain still under review at the time of its final check.",
        "Before declaring launch complete, verify:\n- the domain resolves to the correct website;\n- HTTPS works;\n- the SSL certificate is valid;\n- HTTP redirects to HTTPS where appropriate;\n- the www and non-`www` versions behave consistently;\n- there are no mixed-content warnings;\n- the site is not accidentally password-protected or blocked from public access.\nDo not promise a fixed activation time. Domain and certificate propagation depend on the provider and configuration."
      ]
    },
    {
      "id": "chapter-21",
      "number": 21,
      "title": "Chapter 21 — Run a full launch test",
      "paragraphs": [
        "After deployment, test the actual public URL. A successful preview does not prove the live site is correct.\nVisual test\n- Logo and brand styling are correct.\n- All images load.\n- Sections appear in the right order.\n- Typography is readable.\n- Animations work without distracting visitors.\n- No placeholder content remains.\nFunctional test\n- Navigation links work.\n- Calls to action go to the correct destination.\n- Before-and-after slider works.\n- Forms submit successfully.\n- Enquiries arrive at the correct inbox or CRM.\n- Phone and email links work.\n- External links open correctly.\nMobile test\n- Check at multiple screen widths.\n- Test the navigation menu.\n- Test the form with a mobile keyboard.\n- Test sliders and interactive elements with touch.\n- Check for horizontal overflow.\n- Confirm that buttons are easy to tap.\nTechnical test\n- HTTPS works.\n- No important assets return errors.\n- No broken links.\n- Performance is measured.\n- Accessibility issues are reviewed.\n- Search metadata and page titles are present.\n- The site has a sensible favicon.\n- Backup and recovery arrangements are understood."
      ]
    },
    {
      "id": "chapter-22",
      "number": 22,
      "title": "Chapter 22 — Use performance results to guide improvements",
      "paragraphs": [
        "The tutorial takes a performance report, screenshots insights, and shares them with the model for fixes. This is a useful feedback workflow.\nPerformance-fix prompt\nReview the attached performance report for the live website.",
        "For each issue:\n1. Explain what it means in plain language.\n2. Identify the likely cause.\n3. Estimate its impact on the visitor experience.\n4. Recommend the smallest safe fix.\n5. Identify any visual or functional trade-off.\n6. Make the change only after explaining the scope.\n7. Re-test after the change and compare the result.",
        "Preserve the existing design and functionality.\nDo not claim that an issue is fixed until the updated site has been tested.\nDo not optimise a score at the expense of usability. A performance metric is useful evidence, but it is not the entire website experience."
      ]
    },
    {
      "id": "chapter-23",
      "number": 23,
      "title": "Chapter 23 — Maintain the site after launch",
      "paragraphs": [
        "A website is not a one-time export. Business information, services, images, offers, and integrations change.",
        "Create a simple maintenance routine:\n- check form delivery;\n- review broken links;\n- update services and contact information;\n- replace outdated images;\n- review mobile behaviour after significant changes;\n- monitor performance;\n- update dependencies where appropriate;\n- maintain backups;\n- check domain and hosting renewal dates;\n- review access to the hosting account.\nIf a change is requested, use the same focused-editing approach: specify exactly what should change and what must remain untouched."
      ]
    },
    {
      "id": "chapter-24",
      "number": 24,
      "title": "Chapter 24 — Find businesses that have a website problem",
      "paragraphs": [
        "The tutorial's business idea is to build websites for local businesses that have strong customer reviews but a weak website or no website.",
        "The logic is that a business may already have evidence of customer demand and a reputation, but its online presence may not communicate its value effectively.",
        "The demonstrated prospecting method is:\n1. Open Google Maps.\n2. Search for a local business category, such as landscaping businesses near a target location.\n3. Identify businesses with positive reviews.\n4. Inspect their website or confirm that they do not appear to have one.\n5. Look for clear opportunities to improve their online presentation.\n6. Create a relevant demo homepage.\n7. Contact the business and show the concept.\nThis is a prospecting hypothesis, not proof that every business with a weak website wants or can afford a redesign.\nWhat to look for\nPotential website problems:\n- no website linked from the business profile;\n- website does not work on mobile;\n- outdated design;\n- unclear services;\n- no clear call to action;\n- missing contact information;\n- broken links;\n- poor project imagery;\n- no useful enquiry path;\n- confusing service-area information.\nDo not assume that a business needs a new site simply because you prefer a different design. Identify a genuine business or visitor problem."
      ]
    },
    {
      "id": "chapter-25",
      "number": 25,
      "title": "Chapter 25 — Build a demo before pitching",
      "paragraphs": [
        "A demo can make the proposed improvement tangible. The tutorial suggests building a foundational homepage quickly and deploying it to hosting before approaching the business.",
        "A safer and more professional process is to create a clearly labelled concept preview, using only information and assets you have permission to use.\nDemo workflow\n1. Choose one qualified business.\n2. Review its public website and business information.\n3. Identify one or two specific website weaknesses.\n4. Draft a short website brief.\n5. Create a concept homepage.\n6. Use clearly labelled sample content where facts are missing.\n7. Avoid fabricated reviews, project photos, credentials, or claims.\n8. Keep the demo private or clearly marked as a concept.\n9. Prepare a short explanation of what the redesign improves.\n10. Contact the business respectfully.\nDo not publish a site that impersonates the business or make it appear that the business has approved the work.\nProspect research template\nField\tNotes\nBusiness name\t\nBusiness category\t\nLocation\t\nWebsite URL\t\nPublic review signals\t\nMain website weakness\t\nMobile experience\t\nMain opportunity\t\nDemo created?\t\nContact channel\t\nFollow-up status"
      ]
    },
    {
      "id": "chapter-26",
      "number": 26,
      "title": "Chapter 26 — Pitch the outcome, not the AI tool",
      "paragraphs": [
        "The client is not buying access to an AI model. They are considering a website that should help their business communicate clearly and receive enquiries.",
        "A useful pitch should explain:\n- what is currently confusing or missing;\n- what the proposed site improves;\n- what pages and functionality are included;\n- what the business must provide;\n- how the form and leads will work;\n- who owns the domain and website assets;\n- what hosting and ongoing support cost;\n- what is included in revisions and maintenance.\nDo not promise a specific number of leads, sales, rankings, or revenue unless you have evidence and a defensible basis for the claim.\nOutreach message template\nSubject: A website concept for [Business Name]",
        "Hi [Name],",
        "I came across [Business Name] while researching [business category] in\n[location].",
        "I noticed [specific, factual observation about the current website or\nonline experience]. I put together a small website concept to show how\nyour services could be presented more clearly and how visitors could\nrequest an enquiry.",
        "The concept is only a draft and is not published as your official website.\nIf you're open to it, I can send over the preview and explain what I would\ninclude in a complete build.",
        "No pressure either way.",
        "Best,\n[Your Name]\nPersonalise every message. Do not mass-send generic pitches or imply that you have a business relationship that does not exist."
      ]
    },
    {
      "id": "chapter-27",
      "number": 27,
      "title": "Chapter 27 — Package the website service",
      "paragraphs": [
        "The tutorial mentions selling a website through either a one-time build fee or a monthly fee. It does not provide a validated pricing model, a detailed service contract, or proof that a particular price is routinely achievable.",
        "Treat pricing as a business decision based on scope, client value, delivery cost, competition, and your capability.\nPossible service structures\nOption A — One-time website build",
        "May include:\n- discovery and brief;\n- brand direction;\n- agreed pages;\n- copy and image placement;\n- responsive implementation;\n- enquiry form integration;\n- domain and hosting setup;\n- launch testing;\n- handover documentation.\nOption B — Build plus monthly maintenance",
        "May include the initial website build plus a defined monthly service:\n- hosting coordination;\n- backups and uptime checks;\n- small content updates;\n- form testing;\n- technical maintenance;\n- monthly performance review.\nBe precise about what “maintenance” includes. Do not sell unlimited edits or 24/7 support unless you can actually deliver them.\nPricing worksheet\nCalculate:",
        "Project price = delivery labour + direct costs + risk allowance + desired margin",
        "For recurring service:",
        "Monthly fee = hosting and tools + maintenance time + support allowance + margin",
        "Include:\n- discovery time;\n- design and revisions;\n- implementation;\n- image and content work;\n- form configuration;\n- domain and hosting costs;\n- third-party subscriptions;\n- testing;\n- handover;\n- taxes and payment fees where applicable.\nA premium appearance alone does not justify a particular price. Price should reflect the actual scope and value delivered."
      ]
    },
    {
      "id": "chapter-28",
      "number": 28,
      "title": "Chapter 28 — Define ownership and responsibilities",
      "paragraphs": [
        "Before accepting payment, agree in writing:\n- who owns the domain;\n- who controls the hosting account;\n- who owns the website files and custom assets;\n- who supplies and approves business information;\n- who is responsible for licences and image rights;\n- how many revisions are included;\n- what happens when scope changes;\n- what ongoing maintenance includes;\n- how forms and lead data are handled;\n- how access is transferred if the relationship ends;\n- what payment milestones apply.\nWhenever possible, the client should own the domain and primary business accounts. Use delegated access rather than keeping critical assets under your personal account."
      ]
    },
    {
      "id": "chapter-29",
      "number": 29,
      "title": "Chapter 29 — The one-day website build plan",
      "paragraphs": [
        "The tutorial describes a roughly one-hour demonstration. A real client-ready website can take longer because discovery, content verification, form integration, domain setup, testing, and approvals all require time.",
        "Use this as a sequence, not a deadline guarantee.\nPhase\tWork\tDeliverable\n1. Brief\tDefine audience, services, location, CTA\tApproved website brief\n2. Brand\tName, colours, fonts, logo direction\tBrand kit\n3. Assets\tGenerate or collect images\tOrganised asset library\n4. Inspiration\tReview design references\tVisual direction\n5. Build\tGenerate first website version\tWorking draft\n6. Review\tInspect layout, copy, imagery\tRevision list\n7. Polish\tAdd subtle animation and interactions\tRefined design\n8. Mobile\tTest and adjust responsive layout\tMobile-ready version\n9. Performance\tCompress images and remove waste\tOptimised build\n10. Forms\tConnect and test lead delivery\tWorking enquiry system\n11. Deploy\tHosting, domain, SSL\tPublic website\n12. QA\tTest visitor journeys and technical details\tLaunch approval"
      ]
    },
    {
      "id": "chapter-30",
      "number": 30,
      "title": "Chapter 30 — The client-ready website checklist",
      "paragraphs": [
        "Before build\n- [ ] Business brief approved.\n- [ ] Services and exclusions confirmed.\n- [ ] Service area confirmed.\n- [ ] Primary call to action selected.\n- [ ] Contact details verified.\n- [ ] Genuine reviews and project assets collected or omitted.\n- [ ] Brand kit approved.\nDuring build\n- [ ] Logo and colours are consistent.\n- [ ] Typography is readable.\n- [ ] Homepage structure supports the goal.\n- [ ] Images are relevant and rights-cleared.\n- [ ] Copy is accurate.\n- [ ] No invented claims or testimonials.\n- [ ] Navigation and buttons work.\n- [ ] Responsive layout is implemented.\nBefore launch\n- [ ] All placeholders removed.\n- [ ] Form delivery tested end to end.\n- [ ] Privacy information reviewed.\n- [ ] Domain points to the correct site.\n- [ ] SSL/HTTPS works.\n- [ ] Mobile layout checked on real devices or suitable emulation.\n- [ ] Performance tested.\n- [ ] Accessibility basics reviewed.\n- [ ] Backups and account access arranged.\n- [ ] Client has approved the final version."
      ]
    },
    {
      "id": "chapter-31",
      "number": 31,
      "title": "Chapter 31 — Common problems and how to respond",
      "paragraphs": [
        "Problem\tLikely response\nModel changes unrelated sections\tUse a narrowly scoped revision prompt and compare against the last approved version\nPreview does not render correctly\tExport the preview or inspect the project through another supported local preview method\nGenerated image looks inconsistent\tReuse the approved style description and request a targeted regeneration\nLogo is distorted or unreadable\tSimplify it and inspect at small sizes\nMobile layout looks cramped\tRequest mobile-only changes and test multiple viewport widths\nForm shows success but no lead arrives\tInspect the actual integration and verify a test submission at the destination\nImages load slowly\tResize and compress them; inspect modern formats and lazy loading\nConnector cannot deploy\tCheck account connection and permissions, then use the host's supported manual upload route\nDomain is not active\tVerify registration, DNS, provider status, and SSL configuration\nPerformance score is lower on mobile\tInspect mobile-specific image weight, scripts, fonts, and layout behaviour\nClient requests endless changes\tRefer to the agreed scope and price additional work transparently"
      ]
    },
    {
      "id": "chapter-32",
      "number": 32,
      "title": "Chapter 32 — A 7-day launch roadmap",
      "paragraphs": [
        "For a more realistic first project, spread the work across a week.\nDay 1 — Discovery and brand\n- Complete the business brief.\n- Confirm the audience and primary conversion goal.\n- Generate and approve the brand kit.\n- Collect real business assets.\nDay 2 — Page plan and imagery\n- Approve the section order.\n- Generate or prepare images.\n- Review visual references.\n- Organise all assets.\nDay 3 — First build\n- Generate the first website draft.\n- Review content and structure.\n- Identify missing facts and placeholders.\nDay 4 — Design refinement\n- Improve spacing, hierarchy, and imagery.\n- Add restrained animations.\n- Fix navigation and interactions.\nDay 5 — Mobile and performance\n- Test responsive layouts.\n- Optimise images.\n- Review accessibility and loading behaviour.\nDay 6 — Forms and deployment\n- Connect the enquiry system.\n- Test lead delivery.\n- Configure hosting, domain, and SSL.\n- Deploy the approved build.\nDay 7 — Final QA and handover\n- Test the live website.\n- Remove placeholders.\n- Confirm ownership and account access.\n- Provide a handover document.\n- Record maintenance responsibilities."
      ]
    },
    {
      "id": "chapter-33",
      "number": 33,
      "title": "Chapter 33 — Brand kit prompt",
      "paragraphs": [
        "Create a complete brand kit for [BUSINESS] in [LOCATION].",
        "Include five name ideas, recommended name, colour palette with HEX codes,\nGoogle Fonts heading and body font, logo direction, brand voice, homepage\nsection order, and a complete image asset list.",
        "Ask me to approve the name before creating the logo.\nDo not invent company facts or credentials."
      ]
    },
    {
      "id": "chapter-34",
      "number": 34,
      "title": "Chapter 34 — Logo revision prompt",
      "paragraphs": [
        "Revise the current logo.",
        "Keep the approved brand direction.\nChange only:\n[EXACT CHANGE]",
        "Improve legibility at small sizes and preserve the logo's usefulness in\nboth horizontal and compact placements.\nDo not introduce unrelated symbols or change the approved business name."
      ]
    },
    {
      "id": "chapter-35",
      "number": 35,
      "title": "Chapter 35 — Image consistency prompt",
      "paragraphs": [
        "Create the remaining website images using the approved brand image direction.",
        "Keep the photographic style, lighting, colour treatment, and overall visual\nlanguage consistent.\nGenerate one image at a time and name each file by its website section.\nDo not embed text or logos unless I explicitly request them."
      ]
    },
    {
      "id": "chapter-36",
      "number": 36,
      "title": "Chapter 36 — Website build prompt",
      "paragraphs": [
        "Build a custom, responsive website for [BUSINESS].",
        "Use the approved brand kit and supplied assets.\nCreate the agreed sections in the approved order.\nInclude [REQUIRED INTERACTIONS].\nAsk clarifying questions before implementation.\nDo not invent reviews, awards, business facts, project outcomes, or contact\ninformation. Use clearly labelled placeholders until verified information\nis supplied."
      ]
    },
    {
      "id": "chapter-37",
      "number": 37,
      "title": "Chapter 37 — Focused design correction prompt",
      "paragraphs": [
        "Change only [ELEMENT].",
        "Problem:\n[WHAT IS WRONG]",
        "Desired result:\n[WHAT SHOULD HAPPEN]",
        "Preserve all other design, content, assets, interactions, and responsive\nbehaviour. Do not make unrelated changes."
      ]
    },
    {
      "id": "chapter-38",
      "number": 38,
      "title": "Chapter 38 — Mobile audit prompt",
      "paragraphs": [
        "Audit the website at mobile widths.",
        "Check navigation, typography, spacing, image crops, buttons, cards, forms,\ninteractive components, and horizontal overflow.",
        "Fix only mobile-specific issues. Preserve the desktop layout and all\nimportant content."
      ]
    },
    {
      "id": "chapter-39",
      "number": 39,
      "title": "Chapter 39 — Performance prompt",
      "paragraphs": [
        "Improve website loading performance without changing its appearance.",
        "Inspect image dimensions, compression, formats, unused assets, scripts,\nfonts, layout shifts, and below-the-fold loading.",
        "Report each change and any trade-off. Re-test after implementation."
      ]
    },
    {
      "id": "chapter-40",
      "number": 40,
      "title": "Chapter 40 — Deployment readiness prompt",
      "paragraphs": [
        "Prepare the website for production deployment.",
        "Check required files, assets, configuration, environment variables, secrets,\nforms, links, placeholders, and whether a backend is required.",
        "Report blockers before deployment. Do not overwrite an existing live site\nwithout my explicit approval."
      ]
    },
    {
      "id": "chapter-41",
      "number": 41,
      "title": "Chapter 41 — Final launch audit prompt",
      "paragraphs": [
        "Audit the live website at [URL].",
        "Test:\n- desktop and mobile appearance;\n- navigation and calls to action;\n- all important links;\n- enquiry form delivery;\n- HTTPS and domain behaviour;\n- image loading;\n- performance;\n- accessibility basics;\n- placeholder content;\n- missing assets and errors.",
        "Separate confirmed failures from recommendations.\nDo not claim a feature works unless it has been tested."
      ]
    },
    {
      "id": "chapter-42",
      "number": 42,
      "title": "Chapter 42 — Final Operating Principle",
      "paragraphs": [
        "The core workflow is straightforward:",
        "Brief → Brand → Assets → Inspiration → Build → Review → Refine → Mobile → Performance → Forms → Deploy → Test → Maintain.",
        "AI can reduce the time required to create a professional-looking first version, but it does not remove the need for business judgement, accurate content, rights-cleared assets, working integrations, security, or real-world testing.",
        "Do not stop when the page looks impressive in a preview. Finish the parts that make it a real business website: verified information, a usable mobile experience, a functioning enquiry path, a secure domain, and a tested deployment.",
        "And if you want to turn the skill into a service, sell the business outcome and the quality of delivery—not merely the fact that AI generated the page."
      ]
    }
  ]
};
