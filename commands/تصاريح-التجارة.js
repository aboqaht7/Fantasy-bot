const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'تصاريح-التجارة',
    data: new SlashCommandBuilder()
        .setName('تصاريح-التجارة')
        .setDescription('لوحة إصدار التصاريح التجارية'),

    async slashExecute(interaction, db) {
        const img = await db.getImage('تصاريح-التجارة').catch(() => null);

        const embed = new EmbedBuilder()
            .setTitle('📜 إصدار التصاريح — وزارة التجارة')
            .setColor(0x1565C0)
            .setDescription(
                '**مرحباً بك في نظام التصاريح التجارية**\n\n' +
                '📌 يمكنك من هنا تقديم طلب للحصول على تصريح تجاري، أو الاطلاع على تصاريحك الحالية.\n\n' +
                '> 💡 **التصريح التجاري شرط أساسي لفتح شركة.**'
            )
            .setFooter({ text: 'وزارة التجارة • بوت FANTASY' })
            .setTimestamp();

        if (img) embed.setImage(img);

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('permit_issue_btn')
                .setLabel('📋 إصدار تصريح')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('permit_view_btn')
                .setLabel('🗂️ عرض تصاريحي')
                .setStyle(ButtonStyle.Secondary),
        );

        await interaction.reply({ content: '\u200b', flags: 64 });
        return interaction.channel.send({ embeds: [embed], components: [row] });
    },
};
