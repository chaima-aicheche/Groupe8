import CandidatModel from "../bdd/candidat.model";
import UtilsService from "../service/utils.service";

class CandidatService {
    model = new CandidatModel();
    utils: UtilsService = new UtilsService();

    constructor() {}

}

module.exports = CandidatService;
