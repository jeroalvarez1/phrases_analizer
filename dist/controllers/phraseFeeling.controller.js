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
exports.PhraseFeelingController = void 0;
const mode_1 = require("../operations/mode");
const mean_1 = require("../operations/mean");
const operations_1 = require("../operations/operations");
const variance_1 = require("../operations/variance");
const standardDeviation_1 = require("../operations/standardDeviation");
const coefficientVariation_1 = require("../operations/coefficientVariation");
const client_1 = require("@prisma/client");
const errors_1 = require("../accessories/errors");
const resEmpty_1 = require("../accessories/resEmpty");
class PhraseFeelingController {
    getAllPhraseFeeling(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            try {
                const allPhraseFeeling = yield prisma.phrase_feeling.findMany({
                    include: {
                        phrases: true
                    }
                });
                const resEmpty = new resEmpty_1.ResEmpty();
                resEmpty.resEmpty(allPhraseFeeling, res);
            }
            catch (error) {
                const errors = new errors_1.Errors();
                errors.prismaClientKnownRequestError(error, res);
                errors.prismaClientUnknownRequestError(error, res);
            }
        });
    }
    ;
    getPhraseFeelingByidPhrase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            try {
                const phraseFeeling = yield prisma.phrase_feeling.findMany({
                    where: {
                        phrases_idphrases: Number(req.params.phraseId)
                    },
                    include: {
                        phrases: true
                    }
                });
                const resEmpty = new resEmpty_1.ResEmpty();
                resEmpty.resEmpty(phraseFeeling, res);
            }
            catch (error) {
                const errors = new errors_1.Errors();
                errors.prismaClientKnownRequestError(error, res);
                errors.prismaClientUnknownRequestError(error, res);
            }
        });
    }
    ;
    getMode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mode = new mode_1.Mode();
            yield mode.setData();
            mode.setScore();
            res.json(mode.calculateMode());
        });
    }
    getMean(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mean = new mean_1.Mean();
            yield mean.setData();
            mean.setScore();
            res.status(200).send(mean.calculateMean());
        });
    }
    getFrecuencyTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let operations = new operations_1.Operations();
            yield operations.setData();
            operations.setScore();
            res.status(200).send(operations.groupScore());
        });
    }
    getVariance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let variance = new variance_1.Variance();
            yield variance.setData();
            variance.setScore();
            res.status(200).send(variance.calculateVariance());
        });
    }
    getStandardDeviation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let standardDeviation = new standardDeviation_1.StandardDeviation();
            yield standardDeviation.setData();
            standardDeviation.setScore();
            res.status(200).send(standardDeviation.calculateDeviation());
        });
    }
    getCoefficientVariation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let coefficientVariation = new coefficientVariation_1.CoefficientVariation();
            yield coefficientVariation.setData();
            coefficientVariation.setScore();
            res.status(200).send(coefficientVariation.calculateCofficient());
        });
    }
}
exports.PhraseFeelingController = PhraseFeelingController;
