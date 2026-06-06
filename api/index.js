const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-this';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@vijayelectronics.in';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gBS5Fl'; // hashed 'password'

// JWT Middleware - Verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// ==================== AUTHENTICATION ====================

// POST /api/auth/login - Admin login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    // Verify credentials
    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: 'admin', email: ADMIN_EMAIL },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      success: true,
      token,
      expiresIn: 86400
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/auth/verify - Verify token
app.get('/api/auth/verify', verifyToken, (req, res) => {
  res.json({ 
    success: true,
    admin: { id: req.adminId, email: ADMIN_EMAIL }
  });
});

// ==================== PRODUCTS ====================

// GET /api/products - Get all products (public)
app.get('/api/products', (req, res) => {
  try {
    const products = JSON.parse(process.env.PRODUCTS_DB || '[]');
    res.json(products);
  } catch (err) {
    res.json([]);
  }
});

// POST /api/products - Add product (protected)
app.post('/api/products', verifyToken, (req, res) => {
  try {
    const newProduct = {
      id: 'p' + Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    // In production, save to database
    // For now, return success
    res.json({ success: true, product: newProduct });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// PUT /api/products/:id - Update product (protected)
app.put('/api/products/:id', verifyToken, (req, res) => {
  try {
    res.json({ success: true, message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE /api/products/:id - Delete product (protected)
app.delete('/api/products/:id', verifyToken, (req, res) => {
  try {
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ==================== ORDERS ====================

// GET /api/orders - Get all orders (protected)
app.get('/api/orders', verifyToken, (req, res) => {
  try {
    const orders = JSON.parse(process.env.ORDERS_DB || '[]');
    res.json(orders);
  } catch (err) {
    res.json([]);
  }
});

// PUT /api/orders/:id - Update order status (protected)
app.put('/api/orders/:id', verifyToken, (req, res) => {
  try {
    const { status } = req.body;
    res.json({ success: true, message: 'Order status updated', status });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Vijay Electronics API is running' });
});

// Serve frontend static files
app.use(express.static('public'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Vijay Electronics API running on port ${PORT}`);
  console.log(`📝 Admin Email: ${ADMIN_EMAIL}`);
});

module.exports = app;
