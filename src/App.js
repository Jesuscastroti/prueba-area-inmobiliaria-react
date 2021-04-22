
import { Button , Card, CardTitle} from 'reactstrap';
import Tabla from './Components/tabla';
function App() {
  return (
    <div className="App">
      <div className="text-center">
        <h1>Prueba Desarrollador web junior- Area</h1>
      </div>
      {/*-------Componente de la tabla---------- */}
      <div className="container">
        <Tabla />
      </div>

    </div>
  );
}

export default App;
