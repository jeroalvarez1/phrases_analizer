import { PhraseFeeling } from '../interfaces/phraseFeeling.iterface';
import { Operations } from './operations';
export class Mode extends Operations {
    
    public calculate(data: Array<PhraseFeeling>) {
        this.setData(data);
        
        const scoreList: number[] = this.getOrganizeScore();
        const scoreListSet = new Set(scoreList);
        let cont = 0;
        let table: Array<number[]> = [];
        
        scoreListSet.forEach(i => {
            scoreList.forEach(j => {
                if (j === i) {
                    cont++;
                }
            });
            table.push([i,cont])
            cont = 0;
        });
        let mode: Array<number[]> = [];
        let m = 0;
        table.forEach(i => {
            if (i[1] >= m) {
                if (i[1] > m) {
                    mode = [];
                    mode.push(i);
                } else if (i[1] === m) {
                    mode.push(i);
                }
                m = i[1];
            }
        });
        
        return mode;
    }
}