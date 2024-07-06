import express from 'express';
import cors from 'cors';
import { GenerateTailwindCSS } from './tailwind-generator.js';

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
    res.send(await GenerateTailwindCSS());
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});