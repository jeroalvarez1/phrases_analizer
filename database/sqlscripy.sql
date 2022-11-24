CREATE SCHEMA IF NOT EXISTS `api_emotions` DEFAULT CHARACTER SET utf8 ;

USE `api_emotions` ;

CREATE TABLE IF NOT EXISTS `api_emotions`.`phrases` (
  `idphrases` INT NOT NULL AUTO_INCREMENT,
  `contents` TEXT NOT NULL,
  PRIMARY KEY (`idphrases`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `api_emotions`.`phrase_feeling` (
  `idphrase_feeling` INT NOT NULL AUTO_INCREMENT,
  `score` FLOAT NOT NULL,
  `numWords` INT NOT NULL,
  `numHits` INT NOT NULL,
  `average` FLOAT NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `locale` VARCHAR(4) NOT NULL,
  `vote` VARCHAR(45) NOT NULL,
  `phrases_idphrases` INT NOT NULL,
  PRIMARY KEY (`idphrase_feeling`),
  INDEX `fk_phrase_feeling_phrases_idx` (`phrases_idphrases` ASC) VISIBLE,
  CONSTRAINT `fk_phrase_feeling_phrases`
    FOREIGN KEY (`phrases_idphrases`)
    REFERENCES `api_emotions`.`phrases` (`idphrases`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;