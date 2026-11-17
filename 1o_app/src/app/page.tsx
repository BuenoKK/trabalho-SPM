export default function QuemSomos() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6 p-6">

            <div className="bg-gray-500 rounded-2xl p-6 text-white shadow-lg w-full max-w-2xl">
                <h1>Seja bem-vindo!</h1>

                <h3>
                    É um prazer ter você por aqui!
                    Nosso sistema foi desenvolvido para proporcionar
                    uma experiência simples, prática e eficiente.
                    Para começar a aproveitar todos os recursos disponíveis,
                    você pode realizar seu cadastro ou acessar sua conta caso
                    já possua uma.
                </h3>
            </div>

            <div className="bg-gray-500 rounded-2xl p-6 text-white shadow-lg w-full max-w-2xl">
                <h1>Crie sua conta</h1>

                <h3>
                    Ainda não possui uma conta? Não se preocupe!
                    Faça seu cadastro preenchendo algumas informações
                    básicas e tenha acesso a todas as funcionalidades da nossa
                    plataforma.
                </h3>
            </div>

            <div className="bg-gray-500 rounded-2xl p-6 text-white shadow-lg w-full max-w-2xl">
                <h1>Já possui uma conta?</h1>

                <h3>
                    Se você já é cadastrado, basta realizar o login utilizando seus
                    dados de acesso e continuar de onde parou.
                </h3>
            </div>

            <h4>Estamos felizes em ter você conosco. Seja muito bem-vindo!</h4>

        </div>
    );
}