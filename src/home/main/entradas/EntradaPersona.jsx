import React, { useEffect, useState } from 'react'
import Home from '../../Home'
import AOS from 'aos'
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
  const [personas, setPersonas] = useState([])
  const [mostrarPersona, setMostarPersona] = useState(true)
  const [ingresarpersona, setIngresarPersona] = useState(false)
  const [salidaPersona, setSalidaPersona] = useState(false)
  const [persona,setPersona] = useState(null)
  const [activo,setActivo] = useState('')
  const [ubicacion, setUbicacion] = useState('Ronda')
  const [fecha, setFecha] = useState(null)
  const [hora,setHora] = useState('')
  const [tipo, setTipo] = useState('')
  const [tipoObjeto, setTipoObjeto] = useState('Persona')
  const [tipo_v, setTipo_v] = useState('')
  const [des_v, setDes_v] = useState('')
  const [cc,setCc] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)
  const registrosPorPagina = 6
  const indiceInicio = (paginaActual - 1) * registrosPorPagina
  const indiceFin = indiceInicio + registrosPorPagina
  const registrosPaginaActual = personas.slice(indiceInicio, indiceFin)
  const [loading, setLoading] = useState(true)
  const [proyectos, setProyectos] = useState([])
  const [visitas, setVisitas] = useState([])
  const [contratistas, setContratistas] = useState([])
  const [carga, setCarga] = useState(false)
  useEffect(()=>{
    tablaPersonas()  
    listarProyectos()
    listarVisitas()
    listarContratistas()
    AOS.init()
  },[])
  const listarProyectos = () => {
    const token = tokenN('token')
    axios.post('https://express.juanflow04flore.repl.co/arrys/obtenerProyectos',{},
    {
      headers: {
        authorization: token
      }
    })
    .then(doc => { 
      console.log(doc)
      setProyectos(doc.data)
      
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
    axios.post('https://express.juanflow04flore.repl.co/arrys/obtenerVisita',{},
    {
      headers: {
        authorization: token
      }
    })
    .then(doc => { 
      console.log(doc)
      setVisitas(doc.data)
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
    axios.post('https://express.juanflow04flore.repl.co/arrys/obtenerContratista',{},
    {
      headers: {
        authorization: token
      }
    })
    .then(doc => { 
      console.log(doc)
      setContratistas(doc.data)
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
  const tablaPersonas = () => {
    
    const filtroUnico = ''
    const token = tokenN('token')
    
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/usuarios/listaVisitante',{filtroUnico},{
      headers: {
        authorization: token
      }
    })
    .then(doc => {
      const per = doc.data
      setPersonas(per)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
    })
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPersonaData((prevData) => ({ ...prevData, [name]: value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) }))
  }
  const handleAgregarPersona = (e) => {
    e.preventDefault()
    
    const token = tokenN('token')
    Swal.fire({
      title: '¿Quieres Guardar este Usuario?',
      text: "Si ya valido que la informacion es correcta Oprimir 'Guardar",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        personaData.recepcionista = tokenN('cedula')
        console.log(personaData)
        axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/usuarios/agregarVisitante',{personaData},{
          headers: {
            authorization: token
          }
        })
        .then(doc => { 
          tablaPersonas()
          setMostarPersona(true)
          setPersonaData(initialState)
          setLoading(false)
          console.log(doc)
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
    setFecha(null)
    setHora('')
    setTipo_v('')
  }
  const MostrarSalida = (persona) => {
    setIngresarPersona(false)
    setSalidaPersona(true)
    setActivo(persona.usuario.cedula)
    setPersona(persona)
    setFecha(null)
    setHora('')
  }
  const handleAgregarEntrada = (e) => {
    e.preventDefault()

    const token = tokenN('token')
    if(fecha === null || hora === ''){
      Swal.fire({ icon: 'warning', title: 'Por favor...!', text: '¡Ingrese Todos Los Campos!' })
    }else{
      Swal.fire({
      title: '¿Quieres realizar la entrada a este Usuario?',
      text: "Si ya valido que la informacion es correcta Oprimir 'Agregar Entrada",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Agregar Entrada'
    })
      .then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/entradas/agregarEntradaPersona',{
          objeto: {
            recepcionista: tokenN('cedula'),
            objeto: persona,
            fecha: fecha,
            hora: hora,
            ubicacion: tokenN('ubicacion'),
            tipo: 'Entrada',
            tipo_v: tipo_v,
            tobjeto: tipoObjeto,
            descripcion: des_v
          }
        },{
          headers: {
            authorization: token
          }
        })
        .then(doc => {
          setLoading(false)
          setIngresarPersona(false)
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
  }
  const handleAgregarSalida = (e) => {
    e.preventDefault()

    const token = tokenN('token')
    if(fecha === null || hora === ''){
      Swal.fire({ icon: 'warning', title: 'Por favor...!', text: '¡Ingrese Todos Los Campos!' })
    }else{
      Swal.fire({
      title: '¿Quieres realizar la Salida a este Usuario',
      text: "Si ya valido que la informacion es correcta Oprimir 'Agregar Salida",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Agregar Salida'
    })
      .then((result) => {
      if (result.isConfirmed) {
        axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/entradas/agregarEntradaPersona',{
        objeto: {
          recepcionista: tokenN('cedula'),
          objeto: persona,
          fecha: fecha,
          hora: hora,
          ubicacion: tokenN('ubicacion'),
          tipo: 'Salida',
          tipo_v:'|*|*|*|*|*|',
          tobjeto: tipoObjeto,
          descripcion: '|*|*|*|*|*|'
        }
      },{
          headers: {
            authorization: token
          }
        })
        .then(doc => {
          setSalidaPersona(false)
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
  }
  const handleBuscar = (buscare) => {
    setPersonaData({cedula: buscare})
    if(buscare){
      const usuarioIdo = {
        cedula: buscare
      }
      setPersonas([])
      const token = tokenN('token')
      setCarga(true)
      axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/usuarios/listaVisitanteid',{usuarioIdo},{
        headers: {
          authorization: token
        }
      })
      .then(doc => {
        const per = doc.data
        setPersonas(per)
        setCarga(false)
      })
      .catch(err => {
        setCarga(false)
        console.log(err)
        Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
      })
      
    }else{
      tablaPersonas()
    }
  }
  const handleBuscarn = (nombre) => {
    setPersonas([])
    const token = tokenN('token')
    setCarga(true)
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/usuarios/listaVisitanten',{nombre},{
      headers: {
        authorization: token
      }
    })
      .then(doc => {
        const per = doc.data
        setPersonas(per)
        setCarga(false)
      })
      .catch(err => {
        setCarga(false)
        console.log(err)
        Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
      })
  }
    
  return(
   <>  
     
    <div className = 'mas_vida'></div>
    <div style={{  display: "flex", height: '100vh' }}>
      <Home />
      {loading && <div style= {{width: '100%'}}>
        <div className="container">
          <div className="cargando">
            <div className="pelotas"></div>
            <div className="pelotas"></div>
            <div className="pelotas"></div>
            <span className="texto-cargando">Cargando.... <br></br></span>
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
                  <form onSubmit={handleAgregarPersona} style={{ 
                    maxWidth: '1500px', margin: '0 auto', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', maxHeight: 'calc(100vh - 40px)', overflow: 'auto' 
                  }}>
                    <h2 style={{ 
                      marginBottom: '20px', color: '#333', width: '100%', textAlign: 'center' 
                    }}>Agregar Persona</h2>
                    <br></br>  
                    <div className="Nombre">
                      <label style={{ color: '#555' }}>Nombre: </label>
                      <input placeholder='exam: Juan David' type="text" name="nombre" value={personaData.nombre} onChange={handleInputChange} required
                        style={{ width: '31%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <label style={{ color: '#555' }}> Apellido: </label>
                      <input placeholder='exam: Florez Rodriguez' type="text" name="apellido" value={personaData.apellido} onChange={handleInputChange} required
                        style={{ width: '31%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                    <div className="cc">
                      <label style={{ color: '#555' }}>T_Documento: </label>
                      <select name="tcedula" value={personaData.tcedula} onChange={handleInputChange} required style={{ 
                        width: '20%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' 
                      }}>
                        <option value="">Seleccionar</option>
                        <option value="C. Ciudadania">C. Ciudadania</option>
                        <option value="C. Extrangeria">C. Extrangeria</option>
                        <option value="D. de Identidad">D. de Identidad</option>
                      </select>
                      <label style={{ color: '#555' }}> #_Documento: </label>
                      <input placeholder='exam: 1234567890' type="number" name="cedula" value={personaData.cedula} onChange={handleInputChange} required style={{ 
                        width: '26%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' 
                      }}/>
                    </div>
                    <div className="tel">
                      <label style={{ color: '#555' }}>Telefono: </label>
                      <input placeholder='exam: 3003331333' type="number" name="telefono" value={personaData.telefono} onChange={handleInputChange} required style={{ 
                        width: '17%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' 
                      }}/>
                      <label style={{ color: '#555'}}> Correo: </label>
                      <input placeholder='exam: ejemplo@gmail.com' type="text" name="correo" value={personaData.correo} onChange={handleInputChange} required style={{ 
                        width: '46.5%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' 
                      }}/>
                    </div>
                    <div className="em">
                      <label style={{ color: '#555' }}>Empresa: </label>
                      <input placeholder='exam: Camara De Comercio De Cartagena' type="text" name="empresa" value={personaData.empresa} onChange={handleInputChange} required
                        style={{ width: '37%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <label style={{ color: '#555' }}> Edad: </label>
                      <input placeholder='1-99' type="number" name="edad" value={personaData.edad} onChange={handleInputChange} required style={{ 
                        width: '8%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' 
                      }}/>
                    </div>
                    <br></br>        
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button type="submit" style={{ 
                        marginRight: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                      }}>Agregar</button>
                      <button onClick={MostrarAgregar} style={{ 
                        padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                      }}>Cancelar</button>
                    </div>
                    <br></br>  
                  </form>
                </>
            ) : (
                <>
                <div style={{display: 'flex', flexDirection: 'column' }}>
                  <div style= {{display: 'flex'}}>
                    <button onClick={MostrarObtener} style={{
                        padding: '8px 16px',
                        margin: '10px',
                        backgroundColor: 'white',
                        color: 'black',
                        border: 'none',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }}>Agregar Persona</button>
                    <div className='checkboxs'><input style={{padding: '7px', borderRadius: '50px', textAlign: 'center', border: 'none' }} type='number' placeholder='Buscar por # Cedula' onChange={(e) => handleBuscar(e.target.value)}/></div>
                    <div className='checkboxs'><input style={{padding: '7px', borderRadius: '50px', textAlign: 'center', border: 'none' }} type='text' placeholder='Buscar por Nombre' onChange={(e) => handleBuscarn(e.target.value)}/></div>
                    <div className='checkboxs'>
                      <button onClick={()=>{tablaPersonas()}} style={{ 
                      background: 'none', color: 'black', border: 'none', borderRadius: '50px', padding: '7px 10px',marginLeft: '5px' 
                    }}>䷀</button>
                    </div>
                  </div>
                  <div data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
                    <table style={{ 
                      backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' 
                    }}>
                      <thead>
                        <tr>
                          <th className = 'entradaPersona-Tabla'>⬆</th>
                          <th className = 'entradaPersona-Tabla'>Cedula</th>
                          <th className = 'entradaPersona-Tabla'>Nombres</th>
                          <th className = 'entradaPersona-Tabla'>➡</th>
                        </tr>
                      </thead>
                      
                      <tbody >
                        
                        {registrosPaginaActual.map((persona, index) => (
                          <tr key={index} >
                            <td className = 'entradaPersona-Tabla-td'>
                              <button onClick={() => {
                                    Swal.fire('\n Mas Detalles Personales\n\n'+'Nombre: '+persona.usuario.nombre+'\nApellidos: '+persona.usuario.apellido+'\nCorreo: '+persona.usuario.correo+'\nTelefono: '+persona.usuario.telefono+'\nEdad: '+persona.usuario.edad+'\nCedula: '+persona.usuario.cedula+'\nEmpresa: '+persona.empresa)
                                  }} className="entradaPersona-Tabla-Boton" >📄</button>
                            </td>
                            <td className = 'entradaPersona-Tabla-td'>{persona.usuario.cedula}</td>
                            <td className = 'entradaPersona-Tabla-td'>{persona.usuario.nombre} {persona.usuario.apellido}</td>
                            <td className = 'entradaPersona-Tabla-td'>
                              <button onClick={() => MostrarIngresar(persona)} className = 'entradaPersona-Tabla-Boton'>📥</button>
                              <button  onClick={() => MostrarSalida(persona)} className = 'entradaPersona-Tabla-Boton'>📤</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {carga && <div>Cargando Datos...</div>}
                    <div className="paginacion" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                      <button onClick={() => setPaginaActual(paginaActual - 1)} disabled={paginaActual === 1} className='entradaPersona-Paginas'>⬅</button>
                      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: '5px', textAlign: 'center' }}>{paginaActual}</span>
                      <button onClick={() => setPaginaActual(paginaActual + 1)} disabled={indiceFin >= personas.length} className='entradaPersona-Paginas'>➡</button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {ingresarpersona && (
                <>
                  <div style={{ textAlign: 'center',  paddingLeft: '20px' }} data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
                    <form onSubmit={handleAgregarEntrada} style={{
                      maxWidth: '400px', 
                      margin: '0 auto', 
                      backgroundColor: '#f5f5f5', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', 
                      maxHeight: 'calc(100vh - 40px)', 
                      overflow: 'auto' 
                    }}> 
                  <h2 style={{ color: '#333', marginBottom: '20px' }}> Agregar Entrada </h2>
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>  Cedula: #️⃣ - {activo}</label>
                  <br />
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Ubicacion: 📍 - {tokenN('ubicacion')}</label>
                  <br />
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Tipo De Visita </label><br></br>
                  <select
                    name="tipo"
                    value={tipo_v}
                    onChange={(e)=>{
                      setDes_v('')
                      setTipo_v(e.target.value)}
                    }
                    required
                    style={{width:'80%', padding: '8px', marginBottom: '3px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',border: '1px solid #ccc' }}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Proyecto">Proyectos</option>
                    <option value="Contratista">Contratistas</option>
                    <option value="Visita">Visitas</option>
                  </select>
                  <br></br>
                  {tipo_v === 'Proyecto' && <div>
                    <select name="tipo" value={des_v} onChange={(e)=>setDes_v(e.target.value)} required
                      style={{
                        width:'80%', 
                        padding: '8px', 
                        marginBottom: '3px', 
                        borderRadius: '4px', 
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        border: '1px solid #ccc' }}
                    >
                      <option value="">Seleccionar</option>
                      {proyectos.map((proyecto) => (
                        <option value={proyecto.proyecto}>{proyecto.proyecto}</option>
                      ))}
                    </select>
                  </div>}
                  {tipo_v === 'Contratista' && <div>
                    <select name="tipo" value={des_v} onChange={(e)=>setDes_v(e.target.value)} required
                      style={{
                        width:'80%', 
                        padding: '8px', 
                        marginBottom: '3px', 
                        borderRadius: '4px', 
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        border: '1px solid #ccc' }}
                    >
                      <option value="">Selecionar</option>
                      {contratistas.map((contratista) => (
                        <option value={contratista.contratista}>{contratista.contratista}</option>
                      ))}
                    </select>
                  </div>}
                  {tipo_v === 'Visita' && <div>
                    <select name="tipo" value={des_v} onChange={(e)=>setDes_v(e.target.value)} required
                      style={{
                        width:'80%', 
                        padding: '8px', 
                        marginBottom: '3px', 
                        borderRadius: '4px', 
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        border: '1px solid #ccc' }}
                    >
                      <option value="">Selecionar</option>
                      {visitas.map((visita) => (
                        <option value={visita.visita}>{visita.visita}</option>
                      ))}
                    </select>
                  </div>}
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Fecha</label><br></br>
                  <input type="date" id="fecha" name="fecha" onChange={(e) => setFecha(e.target.value)}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      width:'72%'
                    }}
                  /><br></br>
                  <label htmlFor="time" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Hora</label><br></br>
                  <input type="time" id="time" name="time" onChange={(e) => setHora(e.target.value)}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      width:'72%'
                    }}
                    
                  />
                  <br /><br />
                  <input type="submit" value="Enviar"
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
                    <button onClick={MostrarAgregar} style={{ 
                  padding: '0px 0px', background: 'white', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>❌</button>
                  </div>
                </>
            )}
            {salidaPersona &&(
                <>
                <div style={{ textAlign: 'center',  paddingLeft: '20px' }} data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
                  
                <form onSubmit={handleAgregarSalida} style={{maxWidth: '400px', margin: '0 auto', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', maxHeight: 'calc(100vh - 40px)', overflow: 'auto' }}> 
                  <h2 style={{ color: '#333', marginBottom: '20px' }}> -Agregar Salida- </h2>
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>  Cedula: #️⃣ - {activo}</label>
                  <br />
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Ubicacion: 📍 - {tokenN('ubicacion')}</label>
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
