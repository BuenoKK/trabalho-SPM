interface Sala {
    id_recurso: number;
    nome: string;
    tipo: string;
    capacidade: number;
    localizacao: string;
}

interface Consulta {
    id_reserva: number;
    data_inicial: Date;
    data_final: Date;
    hora_inicial: number;
    hora_final: number;
    id_usuario: number;
    id_recurso: number;
    codigo_status: number;
}


export default async function Laboratorios() {

    const [resrecursos, resreservas] = await Promise.all([
        fetch("http://localhost:8080/recursos"),
        fetch("http://localhost:8080/reservas")


    ]);

    if (!resrecursos.ok) {
        throw new Error(`Erro ao buscar salas: ${resrecursos.status}`);
    }

   

    const recursos: Sala[] = await resrecursos.json();
    const reservas: Consulta[] = await resreservas.json();



    return (
        <div>
            <h2 className="text-center mt-5 mb-6 font-bold text-2xl text-gray-100">
                Salas de Aula e Laboratórios
            </h2>

            <h3 className="font-bold text-xl mb-3 text-gray-200">
                Salas e Laboratorios
            </h3>

            <div className="flex flex-col gap-4 mx-2 mb-8">
                {recursos.map((recurso) => (
                    <div
                        key={recurso.id_recurso}
                        className="bg-gray-300 p-4 rounded-md"
                    >
                        <p><strong>Nome:</strong> {recurso.nome}</p>
                        <p><strong>Nome:</strong> {recurso.tipo}</p>
                        <p><strong>Capacidade:</strong> {recurso.capacidade}</p>
                        <p><strong>Localização:</strong> {recurso.localizacao}</p>
                    </div>
                ))}
            </div>

            <h2>reservas:</h2>

            <div className="flex flex-col gap-4 mx-2 mb-8">
                {reservas.map((reserva) => (
                    <div
                        key={reserva.id_reserva}
                        className="bg-gray-300 p-4 rounded-md"
                    >
                        <p>
                            <strong>Data inicial:</strong>{" "}
                            {new Date(reserva.data_inicial).toLocaleDateString("pt-BR")}
                        </p>

                        <p>
                            <strong>Data final:</strong>{" "}
                            {new Date(reserva.data_final).toLocaleDateString("pt-BR")}
                        </p>

                        <p><strong>Hora inicial:</strong> {reserva.hora_inicial}</p>
                        <p><strong>Hora final:</strong> {reserva.hora_final}</p>
                        <p><strong>ID usuário:</strong> {reserva.id_usuario}</p>
                        <p><strong>ID recurso:</strong> {reserva.id_recurso}</p>
                        <p><strong>Status:</strong> {reserva.codigo_status}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}