// @ts-ignore
import bcrypt from 'bcrypt';

import utilsService from '../service/utils.service';
import ConnexionModel from "../bdd/connexion.model";
import UtilsService from "../service/utils.service";

class ServiceConnexion {
    model = new ConnexionModel();
    utils: UtilsService = new UtilsService();

    constructor() {}


    /**
     * Méthode appelée pour connecter un utilisateur.
     * @param user :: données remontées par le front.
     * @return : objet contenant le code de retour et un message d'erreur ou de validation.
     */
    async connect(user: any){
        let response = {};

        // On contrôle les données reçues.
        if(!this.controleData(user)){
            response = {
                code: 400,
                message: "Les données fournies sont incorrectes."
            };
            return response;
        }

        // On nettoie les données reçues.
        const email = this.utils.sanitizeInput(user.email);
        const password = this.utils.sanitizeInput(user.password);

        // On récupère les données de l'utilisateur en base via son email.
        const userData = await this.model.getUserData(email);

        // Si l'email fournit n'existe pas en table on retourne false.
        if(userData.length != 1){
            response = {
              code: 400,
              message: "L'e-mail fournit n'existe pas en base de données."
            };
            return response;
        }

        // On compare les mdp.
        const bddUser = userData[0];
        const checkPassword = await this.verifyPassword(password, bddUser.password);

        // S'ils ne correspondent pas.
        if (!checkPassword) {
            response = {
              code: 400,
              message: "Le mot de passe fournit est incorrect."
            };
        }
        // S'ils correspondent.
        else{
            response = {
              code: 200,
              message: "Connexion réussie.",
              email: bddUser.email,
              role: bddUser.role
            };
        }
        return response;
    }


    /**
     * Méthode pour contrôler les données reçues:
     * - Email et mot de passe non nuls.
     * - Format de l'email correct.
     * - Mot de passe correct.
     * @param user : - Données à controler.
     */
    controleData(user: any){
        // On controle que les données ne sont pas nulles.
        if(!user.email || !user.password){
            return false;
        }

        // On controle que l'email est correcte.
        if (!this.utils.controleFormatEmail(user.email)) {
            return false;
        }

        // On controle que l'email est correcte.
        if(!this.utils.controlePassword(user.password)){
            return false;
        }

        return true;
    }


    /**
     * Méthode pour comparer les deux mots de passe.
     * <br>
     * @param userPassword : Mot de passe fournit par l'utilisateur.
     * @param bddPassword : Mot de passe récupéré en base de données.
     * @return : boolean.
     */
    async verifyPassword(userPassword: string, bddPassword: string) {
        return await bcrypt.compare(userPassword, bddPassword);
    }
}

module.exports = ServiceConnexion;
