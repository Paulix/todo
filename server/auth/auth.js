const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // get token
    let token = req.headers.authorization;
    // if (
    //     req.headers.authorization &&
    //     req.headers.authorization.startsWith("Bearer")
    // ) {
    //     token = req.headers.authorization.split("Bearer ")[1];
    // } else {
    //     console.error("No token foun");
    //     return res.status(403).json({
    //         general: "Unauthorized",
    //     });
    // }

    if (!token) {
        // if there is no token deny access
        console.error("No token found");
        return res.status(403).json({
            general: "Unauthorized",
        });
    } else {
        // split token
        token = req.headers.authorization.split("Bearer ")[1];

        // if there is a token verify token
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) {
                return res.status(400).json({
                    general: "Invalid token",
                });
            } else {
                req.user = decoded;
                return next();
            }
        });
    }
};
