import { Route } from '../../types';
import * as sellerController from './sellerController';

/**
 * @swagger
 *   components:
 *     schemas:
 *      Seller:
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
 *           description: The first name of the seller
 *         lastName:
 *           type: string
 *           description: The last name of the seller
 *         email:
 *           type: string
 *           description: The email of the seller
 *         password:
 *           type: string
 *           description: The password of the seller
 *         address:
 *           type: object
 *           properties:
 *             postCode:
 *               type: number
 *               description: The post code of the seller
 *             street:
 *               type: string
 *               description: The street of the seller
 *             city:
 *               type: string
 *               description: The city of the seller
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: jhon.doe@gmail.com
 *         password: Password8
 *         address:
 *           postCode: 1234
 *           street: Example street
 *           city: Example city
 * tags:
 *   - name: Seller
 *     description: Seller routes
 */

/**
 * @swagger
 * /sellers:
 *   get:
 *     summary: Returns all sellers
 *     tags: [Seller]
 *     responses:
 *       200:
 *         description: The list of the sellers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Seller'
 */

const getSellers: Route = {
    route: '/sellers',
    method: 'GET',
    role: 'seller',
    auth: true,
    middleware: [],
    controller: sellerController.getSellers,
};

/**
 * @swagger
 * /seller/{id}:
 *   get:
 *     summary: Get the seller by id
 *     tags: [Seller]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Seller id
 *     responses:
 *       200:
 *         description: The seller description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seller'
 *       404:
 *         description: The seller was not found
 *       500:
 *         description: Some error happened
 */

const getSeller: Route = {
    route: '/seller/:id',
    method: 'GET',
    role: 'seller',
    auth: true,
    middleware: [],
    controller: sellerController.getSelleryById,
};

/**
 * @swagger
 * /seller/{id}:
 *   delete:
 *     summary: Remove the seller by id
 *     tags: [Seller]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Seller id
 *     responses:
 *       200:
 *        description: The seller was deleted
 *       404:
 *         description: The seller was not found
 *       500:
 *         description: Some error happened
 *   put:
 *     summary: Update the seller by the id
 *     tags: [Seller]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Seller id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Seller'
 *     responses:
 *       200:
 *         description: The seller was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seller'
 *       404:
 *         description: The seller was not found
 *       500:
 *         description: Some error happened
 */

const deleteSeller: Route = {
    route: '/seller/:id',
    method: 'DELETE',
    role: 'seller',
    auth: true,
    middleware: [],
    controller: sellerController.deleteSellerById,
};

const postSeller: Route = {
    route: '/seller',
    method: 'POST',
    role: 'seller',
    auth: true,
    middleware: [],
    controller: sellerController.deleteSellerById,
};

const putSellerById: Route = {
    route: '/seller/:id',
    method: 'PUT',
    role: 'seller',
    auth: true,
    middleware: [],
    controller: sellerController.putSellerById,
};

/**
 * @swagger
 * /seller/{clientId}/invoice:
 *   post:
 *     summary: Send invoice email to the client
 *     tags: [Seller]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Client id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               invoiceId:
 *                 type: string
 *                 description: The invoice id
 *             example:
 *               invoiceId: 1234
 *     responses:
 *       200:
 *         description: The invoice was sent
 *       404:
 *         description: The client was not found
 *       500:
 *         description: Some error happened
 */

const sendInvoiceEmail: Route = {
    route: '/seller/:clientId/invoice',
    method: 'POST',
    // role: 'seller',
    // auth: true,
    middleware: [],
    controller: sellerController.sendInvoiceEmail,
};

export const sellersRoutes = () => {
    return [
        getSeller,
        postSeller,
        getSellers,
        deleteSeller,
        putSellerById,
        sendInvoiceEmail,
    ];
};
