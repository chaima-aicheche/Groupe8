import pool from '../bdd/pool.config';

class CreationModel {

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
}

export default CreationModel;
