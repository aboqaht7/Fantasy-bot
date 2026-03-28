const {
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
} = require('discord.js');

module.exports = {
    name: 'citizen-file-cia',
    data: new SlashCommandBuilder()
        .setName('citizen-file-cia')
        .setDescription('لوحة CIA — ملفات المواطنين والتراكينق (CIA Chef فقط)'),
    async slashExecute(interaction, db) {
        const embed = new EmbedBuilder()
            .setTitle('🕵️ CIA — لوحة الملفات والتراكينق')
            .setColor(0x0D1B2A)
            .setDescription(
                '**📂 ملفات المواطنين** — عرض الملفات الكاملة لجميع المواطنين\n' +
                '**📡 تراكينق** — تتبع شخص لمدة 20 ثانية\n\n' +
                '> هذه الأزرار مخصصة لـ **CIA Chef** فقط'
            )
            .setFooter({ text: 'CIA • بوت FANTASY' })
            .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('cia_citizen_files_btn')
                .setLabel('📂 ملفات المواطنين')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('tracking_btn')
                .setLabel('📡 تراكينق')
                .setStyle(ButtonStyle.Danger)
        );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
};
