export function Header(){
    return (
        <div>
            <h1 className="text-white font-poppins text-6xl font-[600] max-w-3xl m-[auto] mt-20 flex text-center">
                Bem vindo ao repositório Sou Junior
            </h1>
            <p className="text-white font-poppins text-xl font-[500] max-w-5xl m-[auto] mt-10 flex text-center">
                Aqui você fica por dentro de todos os projetos que estão rolando agora na comunidade! Tem alguma ideia em mente e ta afim de juntar uma galera pra tirar ela do papel? entra em contato conosco
            </p>
            <input 
            className="text-grey font-poppins font-[400] m-[auto] mt-14 flex text-center py-2 rounded-2xl"
            type="search"
            size={150}
            />
        </div>
    )
}