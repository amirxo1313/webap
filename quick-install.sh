#!/bin/bash

# 🚀 اسکریپت نصب سریع Behimelobot
# Quick Install Script for Behimelobot

echo "🎵 Behimelobot Quick Install 🎵"
echo "==============================="

# ایجاد دایرکتوری پروژه
mkdir -p behimelobot
cd behimelobot

# ایجاد package.json
cat > package.json << 'EOF'
{
  "name": "behimelobot",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc",
    "test": "jest"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.60.5",
    "axios": "^1.12.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "express": "^4.21.2",
    "framer-motion": "^11.13.1",
    "lucide-react": "^0.453.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "wouter": "^3.3.5",
    "zod": "^3.24.2",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/node": "20.16.11",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.7.0",
    "autoprefixer": "^10.4.20",
    "esbuild": "^0.25.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.20.5",
    "typescript": "5.6.3",
    "vite": "^5.4.20"
  }
}
EOF

# ایجاد ساختار دایرکتوری
mkdir -p client/src/{components,pages,lib,hooks}
mkdir -p server
mkdir -p shared

echo "✅ ساختار پروژه ایجاد شد!"
echo ""
echo "📋 مراحل بعدی:"
echo "1. cd behimelobot"
echo "2. npm install"
echo "3. فایل‌های کد را از GitHub یا منابع دیگر کپی کنید"
echo "4. npm run build"
echo "5. npm start"
echo ""
echo "🔗 GitHub Repository:"
echo "   https://github.com/amorfi4042-cyber/webap"