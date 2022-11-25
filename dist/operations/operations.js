"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operations = void 0;
class Operations {
    constructor() {
        this.data = [];
        this.score = [];
        this.tidyScore = [];
    }
    ;
    getScore() {
        this.data.forEach(element => {
            this.score.push(element.score);
        });
        return this.score;
    }
    getOrganizeScore() {
        this.tidyScore = this.getScore().sort();
        return this.tidyScore;
    }
    setData(data) {
        this.data = data;
    }
}
exports.Operations = Operations;
