import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx/xlsx.mjs'
import ExcelJS from 'exceljs'
export default function EntradasSalidas(){
  const [entradasSalidas, setEntradasSalidas] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [tipo, setTipo] = useState(null)
  const [objetos, setObjetos] = useState([])
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
        tobjeto: objetos[x].tobjeto,
        __v: objetos[x].__v,
      }
      newObjetoExport.push(newObjetos)
    }
    
    /*const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ['_id', 'recepcionista', 'objeto_activo', 'objeto_descripcion', 'objeto_modelo', 'objeto_serial', 'fecha', 'hora', 'ubicacion', 'tipo', 'tobjeto', '__v'],
      ...newObjetoExport.map(item => [
        item._id,
        item.recepcionista,
        item.objeto_activo,
        item.objeto_descripcion,
        item.objeto_modelo,
        item.objeto_serial,
        item.fecha,
        item.hora,
        item.ubicacion,
        item.tipo,
        item.tobjeto,
        item.__v,
      ])
    ]);
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    XLSX.writeFile(wb, 'datos.xlsx');*/

     const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Entrada Y Salida De Objetos')

    // Agregar encabezados
    const headers = ['_idEntradas', 'recepcionista', 'objeto_activo', 'objeto_descripcion', 'objeto_modelo', 'objeto_serial', 'fecha', 'hora', 'ubicacion', 'tipo', 'tobjeto', '__v']
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
        v_tipo: entradasSalidas[x].objeto.tipo,
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
    const headers = ['_idEntradas', ' v_usuario_nombre', 'v_usuario_apellido', 'v_usuario_tcedula', 'v_usuario_cedula', 'v_usuario_telefono', 'v_empresa', 'v_tipo', 'recepcionista', 'tipo', 'fecha','hora', 'ubicacion']
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
  useEffect(()=>{
    tablaObjetos('')
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
  const tablaObjetos = (filtroUnico) => {
     //setLoading(true)
    const token = tokenN('token')
    axios.post('https://express.juanflow04flore.repl.co/entradas/obtenerEntradaSalidaObjeto',{filtroUnico},{
      headers: {
        authorization: token
      }
    })
    .then(doc => {
      console.log(doc.data)
      const obj = doc.data.sort(compararHoraFecha)
      setObjetos(obj)
      //setLoading(false)
      console.log(objetos)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const tablaES = () => {
    const token = tokenN('token')
    axios.post('https://express.juanflow04flore.repl.co/entradas/obtenerEntradaSalidaPersona',{},{
      headers: {
        authorization: token
      }
    })
    .then(doc => {
      console.log(doc.data)
      const es = doc.data.sort(compararHoraFecha)
      setEntradasSalidas(es)
      console.log(es)  
    })
    .catch(err => {
      console.log(err)
    })
  }
  const handleFechaChange = (field, value) => {
  setFecha(prevFecha => ({
    ...prevFecha,
    [field]: value
  }));
}
  const buscar = () => {
    console.log(tipo)
    console.log(fecha.año)
    console.log(fecha.mes)
    console.log(fecha.dia)
    console.log(usuarioId.cedula)
    console.log(activeField)
    
    const token = tokenN('token')
    if(tipo === 'Persona'){
      axios.post('https://express.juanflow04flore.repl.co/entradas/obtenerEntradaSalidaPersonaUnica',{usuarioId,fecha},{
        headers: {
          authorization: token
        }
      })
      .then(doc => {
          console.log(doc.data)
          const es = doc.data.sort(compararHoraFecha)
          setEntradasSalidas(es)
          console.log(es)  
        })
      .catch(err => {
          console.log(err)
        })
    }else{
      if(tipo === 'Activo'){
        let objetoId = {
          activo: usuarioId.cedula
        }
        axios.post('https://express.juanflow04flore.repl.co/entradas/obtenerEntradaSalidaObjetoUnico',{objetoId,fecha},{
        headers: {
          authorization: token
        }
      })
        .then(doc => {
            console.log(doc.data)
            const es = doc.data.sort(compararHoraFecha)
            setObjetos(es)
            console.log(es)  
          })
        .catch(err => {
            console.log(err)
          })
      }
      
    }
    
    
  }
  return(
    <>
        <div className = 'busqueda'>
           <div className = 'ccheckboxs'>
            <div className='checkboxs'>
              <select className="year-select" value={tipo}  onChange={(e) => setTipo(e.target.value)} >
                <option value = ''>Seleccionar</option>
                <option value= 'Persona'>Persona</option>
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
                }else{ 
                  d = date.getDate()+1
                   m = date.getMonth() + 1
                }
                
                const a = date.getFullYear()
                setFecha({dia: '0'+d, mes: '0'+m, año: ''+a})
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
        {tipo === 'Persona' && <div>
          <div style = {{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
          <button onClick={()=>descargarPersonas(entradasSalidas)} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '50px', padding: '7px',marginLeft: '5px' }}>
                Descargar todas las entradas y salidas seleccionadas de Personas
          </button>
        </div>
          <div style = {{display: 'flex', flexDirecton: 'row', justifyContent: 'center', marginTop: '10px'}}>    
          <div >
            { entradasSalidas.map((entradasalida, index) => (
                <>
                  <div className = 'ensa' style = {{ textAlign: 'center', background: entradasalida.tipo === 'Entrada' ? '#3EFF00' : '#FF2D2D' }}>
                    <div  style = {{  padding: '10px', flex: '1', textAlign: 'left' }}>{entradasalida.tipo}</div>
                    <div className = 'ensa'> 
                      <label style = {{flex: '1', margin: '5px'}}>{entradasalida.objeto.usuario.cedula}</label>
                      <label style = {{flex: '1', margin: '5px'}}> {entradasalida.objeto.tipo}</label>
                      <label style = {{flex: '4', margin: '5px'}}> {entradasalida.fecha} {entradasalida.hora}</label>
                      <button style={{borderRadius: '50px', border: 'none', background: 'none', margin: '2px'}}>📄</button>
                      <button style={{borderRadius: '50px', border: 'none', background: 'none', margin: '2px'}}>✍</button>
                      <button style={{borderRadius: '50px', border: 'none', background: 'none', margin: '2px'}}>✂</button>
                    </div>
                  </div>
                </>
              ))  
            }
          </div>
        </div>    
          
        </div>}
        {tipo === 'Activo' && <div>
          <div style = {{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
          <button onClick={()=>descargarObjetos(objetos)} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '50px', padding: '7px',marginLeft: '5px' }}>
                Descargar todas las entradas y salidas seleccionadas de Objetos
          </button>
        </div>
          <div style = {{display: 'flex', flexDirecton: 'row', justifyContent: 'center', marginTop: '10px'}}>    
          <div >
            { objetos.map((objeto, index) => (
                <>
                  <div className = 'ensa' style = {{ textAlign: 'center', background: objeto.tipo  === 'Entrada' ? '#3EFF00' : '#FF2D2D', display: 'flex' }}>
                    <div  style = {{  padding: '10px', flex: '1' }}>{objeto.tipo}</div>
                    <div className = 'ensa'> 
                      <label style = {{flex: '1', margin: '5px'}}>{objeto.objeto.activo}</label>
                      <label style = {{flex: '1', margin: '5px'}}> {objeto.objeto.serial}</label>
                      <label style = {{flex: '4', margin: '5px'}}> {objeto.fecha} {objeto.hora}</label>
                      <button style={{borderRadius: '50px', border: 'none', background: 'none', margin: '2px'}}>📄</button>
                      <button style={{borderRadius: '50px', border: 'none', background: 'none', margin: '2px'}}>✍</button>
                      <button style={{borderRadius: '50px', border: 'none', background: 'none', margin: '2px'}}>✂</button>
                    </div>
                  </div>
                </>
              ))  
            }
          </div>
        </div>    
        
        </div>}
        
    </>
  )
}
