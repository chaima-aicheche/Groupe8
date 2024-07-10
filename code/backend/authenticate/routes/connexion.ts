import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore


const router = express.Router();



router.get("/toto", async (req: Request, res: Response) => {
    console.log("totoooooo");
});


router.post("/tata", (req: Request, res: Response) => {
    console.log("tataaaaaa");
    console.log(req.body.message);
    res.status(66622).send({
        message: "Requête reçue avec succès."
    })
});



export default router;
