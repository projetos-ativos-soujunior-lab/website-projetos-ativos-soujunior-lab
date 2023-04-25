import { List } from "./List";

export function Home(){
    return (
        <div className="text-white font-poppins"> 
            <h1 className="sm:text-6xl text-2xl font-semibold max-w-3xl m-[auto] max-md:mx-4 mt-20 justify-center flex text-center px-3.5">
                Bem vindo ao repositório Sou Junior
            </h1>
            <p className="sm:text-xl text-sm font-[500] max-w-5xl m-[auto] max-lg:mx-16 max-md:mx-8 mt-10 justify-center flex text-center">
                Aqui você fica por dentro de todos os projetos que estão rolando agora na comunidade! Tem alguma ideia em mente e ta afim de juntar uma galera pra tirar ela do papel? entra em contato conosco
            </p>
            <input 
            className="text-grey font-poppins font-[400] mx-auto mt-14 flex text-left px-2 py-2 rounded-2xl xl:w-[1150px] w-[90%]"
            type="search"
            />
            <List />
        </div>
    )
}