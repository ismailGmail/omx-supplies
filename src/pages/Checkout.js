import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Checkout({ cartItems, removeAllItems }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", { ...form, cartItems });
    removeAllItems();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl text-green-600 font-bold">
          {t("order_success")}
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">{t("checkout")}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder={t("your_name")}
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder={t("your_email")}
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {t("place_order")}
        </button>
      </form>
    </div>
  );
}
