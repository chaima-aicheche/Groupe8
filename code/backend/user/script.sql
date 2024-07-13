-- Créer la base.
CREATE DATABASE user;

-- Se connecter à la base.
\c user;

-- Créer la table.
CREATE TABLE "candidat" (
   "id" SERIAL PRIMARY KEY,
   "email" varchar(100) NOT NULL,
   "num_telephone" varchar(100) NOT NULL,
   "nom" varchar(50) NOT NULL,
   "prenom" varchar(50) NOT NULL,
   "adresse" varchar(255) NOT NULL,
   "code_postal" varchar(10) NOT NULL,
   "ville" varchar(25) NOT NULL,
   "pays" varchar(25) NOT NULL,
   "genre" varchar(10) NOT NULL,
   "cv" varchar(255) NOT NULL
);