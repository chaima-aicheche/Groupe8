
export default class UtilsService {

    /**
     * Méthode pour nettoyer les données reçues. (protection contre les injections SQL).
     * @param input : - Données à nettoyer.
     * @return : - Données nettoyées.
     */
    sanitizeInput(input: string){
        return input.replace(/[^a-zA-Z0-9@.]/g, '');
    }


    /**
     * Méthode pour contrôler qu'aucun champ de soit vide ou null.
     * @param data
     * @return boolean
     */
    controleDataCreation(data: any){

        const requiredFields = [
            'id_formateur',
            'titre',
            'categorie',
            'description',
            'contenu',
            'image'
        ];

        return requiredFields.every(field => data[field] != null && data[field] !== "");
    }


    controleDataUpdate(data: any){

        const requiredFields = [
            'id_article',
            'titre',
            'categorie',
            'description',
            'contenu',
            'image'
        ];

        return requiredFields.every(field => data[field] != null && data[field] !== "");
    }






}