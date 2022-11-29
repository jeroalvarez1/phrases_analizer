import { PhraseFeeling } from "../interfaces/phraseFeeling.iterface";
import { ScoreClass } from "../interfaces/scoreClass.interface";
import { PrismaClient } from '@prisma/client';

export class Operations {
    
    private data: Array<PhraseFeeling> = [];
    private score: number[] = [];

    constructor() {};

    //Este metodo es le setter de data
    public async setData() {    
        const prisma = new PrismaClient();
        const phrase_feeling = prisma.phrase_feeling.findMany();
        let phrasesFeeling: Array<PhraseFeeling> = [];
        (await phrase_feeling).forEach(i => {
            phrasesFeeling.push(i);
        });
        this.data = phrasesFeeling;
    }

    //Este metodo obtiene los scores de PhraseFeeling y los almacena en un array
    public setScore(): void {
        this.data.forEach(element => {
            this.score.push(element.score);
        });
    }

    //Este metodo devuelve el score
    public getScore(): number[] {
        return this.score;
    }

    //Este metodo organiza y devuelve los datos obtenidos de getScore()
    public getOrganizeScore(): number[] {
        return this.getScore().sort();
    }
    
    //Este metodo agrupa los Score obteniendo asi una tabla de frecuencias
    public groupScore(): Array<ScoreClass> {
        let interv = this.getOrganizeScore()[0];
        let scoreClass: Array<ScoreClass> = [];  
        for (let index = 0; index < this.intervalAmount(); index++) {
            scoreClass.push({
                lneg: interv,
                lpos: interv + this.intervalLength(),
                rep: 0
            })
            interv = interv + this.intervalLength();
        }
        let cont: number = 0;
        let position: number = 0;
        scoreClass.forEach(i => {
            if (i.lpos === scoreClass[scoreClass.length - 1].lpos) {
                this.getOrganizeScore().forEach(j => {
                    if ((j >= i.lneg)) {
                        cont++;
                        scoreClass[position].rep = cont;
                    }
                });
            } else {
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
    public range() {
        return this.getOrganizeScore()[this.getOrganizeScore().length - 1] - this.getOrganizeScore()[0];
    }

    //Este metodo devuelve el numero de intervalos de score
    public intervalAmount() {
        let intervalAmount = 1 + (3.3 * Math.log10(this.getScore().length));
        if ((Math.round(intervalAmount) % 2) !== 0) {
            intervalAmount = Math.round(intervalAmount);
        } else {
            if ((Math.ceil(intervalAmount) % 2) !== 0) {
                intervalAmount = Math.ceil(intervalAmount);
            } else {
                intervalAmount = Math.floor(intervalAmount);
            }
        }
        return intervalAmount;
    }

    //Este metodo devuelve la longitud de los intervalos de score
    public intervalLength() {
        return this.range() / this.intervalAmount();
    }

}