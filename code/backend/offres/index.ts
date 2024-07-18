// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';

import {Request, Response} from "express";
import offre from './routes/offre';
import statistiques from "./routes/statistiques";
import candidatures from "./routes/candidatures";


const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({message: "Bonjour"});
});


app.use("/offre", offre);
app.use("/getStats", statistiques);
app.use("/candidature",candidatures);


const port = 8070;
app.listen(port, () => {
    console.log(`[ ~    API started    ~ ]`);
    console.log(`[ ~       Offres      ~ ]`);
    console.log(`[ ~   on port ${port}    ~ ]\n\n`);
});
