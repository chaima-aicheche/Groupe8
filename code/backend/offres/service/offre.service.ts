import OffreModel from "../bdd/offre.model";
import UtilsService from "../service/utils.service";

class OffreService {
    model = new OffreModel();
    utils: UtilsService = new UtilsService();

    constructor() {}

    async create(data: any){
        let response;

        // On contrôle les données reçues.
        if(!this.utils.controleData(data)){

        }

        response = {
            code: 200,
            message: "Offre créée avec succès."
        }
        return response;
    }
}

module.exports = OffreService;
