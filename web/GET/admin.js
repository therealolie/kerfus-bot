exports.run = (client,res,req,data) => {
  if(!req.user||!req.user.perms['admin-view']){
    data["popup"] = "Error: no access";
    data["popup type"] = "text";
    return;
  }
  data["send"] = 'admin';
}