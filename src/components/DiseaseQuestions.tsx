import React from 'react';
import { hipertensionOPrehipertensionQuestions } from '../data/diseaseQuestions/hipertensionOPrehipertension';
import { diabetesMellitusTipo2Questions } from '../data/diseaseQuestions/diabetesMellitusTipo2';
import { cancerDeMamaQuestions } from '../data/diseaseQuestions/cancerDeMama';

interface DiseaseQuestionsProps {
  selectedDisease: string | null;
  formData: {
    specificAnswers: Record<string, any>;
  };
  handleSpecificAnswerChange: (question: string, value: any) => void;
  handleMultipleAnswerChange: (question: string, value: string) => void;
}

const DiseaseQuestions: React.FC<DiseaseQuestionsProps> = ({
  selectedDisease,
  formData,
  handleSpecificAnswerChange,
  handleMultipleAnswerChange,
}) => {
  const getSpecificQuestions = () => {
    switch (selectedDisease) {
      case 'Hipertensión o prehipertensión':
        return hipertensionOPrehipertensionQuestions;
      case 'Diabetes mellitus tipo 2':
        return diabetesMellitusTipo2Questions;
      case 'Cáncer de mama':
        return cancerDeMamaQuestions;
      default:
        return [];
    }
  };

  const renderFollowUpQuestions = (followUpQuestions: any[], parentIndex: number) => {
    return followUpQuestions.map((followUpQuestion, followUpIndex) => (
      <div key={`${parentIndex}_${followUpIndex}`} className="mb-4 ml-4 mt-2">
        <label className="block text-[#dabf94] mb-2">{followUpQuestion.question}</label>
        {followUpQuestion.type === 'boolean' ? (
          <div className="flex items-center mb-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                id={`followUpAnswer_${parentIndex}_${followUpIndex}_yes`}
                name={`followUpAnswer_${parentIndex}_${followUpIndex}`}
                value="yes"
                checked={formData.specificAnswers[followUpQuestion.question] === 'yes'}
                onChange={(e) => handleSpecificAnswerChange(followUpQuestion.question, e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-[#a1a48f]">Sí</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id={`followUpAnswer_${parentIndex}_${followUpIndex}_no`}
                name={`followUpAnswer_${parentIndex}_${followUpIndex}`}
                value="no"
                checked={formData.specificAnswers[followUpQuestion.question] === 'no'}
                onChange={(e) => handleSpecificAnswerChange(followUpQuestion.question, e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-[#a1a48f]">No</span>
            </label>
          </div>
        ) : followUpQuestion.type === 'selection' ? (
          <select
            name={`followUpAnswer_${parentIndex}_${followUpIndex}`}
            value={formData.specificAnswers[followUpQuestion.question] || ''}
            onChange={(e) => handleSpecificAnswerChange(followUpQuestion.question, e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
          >
            <option value="">Selecciona una opción</option>
            {followUpQuestion.options.map((option: string, optionIndex: number) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : followUpQuestion.type === 'multiple' ? (
          followUpQuestion.options.map((option: string, optionIndex: number) => (
            <div key={optionIndex} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`followUpAnswer_${parentIndex}_${followUpIndex}_${optionIndex}`}
                name={`followUpAnswer_${parentIndex}_${followUpIndex}`}
                value={option}
                checked={(formData.specificAnswers[followUpQuestion.question] || []).includes(option)}
                onChange={(e) => handleMultipleAnswerChange(followUpQuestion.question, e.target.value)}
                className="mr-2"
              />
              <label htmlFor={`followUpAnswer_${parentIndex}_${followUpIndex}_${optionIndex}`} className="text-[#3f3222]">
                {option}
              </label>
            </div>
          ))
        ) : (
          <input
            type="text"
            name={`followUpAnswer_${parentIndex}_${followUpIndex}`}
            value={formData.specificAnswers[followUpQuestion.question] || ''}
            onChange={(e) => handleSpecificAnswerChange(followUpQuestion.question, e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
          />
        )}
      </div>
    ));
  };

  return (
    <div className="mb-4">
      <label className="block text-[#dabf94] mb-2">Preguntas Específicas</label>
      {getSpecificQuestions().map((questionObj, index) => (
        <div key={index} className="mb-4">
          <label className="block text-[#dabf94] mb-2">{questionObj.question}</label>
          {questionObj.type === 'boolean' ? (
            <div className="flex items-center mb-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id={`specificAnswer_${index}_yes`}
                  name={`specificAnswer_${index}`}
                  value="yes"
                  checked={formData.specificAnswers[questionObj.question] === 'yes'}
                  onChange={(e) => handleSpecificAnswerChange(questionObj.question, e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2 text-[#a1a48f]">Sí</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id={`specificAnswer_${index}_no`}
                  name={`specificAnswer_${index}`}
                  value="no"
                  checked={formData.specificAnswers[questionObj.question] === 'no'}
                  onChange={(e) => handleSpecificAnswerChange(questionObj.question, e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2 text-[#a1a48f]">No</span>
              </label>
            </div>
          ) : questionObj.type === 'multiple' ? (
            questionObj.options.map((option: string, optionIndex: number) => (
              <div key={optionIndex} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`specificAnswer_${index}_${optionIndex}`}
                  name={`specificAnswer_${index}`}
                  value={option}
                  checked={(formData.specificAnswers[questionObj.question] || []).includes(option)}
                  onChange={(e) => handleMultipleAnswerChange(questionObj.question, e.target.value)}
                  className="mr-2"
                />
                <label htmlFor={`specificAnswer_${index}_${optionIndex}`} className="text-[#3f3222]">
                  {option}
                </label>
              </div>
            ))
          ) : (
            <input
              type="text"
              name={`specificAnswer_${index}`}
              value={formData.specificAnswers[questionObj.question] || ''}
              onChange={(e) => handleSpecificAnswerChange(questionObj.question, e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
            />
          )}
          {questionObj.followUp && formData.specificAnswers[questionObj.question] === 'yes' && (
            <div className="ml-4 mt-2">
              {renderFollowUpQuestions(questionObj.followUp.yes, index)}
            </div>
          )}
          {questionObj.followUp && formData.specificAnswers[questionObj.question] === 'no' && (
            <div className="ml-4 mt-2">
              {renderFollowUpQuestions(questionObj.followUp.no, index)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DiseaseQuestions;