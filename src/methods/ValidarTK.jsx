import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
export default function ValidarTk({
  token,
  redirectPath = '/login'
}){
  const token = () => {
     const token = document.cookie.replace('token=', '')
    axios.post('https://express.juanflow04flore.repl.co/autentication',{},{
      headers: {
        'authorization': token
      }
    })
    .then(doc => {
      console.log('entrando')
      console.log(doc.data
      if(doc.data){
        console.log('entrando')
        navigate('/')
      }else{
        
      }
      
    })
    .catch(doc => {
      console.log(doc)
    })
  }
  return <Outlet />
}