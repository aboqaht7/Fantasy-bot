const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'bag',
    data: new SlashCommandBuilder()
        .setName('bag')
        .setDescription('عرض الحقيبة والأغراض'),
    execute(message, args, db) {
        const embed = new EmbedBuilder()
            .setTitle('الحقيبة')
            .setDescription('أغراضك في الحقيبة')
            .setColor('Red')
            .setImage(db.get('bag_image') || '');
        message.channel.send({ embeds: [embed] });
    },
    slashExecute(interaction, db) {
        const embed = new EmbedBuilder()
            .setTitle('الحقيبة')
            .setDescription('أغراضك في الحقيبة')
            .setColor('Red')
            .setImage(db.get('bag_image') || '');
        interaction.reply({ embeds: [embed] });
    }
};
