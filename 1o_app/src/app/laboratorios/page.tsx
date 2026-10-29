

"use client";

export default function Laboratórios() {



  return (
    <div>
      <div>
        <h2 className="text-center mt-5 mb-2 font-bold text-2xl color-white">
          Cadastro dos Laboratorios e Salas
        </h2>
      </div>

      <div>
        <h2 className="text-center mt-5 mb-2 font-bold text-2xl color-white">
          Cadastrar:
        </h2>
      </div>

      <div className="flex flex-col gap-4 mx-2 bg-gray-200 rounded-[30px] p-5">
        <form onSubmit={pegardados}>
          <label>Laboratorios/Salas</label>
          <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
            Codigo:
            <input id="codigo" className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="text" name="codigo" placeholder="xxxx-123" />
          </label>

          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
            Sala ou Laboratorio:
            <select id="tipo" name="tipo">
              <option value="Sala">Sala</option>
              <option value="Laboratorio">Laboratorio</option>
            </select>
          </label>

          <label htmlFor="capacidade" className="block text-sm font-medium text-gray-700">
            Capacidade:
            <input id="capacidade" className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="number" name="capacidade" />
          </label>

          <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">
            Localização:
            <input id="localizacao" className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="text" name="localizacao" />
          </label>


          <br></br>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200">
            Cadastrar Laboratorios ou Salas
          </button>

        </form>
      </div>





      <div>
        <h2 className="text-center mt-5 mb-2 font-bold text-2xl color-white">
          Reserva:
        </h2>
      </div>


      <div className="flex flex-col gap-4 mx-2 bg-gray-200 rounded-[30px] p-5">
        <div></div>
        <form onSubmit={pegardadosL}>
          <label>Laboratorios</label>
          <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
            Codigo:
            <input id="codigo" className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="text" name="codigo" placeholder="xxxx-123" />
          </label>

          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
            Sala ou Laboratorio:
            <select id="tipo" name="tipo">
              <option value="Sala">Sala</option>
              <option value="Laboratorio">Laboratorio</option>
            </select>
          </label>

          <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">
            Localização:
            <input id="localizacao" className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="text" name="localizacao" />
          </label>


          <div className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="hora_inicial" className="block text-sm font-medium text-gray-700">
                horario Inicial:
                <input id="hora_inicial" className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  type="text" name="hora_inicial" />
              </label>
              <label htmlFor="hora_final" className="block text-sm font-medium text-gray-700">
                horario Final:
                <input id="hora_final" className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  type="text" name="hora_final" />
              </label>
            </div>


            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="date_inicial" className="block text-sm font-medium text-gray-700">
                data inicial:
                <input id="date_inicial" className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  type="date" name="date_inicial" />
              </label>
              <label htmlFor="date_final" className="block text-sm font-medium text-gray-700">
                data Final:
                <input id="date_final" className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  type="date" name="date_final" />
              </label>
            </div>


          </div>

          <br></br>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200">
            Reserva Laboratorios ou Salas
          </button>

        </form>

      </div>


      <br></br>
    </div>
  );

  function pegardados(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formulario = new FormData(event.currentTarget);



    const dados = {
      codigo: formulario.get("codigo"),
      tipo: formulario.get("tipo"),
      capacidade: formulario.get("capacidade"),
      localizacao: formulario.get("localizacao")
    };

    if (
      !dados.codigo ||
      !dados.tipo ||
      !dados.capacidade ||
      !dados.localizacao

    ) {
      alert("cadastro de Laboratorio incompleto :")
      return;
    }

    console.log(dados)

  }

  function pegardadosL(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formulario = new FormData(event.currentTarget);



    const dadosl = {
      codigo: formulario.get("codigo"),
      tipo: formulario.get("tipo"),
      capacidade: formulario.get("capacidade"),
      localizacao: formulario.get("localizacao"),
      hora_inicial: formulario.get("hora_inicial"),
      hora_final: formulario.get("hora_inicial"),
      date_final : formulario.get("date_final"),
      date_inicial : formulario.get("date_final")

    };

    if (
      !dadosl.codigo ||
      !dadosl.tipo ||
      !dadosl.capacidade ||
      !dadosl.localizacao ||
      !dadosl.hora_inicial  ||
      !dadosl.hora_final  ||
      !dadosl.date_inicial ||
      !dadosl.date_final  

    ) {
      alert("cadastro de Laboratorio incompleto :")
      return;
    }
    else {
      fetch("http://localhost:8080/recursos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosl)
      });
      
    }

    console.log(dadosl)

  }






}
