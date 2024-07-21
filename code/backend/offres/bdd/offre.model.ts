import pool from '../bdd/pool.config';

class OffreModel {

    /**
     * Méthode pour créer une offre.
     * @return : id, email, password et role de l'utilisateur.
     * @param idRecruteur
     * @param titre
     * @param adresse
     * @param codePostal
     * @param ville
     * @param pays
     * @param domaine
     * @param description
     * @param image
     */
    async createOffer(idRecruteur: number, titre: string, adresse: string, codePostal: string, ville: string, pays: string, domaine: string, description: string, image: string, datePublication: string){
        const query = 'INSERT INTO "offres" ("id_recruteur", "titre", "adresse", "code_postal", "ville", "pays", "domaine", "description", "image", "date_publication") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const values = [idRecruteur, titre, adresse, codePostal ,ville ,pays ,domaine ,description ,image, datePublication];

        try {
            const result = await pool.query(query, values);
            console.log(`Création de l'offre \"${titre}\" réussie avec succès.`);
            return result.rows;
        } catch (error) {
            console.error(`Echec de la création de l'offre \"${titre}\".`, error);
            throw error;
        }
    }

    /**
     * Méthode pour modifier une offre déjà existante.
     * @param idRecruteur
     * @param titre
     * @param adresse
     * @param codePostal
     * @param ville
     * @param pays
     * @param domaine
     * @param description
     * @param image
     * @param idOffre
     */
    async updateOffer(idRecruteur: number, titre: string, adresse: string, codePostal: string, ville: string, pays: string, domaine: string, description: string, image: string, idOffre: number){
        const query = 'UPDATE "offres" SET "id_recruteur" = $1, "titre" = $2, "adresse" = $3, "code_postal" = $4, "ville" = $5, "pays" = $6, "domaine" = $7, "description" = $8, "image" = $9 WHERE "id" = $10';
        const values = [idRecruteur, titre, adresse, codePostal ,ville ,pays ,domaine ,description ,image, idOffre];

        try {
            const result = await pool.query(query, values);
            console.log(`Modification de l'offre n°\"${idOffre}\" réussie avec succès.`);
            return result.rows;
        } catch (error) {
            console.error(`Echec de la modification de l'offre n°\"${idOffre}\".`, error);
            throw error;
        }

    }
}

export default OffreModel;
