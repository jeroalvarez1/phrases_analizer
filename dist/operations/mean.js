"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mean = void 0;
const operations_1 = require("./operations");
class Mean extends operations_1.Operations {
    calculate(data) {
        this.setData(data);
        let sum = 0;
        let cont = 0;
        let scoreList = this.getOrganizeScore();
        scoreList.forEach(element => {
            sum = sum + element;
            cont++;
        });
        return (sum / cont);
    }
}
exports.Mean = Mean;
