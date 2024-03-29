let permlist = [["admin"],['admin-view']];
let client;

function getpermissions(username){
	let usr = client.webdb.v2getuser("account",username);
	if(!usr)return {};
	usr = JSON.parse(usr)
	let perms = usr.tags;
	if(perms.alts!== undefined){
		let alts = JSON.parse(perms.alts);
		delete perms.alts;
		for(let a of alts){
			let origperms = getpermissions(a);
			for(let b in origperms)
				perms[b] = origperms[b]||perms[b];
		}
	}
	let level = -1;
	for(let i in permlist){
		let a = false;
		for(let j of permlist[i])if(usr.tags[j])a=true;
		if(a){
			level = i;
			break;
		}
	}
	if(level!=-1)
		for(let i of permlist.slice(level+1))
			for(let j of i)
				usr.tags[j] = true;
	return JSON.parse(JSON.stringify(perms));
}


module.exports = function login(req,res,next){
	client = req.app.client;
	if(!req.cookies.password||!req.cookies.username) return next();
	let newpass = require('js-sha512').sha512(req.cookies.password);
	let usr = client.webdb.v2getuser("account",req.cookies.username)
	if(!usr) return next();
	usr=JSON.parse(usr);
	if(newpass != usr.password) return next();
	req.user = usr;
	req.user.perms = getpermissions(req.cookies.username);
	//console.log(req.user);
	next();
}
