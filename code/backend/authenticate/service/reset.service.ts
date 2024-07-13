// @ts-ignore
import bcrypt from 'bcrypt';
import * as generatePassword from 'generate-password';
import * as nodeMailer from 'nodemailer';
import ResetModel from "../bdd/reset.model";

class ServiceReset {
    model = new ResetModel();

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
        if (!this.controleEmail(user.email)) {
            response = {
                code: 400,
                message: "L'email fournit est incorrect."
            };
            return response;
        }

        // On nettoie l'e-mail reçu.
        const email = this.sanitizeInput(user.email);

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
        console.log(password);

        // On envoie un mail avec le nouveau mot de passe.
        this.sendEmail(email, password);

        // On crypte le mot de passe et on le persiste en table.
        const hashedPassword = await this.hashPassword(password);
        this.model.updatePassword(email, hashedPassword);

        response ={
            code: 200,
            message: `Un e-mail contenant un nouveau mot de passe a été envoyé à l'adresse ${email}.`
        };

        return response;
    }

    controleEmail(email: string){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }
        return true;
    }

    sanitizeInput(input: string){
        return input.replace(/[^a-zA-Z0-9@.]/g, '');
    }


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

    async sendEmail(email: string, password: string) {
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'techtalent861@gmail.com',    // Adresse email de l'expéditeur
                pass: 'kpzy hszn yueh rglj'         // Mot de passe de l'expéditeur
            }
        });

        let mailOptions = {
            from: `${email}`,
            to: 'lea.dubois@laplateforme.io',                       // Destinataires
            subject: 'Reset password',                              // Sujet
            text: `Voici votre nouveau mot de passe : ${password}`  // Contenu en texte brut
        };

        try {
            let info = await transporter.sendMail(mailOptions);
            console.log('Email envoyé: %s', info.messageId);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
        }
    }


    async hashPassword(password: string){
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }
}


module.exports = ServiceReset;
