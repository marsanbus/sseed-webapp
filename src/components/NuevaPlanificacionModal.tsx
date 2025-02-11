import React, { useState } from 'react';

interface NuevaPlanificacionModalProps {
  onClose: () => void;
  onAceptar: () => void; // Nueva prop
}

const NuevaPlanificacionModal: React.FC<NuevaPlanificacionModalProps> = ({ onClose, onAceptar }) => {
  const [ultimoTratamiento, setUltimoTratamiento] = useState<string>('');
  const [estadoHoy, setEstadoHoy] = useState<number | null>(null);
  const [tiempoHoy, setTiempoHoy] = useState<string>('');

  const handleAceptar = () => {
    // Aquí puedes manejar la lógica para guardar las respuestas
    console.log({ ultimoTratamiento, estadoHoy, tiempoHoy });
    onAceptar(); // Ejecutar la función onAceptar
    onClose(); // Cerrar el modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <div className="mb-6 flex justify-center">
          <h2 className="text-xl font-bold mb-4">Preguntas Diarias</h2>
        </div>

        {/* Pregunta 1 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">¿Cuándo recibiste tratamiento por última vez?</label>
          <select
            value={ultimoTratamiento}
            onChange={(e) => setUltimoTratamiento(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Selecciona una opción</option>
            <option value="Hace -12h">Hace -12h</option>
            <option value="12-24h">12-24h</option>
            <option value="24-48h">24-48h</option>
            <option value="48-72h">48-72h</option>
            <option value="más 72h">más 72h</option>
          </select>
        </div>

        {/* Pregunta 2 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">¿Cómo te encuentras hoy?</label>
          <div className="flex justify-between">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-sm mb-1">{i + 1}</span> {/* Número encima del radio */}
                <input
                  type="radio"
                  name="estadoHoy"
                  value={i + 1}
                  checked={estadoHoy === i + 1}
                  onChange={() => setEstadoHoy(i + 1)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pregunta 3 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">¿Cuánto tiempo tienes hoy?</label>
          <select
            value={tiempoHoy}
            onChange={(e) => setTiempoHoy(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Selecciona una opción</option>
            <option value="30">30 minutos</option>
            <option value="45">45 minutos</option>
            <option value="60">60 minutos</option>
            <option value="90">90 minutos</option>
          </select>
        </div>

        {/* Botón de Aceptar (centrado) */}
        <div className="flex justify-center">
          <button
            onClick={handleAceptar}
            className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NuevaPlanificacionModal;