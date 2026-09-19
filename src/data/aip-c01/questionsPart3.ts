import { Question } from '../../types';

export const QUESTIONS_PART_3: Question[] = [
  {
    id: 61,
    questionNumber: 61,
    question: "A bank is developing a generative AI (GenAI)-powered AI assistant that uses Amazon Bedrock to assist the bank's website users with account inquiries and financial guidance. The bank must ensure that the AI assistant does not reveal any personally identifiable information (PII) in customer interactions. The AI assistant must not send PII in prompts to the GenAI model. The AI assistant must not respond to customer requests to provide investment advice. The bank must collect audit logs of all customer interactions, including any images or documents that are transmitted during customer interactions. Which solution will meet these requirements with the LEAST operational effort?",
    choices: [
      {
        letter: "A",
        text: "Use Amazon Macie to detect and redact PII in user inputs and in the model responses. Apply prompt engineering techniques to force the model to avoid investment advice topics. Use AWS CloudTrail to capture conversation logs.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use an AWS Lambda function and Amazon Comprehend to detect and redact PII. Use Amazon Comprehend topic modeling to prevent the AI assistant from discussing investment advice topics. Set up custom metrics in Amazon CloudWatch to capture customer conversations.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Configure Amazon Bedrock guardrails to apply a sensitive information policy to detect and filter PII. Set up a topic policy to ensure that the AI assistant avoids investment advice topics. Use the Converse API to log model invocations. Enable delivery and image logging to Amazon S3.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Use regex controls to match patterns for PII. Apply prompt engineering techniques to avoid returning PII or investment advice topics to customers. Enable model invocation logging, delivery logging, and image logging to Amazon S3.",
        isCorrect: false
      }
    ],
    comments: "Opción A: Amazon Macie está diseñado para descubrir y clasificar datos sensibles en reposo en Amazon S3 (por ejemplo, escaneando buckets), no para inspeccionar ni redactar PII en tiempo real dentro de los prompts enviados al modelo o de las respuestas generadas por este. Además, AWS CloudTrail registra llamadas a la API de gestión (quién invocó qué operación y cuándo), pero no captura el contenido conversacional completo (texto, imágenes o documentos) intercambiado con el asistente, por lo que no cumple el requisito de auditoría de las interacciones.\n\nOpción B: esta solución exige desarrollo a medida (una función Lambda que orqueste Amazon Comprehend para detectar y redactar PII), lo que aumenta considerablemente el esfuerzo operativo frente a una función nativa de Bedrock. Además, el \"topic modeling\" de Comprehend es una técnica de descubrimiento no supervisado de temas latentes en un corpus de texto, no un mecanismo pensado para bloquear en tiempo real un tema concreto y predefinido como el asesoramiento de inversión durante una conversación. Por último, las métricas personalizadas de Amazon CloudWatch están pensadas para valores numéricos agregados, no para almacenar el contenido íntegro de las conversaciones, incluidas imágenes o documentos.\n\nOpción C (Correcta): Amazon Bedrock Guardrails permite configurar una \"sensitive information policy\" (política de información sensible) que detecta y enmascara o bloquea PII, tanto mediante entidades predefinidas como mediante filtros de expresiones regulares personalizados, aplicándose tanto a las entradas (prompts) enviadas al modelo como a las respuestas devueltas por este. De forma complementaria, se puede definir una \"topic policy\" con \"denied topics\" (temas denegados) para impedir que el asistente responda a solicitudes sobre un tema concreto, como el asesoramiento de inversión. En cuanto a la auditoría, la documentación oficial de Amazon Bedrock confirma que, al usar la Converse API (u otras operaciones de inferencia compatibles), se puede habilitar el \"model invocation logging\" con un destino en Amazon S3, y que cualquier dato de imagen o documento que se transmita durante la conversación se registra en Amazon S3 si se ha habilitado la entrega (\"delivery logging\") y el registro de imágenes (\"image logging\") en S3. Toda esta solución se configura de forma nativa y declarativa en Bedrock, sin necesidad de desarrollar componentes adicionales, lo que la convierte en la opción de menor esfuerzo operativo.\n\nOpción D: los controles basados únicamente en expresiones regulares son frágiles, requieren mantenimiento manual continuo y son propensos a falsos negativos frente a la variedad de formatos en que puede aparecer la PII (a diferencia de la política de información sensible de Guardrails, que combina entidades PII predefinidas con regex personalizados). Además, la ingeniería de prompts no es un mecanismo de cumplimiento fiable ni determinista, ya que el modelo puede ignorarla o ser manipulado para evadirla, a diferencia de un guardrail que actúa como una capa de control externa al propio modelo. Si bien esta opción sí menciona correctamente habilitar el registro de invocación de modelos, la entrega (\"delivery logging\") y el registro de imágenes en S3 (aspecto correcto y alineado con la documentación), el mecanismo elegido para PII y temas denegados no es el más robusto ni el de menor esfuerzo operativo en comparación con Guardrails.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-denied-topics.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html",
    category: "Guardrails & Safety",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 62,
    questionNumber: 62,
    question: "A financial services company is developing a customer service AI assistant application that uses a foundation model (FM) in Amazon Bedrock. The application must provide transparent responses by documenting reasoning and by citing sources that are used for Retrieval Augmented Generation (RAG). The application must capture comprehensive audit trails for all responses to users. The application must be able to serve up to 10,000 concurrent users and must respond to each customer inquiry within 2 seconds. Which solution will meet these requirements with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Enable tracing for Amazon Bedrock agents. Configure structured prompts that direct the FM to provide evidence presentations. Integrate Amazon Bedrock knowledge bases with data sources to enable RAG. Configure the application to reference and cite authoritative content. Deploy the application in a Multi-AZ architecture. Use Amazon API Gateway and AWS Lambda functions to scale the application. Use Amazon CloudFront to provide low-latency delivery.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Enable tracing for Amazon Bedrock agents. Integrate a custom RAG pipeline with Amazon OpenSearch Service to retrieve and cite sources. Configure structured prompts to present retrieved evidence. Deploy the application behind an Amazon API Gateway REST API. Use AWS Lambda functions and Amazon CloudFront to scale the application and to provide low latency. Store logs in Amazon S3 and use AWS CloudTrail to capture audit trails.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use Amazon CloudWatch to monitor latency and error rates. Embed model prompts directly in the application backend to cite sources. Store application interactions with users in Amazon RDS for audits.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Store generated responses and supporting evidence in an Amazon S3 bucket. Enable versioning on the bucket for audits. Use AWS Glue to catalog retrieved documents. Process the retrieved documents in Amazon Athena to generate periodic compliance reports.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): habilitar el tracing de Amazon Bedrock Agents proporciona, en cada respuesta, un registro detallado (\"trace\") del proceso de razonamiento paso a paso del agente (orquestación, invocación de action groups y consultas a la base de conocimiento), lo que constituye una pista de auditoría técnica sin necesidad de instrumentación adicional. Las Amazon Bedrock Knowledge Bases, mediante la API RetrieveAndGenerate, realizan de forma nativa la recuperación y generación en una sola llamada y devuelven la respuesta junto con citas (objetos Citation) que referencian los fragmentos de los documentos fuente usados, cubriendo el requisito de transparencia y evidencia sin construir esa lógica a mano. Combinando esto con una arquitectura Multi-AZ y servicios totalmente gestionados y sin servidor (Amazon API Gateway, AWS Lambda, Amazon CloudFront), la solución escala automáticamente a picos de 10.000 usuarios concurrentes y ofrece baja latencia mediante el edge caching de CloudFront, todo ello con el mínimo esfuerzo operativo porque no hay servidores ni pipelines de RAG que gestionar.\n\nOpción B: sustituir la Knowledge Base nativa de Bedrock por un pipeline de RAG a medida sobre Amazon OpenSearch Service obliga al equipo a implementar y mantener manualmente la lógica de recuperación semántica, el formateo de las citas y la sincronización de los datos, lo que incrementa notablemente la carga operativa frente a usar RetrieveAndGenerate, que ya resuelve esto de forma gestionada. Aunque el resto de la arquitectura (API Gateway, Lambda, CloudFront, CloudTrail) es razonable, no cumple el criterio de \"menor esfuerzo operativo\".\n\nOpción C: no incorpora ningún mecanismo de RAG ni una base de conocimiento gestionada; embeber los prompts del modelo directamente en el backend no garantiza citas verificables ni trazabilidad real del razonamiento. Además, Amazon RDS es una base de datos relacional pensada para cargas transaccionales y no está diseñada ni dimensionada de forma nativa para absorber, con bajo esfuerzo operativo, el volumen de registros de auditoría de una aplicación con picos de 10.000 usuarios concurrentes.\n\nOpción D: almacenar respuestas y evidencias en Amazon S3, catalogarlas con AWS Glue y consultarlas con Amazon Athena es un patrón de análisis por lotes orientado a generar informes de cumplimiento periódicos, no a servir citas y trazabilidad en el momento en que se genera la respuesta al usuario. Esta arquitectura tampoco aborda el requisito de responder en tiempo real en menos de 2 segundos a 10.000 usuarios concurrentes, ya que Athena y Glue no están pensados para servir respuestas interactivas de baja latencia.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve-generate.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/trace-events.html\nhttps://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/genops03-bp02.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 63,
    questionNumber: 63,
    question: "A healthcare company is developing a document management system that stores medical research papers in an Amazon S3 bucket. The company needs to build a comprehensive metadata framework that will improve search precision for a generative AI (GenAI) application that analyzes the research papers. The metadata framework must include document timestamps, author information, and research domain classifications. The solution must maintain a consistent metadata structure across all uploaded documents. The solution must give foundation models (FMs) the ability to understand document context without accessing the full content. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Store document timestamps in Amazon S3 system metadata. Use S3 object tags to implement domain classification. Implement custom user-defined metadata to store author information.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Set up S3 Object Lock with legal holds to track document timestamps. Use S3 object tags to store author information. Implement S3 access points for domain classification.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use S3 Inventory reports to track document timestamps. Create S3 access points to implement domain classification. Store author information in S3 Storage Lens dashboards.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use custom user-defined metadata to store author information. Use S3 Object Lock retention periods to track document timestamps. Use S3 Event Notifications to implement domain classification.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): Amazon S3 mantiene automáticamente un conjunto de metadatos de sistema (system-defined metadata) para cada objeto almacenado, incluyendo la fecha de creación del objeto (Last-Modified/Date), que S3 gestiona sin intervención del usuario; esto cubre el requisito de marcas de tiempo del documento. Los object tags son pares clave-valor (hasta 10 por objeto) pensados específicamente para categorizar y organizar objetos, y son ideales para clasificar el dominio de investigación (por ejemplo, \"domain=oncología\" o \"domain=cardiología\"), pudiendo usarse además en políticas de IAM, reglas de ciclo de vida o informes de asignación de costes. Los metadatos definidos por el usuario (user-defined metadata), enviados con el prefijo x-amz-meta- en una solicitud PUT/POST, permiten almacenar información arbitraria como el nombre del autor. La combinación de estos tres mecanismos nativos de S3 proporciona una estructura de metadatos consistente y consultable (incluso mediante S3 Metadata/HeadObject) sin necesidad de abrir o leer el contenido completo del documento, que es exactamente lo que necesita el modelo generativo para entender el contexto del documento antes de analizarlo.\n\nOpción B: S3 Object Lock con legal holds es un mecanismo de retención WORM (Write Once Read Many) orientado a cumplimiento normativo y prevención de eliminación/sobrescritura de objetos, no un medio para registrar ni consultar marcas de tiempo del documento. Los access points de S3 son puntos de acceso de red alternativos al bucket, cada uno con su propia política de acceso; no ofrecen ninguna capacidad de clasificación por dominio de investigación.\n\nOpción C: los informes de S3 Inventory generan de forma periódica (diaria o semanal) un listado en CSV/ORC/Parquet con el estado de los objetos de un bucket; no están diseñados para \"rastrear\" o consultar timestamps de forma dinámica por objeto en el momento de una búsqueda. Los access points, de nuevo, no sirven para clasificar por dominio. Y S3 Storage Lens ofrece métricas agregadas de uso y actividad de almacenamiento a nivel de organización/cuenta/bucket; no es un lugar para almacenar metadatos como el nombre de un autor.\n\nOpción D: S3 Object Lock con periodos de retención es, igual que en la opción B, un control de cumplimiento/WORM que impide borrar o sobrescribir un objeto durante un plazo determinado, no un registro de la fecha del documento. Las S3 Event Notifications disparan eventos (por ejemplo, hacia Lambda, SQS o SNS) ante acciones sobre el bucket, como una subida de objeto, pero no almacenan ni implementan por sí mismas una clasificación de dominio de investigación.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingMetadata.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/object-tagging.html",
    category: "Security & Governance",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 64,
    questionNumber: 64,
    question: "Example Corp provides a personalized video generation service that millions of enterprise customers use. Customers generate marketing videos by submitting prompts to the company's proprietary generative AI (GenAI) model. To improve output relevance and personalization, Example Corp wants to enhance the prompts by using customer-specific context such as product preferences, customer attributes, and business history. The customers have strict data governance requirements. The customers must retain full ownership and control over their own data. The customers do not require real-time access. However, semantic accuracy must be high and retrieval latency must remain low to support customer experience use cases. Example Corp wants to minimize architectural complexity in its integration pattern. Example Corp does not want to deploy and manage services in each customer's environment unless necessary. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Ensure that each customer sets up an Amazon Q Business index that includes the customer's internal data. Ensure that each customer designates Example Corp as a data accessor to allow Example Corp to retrieve relevant content by using a secure API to enrich prompts at runtime.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Use federated search with Model Context Protocol (MCP) by deploying real-time MCP servers for each customer. Retrieve data in real time during prompt generation.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Ensure that each customer configures an Amazon Bedrock knowledge base. Allow cross-account querying so Example Corp can retrieve structured data for prompt augmentation.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Configure Amazon Kendra to crawl customer data sources. Share the resulting indexes across accounts so Example Corp can query each customer's Amazon Kendra index to retrieve augmentation data.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): la funcionalidad de \"data accessor\" de Amazon Q Business está diseñada exactamente para este patrón de integración ISV. Cada cliente empresarial configura su propia aplicación de Amazon Q Business (que indexa sus datos internos en el \"Amazon Q index\") y, desde la consola, añade a Example Corp como data accessor verificado, otorgándole permiso para consultar su índice. Con los parámetros de configuración compartidos (ID de la aplicación, región, ID del retriever, ARN del data accessor, etc.), Example Corp puede invocar la API SearchRelevantContent para recuperar contenido relevante y enriquecer los prompts en el momento de la generación. Esta API respeta los controles de acceso del cliente (solo devuelve contenido al que el usuario final tendría acceso), por lo que el cliente conserva la propiedad y el control total de sus datos. Al no requerirse acceso en tiempo real, y dado que el objetivo es minimizar la complejidad, este mecanismo evita que Example Corp tenga que desplegar o gestionar infraestructura dentro del entorno de cada cliente, cumpliendo todos los requisitos del enunciado (baja complejidad, alta precisión semántica, baja latencia de recuperación y gobernanza de datos).\n\nOpción B: desplegar servidores MCP en tiempo real dentro del entorno de cada cliente exige justamente lo que Example Corp quiere evitar: desplegar y gestionar infraestructura en cada cuenta cliente, multiplicada por \"millones\" de clientes empresariales. Además, el enunciado indica explícitamente que no se requiere acceso en tiempo real, por lo que un patrón de federación en tiempo real vía MCP añade complejidad operativa innecesaria sin aportar ningún beneficio adicional frente a un patrón de recuperación asíncrona o bajo demanda como el de Q Business.\n\nOpción C: es cierto que Amazon Bedrock Knowledge Bases sí admite consultas entre cuentas mediante políticas de recursos (resource-based policies) que autorizan a un rol de otra cuenta a invocar acciones como Retrieve o GetDocumentContent sobre una base de conocimiento gestionada. Sin embargo, esta opción exige que cada uno de los \"millones\" de clientes construya y mantenga su propia infraestructura de base de conocimiento (fuentes de datos, ingesta, embeddings, almacén vectorial) desde cero, y que además configure y administre manualmente la política de recursos entre cuentas para cada cliente. Esto añade una complejidad arquitectónica y operativa mucho mayor que el mecanismo nativo y ya gobernado de data accessor de Amazon Q Business, que fue diseñado específicamente para el caso de uso de ISVs que necesitan enriquecer prompts con datos empresariales de terceros sin construir su propia canalización de RAG por cliente.\n\nOpción D: Amazon Kendra no ofrece un mecanismo nativo equivalente a \"compartir índices entre cuentas\" como el que existe para otros recursos de AWS mediante AWS Resource Access Manager. Para lograr algo similar, cada cliente tendría que aprovisionar y mantener su propio índice de Kendra (con el coste y la gestión operativa que ello implica, incluso durante los periodos en los que no hay consultas) y configurar manualmente roles y políticas de acceso entre cuentas para que Example Corp pueda consultarlo, lo cual introduce una complejidad arquitectónica y de gobernanza notablemente mayor que el patrón de data accessor de Q Business, que resuelve el mismo problema de forma nativa y con controles de acceso ya integrados.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/isv.html\nhttps://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/concepts-terms.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-managed-cross-account.html",
    category: "Security & Governance",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 65,
    questionNumber: 65,
    question: "A company is building a legal research AI assistant that uses Amazon Bedrock with an Anthropic Claude foundation model (FM). The AI assistant must retrieve highly relevant case law documents to augment the FM's responses. The AI assistant must identify semantic relationships between legal concepts, specific legal terminology, and citations. The AI assistant must perform quickly and return precise results. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Configure an Amazon Bedrock knowledge base to use a default vector search configuration. Use Amazon Bedrock to expand queries to improve retrieval for legal documents based on specific terminology and citations.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use Amazon OpenSearch service to deploy a hybrid search architecture that combines vector search with keyword search. Apply an Amazon Bedrock reranker model to optimize result relevance.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Enable the Amazon Kendra query suggestion feature for end users. Use Amazon Bedrock to perform post-processing of search results to identify semantic similarity in the documents and to produce precise results.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use Amazon OpenSearch Service with vector search and Amazon Bedrock Titan embeddings to index and search legal documents. Use custom AWS Lambda functions to merge results with keyword-based filters that are stored in an Amazon RDS database.",
        isCorrect: false
      }
    ],
    comments: "Opción A: configurar una Knowledge Base de Amazon Bedrock con la configuración de búsqueda vectorial por defecto, incluso combinada con expansión de consultas, se apoya únicamente en similitud semántica de embeddings. Este enfoque tiende a perder coincidencias exactas de citas legales, números de expediente y terminología jurídica muy específica, que la búsqueda semántica por sí sola no captura bien porque prioriza el significado sobre la coincidencia literal.\n\nOpción B (Correcta): Amazon OpenSearch Service admite de forma nativa una arquitectura de búsqueda híbrida (Hybrid Search) mediante un \"search pipeline\" que combina resultados de búsqueda léxica/por palabras clave (algoritmo Okapi BM25, ideal para citas exactas y terminología jurídica precisa) con resultados de búsqueda vectorial/neural (ideal para capturar relaciones semánticas entre conceptos legales), normalizando y combinando las puntuaciones de ambos métodos (por ejemplo con min_max/l2 y arithmetic_mean/geometric_mean/harmonic_mean). Sobre el conjunto de resultados combinado se puede aplicar después la API Rerank de Amazon Bedrock (bedrock-agent-runtime), que usa un modelo de reranking dedicado (por ejemplo Cohere Rerank) para reordenar los documentos por relevancia real frente a la consulta. Esta combinación de búsqueda híbrida más reranking maximiza tanto el recall (gracias al componente semántico) como la precisión (gracias al componente léxico y al reranker), con un rendimiento adecuado para un caso de uso que exige rapidez y precisión.\n\nOpción C: la función de sugerencia de consultas (query suggestions) de Amazon Kendra ayuda a los usuarios a completar o refinar sus búsquedas mientras escriben, pero no mejora la relevancia de la recuperación de documentos en sí misma. Además, aplicar un post-procesado adicional con Amazon Bedrock para detectar similitud semántica sobre los resultados ya obtenidos añade llamadas extra al modelo, lo que incrementa la latencia sin ofrecer la calidad de reordenación que proporciona un modelo de reranking dedicado como el de la opción B.\n\nOpción D: usar Amazon OpenSearch Service con búsqueda vectorial y embeddings de Amazon Titan es un buen punto de partida, pero fusionar esos resultados con filtros por palabras clave almacenados en Amazon RDS mediante funciones AWS Lambda personalizadas es una solución compleja, con mayor esfuerzo de desarrollo, mantenimiento y latencia adicional por las llamadas entre servicios, y no ofrece la calidad de reordenación por relevancia que aporta un modelo de reranking dedicado integrado de forma nativa como el de Bedrock.\n\nReferencias: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-configure-neural-search.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/rerank.html ; https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_Rerank.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 66,
    questionNumber: 66,
    question: "A company deploys multiple Amazon Bedrock based generative AI (GenAI) applications across multiple business units for customer service, content generation, and document analysis. Some applications show unpredictable token consumption patterns. The company requires a comprehensive observability solution that provides real-time visibility into token usage patterns across multiple models. The observability solution must support custom dashboards for multiple stakeholder groups and provide alerting capabilities for token consumption across all the foundational models that the company's applications use. Which combination of solutions will meet these requirements with the LEAST operational overhead? (Choose two.)",
    choices: [
      {
        letter: "A",
        text: "Use Amazon CloudWatch metrics as data sources to create custom Amazon QuickSight dashboards that show token usage trends and usage patterns across FMs.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use Amazon CloudWatch Logs Insights to analyze Amazon Bedrock invocation logs for token consumption patterns and usage attribution by application. Create custom queries to identify high-usage scenarios. Add log widgets to dashboards to enable continuous monitoring.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Create custom Amazon CloudWatch dashboards that combine native Amazon Bedrock token and invocation CloudWatch metrics. Set up CloudWatch alarms to monitor token usage thresholds.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Create dashboards that show token usage trends and patterns across the company's FMs by using an Amazon Bedrock zero-ETL integration with Amazon Managed Grafana.",
        isCorrect: false
      },
      {
        letter: "E",
        text: "Implement Amazon EventBridge rules to capture Amazon Bedrock model invocation events. Route token usage data to an Amazon Data Firehose delivery stream that targets Amazon OpenSearch Serverless. Use OpenSearch dashboards to analyze usage patterns.",
        isCorrect: false
      }
    ],
    comments: "Opción A: usar Amazon QuickSight como capa de dashboards implica aprovisionar y mantener un servicio de BI adicional (conjuntos de datos, ingestión desde CloudWatch, licencias/usuarios de QuickSight), lo cual añade complejidad operativa innecesaria. Además, QuickSight está pensado para business intelligence y no ofrece de forma nativa capacidades de alerta en tiempo real sobre umbrales operativos, a diferencia de las alarmas de CloudWatch, por lo que no cubre completamente el requisito de alerting.\n\nOpción B (Correcta): Amazon Bedrock puede entregar el \"model invocation logging\" (registro de invocación de modelos) a Amazon CloudWatch Logs, capturando metadatos de cada invocación incluyendo conteos de tokens de entrada y salida. Sobre esos logs, CloudWatch Logs Insights permite escribir consultas personalizadas (por ejemplo, agrupando por usuario/IAM principal o por modelo) para analizar patrones de consumo de tokens y atribuir el uso a cada aplicación o equipo, identificando escenarios de alto consumo. Los resultados de esas consultas se pueden añadir como widgets de log a un dashboard de CloudWatch para monitorización continua. Esta es una capacidad nativa documentada por AWS, sin necesidad de construir pipelines adicionales.\n\nOpción C (Correcta): Amazon Bedrock publica de forma nativa en CloudWatch, bajo el namespace AWS/Bedrock, métricas de runtime como Invocations, InputTokenCount y OutputTokenCount (entre otras de latencia y errores). Sobre estas métricas se pueden construir dashboards personalizados de CloudWatch que combinen visualizaciones de token e invocación, y configurar alarmas de CloudWatch (CloudWatch Alarms) para notificar cuando el consumo de tokens supere umbrales definidos. Al ser métricas nativas del servicio, esta solución tiene el menor esfuerzo operativo posible, sin ETL ni infraestructura adicional.\n\nOpción D: no existe una integración \"zero-ETL\" de Amazon Bedrock con Amazon Managed Grafana. Amazon Managed Grafana puede usar CloudWatch como fuente de datos mediante el conector estándar de Grafana, pero esto no constituye una integración zero-ETL nativa de Bedrock; la opción describe una capacidad que el servicio no ofrece tal como se plantea.\n\nOpción E: construir una tubería con reglas de EventBridge, Amazon Data Firehose y Amazon OpenSearch Serverless es una arquitectura funcional, pero requiere diseñar, desplegar y mantener múltiples componentes adicionales (reglas de eventos, streams de entrega, un dominio/colección de OpenSearch), lo cual implica mucho más esfuerzo operativo que reutilizar las métricas y logs nativos de Bedrock ya integrados con CloudWatch.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-runtime-metrics.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/cost-mgmt-request-metadata.html",
    category: "Monitoring & Evaluation",
    multiSelect: true,
    requiredCount: 2
  },
  {
    id: 67,
    questionNumber: 67,
    question: "A company is designing a solution that uses foundation models (FMs) to support multiple AI workloads. Some FMs must be invoked on demand and in real time. Other FMs require consistent high-throughput access for batch processing. The solution must support hybrid deployment patterns and run workloads across cloud infrastructure and on-premises infrastructure to comply with data residency and compliance requirements. Which combination of steps will meet these requirements? (Choose two.)",
    choices: [
      {
        letter: "A",
        text: "Use AWS Lambda to orchestrate low-latency FM inference by invoking FMs hosted on Amazon SageMaker AI asynchronous endpoints.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Configure provisioned throughput in Amazon Bedrock to ensure consistent performance for high-volume workloads.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Deploy FMs to Amazon SageMaker AI endpoints with support for edge deployment by using Amazon SageMaker Neo. Orchestrate the FMs by using AWS Lambda to support hybrid deployment.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Use Amazon Bedrock with auto-scaling to handle unpredictable traffic surges.",
        isCorrect: false
      },
      {
        letter: "E",
        text: "Use Amazon SageMaker JumpStart to host and invoke the FMs.",
        isCorrect: false
      }
    ],
    comments: "Opción A: los endpoints asíncronos (Asynchronous Inference) de SageMaker AI están diseñados para solicitudes con payloads grandes (hasta 1 GB) o tiempos de procesamiento largos (hasta 1 hora), que se encolan y se procesan en segundo plano devolviendo el resultado a un bucket de Amazon S3. Este mecanismo es lo opuesto a la inferencia en tiempo real de baja latencia bajo demanda que requiere el escenario, por lo que no encaja con ese requisito.\n\nOpción B (Correcta): el Provisioned Throughput de Amazon Bedrock permite reservar capacidad dedicada (medida en Model Units) para un modelo base o personalizado, garantizando un rendimiento constante y predecible a lo largo del tiempo. Esto es exactamente lo que necesitan las cargas de trabajo de alto volumen y procesamiento por lotes, a diferencia del throughput bajo demanda (on-demand), cuya capacidad se escala a nivel regional sin capacidad reservada y no ofrece esas garantías de rendimiento constante.\n\nOpción C (Correcta): Amazon SageMaker Neo compila y optimiza modelos entrenados (Gluon, Keras, MXNet, PyTorch, TensorFlow, ONNX, etc.) para ejecutarse en una plataforma de hardware específica, incluyendo tanto instancias en la nube como dispositivos edge (a través de AWS IoT Greengrass). Esto permite desplegar el modelo optimizado fuera de la infraestructura pública de AWS, en ubicaciones on-premises o edge, ayudando a cumplir requisitos de residencia de datos. Usar AWS Lambda para orquestar la invocación de esos endpoints (tanto los alojados en SageMaker AI en la nube como los desplegados en el edge) habilita el patrón de despliegue híbrido solicitado.\n\nOpción D: Amazon Bedrock es un servicio totalmente gestionado que se ejecuta únicamente en la infraestructura de AWS; su capacidad de auto-scaling (en el modelo on-demand) ayuda a absorber picos de tráfico impredecibles en la nube, pero no ofrece ningún mecanismo para ejecutar cargas de trabajo on-premises, por lo que no resuelve el requisito híbrido del escenario.\n\nOpción E: Amazon SageMaker JumpStart facilita el descubrimiento, ajuste fino (fine-tuning) y despliegue rápido de modelos preentrenados directamente en la nube mediante endpoints de SageMaker AI, pero no aporta por sí mismo ningún mecanismo de despliegue híbrido cloud/on-premises ni de optimización para hardware edge.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/neo.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/async-inference-create-endpoint-create-endpoint.html",
    category: "Performance & Scaling",
    multiSelect: true,
    requiredCount: 2
  },
  {
    id: 68,
    questionNumber: 68,
    question: "A company is planning to deploy multiple generative AI (GenAI) applications to five independent business units that operate in multiple countries in Europe and the Americas. Each application uses Amazon Bedrock Retrieval Augmented Generation (RAG) patterns with business unit-specific knowledge bases that store terabytes of unstructured data. The company must establish well-architected, standardized components for security controls, observability practices, and deployment patterns across all the GenAI applications. The components must be reusable, versioned, and governed consistently. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Configure Amazon API Gateway REST API endpoints for the GenAI applications. Deploy common security, observability, and RAG patterns based on the AWS Well-Architected Generative AI Lens in standardized AWS CloudFormation templates. Use CloudFormation Guard after the deployment to validate policy compliance in each business unit.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Create standardized AWS CloudFormation templates to implement security, observability, and RAG patterns based on the AWS Well-Architected Generative AI Lens. Establish a centralized repository that performs version control. Integrate a CI/CD pipeline with CloudFormation Guard to enforce consistent and repeatable deployments across business units.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Use AWS Service Catalog to define standardized portfolios and versioned products for each business unit. Use the portfolios to enforce security, observability, and RAG patterns based on the AWS Well-Architected Generative AI Lens. Require the business units to use the Service Catalog console to deploy resources.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Document security controls, observability requirements, and RAG patterns based on the AWS Well-Architected Generative AI Lens in a shared design document. Use Amazon Macie to enforce deployment. Delegate implementation responsibility to each business unit.",
        isCorrect: false
      }
    ],
    comments: "Opción A: en este planteamiento, AWS CloudFormation Guard (cfn-guard) se ejecuta después del despliegue, es decir, de forma reactiva. Según la documentación oficial de AWS CloudFormation sobre mejores prácticas (\"Integrate cfn-guard into CI/CD pipelines\"), el valor de cfn-guard está precisamente en integrarlo dentro del pipeline de CI/CD para validar las plantillas ANTES del despliegue, lo que \"ayuda a prevenir que se desplieguen recursos no conformes en el entorno y ofrece retroalimentación temprana a los desarrolladores sobre las violaciones de políticas\". Validar después del despliegue significa que los recursos no conformes ya se habrían creado antes de detectarse el incumplimiento, lo cual es menos eficaz y contradice el enfoque de \"policy as code\" preventivo que promueve AWS.\n\nOpción B (Correcta): crear plantillas estandarizadas de AWS CloudFormation que implementen los patrones de seguridad, observabilidad y RAG recomendados por el AWS Well-Architected Generative AI Lens, mantenerlas versionadas en un repositorio centralizado, e integrar AWS CloudFormation Guard dentro del pipeline de CI/CD es exactamente el patrón que documenta AWS para lograr despliegues consistentes y repetibles: cfn-guard actúa como una puerta de control (policy-as-code) que valida el cumplimiento de las políticas antes de que los recursos se aprovisionen. Esto satisface los tres requisitos del enunciado (componentes reutilizables, versionados y gobernados de forma consistente) para las cinco unidades de negocio.\n\nOpción C: AWS Service Catalog es una herramienta válida de gobernanza para publicar productos versionados y estandarizados, pero la opción exige que las unidades de negocio desplieguen manualmente desde la consola de Service Catalog. Esto introduce un paso manual que reduce la automatización, la repetibilidad y la trazabilidad del proceso frente a un pipeline de CI/CD versionado con validación automática de políticas, que es el enfoque que AWS recomienda para despliegues consistentes a escala.\n\nOpción D: documentar los controles en un documento de diseño compartido y delegar la implementación a cada unidad de negocio no garantiza consistencia ni gobernanza real, ya que no existe ningún mecanismo técnico de aplicación (enforcement). Además, Amazon Macie es un servicio de descubrimiento y clasificación de datos sensibles (por ejemplo, PII en Amazon S3), no una herramienta para \"forzar\" el cumplimiento de patrones de despliegue de infraestructura, seguridad u observabilidad; su uso aquí es conceptualmente incorrecto.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/best-practices.html\nhttps://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html\nhttps://docs.aws.amazon.com/cfn-guard/latest/ug/what-is-guard.html",
    category: "Security & Governance",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 69,
    questionNumber: 69,
    question: "A company upgraded its Amazon Bedrock powered foundation model (FM) that supports a multilingual customer service assistant. After the upgrade, the assistant exhibited inconsistent behavior across languages. The assistant began generating different responses in some languages when presented with identical questions. The company needs a solution to detect and address similar problems for future updates. The evaluation must be completed within 45 minutes for all supported languages. The evaluation must process at least 15,000 test conversations in parallel. The evaluation process must be fully automated and integrated into the CI/CD pipeline. The solution must block deployment if quality thresholds are not met. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Create a distributed traffic simulation framework that sends translation-heavy workloads to the assistant in multiple languages simultaneously. Use Amazon CloudWatch metrics to monitor latency, concurrency, and throughput. Run simulations before production releases to identify infrastructure bottlenecks.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Deploy the assistant in multiple AWS Regions with Amazon Route 53 latency-based routing and AWS Global Accelerator to improve global performance. Store multilingual conversation logs in Amazon S3. Perform weekly post-deployment audits to review consistency.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Create a pre-processing pipeline that normalizes all incoming messages into a consistent format before sending the messages to the assistant. Apply rule-based checks to flag potential hallucinations in the outputs. Focus the evaluation on the normalized text to simplify testing across languages.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Set up standardized multilingual test conversations with identical meaning. Run the test conversations in parallel by using Amazon Bedrock model evaluation jobs. Apply similarity and hallucination thresholds. Integrate the process into the CI/CD pipeline to block releases that fail.",
        isCorrect: true
      }
    ],
    comments: "Opción A: un framework de simulación de tráfico centrado en monitorizar latencia, concurrencia y rendimiento con Amazon CloudWatch evalúa el comportamiento de la infraestructura y del rendimiento del sistema, pero no mide la consistencia semántica ni el significado de las respuestas del asistente entre distintos idiomas. No detecta el problema de que el modelo genere respuestas diferentes ante preguntas equivalentes en distintos idiomas, por lo que no cumple el objetivo.\n\nOpción B: desplegar el asistente en múltiples Regiones de AWS con enrutamiento por latencia de Amazon Route 53 y AWS Global Accelerator mejora el rendimiento y la disponibilidad global, pero no evalúa la calidad ni la consistencia de las respuestas del modelo. Además, las auditorías semanales posteriores al despliegue son un proceso manual y reactivo, no un control automatizado que pueda bloquear un despliegue defectuoso antes de que llegue a producción, incumpliendo el requisito de bloqueo automático en el pipeline de CI/CD.\n\nOpción C: normalizar los mensajes de entrada a un formato consistente y aplicar comprobaciones basadas en reglas para detectar alucinaciones es un enfoque frágil y poco escalable: las reglas manuales no capturan bien las diferencias semánticas sutiles entre idiomas ni logran la cobertura y velocidad de evaluación en paralelo que exige el escenario (15.000 conversaciones en menos de 45 minutos). Tampoco aprovecha las capacidades nativas de evaluación de modelos de Amazon Bedrock, que están diseñadas específicamente para este tipo de análisis.\n\nOpción D (Correcta): Amazon Bedrock ofrece \"model evaluation jobs\" (trabajos de evaluación de modelos) que permiten crear conjuntos de datos de prueba (prompt datasets) con conversaciones estandarizadas de significado idéntico en varios idiomas, y ejecutarlos como un trabajo automático (automatic model evaluation job) usando un modelo evaluador (\"judge model\") o métricas basadas en referencia. Bedrock incluye métricas integradas relevantes para este caso, como Builtin.Faithfulness (que identifica contenido no respaldado por el contexto, es decir, alucinaciones) y Builtin.Correctness/Builtin.Relevance (que comparan la respuesta generada con una respuesta de referencia, es decir, similitud semántica). Estos trabajos se pueden crear y consultar mediante la API/CLI de Bedrock (por ejemplo, el comando \"aws bedrock create-evaluation-job\" y las acciones CreateEvaluationJob/GetEvaluationJob), lo que permite automatizarlos completamente e integrarlos en un pipeline de CI/CD, de forma que el pipeline consulte los resultados y bloquee el despliegue si las métricas de similitud o alucinación no superan los umbrales definidos. Esto es exactamente lo que exige el enunciado: evaluación estandarizada multilingüe, ejecución en paralelo para un alto volumen de casos en una ventana de tiempo corta, métricas de similitud/alucinación, e integración automatizada con bloqueo de despliegue en CI/CD.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-built-in-metrics.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-type-automatic.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-metrics.html",
    category: "Monitoring & Evaluation",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 70,
    questionNumber: 70,
    question: "A company is developing a generative AI (GenAI) application that uses Amazon Bedrock foundation models (FMs). The application has several custom tool integrations. The application has experienced unexpected token consumption surges despite consistent user traffic. The company needs a solution that uses Amazon Bedrock model invocation logging to monitor InputTokenCount metrics and OutputTokenCount metrics. The solution must detect unusual patterns in tool usage and identify which specific tool integrations cause abnormal token consumption. The solution must also automatically adjust thresholds as traffic patterns change. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Use Amazon CloudWatch Logs to capture model invocation logs. Create CloudWatch dashboards based on InputTokenCount metrics and OutputTokenCount metrics. Configure static CloudWatch alarms with fixed thresholds for each tool integration.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Store model invocation logs in an Amazon S3 bucket. Use AWS Glue to catalog the logs. Analyze token consumption patterns by using scheduled Amazon Athena queries that generate reports on tool usage trends.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use Amazon CloudWatch Logs to capture model invocation logs. Create CloudWatch metric filters to extract tool-specific invocation patterns. Apply CloudWatch anomaly detection alarms that adjust baselines for each tool's metrics.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Store model invocation logs in an Amazon S3 bucket. Create an AWS Lambda function to process logs in real time. Manually update Amazon CloudWatch alarm thresholds based on token consumption trends that the Lambda function identifies.",
        isCorrect: false
      }
    ],
    comments: "Opción A: usar Amazon CloudWatch Logs para capturar los logs de invocación de modelos y crear dashboards a partir de las métricas InputTokenCount y OutputTokenCount es un buen punto de partida, pero configurar alarmas de CloudWatch con umbrales fijos (\"static\") por cada integración de herramienta no cumple el requisito de que el sistema \"ajuste automáticamente los umbrales a medida que cambian los patrones de tráfico\". Un umbral estático generaría falsos positivos o falsos negativos en cuanto el volumen normal de tráfico cambie, ya que habría que revisarlo y modificarlo manualmente.\n\nOpción B: almacenar los logs de invocación en un bucket de Amazon S3, catalogarlos con AWS Glue y analizarlos mediante consultas programadas (scheduled) de Amazon Athena es un enfoque de análisis por lotes (batch) con retardo inherente al ciclo de programación de las consultas. No ofrece detección de anomalías en tiempo casi real ni ajusta umbrales de forma automática; simplemente genera informes periódicos sobre tendencias de uso, lo que no satisface el requisito de detectar rápidamente patrones inusuales por herramienta.\n\nOpción C (Correcta): Amazon Bedrock puede enviar los logs de invocación de modelos (model invocation logging) a Amazon CloudWatch Logs, donde quedan registrados el texto de entrada/salida y metadatos como InputTokenCount y OutputTokenCount para cada invocación, incluidas las que involucran herramientas (tool use). A partir de esos logs se pueden definir metric filters de CloudWatch que extraigan patrones específicos de cada integración de herramienta (por ejemplo, filtrando por el nombre de la tool invocada) y publiquen esos valores como métricas personalizadas de CloudWatch por cada tool. Sobre esas métricas se puede habilitar CloudWatch Anomaly Detection, una funcionalidad que aplica algoritmos estadísticos y de machine learning para construir un modelo de \"banda\" de valores esperados (baseline) para cada métrica, teniendo en cuenta tendencias y estacionalidad (por hora, día o semana). Las alarmas basadas en este modelo no usan un umbral fijo, sino que comparan el valor real con la banda de valores esperada y se disparan cuando el valor se sale de esa banda; el modelo se recalcula continuamente a partir de los datos históricos (hasta dos semanas), por lo que el \"umbral\" se adapta automáticamente a medida que cambian los patrones de tráfico, sin intervención manual. Esta combinación (model invocation logging + metric filters por herramienta + anomaly detection alarms) es exactamente la solución nativa de AWS que cumple los tres requisitos del enunciado: monitorizar InputTokenCount/OutputTokenCount, aislar qué integración de herramienta concreta causa el consumo anómalo, y ajustar los umbrales automáticamente.\n\nOpción D: almacenar los logs en S3 y procesarlos en tiempo real con una función AWS Lambda para después actualizar manualmente los umbrales de las alarmas de CloudWatch introduce trabajo operativo manual y un punto de fallo humano; no es una solución que \"ajuste automáticamente\" los umbrales como exige el enunciado, a diferencia del ajuste nativo y continuo que ofrece CloudWatch Anomaly Detection.\n\nReferencias:\n- https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html\n- https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html\n- https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-runtime-metrics.html",
    category: "Monitoring & Evaluation",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 71,
    questionNumber: 71,
    question: "A company is using Amazon Bedrock to develop an AI-powered application that uses a foundation model (FM) that supports cross-Region inference and provisioned throughput. The application must serve users in Europe and North America with consistently low latency. The application must comply with data residency regulations that require European user data to remain within Europe-based AWS Regions. During testing, the application experiences service degradation when Regional traffic spikes reach service quotas. The company needs a solution that maintains application resilience and minimizes operational complexity. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Deploy separate Amazon Bedrock instances in North American and European Regions. Use a custom routing layer that directs traffic based on user location. Configure Amazon CloudWatch alarms to monitor Regional service usage. Use Amazon SNS to send email alerts to the company when usage approaches specified thresholds.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use Amazon Bedrock cross-Region inference profiles by specifying geographical codes in profile IDs when the application calls the InvokeModel API. Configure separate Amazon API Gateway HTTP APIs to direct European and North American users to the appropriate Regional endpoints.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Deploy a multi-Region Amazon API Gateway HTTP API and AWS Lambda functions that implement retry logic to handle throttling. Configure the Lambda functions to call the FM in the nearest secondary Region when the application reaches service quotas in the primary Region. Use intelligent routing to ensure compliance with data residency requirements.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Configure provisioned throughput for Amazon Bedrock in multiple Regions. Implement failover logic in the application code to switch between Regions when throttling occurs. Use AWS Global Accelerator to route traffic to the appropriate endpoints based on user location.",
        isCorrect: false
      }
    ],
    comments: "Opción A: Amazon Bedrock no se despliega como \"instancias\" regionales que la propia empresa deba aprovisionar y gestionar manualmente; es un servicio totalmente gestionado al que se accede vía API en cada Región donde está disponible. Construir una capa de enrutamiento propia, sumada a alarmas de CloudWatch y notificaciones por correo vía SNS, es un mecanismo puramente reactivo: avisa a un humano de que se está acercando a la cuota, pero no evita la degradación del servicio ni resuelve el pico de tráfico de forma automática, además de añadir una complejidad operativa considerable que la pregunta pide minimizar.\n\nOpción B (Correcta): Amazon Bedrock ofrece perfiles de inferencia entre Regiones (cross-Region inference profiles) de dos tipos: geográficos (Geographic) y globales (Global). Los perfiles geográficos se identifican con un prefijo geográfico en el ID del perfil (por ejemplo \"us.\", \"eu.\" o \"apac.\") y, según la documentación oficial, cuando se invoca un perfil ligado a una geografía concreta, Amazon Bedrock selecciona automáticamente una Región comercial de AWS dentro de esa misma geografía para procesar la solicitud, manteniendo el procesamiento de datos dentro de esos límites geográficos (US, EU, APAC). Esto es precisamente lo que se recomienda para organizaciones con requisitos de residencia de datos y cumplimiento normativo. Además, al repartir automáticamente la carga entre varias Regiones de una misma geografía, este mecanismo absorbe picos de tráfico y ayuda a mitigar el impacto de alcanzar las cuotas de servicio de una única Región, sin necesidad de construir lógica de failover propia. Combinar esto con endpoints de Amazon API Gateway separados por Región (uno para tráfico europeo y otro para tráfico norteamericano) dirige a cada usuario al perfil de inferencia geográfico correcto (eu. o us.) desde el origen, cumpliendo así el requisito de residencia de datos con la mínima complejidad operativa, ya que es Bedrock quien gestiona internamente el enrutamiento y el reparto de capacidad entre Regiones.\n\nOpción C: aunque usar Lambda con lógica de reintentos y conmutación a una \"Región secundaria más cercana\" cuando se agota la cuota en la Región primaria puede aportar resiliencia técnica, existe un riesgo real de que las solicitudes de usuarios europeos terminen procesándose en una Región fuera de Europa (por ejemplo, en Norteamérica) si esa es la Región secundaria más cercana disponible, lo que incumpliría el requisito estricto de que los datos de usuarios europeos permanezcan en Regiones europeas. Además, esta solución obliga a diseñar, implementar y mantener manualmente toda la lógica de conmutación y reintentos, en lugar de aprovechar una funcionalidad nativa de Bedrock que ya resuelve este problema.\n\nOpción D: combinar Provisioned Throughput en varias Regiones con lógica de failover implementada en el código de la aplicación y AWS Global Accelerator para el enrutamiento por ubicación es técnicamente viable, pero exige aprovisionar y pagar capacidad dedicada en cada Región, además de construir y mantener manualmente toda la lógica de detección de throttling y conmutación entre Regiones. Esto añade una complejidad operativa significativamente mayor que la de usar los perfiles de inferencia entre Regiones ya gestionados por Bedrock, que resuelven de forma nativa tanto el reparto de tráfico como el cumplimiento de la residencia de datos.\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/geographic-cross-region-inference.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html",
    category: "Performance & Scaling",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 72,
    questionNumber: 72,
    question: "An international company is building an AI assistant that uses RAG. The company wants the AI assistant to have near real-time, low-latency performance. The AI assistant must provide service to several geographic areas. The company's customers will use proprietary data with the AI assistant. The proprietary data must not leave the company's immediate geographic area. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Deploy an Amazon Bedrock model with a cross-Region model inference profile. Create Amazon S3 buckets in each AWS Region the company operates in. Store a knowledge base in each respective S3 bucket. In each Region, configure Amazon Kendra to interact with the respective knowledge base. In each Region, configure an AWS Lambda function that uses Kendra and Amazon Bedrock to process AI assistant prompts.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Deploy an Amazon Bedrock model in each AWS Region the company operates in. Configure an Amazon Bedrock cross-Region model inference profile. Configure a vector database that uses Amazon Bedrock Knowledge Bases. Store the knowledge bases in Amazon S3 in each Region the company operates in.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Use AWS Outposts to deploy an outpost in each AWS Region the company operates in. Create Amazon S3 buckets to store knowledge bases in each corresponding Region. Deploy Amazon RDS configured as a vector database to each outpost. Deploy an Amazon Bedrock model with a cross-Region inference profile in a central Region.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Configure a knowledge base stored in the Amazon S3 Express One Zone storage class in each AWS Local Zone the company operates in. Use Amazon RDS to deploy a vector database in each Local Zone the company operates in. Deploy a large language model (LLM) to Amazon EC2 instances in each Local Zone. Configure the AI assistant to route prompts to the model in the respective Local Zone.",
        isCorrect: false
      }
    ],
    comments: "Opción A: usar Amazon Kendra como motor de recuperación obliga a construir manualmente la integración entre Kendra y Amazon Bedrock mediante funciones Lambda propias en cada Región, lo que añade complejidad de desarrollo e integración innecesaria frente a usar una Knowledge Base nativa y totalmente gestionada de Bedrock. Además, la opción no explica cómo se logra la baja latencia entre Regiones, ya que el perfil de inferencia entre Regiones (\"cross-Region inference profile\") ahí mencionado solo cubre el modelo, no la recuperación de la base de conocimiento.\n\nOpción B (Correcta): esta solución combina dos elementos clave. Primero, un perfil de inferencia entre Regiones (cross-Region inference profile) de tipo geográfico en Amazon Bedrock, que enruta las solicitudes de inferencia únicamente entre Regiones de AWS que pertenecen a la misma área geográfica (por ejemplo, US, EU o APAC). Según la documentación oficial de AWS, este mecanismo \"mantiene el procesamiento de datos dentro de los límites geográficos especificados\" y está diseñado específicamente para organizaciones con requisitos de residencia de datos y cumplimiento normativo, a la vez que aumenta el rendimiento (throughput) y reduce la latencia respecto a usar una única Región, absorbiendo picos de demanda al repartir la carga entre varias Regiones cercanas. Segundo, mantener una Amazon Bedrock Knowledge Base (con su almacén vectorial gestionado y los documentos fuente en un bucket de Amazon S3) en cada Región donde opera la empresa asegura que los datos propietarios de los clientes nunca salgan de su Región/área geográfica de origen, ya que la recuperación (retrieval) se realiza localmente contra la base de conocimiento de esa misma Región. La combinación de ambos elementos satisface simultáneamente el requisito de baja latencia casi en tiempo real, la cobertura multi-geográfica y la restricción de que los datos propietarios no salgan del área geográfica inmediata de la empresa.\n\nOpción C: desplegar AWS Outposts en cada Región, junto con Amazon RDS autogestionado como base de datos vectorial, es una solución de infraestructura dedicada (hardware físico de AWS en las instalaciones del cliente) mucho más compleja, costosa y con mayor carga operativa de la necesaria para este caso de uso, cuando el mismo objetivo de residencia de datos se puede lograr con servicios totalmente gestionados como Bedrock Knowledge Bases. Además, centralizar el modelo con un perfil de inferencia entre Regiones en una única Región central no garantiza por sí sola la latencia baja que se busca para todas las áreas geográficas.\n\nOpción D: alojar un modelo de lenguaje grande (LLM) propio en instancias EC2 en cada AWS Local Zone obliga a la empresa a gestionar por completo el ciclo de vida del modelo (aprovisionamiento, escalado, parcheo, actualización de pesos, etc.) y su infraestructura de inferencia, lo que incrementa drásticamente el esfuerzo operativo y el costo frente a usar un modelo totalmente gestionado a través de Amazon Bedrock, sin aportar ninguna ventaja adicional en materia de residencia de datos o latencia frente a la opción B.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/geographic-cross-region-inference.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 73,
    questionNumber: 73,
    question: "A company is building a generative AI (GenAI) application that processes financial reports and provides summaries for analysts. The application must run two compute environments. In one environment, AWS Lambda function must use the Python SDK to analyze reports on demand. In the second environment, Amazon EKS containers must use the JavaScript SDK to batch process multiple reports on a schedule. The application must maintain conversational context throughout multi-tum interactions, use the same foundation model (FM) across environments, and ensure consistent authentication. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Use the Amazon Bedrock InvokeModel API with a separate authentication method for each environment. Store conversation states in Amazon DynamoDB. Use custom I/O formatting logic for each programming language.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use the Amazon Bedrock Converse API directly in both environments with a common authentication mechanism that uses IAM roles. Store conversation states in Amazon ElastiCache. Creating programming language-specific wrappers for model parameters.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Create a centralized Amazon API Gateway REST API endpoint that handles all model interactions by using the InvokeModel API. Store interaction history in application process memory in each Lambda function or EKS container. Use environment variables to configure model parameters.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use the Amazon Bedrock Converse API and IAM roles for authentication. Pass previous messages in the request messages array to maintain conversational context. Use programming language-specific SDKs to establish consistent API interfaces.",
        isCorrect: true
      }
    ],
    comments: "Opción A: la API InvokeModel (y su variante en streaming, InvokeModelWithResponseStream) recibe y devuelve el cuerpo de la solicitud en un formato específico de cada proveedor de modelo, por lo que cambiar de FM o reutilizar el mismo código entre entornos obliga a mantener lógica de formateo de entrada/salida distinta para cada modelo. Además, usar un método de autenticación distinto en cada entorno (Lambda y EKS) contradice el requisito de autenticación consistente; lo correcto es usar roles de IAM con el permiso bedrock:InvokeModel en ambos entornos.\n\nOpción B: aunque sí usa la Converse API con IAM (acertado en ese punto), delegar el estado conversacional en un servicio externo como Amazon ElastiCache y construir wrappers específicos por lenguaje para los parámetros del modelo es innecesario: la propia Converse API ya expone un esquema de solicitud/respuesta unificado (arrays \"messages\", \"system\", \"inferenceConfig\", etc.) igual en todos los SDK de AWS, por lo que no hace falta normalizar parámetros por lenguaje, y el contexto conversacional puede mantenerse reenviando el propio array de mensajes sin infraestructura adicional.\n\nOpción C: centralizar las llamadas en un endpoint REST de Amazon API Gateway que internamente use la API InvokeModel no resuelve el problema del formato heterogéneo por proveedor de modelo (mismo problema que la opción A). Además, guardar el historial de interacción en la memoria de proceso de cada función Lambda o contenedor de EKS no persiste el contexto: las funciones Lambda son efímeras (su entorno de ejecución puede reciclarse entre invocaciones) y los procesos en EKS no comparten memoria entre sí ni con Lambda, por lo que el contexto conversacional se perdería entre turnos.\n\nOpción D (Correcta): la Converse API de Amazon Bedrock (operaciones Converse y ConverseStream, disponibles únicamente en el endpoint bedrock-runtime) proporciona una API consistente e independiente del modelo: permite escribir el código una sola vez y reutilizarlo con distintos FM de Bedrock que admiten mensajes, incluyendo soporte para parámetros específicos de un modelo cuando es necesario. Esta API está disponible de forma uniforme en los distintos SDK de AWS (boto3 para Python, AWS SDK for JavaScript, etc.), de modo que cada entorno —la función Lambda en Python y los contenedores de EKS en JavaScript— puede usar su SDK nativo manteniendo la misma interfaz de solicitud/respuesta. La autenticación se realiza mediante roles de IAM concediendo el permiso bedrock:InvokeModel (o bedrock:InvokeModelWithResponseStream para streaming), logrando un mecanismo de autenticación consistente entre ambos entornos. El contexto conversacional en interacciones multi-turno se mantiene simplemente incluyendo los mensajes previos (con sus roles \"user\"/\"assistant\") en el array \"messages\" de cada nueva solicitud, sin necesidad de infraestructura de almacenamiento externa dedicada solo para ese propósito.\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html",
    category: "Amazon Bedrock",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 74,
    questionNumber: 74,
    question: "A company is building a serverless application that uses AWS Lambda functions to help students around the world summarize notes. The application uses Anthropic Claude through Amazon Bedrock. The company observed that most of the traffic occurs during evenings in each time zone. Users report experiencing throttling errors during peak usage times in their times zones. The company needs to resolve the throttling issues by ensuring continuous operation of the application. The solution must maintain application performance quality. The company needs a solution that does not require a fixed hourly cost during low traffic periods. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Create custom Amazon CloudWatch metrics to monitor model errors. Set provisioned throughput to a value that is safely higher than the peak traffic observed.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Create custom Amazon CloudWatch metrics to monitor model errors. Set up a failover mechanism to redirect invocations to a backup AWS Region when the errors exceed a specified threshold.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Enable invocation logging in Amazon Bedrock. Monitor key metrics such as Invocations, InputTokenCount, OutputTokenCount, and Invocation Throttles. Distribute traffic across cross-Region inference endpoints.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Enable invocation logging in Amazon Bedrock. Monitor InvocationLatency, InvocationClientErrors, and InvocationServerErrors metrics. Distribute traffic across multiple versions of the same model.",
        isCorrect: false
      }
    ],
    comments: "Opción A: fijar el Provisioned Throughput a un nivel holgadamente superior al pico observado sí evitaría el throttling, pero el Provisioned Throughput se factura como un coste fijo por hora (o por compromiso de 1/6 meses) independientemente del uso real, por lo que la empresa pagaría esa capacidad reservada también durante las horas de bajo tráfico de cada zona horaria. Esto contradice explícitamente el requisito del enunciado de no incurrir en un coste fijo por hora durante los periodos de baja demanda.\n\nOpción B: configurar un failover hacia una región de respaldo solo cuando los errores superan un umbral es una medida puramente reactiva: actúa después de que el throttling ya se ha producido y los usuarios ya han sido afectados, en lugar de prevenirlo. Además, no aporta visibilidad específica sobre por qué ocurre el throttling (cuotas de tokens/solicitudes por minuto) ni distribuye la carga de forma proactiva entre regiones, por lo que no garantiza mantener la calidad de rendimiento de forma continua.\n\nOpción C (Correcta): habilitar el invocation logging de Amazon Bedrock y vigilar las métricas de CloudWatch del espacio de nombres AWS/Bedrock —Invocations, InputTokenCount, OutputTokenCount e InvocationThrottles (esta última cuenta específicamente las invocaciones limitadas por el sistema, y no se contabiliza como Invocations ni como error)— permite identificar con precisión cuándo y con qué intensidad se producen los throttles de cuota (RPM/TPM). Distribuir el tráfico mediante perfiles de inferencia entre regiones (cross-Region inference) permite que Amazon Bedrock enrute automáticamente las solicitudes hacia otras regiones dentro del perfil, aprovechando capacidad de cómputo adicional y evitando así el throttling causado por picos de tráfico regionales (como los que ocurren en horario nocturno de cada zona horaria) sin necesidad de reservar capacidad. Según la documentación oficial de AWS, cross-Region inference sigue utilizando tarifas on-demand (pago por uso, sin coste de enrutamiento adicional) y está recomendada precisamente para escenarios de \"disponibilidad continua\" donde la disponibilidad prima sobre el coste, cumpliendo así con el requisito de no tener un coste fijo por hora durante baja demanda.\n\nOpción D: monitorizar InvocationLatency, InvocationClientErrors e InvocationServerErrors no proporciona visibilidad directa sobre los throttles de cuota (esa es precisamente la función de la métrica InvocationThrottles, que aquí se omite). Además, \"distribuir el tráfico entre múltiples versiones del mismo modelo\" no resuelve el problema de cuota regional, ya que las distintas versiones de un modelo dentro de la misma región comparten los mismos límites de servicio (RPM/TPM) de esa región; no reparten la carga hacia otras regiones como sí hace cross-Region inference.\n\nReferencias:\n- https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-runtime-metrics.html\n- https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html\n- https://docs.aws.amazon.com/bedrock/latest/userguide/capacity-limits-cost-optimization.html",
    category: "Performance & Scaling",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 75,
    questionNumber: 75,
    question: "A company is developing a new AI-powered application that needs to integrate with various specialized tools. These tools currently run as Model Context Protocol (MCP) servers on the local machines of developers and do not maintain states between invocations. The company plans to deploy each MCP server as an AWS Lambda function to support the company's production application. The solution must be accessible to both internal applications and authorized third-party partners. The solution must use strict authentication and authorization controls. Which additional steps will meet these requirements with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Create a custom Lambda invocation transport by using the Lambda Invoke API. Implement IAM authentication and grant InvokeFunction permissions to authorized users and roles.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Expose the Lambda functions through Amazon API Gateway REST API endpoints. Implement API keys for authentication. Configure the applications that need to access the MCP servers to use standard HTTP requests instead of the MCP protocol.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Create Lambda function URLs and enable a custom Streamable HTTP transport and SigV4. Implement AWS IAM authentication. Grant InvokeFunctionUrl permissions to authorized users and roles.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Expose the Lambda function through Amazon API Gateway HTTP API endpoints with the Streamable HTTP transport. Use Amazon Cognito to implement OAuth authentication. Configure API Gateway to validate OAuth tokens.",
        isCorrect: false
      }
    ],
    comments: "Opción A: usar la API Lambda Invoke (RPC de control, no HTTP público) para construir un \"transporte personalizado\" no proporciona de forma nativa el transporte HTTP en streaming (Streamable HTTP) que exige el protocolo MCP; habría que desarrollar y mantener esa capa de transporte desde cero, además de exponerla de algún modo a terceros externos, lo que aumenta considerablemente el esfuerzo operativo frente a usar una URL HTTP nativa.\n\nOpción B: sustituir el protocolo MCP por peticiones HTTP estándar significa que las aplicaciones cliente dejarían de hablar MCP con esos servidores, lo que incumple el propio objetivo de desplegarlos como servidores MCP. Además, las claves de API de API Gateway son un mecanismo pensado para identificación y throttling, no para autenticación/autorización fuerte, y ofrecen garantías mucho más débiles que la firma SigV4 de IAM que exige el enunciado (\"controles estrictos de autenticación y autorización\").\n\nOpción C (Correcta): las Lambda function URLs se pueden configurar con \"InvokeMode\" = RESPONSE_STREAM, lo que permite que la función transmita la respuesta de forma incremental (streaming) y así soportar el transporte Streamable HTTP que usa el Model Context Protocol. Combinando esto con AuthType = AWS_IAM, cada solicitud debe autenticarse con credenciales de AWS firmadas mediante SigV4, y el acceso se controla otorgando permisos IAM (incluyendo lambda:InvokeFunctionUrl, y desde octubre de 2025 también lambda:InvokeFunction) tanto en políticas de identidad como, para el caso de terceros externos, en la política basada en recursos de la función (permitiendo así acceso entre cuentas a socios autorizados). Todo esto se logra sin aprovisionar, configurar ni mantener Amazon API Gateway, que es precisamente el objetivo de mínimo esfuerzo operativo que pide el enunciado; la propia guía de decisión de AWS Lambda posiciona las function URLs como la alternativa más sencilla a API Gateway cuando no se necesitan las funcionalidades adicionales de éste (planes de uso, autorizadores personalizados, dominios personalizados, etc.).\n\nOpción D: usar Amazon API Gateway (HTTP API) junto con Amazon Cognito para OAuth es una solución técnicamente válida y también soporta streaming, pero añade componentes adicionales que hay que aprovisionar, configurar y mantener (grupo de usuarios de Cognito, integración de autorización OAuth en API Gateway, gestión del ciclo de vida de tokens), lo que supone más esfuerzo operativo que usar directamente las Lambda function URLs con autenticación IAM nativa.\n\nReferencias:\nhttps://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/response-streaming-tutorial.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/apig-http-invoke-decision.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 76,
    questionNumber: 76,
    question: "A company has a generative AI (GenAI) application that uses Amazon Bedrock to provide real-time responses to customer queries. The company has noticed intermittent failures with API calls to foundation models (FMs) during peak traffic periods. The company needs a solution to handle transient errors and provide detailed observability into FM performance. The solution must prevent cascading failures during throttling events and provide distributed tracing across service boundaries to identify latency contributors. The solution must also enable correlation of performance issues with specific FM characteristics. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Implement a custom retry mechanism with a fixed delay of 1 second between retries. Configure Amazon CloudWatch alarms to monitor the application's error rates and latency metrics.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Configure the AWS SDK with standard retry mode and exponential backoff with jitter. Use AWS X-Ray tracing with annotations to identify and filter service components.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Implement client-side caching of all FM responses. Add custom logging statements in the application code to record API call durations.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Configure the AWS SDK with adaptive retry mode. Use AWS CloudTrail distributed tracing to monitor throttling events.",
        isCorrect: false
      }
    ],
    comments: "Opción A: usar un retraso fijo (por ejemplo, 1 segundo) entre reintentos, sin variabilidad aleatoria (jitter), hace que múltiples clientes que fallan al mismo tiempo reintenten sincronizados, lo que puede agravar el throttling durante picos de tráfico en lugar de mitigarlo. Además, las alarmas de Amazon CloudWatch sobre tasas de error y latencia son útiles para alertar, pero no ofrecen trazado distribuido entre los límites de los distintos servicios ni permiten correlacionar la latencia con componentes o llamadas concretas a los modelos.\n\nOpción B (Correcta): configurar el AWS SDK con el modo de reintentos \"standard\" aplica backoff exponencial con jitter de forma estandarizada entre SDKs, usando retrasos más cortos para errores transitorios (como timeouts de red) y retrasos más largos para errores de throttling (como ThrottlingException). Este modo incluye además una cuota de reintentos (token bucket) que hace que la aplicación falle rápido en lugar de seguir reintentando cuando los fallos son generalizados, lo cual ayuda a prevenir el efecto de fallos en cascada durante eventos de throttling. Por su parte, AWS X-Ray proporciona trazado distribuido real entre los límites de los distintos servicios de la aplicación (segmentos, subsegmentos y el mapa de servicios), permitiendo identificar en qué punto se concentra la latencia. Las anotaciones (annotations) de X-Ray son pares clave-valor indexados que se pueden usar en expresiones de filtro para buscar y agrupar trazas concretas, lo que permite correlacionar los problemas de rendimiento con características específicas del modelo de FM invocado (por ejemplo, el modelo o la versión utilizada).\n\nOpción C: cachear en el cliente todas las respuestas del modelo no soluciona los fallos transitorios de invocación al servicio (el problema que hay que resolver), y además puede servir respuestas obsoletas quitando sentido a la naturaleza \"en tiempo real\" de la aplicación. Añadir sentencias de logging personalizadas en el código registra duraciones de forma aislada, pero no aporta el contexto de traza correlacionado y propagado entre límites de servicio que sí ofrece X-Ray de forma nativa.\n\nOpción D: el modo de reintentos \"adaptive\" del SDK de AWS es una opción real y válida (incluye todo lo del modo standard más un limitador de tasa del lado del cliente que puede retrasar incluso la solicitud inicial cuando detecta throttling), pero AWS recomienda usarlo solo en casos concretos —un cliente que apunta a un único recurso con throttling frecuente— y no como opción general, ya que puede ralentizar también solicitudes a recursos no afectados. El problema decisivo de esta opción es la segunda parte: AWS CloudTrail registra la actividad de llamadas a la API (eventos de administración) con fines de auditoría y seguridad, pero no realiza trazado distribuido de solicitudes a través de los componentes de una aplicación; esa capacidad la proporciona AWS X-Ray, no CloudTrail.\n\nReferencias:\n- https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html\n- https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html\n- https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-events-with-cloudtrail.html",
    category: "Monitoring & Evaluation",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 77,
    questionNumber: 77,
    question: "A company is building a video analysis platform on AWS. The platform will analyze a large video archive by using Amazon Rekognition and Amazon Bedrock. The platform must comply with predefined privacy standards. The platform must also use secure model I/O, control foundation model (FM) access patterns, and provide an audit of who accessed what and when. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Configure VPC endpoints for Amazon Bedrock model API calls. Implement Amazon Bedrock Guardrails to filter harmful or unauthorized content in prompts and responses. Use Amazon Bedrock trace events to track all agent and model invocations for auditing purposes. Export the traces to Amazon CloudWatch Logs as an audit record of model usage. Store all prompts and outputs in Amazon S3 with server-side encryption with AWS KMS keys (SSE-KMS).",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Define access control by using IAM with attribute-based controls to map departments to specific permissions. Configure VPC endpoints for Amazon Bedrock model API calls. Use IAM condition keys to enforce specific GuardrailIdentifier and ModelId values. Configure AWS CloudTrail to capture management and data events for S3 objects and KMS key usage activities. Enable S3 server access logging to record detailed file-level interactions with the video archives. Send all CloudTrail logs to AWS CloudTrail Lake. Set up Amazon CloudWatch alarms to detect and alert on unexpected activity from Amazon Bedrock, Amazon Rekognition, and AWS KMS.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Restrict access to services by using VPC endpoint policies. Use AWS Config to track resource changes and compliance with security rules. Use server-side encryption with AWS KMS keys (SSE-KMS) to encrypt data at rest. Store the model's I/O in separate Amazon S3 buckets. Enable S3 server access logging to track file-level interactions.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Configure AWS CloudTrail Insights to analyze API call patterns across accounts and detect anomalous activity in Amazon Bedrock, Amazon Rekognition, Amazon S3, and AWS KMS. Deploy Amazon Macie to scan and classify the video archive. Use server-side encryption with AWS KMS keys (SSE-KMS) to encrypt all stored data. Configure CloudTrail to capture KMS API usage events for audit purposes. Configure Amazon EventBridge rules to process CloudTrail Insights anomalies and Macie findings. Use CloudWatch alarms to trigger automated notifications and security responses when potential security issues are detected.",
        isCorrect: false
      }
    ],
    comments: "Opción A: los endpoints de VPC para las llamadas a la API de Bedrock y Amazon Bedrock Guardrails filtran contenido dañino o no autorizado, y los trace events de Bedrock permiten rastrear invocaciones de agentes y modelos, pero esta opción no define ningún control de acceso granular (no hay IAM basado en atributos que mapee departamentos a permisos) ni registra el acceso a nivel de archivo del archivo de vídeo en S3 (no hay eventos de datos de CloudTrail sobre los objetos de S3 ni S3 server access logging). Los trace events ayudan a auditar el uso del modelo, pero no sustituyen una pista de auditoría completa de quién accedió a qué dato y cuándo.\n\nOpción B (Correcta): definir el control de acceso mediante IAM con control de acceso basado en atributos (ABAC), mapeando cada departamento a permisos concretos, junto con endpoints de VPC (AWS PrivateLink) para las llamadas a la API de Amazon Bedrock, proporciona E/S segura del modelo y control granular de quién puede invocarlo. Además, aplicar claves de condición de IAM como bedrock:GuardrailIdentifier (documentada oficialmente, permite forzar el uso de un guardrail concreto en las llamadas de inferencia como InvokeModel, InvokeModelWithResponseStream, Converse y ConverseStream) junto con una clave de condición asociada al modelo permite controlar de forma precisa qué guardrail y qué modelo fundacional (FM) puede invocar cada principal, cumpliendo el requisito de \"controlar los patrones de acceso al FM\". Configurar AWS CloudTrail para capturar eventos de gestión y de datos sobre los objetos de S3 y el uso de las claves de KMS, enviarlos a AWS CloudTrail Lake, activar el registro de acceso a nivel de archivo de S3 (S3 server access logging) y establecer alarmas de Amazon CloudWatch sobre Bedrock, Rekognition y KMS proporciona la auditoría detallada de \"quién accedió a qué y cuándo\" que exige el enunciado, junto con el cumplimiento de estándares de privacidad. Es la única opción que cubre de forma integral los tres requisitos: E/S segura del modelo, control de acceso al FM y auditoría completa.\n\nOpción C: restringir el acceso con políticas de endpoint de VPC y usar AWS Config para rastrear cambios de recursos y cumplimiento de reglas de seguridad no aporta un control de acceso basado en atributos (ABAC) ni condiciones específicas de guardrail o modelo que permitan controlar qué principal puede usar qué FM, que es uno de los requisitos explícitos del enunciado. AWS Config es una herramienta de cumplimiento de configuración, no de auditoría de acceso a datos por usuario.\n\nOpción D: AWS CloudTrail Insights detecta patrones anómalos en el volumen y la forma de las llamadas a la API, pero no constituye por sí solo un registro exhaustivo de cada acceso individual (para eso se necesitan los eventos de gestión y de datos de CloudTrail estándar). Amazon Macie clasifica la sensibilidad de los datos almacenados en S3, pero no controla el acceso a los FM. Esta opción tampoco incorpora condiciones de IAM que restrinjan qué guardrail o modelo puede usarse, por lo que no controla los patrones de acceso al FM como exige el enunciado.\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-permissions-id.html ; https://docs.aws.amazon.com/service-authorization/latest/reference/list_bedrock.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html",
    category: "Security & Governance",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 78,
    questionNumber: 78,
    question: "An insurance company uses existing Amazon SageMaker AI infrastructure to support a web-based application that allows customers to predict what their insurance premiums will be. The company stores customer data that is used to train the SageMaker AI model in an Amazon S3 bucket. The dataset is growing rapidly. The company wants a solution to continuously re-train the model. The solution must automatically re-train and re-deploy the model to the application when an employee uploads a new customer data file to the S3 bucket. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Use AWS Glue to run an ETL job on each uploaded file. Configure the ETL job to use the AWS SDK to invoke the Sage Maker AI model endpoint. Use real-time inference with the endpoint to re-deploy the model after it is re-trained on the updated customer dataset.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Create an AWS Lambda function and webhook handlers to generate an event when an employee uploads a new file. Configure SageMaker Pipelines to re-deploy the model after it is re-trained on the updated customer dataset. Use Amazon EventBridge to create an event bus. Set the Lambda function event as the source and SageMaker Pipelines as the target.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Create an AWS Step Functions Express workflow with AWS SDK integrations to retrieve the customer data from the S3 bucket when an employee uploads a new file to the S3 bucket. Use a SageMaker Data Wrangler flow to export the data from the S3 bucket to SageMaker Autopilot. Use SageMaker Autopilot to re-deploy the model after it has been re-trained on the updated customer dataset.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Create an AWS Step Functions Standard workflow. Configure the first state to call an AWS Lambda function to respond when an employee uploads a new file to the S3 bucket. Use a pipeline in SageMaker Pipelines to re-deploy the model after it has been re-trained on the updated customer dataset. Use the next state in the workflow to run the pipeline when the first state receives a response.",
        isCorrect: true
      }
    ],
    comments: "Opción A: usar AWS Glue para ejecutar un job ETL sobre cada archivo subido y después invocar el endpoint de SageMaker AI mediante el AWS SDK únicamente permite realizar inferencia en tiempo real contra un modelo ya desplegado; no reentrena el modelo con los nuevos datos ni orquesta un ciclo de entrenamiento, por lo que no cumple el requisito central de reentrenamiento automático.\n\nOpción B: aunque la combinación de una función AWS Lambda, un bus de eventos de Amazon EventBridge y SageMaker Pipelines es técnicamente viable para orquestar el reentrenamiento, la propuesta obliga a crear \"webhook handlers\" personalizados para detectar la subida del archivo. Esto es innecesario porque Amazon S3 ya puede emitir de forma nativa notificaciones de evento (Amazon S3 Event Notifications) o eventos a Amazon EventBridge cuando se crea un objeto, así que añade complejidad de integración que no aporta valor frente a una arquitectura más directa.\n\nOpción C: los flujos de trabajo Express de AWS Step Functions están diseñados para cargas de trabajo de alto volumen y corta duración (un máximo de cinco minutos de ejecución, con semántica \"at-most-once\" o \"at-least-once\"), lo que los hace inadecuados para orquestar un proceso de entrenamiento de un modelo de machine learning, que habitualmente tarda mucho más de cinco minutos. Además, encadenar SageMaker Data Wrangler con SageMaker Autopilot introduce un flujo de AutoML pensado para exploración automática de modelos, sin el control fino sobre el pipeline de reentrenamiento que ya existe para el modelo en producción, lo que resulta más pesado de lo necesario para este caso de uso.\n\nOpción D (Correcta): según la documentación de AWS, los flujos de trabajo Standard de Step Functions están pensados para procesos de larga duración, duraderos y auditables (pueden ejecutarse hasta durante un año), soportan reintentos configurables y ofrecen semántica de ejecución \"exactamente una vez\" (exactly-once) junto con el historial completo de ejecución recuperable vía la API de Step Functions. Estas características encajan perfectamente con la orquestación de un reentrenamiento de modelo, que puede tardar bastante más de los cinco minutos que soporta un flujo Express y que conviene poder auditar. En esta solución, el primer estado del flujo Standard invoca una función AWS Lambda que responde cuando un empleado sube un nuevo archivo de datos de clientes al bucket de Amazon S3; el siguiente estado del flujo ejecuta, a partir de esa respuesta, un pipeline de Amazon SageMaker Pipelines que reentrena el modelo con el dataset actualizado y lo vuelve a desplegar automáticamente en la aplicación.\n\nReferencias:\nhttps://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/step-functions-workflows.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/automating-sagemaker-with-eventbridge.html\nhttps://docs.aws.amazon.com/step-functions/latest/dg/sample-train-model.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 79,
    questionNumber: 79,
    question: "A company uses Amazon Bedrock to implement a Retrieval Augmented Generation (RAG)-based system to serve medical information to users. The company needs to compare multiple chunking strategies, evaluate the generation quality of two foundation models (FMs), and enforce quality thresholds for deployment. Which Amazon Bedrock evaluation configuration will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Create a retrieve-only evaluation job that uses a supported version of Anthropic Claude Sonnet as the evaluator model. Configure metrics for context relevance and context coverage. Define deployment thresholds in a separate CI/CD pipeline.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Create a retrieve-and-generate evaluation job that uses custom precision at k metrics and an LLM-as-a-judge metric that uses a scale of 1-5. Include each chunking strategy in the evaluation dataset. Use a supported version of Anthropic Claude Sonnet to evaluate responses from both FMs.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Create a separate evaluation job for each chunking strategy and FM combination. Use Amazon Bedrock built-in metrics for correctness and completeness. Manually review scores before deployment approval.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Set up a pipeline that uses multiple retrieve-only evaluation jobs to assess retrieval quality. Create separate evaluation jobs for both FMs that use Amazon Nova Pro as the LLM-as-a-judge model. Evaluate based on faithfulness and citation precision metrics.",
        isCorrect: false
      }
    ],
    comments: "Opción A: un trabajo de evaluación \"retrieve-only\" en Amazon Bedrock solo genera un informe basado en los datos recuperados del sistema RAG (usando métricas integradas como Context relevance y Context coverage), pero no evalúa en absoluto la respuesta generada por el modelo. Como el enunciado exige comparar explícitamente la calidad de generación de dos FMs distintos, este tipo de trabajo es insuficiente por diseño. Además, definir los umbrales de calidad en un pipeline de CI/CD separado desaprovecha el flujo de evaluación nativo de Bedrock en lugar de aprovecharlo.\n\nOpción B (Correcta): un trabajo de evaluación \"retrieve-and-generate\" (Retrieval and response generation) de Amazon Bedrock es el único tipo que produce un informe basado tanto en los pasajes recuperados de la base de conocimiento como en las respuestas generadas por el modelo, por lo que es el requerido cuando se necesita valorar la calidad de generación de los FMs. Amazon Bedrock permite definir hasta 10 métricas personalizadas por trabajo de evaluación, cada una con un prompt de instrucciones para un modelo \"juez\" (LLM-as-a-judge) y un esquema de puntuación propio (por ejemplo, una escala de 1 a 5); esto permite crear una métrica personalizada de precision at k para valorar objetivamente la calidad de la recuperación, y usar un modelo evaluador compatible (una versión soportada de Anthropic Claude Sonnet) como juez para puntuar de forma consistente las respuestas generadas por ambos FMs, estableciendo así umbrales de calidad claros antes del despliegue. Entre las cuatro opciones, es la única que combina el tipo de trabajo correcto (evalúa generación, no solo recuperación) con métricas capaces de comparar tanto estrategias de chunking como modelos generadores.\nMatiz importante para revisión humana: según la documentación oficial, cada trabajo de evaluación RAG de Bedrock (tanto en la consola como en la API create-evaluation-job) se configura contra una única base de conocimiento/fuente RAG (un solo \"knowledgeBaseId\" o \"ragSourceIdentifier\") y un único modelo generador (un solo \"modelArn\"); textualmente, al traer tus propias respuestas de inferencia \"solo puedes evaluar una fuente RAG por trabajo\". Esto sugiere que, en la práctica, comparar varias estrategias de chunking y dos FMs distintos normalmente requeriría ejecutar varios trabajos de evaluación (uno por combinación de estrategia de chunking y FM) y comparar después sus resultados, en lugar de un único trabajo que incluya \"cada estrategia de chunking\" y \"ambos FMs\" simultáneamente como sugiere el enunciado de la opción B. Aun así, entre las cuatro alternativas dadas, B sigue siendo la más correcta conceptualmente porque es la única que usa el tipo de evaluación (retrieve-and-generate) y las métricas (custom precision@k + LLM-as-a-judge) adecuadas para el objetivo planteado.\n\nOpción C: crear un trabajo de evaluación independiente por cada combinación de estrategia de chunking y FM es operativamente más alineado con la restricción real de \"una fuente RAG por trabajo\", pero la opción se apoya únicamente en métricas integradas de correctness y completeness (sin métricas personalizadas de recuperación como precision at k) y, sobre todo, delega la aprobación de despliegue a una revisión manual de las puntuaciones, lo cual no constituye un mecanismo automatizado y repetible de cumplimiento de umbrales de calidad.\n\nOpción D: encadenar múltiples trabajos \"retrieve-only\" para evaluar la recuperación junto con trabajos de generación separados por FM que usan Amazon Nova Pro como juez, basándose en faithfulness y citation precision, fragmenta la evaluación en piezas desconectadas: la fase de recuperación y la de generación se evalúan por separado y nunca de forma conjunta con el mismo trabajo \"retrieve-and-generate\", por lo que no se mide realmente el efecto combinado de cada estrategia de chunking sobre la respuesta final generada.\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-kb.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation-metrics.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/kb-evaluation-custom-metrics-prompt-formats.html",
    category: "Monitoring & Evaluation",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 80,
    questionNumber: 80,
    question: "A wildlife conservation agency operates zoos globally. The agency uses various sensors, trackers, and audiovisual recorders to monitor animal behavior. The agency wants to launch a generative AI (GenAI) assistant that can ingest multimodal data to study animal behavior. The GenAI assistant must support natural language queries, avoid speculative behavioral interpretations, and maintain audit logs for ethical research audits. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Ingest raw videos into Amazon Rekognition to detect animal postures and expressions. Use Amazon Data Firehose to stream sensor and GPS data into an Amazon S3 data lake. Prompt an Amazon Bedrock foundation model (FM) by using basic templates that are stored in AWS Systems Manager Parameter Store. Use IAM policies to control access. Use AWS CloudTrail for audit logging.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use Amazon SageMaker Processing and Amazon Transcribe to pre-process multimodal data. Ingest summaries into an Amazon Bedrock Retrieval Augmented Generation (RAG) knowledge base. Apply Amazon Bedrock guardrails to restrict speculative outputs. Use AWS AppConfig to manage prompt templates. Use AWS CloudTrail to log research activity for audits.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Use Amazon OpenSearch Serverless to index behavioral logs and telemetry events. Use Amazon Comprehend to extract entities. Use Amazon Bedrock to build a layer to answer questions. Embed study summaries into OpenSearch Serverless documents. Use IAM to control access. Use AWS CloudTrail to log user interactions with the AI assistant.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Configure Amazon Q Business to federate data across Amazon S3, Amazon Kinesis, and Amazon SageMaker Feature Store. Configure Amazon EventBridge to invoke data ingestion jobs. Use custom AWS Lambda functions to filter large language model (LLM) outputs for ethical compliance before returning results to users.",
        isCorrect: false
      }
    ],
    comments: "Opción A: usar Amazon Rekognition para detectar posturas y expresiones animales en los vídeos y Amazon Data Firehose para volcar los datos de sensores y GPS a un data lake en S3 permite ingerir datos multimodales, pero construir los prompts del modelo de Amazon Bedrock a partir de plantillas básicas guardadas en AWS Systems Manager Parameter Store no aporta ningún mecanismo de anclaje (RAG) ni de guardrails que impida al modelo generar interpretaciones especulativas del comportamiento animal, que es un requisito explícito del enunciado. AWS CloudTrail sí cubriría la auditoría, pero falta el control de contenido especulativo.\n\nOpción B (Correcta): usar Amazon SageMaker Processing junto con Amazon Transcribe para preprocesar los datos multimodales (transcribir audio, extraer metadatos de vídeo y normalizar datos de sensores) y convertirlos en resúmenes estructurados es un patrón habitual de preprocesamiento antes de indexar contenido. Ingerir esos resúmenes en una Knowledge Base de Amazon Bedrock implementa Retrieval Augmented Generation (RAG): las respuestas del asistente se generan recuperando primero los fragmentos relevantes de la base de conocimiento y usándolos como contexto factual para el modelo, lo que ancla las respuestas en los registros empíricos reales en lugar de dejar que el modelo \"invente\" a partir de su conocimiento paramétrico. Aplicar Amazon Bedrock Guardrails permite restringir explícitamente salidas especulativas mediante políticas de \"denied topics\" (temas denegados), filtros de contenido y otras salvaguardas configurables que se aplican tanto a las entradas del usuario como a las respuestas del modelo. Gestionar las plantillas de prompts en AWS AppConfig permite versionar y actualizar de forma controlada la forma en que se instruye al modelo (por ejemplo, para reforzar la instrucción de \"no especular\"). Finalmente, AWS CloudTrail registra las llamadas a las API de Amazon Bedrock (incluidas las de generación e invocación de modelos), lo que proporciona el registro de auditoría necesario para las revisiones éticas de la investigación. En conjunto, esta solución cubre las cuatro exigencias del enunciado: consultas en lenguaje natural, ingestión de datos multimodales con base empírica real (RAG), no especulación (guardrails) y auditoría (CloudTrail).\n\nOpción C: indexar logs de comportamiento y telemetría en Amazon OpenSearch Serverless y usar Amazon Comprehend para extraer entidades, junto con una capa de Amazon Bedrock para responder preguntas, permite construir un sistema de búsqueda y respuesta funcional, pero no incorpora ningún control de tipo guardrail (como los \"denied topics\" o filtros de contenido de Bedrock Guardrails) que evite explícitamente que el modelo genere respuestas especulativas sobre el comportamiento animal, que es uno de los requisitos centrales de la pregunta.\n\nOpción D: Amazon Q Business federando datos de Amazon S3, Amazon Kinesis y Amazon SageMaker Feature Store actúa como un asistente de búsqueda empresarial sobre fuentes de datos estructuradas y documentales, pero no está diseñado como un pipeline especializado para procesar y resumir contenido de audio y vídeo (multimodal) como el que generan los sensores, trackers y grabaciones audiovisuales del enunciado. Además, filtrar las salidas del LLM mediante funciones AWS Lambda personalizadas \"para cumplimiento ético\" es una solución ad hoc basada en reglas propias del desarrollador, no un guardrail gestionado, versionado y auditable como el que ofrece nativamente Amazon Bedrock Guardrails.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-multimodal.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html",
    category: "Guardrails & Safety",
    multiSelect: false,
    requiredCount: 1
  }
];
