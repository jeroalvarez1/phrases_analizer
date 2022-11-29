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
exports.PhraseController = void 0;
const PhraseFeelingService_1 = require("../services/PhraseFeelingService");
const client_1 = require("@prisma/client");
const errors_1 = require("../accessories/errors");
const resEmpty_1 = require("../accessories/resEmpty");
//import Phrase interface
class PhraseController {
    constructor() { }
    ;
    //Este metodo obtiene todos las Phrases
    getPhrase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            try {
                const allPhrases = yield prisma.phrases.findMany({
                    include: {
                        phrase_feeling: true
                    }
                });
                const resEmpty = new resEmpty_1.ResEmpty();
                resEmpty.resEmpty(allPhrases, res);
            }
            catch (error) {
                const errors = new errors_1.Errors();
                errors.prismaClientKnownRequestError(error, res);
                errors.prismaClientUnknownRequestError(error, res);
            }
        });
    }
    //Este metodo devuelve una phrase por id
    getPhraseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            try {
                const phrase = yield prisma.phrases.findUnique({
                    where: {
                        idphrases: Number(req.params.phraseId)
                    },
                    include: {
                        phrase_feeling: true
                    }
                });
                const resEmpty = new resEmpty_1.ResEmpty();
                resEmpty.resEmpty(phrase, res);
            }
            catch (error) {
                const errors = new errors_1.Errors();
                errors.prismaClientKnownRequestError(error, res);
                errors.prismaClientUnknownRequestError(error, res);
            }
        });
    }
    ;
    createPhrase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const phraseFeelingService = new PhraseFeelingService_1.PhraseFeelingService();
            try {
                const set = yield phraseFeelingService.createPhraseFeeling(req.body);
                const newPhrase = yield prisma.phrases.create({
                    data: {
                        contents: req.body.contents,
                        phrase_feeling: {
                            create: {
                                score: set.score,
                                numWords: set.numWords,
                                numHits: set.numHits,
                                average: set.average,
                                type: set.type,
                                locale: set.locale,
                                vote: set.vote
                            }
                        }
                    }
                });
                res.status(201).send(newPhrase);
            }
            catch (error) {
                const errors = new errors_1.Errors();
                errors.prismaClientKnownRequestError(error, res);
                errors.prismaClientUnknownRequestError(error, res);
            }
        });
    }
    ;
    updatePhrase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const phraseFeelingService = new PhraseFeelingService_1.PhraseFeelingService();
            try {
                const set = yield phraseFeelingService.createPhraseFeeling(req.body);
                const updatePhrase = yield prisma.phrases.update({
                    where: {
                        idphrases: Number(req.params.phraseId)
                    },
                    data: {
                        contents: req.body.contents,
                        phrase_feeling: {
                            deleteMany: {},
                            create: {
                                score: set.score,
                                numWords: set.numWords,
                                numHits: set.numHits,
                                average: set.average,
                                type: set.type,
                                locale: set.locale,
                                vote: set.vote,
                            }
                        }
                    },
                    include: {
                        phrase_feeling: true
                    }
                });
                res.status(201).send(updatePhrase);
            }
            catch (error) {
                const errors = new errors_1.Errors();
                errors.prismaClientKnownRequestError(error, res);
                errors.prismaClientUnknownRequestError(error, res);
            }
        });
    }
    ;
    deletePhrase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            try {
                const { phraseId } = req.params;
                yield prisma.phrases.delete({
                    where: {
                        idphrases: Number(phraseId)
                    }
                });
                res.status(200).send();
            }
            catch (error) {
                const errors = new errors_1.Errors();
                errors.prismaClientKnownRequestError(error, res);
                errors.prismaClientUnknownRequestError(error, res);
            }
        });
    }
    ;
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            try {
                yield prisma.phrases.deleteMany();
                res.status(200).send();
            }
            catch (error) {
                const errors = new errors_1.Errors();
                errors.prismaClientKnownRequestError(error, res);
                errors.prismaClientUnknownRequestError(error, res);
            }
        });
    }
}
exports.PhraseController = PhraseController;
