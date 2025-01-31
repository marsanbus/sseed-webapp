import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { PAR_Q_QUESTIONS } from '../data/medical';
import Modal from './Modal';

const MedicalAuthorization = () => {
  const [hasAuthorization, setHasAuthorization] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showModal, setShowModal] = useState(false);

  const handleAnswerChange = (questionIndex: number, value: boolean) => {
    const newAnswers = { ...answers, [questionIndex]: value };
    setAnswers(newAnswers);

    // Check if any answer is YES
    if (value && !showModal) {
      setShowModal(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-[#dabf94] mb-2">¿Tienes autorización médica?</label>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input type="radio" name="hasAuthorization" className="form-radio" onChange={() => setHasAuthorization(true)} checked={hasAuthorization === true}/>
            <span className="ml-2 text-[#a1a48f]">Sí</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="hasAuthorization" className="form-radio" onChange={() => setHasAuthorization(false)} checked={hasAuthorization === false}/>
            <span className="ml-2 text-[#a1a48f]">No</span>
          </label>
        </div>
      </div>

      {hasAuthorization === true && (
        <div className="border-2 border-dashed border-[#dabf94] rounded-lg p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-[#dabf94] mb-4" />
          <p className="text-[#a1a48f]">Por favor, adjunta tu autorización médica aquí</p>
          <input type="file" className="hidden" />
        </div>
      )}

      {hasAuthorization === false && (
        <div className="space-y-6">
          <p className="text-[#a1a48f] italic bg-white p-4 rounded-lg shadow-sm">
            Con las respuestas que usted proporcione, el resultado del cuestionario le indicará si puede comenzar con el programa, de una forma razonablemente segura, o si debería consultar con su médico antes de iniciarse. El sentido común es la mejor guía para contestar a estas preguntas. Por favor, léalas cuidadosamente y conteste a cada una con honestidad: Indique SI o NO
          </p>
          <div className="space-y-4">
            {PAR_Q_QUESTIONS.map((question, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-[#3f3222] mb-2">{question}</p>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input type="radio" name={`question-${index}`} className="form-radio" onChange={() => handleAnswerChange(index, true)} checked={answers[index] === true}/>
                    <span className="ml-2 text-[#a1a48f]">Sí</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name={`question-${index}`} className="form-radio" onChange={() => handleAnswerChange(index, false)} checked={answers[index] === false}/>
                    <span className="ml-2 text-[#a1a48f]">No</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#3f3222] mb-4">Autorización Médica Requerida</h3>
          <p className="text-[#a1a48f] mb-4">Para poder proseguir con la planificación de ejercicio físico, necesitas una autorización médica. Si ya dispones de ella adjuntala en el apartado correspondiente, en caso contrario ponte en contacto con tu médico de cabecera.</p>
          <button onClick={() => setShowModal(false)} className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">Entendido</button>
        </div>
      </Modal>
    </div>
  );
};

export default MedicalAuthorization;