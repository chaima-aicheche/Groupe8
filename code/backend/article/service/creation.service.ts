import CreationModel from "../bdd/creation.model";
import UtilsService from "../service/utils.service";

class CreationService {
    model = new CreationModel();
    utils: UtilsService = new UtilsService();

    constructor() {}

}

module.exports = CreationService;
