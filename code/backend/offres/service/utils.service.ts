
export default class UtilsService {

    /**
     * Méthode pour contrôler qu'aucun champ de soit vide ou null.
     * @param data
     * @return boolean
     */
    controleData(data: any){

        const requiredFields = [
            'id_recruteur',
            'titre',
            'adresse',
            'code_postal',
            'ville',
            'pays',
            'domaine',
            'description',
            'image'
        ];

        return requiredFields.every(field => data[field] != null && data[field] !== "");
    }
}