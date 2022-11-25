import { Request, Response } from "express";
import { connect } from "../database";
import { Err } from "../interfaces/err.interface";
import { PhraseFeelingService } from '../services/PhraseFeelingService';

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
    
    public async getPhraseFelingTotalAverage(req: Request, res: Response) {
        const phraseFeelingService = new PhraseFeelingService();
        const average = await phraseFeelingService.averageAllPhraseFeling();
        if (average === false) {
            res.sendStatus(204);
        }
        if (average) {
            let vote = '';
            if (average > 0) {
                vote = 'More positive that negative';
            } else if (average < 0) {
                vote = 'More negative that positive';
            } else {
                vote = 'Neutral';
            }
            return res.json({
                scoreAverage: average,
                vote: vote
            });   
        }
    }

}