"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mode = void 0;
const operations_1 = require("./operations");
class Mode extends operations_1.Operations {
    calculate(data) {
        this.setData(data);
        const scoreList = this.getOrganizeScore();
        const scoreListSet = new Set(scoreList);
        let cont = 0;
        let table = [];
        scoreListSet.forEach(i => {
            scoreList.forEach(j => {
                if (j === i) {
                    cont++;
                }
            });
            table.push([i, cont]);
            cont = 0;
        });
        let mode = [];
        let m = 0;
        table.forEach(i => {
            if (i[1] >= m) {
                if (i[1] > m) {
                    mode = [];
                    mode.push(i);
                }
                else if (i[1] === m) {
                    mode.push(i);
                }
                m = i[1];
            }
        });
        return mode;
    }
}
exports.Mode = Mode;
