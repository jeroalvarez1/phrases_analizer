import { Request, Response } from "express";
import { connect } from "../database";
import { Err } from "../interfaces/err.interface";
const { SentimentAnalyzer } = require('node-nlp');

export class PhraseFeelingController {
    
    public constructor() {  };

    public async createPhraseFeeling(phrase: any) {
        const sentiment = new SentimentAnalyzer({ language: 'es' });
        const result = await sentiment.getSentiment(phrase.contents);
        return result;
    };
}