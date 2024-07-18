import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore
import CandidaturesService from '../service/candidatures.service';


const router = express.Router();
const service = new CandidaturesService();



// Route appelée lorsqu'un candiadat postule à une offre.
router.post("/apply", async (req: Request, res: Response) => {
    try{
        const response = await service.applyToOffer(req.body);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});



// Route appelée lorsqu'un recruteur accepte ou refuse une candidature.
router.post("/answer", async (req: Request, res: Response) => {
    try{
        const response = await service.answerToApply(req.body);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});



// Route appelée pour récupérer la dernière offre à laquelle un candidat a postulé.
router.get("/getLatest", async (req: Request, res: Response) => {
    try{
        const response = await service.getLatestCandidatures(req.body);
        res.status(200).send(response);
    }
    catch (e){
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});



export default router;
