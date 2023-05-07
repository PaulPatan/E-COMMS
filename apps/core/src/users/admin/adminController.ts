import { APIError } from '@e-comms/shared/errors';
import { BodyType, IRequest, SellerDTO } from '../../types';
import { createUser } from '../userProvider';
import { Seller } from '../../models/users';

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the admin
 *         email:
 *           type: string
 *           description: The email of the admin
 *       example:
 *         name: John Doe
 *         email: jhon.doe@google.comms
 * tags:
 *   - name: Admin
 *     description: The admin managing API
 *
 * /admin:
 *   get:
 *     summary: Returns the list of all the admins
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: The list of the admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *       example:
 *         name: John Doe
 *         email: john.doe@google.com
 *     responses:
 *       200:
 *         description: The admin was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Some server error
 *       404:
 *         description: Some error happened
 *       403:
 *         description: Unauthorized access
 */

export function getAdmin(req: IRequest) {
    if (req.method !== 'GET') {
        throw new APIError(404, { msg: 'Method not allowed' }); // <APIError> new error type witch extends Error class
    }
    return 'Hello from Admin';
}

export function postAdmin(req: IRequest<BodyType>) {
    const { name, email } = req.body;
    return { admin: { name, email } };
}

export async function createSellerAccount(req: IRequest<SellerDTO>) {
    const userModel: SellerDTO = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        balance: req.body.balance,
        address: req.body.address,
    };

    //call providers to create seller account
    return await createUser(userModel, Seller);
}
