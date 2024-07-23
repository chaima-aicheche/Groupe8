import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore

import serviceRegister from '../service/register.service';

const service = new serviceRegister();
const router = express.Router();

// router.get("/titi", async (req: Request, res: Response) => {
//     console.log("titiiiiiiiii");
// });

router.post("/candidat", async (req: Request, res: Response) =>
{
    try{
        const response = await service.InsertUserInDb(req.body.email, req.body.password, "candidat");
        res.status(200).send(response);
    }
    catch (e){
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});

router.post("/recruteur", async (req: Request, res: Response) =>
{
    try{
        const response = await service.InsertUserInDb(req.body.email, req.body.password, "recruteur");
        res.status(200).send(response);
    }
    catch (e){
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});

export default router;
