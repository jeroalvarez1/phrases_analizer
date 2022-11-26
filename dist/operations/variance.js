"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variance = void 0;
const mode_1 = require("./mode");
class Variance extends mode_1.Mode {
    calculateVariance(data) {
        this.setData(data);
        const scoreList = this.getOrganizeScore();
        console.log(scoreList);
    }
}
exports.Variance = Variance;
