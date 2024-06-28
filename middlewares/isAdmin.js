const isAdmin = (req, res, next) => {
    if (req.user.isAdmin == true) {
        return next();
    } else {
        res.send("you have no permission");
    }
};
exports.isAdmin = isAdmin;
