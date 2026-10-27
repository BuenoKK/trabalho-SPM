
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Usuario {
  id_usuario: number;
  cpf: number;
  nome_completo: string;
  data_aniversario: Date;
  celular: number;
  email: string;
}

export default async function Cadastro() {
  const router = useRouter();
  const [mostrarSenha, setMostrarSenha] = useState(false);




  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Formulário de Contato</h2>

        <div className="text-blue-600 font-medium">
          Login
        </div>

        <form onSubmit={pegarDados}>

          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            E-mail:
            <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="email" name="email" />
          </label>

          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
            Senha:
            <div className="relative">
              <input id="senha"
                className="mt-1 block w-full px-4 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                type={mostrarSenha ? "text" : "password"} name="senha" />
              <button
                type="button" onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {mostrarSenha ? "👁" : "👁‍🗨"}
              </button>
            </div>
          </label>


          <br></br>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200">
            Enviando Dados
          </button>
          <h3><Link href="/cadastro" className="text-blue-600 hover:underline text-center">Cadastro</Link></h3>
        </form>
      </div>
      <div id="conta" className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">

      </div>
    </div>
  );





    function pegarDados(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const formulario = new FormData(event.currentTarget);

      const dados = {
        email: formulario.get("email"),
        senha: formulario.get("senha"),

      };

      if (
        !dados.email ||
        !dados.senha
      ) {
        alert("cadastro incompleto:");
        return;

      }
    
      

      console.log(dados)

    }



  };



