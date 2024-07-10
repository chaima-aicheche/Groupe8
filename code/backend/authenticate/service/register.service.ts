import RegisterModel from "../bdd/register.model";

class ServiceRegister {
    requeteModel = new RegisterModel();

    constructor() {}

   toto(){
        // this.requeteModel.getData()
       console.log("toto");
   }

}

module.exports = ServiceRegister;
