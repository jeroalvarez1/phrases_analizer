import { Request, Response } from "express";
import { Mode } from '../operations/mode';
import { Mean } from '../operations/mean';
import { Operations } from "../operations/operations";
import { Variance } from "../operations/variance";
import { StandardDeviation } from "../operations/standardDeviation";
import { CoefficientVariation } from "../operations/coefficientVariation";
import { PrismaClient } from "@prisma/client";
import { Errors } from "../accessories/errors";
import { ResEmpty } from "../accessories/resEmpty";

export class PhraseFeelingController {
    

    public async getAllPhraseFeeling(req: Request, res: Response) {

        const prisma = new PrismaClient();
        try {
            const allPhraseFeeling = await prisma.phrase_feeling.findMany({
                include: {
                    phrases: true
                }
            })
            const resEmpty = new ResEmpty();
            resEmpty.resEmpty(allPhraseFeeling, res);
        } catch (error) {
            const errors = new Errors();
            errors.prismaClientKnownRequestError(error, res);
            errors.prismaClientUnknownRequestError(error, res);
        }
    };

    public async getPhraseFeelingByidPhrase(req: Request, res: Response) {
        const prisma = new PrismaClient();
        try {
            const phraseFeeling = await prisma.phrase_feeling.findMany({
                where: {
                    phrases_idphrases: Number(req.params.phraseId)
                },
                include: {
                    phrases: true
                }
            });
            const resEmpty = new ResEmpty();
            resEmpty.resEmpty(phraseFeeling, res);
        } catch (error) {
            const errors = new Errors();
            errors.prismaClientKnownRequestError(error, res);
            errors.prismaClientUnknownRequestError(error, res);
        }
    };

    public async getMode(req: Request, res: Response) {
        const mode = new Mode();
        await mode.setData();
        mode.setScore();
        res.json(mode.calculateMode());
    }

    public async getMean(req: Request, res: Response) {
        const mean = new Mean();
        await mean.setData();
        mean.setScore();
        res.status(200).send(mean.calculateMean());
    }

    public async getFrecuencyTable(req: Request, res: Response) {
        let operations = new Operations();
        await operations.setData();
        operations.setScore();
        res.status(200).send(operations.groupScore());
    }

    public async getVariance(req: Request, res: Response) {
        let variance = new Variance();
        await variance.setData();
        variance.setScore();
        res.status(200).send(variance.calculateVariance());
    }

    public async getStandardDeviation(req: Request, res: Response) {
        let standardDeviation = new StandardDeviation();
        await standardDeviation.setData();
        standardDeviation.setScore();
        res.status(200).send(standardDeviation.calculateDeviation());
    }

    public async getCoefficientVariation(req: Request, res: Response) {
        let coefficientVariation = new CoefficientVariation();
        await coefficientVariation.setData();
        coefficientVariation.setScore();
        res.status(200).send(coefficientVariation.calculateCofficient());
    }

}