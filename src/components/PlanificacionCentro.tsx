import React from 'react';

const PlanificacionCentro: React.FC = () => {
  return (
    <div className="flex w-full h-full">
      {/* Recuadro de fechas a la izquierda */}
      <div className="w-1/4 bg-gray-200 p-4 rounded-lg h-full flex flex-col items-center justify-center">
        <div className="text-center">
          {/* Contenido de fechas */}
          <p className="text-gray-600">Fechas disponibles</p>
        </div>
      </div>

      {/* Espacio para el botón de nueva planificación */}
      <div className="flex-grow flex items-center justify-center">
        <button className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg">
          Nueva planificación
        </button>
      </div>
    </div>
  );
};

export default PlanificacionCentro;