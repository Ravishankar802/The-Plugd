/**
 * Curated Toys Catalog Data Definition for Plugd
 * 
 * Exactly the 50 specified products with exact names and image URLs.
 */

import { getToysProductImage, DEFAULT_TOYS_IMAGE } from "./product-images";

export interface ToyProduct {
  id: string;
  name: string;
  category: "Toys";
  imageUrl: string;
  description: string;
  tags: string[];
  featured?: boolean;
  displayOrder: number;
}

export const RAW_TOYS_PRODUCTS: Array<{
  id: string;
  name: string;
  imageUrl: string;
  featured?: boolean;
}> = [
  {
    id: "lego-collector-edition",
    name: "LEGO Collector Edition",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBiXwek7speDg9NRMlawsaPM-0qwlQ0wSirKtO64W3WhEx7xcpSg_AmsY&s=10",
    featured: true,
  },
  {
    id: "lego-technic-car",
    name: "LEGO Technic Car",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdir9glXt8r3KhnrSy1ct5e1XlWrz3SZ8vUh_9q-hoDQ&s=10",
    featured: true,
  },
  {
    id: "lego-star-wars-set",
    name: "LEGO Star Wars Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZgoRmRkFg28Qj3-QihtbX8VY2intosghk6HKdGDJV7tf44XHdJiDejd8&s=10",
    featured: true,
  },
  {
    id: "lego-architecture-set",
    name: "LEGO Architecture Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxuFtJve2ncSMFGz7lRU-xoGczsrsyjC5O9tFv9t_QSVxc89qqfTkYT_T9&s=10",
    featured: true,
  },
  {
    id: "remote-control-car",
    name: "Remote Control Car",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdW2AyeYr9uVDD0O4DpImT8ScxmX0PxKizPm5sMa5OLQ&s=10",
    featured: true,
  },
  {
    id: "rc-high-speed-drone",
    name: "RC High-Speed Drone",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgK8Q3VTsUBBfjYSiaUIBV0IldR7nt1ik8gY1QgFqAbhIUGlaJWDOq-NE&s=10",
    featured: true,
  },
  {
    id: "rc-helicopter",
    name: "RC Helicopter",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpvnmxM9DbwMutU7wvZr-V7ASWsOu5Vhzuq-a3tXLJKA1fT1aZJy2faTU&s=10",
    featured: true,
  },
  {
    id: "remote-control-boat",
    name: "Remote Control Boat",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_0k7TTad335uj-A5Rv-XTCt20fHMnAzXihYFE1KwLxrdM2uB3oFSrf2G3&s=10",
    featured: true,
  },
  {
    id: "anime-action-figure",
    name: "Anime Action Figure",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnRM1con0KlHazk1lVfK1Z4k1XnmIjaSGTAZh2k_KH3w&s=10",
    featured: true,
  },
  {
    id: "marvel-action-figure",
    name: "Marvel Action Figure",
    imageUrl: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/1DOVFPMA5-product.jpeg",
    featured: true,
  },
  {
    id: "dc-action-figure",
    name: "DC Action Figure",
    imageUrl: "https://fatcatcollectibles.in/cdn/shop/files/AOBatman.jpg?v=1767865070&width=2048",
    featured: true,
  },
  {
    id: "gundam-model-kit",
    name: "Gundam Model Kit",
    imageUrl: "https://d3nt9em9l1urz8.cloudfront.net/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/b/i/bi2266770-1s-1.jpg",
    featured: true,
  },
  {
    id: "hot-wheels-car",
    name: "Hot Wheels Car",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5A04Enb66iWjKgrpDjkpycfT8UKzrBPeRQ7iBUZ7G-IjdbEPT-IWvsnQ&s=10",
    featured: true,
  },
  {
    id: "diecast-supercar-model",
    name: "Diecast Supercar Model",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtXML-yLuMqHPhnYG_ll4tcsVBLK-RvUCVdjNDb4UmyEYHN3gIfrS_ABA1&s=10",
    featured: true,
  },
  {
    id: "barbie-doll",
    name: "Barbie Doll",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6TSXBLo51HaLdx8HRQCxtsDpmCSF_9fDrf4v38kMtucAMYSQ5Z8Bd8wAL&s=10",
    featured: true,
  },
  {
    id: "baby-doll",
    name: "Baby Doll",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm00qLxQ9rG52TVQv67WLVGG2isD7KgBHMqBI3KXXAC_0HzHhimKa3mzt5&s=10",
    featured: true,
  },
  {
    id: "nerf-blaster",
    name: "Nerf Blaster",
    imageUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/c3b9c202-831c-4121-8de4-30887ecabeb1.png?bg_token=color.background.quaternary",
    featured: true,
  },
  {
    id: "water-gun",
    name: "Water Gun",
    imageUrl: "https://i5.walmartimages.com/seo/Spyra-Go-Water-Blaster-Red_b3d16d1d-620c-4294-88a8-22b43d0e6a05.14a2846e72e795645131904532d4c487.jpeg",
    featured: true,
  },
  {
    id: "beyblade",
    name: "Beyblade",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNprO9A14QhCjNkwlpnu7-qd40SbB1myWsWP1olUkqzuC8r5whih18yKYO&s=10",
    featured: true,
  },
  {
    id: "rubik-s-speed-cube",
    name: "Rubik's Speed Cube",
    imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2023/01/rubikscube-2048px-08392.jpg?width=2048&quality=60&crop=2048:1365&auto=webp",
    featured: true,
  },
  {
    id: "rubik-s-3-3-cube",
    name: "Rubik's 3×3 Cube",
    imageUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/photosV2/adf005d1-c1e0-4602-a97f-ab051d41c01a-retina-large.jpg",
    featured: true,
  },
  {
    id: "chess-set",
    name: "Chess Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgNet72A24SOQ6GAVEcEwbtSz9rA1YQm5QyDP4S3_V35cnYP1wevGIVSA&s=10",
    featured: true,
  },
  {
    id: "monopoly",
    name: "Monopoly",
    imageUrl: "https://m.media-amazon.com/images/I/61qODZoJc5L._AC_UF1000,1000_QL80_.jpg",
    featured: true,
  },
  {
    id: "jenga",
    name: "Jenga",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGN9xaKXbgGsS44WrYXr5M0WuqVyATD33HWF_14FJHzS_WOOB77FBdTgk&s=10",
    featured: true,
  },
  {
    id: "uno",
    name: "UNO",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-Fetayz-q2H-yuTSyn-FBngb0FmR8xKxf8oqAAlHlw_JZUUYT4yJNbQ&s=10",
    featured: true,
  },
  {
    id: "magnetic-building-blocks",
    name: "Magnetic Building Blocks",
    imageUrl: "https://m.media-amazon.com/images/I/71BHmMFaAGL._AC_UF1000,1000_QL80_.jpg",
    featured: true,
  },
  {
    id: "building-blocks-set",
    name: "Building Blocks Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMehcsrGwQ6Z8IXVtwRi3XhPJqcrD-rzUitgc2gxQmlA&s=10",
    featured: true,
  },
  {
    id: "play-doh-set",
    name: "Play-Doh Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRvfM-LgPAqynsEm-NMa0kTYGSKMrutEzbvH9eVn2QfBHSQPFMJKXK3e4&s=10",
    featured: true,
  },
  {
    id: "remote-control-robot",
    name: "Remote Control Robot",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvot1tt_kRe33IfcpN7aTHDycQncTglm9xSnxQNPZs-ASLh5HvqLHJbHY&s=10",
    featured: true,
  },
  {
    id: "robot-building-kit",
    name: "Robot Building Kit",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcXkPSvh-yFkeihP2H3Gm5tgvn2yP4-gw9U00YCLUT_Jaa4ogNG3xzlD4&s=10",
    featured: true,
  },
  {
    id: "toy-train-set",
    name: "Toy Train Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtLcj8bhg8UFP5zEfdQEov-Jj4V5h9rUYQrc06iLS6Dr5OrLoulWkBpmE&s=10",
    featured: true,
  },
  {
    id: "toy-kitchen-set",
    name: "Toy Kitchen Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQldwOMqn0_ICs3ymxTej2I0b8KWkEbuhz_guYzTDUD5pNzwfQKxQQv_BE&s=10",
    featured: true,
  },
  {
    id: "doctor-play-set",
    name: "Doctor Play Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQ1KR1Rubme5BRDSKk7D1DvDFdwW4yqWiq4-vtFfjxw&s=10",
    featured: true,
  },
  {
    id: "dinosaur-figure-set",
    name: "Dinosaur Figure Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1lAl4iRJb0SBpqwYYfzT1o0L1Vx-535Me9xHMTu0u1pgUrw502BQzCppn&s=10",
    featured: true,
  },
  {
    id: "dinosaur-excavation-kit",
    name: "Dinosaur Excavation Kit",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsC7plTaxnEkw-PMKWdEvcK70KYIabsEBek1a3-N1uIi6nc0DE_8DY4yk&s=10",
    featured: true,
  },
  {
    id: "magic-kit",
    name: "Magic Kit",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwLCgOPVDZeNYfrchrMSYKPrtt6_B279dflJU_BTR9jqnAHhhxWKW1rMo&s=10",
    featured: true,
  },
  {
    id: "science-experiment-kit",
    name: "Science Experiment Kit",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQrGw36QGT0Zm7NV9oMQF8xyvMk7ejbrrg2aDiefeUITaBgGFRi07F2iW&s=10",
    featured: true,
  },
  {
    id: "telescope",
    name: "Telescope",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_SJ1mvl7Hr09DICEG05h61tG4UL3aUR8im0PliIpIrc6p9ELOVlcPzoK&s=10",
    featured: true,
  },
  {
    id: "microscope-kit",
    name: "Microscope Kit",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg5IUcpFmDfaplSTI7TtDYhXY4kxh2bdXuqXVIMtfmJfDyYraLHCotyBaf&s=10",
    featured: true,
  },
  {
    id: "kids-musical-keyboard",
    name: "Kids' Musical Keyboard",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfROgOrZynDXHJAIJQbN_IeI8QOkVrH1Sk6fgTA96WSg&s=10",
    featured: true,
  },
  {
    id: "toy-guitar",
    name: "Toy Guitar",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVexBLuzXiAPbQf-AfyIPscbZ18VNfWKsiTb4FsQCH9A&s=10",
    featured: true,
  },
  {
    id: "toy-piano",
    name: "Toy Piano",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT80NpgeyOrSIpWdO-A1dwB-730-K5jfh-UvTTr3d3aS7CPTWYoqSagjPc&s=10",
    featured: true,
  },
  {
    id: "toy-drum-set",
    name: "Toy Drum Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxXLR5d9aVPBWPvQIzcnrXZouPCsbgzw-9jlIw6k5RKg&s=10",
    featured: true,
  },
  {
    id: "plush-teddy-bear",
    name: "Plush Teddy Bear",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1WVszLjEknZbONK4s5O6TF-8jV5pSKmcBTaakBEMD5_bYu86SAQ8N7p-a&s=10",
    featured: true,
  },
  {
    id: "pokemon-plush",
    name: "Pokémon Plush",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj78J9OAsgrpp_HsE7M5K87QoxZRRD1-uQxjvPApImCdtQc8f88PcXoEOA&s=10",
    featured: true,
  },
  {
    id: "pokemon-trading-card-box",
    name: "Pokémon Trading Card Box",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxziJcMt9lDf9v0cphYd73asXUBJicOmI0kSOUiXIKmg&s=10",
    featured: true,
  },
  {
    id: "pokemon-figure-set",
    name: "Pokémon Figure Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhNq0H6jL9An2P_zvWJMypzLjtpaZxb3OOD5SaPuJO5g&s=10",
    featured: true,
  },
  {
    id: "minecraft-lego-set",
    name: "Minecraft LEGO Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_mSk-k7JtlrTfpHdL_GDOia-58T2kunOcyE-HKhjERsIdxXEcA6W4qdzm&s=10",
    featured: true,
  },
  {
    id: "minecraft-figure-set",
    name: "Minecraft Figure Set",
    imageUrl: "https://media.entertainmentearth.com/assets/images/d418d75e85b84968947a4ce9d264250blg.jpg",
    featured: true,
  },
  {
    id: "superhero-costume-set",
    name: "Superhero Costume Set",
    imageUrl: "https://spirit.scene7.com/is/image/Spirit/01628445-a?wid=640&hei=640&fmt=webp",
    featured: true,
  },
];

export function getFullToysCatalog(): ToyProduct[] {
  return RAW_TOYS_PRODUCTS.map((p, idx) => ({
    id: p.id,
    name: p.name,
    category: "Toys",
    imageUrl: getToysProductImage(p.id) || p.imageUrl || DEFAULT_TOYS_IMAGE,
    description: "",
    tags: [p.id, p.name.toLowerCase()],
    featured: Boolean(p.featured),
    displayOrder: idx + 1,
  }));
}
