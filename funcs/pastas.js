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
		this.data.forEach(e=>{
			if(!isArray(e[0]))
				return;
			e[0]={tags:e[0]};
			changes=true;
		})
		if(changes)
			this.save();
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
		if(this.ispasta&&
			[msg.guild?.id,msg.channel.id].some(e=>this.client.misc.hastag('nopastas',e)||this.client.misc.hastag(`no-pasta-${sha(this.data[x][1])}`,e))
		)
			return false;
		let extra = this.data[x][0];
		if(extra.tags.some(e=>this.client.misc.hastag('no'+a,msg.server.id)))
			return false;
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
		this.data
			.filter((e,i)=>this.includes(msg,i))
			.forEach((e,i)=>out.push(i))
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
