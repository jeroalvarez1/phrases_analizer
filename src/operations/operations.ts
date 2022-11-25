import { PhraseFeeling } from "../interfaces/phraseFeeling.iterface";

export class Operations {
    
    private data: Array<PhraseFeeling> = [];
    private score: number[] = [];
    private tidyScore: number[] = [];

    constructor() {

    };
    
    public getScore(): number[] {
        this.data.forEach(element => {
            this.score.push(element.score);
        });
        return this.score;
    }

    public getOrganizeScore(): number[] {
        this.tidyScore = this.getScore().sort();
        return this.tidyScore;
    }
    
    public setData(data: Array<PhraseFeeling>) {
        this.data = data;
    }
}