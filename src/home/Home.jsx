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
      
     <Sidebar className="app">
  <Menu>
    <MenuItem className="menu1" component={<Link to="/" className="link" />}>
      <h2>Menu</h2>
    </MenuItem>
    <SubMenu label="⬆⬇ Gestión E/S">
      <MenuItem component={<Link to="/main/entradaPersona" className="link" />}>
        Persona
      </MenuItem>
      <MenuItem component={<Link to="/main/entradaObjeto" className="link" />}>
        Objeto
      </MenuItem>
    </SubMenu>
    <MenuItem component={<Link to="/main/registros" className="link" />} >📂 Historial</MenuItem>
  </Menu>
  <div className="sidebar-bottom">
    <Menu>
      <MenuItem>🟢 {nombre}</MenuItem>
      <MenuItem onClick={() => cerrarSesion()}>⭕ Cerrar Sesión </MenuItem>
    </Menu>
  </div>
</Sidebar>
    </>
  )
}