import { Fragment, useState } from 'react';
import uuid from 'uuid/dist/v4';

/* Para Documentar Componentes */
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    /* Crear State De Citas */
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    /* Crear State De Errores */
    const [error, actualizarError] = useState(false);

    /* Funciòn Que Se Ejecuta Cada Vez Que Un Usuario Escribe En Un Input */
    const actualizarState = e => { 
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    }

    const { mascota, propietario, fecha, hora, sintomas } = cita; 

    /* Cunado El Usuario Presiona Enviar O Agregar Cita */
    const submitCita = e => {
        e.preventDefault();

        /* Validar */
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' 
                                 || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true);
            return;
        }

        /* Eliminar El Mensaje Previo(En Caso Tal De Que Exista) */
        actualizarError(false);

        /* Asignar Un ID */
        cita.id = uuid();

        /* Crear La Cita */
        crearCita(cita);

        /* Reiniciar El Form */
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }


    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error">Todos Los Campos Son Obligatorios</p> : null}

            <form
                onSubmit={submitCita} 
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño De La Mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width" 
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}

/* Para Documentar Componentes */
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;