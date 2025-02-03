interface DiseaseMap {
  [key: string]: string[];
}

interface TreatmentMap {
  [key: string]: string[];
}

interface SideEffectMap {
  [key: string]: string[];
}

export const diseases: DiseaseMap = {
  'Enfermedades del sistema circulatorio': [
    'Hipertensión o prehipertensión',
    'Prehipertensión',
    'Hipertensión arterial pulmonar',
    'Enfermedades cardiovasculares',
  ],
  'Enfermedades endocrinas, nutricionales o metabólicas': [
    'Hipercolesterolemia/Dislipemia',
    'Pre Diabetes',
    'Diabetes mellitus tipo 1',
    'Diabetes mellitus tipo 2',
    'Sindrome metabólico',
  ],
  'Enfermedades del sistema respiratorio': [
    'Enfermedad pulmonar obstructiva crónica (EPOC)',
    'Asma',
    'Enfermedad pulmonar intersticial',
    'Fibrosis quística',
  ],
  'Enfermedades del sistema musculo esquelético o del tejido conjuntivo': [
    'Osteopenia',
    'Osteoporosis',
    'Artritis reumatoide',
    'Distrofia muscular',
  ],
  'Procesos oncológicos': [
    'Cáncer de mama',
    'Cáncer de pulmon',
    'Cáncer del colon',
    'Cáncer del recto',
    'Cáncer colorrectal',
    'Cáncer de la prostata',
    'Cáncer del estomago',
    'Cáncer del riñon',
    'Sarcoma',
  ],
  'Enfermedades del sistema nervioso': [
    'Enfermedad de Parkinson',
    'Esclerosis múltiple',
  ],
  'Transtornos neurocognitivos': [
    'Demencia',
    'Trastorno neurocognitivo leve',
  ],
  'Enfermedades cerebrovasculares': ['Ictus'],
  'Insuficiencia Renal': [
    'Insuficiencia renal aguda',
    'Enfermedad renal crónica',
  ],
};

export const treatments: TreatmentMap = {
  'Hipertensión o prehipertensión': [
    'Diuréticos/Tiazidas',
    'Bloqueadores beta no selectivos',
    'Bloqueadores beta selectivos',
    'Inhibidores de la enzima convertidora de angiotensina (IECA)',
    'Antagonistas del calcio',
    'Bloqueadores alfa',
    'Antagonistas de los receptores de la angiotensina II (ARA II)',
  ],
};

export const sideEffects: SideEffectMap = {
  'Hipertensión o prehipertensión': [
    'Cansancio/fatiga',
    'Mareos/Sofocos',
    'Calambres/Debilidad muscular',
    'Fragilidad diagnosticada',
    'Hipotensión ortostática',
    'Alta frecuencia urinaria',
  ],
  'Prehipertensión': [
    'Si ves esto, está bien',
  ],
  'Asma': [
    'Tos',
    'Disnea',
    'Sibilancias',
    'Opresión torácica',
    'Dolor torácico',
    'Fatiga',
  ]
};

export const PAR_Q_QUESTIONS = [
  'Es usted mayor de 69 años y no está acostumbrado a realizar ejercicio físico (como por ejemplo cabar, andar rápido, hacer algún tipo de deporte individual o colectivo, actividades dirigidas…).',
  '¿Le ha dicho su médico alguna vez que padece una enfermedad cardiaca y que sólo debe hacer aquella actividad física que le aconseje un médico?',
  '¿Tiene dolor en el pecho cuando hace actividad física (dar un paseo, subir escaleras, ir a hacer la compra...)?',
  'En el último mes, ¿ha tenido dolor en el pecho cuando no hacía actividad física?',
  '¿Pierde el equilibrio debido a mareos o se ha desmayado alguna vez?',
  '¿Tiene problemas en huesos o articulaciones (por ejemplo, espalda, rodilla o cadera) que puedan empeorar si aumenta la actividad física?',
  '¿Le receta su médico algún medicamento para la tensión arterial o un problema cardíaco?',
  '¿Conoce alguna razón por la cual no debería realizar actividad física?',
];