import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState(''); // Definir nombre en el estado

  useEffect(() => {
    cn();
  }, []);

  const tokenN = (name) => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookieParts = cookies[i].split('=');
      const cookieName = cookieParts[0];
      const cookieValue = cookieParts[1];

      if (cookieName === name) {
        return cookieValue;
      }
    }

    return null;
  };

  const cn = () => {
    let nom = tokenN('nombre') + ' ' + tokenN('apellido');
    setNombre(nom);
  };
  const token = tokenN('token')
  if(!token){
    return <Navigate to = '/login'/>
  }
  const cerrarSesion =() => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=strict"
    navigate('/login')
  }
  
  return(
    <>
      <div style = {{display: 'flex', width: '8rem'}}>
      
      
     <Sidebar  className = 'sidebar' style ={{ border: 'none'}} >
  <Menu style ={{display: 'flex'}}>
    <MenuItem className="menu1" title = 'Inicio' component={<Link to="/"  />}>
      <h2 ></h2><h6>{tokenN('ubicacion') ==='Centro' ? '🏫' : '🏢'} {tokenN('ubicacion').toUpperCase()}</h6>

      
    </MenuItem>
    <SubMenu label="⬆⬇" title = 'Gestión De Entradas y Salidas' >
      <MenuItem  component={<Link to="/main/entradaPersona" />}>
        Persona
      </MenuItem>
      <MenuItem component={<Link to="/main/entradaObjeto" />}>
        Objeto
      </MenuItem>
    </SubMenu>
    <MenuItem title = 'Registros' component={<Link to="/main/registros" />} >📂</MenuItem>
  </Menu>
  <div className="sidebar-bottom">
    <Menu>
      <MenuItem title = {nombre}>🟢</MenuItem>
      <MenuItem title = 'Cerrar Sesión' onClick={() => cerrarSesion()}>⭕</MenuItem>
    </Menu>
  </div>
</Sidebar>
        </div>
    </>
  )
}
