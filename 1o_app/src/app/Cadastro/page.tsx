"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const router = useRouter();
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function pegarDados(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formulario = new FormData(event.currentTarget);

    const dados = {
      cpf: String(formulario.get("cpf") ?? "").trim(),
      nome_completo: String(formulario.get("nome") ?? "").trim(),
      data_aniversario: String(formulario.get("aniversario") ?? ""),
      celular: String(formulario.get("celular") ?? "").trim(),
      email: String(formulario.get("email") ?? "").trim(),
      login: String(formulario.get("email") ?? "").trim(),
      senha: String(formulario.get("senha") ?? ""),
    };



    if (
      !dados.cpf ||
      !dados.nome_completo ||
      !dados.data_aniversario ||
      !dados.celular ||
      !dados.email ||
      !dados.senha
    ) {
      alert("Cadastro incompleto!");
      return;
    }
    alert("Cadastro realizado com sucesso!");
    router.push("/login");


    const resposta = await fetch("http://localhost:8080/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const texto = await resposta.text();
    console.log("STATUS:", resposta.status);
    console.log("RESPOSTA:", texto);
    console.log("ENVIADO:", dados);

    let resultado: any = {};
    try { resultado = JSON.parse(texto); } catch { }

    if (!resposta.ok) {
      alert(resultado.mensagem || resultado.message || texto || "Erro ao cadastrar usuário.");
      return;
    }

    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Formulário de Cadastro</h2>

        <div className="text-blue-600 font-medium">Cadastro</div>

        <form onSubmit={pegarDados}>
          <label htmlFor="cpf" className="block mb-4 text-sm font-medium text-gray-700">
            CPF:
            <input
              id="cpf"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              maxLength={14}
              name="cpf"
              placeholder="123.456.789-09"
            />
          </label>

          <label htmlFor="nome" className="block mb-4 text-sm font-medium text-gray-700">
            Nome completo:
            <input
              id="nome"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="nome"
            />
          </label>

          <label htmlFor="data" className="block mb-4 text-sm font-medium text-gray-700">
            Data de Aniversário:
            <input
              id="data"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="date"
              name="aniversario"
            />
          </label>

          <label htmlFor="celular" className="block mb-4 text-sm font-medium text-gray-700">
            Celular:
            <input
              id="celular"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="tel"
              name="celular"
            />
          </label>

          <label htmlFor="email" className="block mb-4 text-sm font-medium text-gray-700">
            E-mail:
            <input
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="email"
              name="email"
            />
          </label>

          <label htmlFor="senha" className="block mb-4 text-sm font-medium text-gray-700">
            Senha:
            <span className="relative block">
              <input
                id="senha"
                className="mt-1 block w-full px-4 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                type={mostrarSenha ? "text" : "password"}
                name="senha"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {mostrarSenha ? "👁" : "👁‍🗨"}
              </button>
            </span>
          </label>

          <br />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Enviar Dados
          </button>
        </form>
      </div>
    </div>
  );
}