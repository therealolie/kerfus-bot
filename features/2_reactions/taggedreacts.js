exports.run = async (msg,client) =>{
  if(client.misc.hastag('noreactions',msg.guild?.id)||client.misc.hastag('noreactions',msg.channel.id))return;
  if (msg.author.bot) msg.react('🐱').catch(err=>{});
  else if (Math.random() < 0.05) msg.react('🐱').catch(err=>{});

  for(let x of [
    ['woman','☕'],
    ['delikot','🐱'],
    ['littlehawk','🦅'],
    ['🐢','🐢','1129926033768988724'],
    ['weirdcat','1129116659194531930'],
    ['wiktoria','✨'],
    ['fart','🇫','🇦','🇷','🇹'],
    ['hoob','1118877999475986433'],
    ['moyai','🗿']
  ])
    if(client.misc.hastag(x[0],msg.author.id))
      for(let y of x.slice(1))
      msg.react(y).catch(err=>{})
}