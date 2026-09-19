import { Question } from '../types';
import { AIP_C01_QUESTIONS, AIP_C01_CATEGORIES } from './aip-c01';
import { MLA_C01_QUESTIONS, MLA_C01_CATEGORIES } from './mla-c01';
import { SAP_C02_QUESTIONS, SAP_C02_CATEGORIES } from './sap-c02';

export interface ExamDefinition {
  id: string;
  code: string;
  name: string;
  badge: string;
  description: string;
  questions: Question[];
  categories: string[];
}

export const EXAMS: ExamDefinition[] = [
  {
    id: 'aip-c01',
    code: 'AIP-C01',
    name: 'AWS Certified Generative AI Developer - Professional',
    badge: 'GenAI Dev Pro',
    description: 'Fundamentos de IA/ML, Amazon Bedrock, RAG, guardrails y gobernanza responsable de IA generativa.',
    questions: AIP_C01_QUESTIONS,
    categories: AIP_C01_CATEGORIES,
  },
  {
    id: 'mla-c01',
    code: 'MLA-C01',
    name: 'AWS Certified Machine Learning Engineer - Associate',
    badge: 'ML Engineer',
    description: 'Preparación de datos, desarrollo de modelos, despliegue/orquestación y monitorización/seguridad de soluciones ML en SageMaker.',
    questions: MLA_C01_QUESTIONS,
    categories: MLA_C01_CATEGORIES,
  },
  {
    id: 'sap-c02',
    code: 'SAP-C02',
    name: 'AWS Certified Solutions Architect - Professional',
    badge: 'SA Pro',
    description: 'Diseño de soluciones en entornos organizativos complejos, nuevas arquitecturas, migración y modernización, optimización de costes y mejora continua de resiliencia, seguridad y rendimiento.',
    questions: SAP_C02_QUESTIONS,
    categories: SAP_C02_CATEGORIES,
  },
];

export function getExamById(id: string): ExamDefinition | undefined {
  return EXAMS.find(e => e.id === id);
}

export function getCategoryCounts(questions: Question[], categories: string[]): Record<string, number> {
  const counts: Record<string, number> = { [categories[0]]: questions.length };
  for (const q of questions) {
    counts[q.category] = (counts[q.category] || 0) + 1;
  }
  return counts;
}
