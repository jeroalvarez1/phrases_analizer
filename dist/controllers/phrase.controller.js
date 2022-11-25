"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhraseController = void 0;
const database_1 = require("../database");
const PhraseFeelingService_1 = require("../services/PhraseFeelingService");
//import Phrase interface
class PhraseController {
    constructor() { }
    ;
    getPhrase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, database_1.connect)();
            conn.query('SELECT * FROM phrases', (error, result) => {
                if (error) {
                    const errorCode = {
                        code: error.code
                    };
                    res.status(400).send(errorCode);
                }
                ;
                if (!('' + result)) {
                    res.sendStatus(204);
                }
                else {
                    res.status(200).send(result);
                }
                ;
            });
        });
    }
    getPhraseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, database_1.connect)();
            conn.query('SELECT * FROM phrases WHERE idphrases = ?', req.params.phraseId, (error, result) => {
                if (error) {
                    const errorCode = {
                        code: error.code
                    };
                    res.status(400).send(errorCode);
                }
                ;
                if (!('' + result)) {
                    res.sendStatus(204);
                }
                else {
                    res.status(200).send(result);
                }
                ;
            });
        });
    }
    ;
    createPhrase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, database_1.connect)();
            conn.query('INSERT INTO phrases SET ?', req.body, (error, result) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    const errorCode = {
                        code: error.code
                    };
                    res.status(400).send(errorCode);
                }
                ;
                if (result) {
                    const phraseFeelingService = new PhraseFeelingService_1.PhraseFeelingService();
                    const phraseFeeling = yield phraseFeelingService.createPhraseFeeling(req.body);
                    let set = phraseFeeling;
                    set.phrases_idphrases = result.insertId;
                    conn.query('INSERT INTO phrase_feeling SET ?', set, (error, result) => {
                        if (error) {
                            const errorCode = {
                                code: error.code
                            };
                            res.status(400).send(errorCode);
                        }
                        ;
                        if (result) {
                            res.sendStatus(201);
                        }
                    });
                }
                ;
            }));
        });
    }
    ;
    updatePhrase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, database_1.connect)();
            conn.query('UPDATE phrases SET ? WHERE idphrases = ?', [req.body, req.params.phraseId], (error, result) => {
                if (error) {
                    const errorCode = {
                        code: error.code
                    };
                    res.status(400).send(errorCode);
                }
                ;
                if (result) {
                    res.status(201).send();
                }
                ;
            });
        });
    }
    ;
    deletePhrase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, database_1.connect)();
            conn.query('DELETE FROM phrases WHERE idphrases = ?', req.params.phraseId, (error, result) => {
                if (error) {
                    const errorCode = {
                        code: error.code
                    };
                    res.status(400).send(errorCode);
                }
                ;
                if (result) {
                    if (result.affectedRows === 1) {
                        res.status(200).send();
                    }
                    else {
                        res.status(204).send();
                    }
                    ;
                }
                ;
            });
        });
    }
    ;
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, database_1.connect)();
            conn.query('DELETE FROM phrases;', (error, result) => {
                if (error) {
                    const errorCode = {
                        code: error.code
                    };
                    res.status(400).send(errorCode);
                }
                ;
                if (result) {
                    res.sendStatus(200);
                }
                ;
            });
        });
    }
}
exports.PhraseController = PhraseController;
