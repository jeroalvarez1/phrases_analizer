"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mean = void 0;
const operations_1 = require("./operations");
class Mean extends operations_1.Operations {
    constructor() {
        super();
    }
    ;
    calculateMean() {
        let N = 0;
        let X = 0;
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
exports.Mean = Mean;
