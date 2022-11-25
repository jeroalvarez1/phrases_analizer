import { Router } from "express";
const router = Router();

import { PhraseController } from "../controllers/phrase.controller";
const phrase = new PhraseController();

router.route('/phrase')
    .get(phrase.getPhrase)
    .post(phrase.createPhrase)
    .delete(phrase.deleteAll)

router.route('/phrase/:phraseId')
    .get(phrase.getPhraseById)
    .put(phrase.updatePhrase)
    .delete(phrase.deletePhrase)
    
export default router;