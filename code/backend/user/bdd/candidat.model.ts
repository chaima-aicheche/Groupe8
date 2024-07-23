import { QueryResult } from 'pg';
import pool from '../bdd/pool.config';

class CandidatModel {
    async IsUserInDb(email: string, typeUser : string) {
        const query = 'SELECT * FROM ' + typeUser + ' WHERE "email" = $1';
        const values = [email];
        let result: QueryResult;

        try {
            result = await pool.query(query, values);
            console.log('Données du ' + typeUser + ' \"${email}\" récupérées avec succès.');
        } catch (error) {
            console.error('Echec de la récupération des données du ' + typeUser + ' \"${email}\".', error);
            throw error;
        }
        return result.rows.length > 0;
    }

    async InsertCandidatInDb(email: string, num_telephone: string, nom: string, prenom: string, adresse: string
        , code_postal: string, ville: string, pays: string, genre: string, cv: string)
    {
        const query = 'INSERT INTO candidat ("email", "num_telephone", "nom", "prenom", "adresse", "code_postal", "ville", "pays", "genre", "cv") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
        const values = [email, num_telephone, nom, prenom, adresse, code_postal, ville, pays, genre, cv];

        let response : {code : number, message : string};
        let result: QueryResult;

        try
        {
            result = await pool.query(query, values);
            if(result.rows.length > 0)
                response = {code : 200, message : 'Candidat \"${email}\" enregistré avec succès.'};
            else
                response = {code : 400, message : 'Le candidat \"${email}\" n\'a pas pu être enregistré pour une raison inconnue.'};
        }
        catch (error)
        {
            console.error('Echec de la récupération des données du candidat \"${email}\".', error);
            throw error;
        }

        return response;
    }

    async InsertRecruteurInDb(email: string, num_telephone: string, raison_sociale: string, adresse: string
        , code_postal: string, ville: string, pays: string, categorie: string)
    {
        const query = 'INSERT INTO recruteur ("email", "num_telephone", "raison_sociale", "adresse", "code_postal", "ville", "pays", "categorie") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        const values = [email, num_telephone, raison_sociale, adresse, code_postal, ville, pays, categorie];

        let response : {code : number, message : string};
        let result: QueryResult;

        try
        {
            result = await pool.query(query, values);
            if(result.rows.length > 0)
                response = {code : 200, message : 'Recruteur \"${email}\" enregistré avec succès.'};
            else
                response = {code : 400, message : 'Le recruteur \"${email}\" n\'a pas pu être enregistré pour une raison inconnue.'};
        }
        catch (error)
        {
            console.error('Echec de la récupération des données du recruteur \"${email}\".', error);
            throw error;
        }

        return response;
    }
}

export default CandidatModel;
