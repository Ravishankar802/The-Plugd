const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const FASHION_SEEDS = [
  {
    "name": "Air Jordan 1 Retro High OG",
    "slug": "air-jordan-1-retro-high-og",
    "count": 102
  },
  {
    "name": "Nike Dunk Low Retro 'Panda'",
    "slug": "nike-dunk-low-retro-panda",
    "count": 78
  },
  {
    "name": "Adidas Samba OG",
    "slug": "adidas-samba-og",
    "count": 89
  },
  {
    "name": "New Balance 550",
    "slug": "new-balance-550",
    "count": 45
  },
  {
    "name": "ASICS GEL-Kayano 14",
    "slug": "asics-gel-kayano-14",
    "count": 39
  },
  {
    "name": "Birkenstock Boston Suede Leather Clogs",
    "slug": "birkenstock-boston-suede-leather-clogs",
    "count": 53
  },
  {
    "name": "240 GSM Heavyweight Oversized Graphic Tee",
    "slug": "240-gsm-heavyweight-oversized-graphic-tee",
    "count": 13
  },
  {
    "name": "400 GSM Boxy Drop-Shoulder Fleece Hoodie",
    "slug": "400-gsm-boxy-drop-shoulder-fleece-hoodie",
    "count": 9
  },
  {
    "name": "Retro Wool-Blend Varsity Bomber Jacket",
    "slug": "retro-wool-blend-varsity-bomber-jacket",
    "count": 7
  },
  {
    "name": "Multi-Pocket Utilitarian Relaxed Cargo Pants",
    "slug": "multi-pocket-utilitarian-relaxed-cargo-pants",
    "count": 14
  },
  {
    "name": "Levi's 501 Original Straight Fit Jeans",
    "slug": "levi-s-501-original-straight-fit-jeans",
    "count": 19
  },
  {
    "name": "Bias-Cut Silk-Satin Slip Midi Dress",
    "slug": "bias-cut-silk-satin-slip-midi-dress",
    "count": 132
  },
  {
    "name": "Oversized Double-Breasted Tailored Blazer",
    "slug": "oversized-double-breasted-tailored-blazer",
    "count": 32
  },
  {
    "name": "Handloom Pure Katan Banarasi Silk Saree",
    "slug": "handloom-pure-katan-banarasi-silk-saree",
    "count": 63
  },
  {
    "name": "Handcrafted Lucknowi Chikankari Kurta",
    "slug": "handcrafted-lucknowi-chikankari-kurta",
    "count": 5
  },
  {
    "name": "Air Jordan 1",
    "slug": "air-jordan-1",
    "count": 59
  },
  {
    "name": "Nike Air Force 1 '07",
    "slug": "nike-air-force-1-07",
    "count": 30
  },
  {
    "name": "Nike Air Max Plus TN",
    "slug": "nike-air-max-plus-tn",
    "count": 42
  },
  {
    "name": "Nike Running Shoes",
    "slug": "nike-running-shoes",
    "count": 27
  },
  {
    "name": "Adidas Gazelle Indoor",
    "slug": "adidas-gazelle-indoor",
    "count": 19
  },
  {
    "name": "Adidas Originals Campus 00s",
    "slug": "adidas-originals-campus-00s",
    "count": 31
  },
  {
    "name": "Adidas Originals",
    "slug": "adidas-originals",
    "count": 40
  },
  {
    "name": "Adidas Ultraboost Light",
    "slug": "adidas-ultraboost-light",
    "count": 37
  },
  {
    "name": "New Balance 9060",
    "slug": "new-balance-9060",
    "count": 21
  },
  {
    "name": "New Balance 1906R",
    "slug": "new-balance-1906r",
    "count": 39
  },
  {
    "name": "ASICS GEL-NYC",
    "slug": "asics-gel-nyc",
    "count": 34
  },
  {
    "name": "Puma Palermo Leather",
    "slug": "puma-palermo-leather",
    "count": 24
  },
  {
    "name": "Puma Suede Classic XXI",
    "slug": "puma-suede-classic-xxi",
    "count": 28
  },
  {
    "name": "Converse Chuck 70 Vintage Canvas",
    "slug": "converse-chuck-70-vintage-canvas",
    "count": 78
  },
  {
    "name": "Vans Old Skool Classic Skate Shoes",
    "slug": "vans-old-skool-classic-skate-shoes",
    "count": 54
  },
  {
    "name": "On Cloudmonster 2",
    "slug": "on-cloudmonster-2",
    "count": 16
  },
  {
    "name": "Sneakers",
    "slug": "sneakers",
    "count": 105
  },
  {
    "name": "Crocs Classic Clog",
    "slug": "crocs-classic-clog",
    "count": 98
  },
  {
    "name": "Full-Grain Leather Chelsea Boots",
    "slug": "full-grain-leather-chelsea-boots",
    "count": 32
  },
  {
    "name": "Italian Suede Penny Loafers",
    "slug": "italian-suede-penny-loafers",
    "count": 25
  },
  {
    "name": "Chunky Lug-Sole Platform Loafers",
    "slug": "chunky-lug-sole-platform-loafers",
    "count": 21
  },
  {
    "name": "Minimalist Strappy Block Heels",
    "slug": "minimalist-strappy-block-heels",
    "count": 36
  },
  {
    "name": "Handcrafted Leather Kolhapuri Mojaris",
    "slug": "handcrafted-leather-kolhapuri-mojaris",
    "count": 54
  },
  {
    "name": "Oversized Hoodie",
    "slug": "oversized-hoodie",
    "count": 61
  },
  {
    "name": "Statement Jacket",
    "slug": "statement-jacket",
    "count": 12
  },
  {
    "name": "Brushed Cotton Plaid Flannel Overshirt",
    "slug": "brushed-cotton-plaid-flannel-overshirt",
    "count": 21
  },
  {
    "name": "Levi's Trucker Denim Jacket",
    "slug": "levi-s-trucker-denim-jacket",
    "count": 56
  },
  {
    "name": "Fine Wale Corduroy Zip Overshirt",
    "slug": "fine-wale-corduroy-zip-overshirt",
    "count": 17
  },
  {
    "name": "Minimalist Loopback Cotton Crewneck",
    "slug": "minimalist-loopback-cotton-crewneck",
    "count": 20
  },
  {
    "name": "Textured Knit Boxy Button Cardigan",
    "slug": "textured-knit-boxy-button-cardigan",
    "count": 34
  },
  {
    "name": "Supima Cotton Heavyweight Crewneck Tee",
    "slug": "supima-cotton-heavyweight-crewneck-tee",
    "count": 30
  },
  {
    "name": "Tailored Pima Cotton Polo Shirt",
    "slug": "tailored-pima-cotton-polo-shirt",
    "count": 18
  },
  {
    "name": "Pure European Linen Resort Collar Shirt",
    "slug": "pure-european-linen-resort-collar-shirt",
    "count": 31
  },
  {
    "name": "Classic Oxford Cloth Button-Down Shirt",
    "slug": "classic-oxford-cloth-button-down-shirt",
    "count": 14
  },
  {
    "name": "90s Baggy Wide-Leg Skater Jeans",
    "slug": "90s-baggy-wide-leg-skater-jeans",
    "count": 53
  },
  {
    "name": "Double-Pleated Tailored Wide Trousers",
    "slug": "double-pleated-tailored-wide-trousers",
    "count": 13
  },
  {
    "name": "High-Waist Fluid Wide-Leg Trousers",
    "slug": "high-waist-fluid-wide-leg-trousers",
    "count": 24
  },
  {
    "name": "Stretch Cotton Slim Tapered Chinos",
    "slug": "stretch-cotton-slim-tapered-chinos",
    "count": 5
  },
  {
    "name": "Relaxed French Terry Drawstring Shorts",
    "slug": "relaxed-french-terry-drawstring-shorts",
    "count": 23
  },
  {
    "name": "Tiered Pure Linen Summer Maxi Dress",
    "slug": "tiered-pure-linen-summer-maxi-dress",
    "count": 82
  },
  {
    "name": "Seamless Ribbed High-Neck Crop Top",
    "slug": "seamless-ribbed-high-neck-crop-top",
    "count": 65
  },
  {
    "name": "Printed Crepe Floral Wrap Mini Dress",
    "slug": "printed-crepe-floral-wrap-mini-dress",
    "count": 22
  },
  {
    "name": "Crisp Cotton Poplin Oversized Boyfriend Shirt",
    "slug": "crisp-cotton-poplin-oversized-boyfriend-shirt",
    "count": 43
  },
  {
    "name": "Chanderi Silk Anarkali Kurta Set with Dupatta",
    "slug": "chanderi-silk-anarkali-kurta-set-with-dupatta",
    "count": 18
  },
  {
    "name": "Woven Raw Silk Tailored Nehru Jacket",
    "slug": "woven-raw-silk-tailored-nehru-jacket",
    "count": 7
  },
  {
    "name": "Raw Silk Embroidered Bridal Lehenga Set",
    "slug": "raw-silk-embroidered-bridal-lehenga-set",
    "count": 38
  },
  {
    "name": "Jacquard Silk Blend Festive Kurta Pajama",
    "slug": "jacquard-silk-blend-festive-kurta-pajama",
    "count": 21
  },
  {
    "name": "Bespoke Royal Bandhgala Jodhpuri Suit",
    "slug": "bespoke-royal-bandhgala-jodhpuri-suit",
    "count": 33
  },
  {
    "name": "Casio Vintage Digital A168WA-1",
    "slug": "casio-vintage-digital-a168wa-1",
    "count": 56
  },
  {
    "name": "Casio G-Shock GA-2100 'CasiOak'",
    "slug": "casio-g-shock-ga-2100-casioak",
    "count": 21
  },
  {
    "name": "Titan Edge Ceramic Ultra-Slim Watch",
    "slug": "titan-edge-ceramic-ultra-slim-watch",
    "count": 20
  },
  {
    "name": "Seiko 5 Sports Automatic SRPD55K1",
    "slug": "seiko-5-sports-automatic-srpd55k1",
    "count": 34
  },
  {
    "name": "Tissot PRX Powermatic 80 Automatic",
    "slug": "tissot-prx-powermatic-80-automatic",
    "count": 12
  },
  {
    "name": "Apple Watch Ultra 2 Titanium",
    "slug": "apple-watch-ultra-2-titanium",
    "count": 104
  },
  {
    "name": "Fossil Grant Chronograph Leather Watch",
    "slug": "fossil-grant-chronograph-leather-watch",
    "count": 53
  },
  {
    "name": "Urban Roll-Top Waterproof Laptop Backpack 25L",
    "slug": "urban-roll-top-waterproof-laptop-backpack-25l",
    "count": 11
  },
  {
    "name": "Minimalist Leather Everyday Crossbody Sling",
    "slug": "minimalist-leather-everyday-crossbody-sling",
    "count": 9
  },
  {
    "name": "Heavy Duty 16oz Canvas Work Tote Bag",
    "slug": "heavy-duty-16oz-canvas-work-tote-bag",
    "count": 13
  },
  {
    "name": "Structured Leather Flap Shoulder Handbag",
    "slug": "structured-leather-flap-shoulder-handbag",
    "count": 45
  },
  {
    "name": "Minimalist Full-Grain Leather RFID Cardholder",
    "slug": "minimalist-full-grain-leather-rfid-cardholder",
    "count": 15
  },
  {
    "name": "Vintage 90s Tinted Acetate Sunglasses",
    "slug": "vintage-90s-tinted-acetate-sunglasses",
    "count": 25
  },
  {
    "name": "Sunglasses",
    "slug": "sunglasses",
    "count": 59
  },
  {
    "name": "8mm Cuban Link Stainless Steel Chain Necklace",
    "slug": "8mm-cuban-link-stainless-steel-chain-necklace",
    "count": 36
  },
  {
    "name": "Brushed Silver Geometric Signet Ring",
    "slug": "brushed-silver-geometric-signet-ring",
    "count": 69
  },
  {
    "name": "Washed Cotton 6-Panel Unstructured Dad Cap",
    "slug": "washed-cotton-6-panel-unstructured-dad-cap",
    "count": 17
  },
  {
    "name": "Full-Grain Italian Leather Pin-Buckle Belt",
    "slug": "full-grain-italian-leather-pin-buckle-belt",
    "count": 11
  },
  {
    "name": "Nike Dri-FIT High-Ventilation Training Tee",
    "slug": "nike-dri-fit-high-ventilation-training-tee",
    "count": 20
  },
  {
    "name": "Adidas Tiro 24 Performance Track Pants",
    "slug": "adidas-tiro-24-performance-track-pants",
    "count": 42
  },
  {
    "name": "Under Armour HeatGear Compression Long-Sleeve",
    "slug": "under-armour-heatgear-compression-long-sleeve",
    "count": 58
  },
  {
    "name": "Puma dryCELL 5\" Lightweight Running Shorts",
    "slug": "puma-drycell-5-lightweight-running-shorts",
    "count": 32
  },
  {
    "name": "Polo Ralph Lauren Custom Fit Oxford Shirt",
    "slug": "polo-ralph-lauren-custom-fit-oxford-shirt",
    "count": 46
  },
  {
    "name": "Tommy Hilfiger Regatta Yachting Bomber Jacket",
    "slug": "tommy-hilfiger-regatta-yachting-bomber-jacket",
    "count": 18
  },
  {
    "name": "Calvin Klein Monogram Organic Cotton Tee",
    "slug": "calvin-klein-monogram-organic-cotton-tee",
    "count": 21
  },
  {
    "name": "Coach Tabby 26 Polished Leather Shoulder Bag",
    "slug": "coach-tabby-26-polished-leather-shoulder-bag",
    "count": 32
  },
  {
    "name": "BOSS Virgin Wool Slim-Fit Tailored Suit Jacket",
    "slug": "boss-virgin-wool-slim-fit-tailored-suit-jacket",
    "count": 3
  },
  {
    "name": "Royal Challengers Bengaluru IPL Jersey",
    "slug": "royal-challengers-bengaluru-ipl-jersey",
    "count": 124
  },
  {
    "name": "Mumbai Indians IPL Jersey",
    "slug": "mumbai-indians-ipl-jersey",
    "count": 106
  },
  {
    "name": "Chennai Super Kings IPL Jersey",
    "slug": "chennai-super-kings-ipl-jersey",
    "count": 98
  },
  {
    "name": "FC Barcelona Home Jersey",
    "slug": "fc-barcelona-home-jersey",
    "count": 145
  },
  {
    "name": "Real Madrid Home Jersey",
    "slug": "real-madrid-home-jersey",
    "count": 157
  },
  {
    "name": "New Balance 2002R",
    "slug": "new-balance-2002r",
    "count": 23
  },
  {
    "name": "New Balance 530",
    "slug": "new-balance-530",
    "count": 39
  },
  {
    "name": "Nike Air Max 90",
    "slug": "nike-air-max-90",
    "count": 32
  },
  {
    "name": "Nike Air Max 1",
    "slug": "nike-air-max-1",
    "count": 48
  },
  {
    "name": "Nike Blazer Mid '77",
    "slug": "nike-blazer-mid-77",
    "count": 50
  },
  {
    "name": "Adidas Handball Spezial",
    "slug": "adidas-handball-spezial",
    "count": 20
  },
  {
    "name": "On Cloud 5",
    "slug": "on-cloud-5",
    "count": 19
  },
  {
    "name": "Nike Air Max 97",
    "slug": "nike-air-max-97",
    "count": 21
  },
  {
    "name": "Adidas Gazelle Bold Platform",
    "slug": "adidas-gazelle-bold-platform",
    "count": 27
  },
  {
    "name": "Puma Speedcat OG",
    "slug": "puma-speedcat-og",
    "count": 30
  },
  {
    "name": "Boxy Fit Cotton Tee",
    "slug": "boxy-fit-cotton-tee",
    "count": 79
  },
  {
    "name": "Vintage Acid-Wash Oversized Tee",
    "slug": "vintage-acid-wash-oversized-tee",
    "count": 52
  },
  {
    "name": "Wide-Leg Relaxed Fit Jeans",
    "slug": "wide-leg-relaxed-fit-jeans",
    "count": 43
  },
  {
    "name": "Nylon Parachute Cargo Pants",
    "slug": "nylon-parachute-cargo-pants",
    "count": 64
  },
  {
    "name": "Relaxed Carpenter Work Pants",
    "slug": "relaxed-carpenter-work-pants",
    "count": 21
  },
  {
    "name": "Full-Zip Fleece Hoodie",
    "slug": "full-zip-fleece-hoodie",
    "count": 12
  },
  {
    "name": "Classic MA-1 Bomber Jacket",
    "slug": "classic-ma-1-bomber-jacket",
    "count": 34
  },
  {
    "name": "Classic Denim Trucker Jacket",
    "slug": "classic-denim-trucker-jacket",
    "count": 136
  },
  {
    "name": "Brushed Flannel Checkered Shirt",
    "slug": "brushed-flannel-checkered-shirt",
    "count": 59
  },
  {
    "name": "Oversized Linen Blend Shirt",
    "slug": "oversized-linen-blend-shirt",
    "count": 44
  },
  {
    "name": "Relaxed Fit Oxford Shirt",
    "slug": "relaxed-fit-oxford-shirt",
    "count": 25
  },
  {
    "name": "Cotton Twill Overshirt Jacket",
    "slug": "cotton-twill-overshirt-jacket",
    "count": 22
  },
  {
    "name": "Classic Fit Piqué Polo Tee",
    "slug": "classic-fit-piqu-polo-tee",
    "count": 13
  },
  {
    "name": "Minimalist Mesh Strap Watch",
    "slug": "minimalist-mesh-strap-watch",
    "count": 34
  },
  {
    "name": "Compact Crossbody Sling Bag",
    "slug": "compact-crossbody-sling-bag",
    "count": 40
  },
  {
    "name": "Bi-Fold Genuine Leather Wallet",
    "slug": "bi-fold-genuine-leather-wallet",
    "count": 23
  },
  {
    "name": "Reversible Leather Belt",
    "slug": "reversible-leather-belt",
    "count": 21
  },
  {
    "name": "Cotton Twill Baseball Cap",
    "slug": "cotton-twill-baseball-cap",
    "count": 13
  },
  {
    "name": "Classic Leather Ballet Flats",
    "slug": "classic-leather-ballet-flats",
    "count": 45
  },
  {
    "name": "Patent Leather Mary Jane Shoes",
    "slug": "patent-leather-mary-jane-shoes",
    "count": 58
  },
  {
    "name": "Platform Canvas Sneakers",
    "slug": "platform-canvas-sneakers",
    "count": 102
  },
  {
    "name": "Chunky Dad Sneakers",
    "slug": "chunky-dad-sneakers",
    "count": 28
  },
  {
    "name": "Pointed-Toe Stiletto Heels",
    "slug": "pointed-toe-stiletto-heels",
    "count": 121
  },
  {
    "name": "Padded Strap Flat Sandals",
    "slug": "padded-strap-flat-sandals",
    "count": 23
  },
  {
    "name": "Nike Dunk Low (Women's)",
    "slug": "nike-dunk-low-women-s",
    "count": 103
  },
  {
    "name": "Adidas Samba OG (Women's)",
    "slug": "adidas-samba-og-women-s",
    "count": 46
  },
  {
    "name": "Adidas Gazelle (Women's)",
    "slug": "adidas-gazelle-women-s",
    "count": 33
  },
  {
    "name": "New Balance 550 (Women's)",
    "slug": "new-balance-550-women-s",
    "count": 41
  },
  {
    "name": "Fitted Ribbed Baby Tee",
    "slug": "fitted-ribbed-baby-tee",
    "count": 119
  },
  {
    "name": "Cotton Crop Top",
    "slug": "cotton-crop-top",
    "count": 29
  },
  {
    "name": "Ribbed Knit Tank Top",
    "slug": "ribbed-knit-tank-top",
    "count": 24
  },
  {
    "name": "Structured Boned Corset Top",
    "slug": "structured-boned-corset-top",
    "count": 101
  },
  {
    "name": "Strapless Tube Top",
    "slug": "strapless-tube-top",
    "count": 71
  },
  {
    "name": "Off-Shoulder Ruched Top",
    "slug": "off-shoulder-ruched-top",
    "count": 84
  },
  {
    "name": "Oversized Graphic Tee (Women's)",
    "slug": "oversized-graphic-tee-women-s",
    "count": 92
  },
  {
    "name": "Oversized Cotton Poplin Shirt (Women's)",
    "slug": "oversized-cotton-poplin-shirt-women-s",
    "count": 76
  },
  {
    "name": "Chunky Knit Oversized Cardigan",
    "slug": "chunky-knit-oversized-cardigan",
    "count": 52
  },
  {
    "name": "Fine Knit Fitted Top",
    "slug": "fine-knit-fitted-top",
    "count": 42
  },
  {
    "name": "Cropped Zip-Up Hoodie (Women's)",
    "slug": "cropped-zip-up-hoodie-women-s",
    "count": 63
  },
  {
    "name": "Oversized Fleece Hoodie (Women's)",
    "slug": "oversized-fleece-hoodie-women-s",
    "count": 39
  },
  {
    "name": "Baggy Wide-Leg Jeans (Women's)",
    "slug": "baggy-wide-leg-jeans-women-s",
    "count": 73
  },
  {
    "name": "Wide-Leg Straight Jeans (Women's)",
    "slug": "wide-leg-straight-jeans-women-s",
    "count": 69
  },
  {
    "name": "Low-Rise Cargo Pants (Women's)",
    "slug": "low-rise-cargo-pants-women-s",
    "count": 94
  },
  {
    "name": "Nylon Parachute Pants (Women's)",
    "slug": "nylon-parachute-pants-women-s",
    "count": 49
  },
  {
    "name": "Classic Denim Mini Skirt",
    "slug": "classic-denim-mini-skirt",
    "count": 114
  },
  {
    "name": "Pleated Mini Skirt",
    "slug": "pleated-mini-skirt",
    "count": 99
  },
  {
    "name": "Satin Midi Slip Skirt",
    "slug": "satin-midi-slip-skirt",
    "count": 78
  },
  {
    "name": "Flowy Maxi Skirt",
    "slug": "flowy-maxi-skirt",
    "count": 59
  },
  {
    "name": "Linen Co-Ord Set",
    "slug": "linen-co-ord-set",
    "count": 30
  },
  {
    "name": "Cotton T-Shirt Dress",
    "slug": "cotton-t-shirt-dress",
    "count": 25
  },
  {
    "name": "Ribbed Bodycon Mini Dress",
    "slug": "ribbed-bodycon-mini-dress",
    "count": 41
  },
  {
    "name": "Oversized Leather-Effect Jacket (Women's)",
    "slug": "oversized-leather-effect-jacket-women-s",
    "count": 28
  },
  {
    "name": "Cropped Denim Jacket (Women's)",
    "slug": "cropped-denim-jacket-women-s",
    "count": 80
  },
  {
    "name": "Satin Bomber Jacket (Women's)",
    "slug": "satin-bomber-jacket-women-s",
    "count": 71
  },
  {
    "name": "Faux Leather Moto Jacket",
    "slug": "faux-leather-moto-jacket",
    "count": 69
  },
  {
    "name": "Oversized Drop-Shoulder Tee (Women's)",
    "slug": "oversized-drop-shoulder-tee-women-s",
    "count": 56
  },
  {
    "name": "Cotton Printed Kurta Set with Dupatta",
    "slug": "cotton-printed-kurta-set-with-dupatta",
    "count": 13
  },
  {
    "name": "Georgette Anarkali Suit Set",
    "slug": "georgette-anarkali-suit-set",
    "count": 33
  },
  {
    "name": "Printed Ethnic Co-Ord Set",
    "slug": "printed-ethnic-co-ord-set",
    "count": 18
  },
  {
    "name": "Pre-Draped Concept Saree",
    "slug": "pre-draped-concept-saree",
    "count": 41
  },
  {
    "name": "Handcrafted Bandhani Statement Dupatta",
    "slug": "handcrafted-bandhani-statement-dupatta",
    "count": 21
  },
  {
    "name": "Traditional Silver Jhumka Earrings",
    "slug": "traditional-silver-jhumka-earrings",
    "count": 59
  },
  {
    "name": "Oxidised Silver Statement Necklace Set",
    "slug": "oxidised-silver-statement-necklace-set",
    "count": 22
  },
  {
    "name": "Minimalist Gold-Plated Jewellery Set",
    "slug": "minimalist-gold-plated-jewellery-set",
    "count": 38
  },
  {
    "name": "Pure Kanjeevaram Silk Saree",
    "slug": "pure-kanjeevaram-silk-saree",
    "count": 63
  },
  {
    "name": "Sequin Embroidered Festive Lehenga",
    "slug": "sequin-embroidered-festive-lehenga",
    "count": 31
  },
  {
    "name": "Quilted Shoulder Bag",
    "slug": "quilted-shoulder-bag",
    "count": 54
  },
  {
    "name": "Structured Canvas Tote Bag",
    "slug": "structured-canvas-tote-bag",
    "count": 39
  },
  {
    "name": "Mini Crossbody Phone Bag",
    "slug": "mini-crossbody-phone-bag",
    "count": 21
  },
  {
    "name": "Leather Crossbody Bag",
    "slug": "leather-crossbody-bag",
    "count": 35
  },
  {
    "name": "Baguette Shoulder Bag",
    "slug": "baguette-shoulder-bag",
    "count": 28
  },
  {
    "name": "Cat-Eye Acetate Sunglasses",
    "slug": "cat-eye-acetate-sunglasses",
    "count": 57
  },
  {
    "name": "Cotton Dad Cap (Women's)",
    "slug": "cotton-dad-cap-women-s",
    "count": 31
  },
  {
    "name": "Satin Hair Accessories Set",
    "slug": "satin-hair-accessories-set",
    "count": 52
  },
  {
    "name": "Silk Scrunchie Set (Pack of 5)",
    "slug": "silk-scrunchie-set-pack-of-5",
    "count": 41
  },
  {
    "name": "Acrylic Claw Clip Set",
    "slug": "acrylic-claw-clip-set",
    "count": 38
  },
  {
    "name": "Thin Leather Waist Belt",
    "slug": "thin-leather-waist-belt",
    "count": 27
  },
  {
    "name": "Minimal Stacking Ring Set",
    "slug": "minimal-stacking-ring-set",
    "count": 30
  },
  {
    "name": "Dainty Chain Bracelet",
    "slug": "dainty-chain-bracelet",
    "count": 22
  },
  {
    "name": "Layered Chain Necklace Set",
    "slug": "layered-chain-necklace-set",
    "count": 38
  },
  {
    "name": "Classic Gold Hoop Earrings",
    "slug": "classic-gold-hoop-earrings",
    "count": 52
  },
  {
    "name": "Statement Drop Earrings",
    "slug": "statement-drop-earrings",
    "count": 22
  },
  {
    "name": "Retro Oval Sunglasses",
    "slug": "retro-oval-sunglasses",
    "count": 40
  },
  {
    "name": "Leather Boots",
    "slug": "leather-boots",
    "count": 32
  },
  {
    "name": "Capsule Wardrobe Set",
    "slug": "capsule-wardrobe-set",
    "count": 88
  },
  {
    "name": "Smart Glasses",
    "slug": "smart-glasses",
    "count": 60
  }
];

async function seedFashionCounts() {
  try {
    const fashionCat = await prisma.category.findUnique({ where: { slug: 'fashion' } });
    if (!fashionCat) {
      console.log('[SEED_FASHION_COUNTS] Fashion category not found, skipping.');
      return;
    }

    const items = await prisma.catalogItem.findMany({
      where: { categoryId: fashionCat.id },
    });

    console.log(`[SEED_FASHION_COUNTS] Checking ${items.length} Fashion items...`);
    let updated = 0;

    for (const seed of FASHION_SEEDS) {
      const matchedItems = items.filter(i =>
        i.slug.toLowerCase() === seed.slug.toLowerCase() ||
        i.name.toLowerCase() === seed.name.toLowerCase()
      );

      for (const item of matchedItems) {
        if (item.addedCount == null || item.addedCount < seed.count) {
          await prisma.catalogItem.update({
            where: { id: item.id },
            data: { addedCount: seed.count },
          });
          item.addedCount = seed.count;
          updated++;
        }
      }
    }

    console.log(`[SEED_FASHION_COUNTS] Seeded/updated ${updated} Fashion counts.`);
  } catch (error) {
    console.error('[SEED_FASHION_COUNTS] Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedFashionCounts();
}

module.exports = { seedFashionCounts, FASHION_SEEDS };
