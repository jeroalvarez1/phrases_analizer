import { Operations } from './operations';
import { ScoreClass } from '../interfaces/scoreClass.interface';
export class Mode extends Operations {

    constructor() {
        super();
    };

    public calculateMode() {
        let mode: Array<ScoreClass> = [];
        let m: number = 0;
        this.groupScore().forEach(i => {
            if (i.rep >= m) {
                if (i.rep > m) {
                    mode = [];
                    mode.push(i);
                }
                if (i.rep === m) {
                    mode.push(i);
                }
                m = i.rep;
            }
        });
        return mode;
    }
}