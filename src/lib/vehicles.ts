import hero from "@/assets/hero.jpg";

export type VehicleStatus = "Disponível" | "Reservado" | "Vendido";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  km: number;
  engine: string;
  power: number;
  transmission: string;
  traction: string;
  fuel: string;
  exteriorColor: string;
  interiorColor: string;
  equipment: string[];
  description: string;
  images: string[];
  status: VehicleStatus;
  featured: boolean;
  addedAt: number;
}

export const heroImage = hero;

export const seedVehicles: Vehicle[] = [
  {
    id: "porsche-911-turbo-s",
    brand: "Porsche",
    model: "911 Turbo S / Carrera",
    price: 149900,
    year: 2024,
    km: 8500,
    engine: "3.0L Boxer",
    power: 394,
    transmission: "PDK",
    traction: "Traseira",
    fuel: "Gasolina",
    exteriorColor: "Cinzento Ágata Metalizado",
    interiorColor: "Pele preta com costuras vermelhas",
    equipment: [
      "Pack Sport Chrono",
      "Suspensão PASM",
      "Bancos desportivos adaptativos",
      "Escape desportivo",
      "Faróis LED Matrix",
      "Câmara 360º",
      "Bose Surround Sound",
      "Jantes 20/21 polegadas",
    ],
    description:
      "Um ícone absoluto da engenharia alemã. Este 911 combina a precisão cirúrgica do chassis com um motor boxer que responde de forma imediata em qualquer regime. Mantido exclusivamente em rede oficial, com histórico completo e pronto a entregar.",
    images: [],
    status: "Disponível",
    featured: true,
    addedAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: "bmw-m4-competition-xdrive",
    brand: "BMW",
    model: "M4 Competition xDrive",
    price: 119900,
    year: 2025,
    km: 6200,
    engine: "3.0L Twin-Turbo",
    power: 530,
    transmission: "Automática 8v",
    traction: "xDrive",
    fuel: "Gasolina",
    exteriorColor: "Verde São Paulo",
    interiorColor: "Pele Merino Kyalami Orange",
    equipment: [
      "Bancos M Carbono",
      "Travões M Compound",
      "Pack M Carbono exterior",
      "Head-Up Display",
      "Harman Kardon",
      "Teto em fibra de carbono",
      "M Drive Professional",
    ],
    description:
      "Tração integral M xDrive, 530 cv e uma postura que não passa despercebida. Um desportivo de utilização diária real, com conforto de gran turismo e capacidade de pista quando a estrada pede.",
    images: [],
    status: "Disponível",
    featured: true,
    addedAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
  {
    id: "lamborghini-huracan-evo",
    brand: "Lamborghini",
    model: "Huracán EVO",
    price: 249900,
    year: 2023,
    km: 4800,
    engine: "5.2L V10",
    power: 640,
    transmission: "LDF 7v dupla embraiagem",
    traction: "Integral",
    fuel: "Gasolina",
    exteriorColor: "Giallo Belenus",
    interiorColor: "Alcantara Nero Ade",
    equipment: [
      "Lamborghini Dinamica Veicolo Integrata",
      "Escape desportivo em titânio",
      "Direção dinâmica LDS",
      "Câmara traseira e lifting system",
      "Jantes Aesir forjadas",
      "Pack Carbono interior",
    ],
    description:
      "O último grande V10 atmosférico. Som, resposta e emoção que nenhum turbo consegue replicar. Unidade nacional, com apenas 4.800 km e revisões em concessionário oficial.",
    images: [],
    status: "Disponível",
    featured: true,
    addedAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
  },
  {
    id: "ferrari-sf90-stradale",
    brand: "Ferrari",
    model: "SF90 Stradale",
    price: 499900,
    year: 2024,
    km: 2500,
    engine: "4.0L V8 Twin-Turbo Plug-in Hybrid",
    power: 1000,
    transmission: "F1 DCT 8v",
    traction: "Integral",
    fuel: "Híbrido Plug-in",
    exteriorColor: "Rosso Corsa",
    interiorColor: "Pele Nero com Alcantara",
    equipment: [
      "Pack Assetto Fiorano",
      "Suspensão Multimatic",
      "Escape em titânio",
      "Jantes forjadas em fibra de carbono",
      "Travões carbono-cerâmicos",
      "Telemetria de pista",
    ],
    description:
      "Mil cavalos de potência combinada e a primeira Ferrari de série com tecnologia híbrida plug-in derivada da Fórmula 1. Uma peça de coleção com desempenho de hipercarro e modo 100% elétrico para circular em cidade.",
    images: [],
    status: "Reservado",
    featured: true,
    addedAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
  },
  {
    id: "mercedes-amg-gt-63",
    brand: "Mercedes-AMG",
    model: "GT 63 S 4MATIC+",
    price: 159900,
    year: 2023,
    km: 21400,
    engine: "4.0L V8 Biturbo",
    power: 639,
    transmission: "AMG Speedshift 9v",
    traction: "Integral",
    fuel: "Gasolina",
    exteriorColor: "Preto Obsidiana",
    interiorColor: "Nappa Bege/Preto",
    equipment: [
      "Pack AMG Night",
      "Suspensão AMG Ride Control+",
      "Burmester High-End 3D",
      "Eixo traseiro direcional",
      "Teto panorâmico",
    ],
    description:
      "Gran turismo de quatro portas com alma de desportivo. Conforto de topo, espaço real para quatro adultos e um V8 biturbo com carácter inconfundível.",
    images: [],
    status: "Disponível",
    featured: false,
    addedAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
  },
  {
    id: "audi-rs6-avant",
    brand: "Audi",
    model: "RS6 Avant Performance",
    price: 139900,
    year: 2024,
    km: 15800,
    engine: "4.0L V8 TFSI",
    power: 630,
    transmission: "Tiptronic 8v",
    traction: "Quattro",
    fuel: "Gasolina",
    exteriorColor: "Cinzento Nardo",
    interiorColor: "Valcona Preto",
    equipment: [
      "Pack Dynamic Plus",
      "Travões cerâmicos",
      "Suspensão pneumática adaptativa",
      "Bang & Olufsen 3D",
      "Eixo traseiro direcional",
    ],
    description:
      "A carrinha mais desejada do mercado. 630 cv, tração quattro e a praticidade de uma família inteira a bordo sem abdicar de desempenho de supercarro.",
    images: [],
    status: "Disponível",
    featured: false,
    addedAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: "aston-martin-vantage",
    brand: "Aston Martin",
    model: "Vantage V8",
    price: 179900,
    year: 2022,
    km: 18900,
    engine: "4.0L V8 Twin-Turbo",
    power: 510,
    transmission: "Automática 8v",
    traction: "Traseira",
    fuel: "Gasolina",
    exteriorColor: "Verde Racing",
    interiorColor: "Pele Obsidian Black",
    equipment: [
      "Pack Sport Plus",
      "Escape desportivo",
      "Jantes forjadas 21 polegadas",
      "Diferencial eletrónico traseiro",
    ],
    description:
      "Elegância britânica com atitude. Um dos desportivos com melhor equilíbrio entre condução analógica e tecnologia moderna.",
    images: [],
    status: "Vendido",
    featured: false,
    addedAt: Date.now() - 1000 * 60 * 60 * 24 * 45,
  },
  {
    id: "mclaren-720s",
    brand: "McLaren",
    model: "720S Performance",
    price: 289900,
    year: 2021,
    km: 12600,
    engine: "4.0L V8 Twin-Turbo",
    power: 720,
    transmission: "SSG 7v",
    traction: "Traseira",
    fuel: "Gasolina",
    exteriorColor: "Azul Paris",
    interiorColor: "Alcantara Preto/Azul",
    equipment: [
      "Monocoque em fibra de carbono",
      "Suspensão Proactive Chassis Control II",
      "Travões carbono-cerâmicos",
      "Portas dièdricas",
    ],
    description:
      "Aerodinâmica ativa, chassis em fibra de carbono e uma relação peso/potência que ainda hoje humilha rivais mais recentes.",
    images: [],
    status: "Disponível",
    featured: false,
    addedAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
  },
];

export const BRANDS = Array.from(new Set(seedVehicles.map((v) => v.brand))).sort();
export const FUELS = ["Gasolina", "Diesel", "Híbrido Plug-in", "Elétrico"];
export const TRANSMISSIONS = ["Automática 8v", "PDK", "LDF 7v dupla embraiagem", "F1 DCT 8v", "SSG 7v", "AMG Speedshift 9v", "Tiptronic 8v", "Manual"];
export const TRACTIONS = ["Traseira", "Integral", "xDrive", "Quattro", "Dianteira"];

export const eur = (value: number) =>
  new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

export const km = (value: number) => `${new Intl.NumberFormat("pt-PT").format(value)} km`;
