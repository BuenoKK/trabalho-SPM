import express from 'express';
import mssql from 'mssql';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, login, senha } = req.body;
        const usuarioLogin = login || email;

        if (!usuarioLogin || !senha) {
            return res.status(400).json({
                mensagem: 'Informe o login e a senha.'
            });
        }

        const pool = await mssql.connect(
            process.env.CONNECTION_STRING
        );

        const resultado = await pool.request()
            .input('login', mssql.VarChar, usuarioLogin)
            .input('senha', mssql.VarChar, senha)
            .query(`
                SELECT u.id_usuario, u.email
                FROM usuario u
                INNER JOIN acesso_usuario a
                    ON u.id_usuario = a.id_usuario
                WHERE a.login = @login
                  AND a.senha = @senha
            `);

        if (resultado.recordset.length === 0) {
            return res.status(401).json({
                mensagem: 'Login ou senha inválidos.'
            });
        }

        const usuario = resultado.recordset[0];

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET não configurado no .env');
        }

        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        await pool.request()
            .input('id_usuario', mssql.Int, usuario.id_usuario)
            .query(`
                UPDATE acesso_usuario
                SET data_ultimo_acesso = GETDATE()
                WHERE id_usuario = @id_usuario
            `);

        return res.json({
            mensagem: 'Login realizado com sucesso.',
            token,
            usuario
        });

    } catch (erro) {
        console.error('Erro no login:', erro);

        return res.status(500).json({
            mensagem: 'Erro interno ao realizar login.'
        });
    }
});

export default router;