#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Starting static build process...");

try {
  // Clean previous build
  if (fs.existsSync("out")) {
    console.log("🧹 Cleaning previous build...");
    fs.rmSync("out", { recursive: true, force: true });
  }

  // Build the application
  console.log("🔨 Building Next.js application...");
  execSync("npm run build", { stdio: "inherit" });

  // Fix asset paths for nginx deployment
  console.log("🔧 Fixing asset paths for nginx deployment...");
  execSync("node fix-paths.js", { stdio: "inherit" });

  // Check if build was successful
  if (fs.existsSync("out")) {
    console.log("✅ Build completed successfully!");
    console.log('📁 Static files are in the "out" folder');

    // List the contents of the out folder
    console.log("\n📋 Contents of out folder:");
    const listContents = (dir, indent = "") => {
      const items = fs.readdirSync(dir);
      items.forEach((item) => {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
          console.log(`${indent}📁 ${item}/`);
          listContents(fullPath, indent + "  ");
        } else {
          console.log(`${indent}📄 ${item}`);
        }
      });
    };

    listContents("out");

    console.log("\n🎉 Static export completed!");
    console.log(
      '💡 You can now serve the "out" folder with any static file server'
    );
    console.log("🌐 Example: npx serve out");
  } else {
    console.error('❌ Build failed - "out" folder not found');
    process.exit(1);
  }
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}
