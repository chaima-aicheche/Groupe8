-- Créer la base.
CREATE DATABASE "user";

-- Se connecter à la base.
\c user;

-- Créer la table candidat.
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

-- Créer la table recruteur.
CREATE TABLE "recruteur" (
     "id" SERIAL PRIMARY KEY,
     "email" varchar(100) NOT NULL,
     "num_telephone" varchar(100) NOT NULL,
     "raison sociale" varchar(100) NOT NULL,
     "adresse" varchar(255) NOT NULL,
     "code_postal" varchar(10) NOT NULL,
     "ville" varchar(25) NOT NULL,
     "pays" varchar(25) NOT NULL,
     "categorie" varchar(50) NOT NULL
);

-- Créer la table formateur.
CREATE TABLE "formateur" (
     "id" SERIAL PRIMARY KEY,
     "email" varchar(100) NOT NULL,
     "nom" varchar(50) NOT NULL,
     "prenom" varchar(50) NOT NULL
);

-- Créer la table notification_candidat.
CREATE TABLE "notification_candidat" (
     "id" SERIAL PRIMARY KEY,
     "id_candidat" int NOT NULL,
     "id_recruteur" int NOT NULL,
     "titre" varchar(50) NOT NULL,
     "categorie" varchar(50) NOT NULL,
     "date" date NOT NULL,
     "is_lu" boolean NOT NULL
);