import React from 'react'
import Home from '../../Home'
export default function Index(){
  return(
   <>
     <div calssName= "conte-index" style={{ display: "flex", height: "100vh"}}>
      <Home/>
       <div class="recepcion-section">
        <h1 style={{ marginBottom: '8px'}}>Bienvenido A la Seccion de Recepcion</h1>
        <div class="image-container">
        <img src="./Camara-Comercio.png" />
      </div>
    </div>

      
    </div>  
   </>
  )
}