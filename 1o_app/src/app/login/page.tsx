
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function pegarDados(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const formulario = new FormData(event.currentTarget);

    const email = String(formulario.get("email") ?? "").trim();
    const senha = String(formulario.get("senha") ?? "");

    if (!email || !senha) {
      alert("Preencha o login e a senha!");
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch(
        "http://localhost:8080/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, senha }),
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        alert(resultado.mensagem || "Login ou senha incorretos.");
        return;
      }

      sessionStorage.setItem("token", resultado.token);
      sessionStorage.setItem(
        "usuario",
        JSON.stringify(resultado.usuario)
      );

      alert("Login realizado com sucesso!");
      router.push("/");
    } catch (erro) {
      console.error("Erro ao realizar login:", erro);
      alert("Não foi possível conectar à API.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">
          Formulário de Login
        </h2>

        <div className="text-blue-600 font-medium mb-4">
          Login
        </div>

        <form onSubmit={pegarDados}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            E-mail ou login:
            <input
              id="email"
              className="mt-1 mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="email"
              autoComplete="username"
              required
            />
          </label>

          <label
            htmlFor="senha"
            className="block text-sm font-medium text-gray-700"
          >
            Senha:
            <div className="relative">
              <input
                id="senha"
                className="mt-1 block w-full px-4 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                type={mostrarSenha ? "text" : "password"}
                name="senha"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarSenha ? "👁" : "👁‍🗨"}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={carregando}
            className="mt-5 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition duration-200"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>

          <p className="mt-4 text-center">
            Ainda não tem conta?{" "}
            <Link
              href="/Cadastro"
              className="text-blue-600 hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
