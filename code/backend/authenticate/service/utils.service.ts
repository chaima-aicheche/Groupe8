// @ts-ignore
import bcrypt from 'bcrypt';
import ConnexionModel from "../bdd/connexion.model";
import * as nodeMailer from "nodemailer";

export default class UtilsService {


    /**
     * Méthode pour controler le format de l'email.
     * @param email : - Données à controler.
     * @return : - Boolean.
     */
    controleFormatEmail(email: string){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);

    }


    /**
     * Méthode pour controler les mot de passe :
     * - Au moins 8 caractères.
     * - Au moins 1 chiffre.
     * - Au moins 1 majuscule.
     * - Au moins 1 minuscule.
     * - Au moins 1 caractère spécial (@$!%*?&).
     * @param email : - Données à controler.
     * @return : - Boolean.
     */
    controlePassword(password: string){
        // On vérifie que le mot de passe est correct.
        // au moins 8 caractères
        // au moins 1 chiffre
        // au moins 1 majuscule
        // au moins 1 minuscule
        // au moins 1 caractère spécial (@$!%*?&)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);

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
     * Méthode pour hasher un mot de passe.
     * @param input : - Mot de passe à crypter.
     * @return : - Mot de passe hashé.
     */
    async hashPassword(password: string){
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }


    /**
     * Méthode pour envoyer un email contenant le mot de passe. (PEUT ETRE RENDU MODULAIRE).
     * @param email : - Email du destinataire
     * @param password : - Password à transmettre.
     */
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
            to: `${email}`,                                         // Destinataires
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
}