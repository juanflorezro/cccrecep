import React, { useEffect, useState } from 'react'
import Home from '../../Home'
export default function EntradaObjeto(){
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<Variables>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
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
  //variables para agregar un objeto
  const [objetoData, setObjetoData] = useState({
    serial: '',
    modelo: '',
    activo: '',
    descripcion: '',
    recepcionista: tokenN('cedula')
  })
  //variables para guardar el onjeto
  const [objetos, setObjetos] = useState([])
  //variables para mostrar los formularios 
  const [mostrarObjeto, setMostrarObjeto] = useState(true)
  const [ingresarObjeto, setIngresarObjeto] = useState(false)
  const [salidaObjeto, setSalidaObjeto] = useState(false)
  //variables para agregar una entrada y salida
  const [objeto,setObjeto] = useState(null)
  const [activo,setActivo] = useState('')
  const [ubicacion, setUbicacion] = useState('Ronda')
  const [fecha, setFecha] = useState(null)
  const [hora,setHora] = useState('')
  const [tipo, setTipo] = useState('')
  const [tipoObjeto, setTipoObjeto] = useState('Objeto')
  //variables para mostrar los objetos por en la tabla por paginas 
  const [paginaActual, setPaginaActual] = useState(1)
  const registrosPorPagina = 8
  const indiceInicio = (paginaActual - 1) * registrosPorPagina
  const indiceFin = indiceInicio + registrosPorPagina
  const registrosPaginaActual = objetos.slice(indiceInicio, indiceFin)
  const [buscar, setBuscar] = useState(null)
  const handleBuscar = () => {
    if(buscar){
      const entrada = {
        recepcionista: '1234567890',
        activo: buscar
      }
      tablaObjetos(entrada)
    }else{
      const entrada = ''
      tablaObjetos(entrada)
    }
    
    console.log(buscar)
    
  }
  const [loading, setLoading] = useState(true)
  const filtroUnicot = {
    recepcionista: '1234567890'
  }
  useEffect(()=>{
    tablaObjetos('')
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
  const tablaObjetos = (filtroUnico) => {
    
    
    const token = tokenN('token')
    axios.post('https://express.juanflow04flore.repl.co/objetos/lista',{filtroUnico},{
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
    })
  }
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<agregar objeto>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setObjetoData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleAgregarObjeto = (e) => {
    e.preventDefault()
    const token = tokenN('token')
    console.log(token)
    var resultado = window.confirm('¿Quieres guardar este Activo? ->> '+objetoData.activo)
    if (resultado === true) {
      axios.post('https://express.juanflow04flore.repl.co/objetos/agregar',{objetoData},{
        headers: {
        authorization: token
        }
      })
      .then(doc => {
        alert('Activo guardado Correctamente \n <<<<<<<  ' + doc.data.activo + '>>>>>>>>>')
        console.log(doc.data)
        tablaObjetos()
        setMostrarObjeto(true)
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
    
  }
  const MostrarSalida = (objeto) => {
    setIngresarObjeto(false)
    setSalidaObjeto(true)
    setActivo(objeto.activo)
  }
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<agregar entrada>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleAgregarEntrada = (e) => {
    e.preventDefault()

    console.log(objeto)
   
    const token = tokenN('token')
    axios.post('https://express.juanflow04flore.repl.co/entradas/agregarEntradaObjeto',{
          objeto: {
            recepcionista: tokenN('cedula'),
            objeto: objeto,
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
    /*consultar(objeto)
    .then( doc => {
      console.log('entrando')
      console.log(doc)
      doc.sort(compararHoraFecha)
      console.log(doc)
      console.log(doc[doc.length-1].tipo)
      limitarEntradas(doc)
   
       console.log(doc)
      console.log(doc[doc.length-1])
      if(doc[doc.length-1].tipo === 'Entrada'){
        console.log('la ultima fue una Entrada ')
        alert('Este activo ya se encuentra dentro de la sede')
      }else{
        const token = tokenN('token')
        console.log(token)
        var resultado = window.confirm('¿Quieres Ingresar este activo?');
        if (resultado == true) {
          axios.post('https://express.juanflow04flore.repl.co/entradas/agregarEntradaObjeto',{
          objeto: {
            recepcionista: '1234567890',
            objeto: objeto,
            fecha: fecha,
            hora: hora,
            ubicacion: ubicacion,
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
          setIngresarObjeto(false)
        } else { 
          window.alert('Accion Cancelada');
        }
      }
      
    })
    .catch( err => {
      console.log(err)
    })*/

    
    
    
    //const date = new Date(fe)
    //const dia = date.getDate() + 1
    //const mes = date.getMonth() + 1 // El valor del mes es base 0, por lo que se agrega 1
    //const anio = date.getFullYear()
    //alert(dia)
    //alert(mes)
    //alert(anio)
  }
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<agregar salida>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleAgregarSalida = (e) => {
    e.preventDefault()
    
    console.log(activo)
    const token = tokenN('token')
    console.log(token)
    var resultado = window.confirm('¿Quieres hacer esta Salida?')
    if (resultado === true) {
      axios.post('https://express.juanflow04flore.repl.co/entradas/agregarEntradaObjeto',{
        objeto: {
          recepcionista: tokenN('cedula'),
          objeto: objeto,
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
        alert('Salida correcta  '+ doc.data.objeto)
      })
      .catch(err => {
        console.log(err)
      })
        setIngresarObjeto(false)
    }else { 
      window.alert('Accion Cancelada')
    }

    //const date = new Date(fe)
    //const dia = date.getDate() + 1
    //const mes = date.getMonth() + 1 // El valor del mes es base 0, por lo que se agrega 1
    //const anio = date.getFullYear()
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
    axios.post('https://express.juanflow04flore.repl.co/objetos/lista',{filtroUnico},{
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
    })
    
    
    console.log(buscar)
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
            <span class="texto-cargando">Cargando...</span>
          </div>
        </div>  
      </div>}
      {!loading && <div style={{width:'100%'}}>
        <h1  style={{ width:'100%', marginBottom: '10px'}}>Entrada Objeto</h1>   
        <div className ='agregar_objeto'>
            
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
                      Agregar Objeto
                    </button>
                    <input
                        placeholder='Buscar por # Activo'
                        type="text"
                        value={buscar}
                        onChange={(e) => {
                            setBuscar(e.target.value)
                            buscarObjeto(e.target.value)
                          }
                        }
                        required
                        style={{heigth: '10px', padding: '5px 15px', marginBottom: '10px', borderRadius: '50px', border: 'none', textAlign: 'center' }}
                      />
                    <button onClick={()=>{tablaObjetos('')}} style={{ background: 'none', color: 'black', border: 'none', borderRadius: '50px', padding: '7px 20px',marginLeft: '5px' }}>
               ䷀
            </button>
                  </div>
                  <div>
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
                            Descripción
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
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{objeto.descripcion}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                              <button
                                onClick={() => MostrarIngresar(objeto)}
                                className="btn btn-danger"
                                style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px' }}
                              >
                                📥
                              </button>
                              <button 
                                onClick={() => MostrarSalida(objeto)}
                                
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
                        Anterior
                      </button>
                      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{paginaActual}</span>
                      <button
                        onClick={() => setPaginaActual(paginaActual + 1)}
                        disabled={indiceFin >= objetos.length}
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
                        Siguiente
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {ingresarObjeto && (
              <>
                <div style={{ textAlign: 'center',  paddingLeft: '20px' }}>
                <form onSubmit={handleAgregarEntrada} style={{maxWidth: '400px', margin: '0 auto', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', maxHeight: 'calc(100vh - 40px)', overflow: 'auto' }}> 
                  <h2 style={{ color: '#333', marginBottom: '20px' }}> Agregar Entrada </h2>
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>  Activo: #️⃣ - </label>
                  <br />
                  <input
                    type="text"
                    id="seriall"
                    name="seriall"
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

            {salidaObjeto &&(
              <>
                
                <div style={{ textAlign: 'center',  paddingLeft: '20px' }}>
                  
                <form onSubmit={handleAgregarSalida} style={{maxWidth: '400px', margin: '0 auto', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', maxHeight: 'calc(100vh - 40px)', overflow: 'auto' }}> 
                  <h2 style={{ color: '#333', marginBottom: '20px' }}> -Agregar Salida- </h2>
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>  Activo: #️⃣ - </label>
                  <br />
                  <input
                    type="text"
                    id="seriall"
                    name="seriall"
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