const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

async function buildCarsMessage(db) {
    const imageUrl = await db.getConfig('cars_image');
    const embed = new EmbedBuilder()
        .setTitle('معرض السيارات')
        .setDescription('كل السيارات المتاحة للبيع والمزاد')
        .setColor('Red');
    if (imageUrl) embed.setImage(imageUrl);

    const menu = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('cars_menu')
            .setPlaceholder('اختر السيارة')
            .addOptions([
                { label: 'تويوتا', value: 'toyota' },
                { label: 'مرسيدس', value: 'mercedes' },
                { label: 'بي إم دبليو', value: 'bmw' },
                { label: 'لكزس', value: 'lexus' },
                { label: 'مزاد السيارات', value: 'auction' }
            ])
    );

    return { embeds: [embed], components: [menu] };
}

module.exports = {
    name: 'cars',
    data: new SlashCommandBuilder()
        .setName('cars')
        .setDescription('عرض معرض السيارات'),
    async execute(message, args, db) {
        const payload = await buildCarsMessage(db);
        message.channel.send(payload);
    },
    async slashExecute(interaction, db) {
        const payload = await buildCarsMessage(db);
        interaction.reply(payload);
    }
};
