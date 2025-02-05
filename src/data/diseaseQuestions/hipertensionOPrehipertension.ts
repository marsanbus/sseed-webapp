export const hipertensionOPrehipertensionQuestions = [
    {
        question: '¿Tomas algún medicamento?',
        type: 'boolean',
        followUp: {
            yes: [
                {
                    question: '¿Cuándo comenzaste con el tratamiento?',
                    type: 'selection',
                    options: ['Hace menos de 1 mes', 'Entre 1 mes y 3 meses', 'De 3 a 6 meses', 'Más de 6 meses']
                },
                {
                    question: 'Selecciona uno de los siguientes:',
                    type: 'multiple',
                    options: ['Diuréticos/Tiazidas', 'Bloqueadores beta no selectivos', 'Bloqueadores beta selectivos', 'Inhibidores de la enzima convertidora de angiotensina (IECA)', 'Antagonistas del calcio', 'Bloqueadores alfa', 'Antagonistas de los receptores de la angiotensina II (ARA II)']
                }
            ],
            no: [],
        }
    },
    {
        question: '¿Tienes algún efecto secundario?',
        type: 'boolean',
        followUp: {
            yes: [
                {
                    question: 'Selecciona uno de los siguientes:',
                    type: 'multiple',
                    options: ['Cansancio/fatiga', 'Mareos/Sofocos', 'Calambres/Debilidad muscular', 'Fragilidad diagnosticada', 'Hipotensión ortostática', 'Alta frecuencia urinaria']
                },
            ],
            no: [],
        }
    }
];