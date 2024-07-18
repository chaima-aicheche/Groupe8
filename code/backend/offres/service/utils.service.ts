
export default class UtilsService {

    controleData(data: any){

    }

    sanitizeInput(input: string){
        return input.replace(/[^a-zA-Z0-9@.]/g, '');
    }




}