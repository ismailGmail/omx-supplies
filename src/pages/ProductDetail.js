import React from "react";
import { useParams } from "react-router-dom";
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

export default function ProductDetail({ addToCart }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <div className="p-6">{t("product_not_found")}</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="mb-2 text-lg">{product.price} €</p>
      <p className="mb-4">{product.description}</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => addToCart(product)}
      >
        {t("add_to_cart")}
      </button>
    </div>
  );
}
