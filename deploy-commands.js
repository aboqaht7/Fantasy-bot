const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('fs');

// ── التحقق من المتغيرات المطلوبة قبل البدء ──────────────────────────────────
const missing = ['DISCORD_TOKEN', 'CLIENT_ID', 'GUILD_ID'].filter(k => !process.env[k]);
if (missing.length) {
    console.error(`❌ المتغيرات التالية غير مضبوطة في ملف .env: ${missing.join(', ')}`);
    console.error('   راجع .env.example للتفاصيل.');
    process.exit(1);
}

const commands = [];
let loadErrors = 0;
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    try {
        const command = require(`./commands/${file}`);
        if (command.data) {
            try {
                commands.push(command.data.toJSON());
            } catch (e) {
                console.warn(`⚠️  فشل تحويل بيانات الأمر (${file}): ${e.message}`);
                loadErrors++;
            }
        }
    } catch (e) {
        console.warn(`⚠️  فشل تحميل الأمر (${file}): ${e.message}`);
        loadErrors++;
    }
}

if (commands.length === 0) {
    console.error('❌ لم يُعثر على أي أمر Slash صالح للتسجيل. تحقق من مجلد commands/.');
    process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`⏳ بدأ تسجيل ${commands.length} أمر Slash${loadErrors ? ` (فشل تحميل ${loadErrors})` : ''}...`);
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );
        console.log(`✅ تم تسجيل ${commands.length} أمر Slash بنجاح`);
        if (loadErrors > 0) {
            console.warn(`⚠️  تعذّر تحميل ${loadErrors} ملف — راجع التحذيرات أعلاه لإصلاح الأوامر المفقودة.`);
        }
    } catch (error) {
        console.error('❌ خطأ في تسجيل السلاش كوماند:', error.message || error);
        process.exit(1);
    }
})();
