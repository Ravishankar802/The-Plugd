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
    "image": "https://i.pinimg.com/1200x/51/90/11/5190112ca8a3162b8d8f40ed9da11423.jpg"
  },
  {
    "name": "Royal Enfield Interceptor 650",
    "image": "https://i.pinimg.com/1200x/fb/14/1c/fb141c95792f08ad62fec3f3b9891a6b.jpg"
  },
  {
    "name": "Aprilia 457",
    "image": "https://i.pinimg.com/736x/90/f1/db/90f1db2386679f8453e45c1389ca0502.jpg"
  },
  {
    "name": "Triumph Street Triple 765 RS",
    "image": "https://i.pinimg.com/1200x/8c/fd/f3/8cfdf3f35c0efa71ae09fcd6aaa53d85.jpg"
  },
  {
    "name": "Triumph Speed Triple 1200 RS",
    "image": "https://i.pinimg.com/1200x/a9/82/9f/a9829f6b1723f5de4e91ad8a9e73cbaf.jpg"
  },
  {
    "name": "Kawasaki Z900",
    "image": "https://i.pinimg.com/236x/69/e8/0b/69e80b1318fc4d96e64948154023661b.jpg"
  },
  {
    "name": "Kawasaki Z1100",
    "image": "https://i.pinimg.com/1200x/de/75/86/de758638cde69b23021e55dd56e55f5f.jpg"
  },
  {
    "name": "Kawasaki Ninja ZX-6R",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMW7bb61wr4_BzDgfjIou7rFzNnVHdSpJBLOv-b0z8sQ&s=10"
  },
  {
    "name": "Kawasaki Ninja ZX-10R",
    "image": "https://i.pinimg.com/1200x/b8/1b/f7/b81bf71f9f8503a6a70730a5ef2d347d.jpg"
  },
  {
    "name": "Kawasaki Ninja H2",
    "image": "https://i.pinimg.com/736x/48/43/04/484304fa8b46ea0e1046eb452a94aefa.jpg"
  },
  {
    "name": "Kawasaki Ninja H2R",
    "image": "https://i.pinimg.com/1200x/b8/6c/07/b86c07ec5574dcf8aa7eaf6634c4d211.jpg"
  },
  {
    "name": "BMW S1000RR",
    "image": "https://i.pinimg.com/736x/5a/2c/50/5a2c50fd6f4652eb32fa914674a37513.jpg"
  },
  {
    "name": "BMW M1000RR",
    "image": "https://i.pinimg.com/1200x/1d/9f/a5/1d9fa5e5c46f375e6157b133bb114836.jpg"
  },
  {
    "name": "Ducati Monster",
    "image": "https://i.pinimg.com/236x/b5/c5/16/b5c5169833511f092889655187f06102.jpg"
  },
  {
    "name": "Ducati XDiavel V4",
    "image": "https://i.pinimg.com/236x/e9/08/c1/e908c16b9d5f406ef01f8ff4123212bf.jpg"
  },
  {
    "name": "Ducati Streetfighter V4S",
    "image": "https://i.pinimg.com/736x/26/40/58/264058bd88baa6d2341988c0e1dffd0f.jpg"
  },
  {
    "name": "Ducati Panigale V4S",
    "image": "https://i.pinimg.com/1200x/26/a4/bb/26a4bbb02a97ca3174ccb4277532f3c6.jpg"
  },
  {
    "name": "Ducati Panigale V4R",
    "image": "https://i.pinimg.com/1200x/fb/3e/1d/fb3e1d567a0baec6f10794ec9c037729.jpg"
  },
  {
    "name": "KTM 1390 Super Duke R",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAfmwMMLk8acoKinJdPTzeJGrQCRztl3uMnb5PqmASQw&s=10"
  },
  {
    "name": "Harley-Davidson X440T",
    "image": "https://i.pinimg.com/736x/b2/93/de/b293ded51ea510591833ad167bf71c24.jpg"
  },
  {
    "name": "Harley-Davidson Nightster",
    "image": "https://i.pinimg.com/736x/7c/f5/7f/7cf57fe29073e8e503f71f9b5726b09e.jpg"
  },
  {
    "name": "Harley-Davidson Sportster S",
    "image": "https://i.pinimg.com/1200x/7c/e3/35/7ce33558b3dfbd5310efce28aacb7f90.jpg"
  },
  {
    "name": "Harley-Davidson Fat Boy",
    "image": "https://i.pinimg.com/1200x/70/0f/75/700f751831453b0049664310867c6c49.jpg"
  },
  {
    "name": "Yamaha R9",
    "image": "https://i.pinimg.com/236x/b0/73/65/b0736582bd3b285444c72333757df73b.jpg"
  },
  {
    "name": "Yamaha R7",
    "image": "https://i.pinimg.com/736x/2b/e9/53/2be9532f4103df5145788572cc90b960.jpg"
  },
  {
    "name": "Honda CBR1000RR-R Fireblade",
    "image": "https://i.pinimg.com/1200x/4b/03/5c/4b035cee24432b556c5c3f4fc37b11dc.jpg"
  },
  {
    "name": "Aprilia RSV4 1100 Factory",
    "image": "https://i.pinimg.com/1200x/97/e9/c7/97e9c75f887a8516dcd6d0ae57a70972.jpg"
  }
] as const;

export const CARS_DATA = [
  {
    "name": "Rolls-Royce Cullinan",
    "image": "https://i.pinimg.com/736x/45/bf/b9/45bfb9c3a28b8cf7f3680e76ceaf5ec6.jpg"
  },
  {
    "name": "Rolls-Royce Phantom",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ldTSS83HNY2zDycCvldOvVjWILvn_mou6qbquzUIlm-CFo8_zeMtgp5y&s=10"
  },
  {
    "name": "Rolls-Royce Spectre",
    "image": "https://i.pinimg.com/736x/00/71/0c/00710c27f5ace34d718d5c2a647cca38.jpg"
  },
  {
    "name": "Mercedes-AMG G63",
    "image": "https://i.pinimg.com/1200x/3a/e6/d1/3ae6d1bb4e17f831da816d664c3a09af.jpg"
  },
  {
    "name": "BMW M4",
    "image": "https://i.pinimg.com/736x/4b/cb/0a/4bcb0a71a44920f896d8231ac4ca5792.jpg"
  },
  {
    "name": "BMW M5",
    "image": "https://i.pinimg.com/736x/c5/32/07/c532071478fc356784cac8be0b43de69.jpg"
  },
  {
    "name": "BMW M8",
    "image": "https://i.pinimg.com/1200x/6c/8c/4e/6c8c4e2a9ed090748663d88e7fc73741.jpg"
  },
  {
    "name": "Ferrari 296 GTB",
    "image": "https://i.pinimg.com/1200x/e4/44/98/e44498d8f953921d2fce2fdb68740de2.jpg"
  },
  {
    "name": "Ferrari 296 GTS",
    "image": "https://i.pinimg.com/736x/68/22/3b/68223b5128a52ca8752b83056c0d61f6.jpg"
  },
  {
    "name": "Ferrari 812 Superfast",
    "image": "https://i.pinimg.com/1200x/a4/0a/37/a40a373006e00b54b36569fa024b19ca.jpg"
  },
  {
    "name": "Porsche 918 Spyder",
    "image": "https://i.pinimg.com/736x/25/f4/a6/25f4a65a1e5d11f42abf1bbd642c363b.jpg"
  },
  {
    "name": "McLaren P1",
    "image": "https://i.pinimg.com/1200x/79/bc/84/79bc845946e370285a72c2ec7a6ea9f5.jpg"
  },
  {
    "name": "McLaren P1 GTR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPW7RgL-Y1t8FSt1anTScc5tT-D7HJl-RgHyButZpT_xiaPzuGxojvUw8&s=10"
  },
  {
    "name": "McLaren Senna",
    "image": "https://i.pinimg.com/236x/3d/03/d1/3d03d1ba58529f3c21c93113a13866e6.jpg"
  },
  {
    "name": "McLaren Senna GTR",
    "image": "https://i.pinimg.com/1200x/ac/86/99/ac8699b322d74b25e71b4c325860dcf7.jpg"
  },
  {
    "name": "McLaren Speedtail",
    "image": "https://i.pinimg.com/1200x/2a/79/70/2a79701a86bfa7f5267074c58410d006.jpg"
  },
  {
    "name": "McLaren Solus GT",
    "image": "https://i.pinimg.com/736x/1f/63/df/1f63dfd55d58447e832fa3d8ee85d970.jpg"
  },
  {
    "name": "McLaren Elva",
    "image": "https://i.pinimg.com/1200x/07/41/1a/07411a54a3f9e68114817015747d9d32.jpg"
  },
  {
    "name": "Porsche 911",
    "image": "https://i.pinimg.com/736x/af/f7/db/aff7dbc0a04399330fc0435ef26277cb.jpg"
  },
  {
    "name": "Mercedes-Maybach S-Class",
    "image": "https://i.pinimg.com/236x/61/4e/a2/614ea2ae4cedb572e60b2f34de5ac40c.jpg"
  },
  {
    "name": "Mercedes-Maybach GLS 600",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGvUn0f4LSojTSlpFbfXSZ4FJs2UOhBAv4YxFw4jmYOe6Nlq2imggD9h4M&s=10"
  },
  {
    "name": "Range Rover SV",
    "image": "https://i.pinimg.com/1200x/32/6d/a6/326da6ba7157cf4947f72eef36367ef7.jpg"
  },
  {
    "name": "Range Rover Sport",
    "image": "https://i.pinimg.com/736x/5e/a0/18/5ea018f37cb9615efceb738cbeb74711.jpg"
  },
  {
    "name": "Land Rover Defender",
    "image": "https://i.pinimg.com/1200x/33/73/8d/33738df22f75efc09872f90e98608d7b.jpg"
  },
  {
    "name": "Jeep Wrangler",
    "image": "https://i.pinimg.com/1200x/c7/c9/a9/c7c9a967f2c35fbcc305ab4111f0d468.jpg"
  },
  {
    "name": "Ford Raptor R",
    "image": "https://i.pinimg.com/1200x/01/c4/fc/01c4fca87b34b15a7a8bd92e40d6768e.jpg"
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
    "image": "https://i.pinimg.com/1200x/ad/4c/86/ad4c862e01462f4bb3a369c2ad9656e1.jpg"
  },
  {
    "name": "Ferrari 812 Competizione",
    "image": "https://i.pinimg.com/1200x/a8/17/77/a817773f40e1597e564d8c8822a4d2a2.jpg"
  },
  {
    "name": "Ferrari SF90 Stradale",
    "image": "https://i.pinimg.com/736x/95/f4/f7/95f4f7269be2a087f7b0bb0cc94ae4f6.jpg"
  },
  {
    "name": "Ferrari SF90 Spider",
    "image": "https://i.pinimg.com/736x/24/43/d7/2443d7db6def1151d04b7ab6655c8c2b.jpg"
  },
  {
    "name": "Ferrari 12 Cilindri",
    "image": "https://i.pinimg.com/1200x/82/26/b2/8226b23e2be0f0fb357ab06ec4a6ded6.jpg"
  },
  {
    "name": "Ferrari 12 Cilindri Spider",
    "image": "https://i.pinimg.com/1200x/88/47/b1/8847b1e62914f64bd3cbfcd60aefd9c1.jpg"
  },
  {
    "name": "Ferrari 849 Testarossa",
    "image": "https://i.pinimg.com/736x/6c/01/37/6c013726095bc96b38af3eca808eba41.jpg"
  },
  {
    "name": "Ferrari 849 Testarossa Spider",
    "image": "https://i.pinimg.com/1200x/da/ff/08/daff0856eddc372dcd3090ca5a6116a6.jpg"
  },
  {
    "name": "Lamborghini Huracán Evo",
    "image": "https://i.pinimg.com/736x/46/5d/0e/465d0e77c2be34b115398c884e9f5bee.jpg"
  },
  {
    "name": "Lamborghini Huracán STO",
    "image": "https://i.pinimg.com/1200x/5c/51/56/5c5156bce2f6790c9cdcef4d12eb0294.jpg"
  },
  {
    "name": "Lamborghini Huracán Tecnica",
    "image": "https://i.pinimg.com/1200x/e6/12/14/e61214d6f2728c5d3f9b521469567c39.jpg"
  },
  {
    "name": "Lamborghini Aventador SVJ",
    "image": "https://i.pinimg.com/1200x/dc/0e/f3/dc0ef3c0e120e148f65ddca88b823d9b.jpg"
  },
  {
    "name": "Lamborghini Murciélago",
    "image": "https://i.pinimg.com/1200x/c3/35/23/c335235e54d6dd8ebc316649be1c3ef5.jpg"
  },
  {
    "name": "Lamborghini Revuelto",
    "image": "https://i.pinimg.com/1200x/76/a5/c4/76a5c432c91aaa2d8087af9a49391e0b.jpg"
  },
  {
    "name": "Lamborghini Temerario",
    "image": "https://i.pinimg.com/736x/3a/30/3a/3a303ac87ca3f1de9ae7b373f1e58b95.jpg"
  },
  {
    "name": "Porsche 911 Turbo S",
    "image": "https://i.pinimg.com/1200x/28/2b/ef/282beff23ad6f2e37736654af562f2fb.jpg"
  },
  {
    "name": "Porsche 911 GT3",
    "image": "https://i.pinimg.com/1200x/14/2c/4f/142c4ffbbd185e2d9f776b3f9d687276.jpg"
  },
  {
    "name": "Porsche 911 GT3 RS",
    "image": "https://i.pinimg.com/736x/07/45/32/0745321ae0907a2388f6004403fc552f.jpg"
  },
  {
    "name": "Aston Martin Vantage",
    "image": "https://i.pinimg.com/1200x/a1/97/e3/a197e343539bbd2fb94033578369e508.jpg"
  },
  {
    "name": "Aston Martin Vanquish",
    "image": "https://i.pinimg.com/1200x/97/16/6b/97166bf22acc8aad178182138aa01a6a.jpg"
  },
  {
    "name": "Aston Martin DB12",
    "image": "https://i.pinimg.com/1200x/ea/6e/62/ea6e62f29c21234544ac4ef681e04ea2.jpg"
  },
  {
    "name": "Aston Martin DBS Superleggera",
    "image": "https://i.pinimg.com/1200x/2a/f2/3c/2af23c38213ada8bca3430a6d1452716.jpg"
  },
  {
    "name": "Aston Martin DBS 770 Ultimate",
    "image": "https://i.pinimg.com/1200x/67/8f/da/678fda7ed04c743ef252af933a64ffe4.jpg"
  },
  {
    "name": "McLaren 720S",
    "image": "https://i.pinimg.com/736x/8e/4e/37/8e4e371101af62e6a29583a225701e79.jpg"
  },
  {
    "name": "McLaren 750S",
    "image": "https://i.pinimg.com/1200x/d8/79/09/d87909c7e424081a57ab88e8e5243699.jpg"
  },
  {
    "name": "McLaren 765LT",
    "image": "https://i.pinimg.com/1200x/1f/74/82/1f7482e2a344fe41c78ff00e8d5aaf3e.jpg"
  },
  {
    "name": "Ferrari Purosangue",
    "image": "https://i.pinimg.com/1200x/d1/2b/ed/d12bedf1a2e3c665f0f743282dee4eeb.jpg"
  },
  {
    "name": "Lamborghini Urus",
    "image": "https://i.pinimg.com/736x/07/91/b2/0791b2008965e41caa51de309655d85a.jpg"
  },
  {
    "name": "Porsche Cayenne",
    "image": "https://i.pinimg.com/1200x/20/70/fb/2070fb5b769b1089ca38c01b765e7c8f.jpg"
  },
  {
    "name": "Aston Martin DBX",
    "image": "https://i.pinimg.com/736x/9f/9b/3a/9f9b3a9aead02c4bb83e922f74698f08.jpg"
  },
  {
    "name": "McLaren W1",
    "image": "https://i.pinimg.com/736x/44/36/67/4436679029692b5dcfd50793f2d67b38.jpg"
  },
  {
    "name": "McLaren F1",
    "image": "https://i.pinimg.com/1200x/14/79/31/147931e0d8e38c0067e7ce54463e1a2c.jpg"
  },
  {
    "name": "Ferrari LaFerrari",
    "image": "https://i.pinimg.com/736x/95/74/5b/95745bde71cac44254aed53dd4c17f40.jpg"
  },
  {
    "name": "Ferrari LaFerrari Aperta",
    "image": "https://i.pinimg.com/736x/1c/ef/7e/1cef7e67547203a6e69658b8c03d6a1e.jpg"
  },
  {
    "name": "Ferrari Daytona SP3",
    "image": "https://i.pinimg.com/1200x/ce/1b/f6/ce1bf6dd45496e0625b2e5282ec02ae6.jpg"
  },
  {
    "name": "Ferrari Monza SP1",
    "image": "https://i.pinimg.com/736x/64/98/09/649809f296bf80939c64404489f9d90e.jpg"
  },
  {
    "name": "Ferrari Monza SP2",
    "image": "https://i.pinimg.com/736x/c6/fa/ab/c6faab0f5da4660106f7f5d5a35023ae.jpg"
  },
  {
    "name": "Lamborghini Sian",
    "image": "https://i.pinimg.com/1200x/e4/01/bd/e401bda214ca26c9cb0294776e9efc02.jpg"
  },
  {
    "name": "Lamborghini Veneno Roadster",
    "image": "https://i.pinimg.com/1200x/02/70/16/027016080e4f6d5d95fc62e9ae2788e7.jpg"
  },
  {
    "name": "Aston Martin Vulcan",
    "image": "https://i.pinimg.com/1200x/2f/9d/02/2f9d02e599f8b0f456473715e38c6e4f.jpg"
  },
  {
    "name": "Aston Martin Valhalla",
    "image": "https://i.pinimg.com/236x/f3/bc/33/f3bc33fab6d9df35f24751c61811b57a.jpg"
  },
  {
    "name": "Aston Martin Valour",
    "image": "https://i.pinimg.com/736x/b0/7d/06/b07d06440d7abcb9de63ec628065e03c.jpg"
  },
  {
    "name": "Aston Martin Valiant",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRge-f3kCpTQJg2a6h7eAsQAT_fczJIgfDK1naBRYSJDPh9KrdNtT3-VLU&s=10"
  },
  {
    "name": "Aston Martin Valen",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa7FFqpSS1E7fPJmBqeJ9T1gb71loqFWbHRvbdNZz69g&s=10"
  },
  {
    "name": "Aston Martin Valkyrie",
    "image": "https://i.pinimg.com/1200x/03/2f/93/032f931977018f894528c244326b4e0b.jpg"
  },
  {
    "name": "Mercedes-AMG Project One",
    "image": "https://i.pinimg.com/1200x/8f/87/c0/8f87c03584d98be54c26ecaf5c3c8b78.jpg"
  },
  {
    "name": "Rimac Nevera",
    "image": "https://i.pinimg.com/1200x/84/8e/40/848e40d44de00ef1e8f6a6a82e7d0876.jpg"
  },
  {
    "name": "Rimac Nevera R",
    "image": "https://i.pinimg.com/736x/a9/f7/80/a9f78048f2db5d3d49d80e868aadd6c7.jpg"
  },
  {
    "name": "Bugatti Veyron",
    "image": "https://i.pinimg.com/1200x/15/39/cb/1539cbd48153939ca25eb6c89ba344f3.jpg"
  },
  {
    "name": "Bugatti Chiron Super Sport",
    "image": "https://i.pinimg.com/736x/06/96/ad/0696ad5fa97f9cc2df8a9b87385a16c8.jpg"
  },
  {
    "name": "Bugatti Chiron Pur Sport",
    "image": "https://i.pinimg.com/236x/eb/ac/d8/ebacd8f78c3265eadcd167b2caf63b14.jpg"
  },
  {
    "name": "Bugatti Mistral",
    "image": "https://i.pinimg.com/236x/53/d4/ef/53d4ef1275f502ec9b10011a812b0b40.jpg"
  },
  {
    "name": "Bugatti Divo",
    "image": "https://i.pinimg.com/1200x/0b/f1/40/0bf14095f7029d6617423c5ad2c05c03.jpg"
  },
  {
    "name": "Bugatti Centodieci",
    "image": "https://i.pinimg.com/1200x/da/df/1d/dadf1d00e17cac9dc81df5e93f31ffce.jpg"
  },
  {
    "name": "Bugatti Bolide",
    "image": "https://i.pinimg.com/736x/4a/69/47/4a69479e6c1c6c2bdc8dbf29384da40d.jpg"
  },
  {
    "name": "Bugatti Tourbillon",
    "image": "https://i.pinimg.com/736x/3f/53/e9/3f53e940995096265f3ca35ef23306aa.jpg"
  },
  {
    "name": "Koenigsegg Jesko Absolut",
    "image": "https://i.pinimg.com/1200x/2c/98/ac/2c98acd9b1ad63593d65ab97f71bc3a3.jpg"
  },
  {
    "name": "Koenigsegg Jesko Attack",
    "image": "https://i.pinimg.com/1200x/bc/e1/db/bce1dbe2828ca279e8f4022f5be97ff9.jpg"
  },
  {
    "name": "Koenigsegg Gemera",
    "image": "https://i.pinimg.com/1200x/8b/d4/22/8bd4223d2262acb12e09acede3ad4dc7.jpg"
  },
  {
    "name": "Koenigsegg Agera",
    "image": "https://i.pinimg.com/736x/37/20/2f/37202f438aa8f729ed7c109e5a8e7bca.jpg"
  },
  {
    "name": "Koenigsegg Agera R",
    "image": "https://i.pinimg.com/1200x/b9/61/80/b96180f46c1f17ae8c21b592c8ad6e4d.jpg"
  },
  {
    "name": "Koenigsegg Agera S",
    "image": "https://i.pinimg.com/1200x/07/01/91/07019110ee3dbc4c8738a7fdb8b0e47b.jpg"
  },
  {
    "name": "Koenigsegg Agera RS",
    "image": "https://i.pinimg.com/1200x/e7/ef/be/e7efbe18b8fc6c0569dfae2a145618b0.jpg"
  },
  {
    "name": "Koenigsegg Regera",
    "image": "https://i.pinimg.com/1200x/1b/f7/f1/1bf7f115cceb881bc8a51c8cbb0e4a18.jpg"
  },
  {
    "name": "Koenigsegg CCX",
    "image": "https://i.pinimg.com/736x/8a/c0/c6/8ac0c6c105b9c0cf3790bba893a7b6c9.jpg"
  },
  {
    "name": "Koenigsegg CCR",
    "image": "https://i.pinimg.com/1200x/bd/1c/c6/bd1cc6bfd94a4b077136172b1e05f2ee.jpg"
  },
  {
    "name": "Koenigsegg CCXR",
    "image": "https://i.pinimg.com/736x/46/37/1b/46371bbbb518131ab6350b4fb0a7cbaf.jpg"
  },
  {
    "name": "Koenigsegg CCGT",
    "image": "https://i.pinimg.com/736x/11/9a/11/119a11ae464cea7372f28c4533cad123.jpg"
  },
  {
    "name": "Koenigsegg CC8S",
    "image": "https://i.pinimg.com/1200x/aa/91/19/aa91193da5749605fe5bb0d2995186f6.jpg"
  },
  {
    "name": "Koenigsegg CC850",
    "image": "https://i.pinimg.com/1200x/cd/2e/19/cd2e191f5615d46600755e9ebae080f6.jpg"
  },
  {
    "name": "Pagani Zonda",
    "image": "https://i.pinimg.com/1200x/07/b5/d0/07b5d0cd944a9b0c40768be9d219e562.jpg"
  },
  {
    "name": "Pagani Huayra",
    "image": "https://i.pinimg.com/736x/4a/b7/14/4ab714094d09ce7592849af851e275ec.jpg"
  },
  {
    "name": "Pagani Utopia",
    "image": "https://i.pinimg.com/736x/ff/3a/35/ff3a3517856a97da1d67a2bd662fc870.jpg"
  },
  {
    "name": "Pagani Grandi Complicazioni",
    "image": "https://i.pinimg.com/1200x/cf/a6/89/cfa689d6321b84a621698d039e35b18a.jpg"
  },
  {
    "name": "Hennessey Venom F5",
    "image": "https://i.pinimg.com/1200x/2b/f9/ee/2bf9eef9a6a34f3406f8bdf0858d2132.jpg"
  },
  {
    "name": "Hennessey Venom F5 Roadster",
    "image": "https://i.pinimg.com/1200x/cc/97/c9/cc97c97abfa4c15bfb8169682c3cf79a.jpg"
  }
] as const;

export const VEHICLES_TOP_PICKS_NAMES = [
  "McLaren F1",
  "Bugatti Chiron Super Sport",
  "Koenigsegg Jesko Absolut",
  "Pagani Huayra",
  "Aston Martin Valkyrie",
  "Ferrari LaFerrari",
  "McLaren P1",
  "Porsche 911 GT3 RS",
  "Porsche 911",
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

export const VEHICLES_STARTING_COUNTS: Record<string, number> = {
  "rolls-royce-cullinan": 345,
  "rolls-royce-phantom": 239,
  "rolls-royce-spectre": 156,
  "mercedes-amg-g63": 890,
  "bmw-m4": 242,
  "bmw-m5": 356,
  "bmw-m8": 214,
  "ferrari-296-gtb": 47,
  "ferrari-296-gts": 56,
  "ferrari-812-superfast": 78,
  "porsche-918-spyder": 324,
  "mclaren-p1": 478,
  "mclaren-p1-gtr": 210,
  "mclaren-senna": 243,
  "mclaren-senna-gtr": 135,
  "mclaren-speedtail": 172,
  "mclaren-solus-gt": 191,
  "mclaren-elva": 43,
  "porsche-911": 2200,
  "mercedes-maybach-s-class": 241,
  "mercedes-maybach-gls-600": 190,
  "range-rover-sv": 535,
  "range-rover-sport": 285,
  "land-rover-defender": 450,
  "jeep-wrangler": 304,
  "ford-raptor-r": 181,
  "ram-trx": 120,
  "tesla-cybertruck": 548,
  "tesla-model-s-plaid": 103,
  "ferrari-812-competizione": 329,
  "ferrari-sf90-stradale": 318,
  "ferrari-sf90-spider": 421,
  "ferrari-12-cilindri": 136,
  "ferrari-12-cilindri-spider": 120,
  "ferrari-849-testarossa": 111,
  "ferrari-849-testarossa-spider": 98,
  "lamborghini-huracan-evo": 509,
  "lamborghini-huracan-sto": 284,
  "lamborghini-huracan-tecnica": 221,
  "lamborghini-aventador-svj": 643,
  "lamborghini-murcielago": 320,
  "lamborghini-revuelto": 590,
  "lamborghini-temerario": 291,
  "porsche-911-turbo-s": 678,
  "porsche-911-gt3": 343,
  "porsche-911-gt3-rs": 3400,
  "aston-martin-vantage": 231,
  "aston-martin-vanquish": 354,
  "aston-martin-db12": 192,
  "aston-martin-dbs-superleggera": 115,
  "aston-martin-dbs-770-ultimate": 92,
  "mclaren-720s": 190,
  "mclaren-750s": 243,
  "mclaren-765lt": 982,
  "ferrari-purosangue": 209,
  "lamborghini-urus": 730,
  "porsche-cayenne": 210,
  "aston-martin-dbx": 301,
  "mclaren-w1": 481,
  "mclaren-f1": 532,
  "ferrari-laferrari": 643,
  "ferrari-laferrari-aperta": 472,
  "ferrari-daytona-sp3": 281,
  "ferrari-monza-sp1": 74,
  "ferrari-monza-sp2": 132,
  "lamborghini-sian": 321,
  "lamborghini-veneno-roadster": 492,
  "aston-martin-vulcan": 184,
  "aston-martin-valhalla": 203,
  "aston-martin-valour": 146,
  "aston-martin-valiant": 115,
  "aston-martin-valen": 97,
  "aston-martin-valkyrie": 1100,
  "mercedes-amg-project-one": 439,
  "rimac-nevera": 702,
  "rimac-nevera-r": 445,
  "bugatti-veyron": 521,
  "bugatti-chiron-super-sport": 4800,
  "bugatti-chiron-pur-sport": 2400,
  "bugatti-mistral": 1100,
  "bugatti-divo": 888,
  "bugatti-centodieci": 654,
  "bugatti-bolide": 1300,
  "bugatti-tourbillon": 932,
  "koenigsegg-jesko-absolut": 4300,
  "koenigsegg-jesko-attack": 3900,
  "koenigsegg-gemera": 2500,
  "koenigsegg-agera": 832,
  "koenigsegg-agera-r": 320,
  "koenigsegg-agera-s": 456,
  "koenigsegg-agera-rs": 1500,
  "koenigsegg-regera": 249,
  "koenigsegg-ccx": 190,
  "koenigsegg-ccr": 320,
  "koenigsegg-ccxr": 542,
  "koenigsegg-ccgt": 291,
  "koenigsegg-cc8s": 301,
  "koenigsegg-cc850": 1400,
  "pagani-zonda": 2500,
  "pagani-huayra": 3200,
  "pagani-utopia": 2200,
  "pagani-grandi-complicazioni": 1900,
  "hennessey-venom-f5": 1600,
  "hennessey-venom-f5-roadster": 1100,
  "royal-enfield-continental-gt-650": 3200,
  "royal-enfield-interceptor-650": 1700,
  "aprilia-457": 1100,
  "triumph-street-triple-765-rs": 2600,
  "triumph-speed-triple-1200-rs": 1100,
  "kawasaki-z900": 1200,
  "kawasaki-z1100": 990,
  "kawasaki-ninja-zx-6r": 1200,
  "kawasaki-ninja-zx-10r": 1700,
  "kawasaki-ninja-h2": 3200,
  "kawasaki-ninja-h2r": 4500,
  "bmw-s1000rr": 5000,
  "bmw-m1000rr": 4800,
  "ducati-monster": 1100,
  "ducati-xdiavel-v4": 1400,
  "ducati-streetfighter-v4s": 1800,
  "ducati-panigale-v4s": 5000,
  "ducati-panigale-v4r": 4900,
  "ktm-1390-super-duke-r": 3200,
  "harley-davidson-x440t": 1100,
  "harley-davidson-nightster": 2100,
  "harley-davidson-sportster-s": 2500,
  "harley-davidson-fat-boy": 2200,
  "yamaha-r9": 1300,
  "yamaha-r7": 832,
  "honda-cbr1000rr-r-fireblade": 3200,
  "aprilia-rsv4-1100-factory": 3900,
  "bugatti-chiron-super-sport-300": 4800,
  "bugatti-chiron-super-sport-300-plus": 4800,
};
