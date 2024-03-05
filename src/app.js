import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import router from "./routes/user.routes.js";

app.use(
  cors({
    origin: "http://localhost:4173",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
// This is used when we have to store some files on our server public is name of that folder
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// This is used when data is coming from url as query ,extended is set true because some time there may be nested objects
app.use(cookieParser());
app.use("/user", router);

export default app;
