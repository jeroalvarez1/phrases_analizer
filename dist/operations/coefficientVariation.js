"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoefficientVariation = void 0;
const standardDeviation_1 = require("./standardDeviation");
class CoefficientVariation extends standardDeviation_1.StandardDeviation {
    constructor() {
        super();
    }
    calculateCofficient() {
        return [
            {
                coefficientVariation: ((this.calculateDeviation()[0].standardDeviation) / (this.calculateMean()[0].mean))
            }
        ];
    }
}
exports.CoefficientVariation = CoefficientVariation;
