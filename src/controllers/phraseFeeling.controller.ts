import { request, Request, Response } from "express";
import { connect } from "../database";
import { Err } from "../interfaces/err.interface";
import { Mode } from '../operations/mode';
import { Mean } from '../operations/mean';
import { Operations } from "../operations/operations";
import { Variance } from "../operations/variance";
import { StandardDeviation } from "../operations/standardDeviation";
import { CoefficientVariation } from "../operations/coefficientVariation";

export class PhraseFeelingController {
    

    public async getAllPhraseFeeling(req: Request, res: Response) {
        const conn = await connect();
        conn.query('SELECT * FROM phrase_feeling', (error: any, result: any) => {
            if (error) {
                const errorCode: Err = {
                    code: error.code
                }
                res.status(400).send(errorCode);
            };
            if (!('' + result)) {
                res.sendStatus(204);
            } else {
                res.status(200).send(result);
            };       
        });
    };

    public async getPhraseFeelingByidPhrase(req: Request, res: Response) {
        const conn = await connect();
        conn.query('SELECT * FROM phrase_feeling WHERE phrases_idphrases = ?', req.params.phraseId, (error: any, result: any) => {
            if (error) {
                const errorCode: Err = {
                    code: error.code
                }
                res.status(400).send(errorCode);
            };
            if (!('' + result)) {
                res.sendStatus(204);
            } else {
                res.status(200).send(result);
            };       
        });
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