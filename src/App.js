import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

// --- Veriler ---
const categories = [
  { name: "Kava", path: "/products/coffee" },
  { name: "Čaj", path: "/products/tea" },
  { name: "Skodelice & Koši", path: "/products/cups-bags" },
  { name: "Aparati", path: "/products/machines" },
];

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
  {
      id: 4,
      name: "Kava opremo (1 kos)",
      category: "oprema",
      price: "12.90",
      description: "Za enkratno uporabo, primerno za tople napitke.",
    },
];

// --- Navbar ---
function Navbar({ cartCount }) {
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

// --- Home ---
function Home({ addToCart }) {
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

// --- Product Detail ---
function ProductDetail({ addToCart }) {
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

// --- Cart ---
function Cart({ cartItems, removeFromCart, removeAllItems }) {
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
          <Link to="/checkout">
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
              {t("checkout")}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

// --- Checkout ---
function Checkout({ cartItems, removeAllItems }) {
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

// --- Company Form ---
function CompanyForm() {
  const { t } = useTranslation();
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">{t("corporate_offer")}</h1>
      <p>{t("company_form_description") || "Fill in the form for corporate orders."}</p>
    </div>
  );
}

// --- Ana Uygulama ---
export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeAllItems = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route
          path="/products/:category"
          element={<Home addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              removeAllItems={removeAllItems}
            />
          }
        />
        <Route path="/company" element={<CompanyForm />} />
        <Route
          path="/product/:id"
          element={<ProductDetail addToCart={addToCart} />}
        />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} removeAllItems={removeAllItems} />} />
        <Route path="*" element={<Home addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
}
