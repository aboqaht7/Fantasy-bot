const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'set-image',
    data: new SlashCommandBuilder()
        .setName('set-image')
        .setDescription('تعيين صورة لأي نظام')
        .addStringOption(option => option.setName('system').setDescription('اختر النظام').setRequired(true))
        .addStringOption(option => option.setName('url').setDescription('رابط الصورة').setRequired(true)),
    execute(message, args, db) {
        const system = args[0];
        const url = args[1];
        db.set(`${system}_image`, url);
        message.channel.send(`تم تعيين الصورة للنظام: ${system}`);
    },
    slashExecute(interaction, db) {
        const system = interaction.options.getString('system');
        const url = interaction.options.getString('url');
        db.set(`${system}_image`, url);
        interaction.reply(`تم تعيين الصورة للنظام: ${system}`);
    }
};
