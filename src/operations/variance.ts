import { PhraseFeeling } from "../interfaces/phraseFeeling.iterface";
import { Mode } from "./mode";

export class Variance extends Mode{

    public calculateVariance(data: Array<PhraseFeeling>) {
        this.setData(data);
        const scoreList = this.getOrganizeScore();
        console.log(scoreList);
        let variance: number = 0;
        //const mode = this.calculate(scoreList);
        //scoreList.forEach(i => {
        //    variance = i - 
        //});
        //
    }
}