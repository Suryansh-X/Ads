# 🚀 Vijay Electronics - Complete Setup Guide

## 📋 Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Generate Admin Password Hash](#generate-admin-password-hash)
3. [Run Locally](#run-locally)
4. [Deploy to Vercel](#deploy-to-vercel)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 Local Development Setup

### Step 1: Install Node.js & npm

#### **Windows:**
1. Download from https://nodejs.org/ (LTS version)
2. Run the installer and follow the prompts
3. Restart your computer
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### **Mac:**
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org/
```

#### **Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
node --version
npm --version
```

---

### Step 2: Clone/Download the Repository

```bash
# Clone from GitHub
git clone https://github.com/Suryansh-X/Ads.git
cd Ads

# Or if already cloned, switch to backend branch
git checkout backend-security-setup
```

---

### Step 3: Install Dependencies

```bash
npm install
```

This will install:
- `express` - Backend server
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

**Output should look like:**
```
added X packages, and audited X packages in Xs
```

---

## 🔐 Generate Admin Password Hash

### Method 1: Using Node.js Script (Recommended)

```bash
node api/generateHash.js
```

Then enter your desired password when prompted. Example:
```
🔐 Bcrypt Password Hash Generator
========================================
Enter password to hash: your-secure-password-123

✅ Hashed password:
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gBS5Fl

📝 Add this to your .env.local file as:
ADMIN_PASSWORD_HASH=$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gBS5Fl
```

### Method 2: Using Online Tool

Visit: https://bcrypt.online/ and hash your password

---

## 🏃 Run Locally

### Step 1: Create `.env.local` file

In the root directory, create a file named `.env.local`:

```bash
# Windows (PowerShell)
echo "" > .env.local

# Mac/Linux
touch .env.local
```

### Step 2: Edit `.env.local`

Add the following content:

```env
# Random secret key (at least 32 characters)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345

# Admin credentials
ADMIN_EMAIL=admin@vijayelectronics.in
ADMIN_PASSWORD_HASH=$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gBS5Fl

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**Replace `ADMIN_PASSWORD_HASH` with your generated hash from Step 3!**

### Step 3: Start the Server

```bash
npm start
```

You should see:
```
🚀 Vijay Electronics API running on port 3000
📝 Admin Email: admin@vijayelectronics.in
```

### Step 4: Access the Application

- **Store**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/pages/admin.html
- **Admin Login**: http://localhost:3000/pages/admin-login.html

### Step 5: Login

Use these credentials:
- **Email**: `admin@vijayelectronics.in`
- **Password**: Your password from Step 3

---

## 📦 Deploy to Vercel

### Option 1: Using Vercel CLI (Recommended)

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Deploy

```bash
vercel
```

You'll be prompted with questions:
```
? Set up and deploy "~/Ads"? (Y/n) → Y
? Which scope do you want to deploy to? → Your Account
? Link to existing project? → N
? What's your project's name? → vijay-electronics
? In which directory is your code? → ./
? Want to modify these settings? → N
```

#### Step 3: Add Environment Variables

1. Go to https://vercel.com/dashboard
2. Select your project `vijay-electronics`
3. Click **Settings** → **Environment Variables**
4. Add these variables:

| Name | Value |
|------|-------|
| `JWT_SECRET` | Your secret key (32+ chars) |
| `ADMIN_EMAIL` | `admin@vijayelectronics.in` |
| `ADMIN_PASSWORD_HASH` | Your bcrypt hash |
| `FRONTEND_URL` | Your Vercel domain (e.g., `https://vijay-electronics.vercel.app`) |

5. Click **Save**
6. Go to **Deployments** and redeploy

#### Step 4: Get Your Live URL

After deployment, you'll get a URL like:
```
https://vijay-electronics.vercel.app
```

---

### Option 2: Using GitHub Integration

#### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add backend security with JWT authentication"
git push origin backend-security-setup
```

#### Step 2: Create Pull Request

1. Go to https://github.com/Suryansh-X/Ads
2. Click **Pull requests** → **New pull request**
3. Compare `backend-security-setup` with `main`
4. Click **Create pull request**
5. Once approved, **Merge** to `main`

#### Step 3: Connect Vercel to GitHub

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select the `main` branch
4. Add Environment Variables (same as Option 1, Step 3)
5. Click **Deploy**

---

## 🧪 Test Your Setup

### Test 1: API Health Check

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{"status":"ok","message":"Vijay Electronics API is running"}
```

### Test 2: Login with Valid Credentials

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@vijayelectronics.in",
    "password": "your-password"
  }'
```

Expected response:
```json
{"success":true,"token":"eyJhbGciOiJIUzI1NiIs...","expiresIn":86400}
```

### Test 3: Verify Token

```bash
# Replace TOKEN with the token from Test 2
curl -H "Authorization: Bearer TOKEN" http://localhost:3000/api/auth/verify
```

---

## ⚠️ Troubleshooting

### Error: "npm: command not found"
- **Solution**: Node.js/npm not installed. Install from https://nodejs.org/

### Error: "EADDRINUSE: address already in use :::3000"
- **Solution**: Port 3000 is already in use. Either:
  - Close other applications using port 3000
  - Or change the port:
    ```bash
    PORT=3001 npm start
    ```

### Error: "Invalid credentials" on login
- **Solution**: Check `.env.local` file:
  - Verify `ADMIN_EMAIL` matches login email
  - Verify `ADMIN_PASSWORD_HASH` is correct
  - Regenerate hash using `node api/generateHash.js`

### Error: "CORS error" or "Network error"
- **Solution**: 
  - Ensure backend is running (`npm start`)
  - Check `FRONTEND_URL` in `.env.local`
  - On Vercel, update `FRONTEND_URL` to your domain

### Frontend can't connect to backend
- **Solution**: 
  - Locally: Check if `http://localhost:3000/api/health` works
  - On Vercel: Ensure both frontend and backend are on the same domain
  - Update `API_URL` in `pages/admin-login.html` if needed

### Token expired error
- **Solution**: Tokens expire after 24 hours. Login again to get a new token.

---

## 📚 File Structure

```
Ads/
├── api/
│   ├── index.js              # Backend server (Express.js)
│   └── generateHash.js       # Password hash generator
├── pages/
│   ├── admin-login.html      # Admin login page (with JWT)
│   ├── admin.html            # Admin dashboard
│   ├── cart.html
│   └── invoice.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── store.js
│       └── api.js            # API helper functions
├── index.html                # Main store page
├── package.json              # npm dependencies
├── .env.example              # Environment variables template
├── .env.local                # Local secrets (DO NOT COMMIT)
├── .gitignore                # Git ignore rules
├── vercel.json               # Vercel deployment config
└── SETUP_GUIDE.md           # This file
```

---

## 🔒 Security Checklist

- ✅ Never commit `.env.local` to Git
- ✅ Use strong `JWT_SECRET` (32+ characters)
- ✅ Always hash passwords with bcrypt
- ✅ Enable HTTPS on Vercel (automatic)
- ✅ Set environment variables in Vercel dashboard
- ✅ Rotate tokens regularly
- ✅ Validate all inputs on backend

---

## 📞 Support

For issues:
1. Check `.env.local` file is correct
2. Ensure Node.js is installed: `node --version`
3. Check port 3000 is available
4. Read error messages carefully
5. Check logs: `npm start` shows server logs

---

## 🎉 Success!

Once deployed, you'll have:
- ✅ Secure JWT authentication
- ✅ Vercel free plan deployment
- ✅ Scalable backend API
- ✅ Password-protected admin panel
- ✅ Auto HTTPS/SSL
- ✅ Global CDN

**Your Vijay Electronics e-commerce platform is now production-ready!** 🚀
