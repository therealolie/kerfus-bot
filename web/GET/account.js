module.exports= (req,res) => {
	if(!req.user){
		res.data.popup = "Error: not logged in";
		res.data["popup type"] = "text";
	}
	res.Send('account');
}
