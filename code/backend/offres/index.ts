// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';

import {Request, Response} from "express";
import creation from './routes/creation';
import statistiques from "./routes/statistiques";


const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({message: "Bonjour"});
});



app.use("/creation", creation);
app.use("/getStats", statistiques);


const port = 8070;
app.listen(port, () => {
    console.log(`[ ~    API started    ~ ]`);
    console.log(`[ ~       Offres      ~ ]`);
    console.log(`[ ~   on port ${port}    ~ ]\n\n`);
});
