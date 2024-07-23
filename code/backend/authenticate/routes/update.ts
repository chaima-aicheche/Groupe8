import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore

import UpdateService from '../service/update.service';

const service = new UpdateService();
const router = express.Router();

router.get("/", async () => {
    console.log("Bienvenue dans MS authentification update");
});

router.post("/candidat", async (req: Request, res: Response) =>
{
    try{
        const response = await service.UpdateUserInDb(req.body.oldEmail, req.body.newEmail, req.body.password);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});

router.post("/recruteur", async (req: Request, res: Response) =>
{
    try{
        const response = await service.UpdateUserInDb(req.body.oldEmail, req.body.newEmail, req.body.password);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée"});
    }
});

router.post("/formateur", async (req: Request, res: Response) =>
{
    try{
        const response = await service.UpdateUserInDb(req.body.oldEmail, req.body.newEmail, req.body.password);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});

export default router;
