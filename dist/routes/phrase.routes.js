"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const phrase_controller_1 = require("../controllers/phrase.controller");
const phrase = new phrase_controller_1.PhraseController();
router.route('/phrase')
    .get(phrase.getPhrase)
    .post(phrase.createPhrase)
    .delete(phrase.deleteAll);
router.route('/phrase/:phraseId')
    .get(phrase.getPhraseById)
    .put(phrase.updatePhrase)
    .delete(phrase.deletePhrase);
exports.default = router;
