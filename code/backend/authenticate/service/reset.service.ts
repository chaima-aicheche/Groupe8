// @ts-ignore
import bcrypt from 'bcrypt';
import ResetModel from "../bdd/reset.model";

class ServiceReset {
    model = new ResetModel();

    constructor() {
    }

    toto(){
        console.log("toto");
        this.model.getUserData("padawan@gmail.com");
    }
}


module.exports = ServiceReset;
