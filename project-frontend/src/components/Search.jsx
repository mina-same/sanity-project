import React, {useState, useEffect} from 'react'
import {MdOutlineError} from "react-icons/md"

import MasonryLayout from "./MasonryLayout"
import { client } from '../client'
import { SearchQuery, feedQuery } from "../utils/data"
import Spinner from "./Spinner"

const Search = ({searchTerm}) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if(searchTerm){
      setLoading(true)
      const query = SearchQuery(searchTerm.toLowerCase());

      client.fetch(query)
      .then((data) => {
        setPins(data)
        setLoading(false)
      })
    }  
    else{
      client.fetch(feedQuery) 
      .then((data) => {
        setPins(data)
        setLoading(false)
      })
    }
  }, [searchTerm])


  return (
    <div>
      {loading && <Spinner message="searching for pins..."/>}
      {pins?.length !== 0 && <MasonryLayout pins={pins} /> }
      {pins?.length === 0 && searchTerm !== "" && !loading && 
        <div className='mt-10 text-center text-xl'>
          <div>
          <MdOutlineError style={{display: "inline", color: "#ef4444"}}/> no pins found for <span className='font-bold'>{searchTerm}</span>
          </div>
        </div>
      }
    </div>
  )
}

export default Search