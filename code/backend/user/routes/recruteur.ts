import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore
import RecruteurService from '../service/recruteur.service';

const router = express.Router();
const service = new RecruteurService();


router.get("/", (req: Request, res: Response) => {
    res.json({message: "Bonjour from recruteur"});
});

router.post("/create", async (req: Request, res: Response) => {
    try{
        const response = await service.InsertRecruteurInDb(req.body.email, req.body.num_telephone, req.body.raison_sociale
            , req.body.adresse, req.body.code_postal, req.body.ville, req.body.pays, req.body.categorie);
        res.status(200).send(response);
    }
    catch (e){
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});

router.post("/update", async (req: Request, res: Response) => {
    try{
        const response = await service.UpdateRecruteurInDb(req.body.oldEmail, req.body.newEmail, req.body.num_telephone
            , req.body.raison_sociale, req.body.adresse, req.body.code_postal, req.body.ville, req.body.pays
            , req.body.categorie, req.body.idUser);
        res.status(200).send(response);
    }
    catch (e){
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});

export default router;
