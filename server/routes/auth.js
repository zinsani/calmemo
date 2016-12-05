function auth(req, res, next) {
    console.log("auth check!");
    // todo:
    // validate header 
    // get user data from db
    // req.user = user;
    next();
}

module.exports = auth;