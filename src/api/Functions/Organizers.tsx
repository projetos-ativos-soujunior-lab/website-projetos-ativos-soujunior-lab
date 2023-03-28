const getApi = async (api:string) => {
  try {
    const response =
    await fetch(api);
    const data = await response.json();
    return data

} catch (e) {
console.log("Error get Api", e);
  }
}

// Puxando todos os repositorios com tópico soujunior-lab
const getAllListRepositeries = async () => {
  try {
      const data = await getApi('https://api.github.com/search/repositories?q=topic:soujunior-lab');
      return data.items
      
  } catch (e) {
      console.log("Error get repositories", e);
  }
}

// Puxando o nome de todos as organizações
const getOrgs = async () => {
  try {
    const allRepositories = await getAllListRepositeries()
    const mapReturnLogin = allRepositories.map((item:any) => item.owner.login);
    return mapReturnLogin;
      
  } catch (e) {
      console.log("Error get Login repositories", e);
  }
}

// Puxando os repositorios de acordo com o nome da organização.
// Dados Encontrados: Description
const getDateOrgs = async (nameProject:string) => {
  try {
    const data = getApi(`https://api.github.com/orgs/${nameProject}`)
      return data
      
  } catch (e) {
      console.log("Error get date of organizations", e);
  }
}

// Puxando os repositorios de acordo com o nome da organização.
// Dados Encontrados: 
const getRepositoresOrgs = async (nameProject:string) => {
  try {
      const data = getApi(`https://api.github.com/orgs/${nameProject}/repos`)
      return data
      
  } catch (e) {
      console.log("Error getting repositores of organizations", e);
  }
}

// Puxando as linguagens de todos os repositorios da organização solicitada.
const getAllLanguageRepositores = async (nameProject:string) => {
  try {
      const data = await getRepositoresOrgs(nameProject);
      const linkLanguageRepositories = data.map((link:any) => link.languages_url);
      const allLanguage = await Promise.all(linkLanguageRepositories.map(async(item:string) => {
       const objectLanguage = await getApi(item);
       return objectLanguage;
      }));
      const languages:string[] = []
      allLanguage.forEach((language:Object) => Object.keys(language)
      .forEach((elemento:string) => languages.push(elemento)));
      const cleanObjectLanguage = await Promise.all(languages.filter((date:string) => date.length !== 0));
      const singleLanguages = cleanObjectLanguage.filter((este, i) => cleanObjectLanguage.indexOf(este) === i);
      return singleLanguages;
      
  } catch (e) {
      console.log("Error getting language of repositores", e);
  }
}

// Puxando todos os organizadores da organização passada como parâmetro
const getListMemberOrgs = async (nameProject:string) => {
  try {
      const response =
          await fetch(`https://api.github.com/orgs/${nameProject}/public_members`);
        const data = await response.json();
      return data
  } catch (e) {
      console.log("Error getting members of organizations", e);
  }
}

// Acessando os dados de cada usuário da organização. Retorna um array de dados de cada usuário
const getLoginMembers = async (nameProject:string):Promise<any> => {
  try {
      const members = await getListMemberOrgs(nameProject); 
      const url = await members.map((item:any) => item.url);
      const responses = await Promise.all(url.map(async (github:any) => await fetch(github)));
      const data = await Promise.all(responses.map(async (item:any) => await item.json()));
      return data;
     } catch (e) {
      console.log("Error get Login", e);
  }
}


// Conjunto de dados para desenvolvimento no front-end
const getAllDates = async (nameRepositori:string) =>{
  const languages = await getAllLanguageRepositores(nameRepositori);
  const allMembers = await getLoginMembers(nameRepositori);
  const members = await allMembers.map((item:any) => {
    return {
    name:item.name,
    gitHub: item.html_url
  }
  });
  const descriptionOrgs = await getDateOrgs(nameRepositori);
  const allDate = {
    languages: languages,
    members: members,
    description: descriptionOrgs.description,   
  }

return allDate;
} 

export{
  getAllListRepositeries,
  getOrgs,
  getListMemberOrgs,
  getLoginMembers,
  getRepositoresOrgs,
  getDateOrgs,
  getAllLanguageRepositores,
  getAllDates
}