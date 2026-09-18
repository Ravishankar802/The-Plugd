/**
 * Vehicles Catalog Data Definition for Plugd
 * 
 * EXACTLY 2 subcategories:
 * 1. Cars (104)
 * 2. Bikes (27)
 * 
 * Top Picks: 15 curated vehicles
 * Total unique vehicles: 131
 * Zero descriptions, zero prices.
 */

import { getVehiclesProductImage, DEFAULT_VEHICLES_IMAGE } from "./product-images";

export interface VehicleProduct {
  id: string;
  name: string;
  brand: string;
  category: "Vehicles";
  subcategory: "Cars" | "Bikes";
  sectionId: string;
  sectionTitle: string;
  imageUrl: string;
  description: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  displayOrder: number;
}

export interface VehicleSection {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  displayOrder: number;
  productIds: string[];
}

export function slugifyVehicle(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getBrandFromName(name: string): string {
  const parts = name.split(/[\s-]/);
  return parts[0];
}

export const BIKES_DATA = [
  {
    "name": "Royal Enfield Continental GT 650",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLQYR7BtF6npUcPYS0oKutoaGMRwgAC5cQc_vM7O1mQA&s=10"
  },
  {
    "name": "Royal Enfield Interceptor 650",
    "image": "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/royalenfield-interceptor-standard1788441744015.jpg?q=80"
  },
  {
    "name": "Aprilia 457",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFowFUlfjKck4dq-A3qazISHZyehLAz5WTW0Wk_xkWQ&s"
  },
  {
    "name": "Triumph Street Triple 765 RS",
    "image": "https://media.triumphmotorcycles.co.uk/image/upload/f_auto/q_auto:eco/sitecoremedialibrary/media-library/images/motorcycles/my26%20colours/street%20triple/street-triple-r-my26-phantom-black-rhs-1080.png"
  },
  {
    "name": "Triumph Speed Triple 1200 RS",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCrKV0dyxKIjKHKUGWq52pvVL63kmMLVQjun5gMWpCAQ&s"
  },
  {
    "name": "Kawasaki Z900",
    "image": "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--standard1761118078928.jpg?q=80"
  },
  {
    "name": "Kawasaki Z1100",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVp5B1S2RPk95FYMII-J8IEeXw6opeMItEbh9C2180xg&s"
  },
  {
    "name": "Kawasaki Ninja ZX-6R",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMW7bb61wr4_BzDgfjIou7rFzNnVHdSpJBLOv-b0z8sQ&s=10"
  },
  {
    "name": "Kawasaki Ninja ZX-10R",
    "image": "https://asset.autocarindia.com/static/models/colors/20260702_062025_dd8a4d67.png"
  },
  {
    "name": "Kawasaki Ninja H2",
    "image": "https://imgd.aeplcdn.com/664x374/n/cw/ec/155277/ninja-h2-sx-right-front-three-quarter.jpeg?isig=0&q=80"
  },
  {
    "name": "Kawasaki Ninja H2R",
    "image": "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/kawasaki-select-model-mirror-coated-matte-spark-black-1676442407791.png?q=80"
  },
  {
    "name": "BMW S1000RR",
    "image": "https://imgd.aeplcdn.com/1280x720/n/cw/ec/1/versions/bmw-s1000rr-standard1737458444675.jpg"
  },
  {
    "name": "BMW M1000RR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRka4tq680G5Kh-80i4bCg9ceYrw1I01ypvjxInZQ_LlQ&s"
  },
  {
    "name": "Ducati Monster",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTGf_wiqhlFOgCeL1ednggYP0VbzVV2scVIwBuxshZ0g&s=10"
  },
  {
    "name": "Ducati XDiavel V4",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9GnLRumcX0IBWGpKtnbYFnjZd75C2GrWsOGUEZTHB5Hwot4djnTc1esI&s=10"
  },
  {
    "name": "Ducati Streetfighter V4S",
    "image": "https://www.bikewale.com/n/cw/ec/1/versions/--standard1761911951384.jpg"
  },
  {
    "name": "Ducati Panigale V4S",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2y9ix0Q9bcquZpgt8kEBngbTLfSAizTjAUNNL-2rgHWPokqcN5JiyiTk&s=10"
  },
  {
    "name": "Ducati Panigale V4R",
    "image": "https://images.ctfassets.net/x7j9qwvpvr5s/2jHxDIZFCef9gEaxe4gwX8/c431b65f334400dc9b0b1133fb848a49/2025-09-19_Panigale-V4-R-MY25-360_0017_it-16.png?w=1920&fm=webp&q=95"
  },
  {
    "name": "KTM 1390 Super Duke R",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAfmwMMLk8acoKinJdPTzeJGrQCRztl3uMnb5PqmASQw&s=10"
  },
  {
    "name": "Harley-Davidson X440T",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmYBgwqD1m1-PPrmX-f5Pqumh8nEuB1CTbhLNTTGADgQ&s=10"
  },
  {
    "name": "Harley-Davidson Nightster",
    "image": "https://www.bikewale.com/n/wlc6ohb_1879773.jpg"
  },
  {
    "name": "Harley-Davidson Sportster S",
    "image": "https://imgd.aeplcdn.com/476x268/n/cw/ec/211149/sportster-s-right-side-view-15.png?isig=0"
  },
  {
    "name": "Harley-Davidson Fat Boy",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJfulca3JTtQAyYMsASDpr_MKhLbxM94xwfK9breVBjA&s"
  },
  {
    "name": "Yamaha R9",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSob5JfMfDCa7p6tpkAbDXAc8EwD1ouk4r_FQRswnpqyg&s=10"
  },
  {
    "name": "Yamaha R7",
    "image": "https://imgd.aeplcdn.com/1280x720/n/cw/ec/146939/r7-right-front-three-quarter.jpeg?isig=0"
  },
  {
    "name": "Honda CBR1000RR-R Fireblade",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCGJfkkyw0JSuCO7bunj4wAQ5q9Ri1KL64g6G1j3ILXQ&s=10"
  },
  {
    "name": "Aprilia RSV4 1100 Factory",
    "image": "https://apriliaindia.com/images/rsv4/aprilia_rsv4_model2.webp"
  }
] as const;

export const CARS_DATA = [
  {
    "name": "Rolls-Royce Cullinan",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXGhE06dhz-YuINYjFwW_5S9ipDjnSGgAyYyhg13yQ7dRSGwTM1TEL_4g&s=10"
  },
  {
    "name": "Rolls-Royce Phantom",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ldTSS83HNY2zDycCvldOvVjWILvn_mou6qbquzUIlm-CFo8_zeMtgp5y&s=10"
  },
  {
    "name": "Rolls-Royce Spectre",
    "image": "https://hips.hearstapps.com/hmg-prod/images/2024-rolls-royce-spectre-464-671fa79551ad8.jpg?crop=0.605xw:0.510xh;0.124xw,0.383xh&resize=640"
  },
  {
    "name": "Mercedes-AMG G63",
    "image": "https://www.topgear.com/sites/default/files/2024/11/1-Mercedes-AMG-G63-review-UK-2024.jpg"
  },
  {
    "name": "BMW M4",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK9b-2Rtg9JTg8d-zrH9elCUCbRM1OElTNjow_9PT0DCow82YNYpihK8uP&s=10"
  },
  {
    "name": "BMW M5",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSka0_zsda1GVpb3sWJ_XyKcX8hetDFZSiR2xY0E9YYGE6ODKzh_oBougWk&s=10"
  },
  {
    "name": "BMW M8",
    "image": "https://images.pistonheads.com/nimg/48516/mceu_28130768111715370648938.jpg"
  },
  {
    "name": "Ferrari 296 GTB",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLADKYxXzJ_AKCII4npk0VIOYnO6PT266IeyxKeHusJIMcFf1IBbnZteKi&s=10"
  },
  {
    "name": "Ferrari 296 GTS",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHgvdX_IWW5n6gTZUrJ9FpKdwyMxwvVy5vswDZIzqJiO6x6SFvCJQitw&s=10"
  },
  {
    "name": "Ferrari 812 Superfast",
    "image": "https://stimg.cardekho.com/images/carexteriorimages/360x240/Ferrari/Ferrari-812-SuperFast/047.jpg"
  },
  {
    "name": "Porsche 918 Spyder",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr8U_iiPkNIAULuqPUGovF2cQzHpB3zdiNL4UZT8YKVHCE65YxGxhLi8A&s=10"
  },
  {
    "name": "McLaren P1",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUxguMkNPkSwNzlwarigzx7BBWkTg8EPkbyWAgIYxIlEUZrmYGBW8sWE88&s=10"
  },
  {
    "name": "McLaren P1 GTR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPW7RgL-Y1t8FSt1anTScc5tT-D7HJl-RgHyButZpT_xiaPzuGxojvUw8&s=10"
  },
  {
    "name": "McLaren Senna",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlRrduIzo-H0XTPtJGomqeumactGd3HLxhtnPybq8pDn0WGZn1-aaKpIg&s=10"
  },
  {
    "name": "McLaren Senna GTR",
    "image": "https://www.thespeedjournal.com/wp-content/uploads/2020/09/mclaren-senna-gtr-lm-11.jpg"
  },
  {
    "name": "McLaren Speedtail",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStKUGACurI__rAwA6HExH8WJiv_3Q_zAoZ_UkpVV0EhsEGKkeHQxDZ4tR3&s=10"
  },
  {
    "name": "McLaren Solus GT",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdmYSZmI-10L68xk5cKNnvdLyOGgXkmRU88ncPZPsbwjeg_UHEy0Iskb4&s=10"
  },
  {
    "name": "McLaren Elva",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQxZ8CcuPZTRhvSToExQ00l9cHqN3c1nBoKwVRDzTsXe0gO3z5tXLLycSl&s=10"
  },
  {
    "name": "Porsche 911 (pink)",
    "image": "https://i.pinimg.com/736x/af/f7/db/aff7dbc0a04399330fc0435ef26277cb.jpg"
  },
  {
    "name": "Mercedes-Maybach S-Class",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAScBdITqYs6xmYKjsdiuJE8t51LoMzOHIRXfHx360RyGOPDKbr5iXtHK9&s=10"
  },
  {
    "name": "Mercedes-Maybach GLS 600",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGvUn0f4LSojTSlpFbfXSZ4FJs2UOhBAv4YxFw4jmYOe6Nlq2imggD9h4M&s=10"
  },
  {
    "name": "Range Rover SV",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHSH-PBpxStD3j34s_rR0GCAvq4uzoxG9UfQsQAd_aVh85mInoZwbhrgg&s=10"
  },
  {
    "name": "Range Rover Sport",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxS1asLbWc-SvnUkWTYnQll3DDInMMb6vppsXJyJd3l-cdhpANi6l1mnI&s=10"
  },
  {
    "name": "Land Rover Defender",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzRtjc8qC1-Ro_fI8BjYOurt2cSKYEyo9IbpXK6O8M3JYdO0331MViWn8&s=10"
  },
  {
    "name": "Jeep Wrangler",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzJXrgdDWbmi5BcZi3S5Z0EdObA2NblT2ZvPiaLqvocgl2_gio3A77E4eE&s=10"
  },
  {
    "name": "Ford Raptor R",
    "image": "https://cdn.motor1.com/images/mgl/mM29ZR/s1/2024-ford-f-150-raptor-r-first-drive.jpg"
  },
  {
    "name": "Ram TRX",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_DPWCJ06BsPoML57rVwMUWOkFx_-Ed4tYvrGSwUGdPqyzclCmhx5YYvE&s=10"
  },
  {
    "name": "Tesla Cybertruck",
    "image": "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc5/awd-cybertruck.jpg"
  },
  {
    "name": "Tesla Model S Plaid",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ajo2UkAPvw8EM5G0vIMgOTOI4YKWsRUzPE1it4QPhUoPr6086Rwv351t&s=10"
  },
  {
    "name": "Ferrari 812 Competizione",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfbdVxgnDzUsJ478PwnbM9_Jp2E6rm1Vt75Q-MJhg0pA&s=10"
  },
  {
    "name": "Ferrari SF90 Stradale",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQroQUeONamE__MzGFp6_yoDYEo6AgLb1mmeTmxzMX58gXIKYZbCgOl2Bpu&s=10"
  },
  {
    "name": "Ferrari SF90 Spider",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY7HrzZ94SYa0CRgOEVZuyJMjTgM27G9cd-_epqX04EQ6Fy_Pk9LfCf_M&s=10"
  },
  {
    "name": "Ferrari 12 Cilindri",
    "image": "https://hips.hearstapps.com/hmg-prod/images/new-ferrari-v12-ext-04-design-red-media-66352eb2086eb.jpg?crop=1xw:0.8875739644970414xh;center,top&resize=1200"
  },
  {
    "name": "Ferrari 12 Cilindri Spider",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKBAd7XO4xxkwuTdY-9qr5VWdZiRh0c5J--I9WjwjecsXioOM6bKUqoFA&s=10"
  },
  {
    "name": "Ferrari 849 Testarossa",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1lJ5oaURWBaOKKQRvGx1JS_IxpicgzaPnWHc308UQvLEvlmUBLX2Ahy44&s=10"
  },
  {
    "name": "Ferrari 849 Testarossa Spider",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtZCgerBf-tojCd9HMo1ckc5BmOb2M-TlWfTJQ2DijqvWRwErU0I35Qm4&s=10"
  },
  {
    "name": "Lamborghini Huracán Evo",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXwiUfDIOqItzDIGH1RrLxEqrSPC4tPuSCgtmbn1z13IfGb3eDzTRPeWs&s=10"
  },
  {
    "name": "Lamborghini Huracán STO",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTASslLorWJApw-m6pQKNmzm-fMWra17iFpq-2bxXeKuF--hpzIii8OKzY&s=10"
  },
  {
    "name": "Lamborghini Huracán Tecnica",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw4XXkOfs7kbOsSFUgvUoaZKhVTRypRrVGlX4g0zIB87u6-P8zOXtGd_w&s=10"
  },
  {
    "name": "Lamborghini Aventador SVJ",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFQZ-G6x8_LLhs2NPchQIoQ-liW-KLqPZLKcDHVcYxJIcsH35rzaNQj_o&s=10"
  },
  {
    "name": "Lamborghini Murciélago",
    "image": "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/masterpieces/murcielago-lp-650-roadster/murcielago_lp650_roadster_over_rev_01_m_0.jpg"
  },
  {
    "name": "Lamborghini Revuelto",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyo1w3urVJyC_y6WmW-2dxUXY_-50K7AXaBnL74yxTow&s=10"
  },
  {
    "name": "Lamborghini Temerario",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpd1nB2dsF1XHIKnLpZ-If-OSnhwxeJEiPh9DHPj6cvg&s=10"
  },
  {
    "name": "Porsche 911 Turbo S",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqx_K0BsqTHRSytglKs333aD1XcFMcdLFezlgC2EHaug&s=10"
  },
  {
    "name": "Porsche 911 GT3",
    "image": "https://i.pinimg.com/1200x/14/2c/4f/142c4ffbbd185e2d9f776b3f9d687276.jpg"
  },
  {
    "name": "Porsche 911 GT3 RS",
    "image": "https://i.pinimg.com/736x/10/36/43/1036438f26e29568030077e27e78f769.jpg"
  },
  {
    "name": "Aston Martin Vantage",
    "image": "https://i.pinimg.com/1200x/f0/14/dc/f014dc6fbc1894774237512f1e765989.jpg"
  },
  {
    "name": "Aston Martin Vanquish",
    "image": "https://i.pinimg.com/736x/11/50/e7/1150e7a1e225c6712c09641e5fd684d3.jpg"
  },
  {
    "name": "Aston Martin DB12",
    "image": "https://i.pinimg.com/1200x/0c/0c/96/0c0c96cff73a87d3d9c5f3e67d8c527c.jpg"
  },
  {
    "name": "Aston Martin DBS Superleggera",
    "image": "https://i.pinimg.com/1200x/2a/f2/3c/2af23c38213ada8bca3430a6d1452716.jpg"
  },
  {
    "name": "Aston Martin DBS 770 Ultimate",
    "image": "https://i.pinimg.com/736x/a9/e3/02/a9e3024bdabeffd304bba9a27e0d6008.jpg"
  },
  {
    "name": "McLaren 720S",
    "image": "https://i.pinimg.com/736x/8e/4e/37/8e4e371101af62e6a29583a225701e79.jpg"
  },
  {
    "name": "McLaren 750S",
    "image": "https://i.pinimg.com/1200x/ab/de/4e/abde4ec8956ccb482a29f549a69997c3.jpg"
  },
  {
    "name": "McLaren 765LT",
    "image": "https://i.pinimg.com/736x/a6/e8/3f/a6e83f7637508bedac6c2e2fe3b51711.jpg"
  },
  {
    "name": "Ferrari Purosangue",
    "image": "https://i.pinimg.com/1200x/40/e4/65/40e4658515441cfbffa7b7e35a484a61.jpg"
  },
  {
    "name": "Lamborghini Urus",
    "image": "https://i.pinimg.com/736x/68/3d/3a/683d3a732cbaf6bd5a097113ce56f61c.jpg"
  },
  {
    "name": "Porsche Cayenne",
    "image": "https://i.pinimg.com/1200x/89/73/94/8973946fa228aefbdcedd83b7085dce4.jpg"
  },
  {
    "name": "Aston Martin DBX",
    "image": "https://i.pinimg.com/1200x/06/c9/6e/06c96eb18e4bc45b0bf87db55387c036.jpg"
  },
  {
    "name": "McLaren W1",
    "image": "https://i.pinimg.com/1200x/02/d1/c5/02d1c508599acdc9716ad665b1476a93.jpg"
  },
  {
    "name": "McLaren F1",
    "image": "https://i.pinimg.com/736x/ef/2c/1b/ef2c1bc9126d96e4f5d68a8eb61d4368.jpg"
  },
  {
    "name": "Ferrari LaFerrari",
    "image": "https://i.pinimg.com/1200x/08/c9/d3/08c9d3a94f0060994254c3342624d864.jpg"
  },
  {
    "name": "Ferrari LaFerrari Aperta",
    "image": "https://i.pinimg.com/1200x/22/ce/e2/22cee253cdb96c2c187aa9d5f4e60021.jpg"
  },
  {
    "name": "Ferrari Daytona SP3",
    "image": "https://i.pinimg.com/1200x/ce/1b/f6/ce1bf6dd45496e0625b2e5282ec02ae6.jpg"
  },
  {
    "name": "Ferrari Monza SP1",
    "image": "https://i.pinimg.com/736x/0b/82/f7/0b82f7cd3bad6b520521bd39145f2950.jpg"
  },
  {
    "name": "Ferrari Monza SP2",
    "image": "https://i.pinimg.com/1200x/66/08/99/6608991b41e8b09f3c90613a2fc5687d.jpg"
  },
  {
    "name": "Lamborghini Sian",
    "image": "https://i.pinimg.com/736x/b2/85/33/b28533b62967b90790f46bbd738bde84.jpg"
  },
  {
    "name": "Lamborghini Veneno Roadster",
    "image": "https://i.pinimg.com/1200x/db/25/23/db2523edd91d495ce46a377195c91d62.jpg"
  },
  {
    "name": "Aston Martin Vulcan",
    "image": "https://i.pinimg.com/736x/c4/7a/00/c47a00cfe1aef22c6ba6b76b627861e3.jpg"
  },
  {
    "name": "Aston Martin Valhalla",
    "image": "https://i.pinimg.com/236x/62/ee/20/62ee20dc6014d9f2dd48993b6185ac07.jpg"
  },
  {
    "name": "Aston Martin Valour",
    "image": "https://i.pinimg.com/1200x/7a/4a/cf/7a4acfef8df8a8efbfcc54ef451898ac.jpg"
  },
  {
    "name": "Aston Martin Valiant",
    "image": "https://i.pinimg.com/1200x/21/2e/90/212e90ebd6dcd4d9c96c9cac43877ef5.jpg"
  },
  {
    "name": "Aston Martin Valen",
    "image": "https://i.pinimg.com/236x/38/5e/ce/385ecec83801df33e453465476513d1a.jpg"
  },
  {
    "name": "Aston Martin Valkyrie",
    "image": "https://i.pinimg.com/1200x/87/c8/a2/87c8a26e320f284ce89b9beafde4e7e5.jpg"
  },
  {
    "name": "Mercedes-AMG Project One",
    "image": "https://i.pinimg.com/1200x/66/24/ed/6624ed516028c7a4c72f021fccfb9d48.jpg"
  },
  {
    "name": "Rimac Nevera",
    "image": "https://i.pinimg.com/236x/f7/ce/d5/f7ced51e0dec5146ad6087d9bb82cfb6.jpg"
  },
  {
    "name": "Rimac Nevera R",
    "image": "https://i.pinimg.com/736x/a9/f7/80/a9f78048f2db5d3d49d80e868aadd6c7.jpg"
  },
  {
    "name": "Bugatti Veyron",
    "image": "https://i.pinimg.com/1200x/01/47/6c/01476cd7f3a11d4e9d314c8ef398d938.jpg"
  },
  {
    "name": "Bugatti Chiron Super Sport 300+",
    "image": "https://i.pinimg.com/736x/6d/6f/05/6d6f05d450f5999da6eaa2426c65c1f2.jpg"
  },
  {
    "name": "Bugatti Chiron Pur Sport",
    "image": "https://i.pinimg.com/1200x/bc/e7/81/bce781b2b76d1f521307e336eef8f567.jpg"
  },
  {
    "name": "Bugatti Mistral",
    "image": "https://i.pinimg.com/736x/28/5d/1b/285d1bc7cd06574acecde92e03dd5334.jpg"
  },
  {
    "name": "Bugatti Divo",
    "image": "https://i.pinimg.com/736x/0e/6d/80/0e6d80f7b3e68d90e38a22138fed8a48.jpg"
  },
  {
    "name": "Bugatti Centodieci",
    "image": "https://i.pinimg.com/1200x/da/df/1d/dadf1d00e17cac9dc81df5e93f31ffce.jpg"
  },
  {
    "name": "Bugatti Bolide",
    "image": "https://i.pinimg.com/736x/7e/fc/8d/7efc8da7e679872ee442305b7deb7261.jpg"
  },
  {
    "name": "Bugatti Tourbillon",
    "image": "https://i.pinimg.com/736x/3f/53/e9/3f53e940995096265f3ca35ef23306aa.jpg"
  },
  {
    "name": "Koenigsegg Jesko Absolut",
    "image": "https://i.pinimg.com/1200x/55/a6/b5/55a6b58f00a5870ac1692cfd7ddf4ad2.jpg"
  },
  {
    "name": "Koenigsegg Jesko Attack",
    "image": "https://i.pinimg.com/736x/29/d3/7d/29d37da7c2b1d9b8db59ad81ef41df7f.jpg"
  },
  {
    "name": "Koenigsegg Gemera",
    "image": "https://i.pinimg.com/736x/2a/2c/b6/2a2cb6c21ade3e78f8a585e09ea08c78.jpg"
  },
  {
    "name": "Koenigsegg Agera",
    "image": "https://i.pinimg.com/1200x/75/bc/91/75bc912626c9b435b3e79742e66ec7fe.jpg"
  },
  {
    "name": "Koenigsegg Agera R",
    "image": "https://i.pinimg.com/1200x/b9/61/80/b96180f46c1f17ae8c21b592c8ad6e4d.jpg"
  },
  {
    "name": "Koenigsegg Agera S",
    "image": "https://i.pinimg.com/1200x/d0/b5/e5/d0b5e54c189fac57041c67bef3a84fd8.jpg"
  },
  {
    "name": "Koenigsegg Agera RS",
    "image": "https://i.pinimg.com/736x/ec/0a/6d/ec0a6d8bcea0560f82c76f5c2e755b61.jpg"
  },
  {
    "name": "Koenigsegg Regera",
    "image": "https://i.pinimg.com/1200x/9d/4b/87/9d4b87c180e45f8b51863525ecb21dcb.jpg"
  },
  {
    "name": "Koenigsegg CCX",
    "image": "https://i.pinimg.com/736x/62/34/00/62340059413c9eb024ca0fdfce019712.jpg"
  },
  {
    "name": "Koenigsegg CCR",
    "image": "https://i.pinimg.com/1200x/bd/1c/c6/bd1cc6bfd94a4b077136172b1e05f2ee.jpg"
  },
  {
    "name": "Koenigsegg CCXR",
    "image": "https://i.pinimg.com/736x/2e/b5/89/2eb589cb1efac3cdf5f4ae33f1c8d29f.jpg"
  },
  {
    "name": "Koenigsegg CCGT",
    "image": "https://i.pinimg.com/736x/ac/c8/be/acc8be69fbf1886a0fd23261764105ee.jpg"
  },
  {
    "name": "Koenigsegg CC8S",
    "image": "https://i.pinimg.com/1200x/aa/91/19/aa91193da5749605fe5bb0d2995186f6.jpg"
  },
  {
    "name": "Koenigsegg CC850",
    "image": "https://i.pinimg.com/1200x/77/94/1c/77941cf8050dc9e3c523277e44c5edf1.jpg"
  },
  {
    "name": "Pagani Zonda",
    "image": "https://i.pinimg.com/736x/f1/ee/ec/f1eeec004a8fbece02069e588d768d2c.jpg"
  },
  {
    "name": "Pagani Huayra",
    "image": "https://i.pinimg.com/736x/4a/b7/14/4ab714094d09ce7592849af851e275ec.jpg"
  },
  {
    "name": "Pagani Utopia",
    "image": "https://i.pinimg.com/736x/33/eb/6d/33eb6d0586ad9ce455ed346122584c2b.jpg"
  },
  {
    "name": "Pagani Grandi Complicazioni",
    "image": "https://i.pinimg.com/1200x/78/0b/f0/780bf078faec9154806d1bac99b11c3c.jpg"
  },
  {
    "name": "Hennessey Venom F5",
    "image": "https://i.pinimg.com/736x/fe/70/69/fe70696416db67f780c14d22326769b7.jpg"
  },
  {
    "name": "Hennessey Venom F5 Roadster",
    "image": "https://i.pinimg.com/736x/15/68/a2/1568a2830459cec76a7d1e1918df53ba.jpg"
  }
] as const;

export const VEHICLES_TOP_PICKS_NAMES = [
  "Bugatti Chiron Super Sport 300+",
  "Koenigsegg Jesko Absolut",
  "Pagani Huayra",
  "Aston Martin Valkyrie",
  "Ferrari LaFerrari",
  "McLaren P1",
  "Porsche 911 GT3 RS",
  "Porsche 911 (pink)",
  "Kawasaki Ninja H2R",
  "BMW S1000RR",
  "BMW M1000RR",
  "Ducati Panigale V4S",
  "Ducati Panigale V4R",
  "Honda CBR1000RR-R Fireblade",
  "Aprilia RSV4 1100 Factory"
] as const;

export const VEHICLES_TOP_PICKS_SLUGS = VEHICLES_TOP_PICKS_NAMES.map(slugifyVehicle);

export const BIKES_SLUGS = BIKES_DATA.map((b) => slugifyVehicle(b.name));

export const CARS_SLUGS = CARS_DATA.map((c) => slugifyVehicle(c.name));

export const RAW_VEHICLE_PRODUCTS: Array<{
  id: string;
  name: string;
  brand: string;
  subcategory: "Cars" | "Bikes";
  sectionId: string;
  sectionTitle: string;
  imageUrl: string;
  description: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
}> = [
  ...CARS_DATA.map((car, idx) => {
    const slug = slugifyVehicle(car.name);
    return {
      id: slug,
      name: car.name,
      brand: getBrandFromName(car.name),
      subcategory: "Cars" as const,
      sectionId: "cars-section",
      sectionTitle: "Cars",
      imageUrl: car.image,
      description: "",
      tags: [slug, "car", "vehicle", getBrandFromName(car.name).toLowerCase()],
      featured: VEHICLES_TOP_PICKS_SLUGS.includes(slug),
      trending: idx % 4 === 0,
    };
  }),
  ...BIKES_DATA.map((bike, idx) => {
    const slug = slugifyVehicle(bike.name);
    return {
      id: slug,
      name: bike.name,
      brand: getBrandFromName(bike.name),
      subcategory: "Bikes" as const,
      sectionId: "bikes-section",
      sectionTitle: "Bikes",
      imageUrl: bike.image,
      description: "",
      tags: [slug, "bike", "motorcycle", "vehicle", getBrandFromName(bike.name).toLowerCase()],
      featured: VEHICLES_TOP_PICKS_SLUGS.includes(slug),
      trending: idx % 4 === 0,
    };
  }),
];

export const VEHICLE_SECTIONS: VehicleSection[] = [
  {
    id: "cars-section",
    title: "Cars",
    subtitle: "Luxury flagships, supercars, hypercars, performance SUVs, and off-road powerhouses",
    badge: "🚙 Cars",
    displayOrder: 1,
    productIds: CARS_SLUGS,
  },
  {
    id: "bikes-section",
    title: "Bikes",
    subtitle: "Superbikes, naked streetfighters, adventure tourers, and cruisers",
    badge: "🏍️ Bikes",
    displayOrder: 2,
    productIds: BIKES_SLUGS,
  },
];

export function getFullVehiclesCatalog(): VehicleProduct[] {
  return RAW_VEHICLE_PRODUCTS.map((p, idx) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: "Vehicles",
    subcategory: p.subcategory,
    sectionId: p.sectionId,
    sectionTitle: p.sectionTitle,
    imageUrl: getVehiclesProductImage(p.id, p.imageUrl) || DEFAULT_VEHICLES_IMAGE,
    description: "",
    tags: p.tags,
    featured: Boolean(p.featured),
    trending: Boolean(p.trending),
    displayOrder: idx,
  }));
}
