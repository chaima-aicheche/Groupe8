// @ts-ignore
import express from 'express';
import {Request, Response} from "express";
// @ts-ignore
import cors from 'cors';
import creation from './routes/creation';

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({message: "Bonjour"});
});



app.use("/creation", creation);


const port = 8060;
app.listen(port, () => {
    console.log(`[ ~    API started    ~ ]`);
    console.log(`[ ~       Article     ~ ]`);
    console.log(`[ ~   on port ${port}    ~ ]\n\n`);
});
