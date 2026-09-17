/**
 * Subcategory Hierarchy & Mapping for Plugd
 * 
 * Defines the exact subcategory relationships per category:
 * - FOOD: Ice Creams, Sweet Cravings, Biscuits, Snacks
 * - DRINKS: Coffee, Cold Drinks & Juices
 * - FASHION: Jewellery
 * - MOBILE: Standalone main category
 * - BEAUTY: Skin Care
 * - ENTERTAINMENT: Standalone main category
 * - SUBSCRIPTIONS: Standalone main category
 * - ELECTRONICS: Mobile, Laptops, Audio, Gaming, Watches
 *   - Gaming nested: Console Controllers, Games, Keyboards, Mouse, Speakers
 * - FITNESS: Standalone main category
 * - VEHICLES: Bikes, Cars
 * - TOYS: Standalone main category
 */

export interface Subcategory {
  id: string; // url slug e.g. "ice-creams"
  name: string; // display name e.g. "Ice Creams"
  image: string; // square thumbnail image
  keywords: string[]; // matching keywords for filtering products
  productIds?: string[]; // exact product IDs if predefined
  sourceCategorySlug?: string; // e.g. "mobile" when Electronics -> Mobile
}

export const CATEGORY_SUBCATEGORIES: Record<string, Subcategory[]> = {
  food: [
    {
      id: "ice-creams",
      name: "Ice Creams",
      image: "https://www.sheetalicecream.com/wp-content/themes/sheetal/images/all_product_image.png",
      keywords: [
        "ice cream", "kulfi", "kulfie", "gelato", "popsicle", "sundae", "cornetto", "magnum", "chocobar", "cassata",
        "baskin robbins", "cream pot", "havmor", "hoccol", "tiramisu", "mudslide", "kulhad", "tub", "cone", "stick"
      ],
      productIds: [
        "amul-chocolate-brownie-ice-cream-tub",
        "amul-choco-chip-chocolate-ice-cream-tub",
        "amul-fruit-n-nut-fantasy-ice-cream-tub",
        "cream-pot-vanilla-tub",
        "baskin-robbins-mississippi-mud-ice-cream-tub",
        "magnum-chocolate-almond-ice-cream-stick",
        "baskin-robbins-almond-n-caramel-ice-cream-stick",
        "cornetto-double-chocolate-cone",
        "havmor-dark-chocolate-ice-cream-cone",
        "hoccol-hazelnut-mudslide-ice-cream-cone",
        "ob-gob-tiramisu-fudge-ice-cream-sundae",
        "ob-gob-vanilla-choco-brownie-ice-cream-sundae",
        "amul-kulhad-kulfie-ice-cream",
        "havmor-matka-kulfi",
      ],
    },
    {
      id: "sweet-cravings",
      name: "Sweet Cravings",
      image: "https://adharsweets.in/wp-content/uploads/2024/02/sw-b-1.webp",
      keywords: [
        "sweets", "sweet", "rasmalai", "gulab", "halwa", "jalebi",
        "laddu", "kaju", "brownie", "pastry", "donut", "doughnut", "chocolate", "mithai", "peda", "barfi", "mysore pak",
        "rasgulla", "soan papdi", "dairy milk", "munch", "kit-kat", "kinder", "snickers", "bournville",
        "5 star", "ferrero rocher"
      ],
      productIds: [
        "rasmalai",
        "kaju-katli",
        "mysore-pak",
        "motichoor-laddu",
        "gulab-jamun",
        "besan-laddu",
        "soan-papdi",
        "rasgulla",
        "doodh-peda",
        "malai-peda",
        "dharwad-peda",
        "dairy-milk",
        "munch-max",
        "dairy-milk-shots",
        "nestle-kit-kat",
        "amul-cocoa-dark-chocolate",
        "kinder-joy-blue",
        "kinder-joy-pink",
        "snickers",
        "bournville-dark-chocolate",
        "cadbury-5-star",
        "dairy-milk-silk",
        "ferrero-rocher-premium-chocolate",
      ],
    },
    {
      id: "biscuits",
      name: "Biscuits",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY0pPOy7ZcpxQoOWXjl7DHFdDaTnmNE_t9XfG1sTny2pSfnPVJXNxUpxma&s=10",
      keywords: [
        "biscuit", "biscuits", "cookie", "cookies", "rusk", "wafer",
        "crackers", "little hearts", "maska chaska", "parle-g", "oreo", "krackjack", "good day", "dark fantasy",
        "jim jam", "malkist", "5050", "50-50"
      ],
      productIds: [
        "malkist-cheese-crunchy-layered-crackers",
        "britannia-little-hearts",
        "hide-seek-choco-chip-cookies",
        "50-50-maska-chaska",
        "parle-g",
        "oreo",
        "krackjack",
        "good-day",
        "dark-fantasy",
        "jim-jam",
      ],
    },
    {
      id: "snacks",
      name: "Snacks",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdyoMgk4r6y2WWdkU266A1EUbW2M499tHWY5ys6GJm3UqaOjDg72FOna3b&s=10",
      keywords: [
        "lays", "chips", "kurkure", "bingo", "uncle chipps", "too yumm", "aloo bhujia", "bhujia sev", "mixture",
        "peanuts", "makhana", "banana chips", "murukku", "chakli", "nippattu", "khakhra", "popcorn", "nachos", "cheese balls", "snack", "snacks"
      ],
      productIds: [
        "lays-classic-salted",
        "lays-magic-masala",
        "kurkure-masala-munch",
        "bingo-mad-angles",
        "uncle-chipps",
        "too-yumm-multigrain-chips",
        "haldirams-aloo-bhujia",
        "haldirams-bhujia-sev",
        "haldirams-mixture",
        "masala-peanuts",
        "roasted-peanuts",
        "makhana",
        "banana-chips",
        "murukku",
        "chakli",
        "nippattu",
        "khakhra",
        "popcorn",
        "nachos",
        "cheese-balls",
      ],
    },
  ],
  drinks: [
    {
      id: "coffee",
      name: "Coffee",
      image: "https://media.cnn.com/api/v1/images/stellar/prod/150929101049-black-coffee-stock.jpg?q=w_3000,h_3074,x_0,y_0,c_fill",
      keywords: ["coffee", "espresso", "latte", "cappuccino", "brew", "mocha", "cold coffee", "americano", "macchiato", "frappe"],
      productIds: [
        "nescafe-classic-instant-coffee",
        "nescafe-sunrise-instant-coffee",
        "bru-instant-coffee",
        "bru-gold-instant-coffee",
        "continental-xtra-coffee",
        "tata-coffee-grand",
        "starbucks-premium-instant-coffee",
        "starbucks-frappuccino-coffee",
        "rage-coffee",
        "sleepy-owl-cold-coffee",
        "bevzilla-instant-coffee",
        "country-bean-vanilla-coffee",
        "blue-tokai-coffee",
        "third-wave-coffee",
        "nescafe-gold",
      ],
    },
    {
      id: "cold-drinks-juices",
      name: "Cold Drinks & Juices",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTimV-TDBy6BEVnHq8EQ3KzoKEdv77XU6n5ZZxjR8k7dkEmFzneKIxhU6zA&s=10",
      keywords: ["juice", "cold drink", "soda", "coke", "pepsi", "energy drink", "shake", "smoothie", "lassi", "tea", "iced", "red bull", "monster", "prime", "thums", "sprite", "fanta", "mirinda", "maaza", "frooti", "lemonade", "kombucha", "water"],
      productIds: [
        "frooti",
        "maaza",
        "appy-fizz",
        "slice",
        "paper-boat-aamras",
        "paper-boat-coconut-water",
        "real-fruit-power-orange",
        "real-fruit-power-mixed-fruit",
        "tropicana-orange-juice",
        "tropicana-apple-juice",
        "b-natural-mixed-fruit",
        "b-natural-orange-juice",
        "paper-boat-aam-panna",
        "paper-boat-jaljeera",
        "coconut-water",
        "limca",
        "7up",
        "mirinda",
        "mountain-dew",
        "sting-energy-drink",
        "kinley-soda",
        "schweppes-tonic-water",
        "nestea-lemon-iced-tea",
        "paper-boat-neer-more",
        "raw-pressery-cold-pressed-orange-juice",
      ],
    },
  ],
  fashion: [
    {
      id: "jewellery",
      name: "Jewellery",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80",
      keywords: ["jewellery", "jewelry", "necklace", "ring", "earring", "earrings", "bracelet", "chain", "jhumka", "gold", "silver", "pendant", "choker", "anklet", "bangle", "accessory"],
    },
  ],
  beauty: [
    {
      id: "skin-care",
      name: "Skin Care",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80",
      keywords: ["skin", "serum", "moisturizer", "sunscreen", "toner", "cleanser", "cream", "mask", "lotion", "exfoliant", "snail", "niacinamide", "hyaluronic", "retinol", "face wash", "spf", "patch", "salicylic", "glycolic", "hydrating", "cica", "blush", "tint", "concealer", "powder", "lipstick", "lip", "kajal", "mascara"],
      productIds: [
      "rare-beauty-soft-pinch-liquid-blush",
      "fenty-beauty-eaze-drop-skin-tint",
      "charlotte-tilbury-flawless-filter",
      "charlotte-tilbury-pillow-talk-palette",
      "laneige-lip-sleeping-mask-berry",
      "dior-lip-glow-oil",
      "cosrx-advanced-snail-96-mucin-essence",
      "beauty-of-joseon-relief-sun-spf50",
      "anua-heartleaf-77-soothing-toner",
      "minimalist-10-niacinamide-serum",
      "paulas-choice-2-bha-liquid-exfoliant",
      "forest-essentials-soundarya-radiance-cream",
      "charlotte-tilbury-magic-cream",
      "estee-lauder-advanced-night-repair-serum",
      "laneige-midnight-minis-lip-mask-set",
      "elf-halo-glow",
      "charlotte-tilbury-pillow-talk-lipstick",
      "mac-ruby-woo",
      "the-ordinary-niacinamide",
      "dior-lip-maximizer",
      "rhode-peptide-lip-treatment",
      "rhode-glazing-milk",
      "ysl-touche-eclat",
      "nars-radiant-creamy-concealer",
      "huda-beauty-easy-bake-loose-powder",
      "charlotte-tilbury-airbrush-flawless-spray",
      "maybelline-lash-sensational-sky-high",
      "kay-beauty-gel-kajal-black",
      "benefit-precisely-my-brow-pencil",
      "fenty-beauty-gloss-bomb-universal",
      "rom-and-juicy-lasting-tint",
      "peripera-ink-mood-glowy-tint",
      "matineee-matte-liquid-lipstick",
      "lipstick-set",
      "skin1004-madagascar-centella-ampoule",
      "round-lab-birch-juice-sunscreen",
      "torriden-dive-in-hyaluronic-serum",
      "face-serum",
      "the-ordinary-glycolic-acid-7-toning-solution",
      "cerave-hydrating-facial-cleanser",
      "dot-and-key-cica-calming-sunscreen",
      "minimalist-sunscreen-stick-spf50",
      "la-roche-posay-anthelios-spf50",
      "cosrx-master-pimple-patch",
      "skincare-routine",
      "summer-fridays-lip-butter-balm",
      "mac-lipstick-velvet-teddy",
      "rare-beauty-soft-pinch-lip-oil",
      "huda-beauty-lip-liner",
      "hydrocolloid-pimple-patches",
      "acne-spot-treatment",
      "kay-beauty-matte-liquid-lipstick",
      "kama-ayurveda-kumkumadi-beauty-fluid",
      "plum-green-tea-pore-cleansing-face-wash",
      "minimalist-male-skincare-daily-duo",
      "maybelline-vinyl-ink",
      "maybelline-superstay-matte-ink",
      "maybelline-fit-me-foundation",
      "maybelline-fit-me-concealer",
      "maybelline-sky-high-mascara",
      "maybelline-colossal-kajal",
      "loreal-infallible-foundation",
      "loreal-true-match-foundation",
      "loreal-panorama-mascara",
      "loreal-infallible-setting-spray",
      "lakme-9to5-primer-matte",
      "lakme-9to5-mousse",
      "lakme-eyeconic-kajal",
      "lakme-eyeconic-curling-mascara",
      "kay-beauty-foundation",
      "kay-beauty-hd-concealer",
      "kay-beauty-creme-blush",
      "elf-camo-concealer",
      "elf-power-grip-primer",
      "rare-beauty-positive-light-highlighter",
      "fenty-beauty-pro-filtr-foundation",
      "mac-fix-plus",
      "huda-beauty-liquid-matte",
      "nyx-butter-gloss",
      "nyx-fat-oil-lip-drip",
      "benefit-benetint",
      "benefit-roller-lash",
      "cerave-moisturizing-cream",
      "cerave-foaming-cleanser",
      "cerave-sa-cleanser",
      "cetaphil-gentle-cleanser",
      "cetaphil-moisturizing-lotion",
      "the-ordinary-aha-bha-peel",
      "the-ordinary-hyaluronic-acid",
      "minimalist-salicylic-acid-cleanser",
      "minimalist-vitamin-c-serum",
      "dot-key-vitamin-c-serum",
      "dot-key-barrier-repair-cream",
      "plum-niacinamide-serum",
      "plum-vitamin-c-moisturizer",
      "deconstruct-retinol-serum",
      "deconstruct-aha-exfoliant",
      "cosrx-bha-blackhead-power-liquid",
      "cosrx-aloe-soothing-sun-cream",
      "laneige-water-sleeping-mask",
      "clinique-moisture-surge",
      "clinique-dramatically-different",
      "estee-lauder-double-wear",
      "dior-backstage-face-body",
      "laneige-cream-skin-toner",
      "clinique-take-the-day-off"
],
    },
    {
      id: "hair-care",
      name: "Hair Care",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80",
      keywords: ["hair", "dryer", "styler", "curler", "straightener", "shampoo", "oil", "mask", "serum", "scalp", "treatment", "spray", "comb", "brush", "bonnet", "scrunchie", "clip", "pomade", "wax"],
      productIds: [
      "dyson-airwrap-multi-styler-complete-long",
      "dyson-supersonic-hair-dryer",
      "olaplex-no-3-hair-perfector",
      "shark-flexstyle-air-styling-system",
      "kerastase-elixir-ultime-hair-oil",
      "moroccanoil-treatment-original",
      "loreal-professionnel-absolut-repair-mask",
      "philips-thermoprotect-hair-dryer",
      "alan-truman-blow-dry-brush",
      "revlon-one-step-volumizer",
      "ghd-platinum-plus-straightener",
      "ghd-curve-curling-iron",
      "hair-serum-general",
      "hair-mask-keratin",
      "heat-protectant-spray",
      "color-wow-dream-coat-supernatural-spray",
      "intensive-repair-hair-mask",
      "bond-repair-hair-treatment",
      "scalp-scrub-detox-treatment",
      "rosemary-hair-growth-oil",
      "lightweight-hair-serum",
      "leave-in-conditioner-spray",
      "volumizing-dry-shampoo",
      "curl-defining-hair-cream",
      "anti-humidity-hair-spray",
      "deep-conditioning-hair-oil",
      "hair-gloss-treatment",
      "overnight-hair-repair-serum",
      "scalp-massager-brush",
      "detangling-wet-hair-brush",
      "ceramic-blowout-brush",
      "ionic-hair-dryer",
      "professional-hair-diffuser",
      "automatic-hair-curler",
      "mini-travel-hair-straightener",
      "silicone-scalp-massager",
      "electric-scalp-massager",
      "shampoo-massage-brush",
      "hair-growth-scalp-applicator",
      "hair-steaming-cap",
      "deep-conditioning-heat-cap",
      "satin-hair-bonnet",
      "satin-pillowcase",
      "silk-hair-scrunchie-set",
      "hair-claw-clip-set",
      "minimalist-hair-clip-set",
      "pearl-hair-clip-set",
      "butterfly-hair-clip-set",
      "heatless-curling-headband",
      "automatic-hair-curler-2",
      "cordless-hair-curler",
      "ceramic-hair-straightener",
      "mini-hair-straightener",
      "hair-crimper",
      "hot-air-brush",
      "blowout-brush",
      "hair-diffuser-attachment",
      "hair-styling-wax-stick",
      "hair-styling-pomade",
      "texturizing-hair-spray",
      "volumizing-hair-powder",
      "dry-shampoo",
      "leave-in-conditioner",
      "hair-repair-mask",
      "bond-repair-treatment",
      "anti-frizz-hair-serum",
      "hair-gloss-treatment-2",
      "hair-detangling-comb",
      "wide-tooth-hair-comb",
      "beardo-godfather-beard-oil",
      "hair-oil-indulekha",
      "hair-styling-cream"
],
    },
    {
      id: "nails",
      name: "Nails",
      image: "https://www.themanicurecompany.com/cdn/shop/products/gel-polish-starter-kit-with-pro-lamp-947350.png?v=1700220683",
      keywords: ["nail", "polish", "lamp", "cuticle", "file", "buffer", "press-on", "french tip", "chrome powder", "manicure"],
      productIds: [
      "gel-nail-polish-starter-kit",
      "uv-led-nail-lamp",
      "nail-strengthening-treatment",
      "cuticle-oil-pen",
      "glass-nail-file",
      "nail-buffer-block-set",
      "press-on-nude-nails",
      "french-tip-press-on-nails",
      "chrome-nail-powder-kit",
      "nail-art-brush-set"
],
    },
    {
      id: "body-care",
      name: "Body Care",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80",
      keywords: ["body", "wash", "lotion", "cream", "scrub", "body oil", "butter", "hand cream", "foot cream", "foot soak", "deodorant", "shower gel"],
      productIds: [
      "sol-de-janeiro-brazilian-bum-bum-cream",
      "body-wash-coconut-vanilla",
      "exfoliating-body-wash",
      "hydrating-body-lotion",
      "shea-butter-body-cream",
      "body-scrub-brown-sugar",
      "body-scrub-mcaffeine",
      "body-oil-vanilla",
      "dry-body-oil-mist",
      "firming-body-lotion",
      "body-butter-coconut",
      "hand-cream-set",
      "intensive-hand-repair-cream",
      "foot-cream-heel-repair-balm",
      "exfoliating-foot-peel-mask",
      "refreshing-foot-soak",
      "body-polishing-scrub",
      "shower-gel-gift-set",
      "deodorant-body-spray",
      "underarm-brightening-cream",
      "body-mist-warm-vanilla",
      "sol-de-janeiro-cheirosa-59-perfume-mist",
      "tree-hut-shea-sugar-scrub-moroccan-rose",
      "bath-and-body-works-japanese-cherry-blossom",
      "bath-body-works-vanilla-mist",
      "victorias-secret-bombshell-mist",
      "body-lotion-nivea",
      "body-wash-dove",
      "body-oil-nuxe",
      "deodorant-wild-stone",
      "hand-cream-loccitane",
      "body-mist-nykaa",
      "sol-de-janeiro-body-wash",
      "sol-de-janeiro-bom-dia-cream"
],
    },
    {
      id: "fragrance",
      name: "Fragrance",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=300&q=80",
      keywords: ["parfum", "perfume", "edp", "edt", "cologne", "mist", "fragrance", "scent", "candle", "oud", "vanilla", "rose", "citrus", "amber"],
      productIds: [
      "dior-sauvage-eau-de-parfum",
      "ysl-libre-eau-de-parfum",
      "chanel-coco-mademoiselle-edp",
      "sol-de-janeiro-cheirosa-68-perfume-mist",
      "carolina-herrera-good-girl-edp",
      "cheirosa-59-delicia-drench-mist",
      "kayali-vanilla-28-eau-de-parfum",
      "tom-ford-tobacco-vanille-edp",
      "maison-margiela-replica-jazz-club",
      "lattafa-khamrah-eau-de-parfum",
      "ajmal-aristocrat-perfume-for-her",
      "signature-perfume",
      "scented-candle",
      "eau-de-parfum-floral",
      "eau-de-parfum-vanilla",
      "eau-de-parfum-oud",
      "eau-de-parfum-rose",
      "eau-de-parfum-fresh-citrus",
      "eau-de-parfum-woody-amber",
      "long-lasting-body-mist",
      "hair-body-fragrance-mist",
      "mini-perfume-discovery-set",
      "travel-perfume-atomizer-set",
      "roll-on-perfume-oil",
      "solid-perfume-balm",
      "unisex-eau-de-parfum",
      "luxury-perfume-gift-set",
      "fresh-aquatic-cologne",
      "warm-spicy-cologne",
      "floral-perfume-gift-set",
      "vanilla-fragrance-mist",
      "musk-perfume-oil",
      "oud-perfume-oil",
      "hair-perfume-mist",
      "jo-malone-english-pear-and-freesia-cologne",
      "zara-red-vanilla",
      "zara-rich-warm-addictive",
      "dior-miss-dior-edp",
      "ariana-grande-cloud-edp",
      "kayali-eden-juicy-apple",
      "jo-malone-wood-sage"
],
    },
    {
      id: "beauty-tools",
      name: "Beauty Tools",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=300&q=80",
      keywords: ["tool", "device", "roller", "gua sha", "ice roller", "steamer", "blackhead", "cleansing brush", "wand", "microcurrent", "toning", "derma roller", "brush set", "beauty blender", "sponge", "curler", "mirror", "organizer", "train case"],
      productIds: [
      "medicube-age-r-booster-pro",
      "philips-oneblade-pro-face-and-body",
      "facial-ice-roller",
      "stainless-steel-gua-sha",
      "facial-roller-rose-quartz",
      "microcurrent-facial-device",
      "facial-steamer",
      "electric-blackhead-remover",
      "sonic-facial-cleansing-brush",
      "facial-massage-wand",
      "led-light-therapy-wand",
      "makeup-brush-cleaning-machine",
      "professional-makeup-brush-set",
      "beauty-blender-sponge-set",
      "eyelash-curler",
      "heated-eyelash-curler",
      "electric-makeup-brush-cleaner",
      "makeup-mirror-with-led-lights",
      "travel-makeup-organizer",
      "cosmetic-storage-organizer",
      "makeup-train-case",
      "vanity-beauty-storage-box",
      "facial-ice-roller-2",
      "stainless-steel-facial-roller",
      "electric-facial-cleansing-brush",
      "silicone-face-cleansing-brush",
      "pore-vacuum-cleaner",
      "blackhead-removal-tool-kit",
      "facial-exfoliating-brush",
      "facial-cleansing-spatula",
      "led-light-therapy-face-mask-2",
      "reusable-under-eye-masks",
      "facial-mist-sprayer",
      "facial-steamer-with-aromatherapy",
      "microcurrent-facial-device-2",
      "facial-toning-device",
      "high-frequency-facial-wand",
      "derma-roller",
      "gua-sha-body-massage-tool",
      "ice-globes-for-face",
      "foreo-luna-4-facial-cleansing-device",
      "nuface-trinity-microcurrent-device",
      "rose-quartz-gua-sha-facial-roller-set",
      "led-light-therapy-face-mask",
      "bombay-shaving-company-precision-safety-razor",
      "makeup-brush-set",
      "beauty-blender-original",
      "makeup-organizer-acrylic",
      "vanity-mirror-led",
      "makeup-bag-travel",
      "heatless-curlers",
      "gua-sha-jade",
      "skincare-fridge",
      "nail-kit-gel",
      "hair-brush-wet",
      "at-home-manicure-set"
],
    },
  ],
  electronics: [
    {
      id: "mobile",
      name: "Mobile",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80",
      keywords: ["iphone", "galaxy", "pixel", "oneplus", "xiaomi", "mobile", "phone", "smartphone", "ipad", "tablet"],
      sourceCategorySlug: "mobile",
    },
    {
      id: "laptops",
      name: "Laptops",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=300&q=80",
      keywords: ["macbook", "laptop", "xps", "thinkpad", "surface", "zenbook", "proart", "razer blade", "swift", "spectre", "notebook", "chromebook", "dell", "lenovo", "asus", "hp"],
      productIds: ["macbook-pro", "macbook-air", "macbook-neo", "lenovo-thinkpad", "lenovo-laptop", "hp-laptop", "dell-laptop"],
    },
    {
      id: "audio",
      name: "Audio",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80",
      keywords: ["airpods", "headphones", "earbuds", "buds", "ear", "cmf", "marshall", "sony wf", "sony wh", "headphone", "audio"],
      productIds: [
        "airpods",
        "airpods-pro",
        "airpods-max",
        "sony-wf-1000xm6",
        "sony-wf-1000xm5",
        "sony-wh-1000xm6",
        "sony-wh-1000xm5",
        "samsung-galaxy-buds4-pro",
        "galaxy-buds4",
        "galaxy-buds3-pro",
        "galaxy-buds3",
        "pixel-buds-pro-2",
        "pixel-buds-2a",
        "headphone-1",
        "ear-open",
        "cmf-headphone-pro",
        "ear",
        "ear-a",
        "cmf-buds-2-plus",
        "cmf-buds-pro-2",
        "marshall-headphones",
        "marshall-earbuds",
      ],
    },
    {
      id: "gaming",
      name: "Gaming",
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=300&q=80",
      keywords: ["playstation", "ps5", "xbox", "gamepad", "controller", "gaming", "keyboard", "mouse", "speaker", "soundbar", "echo", "sony-ps5"],
    },
    {
      id: "watches",
      name: "Watches",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
      keywords: ["watch", "smartwatch", "apple watch", "galaxy watch", "pixel watch", "garmin", "fenix"],
      productIds: [
        "apple-watch",
        "apple-watch-ultra",
        "samsung-galaxy-watch",
        "google-pixel-watch",
        "garmin-fenix",
      ],
    },
  ],
  vehicles: [
    {
      id: "bikes",
      name: "Bikes",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=300&q=80",
      keywords: ["bike", "motorcycle", "ducati", "kawasaki", "harley", "bullet", "royalenfield", "royal enfield", "bmw s1000rr", "yamaha", "hayabusa", "panigale", "ninja", "triumph", "ktm", "scooter", "vespa", "interceptor", "continental", "himalayan", "speed 400", "activa", "aprilia", "hunter", "classic 350", "meteor", "street triple", "speed triple", "z900", "zx-10r", "h2", "streetfighter", "multistrada", "diavel", "monster", "desertx", "r15", "mt-15", "r3", "duke", "rc 390", "super duke", "fat boy", "street bob", "road king", "chetak", "ola", "ather", "jupiter", "aerox"],
    },
    {
      id: "cars",
      name: "Cars",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=300&q=80",
      keywords: ["car", "porsche", "ferrari", "lamborghini", "bmw m", "mercedes", "amg", "audi", "thar", "defender", "mustang", "gt3", "supra", "corvette", "rolls royce", "land cruiser", "range rover", "m3", "m4", "m5", "911", "urus", "g-wagon", "mclaren", "aston martin", "bugatti", "koenigsegg", "pagani", "hypercar", "supercar", "chiron", "veyron", "tourbillon", "jesko", "utopia", "valkyrie", "speedtail", "senna", "revuelto", "sf90", "daytona sp3", "monza", "stradale", "roma", "huracan", "aventador", "svj", "artura", "750s", "765lt", "p1", "db12", "dbs", "vantage", "cullinan", "phantom", "spectre", "bentayga", "continental gt", "maybach", "gt-r", "viper", "shelby"],
    },
  ],
};

/**
 * Nested subcategories for Gaming under Electronics
 */
export const GAMING_SUBCATEGORIES: Subcategory[] = [
  {
    id: "console-controllers",
    name: "Console Controllers",
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=300&q=80",
    keywords: ["controller", "gamepad", "dualsense", "playstation 5 console", "evofox deck"],
    productIds: [
      "dualsense-wireless-controller-white",
      "zebronics-max-fury-wired-gamepad",
      "playstation-5-console-standard",
      "playstation-5-console-digital",
      "evofox-deck-2-smartphone-wireless-gaming-controller",
      "zebronics-zeb-max-link-plus-wireless-gamepad",
    ],
  },
  {
    id: "games",
    name: "Games",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80",
    keywords: ["ps5", "game", "ghost of yotei", "spider-man", "last of us", "astro bot", "god of war", "gran turismo", "uncharted"],
    productIds: [
      "sony-ps5-ghost-of-yotei",
      "sony-ps5-marvels-spider-man-miles-morales",
      "sony-ps5-the-last-of-us-part-ii-remastered",
      "sony-ps5-marvel-tokon-fighting-souls",
      "sony-ps5-astro-bot",
      "playstation-god-of-war-ragnarok",
      "sony-gran-turismo-2",
      "sony-ps5-spider-man-2",
      "sony-ghost-of-tsushima",
      "sony-uncharted-legacy-of-thieves-collection",
    ],
  },
  {
    id: "keyboards",
    name: "Keyboards",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80",
    keywords: ["keyboard", "keys", "pebble", "companion", "rapoo", "katana", "logitech-mk240", "portronics-wireless-keyboard"],
    productIds: [
      "logitech-pebble-keys-2-k380s-graphite",
      "zebronics-companion-201-24ghz-wireless-keyboard",
      "rapoo-e9050l-bluetooth-wireless-multi-device-keyboard",
      "evofox-katana-x2-tkl-wired-mechanical-gaming-keyboard",
      "logitech-mk240-nano-wireless-usb-keyboard",
      "portronics-wireless-keyboard",
    ],
  },
  {
    id: "mouse",
    name: "Mouse",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=300&q=80",
    keywords: ["mouse", "g502", "g402", "shark lite", "banshee", "toad 8", "war m"],
    productIds: [
      "logitech-g502-hero-high-performance-gaming-mouse",
      "logitech-g402-hyperion-fury-usb-wired-gaming-mouse",
      "zebronics-shark-lite-gaming-mouse",
      "evofox-banshee-tri-mode-wireless-gaming-mouse",
      "portronics-toad-8-transparent-wireless-bluetooth-mouse",
      "zebronics-war-m-wired-gaming-mouse",
    ],
  },
  {
    id: "speakers",
    name: "Speakers",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=300&q=80",
    keywords: ["speaker", "soundbar", "echo", "alexa", "jbl go", "partypal"],
    productIds: [
      "sony-new-sa-d40m2-speaker",
      "amazon-echo-show-8",
      "amazon-echo-4th-gen",
      "jbl-cinema-sb150-200w-soundbar",
      "sony-srs-xb100-wireless-bluetooth-speaker",
      "jbl-go-4-wireless-bluetooth-speaker",
      "philips-tax2208-party-speaker",
      "boat-partypal-65-pro",
    ],
  },
];

export const ALL_GAMING_PRODUCT_IDS = GAMING_SUBCATEGORIES.flatMap(
  (s) => s.productIds || []
);

export function getSubcategoriesForCategory(categorySlug: string): Subcategory[] {
  return CATEGORY_SUBCATEGORIES[categorySlug.toLowerCase()] || [];
}

export function getGamingSubcategories(): Subcategory[] {
  return GAMING_SUBCATEGORIES;
}

export function getSubcategoryDef(categorySlug: string, subId: string): Subcategory | undefined {
  const subs = getSubcategoriesForCategory(categorySlug);
  return subs.find((s) => s.id === subId.toLowerCase());
}

export function getGamingSubcategoryDef(childId: string): Subcategory | undefined {
  return GAMING_SUBCATEGORIES.find((s) => s.id === childId.toLowerCase());
}

export function matchesSubcategory(
  item: { name: string; slug: string },
  categorySlug: string,
  subId: string
): boolean {
  const normalizedCategory = categorySlug.toLowerCase();
  const normalizedSubId = subId.toLowerCase();

  const subDef = getSubcategoryDef(normalizedCategory, normalizedSubId);
  if (!subDef) return true;

  // Food, Drinks, and Beauty subcategory exact matching when productIds defined
  if (
    (normalizedCategory === "food" || normalizedCategory === "drinks" || normalizedCategory === "beauty") &&
    subDef.productIds &&
    subDef.productIds.length > 0
  ) {
    return subDef.productIds.includes(item.slug);
  }

  // Exact product ID match if available
  if (subDef.productIds && subDef.productIds.length > 0) {
    if (subDef.productIds.includes(item.slug)) {
      return true;
    }
  }

  // Special vehicle logic
  if (normalizedCategory === "vehicles") {
    const bikesDef = getSubcategoryDef("vehicles", "bikes");
    const isBike = bikesDef?.keywords.some(
      (kw) =>
        item.name.toLowerCase().includes(kw) ||
        item.slug.toLowerCase().includes(kw)
    );

    if (normalizedSubId === "bikes") {
      return Boolean(isBike);
    }
    if (normalizedSubId === "cars") {
      // Anything in Vehicles that is not a bike is considered a Car / Supercar / Hypercar
      return !isBike;
    }
  }

  // Gaming overall under Electronics
  if (normalizedCategory === "electronics" && normalizedSubId === "gaming") {
    return ALL_GAMING_PRODUCT_IDS.includes(item.slug);
  }

  // Exclude Relaxed French Terry Drawstring Shorts from Fashion -> Jewellery subcategory
  if (normalizedCategory === "fashion" && normalizedSubId === "jewellery") {
    if (
      item.slug === "relaxed-french-terry-drawstring-shorts" ||
      item.name.toLowerCase().includes("drawstring shorts")
    ) {
      return false;
    }
  }

  const nameLower = item.name.toLowerCase();
  const slugLower = item.slug.toLowerCase();

  return subDef.keywords.some(
    (kw) => nameLower.includes(kw.toLowerCase()) || slugLower.includes(kw.toLowerCase())
  );
}

export function matchesGamingChild(
  item: { name: string; slug: string },
  childId: string
): boolean {
  const childDef = getGamingSubcategoryDef(childId);
  if (!childDef) return ALL_GAMING_PRODUCT_IDS.includes(item.slug);

  if (childDef.productIds && childDef.productIds.includes(item.slug)) {
    return true;
  }

  const nameLower = item.name.toLowerCase();
  const slugLower = item.slug.toLowerCase();

  return childDef.keywords.some(
    (kw) => nameLower.includes(kw.toLowerCase()) || slugLower.includes(kw.toLowerCase())
  );
}
