const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
//[https://discord.com/oauth2/authorize?client_id=1045707091660243024&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1045703355768508526](Click para verificar)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Sends the verify message.'),
    async execute(interaction) {
        const button1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Click me!')
                    .setURL('https://discord.com/oauth2/authorize?client_id=1081889893946499146&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1081350300427890698')
                    .setStyle(ButtonStyle.Link)
            );
        const embed = new EmbedBuilder()
            .setTitle("Welcome to Redzone!")
            .setDescription("How's your day going? I hope it is great. Click the button in order to verify using our bot.")
        await interaction.reply({ embeds: [embed], components: [button1] })
    }
}