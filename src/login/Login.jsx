import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
export default function Login({path}){
  //variables
  const [ubicacion, setUbicacion]= useState('')
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  //iniciaiar todos laas funciones asincronas
  useEffect(()=>{
    token() 
  },[])
  //funciones
  const token = () => {
     const token = tokenN('token')
    axios.post('https://express.juanflow04flore.repl.co/autentication',{},{
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
    axios.post('https://express.juanflow04flore.repl.co/login',{
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
      setProgress(0)
    })
    .finally(() => {
        setLoading(false)
      setProgress(0)
      })
    
  }

  
  return(
    <>
       {loading && <div>
        <div class="container">
          <div class="cargando">
            <div class="pelotas"></div>
            <div class="pelotas"></div>
            <div class="pelotas"></div>
            <span class="texto-cargando">Cargando...{progress}%</span>
          </div>
        </div>  
      </div>}
      {!loading && <div className="login-container ">
      <form className="login-form " onSubmit={handleSubmit}>
        <h2 className="login-title">Iniciar sesión</h2>
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
    </div>}
    </>
  )
}