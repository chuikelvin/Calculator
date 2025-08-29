# PAYE Calculator Deployment Guide

## 🚨 **IMPORTANT: API Routes Issue Resolved**

The 404 error on `/api/enquiry` was caused by using **static export** (`output: "export"`), which doesn't include API routes. Here are your deployment options:

## 🎯 **Option 1: Full Next.js App with API Support (Recommended)**

This option keeps your enquiry API working and provides full functionality.

### **Step 1: Build for Full Deployment**
```bash
npm run build:full
```

### **Step 2: Deploy to Server**
1. Upload your entire project folder to your server
2. Install dependencies: `npm install --production`
3. Start the application: `npm start`

### **Step 3: Configure Nginx with API Proxy**
Use the `nginx-with-api.conf` file:

```bash
# Copy the configuration
sudo cp nginx-with-api.conf /etc/nginx/sites-available/paye-calculator

# Enable the site
sudo ln -s /etc/nginx/sites-available/paye-calculator /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### **Step 4: Process Management (Optional but Recommended)**
Install and use PM2 for production:

```bash
# Install PM2 globally
npm install -g pm2

# Start your application
pm2 start npm --name 'paye-calculator' -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

## 🌐 **Option 2: Static Export (No API Support)**

This option creates a static site but **disables the enquiry functionality**.

### **Step 1: Build Static Version**
```bash
npm run build:static
```

### **Step 2: Deploy Static Files**
Upload the `out` folder contents to your nginx web root.

### **Step 3: Use Basic Nginx Config**
Use the configuration from `NGINX_DEPLOYMENT.md`.

## 🔧 **Current Configuration Status**

- ✅ **API Routes**: Working (after removing static export)
- ✅ **Enquiry Form**: Functional
- ✅ **Static Assets**: Properly configured
- ✅ **Styling**: Tailwind CSS included

## 📋 **Deployment Commands Summary**

```bash
# For API support (recommended)
npm run build:full

# For static export only (no API)
npm run build:static

# Local development
npm run dev

# Production start
npm start
```

## 🐛 **Troubleshooting**

### **API Still Returning 404?**
1. Ensure you're using `npm run build:full` (not `build:static`)
2. Check that `output: "export"` is commented out in `next.config.mjs`
3. Verify your nginx configuration includes the API proxy section
4. Ensure your Next.js server is running on port 3000

### **Static Files Not Loading?**
1. Check nginx configuration paths
2. Verify file permissions on server
3. Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`

### **Process Management Issues?**
1. Check PM2 status: `pm2 status`
2. View logs: `pm2 logs paye-calculator`
3. Restart if needed: `pm2 restart paye-calculator`

## 🌟 **Recommended Production Setup**

1. **Use Option 1** (Full Next.js app) for full functionality
2. **Use PM2** for process management
3. **Use nginx-with-api.conf** for proper API routing
4. **Set up SSL** with Let's Encrypt for HTTPS
5. **Configure monitoring** and logging

## 📞 **Support**

If you encounter issues:
1. Check the nginx error logs
2. Verify your Next.js server is running
3. Test the API endpoint locally first
4. Ensure all dependencies are installed

---

🎉 **Your PAYE Calculator is now ready for deployment with full API support!**
