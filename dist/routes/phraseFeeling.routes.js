"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const phraseFeeling_controller_1 = require("../controllers/phraseFeeling.controller");
const phraseFeeling = new phraseFeeling_controller_1.PhraseFeelingController();
router.route('/phrasefeeling')
    .get(phraseFeeling.getAllPhraseFeeling);
router.route('/phrase/:phraseId/phrasefeeling')
    .get(phraseFeeling.getPhraseFeelingByidPhrase);
router.route('/phrasefeeling/average')
    .get(phraseFeeling.getPhraseFelingTotalAverage);
exports.default = router;
