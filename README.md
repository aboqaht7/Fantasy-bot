# Fantasy Bot 🤖

بوت Discord متكامل لنظام RP مع جميع الأنظمة (بنك، شركات، تصاريح، محاكم، CIA...)

---

## 🚀 الاستضافة

### الطريقة الأولى — Railway.app (الأسهل، مجاناً) ⭐

1. **سجّل حساباً** على [railway.app](https://railway.app) (يمكنك الدخول بـ GitHub)
2. اضغط **New Project** ← **Deploy from GitHub repo** ← اختر هذا المستودع
3. اضغط **Add Service** ← **Database** ← **PostgreSQL** (تُضاف قاعدة البيانات تلقائياً)
4. في تبويب **Variables** للبوت، أضف المتغيرات التالية:

| المتغير | القيمة |
|---------|--------|
| `DISCORD_TOKEN` | توكن البوت من [Developer Portal](https://discord.com/developers) |
| `CLIENT_ID` | Application ID من Developer Portal |
| `GUILD_ID` | معرّف سيرفر Discord |
| `DATABASE_URL` | **يُملأ تلقائياً** من قاعدة بيانات Railway |

5. اضغط **Deploy** — البوت يعمل! 🎉

---

### الطريقة الثانية — VPS (Ubuntu/Debian)

```bash
# 1. تثبيت Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 2. تثبيت PM2
npm install -g pm2

# 3. تثبيت PostgreSQL
sudo apt install -y postgresql postgresql-contrib
sudo -u postgres psql -c "CREATE DATABASE fantasybot;"
sudo -u postgres psql -c "CREATE USER botuser WITH PASSWORD 'strong_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE fantasybot TO botuser;"

# 4. استنساخ المشروع
git clone https://github.com/aboqaht7/Fantasy-bot.git
cd Fantasy-bot

# 5. إنشاء ملف المتغيرات
cp .env.example .env
nano .env   # أضف DISCORD_TOKEN و DATABASE_URL و CLIENT_ID و GUILD_ID

# 6. تثبيت التبعيات
npm ci --omit=dev

# 7. تسجيل أوامر Slash
node deploy-commands.js

# 8. تشغيل البوت مع PM2
pm2 start ecosystem.config.js

# 9. تشغيل تلقائي عند إعادة تشغيل الخادم
pm2 startup
pm2 save
```

---

### الطريقة الثالثة — Docker

```bash
# 1. نسخ ملف المتغيرات
cp .env.example .env
nano .env   # أضف البيانات المطلوبة

# 2. تشغيل البوت + قاعدة البيانات دفعة واحدة
docker compose up -d

# 3. تسجيل أوامر Slash
docker compose exec bot node deploy-commands.js

# عرض اللوق
docker compose logs -f bot

# إيقاف
docker compose down
```

---

## ⚙️ المتغيرات المطلوبة

| المتغير | الوصف | مطلوب |
|---------|-------|-------|
| `DISCORD_TOKEN` | توكن البوت من Discord Developer Portal | ✅ |
| `DATABASE_URL` | رابط قاعدة البيانات PostgreSQL | ✅ |
| `CLIENT_ID` | معرّف التطبيق من Developer Portal | ✅ |
| `GUILD_ID` | معرّف سيرفر Discord | ✅ |
| `PREFIX` | بادئة الأوامر النصية (افتراضي: `-`) | ❌ |
| `PORT` | منفذ health check (افتراضي: `3000`) | ❌ |

---

## 📋 أوامر مفيدة

```bash
npm start                # تشغيل مباشر
node deploy-commands.js  # تسجيل أوامر Slash
npm run pm2              # تشغيل عبر PM2
npm run pm2:logs         # عرض اللوق
npm run pm2:stop         # إيقاف PM2
```