import { APIError } from "@e-comms/shared/errors";
import { NextFunction, Request, Response } from "express";
import { Role } from "../../types";

export const roleMiddleware = (...roles: Role[]) =>
    (req: Request, res: Response, next: NextFunction) => {
        const hasRole = req.user?.role && roles.includes(req.user?.role);
        if (!hasRole) {
            throw new APIError(401, { message: "Unauthorized!" });
        }
        // Authorization successful
        next();
    };
