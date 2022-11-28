import { StandardDeviation } from "./standardDeviation";

export class CoefficientVariation extends StandardDeviation {
    
    constructor() {
        super();    
    }
    
    public calculateCofficient() {
        return [
            {
                coefficientVariation: ((this.calculateDeviation()[0].standardDeviation) / (this.calculateMean()[0].mean))
            }
        ];
    }
}