import React, { useEffect, useState } from 'react'
import Home from '../../Home'
export default function EntradaObjeto(){ 
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
  const [objetoData, setObjetoData] = useState({
    serial: '',
    modelo: '',
    activo: '',
    descripcion: '',
    recepcionista: tokenN('cedula')
  })
  const [objetos, setObjetos] = useState([])
  const [mostrarObjeto, setMostrarObjeto] = useState(true)
  const [ingresarObjeto, setIngresarObjeto] = useState(false)
  const [salidaObjeto, setSalidaObjeto] = useState(false)
  const [objeto,setObjeto] = useState(null)
  const [activo,setActivo] = useState('')
  const [fecha, setFecha] = useState(null)
  const [hora,setHora] = useState('')
  const [descripcionEntrada, setDescripcionEntrada] = useState('')
  const [tipoObjeto, setTipoObjeto] = useState('Objeto')
  const [paginaActual, setPaginaActual] = useState(1)
  const registrosPorPagina = 8
  const indiceInicio = (paginaActual - 1) * registrosPorPagina
  const indiceFin = indiceInicio + registrosPorPagina
  const registrosPaginaActual = objetos.slice(indiceInicio, indiceFin)
  const [buscar, setBuscar] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    tablaObjetos('')
  },[])
  const tablaObjetos = (filtroUnico) => {
    const token = tokenN('token')
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/objetos/lista',{filtroUnico},{
      headers: {
        authorization: token
      }
    })
    .then(doc => {
      console.log(doc.data)
      const obj = doc.data
      setObjetos(obj)
      console.log(objetos)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
    })
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setObjetoData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleAgregarObjeto = (e) => {
    e.preventDefault()
    const token = tokenN('token')
    
    Swal.fire({
      title: '¿Quieres guardar este Activo? \n '+objetoData.activo,
        
      showCancelButton: true,
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/objetos/agregar',{objetoData},{
        headers: {
        authorization: token
        }
      })
        .then(doc => {
          
          console.log(doc.data)
          tablaObjetos()
          setMostrarObjeto(true)
          Swal.fire('Activo guardado Correctamente', '', 'success')
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!'
          })
        })
        
      } else if (result.isDenied) {
        Swal.fire('La Acción Fue Cancelada', '', 'info')
      }
    })
    
    }
  const MostrarAgregar = () => {
    setMostrarObjeto(true)
    setSalidaObjeto(false)
    setIngresarObjeto(false)
  }
  const MostrarObtener = () => {
    setMostrarObjeto(false)
    setIngresarObjeto(false)
    setSalidaObjeto(false)
  }
  const MostrarIngresar = (objeto) => {
    setIngresarObjeto(true)
    setActivo(objeto.activo)
    setSalidaObjeto(false)
    setObjeto(objeto)
    setFecha(null)
    setHora('')
    setDescripcionEntrada('')
  }
  const MostrarSalida = (objeto) => {
    setIngresarObjeto(false)
    setSalidaObjeto(true)
    setObjeto(objeto)
    setActivo(objeto.activo)
    setFecha(null)
    setHora('')
    setDescripcionEntrada('')
  }
  const handleAgregarEntrada = (e) => {
    e.preventDefault()
    if(fecha === null || hora === ''){
      Swal.fire({ icon: 'warning', title: 'Por favor...!', text: '¡Ingrese Todos Los Campos!' })
    }else{
      Swal.fire({
      title: '¿Quieres realizar la Entrada a este Activo?',
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
        const token = tokenN('token')
        axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/entradas/agregarEntradaObjeto',{
          objeto: {
            recepcionista: tokenN('cedula'),
            objeto: objeto,
            fecha: fecha,
            hora: hora,
            ubicacion: tokenN('ubicacion'),
            tipo: 'Entrada',
            tobjeto: tipoObjeto,
            descripcion: descripcionEntrada
          }
        },{
          headers: {
            authorization: token
          }
        })
        .then(doc => {
          console.log(doc.data)
          setLoading(false)
          setIngresarObjeto(false)
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
    if(fecha === null || hora === ''){
      Swal.fire({ icon: 'warning', title: 'Por favor...!', text: '¡Ingrese Todos Los Campos!' })
    }else{
      Swal.fire({
      title: '¿Quieres realizar la Salida a este Activo?',
      text: "Si ya valido que la informacion es correcta Oprimir 'Agregar Salida",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Agregar Salida'
    })
      .then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        const token = tokenN('token')
        axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io//entradas/agregarEntradaObjeto',{
        objeto: {
          recepcionista: tokenN('cedula'),
          objeto: objeto,
          fecha: fecha,
          hora: hora,
          ubicacion: tokenN('ubicacion'),
          tipo: 'Salida',
          tobjeto: tipoObjeto,
          descripcion: descripcionEntrada
        }
      },{
         headers: {
          authorization: token
        }
      })
      .then(doc => {
        console.log(doc.data)
        setLoading(false)
        setSalidaObjeto(false)
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
  const buscarObjeto = (buscare) => {
    let filtroUnico
    if(buscare){
      filtroUnico = {
        activo: buscare
      }
    }else{
      filtroUnico = ''
    }
     
    const token = tokenN('token')
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/objetos/lista',{filtroUnico},{
      headers: {
        authorization: token
      }
    })
    .then(doc => {
      console.log(doc.data)
      const obj = doc.data
      setObjetos(obj)
      console.log(objetos)
      //setLoading(false)
    })
    .catch(err => {
      console.log(err)
      Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
    })
    
    
    console.log(buscar)
  }
  const buscarObjetos = (object) => {
    
     
    const token = tokenN('token')
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/objetos/listaN',{object},{
      headers: {
        authorization: token
      }
    })
    .then(doc => {
      console.log(doc.data)
      const obj = doc.data
      setObjetos(obj)
      console.log(objetos)
      //setLoading(false)
    })
    .catch(err => {
      console.log(err)
      Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
    })
    
    
    console.log(buscar)
  }
  return(
   <>
     <div className = 'mas_vida'></div>
    <div className = 'camara' style={{  display: "flex", height: '100vh' }}>
       
      <Home />
      {loading && <div style= {{width: '100%'}}>
        <div className="container">
          <div className="cargando">
            <div className="pelotas"></div>
            <div className="pelotas"></div>
            <div className="pelotas"></div>
            <span className="texto-cargando">Cargando...</span>
          </div>
        </div>  
      </div>}
      {!loading && <div style={{width:'100%'}}>
        <h1  style={{ width:'100%', marginBottom: '10px'}}>Entrada Objeto</h1>   
        <div className ='agregar_objeto'>
            {ingresarObjeto && (
              <>
                <div style={{ textAlign: 'center',  paddingLeft: '20px' }} >
                <form onSubmit={handleAgregarEntrada} style={{maxWidth: '400px', margin: '0 auto', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', maxHeight: 'calc(100vh - 40px)', overflow: 'auto' }}> 
                  <h2 style={{ color: '#333', marginBottom: '20px' }}> Agregar Entrada </h2>
                  <label htmlFor="Activo" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>  Activo: #️⃣ - {activo} </label>
                  <br />
                  <label htmlFor="ubicacion" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Ubicacion: 📍 - {tokenN('ubicacion')}</label>
                  <br />
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Fecha: </label><br />
                  <input type="date" id="fecha" name="fecha" onChange={(e) => setFecha(e.target.value)}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      width: '95%',
                      textAlign: 'center'
                    }} 
                  />
                  <br />
                  <label htmlFor="time" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Hora:  </label><br />
                  <input  type="time" id="time" name="time" onChange={(e) => setHora(e.target.value)}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      width: '95%'
                    }}
                  /><br></br>
                  <textarea
                    placeholder='Detalles Especificos De La Entrada'
                    name="descripcion"
                    value={descripcionEntrada}
                    onChange={(e)=>setDescripcionEntrada(e.target.value)}
                    required
                    style={{ width: '95%', padding: '8px', marginTop: '10px', borderRadius: '4px', border: '1px solid #ccc', heigth: '200px' }}
                  ></textarea>
                  
                  <br />
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
                <button onClick={MostrarAgregar} style={{ padding: '0px 0px', background: 'white', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>❌</button>
              </div>
                <div>------</div>
              </>
            )}

            {salidaObjeto &&(
              <>
                <div style={{ textAlign: 'center',  paddingLeft: '20px' }} data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
                <form onSubmit={handleAgregarSalida} 
                  style={{
                    maxWidth: '400px', 
                    margin: '0 auto', 
                    backgroundColor: '#f5f5f5', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', 
                    maxHeight: 'calc(100vh - 40px)', 
                    overflow: 'auto' 
                  }}
                > 
                  <h2 style={{ color: '#333', marginBottom: '20px' }}> -Agregar Salida- </h2>
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>  Activo: #️⃣ - {activo}</label>
                  <br />
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Ubicacion: 📍 - {tokenN('ubicacion')}</label>
                  <br />
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Fecha: </label><br />
                  <input type="date" id="fecha" name="fecha" onChange={(e) => setFecha(e.target.value)}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      width: '95%'
                    }}
                  />
                  <br />
                  <label htmlFor="time" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Hora:  </label><br />
                  <input type="time" id="time" name="time" onChange={(e) => setHora(e.target.value)}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      width: '95%'
                    }}
                  />
                  <br />
                  <textarea placeholder='Detalles Especificos De La Salida' name="descripcion" value={descripcionEntrada}
                    onChange={(e)=>setDescripcionEntrada(e.target.value)}
                    required
                    style={{ 
                      width: '95%', 
                      padding: '8px', 
                      marginTop: '10px', 
                      borderRadius: '4px', 
                      border: '1px solid #ccc', 
                      heigth: '200px' 
                    }}
                  ></textarea>
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
                    required
                  />
                </form>
                <button onClick={MostrarAgregar} style={{ padding: '0px 0px', background: 'white', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>❌</button>
              </div>
                <div>------</div>
              </>
     
            )}
          
            {!mostrarObjeto ? (
              <>
                  <form onSubmit={handleAgregarObjeto} style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', maxHeight: 'calc(100vh - 40px)', overflow: 'auto' }}>
                    <h2 style={{ marginBottom: '20px', color: '#333', width: '100%', textAlign: 'center' }}
>Agregar Objeto</h2>
                    <div className="">
                      <label style={{ color: '#555' }}>Serial:</label>
                      <input
                        placeholder='exam: ABCDEFG123'
                        type="text"
                        name="serial"
                        value={objetoData.serial}
                        onChange={handleInputChange}
                        required
                        style={{ width: '95%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                    <div className="">
                      <label style={{ color: '#555' }}>Modelo:</label>
                      <input
                        placeholder='exam: HP 270 G4'
                        type="text"
                        name="modelo"
                        value={objetoData.modelo}
                        onChange={handleInputChange}
                        required
                        style={{ width: '95%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ color: '#555' }}>Activo:</label>
                      <input
                        placeholder='exam: 12345678'
                        type="text"
                        name="activo"
                        value={objetoData.activo}
                        onChange={handleInputChange}
                        required
                        style={{ width: '95%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ color: '#555' }}>Descripción:</label>
                      <textarea
                        placeholder='Detalles Especificos Como Estado fisico del activo'
                        name="descripcion"
                        value={objetoData.descripcion}
                        onChange={handleInputChange}
                        required
                        style={{ width: '95%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      ></textarea>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button type="submit" style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>Agregar</button>
                      <button onClick={MostrarAgregar} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>Cancelar</button>
                    </div>
                  </form>
                </>
            ) : (
              <>
                <div style={{display: 'flex', flexDirection: 'column' }}>
                  <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <button onClick={MostrarObtener} style={{
                        padding: '8px 16px',
                        margin: '10px',
                        backgroundColor: 'white',
                        color: 'black',
                        border: 'none',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }}>  Agregar Objeto </button>
                    <input placeholder='Buscar por # Activo' type="text" value={buscar}
                      onChange={(e) => {
                        setBuscar(e.target.value)
                        buscarObjeto(e.target.value)
                      }}
                        required
                        style={{
                          heigth: '10px', 
                          padding: '5px 15px', 
                          marginBottom: '10px', 
                          borderRadius: '50px', 
                          border: 'none', 
                          textAlign: 'center' 
                        }}
                      />
                     <input placeholder='Buscar por Serial' type="text"
                      onChange={(e) => {
                        buscarObjetos(e.target.value)
                      }}
                        required
                        style={{
                          heigth: '10px', 
                          padding: '5px 15px', 
                          marginBottom: '10px', 
                          borderRadius: '50px', 
                          border: 'none', 
                          textAlign: 'center' 
                        }}
                      />
                    <button onClick={()=>{tablaObjetos('')}} style={{ background: 'none', color: 'black', border: 'none', borderRadius: '50px',margin: '10px'}}>
               ䷀
            </button>
                  </div>
                  <div >
                    <table style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
                      <thead>
                        <tr>
                          <th style={{ backgroundColor: ' #a8d5e5', color: '#fff', borderBottom: '1px solid #ccc', padding: '8px' }}>
                            Activo
                          </th>
                          <th style={{ backgroundColor: ' #a8d5e5', color: '#fff', borderBottom: '1px solid #ccc', padding: '8px' }}>
                            Modelo
                          </th>
                          <th style={{ backgroundColor: ' #a8d5e5', color: '#fff', borderBottom: '1px solid #ccc', padding: '8px' }}>
                            Serial
                          </th>
                          <th style={{ backgroundColor: ' #a8d5e5', color: '#fff', borderBottom: '1px solid #ccc', padding: '8px' }}>
                            ➡
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {registrosPaginaActual.map((objeto, index) => (
                          <tr key={index}>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{objeto.activo}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{objeto.modelo}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{objeto.serial}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                              <button
                                onClick={() => MostrarIngresar(objeto)}
                                className="btn btn-danger"
                                style={{ backgroundColor: '#f5f5f5', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px' }}
                              >
                                📥
                              </button>
                              <button 
                                onClick={() => MostrarSalida(objeto)}
                                
                                style={{ backgroundColor: '#f5f5f5', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px',marginLeft: '5px' }}
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
                        className='entradaPersona-Paginas'
                      >
                        ⬅
                      </button>
                      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin:'5px' }}>{paginaActual}</span>
                      <button
                        onClick={() => setPaginaActual(paginaActual + 1)}
                        disabled={indiceFin >= objetos.length}
                        className='entradaPersona-Paginas'
                      >
                        ➡
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            
          </div>
      </div>}
       
    </div>
   </>
  )
}
