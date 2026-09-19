## MÓDULO 8: MATRIZ DE DECISIÓN RÁPIDA Y CHEAT SHEET DEL EXAMEN

### Tabla de Decisión Rápida: "¿Qué Servicio / Técnica Elegir?"

| Si el escenario pide... | La Solución Correcta en AWS es... | Distractor Común (Respuesta Incorrecta) |
| :--- | :--- | :--- |
| Enrutar dinámicamente preguntas entre varios agentes especializados | **Multi-Agent Collaboration con Supervisor Agent** o **Bedrock Flows** | Crear un único megamodelo con un prompt gigante no estructurado |
| Ejecutar llamadas a APIs locales/on-premises sin exponer credenciales a AWS | **Bedrock Agents con Return of Control (RoC)** | Crear funciones Lambda con VPC Peering complejo o almacenar claves privadas en S3 |
| Reducir costes un 50% en procesamiento masivo de datos no interactivo | **Bedrock Batch Inference leyendo/escribiendo en S3** | Provisioned Throughput con sobredimensionamiento de MUs |
| Evitar que el LLM invente datos en un sistema RAG | **Bedrock Guardrails con Contextual Grounding (Grounding Score alto)** | Reducir la temperatura a 0 en el prompt (reduce creatividad pero no garantiza grounding) |
| Cumplir regulaciones de residencia de datos en Europa usando Cross-Region Inference | **Inference Profile con prefijo geográfico `eu.` (ej. `eu.anthropic.claude-3-5...`)** | Cross-Region sin restricción o enrutamiento manual con API Gateway entre regiones |
| Unificar llamadas a modelos de diferentes proveedores con el menor esfuerzo | **Amazon Bedrock `Converse` / `ConverseStream` API** | Escribir adaptadores personalizados con `InvokeModel` para cada proveedor |
| Búsqueda semántica sobre documentos técnicos con códigos de error y números de serie | **Hybrid Search (Vector Search + Búsqueda Léxica BM25)** | Búsqueda puramente vectorial con embeddings estándar |
| Búsqueda RAG sobre entidades con dependencias y relaciones complejas | **Amazon Neptune Analytics (Graph RAG)** | Amazon DynamoDB o Amazon OpenSearch estándar sin grafo |
| Validar plantillas IaC de GenAI antes del despliegue en CI/CD | **AWS CloudFormation Guard (`cfn-guard`)** | AWS Config (es reactivo post-despliegue, no preventivo en CI/CD) |
| Evaluar sesgo y equidad entre grupos demográficos en tiempo real | **Amazon SageMaker Clarify con métricas en CloudWatch** | Amazon CloudWatch Logs Insights con expresiones regulares |
| Configurar permisos de acceso a archivos S3 en Amazon Q Business | **Un único archivo JSON referenciado por `aclConfigurationFilePath`** | Crear archivos `acl.json` independientes dentro de cada subcarpeta |
| Reducir latencia y coste en prompts repetitivos muy extensos | **Prompt Caching de Amazon Bedrock / Anthropic** | Fine-Tuning del modelo (mucho más costoso y complejo) |

---

### ⚠ Los 10 "Gotchas" y Trampas Frecuentes del Examen

1. **`Retrieve` vs `RetrieveAndGenerate`:** Si la aplicación solo necesita los fragmentos para su propio frontend o pipeline personalizada, usa `Retrieve`. Si quieres que Bedrock invoque automáticamente el modelo y devuelva el texto final con citas, usa `RetrieveAndGenerate`.
2. **Guardrails MASK vs BLOCK:** Si el requisito es que la conversación *continúe* pero sin exponer datos personales (PII), la acción debe ser **MASK**, no **BLOCK**.
3. **Provisioned Throughput no reduce la latencia por sí solo:** Reservar MUs garantiza *capacidad y rendimiento (evita 429)*, pero para optimizar latencia de respuesta se usa streaming, modelos más ligeros o `performanceConfig: { "latency": "optimized" }`.
4. **Lake Formation vs S3 Object Tags:** Para gobernanza unificada, control por columnas y anonimización de PII, se usa **AWS Lake Formation (LF-Tags)** sobre el Glue Data Catalog, NO etiquetas directas en objetos de S3.
5. **Bedrock Trace Events:** Los fallos en la orquestación del agente se auditan en el `OrchestrationTrace` / `FailureTrace`, no en las métricas estándar de CloudWatch.
6. **Automatic vs Human Model Evaluation:** Criterios como *exactitud de clasificación, toxicidad y ROUGE/BLEU* se evalúan con **Automatic Evaluation**. Criterios subjetivos como *estilo, adecuación de marca y tono* requieren **Human Evaluation (SageMaker Ground Truth)**.
7. **Cross-Region Inference Profiles:** No transfieren datos de entrenamiento; solo balancean dinámicamente las solicitudes de inferencia en tiempo de ejecución respetando la zona geográfica configurada.
8. **OpenSearch Serverless Vector Engine:** No requiere gestionar clústeres, nodos ni sharding; escala automáticamente mediante *OpenSearch Compute Units (OCUs)*.
9. **Hierarchical Chunking (Parent-Child):** Siempre es la respuesta cuando la búsqueda debe ser muy precisa en términos específicos pero la respuesta del LLM requiere el contexto amplio de la sección completa.
10. **cfn-guard en CI/CD:** Siempre que el enunciado pida "validación preventiva antes de desplegar recursos en la cuenta", la herramienta adecuada es `cfn-guard`.
