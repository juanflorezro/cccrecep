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
  const [activeTab, setActiveTab] = useState('Gestión Entradas y Salidas')

  return (
    <>
      
      <div className = 'mas_vida'></div>
      <div style={{  display: "flex", height: '100vh', width: '100%'}}>
        <Home/>
        <div style={{  display: "flex", flexDirection: 'column' , width: '100%'}}>
          <h2 style={{ width: '100%', textAlign: 'center',background: 'none'}}>Sección de Registros</h2>
          <div>
            <div className="tab-container">
              <Tab tab="Gestión Entradas y Salidas" activeTab={activeTab} setActiveTab={setActiveTab} />
              <Tab tab="Gestión de Activos" activeTab={activeTab} setActiveTab={setActiveTab} />
              <Tab tab="Gestión de Usuarios" activeTab={activeTab} setActiveTab={setActiveTab} />
              <Tab tab="Gestión Desc. E/S" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="tab-content">
              {activeTab === 'Gestión Entradas y Salidas' && <div><EntradasSalidas/></div>}
              {activeTab === 'Gestión de Activos' && <div><Activos/></div>}
              {activeTab === 'Gestión de Usuarios' && <div><Personas/></div>}
              {activeTab === 'Gestión Desc. E/S' && <div><Arrys/></div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
