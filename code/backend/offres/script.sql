-- Créer la base.
CREATE DATABASE "offres";

-- Se connecter à la base.
\c offres;

-- Créer la table.
CREATE TABLE "offres" (
    "id" SERIAL PRIMARY KEY,
    "id_recruteur" int NOT NULL,
    "titre" varchar(255) NOT NULL,
    "adresse" varchar(255) NOT NULL,
    "code_postal" varchar(10) NOT NULL,
    "ville" varchar(25) NOT NULL,
    "pays" varchar(25) NOT NULL,
    "domaine" varchar(25) NOT NULL,
    "description" varchar(255) NOT NULL,
    "image" varchar(255) NOT NULL,
    "date_publication" TIMESTAMP NOT NULL
);




CREATE TABLE "candidatures" (
    "id" SERIAL PRIMARY KEY,
    "id_offre" int NOT NULL,
    "id_candidat" int NOT NULL,
    "statut" varchar(15) NOT NULL,
    "date_candidature" TIMESTAMP NOT NULL
);

ALTER TABLE "candidatures" ADD CONSTRAINT "fk_id_offre" FOREIGN KEY ("id_offre") REFERENCES "offres" ("id");


CREATE TABLE "entretien" (
    "id" SERIAL PRIMARY KEY,
    "id_recruteur" int NOT NULL,
    "id_candidat" int NOT NULL,
    "id_offre" int NOT NULL,
    "titre" varchar(255) NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "adresse" varchar(255) NOT NULL,
    "code_postal" varchar(10) NOT NULL,
    "ville" varchar(25) NOT NULL,
    "pays" varchar(25) NOT NULL
);

ALTER TABLE "entretien" ADD CONSTRAINT "fk_id_offre" FOREIGN KEY ("id_offre") REFERENCES "offres" ("id");