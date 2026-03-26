# Fantasy Bot 🤖

بوت Discord متكامل لنظام RP مع جميع الأنظمة (بنك، شركات، تصاريح، محاكم، CIA...)

---

## 🚀 الاستضافة

### الطريقة الأولى — Railway.app (الأسهل، مجاناً) ⭐

#### الخطوة 1 — إنشاء تطبيق البوت في Discord Developer Portal

1. افتح [discord.com/developers/applications](https://discord.com/developers/applications) وسجّل دخول
2. اضغط **New Application** → أدخل اسم البوت → اضغط **Create**
3. من القائمة الجانبية اضغط **Bot** → اضغط **Reset Token** → انسخ التوكن واحفظه (هذا هو `DISCORD_TOKEN`)
4. في نفس صفحة **Bot** → فعّل الخيارات الثلاثة تحت **Privileged Gateway Intents**:
   - ✅ **Presence Intent**
   - ✅ **Server Members Intent**
   - ✅ **Message Content Intent**
5. من القائمة الجانبية اضغط **General Information** → انسخ **Application ID** (هذا هو `CLIENT_ID`)
6. للحصول على `GUILD_ID`: افتح Discord → اضغط على اسم السيرفر بزر الفأرة الأيمن → **Copy Server ID**  
   _(إذا لم تجد الخيار: اذهب إلى Settings → Advanced → فعّل **Developer Mode**)_

#### الخطوة 2 — إضافة البوت إلى السيرفر مع صلاحية السلاش كوماند

1. في Developer Portal → القائمة الجانبية → **OAuth2** → **URL Generator**
2. تحت **Scopes** اختر:
   - ✅ `bot`
   - ✅ `applications.commands`  ← **هذا ضروري لظهور السلاش كوماند!**
3. تحت **Bot Permissions** اختر **Administrator** (أو الصلاحيات التي تحتاجها)
4. انسخ الرابط الناتج أسفل الصفحة وافتحه في المتصفح → اختر السيرفر → **Authorize**

#### الخطوة 3 — النشر على Railway

1. سجّل حساباً على [railway.app](https://railway.app) (يمكن الدخول بـ GitHub مباشرةً)
2. اضغط **New Project** → **Deploy from GitHub repo** → اختر هذا المستودع (`Fantasy-bot`)
3. بعد ما يُنشأ المشروع، اضغط **Add Service** → **Database** → **PostgreSQL**  
   _(تُضاف قاعدة البيانات تلقائياً كـ service منفصلة)_

#### الخطوة 4 — ضبط المتغيرات (Variables)

1. اضغط على **service البوت** (وليس service قاعدة البيانات)
2. اذهب إلى تبويب **Variables** → اضغط **New Variable** وأضف ما يلي:

| المتغير | القيمة |
|---------|--------|
| `DISCORD_TOKEN` | التوكن من الخطوة 1-3 |
| `CLIENT_ID` | الـ Application ID من الخطوة 1-5 |
| `GUILD_ID` | معرّف السيرفر من الخطوة 1-6 |
| `DATABASE_URL` | انظر التعليمات أدناه ↓ |

**كيف تربط `DATABASE_URL` بقاعدة بيانات Railway:**
- اضغط على **service PostgreSQL** → تبويب **Variables**
- انسخ قيمة متغير `DATABASE_URL` الموجود هناك
- ارجع لـ service البوت → Variables → أضف `DATABASE_URL` بنفس القيمة
- **أو (الأسهل):** في Variables للبوت اضغط **Reference Variable** → اختر `DATABASE_URL` من الـ PostgreSQL service

#### الخطوة 5 — تسجيل أوامر السلاش كوماند ⚡

> هذه الخطوة **ضرورية** لظهور الأوامر `/` في الديسكورد!

**الطريقة أ — عبر Railway Shell (موصى بها):**
1. اضغط على service البوت → تبويب **Deploy**
2. بعد اكتمال النشر، اضغط على **Railway Shell** (أيقونة الـ terminal `>_`)
3. اكتب الأمر التالي واضغط Enter:
   ```
   node deploy-commands.js
   ```
4. يجب أن ترى رسالة تبدأ بـ `✅ تم تسجيل ... أمر Slash بنجاح`

**الطريقة ب — تلقائياً عند تشغيل البوت:**  
البوت يُسجّل الأوامر تلقائياً في كل مرة يُشغَّل، ما دامت متغيرات `CLIENT_ID` و`GUILD_ID` مضبوطة بشكل صحيح.

#### الخطوة 6 — التحقق من نجاح التشغيل

1. في Railway → service البوت → تبويب **Logs**
2. يجب أن تجد رسائل مشابهة لـ:
   ```
   ✅ تم تسجيل XX سلاش كوماند تلقائياً
   ✅ البوت يعمل بنجاح — اسم البوت#0000
   ```
3. في Discord → افتح أي خانة نصية → اكتب `/` → يجب أن تظهر قائمة الأوامر

---

#### 🔧 حل المشاكل الشائعة في Railway

| المشكلة | الحل |
|---------|------|
| السلاش كوماند ما تظهر | تأكد من إضافة `applications.commands` عند إضافة البوت للسيرفر (الخطوة 2-2)، ثم شغّل `node deploy-commands.js` |
| `❌ المتغيرات التالية غير مضبوطة` | تحقق أن `CLIENT_ID` و`GUILD_ID` و`DISCORD_TOKEN` مضافة في Variables بدون مسافات زائدة |
| `DATABASE_URL` غير موجود | ربّط المتغير يدوياً من PostgreSQL service كما في الخطوة 4 |
| البوت لا يستجيب للأوامر | في Developer Portal → Bot → تأكد تفعيل الـ Intents الثلاثة |
| البوت يُشغَّل ثم يتوقف | في Logs تحقق من رسائل الخطأ؛ الغالب مشكلة في DATABASE_URL أو DISCORD_TOKEN |

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