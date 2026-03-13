const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'admin',
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDescription('نظام الإدارة ونقاط الإدارة'),
    execute(message, args, db) {
        const embed = new EmbedBuilder()
            .setTitle('الإدارة')
            .setDescription('عرض الرتب ونقاط الإدارة')
            .setColor('Red')
            .setImage(db.get('admin_image') || '');
        message.channel.send({ embeds: [embed] });
    },
    slashExecute(interaction, db) {
        const embed = new EmbedBuilder()
            .setTitle('الإدارة')
            .setDescription('عرض الرتب ونقاط الإدارة')
            .setColor('Red')
            .setImage(db.get('admin_image') || '');
        interaction.reply({ embeds: [embed] });
    }
};
