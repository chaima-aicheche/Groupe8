import { QueryResult } from 'pg';
import pool from '../bdd/pool.config';

class RecruteurModel {
    async IsUserInDb(email: string, typeUser : string) {
        const query = `SELECT * FROM ${typeUser} WHERE email = $1`;
        const values = [email];
        let result: QueryResult;

        try {
            result = await pool.query(query, values);
            console.log(`Données du ${typeUser} \"${email}\" récupérées avec succès.`);
        } catch (error) {
            console.error(`Echec de la récupération des données du ${typeUser} \"${email}\".`, error);
            throw error;
        }
        return result.rows.length > 0;
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
                response = {code : 200, message : `Recruteur \"${email}\" enregistré avec succès.`};
            else
                response = {code : 400, message : `Le recruteur \"${email}\" n\'a pas pu être enregistré pour une raison inconnue.`};
        }
        catch (error)
        {
            console.error(`Echec de la récupération des données du recruteur \"${email}\".`, error);
            throw error;
        }

        return response;
    }

    async UpdateRecruteurInDb(email : string, num_telephone: string, raison_sociale: string, adresse: string
        , code_postal: string, ville: string, pays: string, categorie: string, id : number)
    {
        const query = 'UPDATE recruteur SET "email" = $1, "num_telephone" = $2, "raison_sociale" = $3, "adresse" = $4, "code_postal" = $5, "ville" = $6, "pays" = $7, "categorie" = $8 WHERE "id" = $9';
        const values = [email, num_telephone, raison_sociale, adresse, code_postal, ville, pays, categorie, id];

        let response : {code : number, message : string};
        let result: QueryResult;

        try
        {
            result = await pool.query(query, values);
            if(result.rowCount != null && result.rowCount > 0)
                response = {code : 200, message : `Recruteur \"${email}\" mis à jour avec succès.`};
            else
                response = {code : 400, message : `Le recruteur \"${email}\" n\'a pas pu être mis à jour pour une raison inconnue.`};
        }
        catch (error)
        {
            console.error(`Echec de la mise à jour des données du recruteur \"${email}\".`, error);
            throw error;
        }

        return response;
    }
}

export default RecruteurModel;
