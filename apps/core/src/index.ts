import express, { Request, Response, NextFunction } from 'express';
import { adminRoutes } from './users/admin/adminRoute';
import { sellersRoutes } from './users/seller/sellerRoute';
import { buyerRoutes } from './users/buyer/buyerRoute';
import { MiddlewareFunction } from './types';
import { AsyncRouter } from 'express-async-router';
import { APIError } from '@e-comms/shared/errors';


type Route = {
    route: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    middleware: MiddlewareFunction[];
    controller: (req: Request, res: Response) => void;
}

type HttpMethod = `${Lowercase<Route['method']>}`;


const app = express();
app.use(express.json());
const router = AsyncRouter({
    sender: (req: Request, res: Response, value: string) => {
        res.send(value ?? { success: true });
    }
});



const getRoutes = (): Route[] => {
    return [
        ...adminRoutes(),
        ...sellersRoutes(),
        ...buyerRoutes()
    ]
}


const buildAPIRoutes = (getRoutes: () => Route[]) => {
    // * Init router, you can also do this externally
    getRoutes().forEach(route => {
        // * Get the HTTP method of a route, convert to lower case since 'get'/'post'/'put'/'delete' exist under express.Router()
        const httpMethod = route.method.toLowerCase() as HttpMethod;

        // * If we want middleware to be optional in the route defintion then we need to add this '?? []' check
        // * this check ensures that if route.middleware is undefined middlewareToCall becomes [] instead
        const middlewareToCall = route.middleware ?? [];

        // const auth = auth ?  auth : '';

        const routeName = route.route

        // * We call router[httpMethod] which for httpMethod = 'get' is equivalent to router.get
        // * We then destructure the array of middlewareToCall, meaning that the function receives each param one by one so it becomes
        // * ...middlewareToCall -> firstMiddleware, secondMiddleware...
        // * Finally we want our controller to be last so we put it as a last parameter of router[httpMethod]
        router[httpMethod](routeName, ...middlewareToCall, route.controller);
    })

    // * We return populated router
    return router;
}

const ROUTES = buildAPIRoutes(getRoutes);

app.use(ROUTES);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof APIError) {
        const { errorCode, data } = err;
        res.status(errorCode).send({ message: data });
        return;
    }
    console.log('Catastrophic error happened!', err);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});