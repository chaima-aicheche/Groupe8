import { QueryResult } from 'pg';
import pool from '../bdd/pool.config';

class CandidatModel {
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
                response = {code : 200, message : `Candidat \"${email}\" enregistré avec succès.`};
            else
                response = {code : 400, message : `Le candidat \"${email}\" n\'a pas pu être enregistré pour une raison inconnue.`};
        }
        catch (error)
        {
            console.error(`Echec de la création des données du candidat \"${email}\".`, error);
            throw error;
        }

        return response;
    }

    async UpdateCandidatInDb(email : string, num_telephone : string, nom : string, prenom : string, adresse : string
        , code_postal : string, ville : string, pays : string, genre : string, cv : string, id : number)
    {
        const query = 'UPDATE candidat SET "email" = $1, "num_telephone" = $2, "nom" = $3, "prenom" = $4, "adresse" = $5, "code_postal" = $6, "ville" = $7, "pays" = $8, "genre" = $9, "cv" = $10 WHERE "id" = $11';
        const values = [email, num_telephone, nom, prenom, adresse, code_postal, ville, pays, genre, cv, id];

        let response : {code : number, message : string};
        let result: QueryResult;

        try
        {
            result = await pool.query(query, values);
            if(result.rowCount != null && result.rowCount > 0)
                response = {code : 200, message : `Candidat \"${email}\" mis à jour avec succès.`};
            else
                response = {code : 400, message : `Le candidat \"${email}\" n\'a pas pu être mis à jour pour une raison inconnue.`};
        }
        catch (error)
        {
            console.error(`Echec de la mise à jour des données du candidat \"${email}\".`, error);
            throw error;
        }

        return response;
    }
}

export default CandidatModel;
