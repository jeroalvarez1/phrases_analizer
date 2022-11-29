"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResEmpty = void 0;
class ResEmpty {
    constructor() { }
    ;
    resEmpty(data, res) {
        if (!('' + data)) {
            res.sendStatus(204);
        }
        else {
            res.status(200).send(data);
        }
    }
}
exports.ResEmpty = ResEmpty;
