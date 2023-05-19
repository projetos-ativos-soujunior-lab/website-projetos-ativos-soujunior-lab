import { useEffect, useState } from "react"
import externalLink from "../assets/externalLink.svg"
import upArrow from '../assets/upArrow.svg'
import downArrow from '../assets/downArrow.svg'
import github from '../assets/githubIcon.svg'
import linkedin from '../assets/linkedin.svg'
import axios from "axios"

interface Props {
  url: string
  name: string
  languages: []
  index: number
  item: Props
  description: string
  members: [{
    name: string
    github: string
    linkedin: string
  }]
}

export function List() {
  
  const [projects, setProjects] = useState<Props[]>([])
  const [showInfo, setShowInfo] = useState<boolean[]>([])
  
  const getProjects = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5002',
      )
      const projectlist = response.data
      console.log(projectlist)
      setProjects(projectlist)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProjects()
  }, [])

  const toggle = (index: number) => {
    if (index >= 0) {
      setShowInfo((prev) => {
        const info = [...prev]
        info[index] = !info[index]
        return info
      })
    }
  } 
  
  return (
    <div className="flex justify-center w-[90%] m-auto max-sm:mx-auto">
      <div>
        {projects.map((item: Props, index) => (
          <div key={index} className={`bg-blueGrid my-12 xl:w-[1150px]  
          ${showInfo[index] ? "rounded-t-lg" : "rounded-lg"}`}>
            <div className="flex justify-between mx-12 max-sm:mx-5 items-center">          
              <div>
                <div>
                  <div className="flex mt-10">
                    <h2 className="font-semibold text-5xl max-sm:text-xl">
                      {item.name
                        .replace("-soujunior-lab", "")  
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .replace(/^./, (str) => str.toUpperCase())
                        .replace(/-(.)/g, (i) => ` ${i.toUpperCase()}`)
                        .replace(/-/g, " ")
                        .slice(0, 28)
                        .trim() + (item.name.replace("-soujunior-lab", "").length > 28 ? "..." : "")
                      }
                    </h2>
                    <a 
                      href={item.url}
                      target="_blank"
                    >
                      <img
                      className="ml-4 w-4" 
                      src={externalLink} 
                      alt="button to open repository link"/>
                    </a>
                  </div>
                </div>
                <div className="flex">
                  {item.languages.length === 0 ? (
                    <p className="mt-20"></p>
                  ) : (
                    <div className="flex flex-wrap mb-10 mt-7 max-sm:mt-2">
                      {item.languages.map(language => (
                        <p
                          key={language}
                          className="m-1 px-10 max-sm:px-1 py-3 max-sm:py-1 bg-bgLanguages font-medium text-xl max-sm:text-base rounded-md"
                        >
                          {language}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="ml-7 max-sm:ml-2">
                <button
                  onClick={() => toggle(index)}
                  className="w-16 max-sm:w-12 rounded-full"
                >
                  {showInfo[index] ? <img src={upArrow} alt="button to close project information" /> : <img src={downArrow} alt="button to open project information" />}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap bg-bgPrimary">
              {showInfo[index] && 
              <div className=" flex flex-col justify-center  border border-blueGrid w-full">
                <div className="my-5 mx-14 max-sm:my-4 max-sm:mx-7">
                  <p className="max-sm:text-sm"><strong>Descrição do projeto: </strong>{item.description}</p>
                <div>
                  <p className="my-8 max-sm:my-4 text-xl max-sm:text-base font-semibold">Participantes:</p>
                  <ul
                    className="flex flex-row flex-wrap"
                  >
                    {item.members.map((member, i) => (
                      <li
                        key={i}
                        className="px-4 max-sm:px-2 py-2 max-sm:py-1 bg-bgTeam m-1 flex flex-row rounded-md"
                      >
                        <div className="pr-2">
                          <p className="text-lg font-semibold max-sm:text-base flex flex-wrap">  
                            {window.innerWidth < 330
                            ? member.name.replace(/(\b\w{10})(\w*)\b/g, '$1...')
                            : member.name}
                          </p>
                          <p className="text-sm max-sm:text-xs">employee role</p>
                        </div>
                        <div className="flex flex-row justify-center my-auto ml-2">
                          <a className="mr-2 w-7 max-sm:w-5" href={member.github} target="_blank">
                            <img src={github} alt="GitHub icon" />
                          </a>
                          <a className="w-7 max-sm:w-5" href={member.linkedin} target="_blank">
                            <img src={linkedin} alt="Linkedin icon" />
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                </div>
              </div>
              }
            </div>
          </div>
        ))}
      </div>        
    </div>
  )
}