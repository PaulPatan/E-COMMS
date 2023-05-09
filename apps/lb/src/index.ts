import express, { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { RandomRoundRobin } from 'round-robin-js';
import Env from './utils/env';

const app = express();

const balancer = new RandomRoundRobin<string>(Env.SERVERS);
app.use('/', (req: Request, res: Response, next: NextFunction) => {
    const proxy = createProxyMiddleware({
        target: balancer.next().value,
        changeOrigin: true,
    });
    proxy(req, res, next);
});

app.listen(Env.PORT, () => {
    console.log(`Server is listening on http://localhost:${Env.PORT}`);
});
