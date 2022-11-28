import { Prisma } from "@prisma/client";

export class Errors{
    constructor() {};

    //PrismaClientKnownRequestError
    public prismaClientKnownRequestError(error: any, res: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).send({
                code: error.code,
                message: error.message
            });   
        }
    }

    public prismaClientUnknownRequestError(error: any, res: any) {
        if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            res.status(400).send({
                message: error.message
            })
        }
    }
}