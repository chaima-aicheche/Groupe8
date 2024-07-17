import RecruteurModel from "../bdd/recruteur.model";
import UtilsService from "../service/utils.service";

class RecruteurService {
    model = new RecruteurModel();
    utils: UtilsService = new UtilsService();

    constructor() {}

    async InsertRecruteurInDb(email: string, num_telephone: string, raison_sociale: string, adresse: string
        , code_postal: string, ville: string, pays: string, categorie: string)
    {
        let response: { code: number; message: string; } = this.AreDataRecruteurOk(num_telephone, raison_sociale
            , adresse, code_postal, ville, pays, categorie);

        if(response.code == 200)
        {
            if(await this.model.IsUserInDb(email, "recruteur"))
                response = {
                    code: 400,
                    message: "MS user : Le candidat existe déjà'."
                };
            else
                response = await this.model.InsertRecruteurInDb(email, num_telephone, raison_sociale, adresse, code_postal
                    , ville, pays, categorie);
        }

        return response;
    }

    private AreDataRecruteurOk(num_telephone: string, raison_sociale: string, adresse: string
        , code_postal: string, ville: string, pays: string, categorie: string)
    {
        let response: { code: number; message: string; } = {code : 200, message : "Check réussi."};

        if(num_telephone == null || num_telephone == "") response = {code : 400, message : "Le numéro de téléphone est obligatoire"};
        else if(raison_sociale == null || raison_sociale == "") response = {code : 400, message : "La raison sociale est obligatoire"};
        else if(adresse == null || adresse == "") response = {code : 400, message : "L'adresse est obligatoire"};
        else if(code_postal == null || code_postal == "") response = {code : 400, message : "Le code postal est obligatoire"};
        else if(ville == null || ville == "") response = {code : 400, message : "La ville est obligatoire"};
        else if(pays == null || pays == "") response = {code : 400, message : "Le pays est obligatoire"};
        else if(categorie == null || categorie == "") response = {code : 400, message : "La catégorie est obligatoire"};

        return response;
    }

    async UpdateRecruteurInDb(oldEmail : string, newEmail : string, num_telephone: string, raison_sociale: string, adresse: string
        , code_postal: string, ville: string, pays: string, categorie: string, id : number)
    {
        let response: { code: number; message: string; };

        if(await this.model.IsUserInDb(oldEmail, "recruteur"))
            response = await this.model.UpdateRecruteurInDb(newEmail, num_telephone, raison_sociale, adresse, code_postal
                , ville, pays, categorie, id);
        else
            response = {
                code: 400,
                message: "Le recruteur n'existe pas."
            };

        return response;
    }
}

module.exports = RecruteurService;
