const fs = require('fs')

module.exports = (req,res) => {
  let filepath = "/home/runner/kerfus-bot/papieszaki/"+req.query.file;
  if(fs.existsSync(filepath)){
    res.sendFile(filepath);
  }
  return 'stop';
}
