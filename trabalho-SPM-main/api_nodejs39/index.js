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

app.get("/recursos", async (req, res) => {
    try {
        const pool = await mssql.connect(stringSQL);

        const resultado = await pool
            .request()
            .query("SELECT * FROM recurso");

        res.json(resultado.recordset);

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            erro: erro.message
        });
    }
});

app.get("/reservas", async (req, res) => {
    try {
        const pool = await mssql.connect(stringSQL);

        const resultado = await pool
            .request()
            .query("SELECT * FROM reserva");

        res.json(resultado.recordset);

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            erro: erro.message
        });
    }
});

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




// TESTAR
app.get("/", (req, res) => {
    res.json({
        message: "Servidor rodando"
    });
});

//  STARTAR
app.listen(porta, () => {
    console.log(`API funcionando!`);
    console.log(`Servidor rodando em: http://localhost:${porta}`);
});


// LISTAR RECURSOS
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

// BUSCA ID
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

// CADASTRAR 
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

// LISTAR TODOS OS STATUS
app.get("/status", async (req, res) => {
    try {
        const pool = await poolPromise;

        const resultado = await pool.request().query(`
            SELECT *
            FROM dbo.status
        `);

        res.json(resultado.recordset);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: "Erro ao listar status" });
    }
});

// BUSCAR STATUS POR CÓDIGO
app.get("/status/:codigo", async (req, res) => {
    try {
        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("codigo", sql.Int, req.params.codigo)
            .query(`
                SELECT *
                FROM dbo.status
                WHERE codigo = @codigo
            `);

        if (resultado.recordset.length === 0) {
            return res.status(404).json({
                mensagem: "Status não encontrado"
            });
        }

        res.json(resultado.recordset[0]);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: "Erro ao buscar status" });
    }
});

// CADASTRAR STATUS
app.post("/status", async (req, res) => {
    try {
        const { codigo, nome, descricao } = req.body;

        if (
            !Number.isInteger(codigo) ||
            codigo <= 0 ||
            !nome
        ) {
            return res.status(400).json({
                mensagem: "Informe um código válido e o nome do status"
            });
        }

        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("codigo", sql.Int, codigo)
            .input("nome", sql.VarChar(50), nome)
            .input("descricao", sql.VarChar(150), descricao || null)
            .query(`
                INSERT INTO dbo.status (codigo, nome, descricao)
                OUTPUT INSERTED.*
                VALUES (@codigo, @nome, @descricao)
            `);

        res.status(201).json({
            mensagem: "Status cadastrado com sucesso!",
            status: resultado.recordset[0]
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro ao cadastrar status. Verifique se o código já existe."
        });
    }
});

// ATUALIZAR STATUS
app.patch("/status/:codigo", async (req, res) => {
    try {
        const codigo = Number(req.params.codigo);
        const { nome, descricao } = req.body;

        if (!Number.isInteger(codigo) || codigo <= 0 || !nome) {
            return res.status(400).json({
                mensagem: "Informe um código válido e o nome do status"
            });
        }

        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("codigo", sql.Int, codigo)
            .input("nome", sql.VarChar(50), nome)
            .input("descricao", sql.VarChar(150), descricao || null)
            .query(`
                UPDATE dbo.status
                SET nome = @nome,
                    descricao = @descricao
                WHERE codigo = @codigo;

                SELECT *
                FROM dbo.status
                WHERE codigo = @codigo;
            `);

        if (resultado.recordset.length === 0) {
            return res.status(404).json({
                mensagem: "Status não encontrado"
            });
        }

        res.json({
            mensagem: "Status atualizado com sucesso!",
            status: resultado.recordset[0]
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: "Erro ao atualizar status" });
    }
});

// EXCLUIR STATUS
app.delete("/status/:codigo", async (req, res) => {
    try {
        const codigo = Number(req.params.codigo);

        if (!Number.isInteger(codigo) || codigo <= 0) {
            return res.status(400).json({ mensagem: "Código inválido" });
        }

        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("codigo", sql.Int, codigo)
            .query(`
                DELETE FROM dbo.status
                WHERE codigo = @codigo;

                SELECT @@ROWCOUNT AS quantidade;
            `);

        if (resultado.recordset[0].quantidade === 0) {
            return res.status(404).json({
                mensagem: "Status não encontrado"
            });
        }

        res.json({ mensagem: "Status excluído com sucesso!" });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Não foi possível excluir. Verifique se existem reservas vinculadas."
        });
    }
});