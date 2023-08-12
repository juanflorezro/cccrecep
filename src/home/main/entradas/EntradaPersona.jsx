import React, { useEffect, useState } from 'react'
import Home from '../../Home'
export default function EntradaPersona(){
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<Variables>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
  //Variables para agregar una persona
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
  const [personaData, setPersonaData] = useState({
    nombre: '',
    apellido: '',
    tcedula: '',
    cedula: '',
    empresa: '',
    edad: '',
    tipo: '',
    telefono: '',
    correo: '',
    recepcionista: tokenN('cedula')
  })
  const initialState = {
    nombre: '',
    apellido: '',
    tcedula: '',
    cedula: '',
    empresa: '',
    edad: '',
    tipo: '',
    telefono: '',
    correo: '',
  }
  //variables para guardar el objeto
  const [personas, setPersonas] = useState([])
  //variables para mostrar los formularios 
  const [mostrarPersona, setMostarPersona] = useState(true)
  const [ingresarpersona, setIngresarPersona] = useState(false)
  const [salidaPersona, setSalidaPersona] = useState(false)
  //variables para agregar una entrada y salida
  const [persona,setPersona] = useState(null)
  const [activo,setActivo] = useState('')
  const [ubicacion, setUbicacion] = useState('Ronda')
  const [fecha, setFecha] = useState(null)
  const [hora,setHora] = useState('')
  const [tipo, setTipo] = useState('')
  const [tipoObjeto, setTipoObjeto] = useState('Persona')
  //variables para mostrar los personas por en la tabla por paginas 
  const [paginaActual, setPaginaActual] = useState(1)
  const registrosPorPagina = 6
  const indiceInicio = (paginaActual - 1) * registrosPorPagina
  const indiceFin = indiceInicio + registrosPorPagina
  const registrosPaginaActual = personas.slice(indiceInicio, indiceFin)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    tablaPersonas()
    
  },[])
 
  const compararHoraFecha = (a, b) => {
    // Primero, compara las horas
   
    // Si las horas son iguales, compara las fechas
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    if (fechaA < fechaB) {
      return -1;
    }
    if (fechaA > fechaB) {
      return 1;
    }
    
    const horaA = new Date(`2023-01-01 ${a.hora}`);
    const horaB = new Date(`2023-01-01 ${b.hora}`);
    if (horaA < horaB) {
      return -1;
    }
    if (horaA > horaB) {
      return 1;
    }
    return 0; // Si las horas y fechas son iguales
  }
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<cargar tabla>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const tablaPersonas = () => {
    
    const filtroUnico = ''
    const token = tokenN('token')
    axios.post('https://express.juanflow04flore.repl.co/usuarios/listaVisitante',{filtroUnico},{
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
  }
 //<<<<<<<<<<<<<<<<<<<<<<consultar Entrada>>>>>>>>>>>>>>>>>>>>>> 
  const consultar = (entradaData) => {
    return new Promise( (resolve , reject) => {
      const token = tokenN('token')
      console.log(entradaData)
      axios.post('https://express.juanflow04flore.repl.co/entradas/obtenerEntradaSalida',{entradaData},{
        headers: {
          authorization: token
        }
      })
      .then(doc => {
        console.log('entrando')
        console.log(doc.data)
        resolve(doc.data.sort(compararHoraFecha))
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }
  //limitar lista de entradas 
  const limitarEntradas = (data) => {
    return new Promise((resolve,reject) => {
      const horaVariableDate = new Date(`${fecha} ${hora}`) // Convertir la hora variable a un objeto Date
      
      const listaHastaHoraVariable = []
      for (const item of data) {
        const horaItem = new Date(`${item.fecha} ${item.hora}`)
        if (horaItem <= horaVariableDate) {
          listaHastaHoraVariable.push(item)
        }
      }
      resolve(listaHastaHoraVariable)
    })
  }
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<agregar Persona>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPersonaData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleAgregarPersona = (e) => {
    e.preventDefault()
    
    const token = tokenN('token')
    console.log(token)
    console.log(personaData)
    
    var resultado = window.confirm('¿Quieres guardar esta Persona? ->> '+personaData.nombre)
    if (resultado === true) {
      axios.post('https://express.juanflow04flore.repl.co/usuarios/agregarvisitante',{personaData},{
        headers: {
        authorization: token
        }
      })
      .then(doc => {
        alert('Activo guardado Correctamente \n <<<<<<<  ' + '>>>>>>>>>')
        console.log(doc.data)
        tablaPersonas()
        setMostarPersona(true)
        setPersonaData(initialState)
      })
      .catch(err => {
        console.log(err)
      })
      } else { 
        window.alert('Accion Cancelada')
      }
    
    }
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<botones para mostrar formularios>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const MostrarAgregar = () => {
    setMostarPersona(true)
    setSalidaPersona(false)
    setIngresarPersona(false)
  }
  const MostrarObtener = () => {
    setMostarPersona(false)
    setIngresarPersona(false)
    setSalidaPersona(false)
  }
  const MostrarIngresar = (persona) => {
    setIngresarPersona(true)
    setActivo(persona.usuario.cedula)
    setSalidaPersona(false)
    setPersona(persona)
  }
  const MostrarSalida = (persona) => {
    setIngresarPersona(false)
    setSalidaPersona(true)
    setActivo(persona.usuario.cedula)
    setPersona(persona)
  }
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<agregar entrada>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleAgregarEntrada = (e) => {
    e.preventDefault()

    console.log(persona)
    const token = tokenN('token')
    console.log(token)
     axios.post('https://express.juanflow04flore.repl.co/entradas/agregarEntradaPersona',{
          objeto: {
            recepcionista: tokenN('cedula'),
            objeto: persona,
            fecha: fecha,
            hora: hora,
            ubicacion: tokenN('ubicacion'),
            tipo: 'Entrada',
            tobjeto: tipoObjeto
          }
        },{
          headers: {
            authorization: token
          }
        })
        .then(doc => {
          console.log(doc.data)
          alert('entrada correcta  '+ doc.data.objeto)
        })
        .catch(err => {
          console.log(err)
        })
  }
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<agregar salida>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleAgregarSalida = (e) => {
    e.preventDefault()

    console.log(persona)
    const token = tokenN('token')
    var resultado = window.confirm('¿Quieres hacer esta Salida?')
      if (resultado === true) {
        axios.post('https://express.juanflow04flore.repl.co/entradas/agregarEntradaPersona',{
        objeto: {
          recepcionista: tokenN('cedula'),
          objeto: persona,
          fecha: fecha,
          hora: hora,
          ubicacion: tokenN('ubicacion'),
          tipo: 'Salida',
          tobjeto: tipoObjeto
        }
      },{
          headers: {
          authorization: token
        }
        })
        .then(doc => {
          console.log(doc.data)
          alert('Salida correcta  '+ doc.data.objeto.cedula)
        })
        .catch(err => {
          console.log(err)
        })
        setIngresarPersona(false)
      } else { 
        window.alert('Accion Cancelada')
      }
  }
  const handleBuscar = (buscare) => {
    console.log(buscare)
    if(buscare){
      const usuarioIdo = {
        cedula: buscare
      }
      setPersonas([])
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
        
      })
      .catch(err => {
        console.log(err)
      })
      
    }else{
      tablaPersonas()
    }
  }
  return(
   <>
      
    <div style={{  display: "flex", height: '100vh' }}>
       
      <Home />
      {loading && <div style= {{width: '100%'}}>
        <div class="container">
          <div class="cargando">
            <div class="pelotas"></div>
            <div class="pelotas"></div>
            <div class="pelotas"></div>
            <span class="texto-cargando">Cargando.... <br></br></span>
          </div>
        </div>  
        <div>
        </div>
      </div>}
      {!loading && <div style={{width:'100%'}}>
        <h1  style={{ width:'100%', marginBottom: '10px'}}>Entrada Persona</h1>   
        <div className ='agregar_objeto'>
            
            {!mostrarPersona ? (
              <>
                  <form onSubmit={handleAgregarPersona} style={{ maxWidth: '1500px', margin: '0 auto', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', maxHeight: 'calc(100vh - 40px)', overflow: 'auto' }}>
                    <h2 style={{ marginBottom: '20px', color: '#333', width: '100%', textAlign: 'center' }}
>Agregar Persona</h2>
                    <br></br>  
                    <div className="Nombre">
                      <label style={{ color: '#555' }}>Nombre: </label>
                      <input
                        
                        placeholder='exam: Juan David'
                        type="text"
                        name="nombre"
                        value={personaData.nombre}
                        onChange={handleInputChange}
                        required
                        style={{ width: '34%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <label style={{ color: '#555' }}> Apellido: </label>
                      <input
                        
                        placeholder='exam: Florez Rodriguez'
                        type="text"
                        name="apellido"
                        value={personaData.apellido}
                        onChange={handleInputChange}
                        required
                        style={{ width: '34%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                    <div className="cc">
                      <label style={{ color: '#555' }}>T_Documento: </label>
                      <select
                        name="tcedula"
                        value={personaData.tcedula}
                        onChange={handleInputChange}
                        required
                        style={{ width: '23%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      >
                        <option value="">Seleccionar</option>
                        <option value="C. Ciudadania">C. Ciudadania</option>
                        <option value="C. Extrangeria">C. Extrangeria</option>
                        <option value="D. de Identidad">D. de Identidad</option>
                      </select>
                      <label style={{ color: '#555' }}> #_Documento: </label>
                      <input
                        placeholder='exam: 1234567890'
                        type="number"
                        name="cedula"
                        value={personaData.cedula}
                        onChange={handleInputChange}
                        required
                        style={{ width: '32%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                    <div className="em">
                      <label style={{ color: '#555' }}>Empresa: </label>
                      <input
                        placeholder='exam: Camara De Comercio De Cartagena'
                        type="text"
                        name="empresa"
                        value={personaData.empresa}
                        onChange={handleInputChange}
                        required
                        style={{ width: '37%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <label style={{ color: '#555' }}> Edad: </label>
                      <input
                        placeholder='1-99'
                        type="number"
                        name="edad"
                        value={personaData.edad}
                        onChange={handleInputChange}
                        required
                        style={{ width: '8%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <label style={{ color: '#555' }}> Tipo: </label>
                      <select
                        name="tipo"
                        value={personaData.tipo}
                        onChange={handleInputChange}
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
                        value={personaData.telefono}
                        onChange={handleInputChange}
                        required
                        style={{ width: '20%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <label style={{ color: '#555'}}> Correo: </label>
                      <input
                        placeholder='exam: ejemplo@gmail.com'
                        type="text"
                        name="correo"
                        value={personaData.correo}
                        onChange={handleInputChange}
                        required
                        style={{ width: '49.5%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                    <br></br>        
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button type="submit" style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>Agregar</button>
                      <button onClick={MostrarAgregar} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>Cancelar</button>
                    </div>
                    <br></br>  
                  </form>
                </>
            ) : (
              <>
                <div style={{display: 'flex', flexDirection: 'column' }}>
                  <div style= {{display: 'flex'}}>
                    <button
                      onClick={MostrarObtener}
                      style={{
                        padding: '8px 16px',
                        margin: '10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      Agregar Persona
                    </button>
                    <div className='checkboxs'><input style={{padding: '7px', borderRadius: '50px', textAlign: 'center', border: 'none' }} type='number' placeholder='Buscar por # Cedula' onChange={(e) => handleBuscar(e.target.value)}/></div>
                    <div className='checkboxs'>
            <button onClick={()=>{tablaPersonas()}} style={{ background: 'none', color: 'black', border: 'none', borderRadius: '50px', padding: '7px 20px',marginLeft: '5px' }}>
               ䷀
            </button>
          </div>
                  </div>
                  
                  <div>
                    <table style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
                      <thead>
                        <tr>
                          <th style={{ backgroundColor: '#a8d5e5', color: '#fff', borderBottom: '1px solid #ccc', padding: '8px' }}>
                            ⬆
                          </th>
                          <th style={{ backgroundColor: ' #a8d5e5', color: '#fff', borderBottom: '1px solid #ccc', padding: '8px' }}>
                            Cedula
                          </th>
                          <th style={{ backgroundColor: ' #a8d5e5', color: '#fff', borderBottom: '1px solid #ccc', padding: '8px' }}>
                            Nombres
                          </th>
                          <th style={{ backgroundColor: ' #a8d5e5', color: '#fff', borderBottom: '1px solid #ccc', padding: '8px' }}>
                            Tipo
                          </th>
                          <th style={{ backgroundColor: ' #a8d5e5', color: '#fff', borderBottom: '1px solid #ccc', padding: '8px' }}>
                            ➡
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {registrosPaginaActual.map((persona, index) => (
                          <tr key={index}>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                              <button
                                  onClick={() => alert('\n<<<<<<<<<<<<< Mas Detalles Personales>>>>>>>>>>>>>>\n\n'+'Nombre: '+persona.usuario.nombre+'\nApellidos: '+persona.usuario.apellido+'\nCorreo: '+persona.usuario.correo+'\nTelefono: '+persona.usuario.telefono+'\nEdad: '+persona.usuario.edad+'\nCedula: '+persona.usuario.cedula+'\nTipo: '+persona.tipo+'\nEmpresa: '+persona.empresa)}
                                  className="btn btn-danger"
                                  style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px', width: '100%' }}
                                >
                                📄 
                              </button>
                            </td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{persona.usuario.cedula}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{persona.usuario.nombre} {persona.usuario.apellido}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{persona.tipo}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                              <button
                                onClick={() => MostrarIngresar(persona)}
                                className="btn btn-danger"
                                style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px' }}
                              >
                                📥
                              </button>
                              <button 
                                onClick={() => MostrarSalida(persona)}
                                
                                style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px',marginLeft: '5px' }}
                              > 📤 </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="paginacion" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                      <button
                        onClick={() => setPaginaActual(paginaActual - 1)}
                        disabled={paginaActual === 1}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#007bff',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          marginRight: '10px',
                          cursor: 'pointer',
                        }}
                      >
                       ⬅
                      </button>
                      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{paginaActual}</span>
                      <button
                        onClick={() => setPaginaActual(paginaActual + 1)}
                        disabled={indiceFin >= personas.length}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#007bff',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          marginLeft: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        ➡
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {ingresarpersona && (
              <>
                <div style={{ textAlign: 'center',  paddingLeft: '20px' }}>
                <form onSubmit={handleAgregarEntrada} style={{maxWidth: '400px', margin: '0 auto', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', maxHeight: 'calc(100vh - 40px)', overflow: 'auto' }}> 
                  <h2 style={{ color: '#333', marginBottom: '20px' }}> Agregar Entrada </h2>
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>  Cedula: #️⃣ - </label>
                  <br />
                  <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    value = {activo}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                  <br />
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Ubicacion: 📍 - </label>
                  <br />
                  <input
                    type="text"
                    id="ubicacion"
                    name="ubicacion"
                    value = {ubicacion}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                  <br /><br />
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Fecha: </label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    onChange={(e) => setFecha(e.target.value)}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    
                  />
                  <br /><br />
                  <label htmlFor="time" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Hora:  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    onChange={(e) => setHora(e.target.value)}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    
                  />
                  
                  <br /><br />
                  <input
                    type="submit"
                    value="Enviar"
                    style={{
                      padding: '8px 16px',
                      fontSize: '16px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                   
                </form>
                <button onClick={MostrarAgregar} style={{ padding: '0px 0px', background: 'white', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>❌</button>
              </div>
              </>
            )}

            {salidaPersona &&(
              <>
                
                <div style={{ textAlign: 'center',  paddingLeft: '20px' }}>
                  
                <form onSubmit={handleAgregarSalida} style={{maxWidth: '400px', margin: '0 auto', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', maxHeight: 'calc(100vh - 40px)', overflow: 'auto' }}> 
                  <h2 style={{ color: '#333', marginBottom: '20px' }}> -Agregar Salida- </h2>
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>  Cedula: #️⃣ - </label>
                  <br />
                  <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    value = {activo}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                  <br />
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Ubicacion: 📍 - </label>
                  <br />
                  <input
                    type="text"
                    id="ubicacion"
                    name="ubicacion"
                    value = {ubicacion}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                  <br /><br />
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Fecha: </label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    onChange={(e) => setFecha(e.target.value)}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    
                  />
                  <br /><br />
                  <label htmlFor="time" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Hora:  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    onChange={(e) => setHora(e.target.value)}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    
                  />
                  
                  <br /><br />
                  <input
                    type="submit"
                    value="Enviar"
                    style={{
                      padding: '8px 16px',
                      fontSize: '16px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    
                  />
                </form>
                <button onClick={MostrarAgregar} style={{ padding: '0px 0px', background: 'white', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>❌</button>
              </div>
              </>
            )}
          </div>
      </div>}
       
    </div>
   </>
  )
}