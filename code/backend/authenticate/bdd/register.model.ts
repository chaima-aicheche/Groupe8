import pool from '../bdd/pool.config';

class RegisterModel{

    async getData(){
        const query = 'SELECT * FROM table_name WHERE "column_name" = $1';
        const values = ["$1"];

        try {
            const result = await pool.query(query, values);
            console.log("Données récupérées avec succès.");
            return result.rows;
        } catch (error) {
            console.error("", error);
            throw error;
        }
    }

}

export default RegisterModel;
