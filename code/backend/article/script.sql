-- Créer la base.
CREATE DATABASE "articles";

-- Se connecter à la base.
\c articles;

-- Créer la table.
CREATE TABLE "article" (
    "id" SERIAL PRIMARY KEY,
    "titre" varchar(255) NOT NULL,
    "categorie" varchar(255) NOT NULL,
    "description" varchar(255) NOT NULL,
    "contenu" text NOT NULL,
    "image" varchar(255) NOT NULL,
    "date_publication" TIMESTAMP NOT NULL
);


CREATE TABLE "historique" (
    "id" SERIAL PRIMARY KEY,
    "id_article" int NOT NULL,
    "id_candidat" int NOT NULL,
    "date_lecture" TIMESTAMP NOT NULL
);

ALTER TABLE "historique" ADD CONSTRAINT "fk_id_article" FOREIGN KEY ("id_article") REFERENCES "article" ("id");