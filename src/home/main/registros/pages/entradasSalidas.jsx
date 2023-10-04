import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx/xlsx.mjs'
import ExcelJS from 'exceljs'
import AOS from 'aos'
export default function EntradasSalidas(){
  const [entradasSalidas, setEntradasSalidas] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [tipo, setTipo] = useState('')
  const [objetos, setObjetos] = useState([])
  const [proyectos, setProyectos] = useState([])
  const [visitas, setVisitas] = useState([])
  const [contratistas, setContratistas] = useState([]) 
  const [tipo_v, setTipo_v] = useState('')
  const [des_v, setDes_v] = useState('')
  const [fecha, setFecha] = useState({
    dia: '',
    mes: '',
    año: ''
  })
  const [usuarioId, setUsuarioId] = useState({
    cedula: ''
  })
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target
    setActiveField(checked ? name : null)
    setFecha({
      dia: '',
      mes: '',
      año: ''
    })
  }
  const descargarObjetos = async (objetos) => {
    let newObjetoExport = []
    for(let x = 0;  x < objetos.length ; x++){
      let newObjetos= {
        _id: objetos[x]._id,
        recepcionista: objetos[x].recepcionista,
        objeto_activo: objetos[x].objeto.activo,
        objeto_descripcion: objetos[x].objeto.descripcion,
        objeto_modelo: objetos[x].objeto.modelo,
        objeto_serial: objetos[x].objeto.serial,
        fecha: objetos[x].fecha,
        hora: objetos[x].hora,
        ubicacion: objetos[x].ubicacion,
        tipo: objetos[x].tipo,
        descripcion: objetos[x].descripcion,
      }
      newObjetoExport.push(newObjetos)
    }

     const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Entrada Y Salida De Objetos')

    // Agregar encabezados
    const headers = ['_idEntradas', 'recepcionista', 'Numero De Activo', 'Descripción Caracteristicas', 'Modelo', 'Serial', 'Fecha', 'Hora', 'Ubicacion', 'Tipo', 'Descripción Física']
    worksheet.addRow(headers)

    // Agregar datos
    newObjetoExport.forEach(item => {
      worksheet.addRow(Object.values(item))
    })
    worksheet.columns.forEach(column => {
      column.width = 18 // Ancho de columna personalizado en unidades de caracteres
    })
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      })
    })
    // Aplicar estilos y colores (por ejemplo, celdas coloreadas)
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) {
        row.eachCell((cell, colNumber) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'a8d5e5' }, // Color amarillo para el encabezado
          }
        })
      } else {
        row.eachCell((cell, colNumber) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFF' }, // Color blanco para las celdas de datos
          };
        });
      }
    });

    // Generar el archivo Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '/');

    const fileName = `Entrada y Salidas De Objetos - (fecha descarga- ${formattedDate} hora- ${formattedTime}).xlsx`;
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }
  const descargarPersonas = async (personas) => {
    let newPersonasExport = []
    for(let x = 0 ; x < personas.length ; x++){
      let newPersonas = {
        _idEntrada: entradasSalidas[x]._id,
        v_usuario_nombre: entradasSalidas[x].objeto.usuario.nombre,
        v_usuario_apellido: entradasSalidas[x].objeto.usuario.apellido,
        v_usuario_tcedula: entradasSalidas[x].objeto.usuario.tcedula,
        v_usuario_cedula: parseInt(entradasSalidas[x].objeto.usuario.cedula),
        v_usuario_telefono: parseInt(entradasSalidas[x].objeto.usuario.telefono),
        v_empresa: entradasSalidas[x].objeto.empresa,
        v_tipo: entradasSalidas[x].tipo_v,
        d_tipo: entradasSalidas[x].descripcion,
        recepcionista: parseInt(entradasSalidas[x].recepcionista),
        tipo: entradasSalidas[x].tipo,
        fecha: entradasSalidas[x].fecha,
        hora: entradasSalidas[x].hora,
        ubicacion: entradasSalidas[x].ubicacion
      }
      newPersonasExport.push(newPersonas)
    }
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Entrada Y Salida De Personas')
    const headers = ['_idEntradas', 'Nombre', 'Apellido', 'Documenuto', 'Cedula', 'Telefono', 'Empresa', 'Tipo de E/S','Descripción', 'Recepcionista', 'Tipo', 'Fecha','Hora', 'ubicación']
    worksheet.addRow(headers)
    newPersonasExport.forEach(item => {
      worksheet.addRow(Object.values(item))
    })
    worksheet.columns.forEach(column => {
      column.width = 22 // Ancho de columna personalizado en unidades de caracteres
    })
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      })
    })
    // Aplicar estilos y colores (por ejemplo, celdas coloreadas)
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) {
        row.eachCell((cell, colNumber) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'a8d5e5' }, // Color amarillo para el encabezado
          }
          cell.value = cell.value.toString().toUpperCase()
          cell.alignment = { horizontal: 'center', vertical: 'middle' }
        })
      } else {
        row.eachCell((cell, colNumber) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFF' }, // Color blanco para las celdas de datos
          };
        });
      }
    });
    // Generar el archivo Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '/');
    const fileName = `Entrada y Salidas De Personas - (fecha descarga- ${formattedDate} hora- ${formattedTime}).xlsx`;
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }
  const compararHoraFecha = (a, b) => {
      // Primero, compara las horas
     
      // Si las horas son iguales, compara las fechas
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      if (fechaA < fechaB) {
        return 1; // Cambia -1 a 1 para invertir el orden
      }
      if (fechaA > fechaB) {
        return -1; // Cambia 1 a -1 para invertir el orden
      }
      
      const horaA = new Date(`2023-01-01 ${a.hora}`);
      const horaB = new Date(`2023-01-01 ${b.hora}`);
      if (horaA < horaB) {
        return 1; // Cambia -1 a 1 para invertir el orden
      }
      if (horaA > horaB) {
        return -1; // Cambia 1 a -1 para invertir el orden
      }
      return 0; // Si las horas y fechas son iguales
  }
  const [ccid, setCcid] = useState(null)
  const [editar, setEditar] = useState(false)
  const [editarObjeto, setEditarObjeto] = useState(false)
  const [personaEditar, setPersonaEditar]= useState(null)
  const [objetoEditar, setObjetoEditar] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    tablaObjetos(tokenN('ubicacion'))
    setCcid(tokenN('cedula'))
    tablaES()
    listarProyectos()
    listarVisitas()
    listarContratistas()
    AOS.init()
  },[])
  const listarProyectos = () => {
    const token = tokenN('token')
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/arrys/obtenerProyectos',{},
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
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/arrys/obtenerVisita',{},
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
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/arrys/obtenerContratista',{},
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
  const handleEditarPersona = (campo, valor) => {
    // Copia el objeto personaEditar y actualiza el campo específico
    const personaEditada = { ...personaEditar, [campo]: valor }
    setPersonaEditar(personaEditada)
  }
  const handleEditar = (e) => {
    e.preventDefault()
    console.log(personaEditar)
    const token = tokenN('token')
    setLoading(true)
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/entradas/editarEntradaSalidaPersona',{personaEditar},{ headers: { authorization: token } })
    .then(doc => {
      Swal.fire('¡Editado!',doc.data.tipo+' Editada Correctamente','success')
      buscar() 
      setEditar(false)
      setLoading(false)
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
      Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
    })
  }
  const handleEditarObjeto = (campo, valor) => {
    const objetoEditada = { ...objetoEditar, [campo]: valor }
    setObjetoEditar(objetoEditada)
  }
  const handleEditarO = (e) => {
    e.preventDefault()
    console.log(objetoEditar)
    const token = tokenN('token')
    setLoading(true)
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/entradas/editarEntradaSalidaObjeto',{objetoEditar},{ headers: { authorization: token } })
    .then(doc => {
      Swal.fire('¡Editado!',doc.data.tipo+' Editada Correctamente','success')
      buscar()
      setEditarObjeto(false)
      setLoading(false)
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
      Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
    })
  }
  const eliminarEntradaPersona = (EntradaEliminar) => {
    const token = tokenN('token')  
    Swal.fire({
      title: '¿Quieres Eliminar Esta '+EntradaEliminar.tipo+'?',
      text: "¡Cuidado No Se Recuperaran Los Cambios Una Ves Realizados",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/entradas/eliminarEntradaSalida',{EntradaEliminar},{ headers: { authorization: token } })
        .then(doc => {
          Swal.fire('¡Eliminada!',doc.data.tipo+' Eliminada Correctamente','success')
          buscar()
          
        })
        .catch(err => {
          console.log(err)
          Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
        })
      }
    })
    
  }
  const eliminarEntradaObjeto = (EntradaEliminar) => {
    const token = tokenN('token')  
    Swal.fire({
      title: '¿Quieres Eliminar Esta '+EntradaEliminar.tipo+'?',
      text: "¡Cuidado No Se Recuperaran Los Cambios Una Ves Realizados",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        //setLoading(true)
        axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/entradas/eliminarEntradaSalidaObjeto',{EntradaEliminar},{ headers: { authorization: token } })
        .then(doc => {
          Swal.fire('¡Eliminada!',doc.data.tipo+' Eliminada Correctamente','success')
          buscar()
          //setLoading(false)
        })
        .catch(err => {
          //setLoading(false)
          console.log(err)
          Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
        })
      }
    })
    
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
  const tablaObjetos = (ubicacion) => {
     setLoading(true)
    const token = tokenN('token')
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/entradas/obtenerEntradaSalidaObjeto',{ubicacion},{
      headers: {
        authorization: token
      }
    })
    .then(doc => {
      const obj = doc.data.sort(compararHoraFecha)
      setObjetos(obj)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
      Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
    })
  }
  const tablaES = () => {
    const token = tokenN('token')
    const ubicacion = tokenN('ubicacion')
    setLoading(true)
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/entradas/obtenerEntradaSalidaPersona',{ubicacion},{
      headers: {
        authorization: token
      }
    })
    .then(doc => {
      const es = doc.data.sort(compararHoraFecha)
      setEntradasSalidas(es)
      setLoading(false)
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
      Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
    })
  }
  const handleFechaChange = (field, value) => {
  setFecha(prevFecha => ({
    ...prevFecha,
    [field]: value
  }));
}
  const buscar = () => {
    console.log(fecha)
    console.log(usuarioId)
    const token = tokenN('token')
    if(fecha.dia === '' && fecha.mes === '' && fecha.año === '' && usuarioId.cedula === ''){
      tablaES()
      tablaObjetos(tokenN('ubicacion'))
    }else{
      if(tipo === 'Persona'){
        const ubicacion = tokenN('ubicacion')
        setLoading(true)
        axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/entradas/obtenerEntradaSalidaPersonaUnica',{usuarioId,fecha,ubicacion},{
          headers: {
            authorization: token
          }
        })
        .then(doc => {
          setLoading(false)
            console.log(doc.data)
            const es = doc.data.sort(compararHoraFecha)
            setEntradasSalidas(es)
            console.log(es)  
        })
        .catch(err => {
          setLoading(false)
            console.log(err)
            Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
          })
      }
      else{
      if(tipo === 'Activo'){
        let objetoId = {
          activo: usuarioId.cedula
        }
        const ubicacion = tokenN('ubicacion')
        setLoading(true)
        axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/entradas/obtenerEntradaSalidaObjetoUnico',{objetoId,fecha,ubicacion},{
        headers: {
          authorization: token
        }
      })
        .then(doc => {
          setLoading(false)
            console.log(doc.data)
            const es = doc.data.sort(compararHoraFecha)
            setObjetos(es)
            console.log(es)  
          })
        .catch(err => {
          setLoading(false)
            console.log(err)
            Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
          })
      }
      
    }
    }
    
  }
  return(
    <>
      
      <div className = 'busqueda'>
           <div className = 'ccheckboxs'>
            <div className='checkboxs'>
              <select className="year-select" value={tipo}  onChange={(e) => setTipo(e.target.value)} >
                <option value = '' >Seleccionar</option>
                <option value =  'Persona'>Persona</option>
                <option value = 'Activo'>Activo</option>
              </select>
            </div>
            <div className='checkboxs'>
              <label>
                Año
                <input
                  type="checkbox"
                  name="field1"
                  checked={activeField === 'field1'}
                  onChange={handleCheckboxChange}
                />
                
              </label>
              <label>
                Mes
                <input
                  type="checkbox"
                  name="field2"
                  checked={activeField === 'field2'}
                  onChange={handleCheckboxChange}
                />
                
              </label>
              <label>
                Dia
                <input
                  type="checkbox"
                  name="field3"
                  checked={activeField === 'field3'}
                  onChange={handleCheckboxChange}
                />
                
              </label>
            </div>
            <div className='checkboxs'>
              {activeField === 'field1' && 
                <>
                  <select className="year-select" value={fecha.año}  onChange={(e) => handleFechaChange('año', e.target.value)}>
                  <option value="">Selecciona un Año</option>
                  <option value = '2023'>2023</option>
                  <option value = '2024'>2024</option>
                  <option value = '2025'>2025</option>
                  <option value = '2026'>2026</option>
                </select>
                  
                </>
              }
              {activeField === 'field2' && 
                <>
                  <select className="year-select"  value={fecha.año}  onChange={(e) => handleFechaChange('año', e.target.value)}>
                  <option value="7878978978">Selecciona un Año</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
                <select className="month-select"  value={fecha.mes}  onChange={(e) => handleFechaChange('mes', e.target.value)}>
                  <option value="">Selecciona un mes</option>
                  <option value="01">Enero</option>
                  <option value="02">Febrero</option>
                  <option value="03">Marzo</option>
                  <option value="04">Abril</option>
                  <option value="05">Mayo</option>
                  <option value="06">Junio</option>
                  <option value="07">Julio</option>
                  <option value="08">Agosto</option>
                  <option value="09">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>
                </>
              }
              {activeField === 'field3' && <input className='fechabuscar' type="date" placeholder="Campo 3" onChange={(e)=>{
                const date = new Date(e.target.value)
                let d
                let m
                if(date.getDate()+1 === 32){
                  d = date.getDate() - 30
                  m = date.getMonth() + 2
                  if(d>9 && m>9){
                    const a = date.getFullYear()
                    setFecha({dia: ''+d, mes: ''+m, año: ''+a})                  
                  }else{
                    if(d>9 && m<10){
                      const a = date.getFullYear()
                      setFecha({dia: ''+d, mes: '0'+m, año: ''+a})
                    }else{
                      const a = date.getFullYear()
                      setFecha({dia: '0'+d, mes: '0'+m, año: ''+a})
                    }
                    
                  }
                }
                else{ 
                  d = date.getDate()+1
                   m = date.getMonth() + 1
                  if(d>9 && m>9){
                    const a = date.getFullYear()
                    setFecha({dia: ''+d, mes: ''+m, año: ''+a})                  
                  }else{
                    if(d>9 && m<10){
                      const a = date.getFullYear()
                      setFecha({dia: ''+d, mes: '0'+m, año: ''+a})
                    }else{
                      const a = date.getFullYear()
                      setFecha({dia: '0'+d, mes: '0'+m, año: ''+a})
                    }
                    
                  }
                }
              }}/>}
            </div>
            <div className='checkboxs'>
              <input style={{padding: '7px', borderRadius: '50px', textAlign: 'center' }} type='number' placeholder='###' onChange={(e) => setUsuarioId({cedula: e.target.value})}/>
            </div>
            <div className='checkboxs'>
              <button onClick={()=>buscar()} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '50px', padding: '7px',marginLeft: '5px' }}>
                Buscar 🔍
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
            <span className="texto-cargando">Cargando...</span>
          </div>
        </div>  
      </div>}
      {!loading && <>    
        {tipo === 'Persona' && <div style={{ overflowX: 'auto', maxHeight: '500px' }} data-aos="zoom-in">
          {!editar === true ? 
            <div>
            <div style = {{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
          <button onClick={()=>descargarPersonas(entradasSalidas)} style={{ 
              backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '50px', padding: '7px',marginLeft: '5px' 
            }}>
                Descargar todas las entradas y salidas seleccionadas de Personas
          </button>
        </div>
            <div style = {{
              display: 'flex', flexDirecton: 'row', justifyContent: 'center', marginTop: '10px', background: 'linear-gradient( white,99.975%, #a8d5e5)', borderRadius: '50px' 
            }}>   
                  <div >
            { entradasSalidas.map((entradasalida) => (
                <div key={entradasalida._id}>
                  <div  className = 'ensa' style = {{ textAlign: 'center', background: entradasalida.tipo === 'Entrada' ? '#B5FE57' : '#FFACAC' }}>
                    <div  style = {{  padding: '10px', flex: '1', textAlign: 'left' }}>{entradasalida.tipo}</div>
                    <div className = 'ensa'> 
                      <label style = {{flex: '1', margin: '5px'}}>{entradasalida.objeto.usuario.cedula}</label>
                      <label style = {{flex: '1', margin: '5px'}}> {entradasalida.tipo === 'Entrada' ? entradasalida.tipo_v : '>>>>' }</label>
                      <label style = {{flex: '4', margin: '5px'}}> {entradasalida.fecha} {entradasalida.hora}</label>
                      <button style={{borderRadius: '50px', border: 'none', background: 'none', margin: '2px'}} onClick={() => Swal.fire('>>>>> '+ entradasalida.tipo + ' <<<<<'+'\n\n'+entradasalida.objeto.usuario.nombre+' '+entradasalida.objeto.usuario.apellido+' \n'+entradasalida.objeto.usuario.tcedula+' '+entradasalida.objeto.usuario.cedula+'\n📅'+entradasalida.fecha+' 🕐   '+entradasalida.hora+'\nRECEPCIONISTA: '+ entradasalida.recepcionista+'\nUbicación: '+entradasalida.ubicacion + '\nMotivo: '+entradasalida.tipo_v+'\n'+entradasalida.descripcion)} >📄</button>
                      <div style = {{display: ccid === entradasalida.recepcionista   ? 'block': 'none'}}>
                        <button style={{borderRadius: '50px', border: 'none', background: 'none', margin: '2px'}} onClick={()=>{
                          setEditar(true)
                          setPersonaEditar(entradasalida)
                        }}>✍</button>
                        <button style={{borderRadius: '50px', border: 'none', background: 'none', margin: '2px'}} onClick = {() => eliminarEntradaPersona(entradasalida)}>✂</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))  
            }
          </div>
               
                
        </div>    
          </div> 
          : 
            <div>
            <>
              <div style={{ textAlign: 'center', paddingLeft: '20px', marginTop: '10px' }}>
                <form onSubmit={handleEditar} style={{maxWidth: '400px', margin: '0 auto', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', maxHeight: 'calc(100vh - 40px)', overflow: 'auto'}}> 
                  <h2 style={{ color: '#333', marginTop: '5px' }}> Editar {personaEditar.tipo} </h2>
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>  Cedula: #️⃣ - {personaEditar.objeto.usuario.cedula}</label>
                  
                  <br />
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Ubicacion: 📍 - {personaEditar.ubicacion}</label>
                  
                  <br></br>
                  {personaEditar.tipo === 'Entrada' && <div>
                     <select name="tipo" value={personaEditar.tipo_v}
                    onChange={(e)=>{
                      setDes_v('')
                       handleEditarPersona('tipo_v', e.target.value)}
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
                  {personaEditar.tipo_v === 'Proyecto' && <div>
                    <select name="tipo" value={personaEditar.descripcion} onChange={(e) => handleEditarPersona('descripcion', e.target.value)} required
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
                  {personaEditar.tipo_v === 'Contratista' && <div>
                    <select name="tipo" value={personaEditar.descripcion} onChange={(e) => handleEditarPersona('descripcion', e.target.value)} required
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
                  {personaEditar.tipo_v=== 'Visita' && <div>
                    <select name="tipo" value={personaEditar.descripcion} onChange={(e) => handleEditarPersona('descripcion', e.target.value)}required
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
                  </div>} 
                  
                  
                  
                  
                  <label htmlFor="fecha" style={{ fontSize: '18px', color: '#555' }}>Fecha: </label><br></br>
                  
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value = {personaEditar.fecha}
                    onChange={(e) => handleEditarPersona('fecha', e.target.value)}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      width:'80%',
                      textAlign: 'center'
                    }}
                    
                  />
                  <br />
                  <label htmlFor="time" style={{ fontSize: '18px', color: '#555', borderTop: '0px'}}>Hora:  </label><br></br>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={personaEditar.hora}
                    onChange={(e) => handleEditarPersona('hora', e.target.value)}
                    style={{
                      padding: '8px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      width:'80%',
                      textAlign: 'center'
                    }}
                    
                  />
                  <br /><br />
                  <input type="submit" value="Editar"
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
                <button onClick={() => setEditar(false)} style={{border: 'none', background: 'none', marginLeft: '0px'}} >❌</button>
              </div>
            </>
          </div>
          }
        </div>}
        {tipo === 'Activo' && <div style={{ overflowX: 'auto', maxHeight: '500px' }} data-aos="zoom-in">
          {!editarObjeto === true ? 
            <div>
               <div style = {{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
            <button onClick={()=>descargarObjetos(objetos)} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '50px', padding: '7px',marginLeft: '5px' }}>
                Descargar todas las entradas y salidas seleccionadas de Objetos
          </button>
          </div>
              <div style = {{display: 'flex', flexDirecton: 'row', justifyContent: 'center', marginTop: '10px'}}>    
            <div >
            { objetos.map((objeto) => (
                <div key = {objeto._id}>
                  <div className = 'ensa'  style = {{ textAlign: 'center', background: objeto.tipo  === 'Entrada' ? '#B5FE57' : '#FFACAC', display: 'flex' }}>
                    <div  style = {{  padding: '10px', flex: '1' }}>{objeto.tipo}</div>
                    <div className = 'ensa'> 
                      <label style = {{flex: '1', margin: '5px'}}>{objeto.objeto.activo}</label>
                      <label style = {{flex: '1', margin: '5px'}}> {objeto.objeto.serial}</label>
                      <label style = {{flex: '4', margin: '5px'}}> {objeto.fecha} {objeto.hora}</label>
                      <button style={{borderRadius: '50px', border: 'none', background: 'none', margin: '2px'}} onClick={() => Swal.fire('>>>>> '+ objeto.tipo + ' <<<<<'+'\n\n'+'Activo: '+objeto.objeto.activo+'\nSerial: '+objeto.objeto.serial+'\nModelo: '+objeto.objeto.modelo+'\n📅 '+objeto.fecha+' 🕐   '+objeto.hora+'\nRECEPCIONISTA: '+objeto.recepcionista+'\nUbicación: '+objeto.ubicacion+'\nDescripción: '+objeto.descripcion)}>📄</button>
                      <div style = {{display: objeto.recepcionista === ccid ? 'block': 'none'}}>
                        <button style={{borderRadius: '50px', border: 'none', background: 'none', margin: '2px', filter: 'none'}} onClick = {()=>{
                          setEditarObjeto(true)
                          setObjetoEditar(objeto)
                        }}>✏️</button>
                        <button style={{borderRadius: '50px', border: 'none', background: 'none', margin: '2px'}} onClick = {()=>eliminarEntradaObjeto(objeto)}>✂</button>
                      </div>
                      
                    </div>
                  </div>
                </div>
              ))  
            }
          </div>
          </div>
            </div>
          :
            <div>
                <div style={{ textAlign: 'center',  paddingLeft: '20px', marginTop: '10px'}}>
                <form onSubmit={handleEditarO} style={{maxWidth: '400px', margin: '0 auto', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', maxHeight: 'calc(100vh - 40px)', overflow: 'auto' }}> 
                  <h2 style={{ color: '#333', marginBottom: '20px' }}> Editar {objetoEditar.tipo} </h2>
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>  Activo: #️⃣ - {objetoEditar.objeto.activo}</label>
                  <br />
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Ubicacion: 📍 - {objetoEditar.ubicacion}</label>
                  <br />
                  <label htmlFor="fecha" style={{ fontSize: '18px', marginBottom: '8px', color: '#555' }}>Fecha: </label><br />
                  <input type="date" id="fecha" name="fecha" value = {objetoEditar.fecha} onChange={(e) => handleEditarObjeto('fecha', e.target.value)}
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
                  <input type="time" id="time" name="time" value = {objetoEditar.hora} onChange={(e) => handleEditarObjeto('hora', e.target.value)}
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
                  <textarea
                    placeholder='Detalles Especificos De La Entrada'
                    name="descripcion"
                    value={objetoEditar.descripcion}
                    onChange={(e) => handleEditarObjeto('descripcion', e.target.value)}
                    required
                    style={{ width: '95%', padding: '8px', marginTop: '10px', borderRadius: '4px', border: '1px solid #ccc', heigth: '200px', textAlign: 'center' }}
                  ></textarea><br></br>
                  <input type="submit" value="Editar"
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
                <button onClick={()=>setEditarObjeto(false)} style={{ padding: '0px 0px', background: 'white', border: 'none', borderRadius: '4px'}}>❌</button>
              </div>
              </div>
          }
        </div>}
      </>}
    </>
  )
}
