import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore
import CandidatService from '../service/candidat.service';

const router = express.Router();
const service = new CandidatService();


router.get("/", (req: Request, res: Response) => {
    res.json({message: "Bonjour from candidat"});
});

router.post("/create", async (req: Request, res: Response) => {
    try{
        const response = await service.InsertCandidatInDb(req.body.email, req.body.num_telephone, req.body.nom, req.body.prenom
            , req.body.adresse, req.body.code_postal, req.body.ville, req.body.pays, req.body.genre, req.body.cv);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});

router.post("/update", async (req: Request, res: Response) => {
    try{
        const response = await service.UpdateCandidatInDb(req.body.oldEmail, req.body.newEmail, req.body.num_telephone
            , req.body.nom, req.body.prenom, req.body.adresse, req.body.code_postal, req.body.ville, req.body.pays
            , req.body.genre, req.body.cv, req.body.idUser);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});

export default router;
