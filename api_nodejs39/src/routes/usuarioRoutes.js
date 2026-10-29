
import express from 'express';
import mssql from 'mssql';
import autenticarToken from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET /usuarios
router.get('/', autenticarToken, async (req, res) => {
    try {
        const pool = await mssql.connect(
            process.env.CONNECTION_STRING
        );

        const resultado = await pool.request().query(`
            SELECT
                id_usuario,
                cpf,
                nome_completo,
                data_aniversario,
                celular,
                email
            FROM usuario
        `);

        return res.json(resultado.recordset);

    } catch (erro) {
        console.error('Erro ao consultar usuários:', erro);

        return res.status(500).json({
            mensagem: 'Erro ao consultar usuários.'
        });
    }
});

export default router;
