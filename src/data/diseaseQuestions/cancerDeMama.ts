export const cancerDeMamaQuestions = [
    {
        question: '¿Recibes o has recibido tratamiento quirúrjico?',
        type: 'boolean',
        followUp: {
            yes: [
            {
                question: '¿Hace cuanto tiempo fué la cirujía?',
                type: 'selection',
                options: ['Hace menos de 1 mes', 'Entre 1 mes y 3 meses', '3-6 meses', '+ 6 meses']
            },
            { 
                question: '¿Qué tipo de cirujía?', 
                type: 'selection',
                options: ['Mastectomía unilateral', 'Mastectomía bilateral', 'Mastectomía profiáctica']
            },
            { 
                question: '¿Extirpaciones de ganglios o del ganglio centinela?', 
                type: 'boolean' 
            },
            ],
            no: [
            {
                question: '¿Está programado?',
                type: 'boolean',
                followUp: {
                    yes: [
                        {
                            question: '¿En cuánto tiempo?',
                            type: 'selection',
                            options: ['En menos de un mes', 'Entre 1 y 3 meses', 'De 3 a 6 meses', 'En más de 6 meses'],
                        },
                    ],
                    no: [],
                    },
                },
            ],
        },
    },
    {
        question: '¿Recibes o has recibido tratamiento NO quirúrjico?',
        type: 'boolean',
        followUp: {
            yes: [
                {
                    question: '¿Qué tratamientos recibes?',
                    type: 'multiple',
                    options: ['Quimioterapia', 'Radioterapia', 'Terapia dirigida', 'Terapia fotodinámica', 'Terapia de hipertermia', 'Transplante de células madre', 'Inmunoterápia', 'Terapia hormonal'],
                }
            ],
            no: [],
        }
    },
    {
        question: '¿Tienes algunos de los siguientes efectos secundarios?',
        type: 'multiple',
        options: ['Fatiga y cansancio', 'Náuseas y vómitos', 'Diarrea', 'Estreñimiento', 'Sequedad bucal', 'Anemia', 'Bajada de defensas', 'Hemorragias', 'Cardiotoxicidad inducida por quimioterapia', 'Falta de apetito', 'Cambios cutáneos', 'Neuropatía periférica']
    }
];