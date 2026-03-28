const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const commandPath = path.join(commandsPath, file);
    try {
        const command = require(commandPath);
        if (command?.data && typeof command.data.toJSON === 'function') {
            commands.push(command.data.toJSON());
        }
    } catch (error) {
        console.error(`[DEPLOY LOAD ERROR] ${file}:`, error?.message || error);
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`⏳ بدأ تسجيل أوامر Slash...`);
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );
        console.log(`✅ تم تسجيل جميع أوامر Slash بنجاح`);
    } catch (error) {
        console.error(error);
    }
})();
