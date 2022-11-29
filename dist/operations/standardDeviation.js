"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardDeviation = void 0;
const variance_1 = require("./variance");
class StandardDeviation extends variance_1.Variance {
    constructor() {
        super();
    }
    ;
    calculateDeviation() {
        return [
            {
                standardDeviation: Math.sqrt(this.calculateVariance()[0].variance)
            }
        ];
    }
}
exports.StandardDeviation = StandardDeviation;
