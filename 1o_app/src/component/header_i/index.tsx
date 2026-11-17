

import Link from "next/link";

export function Header_i() 
{
  return (
    <header className="flex px-2 py-4 bg-gray-600 text-white">
      <div className="flex items-center mx-5 justify-between w-full mx-auto max-w-3xl">
        <div className="rounded-lg flex px-2 py-4 bg-gray-400 text-white">
          <h1 className="text-center font-bold mt-3 text-2xl">
           Cadastro e login
          </h1>
        </div>
      </div>
      <nav>
        <ul className="flex items-center mx-5 justify-center gap-10 border border-gray-200 rounded-xl px-6 py-3 ">
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/Cadastro">Cadastro</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

