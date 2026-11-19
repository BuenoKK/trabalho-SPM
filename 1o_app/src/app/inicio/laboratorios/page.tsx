
"use client";

import type React from "react";

export default function Laboratorios() {
  // Temporário: substitua pelo ID do usuário autenticado.
  const id_usuario = 1;

  async function pegardados(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const elementoFormulario = event.currentTarget;
    const formulario = new FormData(elementoFormulario);

    const dados = {
      nome: String(formulario.get("codigo") ?? "").trim(),
      tipo: String(formulario.get("tipo") ?? ""),
      capacidade: Number(formulario.get("capacidade")),
      localizacao: String(formulario.get("localizacao") ?? "").trim(),
    };

    if (
      !dados.nome ||
      !dados.tipo ||
      !Number.isInteger(dados.capacidade) ||
      dados.capacidade <= 0 ||
      !dados.localizacao
    ) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    // Recupera o token do login
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Você precisa fazer login para cadastrar.");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:8080/recursos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        alert(resultado.mensagem || resultado.erro || "Erro ao cadastrar recurso.");
        console.error("Erro da API:", resultado);
        return;
      }

      alert(resultado.mensagem || "Recurso cadastrado com sucesso!");
      elementoFormulario.reset();

    } catch (erro) {
      console.error("Erro ao cadastrar recurso:", erro);
      alert("Não foi possível conectar ao servidor.");
    }
  }

  async function pegardadosL(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const elementoFormulario = event.currentTarget;
    const formulario = new FormData(elementoFormulario);

    const dados = {
        codigo: String(formulario.get("codigo") ?? "").trim(),
        hora_inicial: String(formulario.get("hora_inicial") ?? ""),
        hora_final: String(formulario.get("hora_final") ?? ""),
        date_inicial: String(formulario.get("date_inicial") ?? ""),
        date_final: String(formulario.get("date_final") ?? ""),
    };

    if (
        !dados.codigo ||
        !dados.hora_inicial ||
        !dados.hora_final ||
        !dados.date_inicial ||
        !dados.date_final
    ) {
        alert("Preencha todos os campos da reserva.");
        return;
    }

    if (dados.date_final < dados.date_inicial) {
        alert("A data final não pode ser anterior à data inicial.");
        return;
    }

    if (
        dados.date_inicial === dados.date_final &&
        dados.hora_final <= dados.hora_inicial
    ) {
        alert("O horário final deve ser posterior ao horário inicial.");
        return;
    }

    
    const token = sessionStorage.getItem("token");

    if (!token) {
        alert("Você precisa fazer login para realizar uma reserva.");
        return;
    }

    try {
        const resposta = await fetch("http://localhost:8080/reservas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(dados),
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.mensagem || resultado.erro || "Erro ao realizar reserva.");
            console.error("Erro da API:", resultado);
            return;
        }

        alert(
            `${resultado.mensagem} Número da reserva: ${resultado.id_reserva}`
        );

        elementoFormulario.reset();

    } catch (erro) {
        console.error("Erro ao realizar reserva:", erro);
        alert("Não foi possível conectar ao servidor.");
    }
}
  

  return (
    <div className="w-1/2">
  <h2 className="text-center mt-5 mb-2 font-bold text-2xl">
    Cadastro dos Laboratórios e Salas
  </h2>

  <h2 className="text-center mt-5 mb-2 font-bold text-2xl">
    Cadastrar:
  </h2>

  <div className="flex flex-col gap-4 mx-2 bg-gray-200 rounded-[30px] p-5">
    <form onSubmit={pegardados}>
      <label
        htmlFor="codigo"
        className="block text-sm font-medium text-gray-700"
      >
        Código:
        <input
          id="codigo"
          className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md"
          type="text"
          name="codigo"
          placeholder="xxxx-123"
          required
        />
      </label>

      <label
        htmlFor="tipo"
        className="block text-sm font-medium text-gray-700"
      >
        Sala ou Laboratório:
        <select
          id="tipo"
          name="tipo"
          className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md"
          required
        >
          <option value="Sala">Sala</option>
          <option value="Laboratorio">Laboratório</option>
        </select>
      </label>

      <label
        htmlFor="capacidade"
        className="block text-sm font-medium text-gray-700"
      >
        Capacidade:
        <input
          id="capacidade"
          className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md"
          type="number"
          name="capacidade"
          min="1"
          step="1"
          required
        />
      </label>

      <label
        htmlFor="localizacao"
        className="block text-sm font-medium text-gray-700"
      >
        Localização:
        <input
          id="localizacao"
          className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md"
          type="text"
          name="localizacao"
          required
        />
      </label>

      <br />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Cadastrar Laboratórios ou Salas
      </button>
    </form>
  </div>

  <h2 className="text-center mt-5 mb-2 font-bold text-2xl">
    Reserva:
  </h2>

  <div className="flex flex-col gap-4 mx-2 bg-gray-200 rounded-[30px] p-5">
    <form onSubmit={pegardadosL}>
      <label
        htmlFor="codigo-reserva"
        className="block text-sm font-medium text-gray-700"
      >
        Código do recurso:
        <input
          id="codigo-reserva"
          className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md"
          type="text"
          name="codigo"
          placeholder="Código da sala ou laboratório"
          required
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label
          htmlFor="hora_inicial"
          className="block text-sm font-medium text-gray-700"
        >
          Horário inicial:
          <input
            id="hora_inicial"
            className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md"
            type="time"
            name="hora_inicial"
            required
          />
        </label>

        <label
          htmlFor="hora_final"
          className="block text-sm font-medium text-gray-700"
        >
          Horário final:
          <input
            id="hora_final"
            className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md"
            type="time"
            name="hora_final"
            required
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label
          htmlFor="date_inicial"
          className="block text-sm font-medium text-gray-700"
        >
          Data inicial:
          <input
            id="date_inicial"
            className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md"
            type="date"
            name="date_inicial"
            required
          />
        </label>

        <label
          htmlFor="date_final"
          className="block text-sm font-medium text-gray-700"
        >
          Data final:
          <input
            id="date_final"
            className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md"
            type="date"
            name="date_final"
            required
          />
        </label>
      </div>

      <br />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Reservar Laboratório ou Sala
      </button>
    </form>
  </div>

  <br />
</div>
  );
}
