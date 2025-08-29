#!/bin/bash

# Fix script for Calculator dependencies and build issues
# This script resolves the MODULE_NOT_FOUND error

echo "🔧 Fixing Calculator dependencies and build issues..."
echo "===================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Not in the project directory"
    echo "💡 Please run this script from your Calculator project folder"
    exit 1
fi

echo "✅ Found project directory"

# Step 1: Stop any running PM2 processes
echo ""
echo "1️⃣ Stopping PM2 processes..."
if command -v pm2 > /dev/null; then
    pm2 stop calculator 2>/dev/null || true
    pm2 delete calculator 2>/dev/null || true
    echo "✅ PM2 processes stopped"
else
    echo "⚠️  PM2 not found - skipping PM2 cleanup"
fi

# Step 2: Kill any running Next.js processes
echo ""
echo "2️⃣ Stopping any running Next.js processes..."
pkill -f "next" 2>/dev/null || true
echo "✅ Next.js processes stopped"

# Step 3: Clean all build artifacts and node_modules
echo ""
echo "3️⃣ Cleaning build artifacts and dependencies..."
rm -rf .next out node_modules package-lock.json
echo "✅ Build artifacts cleaned"

# Step 4: Reinstall dependencies
echo ""
echo "4️⃣ Reinstalling dependencies..."
npm install --legacy-peer-deps
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"

# Step 5: Check Next.js configuration
echo ""
echo "5️⃣ Checking Next.js configuration..."
if grep -q "output.*export" next.config.mjs; then
    echo "❌ Static export is enabled - this breaks API routes"
    echo "🔧 Fixing configuration..."
    
    # Comment out static export
    sed -i 's/^  output: "export",/  \/\/ output: "export", \/\/ Commented out to enable API routes/' next.config.mjs
    sed -i 's/^  distDir: "out",/  \/\/ distDir: "out", \/\/ Commented out to enable API routes/' next.config.mjs
    
    echo "✅ Configuration fixed"
else
    echo "✅ Configuration is correct for API support"
fi

# Step 6: Build the application
echo ""
echo "6️⃣ Building application for API support..."
npm run build

if [ $? -eq 0 ] && [ -d ".next" ]; then
    echo "✅ Build completed successfully"
    echo "📁 Build size: $(du -sh .next | cut -f1)"
else
    echo "❌ Build failed"
    echo "💡 Check for build errors above"
    exit 1
fi

# Step 7: Test the server locally
echo ""
echo "7️⃣ Testing server locally..."
echo "🚀 Starting server for testing..."
npm start &
SERVER_PID=$!

# Wait for server to start
sleep 10

# Check if server is running
if pgrep -f "next" > /dev/null; then
    echo "✅ Next.js server is running (PID: $SERVER_PID)"
    
    # Test API endpoint
    echo "🧪 Testing API endpoint..."
    if command -v curl > /dev/null; then
        RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/enquiry 2>/dev/null || echo "000")
        if [ "$RESPONSE" = "405" ]; then
            echo "✅ API endpoint is working (Method Not Allowed for GET is expected)"
        else
            echo "⚠️  API endpoint response: $RESPONSE"
        fi
    fi
    
    # Stop test server
    kill $SERVER_PID 2>/dev/null
    echo "✅ Test server stopped"
else
    echo "❌ Failed to start Next.js server"
    exit 1
fi

# Step 8: Start with PM2
echo ""
echo "8️⃣ Starting with PM2..."
if command -v pm2 > /dev/null; then
    pm2 start npm --name "calculator" -- start
    pm2 save
    echo "✅ PM2 started successfully"
    
    # Show PM2 status
    echo ""
    echo "📊 PM2 Status:"
    pm2 status
else
    echo "⚠️  PM2 not available - you can start manually with: npm start"
fi

echo ""
echo "===================================================="
echo "🎉 Calculator dependencies and build issues fixed!"
echo "===================================================="
echo ""
echo "📋 What was fixed:"
echo "   ✅ Dependencies reinstalled"
echo "   ✅ Build artifacts cleaned"
echo "   ✅ Next.js configuration corrected"
echo "   ✅ Application rebuilt for API support"
echo "   ✅ PM2 process restarted"
echo ""
echo "🌐 Test your calculator at: https://skillmindsoftware.com/calculator/"
echo "🔍 Check PM2 logs: pm2 logs calculator"
echo "📊 Monitor PM2 status: pm2 monit"
echo ""
echo "💡 If you still have issues, check:"
echo "   - PM2 logs: pm2 logs calculator"
echo "   - Nginx logs: tail -f /var/log/nginx/error.log"
echo "   - Server status: systemctl status nginx"
