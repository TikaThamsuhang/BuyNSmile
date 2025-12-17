# Frontend to Render Backend Connection Guide

## ✅ What's Been Done

Your frontend is now configured to connect to your Render backend at: **https://e-commerce-backend-frey.onrender.com**

### Changes Made:

1. **Created API Configuration** (`src/config/api.js`)
   - Centralized API base URL management
   - Uses environment variables with fallback to localhost

2. **Environment Configuration Files**
   - `.env.local` - Local development (localhost:3000)
   - `.env.production` - Production (Render backend)

3. **Updated All API Calls**
   - All components now use `API_BASE_URL` from the config
   - Updated files:
     - `src/App.jsx`
     - `src/pages/home/HomePage.jsx`
     - `src/pages/home/Product.jsx`
     - `src/pages/orders/OrdersPage.jsx`
     - `src/pages/orders/OrdersDetailsGrid.jsx`
     - `src/pages/checkout/CheckoutPage.jsx`
     - `src/pages/checkout/CartItemDetails.jsx`
     - `src/pages/checkout/DeliveryOption.jsx`
     - `src/pages/checkout/PaymentSummary.jsx`
     - `src/pages/tracking/TrackingPage.jsx`

## 🚀 How to Deploy Your Frontend

### Option 1: Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from your project directory
vercel
```

### Option 2: Deploy to Netlify
```bash
# Build the project first
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Option 3: Deploy to Render (like your backend)
1. Go to https://render.com
2. Create new **Static Site**
3. Connect your GitHub repository
4. Set Build Command: `npm run build`
5. Set Publish Directory: `dist`
6. Deploy!

## 🔧 Local Development

For local development, the frontend will use the proxy in `vite.config.js`:
```bash
npm run dev
```
This will run on `http://localhost:5173` and proxy requests to `http://localhost:3000`

## 📝 Using Different Backends

### For Local Backend:
```bash
# Already configured - just run:
npm run dev
```

### For Production (Render):
```bash
# Build for production
npm run build

# This will use the Render backend from .env.production
```

### Manual Override:
If needed, you can manually override the API base URL by editing `.env.production`:
```env
VITE_API_BASE_URL=https://e-commerce-backend-frey.onrender.com
```

## ✨ Key Features

- ✅ **Environment-based configuration** - Different URLs for dev/prod
- ✅ **Centralized API config** - Easy to manage API endpoints
- ✅ **No hardcoded URLs** - Flexible and maintainable
- ✅ **Full CORS support** - Your backend already has CORS enabled

## 🐛 Troubleshooting

If you're getting CORS errors:
1. Make sure your Render backend is running and accessible
2. Check that CORS is enabled in your backend (it should be with `app.use(cors())`)
3. Verify the URL is correct: https://e-commerce-backend-frey.onrender.com

If the app is still trying to connect to localhost:
1. Make sure you're using the production build: `npm run build`
2. Check that you're deploying the `dist` folder
3. Verify `.env.production` has the correct backend URL

## 📦 Next Steps

1. **Build the project**: `npm run build`
2. **Test the build locally**: `npm run preview`
3. **Deploy to your hosting**: Use Vercel, Netlify, or Render
4. **Test all features** with your production backend
