// @ts-ignore
import bcrypt from 'bcrypt';
import * as generatePassword from 'generate-password';
import * as nodeMailer from 'nodemailer';

import UtilsService from '../service/utils.service';
import ResetModel from "../bdd/reset.model";

class ServiceReset {
    model = new ResetModel();
    utils: UtilsService = new UtilsService();

    constructor() {
    }

    /**
     * Méthode pour réinitialiser le mot de passe d'un utilisateur.
     * @param user :: données remontées par le front.
     * @return : objet contenant le code de retour et un message d'erreur ou de validation.
     */
    async resetPassword(user: any) {
        let response = {};

        // On controle l'e-mail reçu.
        if (!this.utils.controleFormatEmail(user.email)) {
            response = {
                code: 400,
                message: "L'email fournit est incorrect."
            };
            return response;
        }

        // On nettoie l'e-mail reçu.
        const email = this.utils.sanitizeInput(user.email);

        // On vérifie si l'email existe en base.
        const userData = await this.model.getUserData(email);
        if (userData.length != 1) {
            response = {
                code: 400,
                message: "L'e-mail fournit n'existe pas en base de données."
            };
            return response;
        }

        // On génère le nouveau mot de passe.
        const password = this.generatePassword();

        // On envoie un mail avec le nouveau mot de passe.
        await this.utils.sendEmail(email, password);

        // On crypte le mot de passe et on le persiste en table.
        const hashedPassword = await this.utils.hashPassword(password);
        await this.model.updatePassword(email, hashedPassword);

        response ={
            code: 200,
            message: `Un e-mail contenant un nouveau mot de passe a été envoyé à l'adresse ${email}.`
        };

        return response;
    }


    /**
     * Méthode pour générer un mot de passe aléatoire.
     * @return password : Mot de passe généré.
     */
    generatePassword(){
        const password = "@" + generatePassword.generate({
            length: 8,
            numbers: true,
            uppercase: true,
            lowercase: true,
            strict: true
        });
        return password;
    }
}


module.exports = ServiceReset;
