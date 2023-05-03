import { APIError } from '@e-comms/shared/errors';
import express, { NextFunction, Request, Response } from 'express';
import { AsyncRouter } from 'express-async-router';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { databaseConnection } from './database/databaseSetup';
import { productRoutes } from './products/productRoute';
import { Route } from './types';
import { adminRoutes } from './users/admin/adminRoute';
import { buyerRoutes } from './users/buyer/buyerRoute';
import { authMiddleware } from './users/middleware/auth.middleware';
import { roleMiddleware } from './users/middleware/authorization.middleware';
import { validateSchema } from './users/middleware/validateSchema';
import { sellersRoutes } from './users/seller/sellerRoute';
import envResult from './utils/env';

await databaseConnection();

type HttpMethod = `${Lowercase<Route['method']>}`;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Crimson Crusaders API Documentation',
            version: '1.0.0',
            description:
                'Create, Read, Update and Delete operations on the API',
        },
        servers: [
            {
                url: `http://localhost:${envResult.PORT}`,
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/**/*Controller.ts', './src/**/*Route.ts'],
};

const specs = swaggerJSDoc(options);
const app = express();
app.use(express.json());
const router = AsyncRouter({
    sender: (req: Request, res: Response, value: string) => {
        res.send(value ?? { success: true });
    },
});

const getRoutes = (): Route[] => {
    return [
        ...adminRoutes(),
        ...sellersRoutes(),
        ...buyerRoutes(),
        ...productRoutes(),
    ];
};

const buildAPIRoutes = (getRoutes: () => Route[]) => {
    // * Init router, you can also do this externally
    getRoutes().forEach((route) => {
        // * Get the HTTP method of a route, convert to lower case since 'get'/'post'/'put'/'delete' exist under express.Router()
        const httpMethod = route.method.toLowerCase() as HttpMethod;

        // * If we want middleware to be optional in the route defintion then we need to add this '?? []' check
        // * this check ensures that if route.middleware is undefined middlewareToCall becomes [] instead
        const middlewareToCall = route.middleware ?? [];

        const routeName = route.route;

        if (route.auth) middlewareToCall.push(authMiddleware());

        if (route.role) middlewareToCall.push(roleMiddleware(route.role));

        if (route.body) middlewareToCall.push(validateSchema(route.body));
        // * We call router[httpMethod] which for httpMethod = 'get' is equivalent to router.get
        // * We then destructure the array of middlewareToCall, meaning that the function receives each param one by one so it becomes
        // * ...middlewareToCall -> firstMiddleware, secondMiddleware...
        // * Finally we want our controller to be last so we put it as a last parameter of router[httpMethod]
        router[httpMethod](routeName, ...middlewareToCall, route.controller);
    });

    // * We return populated router
    return router;
};

const ROUTES = buildAPIRoutes(getRoutes);

//to serve the swagger ui copy link http://localhost:${port}/api-docs
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true,
    })
);

app.use(ROUTES);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof APIError) {
        const { errorCode, data } = err;
        res.status(errorCode).send({ message: data });
        return;
    }
    if (err.type === 'entity.parse.failed') {
        res.status(400).send({ message: 'Wrong JSON format' });
        return;
    }
    console.log('Catastrophic error happened!\n', err);
});

app.listen(envResult.PORT, () => {
    console.log(`Server is running on port ${envResult.PORT}`);
});
