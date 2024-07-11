import pool from '../bdd/pool.config';

class RegisterModel
{
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

    async InsertUserInDb(email : string, password : string, role : string)
    {
        const query = 'INSERT INTO credentials ("email", "password", "role") values ($1, $2, $3)';
        const values: string[] = [email, password, role];

        try
        {
            const result = await pool.query(query, values);
            return result.rows;
        }
        catch(error)
        {
            console.error("", error);
            throw error;
        }
    }
}

export default RegisterModel;
