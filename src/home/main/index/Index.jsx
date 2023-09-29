import React from 'react'
import Home from '../../Home'
export default function Index(){
  return(
   <>
     <div class="contenedor-card-item">
		      <div class="contenedor-card-item-wrapper">
		        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9pwuN55xOQq48Ebu_rZKV287ak67N8yjTDQ&usqp=CAU" alt=""/>
		        <div class="contenedor-info">
		          <div class="info">
		            <p class="titulo"></p>
		            <span class="categoria">Ayuda</span>
		          </div>
		          <div class="fondo"></div>
		        </div>
		      </div>
		    </div>
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
