// @ts-ignore
import bcrypt from 'bcrypt';

import utilsService from '../service/utils.service';
import UpdateModel from "../bdd/update.model";
import UtilsService from "../service/utils.service";

class UpdateService {
    model = new UpdateModel();
    utils: UtilsService = new UtilsService();

    constructor() {}

    /**
     * Check if the email has the good format
     * @param email
     * @constructor
     * @private
     */
    private IsEmailOk(email : string)
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email != null && email != "" && emailRegex.test(email);
    }

    /**
     * Check if the user is already registered in the DB from his email
     * @param email
     * @return True if the user is already in the database, False is he isn't
     */
    async IsUserInDb(email : string)
    {
        let response: { code: number; message: string; };

        if(this.IsEmailOk(email.trim()))
        {
            if(await this.model.IsUserInDb(email))
                response = {
                    code: 400,
                    message: "L'utilisateur existe déjà."
                };
            else
                response = {
                    code: 200,
                    message: "Mise à jour réussie."
                };
        }
        else
        {
            response = {
                code: 400,
                message: "L'email est invalide."
            };
        }

        return response;
    }

    /**
     * Update l'email en DB si l'utilisateur existe en DB
     * @param oldEmail
     * @param newEmail
     * @constructor
     */
    async UpdateUserInDb(oldEmail : string, newEmail : string, password : string)
    {
        let response: { code: number; message: string; };

        if(await this.IsPasswordOk(password, oldEmail))
            if(await this.model.IsUserInDb(oldEmail))
                response = await this.model.UpdateUserInDb(oldEmail, newEmail);
            else
                response = {
                    code: 400,
                    message: "L'utilisateur n'existe pas."
                };
        else
            response = {
                code: 400,
                message: "Mauvais mot de passe."
            };


        return response;
    }

    private async IsPasswordOk(password: string, email : string)
    {
        const passwordDB : string = await this.model.GetPassordUser(email);

        if(password == "KO")
            return false;
        else
            return await bcrypt.compare(password, passwordDB);
    }
}

module.exports = UpdateService;
