-- CreateTable
CREATE TABLE `phrase_feeling` (
    `idphrase_feeling` INTEGER NOT NULL AUTO_INCREMENT,
    `score` FLOAT NOT NULL,
    `numWords` INTEGER NOT NULL,
    `numHits` INTEGER NOT NULL,
    `average` FLOAT NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    `locale` VARCHAR(4) NOT NULL,
    `vote` VARCHAR(45) NOT NULL,
    `phrases_idphrases` INTEGER NOT NULL,

    INDEX `fk_phrase_feeling_phrases_idx`(`phrases_idphrases`),
    PRIMARY KEY (`idphrase_feeling`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phrases` (
    `idphrases` INTEGER NOT NULL AUTO_INCREMENT,
    `contents` TEXT NOT NULL,

    PRIMARY KEY (`idphrases`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `phrase_feeling` ADD CONSTRAINT `fk_phrase_feeling_phrases` FOREIGN KEY (`phrases_idphrases`) REFERENCES `phrases`(`idphrases`) ON DELETE CASCADE ON UPDATE CASCADE;

