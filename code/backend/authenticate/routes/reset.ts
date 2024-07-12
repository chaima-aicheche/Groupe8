import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore
import ServiceReset from '../service/reset.service';


const router = express.Router();
const service = new ServiceReset();



router.post("/", async (req: Request, res: Response) => {
    try{
        const response = await service.resetPassword(req.body);
        res.status(200).send(response);
    }
    catch (e){
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});



export default router;
