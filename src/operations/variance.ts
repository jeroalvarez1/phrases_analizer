import { Mean } from './mean';

export class Variance extends Mean{

    constructor() {
        super();
    };

    public async calculateVariance() {
        let S2: number = 0;
        let N: number = 0;
        this.groupScore().forEach(async i => {
            S2 = S2 + (Math.pow((((i.lneg + i.lpos)/2) - this.calculateMean()[0].mean), 2) * i.rep);
            N = N + i.rep;
        })
        console.log(N);
        return [
            {
                variance: (S2 / N)
            }
        ];
    }
}