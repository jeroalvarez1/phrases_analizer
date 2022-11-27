const { SentimentAnalyzer } = require('node-nlp');

export class PhraseFeelingService {

    public constructor() {  };

    public async createPhraseFeeling(phrase: any) {
        const sentiment = new SentimentAnalyzer({ language: 'en' });
        const result = await sentiment.getSentiment(phrase.contents);
        return result;
    };

}