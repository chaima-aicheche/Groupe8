import FormateurModel from "../bdd/formateur.model";
import UtilsService from "../service/utils.service";

class FormateurService {
    model = new FormateurModel();
    utils: UtilsService = new UtilsService();

    constructor() {}

    private AreDataFormateurOk(email: string, nom: string, prenom: string)
    {
        let response: { code: number; message: string; } = {code : 200, message : "Check réussi."};

        if(email == null || email == "") response = {code : 400, message : "L'email est obligatoire'"};
        else if(nom == null || nom == "") response = {code : 400, message : "Le nom est obligatoire"};
        else if(prenom == null || prenom == "") response = {code : 400, message : "Le prenom est obligatoire"};

        return response;
    }

    async InsertFormateurInDb(email: string, nom: string, prenom: string)
    {
        let response: { code: number; message: string; } = this.AreDataFormateurOk(email, nom, prenom);

        if(response.code == 200)
        {
            if(await this.model.IsUserInDb(email, "formateur"))
                response = {
                    code: 400,
                    message: "MS user : Le formateur existe déjà'."
                };
            else
                response = await this.model.InsertFormateurInDb(email, nom, prenom);
        }

        return response;
    }

    async UpdateFormateurInDb(oldEmail : string, newEmail : string, nom: string, prenom: string, id : number)
    {
        let response: { code: number; message: string; };

        if(await this.model.IsUserInDb(oldEmail, "formateur"))
            response = await this.model.UpdateFormateurInDb(newEmail, nom, prenom, id);
        else
            response = {
                code: 400,
                message: "Le formateur n'existe pas."
            };

        return response;
    }
}

module.exports = FormateurService;
