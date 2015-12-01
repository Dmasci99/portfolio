//Check if user is authenticated
module.exports = function requireAuth(req, res, next) {
	//check if user is logged in
	if (!req.isAuthenticated()){
		res.redirect('/login');
	}
	next();
};