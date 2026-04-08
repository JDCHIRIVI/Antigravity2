import { Sparkles, Leaf, ShoppingCart, Activity, Ghost, Zap, Flame, Camera, Target, Star, Smile, Search } from "lucide-react";

export type Mission = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  difficulty: number;
  rewards: number;
  progress: number;
  IconComponent: React.ElementType;
};

// Map the 31 missions giving them some flavor metadata
export const missionPool: Mission[] = [
  { id: 1, title: "El Viajero del", subtitle: "Tiempo", description: "Pregunta a un extraño con urgencia '¿En qué año estamos?'. Al responder, susurra '¡Funcionó!' y vete.", tags: ["#Social", "#Calle", "#Actuación"], difficulty: 5, rewards: 250, progress: 0, IconComponent: Flame },
  { id: 2, title: "Saludo", subtitle: "Fantasma", description: "Saluda efusivamente desde lejos a un desconocido como si fuera tu mejor amigo.", tags: ["#Social", "#Divertido", "#Raro"], difficulty: 2, rewards: 100, progress: 0, IconComponent: Ghost },
  { id: 3, title: "Acento", subtitle: "Inesperado", description: "Pide tu orden en una cafetería usando un acento extranjero o completamente inventado.", tags: ["#Voz", "#Público", "#Teatro"], difficulty: 3, rewards: 150, progress: 0, IconComponent: Smile },
  { id: 4, title: "Crítico", subtitle: "Incomprendido", description: "Párate frente a una pared vacía por 1 minuto, asintiendo y frotándote la barbilla pensativamente.", tags: ["#Calle", "#Solo", "#Abstracto"], difficulty: 1, rewards: 50, progress: 0, IconComponent: Search },
  { id: 5, title: "Caminata", subtitle: "Lunar", description: "Camina hacia atrás durante media cuadra o por todo el pasillo del supermercado.", tags: ["#Físico", "#Atrevido", "#Raro"], difficulty: 3, rewards: 130, progress: 0, IconComponent: Activity },
  { id: 6, title: "Aplauso", subtitle: "Espontáneo", description: "Aplaude sinceramente a alguien cuando tire basura en su lugar o termine de cruzar la calle.", tags: ["#Social", "#Positivo", "#Locura"], difficulty: 2, rewards: 90, progress: 0, IconComponent: Sparkles },
  { id: 7, title: "Operación", subtitle: "Ganso", description: "Envíale a un contacto al azar: 'El ganso aterrizó en la piscina, repito, aterrizó'. No respondas en 1 hora.", tags: ["#Digital", "#Amigos", "#Misterio"], difficulty: 1, rewards: 60, progress: 0, IconComponent: Target },
  { id: 8, title: "El Extraño de", subtitle: "Fondo", description: "Pídele a alguien que te tome una foto, pero dale la espalda a la cámara y mira al horizonte.", tags: ["#Social", "#Foto", "#Incomodidad"], difficulty: 3, rewards: 180, progress: 0, IconComponent: Camera },
  { id: 9, title: "El", subtitle: "Susurrador", description: "Busca una paloma, un perro callejero o un árbol y cuéntale un chiste malo de forma dramática.", tags: ["#Naturaleza", "#Solo", "#Absurdo"], difficulty: 2, rewards: 110, progress: 0, IconComponent: Leaf },
  { id: 10, title: "Carrera", subtitle: "Imaginaria", description: "Corre a máxima velocidad por 10 segundos mirando hacia atrás, como si te persiguiera algo invisible.", tags: ["#Físico", "#Energía", "#Calle"], difficulty: 5, rewards: 200, progress: 0, IconComponent: Zap },
  { id: 11, title: "El", subtitle: "Creyente", description: "Mira al cielo, señala un punto aleatorio sin nubes y di en voz alta 'Sabía que existían'.", tags: ["#Público", "#Actuación", "#Raro"], difficulty: 2, rewards: 85, progress: 0, IconComponent: Star },
  { id: 12, title: "DJ de", subtitle: "Ascensor", description: "Si entras a un ascensor con gente, empieza a tararear suavemente música genérica de elevador.", tags: ["#Público", "#Voz", "#Incomodidad"], difficulty: 4, rewards: 190, progress: 0, IconComponent: Sparkles },
  { id: 13, title: "Cliente", subtitle: "Confuso", description: "Entra a una panadería o tienda de ropa y pregunta muy serio en qué pasillo están los martillos.", tags: ["#Social", "#Calle", "#Atrevido"], difficulty: 4, rewards: 175, progress: 0, IconComponent: ShoppingCart },
  { id: 14, title: "Flashmob de", subtitle: "Uno", description: "Pon música en tus audífonos y baila intensamente con todo tu cuerpo durante 15 segundos en la calle.", tags: ["#Físico", "#Público", "#Energía"], difficulty: 5, rewards: 220, progress: 0, IconComponent: Zap },
  { id: 15, title: "Falso", subtitle: "Famoso", description: "Ponte gafas oscuras y camina tapándote la cara con las manos, diciendo 'Sin fotos por favor' a la nada.", tags: ["#Calle", "#Actuación", "#Absurdo"], difficulty: 3, rewards: 140, progress: 0, IconComponent: Camera },
  { id: 16, title: "Entrevista", subtitle: "Objetiva", description: "Usa un plátano (o un objeto random) como micrófono y hazle una entrevista a un buzón de correo.", tags: ["#Locura", "#Calle", "#Utilería"], difficulty: 4, rewards: 160, progress: 0, IconComponent: Target },
  { id: 17, title: "Cumpleaños", subtitle: "Avícola", description: "Cántale el 'Feliz Cumpleaños' completo a una paloma en el parque.", tags: ["#Naturaleza", "#Voz", "#Raro"], difficulty: 3, rewards: 125, progress: 0, IconComponent: Leaf },
  { id: 18, title: "Estatua", subtitle: "Viviente", description: "Quédate absolutamente congelado en medio de la acera durante 1 minuto exacto.", tags: ["#Público", "#Físico", "#Silencio"], difficulty: 3, rewards: 150, progress: 0, IconComponent: Activity },
  { id: 19, title: "Crítico", subtitle: "Gastronómico", description: "Antes de morder un alimento en público, huélelo dramáticamente y examínalo a contraluz.", tags: ["#Comida", "#Público", "#Actuación"], difficulty: 2, rewards: 95, progress: 0, IconComponent: Search },
  { id: 20, title: "Doble de", subtitle: "Acción", description: "En lugar de dar 3 pasos normales, haz una voltereta (o rueda por el suelo) para llegar a tu destino.", tags: ["#Físico", "#Atrevido", "#Deporte"], difficulty: 5, rewards: 240, progress: 0, IconComponent: Zap },
  { id: 21, title: "Lector", subtitle: "Expresivo", description: "Toma un folleto de supermercado y léelo en voz alta como si fuera un poema trágico.", tags: ["#Voz", "#Calle", "#Teatro"], difficulty: 4, rewards: 180, progress: 0, IconComponent: Star },
  { id: 22, title: "Elogio", subtitle: "Raro", description: "Dile a un amigo o conocido de la nada: 'Tienes unos codos increíblemente simétricos'.", tags: ["#Amigos", "#Social", "#Incomodidad"], difficulty: 2, rewards: 110, progress: 0, IconComponent: Smile },
  { id: 23, title: "Narrador", subtitle: "Deportivo", description: "Narra en voz baja pero que se escuche la caminata normal de un peatón frente a ti.", tags: ["#Voz", "#Calle", "#Divertido"], difficulty: 3, rewards: 145, progress: 0, IconComponent: Zap },
  { id: 24, title: "Búsqueda del", subtitle: "Tesoro", description: "Agáchate a mirar debajo de un banco público, pon cara de asombro y vete rápidamente.", tags: ["#Público", "#Actuación", "#Misterio"], difficulty: 2, rewards: 90, progress: 0, IconComponent: Target },
  { id: 25, title: "Operador del", subtitle: "Zapato", description: "Quítate un zapato, póntelo en la oreja y ten una acalorada discusión sobre negocios.", tags: ["#Clásico", "#Calle", "#Absurdo"], difficulty: 4, rewards: 165, progress: 0, IconComponent: Flame },
  { id: 26, title: "GPS", subtitle: "Humano", description: "Si te equivocas de calle o tropiezas, di en voz alta con tono robótico: 'Recalculando ruta...'.", tags: ["#Solo", "#Voz", "#Calle"], difficulty: 1, rewards: 60, progress: 0, IconComponent: Target },
  { id: 27, title: "El Suelo es", subtitle: "Lava", description: "Avanza 20 metros pisando solamente el mismo color de baldosas o evitando pisar las líneas.", tags: ["#Físico", "#Solo", "#Juego"], difficulty: 2, rewards: 100, progress: 0, IconComponent: Flame },
  { id: 28, title: "Saludo", subtitle: "Militar", description: "Párate firme y hazle un saludo militar perfecto a un cajero automático antes de usarlo.", tags: ["#Público", "#Raro", "#Silencio"], difficulty: 3, rewards: 130, progress: 0, IconComponent: Star },
  { id: 29, title: "Risa", subtitle: "Desconectada", description: "Ríete a carcajadas mirando fijamente la pantalla de tu celular mientras está completamente apagada.", tags: ["#Público", "#Actuación", "#Energía"], difficulty: 4, rewards: 170, progress: 0, IconComponent: Smile },
  { id: 30, title: "Despedida", subtitle: "Épica", description: "Despídete del cajero del supermercado como si fueras a embarcar en un viaje sin retorno de 10 años.", tags: ["#Social", "#Teatro", "#Atrevido"], difficulty: 4, rewards: 190, progress: 0, IconComponent: Ghost },
  { id: 31, title: "El Agente", subtitle: "Secreto", description: "Al recibir tu café o comida, guiña un ojo, susurra 'El paquete está asegurado' y sal del local.", tags: ["#Social", "#Misterio", "#Atrevido"], difficulty: 3, rewards: 160, progress: 0, IconComponent: Target }
];

export const getRandomMissions = (count: number): Mission[] => {
  const shuffled = [...missionPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
