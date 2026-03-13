const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'bank',
    data: new SlashCommandBuilder()
        .setName('bank')
        .setDescription('عرض البنك والتحويلات'),
    execute(message, args, db) {
        const embed = new EmbedBuilder()
            .setTitle('البنك')
            .setDescription('رصيدك وتحويلاتك')
            .setColor('Red')
            .setImage(db.get('bank_image') || '');
        message.channel.send({ embeds: [embed] });
    },
    slashExecute(interaction, db) {
        const embed = new EmbedBuilder()
            .setTitle('البنك')
            .setDescription('رصيدك وتحويلاتك')
            .setColor('Red')
            .setImage(db.get('bank_image') || '');
        interaction.reply({ embeds: [embed] });
    }
};
