// @ts-ignore
import express from 'express';
import {Request, Response} from "express";
// @ts-ignore
import cors from 'cors';

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({message: "Bonjour"});
});

app.get("/candidate", (req: Request, res: Response) => {
    console.log(req);
});

app.get("/candidate", (req: Request, res: Response) => {
    console.log(req);
});

app.listen(8080, () => {
    console.log("toto");
});
