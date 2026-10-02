
"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

export default function Cadastro() 
{
  const router = useRouter();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Formulário de Contato</h2>

        <div className="text-blue-600 font-medium">
          Cadastro
        </div>
  
      <form onSubmit={pegarDados}>
<<<<<<< HEAD
      <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
          CPF:
          <input id="cpf" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
=======
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          CPF:
          <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
>>>>>>> da8efc1614a2a533da1d9e6bfe78d19dc45b2513
            type="number" name="cpf" placeholder="123.456.789-09"/>
        </label>

        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome completo:
<<<<<<< HEAD
          <input id="name" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="text" name="nome"/>
        </label>

        <label htmlFor="Cc" className="block text-sm font-medium text-gray-700">
          Codigo do Curso:
          <input id="cc" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
=======
          <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="text" name="nome"/>
        </label>

        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Codigo do Curso:
          <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
>>>>>>> da8efc1614a2a533da1d9e6bfe78d19dc45b2513
            type="number" name="codc"/>
        </label>


<<<<<<< HEAD
        <label htmlFor="data" className="block text-sm font-medium text-gray-700">
          Data de Aniversario:
          <input id="data" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="date" name="aniversario"/>
        </label>

        <label htmlFor="celular" className="block text-sm font-medium text-gray-700">
          Celular:
          <input id="celular" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="number" name="celular"/>
        </label>

        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          E-mail:
          <input id="email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
=======
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Data de Aniversario:
          <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="date" name="aniversario"/>
        </label>

        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Celular:
          <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="number" name="celular"/>
        </label>

        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          E-mail:
          <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
>>>>>>> da8efc1614a2a533da1d9e6bfe78d19dc45b2513
            type="email" name="email"/>
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


        <br></br>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200">
           Enviando Dados
        </button>
      </form>
    </div>
    </div>
  );

<<<<<<< HEAD

  function pegarDados(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();

  const formulario = new FormData(event.currentTarget);
=======
  function pegarDados(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();

    const formulario = new FormData(event.currentTarget);
>>>>>>> da8efc1614a2a533da1d9e6bfe78d19dc45b2513

    const dados = {
      cpf: formulario.get("cpf"),
      nome: formulario.get("nome"),
      codigocurso:formulario.get("codc"),
      aniversario: formulario.get("aniversario"),
      celular: formulario.get("celular"),
      email: formulario.get("email"),
      senha: formulario.get("senha"),
<<<<<<< HEAD
      };

      if (
        !dados.cpf ||
        !dados.nome  ||
        !dados.codigocurso  ||
        !dados.celular  ||
        !dados.email  ||
        !dados.senha  
      ){
        alert("cadastro incompleto");
        return;

      }     

      console.log(dados)

      router.push("/")

      }

    
  
=======
    };

    console.log(dados)

    router.push("/")

  }
>>>>>>> da8efc1614a2a533da1d9e6bfe78d19dc45b2513

}