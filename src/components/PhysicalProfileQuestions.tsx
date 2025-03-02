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
    </div>
  );
};

export default PhysicalProfileQuestions;