
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
    const [logado, setLogado] = useState<boolean | null>(null);

    useEffect(() => {
        setLogado(!!sessionStorage.getItem("token"));
    }, []);

    function sair() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("usuario");

        window.dispatchEvent(new Event("auth-change"));

        setLogado(false);
    }

    if (logado === null) {
        return (<p className="text-white text-center mt-10">Carregando...</p>);
    }


    if (!logado) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">

                <h1 className=" text-4xl font-bold mb-6">
                    Sistema de Salas e Laboratórios
                </h1>

                <p className="text-lg max-w-xl mb-8">
                    Este site permite consultar e cadastrar salas,
                    laboratórios e reservas de maneira prática e organizada.
                </p>

                <Link
                    href="/login"
                    className="bg-indigo-600 text-white px-10 py-3 rounded-lg hover:bg-indigo-700"
                >
                    Login
                </Link>

            </main>
        );
    }

    return (
        <main className="min-h-screen p-6">

            <div className="flex justify-between items-center mb-10">

                <h1 className="text-3xl font-bold">
                    Painel Principal
                </h1>

                <button
                    onClick={sair}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                >
                    Sair
                </button>

            </div>

            <h2 className="text-xl mb-6">
                Bem-vindo! Escolha uma funcionalidade:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {}
                <Link
                    href="/inicio/consultas"
                    className="bg-gray-200 text-gray-800 p-8 rounded-xl hover:bg-gray-300"
                >
                    <h3 className="text-xl font-bold mb-2">
                        Consultar salas e laboratórios
                    </h3>

                    <p>
                        Visualizar salas, laboratórios e reservas cadastradas.
                    </p>
                </Link>

                {}
                <Link
                    href="/inicio/laboratorios"
                    className="bg-gray-200 text-gray-800 p-8 rounded-xl hover:bg-gray-300"
                >
                    <h3 className="text-xl font-bold mb-2">
                        Cadastro e reservas
                    </h3>

                    <p>
                        Cadastrar salas e laboratórios e realizar reservas.
                    </p>
                </Link>

            </div>

        </main>
    );
}
