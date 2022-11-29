import { Request, Response } from "express";
import { PhraseFeeling } from "../interfaces/phraseFeeling.iterface";
import { PhraseFeelingService } from "../services/PhraseFeelingService";
import { PrismaClient } from '@prisma/client'
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
        const phraseFeelingService = new PhraseFeelingService();
        try {
            const set: PhraseFeeling = await phraseFeelingService.createPhraseFeeling(req.body);
            const newPhrase = await prisma.phrases.create({
                data: {
                    contents: req.body.contents,
                    phrase_feeling: {
                        create:{
                            score: set.score,
                            numWords: set.numWords,
                            numHits: set.numHits,
                            average: set.average,
                            type: set.type,
                            locale: set.locale,
                            vote: set.vote
                        }
                    }
                }
            });
            res.status(201).send(newPhrase);
        } catch (error) {
            const errors = new Errors();
            errors.prismaClientKnownRequestError(error, res);
            errors.prismaClientUnknownRequestError(error, res);
        }
    };

    public async updatePhrase(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const phraseFeelingService = new PhraseFeelingService();
        try {
            const set: PhraseFeeling = await phraseFeelingService.createPhraseFeeling(req.body);
            const updatePhrase = await prisma.phrases.update({
                where: {
                    idphrases: Number(req.params.phraseId)
                },
                data: {
                    contents: req.body.contents,
                    phrase_feeling: {
                        deleteMany: {},
                        create: {
                            score: set.score,
                            numWords: set.numWords,
                            numHits: set.numHits,
                            average: set.average,
                            type: set.type,
                            locale: set.locale,
                            vote: set.vote,
                        }
                    }
                },
                include: {
                    phrase_feeling: true
                }
            });
            res.status(201).send(updatePhrase);
        } catch (error) {
            const errors = new Errors();
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
    }
    
}
