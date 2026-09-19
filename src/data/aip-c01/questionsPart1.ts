import { Question } from '../../types';

export const QUESTIONS_PART_1: Question[] = [
  {
    id: 1,
    questionNumber: 1,
    question: "A retail company has a generative AI (GenAI) product recommendation application that uses Amazon Bedrock. The application suggests products to customers based on browsing history and demographics. The company needs to implement fairness evaluation across multiple demographic groups to detect and measure bias in recommendations between two prompt approaches. The company wants to collect and monitor fairness metrics in real time. The company must receive an alert if the fairness metrics show a discrepancy of more than 15% between demographic groups. The company must receive weekly reports that compare the performance of the two prompt approaches. Which solution will meet these requirements with the LEAST custom development effort?",
    choices: [
      {
        letter: "A",
        text: "Configure an Amazon CloudWatch dashboard to display default metrics from Amazon Bedrock API calls. Create custom metrics based on model outputs. Set up Amazon EventBridge rules to invoke AWS lambda functions that perform post-processing analysis on model responses and publish custom fairness metrics.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Create the two prompt variants in Amazon Bedrock Prompt Management. Use Amazon Bedrock Flows to deploy the prompt variants with defined traffic allocation. Configure Amazon Bedrock guardrails that have content filters to monitor demographic fairness. Set up Amazon CloudWatch alarms on the GuardrailContentSource dimension that use InvocationsIntervened metrics to detect recommendation discrepancy threshold violations.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Set up Amazon SageMaker Clarify to analyze model outputs. Publish fairness metrics to Amazon CloudWatch. Create CloudWatch composite alarms that combine SageMaker Clarify bias metrics with Amazon Bedrock latency metrics to provide a comprehensive fairness evaluation dashboard.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Create an Amazon Bedrock model evaluation job to compare fairness between the two prompt variants. Enable model invocation logging in Amazon CloudWatch. Set up CloudWatch alarms for InvocationsIntervened metrics with a dimension for each demographic group.",
        isCorrect: false
      }
    ],
    comments: "Opción A: construir un pipeline de post-procesamiento a medida con reglas de Amazon EventBridge y funciones de AWS Lambda para calcular métricas de equidad personalizadas exige diseñar, codificar y mantener toda la lógica de detección de sesgo desde cero. Esto contradice directamente el requisito de \"mínimo esfuerzo de desarrollo personalizado\", ya que existe un servicio de AWS gestionado (SageMaker Clarify) diseñado específicamente para esta tarea.\n\nOpción B: los filtros de contenido (content filters) de Amazon Bedrock Guardrails están diseñados para detectar categorías de contenido dañino (odio, insultos, contenido sexual, violencia, ataques de prompt/jailbreak), no para medir equidad estadística ni disparidad de resultados entre grupos demográficos. Según la documentación de CloudWatch para Guardrails, las dimensiones nativas disponibles son Operation, GuardrailContentSource, GuardrailPolicyType y GuardrailArn; no existe una dimensión por grupo demográfico. La métrica InvocationsIntervened cuenta cuántas invocaciones fueron intervenidas por un guardrail (por ejemplo, bloqueadas o modificadas), no calcula ninguna discrepancia de recomendación entre segmentos de población. Por tanto, esta solución no puede detectar ni alertar sobre un umbral de disparidad del 15% entre grupos.\n\nOpción C (Correcta): Amazon SageMaker Clarify es el servicio de AWS diseñado específicamente para el análisis de sesgo (bias) y equidad (fairness). Proporciona un conjunto de métricas de sesgo pre-entrenamiento y post-entrenamiento (once métricas post-entrenamiento, como Accuracy Difference, Disparate Impact, etc.) que cuantifican distintas nociones de equidad comparando resultados entre \"facets\" o grupos demográficos favorecidos y desfavorecidos, y esta capacidad se extiende también a la evaluación de modelos de lenguaje/generativos (foundation model evaluations). Además, los trabajos de monitorización de deriva de sesgo (bias drift monitoring) de Clarify publican estas métricas automáticamente en Amazon CloudWatch (namespaces como aws/sagemaker/Endpoints/bias-metrics), incluyendo dimensiones Facet y FacetValue que identifican el grupo demográfico analizado. Esto permite crear alarmas de CloudWatch (incluidas alarmas compuestas que combinen estas métricas de sesgo con métricas de latencia de Bedrock) para alertar ante una discrepancia superior al 15%, así como dashboards y reportes periódicos (semanales) comparando las dos variantes de prompt, todo ello con un esfuerzo de desarrollo mínimo al apoyarse en un servicio gestionado de AWS.\n\nOpción D: los trabajos de evaluación de modelos (model evaluation jobs) de Amazon Bedrock —tanto automáticos como basados en humanos o en \"modelo como juez\"— están orientados a comparar la calidad de las respuestas de los modelos (precisión, robustez, toxicidad, etc.) frente a conjuntos de datos de prompts, pero no incluyen de forma nativa métricas de equidad segmentadas por grupo demográfico. Adicionalmente, InvocationsIntervened es una métrica de Amazon Bedrock Guardrails (no de los trabajos de evaluación de modelos) y sus dimensiones nativas en CloudWatch no incluyen una dimensión \"por grupo demográfico\", por lo que no es apta para medir sesgo entre segmentos de población ni para generar los informes comparativos semanales solicitados.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-measure-post-training-bias.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-monitor-bias-drift-cw.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-guardrails-cw-metrics.html",
    category: "Monitoring & Evaluation",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 2,
    questionNumber: 2,
    question: "A finance company is developing an AI assistant to help clients plan investments and manage their portfolios. The company identifies several high-risk conversation patterns such as requests for specific stock recommendations or guaranteed returns. High-risk conversation patterns could lead to regulatory violations if the company cannot implement appropriate controls. The company must ensure that the AI assistant does not provide inappropriate financial advice, generate content about competitors, or make claims that are not factually grounded in the company's approved financial guidance. The company wants to use Amazon Bedrock Guardrails to implement a solution. Which combination of steps will meet these requirements? (Choose three.)",
    choices: [
      {
        letter: "A",
        text: "Add the high-risk conversation patterns to a denied topics guardrail.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Configure a content filter guardrail to filter prompts that contain the high-risk conversation patterns.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Configure a content filter guardrail to filter prompts that contain competitor names.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Add the names of competitors as custom word filters. Set the input and output actions to block.",
        isCorrect: true
      },
      {
        letter: "E",
        text: "Set a low grounding score threshold.",
        isCorrect: false
      },
      {
        letter: "F",
        text: "Set a high grounding score threshold.",
        isCorrect: true
      }
    ],
    comments: "Opción A (Correcta): Amazon Bedrock Guardrails permite definir \"denied topics\" (temas denegados), una política que describe semánticamente un conjunto de temas no deseados (por ejemplo, \"recomendaciones específicas de acciones\" o \"promesas de retornos garantizados\"). Cuando el modelo detecta que una entrada o una respuesta se ajusta a ese tema, la bloquea. Este es exactamente el mecanismo diseñado para bloquear los patrones de conversación de alto riesgo descritos por la empresa financiera.\n\nOpción B: los content filters de Bedrock Guardrails funcionan sobre categorías predefinidas de contenido dañino (odio, insultos, contenido sexual, violencia, mal uso/misconduct y ataques de prompt), con umbrales de intensidad configurables. No están diseñados para capturar patrones de negocio específicos como \"solicitud de consejo de inversión concreto\"; ese tipo de intención se detecta mejor con un \"denied topic\", por lo que un content filter no es la herramienta adecuada aquí.\n\nOpción C: igual que en el caso anterior, un content filter no sirve para bloquear nombres propios o listas específicas de palabras como los nombres de la competencia, ya que trabaja sobre categorías de daño, no sobre coincidencias léxicas exactas de términos concretos.\n\nOpción D (Correcta): la documentación de AWS indica explícitamente que los \"word filters\" (filtros de palabras) de Bedrock Guardrails permiten bloquear palabras y frases mediante coincidencia exacta tanto en las entradas (prompts) como en las respuestas del modelo, y menciona de forma literal que se pueden usar para bloquear \"contenido con nombres de competidores o de productos\". Se puede añadir una lista de palabras personalizadas (custom word filter) con hasta 10.000 elementos y configurar las acciones de entrada y salida en modo de bloqueo, cumpliendo el requisito de no generar contenido sobre competidores.\n\nOpción E: un umbral bajo (low) de contextual grounding check dejaría pasar respuestas con una puntuación baja de fundamentación (grounding) o relevancia, es decir, permitiría respuestas poco ancladas en la fuente de referencia aprobada; esto es lo contrario de lo que la empresa necesita para evitar afirmaciones no respaldadas por su guía financiera.\n\nOpción F (Correcta): el \"contextual grounding check\" de Bedrock Guardrails evalúa cada respuesta del modelo frente a una fuente de referencia (grounding source) y la consulta del usuario, generando puntuaciones de \"grounding\" (precisión factual respecto a la fuente) y \"relevance\" (relevancia respecto a la consulta), con valores configurables entre 0 y 0.99. Cuanto más alto se configure el umbral, mayor es la probabilidad de bloquear contenido no fundamentado o irrelevante (alucinaciones), por lo que un umbral alto es precisamente lo que se necesita para garantizar que las respuestas se ciñan a la guía financiera aprobada por la empresa.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-denied-topics.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-word-filters.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html",
    category: "Guardrails & Safety",
    multiSelect: true,
    requiredCount: 3
  },
  {
    id: 3,
    questionNumber: 3,
    question: "A company has deployed an AI assistant as a React application that uses AWS Amplify, an AWS AppSync GraphQL API, and Amazon Bedrock Knowledge Bases. The application uses the GraphQL API to call the Amazon Bedrock RetrieveAndGenerate API for knowledge base interactions. The company configures an AWS Lambda resolver to use the RequestResponse invocation type. Application users report frequent timeouts and slow response times. Users report these problems more frequently for complex questions that require longer processing. The company needs a solution to fix these performance issues and enhance the user experience. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Use AWS Amplify AI Kit to implement streaming responses from the GraphQL API and to optimize client-side rendering.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Increase the timeout value of the Lambda resolver. Implement retry logic with exponential backoff.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Update the application to send an API request to an Amazon SQS queue. Update the AWS AppSync resolver to poll and process the queue.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Change the RetrieveAndGenerate API to the InvokeModelWithResponseStream API. Update the application to use an Amazon API Gateway WebSocket API to support the streaming response.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): AWS Amplify AI Kit (parte de Amplify Gen 2, paquete @aws-amplify/ui-react-ai) está diseñado específicamente para aplicaciones React que consumen modelos de Amazon Bedrock a través de una API de AWS AppSync. Sus \"conversation routes\" utilizan las suscripciones GraphQL en tiempo real de AppSync (basadas en WebSocket) para entregar la respuesta del modelo de forma incremental (token a token) al cliente, en lugar de esperar a que el backend genere la respuesta completa. Esto resuelve directamente el problema descrito: el resolver Lambda invocado de forma síncrona (RequestResponse) puede seguir haciendo la llamada a RetrieveAndGenerate en segundo plano, pero el usuario empieza a ver contenido de inmediato gracias al streaming vía suscripción, eliminando la sensación de timeout/lentitud en preguntas complejas, sin necesidad de rediseñar la arquitectura AppSync/Amplify ya existente.\n\nOpción B: aumentar el valor de timeout del resolver Lambda y añadir reintentos con backoff exponencial no ataca la causa raíz del problema. El tipo de invocación RequestResponse (el valor por defecto en los resolvers Lambda de AppSync, según la documentación oficial) es síncrono: AppSync espera a que Lambda termine de ejecutarse y devuelva la respuesta completa antes de responder al cliente. Subir el timeout solo pospone el corte, y los reintentos con backoff pueden incluso duplicar llamadas costosas a RetrieveAndGenerate sin mejorar la experiencia percibida por el usuario, que sigue viendo una pantalla en blanco durante todo el procesamiento.\n\nOpción C: enviar la petición a una cola de Amazon SQS y hacer que el resolver de AppSync haga polling sobre la cola añade latencia adicional (por los intervalos de sondeo) y complejidad de orquestación, sin resolver el problema de fondo: la respuesta seguiría entregándose de una sola vez al finalizar todo el procesamiento, en lugar de mostrarse progresivamente. Además, esta arquitectura no está pensada para respuestas en tiempo real y requeriría un mecanismo adicional (por ejemplo, otra suscripción) para notificar al cliente, complejidad que Amplify AI Kit ya resuelve de forma nativa.\n\nOpción D: es cierto que InvokeModelWithResponseStream permite obtener una respuesta en streaming de un modelo fundacional en Amazon Bedrock, pero esa API invoca el modelo de forma directa y no incluye la lógica de recuperación (retrieval) contra la base de conocimiento que sí ofrece RetrieveAndGenerate. De hecho, Amazon Bedrock Knowledge Bases expone una API dedicada para este caso, RetrieveAndGenerateStream, que sí combina recuperación y generación en modo streaming; sustituirla por InvokeModelWithResponseStream obligaría a reimplementar manualmente la orquestación de recuperación y aumento de contexto (RAG) que hoy gestiona Bedrock. Además, esta opción exige reemplazar por completo la capa AppSync/GraphQL por una API WebSocket de Amazon API Gateway, lo que implica rediseñar toda la arquitectura del backend, un esfuerzo mucho mayor que aprovechar el soporte de streaming ya integrado en Amplify AI Kit sobre la pila AppSync existente.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_RetrieveAndGenerateStream.html\nhttps://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-lambda.html\nhttps://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_RetrieveAndGenerate.html",
    category: "Performance & Scaling",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 4,
    questionNumber: 4,
    question: "An ecommerce company operates a global product recommendation system that needs to switch between multiple foundation models (FM) in Amazon Bedrock based on regulations, cost optimization, and performance requirements. The company must apply custom controls based on proprietary business logic, including dynamic cost thresholds, AWS Region-specific compliance rules, and real-time A/B testing across multiple FMs. The system must be able to switch between FMs without deploying new code. The system must route user requests based on complex rules including user tier, transaction value, regulatory zone, and real-time cost metrics that change hourly and require immediate propagation across thousands of concurrent requests. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Deploy an AWS Lambda function that uses environment variables to store routing rules and Amazon Bedrock FM IDs. Use the Lambda console to update the environment variables when business requirements change. Configure an Amazon API Gateway REST API to read request parameters to make routing decisions.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Deploy Amazon API Gateway REST API request transformation templates to implement routing logic based on request attributes. Store Amazon Bedrock FM endpoints as REST API stage variables. Update the variables when the system switches between models.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Configure an AWS Lambda function to fetch routing configurations from the AWS AppConfig Agent for each user request. Run business logic in the Lambda function to select the appropriate FM for each request. Expose the FM through a single Amazon API Gateway REST API endpoint.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Use AWS Lambda authorizers for an Amazon API Gateway REST API to evaluate routing rules that are stored in AWS AppConfig. Return authorization contexts based on business logic. Route requests to model-specific Lambda functions for each Amazon Bedrock FM.",
        isCorrect: false
      }
    ],
    comments: "Opción A: almacenar las reglas de enrutamiento en variables de entorno de una función Lambda obliga a publicar una nueva versión de la función (o al menos una actualización de configuración) cada vez que cambian los umbrales de coste, las reglas de cumplimiento por región o los parámetros de las pruebas A/B. Esto no permite propagación inmediata a miles de solicitudes concurrentes ni una gestión centralizada de la configuración, y no está pensado para cambios que varían cada hora.\n\nOpción B: las variables de stage de Amazon API Gateway son un mecanismo de configuración estático pensado para valores que cambian con poca frecuencia (por ejemplo, el ARN de un backend). Actualizarlas requiere desplegar de nuevo la etapa de la API, y las plantillas de transformación de solicitudes (VTL) no están diseñadas para evaluar lógica de negocio compleja (nivel de usuario, valor de transacción, zona regulatoria, métricas de coste en tiempo real). No cumple el requisito de reglas dinámicas que cambian cada hora ni de lógica de negocio propietaria.\n\nOpción C (Correcta): AWS AppConfig (una capacidad de AWS Systems Manager) está diseñado precisamente para separar la configuración dinámica del código de la aplicación. El AWS AppConfig Agent Lambda extension se añade como una capa (layer) a la función Lambda y actúa como un proceso complementario: la función Lambda consulta la configuración a través de un endpoint HTTP local (localhost:2772), y la extensión mantiene una caché local de los datos de configuración, gestiona los tokens de sesión necesarios y comprueba periódicamente en segundo plano si hay actualizaciones en AWS AppConfig, actualizando la caché local cuando detecta cambios. Esto permite que la lógica de negocio (umbrales de coste, reglas de cumplimiento por región, asignación de tráfico para pruebas A/B, selección del FM de Amazon Bedrock) se ejecute dentro de la función Lambda leyendo una configuración que se puede actualizar sin desplegar código nuevo, con baja latencia añadida gracias a la caché local, y exponiendo un único endpoint de Amazon API Gateway hacia los clientes. Es la solución recomendada por AWS para exactamente este patrón: feature flags y datos de configuración dinámicos consumidos por Lambda sin necesidad de redepliegue.\n\nOpción D: usar autorizadores Lambda de API Gateway para evaluar las reglas de enrutamiento y devolver un contexto de autorización, enrutando después a una función Lambda distinta por cada FM de Bedrock, añade complejidad arquitectónica innecesaria (múltiples funciones Lambda que mantener y sincronizar) y mezcla responsabilidades de autorización con lógica de enrutamiento de negocio. No aporta ninguna ventaja frente a centralizar la lógica y la configuración dinámica (vía AppConfig) en una única función Lambda detrás de un solo endpoint.\n\nReferencias:\nhttps://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-integration-lambda-extensions.html\nhttps://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-integration-lambda-extensions-how-it-works.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 5,
    questionNumber: 5,
    question: "A company is developing an internal generative AI (GenAI) assistant that uses Amazon Bedrock to summarize corporate documents for multiple business units. The GenAI assistant must generate responses in a consistent format that includes a document summary, classification of business risks, and terms that are flagged for review. The GenAI assistant must adapt the tone of responses for each user's business unit, such as legal, human resources, or finance. The GenAI assistant must block hate speech, inappropriate topics, and sensitive information such as personal health information. The company needs a solution to centrally manage prompt variants across business units and teams. The company wants to minimize ongoing orchestration efforts and maintenance for post-processing logic. The company also wants to have the ability to adjust content moderation criteria for the GenAI assistant over time. Which solution will meet these requirements with the LEAST maintenance overhead?",
    choices: [
      {
        letter: "A",
        text: "Use Amazon Bedrock Prompt Management to configure reusable templates and business unit-specific prompt variants. Apply Amazon Bedrock guardrails that have category filters and sensitive term lists to block prohibited content.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Use Amazon Bedrock Prompt Management to define base templates. Enforce business unit-specific tone by using system prompt variables. Configure Amazon Bedrock guardrails to apply audience-based threshold tuning. Manage the guardrails by using an internal administration API.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use Amazon Bedrock with business unit-based instruction injection in API calls. Store response formatting rules in Amazon DynamoDB. Use AWS Step functions to validate responses. Use Amazon Comprehend to apply content filters after the GenAI assistant generates responses.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use Amazon Bedrock with custom prompt templates that are stored in Amazon DynamoDB. Create one AWS Lambda function to select business unit-specific prompts. Create a second Lambda function to call Amazon Comprehend to filter prohibited content from responses.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): Amazon Bedrock Prompt Management permite crear, guardar y reutilizar plantillas de prompt con variables y variantes (alternative configurations of a prompt) de forma nativa y versionada, lo que permite gestionar de forma centralizada las variantes específicas de cada unidad de negocio (tono legal, RR. HH., finanzas) sin construir infraestructura propia. Amazon Bedrock Guardrails complementa esto aportando content filters por categoría predefinida (Hate, Insults, Sexual, Violence, Misconduct, Prompt Attack) para bloquear odio y temas inapropiados, junto con word filters (listas de términos personalizados) y sensitive information filters (para PII, incluida información de salud). Todo esto se gestiona de forma totalmente administrada por AWS, sin necesidad de post-procesamiento propio, y los criterios de moderación se pueden ajustar en cualquier momento editando la configuración del guardrail, cumpliendo el requisito de mínimo mantenimiento.\n\nOpción B: aunque también usa Prompt Management (correcto para las plantillas), introduce una \"API de administración interna\" para gestionar los guardrails y un mecanismo de \"audience-based threshold tuning\" que no son funcionalidades nativas de Bedrock Guardrails documentadas; construir y mantener una API propia para administrar los guardrails añade justo la sobrecarga de mantenimiento que la empresa quiere evitar, cuando la consola/API de Guardrails ya permite ajustar fuerza de filtros y listas de términos de forma nativa.\n\nOpción C: inyectar instrucciones por unidad de negocio directamente en las llamadas a la API, almacenar reglas de formato en DynamoDB, validar respuestas con AWS Step Functions y filtrar contenido después de generarlo con Amazon Comprehend implica diseñar, orquestar y mantener una canalización de post-procesamiento completamente personalizada. Esto contradice explícitamente el objetivo de minimizar la orquestación y el mantenimiento de lógica de post-procesamiento, y Comprehend no ofrece los controles de denied topics, word filters o content filters por categoría que sí ofrece Guardrails de forma gestionada.\n\nOpción D: almacenar las plantillas en DynamoDB y usar dos funciones Lambda (una para seleccionar el prompt según la unidad de negocio y otra para invocar Amazon Comprehend y filtrar contenido prohibido) obliga a desarrollar y mantener manualmente capacidades que Prompt Management (gestión centralizada de plantillas/variantes) y Guardrails (moderación de contenido configurable) ya proporcionan como servicio gestionado, aumentando la superficie de código y el esfuerzo operativo continuo.\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html",
    category: "Guardrails & Safety",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 6,
    questionNumber: 6,
    question: "A financial services company is building a customer support application that retrieves relevant financial regulation documents from a database based on semantic similarities to user queries. The application must integrate with Amazon Bedrock to generate responses. The application must be able to search documents that are in English, Spanish, and Portuguese. The application must filter documents by metadata such as publication date, regulatory agency, and document type. The database stores approximately 10 million document embeddings. To minimize operational overhead, the company wants a solution that minimizes management and maintenance effort. The application must provide low-latency responses for real-time customer interactions. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Use Amazon OpenSearch Serverless to provide vector search capabilities and metadata filtering. Connect to Amazon Bedrock Knowledge Bases to enable Retrieval Augmented Generation (RAG) capabilities that use an Anthropic Claude foundation model (FM).",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Deploy an Amazon Aurora PostgreSQL database with the pgvector extension. Define tables to store embeddings and metadata. Use SQL queries to perform similarity searches. Send retrieved documents to Amazon Bedrock to generate responses.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use Amazon S3 Vectors to configure a vector index and non-filterable metadata fields. Integrate S3 Vectors with Amazon Bedrock to enable Retrieval Augmented Generation (RAG) capabilities.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Set up an Amazon Neptune Analytics graph database. Configure a vector index that has appropriate dimensionality to store document embeddings. Use Amazon Bedrock to perform graph-based retrieval and to generate responses.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): Amazon Bedrock Knowledge Bases es el servicio totalmente gestionado de AWS para implementar RAG: se encarga de trocear los documentos, generar los embeddings (con modelos que soportan múltiples idiomas, incluidos inglés, español y portugués), indexarlos en el almacén vectorial elegido y orquestar la recuperación más la generación con un modelo de Amazon Bedrock como Anthropic Claude. Al usar Amazon OpenSearch Serverless como almacén vectorial, AWS gestiona automáticamente el aprovisionamiento, el escalado y el mantenimiento de la infraestructura (sin servidores ni clústeres que administrar), lo que la hace idónea para una colección de ~10 millones de embeddings con baja latencia. Además, OpenSearch Serverless soporta filtrado por campos de metadatos (fecha de publicación, agencia reguladora, tipo de documento) de forma nativa dentro de la consulta vectorial, cumpliendo así todos los requisitos (búsqueda semántica multilingüe, filtrado por metadatos, baja latencia y mínimo esfuerzo operativo) con la combinación más directa y recomendada por AWS para este patrón.\n\nOpción B: Aurora PostgreSQL con la extensión pgvector es una opción válida técnicamente para almacenar embeddings y hacer búsquedas de similitud mediante SQL, y Bedrock Knowledge Bases también la soporta como almacén vectorial. Sin embargo, requiere que el cliente aprovisione y administre la instancia/clúster de base de datos (parcheo, escalado, alta disponibilidad), y para habilitar el filtrado por metadatos en Aurora es necesario crear y mantener manualmente columnas específicas para cada campo de metadatos, lo que añade carga operativa y de diseño de esquema frente a una opción serverless nativa. Esto contradice el requisito de minimizar el esfuerzo de gestión y mantenimiento.\n\nOpción C: Amazon S3 Vectors permite dos tipos de metadatos: \"filterable metadata\" (filtrable por defecto en toda consulta de similitud, salvo que se indique lo contrario) y \"non-filterable metadata\" (metadatos que se almacenan y se pueden devolver junto con los resultados, pero que explícitamente NO pueden usarse como filtro de la consulta, y una vez marcados como no filtrables no se pueden cambiar). La opción C describe configurar explícitamente los campos de metadatos como \"non-filterable\", lo cual impediría precisamente filtrar por fecha de publicación, agencia reguladora y tipo de documento, incumpliendo un requisito explícito del enunciado. Si se hubieran configurado como \"filterable\" (el comportamiento por defecto), S3 Vectors sí podría integrarse con Bedrock Knowledge Bases para RAG, pero tal como está planteada la opción no satisface el caso de uso.\n\nOpción D: Amazon Neptune Analytics puede usarse como almacén vectorial para Amazon Bedrock Knowledge Bases, principalmente en el patrón \"GraphRAG\", que combina embeddings vectoriales con relaciones de grafo entre entidades para mejorar la recuperación cuando existen conexiones semánticas complejas entre documentos. Para este caso de uso, que es una búsqueda semántica directa sobre grandes volúmenes de documentos con filtrado simple por metadatos (no relaciones entre entidades), configurar y mantener un grafo con Neptune Analytics añade una complejidad de modelado y operación innecesaria frente a un almacén vectorial serverless dedicado como OpenSearch Serverless.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-managed-test-config.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-setup.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-metadata-filtering.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 7,
    questionNumber: 7,
    question: "A medical company is building a generative AI (GenAI) application that uses RAG to provide evidence-based medical information. The application uses Amazon OpenSearch Service to retrieve vector embeddings. Users report that searches frequently miss results that contain exact medical terms and acronyms and return too many semantically similar but irrelevant documents. The company needs to improve retrieval quality and maintain low end user latency, even as the document collection grows to millions of documents. Which solution will meet these requirements with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Configure hybrid search by combining vector similarity with keyword matching to improve semantic understanding and exact term and acronym matching.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Increase the dimensions of the vector embeddings from 384 to 1536. Use a post-processing AWS Lambda function to filter out irrelevant results after retrieval.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Replace OpenSearch Service with Amazon Kendra. Use query expansion to handle medical acronyms and terminology variants during pre-processing.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Implement a two-stage retrieval architecture in which initial vector search results are re-ranked by an ML model that is hosted on Amazon SageMaker AI.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): la búsqueda híbrida (\"hybrid search\") en Amazon OpenSearch Service combina, dentro de una única consulta, la puntuación léxica basada en palabras clave (algoritmo BM25) con la puntuación semántica de la búsqueda vectorial (neural/k-NN), usando un pipeline de búsqueda que normaliza y combina ambos scores (por ejemplo con normalización min_max o l2 y combinación por media aritmética, geométrica o armónica). Esto permite capturar tanto el significado semántico de la consulta como coincidencias exactas de términos y acrónimos médicos (que la búsqueda puramente vectorial tiende a \"diluir\" semánticamente), sin necesidad de desplegar componentes adicionales, infraestructura nueva ni modelos extra: se configura mediante un search pipeline y una consulta de tipo \"hybrid\" sobre el mismo dominio/clúster de OpenSearch ya existente, por lo que escala igual de bien a millones de documentos y mantiene baja latencia con la mínima sobrecarga operativa.\n\nOpción B: aumentar la dimensionalidad de los embeddings (de 384 a 1536) no resuelve el problema de fondo, que es que la búsqueda puramente vectorial no realiza coincidencia léxica exacta de términos y acrónimos; embeddings de mayor dimensión pueden incluso aumentar el coste de cómputo y almacenamiento sin garantizar mejor recall de términos exactos. Además, añadir una función AWS Lambda de post-procesamiento para filtrar resultados introduce latencia adicional en el camino crítico de la consulta y un componente nuevo que hay que desarrollar, desplegar y mantener, lo que incrementa la sobrecarga operativa en vez de reducirla.\n\nOpción C: sustituir Amazon OpenSearch Service por Amazon Kendra implica migrar toda la arquitectura de recuperación (reindexar el contenido, adaptar la integración con la aplicación RAG, revisar costes y límites del nuevo servicio) en lugar de simplemente activar una capacidad de búsqueda híbrida ya disponible en el motor que la empresa ya opera. Aunque Kendra ofrece expansión de consultas y comprensión de lenguaje natural, el cambio de servicio completo supone un esfuerzo de migración y una carga operativa muy superiores a la alternativa de la opción A.\n\nOpción D: implementar una arquitectura de recuperación en dos etapas, donde los resultados iniciales de la búsqueda vectorial se re-ordenan (\"re-rank\") mediante un modelo alojado en un endpoint de Amazon SageMaker AI, añade una etapa de inferencia adicional y un endpoint que hay que aprovisionar, escalar, monitorizar y mantener. Esto incrementa tanto la latencia extremo a extremo (una llamada de inferencia adicional por consulta) como la complejidad y el coste operativo, frente a la solución nativa de búsqueda híbrida de OpenSearch que resuelve el mismo problema de relevancia dentro del propio motor de búsqueda.\n\nReferencias:\n- https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-configure-neural-search.html\n- https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-solr-opensearch/operational-architecture.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 8,
    questionNumber: 8,
    question: "A company runs a generative AI (GenAI)-powered summarization application in an application AWS account that uses Amazon Bedrock. The application architecture includes an Amazon API Gateway REST API that forwards requests to AWS Lambda functions that are attached to private VPC subnets. The application summarizes sensitive customer records that the company stores in a governed data lake in a centralized data storage account. The company has enabled Amazon S3, Amazon Athena, and AWS Glue in the data storage account. The company must ensure that calls that the application makes to Amazon Bedrock use only private connectivity between the company's application VPC and Amazon Bedrock. The company's data lake must provide fine-grained column-level access across the company's AWS accounts. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "In the application account, create interface VPC endpoints for Amazon Bedrock runtimes. Run Lambda functions in private subnets. Use IAM conditions on inference and data-plane policies to allow calls only to approved endpoints and roles. In the data storage account, use AWS Lake Formation LF-tag-based access control to create table and column-level cross-account grants.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Run Lambda functions in private subnets. Configure a NAT gateway to provide access to Amazon Bedrock and the data lake. Use S3 bucket policies and ACLs to manage permissions. Export AWS CloudTrail logs to Amazon S3 to perform weekly reviews.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Create a gateway endpoint only for Amazon S3 in the application account. Invoke Amazon Bedrock through public endpoints. Use database-level grants in AWS Lake Formation to manage data access. Stream AWS CloudTrail logs to Amazon CloudWatch Logs. Do not set up metric filters or alarms.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use VPC endpoints to provide access to Amazon Bedrock and Amazon S3 in the application account. Use only IAM path-based policies to manage data lake access. Send AWS CloudTrail logs to Amazon CloudWatch Logs. Periodically create dashboards and allow public fallback for cross-Region reads to reduce setup time.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): Los interface VPC endpoints de Amazon Bedrock, basados en AWS PrivateLink, permiten crear una conexión privada entre la VPC de la aplicación y Amazon Bedrock sin necesidad de gateway de Internet, dispositivo NAT, VPN ni Direct Connect; las instancias/funciones Lambda en la VPC no necesitan direcciones IP públicas para acceder al servicio, y AWS documenta endpoints específicos para el plano de control (bedrock) y el plano de datos/runtime (bedrock-runtime), entre otros. Añadir condiciones IAM en las políticas de los endpoints e inferencia (por ejemplo restringiendo por aws:sourceVpce o por rol) permite limitar las llamadas solo a los endpoints y roles aprobados, cumpliendo el requisito de conectividad exclusivamente privada. En la cuenta de almacenamiento de datos, AWS Lake Formation con tag-based access control (LF-TBAC) permite crear LF-Tags y asignarlas a bases de datos, tablas y columnas del Data Catalog, y luego conceder permisos a cuentas externas (cross-account) basados en esas etiquetas, lo que proporciona el control de acceso detallado a nivel de columna que exige el escenario, sin necesidad de crear un grant independiente por cada combinación de principal y recurso.\n\nOpción B: Un NAT gateway únicamente traduce direcciones para tráfico saliente hacia Internet; enviar las llamadas a Amazon Bedrock y al data lake a través de un NAT gateway implica que el tráfico sale por Internet en lugar de mantenerse dentro de la red privada de AWS, lo que incumple el requisito de conectividad exclusivamente privada. Además, los bucket policies y las ACL de S3 solo controlan el acceso a nivel de objeto/bucket, no ofrecen el control de acceso a nivel de columna que se necesita, y una revisión semanal de CloudTrail es un control detectivo, no preventivo.\n\nOpción C: Invocar Amazon Bedrock a través de endpoints públicos contradice directamente el requisito de que las llamadas usen solo conectividad privada entre la VPC y Bedrock, incluso si se crea un gateway endpoint de S3 (que de por sí solo cubre S3, no Bedrock). Los permisos a nivel de base de datos en AWS Lake Formation son demasiado amplios: no permiten restringir el acceso a columnas específicas, que es justamente lo que exige el enunciado. Tampoco configurar métricas ni alarmas deja sin visibilidad operativa proactiva.\n\nOpción D: Aunque se usen VPC endpoints para Bedrock y S3 en la cuenta de la aplicación, apoyarse únicamente en políticas IAM basadas en rutas (path-based) para gestionar el acceso al data lake no proporciona el control de acceso a nivel de columna que ofrece Lake Formation mediante LF-Tags; las políticas IAM basadas en recursos de S3 no distinguen entre columnas de una tabla en Athena/Glue. Además, permitir un \"fallback\" público para lecturas entre regiones anula el requisito de conectividad exclusivamente privada al introducir una ruta pública.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html\nhttps://docs.aws.amazon.com/lake-formation/latest/dg/cross-account-TBAC.html\nhttps://docs.aws.amazon.com/lake-formation/latest/dg/TBAC-granting-tags.html",
    category: "Security & Governance",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 9,
    questionNumber: 9,
    question: "A media company must use Amazon Bedrock to implement a robust governance process for AI-generated content. The company needs to manage hundreds of prompt templates. Multiple teams use the templates across multiple AWS Regions to generate content. The solution must provide version control with approval workflows that include notifications for pending reviews. The solution must also provide detailed audit trails that document prompt activities and consistent prompt parameterization to enforce quality standards. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Configure Amazon Bedrock Studio prompt templates. Use Amazon CloudWatch to create dashboards that display prompt usage metrics. Store the approval status of content in Amazon DynamoDB. Use AWS Lambda functions to enforce approvals.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use Amazon Bedrock Prompt Management to implement version control. Configure AWS CloudTrail for audit logging. Use IAM policies to control approval permissions. Create parameterized prompt templates by specifying variables.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Use AWS Step Functions to create an approval workflow. Store prompts as documents in Amazon S3. Use tags to implement version control. Use Amazon EventBridge to send notifications.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Deploy Amazon SageMaker Canvas with prompt templates that are stored in Amazon S3. Use AWS CloudFormation to implement version control. Use AWS Config to enforce approval policies.",
        isCorrect: false
      }
    ],
    comments: "Opción A: Amazon Bedrock Studio (actualmente integrado en Amazon SageMaker Unified Studio) está pensado para colaborar en la construcción de aplicaciones de IA generativa, no para gestionar el ciclo de vida de plantillas de prompts a escala empresarial. Usar CloudWatch solo aporta métricas de uso, no versionado; y almacenar el estado de aprobación en DynamoDB con funciones Lambda para \"forzarlo\" implica diseñar y mantener un sistema de aprobación totalmente a medida, sin apoyarse en ninguna capacidad nativa de Bedrock para prompts.\n\nOpción B (Correcta): Amazon Bedrock Prompt Management permite crear, editar y guardar prompts reutilizables, incluir variables (placeholders del tipo {{variable}}) para parametrizar las plantillas y adaptarlas a distintos casos de uso, y crear versiones inmutables de cada prompt (con capacidad de comparar versiones y desplegar una versión concreta en producción), lo que cubre el requisito de parametrización consistente y control de versiones a través de múltiples equipos y Regiones. El acceso a las operaciones de Prompt Management (crear, modificar, ver, eliminar prompts y versiones) se controla mediante políticas de IAM basadas en identidad, lo que permite restringir quién puede crear o publicar una versión, aproximando un control de permisos de aprobación. Además, AWS CloudTrail registra automáticamente como eventos de gestión las llamadas a la API de Bedrock (incluidas las de Prompt Management, como CreatePrompt, CreatePromptVersion, UpdatePrompt, etc.), proporcionando el rastro de auditoría detallado que exige el enunciado. Es la combinación de servicios nativos que mejor cubre los requisitos sin necesidad de desarrollo adicional significativo, aunque cabe matizar que el propio Prompt Management no incluye una funcionalidad nativa de \"notificaciones automáticas de revisión pendiente\" tipo flujo de aprobación; ese aspecto concreto se cubriría apoyándose en el control de permisos de IAM (p. ej., que solo un rol de \"aprobador\" pueda crear una nueva versión) más que en una notificación push nativa del servicio.\n\nOpción C: Construir el flujo con AWS Step Functions, almacenar los prompts como documentos en Amazon S3, usar etiquetas para emular versionado y Amazon EventBridge para notificaciones sí cubriría el requisito de notificaciones de forma más directa que Prompt Management, pero obliga a reconstruir desde cero toda la capa de versionado, parametrización y trazabilidad de prompts que Bedrock Prompt Management ya ofrece de manera nativa e integrada con el resto de Bedrock (modelos, flows, etc.); además, usar etiquetas de S3 como mecanismo de versionado es frágil y no proporciona un historial de versiones inmutable ni comparación entre versiones como sí hace Prompt Management.\n\nOpción D: Amazon SageMaker Canvas es una herramienta de no-code orientada a la creación y uso de modelos de machine learning (predicción, clasificación, etc.), no a la gestión de plantillas de prompts de Amazon Bedrock. Usar AWS CloudFormation para \"versionar\" y AWS Config para \"aprobar\" tampoco corresponde al propósito de esos servicios: CloudFormation gestiona el ciclo de vida de infraestructura como código y AWS Config evalúa el cumplimiento de configuración de recursos, ninguno de los dos está diseñado para flujos de aprobación de contenido generado o de plantillas de prompts.\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-prereq.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html",
    category: "Security & Governance",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 10,
    questionNumber: 10,
    question: "A company is developing a customer support application that uses Amazon Bedrock foundation models (FMs) to provide real-time AI assistance to the company's employees. The application must display AI-generated responses character by character as the responses are generated. The application needs to support thousands of concurrent users with minimal latency. The responses typically take 15 to 45 seconds to finish. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Configure an Amazon API Gateway WebSocket API with an AWS Lambda integration. Configure the WebSocket API to invoke the Amazon Bedrock InvokeModelWithResponseStream API and stream partial responses through WebSocket connections.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Configure an Amazon API Gateway REST API with an AWS Lambda integration. Configure the REST API to invoke the Amazon Bedrock standard InvokeModel API and implement frontend client-side polling every 100 ms for complete response chunks.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Implement direct frontend client connections to Amazon Bedrock by using IAM user credentials and the InvokeModelWithResponseStream API without any intermediate gateway or proxy layer.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Configure an Amazon API Gateway HTTP API with an AWS Lambda integration. Configure the HTTP API to cache complete responses in an Amazon DynamoDB table and serve the responses through multiple paginated GET requests to frontend clients.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): Amazon API Gateway ofrece un tipo de API WebSocket que mantiene una conexión persistente y bidireccional entre el cliente y el backend, a diferencia de las APIs REST/HTTP basadas en solicitud-respuesta única. Al integrar esta WebSocket API con una función AWS Lambda que invoca la operación InvokeModelWithResponseStream de Amazon Bedrock Runtime, el modelo fundacional devuelve la respuesta en fragmentos (chunks) a medida que se van generando, en lugar de esperar a la respuesta completa. La función Lambda puede reenviar cada fragmento al cliente a través de la conexión WebSocket (por ejemplo, usando la API de administración de conexiones de API Gateway para \"postear\" a la conexión activa), logrando así el efecto de texto apareciendo carácter a carácter. Este patrón es el recomendado por AWS para aplicaciones de chat e IA generativa en tiempo real, ya que las conexiones WebSocket son ligeras, permiten miles de conexiones concurrentes y ofrecen baja latencia percibida incluso cuando la generación completa de la respuesta tarda entre 15 y 45 segundos, porque el usuario empieza a ver contenido casi de inmediato en vez de esperar el resultado final.\n\nOpción B: una REST API de API Gateway con InvokeModel (la versión no-streaming) debe esperar a que Bedrock genere la respuesta completa antes de devolver cualquier dato, por lo que no existe forma de mostrar texto incrementalmente. Además, implementar polling desde el cliente cada 100 ms multiplica innecesariamente el número de solicitudes (miles de usuarios concurrentes generarían una carga masiva e ineficiente sobre la API y el backend), y sigue sin resolver el problema de fondo: no hay fragmentos parciales que consultar hasta que el modelo termine, por lo que el polling no logra el efecto de streaming real solicitado.\n\nOpción C: conectar el frontend directamente a Amazon Bedrock usando credenciales de usuario IAM, sin ninguna capa intermedia (gateway o proxy), es una práctica de seguridad desaconsejada por AWS, ya que expondría credenciales de larga duración en el cliente (navegador/app), con el riesgo de robo o uso indebido. Los patrones de referencia de AWS recomiendan siempre pasar por un backend (Lambda, contenedor, etc.) con credenciales temporales o roles de IAM, nunca invocar servicios de AWS directamente desde el frontend con credenciales de usuario.\n\nOpción D: cachear la respuesta completa en una tabla de Amazon DynamoDB y exponerla mediante múltiples solicitudes GET paginadas no constituye streaming en tiempo real: la respuesta debe generarse y almacenarse por completo en DynamoDB antes de que el cliente pueda empezar a consultarla, lo que anula el requisito de mostrar el texto a medida que se genera. Además, añade latencia y complejidad adicional (escritura en DynamoDB y múltiples solicitudes HTTP de lectura) sin ningún beneficio frente al streaming nativo que ofrece InvokeModelWithResponseStream.\n\nReferencias:\n- https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html\n- https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html\n- https://docs.aws.amazon.com/solutions/latest/generative-ai-application-builder-on-aws/chat-use-case-1.html",
    category: "Performance & Scaling",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 11,
    questionNumber: 11,
    question: "A company is using Amazon Bedrock to design an application to help researchers apply for grants. The application is based on an Amazon Nova Pro foundation model (FM). The application contains four required inputs and must provide responses in a consistent text format. The company wants to receive a notification in Amazon Bedrock if a response contains bullying language. However, the company does not want to block all flagged responses. The company creates an Amazon Bedrock flow that takes an input prompt and sends it to the Amazon Nova Pro FM. The Amazon Nova Pro FM provides a response. Which additional steps must the company take to meet these requirements? (Choose two.)",
    choices: [
      {
        letter: "A",
        text: "Use Amazon Bedrock Prompt Management to specify the required inputs as variables. Select an Amazon Nova Pro FM. Specify the output format for the response. Add the prompt to the prompts node of the flow.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Create an Amazon Bedrock guardrail that applies the hate content filter. Set the filter response to block. Add the guardrail to the prompts node of the flow.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Create an Amazon Bedrock prompt router. Specify an Amazon Nova Pro FM. Add the required inputs as variables to the input node of the flow. Add the prompt router to the prompts node. Add the output format to the output node.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Create an Amazon Bedrock guardrail that applies the insults content filter. Set the filter response to detect. Add the guardrail to the prompts node of the flow.",
        isCorrect: true
      },
      {
        letter: "E",
        text: "Create an Amazon Bedrock application inference profile that specifies an Amazon Nova Pro FM. Specify the output format for the response in the description. Include a tag for each of the input variables. Add the profile to the prompts node of the flow.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): Amazon Bedrock Prompt Management permite crear un prompt reutilizable en el que las cuatro entradas requeridas se definen como \"variables\" (placeholders que se rellenan al invocar el modelo), se selecciona el FM de Amazon Nova Pro y se especifica el formato de salida deseado en las instrucciones del prompt para obtener respuestas consistentes. Ese prompt gestionado se añade después al nodo de prompts (\"Prompt node\") del flujo de Amazon Bedrock, tal como describe la documentación de Prompt Management y de los nodos de flujo.\n\nOpción B: el filtro de contenido \"Hate\" (odio) de Amazon Bedrock Guardrails cubre contenido que discrimina, insulta o deshumaniza a una persona o grupo por motivos de identidad (raza, género, religión, etc.), no el lenguaje de acoso o bullying en general, por lo que no es la categoría adecuada. Además, configurar la acción de filtrado en \"Block\" bloquearía automáticamente cualquier respuesta marcada, lo que contradice el requisito explícito de la empresa de no bloquear todas las respuestas señaladas.\n\nOpción C: un \"prompt router\" de Amazon Bedrock (enrutamiento inteligente de prompts) es un mecanismo que dirige dinámicamente cada solicitud hacia distintos modelos fundacionales dentro de la misma familia según criterios de rendimiento y coste, con un modelo de reserva (\"fallback\") configurado; no sirve para declarar variables de entrada de un prompt ni para fijar el formato de la respuesta, por lo que no cumple lo que pide el enunciado.\n\nOpción D (Correcta): dentro de las categorías de content filters de Amazon Bedrock Guardrails, \"Insults\" se define explícitamente como lenguaje humillante, burlón o denigrante, y la propia documentación aclara que \"este tipo de lenguaje también se etiqueta como bullying\". Al configurar la acción de la guardrail como \"Detect (no action)\" en lugar de \"Block\", el guardrail identifica y registra el contenido dañino (permitiendo su seguimiento/alerta) pero deja pasar la respuesta al usuario sin bloquearla, que es exactamente lo que la empresa necesita. Esta guardrail se asocia al nodo de prompts del flujo.\n\nOpción E: un \"application inference profile\" de Amazon Bedrock es un recurso pensado para el seguimiento y la atribución de costes (permite asignar etiquetas de asignación de costes personalizadas a las invocaciones de un modelo concreto), no para definir variables de entrada de un prompt ni para especificar el formato de la respuesta del modelo, por lo que no resuelve el requisito planteado.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-content-filters.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html",
    category: "Guardrails & Safety",
    multiSelect: true,
    requiredCount: 2
  },
  {
    id: 12,
    questionNumber: 12,
    question: "A healthcare company is using Amazon Bedrock to build a Retrieval Augmented Generation (RAG) application that helps practitioners make clinical decisions. The application must achieve high accuracy for patient information retrievals, identify hallucinations in generated content, and reduce human review costs. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Use Amazon Comprehend to analyze and classify RAG responses and to extract medical entities and relationships. Use AWS Step Functions to orchestrate automated evaluations. Configure Amazon CloudWatch metrics to track entity recognition confidence scores. Configure CloudWatch to send an alert when accuracy falls below specified thresholds.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Implement automated large language model (LLM)-based evaluations that use a specialized model that is fine-tuned for medical content to assess all responses. Deploy AWS Lambda functions to parallelize evaluations. Publish results to Amazon CloudWatch metrics that track relevance and factual accuracy.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Configure Amazon CloudWatch Synthetics to generate test queries that have known answers on a regular schedule, and track model success rates. Set up dashboards that compare synthetic test results against expected outcomes.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Deploy a hybrid evaluation system that uses an automated LLM-as-a-judge evaluation to initially screen responses and targeted human reviews for edge cases. Use Amazon SageMaker Feature Store to maintain evaluation datasets. Use a built-in Amazon Bedrock evaluation to track retrieval precision and hallucination rates.",
        isCorrect: true
      }
    ],
    comments: "Opción A: Amazon Comprehend está orientado a tareas de PLN como extracción de entidades médicas, clasificación de texto y análisis de sentimiento, pero no está diseñado para evaluar la fidelidad de una respuesta generada por un LLM frente al contenido recuperado. Una puntuación de confianza en el reconocimiento de entidades mide la certeza del modelo de NER, no si la respuesta del sistema RAG contiene alucinaciones o si la información recuperada es precisa respecto a la consulta clínica.\n\nOpción B: someter el 100% de las respuestas únicamente a un LLM evaluador especializado, sin ningún mecanismo de revisión humana para los casos límite o de alto riesgo, no resuelve el requisito de \"reducir los costes de revisión humana\" de forma responsable en un dominio clínico: en ausencia de una capa de revisión humana dirigida, cualquier error sistemático del LLM evaluador (por ejemplo, en escenarios ambiguos o poco frecuentes) pasaría sin control adicional, lo cual es inaceptable cuando las respuestas apoyan decisiones clínicas.\n\nOpción C: Amazon CloudWatch Synthetics ejecuta \"canarios\" (scripts programados) pensados para monitorizar la disponibilidad y el rendimiento de endpoints y flujos de usuario (por ejemplo, tiempos de respuesta de una API), no para evaluar la calidad semántica, la precisión factual o la presencia de alucinaciones en respuestas de texto abierto generadas por un sistema RAG. Comparar resultados frente a \"respuestas conocidas\" de forma programada no captura matices de lenguaje natural ni fidelidad al contexto recuperado.\n\nOpción D (Correcta): Amazon Bedrock ofrece evaluaciones nativas (Bedrock Evaluations) que incluyen evaluaciones automáticas mediante \"LLM-as-a-judge\" (un segundo modelo actúa como juez, puntuando las respuestas y aportando una explicación), evaluaciones con trabajadores humanos, y evaluaciones específicas de RAG con métricas integradas. Para trabajos de evaluación RAG de tipo \"retrieve-only\" existen métricas como Context Relevance y Context Coverage, que miden precisión y cobertura de la recuperación; para trabajos \"retrieve-and-generate\" existe la métrica Faithfulness, que mide explícitamente \"qué tan bien las respuestas evitan la alucinación con respecto a los textos recuperados\". Un diseño híbrido que use el LLM-as-a-judge para cribar automáticamente el grueso de las respuestas y reserve la revisión humana solo para los casos límite reduce sustancialmente el coste de revisión manual sin sacrificar la fiabilidad, mientras que las métricas nativas de Bedrock permiten cuantificar de forma continua la precisión de recuperación y la tasa de alucinaciones, cumpliendo los tres requisitos del enunciado (alta precisión en la recuperación, detección de alucinaciones y reducción de costes de revisión humana).\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation-metrics.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html",
    category: "Monitoring & Evaluation",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 13,
    questionNumber: 13,
    question: "Company configures a landing zone in AWS Control Tower. The company handles sensitive data that must remain within the European Union. The company must use only the eu-central-1 Region. The company uses SCPs to enforce data residency policies. GenAI developers at the company are assigned IAM roles that have full permissions for Amazon Bedrock. The company must ensure that GenAI developers can use the Amazon Nova Pro model through Amazon Bedrock only by using cross-Region inference (CRI) and only in eu-central-1. The company enables model access for the GenAI developer IAM roles in Amazon Bedrock. However, when a GenAI developer attempts to invoke the model through the Amazon Bedrock Chat/Text playground, the GenAI developer receives the following error. User: arn:aws:sts::123456789012:assumed-role/AssumedDevRole/DevUserName Action: bedrock:InvokeModelWithResponseStream On resource(s): arn:aws:bedrock:eu-west-3::foundation-model/amazon.nova-pro-v1:0 Context: a service control policy explicitly denies the action The company needs a solution to resolve the error. The solution must retain the company's existing governance controls and must provide precise access control. The solution must comply with the company's existing data residency policies. Which combination of solutions will meet these requirements? (Choose two.)",
    choices: [
      {
        letter: "A",
        text: "Add an AdministratorAccess policy to the GenAI developer IAM role.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Extend the existing SCPs to enable CRI for the eu.amazon.nova-pro-v1:0 inference profile.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Enable Amazon Bedrock model access for Amazon Nova Pro in the eu-west-3 Region.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Validate that the GenAI developer IAM roles have permissions to invoke Amazon Nova Pro through the eu.amazon.nova-pro.v1:0 inference profile on all European Union AWS Regions that can serve the model.",
        isCorrect: true
      },
      {
        letter: "E",
        text: "Extend the existing SCP to enable CRI for the eu.* inference profile.",
        isCorrect: false
      }
    ],
    comments: "Opción A: otorgar la política AdministratorAccess al rol de IAM del desarrollador elimina cualquier control de acceso granular y viola el requisito de la empresa de mantener un control de acceso preciso (\"least privilege\"). Además no resuelve la causa raíz del error, que es una denegación explícita a nivel de SCP, no una carencia de permisos IAM.\n\nOpción B (Correcta): el error \"a service control policy explicitly denies the action\" indica que la SCP de la organización está bloqueando el acceso a regiones de la UE distintas de eu-central-1 (en este caso eu-west-3). El inference profile geográfico \"eu.amazon.nova-pro-v1:0\" (Geographic cross-Region inference) enruta las solicitudes entre varias regiones de destino dentro de la UE (por ejemplo eu-central-1, eu-west-1, eu-west-3, eu-north-1, según disponibilidad del modelo), no solo eu-central-1. Según la documentación oficial de AWS sobre los requisitos de SCP para Geographic cross-Region inference, si la SCP restringe el acceso únicamente a eu-central-1, la inferencia cross-Region fallará al intentar enrutar a las demás regiones de destino del perfil. Por tanto, la solución correcta es ampliar la SCP existente para permitir explícitamente el perfil de inferencia \"eu.amazon.nova-pro-v1:0\" (y las regiones de destino que dicho perfil utiliza), lo cual sigue cumpliendo la política de residencia de datos porque todas esas regiones de destino permanecen dentro de la UE, y mantiene un control preciso al autorizar un perfil concreto en lugar de un acceso amplio.\n\nOpción C: habilitar el acceso al modelo Amazon Nova Pro en eu-west-3 no soluciona el problema. El error no se origina por falta de \"model access\" habilitado en Bedrock, sino por una denegación explícita de la SCP sobre la acción \"bedrock:InvokeModelWithResponseStream\" en ese recurso regional; mientras la SCP siga bloqueando esa región de destino del perfil geográfico, la inferencia seguirá fallando independientemente de si el acceso al modelo está habilitado.\n\nOpción D (Correcta): según la documentación oficial de AWS sobre los requisitos de política de IAM para Geographic cross-Region inference, para invocar un modelo mediante un perfil de inferencia geográfico es necesario conceder permisos de invocación (por ejemplo \"bedrock:InvokeModel\"/\"bedrock:InvokeModelWithResponseStream\") tanto sobre el ARN del propio inference profile como sobre el ARN del foundation model subyacente en la región de origen y en todas las regiones de destino que ese perfil pueda utilizar (puede reforzarse con la condición \"bedrock:InferenceProfileArn\" para mayor precisión). Por ello, hay que validar que los roles de IAM de los desarrolladores GenAI tengan permiso de invocación sobre \"amazon.nova-pro-v1:0\" en todas las regiones de la UE que el perfil \"eu.amazon.nova-pro-v1:0\" pueda usar como destino, no solo en eu-central-1.\n\nOpción E: ampliar la SCP para permitir de forma genérica cualquier perfil con prefijo \"eu.*\" es una autorización excesivamente amplia. Permitiría el uso de cualquier modelo con inference profile geográfico de la UE (no solo Nova Pro), lo que contradice el requisito de la empresa de un control de acceso preciso; la solución correcta es autorizar específicamente el perfil \"eu.amazon.nova-pro-v1:0\".\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/geographic-cross-region-inference.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/model-card-amazon-nova-pro.html",
    category: "Security & Governance",
    multiSelect: true,
    requiredCount: 2
  },
  {
    id: 14,
    questionNumber: 14,
    question: "A financial services company is developing a customer service AI assistant by using Amazon Bedrock. The AI assistant must not discuss investment advice with users. The AI assistant must block harmful content, mask personally identifiable information (PII), and maintain audit trails for compliance reporting. The AI assistant must apply content filtering to both user inputs and model responses based on content sensitivity. The company requires an Amazon Bedrock guardrail configuration that will effectively enforce policies with minimal false positives. The solution must provide multiple handling strategies for multiple types of sensitive content. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Configure a single guardrail and set content filters to high for all categories. Set up denied topics for investment advice and include sample phrases to block. Set up sensitive information filters that apply the block action for all PII entities. Apply the guardrail to all model inference calls.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Configure multiple guardrails by using tiered policies. Create one guardrail and set content filters to high. Configure the guardrail to block PII for public interactions. Configure a second guardrail and set content filters to medium. Configure the second guardrail to mask PII for internal use. Configure multiple topic-specific guardrails to block investment advice and set up contextual grounding checks.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Configure a guardrail and set content filters to medium for harmful content. Set up denied topics for investment advice and include clear definitions and sample phrases to block. Configure sensitive information filters to mask PII in responses and to block financial information in inputs. Enable both input and output evaluations that use custom blocked messages for audits.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Create a separate guardrail for each use case. Create one guardrail that applies a harmful content filter. Create a guardrail to apply topic filters for investment advice. Create a guardrail to apply sensitive information filters to block PII. Use AWS Step Functions to chain the guardrails together sequentially. Use conditional logic based on content classification.",
        isCorrect: false
      }
    ],
    comments: "Opción A: fijar los content filters al nivel \"High\" para todas las categorías representa la configuración más estricta posible: según la documentación de Amazon Bedrock Guardrails, con el nivel \"High\" se bloquea contenido clasificado con confianza HIGH, MEDIUM y LOW, dejando pasar únicamente el contenido con confianza NONE. Esto maximiza la tasa de falsos positivos, contradiciendo el requisito explícito del enunciado de minimizarlos. Además, bloquear (en vez de enmascarar) toda la PII no ofrece múltiples estrategias de tratamiento según el tipo de contenido.\n\nOpción B: usar varias guardrails organizadas por niveles (\"tiered\") multiplica la complejidad operativa (crear, versionar, mantener y aplicar correctamente cada guardrail según el contexto de la interacción) cuando Amazon Bedrock Guardrails permite combinar filtros de contenido, temas denegados, filtros de información sensible y comprobaciones de fundamentación contextual (contextual grounding) dentro de una única guardrail. No aporta ninguna ventaja funcional frente a una sola guardrail bien configurada y añade puntos de fallo en la gestión.\n\nOpción C (Correcta): configurar los content filters en nivel \"Medium\" para contenido dañino es la opción intermedia entre minimizar contenido dañino y minimizar falsos positivos: según la documentación oficial, con \"Medium\" se bloquea el contenido clasificado como dañino con confianza HIGH y MEDIUM, mientras que el contenido con confianza NONE o LOW se permite; esto reduce los falsos positivos frente al nivel \"High\" (que también bloquea confianza LOW) sin dejar de filtrar contenido claramente dañino. Los denied topics, al incluir un nombre, una definición precisa (hasta 200 caracteres) y hasta cinco frases de ejemplo, permiten a la guardrail detectar semánticamente conversaciones sobre asesoramiento de inversión con mayor precisión (AWS recomienda definiciones claras y sin ambigüedad para mejorar la exactitud de la detección). Los sensitive information filters de Amazon Bedrock Guardrails admiten configurar acciones distintas para PII: la API/CloudFormation expone tanto una acción general (Action: BLOCK/ANONYMIZE/NONE) como acciones específicas por dirección del tráfico (InputAction y OutputAction), lo que permite exactamente el patrón descrito en la opción: enmascarar (ANONYMIZE) la PII en las respuestas del modelo y bloquear (BLOCK) información financiera sensible en las entradas del usuario, aplicando distintas estrategias de manejo para distintos tipos y direcciones de contenido sensible dentro de la misma guardrail. Finalmente, habilitar la evaluación tanto de input como de output con mensajes de bloqueo personalizados (blocked messaging) proporciona la trazabilidad necesaria para los informes de cumplimiento y auditoría. Todo esto se logra con una única guardrail, cumpliendo el requisito de una solución que aplique políticas eficazmente con mínimos falsos positivos y múltiples estrategias de tratamiento.\n\nOpción D: crear una guardrail separada por cada tipo de control (contenido dañino, temas denegados, información sensible) y orquestarlas secuencialmente con AWS Step Functions y lógica condicional introduce una complejidad de orquestación innecesaria. Amazon Bedrock Guardrails está diseñado para que todas estas políticas (content filters, denied topics, sensitive information filters, contextual grounding, word filters) se configuren y apliquen conjuntamente dentro de un único recurso de guardrail en cada llamada de inferencia, sin necesidad de servicios adicionales de orquestación.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-content-filters-overview.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-denied-topics.html\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-bedrock-guardrail-piientityconfig.html",
    category: "Guardrails & Safety",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 15,
    questionNumber: 15,
    question: "An ecommerce company is developing a generative AI (GenAI) solution that uses Amazon Bedrock with Anthropic Claude to recommend products to customers. Customers report that some of the recommended products are not available for sale on the website or are not relevant to the customer. Customers also report that the solutions takes a long time to generate some recommendations. The company investigates the issues and finds that most interactions between customers and the product recommendation solution are unique. The company confirms that the solutions recommends products that are not in the company's product catalog. The company must resolve these issues. Which solution will meet this requirement?",
    choices: [
      {
        letter: "A",
        text: "Increase grounding within Amazon Bedrock Guardrails. Enable Automated Reasoning checks. Set up provisioned throughput.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use prompt engineering to restrict the model responses to relevant products. Use streaming techniques such as the InvokeModelWithResponseStream action to reduce perceived latency for the customers.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Create an Amazon Bedrock knowledge base. Implement Retrieval Augmented Generation (RAG). Set the PerformanceConfigLatency parameter to optimized.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Store product catalog data in Amazon OpenSearch Service. Validate the model's product recommendations against the product catalog. Use Amazon DynamoDB to implement response caching.",
        isCorrect: false
      }
    ],
    comments: "Opción A: aumentar el \"grounding\" en Amazon Bedrock Guardrails y habilitar Automated Reasoning checks sirve para verificar afirmaciones lógicas o matemáticas frente a reglas formales definidas por el usuario, pero no ancla las recomendaciones en el catálogo real de productos, por lo que el modelo podría seguir sugiriendo artículos inexistentes; además, configurar Provisioned Throughput solo garantiza capacidad de inferencia reservada a un costo fijo, pero no ataca la causa raíz de la lentitud si el problema es la complejidad del prompt o la falta de recuperación eficiente de datos. Esta opción no resuelve ninguno de los dos problemas de forma directa.\n\nOpción B: la ingeniería de prompts por sí sola no garantiza que el modelo se limite estrictamente al catálogo real, ya que sin una fuente de datos autorizada y verificable el modelo puede seguir alucinando productos que no existen a la venta; usar InvokeModelWithResponseStream mejora la latencia percibida por el usuario (el texto empieza a mostrarse antes), pero no reduce el tiempo real de generación ni corrige la relevancia o exactitud de las recomendaciones.\n\nOpción C (Correcta): crear una base de conocimiento (Knowledge Base) de Amazon Bedrock e implementar Retrieval Augmented Generation (RAG) permite que el modelo recupere fragmentos reales del catálogo de productos (almacenados como embeddings en un índice vectorial) y genere las recomendaciones a partir de ese contexto recuperado, en lugar de basarse únicamente en lo aprendido durante el entrenamiento; esto ancla (\"grounds\") las respuestas en datos verídicos y evita que el modelo invente productos inexistentes o irrelevantes, sin necesidad de reentrenar el modelo. Adicionalmente, configurar el parámetro de rendimiento de latencia (performanceConfig con latency establecido en \"optimized\") activa la inferencia optimizada para latencia disponible para determinados modelos en Amazon Bedrock, entre ellos Anthropic Claude 3.5 Haiku, reduciendo el tiempo de respuesta de la inferencia sin sacrificar precisión y sin requerir configuración adicional. Esta combinación resuelve directamente ambos problemas reportados: recomendaciones fuera de catálogo/irrelevantes y tiempos de generación elevados.\n\nOpción D: almacenar el catálogo en Amazon OpenSearch Service y validar las recomendaciones del modelo contra el catálogo después de generarlas añade una capa de validación posterior (post-procesamiento) que requiere más desarrollo y mantenimiento que anclar la generación directamente en los datos reales mediante RAG, y no evita que el modelo genere inicialmente sugerencias incorrectas (solo las filtra después). Además, el enunciado indica que la mayoría de las interacciones entre los clientes y la solución son únicas, lo que limita fuertemente la efectividad de una caché de respuestas en Amazon DynamoDB, ya que habría muy pocas coincidencias de caché y el problema de latencia persistiría en la mayoría de los casos.\n\nReferencias:\n- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html\n- https://docs.aws.amazon.com/bedrock/latest/userguide/latency-optimized-inference.html\n- https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 16,
    questionNumber: 16,
    question: "A company is using AWS Lambda and REST APIs to build a reasoning agent to automate support workflows. The system must preserve memory across interactions, share the relevant agent state, and support event-driven invocation and synchronous invocation. The system must also enforce access control and session-based permissions. Which combination of steps provides the MOST scalable solution? (Choose two.)",
    choices: [
      {
        letter: "A",
        text: "Use Amazon Bedrock AgentCore to manage memory and session-aware reasoning. Deploy the agent with built-in identity support, event handling, and observability.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Register the Lambda functions and the REST APIs as actions by using Amazon API Gateway and Amazon EventBridge. Enable Amazon Bedrock AgentCore to invoke the Lambda functions and the REST APIs without custom orchestration code.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Use Amazon Bedrock Agents for reasoning and conversation management. Use AWS Step Functions and Amazon SQS queues for orchestration. Store the agent state in Amazon DynamoDB to maintain memory between steps.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Deploy the reasoning logic as a container on Amazon ECS behind Amazon API Gateway. Use Amazon Aurora to store memory data and identity data.",
        isCorrect: false
      },
      {
        letter: "E",
        text: "Build a custom RAG pipeline by using Amazon Kendra and Amazon Bedrock. Use AWS Lambda to orchestrate tool invocations. Store the agent state in Amazon S3.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): Amazon Bedrock AgentCore es la plataforma agéntica gestionada de AWS diseñada exactamente para este escenario: incluye el servicio Memory (memoria a corto y largo plazo, compartible entre agentes y persistente entre sesiones), el servicio Identity (gestión de identidad, autenticación y autorización compatible con proveedores externos como Cognito, Okta o Entra ID) y el servicio Runtime, que ofrece aislamiento de sesión mediante microVMs dedicadas, soporte para invocación síncrona (API InvokeAgentRuntime) y para procesamiento asíncrono/en segundo plano (event-driven), además de Observability integrada. Esto evita construir manualmente el manejo de estado, permisos y eventos.\n\nOpción B (Correcta): Amazon Bedrock AgentCore Gateway permite convertir APIs existentes (incluyendo REST APIs expuestas mediante Amazon API Gateway) y funciones AWS Lambda en herramientas compatibles con Model Context Protocol (MCP) con solo unas pocas líneas de código, sin necesidad de escribir código de orquestación personalizado. Gateway centraliza el descubrimiento de herramientas, la autenticación de entrada y salida, y la traducción de protocolos, mientras que Amazon EventBridge puede usarse para disparar la invocación basada en eventos de esas funciones y APIs. Esta combinación reduce semanas de desarrollo de integración a una configuración declarativa.\n\nOpción C: usar Amazon Bedrock Agents junto con AWS Step Functions, colas Amazon SQS y Amazon DynamoDB para el estado es una arquitectura válida pero exige diseñar, desplegar y mantener manualmente toda la orquestación, la persistencia de memoria y el control de sesión que AgentCore ya ofrece de forma nativa y gestionada, por lo que no es la opción más escalable ni la que menos esfuerzo operativo requiere.\n\nOpción D: desplegar la lógica de razonamiento como contenedor en Amazon ECS detrás de Amazon API Gateway, usando Amazon Aurora para memoria e identidad, obliga a gestionar infraestructura de cómputo, escalado, parches y una base de datos relacional propia para cubrir capacidades (memoria de sesión, identidad, observabilidad) que AgentCore proporciona como servicio administrado, además de no simplificar el control de acceso basado en sesión.\n\nOpción E: construir un pipeline RAG personalizado con Amazon Kendra y Amazon Bedrock, orquestando las invocaciones de herramientas manualmente con AWS Lambda y almacenando el estado del agente en Amazon S3, implica desarrollar desde cero la gestión de memoria, el control de sesión y el cumplimiento de permisos, careciendo de las garantías de aislamiento, identidad y observabilidad que ofrece AgentCore, por lo que no es la solución más escalable.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html\nhttps://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html\nhttps://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-sessions.html",
    category: "Agents & Orchestration",
    multiSelect: true,
    requiredCount: 2
  },
  {
    id: 17,
    questionNumber: 17,
    question: "A financial services company is developing a Retrieval Augmented Generation (RAG) application to help investment analysts query complex financial relationships across multiple investment vehicles, market sectors, and regulatory environments. The dataset contains highly interconnected entities that have multi-hop relationships. The analysts must be able to examine the relationships holistically to provide accurate investment guidance. The application must deliver comprehensive answers that capture indirect relationships between financial entities. The application must produce responses in less than 3 seconds. Which solution will meet these requirements with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Use Amazon Bedrock Knowledge Bases with Graph RAG and Amazon Neptune Analytics to store the financial data. Analyze the multi-hop relationships between entities and automatically identify related information across documents.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Use Amazon Bedrock Knowledge Bases and an Amazon OpenSearch Service vector store to implement custom relationship identification logic that uses AWS Lambda functions to query multiple vector embeddings in sequence.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use an Amazon OpenSearch Serverless vector database with k-nearest neighbor (k-NN) searches. Implement manual relationship mapping in an application layer that runs in an Amazon EC2 Auto Scaling group.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use Amazon DynamoDB to store financial data in a custom indexing system. Use an AWS Lambda function to query relevant records based on input questions. Use Amazon SageMaker AI to generate responses.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): Amazon Bedrock Knowledge Bases ofrece GraphRAG como una función totalmente gestionada que combina modelado de grafos con IA generativa, usando Amazon Neptune Analytics como almacén subyacente. Según la documentación oficial de AWS, GraphRAG identifica y utiliza automáticamente las relaciones entre entidades y elementos estructurales (como títulos de sección) a través de múltiples documentos ingeridos en la base de conocimiento, sin necesidad de configurar lógica de consulta personalizada. Su funcionamiento consiste en: (1) realizar una búsqueda vectorial inicial para encontrar los nodos de grafo relevantes, (2) recuperar los nodos o fragmentos de chunk relacionados vinculados a esos resultados, y (3) expandir el contexto recorriendo el grafo para obtener respuestas más completas y contextualmente precisas, especialmente cuando la información requiere conectarse a través de múltiples pasos lógicos (relaciones multi-hop). Esto es exactamente lo que necesita la empresa de servicios financieros para analizar relaciones indirectas entre vehículos de inversión, sectores de mercado y entornos regulatorios. Al ser un servicio gestionado (Amazon Bedrock Knowledge Bases + Neptune Analytics), no requiere que el equipo administre infraestructura de cómputo, escale servidores ni implemente lógica de recorrido de grafos manualmente, lo que minimiza la sobrecarga operativa en comparación con las demás opciones, cumpliendo también con el requisito de baja latencia.\n\nOpción B: usar Amazon Bedrock Knowledge Bases con un almacén vectorial en Amazon OpenSearch Service y funciones AWS Lambda para consultar múltiples embeddings vectoriales de forma secuencial obligaría al equipo a desarrollar y mantener lógica personalizada de identificación de relaciones. Esta solución no modela relaciones estructuradas entre entidades como un grafo nativo, por lo que capturar relaciones multi-hop requeriría múltiples llamadas secuenciales, incrementando la latencia y la complejidad de desarrollo, además de la carga operativa de mantener las funciones Lambda.\n\nOpción C: una base de datos vectorial en Amazon OpenSearch Serverless con búsquedas k-nearest neighbor (k-NN) captura similitud semántica entre embeddings, pero no representa relaciones estructuradas ni permite recorridos multi-hop de forma nativa. Implementar el mapeo de relaciones manualmente en una capa de aplicación ejecutada en un grupo de Auto Scaling de Amazon EC2 exige desarrollo, pruebas y mantenimiento continuos de la infraestructura y de la lógica de negocio, lo que representa una sobrecarga operativa considerablemente mayor.\n\nOpción D: almacenar los datos financieros en Amazon DynamoDB con un sistema de indexación personalizado, usar una función AWS Lambda para consultar los registros relevantes según las preguntas de entrada, y usar Amazon SageMaker AI para generar las respuestas no ofrece capacidades nativas de recuperación semántica (RAG) ni de modelado de relaciones entre entidades. Esta arquitectura requeriría construir desde cero toda la lógica de indexación, búsqueda y razonamiento sobre relaciones, lo cual implica el mayor esfuerzo de desarrollo y mantenimiento entre todas las opciones.\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-build-graphs.html, https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-build-graphs-build.html, https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-neptune.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 18,
    questionNumber: 18,
    question: "A healthcare company uses Amazon Bedrock to deploy an application that generates summaries of clinical documents. The application experiences inconsistent response quality with occasional factual hallucinations. Monthly costs exceed the company's projections by 40%. A GenAI developer must implement a near real-time monitoring solution to detect hallucinations, identify abnormal token consumption, and provide early warnings of cost anomalies. The solution must require minimal custom development work and maintenance overhead. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Configure Amazon CloudWatch alarms to monitor InputTokenCount and OutputTokenCount metrics to detect anomalies. Store model invocation logs in an Amazon S3 bucket. Use AWS Glue and Amazon Athena to identify potential hallucinations.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Run Amazon Bedrock evaluation jobs that use LLM-based judgments to detect hallucinations. Configure Amazon CloudWatch to track token usage. Create an AWS Lambda function to process CloudWatch metrics. Configure the Lambda function to send usage pattern notifications.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Configure Amazon Bedrock to store model invocation logs in an Amazon S3 bucket. Enable text output logging. Configure Amazon Bedrock guardrails to run contextual grounding checks to detect hallucinations. Create Amazon CloudWatch anomaly detection alarms for token usage metrics.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Use AWS CloudTrail to log all Amazon Bedrock API calls. Create a custom dashboard in Amazon QuickSight to visualize token usage patterns. Use Amazon SageMaker Model Monitor to detect quality drift in generated summaries.",
        isCorrect: false
      }
    ],
    comments: "Opción A: configurar alarmas de Amazon CloudWatch sobre las métricas InputTokenCount y OutputTokenCount solo permite detectar variaciones de volumen de tokens mediante umbrales estáticos definidos manualmente, pero no dice nada sobre la fidelidad factual de las respuestas. Además, analizar los logs de invocación almacenados en S3 con AWS Glue y Amazon Athena para \"inferir\" alucinaciones exige construir y mantener un pipeline analítico propio (crawlers, ETL, consultas SQL ad hoc), lo que contradice el requisito de mínimo desarrollo y mantenimiento.\n\nOpción B: los trabajos de evaluación de Amazon Bedrock (Model Evaluation) que usan un modelo como juez (LLM-as-a-judge) sí pueden detectar hallazgos de calidad, incluyendo alucinaciones, pero se ejecutan como trabajos por lotes sobre un conjunto de prompts/respuestas, no de forma continua ni casi en tiempo real sobre cada invocación en producción. Añadir una función AWS Lambda personalizada para procesar métricas de CloudWatch y generar notificaciones de patrones de uso también introduce desarrollo y mantenimiento adicionales que la solución debería evitar.\n\nOpción C (Correcta): Amazon Bedrock puede registrar los logs de invocación de modelos (incluyendo el texto de entrada y salida) en un bucket de Amazon S3 simplemente habilitando el registro de invocaciones del modelo, sin necesidad de código adicional. Las comprobaciones de fundamentación contextual (contextual grounding checks) de Amazon Bedrock Guardrails evalúan, en el momento de cada invocación (a través de las API Invoke, Converse o ApplyGuardrail), si la respuesta del modelo está \"grounded\" (fundamentada factualmente) en la fuente de referencia proporcionada y si es \"relevant\" respecto a la consulta del usuario; a cada respuesta se le asignan puntuaciones de confianza de grounding y relevance, y se pueden configurar umbrales para bloquear automáticamente las respuestas que se consideren alucinadas, todo ello de forma prácticamente inmediata y sin necesidad de desarrollo personalizado. Por su parte, las alarmas de detección de anomalías de Amazon CloudWatch (CloudWatch Anomaly Detection) aplicadas a las métricas de consumo de tokens (por ejemplo InputTokenCount/OutputTokenCount o los agregados de tokens de Bedrock) utilizan modelos estadísticos para aprender el patrón normal de uso y generar alertas cuando el comportamiento se desvía de ese patrón, evitando tener que definir y mantener umbrales estáticos manualmente. La combinación de ambos mecanismos nativos de Bedrock y CloudWatch cumple el objetivo de monitorización casi en tiempo real de alucinaciones y de anomalías de consumo/coste con mínimo esfuerzo de desarrollo y mantenimiento.\n\nOpción D: AWS CloudTrail registra las llamadas a la API de Bedrock (quién invocó qué operación y cuándo), pero no captura el contenido de las respuestas generadas ni puede usarse para detectar alucinaciones. Un dashboard personalizado en Amazon QuickSight para visualizar patrones de uso de tokens requiere trabajo de desarrollo y mantenimiento continuo (modelado de datos, actualización de visualizaciones). Además, Amazon SageMaker Model Monitor está diseñado para detectar drift de datos/calidad en modelos desplegados en endpoints de SageMaker, no para evaluar la fidelidad factual de resúmenes generados por modelos de Amazon Bedrock, por lo que no es la herramienta adecuada para este caso de uso.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-runtime-metrics.html\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-inference-architecture-and-best-practices-on-aws/amazon-bedrock.html",
    category: "Monitoring & Evaluation",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 19,
    questionNumber: 19,
    question: "A company is building a generative AI (GenAI) application that produces content based on a variety of internal and external data sources. The company wants to ensure that the generated output is fully traceable. The application must support data source registration and enable metadata tagging to attribute content to its original source. The application must also maintain audit logs of data access and usage throughout the pipeline. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Use AWS Lake Formation to catalog data sources and control access. Apply metadata tags directly in Amazon S3. Use AWS CloudTrail to monitor API activity.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use AWS Glue Data Catalog to register and tag data sources. Use Amazon CloudWatch Logs to monitor access patterns and application behavior.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Store data in Amazon S3 and use object tagging for attribution. Use AWS Glue Data Catalog to manage schema information. Use AWS CloudTrail to log access to S3 buckets.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use AWS Glue Data Catalog to register all data sources. Apply metadata tags to attribute data sources. Use AWS CloudTrail to log access and activity across services.",
        isCorrect: true
      }
    ],
    comments: "Opción A: AWS Lake Formation se apoya internamente en el AWS Glue Data Catalog para gestionar los metadatos y aplicar control de acceso granular (incluidos LF-Tags), pero la opción describe aplicar las etiquetas directamente sobre los objetos de Amazon S3 en lugar de sobre el catálogo centralizado. Esto rompe la atribución uniforme, ya que las etiquetas de S3 son propiedades del objeto individual y no quedan integradas en el repositorio de metadatos unificado que usa el resto de servicios analíticos (Athena, EMR, Redshift, etc.), dificultando trazar el origen de cada dato de forma consistente en toda la canalización.\n\nOpción B: Amazon CloudWatch Logs sirve para monitorizar logs de aplicación y métricas operativas, pero no constituye un registro de auditoría de llamadas a la API con el nivel de detalle (identidad del llamador, hora del evento, IP de origen, recurso afectado, parámetros de la solicitud) que exige un requisito de trazabilidad completa. Ese tipo de auditoría de actividad y acceso es precisamente la función de AWS CloudTrail, no de CloudWatch Logs.\n\nOpción C: aplicar etiquetas a nivel de objeto de S3 para la atribución es, de nuevo, menos centralizado que registrar y etiquetar las fuentes directamente en el AWS Glue Data Catalog (que expone una API TagResource para asociar etiquetas a bases de datos, tablas y otros recursos del catálogo). Además, limitar CloudTrail a \"acceso a buckets de S3\" es más estrecho que loguear la actividad y el acceso across servicios, que es el requisito planteado (la solución debe cubrir toda la canalización, no solo S3).\n\nOpción D (Correcta): el AWS Glue Data Catalog es el repositorio de metadatos unificado de AWS para registrar y catalogar múltiples fuentes de datos (se integra de forma nativa con Amazon Athena, Amazon EMR, Amazon Redshift, RDS y aplicaciones compatibles con Apache Hive Metastore), y admite añadir etiquetas (tags) a sus recursos mediante la operación TagResource, lo que permite atribuir cada fuente de datos a su origen de forma centralizada. Combinado con AWS CloudTrail, que registra de forma nativa la actividad de la API (identidad del usuario, hora del evento, origen del evento, IP de origen, parámetros de la solicitud) a través de los distintos servicios de AWS involucrados en la canalización, se obtiene un registro de auditoría end-to-end y una trazabilidad completa del contenido generado, con un esfuerzo de integración mínimo.\n\nReferencias:\nhttps://docs.aws.amazon.com/athena/latest/ug/data-sources-glue.html\nhttps://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-tags.html\nhttps://docs.aws.amazon.com/whitepapers/latest/build-secure-enterprise-ml-platform/audit-trail-management.html",
    category: "Security & Governance",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 20,
    questionNumber: 20,
    question: "A financial services company needs to build a document analysis system that uses Amazon Bedrock to process quarterly reports. The system must analyze financial data, perform sentiment analysis, and validate compliance across batches of reports. Each batch contains 5 reports. Each report requires multiple foundation model (FM) calls. The solution must finish the analysis within 10 seconds for each batch. Current sequential processing takes 45 seconds for each batch. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Use AWS Lambda functions with provisioned concurrency to process each analysis type sequentially. Configure the Lambda function timeouts to 10 seconds. Configure automatic retries with exponential backoff.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use AWS Step Functions with a Parallel state to invoke separate AWS Lambda functions for each analysis type simultaneously. Configure Amazon Bedrock client timeouts. Use Amazon CloudWatch metrics to track execution time and model inference latency.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Create an Amazon SQS queue to buffer analysis requests. Deploy multiple AWS Lambda functions with reserved concurrency. Configure each Lambda function to process different aspects of each report sequentially and then combine the results.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Deploy an Amazon ECS cluster that runs containers that process each report sequentially. Use a load balancer to distribute batch workloads. Configure an auto-scaling policy based on CPU utilization to handle demand fluctuations.",
        isCorrect: false
      }
    ],
    comments: "Opción A: la concurrencia aprovisionada en AWS Lambda elimina la latencia de arranque en frío (cold start), pero la propuesta indica que cada tipo de análisis se procesa \"sequentially\" (de forma secuencial) dentro de la función. Según la documentación de AWS sobre Lambda y Step Functions, el procesamiento secuencial mantiene la suma de todas las latencias de las llamadas al modelo, por lo que no resuelve el cuello de botella real (45 segundos) y no permite bajar a los 10 segundos requeridos, independientemente de cómo se gestione el arranque en frío.\n\nOpción B (Correcta): AWS Step Functions ofrece de forma nativa un estado Parallel diseñado específicamente para \"ejecutar múltiples ramas del flujo de trabajo simultáneamente\" (\"executes multiple branches of your workflow simultaneously\"), tal y como confirma la documentación oficial de AWS Lambda sobre orquestación con Step Functions. En este escenario, cada tipo de análisis (datos financieros, sentimiento, cumplimiento) se puede implementar como una rama independiente dentro del estado Parallel, cada una invocando su propia función Lambda que a su vez llama a Amazon Bedrock. Al ejecutarse todas las ramas en paralelo en lugar de en serie, el tiempo total del lote deja de ser la suma de las latencias individuales y pasa a ser aproximadamente el tiempo de la rama más lenta, lo que permite reducir el procesamiento de 45 segundos a menos de 10 segundos por lote. Además, es posible configurar timeouts en el cliente de Amazon Bedrock (por ejemplo mediante el parámetro read_timeout de botocore.config.Config al crear el cliente bedrock-runtime) para controlar cuánto tiempo se espera la respuesta de cada llamada al modelo, y usar métricas de Amazon CloudWatch para monitorizar la duración de ejecución de cada Lambda y la latencia de inferencia de cada llamada a Bedrock, detectando cuellos de botella y validando que se cumple el SLA de 10 segundos.\n\nOpción C: usar Amazon SQS para almacenar en búfer las solicitudes junto con Lambda de concurrencia reservada mejora la resiliencia y evita sobrecargar el servicio, pero la propia descripción indica que cada Lambda \"procesa diferentes aspectos de cada informe de forma secuencial y luego combina los resultados\" (\"process different aspects of each report sequentially and then combine the results\"). Esto significa que no existe paralelismo real entre los distintos tipos de análisis de un mismo informe, por lo que la latencia acumulada seguiría siendo demasiado alta para cumplir el límite de 10 segundos.\n\nOpción D: desplegar un clúster de Amazon ECS con balanceador de carga y auto-scaling basado en CPU permite escalar horizontalmente el número de informes procesados en paralelo, pero la propia opción especifica que los contenedores \"procesan cada informe de forma secuencial\" (\"run containers that process each report sequentially\"). Es decir, dentro de cada informe las distintas llamadas al modelo fundacional siguen ejecutándose una tras otra, por lo que no se elimina el cuello de procesamiento en serie que impide bajar de 45 a 10 segundos por lote, además de introducir mayor complejidad operativa que Step Functions para este caso de uso.\n\nReferencias: https://docs.aws.amazon.com/lambda/latest/dg/with-step-functions.html ; https://docs.aws.amazon.com/step-functions/latest/dg/state-parallel.html ; https://docs.aws.amazon.com/nova/latest/nova2-userguide/troubleshooting.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 21,
    questionNumber: 21,
    question: "A company is using Amazon Bedrock to build a customer-facing AI assistant to handle sensitive customer inquiries. The company must use defense-in-depth safety controls to block sophisticated prompt injection attacks. The company must keep audit logs of all safety interventions. The AI assistant must have cross-Region failover capabilities. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Configure Amazon Bedrock guardrails to use content filters to protect against prompt injection attacks. Set the content filters to high. Use a guardrail profile to implement cross-Region guardrail inference. Use Amazon CloudWatch Logs with custom metrics to capture detailed guardrail intervention events.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Configure Amazon Bedrock guardrails to use content filters to protect against prompt injection attacks. Set the content filters to high. Use AWS WAF to block suspicious inputs. Use AWS CloudTrail to log API calls for audits.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Deploy Amazon Comprehend custom classification to detect prompt injection attacks. Use Amazon API Gateway to validate requests. Use Amazon CloudWatch Logs with custom metrics to capture detailed intervention events.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Configure Amazon Bedrock guardrails to use custom content filters to protect against harmful content. Set the content filters to high. Use word filters to protect against known attack patterns. Configure cross-Region guardrail replication to provide failover capabilities. Store logs in AWS CloudTrail for compliance auditing.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): los content filters de Amazon Bedrock Guardrails incluyen una categoría dedicada a la detección de \"prompt attacks\" (jailbreaks, prompt injection y prompt leakage) que evalúa semánticamente las entradas del usuario y las salidas del modelo; configurados en intensidad alta (\"high\"), maximizan el bloqueo de intentos de manipulación sofisticados, aportando así defensa en profundidad. El guardrail profile es el mecanismo específico de Bedrock Guardrails para habilitar la inferencia cross-Region: al asociarlo al guardrail, las solicitudes de evaluación de la política se enrutan automáticamente entre Regiones de AWS dentro de la misma geografía, lo que aporta resiliencia y continuidad si una Región no está disponible, sin coste adicional. Para la auditoría, Amazon Bedrock Guardrails publica métricas en el namespace de CloudWatch (por ejemplo, InvocationsIntervened), que se pueden desglosar con dimensiones como Operation o GuardrailContentSource; con métricas personalizadas y alarmas sobre estos datos se obtiene un registro detallado de cada intervención de seguridad, cumpliendo el requisito de logs de auditoría.\n\nOpción B: AWS WAF opera a nivel de red y de aplicación web (filtrando por reglas HTTP, patrones de tráfico, IP, etc.) y no está diseñado para analizar semánticamente el contenido de un prompt dirigido a un modelo de lenguaje, por lo que no detecta ataques de prompt injection sofisticados de la misma forma que el filtro de contenido de Guardrails. Además, AWS CloudTrail registra las llamadas a la API (quién invocó qué operación y cuándo), pero no captura el detalle semántico de qué intervención de seguridad se aplicó dentro de una invocación de Guardrails, por lo que no cumple igual de bien el requisito de auditoría detallada de intervenciones.\n\nOpción C: Amazon Comprehend con clasificación personalizada obligaría a entrenar, etiquetar datos y mantener un modelo de clasificación propio para detectar ataques de prompt, en lugar de aprovechar la funcionalidad de detección de \"prompt attacks\" ya integrada y gestionada por Amazon Bedrock Guardrails; además, ni Comprehost ni API Gateway ofrecen por sí solos la capacidad de failover cross-Region de guardrails que exige el enunciado.\n\nOpción D: no existe en Amazon Bedrock Guardrails una funcionalidad llamada \"replicación cross-Region de guardrails\"; el mecanismo real y documentado es el guardrail profile para inferencia cross-Region descrito en la opción A. Además, basar la defensa contra ataques de prompt únicamente en word filters (listas de palabras con coincidencia exacta) es mucho menos robusto frente a ataques sofisticados que el filtro de contenido dedicado a \"prompt attacks\", que analiza el significado y la intención del texto, no solo palabras clave. Por último, AWS CloudTrail no ofrece el nivel de detalle sobre intervenciones de guardrails que sí proporcionan las métricas de CloudWatch.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-cross-region.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-guardrails-cw-metrics.html",
    category: "Guardrails & Safety",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 22,
    questionNumber: 22,
    question: "A company is designing a canary deployment strategy for a payment processing API. The system must support automated gradual traffic shifting between multiple Amazon Bedrock models based on real-time inference metrics, historical traffic patterns, and service health. The solution must be able to gradually increase traffic to new model versions. The system must increase traffic if metrics remain healthy and decrease traffic if the performance degrades below acceptable thresholds. The company needs to comprehensively monitor inference latency and error rates during the deployment phase. The company must also be able to halt deployments and revert to a previous model version without any manual intervention. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Use Amazon Bedrock with provisioned throughput to host the versions of the model. Configure an Amazon EventBridge rule to invoke an AWS Step Functions workflow when a new model version is released. Configure the workflow to shift traffic in stages, wait for a specified time period, and invoke an AWS Lambda function to check Amazon CloudWatch performance metrics. Configure the workflow to increase traffic if the metrics meet thresholds and to trigger a traffic rollback if performance metrics fall below thresholds.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Use AWS Lambda functions to invoke various Amazon Bedrock model versions. Use an Amazon API Gateway HTTP API with stage variables and weighted routing to shift traffic gradually to new model versions. Use Amazon CloudWatch to monitor performance metrics. Use external logic to adjust traffic between model versions and to roll back if performance falls below thresholds.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use Amazon SageMaker AI endpoint variants to represent multiple Amazon Bedrock model versions. Use variant weights to shift traffic. Use Amazon CloudWatch to monitor performance metrics. Use SageMaker Model Monitor to trigger AWS Lambda functions to roll back a model deployment if performance drops below a specified threshold. Configure an Amazon EventBridge rule to roll back model deployments if an anomaly is detected.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use Amazon OpenSearch Service to track inference logs. Configure OpenSearch Service to invoke an AWS Systems Manager Automation runbook to update Amazon Bedrock model endpoints to shift traffic based on the inference logs.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): Amazon Bedrock ofrece Provisioned Throughput, un modo de aprovisionamiento que reserva capacidad de inferencia dedicada (Model Units) para un modelo base o personalizado, lo que permite garantizar capacidad estable para las distintas versiones del modelo durante la transición del despliegue canario. Como Bedrock no ofrece de forma nativa un mecanismo de enrutamiento ponderado entre versiones de modelo (a diferencia de, por ejemplo, los alias con routing configuration de Step Functions o los endpoint variants de SageMaker), hay que construir la orquestación con AWS Step Functions: una regla de Amazon EventBridge dispara el flujo de trabajo cuando se publica una nueva versión del modelo, el flujo desplaza el tráfico en fases, espera un intervalo definido entre cada fase e invoca una función AWS Lambda que consulta las métricas de Amazon CloudWatch (latencia de inferencia y tasa de error). Con esa información, Step Functions decide de forma automática si aumenta el porcentaje de tráfico hacia la nueva versión (si las métricas están dentro de umbral) o si revierte el tráfico a la versión anterior (si las métricas se degradan), sin intervención manual. Este patrón de despliegue gradual con verificación de alarmas entre fases y rollback automático es precisamente el que Step Functions soporta de forma nativa para el \"gradual deployment\" de versiones (aplicable también a la propia máquina de estados), y es el enfoque recomendado para construir canary deployments personalizados sobre servicios como Bedrock que no exponen un mecanismo de traffic-shifting propio.\n\nOpción B: aunque Amazon API Gateway sí soporta despliegues canary nativos mediante \"canary release deployment\" con variables de stage y distribución ponderada del tráfico, aquí la propuesta delega la decisión de aumentar/disminuir tráfico y el rollback a \"lógica externa\" no especificada. Eso obliga a diseñar, implementar y mantener manualmente el motor de decisión (evaluación de métricas, temporización de fases, rollback), en lugar de apoyarse en un orquestador con estado, reintentos y manejo de errores integrado como Step Functions, que es el servicio pensado para este tipo de flujos de aprobación/decisión automatizados.\n\nOpción C: los \"endpoint variants\" y Amazon SageMaker AI Model Monitor son funcionalidades de los endpoints de inferencia de SageMaker (donde un mismo endpoint puede repartir tráfico entre varias \"production variants\" de modelos alojados en SageMaker). Los modelos de Amazon Bedrock no se despliegan como variantes de un endpoint de SageMaker: se invocan a través de la API de Bedrock (bajo demanda o mediante Provisioned Throughput/Custom Model Deployment), por lo que no existe una forma soportada de \"representar\" versiones de modelos de Bedrock como variantes de un endpoint de SageMaker. Esta opción mezcla dos servicios de forma técnicamente inconsistente.\n\nOpción D: Amazon OpenSearch Service está diseñado para indexación, búsqueda y análisis de logs, no para orquestar despliegues ni desencadenar automatizaciones de cambio de tráfico. Además, Amazon Bedrock no tiene \"endpoints\" configurables mediante runbooks de AWS Systems Manager Automation para desplazar tráfico entre versiones de modelo; esta combinación no corresponde a ningún flujo soportado por estos servicios para gestionar un despliegue canario de modelos de Bedrock.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html\nhttps://docs.aws.amazon.com/step-functions/latest/dg/version-rolling-deployment.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/manage-customized-models.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 23,
    questionNumber: 23,
    question: "A financial services company uses an AI application to process financial documents by using Amazon Bedrock. During business hours, the application handles approximately 10,000 requests each hour, which requires consistent throughput. The company uses the CreateProvisionedModelThroughput API to purchase provisioned throughput. Amazon CloudWatch metrics show that the provisioned capacity is unused while on-demand requests are being throttled. The company finds the following code in the application: python response = bedrock_runtime.invoke_model(modelId=\"anthropic.claude-v2\", body=json.dumps(payload)) The company needs the application to use the provisioned throughput and to resolve the throttling issues. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Increase the number of model units (MUs) in the provisioned throughput configuration.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Replace the model ID parameter with the ARN of the provisioned model that the CreateProvisionedModelThroughput API returns.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Add exponential backoff retry logic to handle throttling exceptions during peak hours.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Modify the application to use the InvokeModelWithResponseStream API instead of the InvokeModel API.",
        isCorrect: false
      }
    ],
    comments: "Opción A: aumentar el número de model units (MUs) en la configuración de Provisioned Throughput incrementa la capacidad reservada disponible, pero no resuelve el problema descrito. La causa raíz es que el código de la aplicación sigue invocando el modelo mediante `modelId=\"anthropic.claude-v2\"` (el identificador del modelo base on-demand), por lo que las solicitudes nunca llegan a la capacidad aprovisionada, sin importar cuántas MUs se compren; esta seguiría apareciendo como no utilizada en CloudWatch.\n\nOpción B (Correcta): según la documentación oficial de Amazon Bedrock, para ejecutar inferencia usando una Provisioned Throughput hay que enviar una solicitud InvokeModel, InvokeModelWithResponseStream, Converse o ConverseStream especificando el ARN del modelo aprovisionado (provisioned model ARN) como parámetro `modelId`, en lugar del ID del modelo base. Ese ARN es precisamente el que devuelve la API CreateProvisionedModelThroughput (campo `provisionedModelArn`) al crear la capacidad reservada. Como el código actual usa el ID del modelo base, todo el tráfico se enruta a la capacidad on-demand compartida, lo que explica exactamente los síntomas observados: la capacidad aprovisionada permanece sin uso en las métricas de CloudWatch mientras las solicitudes on-demand sufren throttling en las horas pico. Sustituir el `modelId` por el ARN del modelo aprovisionado dirige el tráfico a la capacidad dedicada y resuelve el throttling sin necesidad de cambios adicionales.\n\nOpción C: añadir lógica de reintento con backoff exponencial puede mitigar temporalmente los errores de throttling (por ejemplo, absorbiendo picos puntuales), pero no soluciona la causa raíz: la capacidad aprovisionada que la empresa ya paga sigue sin utilizarse porque las solicitudes nunca se dirigen a ella. Es una solución paliativa, no correctiva.\n\nOpción D: cambiar de la API InvokeModel a InvokeModelWithResponseStream solo afecta a la forma en que se recibe la respuesta (en streaming en lugar de en un único bloque), pero no cambia el recurso de destino de la invocación. De hecho, la propia documentación de AWS indica que InvokeModelWithResponseStream también requiere especificar el ARN del modelo aprovisionado como `modelId` para usar Provisioned Throughput; sin ese cambio de `modelId`, el problema de enrutamiento a la capacidad aprovisionada persistiría igualmente.\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/prov-thru-use.html ; https://docs.aws.amazon.com/bedrock/latest/APIReference/API_CreateProvisionedModelThroughput.html",
    category: "Performance & Scaling",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 24,
    questionNumber: 24,
    question: "A company is building an AI advisory application by using Amazon Bedrock. The application will provide recommendations to customers. The company needs the application to explain its reasoning process and cite specific sources for data. The application must retrieve information from company data sources and show step-by-step reasoning for recommendations. The application must also link data claims to source documents and maintain response latency under 3 seconds. Which solution will meet these requirements with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Use Amazon Bedrock Knowledge Bases with source attribution enabled. Use the Anthropic Claude Messages API with RAG to set high-relevance thresholds for source documents. Store reasoning and citations in Amazon S3 for auditing purposes.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Use Amazon Bedrock with Anthropic Claude models and extended thinking. Configure a 4,000-token thinking budget. Store reasoning traces and citations in Amazon DynamoDB for auditing purposes.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Configure Amazon SageMaker AI with a custom Anthropic Claude model. Use the model's reasoning parameter and AWS Lambda to process responses. Add source citations from a separate Amazon RDS database.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use Amazon Bedrock with Anthropic Claude models and chain-of-thought reasoning. Configure custom retrieval tracking with the Amazon Bedrock Knowledge Bases API. Use Amazon CloudWatch to monitor response latency metrics.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): Amazon Bedrock Knowledge Bases incorpora de forma nativa la atribución de fuentes (citations) a través de la operación RetrieveAndGenerate: cada respuesta generada incluye referencias (citas/footnotes) que enlazan las afirmaciones del texto con los fragmentos (chunks) concretos de los documentos de origen de los que proceden, sin necesidad de construir un mecanismo de citación propio. Además, es posible ajustar la configuración de recuperación (número de resultados, tipo de búsqueda, reranking) para priorizar los fragmentos más relevantes como fuente de las respuestas. Usar el modelo Anthropic Claude a través de la Messages API con este patrón de RAG gestionado y almacenar el razonamiento y las citas en Amazon S3 para fines de auditoría permite cumplir el requisito de explicabilidad y trazabilidad documental con la mínima carga operativa posible, ya que Bedrock Knowledge Bases gestiona la ingesta, indexación, recuperación y generación de citas de forma totalmente administrada, lo cual también favorece cumplir con el requisito de latencia baja al no añadir componentes adicionales de orquestación.\n\nOpción B: la función de \"extended thinking\" (razonamiento extendido) de los modelos Claude en Amazon Bedrock expone una traza del proceso de razonamiento interno del modelo, pero esta traza no está diseñada como mecanismo de atribución de fuentes documentales verificables ni se vincula automáticamente a documentos de la base de conocimiento; para enlazar esa traza de pensamiento con las fuentes de datos de la empresa habría que desarrollar lógica adicional. Además, un presupuesto de pensamiento de 4.000 tokens puede incrementar la latencia de la respuesta, dificultando cumplir el requisito de menos de 3 segundos, y usar DynamoDB para las trazas de razonamiento y citas añade una pieza de infraestructura adicional a gestionar.\n\nOpción C: desplegar un modelo Claude personalizado en Amazon SageMaker AI en lugar de usar Amazon Bedrock, junto con AWS Lambda para procesar las respuestas y una base de datos Amazon RDS separada para las citas, implica construir manualmente toda la lógica de recuperación, generación y citación (RAG \"casero\"), lo que representa la mayor carga operativa de todas las opciones: gestión de infraestructura de SageMaker, del pipeline de Lambda y de la base de datos relacional para las fuentes.\n\nOpción D: usar Amazon Bedrock con Claude y chain-of-thought reasoning junto con un seguimiento de recuperación \"personalizado\" (custom retrieval tracking) sobre la API de Knowledge Bases duplica una funcionalidad de citación que Knowledge Bases ya ofrece de forma nativa mediante RetrieveAndGenerate, añadiendo complejidad y desarrollo innecesarios. Usar CloudWatch para monitorizar la latencia es una buena práctica de observabilidad, pero no resuelve el requisito de citación con el mínimo esfuerzo operativo, ya que sigue exigiendo construir el propio sistema de trazabilidad en lugar de aprovechar el que ya integra el servicio.\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve-generate.html ; https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_RetrieveAndGenerate.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 25,
    questionNumber: 25,
    question: "A financial services company uses multiple foundation models (FMs) through Amazon Bedrock for its generative AI (GenAI) applications. To comply with a new regulation for GenAI use with sensitive financial data, the company needs a token management solution. The token management solution must proactively alert when applications approach model-specific token limits. The solution must also process more than 5,000 requests each minute and maintain token usage metrics to allocate costs across business units. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Develop model-specific tokenizers in an AWS Lambda function. Configure the Lambda function to estimate token usage before sending requests to Amazon Bedrock. Configure the Lambda function to publish metrics to Amazon CloudWatch and trigger alarms when requests approach thresholds. Store detailed token usage in Amazon DynamoDB to report costs.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Implement Amazon Bedrock Guardrails with token quota policies. Capture metrics on rejected requests. Configure Amazon EventBridge rules to trigger notifications based on Amazon Bedrock Guardrails metrics. Use Amazon CloudWatch dashboards to visualize token usage trends across models.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Deploy an Amazon SQS dead-letter queue for failed requests. Configure an AWS Lambda function to analyze token-related failures. Use Amazon CloudWatch Logs Insights to generate reports on token usage patterns based on error logs from Amazon Bedrock API responses.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use Amazon API Gateway to create a proxy for all Amazon Bedrock API calls. Configure request throttling based on custom usage plans with predefined token quotas. Configure API Gateway to reject requests that will exceed token limits.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): desarrollar tokenizadores específicos por modelo dentro de una función AWS Lambda permite estimar el número de tokens de cada solicitud antes de enviarla a Amazon Bedrock (el conteo de tokens es específico de cada modelo, ya que cada uno usa una estrategia de tokenización distinta). Esa misma función puede publicar el uso como métricas personalizadas en Amazon CloudWatch y disparar alarmas cuando el consumo se acerca a los límites de tokens por minuto/día de cada modelo, cumpliendo el requisito de alertas proactivas. Lambda escala de forma automática y puede sostener un volumen de más de 5.000 solicitudes por minuto, y almacenar el detalle de uso de tokens en Amazon DynamoDB permite generar informes de coste desglosados por unidad de negocio. Esta combinación es la única de las cuatro que satisface simultáneamente los tres requisitos: alerta proactiva antes de alcanzar el límite, alto rendimiento y atribución de costes por unidad de negocio.\n\nOpción B: según la documentación oficial de Amazon Bedrock Guardrails, un guardrail se compone de políticas de filtros de contenido, temas denegados, filtros de información sensible, filtros de palabras y filtros de contenido de imagen; no existe ningún tipo de \"política de cuota de tokens\". Los guardrails evalúan y filtran el contenido de las solicitudes y respuestas (seguridad y cumplimiento), pero no miden, limitan ni alertan sobre el consumo de tokens, por lo que esta opción describe una capacidad que Guardrails no ofrece.\n\nOpción C: usar una cola de mensajes fallidos (dead-letter queue) de Amazon SQS junto con el análisis de errores en Amazon CloudWatch Logs Insights es un enfoque puramente reactivo: solo se generan datos después de que una solicitud ya ha fallado por exceder límites de tokens. Esto no permite \"alertar proactivamente cuando las aplicaciones se acercan a los límites\", que es un requisito explícito del enunciado, ya que la detección ocurre después del incumplimiento, no antes.\n\nOpción D: los planes de uso (usage plans) de Amazon API Gateway controlan el número de solicitudes o la tasa de llamadas (throttling), pero no inspeccionan el contenido de la petición para calcular cuántos tokens consumirá en un modelo concreto de Bedrock; cada modelo tokeniza de forma distinta, algo que API Gateway no puede evaluar. Además, un usage plan no ofrece de forma nativa el desglose de costes por unidad de negocio basado en tokens que exige el enunciado.\n\nNota adicional: actualmente Amazon Bedrock también ofrece una API nativa, CountTokens, que permite estimar el número de tokens de una solicitud (InvokeModel o Converse) antes de ejecutarla, sin coste adicional, como alternativa a construir tokenizadores propios. Esto no invalida la opción A —que sigue siendo una arquitectura válida y es la única que cumple los tres requisitos— pero es una capacidad más moderna a tener en cuenta si se actualiza la pregunta.\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/count-tokens.html ; https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_CountTokens.html",
    category: "Monitoring & Evaluation",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 26,
    questionNumber: 26,
    question: "A retail company is developing a customer service application that must process 10,000 daily queries about products, orders, and warranties. The application must be able to respond to queries about 50,000 product documents that are updated every day. The application must integrate with an order management API to check the status of orders and to help process returns. The application must maintain context throughout multi-turn interactions with customers. The company must collect complete audit trails for application responses. Which solution will meet these requirements with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Deploy a fine-tuned Amazon Bedrock Anthropic Claude model for each product category. Create AWS Lambda functions to connect each model to the order management API. Store conversation history in Amazon DynamoDB.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Create a custom model that uses continued pre-training on Amazon Bedrock to handle all product documentation. Set up an Amazon API Gateway REST API that uses AWS Lambda functions to connect the model to the order management API.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use Amazon SageMaker AI with containers to deploy models. Use Amazon Kendra to search product documents. Use AWS Step Functions to orchestrate calls to the order management API.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use an Amazon Bedrock agent with action groups to integrate with the order management API. Associate an Amazon Bedrock knowledge base with the agent to search product documentation by using Retrieval Augmentation Generation (RAG). Enable trace events to capture audit trails.",
        isCorrect: true
      }
    ],
    comments: "Opción A: ajustar (fine-tune) un modelo de Anthropic Claude en Amazon Bedrock para cada categoría de producto obliga a entrenar, versionar y mantener múltiples modelos personalizados, además de reentrenarlos cada vez que cambien los 50.000 documentos de producto (que se actualizan a diario). También requiere construir manualmente, con funciones Lambda, la integración con la API de gestión de pedidos y gestionar a mano el historial de conversación en Amazon DynamoDB. Esto implica una carga operativa alta, muy alejada de la orquestación nativa que ofrecen los agentes de Bedrock.\n\nOpción B: el pre-entrenamiento continuo (continued pre-training) en Amazon Bedrock es un proceso de personalización de modelos pensado para inyectar conocimiento de dominio de forma duradera en los pesos del modelo, no para exponer contenido que cambia constantemente. Con 50.000 documentos actualizados cada día, habría que reentrenar el modelo base con una frecuencia inviable en tiempo y coste; además, tampoco resuelve por sí sola la integración con la API de pedidos, que igualmente requeriría una capa adicional de Lambda y API Gateway construida y operada manualmente.\n\nOpción C: desplegar modelos en contenedores propios con Amazon SageMaker AI implica aprovisionar, escalar y mantener la infraestructura de inferencia (instancias, contenedores, actualizaciones), en contraste con un servicio totalmente gestionado. Usar Amazon Kendra para la búsqueda de documentos añade otro servicio a administrar en paralelo a los modelos, y orquestar las llamadas a la API de pedidos con AWS Step Functions exige diseñar y mantener manualmente las máquinas de estado de orquestación, en lugar de apoyarse en la orquestación de agentes ya integrada en Bedrock. El conjunto es funcionalmente viable pero con una sobrecarga operativa notablemente mayor.\n\nOpción D (Correcta): un agente de Amazon Bedrock, según la documentación oficial de AWS, gestiona automáticamente el ciclo de vida de una petición en tres fases (pre-procesamiento, orquestación y post-procesamiento). En la fase de orquestación, el agente usa un modelo fundacional para razonar sobre la entrada del usuario, decide si debe invocar una acción de un action group (que conecta con una función Lambda para llamar a la API de gestión de pedidos y procesar devoluciones) o consultar una base de conocimiento (knowledge base) asociada que implementa Retrieval Augmented Generation (RAG) sobre los 50.000 documentos de producto; estas bases de conocimiento admiten sincronización incremental de las fuentes de datos, por lo que solo se reprocesan los documentos añadidos, modificados o eliminados desde la última sincronización, algo idóneo para contenido que se actualiza a diario sin gestionar infraestructura de indexación propia. El propio servicio conserva el historial de la sesión (conversation history) entre llamadas a InvokeAgent, manteniendo el contexto en interacciones multi-turno sin necesidad de una base de datos externa gestionada por el desarrollador. Además, al habilitar el trace en tiempo de ejecución, cada respuesta del agente va acompañada de eventos de traza (trace events) que documentan el razonamiento (rationale), las acciones invocadas, las consultas a la base de conocimiento y las observaciones en cada paso, proporcionando un rastro de auditoría completo del comportamiento del agente. Toda esta arquitectura es un servicio gestionado por AWS, por lo que es la solución que cumple los requisitos con la menor carga operativa.\n\nReferencias:\n- https://docs.aws.amazon.com/bedrock/latest/userguide/trace-events.html\n- https://docs.aws.amazon.com/bedrock/latest/userguide/agents-how.html\n- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 27,
    questionNumber: 27,
    question: "An ecommerce company is using Amazon Bedrock to build a generative AI (GenAI) application. The application uses AWS Step Functions to orchestrate a multi-agent workflow to produce detailed product descriptions. The workflow consists of three sequential states: a description generator, a technical specifications validator, and a brand voice consistency checker. Each state produces intermediate reasoning traces and outputs that are passed to the next state. The application uses an Amazon S3 bucket for process storage and to store outputs. During testing, the company discovers that outputs between Step Functions states frequently exceed the 256 KB quota and cause workflow failures. A GenAI Developer needs to revise the application architecture to efficiently handle the Step Functions 256 KB quota and maintain workflow observability. The revised architecture must preserve the existing multi-agent reasoning and acting (ReAct) pattern. Which solution will meet these requirements with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Store intermediate outputs in Amazon DynamoDB. Pass only references between states. Create a Map state that retrieves the complete data from DynamoDB when required for each agent's processing step.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Configure an Amazon Bedrock integration to use the S3 bucket URI in the input parameter for large outputs. Use the ResultPath field and the ResultSelector field to route S3 references between the agent steps while maintaining the sequential validation workflow.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Use AWS Lambda functions to compress outputs to less than 256 KB before each agent state. Configure each agent task to decompress the outputs before processing and to compress results before passing them to the next state.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Configure a separate Step Functions state machine to handle each agent's processing. Use Amazon EventBridge to coordinate the execution flow between state machines. Use S3 references for the outputs as event data.",
        isCorrect: false
      }
    ],
    comments: "Opción A: almacenar las salidas intermedias en Amazon DynamoDB y usar un estado Map para recuperarlas introduce un servicio de almacenamiento adicional que no aprovecha el bucket de S3 que la aplicación ya usa para el \"process storage\". Además, un estado Map está pensado para iterar sobre colecciones de elementos (por ejemplo, procesar varios elementos en paralelo o en lote), no para recuperar un único valor de referencia en un flujo estrictamente secuencial de tres pasos; esto añadiría complejidad operativa (tablas, IAM, capacidad de lectura/escritura) sin necesidad real.\n\nOpción B (Correcta): la documentación oficial de AWS Step Functions confirma que, cuando el payload de un estado supera el límite de 256 KiB, la práctica recomendada es almacenar los datos grandes en Amazon S3 y pasar solo una referencia entre estados, en lugar de la carga completa (\"Using Amazon S3 ARNs instead of passing large payloads in Step Functions\"). Más específicamente, la integración optimizada de Step Functions con Amazon Bedrock (acción \"arn:aws:states:::bedrock:invokeModel\") admite de forma nativa los campos opcionales \"Input\" y \"Output\", cada uno con una propiedad \"S3Uri\": \"Input\" permite indicar que los datos de entrada (Body) se lean desde un objeto de S3, y \"Output\" permite que la respuesta del modelo se escriba en S3, devolviendo en el resultado del estado solo una referencia a esa ubicación. La propia documentación indica textualmente que si el payload de \"Body\" supera 256 KiB, se recomienda usar \"Input\" (S3Uri) en su lugar. Sobre esa referencia (pequeña, dentro del límite), se pueden usar los campos del Amazon States Language \"ResultSelector\" (para filtrar/transformar el resultado de la tarea antes de combinarlo, por ejemplo quedándose solo con el URI de S3 devuelto) y \"ResultPath\" (para especificar en qué parte del JSON de salida del estado se inserta ese resultado, combinándolo o reemplazando la entrada original). Esto permite mantener el flujo secuencial ReAct entre el generador de descripciones, el validador técnico y el verificador de tono de marca, preservando la observabilidad de Step Functions (Step Functions sigue viendo y registrando cada transición, solo que los datos voluminosos residen en S3) con el mínimo esfuerzo operativo, ya que no requiere Lambdas adicionales de compresión, tablas nuevas ni máquinas de estado adicionales.\n\nOpción C: comprimir y descomprimir las salidas con funciones Lambda antes y después de cada estado añade latencia, complejidad de mantenimiento (lógica de compresión/descompresión duplicada en cada paso) y no resuelve el problema de fondo: para descripciones de producto muy detalladas, con trazas de razonamiento intermedias, el contenido comprimido puede seguir superando 256 KiB, por lo que no es una solución robusta ni de mínimo esfuerzo operativo.\n\nOpción D: dividir el flujo en varias máquinas de estado independientes coordinadas por Amazon EventBridge rompe la orquestación nativa y secuencial de Step Functions, dificulta el seguimiento de una única ejecución de extremo a extremo (la observabilidad se fragmenta entre varias máquinas de estado y el bus de eventos) y añade una capa de coordinación (reglas de EventBridge, gestión de eventos, posibles reintentos) que aumenta significativamente el overhead operativo frente a simplemente enrutar referencias de S3 dentro de la misma máquina de estado.\n\nReferencias: https://docs.aws.amazon.com/step-functions/latest/dg/connect-bedrock.html ; https://docs.aws.amazon.com/step-functions/latest/dg/sfn-best-practices.html ; https://docs.aws.amazon.com/step-functions/latest/dg/input-output-resultpath.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 28,
    questionNumber: 28,
    question: "A company provides a service that helps users from around the world discover new restaurants. The service has 50 million monthly active users. The company wants to implement a semantic search solution across a database that contains 20 million restaurants and 200 million reviews. The company currently stores the data in a PostgresQL database. The solution must support complex natural language queries and return results for at least 95% of queries within 500 ms. The solution must maintain data freshness for restaurant details that update hourly. The solution must also scale cost-effectively during peak usage periods. Which solution will meet these requirements with the LEAST development effort?",
    choices: [
      {
        letter: "A",
        text: "Migrate the restaurant data to Amazon OpenSearch Service. Implement keyword-based search rules that use custom analyzers and relevance tuning to find restaurants based on attributes such as cuisine type, feature, and location. Create Amazon API Gateway HTTP API endpoints to transform user queries into structured search parameters.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Migrate the restaurant data to Amazon OpenSearch Service. Use a foundation model (FM) in Amazon Bedrock to generate vector embeddings from restaurant descriptions, reviews, and menu items. When users submit natural language queries, convert the queries to embeddings by using the same FM. Perform k-nearest neighbors (k-NN) searches to find semantically similar results.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Keep the restaurant data in PostgresQL and implement a pgvector extension. Use a foundation model (FM) in Amazon Bedrock to generate vector embeddings from restaurant data. Store the vector embeddings directly in PostgreSQL. Create an AWS Lambda function to convert natural language queries to vector representations by using the same FM. Configure the Lambda function to perform similarity searches within the database.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Migrate restaurant data to an Amazon Bedrock knowledge base by using a custom ingestion pipeline. Configure the knowledge base to automatically generate embeddings from restaurant information. Use the Amazon Bedrock Retrieve API with built-in vector search capabilities to query the knowledge base directly by using natural language input.",
        isCorrect: false
      }
    ],
    comments: "Opción A: implementar reglas de búsqueda basadas en palabras clave, aunque se apoyen en analizadores personalizados y ajuste de relevancia, sigue siendo búsqueda léxica (coincidencia de términos), no búsqueda semántica. Este enfoque no captura el significado ni la intención de consultas complejas en lenguaje natural (por ejemplo, \"un sitio romántico y tranquilo para cenar cerca del mar\"), por lo que no cumple el requisito central del caso de uso.\n\nOpción B (Correcta): según la documentación oficial de Amazon OpenSearch Service, el servicio ofrece capacidades nativas de \"vector search\" que convierten texto, imágenes u otro contenido en embeddings de alta dimensión y permiten comparar la consulta contra esos vectores mediante búsquedas k-NN (k-nearest neighbors) y k-NN aproximado (HNSW) para encontrar los resultados semánticamente más similares. OpenSearch se integra de forma nativa con Amazon Bedrock para generar esos embeddings a partir de un modelo de fundación (FM), y AWS documenta explícitamente \"semantic search\" y \"RAG (Retrieval Augmented Generation)\" como casos de uso soportados. Con 20 millones de restaurantes y 200 millones de reseñas, migrar los datos a OpenSearch Service, generar embeddings con un FM de Bedrock a partir de descripciones, reseñas y menús, y convertir las consultas del usuario a vectores con ese mismo FM para ejecutar búsquedas k-NN es la arquitectura de referencia de AWS para este escenario: un motor de búsqueda distribuido y gestionado que escala horizontalmente para cumplir la latencia p95 de 500 ms, se adapta de forma coste-eficiente a picos de carga (incluyendo opciones serverless), y admite actualizaciones frecuentes de los datos (freshness horaria) mediante reindexado o ingesta incremental. Todo esto se logra combinando dos servicios totalmente gestionados (OpenSearch Service + Bedrock), lo que representa el menor esfuerzo de desarrollo entre las opciones.\n\nOpción C: usar la extensión pgvector en PostgreSQL y una función Lambda que genere embeddings al vuelo para cada consulta es una solución válida a menor escala, pero PostgreSQL (incluso con pgvector) no está diseñado como motor de búsqueda distribuido de alto rendimiento; escalar índices de similitud vectorial sobre cientos de millones de filas para 50 millones de usuarios activos mensuales, manteniendo el percentil 95 por debajo de 500 ms y un escalado coste-eficiente en picos, exige un esfuerzo de ajuste operativo (sharding, réplicas, tuning de índices HNSW/IVFFlat) considerablemente mayor que aprovechar un motor de búsqueda vectorial gestionado y ya optimizado para ese fin, como OpenSearch.\n\nOpción D: las bases de conocimiento (knowledge bases) de Amazon Bedrock están diseñadas principalmente para flujos RAG a partir de documentos no estructurados (o, en su variante más reciente, mediante conexión directa a almacenes de datos estructurados usando un motor de consultas como Amazon Redshift, sin necesidad de una canalización de ingesta a medida). En este escenario, migrar los datos mediante una \"canalización de ingesta personalizada\" (custom ingestion pipeline) desde PostgreSQL implica desarrollo específico adicional para transformar y sincronizar los datos, lo que supone más esfuerzo que aprovechar directamente OpenSearch Service junto con el modelo de embeddings de Bedrock, que es un patrón de integración ya soportado de forma nativa.\n\nReferencias:\nhttps://docs.aws.amazon.com/opensearch-service/latest/developerguide/vector-search.html\nhttps://docs.aws.amazon.com/opensearch-service/latest/developerguide/semantic-search.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-supported.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 29,
    questionNumber: 29,
    question: "A medical company uses Amazon Bedrock to power a clinical documentation summarization system. The system produces inconsistent summaries when handling complex clinical documents. The system performed well on simple clinical documents. The company needs a solution that diagnoses inconsistencies, compares prompt performance against established metrics, and maintains historical records of prompt versions. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Create multiple prompt variants by using Prompt management in Amazon Bedrock. Manually test the prompts with simple clinical documents. Deploy the highest performing version by using the Amazon Bedrock console.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Implement version control for prompts in a code repository with a test suite that contains complex clinical documents and quantifiable evaluation metrics. Use an automated testing framework to compare prompt versions and document performance patterns.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Deploy each new prompt version to separate Amazon Bedrock API endpoints. Split production traffic between the endpoints. Configure Amazon CloudWatch to capture response metrics and user feedback for automatic version selection.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Create a custom prompt evaluation flow in Amazon Bedrock Flows that applies the same clinical document inputs to different prompt variants. Use Amazon Comprehend Medical to analyze and score the factual accuracy of each version.",
        isCorrect: false
      }
    ],
    comments: "Opción A: Prompt management de Amazon Bedrock sí ofrece versionado nativo de prompts, pero tal como se plantea la opción, las pruebas se realizan manualmente y solo con documentos clínicos simples, es decir, precisamente con los casos donde el sistema ya funciona bien. Esto no permite diagnosticar por qué falla con documentos complejos, no introduce métricas de evaluación establecidas y cuantificables, y desplegar \"la versión de mejor rendimiento\" desde la consola sin una suite de pruebas sistemática no constituye un proceso de comparación objetivo ni reproducible.\n\nOpción B (Correcta): mantener el control de versiones de los prompts en un repositorio de código, junto con una suite de pruebas que incluya específicamente documentos clínicos complejos (los casos problemáticos) y métricas de evaluación cuantificables, y usar un framework de pruebas automatizado para comparar versiones y documentar patrones de rendimiento, cubre exactamente los tres requisitos del enunciado: (1) diagnostica las inconsistencias al ejecutar sistemáticamente los prompts contra los documentos complejos que causan el problema; (2) compara el rendimiento frente a métricas establecidas y cuantificables en lugar de una revisión manual subjetiva; y (3) mantiene un historial reproducible de cada versión de prompt mediante control de versiones. Esta práctica coincide con la guía de AWS Well-Architected (Agentic AI Lens, AGENTOPS02-BP01), que recomienda tratar los prompts con la misma disciplina que el código de aplicación: control de versiones, revisión, pruebas automatizadas, evaluación con criterios de calidad medibles y capacidad de rollback, típicamente implementado combinando Amazon Bedrock Prompt Management (versionado) con Amazon Bedrock Evaluations (puntuaciones cuantificables sobre un dataset estandarizado). La opción B refleja fielmente ese enfoque de \"disciplina de nivel código\" aplicado a prompts.\n\nOpción C: dividir el tráfico de producción entre distintos endpoints y basarse en CloudWatch y feedback de usuario para la selección automática de versión expone a los pacientes/usuarios a versiones no validadas de prompts sin haber realizado antes un diagnóstico controlado ni una comparación con métricas cuantificables; es un enfoque de A/B testing en producción, no de diagnóstico y evaluación previa.\n\nOpción D: Amazon Comprehend Medical está diseñado para extraer y estructurar entidades clínicas (medicamentos, diagnósticos, procedimientos) a partir de texto médico, no para evaluar de forma general la exactitud factual o la calidad de un resumen generado por un LLM, ni para gestionar el versionado de prompts. Aunque Amazon Bedrock Flows permite orquestar la aplicación de distintas variantes de prompt a las mismas entradas, combinarlo con Comprehend Medical no proporciona ni métricas de evaluación de resumen establecidas ni un historial de versiones adecuado para este caso de uso.\n\nReferencias:\nhttps://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops02-bp01.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-version-compare.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-built-in-metrics.html",
    category: "Monitoring & Evaluation",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 30,
    questionNumber: 30,
    question: "A company uses Amazon Bedrock to generate technical content for customers. The company has recently experienced a surge in hallucination outputs when the company's model generates summaries of long technical documents. The model outputs include inaccurate or fabricated details. The company's current solution uses a large foundation model (FM) with a basic one-shot prompt that includes the full document in a single input. The company needs a solution that will reduce hallucinations and meet factual accuracy goals. The solution must process more than 1,000 documents each hour and deliver summaries within 3 seconds for each document. Which combination of solutions will meet these requirements? (Choose two.)",
    choices: [
      {
        letter: "A",
        text: "Implement zero-shot chain-of-thought (CoT) instructions that require step-by-step reasoning with explicit fact verification before the model generates each summary.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Use Retrieval Augmented Generation (RAG) with an Amazon Bedrock knowledge base. Apply semantic chunking and tuned embeddings to ground summaries in source content.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Configure Amazon Bedrock guardrails to block any generated output that matches patterns that are associated with hallucinated content.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Increase the temperature parameter in Amazon Bedrock.",
        isCorrect: false
      },
      {
        letter: "E",
        text: "Prompt the Amazon Bedrock model to summarize each full document in one pass.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): exigir instrucciones de cadena de pensamiento (chain-of-thought, CoT) de tipo zero-shot que obliguen al modelo a razonar paso a paso y a verificar explícitamente los hechos antes de emitir cada resumen es una técnica de prompt engineering reconocida por AWS como mitigación de alucinaciones (\"Model hallucinations and output integrity\"), ya que fuerza al modelo a contrastar internamente sus afirmaciones contra el contenido de origen antes de producir la salida final, en lugar de generar directamente una respuesta sin ese paso intermedio de comprobación.\n\nOpción B (Correcta): usar Retrieval Augmented Generation (RAG) con una base de conocimiento (Knowledge Base) de Amazon Bedrock, aplicando chunking semántico (SEMANTIC chunking strategy) y embeddings ajustados, ancla los resúmenes en los fragmentos de origen realmente relevantes recuperados para cada consulta, en vez de depender de que el modelo procese el documento completo de una sola vez. Esto reduce las fabricaciones porque el modelo solo genera contenido a partir del contexto recuperado, y además ayuda a cumplir el requisito de latencia y volumen (más de 1000 documentos/hora, menos de 3 segundos por documento), ya que se opera sobre fragmentos más pequeños en lugar de sobre el documento íntegro.\n\nOpción C: es incorrecta tal como está formulada. Amazon Bedrock Guardrails no dispone de un filtro que bloquee genéricamente \"patrones asociados a contenido alucinado\". Los content filters de Guardrails detectan categorías de contenido dañino predefinidas (odio, violencia, etc.), no alucinaciones. El mecanismo real de Amazon Bedrock para detectar hallucinations es el contextual grounding check, que calcula puntuaciones de confianza de \"grounding\" (si la respuesta está fundamentada en la fuente proporcionada) y de \"relevance\" (si responde a la consulta del usuario) comparando la respuesta contra una fuente de referencia (grounding source) y una query, bloqueando la respuesta si la puntuación cae por debajo de un umbral configurable (0–0.99). Esta opción describe un mecanismo distinto (bloqueo por patrones) al que realmente existe en el servicio, por lo que no es la respuesta correcta.\n\nOpción D: aumentar el parámetro de temperature incrementa la aleatoriedad y la creatividad en la generación de texto, lo que tiende a aumentar, no a reducir, la probabilidad de que el modelo introduzca información fabricada o inconsistente con la fuente. Es contraria al objetivo de precisión factual que busca la empresa.\n\nOpción E: seguir resumiendo el documento completo en una sola pasada con un prompt básico es exactamente el enfoque actual descrito en el enunciado, que es la causa del problema de alucinaciones. Mantenerlo no introduce ninguna mejora ni ayuda a cumplir los requisitos de precisión, y tampoco resuelve el reto de latencia/escala al forzar el procesamiento de documentos largos completos en cada llamada.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-customize-ingestion.html\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-data-considerations-gen-ai/security.html",
    category: "RAG & Knowledge Bases",
    multiSelect: true,
    requiredCount: 2
  }
];
