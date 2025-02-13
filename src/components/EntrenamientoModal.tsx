import React, { useState } from 'react';
import PlanificacionCentro from './PlanificacionCentro';
import PlanificacionCasa from './PlanificacionCasa';
import ConsideracionesContraindicaciones from './ConsideracionesContraindicaciones';

interface EntrenamientoModalProps {
  onClose: () => void;
  user: {
    nombre: string;
    apellidos: string;
    disease: string;
  };
}

const EntrenamientoModal: React.FC<EntrenamientoModalProps> = ({ onClose, user }) => {
  const [selectedTab, setSelectedTab] = useState<string>('Planificacion Supervisada');

  const tabs = ['Planificacion Supervisada', 'Planificacion No Supervisada', 'Consideraciones y contraindicaciones'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-full max-w-7xl bg-white p-8 rounded-lg h-[90vh] my-4 relative">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-black">{user.nombre} {user.apellidos}</h2>
          <p className="text-lg text-[#a1a48f]">{user.disease}</p>
        </div>
        <div className="flex space-x-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-grow text-lg font-semibold text-[#3f3222] ${selectedTab === tab ? 'border-b-2 border-[#3f3222]' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-grow h-[calc(100%-10rem)]">
          {selectedTab === 'Planificacion Supervisada' && <PlanificacionCentro />}
          {selectedTab === 'Planificacion No Supervisada' && <PlanificacionCasa />}
          {selectedTab === 'Consideraciones y contraindicaciones' && <ConsideracionesContraindicaciones />}
        </div>
        <div className="absolute bottom-5 right-5 flex space-x-4">
          <button
            onClick={onClose}
            className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg"
          >
            Aceptar
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntrenamientoModal;