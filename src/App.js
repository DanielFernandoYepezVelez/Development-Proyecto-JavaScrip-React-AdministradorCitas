import { Fragment, useState } from 'react';
import Formulario from './Components/Formulario';

function App() {

  /* State Del Arreglo De Las Citas Creadas */
  const [citas, guardarCitas] = useState([]);

  /* Funciòn Que Tome Las Citas Actuales Y Agregue La Nueva Cita Entrante */
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  return (
    <Fragment>
      <h1>Administrador De Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>

          <div className="one-half column">
            2
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
