import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tags, setOpenPage } from '../../slices/stateSlice'

 const Footer = () => {
  const openPage = useSelector((state) => state.stateSlice.openPage)
  const dispatch = useDispatch()
  
  return (
    <div className=' flex gap-8 p-8 items-center flex-row w-screen bg-gray-500'>
      <button className={`py-4 px-6 rounded-lg text-xl ${openPage === tags.Main ? 'bg-green-300' :' bg-gray-300'} `} onClick={() => dispatch(setOpenPage(tags.Main))}>Main</button>
      <button className={` py-4 px-6 rounded-lg text-xl ${openPage === tags.Settings ? 'bg-green-300' :' bg-gray-300'} `} onClick={() => dispatch(setOpenPage(tags.Settings))}>Settings</button>
    </div>
  )
}

export default Footer