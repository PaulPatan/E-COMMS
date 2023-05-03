import * as buyerController from './buyerController';
import { Route } from '../../types';
import { signUp } from '../middleware/signUp.middleware';
import { login } from '../middleware/login.middleware';
import { loginBody, registerBody } from './buyerSchema';

const getBuyer: Route = {
    route: '/buyer',
    method: 'GET',
    role: 'buyer',
    auth: true,
    middleware: [],
    controller: buyerController.getBuyer
}

const postBuyer: Route = {
    route: '/buyer',
    method: 'POST',
    role: 'buyer',
    auth: true,
    middleware: [],
    controller: buyerController.postBuyer
}

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - address
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the buyer
 *         lastName:
 *           type: string
 *           description: The last name of the buyer
 *         email:
 *           type: string
 *           description: The email of the buyer
 *         password:
 *           type: string
 *           description: The password of the buyer
 *         address:
 *           type: object
 *           properties:
 *             postCode:
 *               type: number
 *               description: The post code of the buyer
 *             street:
 *               type: string
 *               description: The street of the buyer
 *             city:
 *               type: string
 *               description: The city of the buyer
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@yahoo.com
 *         password: Password8
 *         address:
 *           postCode: 1234
 *           street: Example street
 *           city: Example city
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the buyer
 *         password:
 *           type: string
 *           description: The password of the buyer
 *       example:
 *         email: john.doe@yahoo.com
 *         password: Password8
 * tags:
 *   - name: Register
 *     description: The buyer registration API
 *   - name: Login
 *     description: The buyer login API
 *
 * /register:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Register a new buyer
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *       example:
 *         name: John Doe
 *         email: jhon.doe@yahoo.com
 *         password: Password8
 *     responses:
 *       200:
 *         description: The buyer was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       500:
 *         description: Some server error
 *       404:
 *         description: Some error happened
 *       400:
 *         description: Bad request
 *
 */



const registerBuyer: Route = {
    route: '/register',
    method: 'POST',
    // role: 'buyer',
    auth: false,
    body: registerBody,
    middleware: [signUp()],
    controller: buyerController.loginBuyer
}

/**
 * @swagger
 * /login:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Login a buyer
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *       example:
 *         email: jhon.doe@yahoo.com
 *         password: Password8
 *     responses:
 *       200:
 *         description: The buyer was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       500:
 *         description: Some server error
 *       404:
 *         description: Some error happened
 *
 */




const loginBuyer: Route = {
    route: '/login',
    method: 'POST',
    // role: 'buyer',
    auth: false,
    body: loginBody,
    middleware: [login()],
    controller: buyerController.loginBuyer
}

export const buyerRoutes = () => {
    return [getBuyer, postBuyer, registerBuyer, loginBuyer]
}