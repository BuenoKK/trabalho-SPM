
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
    const [logado, setLogado] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        function verificarLogin() {
            setLogado(!!sessionStorage.getItem("token"));
        }

        verificarLogin();

        window.addEventListener("auth-change", verificarLogin);

        return () => {
            window.removeEventListener("auth-change", verificarLogin);
        };
    }, [pathname]);

    return (
        <header className="flex items-center px-2 py-4 bg-gray-600 text-white">
            <div className="flex items-center justify-between w-full mx-auto max-w-6xl">
                <div className="rounded-lg flex px-2 py-4 bg-gray-400 text-white">
                    <h1 className="text-center font-bold text-xl">
                        Reserva de Laboratório e Salas de Aula
                    </h1>
                </div>

                {logado && (
                    <nav>
                        <ul className="flex items-center justify-center gap-6 border border-gray-200 rounded-xl px-6 py-3">
                            <li>
                                <Link href="/inicio/">Home</Link>
                            </li>
                            <li>
                                <Link href="/inicio/laboratorios">
                                    Laboratórios/Salas
                                </Link>
                            </li>
                            <li>
                                <Link href="/inicio/consultas">
                                    Consultas
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}
