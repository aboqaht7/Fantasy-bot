// ─── PM2 — مدير العمليات للـ VPS ─────────────────────────────────────────────
// تثبيت PM2 مرة واحدة:  npm install -g pm2
// تشغيل البوت:          pm2 start ecosystem.config.js
// إيقاف البوت:          pm2 stop fantasy-bot
// عرض اللوق:            pm2 logs fantasy-bot
// تشغيل عند إعادة تشغيل الخادم: pm2 startup && pm2 save

module.exports = {
    apps: [
        {
            name: 'fantasy-bot',
            script: 'index.js',
            interpreter: 'node',
            instances: 1,

            // إعادة التشغيل عند الوقوع في أخطاء
            autorestart: true,
            watch: false,
            max_memory_restart: '512M',

            // إعادة المحاولة بشكل متأخر لتجنب حلقات لا نهائية
            restart_delay: 5000,
            max_restarts: 10,

            // متغيرات بيئة الإنتاج (يُفضَّل استخدام ملف .env)
            env: {
                NODE_ENV: 'production',
            },

            // اللوق
            out_file: 'logs/out.log',
            error_file: 'logs/error.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            merge_logs: true,
        },
    ],
};
