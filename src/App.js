import React, {Fragment, useState, useEffect} from 'react'
import Formulario from './components/Formulario'
import Cancion from './components/Cancion'
import Info from './components/Info'
import axios from 'axios'

function App() {

  const [busquedaparams, setBusquedaParams] = useState({})
  const [letracancion, setLetraCancion] = useState('')
  const [informacion, setInformacion] = useState({})

  useEffect(() => {

    if(Object.keys(busquedaparams).length === 0){
        return
    }
   
    const consultarApiLetraArtista = async () =>{
      const {artista, cancion} = busquedaparams
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`

      Promise.all([axios.get(url), axios.get(url2)]).then(resultado => {
        setLetraCancion(resultado[0].data.lyrics)
        setInformacion(resultado[1].data.artists[0])
      })
    }

    consultarApiLetraArtista()

  },[busquedaparams])

  return (
   <Fragment>
     <Formulario 
        setBusquedaParams = {setBusquedaParams}
     />
     <div className="container mt-5">
       <div className="row">
         <div className="col-md-6">
            <Info 
               informacion={informacion}
            />
         </div>
         <div className="col-md-6">
            <Cancion 
                letra = {letracancion}
            />
         </div>
       </div>
     </div>
   </Fragment>
  )
}

export default App