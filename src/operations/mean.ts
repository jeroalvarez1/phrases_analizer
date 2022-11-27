import { Operations } from './operations';
export class Mean extends Operations {
    
    constructor() {
        super();
    };

    public async calculateMean() {
        await this.setData();
        this.setScore();
        let sum = 0;
        let cont: number = 0;
        let scoreList = this.getOrganizeScore();
        scoreList.forEach(element => {
            sum = sum + element;
            cont++;
        });
        return [
            {
                mean: (sum / cont)
            }
        ];
    }
}