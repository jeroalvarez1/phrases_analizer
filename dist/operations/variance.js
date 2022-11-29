"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variance = void 0;
const mean_1 = require("./mean");
class Variance extends mean_1.Mean {
    constructor() {
        super();
    }
    ;
    calculateVariance() {
        let S2 = 0;
        let N = 0;
        this.groupScore().forEach(i => {
            S2 = S2 + (Math.pow((((i.lneg + i.lpos) / 2) - this.calculateMean()[0].mean), 2) * i.rep);
            N = N + i.rep;
        });
        return [
            {
                variance: (S2 / N)
            }
        ];
    }
}
exports.Variance = Variance;
