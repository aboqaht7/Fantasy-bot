# ─── بناء صورة بوت Fantasy ────────────────────────────────────────────────────
FROM node:20-alpine

# تثبيت الأدوات الأساسية
RUN apk add --no-cache dumb-init

# إنشاء مجلد التطبيق
WORKDIR /app

# نسخ ملفات التبعيات أولاً للاستفادة من Docker cache
COPY package*.json ./

# تثبيت التبعيات (إنتاج فقط)
RUN npm ci --omit=dev

# نسخ باقي الملفات
COPY . .

# المنفذ الذي يستخدمه health check
EXPOSE 3000

# تشغيل البوت مع dumb-init لمعالجة الإشارات بشكل صحيح
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "index.js"]
