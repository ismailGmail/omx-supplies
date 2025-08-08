import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Cart({ cartItems, removeFromCart, removeAllItems }) {
  const { t } = useTranslation();
  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">{t("your_cart")}</h1>
      {cartItems.length === 0 ? (
        <p>{t("cart_empty")}</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="border-b py-2 flex justify-between">
              <div>
                <p>
                  {item.name} - {item.price} € x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-2 rounded"
              >
                {t("remove")}
              </button>
            </div>
          ))}
          <p className="mt-4 font-semibold">
            {t("total")}: {total.toFixed(2)} €
          </p>
          <div className="flex gap-4 mt-4">
            <Link to="/checkout">
              <button className="bg-green-600 text-white px-4 py-2 rounded">
                {t("checkout")}
              </button>
            </Link>
            <button
              onClick={removeAllItems}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              {t("clear_cart")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
