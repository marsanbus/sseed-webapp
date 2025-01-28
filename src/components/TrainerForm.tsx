import React, { useState } from 'react';

interface TrainerFormProps {
    onAddTrainer: (trainer: Trainer) => void;
    onClose: () => void;
}

interface Trainer {
    id: string;
    nombre: string;
    apellidos: string;
    correo: string;
    fechaNacimiento: string;
    titulacion: string;
}

const TrainerForm: React.FC<TrainerFormProps> = ({ onAddTrainer, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        correo: '',
        fechaNacimiento: '',
        titulacion: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTrainer = {
            ...formData,
            id: crypto.randomUUID(),
        };
        onAddTrainer(newTrainer);
        setFormData({
            nombre: '',
            apellidos: '',
            correo: '',
            fechaNacimiento: '',
            titulacion: '',
        });
    };

    const handleReset = () => {
        setFormData({
            nombre: '',
            apellidos: '',
            correo: '',
            fechaNacimiento: '',
            titulacion: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="mb-4">
                <label className="block text-[#dabf94] mb-2">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
                />
            </div>
            <div className="mb-4">
                <label className="block text-[#dabf94] mb-2">Apellidos</label>
                <input
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
                />
            </div>
            <div className="mb-4">
                <label className="block text-[#dabf94] mb-2">Correo</label>
                <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
                />
            </div>
            <div className="mb-4">
                <label className="block text-[#dabf94] mb-2">Fecha de Nacimiento</label>
                <input
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"/>
            </div>
            <div className="mb-4">
                <label className="block text-[#dabf94] mb-2">Titulación</label>
                <select
                    name="titulacion"
                    value={formData.titulacion}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]">
                    <option value="">Selecciona una titulación</option>
                    <option value="Fisioterapeuta">Fisioterapeuta</option>
                    <option value="CAFD">CAFD (Cinecias de la Actividad Física del Deporte)</option>
                    <option value="TSEAS">TSEAS (Técnico Superior en Enseñanza y Animación Sociodeportiva)</option>
                    <option value="Médico">Médico</option>
                    <option value="TAF">TAF (Técnico Superior de Acondicionamiento Físico)</option>
                    <option value="Otros">Otros</option>
                </select>
            </div>
            <button type="submit" className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors">
                Añadir
            </button>
            <button type="reset" onClick={handleReset} className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors ml-2">
                Limpiar
            </button>
            <button type="button" onClick={onClose} className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors ml-2">
                Volver
            </button>
        </form>
    );
};

export default TrainerForm;