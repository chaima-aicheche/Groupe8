// @ts-ignore
import express from 'express';
// @ts-ignore
import {Request, Response} from "express";
// @ts-ignore
import cors from 'cors';

import article from './routes/article';
import historique from './routes/historique';

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({message: "Bonjour"});
});



app.use("/article", article);
app.use("/historique", historique);


const port = 8060;
app.listen(port, () => {
    console.log(`[ ~    API started    ~ ]`);
    console.log(`[ ~       Article     ~ ]`);
    console.log(`[ ~   on port ${port}    ~ ]\n\n`);
});
