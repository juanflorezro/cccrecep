import React, { useEffect, useState } from 'react'


export default function Activos(){
  const [objetos, setObjetos] = useState([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [editar, setEditar] = useState(false)
  const [objetoData, setObjetoData] = useState({
    serial: '',
    modelo: '',
    descripcion: '',
  })
  const [objetoId, setObjetoId] = useState({
    activo: ''
  })
  const [buscar, setBuscar] = useState(null)
  const handleBuscar = (buscare) => {
    if(buscare){
      const entrada = {
        activo: buscare
      }
      tablaObjetos(entrada)
    }else{
      const entrada = ''
      tablaObjetos(entrada)
    }
    
    console.log(buscar)
    
  }
  useEffect(()=>{
    tablaObjetos('')
  },[])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setObjetoData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleActivo = (objeto) => {
    setObjetoId({activo: objeto.activo})
  }
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
  const tablaObjetos = (filtroUnico) => {
    setLoading(true)
    const token = tokenN('token')
    axios.post('https://express.juanflow04flore.repl.co/objetos/lista',{filtroUnico},{
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
      const obj = doc.data
      setObjetos(obj)
      setLoading(false)
      setProgress(0)
      console.log(objetos)
    })
    .catch(err => {
      console.log(err)
      setProgress(0)
    })
  }
  const editarObjeto = (objeto) => {
    setEditar(true)
    const activoData={
      serial: objeto.serial,
      modelo: objeto.modelo,
      descripcion: objeto.descripcion
    }
    setObjetoData(activoData)
    setObjetoId({activo: objeto.activo})
  }
  const handleEditarObjeto = (e) => {
    e.preventDefault()
    
    const token = tokenN('token')
    var resultado = window.confirm('¿Quieres Editar este Activo? ->> '+objetoId.activo)
    if (resultado === true) {
      axios.post('https://express.juanflow04flore.repl.co/objetos/editar',{objetoId,objetoData},{
        headers: {
        authorization: token
        }
      })
      .then(doc => {
        alert('Activo guardado Correctamente \n <<<<<<<  ' + '>>>>>>>>>')
        console.log(doc.data)
        setObjetos([])
        tablaObjetos('')
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
  const handleEliminarObjeto = (objeto) => {
    const objetoIdo = {
      activo: objeto.activo
    }
    const token = tokenN('token')
    var resultado = window.confirm('¿Quieres Elimanar este Objeto? ->> ' + objeto.activo +'\n🚧🚧🚧 NOTA IMPORTANTE: 🚧🚧🚧 \n Si eliminas este Objeto se eliminaran todas sus Entradas y Salidas realizadas. \nSugerencia ❓: Descargue el historial antes de eliminar')
    if (resultado === true) {
      console.log('entrando')
      axios.post('https://express.juanflow04flore.repl.co/objetos/eliminar',{objetoIdo},{
        headers: {
        authorization: token
        }
      })
      .then(doc => {
        alert('Activo guardado Correctamente \n <<<<<<<  ' + '>>>>>>>>>')
        console.log(doc.data)
        setObjetos([])
        tablaObjetos()
      })
      .catch(err => {
        console.log(err)
      })
      }
    else { 
        window.alert('Accion Cancelada')
      }
    
  }
  return(
    <>
      <div className = 'busqueda'>
        <div className = 'ccheckboxs'>
          <div className='checkboxs'><input style={{padding: '7px', borderRadius: '50px', textAlign: 'center' }} type="text" placeholder='Buscar por N° de Activo' onChange={(e) => handleBuscar(e.target.value)}/></div>
          <div className='checkboxs'>
            <button onClick={()=>{tablaObjetos('')}} style={{ background: 'none', color: 'black', border: 'none', borderRadius: '50px', padding: '7px 20px',marginLeft: '5px' }}>
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
            </>: <></>}
            </span>
          </div>
        </div>  
      </div>}
      {editar && <div>
           <>
                  <form onSubmit={handleEditarObjeto} style={{display: loading ? 'none' : 'block', maxWidth: '400px', margin: '0 auto', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', maxHeight: 'calc(100vh - 40px)', overflow: 'auto', marginTop: '20px' }}>
                    <h2 style={{ marginBottom: '20px', color: '#333', width: '100%', textAlign: 'center' }}
>Editar Objeto</h2>
                    <div className="form-group">
                      <label style={{ color: '#555' }} >Activo: {objetoId.activo}</label>
                      
                    </div>
                    <div className="">
                      <label style={{ color: '#555' }}>Serial:</label>
                      <input
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
                        type="text"
                        name="modelo"
                        value={objetoData.modelo}
                        onChange={handleInputChange}
                        required
                        style={{ width: '95%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label style={{ color: '#555' }}>Descripción:</label>
                      <textarea
                        name="descripcion"
                        value={objetoData.descripcion}
                        onChange={handleInputChange}
                        required
                        style={{ width: '95%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                      ></textarea>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button type="submit" style={{ marginRight: '10px', padding: '8px 22px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>Editar</button>
                      <button onClick={()=>{setEditar(false)}} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>Cancelar</button>
                    </div>
                  </form>
                </>    
      </div>}
      {!editar && <div className='contenerdorobjetos'>
        {objetos.map((objeto, index) => (
          <div className='tarejta'>
            <label className='t_nombre' style={{marginRight: '20px', marginTop: '5px', fontSize: '38px'}}>{objeto.activo}</label>
            <label className='t_cc' style={{marginRight: '20px', marginTop: '5px'}}>{objeto.modelo}</label>
            <label className='t_tipo' style={{marginRight: '20px', marginTop: '5px'}}>{objeto.serial}</label>
            <div className='t_botones'>
              <button onClick={() => alert('\n<<<<<<<<<<<<< Mas Detalles >>>>>>>>>>>>>>\n\n'+'Activo: '+objeto.activo+'\nModelo: '+objeto.modelo+'\nSerial (S/N): '+objeto.serial+'\nDescripcion: '+objeto.descripcion)} >📄</button>
              <button onClick={()=>{editarObjeto(objeto)}}>✍</button>
              <button onClick={()=>{handleEliminarObjeto(objeto)}}>✂</button>
            </div>
            
          </div>
        ))}
      </div>}
    </>
  )
}
