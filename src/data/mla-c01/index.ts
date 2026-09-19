import { Question } from '../../types';
import { QUESTIONS_PART_1 } from './questionsPart1';
import { QUESTIONS_PART_2 } from './questionsPart2';
import { QUESTIONS_PART_3 } from './questionsPart3';
import { QUESTIONS_PART_4 } from './questionsPart4';

export const MLA_C01_QUESTIONS: Question[] = [
  ...QUESTIONS_PART_1,
  ...QUESTIONS_PART_2,
  ...QUESTIONS_PART_3,
  ...QUESTIONS_PART_4
];

export const MLA_C01_CATEGORIES = [
  "All Categories",
  "Data Preparation",
  "Model Development",
  "Deployment & Orchestration",
  "Monitoring & Security"
];
