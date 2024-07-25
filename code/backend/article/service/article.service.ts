import ArticleModel from "../bdd/article.model";
import UtilsService from "../service/utils.service";

class ArticleService {
    model = new ArticleModel();
    utils: UtilsService = new UtilsService();

    constructor() {}

    /**
     * Méthode pour créer un article.
     * @param data
     */
    async createArticle(data: any){
        let response;

        // On vérifie que les données sont correctes.
        if(!this.utils.controleDataCreation(data)){
            response = {
                code: 400,
                message: "Merci de fournir des données correctes."
            };
            return response;
        }

        // On sette les données pour la création.
        const idFormateur = Number(data.id_formateur);
        const titre = data.titre;
        const categorie = data.categorie;
        const description = data.description;
        const contenu = data.contenu;
        const image = data.image;
        const datePublication = new Date().toISOString();

        // On crée l'article.
        await this.model.createArticle(idFormateur, titre, categorie, description, contenu, image, datePublication);

        // On retourne la réponse.
        response = {
            code: 200,
            message: "Article créé avec succès."
        };
        return response;
    }

    /**
     * Méthode pour modifier un article existant.
     * @param data
     */
    async updateArticle(data: any){
        let response;

        // On vérifie que les données sont correctes.
        if(!this.utils.controleDataUpdate(data)){
            response = {
                code: 400,
                message: "Merci de fournir des données correctes."
            };
            return response;
        }

        // On sette les données pour la modification.
        const idArticle = Number(data.id_article);
        const titre = data.titre;
        const categorie = data.categorie;
        const description = data.description;
        const contenu = data.contenu;
        const image = data.image;

        // On modifie l'article.
        await this.model.updateArticle(idArticle, titre, categorie, description, contenu, image);

        // On retourne la réponse.
        response = {
            code: 200,
            message: "Article modifiée avec succès."
        };
        return response;
    }


    /**
     * Méthode pour supprimer un article.
     * @param data
     */
    async deleteArticle(data: any){
        let response;

        // On sette l'idArticle pour la suppression.
        const idArticle = Number(data.id_article);

        // On supprime d'abord toutes les lignes de la table historique_lecture où l'idArticle est présent.
        await this.model.deleteHistorique(idArticle);

        // Puis l'article lui-même.
        const checkDelete = await this.model.deleteArticle(idArticle);

        // Si aucun article n'a été trouvé avec cet ID.
        if(!checkDelete){
            response= {
                code: 400,
                message: "Aucune article n'a pu être trouvée avec cet ID."
            };
            return response;
        }

        // On retourne la réponse.
        response = {
            code: 200,
            message: "Article supprimé avec succès."
        };
        return response;
    }



    async getArticle(data: any){
        let response;

        // On sette l'idArticle pour la suppression.
        const idArticle = Number(data.id_article);

        const article = await this.model.getArticle(idArticle);
        if(article.length < 1){
            response = {
                code: 400,
                message: "Aucun article n'a pu être trouvé avec cet ID."
            };
            return response;
        }

        // On retourne la réponse.
        response = {
            code: 200,
            message: "Article récupéré avec succès.",
            article: article
        };
        return response;
    }

}

module.exports = ArticleService;
