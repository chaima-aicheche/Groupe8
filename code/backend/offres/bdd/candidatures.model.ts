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
            console.log(`Dernières candidatures du candidat \"${idCandidat}\" récupérées avec succès.`);
            return result.rows;
        } catch (error) {
            console.error(`Echec de la récupération des dernières candidatures du candidat \"${idCandidat}\".`, error);
            throw error;
        }
    }


    /**
     * Méthode pour enregistrer la candidature d'un candidat.
     * @param idOffre :: Id de l'offre candidatée.
     * @param idCandidat :: Id du candidat.
     * @param statut :: statut de la candidature.
     * @param dateCandidature :: Date de la candidature.
     * @return.
     */
    async candidatApplyToOffer(idOffre: number, idCandidat: number,statut: string, dateCandidature: string){
        const query = 'INSERT INTO "candidatures" ("id_offre", "id_candidat", "statut", "date_candidature") VALUES ($1, $2, $3, $4)';
        const values = [idOffre, idCandidat, statut, dateCandidature];

        try {
            const result = await pool.query(query, values);
            console.log(`La candidature de l'utilisateur \"${idCandidat}\" à l'offre \"${idOffre}\" a bien été enregistrée.`);
            return;
        } catch (error) {
            console.error(`Echec de l'enregistrement de la candidature de l'utilisateur \"${idCandidat}\" à l'offre \"${idOffre}\".`, error);
            throw error;
        }
    }


    /**
     * Méthode pour trouver une candidature via l'id_offre et l'id_candidat.
     * @param idOffre :: Id de l'offre.
     * @param idCandidat :: Id du candidat.
     * @return : Candidature trouvée.
     */
    async findCandidatureByIdOffreAndIdCandidat(idOffre: number, idCandidat: number){
        const query = 'SELECT * FROM candidatures WHERE "id_offre" = $1 AND "id_candidat" = $2';
        const values = [idOffre, idCandidat];

        try {
            const result = await pool.query(query, values);
            console.log(`Données récupérées avec succès.`);
            return result.rows;
        } catch (error) {
            console.error(`Echec de la récupération des données.`, error);
            throw error;
        }
    }


    /**
     * Méthode pour mettre à jour le statut d'une candidature.
     * @param idCandidature :: Id de la candidature.
     * @param statut :: Nouveau statut.
     */
    async answerToApply(idCandidature: number, statut: string){
        const query = 'UPDATE "candidatures" SET "statut" = $2 WHERE "id" = $1';
        const values = [idCandidature, statut];

        try {
            const result = await pool.query(query, values);
            console.log(`Statut de la candidature \"${idCandidature}\" mis à jour avec succès.`);
            return result.rows;
        } catch (error) {
            console.error(`Echec de la mise à jour du statut de la candidature \"${idCandidature}\".`, error);
            throw error;
        }
    }
}

export default CandidaturesModel;
