import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { addTag } from '../../slices/stateSlice'

const SettingsPanel = () => {
    const dispatch =  useDispatch()
    const [input, setInput] = useState('')

    const tag = useSelector((state) => state.stateSlice.tag)

    const submit = () => {
        dispatch(addTag(input))
        setInput('')
    }
  return (
    <div>
    <h1 className=' text-xl font-semibold'>Submit Tag</h1>
    <p className=' text-lg'>{tag}</p>
    <input value={input}  placeholder={tag}  onChange={(e) => setInput(e.target.value)} className=' border' type="text" />
    <button onClick={() => submit()}className=' rounded-md px-4 py-1 bg-slate-600 text-white'>Submit</button>
    {/* {div } */}
    </div>
  )
}

export default SettingsPanel