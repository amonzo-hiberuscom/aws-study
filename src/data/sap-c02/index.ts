import { Question } from '../../types';
import { QUESTIONS_PART_1 } from './questionsPart1';
import { QUESTIONS_PART_2 } from './questionsPart2';
import { QUESTIONS_PART_3 } from './questionsPart3';
import { QUESTIONS_PART_4 } from './questionsPart4';

export const SAP_C02_QUESTIONS: Question[] = [
  ...QUESTIONS_PART_1,
  ...QUESTIONS_PART_2,
  ...QUESTIONS_PART_3,
  ...QUESTIONS_PART_4
];

export const SAP_C02_CATEGORIES = [
  "All Categories",
  "Complejidad Organizativa",
  "Diseño de Nuevas Soluciones",
  "Migración y Modernización",
  "Optimización de Costes",
  "Mejora Continua (Resiliencia, Seguridad y Rendimiento)"
];
