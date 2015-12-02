//Check if user is authenticated
exports.requireAuth = function (req, res, next) {
	//check if user is logged in
	if (!req.isAuthenticated()){
		res.redirect('/login');
	}
	next();
};