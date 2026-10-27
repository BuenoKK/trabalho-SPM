

"use client";

export default function Laboratórios() {
  return (
    <div>
      <div>
        <h2 className="text-center mt-5 mb-2 font-bold text-2xl color-white">
          Cadastro dos Laboratorios e Salas
        </h2>
      </div>

      


      <div className="flex flex-col gap-4 mx-2 bg-gray-200 rounded-[30px] p-5">
        <div></div>
        <form onSubmit={pegardadosL}>
          <label>Laboratorios</label>
          <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
            Codigo:
            <input id="codigo" className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="number" name="codigo" placeholder="123" />
          </label>

          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome:
            <input id="name" className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="text" name="name" />
          </label>

          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
            tipo:
            <input id="tipo" className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="text" name="tipo" />
          </label>

          <label htmlFor="capacidadel" className="block text-sm font-medium text-gray-700">
            Capacidade:
            <input id="capacidadel" className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="number" name="capacidadel" />
          </label>

          <label htmlFor="localizacaol" className="block text-sm font-medium text-gray-700">
            Localização:
            <input id="localizacaol" className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="text" name="localizacaol" />
          </label>

          <br></br>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200">
            Cadastro dos Laboratorios
          </button>

        </form>

      </div>


      <br></br>
    </div>
  );

  function pegardadosL(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formulario = new FormData(event.currentTarget);



    const dados = {
      codigol: formulario.get("codigo"),
      namel: formulario.get("name"),
      tipo:formulario.get("tipo"),
      capacidade: formulario.get("capacidade"),
      localizacao: formulario.get("localizacao")
    };

    if (
      !dados.codigol ||
      !dados.namel ||
      !dados.tipo||
      !dados.capacidade ||
      !dados.localizacao

    ) {
      alert("cadastro de Laboratorio incompleto :")
      return;
    }

    console.log(dados)

  }
  




}
