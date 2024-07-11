import RegisterModel from "../bdd/register.model";
// @ts-ignore
import bcrypt from 'bcrypt';

class ServiceRegister
{
    requeteModel = new RegisterModel();

    constructor() {}

    /**
     * Check if the user is already registered in the DB from his email
     * @param email :: The email of the user
     * @return True if the user is already in the database, False is he isn't
     */
    async IsUserInDb(email : string)
    {
        await this.requeteModel.IsUserInDb(email);
    }

    /**
     * Insert the user's credentials in the DB
     * @param email
     * @param password
     * @param type
     * @param data
     * @constructor
     */
    async InsertUserInDb(email : string, password : string, type : string)
    {
        // 8 char, 1 chiffre, 1 maj, 1 char special
        if(email != null && email != "" && password != null && password != "" && this.IsPasswordOk(password) && type != null && type != "")
            await this.requeteModel.InsertUserInDb(email, await this.HashPassword(password), type);
    }

    async HashPassword(password: string)
    {
        return await bcrypt.hash(password, 10);
    }

    private IsPasswordOk(password: string) {
        return false;
    }
}

module.exports = ServiceRegister;
