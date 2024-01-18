module.exports = (req,res) => {
	if(!req.user||!req.user.perms['admin-view']){
		res.data["popup"] = "Error: no access";
		res.data["popup type"] = "text";
	}
	res.Send('admin');
}
