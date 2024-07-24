import pool from '../bdd/pool.config';

class ArticleModel {


    /**
     * Méthode pour créer une offre.
     * @param idFormateur
     * @param titre
     * @param categorie
     * @param description
     * @param contenu
     * @param image
     * @param datePublication
     */
    async createArticle(idFormateur: number, titre: string, categorie: string, description: string, contenu: string, image: string, datePublication: string){
        const query = 'INSERT INTO "article" ("id_formateur", "titre", "categorie", "description", "contenu", "image", "date_publication") VALUES ($1, $2, $3, $4, $5, $6, $7)';
        const values = [idFormateur, titre, categorie, description, contenu, image, datePublication];

        try {
            const result = await pool.query(query, values);
            console.log(`Création de l'article \"${titre}\" réussie avec succès.`);
            return result.rows;
        } catch (error) {
            console.error(`Echec de la création de l'article \"${titre}\".`, error);
            throw error;
        }
    }


    /**
     * Méthode pour modifier un article existant.
     * @param idArticle
     * @param titre
     * @param categorie
     * @param description
     * @param contenu
     * @param image
     */
    async updateArticle(idArticle: number, titre: string, categorie: string, description: string, contenu: string, image: string){
        const query = 'UPDATE "article" SET "titre"=$1, "categorie"=$2, "description"=$3, "contenu"=$4, "image"=$5 WHERE "id"=$6';
        const values = [titre, categorie, description, contenu, image, idArticle];

        try {
            const result = await pool.query(query, values);
            console.log(`Modification de l'article \"${titre}\" réussie avec succès.`);
            return result.rows;
        } catch (error) {
            console.error(`Echec de la modification de l'article \"${titre}\".`, error);
            throw error;
        }
    }


    /**
     * Méthode pour supprimer un article dans la table article.
     * @param idArticle
     */
    async deleteArticle(idArticle: number){
        const query = 'DELETE FROM "article" WHERE "id" = $1 RETURNING *';
        const values = [idArticle];

        try {
            const result = await pool.query(query, values);
            console.log(`Suppression de l'article n°${idArticle} réussie avec succès.`);
            return result.rows[0];
        } catch (error) {
            console.error(`Echec de la suppression de l'article n°${idArticle}.`, error);
            throw error;
        }

    }


    /**
     * Méthode pour supprimer toutes les lignes où est renseigné le même idArticle dans la table historique_lecture.
     * @param idArticle
     */
    async deleteHistorique(idArticle: number){
        const query = 'DELETE FROM "historique_lecture" WHERE "id_article" = $1 RETURNING *';
        const values = [idArticle];

        try {
            const result = await pool.query(query, values);
            console.log(`Suppression de l'article n°${idArticle} dans l'historique réussie avec succès.`);
            return result.rows[0];
        } catch (error) {
            console.error(`Echec de la suppression de l'article n°${idArticle} dans l'historique.`, error);
            throw error;
        }
    }


    /**
     * Méthode pour récupérer toutes les données d'un article.
     * @param idArticle
     */
    async getArticle(idArticle: number){
        const query = 'SELECT * FROM "article" WHERE "id" = $1';
        const values = [idArticle];

        try {
            const result = await pool.query(query, values);
            console.log(`Récupération de l'article n°${idArticle} réussie avec succès.`);
            return result.rows;
        } catch (error) {
            console.error(`Echec de la récupération de l'article n°${idArticle}.`, error);
            throw error;
        }
    }
}

export default ArticleModel;
