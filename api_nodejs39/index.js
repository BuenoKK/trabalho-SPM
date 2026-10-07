import 'dotenv/config';
import express from 'express';
import mssql from 'mssql';

const porta = process.env.PORTA;
const stringSQL = process.env.CONNECTION_STRING;

const app = express();

app.use(express.json());


// USUÁRIOS
app.get("/usuarios", async (req, res) => {
    try {
        const pool = await mssql.connect(stringSQL);

        const resultado = await pool
            .request()
            .query("SELECT * FROM usuario");

        res.json(resultado.recordset);

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            erro: erro.message
        });
    }
});


// LABORATÓRIOS
app.get("/laboratorios", async (req, res) => {
    try {
        const pool = await mssql.connect(stringSQL);

        const resultado = await pool
            .request()
            .query("SELECT * FROM laboratorio");

        res.json(resultado.recordset);

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            erro: erro.message
        });
    }
});


// SALAS
app.get("/salas", async (req, res) => {
    try {
        const pool = await mssql.connect(stringSQL);

        const resultado = await pool
            .request()
            .query("SELECT * FROM sala");

        res.json(resultado.recordset);

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            erro: erro.message
        });
    }
});


// STATUS
app.get("/status", async (req, res) => {
    try {
        const pool = await mssql.connect(stringSQL);

        const resultado = await pool
            .request()
            .query("SELECT * FROM status");

        res.json(resultado.recordset);

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            erro: erro.message
        });
    }
});

// POST USUARIO
app.post("/usuarios", async (req, res) => {
    try {
        const {
            cpf,
            nome_completo,
            data_aniversario,
            celular,
            email,
            login,
            senha
        } = req.body;

        const pool = await mssql.connect(stringSQL);

        // Primeiro cadastra na tabela usuario
        const resultado = await pool.request()
            .input("cpf", mssql.VarChar, cpf)
            .input("nome_completo", mssql.VarChar, nome_completo)
            .input("data_aniversario", mssql.Date, data_aniversario)
            .input("celular", mssql.VarChar, celular)
            .input("email", mssql.VarChar, email)
            .query(`
                INSERT INTO usuario
                (cpf, nome_completo, data_aniversario, celular, email)
                OUTPUT INSERTED.id_usuario
                VALUES
                (@cpf, @nome_completo, @data_aniversario, @celular, @email)
            `);

        const id_usuario = resultado.recordset[0].id_usuario;

        // Depois cadastra o acesso
        await pool.request()
            .input("id_usuario", mssql.Int, id_usuario)
            .input("login", mssql.VarChar, login)
            .input("senha", mssql.VarChar, senha)
            .query(`
                INSERT INTO acesso_usuario
                (id_usuario, login, senha)
                VALUES
                (@id_usuario, @login, @senha)
            `);

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso",
            id_usuario: id_usuario
        });

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            erro: erro.message
        });
    }
});

//POST LOGIN
app.post("/login", async (req, res) => {
    try {
        const { login, senha } = req.body;

        const pool = await mssql.connect(stringSQL);

        const resultado = await pool.request()
            .input("login", mssql.VarChar, login)
            .input("senha", mssql.VarChar, senha)
            .query(`
                SELECT
                    u.id_usuario,
                    u.cpf,
                    u.nome_completo,
                    u.data_aniversario,
                    u.celular,
                    u.email
                FROM usuario u
                INNER JOIN acesso_usuario a
                    ON u.id_usuario = a.id_usuario
                WHERE a.login = @login
                  AND a.senha = @senha
            `);

        if (resultado.recordset.length === 0) {
            return res.status(401).json({
                mensagem: "Login ou senha inválidos"
            });
        }

        const usuario = resultado.recordset[0];

        // Atualiza a data do último acesso
        await pool.request()
            .input("id_usuario", mssql.Int, usuario.id_usuario)
            .query(`
                UPDATE acesso_usuario
                SET data_ultimo_acesso = GETDATE()
                WHERE id_usuario = @id_usuario
            `);

        res.status(200).json({
            mensagem: "Login realizado com sucesso",
            usuario: usuario
        });

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            erro: erro.message
        });
    }
});


//POST LABORATORIO
app.post("/laboratorios", async (req, res) => {
    try {
        const {
            codigo,
            nome,
            capacidade,
            localizacao
        } = req.body;

        const pool = await mssql.connect(stringSQL);

        await pool.request()
            .input("codigo", mssql.Int, codigo)
            .input("nome", mssql.VarChar, nome)
            .input("capacidade", mssql.Int, capacidade)
            .input("localizacao", mssql.VarChar, localizacao)
            .query(`
                INSERT INTO laboratorio
                (codigo, nome, capacidade, localizacao)
                VALUES
                (@codigo, @nome, @capacidade, @localizacao)
            `);

        res.status(201).json({
            mensagem: "Laboratório cadastrado com sucesso"
        });

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
});


//POST SALA
app.post("/salas", async (req, res) => {
    try {
        const {
            codigo,
            nome,
            capacidade,
            localizacao
        } = req.body;

        const pool = await mssql.connect(stringSQL);

        await pool.request()
            .input("codigo", mssql.Int, codigo)
            .input("nome", mssql.VarChar, nome)
            .input("capacidade", mssql.Int, capacidade)
            .input("localizacao", mssql.VarChar, localizacao)
            .query(`
                INSERT INTO sala
                (codigo, nome, capacidade, localizacao)
                VALUES
                (@codigo, @nome, @capacidade, @localizacao)
            `);

        res.status(201).json({
            mensagem: "Sala cadastrada com sucesso"
        });

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
});


//POST STATUS
app.post("/status", async (req, res) => {
    try {
        const {
            codigo,
            nome,
            descricao
        } = req.body;

        const pool = await mssql.connect(stringSQL);

        await pool.request()
            .input("codigo", mssql.Int, codigo)
            .input("nome", mssql.VarChar, nome)
            .input("descricao", mssql.VarChar, descricao)
            .query(`
                INSERT INTO status
                (codigo, nome, descricao)
                VALUES
                (@codigo, @nome, @descricao)
            `);

        res.status(201).json({
            mensagem: "Status cadastrado com sucesso"
        });

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
});





// TESTE
app.get("/", (req, res) => {
    res.json({
        message: "Servidor rodando"
    });
});


// INICIAR SERVIDOR
app.listen(porta, () => {
    console.log(`API funcionando!`);
    console.log(`Servidor rodando em: http://localhost:${porta}`);
});
