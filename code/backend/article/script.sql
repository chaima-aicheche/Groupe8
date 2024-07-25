-- Créer la base.
CREATE DATABASE "articles";

-- Se connecter à la base.
\c articles;

-- Créer la table.
CREATE TABLE "article" (
    "id" SERIAL PRIMARY KEY,
    "id_formateur" int NOT NULL,
    "titre" varchar(255) NOT NULL,
    "categorie" varchar(255) NOT NULL,
    "description" varchar(255) NOT NULL,
    "contenu" text NOT NULL,
    "image" varchar(255) NOT NULL,
    "date_publication" TIMESTAMP NOT NULL
);


CREATE TABLE "historique_lecture" (
    "id" SERIAL PRIMARY KEY,
    "id_article" int NOT NULL,
    "id_candidat" int NOT NULL,
    "date_lecture" TIMESTAMP NOT NULL
);

ALTER TABLE "historique_lecture" ADD CONSTRAINT "fk_id_article" FOREIGN KEY ("id_article") REFERENCES "article" ("id");



-- DONNEES FACTICE POUR LE DEVELOPPEMENT
-- INSERT INTO "article" ("id_formateur", "titre", "categorie", "description", "contenu", "image", "date_publication") VALUES
-- (1, 'Les nouveautés en Java 17', 'Programmation', 'Un aperçu des nouvelles fonctionnalités de Java 17', 'Java 17 apporte de nombreuses améliorations...', 'image.svg', '2023-07-01 10:00:00'),
-- (2, 'Les meilleures pratiques en DevOps', 'Informatique', 'Comment améliorer votre flux de travail DevOps', 'Pour optimiser les processus DevOps, il est crucial de...', 'image.svg', '2023-07-02 11:00:00'),
-- (3, 'Les tendances UX/UI en 2024', 'Design', 'Ce qu''il faut savoir sur les tendances UX/UI de cette année', 'En 2024, les tendances UX/UI se concentreront sur...', 'image.svg', '2023-07-03 12:00:00');


-- INSERT INTO "historique_lecture" ("id_article", "id_candidat", "date_lecture") VALUES
-- ('1', '1', '2024-07-01 10:00:00'),
-- ('2', '2', '2024-07-07 10:00:00'),
-- ('3', '3', '2024-07-11 10:00:00');