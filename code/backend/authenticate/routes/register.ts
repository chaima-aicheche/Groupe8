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


router.post("/tutu", (req: Request, res: Response) => {
    console.log("tutuuuuuuuu");

    service.toto();

    console.log(req.body.message);
    res.status(555).send({
        message: "Requête reçue avec succès."
    })
});



export default router;
