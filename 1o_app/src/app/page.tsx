


interface DadosDosAlunos {
  id: number;
  RA: string;
  nome: string;
  datanascimento: string;
  email: string;
  celular: string;
  idcurso: number;
}

  export default async function laboratórios()
  {
    // gerar requisicao HTPP
    const response = await fetch ("http://localhost:8080/alunos");

    // dados e uma lista que recebera os dados ivndos do json da
    const dados: DadosDosAlunos[] = await response.json();
    console.log("Dados dos ALUNOS vindo do JSON da API");
    console.log(dados);


      return (
        <div>
          <h2 className="text-center mt-5 mb-2 font-bold text-2x1">
            Listagem dos ALUNOS cadastrados no BD (table ALUNO)
          </h2>

          <div className="flex flex-col gap-4 mx-2">
            {
              dados.map((registro) => (
                <div key={registro.id} className="bg-gray-200 p-4 rounded-md">
                  <h2 className="font-bold">
                    RA: {registro.RA}
                  </h2>
                  <p>Nome: {registro.nome} </p>
                  <p>Data de Nascimento: {registro.datanascimento} </p>
                  <p>Email: {registro.email} </p>
                  <p>Celular: {registro.celular} </p>
                  <p>Codigo do Curso: {registro.idcurso} </p>
                </div>
              ))
            }
          </div>
          <br></br>
          <br></br>
        </div>
    );
  }
  