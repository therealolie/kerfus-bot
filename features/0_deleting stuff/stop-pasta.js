let sha = require('js-sha512').sha512_256
let pastas
exports.run = (msg) => {
  if(!pastas)pastas = new (require('../../funcs/pastas.js'))("copypastas.json", msg.client, true);
  if(!msg.content.startsWith('!stop-pasta')) return;
  if(!msg.client.misc.hastag('admin',msg.author.id)&&!(msg.member.permissionsIn(msg.channel).Flags&8)){
    msg.reply('no permissions!')
    return;
  }
  if(!msg.client.data?.channels?.[msg.channel.id]?.lastpasta){
    msg.reply('no copypastas sent in this channel, perhaps the bot restarted (or just my spagetthi code not working)')
    return;
  }
  let pasta_id = msg.client.data.channels[msg.channel.id].lastpasta;
  let pasta = pastas.get(pasta_id);
  msg.client.misc.addtag(`no-pasta-${sha(pasta)}`,msg.channel.id)
}