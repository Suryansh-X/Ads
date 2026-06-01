// ── Vijay Electronics – Store Data Layer ──────────────────────────────────────

const STORE = {
  name: "Vijay Electronics",
  tagline: "Your Trusted Electronics Partner",
  location: "Railway Road, Mukerian, Punjab",
  phone: "+91 9876898832",
  email: "call@suryxnsh.in",
  upiId: "9915649068.eazypay@icici",
  adminPassword: "vijay@admin2024",
  version: "1.0.0"
};

// ── Default Products ──────────────────────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  {
    id: "p001", name: "Samsung 55\" 4K Smart TV", category: "Televisions",
    price: 54990, mrp: 72000, image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&q=80",
    description: "Crystal 4K UHD display, Smart TV with built-in Alexa, HDR10+, 60Hz refresh rate, 3 HDMI ports.",
    specs: ["55 inch 4K UHD", "Smart TV - Tizen OS", "HDR10+ Support", "3 HDMI, 2 USB", "Built-in WiFi"],
    qty: 12, available: true, featured: true, badge: "Best Seller"
  },
  {
    id: "p002", name: "LG 1.5 Ton 5-Star Inverter AC", category: "Air Conditioners",
    price: 42999, mrp: 55000, image: "https://images.unsplash.com/photo-1631545806609-5b9fbb97c3f1?w=500&q=80",
    description: "AI Dual Inverter compressor, 5-star energy rating, Wi-Fi enabled, auto-clean feature.",
    specs: ["1.5 Ton Capacity", "5 Star BEE Rating", "Dual Inverter Compressor", "Wi-Fi Enabled", "Auto Clean"],
    qty: 8, available: true, featured: true, badge: "Energy Saver"
  },
  {
    id: "p003", name: "Whirlpool 265L Double Door Refrigerator", category: "Refrigerators",
    price: 28500, mrp: 36000, image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&q=80",
    description: "Frost-free double door, 6th Sense Technology, fresh flow air tower, 10-year compressor warranty.",
    specs: ["265 Litre Capacity", "Frost Free", "6th Sense Technology", "5 Star Rating", "10Yr Compressor Warranty"],
    qty: 6, available: true, featured: true, badge: "Hot Deal"
  },
  {
    id: "p004", name: "IFB 7kg Front Load Washing Machine", category: "Washing Machines",
    price: 32000, mrp: 42000, image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&q=80",
    description: "Aqua Energie, cradle wash, 3D wash system, in-built heater, express wash in 30 mins.",
    specs: ["7 kg Load Capacity", "1000 RPM", "In-built Heater", "15 Wash Programs", "5 Year Warranty"],
    qty: 5, available: true, featured: false, badge: ""
  },
  {
    id: "p005", name: "Sony 2.1 Ch Soundbar 300W", category: "Audio",
    price: 18990, mrp: 25000, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80",
    description: "Dolby Atmos, S-Force Front Surround, Bluetooth 5.0, HDMI ARC, subwoofer included.",
    specs: ["300W Output", "2.1 Channel", "Dolby Atmos", "Bluetooth 5.0", "HDMI ARC"],
    qty: 15, available: true, featured: false, badge: "New"
  },
  {
    id: "p006", name: "Philips 750W Mixer Grinder", category: "Kitchen Appliances",
    price: 3499, mrp: 5000, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80",
    description: "750W motor, 3 stainless steel jars, anti-rust blades, overload protection, 2-year warranty.",
    specs: ["750W Motor", "3 Stainless Steel Jars", "3 Speed + Pulse", "Anti-Rust Blades", "2 Year Warranty"],
    qty: 20, available: true, featured: false, badge: ""
  },
  {
    id: "p007", name: "Bajaj 2000W Room Heater", category: "Heating & Cooling",
    price: 2299, mrp: 3500, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    description: "Fan-forced room heater, 2000W, adjustable thermostat, overheat protection, 1-year warranty.",
    specs: ["2000W Power", "Fan Forced Heating", "Adjustable Thermostat", "Overheat Protection", "Tip-over Safety"],
    qty: 30, available: true, featured: false, badge: "Winter Special"
  },
  {
    id: "p008", name: "Crompton 75L Geyser Water Heater", category: "Water Heaters",
    price: 9499, mrp: 13000, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
    description: "75-litre storage water heater, 5-star rating, anti-corrosion tank, 8 bar pressure, thermostatic control.",
    specs: ["75 Litre Capacity", "2000W Element", "5 Star Rating", "8 Bar Pressure", "5 Year Tank Warranty"],
    qty: 10, available: true, featured: true, badge: "Top Rated"
  }
];

// ── Storage Helpers ───────────────────────────────────────────────────────────
function getProducts() {
  const stored = localStorage.getItem("ve_products");
  if (!stored) {
    localStorage.setItem("ve_products", JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  return JSON.parse(stored);
}

function saveProducts(products) {
  localStorage.setItem("ve_products", JSON.stringify(products));
  window.dispatchEvent(new Event("productsUpdated"));
}

function getOrders() {
  return JSON.parse(localStorage.getItem("ve_orders") || "[]");
}

function saveOrders(orders) {
  localStorage.setItem("ve_orders", JSON.stringify(orders));
}

function getCart() {
  return JSON.parse(localStorage.getItem("ve_cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("ve_cart", JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? "flex" : "none";
  });
}

function isAdminLoggedIn() {
  return sessionStorage.getItem("ve_admin") === "true";
}

function addToCart(productId, qty = 1) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product || !product.available) return false;
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
  showToast("✅ Added to cart!");
  return true;
}

function showToast(msg, type = "success") {
  const t = document.createElement("div");
  t.className = `ve-toast ve-toast-${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 2500);
}

function formatPrice(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

function generateOrderId() {
  return "VE" + Date.now().toString().slice(-8) + Math.random().toString(36).slice(2, 5).toUpperCase();
}

function discount(mrp, price) {
  return Math.round(((mrp - price) / mrp) * 100);
}
