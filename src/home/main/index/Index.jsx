import React from 'react'
import Home from '../../Home'
export default function Index(){
  return(
   <>
    
     <div className = 'mas_vida'></div>
     <div className="conte-index" style={{ display: "flex", height: "100vh"}}>
      <Home/>
       <div className="recepcion-section">
        <h1 style={{ marginBottom: '8px'}}>Bienvenido A la Seccion de Recepcion</h1>
        <div className="rebotante">
          <img style={{maxHeigth: '30px'}} src="./Camara-Comercio.png" />
        </div>
      </div>
    </div>    
   </>
  )
}
