import React from 'react'
import { useSelector } from 'react-redux'
import { tags } from '../../slices/stateSlice'
import SettingsPanel from '../panels/SettingsPanel'
import MainPanel from '../panels/MainPanel'

const BodyComponent = () => {
    const openPage = useSelector((state) => state.stateSlice.openPage)


    return (
    <div className='items-center justify-center flex flex-col w-full h-full'>
        { openPage === tags.Settings && <SettingsPanel/>}
        { openPage === tags.Main && <MainPanel/>}
    </div>
  )
}

export default BodyComponent