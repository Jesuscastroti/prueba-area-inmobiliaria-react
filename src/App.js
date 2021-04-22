import React from 'react';
import Categoria from './Components/categoria';
import Articulos from './Components/articulos';
const App =()=> {
  return (
    <div className="App">
      <div className="text-center">
        <h1>Prueba Desarrollador web junior- Area</h1>
      </div>
      {/*-------Componente de la categoria---------- */}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h3>Listado de categorias</h3>
            <Categoria />
          </div>
          <hr/>
          <div className="col-lg-12">
          <h3>Listado de articulos</h3>
          <Articulos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
