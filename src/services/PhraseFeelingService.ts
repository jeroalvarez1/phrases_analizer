const { SentimentAnalyzer } = require('node-nlp');
//import { connect } from "../database";
import { connectdb } from "../db";


export class PhraseFeelingService {

    public constructor() {  };

    public async createPhraseFeeling(phrase: any) {
        const sentiment = new SentimentAnalyzer({ language: 'es' });
        const result = await sentiment.getSentiment(phrase.contents);
        return result;
    };

    public async averageAllPhraseFeling() {
        const conn = await connectdb();
        const query = await conn.query('SELECT * FROM phrase_feeling');
        if (!('' + query[0])) {
            return false;
        } else {
            const phrasesFeeling = query[0];
            //Saca cual es el promedio de las frases
            let sum = 0;
            let cont = 0;
            for (const [key, value] of Object.entries(phrasesFeeling)) {
                sum += value.score;
                cont += 1;
            }
            console.log(sum)
            let result = sum / cont;
            return result;
        }
    }
}