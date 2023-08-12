import React from 'react'
import {Route,Routes} from 'react-router-dom'
import EntradaPersona from './main/entradas/EntradaPersona'
import EntradaObjeto from './main/entradas/EntradaObjeto'
import ProtectedRoutes from './protectedRoutes/ProtectedRoutes'
import Index from "./main/index/Index"
import Tab from './main/registros/navegacion'


export default function HomeRoutes(){
  return(
    <>
      <Routes>
        <Route element={<ProtectedRoutes canActive ={true} />}>
          <Route path = '/' element = {<Index/>}/>
          <Route path = '/main/entradaPersona' element = {<EntradaPersona/>}/>
          <Route path = '/main/entradaObjeto' element = {<EntradaObjeto />}/>
          <Route path = '/main/registros' element = {<Tab/>}/>
        </Route>
      </Routes>
    </>
    
  )
}