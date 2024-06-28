const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            process.env.DATABASE_URL
        );
        console.log(
            `database connected to host ${connectionInstance.connection.host}`
        );
        mongoose.connection.on("connected", () => {
            console.log("Database connected");
        });
        mongoose.connection.on("error", (err) => {
            console.log("Error occur :", err);
            process.exit(1);
        });
    } catch (error) {
        console.error("MONGODB connection FAILED", error);
        process.exit(1);
    }
};
module.exports = dbConnection;
