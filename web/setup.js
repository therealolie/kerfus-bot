const fs = require('fs');
module.exports = (req,res,next) => {
	res.data = {
      "starttime":req.app.client.starttime,
      "popup":"",
      "popup type":"none",
      "send":"404"
    }
	res.Send = name => {
    	res.send(req.app.client.misc.addhtmls(res.data,fs.readFileSync(`web/html/${name}.html`)))
	}
	next();
}
