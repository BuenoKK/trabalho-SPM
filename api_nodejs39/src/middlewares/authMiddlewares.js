
import jwt from 'jsonwebtoken';

function autenticarToken(req, res, next) {
    const autorizacao = req.headers.authorization;

    if (!autorizacao || !autorizacao.startsWith('Bearer ')) {
        return res.status(401).json({
            mensagem: 'Token não fornecido.'
        });
    }

    const token = autorizacao.split(' ')[1];

    try {
        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = usuario;

        next();
    } catch (erro) {
        return res.status(403).json({
            mensagem: 'Token inválido ou expirado.'
        });
    }
}

export default autenticarToken;
