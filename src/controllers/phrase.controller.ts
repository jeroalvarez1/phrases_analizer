import { Request, Response } from "express";
import { connect } from "../database";
import { Err } from "../interfaces/err.interface";
import { PhraseFeeling } from "../interfaces/phraseFeeling.iterface";
import { PhraseFeelingController } from "./phraseFeeling.controller";

//import Phrase interface


export class PhraseController {

    public constructor() {};

    public async getPhrase(req: Request, res: Response) {
        const conn = await connect();
        conn.query('SELECT * FROM phrases', (error: any, result:any) => {
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
    }

    public async getPhraseById(req: Request, res: Response) {
        const conn = await connect();
        conn.query('SELECT * FROM phrases WHERE idphrases = ?', req.params.phraseId, (error: any, result: any) => {
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

    public async createPhrase(req: Request, res: Response) {
        const conn = await connect();
        conn.query('INSERT INTO phrases SET ?', req.body, async (error: any, result: any) => {
            if (error) {
                const errorCode: Err = {
                    code: error.code
                }
                res.status(400).send(errorCode);
            };
            if (result) {
                const phraseFeelingController = new PhraseFeelingController();
                const phraseFeeling = await phraseFeelingController.createPhraseFeeling(req.body);
                let set: PhraseFeeling = phraseFeeling;
                set.phrases_idphrases = result.insertId;
                conn.query('INSERT INTO phrase_feeling SET ?', set, (error: any, result: any) => {
                    if (error) {
                        const errorCode: Err = {
                            code: error.code
                        }
                        res.status(400).send(errorCode);
                    };
                    if (result) {
                        res.sendStatus(201);   
                    }
                })
            };
        });
    };

    public async updatePhrase(req: Request, res: Response) {
        const conn = await connect();
        conn.query('UPDATE phrases SET ? WHERE idphrases = ?', [req.body, req.params.phraseId], (error: any, result: any) => {
            if (error) {
                const errorCode: Err = {
                    code: error.code
                }
                res.status(400).send(errorCode);
            };
            if(result) {
                res.status(201).send();
            };
        });
    };

    public async deletePhrase(req: Request, res: Response) {
        const conn = await connect();
        conn.query('DELETE FROM phrases WHERE idphrases = ?', req.params.phraseId, (error: any, result: any) => {
            if (error) {
                const errorCode: Err = {
                    code: error.code
                }
                res.status(400).send(errorCode);
            };
            if(result) {
                if (result.affectedRows === 1) {
                    res.status(200).send();
                } else {
                    res.status(204).send();
                };
            };
        });
    };

    
}
