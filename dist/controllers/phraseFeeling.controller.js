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
exports.PhraseFeelingController = void 0;
const database_1 = require("../database");
const PhraseFeelingService_1 = require("../services/PhraseFeelingService");
class PhraseFeelingController {
    getAllPhraseFeeling(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, database_1.connect)();
            conn.query('SELECT * FROM phrase_feeling', (error, result) => {
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
    getPhraseFeelingByidPhrase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, database_1.connect)();
            conn.query('SELECT * FROM phrase_feeling WHERE phrases_idphrases = ?', req.params.phraseId, (error, result) => {
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
    getPhraseFelingTotalAverage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const phraseFeelingService = new PhraseFeelingService_1.PhraseFeelingService();
            const average = yield phraseFeelingService.averageAllPhraseFeling();
            if (average === false) {
                res.sendStatus(204);
            }
            if (average != false) {
                let vote = '';
                if (average[0] > 0) {
                    vote = 'More positive that negative';
                }
                else if (average[0] < 0) {
                    vote = 'More negative that positive';
                }
                else if (average[0] == 0) {
                    vote = 'Neutral';
                }
                return res.json({
                    mean: average[0],
                    mode: average[1],
                    vote: vote
                });
            }
        });
    }
}
exports.PhraseFeelingController = PhraseFeelingController;
