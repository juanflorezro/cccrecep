import React, { useEffect, useState } from 'react'
import AOS from 'aos'

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
    
  }
  useEffect(()=>{
    tablaObjetos('')
    AOS.init()
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
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/objetos/lista',{filtroUnico},{
      headers: {
        authorization: token
      },
      onUploadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 1) / progressEvent.total);
          setProgress(percentCompleted);
      }
    })
    .then(doc => {
      const obj = doc.data
      setObjetos(obj)
      setLoading(false)
      setProgress(0)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
      setProgress(0)
      Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
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
    Swal.fire({
      title: '¿Quieres Editar este Activo?',
      text: "Si ya valido que la informacion es correcta Oprimir 'Editar'",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar'
    })
    .then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/objetos/editar',{objetoId,objetoData},{
          headers: {
          authorization: token
          }
        })
        .then(doc => {
          setObjetos([])
          tablaObjetos('')
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
          setLoading(false)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!'
          })
        })
      }
    })
  }
  const handleEliminarObjeto = (objeto) => {
    const token = tokenN('token')
    Swal.fire({
      title: '¿Quieres Elimanar este Objeto?',
      text: "🚧🚧🚧 NOTA IMPORTANTE: 🚧🚧🚧 \nSi eliminas este Objeto se eliminaran todas sus Entradas y Salidas realizadas. \nSugerencia ❓: Descargue el historial antes de eliminar'",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    })
    .then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/objetos/eliminar',{objeto},{
          headers: {
          authorization: token
          }
        })
        .then(doc => {
          console.log(doc.data)
          setObjetos([])
          tablaObjetos()
          setLoading(false)
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
  const buscarObjetos = (object) => {
     setLoading(true)
    const token = tokenN('token')
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/objetos/listaN',{object},{
      headers: {
        authorization: token
      }
    })
    .then(doc => {
      setLoading(false)
      console.log(doc.data)
      const obj = doc.data
      setObjetos(obj)
      console.log(objetos)
      //setLoading(false)
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
      Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
    })
    
  }
  return(
    <>
      <div className = 'busqueda'>
        <div className = 'ccheckboxs'>
          <div className='checkboxs'><input style={{padding: '7px', borderRadius: '50px', textAlign: 'center', border: 'none' }} type="text" placeholder='Buscar por N° de Activo' onChange={(e) => handleBuscar(e.target.value)}/></div>
          <div className='checkboxs'><input style={{padding: '7px', borderRadius: '50px', textAlign: 'center', border: 'none' }} type="text" placeholder='Buscar por serial' onChange={(e) => buscarObjetos(e.target.value)}/></div>
         
          <div className='checkboxs'>
            <button onClick={()=>{tablaObjetos('')}} style={{ background: 'none', color: 'black', border: 'none', borderRadius: '50px', padding: '7px 20px',marginLeft: '5px' }}>
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
                      <label style={{ color: '#555' }} >Activo: <label style={{ color: 'red' }}>{objetoId.activo}</label></label>
                      
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
      {!editar && <div className='contenerdorobjetos'  style={{ overflowX: 'auto', maxHeight: '400px', padding: '20px'}} >
        {objetos.map((objeto) => (
          <div className='tarejta' key = {objeto._id} >
            <label className='t_nombre' style={{marginRight: '20px', marginTop: '5px', fontSize: '38px'}}>{objeto.activo}</label>
            <label className='t_cc' style={{marginRight: '20px', marginTop: '5px'}}>{objeto.modelo}</label>
            <label className='t_tipo' style={{marginRight: '20px', marginTop: '5px'}}>{objeto.serial}</label>
            <div className='t_botones'>
              <button onClick={() => Swal.fire('Mas Detalles \n\n'+'Activo: '+objeto.activo+'\nModelo: '+objeto.modelo+'\nSerial (S/N): '+objeto.serial+'\nDescripcion: '+objeto.descripcion)} >📄</button>
              <button onClick={()=>{editarObjeto(objeto)}}>✏️</button>
              <button onClick={()=>{handleEliminarObjeto(objeto)}}>✂</button>
            </div>
            
          </div>
        ))}
      </div>}
    </>
  )
}
