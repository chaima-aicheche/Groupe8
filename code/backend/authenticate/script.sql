-- Créer la base.
CREATE DATABASE authenticate;

-- Se connecter à la base.
\c authenticate;

-- Créer la table.
CREATE TABLE "credentials" (
   "id" SERIAL PRIMARY KEY,
   "email" varchar(100) NOT NULL,
   "password" varchar(100) NOT NULL,
   "role" varchar(255)
);