import pool from '../bdd/pool.config';

class StatistiquesModel {

    /**
     * Méthode pour récupérer le nombre de candidature total d'un candidat via l'id_candidat.
     * @param idCandidat.
     * @return : Nombre de candidature du candidat.
     */
    async getCandidaturesByIdCandidat(idCandidat: number){
        const query = 'SELECT COUNT(*) FROM candidatures WHERE "id_candidat" = $1';
        const values = [idCandidat];

        try {
            const result = await pool.query(query, values);
            console.log(`Données de l'utilisateur \"${idCandidat}\" récupérées avec succès.`);
            return result.rows[0].count;
        } catch (error) {
            console.error(`Echec de la récupération des données de l'utilisateur \"${idCandidat}\" récupérées avec succès.`, error);
            throw error;
        }
    }


    /**
     * Méthode pour récupérer le nombre de candidature selon un statut particulier d'un candidat via l'id_candidat.
     * @param idCandidat.
     * @param statut.
     * @return : Nombre de candidature du candidat selon le statut demandé.
     */
    async getCandidaturesByStatut(idCandidat: number, statut: string){
        const query = 'SELECT COUNT(*) FROM candidatures WHERE "id_candidat" = $1 AND "statut" = $2';
        const values = [idCandidat, statut];

        try {
            const result = await pool.query(query, values);
            console.log(`Données de l'utilisateur \"${idCandidat}\" récupérées avec succès.`);
            return result.rows[0].count;
        } catch (error) {
            console.error(`Echec de la récupération des données de l'utilisateur \"${idCandidat}\" récupérées avec succès.`, error);
            throw error;
        }
    }
}

export default StatistiquesModel;
