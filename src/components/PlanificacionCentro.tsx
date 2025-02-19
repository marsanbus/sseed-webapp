import React, { useState, useEffect } from 'react';
import NuevaPlanificacionModal from './NuevaPlanificacionModal';

const PlanificacionCentro: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [openMenuLeft, setOpenMenuLeft] = useState<string | null>(null);
  const [openMenuRight, setOpenMenuRight] = useState<string[]>(['menuRight0', 'menuRight1']); // Inicialmente desplegadas
  const [showColumns, setShowColumns] = useState<boolean>(true); // Estado para controlar la visibilidad de las columnas
  const [showContinueButton, setShowContinueButton] = useState<boolean>(false); // Estado para controlar la visibilidad del botón Continuar

  // Definir los nombres de las categorías
  const categorias = [
    'Aeróbico Inicial',
    'Movilidad',
    'Fuerza',
    'Neuromotor',
    'Flexibilidad',
    'Aeróbico Final',
    'Cooldown',
  ];

  // Definir los ejercicios para cada categoría (sin códigos) con series/repeticiones o tiempo
  const ejerciciosPorCategoria = {
    'Aeróbico Inicial': [
      { nombre: 'Bicicleta estática vertical', detalle: '20 minutos' },
      { nombre: 'Bici reclinada', detalle: '20 minutos' },
      { nombre: 'Cinta de caminar', detalle: '20 minutos' },
      { nombre: 'Remo', detalle: '20 minutos' },
      { nombre: 'Elíptica', detalle: '20 minutos' },
      { nombre: 'Stepmill', detalle: '20 minutos' },
      { nombre: 'Skierg', detalle: '20 minutos' },
    ],
    'Movilidad': [
      { nombre: 'Escapular', detalle: '2x12' },
      { nombre: 'Hombros', detalle: '2x12' },
      { nombre: 'Codo', detalle: '2x12' },
      { nombre: 'Muñeca', detalle: '2x12' },
      { nombre: 'Cuello', detalle: '2x12' },
      { nombre: 'Cadera', detalle: '2x12' },
      { nombre: 'Rodilla', detalle: '2x12' },
      { nombre: 'Tobillo', detalle: '2x12' },
    ],
    'Fuerza': [
      { nombre: 'Sentadilla', detalle: '3x10' },
      { nombre: 'Puntillas', detalle: '3x15' },
      { nombre: 'Zancada', detalle: '3x12' },
      { nombre: 'Hip Thrust', detalle: '3x10' },
      { nombre: 'Flexión/pecho', detalle: '3x12' },
      { nombre: 'Hombros', detalle: '3x12' },
    ],
    'Neuromotor': [
      { nombre: 'Equilibrio', detalle: '2x30 segundos' },
      { nombre: 'Coordinación', detalle: '2x30 segundos' },
      { nombre: 'Propiocepción', detalle: '2x30 segundos' },
      { nombre: 'Agilidad', detalle: '2x30 segundos' },
    ],
    'Flexibilidad': [
      { nombre: 'Flexibilidad Tren Superior', detalle: '2x30 segundos' },
      { nombre: 'Flexibilidad Tren Inferior', detalle: '2x30 segundos' },
    ],
    'Aeróbico Final': [
      { nombre: 'Bicicleta estática vertical', detalle: '10 minutos' },
      { nombre: 'Bici reclinada', detalle: '10 minutos' },
      { nombre: 'Cinta de caminar', detalle: '10 minutos' },
      { nombre: 'Remo', detalle: '10 minutos' },
      { nombre: 'Elíptica', detalle: '10 minutos' },
      { nombre: 'Stepmill', detalle: '10 minutos' },
      { nombre: 'Skierg', detalle: '10 minutos' },
    ],
    'Cooldown': [
      { nombre: 'Cool Down', detalle: '5 minutos' },
    ],
  };

  const handleMenuClickLeft = (menu: string) => {
    setOpenMenuLeft(openMenuLeft === menu ? null : menu);
  };

  const handleMenuClickRight = (menu: string) => {
    setOpenMenuRight(openMenuRight.includes(menu) ? openMenuRight.filter(m => m !== menu) : [...openMenuRight, menu]);
  };

  const handleAceptar = () => {
    setShowForm(true); // Mostrar el formulario después de aceptar
    setShowModal(false); // Cerrar el modal
    setShowContinueButton(true); // Mostrar el botón Continuar después de cerrar el modal de las preguntas diarias
  };

  // Filtrar las categorías para la columna derecha
  const categoriasDerecha = ['Aeróbico Inicial', 'Fuerza'];

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-grow">
        {/* Recuadro de fechas a la izquierda */}
        <div className="w-1/4 bg-gray-200 p-4 rounded-lg h-full flex flex-col items-center justify-center">
          <div className="text-center">
            {/* Contenido de fechas */}
            <p className="text-gray-600">Fechas disponibles</p>
          </div>
        </div>

        {/* Espacio para el botón de nueva planificación o el formulario */}
        <div className="flex-grow flex items-center justify-center">
          {!showForm ? (
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg"
            >
              Nueva planificación
            </button>
          ) : showColumns ? (
            <div className="flex w-full">
              <div className="w-1/2 p-4">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-[#3f3222] flex justify-center">Resto de ejercicios</h2>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-96">
                  {categorias.map((categoria, index) => (
                    <div key={index}>
                      <button
                        onClick={() => handleMenuClickLeft(`menuLeft${index}`)}
                        className="w-full flex justify-between items-center p-2 bg-gray-200 rounded-lg"
                      >
                        <span>{categoria}</span>
                        {/* Flecha que cambia según el estado del menú */}
                        <span className="transform transition-transform duration-200">
                          {openMenuLeft === `menuLeft${index}` ? '▲' : '▼'}
                        </span>
                      </button>
                      {openMenuLeft === `menuLeft${index}` && (
                        <div className="p-2 bg-gray-100 mt-1 rounded-lg space-y-2">
                          {ejerciciosPorCategoria[categoria].map((ejercicio, i) => (
                            <div key={i} className="flex justify-between items-center text-sm text-gray-700">
                              <div>
                                {ejercicio.nombre} <span className="text-gray-500">({ejercicio.detalle})</span>
                              </div>
                              <input
                                type="checkbox"
                                defaultChecked // Checkbox marcado por defecto
                                className="ml-2 form-checkbox h-4 w-4 text-[#5a6b47] rounded"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-1/2 p-4">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-[#3f3222] flex justify-center">Entrenamiento Recomendado</h2>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-96">
                  {categoriasDerecha.map((categoria, index) => (
                    <div key={index}>
                      <button
                        onClick={() => handleMenuClickRight(`menuRight${index}`)}
                        className="w-full flex justify-between items-center p-2 bg-gray-200 rounded-lg"
                      >
                        <span>{categoria}</span>
                        {/* Flecha que cambia según el estado del menú */}
                        <span className="transform transition-transform duration-200">
                          {openMenuRight.includes(`menuRight${index}`) ? '▲' : '▼'}
                        </span>
                      </button>
                      {openMenuRight.includes(`menuRight${index}`) && (
                        <div className="p-2 bg-gray-100 mt-1 rounded-lg space-y-2">
                          {ejerciciosPorCategoria[categoria].map((ejercicio, i) => (
                            <div key={i} className="flex justify-between items-center text-sm text-gray-700">
                              <div>
                                {ejercicio.nombre} <span className="text-gray-500">({ejercicio.detalle})</span>
                              </div>
                              <input
                                type="checkbox"
                                defaultChecked // Checkbox marcado por defecto
                                className="ml-2 form-checkbox h-4 w-4 text-[#5a6b47] rounded"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full overflow-y-auto max-h-96">
              <div className="w-full p-4">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-[#3f3222] flex justify-center">Aeróbico Inicial</h2>
                </div>
                <div className="space-y-2">
                  <div>
                    <button
                      onClick={() => handleMenuClickRight('menuRight0')}
                      className="w-full flex justify-between items-center p-2 bg-gray-200 rounded-lg"
                    >
                      <span>Aeróbico Inicial</span>
                      <span className="transform transition-transform duration-200">
                        {openMenuRight.includes('menuRight0') ? '▲' : '▼'}
                      </span>
                    </button>
                    {openMenuRight.includes('menuRight0') && (
                      <div className="p-2 bg-gray-100 mt-1 rounded-lg space-y-2">
                        {ejerciciosPorCategoria['Aeróbico Inicial'].map((ejercicio, i) => (
                          <div key={i} className="flex justify-between items-center text-sm text-gray-700">
                            <div>
                              {ejercicio.nombre} <span className="text-gray-500">({ejercicio.detalle})</span>
                            </div>
                            <input
                              type="checkbox"
                              defaultChecked // Checkbox marcado por defecto
                              className="ml-2 form-checkbox h-4 w-4 text-[#5a6b47] rounded"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full p-4">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-[#3f3222] flex justify-center">Fuerza</h2>
                </div>
                <div className="space-y-2">
                  <div>
                    <button
                      onClick={() => handleMenuClickRight('menuRight1')}
                      className="w-full flex justify-between items-center p-2 bg-gray-200 rounded-lg"
                    >
                      <span>Fuerza</span>
                      <span className="transform transition-transform duration-200">
                        {openMenuRight.includes('menuRight1') ? '▲' : '▼'}
                      </span>
                    </button>
                    {openMenuRight.includes('menuRight1') && (
                      <div className="p-2 bg-gray-100 mt-1 rounded-lg space-y-2">
                        {ejerciciosPorCategoria['Fuerza'].map((ejercicio, i) => (
                          <div key={i} className="flex justify-between items-center text-sm text-gray-700">
                            <div>
                              {ejercicio.nombre} <span className="text-gray-500">({ejercicio.detalle})</span>
                            </div>
                            <input
                              type="checkbox"
                              defaultChecked // Checkbox marcado por defecto
                              className="ml-2 form-checkbox h-4 w-4 text-[#5a6b47] rounded"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showColumns && showContinueButton && (
        <div className="flex justify-center mt-4 absolute bottom-4 w-full">
          <button
            onClick={() => setShowColumns(false)}
            className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg"
          >
            Continuar
          </button>
        </div>
      )}

      {/* Modal de Nueva Planificación */}
      {showModal && <NuevaPlanificacionModal onClose={() => setShowModal(false)} onAceptar={handleAceptar} />}
    </div>
  );
};

export default PlanificacionCentro;