import { NextFunction, Request, Response } from "express";
import auth from "../utilities/auth";

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    let token: any = req.headers.token || '';
    console.log("Middleware")
    let userInfo = await auth(token, 1);
    if (userInfo && userInfo.role) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

export default isAuthenticated;