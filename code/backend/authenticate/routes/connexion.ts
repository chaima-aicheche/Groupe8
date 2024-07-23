import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore
import ServiceConnexion from '../service/connexion.service';


const router = express.Router();
const service = new ServiceConnexion();



router.post("/", async (req: Request, res: Response) => {
    try{
        const response = await service.connect(req.body);
        res.status(200).send(response);
    }
    catch (e){
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});



export default router;
