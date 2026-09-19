import { Question } from '../../types';
import { QUESTIONS_PART_1 } from './questionsPart1';
import { QUESTIONS_PART_2 } from './questionsPart2';
import { QUESTIONS_PART_3 } from './questionsPart3';
import { QUESTIONS_PART_4 } from './questionsPart4';

export const AIP_C01_QUESTIONS: Question[] = [
  ...QUESTIONS_PART_1,
  ...QUESTIONS_PART_2,
  ...QUESTIONS_PART_3,
  ...QUESTIONS_PART_4
];

export const AIP_C01_CATEGORIES = [
  "All Categories",
  "Amazon Bedrock",
  "RAG & Knowledge Bases",
  "Guardrails & Safety",
  "Agents & Orchestration",
  "Performance & Scaling",
  "Monitoring & Evaluation",
  "Security & Governance"
];
