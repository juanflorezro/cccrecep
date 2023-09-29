import React, { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import AOS from 'aos'
export default function Arrys() {
  const [porcentage, setPorcentage] = useState(0)
  const [proyecto, setProyecto] = useState('')
  const [proyectos, setProyectos] = useState([])
  const [visita, setVisita] = useState('')
  const [visitas, setVisitas] = useState([])
  const [contratista, setContratista] = useState('')
  const [contratistas, setContratistas] = useState([])
  const tokenN = (name) => {
    const cookies = document.cookie.split('; ')

    for (let i = 0; i < cookies.length; i++) {
      const cookieParts = cookies[i].split('=')
      const cookieName = cookieParts[0]
      const cookieValue = cookieParts[1]
  
      if (cookieName === name) {
        return cookieValue
      }
    }

    return null
  }
  useEffect(()=>{
    listarProyectos()
    AOS.init()
    
  },[])
  const listarProyectos = () => {
    const token = tokenN('token')
    setPorcentage(porcentage => porcentage + 15)
    axios.post('https://express.juanflow04flore.repl.co/arrys/obtenerProyectos',{},
    {
      headers: {
        authorization: token
      }
    })
    .then(doc => { 
      console.log(doc)
      setProyectos(doc.data)
      setPorcentage(porcentage => porcentage + 25)
      listarVisitas()
    })
    .catch(err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!'
      })
    })
  }
  const listarVisitas = () => {
    const token = tokenN('token')
    setPorcentage(porcentage => porcentage + 15)
    axios.post('https://express.juanflow04flore.repl.co/arrys/obtenerVisita',{},
    {
      headers: {
        authorization: token
      }
    })
    .then(doc => { 
      console.log(doc)
      setVisitas(doc.data)
      setPorcentage(porcentage => porcentage + 15)
      listarContratistas()
    })
    .catch(err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!'
      })
    })
  }
  const listarContratistas = () => {
    const token = tokenN('token')
    setPorcentage(porcentage => porcentage + 15)
    axios.post('https://express.juanflow04flore.repl.co/arrys/obtenerContratista',{},
    {
      headers: {
        authorization: token
      }
    })
    .then(doc => { 
      console.log(doc)
      setContratistas(doc.data)
      setPorcentage(porcentage => porcentage + 15)
    })
    .catch(err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!'
      })
    })
  }
  const handleAgregarProyecto = (e) => {
     e.preventDefault()
    
    const token = tokenN('token')
    Swal.fire({
      title: '¿Quieres Guardar este Proyecto?',
      text: "Si ya valido que la informacion es correcta Oprimir 'Guardar",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('https://express.juanflow04flore.repl.co/arrys/agregarProyecto',{
          proyecto: {
            proyecto: proyecto
          }
        },{
          headers: {
            authorization: token
          }
        })
        .then(doc => { 
          console.log(doc)
          listarProyectos()
          Swal.fire(
            '¡Guardado!',
            'Acción realizada Correctamenete',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!'
          })
        })
      }
    })
  }
  const handleAgregarVisita = (e) => {
     e.preventDefault()
    
    const token = tokenN('token')
    Swal.fire({
      title: '¿Quieres Guardar este Proyecto?',
      text: "Si ya valido que la informacion es correcta Oprimir 'Guardar",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('https://express.juanflow04flore.repl.co/arrys/agregarVisita',{
          visita: {
            visita: visita
          }
        },{
          headers: {
            authorization: token
          }
        })
        .then(doc => { 
          console.log(doc)
          listarVisitas()
          Swal.fire(
            '¡Guardado!',
            'Acción realizada Correctamenete',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!'
          })
        })
      }
    })
  }
  const handleAgregarContratista = (e) => {
     e.preventDefault()
    
    const token = tokenN('token')
    Swal.fire({
      title: '¿Quieres Guardar este T_Contratista?',
      text: "Si ya valido que la informacion es correcta Oprimir 'Guardar",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('https://express.juanflow04flore.repl.co/arrys/agregarContratista',{
          contratista: {
            contratista: contratista
          }
        },{
          headers: {
            authorization: token
          }
        })
        .then(doc => { 
          console.log(doc)
          listarContratistas()
          Swal.fire(
            '¡Guardado!',
            'Acción realizada Correctamenete',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!'
          })
        })
      }
    })
  }
  const handleEliminarProyecto = (proyecto) => {
    const token = tokenN('token')
    Swal.fire({
      title: '¿Quieres Elimanar este Proyecto?',
      text: "Se eliminara de la seccion de E/S",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios.post('https://express.juanflow04flore.repl.co/arrys/eliminarProyecto',{proyecto},{
          headers: {
          authorization: token
          }
        })
        .then(doc => {
          console.log(doc.data)
          listarProyectos()
          Swal.fire(
            '¡Eliminado!',
            'Acción realizada Correctamenete',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
          Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
        })
      }
    })
  }
  const handleEliminarVisita = (visita) => {
    const token = tokenN('token')
    Swal.fire({
      title: '¿Quieres Elimanar esta Visita?',
      text: "Se eliminara de la seccion de E/S",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    })
    .then((result) => {
       console.log(visita)
      if (result.isConfirmed) {
        axios.post('https://express.juanflow04flore.repl.co/arrys/eliminarVisita',{visita},{
          headers: {
          authorization: token
          }
        })
        .then(doc => {
          console.log(doc.data)
          listarVisitas()
          Swal.fire(
            '¡Eliminado!',
            'Acción realizada Correctamenete',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
          Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
        })
      }
    })
  }
  const handleEliminarContratista = (contratista) => {
    const token = tokenN('token')
    Swal.fire({
      title: '¿Quieres Elimanar este T_Contratista?',
      text: "Se eliminara de la seccion de E/S",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios.post('https://express.juanflow04flore.repl.co/arrys/eliminarContratista',{contratista},{
          headers: {
          authorization: token
          }
        })
        .then(doc => {
          console.log(doc.data)
          listarContratistas()
          Swal.fire(
            '¡Eliminado!',
            'Acción realizada Correctamenete',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
          Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
        })
      }
    })
  }
  return(
    <>
      {porcentage < 100 && <div data-aos="fade-down" style = {{width: '100%', display: 'flex', justifyContent: 'center'}} >
        <div style = {{width: '50px', padding: '20px'}}>
          <CircularProgressbar value={porcentage} text={`${porcentage}%`} /> 
        </div>
      </div>}  
      <div className = 'arry_contenedor'>
        

              
         <table className = 'arry_tabla'>
           
        <thead>
          <tr>
            <th>Gestión Proyectos</th>
            <th>Gestión Visitas</th>
            <th>Gestión Contratistas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table className = 'arry_table_table'>
                <thead>
                  <tr>
                    <th>
                      <input type = 'text' value = {proyecto} onChange={(e)=>setProyecto(e.target.value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()))}/> 
                      <button onClick = {(e) => handleAgregarProyecto(e)}>Agregar Proyecto</button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  
                    <div style={{ overflowX: 'auto', maxHeight: '320px', padding: '10px'}} 
                      data-aos="flip-left"
                      data-aos-easing="ease-out-cubic"
                      data-aos-duration="2000">
                      {proyectos.map((proyecto) => (
                        <div className = 'arry_table_table_tarjeta' 
                          
                          key = {proyecto._id}>
                          <div><label style={{ 
                            overflowX: 'auto', 
                            maxHeight: '350px', 
                            padding: '10px'
                        }}>{proyecto.proyecto}</label></div><button onClick={() =>handleEliminarProyecto(proyecto)}>❌</button>
                        </div>
                      ))}
                    </div>
                  
                </tbody>
              </table>
            </td>
            <td>
              <table className = 'arry_table_table'>
                <thead>
                  <tr>
                    <th>
                      <input type = 'text' value = {visita} onChange={(e)=>setVisita(e.target.value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()))}/> 
                      <button onClick = {(e) => handleAgregarVisita(e)}>Agregar Visita</button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  
                    <div style={{ overflowX: 'auto', maxHeight: '320px', padding: '10px'}}  
                      data-aos="flip-left"
                      data-aos-easing="ease-out-cubic"
                      data-aos-duration="2000">
                      {visitas.map((visita) => (
                        <div className = 'arry_table_table_tarjeta' 
                          
                          key = {visita._id}>
                          <div><label style={{ 
                            overflowX: 'auto', 
                            maxHeight: '300px', 
                            padding: '10px'
                        }}>{visita.visita}</label></div><button onClick={() =>handleEliminarVisita(visita)}>❌</button>
                        </div>
                      ))}
                    </div>
                  
                </tbody>
              </table>
            </td>
            <td>
              <table className = 'arry_table_table'>
                <thead>
                  <tr>
                    <th>
                      <input type = 'text' value = {contratista} onChange={(e)=>setContratista(e.target.value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()))}/> 
                      <button onClick = {(e) => handleAgregarContratista(e)}>Agregar Contratista</button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                    <div style={{ overflowX: 'auto', maxHeight: '320px', padding: '10px'}} 
                      data-aos="flip-left"
                      data-aos-easing="ease-out-cubic"
                      data-aos-duration="2000">
                      {contratistas.map((contratista) => (
                        <div className = 'arry_table_table_tarjeta' 
                          
                          key = {contratista._id}>
                          <div><label style={{ 
                            overflowX: 'auto', 
                            maxHeight: '350px', 
                            padding: '10px'
                        }}>{contratista.contratista}</label></div><button onClick={() =>handleEliminarContratista(contratista)}>❌</button>
                        </div>
                      ))}
                    </div>
                </tbody>
              </table>
            </td>
          </tr> 
        </tbody>
      </table>
      </div>
    </>
  )
}
