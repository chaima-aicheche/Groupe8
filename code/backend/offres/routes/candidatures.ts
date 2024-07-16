import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore
import CandidaturesService from '../service/candidatures.service';


const router = express.Router();
const service = new CandidaturesService();



router.get("/latest", async (req: Request, res: Response) => {
    try{
        const response = await service.getLatestCandidatures(req.body);
        res.status(200).send(response);
    }
    catch (e){
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});



export default router;
