#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Starting full Next.js deployment...");

try {
  // Clean previous build
  if (fs.existsSync(".next")) {
    console.log("🧹 Cleaning previous build...");
    fs.rmSync(".next", { recursive: true, force: true });
  }

  // Install dependencies if needed
  console.log("📦 Installing dependencies...");
  execSync("npm install --legacy-peer-deps", { stdio: "inherit" });

  // Build the application (without static export)
  console.log("🔨 Building Next.js application...");
  execSync("npm run build", { stdio: "inherit" });

  // Check if build was successful
  if (fs.existsSync(".next")) {
    console.log("✅ Build completed successfully!");
    console.log("📁 Build files are in the .next folder");

    console.log("\n🎯 Deployment Options:");
    console.log("1. Run locally: npm start");
    console.log("2. Deploy to server with PM2:");
    console.log("   - Install PM2: npm install -g pm2");
    console.log("   - Start: pm2 start npm --name 'paye-calculator' -- start");
    console.log("   - Monitor: pm2 monit");
    console.log("   - Logs: pm2 logs paye-calculator");

    console.log("\n🌐 For production deployment:");
    console.log("- Upload your project folder to server");
    console.log("- Run: npm install --production");
    console.log("- Run: npm start");
    console.log("- Or use PM2 for process management");

    console.log("\n📋 Nginx Configuration:");
    console.log("- Use nginx-with-api.conf for API support");
    console.log("- This will proxy /api/* requests to your Next.js server");
  } else {
    console.error('❌ Build failed - ".next" folder not found');
    process.exit(1);
  }
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}
