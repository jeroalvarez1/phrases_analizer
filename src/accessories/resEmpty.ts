export class ResEmpty{
    constructor() {};
    
    public resEmpty(data: any, res: any) {
        if (!data) {
            res.sendStatus(204);
        } else {
            res.status(200).send(data);
        }
    }

}