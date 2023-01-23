import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


const MainPanel = () => {
  const tag = useSelector((state) => state.stateSlice.tag4)

  return (
    <div className='flex flex-col'>
    <h1 className=' text-xl font-semibold'>Main Tag: {tag}</h1>
    </div>  
    )
}

export default MainPanel