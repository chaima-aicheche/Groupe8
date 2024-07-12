// @ts-ignore
import express from 'express';
import {Request, Response} from "express";
// @ts-ignore
import cors from 'cors';
import register from './routes/register';
import connexion from './routes/connexion';
import reset from './routes/reset';

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({message: "Bonjour"});
});



app.use("/register", register);
app.use("/connexion", connexion);
app.use("/reset", reset);


const port = 8080;
app.listen(port, () => {
    console.log(`[ ~ API started on port ${port} ~ ]\n\n`);
});
