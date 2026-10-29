import conectaBD from "../config/dbConnect.js";

class Usuario {

    constructor(cpf, nome, aniversario, celular , email , senha) {
        this.cpf = cpf;
        this.nome = nome;
        this.aniversario = aniversario;
        this.celular = celular  ;
        this.email = email  ;
        this.senha = senha  ;
    }

    static async buscarTodos() {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query("SELECT * from usuarios");
            return result.recordset
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async buscarUsuarioPorId(id_usuario) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * from nodejs.curso WHERE id_usuario=${id_usuario}`);
            return result.recordset
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async removerUsuario(id_usuario) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`DELETE from nodejs.curso WHERE id_usuario=${id_usuario}`);
        }
        catch (error) {
            throw new Error(`Erro na remoção ao BD: ${error}`);
        }
    }

    static async inserirUsuario(curso) {
        const { nomeNovo, codcursoNovo } = curso;
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`INSERT into nodejs.curso (nome, codcurso) VALUES ('${nomeNovo}', ${codcursoNovo})`);
            return result;
        }
        catch (error) {
            throw new Error(`Erro na inserção ao BD: ${error}`);
        }
    }

    static async alterarCurso(curso) {
        const { id, nome, codcurso } = curso;
        try {

            const conexao = await conectaBD();

            const result = await conexao.query(
                `UPDATE nodejs.curso SET nome='${nome}', 
                codcurso=${codcurso} WHERE id=${id}`
            );


            return result;
        }
        catch (error) {
            throw new Error(`Erro na alteração ao BD: ${error}`);
        }
    }
}

export default Curso;