import express from 'express'
import morgan from 'morgan';
import cors from 'cors'; // Importa el paquete de cors
import citaRoutes from './routes/cita.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(morgan('dev'));
app.use(express.json());

app.use("/api", citaRoutes);

export default app;