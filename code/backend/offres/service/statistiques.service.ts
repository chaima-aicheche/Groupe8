import StatistiquesModel from "../bdd/statistiques.model";
import UtilsService from "../service/utils.service";

class StatistiquesService {
    model = new StatistiquesModel();
    utils: UtilsService = new UtilsService();

    constructor() {}

    /**
     * Méthode appelée pour récupérer les statistiques des candidatures d'un candidat.
     * @param data :: Id du candidat.
     * @return: reponse
     */
    async getStatistiques(data: any) {
        let response;

        // On récupère le nombre de candidature totale d'un candidat.
        const nbCandidaturesTotales = await this.model.getCandidaturesByIdCandidat(data.id_candidat);

        // On vérifie si le candidat a bien des candidatures en base.
        if(nbCandidaturesTotales < 1){
            response = {
                code: 400,
                message: "Aucune candidatures pour ce candidat."
            }
            return response;
        }

        // On récupère les différentes candidatures selon leur statut
        const nbCandidaturesEnAttente = await this.model.getCandidaturesByStatut(data.id_candidat, "En attente");
        const nbCandidaturesAccepetees = await this.model.getCandidaturesByStatut(data.id_candidat, "Acceptée");
        const nbCandidaturesRefusees = await this.model.getCandidaturesByStatut(data.id_candidat, "Refusée");

        // On calcule les pourcentages des différents statuts.
        const percentEnAttente = this.calculPourcentage(nbCandidaturesEnAttente, nbCandidaturesTotales);
        const percentAcceptee = this.calculPourcentage(nbCandidaturesAccepetees, nbCandidaturesTotales);
        const percentRefusee = this.calculPourcentage(nbCandidaturesRefusees, nbCandidaturesTotales);


        response = {
            code: 200,
            message : "Les statistiques du candidat ont bien été récupérées",
            percentEnAttente: percentEnAttente,
            percentAcceptee: percentAcceptee,
            percentRefusee: percentRefusee
        };

        return response;
    }


    /**
     * Méthode pour calculer un pourcentage.
     * @param nbCandidatureCategorie :: Nombre de candidatures de la categorie.
     * @param nbCandidatureTotal :: Nombre de candidatures total.
     * @return: pourcentage.
     */
    calculPourcentage(nbCandidatureCategorie: number, nbCandidatureTotal: number){
        return (nbCandidatureCategorie / nbCandidatureTotal) * 100;
    }

}

module.exports = StatistiquesService;
