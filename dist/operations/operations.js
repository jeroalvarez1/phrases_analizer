"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operations = void 0;
const client_1 = require("@prisma/client");
class Operations {
    constructor() {
        this.data = [];
        this.score = [];
    }
    ;
    //Este metodo es le setter de data
    setData() {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const phrase_feeling = prisma.phrase_feeling.findMany();
            let phrasesFeeling = [];
            (yield phrase_feeling).forEach(i => {
                phrasesFeeling.push(i);
            });
            this.data = phrasesFeeling;
        });
    }
    //Este metodo obtiene los scores de PhraseFeeling y los almacena en un array
    setScore() {
        this.data.forEach(element => {
            this.score.push(element.score);
        });
    }
    //Este metodo devuelve el score
    getScore() {
        return this.score;
    }
    //Este metodo organiza y devuelve los datos obtenidos de getScore()
    getOrganizeScore() {
        return this.getScore().sort();
    }
    //Este metodo agrupa los Score obteniendo asi una tabla de frecuencias
    groupScore() {
        let interv = this.getOrganizeScore()[0];
        let scoreClass = [];
        for (let index = 0; index < this.intervalAmount(); index++) {
            scoreClass.push({
                lneg: interv,
                lpos: interv + this.intervalLength(),
                rep: 0
            });
            interv = interv + this.intervalLength();
        }
        let cont = 0;
        let position = 0;
        scoreClass.forEach(i => {
            if (i.lpos === scoreClass[scoreClass.length - 1].lpos) {
                this.getOrganizeScore().forEach(j => {
                    if ((j >= i.lneg)) {
                        cont++;
                        scoreClass[position].rep = cont;
                    }
                });
            }
            else {
                this.getOrganizeScore().forEach(j => {
                    if ((j >= i.lneg && j < i.lpos)) {
                        cont++;
                        scoreClass[position].rep = cont;
                    }
                });
            }
            cont = 0;
            position++;
        });
        return scoreClass;
    }
    //Este metodo calcula y devuelve el rango de score
    range() {
        return this.getOrganizeScore()[this.getOrganizeScore().length - 1] - this.getOrganizeScore()[0];
    }
    //Este metodo devuelve el numero de intervalos de score
    intervalAmount() {
        let intervalAmount = 1 + (3.3 * Math.log10(this.getScore().length));
        if ((Math.round(intervalAmount) % 2) !== 0) {
            intervalAmount = Math.round(intervalAmount);
        }
        else {
            if ((Math.ceil(intervalAmount) % 2) !== 0) {
                intervalAmount = Math.ceil(intervalAmount);
            }
            else {
                intervalAmount = Math.floor(intervalAmount);
            }
        }
        return intervalAmount;
    }
    //Este metodo devuelve la longitud de los intervalos de score
    intervalLength() {
        return this.range() / this.intervalAmount();
    }
}
exports.Operations = Operations;
