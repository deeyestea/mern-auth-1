import Express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./routes/api/users.js";
import * as dotenv from 'dotenv';
import passportConfig from './config/passport.js';
import passport from "passport";
dotenv.config();

const app = Express();
const URI = process.env.mongoURI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(URI)
    .then(() => console.log("Mongo DB connected"))
    .catch((err) => console.log(err));

app.use(passport.initialize());
passportConfig(passport);

app.use("/api/users", router);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port}`));