const Replies = require('/home/runner/kerfus-bot/funcs/pastas.js');
let pasta;

exports.run = (msg,client) => {
  if(!pasta)pasta = new Replies("copypastas.json", client, true);
  client.data.channels = {}
  if(!msg.guild)return;
  if(msg.guild.id=="1121125014096318615")return;
  if(msg.content.startsWith("!"))return;
  pasta.reload();
  for (i = 0; i < pasta.len(); i++) {
    if (!pasta.includes(msg.formatted, i)) continue;
    if (!pasta.allowed(i, msg)) continue;
    reply = client.misc.sliceby(pasta.get(i), 2000);
    client.data.channels[msg.channel.id] ??= {};
    client.data.channels[msg.channel.id].lastpasta = i;
    for (const j of reply)
      msg.reply(j)
  }
}