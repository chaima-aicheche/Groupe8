import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import formationRoutes from './routes/formation.routes.js';

const app = express();
const PORT = 8080;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/formations', formationRoutes);

app.listen(PORT, () => {
    console.log(`[ ~ API started on port ${PORT} ~ ]\n`);
});
