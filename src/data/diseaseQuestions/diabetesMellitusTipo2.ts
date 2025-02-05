export const diabetesMellitusTipo2Questions = [
    {
        question: '¿Tomas algún medicamento?',
        type: 'boolean',
        followUp: {
            yes: [
                {
                    question: 'Selecciona uno de los siguientes:',
                    type: 'multiple',
                    options: ['Gliburida', 'Glipizida', 'Glimepirida', 'Nateglinida', 'Repaglinida']
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
                        options: ['Retinopatía diabética', 'Neuropatía periférica', 'Neuropatía autónoma'],
                    },
                ],
            no: [],
        }
    }
];