import React from 'react';
import { PHYSICAL_PROFILE_QUESTIONS } from '../data/physicalProfile';

interface PhysicalProfileQuestionsProps {
  answers: Record<number, boolean>;
  onAnswerChange: (index: number, value: boolean) => void;
  onSubmit: () => void;
}

const PhysicalProfileQuestions: React.FC<PhysicalProfileQuestionsProps> = ({
  answers,
  onAnswerChange,
  onSubmit,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#3f3222] mb-6">Preguntas Perfil Físico</h2>
      <div className="space-y-4">
        {PHYSICAL_PROFILE_QUESTIONS.map((question, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-[#3f3222] mb-2">{question}</p>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input type="radio" name={`physical-question-${index}`} className="form-radio" onChange={() => onAnswerChange(index, true)} checked={answers[index] === true}/>
                <span className="ml-2 text-[#a1a48f]">Sí</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name={`physical-question-${index}`} className="form-radio" onChange={() => onAnswerChange(index, false)} checked={answers[index] === false}/>
                <span className="ml-2 text-[#a1a48f]">No</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-[#3f3222] mb-6'>Asignar Entrenador</h2>
        <select className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]'>
          <option value="">Selecciona un entrenador</option>
          <option value="Marcos">Marcos</option>
          <option value="Paula">Paula</option>
          <option value="Sergio">Sergio</option>
          <option value="Iker">Iker</option>
        </select>
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={onSubmit} className="bg-[#5a6b47] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-semibold">Registrar Usuario</button>
      </div>
    </div>
  );
};

export default PhysicalProfileQuestions;