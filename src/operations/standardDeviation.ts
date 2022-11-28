import { Variance } from "./variance";

export class StandardDeviation extends Variance {

    constructor() {
        super();
    };

    public calculateDeviation() {
        return [
            {
                standardDeviation: Math.sqrt(this.calculateVariance()[0].variance)
            }
        ];
    }
}