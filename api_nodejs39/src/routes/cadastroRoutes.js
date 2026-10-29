import express from 'express';
import cadastroController from '../controllers/cadastroController.js';

const routes = express.Router();

routes.get("/usuario", cadastroController.listarCadastroPorId);
routes.delete("/usuario/:id", cadastroController.removerCadastro);
routes.post("/usuario", cadastroController.inserirCadastro);

export default routes;

/*
// LISTAR TODOS OS RECURSOS
app.get("/recursos", async (req, res) => {
    try {
        const pool = await poolPromise;

        const resultado = await pool.request().query(`
            SELECT *
            FROM dbo.recurso
        `);

        res.json(resultado.recordset);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: "Erro ao listar recursos" });
    }
});


// BUSCAR RECURSO POR ID
app.get("/recursos/:id", async (req, res) => {
    try {
        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("id", sql.Int, req.params.id)
            .query(`
                SELECT *
                FROM dbo.recurso
                WHERE id_recurso = @id
            `);

        if (resultado.recordset.length === 0) {
            return res.status(404).json({
                mensagem: "Recurso não encontrado"
            });
        }

        res.json(resultado.recordset[0]);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: "Erro ao buscar recurso" });
    }
});


// CADASTRAR RECURSO
app.post("/recursos", async (req, res) => {
    try {
        const { nome, tipo, capacidade, localizacao } = req.body;

        if (
            !nome ||
            !tipo ||
            !Number.isInteger(capacidade) ||
            capacidade <= 0 ||
            !localizacao
        ) {
            return res.status(400).json({
                mensagem: "Informe nome, tipo, capacidade e localização válidos"
            });
        }

        if (!["Sala", "Laboratorio"].includes(tipo)) {
            return res.status(400).json({
                mensagem: "O tipo deve ser Sala ou Laboratorio"
            });
        }

        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("nome", sql.VarChar(100), nome)
            .input("tipo", sql.VarChar(20), tipo)
            .input("capacidade", sql.Int, capacidade)
            .input("localizacao", sql.VarChar(150), localizacao)
            .query(`
                INSERT INTO dbo.recurso
                    (nome, tipo, capacidade, localizacao)
                OUTPUT INSERTED.*
                VALUES
                    (@nome, @tipo, @capacidade, @localizacao)
            `);

        res.status(201).json({
            mensagem: "Recurso cadastrado com sucesso!",
            recurso: resultado.recordset[0]
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: "Erro ao cadastrar recurso" });
    }
});


// ATUALIZAR RECURSO
app.patch("/recursos/:id", async (req, res) => {
    try {
        const { nome, tipo, capacidade, localizacao } = req.body;
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ mensagem: "ID inválido" });
        }

        if (
            !nome ||
            !tipo ||
            !Number.isInteger(capacidade) ||
            capacidade <= 0 ||
            !localizacao
        ) {
            return res.status(400).json({
                mensagem: "Informe todos os campos corretamente"
            });
        }

        if (!["Sala", "Laboratorio"].includes(tipo)) {
            return res.status(400).json({
                mensagem: "O tipo deve ser Sala ou Laboratorio"
            });
        }

        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("id", sql.Int, id)
            .input("nome", sql.VarChar(100), nome)
            .input("tipo", sql.VarChar(20), tipo)
            .input("capacidade", sql.Int, capacidade)
            .input("localizacao", sql.VarChar(150), localizacao)
            .query(`
                UPDATE dbo.recurso
                SET nome = @nome,
                    tipo = @tipo,
                    capacidade = @capacidade,
                    localizacao = @localizacao
                WHERE id_recurso = @id;

                SELECT *
                FROM dbo.recurso
                WHERE id_recurso = @id;
            `);

        if (resultado.recordset.length === 0) {
            return res.status(404).json({
                mensagem: "Recurso não encontrado"
            });
        }

        res.json({
            mensagem: "Recurso atualizado com sucesso!",
            recurso: resultado.recordset[0]
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: "Erro ao atualizar recurso" });
    }
});


// EXCLUIR RECURSO
app.delete("/recursos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ mensagem: "ID inválido" });
        }

        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("id", sql.Int, id)
            .query(`
                DELETE FROM dbo.recurso
                WHERE id_recurso = @id;

                SELECT @@ROWCOUNT AS quantidade;
            `);

        if (resultado.recordset[0].quantidade === 0) {
            return res.status(404).json({
                mensagem: "Recurso não encontrado"
            });
        }

        res.json({ mensagem: "Recurso excluído com sucesso!" });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Não foi possível excluir. Verifique se existem reservas vinculadas."
        });
    }
});

*/