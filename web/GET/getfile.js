const fs = require('fs')
module.exports = (req,res) => {
  if(!req.query.path)
    res.send({status:1,error:'filepath not specified'})
  if(!fs.existsSync(req.query.path))
    res.send({status:2,error:'file doesnt exist'})
  res.send({status:0,file:fs.readFileSync(req.query.path,'utf-8')})
}
