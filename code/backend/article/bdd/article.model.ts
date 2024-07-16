import pool from '../bdd/pool.config';

class ArticleModel {

    /**
     * Méthode pour récupérer les données d'un utilisateur via son email.
     * @param email
     * @return : id, email, password et role de l'utilisateur.
     */
    async getLatestArticle(id_candidat: number){
        const query = 'SELECT * FROM historique_lecture WHERE "id_candidat" = $1';
        const values = [id_candidat];

        try {
            const result = await pool.query(query, values);
            console.log(`Données de l'utilisateur \"${id_candidat}\" récupérées avec succès.`);
            return result.rows[0];
        } catch (error) {
            console.error(`Echec de la récupération des données de l'utilisateur \"${id_candidat}\" récupérées avec succès.`, error);
            throw error;
        }
    }


    /**
     * Méthode ajouter un article dans l'historique pour un candidat.
     * @return : id, email, password et role de l'utilisateur.
     * @param idCandidat
     * @param idArticle
     * @param dateLecture
     */
    async addReadedArticle( idArticle: number, idCandidat: number, dateLecture: any){
        const query = 'INSERT INTO "historique_lecture" ("id_article", "id_candidat", "date_lecture") VALUES ($1, $2, $3)';
        const values = [idArticle, idCandidat, dateLecture];

        try {
            const result = await pool.query(query, values);
            console.log(`Ajout d'un article pour l'historique du candidat \"${idCandidat}\" effectué avec succès.`);
            return result.rows[0];
        } catch (error) {
            console.error(`Echec de l'ajout d'un article pour l'historique du candidat \"${idCandidat}\".`, error);
            throw error;
        }
    }

    /**
     * Méthode modifier un article dans l'historique concernant un candidat.
     * @return : id, email, password et role de l'utilisateur.
     * @param idCandidat
     * @param idArticle
     * @param dateLecture
     */
    async updateReadedArticle( idArticle: number, idCandidat: number, dateLecture: any){
        const query = 'UPDATE "historique_lecture" SET "id_article" = $1, "date_lecture" = $3 WHERE "id_candidat" = $2';
        const values = [idArticle, idCandidat, dateLecture];

        try {
            const result = await pool.query(query, values);
            console.log(`Modification d'un article pour l'historique du candidat \"${idCandidat}\" effectué avec succès.`);
            return result.rows[0];
        } catch (error) {
            console.error(`Echec de la modification d'un article pour l'historique du candidat \"${idCandidat}\".`, error);
            throw error;
        }
    }
}

export default ArticleModel;
