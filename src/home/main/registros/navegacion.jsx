import React, { useState } from 'react'
import Home from '../../Home'
import EntradasSalidas from './pages/entradasSalidas'
import Activos from './pages/activos'
import Personas from './pages/personas'
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
      <div style={{  display: "flex", height: '100vh', width: '100%'}}>
        <Home/>
        <div style={{  display: "flex", flexDirection: 'column' , width: '100%'}}>
          <h2 style={{ width: '100%', textAlign: 'center',background: 'none'}}>Sección de Registros</h2>
          <div>
            <div className="tab-container">
              <Tab tab="Entradas y Salidas" activeTab={activeTab} setActiveTab={setActiveTab} />
              <Tab tab="Activos" activeTab={activeTab} setActiveTab={setActiveTab} />
              <Tab tab="Personas" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="tab-content">
              {activeTab === 'Entradas y Salidas' && <div><EntradasSalidas/></div>}
              {activeTab === 'Activos' && <div><Activos/></div>}
              {activeTab === 'Personas' && <div><Personas/></div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
