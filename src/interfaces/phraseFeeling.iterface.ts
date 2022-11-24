export interface PhraseFeeling {
    idphrase_feeling?: number;
    score: number;
    numWords: number;
    numHits: number;
    average: number;
    type: string;
    locale: string;
    vote: string;
    phrases_idphrases?: number;
}