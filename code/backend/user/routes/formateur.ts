import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore
import FormateurService from '../service/formateur.service';

const router = express.Router();
const service = new FormateurService();


router.get("/", (req: Request, res: Response) => {
    res.json({message: "Bonjour from Formateur"});
});

router.post("/create", async (req: Request, res: Response) => {
    try{
        const response = await service.InsertFormateurInDb(req.body.email, req.body.nom, req.body.prenom);
        res.status(200).send(response);
    }
    catch (e){
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});

router.post("/update", async (req: Request, res: Response) => {
    try{
        const response = await service.UpdateFormateurInDb(req.body.oldEmail, req.body.newEmail, req.body.nom
            , req.body.prenom, req.body.idUser);
        res.status(200).send(response);
    }
    catch (e){
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});

export default router;
