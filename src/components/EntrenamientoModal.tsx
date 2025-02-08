import React, { useState } from 'react';

interface EntrenamientoModalProps {
  onClose: () => void;
}

const EntrenamientoModal: React.FC<EntrenamientoModalProps> = ({ onClose }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

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

  const handleMenuClick = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-11/12 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Entrenamiento</h2>
        <div className="space-y-2">
          {categorias.map((categoria, index) => (
            <div key={index}>
              <button
                onClick={() => handleMenuClick(`menu${index}`)}
                className="w-full flex justify-between items-center p-2 bg-gray-200 rounded-lg"
              >
                <span>{categoria}</span>
                {/* Flecha que cambia según el estado del menú */}
                <span className="transform transition-transform duration-200">
                  {openMenu === `menu${index}` ? '▲' : '▼'}
                </span>
              </button>
              {openMenu === `menu${index}` && (
                <div className="p-2 bg-gray-100 mt-1 rounded-lg">
                  Contenido del menú: <strong>{categoria}</strong>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-[#5a6b47] text-white px-4 py-2 rounded-lg"
        >
          Aceptar
        </button>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default EntrenamientoModal;