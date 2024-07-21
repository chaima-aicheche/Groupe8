import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore
import OffreService from '../service/offre.service';


const router = express.Router();
const service = new OffreService();


// Endpoint poir la création d'offre.
router.post("/create", async (req: Request, res: Response) => {
    try{
        const response = await service.createOffer(req.body);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});


// Endpoint poir la modification d'offre.
router.put("/update", async (req: Request, res: Response) => {
    try{
        const response = await service.updateOffer(req.body);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});


// Endpoint pour supprimer une offre.
router.delete("/delete", async (req: Request, res: Response) => {
    try{
        const response = await service.deleteOffer(req.body);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});



export default router;
