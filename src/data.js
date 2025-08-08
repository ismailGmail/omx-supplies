// src/data.js

export const categories = [
  { name: "Kava", path: "/products/coffee" },
  { name: "Čaj", path: "/products/tea" },
  { name: "Skodelice & Koši", path: "/products/cups-bags" },
  { name: "Aparati", path: "/products/machines" },
];

export const products = [
  {
    id: 1,
    name: "Nescafé Classic 200g",
    category: "coffee",
    price: "4.99",
    description: "Instant kava za vsakodnevno uporabo.",
  },
  {
    id: 2,
    name: "Zeleni čaj Lipton",
    category: "tea",
    price: "3.50",
    description: "Osvežilni zeleni čaj z blagim okusom.",
  },
  {
    id: 3,
    name: "Papirnate skodelice (100 kos)",
    category: "cups-bags",
    price: "2.90",
    description: "Za enkratno uporabo, primerno za tople napitke.",
  },
];
