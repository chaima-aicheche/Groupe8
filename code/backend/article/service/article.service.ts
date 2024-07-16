import ArticleModel from "../bdd/article.model";
import UtilsService from "../service/utils.service";

class ArticleService {
    model = new ArticleModel();
    utils: UtilsService = new UtilsService();

    constructor() {}

    /**
     * Méthode pour récupérer le dernier article consulté par un candidat.
     * @param data :: id du candidat.
     */
    async getLatestArticle(data: any){
        let response;

        // On récupère le dernier article consulté par un candidat via l'id_candidat.
        const id_candidat = Number(this.utils.sanitizeInput(data.id_candidat));
        const lastArticle = await this.model.getLatestArticle(id_candidat);

        // Si le candidat n'a aucun article récent en table.
        if(!lastArticle){
            response = {
                code: 400,
                message: "Ce candidat n'a consulté aucun article récemment.",
            }
            return response;
        }

        // On retourne le dernier article consulté.
        response = {
            code: 200,
            message: "Le dernier article consulté par le candidat a bien été récupéré.",
            id_article: lastArticle.id_article,
            id_candidat: lastArticle.id_candidat,
            date_lecture: lastArticle.date_lecture
        };

        return response;
    }


    /**
     * Méthode pour ajouter un modifier un article dans l'historique d'un candidat.
     * @param data
     */
    async addReadedArticle(data: any){
        let response;

        // On nettoie les données reçues.
        const idCandidat = Number(this.utils.sanitizeInput(data.id_candidat));
        const idArticle = Number(this.utils.sanitizeInput(data.id_article));

        const dateLecture: string = new Date().toISOString();


        // On vérifie si le candidat a déjç un article en base.
        const lastArticle = await this.model.getLatestArticle(idCandidat);
        if(!lastArticle){
            await this.model.addReadedArticle(idArticle, idCandidat, dateLecture);

            response = {
                code: 200,
                message: "Ajout de l'article dans l'historique du candidat réussie."
            };
        }
        else{
           await this.model.updateReadedArticle(idArticle, idCandidat, dateLecture);

            response = {
                code: 200,
                message: "Modification de l'article dans l'historique du candidat réussie."
            };
        }

        return response;
    }

}

module.exports = ArticleService;
