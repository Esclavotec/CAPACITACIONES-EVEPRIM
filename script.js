/* ============ CONFIGURACIÓN DE FIREBASE ============
   Pegue aquí el objeto firebaseConfig que Firebase le entrega
   al registrar la app web (Configuración del proyecto > General
   > Tus apps). Mientras esté vacío, el registro/inicio de sesión
   de docentes queda desactivado y el sitio lo avisa por consola. */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDLHqLlCRbdom13zDWnfCC7Y7wiwp5HlWk",
  authDomain: "eveprim-e1647.firebaseapp.com",
  projectId: "eveprim-e1647",
  storageBucket: "eveprim-e1647.firebasestorage.app",
  messagingSenderId: "933687265831",
  appId: "1:933687265831:web:5ea9fb2c547c77fbeadc02"
};

let auth = null, db = null;
if(FIREBASE_CONFIG.apiKey){
  firebase.initializeApp(FIREBASE_CONFIG);
  auth = firebase.auth();
  db = firebase.firestore();
} else {
  console.warn('EVEPRIM: falta pegar FIREBASE_CONFIG. El registro de docentes está desactivado hasta configurarlo.');
}
/* ============ DATOS DE LOS LIBROS ============ */
const LIBROS = {
  geometria: {
    tema:'geo-tema', color:'#2FA88A', nombre:'Geometría',
    forma:`<svg viewBox="0 0 46 46" fill="none"><path d="M23 6L41 40H5L23 6z" stroke="#F4F6F0" stroke-width="3" stroke-linejoin="round"/></svg>`,
    resumen:'De la circunferencia a los cuerpos sólidos: un recorrido por el círculo y su área, los polígonos regulares, los sólidos geométricos y la simetría, con actividades para construir y no solo memorizar.',
    temario:[
      ['Circunferencia',['Circunferencia y sus elementos','Estimar la medida de la circunferencia conociendo su diámetro','Número π: razón entre la longitud de la circunferencia y su diámetro','Área del círculo','Cálculo de áreas de figuras compuestas']],
      ['Polígonos regulares',['Identificar elementos en un polígono regular','Trazar polígonos regulares usando regla, compás y transportador (pentágono y hexágono regular)','Polígono inscrito en una circunferencia','Calcular el perímetro de polígonos regulares y resolución de problemas']],
      ['Cuerpos sólidos',['Clasificar cuerpos sólidos por su forma (pirámides y conos)','Cálculo de volumen']],
      ['Simetría',['Reconocer y construir figuras simétricas','Explorar y resolver situaciones de simetría']],
      ['Activación de conocimientos',['Circunferencia','Polígonos regulares','Prismas y cubos','Figuras simétricas']]
    ],
    actividadesMep:[
      ['Circunferencia','Longitud de la circunferencia, número π y área del círculo, incluyendo figuras compuestas.'],
      ['Polígonos regulares','Elementos, trazo con regla, compás y transportador, y cálculo de perímetro.'],
      ['Cuerpos sólidos','Clasificación de sólidos, pirámides, conos y cálculo de volumen.'],
      ['Simetría','Reconocimiento y construcción de figuras simétricas.']
    ],
    actividadesFuera:[
      ['Activación de conocimientos','Repaso rápido de circunferencia, polígonos, prismas/cubos y figuras simétricas.']
    ],
    videos:[
      {titulo:'Estimar la medida', url:'https://youtu.be/08_dbs-oia4?si=Ke8fwAqbD3EIrghm'},
      {titulo:'Partes de la circunferencia', url:'https://youtu.be/obTZVT-xdiA?si=iTtR2BazCT0bPZRx'},
      {titulo:'La circunferencia en el entorno', url:'https://youtu.be/aQO0li54QwQ?si=Gl086F9g0U54kgPU'}
    ],
    juegos:[
      {titulo:'Encuentra la circunferencia', url:'https://view.genially.com/68255b99bedde627640d4a8a', imagen:'https://i.postimg.cc/bNkVZd0r/imagen-2026-08-12-221253390.png'},
      {titulo:'El tesoro en la isla', url:'https://view.genially.com/670f554fad3dd021fda3bf39', imagen:'https://i.postimg.cc/D0s64YG3/imagen-2026-08-12-221443817.png'},
      {titulo:'¿Cuánto mide la circunferencia?', url:'https://www.geogebra.org/m/j9dsrt9u', imagen:'https://i.postimg.cc/wBGQfd5W/imagen-2026-08-12-221630545.png'}
    ]
  },
  medidas: {
    tema:'med-tema', color:'#F2A93B', nombre:'Medidas',
    forma:`<svg viewBox="0 0 46 46" fill="none"><rect x="5" y="19" width="36" height="8" rx="2" stroke="#F4F6F0" stroke-width="3"/><path d="M11 19v8M19 19v8M27 19v8M35 19v8" stroke="#F4F6F0" stroke-width="2.5"/></svg>`,
    resumen:'De la regla al metro cúbico: unidades de medida trabajadas siempre desde situaciones cotidianas del estudiantado.',
    temario:[
      ['Sistema métrico decimal','Conversión entre unidades de longitud, masa y capacidad.'],
      ['Longitud y perímetro','Instrumentos de medición y estimación.'],
      ['Área y superficie','Medición directa e indirecta en figuras reales.'],
      ['Volumen y capacidad','Relación entre unidades de volumen y capacidad.'],
      ['Medidas de tiempo','Cálculo de duraciones y equivalencias horarias.']
    ],
    actividadesMep:[
      ['Conversión de unidades','Ejercicios de conversión alineados con el programa oficial de sexto grado.'],
      ['Medición de la clase','Cálculo de área y perímetro del aula con instrumentos reales.']
    ],
    actividadesFuera:[
      ['Receta a escala','Conversión de medidas de capacidad al ajustar una receta de cocina.'],
      ['Bitácora de tiempo','Registro y cálculo de duraciones de actividades diarias del estudiantado.']
    ],
    videos:[],
    juegos:[]
  },
  estadistica: {
    tema:'est-tema', color:'#7B5EF0', nombre:'Estadística',
    forma:`<svg viewBox="0 0 46 46" fill="none"><path d="M7 39V23M18 39V13M29 39V27M40 39V17" stroke="#F4F6F0" stroke-width="4" stroke-linecap="round"/><path d="M6 39h34" stroke="#F4F6F0" stroke-width="3" stroke-linecap="round"/></svg>`,
    resumen:'De la recolección de datos a su interpretación: tablas, gráficos y medidas de tendencia central explicados desde situaciones reales del aula.',
    temario:[
      ['Recolección de datos','Diseño de encuestas sencillas y registro ordenado de la información.'],
      ['Tablas de frecuencia','Organización de datos y conteo de frecuencias absolutas.'],
      ['Gráficos estadísticos','Lectura y construcción de gráficos de barras, líneas y circulares.'],
      ['Medidas de tendencia central','Cálculo e interpretación de media, mediana y moda.'],
      ['Interpretación de datos','Análisis crítico de la información presentada en medios y contextos cotidianos.']
    ],
    actividadesMep:[
      ['Encuesta de aula','Diseño, aplicación y tabulación de una encuesta según el programa oficial del MEP.'],
      ['Cálculo de promedio','Ficha para calcular media, mediana y moda con datos del temario oficial.']
    ],
    actividadesFuera:[
      ['Estadística con noticias','Búsqueda y análisis de gráficos estadísticos publicados en medios de comunicación.'],
      ['Encuesta familiar','Recolección de datos sobre hábitos familiares y su representación en un gráfico propio.']
    ],
    videos:[],
    juegos:[]
  },
  probabilidad: {
    tema:'prob-tema', color:'#E85D8C', nombre:'Probabilidad',
    forma:`<svg viewBox="0 0 46 46" fill="none"><rect x="6" y="6" width="34" height="34" rx="7" stroke="#F4F6F0" stroke-width="3"/><circle cx="16" cy="16" r="2.4" fill="#F4F6F0"/><circle cx="30" cy="16" r="2.4" fill="#F4F6F0"/><circle cx="16" cy="30" r="2.4" fill="#F4F6F0"/><circle cx="30" cy="30" r="2.4" fill="#F4F6F0"/><circle cx="23" cy="23" r="2.4" fill="#F4F6F0"/></svg>`,
    resumen:'Azar y datos explicados con experimentos concretos, para que la probabilidad deje de sentirse abstracta.',
    temario:[
      ['Experimentos aleatorios','Diferencia entre sucesos seguros, posibles e imposibles.'],
      ['Espacio muestral','Identificación de resultados posibles de un experimento.'],
      ['Probabilidad simple','Cálculo de la probabilidad de un evento sencillo.'],
      ['Recolección de datos','Encuestas y registro de información en el aula.'],
      ['Representación de datos','Tablas, gráficos de barras y de pastel.']
    ],
    actividadesMep:[
      ['Experimentos con dados y monedas','Registro de resultados para calcular probabilidad simple según el MEP.'],
      ['Encuesta de aula','Recolección y representación de datos en tablas y gráficos de barras.']
    ],
    actividadesFuera:[
      ['Juegos de azar sencillos','Análisis de la probabilidad de ganar en juegos de mesa cotidianos.'],
      ['Predicción del clima','Comparación de pronósticos con resultados reales durante una semana.']
    ],
    videos:[],
    juegos:[]
  }
};

/* ============ VIDEOS DE CADA LIBRO ============
   Pegue aquí los videos de YouTube de cada libro. La miniatura se toma
   automáticamente de YouTube a partir del link, no hace falta subir imagen.
   Formato: { titulo: "Nombre del video", url: "https://youtube.com/watch?v=XXXX" }
   Ejemplo:
   geometria: [
     { titulo: "¿Qué es la circunferencia?", url: "https://www.youtube.com/watch?v=XXXXXXXXXXX" }
   ]
*/
const VIDEOS_LIBROS = {
  geometria: [],
  medidas: [],
  estadistica: [],
  probabilidad: []
};

/* ============ ACTIVIDADES / JUEGOS DE CADA LIBRO ============
   Pegue aquí las actividades interactivas (normalmente hechas en Genially).
   A diferencia de YouTube, Genially no permite obtener la miniatura solo con
   el link, así que hay que pegar también la URL de la imagen de portada del
   juego (por ejemplo, una captura de pantalla subida a postimg.cc).
   Formato: { titulo: "Nombre de la actividad", url: "https://link-del-juego", portada: "https://url-de-la-imagen.png" }
*/
const JUEGOS_LIBROS = {
  geometria: [],
  medidas: [],
  estadistica: [],
  probabilidad: []
};

/* ============ IMÁGENES DE PORTADA ============
   Pegue aquí la URL de la imagen de portada de cada libro.
   Ejemplo: geometria: "https://miweb.com/portada-geometria.jpg"          */
const IMAGENES_PORTADA = {
  geometria: "https://i.postimg.cc/sD99Y0jH/Portada.png",
  medidas: "https://i.postimg.cc/GhLPLxrC/Portada-Libro-Medidas.png",
  estadistica: "",
  probabilidad: "https://i.postimg.cc/J4r3r5mW/Portada-Libro-Probabilidad.png"
};

/* ============ IMÁGENES DE LOS 7 SÍMBOLOS DEL LIBRO ============
   Pegue aquí la URL de la imagen de cada símbolo (página de Generalidades).
   s1: Activación de conocimientos   s5: Videos
   s2: Recuerda que...               s6: Práctica
   s3: Para saber más...             s7: Aplicaciones tecnológicas
   s4: Sabías que...
   Ejemplo: s1: "https://miweb.com/simbolo-activacion.png"                  */
const SIMBOLOS_IMAGENES = {
  s1: "https://i.postimg.cc/NfwkrwcV/Activacion-Conocimientos.png",
  s2: "https://i.postimg.cc/7PzN6Zp5/Recuerda-que.png",
  s3: "https://i.postimg.cc/pXtJntHB/Para-saber-mas.png",
  s4: "https://i.postimg.cc/WbPwJPvx/Sabias-que.png",
  s5: "https://i.postimg.cc/MK8mj8Sm/Video.png",
  s6: "https://i.postimg.cc/wxNkvjSJ/Practica.png",
  s7: "https://i.postimg.cc/ry49mwvm/Aplicaciones-Tec.png"
};

/* ============ PRESENTACIONES DE CAPACITACIÓN ============
   Pegue aquí el enlace de INSERCIÓN ("embed") de cada presentación
   (Google Slides: Archivo > Publicar en la web > Insertar;
   PowerPoint Online / OneDrive: Insertar > Código de inserción).
   Ejemplo: geometria: "https://docs.google.com/presentation/d/XXXX/embed" */
const PRESENTACIONES = {
  geometria: "https://docs.google.com/presentation/d/e/2PACX-1vRjk-60AbbZUdih88snaY7e8_zG-16OnkZW4VO7TEog2mjZ7pcsZvX-aYe-3-Yowv5FZRPt3nQTvRV2/pubembed?start=true&loop=true&delayms=3000",
  medidas: "",
  estadistica: "",
  probabilidad: ""
};

/* ============ NAVEGACIÓN ENTRE VISTAS ============ */
function ocultarTodasLasVistas(){
  document.getElementById('vistaInicio').classList.add('oculto');
  document.getElementById('vistaLibro').classList.add('oculto');
  document.getElementById('vistaGeneral').classList.add('oculto');
  document.getElementById('vistaHistoria').classList.add('oculto');
}
function mostrarInicio(){
  ocultarTodasLasVistas();
  document.getElementById('vistaInicio').classList.remove('oculto');
  window.scrollTo({top:0, behavior:'smooth'});
}
function mostrarGeneral(){
  ocultarTodasLasVistas();
  document.getElementById('vistaGeneral').classList.remove('oculto');
  window.scrollTo({top:0, behavior:'smooth'});
}
function mostrarHistoria(){
  ocultarTodasLasVistas();
  document.getElementById('vistaHistoria').classList.remove('oculto');
  window.scrollTo({top:0, behavior:'smooth'});
}
function irA(idSeccion){
  mostrarInicio();
  setTimeout(()=>{
    const el = document.getElementById(idSeccion);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  }, 50);
}
const LIBROS_NO_DISPONIBLES = ['medidas', 'estadistica', 'probabilidad'];

function extraerIdYouTube(url){
  const m = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

function mostrarLibro(clave){
  if(LIBROS_NO_DISPONIBLES.includes(clave)){
    alert('El libro de ' + LIBROS[clave].nombre + ' no está disponible por el momento.');
    return;
  }
  const libro = LIBROS[clave];
  const vista = document.getElementById('vistaLibro');
  vista.className = libro.tema;
  vista.innerHTML = `
    <section class="libro-hero">
      <div class="contenedor" style="display:block;">
        <button class="btn-volver" onclick="mostrarInicio()">← Volver a la selección de libros</button>
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
          <div class="forma-grande">${libro.forma}</div>
          <div>
            <span class="eyebrow" style="color:rgba(244,246,240,0.75)">Libro EVEPRIM</span>
            <h2>${libro.nombre}</h2>
          </div>
        </div>
      </div>
    </section>
    <section class="libro-cuerpo">
      <div class="contenedor">
        <p style="max-width:60ch;color:var(--tinta-suave);margin-bottom:36px;">${libro.resumen}</p>
        <div class="libro-grid">
          <div>
            <h4 style="margin-bottom:10px;">Contenidos del libro</h4>
            <ul class="temario">
              ${libro.temario.map(t=>`<li><h5>${t[0]}</h5>${Array.isArray(t[1]) ? `<ul class="subtemas">${t[1].map(s=>`<li>${s}</li>`).join('')}</ul>` : `<p>${t[1]}</p>`}</li>`).join('')}
            </ul>
          </div>
          <div>
            <div class="panel-portada">
              <h4>Portada del libro</h4>
              <div class="marco-portada" id="marcoPortada-${clave}">
                <p class="aviso-portada">Sin portada asignada en el código</p>
                <img id="imgPortada-${clave}" alt="Portada del libro de ${libro.nombre}">
              </div>
            </div>
          <div class="panel-obtener">
            <h4>Dónde obtenerlo</h4>
            <p>Descargue la versión digital del libro de ${libro.nombre.toLowerCase()} con el botón de descarga. Si no inicia la descarga, comuníquese con el autor.</p>
            <button class="btn-descarga" onclick="alert('Aquí se enlazará el archivo real del libro de ${libro.nombre}.')">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 3v13m0 0l-5-5m5 5l5-5M4 21h16"/></svg>
              Descargar libro (PDF)
            </button>
            <div class="formato"><span>Formato</span><span>PDF</span></div>
            <div class="formato"><span>Última actualización</span><span>2026</span></div>
          </div>
          </div>
        </div>

        <div class="seccion-presentacion">
          <h4 style="margin-bottom:10px;">Presentación de capacitación</h4>
          <div class="marco-ppt">
            <div class="marco-embed" id="marcoEmbed-${clave}">
              <p class="aviso">Sin presentación asignada en el código para ${libro.nombre}.</p>
              <iframe id="iframePpt-${clave}" allowfullscreen></iframe>
            </div>
            <button class="btn-pantalla-completa" onclick="presentarPantallaCompleta('${clave}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
              Presentar en pantalla completa
            </button>
          </div>
        </div>

        <div class="seccion-actividades">
          <h4 style="margin-bottom:10px;">Temas del libro</h4>
          <div class="grid-actividades">
            <div class="col-actividad mep">
              <span class="badge">Dentro del MEP</span>
              <ul>
                ${libro.actividadesMep.map(a=>`<li><h5>${a[0]}</h5><p>${a[1]}</p></li>`).join('')}
              </ul>
            </div>
            <div class="col-actividad fuera">
              <span class="badge">Fuera del MEP</span>
              <ul>
                ${libro.actividadesFuera.map(a=>`<li><h5>${a[0]}</h5><p>${a[1]}</p></li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <div class="seccion-recursos">
          <h4 style="margin-bottom:10px;">Videos</h4>
          <div class="grid-recursos grid-4">
            ${(function(){
              const total = 4;
              const items = libro.videos || [];
              let html = '';
              for(let i=0;i<total;i++){
                const v = items[i];
                if(v){
                  const idYt = extraerIdYouTube(v.url);
                  const miniatura = idYt ? `https://img.youtube.com/vi/${idYt}/hqdefault.jpg` : (v.miniatura||'');
                  html += `<a class="tarjeta-recurso" href="${v.url}" target="_blank" rel="noopener">
                    <div class="miniatura">
                      ${miniatura ? `<img src="${miniatura}" alt="${v.titulo}">` : `<p class="aviso-mini-recurso">Sin miniatura</p>`}
                      <div class="icono-play"><svg viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="11" fill="rgba(15,23,42,0.55)"/><path d="M10 8l6 4-6 4V8z" fill="white"/></svg></div>
                    </div>
                    <div class="cuerpo-recurso"><h5>${v.titulo}</h5></div>
                  </a>`;
                } else {
                  html += `<div class="tarjeta-recurso proximamente">
                    <div class="miniatura"><p class="aviso-mini-recurso">Próximamente</p></div>
                    <div class="cuerpo-recurso"><h5>Más videos próximamente</h5></div>
                  </div>`;
                }
              }
              return html;
            })()}
          </div>
        </div>

        <div class="seccion-recursos">
          <h4 style="margin-bottom:10px;">Actividades interactivas</h4>
          <div class="grid-recursos grid-4">
            ${(function(){
              const total = 4;
              const items = libro.juegos || [];
              let html = '';
              for(let i=0;i<total;i++){
                const r = items[i];
                if(r){
                  html += `<a class="tarjeta-recurso" href="${r.url}" target="_blank" rel="noopener">
                    <div class="miniatura">
                      ${r.imagen ? `<img src="${r.imagen}" alt="${r.titulo}">` : `<p class="aviso-mini-recurso">Sin miniatura (agregue la URL en el campo "imagen" de este juego)</p>`}
                    </div>
                    <div class="cuerpo-recurso"><h5>${r.titulo}</h5></div>
                  </a>`;
                } else {
                  html += `<div class="tarjeta-recurso proximamente">
                    <div class="miniatura"><p class="aviso-mini-recurso">Próximamente</p></div>
                    <div class="cuerpo-recurso"><h5>Más actividades próximamente</h5></div>
                  </div>`;
                }
              }
              return html;
            })()}
          </div>
        </div>

        <div class="seccion-notas">
          <h4 style="margin-bottom:10px;">Notas</h4>
          <div class="panel-notas">
            <p class="aviso-notas">Aún no hay notas para este libro.</p>
          </div>
        </div>
      </div>
    </section>
  `;
  ocultarTodasLasVistas();
  vista.classList.remove('oculto');
  window.scrollTo({top:0, behavior:'smooth'});
  aplicarPortada(clave, document.getElementById('imgPortada-'+clave), document.getElementById('marcoPortada-'+clave));
  aplicarPresentacion(clave);
}

/* ============ APLICAR IMÁGENES DESDE URL (portadas y símbolos) ============ */
function aplicarImagenDesdeUrl(url, img, marco){
  if(!img || !marco || !url) return;
  const aviso = marco.querySelector('p');
  img.onerror = ()=>{ img.style.display='none'; if(aviso){ aviso.textContent='La URL no cargó una imagen válida.'; aviso.style.display='block'; } };
  img.onload = ()=>{ img.style.display='block'; if(aviso) aviso.style.display='none'; };
  img.src = url;
}
function aplicarPortada(clave, img, marco){
  aplicarImagenDesdeUrl(IMAGENES_PORTADA[clave], img, marco);
}
function aplicarPortadasSelector(){
  Object.keys(IMAGENES_PORTADA).forEach(clave=>{
    aplicarPortada(clave, document.getElementById('miniImg-'+clave), document.getElementById('miniPortada-'+clave));
  });
}
function aplicarSimbolos(){
  Object.keys(SIMBOLOS_IMAGENES).forEach(clave=>{
    aplicarImagenDesdeUrl(SIMBOLOS_IMAGENES[clave], document.getElementById('imgSimbolo-'+clave), document.getElementById('marcoSimbolo-'+clave));
  });
}
document.addEventListener('DOMContentLoaded', ()=>{
  aplicarPortadasSelector();
  aplicarSimbolos();
});

function aplicarPresentacion(clave){
  const url = PRESENTACIONES[clave];
  const iframe = document.getElementById('iframePpt-'+clave);
  const marco = document.getElementById('marcoEmbed-'+clave);
  if(!url || !iframe || !marco) return;
  iframe.src = url;
  iframe.style.display = 'block';
  marco.querySelector('.aviso').style.display = 'none';
}
function presentarPantallaCompleta(clave){
  const marco = document.getElementById('marcoEmbed-'+clave);
  if(!PRESENTACIONES[clave]){
    alert('Primero agregue el enlace de la presentación de '+LIBROS[clave].nombre+' en la constante PRESENTACIONES del código.');
    return;
  }
  if(marco.requestFullscreen) marco.requestFullscreen();
  else if(marco.webkitRequestFullscreen) marco.webkitRequestFullscreen();
}

/* ============ MODAL LOGIN ============ */
let modoLogin = 'ingreso';
function abrirModal(){
  document.getElementById('fondoModal').classList.remove('oculto');
  ocultarErrorLogin();
}
function cerrarModal(){ document.getElementById('fondoModal').classList.add('oculto'); }
function cambiarPestaña(cual){
  modoLogin = cual;
  const esIngreso = cual === 'ingreso';
  document.getElementById('pestIngreso').classList.toggle('activa', esIngreso);
  document.getElementById('pestRegistro').classList.toggle('activa', !esIngreso);
  document.getElementById('campoNombre').classList.toggle('oculto', esIngreso);
  document.getElementById('textoBotonLogin').textContent = esIngreso ? 'Ingresar' : 'Crear cuenta';
  ocultarErrorLogin();
}
function mostrarErrorLogin(mensaje){
  const aviso = document.getElementById('avisoErrorLogin');
  aviso.textContent = mensaje;
  aviso.classList.remove('oculto');
}
function ocultarErrorLogin(){
  document.getElementById('avisoErrorLogin').classList.add('oculto');
}

/* ============ AUTENTICACIÓN DE DOCENTES (Firebase) ============ */
function manejarFormularioLogin(evento){
  evento.preventDefault();
  ocultarErrorLogin();

  if(!auth || !db){
    mostrarErrorLogin('El registro aún no está activado: falta pegar la configuración de Firebase (FIREBASE_CONFIG) en el código.');
    return;
  }

  const correo = document.getElementById('inputCorreo').value.trim();
  const contraseña = document.getElementById('inputContraseña').value;
  const nombre = document.getElementById('inputNombre').value.trim();
  const boton = document.getElementById('botonLogin');
  boton.disabled = true;

  const restaurarBoton = ()=>{ boton.disabled = false; };

  if(modoLogin === 'registro'){
    if(!nombre){ mostrarErrorLogin('Ingrese su nombre completo.'); restaurarBoton(); return; }
    auth.createUserWithEmailAndPassword(correo, contraseña)
      .then(credencial => db.collection('docentes').doc(credencial.user.uid).set({
        nombre: nombre,
        correo: correo,
        fechaRegistro: firebase.firestore.FieldValue.serverTimestamp()
      }))
      .then(()=>{ restaurarBoton(); cerrarModal(); })
      .catch(err=>{ restaurarBoton(); mostrarErrorLogin(traducirErrorFirebase(err)); });
  } else {
    auth.signInWithEmailAndPassword(correo, contraseña)
      .then(()=>{ restaurarBoton(); cerrarModal(); })
      .catch(err=>{ restaurarBoton(); mostrarErrorLogin(traducirErrorFirebase(err)); });
  }
}
function cerrarSesionDocente(){ if(auth) auth.signOut(); }
function traducirErrorFirebase(err){
  const codigo = err.code || '';
  if(codigo.includes('email-already-in-use')) return 'Ese correo ya está registrado. Intente iniciar sesión.';
  if(codigo.includes('invalid-email')) return 'El correo no es válido.';
  if(codigo.includes('weak-password')) return 'La contraseña debe tener al menos 6 caracteres.';
  if(codigo.includes('user-not-found') || codigo.includes('wrong-password') || codigo.includes('invalid-credential')) return 'Correo o contraseña incorrectos.';
  return 'Ocurrió un error: ' + err.message;
}
if(auth){
  auth.onAuthStateChanged(usuario=>{
    const boton = document.getElementById('botonNavIngresar');
    if(usuario){
      boton.textContent = 'Cerrar sesión';
      boton.onclick = cerrarSesionDocente;
    } else {
      boton.textContent = 'Profesores: ingresar';
      boton.onclick = abrirModal;
    }
  });
}

/* ============ BUSCADOR ============ */
const INDICE_BUSQUEDA = [
  {titulo:'Inicio y objetivo del proyecto', accion:()=>irA('inicio')},
  {titulo:'Objetivo del proyecto y creadores', accion:()=>irA('objetivo')},
  {titulo:'Generalidades de los libros', accion:()=>mostrarGeneral()},
  {titulo:'Historia del proyecto', accion:()=>mostrarHistoria()},
  {titulo:'Elegir un libro', accion:()=>irA('libros')},
  {titulo:'Opiniones de la comunidad docente', accion:()=>irA('opiniones')},
  {titulo:'Libro de Geometría', accion:()=>mostrarLibro('geometria')},
  {titulo:'Libro de Medidas', accion:()=>mostrarLibro('medidas')},
  {titulo:'Libro de Álgebra', accion:()=>mostrarLibro('estadistica')},
  {titulo:'Libro de Probabilidad', accion:()=>mostrarLibro('probabilidad')},
];
function buscar(texto){
  const caja = document.getElementById('resultadosBusqueda');
  const q = texto.trim().toLowerCase();
  if(!q){ caja.classList.add('oculto'); caja.innerHTML=''; return; }
  const coincidencias = INDICE_BUSQUEDA.filter(r => r.titulo.toLowerCase().includes(q));
  caja.innerHTML = coincidencias.length
    ? coincidencias.map((r,i)=>`<button onclick="ejecutarResultado(${i})">${r.titulo}</button>`).join('')
    : `<div class="vacio">Sin resultados para "${texto}"</div>`;
  window._resultadosActuales = coincidencias;
  caja.classList.remove('oculto');
}
function ejecutarResultado(i){
  window._resultadosActuales[i].accion();
  document.getElementById('resultadosBusqueda').classList.add('oculto');
  document.getElementById('campoBusqueda').value='';
}
document.addEventListener('click', (e)=>{
  if(!e.target.closest('.buscador')) document.getElementById('resultadosBusqueda').classList.add('oculto');
});

/* ============ COOKIES (aviso en memoria, no persistente en esta vista previa) ============ */
setTimeout(()=>{ document.getElementById('bannerCookies').classList.remove('oculto'); }, 900);
function responderCookies(aceptar){
  document.getElementById('bannerCookies').classList.add('oculto');
  // Nota para producción: al publicar en GitHub/CodePen, guarde esta decisión
  // con localStorage o una cookie real para no repetir el aviso en cada visita.
}

/* ============ OPINIONES DE LA COMUNIDAD (burbujas de comentarios) ============
   Los comentarios se guardan en la colección "comentarios" de Firestore.
   A diferencia de "docentes", esta colección es de lectura pública: cualquier
   persona que visite el sitio puede ver las opiniones de las demás.        */
let comentariosCache = [];
const COLORES_BURBUJA = ['#2FA88A','#F2A93B','#7B5EF0','#E85D8C'];

function escaparHtml(texto){
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

function cargarComentarios(){
  if(!db) return;
  db.collection('comentarios').orderBy('fecha','desc').limit(40).get()
    .then(snapshot=>{ comentariosCache = snapshot.docs.map(d=>d.data()); })
    .catch(err=>console.warn('EVEPRIM: no se pudieron cargar los comentarios.', err));
}

function lanzarBurbuja(){
  if(!comentariosCache.length) return;
  const c = comentariosCache[Math.floor(Math.random()*comentariosCache.length)];
  const escena = document.getElementById('escenaComentarios');
  if(!escena) return;
  const color = COLORES_BURBUJA[Math.floor(Math.random()*COLORES_BURBUJA.length)];
  const burbuja = document.createElement('div');
  burbuja.className = 'burbuja-comentario';
  burbuja.style.borderTop = '3px solid '+color;
  burbuja.style.left = (Math.random()*68) + '%';
  burbuja.innerHTML = `<strong style="color:${color}">${escaparHtml(c.nombre || 'Docente anónimo')}</strong>${escaparHtml(c.texto || '')}`;
  escena.appendChild(burbuja);
  setTimeout(()=>burbuja.remove(), 7600);
}

function enviarComentario(){
  const aviso = document.getElementById('avisoComentario');
  aviso.classList.remove('oculto');
  if(!db){
    aviso.textContent = 'Los comentarios aún no están activados: falta configurar Firebase.';
    return;
  }
  const nombre = (document.getElementById('inputNombreComentario').value.trim() || 'Docente anónimo').slice(0,60);
  const texto = document.getElementById('inputTextoComentario').value.trim().slice(0,240);
  if(!texto){ aviso.textContent = 'Escriba un comentario antes de enviarlo.'; return; }
  db.collection('comentarios').add({
    nombre: nombre,
    texto: texto,
    fecha: firebase.firestore.FieldValue.serverTimestamp()
  }).then(()=>{
    aviso.textContent = '¡Gracias! Su comentario ya fue publicado.';
    document.getElementById('inputTextoComentario').value = '';
    comentariosCache.unshift({nombre, texto});
  }).catch(err=>{
    aviso.textContent = 'No se pudo publicar el comentario. Intente de nuevo.';
    console.warn(err);
  });
}

if(db){
  cargarComentarios();
  setInterval(cargarComentarios, 60000); // vuelve a consultar los comentarios cada minuto
  setInterval(lanzarBurbuja, 8000);      // lanza una burbuja nueva cada ~8 segundos
}