import express from 'express';
import curso from '../routes/cursoRoutes.js';

const routes = (app) => {
    app.route("/").get((req,res) => res.status(200).json({message: "API rodando"}));
    
    app.use(express.json(), curso);
}

export default routes;