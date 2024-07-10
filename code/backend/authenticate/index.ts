// @ts-ignore
import express from 'express';
import {Request, Response} from "express";
// @ts-ignore
import cors from 'cors';
import register from './routes/register';
import connexion from './routes/connexion';

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({message: "Bonjour"});
});



app.use("/register", register);
app.use("/connexion", connexion);



app.listen(8080, () => {
    console.log("[ ~ API started ~ ]\n\n");
});
