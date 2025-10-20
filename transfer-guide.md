# 🚀 راهنمای انتقال کدهای Behimelobot به سرور

## روش 1: دانلود مستقیم فایل‌ها

### مرحله 1: دانلود فایل فشرده
```bash
# فایل فشرده در /tmp/behimelobot.tar.gz آماده است (345KB)
# این فایل شامل تمام کدهای پروژه است
```

### مرحله 2: انتقال به سرور
```bash
# با scp
scp /tmp/behimelobot.tar.gz user@your-server:/home/user/

# یا با rsync
rsync -avz /tmp/behimelobot.tar.gz user@your-server:/home/user/
```

### مرحله 3: استخراج در سرور
```bash
# در سرور خود
cd /home/user
tar -xzf behimelobot.tar.gz
cd behimelobot
```

## روش 2: استفاده از GitHub

### مرحله 1: Push به GitHub (اگر مشکل احراز هویت حل شود)
```bash
git push origin main
```

### مرحله 2: Clone در سرور
```bash
# در سرور خود
git clone https://github.com/amorfi4042-cyber/webap.git behimelobot
cd behimelobot
```

## روش 3: انتقال مستقیم با rsync

```bash
# از محیط فعلی به سرور
rsync -avz --exclude=node_modules --exclude=.git --exclude=dist /workspace/ user@your-server:/opt/behimelobot/
```

## روش 4: استفاده از Docker Hub

### مرحله 1: Build و Push Image
```bash
docker build -t your-username/behimelobot .
docker push your-username/behimelobot
```

### مرحله 2: Pull در سرور
```bash
# در سرور
docker pull your-username/behimelobot
docker run -d -p 5000:5000 --env-file .env your-username/behimelobot
```

## نصب و راه‌اندازی در سرور

### مرحله 1: نصب وابستگی‌ها
```bash
# Node.js و npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Docker (اختیاری)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

### مرحله 2: تنظیم پروژه
```bash
cd behimelobot
cp .env.example .env
# ویرایش .env با اطلاعات خود

npm install
npm run build
```

### مرحله 3: راه‌اندازی
```bash
# حالت توسعه
ONE_API_TOKEN=752295:68ef56c8bd6eb npm run dev

# یا حالت تولید
npm start

# یا با Docker
docker-compose up -d
```

### مرحله 4: تنظیم Nginx (اختیاری)
```bash
sudo cp nginx.conf /etc/nginx/sites-available/behimelobot
sudo ln -s /etc/nginx/sites-available/behimelobot /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## تنظیمات SSL

```bash
# نصب Certbot
sudo apt install certbot python3-certbot-nginx

# دریافت گواهی SSL
sudo certbot --nginx -d yourdomain.com

# تست تجدید خودکار
sudo certbot renew --dry-run
```

## مانیتورینگ و لاگ‌ها

```bash
# مشاهده لاگ‌های Docker
docker-compose logs -f

# مشاهده لاگ‌های Nginx
sudo tail -f /var/log/nginx/access.log

# بررسی وضعیت سرویس
curl http://localhost:5000/api/health
```

## نکات امنیتی

1. **تغییر پورت پیش‌فرض:** در فایل .env پورت را تغییر دهید
2. **فایروال:** پورت‌های غیرضروری را ببندید
3. **بک‌آپ:** از پایگاه داده و فایل‌ها بک‌آپ بگیرید
4. **بروزرسانی:** به‌طور منظم سیستم را بروزرسانی کنید

## عیب‌یابی

### مشکلات رایج:
- **پورت اشغال:** `sudo lsof -i :5000`
- **مشکل دسترسی:** `sudo chown -R $USER:$USER /opt/behimelobot`
- **مشکل Docker:** `sudo systemctl restart docker`

### لاگ‌های مفید:
```bash
# لاگ‌های سیستم
journalctl -u nginx -f
journalctl -u docker -f

# لاگ‌های اپلیکیشن
npm run dev 2>&1 | tee app.log
```