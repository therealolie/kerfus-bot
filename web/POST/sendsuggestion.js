var CryptoJS = require("crypto-js");

module.exports = (req,res) => {
	let suggestions = JSON.parse(req.app.client.db.get('suggestions',[]));
	// Encrypt
	let sug = req.body.sugg.toLowerCase();
	var ciphertext = CryptoJS.AES.encrypt(sug, process.env['ENCRYPTION']).toString();

	let added = suggestions.includes(ciphertext);
	if(!added){
		suggestions.push(ciphertext);
		req.app.client.db.set('suggestions',JSON.stringify(suggestions));
	}
	res.data.popup = added?"suggestion was already posted":"suggestion added!";
	res.data["popup type"] = "text";
	res.Send('suggest');
}
