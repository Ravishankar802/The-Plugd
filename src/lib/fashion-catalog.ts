/**
 * Comprehensive Fashion Catalog Data Definition for Plugd
 * 
 * Expansive, creator-ready fashion catalog covering Streetwear, Sneakers,
 * Men's, Women's, Unisex, Ethnic Wear, Watches, Bags, Jewellery, Sportswear,
 * Luxury, and Accessories for the Indian market.
 */

import { getFashionProductImage } from "./product-images";

export interface FashionProduct {
  id: string;
  name: string;
  brand: string;
  category: "Fashion";
  subcategory: string;
  sectionId: string;
  sectionTitle: string;
  imageUrl: string;
  description: string;
  gender?: "men" | "women" | "unisex";
  tags: string[];
  badge?: "HOT" | "TRENDING" | "NEW" | "POPULAR" | "PREMIUM" | "BESTSELLER";
  featured?: boolean;
  trending?: boolean;
  displayOrder: number;
}

export interface FashionTopPickItem {
  slug: string;
  rawId: string;
  name: string;
  gender: "men" | "women";
  imageUrl: string;
}

export const FASHION_TOP_PICKS: FashionTopPickItem[] = [
  {
    slug: "air-jordan-1-retro-high-og",
    rawId: "nike-air-jordan-1-retro-high",
    name: "Air Jordan 1 Retro High OG",
    gender: "men",
    imageUrl: "https://limitededt.in/cdn/shop/files/DZ5485-201-1.jpg?v=1782997568&width=2048",
  },
  {
    slug: "nike-dunk-low-retro-panda",
    rawId: "nike-dunk-low-retro",
    name: "Nike Dunk Low Retro 'Panda'",
    gender: "men",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4h1qWP76lZ9RnhHmMcpfBWbg9xpDGtvhR_H_vSIY62whrLm7-OCrcp2M&s=10",
  },
  {
    slug: "adidas-samba-og",
    rawId: "adidas-samba-og",
    name: "Adidas Samba OG",
    gender: "men",
    imageUrl: "https://assets.adidas.com/images/w_500,f_auto,q_auto/011744ef273d4a66b9cc880b980340a2_9366/Samba_OG_Shoes_White_ID0478_01_standard.jpg",
  },
  {
    slug: "new-balance-550",
    rawId: "new-balance-550",
    name: "New Balance 550",
    gender: "men",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW9LLUdtDCn4gvFwe1YofJATHjdUfJU51sH_mN0BQcu0y5IOSQ0yFgg8E1&s=10",
  },
  {
    slug: "asics-gel-kayano-14",
    rawId: "asics-gel-kayano-14",
    name: "ASICS GEL-Kayano 14",
    gender: "men",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUldLyyS3lrXP8hDOpF-TPHA-_3ZrF5Hwfh7aEr8MjRH0JfvEJuu0mG09Q&s=10",
  },
  {
    slug: "birkenstock-boston-suede-leather-clogs",
    rawId: "birkenstock-boston-clog",
    name: "Birkenstock Boston Suede Leather Clogs",
    gender: "men",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTja0GMlAjmI902v179LvIKpWFTsAGk97QCd5v3NzmmFxCpgl1UrxMnj68&s=10",
  },
  {
    slug: "240-gsm-heavyweight-oversized-graphic-tee",
    rawId: "heavyweight-oversized-graphic-tee",
    name: "240 GSM Heavyweight Oversized Graphic Tee",
    gender: "men",
    imageUrl: "https://m.media-amazon.com/images/I/618AzSaRSjL._AC_UY1100_.jpg",
  },
  {
    slug: "400-gsm-boxy-drop-shoulder-fleece-hoodie",
    rawId: "boxy-drop-shoulder-hoodie",
    name: "400 GSM Boxy Drop-Shoulder Fleece Hoodie",
    gender: "men",
    imageUrl: "https://shopfreezestudios.com/cdn/shop/files/1_4.png?v=1757509893",
  },
  {
    slug: "retro-wool-blend-varsity-bomber-jacket",
    rawId: "varsity-bomber-jacket",
    name: "Retro Wool-Blend Varsity Bomber Jacket",
    gender: "men",
    imageUrl: "https://m.media-amazon.com/images/I/81sbKthGDmL._AC_SX569_.jpg",
  },
  {
    slug: "multi-pocket-utilitarian-relaxed-cargo-pants",
    rawId: "relaxed-fit-utilitarian-cargo-pants",
    name: "Multi-Pocket Utilitarian Relaxed Cargo Pants",
    gender: "men",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt8Lxf2iEPyOtRC0OduziidInpAAZGmrKCAvakI01I4D2wPy-XkQbQF4ne&s=10",
  },
  {
    slug: "levi-s-501-original-straight-fit-jeans",
    rawId: "levis-501-original-straight-jeans",
    name: "Levi's 501 Original Straight Fit Jeans",
    gender: "men",
    imageUrl: "https://cdn-images.farfetch-contents.com/19/32/75/95/19327595_42426661_600.jpg",
  },
  {
    slug: "bias-cut-silk-satin-slip-midi-dress",
    rawId: "satin-slip-midi-dress",
    name: "Bias-Cut Silk-Satin Slip Midi Dress",
    gender: "women",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJC6mmUbvNlBH8ovEb6fFtj92vSn12gpk1MWC4Fg7N-Q&s=10",
  },
  {
    slug: "oversized-double-breasted-tailored-blazer",
    rawId: "oversized-structured-blazer",
    name: "Oversized Double-Breasted Tailored Blazer",
    gender: "women",
    imageUrl: "https://i.etsystatic.com/21241626/r/il/de89e0/4090610125/il_570xN.4090610125_7wfl.jpg",
  },
  {
    slug: "handloom-pure-katan-banarasi-silk-saree",
    rawId: "handloom-banarasi-silk-saree",
    name: "Handloom Pure Katan Banarasi Silk Saree",
    gender: "women",
    imageUrl: "https://aurabenaras.com/cdn/shop/files/IMG_6186.jpg?v=1776282515&width=1080",
  },
  {
    slug: "handcrafted-lucknowi-chikankari-kurta",
    rawId: "chikankari-embroidered-cotton-kurta",
    name: "Handcrafted Lucknowi Chikankari Kurta",
    gender: "women",
    imageUrl: "https://hayatslucknowi.com/cdn/shop/files/Zeenat_Sabz_Green_Rayon_Lucknowi_Chikankari_Kurta_Set_with_Dupatta_by_Hayats_Lucknowi.webp?v=1774276697",
  },
];

export interface FashionSection {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  displayOrder: number;
  productIds: string[];
}

export const FASHION_SECTIONS: FashionSection[] = [
  {
    id: "trending-fashion",
    title: "Trending Fashion",
    subtitle: "Most desired sneakers, oversized street layers, iconic timepieces, and creator wardrobe staples",
    badge: "🔥 Hot",
    displayOrder: 1,
    productIds: [
      "nike-air-jordan-1-retro-high",
      "adidas-samba-og",
      "heavyweight-oversized-graphic-tee",
      "casio-vintage-digital-a168",
      "new-balance-550",
      "boxy-drop-shoulder-hoodie",
      "relaxed-fit-utilitarian-cargo-pants",
      "vintage-retro-tinted-sunglasses",
      "asics-gel-kayano-14",
      "handloom-banarasi-silk-saree",
      "tissot-prx-powermatic-80",
      "minimalist-leather-crossbody-sling",
      "satin-slip-midi-dress",
      "birkenstock-boston-clog",
    ],
  },
  {
    id: "sneaker-culture",
    title: "Sneaker Culture (Nike, Jordan, Adidas, NB)",
    subtitle: "Hype retros, skate icons, terrace classics, and everyday lifestyle runners",
    badge: "👟 Sneakers",
    displayOrder: 2,
    productIds: [
      "nike-air-jordan-1-retro-high",
      "air-jordan-1",
      "nike-dunk-low-retro",
      "nike-air-force-1-07",
      "adidas-samba-og",
      "adidas-gazelle-indoor",
      "adidas-originals-campus-00s",
      "adidas-originals",
      "new-balance-550",
      "new-balance-9060",
      "new-balance-1906r",
      "asics-gel-kayano-14",
      "asics-gel-nyc",
      "puma-palermo-leather",
      "puma-suede-classic",
      "converse-chuck-70-vintage",
      "vans-old-skool-classic",
      "on-cloudmonster-2",
      "sneakers",
      "new-balance-2002r",
      "new-balance-530",
      "nike-air-max-90",
      "nike-air-max-1",
      "nike-blazer-mid-77",
      "adidas-handball-spezial",
      "on-cloud-5",
      "nike-air-max-97",
      "adidas-gazelle-bold",
      "puma-speedcat-og"
    ],
  },
  {
    id: "streetwear-creator-fits",
    title: "Streetwear & Creator Fits",
    subtitle: "Boxy silhouettes, drop shoulders, utilitarian details, and visual statement pieces for content creators",
    badge: "🛹 Streetwear",
    displayOrder: 3,
    productIds: [
      "heavyweight-oversized-graphic-tee",
      "boxy-drop-shoulder-hoodie",
      "oversized-hoodie",
      "varsity-bomber-jacket",
      "statement-jacket",
      "relaxed-fit-utilitarian-cargo-pants",
      "baggy-90s-skater-jeans",
      "vintage-washed-denim-jacket",
      "cuban-link-stainless-steel-chain",
      "unstructured-dad-cap",
      "minimalist-leather-crossbody-sling",
      "birkenstock-boston-clog",
      "oversized-plain-tee",
      "boxy-fit-tee",
      "vintage-acid-wash-tee",
      "parachute-pants",
      "bomber-jacket",
      "denim-jacket-classic"
    ],
  },
  {
    id: "mens-style-essentials",
    title: "Men's Style & Everyday Essentials",
    subtitle: "Refined polos, breathable linen shirts, tailored chinos, selvedge denim, and versatile loafers",
    badge: "👔 Men's Edit",
    displayOrder: 4,
    productIds: [
      "pure-linen-resort-shirt",
      "tailored-oxford-cotton-shirt",
      "pima-cotton-polo-shirt",
      "levis-501-original-straight-jeans",
      "pleated-tailored-smart-trousers",
      "slim-tapered-stretch-chinos",
      "suede-penny-loafers",
      "chelsea-leather-boots",
      "full-grain-leather-pin-buckle-belt",
      "seiko-5-sports-automatic-watch",
      "basic-heavyweight-t-shirt",
      "oversized-shirt-men",
      "relaxed-fit-shirt",
      "polo-tshirt-classic"
    ],
  },
  {
    id: "womens-contemporary-edit",
    title: "Women's Edit & Contemporary Silhouettes",
    subtitle: "Fluid midi dresses, tailored wide-leg trousers, structured blazers, and versatile capsule staples",
    badge: "✨ Women's Edit",
    displayOrder: 5,
    productIds: [
      "satin-slip-midi-dress",
      "fluid-linen-summer-maxi-dress",
      "oversized-structured-blazer",
      "ribbed-knit-seamless-crop-top",
      "wide-leg-high-waist-trousers",
      "floral-wrap-mini-dress",
      "cotton-poplin-oversized-shirt",
      "leather-structure-shoulder-handbag",
      "strappy-block-heels",
      "chunky-platform-loafers",
      "baby-tee",
      "crop-top-basic",
      "ribbed-tank-top",
      "corset-top",
      "tube-top",
      "off-shoulder-top",
      "graphic-tee-womens",
      "oversized-shirt-womens",
      "cardigan-womens",
      "knit-top-womens",
      "zip-hoodie-womens",
      "oversized-hoodie-womens",
      "baggy-jeans-womens",
      "wide-leg-jeans-womens",
      "cargo-pants-womens",
      "parachute-pants-womens",
      "denim-skirt",
      "mini-skirt-pleated",
      "midi-skirt-satin",
      "maxi-skirt",
      "co-ord-set-womens",
      "casual-dress",
      "bodycon-dress",
      "oversized-jacket-womens",
      "denim-jacket-womens",
      "bomber-jacket-womens",
      "leather-style-jacket-womens",
      "oversized-tee-womens"
    ],
  },
  {
    id: "indian-ethnic-festive",
    title: "Indian & Festive Ethnic Wear",
    subtitle: "Handloom Banarasi sarees, embroidered kurtas, raw silk Nehru jackets, and handcrafted mojaris",
    badge: "🥻 Indian Festive",
    displayOrder: 6,
    productIds: [
      "handloom-banarasi-silk-saree",
      "chikankari-embroidered-cotton-kurta",
      "chanderi-silk-anarkali-suit-set",
      "raw-silk-festive-nehru-jacket",
      "designer-embroidered-lehenga-choli",
      "mens-silk-blend-kurta-pajama-set",
      "traditional-bandhgala-suit",
      "handcrafted-kolhapuri-mojaris",
    ],
  },
  {
    id: "timepieces-watches",
    title: "Timepieces & Iconic Watches",
    subtitle: "Retro digital classics, rugged G-Shocks, Swiss automatics, and smart wearable essentials",
    badge: "⌚ Watches",
    displayOrder: 7,
    productIds: [
      "casio-vintage-digital-a168",
      "casio-g-shock-ga-2100-casioak",
      "titan-edge-ceramic-slim-watch",
      "seiko-5-sports-automatic-watch",
      "tissot-prx-powermatic-80",
      "apple-watch-ultra-2",
      "fossil-grant-chronograph-leather-watch",
      "minimalist-watch"
    ],
  },
  {
    id: "bags-backpacks-carry",
    title: "Bags, Backpacks & Everyday Carry",
    subtitle: "Waterproof tech bags, commuter backpacks, heavy canvas totes, and leather crossbody slings",
    badge: "🎒 Bags & Carry",
    displayOrder: 8,
    productIds: [
      "minimalist-leather-crossbody-sling",
      "heavy-canvas-work-tote-bag",
      "leather-structure-shoulder-handbag",
      "slim-leather-rfid-cardholder-wallet",
      "crossbody-bag-men",
      "everyday-backpack"
    ],
  },
  {
    id: "activewear-sportswear",
    title: "Activewear & Sportswear",
    subtitle: "High-performance moisture-wicking tees, training joggers, marathon running shoes, and gym gear",
    badge: "🏃 Sportswear",
    displayOrder: 9,
    productIds: [
      "nike-dri-fit-training-t-shirt",
      "adidas-tiro-training-track-pants",
      "nike-air-max-plus",
      "nike-running-shoes",
      "adidas-ultraboost-light",
      "on-cloudmonster-2",
      "under-armour-heatgear-compression-top",
      "puma-drycell-running-shorts"
    ],
  },
  {
    id: "premium-luxury-statements",
    title: "Premium & Luxury Statements",
    subtitle: "Heritage tailoring, premium leather goods, virgin wool blazers, and iconic designer silhouettes",
    badge: "👑 Luxury",
    displayOrder: 10,
    productIds: [
      "ralph-lauren-custom-fit-oxford",
      "tommy-hilfiger-yacht-bomber-jacket",
      "coach-leather-tabby-shoulder-bag",
      "hugo-boss-virgin-wool-blazer",
      "calvin-klein-minimalist-monogram-tee",
      "tissot-prx-powermatic-80",
      "traditional-bandhgala-suit",
    ],
  },
  {
    id: "footwear-beyond-sneakers",
    title: "Footwear Beyond Sneakers",
    subtitle: "Suede penny loafers, leather Chelsea boots, handcrafted mojaris, and elevated clogs",
    badge: "👞 Footwear",
    displayOrder: 11,
    productIds: [
      "suede-penny-loafers",
      "chelsea-leather-boots",
      "birkenstock-boston-clog",
      "crocs-classic-clog",
      "chunky-platform-loafers",
      "strappy-block-heels",
      "handcrafted-kolhapuri-mojaris",
    ],
  },
  {
    id: "jewellery-accessories",
    title: "Statement Jewellery & Accessories",
    subtitle: "Cuban link chains, signet rings, tinted sunglasses, baseball caps, and full-grain leather belts",
    badge: "💍 Accessories",
    displayOrder: 12,
    productIds: [
      "vintage-retro-tinted-sunglasses",
      "sunglasses",
      "cuban-link-stainless-steel-chain",
      "minimalist-silver-signet-ring",
      "unstructured-dad-cap",
      "full-grain-leather-pin-buckle-belt",
      "slim-leather-rfid-cardholder-wallet",
      "leather-wallet",
      "classic-belt",
      "cap-classic"
    ],
  },
  {
    id: "tops-hoodies-layers",
    title: "Casual Tops, Hoodies & Layers",
    subtitle: "Heavyweight tees, relaxed flannels, corduroy overshirts, and zip hoodies",
    badge: "👕 Tops & Layers",
    displayOrder: 13,
    productIds: [
      "heavyweight-oversized-graphic-tee",
      "boxy-drop-shoulder-hoodie",
      "oversized-hoodie",
      "flannel-plaid-overshirt",
      "corduroy-zip-overshirt",
      "crewneck-minimalist-sweatshirt",
      "knit-boxy-cardigan",
      "basic-heavyweight-t-shirt",
      "zip-up-hoodie",
      "flannel-checkered-shirt",
      "overshirt-men"
    ],
  },
  {
    id: "bottoms-cargos-denims",
    title: "Bottoms: Cargos, Denims & Relaxed Fits",
    subtitle: "Baggy 90s skater cuts, selvedge straight leg jeans, utilitarian cargos, and tailored pleats",
    badge: "👖 Bottoms",
    displayOrder: 14,
    productIds: [
      "relaxed-fit-utilitarian-cargo-pants",
      "levis-501-original-straight-jeans",
      "baggy-90s-skater-jeans",
      "pleated-tailored-smart-trousers",
      "wide-leg-high-waist-trousers",
      "slim-tapered-stretch-chinos",
      "everyday-cotton-drawstring-shorts",
      "wide-leg-jeans-mens",
      "carpenter-pants"
    ],
  },
  {
    id: "budget-wardrobe-essentials",
    title: "Student & Budget Wardrobe Essentials",
    subtitle: "High-value foundational basics, everyday canvas kicks, durable backpacks, and classic tees",
    badge: "💰 Budget Picks",
    displayOrder: 15,
    productIds: [
      "basic-heavyweight-t-shirt",
      "converse-chuck-70-vintage",
      "vans-old-skool-classic",
      "everyday-cotton-drawstring-shorts",
      "casio-vintage-digital-a168",
      "heavy-canvas-work-tote-bag",
      "unstructured-dad-cap",
    ],
  },
  {
    id: "creator-aesthetic",
    title: "Creator Aesthetic (Signature Looks)",
    subtitle: "Curated statement pieces for creators building a distinctive on-camera and street persona",
    badge: "📸 Creator Style",
    displayOrder: 16,
    productIds: [
      "vintage-retro-tinted-sunglasses",
      "varsity-bomber-jacket",
      "statement-jacket",
      "boxy-drop-shoulder-hoodie",
      "adidas-samba-og",
      "nike-air-jordan-1-retro-high",
      "tissot-prx-powermatic-80",
      "minimalist-leather-crossbody-sling",
      "cuban-link-stainless-steel-chain",
    ],
  },
  {
    id: "ipl-sports-jerseys",
    title: "IPL & Sports Jerseys",
    subtitle: "Official match-day jerseys from IPL franchises and European football giants",
    badge: "🏏 Jerseys",
    displayOrder: 17,
    productIds: [
      "rcb-ipl-jersey",
      "mumbai-indians-ipl-jersey",
      "csk-ipl-jersey",
      "fc-barcelona-jersey",
      "real-madrid-jersey"
    ],
  },
  {
    id: "womens-footwear",
    title: "Women's Footwear",
    subtitle: "Trending sneakers, ballet flats, Mary Janes, platforms, heels, and everyday sandals",
    badge: "👡 Women's Footwear",
    displayOrder: 18,
    productIds: [
      "adidas-samba-womens",
      "adidas-gazelle-womens",
      "nike-dunk-low-womens",
      "new-balance-550-womens",
      "ballet-flats",
      "mary-jane-shoes",
      "platform-sneakers-womens",
      "chunky-sneakers-womens",
      "heels-stiletto",
      "everyday-sandals-womens"
    ],
  },
  {
    id: "womens-indian-ethnic",
    title: "Women's Indian & Ethnic Wear",
    subtitle: "Kurta sets, Anarkali suits, sarees, pre-draped sarees, and handcrafted ethnic jewellery",
    badge: "🥻 Ethnic",
    displayOrder: 19,
    productIds: [
      "kurta-set-womens",
      "anarkali-set",
      "co-ord-ethnic-set",
      "pre-draped-saree",
      "silk-saree",
      "lehenga-festive",
      "statement-dupatta",
      "jhumka-earrings",
      "oxidised-jewellery-set",
      "minimal-gold-jewellery"
    ],
  },
  {
    id: "womens-accessories",
    title: "Women's Bags, Jewellery & Accessories",
    subtitle: "Shoulder bags, tote bags, mini bags, scrunchies, claw clips, stacking rings, and layered necklaces",
    badge: "👜 Accessories",
    displayOrder: 20,
    productIds: [
      "shoulder-bag-womens",
      "tote-bag-womens",
      "mini-bag-womens",
      "crossbody-bag-womens",
      "baguette-bag",
      "sunglasses-cat-eye",
      "cap-womens",
      "hair-accessories-set",
      "scrunchies-set",
      "claw-clip-set",
      "belt-womens",
      "minimal-rings-set",
      "bracelet-chain",
      "layered-necklace",
      "earrings-hoop",
      "earrings-statement",
      "sunglasses-retro-womens"
    ],
  }
];

/** Full list of Fashion products */
export const RAW_FASHION_PRODUCTS: Array<{
  id: string;
  name: string;
  brand: string;
  subcategory: string;
  sectionId: string;
  sectionTitle: string;
  description: string;
  gender: "men" | "women" | "unisex";
  tags: string[];
  badge?: "HOT" | "TRENDING" | "NEW" | "POPULAR" | "PREMIUM" | "BESTSELLER";
  featured?: boolean;
  trending?: boolean;
  displayOrder?: number;
}> = [
  {
    "id": "air-jordan-1-retro-high-og",
    "name": "Air Jordan 1 Retro High OG",
    "brand": "Jordan",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "men",
    "tags": [
      "jordan",
      "sneakers & footwear",
      "men",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 1
  },
  {
    "id": "nike-dunk-low-retro-panda",
    "name": "Nike Dunk Low Retro 'Panda'",
    "brand": "Nike",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "men",
    "tags": [
      "nike",
      "sneakers & footwear",
      "men",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 2
  },
  {
    "id": "adidas-samba-og",
    "name": "Adidas Samba OG",
    "brand": "Adidas",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "men",
    "tags": [
      "adidas",
      "sneakers & footwear",
      "men",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 3
  },
  {
    "id": "new-balance-550",
    "name": "New Balance 550",
    "brand": "New Balance",
    "subcategory": "Streetwear",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "men",
    "tags": [
      "new balance",
      "streetwear",
      "men",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 4
  },
  {
    "id": "asics-gel-kayano-14",
    "name": "ASICS GEL-Kayano 14",
    "brand": "ASICS",
    "subcategory": "Streetwear",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "men",
    "tags": [
      "asics",
      "streetwear",
      "men",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 5
  },
  {
    "id": "birkenstock-boston-suede-leather-clogs",
    "name": "Birkenstock Boston Suede Leather Clogs",
    "brand": "Birkenstock",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "men",
    "tags": [
      "birkenstock",
      "sneakers & footwear",
      "men",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 6
  },
  {
    "id": "240-gsm-heavyweight-oversized-graphic-tee",
    "name": "240 GSM Heavyweight Oversized Graphic Tee",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 7
  },
  {
    "id": "400-gsm-boxy-drop-shoulder-fleece-hoodie",
    "name": "400 GSM Boxy Drop-Shoulder Fleece Hoodie",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 8
  },
  {
    "id": "retro-wool-blend-varsity-bomber-jacket",
    "name": "Retro Wool-Blend Varsity Bomber Jacket",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 9
  },
  {
    "id": "multi-pocket-utilitarian-relaxed-cargo-pants",
    "name": "Multi-Pocket Utilitarian Relaxed Cargo Pants",
    "brand": "Plugd Studio",
    "subcategory": "Bottoms",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "bottoms",
      "men",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 10
  },
  {
    "id": "levi-s-501-original-straight-fit-jeans",
    "name": "Levi's 501 Original Straight Fit Jeans",
    "brand": "Levi's",
    "subcategory": "Bottoms",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "men",
    "tags": [
      "levi's",
      "bottoms",
      "men",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 11
  },
  {
    "id": "bias-cut-silk-satin-slip-midi-dress",
    "name": "Bias-Cut Silk-Satin Slip Midi Dress",
    "brand": "Plugd Studio",
    "subcategory": "Dresses & Skirts",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "dresses & skirts",
      "women",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 12
  },
  {
    "id": "oversized-double-breasted-tailored-blazer",
    "name": "Oversized Double-Breasted Tailored Blazer",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 13
  },
  {
    "id": "handloom-pure-katan-banarasi-silk-saree",
    "name": "Handloom Pure Katan Banarasi Silk Saree",
    "brand": "Plugd Studio",
    "subcategory": "Ethnic Wear",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "ethnic wear",
      "women",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 14
  },
  {
    "id": "handcrafted-lucknowi-chikankari-kurta",
    "name": "Handcrafted Lucknowi Chikankari Kurta",
    "brand": "Plugd Studio",
    "subcategory": "Ethnic Wear",
    "sectionId": "trending-fashion",
    "sectionTitle": "Trending Fashion",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "ethnic wear",
      "women",
      "top-picks"
    ],
    "featured": true,
    "trending": true,
    "displayOrder": 15
  },
  {
    "id": "woven-raw-silk-tailored-nehru-jacket",
    "name": "Woven Raw Silk Tailored Nehru Jacket",
    "brand": "Plugd Studio",
    "subcategory": "Ethnic Wear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "ethnic wear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 16
  },
  {
    "id": "casio-vintage-digital-a168wa-1",
    "name": "Casio Vintage Digital A168WA-1",
    "brand": "Casio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "casio",
      "streetwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 17
  },
  {
    "id": "casio-g-shock-ga-2100-casioak",
    "name": "Casio G-Shock GA-2100 'CasiOak'",
    "brand": "Casio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "casio",
      "streetwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 18
  },
  {
    "id": "titan-edge-ceramic-ultra-slim-watch",
    "name": "Titan Edge Ceramic Ultra-Slim Watch",
    "brand": "Titan",
    "subcategory": "Watches",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "titan",
      "watches",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 19
  },
  {
    "id": "tissot-prx-powermatic-80-automatic",
    "name": "Tissot PRX Powermatic 80 Automatic",
    "brand": "Tissot",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "tissot",
      "streetwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 20
  },
  {
    "id": "minimalist-leather-everyday-crossbody-sling",
    "name": "Minimalist Leather Everyday Crossbody Sling",
    "brand": "Plugd Studio",
    "subcategory": "Bags",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "bags",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 22
  },
  {
    "id": "vintage-90s-tinted-acetate-sunglasses",
    "name": "Vintage 90s Tinted Acetate Sunglasses",
    "brand": "Plugd Studio",
    "subcategory": "Accessories",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "accessories",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 23
  },
  {
    "id": "8mm-cuban-link-stainless-steel-chain-necklace",
    "name": "8mm Cuban Link Stainless Steel Chain Necklace",
    "brand": "Plugd Studio",
    "subcategory": "Jewellery",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "jewellery",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 24
  },
  {
    "id": "polo-ralph-lauren-custom-fit-oxford-shirt",
    "name": "Polo Ralph Lauren Custom Fit Oxford Shirt",
    "brand": "Polo Ralph Lauren",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "polo ralph lauren",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 25
  },
  {
    "id": "coach-tabby-26-polished-leather-shoulder-bag",
    "name": "Coach Tabby 26 Polished Leather Shoulder Bag",
    "brand": "Coach",
    "subcategory": "Bags",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "coach",
      "bags",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 26
  },
  {
    "id": "royal-challengers-bengaluru-ipl-jersey",
    "name": "Royal Challengers Bengaluru IPL Jersey",
    "brand": "Plugd Studio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 27
  },
  {
    "id": "mumbai-indians-ipl-jersey",
    "name": "Mumbai Indians IPL Jersey",
    "brand": "Plugd Studio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 28
  },
  {
    "id": "chennai-super-kings-ipl-jersey",
    "name": "Chennai Super Kings IPL Jersey",
    "brand": "Plugd Studio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 29
  },
  {
    "id": "adidas-handball-spezial",
    "name": "Adidas Handball Spezial",
    "brand": "Adidas",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "adidas",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 30
  },
  {
    "id": "air-jordan-1",
    "name": "Air Jordan 1",
    "brand": "Jordan",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "jordan",
      "sneakers & footwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 31
  },
  {
    "id": "nike-air-force-1-07",
    "name": "Nike Air Force 1 '07",
    "brand": "Nike",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "nike",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 32
  },
  {
    "id": "nike-air-max-plus-tn",
    "name": "Nike Air Max Plus TN",
    "brand": "Nike",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "nike",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 33
  },
  {
    "id": "nike-running-shoes",
    "name": "Nike Running Shoes",
    "brand": "Nike",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "nike",
      "sneakers & footwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 34
  },
  {
    "id": "adidas-gazelle-indoor",
    "name": "Adidas Gazelle Indoor",
    "brand": "Adidas",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "adidas",
      "sneakers & footwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 35
  },
  {
    "id": "adidas-originals-campus-00s",
    "name": "Adidas Originals Campus 00s",
    "brand": "Adidas",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "adidas",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 36
  },
  {
    "id": "adidas-originals",
    "name": "Adidas Originals",
    "brand": "Adidas",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "adidas",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 37
  },
  {
    "id": "adidas-ultraboost-light",
    "name": "Adidas Ultraboost Light",
    "brand": "Adidas",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "adidas",
      "streetwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 38
  },
  {
    "id": "new-balance-9060",
    "name": "New Balance 9060",
    "brand": "New Balance",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "new balance",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 39
  },
  {
    "id": "new-balance-1906r",
    "name": "New Balance 1906R",
    "brand": "New Balance",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "new balance",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 40
  },
  {
    "id": "asics-gel-nyc",
    "name": "ASICS GEL-NYC",
    "brand": "ASICS",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "asics",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 41
  },
  {
    "id": "puma-palermo-leather",
    "name": "Puma Palermo Leather",
    "brand": "Puma",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "puma",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 42
  },
  {
    "id": "puma-suede-classic-xxi",
    "name": "Puma Suede Classic XXI",
    "brand": "Puma",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "puma",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 43
  },
  {
    "id": "converse-chuck-70-vintage-canvas",
    "name": "Converse Chuck 70 Vintage Canvas",
    "brand": "Converse",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "converse",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 44
  },
  {
    "id": "vans-old-skool-classic-skate-shoes",
    "name": "Vans Old Skool Classic Skate Shoes",
    "brand": "Vans",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "vans",
      "sneakers & footwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 45
  },
  {
    "id": "on-cloudmonster-2",
    "name": "On Cloudmonster 2",
    "brand": "Plugd Studio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 46
  },
  {
    "id": "sneakers",
    "name": "Sneakers",
    "brand": "Plugd Studio",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "sneakers & footwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 47
  },
  {
    "id": "crocs-classic-clog",
    "name": "Crocs Classic Clog",
    "brand": "Plugd Studio",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "sneakers & footwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 48
  },
  {
    "id": "full-grain-leather-chelsea-boots",
    "name": "Full-Grain Leather Chelsea Boots",
    "brand": "Plugd Studio",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "sneakers & footwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 49
  },
  {
    "id": "italian-suede-penny-loafers",
    "name": "Italian Suede Penny Loafers",
    "brand": "Plugd Studio",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "sneakers & footwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 50
  },
  {
    "id": "chunky-lug-sole-platform-loafers",
    "name": "Chunky Lug-Sole Platform Loafers",
    "brand": "Plugd Studio",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "sneakers & footwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 51
  },
  {
    "id": "minimalist-strappy-block-heels",
    "name": "Minimalist Strappy Block Heels",
    "brand": "Plugd Studio",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "sneakers & footwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 52
  },
  {
    "id": "handcrafted-leather-kolhapuri-mojaris",
    "name": "Handcrafted Leather Kolhapuri Mojaris",
    "brand": "Plugd Studio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "streetwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 53
  },
  {
    "id": "oversized-hoodie",
    "name": "Oversized Hoodie",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 54
  },
  {
    "id": "statement-jacket",
    "name": "Statement Jacket",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 55
  },
  {
    "id": "brushed-cotton-plaid-flannel-overshirt",
    "name": "Brushed Cotton Plaid Flannel Overshirt",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 56
  },
  {
    "id": "levi-s-trucker-denim-jacket",
    "name": "Levi's Trucker Denim Jacket",
    "brand": "Levi's",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "levi's",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 57
  },
  {
    "id": "fine-wale-corduroy-zip-overshirt",
    "name": "Fine Wale Corduroy Zip Overshirt",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 58
  },
  {
    "id": "minimalist-loopback-cotton-crewneck",
    "name": "Minimalist Loopback Cotton Crewneck",
    "brand": "Plugd Studio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "streetwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 59
  },
  {
    "id": "textured-knit-boxy-button-cardigan",
    "name": "Textured Knit Boxy Button Cardigan",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 60
  },
  {
    "id": "supima-cotton-heavyweight-crewneck-tee",
    "name": "Supima Cotton Heavyweight Crewneck Tee",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 61
  },
  {
    "id": "tailored-pima-cotton-polo-shirt",
    "name": "Tailored Pima Cotton Polo Shirt",
    "brand": "Polo Ralph Lauren",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "polo ralph lauren",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 62
  },
  {
    "id": "pure-european-linen-resort-collar-shirt",
    "name": "Pure European Linen Resort Collar Shirt",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 63
  },
  {
    "id": "classic-oxford-cloth-button-down-shirt",
    "name": "Classic Oxford Cloth Button-Down Shirt",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 64
  },
  {
    "id": "90s-baggy-wide-leg-skater-jeans",
    "name": "90s Baggy Wide-Leg Skater Jeans",
    "brand": "Plugd Studio",
    "subcategory": "Bags",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "bags",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 65
  },
  {
    "id": "double-pleated-tailored-wide-trousers",
    "name": "Double-Pleated Tailored Wide Trousers",
    "brand": "Plugd Studio",
    "subcategory": "Bottoms",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "bottoms",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 66
  },
  {
    "id": "high-waist-fluid-wide-leg-trousers",
    "name": "High-Waist Fluid Wide-Leg Trousers",
    "brand": "Plugd Studio",
    "subcategory": "Bottoms",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "bottoms",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 67
  },
  {
    "id": "stretch-cotton-slim-tapered-chinos",
    "name": "Stretch Cotton Slim Tapered Chinos",
    "brand": "Plugd Studio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "streetwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 68
  },
  {
    "id": "relaxed-french-terry-drawstring-shorts",
    "name": "Relaxed French Terry Drawstring Shorts",
    "brand": "Plugd Studio",
    "subcategory": "Bottoms",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "bottoms",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 69
  },
  {
    "id": "tiered-pure-linen-summer-maxi-dress",
    "name": "Tiered Pure Linen Summer Maxi Dress",
    "brand": "Plugd Studio",
    "subcategory": "Dresses & Skirts",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "dresses & skirts",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 70
  },
  {
    "id": "seamless-ribbed-high-neck-crop-top",
    "name": "Seamless Ribbed High-Neck Crop Top",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 71
  },
  {
    "id": "printed-crepe-floral-wrap-mini-dress",
    "name": "Printed Crepe Floral Wrap Mini Dress",
    "brand": "Plugd Studio",
    "subcategory": "Dresses & Skirts",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "dresses & skirts",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 72
  },
  {
    "id": "crisp-cotton-poplin-oversized-boyfriend-shirt",
    "name": "Crisp Cotton Poplin Oversized Boyfriend Shirt",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 73
  },
  {
    "id": "chanderi-silk-anarkali-kurta-set-with-dupatta",
    "name": "Chanderi Silk Anarkali Kurta Set with Dupatta",
    "brand": "Plugd Studio",
    "subcategory": "Ethnic Wear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "ethnic wear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 74
  },
  {
    "id": "raw-silk-embroidered-bridal-lehenga-set",
    "name": "Raw Silk Embroidered Bridal Lehenga Set",
    "brand": "Plugd Studio",
    "subcategory": "Ethnic Wear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "ethnic wear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 75
  },
  {
    "id": "jacquard-silk-blend-festive-kurta-pajama",
    "name": "Jacquard Silk Blend Festive Kurta Pajama",
    "brand": "Plugd Studio",
    "subcategory": "Ethnic Wear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "ethnic wear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 76
  },
  {
    "id": "bespoke-royal-bandhgala-jodhpuri-suit",
    "name": "Bespoke Royal Bandhgala Jodhpuri Suit",
    "brand": "Plugd Studio",
    "subcategory": "Ethnic Wear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "ethnic wear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 77
  },
  {
    "id": "seiko-5-sports-automatic-srpd55k1",
    "name": "Seiko 5 Sports Automatic SRPD55K1",
    "brand": "Seiko",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "seiko",
      "streetwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 78
  },
  {
    "id": "apple-watch-ultra-2-titanium",
    "name": "Apple Watch Ultra 2 Titanium",
    "brand": "Titan",
    "subcategory": "Watches",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "titan",
      "watches",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 79
  },
  {
    "id": "fossil-grant-chronograph-leather-watch",
    "name": "Fossil Grant Chronograph Leather Watch",
    "brand": "Fossil",
    "subcategory": "Watches",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "fossil",
      "watches",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 80
  },
  {
    "id": "heavy-duty-16oz-canvas-work-tote-bag",
    "name": "Heavy Duty 16oz Canvas Work Tote Bag",
    "brand": "Plugd Studio",
    "subcategory": "Bags",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "bags",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 81
  },
  {
    "id": "structured-leather-flap-shoulder-handbag",
    "name": "Structured Leather Flap Shoulder Handbag",
    "brand": "Plugd Studio",
    "subcategory": "Bags",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "bags",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 82
  },
  {
    "id": "minimalist-full-grain-leather-rfid-cardholder",
    "name": "Minimalist Full-Grain Leather RFID Cardholder",
    "brand": "Plugd Studio",
    "subcategory": "Bags",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "bags",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 83
  },
  {
    "id": "sunglasses",
    "name": "Sunglasses",
    "brand": "Plugd Studio",
    "subcategory": "Accessories",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "accessories",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 84
  },
  {
    "id": "brushed-silver-geometric-signet-ring",
    "name": "Brushed Silver Geometric Signet Ring",
    "brand": "Plugd Studio",
    "subcategory": "Jewellery",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "jewellery",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 85
  },
  {
    "id": "washed-cotton-6-panel-unstructured-dad-cap",
    "name": "Washed Cotton 6-Panel Unstructured Dad Cap",
    "brand": "Plugd Studio",
    "subcategory": "Accessories",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "accessories",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 86
  },
  {
    "id": "full-grain-italian-leather-pin-buckle-belt",
    "name": "Full-Grain Italian Leather Pin-Buckle Belt",
    "brand": "Plugd Studio",
    "subcategory": "Accessories",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "accessories",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 87
  },
  {
    "id": "nike-dri-fit-high-ventilation-training-tee",
    "name": "Nike Dri-FIT High-Ventilation Training Tee",
    "brand": "Nike",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "nike",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 88
  },
  {
    "id": "adidas-tiro-24-performance-track-pants",
    "name": "Adidas Tiro 24 Performance Track Pants",
    "brand": "Adidas",
    "subcategory": "Bottoms",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "adidas",
      "bottoms",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 89
  },
  {
    "id": "under-armour-heatgear-compression-long-sleeve",
    "name": "Under Armour HeatGear Compression Long-Sleeve",
    "brand": "Plugd Studio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "streetwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 90
  },
  {
    "id": "puma-drycell-5-lightweight-running-shorts",
    "name": "Puma dryCELL 5\" Lightweight Running Shorts",
    "brand": "Puma",
    "subcategory": "Bottoms",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "puma",
      "bottoms",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 91
  },
  {
    "id": "tommy-hilfiger-regatta-yachting-bomber-jacket",
    "name": "Tommy Hilfiger Regatta Yachting Bomber Jacket",
    "brand": "Tommy Hilfiger",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "tommy hilfiger",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 92
  },
  {
    "id": "calvin-klein-monogram-organic-cotton-tee",
    "name": "Calvin Klein Monogram Organic Cotton Tee",
    "brand": "Calvin Klein",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "calvin klein",
      "tops & outerwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 93
  },
  {
    "id": "boss-virgin-wool-slim-fit-tailored-suit-jacket",
    "name": "BOSS Virgin Wool Slim-Fit Tailored Suit Jacket",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 94
  },
  {
    "id": "fc-barcelona-home-jersey",
    "name": "FC Barcelona Home Jersey",
    "brand": "Plugd Studio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 95
  },
  {
    "id": "real-madrid-home-jersey",
    "name": "Real Madrid Home Jersey",
    "brand": "Plugd Studio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 96
  },
  {
    "id": "new-balance-2002r",
    "name": "New Balance 2002R",
    "brand": "New Balance",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "new balance",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 97
  },
  {
    "id": "new-balance-530",
    "name": "New Balance 530",
    "brand": "New Balance",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "new balance",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 98
  },
  {
    "id": "nike-air-max-90",
    "name": "Nike Air Max 90",
    "brand": "Nike",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "nike",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 99
  },
  {
    "id": "nike-air-max-1",
    "name": "Nike Air Max 1",
    "brand": "Nike",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "nike",
      "streetwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 100
  },
  {
    "id": "nike-blazer-mid-77",
    "name": "Nike Blazer Mid '77",
    "brand": "Nike",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "nike",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 101
  },
  {
    "id": "on-cloud-5",
    "name": "On Cloud 5",
    "brand": "Plugd Studio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "streetwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 102
  },
  {
    "id": "nike-air-max-97",
    "name": "Nike Air Max 97",
    "brand": "Nike",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "nike",
      "streetwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 103
  },
  {
    "id": "adidas-gazelle-bold-platform",
    "name": "Adidas Gazelle Bold Platform",
    "brand": "Adidas",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "adidas",
      "sneakers & footwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 104
  },
  {
    "id": "puma-speedcat-og",
    "name": "Puma Speedcat OG",
    "brand": "Puma",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "puma",
      "streetwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 105
  },
  {
    "id": "220-gsm-oversized-plain-drop-shoulder-tee",
    "name": "220 GSM Oversized Plain Drop-Shoulder Tee",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 106
  },
  {
    "id": "boxy-fit-cotton-tee",
    "name": "Boxy Fit Cotton Tee",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 107
  },
  {
    "id": "vintage-acid-wash-oversized-tee",
    "name": "Vintage Acid-Wash Oversized Tee",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 108
  },
  {
    "id": "wide-leg-relaxed-fit-jeans",
    "name": "Wide-Leg Relaxed Fit Jeans",
    "brand": "Plugd Studio",
    "subcategory": "Bottoms",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "bottoms",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 109
  },
  {
    "id": "nylon-parachute-cargo-pants",
    "name": "Nylon Parachute Cargo Pants",
    "brand": "Plugd Studio",
    "subcategory": "Bottoms",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "bottoms",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 110
  },
  {
    "id": "relaxed-carpenter-work-pants",
    "name": "Relaxed Carpenter Work Pants",
    "brand": "Plugd Studio",
    "subcategory": "Bottoms",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "bottoms",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 111
  },
  {
    "id": "full-zip-fleece-hoodie",
    "name": "Full-Zip Fleece Hoodie",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 112
  },
  {
    "id": "classic-ma-1-bomber-jacket",
    "name": "Classic MA-1 Bomber Jacket",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 113
  },
  {
    "id": "classic-denim-trucker-jacket",
    "name": "Classic Denim Trucker Jacket",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 114
  },
  {
    "id": "brushed-flannel-checkered-shirt",
    "name": "Brushed Flannel Checkered Shirt",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 115
  },
  {
    "id": "oversized-linen-blend-shirt",
    "name": "Oversized Linen Blend Shirt",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 116
  },
  {
    "id": "relaxed-fit-oxford-shirt",
    "name": "Relaxed Fit Oxford Shirt",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 117
  },
  {
    "id": "cotton-twill-overshirt-jacket",
    "name": "Cotton Twill Overshirt Jacket",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 118
  },
  {
    "id": "classic-fit-piqu-polo-tee",
    "name": "Classic Fit Piqué Polo Tee",
    "brand": "Polo Ralph Lauren",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "polo ralph lauren",
      "tops & outerwear",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 119
  },
  {
    "id": "minimalist-mesh-strap-watch",
    "name": "Minimalist Mesh Strap Watch",
    "brand": "Plugd Studio",
    "subcategory": "Watches",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "watches",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 120
  },
  {
    "id": "compact-crossbody-sling-bag",
    "name": "Compact Crossbody Sling Bag",
    "brand": "Plugd Studio",
    "subcategory": "Bags",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "bags",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 121
  },
  {
    "id": "bi-fold-genuine-leather-wallet",
    "name": "Bi-Fold Genuine Leather Wallet",
    "brand": "Plugd Studio",
    "subcategory": "Bags",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "bags",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 122
  },
  {
    "id": "reversible-leather-belt",
    "name": "Reversible Leather Belt",
    "brand": "Plugd Studio",
    "subcategory": "Accessories",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "men",
    "tags": [
      "plugd studio",
      "accessories",
      "men"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 123
  },
  {
    "id": "cotton-twill-baseball-cap",
    "name": "Cotton Twill Baseball Cap",
    "brand": "Plugd Studio",
    "subcategory": "Accessories",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "accessories",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 124
  },
  {
    "id": "classic-leather-ballet-flats",
    "name": "Classic Leather Ballet Flats",
    "brand": "Plugd Studio",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "sneakers & footwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 125
  },
  {
    "id": "patent-leather-mary-jane-shoes",
    "name": "Patent Leather Mary Jane Shoes",
    "brand": "Plugd Studio",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "sneakers & footwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 126
  },
  {
    "id": "platform-canvas-sneakers",
    "name": "Platform Canvas Sneakers",
    "brand": "Plugd Studio",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "sneakers & footwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 127
  },
  {
    "id": "chunky-dad-sneakers",
    "name": "Chunky Dad Sneakers",
    "brand": "Plugd Studio",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "sneakers & footwear",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 128
  },
  {
    "id": "pointed-toe-stiletto-heels",
    "name": "Pointed-Toe Stiletto Heels",
    "brand": "Plugd Studio",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "sneakers & footwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 129
  },
  {
    "id": "padded-strap-flat-sandals",
    "name": "Padded Strap Flat Sandals",
    "brand": "Plugd Studio",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "sneakers & footwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 130
  },
  {
    "id": "nike-dunk-low-women-s",
    "name": "Nike Dunk Low (Women's)",
    "brand": "Nike",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "nike",
      "sneakers & footwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 131
  },
  {
    "id": "adidas-gazelle-women-s",
    "name": "Adidas Gazelle (Women's)",
    "brand": "Adidas",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "adidas",
      "sneakers & footwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 132
  },
  {
    "id": "fitted-ribbed-baby-tee",
    "name": "Fitted Ribbed Baby Tee",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 133
  },
  {
    "id": "cotton-crop-top",
    "name": "Cotton Crop Top",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 134
  },
  {
    "id": "ribbed-knit-tank-top",
    "name": "Ribbed Knit Tank Top",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 135
  },
  {
    "id": "structured-boned-corset-top",
    "name": "Structured Boned Corset Top",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 136
  },
  {
    "id": "strapless-tube-top",
    "name": "Strapless Tube Top",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 137
  },
  {
    "id": "off-shoulder-ruched-top",
    "name": "Off-Shoulder Ruched Top",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 138
  },
  {
    "id": "oversized-graphic-tee-women-s",
    "name": "Oversized Graphic Tee (Women's)",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 139
  },
  {
    "id": "oversized-cotton-poplin-shirt-women-s",
    "name": "Oversized Cotton Poplin Shirt (Women's)",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 140
  },
  {
    "id": "chunky-knit-oversized-cardigan",
    "name": "Chunky Knit Oversized Cardigan",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 141
  },
  {
    "id": "fine-knit-fitted-top",
    "name": "Fine Knit Fitted Top",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 142
  },
  {
    "id": "cropped-zip-up-hoodie-women-s",
    "name": "Cropped Zip-Up Hoodie (Women's)",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 143
  },
  {
    "id": "oversized-fleece-hoodie-women-s",
    "name": "Oversized Fleece Hoodie (Women's)",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 144
  },
  {
    "id": "baggy-wide-leg-jeans-women-s",
    "name": "Baggy Wide-Leg Jeans (Women's)",
    "brand": "Plugd Studio",
    "subcategory": "Bags",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "bags",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 145
  },
  {
    "id": "wide-leg-straight-jeans-women-s",
    "name": "Wide-Leg Straight Jeans (Women's)",
    "brand": "Plugd Studio",
    "subcategory": "Bottoms",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "bottoms",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 146
  },
  {
    "id": "low-rise-cargo-pants-women-s",
    "name": "Low-Rise Cargo Pants (Women's)",
    "brand": "Plugd Studio",
    "subcategory": "Bottoms",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "bottoms",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 147
  },
  {
    "id": "nylon-parachute-pants-women-s",
    "name": "Nylon Parachute Pants (Women's)",
    "brand": "Plugd Studio",
    "subcategory": "Bottoms",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "bottoms",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 148
  },
  {
    "id": "classic-denim-mini-skirt",
    "name": "Classic Denim Mini Skirt",
    "brand": "Plugd Studio",
    "subcategory": "Dresses & Skirts",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "dresses & skirts",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 149
  },
  {
    "id": "pleated-mini-skirt",
    "name": "Pleated Mini Skirt",
    "brand": "Plugd Studio",
    "subcategory": "Dresses & Skirts",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "dresses & skirts",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 150
  },
  {
    "id": "satin-midi-slip-skirt",
    "name": "Satin Midi Slip Skirt",
    "brand": "Plugd Studio",
    "subcategory": "Dresses & Skirts",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "dresses & skirts",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 151
  },
  {
    "id": "flowy-maxi-skirt",
    "name": "Flowy Maxi Skirt",
    "brand": "Plugd Studio",
    "subcategory": "Dresses & Skirts",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "dresses & skirts",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 152
  },
  {
    "id": "linen-co-ord-set",
    "name": "Linen Co-Ord Set",
    "brand": "Plugd Studio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "streetwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 153
  },
  {
    "id": "cotton-t-shirt-dress",
    "name": "Cotton T-Shirt Dress",
    "brand": "Plugd Studio",
    "subcategory": "Dresses & Skirts",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "dresses & skirts",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 154
  },
  {
    "id": "ribbed-bodycon-mini-dress",
    "name": "Ribbed Bodycon Mini Dress",
    "brand": "Plugd Studio",
    "subcategory": "Dresses & Skirts",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "dresses & skirts",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 155
  },
  {
    "id": "oversized-leather-effect-jacket-women-s",
    "name": "Oversized Leather-Effect Jacket (Women's)",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 156
  },
  {
    "id": "cropped-denim-jacket-women-s",
    "name": "Cropped Denim Jacket (Women's)",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 157
  },
  {
    "id": "satin-bomber-jacket-women-s",
    "name": "Satin Bomber Jacket (Women's)",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 158
  },
  {
    "id": "faux-leather-moto-jacket",
    "name": "Faux Leather Moto Jacket",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 159
  },
  {
    "id": "oversized-drop-shoulder-tee-women-s",
    "name": "Oversized Drop-Shoulder Tee (Women's)",
    "brand": "Plugd Studio",
    "subcategory": "Tops & Outerwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "tops & outerwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 160
  },
  {
    "id": "cotton-printed-kurta-set-with-dupatta",
    "name": "Cotton Printed Kurta Set with Dupatta",
    "brand": "Plugd Studio",
    "subcategory": "Ethnic Wear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "ethnic wear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 161
  },
  {
    "id": "georgette-anarkali-suit-set",
    "name": "Georgette Anarkali Suit Set",
    "brand": "Plugd Studio",
    "subcategory": "Ethnic Wear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "ethnic wear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 162
  },
  {
    "id": "printed-ethnic-co-ord-set",
    "name": "Printed Ethnic Co-Ord Set",
    "brand": "Plugd Studio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "streetwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 163
  },
  {
    "id": "pre-draped-concept-saree",
    "name": "Pre-Draped Concept Saree",
    "brand": "Plugd Studio",
    "subcategory": "Ethnic Wear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "ethnic wear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 164
  },
  {
    "id": "handcrafted-bandhani-statement-dupatta",
    "name": "Handcrafted Bandhani Statement Dupatta",
    "brand": "Plugd Studio",
    "subcategory": "Ethnic Wear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "ethnic wear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 165
  },
  {
    "id": "traditional-silver-jhumka-earrings",
    "name": "Traditional Silver Jhumka Earrings",
    "brand": "Plugd Studio",
    "subcategory": "Jewellery",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "jewellery",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 166
  },
  {
    "id": "oxidised-silver-statement-necklace-set",
    "name": "Oxidised Silver Statement Necklace Set",
    "brand": "Plugd Studio",
    "subcategory": "Jewellery",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "jewellery",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 167
  },
  {
    "id": "minimalist-gold-plated-jewellery-set",
    "name": "Minimalist Gold-Plated Jewellery Set",
    "brand": "Plugd Studio",
    "subcategory": "Jewellery",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "jewellery",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 168
  },
  {
    "id": "pure-kanjeevaram-silk-saree",
    "name": "Pure Kanjeevaram Silk Saree",
    "brand": "Plugd Studio",
    "subcategory": "Ethnic Wear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "ethnic wear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 169
  },
  {
    "id": "sequin-embroidered-festive-lehenga",
    "name": "Sequin Embroidered Festive Lehenga",
    "brand": "Plugd Studio",
    "subcategory": "Ethnic Wear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "ethnic wear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 170
  },
  {
    "id": "quilted-shoulder-bag",
    "name": "Quilted Shoulder Bag",
    "brand": "Plugd Studio",
    "subcategory": "Bags",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "bags",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 171
  },
  {
    "id": "structured-canvas-tote-bag",
    "name": "Structured Canvas Tote Bag",
    "brand": "Plugd Studio",
    "subcategory": "Bags",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "bags",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 172
  },
  {
    "id": "mini-crossbody-phone-bag",
    "name": "Mini Crossbody Phone Bag",
    "brand": "Plugd Studio",
    "subcategory": "Bags",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "bags",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 173
  },
  {
    "id": "leather-crossbody-bag",
    "name": "Leather Crossbody Bag",
    "brand": "Plugd Studio",
    "subcategory": "Bags",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "bags",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 174
  },
  {
    "id": "baguette-shoulder-bag",
    "name": "Baguette Shoulder Bag",
    "brand": "Plugd Studio",
    "subcategory": "Bags",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "bags",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 175
  },
  {
    "id": "cat-eye-acetate-sunglasses",
    "name": "Cat-Eye Acetate Sunglasses",
    "brand": "Plugd Studio",
    "subcategory": "Accessories",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "accessories",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 176
  },
  {
    "id": "cotton-dad-cap-women-s",
    "name": "Cotton Dad Cap (Women's)",
    "brand": "Plugd Studio",
    "subcategory": "Accessories",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "accessories",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 177
  },
  {
    "id": "satin-hair-accessories-set",
    "name": "Satin Hair Accessories Set",
    "brand": "Plugd Studio",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "streetwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 178
  },
  {
    "id": "silk-scrunchie-set-pack-of-5",
    "name": "Silk Scrunchie Set (Pack of 5)",
    "brand": "Plugd Studio",
    "subcategory": "Accessories",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "accessories",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 179
  },
  {
    "id": "acrylic-claw-clip-set",
    "name": "Acrylic Claw Clip Set",
    "brand": "Plugd Studio",
    "subcategory": "Accessories",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "accessories",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 180
  },
  {
    "id": "thin-leather-waist-belt",
    "name": "Thin Leather Waist Belt",
    "brand": "Plugd Studio",
    "subcategory": "Accessories",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "accessories",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 181
  },
  {
    "id": "minimal-stacking-ring-set",
    "name": "Minimal Stacking Ring Set",
    "brand": "Plugd Studio",
    "subcategory": "Jewellery",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "jewellery",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 182
  },
  {
    "id": "dainty-chain-bracelet",
    "name": "Dainty Chain Bracelet",
    "brand": "Plugd Studio",
    "subcategory": "Jewellery",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "jewellery",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 183
  },
  {
    "id": "layered-chain-necklace-set",
    "name": "Layered Chain Necklace Set",
    "brand": "Plugd Studio",
    "subcategory": "Jewellery",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "jewellery",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 184
  },
  {
    "id": "classic-gold-hoop-earrings",
    "name": "Classic Gold Hoop Earrings",
    "brand": "Plugd Studio",
    "subcategory": "Jewellery",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "jewellery",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 185
  },
  {
    "id": "statement-drop-earrings",
    "name": "Statement Drop Earrings",
    "brand": "Plugd Studio",
    "subcategory": "Jewellery",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "plugd studio",
      "jewellery",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 186
  },
  {
    "id": "retro-oval-sunglasses",
    "name": "Retro Oval Sunglasses",
    "brand": "Plugd Studio",
    "subcategory": "Accessories",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "accessories",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 187
  },
  {
    "id": "leather-boots",
    "name": "Leather Boots",
    "brand": "Plugd Studio",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "Leather Boots in the Fashion collection.",
    "gender": "women",
    "tags": [
      "plugd studio",
      "sneakers & footwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 188
  },
  {
    "id": "capsule-wardrobe-set",
    "name": "Capsule Wardrobe Set",
    "brand": "Plugd Studio",
    "subcategory": "Accessories",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "Capsule Wardrobe Set in the Fashion collection.",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "accessories",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 189
  },
  {
    "id": "smart-glasses",
    "name": "Smart Glasses",
    "brand": "Plugd Studio",
    "subcategory": "Accessories",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "Smart Glasses in the Fashion collection.",
    "gender": "unisex",
    "tags": [
      "plugd studio",
      "accessories",
      "unisex"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 190
  },
  {
    "id": "adidas-samba-og-women-s",
    "name": "Adidas Samba OG (Women's)",
    "brand": "Adidas",
    "subcategory": "Sneakers & Footwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "adidas",
      "sneakers & footwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 191
  },
  {
    "id": "new-balance-550-women-s",
    "name": "New Balance 550 (Women's)",
    "brand": "New Balance",
    "subcategory": "Streetwear",
    "sectionId": "streetwear-creator-fits",
    "sectionTitle": "Streetwear & Creator Fits",
    "description": "",
    "gender": "women",
    "tags": [
      "new balance",
      "streetwear",
      "women"
    ],
    "featured": false,
    "trending": false,
    "displayOrder": 192
  }
];

/**
 * Gender mapping dictionary for all Fashion catalog items
 */
export const FASHION_GENDER_MAP: Record<string, "men" | "women" | "unisex"> = {
  "air-jordan-1-retro-high-og": "men",
  "air jordan 1 retro high og": "men",
  "nike-dunk-low-retro-panda": "men",
  "nike dunk low retro 'panda'": "men",
  "nike-dunk-low-retro-panda-": "men",
  "adidas-samba-og": "men",
  "adidas samba og": "men",
  "new-balance-550": "men",
  "new balance 550": "men",
  "asics-gel-kayano-14": "men",
  "asics gel-kayano 14": "men",
  "birkenstock-boston-suede-leather-clogs": "men",
  "birkenstock boston suede leather clogs": "men",
  "240-gsm-heavyweight-oversized-graphic-tee": "men",
  "240 gsm heavyweight oversized graphic tee": "men",
  "400-gsm-boxy-drop-shoulder-fleece-hoodie": "men",
  "400 gsm boxy drop-shoulder fleece hoodie": "men",
  "retro-wool-blend-varsity-bomber-jacket": "men",
  "retro wool-blend varsity bomber jacket": "men",
  "multi-pocket-utilitarian-relaxed-cargo-pants": "men",
  "multi-pocket utilitarian relaxed cargo pants": "men",
  "levi-s-501-original-straight-fit-jeans": "men",
  "levi's 501 original straight fit jeans": "men",
  "bias-cut-silk-satin-slip-midi-dress": "women",
  "bias-cut silk-satin slip midi dress": "women",
  "oversized-double-breasted-tailored-blazer": "women",
  "oversized double-breasted tailored blazer": "women",
  "handloom-pure-katan-banarasi-silk-saree": "women",
  "handloom pure katan banarasi silk saree": "women",
  "handcrafted-lucknowi-chikankari-kurta": "women",
  "handcrafted lucknowi chikankari kurta": "women",
  "woven-raw-silk-tailored-nehru-jacket": "men",
  "woven raw silk tailored nehru jacket": "men",
  "casio-vintage-digital-a168wa-1": "men",
  "casio vintage digital a168wa-1": "men",
  "casio-g-shock-ga-2100-casioak": "men",
  "casio g-shock ga-2100 'casioak'": "men",
  "casio-g-shock-ga-2100-casioak-": "men",
  "titan-edge-ceramic-ultra-slim-watch": "men",
  "titan edge ceramic ultra-slim watch": "men",
  "tissot-prx-powermatic-80-automatic": "men",
  "tissot prx powermatic 80 automatic": "men",
  "minimalist-leather-everyday-crossbody-sling": "women",
  "minimalist leather everyday crossbody sling": "women",
  "vintage-90s-tinted-acetate-sunglasses": "unisex",
  "vintage 90s tinted acetate sunglasses": "unisex",
  "8mm-cuban-link-stainless-steel-chain-necklace": "men",
  "8mm cuban link stainless steel chain necklace": "men",
  "polo-ralph-lauren-custom-fit-oxford-shirt": "men",
  "polo ralph lauren custom fit oxford shirt": "men",
  "coach-tabby-26-polished-leather-shoulder-bag": "women",
  "coach tabby 26 polished leather shoulder bag": "women",
  "royal-challengers-bengaluru-ipl-jersey": "unisex",
  "royal challengers bengaluru ipl jersey": "unisex",
  "mumbai-indians-ipl-jersey": "unisex",
  "mumbai indians ipl jersey": "unisex",
  "chennai-super-kings-ipl-jersey": "unisex",
  "chennai super kings ipl jersey": "unisex",
  "adidas-handball-spezial": "unisex",
  "adidas handball spezial": "unisex",
  "air-jordan-1": "unisex",
  "air jordan 1": "unisex",
  "nike-air-force-1-07": "unisex",
  "nike air force 1 '07": "unisex",
  "nike-air-max-plus-tn": "unisex",
  "nike air max plus tn": "unisex",
  "nike-running-shoes": "unisex",
  "nike running shoes": "unisex",
  "adidas-gazelle-indoor": "unisex",
  "adidas gazelle indoor": "unisex",
  "adidas-originals-campus-00s": "unisex",
  "adidas originals campus 00s": "unisex",
  "adidas-originals": "unisex",
  "adidas originals": "unisex",
  "adidas-ultraboost-light": "men",
  "adidas ultraboost light": "men",
  "new-balance-9060": "unisex",
  "new balance 9060": "unisex",
  "new-balance-1906r": "unisex",
  "new balance 1906r": "unisex",
  "asics-gel-nyc": "unisex",
  "asics gel-nyc": "unisex",
  "puma-palermo-leather": "unisex",
  "puma palermo leather": "unisex",
  "puma-suede-classic-xxi": "unisex",
  "puma suede classic xxi": "unisex",
  "converse-chuck-70-vintage-canvas": "unisex",
  "converse chuck 70 vintage canvas": "unisex",
  "vans-old-skool-classic-skate-shoes": "unisex",
  "vans old skool classic skate shoes": "unisex",
  "on-cloudmonster-2": "unisex",
  "on cloudmonster 2": "unisex",
  "sneakers": "unisex",
  "crocs-classic-clog": "unisex",
  "crocs classic clog": "unisex",
  "full-grain-leather-chelsea-boots": "men",
  "full-grain leather chelsea boots": "men",
  "italian-suede-penny-loafers": "men",
  "italian suede penny loafers": "men",
  "chunky-lug-sole-platform-loafers": "women",
  "chunky lug-sole platform loafers": "women",
  "minimalist-strappy-block-heels": "women",
  "minimalist strappy block heels": "women",
  "handcrafted-leather-kolhapuri-mojaris": "men",
  "handcrafted leather kolhapuri mojaris": "men",
  "oversized-hoodie": "men",
  "oversized hoodie": "men",
  "statement-jacket": "women",
  "statement jacket": "women",
  "brushed-cotton-plaid-flannel-overshirt": "men",
  "brushed cotton plaid flannel overshirt": "men",
  "levi-s-trucker-denim-jacket": "men",
  "levi's trucker denim jacket": "men",
  "fine-wale-corduroy-zip-overshirt": "men",
  "fine wale corduroy zip overshirt": "men",
  "minimalist-loopback-cotton-crewneck": "men",
  "minimalist loopback cotton crewneck": "men",
  "textured-knit-boxy-button-cardigan": "women",
  "textured knit boxy button cardigan": "women",
  "supima-cotton-heavyweight-crewneck-tee": "men",
  "supima cotton heavyweight crewneck tee": "men",
  "tailored-pima-cotton-polo-shirt": "men",
  "tailored pima cotton polo shirt": "men",
  "pure-european-linen-resort-collar-shirt": "men",
  "pure european linen resort collar shirt": "men",
  "classic-oxford-cloth-button-down-shirt": "men",
  "classic oxford cloth button-down shirt": "men",
  "90s-baggy-wide-leg-skater-jeans": "unisex",
  "90s baggy wide-leg skater jeans": "unisex",
  "double-pleated-tailored-wide-trousers": "unisex",
  "double-pleated tailored wide trousers": "unisex",
  "high-waist-fluid-wide-leg-trousers": "women",
  "high-waist fluid wide-leg trousers": "women",
  "stretch-cotton-slim-tapered-chinos": "men",
  "stretch cotton slim tapered chinos": "men",
  "relaxed-french-terry-drawstring-shorts": "women",
  "relaxed french terry drawstring shorts": "women",
  "tiered-pure-linen-summer-maxi-dress": "women",
  "tiered pure linen summer maxi dress": "women",
  "seamless-ribbed-high-neck-crop-top": "women",
  "seamless ribbed high-neck crop top": "women",
  "printed-crepe-floral-wrap-mini-dress": "women",
  "printed crepe floral wrap mini dress": "women",
  "crisp-cotton-poplin-oversized-boyfriend-shirt": "women",
  "crisp cotton poplin oversized boyfriend shirt": "women",
  "chanderi-silk-anarkali-kurta-set-with-dupatta": "women",
  "chanderi silk anarkali kurta set with dupatta": "women",
  "raw-silk-embroidered-bridal-lehenga-set": "women",
  "raw silk embroidered bridal lehenga set": "women",
  "jacquard-silk-blend-festive-kurta-pajama": "men",
  "jacquard silk blend festive kurta pajama": "men",
  "bespoke-royal-bandhgala-jodhpuri-suit": "men",
  "bespoke royal bandhgala jodhpuri suit": "men",
  "seiko-5-sports-automatic-srpd55k1": "men",
  "seiko 5 sports automatic srpd55k1": "men",
  "apple-watch-ultra-2-titanium": "unisex",
  "apple watch ultra 2 titanium": "unisex",
  "fossil-grant-chronograph-leather-watch": "men",
  "fossil grant chronograph leather watch": "men",
  "heavy-duty-16oz-canvas-work-tote-bag": "unisex",
  "heavy duty 16oz canvas work tote bag": "unisex",
  "structured-leather-flap-shoulder-handbag": "women",
  "structured leather flap shoulder handbag": "women",
  "minimalist-full-grain-leather-rfid-cardholder": "men",
  "minimalist full-grain leather rfid cardholder": "men",
  "sunglasses": "unisex",
  "brushed-silver-geometric-signet-ring": "men",
  "brushed silver geometric signet ring": "men",
  "washed-cotton-6-panel-unstructured-dad-cap": "men",
  "washed cotton 6-panel unstructured dad cap": "men",
  "full-grain-italian-leather-pin-buckle-belt": "men",
  "full-grain italian leather pin-buckle belt": "men",
  "nike-dri-fit-high-ventilation-training-tee": "women",
  "nike dri-fit high-ventilation training tee": "women",
  "adidas-tiro-24-performance-track-pants": "men",
  "adidas tiro 24 performance track pants": "men",
  "under-armour-heatgear-compression-long-sleeve": "men",
  "under armour heatgear compression long-sleeve": "men",
  "puma-drycell-5-lightweight-running-shorts": "men",
  "puma drycell 5\" lightweight running shorts": "men",
  "tommy-hilfiger-regatta-yachting-bomber-jacket": "men",
  "tommy hilfiger regatta yachting bomber jacket": "men",
  "calvin-klein-monogram-organic-cotton-tee": "unisex",
  "calvin klein monogram organic cotton tee": "unisex",
  "boss-virgin-wool-slim-fit-tailored-suit-jacket": "men",
  "boss virgin wool slim-fit tailored suit jacket": "men",
  "fc-barcelona-home-jersey": "unisex",
  "fc barcelona home jersey": "unisex",
  "real-madrid-home-jersey": "unisex",
  "real madrid home jersey": "unisex",
  "new-balance-2002r": "unisex",
  "new balance 2002r": "unisex",
  "new-balance-530": "unisex",
  "new balance 530": "unisex",
  "nike-air-max-90": "unisex",
  "nike air max 90": "unisex",
  "nike-air-max-1": "men",
  "nike air max 1": "men",
  "nike-blazer-mid-77": "men",
  "nike blazer mid '77": "men",
  "on-cloud-5": "men",
  "on cloud 5": "men",
  "nike-air-max-97": "men",
  "nike air max 97": "men",
  "adidas-gazelle-bold-platform": "unisex",
  "adidas gazelle bold platform": "unisex",
  "puma-speedcat-og": "unisex",
  "puma speedcat og": "unisex",
  "220-gsm-oversized-plain-drop-shoulder-tee": "men",
  "220 gsm oversized plain drop-shoulder tee": "men",
  "boxy-fit-cotton-tee": "men",
  "boxy fit cotton tee": "men",
  "vintage-acid-wash-oversized-tee": "men",
  "vintage acid-wash oversized tee": "men",
  "wide-leg-relaxed-fit-jeans": "women",
  "wide-leg relaxed fit jeans": "women",
  "nylon-parachute-cargo-pants": "men",
  "nylon parachute cargo pants": "men",
  "relaxed-carpenter-work-pants": "men",
  "relaxed carpenter work pants": "men",
  "full-zip-fleece-hoodie": "unisex",
  "full-zip fleece hoodie": "unisex",
  "classic-ma-1-bomber-jacket": "unisex",
  "classic ma-1 bomber jacket": "unisex",
  "classic-denim-trucker-jacket": "men",
  "classic denim trucker jacket": "men",
  "brushed-flannel-checkered-shirt": "men",
  "brushed flannel checkered shirt": "men",
  "oversized-linen-blend-shirt": "women",
  "oversized linen blend shirt": "women",
  "relaxed-fit-oxford-shirt": "men",
  "relaxed fit oxford shirt": "men",
  "cotton-twill-overshirt-jacket": "men",
  "cotton twill overshirt jacket": "men",
  "classic-fit-piqu-polo-tee": "men",
  "classic fit piqué polo tee": "men",
  "minimalist-mesh-strap-watch": "unisex",
  "minimalist mesh strap watch": "unisex",
  "compact-crossbody-sling-bag": "unisex",
  "compact crossbody sling bag": "unisex",
  "bi-fold-genuine-leather-wallet": "men",
  "bi-fold genuine leather wallet": "men",
  "reversible-leather-belt": "men",
  "reversible leather belt": "men",
  "cotton-twill-baseball-cap": "women",
  "cotton twill baseball cap": "women",
  "classic-leather-ballet-flats": "women",
  "classic leather ballet flats": "women",
  "patent-leather-mary-jane-shoes": "women",
  "patent leather mary jane shoes": "women",
  "platform-canvas-sneakers": "unisex",
  "platform canvas sneakers": "unisex",
  "chunky-dad-sneakers": "unisex",
  "chunky dad sneakers": "unisex",
  "pointed-toe-stiletto-heels": "women",
  "pointed-toe stiletto heels": "women",
  "padded-strap-flat-sandals": "women",
  "padded strap flat sandals": "women",
  "nike-dunk-low-women-s": "women",
  "nike dunk low (women's)": "women",
  "nike-dunk-low-women-s-": "women",
  "adidas-gazelle-women-s": "women",
  "adidas gazelle (women's)": "women",
  "adidas-gazelle-women-s-": "women",
  "fitted-ribbed-baby-tee": "women",
  "fitted ribbed baby tee": "women",
  "cotton-crop-top": "women",
  "cotton crop top": "women",
  "ribbed-knit-tank-top": "women",
  "ribbed knit tank top": "women",
  "structured-boned-corset-top": "women",
  "structured boned corset top": "women",
  "strapless-tube-top": "women",
  "strapless tube top": "women",
  "off-shoulder-ruched-top": "women",
  "off-shoulder ruched top": "women",
  "oversized-graphic-tee-women-s": "women",
  "oversized graphic tee (women's)": "women",
  "oversized-graphic-tee-women-s-": "women",
  "oversized-cotton-poplin-shirt-women-s": "women",
  "oversized cotton poplin shirt (women's)": "women",
  "oversized-cotton-poplin-shirt-women-s-": "women",
  "chunky-knit-oversized-cardigan": "women",
  "chunky knit oversized cardigan": "women",
  "fine-knit-fitted-top": "women",
  "fine knit fitted top": "women",
  "cropped-zip-up-hoodie-women-s": "women",
  "cropped zip-up hoodie (women's)": "women",
  "cropped-zip-up-hoodie-women-s-": "women",
  "oversized-fleece-hoodie-women-s": "women",
  "oversized fleece hoodie (women's)": "women",
  "oversized-fleece-hoodie-women-s-": "women",
  "baggy-wide-leg-jeans-women-s": "women",
  "baggy wide-leg jeans (women's)": "women",
  "baggy-wide-leg-jeans-women-s-": "women",
  "wide-leg-straight-jeans-women-s": "women",
  "wide-leg straight jeans (women's)": "women",
  "wide-leg-straight-jeans-women-s-": "women",
  "low-rise-cargo-pants-women-s": "women",
  "low-rise cargo pants (women's)": "women",
  "low-rise-cargo-pants-women-s-": "women",
  "nylon-parachute-pants-women-s": "women",
  "nylon parachute pants (women's)": "women",
  "nylon-parachute-pants-women-s-": "women",
  "classic-denim-mini-skirt": "women",
  "classic denim mini skirt": "women",
  "pleated-mini-skirt": "women",
  "pleated mini skirt": "women",
  "satin-midi-slip-skirt": "women",
  "satin midi slip skirt": "women",
  "flowy-maxi-skirt": "women",
  "flowy maxi skirt": "women",
  "linen-co-ord-set": "women",
  "linen co-ord set": "women",
  "cotton-t-shirt-dress": "women",
  "cotton t-shirt dress": "women",
  "ribbed-bodycon-mini-dress": "women",
  "ribbed bodycon mini dress": "women",
  "oversized-leather-effect-jacket-women-s": "women",
  "oversized leather-effect jacket (women's)": "women",
  "oversized-leather-effect-jacket-women-s-": "women",
  "cropped-denim-jacket-women-s": "women",
  "cropped denim jacket (women's)": "women",
  "cropped-denim-jacket-women-s-": "women",
  "satin-bomber-jacket-women-s": "women",
  "satin bomber jacket (women's)": "women",
  "satin-bomber-jacket-women-s-": "women",
  "faux-leather-moto-jacket": "women",
  "faux leather moto jacket": "women",
  "oversized-drop-shoulder-tee-women-s": "women",
  "oversized drop-shoulder tee (women's)": "women",
  "oversized-drop-shoulder-tee-women-s-": "women",
  "cotton-printed-kurta-set-with-dupatta": "women",
  "cotton printed kurta set with dupatta": "women",
  "georgette-anarkali-suit-set": "women",
  "georgette anarkali suit set": "women",
  "printed-ethnic-co-ord-set": "women",
  "printed ethnic co-ord set": "women",
  "pre-draped-concept-saree": "women",
  "pre-draped concept saree": "women",
  "handcrafted-bandhani-statement-dupatta": "women",
  "handcrafted bandhani statement dupatta": "women",
  "traditional-silver-jhumka-earrings": "women",
  "traditional silver jhumka earrings": "women",
  "oxidised-silver-statement-necklace-set": "women",
  "oxidised silver statement necklace set": "women",
  "minimalist-gold-plated-jewellery-set": "women",
  "minimalist gold-plated jewellery set": "women",
  "pure-kanjeevaram-silk-saree": "women",
  "pure kanjeevaram silk saree": "women",
  "sequin-embroidered-festive-lehenga": "women",
  "sequin embroidered festive lehenga": "women",
  "quilted-shoulder-bag": "women",
  "quilted shoulder bag": "women",
  "structured-canvas-tote-bag": "women",
  "structured canvas tote bag": "women",
  "mini-crossbody-phone-bag": "women",
  "mini crossbody phone bag": "women",
  "leather-crossbody-bag": "unisex",
  "leather crossbody bag": "unisex",
  "baguette-shoulder-bag": "women",
  "baguette shoulder bag": "women",
  "cat-eye-acetate-sunglasses": "women",
  "cat-eye acetate sunglasses": "women",
  "cotton-dad-cap-women-s": "women",
  "cotton dad cap (women's)": "women",
  "cotton-dad-cap-women-s-": "women",
  "satin-hair-accessories-set": "women",
  "satin hair accessories set": "women",
  "silk-scrunchie-set-pack-of-5": "women",
  "silk scrunchie set (pack of 5)": "women",
  "silk-scrunchie-set-pack-of-5-": "women",
  "acrylic-claw-clip-set": "women",
  "acrylic claw clip set": "women",
  "thin-leather-waist-belt": "women",
  "thin leather waist belt": "women",
  "minimal-stacking-ring-set": "women",
  "minimal stacking ring set": "women",
  "dainty-chain-bracelet": "women",
  "dainty chain bracelet": "women",
  "layered-chain-necklace-set": "women",
  "layered chain necklace set": "women",
  "classic-gold-hoop-earrings": "women",
  "classic gold hoop earrings": "women",
  "statement-drop-earrings": "women",
  "statement drop earrings": "women",
  "retro-oval-sunglasses": "unisex",
  "retro oval sunglasses": "unisex",
  "leather-boots": "women",
  "leather boots": "women",
  "capsule-wardrobe-set": "unisex",
  "capsule wardrobe set": "unisex",
  "smart-glasses": "unisex",
  "smart glasses": "unisex",
  "adidas-samba-og-women-s": "women",
  "adidas samba og (women's)": "women",
  "adidas-samba-og-women-s-": "women",
  "new-balance-550-women-s": "women",
  "new balance 550 (women's)": "women",
  "new-balance-550-women-s-": "women",
  "nike-air-jordan-1-retro-high": "men",
  "nike-dunk-low-retro": "men",
  "birkenstock-boston-clog": "men",
  "heavyweight-oversized-graphic-tee": "men",
  "boxy-drop-shoulder-hoodie": "men",
  "varsity-bomber-jacket": "men",
  "relaxed-fit-utilitarian-cargo-pants": "men",
  "levis-501-original-straight-jeans": "men",
  "satin-slip-midi-dress": "women",
  "oversized-structured-blazer": "women",
  "handloom-banarasi-silk-saree": "women",
  "chikankari-embroidered-cotton-kurta": "women"
};

/**
 * Resolves the gender classification ('men' | 'women' | 'unisex') for any Fashion product
 */
export function getFashionItemGender(identifier: { slug?: string; name?: string } | string): "men" | "women" | "unisex" {
  if (typeof identifier === "string") {
    const key = identifier.toLowerCase().trim();
    if (FASHION_GENDER_MAP[key]) return FASHION_GENDER_MAP[key];
    const normalized = key.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return FASHION_GENDER_MAP[normalized] || "unisex";
  }
  const slug = identifier.slug ? identifier.slug.toLowerCase().trim() : "";
  if (slug && FASHION_GENDER_MAP[slug]) return FASHION_GENDER_MAP[slug];
  const name = identifier.name ? identifier.name.toLowerCase().trim() : "";
  if (name && FASHION_GENDER_MAP[name]) return FASHION_GENDER_MAP[name];
  const normName = name.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return FASHION_GENDER_MAP[normName] || "unisex";
}

/**
 * Return all Fashion products with resolved image URLs and display orders.
 */
export function getFullFashionCatalog(): FashionProduct[] {
  return RAW_FASHION_PRODUCTS.map((p, idx) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: "Fashion",
    subcategory: p.subcategory,
    sectionId: p.sectionId,
    sectionTitle: p.sectionTitle,
    imageUrl: getFashionProductImage(p.id),
    description: p.description,
    gender: p.gender,
    tags: p.tags,
    badge: p.badge,
    featured: Boolean(p.featured),
    trending: Boolean(p.trending),
    displayOrder: idx,
  }));
}

/**
 * Get distinct subcategories for fashion navigation
 */
export function getFashionSubcategories(): Array<{ name: string; count: number }> {
  const map = new Map<string, number>();
  for (const item of RAW_FASHION_PRODUCTS) {
    map.set(item.subcategory, (map.get(item.subcategory) || 0) + 1);
  }
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
}

export const FASHION_STARTING_COUNTS: Record<string, number> = {
  "220-gsm-oversized-plain-drop-shoulder-tee": 91,
  "air-jordan-1-retro-high-og": 102,
  "nike-dunk-low-retro-panda": 78,
  "adidas-samba-og": 89,
  "new-balance-550": 45,
  "asics-gel-kayano-14": 39,
  "birkenstock-boston-suede-leather-clogs": 53,
  "240-gsm-heavyweight-oversized-graphic-tee": 13,
  "400-gsm-boxy-drop-shoulder-fleece-hoodie": 9,
  "retro-wool-blend-varsity-bomber-jacket": 7,
  "multi-pocket-utilitarian-relaxed-cargo-pants": 14,
  "levi-s-501-original-straight-fit-jeans": 19,
  "bias-cut-silk-satin-slip-midi-dress": 132,
  "oversized-double-breasted-tailored-blazer": 32,
  "handloom-pure-katan-banarasi-silk-saree": 63,
  "handcrafted-lucknowi-chikankari-kurta": 5,
  "air-jordan-1": 59,
  "nike-air-force-1-07": 30,
  "nike-air-max-plus-tn": 42,
  "nike-running-shoes": 27,
  "adidas-gazelle-indoor": 19,
  "adidas-originals-campus-00s": 31,
  "adidas-originals": 40,
  "adidas-ultraboost-light": 37,
  "new-balance-9060": 21,
  "new-balance-1906r": 39,
  "asics-gel-nyc": 34,
  "puma-palermo-leather": 24,
  "puma-suede-classic-xxi": 28,
  "converse-chuck-70-vintage-canvas": 78,
  "vans-old-skool-classic-skate-shoes": 54,
  "on-cloudmonster-2": 16,
  "sneakers": 105,
  "crocs-classic-clog": 98,
  "full-grain-leather-chelsea-boots": 32,
  "italian-suede-penny-loafers": 25,
  "chunky-lug-sole-platform-loafers": 21,
  "minimalist-strappy-block-heels": 36,
  "handcrafted-leather-kolhapuri-mojaris": 54,
  "oversized-hoodie": 61,
  "statement-jacket": 12,
  "brushed-cotton-plaid-flannel-overshirt": 21,
  "levi-s-trucker-denim-jacket": 56,
  "fine-wale-corduroy-zip-overshirt": 17,
  "minimalist-loopback-cotton-crewneck": 20,
  "textured-knit-boxy-button-cardigan": 34,
  "supima-cotton-heavyweight-crewneck-tee": 30,
  "tailored-pima-cotton-polo-shirt": 18,
  "pure-european-linen-resort-collar-shirt": 31,
  "classic-oxford-cloth-button-down-shirt": 14,
  "90s-baggy-wide-leg-skater-jeans": 53,
  "double-pleated-tailored-wide-trousers": 13,
  "high-waist-fluid-wide-leg-trousers": 24,
  "stretch-cotton-slim-tapered-chinos": 5,
  "relaxed-french-terry-drawstring-shorts": 23,
  "tiered-pure-linen-summer-maxi-dress": 82,
  "seamless-ribbed-high-neck-crop-top": 65,
  "printed-crepe-floral-wrap-mini-dress": 22,
  "crisp-cotton-poplin-oversized-boyfriend-shirt": 43,
  "chanderi-silk-anarkali-kurta-set-with-dupatta": 18,
  "woven-raw-silk-tailored-nehru-jacket": 7,
  "raw-silk-embroidered-bridal-lehenga-set": 38,
  "jacquard-silk-blend-festive-kurta-pajama": 21,
  "bespoke-royal-bandhgala-jodhpuri-suit": 33,
  "casio-vintage-digital-a168wa-1": 56,
  "casio-g-shock-ga-2100-casioak": 21,
  "titan-edge-ceramic-ultra-slim-watch": 20,
  "seiko-5-sports-automatic-srpd55k1": 34,
  "tissot-prx-powermatic-80-automatic": 12,
  "apple-watch-ultra-2-titanium": 104,
  "fossil-grant-chronograph-leather-watch": 53,
  "urban-roll-top-waterproof-laptop-backpack-25l": 11,
  "minimalist-leather-everyday-crossbody-sling": 9,
  "heavy-duty-16oz-canvas-work-tote-bag": 13,
  "structured-leather-flap-shoulder-handbag": 45,
  "minimalist-full-grain-leather-rfid-cardholder": 15,
  "vintage-90s-tinted-acetate-sunglasses": 25,
  "sunglasses": 59,
  "8mm-cuban-link-stainless-steel-chain-necklace": 36,
  "brushed-silver-geometric-signet-ring": 69,
  "washed-cotton-6-panel-unstructured-dad-cap": 17,
  "full-grain-italian-leather-pin-buckle-belt": 11,
  "nike-dri-fit-high-ventilation-training-tee": 20,
  "adidas-tiro-24-performance-track-pants": 42,
  "under-armour-heatgear-compression-long-sleeve": 58,
  "puma-drycell-5-lightweight-running-shorts": 32,
  "polo-ralph-lauren-custom-fit-oxford-shirt": 46,
  "tommy-hilfiger-regatta-yachting-bomber-jacket": 18,
  "calvin-klein-monogram-organic-cotton-tee": 21,
  "coach-tabby-26-polished-leather-shoulder-bag": 32,
  "boss-virgin-wool-slim-fit-tailored-suit-jacket": 3,
  "royal-challengers-bengaluru-ipl-jersey": 124,
  "mumbai-indians-ipl-jersey": 106,
  "chennai-super-kings-ipl-jersey": 98,
  "fc-barcelona-home-jersey": 145,
  "real-madrid-home-jersey": 157,
  "new-balance-2002r": 23,
  "new-balance-530": 39,
  "nike-air-max-90": 32,
  "nike-air-max-1": 48,
  "nike-blazer-mid-77": 50,
  "adidas-handball-spezial": 20,
  "on-cloud-5": 19,
  "nike-air-max-97": 21,
  "adidas-gazelle-bold-platform": 27,
  "puma-speedcat-og": 30,
  "boxy-fit-cotton-tee": 79,
  "vintage-acid-wash-oversized-tee": 52,
  "wide-leg-relaxed-fit-jeans": 43,
  "nylon-parachute-cargo-pants": 64,
  "relaxed-carpenter-work-pants": 21,
  "full-zip-fleece-hoodie": 12,
  "classic-ma-1-bomber-jacket": 34,
  "classic-denim-trucker-jacket": 136,
  "brushed-flannel-checkered-shirt": 59,
  "oversized-linen-blend-shirt": 44,
  "relaxed-fit-oxford-shirt": 25,
  "cotton-twill-overshirt-jacket": 22,
  "classic-fit-piqu-polo-tee": 13,
  "minimalist-mesh-strap-watch": 34,
  "compact-crossbody-sling-bag": 40,
  "bi-fold-genuine-leather-wallet": 23,
  "reversible-leather-belt": 21,
  "cotton-twill-baseball-cap": 13,
  "classic-leather-ballet-flats": 45,
  "patent-leather-mary-jane-shoes": 58,
  "platform-canvas-sneakers": 102,
  "chunky-dad-sneakers": 28,
  "pointed-toe-stiletto-heels": 121,
  "padded-strap-flat-sandals": 23,
  "nike-dunk-low-women-s": 103,
  "adidas-samba-og-women-s": 46,
  "adidas-gazelle-women-s": 33,
  "new-balance-550-women-s": 41,
  "fitted-ribbed-baby-tee": 119,
  "cotton-crop-top": 29,
  "ribbed-knit-tank-top": 24,
  "structured-boned-corset-top": 101,
  "strapless-tube-top": 71,
  "off-shoulder-ruched-top": 84,
  "oversized-graphic-tee-women-s": 92,
  "oversized-cotton-poplin-shirt-women-s": 76,
  "chunky-knit-oversized-cardigan": 52,
  "fine-knit-fitted-top": 42,
  "cropped-zip-up-hoodie-women-s": 63,
  "oversized-fleece-hoodie-women-s": 39,
  "baggy-wide-leg-jeans-women-s": 73,
  "wide-leg-straight-jeans-women-s": 69,
  "low-rise-cargo-pants-women-s": 94,
  "nylon-parachute-pants-women-s": 49,
  "classic-denim-mini-skirt": 114,
  "pleated-mini-skirt": 99,
  "satin-midi-slip-skirt": 78,
  "flowy-maxi-skirt": 59,
  "linen-co-ord-set": 30,
  "cotton-t-shirt-dress": 25,
  "ribbed-bodycon-mini-dress": 41,
  "oversized-leather-effect-jacket-women-s": 28,
  "cropped-denim-jacket-women-s": 80,
  "satin-bomber-jacket-women-s": 71,
  "faux-leather-moto-jacket": 69,
  "oversized-drop-shoulder-tee-women-s": 56,
  "cotton-printed-kurta-set-with-dupatta": 13,
  "georgette-anarkali-suit-set": 33,
  "printed-ethnic-co-ord-set": 18,
  "pre-draped-concept-saree": 41,
  "handcrafted-bandhani-statement-dupatta": 21,
  "traditional-silver-jhumka-earrings": 59,
  "oxidised-silver-statement-necklace-set": 22,
  "minimalist-gold-plated-jewellery-set": 38,
  "pure-kanjeevaram-silk-saree": 63,
  "sequin-embroidered-festive-lehenga": 31,
  "quilted-shoulder-bag": 54,
  "structured-canvas-tote-bag": 39,
  "mini-crossbody-phone-bag": 21,
  "leather-crossbody-bag": 35,
  "baguette-shoulder-bag": 28,
  "cat-eye-acetate-sunglasses": 57,
  "cotton-dad-cap-women-s": 31,
  "satin-hair-accessories-set": 52,
  "silk-scrunchie-set-pack-of-5": 41,
  "acrylic-claw-clip-set": 38,
  "thin-leather-waist-belt": 27,
  "minimal-stacking-ring-set": 30,
  "dainty-chain-bracelet": 22,
  "layered-chain-necklace-set": 38,
  "classic-gold-hoop-earrings": 52,
  "statement-drop-earrings": 22,
  "retro-oval-sunglasses": 40,
  "leather-boots": 32,
  "capsule-wardrobe-set": 88,
  "smart-glasses": 60,
};
