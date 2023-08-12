import React, { useEffect, useState } from 'react'


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
    axios.post('https://express.juanflow04flore.repl.co/usuarios/listaVisitante',{},{
      headers: {
        authorization: token
      },
      onUploadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 1) / progressEvent.total);
          setProgress(percentCompleted);
      }
    })
    .then(doc => {
      console.log(doc.data)
      const per = doc.data
      setPersonas(per)
      setLoading(false)
      setProgress(0)
    })
    .catch(err => {
      console.log(err)
      setProgress(0)
    })
  }
  const handleEditarPersona = (e) => {
    e.preventDefault()
    
    const token = tokenN('token')
    console.log(token)
    console.log(usuarioId)
    console.log(datosUpdateVisitante)
    console.log(datosUpdateUsuario)
    setLoading(true)
    var resultado = window.confirm('¿Quieres editar esta Persona? ->> '+datosUpdateUsuario.nombre)
    if (resultado === true) {
      axios.post('https://express.juanflow04flore.repl.co/usuarios/editarVisitante',{usuarioId,datosUpdateUsuario, datosUpdateVisitante},{
        headers: {
        authorization: token
        }
      })
      .then(doc => {
        alert('Persona Editada Correctamente \n <<<<<<<  ' + '>>>>>>>>>')
        console.log(doc.data)
        setPersonas([])
        cargarPersonas()
        setEditar(false)
      })
      .catch(err => {
        console.log(err)
      })
      } 
    else { 
        window.alert('Accion Cancelada')
    }
    
 }
  const handleEliminarPersona = (persona) => {
    const usuarioIdc = {
      cedula: persona.usuario.cedula
    }
    const token = tokenN('token')
    console.log(usuarioIdc)
    var resultado = window.confirm('¿Quieres Elimanar esta Persona? ->> ' + persona.usuario.cedula +'\n🚧🚧🚧 NOTA IMPORTANTE: 🚧🚧🚧 \n Si eliminas este Usuario se eliminaran todas sus Entradas y Salidas realizadas. \nSugerencia ❓: Descargue el historial antes de eliminar')
    if (resultado === true) {
      axios.post('https://express.juanflow04flore.repl.co/usuarios/eliminarUsuario',{usuarioIdc},{
        headers: {
        authorization: token
        }
      })
      .then(doc => {
        alert('Persona Eliminada Correctamente \n <<<<<<<  ' + '>>>>>>>>>')
        console.log(doc.data)
        setPersonas([])
        cargarPersonas()
      })
      .catch(err => {
        console.log(err)
      })
      } 
    else { 
        window.alert('Accion Cancelada')
    }
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
        cedula: buscare,
        recepcionista: tokenN('cedula')
      }
      setPersonas([])
      setLoading(true)
      const token = tokenN('token')
      axios.post('https://express.juanflow04flore.repl.co/usuarios/listaVisitanteid',{usuarioIdo},{
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
      })
      
    }else{
      cargarPersonas()
    }
  }
  return(
    <>
      <div className = 'busqueda'>
        <div className = 'ccheckboxs'>
          <div className='checkboxs'><input style={{padding: '7px', borderRadius: '50px', textAlign: 'center' }} type='number' placeholder='Buscar por # Cedula' onChange={(e) => handleBuscar(e.target.value)}/></div>
          <div className='checkboxs'>
            <button onClick={()=>{cargarPersonas()}} style={{ background: 'none', color: 'black', border: 'none', borderRadius: '50px', padding: '7px 20px',marginLeft: '5px' }}>
               ䷀
            </button>
          </div>
        </div>
      </div> 
      {loading && <div>
        <div class="container">
          <div class="cargando">
            <div class="pelotas"></div>
            <div class="pelotas"></div>
            <div class="pelotas"></div>
            <span class="texto-cargando">Cargando...{progress ? <>
              ✔
            </>: <></>}</span>
          </div>
        </div>  
      </div>}
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
                        style={{ width: '34%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <label style={{ color: '#555' }}> Apellido: </label>
                      <input
                        
                        placeholder='exam: Florez Rodriguez'
                        type="text"
                        name="apellido"
                        value={datosUpdateUsuario.apellido}
                        onChange={handleInputChange}
                        required
                        style={{ width: '34%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
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
                        style={{ width: '37%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
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
                      <label style={{ color: '#555' }}> Tipo: </label>
                      <select
                        name="tipo"
                        value={datosUpdateVisitante.tipo}
                        onChange={handleInputTipo}
                        required
                        style={{ width: '18.8%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      >
                        <option value="">Seleccionar</option>
                        <option value="Proyectos">Proyectos</option>
                        <option value="Contratistas">Contratistas</option>
                        <option value="Visitas">Visitas</option>
                      </select>
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
                        style={{ width: '20%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <label style={{ color: '#555'}}> Correo: </label>
                      <input
                        placeholder='exam: ejemplo@gmail.com'
                        type="text"
                        name="correo"
                        value={datosUpdateUsuario.correo}
                        onChange={handleInputChange}
                        required
                        style={{ width: '49.5%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
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
      {!editar && <div  className='contenerdorobjetos'>
        {personas.map((persona, index) => (
          <div className='tarejta'>
            <label className='t_nombre'>{persona.usuario.nombre} {persona.usuario.apellido}</label>
            <label title='Cedula'  className='t_cc'>{persona.usuario.cedula}</label>
            <label title='Tipo' className='t_tipo'>{persona.tipo}</label>
            <div className='t_botones'>
              <button title={'Detalles de '+persona.usuario.nombre} onClick={() => alert('\n<<<<<<<<<<<<< Mas Detalles Personales>>>>>>>>>>>>>>\n\n'+'Nombre: '+persona.usuario.nombre+'\nApellidos: '+persona.usuario.apellido+'\nCorreo: '+persona.usuario.correo+'\nTelefono: '+persona.usuario.telefono+'\nEdad: '+persona.usuario.edad+'\nCedula: '+persona.usuario.cedula+'\nTipo: '+persona.tipo+'\nEmpresa: '+persona.empresa)} >📄</button>
              <button title={'Editar a '+persona.usuario.nombre} onClick ={()=>{editarPersona(persona)}}>✏️</button>
              <button title={'Eliminar a '+persona.usuario.nombre} onClick ={()=>{handleEliminarPersona(persona)}}>✂</button>
            </div>
            
          </div>
        ))}
      </div>}
      
    </>
  )
}
