import React from 'react'
import {Outlet} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function ProtectedRoutes({
  redirectPath = '/login'
}){
  const navigate = useNavigate()
  
  useEffect(()=>{
    token() 
  },[])
  const tokenN = (name) => {
    const cookies = document.cookie.split('; ')

    for (let i = 0; i < cookies.length; i++) {
      const cookieParts = cookies[i].split('=')
      const cookieName = cookieParts[0]
      const cookieValue = cookieParts[1]
  
      if (cookieName === name) {
        return cookieValue
      }
    }

    return null
  }
  const token = () => {
     const token = tokenN('token')
    axios.post('https://express.juanflow04flore.repl.co/autentication',{},{
      headers: {
        'authorization': token
      }
    })
    .then(doc => {
      
      console.log('entrandosdcds')
      console.log(doc.data)
      if(!doc.data){
        console.log('entrando')
        navigate(redirectPath)
      }
    })
    .catch(doc => {
      console.log(doc)
    })
  }
  return <Outlet />
}