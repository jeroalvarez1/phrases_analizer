import { Router } from "express";
const router = Router();

import { PhraseFeelingController } from "../controllers/phraseFeeling.controller";
const phraseFeeling = new PhraseFeelingController();

router.route('/phrasefeeling')
    .get(phraseFeeling.getAllPhraseFeeling)

router.route('/phrase/:phraseId/phrasefeeling')
    .get(phraseFeeling.getPhraseFeelingByidPhrase)
    
router.route('/phrasefeeling/average')
    .get(phraseFeeling.getPhraseFelingTotalAverage)
export default router;