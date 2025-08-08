// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { categories } from "../data";

export default function Navbar({ cartCount }) {
  const { t, i18n } = useTranslation();

  return (
    <nav className="bg-slate-800 text-white p-4 flex justify-between">
      <div className="text-xl font-bold">OMX Supplies</div>
      <div className="space-x-4 flex items-center">
        {categories.map((cat) => (
          <Link to={cat.path} key={cat.path} className="hover:underline">
            {cat.name}
          </Link>
        ))}
        <Link to="/cart" className="relative hover:underline">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2">
              {cartCount}
            </span>
          )}
        </Link>
        <Link to="/company" className="hover:underline">
          {t("corporate_offer")}
        </Link>
        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="bg-slate-700 text-white rounded px-2"
        >
          <option value="sl">SL</option>
          <option value="tr">TR</option>
          <option value="en">EN</option>
        </select>
      </div>
    </nav>
  );
}
