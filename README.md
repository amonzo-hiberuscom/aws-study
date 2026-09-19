# AWS GenAI Developer Exam Prep

Simulador interactivo multiexamen para certificaciones AWS, con modos de práctica y examen cronometrado, análisis de respuestas y métricas por categoría. Un menú inicial permite elegir el examen a practicar:

- **AIP-C01** — AWS Certified AI Practitioner (97 preguntas)
- **MLA-C01** — AWS Certified Machine Learning Engineer - Associate (236 preguntas)
- **SAP-C02** — AWS Certified Solutions Architect - Professional (249 preguntas)

Cada examen guarda su progreso por separado y añadir un examen nuevo consiste en crear una carpeta en `src/data/<examen>/` con sus preguntas y registrarlo en `src/data/exams.ts`.

## Requisitos

- Node.js

## Puesta en marcha

1. Instalar dependencias:
   `npm install`
2. Arrancar la app en modo desarrollo:
   `npm run dev`
3. Abrir la URL que muestre la terminal (por defecto `http://localhost:3000`).

## Scripts disponibles

- `npm run dev`: servidor de desarrollo (Vite).
- `npm run build`: build de producción en `dist/`.
- `npm run preview`: sirve el build de producción localmente.
- `npm run lint`: comprueba tipos con `tsc --noEmit`.
