/**
 * API Helper Functions
 * Handles authentication and API requests
 */

const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000'
  : window.location.origin;

/**
 * Get Authorization Header
 */
function getAuthHeader() {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

/**
 * Login Admin
 */
async function apiLogin(email, password) {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (err) {
    console.error('Login error:', err);
    return { ok: false, error: 'Network error' };
  }
}

/**
 * Verify Admin Token
 */
async function apiVerifyToken() {
  try {
    const response = await fetch(`${API_URL}/api/auth/verify`, {
      headers: getAuthHeader()
    });
    return { ok: response.ok, ...(await response.json()) };
  } catch (err) {
    return { ok: false, error: 'Verification failed' };
  }
}

/**
 * Fetch Products
 */
async function apiGetProducts() {
  try {
    const response = await fetch(`${API_URL}/api/products`);
    return response.ok ? await response.json() : [];
  } catch (err) {
    console.error('Fetch products error:', err);
    return [];
  }
}

/**
 * Add Product
 */
async function apiAddProduct(productData) {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(productData)
    });
    return { ok: response.ok, ...(await response.json()) };
  } catch (err) {
    return { ok: false, error: 'Failed to add product' };
  }
}

/**
 * Update Product
 */
async function apiUpdateProduct(productId, productData) {
  try {
    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(productData)
    });
    return { ok: response.ok, ...(await response.json()) };
  } catch (err) {
    return { ok: false, error: 'Failed to update product' };
  }
}

/**
 * Delete Product
 */
async function apiDeleteProduct(productId) {
  try {
    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return { ok: response.ok, ...(await response.json()) };
  } catch (err) {
    return { ok: false, error: 'Failed to delete product' };
  }
}

/**
 * Fetch Orders
 */
async function apiGetOrders() {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      headers: getAuthHeader()
    });
    return response.ok ? await response.json() : [];
  } catch (err) {
    console.error('Fetch orders error:', err);
    return [];
  }
}

/**
 * Update Order Status
 */
async function apiUpdateOrderStatus(orderId, status) {
  try {
    const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify({ status })
    });
    return { ok: response.ok, ...(await response.json()) };
  } catch (err) {
    return { ok: false, error: 'Failed to update order' };
  }
}

/**
 * Health Check
 */
async function apiHealthCheck() {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    return response.ok ? await response.json() : null;
  } catch (err) {
    return null;
  }
}
