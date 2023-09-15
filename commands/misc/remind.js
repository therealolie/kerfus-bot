const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remind')
		.setDescription('Reminds you!')
    .addStringOption(option =>
		  option.setName('time')
			.setDescription('time, either XhYmZs or X:Y:Z, unused can be skipped')
      .setRequired(true))
    .addStringOption(option =>
		  option.setName('text')
			.setDescription('text for the reminder')
      .setMaxLength(1000)
      .setRequired(false)),
	execute(client, interaction) {
	  interaction.reply({ content: 'will remind you (probably)', ephemeral: true }).catch(e=>{})
    let message = interaction.options.getString('text') ?? "Reminded!";
    let user = interaction.member;
    let timestring = interaction.options.getString('time');
    let time = 0n;
    let temp;
    if(!/[hms]/.test(timestring)){  
      temp = timestring.split(':').slice(-3)
      let len =temp.length
      if(len==3)time+=BigInt(temp[0])+BigInt(temp[1])+BigInt(temp[2]);
      else if(len==2)time+=BigInt(temp[0])+BigInt(temp[1]);
      else if(len==1)time += BigInt(temp[0]);
    }
    else{
      if(timestring.includes('h'))
        time+=BigInt(timestring.split('h')[0].split(/[sm]/).slice(-1));
      if(timestring.includes('m'))
        time+=BigInt(timestring.split('m')[0].split(/[sh]/).slice(-1));
      if(timestring.includes('s'))
        time+=BigInt(timestring.split('s')[0].split(/[mh]/).slice(-1));
    }
    client.misc.remind(time,user,message)
  }
};