import { Question } from '../../types';

export const QUESTIONS_PART_2: Question[] = [
  {
    "id": 20060,
    "questionNumber": 60,
    "question": "An ML engineer receives datasets that contain missing values, duplicates, and extreme outliers. The ML engineer must consolidate these datasets into a single data frame and must prepare the data for ML. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon SageMaker Data Wrangler to import the datasets and to consolidate them into a single data frame. Use the cleansing and enrichment functionalities to prepare the data.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use Amazon SageMaker Ground Truth to import the datasets and to consolidate them into a single data frame. Use the human-in-the-loop capability to prepare the data.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Manually import and merge the datasets. Consolidate the datasets into a single data frame. Use Amazon Q Developer to generate code snippets that will prepare the data.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Manually import and merge the datasets. Consolidate the datasets into a single data frame. Use Amazon SageMaker data labeling to prepare the data.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Amazon SageMaker Data Wrangler permite importar múltiples datasets desde distintas fuentes, unirlos/concatenarlos (Join Datasets, Concatenate Datasets) para consolidarlos en un único data frame, y aplicar de forma visual transforms de limpieza y enriquecimiento como Handle Missing Values, Drop Duplicates y Handle Outliers, cubriendo exactamente los tres problemas descritos (valores faltantes, duplicados y outliers extremos) sin necesidad de escribir código.\n\nOpción B: Amazon SageMaker Ground Truth es un servicio de etiquetado de datos (data labeling) mediante humanos en el bucle (human-in-the-loop); no está diseñado para importar/consolidar datasets ni para limpiar valores faltantes, duplicados u outliers.\n\nOpción C: Importar y fusionar manualmente los datasets, y luego usar Amazon Q Developer para generar fragmentos de código, requiere escribir, revisar e integrar código generado, lo que implica más esfuerzo de desarrollo que usar las transformaciones visuales integradas de Data Wrangler.\n\nOpción D: El etiquetado de datos de SageMaker (data labeling, asociado a Ground Truth) sirve para anotar/etiquetar datos (por ejemplo, para tareas de clasificación o detección de objetos), no para limpiar valores faltantes, eliminar duplicados o tratar outliers en un data frame consolidado.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-data-insights.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20061,
    "questionNumber": 61,
    "question": "A company has historical data that shows whether customers needed long-term support from company staff. The company needs to develop an ML model to predict whether new customers will require long-term support. Which modeling approach should the company use to meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Anomaly detection",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Linear regression",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Logistic regression",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Semantic segmentation",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: la detección de anomalías se usa para identificar eventos raros o atípicos dentro de un conjunto de datos (por ejemplo, fraude), no para clasificar un resultado binario conocido y etiquetado como \"necesita soporte / no necesita soporte\".\n\nOpción B: la regresión lineal predice un valor numérico continuo (por ejemplo, un importe o una cantidad), no una categoría binaria; no es adecuada cuando la variable objetivo es \"sí/no\".\n\nOpción C (Correcta): el problema descrito es un problema de clasificación binaria supervisada (el cliente necesitará o no soporte a largo plazo), con datos históricos etiquetados. Amazon Redshift ML y SageMaker documentan la regresión logística (binary classification) precisamente para este tipo de problema, donde el modelo estima la probabilidad de pertenencia a una de dos clases a partir de atributos históricos, como en el caso de predicción de churn de clientes.\n\nOpción D: la segmentación semántica es una técnica de visión por computador que clasifica cada píxel de una imagen en una categoría; no tiene relación con datos tabulares de clientes.\n\nReferencias:\nhttps://docs.aws.amazon.com/redshift/latest/dg/tutorial_customer_churn.html\nhttps://docs.aws.amazon.com/redshift/latest/dg/machine_learning_overview.html\nhttps://docs.aws.amazon.com/machine-learning/latest/dg/types-of-ml-models.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20062,
    "questionNumber": 62,
    "question": "An ML engineer has developed a binary classification model outside of Amazon SageMaker. The ML engineer needs to make the model accessible to a SageMaker Canvas user for additional tuning. The model artifacts are stored in an Amazon S3 bucket. The ML engineer and the Canvas user are part of the same SageMaker domain. Which combination of requirements must be met so that the ML engineer can share the model with the Canvas user? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "The ML engineer and the Canvas user must be in separate SageMaker domains.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "The Canvas user must have permissions to access the S3 bucket where the model artifacts are stored.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "The model must be registered in the SageMaker Model Registry.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "The ML engineer must host the model on AWS Marketplace.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "The ML engineer must deploy the model to a SageMaker endpoint.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: es incorrecta porque el enunciado indica explícitamente que ambos usuarios ya están en el mismo dominio de SageMaker; separarlos en dominios distintos no facilita el acceso, lo complica.\n\nOpción B (Correcta): dado que el modelo fue entrenado fuera de SageMaker y sus artefactos residen en S3, el usuario de Canvas necesita permisos IAM/S3 para poder leer esos artefactos al importarlos o registrarlos.\n\nOpción C (Correcta): SageMaker Canvas se integra de forma nativa con el SageMaker Model Registry como mecanismo para catalogar, versionar y hacer visibles modelos entre usuarios del mismo dominio; registrar el modelo es el paso necesario para que aparezca como modelo importado/disponible en Canvas para su ajuste adicional.\n\nOpción D: AWS Marketplace se usa para comercializar productos de ML entre distintos clientes/cuentas, no es un mecanismo de colaboración interna dentro del mismo dominio.\n\nOpción E: desplegar el modelo en un endpoint de SageMaker es necesario para obtener inferencias en producción, pero no es un requisito para que un usuario de Canvas pueda \"ajustar\" (tune) el modelo; el mecanismo de compartición es el Model Registry, no el endpoint.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-register-model.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-mlops.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-ram-studio-share.html",
    "category": "Deployment & Orchestration",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 20063,
    "questionNumber": 63,
    "question": "A company is building a deep learning model on Amazon SageMaker. The company uses a large amount of data as the training dataset. The company needs to optimize the model's hyperparameters to minimize the loss function on the validation dataset. Which hyperparameter tuning strategy will accomplish this goal with the LEAST computation time?",
    "choices": [
      {
        "letter": "A",
        "text": "Hyperband",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Grid search",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Bayesian optimization",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Random search",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): la documentación oficial de SageMaker AI indica explícitamente que \"For large jobs, using the Hyperband tuning strategy can reduce computation time\", gracias a su mecanismo de early stopping que detiene los training jobs de bajo rendimiento y reasigna recursos hacia las configuraciones de hiperparámetros más prometedoras, ejecutando jobs en paralelo. Como el escenario menciona explícitamente un modelo de deep learning con un gran volumen de datos (large job), Hyperband es la estrategia recomendada para minimizar el tiempo de cómputo.\n\nOpción B: grid search explora exhaustivamente todas las combinaciones de hiperparámetros, lo que la convierte en la estrategia más costosa computacionalmente, no en la más rápida.\n\nOpción C: Bayesian optimization usa los resultados de ejecuciones previas para informar las siguientes, pero por su naturaleza secuencial \"cannot massively scale\" según la documentación, por lo que es más lenta que Hyperband para jobs grandes.\n\nOpción D: random search permite paralelizar mucho, pero no tiene el mecanismo de parada temprana de Hyperband, por lo que consume más cómputo total para converger a un resultado equivalente en jobs grandes.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-considerations.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-how-it-works.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20064,
    "questionNumber": 64,
    "question": "A company is planning to use Amazon Redshift ML in its primary AWS account. The source data is in an Amazon S3 bucket in a secondary account. An ML engineer needs to set up an ML pipeline in the primary account to access the S3 bucket in the secondary account. The solution must not require public IPv4 addresses. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Provision a Redshift cluster and Amazon SageMaker Studio in a VPC with no public access enabled in the primary account. Create a VPC peering connection between the accounts. Update the VPC route tables to remove the route to 0.0.0.0/0.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Provision a Redshift cluster and Amazon SageMaker Studio in a VPC with no public access enabled in the primary account. Create an AWS Direct Connect connection and a transit gateway. Associate the VPCs from both accounts with the transit gateway. Update the VPC route tables to remove the route to 0.0.0.0/0.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Provision a Redshift cluster and Amazon SageMaker Studio in a VPC in the primary account. Create an AWS Site-to-Site VPN connection with two encrypted IPsec tunnels between the accounts. Set up interface VPC endpoints for Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Provision a Redshift cluster and Amazon SageMaker Studio in a VPC in the primary account. Create an S3 gateway endpoint. Update the S3 bucket policy to allow IAM principals from the primary account. Set up interface VPC endpoints for SageMaker and Amazon Redshift.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: una conexión de VPC peering conecta dos VPC, pero por sí sola no resuelve el acceso a S3 en la cuenta secundaria sin salir a Internet; además, Direct Connect/peering no son necesarios cuando el propio S3 admite un endpoint de puerta de enlace (gateway endpoint), lo que hace esta solución más compleja de lo necesario y no resuelve directamente el acceso entre cuentas a S3.\n\nOpción B: Direct Connect y un transit gateway son soluciones de conectividad híbrida/compleja pensadas para conectar redes on-premises o múltiples VPC a gran escala; es una sobre-ingeniería costosa y con más operación para un simple acceso a un bucket S3 entre dos cuentas.\n\nOpción C: una VPN de sitio a sitio conecta redes privadas entre sí, pero no está diseñada para el acceso entre cuentas de AWS a un bucket de S3; sigue sin resolver el requisito de acceso privado a S3 de la forma más simple y nativa.\n\nOpción D (Correcta): el S3 gateway endpoint es un tipo de VPC endpoint que permite el acceso privado a Amazon S3 desde una VPC \"without requiring an internet gateway or NAT device\" (sin IP pública), documentado como el mecanismo estándar para acceso privado a S3. Al combinarlo con una política de bucket S3 que autorice a los principals IAM de la cuenta primaria (acceso entre cuentas) y con VPC interface endpoints para SageMaker y Redshift (para mantener también esas comunicaciones privadas), se cumple el requisito de no usar direcciones IPv4 públicas con la arquitectura más simple y nativa.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html\nhttps://docs.aws.amazon.com/redshift/latest/mgmt/managing-cluster-cross-vpc.html\nhttps://docs.aws.amazon.com/glue/latest/dg/vpc-endpoints-s3.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20065,
    "questionNumber": 65,
    "question": "A company is using an AWS Lambda function to monitor the metrics from an ML model. An ML engineer needs to implement a solution to send an email message when the metrics breach a threshold. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Log the metrics from the Lambda function to AWS CloudTrail. Configure a CloudTrail trail to send the email message.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Log the metrics from the Lambda function to Amazon CloudFront. Configure an Amazon CloudWatch alarm to send the email message.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Log the metrics from the Lambda function to Amazon CloudWatch. Configure a CloudWatch alarm to send the email message.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Log the metrics from the Lambda function to Amazon CloudWatch. Configure an Amazon CloudFront rule to send the email message.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: AWS CloudTrail registra llamadas a la API (auditoría de acciones), no métricas numéricas personalizadas de un modelo; no está diseñado para métricas ni para generar alarmas basadas en umbrales de valores.\n\nOpción B: Amazon CloudFront es un servicio de CDN (distribución de contenido web), no un destino para métricas de aplicación ni de modelos ML; no tiene sentido en este escenario.\n\nOpción C (Correcta): la arquitectura estándar de AWS es que la función Lambda publique sus métricas personalizadas en Amazon CloudWatch y que se configure una alarma de CloudWatch (\"CloudWatch alarm\") que, al superarse el umbral, publique una notificación en un topic de Amazon SNS con suscripción de correo electrónico verificada, cumpliendo el requisito de enviar un email cuando se rompe el umbral.\n\nOpción D: CloudFront no dispone de \"reglas\" para enviar correos ni procesa métricas de esta manera; confunde CloudFront con CloudWatch.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/US_AlarmAtThresholdEBS.html\nhttps://docs.aws.amazon.com/location/latest/developerguide/cloudwatch.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20066,
    "questionNumber": 66,
    "question": "A company has used Amazon SageMaker to deploy a predictive ML model in production. The company is using SageMaker Model Monitor on the model. After a model update, an ML engineer notices data quality issues in the Model Monitor checks. What should the ML engineer do to mitigate the data quality issues that Model Monitor has identified?",
    "choices": [
      {
        "letter": "A",
        "text": "Adjust the model's parameters and hyperparameters.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Initiate a manual Model Monitor job that uses the most recent production data.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a new baseline from the latest dataset. Update Model Monitor to use the new baseline for evaluations.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Include additional data in the existing training set for the model. Retrain and redeploy the model.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: ajustar hiperparámetros no soluciona una alerta de \"data quality\" de Model Monitor, que compara la distribución de los datos de entrada en producción contra un baseline estadístico; el problema no está en el ajuste del modelo sino en el desajuste entre el baseline vigente y los nuevos datos esperados tras la actualización del modelo.\n\nOpción B: ejecutar manualmente un job de Model Monitor con los datos más recientes seguiría comparando esos datos contra el baseline antiguo (desactualizado), por lo que volvería a marcar las mismas violaciones; no corrige la causa raíz.\n\nOpción C (Correcta): la documentación de SageMaker Model Monitor describe que se debe ejecutar un \"baseline job\" que analiza un dataset de entrada para calcular restricciones (\"constraints\") y estadísticas (\"statistics\") de calidad de datos, que después se usan en los monitoring schedules. Cuando el modelo se actualiza (por ejemplo, cambia el esquema o la distribución esperada de entrada), el procedimiento correcto es generar un nuevo baseline a partir del dataset más reciente y actualizar Model Monitor para evaluarlo contra ese nuevo baseline.\n\nOpción D: reentrenar el modelo con datos adicionales podría ser útil en otros escenarios (por ejemplo, drift de rendimiento del modelo), pero no es la acción indicada para resolver alertas de \"data quality\" que provienen de una comparación estadística contra un baseline desactualizado; además implica mucho más esfuerzo operativo del necesario.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-create-baseline.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-data-quality.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-schedule-data-monitor.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20067,
    "questionNumber": 67,
    "question": "A company has an ML model that generates text descriptions based on images that customers upload to the company's website. The images can be up to 50 MB in total size. An ML engineer decides to store the images in an Amazon S3 bucket. The ML engineer must implement a processing solution that can scale to accommodate changes in demand. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon SageMaker batch transform job to process all the images in the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon SageMaker Asynchronous Inference endpoint and a scaling policy. Run a script to make an inference request for each image.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an Amazon Elastic Kubernetes Service (Amazon EKS) cluster that uses Karpenter for auto scaling. Host the model on the EKS cluster. Run a script to make an inference request for each image.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Batch job that uses an Amazon Elastic Container Service (Amazon ECS) cluster. Specify a list of images to process for each AWS Batch job.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: el batch transform está pensado para procesar en bloque todo un dataset ya conocido de una vez, no para peticiones individuales continuas por cada imagen que un cliente sube de forma asíncrona; no es la arquitectura adecuada para demanda variable de imágenes individuales.\n\nOpción B (Correcta): SageMaker Asynchronous Inference está documentado como una opción de despliegue que encola las peticiones de inferencia entrantes y las procesa de forma asíncrona, soportando payloads de hasta 1 GB (cubriendo sin problema los 50 MB del escenario) y tiempos de procesamiento largos. Al combinarse con una política de auto scaling (incluida la posibilidad de escalar a 0 instancias cuando no hay tráfico), SageMaker gestiona automáticamente la infraestructura subyacente, cumpliendo el requisito de mínima sobrecarga operativa frente a soluciones basadas en clústeres gestionados por el propio usuario.\n\nOpción C: EKS con Karpenter es una solución potente pero de alta sobrecarga operativa, ya que exige gestionar el clúster de Kubernetes, los nodos, el despliegue del modelo, políticas de escalado, etc.; contradice el requisito de \"LEAST operational overhead\".\n\nOpción D: AWS Batch sobre ECS también implica gestionar definiciones de trabajos, colas y un clúster de contenedores; es más complejo operativamente que un endpoint totalmente gestionado de SageMaker.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/async-inference.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/hosting-faqs.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/async-inference-troubleshooting.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20068,
    "questionNumber": 68,
    "question": "An ML engineer needs to use AWS services to identify and extract meaningful unique keywords from documents. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Use the Natural Language Toolkit (NLTK) library on Amazon EC2 instances for text pre-processing. Use the Latent Dirichlet Allocation (LDA) algorithm to identify and extract relevant keywords.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon SageMaker and the BlazingText algorithm. Apply custom pre-processing steps for stemming and removal of stop words. Calculate term frequency-inverse document frequency (TF-IDF) scores to identify and extract relevant keywords.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Store the documents in an Amazon S3 bucket. Create AWS Lambda functions to process the documents and to run Python scripts for stemming and removal of stop words. Use bigram and trigram techniques to identify and extract relevant keywords.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon Comprehend custom entity recognition and key phrase extraction to identify and extract relevant keywords.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: requiere gestionar instancias EC2, instalar y mantener NLTK y programar manualmente el pipeline de LDA; es una solución con mucha carga operativa de infraestructura propia.\n\nOpción B: BlazingText de SageMaker está orientado a embeddings de palabras y clasificación de texto, no a extracción de frases clave; además exige pasos manuales de preprocesado y cálculo de TF-IDF, aumentando el esfuerzo de desarrollo y mantenimiento.\n\nOpción C: implica escribir y mantener código Python personalizado en funciones Lambda para stemming, eliminación de stop words y generación de bigramas/trigramas; es una solución artesanal con más responsabilidad operativa que usar un servicio administrado ya entrenado para esta tarea.\n\nOpción D (Correcta): Amazon Comprehend es un servicio de NLP totalmente gestionado que ofrece de forma nativa \"key phrase extraction\" para identificar frases/palabras clave relevantes en texto sin necesidad de entrenar ni gestionar infraestructura, y \"custom entity recognition\" para identificar entidades específicas del dominio; es la solución con menor sobrecarga operativa al ser un servicio serverless y totalmente administrado.\n\nReferencias:\nhttps://docs.aws.amazon.com/comprehend/latest/dg/what-is.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20069,
    "questionNumber": 69,
    "question": "A company needs to give its ML engineers appropriate access to training data. The ML engineers must access training data from only their own business group. The ML engineers must not be allowed to access training data from other business groups. The company uses a single AWS account and stores all the training data in Amazon S3 buckets. All ML model training occurs in Amazon SageMaker. Which solution will provide the ML engineers with the appropriate access?",
    "choices": [
      {
        "letter": "A",
        "text": "Enable S3 bucket versioning.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure S3 Object Lock settings for each user.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Add cross-origin resource sharing (CORS) policies to the S3 buckets.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create IAM policies. Attach the policies to IAM users or IAM roles.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: el versionado de S3 sirve para conservar y recuperar versiones anteriores de un objeto; no tiene ninguna relación con el control de quién puede acceder a qué datos.\n\nOpción B: S3 Object Lock es una función de retención tipo WORM (write-once-read-many) para cumplimiento normativo/inmutabilidad de objetos, no un mecanismo de control de acceso por usuario o grupo.\n\nOpción C: las políticas CORS controlan qué orígenes web (dominios) pueden hacer peticiones cross-origin a un bucket desde un navegador; no restringen el acceso de usuarios o roles de IAM a los datos.\n\nOpción D (Correcta): la documentación de IAM y S3 describe exactamente este patrón (\"Allowing each IAM user access to a folder in a bucket\", \"Allowing a group to have a shared folder in Amazon S3\"): se crean políticas de IAM basadas en prefijos de S3 (por ejemplo, usando variables de política como el nombre de usuario o grupo) y se asocian a los usuarios o roles de IAM de cada grupo de negocio, de forma que cada ML engineer solo pueda acceder al prefijo/carpeta de su propio grupo dentro del mismo bucket o cuenta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/example-policies-s3.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/business-use-cases.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20070,
    "questionNumber": 70,
    "question": "A company needs to host a custom ML model to perform forecast analysis. The forecast analysis will occur with predictable and sustained load during the same 2-hour period every day. Multiple invocations during the analysis period will require quick responses. The company needs AWS to manage the underlying infrastructure and any auto scaling activities. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Schedule an Amazon SageMaker batch transform job by using AWS Lambda.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure an Auto Scaling group of Amazon EC2 instances to use scheduled scaling.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon SageMaker Serverless Inference with provisioned concurrency.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Run the model on an Amazon Elastic Kubernetes Service (Amazon EKS) cluster on Amazon EC2 with pod auto scaling.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: un batch transform job procesa un conjunto de datos por lotes de forma asíncrona; no está pensado para servir múltiples invocaciones individuales que requieren respuesta rápida durante una ventana de tráfico.\n\nOpción B: un Auto Scaling group de instancias EC2 requiere que el cliente elija y gestione tipos de instancia, AMIs, parcheo del sistema operativo y políticas de escalado; no cumple el requisito de que \"AWS manage the underlying infrastructure and any auto scaling activities\".\n\nOpción C (Correcta): la documentación de SageMaker indica que \"Serverless Inference with provisioned concurrency is a cost-effective option when you have predictable bursts in your traffic\", ya que \"Provisioned Concurrency allows you to deploy models on serverless endpoints with predictable performance... by keeping your endpoints warm\", garantizando respuestas en milisegundos sin cold start. Además, SageMaker gestiona toda la infraestructura subyacente y el auto scaling se integra con Application Auto Scaling de forma totalmente administrada, ajustándose exactamente al patrón descrito de carga sostenida y predecible durante una franja horaria diaria con necesidad de respuesta rápida.\n\nOpción D: un clúster EKS sobre EC2 obliga a gestionar nodos, parcheo, actualizaciones del clúster y políticas de escalado de pods; es infraestructura gestionada por el cliente, no por AWS, contradiciendo el requisito explícito.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints-monitoring.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20071,
    "questionNumber": 71,
    "question": "A company's ML engineer has deployed an ML model for sentiment analysis to an Amazon SageMaker endpoint. The ML engineer needs to explain to company stakeholders how the model makes predictions. Which solution will provide an explanation for the model's predictions?",
    "choices": [
      {
        "letter": "A",
        "text": "Use SageMaker Model Monitor on the deployed model.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use SageMaker Clarify on the deployed model.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Show the distribution of inferences from A/В testing in Amazon CloudWatch.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Add a shadow endpoint. Analyze prediction differences on samples.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: SageMaker Model Monitor detecta drift en la calidad de los datos, en la calidad del modelo, en el sesgo y en la atribución de características a lo largo del tiempo, pero su propósito es la monitorización continua, no explicar por qué el modelo hace una predicción concreta a stakeholders.\n\nOpción B (Correcta): la documentación de SageMaker Clarify describe explícitamente la \"online explainability\" y el cálculo de \"feature attributions\" mediante valores de Shapley (SHAP) para explicar en tiempo real las predicciones de un modelo desplegado en un endpoint, indicando la contribución de cada característica de entrada a la predicción; es la herramienta \"purpose-built\" de AWS para explicabilidad de modelos, ideal para comunicar a los stakeholders cómo el modelo llega a sus resultados.\n\nOpción C: comparar la distribución de inferencias entre variantes de A/B testing en CloudWatch permite comparar rendimiento entre modelos, pero no explica el mecanismo interno de una predicción individual.\n\nOpción D: un shadow endpoint permite comparar las respuestas de un modelo candidato contra el modelo en producción sobre tráfico real, útil para validar antes de un despliegue, pero no proporciona una explicación de las predicciones basada en la importancia de las características.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-explainability.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-online-explainability.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-shapley-values.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20072,
    "questionNumber": 72,
    "question": "An ML engineer is using Amazon SageMaker to train a deep learning model that requires distributed training. After some training attempts, the ML engineer observes that the instances are not performing as expected. The ML engineer identifies communication overhead between the training instances. What should the ML engineer do to MINIMIZE the communication overhead between the instances?",
    "choices": [
      {
        "letter": "A",
        "text": "Place the instances in the same VPC subnet. Store the data in a different AWS Region from where the instances are deployed.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Place the instances in the same VPC subnet but in different Availability Zones. Store the data in a different AWS Region from where the instances are deployed.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Place the instances in the same VPC subnet. Store the data in the same AWS Region and Availability Zone where the instances are deployed.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Place the instances in the same VPC subnet. Store the data in the same AWS Region but in a different Availability Zone from where the instances are deployed.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: almacenar los datos en una Región de AWS distinta a la de las instancias introduce latencia de red entre regiones, que es mucho mayor que la latencia dentro de una misma región/AZ, aumentando el overhead de comunicación en lugar de reducirlo.\n\nOpción B: además de mantener los datos en otra Región (mismo problema que A), colocar las instancias en distintas Availability Zones (aun dentro del mismo subnet lógico de VPC) añade latencia inter-AZ en las comunicaciones de entrenamiento distribuido (por ejemplo, en operaciones AllReduce).\n\nOpción C (Correcta): la documentación de SageMaker sobre entrenamiento distribuido recomienda \"configure instances, VPC subnet, and data storage in the same AWS Region and Availability Zone to reduce communication overhead\"; colocar las instancias en el mismo subnet de VPC y en la misma AZ minimiza la latencia de red entre nodos (que es crítica para operaciones de sincronización de gradientes como AllReduce), y mantener los datos en esa misma Región/AZ reduce igualmente la latencia de acceso a los datos.\n\nOpción D: aunque los datos están en la misma Región, estar en una AZ diferente a las instancias introduce latencia adicional de red entre AZ, en lugar de minimizarla.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/distributed-training-get-started.html\nhttps://docs.aws.amazon.com/sap/latest/general/arch-guide-architecture-guidelines-and-decisions.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20073,
    "questionNumber": 73,
    "question": "A company is running ML models on premises by using custom Python scripts and proprietary datasets. The company is using PyTorch. The model building requires unique domain knowledge. The company needs to move the models to AWS. Which solution will meet these requirements with the LEAST effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Use SageMaker built-in algorithms to train the proprietary datasets.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use SageMaker script mode and premade images for ML frameworks.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Build a container on AWS that includes custom packages and a choice of ML frameworks.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Purchase similar production models through AWS Marketplace.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: los algoritmos integrados (built-in) de SageMaker son implementaciones predefinidas (XGBoost, k-means, etc.) que no admiten scripts Python personalizados con lógica de dominio propia; obligaría a reescribir por completo la lógica existente, lo contrario de \"LEAST effort\".\n\nOpción B (Correcta): la documentación de SageMaker describe cómo se pueden usar imágenes de contenedor predefinidas (\"prebuilt Docker images\") para frameworks como PyTorch junto con \"script mode\", que permite ejecutar directamente los scripts de entrenamiento Python existentes (con su lógica de dominio) sin tener que construir contenedores personalizados desde cero; es la ruta de migración de menor esfuerzo para código PyTorch on-premises ya existente.\n\nOpción C: construir un contenedor personalizado en AWS (bring your own container) es más flexible, pero exige crear y mantener el Dockerfile, gestionar dependencias e imágenes en ECR, lo que implica más esfuerzo que reutilizar una imagen ya administrada por AWS con script mode.\n\nOpción D: comprar modelos similares en AWS Marketplace no aprovecha el conocimiento de dominio propio ni los datasets propietarios de la empresa, y no traslada el modelo existente; no cumple el objetivo de migrar el modelo actual.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/docker-containers.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/pre-built-containers-frameworks-deep-learning.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20074,
    "questionNumber": 74,
    "question": "A company is using Amazon SageMaker and millions of files to train an ML model. Each file is several megabytes in size. The files are stored in an Amazon S3 bucket. The company needs to improve training performance. Which solution will meet these requirements in the LEAST amount of time?",
    "choices": [
      {
        "letter": "A",
        "text": "Transfer the data to a new S3 bucket that provides S3 Express One Zone storage. Adjust the training job to use the new S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon FSx for Lustre file system. Link the file system to the existing S3 bucket. Adjust the training job to read from the file system.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an Amazon Elastic File System (Amazon EFS) file system. Transfer the existing data to the file system. Adjust the training job to read from the file system.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Amazon ElastiCache (Redis OSS) cluster. Link the Redis OSS cluster to the existing S3 bucket. Stream the data from the Redis OSS cluster directly to the training job.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: migrar millones de archivos individuales a un nuevo bucket de S3 Express One Zone requeriría copiar todos esos objetos uno a uno, lo que consumiría un tiempo considerable antes incluso de empezar a entrenar, contradiciendo el requisito de \"LEAST amount of time\"; además, S3 Express One Zone no es la recomendación de la documentación de SageMaker para este patrón de datos.\n\nOpción B (Correcta): la guía oficial de SageMaker sobre elección de almacenamiento de entrenamiento indica textualmente: \"If your dataset is too large for file mode, has many small files that you can't serialize easily, or uses a random read access pattern, FSx for Lustre is a good option to consider\", precisamente el escenario de millones de archivos de varios MB. FSx for Lustre se vincula (linked) directamente al bucket S3 existente sin necesidad de migrar los datos, y ofrece cientos de GB/s de throughput y millones de IOPS, ideal para muchos archivos pequeños, cumpliendo el objetivo de mejorar el rendimiento con el mínimo esfuerzo/tiempo de preparación.\n\nOpción C: EFS también requeriría transferir todos los datos existentes al nuevo sistema de archivos (proceso lento con millones de archivos) y, según la documentación, su rendimiento debe optimizarse caso por caso; no es la primera recomendación de AWS para este patrón, y el proceso de migración de datos consume más tiempo que enlazar FSx for Lustre directamente al bucket existente.\n\nOpción D: ElastiCache (Redis) es una caché en memoria pensada para datos pequeños y de acceso muy frecuente (por ejemplo, sesiones), no un sistema de archivos de alto rendimiento diseñado para servir datasets de entrenamiento de gran volumen; no es una integración soportada ni documentada por SageMaker para el input de entrenamiento.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data-best-practices.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data-fsx.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20075,
    "questionNumber": 75,
    "question": "A company wants to develop an ML model by using tabular data from its customers. The data contains meaningful ordered features with sensitive information that should not be discarded. An ML engineer must ensure that the sensitive data is masked before another team starts to build the model. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Made to categorize the sensitive data.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Prepare the data by using AWS Glue DataBrew.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Run an AWS Batch job to change the sensitive data to random values.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Run an Amazon EMR job to change the sensitive data to random values.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: \"Amazon Made\" no existe como servicio de AWS (se refiere probablemente, erróneamente, a Amazon Macie); en cualquier caso, Amazon Macie solo detecta y clasifica datos sensibles (PII), pero no transforma ni enmascara los datos, por lo que no cumple el requisito de \"mask\" los datos.\n\nOpción B (Correcta): la documentación de AWS Glue DataBrew describe mecanismos de \"data masking\" para PII, incluyendo sustitución, shuffling, cifrado, hashing y acciones de receta específicas (por ejemplo, MASK_CUSTOM, MASK_DELIMITER) que permiten enmascarar columnas sensibles conservando el resto de las características tabulares ordenadas intactas; es un servicio de preparación de datos visual y de bajo código pensado exactamente para este tipo de transformación previa a la construcción del modelo por otro equipo.\n\nOpción C: usar AWS Batch con un script personalizado para \"cambiar los datos a valores aleatorios\" reemplazaría los valores por completo (perdiendo su relación/orden significativo), y no aplica técnicas de enmascaramiento reversible o consistente como las de DataBrew; además implica desarrollar y mantener código propio en lugar de usar una función nativa del servicio.\n\nOpción D: de forma similar a la opción C, un job de Amazon EMR con lógica personalizada para aleatorizar valores es una solución de mayor esfuerzo de desarrollo/mantenimiento que usar las capacidades de enmascaramiento de PII ya integradas en DataBrew.\n\nReferencias:\nhttps://docs.aws.amazon.com/databrew/latest/dg/personal-information-protection.html\nhttps://docs.aws.amazon.com/databrew/latest/dg/recipe-actions.pii.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20076,
    "questionNumber": 76,
    "question": "An ML engineer needs to deploy ML models to get inferences from large datasets in an asynchronous manner. The ML engineer also needs to implement scheduled monitoring of the data quality of the models. The ML engineer must receive alerts when changes in data quality occur. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy the models by using scheduled AWS Glue jobs. Use Amazon CloudWatch alarms to monitor the data quality and to send alerts.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy the models by using scheduled AWS Batch jobs. Use AWS CloudTrail to monitor the data quality and to send alerts.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy the models by using Amazon Elastic Container Service (Amazon ECS) on AWS Fargate. Use Amazon EventBridge to monitor the data quality and to send alerts.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy the models by using Amazon SageMaker batch transform. Use SageMaker Model Monitor to monitor the data quality and to send alerts.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: AWS Glue está diseñado para trabajos ETL, no para desplegar/servir modelos de ML como una solución de inferencia; y las alarmas de CloudWatch por sí solas no calculan ni comparan estadísticas de calidad de datos contra un baseline como sí hace Model Monitor.\n\nOpción B: AWS Batch tampoco es un servicio de despliegue de modelos ML de inferencia por lotes con capacidades nativas de calidad de datos; y AWS CloudTrail registra llamadas a la API de AWS, no métricas de calidad de datos de un modelo.\n\nOpción C: ECS/Fargate podría alojar un contenedor de inferencia, pero exige gestionar la infraestructura del servicio y EventBridge no realiza análisis estadístico de calidad de datos por sí mismo; no es una solución nativa \"purpose-built\" para este caso.\n\nOpción D (Correcta): SageMaker batch transform es la funcionalidad de SageMaker diseñada específicamente para obtener inferencias de grandes datasets de forma asíncrona/por lotes. La documentación oficial de SageMaker Model Monitor incluye explícitamente una sección \"Data quality monitoring for batch transform jobs\", que permite programar (\"schedule\") jobs de monitorización de calidad de datos sobre las entradas de un batch transform, generando alertas cuando la calidad de los datos se desvía del baseline, cumpliendo ambos requisitos (inferencia asíncrona a gran escala + monitorización programada con alertas de calidad de datos).\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-schedule-data-monitor.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-scheduling.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20077,
    "questionNumber": 77,
    "question": "An ML engineer normalized training data by using min-max normalization in AWS Glue DataBrew. The ML engineer must normalize the production inference data in the same way as the training data before passing the production inference data to the model for predictions. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Apply statistics from a well-known dataset to normalize the production samples.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Keep the min-max normalization statistics from the training set. Use these values to normalize the production samples.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Calculate a new set of min-max normalization statistics from a batch of production samples. Use these values to normalize all the production samples.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Calculate a new set of min-max normalization statistics from each production sample. Use these values to normalize all the production samples.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: aplicar estadísticas de un dataset externo \"bien conocido\" no garantiza correspondencia con la escala real de las características usadas para entrenar el modelo; introduciría una transformación inconsistente respecto a la que vio el modelo durante el entrenamiento.\n\nOpción B (Correcta): la normalización min-max se define a partir de los valores mínimo y máximo observados en el conjunto de entrenamiento; para que el modelo interprete correctamente los datos de producción, estos deben transformarse exactamente con los mismos parámetros (min y max) aprendidos/fijados durante el entrenamiento. Es un principio fundamental de ML (consistencia train/serving) evitar el \"data leakage\" o el desajuste de distribución (\"skew\") entre el preprocesado de entrenamiento y el de inferencia; reutilizar los estadísticos del training set es la práctica estándar y la única que garantiza que la escala de las características en producción sea coherente con la que aprendió el modelo.\n\nOpción C: calcular nuevas estadísticas min-max a partir de un lote de muestras de producción generaría una escala distinta a la usada durante el entrenamiento (los valores min/max de producción pueden diferir de los de entrenamiento), provocando transformaciones inconsistentes y predicciones erróneas.\n\nOpción D: calcular estadísticas min-max a partir de una única muestra en producción no tiene sentido matemático (un solo valor no define un rango min-max representativo) y generaría normalizaciones completamente inconsistentes entre muestras.\n\nReferencias:\nhttps://docs.aws.amazon.com/databrew/latest/dg/recipe-actions.pii.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20078,
    "questionNumber": 78,
    "question": "A company is planning to use Amazon SageMaker to make classification ratings that are based on images. The company has 6 ТВ of training data that is stored on an Amazon FSx for NetApp ONTAP system virtual machine (SVM). The SVM is in the same VPC as SageMaker. An ML engineer must make the training data accessible for ML models that are in the SageMaker environment. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Mount the FSx for ONTAP file system as a volume to the SageMaker Instance.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an Amazon S3 bucket. Use Mountpoint for Amazon S3 to link the S3 bucket to the FSx for ONTAP file system.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a catalog connection from SageMaker Data Wrangler to the FSx for ONTAP file system.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a direct connection from SageMaker Data Wrangler to the FSx for ONTAP file system.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): la documentación de Amazon FSx for NetApp ONTAP indica que los sistemas de archivos se pueden montar directamente sobre instancias de cómputo EC2 dentro de la misma VPC mediante los protocolos NFS o SMB (\"Accessing data from within the same VPC\" / \"Mounting volumes on Linux clients\"), apareciendo como un directorio local. Como las instancias de notebook y de entrenamiento de SageMaker se ejecutan sobre infraestructura EC2 dentro de una VPC, y la SVM ya está en la misma VPC que SageMaker, el mecanismo directo y soportado es montar el sistema de archivos FSx for ONTAP como un volumen en la instancia de SageMaker, sin pasos intermedios adicionales.\n\nOpción B: \"Mountpoint for Amazon S3\" es una herramienta para montar buckets de S3 como sistema de archivos local, no un mecanismo para vincular S3 con FSx for ONTAP; mezcla conceptos de dos servicios distintos y no está documentada como una integración válida.\n\nOpción C: no existe una función de \"catalog connection\" nativa de SageMaker Data Wrangler hacia sistemas de archivos FSx for ONTAP en la documentación oficial; Data Wrangler se conecta a fuentes como S3, Athena, Redshift o bases de datos JDBC, no directamente a sistemas de archivos de red mediante un conector de catálogo.\n\nOpción D: de la misma forma, no hay evidencia en la documentación de AWS de una \"direct connection\" nativa entre SageMaker Data Wrangler y FSx for ONTAP; el acceso documentado y soportado a los datos de FSx for ONTAP desde cómputo dentro de la misma VPC es el montaje NFS/SMB directo sobre la instancia.\n\nReferencias:\nhttps://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data-best-practices.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20079,
    "questionNumber": 79,
    "question": "A company regularly receives new training data from the vendor of an ML model. The vendor delivers cleaned and prepared data to the company's Amazon S3 bucket every 3-4 days. The company has an Amazon SageMaker pipeline to retrain the model. An ML engineer needs to implement a solution to run the pipeline when new data is uploaded to the S3 bucket. Which solution will meet these requirements with the LEAST operational effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an S3 Lifecycle rule to transfer the data to the SageMaker training instance and to initiate training.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Lambda function that scans the S3 bucket. Program the Lambda function to initiate the pipeline when new data is uploaded.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon EventBridge rule that has an event pattern that matches the S3 upload. Configure the pipeline as the target of the rule.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use Amazon Managed Workflows for Apache Airflow (Amazon MWAA) to orchestrate the pipeline when new data is uploaded.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: las reglas de ciclo de vida (Lifecycle rules) de S3 gestionan transiciones de clase de almacenamiento o expiración de objetos; no están diseñadas para transferir datos a una instancia de entrenamiento ni para iniciar pipelines, por lo que no es una integración real ni soportada.\n\nOpción B: una función Lambda que \"escanea\" periódicamente el bucket S3 buscando cambios es una solución de polling que añade complejidad de desarrollo (lógica de detección de cambios) y latencia, en lugar de reaccionar a eventos en tiempo real; requiere más código y mantenimiento que una integración nativa basada en eventos.\n\nOpción C (Correcta): la documentación de SageMaker sobre automatización con EventBridge describe cómo se pueden crear reglas de Amazon EventBridge con patrones de eventos que coincidan con eventos de \"S3 upload\" (creación de objetos) y configurar un SageMaker Pipeline como destino (\"target\") de la regla, iniciando automáticamente su ejecución (\"StartPipelineExecution\") cuando llegan nuevos datos; es la solución nativa, serverless y de mínimo esfuerzo operativo, sin necesidad de código de polling ni de infraestructura adicional.\n\nOpción D: Amazon MWAA (Apache Airflow gestionado) permite orquestar flujos de trabajo complejos, pero requiere desplegar y mantener un entorno de Airflow completo (workers, DAGs, etc.), lo que implica mucho más esfuerzo operativo que una simple regla de EventBridge para un caso de uso de disparo por evento de S3.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/automating-sagemaker-with-eventbridge.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/pipeline-eventbridge.html\nhttps://docs.aws.amazon.com/step-functions/latest/dg/tutorial-cloudwatch-events-s3.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20080,
    "questionNumber": 80,
    "question": "An ML engineer is developing a fraud detection model by using the Amazon SageMaker XGBoost algorithm. The model classifies transactions as either fraudulent or legitimate. During testing, the model excels at identifying fraud in the training dataset. However, the model is inefficient at identifying fraud in new and unseen transactions. What should the ML engineer do to improve the fraud detection for new transactions?",
    "choices": [
      {
        "letter": "A",
        "text": "Increase the learning rate.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Remove some irrelevant features from the training dataset.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Increase the value of the max_depth hyperparameter.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Decrease the value of the max_depth hyperparameter.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: aumentar la tasa de aprendizaje (\"eta\" en XGBoost) afecta a la velocidad de convergencia del entrenamiento, pero no corrige el sobreajuste (overfitting); de hecho, tasas de aprendizaje mal ajustadas pueden incluso empeorar la generalización o la estabilidad del entrenamiento.\n\nOpción B: eliminar características irrelevantes puede ayudar en algunos casos a reducir el ruido, pero no ataca la causa principal descrita: el síntoma de \"funciona muy bien en el dataset de entrenamiento pero mal en datos nuevos\" es la definición clásica de overfitting causado por árboles demasiado complejos, no necesariamente por variables irrelevantes.\n\nOpción C: aumentar max_depth permite que los árboles de XGBoost crezcan más y capturen relaciones más complejas (incluido el ruido) de los datos de entrenamiento, lo que empeoraría el overfitting en lugar de solucionarlo.\n\nOpción D (Correcta): la documentación de SageMaker XGBoost define max_depth como el hiperparámetro que controla \"the maximum number of domain subdivisions\" (profundidad máxima de los árboles). Un modelo que memoriza el training set pero generaliza mal ante datos nuevos es un caso clásico de overfitting; reducir max_depth simplifica los árboles individuales, limitando su capacidad de ajustarse al ruido/particularidades del dataset de entrenamiento y mejorando así la capacidad de generalización sobre transacciones nuevas y no vistas.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/xgboost_hyperparameters.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/debugger-built-in-rules.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20081,
    "questionNumber": 81,
    "question": "A company has a binary classification model in production. An ML engineer needs to develop a new version of the model. The new model version must maximize correct predictions of positive labels and negative labels. The ML engineer must use a metric to recalibrate the model to meet these requirements. Which metric should the ML engineer use for the model recalibration?",
    "choices": [
      {
        "letter": "A",
        "text": "Accuracy",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Precision",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Recall",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Specificity",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Accuracy se define como (TP + TN) / Total de predicciones. La documentación de SageMaker Clarify define el \"Accuracy score\" precisamente como la métrica que indica si la etiqueta predicha coincide exactamente con la etiqueta real, es decir, mide de forma conjunta los aciertos tanto en la clase positiva como en la negativa. Esto coincide exactamente con el requisito de \"maximizar predicciones correctas de etiquetas positivas y negativas\".\n\nOpción B: Precision = TP/(TP+FP) solo tiene en cuenta los aciertos sobre las predicciones positivas (no penaliza ni recompensa el acierto en negativos), por lo que no cumple el requisito de maximizar ambas clases.\n\nOpción C: Recall = TP/(TP+FN) solo mide la capacidad de encontrar los positivos reales; ignora completamente el rendimiento sobre la clase negativa.\n\nOpción D: Specificity = TN/(TN+FP) solo mide el acierto sobre la clase negativa, ignorando la clase positiva.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-accuracy-evaluation.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-metrics.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20082,
    "questionNumber": 82,
    "question": "A company is using Amazon SageMaker to create ML models. The company's data scientists need fine-grained control of the ML workflows that they orchestrate. The data scientists also need the ability to visualize SageMaker jobs and workflows as a directed acyclic graph (DAG). The data scientists must keep a running history of model discovery experiments and must establish model governance for auditing and compliance verifications. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS CodePipeline and its integration with SageMaker Studio to manage the entire ML workflows. Use SageMaker ML Lineage Tracking for the running history of experiments and for auditing and compliance verifications.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS CodePipeline and its integration with SageMaker Experiments to manage the entire ML workflows. Use SageMaker Experiments for the running history of experiments and for auditing and compliance verifications.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use SageMaker Pipelines and its integration with SageMaker Studio to manage the entire ML workflows. Use SageMaker ML Lineage Tracking for the running history of experiments and for auditing and compliance verifications.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use SageMaker Pipelines and its integration with SageMaker Experiments to manage the entire ML workflows. Use SageMaker Experiments for the running history of experiments and for auditing and compliance verifications.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: AWS CodePipeline es un servicio de CI/CD genérico orientado a despliegue de código, no ofrece control de grano fino sobre pasos de ML ni visualización nativa de DAGs de trabajos de SageMaker; SageMaker Pipelines es el servicio diseñado específicamente para eso.\n\nOpción B: Además del problema de CodePipeline, usar SageMaker Experiments como mecanismo de gobernanza de auditoría/cumplimiento no es su propósito principal: Experiments está pensado para comparar métricas entre ejecuciones, no para trazabilidad de linaje con fines de auditoría.\n\nOpción C (Correcta): SageMaker Pipelines es el orquestador de workflows de ML de SageMaker con control de grano fino (definición de pasos, condiciones, reintentos) y se integra con SageMaker Studio para visualizar la ejecución del pipeline como un grafo acíclico dirigido (DAG). SageMaker ML Lineage Tracking está documentado explícitamente como la capacidad que \"establece gobernanza de modelos mediante el seguimiento de artefactos de linaje del modelo para auditoría y verificación de cumplimiento\", registrando el historial completo de datasets, jobs, modelos y endpoints relacionados.\n\nOpción D: Aunque usa SageMaker Pipelines (correcto para el DAG), emplea SageMaker Experiments en lugar de Lineage Tracking para la auditoría/cumplimiento; Experiments está orientado a comparación de métricas de entrenamiento, no a la trazabilidad de linaje necesaria para auditoría y cumplimiento normativo.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/lineage-tracking.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/pipelines-lineage-tracking.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-dashboard-lineage.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20083,
    "questionNumber": 83,
    "question": "A company wants to reduce the cost of its containerized ML applications. The applications use ML models that run on Amazon EC2 instances, AWS Lambda functions, and an Amazon Elastic Container Service (Amazon ECS) cluster. The EC2 workloads and ECS workloads use Amazon Elastic Block Store (Amazon EBS) volumes to save predictions and artifacts. An ML engineer must identify resources that are being used inefficiently. The ML engineer also must generate recommendations to reduce the cost of these resources. Which solution will meet these requirements with the LEAST development effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Create code to evaluate each instance's memory and compute usage.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Add cost allocation tags to the resources. Activate the tags in AWS Billing and Cost Management.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Check AWS CloudTrail event history for the creation of the resources.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Run AWS Compute Optimizer.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Implica desarrollar código propio para evaluar el uso de memoria y CPU de cada instancia, lo cual implica un esfuerzo de desarrollo considerable, exactamente lo que la pregunta pide minimizar.\n\nOpción B: Los cost allocation tags permiten desglosar el gasto por recurso/proyecto en Billing and Cost Management, pero no identifican por sí mismos qué recursos están infrautilizados ni generan recomendaciones de optimización de tamaño.\n\nOpción C: CloudTrail registra eventos de API (quién creó qué recurso y cuándo), pero no analiza métricas de utilización ni genera recomendaciones de ahorro.\n\nOpción D (Correcta): AWS Compute Optimizer analiza métricas históricas de utilización y genera recomendaciones de rightsizing sin necesidad de desarrollo adicional. Según la documentación, Compute Optimizer soporta EC2 (incluyendo instancias con carga de trabajo de EBS), AWS Lambda y servicios de Amazon ECS en Fargate, generando hallazgos de sobreaprovisionamiento/subaprovisionamiento y recomendaciones de recursos idle, cubriendo exactamente los tres tipos de recursos mencionados (EC2, Lambda, ECS) con el mínimo esfuerzo de implementación.\n\nReferencias:\nhttps://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html\nhttps://docs.aws.amazon.com/compute-optimizer/latest/ug/supported-resources.html\nhttps://docs.aws.amazon.com/compute-optimizer/latest/ug/view-idle-recommendations.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20084,
    "questionNumber": 84,
    "question": "A company needs to create a central catalog for all the company's ML models. The models are in AWS accounts where the company developed the models initially. The models are hosted in Amazon Elastic Container Registry (Amazon ECR) repositories. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure ECR cross-account replication for each existing ECR repository. Ensure that each model is visible in each AWS account.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a new AWS account with a new ECR repository as the central catalog. Configure ECR cross-account replication between the initial ECR repositories and the central catalog.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the Amazon SageMaker Model Registry to create a model group for models hosted in Amazon ECR. Create a new AWS account. In the new account, use the SageMaker Model Registry as the central catalog. Attach a cross-account resource policy to each model group in the initial AWS accounts.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use an AWS Glue Data Catalog to store the models. Run an AWS Glue crawler to migrate the models from the ECR repositories to the Data Catalog. Configure cross-account access to the Data Catalog.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Replicar cada repositorio ECR en cada cuenta no crea un catálogo central; simplemente duplica los datos en todas las cuentas sin un punto único de gobernanza/descubrimiento, generando redundancia de almacenamiento y gestión más compleja.\n\nOpción B: Requiere copiar físicamente todas las imágenes de contenedor a una nueva cuenta mediante replicación ECR, lo cual duplica el almacenamiento y no aprovecha las capacidades de catálogo de metadatos/gobernanza de modelos (versionado, aprobación, linaje) que SageMaker ofrece de forma nativa.\n\nOpción C (Correcta): La documentación de SageMaker confirma que el Model Registry soporta el registro de \"Model Package Groups\" (con las versiones de modelo) y el uso de políticas de recursos (resource policies) sobre el Model Package Group, el repositorio ECR y el bucket S3 para permitir el registro y despliegue cross-account desde una cuenta central, sin necesidad de duplicar artefactos. Esto permite crear un catálogo central de modelos (Model Registry) en una cuenta, mientras los modelos permanecen en sus repositorios ECR originales, referenciados mediante políticas cross-account.\n\nOpción D: AWS Glue Data Catalog está diseñado para catalogar metadatos de datos tabulares (tablas de bases de datos/S3), no artefactos de modelos de ML en ECR; no existe un crawler de Glue que migre imágenes de contenedor de ECR al Data Catalog.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-version.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-deploy.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-model-group.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20085,
    "questionNumber": 85,
    "question": "A company has developed a new ML model. The company requires online model validation on 10% of the traffic before the company fully releases the model in production. The company uses an Amazon SageMaker endpoint behind an Application Load Balancer (ALB) to serve the model. Which solution will set up the required online validation with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Use production variants to add the new model to the existing SageMaker endpoint. Set the variant weight to 0.1 for the new model. Monitor the number of invocations by using Amazon CloudWatch.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use production variants to add the new model to the existing SageMaker endpoint. Set the variant weight to 1 for the new model. Monitor the number of invocations by using Amazon CloudWatch.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a new SageMaker endpoint. Use production variants to add the new model to the new endpoint. Monitor the number of invocations by using Amazon CloudWatch.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure the ALB to route 10% of the traffic to the new model at the existing SageMaker endpoint. Monitor the number of invocations by using AWS CloudTrail.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): SageMaker permite alojar múltiples \"production variants\" en un mismo endpoint y distribuir el tráfico entre ellas asignando un peso relativo a cada variante. La documentación de SageMaker sobre validación de modelos usa explícitamente el ejemplo de enviar el 10% del tráfico a una variante para su evaluación con datos en vivo, y esto se logra fijando InitialVariantWeight=0.1 en la nueva variante dentro del mismo endpoint existente, monitorizando invocaciones con CloudWatch (métrica nativa de SageMaker). No requiere infraestructura adicional ni cambios de red.\n\nOpción B: Un peso de 1 en la nueva variante (igual al peso por defecto de la variante existente) enviaría aproximadamente el 50% del tráfico a la nueva variante, no el 10% requerido.\n\nOpción C: Crear un endpoint completamente nuevo implica duplicar infraestructura y gestionar el enrutamiento de tráfico fuera de SageMaker (p. ej. en el ALB o en el cliente), lo que añade complejidad operativa innecesaria frente a usar variantes en el mismo endpoint.\n\nOpción D: Enrutar tráfico desde el ALB requiere reconfigurar reglas de balanceo fuera de SageMaker, y CloudTrail registra llamadas a la API de control (management plane), no invocaciones de inferencia; no es la herramienta adecuada para monitorizar el volumen de invocaciones de predicción.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-ab-testing.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-model-validation.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20086,
    "questionNumber": 86,
    "question": "A company needs to develop an ML model. The model must identify an item in an image and must provide the location of the item. Which Amazon SageMaker algorithm will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Image classification",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "XGBoost",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Object detection",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "K-nearest neighbors (k-NN)",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: El algoritmo de Image Classification de SageMaker asigna una o varias etiquetas a toda la imagen, pero no indica la ubicación (bounding box) del objeto dentro de la imagen.\n\nOpción B: XGBoost es un algoritmo de boosting para datos tabulares (clasificación/regresión), no está diseñado para tareas de visión por computador.\n\nOpción C (Correcta): La documentación de SageMaker describe el algoritmo Object Detection como aquel que \"identifica y localiza todas las instancias de objetos en una imagen a partir de una colección conocida de categorías de objetos\", devolviendo tanto la clase como las coordenadas del bounding box (ubicación) del objeto detectado, cumpliendo exactamente ambos requisitos: identificar el ítem y proporcionar su ubicación.\n\nOpción D: k-NN es un algoritmo de clasificación/regresión basado en similitud de vecinos más cercanos sobre vectores de características, no está diseñado nativamente para localizar objetos dentro de una imagen.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/algo-object-detection-tech-notes.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/object-detection-in-formats.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20087,
    "questionNumber": 87,
    "question": "A company has an Amazon S3 bucket that contains 1 ТВ of files from different sources. The S3 bucket contains the following file types in the same S3 folder: CSV, JSON, XLSX, and Apache Parquet. An ML engineer must implement a solution that uses AWS Glue DataBrew to process the data. The ML engineer also must store the final output in Amazon S3 so that AWS Glue can consume the output in the future. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use DataBrew to process the existing S3 folder. Store the output in Apache Parquet format.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use DataBrew to process the existing S3 folder. Store the output in AWS Glue Parquet format.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Separate the data into a different folder for each file type. Use DataBrew to process each folder individually. Store the output in Apache Parquet format.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Separate the data into a different folder for each file type. Use DataBrew to process each folder individually. Store the output in AWS Glue Parquet format.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: La documentación de DataBrew indica explícitamente que \"si se importa una carpeta, todos los archivos de la carpeta deben ser del mismo tipo de archivo\". Como la carpeta original mezcla CSV, JSON, XLSX y Parquet, DataBrew no puede procesarla directamente sin separar antes los tipos de archivo, por lo que esta opción es técnicamente inviable.\n\nOpción B: Tiene el mismo problema de carpeta mixta que la opción A (DataBrew no admite tipos de archivo mezclados en la misma carpeta de origen), además de usar el formato de salida \"AWS Glue Parquet\", que no es imprescindible para la interoperabilidad.\n\nOpción C (Correcta): Separar los datos en una carpeta por tipo de archivo cumple el requisito documentado de DataBrew (una carpeta = un tipo de archivo). El formato de salida \"Apache Parquet\" (uno de los formatos soportados oficialmente por el job Output de DataBrew: CSV, JSON, PARQUET, GLUEPARQUET, AVRO, ORC, XML, TABLEAUHYPER) es un formato columnar estándar totalmente interoperable, que AWS Glue (crawlers, ETL jobs, Athena) puede leer de forma nativa sin ninguna conversión adicional, satisfaciendo el requisito de que \"AWS Glue pueda consumir la salida en el futuro\".\n\nOpción D: Aunque separa correctamente los datos por carpeta, usa el formato \"AWS Glue Parquet\" (GLUEPARQUET). Según la documentación de AWS Glue, este formato corresponde históricamente al \"AWS Glue Parquet writer\", una optimización de rendimiento de escritura (cálculo dinámico del esquema) actualmente marcada como \"no recomendada\" (\"no longer advocated\") en favor de usar Parquet estándar con la opción useGlueParquetWriter; no aporta ninguna ventaja de compatibilidad de lectura futura frente al Parquet estándar, por lo que no es necesario ni preferible para este caso.\n\nReferencias:\nhttps://docs.aws.amazon.com/databrew/latest/dg/supported-data-file-sources.html\nhttps://docs.aws.amazon.com/databrew/latest/dg/databrew-integrations.html\nhttps://docs.aws.amazon.com/databrew/latest/APIReference/API_Output.html\nhttps://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-parquet-home.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20088,
    "questionNumber": 88,
    "question": "A manufacturing company uses an ML model to determine whether products meet a standard for quality. The model produces an output of \"Passed\" or \"Failed.\" Robots separate the products into the two categories by using the model to analyze photos on the assembly line. Which metrics should the company use to evaluate the model's performance? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Precision and recall",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Root mean square error (RMSE) and mean absolute percentage error (MAPE)",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Accuracy and F1 score",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Bilingual Evaluation Understudy (BLEU) score",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Perplexity",
        "isCorrect": false
      }
    ],
    "comments": "Este es un problema de clasificación binaria (\"Passed\" vs \"Failed\") y la pregunta exige elegir DOS opciones (letras), donde cada letra agrupa un par de métricas relacionadas.\n\nOpción A (Correcta): Precisión (TP/(TP+FP)) y recall (TP/(TP+FN)) son métricas de clasificación documentadas en SageMaker Canvas para predicción de 2 categorías; son especialmente relevantes en un contexto de control de calidad de fabricación, donde interesa distinguir explícitamente el coste de los falsos positivos (piezas buenas descartadas) frente a los falsos negativos (piezas defectuosas que pasan el control).\n\nOpción B: RMSE y MAPE son métricas de error para modelos de regresión (valores numéricos continuos), no aplican a un problema de clasificación binaria como \"Passed\"/\"Failed\".\n\nOpción C (Correcta): La documentación de SageMaker Canvas confirma Accuracy (\"ratio de items correctamente predichos sobre el total\") y F1 (\"media armónica de precisión y recall\") como métricas estándar de evaluación de clasificación de 2 categorías; F1 resume en un solo número el equilibrio entre falsos positivos y falsos negativos, mientras que Accuracy da la visión global de aciertos.\n\nOpción D: BLEU es una métrica para evaluar la calidad de traducciones automáticas/generación de texto (NLP), no aplica a clasificación de imágenes.\n\nOpción E: Perplexity mide la calidad de modelos de lenguaje (probabilidad de secuencias de texto), tampoco aplica a un clasificador binario de imágenes.\n\nNota de discrepancia: el campo \"Most Accepted Answer\" del scraping de ExamTopics solo recoge la letra C, lo cual es incoherente con el propio enunciado \"(Choose two)\"; la discusión de la comunidad muestra mayoritariamente la selección \"AC\" (3 votos) frente a \"C\" en solitario (1 voto), y dado que tanto A como C son pares de métricas de clasificación binaria válidas y documentadas por AWS (a diferencia de B, D y E, que corresponden a regresión o a NLP), se considera que la respuesta técnicamente correcta para un \"choose two\" es A y C.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-metrics.html",
    "category": "Model Development",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 20089,
    "questionNumber": 89,
    "question": "An ML engineer needs to encrypt all data in transit when an ML training job runs. The ML engineer must ensure that encryption in transit is applied to processes that Amazon SageMaker uses during the training job. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Encrypt communication between nodes for batch processing.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Encrypt communication between nodes in a training cluster.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Specify an AWS Key Management Service (AWS KMS) key during creation of the training job request.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Specify an AWS Key Management Service (AWS KMS) key during creation of the SageMaker domain.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: La documentación de SageMaker se refiere a \"cifrado entre contenedores/nodos\" en el contexto de un training/processing job de entrenamiento distribuido, no existe un mecanismo separado específico para \"batch processing\" en este contexto; la nomenclatura correcta y documentada es la protección de comunicaciones entre las instancias de cómputo de ML en un job de entrenamiento distribuido.\n\nOpción B (Correcta): La documentación de SageMaker sobre \"Protect Communications Between ML Compute Instances in a Distributed Training Job\" describe la característica de \"inter-container traffic encryption\" (cifrado del tráfico entre contenedores), que cifra las comunicaciones entre los nodos de un clúster de entrenamiento distribuido. Esta es la funcionalidad que se activa explícitamente (EnableInterContainerTrafficEncryption=True) para cifrar el tráfico en tránsito entre los nodos del training job.\n\nOpción C: Especificar una clave de AWS KMS en la creación del training job cifra los datos en reposo (volúmenes de almacenamiento, datos de salida en S3), no el tráfico en tránsito entre nodos del clúster.\n\nOpción D: Especificar una clave KMS al crear el dominio de SageMaker afecta al cifrado en reposo de los recursos del dominio (EFS, EBS de Studio), no al tráfico en tránsito del training job en sí.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/train-encrypt.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/encryption-in-transit.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20090,
    "questionNumber": 90,
    "question": "An ML engineer needs to use metrics to assess the quality of a time-series forecasting model. Which metrics apply to this model? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Recall",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "LogLoss",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Root mean square error (RMSE)",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "InferenceLatency",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Average weighted quantile loss (wQL)",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Recall es una métrica de clasificación (TP/(TP+FN)); no aplica a la predicción de valores numéricos continuos de una serie temporal.\n\nOpción B: LogLoss evalúa la calidad de salidas probabilísticas de un clasificador; no es aplicable a modelos de forecasting de valores continuos.\n\nOpción C (Correcta): RMSE es una métrica de error estándar documentada tanto en Amazon Forecast (\"Evaluating Predictor Accuracy\") como en el algoritmo DeepAR de SageMaker para medir la desviación entre los valores pronosticados y los reales en series temporales.\n\nOpción D: InferenceLatency mide el tiempo de respuesta de un endpoint, es una métrica operativa de rendimiento, no de calidad predictiva del modelo.\n\nOpción E (Correcta): La documentación de Amazon Forecast y de SageMaker Canvas describe explícitamente \"Average Weighted Quantile Loss (wQL)\" como una métrica de precisión para pronósticos probabilísticos de series temporales, que promedia la pérdida en los cuantiles (p. ej. P10, P50, P90), siendo el objetivo por defecto de los trabajos de forecasting de SageMaker Autopilot.\n\nReferencias:\nhttps://docs.aws.amazon.com/forecast/latest/dg/metrics.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-metrics.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/deepar.html",
    "category": "Model Development",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 20091,
    "questionNumber": 91,
    "question": "A company runs Amazon SageMaker ML models that use accelerated instances. The models require real-time responses. Each model has different scaling requirements. The company must not allow a cold start for the models. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a SageMaker Serverless Inference endpoint for each model. Use provisioned concurrency for the endpoints.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a SageMaker Asynchronous Inference endpoint for each model. Create an auto scaling policy for each endpoint.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a SageMaker endpoint. Create an inference component for each model. In the inference component settings, specify the newly created endpoint. Create an auto scaling policy for each inference component. Set the parameter for the minimum number of copies to at least 1.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an Amazon S3 bucket. Store all the model artifacts in the S3 bucket. Create a SageMaker multi-model endpoint. Point the endpoint to the S3 bucket. Create an auto scaling policy for the endpoint. Set the parameter for the minimum number of copies to at least 1.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: SageMaker Serverless Inference no soporta instancias aceleradas (GPU) y su modelo de \"provisioned concurrency\" está diseñado para mantener capacidad serverless preparada, pero este tipo de endpoint no está pensado para instancias aceleradas con requisitos de escalado independientes por modelo.\n\nOpción B: Asynchronous Inference procesa solicitudes en cola de forma asíncrona (para payloads grandes o procesamiento largo), no ofrece respuestas en tiempo real de baja latencia y puede escalar a cero, lo que provocaría cold starts, justo lo que se debe evitar.\n\nOpción C (Correcta): Los \"inference components\" de SageMaker permiten desplegar múltiples modelos en un mismo endpoint en tiempo real, asignando de forma independiente recursos de cómputo (incluyendo aceleradores) y políticas de auto scaling por modelo. La documentación de la API (InferenceComponentRuntimeConfig) permite fijar el \"copy count\", y estableciendo el número mínimo de copias en al menos 1 (en vez de 0) se garantiza que siempre haya al menos una instancia \"caliente\" del modelo lista para servir peticiones, evitando el cold start, mientras cada componente escala de forma independiente según sus propios requisitos.\n\nOpción D: Un endpoint multi-modelo (Multi-Model Endpoint) carga y descarga modelos dinámicamente en memoria bajo demanda desde S3; cuando un modelo no está cargado en memoria, la primera invocación sufre una penalización de latencia (cold start) al tener que descargarlo, lo cual viola el requisito de no permitir cold starts, además de no ofrecer políticas de escalado independientes por modelo.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-sagemaker-inferencecomponent-inferencecomponentruntimeconfig.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling-zero-instances.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20092,
    "questionNumber": 92,
    "question": "A company uses Amazon SageMaker for its ML process. A compliance audit discovers that an Amazon S3 bucket for training data uses server-side encryption with S3 managed keys (SSE-S3). The company requires customer managed keys. An ML engineer changes the S3 bucket to use server-side encryption with AWS KMS keys (SSE-KMS). The ML engineer makes no other configuration changes. After the change to the encryption settings, SageMaker training jobs start to fail with AccessDenied errors. What should the ML engineer do to resolve this problem?",
    "choices": [
      {
        "letter": "A",
        "text": "Update the IAM policy that is attached to the execution role for the training jobs. Include the s3:ListBucket and s3:GetObject permissions.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Update the S3 bucket policy that is attached to the S3 bucket. Set the value of the aws:SecureTransport condition key to True.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Update the IAM policy that is attached to the execution role for the training jobs. Include the kms:Encrypt and kms:Decrypt permissions.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Update the IAM policy that is attached to the user that created the training jobs. Include the kms:CreateGrant permission.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: s3:ListBucket y s3:GetObject son los permisos de S3 estándar que ya deben existir para que un training job funcione con SSE-S3; el cambio a SSE-KMS no elimina estos permisos de S3, el problema nuevo introducido es específicamente la falta de permisos sobre la clave de KMS, no sobre el bucket S3.\n\nOpción B: La condición aws:SecureTransport obliga a usar HTTPS en las conexiones a S3, no está relacionada con el cifrado SSE-KMS ni con el error AccessDenied descrito, que se debe a permisos de KMS, no de transporte.\n\nOpción C (Correcta): La documentación de SageMaker (\"sagemaker-roles.html\") indica explícitamente: \"Si su entrada está cifrada usando SSE-KMS, añada el permiso kms:Decrypt\" al rol de ejecución, y \"si especifica una clave KMS en la configuración de salida de su training job, añada el permiso kms:Encrypt\". Al pasar el bucket de datos de entrenamiento de SSE-S3 a SSE-KMS, el rol de ejecución del training job necesita como mínimo kms:Decrypt para poder leer los datos cifrados; kms:Encrypt sería necesario si además se cifra la salida con esa misma clave KMS. De las opciones dadas, C es la que aporta los permisos de KMS necesarios sobre el rol de ejecución (el actor real que SageMaker usa para acceder a S3/KMS durante el job), resolviendo el AccessDenied.\n\nOpción D: kms:CreateGrant es necesario cuando se cifra el volumen de almacenamiento de las instancias de entrenamiento con una clave KMS (resource configuration), no para leer datos de entrada cifrados en S3; además, el permiso debe otorgarse al rol de ejecución del training job, no al usuario/rol que lanza el job.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-roles.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20093,
    "questionNumber": 93,
    "question": "A company runs training jobs on Amazon SageMaker by using a compute optimized instance. Demand for training runs will remain constant for the next 55 weeks. The instance needs to run for 35 hours each week. The company needs to reduce its model training costs. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use a serverless endpoint with a provisioned concurrency of 35 hours for each week. Run the training on the endpoint.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use SageMaker Edge Manager for the training. Specify the instance requirement in the edge device configuration. Run the training.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the heterogeneous cluster feature of SageMaker Training. Configure the instance_type, instance_count, and instance_groups arguments to run training jobs.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Opt in to a SageMaker Savings Plan with a 1-year term and an All Upfront payment. Run a SageMaker Training job on the instance.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Los endpoints serverless y su \"provisioned concurrency\" son un mecanismo de inferencia (hosting), no existe tal concepto para trabajos de entrenamiento (training jobs); esta opción mezcla conceptos incompatibles con SageMaker Training.\n\nOpción B: SageMaker Edge Manager gestiona el despliegue y monitorización de modelos ya entrenados en dispositivos edge; no es un servicio para ejecutar ni reducir el coste de trabajos de entrenamiento.\n\nOpción C: Los clústeres heterogéneos permiten combinar distintos tipos de instancia dentro de un mismo training job (por ejemplo, para separar el preprocesamiento de datos del entrenamiento en GPU), pero es una funcionalidad de arquitectura del job, no un mecanismo de ahorro de costes por compromiso de uso.\n\nOpción D (Correcta): La documentación de AWS confirma que Amazon SageMaker AI Savings Plans ofrecen precios reducidos (hasta un 64% de descuento) a cambio de un compromiso de uso constante de instancias de SageMaker AI durante un término de 1 o 3 años. Dado que la demanda es constante durante 55 semanas (aproximadamente un año) con 35 horas de uso por semana, un Savings Plan de 1 año con pago All Upfront maximiza el descuento por el compromiso de uso continuado, reduciendo el coste total de los training jobs frente a on-demand.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/inference-cost-optimization.html\nhttps://docs.aws.amazon.com/savingsplans/latest/userguide/sp-services.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20094,
    "questionNumber": 94,
    "question": "A company deployed an ML model that uses the XGBoost algorithm to predict product failures. The model is hosted on an Amazon SageMaker endpoint and is trained on normal operating data. An AWS Lambda function provides the predictions to the company's application. An ML engineer must implement a solution that uses incoming live data to detect decreased model accuracy over time. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon CloudWatch to create a dashboard that monitors real-time inference data and model predictions. Use the dashboard to detect drift.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Modify the Lambda function to calculate model drift by using real-time inference data and model predictions. Program the Lambda function to send alerts.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Schedule a monitoring job in SageMaker Model Monitor. Use the job to detect drift by analyzing the live data against a baseline of the training data statistics and constraints.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Schedule a monitoring job in SageMaker Debugger. Use the job to detect drift by analyzing the live data against a baseline of the training data statistics and constraints.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Un dashboard manual de CloudWatch permite visualizar métricas, pero no calcula estadísticamente el drift ni compara automáticamente los datos en vivo contra una línea base de entrenamiento; requeriría desarrollo adicional para detectar drift de forma fiable.\n\nOpción B: Modificar la función Lambda para calcular drift manualmente implica desarrollar y mantener lógica estadística propia de comparación de distribuciones, lo cual duplica una funcionalidad ya ofrecida de forma nativa por SageMaker, aumentando el esfuerzo operativo sin necesidad.\n\nOpción C (Correcta): SageMaker Model Monitor está diseñado precisamente para programar trabajos periódicos que analizan los datos de inferencia en vivo capturados en el endpoint y los comparan estadísticamente contra un baseline (estadísticas y restricciones) calculado sobre los datos de entrenamiento, generando violaciones cuando se detecta drift de datos o de calidad del modelo, tal como confirma la documentación de \"Model Monitor\" y \"Monitoring a Model in Production\".\n\nOpción D: SageMaker Debugger está orientado a depurar problemas de entrenamiento (por ejemplo, gradientes que exploten o se anulen, cuellos de botella de rendimiento) durante el propio training job, no a monitorizar drift de datos en producción sobre inferencias en vivo.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-mlops.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-model-monitor.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-data-quality.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20095,
    "questionNumber": 95,
    "question": "A company has an ML model that uses historical transaction data to predict customer behavior. An ML engineer is optimizing the model in Amazon SageMaker to enhance the model's predictive accuracy. The ML engineer must examine the input data and the resulting predictions to identify trends that could skew the model's performance across different demographics. Which solution will provide this level of analysis?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon CloudWatch to monitor network metrics and CPU metrics for resource optimization during model training.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create AWS Glue DataBrew recipes to correct the data based on statistics from the model output.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use SageMaker Clarify to evaluate the model and training data for underlying patterns that might affect accuracy.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create AWS Lambda functions to automate data pre-processing and to ensure consistent quality of input data for the model.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: CloudWatch con métricas de red y CPU informa sobre el rendimiento de infraestructura (uso de recursos de cómputo), no sobre patrones de sesgo en los datos de entrada ni en las predicciones del modelo respecto a demografías.\n\nOpción B: DataBrew permite crear recetas de transformación de datos, pero no está diseñado para el análisis estadístico de sesgo entre grupos demográficos ni para explicar qué características afectan las predicciones.\n\nOpción C (Correcta): La documentación de SageMaker Clarify confirma que esta herramienta calcula métricas de sesgo \"pre-training\" (sobre el dataset de entrenamiento) y \"post-training\" (sobre las predicciones del modelo) para detectar patrones subyacentes que pueden afectar la equidad y la precisión del modelo entre distintos grupos (facets/demografías), exactamente el tipo de análisis solicitado: examinar datos de entrada y predicciones resultantes para identificar tendencias que sesguen el rendimiento por demografía.\n\nOpción D: Automatizar el preprocesamiento con Lambda mejora la consistencia de calidad de los datos de entrada, pero no realiza un análisis de sesgo ni identifica patrones demográficos que afecten la precisión del modelo.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-processing-job-configure-analysis.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/train-model.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-measure-post-training-bias.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20096,
    "questionNumber": 96,
    "question": "A company uses 10 Reserved Instances of accelerated instance types to serve the current version of an ML model. An ML engineer needs to deploy a new version of the model to an Amazon SageMaker real-time inference endpoint. The solution must use the original 10 instances to serve both versions of the model. The solution also must include one additional Reserved Instance that is available to use in the deployment process. The transition between versions must occur with no downtime or service interruptions. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure a blue/green deployment with all-at-once traffic shifting.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure a blue/green deployment with canary traffic shifting and a size of 10%.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure a shadow test with a traffic sampling percentage of 10%.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure a rolling deployment with a rolling batch size of 1.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Un despliegue blue/green \"all-at-once\" requiere aprovisionar una flota verde completa (nueva) igual en tamaño a la flota azul (existente) antes de desviar todo el tráfico de golpe; esto exigiría hasta 10 instancias adicionales, muy por encima de la única instancia Reserved adicional disponible.\n\nOpción B: Aunque el traffic shifting sea de canary al 10%, un despliegue blue/green sigue necesitando aprovisionar la flota verde completa en paralelo a la flota azul antes de empezar a desviar tráfico; el porcentaje de canary controla cómo se mueve el tráfico, no cuántas instancias adicionales se necesitan para tener ambas flotas activas, por lo que igualmente requeriría capacidad adicional cercana al tamaño total de la flota, no solo 1 instancia.\n\nOpción C: Un shadow test replica una fracción del tráfico a una variante \"sombra\" en paralelo solo con fines de comparación, sin sustituir realmente el modelo en producción; no es un mecanismo de despliegue definitivo de la nueva versión y tampoco resuelve la restricción de capacidad extra limitada a 1 instancia.\n\nOpción D (Correcta): La documentación oficial de SageMaker sobre \"rolling deployments\" indica explícitamente que \"proporcionan el beneficio de requisitos de capacidad reducidos en comparación con los despliegues blue/green. Con los despliegues rolling, hay menos instancias activas a la vez\", ya que las instancias de la flota antigua se liberan después de cada lote antes de aprovisionar el siguiente. Con un tamaño de lote (\"rolling batch size\") de 1 instancia sobre una flota de 10, solo se necesita 1 instancia adicional en cada momento del proceso —exactamente la única Reserved Instance extra disponible—, cumpliendo el requisito de cero downtime al mantener siempre las 10 instancias sirviendo tráfico.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-rolling.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-blue-green.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20097,
    "questionNumber": 97,
    "question": "An IoT company uses Amazon SageMaker to train and test an XGBoost model for object detection. ML engineers need to monitor performance metrics when they train the model with variants in hyperparameters. The ML engineers also need to send Short Message Service (SMS) text messages after training is complete. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon CloudWatch to monitor performance metrics. Use Amazon Simple Queue Service (Amazon SQS) for message delivery.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon CloudWatch to monitor performance metrics. Use Amazon Simple Notification Service (Amazon SNS) for message delivery.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS CloudTrail to monitor performance metrics. Use Amazon Simple Queue Service (Amazon SQS) for message delivery.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS CloudTrail to monitor performance metrics. Use Amazon Simple Notification Service (Amazon SNS) for message delivery.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Aunque CloudWatch es correcto para monitorizar métricas, Amazon SQS es un servicio de colas de mensajes para comunicación entre componentes de una aplicación; no tiene capacidad nativa de enviar SMS a teléfonos, por lo que no cumple el requisito de notificación por SMS.\n\nOpción B (Correcta): La documentación de SageMaker confirma que los training jobs (incluidos los de hyperparameter tuning, que generan variantes de hiperparámetros) publican sus métricas de rendimiento en Amazon CloudWatch, permitiendo su monitorización en tiempo real. Para el envío de SMS, la documentación de Amazon SNS confirma su capacidad de \"mobile text messaging\", permitiendo suscribir números de teléfono a un topic y publicar mensajes SMS; combinando ambos servicios (CloudWatch para métricas, SNS para el SMS al finalizar el job, por ejemplo mediante una regla de EventBridge sobre el estado del training job) se cumplen ambos requisitos.\n\nOpción C: AWS CloudTrail registra únicamente eventos de llamadas a la API (auditoría), no métricas de rendimiento del entrenamiento (como loss o accuracy); además SQS no envía SMS directamente.\n\nOpción D: Igual que la opción C, CloudTrail no es la herramienta para monitorizar métricas de rendimiento del modelo durante el entrenamiento, aunque en este caso el mecanismo de mensajería (SNS) sí sería el correcto para el envío de SMS.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/training-metrics.html\nhttps://docs.aws.amazon.com/sns/latest/dg/sns-mobile-phone-number-as-subscriber.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20098,
    "questionNumber": 98,
    "question": "A company is working on an ML project that will include Amazon SageMaker notebook instances. An ML engineer must ensure that the SageMaker notebook instances do not allow root access. Which solution will prevent the deployment of notebook instances that allow root access?",
    "choices": [
      {
        "letter": "A",
        "text": "Use IAM condition keys to stop deployments of SageMaker notebook instances that allow root access.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use AWS Key Management Service (AWS KMS) keys to stop deployments of SageMaker notebook instances that allow root access.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Monitor resource creation by using Amazon EventBridge events. Create an AWS Lambda function that deletes all deployed SageMaker notebook instances that allow root access.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Monitor resource creation by using AWS CloudFormation events. Create an AWS Lambda function that deletes all deployed SageMaker notebook instances that allow root access.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): La documentación de IAM de SageMaker documenta la clave de condición específica del servicio sagemaker:RootAccess, que permite exigir en una política de IAM que las solicitudes de creación/actualización de instancias de notebook tengan el acceso root deshabilitado, bloqueando (denegando) de forma preventiva en el momento de la creación cualquier intento de desplegar una instancia con root habilitado. Esto es también la base del control gestionado de AWS Control Tower \"CT.SAGEMAKER.PR.3 - Require Amazon SageMaker AI notebook instances to have root access disallowed\".\n\nOpción B: Las claves de AWS KMS gestionan el cifrado de datos en reposo (por ejemplo, del volumen de almacenamiento de la instancia de notebook); no tienen ninguna relación con el control del parámetro RootAccess ni pueden bloquear su creación.\n\nOpción C: Un enfoque reactivo (detectar y luego borrar con Lambda tras el evento de EventBridge) permite que la instancia con root access llegue a desplegarse y exista temporalmente antes de ser eliminada, lo cual no \"previene\" la creación, solo la remedia después del hecho, incumpliendo el requisito de \"prevenir el despliegue\".\n\nOpción D: Igual que la opción C pero usando eventos de CloudFormation; sigue siendo un control reactivo posterior a la creación (detect-and-remediate), no un control preventivo (preventive control) como el que exige la pregunta.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/nbi-root-access.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/security_iam_id-based-policy-examples.html\nhttps://docs.aws.amazon.com/controltower/latest/controlreference/sagemaker-rules.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20099,
    "questionNumber": 99,
    "question": "A company is using Amazon SageMaker to develop ML models. The company stores sensitive training data in an Amazon S3 bucket. The model training must have network isolation from the internet. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Run the SageMaker training jobs in private subnets. Create a NAT gateway. Route traffic for training through the NAT gateway.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Run the SageMaker training jobs in private subnets. Create an S3 gateway VPC endpoint. Route traffic for training through the S3 gateway VPC endpoint.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Run the SageMaker training jobs in public subnets that have an attached security group. In the security group, use inbound rules to limit traffic from the internet. Encrypt SageMaker instance storage by using server-side encryption with AWS KMS keys (SSE-KMS).",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Encrypt traffic to Amazon S3 by using a bucket policy that includes a value of True for the aws:SecureTransport condition key. Use default at-rest encryption for Amazon S3. Encrypt SageMaker instance storage by using server-side encryption with AWS KMS keys (SSE-KMS).",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Un NAT gateway permite que instancias en subredes privadas inicien conexiones salientes hacia internet; esto es precisamente lo contrario del aislamiento de red requerido, ya que seguiría existiendo una ruta hacia internet para el tráfico del training job.\n\nOpción B (Correcta): La guía de SageMaker sobre \"Give SageMaker AI Training Jobs Access to Resources in Your Amazon VPC\" describe el patrón recomendado: ejecutar los training jobs dentro de una VPC en subredes privadas (sin ruta a internet) y crear un \"Amazon S3 VPC Endpoint\" (gateway endpoint) para que el tráfico hacia el bucket S3 de datos de entrenamiento circule por la red privada de AWS a través de PrivateLink/gateway, sin salir a la red pública de internet, logrando así el aislamiento de red requerido mientras se mantiene el acceso a los datos sensibles en S3.\n\nOpción C: Usar subredes públicas implica que las instancias reciben direccionamiento con ruta hacia un internet gateway; aunque se restrinja el tráfico entrante con reglas de security group, la instancia sigue estando en una red con salida a internet, lo cual no proporciona aislamiento de red; además, el cifrado SSE-KMS protege datos en reposo, no aísla la red.\n\nOpción D: aws:SecureTransport fuerza el uso de HTTPS en las conexiones a S3 (cifrado en tránsito de la conexión), pero no impide que el tráfico atraviese la red pública de internet; el cifrado en reposo (SSE-KMS, cifrado por defecto de S3) tampoco proporciona aislamiento de red. Ninguna de estas medidas equivale a ejecutar el training job sin acceso a internet.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/train-vpc.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20100,
    "questionNumber": 100,
    "question": "A company needs an AWS solution that will automatically create versions of ML models as the models are created. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Amazon Elastic Container Registry (Amazon ECR)",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Model packages from Amazon SageMaker Marketplace",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Amazon SageMaker ML Lineage Tracking",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Amazon SageMaker Model Registry",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Amazon ECR es un registro de imágenes de contenedor (Docker/OCI); versiona imágenes de contenedor mediante tags digest, pero no está diseñado para el ciclo de vida de versionado de modelos de ML (aprobación, metadatos de métricas, model groups).\n\nOpción B: El SageMaker Marketplace ofrece paquetes de modelos y algoritmos de terceros para su compra/uso, no es un mecanismo para versionar automáticamente los modelos que la propia compañía crea.\n\nOpción C: Lineage Tracking registra las relaciones de procedencia entre datasets, jobs, modelos y endpoints (para trazabilidad/auditoría), pero no es el mecanismo que gestiona el versionado en sí de los artefactos de modelo.\n\nOpción D (Correcta): La documentación de SageMaker confirma que \"los model packages usados en el Model Registry están versionados y deben asociarse a un Model Group\": cada vez que se registra un nuevo model package en un Model Group existente (por ejemplo, automáticamente al final de un pipeline de entrenamiento mediante un paso RegisterModel), el Model Registry le asigna automáticamente el siguiente número de versión dentro de ese grupo, cumpliendo exactamente el requisito de creación automática de versiones de modelos.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-models.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-version.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-model-group.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20101,
    "questionNumber": 101,
    "question": "A company needs to use Retrieval Augmented Generation (RAG) to supplement an open source large language model (LLM) that runs on Amazon Bedrock. The company's data for RAG is a set of documents in an Amazon S3 bucket. The documents consist of .csv files and .docx files. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a pipeline in Amazon SageMaker Pipelines to generate a new model. Call the new model from Amazon Bedrock to perform RAG queries.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Convert the data into vectors. Store the data in an Amazon Neptune database. Connect the database to Amazon Bedrock. Call the Amazon Bedrock API to perform RAG queries.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Fine-tune an existing LLM by using an AutoML job in Amazon SageMaker. Configure the S3 bucket as a data source for the AutoML job. Deploy the LLM to a SageMaker endpoint. Use the endpoint to perform RAG queries.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a knowledge base for Amazon Bedrock. Configure a data source that references the S3 bucket. Use the Amazon Bedrock API to perform RAG queries.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: SageMaker Pipelines sirve para orquestar flujos de entrenamiento/procesamiento, no para implementar RAG; construir y mantener un pipeline completo para \"generar un nuevo modelo\" implica mucho más esfuerzo operativo que usar un servicio administrado.\n\nOpción B: Requeriría vectorizar manualmente los documentos y operar una base de datos Amazon Neptune como almacén de vectores, además de construir la integración con Bedrock; esto añade infraestructura y mantenimiento innecesarios.\n\nOpción C: El fine-tuning con AutoML crea un nuevo modelo entrenado, lo cual no es RAG (que consiste en recuperar contexto en tiempo de consulta, no en reentrenar el modelo) y añade una sobrecarga operativa de entrenamiento y despliegue de endpoint innecesaria.\n\nOpción D (Correcta): Amazon Bedrock Knowledge Bases permite conectar una fuente de datos de Amazon S3 (soporta directamente .csv, .docx y otros formatos) y Bedrock gestiona automáticamente la ingesta, fragmentación (chunking), generación de embeddings, indexación en un almacén vectorial y las operaciones Retrieve/RetrieveAndGenerate. Es la opción totalmente administrada, sin necesidad de infraestructura propia, por lo que tiene el menor esfuerzo operativo.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/s3-data-source-connector.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20102,
    "questionNumber": 102,
    "question": "A company plans to deploy an ML model for production inference on an Amazon SageMaker endpoint. The average inference payload size will vary from 100 MB to 300 MB. Inference requests must be processed in 60 minutes or less. Which SageMaker inference option will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Serverless inference",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Asynchronous inference",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Real-time inference",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Batch transform",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: La inferencia sin servidor de SageMaker tiene límites de payload mucho menores (unos pocos MB) y de tiempo de espera menores; no está diseñada para payloads de cientos de MB.\n\nOpción B (Correcta): Amazon SageMaker Asynchronous Inference admite payloads de hasta 1 GB y tiempos de procesamiento de hasta 60 minutos, encajando exactamente con los requisitos de 100-300 MB y un límite de 60 minutos. Encola las solicitudes y procesa cada una de forma asíncrona, notificando el resultado (por ejemplo vía Amazon SNS) cuando termina.\n\nOpción C: Los endpoints de inferencia en tiempo real tienen un límite de payload de unos 6 MB y un timeout de aproximadamente 60 segundos, insuficiente para este escenario.\n\nOpción D: Batch transform está pensado para procesar grandes conjuntos de datos en modo offline/por lotes de forma periódica, no para solicitudes de inferencia individuales con un límite de tiempo de procesamiento definido de 60 minutos por solicitud; no es la opción diseñada para este patrón de payload variable por solicitud.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model-options.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20103,
    "questionNumber": 103,
    "question": "An ML engineer notices class imbalance in an image classification training job. What should the ML engineer do to resolve this issue?",
    "choices": [
      {
        "letter": "A",
        "text": "Reduce the size of the dataset.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Transform some of the images in the dataset.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Apply random oversampling on the dataset.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Apply random data splitting on the dataset.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Reducir el tamaño del dataset no corrige el desbalance entre clases; simplemente reduce la cantidad total de datos disponibles y puede empeorar el aprendizaje.\n\nOpción B: Transformar algunas imágenes (aumentación de datos genérica) no ataca directamente el problema de proporción entre clases si no se aplica de forma selectiva a la clase minoritaria.\n\nOpción C (Correcta): El sobremuestreo aleatorio (random oversampling) de la clase minoritaria es una técnica de remuestreo estándar y ampliamente documentada para mitigar el desbalance de clases, ya que equilibra la representación de las clases sin necesidad de recolectar más datos.\n\nOpción D: El data splitting aleatorio (train/test/validation) es una práctica de validación de modelos y no tiene relación con corregir el desbalance de clases.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data-best-practices.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20104,
    "questionNumber": 104,
    "question": "A company receives daily .csv files about customer interactions with its ML model. The company stores the files in Amazon S3 and uses the files to retrain the model. An ML engineer needs to implement a solution to mask credit card numbers in the files before the model is retrained. Which solution will meet this requirement with the LEAST development effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a discovery job in Amazon Macie. Configure the job to find and mask sensitive data.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create Apache Spark code to run on an AWS Glue job. Use the Sensitive Data Detection functionality in AWS Glue to find and mask sensitive data.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create Apache Spark code to run on an AWS Glue job. Program the code to perform a regex operation to find and mask sensitive data.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create Apache Spark code to run on an Amazon EC2 instance. Program the code to perform an operation to find and mask sensitive data.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Amazon Macie es un servicio de descubrimiento (discovery) de datos sensibles en Amazon S3: genera hallazgos (findings) pero no tiene una acción nativa para enmascarar o transformar los datos; requeriría desarrollo adicional para actuar sobre los hallazgos.\n\nOpción B (Correcta): AWS Glue incluye de forma nativa la funcionalidad de \"Sensitive Data Detection\" (transformación PIIDetection), que permite identificar, eliminar o enmascarar información de identificación personal (incluyendo números de tarjeta de crédito, un tipo administrado por AWS) directamente sobre un DynamicFrame dentro de un job de Glue, sin necesidad de escribir lógica de detección propia. Es la opción con menor esfuerzo de desarrollo porque la detección y el enmascarado ya vienen incorporados.\n\nOpción C: Requiere programar manualmente expresiones regulares para detectar y enmascarar los números de tarjeta, lo cual implica mucho más esfuerzo de desarrollo y mantenimiento que usar la funcionalidad nativa de Glue.\n\nOpción D: Ejecutar código Spark personalizado sobre una instancia EC2 exige gestionar la infraestructura del clúster y escribir toda la lógica de detección/enmascarado manualmente, lo que representa el mayor esfuerzo de desarrollo y operación de todas las opciones.\n\nReferencias:\nhttps://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-visual-job-api.html\nhttps://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-sensitive-data-example.html\nhttps://docs.aws.amazon.com/macie/latest/user/mdis-reference-pii.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20105,
    "questionNumber": 105,
    "question": "A medical company is using AWS to build a tool to recommend treatments for patients. The company has obtained health records and self-reported textual information in English from patients. The company needs to use this information to gain insight about the patients. Which solution will meet this requirement with the LEAST development effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon SageMaker to build a recurrent neural network (RNN) to summarize the data.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon Comprehend Medical to summarize the data.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use Amazon Kendra to create a quick-search tool to query the data.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use the Amazon SageMaker Sequence-to-Sequence (seq2seq) algorithm to create a text summary from the data.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Construir y entrenar una RNN personalizada en SageMaker implica un desarrollo de modelo completo (recolección de datos etiquetados, entrenamiento, ajuste, despliegue), lo que supone un esfuerzo de desarrollo muy alto frente a usar un servicio administrado.\n\nOpción B (Correcta): Amazon Comprehend Medical es un servicio de NLP totalmente administrado y preentrenado específicamente para extraer información clínica relevante (afecciones médicas, medicamentos, anatomía, procedimientos, información PHI, etc.) de texto clínico no estructurado, sin necesidad de entrenar ni gestionar modelos. Nota técnica: la documentación oficial describe la capacidad de Comprehend Medical como \"detección de entidades\" / extracción de información (insights) sobre texto clínico, más que \"resumen\" en sentido estricto; aun así, entre las opciones dadas es la única diseñada específicamente para obtener información clínica útil (insight) del texto médico con cero esfuerzo de entrenamiento, por lo que sigue siendo la mejor respuesta con el menor esfuerzo de desarrollo.\n\nOpción C: Amazon Kendra es un motor de búsqueda inteligente; permite consultar la información pero no analiza ni extrae insights estructurados de las historias clínicas, por lo que no cumple el requisito de \"ganar insight sobre los pacientes\".\n\nOpción D: El algoritmo Seq2Seq de SageMaker requiere entrenar un modelo de resumen de texto desde cero (o con transferencia), lo cual implica un desarrollo considerablemente mayor que usar un servicio administrado como Comprehend Medical.\n\nReferencias:\nhttps://docs.aws.amazon.com/comprehend-medical/latest/dev/comprehendmedical-welcome.html\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/generative-ai-nlp-healthcare/comprehend-medical.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20106,
    "questionNumber": 106,
    "question": "A company needs to extract entities from a PDF document to build a classifier model. Which solution will extract and store the entities in the LEAST amount of time?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Comprehend to extract the entities. Store the output in Amazon S3.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use an open source AI optical character recognition (OCR) tool on Amazon SageMaker to extract the entities. Store the output in Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon Textract to extract the entities. Use Amazon Comprehend to convert the entities to text. Store the output in Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon Textract integrated with Amazon Augmented AI (Amazon A2I) to extract the entities. Store the output in Amazon S3.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Amazon Comprehend admite de forma nativa documentos semiestructurados como PDF, Word e imágenes como entrada directa para trabajos de reconocimiento de entidades (incluye internamente el procesamiento de documentos, sin que el usuario tenga que orquestar un paso de OCR separado). Esto permite extraer las entidades directamente del PDF y almacenarlas en S3 en un solo paso, siendo la solución más rápida de las cuatro.\n\nOpción B: Usar una herramienta de OCR de código abierto sobre SageMaker implica desplegar, gestionar y mantener infraestructura y código personalizado, lo cual añade tiempo de configuración y ejecución significativamente mayor.\n\nOpción C: Esta opción invierte el flujo lógico real (Comprehend no \"convierte entidades a texto\"; extrae entidades de texto) y añade un paso adicional innecesario respecto a usar Comprehend directamente sobre el PDF, aumentando el tiempo total del proceso.\n\nOpción D: Amazon A2I añade un flujo de revisión humana (human-in-the-loop) sobre los resultados de Textract, lo cual introduce latencia adicional por diseño (espera de revisión humana), por lo que no es la opción más rápida.\n\nReferencias:\nhttps://docs.aws.amazon.com/comprehend/latest/dg/idp-inputs-sync.html\nhttps://docs.aws.amazon.com/comprehend/latest/dg/idp.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20107,
    "questionNumber": 107,
    "question": "A company shares Amazon SageMaker Studio notebooks that are accessible through a VPN. The company must enforce access controls to prevent malicious actors from exploiting presigned URLs to access the notebooks. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up Studio client IP validation by using the aws:sourceIp IAM policy condition.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Set up Studio client VPC validation by using the aws:sourceVpc IAM policy condition.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Set up Studio client role endpoint validation by using the aws:PrimaryTag IAM policy condition.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Set up Studio client user endpoint validation by using the aws:PrincipalTag IAM policy condition.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): La documentación y las mejores prácticas de administración de SageMaker Studio describen explícitamente el uso de la clave de condición IAM aws:SourceIp para restringir el acceso a Studio (incluida la generación y el uso de la URL prefirmada por CreatePresignedDomainUrl) a un rango de IP aprobado, típicamente el rango de salida de la VPN corporativa. Esta condición se aplica tanto a la llamada de API que genera la URL como al uso posterior de esa URL, evitando que un actor malicioso fuera del rango de IP autorizado la reutilice.\n\nOpción B: aws:sourceVpc valida que la solicitud proceda de un endpoint de VPC específico, lo cual es útil para el acceso a través de un VPC endpoint, no para el escenario descrito de acceso mediante VPN con un rango de IP conocido; además, según la documentación, esta condición generalmente se combina con aws:SourceVpce (endpoint de VPC), no es la técnica recomendada para restringir por rango de IP de VPN.\n\nOpción C: aws:PrimaryTag no es una clave de condición IAM global válida reconocida para este propósito.\n\nOpción D: aws:PrincipalTag valida etiquetas del principal de IAM (usuario/rol), no la ubicación de red del cliente, por lo que no soluciona el problema de exploit de URLs prefirmadas fuera de la red autorizada.\n\nReferencias:\nhttps://docs.aws.amazon.com/whitepapers/latest/sagemaker-studio-admin-best-practices/permissions-management.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/security_iam_id-based-policy-examples.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20108,
    "questionNumber": 108,
    "question": "An ML engineer needs to merge and transform data from two sources to retrain an existing ML model. One data source consists of .csv files that are stored in an Amazon S3 bucket. Each .csv file consists of millions of records. The other data source is an Amazon Aurora DB cluster. The result of the merge process must be written to a second S3 bucket. The ML engineer needs to perform this merge-and-transform task every week. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a transient Amazon EMR cluster every week. Use the cluster to run an Apache Spark job to merge and transform the data.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a weekly AWS Glue job that uses the Apache Spark engine. Use DynamicFrame native operations to merge and transform the data.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an AWS Lambda function that runs Apache Spark code every week to merge and transform the data. Configure the Lambda function to connect to the initial S3 bucket and the DB cluster.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Batch job that runs Apache Spark code on Amazon EC2 instances every week. Configure the Spark code to save the data from the EC2 instances to the second S3 bucket.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Aprovisionar y desaprovisionar manualmente un clúster EMR transitorio cada semana implica gestionar infraestructura, versiones de Spark, escalado y configuración de red, lo cual añade una carga operativa considerablemente mayor que un servicio ETL totalmente administrado.\n\nOpción B (Correcta): AWS Glue es un servicio ETL serverless que ejecuta internamente Apache Spark y ofrece operaciones nativas sobre DynamicFrame (join, union, merge) diseñadas específicamente para combinar y transformar datos de múltiples orígenes (S3, Aurora vía conexión JDBC) sin gestionar clústeres, sin necesidad de aprovisionar servidores y con integración nativa mediante triggers/schedulers semanales. Es la opción con menor sobrecarga operativa.\n\nOpción C: AWS Lambda tiene límites estrictos de tiempo de ejecución (15 minutos) y memoria que la hacen inadecuada para ejecutar trabajos Spark sobre millones de registros; además requeriría empaquetar manualmente un runtime Spark, lo que es poco práctico y con mucho esfuerzo operativo.\n\nOpción D: AWS Batch sobre instancias EC2 con código Spark personalizado exige gestionar imágenes de contenedor, colas de trabajos y aprovisionamiento de instancias EC2, lo que implica más gestión de infraestructura que un job de Glue nativo.\n\nReferencias:\nhttps://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-crawler-pyspark-extensions-dynamic-frame.html\nhttps://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-visual-job-api.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20109,
    "questionNumber": 109,
    "question": "An ML engineer has deployed an Amazon SageMaker model to a serverless endpoint in production. The model is invoked by the InvokeEndpoint API operation. The model's latency in production is higher than the baseline latency in the test environment. The ML engineer thinks that the increase in latency is because of model startup time. What should the ML engineer do to confirm or deny this hypothesis?",
    "choices": [
      {
        "letter": "A",
        "text": "Schedule a SageMaker Model Monitor job. Observe metrics about model quality.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Schedule a SageMaker Model Monitor job with Amazon CloudWatch metrics enabled.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Enable Amazon CloudWatch metrics. Observe the ModelSetupTime metric in the SageMaker namespace.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Enable Amazon CloudWatch metrics. Observe the ModelLoadingWaitTime metric in the SageMaker namespace.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: SageMaker Model Monitor evalúa calidad de datos/modelo (drift), no mide latencia de arranque del entorno de cómputo, por lo que no confirma ni descarta la hipótesis de tiempo de arranque.\n\nOpción B: Igual que la anterior, Model Monitor está orientado a calidad de datos/modelo, no a métricas de latencia de infraestructura; habilitar CloudWatch en un job de Model Monitor no expone la métrica de arranque del contenedor.\n\nOpción C (Correcta): Según la documentación oficial de CloudWatch para SageMaker, la métrica `ModelSetupTime` se define exactamente como \"el tiempo que se tarda en lanzar nuevos recursos de cómputo para un endpoint sin servidor (serverless), que puede variar según el tamaño del modelo, el tiempo de descarga del modelo y el tiempo de arranque del contenedor\". Esta métrica pertenece al conjunto de métricas de invocación de endpoint (`SageMaker AI endpoint invocation metrics`) y está explícitamente publicada para endpoints serverless, siendo la métrica correcta para confirmar si la mayor latencia se debe al tiempo de arranque del modelo.\n\nOpción D: `ModelLoadingWaitTime` está documentada dentro de las \"SageMaker AI multi-model endpoint metrics\" (métricas específicas de endpoints multi-modelo) y mide el tiempo de espera de una invocación para que el modelo objetivo se descargue/cargue en un endpoint multi-modelo. No es una métrica publicada para endpoints serverless, por lo que no aplica al escenario descrito (el escenario es un endpoint serverless, no multi-modelo). La respuesta comunitaria más votada (D) es incorrecta según la documentación oficial de AWS.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints-monitoring.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/monitoring-cloudwatch.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20110,
    "questionNumber": 110,
    "question": "An ML engineer needs to ensure that a dataset complies with regulations for personally identifiable information (PII). The ML engineer will use the data to train an ML model on Amazon SageMaker instances. SageMaker must not use any of the PII. Which solution will meet these requirements in the MOST operationally efficient way?",
    "choices": [
      {
        "letter": "A",
        "text": "Use the Amazon Comprehend DetectPiiEntities API call to redact the PII from the data. Store the data in an Amazon S3 bucket. Access the S3 bucket from the SageMaker instances for model training.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use the Amazon Comprehend DetectPiiEntities API call to redact the PII from the data. Store the data in an Amazon Elastic File System (Amazon EFS) file system. Mount the EFS file system to the SageMaker instances for model training.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Glue DataBrew to cleanse the dataset of PII. Store the data in an Amazon Elastic File System (Amazon EFS) file system. Mount the EFS file system to the SageMaker instances for model training.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon Macie for automatic discovery of PII in the data. Remove the PII. Store the data in an Amazon S3 bucket. Mount the S3 bucket to the SageMaker instances for model training.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Amazon Comprehend DetectPiiEntities es una API totalmente administrada que detecta y permite redactar directamente la información de identificación personal en el texto. Amazon S3 es el mecanismo de acceso a datos de entrenamiento más simple y nativo de SageMaker (no requiere aprovisionar ni montar sistemas de archivos adicionales), por lo que esta combinación logra el objetivo con la menor infraestructura y el menor esfuerzo operativo.\n\nOpción B: Aunque también usa DetectPiiEntities correctamente, requiere aprovisionar y montar un sistema de archivos EFS (incluyendo configuración de VPC y puntos de montaje), lo que añade infraestructura y operación adicional innecesaria frente a usar S3 directamente.\n\nOpción C: AWS Glue DataBrew puede limpiar datos, pero no está especializado en la detección de PII con la misma cobertura que Comprehend; además, igual que la opción B, añade la sobrecarga operativa de gestionar un sistema de archivos EFS en lugar de usar S3 de forma nativa.\n\nOpción D: Amazon Macie es un servicio de descubrimiento (genera hallazgos), no de eliminación/redacción de datos; requeriría un paso de procesamiento adicional para efectivamente eliminar la PII detectada, lo que añade complejidad operativa comparada con la redacción directa vía DetectPiiEntities.\n\nReferencias:\nhttps://docs.aws.amazon.com/comprehend/latest/dg/pii.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data-best-practices.html\nhttps://docs.aws.amazon.com/macie/latest/user/mdis-reference-pii.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20111,
    "questionNumber": 111,
    "question": "A company must install a custom script on any newly created Amazon SageMaker notebook instances. Which solution will meet this requirement with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a lifecycle configuration script to install the custom script when a new SageMaker notebook is created. Attach the lifecycle configuration to every new SageMaker notebook as part of the creation steps.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a custom Amazon Elastic Container Registry (Amazon ECR) image that contains the custom script. Push the ECR image to a Docker registry. Attach the Docker image to a SageMaker Studio domain. Select the kernel to run as part of the SageMaker notebook.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a custom package index repository. Use AWS CodeArtifact to manage the installation of the custom script. Set up AWS PrivateLink endpoints to connect CodeArtifact to the SageMaker instance. Install the script.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Store the custom script in Amazon S3. Create an AWS Lambda function to install the custom script on new SageMaker notebooks. Configure Amazon EventBridge to invoke the Lambda function when a new SageMaker notebook is initialized.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Las lifecycle configuration scripts (LCC) de SageMaker son la funcionalidad nativa diseñada específicamente para ejecutar scripts personalizados automáticamente en el momento de creación o inicio de una instancia de notebook, sin requerir infraestructura adicional (contenedores, repositorios, funciones Lambda). Es la solución con menor esfuerzo operativo.\n\nOpción B: Requiere construir, versionar y mantener una imagen de contenedor personalizada en ECR, además de gestionarla dentro de un dominio de SageMaker Studio, lo cual implica más overhead que un simple script de lifecycle.\n\nOpción C: Configurar un repositorio de paquetes en CodeArtifact junto con endpoints de AWS PrivateLink añade una complejidad de red y de gestión de artefactos innecesaria para simplemente instalar un script.\n\nOpción D: Requiere construir y mantener una función Lambda personalizada más una regla de EventBridge para detectar la creación de notebooks, una solución mucho más compleja que usar la funcionalidad nativa de lifecycle configuration.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/notebook-lifecycle-config.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/notebook-lifecycle-config-create.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20112,
    "questionNumber": 112,
    "question": "A company is building a real-time data processing pipeline for an ecommerce application. The application generates a high volume of clickstream data that must be ingested, processed, and visualized in near real time. The company needs a solution that supports SQL for data processing and Jupyter notebooks for interactive analysis. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Data Firehose to ingest the data. Create an AWS Lambda function to process the data. Store the processed data in Amazon S3. Use Amazon QuickSight to visualize the data.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon Kinesis Data Streams to ingest the data. Use Amazon Data Firehose to transform the data. Use Amazon Athena to process the data. Use Amazon QuickSight to visualize the data.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use Amazon Managed Streaming for Apache Kafka (Amazon MSK) to ingest the data. Use AWS Glue with PySpark to process the data. Store the processed data in Amazon S3. Use Amazon QuickSight to visualize the data.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon Managed Streaming for Apache Kafka (Amazon MSK) to ingest the data. Use Amazon Managed Service for Apache Flink to process the data. Use the built-in Flink dashboard to visualize the data.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: No incluye ningún componente con soporte SQL para el procesamiento (una función Lambda ejecuta código general, no SQL) ni notebooks tipo Jupyter para análisis interactivo, por lo que no cumple los dos requisitos explícitos.\n\nOpción B (Correcta): Amazon Athena es, por diseño, un servicio de consultas basado en SQL estándar sobre datos en S3, cumpliendo el requisito de \"SQL para procesamiento de datos\". Además, Athena ofrece de forma nativa un editor de notebooks compatible con Jupyter (\"Jupyter compatible notebooks on Athena\", basado en Apache Spark) para análisis interactivo, cumpliendo el segundo requisito. Kinesis Data Streams aporta la ingesta en tiempo real y Firehose entrega/transforma los datos hacia el almacén consultable por Athena, cerrando el pipeline casi en tiempo real solicitado.\n\nOpción C: AWS Glue con PySpark procesa datos mediante transformaciones de Spark (DataFrames/DynamicFrames), no mediante SQL de forma nativa en la descripción de la opción, y aunque Glue ofrece notebooks Jupyter-compatibles para sesiones interactivas, el enunciado de la opción no menciona uso de SQL, por lo que Athena (opción B) se ajusta mejor a ambos requisitos explícitos.\n\nOpción D: Amazon Managed Service for Apache Flink admite Flink SQL para el procesamiento en streaming, pero sus notebooks Studio (cuando existen) están basados en Apache Zeppelin, no en Jupyter; además la opción especifica el uso del \"panel de Flink integrado\" para visualización, sin mencionar notebooks Jupyter en ningún punto, incumpliendo ese requisito explícito.\n\nReferencias:\nhttps://docs.aws.amazon.com/athena/latest/ug/notebooks-spark.html\nhttps://docs.aws.amazon.com/athena/latest/ug/notebooks-spark-getting-started.html\nhttps://docs.aws.amazon.com/kinesisanalytics/latest/dev/migrating-to-kda-studio-overview.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20113,
    "questionNumber": 113,
    "question": "A medical company needs to store clinical data. The data includes personally identifiable information (PII) and protected health information (PHI). An ML engineer needs to implement a solution to ensure that the PII and PHI are not used to train ML models. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Store the clinical data in Amazon S3 buckets. Use AWS Glue DataBrew to mask the PII and PHI before the data is used for model training.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Upload the clinical data to an Amazon Redshift database. Use built-in SQL stored procedures to automatically classify and mask the PII and PHI before the data is used for model training.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon Comprehend to detect and mask the PII before the data is used for model training. Use Amazon Comprehend Medical to detect and mask the PHI before the data is used for model training.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an AWS Lambda function to encrypt the PII and PHI. Program the Lambda function to save the encrypted data to an Amazon S3 bucket for model training.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: AWS Glue DataBrew ofrece transformaciones genéricas de limpieza de datos, pero no está especializado en la detección de entidades PHI (información de salud protegida) con la precisión clínica que ofrece un servicio dedicado a ese dominio.\n\nOpción B: Amazon Redshift no incluye de forma nativa procedimientos SQL integrados para clasificar y enmascarar automáticamente PII/PHI; esto requeriría desarrollo manual de lógica de detección, careciendo de un mecanismo administrado equivalente.\n\nOpción C (Correcta): Amazon Comprehend detecta y permite redactar PII genérica (nombres, números de cuenta, direcciones, etc.) mediante su capacidad de detección de PII, mientras que Amazon Comprehend Medical está diseñado específicamente para detectar entidades de información de salud protegida (PHI) en texto clínico no estructurado. Usar ambos servicios de forma combinada cubre exactamente los dos tipos de datos sensibles mencionados (PII y PHI) con servicios administrados y preentrenados para cada dominio.\n\nOpción D: Cifrar los datos (en lugar de enmascararlos o eliminarlos) no impide que la PII/PHI sea utilizada por el modelo durante el entrenamiento, ya que el modelo seguiría teniendo acceso a los datos descifrados en el momento de leer el archivo; el cifrado protege datos en reposo/tránsito, no evita su uso en el entrenamiento.\n\nReferencias:\nhttps://docs.aws.amazon.com/comprehend/latest/dg/pii.html\nhttps://docs.aws.amazon.com/comprehend-medical/latest/dev/comprehendmedical-welcome.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20114,
    "questionNumber": 114,
    "question": "An ML engineer is developing a classification model. The ML engineer needs to use custom libraries in processing jobs, training jobs, and pipelines in Amazon SageMaker. Which solution will provide this functionality with the LEAST implementation effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Manually install the libraries in the SageMaker containers.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Build a custom Docker container that includes the required libraries. Host the container in Amazon Elastic Container Registry (Amazon ECR). Use the ECR image in the SageMaker jobs and pipelines.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a SageMaker notebook instance to host the jobs. Create an AWS Lambda function to install the libraries on the notebook instance when the notebook instance starts. Configure the SageMaker jobs and pipelines to run on the notebook instance.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Run code for the libraries externally on Amazon EC2 instances. Store the results in Amazon S3. Import the results into the SageMaker jobs and pipelines.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: La instalación manual de librerías en cada ejecución de contenedor no es persistente ni reutilizable entre distintos jobs y pipelines; habría que repetir la instalación en cada nueva ejecución de cada job, lo que implica mayor esfuerzo repetido.\n\nOpción B (Correcta): AWS documenta el patrón de \"Bring Your Own Container\" (traer tu propio contenedor) para SageMaker Processing y Training: se construye una imagen Docker que ya incluye todas las librerías personalizadas necesarias, se publica en Amazon ECR y se referencia esa imagen en los distintos jobs y pipelines de SageMaker. Es un esfuerzo de implementación único (construir la imagen una vez) que luego se reutiliza de forma consistente en todos los jobs y pipelines, siendo la solución con menor esfuerzo total de implementación.\n\nOpción C: Los jobs y pipelines de procesamiento/entrenamiento de SageMaker no se ejecutan \"sobre\" una instancia de notebook; esta arquitectura no es coherente con cómo funcionan realmente Processing Jobs, Training Jobs y Pipelines, y añadiría una capa de complejidad (Lambda personalizada) innecesaria.\n\nOpción D: Ejecutar las librerías externamente en EC2 y luego importar resultados a SageMaker fragmenta el flujo de trabajo, incrementando la complejidad operativa y la latencia entre pasos.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/build-your-own-processing-container.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/use-your-own-processing-code.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20115,
    "questionNumber": 115,
    "question": "An ML engineer is deploying a trained model to an Amazon SageMaker endpoint. The ML engineer needs to receive alerts when data quality issues occur in production. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure an Amazon CloudWatch metric alarm and a corresponding action to send an Amazon Simple Notification Service (Amazon SNS) notification.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Integrate the SageMaker endpoint with a SageMaker Clarify processing job. Configure an Amazon CloudWatch alarm to provide alerts.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure a monitoring job in SageMaker Model Monitor. Integrate Model Monitor with Amazon CloudWatch to provide alerts.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure a data flow in SageMaker Data Wrangler. Integrate Data Wrangler with Amazon CloudWatch to provide alerts.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Un CloudWatch metric alarm por sí solo no evalúa la calidad de los datos que llegan al endpoint; necesita una fuente de métricas de calidad de datos que solo un job de monitorización (como Model Monitor) puede generar.\n\nOpción B: SageMaker Clarify se enfoca en explicabilidad y detección de sesgo (bias) del modelo, no en monitorización continua de calidad de datos en producción; el componente diseñado específicamente para monitorizar drift/calidad de datos en producción es Model Monitor, no Clarify de forma aislada.\n\nOpción C (Correcta): Amazon SageMaker Model Monitor es el servicio diseñado específicamente para programar jobs de monitorización de calidad de datos (data quality monitoring) sobre un endpoint en producción, detectando desviaciones respecto a un baseline. Model Monitor se integra de forma nativa con Amazon CloudWatch, permitiendo configurar alarmas y notificaciones automáticas cuando se detectan violaciones de calidad de datos, cumpliendo exactamente el requisito planteado.\n\nOpción D: SageMaker Data Wrangler es una herramienta de preparación y transformación de datos previa al entrenamiento, no un mecanismo de monitorización continua de un endpoint en producción.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-model-monitor.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-model-quality-metrics.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20116,
    "questionNumber": 116,
    "question": "A company needs to use Amazon SageMaker to train a model on more than 300 GB of data. The training data is composed of files that are 200 MB in size. The data is stored in Amazon S3 Standard storage and feeds a dashboard tool. Which SageMaker training ingestion mechanism is the MOST cost-effective solution for this scenario?",
    "choices": [
      {
        "letter": "A",
        "text": "Amazon Elastic File System (Amazon EFS) file system",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Amazon FSx for Lustre file system",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Amazon S3 in fast file mode while using S3 Express One Zone",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Amazon S3 in fast file mode without using S3 Express One Zone",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Amazon EFS solo se recomienda cuando los datos ya residen ahí (por ejemplo, por un pipeline de preprocesamiento previo); migrar 300+ GB desde S3 a EFS añadiría coste y complejidad de aprovisionamiento innecesarios cuando los datos ya están en S3.\n\nOpción B: Amazon FSx for Lustre se recomienda cuando el dataset es demasiado grande para el modo file, tiene muchos archivos pequeños difíciles de serializar, o usa lectura aleatoria; implica coste y tiempo de arranque (cold start) por crear y conectar un sistema de archivos, lo que no es necesario aquí dado que los archivos ya son de 200 MB (por encima del umbral de 50 MB recomendado para fast file mode).\n\nOpción C: Amazon S3 Express One Zone es una clase de almacenamiento de alto rendimiento en una única zona de disponibilidad pensada para casos de latencia ultrasensibles; usarla implicaría copiar o almacenar los datos en esa clase de almacenamiento (con mayor coste) cuando los datos ya residen en S3 Standard y no hay un requisito de latencia extrema, lo que la hace menos costo-efectiva que usar fast file mode directamente sobre S3 Standard.\n\nOpción D (Correcta): Según la guía oficial \"Choosing an input mode and a storage unit\", para conjuntos de datos grandes con archivos de más de 50 MB (aquí 200 MB), fast file mode es la opción recomendada porque transmite los datos directamente desde S3 sin necesidad de crear sistemas de archivos adicionales (ni EFS ni FSx for Lustre) y sin incurrir en los costes de almacenamiento premium de S3 Express One Zone, siendo la opción más simple y económica que cumple el rendimiento necesario.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data-best-practices.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20117,
    "questionNumber": 117,
    "question": "A company has an ML model that is deployed to an Amazon SageMaker endpoint for real-time inference. The company needs to deploy a new model. The company must compare the new model's performance to the currently deployed model's performance before shifting all traffic to the new model. Which solution will meet these requirements with the LEAST operational effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy the new model to a separate endpoint. Manually split traffic between the two endpoints.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy the new model to a separate endpoint. Use Amazon CloudFront to distribute traffic between the two endpoints.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy the new model as a shadow variant on the same endpoint as the current model. Route a portion of live traffic to the shadow model for evaluation.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use AWS Lambda functions with custom logic to route traffic between the current model and the new model.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Requiere crear un segundo endpoint independiente y desarrollar/gestionar manualmente la lógica de división de tráfico entre ambos, lo cual implica más infraestructura y esfuerzo operativo que una funcionalidad nativa.\n\nOpción B: Usar Amazon CloudFront para repartir tráfico entre dos endpoints de SageMaker no es un patrón soportado ni documentado para este propósito; añadiría complejidad de configuración de una CDN sin necesidad.\n\nOpción C (Correcta): Amazon SageMaker Shadow Testing (pruebas en modo sombra) es una funcionalidad nativa que permite desplegar una nueva variante de modelo (\"shadow variant\") en el mismo endpoint que el modelo de producción, replicando una porción configurable del tráfico real en vivo hacia la variante sombra para comparar métricas operativas (latencia, tasa de error, etc.) sin afectar las respuestas devueltas a los clientes. Es la solución con menor esfuerzo operativo porque no requiere infraestructura nueva ni lógica de enrutamiento personalizada; todo se gestiona desde la consola/API de SageMaker.\n\nOpción D: Implementar lógica de enrutamiento personalizada con funciones Lambda exige desarrollo y mantenimiento de código propio para dividir el tráfico, mucho más esfuerzo que usar la característica nativa de shadow testing.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests-create.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-shadow-deployment.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20118,
    "questionNumber": 118,
    "question": "A company runs an ML model on Amazon SageMaker. The company uses an automatic process that makes API calls to create training jobs for the model. The company has new compliance rules that prohibit the collection of aggregated metadata from training jobs. Which solution will prevent SageMaker from collecting metadata from the training jobs?",
    "choices": [
      {
        "letter": "A",
        "text": "Opt out of metadata tracking for any training job that is submitted.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Ensure that training jobs are running in a private subnet in a custom VPC.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Encrypt the training data with an AWS Key Management Service (AWS KMS) customer managed key.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Reconfigure the training jobs to use only AWS Nitro instances.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): AWS documenta explícitamente un mecanismo de \"Data Privacy in Amazon SageMaker AI\" para optar por no participar (\"opt out\") de la recopilación de metadatos de entrenamiento, mediante la variable de entorno `OPT_OUT_TRACKING=1` (configurable vía Boto3, AWS CLI, SDK de Python de SageMaker, o a nivel de cuenta). Esta es la funcionalidad diseñada específicamente para este requisito de cumplimiento.\n\nOpción B: Ejecutar los jobs en una subred privada dentro de una VPC personalizada controla el aislamiento de red del tráfico, pero no impide que SageMaker recopile telemetría/metadatos agregados de uso del job en sí.\n\nOpción C: Cifrar los datos de entrenamiento con una clave KMS gestionada por el cliente protege la confidencialidad de los datos en reposo, pero no evita la recopilación de metadatos agregados sobre el propio job de entrenamiento.\n\nOpción D: El uso de instancias con AWS Nitro afecta al aislamiento de hardware/hipervisor de la instancia, no a la telemetría de metadatos que SageMaker recopila sobre los jobs de entrenamiento.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-privacy.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  }
];
