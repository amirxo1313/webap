#!/bin/bash

# 🚀 اسکریپت انتقال Behimelobot به سرور
# Transfer Behimelobot to Server Script

set -e

echo "🎵 Behimelobot Server Transfer Script 🎵"
echo "========================================"

# دریافت اطلاعات سرور
read -p "📡 آدرس IP سرور شما: " SERVER_IP
read -p "👤 نام کاربری سرور: " SERVER_USER
read -p "📁 مسیر نصب در سرور (پیش‌فرض: /opt/behimelobot): " INSTALL_PATH
INSTALL_PATH=${INSTALL_PATH:-/opt/behimelobot}

echo ""
echo "🔧 تنظیمات:"
echo "   سرور: $SERVER_USER@$SERVER_IP"
echo "   مسیر: $INSTALL_PATH"
echo ""

# تایید انتقال
read -p "آیا می‌خواهید ادامه دهید؟ (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ انتقال لغو شد."
    exit 1
fi

# ایجاد فایل فشرده
echo "📦 ایجاد فایل فشرده..."
tar -czf /tmp/behimelobot-$(date +%Y%m%d-%H%M%S).tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=dist \
    --exclude=coverage \
    --exclude=*.log \
    -C /workspace .

ARCHIVE_FILE=$(ls -t /tmp/behimelobot-*.tar.gz | head -1)
echo "✅ فایل فشرده آماده: $ARCHIVE_FILE"

# انتقال فایل به سرور
echo "🚀 انتقال فایل به سرور..."
scp "$ARCHIVE_FILE" "$SERVER_USER@$SERVER_IP:/tmp/"

ARCHIVE_NAME=$(basename "$ARCHIVE_FILE")

# اجرای دستورات در سرور
echo "⚙️ نصب و راه‌اندازی در سرور..."
ssh "$SERVER_USER@$SERVER_IP" << EOF
    set -e
    
    echo "📁 ایجاد دایرکتوری نصب..."
    sudo mkdir -p "$INSTALL_PATH"
    sudo chown $SERVER_USER:$SERVER_USER "$INSTALL_PATH"
    
    echo "📦 استخراج فایل‌ها..."
    cd "$INSTALL_PATH"
    tar -xzf "/tmp/$ARCHIVE_NAME"
    
    echo "🔧 نصب Node.js (در صورت عدم وجود)..."
    if ! command -v node &> /dev/null; then
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
    
    echo "📚 نصب وابستگی‌ها..."
    npm install --production
    
    echo "⚙️ تنظیم متغیرهای محیطی..."
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "✏️ لطفاً فایل .env را ویرایش کنید:"
        echo "   nano $INSTALL_PATH/.env"
    fi
    
    echo "🏗️ ساخت پروژه..."
    npm run build
    
    echo "🧪 تست سلامت..."
    timeout 10s npm start &
    sleep 5
    if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
        echo "✅ سرور با موفقیت راه‌اندازی شد!"
    else
        echo "⚠️ ممکن است نیاز به تنظیمات بیشتر باشد."
    fi
    
    # پاک‌سازی
    rm "/tmp/$ARCHIVE_NAME"
    
    echo ""
    echo "🎉 نصب کامل شد!"
    echo "📍 مسیر پروژه: $INSTALL_PATH"
    echo "🚀 برای راه‌اندازی:"
    echo "   cd $INSTALL_PATH"
    echo "   npm start"
    echo ""
    echo "🔧 برای راه‌اندازی با Docker:"
    echo "   cd $INSTALL_PATH"
    echo "   docker-compose up -d"
EOF

echo ""
echo "✅ انتقال با موفقیت انجام شد!"
echo "🌐 برای دسترسی به برنامه:"
echo "   http://$SERVER_IP:5000"
echo ""
echo "📝 مراحل بعدی:"
echo "   1. ویرایش فایل .env در سرور"
echo "   2. تنظیم Nginx و SSL"
echo "   3. راه‌اندازی سرویس"

# پاک‌سازی فایل محلی
rm "$ARCHIVE_FILE"
echo "🧹 فایل فشرده محلی پاک شد."