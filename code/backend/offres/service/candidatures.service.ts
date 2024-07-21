import CandidaturesModel from "../bdd/candidatures.model";
import UtilsService from "../service/utils.service";

class CandidaturesService {
    model = new CandidaturesModel();
    utils: UtilsService = new UtilsService();

    constructor() {}

    /**
     * Méthode appelée pour récupérer les deux dernières candidatures d'un candidat.
     * @param data :: Id du candidat.
     * @return: reponse
     */
    async getLatestCandidatures(data: any) {
        let response;

        // On récupère les deux dernières candidatures d'un candidat.
        const latestCandidatures = await this.model.getLatestCandidaturesByIdCandidat(data.id_candidat);

        // Si aucune candidature n'a été trouvé pour ce candidat.
        if(latestCandidatures.length < 1){
            response = {
                code: 400,
                message: "Aucune candidature pour ce candidat."
            }
            return response;
        }

        // On retourne les candidatures du candidat.
        response = {
          code: 200,
          message: "Les candidatures les plus récentes de ce candidat ont bien été récupérées.",
          candidatures: latestCandidatures
        };

        return response;
    }


    /**
     * Méthode appelée pour enregistrer la candidature d'un candidat à une offre.
     * @param data
     */
    async applyToOffer(data: any){
        let response;

        // On nettoie les données reçues et on set les valeurs nécessaires.
        const idOffre: number = data.id_offre;
        const idCandidat:number = data.id_candidat;
        const statut = "En attente";
        const dateCandidature: string = new Date().toISOString();

        // On vérifie si le candidat a déjà postulé à cette offre.
        const isAlreadyApplied = await this.alreadyApplied(idOffre, idCandidat);
        if(!isAlreadyApplied){
            response = {
                code: 400,
                message: "Le candidat a déjà postulé à cette offre."
            };
            return response;
        }

        // On enregistre la candidature.
        await this.model.candidatApplyToOffer(idOffre, idCandidat, statut, dateCandidature);
        response = {
            code: 200,
            message: "La candidature a bien été enregistrée."
        };

        return response;
    }


    /**
     * Méthode appelée pour répondre à une candidature.
     * @param data
     */
    async answerToApply(data: any){
        let response;

        // On nettoie les données reçues et on set les valeurs nécessaires.
        const idCandidature: number = data.id_candidature;
        const statut: string = data.statut;

        // On update le statut de la candidature.
        await this.model.answerToApply(idCandidature, statut);
        const message = statut === "Acceptée" ? "La candidature a bien été acceptée." : "La candidature a bien été refusée.";
        response = {
            code: 200,
            message: message
        };

        return response;
    }


    /**
     * Méthode pour vérifier si le candidat a déjà postulé à une offre.
     * @param idOffre :: Id de l'offre.
     * @param idCandidat :: Id du candidat.
     * @reuturn: boolean.
     */
    async alreadyApplied(idOffre: number, idCandidat: number){
        const checkCandidature = await this.model.findCandidatureByIdOffreAndIdCandidat(idOffre, idCandidat);

        return checkCandidature.length < 1;
    }

}

module.exports = CandidaturesService;
