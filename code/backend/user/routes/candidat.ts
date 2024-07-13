import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore
import CandidatService from '../service/candidat.service';


const router = express.Router();
const service = new CandidatService();



router.post("/", async (req: Request, res: Response) => {
    console.log('totooooo');
    try{
        // const response = await service.connect(req.body);
        // res.status(200).send(response);
    }
    catch (e){
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});



export default router;
