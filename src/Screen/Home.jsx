/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import  Axios  from 'axios'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
const API1='https://tweeterback11.onrender.com/api/v1/get/alltweets'
const API2='https://tweeterback11.onrender.com/api/v1/create/tweet'


// const API1= "http://localhost:3005/api/v1/get/alltweets"
// const API2= "http://localhost:3005/api/v1/create/tweet"


const Home = () => {

const [popup,Setpopup]=useState(false)
const [tweet,Settweet]=useState('')
const [all_tweets,Setall_tweets]=useState('')
const [Loading,SetLoading]=useState(false)
const navigate=useNavigate()

const log_out=()=>{
  localStorage.removeItem('tweeterauth')
  localStorage.removeItem('user')
  alert('logged out')
  navigate('/login')
}

const fetch_all_tweets=async()=>{
  SetLoading(true)
  await Axios.get(API1)
  .then(res=>{
    if(res.data.success===true)
    {
      console.log(res)
      Setall_tweets(res.data.all_tweets)
    }
  }).catch(err=>console.log(err))
  SetLoading(false)
}
const verify=()=>{
  if(localStorage.tweeterauth){
    fetch_all_tweets()
  }
  else{
    navigate('/login')
  }
}

const submit_tweet=async(e)=>{
  e.preventDefault();
  SetLoading(true)
  const user=localStorage.getItem('user')
  console.log(tweet,user)
  await Axios.post(API2,{text:tweet,user:user})
  .then(res=>{
    console.log(res)
    if(res.data.success===true){
      alert('created tweet')
      Setpopup(false)
      fetch_all_tweets()
    }
  }).catch(err=>console.log(err))
  SetLoading(false)
}







useEffect(()=>{
  verify()
},[])

  return (
  
    <>
  {Loading ? <Loader/> :
     <section className='w-full flex-col h-screen flex items-center justify-start relative overflow-y-scroll'>
  
{popup? <div className="w-full h-screen absolute flex items-center justify-center  ">
<div onClick={()=>Setpopup(false)}  className="w-full h-full bg-black z-30 absolute opacity-40"></div>
 <div className="w-1/4 h-56 phone:w-5/6  bg-white z-50  shadow-xl
    rounded-xl">
     
    
    <form onSubmit={submit_tweet} className='w-full h-full'>
    <div className="w-full  mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
    <label htmlFor="comment" className="sr-only">Your comment</label>
    <textarea onChange={(e)=>Settweet(e.target.value)} id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
    </div>
    <div className="flex items-center mt-9 justify-between px-3 py-2 border-t dark:border-gray-600">
    <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
    Post comment
    </button>
    <div className="flex pl-0 space-x-1 sm:pl-2">
   
    
    
    </div>
    </div>
    </div>
    </form>
    
    
    </div>
 </div>:""}
    
{ all_tweets && all_tweets.map((ele) =>     <Card key={ele._id} tweet={ele}  title={ele.text} time={ele.time} user={ele.user}/>)}

     <div  onClick={log_out} className="w-14 h-14 bg-yellow-500 fixed rounded-full  z-[9999] bottom-11 right-10 flex items-center justify-center ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
</svg>
    
    </div>
    <div  onClick={()=>Setpopup(true)} className="w-14 h-14 bg-red-700 fixed rounded-full  z-[9999] bottom-32 right-10 flex items-center justify-center ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>


  
    </div>
</section>
}
    </>
  
    )
  }
  
  export default Home