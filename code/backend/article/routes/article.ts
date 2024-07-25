import {Request, Response} from "express";
// @ts-ignore
import express from 'express';
// @ts-ignore
import ArticleService from '../service/article.service';


const router = express.Router();
const service = new ArticleService();



// Endpoint pour la création d'un article.
router.post("/create", async (req: Request, res: Response) => {
    try{
        const response = await service.createArticle(req.body);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});


// Endpoint pour la modification d'un article.
router.put("/update", async (req: Request, res: Response) => {
    try{
        const response = await service.updateArticle(req.body);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});


// Endpoint pour la suppression d'un article.
router.delete("/delete", async (req: Request, res: Response) => {
    try{
        const response = await service.deleteArticle(req.body);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});


// Endpoint pour récupérer toutes les données d'un article.
router.get("/getArticle", async (req: Request, res: Response) => {
    try{
        const response = await service.getArticle(req.body);
        res.status(200).send(response);
    }
    catch (e){
        console.log(e);
        res.status(500).send({message: "Une erreur technique a été rencontrée."});
    }
});



export default router;
