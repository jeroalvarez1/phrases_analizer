"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
const client_1 = require("@prisma/client");
class Errors {
    constructor() { }
    ;
    //PrismaClientKnownRequestError
    prismaClientKnownRequestError(error, res) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(400).send({
                code: error.code,
                message: error.message
            });
        }
    }
    prismaClientUnknownRequestError(error, res) {
        if (error instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
            res.status(400).send({
                message: error.message
            });
        }
    }
}
exports.Errors = Errors;
