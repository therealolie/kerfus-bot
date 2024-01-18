// ==================================== SETUP ====================================
let features = {},commands = [],command_handlers = {}
const fs = require('fs'),{Client, REST, Routes} = require("discord.js")
const client = new Client({ intents: 37377, partials: [1, 3] })
const database = require('./funcs/database.js')
client.db = new database(__dirname + '/database/')
client.webdb = new database(__dirname + '/web/database/')
client.data = {}
client.starttime = 0;
const misc = client.misc = require('./funcs/misc.js').setup(client)
require('node:process').on('uncaughtException',e=>console.log(e)) 
const rest = new REST().setToken(process.env['DISCORD_BOT_SECRET'])
function loader(x,y){
	for(let a of fs.readdirSync(`${x}`))
		for(let b of fs.readdirSync(x+`/`+a))
			y(a,b,require(`./${x}/${a}/${b}`))
}
loader('features',(a,b,c)=>{
	a=a.split("_")[0];
	features[a]=features[a]??[];
	features[a].push(c);
})
loader('commands',(a,b,c)=>{
	commands.push(c.data.toJSON())
	command_handlers[b.replace(".js","")]=c
})
// ===================================== WEB =====================================
const expr = require('express')
const app = expr();
app.client = client;
app.use(expr.urlencoded({extended:1}))
	.use(require('cors')({origin:'*'}))
	.use(require('cookie-parser')())
	.use(expr.json())
	.use(require('./web/firefox.js'))
	.use(require('./web/setup.js'))
	.use(require('./web/login.js'))
let files = fs.readdirSync('web/html/').map(e=>e.slice(0,-5));
files.forEach(e=>{
	app.get('/'+e,(req,res)=>{
		res.Send(e)
	})
})
app.all(/.*/,(req,res)=>{
	page = req.url.split('?')[0].split('/')[1]
	if(fs.existsSync(`web/${req.method}/${page}.js`)){
		require(`./web/${req.method}/${page}.js`)(req,res);
		return;
	}
	res.data['popup'] = misc.replace4html(res.data.popup)
	res.Send(res.data.send);
})
	.listen(2999, () => console.log('host working'));
// ===================================== BOT =====================================
client.on('ready', async () => {
	console.log('bot working')
	client.starttime = new Date().toUTCString()
	for(let a in features)
		for(let b of features[a])
			if("setup" in b)
				b.setup(client);
	client.db.v2get('other/servers.txt').trim().split('\n').forEach(e=>
		rest.put(
			Routes.applicationGuildCommands(client.application.id,e),
			{body:commands}
		))
})
	.on("guildCreate", g => misc.log(`added to server id ${g.id}`))
	.on('messageCreate', msg => {
		for(let a in features)
			for(let b of features[a])
				if(b.run(msg,client)=='stop')
					return
	})
	.on('interactionCreate',inter=>{
		if(!inter.isChatInputCommand())return;
		command_handlers[inter.commandName].execute(client,inter)
	})
	.login(process.env['DISCORD_BOT_SECRET'])
// ==================================== TEST  ====================================
