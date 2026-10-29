import curso from '../models/Cadastro.js';

class cadastroController {

    static async listarCadastro(req,res){
        try{
            const listaCadastro = await Cadastro.buscarTodos();  
        res.status(200).json(listaCadastro);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async listarCadastroPorId(req, res){
        const idProcurado = req.params.id;
        try{
            const listaCadastro = await curso.buscarCadastroPorId(idProcurado);
            res.status(200).json(listaCadastro);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async removerCadastro(req,res){
        const idProcurado = req.params.id;
        try{
            const listaCursos = await curso.removerCadastro(idProcurado);
            res.status(200).json({message: "Removido com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async inserirCadastro(req,res){
        const cursoNovo = req.body;
        try{
            const result = await curso.inserirCadastro(cursoNovo);
            res.status(200).json({message: "Inserido com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async alterarCurso(req, res){
        const idCurso = req.params.id;
        const { nome, codcurso } = req.body;
        try{
            const result = await curso.alterarCurso({id: idCurso, nome: nome, codcurso: codcurso });
            res.status(200).json({message: "Alterado com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }   

    }
}

export default cursoController;

