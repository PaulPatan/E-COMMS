import { Route } from '../../types';
import { login } from '../middleware/login.middleware';
import { signUp } from '../middleware/signUp.middleware';
import * as buyerController from './buyerController';
import { loginBody, registerBody } from './buyerSchema';

/**
 * @swagger
 *   components:
 *     schemas:
 *      Register:
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
 *      Login:
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
 *      Buyer:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
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
 *         email: jhon@gmail.com
 *         address:
 *           postCode: 1234
 *           street: Example street
 *           city: Example city

 * tags:
 *   - name: Register
 *     description: The buyer registration API
 *   - name: Login
 *     description: The buyer login API
 *   - name: Buyer
 *     description: The buyer API
 */

/**
 * @swagger
 * /buyers:
 *   get:
 *     summary: Returns the list of all the buyers
 *     tags: [Buyer]
 *     responses:
 *       200:
 *         description: The list of the buyers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Buyer'
 *       404:
 *         description: No buyers found
 *       500:
 *         description: Some server error
 */
const getBuyers: Route = {
    route: '/buyers',
    method: 'GET',
    middleware: [],
    controller: buyerController.getBuyers,
};

/**
 * @swagger
 * /buyers/{id}:
 *   get:
 *     summary: Returns the buyer by id
 *     tags: [Buyer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Buyer id
 *     responses:
 *       200:
 *         description: The buyer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Buyer'
 *       404:
 *         description: No buyer found
 *       500:
 *         description: Some server error
 */

const getBuyerById: Route = {
    route: '/buyers/:id',
    method: 'GET',
    middleware: [],
    controller: buyerController.getBuyerById,
};

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
    controller: buyerController.loginBuyer,
};

/**
 * @swagger
 * /buyer/{id}:
 *   delete:
 *     summary: Delete the buyer by id
 *     tags: [Buyer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Buyer id
 *     responses:
 *       200:
 *         description: The buyer was deleted
 *       404:
 *         description: The buyer was not found
 *       500:
 *         description: Some server error
 */

const deleteBuyerRoute: Route = {
    route: '/buyers/:id',
    method: 'DELETE',
    auth: false,
    middleware: [],
    controller: buyerController.deleteBuyerById,
};

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
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
    controller: buyerController.loginBuyer,
};

/**
 * @swagger
 * /buyer/{id}:
 *   put:
 *     summary: Update the buyer by id
 *     tags: [Buyer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Buyer id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Buyer'
 *       example:
 *         firstName: John
 *         lastName: Doe
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
 *     responses:
 *       200:
 *         description: The buyer was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Buyer'
 *       404:
 *         description: The buyer was not found
 *       500:
 *         description: Some server error
 */

const putBuyerById: Route = {
    route: '/buyers/:id',
    method: 'PUT',
    auth: false,
    middleware: [],
    controller: buyerController.putBuyerById,
};

export const buyerRoutes = () => {
    return [
        getBuyers,
        getBuyerById,
        deleteBuyerRoute,
        registerBuyer,
        loginBuyer,
        putBuyerById,
    ];
};
