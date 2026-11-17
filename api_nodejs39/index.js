
import "dotenv/config";
import express from "express";
import mssql from "mssql";
import cors from "cors";
import loginRoutes from "./src/routes/loginRoutes.js";
import verificarToken from "./src/middlewares/verificarToken.js";

const app = express();
const porta = process.env.PORTA || 8080;
const stringSQL = process.env.CONNECTION_STRING;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/auth", loginRoutes);

// TESTE DO SERVIDOR

app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando" });
});

// USUÁRIOS

app.get("/usuarios", verificarToken, async (req, res) => {
  try {
    const pool = await mssql.connect(stringSQL);

    const resultado = await pool.request().query(`
      SELECT * FROM dbo.usuario
    `);

    res.json(resultado.recordset);
  } catch (erro) {
    console.error("Erro ao listar usuários:", erro);
    res.status(500).json({ mensagem: "Erro ao listar usuários." });
  }
});

app.post("/usuarios", async (req, res) => {
  const {
    cpf,
    nome_completo,
    data_aniversario,
    celular,
    email,
    login,
    senha,
  } = req.body;

  if (
    !cpf ||
    !nome_completo ||
    !data_aniversario ||
    !celular ||
    !email ||
    !login ||
    !senha
  ) {
    return res.status(400).json({
      mensagem: "Preencha todos os campos do usuário.",
    });
  }

  let transaction;

  try {
    const pool = await mssql.connect(stringSQL);

    transaction = new mssql.Transaction(pool);
    await transaction.begin();

    const resultadoUsuario = await new mssql.Request(transaction)
      .input("cpf", mssql.VarChar(20), cpf)
      .input("nome", mssql.VarChar(150), nome_completo)
      .input("nascimento", mssql.Date, data_aniversario)
      .input("celular", mssql.VarChar(30), celular)
      .input("email", mssql.VarChar(150), email)
      .query(`
        INSERT INTO dbo.usuario
          (cpf, nome_completo, data_aniversario, celular, email)
        OUTPUT INSERTED.id_usuario
        VALUES
          (@cpf, @nome, @nascimento, @celular, @email)
      `);

    const id_usuario = resultadoUsuario.recordset[0].id_usuario;

    await new mssql.Request(transaction)
      .input("id_usuario", mssql.Int, id_usuario)
      .input("login", mssql.VarChar(100), login)
      .input("senha", mssql.VarChar(255), senha)
      .query(`
        INSERT INTO dbo.acesso_usuario (id_usuario, login, senha)
        VALUES (@id_usuario, @login, @senha)
      `);

    await transaction.commit();

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso.",
      id_usuario,
    });
  } catch (erro) {
    if (transaction) {
      try {
        await transaction.rollback();
      } catch (erroRollback) {
        console.error("Erro no rollback:", erroRollback);
      }
    }

    console.error("Erro ao cadastrar usuário:", erro);

    res.status(500).json({
      mensagem: "Erro ao cadastrar usuário.",
      erro: erro.message,
    });
  }
});

// RECURSOS (SALAS E LABORATÓRIOS)

app.get("/recursos", async (req, res) => {
  try {
    const pool = await mssql.connect(stringSQL);

    const resultado = await pool.request().query(`
      SELECT * FROM dbo.recurso ORDER BY id_recurso
    `);

    res.json(resultado.recordset);
  } catch (erro) {
    console.error("Erro ao listar recursos:", erro);
    res.status(500).json({ mensagem: "Erro ao listar recursos." });
  }
});

app.get("/recursos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ mensagem: "ID inválido." });
    }

    const pool = await mssql.connect(stringSQL);

    const resultado = await pool
      .request()
      .input("id", mssql.Int, id)
      .query(`
        SELECT * FROM dbo.recurso WHERE id_recurso = @id
      `);

    if (resultado.recordset.length === 0) {
      return res.status(404).json({
        mensagem: "Recurso não encontrado.",
      });
    }

    res.json(resultado.recordset[0]);
  } catch (erro) {
    console.error("Erro ao buscar recurso:", erro);
    res.status(500).json({ mensagem: "Erro ao buscar recurso." });
  }
});

app.post("/recursos", verificarToken, async (req, res) => {
  try {
    const { nome, tipo, capacidade, localizacao } = req.body;

    if (
      typeof nome !== "string" ||
      !nome.trim() ||
      !["Sala", "Laboratorio"].includes(tipo) ||
      !Number.isInteger(Number(capacidade)) ||
      Number(capacidade) <= 0 ||
      typeof localizacao !== "string" ||
      !localizacao.trim()
    ) {
      return res.status(400).json({
        mensagem: "Preencha os dados do recurso corretamente.",
      });
    }

    const pool = await mssql.connect(stringSQL);

    const resultado = await pool
      .request()
      .input("nome", mssql.VarChar(100), nome.trim())
      .input("tipo", mssql.VarChar(20), tipo)
      .input("capacidade", mssql.Int, Number(capacidade))
      .input("localizacao", mssql.VarChar(150), localizacao.trim())
      .query(`
        INSERT INTO dbo.recurso (nome, tipo, capacidade, localizacao)
        OUTPUT INSERTED.id_recurso
        VALUES (@nome, @tipo, @capacidade, @localizacao)
      `);

    res.status(201).json({
      mensagem: "Sala ou laboratório cadastrado com sucesso.",
      id_recurso: resultado.recordset[0].id_recurso,
    });
  } catch (erro) {
    console.error("Erro ao cadastrar recurso:", erro);

    res.status(500).json({
      mensagem: "Erro ao cadastrar recurso.",
      erro: erro.message,
    });
  }
});

app.patch("/recursos/:id", verificarToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nome, tipo, capacidade, localizacao } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ mensagem: "ID inválido." });
    }

    if (
      typeof nome !== "string" ||
      !nome.trim() ||
      !["Sala", "Laboratorio"].includes(tipo) ||
      !Number.isInteger(Number(capacidade)) ||
      Number(capacidade) <= 0 ||
      typeof localizacao !== "string" ||
      !localizacao.trim()
    ) {
      return res.status(400).json({
        mensagem: "Preencha os dados do recurso corretamente.",
      });
    }

    const pool = await mssql.connect(stringSQL);

    const resultado = await pool
      .request()
      .input("id", mssql.Int, id)
      .input("nome", mssql.VarChar(100), nome.trim())
      .input("tipo", mssql.VarChar(20), tipo)
      .input("capacidade", mssql.Int, Number(capacidade))
      .input("localizacao", mssql.VarChar(150), localizacao.trim())
      .query(`
        UPDATE dbo.recurso
        SET nome = @nome,
            tipo = @tipo,
            capacidade = @capacidade,
            localizacao = @localizacao
        WHERE id_recurso = @id
      `);

    if (resultado.rowsAffected[0] === 0) {
      return res.status(404).json({
        mensagem: "Recurso não encontrado.",
      });
    }

    res.json({ mensagem: "Recurso atualizado com sucesso." });
  } catch (erro) {
    console.error("Erro ao atualizar recurso:", erro);
    res.status(500).json({ mensagem: "Erro ao atualizar recurso." });
  }
});

app.delete("/recursos/:id", verificarToken, async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ mensagem: "ID inválido." });
    }

    const pool = await mssql.connect(stringSQL);

    const resultado = await pool
      .request()
      .input("id", mssql.Int, id)
      .query(`
        DELETE FROM dbo.recurso WHERE id_recurso = @id
      `);

    if (resultado.rowsAffected[0] === 0) {
      return res.status(404).json({
        mensagem: "Recurso não encontrado.",
      });
    }

    res.json({ mensagem: "Recurso excluído com sucesso." });
  } catch (erro) {
    console.error("Erro ao excluir recurso:", erro);

    res.status(500).json({
      mensagem: "Não foi possível excluir o recurso. Verifique se existem reservas vinculadas.",
    });
  }
});


// RESERVAS

// Listar reservas - exige login
app.get("/reservas", verificarToken, async (req, res) => {
  try {
    const pool = await mssql.connect(stringSQL);

    const resultado = await pool.request().query(`
      SELECT
        r.id_reserva,
        r.data_inicial,
        r.data_final,
        r.hora_inicial,
        r.hora_final,
        r.id_usuario,
        r.id_recurso,
        rc.nome AS nome_recurso,
        rc.tipo AS tipo_recurso,
        r.codigo_status,
        s.nome AS nome_status
      FROM dbo.reserva r
      INNER JOIN dbo.recurso rc
        ON rc.id_recurso = r.id_recurso
      INNER JOIN dbo.status s
        ON s.codigo = r.codigo_status
      ORDER BY r.data_inicial, r.hora_inicial
    `);

    res.json(resultado.recordset);
  } catch (erro) {
    console.error("Erro ao listar reservas:", erro);
    res.status(500).json({ mensagem: "Erro ao listar reservas." });
  }
});

app.post("/reservas", verificarToken, async (req, res) => {
  try {
    const {
      codigo,
      hora_inicial,
      hora_final,
      date_inicial,
      date_final,
    } = req.body;

    const id_usuario = req.usuario.id_usuario;

    if (
      typeof codigo !== "string" ||
      !codigo.trim() ||
      !date_inicial ||
      !date_final ||
      !hora_inicial ||
      !hora_final
    ) {
      return res.status(400).json({
        mensagem: "Preencha todos os campos da reserva.",
      });
    }

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date_inicial) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date_final) ||
      !/^\d{2}:\d{2}$/.test(hora_inicial) ||
      !/^\d{2}:\d{2}$/.test(hora_final)
    ) {
      return res.status(400).json({
        mensagem: "Formato de data ou horário inválido.",
      });
    }

    if (date_final < date_inicial) {
      return res.status(400).json({
        mensagem: "A data final não pode ser anterior à inicial.",
      });
    }

    if (date_inicial === date_final && hora_final <= hora_inicial) {
      return res.status(400).json({
        mensagem: "O horário final deve ser posterior ao inicial.",
      });
    }

    const pool = await mssql.connect(stringSQL);

    const recurso = await pool
      .request()
      .input("codigo", mssql.VarChar(100), codigo.trim())
      .query(`
        SELECT id_recurso
        FROM dbo.recurso
        WHERE nome = @codigo
      `);

    if (recurso.recordset.length === 0) {
      return res.status(404).json({
        mensagem: "Sala ou laboratório não encontrado. Confira o código.",
      });
    }

    const id_recurso = recurso.recordset[0].id_recurso;

    const usuario = await pool
      .request()
      .input("id_usuario", mssql.Int, Number(id_usuario))
      .query(`
        SELECT id_usuario
        FROM dbo.usuario
        WHERE id_usuario = @id_usuario
      `);

    if (usuario.recordset.length === 0) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado.",
      });
    }

    const status = await pool.request().query(`
      SELECT codigo
      FROM dbo.status
      WHERE nome = 'Reservado'
    `);

    if (status.recordset.length === 0) {
      return res.status(500).json({
        mensagem: "O status 'Reservado' não existe na tabela dbo.status.",
      });
    }

    const codigo_status = status.recordset[0].codigo;

    const conflito = await pool
      .request()
      .input("id_recurso", mssql.Int, id_recurso)
      .input("data_inicial", mssql.Date, date_inicial)
      .input("data_final", mssql.Date, date_final)
      .input("hora_inicial", mssql.VarChar(5), hora_inicial)
      .input("hora_final", mssql.VarChar(5), hora_final)
      .query(`
        SELECT TOP 1 id_reserva
        FROM dbo.reserva
        WHERE id_recurso = @id_recurso
          AND data_inicial <= @data_final
          AND data_final >= @data_inicial
          AND hora_inicial < CAST(@hora_final AS time)
          AND hora_final > CAST(@hora_inicial AS time)
      `);

    if (conflito.recordset.length > 0) {
      return res.status(409).json({
        mensagem: "Esse recurso já possui uma reserva nesse período.",
      });
    }

    const resultado = await pool
      .request()
      .input("data_inicial", mssql.Date, date_inicial)
      .input("data_final", mssql.Date, date_final)
      .input("hora_inicial", mssql.VarChar(5), hora_inicial)
      .input("hora_final", mssql.VarChar(5), hora_final)
      .input("id_usuario", mssql.Int, Number(id_usuario))
      .input("id_recurso", mssql.Int, id_recurso)
      .input("codigo_status", mssql.Int, codigo_status)
      .query(`
        INSERT INTO dbo.reserva (
          data_inicial,
          data_final,
          hora_inicial,
          hora_final,
          id_usuario,
          id_recurso,
          codigo_status
        )
        OUTPUT INSERTED.id_reserva
        VALUES (
          @data_inicial,
          @data_final,
          CAST(@hora_inicial AS time),
          CAST(@hora_final AS time),
          @id_usuario,
          @id_recurso,
          @codigo_status
        )
      `);

    res.status(201).json({
      mensagem: "Reserva realizada com sucesso!",
      id_reserva: resultado.recordset[0].id_reserva,
    });
  } catch (erro) {
    console.error("Erro ao cadastrar reserva:", erro);

    res.status(500).json({
      mensagem: "Erro ao cadastrar reserva.",
      erro: erro.message,
    });
  }
});

// STATUS

app.get("/status", async (req, res) => {
  try {
    const pool = await mssql.connect(stringSQL);

    const resultado = await pool.request().query(`
      SELECT * FROM dbo.status ORDER BY codigo
    `);

    res.json(resultado.recordset);
  } catch (erro) {
    console.error("Erro ao listar status:", erro);
    res.status(500).json({ mensagem: "Erro ao listar status." });
  }
});

app.get("/status/:codigo", async (req, res) => {
  try {
    const codigo = Number(req.params.codigo);

    if (!Number.isInteger(codigo)) {
      return res.status(400).json({ mensagem: "Código inválido." });
    }

    const pool = await mssql.connect(stringSQL);

    const resultado = await pool
      .request()
      .input("codigo", mssql.Int, codigo)
      .query(`
        SELECT * FROM dbo.status WHERE codigo = @codigo
      `);

    if (resultado.recordset.length === 0) {
      return res.status(404).json({
        mensagem: "Status não encontrado.",
      });
    }

    res.json(resultado.recordset[0]);
  } catch (erro) {
    console.error("Erro ao buscar status:", erro);
    res.status(500).json({ mensagem: "Erro ao buscar status." });
  }
});

app.post("/status", async (req, res) => {
  try {
    const { codigo, nome, descricao } = req.body;

    if (
      codigo === undefined ||
      !Number.isInteger(Number(codigo)) ||
      !nome?.trim()
    ) {
      return res.status(400).json({
        mensagem: "Informe o código e o nome do status.",
      });
    }

    const pool = await mssql.connect(stringSQL);

    await pool
      .request()
      .input("codigo", mssql.Int, Number(codigo))
      .input("nome", mssql.VarChar(50), nome.trim())
      .input("descricao", mssql.VarChar(150), descricao || null)
      .query(`
        INSERT INTO dbo.status (codigo, nome, descricao)
        VALUES (@codigo, @nome, @descricao)
      `);

    res.status(201).json({
      mensagem: "Status cadastrado com sucesso.",
    });
  } catch (erro) {
    console.error("Erro ao cadastrar status:", erro);
    res.status(500).json({ mensagem: "Erro ao cadastrar status." });
  }
});

app.patch("/status/:codigo", async (req, res) => {
  try {
    const codigo = Number(req.params.codigo);
    const { nome, descricao } = req.body;

    if (!Number.isInteger(codigo) || !nome?.trim()) {
      return res.status(400).json({
        mensagem: "Informe um código válido e o nome do status.",
      });
    }

    const pool = await mssql.connect(stringSQL);

    const resultado = await pool
      .request()
      .input("codigo", mssql.Int, codigo)
      .input("nome", mssql.VarChar(50), nome.trim())
      .input("descricao", mssql.VarChar(150), descricao || null)
      .query(`
        UPDATE dbo.status
        SET nome = @nome, descricao = @descricao
        WHERE codigo = @codigo
      `);

    if (resultado.rowsAffected[0] === 0) {
      return res.status(404).json({
        mensagem: "Status não encontrado.",
      });
    }

    res.json({ mensagem: "Status atualizado com sucesso." });
  } catch (erro) {
    console.error("Erro ao atualizar status:", erro);
    res.status(500).json({ mensagem: "Erro ao atualizar status." });
  }
});

app.delete("/status/:codigo", async (req, res) => {
  try {
    const codigo = Number(req.params.codigo);

    if (!Number.isInteger(codigo)) {
      return res.status(400).json({ mensagem: "Código inválido." });
    }

    const pool = await mssql.connect(stringSQL);

    const resultado = await pool
      .request()
      .input("codigo", mssql.Int, codigo)
      .query(`
        DELETE FROM dbo.status WHERE codigo = @codigo
      `);

    if (resultado.rowsAffected[0] === 0) {
      return res.status(404).json({
        mensagem: "Status não encontrado.",
      });
    }

    res.json({ mensagem: "Status excluído com sucesso." });
  } catch (erro) {
    console.error("Erro ao excluir status:", erro);

    res.status(500).json({
      mensagem: "Não foi possível excluir o status. Verifique se está vinculado a uma reserva.",
    });
  }
});


// INICIAR 

if (!stringSQL) {
  console.error(
    "A variável CONNECTION_STRING não foi definida no arquivo .env."
  );
  process.exit(1);
}

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
