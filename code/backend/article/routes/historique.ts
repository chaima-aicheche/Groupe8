import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore
import HistoriqueService from '../service/historique.service';


const router = express.Router();
const service = new HistoriqueService();


// Route pour récupérer le dernier article consulté par un candidat.
router.get("/getLatest", async (req: Request, res: Response) => {
    try{
        const response = await service.getLatestArticle(req.body);
        res.status(200).send(response);
    }
    catch (e){
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});



// Route pour ajouter ou modifier un article dans l'historique d'un candidat.
router.post("/addReadedArticle", async (req: Request, res: Response) => {
    try{
        const response = await service.addReadedArticle(req.body);
        res.status(200).send(response);
    }
    catch (e){
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});



export default router;
