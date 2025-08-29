#!/bin/bash

# Troubleshooting script for PAYE Calculator enquiry API
# This script helps diagnose why the enquiry form is failing

echo "🔍 Troubleshooting PAYE Calculator Enquiry API..."
echo "================================================"

# Check if Next.js server is running
echo ""
echo "1️⃣ Checking Next.js server status..."
if pgrep -f "next" > /dev/null; then
    echo "✅ Next.js server is running"
    echo "   Process IDs: $(pgrep -f 'next')"
else
    echo "❌ Next.js server is NOT running"
    echo "   💡 You need to start the server first"
fi

# Check if port 3000 is listening
echo ""
echo "2️⃣ Checking if port 3000 is listening..."
if netstat -tlnp 2>/dev/null | grep ":3000" > /dev/null; then
    echo "✅ Port 3000 is listening"
    netstat -tlnp 2>/dev/null | grep ":3000"
else
    echo "❌ Port 3000 is not listening"
    echo "   💡 Next.js server needs to be started"
fi

# Check nginx configuration
echo ""
echo "3️⃣ Checking nginx configuration..."
if [ -f "/etc/nginx/sites-available/paye-calculator" ]; then
    echo "✅ Nginx configuration exists"
    
    # Check if it's enabled
    if [ -L "/etc/nginx/sites-enabled/paye-calculator" ]; then
        echo "✅ Site is enabled"
    else
        echo "❌ Site is NOT enabled"
        echo "   💡 Enable with: sudo ln -s /etc/nginx/sites-available/paye-calculator /etc/nginx/sites-enabled/"
    fi
    
    # Check nginx syntax
    echo "🧪 Testing nginx configuration..."
    if nginx -t 2>/dev/null; then
        echo "✅ Nginx configuration is valid"
    else
        echo "❌ Nginx configuration has errors"
        echo "   💡 Check: sudo nginx -t"
    fi
else
    echo "❌ Nginx configuration not found"
    echo "   💡 Deploy the configuration first"
fi

# Check nginx status
echo ""
echo "4️⃣ Checking nginx service status..."
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx service is running"
else
    echo "❌ Nginx service is NOT running"
    echo "   💡 Start with: sudo systemctl start nginx"
fi

# Test API endpoint locally
echo ""
echo "5️⃣ Testing API endpoint locally..."
if command -v curl > /dev/null; then
    echo "🧪 Testing /api/enquiry endpoint..."
    
    # Test if the endpoint responds
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/enquiry 2>/dev/null || echo "000")
    
    if [ "$RESPONSE" = "404" ]; then
        echo "❌ API endpoint returns 404 (Not Found)"
        echo "   💡 Check if Next.js server is running and built correctly"
    elif [ "$RESPONSE" = "000" ]; then
        echo "❌ Cannot connect to API endpoint"
        echo "   💡 Next.js server is not running or not accessible"
    elif [ "$RESPONSE" = "405" ]; then
        echo "✅ API endpoint exists (Method Not Allowed - expected for GET)"
        echo "   💡 This is normal - POST requests should work"
    else
        echo "✅ API endpoint responded with status: $RESPONSE"
    fi
else
    echo "⚠️  curl not available - cannot test API endpoint"
fi

# Check build status
echo ""
echo "6️⃣ Checking build status..."
if [ -d ".next" ]; then
    echo "✅ Next.js build directory exists"
    echo "   Build size: $(du -sh .next 2>/dev/null | cut -f1)"
else
    echo "❌ Next.js build directory not found"
    echo "   💡 Run: npm run build:full"
fi

# Check if out directory exists (static export)
if [ -d "out" ]; then
    echo "⚠️  Static export directory 'out' exists"
    echo "   💡 This suggests you might have used static export"
    echo "   💡 For API support, use: npm run build:full"
fi

# Summary and next steps
echo ""
echo "================================================"
echo "📋 TROUBLESHOOTING SUMMARY"
echo "================================================"

if pgrep -f "next" > /dev/null && netstat -tlnp 2>/dev/null | grep ":3000" > /dev/null; then
    echo "✅ Next.js server is running and accessible"
    echo "🔧 Next steps:"
    echo "   1. Check browser console for JavaScript errors"
    echo "   2. Verify the enquiry form is sending POST requests"
    echo "   3. Check nginx logs: sudo tail -f /var/log/nginx/error.log"
else
    echo "❌ Next.js server is not running or accessible"
    echo "🔧 Next steps:"
    echo "   1. Start Next.js server: npm start"
    echo "   2. Or build and start: npm run build:full && npm start"
    echo "   3. Ensure server is running on port 3000"
fi

if [ -d ".next" ]; then
    echo "✅ Application is built for API support"
else
    echo "❌ Application needs to be built for API support"
    echo "   💡 Run: npm run build:full"
fi

echo ""
echo "🌐 Test your enquiry form at: https://skillmindsoftware.com/calculator/"
echo "📊 Monitor logs: sudo tail -f /var/log/nginx/error.log"
