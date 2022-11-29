import { Request, Response } from "express";
import { connect } from "../database";
import { Err } from "../interfaces/err.interface";
import { PhraseFeeling } from "../interfaces/phraseFeeling.iterface";
import { PhraseFeelingService } from "../services/PhraseFeelingService";
import { Prisma, PrismaClient } from '@prisma/client'
import { Errors } from "../accessories/errors";
import { ResEmpty } from '../accessories/resEmpty';

//import Phrase interface


export class PhraseController {

    public constructor() {};

    //Este metodo obtiene todos las Phrases
    public async getPhrase(req: Request, res: Response) {
        const prisma = new PrismaClient();
        try {
            const allPhrases = await prisma.phrases.findMany({
                include: {
                    phrase_feeling: true
                }
            });
            const resEmpty = new ResEmpty();
            resEmpty.resEmpty(allPhrases, res);
        } catch (error) {
            const errors = new Errors();
            errors.prismaClientKnownRequestError(error, res);
            errors.prismaClientUnknownRequestError(error, res);
        }
    }

    //Este metodo devuelve una phrase por id
    public async getPhraseById(req: Request, res: Response) {
        const prisma = new PrismaClient();
        try {
            const phrase = await prisma.phrases.findUnique({
                where: {
                    idphrases: Number(req.params.phraseId)
                },
                include: {
                    phrase_feeling: true
                }
            });
            const resEmpty = new ResEmpty();
            resEmpty.resEmpty(phrase, res);
        } catch (error) {
            const errors = new Errors();
            errors.prismaClientKnownRequestError(error, res);
            errors.prismaClientUnknownRequestError(error, res);
        }
    };

    public async createPhrase(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const errors = new Errors();
        try {
            const newPhrase = await prisma.phrases.create({
                data: {
                    contents: req.body.contents,
                }
            });
            try {
                const phraseFeelingService = new PhraseFeelingService();
                let set: PhraseFeeling = await phraseFeelingService.createPhraseFeeling(req.body);
                set.phrases_idphrases = newPhrase.idphrases;
                await prisma.phrase_feeling.create({
                    data: {
                        score: set.score,
                        numWords: set.numWords,
                        numHits: set.numHits,
                        average: set.average,
                        type: set.type,
                        locale: set.locale,
                        vote: set.vote,
                        phrases_idphrases: set.phrases_idphrases,
                    }
                });
                res.sendStatus(201);
            } catch (error) {
                errors.prismaClientKnownRequestError(error, res);
                errors.prismaClientUnknownRequestError(error, res);
            }
        } catch (error) {
            errors.prismaClientKnownRequestError(error, res);
            errors.prismaClientUnknownRequestError(error, res);
        }
    };

    public async updatePhrase(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const errors = new Errors();
        try {
            const updatePhrase = await prisma.phrases.update({
                data: {
                    contents: req.body.contents,
                },
                where: {
                    idphrases: Number(req.params.phraseId)
                },
                include: {
                    phrase_feeling: true
                }
            });
            try {
                const phraseFeelingService = new PhraseFeelingService();
                let set: PhraseFeeling = await phraseFeelingService.createPhraseFeeling(req.body);
                set.phrases_idphrases = updatePhrase.idphrases;
                const updatePhraseFeeling = await prisma.phrase_feeling.update({
                    data: {
                        score: set.score,
                        numWords: set.numWords,
                        numHits: set.numHits,
                        average: set.average,
                        type: set.type,
                        locale: set.locale,
                        vote: set.vote,
                        phrases_idphrases: set.phrases_idphrases,
                    },
                    where: {
                        idphrase_feeling: updatePhrase.phrase_feeling[0].idphrase_feeling
                    },
                    include: {
                        phrases: true
                    }
                });
                res.status(201).send(updatePhraseFeeling);
            } catch (error) {
                errors.prismaClientKnownRequestError(error, res);
                errors.prismaClientUnknownRequestError(error, res);
            }
        } catch (error) {
            errors.prismaClientKnownRequestError(error, res);
            errors.prismaClientUnknownRequestError(error, res);
        }
    };

    public async deletePhrase(req: Request, res: Response) {
        const prisma = new PrismaClient();
        try {
            await prisma.phrases.delete({
                where: {
                    idphrases: Number(req.params.phraseId)
                }
            });
            res.status(200).send();
        } catch (error) {
            const errors = new Errors();
            errors.prismaClientKnownRequestError(error, res);
            errors.prismaClientUnknownRequestError(error, res);
        }
    };

    public async deleteAll(req: Request, res: Response) {
        const prisma = new PrismaClient();
        try {
            await prisma.phrases.deleteMany();
            res.status(200).send();
        } catch (error) {
            const errors = new Errors();
            errors.prismaClientKnownRequestError(error, res);
            errors.prismaClientUnknownRequestError(error, res);
        }
        /*
        const conn = await connect();
        conn.query('DELETE FROM phrases;', (error: any, result: any) => {
            if (error) {
                const errorCode: Err = {
                    code: error.code
                }
                res.status(400).send(errorCode);
            };
            if(result) {
                res.sendStatus(200);
            };
        });*/
    }
    
}
