const errorHandler = (err, req, res, next) => {
    if (err) {
        console.log(err.stack);
        res.status(400).json({ message: err.message });
    }
};
module.exports = errorHandler;
