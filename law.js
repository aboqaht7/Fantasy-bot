const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'law',
    data: new SlashCommandBuilder()
        .setName('law')
        .setDescription('نظام المحاماة والقضايا'),
    execute(message, args, db) {
        const embed = new EmbedBuilder()
            .setTitle('نظام المحاماة')
            .setDescription('إدارة القضايا والمحاماة')
            .setColor('Red')
            .setImage(db.get('law_image') || '');
        message.channel.send({ embeds: [embed] });
    },
    slashExecute(interaction, db) {
        const embed = new EmbedBuilder()
            .setTitle('نظام المحاماة')
            .setDescription('إدارة القضايا والمحاماة')
            .setColor('Red')
            .setImage(db.get('law_image') || '');
        interaction.reply({ embeds: [embed] });
    }
};
