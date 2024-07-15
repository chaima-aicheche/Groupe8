-- Créer la base.
CREATE DATABASE "formations";

-- Se connecter à la base.
\c formations;

-- Créer la table.
CREATE TABLE "formation" (
    "id" SERIAL PRIMARY KEY,
    "id_formateur" int NOT NULL,
    "nom" varchar(55) NOT NULL,
    "niveau" varchar(15) NOT NULL,
    "categorie" varchar(15) NOT NULL,
    "description" varchar(255) NOT NULL,
    "video" varchar(255),
    "image" varchar(255) NOT NULL,
    "date_creation" TIMESTAMP NOT NULL
);
