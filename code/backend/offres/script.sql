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





-- DONNEES TEST POUR DEVELOPPEMENT STATITISTIQUES SUR CANDIDATURES --

-- INSERT INTO "candidatures" ("id_offre", "id_candidat", "statut", "date_candidature") VALUES
--     (1, 1, 'En attente', '2023-07-01 10:00:00'),
--     (2, 1, 'En attente', '2023-07-02 11:00:00'),
--     (3, 1, 'En attente', '2023-07-03 12:00:00'),
--     (4, 1, 'En attente', '2023-07-04 13:00:00'),
--     (5, 1, 'En attente', '2023-07-05 14:00:00'),
--     (6, 1, 'En attente', '2023-07-06 15:00:00'),
--     (7, 1, 'En attente', '2023-07-07 16:00:00'),
--     (8, 1, 'Refusée', '2023-07-08 17:00:00'),
--     (9, 1, 'Refusée', '2023-07-09 18:00:00'),
--     (10, 1, 'Refusée', '2023-07-10 19:00:00'),
--     (11, 1, 'Refusée', '2023-07-11 20:00:00'),
--     (12, 1, 'Refusée', '2023-07-12 21:00:00'),
--     (13, 1, 'Refusée', '2023-07-13 22:00:00'),
--     (14, 1, 'Refusée', '2023-07-14 23:00:00'),
--     (15, 1, 'Refusée', '2023-07-15 00:00:00'),
--     (16, 1, 'Acceptée', '2023-07-16 01:00:00'),
--     (17, 1, 'Acceptée', '2023-07-17 02:00:00'),
--     (18, 1, 'Acceptée', '2023-07-18 03:00:00'),
--     (19, 1, 'Acceptée', '2023-07-19 04:00:00'),
--     (20, 1, 'Acceptée', '2023-07-20 05:00:00');

-- INSERT INTO "offres" ("id_recruteur", "titre", "adresse", "code_postal", "ville", "pays", "domaine", "description", "image", "date_publication") VALUES
--     (1, 'Développeur Java', '123 Rue de Java', '75001', 'Paris', 'France', 'Informatique', 'Développement d''applications Java', 'image.svg', '2023-01-01 10:00:00'),
--     (2, 'Ingénieur DevOps', '456 Rue de DevOps', '75002', 'Paris', 'France', 'Informatique', 'Mise en place et gestion des infrastructures', 'image.svg', '2023-01-02 11:00:00'),
--     (3, 'Chef de Projet', '789 Rue de Projet', '75003', 'Paris', 'France', 'Gestion de projet', 'Gestion et coordination de projets', 'image.svg', '2023-01-03 12:00:00'),
--     (4, 'Designer UI/UX', '101 Rue de Design', '75004', 'Paris', 'France', 'Design', 'Conception d''interfaces utilisateur', 'image.svg', '2023-01-04 13:00:00'),
--     (5, 'Data Scientist', '202 Rue des Données', '75005', 'Paris', 'France', 'Informatique', 'Analyse de données et machine learning', 'image.svg', '2023-01-05 14:00:00'),
--     (6, 'Administrateur Réseau', '303 Rue des Réseaux', '75006', 'Paris', 'France', 'Informatique', 'Gestion des réseaux informatiques', 'image.svg', '2023-01-06 15:00:00'),
--     (7, 'Consultant IT', '404 Rue du Conseil', '75007', 'Paris', 'France', 'Informatique', 'Consultation et conseil en informatique', 'image.svg', '2023-01-07 16:00:00'),
--     (8, 'Analyste Sécurité', '505 Rue de la Sécurité', '75008', 'Paris', 'France', 'Informatique', 'Analyse et gestion de la sécurité informatique', 'image.svg', '2023-01-08 17:00:00'),
--     (9, 'Architecte Cloud', '606 Rue du Cloud', '75009', 'Paris', 'France', 'Informatique', 'Conception et gestion des infrastructures cloud', 'image.svg', '2023-01-09 18:00:00'),
--     (10, 'Développeur Front-end', '707 Rue du Front-end', '75010', 'Paris', 'France', 'Informatique', 'Développement d''interfaces web', 'image.svg', '2023-01-10 19:00:00'),
--     (11, 'Développeur Back-end', '808 Rue du Back-end', '75011', 'Paris', 'France', 'Informatique', 'Développement de la logique serveur', 'image.svg', '2023-01-11 20:00:00'),
--     (12, 'Chef de Produit', '909 Rue du Produit', '75012', 'Paris', 'France', 'Marketing', 'Gestion et développement de produits', 'image.svg', '2023-01-12 21:00:00'),
--     (13, 'Responsable Marketing', '1010 Rue du Marketing', '75013', 'Paris', 'France', 'Marketing', 'Développement et mise en œuvre de stratégies marketing', 'image.svg', '2023-01-13 22:00:00'),
--     (14, 'Community Manager', '1111 Rue des Réseaux Sociaux', '75014', 'Paris', 'France', 'Communication', 'Gestion des réseaux sociaux et de la communauté', 'image.svg', '2023-01-14 23:00:00'),
--     (15, 'Chargé de Communication', '1212 Rue de la Communication', '75015', 'Paris', 'France', 'Communication', 'Réalisation et gestion des communications internes et externes', 'image.svg', '2023-01-15 00:00:00'),
--     (16, 'Comptable', '1313 Rue des Comptes', '75016', 'Paris', 'France', 'Finance', 'Gestion de la comptabilité et des finances', 'image.svg', '2023-01-16 01:00:00'),
--     (17, 'Juriste', '1414 Rue du Droit', '75017', 'Paris', 'France', 'Juridique', 'Gestion des affaires juridiques', 'image.svg', '2023-01-17 02:00:00'),
--     (18, 'Assistant RH', '1515 Rue des Ressources Humaines', '75018', 'Paris', 'France', 'Ressources Humaines', 'Gestion administrative des ressources humaines', 'image.svg', '2023-01-18 03:00:00'),
--     (19, 'Consultant SEO', '1616 Rue du Référencement', '75019', 'Paris', 'France', 'Marketing', 'Optimisation du référencement sur les moteurs de recherche', 'image.svg', '2023-01-19 04:00:00'),
--     (20, 'Développeur Mobile', '1717 Rue du Mobile', '75020', 'Paris', 'France', 'Informatique', 'Développement d''applications mobiles', 'image.svg', '2023-01-20 05:00:00');

