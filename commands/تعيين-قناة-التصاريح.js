const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'تعيين-قناة-التصاريح',
    data: new SlashCommandBuilder()
        .setName('تعيين-قناة-التصاريح')
        .setDescription('تحديد قناة قبول/رفض طلبات التصاريح التجارية')
        .addChannelOption(o =>
            o.setName('القناة')
             .setDescription('القناة التي تُرسَل إليها طلبات التصاريح')
             .setRequired(true)
        ),

    async slashExecute(interaction, db) {
        if (!interaction.member.permissions.has('Administrator'))
            return interaction.reply({ content: '❌ للإدارة فقط.', flags: 64 });

        const channel = interaction.options.getChannel('القناة');
        await db.setConfig('permit_approval_channel', channel.id);

        const embed = new EmbedBuilder()
            .setTitle('✅ تم تحديد قناة التصاريح')
            .setColor(0x1565C0)
            .setDescription(`طلبات التصاريح التجارية ستُرسَل إلى ${channel} من الآن.`)
            .setFooter({ text: 'وزارة التجارة • بوت FANTASY' })
            .setTimestamp();

        return interaction.reply({ embeds: [embed] });
    },
};
