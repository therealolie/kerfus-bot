const fs = require('fs');
const sha = require('js-sha512').sha512_256;
class replies {
  filename;
  data;
  client;
  
  reload(){
    this.data = JSON.parse(fs.readFileSync("data/" + this.filename, 'utf-8'));
    function isArray(a){
      return Object.prototype.toString.apply(a) === '[object Array]';
    }
    let changes=false;
    for(let i=0;i<this.data.length;i++){
      let e = this.data[i];
      if(isArray(e[0])){
        e[0]={tags:e[0]};
        changes=true;
      }
    }
    if(changes)this.save();
  }
  
  constructor(name, client, ispasta=false){
    this.ispasta = ispasta;
    this.filename = name;
    this.client = client;
    this.reload();
  }

  save() {
    fs.writeFileSync("data/"+ this.filename, JSON.stringify(this.data,null,2))
  }

  includes(msg, x) {
    let out = false;
    this.data[x].slice(2).forEach(e=>out|=msg.includes(e))
    return out;
  }

  allowed(x, msg) {
    if(this.ispasta&&(this.client.misc.hastag('nopastas',msg.guild?.id)||this.client.misc.hastag('nopastas',msg.channel.id)))return false;
    if(this.ispasta&&this.client.misc.hastag(`no-pasta-${sha(this.data[x][1])}`,msg.channel.id))return false;
    let extra = this.data[x][0];
    for(let a of extra.tags)
      if(this.client.misc.hastag('no'+a,servid))return false;
    let allowed=true;
    if(extra.eval)
    eval(extra.eval.allowed ?? "");
    return allowed;
  }

  len() {
    return this.data.length
  }

  get(id) {
    return this.data[id][1];
  }

  add(msg, reactions) {
    this.data.push([[], msg].concat(reactions));
    this.save();
  }

  findid(msg) {
    let out = [];
    this.data.forEach((e,i)=>{if(this.includes(msg,i))out.push(i)})
    return out;
  }

  addreact(id, react) {
    this.data[id].push(react);
    this.save();
  }

  getreact(id) {
    return this.data[id].slice(2);
  }

  setmsg(id, msg) {
    this.data[id][1] = msg;
    this.save();
  }

  delet(id) {
    this.data.splice(id, 1);
    this.save();
  }
}

module.exports = replies;