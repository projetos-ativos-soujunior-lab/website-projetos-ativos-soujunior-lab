export function Header() {
  return (
    <div>
      <h1 className="text-white font-poppins sm:text-6xl text-2xl font-[600] max-w-3xl m-[auto] max-sm:mx-4 mt-20 justify-center flex text-center">
        Bem vindo ao repositório Sou Junior
      </h1>
      <p className="text-white font-poppins sm:text-xl text-sm  font-[500] max-w-5xl m-[auto] max-lg:mx-4 mt-10 justify-center flex text-center">
        Aqui você fica por dentro de todos os projetos que estão rolando agora
        na comunidade! Tem alguma ideia em mente e ta afim de juntar uma galera
        pra tirar ela do papel? entra em contato conosco
      </p>
      <input
        className="text-grey font-poppins font-[400] mx-auto mt-14 flex text-left px-2 py-2 rounded-2xl 3xl:w-[60%] xl:w-[80%] w-[90%]"
        type="search"
      />
    </div>
  );
}
