import React, { useEffect, useState } from 'react'
import AOS from 'aos'

export default function Personas(){
  const [datosUpdateUsuario, setDatosUpdateUsuario] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    telefono: '',
    correo: '',
  })
  const [usuarioId, serUsuarioId] = useState({
    cedula: ''
  })
  const [datosUpdateVisitante, setDatosUpdateVisitante] = useState({
    tipo: '',
    empresa: ''
  })
  const [personas, setPersonas] = useState([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [editar, setEditar] = useState(false)
  useEffect(()=>{
    cargarPersonas()
    AOS.init()
  },[])
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
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDatosUpdateUsuario((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleInputTipo = (e) =>{
    setDatosUpdateVisitante({tipo: e.target.value})
  }
  const handleInputEmpresa = (e) =>{
    setDatosUpdateVisitante({empresa: e.target.value})
  }
  const cargarPersonas = () => {
    setLoading(true)
    const token = tokenN('token')
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/usuarios/listaVisitante',{},{
      headers: {
        authorization: token
      },
      onUploadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 1) / progressEvent.total);
          setProgress(percentCompleted);
      }
    })
    .then(doc => {
      const per = doc.data
      setPersonas(per)
      setLoading(false)
      setProgress(0)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
      Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
      setProgress(0)
    })
  }
  const handleEditarPersona = (e) => {
    e.preventDefault()

    const token = tokenN('token')
    Swal.fire({
      title: '¿Quieres Editar este Usuario?',
      text: "Si ya valido que la informacion es correcta Oprimir 'Editar'",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar'
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/usuarios/editarVisitante',{usuarioId,datosUpdateUsuario, datosUpdateVisitante},{
        headers: {
        authorization: token
        }
      })
        .then(doc => {
        setPersonas([])
        cargarPersonas()
        setEditar(false)
        setLoading(false)
        Swal.fire(
          '¡Guardado!',
          'Acción realizada Correctamenete',
          'success'
        )  
        })
        .catch(err => {
        console.log(err)
        setEditar(false)
        setLoading(false)
        Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
        })   
      }
    })
 }
  const handleEliminarPersona = (usuario) => {
    
    const token = tokenN('token')
     Swal.fire({
      title: '¿Quieres Elimanar este Usuario?',
      text: "🚧🚧🚧 NOTA IMPORTANTE: 🚧🚧🚧 \nSi eliminas este Usuario se eliminaran todas sus Entradas y Salidas realizadas. \nSugerencia ❓: Descargue el historial antes de eliminar'",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    })
    .then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/usuarios/eliminarUsuario',{usuario},{
        headers: {
        authorization: token
        }
      })
        .then(doc => {
          setPersonas([])
          cargarPersonas()
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
  const editarPersona = (persona) => {
      setEditar(true)
      const personaEditarClavee = {
        cedula: persona.usuario.cedula
      }
      serUsuarioId(personaEditarClavee)
      const personaEditar = {
        nombre: persona.usuario.nombre,
        apellido: persona.usuario.apellido,
        edad: persona.usuario.edad,
        telefono: persona.usuario.telefono,
        correo: persona.usuario.correo
      }
      setDatosUpdateUsuario(personaEditar)
      const visitanteEditar = {
        tipo: persona.tipo,
        empresa: persona.empresa
      }
      setDatosUpdateVisitante(visitanteEditar)
    }
  const handleBuscar = (buscare) => {
    console.log(buscare)
    if(buscare){
      const usuarioIdo = {
        cedula: buscare
      }
      setPersonas([])
      setLoading(true)
      const token = tokenN('token')
      axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/usuarios/listaVisitanteid',{usuarioIdo},{
        headers: {
          authorization: token
        }
      })
      .then(doc => {
        console.log(doc.data)
        const per = doc.data
        setPersonas(per)
        setLoading(false)
        
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
      })
      
    }else{
      cargarPersonas()
    }
  }
  const handleBuscarn = (nombre) => {
    setPersonas([])
    const token = tokenN('token')
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/usuarios/listaVisitanten',{nombre},{
      headers: {
        authorization: token
      }
    })
      .then(doc => {
        const per = doc.data
        setPersonas(per)
        
      })
      .catch(err => {
        console.log(err)
        Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
      })
  }
  return(
    <>
      <div className = 'busqueda'>
        <div className = 'ccheckboxs'>
          <div className='checkboxs'><input style={{padding: '7px', borderRadius: '50px', textAlign: 'center', border: 'none' }} type='number' placeholder='Buscar por # Cedula' onChange={(e) => handleBuscar(e.target.value)}/></div>
          <div className='checkboxs'><input style={{padding: '7px', borderRadius: '50px', textAlign: 'center', border: 'none' }} type='text' placeholder='Buscar por Nombre' onChange={(e) => handleBuscarn(e.target.value)}/></div>
          <div className='checkboxs'>
            <button onClick={()=>{cargarPersonas()}} style={{ background: 'none', color: 'black', border: 'none', borderRadius: '50px', padding: '7px 20px',marginLeft: '5px' }}>
               ䷀
            </button>
          </div>
        </div>
      </div> 
      {loading && <div>
        <div className="container">
          <div className="cargando">
            <div className="pelotas"></div>
            <div className="pelotas"></div>
            <div className="pelotas"></div>
            <span className="texto-cargando">Cargando...{progress ? <>
              ✔
            </>: <></>}</span>
          </div>
        </div>  
      </div>}
      {!loading && <>
        {editar && <div>
        <>
                  <form onSubmit={handleEditarPersona} style={{display: loading ? 'none' : 'block', maxWidth: '720px', margin: '0 auto', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', maxHeight: 'calc(100vh - 40px)', overflow: 'auto', marginTop: '20px'}}>
                    <h2 style={{ marginBottom: '20px', color: '#333', width: '100%', textAlign: 'center' }}
>Editar Persona</h2>
                    <div className="cc">
                      
                      
                      <label style={{ color: '#555' }}> Numero De Documento: <label style={{ color: '#FF2D2D' }}>{usuarioId.cedula}</label></label>
                     
                    </div>
                    <br></br>  
                    <div className="Nombre">
                      <label style={{ color: '#555' }}>Nombre: </label>
                      <input
                        
                        placeholder='exam: Juan David'
                        type="text"
                        name="nombre"
                        value={datosUpdateUsuario.nombre}
                        onChange={handleInputChange}
                        required
                        style={{ width: '31%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <label style={{ color: '#555' }}> Apellido: </label>
                      <input
                        
                        placeholder='exam: Florez Rodriguez'
                        type="text"
                        name="apellido"
                        value={datosUpdateUsuario.apellido}
                        onChange={handleInputChange}
                        required
                        style={{ width: '31%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                    <div className="tel">
                      <label style={{ color: '#555' }}>Telefono: </label>
                      <input
                        placeholder='exam: 3003331333'
                        type="number"
                        name="telefono"
                        value={datosUpdateUsuario.telefono}
                        onChange={handleInputChange}
                        required
                        style={{ width: '17%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <label style={{ color: '#555'}}> Correo: </label>
                      <input
                        placeholder='exam: ejemplo@gmail.com'
                        type="text"
                        name="correo"
                        value={datosUpdateUsuario.correo}
                        onChange={handleInputChange}
                        required
                        style={{ width: '46.5%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                    <div className="em">
                      <label style={{ color: '#555' }}>Empresa: </label>
                      <input
                        placeholder='exam: Camara De Comercio De Cartagena'
                        type="text"
                        name="empresa"
                        value={datosUpdateVisitante.empresa}
                        onChange={handleInputEmpresa}
                        required
                        style={{ width: '35%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <label style={{ color: '#555' }}> Edad: </label>
                      <input
                        placeholder='1-99'
                        type="number"
                        name="edad"
                        value={datosUpdateUsuario.edad}
                        onChange={handleInputChange}
                        required
                        style={{ width: '8%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                    
                    <br></br>        
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button type="submit" style={{ display: loading ? 'none' : 'block', marginRight: '10px', padding: '8px 24.5px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>Editar</button>
                      <button onClick ={()=>{setEditar(false)}} style={{ display: loading ? 'none' : 'block', padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>Cancelar</button>
                    </div>
                    <br></br>  
                  </form>
                </>
                
      </div>}
        {!editar && <div  className='contenerdorobjetos' style={{ overflowX: 'auto', maxHeight: '400px', padding: '20px'}} data-aos="zoom-in">
        {personas.map((persona) => (
          <div className='tarejta'  key = {persona._id}>
            <label className='t_nombre'>{persona.usuario.nombre} {persona.usuario.apellido}</label>
            <label title='Cedula'  className='t_cc'>{persona.usuario.cedula}</label>
            <label title='Tipo' className='t_tipo'>{persona.usuario.correo }</label>
            <div className='t_botones'>
              <button title={'Detalles de '+persona.usuario.nombre} onClick={() => Swal.fire('Mas Detalles Personales\n\n'+'Nombre: '+persona.usuario.nombre+'\nApellidos: '+persona.usuario.apellido+'\nCorreo: '+persona.usuario.correo+'\nTelefono: '+persona.usuario.telefono+'\nEdad: '+persona.usuario.edad+'\nN° Documento: '+persona.usuario.cedula+'\nEmpresa: '+persona.empresa)} >📄</button>
              <button title={'Editar a '+persona.usuario.nombre} onClick ={()=>{editarPersona(persona)}}>✏️</button>
              <button title={'Eliminar a '+persona.usuario.nombre} onClick ={()=>{handleEliminarPersona(persona)}}>✂</button>
            </div>
            
          </div>
        ))}
      </div>}
      </>}
    </>
  )
}
