import 'dotenv/config';
import express from 'express';
import routes from './routes/index.js';
import loginRoutes from './routes/loginRoutes.js';

// configurações
const app = express();
app.use(express.json());
app.use('/auth', loginRoutes);

routes(app);

export default app;

