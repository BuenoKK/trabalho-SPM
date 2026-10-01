import express from 'express';
import cursoController from '../controllers/cursoController.js';

const routes = express.Router();

routes.get("/cursos", cursoController.listarCursos);
routes.get("/cursos/:id", cursoController.listarCursosPorId);
routes.delete("/cursos/:id", cursoController.removerCurso);
routes.post("/cursos", cursoController.inserirCurso);
routes.patch("/cursos/:id", cursoController.alterarCurso);

export default routes;