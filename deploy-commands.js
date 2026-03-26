const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

function getSlashCommands() {
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    return commandFiles
        .map(file => {
            const command = require(path.join(commandsPath, file));
            return command.data ? command.data.toJSON() : null;
        })
        .filter(Boolean);
}

async function deployCommands({
    token = process.env.DISCORD_TOKEN,
    clientId = process.env.CLIENT_ID,
    guildId = process.env.GUILD_ID,
    log = console
} = {}) {
    if (!token || !clientId || !guildId) {
        log.warn('⚠️ تعذر تسجيل أوامر Slash: تأكد من ضبط DISCORD_TOKEN و CLIENT_ID و GUILD_ID في متغيرات البيئة.');
        return false;
    }

    const commands = getSlashCommands();
    const rest = new REST({ version: '10' }).setToken(token);

    log.log(`⏳ بدأ تسجيل ${commands.length} من أوامر Slash...`);
    await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
    );
    log.log(`✅ تم تسجيل جميع أوامر Slash بنجاح`);
    return true;
}

if (require.main === module) {
    deployCommands().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}

module.exports = { deployCommands, getSlashCommands };
