const multer = require("multer");
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    },
    filename: async (req, file, cb) => {
        let random = await crypto.randomBytes(12);
        let uniqueName = random.toString("hex") + "-" + file.originalname;
        cb(null, uniqueName);
    },
});
module.exports = multer({ storage });
