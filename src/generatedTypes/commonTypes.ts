import { Request, Response } from 'express'

export interface ExpressType {
    req: Request,
    res: Response
}
