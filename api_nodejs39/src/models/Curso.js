import conectaBD from "../config/dbConnect.js";

class Curso {

    constructor(id, nome, codcurso) {
        this.id = id;
        this.nome = nome;
        this.codcurso = codcurso;
    }

    static async buscarTodos() {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query("SELECT * from nodejs.curso");
            return result.recordset
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async buscarCursoPorId(idCurso) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * from nodejs.curso WHERE id=${idCurso}`);
            return result.recordset
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async removerCurso(idCurso) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`DELETE from nodejs.curso WHERE id=${idCurso}`);
        }
        catch (error) {
            throw new Error(`Erro na remoção ao BD: ${error}`);
        }
    }

    static async inserirCurso(curso) {
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
            const result = await conexao.query(`UPDATE nodejs.curso SET nome='${nomeNovo}', codcurso=${codcursoNovo} WHERE id=${id}`);
            return result;
        }
        catch (error) {
            throw new Error(`Erro na alteração ao BD: ${error}`);
        }
    }
}

export default Curso;