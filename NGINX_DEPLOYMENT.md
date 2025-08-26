# Nginx Deployment Guide for PAYE Calculator

Your static build is now ready for nginx deployment with all styling included! 🎉

## 🚀 **Quick Deploy to Nginx**

### **Step 1: Build the Static Version**
```bash
npm run build:static
```

This command will:
1. Build your Next.js application
2. Export to the `out` folder
3. **Automatically fix all asset paths** for nginx deployment
4. Show you the contents of the build

### **Step 2: Upload to Your Server**
Upload the entire `out` folder contents to your nginx web root directory (usually `/var/www/html/` or `/usr/share/nginx/html/`)

### **Step 3: Configure Nginx**
Add this configuration to your nginx site configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain
    
    root /var/www/html;  # Path to your out folder contents
    index index.html;
    
    # Handle static assets
    location /_next/ {
        alias /var/www/html/_next/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle images and other assets
    location ~* \.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle CSS and JS files
    location ~* \.(css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle HTML files
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

## 📁 **What Gets Deployed**

Your `out` folder contains everything needed:

```
out/
├── index.html                    # Main application (with fixed paths)
├── _next/                       # Next.js assets
│   ├── static/
│   │   ├── css/                # ✅ All Tailwind styles (60KB)
│   │   ├── chunks/             # ✅ JavaScript bundles
│   │   └── media/              # ✅ Fonts and media
├── skillmind-software.png       # ✅ Logo
├── favicon.ico                  # ✅ Favicon
└── 404.html                     # ✅ Error page
```

## 🔧 **Path Fixing (Automatic)**

The build process now automatically fixes all asset paths:
- ❌ **Before**: `href="/_next/static/css/..."`
- ✅ **After**: `href="./_next/static/css/..."`

This ensures all styling and JavaScript works correctly with nginx!

## 🌐 **Testing Your Deployment**

### **Local Testing (Before Upload)**
```bash
npm run serve
```
Visit `http://localhost:3000` to verify everything works.

### **Server Testing**
After uploading to nginx:
1. Visit your domain
2. Check browser console for any 404 errors
3. Verify all styling is loaded
4. Test the calculator functionality

## 🐛 **Troubleshooting**

### **Styles Not Loading?**
- ✅ Check that `_next/static/css/` folder exists
- ✅ Verify CSS file paths use `./_next/...` (relative)
- ✅ Check nginx logs: `sudo tail -f /var/log/nginx/error.log`

### **JavaScript Errors?**
- ✅ Check that `_next/static/chunks/` folder exists
- ✅ Verify JS file paths use `./_next/...` (relative)
- ✅ Check browser console for 404 errors

### **Images Not Showing?**
- ✅ Ensure all images are in the web root
- ✅ Check image paths are relative (no leading `/`)

## 📱 **Performance Optimization**

Your nginx configuration includes:
- **Long-term caching** for static assets (1 year)
- **Gzip compression** (if enabled in nginx)
- **Security headers** for protection
- **Proper MIME types** for all file types

## 🔄 **Updating Your Site**

To update your deployed site:
1. Make changes to your code
2. Run `npm run build:static`
3. Upload the new `out` folder contents
4. Restart nginx: `sudo systemctl reload nginx`

## 🎯 **Nginx Commands**

```bash
# Test nginx configuration
sudo nginx -t

# Reload nginx (after config changes)
sudo systemctl reload nginx

# Restart nginx (if needed)
sudo systemctl restart nginx

# Check nginx status
sudo systemctl status nginx

# View nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🌟 **What's Fixed**

1. ✅ **All styling included** - Tailwind CSS is bundled and optimized
2. ✅ **Asset paths fixed** - All paths are relative for nginx
3. ✅ **Input field issue resolved** - Background watermark won't interfere
4. ✅ **Performance optimized** - Assets are cached and compressed
5. ✅ **SEO friendly** - Pre-rendered HTML for search engines

---

🎉 **Your PAYE Calculator is now ready for nginx deployment with full styling support!**

The static build will work perfectly with nginx and all your Tailwind CSS styling will be properly loaded. The input field issue has also been resolved, so users can interact with the calculator normally after selecting different countries.
