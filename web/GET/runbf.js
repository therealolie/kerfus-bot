module.exports = (req,res) => {
	console.log(req.query)
	req.app.client.misc.log(JSON.stringify(req.query))
	let output = require('../../funcs/brainf.js').wholesim(req.query.sett.split(''),req.query.runtime,[req.query.input],req.query.code)
	res.data["popup"] =[["output"],[output==""?"no output":output]];
	res.data["popup type"] = "table";
	res.data['send'] = 'brainf';
	res.Send('brainf');
}
