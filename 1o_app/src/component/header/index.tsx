import Link from "next/link";

export function Header() 
{
  return (
    <header className="flex px-2 py-4 bg-blue-600 text-white">
      <div className="flex items-center justify-between w-full mx-auto max-w-3xl">
        <div className="flex px-2 py-4 bg-blue-400 text-white">
          <h1 className="text-center font-bold mt-3 text-2xl">
            Reserva de Laboratório e Salas de Aula.
          </h1>
        </div>
      </div>
      <nav>
        <ul className="flex items-center justify-center gap-10 border border-blue-200 rounded-xl px-6 py-3 ">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/laboratorios">laboratorios/Salas/Materiais</Link>
          </li>
          <li>
            <Link href="/login">Conta</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
