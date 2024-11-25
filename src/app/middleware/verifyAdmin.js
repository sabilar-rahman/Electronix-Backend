const verifyAdmin = (req, res, next) => {
    if (req.role === "admin") {
        next();
    } else {
        return res.status(403).send({ message: "You Need to be admin to access this route. Access denied" });
    }
};

module.exports = verifyAdmin;