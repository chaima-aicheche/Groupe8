
export default class UtilsService {

    /**
     * Méthode pour nettoyer les données reçues. (protection contre les injections SQL).
     * @param input : - Données à nettoyer.
     * @return : - Données nettoyées.
     */
    sanitizeInput(input: string){
        return input.replace(/[^a-zA-Z0-9@.]/g, '');
    }


}