# Vijay Electronics - Backend Security Setup

## 🔐 Security Implementation

This project now includes a secure Node.js backend with JWT authentication and Vercel deployment support.

### Features
- ✅ Express.js API server
- ✅ JWT token-based authentication
- ✅ Bcrypt password hashing
- ✅ CORS protection
- ✅ Vercel serverless deployment ready
- ✅ Environment variable management

## 📦 Installation

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```

3. **Generate admin password hash**
   ```bash
   node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-secure-password', 10))"
   ```
   Update `ADMIN_PASSWORD_HASH` in `.env.local` with the output.

4. **Run the server**
   ```bash
   npm start
   ```

Server will run at `http://localhost:3000`

## 🚀 Deployment on Vercel

### Option 1: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**
   - Go to Project Settings → Environment Variables
   - Add:
     - `JWT_SECRET` - Your secret JWT key
     - `ADMIN_EMAIL` - Admin email address
     - `ADMIN_PASSWORD_HASH` - Bcrypt hashed password

### Option 2: Using GitHub Integration

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. Vercel auto-deploys on push

## 🔑 API Endpoints

### Authentication

**POST** `/api/auth/login`
```json
{
  "email": "admin@vijayelectronics.in",
  "password": "your-password"
}
```
Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 86400
}
```

**GET** `/api/auth/verify`
- Headers: `Authorization: Bearer <token>`
- Response: Admin details if token valid

### Products (Public)

**GET** `/api/products` - Get all products

### Products (Protected)

**POST** `/api/products` - Add product
- Headers: `Authorization: Bearer <token>`

**PUT** `/api/products/:id` - Update product
- Headers: `Authorization: Bearer <token>`

**DELETE** `/api/products/:id` - Delete product
- Headers: `Authorization: Bearer <token>`

### Orders (Protected)

**GET** `/api/orders` - Get all orders
- Headers: `Authorization: Bearer <token>`

**PUT** `/api/orders/:id` - Update order status
- Headers: `Authorization: Bearer <token>`

## 🛡️ Security Best Practices

1. **Never commit `.env.local`** - Add to `.gitignore` ✅
2. **Use strong JWT_SECRET** - At least 32 characters
3. **Hash passwords with bcrypt** - Never store plain text
4. **Use HTTPS** - Vercel provides free SSL
5. **Rotate tokens** - Set reasonable expiration times
6. **Validate input** - Always validate on backend
7. **CORS protection** - Only allow trusted origins

## 📝 Frontend Integration

Update your frontend to use the API:

```javascript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@vijayelectronics.in',
    password: 'password'
  })
});
const data = await response.json();
if (data.token) {
  localStorage.setItem('adminToken', data.token);
}

// Verify token
const verifyResponse = await fetch('/api/auth/verify', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
  }
});
```

## 🐛 Troubleshooting

**"Invalid credentials" error**
- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` are correct
- Regenerate password hash if needed

**CORS errors**
- Update `FRONTEND_URL` in environment variables
- Ensure backend is running before frontend

**Token expired**
- Frontend should handle 401 responses
- Refresh token or redirect to login

## 📚 Resources

- [Express.js](https://expressjs.com/)
- [JWT](https://jwt.io/)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Vercel Docs](https://vercel.com/docs)

---

**Next Steps:**
1. Update frontend files to use API endpoints
2. Test login flow locally
3. Deploy to Vercel
4. Update admin credentials in production
