import React, { useState, useEffect } from 'react';
import { Pencil, Trash } from 'lucide-react';
import male from '../assets/male.png';
import TrainerForm from './TrainerForm';
import EditTrainerModal from './EditTrainerModal'; // Importa el nuevo modal

interface Trainer {
    id: string;
    nombre: string;
    apellidos: string;
    correo: string;
    fechaNacimiento: string;
    titulacion: string[];
    foto?: string;
    password?: string;
}

const Trainers: React.FC = () => {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para controlar el modal de edición

    const handleAddTrainer = (trainer: Trainer) => {
        if (editingTrainer) {
            setTrainers(trainers.map(t => t.id === trainer.id ? trainer : t));
            setEditingTrainer(null);
        } else {
            setTrainers([...trainers, { ...trainer, foto: trainer.foto || male }]);
        }
        setShowForm(false);
        console.log('Nuevo entrenador añadido:', trainer);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingTrainer(null);
    };

    const handleEditTrainer = (trainer: Trainer) => {
        setEditingTrainer(trainer);
        setIsEditModalOpen(true); // Abrir el modal de edición
    };

    const handleDeleteTrainer = async (trainerId: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este profesional?')) {
          try {
            const response = await fetch(`http://localhost:5000/api/trainers/${trainerId}`, {
              method: 'DELETE',
            });
            if (response.ok) {
              setTrainers(trainers.filter(trainer => trainer.id !== trainerId));
              console.log('Entrenador eliminado:', trainerId);
            } else {
              console.error('Error al eliminar el entrenador');
            }
          } catch (error) {
            console.error('Error de red:', error);
          }
        }
      };

    const handleUpdateTrainer = async (updatedTrainer: Trainer) => {
        try {
            const response = await fetch(`http://localhost:5000/api/trainers/${updatedTrainer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTrainer),
            });

            if (response.ok) {
                setTrainers(trainers.map(trainer => trainer.id === updatedTrainer.id ? updatedTrainer : trainer));
                setIsEditModalOpen(false); // Cerrar el modal después de la actualización
            } else {
                console.error('Error al actualizar el entrenador');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/trainers');
                if (response.ok) {
                    const data = await response.json();
                    console.log('Datos de entrenadores:', data);
                    const mappedData = data.map((trainer: any) => ({
                        id: trainer.id,
                        nombre: trainer.nombre,
                        apellidos: trainer.apellidos,
                        correo: trainer.correo,
                        password: trainer.password,
                        fechaNacimiento: trainer.Fecha_nacimiento,
                        titulacion: [
                            trainer.Fisioterapeuta && 'Fisioterapeuta',
                            trainer.CAFD && 'CAFD',
                            trainer.TSEAS && 'TSEAS',
                            trainer.Medico && 'Médico',
                            trainer.TAF && 'TAF',
                            trainer.Otros && 'Otros'
                        ].filter(Boolean),
                        foto: trainer.foto,
                    }));
                    setTrainers(mappedData);
                } else {
                    console.error('Error al obtener los entrenadores');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        fetchTrainers();
    }, []);

    return (
        <div className="flex-1 p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#3f3222]">Profesionales</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors">
                    {editingTrainer ? 'Editar Profesional' : 'Añadir Profesional'}
                </button>
            </div>
            {showForm && <TrainerForm onAddTrainer={handleAddTrainer} onClose={handleCloseForm} initialData={editingTrainer} />}
            <div className="space-y-2">
                {trainers.map((trainer) => (
                    <div
                        key={trainer.id}
                        className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center">
                        <div className="flex items-center gap-4 text-[#3f3222] w-full">
                            <img src={trainer.foto || male} alt="Foto del profesional" className="w-10 h-10 rounded-full" />
                            <div className="flex-1 flex items-center gap-4 overflow-hidden">
                                <div className="w-2/6 truncate border-r pr-4">
                                    <span className="font-semibold truncate">{trainer.nombre} {trainer.apellidos}</span>
                                </div>
                                <div className="w-2/6 truncate border-r pr-4">
                                    <span className="text-[#a1a48f] truncate">📚 {trainer.titulacion?.join(', ')}</span>
                                </div>
                                <div className="w-1/6 truncate border-r pr-4">
                                    <span className="text-[#a1a48f] truncate">✉️ {trainer.correo}</span>
                                </div>
                                <div className="w-1/6 truncate">
                                    <span className="text-[#a1a48f] truncate">📅 {new Date(trainer.fechaNacimiento).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEditTrainer(trainer)}
                                    className="text-[#5a6b47] hover:text-opacity-80 transition-colors"
                                >
                                    <Pencil className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDeleteTrainer(trainer.id)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Renderizar el modal de edición si isEditModalOpen es true */}
            {isEditModalOpen && editingTrainer && (
                <EditTrainerModal
                    trainer={editingTrainer}
                    onUpdate={handleUpdateTrainer}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Trainers;