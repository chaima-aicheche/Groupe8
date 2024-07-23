import { QueryResult } from 'pg';
import pool from '../bdd/pool.config';

class FormateurModel {
    async IsUserInDb(email: string, typeUser : string) {
        const query = `SELECT * FROM ${typeUser} WHERE email = $1`;
        const values = [email];
        let result: QueryResult;

        try {
            result = await pool.query(query, values);
            console.log(`Données du ${typeUser} "${email}" récupérées avec succès.`);
        } catch (error) {
            console.error(`Echec de la récupération des données du ${typeUser} "${email}".`, error);
            throw error;
        }
        return result.rows.length > 0;
    }

    async InsertFormateurInDb(email: string, nom: string, prenom: string)
    {
        const query = 'INSERT INTO formateur ("email", "nom", "prenom") VALUES ($1, $2, $3) RETURNING *';
        const values = [email, nom, prenom];

        let response : {code : number, message : string};
        let result: QueryResult;

        try
        {
            result = await pool.query(query, values);
            if(result.rows.length > 0)
                response = {code : 200, message : `Formateur "${email}" enregistré avec succès.`};
            else
                response = {code : 400, message : `Le formateur "${email}" n\'a pas pu être enregistré pour une raison inconnue.`};
        }
        catch (error)
        {
            console.error(`Echec de la récupération des données du formateur "${email}".`, error);
            throw error;
        }

        return response;
    }

    async UpdateFormateurInDb(email : string, nom: string, prenom: string, id : number)
    {
        const query = 'UPDATE formateur SET "email" = $1, "nom" = $2, "prenom" = $3 WHERE "id" = $4';
        const values = [email, nom, prenom, id];

        let response : {code : number, message : string};
        let result: QueryResult;

        try
        {
            result = await pool.query(query, values);
            if(result.rowCount != null && result.rowCount > 0)
                response = {code : 200, message : `Formateur "${email}" mis à jour avec succès.`};
            else
                response = {code : 400, message : `Le formateur "${email}" n\'a pas pu être mis à jour pour une raison inconnue.`};
        }
        catch (error)
        {
            console.error(`Echec de la mise à jour des données du formateur "${email}".`, error);
            throw error;
        }

        return response;
    }
}

export default FormateurModel;
