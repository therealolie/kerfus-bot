//https://openai.com/dall-e-2
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('art-gen')
		.setDescription('Generates artwork using the latest AI tech')
		.addStringOption(option =>
			option.setName('prompt')
			.setDescription('whats the art about')
			.setRequired(true))
		.addBooleanOption(option =>
			option.setName('nsfw')
			.setDescription('Should the art be *spicy*?')),
	async execute(client, interaction) {
		await interaction.deferReply();
		interaction.editReply("https://openai.com/dall-e-2");
	}
};
