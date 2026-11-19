
"use client";

import { useEffect, useState } from "react";

interface Sala {
    id_recurso: number;
    nome: string;
    tipo: string;
    capacidade: number;
    localizacao: string;
}

interface Consulta {
    id_reserva: number;
    data_inicial: string;
    data_final: string;
    hora_inicial: string;
    hora_final: string;
    id_usuario: number;
    id_recurso: number;
    codigo_status: number;
}

export default function Laboratorios() {
    const [recursos, setRecursos] = useState<Sala[]>([]);
    const [reservas, setReservas] = useState<Consulta[]>([]);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarDados() {
            try {
                const resrecursos = await fetch(
                    "http://localhost:8080/recursos"
                );

                if (!resrecursos.ok) {
                    throw new Error("Erro ao buscar salas e laboratórios.");
                }

                const dadosRecursos = await resrecursos.json();

                setRecursos(
                    Array.isArray(dadosRecursos) ? dadosRecursos : []
                );

                const token = sessionStorage.getItem("token");

                if (!token) {
                    setErro("Faça login para consultar as reservas.");
                    return;
                }

                const resreservas = await fetch(
                    "http://localhost:8080/reservas",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const dadosReservas = await resreservas.json();

                if (!resreservas.ok) {
                    throw new Error(
                        dadosReservas.mensagem || "Erro ao buscar reservas."
                    );
                }

                setReservas(
                    Array.isArray(dadosReservas) ? dadosReservas : []
                );

            } catch (erro) {
                setErro(
                    erro instanceof Error
                        ? erro.message
                        : "Erro inesperado."
                );
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, []);

    if (carregando) {
        return <p className="text-white">Carregando...</p>;
    }

    return (
        

        <div>
    <h2 className="text-center mt-5 mb-6 font-bold text-2xl text-gray-100">
        Salas de Aula e Laboratórios
    </h2>

  
    <div className="flex flex-row gap-6 mx-2">

       
        <div className="flex flex-col">

            <h3 className="font-bold text-xl mb-3 text-gray-200">
                Salas e Laboratórios
            </h3>

            <div className="w-[407px] h-[500px] overflow-y-auto bg-gray-800 p-4 flex flex-col gap-4">

                {recursos.map((recurso) => (
                    <div
                        key={recurso.id_recurso}
                        className="bg-gray-300 p-4 rounded-md w-full"
                    >
                        <p><strong>Código:</strong> {recurso.nome}</p>
                        <p><strong>Tipo:</strong> {recurso.tipo}</p>
                        <p><strong>Capacidade:</strong> {recurso.capacidade}</p>
                        <p><strong>Localização:</strong> {recurso.localizacao}</p>
                    </div>
                ))}

            </div>
        </div>


        
        <div className="flex flex-col">

            <h3 className="font-bold text-xl mb-3 text-gray-200">
                Reservas
            </h3>

            {erro && (
                <p className="text-red-400 mb-4">{erro}</p>
            )}

            {!erro && reservas.length === 0 && (
                <p className="text-gray-200 mb-4">
                    Nenhuma reserva encontrada.
                </p>
            )}

            <div className="w-[440px] h-[500px] overflow-y-auto bg-gray-800 p-4 flex flex-col gap-4">

                {reservas.map((reserva) => (
                    <div
                        key={reserva.id_reserva}
                        className="bg-gray-300 p-4 rounded-md w-full"
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

    </div>
</div>

    );
}
