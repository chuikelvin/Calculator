#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing asset paths for nginx deployment...');

// Function to fix paths in HTML files
function fixPathsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix CSS paths
    content = content.replace(/href="\/_next\//g, 'href="./_next/');
    
    // Fix JavaScript paths
    content = content.replace(/src="\/_next\//g, 'src="./_next/');
    
    // Fix favicon path
    content = content.replace(/href="\/favicon\.ico/g, 'href="./favicon.ico');
    
    // Fix any other absolute paths
    content = content.replace(/href="\//g, 'href="./');
    content = content.replace(/src="\//g, 'src="./');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed paths in: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error fixing paths in ${filePath}:`, error.message);
  }
}

// Function to recursively process HTML files
function processDirectory(dirPath) {
  try {
    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        processDirectory(fullPath);
      } else if (item.endsWith('.html')) {
        fixPathsInFile(fullPath);
      }
    });
  } catch (error) {
    console.error(`❌ Error processing directory ${dirPath}:`, error.message);
  }
}

// Main execution
const outDir = 'out';
if (fs.existsSync(outDir)) {
  console.log(`📁 Processing directory: ${outDir}`);
  processDirectory(outDir);
  console.log('🎉 Path fixing completed!');
  console.log('💡 Your static build is now ready for nginx deployment');
} else {
  console.error('❌ "out" directory not found. Please run "npm run build:static" first.');
  process.exit(1);
}
