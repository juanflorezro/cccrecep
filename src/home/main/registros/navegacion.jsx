import React, { useState } from 'react'
import Home from '../../Home'
import EntradasSalidas from './pages/entradasSalidas'
import Activos from './pages/activos'
import Personas from './pages/personas'
import Arrys from './pages/arrys'
const Tab = ({ tab, activeTab, setActiveTab }) => {
  return (
    <div
      className={`tab ${tab === activeTab ? 'active' : ''}`}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </div>
  );
};

export default function Tabs () {
  const [activeTab, setActiveTab] = useState('Entradas y Salidas')

  return (
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
      <div style={{  display: "flex", height: '100vh', width: '100%'}}>
        <Home/>
        <div style={{  display: "flex", flexDirection: 'column' , width: '100%'}}>
          <h2 style={{ width: '100%', textAlign: 'center',background: 'none'}}>Sección de Registros</h2>
          <div>
            <div className="tab-container">
              <Tab tab="Entradas y Salidas" activeTab={activeTab} setActiveTab={setActiveTab} />
              <Tab tab="Activos" activeTab={activeTab} setActiveTab={setActiveTab} />
              <Tab tab="Usuarios" activeTab={activeTab} setActiveTab={setActiveTab} />
              <Tab tab="Arrys" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="tab-content">
              {activeTab === 'Entradas y Salidas' && <div><EntradasSalidas/></div>}
              {activeTab === 'Activos' && <div><Activos/></div>}
              {activeTab === 'Usuarios' && <div><Personas/></div>}
              {activeTab === 'Arrys' && <div><Arrys/></div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
