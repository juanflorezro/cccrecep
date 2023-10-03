import React, { useEffect, useState } from 'react'
import AOS from 'aos'
export default function About(){
  useEffect(()=>{
    AOS.init()
  },[])
  return(
    <>
      <div className = 'about_principal'>
        
        <div className='about_tt' data-aos="zoom-out-down">
          <h1 className='about_header' >Camara De Comercio De Cartagena</h1>
          
          <h2 className = 'about_principal_titulo'>"cccrecepción" Gestión De Entradas y Salidas</h2>
        </div>
        <div>
          <div className= 'has'>
         <div className= 'has-2'>
           
           <div className='git'> <a href = 'https://github.com/juanflorezro/cccrecepcion'><img className= 'imagen_fondo' src = './git.png'/> </a></div>
           <div className= 'imagen_fondo2'> 
            <a aria-label="Chat on WhatsApp" href="https://wa.me/573003331333"><img alt="Chat on WhatsApp" src="./what.png" /> 
            </a>
           </div>
           
           
         </div>
        </div>
          <div className='fondoo'> 
            
          </div>
        </div>
         
        <div className= 'imagen-scroll' >
          <div className = 'seccioneslll' data-aos="zoom-out-up">
            <div style={{display: 'flex', justifyContent: 'center'}}  className='content_info'>
              <div class="cardd">
              <div class="card-innerd">
                <div class="card-frontd ccc1">
                  <h2 className = 'about_principal_titulo'>Descripción</h2>
                </div>
                <div class="card-backd">
                  <p>El proyecto consiste en el desarrollo de una aplicación integral de gestión de accesos, diseñada para optimizar el control y registro de entradas y salidas de personas y objetos en un entorno empresarial. Esta herramienta proporciona a los recepcionistas la capacidad de administrar de manera eficiente y segura el flujo de entrada y salida, así como realizar consultas detalladas sobre los registros almacenados. Además, ofrece la funcionalidad de exportar estos registros en formato Excel.</p>
                </div>
              </div>
            </div>
              <div class="cardd">
              <div class="card-innerd">
                <div class="card-frontd ccc2">
                  <h2 className = 'about_principal_titulo'>Objetivo</h2>
                </div>
                <div class="card-backd">
                  <p>Optimizar la gestión de accesos en el entorno empresarial mediante el desarrollo e implementación de una aplicación integral que permita un control eficiente y seguro de las entradas y salidas de personas y objetos, facilitando a los recepcionistas la administración y consulta detallada de registros, así como la exportación de datos en formato Excel para análisis específicos.





</p>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className = 'seccioneslll' data-aos="zoom-out-up">
            <h2 className = 'about_principal_subtitulo'>Tecnologias</h2>
            <div className = 'about_principal_tegnologias'>
              <div className = 'about_principal_tegnologias_desarrollo'>
                <h3 className = 'about_principal_tegnologias_desarrollo_titulo'>Desarrollo</h3>
                <div className = 'about_principal_tegnologias_desarrollo_secciones'>
                  
                  
                  
                  <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
                    <div class="cardc">
                      <div className='imagen_node imagen'></div>
                        <h4 >Node JS</h4>
                        <a href='https://nodejs.org/es'>Leer mas </a>
                      </div>
                  </div>
                  <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
                    <div class="cardc">
                      <div className='imagen_react imagen'></div>
                      <h4>React</h4>
                      <a href='https://react.dev/'>Leer mas </a>
                    </div>
                  </div>
                  <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
                    <div class="cardc">
                      <div className='imagen_mongo imagen'></div>
                      <h4>Mongo DB</h4>
                      <a href='https://www.mongodb.com/es'>Leer mas </a>
                    </div>
                  </div>
                  <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
                    <div class="cardc">
                      <div className='imagen_express imagen'></div>
                        <h4>Express js</h4>
                        <a href='https://expressjs.com/'>Leer mas </a>
                      </div>
                  </div>
                 
                </div>
              </div>
              <div className = 'about_principal_tegnologias_hosting'>
                <h3 className = 'about_principal_tegnologias_hosting_titulo'>Hosting</h3>
                <div className = 'about_principal_tegnologias_hosting_secciones'>
                  
                  <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
                    <div class="cardc">
                      <div className='imagen_vercel imagen'></div>
                      <h4>Vercel</h4>
                      <a href='https://vercel.com/'>Leer mas </a>
                    </div>
                  </div>
                  <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
                    <div class="cardc">
                      <div className='imagen_fl0 imagen'></div>
                      <h4>FL0</h4>
                      <a href='https://www.fl0.com/'>Leer mas </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className = 'seccioneslll' data-aos="zoom-out-up">
            <h2 className = 'about_principal_subtitulo'>Funciones</h2>
            <div className = 'about_principal_funciones'>
              <div className= 'function'>
                <div>
                <h3>Control de Usuarios</h3>
                <div class="contenedor-card-item2" data-aos="zoom-in-up">
  		          <div class="contenedor-card-item-wrapper2">
  		        <img src="./login.png" alt=""/>
  		        <div class="contenedor-info2">
  		          <div class="info2">
  		            <p class="titulo2"></p>
  		            <a  class="categoria2">Cada recepcionista tiene su propio perfil de acceso con credenciales únicas, garantizando la seguridad y responsabilidad en la gestión de E/S</a>
  		          </div>
  		          <div class="fondo2"></div>
  		        </div>
  		      </div>
  		    </div>
              </div>
                <div>
                <h3>Gestión Entradas Y Salidas</h3>
                <div class="contenedor-card-item2" data-aos="zoom-in-up">
  		          <div class="contenedor-card-item-wrapper2">
  		        <img src="./es.png" alt=""/>
  		        <div class="contenedor-info2">
  		          <div class="info2">
  		            <p class="titulo2"></p>
  		            <a class="categoria2">La aplicación permite el registro detallado de cada persona u objeto, proporcionando información relevante como nombre, fecha, hora y motivo</a>
  		          </div>
  		          <div class="fondo2"></div>
  		        </div>
  		      </div>
  		    </div>
              </div>
              </div>
              <div className= 'function'>
                <div >
                <h3>Gestión de Usuarios</h3>
                <div class="contenedor-card-item2" data-aos="zoom-in-up">
  		          <div class="contenedor-card-item-wrapper2">
  		        <img src="./gobjetos.png" alt=""/>
  		        <div class="contenedor-info2">
  		          <div class="info2">
  		            <p class="titulo2"></p>
  		            <a  class="categoria2">Cada persona registrada, se le podrá gestionar su información</a>
  		          </div>
  		          <div class="fondo2"></div>
  		        </div>
  		      </div>
  		    </div>
              </div>
                <div>
                <h3>Gestión Objetos</h3>
                <div class="contenedor-card-item2" data-aos="zoom-in-up">
  		          <div class="contenedor-card-item-wrapper2">
  		        <img src="./gusuarios.png" alt=""/>
  		        <div class="contenedor-info2">
  		          <div class="info2">
  		            <p class="titulo2"></p>
  		            <a class="categoria2">Cada objeto registrado, se le podrá gestionar su información</a>
  		          </div>
  		          <div class="fondo2"></div>
  		        </div>
  		      </div>
  		    </div>
              </div>
              </div>
              <div>
                <h3>Consultas y Exportación de Registros</h3>
                <div class="contenedor-card-item2" data-aos="zoom-in-up">
  		          <div class="contenedor-card-item-wrapper2" >
  		        <img src="./ges.png" alt=""/>
  		        <div class="contenedor-info2">
  		          <div class="info2">
  		            <p class="titulo2"></p>
  		            <a class="categoria2">Los recepcionistas pueden realizar consultas específicas sobre los registros almacenados</a>
  		          </div>
  		          <div class="fondo2"></div>
  		        </div>
  		      </div>
  		    </div>
              </div>
            </div>
          </div>
          <div className = 'seccioneslll' data-aos="zoom-out-up">
            <div className = 'about_principal_funciones'>
              <div class="parent">
                <div class="card">
                    <div class="logo">
                        <span class="circle circle1"></span>
                        <span class="circle circle2"></span>
                        <span class="circle circle3"></span>
                        <span class="circle circle4"></span>
                        <span class="circle circle5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.667 31.69" class="svg">
                                <path id="Path_6" data-name="Path 6" d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z" transform="translate(0 0)"></path>
                                <path id="Path_7" data-name="Path 7" d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z" transform="translate(-45.91 0)"></path>
                                <path id="Path_8" data-name="Path 8" d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z" transform="translate(0 -51.963)"></path>
                              </svg>
                        </span>
        
                    </div>
                    <div class="glass"></div>
                    <div class="content">
                        <span class="title">Desarrollo</span>
                        <span class="text">Se utilizaron tecnologías escalables y prácticas de programación para garantizar un rendimiento </span>
                    </div>
                    <div class="bottom">
                        
                        <div class="social-buttons-container">
                            <button class="social-button .social-button1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-facebook" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
</svg></button>
                              <button class="social-button .social-button2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
</svg>
                              </button>
                              <button class="social-button .social-button3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-linkedin" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
  <path d="M8 11l0 5" />
  <path d="M8 8l0 .01" />
  <path d="M12 16l0 -5" />
  <path d="M16 16v-3a2 2 0 0 0 -4 0" />
</svg>
                              </button>
                        </div>
                        <div class="view-more">
                            <button class="view-more-button">Juan Florez Rodriguez</button>
                            <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
            </div>
          </div>
        </div>
        <div className = 'footer'>
          <div className = 'footer_seccion1'>
          
          <div>
            <a className='about_footer_redes' href="https://www.facebook.com/camcartagena"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-facebook" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
</svg></a>
            <a className='about_footer_redes' href="https://www.instagram.com/cam_cartagena"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M16.5 7.5l0 .01" />
</svg></a>
            <a className='about_footer_redes' href="https://www.linkedin.com/company/camcartagena"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-linkedin" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
  <path d="M8 11l0 5" />
  <path d="M8 8l0 .01" />
  <path d="M12 16l0 -5" />
  <path d="M16 16v-3a2 2 0 0 0 -4 0" />
</svg></a>
            <a className='about_footer_redes' href="https://www.twitter.com/camcartagena"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-twitter" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
</svg></a>
          </div>
          
        </div>
          <div className = 'footer_seccion1'>
           
          <div>
            <a href='./' data-text="Awesome" class="buttonk">
                <span class="actual-text">&nbsp;Login&nbsp;</span>
                <span class="hover-text" aria-hidden="true">&nbsp;Login&nbsp;</span>
            </a>
          </div>
          
        </div>
        </div>
      </div>
      
    </>
  )
}
