import React, { useState } from 'react';
import TrainerForm from './TrainerForm';
import { Pencil, Trash } from 'lucide-react';
import male from '../assets/male.png';


interface Trainer {
    id: string;
    nombre: string;
    apellidos: string;
    correo: string;
    fechaNacimiento: string;
    titulacion: string[];
    foto?: string;
}

const Trainers: React.FC = () => {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);

    const handleAddTrainer = (trainer: Trainer) => {
        if (editingTrainer) {
        setTrainers(trainers.map(t => t.id === trainer.id ? trainer : t));
        setEditingTrainer(null);
        } else {
        setTrainers([...trainers, { ...trainer, foto: trainer.foto || male }]);
        }
        setShowForm(false);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingTrainer(null);
    };

    const handleEditTrainer = (trainer: Trainer) => {
        setEditingTrainer(trainer);
        setShowForm(true);
    };

    const handleDeleteTrainer = (trainerId: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este entrenador?')) {
        setTrainers(trainers.filter(trainer => trainer.id !== trainerId));
        }
    };

    return (
        <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#3f3222]">Entrenadores</h2>
            <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
            >
            {editingTrainer ? 'Editar Entrenador' : 'Añadir Entrenador'}
            </button>
        </div>
        {showForm && <TrainerForm onAddTrainer={handleAddTrainer} onClose={handleCloseForm} initialData={editingTrainer} />}
        <div className="space-y-2">
            {trainers.map((trainer) => (
            <div
                key={trainer.id}
                className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center"
            >
                <div className="flex items-center gap-4 text-[#3f3222]">
                <img src={trainer.foto || male} alt="Foto del entrenador" className="w-10 h-10 rounded-full" />
                <span className="font-semibold">{trainer.nombre} {trainer.apellidos}</span>
                <span className="text-[#a1a48f]">📚 {trainer.titulacion.join(', ')}</span>
                <span className="text-[#a1a48f]">✉️ {trainer.correo}</span>
                <span className="text-[#a1a48f]">📅 {new Date(trainer.fechaNacimiento).toLocaleDateString()}</span>
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
            ))}
        </div>
        </div>
    );
};

export default Trainers;
