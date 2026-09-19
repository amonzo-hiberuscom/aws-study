import { Question } from '../../types';

export const QUESTIONS_PART_4: Question[] = [
  {
    id: 81,
    questionNumber: 81,
    question: "A company uses an organization in AWS Organizations with all features enabled to manage multiple AWS accounts. Employees use Amazon Bedrock across multiple accounts. The company must prevent specific topics and proprietary information from being included in prompts to Amazon Bedrock models. The company must ensure that employees can use only approved Amazon Bedrock models. The company centrally manages IAM roles for employees. Which combination of solutions will meet these requirements? (Choose two.)",
    choices: [
      {
        letter: "A",
        text: "Create an IAM permissions boundary for each employee's IAM role. Configure the permissions boundary to require an approved Amazon Bedrock guardrail identifier to invoke Amazon Bedrock models. Create an SCP that allows employees to use only approved models.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Create an SCP that allows employees to use only approved models. Configure the SCP to require employees to specify a guardrail identifier in calls to invoke an approved model.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Create an SCP that prevents an employee from invoking a model if a centrally deployed guardrail identifier is not specified in a call to the model. Create a permissions boundary on each employee's IAM role that allows each employee to invoke only approved models.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use AWS CloudFormation to create a custom Amazon Bedrock guardrail that has a block filtering policy. Use stack sets to deploy the guardrail to each account in the organization.",
        isCorrect: true
      },
      {
        letter: "E",
        text: "Use AWS CloudFormation to create a custom Amazon Bedrock guardrail that has a mask filtering policy. Use stack sets to deploy the guardrail to each account in the organization.",
        isCorrect: false
      }
    ],
    comments: "Opción A: un permissions boundary de IAM establece el límite máximo de permisos que puede tener un rol, pero no es el mecanismo documentado por AWS para exigir un guardrail concreto en las llamadas de inferencia; AWS documenta la clave de condición bedrock:GuardrailIdentifier para usarse directamente en políticas (incluidas las SCP), por lo que añadir un permissions boundary junto a una SCP que ya restringe los modelos aprobados introduce una capa de gestión redundante sin aportar ninguna capacidad adicional.\n\nOpción B (Correcta): las SCP de AWS Organizations pueden restringir qué IDs de modelo de Amazon Bedrock puede invocar un principal (por ejemplo, limitando el recurso foundation-model/* a los ARN de los modelos aprobados o usando la clave bedrock:modelId) y, adicionalmente, pueden incluir una condición Deny basada en la clave bedrock:GuardrailIdentifier para exigir que toda llamada a InvokeModel, InvokeModelWithResponseStream, Converse o ConverseStream especifique el guardrail (y su versión) aprobado centralmente. Al tratarse de una SCP aplicada en el nivel de la organización, la restricción se hereda de forma centralizada por todas las cuentas miembro sin depender de la configuración de cada cuenta individual, lo que encaja con el requisito de gestión centralizada de roles de IAM.\n\nOpción C: combinar una SCP que exija el guardrail con un permissions boundary en cada rol de IAM que restrinja los modelos aprobados duplica la lógica de control (una SCP ya puede cubrir ambos requisitos, el del guardrail y el de los modelos permitidos) y aumenta la complejidad operativa de mantener dos mecanismos distintos sin ningún beneficio de seguridad adicional frente a una SCP bien diseñada.\n\nOpción D (Correcta): el recurso de CloudFormation AWS::Bedrock::Guardrail permite definir de forma declarativa las distintas salvaguardas de un guardrail, incluida la política de temas denegados (TopicPolicyConfig), que bloquea temas específicos detectados en los prompts o en las respuestas del modelo. Usar StackSets de AWS CloudFormation es el mecanismo estándar de AWS para desplegar el mismo conjunto de recursos (en este caso, el guardrail con su política de bloqueo) de manera consistente y repetible en todas las cuentas de la organización, sin tener que configurar manualmente un guardrail en cada cuenta.\n\nOpción E: la política de enmascarado (mask) de los filtros de información sensible de Bedrock Guardrails anonimiza o redacta la información sensible detectada sustituyéndola por una etiqueta (por ejemplo, {NAME} o {EMAIL}), pero permite que la solicitud o la respuesta continúen procesándose; no impide que el prompt que contiene los temas prohibidos o la información propietaria llegue al modelo. Para \"prevenir\" que dichos temas o datos propietarios se incluyan en los prompts, como exige el enunciado, se necesita una política de bloqueo (block), que corta por completo la solicitud cuando detecta el contenido no permitido, en lugar de una política de enmascarado.\n\nReferencias:\n- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-permissions-id.html\n- https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-bedrock-guardrail.html\n- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html",
    category: "Security & Governance",
    multiSelect: true,
    requiredCount: 2
  },
  {
    id: 82,
    questionNumber: 82,
    question: "A company is designing an API for a generative AI (GenAI) application that uses a foundation model (FM) that is hosted on a managed model service. The API must stream responses to reduce latency, enforce token limits to manage compute resource usage, and implement retry logic to handle model timeouts and partial responses. Which solution will meet these requirements with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Integrate an Amazon API Gateway HTTP API with an AWS Lambda function to invoke Amazon Bedrock. Use Lambda response streaming to stream responses. Enforce token limits within the Lambda function. Implement retry logic for model timeouts by using Lambda and API Gateway timeout configurations.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Connect an Amazon API Gateway HTTP API directly to Amazon Bedrock. Simulate streaming by using client-side polling. Enforce token limits on the frontend. Configure retry behavior by using API Gateway integration settings.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Connect an Amazon API Gateway WebSocket API to an Amazon ECS service that hosts a containerized inference server. Stream responses by using the WebSocket protocol. Enforce token limits within Amazon ECS. Handle model timeouts by using ECS task lifecycle hooks and restart policies.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Integrate an Amazon API Gateway REST API with an AWS Lambda function that invokes Amazon Bedrock. Use Lambda response streaming to stream responses. Enforce token limits within the Lambda function. Implement retry logic by using Lambda and API Gateway timeout configurations.",
        isCorrect: false
      }
    ],
    comments: "Opción A (marcada como correcta en los datos): esta opción propone integrar una HTTP API de Amazon API Gateway con una función de AWS Lambda que invoca Amazon Bedrock, usando Lambda response streaming (mediante la API InvokeWithResponseStream) para emitir tokens de forma incremental, aplicando el límite de tokens dentro del código de la función Lambda y configurando la lógica de reintento a través de los tiempos de espera de Lambda y de API Gateway. El razonamiento original argumenta que esta es la solución con menor esfuerzo operativo porque evita gestionar servidores y porque las HTTP API son más simples y económicas que las REST API para integraciones proxy con Lambda. Sin embargo, existe una imprecisión factual importante: según la documentación oficial de API Gateway, el streaming de la respuesta de una integración proxy (incluida la integración con Lambda mediante InvokeWithResponseStream) \"is only supported for REST APIs\" (solo está soportado en REST API), no en HTTP API. Es decir, tal como está descrita, la arquitectura de la Opción A no permitiría realmente transmitir la respuesta en streaming al cliente a través de la HTTP API, ya que esta capacidad de \"response transfer mode: STREAM\" en integraciones AWS_PROXY/HTTP_PROXY es exclusiva de las REST API. Esto pone en duda que la Opción A sea la respuesta técnicamente correcta.\n\nOpción B: conectar API Gateway directamente a Amazon Bedrock sin una función Lambda intermedia elimina la posibilidad de aplicar lógica personalizada de límite de tokens (Bedrock no ofrece ese control granular por sí mismo desde la integración) y el \"streaming simulado\" mediante polling del lado del cliente no es streaming real: introduce latencia adicional y consumo innecesario de solicitudes, por lo que no cumple el requisito de baja latencia mediante streaming genuino.\n\nOpción C: desplegar un servidor de inferencia en contenedores sobre Amazon ECS, expuesto mediante una WebSocket API, sí permite streaming real (el protocolo WebSocket soporta mensajes incrementales) y un control total sobre límites de tokens y reintentos, pero exige aprovisionar, escalar y mantener un clúster ECS, definiciones de tareas, políticas de reinicio y ciclo de vida de las tareas: esto implica una carga operativa considerablemente mayor que una arquitectura serverless con Lambda, por lo que no es la opción de menor esfuerzo operativo.\n\nOpción D: describe el mismo patrón funcional que la Opción A —una función Lambda que invoca Bedrock usando Lambda response streaming, con el límite de tokens aplicado en el código de la función y la lógica de reintentos gestionada mediante los tiempos de espera de Lambda y de API Gateway— pero integrada con una REST API de API Gateway en lugar de una HTTP API. Las REST API tienen, en general, una configuración algo más compleja y un coste por llamada mayor que las HTTP API para un simple proxy con Lambda; sin embargo, es precisamente el tipo de API que la documentación de AWS exige para poder usar el streaming de la respuesta de una integración proxy de Lambda (el \"response transfer mode\" STREAM solo se admite en REST API, no en HTTP API). Esto significa que, de las cuatro opciones, la D es la única cuya combinación de streaming real de baja latencia y ejecución serverless sin gestión de servidores es efectivamente compatible con las capacidades documentadas de API Gateway, lo que genera una duda razonable sobre si debería ser esta la respuesta marcada como correcta en lugar de la A.\n\n⚠️ Aviso de verificación: aunque la Opción A es la respuesta marcada como correcta (y se mantiene sin cambios), la documentación oficial de Amazon API Gateway (response-transfer-mode.html) indica de forma explícita: \"Response streaming is only supported for REST APIs\" — es decir, el modo de transferencia STREAM para integraciones proxy (incluida la integración proxy de Lambda con response streaming que describe la Opción A) NO está soportado en API Gateway HTTP API, solo en REST API. Esto significa que la combinación descrita en la Opción A (HTTP API + Lambda response streaming) no sería técnicamente viable según la documentación vigente, mientras que la Opción D describe exactamente el mismo patrón mecánico (Lambda response streaming, límites de tokens en la función, reintentos vía timeouts de Lambda/API Gateway) pero usando una REST API, que sí soporta esta función. Se recomienda revisión humana para confirmar si la respuesta correcta debería ser D en lugar de A.\n\nReferencias: https://docs.aws.amazon.com/apigateway/latest/developerguide/response-transfer-mode.html ; https://docs.aws.amazon.com/apigateway/latest/developerguide/response-transfer-mode-lambda.html ; https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html",
    category: "Performance & Scaling",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 83,
    questionNumber: 83,
    question: "A retail company is using Amazon Bedrock to develop a customer service AI assistant. Analysis shows that 70% of customer inquiries are simple product questions that a smaller model can effectively handle. However, 30% of inquiries are complex return policy questions that require advanced reasoning. The company wants to implement a cost-effective model selection framework to automatically route customer inquiries to appropriate models based on inquiry complexity. The framework must maintain high customer satisfaction and minimize response latency. Which solution will meet these requirements with the LEAST implementation effort?",
    choices: [
      {
        letter: "A",
        text: "Create a multi-stage architecture that uses a small foundation model (FM) to classify the complexity of each inquiry. Route simple inquiries to a smaller, more cost-effective model. Route complex inquiries to a larger, more capable model. Use AWS Lambda functions to handle the routing logic.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use Amazon Bedrock intelligent prompt routing to automatically analyze inquiries. Route simple product inquiries to smaller models, and route complex return policy inquiries to more capable larger models.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Implement a single-model solution that uses an Amazon Bedrock mid-sized foundation model (FM) with on-demand pricing. Include special instructions in model prompts to handle both simple and complex inquiries by using the same model.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Create separate Amazon Bedrock endpoints for simple and complex inquiries. Implement a rule-based routing system based on keyword detection. Use on-demand pricing for the smaller model and provisioned throughput for the larger model.",
        isCorrect: false
      }
    ],
    comments: "Opción A: es viable técnicamente, pero requiere diseñar y mantener una arquitectura multietapa propia (un FM adicional actuando como clasificador de complejidad, más funciones AWS Lambda para orquestar la lógica de enrutamiento). Esto implica desarrollo, pruebas y mantenimiento continuo de código personalizado, por lo que no cumple el criterio de \"mínimo esfuerzo de implementación\".\n\nOpción B (Correcta): Amazon Bedrock intelligent prompt routing (enrutamiento inteligente de prompts) es una funcionalidad nativa y totalmente gestionada de Bedrock que expone un único endpoint sin servidor capaz de enrutar cada solicitud entre distintos modelos base dentro de la misma familia de modelos. Internamente, predice dinámicamente la calidad de respuesta que obtendría cada modelo candidato para esa solicitud concreta y la dirige al modelo que ofrece el mejor equilibrio entre calidad y costo (por ejemplo, un modelo pequeño y económico como Claude 3 Haiku o Nova Lite para preguntas sencillas, y un modelo más grande y capaz como Claude 3.5 Sonnet o Nova Pro para consultas complejas de política de devoluciones). Se puede usar mediante \"default prompt routers\" preconfigurados por AWS o configurando un router propio (CreatePromptRouter) sin necesidad de escribir lógica de clasificación ni orquestación personalizada, lo que elimina la complejidad de administración y cumple el requisito de mínimo esfuerzo de implementación, además de optimizar latencia y costo.\n\nOpción C: usar un único modelo de tamaño medio con instrucciones especiales en el prompt para manejar tanto consultas simples como complejas no aprovecha el hecho de que el 70% de las consultas son sencillas y podrían resolverse con un modelo más pequeño y barato; tampoco implementa ningún mecanismo de enrutamiento basado en complejidad, por lo que no optimiza costos ni cumple el objetivo del negocio.\n\nOpción D: crear endpoints separados con un sistema de enrutamiento basado en reglas y detección de palabras clave, combinado con provisioned throughput para el modelo grande, exige diseñar, probar y mantener manualmente las reglas de enrutamiento (con el riesgo de una clasificación poco precisa) y además implica el costo y compromiso de capacidad del provisioned throughput. Esto representa mucho más esfuerzo de implementación y operación que usar el enrutador inteligente nativo de Bedrock.\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html",
    category: "Amazon Bedrock",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 84,
    questionNumber: 84,
    question: "A specialty coffee company has a mobile app that generates personalized coffee roast profiles by using Amazon Bedrock with a three-stage prompt chain. The prompt chain converts user inputs into structured metadata, retrieves relevant logs for coffee roasts, and generates a personalized roast recommendation for each customer. Users in multiple AWS Regions report inconsistent roast recommendations for identical inputs, slow inference during the retrieval step, and unsafe recommendations such as brewing at excessively high temperatures. The company must improve the stability of outputs for repeated inputs. The company must also improve app performance and the safety of the app's outputs. The updated solution must ensure 99.5% output consistency for identical inputs and achieve inference latency of less than 1 second. The solution must also block unsafe or hallucinated recommendations by using validated safety controls. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Deploy Amazon Bedrock with provisioned throughput to stabilize inference latency. Apply Amazon Bedrock guardrails that have semantic denial rules to block unsafe outputs. Use Amazon Bedrock Prompt Management to manage prompts by using approval workflows.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Use Amazon Bedrock Agents to manage chaining. Log model inputs and outputs to Amazon CloudWatch Logs. Use logs from Amazon CloudWatch to perform A/B testing for prompt versions.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Cache prompt results in Amazon ElastiCache. Use AWS Lambda functions to pre-process metadata and to trace end-to-end latency. Use AWS X-Ray to identify and remediate performance bottlenecks.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use Amazon Kendra to improve roast log retrieval accuracy. Store normalized prompt metadata within Amazon DynamoDB. Use AWS Step Functions to orchestrate multistep prompts.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): Amazon Bedrock Provisioned Throughput permite reservar capacidad dedicada (Model Units) para un modelo, en lugar de depender de la capacidad \"on-demand\" compartida por Región; esto elimina la variabilidad de latencia causada por el escalado y limitación de solicitudes de otros clientes, lo que permite mantener la inferencia por debajo de 1 segundo de forma predecible. Amazon Bedrock Guardrails aplica políticas de \"denied topics\" (temas denegados), que usan coincidencia semántica para detectar y bloquear temas o contenidos no permitidos (como recomendar temperaturas de tostado excesivamente altas), junto con filtros de contenido dañino; para reforzar aún más el bloqueo de alucinaciones, Guardrails también ofrece \"contextual grounding checks\" (verificación de fundamentación contextual) y \"Automated Reasoning checks\", pensados específicamente para detectar respuestas no fundamentadas o alucinadas del modelo. Por último, Amazon Bedrock Prompt Management permite crear, versionar, probar variantes y desplegar versiones específicas de un prompt de forma controlada hacia la aplicación, lo que ayuda a mantener la consistencia de las respuestas ante entradas idénticas al fijar una versión validada del prompt en producción (aunque el término \"approval workflows\" no es una función nativa denominada así por AWS, el flujo de creación, prueba, versionado y despliegue controlado de prompts cumple ese propósito). En conjunto, esta combinación cubre los tres requisitos: latencia estable (<1s), consistencia de salida (99.5%) y controles de seguridad validados.\n\nOpción B: Amazon Bedrock Agents permite orquestar cadenas de prompts multi-paso, y el registro en Amazon CloudWatch Logs junto con pruebas A/B de versiones de prompts son útiles para observabilidad y mejora iterativa, pero no aportan capacidad reservada que garantice una latencia de inferencia estable ni controles de seguridad validados (como guardrails) que bloqueen activamente contenido inseguro o alucinado; son medidas reactivas/de diagnóstico, no preventivas.\n\nOpción C: cachear resultados en Amazon ElastiCache podría reducir la latencia solo para solicitudes repetidas (no ayuda con inputs nuevos o variados), y usar AWS Lambda junto con AWS X-Ray sirve para preprocesar metadatos y trazar/diagnosticar cuellos de botella de rendimiento, pero ninguno de estos servicios proporciona controles de seguridad de contenido ni garantiza consistencia de salida del modelo; X-Ray es una herramienta de trazabilidad, no de prevención de contenido inseguro.\n\nOpción D: Amazon Kendra mejora la precisión de la recuperación de información (relevante para la etapa de retrieval de logs de tueste), y AWS Step Functions puede orquestar los pasos de la cadena de prompts, mientras que Amazon DynamoDB almacenaría metadatos normalizados; sin embargo, esta combinación no resuelve la estabilidad de la latencia de inferencia del propio modelo fundacional (el cuello de botella descrito en la etapa de retrieval podría persistir o trasladarse a la etapa de generación) ni añade controles de seguridad validados sobre las recomendaciones generadas por el modelo.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html",
    category: "Performance & Scaling",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 85,
    questionNumber: 85,
    question: "A company is developing a generative AI (GenAI) application by using Amazon Bedrock. The application will analyze patterns and relationships in the company's data. The application will process millions of new data points daily across AWS Regions in Europe, North America, and Asia before storing the data in Amazon S3. The application must comply with local data protection and storage regulations. Data residency and processing must occur within the same continent. The application must also maintain audit trails of the application's decision-making processes and provide data classification capabilities. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Deploy the application in each Region with local IAM policies. Use Amazon Bedrock cross-Region inference to distribute the workload. Use Amazon CloudWatch to log AI decision-making processes and data processing activities. Manually track compliance certifications across Regions.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use SCPs with AWS Organizations to manage location-specific permissions. Use AWS CloudTrail immutable logs to audit the decision-making processes. Import a custom model into Amazon Bedrock and deploy the model to each Region.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use Amazon S3 Object Lock with Region-specific S3 bucket policies. Pre-process the data points within the Region based on geographic origin before sending the data points to Amazon Bedrock. Use Amazon Macie to classify the data. Use AWS CloudTrail immutable logs to audit the decision-making processes.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Create separate AWS accounts for each Region with individual compliance frameworks. Use Amazon SageMaker AI with custom monitoring to track model performance and compliance with data residency requirements. Create manual reports for each regulatory jurisdiction.",
        isCorrect: false
      }
    ],
    comments: "Opción A: la característica de \"cross-Region inference\" de Amazon Bedrock (cuando no se restringe explícitamente a un perfil de inferencia geográfico, como los prefijos \"us.\", \"eu.\" o \"apac.\") puede enrutar la solicitud hacia otras Regiones dentro de un mismo continente o, según cómo se configure, no ofrece por sí sola garantías estrictas frente a un requisito legal de residencia; además, la opción no incorpora ninguna herramienta de clasificación automática de datos (uno de los requisitos explícitos del enunciado) y el seguimiento manual de certificaciones de cumplimiento no es escalable ni auditable de forma fiable frente a millones de registros diarios.\n\nOpción B: las Service Control Policies (SCP) de AWS Organizations gestionan permisos de IAM a nivel de cuenta/OU, pero no controlan ni garantizan dónde se procesan físicamente los datos ni resuelven la clasificación automática de datos sensibles (Macie no aparece en esta opción). Importar un modelo personalizado a Amazon Bedrock y desplegarlo en cada Región soluciona la ubicación de la inferencia, pero no aporta ni el mecanismo de clasificación de datos ni una vía de preprocesamiento por origen geográfico antes del envío al modelo.\n\nOpción C (Correcta): esta es la única opción que cubre las cuatro exigencias del enunciado. El preprocesamiento de los datos dentro de la misma Región según su origen geográfico, antes de enviarlos a Amazon Bedrock, asegura que el procesamiento ocurra en el continente correspondiente (residencia y procesamiento locales). Amazon S3 Object Lock, combinado con políticas de bucket específicas por Región, aplica un modelo WORM (Write Once Read Many) que impide la eliminación o sobrescritura de los objetos durante el periodo de retención configurado, reforzando la inmutabilidad y el cumplimiento normativo por jurisdicción. Amazon Macie proporciona descubrimiento y clasificación automatizados de datos sensibles (PII, datos financieros, etc.) almacenados en Amazon S3 mediante aprendizaje automático y coincidencia de patrones, cubriendo así el requisito de \"capacidades de clasificación de datos\". Finalmente, AWS CloudTrail registra de forma inmutable las llamadas a la API y las actividades de la cuenta, proporcionando el rastro de auditoría necesario sobre el procesamiento y las decisiones tomadas por la aplicación.\n\nOpción D: crear cuentas de AWS separadas por Región con marcos de cumplimiento individuales no garantiza por sí mismo ni la residencia de los datos ni su clasificación automática; usar Amazon SageMaker AI con monitorización personalizada permite vigilar el rendimiento del modelo, pero no sustituye a una herramienta de clasificación de datos como Macie, y generar informes de forma manual para cada jurisdicción regulatoria no es una solución escalable ni auditable de manera consistente.\n\nReferencias:\nhttps://docs.aws.amazon.com/macie/latest/user/what-is-macie.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/geographic-cross-region-inference.html",
    category: "Security & Governance",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 86,
    questionNumber: 86,
    question: "A financial services company is deploying a generative AI (GenAI) application that uses Amazon Bedrock to assist customer service representatives to provide personalized investment advice to customers. The company must implement a comprehensive governance solution that follows responsible AI practices and meets regulatory requirements. The solution must detect and prevent hallucinations in recommendations. The solution must have safety controls for customer interactions. The solution must also monitor model behavior drift in real time and maintain audit trails of all prompt-response pairs for regulatory review. The company must deploy the solution within 60 days. The solution must integrate with the company's existing compliance dashboard and respond to customers within 200 ms. Which solution will meet these requirements with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Configure Amazon Bedrock guardrails to apply custom content filters and toxicity detection. Use Amazon Bedrock Model Evaluation to detect hallucinations. Store prompt-response pairs in Amazon DynamoDB to capture audit trails and set a TTL. Integrate Amazon CloudWatch custom metrics with the existing compliance dashboard.",
        isCorrect: true
      },
      {
        letter: "B",
        text: "Deploy Amazon Bedrock and use AWS PrivateLink to access the application securely. Use AWS Lambda functions to implement custom prompt validation. Store prompt-response pairs in an Amazon S3 bucket and configure S3 Lifecycle policies. Create custom Amazon CloudWatch dashboards to monitor model performance metrics.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use Amazon Bedrock Agents and Amazon Bedrock Knowledge Bases to ground responses. Use Amazon Bedrock Guardrails to enforce content safety. Use Amazon OpenSearch Service to store and index prompt-responses pairs. Integrate OpenSearch Service with Amazon QuickSight to create compliance reports and to detect model behavior drift.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use Amazon SageMaker Model Monitor to detect model behavior drift. Use AWS WAF to filter content. Store customer interactions in an encrypted Amazon RDS database. Use Amazon API Gateway to create custom HTTP APIs to integrate with the compliance dashboard.",
        isCorrect: false
      }
    ],
    comments: "Opción A (Correcta): Amazon Bedrock Guardrails permite configurar filtros de contenido personalizados (categorías como odio, insultos, contenido sexual, violencia y conducta indebida, que en conjunto actúan como \"detección de toxicidad\") como control de seguridad nativo para las interacciones con el cliente, sin necesidad de desarrollar lógica propia. Para la detección de alucinaciones, Amazon Bedrock Model Evaluation incluye la métrica \"faithfulness\" (fidelidad), que mide si la respuesta del modelo contiene información no presente ni inferible del contexto/pasajes proporcionados; esto es útil para comparar y seleccionar modelos antes del despliegue, aunque conviene matizar que el mecanismo de AWS pensado específicamente para detectar y bloquear alucinaciones en tiempo real sobre respuestas en producción es el \"contextual grounding check\" (verificación de fundamentación contextual) dentro de los propios Guardrails de Bedrock, no Model Evaluation (que es fundamentalmente un proceso de evaluación por lotes/offline, no un control que intercepte y bloquee respuestas en vivo). Amazon DynamoDB, al ser una base de datos serverless de latencia de un solo dígito de milisegundos, permite almacenar los pares prompt-respuesta como pista de auditoría aplicando un TTL para su expiración automática, sin gestionar infraestructura ni clústeres. Las métricas personalizadas de Amazon CloudWatch (por ejemplo, a partir del registro de invocaciones de Bedrock) se integran fácilmente con el dashboard de cumplimiento existente. En conjunto, esta combinación de servicios gestionados/serverless de Bedrock, DynamoDB y CloudWatch es la que exige menos configuración e infraestructura propia, cumpliendo el plazo de 60 días y el requisito de latencia de 200 ms con el menor esfuerzo operativo entre las cuatro opciones.\n\nOpción B: usar AWS PrivateLink para el acceso seguro no aporta nada a los requisitos de gobernanza planteados (seguridad de red, no seguridad de contenido); además, construir validación de prompts personalizada en funciones Lambda y crear dashboards personalizados en CloudWatch implica desarrollar y mantener lógica propia de detección de alucinaciones y de toxicidad, en lugar de usar las capacidades nativas de Guardrails, lo que aumenta considerablemente el esfuerzo operativo. Guardar los pares en S3 con políticas de ciclo de vida es válido para retención de bajo coste, pero no sustituye la necesidad de controles de seguridad y detección nativos que sí ofrece la opción A.\n\nOpción C: usar Amazon Bedrock Agents y Knowledge Bases para fundamentar (RAG) las respuestas y Guardrails para la seguridad de contenido es razonable, pero apoyarse en Amazon OpenSearch Service para indexar y almacenar todos los pares prompt-respuesta, y en la integración de OpenSearch con Amazon QuickSight para generar informes de cumplimiento y detectar la deriva del comportamiento del modelo, añade una carga operativa considerable: hay que dimensionar, gestionar y mantener un clúster de OpenSearch, además de construir manualmente la lógica de detección de deriva, algo que no es una capacidad nativa lista para usar de QuickSight ni de OpenSearch.\n\nOpción D: Amazon SageMaker Model Monitor sí está diseñado explícitamente para detectar la deriva de datos y de calidad del modelo, pero exige configurar trabajos de monitorización, líneas base y programaciones adicionales fuera de Bedrock. Combinado con AWS WAF (pensado para filtrar tráfico HTTP malicioso a nivel de red/aplicación, no contenido generado por el modelo), una base de datos Amazon RDS cifrada que hay que aprovisionar, parchear y escalar manualmente, y APIs personalizadas en Amazon API Gateway para integrar con el dashboard de cumplimiento, esta opción requiere mucha más configuración, mantenimiento e integración manual que la combinación de servicios nativos y serverless de Bedrock, DynamoDB y CloudWatch de la opción A.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-content-filters.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-eval-llm-results.html",
    category: "Monitoring & Evaluation",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 87,
    questionNumber: 87,
    question: "A company uses AWS Lake Formation to set up a data lake that contains databases and tables for multiple business units across multiple AWS Regions. The company wants to use a foundation model (FM) through Amazon Bedrock to perform fraud detection. The FM must ingest sensitive financial data from the data lake. The data includes some customer personally identifiable information (PM). The company must design an access control solution that prevents PI I from appearing in a production environment. The FM must access only authorized data subsets that have PH redacted from specific data columns. The company must capture audit trails for all data access. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Create a separate dataset in a separate Amazon S3 bucket for each business unit and Region combination. Configure S3 bucket policies to control access based on IAM roles that are assigned to FM training instances. Use S3 access logs to track data access.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Configure the FM to authenticate by using IAM roles and Lake Formation permissions based on LF-Tag expressions. Define business units and Regions as LF-Tags that are assigned to databases and tables. Use AWS CloudTrail to collect comprehensive audit trails of data access.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Use direct IAM principal grants on specific databases and tables in Lake Formation. Create a custom application layer that logs access requests and further filters sensitive columns before sending data to the FM.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Configure the FM to request temporary credentials from AWS STS. Access the data by using presigned S3 URLs that are generated by an API that applies business unit and Regional filters. Use AWS CloudTrail to collect comprehensive audit trails of data access.",
        isCorrect: false
      }
    ],
    comments: "Opción A: crear un bucket S3 independiente por cada combinación de unidad de negocio y Región no escala bien conforme aumenta el número de unidades de negocio y Regiones (requeriría gestionar N x M buckets y políticas de bucket dispersas), en lugar de aplicar un control de acceso centralizado a nivel del catálogo de datos de Lake Formation. Además, las políticas de bucket de S3 no ofrecen un mecanismo nativo de redactado o filtrado de columnas sensibles (PII), por lo que no cumple el requisito de exponer al FM solo subconjuntos autorizados con las columnas de PII redactadas.\n\nOpción B (Correcta): AWS Lake Formation permite implementar control de acceso basado en etiquetas (LF-TBAC, Lake Formation tag-based access control) mediante LF-Tags: pares clave-valor (por ejemplo, unidad_negocio=finanzas, region=us-east-1) que se asignan a bases de datos, tablas e incluso columnas del Data Catalog. En lugar de crear una concesión (grant) por cada combinación de principal, base de datos y tabla —lo que crece de forma combinatoria—, se conceden permisos sobre expresiones de LF-Tags, lo que escala de forma mucho más eficiente cuando existen múltiples unidades de negocio y Regiones, tal como describe la documentación oficial de Lake Formation. Este mecanismo también admite filtrado a nivel de columna (column-level filters), lo que permite excluir o enmascarar las columnas que contienen PII antes de que los datos lleguen al modelo de Amazon Bedrock, evitando así que la PII aparezca en producción. Por otro lado, AWS CloudTrail registra de forma centralizada las llamadas a la API de Lake Formation, incluidas operaciones como GetDataAccess (cuando un principal o servicio integrado solicita credenciales temporales para acceder a los datos) y las operaciones de concesión/revocación de permisos, proporcionando así el rastro de auditoría completo que exige el enunciado. La combinación de autenticación mediante roles de IAM, permisos LF-TBAC y registro con CloudTrail satisface simultáneamente los tres requisitos: control de acceso granular y escalable, redactado de columnas sensibles y auditoría completa.\n\nOpción C: los grants directos de IAM/Lake Formation sobre bases de datos y tablas específicas (named resource method) no escalan bien conforme crece el número de combinaciones de unidad de negocio y Región, ya que cada nueva combinación requiere concesiones adicionales explícitas. Añadir una capa de aplicación personalizada para registrar accesos y filtrar columnas sensibles introduce complejidad operativa y un punto adicional de fallo, en lugar de aprovechar el filtrado de columnas nativo y las capacidades de auditoría integradas de Lake Formation.\n\nOpción D: usar AWS STS para credenciales temporales junto con URLs prefirmadas de S3 generadas por una API personalizada evita el modelo de permisos centralizado de Lake Formation basado en el Data Catalog. Esta arquitectura obliga a reimplementar manualmente en la API personalizada tanto el filtrado por unidad de negocio/Región como el redactado de columnas con PII, lo que resulta más frágil y difícil de mantener de forma consistente que usar los permisos LF-TBAC y el filtrado de columnas nativos de Lake Formation, aunque CloudTrail sí podría seguir registrando las llamadas a STS.\n\nReferencias:\n- https://docs.aws.amazon.com/lake-formation/latest/dg/tag-based-access-control.html\n- https://docs.aws.amazon.com/lake-formation/latest/dg/logging-using-cloudtrail.html\n- https://docs.aws.amazon.com/lake-formation/latest/dg/access-control-metadata.html",
    category: "Security & Governance",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 88,
    questionNumber: 88,
    question: "A company runs a Retrieval Augmented Generation (RAG) application that uses Amazon Bedrock Knowledge Bases to perform regulatory compliance queries. The application uses the RetrieveAndGenerateStream API. The application retrieves relevant documents from a knowledge base that contains more than 50,000 regulatory documents, legal precedents, and policy updates. The RAG application is producing suboptimal responses because the initial retrieval often returns semantically similar but contextually irrelevant documents. The poor responses are causing model hallucinations and incorrect regulatory guidance. The company needs to improve the performance of the RAG application so it returns more relevant documents. Which solution will meet this requirement with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Deploy an Amazon SageMaker endpoint to run a fine-tuned ranking model. Use an Amazon API Gateway REST API to route requests. Configure the application to make requests through the REST API to rerank the results.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use Amazon Comprehend to classify documents and apply relevance scores. Integrate the RAG application's reranking process with Amazon Textract to run document analysis. Use Amazon Neptune to perform graph-based relevance calculations.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Implement a retrieval pipeline that uses the Amazon Bedrock Knowledge Bases Retrieve API to perform initial document retrieval. Call the Amazon Bedrock Rerank API to rerank the results. Invoke the InvokeModelWithResponseStream operation to generate responses.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use the latest Amazon reranker model through the reranking configuration within Amazon Bedrock Knowledge Bases. Use the model to improve document relevance scoring and to reorder results based on contextual assessments.",
        isCorrect: true
      }
    ],
    comments: "Opción A: desplegar un endpoint de Amazon SageMaker con un modelo de ranking ajustado (fine-tuned), sumado a una API REST propia en Amazon API Gateway para enrutar las peticiones, obliga a la empresa a gestionar infraestructura de cómputo, escalado, actualizaciones del modelo y una capa de integración adicional. Esto añade una sobrecarga operativa considerable frente a usar una capacidad ya integrada en Amazon Bedrock Knowledge Bases.\n\nOpción B: Amazon Comprehend (clasificación de texto/NLP), Amazon Textract (extracción de datos de documentos escaneados) y Amazon Neptune (base de datos de grafos) no son los servicios diseñados para reordenar semánticamente los resultados de una base de conocimiento de Bedrock. Combinarlos para construir una lógica de relevancia basada en grafos es una solución ad-hoc, compleja de mantener y no aprovecha ninguna capacidad nativa de reranking de Bedrock.\n\nOpción C: la Rerank API de Amazon Bedrock (operación Rerank, disponible en el runtime de Agents for Amazon Bedrock) es efectivamente una forma válida de reordenar resultados por relevancia usando un modelo reranker (por ejemplo, de Cohere o Amazon). Sin embargo, en este flujo hay que orquestar explícitamente tres pasos separados: (1) llamar a la Retrieve API de la Knowledge Base, (2) invocar aparte la Rerank API con los documentos recuperados, y (3) llamar a InvokeModelWithResponseStream para generar la respuesta. Esto implica más piezas que coordinar, mantener y depurar que si el reranking se activa directamente dentro de la configuración de la Knowledge Base, por lo que no es la opción de menor sobrecarga operativa.\n\nOpción D (Correcta): Amazon Bedrock Knowledge Bases permite habilitar un modelo de reranking directamente en la configuración de la consulta (la sección \"Reranking\" dentro de las Configurations de la consola, o el campo rerankingConfiguration dentro de vectorSearchConfiguration en las APIs Retrieve/RetrieveAndGenerate/RetrieveAndGenerateStream). Al seleccionar un modelo reranker soportado (por ejemplo, Amazon Rerank 1.0 o modelos de Cohere), Bedrock reordena automáticamente los fragmentos recuperados según su relevancia contextual real respecto a la consulta, sin necesidad de invocar una API adicional por separado ni de desplegar y mantener infraestructura propia (SageMaker, API Gateway, etc.). Esto resuelve directamente el problema de que la recuperación inicial devuelva documentos semánticamente similares pero contextualmente irrelevantes, reduciendo las alucinaciones del modelo, y lo hace con la mínima sobrecarga operativa al tratarse de una simple configuración dentro del servicio administrado, en lugar de una integración multi-servicio.\n\nReferencias:\n- https://docs.aws.amazon.com/bedrock/latest/userguide/rerank-use.html\n- https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-supported.html\n- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 89,
    questionNumber: 89,
    question: "A company is developing a customer communication platform that uses an AI assistant powered by an Amazon Bedrock foundation model (FM). The AI assistant summarizes customer messages and generates initial response drafts. The company wants to use Amazon Comprehend to implement layered content filtering. The layered content filtering must prevent sharing of offensive content, protect customer privacy, and detect potential inappropriate advice solicitation. Inappropriate advice solicitation includes requests for unethical practices, harmful activities, or manipulative behaviors. The solution must maintain acceptable overall response times, so all pre-processing filters must finish before the content reaches the FM. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Use parallel processing with asynchronous API calls. Use toxicity detection for offensive content. Use prompt safety classification for inappropriate advice solicitation. Use personally identifiable information (PII) detection without redaction.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use custom classification to build an FM that detects offensive content and inappropriate advice solicitation. Apply personally identifiable information (PII) detection as a secondary filter only when messages pass the custom classifier.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Deploy a multi-stage process. Configure the process to use prompt safety classification first, then toxicity detection on safe prompts only, and finally personally identifiable information (PII) detection in streaming mode. Route flagged messages through Amazon EventBridge for human review.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use toxicity detection with thresholds configured to 0.5 for all categories. Use parallel processing for both prompt safety classification and personally identifiable information (PII) detection with entity redaction. Apply Amazon CloudWatch alarms to filter metrics.",
        isCorrect: true
      }
    ],
    comments: "Opción A: Es incorrecta. Aunque el procesamiento paralelo con llamadas asíncronas ayuda a minimizar la latencia, realizar la detección de PII \"sin redacción\" no protege realmente la privacidad del cliente: la información sensible (nombres, números de tarjeta, direcciones, etc.) seguiría llegando intacta al modelo fundacional (FM), incumpliendo directamente el requisito de proteger la privacidad del cliente.\n\nOpción B: Es incorrecta. Construir un modelo de clasificación personalizado (custom classification) para detectar contenido ofensivo y solicitudes de consejo inapropiado implica un esfuerzo de entrenamiento, etiquetado y mantenimiento innecesario, cuando Amazon Comprehend ya ofrece de forma nativa, dentro de sus funcionalidades de Trust and Safety, la detección de toxicidad (DetectToxicContent) y la clasificación de seguridad de prompts (prompt safety classification). Además, aplicar la detección de PII solo como filtro secundario \"cuando los mensajes pasan el clasificador personalizado\" introduce una dependencia secuencial que retrasa el filtrado de privacidad y deja una ventana en la que contenido con PII podría procesarse sin la protección adecuada antes de tiempo.\n\nOpción C: Es incorrecta. El enfoque de proceso en varias etapas (primero prompt safety classification, después toxicity detection solo sobre los prompts marcados como seguros, y finalmente PII \"en modo streaming\") encadena las comprobaciones de forma secuencial en lugar de en paralelo, lo que acumula la latencia de cada etapa y contradice el requisito de que todo el preprocesamiento termine antes de invocar al FM manteniendo tiempos de respuesta aceptables. Además, Amazon Comprehend no ofrece una modalidad de detección de PII \"en streaming\": solo ofrece análisis en tiempo real (síncrono, documento a documento, vía ContainsPiiEntities/DetectPiiEntities) o trabajos por lotes asíncronos (StartPiiEntitiesDetectionJob) sobre S3, por lo que ese matiz de la opción es técnicamente inexacto.\n\nOpción D (Correcta): Amazon Comprehend, dentro de su conjunto de funcionalidades de Trust and Safety, ofrece detección de toxicidad (operación DetectToxicContent) con umbrales de confianza configurables por categoría (por ejemplo, 0.5) para categorías como HATE_SPEECH, INSULT, VIOLENCE_OR_THREAT, etc.; clasificación de seguridad de prompts (prompt safety classification, mediante ClassifyDocument) para identificar solicitudes de consejo médico, legal, financiero o de prácticas poco éticas, dañinas o manipuladoras; y detección de entidades PII con redacción. Ejecutar estas comprobaciones en paralelo, en lugar de encadenarlas secuencialmente, es la estrategia que minimiza la latencia acumulada y permite cumplir con el requisito de que el filtrado previo finalice antes de que el contenido llegue al FM. Amazon CloudWatch, por su parte, permite configurar alarmas sobre las métricas resultantes de estas comprobaciones para monitorización operativa.\n\nNota técnica importante encontrada en la documentación oficial de AWS: la redacción de entidades PII en Amazon Comprehend solo está disponible mediante un trabajo asíncrono por lotes (StartPiiEntitiesDetectionJob) sobre documentos almacenados en Amazon S3; el análisis en tiempo real (ContainsPiiEntities/DetectPiiEntities) únicamente localiza las entidades PII, sin producir el texto redactado de forma síncrona. Esto matiza la afirmación de la opción D de ejecutar \"PII con redacción de entidades\" en paralelo de baja latencia junto con las demás comprobaciones. Asimismo, la documentación de AWS señala que la función de \"prompt safety classification\" de Comprehend (empleada en A, C y D) \"ya no está disponible para clientes nuevos\" y recomienda usar Amazon Bedrock Guardrails para esta capacidad en implementaciones nuevas. Aun con estas matizaciones, entre las cuatro opciones presentadas, D sigue siendo la que mejor representa el patrón de diseño recomendado: uso de las funcionalidades nativas de Comprehend, ejecutadas en paralelo (no secuencialmente), con umbrales configurables y redacción de PII activada.\n\nReferencias:\nhttps://docs.aws.amazon.com/comprehend/latest/dg/trust-safety.html\nhttps://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html\nhttps://docs.aws.amazon.com/comprehend/latest/dg/comprehend-availability-change.html",
    category: "Guardrails & Safety",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 90,
    questionNumber: 90,
    question: "A software as a service (SaaS) company is building a recommendation model that uses Amazon SageMaker AI to support an application that recommends airline cabin upgrades to customers. The company will host SageMaker AI models on Amazon Bedrock by using Amazon Bedrock Custom Model Import. Airline companies will use the application to send customized offers to customers. The model must examine the travel history of customers to help make more relevant recommendations. The company stores customer travel history data in an Amazon RDS database. The company must ensure that the application delivers consistent, relevant, and accurate results across multiple airlines and customer populations. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Use Amazon Bedrock Knowledge Bases to implement a RAG architecture to analyze customer travel history data to give the application semantic search capabilities. Use the semantic search capabilities to retrieve relevant booking patterns, preferences, and loyalty information to generate personalized cabin upgrade recommendations. Apply Amazon Bedrock guardrails to filter content. Use AWS Step Functions and AWS Lambda functions to orchestrate validation workflows to reduce hallucinations.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Implement text-to-SQL transformations with SQL validations to accurately retrieve relevant booking patterns, preferences, and loyalty information from the RDS database. Use the results to generate personalized cabin upgrade recommendations. Apply Amazon Bedrock guardrails to filter content. Use AWS Step Functions and AWS Lambda functions to orchestrate validation workflows to reduce hallucinations.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Use Amazon OpenSearch Service to implement vector searches of customer travel history embeddings. Use the vector searches to give the application the ability to perform similarity-based retrieval of booking patterns, preferences, and loyalty information to generate personalized cabin upgrade recommendations. Apply Amazon Bedrock guardrails to filter responses. Use confidence scoring and semantic similarity searches to reduce hallucinations.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Implement text-to-SQL transformations with SQL validations to accurately retrieve relevant booking patterns, preferences, and loyalty information from the RDS database. Use the results to generate personalized cabin upgrade recommendations. Apply Amazon Bedrock guardrails to filter responses. Use confidence scoring and semantic similarity searches to reduce hallucinations.",
        isCorrect: false
      }
    ],
    comments: "Opción A: una arquitectura RAG con Amazon Bedrock Knowledge Bases está diseñada para datos no estructurados o semiestructurados (documentos, PDFs, HTML, contenido multimodal), que se convierten en embeddings vectoriales para hacer búsqueda por similitud semántica. El historial de viajes almacenado en Amazon RDS es un dato estructurado y relacional; según la documentación oficial de AWS, cuando el origen es estructurado no es necesario (ni recomendable) convertirlo en embeddings, porque la búsqueda semántica puede devolver resultados aproximados o imprecisos donde se necesita exactitud transaccional (por ejemplo, sumas de compras, fechas exactas de vuelos o estados de fidelización). Además, la propia funcionalidad de Bedrock Knowledge Bases para \"structured data stores\" únicamente se conecta a Amazon Redshift o AWS Glue Data Catalog, no directamente a Amazon RDS, por lo que este enfoque tampoco encajaría de forma nativa con el origen de datos descrito.\n\nOpción B (Correcta): dado que el historial de viajes de los clientes reside en una base de datos relacional (Amazon RDS), la documentación de AWS confirma que, para datos estructurados, el propio Amazon Bedrock favorece la conversión de lenguaje natural a SQL (text-to-SQL) en lugar de la búsqueda vectorial, precisamente porque permite recuperar de forma determinista y precisa los registros de reservas, preferencias e información de fidelización. Añadir validaciones de las consultas SQL generadas es explícitamente recomendado por AWS, ya que \"la precisión de una consulta SQL generada puede variar según el contexto, el esquema de las tablas y la intención de la consulta del usuario\", por lo que conviene evaluar y validar las consultas antes de usarlas. Aplicar guardrails de Amazon Bedrock filtra el contenido generado (contenido dañino, temas denegados, grounding contextual), y orquestar el flujo completo con AWS Step Functions y funciones Lambda añade una capa determinista de validación adicional (por ejemplo, verificar la sintaxis y el resultado de la consulta antes de generar la recomendación final), lo que reduce alucinaciones de manera más fiable que técnicas puramente probabilísticas, garantizando resultados consistentes entre distintas aerolíneas y poblaciones de clientes.\n\nOpción C: la búsqueda vectorial en Amazon OpenSearch Service mediante similitud semántica es adecuada para contenido no estructurado o para casos de recomendación basados en similitud (por ejemplo, \"clientes parecidos a este\"), pero no ofrece la precisión determinista que exige consultar registros de reservas estructurados y relacionales en RDS; convertir datos tabulares en embeddings para luego \"adivinar\" por similitud introduce un riesgo de imprecisión innecesario cuando existe una vía directa y exacta (SQL) para obtener el dato.\n\nOpción D: describe una solución casi idéntica a la correcta (text-to-SQL con validaciones SQL sobre RDS, más guardrails de Bedrock) pero sustituye la orquestación con AWS Step Functions y AWS Lambda por \"confidence scoring y búsquedas de similitud semántica\" para reducir alucinaciones. Aplicar técnicas de similitud semántica sobre un problema de datos estructurados no tiene sentido metodológico (no hay embeddings ni corpus semántico que comparar) y el confidence scoring por sí solo es una señal probabilística más débil que un flujo de validación explícito y determinista orquestado con Step Functions/Lambda, por lo que esta combinación ofrece menos garantías de consistencia y precisión en un contexto de datos estructurados.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-data.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-generate-query.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html",
    category: "Agents & Orchestration",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 91,
    questionNumber: 91,
    question: "A company is using Amazon Bedrock to develop a customer support AI assistant. The AI assistant must respond to customer questions about their accounts. The AI assistant must not expose personal information in responses. The company must comply with data residency policies by ensuring that all processing occurs within the same AWS Region where each customer is located. The company wants to evaluate how effective the AI assistant is at preventing the exposure of personal information before the company makes the AI assistant available to customers. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Configure a cross-Region Amazon Bedrock guardrail to apply sensitive information filters. Set the guardrail to detect mode during development and testing. Switch to block mode for production deployment.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Configure an Amazon Bedrock guardrail to apply sensitive information filters. Set the guardrail to mask mode during development and testing. Switch to block mode for production deployment. Deploy a copy of the guardrail to each Region where the company operates.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Configure an Amazon Bedrock guardrail to apply content and topic filters. Set the guardrail to detect mode during development, testing, and production. Disable invocation logging for the Amazon Bedrock model.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Configure a cross-Region Amazon Bedrock guardrail to apply a set of content and word filters. Set the guardrail to detect mode during development and testing. Switch to mask mode for production deployment.",
        isCorrect: false
      }
    ],
    comments: "Opción A: los guardrails cross-Region de Amazon Bedrock funcionan mediante un \"guardrail profile\" que enruta las solicitudes de inferencia hacia otras Regiones dentro de la misma geografía (por ejemplo, una solicitud en EE. UU. puede procesarse en cualquier Región de EE. UU.). Según la documentación oficial, aunque la configuración del guardrail se almacena en la Región principal, los prompts de entrada y las respuestas de salida \"podrían moverse fuera de tu Región principal\" al usar inferencia cross-Region. Esto incumple el requisito de la empresa de que todo el procesamiento ocurra exactamente en la misma Región donde está el cliente, por lo que esta opción no es válida independientemente de que use los filtros correctos (información sensible) y el flujo detect→block adecuado.\n\nOpción B (Correcta): los filtros de información sensible (sensitive information filters) son el mecanismo específico de Amazon Bedrock Guardrails diseñado para detectar y gestionar PII (nombres, direcciones, números de tarjeta, etc.) en las entradas y salidas del modelo, ya sea mediante tipos de PII predefinidos o expresiones regulares personalizadas. Estos filtros admiten dos modos: \"mask\" (enmascara la información sensible sustituyéndola por una etiqueta como {NAME} o {EMAIL}, sin bloquear toda la respuesta) y \"block\" (bloquea por completo cualquier contenido en el que se detecte información sensible). Usar el modo mask durante desarrollo y pruebas permite a los desarrolladores ver exactamente qué se está detectando como PII y evaluar la eficacia del guardrail antes de lanzarlo, sin perder la respuesta completa; cambiar a modo block en producción garantiza que ninguna información personal llegue realmente al cliente final. Además, al no usar un guardrail cross-Region sino desplegar una copia independiente del guardrail en cada Región donde opera la empresa, se garantiza que el procesamiento de guardrails permanezca dentro de la misma Región de cada cliente, cumpliendo así la política de residencia de datos. Esta combinación satisface los tres requisitos: filtrado de PII, evaluación previa a producción y cumplimiento de residencia de datos por Región.\n\nOpción C: los filtros de contenido (content filters) y los filtros de tema (denied topics) de Amazon Bedrock Guardrails están diseñados para bloquear contenido dañino (odio, violencia, insultos, etc.) o para restringir que el modelo hable de determinados temas; no son el mecanismo adecuado para detectar y evitar la exposición de información personal identificable, para lo cual existen específicamente los filtros de información sensible. Adicionalmente, deshabilitar el registro de invocaciones (invocation logging) elimina la trazabilidad necesaria para auditar el comportamiento del asistente antes de su lanzamiento, lo cual va en contra de las buenas prácticas de evaluación previa a producción.\n\nOpción D: combina dos problemas. Primero, usa un guardrail cross-Region, que como se explica en la opción A puede mover el procesamiento fuera de la Región exacta del cliente (aunque se mantenga dentro de la misma geografía), incumpliendo el requisito de residencia de datos por Región. Segundo, aplica filtros de contenido y de palabras (word filters) en lugar de filtros de información sensible; los filtros de palabras solo bloquean coincidencias exactas de términos definidos por el usuario y no están diseñados para detectar PII de forma contextual. Por último, mantener el modo mask en producción no impide que la información personal llegue al usuario final (solo la sustituye visualmente en el texto que ya se entregó), a diferencia del modo block, que sí impide la exposición real del contenido.\n\nReferencias: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html ; https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-cross-region.html",
    category: "Guardrails & Safety",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 92,
    questionNumber: 92,
    question: "A university recently digitized a collection of archival documents, academic journals, and manuscripts. The university stores the digital files in an AWS Lake Formation data lake. The university hires a GenAI developer to build a solution to allow users to search the digital files by using text queries. The solution must return journal abstracts that are semantically similar to a user's query. Users must be able to search the digitized collection based on text and metadata that is associated with the journal abstracts. The metadata of the digitized files does not contain keywords. The solution must match similar abstracts to one another based on the similarity of their text. The data lake contains fewer than 1 million files. Which solution will meet these requirements with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Use Amazon Titan Embeddings in Amazon Bedrock to create vector representations of the digitized files. Store embeddings in the OpenSearch Neural Plugin for Amazon OpenSearch Service.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use Amazon Comprehend to extract topics from the digitized files. Store the topics and file metadata in an Amazon Aurora PostgreSQL database. Query the abstract metadata against the data in the Aurora database.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use Amazon SageMaker AI to deploy a sentence-transformer model. Use the model to create vector representations of the digitized files. Store embeddings in an Amazon Aurora PostgreSQL database that has the pgvector extension.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Use Amazon Titan Embeddings in Amazon Bedrock to create vector representations of the digitized files. Store embeddings in an Amazon Aurora PostgreSQL Serverless database that has the pgvector extension.",
        isCorrect: true
      }
    ],
    comments: "Opción A: el plugin neuronal (Neural Search) de Amazon OpenSearch Service permite realizar búsquedas vectoriales, pero requiere aprovisionar y administrar un dominio o clúster de OpenSearch (dimensionamiento de nodos, parches, escalado), lo que implica una carga operativa considerablemente mayor que usar una base de datos relacional serverless con una extensión de vectores integrada.\n\nOpción B: Amazon Comprehend puede extraer temas (topic modeling) o entidades a partir de texto, pero no genera embeddings semánticos de alta dimensionalidad que permitan calcular similitud de significado entre resúmenes. Los \"topics\" que produce son agrupaciones estadísticas de palabras clave, no representaciones vectoriales densas; además, el enunciado indica que los metadatos no contienen palabras clave y que se requiere coincidencia por similitud semántica del texto, no por temas discretos, por lo que esta opción no cumple el requisito funcional.\n\nOpción C: desplegar un modelo sentence-transformer en Amazon SageMaker AI sí generaría embeddings de calidad, pero obliga al desarrollador a aprovisionar, escalar, parchear y mantener los endpoints de inferencia (instancias, contenedores, actualizaciones del modelo), lo cual añade una carga operativa notablemente mayor que consumir un modelo de embeddings totalmente gestionado a través de una API como Amazon Bedrock.\n\nOpción D (Correcta): Amazon Titan Embeddings en Amazon Bedrock es un modelo de embeddings totalmente gestionado (sin servidores que aprovisionar ni mantener) que convierte el texto de los archivos digitalizados en vectores numéricos que capturan su significado semántico. Amazon Aurora PostgreSQL Serverless con la extensión pgvector permite almacenar esos vectores junto con los metadatos relacionales en la misma base de datos y realizar búsquedas de similitud (por ejemplo, mediante distancia coseno o L2) para encontrar resúmenes semánticamente parecidos, además de poder filtrar o combinar la consulta con los metadatos estructurados existentes. Al ser Serverless, Aurora ajusta automáticamente la capacidad según la demanda sin que el equipo tenga que gestionar el escalado, lo cual es coherente con un volumen de menos de 1 millón de archivos y con el objetivo de mínimo esfuerzo operativo. Esta combinación (Titan Embeddings + Aurora PostgreSQL Serverless con pgvector) es, de hecho, una de las opciones de almacén vectorial oficialmente soportadas para Knowledge Bases de Amazon Bedrock, lo que confirma que es una arquitectura validada por AWS para este tipo de caso de uso de RAG/búsqueda semántica.\n\nReferencias: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html\nhttps://docs.aws.amazon.com/rds/latest/auroraextendedcontent/aurora-faq-agentic-ai.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 93,
    questionNumber: 93,
    question: "A financial services company wants to use Amazon Bedrock foundation models (FMs) to analyze call center recordings. When calls end, the call center stores recordings as MP3 files in an Amazon S3 bucket. The company needs to generate summaries and sentiment analysis for the recordings in a structured format as soon as new files are created. The recordings average 20 MB in size. Which combination of solutions will meet these requirements? (Choose two.)",
    choices: [
      {
        letter: "A",
        text: "Use AWS Step Functions to orchestrate a workflow to process the recordings. Configure steps to invoke Amazon Transcribe to convert audio to text, validate job completion, and to invoke an AWS Lambda function to process the text by using Amazon Bedrock FMs to generate structured analysis output.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use AWS Step Functions to orchestrate a workflow to process the recordings. Configure steps to invoke Amazon Transcribe to convert audio to text, validate job completion, and to directly invoke Amazon Bedrock FMs to generate summaries and sentiment analysis in JSON format.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Use AWS Step Functions to orchestrate a workflow to process the recordings. Configure steps to invoke Amazon Transcribe to convert audio to text, validate job completion, and to invoke an AWS Lambda function to create a prompt to invoke Amazon Bedrock FMs to generate structured analysis output.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Configure the source S3 bucket to send events to Amazon EventBridge. Create an EventBridge rule to invoke the Step Functions workflow when an object is created in the bucket.",
        isCorrect: true
      },
      {
        letter: "E",
        text: "Configure the source S3 bucket to send notifications to the Step Functions workflow when an object is created in the bucket.",
        isCorrect: false
      }
    ],
    comments: "Opción A: describe el mismo flujo válido de Step Functions (Transcribe → validación → Lambda → Bedrock), pero no incluye ningún mecanismo que dispare automáticamente el flujo cuando se crea un nuevo archivo en S3. Como la pregunta pide una combinación de dos soluciones que cubran tanto el procesamiento como el disparo automático \"tan pronto se crean los archivos\", esta opción por sí sola es incompleta y no es la mejor pareja frente a C, que sí especifica correctamente el uso de Lambda para dar forma a la salida.\n\nOpción B: invocar directamente los modelos de Amazon Bedrock desde un paso de Step Functions (integración optimizada de servicio) es técnicamente posible, pero no ofrece un lugar natural para construir un prompt personalizado ni para post-procesar/validar la respuesta y garantizar que el resultado tenga el formato JSON estructurado exigido (resumen + análisis de sentimiento). Sin una función Lambda intermedia se pierde la flexibilidad necesaria para ensamblar el prompt con la transcripción y para dar forma/validar la salida estructurada.\n\nOpción C (Correcta): dentro del flujo de trabajo de Step Functions, invocar Amazon Transcribe para convertir el audio (MP3) a texto, validar la finalización del trabajo de transcripción y, a continuación, usar una función AWS Lambda para construir dinámicamente el prompt (incluyendo el texto transcrito) e invocar los modelos de Amazon Bedrock, permite generar el resumen y el análisis de sentimiento en un formato estructurado. Lambda aporta la flexibilidad necesaria para ensamblar el prompt, invocar la API InvokeModel de Bedrock y dar forma/parsear la respuesta en la salida estructurada requerida (por ejemplo JSON), algo que las integraciones directas de servicio en Step Functions no permiten con la misma flexibilidad.\n\nOpción D (Correcta): configurar el bucket S3 de origen para enviar notificaciones de eventos a Amazon EventBridge (activando \"Send notifications to Amazon EventBridge for all events in this bucket\" en las propiedades del bucket) y crear una regla de EventBridge que use la máquina de estados de Step Functions como destino, es el mecanismo nativo y documentado por AWS para iniciar un flujo de trabajo de Step Functions en respuesta a la creación de un objeto en S3, casi en tiempo real. Este patrón está descrito explícitamente en la documentación oficial de AWS Step Functions.\n\nOpción E: Amazon S3 no tiene la capacidad de enviar notificaciones de eventos directamente a una máquina de estados de Step Functions como destino nativo de las notificaciones de eventos de S3 (que solo soportan destinos como SNS, SQS, Lambda o EventBridge). Para iniciar una ejecución de Step Functions a partir de un evento de S3 es obligatorio pasar por Amazon EventBridge (o por una función Lambda intermedia que llame a StartExecution), tal como confirma la documentación oficial.\n\nReferencias:\n- https://docs.aws.amazon.com/step-functions/latest/dg/tutorial-cloudwatch-events-s3.html\n- https://docs.aws.amazon.com/solutions/latest/constructs/aws_s3_stepfunctions.html\n- https://docs.aws.amazon.com/bedrock/latest/userguide/structured-output.html",
    category: "Agents & Orchestration",
    multiSelect: true,
    requiredCount: 2
  },
  {
    id: 94,
    questionNumber: 94,
    question: "A medical device company wants to feed reports of medical procedures that used the company's devices into an AI assistant. To protect patient privacy, the AI assistant must expose patient personally identifiable information (PII) only to surgeons. The AI assistant must redact PII for engineers. The AI assistant must reference only medical reports that are less than 3 years old. The company stores reports in an Amazon S3 bucket as soon as each report is published. The company has already set up an Amazon Bedrock knowledge base. The AI assistant uses Amazon Cognito to authenticate users. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Enable Amazon Macie PII detection on the S3 bucket. Use an S3 trigger to invoke an AWS Lambda function that redacts PII from the reports. Configure the Lambda function to delete outdated documents from the bucket and to invoke knowledge base syncing.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Invoke an AWS Lambda function to sync the S3 bucket and the knowledge base when a new report is uploaded to the bucket. Use a second Lambda function to invoke Amazon Comprehend to detect and redact PII if a user is part of the engineer Cognito user group. Set up an S3 Lifecycle configuration to remove reports that are older than 3 years from the bucket.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Set up an S3 Lifecycle configuration on the bucket to remove reports that are older than 3 years. Schedule an AWS Lambda function to run daily syncs between the bucket and the knowledge base. When users interact with the AI assistant, call the ApplyGuardrail configuration that matches the user's Cognito user group to redact PII from the agent's responses if appropriate.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Create a second knowledge base. Set up an S3 Lifecycle configuration on the bucket to remove reports that are older than 3 years. Invoke an AWS Lambda function that syncs the bucket with the original knowledge base when a new report is uploaded to the bucket. Use Amazon Comprehend to detect and redact PII before syncing the bucket with the second knowledge base. When a user interacts with the AI assistant, redirect the model to the appropriate knowledge base depending on the user's Cognito user group.",
        isCorrect: false
      }
    ],
    comments: "Opción A: Amazon Macie está diseñado para descubrir y clasificar datos sensibles (incluida PII) dentro de un bucket de S3, pero no ofrece un mecanismo para variar qué información se expone según el rol o grupo del usuario que consulta al asistente en tiempo de ejecución; además, redactar los documentos de forma permanente en el bucket destruiría la PII también para los cirujanos, que sí deben poder verla.\n\nOpción B: usar Amazon Comprehend para redactar la PII de forma condicional \"si el usuario pertenece al grupo de ingenieros\" implicaría modificar o generar una copia del contenido en el momento de la ingesta, no en el momento de la consulta; esto no permite servir dinámicamente la misma base de conocimiento con o sin PII según quién esté preguntando en esa sesión, y añade una lógica de sincronización más compleja y menos auditable que aplicar un guardrail en el flujo de inferencia.\n\nOpción C (Correcta): esta es la solución más eficiente y alineada con el diseño nativo de Amazon Bedrock. Una configuración de ciclo de vida de S3 (S3 Lifecycle) puede expirar/eliminar automáticamente los objetos (informes) con más de 3 años de antigüedad, sin necesidad de lógica personalizada. Una función Lambda programada (p. ej., con Amazon EventBridge Scheduler) ejecuta sincronizaciones periódicas entre el bucket de S3 y la base de conocimiento de Amazon Bedrock (iniciando un ingestion job). Y la API ApplyGuardrail de Amazon Bedrock Guardrails se puede invocar de forma independiente y desacoplada de la invocación del modelo fundacional (\"Decoupled from foundation models\"), en cualquier punto del flujo de la aplicación, pasándole el identificador del guardrail (guardrailIdentifier) que corresponda. Esto permite que la aplicación, tras autenticar al usuario con Amazon Cognito e identificar su grupo (cirujano o ingeniero), seleccione dinámicamente qué guardrail aplicar a la salida del asistente: uno que enmascare (ANONYMIZED) la PII detectada por la política de información sensible para ingenieros, y otro que la deje pasar para cirujanos. Todo esto se logra sobre una única base de conocimiento, sin duplicar almacenamiento ni datos.\n\nOpción D: mantener dos bases de conocimiento (una con PII intacta y otra redactada mediante Amazon Comprehend) duplica el almacenamiento, la sincronización y el mantenimiento operativo. Además, Amazon Comprehend es un servicio de NLP para detección de entidades/PII independiente de Bedrock Guardrails, por lo que introduce un mecanismo adicional cuando Bedrock Guardrails ya resuelve el enmascaramiento de PII de forma nativa e integrada con ApplyGuardrail.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-use-independent-api.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html\nhttps://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ApplyGuardrail.html",
    category: "Guardrails & Safety",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 95,
    questionNumber: 95,
    question: "A large ecommerce company has deployed a foundation model (FM) to generate product descriptions. The company's engineering team monitors technical metrics such as token usage, latency, and error rates by using Amazon CloudWatch. The company's marketing team tracks business metrics such as conversion rates and revenue impact in its own systems. The company needs a unified observability solution that correlates technical performance with business outcomes. The solution must provide automatic alerts to stakeholders when operational metrics indicate degradation. The solution must provide comprehensive visibility across both technical and business metrics. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Create CloudWatch dashboards that include technical metrics and imported business metrics. Configure CloudWatch composite alarms that combine technical data and business data. Use Amazon SNS to set up notifications to stakeholders.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Use Amazon Managed Grafana to visualize technical metrics from CloudWatch with business metrics from external sources. Configure Amazon Managed Grafana alerts to invoke AWS Lambda functions. Configure the Lambda functions to remediate issues automatically when metrics exceed predefined thresholds.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Stream CloudWatch metrics to Amazon S3 by using CloudWatch metric streams. Create Amazon QuickSight dashboards to visualize the combined technical metrics and business metrics. Set up Amazon EventBridge rules to send notifications to stakeholders when metrics exceed predefined thresholds.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Configure CloudWatch custom dashboards that integrate operational metrics with imported business metrics. Set up CloudWatch composite alarms with anomaly detection. Use Amazon SNS to create alarm actions to notify stakeholders when correlated metrics indicate performance issues.",
        isCorrect: true
      }
    ],
    comments: "Opción A: también se basa en CloudWatch y SNS, pero las alarmas compuestas que propone combinan únicamente estados de alarma con umbrales estáticos (ALARM/OK/INSUFFICIENT_DATA), sin detección de anomalías. Esto significa que los umbrales son fijos y no se adaptan a los patrones normales de tráfico o estacionalidad de las métricas de negocio y técnicas, por lo que la solución es menos sensible a degradaciones sutiles o graduales que no llegan a cruzar un umbral rígido.\n\nOpción B: Amazon Managed Grafana permite efectivamente visualizar en un solo panel métricas de CloudWatch junto con fuentes de datos externas, y sus alertas pueden invocar funciones Lambda. Sin embargo, el requisito del enunciado es de observabilidad unificada y alertas a las partes interesadas, no de remediación automática; añadir Lambda para \"remediar automáticamente\" introduce una capa de automatización y complejidad operativa (aprovisionar y mantener un servicio adicional, definir lógica de remediación seguRA) que va más allá de lo que se pide y que puede ser arriesgada si se dispara sin supervisión humana.\n\nOpción C: CloudWatch Metric Streams permite exportar métricas casi en tiempo real hacia un destino (típicamente Kinesis Data Firehose, no directamente S3) para su posterior consumo por servicios de análisis como QuickSight, y EventBridge puede generar notificaciones basadas en reglas. Aun siendo técnicamente viable, esta cadena (metric streams -> S3 -> QuickSight -> EventBridge) es una arquitectura de analítica de datos considerablemente más compleja y con mayor latencia que usar directamente los dashboards y alarmas nativas de CloudWatch, cuando el requisito no exige análisis histórico avanzado ni un data lake.\n\nOpción D (Correcta): los dashboards personalizados de CloudWatch permiten combinar en una sola vista las métricas técnicas nativas (uso de tokens, latencia, tasa de error) con métricas de negocio importadas como métricas personalizadas (por ejemplo, mediante PutMetricData) como conversión e ingresos. Las alarmas compuestas de CloudWatch (composite alarms) usan expresiones de reglas con lógica booleana que evalúan el estado (ALARM, OK, INSUFFICIENT_DATA) de varias alarmas subyacentes; al incorporar detección de anomalías en esas alarmas subyacentes, la solución identifica desviaciones respecto al comportamiento normal aprendido en lugar de depender solo de umbrales fijos, lo que permite correlacionar de forma más precisa la degradación operativa con el impacto en el negocio. Las alarmas compuestas admiten como acción notificar a un topic de Amazon SNS, que distribuye la notificación a las partes interesadas cuando la alarma correlacionada indica un problema de rendimiento. Esta combinación de dashboards nativos, alarmas compuestas con detección de anomalías y SNS satisface el requisito con la arquitectura más simple, totalmente nativa de CloudWatch.\n\nReferencias: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-combining.html ; https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-actions.html ; https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html",
    category: "Monitoring & Evaluation",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 96,
    questionNumber: 96,
    question: "A GenAI developer is evaluating Amazon Bedrock foundation models (FMs) to enhance a Europe-based company's internal business application. The company has a multi-account landing zone in AWS Control Tower. The company uses SCPs to allow its accounts to use only the eu-north-1 Region and the eu-west-1 Region. All customer data must remain in private networks within the approved AWS Regions. The GenAI developer selects an FM based on analysis and testing and hosts the model in the eu-central-1 Region and the eu-west-3 Region. The GenAI developer must enable access to the FM for the company's employees. The GenAI developer must ensure that requests to the FM are private and remain with the same Regions as the FM. Which solution will meet these requirements?",
    choices: [
      {
        letter: "A",
        text: "Deploy an AWS Lambda function that is exposed by a private Amazon API Gateway REST API to a VPC in eu-north-1. Create a VPC endpoint for the selected FM in eu-central-1 and eu-west-3. Extend existing SCPs to allow employees to use the FM. Integrate the REST API with the business application.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Deploy the FM on Amazon EC2 instances in eu-north-1. Deploy a private Amazon API Gateway REST API in front of the EC2 instances. Configure an Amazon Bedrock VPC endpoint. Integrate the REST API with the business application.",
        isCorrect: false
      },
      {
        letter: "C",
        text: "Configure the FM to use cross-Region inference through an eu.amazon.* endpoint to ensure that all calls remain within Europe. Configure an Amazon Bedrock VPC endpoint. Extend existing SCPs to allow employees to use the FM through inference profiles in Europe-based Regions where the FM is available. Use an inference profile to integrate Amazon Bedrock with the business application.",
        isCorrect: true
      },
      {
        letter: "D",
        text: "Deploy the FM in Amazon SageMaker AI in eu-north-1. Configure a SageMaker AI VPC endpoint. Extend existing SCPs to allow employees to use the SageMaker AI endpoint. Integrate the FM in SageMaker AI with the business application.",
        isCorrect: false
      }
    ],
    comments: "Opción A: desplegar una función Lambda expuesta por una API REST privada de API Gateway en eu-north-1 no resuelve el enrutamiento hacia el modelo alojado en eu-central-1 y eu-west-3. Un VPC endpoint del modelo garantiza que el tráfico hacia Bedrock no salga a Internet público, pero no evita que las solicitudes crucen fuera del área geográfica de forma controlada ni sustituye el mecanismo nativo de Bedrock (inference profiles) para mantener las solicitudes dentro de una geografía concreta; además, obliga a construir y mantener una capa de enrutamiento personalizada que Bedrock ya ofrece de forma nativa.\n\nOpción B: los modelos fundacionales de Amazon Bedrock se consumen como un servicio totalmente gestionado a través de la API de Bedrock (InvokeModel, etc.); no es posible ni necesario \"desplegar\" el FM directamente en instancias EC2, ya que Bedrock no distribuye los pesos del modelo para autoalojamiento de esta forma. Colocar una API Gateway privada delante de EC2 no tiene sentido en este contexto y no aprovecha ninguna capacidad nativa de Bedrock para mantener el tráfico dentro de Europa.\n\nOpción C (Correcta): Amazon Bedrock ofrece \"cross-Region inference\" mediante perfiles de inferencia (inference profiles), y dentro de esta capacidad existen los perfiles geográficos (Geographic cross-Region inference), identificados por un prefijo como \"eu.\", \"us.\" o \"apac.\" en el ID del modelo. Según la documentación oficial, las solicitudes enviadas a un inference profile geográfico permanecen dentro de esa geografía (por ejemplo, Europa), de modo que aunque el modelo esté alojado en eu-central-1 y eu-west-3, Bedrock enruta automáticamente la inferencia entre las Regiones europeas soportadas por ese perfil sin salir del continente, y todo el tráfico entre Regiones viaja cifrado por la red interna de AWS sin pasar por Internet público. Configurar un VPC endpoint de interfaz (AWS PrivateLink) para Bedrock asegura que las solicitudes desde la VPC de los empleados hacia el servicio permanezcan dentro de la red privada. Por último, la documentación de AWS indica explícitamente que cuando las SCP bloquean Regiones no utilizadas, es necesario ampliarlas para permitir el acceso a todas las Regiones de destino incluidas en el perfil de inferencia geográfico (en este caso, además de eu-north-1 y eu-west-1, también eu-central-1 y eu-west-3), y usar dicho inference profile para integrar Bedrock con la aplicación de negocio. Esta combinación cubre exactamente los tres requisitos: privacidad de red, permanencia geográfica y acceso habilitado para los empleados.\n\nOpción D: el desarrollador ya seleccionó y alojó el modelo en Amazon Bedrock tras su análisis y pruebas; volver a desplegarlo en Amazon SageMaker AI en eu-north-1 supone duplicar trabajo, no reutiliza el modelo evaluado en Bedrock y renuncia a los inference profiles geográficos de Bedrock, que son el mecanismo diseñado específicamente para mantener las solicitudes de inferencia dentro de una región o geografía concreta.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/geographic-cross-region-inference.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html",
    category: "Security & Governance",
    multiSelect: false,
    requiredCount: 1
  },
  {
    id: 97,
    questionNumber: 97,
    question: "A healthcare company is developing an application to process medical queries. The application must answer complex queries with high accuracy by reducing semantic dilution. The application must refer to domain-specific terminology in medical documents to reduce ambiguity in medical terminology. The application must be able to respond to 1,000 queries each minute with response times less than 2 seconds. Which solution will meet these requirements with the LEAST operational overhead?",
    choices: [
      {
        letter: "A",
        text: "Use Amazon API Gateway to route incoming queries to an Amazon Bedrock agent. Configure the agent to use an Anthropic Claude model to decompose queries and an Amazon Titan model to expand queries. Create an Amazon Bedrock knowledge base to store the reference medical documents.",
        isCorrect: false
      },
      {
        letter: "B",
        text: "Configure an Amazon Bedrock knowledge base to store the reference medical documents. Enable query decomposition in the knowledge base. Configure an Amazon Bedrock flow that uses a foundation model (FM) and the knowledge base to support the application.",
        isCorrect: true
      },
      {
        letter: "C",
        text: "Use Amazon SageMaker Al to host custom ML models for both query decomposition and query expansion. Configure Amazon Bedrock knowledge bases to store the reference medical documents. Encrypt the documents in the knowledge base.",
        isCorrect: false
      },
      {
        letter: "D",
        text: "Create an Amazon Bedrock agent to orchestrate multiple AWS Lambda functions to decompose queries. Create an Amazon Bedrock knowledge base to store the reference medical documents. Use the agent's built-in knowledge base capabilities. Add deep research and reasoning capabilities to the agent to reduce ambiguity in the medical terminology.",
        isCorrect: false
      }
    ],
    comments: "Opción A: construir manualmente un paso de descomposición de consultas con un modelo Anthropic Claude y otro de expansión de consultas con un modelo Amazon Titan, todo orquestado a través de un agente de Amazon Bedrock, requiere diseñar prompts personalizados, gestionar dos modelos distintos y mantener la lógica de orquestación entre ellos. Esto añade complejidad de desarrollo y operación innecesaria cuando Amazon Bedrock Knowledge Bases ya ofrece la descomposición de consultas (query decomposition) como una capacidad nativa configurable.\n\nOpción B (Correcta): Amazon Bedrock Knowledge Bases admite una transformación de consulta de tipo QUERY_DECOMPOSITION (configurable mediante QueryTransformationConfiguration en la API, o desde la consola) que divide automáticamente una consulta compleja en subconsultas más simples antes de la recuperación, lo que reduce la dilución semántica y mejora la precisión al enfocar cada subconsulta en un concepto o término médico específico. Amazon Bedrock Flows, por su parte, permite construir de forma visual y totalmente gestionada un flujo que conecta un nodo de modelo fundacional (FM) con un nodo de base de conocimiento (Knowledge Base node, respaldado por KnowledgeBaseOrchestrationConfiguration), sin necesidad de escribir ni mantener código de orquestación personalizado, funciones Lambda adicionales o agentes complejos. Esta combinación (KB con descomposición de consultas activada + Flow gestionado) satisface los requisitos de reducir la ambigüedad terminológica y de baja latencia/alto rendimiento con el mínimo esfuerzo operativo, ya que ambos componentes son totalmente administrados por AWS.\n\nOpción C: alojar modelos personalizados en Amazon SageMaker AI para realizar tanto la descomposición como la expansión de consultas obliga a entrenar o ajustar esos modelos, desplegarlos en endpoints, gestionar su escalado para soportar 1000 solicitudes por minuto y mantener su ciclo de vida completo (actualizaciones, monitorización, parcheo), lo que representa un esfuerzo operativo mucho mayor que usar la funcionalidad nativa de Bedrock Knowledge Bases. Cifrar los documentos en la base de conocimiento es una buena práctica, pero no resuelve el requisito principal de reducir la dilución semántica con el menor esfuerzo.\n\nOpción D: usar un agente de Amazon Bedrock para orquestar múltiples funciones AWS Lambda personalizadas que descompongan las consultas, en lugar de aprovechar la capacidad nativa de descomposición de consultas de la base de conocimiento, introduce complejidad adicional de desarrollo, pruebas y mantenimiento de código. Añadir capacidades de \"deep research\" y razonamiento al agente incrementa aún más la latencia y el overhead operativo, lo que dificulta cumplir el requisito de tiempos de respuesta inferiores a 2 segundos con 1000 consultas por minuto.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_QueryTransformationConfiguration.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/flows-nodes.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html",
    category: "RAG & Knowledge Bases",
    multiSelect: false,
    requiredCount: 1
  }
];
