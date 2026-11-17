
import jwt from "jsonwebtoken";

export default function verificarToken(req, res, next) {
  try {
    const autorizacao = req.headers.authorization;

    if (!autorizacao) {
      return res.status(401).json({
        mensagem: "Faça login para acessar esta funcionalidade.",
      });
    }

    const token = autorizacao.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        mensagem: "Token não informado.",
      });
    }

    const dadosUsuario = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.usuario = dadosUsuario;

    next();
  } catch (erro) {
    return res.status(401).json({
      mensagem: "Sessão inválida ou expirada. Faça login novamente.",
    });
  }
}
