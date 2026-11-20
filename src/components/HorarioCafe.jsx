import { useEffect, useState } from 'react';
import { cafe, DIAS, estadoCafe, textoTurnos } from '../data/cafe';
import './HorarioCafe.css';

// Lunes primero, domingo al final.
const ORDEN_DIAS = [1, 2, 3, 4, 5, 6, 0];

function useEstadoCafe() {
  const [estado, setEstado] = useState(() => estadoCafe());
  useEffect(() => {
    const id = setInterval(() => setEstado(estadoCafe()), 60_000);
    return () => clearInterval(id);
  }, []);
  return estado;
}

function Indicador({ abierto }) {
  return (
    <span className={`horario__estado ${abierto ? 'is-abierto' : 'is-cerrado'}`}>
      {abierto ? 'Abierto ahora' : 'Cerrado ahora'}
    </span>
  );
}

/**
 * `compacto`: solo el estado y el horario de hoy.
 * Sin `compacto`: tabla con la semana completa.
 */
function HorarioCafe({ compacto = false }) {
  const { abierto, horarioHoy, diaHoy } = useEstadoCafe();

  if (compacto) {
    return (
      <p className="horario horario--compacto">
        <Indicador abierto={abierto} />{' '}
        {horarioHoy ? `Hoy: ${textoTurnos(horarioHoy.turnos)}` : 'Hoy cerrado'}
      </p>
    );
  }

  return (
    <div className="horario">
      <Indicador abierto={abierto} />
      <table className="horario__tabla">
        <tbody>
          {ORDEN_DIAS.map((dia) => {
            const h = cafe.horarios.find((x) => x.dia === dia);
            return (
              <tr key={dia} className={dia === diaHoy ? 'is-hoy' : ''}>
                <th scope="row">{DIAS[dia]}</th>
                <td>{h ? textoTurnos(h.turnos) : 'Cerrado'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default HorarioCafe;
