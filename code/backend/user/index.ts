// @ts-ignore
import express from 'express';
import {Request, Response} from "express";
// @ts-ignore
import cors from 'cors';
import recruteur from './routes/recruteur';
import candidat from './routes/candidat';
import formateur from './routes/formateur';

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({message: "Bonjour from user MS"});
});

app.use("/candidat", candidat);
app.use("/recruteur", recruteur);
app.use("/formateur", formateur);

const port = 8090;
app.listen(port, () => {
    console.log(`[ ~    API started    ~ ]`);
    console.log(`[ ~        User       ~ ]`);
    console.log(`[ ~   on port ${port}    ~ ]\n\n`);
});
