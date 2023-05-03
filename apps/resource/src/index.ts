import express, { Express } from "express";
import fs from "fs";
import router from "./router/baseRouter";
import { IMAGE_PATH, AVATAR_PATH } from "./utils/config";
import morgan from "morgan";

const app: Express = express();
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb'}));
app.use(morgan('tiny'));

if (!fs.existsSync(IMAGE_PATH)) {
    fs.mkdirSync(IMAGE_PATH);
}

if (!fs.existsSync(AVATAR_PATH)) {
    fs.mkdirSync(AVATAR_PATH);
}

app.use('/resource/api', router);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on: http://localhost:${port}`);
});