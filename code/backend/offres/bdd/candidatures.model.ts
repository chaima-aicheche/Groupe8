import pool from '../bdd/pool.config';

class CandidaturesModel {

    /**
     * Méthode pour récupérer les deux dernières candidatures d'un candidat via l'id_candidat.
     * @param idCandidat :
     * @return : Les deux dernières candidatures du candidat.
     */
    async getLatestCandidaturesByIdCandidat(idCandidat: number){
        const query = 'SELECT * FROM candidatures WHERE "id_candidat" = $1 ORDER BY "date_candidature" DESC LIMIT 2';
        const values = [idCandidat];

        try {
            const result = await pool.query(query, values);
            console.log(`Données de l'utilisateur \"${idCandidat}\" récupérées avec succès.`);
            return result.rows;
        } catch (error) {
            console.error(`Echec de la récupération des données de l'utilisateur \"${idCandidat}\" récupérées avec succès.`, error);
            throw error;
        }
    }
}

export default CandidaturesModel;
