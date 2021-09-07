CREATE TABLE games (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome varchar(100) NOT NULL,
  preco decimal(8,2) NOT NULL
);

CREATE TABLE estudios (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome varchar(50) NOT NULL
);

CREATE TABLE games_estudios (
    gameId int NOT NULL,
    estudioId int NOT NULL,
    FOREIGN KEY (gameId) REFERENCES games(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (estudioId) REFERENCES estudio(id) ON DELETE SET NULL ON UPDATE CASCADE
);