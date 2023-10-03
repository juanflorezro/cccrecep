import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AOS from 'aos'
export default function Login({path}){
  //variables
  const [ubicacion, setUbicacion]= useState('')
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [mostrarDiv, setMostrarDiv] = useState(true)
  //iniciaiar todos laas funciones asincronas
  useEffect(()=>{
    token() 
     AOS.init()
    const tiempoDeEspera = 8000; // 5000 milisegundos = 5 segundos

    const temporizador = setTimeout(() => {
      setMostrarDiv(false);
    }, tiempoDeEspera);

    return () => clearTimeout(temporizador);
   
  },[])
  //funciones
  const token = () => {
     const token = tokenN('token')
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/autentication',{},{
      headers: {
        'authorization': token
      }
    })
    .then(doc => {
      console.log('entrando')
      console.log(doc.data)
      if(doc.data){
        console.log('entrando')
        navigate('/')
      }
      
    })
    .catch(doc => {
      console.log(doc)
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
  //funciones para llenar variables
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
    
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }


  //funcion de boton
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(ubicacion)
    let user = {
      user: username,
      password: password
    }
    axios.post('https://cccrecepcionbackend-n4au-dev.fl0.io/login',{
       user: user
    }, {
       headers: {
        'Content-Type': 'application/json'
      },
      onDownloadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
      }
    })
    .then(doc => {
      console.log(doc.data.cedula)
      console.log(doc.data.nombre)
      console.log(doc.data)
      if(doc.data.token){
        document.cookie = `nombre = ${doc.data.nombre}; max-age=${60 * 480}; path=/; samesite=strict`
        document.cookie = `cedula = ${doc.data.cedula}; max-age=${60 * 480}; path=/; samesite=strict`
        document.cookie = `apellido = ${doc.data.apellido}; max-age=${60 * 480}; path=/; samesite=strict`
        document.cookie = `token = ${doc.data.token}; max-age=${60 * 480}; path=/; samesite=strict`
        document.cookie = `ubicacion = ${ubicacion}; max-age=${60 * 480}; path=/; samesite=strict`
        console.log(tokenN('token'))
      }else{
        alert('Usuario o Contraseña Incorrecta')
      }
      setProgress(0)
      token()
      
    })
    .catch(doc => {
      alert('error', doc)
      Swal.fire({ icon: 'error', title: 'Oops...', text: '¡Error, Intente de nuevo o comuniquese con el Departamento Tic!' })
      setProgress(0)
    })
    .finally(() => {
        setLoading(false)
      setProgress(0)
      })
    
  }

  
  return(
    <>
      
      {mostrarDiv && <>
          <div class="animation01">
        <div class="rhombus_small">
            <div class="rhombus">
                <div class="border_box">
                    <span class="line line01"></span>
                    <span class="line line02"></span>
                    <span class="line line03"></span>
                    <span class="line line04"></span>
                    <span class="circle circle01"></span>
                    <span class="circle circle02"></span>
                    <span class="circle circle03"></span>
                    <span class="circle circle04"></span>
                    <span class="animation_line animation_line01"></span>
                    <span class="animation_line_wrapper animation_line02_wrapper"><span class="animation_line animation_line02"></span></span>
                    <span class="animation_line animation_line03"></span>
                    <span class="animation_line_wrapper animation_line04_wrapper"><span class="animation_line animation_line04"></span></span>
                    <span class="animation_line animation_line05"></span>
                    <span class="animation_line_wrapper animation_line06_wrapper"><span class="animation_line animation_line06"></span></span>
                    <span class="animation_line animation_line07"></span>
                    <span class="animation_line_wrapper animation_line08_wrapper"><span class="animation_line animation_line08"></span></span>
                </div>
                <div class="wave">
                    <div class="wave_wrapper"><div class="wave_box"></div></div>
                </div>
            </div>
        </div>
    </div>
          <div class="animation02">
        <div class="rhombus_box">
            <span class="rhombus_item_wrapper rhombus_item01_wrapper"><span class="rhombus_item"></span></span>
            <span class="rhombus_item_wrapper rhombus_item02_wrapper"><span class="rhombus_item"></span></span>
        </div>
        <div class="double_content">
            <div class="double_wrapper02 dotted02"><div class="dotted_hide"><div class="double_wrapper01 dotted01"><span class="dotted_right"></span></div></div></div>
            <div class="double_wrapper02 white02"><div class="double_wrapper01 white01"></div></div>
            <div class="double_wrapper02 gray02"><div class="double_wrapper01 gray01"></div></div>
            <div class="double_wrapper02 orange02"><div class="double_wrapper01 orange01"></div></div>
        </div>
        <div class="name">
            <p>Camara De Comercio De Cartagena</p>
            <span class="name_circle01"></span>
            <span class="name_circle02"></span>
        </div>
    </div>
      </>}
      {!mostrarDiv && <>
        <div className = 'somos_uno' data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" ></div>
         <div class="contenedor-card-item">
		      <div class="contenedor-card-item-wrapper">
		        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9pwuN55xOQq48Ebu_rZKV287ak67N8yjTDQ&usqp=CAU" alt=""/>
		        <div class="contenedor-info">
		          <div class="info">
		            <a href='./about' class="categoria">ayuda</a>
		          </div>
		          <div class="fondo"></div>
		        </div>
		      </div>
		    </div>
        {loading && <div >
          <div className="container">
          <div className="cargando">
            <div className="pelotas"></div>
            <div className="pelotas"></div>
            <div className="pelotas"></div>
            <span className="texto-cargando">Cargando...{progress}%</span>
          </div>
        </div>  
        </div>}
        
       {!loading && <div className= 'caja' style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
          
         <div  className="login-container">
      <form className="login-form " data-aos="flip-right"  onSubmit={handleSubmit}>
        <h2 className="login-title" data-aos="zoom-in">Iniciar sesión</h2>
        <input
          className="login-input"
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <select className="login-select" onChange={(e)=>setUbicacion(e.target.value)} required>
          <option value = '' >Seleccionar Sede</option>
          <option value = 'Ronda' >🏢 Sede Ronda</option>
          <option value = 'Centro' >🏫 Sede Centro</option>
        </select>
        <button className="login-button ov-btn-grow-ellipse" type="submit" >Iniciar sesión</button>
        
      </form>
    </div>
        </div>}
      </>}
    </>
  )
}
