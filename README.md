# ⚡ Vijay Electronics – E-Commerce Store

**Vijay Electronics** is a full-featured, GitHub Pages-ready electronics retail store.

## 🏪 Store Details
- **Name:** Vijay Electronics
- **Location:** Railway Road, Mukerian, Punjab – 144211
- **Contact:** +91 9876898832
- **UPI:** 9915649068.eazypay@icici

## 🚀 How to Deploy on GitHub Pages
1. Upload all files to a GitHub repository
2. Go to **Settings → Pages → Source: main branch / root**
3. Your store goes live at `https://yourusername.github.io/vijay-electronics/`

## 🔐 Admin Panel
- URL: `/pages/admin-login.html`
- Password: `vijay@admin2024`
- **Change password** in `assets/js/store.js` → `adminPassword` field

## ✨ Features
- 🛍️ Full product catalog with search & category filter
- 🛒 Cart with qty management
- 💳 UPI payment deep-link (opens GPay/PhonePe/Paytm automatically)
- 📲 WhatsApp order notification (auto-opens after payment)
- 🧾 Invoice generation & print/PDF
- 🔐 Password-protected admin panel
- 📦 Product management (add/edit/delete/stock/price)
- 📋 Order management with status updates
- 💾 All data stored in browser localStorage (no backend needed)
- 📱 Fully responsive for mobile

## 📂 File Structure
```
vijay-electronics/
├── index.html          ← Main store homepage
├── assets/
│   ├── css/style.css   ← All styles
│   └── js/store.js     ← Data layer & utilities
└── pages/
    ├── cart.html        ← Cart + Checkout (4-step)
    ├── invoice.html     ← Printable invoice
    ├── admin-login.html ← Admin login
    └── admin.html       ← Admin panel
```
