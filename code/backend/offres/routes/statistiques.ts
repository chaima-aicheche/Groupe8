import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore
import StatistiquesService from '../service/statistiques.service';


const router = express.Router();
const service = new StatistiquesService();



router.get("/", async (req: Request, res: Response) => {
    try{
        const response = await service.getStatistiques(req.body);
        res.status(200).send(response);
    }
    catch (e){
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});



export default router;
