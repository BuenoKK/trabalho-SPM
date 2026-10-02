"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-md">

        <h2 className="text-2xl font-semibold mb-4">
          Formulário de Login
        </h2>

        <form onSubmit={pegarDados}>

        
          <label
            htmlFor="email" className="block text-sm font-medium text-gray-700 mb-4">
            E-mail:
            <input
              id="email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="email"name="email"/>
          </label>

          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
            Senha:
            <div className="relative">
              <input id="senha"
                className="mt-1 block w-full px-4 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                type={mostrarSenha ? "text" : "password"} name="senha"/>
              <button
                type="button" onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {mostrarSenha ? "👁": "👁‍🗨"}
              </button>
            </div>
          </label>

          <br/>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200">
            Entrar
          </button>
           <a className="block text-sm font-medium text-blue-700 flex items-center justify-center ">
            <Link href="/Cadastro">Cadastro</Link>
            </a>
          
        </form>
      </div>
    </div>
  );

  function pegarDados(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();

    const formulario = new FormData(event.currentTarget);

    const dados = {
      email: formulario.get("email"),
      senha: formulario.get("senha")

    }

    if(
      !dados.email ||
      !dados.senha
    )
    {
      alert("login incompleto");
      return;
    }

    console.log(dados)

  }
}