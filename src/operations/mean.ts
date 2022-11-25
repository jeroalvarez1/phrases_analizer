import { PhraseFeeling } from '../interfaces/phraseFeeling.iterface';
import { Operations } from './operations';
export class Mean extends Operations {
    
    public calculate(data: Array<PhraseFeeling>) {
        this.setData(data);
        let sum = 0;
        let cont: number = 0;
        let scoreList = this.getOrganizeScore();
        scoreList.forEach(element => {
            sum = sum + element;
            cont++;
        });
        return (sum / cont);
    }
}