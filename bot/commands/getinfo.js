const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getinfo')
		.setDescription('Search for user data.')
		.addStringOption( option => 
			option
				.setName('nick')
				.setDescription('The user you wanna search information.')
				.setRequired(true)),
	async execute(interaction) {
		try{
		const mc_user = interaction.options.getString('nick');
		const timeleft = "♾️";
		const rate = "admin";
		const api_key = "--R3DZ0NE--7GHA7SHDKGHSK--"
		console.log(`Logging | User: ${interaction.user.id} | Username: ${mc_user}`)
		const embed1 = new EmbedBuilder()
			.setColor(0xFF0000)
			.setTitle(":fire: | Searching data for "+mc_user+". Please wait.")
			.setThumbnail(`https://cravatar.eu/head/${mc_user}/600.png`)
			.setDescription('This may take it\'s time. Take a coffe or something :)!')
			.setAuthor({ name: `Rate: ${rate} | Time left: ${timeleft} | Created by zNotDev#0503`, iconURL: `https://cdn.discordapp.com/icons/1081350300427890698/34edd9f7ab2fb1ade9d5562573e73589.png` })
		await interaction.reply({ embeds: [embed1], ephemeral: true })
		axios.get('http://2.58.56.178:1331/api/search?text='+mc_user).then(async (response) => {
			let error = new EmbedBuilder()
				.setColor(0xFF0000)
				.setTitle("Server found too much data or no data was in our databases.")
				.setAuthor({ name: `Rate: ${rate} | Time left: ${timeleft} | Created by zNotDev#0503`, iconURL: `https://cdn.discordapp.com/icons/1081350300427890698/34edd9f7ab2fb1ade9d5562573e73589.png` })		
			if(response.data["result"] == "Too Much Data" || response.data["result"] == "Invalid Search" || response.data["result"] == "No Data") {
				await interaction.editReply({ embeds: [ error ] })
				return;
			}
			let dataArray = response.data;
			let embeds = []
			try {
				dataArray.map(function(data){
					if (data["passwords"] && data["ips"]) {
						embeds.push(new EmbedBuilder()
							.setColor(0xFF0000)
							.setTitle(":fire: | Data found!")
							.setThumbnail(`https://cravatar.eu/head/${mc_user}/600.png`)
							.setDescription('Thanks for using Redzone!')
							.setAuthor({ name: `Rate: ${rate} | Time left: ${timeleft} | Created by zNotDev#0503`, iconURL: `https://cdn.discordapp.com/icons/1081350300427890698/34edd9f7ab2fb1ade9d5562573e73589.png` })	
							.addFields(
								{ name: "Password", value: data["passwords"] },
								{ name: "IP", value: data["ips"]}
							)
						)
					}
				})
				if (embeds.length < 10) {
					await interaction.editReply({ embeds: embeds })
				} else {
					await interaction.editReply({ embeds: [ error ] })
				}
			} catch(e) {
				console.log(e)
			}
		})
	} catch (e) {
		console.log(e)
	}
	},
};