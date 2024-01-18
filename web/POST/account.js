 module.exports = (req,res) => {
  if(!req.user)
    res.send(false);
  let usr = JSON.parse(req.app.client.webdb.v2getuser("account",req.cookies.username));
  let newpass = require('js-sha512').sha512(req.body.newpass);
  usr.password = newpass;
  req.app.client.webdb.v2setuser("account",req.cookies.username,usr);
  res.send(true);
}
