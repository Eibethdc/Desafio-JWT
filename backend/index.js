import express from 'express';
import router from './routes/router.js';
import cors from 'cors';
import { logger } from 'logger-express';
const app = express();
const PORT = 3000;

app.use(express.json())
app.use(cors());
app.use(logger())
app.use('/', router)
app.listen(PORT, () =>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`)
})