import express, { Express } from 'express';
import morgan from 'morgan';
import router from './router/baseRouter';
import { AVATAR_PATH, IMAGE_PATH } from './utils/config';
import './utils/logger';
import { createPath } from './utils/fileOperations';

const app: Express = express();
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(morgan('tiny'));

createPath(IMAGE_PATH);
createPath(AVATAR_PATH);

app.use('/resource/api', router);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on: http://localhost:${port}`);
});
