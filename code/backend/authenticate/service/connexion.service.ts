// @ts-ignore
import bcrypt from 'bcrypt';
import ConnexionModel from "../bdd/connexion.model";

class ServiceConnexion {
    model = new ConnexionModel();

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
        const email = this.sanitizeInput(user.email);
        const password = this.sanitizeInput(user.password);

        // On récupère les données de l'utilisateur en base via son email.
        const userData = await this.model.getUserData(email);
        console.log(userData);

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
        // On vérifie que les données ne sont pas nulles.
        if(!user.email || !user.password){
            return false;
        }

        // On vérifie que l'email est correcte.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            return false;
        }

        // On vérifie que le mot de passe est correct.
            // au moins 8 caractères
            // au moins 1 chiffre
            // au moins 1 majuscule
            // au moins 1 minuscule
            // au moins 1 caractère spécial (@$!%*?&)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(user.password)){
            return false;
        }

        return true;
    }


    /**
     * Méthode pour nettoyer les données reçues. (protection contre les injections SQL).
     * @param input : - Données à nettoyer.
     * @return : - Données nettoyées.
     */
    sanitizeInput(input: string){
        return input.replace(/[^a-zA-Z0-9@.]/g, '');
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
