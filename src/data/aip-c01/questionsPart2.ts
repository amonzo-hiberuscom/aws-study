import { Question } from '../../types';

export const QUESTIONS_PART_2: Question[] = [
  {
    id: 31,
    questionNumber: 31,
    question: "A company has a recommendation system. The system's applications run on Amazon EC2 instances. The applications make API calls to Amazon Bedrock foundation models (FMs) to analyze customer behavior and generate personalized product recommendations. The system is experiencing intermittent issues. Some recommendations do not match customer preferences. The company needs an observability solution to monitor operational metrics and detect patterns of operational performance degradation compared to established baselines. The solution must also generate alerts with correlation data within 10 minutes when FM behavior deviates from expected patterns. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Configure Amazon CloudWatch Container Insights for the application infrastructure. Set up CloudWatch alarms for latency thresholds. Add custom metrics for token counts by using the CloudWatch embedded metric format. Create CloudWatch dashboards to visualize the data.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Implement AWS X-Ray to trace requests through the application components. Enable CloudWatch Logs Insights for error pattern detection. Set up AWS CloudTrail to monitor all API calls to Amazon Bedrock. Create custom dashboards in Amazon QuickSight.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Enable Amazon CloudWatch Application Insights for the application resources. Create custom metrics for recommendation quality, token usage, and response latency by using the CloudWatch embedded metric format with dimensions for request types and user segments. Configure CloudWatch anomaly detection on the model metrics. Establish log pattern analysis by using CloudWatch Logs Insights.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Use Amazon OpenSearch Service with the Observability plugin. Ingest model metrics and logs by using Amazon Kinesis. Create custom Piped Processing Language (PPL) queries to analyze model behavior patterns. Establish operational dashboards to visualize anomalies in real time.",
        isCorrect: false
      }
    ],
    comments: "Opción A: Amazon CloudWatch Container Insights recopila métricas de infraestructura de contenedores (CPU, memoria, red, disco) para clústeres ECS/EKS/Kubernetes en EC2. No analiza la calidad de las recomendaciones del modelo ni establece líneas base de comportamiento del FM, por lo que no cumple el requisito de detectar desviaciones respecto a un patrón operativo esperado.\n\nOpción B: AWS X-Ray traza la latencia y el flujo de solicitudes entre componentes de la aplicación, y AWS CloudTrail audita quién y cuándo invocó la API de Amazon Bedrock (control plane / data plane), pero ninguno de los dos establece una línea base estadística de métricas de negocio (calidad de recomendación, uso de tokens) ni genera de forma nativa alertas correlacionadas cuando el comportamiento se desvía de lo esperado; requeriría construir esa lógica de correlación manualmente en QuickSight, lo que no cumple el requisito de detección automática en minutos.\n\nOpción C (Correcta): Amazon CloudWatch Application Insights escanea los recursos de la aplicación (incluidas instancias EC2) y monitoriza continuamente métricas y logs para detectar y correlacionar anomalías y errores; agrupa estas \"observaciones\" relacionadas en \"problemas\", genera automáticamente paneles (dashboards) que muestran las anomalías de métricas y los errores de log correlacionados junto con posibles causas raíz, y puede enviar notificaciones (por ejemplo, vía Amazon SNS o CloudWatch Events) cuando se detecta un problema. Al añadir métricas personalizadas en formato EMF (Embedded Metric Format) para calidad de recomendación, uso de tokens y latencia de respuesta —con dimensiones por tipo de solicitud y segmento de usuario—, estas métricas personalizadas quedan disponibles para que CloudWatch Anomaly Detection aprenda una línea base estadística por métrica (basada en patrones históricos, incluyendo estacionalidad) y dispare alarmas cuando el valor real se sale de la banda esperada. Combinado con CloudWatch Logs Insights para el análisis de patrones de error en los logs, esta solución integra correlación de métricas, detección de anomalías respecto a baselines establecidos y generación de alertas en cuestión de minutos, cumpliendo todos los requisitos del enunciado.\n\nOpción D: Amazon OpenSearch Service con el plugin de Observability y consultas PPL (Piped Processing Language) es una solución potente de análisis de logs y trazas, pero no está integrado de forma nativa con las métricas de Amazon Bedrock ni con CloudWatch; requeriría un pipeline de ingesta adicional (Kinesis) y desarrollo de consultas y paneles a medida, lo que añade complejidad operativa y latencia innecesarias frente a una solución nativa como CloudWatch Application Insights.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/appinsights-what-is.html\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/implementing-logging-monitoring-cloudwatch/cloudwatch-search-analysis.html",
    category: "Monitoring & Evaluation",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 32,
    questionNumber: 32,
    question: "An enterprise application uses an Amazon Bedrock foundation model (FM) to process and analyze 50 to 200 pages of technical documents. Users are experiencing inconsistent responses and receiving truncated outputs when processing documents that exceed the FM's context window limits. Which solution will resolve this problem?",
    choices: [
      {
        letter: "A",
        text: "Configure fixed-size chunking at 4,000 tokens for each chunk with 20% overlap. Use application-level logic to link multiple chunks sequentially until the FM's maximum context window of 200,000 tokens is reached before making inference calls.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use hierarchical chunking with parent chunks of 8,000 tokens and child chunks of 2,000 tokens. Use Amazon Bedrock Knowledge Bases built-in retrieval to automatically select relevant parent chunks based on query context. Configure overlap tokens to maintain semantic continuity.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use semantic chunking with a breakpoint percentile threshold of 95% and a buffer size of 3 sentences. Use the Amazon Bedrock RetrieveAndGenerate API call to dynamically select the most relevant chunks based on embedding similarity scores.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Create a pre-processing AWS Lambda function that analyzes document token count by using the FM's tokenizer. Configure the lambda function to split documents into equal segments that fit within 80% of the context window. Configure the Lambda function to process each segment independently before aggregating the results.",
        isCorrect: false
      }
    ],
    comments: "Opción A: el chunking de tamaño fijo (4,000 tokens por fragmento con 20% de solapamiento) enlazado secuencialmente hasta alcanzar los 200,000 tokens de ventana de contexto no resuelve el problema de fondo: sigue enviando al modelo bloques de texto completos sin priorizar qué información es realmente relevante para la consulta del usuario, por lo que documentos muy extensos seguirán generando respuestas inconsistentes o truncadas al acercarse al límite de la ventana de contexto. Además, el chunking de tamaño fijo puede cortar el contenido en puntos arbitrarios que rompen el significado semántico.\n\nOpción B: el chunking jerárquico (parent chunks de 8,000 tokens y child chunks de 2,000 tokens) permite mantener contexto entre fragmentos padre e hijo, y Amazon Bedrock Knowledge Bases sí puede sustituir automáticamente los child chunks recuperados por su parent chunk correspondiente en la respuesta final. Sin embargo, no divide el texto según límites semánticos reales (solo por tamaño en dos niveles), por lo que no garantiza que los fragmentos recuperados sean los más relevantes desde el punto de vista del significado, y el uso de parent chunks grandes (8,000 tokens) puede seguir empujando la ventana de contexto del modelo hacia el límite cuando se combinan varios de ellos.\n\nOpción C (Correcta): el chunking semántico (SEMANTIC) en Amazon Bedrock Knowledge Bases divide los documentos en fragmentos que priorizan el significado semántico sobre la estructura sintáctica, usando un umbral de percentil de ruptura (breakpointPercentileThreshold) y un tamaño de buffer en oraciones (bufferSize) para decidir dónde cortar el texto sin romper ideas completas. Esto evita que un fragmento mezcle contenido no relacionado o corte una idea a la mitad, lo cual reduce las respuestas inconsistentes. Combinado con la API RetrieveAndGenerate de Amazon Bedrock Knowledge Bases, el sistema realiza una búsqueda vectorial (configurable mediante KnowledgeBaseVectorSearchConfiguration) que recupera únicamente los fragmentos más relevantes por similitud de embeddings para la consulta del usuario, en lugar de enviar el documento completo al modelo. De esta forma se evita superar la ventana de contexto de la FM y se reducen tanto las salidas truncadas como las respuestas inconsistentes al procesar documentos de 50 a 200 páginas.\n\nOpción D: crear una función AWS Lambda de preprocesamiento que calcule el conteo de tokens con el tokenizador de la FM y divida el documento en segmentos de igual tamaño (80% de la ventana de contexto) es una solución completamente manual que no agrupa el contenido por significado semántico. Procesar cada segmento de forma independiente y luego agregar los resultados puede producir respuestas inconsistentes porque cada llamada de inferencia carece del contexto completo del documento, y no existe ningún mecanismo de recuperación que priorice la información más relevante para la consulta.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-customize-ingestion.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve-generate.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 33,
    questionNumber: 33,
    question: "A company is developing a generative AI (GenAI) application that analyzes customer service calls in real-time and generates suggested responses for human customer service agents. The application must process 500,000 concurrent calls during peak hours with less than 200 ms end-to-end latency for each suggestion. The company uses existing architecture to transcribe customer call audio streams. The application must not exceed a pre-defined monthly compute budget and must maintain auto scaling capabilities. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Deploy a large, complex reasoning model on Amazon Bedrock. Purchase provisioned throughput and optimize for batch processing.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Deploy a low-latency, real-time optimized model on Amazon Bedrock. Purchase provisioned throughput and set up automatic scaling policies.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Deploy a large language model (LLM) on an Amazon SageMaker AI real-time endpoint that uses dedicated GPU instances.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Deploy a mid-sized language model on an Amazon SageMaker AI serverless endpoint that is optimized for batch processing.",
        isCorrect: false
      }
    ],
    comments: "Opción A: un modelo grande orientado a razonamiento complejo, combinado con una optimización para procesamiento por lotes (batch), no está pensado para cumplir una latencia inferior a 200 ms por respuesta. El procesamiento por lotes agrupa solicitudes para maximizar el rendimiento (throughput) agregado, no para minimizar la latencia individual de cada sugerencia en un escenario de generación en tiempo real, por lo que no cumple el requisito principal del enunciado.\n\nOpción B (Correcta): Amazon Bedrock ofrece \"Latency Optimized Inference\" (inferencia optimizada para latencia), una capacidad que reduce el tiempo de respuesta del modelo sin sacrificar la precisión, adecuada para generar sugerencias en vivo durante llamadas de atención al cliente. El Provisioned Throughput de Bedrock permite reservar capacidad de cómputo dedicada (Model Units) mediante un compromiso de duración (sin compromiso, 1 mes o 6 meses) con un coste horario fijo y predecible, lo que ayuda a controlar el presupuesto mensual y a sostener un volumen alto de llamadas concurrentes. Combinado con políticas de auto scaling a nivel de aplicación (por ejemplo, para la capa de orquestación/Lambda que invoca el modelo), esta es la opción que mejor encaja de las cuatro con los requisitos de latencia, escala y presupuesto del enunciado.\n\nOpción C: un endpoint en tiempo real de Amazon SageMaker AI con instancias GPU dedicadas sí admite auto scaling nativo mediante Application Auto Scaling y puede alcanzar baja latencia, pero obliga a la empresa a alojar y gestionar directamente el modelo (selección y dimensionamiento de instancias, actualizaciones, políticas de escalado, parcheo), en lugar de aprovechar un servicio de inferencia totalmente gestionado como Bedrock. Además, esta opción no incorpora una capacidad equivalente a la inferencia optimizada para latencia de Bedrock, lo que aumenta el riesgo y la complejidad operativa frente a la opción B.\n\nOpción D: un endpoint sin servidor (serverless) de SageMaker AI está pensado para tráfico intermitente e impredecible y escala automáticamente los recursos, pero introduce latencia de arranque en frío (cold start, reflejada en la métrica OverheadLatency de SageMaker) que fácilmente puede superar el umbral de 200 ms, en particular para modelos de lenguaje. Además, SageMaker Serverless Inference no es una modalidad \"optimizada para procesamiento por lotes\": el procesamiento por lotes en SageMaker se realiza mediante Batch Transform, un mecanismo distinto orientado a inferencia asíncrona y no interactiva. Por ambos motivos, esta opción no es apta para el caso de uso en tiempo real descrito.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/latency-optimized-inference.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html",
    category: "Performance & Scaling",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 34,
    questionNumber: 34,
    question: "An ecommerce company is building an internal platform to develop generative AI applications by using Amazon Bedrock foundation models (FMs). Developers need to select models based on evaluations that are aligned to ecommerce use cases. The platform must display accuracy metrics for text generation and summarization in dashboards. The company has custom ecommerce datasets to use as standardized evaluation inputs. Which combination of steps will meet these requirements with the LEAST operational overhead? (Choose two.)",
    choices: [
      {
        letter: "A",
        text: "Import the datasets to an Amazon S3 bucket. Provide appropriate IAM permissions and cross-origin resource sharing (CORS) permissions to give the evaluation jobs access to the datasets.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Import the datasets to an Amazon S3 bucket. Provide appropriate IAM permissions and a VPC endpoint configuration to give the evaluation jobs access to the datasets.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Configure an AWS Lambda function to create model evaluation jobs on a schedule in the Amazon Bedrock console. Provide the URI of the S3 bucket that contains the datasets as an input. Configure the evaluation jobs to measure the real world knowledge (RWK) score for text generation and BERT Score for summarization. Configure a second Lambda function to check the status of the jobs and publish custom logs to Amazon CloudWatch. Create a custom Amazon CloudWatch Logs Insights dashboard.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Use Amazon SageMaker Clarify on a schedule to create model evaluation jobs. Use open source frameworks to create and run standardized evaluations. Publish results to Amazon CloudWatch namespaces. Use the word error rate score for text generation and toxicity for summarization as metrics for accuracy. Configure an AWS Lambda function to check the status of the jobs and publish custom logs to CloudWatch. Create a custom Amazon CloudWatch Logs Insights dashboard.",
        isCorrect: false
      },
      {
        letter: "E",
        text: "Run an Amazon SageMaker AI notebook job on a schedule by using the fmevals or ragas framework to run evaluations that use the datasets in the S3 bucket. Write Python code in the notebook that makes direct InvokeModel API calls to the FMs and processes their responses for evaluation. Publish job status and results to Amazon CloudWatch Logs to measure the real world knowledge (RWK) score for text generation and toxicity for summarization as metrics for accuracy. Create a custom CloudWatch Logs Insights dashboard.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): para que un trabajo de evaluación de modelos de Amazon Bedrock pueda leer y escribir datos, el bucket de Amazon S3 debe estar en la misma región de AWS que el trabajo, y el rol de servicio de Bedrock necesita permisos de IAM adecuados sobre ese bucket (lectura de los datasets de entrada y escritura de los resultados). Es importante matizar, según la documentación oficial de AWS, que la configuración de Cross-Origin Resource Sharing (CORS) en el bucket de salida es un requisito exclusivo de los trabajos de evaluación basados en revisión humana (para que el portal de anotadores pueda mostrar los prompts y las respuestas del modelo en el navegador); los trabajos de evaluación automática, como el que necesita esta empresa, no requieren configuración CORS. Aun así, entre las opciones disponibles, A representa el enfoque de acceso a datos con menor sobrecarga operativa (solo IAM sobre S3), frente a la alternativa de la opción B.\nOpción B: un endpoint de VPC no es necesario para que el servicio de evaluación de modelos de Bedrock acceda a un bucket de S3 estándar; solo sería necesario si el tráfico debiera mantenerse dentro de una VPC sin salida a Internet, algo que el enunciado no exige. Añadir un endpoint de VPC (Gateway o Interface) implica configuración de red adicional, puntos de enrutamiento y mantenimiento continuo, lo que incrementa innecesariamente la sobrecarga operativa frente a la opción A.\nOpción C (Correcta): Amazon Bedrock permite crear trabajos de evaluación automática de modelos (sin intervención humana) por consola, API o SDK, usando datasets propios almacenados en S3 como entrada. Según la documentación oficial, para la tarea de \"General text generation\" la métrica de precisión (Accuracy) se calcula como el score de Real World Knowledge (RWK), y para la tarea de \"Text summarization\" la métrica de precisión se calcula como BERTScore; esto coincide exactamente con lo descrito en la opción. Automatizar la creación periódica de estos trabajos con una función Lambda, monitorizar su estado con una segunda Lambda que publique logs personalizados en Amazon CloudWatch, y visualizar los resultados en un panel de CloudWatch Logs Insights, es una arquitección totalmente gestionada (serverless) que aprovecha las capacidades nativas de evaluación de Bedrock, ofreciendo así la mínima sobrecarga operativa.\nOpción D: Amazon SageMaker Clarify no es el mecanismo nativo de evaluación de modelos generativos de Amazon Bedrock (aunque SageMaker Clarify puede evaluar modelos de Bedrock mediante el framework FMEval, requiere más configuración y mantenimiento que los trabajos de evaluación integrados de Bedrock). Además, las métricas propuestas en esta opción son incorrectas para el objetivo del enunciado: \"word error rate\" es la métrica asociada a la tarea de robustez en generación de texto (no a precisión/accuracy) y \"toxicity\" es una métrica de toxicidad, no de precisión para resumen; la métrica de precisión correcta para resumen es BERTScore. Esta combinación suma fragmentación, métricas mal alineadas y complejidad operativa innecesarias.\nOpción E: ejecutar un notebook job de SageMaker AI que invoque directamente la API InvokeModel de Bedrock y use frameworks de código abierto (fmeval o ragas) obliga a construir y mantener manualmente toda la lógica de orquestación, cálculo de métricas y manejo de errores, en lugar de usar los trabajos de evaluación nativos y totalmente gestionados de Bedrock. Esto implica un esfuerzo de desarrollo, prueba y mantenimiento considerablemente mayor, además de que, igual que en la opción D, \"real world knowledge (RWK)\" sí es la métrica correcta de precisión para generación de texto, pero \"toxicity\" no es una métrica de precisión para resumen (la métrica de precisión correcta es BERTScore), lo que añade además una imprecisión técnica a la sobrecarga operativa de este enfoque.\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-type-automatic.html, https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-tasks-general-text.html, https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-tasks-text-summary.html",
    category: "Monitoring & Evaluation",
    multiSelect: true,
    requiredCount: 2
  },
  {
    id: 35,
    questionNumber: 35,
    question: "An elevator service company has developed an AI assistant application by using Amazon Bedrock. The application generates elevator maintenance recommendations to support the company's elevator technicians. The company uses Amazon Kinesis Data Streams to collect the elevator sensor data. New regulatory rules require that a human technician must review all AI-generated recommendations. The company needs to establish human oversight workflows to review and approve AI recommendations. The company must store all human technician review decisions for audit purposes. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Create a custom approval workflow by using AWS Lambda functions and Amazon SQS queues for human review of AI recommendations. Store all review decisions in Amazon DynamoDB for audit purposes.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Create an AWS Step Functions workflow that has a human approval step that uses the waitForTaskToken API to pause execution. After a human technician completes a review, use an AWS Lambda function to call the SendTaskSuccess API that has the approval decision. Store all review decisions in Amazon DynamoDB.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Create an AWS Glue workflow that has a human approval step. After the human technician review, integrate the application with an AWS Lambda function that calls the SendTaskSuccess API. Store all human technician review decisions in Amazon DynamoDB.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Configure Amazon EventBridge rules with custom event patterns to route AI recommendations to human technicians for review. Create AWS Glue jobs to process human technician approval queues. Use Amazon ElastiCache to cache all human technician review decisions.",
        isCorrect: false
      }
    ],
    comments: "Opción A: Construir un flujo de aprobación personalizado con funciones AWS Lambda y colas Amazon SQS es técnicamente posible, pero requiere implementar manualmente toda la lógica de sondeo (polling), el seguimiento del estado de la aprobación y el reintento ante fallos. AWS no ofrece esto como un patrón nativo de orquestación con pausa, por lo que añade complejidad operativa y de mantenimiento innecesaria frente a una solución ya soportada de forma nativa por el servicio de orquestación.\n\nOpción B (Correcta): AWS Step Functions admite de forma nativa el patrón de integración de servicio \"Wait for a Callback with the Task Token\" (identificado por el sufijo `.waitForTaskToken` en el recurso de la tarea). Cuando el flujo de trabajo llega a este paso, Step Functions genera un token de tarea único, lo entrega al recurso integrado (por ejemplo, una función Lambda que notifica al técnico, vía Amazon SNS o similar) y pausa la ejecución del state machine indefinidamente (hasta el tiempo límite configurado) sin consumir cómputo mientras espera. Cuando el técnico humano completa la revisión, una función Lambda invoca la API `SendTaskSuccess` (o `SendTaskFailure` en caso de rechazo) pasando el token de tarea junto con la decisión, lo que reanuda automáticamente la ejecución del flujo en el punto exacto donde se pausó. Este es precisamente el patrón documentado por AWS en el tutorial oficial \"Deploying a workflow that waits for human approval in Step Functions\", que despliega un ejemplo completo con Lambda, SNS y Step Functions. Almacenar cada decisión de revisión en Amazon DynamoDB cumple el requisito regulatorio de contar con un registro de auditoría duradero y consultable de todas las aprobaciones/rechazos humanos.\n\nOpción C: AWS Glue es un servicio de integración y transformación de datos (ETL) orientado a trabajos por lotes; no está diseñado como orquestador de flujos de trabajo de aprobación y no ofrece un mecanismo nativo de pausa a la espera de una decisión humana. La mención de que un Glue workflow \"llama a SendTaskSuccess\" no corresponde a ninguna integración real documentada por AWS: esa API es específica de Step Functions y de sus integraciones de callback, no de AWS Glue.\n\nOpción D: Amazon EventBridge permite enrutar eventos según patrones, pero no tiene capacidad de pausar y reanudar una ejecución en espera de una decisión externa; una vez publicado el evento, EventBridge no mantiene un \"estado de espera\". Usar AWS Glue para procesar colas de aprobación tampoco resuelve el problema de orquestación con pausa (ver opción C), y Amazon ElastiCache es una caché en memoria pensada para datos efímeros y de alto rendimiento, no un almacén duradero y auditable como el que exige la normativa para conservar decisiones de revisión humana.\n\nReferencias:\n- https://docs.aws.amazon.com/step-functions/latest/dg/tutorial-human-approval.html\n- https://docs.aws.amazon.com/lambda/latest/dg/with-step-functions.html\n- https://docs.aws.amazon.com/step-functions/latest/dg/connect-lambda.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 36,
    questionNumber: 36,
    question: "A bank is building a generative AI (GenAI) application that uses Amazon Bedrock to assess loan applications by using scanned financial documents. The application must extract structured data from the documents. The application must redact personally identifiable information (PII) before inference. The application must use foundation models (FMs) to generate approvals. The application must route low-confidence document extraction results to human reviewers who are within the same AWS Region as the loan applicant. The company must ensure that the application complies with strict Regional data residency and auditability requirements. The application must be able to scale to handle 25,000 applications each day and provide 99.9% availability. Which combination of solutions will meet these requirements? (Choose three.)",
    choices: [
      {
        letter: "A",
        text: "Deploy Amazon Textract and Amazon Augmented AI (Amazon A2I) within the same Region to extract relevant data from the scanned documents. Route low-confidence pages to human reviewers.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Use AWS Lambda functions to detect and redact PII from submitted documents before inference. Apply Amazon Bedrock guardrails to prevent inappropriate or unauthorized content in model outputs. Configure Region-specific IAM roles to enforce data residency requirements and to control access to the extracted data.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Use Amazon Kendra and Amazon OpenSearch Service to extract field level values semantically from the uploaded documents before inference.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Store uploaded documents in Amazon S3 and apply object metadata. Configure IAM policies to store original documents within the same Region as each applicant. Enable object tagging for future audits.",
        isCorrect: false
      },
      {
        letter: "E",
        text: "Use AWS Glue Data Quality to validate the structured document data. Use AWS Step Functions to orchestrate a review workflow that includes a prompt engineering step that transforms validated data into optimized prompts before invoking Amazon Bedrock to assess loan applications.",
        isCorrect: true
      },
      {
        letter: "F",
        text: "Use Amazon SageMaker Clarify to generate fairness and bias reports based on model scoring decisions that Amazon Bedrock makes.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): Amazon Textract extrae datos estructurados (campos, tablas, elementos de selección) de documentos escaneados mediante operaciones como AnalyzeDocument. Amazon Augmented AI (A2I) se integra de forma nativa con Textract mediante condiciones de activación (por ejemplo, ImportantFormKeyConfidenceCheck) que enrutan automáticamente a revisores humanos las páginas o campos cuya confianza de extracción esté por debajo de un umbral definido. La documentación de AWS indica explícitamente que, al usar A2I con Textract, los recursos de A2I deben crearse en la misma Región de AWS en la que se invoca AnalyzeDocument, lo cual satisface directamente el requisito de mantener a los revisores humanos dentro de la misma Región que el solicitante del préstamo.\n\nOpción B (Correcta): funciones AWS Lambda pueden invocar Amazon Comprehend (mediante StartPiiEntitiesDetectionJob o la integración con S3 Object Lambda) para detectar y redactar entidades de información de identificación personal (PII) en los documentos antes de que estos se envíen a inferencia. Los guardrails de Amazon Bedrock incorporan una política de información sensible (Sensitive Information Policy) que puede detectar y enmascarar o bloquear PII, además de filtrar contenido dañino o intentos de prompt injection en las entradas y salidas del modelo, lo que ayuda a prevenir contenido inapropiado o no autorizado en las respuestas generadas. Combinado con roles de IAM configurados con condiciones específicas por Región (por ejemplo, restringiendo acciones a una Región concreta) y con el resto de la arquitectura Regional, se contribuye a cumplir los requisitos de residencia de datos y de control de acceso a los datos extraídos.\n\nOpción C: Amazon Kendra (búsqueda empresarial semántica) y Amazon OpenSearch Service (indexación y búsqueda de texto completo/vectorial) están orientados a la búsqueda y recuperación de información sobre contenido ya indexado, no a la extracción estructurada campo a campo de formularios y documentos escaneados. Esa capacidad de extracción estructurada (texto, tablas, pares clave-valor) es la que proporciona específicamente Amazon Textract, por lo que Kendra y OpenSearch no cubren el flujo de extracción y revisión humana que exige el enunciado.\n\nOpción D: almacenar los documentos originales en Amazon S3 con metadatos de objeto, políticas de IAM para mantener los documentos en la misma Región que cada solicitante y etiquetado de objetos (object tagging) es una buena práctica complementaria para auditoría y residencia de datos de los documentos en reposo, pero por sí sola no realiza la extracción de datos estructurados, ni la redacción de PII, ni la generación de decisiones de aprobación mediante modelos fundacionales; no cubre los requisitos funcionales centrales del caso de uso.\n\nOpción E (Correcta): AWS Glue Data Quality permite definir y evaluar reglas de calidad sobre los datos estructurados ya extraídos (por ejemplo, completitud o formato de los campos del préstamo), mientras que AWS Step Functions orquesta el flujo de trabajo completo: valida los datos, ejecuta el paso de transformación a prompts optimizados y finalmente invoca Amazon Bedrock (mediante la integración nativa de Step Functions con la API de Bedrock) para generar la evaluación/aprobación de la solicitud de préstamo, aportando además trazabilidad y manejo de errores en cada paso, lo que favorece la auditabilidad exigida.\n\nOpción F: Amazon SageMaker Clarify está diseñado para generar informes de sesgo (bias) y explicabilidad sobre modelos de machine learning tradicionales entrenados con datos tabulares y atributos protegidos definidos, típicamente en el contexto de SageMaker; no es la herramienta pensada para auditar decisiones generativas de texto producidas por Amazon Bedrock en un flujo documental como este, por lo que introduce complejidad adicional sin cubrir ningún requisito explícito del enunciado.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/a2i-textract-task-type.html\nhttps://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html",
    category: "Agents & Orchestration",
    multiSelect: true,
    requiredCount: 3
  },
  {
    id: 37,
    questionNumber: 37,
    question: "A software company is using Amazon Q Business to build an AI assistant that allows employees to access company information and personal information by using natural language prompts. The company stores this information in an Amazon S3 bucket. Each department in the company has a dedicated prefix in the S3 bucket. Each object name includes the S3 prefix of the department that it belongs to. Each department can belong to only a single group in AWS IAM Identity Center. Each employee belongs to a single department. The company configures Amazon Q Business to access data stored in an S3 bucket as a data source. The company needs to ensure that the AI assistant respects access controls based on the user's IAM Identity Center group membership. Which solution will meet this requirement with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Create a JSON file named acl.json in each department folder. In each file, create access control entries that specify the IAM Identity Center group that should have access to that department's data. Indicate the location of the JSON file in the Access Control section of the data source settings.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Create a single JSON file named acl.json at the top level of the S3 bucket. Add access control entries that map each department's S3 prefix to its corresponding IAM Identity Center group. Indicate the location of the JSON file in the Access Control section of the data source settings.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "For each IAM Identity Center group, create a separate permissions set that denies access to all prefixes in the S3 bucket. Add a StringNotEquals condition key to the permissions set for each group that specifies the department each group is associated with. Attach the permissions sets to the Identity Center groups.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Create a metadata file named metadata.json at the top level of the S3 bucket. Add an AccessControlList object to the file that specifies the S3 path of each department's prefix. Specify the IAM Identity Center group that should have access to each department's prefix. Reference the file location in the data source metadata settings.",
        isCorrect: false
      }
    ],
    comments: "Opción A: crear un archivo acl.json distinto en cada carpeta de departamento no es el mecanismo soportado por el conector de S3 de Amazon Q Business. La documentación oficial especifica que el archivo de configuración de ACL es un único archivo JSON (referenciado mediante el parámetro aclConfigurationFilePath) que contiene un array con todas las entradas de control de acceso para todos los prefijos del bucket; multiplicar archivos por departamento añade complejidad de mantenimiento sin ningún beneficio funcional.\n\nOpción B (Correcta): el conector de S3 de Amazon Q Business admite un archivo de configuración de control de acceso (comúnmente llamado acl.json) que se indica mediante el parámetro aclConfigurationFilePath en la configuración del origen de datos (o en la sección \"Access control\" de la consola). Ese archivo contiene una estructura JSON tipo array, donde cada elemento define un \"keyPrefix\" (por ejemplo, \"s3://BUCKETNAME/prefix1/\") junto con una lista de \"aclEntries\", cada una con \"Name\" (el nombre del usuario o grupo), \"Type\" (USER o GROUP) y \"Access\" (ALLOW o DENY). Al usar Type=GROUP con el nombre del grupo de IAM Identity Center correspondiente a cada departamento, un único archivo colocado en el mismo bucket (por ejemplo en la raíz) puede mapear todos los prefijos de departamento a sus respectivos grupos, cubriendo el requisito con el mínimo esfuerzo operativo. Nota importante de la documentación: cualquier prefijo que NO aparezca en el archivo ACL queda accesible para TODOS los usuarios, algo a tener en cuenta al diseñar el archivo.\n\nOpción C: crear permission sets de IAM Identity Center con una condición StringNotEquals por prefijo, y asociarlos a los grupos, opera a nivel de gestión de acceso de AWS (IAM/SSO), no a nivel de filtrado de resultados dentro del índice de Amazon Q Business. Amazon Q Business necesita conocer la relación documento-grupo mediante su propio mecanismo de ACL (el archivo aclConfigurationFilePath) para poder filtrar las respuestas que devuelve el asistente según el usuario que pregunta; los permission sets de Identity Center no proporcionan esa información al conector ni son el método soportado.\n\nOpción D: no existe en Amazon Q Business un archivo \"metadata.json\" con un objeto \"AccessControlList\" configurado en la \"configuración de metadatos\" del origen de datos. Los archivos de metadatos de documentos en el conector de S3 se usan para mapear atributos/campos personalizados de cada documento (document attributes), no para definir control de acceso; el mecanismo real y documentado para ACL es el archivo JSON referenciado a través de aclConfigurationFilePath, con la estructura keyPrefix/aclEntries descrita en la opción B.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/s3-user-management.html\nhttps://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/s3-console.html\nhttps://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/s3-v2-api.html",
    category: "Security & Governance",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 38,
    questionNumber: 38,
    question: "A healthcare company is using Amazon Bedrock to build a system to help practitioners make clinical decisions. The system must provide treatment recommendations to physicians based only on approved medical documentation and must cite specific sources. The system must not hallucinate or produce factually incorrect information. Which solution will meet these requirements with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Integrate Amazon Bedrock with Amazon Kendra to retrieve approved documents. Implement custom post-processing to compare generated responses against source documents and to include citations.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Deploy an Amazon Bedrock knowledge base and connect it to approved clinical source documents. Use the Amazon Bedrock RetrieveAndGenerate API to return citations from the knowledge base.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Use Amazon Bedrock and Amazon Comprehend Medical to extract medical entities. Implement verification logic against a medical terminology database.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use an Amazon Bedrock knowledge base with Retrieve API calls and InvokeModel API calls to retrieve approved clinical source documents. Implement verification logic to compare against retrieved sources and to cite sources.",
        isCorrect: false
      }
    ],
    comments: "Opción A: integrar Amazon Bedrock con Amazon Kendra para recuperar los documentos aprobados y luego implementar post-procesamiento personalizado (comparación de la respuesta generada contra las fuentes y generación manual de citas) obliga a construir y mantener lógica adicional fuera de los servicios gestionados, lo que aumenta significativamente la sobrecarga operativa frente a una solución nativa.\n\nOpción B (Correcta): al crear una base de conocimiento (knowledge base) de Amazon Bedrock conectada a los documentos clínicos aprobados y usar la API RetrieveAndGenerate, la recuperación de los fragmentos relevantes, el aumento del prompt con ese contexto y la generación de la respuesta se ejecutan en una única llamada gestionada por el servicio. Según la documentación oficial de AWS, \"the responses are returned with citations to the original source data\", es decir, RetrieveAndGenerate devuelve automáticamente las citas hacia las fuentes originales sin necesidad de lógica adicional. Esto reduce el riesgo de alucinación (las respuestas se fundamentan en los documentos recuperados) y minimiza la sobrecarga operativa, ya que no es necesario orquestar por separado la recuperación, la construcción del prompt ni la extracción de citas.\n\nOpción C: Amazon Comprehend Medical permite extraer entidades médicas (medicamentos, condiciones, dosis, etc.) de texto no estructurado, pero no realiza recuperación aumentada de documentos ni genera citas de fuentes por sí mismo. Implementar verificación adicional contra una base de terminología médica requeriría desarrollo y mantenimiento propios, aumentando el esfuerzo operativo sin resolver el requisito de citación.\n\nOpción D: usar la API Retrieve (que solo devuelve los fragmentos relevantes de la base de conocimiento) junto con InvokeModel (para generar la respuesta) por separado obliga al equipo a implementar manualmente la lógica de verificación de las respuestas contra las fuentes recuperadas y la generación de las citas, funcionalidad que la API RetrieveAndGenerate ya proporciona de forma nativa en una sola llamada. Por tanto, esta opción implica más esfuerzo de desarrollo que la opción B para lograr el mismo resultado.\n\nReferencias:\n- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve-generate.html\n- https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_RetrieveAndGenerate.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 39,
    questionNumber: 39,
    question: "A financial services company is developing a real-time generative AI (GenAI) assistant to support human call center agents. The GenAI assistant must transcribe live customer speech, analyze context, and provide incremental suggestions to call center agents while a customer is still speaking. To preserve responsiveness, the GenAI assistant must maintain end-to-end latency under 1 second from speech to initial response display. The architecture must use only managed AWS services and must support bidirectional streaming to ensure that call center agents receive updates in real time. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Use the Amazon Transcribe streaming API to transcribe calls. Pass the text to Amazon Comprehend to perform sentiment analysis. Feed the results to Anthropic Claude on Amazon Bedrock by using the InvokeModel API. Store results in Amazon DynamoDB. Use a WebSocket API to display the results.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use Amazon Transcribe streaming with partial results enabled to deliver fragments of transcribed text before customers finish speaking. Forward text fragments to Amazon Bedrock by using the InvokeModelWithResponseStream API. Stream responses to call center agents through an Amazon API Gateway WebSocket API.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Use Amazon Transcribe batch processing to convert calls to text. Pass complete transcripts to Anthropic Claude on Amazon Bedrock by using the ConverseStream API. Return responses through an Amazon Lex chatbot interface that call center agents can access from their work computers.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use the Amazon Transcribe streaming API with an AWS Lambda function to transcribe each audio segment. Configure the Lambda function to call the Amazon Titan Embeddings model on Amazon Bedrock by using the InvokeModel API. Configure the Lambda function to publish results to an Amazon SNS topic. Subscribe the call center agents to the SNS topic.",
        isCorrect: false
      }
    ],
    comments: "Opción A: aunque usa la API de streaming de Amazon Transcribe, introduce un paso adicional con Amazon Comprehend para análisis de sentimiento que no se solicita en el requisito y añade latencia innecesaria a la cadena. Además, usa InvokeModel (respuesta única, no incremental) en lugar de una API de streaming de Bedrock, por lo que el modelo no puede emitir sugerencias parciales mientras el cliente sigue hablando. Combinar esto con persistencia en DynamoDB antes de mostrar resultados añade más retardo, dificultando cumplir el objetivo de menos de 1 segundo de latencia extremo a extremo.\n\nOpción B (Correcta): Amazon Transcribe, en su API de streaming, genera resultados parciales (partial results) de forma continua a medida que llega el audio, y el marcador \"IsPartial\" indica si un segmento aún puede cambiar. Activar la estabilización de resultados parciales (partial-result stabilization) permite fijar las últimas palabras estables de cada fragmento antes de que el hablante termine el segmento completo, reduciendo la latencia percibida a costa de una pequeña pérdida de precisión, lo cual es idóneo para casos de baja latencia como este. Reenviar esos fragmentos de texto a Amazon Bedrock mediante la operación InvokeModelWithResponseStream permite que el modelo (por ejemplo, Anthropic Claude) genere y transmita su respuesta de forma incremental, token a token, en lugar de esperar a la respuesta completa. Finalmente, una API WebSocket de Amazon API Gateway proporciona una conexión persistente y bidireccional totalmente gestionada, ideal para empujar (push) esas actualizaciones incrementales hacia la interfaz del agente del centro de llamadas en tiempo real. Esta combinación de servicios totalmente gestionados (Transcribe streaming + Bedrock streaming + WebSocket API) es la arquitectura recomendada por AWS para minimizar la latencia extremo a extremo en escenarios de asistencia conversacional en vivo.\n\nOpción C: el procesamiento por lotes (batch) de Amazon Transcribe requiere que la llamada completa finalice antes de generar la transcripción, lo que es incompatible con el requisito de sugerencias incrementales mientras el cliente aún está hablando y con la latencia menor a 1 segundo. Usar ConverseStream sobre transcripciones completas no soluciona el problema de fondo, ya que el cuello de botella está en la fase de transcripción por lotes. Además, un chatbot de Amazon Lex no es el canal adecuado para mostrar sugerencias en tiempo real a un agente humano durante una llamada activa.\n\nOpción D: invocar el modelo de embeddings de Amazon Titan (Titan Embeddings) no es apropiado, ya que este modelo genera representaciones vectoriales de texto para búsqueda semántica o RAG, no respuestas conversacionales o sugerencias en lenguaje natural para el agente. Además, Amazon SNS es un servicio de mensajería de publicación/suscripción diseñado para notificaciones asíncronas de baja frecuencia, no para streaming bidireccional de baja latencia hacia una interfaz de usuario en vivo.\n\nReferencias:\n- https://docs.aws.amazon.com/transcribe/latest/dg/streaming-partial-results.html\n- https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html\n- https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html",
    category: "Performance & Scaling",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 40,
    questionNumber: 40,
    question: "A media company is launching a platform that allows thousands of users every hour to upload images and text content. The platform uses Amazon Bedrock to process the uploaded content to generate creative compositions. The company needs a solution to ensure that the platform does not process or produce inappropriate content. The platform must not expose personally identifiable information (PII) in the compositions. The solution must integrate with the company's existing Amazon S3 storage workflow. Which solution will meet these requirements with the LEAST infrastructure management overhead?",
    choices: [
      {
        letter: "A",
        text: "Enable the Enhanced Monitoring tool. Use an Amazon CloudWatch alarm to filter traffic to the platform. Use Amazon Comprehend PII detection to pre-process the data. Create a CloudWatch alarm to monitor for Amazon Comprehend PII detection events. Create an AWS Step Functions workflow that includes an Amazon Rekognition image moderation step.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use an Amazon API Gateway HTTP API with request validation templates to screen content before storing the uploaded content in Amazon S3. Use Amazon SageMaker AI to build custom content moderation models that process content before sending the processed content to Amazon Bedrock.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Create an Amazon Cognito user pool that uses pre-authentication AWS Lambda functions to run content moderation checks. Use Amazon Textract to filter text content and Amazon Rekognition to filter image content before allowing users to upload content to the platform.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Create an AWS Step Functions workflow that uses built-in Amazon Bedrock guardrails to filter content. Use Amazon Comprehend PII detection to pre-process the content. Use Amazon Rekognition image moderation.",
        isCorrect: true
      }
    ],
    comments: "Opción A: combinar \"Enhanced Monitoring\" con una alarma de Amazon CloudWatch para \"filtrar tráfico\" no es un mecanismo real de moderación de contenido. CloudWatch genera alarmas basadas en métricas y puede notificar o disparar una acción, pero no inspecciona ni bloquea el contenido de imágenes o texto antes de que se procese; por tanto no cumple el requisito de impedir que se procese o produzca contenido inapropiado.\n\nOpción B: usar Amazon API Gateway con plantillas de validación de solicitudes solo valida la estructura/formato de la petición HTTP, no el contenido semántico de imágenes o texto, por lo que no detecta contenido inapropiado ni PII. Además, construir modelos de moderación personalizados con Amazon SageMaker AI exige entrenar, desplegar, escalar y mantener los propios modelos y la infraestructura de inferencia, lo que aumenta significativamente la carga operativa frente a usar servicios ya gestionados como Rekognition o Comprehend.\n\nOpción C: Amazon Cognito con funciones Lambda de pre-autenticación gestiona la autenticación e identidad de los usuarios, no el contenido que suben; ese hook se ejecuta en el flujo de login, no sobre cada imagen o texto cargado. Además, Amazon Textract (según la documentación de AWS, es un servicio de extracción de texto e datos de documentos, OCR/formularios/tablas) no es un servicio de moderación de contenido dañino, por lo que no cumple el requisito de filtrar texto inapropiado.\n\nOpción D (Correcta): según la documentación oficial de Amazon Bedrock, Amazon Bedrock Guardrails incluye filtros de contenido nativos que detectan y bloquean contenido dañino en texto e imágenes (content filters) y políticas de información sensible que detectan y enmascaran o bloquean PII (sensitive information / PII filters), pudiéndose invocar de forma independiente mediante la API ApplyGuardrail sin necesidad de invocar el modelo. Amazon Comprehend ofrece la operación DetectPiiEntities para detectar entidades de información personal identificable en texto. Amazon Rekognition ofrece DetectModerationLabels para detectar contenido inapropiado o no seguro en imágenes. Orquestar estos tres servicios gestionados con AWS Step Functions permite construir un flujo de moderación completo (texto e imagen, PII y contenido dañino) sin aprovisionar, entrenar ni administrar infraestructura propia, cumpliendo el requisito de mínima gestión de infraestructura y de integración con el flujo de trabajo existente en Amazon S3.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-content-filters.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html\nhttps://docs.aws.amazon.com/rekognition/latest/dg/procedure-moderate-images.html",
    category: "Guardrails & Safety",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 41,
    questionNumber: 41,
    question: "A company has set up Amazon Q Developer Pro licenses for all developers at the company. The company maintains a list of approved resources that developers must use when developing applications. The approved resources include internal libraries, proprietary algorithmic techniques, and sample code with approved styling. A new team of developers is using Amazon Q Developer to develop a new Java-based application. The company must ensure that the new developer team uses the company's approved resources. The company does not want to make project-level modifications. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Create a Git repository that contains all of the approved internal libraries, algorithms, and code samples. Include this Git repository in the application project locally as part of the workspace. Ensure that the developers use the @workspace context to retrieve suggestions from the Git repository.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "In the project root folder, create a folder named .amazonq/rules. Add the approved internal libraries, algorithms, and code samples to the folder.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Create a folder in the application project named rules. Store the guidelines and code in the folder for Amazon Q Developer to reference product code suggestions.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Create an Amazon Q Developer customization that includes the approved data sources. Ensure that the developers use the customization to develop the application.",
        isCorrect: true
      }
    ],
    comments: "Opción A: crear un repositorio Git con las bibliotecas, algoritmos y ejemplos aprobados e incluirlo localmente en el workspace del proyecto para usarlo mediante el contexto @workspace obliga a añadir y mantener manualmente ese repositorio en cada proyecto de cada desarrollador. Esto es exactamente el tipo de modificación a nivel de proyecto que la empresa quiere evitar, además de no ser un mecanismo soportado ni gestionado de forma centralizada por Amazon Q Developer.\n\nOpción B: la carpeta .amazonq/rules, ubicada en la raíz del proyecto (project-root/.amazonq/rules), almacena \"project rules\" en archivos Markdown que Amazon Q Developer usa automáticamente como contexto cuando un desarrollador chatea con Amazon Q dentro de ese proyecto concreto (por ejemplo, para exigir el uso de type hints en Python o comentarios Javadoc en Java). Es una funcionalidad de reglas de chat por proyecto, no un repositorio de código fuente para generar sugerencias in-line, y por definición requiere crear y mantener esta carpeta en cada proyecto, lo cual constituye una configuración a nivel de proyecto y no la solución centralizada que pide el enunciado.\n\nOpción C: crear una carpeta \"rules\" arbitraria dentro del propio proyecto no corresponde a ninguna funcionalidad reconocida de Amazon Q Developer (el nombre y la ubicación correctos, si se usara ese mecanismo, serían .amazonq/rules, no \"rules\"), y en cualquier caso también implicaría una modificación a nivel de proyecto que la empresa descarta explícitamente.\n\nOpción D (Correcta): la funcionalidad de \"customizations\" (personalizaciones) de Amazon Q Developer permite a los administradores conectar de forma centralizada, mediante Amazon S3 o AWS CodeConnections (antes AWS CodeStar Connections), los repositorios de código propios de la empresa (bibliotecas internas, algoritmos propietarios y ejemplos de código con el estilo aprobado). Amazon Q Developer utiliza después ese repositorio personalizado, con la seguridad correspondiente habilitada, para generar sugerencias de código in-line alineadas con los patrones y estándares de la organización. Esta configuración se gestiona una sola vez a nivel de cuenta/organización y se aplica a todos los desarrolladores y proyectos que usen la personalización, sin necesidad de tocar la configuración de cada proyecto individualmente, que es justo lo que requiere el escenario.\n\nReferencias:\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/best-practices-code-generation/advanced-capabilities.html\nhttps://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/context-project-rules.html",
    category: "Security & Governance",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 42,
    questionNumber: 42,
    question: "An ecommerce company is using Amazon Bedrock to build a customer service AI assistant. The AI assistant needs to process over 50,000 customer inquiries every day. The AI assistant occasionally experiences traffic spikes of up to 150,000 inquiries every day during promotional events. Analysis shows that 40% of inquiries follow similar patterns that share the same context. A GenAI developer must design a solution that will ensure low latency and consistent performance for the AI assistant during traffic spikes. Which solution will meet these requirements MOST cost-effectively?",
    choices: [
      {
        letter: "A",
        text: "Configure latency-optimized inference by setting the latency parameter to optimized in the performance configuration of the request to Amazon Bedrock. Use prompt caching to handle the repetitive inquiries.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Purchase provisioned throughput and model units (MUs) that are sized to handle peak traffic loads. Use Amazon ElastiCache (Redis OSS) to cache repetitive inquiries.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use Amazon Bedrock Agents and custom knowledge bases to pre-process customer inquiries. Configure cross-Region inference to distribute traffic.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use AWS Lambda functions to pre-process requests by using a custom prompt routing mechanism. Use Amazon DynamoDB as a caching layer to handle frequently asked questions.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): configurar el parámetro \"Latency\" en \"optimized\" dentro de performanceConfig al invocar la API de Amazon Bedrock activa la inferencia optimizada para latencia (Latency Optimized Inference), una función que ofrece tiempos de respuesta más rápidos sin necesidad de configuración adicional ni de reentrenar/afinar el modelo, y sin tener que aprovisionar capacidad fija: se paga solo por el uso, y si se agota la cuota de latencia optimizada la solicitud simplemente cae a inferencia estándar (facturada a tarifa estándar) en lugar de fallar. Combinado con prompt caching -que reduce la latencia de respuesta y el coste de los tokens de entrada al reutilizar automáticamente (caché implícita) o mediante puntos de control explícitos (caché explícita) los prefijos de prompt que se repiten entre solicitudes-, esta solución aprovecha directamente que el 40% de las consultas comparten el mismo contexto, reduciendo coste y latencia en esos casos y absorbiendo los picos de tráfico de forma elástica sin sobreaprovisionar capacidad.\n\nOpción B: comprar Provisioned Throughput y Model Units (MUs) dimensionados para el pico de 150,000 solicitudes diarias obliga a pagar de forma constante (por hora/mes) por una capacidad fija que solo se necesita durante los picos puntuales de eventos promocionales, quedando infrautilizada el resto del tiempo; añadir Amazon ElastiCache (Redis OSS) como capa de caché resuelve parcialmente la repetición de consultas, pero implica desplegar, operar y pagar por infraestructura adicional (nodos de caché) que prompt caching ya ofrece de forma nativa e integrada en Bedrock, por lo que en conjunto resulta menos rentable.\n\nOpción C: Amazon Bedrock Agents y las bases de conocimiento personalizadas están orientados a orquestar tareas y enriquecer respuestas con recuperación de información (RAG), no a reducir la latencia de solicitudes repetidas ni a optimizar el coste por reutilización de contexto. La inferencia entre regiones (cross-Region inference) distribuye la carga entre regiones para mejorar disponibilidad y rendimiento durante picos, pero no aprovecha el patrón de contexto compartido del 40% de las consultas ni reduce directamente el coste por token, por lo que no es la opción más rentable.\n\nOpción D: construir con AWS Lambda un enrutador de prompts personalizado y usar Amazon DynamoDB como capa de caché de preguntas frecuentes implica diseñar, desarrollar, probar y mantener lógica propia (invocaciones de Lambda, esquema de DynamoDB, lógica de invalidación de caché) que sustituye una capacidad ya integrada de forma nativa en Bedrock (prompt caching), añadiendo complejidad operativa y coste de desarrollo sin ofrecer ventajas de latencia frente a la solución nativa.\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/latency-optimized-inference.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html",
    category: "Performance & Scaling",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 43,
    questionNumber: 43,
    question: "A legal research company has a Retrieval Augmented Generation (RAG) application that uses Amazon Bedrock and Amazon OpenSearch Service. The application stores 768-dimensional vector embeddings for 15 million legal documents, including statutes, court rulings, and case summaries. The company's current chunking strategy segments text into fixed-length blocks of 500 tokens. The current chunking strategy often splits contextually linked information such as legal arguments, court opinions, or statute references across separate chunks. Researchers report that generated outputs frequently omit key context or cite outdated legal information. Recent application logs show a 40% increase in response times. The p95 latency metric exceeds 2 seconds. The company expects storage needs for the application to grow from 90 GB to 360 GB within a year. The company needs a solution to improve retrieval relevance and system performance at scale. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Increase the embedding vector dimensionality from 768 to 4,096 without changing the existing chunking or pre-processing strategy.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Replace dynamic retrieval with static, pre-written summaries that are stored in Amazon S3. Use Amazon CloudFront to serve the summaries to reduce compute demand and improve predictability.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Update the chunking strategy to use semantic boundaries such as complete legal arguments, clauses, or sections rather than fixed token limits. Regenerate vector embeddings to align with the new chunk structure.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Migrate from OpenSearch Service to Amazon DynamoDB. Implement keyword-based indexes to enable faster lookups for legal concepts.",
        isCorrect: false
      }
    ],
    comments: "Opción A: aumentar la dimensionalidad del embedding de 768 a 4.096 sin cambiar la estrategia de chunking no ataca la causa raíz del problema. El chunking de tamaño fijo (500 tokens) sigue fragmentando argumentos legales, cláusulas y referencias a estatutos en trozos separados, por lo que el modelo seguirá recuperando contexto incompleto independientemente de cuántas dimensiones tenga el vector. Además, vectores de mayor dimensionalidad incrementan significativamente el almacenamiento y el coste computacional de indexación/búsqueda en OpenSearch, agravando el problema de latencia (p95 > 2s) y el crecimiento previsto de almacenamiento (90 GB a 360 GB), en vez de mitigarlo.\n\nOpción B: sustituir la recuperación dinámica por resúmenes estáticos precalculados almacenados en Amazon S3 y servidos vía Amazon CloudFront elimina la esencia de un sistema RAG, que es recuperar y fundamentar las respuestas en los documentos originales y vigentes. Esto no soluciona la fragmentación semántica del contexto (el problema de fondo) y, al depender de resúmenes fijos, introduce el riesgo de que la información legal citada quede desactualizada según cambien los estatutos o las resoluciones judiciales, justo el síntoma que los investigadores ya reportan.\n\nOpción C (Correcta): actualizar la estrategia de chunking para usar límites semánticos (argumentos legales completos, cláusulas o secciones) en lugar de límites de tokens fijos, y regenerar los embeddings vectoriales alineados con la nueva estructura de chunks, es la solución respaldada por la documentación oficial de Amazon Bedrock Knowledge Bases. Bedrock ofrece explícitamente una estrategia de \"semantic chunking\" (chunking semántico) diseñada para dividir el texto en fragmentos significativos en función del contenido semántico en lugar de la estructura sintáctica, mejorando la precisión de recuperación (parámetros configurables como maxTokens, bufferSize y breakpointPercentileThreshold). Al preservar unidades de contexto coherentes —como un argumento legal completo o una cláusula—, se reduce la omisión de contexto clave y la citación de información desactualizada. La documentación también aclara que la estrategia de chunking no puede modificarse una vez conectada la fuente de datos, lo que implica que aplicar un nuevo chunking requiere reconfigurar la ingesta y regenerar los embeddings, exactamente lo que propone esta opción. Esto también ayuda a controlar el crecimiento de almacenamiento y la latencia, ya que chunks semánticamente coherentes y bien delimitados suelen reducir la necesidad de recuperar múltiples fragmentos redundantes o fragmentados para reconstruir el contexto.\n\nOpción D: migrar de Amazon OpenSearch Service a Amazon DynamoDB con índices basados en palabras clave abandona la búsqueda vectorial por similitud semántica, que es la base de la precisión de recuperación en una arquitectura RAG. DynamoDB no está diseñado para búsquedas de similitud vectorial a gran escala como OpenSearch (que sí soporta motores de vectores como k-NN/OpenSearch Vector Engine), y una búsqueda basada en palabras clave no resuelve el problema de que la información relevante esté fragmentada entre varios chunks; de hecho, degradaría aún más la relevancia semántica de los resultados en un dominio tan dependiente de matices lingüísticos como el legal.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-customize-ingestion.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 44,
    questionNumber: 44,
    question: "A company is developing a generative AI (GenAI)-powered customer support application that uses Amazon Bedrock foundation models (FMs). The application must maintain conversational context across multiple interactions with the same user. The application must run clarification workflows to handle ambiguous user queries. The company must store encrypted records of each user conversation to use for personalization. The application must be able to handle thousands of concurrent users while responding to each user quickly. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Use an AWS Step Functions Express workflow to orchestrate conversation flow. Invoke AWS Lambda functions to run clarification logic. Store conversation history in Amazon RDS and use session IDs as the primary key.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use an AWS Step Functions Standard workflow to orchestrate clarification workflows. Include Wait for a Callback patterns to manage the workflows. Store conversation history in Amazon DynamoDB. Purchase on-demand capacity and configure server-side encryption.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Deploy the application by using an Amazon API Gateway REST API to route user requests to an AWS Lambda function to update and retrieve conversation context. Store conversation history in Amazon S3 and configure server-side encryption. Save each interaction as a separate JSON file.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use AWS Lambda functions to call Amazon Bedrock inference APIs. Use Amazon SQS queues to orchestrate clarification steps. Store conversation history in an Amazon ElastiCache (Redis OSS) cluster. Configure encryption at rest.",
        isCorrect: false
      }
    ],
    comments: "Opción A: un flujo de trabajo Express de AWS Step Functions está diseñado para ejecuciones de alto volumen y corta duración (hasta 5 minutos) con semántica \"at-least-once\", sin historial de ejecución completo ni capacidad de pausarse de forma duradera; por tanto no admite el patrón \"Wait for a Callback with Task Token\" necesario para suspender la conversación mientras se espera una aclaración del usuario. Además, usar Amazon RDS como almacén de historial de conversación obliga a gestionar el escalado, las conexiones y el particionado de una base de datos relacional para miles de usuarios concurrentes, lo que añade complejidad operativa innecesaria frente a una base de datos NoSQL gestionada.\n\nOpción B (Correcta): un flujo de trabajo Standard de Step Functions ofrece ejecuciones duraderas, de larga duración y con semántica \"exactly-once\", e incluye de forma nativa el patrón de integración \"Wait for a Callback with Task Token\" (`.waitForTaskToken`), que pausa la máquina de estados hasta que un proceso externo (por ejemplo, la respuesta de aclaración del usuario) devuelve el token de tarea con éxito o error; esto encaja exactamente con el requisito de ejecutar flujos de aclaración ante consultas ambiguas. Amazon DynamoDB con capacidad bajo demanda (on-demand) escala automáticamente el rendimiento de lectura/escritura según la carga real sin necesidad de aprovisionar capacidad, lo que permite atender miles de usuarios concurrentes con baja latencia, y el cifrado en el servidor (SSE) protege en reposo el historial de conversación almacenado para fines de personalización, cumpliendo el requisito de mantener registros cifrados.\n\nOpción C: usar Amazon API Gateway y AWS Lambda para actualizar y recuperar el contexto es viable como capa de acceso, pero no proporciona ningún mecanismo de orquestación con estado para ejecutar flujos de aclaración (no hay forma nativa de pausar y reanudar una interacción esperando una respuesta del usuario). Además, guardar cada interacción como un archivo JSON independiente en Amazon S3 dificulta actualizar y consultar de forma eficiente y en tiempo real el contexto conversacional acumulado, ya que S3 no está optimizado para lecturas/escrituras de baja latencia sobre registros individuales que cambian con frecuencia.\n\nOpción D: Amazon SQS es un servicio de colas de mensajes y no ofrece de forma nativa un mecanismo de orquestación de flujo de trabajo con estados, pausas condicionadas ni el patrón de callback que Step Functions proporciona para gestionar aclaraciones; construir esa lógica sobre SQS exigiría desarrollo adicional considerable. Además, Amazon ElastiCache (Redis OSS) es una caché en memoria pensada para acceso de baja latencia a datos volátiles, no un almacén de datos duradero y persistente adecuado como fuente principal del historial de conversación con fines de personalización a largo plazo, aunque soporte cifrado en reposo.\n\nReferencias:\nhttps://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html\nhttps://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/step-functions-workflows.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/on-demand-capacity-mode.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 45,
    questionNumber: 45,
    question: "A financial services company needs to pre-process unstructured data such as customer transcripts, financial reports, and documentation. The company stores the unstructured data in Amazon S3 to support an Amazon Bedrock application. The company must validate data quality, create auditable metadata, monitor data metrics, and customize text chunking to optimize foundation model (FM) performance. Which solution will meet these requirements with the LEAST development effort?",
    choices: [
      {
        letter: "A",
        text: "Use Amazon SageMaker Data Wrangler to create a data flow. Configure Amazon CloudWatch metrics and alarms to monitor data quality. Use a custom AWS Lambda function to pre-process the data. Load processed data into Amazon Bedrock.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Set up an AWS Glue crawler to catalog data sources. Create AWS Glue ETL jobs to run custom transformation scripts. Use AWS Glue Data Quality to validate and monitor data quality. Load processed data into Amazon Bedrock.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Use Amazon Comprehend to extract entities. Create an AWS Lambda function to chunk text. Run Amazon Athena to query and validate data quality. Load processed data into Amazon Bedrock.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Create an AWS Step Functions workflow to orchestrate data pre-processing tasks. Run custom code on Amazon EC2 instances to process the data. Use Amazon SageMaker Model Monitor to monitor data quality. Load processed data into Amazon Bedrock.",
        isCorrect: false
      }
    ],
    comments: "Opción A: Amazon SageMaker Data Wrangler está pensado para la preparación y transformación de datos tabulares dentro de flujos de trabajo de machine learning (feature engineering), no para el procesamiento de texto no estructurado con reglas de calidad declarativas. Además, la solución exigiría desarrollar una función Lambda personalizada adicional solo para el pre-procesamiento/chunking, y configurar manualmente alarmas de CloudWatch para simular el monitoreo de calidad, lo que aumenta el esfuerzo de desarrollo frente a un servicio con validación de calidad nativa.\n\nOpción B (Correcta): un rastreador (crawler) de AWS Glue cataloga automáticamente los datos de origen en el AWS Glue Data Catalog, generando metadatos auditables (esquema, particiones, linaje) sin esfuerzo manual. Los trabajos de AWS Glue ETL permiten ejecutar scripts de transformación personalizados, incluida la lógica de chunking de texto necesaria para optimizar el rendimiento del modelo fundacional. AWS Glue Data Quality, integrado de forma nativa en el mismo servicio, usa el lenguaje declarativo DQDL (Data Quality Definition Language, basado en el framework open-source Deequ) para definir y evaluar más de 25 reglas de calidad listas para usar, generar una puntuación de calidad de datos, detectar anomalías mediante ML y aislar los registros problemáticos. Todo esto se integra en una sola canalización gestionada y sin servidores, minimizando el esfuerzo de desarrollo antes de cargar los datos procesados en Amazon Bedrock.\n\nOpción C: Amazon Comprehend permite extraer entidades de texto no estructurado, pero no ofrece un mecanismo declarativo de reglas de calidad de datos ni genera metadatos auditables por sí mismo. Habría que construir manualmente la lógica de chunking (vía Lambda) y de validación de calidad (vía consultas Athena), lo que implica un desarrollo considerablemente mayor que usar Glue Data Quality de forma nativa.\n\nOpción D: orquestar el pre-procesamiento con AWS Step Functions ejecutando código personalizado en instancias EC2 obliga a aprovisionar, parchear y gestionar servidores, elevando notablemente el esfuerzo operativo. Además, Amazon SageMaker Model Monitor está diseñado para supervisar la deriva de datos y el rendimiento de modelos de ML ya desplegados en producción, no para validar la calidad de datos de origen no estructurados antes de su ingesta en Amazon Bedrock.\n\nReferencias:\nhttps://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html\nhttps://docs.aws.amazon.com/glue/latest/dg/dqdl.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-customize-ingestion.html",
    category: "Security & Governance",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 46,
    questionNumber: 46,
    question: "A company uses Amazon Bedrock to build a Retrieval Augmented Generation (RAG) system. The RAG system uses an Amazon Bedrock knowledge base that is based on an Amazon S3 bucket as the data source for emergency news video content. The system retrieves transcripts, archived reports, and related documents from the S3 bucket. The RAG system uses state-of-the-art embedding models and a high-performing retrieval setup. However, users report slow responses and irrelevant results, which cause decreased user satisfaction. The company notices that vector searches are evaluating too many documents across too many content types and over long periods of time. The company determines that the underlying models will not benefit from additional fine tuning. The company must improve retrieval accuracy by applying smarter constraints. The company wants a solution that requires minimal changes to the existing architecture. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Enhance embeddings by using a domain-adapted model that is specifically trained on emergency news content for improved vector similarity.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Migrate to Amazon OpenSearch Service. Use vector fields and metadata filters to define the scope of results retrieval.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Enable metadata-aware filtering within the Amazon Bedrock knowledge base by indexing S3 object metadata.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Migrate to an Amazon Q Business index to perform structured metadata filtering and document categorization during retrieval.",
        isCorrect: false
      }
    ],
    comments: "Opción A: entrenar o adaptar un modelo de embeddings específico para el dominio de noticias de emergencia es, en esencia, un proceso de ajuste (fine-tuning) del modelo que el enunciado descarta explícitamente al indicar que los modelos subyacentes no se beneficiarán de ajustes adicionales. Además, esto obligaría a regenerar los embeddings y reindexar todo el contenido existente, lo que supone un esfuerzo considerable y no resuelve directamente el problema de que la búsqueda vectorial evalúa demasiados documentos de tipos y periodos irrelevantes.\n\nOpción B: migrar de la base de conocimiento de Amazon Bedrock a Amazon OpenSearch Service para usar campos vectoriales y filtros de metadatos de forma nativa implicaría sustituir el almacén vectorial subyacente, reconfigurar la ingesta de datos y adaptar la integración con Bedrock, lo que representa un cambio arquitectónico mayor y contradice el requisito explícito de minimizar los cambios sobre la arquitectura existente.\n\nOpción C (Correcta): las bases de conocimiento (Knowledge Bases) de Amazon Bedrock con un origen de datos en Amazon S3 permiten adjuntar metadatos personalizados a cada documento mediante archivos complementarios \".metadata.json\" (por ejemplo, \"informe.pdf.metadata.json\") que definen atributos como tipo de contenido, fecha de creación, autor u otras propiedades del objeto S3. Una vez indexados estos atributos, se pueden aplicar filtros de metadatos (mediante el parámetro \"retrievalConfiguration\" en las operaciones Retrieve/RetrieveAndGenerate, o de forma manual/implícita en la consola) para acotar el alcance de la búsqueda vectorial a un subconjunto relevante de documentos (por tipo de contenido, rango de fechas, etc.) antes de calcular la similitud semántica. Esto reduce el número de documentos irrelevantes evaluados, mejora la precisión y la latencia de la recuperación, y no requiere migrar el almacén vectorial ni reentrenar los modelos de embeddings, cumpliendo así el requisito de cambios mínimos sobre la arquitectura actual.\n\nOpción D: migrar a un índice de Amazon Q Business implicaría reemplazar por completo la base de conocimiento de Bedrock por otro servicio con su propio modelo de datos, conectores y flujo de generación de respuestas, lo que supone cambios arquitectónicos sustanciales muy superiores a los que el enunciado busca evitar.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-managed-ds-s3.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-managed-test-config.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-neptune.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 47,
    questionNumber: 47,
    question: "A financial services company is creating a Retrieval Augmented Generation (RAG) application that uses Amazon Bedrock to generate summaries of market activities. The application relies on a vector database that stores a small proprietary dataset that has a low index count. The application must perform similarity searches. The Amazon Bedrock model's responses must maximize accuracy and maintain high performance. The company needs to configure the vector database and integrate it with the application. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Launch an Amazon MemoryDB cluster and configure the index by using the Flat algorithm. Configure a horizontal scaling policy based on performance metrics.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Launch an Amazon MemoryDB cluster and configure the index by using the Hierarchical Navigable Small World (HNSW) algorithm. Configure a vertical policy based on performance metrics.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Launch an Amazon Aurora PostgresSQL cluster and configure the index by using the Inverted File with Flat Compression (IVFFlat) algorithm. Configure the instance class to scale to a larger size when the load increases.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Launch an Amazon DocumentDB cluster that has an Inverted File with Flat Compression (IVFFlat) index and a high probe value. Configure connections to the cluster as a replica set Distribute reads to replica instances.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): según la documentación oficial de Amazon MemoryDB sobre búsqueda vectorial, el algoritmo Flat realiza un procesamiento de fuerza bruta (lineal) sobre cada vector del índice, devolviendo resultados exactos dentro de los límites de precisión del cálculo de distancia (k-NN exacto, sin aproximación). AWS indica explícitamente que, debido a este procesamiento lineal, los tiempos de ejecución pueden ser muy altos en índices grandes, pero para un dataset propietario pequeño con un recuento de índice bajo —como el del enunciado— Flat es la opción recomendada porque maximiza la precisión sin el coste de rendimiento que tendría en un índice de gran tamaño. Al ser MemoryDB una base de datos en memoria, además se obtiene una latencia muy baja. MemoryDB admite resharding en línea (online horizontal scaling), que permite añadir o quitar shards sin downtime, por lo que configurar una política de escalado horizontal basada en métricas de rendimiento es una forma válida y recomendada de ajustar la capacidad del clúster según la carga.\n\nOpción B: HNSW (Hierarchical Navigable Small World) es, según la misma documentación de AWS, una alternativa que ofrece una aproximación de la respuesta correcta (ANN, approximate nearest neighbor) a cambio de tiempos de ejecución sustancialmente menores; está pensado para escalar bien en índices grandes, pero sacrifica algo de precisión (recall) frente al resultado exacto. Para un dataset pequeño con bajo recuento de índices, donde el enunciado exige maximizar la precisión, HNSW no es la mejor opción porque introduce aproximación innecesaria. Además, una política de escalado vertical (cambiar el tamaño de la instancia) es menos flexible y más disruptiva que el escalado horizontal para ajustar capacidad dinámicamente.\n\nOpción C: Amazon Aurora PostgreSQL con la extensión pgvector y el índice IVFFlat (Inverted File with Flat Compression) es también un método de búsqueda aproximada: divide el espacio vectorial en particiones (\"listas\") y solo compara contra un subconjunto de ellas, lo que introduce pérdida de precisión respecto a una búsqueda exacta, y requiere ajustar el número de listas y sondas para balancear precisión y rendimiento. Aurora es una base de datos relacional en disco, por lo que no ofrece el mismo perfil de latencia en memoria que MemoryDB, y escalar la clase de instancia (escalado vertical) es menos ágil que el escalado horizontal para atender picos de carga.\n\nOpción D: Amazon DocumentDB con un índice IVFFlat y un valor de \"probe\" alto es igualmente una técnica de aproximación (ANN), no una búsqueda exacta; aumentar el valor de probe mejora el recall pero incrementa el coste computacional sin llegar a igualar la exactitud de un algoritmo de fuerza bruta como Flat. Distribuir las lecturas entre instancias de réplica mejora el rendimiento de lectura, pero no resuelve el requisito principal del enunciado de maximizar la precisión en un dataset pequeño, por lo que esta opción no es la más adecuada.\n\nReferencias:\nhttps://docs.aws.amazon.com/memorydb/latest/devguide/vector-search-overview.html\nhttps://docs.aws.amazon.com/memorydb/latest/devguide/scaling-cluster.html\nhttps://docs.aws.amazon.com/documentdb/latest/devguide/vector-search.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 48,
    questionNumber: 48,
    question: "A GenAI developer is building a Retrieval Augmented Generation (RAG)-based customer support application that uses Amazon Bedrock foundation models (FMs). The application needs to process 50 GB of historical customer conversations that are stored in an Amazon S3 bucket as JSON files. The application must use the processed data as its retrieval corpus. The application's data processing workflow must extract relevant data from customer support documents, remove customer personally identifiable information (PII), and generate embeddings for vector storage. The processing workflow must be cost-effective and must finish within 4 hours. Which solution will meet these requirements with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Use AWS Lambda and Amazon Comprehend to process files in parallel, remove PII, and call Amazon Bedrock APIs to generate vectors. Configure Lambda concurrency limits and memory settings to optimize throughput.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Create an AWS Glue ETL job to run PII detection scripts on the data. Use Amazon SageMaker Processing to run the HuggingFaceProcessor to generate embeddings by using a pre-trained model. Store the embeddings in Amazon OpenSearch Service.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Deploy an Amazon EMR cluster that runs Apache Spark with user-defined functions (UDFs) that call Amazon Comprehend to detect PII. Use Amazon Bedrock APIs to generate vectors. Store outputs in Amazon Aurora PostgreSQL with the pgvector extension.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Implement a data processing pipeline that uses AWS Step Functions to orchestrate a workload that uses Amazon Comprehend to detect PII and Amazon Bedrock to generate embeddings. Directly integrate the workflow with Amazon OpenSearch Serverless to store vectors and provide similarity search capabilities.",
        isCorrect: true
      }
    ],
    comments: "Opción A: usar AWS Lambda junto con Amazon Comprehend para procesar los archivos en paralelo es técnicamente posible, pero Lambda tiene un límite de tiempo de ejecución de 15 minutos por invocación y límites de memoria/almacenamiento efímero, por lo que procesar 50 GB de JSON en 4 horas obligaría a diseñar manualmente el troceado de archivos, la gestión de la concurrencia, los reintentos ante fallos parciales y el ensamblaje de resultados. Esa orquestación manual aumenta la sobrecarga operativa frente a una solución que orqueste el flujo de forma nativa.\n\nOpción B: esta alternativa obliga a coordinar dos cargas de procesamiento por lotes distintas: un job de AWS Glue ETL para la detección de PII y, por separado, un job de Amazon SageMaker Processing (HuggingFaceProcessor) para generar los embeddings con un modelo preentrenado. Cada uno tiene su propio aprovisionamiento de recursos de cómputo, tiempos de arranque y monitorización independientes, lo que supone más componentes que gestionar y sincronizar que una orquestación serverless única, incrementando la sobrecarga operativa.\n\nOpción C: desplegar un clúster de Amazon EMR con Apache Spark exige aprovisionar, dimensionar, parchear y monitorizar la infraestructura del clúster, además de mantener las funciones definidas por el usuario (UDFs) que invocan Amazon Comprehend. Esta gestión de infraestructura persistente va directamente en contra del requisito de mínima sobrecarga operativa, incluso si el trabajo pudiera completarse dentro de las 4 horas.\n\nOpción D (Correcta): AWS Step Functions permite orquestar todo el flujo sin servidores que administrar. Step Functions ofrece integraciones optimizadas con Amazon Bedrock (por ejemplo, la API InvokeModel mediante el recurso arn:aws:states:::bedrock:invokeModel) para generar los embeddings de los documentos, e integraciones con el AWS SDK que permiten invocar directamente miles de acciones de API de más de 200 servicios de AWS —incluyendo Amazon Comprehend (por ejemplo, DetectPiiEntities)— para eliminar la información de identificación personal. Adicionalmente, mediante la tarea HTTP de Step Functions (recurso arn:aws:states:::http:invoke) el flujo puede llamar directamente al endpoint de la colección de Amazon OpenSearch Serverless para indexar los vectores y habilitar la búsqueda por similitud, sin necesidad de aprovisionar ni gestionar clústeres o servidores adicionales. Esta combinación cumple el objetivo de coste y el plazo de 4 horas con la menor sobrecarga operativa de las cuatro opciones planteadas.\n\nReferencias:\nhttps://docs.aws.amazon.com/step-functions/latest/dg/connect-bedrock.html\nhttps://docs.aws.amazon.com/step-functions/latest/dg/integrate-services.html\nhttps://docs.aws.amazon.com/step-functions/latest/dg/call-https-apis.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 49,
    questionNumber: 49,
    question: "A financial services company is developing a generative AI (GenAI) application that serves both premium customers and standard customers. The application uses AWS Lambda functions behind an Amazon API Gateway REST API to process requests. The company needs to dynamically switch between AI models based on which customer tier each user belongs to. The company also wants to perform A/B testing for new features without redeploying code. The company needs to validate model parameters like temperature and maximum token limits before applying changes. Which solution will meet these requirements with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Create an AWS Systems Manager Parameter Store parameters for each configuration. Use Lambda functions to poll for parameter updates. Use Amazon EventBridge events to trigger redeployments when configurations change.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Store model configurations in Amazon DynamoDB tables. Optimize access patterns to retrieve configurations according to customer tier. Configure Lambda functions to query DynamoDB at the beginning of each request to determine which model to use.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use AWS AppConfig to manage model configurations. Use feature flags to perform A/B testing. Define JSON schema validation rules for model parameters. Configure Lambda functions to retrieve configurations by using the AWS AppConfig Agent.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Create an Amazon ElastiCache (Redis OSS) cluster to store model configurations. Set short TTL values. Run custom validation logic in Lambda functions. Use Amazon CloudWatch metrics to monitor configuration usage.",
        isCorrect: false
      }
    ],
    comments: "Opción A: AWS Systems Manager Parameter Store permite almacenar valores de configuración, pero no ofrece de forma nativa capacidades de feature flags para pruebas A/B ni validación de esquema de los parámetros del modelo (como temperature o límites de tokens). Además, la propuesta de que los Lambdas sondeen (polling) los cambios y que Amazon EventBridge dispare redeployments contradice directamente el requisito de la empresa de cambiar configuraciones sin necesidad de redesplegar código, y añade complejidad operativa innecesaria (polling, orquestación de eventos, pipelines de despliegue).\n\nOpción B: almacenar configuraciones de modelo en Amazon DynamoDB y optimizar los patrones de acceso por nivel de cliente es una solución viable para el enrutamiento dinámico, pero DynamoDB no ofrece de forma nativa feature flags para pruebas A/B ni validación de esquema de parámetros antes de aplicar los cambios. Toda esa lógica (validación, gestión de variantes de prueba, invalidación de caché) tendría que construirse y mantenerse manualmente, lo que incrementa la sobrecarga operativa frente a un servicio administrado diseñado para ese propósito.\n\nOpción C (Correcta): AWS AppConfig es un servicio administrado creado específicamente para gestionar configuraciones de aplicación de forma dinámica y segura. Ofrece feature flags nativos que permiten realizar pruebas A/B y activar/desactivar funcionalidades sin redesplegar código, y soporta validadores de tipo JSON Schema (y también validadores personalizados basados en funciones Lambda) que verifican la validez sintáctica y semántica de los parámetros del modelo (como temperature y los límites máximos de tokens) antes de que la configuración se despliegue, evitando así cambios incorrectos en producción. Además, el AWS AppConfig Agent (como extensión de Lambda) permite que las funciones Lambda recuperen la configuración desde una caché local en memoria a través de un endpoint HTTP local (localhost:2772), reduciendo las llamadas al servicio de AppConfig y la latencia, sin necesidad de redeploy cuando cambia la configuración. Esta combinación de capacidades nativas (feature flags, validación de esquema, distribución segura y gradual de configuración, y acceso en caché local desde Lambda) cubre todos los requisitos del enunciado —enrutamiento dinámico por nivel de cliente, pruebas A/B sin redeploy, y validación de parámetros del modelo— con la menor sobrecarga operativa posible, ya que evita construir manualmente lógica de validación, feature flags o mecanismos de despliegue.\n\nOpción D: Amazon ElastiCache (Redis OSS) con TTLs cortos permite almacenar configuraciones con una expiración automática, pero requiere implementar manualmente toda la lógica de validación de parámetros (no hay validadores nativos de esquema) y no proporciona capacidades nativas de feature flags o pruebas A/B. También introduce la sobrecarga operativa adicional de aprovisionar, dimensionar y mantener un clúster de caché, lo que va en contra del objetivo de minimizar la carga operativa.\n\nReferencias:\n- https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-validators.html\n- https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-type-reference-feature-flags.html\n- https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-integration-lambda-extensions.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 50,
    questionNumber: 50,
    question: "A company is using Amazon Bedrock and Anthropic Claude 3 Haiku to develop an AI assistant. The AI assistant normally processes 10,000 requests each hour but experiences surges of up 30,000 requests each hour during peak usage periods. The AI assistant must respond within 2 seconds while operating across multiple AWS Regions. The company observes that during peak usage periods, the AI assistant experiences throughput bottlenecks that cause increased latency and occasional request timeouts. The company must resolve the performance issues. Which solution will meet this requirement?",
    choices: [
      {
        letter: "A",
        text: "Purchase provisioned throughput and sufficient model units (MUs) in a single Region. Configure the application to retry failed requests with exponential backoff.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Implement token batching to reduce API overhead. Use cross-Region inference profiles to automatically distribute traffic across available Regions.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Set up auto scaling AWS Lambda functions in each Region. Implement client-side round-robin request distribution. Purchase one model unit (MU) of provisioned throughput as a backup.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Implement batch inference for all requests by using Amazon S3 buckets across multiple Regions. Use Amazon SQS to set up an asynchronous retrieval process.",
        isCorrect: false
      }
    ],
    comments: "Opción A: comprar Provisioned Throughput con suficientes model units (MUs) en una única región garantiza capacidad reservada y predecible, pero según la documentación de Amazon Bedrock los inference profiles (y por tanto el enrutamiento entre regiones) no son compatibles con Provisioned Throughput, y al concentrar toda la capacidad en una sola región no se resuelve el requisito de operar across multiple AWS Regions ni se gana la flexibilidad para absorber picos de 3x el tráfico normal (de 10,000 a 30,000 solicitudes/hora). Reintentar con exponential backoff solo retrasa las solicitudes fallidas, no aumenta la capacidad disponible ni evita los timeouts durante el pico.\n\nOpción B (Correcta): los cross-Region inference profiles de Amazon Bedrock son una funcionalidad gestionada que enruta automáticamente las solicitudes de inferencia hacia otras regiones de AWS Commercial dentro del profile (geográfico o global) cuando la región de origen se satura, sin necesidad de aprovisionar capacidad fija por región ni gestionar el enrutamiento manualmente; el tráfico entre regiones viaja siempre por la red interna de AWS (cifrado, sin salir a internet público) y no añade coste adicional de enrutamiento. La documentación de AWS indica explícitamente que el uso de cross-Region inference es la opción recomendada cuando la disponibilidad y el throughput priman sobre el coste (\"Mission-critical uptime → Cross-Region Inference\"), precisamente el escenario descrito (picos que provocan cuellos de botella, aumento de latencia y timeouts). Complementar esto con batching de solicitudes/tokens para reducir el número de llamadas y la sobrecarga de la API ayuda a mantener el requisito de respuesta en menos de 2 segundos incluso durante los picos de 30,000 solicitudes/hora.\n\nOpción C: montar funciones Lambda con auto scaling propio en cada región y una distribución round-robin del lado del cliente reconstruye manualmente una capacidad de enrutamiento multi-región que Amazon Bedrock ya ofrece de forma nativa y gestionada mediante los inference profiles, añadiendo complejidad operativa innecesaria. Además, una sola model unit (MU) de Provisioned Throughput como respaldo es claramente insuficiente para absorber un pico de hasta 30,000 solicitudes por hora, por lo que el cuello de botella persistiría.\n\nOpción D: la inferencia por lotes (batch inference) en Amazon Bedrock está diseñada para procesamiento asíncrono y no interactivo (trabajos de hasta 10,000 registros con una ventana de procesamiento de hasta 24 horas), pensada para casos como generación de datos de entrenamiento o moderación de contenido en background, no para solicitudes en tiempo real. Usar S3 y SQS para orquestar este flujo asíncrono no puede cumplir un requisito de respuesta interactiva en menos de 2 segundos por solicitud.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/capacity-limits-cost-optimization.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html",
    category: "Performance & Scaling",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 51,
    questionNumber: 51,
    question: "A company uses Amazon Bedrock to develop an AI assistant to provide customer support. Analysis shows that 40% of customer queries use varied phrasing or wording to ask the same questions. The company wants a solution to reduce redundant model calls. The solution must ensure that semantically equivalent questions receive consistent answers. The solution must ensure low latency. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Deploy an Amazon DynamoDB Accelerator (DAX) cluster as an in-memory cache. Specify the query text as the partition key and the model response text as the sort key. Query the cache by using a filter expression with the LIKE operator.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use Amazon Bedrock to generate embeddings from customer queries. Use Amazon MemoryDB for Valkey to store hash sets of vector embeddings and model responses. Use a RANGE query to find similar queries and their responses.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Deploy Amazon OpenSearch Service that has k-nearest neighbor (k-NN) capabilities to store query-response text pairs. Use an approximate k-NN technique to find similar queries and their responses.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Create a caching solution by using Amazon DynamoDB to create a global secondary index on the normalized query text. Apply stemming to incoming queries. Query the index of cached customer queries.",
        isCorrect: false
      }
    ],
    comments: "Opción A: Amazon DynamoDB Accelerator (DAX) es una caché en memoria que acelera las lecturas de DynamoDB mediante coincidencias exactas de clave (partición/orden) o consultas con operadores de comparación/filtrado sobre el texto almacenado. Usar el texto de la consulta como clave de partición y aplicar un filtro con el operador LIKE solo permite detectar coincidencias parciales de texto literal, pero no identifica preguntas semánticamente equivalentes formuladas con palabras distintas; por tanto no cumple el requisito de reconocer consultas semánticamente similares.\n\nOpción B: Amazon MemoryDB for Valkey sí admite el almacenamiento de embeddings vectoriales (por ejemplo mediante hashes), pero una consulta de tipo RANGE está diseñada para recuperar elementos ordenados dentro de un rango de valores (como puntuaciones o marcas de tiempo), no para realizar búsquedas de similitud vectorial (k-NN) entre embeddings. Para hacer búsqueda semántica por proximidad de vectores en Valkey/Redis se necesitarían comandos de búsqueda vectorial dedicados, no un RANGE, por lo que esta opción no resuelve el caso de uso tal como está descrita.\n\nOpción C (Correcta): Amazon OpenSearch Service ofrece capacidades nativas de k-nearest neighbor (k-NN) para indexar y buscar vectores de alta dimensionalidad. La solución consiste en generar embeddings de las preguntas de los clientes (por ejemplo con un modelo de Amazon Bedrock), almacenar los pares pregunta-respuesta junto con sus embeddings en un índice de OpenSearch, y usar una técnica k-NN aproximada (algoritmos como HNSW o IVF) para encontrar, con baja latencia, las consultas previas semánticamente más parecidas a una nueva pregunta, devolviendo la respuesta ya cacheada en lugar de invocar de nuevo al modelo. Esto es exactamente el patrón de \"caché semántica\" que AWS documenta como buena práctica para reducir invocaciones redundantes a modelos: generar un embedding de cada solicitud entrante y consultar un índice de OpenSearch (incluida la variante Serverless) en busca de solicitudes previas similares por encima de un umbral de similitud configurable (por ejemplo, similitud coseno > 0.95), sirviendo la respuesta cacheada cuando se supera ese umbral. Esto garantiza respuestas consistentes para preguntas equivalentes y reduce tanto la latencia como el número de llamadas al modelo.\n\nOpción D: Un índice secundario global (GSI) de DynamoDB sobre el texto normalizado, incluso aplicando stemming, sigue basándose en coincidencias léxicas (mismas raíces de palabras o texto normalizado idéntico), no en similitud semántica real basada en el significado. Dos preguntas con el mismo significado pero vocabulario totalmente distinto no coincidirían tras el stemming, por lo que esta solución no detecta de forma fiable la reformulación semántica de preguntas.\n\nReferencias: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp03.html ; https://docs.aws.amazon.com/opensearch-service/latest/developerguide/semantic-search.html ; https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-solr-opensearch/operational-architecture.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 52,
    questionNumber: 52,
    question: "A company uses AWS Lambda functions to build an AI agent solution. A GenAI developer must set up a Model Context Protocol (MCP) server that accesses user information. The GenAI developer must also configure the AI agent to use the new MCP server. The GenAI developer must ensure that only authorized users can access the MCP server. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Use a Lambda function to host the MCP server. Grant the AI agent Lambda functions permission to invoke the Lambda function that hosts the MCP server. Configure the AI agent's MCP client to invoke the MCP server asynchronously.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use a Lambda function to host the MCP server. Grant the AI agent Lambda functions permission to invoke the Lambda function that hosts the MCP server. Configure the AI agent to use the STDIO transport with the MCP server.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use a Lambda function to host the MCP server. Create an Amazon API Gateway HTTP API that proxies requests to the Lambda function. Configure the AI agent solution to use the Streamable HTTP transport to make requests through the HTTP API. Use Amazon Cognito to enforce OAuth 2.1.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Use a Lambda layer to host the MCP server. Add the Lambda layer to the AI agent Lambda functions. Configure the agentic AI solution to use the STDIO transport to send requests to the MCP server. In the AI agent's MCP configuration, specify the Lambda layer ARN as the command. Specify the user credentials as environment variables.",
        isCorrect: false
      }
    ],
    comments: "Opción A: invocar la función Lambda que aloja el servidor MCP de forma asíncrona rompe el modelo síncrono de petición-respuesta que exige el protocolo MCP (el cliente MCP del agente necesita recibir una respuesta JSON-RPC inmediata a cada solicitud de herramienta, no un acuse de recibo diferido). Además, conceder a las funciones Lambda del agente permiso para invocar la función que aloja el servidor MCP solo controla qué recurso de AWS puede llamar a otro; no resuelve en absoluto la autorización de usuarios finales humanos, que es un requisito explícito del enunciado.\n\nOpción B: según la especificación de MCP, el transporte STDIO está pensado para la comunicación local entre procesos que se ejecutan en la misma máquina (entrada/salida estándar), no para invocar de forma remota una función Lambda a través de la red. La guía prescriptiva de AWS sobre estrategias de hospedaje de MCP distingue explícitamente \"Local hosting\" (STDIO, sin necesidad de autenticación entre cliente y servidor porque todo ocurre en el mismo proceso/máquina) de \"Remote hosting\" (HTTP/HTTPS, con control de acceso centralizado). Usar STDIO contra una Lambda no es un patrón soportado ni ofrece ningún control de acceso de usuarios.\n\nOpción C (Correcta): esta opción coincide con el \"Deployment Pattern 2 – AWS Lambda + Amazon API Gateway\" documentado por AWS para servidores MCP: la lógica del servidor MCP corre en Lambda y se expone como servidor MCP remoto a través de una API HTTP de Amazon API Gateway. Para servidores remotos, el protocolo MCP usa el transporte Streamable HTTP (JSON-RPC 2.0 sobre solicitudes POST HTTP), en contraposición a STDIO, reservado para procesos locales. Colocar Amazon Cognito delante para emitir y validar tokens OAuth 2.1 implementa la autorización de usuarios de forma estándar: el cliente MCP del agente obtiene un token de acceso de un grupo de usuarios (user pool) de Cognito y lo presenta como bearer token en cada solicitud a través de API Gateway, de modo que solo los usuarios autenticados y autorizados por Cognito pueden invocar el servidor MCP. La documentación de AWS para AgentCore Runtime con MCP también usa este mismo patrón de Cognito + token de acceso para proteger servidores MCP remotos con transporte Streamable HTTP.\n\nOpción D: una capa de Lambda (Lambda Layer) es simplemente un paquete de código o dependencias añadido al entorno de ejecución de una función; no es un proceso ni un servicio de red independiente que pueda actuar como servidor MCP, ni algo que se pueda \"invocar\" mediante STDIO desde otra función. Especificar la ARN de una capa como \"comando\" en la configuración de un cliente MCP no es una configuración válida del protocolo, y colocar credenciales de usuario en variables de entorno de Lambda tampoco constituye un mecanismo de autorización por usuario: las variables de entorno son estáticas y compartidas por todas las invocaciones de la función, por lo que no permiten identificar, diferenciar ni revocar de forma segura el acceso de usuarios individuales.\n\nReferencias:\n- https://docs.aws.amazon.com/prescriptive-guidance/latest/mcp-deployment-patterns-on-aws/deployment-pattern-2-aws-lambda-amazon-api-gateway.html\n- https://docs.aws.amazon.com/prescriptive-guidance/latest/mcp-strategies/mcp-hosting-strategy.html\n- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-mcp.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 53,
    questionNumber: 53,
    question: "A company wants to create an annual rewards program for its customers. The rewards that customers earn vary based on different parameters such as the categories of the items ordered and the customers' purchase history. The company needs a generative AI (GenAI) solution that uses three Amazon Bedrock agents to help customers during online catalog browsing. The agents must use knowledge bases and action groups to handle the search, recommendation, and order modules. The modules must operate sequentially. An AWS Lambda function must calculate estimated rewards for each recommended item. The solution must provide graceful degradation during service disruptions. Which solution will meet these requirements with the MOST operational efficiency?",
    choices: [
      {
        letter: "A",
        text: "Define an Amazon API Gateway REST API behind each agent. Create a second Lambda function to orchestrate the calls to the agents and the rewards Lambda function. Configure the second Lambda function with a retry/fallback mechanism.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Create an AWS Step Functions state machine with four tasks that run the agents and the rewards Lambda function. Set up retry and catch branches for each of the task steps.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Configure each agent with a separate retry/fallback mechanism. Create a second Lambda function to orchestrate the calls to the agents and the rewards Lambda function. Define an Amazon API Gateway REST API behind the second Lambda function.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Create a second Lambda function to orchestrate the calls to the agents and the rewards Lambda function. Create an AWS Step Functions state machine with one task that runs the second Lambda function. Set up retry and catch branches for the task step.",
        isCorrect: false
      }
    ],
    comments: "Opción A: crear una segunda función Lambda para orquestar las llamadas a los tres agentes de Bedrock y a la función Lambda de recompensas, colocando además una API Gateway REST detrás de cada agente, obliga a programar y mantener manualmente toda la lógica de secuenciación y de reintento/fallback que AWS Step Functions ya ofrece de forma declarativa (campos Retry y Catch en cada estado). Además, exponer cada agente detrás de su propia API Gateway añade componentes y superficie de mantenimiento innecesarios para un flujo puramente interno y secuencial.\n\nOpción B (Correcta): una máquina de estados de AWS Step Functions con cuatro tareas (una por cada uno de los tres agentes de Bedrock —búsqueda, recomendación y pedido— y una para la función Lambda que calcula las recompensas), con ramas Retry y Catch configuradas en cada paso, resuelve el requisito de \"operación secuencial\" de forma nativa mediante el propio orden de los estados Task, y satisface la \"degradación agraciada ante interrupciones del servicio\" usando los mecanismos incorporados de Step Functions: Retry (reintentos con backoff exponencial configurable ante errores transitorios, incluidos States.ALL o errores específicos de servicio como Lambda.ServiceException) y Catch (enrutamiento a un estado de fallback cuando los reintentos se agotan), documentados en la guía oficial \"Handling errors in Step Functions workflows\". Esto se logra sin escribir ni mantener código de orquestación personalizado, por lo que es la solución de mayor eficiencia operativa. AWS documenta explícitamente este patrón de orquestar agentes de Amazon Bedrock mediante Step Functions en el escenario \"Build and orchestrate generative AI applications with Amazon Bedrock and Step Functions\".\n\nOpción C: configurar un mecanismo de retry/fallback independiente en cada uno de los tres agentes y, adicionalmente, una Lambda orquestadora con una API Gateway detrás, duplica la responsabilidad de manejo de errores (una vez en cada agente y otra vez implícitamente en el orquestador) y multiplica los componentes a desplegar y mantener, en comparación con una única máquina de estados declarativa que centraliza tanto la secuenciación como el manejo de fallos por paso.\n\nOpción D: envolver toda la orquestación (llamadas a los tres agentes más la Lambda de recompensas) dentro de una sola función Lambda, y ejecutar esa función como una única tarea de Step Functions con un solo bloque Retry/Catch, reduce la granularidad del manejo de errores: un fallo en cualquiera de los cuatro componentes internos se trata de forma indiferenciada a nivel de toda la tarea, en lugar de aplicarse políticas de reintento y captura específicas por agente o por la Lambda de recompensas. Esto disminuye la resiliencia y la trazabilidad de fallos puntuales, y sigue requiriendo mantener código de orquestación personalizado dentro de la Lambda, frente al enfoque totalmente declarativo de la opción B.\n\nReferencias:\n- https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html\n- https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-agent_example_cross_ServerlessPromptChaining_section.html\n- https://docs.aws.amazon.com/step-functions/latest/dg/sfn-best-practices.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 54,
    questionNumber: 54,
    question: "A company is creating a workflow to review customer-facing communications before the company sends the communications. The company uses a pre-defined message template to generate the communications and stores the communications in an Amazon S3 bucket. The workflow needs to capture a specific portion from the template and send it to an Amazon Bedrock model. The workflow must store model responses back to the original S3 bucket. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Create a flow in Amazon Bedrock Flows. Configure S3 action nodes at the beginning and end of the flow to retrieve and store the communications and the model responses. In the middle of the flow, configure an expression to parse each communication. Configure an agent step to send the parsed input to the model for review.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Create an AWS Step Functions Express workflow state machine. Use an Amazon S3 integration GetObject step to retrieve the original communications. Use an intrinsic function Pass step to parse the communications and to pass the results to an Amazon Bedrock InvokeModel step. Configure an Amazon S3 integration PutObject step to store the model responses back to the S3 bucket.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Create an Amazon Bedrock agent that has an action group. Configure instructions to define how the agent should parse the communications. Configure the action group to retrieve the communications from the S3 bucket, invoke the Amazon Bedrock model, and store the model responses back to the S3 bucket.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Create an Amazon Bedrock agent that has a single action group. Configure three AWS Lambda functions in the action group. Configure the functions to retrieve the communications from the S3 bucket, parse the communications and invoke the Amazon Bedrock model, and store the model responses back to the S3 bucket.",
        isCorrect: false
      }
    ],
    comments: "Opción A: Amazon Bedrock Flows sí incluye nodos de almacenamiento en S3 (\"S3 storage node\" para escribir y \"S3 retrieval node\" para leer) y un nodo \"Prompt\" dedicado a invocar un modelo de Bedrock con una expresión de entrada para transformar los datos. Sin embargo, la opción propone usar un \"agent step\" (nodo de agente) para enviar el contenido parseado al modelo; el nodo de agente en Bedrock Flows está pensado para invocar un Agente de Bedrock completo, con su propia orquestación, memoria y herramientas, no para realizar una simple inferencia de un modelo (para eso existe el nodo Prompt). Usar el nodo equivocado introduce complejidad y comportamiento innecesarios frente al requisito de simplemente enviar una porción del contenido al modelo.\n\nOpción B (Correcta): Un flujo de trabajo Express de AWS Step Functions puede orquestar todo el proceso mediante integraciones de servicio nativas, sin necesidad de código adicional. Un paso Task con la integración del SDK de AWS para \"s3:getObject\" recupera la comunicación original desde el bucket; un estado Pass puede usar funciones intrínsecas (por ejemplo, States.StringToJson) para parsear y transformar el contenido y preparar la entrada del modelo; a continuación, un paso Task con la integración optimizada de Amazon Bedrock (\"bedrock:InvokeModel\") envía ese fragmento al modelo — esta integración optimizada admite incluso los parámetros opcionales Input.S3Uri y Output.S3Uri para leer o escribir directamente en Amazon S3 si el payload es grande; finalmente, otro paso Task con la integración del SDK de AWS para \"s3:putObject\" guarda la respuesta del modelo de vuelta en el bucket original. Todo esto se define de forma declarativa en la máquina de estados, sin funciones Lambda intermedias ni la sobrecarga de un agente, lo que la convierte en la solución más simple, económica y determinista para un flujo lineal de leer-transformar-invocar-escribir.\n\nOpción C: Un agente de Amazon Bedrock con un grupo de acciones está diseñado para razonar de forma autónoma sobre qué acciones ejecutar a partir de instrucciones en lenguaje natural. Usar un agente para orquestar la recuperación desde S3, la invocación del modelo y el guardado del resultado añade una capa de razonamiento no determinista e imprevisible a un proceso que, en esencia, es una secuencia fija de pasos (leer, parsear, invocar, escribir), resultando menos adecuado, más lento y más costoso que una integración de servicio directa como la de Step Functions.\n\nOpción D: Definir tres funciones Lambda dentro de un único grupo de acciones de un agente de Bedrock para recuperar el archivo, parsear e invocar el modelo, y almacenar el resultado obliga a desarrollar y mantener código Lambda personalizado además de asumir la infraestructura y el comportamiento no determinista de un agente, cuando Step Functions ya ofrece integraciones nativas tanto con Amazon S3 (GetObject/PutObject) como con Amazon Bedrock (InvokeModel) que cubren exactamente estas necesidades sin escribir código adicional.\n\nReferencias: https://docs.aws.amazon.com/step-functions/latest/dg/connect-bedrock.html ; https://docs.aws.amazon.com/step-functions/latest/dg/tutorial-gather-s3-info.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/flows-nodes.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 55,
    questionNumber: 55,
    question: "A financial technology company is using Amazon Bedrock to build an assessment system for the company's customer service AI assistant. The AI assistant must provide financial recommendations that are factually accurate, compliant with financial regulations, and conversationally appropriate. The company needs to combine automated quality evaluations at scale with targeted human reviews of critical interactions. What solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Configure a pipeline in which financial experts manually score all responses for accuracy, compliance, and conversational quality. Use Amazon SageMaker notebooks to analyze results to identify improvement areas.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Configure Amazon Bedrock evaluations that use Anthropic Claude Sonnet as a judge model to assess response accuracy and appropriateness. Configure custom Amazon Bedrock guardrails to check responses for compliance with financial policies. Add Amazon Augmented AI (Amazon A2I) human reviews for flagged critical interactions.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Create an Amazon Lex bot to manage the customer service interactions. Configure AWS Lambda functions to check responses against a static compliance database. Configure intents in the bot that call the Lambda functions to check the responses. Add an additional intent to collect end-user reviews.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Configure Amazon CloudWatch to monitor response patterns from the AI assistant. Configure CloudWatch alerts for potential compliance violations. Establish a team of human evaluators to review flagged interactions.",
        isCorrect: false
      }
    ],
    comments: "Opción A: hacer que expertos financieros puntúen manualmente todas las respuestas no escala frente al volumen de interacciones de un asistente de atención al cliente y no combina evaluación automatizada a gran escala con revisión humana selectiva; usar notebooks de Amazon SageMaker para analizar los resultados es un paso de análisis posterior, no una solución de evaluación en sí, por lo que incumple el requisito del enunciado.\n\nOpción B (Correcta): Amazon Bedrock ofrece trabajos de evaluación de modelos que usan un \"LLM como juez\" (evaluator model), donde un modelo como Anthropic Claude (Claude 3.5/3.7 Sonnet, Claude Sonnet 4, etc., todos soportados como modelos evaluadores) puntúa automáticamente y a escala las respuestas del modelo generador según métricas integradas o personalizadas (precisión, relevancia, utilidad, tono, etc.), devolviendo tanto la puntuación como una explicación. De forma complementaria, los guardrails personalizados de Amazon Bedrock (mediante políticas como temas denegados, filtros de contenido, filtros de palabras y comprobaciones de fundamentación contextual) permiten verificar que las respuestas cumplen las políticas de cumplimiento financiero de la empresa. Finalmente, Amazon Augmented AI (Amazon A2I) permite configurar flujos de revisión humana (\"human review workflows\"/\"human loops\") que se activan solo para las interacciones marcadas como críticas, aportando la revisión humana dirigida sin necesidad de revisar manualmente el 100% del tráfico. La combinación de estos tres servicios nativos de AWS cubre exactamente los tres requisitos del enunciado (precisión factual evaluada a escala, cumplimiento normativo verificado automáticamente, y revisión humana selectiva de casos críticos) con el mínimo esfuerzo de implementación.\n\nOpción C: un bot de Amazon Lex con funciones AWS Lambda que comprueban las respuestas contra una base de datos estática de cumplimiento no ofrece ninguna evaluación de calidad conversacional ni de precisión factual generada por IA, y depender de que los propios usuarios finales dejen reseñas no equivale a un mecanismo de revisión humana dirigido específicamente a interacciones críticas; es un enfoque rígido, basado en reglas estáticas, que no escala ni se adapta bien a un caso de uso generativo.\n\nOpción D: monitorizar patrones de respuesta con Amazon CloudWatch y generar alarmas ante posibles incumplimientos no constituye una evaluación automatizada de la precisión y el cumplimiento del contenido generado por el modelo; CloudWatch está pensado para métricas operativas y de sistema, no para analizar semánticamente la calidad o veracidad de una respuesta de IA generativa. Además, el enunciado indica que un equipo humano revisaría todas las interacciones marcadas, lo cual no sustituye a una evaluación automatizada real a escala.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-denied-topics.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/a2i-use-augmented-ai-a2i-human-review-loops.html",
    category: "Monitoring & Evaluation",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 56,
    questionNumber: 56,
    question: "A healthcare company is using Amazon Bedrock to develop a real-time patient care AI assistant to respond to queries for separate departments that handle clinical inquiries, insurance verification, appointment scheduling, and insurance claims. The company wants to use a multi-agent architecture. The company must ensure that the AI assistant is scalable and can onboard new features for patients. The AI assistant must be able to handle thousands of parallel patient interactions. The company must ensure that patients receive appropriate domain-specific responses to queries. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Isolate data for each agent by using separate knowledge bases. Use IAM filtering to control access to each knowledge base. Deploy a supervisor agent to perform natural language intent classification on patient inquiries. Configure the supervisor agent to route queries to specialized collaborator agents to respond to department-specific queries. Configure each specialized collaborator agent to use Retrieval Augmented Generation (RAG) with the agent's department-specific knowledge base.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Create a separate supervisor agent for each department. Configure individual collaborator agents to perform natural language intent classification for each specialty domain within each department. Integrate each collaborator agent with department-specific knowledge bases only. Implement manual handoff processes between the supervisor agents.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Isolate data for each department in separate knowledge bases. Use IAM filtering to control access to each knowledge base. Deploy a single general-purpose agent. Configure multiple action groups within the general-purpose agent to perform specific department functions. Implement rule-based routing logic within the general-purpose agent instructions.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Implement multiple independent supervisor agents that run in parallel to respond to patient inquiries for each department. Configure multiple collaborator agents for each supervisor agent. Integrate all agents with the same knowledge base. Use external routing logic to merge responses from multiple supervisor agents.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): Según la documentación oficial de Amazon Bedrock Agents sobre \"multi-agent collaboration\", el patrón soportado nativamente es jerárquico: se designa un agente supervisor y se le asocian uno o más agentes colaboradores especializados por dominio. El agente supervisor recibe la consulta del usuario, determina de qué departamento o especialidad se trata (clasificación de intención en lenguaje natural) y enruta la solicitud al agente colaborador correspondiente. Cada agente del equipo, incluido el supervisor, puede tener sus propias herramientas, grupos de acciones, bases de conocimiento (Knowledge Bases) y guardrails, lo que permite aislar los datos de cada departamento (clínico, verificación de seguros, citas, reclamaciones) en bases de conocimiento independientes, controlar el acceso mediante políticas de IAM asociadas a cada agente/base de conocimiento, y aplicar RAG específico de cada dominio. Esta arquitectura es la que AWS recomienda para escalar y añadir nuevos dominios de forma independiente sin rediseñar todo el sistema, y soporta el volumen de interacciones paralelas requerido.\n\nOpción B: crear un supervisor separado por cada departamento e invertir los roles (haciendo que los \"colaboradores\" sean quienes clasifiquen la intención dentro de cada especialidad) contradice el modelo jerárquico documentado, en el que es el supervisor quien clasifica y enruta, no los colaboradores. Además, los traspasos manuales entre múltiples supervisores introducen fricción operativa y no escalan a miles de interacciones paralelas en tiempo real.\n\nOpción C: desplegar un único agente de propósito general con múltiples grupos de acciones (action groups) y lógica de enrutamiento basada en reglas dentro de las instrucciones del propio agente no aprovecha el patrón de colaboración multiagente de Bedrock; a medida que se añaden nuevos dominios, las instrucciones y la lógica de enrutamiento del agente único se vuelven cada vez más complejas y difíciles de mantener, y no se benefician del aislamiento ni de la especialización por dominio que ofrece tener agentes colaboradores independientes.\n\nOpción D: ejecutar varios agentes supervisores independientes en paralelo que comparten la misma base de conocimiento y fusionar sus respuestas mediante lógica externa añade complejidad innecesaria, riesgo de respuestas inconsistentes entre supervisores, y no aísla los datos por departamento como exige el enunciado (que requiere bases de conocimiento separadas y control de acceso específico por dominio).\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/agents-multi-agent-collaboration.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/create-multi-agent-collaboration.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 57,
    questionNumber: 57,
    question: "A company uses an AI assistant application to summarize the company's website content and provide information to customers. The company plans to use Amazon Bedrock to give the application access to a foundation model (FM). The company needs to deploy the AI assistant application to a development environment and a production environment. The solution must integrate the environments with the FM. The company wants to test the effectiveness of various FMs in each environment. The solution must provide product owners with the ability to easily switch between FMs for testing purposes in each environment. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Create one AWS CDK application. Create multiple pipelines in AWS CodePipeline. Configure each pipeline to have its own settings for each FM. Configure the application to invoke the Amazon Bedrock FMs by using the aws_bedrock.ProvisionedModel.fromProvisionedModelArn() method.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Create a separate AWS CDK application for each environment. Configure the applications to invoke the Amazon Bedrock FMs by using the aws_bedrock.FoundationModel.fromFoundationModelId() method. Create a separate pipeline in AWS CodePipeline for each environment.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Create one AWS CDK application. Configure the application to invoke the Amazon Bedrock FMs by using the aws_bedrock.FoundationModel.fromFoundationModelId() method. Create a pipeline in AWS CodePipeline pipeline that has a deployment stage for each environment that uses AWS CodeBuild deploy actions.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Create one AWS CDK application for the production environment. Configure the application to invoke the Amazon Bedrock FMs by using the aws_bedrock.ProvisionedModel.fromProvisionedModelArn() method. Create a pipeline in AWS CodePipeline. Configure the pipeline to deploy to the production environment by using an AWS CodeBuild deploy action. For the development environment, manually recreate the resources by referring to the production application code.",
        isCorrect: false
      }
    ],
    comments: "Opción A: usar aws_bedrock.ProvisionedModel.fromProvisionedModelArn() ata la aplicación a un ARN de Provisioned Throughput específico y fijo, lo que exige aprovisionar capacidad dedicada por cada modelo que se quiera probar y complica el cambio rápido entre FMs. Además, crear una pipeline distinta en AWS CodePipeline por cada modelo multiplica el número de pipelines a mantener sin necesidad real, ya que el objetivo es poder cambiar de modelo fácilmente, no aislar infraestructura por modelo.\n\nOpción B: mantener una aplicación de AWS CDK independiente y una pipeline de AWS CodePipeline independiente para cada entorno (desarrollo y producción) duplica la definición de infraestructura como código. Cualquier cambio (por ejemplo, añadir soporte para un nuevo FM o ajustar la lógica de invocación) debe replicarse manualmente en ambas aplicaciones y pipelines, lo que aumenta el riesgo de desincronización entre entornos, en contra de las prácticas recomendadas de AWS CDK de reutilizar una misma definición de stacks para múltiples entornos mediante \"stages\".\n\nOpción C (Correcta): una única aplicación de AWS CDK que invoque los modelos de Amazon Bedrock mediante aws_bedrock.FoundationModel.fromFoundationModelId() referencia modelos bajo demanda a partir de su identificador de modelo, un valor que puede parametrizarse fácilmente (por variable de entorno, contexto de CDK o parámetro de configuración) para cada etapa de despliegue, permitiendo a los product owners cambiar el FM usado en cada entorno sin modificar la lógica de la aplicación ni re-desplegar infraestructura de Provisioned Throughput. Esta única aplicación se despliega mediante una sola pipeline de AWS CodePipeline que define una etapa de despliegue por entorno (desarrollo y producción) usando acciones de AWS CodeBuild, lo que centraliza la gestión del ciclo de vida de CI/CD, evita la duplicación de pipelines y sigue el patrón recomendado por AWS CDK de usar \"stages\" para desplegar el mismo conjunto de stacks en múltiples entornos de forma consistente.\n\nOpción D: construir la aplicación de AWS CDK únicamente para producción y \"recrear manualmente\" los recursos del entorno de desarrollo copiando a mano el código de producción elimina la reproducibilidad y la trazabilidad que proporciona la infraestructura como código. Esto introduce alto riesgo de desviación de configuración (configuration drift) entre entornos y errores humanos, exactamente lo contrario de una solución mantenible y fácil de sincronizar entre desarrollo y producción.\n\nReferencias: https://docs.aws.amazon.com/cdk/v2/guide/stages.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    category: "Security & Governance",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 58,
    questionNumber: 58,
    question: "A hotel company wants to enhance a legacy Java-based property management system (PMS) by adding AI capabilities. The company wants to use Amazon Bedrock Knowledge Bases to provide staff with room availability information and hotel-specific details. The solution must maintain separate access controls for each hotel that the company manages. The solution must provide room availability information in near real time and must maintain consistent performance during peak usage periods. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Deploy a single Amazon Bedrock knowledge base that contains combined data for all hotels. Configure AWS Lambda functions to synchronize data from each hotel's PMS database through direct API connections. Implement AWS CloudTrail logging with hotel-specific filters to audit access logs for each hotel's data.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Create an Amazon EventBridge rule for each hotel that is invoked by changes to the PMS database for each hotel. Configure the rule to send updates to a centralized Amazon Bedrock knowledge base in a management AWS account. Configure resource-based policies to enforce hotel-specific access controls for hotel staff.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Implement one Amazon Bedrock knowledge base for each hotel in a multi-account structure. Use direct data ingestion to provide real-time room availability information. Schedule regular synchronization for less critical information.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Build a centralized Amazon Bedrock agent that uses multiple knowledge bases. Implement AWS IAM Identity Center with hotel-specific permission sets to control hotel staff data access.",
        isCorrect: false
      }
    ],
    comments: "Opción A: una única base de conocimiento de Amazon Bedrock con los datos combinados de todos los hoteles no ofrece controles de acceso independientes por hotel a nivel de recurso; todos los documentos comparten el mismo almacén vectorial y las mismas cuotas de servicio de la cuenta. Usar AWS CloudTrail únicamente para auditar accesos mediante filtros no restringe realmente qué personal puede consultar los datos de qué hotel, solo registra la actividad después de que ocurre; por tanto no cumple el requisito de controles de acceso separados por hotel.\n\nOpción B: centralizar todas las actualizaciones en una única base de conocimiento alojada en una cuenta de gestión, aunque use EventBridge para disparar la sincronización y políticas basadas en recursos para restringir el acceso, sigue concentrando todos los hoteles en la misma base de conocimiento y en la misma cuenta de AWS. Esto implica que todos los hoteles comparten las mismas cuotas de servicio de Amazon Bedrock (por ejemplo, límites de ingesta y de consultas por segundo), de modo que un pico de uso en un hotel puede degradar el rendimiento del resto, incumpliendo el requisito de rendimiento consistente durante picos de uso.\n\nOpción C (Correcta): Amazon Bedrock Knowledge Bases admite políticas de recursos (resource-based policies) para conceder acceso entre cuentas a las acciones bedrock:Retrieve y bedrock:GetDocumentContent sobre una base de conocimiento gestionada (managed), lo que permite que cada hotel tenga su propia base de conocimiento en su propia cuenta de AWS dentro de una estructura multicuenta, logrando aislamiento real de datos y controles de acceso independientes por hotel. Además, distribuir cada hotel en su propia cuenta sigue la práctica recomendada por AWS de usar una estrategia multicuenta para aislar las cuotas de servicio y reducir el \"blast radius\", de forma que el pico de actividad de un hotel no consuma la cuota ni degrade el rendimiento de otro. Para la disponibilidad de habitaciones en tiempo casi real, Amazon Bedrock Knowledge Bases permite la ingesta directa de documentos (a través de un data source de tipo \"Custom\" y las operaciones de la API KnowledgeBaseDocuments, como IngestKnowledgeBaseDocuments) sin necesidad de ejecutar un trabajo de sincronización (StartIngestionJob), lo que reduce la latencia de actualización. Para la información menos crítica y menos cambiante (por ejemplo, políticas del hotel o descripciones de servicios), se puede seguir usando sincronización programada mediante trabajos de ingesta convencionales. Esta combinación satisface simultáneamente el aislamiento por hotel, el rendimiento consistente en picos y la actualización casi en tiempo real de la disponibilidad.\n\nOpción D: un agente centralizado de Amazon Bedrock que orquesta múltiples bases de conocimiento, combinado con AWS IAM Identity Center y permission sets específicos por hotel, puede controlar razonablemente qué personal accede a qué base de conocimiento. Sin embargo, todas las bases de conocimiento seguirían residiendo en la misma cuenta (o estructura de cuenta única), por lo que comparten las mismas cuotas de servicio de Amazon Bedrock; un pico de solicitudes de un hotel podría afectar el rendimiento de las consultas de otros hoteles, sin el aislamiento de rendimiento y escalado independiente que proporciona una arquitectura multicuenta real.\n\nReferencias:\n- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-managed-cross-account.html\n- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-direct-ingestion.html\n- https://docs.aws.amazon.com/lambda/latest/dg/concepts-application-design.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 59,
    questionNumber: 59,
    question: "A company is implementing a serverless inference API by using AWS Lambda. The API will dynamically invoke multiple AI models hosted on Amazon Bedrock. The company needs to design a solution that can switch between model providers without modifying or redeploying Lambda code in real time. The design must include safe rollout of configuration changes and validation and rollback capabilities. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Store the active model provider in AWS Systems Manager Parameter Store. Configure a Lambda function to read the parameter at runtime to determine which model to invoke.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Store the active model provider in AWS AppConfig. Configure a Lambda function to read the configuration at runtime to determine which model to invoke.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Configure an Amazon API Gateway REST API to route requests to separate Lambda functions. Hardcode each Lambda function to a specific model provider. Switch the integration target manually.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Store the active model provider in a JSON file hosted on Amazon S3. Use AWS AppConfig to reference the S3 file as a hosted configuration source. Configure a Lambda function to read the file through AppConfig at runtime to determine which model to invoke.",
        isCorrect: false
      }
    ],
    comments: "Opción A: AWS Systems Manager Parameter Store permite almacenar el proveedor de modelo activo como un valor de configuración que Lambda puede leer en tiempo de ejecución, evitando así modificar o redesplegar el código. Sin embargo, Parameter Store no ofrece de forma nativa validadores de esquema, estrategias de despliegue gradual (por porcentaje o de forma exponencial) ni rollback automático basado en alarmas de CloudWatch; toda esa lógica de validación y reversión segura tendría que construirse manualmente. Por tanto, no cumple los requisitos de \"safe rollout\" y \"validation and rollback\" que pide el enunciado.\n\nOpción B (Correcta): AWS AppConfig está diseñado específicamente para gestionar configuración de aplicaciones en producción sin necesidad de redesplegar código, incluyendo tres capacidades clave que exige el enunciado: (1) Validadores, que comprueban que los datos de configuración sean sintáctica y semánticamente correctos antes de desplegarlos; (2) Estrategias de despliegue (deployment strategies), que permiten un rollout gradual y controlado del cambio de configuración (por ejemplo, estrategias predefinidas como AppConfig.Linear20PercentEvery6Minutes o AppConfig.AllAtOnce con monitorización de 10 minutos); y (3) Rollback automático, integrado con Amazon CloudWatch, que revierte automáticamente la configuración a la versión anterior si una alarma de CloudWatch entra en estado ALARM durante el despliegue. Un Lambda puede leer la configuración activa (por ejemplo, el proveedor de modelo de Bedrock a invocar) en tiempo de ejecución a través de AppConfig (directamente vía SDK o mediante la AppConfig Lambda extension/agent), cambiando el comportamiento sin tocar ni redesplegar el código de la función. Esto satisface de forma directa y nativa todos los requisitos del enunciado.\n\nOpción C: enrutar mediante Amazon API Gateway a funciones Lambda distintas, cada una con el proveedor de modelo fijado (hardcoded) en el código, obliga a modificar y redesplegar código cada vez que se quiera cambiar de proveedor, e implica cambios manuales de la integración del API Gateway. Esto incumple directamente el requisito de \"switch between model providers without modifying or redeploying Lambda code in real time\", y tampoco ofrece mecanismos de validación ni rollback.\n\nOpción D: usar un archivo JSON alojado en Amazon S3 como fuente de configuración (hosted configuration source) referenciada por AWS AppConfig es una configuración válida y soportada (AppConfig puede obtener datos desde S3, Secrets Manager, Parameter Store o su propio almacén hospedado), y en teoría también se beneficiaría de los validadores, las estrategias de despliegue y el rollback automático de AppConfig. Sin embargo, añade una capa adicional de indirección y complejidad operativa (gestionar y versionar el archivo en S3, permisos de acceso, sincronización) sin aportar ninguna ventaja adicional frente a usar directamente el almacén de configuración nativo (hosted configuration store) de AppConfig, que es más simple y igualmente cumple todos los requisitos. Por eso, entre B y D, la opción B es la solución más directa y eficiente.\n\nReferencias: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html ; https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-deployment-strategy.html ; https://docs.aws.amazon.com/appconfig/latest/userguide/monitoring-deployments.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 60,
    questionNumber: 60,
    question: "A company is building a generative AI (GenAI) application that uses Amazon Bedrock APIs to process complex customer inquiries. During peak usage periods, the application experiences intermittent API timeouts that cause issues such as broken response chunks and delayed data delivery. The application struggles to ensure that prompts remain within token limits when handling complex customer inquiries of varying lengths. Users have reported truncated inputs and incomplete responses. The company has also observed foundation model (FM) invocation failures. The company needs a retry strategy that automatically handles transient service errors and prevents overwhelming Amazon Bedrock during peak usage periods. The strategy must also adapt to changing service availability and support response streaming and token-aware request handling. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Implement a standard retry strategy that uses a 1-second fixed delay between attempts and a 3-retry maximum for all errors. Handle streaming response timeouts by restarting streams. Cap token usage for each session.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Implement an adaptive retry strategy that uses exponential backoff with jitter and a circuit breaker pattern that temporarily disables retries when error rates exceed a predefined threshold. Implement a streaming response handler that monitors for chunk delivery timeouts. Configure the handler to buffer successfully received chunks and intelligently resume streaming from the last received chunk when connections are re-established.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use the AWS SDK to configure a retry strategy in standard mode. Wrap Amazon Bedrock API calls in try-catch blocks that handle timeout exceptions. Return cached completions for failed streaming requests. Enforce a global token limit for all users. Add jitter-based retry logic and lightweight token trimming for each request. Resume broken streams by requesting only the missing chunks from the point of failure. Maintain a small in-memory buffer of the most recent chunks to minimize redundant data transfer.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Set Amazon Bedrock client request timeouts to 30 seconds. Implement client-side load shedding. Buffer partial results and stop new requests when the application performance begins to degrade. Set static token usage caps for all requests. Configure exponential backoff retries, dynamic chunk sizing, and context-aware token limits.",
        isCorrect: false
      }
    ],
    comments: "Opción A: un retraso fijo de 1 segundo con un máximo de 3 reintentos aplicado a todos los tipos de error no distingue errores transitorios (timeouts de red) de errores de throttling, cuando la documentación de AWS indica que el modo estándar de reintento de los SDK ya aplica retrasos más cortos para errores transitorios y más largos para errores de limitación (\"error-type-specific backoff\"). Reiniciar el stream completo ante un corte descarta todo el progreso ya recibido, y un backoff fijo sin jitter ni ajuste dinámico no se adapta a la disponibilidad cambiante del servicio durante los picos de uso. Por tanto, no cumple los requisitos del enunciado.\n\nOpción B: combina una estrategia de reintento adaptativa (backoff exponencial con jitter) con un patrón de circuit breaker que desactiva temporalmente los reintentos cuando la tasa de error supera un umbral, además de un manejador de streaming que almacena en búfer los fragmentos recibidos y reanuda desde el último fragmento correctamente entregado. Este diseño coincide de forma muy cercana con la documentación oficial de AWS: la guía de referencia de los SDK describe el modo \"adaptativo\" como aquel que añade un limitador de tasa del lado del cliente que ralentiza automáticamente el envío de solicitudes cuando el servicio señala throttling, recomendado explícitamente para cargas de trabajo de IA que invocan una única operación de API a alto volumen (el caso descrito en el enunciado). El AWS Well-Architected Framework (Agentic AI Lens, AGENTPERF06-BP02) también recomienda backoff exponencial con jitter combinado con un \"automatic cutoff\" (circuit breaker) que abre el circuito al superar un umbral de fallos. Por esta cercanía con la documentación, existen dudas fundadas de que esta sea, en realidad, la opción más correcta (ver campo de duda/concern).\n\nOpción C (marcada como correcta en el material original): configurar el SDK de AWS en modo de reintento estándar (que ya incorpora backoff exponencial con jitter aleatorizado, sin necesidad de \"añadir\" jitter por separado) junto con manejo de excepciones de timeout, recorte de tokens por solicitud y un búfer en memoria de los fragmentos más recientes es una combinación razonable, pero incluye elementos que no están claramente respaldados por la documentación de Bedrock o que resultan internamente contradictorios. \"Devolver completions cacheadas para solicitudes de streaming fallidas\" no tiene sentido si cada consulta de cliente es distinta, salvo que se use como respaldo tras abrir explícitamente un circuit breaker (mecanismo que esta opción no menciona). \"Imponer un límite de tokens global para todos los usuarios\" contradice el requisito de manejo de tokens adaptado a la longitud/complejidad de cada consulta, y es inconsistente con el \"recorte ligero de tokens por solicitud\" que la misma opción menciona a continuación. Además, \"solicitar solo los fragmentos faltantes desde el punto de fallo\" sugiere una capacidad de reanudación de streaming por rangos que las API de streaming de Amazon Bedrock no exponen de forma nativa: ante un corte, un cliente típicamente debe reemitir la solicitud completa y fusionar/descartar lo ya almacenado en búfer, no solicitar al servicio \"solo lo que falta\". Estos matices generan dudas razonables sobre si esta opción es realmente superior a la B frente a la documentación oficial.\n\nOpción D: fijar tiempos de espera estáticos de 30 segundos y topes de tokens estáticos para todas las solicitudes, aun complementado con backoff exponencial, dimensionamiento dinámico de fragmentos y límites de tokens \"conscientes del contexto\", mezcla de forma inconsistente elementos estáticos y dinámicos, y no ofrece un mecanismo estructurado de tipo circuit breaker o limitador de tasa adaptativo equivalente a los que documenta AWS para picos de uso y throttling cambiante.\n\n⚠️ Aviso de verificación: aunque la Opción C es la respuesta marcada como correcta (y se mantiene sin cambios), la documentación oficial de AWS respalda con bastante literalidad partes del diseño de la Opción B. La guía de referencia de los SDK de AWS (feature-retry-behavior.html) describe el modo de reintento \"adaptativo\" recomendándolo explícitamente para \"AI workloads that call a single API operation at high volume\" y para casos en que se necesita que el SDK frene automáticamente ante señales de throttling, lo cual coincide casi palabra por palabra con los requisitos del enunciado. Además, el AWS Well-Architected Framework (Agentic AI Lens, práctica AGENTREL07-BP02) documenta explícitamente un patrón de \"circuit-breaker\" para invocaciones de agentes/modelos, igual que describe la Opción B. En cambio, no se encontró respaldo documental para el mecanismo específico de la Opción C de \"reanudar streams solicitando solo los chunks faltantes desde el punto de fallo\"; las APIs de streaming de Bedrock (InvokeModelWithResponseStream/ConverseStream) no exponen esa capacidad de reanudación por rangos. Se recomienda revisión humana para confirmar si la respuesta correcta debería ser B en lugar de C.\n\nReferencias: https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html ; https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentperf06-bp02.html ; https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/circuit-breaker.html",
    category: "Performance & Scaling",
    multiSelect: false,
    requiredCount: 1
  }
];
