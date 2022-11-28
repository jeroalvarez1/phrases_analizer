import { Operations } from './operations';
import { MeanInterface } from '../interfaces/mean.interface';
export class Mean extends Operations {
    
    constructor() {
        super();
    };


    public calculateMean(): Array<MeanInterface> {
        let N: number = 0;
        let X: number = 0;
        this.groupScore().forEach(i => {
            X = X + (((i.lneg + i.lpos) / 2) * i.rep);
            N = N + i.rep;
        });
        return [
            {
                mean: (X / N)
            }
        ];
    }

}