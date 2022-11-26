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
exports.PhraseFeelingService = void 0;
const { SentimentAnalyzer } = require('node-nlp');
//import { connect } from "../database";
const db_1 = require("../db");
const mean_1 = require("../operations/mean");
const mode_1 = require("../operations/mode");
const variance_1 = require("../operations/variance");
class PhraseFeelingService {
    constructor() { }
    ;
    createPhraseFeeling(phrase) {
        return __awaiter(this, void 0, void 0, function* () {
            const sentiment = new SentimentAnalyzer({ language: 'en' });
            const result = yield sentiment.getSentiment(phrase.contents);
            return result;
        });
    }
    ;
    averageAllPhraseFeling() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, db_1.connectdb)();
            const query = yield conn.query('SELECT * FROM phrase_feeling');
            if (!('' + query[0])) {
                return false;
            }
            else {
                let phrasesFeeling = [];
                for (const [key, value] of Object.entries(query[0])) {
                    phrasesFeeling.push(value);
                }
                const mean = new mean_1.Mean();
                let result = [];
                result.push(mean.calculate(phrasesFeeling));
                const mode = new mode_1.Mode();
                const variance = new variance_1.Variance();
                variance.calculateVariance(phrasesFeeling);
                result.push(mode.calculate(phrasesFeeling));
                return result;
            }
        });
    }
}
exports.PhraseFeelingService = PhraseFeelingService;
