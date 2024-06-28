const app = require("./app");
const dbConnection = require("./config/db");
require("dotenv").config();

dbConnection()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`App is running ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGODB connection failed", err.message);
    });
