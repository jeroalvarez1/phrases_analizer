"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mode = void 0;
const operations_1 = require("./operations");
class Mode extends operations_1.Operations {
    constructor() {
        super();
    }
    ;
    calculateMode() {
        let mode = [];
        let m = 0;
        this.groupScore().forEach(i => {
            if (i.rep >= m) {
                if (i.rep > m) {
                    mode = [];
                    mode.push(i);
                }
                if (i.rep === m) {
                    mode.push(i);
                }
                m = i.rep;
            }
        });
        return mode;
    }
}
exports.Mode = Mode;
