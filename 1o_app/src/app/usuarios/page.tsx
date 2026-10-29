interface Sala {
    id_usuario: number;
    cpf: number;
    nome_completo: string;
    data_aniversario: Date;
    celular: number;
    email : string;
}

export default async function Laboratorios() {

    const [resrecursos] = await Promise.all([
        fetch("http://localhost:8080/usuarios")


    ]);

    if (!resrecursos.ok) {
        throw new Error(`Erro ao buscar salas: ${resrecursos.status}`);
    }

    const recursos: Sala[] = await resrecursos.json();

    return (
        <div>

            <h2 className="text-center mt-5 mb-6 font-bold text-2xl text-gray-100">
                Alunos Cadastrados
            </h2>

            <h3 className="font-bold text-xl mb-3 text-gray-200">
                Aluno:
            </h3>

            <div className="flex flex-col gap-4 mx-2 mb-8">
                {recursos.map((recurso) => (
                    <div                  key={recurso.id_usuario}
                        className="bg-gray-300 p-4 rounded-md"
                    >
                        <p><strong>CPF:</strong> {recurso.cpf}</p>
                        <p><strong>nome completo:</strong> {recurso.nome_completo}</p>
                        <p><strong>data aniversario:</strong> {recurso.data_aniversario}</p>
                        <p><strong>celular:</strong> {recurso.celular}</p>
                        <p><strong>email:</strong> {recurso.email}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}



