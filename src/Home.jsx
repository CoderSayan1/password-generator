import { useCallback, useEffect, useRef, useState } from 'react'
// import {toast} from 'react-hot-toast'
import { toast } from 'react-toastify'
import image from './assets/photo.svg'

export default function Home() {
    const [password, setPassword] = useState('')
    const [range, setRange] = useState(8)
    const [specialChar, setSpecialChar] = useState(false)
    const [number, setNumber] = useState(false)
    const [copied, setCopied] = useState(false)

    // useRef hook
    const passwordRef = useRef(null)

    const passwordGenerate = useCallback(() =>{
        let pass = ''
        let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if(specialChar) str += '!@#$%^&*(){}[]?/|'
        if(number) str += '0123456789' 

        for (let i = 1; i <= range; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)      
        }
        setPassword(pass)
    }, [range, specialChar, number, setPassword])

    const copyToClipBoard = useCallback(() =>{
        passwordRef.current?.select()
        // passwordRef.current?.setSelectionRange(0, 3) // for range selection
        window.navigator.clipboard.writeText(password)
        toast.success("Password Copied!!!")
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }, [password])

    useEffect(() =>{
        passwordGenerate()
    },[range, specialChar, number, passwordGenerate])
    return (
        <div className='w-full'>
            <div className='w-3/4 mx-auto md:my-20 my-14'>
                <h1 className='text-center md:text-6xl text-4xl font-bold'>Random Password Generator</h1>
                <h2 className='text-center md:text-xl text-sm mt-8'>Create strong and secure passwords to keep your account safe online.</h2>
            </div>
            <div className='w-3/4 border rounded-tl-2xl rounded-tr-2xl mx-auto flex flex-col md:flex-row items-center justify-around bg-white md:mb-0 mb-8'>
                <div>
                    <img src={image} alt="" />
                </div>
                <div>
                <div className='my-10 flex flex-wrap justify-evenly'>
                    <input type="text" value={password} readOnly placeholder='your strong password' className='md:px-6 md:py-4 px-3 py-2 rounded-full text-xl outline-none shadow-2xl text-orange-500 font-semibold border border-slate-500 ' ref={passwordRef}/>
                    <button className={`rounded-full outline-none md:text-xl text-lg shadow-lg hover:shadow-xl bg-blue-700 hover:bg-blue-500 md:px-6 md:py-4 px-3 py-2 mt-3 md:mt-0 font-bold ${copied ? 'bg-blue-500' : 'bg-blue-700'}`} onClick={copyToClipBoard}>{copied ? 'Copied!' : 'Copy'}</button>
                </div>
                <div className='flex flex-wrap justify-center gap-x-9 mb-10'>
                    <div className='flex items-center gap-x-2'>
                        <input type="range" min="1" max="50" value={range}  name="range" id="size" className='cursor-pointer' onChange={(e) => setRange(e.target.value)}/>
                        <label htmlFor="size" className='text-lg text-rose-600'>Size: {range}</label>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <input type="checkbox" defaultChecked={specialChar} onChange={() => setSpecialChar((prev) => !prev)} name="char" id="char" className='w-4 h-4 rounded-lg'/>
                        <label htmlFor="char" className='text-lg text-rose-600'>Special Characters</label>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <input type="checkbox" defaultChecked={number} onChange={() => setNumber((prev) => !prev)} name="number" id="number" className='w-4 h-4 rounded-lg'/>
                        <label htmlFor="number" className='text-lg text-rose-600'>Number</label>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
