import pool from '../bdd/pool.config';

class UpdateModel
{
    /**
     * Check if the user is already in the DB
     * @param email
     * @constructor
     */
    async IsUserInDb(email : string)
    {
        const query = 'SELECT * FROM credentials WHERE "email" = $1';
        const values : string[] = [email];

        try
        {
            const result = await pool.query(query, values);
            return result.rows.length > 0;
        }
        catch(error)
        {
            console.error("", error);
            throw error;
        }
    }

    /**
     * Update l'email en DB
     * @param oldEmail
     * @param newEmail
     * @constructor
     */
    async UpdateUserInDb(oldEmail : string, newEmail : string)
    {
        const query = 'UPDATE credentials SET "email" = $1 WHERE "email" = $2';
        const values: string[] = [newEmail, oldEmail];

        let response: { code: number; message: string; };

        try
        {
            const result = await pool.query(query, values);
            if(result.rowCount != null && result.rowCount > 0)
                response = {code : 200, message : "Mise à jour réussie."}
            else
                response = {code : 400, message : "Une erreur est survenue, mise à jour impossible"}
            return response;
        }
        catch(error)
        {
            console.error("", error);
            throw error;
        }
    }

    async GetPassordUser(email: string)
    {
        const query = 'SELECT password FROM credentials WHERE "email" = $1';
        const values : string[] = [email];

        try
        {
            const result = await pool.query(query, values);

            if(result.rowCount != null && result.rowCount > 0)
                return result.rows[0].password;
            else
                return "KO";
        }
        catch(error)
        {
            console.error("", error);
            throw error;
        }
    }
}

export default UpdateModel;
