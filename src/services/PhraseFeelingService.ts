const { SentimentAnalyzer } = require('node-nlp');
//import { connect } from "../database";
import { connectdb } from "../db";
import { PhraseFeeling } from "../interfaces/phraseFeeling.iterface";
import { Mean } from "../operations/mean";
import { Mode } from "../operations/mode";
import { Variance } from "../operations/variance";

export class PhraseFeelingService {

    public constructor() {  };

    public async createPhraseFeeling(phrase: any) {
        const sentiment = new SentimentAnalyzer({ language: 'en' });
        const result = await sentiment.getSentiment(phrase.contents);
        return result;
    };

    public async averageAllPhraseFeling() {
        const conn = await connectdb();
        const query = await conn.query('SELECT * FROM phrase_feeling');
        if (!('' + query[0])) {
            return false;
        } else {
            let phrasesFeeling: Array<PhraseFeeling> = [];
            for (const [key, value] of Object.entries(query[0])) {
                phrasesFeeling.push(value);
            }
            const mean = new Mean();
            let result = [];
            result.push(mean.calculate(phrasesFeeling));
            const mode = new Mode();

            const variance = new Variance();
            variance.calculateVariance(phrasesFeeling);


            result.push(mode.calculate(phrasesFeeling));
            return result;
        }
    }
}