import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CompanyForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Corporate request submitted:", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl text-green-600 font-bold">
          {t("company_form_success")}
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">{t("company_form_title")}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="companyName"
          placeholder={t("company_name")}
          value={form.companyName}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="contactName"
          placeholder={t("contact_name")}
          value={form.contactName}
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
        <textarea
          name="message"
          placeholder={t("your_message")}
          value={form.message}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {t("send_request")}
        </button>
      </form>
    </div>
  );
}
