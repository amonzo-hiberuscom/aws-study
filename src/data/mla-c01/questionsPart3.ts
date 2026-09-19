import { Question } from '../../types';

export const QUESTIONS_PART_3: Question[] = [
  {
    "id": 20119,
    "questionNumber": 119,
    "question": "A company is exploring generative AI and wants to add a new product feature. An ML engineer is making API calls from existing Amazon EC2 instances to Amazon Bedrock. The EC2 instances are in a private subnet and must remain private during the implementation. The EC2 instances have an assigned security group that allows access to all IP addresses in the private subnet. What should the ML engineer do to establish a connection between the EC2 instances and Amazon Bedrock?",
    "choices": [
      {
        "letter": "A",
        "text": "Modify the security group to allow inbound and outbound traffic to and from Amazon Bedrock.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS PrivateLink to access Amazon Bedrock through an interface VPC endpoint.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Configure Amazon Bedrock to use the private subnet where the EC2 instances are deployed.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Link the existing VPC to Amazon Bedrock by using an AWS Direct Connect connection.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Los grupos de seguridad controlan el tráfico a nivel de red dentro de la VPC, pero Amazon Bedrock es un servicio administrado fuera de la VPC del cliente accesible por defecto vía endpoints públicos; modificar únicamente el security group no crea una ruta de red privada hacia Bedrock ni resuelve el requisito de mantener las instancias privadas sin salida a Internet.\n\nOpción B (Correcta): La documentación oficial de Amazon Bedrock describe el uso de \"interface VPC endpoints (AWS PrivateLink)\" para crear una conexión privada entre una VPC y Amazon Bedrock, permitiendo que el tráfico de la VPC llegue al servicio sin atravesar la Internet pública. Esto es exactamente el mecanismo diseñado para que instancias EC2 en una subred privada llamen a la API de Bedrock manteniéndose privadas.\n\nOpción C: Amazon Bedrock es un servicio totalmente administrado por AWS; no se puede \"configurar\" para que se ejecute dentro de la subred privada de un cliente, ya que no reside dentro de la VPC del cliente.\n\nOpción D: AWS Direct Connect establece una conexión de red dedicada entre un centro de datos on-premises y AWS, no es el mecanismo para conectar de forma privada una VPC existente con un servicio administrado como Bedrock (para eso se usan VPC endpoints/PrivateLink).\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20120,
    "questionNumber": 120,
    "question": "A company wants to launch a new internal generative AI interface to answer user questions. The interface will be based on a popular open source large language model (LLM). Which combination of steps will deploy the interface with the LEAST operational overhead? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon SageMaker JumpStart to deploy the LLM.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Download the LLM as a .zip file. Deploy the LLM on a GPU-based Amazon EC2 instance.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a frontend HTML interface that uses an Amazon API Gateway WebSocket API with AWS Lambda functions to handle the user interaction.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon QuickSight to create a UI to handle the user interaction.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Use Amazon Lex to create a UI to handle the user interaction.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A (Correcta): Amazon SageMaker JumpStart permite desplegar modelos fundacionales de código abierto populares con \"un clic\" (deploy publicly available foundation models mediante la clase JumpStartModel), sin necesidad de descargar manualmente pesos del modelo, aprovisionar infraestructura desde cero, ni escribir código de servicio de inferencia. Es la forma de menor esfuerzo operativo de desplegar el LLM.\n\nOpción B: Descargar manualmente el LLM como .zip y desplegarlo sobre una instancia EC2 con GPU requiere gestionar toda la infraestructura, el entorno, los drivers de GPU y el servidor de inferencia manualmente, lo que representa el mayor esfuerzo operativo entre todas las opciones de despliegue.\n\nOpción C: Construir una interfaz HTML personalizada junto con una API WebSocket de API Gateway y funciones Lambda implica desarrollo y mantenimiento de una aplicación web completa a medida, mucho más esfuerzo que usar un servicio de interfaz conversacional administrado.\n\nOpción D: Amazon QuickSight es una herramienta de business intelligence (dashboards y visualización de datos), no está diseñada para construir interfaces conversacionales de preguntas y respuestas con un LLM.\n\nOpción E (Correcta): Amazon Lex V2 es un servicio totalmente administrado para construir interfaces conversacionales; la documentación indica que \"escala automáticamente sin necesidad de aprovisionar infraestructura\", lo que lo convierte en la opción de menor esfuerzo operativo para implementar la interfaz de usuario que gestiona la interacción con el usuario final, en comparación con construir un frontend personalizado.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-use-python-sdk-model-class.html\nhttps://docs.aws.amazon.com/lexv2/latest/dg/what-is.html",
    "category": "Deployment & Orchestration",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 20121,
    "questionNumber": 121,
    "question": "A company wants to build a real-time analytics application that uses streaming data from social media. An ML engineer must implement a solution that ingests and transforms 5 GB of data each minute. The solution also must load the data into a data store that supports fast queries for the real-time analytics. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon EventBridge to ingest the social media data. Use AWS Glue to transform the data. Store the transformed data in Amazon ElastiCache (Memcached).",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon Simple Queue Service (Amazon SQS) to ingest the social media data. Use AWS Lambda to transform the data. Store the transformed data in Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon Simple Notification Service (Amazon SNS) to ingest the social media data. Use Amazon EMR to transform the data. Store the transformed data in Amazon RDS.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon Kinesis Data Streams to ingest the social media data. Use Amazon Managed Service for Apache Flink to transform the data. Store the transformed data in Amazon DynamoDB.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: EventBridge es un bus de eventos para arquitecturas basadas en eventos, no un servicio diseñado para ingerir de forma continua 5 GB/minuto de datos en streaming; Glue es un servicio de ETL por lotes/microlotes, no de streaming continuo de baja latencia; ElastiCache (Memcached) no ofrece persistencia ni replicación adecuadas como almacén analítico duradero.\n\nOpción B: SQS es una cola de mensajes con un modelo de rendimiento no pensado para ingesta de streaming de alto volumen sostenido como Kinesis; Lambda transformando y almacenando en S3 no ofrece las 'consultas rápidas' requeridas para analítica en tiempo real, ya que S3 no está optimizado para lecturas de baja latencia por clave.\n\nOpción C: SNS es un servicio de pub/sub para notificaciones, no un servicio de ingesta ordenada y duradera de streaming a ese volumen; usar EMR para transformación continua de baja latencia añade mucha más sobrecarga operativa que un servicio gestionado de streaming; RDS es un almacén relacional no optimizado para el patrón de lectura de alto rendimiento y baja latencia de una app de analítica en tiempo real.\n\nOpción D (Correcta): Amazon Kinesis Data Streams está diseñado específicamente para ingerir datos de streaming de alto rendimiento (escalando mediante shards para volúmenes de GB/minuto); Amazon Managed Service for Apache Flink permite procesamiento y transformación de streams en tiempo real y baja latencia; DynamoDB ofrece lecturas/escrituras de milisegundos de un solo dígito, ideal para las consultas rápidas que requiere una aplicación de analítica en tiempo real.\n\nReferencias:\nhttps://docs.aws.amazon.com/whitepapers/latest/big-data-analytics-options/amazon-kinesis.html\nhttps://docs.aws.amazon.com/whitepapers/latest/build-modern-data-streaming-analytics-architectures/build-modern-data-streaming-analytics-architectures.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20122,
    "questionNumber": 122,
    "question": "A company stores training data as a .csv file in an Amazon S3 bucket. The company must encrypt the data and must control which applications have access to the encryption key. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new SSH access key. Use the AWS Encryption CLI with a reference to the new access key to encrypt the file.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a new API key by using the Amazon API Gateway CreateApiKey API operation. Use the AWS CLI with a reference to the new API key to encrypt the file.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a new IAM role. Attach a policy that allows the AWS Key Management Service (AWS KMS) GenerateDataKey action. Use the role to encrypt the file.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a new AWS Key Management Service (AWS KMS) key. Use the AWS Encryption CLI with a reference to the new KMS key to encrypt the file.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: El AWS Encryption CLI no utiliza claves de acceso SSH; SSH no es un tipo de credencial soportado por el AWS Encryption SDK/CLI, por lo que este planteamiento es técnicamente inválido.\n\nOpción B: CreateApiKey de API Gateway genera claves para planes de uso/limitación de peticiones de una API, no tiene relación alguna con el cifrado de archivos ni produce una clave criptográfica utilizable para ese fin.\n\nOpción C: Crear un rol IAM con una política que permita kms:GenerateDataKey permite a ese rol usar una clave KMS YA EXISTENTE para generar claves de datos, pero no crea ni es propietaria de una nueva clave administrada por el cliente (CMK) con una política de clave propia; sin una CMK dedicada y su política de clave, no se define de forma explícita 'qué aplicaciones' pueden usar la clave.\n\nOpción D (Correcta): AWS KMS permite crear una clave administrada por el cliente (CMK) con una política de clave (key policy) e IAM que determina exactamente qué principales/aplicaciones pueden usarla (kms:Encrypt, kms:Decrypt, kms:GenerateDataKey); el AWS Encryption CLI (parte del AWS Encryption SDK) puede referenciar el ID/ARN de esa clave KMS como clave maestra para cifrar el archivo del lado del cliente, cumpliendo ambos requisitos: cifrar los datos y controlar qué aplicaciones acceden a la clave mediante su política.\n\nReferencias:\nhttps://docs.aws.amazon.com/kms/latest/developerguide/control-access.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20123,
    "questionNumber": 123,
    "question": "A company needs to perform feature engineering, aggregation, and data preparation. After the features are produced, the company must implement a solution on AWS to process and store the features. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon SageMaker Feature Processing to process and ingest the data. Use SageMaker Feature Store to manage and store the features.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use Amazon SageMaker Model Monitor to automatically ingest and transform the data. Create an Amazon S3 bucket to store the features in JSON format.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon Managed Service for Apache Flink to transform the data and to ingest the data directly into Amazon SageMaker Feature Store. Use Feature Store to manage and store the features.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use an Amazon SageMaker batch transform job to analyze, transform, and ingest the data. Create an Amazon DynamoDB table to store the features.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): SageMaker Feature Store Feature Processing (Feature Processor SDK) es una capacidad diseñada específicamente para definir funciones de transformación (ingeniería de características/agregación) e ingerir el resultado directamente en Feature Store, encargándose SageMaker de la infraestructura y los pipelines subyacentes; encaja de forma directa con 'procesar... y almacenar las features' con la mínima infraestructura adicional.\n\nOpción B: SageMaker Model Monitor está diseñado para detectar drift y problemas de calidad de datos/modelo en producción, no para ingerir/transformar datos crudos en features; almacenar JSON en S3 tampoco usa Feature Store para gestionar las features, como exige el requisito.\n\nOpción C: Managed Service for Apache Flink + ingesta directa en Feature Store es un patrón válido para datos en streaming, pero el enunciado no exige streaming; Feature Processing (opción A) es la capacidad gestionada y de propósito específico que encaja mejor con el flujo de ingeniería de características por lotes descrito.\n\nOpción D: El batch transform de SageMaker sirve para generar inferencia por lotes a partir de un modelo ya entrenado, no para ingeniería de características/preparación de datos; además, almacenar las features en DynamoDB evita usar Feature Store para gestionarlas, incumpliendo el requisito.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/feature-store-feature-processing.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20124,
    "questionNumber": 124,
    "question": "A company is developing a new online application to gather information from customers. An ML engineer has developed a new ML model that will determine a score for each customer. The model will use the score to determine which product to display to the customer. The ML engineer needs to minimize response-time latency for the model. How should the ML engineer deploy the application in Amazon SageMaker to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure batch transform.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure a real-time inference endpoint.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Configure a serverless inference endpoint.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure an asynchronous inference endpoint.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: El batch transform se ejecuta de forma offline sobre un lote de datos almacenados, sin endpoint persistente; introduce latencia de arranque del job, inadecuada para puntuar a un cliente concreto de forma interactiva y de baja latencia.\n\nOpción B (Correcta): Un endpoint de inferencia en tiempo real de SageMaker es un endpoint persistente, con auto escalado y gestionado, diseñado precisamente para cargas de trabajo de baja latencia e interactivas, que es exactamente lo que se requiere para minimizar la latencia de respuesta.\n\nOpción C: Serverless Inference está optimizado para tráfico intermitente/impredecible y coste, pero introduce latencia de cold start al escalar desde cero, lo que entra en conflicto con el requisito explícito de minimizar la latencia de respuesta.\n\nOpción D: La inferencia asíncrona encola las peticiones y devuelve el resultado más tarde (no de forma síncrona); está pensada para payloads grandes/procesamiento largo, justo lo contrario de minimizar la latencia en un flujo interactivo cara al cliente.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20125,
    "questionNumber": 125,
    "question": "A company is using Amazon EMR. The company has a large dataset in Amazon S3 that needs to be ingested into Amazon SageMaker Feature Store. The dataset contains historical data and real-time streaming data. The company must ensure that the Feature Store online store is updated with the most recent data as soon as the data becomes available. The company also must maintain a complete Feature Store offline store for batch processing. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use the PutRecord API in Feature Store Runtime to ingest all the data into the online store.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use the PutRecord API in Feature Store Runtime to ingest all the data into the offline store.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the Feature Store Spark connector to ingest the data as Spark DataFrames with the online store and offline store enabled.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use the Feature Store Spark connector to ingest the data as Spark DataFrames with only the online store enabled.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: PutRecord ingiere un registro a la vez únicamente en el online store; no es un mecanismo eficiente para ingerir masivamente un gran dataset histórico desde S3, y por sí solo no puebla el offline store.\n\nOpción B: PutRecord es la API del online store; no es el mecanismo para ingesta masiva/por lotes de un dataset histórico grande, y tampoco pobla por sí solo el offline store.\n\nOpción C (Correcta): El modo de ingesta por defecto del Spark connector de Feature Store (cuando no se restringe target_stores), con online y offline store habilitados en el feature group, escribe primero en el online store mediante PutRecord (dato más reciente) y en un plazo de hasta ~15 minutos también en el offline store — cumpliendo a la vez el requisito de frescura en el online store y de completitud del offline store para batch, todo desde un único job de Spark en EMR.\n\nOpción D: Habilitar solo el online store cumpliría la frescura de los datos, pero no mantendría un offline store completo para procesamiento por lotes, incumpliendo un requisito explícito del enunciado.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/batch-ingestion-spark-connector-setup.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20126,
    "questionNumber": 126,
    "question": "An ML engineer needs to deploy four ML models in an Amazon SageMaker inference pipeline. The models were built with different frameworks. The ML engineer also needs to give clients the ability to use the invoke_endpoint call to perform inference for each model. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a SageMaker multi-model endpoint.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a SageMaker multi-container endpoint.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create multiple SageMaker single-model endpoints.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Run a SparkML job to generate multiple endpoints.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Un multi-model endpoint (MME) de SageMaker hospeda muchos modelos en un mismo endpoint pero carga/descarga dinámicamente artefactos que deben compartir un contenedor de servicio común; no está pensado para servir modelos construidos con frameworks arbitrarios y distintos dentro de un mismo despliegue de endpoint.\n\nOpción B (Correcta): Un multi-container endpoint permite desplegar hasta 15 contenedores distintos (cada uno potencialmente de un framework diferente) detrás de un único endpoint; con InferenceExecutionConfig en modo Direct, los clientes pueden llamar a invoke_endpoint indicando TargetContainerHostname para dirigir la petición a un modelo/contenedor concreto, cumpliendo a la vez el requisito de 'frameworks distintos', 'invoke_endpoint' y coste (una única instancia/endpoint compartido).\n\nOpción C: Desplegar cuatro endpoints de un solo modelo funciona, pero implica pagar por cuatro conjuntos independientes de instancias subyacentes, lo cual no es la opción más económica frente a un endpoint multi-contenedor compartido.\n\nOpción D: Un job de SparkML no está relacionado con hospedar modelos preconstruidos de distintos frameworks accesibles vía invoke_endpoint; no resuelve el requisito planteado.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/multi-container-endpoints.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/multi-container-direct.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20127,
    "questionNumber": 127,
    "question": "An ML engineer wants an Amazon SageMaker notebook to automatically stop running after 1 hour of idle time. How can the ML engineer accomplish this goal?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a lifecycle configuration in SageMaker. Copy the auto-stop-idle script from GitHub to the Start Notebook section.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a lifecycle configuration in SageMaker. Copy the auto-stop-idle script from GitHub to the Create Notebook section.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Track the notebook's CPU metric by using Amazon CloudWatch Logs. Invoke an AWS Lambda function from CloudWatch Logs to shut down the notebook instance if CPU utilization becomes zero.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Track the notebook's memory metric by using Amazon CloudWatch Logs. Invoke an AWS Lambda function from CloudWatch Logs to shut down the notebook instance if memory utilization becomes zero.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Un script de lifecycle configuration (LCC) colocado en la sección 'Start Notebook' se ejecuta cada vez que la instancia de notebook se inicia (además de en su creación), que es lo necesario para que el script de auto-stop-idle se re-arme en cada arranque; el script de ejemplo mantenido por AWS para auto-stop-idle está diseñado precisamente para instalarse así.\n\nOpción B: El script de la sección 'Create Notebook' solo se ejecuta una vez, en el momento de la creación; no volvería a aplicar el monitor/cron de inactividad en reinicios posteriores de la instancia, por lo que el comportamiento de auto-stop no se mantendría de forma fiable.\n\nOpción C: Es una alternativa general válida (métrica de CPU en CloudWatch + Lambda), pero mucho más costosa operativamente que simplemente adjuntar el script LCC ya mantenido por AWS, y la utilización de CPU no necesariamente llega a cero solo porque el notebook esté 'inactivo' en el sentido de Jupyter.\n\nOpción D: La utilización de memoria raramente cae exactamente a cero y no es una señal fiable ni habitual para detectar inactividad de un notebook; no es el enfoque documentado ni recomendado.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/notebook-lifecycle-config.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20128,
    "questionNumber": 128,
    "question": "A company wants to provide services to help other businesses label images. The company wants its labeling specialists to complete human labeling tasks on AWS. How should the company register the labeling specialists to receive tasks on AWS?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Data Exchange.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create and use an internal workforce in Amazon SageMaker Ground Truth.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create and use Amazon Mechanical Turk entities in an Amazon SageMaker human loop.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use the Amazon Mechanical Turk website.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: AWS Data Exchange es un marketplace de suscripción a conjuntos de datos de terceros; no tiene relación con el registro de trabajadores humanos de etiquetado.\n\nOpción B: Un workforce privado de SageMaker Ground Truth es un grupo de trabajadores que la propia empresa crea y al que da acceso a SUS propios trabajos de anotación (por ejemplo, sus empleados); no es el mecanismo para que los especialistas de etiquetado de la empresa se registren y reciban tareas procedentes de OTRAS empresas ajenas en AWS.\n\nOpción C: Crear entidades de Mechanical Turk dentro de un human loop de SageMaker es cómo un 'requester' configura un trabajo existente para enrutar tareas a Mechanical Turk; no es el mecanismo para registrar a especialistas individuales como workers que puedan buscar y aceptar tareas.\n\nOpción D (Correcta): La experiencia de 'worker' de Amazon Mechanical Turk es un mercado público y a demanda de trabajadores independientes que se registran directamente en el sitio web de Mechanical Turk; esto permite que los especialistas de la empresa se registren como workers y queden disponibles para completar HITs publicados por muchos 'requesters' (otras empresas) distintos en AWS, que es justo el escenario descrito de 'ayudar a otras empresas' a recibir tareas.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/sms-custom-templates-step1.html\nhttps://docs.aws.amazon.com/AWSMechTurk/latest/AWSMechanicalTurkGettingStartedGuide/SetUp.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20129,
    "questionNumber": 129,
    "question": "A company wants to use Amazon SageMaker to host an ML model that runs on CPU for real-time predictions. The model will have intermittent traffic during business hours and will have periods of no traffic after business hours. The company needs a solution that will serve inference requests in the most cost-effective manner. Which hosting option will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy the model to a SageMaker real-time endpoint. Add a schedule-based auto scaling policy to handle traffic surges during business hours.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy the model to a SageMaker Serverless Inference endpoint. Configure increased provisioned concurrency during business hours.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Deploy the model to a SageMaker Asynchronous Inference endpoint. Configure an auto scaling policy that scales in to zero outside business hours.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy the model to a SageMaker real-time endpoint. Create a scheduled AWS Lambda function that activates the endpoint during business hours only.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Un endpoint en tiempo real históricamente requiere al menos una instancia siempre activa; una política de auto scaling basada en horario puede añadir/quitar capacidad para picos previsibles, pero el endpoint sigue incurriendo en coste de una instancia base las 24 horas, lo cual es menos económico que una opción de pago por uso para una carga CPU con largos periodos de inactividad.\n\nOpción B (Correcta): SageMaker Serverless Inference escala automáticamente según el tráfico y reduce a cero durante los periodos de inactividad (sin coste cuando está inactivo), ajustándose al requisito de 'sin tráfico fuera de horario'; añadir Provisioned Concurrency durante el horario laboral mantiene el endpoint 'caliente' (evitando la latencia de cold start) para el tráfico intermitente previsible, y al reducir/quitar la concurrencia aprovisionada fuera de horario se vuelve al modelo de coste casi nulo — la documentación de AWS describe explícitamente Provisioned Concurrency como 'una opción rentable cuando tienes picos de tráfico predecibles'.\n\nOpción C: Asynchronous Inference está diseñado para trabajos largos con payloads grandes que no requieren respuesta inmediata; no está pensado para 'predicciones en tiempo real', por lo que no cumple el requisito explícito aunque pueda escalar a cero.\n\nOpción D: Arrancar/detener manualmente un endpoint en tiempo real mediante una Lambda programada añade lógica operativa a medida y deja el endpoint completamente no disponible fuera de horario, además de seguir facturando una instancia en ejecución completa durante el horario laboral independientemente de la intermitencia real del tráfico.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints-monitoring.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20130,
    "questionNumber": 130,
    "question": "An ML engineer needs to train a supervised deep learning model. The available dataset is a large number of unlabeled images that only employees should access. The ML engineer needs to implement a solution that labels the dataset with the highest possible accuracy. Which combination of steps should the ML engineer take to meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Rekognition to automatically label the dataset.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Train the deep learning model directly on the raw data. Let the model infer the labels by itself.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon SageMaker Ground Truth to create an annotation job that specifies the labeling task and requirements.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Set up workforce teams to access a private workforce to run and review the annotation job created by Amazon SageMaker Ground Truth.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Use Amazon Mechanical Turk to complete the annotation job created by Amazon SageMaker Ground Truth.",
        "isCorrect": false
      }
    ],
    "comments": "Nota: el campo 'Most Accepted Answer' del fichero fuente solo listaba la letra C, pero la pregunta exige elegir DOS opciones (Choose two) y la propia discusión de la comunidad (3 votos explícitos a 'CD') así como la lógica del servicio confirman que las dos respuestas correctas son C y D.\n\nOpción A: Amazon Rekognition genera etiquetas automáticas de un modelo general de propósito amplio; no garantiza la 'máxima precisión posible' para una taxonomía de etiquetado específica de la empresa, y tampoco restringe el acceso 'solo a empleados', por lo que no resuelve conjuntamente los requisitos de precisión y control de acceso.\n\nOpción B: Entrenar directamente sobre datos sin etiquetar y dejar que el modelo 'infiera las etiquetas por sí mismo' describe aprendizaje no supervisado, no supervisado; el enunciado exige explícitamente un modelo de aprendizaje profundo supervisado, que necesita etiquetas reales (ground truth), por lo que esta opción no cumple la tarea solicitada.\n\nOpción C (Correcta): Amazon SageMaker Ground Truth permite crear un trabajo de anotación (annotation job) que define con precisión la tarea de etiquetado, las instrucciones y la interfaz, que es la forma estándar de generar etiquetas de alta calidad y específicas de la tarea para un modelo supervisado.\n\nOpción D (Correcta): Como las imágenes deben restringirse a 'solo empleados', el trabajo de anotación debe ejecutarse con un workforce privado de Ground Truth (equipo interno con acceso mediante Amazon Cognito), en lugar de la multitud pública de Mechanical Turk; asignar y revisar el trabajo mediante este workforce privado maximiza la precisión del etiquetado a la vez que impone la restricción de acceso.\n\nOpción E: Amazon Mechanical Turk es una multitud pública y a demanda de trabajadores independientes; enrutar el dataset de imágenes restringido de la empresa a MTurk violaría el requisito de que 'solo los empleados' deben tener acceso.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/sms-custom-templates-step1.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/sms-workforce-create-private.html",
    "category": "Data Preparation",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 20131,
    "questionNumber": 131,
    "question": "A company is using an Amazon S3 bucket to collect data that will be used for ML workflows. The company needs to use AWS Glue DataBrew to clean and normalize the data. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a DataBrew dataset by using the S3 path. Clean and normalize the data by using a DataBrew profile job.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a DataBrew dataset by using the S3 path. Clean and normalize the data by using a DataBrew recipe job.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a DataBrew dataset by using a Java Database Connectivity (JDBC) driver to connect to the S3 bucket. Clean and normalize the data by using a DataBrew profile job.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a DataBrew dataset by using a Java Database Connectivity (JDBC) driver to connect to the S3 bucket. Clean and normalize the data by using a DataBrew recipe job.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Un profile job de DataBrew ejecuta perfilado estadístico/de calidad de datos (genera un informe de perfil); no aplica transformaciones de limpieza o normalización sobre el propio dataset.\n\nOpción B (Correcta): Se puede añadir una ubicación de S3 directamente como dataset de DataBrew (S3 es una conexión soportada de forma nativa, sin necesidad de driver JDBC); un recipe job de DataBrew aplica entonces una receta guardada (una secuencia de pasos de transformación de limpieza/normalización) sobre ese dataset y escribe la salida limpia, que es exactamente 'limpiar y normalizar los datos'.\n\nOpción C: Un bucket de S3 no se conecta mediante JDBC en DataBrew (JDBC se usa para bases de datos relacionales como MySQL/PostgreSQL, no para S3); esta no es la forma técnica correcta de conectar DataBrew a S3, y además un profile job seguiría sin limpiar/normalizar los datos.\n\nOpción D: El mismo problema de conectividad JDBC que en C — S3 no requiere ni soporta un driver JDBC en DataBrew — lo que convierte este método de conexión en inválido para la fuente de datos indicada.\n\nReferencias:\nhttps://docs.aws.amazon.com/databrew/latest/dg/jobs.recipe.html\nhttps://docs.aws.amazon.com/databrew/latest/dg/core-concepts-and-terms.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20132,
    "questionNumber": 132,
    "question": "A company is developing a new ML model that uses the XGBoost algorithm. The company will train the model on data that is stored in an Amazon S3 bucket. The data is in a nested JSON format. An ML engineer needs to convert the JSON files into a tabular format. Which solution will meet this requirement with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Glue PySpark job that uses the Relationalize transform to convert the files.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Write custom Scala code to convert the files. Use Amazon EMR Serverless to run the Scala code.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS Lambda function that uses a Python runtime and invokes the reduce() function to convert the files. Invoke the Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Amazon Athena database that is based on the JSON files. Use the Athena flatten function to convert the data.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): El transform Relationalize de PySpark en AWS Glue está diseñado específicamente para aplanar esquemas anidados/semiestructurados (como JSON anidado) en un DynamicFrame, generando una o más tablas relacionales planas aptas para consumo tabular (por ejemplo, por XGBoost), todo dentro de un job de ETL de Glue totalmente gestionado y serverless, minimizando la sobrecarga operativa.\n\nOpción B: Escribir código Scala personalizado y ejecutarlo en EMR Serverless exige construir y mantener lógica de transformación a medida — considerablemente más esfuerzo de desarrollo/operación que usar el transform Relationalize ya incorporado en Glue.\n\nOpción C: Una función Lambda que use reduce() de Python para aplanar manualmente JSON anidado arbitrario requiere lógica de parseo escrita a mano y potencialmente frágil, además de estar limitada por los límites de tiempo de ejecución/memoria de Lambda para datasets grandes — más sobrecarga operativa que un transform gestionado de Glue.\n\nOpción D: Athena no ofrece una función genérica de 'flatten' incorporada para JSON anidado arbitrario; consultar JSON anidado con UNNEST/funciones de array exige construir manualmente SQL específico para cada estructura anidada, y aun así requeriría un paso adicional para materializar un dataset tabular apto para entrenamiento.\n\nReferencias:\nhttps://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-crawler-pyspark-transforms-Relationalize.html\nhttps://docs.aws.amazon.com/glue/latest/dg/schema-relationalize.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20133,
    "questionNumber": 133,
    "question": "A medical company ingests streams of data from devices that monitor patients' vital signs. The company uses Amazon SageMaker and plans to prepare ML models to predict adverse events for patients. The dataset is large with thousands of features. An ML engineer needs to run several hundred training iterations with different sets of features, different algorithms, and many potential parameters. The ML engineer must implement a solution to log the characteristics and results of each training iteration. Which solution will meet these requirements with the LEAST implementation effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon CloudWatch to create custom metrics for the characteristics of each iteration.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Write the characteristics of each iteration to logs in Amazon S3. Use AWS Glue and Amazon Athena to search the logs.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the SageMaker Model Registry to track the characteristics and results of each iteration.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use SageMaker Experiments to track the characteristics and results of each iteration.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Las métricas personalizadas de CloudWatch pueden registrar valores numéricos en el tiempo, pero no están pensadas para capturar 'características' ricas y estructuradas (conjuntos de features, algoritmo elegido, hiperparámetros arbitrarios) de cada una de cientos de iteraciones de forma fácilmente comparable/consultable.\n\nOpción B: Escribir logs manualmente en S3 y consultarlos con Glue/Athena es un enfoque válido pero de alto esfuerzo, ya que exige diseñar un esquema, construir y mantener crawlers y queries — mucho más esfuerzo de implementación que una funcionalidad de tracking ya gestionada.\n\nOpción C: El SageMaker Model Registry está diseñado para catalogar y versionar paquetes de modelo listos para despliegue (flujos de gobernanza/aprobación), no para rastrear y comparar las características y resultados de numerosas iteraciones exploratorias de entrenamiento/experimentación.\n\nOpción D (Correcta): Amazon SageMaker Experiments está diseñado específicamente para rastrear, organizar y comparar de forma automática las entradas, parámetros, hiperparámetros, métricas y resultados de muchas ejecuciones/iteraciones de entrenamiento con mínimo código adicional, encajando directamente con el requisito de rastrear 'varios cientos de iteraciones de entrenamiento' con el mínimo esfuerzo de implementación.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/experiments-mlops.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20134,
    "questionNumber": 134,
    "question": "A company is planning to create an internal-only chat interface to help employees handle customer queries. Currently, the employees need to refer to a massive knowledge base of internal documents to address customer issues. The new solution must be serverless. Which combination of steps will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up Amazon Bedrock with the Anthropic Claude foundation model.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Set up Amazon SageMaker JumpStart with the Llama foundation model.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon EC2 instances with Amazon API Gateway to invoke the model API.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Lambda functions with Amazon API Gateway to invoke the model API.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Use an Amazon S3 bucket to store vector database dumps and embeddings.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Use Amazon RDS for MySQL to store vector database dumps and embeddings.",
        "isCorrect": false
      }
    ],
    "comments": "Nota de formato: el texto de la pregunta en el fichero fuente no incluye literalmente '(Choose N)', pero pide una 'combinación de pasos' y las tres áreas funcionales requeridas (modelo, cómputo/API, almacenamiento de embeddings) exigen necesariamente tres selecciones; se ha marcado como selección múltiple con requiredCount=3, coherente con la naturaleza real de la pregunta y con la votación de la comunidad (A, D y E con 3 votos cada una).\n\nOpción A (Correcta): Amazon Bedrock es un servicio de IA generativa totalmente gestionado y serverless —incluyendo modelos base de Anthropic Claude— que no requiere aprovisionar ni gestionar servidores, cumpliendo el requisito de 'debe ser serverless' para la capa de modelo.\n\nOpción B: SageMaker JumpStart con Llama despliega típicamente el modelo en un endpoint de hosting de SageMaker respaldado por instancias de cómputo aprovisionadas que hay que gestionar y pagar de forma continua; no es un modelo de despliegue serverless como la API a demanda de Bedrock.\n\nOpción C: Ejecutar el backend del chat en instancias EC2 exige aprovisionar, parchear y escalar servidores por cuenta propia, lo cual contradice directamente el requisito de 'serverless'.\n\nOpción D (Correcta): AWS Lambda combinado con Amazon API Gateway es el patrón serverless estándar para exponer una API HTTP (que invoque el modelo base) sin gestionar servidores.\n\nOpción E (Correcta): Amazon S3 es un almacén de objetos totalmente serverless y gestionado, adecuado para guardar embeddings/volcados de base de datos vectorial sin aprovisionar infraestructura, a diferencia de la opción F.\n\nOpción F: Amazon RDS for MySQL exige aprovisionar y gestionar una instancia de base de datos (elegir clase de instancia, almacenamiento, ventanas de mantenimiento), por lo que no es un servicio serverless y no cumple el requisito tan bien como una alternativa de almacenamiento de objetos sin infraestructura que gestionar.\n\nReferencias:\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-inference-architecture-and-best-practices-on-aws/aws-inference-stack.html\nhttps://docs.aws.amazon.com/security-lake/latest/userguide/bedrock-integration.html",
    "category": "Deployment & Orchestration",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 20135,
    "questionNumber": 135,
    "question": "An ML engineer needs to deploy a trained model that is based on a genetic algorithm. The algorithm solves a complex problem and can take several minutes to generate predictions. When the model is deployed, the model needs to access large amounts of data to process requests. The requests can involve as much as 100 MB of data. Which deployment solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy the model to Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy the model to an Amazon SageMaker real-time endpoint.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy the model to an Amazon SageMaker Asynchronous Inference endpoint.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Package the model as a container. Deploy the model to Amazon Elastic Container Service (Amazon ECS) on Amazon EC2 instances.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Desplegar en instancias EC2 autogestionadas detrás de un ALB exige construir y operar por cuenta propia la lógica de colas de peticiones, auto scaling y health checks para payloads grandes/trabajos largos — mucha más sobrecarga operativa que una opción gestionada de SageMaker.\n\nOpción B: Un endpoint en tiempo real de SageMaker tiene un límite de tamaño de payload (del orden de decenas de MB) y está diseñado para respuestas síncronas de baja latencia; no está pensado para peticiones que 'tardan varios minutos' ni para hasta 100 MB de entrada, y la invocación superaría los límites razonables de tiempo de espera síncrono.\n\nOpción C (Correcta): SageMaker Asynchronous Inference está diseñado específicamente para peticiones con payloads grandes (hasta 1 GB) y tiempos de procesamiento largos (decenas de minutos), encolando las peticiones y notificando mediante Amazon SNS al finalizar, todo de forma gestionada y con auto escalado (incluso hasta cero) — encaja con los requisitos de 'minutos para generar predicciones' y '100 MB' con la mínima sobrecarga operativa.\n\nOpción D: Empaquetar el modelo en un contenedor y ejecutarlo en ECS sobre EC2 exige gestionar la capacidad del clúster, el escalado de tareas y la red por cuenta propia, lo cual supone considerablemente más sobrecarga operativa que una opción de inferencia de SageMaker totalmente gestionada.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/async-inference.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/hosting-faqs.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20136,
    "questionNumber": 136,
    "question": "An ML engineer wants to use a set of survey responses as training data for an ML classifier. All the survey responses are either \"yes\" or \"no.\" The ML engineer needs to convert the responses into a feature that will produce better model training results. The ML engineer must not increase the dimensionality of the dataset. Which methods will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Binary encoding",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Label encoding",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "One-hot encoding",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Statistical imputation",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Tokenization",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta - Binary encoding): La codificación binaria representa cada categoría con un número fijo y pequeño de bits; para una variable con exactamente dos categorías (sí/no) se reduce a una única columna binaria (0/1), por lo que no añade dimensionalidad respecto al único campo original, mientras sigue expresando la categoría de forma numérica para el modelo.\n\nOpción B (Correcta - Label encoding): La codificación por etiquetas asigna cada categoría a un único entero (por ejemplo, sí=1, no=0) en una sola columna resultante, de modo que, igual que la codificación binaria, mantiene la feature en una sola dimensión permitiendo al algoritmo aprender de una variable numérica; para un atributo estrictamente binario, label encoding y binary encoding son en la práctica equivalentes y ambas evitan añadir columnas.\n\nOpción C: El one-hot encoding crea una nueva columna binaria por cada categoría (la acción ONE_HOT_ENCODING de AWS Glue DataBrew 'crea n columnas numéricas binarias a partir de una columna categórica, donde n es igual al número de valores únicos de esa columna'); para el campo sí/no esto produce dos columnas en lugar del único campo original, incrementando la dimensionalidad, lo que viola la restricción explícita del enunciado.\n\nOpción D: La imputación estadística es una técnica para tratar valores faltantes, no un método de codificación para convertir valores categóricos de texto en una feature numérica; las respuestas de la encuesta no se describen como incompletas, por lo que no aplica.\n\nOpción E: La tokenización divide texto libre en tokens para pipelines de NLP; no es la técnica adecuada para un campo categórico simple y fijo de dos valores como 'sí/no'.\n\nReferencias:\nhttps://docs.aws.amazon.com/databrew/latest/dg/recipe-actions.ONE_HOT_ENCODING.html",
    "category": "Data Preparation",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 20137,
    "questionNumber": 137,
    "question": "HOTSPOT - An ML engineer must choose the appropriate Amazon SageMaker algorithm to solve specific AI problems. Select the correct SageMaker built-in algorithm from the following list for each use case. Each algorithm should be selected one time. Algorithms available: Random Cut Forest (RCF) algorithm; Semantic segmentation algorithm; Sequence-to-Sequence (seq2seq) algorithm. Use cases to match (according to the ExamTopics discussion for this item): 1) Text summarization; 2) Image pixel-level identification (image segmentation); 3) Anomaly detection.",
    "choices": [
      {
        "letter": "A",
        "text": "Text summarization -> Sequence-to-Sequence (seq2seq); Image pixel identification -> Semantic segmentation; Anomaly detection -> Random Cut Forest (RCF)",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Text summarization -> Semantic segmentation; Image pixel identification -> Sequence-to-Sequence (seq2seq); Anomaly detection -> Random Cut Forest (RCF)",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Text summarization -> Sequence-to-Sequence (seq2seq); Image pixel identification -> Random Cut Forest (RCF); Anomaly detection -> Semantic segmentation",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Text summarization -> Random Cut Forest (RCF); Image pixel identification -> Semantic segmentation; Anomaly detection -> Sequence-to-Sequence (seq2seq)",
        "isCorrect": false
      }
    ],
    "comments": "Nota de formato: en el fichero fuente esta pregunta es de tipo HOTSPOT (emparejamiento) y no incluye una sección 'Options' con letras A-D; el 'Most Accepted Answer' aparece como 'Not available'. Se ha reformulado en formato de opción múltiple conservando el emparejamiento correcto verificado con documentación oficial de AWS, para ajustarse al esquema requerido por esta tarea, sin alterar el contenido técnico de la pregunta original.\n\nOpción A (Correcta): Seq2seq es un algoritmo de secuencia a secuencia usado para tareas como traducción automática y resumen de texto (texto de entrada -> texto de salida); el algoritmo de segmentación semántica de SageMaker es un algoritmo de visión por computador que realiza una identificación a nivel de píxel de los objetos en una imagen; Random Cut Forest (RCF) es el algoritmo no supervisado de SageMaker documentado específicamente para detección de anomalías.\n\nOpciones B, C y D: Intercambian los emparejamientos anteriores; son incorrectas porque, por ejemplo, RCF no es un algoritmo de procesamiento de texto ni de imagen (es de detección de anomalías en datos), y ni semantic segmentation ni seq2seq están documentados como algoritmos de detección de anomalías.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/randomcutforest.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20138,
    "questionNumber": 138,
    "question": "A company is planning to use an Amazon SageMaker prebuilt algorithm to create a recommendation model. The algorithm must be able to make predictions on high-dimensional sparse data. Which SageMaker algorithm should the company choose for the recommendation model?",
    "choices": [
      {
        "letter": "A",
        "text": "K-nearest neighbors (k-NN)",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Factorization Machines",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Principal component analysis (PCA)",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Sequence-to-Sequence (seq2seq)",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: k-NN es un algoritmo basado en similitud pensado para clasificación/regresión sobre vectores de features densos; no modela de forma eficiente las interacciones entre pares de features típicas de datos de recomendación de alta dimensionalidad y escasez (sparse).\n\nOpción B (Correcta): La documentación de SageMaker describe Factorization Machines como 'un algoritmo de aprendizaje supervisado de propósito general para tareas de clasificación y regresión que captura interacciones por pares entre features en datasets de alta dimensionalidad y dispersos (sparse)', citando la recomendación de ítems/productos y la predicción de clics como casos de uso canónicos — coincide directamente con el requisito.\n\nOpción C: PCA es una técnica no supervisada de reducción de dimensionalidad, no un algoritmo predictivo de recomendación.\n\nOpción D: Seq2seq está diseñado para tareas de secuencia a secuencia como traducción automática o resumen de texto, no para datos de recomendación de alta dimensionalidad y dispersos.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/fact-machines.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/fm-tuning.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20139,
    "questionNumber": 139,
    "question": "A company has several teams that have developed separate prediction models on their own laptops. The teams developed the models by using Python with scikit-learn and TensorFlow frameworks. The company must rebuild the models and must integrate the models into an ML infrastructure that the company manages by using Amazon SageMaker. The company also must incorporate the models into a model registry. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Export the models from the laptops to an Amazon S3 bucket. Use an Amazon API Gateway REST API and AWS Lambda functions with SageMaker endpoints to access the models. Register the models in the SageMaker Model Registry.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Import the models into the SageMaker Model Registry. Use SageMaker to run the imported models.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use code from the laptops to create containers for the models. Use the bring your own container (BYOC) functionality of SageMaker to import and use the models. Register the models in the SageMaker Model Registry.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Import the Python-based models into SageMaker. Rebuild the scikit-learn and TensorFlow models in SageMaker. Register all the models in the SageMaker Model Registry.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Exportar los artefactos de modelo a S3 y montar API Gateway + Lambda para invocar endpoints de SageMaker deja a los modelos ejecutándose fuera de los contenedores de hosting gestionados propios de SageMaker y no integra de forma limpia el artefacto/linaje de entrenamiento en SageMaker; además exige construir y mantener código Lambda a medida.\n\nOpción B: El SageMaker Model Registry solo cataloga metadatos/artefactos de paquetes de modelo para versionado y aprobación de despliegue; no 'ejecuta' directamente ficheros de modelo arbitrarios — los modelos deben empaquetarse primero en un contenedor/endpoint compatible con SageMaker, paso que esta opción omite.\n\nOpción C: Construir imágenes BYOC (bring your own container) personalizadas para empaquetar el código de scikit-learn y TensorFlow exige crear y mantener imágenes Docker propias — sobrecarga operativa innecesaria porque SageMaker ya ofrece contenedores de framework preconstruidos para ambos frameworks.\n\nOpción D (Correcta): SageMaker ofrece contenedores de framework gestionados y preconstruidos para scikit-learn y TensorFlow ('framework soportado por SageMaker... Scikit-Learn, TensorFlow...'), de modo que un equipo puede llevar su script de entrenamiento existente prácticamente tal cual ('script mode') y entrenarlo/ejecutarlo de forma nativa en SageMaker sin construir contenedores personalizados, registrando después el modelo resultante en el Model Registry — es la vía de menor sobrecarga operativa para estandarizar los modelos dentro de la infraestructura gestionada de SageMaker y su registro.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/algorithms-choose.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/docker-containers-notebooks.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20140,
    "questionNumber": 140,
    "question": "A company is training a large language model (LLM) by using on-premises infrastructure. A live conversational engine uses the LLM to help customers find real-time insights in credit card data. An ML engineer must implement a solution to train and deploy the LLM on Amazon SageMaker. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use SageMaker Training Compiler to train the LLM. Deploy the LLM by using SageMaker real-time inference.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use SageMaker with deep learning containers for large model inference to train the LLM. Deploy the LLM by using SageMaker real-time inference.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use SageMaker Notebook Jobs to train the LLM. Deploy the LLM by using SageMaker Asynchronous Inference.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use SageMaker Studio to train the LLM. Deploy the LLM by using SageMaker batch transform.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: La documentación oficial de AWS indica explícitamente que 'no habrá nuevas versiones ni releases de SageMaker Training Compiler', es decir, está descontinuado; además, los frameworks/modelos probados y soportados por Training Compiler corresponden a arquitecturas transformer relativamente pequeñas (cientos de millones de parámetros, versiones de Hugging Face Transformers de la era BERT/GPT-2), por lo que no está diseñado ni validado para modelos de lenguaje grandes (LLM) modernos, siendo una elección desactualizada y no soportada para este escenario.\n\nOpción B (Correcta): De las dos opciones que además de entrenar despliegan con SageMaker real-time inference (la opción de baja latencia adecuada para un 'motor conversacional en vivo'), esta es la alineada con el ecosistema actual y soportado de SageMaker para modelos grandes (contenedores de deep learning orientados a modelos de gran tamaño e infraestructura de entrenamiento distribuido de SageMaker), frente a la opción A que se apoya en una capacidad ya descontinuada y sin soporte para LLMs modernos.\n\nOpción C: SageMaker Notebook Jobs ejecuta un notebook como job programado/puntual; no es una arquitectura de entrenamiento de producción para modelos grandes, y Asynchronous Inference no es 'tiempo real', lo que entra en conflicto con el requisito de un motor conversacional en vivo.\n\nOpción D: SageMaker Studio es un IDE/interfaz para construir y ejecutar jobs, no un mecanismo de entrenamiento en sí mismo, y el batch transform es un modo de inferencia offline y no interactivo, incompatible con un motor conversacional en vivo de baja latencia.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/training-compiler.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/large-model-inference.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20141,
    "questionNumber": 141,
    "question": "A company has an existing Amazon SageMaker model (v1) on a production endpoint. The company develops a new model version (v2) and needs to test v2 in production before substituting v2 for v1. The company needs to implement a solution to minimize the risk of v2 generating incorrect output in production. The solution must prevent any disruption of production traffic during the change to v2. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a second production variant for v2. Assign 1% of the traffic to v2 and 99% of the traffic to v1. Collect all the output of v2 in an Amazon S3 bucket. If v2 performs as expected, switch all the traffic to v2.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a second production variant for v2. Assign 10% of the traffic to v2 and 90% of the traffic to v1. Collect all the output of v2 in an Amazon S3 bucket. If v2 performs as expected, switch all the traffic to v2.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy v2 to a new endpoint. Turn on data capturing for the production endpoint. Write a script to pass 100% of input data to v2. If v2 performs as expected, deactivate the v1 endpoint and direct the traffic to v2.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy v2 into a shadow variant that samples 100% of the inference requests. Collect all the output in an Amazon S3 bucket. If v2 performs as expected, promote v2 to production.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Un canary con 1% de tráfico real hace que ese 1% de los usuarios reciba efectivamente las respuestas del modelo v2, lo que sí constituye una disrupción/riesgo para producción, violando el requisito de que v2 no debe afectar el tráfico de producción mientras se prueba.\n\nOpción B: Igual que A pero con un 10% de usuarios afectados, mayor riesgo aún.\n\nOpción C: Desplegar en un endpoint nuevo y construir manualmente un script para duplicar el tráfico es una solución artesanal, con mayor esfuerzo operativo y riesgo de fallos, cuando SageMaker ya ofrece una funcionalidad nativa para exactamente este caso de uso.\n\nOpción D (Correcta): Una \"shadow variant\" en Amazon SageMaker recibe una copia (hasta el 100%) de las solicitudes de inferencia reales de la variante de producción, pero sus respuestas se registran únicamente (por ejemplo en S3) y nunca se devuelven al llamador. Esto permite evaluar el comportamiento de v2 con tráfico real de producción sin ningún impacto ni riesgo para los usuarios finales, y si el rendimiento es satisfactorio, la shadow variant puede promoverse a producción.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-validation.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests-complete.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20142,
    "questionNumber": 142,
    "question": "A company is building an ML model by using Amazon SageMaker, AWS owned libraries, and open source libraries. The company must ensure that SageMaker does not collect metadata about usage and errors during training. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Associate the SageMaker domain with a custom IAM role. Attach the role to a policy that denies Amazon CloudWatch service usage logs.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Add an IAM role to the SageMaker domain to deny Amazon CloudWatch the permission to report metadata.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Turn off the setting in the SageMaker domain to share metadata for console jobs. Opt out of metadata collection for each training job that is submitted through the AWS CLI or AWS SDKs.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Set a parameter to opt out of metadata collection for each training job that is submitted through the AWS CLI, Boto3, or the SageMaker Python SDK.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: No existe tal mecanismo de exclusión de metadatos de entrenamiento mediante una política IAM que deniegue el uso de CloudWatch; la recolección de metadatos de SageMaker Training no depende de permisos de CloudWatch.\n\nOpción B: Igual que A, la telemetría de SageMaker no se controla denegando permisos a CloudWatch; ese no es el mecanismo documentado de opt-out.\n\nOpción C: Es parcialmente inexacta: la documentación indica que si se usa la consola para crear trabajos de entrenamiento, la recolección de metadatos ya está deshabilitada por defecto (no existe un \"ajuste\" que haya que apagar explícitamente en el dominio); además, aunque menciona correctamente el opt-out por CLI/SDK, omite el SDK de Python de SageMaker.\n\nOpción D (Correcta): Según la documentación oficial de \"Data Privacy in Amazon SageMaker AI\", para optar por no compartir metadatos agregados hay que establecer la variable de entorno OPT_OUT_TRACKING=1 en cada llamada a CreateTrainingJob, y esto se hace explícitamente mediante AWS CLI, Boto3 o el SageMaker Python SDK (ModelTrainer), job por job («You must choose to opt out of metadata collection for each training job that you submit»). Esto coincide exactamente con la opción D.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-privacy.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20143,
    "questionNumber": 143,
    "question": "An ML engineer is training an ML model to identify people’s health risk based on 20 features and 1 target. The target class has two values: • Likely to have health risk (positive class) • Unlikely to have health risk (negative class) The age range of people in the dataset is 30 years old to 60 years old. Age is one of the features. The ML engineer analyzes the features. For the positive class, the difference in proportions of labels (DPL) value is (+0.9) for the age range of 40 to 45 compared with all other age ranges. What should the ML engineer do to correct this data imbalance?",
    "choices": [
      {
        "letter": "A",
        "text": "Oversample the positive class for the age range of 40 to 45.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Undersample the positive class for the age range of 40 to 45.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Undersample the positive class for all age ranges except 40 to 45.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Oversample the negative class for all age ranges except 40 to 45.",
        "isCorrect": false
      }
    ],
    "comments": "Según la fórmula documentada de SageMaker Clarify, DPL = qa - qd, donde qa es la proporción de ejemplos con etiqueta positiva en el facet analizado (edad 40-45) y qd es la proporción de positivos en el resto de edades. Un DPL de +0.9 significa que el facet 40-45 está muy sobrerrepresentado en la clase positiva respecto al resto. Para acercar el DPL a 0 hay que disminuir qa o aumentar qd.\n\nOpción A: Sobremuestrear la clase positiva dentro del rango 40-45 aumentaría aún más qa, incrementando (empeorando) el desequilibrio en lugar de corregirlo.\n\nOpción B (Correcta): Submuestrear la clase positiva dentro del rango 40-45 reduce la proporción de positivos en ese facet (disminuye qa), acercando el DPL a 0 y corrigiendo la sobrerrepresentación identificada, sin alterar la proporción de positivos en el resto de los grupos de edad.\n\nOpción C: Submuestrear la clase positiva en todos los rangos EXCEPTO 40-45 reduce qd (proporción de positivos fuera del rango problemático), lo que en realidad ampliaría la brecha qa-qd, empeorando el DPL.\n\nOpción D: Sobremuestrear la clase negativa en el resto de rangos de edad también reduce la proporción relativa de positivos (qd) en esos grupos, ampliando igualmente la brecha respecto al grupo 40-45 y empeorando el desequilibrio en vez de mitigarlo.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-data-bias-metric-true-label-imbalance.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20144,
    "questionNumber": 144,
    "question": "A company is building an Amazon SageMaker AI pipeline for an ML model. The pipeline uses distributed processing and training. An ML engineer needs to encrypt network communication between instances that run distributed jobs. The ML engineer configures the distributed jobs to run in a private VPC. What should the ML engineer do to meet the encryption requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Enable network isolation.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure traffic encryption by using security groups.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Enable inter-container traffic encryption.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Enable VPC flow logs.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: El aislamiento de red (network isolation) impide que el contenedor de entrenamiento tenga acceso a internet y a otros recursos de AWS fuera del trabajo, pero no cifra el tráfico entre las instancias del clúster distribuido.\n\nOpción B: Los security groups son reglas de firewall (control de acceso a nivel de puerto/IP); no realizan cifrado de los datos que viajan por la red.\n\nOpción C (Correcta): SageMaker AI permite habilitar el cifrado del tráfico entre contenedores (\"inter-container traffic encryption\") para trabajos de entrenamiento distribuidos, cifrando las comunicaciones en tránsito entre las instancias de cómputo de ML que participan en el job, cumpliendo exactamente el requisito planteado (con el trade-off documentado de que puede aumentar el tiempo de entrenamiento en algoritmos de deep learning distribuidos).\n\nOpción D: Los VPC Flow Logs solo registran metadatos del tráfico de red (IP, puertos, bytes) para fines de auditoría/monitorización; no cifran ni protegen el contenido del tráfico.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/train-encrypt.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/encryption-in-transit.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20145,
    "questionNumber": 145,
    "question": "An ML model is deployed in production. The model has performed well and has met its metric thresholds for months. An ML engineer who is monitoring the model observes a sudden degradation. The performance metrics of the model are now below the thresholds. What could be the cause of the performance degradation?",
    "choices": [
      {
        "letter": "A",
        "text": "Lack of training data",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Drift in production data distribution",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Compute resource constraints",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Model overfitting",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: La falta de datos de entrenamiento habría producido un rendimiento deficiente desde el principio, no una degradación súbita tras meses de buen funcionamiento estable.\n\nOpción B (Correcta): El data drift es una variación significativa entre la distribución de los datos de producción y la distribución de los datos usados para entrenar el modelo (o un cambio significativo en los datos de entrada a lo largo del tiempo). Es la causa típica documentada de que un modelo que funcionaba bien empiece a degradarse de forma repentina en producción, ya que las relaciones estadísticas que el modelo aprendió durante el entrenamiento ya no reflejan la realidad actual. Por eso servicios como SageMaker Model Monitor existen específicamente para detectar este fenómeno.\n\nOpción C: Las limitaciones de recursos de cómputo provocan normalmente problemas de latencia, throughput o errores del servicio, no una caída de las métricas de calidad predictiva (accuracy, F1, etc.).\n\nOpción D: El sobreajuste (overfitting) es un problema inherente al momento del entrenamiento/evaluación inicial; se manifestaría desde el despliegue, no aparecería de repente después de meses de buen rendimiento estable.\n\nReferencias:\nhttps://docs.aws.amazon.com/whitepapers/latest/accenture-ai-scaling-ml-and-deep-learning-models/monitoring-for-performance-and-bias.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-model-monitor.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20146,
    "questionNumber": 146,
    "question": "An ML engineer is using AWS Glue to transform proprietary data from a third-party vendor to a format that the ML engineer intends to use with the Amazon SageMaker DeepAR forecasting algorithm. The data includes several similar time series data files that the ML engineer must convert to the appropriate format. The ML engineer must compress the files to optimize storage costs. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Snappy to convert the files to RecordIO-Protobuf and to compress the files.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use XZ to convert the files to RecordIO-Protobuf and to compress the files.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use XZ to convert the files to Apache Parquet format and to compress the files.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use gzip to convert the files to Apache Parquet and to compress the files.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Según la documentación oficial de DeepAR (\"Input/Output Interface for the DeepAR Algorithm\"), el canal de entrenamiento admite datos en formato JSON Lines (opcionalmente comprimidos en gzip) o en formato Apache Parquet; RecordIO-Protobuf NO está documentado como formato soportado por DeepAR, por lo que esta opción es incorrecta independientemente del compresor usado.\n\nOpción B: Igual que A, RecordIO-Protobuf no es un formato de entrada válido para DeepAR según la documentación.\n\nOpción C: Aunque Parquet sí es un formato válido para DeepAR, la documentación menciona explícitamente gzip como el compresor soportado junto con JSON Lines/Parquet; XZ no aparece mencionado como opción soportada en la documentación de DeepAR ni es un códec de compresión típico para escritura de Parquet en AWS Glue.\n\nOpción D (Correcta): La documentación de DeepAR indica textualmente que \"Files can be in gzip or Parquet file format\", es decir, los datos de entrenamiento/prueba pueden entregarse como Parquet, y gzip es el compresor documentado como compatible con este algoritmo. AWS Glue soporta de forma nativa la escritura de archivos Parquet comprimidos con gzip, cumpliendo el requisito de optimizar el almacenamiento sin salirse de los formatos soportados por DeepAR.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/deepar.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20147,
    "questionNumber": 147,
    "question": "A company has significantly increased the amount of data that is stored as .csv files in an Amazon S3 bucket. Data transformation scripts and queries are now taking much longer than they used to take. An ML engineer must implement a solution to optimize the data for query performance. Which solution will meet this requirement with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure an AWS Lambda function to split the .csv files into smaller objects in the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure an AWS Glue job to drop columns that have string type values and to save the results to the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure an AWS Glue extract, transform, and load (ETL) job to convert the .csv files to Apache Parquet format.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure an Amazon EMR cluster to process the data that is in the S3 bucket.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Dividir los CSV en objetos más pequeños no cambia el formato subyacente (sigue siendo texto orientado a filas), por lo que no mejora sustancialmente el rendimiento de escaneo columnar, y añade la carga operativa de mantener una función Lambda personalizada.\n\nOpción B: Eliminar columnas de tipo string es una pérdida de información de negocio potencialmente necesaria y no resuelve el problema de fondo, que es el formato de almacenamiento orientado a filas.\n\nOpción C (Correcta): Convertir los CSV a Apache Parquet mediante un job ETL de AWS Glue (servicio totalmente gestionado y sin servidor) permite el \"column pruning\" y el \"predicate pushdown\", reduciendo drásticamente el volumen de datos escaneados en consultas posteriores (por ejemplo con Athena), sin necesidad de aprovisionar ni gestionar infraestructura, lo que representa el mínimo esfuerzo operativo.\n\nOpción D: Aprovisionar y gestionar un clúster de Amazon EMR implica mucho más esfuerzo operativo (gestión de clúster, escalado, parcheo) que un job serverless de Glue.\n\nReferencias:\nhttps://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html\nhttps://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20148,
    "questionNumber": 148,
    "question": "An ML engineer is analyzing a classification dataset before training a model in Amazon SageMarker AI. The ML engineer suspects that the dataset has a significant imbalance between class labels that could lead to biased model predictions. To confirm class imbalance, the ML engineer needs to select an appropriate pre-training bias metric. Which metric will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Mean square error (MSE)",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Difference in proportions of labels (DPL)",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Silhouette score",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Structural similarity index measure (SSIM)",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: El error cuadrático medio (MSE) es una métrica de exactitud para modelos de regresión ya entrenados, no un indicador de desequilibrio de clases en el dataset previo al entrenamiento.\n\nOpción B (Correcta): La documentación de Amazon SageMaker Clarify define la \"Difference in Proportions of Labels (DPL)\" como una métrica de sesgo pre-entrenamiento (pre-training bias metric) que compara la proporción de resultados con etiqueta positiva entre distintos grupos (facets) del dataset de entrenamiento. Un valor de DPL alejado de 0 es precisamente la señal documentada de desequilibrio en las proporciones de las etiquetas, lo que la convierte en la métrica correcta para confirmar el desequilibrio de clases sospechado.\n\nOpción C: El silhouette score evalúa la calidad/cohesión de los clusters en aprendizaje no supervisado; no mide sesgo ni desequilibrio de etiquetas.\n\nOpción D: SSIM es una métrica de calidad de imágenes (similitud estructural), sin relación con el desequilibrio de clases en un dataset tabular de clasificación.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-data-bias-metric-true-label-imbalance.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-measure-data-bias.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20149,
    "questionNumber": 149,
    "question": "An ML engineer uses one ML framework to train multiple ML models. The ML engineer needs to optimize the inference costs and host the models on Amazon SageMaker AI. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a multi-container inference endpoint for direct invocation.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a multi-model inference endpoint for all the models.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a multi-container inference endpoint for sequential invocation.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create multiple single-model inference endpoint for each model.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Un endpoint multi-contenedor con invocación directa está pensado principalmente para alojar modelos de distintos frameworks/contenedores en un mismo endpoint; cada contenedor permanece cargado, sin el mecanismo dinámico de carga/descarga que optimiza costes cuando se tienen muchos modelos del mismo framework.\n\nOpción B (Correcta): Según la documentación de SageMaker AI, los \"multi-model endpoints\" usan un contenedor de servicio compartido que carga y descarga modelos dinámicamente según la demanda, lo que reduce los costes de hosting y el overhead de despliegue frente a tener un contenedor/endpoint por modelo; es la opción recomendada explícitamente cuando se dispone de muchos modelos entrenados con el mismo framework, siendo la más rentable.\n\nOpción C: La invocación secuencial de contenedores múltiples (inference pipeline) está pensada para encadenar pasos de preprocesamiento/inferencia de un mismo flujo, no para optimizar el coste de alojar muchos modelos independientes.\n\nOpción D: Desplegar un endpoint independiente por modelo implica pagar por instancias de cómputo dedicadas para cada uno, siendo la opción menos eficiente en coste.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/multi-model-endpoints.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model-advanced.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/multi-container-endpoints.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20150,
    "questionNumber": 150,
    "question": "A company is using an ML model to classify motion in videos. The data is stored in MP4 format in Amazon S3. When the company created the model, the company needed 4 months to label all the video frames. The company needs to retrain the model with an existing training workflow in Amazon SageMaker AI. An ML engineer must implement a solution that decreases the labeling time. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use SageMaker Ground Truth to annotate the video frames.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use SageMaker JumpStart to use pre-trained computer vision models to develop a labeling model.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use SageMaker Data Wrangler to create a data workflow. Use the workflow to optimize the labeling process.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use the labeling interface of Amazon Augmented AI (Amazon A2I) with Amazon Rekognition to label the video frames.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Amazon SageMaker Ground Truth ofrece de forma nativa tipos de tareas de etiquetado de \"video frame\" (detección/seguimiento de objetos en fotogramas de vídeo) junto con \"automated data labeling\", una funcionalidad de aprendizaje activo que entrena un modelo durante el propio proceso de etiquetado para autoetiquetar la mayoría de los ejemplos, enviando a revisión humana solo los casos de menor confianza. Esto reduce drásticamente el tiempo de etiquetado (frente a los 4 meses previos) y se integra directamente en el flujo de entrenamiento existente de SageMaker.\n\nOpción B: SageMaker JumpStart ofrece modelos de visión preentrenados para tareas específicas, pero no es una herramienta de etiquetado orientada a producir un dataset etiquetado con la interfaz y el flujo de trabajo (workforce, revisión, control de calidad) que Ground Truth ya proporciona de forma nativa; requeriría desarrollo adicional considerable.\n\nOpción C: SageMaker Data Wrangler está diseñado para la preparación y transformación de datos/features, no para anotar/etiquetar fotogramas de vídeo en bruto.\n\nOpción D: Amazon A2I con Rekognition añade un desarrollo de flujo de trabajo personalizado (Rekognition no está diseñado para clasificar directamente \"motion\" genérico) y no aprovecha la capacidad de etiquetado de vídeo/aprendizaje activo ya integrada nativamente en Ground Truth, resultando en mayor esfuerzo de implementación.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/sms-automated-labeling.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/sms-video-overview.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20151,
    "questionNumber": 151,
    "question": "An ecommerce company trains an ML model to forecast demand for near real-time inventory management based on historical customer activity. The company successfully deploys the trained model to a production Amazon SageMaker AI endpoint. However, the company notices that the model’s forecast performance degrades over time. The company needs a long-term and automated solution to mitigate the performance degradation. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon SageMaker Debugger to automatically send alerts when model performance anomalies are detected.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS X-Ray to monitor the performance of the SageMaker AI endpoint and the incoming requests to inform model re-training.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon SageMaker Ground Truth to curate a high-quality dataset. Use the dataset to re-train the model.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon SageMaker Clarify to monitor model and feature attribution bias to inform model re-training.",
        "isCorrect": true
      }
    ],
    "comments": "NOTA: Aqui discrepo de la \"Most Accepted Answer\" (A) de ExamTopics. La documentación oficial de SageMaker describe Amazon SageMaker Debugger explícitamente como una herramienta de perfilado y depuración de TRABAJOS DE ENTRENAMIENTO (detecta problemas como gradientes que desaparecen, cuellos de botella de recursos durante el training), no como un mecanismo de monitorización continua de un endpoint de inferencia en producción; por tanto, no puede detectar ni alertar sobre la degradación del forecast de un modelo ya desplegado.\n\nOpción A: Incorrecta por lo anterior: Debugger opera sobre trabajos de entrenamiento, no sobre endpoints de producción en tiempo real.\n\nOpción B: AWS X-Ray traza latencias y llamadas distribuidas entre servicios; no analiza la calidad estadística de las predicciones del modelo ni detecta drift, por lo que no puede alimentar decisiones de reentrenamiento basadas en degradación del forecast.\n\nOpción C: Curar manualmente un dataset de alta calidad con Ground Truth y reentrenar es una acción puntual y manual, no constituye por sí sola una solución \"automatizada y a largo plazo\" (no hay disparador continuo ni monitorización programada).\n\nOpción D (Correcta): SageMaker Clarify se integra con SageMaker Model Monitor para programar (\"schedule\") trabajos automáticos y recurrentes de monitorización de bias drift y feature attribution drift sobre endpoints en tiempo real (ModelBiasModelMonitor), generando alertas continuas ante cambios estadísticamente significativos que pueden usarse para disparar el reentrenamiento del modelo. De las opciones ofrecidas, es la única que representa un mecanismo de monitorización automatizada y sostenida en el tiempo sobre el endpoint de producción.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-monitor-bias-drift.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/train-debugger.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/debugger-profile-training-jobs.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20152,
    "questionNumber": 152,
    "question": "A logistics company has installed in-vehicle cameras for basic monitoring of its drivers. The company wants to improve driver safety by identifying distractions that could lead to accidents. Which solution will meet this requirement with the LEAST operational effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Rekognition eye gaze direction detection to monitor driver behavior and identify distractions.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use Amazon SageMaker AI to customize an AI model to monitor driver behavior and identify distractions.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Integrate a third-party driver monitoring system with Amazon Rekognition to monitor driver behavior and identify distractions",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon Comprehend to analyze text-based driver feedback and identify distractions.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): La API de detección facial de Amazon Rekognition incluye el atributo EyeDirection, que devuelve la dirección de la mirada (pitch/yaw) de una persona detectada en una imagen o vídeo. Esto es una capacidad ya construida y gestionada por AWS, por lo que usarla para detectar distracciones basadas en la dirección de la mirada del conductor requiere el mínimo esfuerzo operativo (sin entrenar ni mantener un modelo propio).\n\nOpción B: Personalizar y entrenar un modelo propio en SageMaker exige recopilar datos, etiquetarlos, entrenar, ajustar hiperparámetros y mantener el modelo a lo largo del tiempo, un esfuerzo operativo mucho mayor que usar una API ya gestionada.\n\nOpción C: Integrar un sistema de monitorización de terceros añade complejidad de integración, coste de licenciamiento y mantenimiento adicional frente al uso directo de una API nativa de AWS.\n\nOpción D: Amazon Comprehend analiza texto en lenguaje natural; no es aplicable a la detección de distracciones a partir de imágenes/vídeo de cámaras dentro del vehículo.\n\nReferencias:\nhttps://docs.aws.amazon.com/rekognition/latest/APIReference/API_EyeDirection.html\nhttps://docs.aws.amazon.com/rekognition/latest/dg/how-it-works-types.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20153,
    "questionNumber": 153,
    "question": "A company has trained an ML model that is packaged in a container. The company will integrate the model with an existing Python web application. The company needs to host the model on AWS by using Kubernetes. The company does not want to manage the control plane and must provision the resources in a repeatable manner. The infrastructure must be provisioned by using Python. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS CloudFormation to provision Amazon EC2 instances in multiple Availability Zones. Set up a Kubernetes cluster. Host the model container on the Kubernetes cluster.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use the AWS CLI to provision an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. Store the image in an Amazon Elastic Container Registry (Amazon ECR) repository. Host the model container on the EKS cluster.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the AWS Cloud Development Kit (AWS CDK) to provision an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. Store the image in an Amazon Elastic Container Registry (Amazon ECR) repository. Host the model container on the EKS cluster.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use AWS CloudFormation to provision an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. Store the image in an Amazon Elastic Container Registry (Amazon ECR) repository. Host the model container on the EKS cluster.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Montar un clúster de Kubernetes autogestionado sobre instancias EC2 obliga a operar y mantener el plano de control de Kubernetes manualmente, incumpliendo el requisito de \"no querer gestionar el control plane\" (que sí gestiona AWS de forma nativa en EKS).\n\nOpción B: El AWS CLI es una herramienta imperativa de línea de comandos; no constituye una definición de infraestructura \"usando Python\" de forma declarativa y reproducible como pide el requisito.\n\nOpción C (Correcta): AWS CDK permite definir infraestructura como código usando lenguajes de programación de propósito general, incluido Python, generando plantillas de CloudFormation que se despliegan de forma repetible; Amazon EKS es un servicio gestionado en el que AWS opera el plano de control de Kubernetes, cumpliendo así el requisito de no gestionarlo. Es la única opción que satisface simultáneamente los requisitos de Python, repetibilidad y no gestionar el control plane.\n\nOpción D: Las plantillas de AWS CloudFormation se escriben en JSON o YAML, no en Python, por lo que no cumple el requisito de que la infraestructura se aprovisione usando Python.\n\nReferencias:\nhttps://docs.aws.amazon.com/cdk/v1/guide/work-with.html\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/choose-iac-tool/aws-cdk.html\nhttps://docs.aws.amazon.com/eks/latest/userguide/related-projects.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20154,
    "questionNumber": 154,
    "question": "An ML engineer is developing a linear regression ML model. The model shows high accuracy on the training dataset but performs poorly on unseen new data. Which action should the ML engineer take to address this issue?",
    "choices": [
      {
        "letter": "A",
        "text": "Increase the complexity of the model to capture more patterns in the training data. Use Amazon SageMaker Debugger to monitor for convergence issues.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Apply ML techniques such as cross-validation and regularization. Use Amazon SageMaker Experiments to track and compare different model versions and their performance metrics.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Directly deploy the model into production. Use Amazon SageMaker Clarify to interpret model outputs on new data. Adjust the model based on these insights.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Increase the size of the training dataset without adjusting the size of the model. Retrain the model on the new data. Generate a confusion matrix to analyze the results.",
        "isCorrect": false
      }
    ],
    "comments": "El escenario descrito (alta precisión en entrenamiento, bajo rendimiento en datos nuevos) es el patrón clásico de sobreajuste (overfitting) por exceso de varianza del modelo.\n\nOpción A: Aumentar la complejidad del modelo empeoraría el sobreajuste en lugar de corregirlo; además, SageMaker Debugger está orientado a problemas de convergencia durante el entrenamiento (gradientes, pesos), no a la capacidad de generalización del modelo.\n\nOpción B (Correcta): La validación cruzada proporciona una estimación más fiable del rendimiento en datos no vistos, y la regularización (p. ej. Ridge/Lasso) penaliza la complejidad del modelo para reducir la varianza y mejorar la generalización. Amazon SageMaker Experiments permite registrar, comparar y seleccionar entre distintas versiones del modelo (con distintos hiperparámetros de regularización) según sus métricas de validación, exactamente lo necesario para corregir el sobreajuste de forma sistemática.\n\nOpción C: Desplegar directamente en producción sin resolver el problema de varianza expone a los usuarios a un modelo que no generaliza; SageMaker Clarify explica atribuciones de features y sesgo, no corrige el sobreajuste.\n\nOpción D: Aumentar el tamaño del dataset sin regularizar ni validar no garantiza resolver el sobreajuste si el modelo sigue siendo demasiado complejo para la señal disponible; además, una matriz de confusión es una herramienta de evaluación de clasificación, no aplicable directamente a un modelo de regresión lineal como el descrito.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/experiments-mlops.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/experiments-view-compare.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20155,
    "questionNumber": 155,
    "question": "A company is training a new ML model to replace a model that is deployed on an Amazon SageMaker AI real-time endpoint. An ML engineer needs to determine the latency and the accuracy of the new model. The ML engineer must evaluate the new model in a production scenario without affecting the users of the existing model. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Perform a blue/green deployment with linear traffic shifting.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Perform a blue/green deployment with canary traffic shifting.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Perform a rolling deployment with a rolling batch size of 50% of the current fleet.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Perform shadow testing with a traffic sampling percentage of 100%.",
        "isCorrect": true
      }
    ],
    "comments": "Opciones A y B: Tanto el traffic shifting lineal como el canary en un despliegue blue/green hacen que una parte real de los usuarios reciba efectivamente las respuestas generadas por el nuevo modelo, lo cual afecta a esos usuarios, incumpliendo el requisito de no afectar a los usuarios del modelo existente.\n\nOpción C: Un despliegue rolling sustituye progresivamente instancias de producción por la nueva versión, por lo que en todo momento hay usuarios reales siendo servidos por el modelo nuevo, afectándolos igualmente.\n\nOpción D (Correcta): El shadow testing de SageMaker AI permite replicar hasta el 100% de las solicitudes de inferencia reales hacia el modelo nuevo (shadow variant), registrando sus predicciones y latencias en S3, pero sin devolver nunca esas respuestas al llamador; el usuario final sigue siendo atendido exclusivamente por el modelo de producción, permitiendo medir con tráfico real tanto la latencia como la precisión del nuevo modelo sin ningún impacto en los usuarios existentes.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-validation.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20156,
    "questionNumber": 156,
    "question": "An ML engineer wants to use, prepare, and load data from Amazon S3 for analytics. The ML engineer must run an extract, transform, and load (ETL) job to discover the schema of the data and to store the metadata. Which solution will meet these requirements with the LEAST manual effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Glue to run the ETL job. Use the job to discover the schema and to store the associated metadata in the AWS Glue Data Catalog.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an Amazon SageMaker Data Wrangler flow to run the ETL job. Use the job to discover the schema and to store the associated metadata in an S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an ETL pipeline by using Amazon Athena integrated with AWs Step Functions. Use the pipeline to run the ETL job to discover the schema and to store the associated metadata in an S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Launch an Amazon EC2 instance that includes the scikit-learn library to run the ETL job. Use the job to discover the schema and to store the associated metadata in Amazon Redshift.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): AWS Glue es un servicio ETL serverless y totalmente gestionado cuyos crawlers/jobs pueden descubrir automáticamente el esquema de los datos en S3 y registrar ese esquema junto con sus metadatos directamente en el AWS Glue Data Catalog, un catálogo de metadatos gestionado, sin necesidad de aprovisionar infraestructura ni construir un almacén de metadatos propio: es la opción de menor esfuerzo manual.\n\nOpción B: SageMaker Data Wrangler está orientado a la preparación/transformación de features para ML, no a un catálogo de metadatos de esquema estructurado; guardar solo en un bucket S3 no ofrece un catálogo consultable equivalente al Glue Data Catalog.\n\nOpción C: Athena necesita normalmente un esquema/tabla ya definido (típicamente vía un Glue Crawler) para poder consultar los datos; construir una tubería con Step Functions añade orquestación y esfuerzo de desarrollo adicional en comparación con un job de Glue.\n\nOpción D: Ejecutar scikit-learn en una instancia EC2 autogestionada obliga a implementar manualmente la inferencia de esquema y a mantener un almacén de metadatos en Redshift, lo que implica mucho más esfuerzo operativo y manual que el catálogo serverless de Glue.\n\nReferencias:\nhttps://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html\nhttps://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20157,
    "questionNumber": 157,
    "question": "An ML engineer is building an ML pipeline. The pipeline must process a dataset in two ways by using Amazon Athena. The pipeline must use batch processing to perform large-scale data transformations and for model training. The pipeline must also use near real-time processing to perform low-latency queries for inference and analytics. Which file format will provide the LEAST latency for both types of processing?",
    "choices": [
      {
        "letter": "A",
        "text": "CSV",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Apache Parquet",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Nested JSON",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deserialized JSON",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: CSV es un formato de texto orientado a filas, sin compresión columnar; Athena debe leer filas completas incluyendo columnas irrelevantes para la consulta, penalizando tanto el procesamiento batch a gran escala como las consultas de baja latencia.\n\nOpción B (Correcta): La documentación de Amazon Athena recomienda explícitamente el uso de formatos de almacenamiento columnar como Apache Parquet (\"Use columnar storage formats\" / \"Use columnar file formats\") porque permiten column pruning y predicate pushdown, reduciendo drásticamente el volumen de datos escaneados; esto beneficia simultáneamente tanto las transformaciones batch a gran escala como las consultas interactivas de baja latencia, con mejoras de rendimiento y coste documentadas de decenas de veces frente a formatos basados en texto.\n\nOpciones C y D: JSON (anidado o \"deserializado\") sigue siendo un formato orientado a filas basado en texto, con overhead de parseo adicional respecto a CSV y sin las ventajas de poda de columnas de un formato columnar, por lo que ofrece peor rendimiento que Parquet en ambos escenarios.\n\nReferencias:\nhttps://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html\nhttps://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20158,
    "questionNumber": 158,
    "question": "A company uses an Amazon SageMaker AI ML model to make real-time inferences. The company has configured auto scaling for the Amazon EC2 instances that SageMaker AI uses for the inferences. During times of peak usage, new instances launch before existing instances are fully ready. As a result, the model experiences inefficiencies and delays. Which solution will optimize the scaling process without affecting response times?",
    "choices": [
      {
        "letter": "A",
        "text": "Change to a multi-model endpoint configuration in SageMaker AI.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Integrate Amazon API Gateway and AWS Lambda to manage invocations of the SageMaker AI inference endpoint.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Decrease the cooldown period for scale-in activities. Increase the maximum number of instances.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Increase the cooldown period after scale-out activities.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Cambiar a un endpoint multi-modelo modifica la forma en que se cargan/descargan los modelos en el contenedor, pero no afecta al mecanismo de auto scaling de instancias ni al tiempo que necesitan las nuevas instancias para estar listas.\n\nOpción B: Añadir API Gateway y Lambda introduce un salto adicional para gestionar las invocaciones, pero no resuelve el problema de fondo, que es el ritmo con el que se lanzan nuevas instancias durante el auto scaling.\n\nOpción C: Reducir el cooldown de scale-in y aumentar el máximo de instancias haría el escalado MÁS agresivo y frecuente, lo que empeoraría el problema de que se lancen nuevas instancias antes de que las anteriores estén listas.\n\nOpción D (Correcta): Según la documentación de SageMaker AI, el periodo de cooldown \"protege contra el sobre-escalado... limitando la creación de instancias para las solicitudes de scale-out\". Aumentar el cooldown tras las actividades de scale-out da tiempo a que las instancias recién lanzadas se inicialicen completamente antes de que pueda dispararse otra acción de escalado, resolviendo el problema descrito (nuevas instancias lanzándose antes de que las existentes estén listas) sin afectar los tiempos de respuesta del tráfico ya servido.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling-policy.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling-add-code-define.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20159,
    "questionNumber": 159,
    "question": "A company deployed an Amazon SageMaker AI ML model to an endpoint by calling the CreateModel API operation. The network that was established with the API call includes two private subnets and one security group. The model must download data from an Amazon S3 bucket and must upload data to the S3 bucket. The traffic to the S3 bucket must not travel across the internet. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a NAT gateway. Configure the security group to allow outbound connections. Configure route tables to redirect any traffic to the S3 bucket through the NAT gateway.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a gateway VPC endpoint. Configure an endpoint policy that restricts access to the S3 bucket. Configure route tables to redirect any traffic to the S3 bucket through the endpoint.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an interface VPC endpoint. Verify that the security group allows only inbound connections. Configure route tables to redirect any traffic to the S3 bucket through the endpoint.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a Gateway Load Balancer VPC endpoint. Configure an IAM policy that restricts access to the S3 bucket. Configure route tables to redirect any traffic to the S3 bucket through the endpoint.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Un NAT gateway reside en una subred pública y encamina el tráfico a través de un Internet Gateway; por tanto, el tráfico hacia S3 seguiría atravesando la ruta de internet, incumpliendo el requisito de que el tráfico no debe viajar por internet.\n\nOpción B (Correcta): La documentación de SageMaker AI para el acceso a S3 desde una VPC privada recomienda crear un \"gateway VPC endpoint\" para Amazon S3, que proporciona una ruta privada (sin pasar por internet) entre la VPC y S3 añadiendo un target en la tabla de rutas; además se puede adjuntar una política de endpoint que restrinja el acceso a un bucket concreto. Esto cumple exactamente el requisito de tráfico privado hacia S3 con un mecanismo nativo y gestionado por AWS.\n\nOpción C: Un interface VPC endpoint (PrivateLink) también evita internet, pero la descripción de la opción (\"security group allows only inbound connections\") es incorrecta: una ENI de interface endpoint necesita reglas de salida (o el comportamiento por defecto) para completar la comunicación bidireccional; además, para S3 el mecanismo estándar y gratuito documentado es el gateway endpoint, no el interface endpoint.\n\nOpción D: Un Gateway Load Balancer endpoint se utiliza para insertar dispositivos virtuales de terceros (firewalls, IDS/IPS) en el flujo de tráfico; no es un mecanismo de conectividad privada hacia S3.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/host-vpc.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/appendix-notebook-and-internet-access.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20160,
    "questionNumber": 160,
    "question": "A company is developing a new ML model to rank customers in order of their potential to pay back loans. The company needs to use an Amazon SageMaker AI built-in algorithm. Which algorithm should the company use to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "XGBoost",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "K-means clustering",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Principal component analysis (PCA)",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Neural Topic Model (NTM)",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): XGBoost es un algoritmo integrado (built-in) de Amazon SageMaker AI de aprendizaje supervisado basado en árboles de decisión potenciados (gradient boosted trees), documentado para datos tabulares y ampliamente usado para tareas de clasificación, regresión y ranking (por ejemplo con objetivos rank:pairwise/rank:ndcg); es la elección estándar en SageMaker para puntuar/ordenar clientes según probabilidad de un resultado, como la capacidad de devolver un préstamo.\n\nOpción B: K-means es un algoritmo de clustering no supervisado; no está diseñado para producir una puntuación de riesgo/ranking supervisado a partir de una etiqueta de resultado conocida.\n\nOpción C: PCA es una técnica de reducción de dimensionalidad, no un algoritmo predictivo ni de ranking.\n\nOpción D: Neural Topic Model es un algoritmo no supervisado de modelado de temas para datos de texto, sin relación con el problema de ranking de clientes sobre datos estructurados.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/xgboost.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/algorithms-tabular.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20161,
    "questionNumber": 161,
    "question": "An ML engineer is setting up an Amazon SageMaker AI pipeline for an ML model. The pipeline must automatically initiate a re-training job if any data drift is detected. How should the ML engineer set up the pipeline to meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Use an AWS Glue crawler and an AWS Glue extract, transform and load (ETL) job to detect data drift. Use AWS Glue triggers to automate the re-training job.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon Managed Service for Apache Flink to detect data drift. Use an AWS Lambda function to automate the re-training job.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use SageMaker Model Monitor to detect data drift. Use an AWS Lambda function to automate the re-training job.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use Amazon QuickSight anomaly detection to detect data drift. Use an AWS Step Functions workflow to automate the re-training job.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: AWS Glue crawler/ETL sirven para catalogar y transformar datos, no están diseñados para calcular estadísticas de deriva de datos ni comparar distribuciones contra un baseline de entrenamiento; usar Glue para esto implicaría construir lógica de detección de drift a medida, aumentando el esfuerzo operativo.\n\nOpción B: Amazon Managed Service for Apache Flink es un motor de procesamiento de streaming de propósito general; no ofrece de forma nativa la funcionalidad de generación de baselines estadísticos ni de reglas de calidad/drift que sí ofrece SageMaker Model Monitor, por lo que también requeriría desarrollo adicional.\n\nOpción C (Correcta): SageMaker Model Monitor está diseñado específicamente para calcular baselines de calidad de datos y ejecutar trabajos de monitorización programados que comparan la distribución de los datos de inferencia contra dicho baseline, generando violaciones cuando detecta drift. Estas violaciones pueden publicarse como métricas en Amazon CloudWatch y disparar una alarma de CloudWatch que invoque una función AWS Lambda, la cual puede iniciar un nuevo SageMaker Pipeline o un training job de re-entrenamiento de forma automática. Es el patrón de referencia documentado por AWS (Well-Architected Machine Learning Lens) para pipelines de re-entrenamiento automático ante drift.\n\nOpción D: Amazon QuickSight es una herramienta de business intelligence orientada a visualización y detección de anomalías en dashboards para usuarios de negocio, no está integrada de forma nativa con SageMaker para evaluar drift de features de un modelo ni para disparar workflows de MLOps; Step Functions sí podría orquestar el reentrenamiento, pero la fuente de detección de drift (QuickSight) no es la solución nativa de ML.\n\nReferencias:\nhttps://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlperf06-bp03.html\nhttps://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlperf06-bp06.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-model-monitor.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20162,
    "questionNumber": 162,
    "question": "A company has developed a computer vision model. The company needs to deploy the model into production on Amazon SageMaker AI. The company has not hosted a model on SageMaker AI previously. An ML engineer needs to implement a solution to track model versions. The solution also must provide recommendations about which Amazon EC2 instance types to use to host the model. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Register the model in Amazon Elastic Container Registry (Amazon ECR). Use AWS Compute Optimizer for recommendations about instance types.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Register the model in the SageMaker Model Registry. Use SageMaker Autopilot for recommendations about instance types.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Register the model in the SageMaker Model Registry. Use SageMaker Inference Recommender for recommendations about instance types.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Register the model in Amazon Elastic Container Registry (Amazon ECR). Use SageMaker Experiments for recommendations about instance types.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Amazon ECR almacena imágenes de contenedor, no versiones de modelos de ML (artefactos, metadatos de linaje, estado de aprobación); no es la herramienta de versionado de modelos. AWS Compute Optimizer da recomendaciones de rightsizing para EC2, Lambda, EBS, etc. en base a uso histórico, pero no está diseñado para benchmarking de latencia/throughput de un endpoint de inferencia de SageMaker.\n\nOpción B: SageMaker Model Registry sí es correcto para versionado, pero SageMaker Autopilot es una herramienta de AutoML para construir modelos automáticamente, no ofrece recomendaciones de tipo de instancia de hosting.\n\nOpción C (Correcta): El SageMaker Model Registry permite catalogar y versionar modelos (model package groups y versiones), registrar metadatos, y gestionar el ciclo de aprobación antes del despliegue. Una vez el modelo está registrado, SageMaker Inference Recommender ejecuta un trabajo de benchmarking de carga sobre distintos tipos de instancia (usando los datos de muestra del registro del modelo) y recomienda la configuración de instancia óptima en coste/latencia para el hosting, que es exactamente lo que pide la empresa que despliega por primera vez en SageMaker.\n\nOpción D: Igual que A, ECR no sirve para versionado de modelos ML de forma nativa; SageMaker Experiments se usa para el seguimiento de experimentos de entrenamiento (métricas, hiperparámetros), no para recomendar instancias de despliegue.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/inference-recommender-instance-recommendation.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-details.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/inference-recommender-recommendation-jobs.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20163,
    "questionNumber": 163,
    "question": "A company is using Amazon SageMaker AI to develop a credit risk assessment model. During model validation, the company finds that the model achieves 82% accuracy on the validation data. However, the model achieved 99% accuracy on the training data. The company needs to address the model accuracy issue before deployment. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Add more dense layers to increase model complexity. Implement batch normalization. Use early stopping during training.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Implement dropout layers. Use L1 or L2 regularization. Perform k-fold cross-validation.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use principal component analysis (PCA) to reduce the feature dimensionality. Decrease model layers. Implement cross-entropy loss functions.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Augment the training dataset. Remove duplicate records from the training dataset. Implement stratified sampling.",
        "isCorrect": false
      }
    ],
    "comments": "La brecha entre 99% de exactitud en entrenamiento y 82% en validación es el patrón clásico de sobreajuste (overfitting): el modelo memoriza el ruido y las particularidades del set de entrenamiento en lugar de aprender patrones generalizables.\n\nOpción A: Añadir más capas densas incrementa la capacidad del modelo, lo que normalmente empeora el sobreajuste en lugar de solucionarlo; batch normalization y early stopping ayudan pero se contradicen con la primera acción de aumentar la complejidad.\n\nOpción B (Correcta): El dropout desactiva aleatoriamente neuronas durante el entrenamiento, obligando a la red a no depender de unidades concretas y mejorando la generalización; la regularización L1/L2 penaliza pesos grandes reduciendo la complejidad efectiva del modelo; la validación k-fold cruzada da una estimación más robusta del rendimiento en datos no vistos y ayuda a detectar/mitigar el sobreajuste durante el ajuste de hiperparámetros. Es el conjunto de técnicas estándar documentado por AWS (dominio de entrenamiento/ajuste de modelos del examen MLA-C01) para combatir el overfitting.\n\nOpción C: PCA reduce dimensionalidad pero no ataca directamente el sobreajuste del proceso de entrenamiento; decrecer capas puede ayudar algo, pero cambiar la función de pérdida a cross-entropy no tiene relación con resolver overfitting (de hecho cross-entropy es habitual en clasificación y no es en sí una técnica anti-overfitting).\n\nOpción D: Aumentar datos, eliminar duplicados y usar muestreo estratificado mejoran la calidad de los datos y pueden ayudar algo a la generalización, pero no son las técnicas de regularización de modelo estándar que atacan directamente la causa del gap 99%/82% observado.\n\nReferencias:\nhttps://docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-01/machine-learning-engineer-associate-01-domain2.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-model-validation.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20164,
    "questionNumber": 164,
    "question": "A company collects customer data every day. The company stores the data as compressed files in an Amazon S3 bucket that is partitioned by date. Every month, analysts download the data, process the data to check the data quality, and then upload the data to Amazon QuickSight dashboards. An ML engineer needs to implement a solution to automatically check the data quality before the data is sent to QuickSight. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Run an AWS Glue crawler every month to update the AWS Glue Data Catalog. Use AWS Glue Data Quality rules to check the data quality.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use an AWS Glue trigger to run an AWS Glue crawler every month to update the AWS Glue Data Catalog. Create an AWS Glue job that loads the data into a PySpark DataFrame. Configure the job to apply custom functions and to evaluate the data quality.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Run Python scripts on an AWS Lambda function every month to evaluate data quality. Configure the S3 bucket to invoke the Lambda function when objects are added to the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure the S3 bucket to send event notifications to an Amazon Simple Queue Service (Amazon SQS) queue when objects are uploaded. Use Amazon CloudWatch insights every month for the SQS queue to evaluate the data quality.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): AWS Glue Data Quality es una característica totalmente gestionada que, a partir de una tabla del Glue Data Catalog, permite generar reglas de calidad automáticamente (recomendaciones basadas en perfilado) o definirlas de forma declarativa con DQDL, sin necesidad de escribir ni mantener código de evaluación. Ejecutar el crawler mensualmente mantiene el catálogo actualizado y las Data Quality rules evalúan de forma nativa completitud, unicidad, tipos, rangos, etc. Es la solución con menor esfuerzo operativo porque no exige desarrollar ni mantener lógica personalizada.\n\nOpción B: Requiere escribir y mantener un job de Glue con un DataFrame de PySpark y funciones personalizadas de validación; aunque funciona, implica mucho más código y mantenimiento que usar las reglas nativas de Glue Data Quality.\n\nOpción C: Ejecutar scripts Python personalizados en Lambda obliga a implementar y mantener toda la lógica de comprobación de calidad de datos, además de gestionar límites de tiempo de ejecución de Lambda para archivos grandes; mayor sobrecarga operativa que usar un servicio gestionado de calidad de datos.\n\nOpción D: Amazon CloudWatch Logs Insights es una herramienta de consulta sobre logs, no un motor de evaluación de calidad de datos; no puede analizar el contenido real de los archivos S3 a partir de mensajes de una cola SQS, por lo que no cumple el requisito funcional.\n\nReferencias:\nhttps://docs.aws.amazon.com/glue/latest/dg/data-quality-getting-started.html\nhttps://docs.aws.amazon.com/glue/latest/dg/data-quality-using-apis.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20165,
    "questionNumber": 165,
    "question": "A company has an ML model in Amazon SageMaker AI. An ML engineer needs to implement a monitoring solution to automatically detect changes in the input data distribution of model features. Which solution will meet this requirement with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure SageMaker Model Monitor. Establish a data quality baseline. Ensure that the emit_metrics option is enabled in the baseline constraints file. Configure an Amazon CloudWatch alarm to notify the company about changes in specific metrics that are related to data quality.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure SageMaker Model Monitor. Establish a model quality baseline. Ensure that the comparison_method option is set to Robust in the baseline constraints file. Configure an Amazon CloudWatch alarm to notify the company about changes in model quality metrics.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use SageMaker Debugger with custom rules to track shifts in feature distributions. Configure Amazon CloudWatch alarms to notify the company when the rules detect significant changes.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon CloudWatch to directly observe the SageMaker AI endpoint's performance metrics. Manually analyze the CloudWatch logs for indicators of data drift or shifts in feature distribution.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): El requisito es detectar cambios en la distribución de los datos de entrada (data drift), que es exactamente lo que cubre un monitor de calidad de datos (Data Quality Monitor) de SageMaker Model Monitor. Al establecer un baseline de calidad de datos, se generan estadísticas y restricciones (constraints.json) de referencia. Habilitar la opción emit_metrics en el fichero de restricciones hace que las violaciones detectadas en cada ejecución se publiquen automáticamente como métricas en Amazon CloudWatch, sobre las que se puede configurar una alarma. Todo esto es nativo y gestionado, sin necesidad de código personalizado, cumpliendo el mínimo esfuerzo operativo.\n\nOpción B: Un baseline de calidad de modelo (model quality) compara las predicciones del modelo con el ground truth para detectar degradación de desempeño, no cambios en la distribución de los datos de entrada; además \"Robust\" no es un valor estándar documentado para comparison_method en este contexto. No es la solución que responde a la pregunta (drift de features de entrada).\n\nOpción C: SageMaker Debugger está orientado a depurar el proceso de entrenamiento (tensores, gradientes, cuellos de botella de recursos) mediante reglas built-in o personalizadas; no es la herramienta diseñada para monitorizar drift de datos de un endpoint en producción, y requeriría desarrollar reglas propias, aumentando el esfuerzo operativo.\n\nOpción D: Requiere análisis manual de logs de CloudWatch, lo cual es justamente lo opuesto a una solución con el mínimo esfuerzo operativo, además de no ofrecer cálculo estadístico automatizado de deriva.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-model-quality-metrics.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-model-quality.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-byoc-cloudwatch.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20166,
    "questionNumber": 166,
    "question": "A company is using Amazon SageMaker AI to deploy a new recommendation model for its ecommerce website. The model must use data from all client website interactions as input. Traffic is variable throughout the day. The company needs to create an inference endpoint for the model. Which type of inference endpoint will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Batch transform inference endpoint",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Asynchronous inference endpoint",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Real-time inference endpoint",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Serverless inference endpoint",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Batch transform no es un endpoint persistente; procesa un conjunto de datos completo de forma asíncrona y offline, por lo que no sirve para responder a interacciones de clientes web bajo demanda en tiempo casi real.\n\nOpción B: El endpoint asíncrono está pensado para payloads grandes (hasta 1 GB) y tiempos de procesamiento largos (hasta 1 hora), con capacidad de escalar a cero cuando no hay solicitudes; no es el ajuste ideal para un caso de recomendaciones interactivas con tráfico variable pero con necesidad de respuesta rápida.\n\nOpción C: Un endpoint en tiempo real mantiene instancias aprovisionadas de forma continua (siempre encendidas), por lo que se paga por la capacidad reservada independientemente de que el tráfico sea alto o bajo en cada momento del día; no es la opción más rentable cuando el tráfico varía a lo largo del día.\n\nOpción D (Correcta): SageMaker Serverless Inference aprovisiona y escala automáticamente la capacidad de cómputo en función de la demanda, y el coste se calcula solo por el cómputo consumido durante el procesamiento de las solicitudes (más la cantidad de datos procesados), sin necesidad de gestionar ni pagar por instancias inactivas. La documentación de AWS recomienda explícitamente evaluar Serverless Inference para cargas de trabajo con tráfico intermitente o variable como forma de optimizar costes, lo que coincide con el escenario descrito.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/hosting-faqs.html\nhttps://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlcost05-bp02.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20167,
    "questionNumber": 167,
    "question": "A company runs an Amazon SageMaker AI domain in a public subnet of a newly created VPC. The network is configured properly, and ML engineers can access the SageMaker AI domain. Recently, the company discovered suspicious traffic to the domain from a specific IP address. The company needs to block traffic from the specific IP address. Which update to the network configuration will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a security group inbound rule to deny traffic from the specific IP address. Assign the security group to the domain.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a network ACL inbound rule to deny traffic from the specific IP address. Assign the rule to the default network ACL for the subnet where the domain is located.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a shadow variant for the domain. Configure SageMaker Inference Recommender to send traffic from the specific IP address to the shadow endpoint.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a VPC route table to deny inbound traffic from the specific IP address. Assign the route table to the domain.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Según la documentación de VPC, las reglas de un security group solo pueden ser de tipo \"allow\" (\"You can specify allow rules, but not deny rules\"); no existe la posibilidad de crear una regla de denegación explícita en un security group, por lo que esta opción no es técnicamente viable.\n\nOpción B (Correcta): Una network ACL sí admite reglas que permiten o deniegan explícitamente tráfico de entrada o salida a nivel de subred, evaluadas en orden de número de regla. Añadiendo una regla de denegación para la IP concreta en la network ACL asociada (por defecto o personalizada) a la subred donde reside el dominio de SageMaker, se bloquea ese tráfico específico antes de que llegue a cualquier recurso de la subred, sin afectar al resto de tráfico legítimo.\n\nOpción C: Los \"shadow variants\"/\"shadow tests\" de SageMaker se usan para probar una nueva versión de un modelo replicando tráfico de producción hacia un endpoint sombra con fines de comparación de rendimiento, no para bloquear tráfico malicioso; SageMaker Inference Recommender tampoco enruta tráfico, sino que ejecuta benchmarks de carga. Esta opción no tiene sentido técnico para el objetivo planteado.\n\nOpción D: Las tablas de rutas de una VPC determinan hacia dónde se envía el tráfico (siguiente salto), pero no implementan control de acceso ni reglas de \"denegar\" tráfico por IP; no es un mecanismo de filtrado de seguridad.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html\nhttps://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20168,
    "questionNumber": 168,
    "question": "A company's ML engineer is creating a classification model. The ML engineer explores the dataset and notices a column that is named day_of_week. The column's data consists of the following values: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday. Which technique should the ML engineer use to convert this column's data to binary values?",
    "choices": [
      {
        "letter": "A",
        "text": "Binary encoding",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Label encoding",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "One-hot encoding",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Tokenization",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: La codificación binaria (binary encoding) representa cada categoría como un número codificado en base 2 usando menos columnas que categorías, pero produce columnas con combinaciones de 0/1 que no corresponden a una representación indicadora directa de \"pertenece o no a esta categoría\"; no es la técnica estándar de referencia para este caso en la documentación y el temario de SageMaker Data Wrangler/Canvas.\n\nOpción B: El label encoding asigna un número entero distinto a cada categoría (por ejemplo, Monday=0, Tuesday=1, ...); el resultado no son valores binarios, sino ordinales, y además introduce una relación de orden ficticia entre los días que puede inducir sesgos en algunos algoritmos.\n\nOpción C (Correcta): Según la documentación de SageMaker Data Wrangler/DataBrew, la transformación One-Hot Encoding crea, para una columna categórica con n categorías, n nuevas columnas binarias (0/1), donde cada columna indica la presencia (1) o ausencia (0) de esa categoría concreta en el registro. Con 7 valores posibles de day_of_week, se generarían 7 columnas binarias, cumpliendo exactamente el requisito de convertir la columna a valores binarios.\n\nOpción D: La tokenización se aplica a texto libre para dividirlo en unidades léxicas (palabras, subpalabras), no es una técnica de codificación de variables categóricas discretas como los días de la semana.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html\nhttps://docs.aws.amazon.com/databrew/latest/dg/recipe-actions.ONE_HOT_ENCODING.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20169,
    "questionNumber": 169,
    "question": "An ML engineer wants to use Amazon SageMaker AI to prepare data for training. During exploratory data analysis, the ML engineer notices that several categorical features are missing values. How can the ML engineer use SageMaker AI to solve this problem?",
    "choices": [
      {
        "letter": "A",
        "text": "Use SageMaker Clarify to impute categorical features with the mean value.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use SageMaker Clarity to impute categorical features with the mode value.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use SageMaker Data Wrangler to impute categorical features with the mean value.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use SageMaker Data Wrangler to impute categorical features with the mode value.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: SageMaker Clarify es una herramienta de detección de sesgo (bias) y explicabilidad de modelos, no ofrece funcionalidad de imputación de valores faltantes; además, la media (mean) no es aplicable a variables categóricas, que no tienen una media aritmética con sentido.\n\nOpción B: \"SageMaker Clarity\" ni siquiera es el nombre correcto del servicio (es SageMaker Clarify) y, como en la opción A, Clarify no realiza imputación de datos.\n\nOpción C: SageMaker Data Wrangler sí es la herramienta correcta para imputación de datos (transformación \"Impute Missing\"), pero para variables categóricas no tiene sentido estadístico usar la media; la documentación indica que la imputación de columnas categóricas se realiza con estrategias como el valor más frecuente (moda), no con la media, que se reserva para columnas numéricas.\n\nOpción D (Correcta): La transformación \"Impute Missing\" de SageMaker Data Wrangler permite generar una nueva columna con los valores faltantes imputados, soportando estrategias de media o mediana para columnas numéricas y de valor más frecuente (moda) para columnas categóricas. Dado que el problema afecta a features categóricas, la moda es la estrategia correcta y Data Wrangler es el servicio de SageMaker AI diseñado para esta tarea de preparación de datos.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-transform.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20170,
    "questionNumber": 170,
    "question": "A company stores user clickstream data in an Amazon S3 bucket in AWS Account A. The company needs to use the data to train an ML model in Amazon SageMaker AI in AWS Account B. The training will take 10 days. The company needs to use only private IP addresses in the training. The company also must make sure that no training metadata is shared with AWS. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up VPC peering between Account A and Account B. Contact AWS by email to opt out of metadata collection.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Set up a VPC endpoint for the S3 bucket. Set the SageMaker AI OPT_OUT_TRACKING environment variable to 1 in the training job.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Configure a security group policy that is assigned to the S3 bucket in Account A to allow access from only Account B. Create AI services opt-out policies.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Generate presigned URLs with expiration times for the objects that are stored in the S3 bucket. Access the data by using the presigned URLs. Set the SageMaker AI OPT_OUT_TRACKING environment variable to 1 in the training job.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: La VPC peering permite conectividad privada entre VPCs de distintas cuentas, lo que cubriría el requisito de IP privadas, pero no existe un mecanismo de \"opt-out por email\" para dejar de compartir metadatos de entrenamiento de SageMaker; el mecanismo real y documentado es la variable de entorno OPT_OUT_TRACKING en la propia llamada a la API CreateTrainingJob, no un proceso manual por correo.\n\nOpción B (Correcta): Un VPC endpoint de tipo gateway para Amazon S3 permite que los recursos dentro de la VPC (incluidos los contenedores de un training job de SageMaker) accedan al bucket S3 utilizando únicamente direcciones IP privadas, sin salir a Internet ni usar IPs públicas, siempre que la política del bucket/endpoint lo permita (incluye acceso entre cuentas si el bucket lo autoriza). En paralelo, la documentación de \"Data Privacy in Amazon SageMaker AI\" confirma que se puede evitar el envío de metadatos agregados de uso de librerías durante el entrenamiento estableciendo la variable de entorno OPT_OUT_TRACKING=1 en la llamada CreateTrainingJob (vía CLI, Boto3 o SDK de Python). Esta combinación cumple exactamente ambos requisitos.\n\nOpción C: Los security groups se aplican a recursos con interfaces de red (ENI), no pueden asignarse directamente a un bucket S3 (los buckets se protegen con políticas de bucket o IAM, no con security groups); además, \"AI services opt-out policies\" es un mecanismo real de AWS Organizations para servicios de IA que usan contenido de clientes para mejorar los servicios, pero no es el mecanismo específico para desactivar la telemetría de un training job de SageMaker.\n\nOpción D: Las URLs prefirmadas de S3 se generan y se consumen típicamente a través de Internet (endpoints públicos de S3), lo que no garantiza el uso exclusivo de IPs privadas salvo configuración adicional; no es la solución más directa para el requisito de conectividad privada.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-privacy.html\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/train-vpc.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20171,
    "questionNumber": 171,
    "question": "A music streaming company constantly streams song ratings from an application to an Amazon S3 bucket. The company wants to use the ratings as an input for training and inference of an Amazon SageMaker AI model. The company has an AWS Glue Data Catalog that is configured with the S3 bucket as the source. An ML engineer needs to implement a solution to create a repository for this data. The solution must ensure that the data stays synchronized during batch training and real-time inference. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Ingest data into SageMaker Feature Store from the S3 bucket. Apply tags and indexes.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use Amazon Athena. Create tables by using CREATE TABLE AS SELECT (CTAS) queries to group data.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Lake Formation. Apply tag-based control on the data.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use the Generate Data Insights function in SageMaker Data Wrangler.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Amazon SageMaker Feature Store está diseñado precisamente como repositorio centralizado de features con dos almacenes: un \"offline store\" (en S3, en formato Parquet) usado para exploración de datos, entrenamiento por lotes y predicciones batch, y un \"online store\" de baja latencia para inferencia en tiempo real. Cuando ambos almacenes están habilitados para un feature group, SageMaker Feature Store los sincroniza automáticamente para evitar discrepancias entre los datos usados en entrenamiento y en servicio, que es exactamente el requisito planteado.\n\nOpción B: Amazon Athena permite consultar datos en S3 mediante SQL y crear tablas derivadas con CTAS, pero no proporciona un mecanismo de sincronización automática entre un almacén batch y uno de baja latencia para inferencia en tiempo real; sería necesario construir esa sincronización de forma manual.\n\nOpción C: AWS Lake Formation se centra en gobernanza, seguridad y control de acceso basado en etiquetas sobre un data lake, no en la sincronización de features entre entrenamiento e inferencia en tiempo real.\n\nOpción D: \"Generate Data Insights\" en SageMaker Data Wrangler genera un informe de calidad e insights sobre el dataset (valores ausentes, outliers, poder predictivo de columnas), pero no crea ni mantiene un repositorio de features sincronizado entre entrenamiento batch e inferencia en tiempo real.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/feature-store-storage-configurations.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/feature-store-storage-configurations-offline-store.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20172,
    "questionNumber": 172,
    "question": "A hospital is using an ML model to validate x-ray results. The hospital runs a nightly batch inference job. The hospital needs to produce a daily report about model data quality and model performance. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Schedule a monitoring job in Amazon SageMaker Model Monitor. Generate the monitoring results for the model and data.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon CloudWatch dashboard that includes the metrics for processing steps in the nightly batch inference job. Compare the baseline resource metrics. Share the dashboard link.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Glue DataBrew to create a custom recipe job that uses the Numerical Statistics data quality check for the model file. Generate the results.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a SageMaker AI pipeline that includes a QualityCheck step to run monitoring jobs. Generate the monitoring results for the model and the data.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Los monitoring schedules \"clásicos\" de SageMaker Model Monitor están orientados principalmente a la captura continua de datos de un endpoint en tiempo real (data capture); aunque Model Monitor también soporta analizar salidas de batch transform, la forma recomendada y nativa de integrar comprobaciones de calidad de datos y de modelo en un flujo de inferencia batch programado (nightly) es a través de un paso dedicado dentro de un SageMaker Pipeline, no una monitorización de endpoint aislada.\n\nOpción B: Un dashboard de CloudWatch con métricas de procesamiento (uso de CPU/memoria, duración de los pasos) informa del estado operativo del job, pero no calcula estadísticas de calidad de datos ni métricas de calidad/desempeño del modelo (drift, exactitud, etc.) que es lo que se pide.\n\nOpción C: AWS Glue DataBrew con reglas de \"Numerical Statistics\" evalúa calidad de datos tabulares genéricos, no es una herramienta orientada a evaluar el desempeño de un modelo ML ni está integrada en el pipeline de inferencia de SageMaker; además, aplicar esta comprobación sobre \"el fichero del modelo\" no tiene sentido técnico.\n\nOpción D (Correcta): Amazon SageMaker Pipelines ofrece el paso QualityCheck (junto con ClarifyCheck), diseñado para ejecutar trabajos de model monitor (usando los contenedores prediseñados de Model Monitor) que calculan baselines y detectan violaciones de calidad de datos y de calidad de modelo dentro de un flujo de trabajo orquestado, incluyendo escenarios de inferencia batch como este job nocturno. Al incluir este paso en el pipeline diario, se generan automáticamente los resultados de monitorización de modelo y de datos que el hospital necesita en su informe diario.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/build-and-manage-steps-types.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/pipelines-quality-clarify-baseline-lifecycle.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-scheduling.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20173,
    "questionNumber": 173,
    "question": "A company needs to ingest data from data sources into Amazon SageMaker Data Wrangler. The data sources are Amazon S3, Amazon Redshift, and Snowflake. The ingested data must always be up to date with the latest changes in the source systems. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use direct connections to import data from the data sources into Data Wrangler.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use cataloged connections to import data from the data sources into Data Wrangler.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Glue to extract data from the data sources. Use AWS Glue also to import the data directly into Data Wrangler.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Lambda to extract data from the data sources. Use Lambda also to import the data directly into Data Wrangler.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): La documentación de importación de datos de SageMaker Data Wrangler distingue explícitamente entre \"direct connection\", que siempre proporciona acceso a los datos más recientes de la fuente en el momento de la consulta (S3, Athena/Redshift mediante consulta directa, Snowflake, etc.), y \"cataloged connection\". Puesto que el requisito es que los datos ingeridos estén siempre actualizados con los últimos cambios en los sistemas origen, la conexión directa es la opción correcta y documentada para S3, Redshift y Snowflake.\n\nOpción B: Una conexión catalogada (cataloged connection) se basa en una transferencia de datos previa (p. ej., a través de AWS Glue Data Catalog) que puede no reflejar los cambios más recientes de la fuente original, ya que los datos catalogados pueden quedar desactualizados hasta la siguiente sincronización/transferencia.\n\nOpción C: Aunque AWS Glue puede extraer datos de estas fuentes, no existe una integración nativa \"Glue importa directamente a Data Wrangler\"; Data Wrangler tiene sus propios conectores directos y catalogados, por lo que añadir Glue como intermediario introduce complejidad y no garantiza por sí mismo la actualización en tiempo real de los datos importados.\n\nOpción D: Del mismo modo, usar Lambda como capa de extracción e ingesta personalizada añade desarrollo y mantenimiento adicional y no es el mecanismo nativo soportado por Data Wrangler para conectarse a S3, Redshift o Snowflake.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-import.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20174,
    "questionNumber": 174,
    "question": "An ML engineer is using Amazon SageMaker Canvas to build a custom ML model from an imported dataset. The ML engineer wants the model to make continuous numeric predictions based on 10 years of data. Which metric should the ML engineer use to evaluate the model's performance?",
    "choices": [
      {
        "letter": "A",
        "text": "Accuracy",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "InferenceLatency",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Area Under the ROC Curve (AUC)",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Root mean square error (RMSE)",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Accuracy (exactitud) es una métrica propia de problemas de clasificación (proporción de predicciones correctas sobre el total), no tiene aplicación en un problema de predicción numérica continua (regresión).\n\nOpción B: InferenceLatency mide el tiempo de respuesta de un endpoint de inferencia; es una métrica operativa/de rendimiento del servicio, no una métrica de calidad estadística de las predicciones del modelo.\n\nOpción C: AUC (área bajo la curva ROC) evalúa la capacidad discriminativa de un modelo de clasificación binaria entre clases positivas y negativas; no es aplicable a un modelo de predicción numérica continua.\n\nOpción D (Correcta): La documentación de SageMaker Canvas indica explícitamente que, para modelos de \"numeric prediction\" (regresión), las métricas de referencia incluyen RMSE (root mean square error), entre otras como MAE y R2. RMSE mide la raíz cuadrada del promedio de los errores al cuadrado entre los valores predichos y los reales, penalizando más los errores grandes, y es la métrica estándar para evaluar modelos que predicen valores numéricos continuos, como en este escenario de predicción basada en 10 años de datos.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-metrics.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-scoring.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-model-quality-metrics.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20175,
    "questionNumber": 175,
    "question": "A company has built, trained, and tuned two new ML models: • Model A detects if a transaction is fraudulent based on the IP address, location, and user credentials. This model will be accessed every time a transaction occurs. • Model B forecasts sales totals for the next month based on historical sales data. This model will be accessed one time each month. The company must deploy both models to production by using Amazon SageMaker AI. Which hosting solution for the models should the company use to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Host both models in one container behind one real-time endpoint.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Host Model A with an asynchronous endpoint. Host Model B with a real-time endpoint.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Host Model A with a real-time endpoint. Use batch transform for Model B.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use batch transform for Model A. Host Model B with an asynchronous endpoint.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Combinar ambos modelos en un único contenedor detrás de un único endpoint en tiempo real obligaría a mantener siempre activa (y pagando) una infraestructura de baja latencia también para Model B, que solo se necesita una vez al mes; no aprovecha las características diferenciadas de cada carga de trabajo y añade complejidad innecesaria al acoplar dos modelos con patrones de acceso muy distintos en un mismo endpoint.\n\nOpción B: Model A requiere respuesta inmediata en cada transacción (caso de uso claramente de baja latencia), por lo que un endpoint asíncrono —pensado para tolerar minutos de procesamiento y payloads grandes— no es adecuado; sería Model B, de uso mensual, el candidato a un patrón sin endpoint persistente, no al revés.\n\nOpción C (Correcta): Model A necesita evaluarse en cada transacción con baja latencia, lo que corresponde exactamente al caso de uso de un endpoint en tiempo real (real-time endpoint), que mantiene instancias siempre disponibles para responder de inmediato. Model B solo se invoca una vez al mes con un conjunto de datos históricos, un patrón de inferencia por lotes/offline; SageMaker Batch Transform ejecuta el trabajo en un clúster que se aprovisiona solo para la duración del job y se decomisiona al finalizar, evitando pagar por una infraestructura de hosting inactiva durante casi todo el mes. Esta combinación optimiza tanto la latencia (Model A) como el coste (Model B).\n\nOpción D: Es la inversa de la combinación correcta: Model A necesita respuesta inmediata por transacción, por lo que usar batch transform (offline, no interactivo) no cumpliría el requisito de disponibilidad en cada transacción; Model B, de uso mensual, no necesita un endpoint asíncrono persistente cuando batch transform es más económico para ese patrón de acceso infrecuente.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/batch-transform.html\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/ml-operations-planning/deployment.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20176,
    "questionNumber": 176,
    "question": "A bank needs to use Amazon SageMaker AI to create an ML model to determine which customers qualify for a new product. The bank must use algorithms that SageMaker AI directly supports. The model must be explainable to the bank's regulators. Which modeling approach will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Train the model by using the Object2Vec algorithm.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Train the model by using the linear learner algorithm.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Train a neural network.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Train the model by using the k-means algorithm.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Object2Vec es un algoritmo de aprendizaje de representaciones (embeddings) que captura relaciones semánticas entre pares de objetos; produce representaciones vectoriales de alta dimensión que son difíciles de interpretar directamente para un regulador, por lo que no cumple bien el requisito de explicabilidad.\n\nOpción B (Correcta): El algoritmo Linear Learner es un algoritmo integrado (built-in) de SageMaker AI que resuelve problemas de clasificación (y regresión) ajustando un modelo lineal; al ser lineal, cada feature tiene un coeficiente/peso cuya magnitud y signo son directamente interpretables (indican cuánto y en qué dirección contribuye cada variable a la decisión), lo que facilita explicar a los reguladores por qué un cliente califica o no para el producto. Además cumple el requisito de \"algoritmo directamente soportado por SageMaker AI\" al tratarse de uno de sus algoritmos built-in documentados.\n\nOpción C: Una red neuronal, aunque pueda entrenarse en SageMaker, es intrínsecamente un modelo de tipo \"caja negra\" con múltiples capas y transformaciones no lineales, mucho más difícil de explicar de forma directa y transparente a un regulador que un modelo lineal.\n\nOpción D: K-means es un algoritmo de clustering no supervisado; no es apto para un problema de clasificación supervisada como \"determinar qué clientes cualifican para un producto\", ya que no genera una predicción de una etiqueta objetivo a partir de features.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/linear-learner.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/algos.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/ll_how-it-works.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20177,
    "questionNumber": 177,
    "question": "A company is preparing data to train a new ML model on Amazon SageMaker AI. The data has not been used before for ML training. The data includes duplicates and is missing some values. The company needs to increase the data quality and detect any statistical bias in the data. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use SageMaker Clarify to create data quality rules. Use SageMaker Model Monitor to detect bias.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use SageMaker Data Wrangler to create data quality rules. Use SageMaker Clarify to detect bias.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use SageMaker Debugger to create data quality rules. Use SageMaker Model Monitor to detect bias.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use SageMaker Model Monitor to create data quality rules. Use SageMaker Clarify to detect bias.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: SageMaker Clarify no está diseñado para crear \"reglas de calidad de datos\" de limpieza (duplicados, valores ausentes); esa es la función de Data Wrangler. Además, SageMaker Model Monitor está orientado a supervisar modelos y datos ya en producción a partir de un baseline, no a la fase inicial de preparación de un dataset que nunca se ha usado para entrenar.\n\nOpción B (Correcta): SageMaker Data Wrangler ofrece transformaciones específicas para mejorar la calidad de los datos durante la preparación, como \"Drop duplicates\", \"Handle missing values\" (con imputación por media/mediana/moda) y el informe \"Data Quality and Insights Report\", que permiten resolver directamente los duplicados y valores ausentes mencionados. Para la detección de sesgo estadístico, Data Wrangler se integra de forma nativa con SageMaker Clarify: el \"Bias Report\" de Data Wrangler ejecuta un análisis de Clarify sobre una columna objetivo y una columna \"facet\" para calcular métricas de sesgo antes del entrenamiento (pre-training bias). Esta combinación cubre exactamente ambos requisitos (calidad y sesgo) en la fase de preparación de datos.\n\nOpción C: SageMaker Debugger analiza el proceso de entrenamiento (tensores, gradientes, uso de recursos), no genera reglas de calidad de datos sobre un dataset crudo; y, de nuevo, Model Monitor no es la herramienta adecuada para un dataset que aún no se ha usado para entrenar.\n\nOpción D: SageMaker Model Monitor no crea reglas de calidad de datos durante la preparación previa al entrenamiento; su función es monitorizar datos de inferencia en producción frente a un baseline ya establecido, lo cual no corresponde a esta fase inicial de limpieza de datos.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-analyses.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-data-bias-reports-ui.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  }
];
