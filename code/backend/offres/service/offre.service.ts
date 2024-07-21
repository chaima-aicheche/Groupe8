import OffreModel from "../bdd/offre.model";
import UtilsService from "../service/utils.service";

class OffreService {
    model = new OffreModel();
    utils: UtilsService = new UtilsService();

    constructor() {}

    async createOffer(data: any){
        let response;

        if(!this.utils.controleData(data)){
            response = {
              code: 400,
              message: "Merci de fournir des données correctes."
            };
            return response;
        }

        const idRecruteur = Number(data.id_recruteur);
        const titre = data.titre;
        const adresse = data.adresse;
        const codePostal = data.code_postal;
        const ville = data.ville;
        const pays = data.pays;
        const domaine = data.domaine;
        const description = data.description;
        const image = data.image;
        const datePublication = new Date().toISOString();


        await this.model.createOffer(idRecruteur, titre, adresse,codePostal ,ville ,pays ,domaine ,description ,image, datePublication);

        response = {
            code: 200,
            message: "Offre créée avec succès."
        }
        return response;
    }

    async updateOffer(data: any){
        let response;

        if(!this.utils.controleData(data)){
            response = {
                code: 400,
                message: "Merci de fournir des données correctes."
            };
            return response;
        }

        const idOffre = Number(data.id_offre);
        const idRecruteur = Number(data.id_recruteur);
        const titre = data.titre;
        const adresse = data.adresse;
        const codePostal = data.code_postal;
        const ville = data.ville;
        const pays = data.pays;
        const domaine = data.domaine;
        const description = data.description;
        const image = data.image;


        await this.model.updateOffer(idRecruteur, titre, adresse,codePostal ,ville ,pays ,domaine ,description ,image, idOffre);

        response = {
            code: 200,
            message: "Offre Modifiée avec succès."
        }
        return response;
    }


    async deleteOffer(data: any){
        let response;

        const idOffre = Number(data.id_offre);
        console.log(idOffre);

        const checkDelete = await this.model.deleteOffer(idOffre);
        if(!checkDelete){
            response= {
              code: 400,
              message: "Aucune offre n'a pu être trouvée avec cet ID."
            };
            return response;
        }

        response = {
          code: 200,
          message: "Offre suprimée avec succés."
        };
        return response;
    }
}

module.exports = OffreService;
