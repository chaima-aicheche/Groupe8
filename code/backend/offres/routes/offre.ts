import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore
import OffreService from '../service/offre.service';


const router = express.Router();
const service = new OffreService();



router.post("/create", async (req: Request, res: Response) => {
    try{
        const response = await service.create(req.body);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});



export default router;
