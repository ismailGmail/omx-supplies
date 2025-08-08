import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const products = [
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

export default function Home({ addToCart }) {
  const { t } = useTranslation();
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products
    .filter((p) => !category || p.category === category)
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">{t("welcome_message")}</h1>
      <input
        type="text"
        placeholder={t("search_placeholder") || "Search..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h2>
            <p>{product.price} €</p>
            <button
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => addToCart(product)}
            >
              {t("add_to_cart")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
