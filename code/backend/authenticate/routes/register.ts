import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore

import serviceRegister from '../service/register.service';

const service = new serviceRegister();
const router = express.Router();


router.get("/titi", async (req: Request, res: Response) => {
    console.log("titiiiiiiiii");
});


router.post("/candidat", (req: Request, res: Response) =>
{
    service.InsertUserInDb(req.body.email, req.body.password, req.body.nom, req.body.prenom, req.body.num_telephone, req.body.adresse, req.body.code_postal, req.body.ville, req.body.pays, req.body.genre, req.body.cv);

    res.status(555).send
    ({
        message: "Requête reçue avec succès."
    })
});

router.post("/recruteur", (req: Request, res: Response) =>
{
    service.InsertUserInDb(req.body.email, req.body.password, req.body.raison_sociale, req.body.num_telephone, req.body.adresse, req.body.code_postal, req.body.ville, req.body.pays, req.body.categorie);

    res.status(555).send
    ({
        message: "Requête reçue avec succès."
    })
});

router.post("/formateur", (req: Request, res: Response) =>
{
    service.InsertUserInDb(req.body.email, req.body.password, req.body.nom, req.body.prenom);

    res.status(555).send
    ({
        message: "Requête reçue avec succès."
    })
});



export default router;
