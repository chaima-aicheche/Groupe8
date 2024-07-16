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
        }

        // On retourne les candidatures du candidat.
        response = {
          code: 200,
          message: "Les candidatures les plus récentes de ce candidat ont bien été récupérées.",
          candidatures: latestCandidatures
        };

        return response;
    }

}

module.exports = CandidaturesService;
