import { Fragment, useState, useEffect } from 'react';

import Cita from './Components/Cita';
import Formulario from './Components/Formulario';

function App() {

  /* Citas Desde El LocalStora */
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  
  if(!citasIniciales) {
    citasIniciales = [];
  }

  /* State Del Arreglo De Las Citas Creadas */
  const [citas, guardarCitas] = useState(citasIniciales);

  /* Use Effect Para Realizar Ciertas Operaciones Cuando El State Cambia
    O Se Carga Un Componente Por Primera Vez (Muy Similar Al DOMContenLoaded() JS) */

  /* El Objetivo Es Agregar Y Eliminar Citas Del LocalStorage, Es Decir, Cada Vez Que El
    State De citas Cambie Y Para Ello Es El Arreglo Que Tiene El useEffect, Se Conoce Como
    Dependencia, Va A Ser Muy Útil Porque Cada Vez Que Cambie El State De citas, El
    useEffect Se Ejecuta Nuevamente */
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]); // DEPENDENCIA

  /* Funciòn Que Tome Las Citas Actuales Y Agregue La Nueva Cita Entrante */
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  /* Función Para Eliminar Una Cita */
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  /* Mensaje Condicional */
  const titulo = citas.length === 0 ? 'No Hay Citas Registradas' : 'Administra Tus Citas';

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
            <h2>{titulo}</h2>

            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
