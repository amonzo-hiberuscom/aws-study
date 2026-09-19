import { Question } from '../../types';

export const QUESTIONS_PART_1: Question[] = [
  {
    "id": 20001,
    "questionNumber": 1,
    "question": "Case Study - A company is building a web-based AI application by using Amazon SageMaker. The application will provide the following capabilities and features: ML experimentation, training, a central model registry, model deployment, and model monitoring. The application must ensure secure and isolated use of training data during the ML lifecycle. The training data is stored in Amazon S3. The company needs to use the central model registry to manage different versions of models in the application. Which action will meet this requirement with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a separate Amazon Elastic Container Registry (Amazon ECR) repository for each model.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon Elastic Container Registry (Amazon ECR) and unique tags for each model version.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the SageMaker Model Registry and model groups to catalog the models.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use the SageMaker Model Registry and unique tags for each model version.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Crear un repositorio ECR por modelo no resuelve el catálogo de versiones de modelos ML; Amazon ECR almacena imágenes de contenedor, no artefactos ni metadatos de modelos de SageMaker, por lo que requeriría gestión manual adicional para versionado y no ofrece funciones nativas de aprobación/linaje.\n\nOpción B: Usar ECR con tags únicos por versión tiene el mismo problema que A: ECR no es un catálogo de modelos ML, solo de imágenes; mantener el versionado a través de tags de imagen implica overhead operativo (convenciones de nombres manuales, sin metadatos de modelo, sin aprobación integrada).\n\nOpción C (Correcta): El SageMaker Model Registry organiza los modelos en 'Model Groups', un contenedor que agrupa distintas versiones de un mismo modelo entrenado para resolver un problema concreto. Cada versión (Model Package) dentro de un grupo se numera automáticamente y lleva metadatos (métricas, linaje, estado de aprobación), lo que da un catálogo central de versiones con el mínimo esfuerzo operativo, ya que es una funcionalidad nativa de SageMaker y no requiere infraestructura ni convenciones adicionales.\n\nOpción D: Usar tags únicos dentro del propio Model Registry en lugar de Model Groups no aprovecha el mecanismo nativo de versionado por grupos; obligaría a diseñar y mantener manualmente un esquema de tags para relacionar versiones, aumentando el overhead operativo frente a usar Model Groups, que ya proveen esa jerarquía por defecto.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-models.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-view.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-model-group.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20002,
    "questionNumber": 2,
    "question": "Case Study - A company is building a web-based AI application by using Amazon SageMaker. The application will provide the following capabilities and features: ML experimentation, training, a central model registry, model deployment, and model monitoring. The application must ensure secure and isolated use of training data during the ML lifecycle. The training data is stored in Amazon S3. The company is experimenting with consecutive training jobs. How can the company MINIMIZE infrastructure startup times for these jobs?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Managed Spot Training.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use SageMaker managed warm pools.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use SageMaker Training Compiler.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use the SageMaker distributed data parallelism (SMDDP) library.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Managed Spot Training reduce el COSTE de entrenamiento usando instancias Spot con posibles interrupciones, pero no reduce el tiempo de arranque de la infraestructura entre trabajos; de hecho las instancias Spot pueden tardar más en aprovisionarse y sufrir interrupciones.\n\nOpción B (Correcta): SageMaker managed warm pools mantiene la infraestructura de entrenamiento (instancias) en estado retenido durante un periodo configurable después de finalizar un job, de modo que un trabajo de entrenamiento posterior con la misma configuración de recursos puede reutilizar ese pool y arrancar mucho más rápido, evitando el tiempo de aprovisionamiento de instancias nuevas. Esto es exactamente lo que se necesita para experimentación con trabajos de entrenamiento consecutivos.\n\nOpción C: SageMaker Training Compiler optimiza el grafo de computación para acelerar el ENTRENAMIENTO en sí (menor tiempo de cómputo en GPU), no el tiempo de arranque/aprovisionamiento de la infraestructura.\n\nOpción D: La librería SMDDP optimiza la comunicación entre nodos en entrenamiento distribuido para acelerar el entrenamiento en múltiples GPUs/instancias, pero no está relacionada con el tiempo de arranque de infraestructura entre jobs.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/train-warm-pools.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/train-warm-pools-how-to-use.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20003,
    "questionNumber": 3,
    "question": "Case Study - A company is building a web-based AI application by using Amazon SageMaker. The application will provide the following capabilities and features: ML experimentation, training, a central model registry, model deployment, and model monitoring. The application must ensure secure and isolated use of training data during the ML lifecycle. The training data is stored in Amazon S3. The company must implement a manual approval-based workflow to ensure that only approved models can be deployed to production endpoints. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Use SageMaker Experiments to facilitate the approval process during model registration.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use SageMaker ML Lineage Tracking on the central model registry. Create tracking entities for the approval process.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use SageMaker Model Monitor to evaluate the performance of the model and to manage the approval.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use SageMaker Pipelines. When a model version is registered, use the AWS SDK to change the approval status to \"Approved.\"",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: SageMaker Experiments sirve para organizar y comparar ejecuciones/métricas de experimentos (trials), no para implementar un flujo de aprobación de despliegue de modelos.\n\nOpción B: SageMaker ML Lineage Tracking crea y consulta entidades de linaje (de dónde viene un artefacto, qué datos/código lo generaron), útil para trazabilidad y auditoría, pero no implementa un mecanismo de aprobación que bloquee o permita el despliegue.\n\nOpción C: SageMaker Model Monitor evalúa la calidad/desviación de un modelo YA desplegado (drift, calidad de datos), no gestiona un flujo de aprobación antes del despliegue.\n\nOpción D (Correcta): El SageMaker Model Registry asigna a cada versión de modelo registrada un estado de aprobación (PendingManualApproval por defecto, modificable a Approved o Rejected). La documentación oficial indica explícitamente que se puede automatizar este proceso escribiendo código (por ejemplo con el SDK/boto3 update_model_package) que cambia el estado de aprobación en función de una evaluación, y que las plantillas de proyecto MLOps de SageMaker Projects usan reglas de EventBridge para desplegar automáticamente el modelo cuando se aprueba. Integrado en SageMaker Pipelines mediante un paso RegisterModel, este es el mecanismo estándar de AWS para forzar que solo modelos aprobados lleguen a producción.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-approve.html\nhttps://docs.aws.amazon.com/sagemaker/latest/APIReference/API_UpdateModelPackage.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-projects-templates.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20004,
    "questionNumber": 4,
    "question": "Case Study - A company is building a web-based AI application by using Amazon SageMaker. The application will provide the following capabilities and features: ML experimentation, training, a central model registry, model deployment, and model monitoring. The application must ensure secure and isolated use of training data during the ML lifecycle. The training data is stored in Amazon S3. The company needs to run an on-demand workflow to monitor bias drift for models that are deployed to real-time endpoints from the application. Which action will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the application to invoke an AWS Lambda function that runs a SageMaker Clarify job.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Invoke an AWS Lambda function to pull the sagemaker-model-monitor-analyzer built-in SageMaker image.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Glue Data Quality to monitor bias.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use SageMaker notebooks to compare the bias.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Para ejecutar un análisis de sesgo (bias) 'on-demand' (a petición, no en un calendario fijo), se lanza un SageMaker Clarify Processing Job (por ejemplo mediante SageMakerClarifyProcessor.run_bias()), y este job puede iniciarse desde una función AWS Lambda invocada por la propia aplicación cuando se necesite, sin depender de un Model Monitor con calendario fijo. Esto encaja con el requisito de un flujo a demanda. Nota: la documentación actual de AWS indica que SageMaker Clarify ya no está disponible para nuevos clientes (se está sustituyendo por soluciones de referencia de monitorización basadas en Lambda, EventBridge, Athena y QuickSight), pero el mecanismo técnico descrito en la opción -una Lambda que ejecuta un job de análisis de sesgo- sigue siendo el patrón correcto tanto en Clarify como en su sustituto.\n\nOpción B: No existe una imagen 'sagemaker-model-monitor-analyzer' pensada para ejecutarse manualmente vía Lambda como mecanismo de análisis de sesgo a demanda; esa es la imagen que usa Model Monitor internamente en sus jobs programados, no un flujo on-demand expuesto para uso directo por Lambda.\n\nOpción C: AWS Glue Data Quality evalúa reglas de calidad de datos (nulos, tipos, rangos, duplicados) en pipelines de datos, pero no calcula métricas de sesgo (bias) de modelos ML como disparate impact o difference in positive proportions.\n\nOpción D: Los notebooks de SageMaker permiten análisis exploratorio manual, pero no constituyen un workflow automatizado e invocable on-demand por la aplicación, y no escalan como solución de producción.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-availability-change.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-processing-job-run.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-monitor-bias-drift.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20005,
    "questionNumber": 5,
    "question": "HOTSPOT - A company stores historical data in .csv files in Amazon S3. Only some of the rows and columns in the .csv files are populated. The columns are not labeled. An ML engineer needs to prepare and store the data so that the company can use the data to train ML models. Select and order the correct steps from the following list to perform this task. Each step should be selected one time or not at all. (Select and order three.) • Create an Amazon SageMaker batch transform job for data cleaning and feature engineering. • Store the resulting data back in Amazon S3. • Use Amazon Athena to infer the schemas and available columns. • Use AWS Glue crawlers to infer the schemas and available columns. • Use AWS Glue DataBrew for data cleaning and feature engineering.",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon SageMaker batch transform job for data cleaning and feature engineering.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Store the resulting data back in Amazon S3.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use Amazon Athena to infer the schemas and available columns.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Glue crawlers to infer the schemas and available columns.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Use AWS Glue DataBrew for data cleaning and feature engineering.",
        "isCorrect": true
      }
    ],
    "comments": "Los datos son .csv sin cabecera y con huecos, por lo que primero hay que INFERIR el esquema/columnas antes de poder limpiarlos.\n\nOpción A: Incorrecta. El batch transform de SageMaker se usa para ejecutar INFERENCIA por lotes con un modelo ya entrenado, no para limpieza de datos ni feature engineering.\n\nOpción B (Correcta, paso 3 - último): Tras limpiar y transformar los datos, el resultado debe guardarse en S3 para que pueda usarse en el entrenamiento de modelos ML.\n\nOpción C: Incorrecta como paso de inferencia de esquema en este flujo; Athena consulta datos ya catalogados (usa el AWS Glue Data Catalog), pero no es la herramienta diseñada para el descubrimiento/inferencia inicial del esquema de datos crudos sin catalogar; ese es el rol de los crawlers de Glue.\n\nOpción D (Correcta, paso 1): Los Glue crawlers escanean el origen de datos (aquí, los .csv en S3), infieren el esquema (columnas, tipos) y crean/actualizan tablas en el AWS Glue Data Catalog automáticamente, sin necesidad de código. Es el primer paso lógico dado que las columnas no están etiquetadas.\n\nOpción E (Correcta, paso 2): AWS Glue DataBrew es una herramienta visual de preparación de datos (sin código) que permite limpiar valores nulos/incorrectos y crear features a partir de las columnas ya identificadas por el crawler.\n\nOrden correcto: D (Glue crawlers infieren el esquema) → E (Glue DataBrew limpia y transforma los datos) → B (se almacena el resultado en S3).\n\nReferencias:\nhttps://docs.aws.amazon.com/glue/latest/dg/tutorial-add-crawler.html\nhttps://docs.aws.amazon.com/glue/latest/dg/machine-learning-transform-tutorial.html\nhttps://docs.aws.amazon.com/databrew/latest/dg/recipe-actions-reference.html",
    "category": "Data Preparation",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 20006,
    "questionNumber": 6,
    "question": "HOTSPOT - An ML engineer needs to use Amazon SageMaker Feature Store to create and manage features to train a model. Select and order the steps from the following list to create and use the features in Feature Store. Each step should be selected one time. (Select and order three.) • Access the store to build datasets for training. • Create a feature group. • Ingest the records.",
    "choices": [
      {
        "letter": "A",
        "text": "Access the store to build datasets for training.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a feature group.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Ingest the records.",
        "isCorrect": true
      }
    ],
    "comments": "Opción B - 'Create a feature group' (Correcta, paso 1): Antes de poder almacenar cualquier dato en Feature Store hay que definir un Feature Group, que especifica el esquema (nombres y tipos de las features), el identificador de registro y la columna de tiempo de evento.\n\nOpción C - 'Ingest the records' (Correcta, paso 2): Una vez creado el feature group (vacío), se ingieren los datos reales (registros) en él, por ejemplo mediante el método FeatureGroup.ingest() del SDK de SageMaker, que puede cargar un DataFrame de pandas directamente al feature group.\n\nOpción A - 'Access the store to build datasets for training' (Correcta, paso 3 - último): Solo después de que el feature group exista y contenga registros ingeridos se puede consultar/acceder al Feature Store (por ejemplo mediante Athena sobre el offline store) para construir el dataset de entrenamiento.\n\nOrden correcto: B (crear el feature group) → C (ingerir los registros) → A (acceder al almacén para construir datasets de entrenamiento).\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/feature-store-introduction-notebook.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/feature-store-fraud-detection-notebook.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/feature-store-update-feature-group.html",
    "category": "Data Preparation",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 20007,
    "questionNumber": 7,
    "question": "HOTSPOT - A company wants to host an ML model on Amazon SageMaker. An ML engineer is configuring a continuous integration and continuous delivery (Cl/CD) pipeline in AWS CodePipeline to deploy the model. The pipeline must run automatically when new training data for the model is uploaded to an Amazon S3 bucket. Select and order the pipeline's correct steps from the following list. Each step should be selected one time or not at all. (Select and order three.) • An S3 event notification invokes the pipeline when new data is uploaded. • S3 Lifecycle rule invokes the pipeline when new data is uploaded. • SageMaker retrains the model by using the data in the S3 bucket. • The pipeline deploys the model to a SageMaker endpoint. • The pipeline deploys the model to SageMaker Model Registry.",
    "choices": [
      {
        "letter": "A",
        "text": "An S3 event notification invokes the pipeline when new data is uploaded.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "S3 Lifecycle rule invokes the pipeline when new data is uploaded.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "SageMaker retrains the model by using the data in the S3 bucket.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "The pipeline deploys the model to a SageMaker endpoint.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "The pipeline deploys the model to SageMaker Model Registry.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A (Correcta, paso 1): Amazon S3 puede emitir notificaciones de eventos cuando se crea un nuevo objeto, y esas notificaciones pueden usarse para iniciar automáticamente una ejecución de AWS CodePipeline; esto satisface el requisito de que el pipeline se ejecute automáticamente cuando se sube nueva data de entrenamiento.\n\nOpción B: Incorrecta; las reglas de ciclo de vida (Lifecycle) de S3 sirven para transicionar objetos entre clases de almacenamiento o expirarlos/eliminarlos automáticamente según su antigüedad, NO para invocar pipelines cuando llegan datos nuevos; ese mecanismo de disparo por evento corresponde a las notificaciones de eventos de S3, no al Lifecycle.\n\nOpción C (Correcta, paso 2): Tras ser invocado, el pipeline ejecuta el (re)entrenamiento del modelo con SageMaker usando los datos recién subidos.\n\nOpción D: Aunque el despliegue final a un endpoint sí ocurre en el ciclo de vida MLOps completo, la práctica recomendada por AWS (plantillas de proyecto SageMaker Projects/MLOps) separa el pipeline de build/train -disparado automáticamente por cambios en los datos- del pipeline de deploy, que se dispara mediante una regla de EventBridge solo cuando el modelo ha sido aprobado en el Model Registry. Como este pipeline se activa automáticamente por la subida de datos (sin mención de un paso de aprobación), su función es entrenar y registrar el modelo, no desplegarlo directamente a un endpoint de producción sin gobernanza.\n\nOpción E (Correcta, paso 3): Tras el reentrenamiento, el paso estándar de un pipeline de build/train de SageMaker es registrar la nueva versión del modelo en el Model Registry (paso RegisterModel), quedando pendiente de aprobación antes de que un pipeline de despliegue independiente la lleve a un endpoint.\n\nOrden correcto: A (notificación de evento S3) → C (SageMaker reentrena el modelo) → E (el pipeline registra el modelo en el Model Registry).\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/define-pipeline.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-projects-templates.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/build-and-manage-steps-types.html",
    "category": "Deployment & Orchestration",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 20008,
    "questionNumber": 8,
    "question": "HOTSPOT - An ML engineer is building a generative AI application on Amazon Bedrock by using large language models (LLMs). Select the correct generative AI term from the following list for each description. Each term should be selected one time or not at all. (Select three.) • Embedding • Retrieval Augmented Generation (RAG) • Temperature • Token",
    "choices": [
      {
        "letter": "A",
        "text": "Embedding",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Retrieval Augmented Generation (RAG)",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Temperature",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Token",
        "isCorrect": true
      }
    ],
    "comments": "Nota sobre la extracción: el scraping de esta pregunta tipo HOTSPOT (arrastrar y soltar) no capturó las descripciones concretas que había que emparejar con cada término (solo se recuperó la lista de términos candidatos), ya que ese contenido interactivo suele representarse como imagen en ExamTopics. La respuesta se construye con las definiciones oficiales de Amazon Bedrock y el consenso de la discusión.\n\nOpción A - Embedding (Correcta): Se define oficialmente como el proceso de condensar información transformando una entrada en un vector de valores numéricos (embeddings) para comparar la similitud entre distintos objetos usando una representación numérica compartida.\n\nOpción B - Retrieval Augmented Generation (RAG) (Correcta): Técnica de NLP en la que un modelo generativo se condiciona con documentos específicos recuperados de un almacén de datos (por ejemplo, una base de conocimiento de Bedrock), combinando un componente de recuperación (retrieval) y uno de generación.\n\nOpción C - Temperature: Es un parámetro de INFERENCIA (no un concepto de arquitectura/datos generativa como los otros tres) que afecta la forma de la distribución de probabilidad de los tokens de salida: valores bajos favorecen las salidas de mayor probabilidad (más deterministas) y valores altos favorecen salidas de menor probabilidad (más aleatorias/creativas). Al ser un parámetro de configuración de inferencia y no un concepto de definición de arquitectura generativa, es el término que el consenso de la comunidad no selecciona en este ejercicio.\n\nOpción D - Token (Correcta): Se define oficialmente como una secuencia de caracteres que un modelo puede interpretar o predecir como una única unidad de significado (una palabra, parte de una palabra, un signo de puntuación, etc.).\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "category": "Model Development",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 20009,
    "questionNumber": 9,
    "question": "HOTSPOT - An ML engineer is working on an ML model to predict the prices of similarly sized homes. The model will base predictions on several features The ML engineer will use the following feature engineering techniques to estimate the prices of the homes: • Feature splitting • Logarithmic transformation • One-hot encoding • Standardized distribution Select the correct feature engineering techniques for the following list of features. Each feature engineering technique should be selected one time or not at all (Select three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Feature splitting",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Logarithmic transformation",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "One-hot encoding",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Standardized distribution",
        "isCorrect": true
      }
    ],
    "comments": "Nota sobre la extracción: el fichero fuente no recoge la lista concreta de features (por ejemplo, ciudad, tipo_año de construcción, tamaño) que había que emparejar con cada técnica -ese detalle formaba parte de un elemento interactivo (HOTSPOT) no capturado por el scraping-, por lo que la determinación de qué 3 técnicas se usan se basa en el consenso mayoritario de la discusión de la comunidad, con la siguiente justificación técnica:\n\nOpción A - Feature splitting (Correcta): Se aplica normalmente a un campo compuesto que combina dos informaciones distintas en un solo valor (por ejemplo, un campo 'tipo_año' que mezcla el tipo de vivienda y el año de construcción); dividirlo en dos columnas separadas permite que el modelo aprenda de cada componente de forma independiente.\n\nOpción B - Logarithmic transformation: Se usa típicamente para corregir distribuciones muy asimétricas (sesgadas) de variables numéricas, como el propio precio de la vivienda. Sin embargo, como el enunciado especifica que se trata de 'viviendas de tamaño similar', la variable de tamaño no presenta una asimetría fuerte que requiera esta transformación, por lo que no es una de las 3 técnicas seleccionadas según la mayoría de la discusión.\n\nOpción C - One-hot encoding (Correcta): Es la técnica estándar para convertir una variable categórica sin relación de orden (por ejemplo, el nombre de la ciudad) en columnas binarias que un algoritmo de ML pueda procesar numéricamente.\n\nOpción D - Standardized distribution (Correcta): Al tratarse de 'viviendas de tamaño similar', el tamaño de la vivienda es una variable numérica sin fuerte asimetría; escalarla a media 0 y desviación estándar 1 (estandarización) es la técnica adecuada para que su escala no domine sobre otras features durante el entrenamiento, en lugar de aplicar una transformación logarítmica pensada para corregir sesgo.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html",
    "category": "Data Preparation",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 20010,
    "questionNumber": 10,
    "question": "Case study - An ML engineer is developing a fraud detection model on AWS. The training dataset includes transaction logs, customer profiles, and tables from an on-premises MySQL database. The transaction logs and customer profiles are stored in Amazon S3. The dataset has a class imbalance that affects the learning of the model's algorithm. Additionally, many of the features have interdependencies. The algorithm is not capturing all the desired underlying patterns in the data. Which AWS service or feature can aggregate the data from the various data sources?",
    "choices": [
      {
        "letter": "A",
        "text": "Amazon EMR Spark jobs",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Amazon Kinesis Data Streams",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Amazon DynamoDB",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "AWS Lake Formation",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Amazon EMR con Spark es un motor de cómputo distribuido que puede usarse para leer y unir datos de múltiples orígenes con código Spark, pero no es un servicio diseñado para agregar de forma nativa y gobernada datos de fuentes heterogéneas (S3, bases de datos on-premises); requiere desarrollar y mantener jobs Spark manualmente para las conexiones, extracción y unión.\n\nOpción B: Amazon Kinesis Data Streams es un servicio de streaming de datos en tiempo real; no aplica a la ingesta batch/agregación de logs, perfiles y tablas relacionales históricas.\n\nOpción C: Amazon DynamoDB es una base de datos NoSQL de destino, no un servicio de agregación de datos de múltiples fuentes.\n\nOpción D (Correcta): AWS Lake Formation está diseñado específicamente para 'romper los silos de datos y combinar diferentes tipos de datos estructurados y no estructurados en un repositorio centralizado'. La documentación oficial indica explícitamente que permite importar datos de bases de datos ya existentes en AWS y de fuentes de terceros como MySQL, además de S3, usando 'blueprints' que generan automáticamente los crawlers/jobs de Glue necesarios para la ingesta. Esto coincide exactamente con el escenario (S3 + MySQL on-premises).\n\nReferencias:\nhttps://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html\nhttps://docs.aws.amazon.com/lake-formation/latest/dg/getting-started-tutorials.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20011,
    "questionNumber": 11,
    "question": "Case study - An ML engineer is developing a fraud detection model on AWS. The training dataset includes transaction logs, customer profiles, and tables from an on-premises MySQL database. The transaction logs and customer profiles are stored in Amazon S3. The dataset has a class imbalance that affects the learning of the model's algorithm. Additionally, many of the features have interdependencies. The algorithm is not capturing all the desired underlying patterns in the data. After the data is aggregated, the ML engineer must implement a solution to automatically detect anomalies in the data and to visualize the result. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Athena to automatically detect the anomalies and to visualize the result.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon Redshift Spectrum to automatically detect the anomalies. Use Amazon QuickSight to visualize the result.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon SageMaker Data Wrangler to automatically detect the anomalies and to visualize the result.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use AWS Batch to automatically detect the anomalies. Use Amazon QuickSight to visualize the result.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Amazon Athena permite consultar datos en S3 con SQL, pero no incluye una capacidad nativa de detección automática de anomalías ni de visualización integrada; se necesitaría construir esa lógica y usar otra herramienta para graficar.\n\nOpción B: Redshift Spectrum permite consultar datos en S3 desde Redshift, pero tampoco detecta anomalías de forma nativa; requeriría lógica SQL/ML personalizada, y aunque QuickSight sí visualiza, la combinación implica más desarrollo/overhead que una solución integrada.\n\nOpción C (Correcta): Amazon SageMaker Data Wrangler incluye análisis integrados como el 'Data Quality and Insights Report' y un análisis de detección de anomalías en series temporales, que identifican valores atípicos/anómalos automáticamente, y permite generar visualizaciones (histogramas, gráficos de dispersión, etc.) directamente sobre esos análisis sin necesidad de escribir código adicional, cumpliendo ambos requisitos (detectar y visualizar) en una sola herramienta.\n\nOpción D: AWS Batch es un servicio de orquestación de trabajos por lotes de propósito general; no tiene funciones de detección de anomalías ni de visualización, habría que programarlas desde cero.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-analyses.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-analyses.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-data-insights.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20012,
    "questionNumber": 12,
    "question": "Case study - An ML engineer is developing a fraud detection model on AWS. The training dataset includes transaction logs, customer profiles, and tables from an on-premises MySQL database. The transaction logs and customer profiles are stored in Amazon S3. The dataset has a class imbalance that affects the learning of the model's algorithm. Additionally, many of the features have interdependencies. The algorithm is not capturing all the desired underlying patterns in the data. The training dataset includes categorical data and numerical data. The ML engineer must prepare the training dataset to maximize the accuracy of the model. Which action will meet this requirement with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Glue to transform the categorical data into numerical data.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Glue to transform the numerical data into categorical data.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon SageMaker Data Wrangler to transform the categorical data into numerical data.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use Amazon SageMaker Data Wrangler to transform the numerical data into categorical data.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: AWS Glue permite transformar datos categóricos en numéricos mediante código PySpark personalizado (jobs de Glue ETL), lo cual implica escribir y mantener lógica de transformación manualmente, aumentando el overhead operativo.\n\nOpción B: Transformar datos numéricos en categóricos no es lo que se necesita: los algoritmos de ML requieren entradas numéricas, no lo contrario; esta opción invierte el objetivo real de la preparación de datos.\n\nOpción C (Correcta): Amazon SageMaker Data Wrangler incluye la transformación integrada 'Encode Categorical' (con métodos ordinal, one-hot y similarity encoding) que convierte columnas de texto/categóricas en representaciones numéricas mediante una interfaz visual sin necesidad de escribir código, lo que minimiza el esfuerzo operativo frente a escribir un job de Glue a medida.\n\nOpción D: Igual que B, invierte el sentido de la transformación necesaria (de numérico a categórico), lo cual no ayuda a que el algoritmo de ML procese los datos.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-data-export.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20013,
    "questionNumber": 13,
    "question": "Case study - An ML engineer is developing a fraud detection model on AWS. The training dataset includes transaction logs, customer profiles, and tables from an on-premises MySQL database. The transaction logs and customer profiles are stored in Amazon S3. The dataset has a class imbalance that affects the learning of the model's algorithm. Additionally, many of the features have interdependencies. The algorithm is not capturing all the desired underlying patterns in the data. Before the ML engineer trains the model, the ML engineer must resolve the issue of the imbalanced data. Which solution will meet this requirement with the LEAST operational effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Athena to identify patterns that contribute to the imbalance. Adjust the dataset accordingly.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon SageMaker Studio Classic built-in algorithms to process the imbalanced dataset.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Glue DataBrew built-in features to oversample the minority class.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use the Amazon SageMaker Data Wrangler balance data operation to oversample the minority class.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Usar Athena para identificar patrones de desbalance y ajustar el dataset 'a mano' requiere análisis y lógica de muestreo manual (SQL + reprocesamiento), lo cual implica mucho más esfuerzo operativo que usar una transformación integrada.\n\nOpción B: SageMaker Studio Classic no tiene 'algoritmos incorporados' pensados para balancear datasets; los algoritmos incorporados de SageMaker son para entrenar modelos (regresión, clasificación, clustering...), no para preprocesamiento de balanceo de clases.\n\nOpción C: AWS Glue DataBrew no incluye una función nativa de sobremuestreo/submuestreo de clases minoritarias equivalente a la operación 'Balance data' de Data Wrangler; habría que construir esa lógica con recetas personalizadas.\n\nOpción D (Correcta): SageMaker Data Wrangler incluye la operación integrada 'Balance data', con métodos como 'Random oversampling' (duplica aleatoriamente ejemplos de la clase minoritaria) y 'Random undersampling', aplicable en la interfaz visual sin necesidad de código, lo que representa el mínimo esfuerzo operativo posible para resolver el desbalance de clases.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-transform.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20014,
    "questionNumber": 14,
    "question": "Case study - An ML engineer is developing a fraud detection model on AWS. The training dataset includes transaction logs, customer profiles, and tables from an on-premises MySQL database. The transaction logs and customer profiles are stored in Amazon S3. The dataset has a class imbalance that affects the learning of the model's algorithm. Additionally, many of the features have interdependencies. The algorithm is not capturing all the desired underlying patterns in the data. The ML engineer needs to use an Amazon SageMaker built-in algorithm to train the model. Which algorithm should the ML engineer use to meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "LightGBM",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Linear learner",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "К-means clustering",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Neural Topic Model (NTM)",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta según la documentación actual): LightGBM figura en la documentación oficial de SageMaker AI como 'LightGBM built-in algorithm' (algoritmo incorporado); es decir, SageMaker lo ofrece igual que a Linear Learner, como algoritmo nativo listo para entrenar sin necesidad de traer un contenedor/script propio. Además, LightGBM es un algoritmo de árboles de decisión con gradient boosting (GBDT), que captura de forma natural interacciones NO lineales entre variables (interdependencias de features) y suele rendir mejor que un modelo lineal en datasets de fraude con desbalance de clases y patrones complejos. Dado que el enunciado indica explícitamente que 'muchas de las features tienen interdependencias' y que 'el algoritmo no está capturando todos los patrones subyacentes deseados', un modelo basado en árboles como LightGBM es más adecuado técnicamente que un modelo lineal.\n\nOpción B (Respuesta mayoritaria en ExamTopics, pero discutible): Linear Learner es efectivamente un algoritmo incorporado de SageMaker apto para clasificación binaria, pero es un modelo LINEAL: aprende una función lineal (o un umbral lineal) de las features, por lo que no captura de forma nativa interacciones/interdependencias no lineales entre variables, que es precisamente el problema descrito en el escenario. La justificación habitual de la comunidad ('LightGBM no es un algoritmo incorporado') queda desmentida por la documentación oficial actual de SageMaker, que lista explícitamente a LightGBM como built-in algorithm junto a Linear Learner y XGBoost.\n\nOpción C: K-means es un algoritmo de clustering NO supervisado; la detección de fraude aquí es un problema de clasificación supervisada (fraude/no fraude), por lo que K-means no aplica.\n\nOpción D: Neural Topic Model (NTM) es un algoritmo de modelado de temas para texto (NLP), no aplicable a un problema de clasificación tabular de fraude.\n\nSe discrepa deliberadamente de la 'Most Accepted Answer' (B) de ExamTopics: la documentación oficial de AWS confirma que LightGBM SÍ es un algoritmo incorporado de SageMaker, y su naturaleza de árboles de decisión se ajusta mejor a los requisitos explícitos del enunciado (interdependencia de features, patrones no capturados) que un modelo lineal.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/lightgbm.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/algos.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/algorithms-tabular.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/linear-learner.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20015,
    "questionNumber": 15,
    "question": "A company has deployed an XGBoost prediction model in production to predict if a customer is likely to cancel a subscription. The company uses Amazon SageMaker Model Monitor to detect deviations in the F1 score. During a baseline analysis of model quality, the company recorded a threshold for the F1 score. After several months of no change, the model's F1 score decreases significantly. What could be the reason for the reduced F1 score?",
    "choices": [
      {
        "letter": "A",
        "text": "Concept drift occurred in the underlying customer data that was used for predictions.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "The model was not sufficiently complex to capture all the patterns in the original baseline data.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "The original baseline data had a data quality issue of missing values.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Incorrect ground truth labels were provided to Model Monitor during the calculation of the baseline.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): El 'concept drift' se define como un cambio en la relación subyacente entre las variables de entrada y la variable objetivo (por ejemplo, cambios en el comportamiento de los clientes que hacen que los mismos valores de features ya no predigan igual la cancelación de la suscripción). Como el modelo estuvo estable varios meses y luego el F1 score cae de forma significativa sin cambios en el pipeline, la causa más plausible es que los datos de clientes en producción han evolucionado (los patrones de comportamiento cambiaron), es decir, concept drift, que es justamente lo que SageMaker Model Monitor está diseñado para detectar comparando la distribución de los datos en producción contra el baseline.\n\nOpción B: Si el modelo no fuera suficientemente complejo para capturar los patrones originales, el F1 score habría sido bajo desde el principio (en el baseline), no habría permanecido estable durante meses antes de degradarse.\n\nOpción C: Si el baseline tuviera un problema de calidad de datos (valores ausentes), ese problema habría afectado la métrica del baseline desde el inicio, no explicaría una caída repentina meses después con un baseline ya establecido y estable.\n\nOpción D: Si las etiquetas de verdad terreno (ground truth) usadas para calcular el baseline hubieran sido incorrectas, el baseline en sí habría sido erróneo desde el principio; esto no explica por qué el rendimiento se mantuvo estable durante meses y luego cayó.\n\nReferencias:\nhttps://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlops01-bp03.html\nhttps://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlperf06-bp04.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20016,
    "questionNumber": 16,
    "question": "A company has a team of data scientists who use Amazon SageMaker notebook instances to test ML models. When the data scientists need new permissions, the company attaches the permissions to each individual role that was created during the creation of the SageMaker notebook instance. The company needs to centralize management of the team's permissions. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a single IAM role that has the necessary permissions. Attach the role to each notebook instance that the team uses.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a single IAM group. Add the data scientists to the group. Associate the group with each notebook instance that the team uses.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a single IAM user. Attach the AdministratorAccess AWS managed IAM policy to the user. Configure each notebook instance to use the IAM user.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a single IAM group. Add the data scientists to the group. Create an IAM role. Attach the AdministratorAccess AWS managed IAM policy to the role. Associate the role with the group. Associate the group with each notebook instance that the team uses.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Cada instancia de notebook de SageMaker se asocia a un único rol de ejecución de IAM (parámetro RoleArn) que SageMaker asume para acceder a otros servicios (S3, ECR, etc.). Crear un único rol de IAM con los permisos necesarios y asociarlo a todas las instancias de notebook del equipo centraliza la gestión: cualquier cambio de permisos se hace en un solo lugar (el rol) y se propaga automáticamente a todas las instancias que lo usan, sin tener que tocar cada instancia individualmente.\n\nOpción B: Un grupo de IAM no puede 'asociarse' a una instancia de notebook de SageMaker; la API CreateNotebookInstance solo acepta un rol de ejecución de IAM (RoleArn), no un grupo de IAM. Los grupos de IAM agrupan usuarios y sus políticas, pero no son la entidad que SageMaker asume para operar en nombre de la instancia.\n\nOpción C: Usar un único usuario de IAM con AdministratorAccess viola el principio de mínimo privilegio (acceso total a toda la cuenta) y no es la forma en que las instancias de notebook consumen credenciales (usan roles, no usuarios), además de ser un riesgo de seguridad grave.\n\nOpción D: Combina un grupo con un rol con AdministratorAccess, pero además de que las instancias de notebook no se asocian a grupos, otorgar AdministratorAccess es innecesario y contrario a las mejores prácticas de seguridad; solo se necesitan los permisos concretos que el equipo requiere.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-roles.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/nbi-root-access.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20017,
    "questionNumber": 17,
    "question": "An ML engineer needs to use an ML model to predict the price of apartments in a specific location. Which metric should the ML engineer use to evaluate the model's performance?",
    "choices": [
      {
        "letter": "A",
        "text": "Accuracy",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Area Under the ROC Curve (AUC)",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "F1 score",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Mean absolute error (MAE)",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Accuracy es una métrica de clasificación (ratio de aciertos sobre el total), no aplicable a un problema de regresión como predecir un precio (valor numérico continuo).\n\nOpción B: AUC (área bajo la curva ROC) mide la capacidad de un clasificador binario para distinguir clases mediante un umbral de probabilidad; no tiene sentido para una salida numérica continua como un precio.\n\nOpción C: El F1 score es la media armónica de precisión y recall, métricas de clasificación (verdaderos/falsos positivos), no aplicable a un problema de regresión.\n\nOpción D (Correcta): Predecir el precio de un apartamento es un problema de REGRESIÓN (la salida es un valor numérico continuo). La documentación de SageMaker Autopilot lista el MAE (Mean Absolute Error) explícitamente como una de las métricas disponibles para evaluar modelos de regresión, midiendo la diferencia media absoluta entre el valor predicho y el real. Es, junto con RMSE y R2, la métrica adecuada para este tipo de problema.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html\nhttps://docs.aws.amazon.com/sagemaker/latest/APIReference/API_AutoMLJobObjective.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20018,
    "questionNumber": 18,
    "question": "An ML engineer has trained a neural network by using stochastic gradient descent (SGD). The neural network performs poorly on the test set. The values for training loss and validation loss remain high and show an oscillating pattern. The values decrease for a few epochs and then increase for a few epochs before repeating the same cycle. What should the ML engineer do to improve the training process?",
    "choices": [
      {
        "letter": "A",
        "text": "Introduce early stopping.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Increase the size of the test set.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Increase the learning rate.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Decrease the learning rate.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: El early stopping detiene el entrenamiento cuando la métrica de validación deja de mejorar (para evitar sobreajuste/overfitting), pero no soluciona un patrón OSCILANTE de la pérdida de entrenamiento y validación; el problema aquí no es que el modelo sobreajuste, sino que no logra converger de forma estable.\n\nOpción B: Aumentar el tamaño del conjunto de test no tiene relación con la dinámica de optimización del descenso de gradiente durante el entrenamiento; no afecta al comportamiento oscilante de la pérdida.\n\nOpción C: Aumentar la tasa de aprendizaje empeoraría el problema: con SGD, una tasa de aprendizaje demasiado ALTA hace que los pasos de actualización de pesos sean tan grandes que el optimizador 'salte' repetidamente por encima del mínimo de la función de pérdida, produciendo exactamente el patrón oscilante descrito (baja unos epochs, sube otros, y se repite el ciclo) sin converger.\n\nOpción D (Correcta): Reducir la tasa de aprendizaje hace que los pasos de actualización de los pesos sean más pequeños y graduales, permitiendo que el optimizador se aproxime de forma más estable al mínimo de la función de pérdida en lugar de sobrepasarlo en cada iteración. La documentación de AWS advierte explícitamente que una tasa de aprendizaje demasiado alta puede impedir que los pesos se acerquen a la solución óptima, lo que coincide exactamente con el síntoma descrito (oscilación cíclica de la pérdida sin mejora neta).\n\nReferencias:\nhttps://docs.aws.amazon.com/machine-learning/latest/dg/training-parameters1.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20019,
    "questionNumber": 19,
    "question": "An ML engineer needs to process thousands of existing CSV objects and new CSV objects that are uploaded. The CSV objects are stored in a central Amazon S3 bucket and have the same number of columns. One of the columns is a transaction date. The ML engineer must query the data based on the transaction date. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Use an Amazon Athena CREATE TABLE AS SELECT (CTAS) statement to create a table based on the transaction date from data in the central S3 bucket. Query the objects from the table.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a new S3 bucket for processed data. Set up S3 replication from the central S3 bucket to the new S3 bucket. Use S3 Object Lambda to query the objects based on transaction date.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a new S3 bucket for processed data. Use AWS Glue for Apache Spark to create a job to query the CSV objects based on transaction date. Configure the job to store the results in the new S3 bucket. Query the objects from the new S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a new S3 bucket for processed data. Use Amazon Data Firehose to transfer the data from the central S3 bucket to the new S3 bucket. Configure Firehose to run an AWS Lambda function to query the data based on transaction date.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Amazon Athena permite ejecutar una sentencia CTAS (CREATE TABLE AS SELECT) directamente sobre los objetos CSV ya existentes en el bucket S3 central, creando una tabla basada en la fecha de transacción y consultarla después con SQL estándar. Es una solución completamente serverless: no hay que aprovisionar clusters, replicar datos a otro bucket, ni escribir funciones Lambda o jobs Spark; simplemente se define la tabla vía el Glue Data Catalog (usado por Athena) y se consulta, lo que representa el mínimo overhead operativo tanto para los datos históricos como para los nuevos objetos subidos.\n\nOpción B: Requiere crear un bucket nuevo, configurar replicación S3 y desarrollar una función de S3 Object Lambda personalizada para filtrar por fecha; esto implica mucho más desarrollo y mantenimiento de infraestructura que una consulta CTAS de Athena.\n\nOpción C: Usar AWS Glue con Apache Spark para crear un job de consulta/filtrado requiere escribir y mantener un script Spark, aprovisionar/gestionar la ejecución de jobs de Glue y un bucket adicional, lo cual es más overhead operativo que una consulta SQL de Athena sobre los datos existentes.\n\nOpción D: Amazon Data Firehose está pensado para la ingesta de streaming (no para mover archivos batch ya existentes en S3), y ejecutar una función Lambda desde Firehose para 'consultar por fecha' no es un patrón soportado ni de mínimo esfuerzo para este caso de uso batch.\n\nReferencias:\nhttps://docs.aws.amazon.com/athena/latest/ug/ctas.html\nhttps://docs.aws.amazon.com/athena/latest/ug/ctas-console.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20020,
    "questionNumber": 20,
    "question": "A company has a large, unstructured dataset. The dataset includes many duplicate records across several key attributes. Which solution on AWS will detect duplicates in the dataset with the LEAST code development?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Mechanical Turk jobs to detect duplicates.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon QuickSight ML Insights to build a custom deduplication model.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon SageMaker Data Wrangler to pre-process and detect duplicates.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use the AWS Glue FindMatches transform to detect duplicates.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Usar trabajos de Amazon Mechanical Turk implica que personas revisen manualmente los registros para encontrar duplicados; esto no requiere 'código', pero tampoco escala bien a un dataset grande y no es una solución automatizada de AWS con mínimo desarrollo, sino un proceso de crowdsourcing manual y costoso en tiempo humano.\n\nOpción B: Amazon QuickSight ML Insights ofrece detección de anomalías y forecasting sobre visualizaciones, pero no incluye una función de deduplicación de registros; 'construir un modelo de deduplicación personalizado' implicaría un desarrollo considerable, todo lo contrario a mínimo código.\n\nOpción C: SageMaker Data Wrangler permite eliminar filas duplicadas EXACTAS (operación 'Drop duplicates' en 'Manage Rows'), pero no ofrece coincidencia difusa/aprendizaje automático para detectar registros que son casi iguales en varios atributos sin ser idénticos carácter por carácter, que es el caso típico de datasets con duplicados no exactos.\n\nOpción D (Correcta): La transformación AWS Glue FindMatches está diseñada específicamente para identificar registros duplicados o coincidentes en un dataset sin necesitar un identificador único común, utilizando aprendizaje automático entrenado a partir de un pequeño conjunto de ejemplos etiquetados por el propio usuario (a través de un 'labeling set' generado automáticamente). Es una transformación gestionada dentro de AWS Glue que no requiere que el desarrollador escriba el algoritmo de coincidencia, solo etiquetar ejemplos y dejar que Glue entrene el modelo de matching, lo que representa el mínimo desarrollo de código posible entre las opciones.\n\nReferencias:\nhttps://docs.aws.amazon.com/glue/latest/dg/machine-learning.html\nhttps://docs.aws.amazon.com/glue/latest/dg/machine-learning-transform-tutorial.html\nhttps://docs.aws.amazon.com/glue/latest/dg/match-scoring.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20021,
    "questionNumber": 21,
    "question": "A company needs to run a batch data-processing job on Amazon EC2 instances. The job will run during the weekend and will take 90 minutes to finish running. The processing can handle interruptions. The company will run the job every weekend for the next 6 months. Which EC2 instance purchasing option will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Spot Instances",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Reserved Instances",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "On-Demand Instances",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Dedicated Instances",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): La documentación de AWS describe las Spot Instances como la opción de compra de EC2 pensada para 'capacidad de cómputo sobrante interrumpible con descuentos significativos, adecuada para cargas de trabajo tolerantes a fallos y flexibles'. El escenario cumple exactamente ese perfil: el job es corto (90 minutos), tolera interrupciones y se ejecuta de forma programada (fin de semana), por lo que el ahorro de Spot (hasta un 90% frente a On-Demand) se puede aprovechar sin riesgo real, ya que basta con relanzar el job si la instancia es reclamada.\n\nOpción B: Las Reserved Instances requieren un compromiso de 1 o 3 años pagando por capacidad reservada continua (o con descuento por uso constante), pero aquí el uso es de solo 90 minutos por semana; se pagaría por capacidad que permanece inactiva la mayor parte del tiempo, lo que la hace ineficiente en coste.\n\nOpción C: On-Demand no ofrece ningún descuento y es la opción más cara de las cuatro para una carga de trabajo que admite interrupciones; se usaría solo si se necesitara disponibilidad garantizada sin interrupciones, que no es el caso.\n\nOpción D: Dedicated Instances proporcionan hardware físico dedicado a una sola cuenta (aislamiento a nivel de tenant), lo cual implica sobrecoste y no aporta nada relevante para un job por lotes tolerante a interrupciones; es la opción menos adecuada en coste.\n\nReferencias:\nhttps://docs.aws.amazon.com/eks/latest/best-practices/cost-opt-compute.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20022,
    "questionNumber": 22,
    "question": "An ML engineer has an Amazon Comprehend custom model in Account A in the us-east-1 Region. The ML engineer needs to copy the model to Account B in the same Region. Which solution will meet this requirement with the LEAST development effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon S3 to make a copy of the model. Transfer the copy to Account B.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a resource-based IAM policy. Use the Amazon Comprehend ImportModel API operation to copy the model to Account B.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS DataSync to replicate the model from Account A to Account B.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Site-to-Site VPN connection between Account A and Account B to transfer the model.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Los modelos personalizados de Comprehend no se exponen como artefactos manipulables directamente en S3 por el cliente; no existe un mecanismo soportado para 'copiar' el modelo mediante S3 y transferirlo manualmente, por lo que implicaría trabajo de ingeniería no soportado por el servicio.\n\nOpción B (Correcta): La guía oficial 'Importing a custom model from another AWS account' documenta el flujo soportado: en la cuenta origen (Account A) se adjunta una política de recursos (resource-based IAM policy) al modelo personalizado mediante PutResourcePolicy, autorizando a la cuenta destino (Account B) a importarlo; después, en Account B, se invoca la operación de API ImportModel de Amazon Comprehend, que crea una copia del modelo en la cuenta destino. Es el mecanismo nativo del servicio, sin necesidad de mover datos manualmente, por lo que es el de menor esfuerzo de desarrollo.\n\nOpción C: AWS DataSync está diseñado para migrar o sincronizar datos de archivos/objetos entre sistemas de almacenamiento (S3, EFS, on-premises), no para copiar modelos de Comprehend, que son artefactos internos gestionados por el servicio.\n\nOpción D: Una VPN Site-to-Site conecta redes privadas virtuales, no resuelve la copia de un artefacto de modelo entre cuentas AWS a nivel de servicio Comprehend; añadiría complejidad de red innecesaria.\n\nReferencias:\nhttps://docs.aws.amazon.com/comprehend/latest/dg/custom-copy-importing.html\nhttps://docs.aws.amazon.com/comprehend/latest/APIReference/API_ImportModel.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20023,
    "questionNumber": 23,
    "question": "An ML engineer is training a simple neural network model. The ML engineer tracks the performance of the model over time on a validation dataset. The model's performance improves substantially at first and then degrades after a specific number of epochs. Which solutions will mitigate this problem? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Enable early stopping on the model.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Increase dropout in the layers.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Increase the number of layers.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Increase the number of neurons.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Investigate and reduce the sources of model bias.",
        "isCorrect": false
      }
    ],
    "comments": "El patrón descrito (mejora sustancial y luego degradación de la métrica de validación conforme avanzan las épocas) es la firma clásica de overfitting (sobreajuste): el modelo memoriza el conjunto de entrenamiento y pierde capacidad de generalización.\n\nOpción A (Correcta): SageMaker documenta el mecanismo de early stopping, que detiene el entrenamiento cuando el modelo deja de mejorar en la métrica objetivo sobre el conjunto de validación, evitando así que el modelo siga entrenando más allá del punto óptimo donde comienza a sobreajustar. La regla incorporada 'Overtraining' de SageMaker Debugger monitoriza exactamente esta situación (la pérdida de validación empieza a subir después de que entrenamiento y validación hayan bajado).\n\nOpción B (Correcta): Aumentar el dropout es una técnica de regularización estándar en redes neuronales: al desactivar aleatoriamente neuronas durante el entrenamiento se reduce la capacidad del modelo de memorizar patrones específicos del set de entrenamiento, mitigando el overfitting.\n\nOpción C: Aumentar el número de capas incrementa la capacidad/complejidad del modelo, lo que tiende a empeorar el overfitting, no a mitigarlo.\n\nOpción D: Aumentar el número de neuronas, igual que C, incrementa la capacidad del modelo y favorece el sobreajuste en lugar de reducirlo.\n\nOpción E: El sesgo (bias) del modelo es un problema de underfitting/equidad, no relacionado con el patrón de mejora-luego-degradación descrito, que es indicativo de varianza alta (overfitting), no de bias.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-early-stopping.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/debugger-built-in-rules.html",
    "category": "Model Development",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 20024,
    "questionNumber": 24,
    "question": "A company has a Retrieval Augmented Generation (RAG) application that uses a vector database to store embeddings of documents. The company must migrate the application to AWS and must implement a solution that provides semantic search of text files. The company has already migrated the text repository to an Amazon S3 bucket. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use an AWS Batch job to process the files and generate embeddings. Use AWS Glue to store the embeddings. Use SQL queries to perform the semantic searches.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use a custom Amazon SageMaker notebook to run a custom script to generate embeddings. Use SageMaker Feature Store to store the embeddings. Use SQL queries to perform the semantic searches.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the Amazon Kendra S3 connector to ingest the documents from the S3 bucket into Amazon Kendra. Query Amazon Kendra to perform the semantic searches.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use an Amazon Textract asynchronous job to ingest the documents from the S3 bucket. Query Amazon Textract to perform the semantic searches.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: AWS Glue es un catálogo de datos y motor ETL, no una base vectorial ni un motor de búsqueda semántica; ejecutar 'SQL queries' sobre embeddings almacenados en Glue no proporciona búsqueda por similitud semántica (requeriría cálculo de distancia vectorial, no soportado de forma nativa por SQL estándar sobre Glue).\n\nOpción B: SageMaker Feature Store está diseñado para almacenar y servir features tabulares para inferencia/entrenamiento de modelos, no está pensado como base de datos vectorial de propósito general para búsqueda semántica por similitud, y de nuevo 'consultas SQL' no realiza búsqueda semántica real.\n\nOpción C (Correcta): La documentación de Amazon Kendra describe el conector de datos de S3 ('Amazon Kendra S3 connector') que ingiere y sincroniza periódicamente documentos desde un bucket S3 hacia un índice de Kendra. Amazon Kendra es un servicio de búsqueda empresarial basado en ML que aplica comprensión de lenguaje natural para devolver resultados semánticamente relevantes (no solo coincidencia de palabras clave), cumpliendo el requisito de 'semantic search' sobre los ficheros de texto ya migrados a S3, sin tener que gestionar ni operar una base de datos vectorial propia.\n\nOpción D: Amazon Textract es un servicio de extracción de texto/OCR desde documentos (PDF, imágenes, formularios); no ofrece capacidades de indexación ni búsqueda semántica.\n\nReferencias:\nhttps://docs.aws.amazon.com/kendra/latest/dg/data-source-s3.html\nhttps://docs.aws.amazon.com/kendra/latest/dg/tutorial-search-metadata-create-index-ingest.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20025,
    "questionNumber": 25,
    "question": "A company uses Amazon Athena to query a dataset in Amazon S3. The dataset has a target variable that the company wants to predict. The company needs to use the dataset in a solution to determine if a model can predict the target variable. Which solution will provide this information with the LEAST development effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new model by using Amazon SageMaker Autopilot. Report the model's achieved performance.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Implement custom scripts to perform data pre-processing, multiple linear regression, and performance evaluation. Run the scripts on Amazon EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure Amazon Macie to analyze the dataset and to create a model. Report the model's achieved performance.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Select a model from Amazon Bedrock. Tune the model with the data. Report the model's achieved performance.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): SageMaker Autopilot es la funcionalidad de AutoML de SageMaker: recibe un dataset tabular y una columna objetivo, y automáticamente realiza limpieza de datos, selección de algoritmo/tipo de problema (regresión o clasificación), entrenamiento de múltiples candidatos y evaluación de métricas, devolviendo el rendimiento alcanzado. Esto responde directamente a 'determinar si un modelo puede predecir la variable objetivo' con el mínimo esfuerzo de desarrollo, ya que no requiere escribir código de entrenamiento ni evaluación.\n\nOpción B: Implementar scripts personalizados de preprocesado, regresión lineal múltiple y evaluación, ejecutados en instancias EC2 gestionadas manualmente, es la opción de MAYOR esfuerzo de desarrollo entre las cuatro, ya que exige codificar y operar toda la infraestructura y el pipeline manualmente.\n\nOpción C: Amazon Macie es un servicio de descubrimiento y clasificación de datos sensibles (PII) en S3; no entrena modelos predictivos ni evalúa variables objetivo, por lo que no cumple el requisito funcional.\n\nOpción D: Amazon Bedrock ofrece modelos fundacionales (LLMs) orientados a generación de texto, resumen, etc.; no está diseñado para evaluar la 'predictibilidad' de una variable objetivo tabular arbitraria mediante ajuste (fine-tuning), lo que sería un uso indebido del servicio y con mucho más esfuerzo que Autopilot para este caso de uso.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-automate-model-development.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-datasets-problem-types.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20026,
    "questionNumber": 26,
    "question": "A company wants to predict the success of advertising campaigns by considering the color scheme of each advertisement. An ML engineer is preparing data for a neural network model. The dataset includes color information as categorical data. Which technique for feature engineering should the ML engineer use for the model?",
    "choices": [
      {
        "letter": "A",
        "text": "Apply label encoding to the color categories. Automatically assign each color a unique integer.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Implement padding to ensure that all color feature vectors have the same length.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Perform dimensionality reduction on the color categories.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "One-hot encode the color categories to transform the color scheme feature into a binary matrix.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: El label encoding asigna un entero arbitrario a cada categoría, lo cual introduce una relación ordinal ficticia (por ejemplo, 'azul'=1 sería 'menor' que 'rojo'=3) que no existe realmente entre colores; una red neuronal puede interpretar erróneamente esa relación numérica como significativa, degradando el aprendizaje.\n\nOpción B: El padding se usa para igualar longitudes de secuencias (por ejemplo, en NLP o series temporales), no es una técnica de codificación de variables categóricas nominales como el color.\n\nOpción C: La reducción de dimensionalidad (PCA, etc.) se aplica típicamente sobre espacios de alta dimensionalidad ya numéricos para reducir features correlacionadas; no es el paso adecuado para transformar una variable categórica nominal en una representación numérica utilizable por la red.\n\nOpción D (Correcta): La documentación de SageMaker Data Wrangler/Canvas describe el 'One-Hot Encode' como el método de codificación categórica que representa cada categoría como un vector binario con un único valor distinto de cero en la posición de esa categoría. Al no imponer ningún orden entre categorías, es la técnica estándar recomendada para variables categóricas nominales (como esquemas de color) que se alimentan a una red neuronal.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-transform.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20027,
    "questionNumber": 27,
    "question": "A company uses a hybrid cloud environment. A model that is deployed on premises uses data in Amazon S3 to provide customers with a live conversational engine. The model is using sensitive data. An ML engineer needs to implement a solution to identify and remove the sensitive data. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy the model on Amazon SageMaker. Create a set of AWS Lambda functions to identify and remove the sensitive data.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy the model on an Amazon Elastic Container Service (Amazon ECS) cluster that uses AWS Fargate. Create an AWS Batch job to identify and remove the sensitive data.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon Macie to identify the sensitive data. Create a set of AWS Lambda functions to remove the sensitive data.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use Amazon Comprehend to identify the sensitive data. Launch Amazon EC2 instances to remove the sensitive data.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Requiere migrar/redesplegar el modelo on-premises a SageMaker, lo cual excede el alcance del requisito (identificar y eliminar datos sensibles en S3) y añade una carga operativa de migración no solicitada; además, seguiría necesitando algún mecanismo de detección de PII, que no se especifica.\n\nOpción B: Desplegar en un clúster ECS con Fargate y un job de AWS Batch implica gestionar contenedores, definiciones de tarea y colas de trabajos batch, lo que representa una sobrecarga operativa considerablemente mayor que usar un servicio gestionado de detección de datos sensibles.\n\nOpción C (Correcta): La documentación de Amazon Macie confirma que es un servicio totalmente gestionado que usa ML y coincidencia de patrones para descubrir y clasificar automáticamente datos sensibles (PII, credenciales, datos financieros) almacenados en Amazon S3, generando findings; Macie identifica pero no elimina el contenido, por lo que se complementa con funciones AWS Lambda (serverless, sin servidores que administrar) que consumen esos findings para redactar o eliminar los datos. Esta combinación de dos servicios totalmente gestionados representa la menor sobrecarga operativa de las cuatro opciones.\n\nOpción D: Amazon Comprehend también puede detectar PII mediante su funcionalidad de detección de entidades PII, pero la opción D exige 'lanzar instancias EC2' para eliminar los datos, lo que implica aprovisionar, parchear y gestionar servidores, una sobrecarga operativa notablemente mayor que usar Lambda (opción C).\n\nReferencias:\nhttps://docs.aws.amazon.com/macie/latest/user/what-is-macie.html\nhttps://docs.aws.amazon.com/macie/latest/user/discovery-asdd-how-it-works.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20028,
    "questionNumber": 28,
    "question": "An ML engineer needs to create data ingestion pipelines and ML model deployment pipelines on AWS. All the raw data is stored in Amazon S3 buckets. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Data Firehose to create the data ingestion pipelines. Use Amazon SageMaker Studio Classic to create the model deployment pipelines.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Glue to create the data ingestion pipelines. Use Amazon SageMaker Studio Classic to create the model deployment pipelines.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use Amazon Redshift ML to create the data ingestion pipelines. Use Amazon SageMaker Studio Classic to create the model deployment pipelines.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon Athena to create the data ingestion pipelines. Use an Amazon SageMaker notebook to create the model deployment pipelines.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Amazon Data Firehose es un servicio de ingesta y entrega de datos en streaming casi en tiempo real (registros continuos hacia S3, OpenSearch, etc.); el escenario describe datos ya almacenados en S3 (por lotes), no un flujo continuo de eventos, por lo que Firehose no es la herramienta natural para construir un 'pipeline de ingesta' sobre datos ya en reposo.\n\nOpción B (Correcta): AWS Glue es el servicio de referencia de AWS para construir pipelines ETL por lotes (batch) que extraen, transforman y cargan datos desde S3 (documentado en los patrones de arquitectura de ingesta de datos de AWS), ajustándose exactamente al escenario de 'raw data almacenada en buckets S3'. Para la parte de despliegue de modelos, Amazon SageMaker Studio Classic incorpora la interfaz visual de SageMaker Pipelines, que permite construir y orquestar pipelines de ML (incluido el despliegue) de forma gestionada.\n\nOpción C: Amazon Redshift ML permite entrenar e invocar modelos usando SQL dentro de Redshift; no es una herramienta de ingesta de datos, sino de creación de modelos sobre un data warehouse, por lo que no encaja con el rol de 'pipeline de ingesta'.\n\nOpción D: Amazon Athena es un motor de consultas SQL interactivas sobre S3, no un orquestador de pipelines de ingesta; y un notebook de SageMaker por sí solo no constituye un pipeline de despliegue gestionado y repetible.\n\nReferencias:\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/build-an-etl-service-pipeline-to-load-data-incrementally-from-amazon-s3-to-amazon-redshift-using-aws-glue.html\nhttps://docs.aws.amazon.com/whitepapers/latest/aws-cloud-data-ingestion-patterns-practices/heterogeneous-data-ingestion-patterns.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20029,
    "questionNumber": 29,
    "question": "A company that has hundreds of data scientists is using Amazon SageMaker to create ML models. The models are in model groups in the SageMaker Model Registry. The data scientists are grouped into three categories: computer vision, natural language processing (NLP), and speech recognition. An ML engineer needs to implement a solution to organize the existing models into these groups to improve model discoverability at scale. The solution must not affect the integrity of the model artifacts and their existing groupings. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a custom tag for each of the three categories. Add the tags to the model packages in the SageMaker Model Registry.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a model group for each category. Move the existing models into these category model groups.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use SageMaker ML Lineage Tracking to automatically identify and tag which model groups should contain the models.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a Model Registry collection for each of the three categories. Move the existing model groups into the collections.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Añadir tags a nivel de paquete de modelo individual no crea una jerarquía organizativa a escala de 'grupos de modelos' (model groups) como tal, y con cientos de científicos de datos y muchos model groups ya existentes, gestionar tags manualmente por paquete escala mal y no está pensado para agrupar model groups completos.\n\nOpción B: Mover los modelos existentes a nuevos model groups de categoría rompe explícitamente el requisito de 'no afectar la integridad... de sus agrupaciones existentes', ya que reorganizar los model groups altera la estructura original que ya tenían los data scientists.\n\nOpción C: SageMaker ML Lineage Tracking sirve para rastrear el linaje (procedencia) de datos, código y artefactos a través del ciclo de vida de un modelo; no es una funcionalidad diseñada para clasificar o agrupar model groups por dominio de negocio.\n\nOpción D (Correcta): La documentación oficial de 'Model Registry Collections' indica textualmente que permiten 'agrupar modelos registrados relacionados entre sí y organizarlos en jerarquías para mejorar la disponibilidad de descubrimiento a escala' y, crucialmente, que 'cualquier operación que se realice sobre una Collection... no altera los modelos registrados' y 'no afecta la integridad de los Model Groups individuales que contiene: los artefactos subyacentes en Amazon S3 y Amazon ECR no se modifican'. Esto cumple exactamente ambos requisitos: mejorar la organización/descubribilidad y preservar intacta la integridad y agrupación existente.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/modelcollections.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/modelcollections-limitations.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20030,
    "questionNumber": 30,
    "question": "A company runs an Amazon SageMaker domain in a public subnet of a newly created VPC. The network is configured properly, and ML engineers can access the SageMaker domain. Recently, the company discovered suspicious traffic to the domain from a specific IP address. The company needs to block traffic from the specific IP address. Which update to the network configuration will meet this requirement?",
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
    "comments": "Opción A: Los grupos de seguridad (security groups) de EC2/VPC son 'stateful' y solo admiten reglas de tipo ALLOW (permitir); no existe la posibilidad de crear una regla de tipo DENY en un security group, por lo que esta opción es técnicamente inviable.\n\nOpción B (Correcta): La guía de diseño de red de AWS confirma que las network ACL admiten explícitamente reglas de DENY (bloqueo) por CIDR/IP a nivel de subred, y se aplican en orden numérico antes de las reglas de permiso; son 'stateless' y actúan como una capa de seguridad adicional a nivel de subred. Añadir una regla de denegación para la IP específica en la network ACL de la subred donde está el dominio de SageMaker bloquea el tráfico de esa IP hacia todos los recursos de la subred, que es exactamente el mecanismo soportado por AWS para bloquear IPs concretas.\n\nOpción C: Los 'shadow variants' y Inference Recommender de SageMaker sirven para probar variantes de modelos con tráfico de producción replicado (shadow testing), no son un mecanismo de control de acceso de red ni de bloqueo de IPs.\n\nOpción D: Las tablas de rutas de una VPC controlan el enrutamiento de tráfico entre subredes/gateways (a dónde se envían los paquetes), no implementan reglas de firewall de tipo 'permitir/denegar' por dirección IP; no es un mecanismo válido para bloquear una IP.\n\nReferencias:\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/robust-network-design-control-tower/nacl.html\nhttps://docs.aws.amazon.com/whitepapers/latest/aws-best-practices-ddos-resiliency/security-groups-and-network-acls-bp5.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20031,
    "questionNumber": 31,
    "question": "A company is gathering audio, video, and text data in various languages. The company needs to use a large language model (LLM) to summarize the gathered data that is in Spanish. Which solution will meet these requirements in the LEAST amount of time?",
    "choices": [
      {
        "letter": "A",
        "text": "Train and deploy a model in Amazon SageMaker to convert the data into English text. Train and deploy an LLM in SageMaker to summarize the text.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon Transcribe and Amazon Translate to convert the data into English text. Use Amazon Bedrock with the Jurassic model to summarize the text.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use Amazon Rekognition and Amazon Translate to convert the data into English text. Use Amazon Bedrock with the Anthropic Claude model to summarize the text.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon Comprehend and Amazon Translate to convert the data into English text. Use Amazon Bedrock with the Stable Diffusion model to summarize the text.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Entrenar y desplegar modelos propios de conversión de audio/vídeo a texto y un LLM propio en SageMaker implica meses de desarrollo (recopilación de datos, entrenamiento, ajuste, validación); es la opción que MÁS tiempo requeriría, contradiciendo el requisito de 'LEAST amount of time'.\n\nOpción B (Correcta): Amazon Transcribe convierte de forma gestionada archivos de audio y de vídeo (la documentación de formatos soportados de Transcribe incluye contenedores como MP4, que llevan pista de audio) a texto, con identificación de idioma; Amazon Translate traduce el texto resultante (de español) a inglés; y Amazon Bedrock permite invocar directamente un modelo de AI21 Labs (familia Jurassic) ya alojado y listo para usar, sin entrenamiento, para resumir el texto en inglés. Esta combinación de servicios totalmente gestionados y listos para usar (sin entrenamiento) es la de menor tiempo de implementación.\n\nOpción C: Amazon Rekognition está diseñado para análisis de imágenes y vídeo (detección de objetos, rostros, moderación), no para transcribir voz a texto; no resuelve la conversión de audio/vídeo en texto que exige el escenario, aunque el modelo Claude de Bedrock sí sea perfectamente capaz de resumir texto.\n\nOpción D: Amazon Comprehend realiza análisis de texto (NLP) como detección de entidades o sentimiento, pero no convierte audio o vídeo en texto (no es un servicio de speech-to-text); además, Stable Diffusion en Bedrock es un modelo de generación de imágenes, no de resumen de texto, por lo que esta combinación es funcionalmente incorrecta en dos puntos.\n\nReferencias:\nhttps://docs.aws.amazon.com/transcribe/latest/dg/how-input.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-jurassic2.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20032,
    "questionNumber": 32,
    "question": "A financial company receives a high volume of real-time market data streams from an external provider. The streams consist of thousands of JSON records every second. The company needs to implement a scalable solution on AWS to identify anomalous data points. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Ingest real-time data into Amazon Kinesis data streams. Use the built-in RANDOM_CUT_FOREST function in Amazon Managed Service for Apache Flink to process the data streams and to detect data anomalies.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Ingest real-time data into Amazon Kinesis data streams. Deploy an Amazon SageMaker endpoint for real-time outlier detection. Create an AWS Lambda function to detect anomalies. Use the data streams to invoke the Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Ingest real-time data into Apache Kafka on Amazon EC2 instances. Deploy an Amazon SageMaker endpoint for real-time outlier detection. Create an AWS Lambda function to detect anomalies. Use the data streams to invoke the Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Send real-time data to an Amazon Simple Queue Service (Amazon SQS) FIFO queue. Create an AWS Lambda function to consume the queue messages. Program the Lambda function to start an AWS Glue extract, transform, and load (ETL) job for batch processing and anomaly detection.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta, con matiz importante): La documentación de referencia SQL de 'Kinesis Data Analytics' confirma RANDOM_CUT_FOREST como función incorporada para asignar puntuaciones de anomalía a registros de un stream, sin necesidad de entrenar ni desplegar un modelo propio, minimizando la sobrecarga operativa frente a las alternativas que exigen gestionar endpoints de SageMaker y funciones Lambda adicionales. Importante matiz de actualidad: AWS ha anunciado la descontinuación de 'Amazon Kinesis Data Analytics for SQL Applications' (el tipo de aplicación SQL que exponía RANDOM_CUT_FOREST como función nativa), recomendando migrar a aplicaciones de Apache Flink dentro de Amazon Managed Service for Apache Flink, donde ya no existe como función SQL incorporada de la misma forma. Aun con esta transición, entre las cuatro opciones dadas, A sigue siendo la de menor sobrecarga operativa relativa (servicio gestionado de streaming + función analítica sin infraestructura propia que administrar) frente a gestionar clústeres Kafka en EC2, endpoints de SageMaker o jobs de Glue.\n\nOpción B: Requiere entrenar/alojar un modelo propio en un endpoint de SageMaker (gestión de instancias de inferencia, escalado, versión) además de una función Lambda intermedia; más piezas que administrar que la opción A.\n\nOpción C: Además de todo lo anterior, exige operar manualmente un clúster de Apache Kafka sobre instancias EC2 (parcheo, escalado, alta disponibilidad), lo que representa la mayor sobrecarga operativa de las cuatro opciones.\n\nOpción D: Usa SQS y un job de AWS Glue por lotes (batch), lo que introduce latencia (no es procesamiento en tiempo real) y no está orientado a streams de miles de eventos por segundo con detección de anomalías en el mismo flujo.\n\nReferencias:\nhttps://docs.aws.amazon.com/kinesisanalytics/latest/sqlref/sqlrf-random-cut-forest.html\nhttps://docs.aws.amazon.com/kinesisanalytics/latest/dev/migrating-to-kda-studio-overview.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20033,
    "questionNumber": 33,
    "question": "A company has a large collection of chat recordings from customer interactions after a product release. An ML engineer needs to create an ML model to analyze the chat data. The ML engineer needs to determine the success of the product by reviewing customer sentiments about the product. Which action should the ML engineer take to complete the evaluation in the LEAST amount of time?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Rekognition to analyze sentiments of the chat conversations.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Train a Naive Bayes classifier to analyze sentiments of the chat conversations.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon Comprehend to analyze sentiments of the chat conversations.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use random forests to classify sentiments of the chat conversations.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Amazon Rekognition es un servicio de análisis de imágenes y vídeo (detección de objetos, rostros, contenido); no procesa ni analiza texto/sentimiento en conversaciones de chat, por lo que no es aplicable a este caso de uso.\n\nOpción B: Entrenar un clasificador Naive Bayes desde cero requiere recopilar datos etiquetados, preprocesar el texto, entrenar, validar y desplegar el modelo, lo que consume considerablemente más tiempo que usar un servicio ya entrenado y gestionado.\n\nOpción C (Correcta): La documentación de Amazon Comprehend describe la operación de API DetectSentiment (y su variante batch, BatchDetectSentiment), que analiza un texto de entrada y devuelve el sentimiento predominante (POSITIVE, NEGATIVE, NEUTRAL, MIXED) con puntuaciones de confianza, sin necesidad de entrenar ningún modelo propio. Al ser un servicio de NLP completamente gestionado y preentrenado, es la vía de MENOR tiempo de implementación para evaluar el sentimiento de las conversaciones de chat.\n\nOpción D: Igual que la opción B, entrenar un modelo de random forest desde cero para clasificación de sentimiento exige un ciclo completo de desarrollo de ML (etiquetado, feature engineering, entrenamiento, evaluación), muy superior en tiempo a usar la API preentrenada de Comprehend.\n\nReferencias:\nhttps://docs.aws.amazon.com/comprehend/latest/APIReference/API_DetectSentiment.html\nhttps://docs.aws.amazon.com/comprehend/latest/dg/using-api-sync.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20034,
    "questionNumber": 34,
    "question": "A company has a conversational AI assistant that sends requests through Amazon Bedrock to an Anthropic Claude large language model (LLM). Users report that when they ask similar questions multiple times, they sometimes receive different answers. An ML engineer needs to improve the responses to be more consistent and less random. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Increase the temperature parameter and the top_k parameter.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Increase the temperature parameter. Decrease the top_k parameter.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Decrease the temperature parameter. Increase the top_k parameter.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Decrease the temperature parameter and the top_k parameter.",
        "isCorrect": true
      }
    ],
    "comments": "La guía de parámetros de inferencia de Amazon Bedrock explica que 'temperature' y 'Top K' son los dos parámetros que controlan la 'randomness and diversity' (aleatoriedad y diversidad) de la salida del modelo.\n\nOpción A: Aumentar tanto temperature como top_k incrementa la aleatoriedad y la diversidad de tokens candidatos considerados, lo que produce respuestas MÁS variables/creativas, exactamente lo contrario de lo solicitado (mayor consistencia).\n\nOpción B: Aumentar temperature incrementa la aleatoriedad; aunque se reduzca top_k (menos candidatos por token), la temperatura alta sigue introduciendo variabilidad significativa en la selección final, por lo que no logra el efecto de consistencia deseado de forma fiable.\n\nOpción C: Disminuir temperature reduce la aleatoriedad (favorece los tokens de mayor probabilidad), pero aumentar top_k amplía el conjunto de tokens candidatos considerados en cada paso, lo que reintroduce variabilidad y contradice parcialmente el objetivo de reducir la aleatoriedad.\n\nOpción D (Correcta): Según la documentación de Bedrock, 'Top K' especifica el número de tokens candidatos más probables que el modelo considera para el siguiente token, y 'temperature' controla la aleatoriedad de la selección entre esos candidatos (valores más bajos producen una salida más enfocada/determinista). Disminuir ambos parámetros simultáneamente restringe el modelo a los tokens de mayor probabilidad y reduce al mínimo la aleatoriedad en su elección, produciendo respuestas más consistentes y repetibles ante preguntas similares, que es exactamente el objetivo planteado.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20035,
    "questionNumber": 35,
    "question": "A company is using ML to predict the presence of a specific weed in a farmer's field. The company is using the Amazon SageMaker linear learner built-in algorithm with a value of multiclass_classifier for the predictor_type hyperparameter. What should the company do to MINIMIZE false positives?",
    "choices": [
      {
        "letter": "A",
        "text": "Set the value of the weight decay hyperparameter to zero.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Increase the number of training epochs.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Increase the value of the target_precision hyperparameter.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Change the value of the predictor_type hyperparameter to regressor.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: 'weight decay' (parámetro l2/L1 de regularización) en el linear learner controla el sobreajuste penalizando pesos grandes; fijarlo a cero ELIMINA la regularización, lo que tiende a aumentar el sobreajuste y no está dirigido específicamente a reducir falsos positivos, sino que puede empeorar la generalización general del modelo.\n\nOpción B: Aumentar el número de épocas de entrenamiento puede mejorar el ajuste general del modelo, pero no apunta específicamente al control del ratio de falsos positivos frente a falsos negativos; es una palanca genérica de entrenamiento, no de balance de precisión/recall.\n\nOpción C (Correcta, con matiz documentado): Según la tabla oficial de hiperparámetros del linear learner, 'target_precision' fija la precisión objetivo que se mantiene constante mientras se maximiza el recall, cuando 'binary_classifier_model_selection_criteria' se establece en 'recall_at_target_precision'. Precisión más alta implica, por definición, MENOS falsos positivos (Precisión = TP/(TP+FP)), por lo que conceptualmente es el mecanismo del algoritmo diseñado explícitamente para minimizar falsos positivos. Matiz importante: la documentación indica que 'binary_classifier_model_selection_criteria' (y por extensión target_precision) se aplica 'cuando predictor_type se establece en binary_classifier'; en este escenario el hiperparámetro predictor_type está en 'multiclass_classifier', por lo que, en rigor, target_precision no tiene efecto en modo multiclase. De las cuatro opciones, sigue siendo la única que ataca directamente el concepto de falsos positivos vía precisión; A y B no lo hacen, y D directamente elimina la clasificación (pasa a regresión), lo que no tiene sentido para 'minimizar falsos positivos' en un problema de detección de presencia/ausencia.\n\nOpción D: Cambiar predictor_type a 'regressor' convierte el problema en una tarea de regresión (predicción de un valor continuo), eliminando el propio concepto de clasificación positivo/negativo y, por tanto, el concepto de 'falso positivo' deja de aplicar; no es una solución al problema planteado.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/ll_hyperparameters.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20036,
    "questionNumber": 36,
    "question": "A company has implemented a data ingestion pipeline for sales transactions from its ecommerce website. The company uses Amazon Data Firehose to ingest data into Amazon OpenSearch Service. The buffer interval of the Firehose stream is set for 60 seconds. An OpenSearch linear model generates real-time sales forecasts based on the data and presents the data in an OpenSearch dashboard. The company needs to optimize the data ingestion pipeline to support sub-second latency for the real-time dashboard. Which change to the architecture will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use zero buffering in the Firehose stream. Tune the batch size that is used in the PutRecordBatch operation.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Replace the Firehose stream with an AWS DataSync task. Configure the task with enhanced fan-out consumers.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Increase the buffer interval of the Firehose stream from 60 seconds to 120 seconds.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Replace the Firehose stream with an Amazon Simple Queue Service (Amazon SQS) queue.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): La documentación de Amazon Data Firehose confirma la existencia de un 'zero buffering interval hint': una configuración de buffering donde el intervalo se establece en cero segundos, provocando que Firehose entregue los datos en pocos segundos, sin esperar a acumular el búfer completo. Combinado con el ajuste del tamaño de lote (batch size) usado en la operación PutRecordBatch para no saturar el destino, esta es la vía soportada oficialmente por AWS para minimizar la latencia de entrega de un stream de Firehose hacia OpenSearch, acercándose a los requisitos de sub-segundo.\n\nOpción B: AWS DataSync es un servicio de migración/sincronización de datos entre sistemas de almacenamiento (S3, EFS, NFS, on-premises); no es un sustituto de Firehose para ingesta de streaming hacia OpenSearch, y el concepto de 'enhanced fan-out consumers' pertenece a Kinesis Data Streams, no a DataSync, por lo que la opción mezcla conceptos de servicios distintos de forma incorrecta.\n\nOpción C: Aumentar el intervalo de buffer de 60 a 120 segundos incrementa la latencia de entrega (los datos se acumulan más tiempo antes de enviarse), justo lo contrario de lo que se necesita para lograr latencia de sub-segundo.\n\nOpción D: Sustituir Firehose por una cola SQS elimina la integración nativa de entrega gestionada hacia OpenSearch Service que proporciona Firehose (transformación, reintentos, buffering configurable); habría que construir manualmente un consumidor que lea de SQS y escriba en OpenSearch, lo que no resuelve el problema de latencia por sí mismo y añade complejidad operativa.\n\nReferencias:\nhttps://docs.aws.amazon.com/firehose/latest/dev/create-configure-backup.html\nhttps://docs.aws.amazon.com/firehose/latest/APIReference/API_BufferingHints.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20037,
    "questionNumber": 37,
    "question": "A company has trained an ML model in Amazon SageMaker. The company needs to host the model to provide inferences in a production environment. The model must be highly available and must respond with minimum latency. The size of each request will be between 1 KB and 3 MB. The model will receive unpredictable bursts of requests during the day. The inferences must adapt proportionally to the changes in demand. How should the company deploy the model into production to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a SageMaker real-time inference endpoint. Configure auto scaling. Configure the endpoint to present the existing model.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Deploy the model on an Amazon Elastic Container Service (Amazon ECS) cluster. Use ECS scheduled scaling that is based on the CPU of the ECS cluster.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Install SageMaker Operator on an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. Deploy the model in Amazon EKS. Set horizontal pod auto scaling to scale replicas based on the memory metric.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Spot Instances with a Spot Fleet behind an Application Load Balancer (ALB) for inferences. Use the ALBRequestCountPerTarget metric as the metric for auto scaling.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): La documentación de SageMaker sobre 'configure autoscaling for SageMaker AI endpoints' y la guía de bien diseñado de ML (MLREL05-BP01, 'Allow automatic scaling of the model endpoint') confirman que un endpoint de inferencia en tiempo real de SageMaker con auto scaling configurado ajusta dinámicamente el número de instancias en función del tráfico entrante, cumpliendo con alta disponibilidad, baja latencia y adaptación proporcional a picos impredecibles de demanda, sin necesidad de gestionar infraestructura de contenedores o clústeres manualmente.\n\nOpción B: Desplegar en un clúster ECS con 'scheduled scaling' (escalado programado según horario, no reactivo a demanda real) no responde adecuadamente a 'bursts impredecibles'; el escalado programado se basa en franjas horarias predefinidas, no en la demanda real en tiempo real.\n\nOpción C: Aunque técnicamente viable, gestionar un operador de SageMaker sobre un clúster EKS añade una sobrecarga operativa significativa (gestión de nodos, pods, el propio clúster de Kubernetes) comparado con un endpoint gestionado de SageMaker; además, escalar en base a memoria no es necesariamente el indicador más adecuado para ráfagas de solicitudes de inferencia.\n\nOpción D: Usar Spot Instances para servir inferencias de producción con requisitos de alta disponibilidad es contraproducente, ya que las instancias Spot pueden ser interrumpidas en cualquier momento por AWS, comprometiendo la disponibilidad exigida por el escenario.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model-next-steps.html\nhttps://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlrel05-bp01.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20038,
    "questionNumber": 38,
    "question": "An ML engineer needs to use an Amazon EMR cluster to process large volumes of data in batches. Any data loss is unacceptable. Which instance purchasing option will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Run the primary node, core nodes, and task nodes on On-Demand Instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Run the primary node, core nodes, and task nodes on Spot Instances.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Run the primary node on an On-Demand Instance. Run the core nodes and task nodes on Spot Instances.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Run the primary node and core nodes on On-Demand Instances. Run the task nodes on Spot Instances.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Ejecutar los tres tipos de nodo en On-Demand es la opción más segura frente a pérdida de datos, pero también la MÁS CARA de las cuatro, ya que no aprovecha ningún descuento de Spot, incumpliendo el requisito de máxima eficiencia de coste.\n\nOpción B: Ejecutar el nodo primario y los nodos core en Spot expone el clúster a la posible interrupción de nodos que almacenan datos en HDFS; la guía de EMR indica explícitamente que se recomienda On-Demand para los nodos core 'to avoid HDFS data loss in case of Spot reclamation' (para evitar pérdida de datos HDFS en caso de reclamación de Spot), por lo que esta opción viola el requisito de 'ninguna pérdida de datos es aceptable'.\n\nOpción C: Igual que B, los nodos core almacenan bloques de HDFS; si se ejecutan en Spot y son interrumpidos, se puede perder o corromper parte de los datos replicados en HDFS, lo que no es aceptable según el requisito del escenario.\n\nOpción D (Correcta): La guía de planificación de instancias de Amazon EMR ('emr-plan-instances-guidelines.html', sección 'Data-critical workloads') recomienda ejecutar el nodo primario y los nodos core en On-Demand (ya que estos almacenan datos en HDFS y su pérdida sería crítica) y usar Spot únicamente para los nodos de tarea (task nodes), que no almacenan datos en HDFS ni ejecutan el daemon DataNode. La documentación indica que si un nodo de tarea se interrumpe por Spot, 'no data is lost, and the effect on your cluster is minimal' (no se pierde ningún dato y el efecto en el clúster es mínimo). Esta combinación logra el mayor ahorro de coste posible sin arriesgar ninguna pérdida de datos.\n\nReferencias:\nhttps://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-instances-guidelines.html\nhttps://docs.aws.amazon.com/emr/latest/ManagementGuide/managed-scaling-allocation-strategy.html\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/amazon-emr-hardware/configuration-best-practices.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20039,
    "questionNumber": 39,
    "question": "A company wants to improve the sustainability of its ML operations. Which actions will reduce the energy usage and computational resources that are associated with the company's training jobs? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon SageMaker Debugger to stop training jobs when non-converging conditions are detected.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use Amazon SageMaker Ground Truth for data labeling.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy models by using AWS Lambda functions.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Trainium instances for training.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Use PyTorch or TensorFlow with the distributed training option.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): La documentación del AWS Well-Architected Machine Learning Lens (práctica 'MLSUS04-BP01') describe SageMaker AI Debugger como la herramienta que 'detiene automáticamente el entrenamiento cuando se cumplen condiciones específicas' (por ejemplo, no convergencia); esto evita consumir cómputo y energía en jobs de entrenamiento que ya no están mejorando, reduciendo directamente el uso de recursos.\n\nOpción B: SageMaker Ground Truth es un servicio de etiquetado de datos; no tiene relación directa con el consumo energético de los JOBS DE ENTRENAMIENTO en sí, sino con la preparación de datos, por lo que no responde al requisito planteado.\n\nOpción C: Desplegar modelos con funciones Lambda afecta a la fase de inferencia/despliegue, no a los 'training jobs' (entrenamiento), que es específicamente lo que pregunta el enunciado.\n\nOpción D (Correcta): El léxico de sostenibilidad del Well-Architected Framework indica que el uso de tipos de instancia más eficientes energéticamente, incluidos los diseñados específicamente para ML (como los aceleradores de silicio personalizados AWS Trainium), reduce el consumo energético hasta en un 60% frente a hardware de propósito general ('MLSUS05-BP02 Use efficient silicon'), lo que reduce directamente el consumo energético y los recursos computacionales de los jobs de entrenamiento.\n\nOpción E: El entrenamiento distribuido con PyTorch/TensorFlow generalmente busca ACELERAR el entrenamiento (reducir tiempo de reloj) repartiendo la carga entre más recursos de cómputo en paralelo; esto no reduce necesariamente el consumo TOTAL de energía o recursos computacionales (a menudo el consumo total agregado es similar o mayor, solo se comprime en menos tiempo de reloj), por lo que no es una acción de sostenibilidad en el sentido de reducción de recursos consumidos.\n\nReferencias:\nhttps://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlsus04-bp01.html\nhttps://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlsus05-bp02.html",
    "category": "Model Development",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 20040,
    "questionNumber": 40,
    "question": "A company is planning to create several ML prediction models. The training data is stored in Amazon S3. The entire dataset is more than 5 TB in size and consists of CSV, JSON, Apache Parquet, and simple text files. The data must be processed in several consecutive steps. The steps include complex manipulations that can take hours to finish running. Some of the processing involves natural language processing (NLP) transformations. The entire process must be automated. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Process data at each step by using Amazon SageMaker Data Wrangler. Automate the process by using Data Wrangler jobs.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon SageMaker notebooks for each data processing step. Automate the process by using Amazon EventBridge.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Process data at each step by using AWS Lambda functions. Automate the process by using AWS Step Functions and Amazon EventBridge.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon SageMaker Pipelines to create a pipeline of data processing steps. Automate the pipeline by using Amazon EventBridge.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: SageMaker Data Wrangler está orientado a transformaciones de datos interactivas y relativamente rápidas dentro de un flujo visual; no está diseñado para orquestar pasos consecutivos que individualmente pueden tardar HORAS en completarse ni para manipulaciones NLP complejas de gran escala (>5 TB) como un pipeline productivo completo.\n\nOpción B: Los notebooks de SageMaker son entornos interactivos de desarrollo, no un mecanismo de ejecución de pasos de procesamiento productivos, versionados y encadenados; usarlos como pasos de un 'pipeline automatizado' orquestado solo por EventBridge (sin una capa de gestión de dependencias entre pasos) es frágil y no sigue el patrón recomendado por AWS para pipelines de ML.\n\nOpción C: AWS Lambda tiene un límite de tiempo de ejecución máximo de 15 minutos por invocación; el escenario indica que los pasos 'can take hours to finish running' (pueden tardar horas), lo que hace inviable usar Lambda para ejecutar directamente esas transformaciones de larga duración, aunque Step Functions sí sea válido como orquestador general.\n\nOpción D (Correcta): La documentación de SageMaker Pipelines confirma que es el servicio nativo de SageMaker para definir flujos de trabajo de ML de varios pasos (incluyendo procesamiento de datos con SageMaker Processing, que soporta trabajos de larga duración y transformaciones NLP mediante contenedores/scripts personalizados sobre datos en S3 de cualquier tamaño y formato). Además, la guía 'Schedule Pipeline Runs' documenta explícitamente la integración de SageMaker Pipelines con Amazon EventBridge para programar y automatizar la ejecución completa del pipeline, cumpliendo el requisito de automatización end-to-end sobre datasets grandes (>5 TB), en múltiples formatos, con pasos de larga duración y transformaciones NLP.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/pipeline-eventbridge.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/workflow-scheduling.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20041,
    "questionNumber": 41,
    "question": "An ML engineer needs to use AWS CloudFormation to create an ML model that an Amazon SageMaker endpoint will host. Which resource should the ML engineer declare in the CloudFormation template to meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "AWS::SageMaker::Model",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "AWS::SageMaker::Endpoint",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "AWS::SageMaker::NotebookInstance",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "AWS::SageMaker::Pipeline",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): AWS::SageMaker::Model es el recurso de CloudFormation que define un modelo de SageMaker, incluyendo la ubicación de los artefactos del modelo (ModelDataUrl), la imagen del contenedor de inferencia (PrimaryContainer) y el rol de ejecución. Este es exactamente el recurso que se necesita crear antes de desplegar un endpoint, ya que un modelo debe existir previamente para ser referenciado por un EndpointConfig y luego por un Endpoint.\n\nOpción B: AWS::SageMaker::Endpoint crea el endpoint de inferencia en sí (los recursos de cómputo), pero requiere referenciar un EndpointConfig que a su vez referencia un Model ya creado; no es el recurso que 'crea el modelo'.\n\nOpción C: AWS::SageMaker::NotebookInstance crea una instancia de notebook para desarrollo interactivo, no tiene relación con la definición de un modelo para hosting.\n\nOpción D: AWS::SageMaker::Pipeline define un pipeline de SageMaker Pipelines (flujo de pasos de MLOps), no un modelo individual para un endpoint.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-sagemaker-model.html\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-sagemaker-endpoint.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20042,
    "questionNumber": 42,
    "question": "An advertising company uses AWS Lake Formation to manage a data lake. The data lake contains structured data and unstructured data. The company's ML engineers are assigned to specific advertisement campaigns. The ML engineers must interact with the data through Amazon Athena and by browsing the data directly in an Amazon S3 bucket. The ML engineers must have access to only the resources that are specific to their assigned advertisement campaigns. Which solution will meet these requirements in the MOST operationally efficient way?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure IAM policies on an AWS Glue Data Catalog to restrict access to Athena based on the ML engineers' campaigns.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Store users and campaign information in an Amazon DynamoDB table. Configure DynamoDB Streams to invoke an AWS Lambda function to update S3 bucket policies.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Lake Formation to authorize AWS Glue to access the S3 bucket. Configure Lake Formation tags to map ML engineers to their campaigns.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure S3 bucket policies to restrict access to the S3 bucket based on the ML engineers' campaigns.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Configurar políticas IAM sobre el AWS Glue Data Catalog para restringir el acceso de Athena es viable pero implica gestionar políticas IAM independientes por cada campaña/usuario, lo que no escala bien y aumenta el esfuerzo operativo cuando se combinan permisos de Glue Data Catalog, S3 y Athena.\n\nOpción B: Almacenar usuarios y campañas en DynamoDB y usar DynamoDB Streams + Lambda para actualizar políticas de bucket S3 es una solución totalmente custom, con alta complejidad operativa y de mantenimiento (sincronización de estado, gestión de errores, límites de tamaño de política de bucket).\n\nOpción C (Correcta): AWS Lake Formation permite autorizar a Glue a acceder al bucket S3 y usar LF-Tags (Lake Formation tag-based access control, LF-TBAC) para mapear ingenieros de ML a etiquetas de campaña. Esto centraliza la gestión de permisos de forma declarativa y granular (a nivel de base de datos, tabla o columna) sin tener que mantener políticas IAM o de bucket individuales por campaña, siendo la opción de menor esfuerzo operativo para escalar el control de acceso a través de Athena y S3.\n\nOpción D: Configurar políticas de bucket S3 directamente para restringir el acceso por campaña no permite un control fino compatible con el acceso vía Athena/Glue Data Catalog y se vuelve inmanejable a medida que crecen las campañas.\n\nReferencias:\nhttps://docs.aws.amazon.com/lake-formation/latest/dg/tag-based-access-control.html\nhttps://docs.aws.amazon.com/lake-formation/latest/dg/managing-tags.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20043,
    "questionNumber": 43,
    "question": "An ML engineer needs to use data with Amazon SageMaker Canvas to train an ML model. The data is stored in Amazon S3 and is complex in structure. The ML engineer must use a file format that minimizes processing time for the data. Which file format will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "CSV files compressed with Snappy",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "JSON objects in JSONL format",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "JSON files compressed with gzip",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Apache Parquet files",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: CSV comprimido con Snappy sigue siendo un formato de fila (row-based) sin esquema tipado, por lo que aunque se comprima, el motor de lectura debe procesar fila a fila y no aprovecha la poda de columnas (column pruning), siendo menos eficiente para datos complejos.\n\nOpción B: JSONL (JSON Lines) es un formato basado en texto, sin compresión nativa ni almacenamiento columnar, por lo que su procesamiento es más costoso en CPU y E/S para estructuras complejas.\n\nOpción C: JSON comprimido con gzip mejora el tamaño en disco, pero sigue siendo un formato basado en filas/texto que debe deserializarse por completo, sin beneficios de lectura columnar.\n\nOpción D (Correcta): Apache Parquet es un formato binario columnar que SageMaker Canvas admite para importar datos tabulares, optimizado para operaciones de big data: permite leer solo las columnas necesarias, incluye metadatos de esquema y comprime eficientemente datos anidados/complejos, minimizando el tiempo de procesamiento frente a formatos basados en filas como CSV o JSON.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-import-dataset.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/timeseries-forecasting-data-format.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20044,
    "questionNumber": 44,
    "question": "An ML engineer is evaluating several ML models and must choose one model to use in production. The cost of false negative predictions by the models is much higher than the cost of false positive predictions. Which metric finding should the ML engineer prioritize the MOST when choosing the model?",
    "choices": [
      {
        "letter": "A",
        "text": "Low precision",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "High precision",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Low recall",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "High recall",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Priorizar 'baja precisión' no tiene sentido como objetivo; una precisión baja implica muchos falsos positivos, lo cual no es el problema que se busca minimizar aquí.\n\nOpción B: Una precisión alta reduce los falsos positivos, pero no garantiza minimizar los falsos negativos, que es el error más costoso en este escenario.\n\nOpción C: Un recall bajo significa que el modelo falla en detectar muchos casos positivos reales, es decir, genera más falsos negativos, justo el error que se quiere evitar. Priorizar recall bajo sería contraproducente.\n\nOpción D (Correcta): El recall (sensibilidad) se calcula como TP/(TP+FN); maximizarlo minimiza los falsos negativos. Según la documentación de AWS sobre el trade-off precision-recall (usada en AWS Glue FindMatches, aplicable al concepto general de clasificación), cuando el costo de no detectar un caso positivo real (falso negativo) es mayor que el costo de una falsa alarma (falso positivo), se debe favorecer el recall. Por tanto, un modelo con alto recall es el que se debe priorizar.\n\nReferencias:\nhttps://docs.aws.amazon.com/glue/latest/dg/machine-learning-precision-recall-tradeoff.html\nhttps://docs.aws.amazon.com/machine-learning/latest/dg/binary-model-insights.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20045,
    "questionNumber": 45,
    "question": "A company has trained and deployed an ML model by using Amazon SageMaker. The company needs to implement a solution to record and monitor all the API call events for the SageMaker endpoint. The solution also must provide a notification when the number of API call events breaches a threshold. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use SageMaker Debugger to track the inferences and to report metrics. Create a custom rule to provide a notification when the threshold is breached.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use SageMaker Debugger to track the inferences and to report metrics. Use the tensor_variance built-in rule to provide a notification when the threshold is breached.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Log all the endpoint invocation API events by using AWS CloudTrail. Use an Amazon CloudWatch dashboard for monitoring. Set up a CloudWatch alarm to provide notification when the threshold is breached.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Add the Invocations metric to an Amazon CloudWatch dashboard for monitoring. Set up a CloudWatch alarm to provide notification when the threshold is breached.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: SageMaker Debugger está diseñado para depurar y perfilar trabajos de entrenamiento (tensores, gradientes, utilización de recursos durante el training), no para registrar ni monitorizar llamadas a la API del endpoint de inferencia en producción.\n\nOpción B: Igual que la opción A, el built-in rule tensor_variance de Debugger analiza tensores durante el entrenamiento; no aplica a la monitorización de eventos de API de un endpoint.\n\nOpción C (Correcta): AWS CloudTrail registra todas las llamadas a la API de SageMaker (incluidas las invocaciones al endpoint, InvokeEndpoint, y otras operaciones de gestión) como eventos de management y de datos. Combinando CloudTrail con un dashboard de Amazon CloudWatch para visualizar esos eventos y una alarma de CloudWatch sobre la métrica de eventos, se cumple el requisito de 'registrar y monitorizar TODOS los eventos de llamada a la API' con notificación al superar un umbral.\n\nOpción D: La métrica Invocations de CloudWatch solo cuenta las invocaciones al endpoint (InvokeEndpoint), no todas las llamadas API relacionadas con el endpoint (por ejemplo, UpdateEndpoint, DescribeEndpoint, etc.), por lo que no cumple el requisito de registrar 'todos' los eventos de llamada a la API; además CloudWatch por sí solo no constituye un registro (log) completo de eventos de API como lo hace CloudTrail.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/logging-using-cloudtrail.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20046,
    "questionNumber": 46,
    "question": "A company has AWS Glue data processing jobs that are orchestrated by an AWS Glue workflow. The AWS Glue jobs can run on a schedule or can be launched manually. The company is developing pipelines in Amazon SageMaker Pipelines for ML model development. The pipelines will use the output of the AWS Glue jobs during the data processing phase of model development. An ML engineer needs to implement a solution that integrates the AWS Glue jobs with the pipelines. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Step Functions for orchestration of the pipelines and the AWS Glue jobs.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use processing steps in SageMaker Pipelines. Configure inputs that point to the Amazon Resource Names (ARNs) of the AWS Glue jobs.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Callback steps in SageMaker Pipelines to start the AWS Glue workflow and to stop the pipelines until the AWS Glue jobs finish running.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use Amazon EventBridge to invoke the pipelines and the AWS Glue jobs in the desired order.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Usar AWS Step Functions para orquestar tanto los pipelines de SageMaker como los jobs de Glue añade una capa de orquestación adicional y separada de SageMaker Pipelines, incrementando la complejidad operativa al tener que gestionar dos sistemas de orquestación en paralelo.\n\nOpción B: Un processing step en SageMaker Pipelines ejecuta un SageMaker Processing Job; no está diseñado para invocar ni esperar la finalización de un AWS Glue Workflow externo simplemente pasándole el ARN del job de Glue como 'input', ya que un processing step no tiene esa integración nativa con Glue.\n\nOpción C (Correcta): El Callback step de SageMaker Pipelines está diseñado específicamente para integrar procesos externos y otros servicios de AWS (como AWS Glue) dentro de un pipeline: el step envía un mensaje a una cola de Amazon SQS (que puede iniciar el AWS Glue Workflow) y detiene la ejecución del pipeline hasta que se recibe un token de éxito o fallo (SendPipelineExecutionStepSuccess/Failure) cuando el job de Glue finaliza. Esto permite reutilizar el workflow de Glue ya existente con el mínimo esfuerzo de integración.\n\nOpción D: Usar Amazon EventBridge para invocar pipelines y jobs de Glue en un orden determinado no proporciona de forma nativa un mecanismo de espera bloqueante (el pipeline no esperaría automáticamente a que termine el job de Glue), por lo que se necesitaría lógica adicional para sincronizar ambos procesos, aumentando el overhead operativo frente al Callback step.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/build-and-manage-steps-types.html\nhttps://docs.aws.amazon.com/sagemaker/latest/APIReference/API_SendPipelineExecutionStepSuccess.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20047,
    "questionNumber": 47,
    "question": "A company is using an Amazon Redshift database as its single data source. Some of the data is sensitive. A data scientist needs to use some of the sensitive data from the database. An ML engineer must give the data scientist access to the data without transforming the source data and without storing anonymized data in the database. Which solution will meet these requirements with the LEAST implementation effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure dynamic data masking policies to control how sensitive data is shared with the data scientist at query time.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a materialized view with masking logic on top of the database. Grant the necessary read permissions to the data scientist.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Unload the Amazon Redshift data to Amazon S3. Use Amazon Athena to create schema-on-read with masking logic. Share the view with the data scientist.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Unload the Amazon Redshift data to Amazon S3. Create an AWS Glue job to anonymize the data. Share the dataset with the data scientist.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Amazon Redshift Dynamic Data Masking (DDM) permite definir políticas de enmascaramiento que se aplican en tiempo de consulta (query time), sin transformar ni duplicar los datos de origen almacenados. Esto cumple ambos requisitos ('sin transformar los datos de origen' y 'sin almacenar datos anonimizados') con el mínimo esfuerzo de implementación, ya que solo requiere crear y adjuntar una masking policy.\n\nOpción B: Crear una vista materializada con lógica de enmascaramiento implica generar y almacenar una copia física (materializada) de los datos con la lógica aplicada, lo que introduce duplicación de datos y overhead de mantenimiento (refresco de la vista), contradiciendo el espíritu de mínimo esfuerzo y no queriendo almacenar una copia enmascarada.\n\nOpción C: Descargar los datos a S3 y usar Athena con schema-on-read para aplicar el enmascaramiento requiere mover los datos fuera de Redshift, crear infraestructura adicional (catálogo, vistas de Athena) y mantener sincronización, lo cual es mucho más esfuerzo de implementación.\n\nOpción D: Descargar a S3 y usar un job de AWS Glue para anonimizar los datos crea una copia transformada y anonimizada de los datos, violando el requisito de 'sin transformar los datos de origen' y 'sin almacenar datos anonimizados', además de requerir desarrollo y mantenimiento de un job de Glue.\n\nReferencias:\nhttps://docs.aws.amazon.com/redshift/latest/dg/t_ddm.html\nhttps://docs.aws.amazon.com/redshift/latest/dg/ddm-example.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20048,
    "questionNumber": 48,
    "question": "An ML engineer is using a training job to fine-tune a deep learning model in Amazon SageMaker Studio. The ML engineer previously used the same pre-trained model with a similar dataset. The ML engineer expects vanishing gradient, underutilized GPU, and overfitting problems. The ML engineer needs to implement a solution to detect these issues and to react in predefined ways when the issues occur. The solution also must provide comprehensive real-time metrics during the training. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Use TensorBoard to monitor the training job. Publish the findings to an Amazon Simple Notification Service (Amazon SNS) topic. Create an AWS Lambda function to consume the findings and to initiate the predefined actions.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon CloudWatch default metrics to gain insights about the training job. Use the metrics to invoke an AWS Lambda function to initiate the predefined actions.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Expand the metrics in Amazon CloudWatch to include the gradients in each training step. Use the metrics to invoke an AWS Lambda function to initiate the predefined actions.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use SageMaker Debugger built-in rules to monitor the training job. Configure the rules to initiate the predefined actions.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: TensorBoard permite visualizar métricas de entrenamiento, pero no incluye de forma nativa un sistema de reglas para detectar automáticamente vanishing gradient, GPU subutilizada u overfitting; habría que construir manualmente la lógica de detección antes de publicar a SNS, lo que aumenta el overhead operativo.\n\nOpción B: El uso de CloudWatch con las métricas por defecto no proporciona visibilidad a nivel de tensor (gradientes, pesos) necesaria para detectar vanishing gradient u overfitting; las métricas por defecto son de sistema (CPU, memoria, GPU básico), no de diagnóstico profundo del modelo.\n\nOpción C: Ampliar manualmente las métricas de CloudWatch para incluir los gradientes de cada paso de entrenamiento requeriría instrumentar el código de entrenamiento y publicar métricas personalizadas, lo cual es un desarrollo adicional significativo comparado con una solución integrada.\n\nOpción D (Correcta): Amazon SageMaker Debugger incluye built-in rules (por ejemplo VanishingGradient, Overfit, Overtraining, LowGPUUtilization) que analizan automáticamente los tensores del trabajo de entrenamiento en tiempo real y pueden configurarse para ejecutar acciones predefinidas (como detener el job o notificar) cuando se activan, cumpliendo el requisito de detectar estos problemas específicos y reaccionar de forma predefinida con el mínimo esfuerzo operativo, ya que no requiere desarrollo de lógica de detección personalizada.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/debugger-built-in-rules.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/use-debugger-built-in-rules.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20049,
    "questionNumber": 49,
    "question": "A credit card company has a fraud detection model in production on an Amazon SageMaker endpoint. The company develops a new version of the model. The company needs to assess the new model's performance by using live data and without affecting production end users. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up SageMaker Debugger and create a custom rule.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Set up blue/green deployments with all-at-once traffic shifting.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Set up blue/green deployments with canary traffic shifting.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Set up shadow testing with a shadow variant of the new model.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: SageMaker Debugger con una regla personalizada está orientado a depurar trabajos de entrenamiento (tensores, gradientes), no a comparar el rendimiento de dos modelos ya desplegados con tráfico de inferencia en vivo.\n\nOpción B: Un despliegue blue/green con traffic shifting 'all-at-once' dirige inmediatamente el 100% del tráfico de producción al nuevo modelo, afectando directamente a los usuarios finales si el nuevo modelo tiene un rendimiento peor; no cumple el requisito de 'sin afectar a los usuarios finales de producción'.\n\nOpción C: Un despliegue blue/green con canary también desvía una parte real del tráfico de producción (y por tanto de las respuestas a usuarios reales) hacia el nuevo modelo, afectando a un subconjunto de usuarios finales.\n\nOpción D (Correcta): Shadow testing en SageMaker despliega una 'variante sombra' (shadow variant) que recibe una copia (réplica) del tráfico de inferencia en vivo dirigido a la variante de producción; las respuestas de la variante sombra se registran y comparan pero NUNCA se devuelven a los usuarios finales, que siguen recibiendo únicamente las respuestas del modelo de producción. Esto permite evaluar el nuevo modelo con datos reales sin ningún impacto en los usuarios de producción.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-validation.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20050,
    "questionNumber": 50,
    "question": "A company stores time-series data about user clicks in an Amazon S3 bucket. The raw data consists of millions of rows of user activity every day. ML engineers access the data to develop their ML models. The ML engineers need to generate daily reports and analyze click trends over the past 3 days by using Amazon Athena. The company must retain the data for 30 days before archiving the data. Which solution will provide the HIGHEST performance for data retrieval?",
    "choices": [
      {
        "letter": "A",
        "text": "Keep all the time-series data without partitioning in the S3 bucket. Manually move data that is older than 30 days to separate S3 buckets.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create AWS Lambda functions to copy the time-series data into separate S3 buckets. Apply S3 Lifecycle policies to archive data that is older than 30 days to S3 Glacier Flexible Retrieval.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Organize the time-series data into partitions by date prefix in the S3 bucket. Apply S3 Lifecycle policies to archive partitions that are older than 30 days to S3 Glacier Flexible Retrieval.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Put each day's time-series data into its own S3 bucket. Use S3 Lifecycle policies to archive S3 buckets that hold data that is older than 30 days to S3 Glacier Flexible Retrieval.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Mantener todos los datos sin particionar y mover manualmente los datos antiguos a otros buckets obliga a Athena a escanear todo el conjunto de datos en cada consulta (sin poda de partición), siendo la opción de peor rendimiento, además de requerir intervención manual recurrente.\n\nOpción B: Copiar los datos con funciones Lambda a buckets separados no organiza los datos en particiones consultables de forma nativa por Athena de manera eficiente para consultas por rango de fechas, y añade complejidad de sincronización adicional.\n\nOpción C (Correcta): Organizar los datos en particiones por prefijo de fecha en S3 permite que Athena realice partition pruning, escaneando únicamente las particiones (días) relevantes para los informes diarios y el análisis de los últimos 3 días, maximizando el rendimiento de las consultas. Aplicar políticas de ciclo de vida de S3 sobre esas particiones para archivarlas a S3 Glacier Flexible Retrieval tras 30 días es la forma estándar y de bajo mantenimiento de gestionar el archivado sin afectar el rendimiento de las consultas recientes.\n\nOpción D: Crear un bucket S3 distinto por cada día es una práctica desaconsejada operativamente (gestión de cientos de buckets, límites de cuenta, necesidad de reconfigurar la tabla de Athena/Glue Data Catalog para múltiples ubicaciones), y no ofrece ventajas de rendimiento sobre el particionado dentro de un mismo bucket.\n\nReferencias:\nhttps://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html\nhttps://docs.aws.amazon.com/whitepapers/latest/cost-modeling-data-lakes/overview-of-cost-optimization.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20051,
    "questionNumber": 51,
    "question": "A company has deployed an ML model that detects fraudulent credit card transactions in real time in a banking application. The model uses Amazon SageMaker Asynchronous Inference. Consumers are reporting delays in receiving the inference results. An ML engineer needs to implement a solution to improve the inference performance. The solution also must provide a notification when a deviation in model quality occurs. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use SageMaker real-time inference for inference. Use SageMaker Model Monitor for notifications about model quality.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use SageMaker batch transform for inference. Use SageMaker Model Monitor for notifications about model quality.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use SageMaker Serverless Inference for inference. Use SageMaker Inference Recommender for notifications about model quality.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Keep using SageMaker Asynchronous Inference for inference. Use SageMaker Inference Recommender for notifications about model quality.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): SageMaker Asynchronous Inference está diseñado para cargas de trabajo con payloads grandes o tiempos de procesamiento largos, encolando las solicitudes; esto introduce latencia adicional inherente al modelo de colas, lo cual explica los retrasos reportados en un caso de detección de fraude en tiempo real. Migrar a un endpoint de inferencia en tiempo real (real-time inference) elimina esa latencia de cola al servir las peticiones de forma síncrona e inmediata. Combinarlo con SageMaker Model Monitor permite detectar automáticamente desviaciones en la calidad del modelo (data/model quality drift) y generar notificaciones (vía Amazon CloudWatch/SNS) cuando se detecta una desviación, cumpliendo ambos requisitos.\n\nOpción B: SageMaker Batch Transform está pensado para inferencia por lotes offline sobre grandes volúmenes de datos, no para inferencia en tiempo real de transacciones individuales; introduciría más retraso, no menos.\n\nOpción C: SageMaker Serverless Inference es adecuado para tráfico intermitente/impredecible pero sufre de 'cold starts' (arranques en frío) que pueden introducir latencia variable, y la opción menciona incorrectamente a 'SageMaker Inference Recommender' como mecanismo de notificación, cuando Inference Recommender es una herramienta de benchmarking de tipos de instancia, no de monitorización de calidad del modelo ni de generación de alertas de drift.\n\nOpción D: Mantener la inferencia asíncrona no resuelve el problema de retraso reportado por los usuarios, y además Inference Recommender no proporciona notificaciones de desviación de calidad del modelo (esa es la función de Model Monitor).\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/async-inference.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model-options.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20052,
    "questionNumber": 52,
    "question": "An ML engineer needs to implement a solution to host a trained ML model. The rate of requests to the model will be inconsistent throughout the day. The ML engineer needs a scalable solution that minimizes costs when the model is not in use. The solution also must maintain the model's capacity to respond to requests during times of peak usage. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create AWS Lambda functions that have fixed concurrency to host the model. Configure the Lambda functions to automatically scale based on the number of requests to the model.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy the model on an Amazon Elastic Container Service (Amazon ECS) cluster that uses AWS Fargate. Set a static number of tasks to handle requests during times of peak usage.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy the model to an Amazon SageMaker endpoint. Deploy multiple copies of the model to the endpoint. Create an Application Load Balancer to route traffic between the different copies of the model at the endpoint.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy the model to an Amazon SageMaker endpoint. Create SageMaker endpoint auto scaling policies that are based on Amazon CloudWatch metrics to adjust the number of instances dynamically.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: AWS Lambda con concurrencia fija no es coherente con 'concurrencia fija' + 'autoescalado automático' (son contradictorios en la misma opción), y Lambda no es la plataforma nativa recomendada por AWS para hospedar modelos de ML de SageMaker con necesidades de autoescalado basadas en métricas del propio modelo.\n\nOpción B: Desplegar en un clúster de Amazon ECS con Fargate pero fijando un número estático de tareas no cumple el requisito de minimizar costes cuando el modelo no está en uso, ya que el número de tareas permanece fijo independientemente de la demanda.\n\nOpción C: Desplegar múltiples copias del modelo en un único endpoint de SageMaker detrás de un Application Load Balancer no es el patrón soportado; SageMaker ya gestiona el balanceo de tráfico entre las instancias de un endpoint internamente, y esta arquitectura no proporciona escalado a coste mínimo en periodos de inactividad.\n\nOpción D (Correcta): SageMaker admite políticas de Application Auto Scaling sobre los endpoints, basadas en métricas de Amazon CloudWatch (como InvocationsPerInstance o CPUUtilization), que ajustan dinámicamente el número de instancias hacia arriba en picos de uso y hacia abajo (minimizando el número de instancias) cuando el tráfico es bajo, cumpliendo el requisito de minimizar costes sin sacrificar la capacidad de respuesta en momentos de alta demanda.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling-policy.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling-add-code-define.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20053,
    "questionNumber": 53,
    "question": "A company uses Amazon SageMaker Studio to develop an ML model. The company has a single SageMaker Studio domain. An ML engineer needs to implement a solution that provides an automated alert when SageMaker compute costs reach a specific threshold. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Add resource tagging by editing the SageMaker user profile in the SageMaker domain. Configure AWS Cost Explorer to send an alert when the threshold is reached.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Add resource tagging by editing the SageMaker user profile in the SageMaker domain. Configure AWS Budgets to send an alert when the threshold is reached.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Add resource tagging by editing each user's IAM profile. Configure AWS Cost Explorer to send an alert when the threshold is reached.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Add resource tagging by editing each user's IAM profile. Configure AWS Budgets to send an alert when the threshold is reached.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Aunque el etiquetado en el perfil de usuario de SageMaker es correcto, AWS Cost Explorer está diseñado para el análisis histórico y la visualización de costes; no incluye un mecanismo de alerta/notificación automática cuando se alcanza un umbral, por lo que no cumple el requisito de 'alerta automatizada'.\n\nOpción B (Correcta): Añadir etiquetas de recursos editando el perfil de usuario de SageMaker dentro del dominio permite la propagación de esas etiquetas a los recursos de cómputo asociados (instancias de notebook, jobs, endpoints) para la atribución de costes. AWS Budgets sí permite configurar umbrales de coste (filtrados, entre otros criterios, por etiquetas de asignación de costes) y enviar notificaciones automáticas cuando se alcanza el umbral, cumpliendo exactamente el requisito planteado.\n\nOpción C: Editar el perfil IAM de cada usuario para añadir etiquetas no es el mecanismo soportado por SageMaker para el etiquetado de recursos de un dominio/perfil de usuario destinado a atribución de costes de sus recursos de cómputo asociados; el etiquetado relevante se gestiona a nivel del recurso UserProfile del dominio de SageMaker, no del perfil IAM. Además usa Cost Explorer, que no ofrece alertas automáticas.\n\nOpción D: Igual que C en el etiquetado incorrecto (perfil IAM en lugar de perfil de usuario de SageMaker), aunque sí usa Budgets correctamente para la alerta.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/domain-multiple-tag.html\nhttps://docs.aws.amazon.com/whitepapers/latest/sagemaker-studio-admin-best-practices/cost-attribution.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20054,
    "questionNumber": 54,
    "question": "A company uses Amazon SageMaker for its ML workloads. The company's ML engineer receives a 50 MB Apache Parquet data file to build a fraud detection model. The file includes several correlated columns that are not required. What should the ML engineer do to drop the unnecessary columns in the file with the LEAST effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Download the file to a local workstation. Perform one-hot encoding by using a custom Python script.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Apache Spark job that uses a custom processing script on Amazon EMR.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a SageMaker processing job by calling the SageMaker Python SDK.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a data flow in SageMaker Data Wrangler. Configure a transform step.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Descargar el archivo a una estación de trabajo local y aplicar one-hot encoding con un script Python personalizado no soluciona directamente el problema planteado (eliminar columnas correlacionadas innecesarias, no codificar categóricas) y requiere desarrollo manual de código, mayor esfuerzo que usar una herramienta visual integrada.\n\nOpción B: Crear un job de Apache Spark con un script de procesamiento personalizado en Amazon EMR implica levantar y gestionar un clúster EMR y escribir código Spark, lo cual es un esfuerzo operativo y de desarrollo mucho mayor para una tarea simple de eliminar columnas.\n\nOpción C: Crear un processing job de SageMaker llamando al SDK de Python de SageMaker requiere escribir y desplegar código de procesamiento personalizado, más esfuerzo que una solución de arrastrar y soltar.\n\nOpción D (Correcta): SageMaker Data Wrangler permite crear un flujo de datos (data flow) visual sobre el archivo Parquet e incluye transforms predefinidos (Manage Columns) para eliminar columnas específicas sin escribir código, siendo la forma de menor esfuerzo para eliminar columnas innecesarias.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20055,
    "questionNumber": 55,
    "question": "A company is creating an application that will recommend products for customers to purchase. The application will make API calls to Amazon Q Business. The company must ensure that responses from Amazon Q Business do not include the name of the company's main competitor. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the competitor's name as a blocked phrase in Amazon Q Business.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure an Amazon Q Business retriever to exclude the competitor's name.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure an Amazon Kendra retriever for Amazon Q Business to build indexes that exclude the competitor's name.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure document attribute boosting in Amazon Q Business to deprioritize the competitor's name.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Amazon Q Business permite configurar 'blocked phrases' (frases bloqueadas) como parte de sus controles globales (guardrails). Cualquier frase configurada como bloqueada (por ejemplo, el nombre del competidor) es excluida automáticamente de las respuestas del chat, independientemente de si esa información proviene de los documentos indexados o de la generación del modelo, cumpliendo el requisito de forma directa y sencilla mediante la API/consola (BlockedPhrasesConfiguration).\n\nOpción B: Amazon Q Business no ofrece una función de 'retriever' configurable para excluir términos específicos de las respuestas; el retriever se encarga de la recuperación de documentos relevantes (Kendra o el índice nativo), no del filtrado de texto en la respuesta final.\n\nOpción C: Configurar un retriever de Amazon Kendra para construir índices que excluyan el nombre del competidor implicaría eliminar del índice cualquier documento con ese término (o post-procesarlo), lo que es un enfoque indirecto, incompleto (el modelo generativo podría igualmente mencionar el nombre por conocimiento propio) y de mayor complejidad que usar el control nativo de frases bloqueadas.\n\nOpción D: El document attribute boosting solo reordena la relevancia de los documentos recuperados (los prioriza o despriorriza), pero no impide que el nombre del competidor aparezca en la respuesta si el documento aun así se usa como fuente.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/guardrails-global-controls.html\nhttps://docs.aws.amazon.com/amazonq/latest/api-reference/API_BlockedPhrasesConfiguration.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20056,
    "questionNumber": 56,
    "question": "An ML engineer needs to use Amazon SageMaker to fine-tune a large language model (LLM) for text summarization. The ML engineer must follow a low-code no-code (LCNC) approach. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use SageMaker Studio to fine-tune an LLM that is deployed on Amazon EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use SageMaker Autopilot to fine-tune an LLM that is deployed by a custom API endpoint.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use SageMaker Autopilot to fine-tune an LLM that is deployed on Amazon EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use SageMaker Autopilot to fine-tune an LLM that is deployed by SageMaker JumpStart.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Usar SageMaker Studio para ajustar un LLM desplegado en instancias EC2 implica escribir y ejecutar código de entrenamiento/fine-tuning manualmente, lo cual no es un enfoque low-code/no-code (LCNC).\n\nOpción B: SageMaker Autopilot sí sigue un enfoque LCNC para el fine-tuning (se especifica el dataset y el modelo base sin escribir código de entrenamiento), pero el resultado no se despliega mediante 'un endpoint de API personalizado'; el flujo estándar de Autopilot para LLMs despliega el modelo ajustado a través de un endpoint de inferencia en tiempo real basado en los modelos ofrecidos por SageMaker JumpStart, no mediante un endpoint construido a medida.\n\nOpción C: Desplegar en instancias EC2 tampoco es el mecanismo de despliegue nativo de Autopilot; Autopilot integra el despliegue con la infraestructura gestionada de SageMaker (endpoints), no con instancias EC2 gestionadas manualmente.\n\nOpción D (Correcta): La API de Autopilot para fine-tuning de LLMs (CreateAutoMLJobV2) permite ajustar modelos de texto generativo 'powered by JumpStart' sin escribir código de entrenamiento (LCNC), y estos modelos ajustados se despliegan típicamente en un endpoint de inferencia en tiempo real construido sobre los mismos contenedores/modelos de SageMaker JumpStart, siendo el flujo LCNC soportado oficialmente por AWS para el fine-tuning de LLMs en SageMaker.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-llms-finetuning-models.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-llms-finetuning-deploy-models.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/use-auto-ml.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20057,
    "questionNumber": 57,
    "question": "A company has an ML model that needs to run one time each night to predict stock values. The model input is 3 MB of data that is collected during the current day. The model produces the predictions for the next day. The prediction process takes less than 1 minute to finish running. How should the company deploy the model on Amazon SageMaker to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use a multi-model serverless endpoint. Enable caching.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use an asynchronous inference endpoint. Set the InitialInstanceCount parameter to 0.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use a real-time endpoint. Configure an auto scaling policy to scale the model to 0 when the model is not in use.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use a serverless inference endpoint. Set the MaxConcurrency parameter to 1.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: No existe un 'multi-model serverless endpoint con caching' como opción de configuración estándar de SageMaker para este caso de uso (el caching de resultados de inferencia no es una característica nativa expuesta así, y multi-model endpoints están orientados a hospedar múltiples modelos, no a este escenario de una sola predicción diaria).\n\nOpción B: Un endpoint de inferencia asíncrona (Asynchronous Inference) requiere igualmente aprovisionar instancias para atender las solicitudes en cola (InitialInstanceCount debe ser al menos 1 en la configuración del endpoint); no admite establecer InitialInstanceCount a 0 como mecanismo de ahorro, por lo que sigue incurriendo en coste de instancia incluso cuando no hay solicitudes, además de añadir latencia de cola innecesaria para esta carga puntual y ligera (3 MB, menos de 1 minuto).\n\nOpción C: Un endpoint en tiempo real con auto scaling a 0 sigue requiriendo al menos una instancia activa mientras hay tráfico y añade la complejidad de gestionar políticas de escalado, resultando en más overhead que un endpoint serverless para una carga de trabajo tan esporádica (una vez por noche).\n\nOpción D (Correcta): Un endpoint de SageMaker Serverless Inference no requiere aprovisionar ni gestionar instancias: escala automáticamente a cero cuando no se usa (sin coste de cómputo en reposo) y se activa on-demand para procesar la solicitud. Configurar MaxConcurrency (por ejemplo a 1) es apropiado porque solo se necesita procesar una única predicción concurrente cada noche, minimizando el coste y el esfuerzo de gestión para esta carga breve, ligera e infrecuente.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-sagemaker-endpointconfig-serverlessconfig.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20058,
    "questionNumber": 58,
    "question": "An ML engineer trained an ML model on Amazon SageMaker to detect automobile accidents from dosed-circuit TV footage. The ML engineer used SageMaker Data Wrangler to create a training dataset of images of accidents and non-accidents. The model performed well during training and validation. However, the model is underperforming in production because of variations in the quality of the images from various cameras. Which solution will improve the model's accuracy in the LEAST amount of time?",
    "choices": [
      {
        "letter": "A",
        "text": "Collect more images from all the cameras. Use Data Wrangler to prepare a new training dataset.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Recreate the training dataset by using the Data Wrangler corrupt image transform. Specify the impulse noise option.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Recreate the training dataset by using the Data Wrangler enhance image contrast transform. Specify the Gamma contrast option.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Recreate the training dataset by using the Data Wrangler resize image transform. Crop all images to the same size.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Recopilar más imágenes de todas las cámaras y preparar un nuevo dataset con Data Wrangler podría ayudar a largo plazo, pero requiere un esfuerzo considerable de recolección y etiquetado de nuevos datos, lo cual no es la solución de menor tiempo posible.\n\nOpción B: El transform CorruptImage de Data Wrangler (que incluye la opción impulse noise) añade ruido artificial a las imágenes como técnica de aumento de datos (data augmentation) para hacer el modelo más robusto frente a ruido/interferencias, pero no corrige ni normaliza directamente las diferencias de iluminación/contraste entre cámaras que describe el problema; añadir ruido no ataca la causa raíz (variaciones de calidad/contraste), por lo que no es la corrección más directa.\n\nOpción C (Correcta): El transform EnhanceImage de Data Wrangler (confirmado en la documentación oficial junto con ResizeImage, CorruptImage, entre otros) incluye la opción de ajuste de contraste (Contrast, con tipos como Gamma), que normaliza/estandariza las diferencias de iluminación y contraste entre imágenes provenientes de distintas cámaras. Al atacar directamente la causa del problema (variaciones de calidad de imagen entre cámaras) mediante un transform visual ya disponible en Data Wrangler (sin necesidad de recolectar más datos ni escribir código), es la solución que mejora la precisión del modelo con el menor tiempo de implementación.\n\nOpción D: Redimensionar y recortar todas las imágenes al mismo tamaño (resize/crop) soluciona un problema de dimensiones, no de calidad de imagen (contraste, iluminación, ruido), por lo que no aborda la causa del bajo rendimiento descrita en el escenario.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20059,
    "questionNumber": 59,
    "question": "A company has an application that uses different APIs to generate embeddings for input text. The company needs to implement a solution to automatically rotate the API tokens every 3 months. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Store the tokens in AWS Secrets Manager. Create an AWS Lambda function to perform the rotation.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Store the tokens in AWS Systems Manager Parameter Store. Create an AWS Lambda function to perform the rotation.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Store the tokens in AWS Key Management Service (AWS KMS). Use an AWS managed key to perform the rotation.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Store the tokens in AWS Key Management Service (AWS KMS). Use an AWS owned key to perform the rotation.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): AWS Secrets Manager está diseñado específicamente para almacenar secretos como tokens de API y soporta rotación automática programada mediante una función de AWS Lambda que implementa el ciclo de vida de rotación (createSecret, setSecret, testSecret, finishSecret). Se puede configurar la rotación periódica (por ejemplo cada 90 días/3 meses) de forma nativa, cumpliendo el requisito con el servicio diseñado exactamente para este propósito.\n\nOpción B: AWS Systems Manager Parameter Store puede almacenar valores de forma segura (SecureString), pero no ofrece rotación automática integrada como Secrets Manager; Parameter Store requeriría construir toda la lógica de rotación y su disparo periódico de forma completamente manual/personalizada, mayor esfuerzo que usar el servicio nativo para este fin.\n\nOpción C: AWS KMS gestiona claves de cifrado, no tokens de API de aplicaciones externas; las 'AWS managed keys' de KMS rotan automáticamente su material criptográfico interno, pero esto no tiene relación con rotar tokens de API usados para generar embeddings.\n\nOpción D: Igual que la opción C, una 'AWS owned key' de KMS es una clave gestionada por el propio servicio de AWS (no visible ni controlable directamente por la cuenta del cliente) y tampoco sirve para rotar tokens de API de aplicaciones.\n\nReferencias:\nhttps://docs.aws.amazon.com/secretsmanager/latest/userguide/api-keys-security-sensitive.html\nhttps://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_turn-on-for-other.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  }
];
