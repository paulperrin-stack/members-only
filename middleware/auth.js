exports.ensureLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/log-in");
};

exports.ensureAdmin = (req, res, next) => {
    if (req.user && req.user.is_admin) {
        return next();
    }
    res.redirect("/");
};