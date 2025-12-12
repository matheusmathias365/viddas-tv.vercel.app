import { LayoutType, SlideData } from './types';

export const SLIDE_DURATION_MS = 15000; 

export const TICKER_MESSAGES = [
  "WI-FI GRATUITO: Rede 'Viddas_Cliente' | Senha: saude",
  "Acesse seus resultados online em: www.clinicaviddas.com.br",
  "Por favor, mantenha o silêncio na sala de espera.",
  "Água e café disponíveis na recepção para seu conforto.",
  "Agende seus exames pelo WhatsApp: (75) 3182-5656.",
  "Realizamos Ressonância, Tomografia e Mamografia Digital.",
  "Dica: Beba água antes da sua ultrassonografia pélvica.",
];

export const SLIDES: SlideData[] = [
  {
    id: 1,
    layout: LayoutType.SPLIT_LEFT, // Alterado para Split para usar o efeito de piscar nas especialidades
    title: "Nossas Especialidades",
    subtitle: "Corpo Clínico",
    description: "Contamos com uma equipe multidisciplinar altamente qualificada para atender você.",
    items: [
      "CARDIOLOGIA",
      "GINECOLOGIA",
      "PEDIATRIA",
      "ORTOPEDIA",
      "ANGIOLOGIA",
      "CLÍNICA MÉDICA",
      "DERMATOLOGIA",
      "ENDOCRINOLOGIA"
    ],
    imageUrl: "https://picsum.photos/id/1062/800/1200", // Doctors
    accentColor: "text-blue-600",
    duration: 20000 // Aumentado para 20s para permitir o ciclo de todos os itens (8 itens * 2s + buffer)
  },
  {
    id: 2,
    layout: LayoutType.SPLIT_RIGHT,
    title: "Resultados Online",
    subtitle: "Passo a Passo",
    description: "Praticidade total: acesse seus laudos sem sair de casa através do nosso site.",
    items: [
      "1. Acesse o nosso site",
      "2. Clique em 'Resultados'",
      "3. Use o Login do protocolo",
      "4. Visualize e baixe o PDF"
    ],
    imageUrl: "https://picsum.photos/id/6/1920/1080", // Laptop/Computer
    accentColor: "text-green-600"
  },
  {
    id: 3,
    layout: LayoutType.INFO_GRID,
    title: "Dicas para Exames",
    subtitle: "Prepare-se",
    description: "Siga as instruções para garantir a precisão e rapidez do seu atendimento.",
    items: [
      "Traga documento com foto",
      "Chegue 15min antes",
      "Respeite o tempo de jejum",
      "Traga exames anteriores",
      "Informe sobre alergias",
      "Use roupas confortáveis"
    ]
  },
  {
    id: 4,
    layout: LayoutType.CENTERED,
    title: "Agende pelo WhatsApp",
    subtitle: "Atendimento Rápido",
    description: "Aponte a câmera do seu celular para o QR Code (simulativo) ou adicione nosso número para agendar.",
    imageUrl: "", // Not used in new centered layout design
  },
  {
    id: 5,
    layout: LayoutType.OVERLAY,
    title: "Sua Saúde em Dia",
    subtitle: "Clínica Viddas",
    description: "Tecnologia de ponta em diagnósticos por imagem e consultas médicas especializadas.",
    imageUrl: "https://picsum.photos/id/338/1920/1080", // Medical interior
    accentColor: "text-white"
  }
];