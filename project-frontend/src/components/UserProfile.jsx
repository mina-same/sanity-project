import React,{ useState, useEffect }  from 'react'
import { HiOutlineLogout } from "react-icons/hi"
import { useParams, useNavigate } from 'react-router-dom'
import { GoogleLogout } from "react-google-login"

import { userCreatedPinsQuery , UserQuery , userSavedPinsQuery } from '../utils/data'
import { client } from "../client"
import MasonryLayout from "./MasonryLayout"
import Spinner from "./Spinner"
import { uui, uuiv4 } from "uuid"

const randomImage = `https://source.unsplash.com/1600x800/?nature,photography,technology`

const clientId="938869199617-34uunguo4m4pfo8jk2o8s35rc3ima9ng.apps.googleusercontent.com"

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("created"); // created or saved
  const [activeBtn, setActiveBtn] = useState("created");
  const Navigate = useNavigate();
  const { userId } = useParams();

  useEffect(()=>{
    const query = UserQuery(userId);

    client.fetch(query)
    .then((data) => {
      setUser(data[0])
    })

  }, [userId] )


  useEffect(()=>{
    if(text === "created"){
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery)
      .then((data) => {
        setPins(data)
      }) 
    }else{
      const savedPinsQuery =  userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery)
      .then((data) => {
        setPins(data)
      })
    }
  },[text,userId])

  const logout = () => {
    localStorage.clear();
    Navigator("/login");
  }



  if(!user){
    return <Spinner message="loading profile..."/>
  }

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img 
              src={randomImage}  
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt='banner-pic'
            />
            <img 
              src={user?.image} 
              alt="userImage" 
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
            />
            <h1 className='font-bold text-3xl text-center'>
              {user?.userName}
            </h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              {userId === user._id && (
                <GoogleLogout  
                clientId={clientId}
                render={(renderProps) =>(
                  <button
                    type='button'
                    className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  > 
                    <HiOutlineLogout fontSize={35} className="p-1"/>
                  </button>
                )}
                onLogoutSuccess={logout}
                cookiePolicy={'single_host_origin'}
              />
              )}
            </div>
          </div>
          <div className='text-center mb-7'>
              <button
                type='button'
                onClick={(e) => {
                  setText(e.target.textContent)
                  setActiveBtn("created")
                }}
                className={`${ activeBtn === 'created' ? activeBtnStyles: notActiveBtnStyles }`}
              >
                created
              </button>
              <button
                type='button'
                onClick={(e) => {
                  setText(e.target.textContent)
                  setActiveBtn("saved")
                }}
                className={`${ activeBtn === 'saved' ? activeBtnStyles: notActiveBtnStyles }`}
              >
                saved
              </button>
              {pins?.length ? (
                <div className='px-2' >
                  <MasonryLayout pins={pins} />
                </div>
              ): (
                <div className='flex justify-center font-bold items-center h-full text-xl mt-2'>
                  No Pins found
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile 