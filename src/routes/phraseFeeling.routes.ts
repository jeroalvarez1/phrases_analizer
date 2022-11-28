import { Router } from "express";
const router = Router();

import { PhraseFeelingController } from "../controllers/phraseFeeling.controller";
const phraseFeeling = new PhraseFeelingController();

router.route('/phrasefeeling')
    .get(phraseFeeling.getAllPhraseFeeling)

router.route('/phrase/:phraseId/phrasefeeling')
    .get(phraseFeeling.getPhraseFeelingByidPhrase)
    
router.route('/phrasefeeling/mode')
    .get(phraseFeeling.getMode)

router.route('/phrasefeeling/mean')
    .get(phraseFeeling.getMean)

router.route('/phrasefeeling/frecuencytable')
    .get(phraseFeeling.getFrecuencyTable)

router.route('/phrasefeeling/variance')
    .get(phraseFeeling.getVariance)    

    export default router;