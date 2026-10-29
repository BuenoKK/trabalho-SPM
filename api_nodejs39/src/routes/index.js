
import express from 'express';

import loginRoutes from './routes/loginRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import laboratorioRoutes from './routes/laboratorioRoutes.js';
import statusRoutes from './routes/statusRoutes.js';

const routes = (app) => {
    app.use(express.json());

    app.get('/', (req, res) => {
        res.status(200).json({ message: 'API rodando' });
    });

    app.use('/auth', loginRoutes);
    app.use('/usuarios', usuarioRoutes);
    app.use('/laboratorios', laboratorioRoutes);
    app.use('/status', statusRoutes);
};

export default routes;
