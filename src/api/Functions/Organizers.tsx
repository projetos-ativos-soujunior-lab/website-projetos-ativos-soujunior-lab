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

const getAllRepositories = async () => {
  try {
      const data = getApi(`https://api.github.com/orgs/SouJunior-Lab/repos`)
      return data
  } catch (e) {
      console.log("Error getting repositores of SouJunior-Lab", e);
  }
}

const getSearchRepositories = async (project:string) => {
  try {
      const reponse = await getAllRepositories();
      const data = reponse.filter((item:any) => item.name === project);
      return data;
  } catch (e) {
      console.log("Error getting repositores of SouJunior-Lab", e);
  }
}

// Puxando as linguagens de todos os repositorios da organização solicitada.
const getAllLanguageOrganizates = async (nameProject:string) => {
  try {
      const data = await getSearchRepositories(nameProject);
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

// Puxando todos os dados da Organização.
const getDateOrgs = async (nameProject:string) => {
  try {
    const response = await getSearchRepositories(nameProject);
      const [nameRepository] = response.map((item:any) => item.url);
      const getApiOrg = await getApi(nameRepository);
      return getApiOrg.parent;
  } catch (e) {
      console.log("Error get date of organizations", e);
  }
}

const getListMembersOrgs = async (nameProject:string) => {
  try {
      const response = await getDateOrgs(nameProject);
      const nameOrg = await response.owner.login;
      const members = await getApi(`https://api.github.com/orgs/${nameOrg}/members`);
      return members
  } catch (e) {
      console.log("Error getting members of organizations", e);
  }
}

// Acessando os dados de cada usuário da organização. Retorna um array de dados de cada usuário
const getLoginMembers = async (nameProject:string):Promise<any> => {
  try {
      const members = await getListMembersOrgs(nameProject); 
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
  const languages = await getAllLanguageOrganizates(nameRepositori);
  const allMembers = await getLoginMembers(nameRepositori);
  const members = await allMembers.map((item:any) => {
    return {
    name:item.name,
    gitHub: item.html_url
  }
  });
  const descriptionOrgs = await getSearchRepositories(nameRepositori);
  const allDate = {
    languages: languages,
    members: members,
    description: descriptionOrgs.description,   
  }

return allDate;
} 

export{
  getListMembersOrgs,
  getLoginMembers,
  getDateOrgs,
  getAllLanguageOrganizates,
  getAllDates,
  getAllRepositories,
  getSearchRepositories
}