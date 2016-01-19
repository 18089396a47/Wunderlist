module.exports = function(req) {
	if (req.cookies.user) {
		return true;
	} else {
		return false;
	}
};