const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'crime',
    data: new SlashCommandBuilder()
        .setName('crime')
        .setDescription('نظام الجرائم: سرقات وخطف'),
    execute(message, args, db) {
        const embed = new EmbedBuilder()
            .setTitle('الجرائم')
            .setDescription('عرض الجرائم، سرقات وخطف')
            .setColor('Red')
            .setImage(db.get('crime_image') || '');
        message.channel.send({ embeds: [embed] });
    },
    slashExecute(interaction, db) {
        const embed = new EmbedBuilder()
            .setTitle('الجرائم')
            .setDescription('عرض الجرائم، سرقات وخطف')
            .setColor('Red')
            .setImage(db.get('crime_image') || '');
        interaction.reply({ embeds: [embed] });
    }
};
