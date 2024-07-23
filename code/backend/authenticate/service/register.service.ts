import RegisterModel from "../bdd/register.model";
// @ts-ignore
import bcrypt from 'bcrypt';

class ServiceRegister
{
    requeteModel = new RegisterModel();

    constructor() {}

    /**
     * Check if the user is already registered in the DB from his email
     * @param email
     * @return True if the user is already in the database, False is he isn't
     */
    async IsUserInDb(email : string)
    {
        let response: { code: number; message: string};

        if(this.IsEmailOk(email.trim()))
        {
            if(await this.requeteModel.IsUserInDb(email))
                response = {
                    code: 400,
                    message: "L'utilisateur existe déjà."
                };
            else
                response = {
                    code: 200,
                    message: "Check réussi."
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
     * Insert the user's credentials in the DB
     * @param email
     * @param password
     * @param type
     * @constructor
     */
    async InsertUserInDb(email : string, password : string, type : string)
    {
        let response : {code : number, message: string};

        let isPasswordOk = this.IsPasswordOk(password);
        let isTypeOk = type != null && type != "";

        response = await this.IsUserInDb(email)

        if(response.code == 200)
        {
            if (isPasswordOk && isTypeOk) {
                await this.requeteModel.InsertUserInDb(email, await this.HashPassword(password), type);
                response = {code: 200, message: "Inscription terminée."};
            } else if (isPasswordOk == false)
                response = {code: 400, message: "Le mot de passe n'est pas au bon format."}
            else if (isTypeOk == false)
                response = {code: 400, message: "Le role n'est pas spécifié."}
        }

        return response;
    }

    /**
     * Hash the user's password
     * @param password
     * @constructor
     * @private
     */
    private async HashPassword(password: string)
    {
        return await bcrypt.hash(password, 10);
    }

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
     * Check if the password has 8 char, 1 number, 1 upper case char, 1 lower case char and 1 special char
     * @param password
     * @constructor
     * @private
     */
    private IsPasswordOk(password: string)
    {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return password != null && password != "" && passwordRegex.test(password);
    }
}

module.exports = ServiceRegister;
