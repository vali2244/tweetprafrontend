/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  Axios  from 'axios'
import Loader from '../components/Loader'


const API=("https://tweeterback11.onrender.com/api/v1/login/user")
// const API="http://localhost:3005/api/v1/login/user"

const Login = () => {   

    const [email,Setemail]=useState('')
    const [password,Setpassword]=useState('')
    const [Loading,SetLoading]=useState(false)
    const navigate =useNavigate()


    const login=async(e)=>{
        e.preventDefault();
        SetLoading(true)
        await Axios.post(API,{email,password})
    .then(res=>{
        console.log(res)
        if(res.data.success==false){
            alert(res.data.massage)
        }
        if(res.data.success==true){
            localStorage.setItem('tweeterauth',true)
            localStorage.setItem('user',res.data.verify_user[0].name)
            alert('logged in successfully')
            navigate('/')
        }
    
    }).catch(err=>console.log(err))
    SetLoading(false)
    
    }

    

    return (
        <>
        {Loading ? <Loader/>:
        <section className="bg-gray-50 dark:bg-gray-900 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80')] bg-center bg-no-repeat bg-cover">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">  
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={login}>
        <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input onChange={(e)=>Setemail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
        </div>
        <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input onChange={(e)=>Setpassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
        </div>
        <div className="flex items-center justify-between">
        <div className="flex items-start">
        <div className="flex items-center h-5">
        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
        </div>
        <div className="ml-3 text-sm">
        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
        </div>
        </div>
        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
        </div>
        <button type="submit" className="w-full bg-gray-400 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300  rounded-lg text-[20px] px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 text-red-500 font-bold">Sign in</button>
       
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet? <Link to='/register' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
        </p>
        </form>
        </div>
        </div>
        </div>
        </section>
}
        </>
        )
    }
    
    export default Login