import { useEffect, useState } from "react"
import {getAllRepositories} from "../api/Functions/Organizers"
import externalLink from "../assets/externalLink.svg"
import  upArrow  from '../assets/upArrow.svg'
import  downArrow  from '../assets/downArrow.svg'

interface Props {
  name: string,
  language: string
}

export function List() {
  const [showInfo, setShowInfo] = useState<boolean[]>([])
  
  const toggleShowInfo = (index: number) => {
    setShowInfo((prev) => {
      const newArr = [...prev]
      newArr[index] = !newArr[index]
      return newArr
    })
  }

  const [allRepositeries, setAllRepositeries] = useState<Props[]>([])

  useEffect(() => {
    async function fetchAllRepositeries() {
      const nameList = await getAllRepositories()
      console.log(nameList)
      setAllRepositeries(nameList)
      setShowInfo(new Array(nameList.length))
    }
    fetchAllRepositeries()
  }, [])
  
  

  return (
    <div className="flex justify-center w-[90%] m-auto max-sm:mx-auto">
      <div>
        {allRepositeries.map((item: Props, index: number) => (
          <div key={index} className={`bg-blueGrid mt-12  
          ${showInfo[index] ? "rounded-t-lg" : "rounded-lg"}`}>
            <div className="flex justify-between mx-12 max-sm:mx-5 items-center">          
              <div>
                <div className="flex">
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
                  </div>
                  <div className="flex m-auto">
                    <a 
                      href=""
                    >
                      <img
                      className="ml-4 w-4" 
                      src={externalLink} 
                      alt="button to open repository link"/>
                    </a>
                  </div>
                </div>
                <div className="flex">
                  {
                    item.language == null ? (
                    <p className="mt-20"></p>
                    ):(
                    <p className="mt-7 max-sm:mt-2 bg-bgLinguages px-10 max-sm:px-1 py-3 max-sm:py-1 font-medium text-xl max-sm:text-base rounded-md mb-10">
                      {item.language}
                    </p>
                    )
                  }
                </div>
              </div>
              <div className="min-w-[55px] ml-7">
                <button onClick={() => toggleShowInfo(index)}>
                  {showInfo[index] ? <img src={upArrow} alt="button to close project information" /> : <img src={downArrow} alt="button to open project information" />}
                </button>
              </div>
            </div>
            <div className="bg-white flex justify-center xl:w-[1150px] sm:w-[90%]">
              {showInfo[index] && "test"}
            </div>
          </div>
        ))}
      </div>        
    </div>
  )
}