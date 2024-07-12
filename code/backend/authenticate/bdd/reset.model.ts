import pool from '../bdd/pool.config';

class ResetModel{

    /**
     * Méthode pour récupérer les données d'un utilisateur via son email.
     * @param email
     * @return : id, email, password et role de l'utilisateur.
     */
    async getUserData(email: string){
        const query = 'SELECT * FROM credentials WHERE "email" = $1';
        const values = [email];

        try {
            const result = await pool.query(query, values);
            console.log(`Données de l'utilisateur \"${email}\" récupérées avec succès.`);
            return result.rows;
        } catch (error) {
            console.error(`Echec de la récupération des données de l'utilisateur \"${email}\" récupérées avec succès.`, error);
            throw error;
        }
    }




    async updatePassword(email: string, password: string){
        const enCommande: number = 1;

        const query = 'UPDATE credentials SET "password" = $1 WHERE "email" = $2 RETURNING *';
        const values = [password, email];

        try {
            const result = await pool.query(query, values);
            console.log(`Modification du mot de passe de l'utilisateur \"${email}\" réussie.`);
            return true;
        } catch (error) {
            console.error(`Echec de la modification du mot de passe de l'utilisateur \"${email}\".`, error);
            throw error;
        }
    }
}

export default ResetModel;
