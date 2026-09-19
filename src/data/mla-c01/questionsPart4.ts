import { Question } from '../../types';

export const QUESTIONS_PART_4: Question[] = [
  {
    "id": 20178,
    "questionNumber": 178,
    "question": "An ML engineer is building a model to predict house and apartment prices. The model uses three features: Square Meters, Price, and Age of Building. The dataset has 10,000 data rows. The data includes data points for one large mansion and one extremely small apartment. The ML engineer must perform preprocessing on the dataset to ensure that the model produces accurate predictions for the typical house or apartment. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Remove the outliers and perform a log transformation on the Square Meters variable.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Keep the outliers and perform normalization on the Square Meters variable.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Remove the outliers and perform one-hot encoding on the Square Meters variable.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Keep the outliers and perform one-hot encoding on the Square Meters variable.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): La mansión enorme y el apartamento extremadamente pequeño son outliers claros que, si se mantienen, distorsionan el aprendizaje del modelo hacia casos atípicos en lugar de la vivienda \"típica\" que se quiere predecir. SageMaker Data Wrangler ofrece de forma nativa transformaciones de \"Handle Outliers\" (por ejemplo, basadas en desviación estándar o cuantiles) para detectar y eliminar estos valores extremos. Adicionalmente, variables como la superficie en metros cuadrados suelen tener una distribución con cola larga a la derecha (sesgada); aplicar una transformación logarítmica sobre Square Meters comprime el rango de valores grandes y aproxima la distribución a una forma más simétrica/normal, lo que generalmente mejora el ajuste de modelos sensibles a la escala y distribución de las features numéricas.\n\nOpción B: Mantener los outliers permite que la mansión y el apartamento extremo sigan influyendo desproporcionadamente en el modelo; la normalización (escalado a un rango, p. ej., 0-1) reescala los valores pero no elimina la distorsión que introducen los valores extremos, que seguirían comprimiendo el rango \"típico\" de valores hacia una franja muy pequeña.\n\nOpción C: Square Meters es una variable numérica continua; el one-hot encoding se aplica a variables categóricas discretas, no a variables numéricas continuas como la superficie, por lo que esta transformación no es apropiada en este contexto.\n\nOpción D: Además de mantener los outliers (mismo problema que en B), aplica una transformación (one-hot encoding) que no es adecuada para una variable numérica continua.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-transform.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20179,
    "questionNumber": 179,
    "question": "A company is developing an ML model by using Amazon SageMaker AI. The company must monitor bias in the model and must display the results on a dashboard. An ML engineer creates a bias monitoring job. How should the ML engineer capture bias metrics to display on the dashboard?",
    "choices": [
      {
        "letter": "A",
        "text": "Capture AWS CloudTrail metrics from SageMaker Clarify.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Capture Amazon CloudWatch metrics from SageMaker Clarify.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Capture SageMaker Model Monitor metrics from Amazon EventBridge.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Capture SageMaker Model Monitor metrics from Amazon Simple Notification Service (Amazon SNS).",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: AWS CloudTrail registra llamadas a la API (auditoría de quién hizo qué acción, cuándo), no métricas numéricas de sesgo del modelo; no es una fuente adecuada para alimentar un dashboard con valores de métricas de bias.\n\nOpción B (Correcta): La documentación de SageMaker (\"CloudWatch Metrics for Bias Drift Analysis\") confirma que los trabajos de monitorización de sesgo basados en SageMaker Clarify (bias drift monitoring) publican automáticamente las métricas de sesgo calculadas (con nombres del tipo bias_metric_<nombre_de_metrica>, como bias_metric_CI para Class Imbalance) en Amazon CloudWatch. Estas métricas de CloudWatch pueden visualizarse directamente en un dashboard de CloudWatch o exportarse a otra herramienta de visualización, cumpliendo exactamente el requisito planteado.\n\nOpción C: Aunque SageMaker Model Monitor puede emitir eventos a Amazon EventBridge (por ejemplo, para notificar la finalización de un trabajo o violaciones), EventBridge es un bus de eventos para orquestación/automatización, no un repositorio de series temporales de métricas apto para alimentar un dashboard de forma directa como sí lo es CloudWatch.\n\nOpción D: Amazon SNS es un servicio de notificaciones (push de mensajes/alertas), no un almacén de métricas; no está pensado para servir como fuente de datos de un dashboard de métricas de sesgo.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-monitor-bias-drift-cw.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-monitor-bias-drift.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20180,
    "questionNumber": 180,
    "question": "A company is using an Amazon SageMaker AI ML model to predict traffic accidents that potholes cause. An ML engineer has configured SageMaker Model Monitor to run as part of a SageMaker AI pipeline. In the MonitoringExecution output, the ML engineer observes several baseline_drift_check violations that are failing the pipeline. What should the ML engineer do to resolve this issue?",
    "choices": [
      {
        "letter": "A",
        "text": "Retrain the model by using a new SageMaker AI training job. Check for errors by using SageMaker Debugger.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Retrain the model with new training data. Reuse the original baseline in Model Monitor.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Retrain the model with new training data. Use the new baseline in Model Monitor.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Rerun the SageMaker AI pipeline after enabling the emit_metrics option in the baseline constraints file.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: SageMaker Debugger sirve para depurar problemas del propio proceso de entrenamiento (tensores, gradientes, cuellos de botella de recursos), no para diagnosticar ni resolver violaciones de baseline_drift_check, que se refieren a diferencias estadísticas entre la distribución actual de los datos y la del baseline; no ataca la causa raíz del problema descrito.\n\nOpción B: Reentrenar con datos nuevos sin actualizar el baseline deja vigente un baseline calculado sobre la distribución de datos antigua. Según la documentación, un \"baseline_drift_check\" señala que la distancia entre la distribución de los datos actuales y la del dataset baseline supera el umbral configurado; si el modelo se reentrena con datos que reflejan una nueva distribución (p. ej., nuevos patrones de baches/tráfico) pero se sigue comparando contra el baseline antiguo, las comprobaciones seguirán fallando de forma persistente, aunque el modelo esté correctamente actualizado.\n\nOpción C (Correcta): Cuando los datos de producción han cambiado de forma genuina y sostenida (lo que motiva las violaciones de baseline_drift_check), la práctica correcta es reentrenar el modelo con los datos nuevos y, además, recalcular y establecer un nuevo baseline de Model Monitor que refleje la distribución actualizada de los datos de entrenamiento. Así las comprobaciones de drift futuras se realizan contra un punto de referencia representativo del estado actual del modelo y los datos, evitando falsos positivos recurrentes y permitiendo que la pipeline vuelva a ejecutarse con éxito.\n\nOpción D: Habilitar emit_metrics solo controla si las violaciones se publican como métricas en CloudWatch para alertar; no resuelve la causa de las violaciones de drift ni actúa sobre el baseline o el modelo, por lo que las comprobaciones seguirían fallando en la pipeline.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-interpreting-violations.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-create-baseline.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-model-quality-baseline.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20181,
    "questionNumber": 181,
    "question": "A company uses ML models to predict whether transactions are fraudulent. The company needs to identify as many fraudulent transactions as possible. Which evaluation metric should the company use to evaluate the models to meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "F1 score",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Area Under the ROC Curve (AUC)",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Precision",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Recall",
        "isCorrect": true
      }
    ],
    "comments": "Opción A (F1 score): Incorrecta. El F1 score es la media armónica entre precisión y recall (F1 = 2*precision*recall/(precision+recall)), por lo que balancea ambas métricas a partes iguales; no maximiza específicamente la detección de todos los positivos, ya que penaliza también los falsos positivos.\n\nOpción B (AUC): Incorrecta. El AUC mide la capacidad global del modelo para separar las clases a lo largo de todos los umbrales de decisión posibles, pero no está optimizado para un objetivo de negocio concreto como \"detectar el máximo número de fraudes posible\"; es una métrica agregada de ranking, no de captura de positivos a un umbral operativo.\n\nOpción C (Precision): Incorrecta. La precisión se define como TP/(TP+FP): de todas las transacciones marcadas como fraude, qué porcentaje lo son realmente. Optimizar solo precisión favorece minimizar falsos positivos, pero puede dejar pasar (falsos negativos) muchas transacciones fraudulentas reales, justo lo contrario de lo que pide el enunciado.\n\nOpción D (Recall) - Correcta: El recall (sensibilidad) se define como TP/(TP+FN): del total de transacciones realmente fraudulentas, qué porcentaje el modelo logra identificar. Como el objetivo es \"identificar tantas transacciones fraudulentas como sea posible\", minimizando los falsos negativos, el recall es la métrica que se debe maximizar.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-metrics.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20182,
    "questionNumber": 182,
    "question": "A recommendation model uses ML and calls an Amazon SageMaker AI endpoint to get recommendations. An ML engineer must ensure that the model stays available during an expected increase in user traffic. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure auto scaling on the SageMaker AI endpoint.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a new SageMaker AI endpoint. Deploy the model to the new endpoint.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use SageMaker Neo to optimize the model for inference.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Attach an Auto Scaling group to the SageMaker AI endpoint.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Configurar auto scaling en el endpoint de SageMaker AI) - Correcta: SageMaker AI se integra con AWS Application Auto Scaling para registrar la variante de producción del endpoint como un \"scalable target\" y aplicarle una política de escalado (target tracking o step scaling) que ajusta automáticamente el número de instancias en función de la carga real, manteniendo la disponibilidad del endpoint durante picos de tráfico.\n\nOpción B (Crear un nuevo endpoint y desplegar el modelo en él): Incorrecta. Crear un endpoint adicional no resuelve el problema de un aumento de tráfico sobre el endpoint existente; añade complejidad operativa y no proporciona escalado automático.\n\nOpción C (Usar SageMaker Neo para optimizar el modelo para inferencia): Incorrecta. Neo optimiza el rendimiento de inferencia del modelo compilándolo para un hardware específico, pero no gestiona la disponibilidad ni el escalado del endpoint ante variaciones de tráfico.\n\nOpción D (Adjuntar un Auto Scaling group al endpoint): Incorrecta. Los \"Auto Scaling groups\" son un concepto de Amazon EC2, no de SageMaker AI; los endpoints de SageMaker AI no se escalan adjuntando un ASG, sino registrándolos como \"scalable target\" de Application Auto Scaling.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling-policy.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling-prerequisites.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20183,
    "questionNumber": 183,
    "question": "HOTSPOT - A hospital wants to predict patient outcomes for the coming year. An ML engineer must improve several existing ML models that currently perform poorly. Select the correct regularization method from the following list to improve each model. Select each regularization method one time, more than one time, or not at all. (Choose three.) • L1 regularization • L2 regularization • Early stopping",
    "choices": [
      {
        "letter": "A",
        "text": "L1 regularization",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "L2 regularization",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Early stopping",
        "isCorrect": true
      }
    ],
    "comments": "Nota importante: Esta pregunta es de tipo HOTSPOT (emparejar/arrastrar), y el texto scrapeado de ExamTopics no conserva las descripciones específicas de cada uno de los modelos hospitalarios a los que había que asignar cada método de regularización (el contenido original probablemente incluía una tabla o imagen no capturada por el scraper). Solo se dispone de la lista de las tres técnicas a utilizar, cada una \"una vez, más de una vez, o ninguna\" (elegir tres asignaciones en total).\n\nOpción A (L1 regularization) - Correcta (aplica a algún escenario): L1 añade una penalización proporcional al valor absoluto de los pesos, lo que fuerza a que algunos coeficientes se reduzcan exactamente a cero. Es la técnica adecuada cuando se necesita selección de variables/modelos dispersos, o reducir el tamaño de un modelo con muchas características irrelevantes.\n\nOpción B (L2 regularization) - Correcta (aplica a algún escenario): L2 (Ridge) penaliza el cuadrado de los pesos, encogiéndolos hacia cero sin anularlos por completo. Es adecuada cuando se quiere reducir la magnitud de todos los coeficientes de forma suave (por ejemplo, en regresión lineal con multicolinealidad) sin eliminar variables.\n\nOpción C (Early stopping) - Correcta (aplica a algún escenario): Consiste en detener el entrenamiento cuando la métrica de validación deja de mejorar, evitando que el modelo memorice el ruido del conjunto de entrenamiento en iteraciones tardías. Es adecuada cuando el sobreajuste se manifiesta a través de las épocas/iteraciones de entrenamiento.\n\nComo el enunciado pide seleccionar exactamente tres asignaciones a partir de esta lista de tres métodos, se marcan los tres como parte de la respuesta correcta, si bien la asignación exacta modelo-a-modelo no puede reconstruirse con certeza a partir del texto disponible en el fichero fuente.\n\nReferencias:\nhttps://docs.aws.amazon.com/machine-learning/latest/dg/training-parameters1.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-early-stopping.html",
    "category": "Model Development",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 20184,
    "questionNumber": 184,
    "question": "An ML engineer has trained an ML model by using Amazon SageMaker AI. The ML engineer determines that the model is overfitting and that the training data contains unnecessary features. The ML engineer must reduce the overfitting and the impact of the unnecessary features. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Increase the number of training iterations. Retrain the model.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Apply L1 regularization to the training data. Retrain the model.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Decrease the number of training iterations. Retrain the model.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use SageMaker Debugger to apply L1 regularization to the running model.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Aumentar el número de iteraciones de entrenamiento y reentrenar): Incorrecta. Aumentar las iteraciones tiende a ajustar aún más el modelo a los datos de entrenamiento, incrementando el riesgo de sobreajuste en lugar de reducirlo, y no elimina el impacto de las características irrelevantes.\n\nOpción B (Aplicar regularización L1 y reentrenar) - Correcta: La documentación de AWS sobre hiperparámetros de entrenamiento indica que la regularización L1 reduce el tamaño del modelo empujando a cero los pesos de las características menos relevantes, produciendo modelos dispersos (sparse). Esto combate simultáneamente el sobreajuste (al simplificar el modelo) y neutraliza el impacto de las características innecesarias (al anular sus coeficientes).\n\nOpción C (Disminuir el número de iteraciones y reentrenar): Incorrecta. Aunque una reducción drástica de iteraciones puede actuar como una forma tosca de \"early stopping\", no aborda directamente el problema de las características innecesarias, que es parte explícita del requisito.\n\nOpción D (Usar SageMaker Debugger para aplicar L1 al modelo en ejecución): Incorrecta. SageMaker Debugger es una herramienta de monitorización/depuración de tensores y reglas (por ejemplo, la regla \"Overfit\") durante el entrenamiento; no aplica regularización a un modelo ya entrenado ni modifica su función de pérdida en tiempo real. La regularización debe incorporarse en el propio proceso/algoritmo de entrenamiento.\n\nReferencias:\nhttps://docs.aws.amazon.com/machine-learning/latest/dg/training-parameters1.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/debugger-built-in-rules.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20185,
    "questionNumber": 185,
    "question": "An ML engineer wants to use Amazon SageMaker Data Wrangler to perform preprocessing on a dataset. The ML engineer wants to use the processed dataset to train a classification model. During preprocessing, the ML engineer notices that a text feature has a range of thousands of values that differ only by spelling errors. The ML engineer needs to apply an encoding method so that after preprocessing is complete, the text feature can be used to train the model. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Perform ordinal encoding to represent categories of the feature.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Perform similarity encoding to represent categories of the feature.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Perform one-hot encoding to represent categories of the feature.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Perform target encoding to represent categories of the feature.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Ordinal encoding): Incorrecta. El ordinal encoding asigna un entero distinto a cada categoría única. Con miles de valores que solo difieren por errores de escritura, este método trataría cada variante mal escrita como una categoría completamente distinta y no relacionada, sin capturar la similitud entre ellas.\n\nOpción B (Similarity encoding) - Correcta: La documentación de SageMaker Data Wrangler describe la transformación \"Similarity encode\" como un método que genera embeddings para datos categóricos convirtiendo las categorías en tokens (usando un tokenizador de 3-gramas y min-hash encoding), de forma que cadenas similares (por ejemplo, con errores de tecleo) producen vectores similares. Es exactamente el escenario descrito: miles de valores que difieren solo por errores ortográficos.\n\nOpción C (One-hot encoding): Incorrecta. Con miles de categorías distintas (una por cada variante de escritura), el one-hot encoding generaría una matriz extremadamente dispersa y de alta dimensionalidad, y tampoco agruparía las variantes con errores de escritura entre sí.\n\nOpción D (Target encoding): Incorrecta. El target encoding sustituye cada categoría por una estadística de la variable objetivo asociada a esa categoría; no resuelve el problema de fragmentación por errores de escritura, ya que cada variante seguiría siendo tratada como una categoría independiente con su propia estadística, a menudo poco fiable por baja frecuencia.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-transform.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20186,
    "questionNumber": 186,
    "question": "An ML engineer is training a text generation model on Amazon SageMaker AI. After several epochs, the loss function does not converge, and the model’s accuracy on the validation dataset starts to show oscillating results. The ML engineer needs to ensure that the model achieves generalization. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Increase the learning rate and decrease the mini-batch size.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Increase the learning rate as the number of epochs increases.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Decrease the learning rate and increase the mini-batch size.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Decrease the learning rate and decrease the mini-batch size.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Aumentar el learning rate y disminuir el tamaño del mini-batch): Incorrecta. Un learning rate más alto combinado con lotes más pequeños incrementa el ruido en la estimación del gradiente y el tamaño de las actualizaciones de pesos, lo que tiende a agravar la oscilación de la métrica de validación en lugar de estabilizarla.\n\nOpción B (Aumentar el learning rate a medida que aumentan las épocas): Incorrecta. Incrementar progresivamente el learning rate durante el entrenamiento amplifica el riesgo de que el optimizador \"salte\" sobre mínimos buenos, empeorando la convergencia y la oscilación observadas.\n\nOpción C (Disminuir el learning rate y aumentar el tamaño del mini-batch) - Correcta: Un learning rate más pequeño reduce el tamaño de las actualizaciones de pesos en cada paso, permitiendo que el algoritmo se acerque de forma más estable al óptimo; un mini-batch más grande reduce el ruido en la estimación del gradiente (al promediar sobre más ejemplos), lo que en conjunto estabiliza la pérdida de entrenamiento y reduce la oscilación de la métrica de validación, favoreciendo la generalización.\n\nOpción D (Disminuir el learning rate y disminuir el tamaño del mini-batch): Incorrecta. Aunque reducir el learning rate ayuda a estabilizar la convergencia, reducir también el tamaño del mini-batch aumenta el ruido del gradiente, lo que puede seguir produciendo oscilaciones en la validación.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/distributed-training-optimize.html\nhttps://docs.aws.amazon.com/machine-learning/latest/dg/training-parameters1.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20187,
    "questionNumber": 187,
    "question": "A company uses an NFS-based data store to store data for ML training. Linux-based systems access the data store. The company needs a hybrid system to make the shared data store accessible to on-premises servers and Amazon SageMaker AI notebooks that will consume the data. File locking is required for the data producers. Which AWS storage solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use an Amazon S3 bucket to store the data. Use Mountpoint for Amazon S3 to mount the S3 bucket to the on-premises servers and the SageMaker AI notebooks.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use an Amazon Elastic File System (Amazon EFS) file system to store the data. Mount the file system to the on-premises servers and the SageMaker AI notebooks.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use an Amazon FSx for Lustre file system to store the data. Mount the file system to the on-premises servers and the SageMaker AI notebooks.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use an Amazon Elastic Block Store (Amazon EBS) volume to store the data. Mount the volume to the on-premises servers and the SageMaker AI notebooks.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Amazon S3 + Mountpoint for Amazon S3): Incorrecta. S3 es un almacén de objetos; aunque Mountpoint for Amazon S3 permite montarlo como sistema de archivos, S3 no ofrece semántica POSIX completa ni bloqueo de archivos (file locking) requerido por productores de datos concurrentes en un sistema NFS clásico.\n\nOpción B (Amazon EFS) - Correcta: Amazon EFS es un sistema de archivos totalmente administrado que implementa el protocolo NFS (v4.0/v4.1) y, según la documentación de EFS, soporta bloqueo de archivos (\"NFS version 4 file locking\") que permite a las aplicaciones cliente NFS realizar bloqueos por rango de bytes en operaciones de lectura y escritura. EFS puede montarse simultáneamente desde servidores on-premises (vía Direct Connect/VPN) y desde notebooks de SageMaker AI en la misma VPC, cumpliendo el requisito híbrido con bloqueo de archivos.\n\nOpción C (Amazon FSx for Lustre): Incorrecta. FSx for Lustre está optimizado para cargas de trabajo de alto rendimiento y usa el protocolo Lustre (no NFS estándar); el acceso desde servidores on-premises Linux vía Lustre es más complejo/limitado que el acceso NFS que ofrece EFS, y no es la solución típica para bloqueo de archivos NFS entre on-premises y AWS.\n\nOpción D (Amazon EBS): Incorrecta. Un volumen EBS solo puede adjuntarse a una única instancia EC2 (salvo Multi-Attach, limitado a instancias Nitro en la misma zona de disponibilidad) y no puede montarse simultáneamente desde servidores on-premises, por lo que no cumple el requisito de acceso compartido híbrido.\n\nReferencias:\nhttps://docs.aws.amazon.com/efs/latest/ug/features.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20188,
    "questionNumber": 188,
    "question": "A company needs to analyze a large dataset that is stored in Amazon S3 in Apache Parquet format. The company wants to use one-hot encoding for some of the columns. The company needs a no-code solution to transform the data. The solution must store the transformed data back to the same S3 bucket for model training. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure an AWS Glue DataBrew project that connects to the data. Use the DataBrew interactive interface to create a recipe that performs the one-hot encoding transformation. Create a job to apply the transformation and to write the output back to an S3 bucket.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure an AWS Glue Data Catalog table that points to the data. Use Amazon Athena to write SQL commands to perform the one-hot encoding transformation. Configure Athena to write the query results back to an S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure an AWS Glue Data Catalog table that points to the data. Create an AWS Glue ETL interactive notebook. Use the notebook to perform the one-hot encoding transformation. Run the configured cells and write the results back to an S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure an Amazon Redshift cluster to access the data by using Redshift Spectrum. Use SQL commands to perform the one-hot encoding transformation within Amazon Redshift. Configure Amazon Redshift to write the results back to an S3 bucket.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (AWS Glue DataBrew) - Correcta: DataBrew ofrece una interfaz visual interactiva sin necesidad de escribir código (\"one-click data transformations\"), en la que se puede añadir la acción de receta ONE_HOT_ENCODING para transformar columnas categóricas, y después publicar un job de DataBrew que ejecute la receta y escriba el resultado transformado de vuelta en el mismo bucket de S3. Cumple exactamente el requisito de solución \"no-code\".\n\nOpción B (AWS Glue Data Catalog + Amazon Athena con SQL): Incorrecta. Aunque Athena puede escribir los resultados de una consulta en S3 (CTAS/INSERT INTO), requiere escribir sentencias SQL manualmente, lo que no es una solución \"no-code\".\n\nOpción C (AWS Glue Data Catalog + notebook interactivo de Glue ETL): Incorrecta. Un notebook de Glue ETL requiere escribir y ejecutar código (PySpark/Python) en las celdas, lo que tampoco es \"no-code\".\n\nOpción D (Amazon Redshift Spectrum + SQL): Incorrecta. Igual que en la opción B, requiere escribir código SQL, además de añadir la complejidad y el coste de aprovisionar/gestionar un clúster de Redshift solo para esta transformación.\n\nReferencias:\nhttps://docs.aws.amazon.com/databrew/latest/dg/recipe-actions.ONE_HOT_ENCODING.html\nhttps://docs.aws.amazon.com/databrew/latest/APIReference/Welcome.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20189,
    "questionNumber": 189,
    "question": "A company wants to migrate ML models from an on-premises environment to Amazon SageMaker AI. The models are based on the PyTorch algorithm. The company needs to reuse its existing custom scripts as much as possible on AWS. Which feature of SageMaker AI should the company use to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "SageMaker AI built-in algorithms",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "SageMaker Canvas",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "SageMaker JumpStart",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "SageMaker AI script mode",
        "isCorrect": true
      }
    ],
    "comments": "Opción A (Algoritmos integrados de SageMaker AI): Incorrecta. Los algoritmos integrados (built-in algorithms) son implementaciones predefinidas (por ejemplo, XGBoost, Linear Learner) que no permiten \"reutilizar\" un script de entrenamiento PyTorch personalizado existente; habría que reescribir la lógica de entrenamiento según la interfaz del algoritmo integrado.\n\nOpción B (SageMaker Canvas): Incorrecta. Canvas es una herramienta no-code/low-code para crear modelos de ML sin escribir código; no está pensada para ejecutar scripts de entrenamiento personalizados en PyTorch.\n\nOpción C (SageMaker JumpStart): Incorrecta. JumpStart proporciona modelos preentrenados y soluciones de referencia listas para desplegar/ajustar (fine-tuning), pero no está orientado a migrar un script de entrenamiento propietario existente manteniendo su lógica original.\n\nOpción D (SageMaker AI script mode) - Correcta: La documentación de SageMaker indica que el \"script mode\" permite escribir y ejecutar código Python de entrenamiento personalizado dentro de un framework compatible (PyTorch, TensorFlow, etc.) usando los contenedores gestionados de SageMaker AI. Esto permite a la empresa reutilizar su script de entrenamiento/inferencia de PyTorch existente con cambios mínimos, cumpliendo el requisito de máxima reutilización de código.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/algorithms-choose.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20190,
    "questionNumber": 190,
    "question": "A company uses an Amazon QuickSight dashboard to track the sale prices of sneakers over time. The dashboard aggregates sale prices scraped from many retail websites. The company wants to determine which prices are unusually high outliers and to display the outliers visually. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use a vertical bar chart to visualize the outliers. Use a calculated field in QuickSight to take the square roots of the outlier prices to generate the chart. Configure a custom AWS Lambda function to scan the data for anomalies.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Glue DataBrew to preprocess the data. Set the REMOVE_OUTLIERS operation to eliminate data rows that include unusually high prices. Invoke an AWS Lambda function to store the removed rows in Amazon DynamoDB.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use a vertical bar chart to visualize the outliers. Use a calculated field in QuickSight to square the outlier prices to generate the chart. Use QuickSight anomaly detection insights to determine which prices are unusually high.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use a QuickSight filter to find the lowest 10 values for sneaker price. Assign a specific color to the 10 lowest values.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Gráfico de barras + campo calculado con raíz cuadrada + función Lambda personalizada): Incorrecta. Requiere desarrollar y mantener una función Lambda personalizada para detectar anomalías manualmente, en lugar de usar la capacidad de detección de anomalías basada en ML nativa de QuickSight, lo que añade complejidad operativa innecesaria.\n\nOpción B (AWS Glue DataBrew con REMOVE_OUTLIERS + Lambda para guardar filas eliminadas en DynamoDB): Incorrecta. Esta opción elimina los outliers del conjunto de datos, lo que contradice el requisito de \"mostrarlos visualmente\"; además añade un pipeline de DataBrew/Lambda/DynamoDB innecesariamente complejo.\n\nOpción C (Gráfico de barras + campo calculado + QuickSight anomaly detection insights) - Correcta: Amazon QuickSight incluye de forma nativa un insight de \"ML-powered anomaly detection\" (basado en el algoritmo Random Cut Forest) que identifica automáticamente valores atípicos en una visualización sin necesidad de infraestructura adicional (Lambda, DataBrew, etc.), cumpliendo el requisito de detectar y mostrar visualmente los precios inusualmente altos con el menor esfuerzo operativo.\n\nOpción D (Filtro para mostrar los 10 valores más bajos): Incorrecta. El requisito es identificar precios \"inusualmente altos\", no los valores más bajos; además, un filtro estático de \"top/bottom N\" no es una técnica de detección de anomalías basada en la distribución de los datos.\n\nReferencias:\nhttps://docs.aws.amazon.com/quick/latest/userguide/anomaly-detection-function.html\nhttps://docs.aws.amazon.com/quick/latest/userguide/exploring-anomalies-controls.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20191,
    "questionNumber": 191,
    "question": "An ML engineer is using Amazon QuickSight anomaly detection to detect very high or very low machine operating temperatures compared to normal. The ML engineer sets the Severity parameter to Low and above. The ML engineer sets the Direction parameter to All. What effect will the ML engineer observe in the anomaly detection results if the ML engineer changes the Direction parameter to Lower than expected?",
    "choices": [
      {
        "letter": "A",
        "text": "Increased anomaly identification frequency and increased recall",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Decreased anomaly identification frequency and decreased recall",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Increased anomaly identification frequency and decreased recall",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Decreased anomaly identification frequency and increased recall",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Aumenta la frecuencia y aumenta el recall): Incorrecta. Restringir la dirección a un solo sentido reduce, no aumenta, el conjunto de valores que el detector puede marcar como anómalos.\n\nOpción B (Disminuye la frecuencia y disminuye el recall) - Correcta: Según la documentación de QuickSight, el parámetro Direction controla qué dirección se considera anómala: \"Higher than expected\" (solo valores altos), \"Lower than expected\" (solo valores bajos) o [ALL] (ambas direcciones, valor por defecto). Al cambiar de All (que capturaba tanto temperaturas anómalamente altas como bajas) a \"Lower than expected\", el detector deja de marcar como anomalías los valores anómalamente altos que antes sí detectaba. Esto reduce la frecuencia total de anomalías identificadas y también el recall respecto al objetivo original de detectar \"temperaturas muy altas o muy bajas\", ya que ahora se generan falsos negativos para todas las anomalías altas reales.\n\nOpción C (Aumenta la frecuencia y disminuye el recall): Incorrecta. La frecuencia de identificación no aumenta, disminuye, al restringir la búsqueda a una sola dirección.\n\nOpción D (Disminuye la frecuencia y aumenta el recall): Incorrecta. El recall respecto al objetivo original (detectar anomalías en ambas direcciones) no puede aumentar si se deja de buscar en una de las dos direcciones; de hecho disminuye.\n\nReferencias:\nhttps://docs.aws.amazon.com/quick/latest/userguide/exploring-anomalies-controls.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20192,
    "questionNumber": 192,
    "question": "A company runs its ML workflows on an on-premises Kubernetes cluster. The ML workflows include ML services that perform training and inferences for ML models. Each ML service runs from its own standalone Docker image. The company needs to perform a lift and shift from the on-premises Kubernetes cluster to an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. Which solution will meet this requirement with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Redesign the ML services to be configured in Kubeflow. Deploy the new Kubeflow managed ML services to the EKS cluster.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Upload the Docker images to an Amazon Elastic Container Registry (Amazon ECR) repository. Configure a deployment pipeline to deploy the images to the EKS cluster.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Migrate the training data to an Amazon Redshift cluster. Retrain the models from the migrated training data by using Amazon Redshift ML. Deploy the retrained models to the EKS cluster.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure an Amazon SageMaker AI notebook. Retrain the models with the same code. Deploy the retrained models to the EKS cluster.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Rediseñar los servicios en Kubeflow): Incorrecta. Reescribir/rediseñar los servicios de ML para Kubeflow implica un esfuerzo de desarrollo y migración significativo, lo contrario de un \"lift and shift\" con el menor esfuerzo operativo posible.\n\nOpción B (Subir las imágenes Docker a Amazon ECR y configurar un pipeline de despliegue a EKS) - Correcta: Dado que cada servicio de ML ya se ejecuta desde su propia imagen Docker independiente, la forma más directa de hacer un \"lift and shift\" (migración sin rediseño) es subir esas mismas imágenes a un repositorio de Amazon ECR y desplegarlas en el nuevo clúster EKS mediante un pipeline de CI/CD, reutilizando la lógica de contenedores existente tal cual. La documentación de migración de imágenes a Amazon ECR describe este patrón de copiar imágenes a un repositorio privado de ECR y actualizar los manifiestos de Kubernetes/EKS para referenciarlas.\n\nOpción C (Migrar los datos a Amazon Redshift y reentrenar con Redshift ML): Incorrecta. Redshift ML entrena modelos usando SQL sobre datos en Redshift; no es compatible con un \"lift and shift\" de servicios Docker de ML existentes y obligaría a reescribir por completo la lógica de entrenamiento e inferencia.\n\nOpción D (Reentrenar en un notebook de SageMaker AI con el mismo código): Incorrecta. Aunque conserva el código, reentrenar en SageMaker AI y desplegar en EKS no es un \"lift and shift\" de los contenedores Docker existentes, sino una migración de plataforma de entrenamiento distinta que añade trabajo adicional.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonECR/latest/userguide/migrate-from-third-party.html\nhttps://docs.aws.amazon.com/eks/latest/userguide/copy-image-to-repository.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20193,
    "questionNumber": 193,
    "question": "HOTSPOT - An ML engineer needs to use Amazon SageMaker hyperparameter tuning to reduce the training time for an ML model. Select and order the correct steps from the following list to meet this requirement. Each step should be selected one time or not at all. (Select and order three.) • Choose Bayesian optimization and increase the number of parameters. • Choose Hyperband tuning and decrease the number of parameters. • Choose random search and use a random seed of -1. • Deploy the model to a SageMaker endpoint. • Evaluate the change in training time. • Retrain the model.",
    "choices": [
      {
        "letter": "A",
        "text": "Choose Bayesian optimization and increase the number of parameters.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Choose Hyperband tuning and decrease the number of parameters.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Choose random search and use a random seed of -1.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy the model to a SageMaker endpoint.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Evaluate the change in training time.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Retrain the model.",
        "isCorrect": true
      }
    ],
    "comments": "Nota: Esta pregunta es de tipo HOTSPOT (ordenar pasos); se han transcrito las seis opciones tal como aparecen en el enunciado y se ha determinado, en base a la documentación de SageMaker AI sobre ajuste automático de hiperparámetros, cuáles tres corresponden a la secuencia correcta y en qué orden.\n\nOpción A (Bayesian optimization + aumentar el número de parámetros): Incorrecta. Aumentar el espacio de hiperparámetros a explorar incrementa, no reduce, el tiempo total de tuning/entrenamiento; además Bayesian optimization no incorpora parada temprana de trabajos poco prometedores.\n\nOpción B (Hyperband + disminuir el número de parámetros) - Correcta, Paso 1: La documentación de SageMaker AI sobre \"Automatic Model Tuning\" explica que la estrategia Hyperband usa parada temprana (early stopping) de los trabajos de entrenamiento con peor desempeño, liberando recursos y reduciendo drásticamente el tiempo de entrenamiento comparado con random/Bayesian search; reducir el número de hiperparámetros a explorar refuerza aún más esa reducción de tiempo.\n\nOpción C (Random search + semilla aleatoria -1): Incorrecta. El valor de la semilla aleatoria no influye en el tiempo de entrenamiento, y random search no aplica ningún mecanismo de parada temprana como Hyperband.\n\nOpción D (Desplegar el modelo en un endpoint de SageMaker): Incorrecta. El despliegue a un endpoint es un paso de inferencia, no de entrenamiento/tuning, y no aporta información sobre el tiempo de entrenamiento.\n\nOpción E (Evaluar el cambio en el tiempo de entrenamiento) - Correcta, Paso 3: Tras reentrenar con la nueva configuración de tuning, el último paso lógico es medir si el tiempo de entrenamiento efectivamente se redujo respecto a la configuración original.\n\nOpción F (Reentrenar el modelo) - Correcta, Paso 2: Después de elegir la estrategia de tuning (Hyperband con menos parámetros), se debe reentrenar/relanzar el trabajo de tuning con esa configuración antes de poder medir el resultado.\n\nOrden correcto: B (elegir Hyperband y reducir parámetros) → F (reentrenar) → E (evaluar el cambio en el tiempo de entrenamiento).\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-early-stopping.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-how-it-works.html",
    "category": "Model Development",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 20194,
    "questionNumber": 194,
    "question": "HOTSPOT - A company develops an ML model to classify products. The model uses textual data and visual data to classify the products into a hierarchical taxonomy. An ML engineer must use specific strategies to enhance the model’s accuracy and handle class imbalances. Select the correct strategy from the following list for each use case. Select each strategy one time. (Choose five.) • Categorical cross-entropy • Fallback metric • Hierarchical loss • General oversampling • Synthetic Minority Oversampling Technique (SMOTE) for text",
    "choices": [
      {
        "letter": "A",
        "text": "Categorical cross-entropy",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Fallback metric",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Hierarchical loss",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "General oversampling",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Synthetic Minority Oversampling Technique (SMOTE) for text",
        "isCorrect": true
      }
    ],
    "comments": "Nota: Esta pregunta es de tipo HOTSPOT (emparejar estrategia con caso de uso); el enunciado scrapeado no conserva la lista completa de los casos de uso específicos a los que se debía asociar cada estrategia (probablemente una tabla no capturada por el scraper), pero sí conserva la lista completa de las cinco estrategias a utilizar, cada una exactamente una vez (\"Choose five\"), por lo que las cinco deben marcarse como parte de la respuesta correcta.\n\nOpción A (Categorical cross-entropy) - Correcta: Es la función de pérdida estándar para clasificación multiclase con salidas categóricas mutuamente excluyentes, como la asignación a categorías dentro de la taxonomía de productos.\n\nOpción B (Fallback metric) - Correcta: Se usa para evaluar predicciones con tolerancia a coincidencias en categorías más amplias/generales de la jerarquía cuando la predicción exacta de la subcategoría más específica falla, algo típico en clasificación taxonómica jerárquica.\n\nOpción C (Hierarchical loss) - Correcta: Una función de pérdida jerárquica penaliza los errores de forma proporcional a la distancia dentro del árbol de taxonomía (un error entre subcategorías hermanas pesa menos que un error entre ramas completamente distintas), lo cual es adecuado cuando las clases están organizadas en una jerarquía, como se describe en el enunciado.\n\nOpción D (General oversampling) - Correcta: Es la técnica de balanceo de clases genérica (duplicar ejemplos de la clase minoritaria) aplicable a datos tabulares/generales para mitigar el desbalance de clases.\n\nOpción E (SMOTE for text) - Correcta: La documentación de SageMaker Data Wrangler/Canvas describe la operación \"Synthetic Minority Oversampling Technique (SMOTE)\" dentro de la transformación \"Balance Data\", que interpola nuevas muestras sintéticas de la clase minoritaria a partir de vecinos; para datos textuales se aplica una variante adaptada a texto, para mitigar el desbalance de clases en ese tipo de datos.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html",
    "category": "Model Development",
    "multiSelect": true,
    "requiredCount": 5
  },
  {
    "id": 20195,
    "questionNumber": 195,
    "question": "A retail company is creating an AI-powered assistant for customers. The company has a large body of documentation that the assistant needs to use for general inquiries. The company wants any responses about prices to use only documentation that is less than 1 month old. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Q Business to develop the responses. Configure a document attribute filter so that responses about prices use only the documents from the past month.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use Amazon Q Business to develop the responses. Configure the source attribution citation so that responses about prices use only the documents from the past month.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Segment the documents into folders based on the month of document creation. Configure Amazon Q Developer to use only the documents from the past month to develop responses about prices.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Segment the documents into folders based on the month of document creation. Grant the assistant access to only the documents from the past month for responses about prices. Use Amazon Q Developer to develop the responses.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Amazon Q Business + filtro de atributo de documento) - Correcta: La documentación de Amazon Q Business describe la función de \"filtering using document attributes\", que permite restringir las respuestas del chat para que se generen únicamente a partir de documentos que cumplan un atributo de metadatos concreto (por ejemplo, una fecha de creación/actualización), lo cual encaja exactamente con el requisito de que las respuestas sobre precios usen solo documentación de menos de un mes de antigüedad, sin necesidad de reorganizar manualmente los documentos.\n\nOpción B (Amazon Q Business + configurar la citación de atribución de fuente): Incorrecta. La atribución de fuente (\"source attribution\"/citations) simplemente indica de qué documento proviene la respuesta generada, para que el usuario pueda verificarla; no restringe ni filtra qué documentos puede usar el motor de recuperación para construir la respuesta, por lo que no garantiza que solo se use documentación reciente.\n\nOpción C (Segmentar documentos en carpetas por mes + Amazon Q Developer): Incorrecta. Amazon Q Developer es un asistente de IA orientado a desarrolladores (autocompletado de código, chat sobre código en el IDE), no un asistente de atención al cliente para consultas generales sobre documentación de la empresa; no es el servicio adecuado para este caso de uso.\n\nOpción D (Segmentar documentos en carpetas por mes + control de acceso + Amazon Q Developer): Incorrecta, por el mismo motivo que la opción C (uso incorrecto de Amazon Q Developer para un asistente de atención al cliente), además de requerir gestión manual de permisos/carpetas mes a mes, lo que añade sobrecarga operativa frente al filtrado nativo por atributos de Amazon Q Business.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/concepts-terms.html\nhttps://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/metadata-filtering.html\nhttps://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/mapping-doc-attributes.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20196,
    "questionNumber": 196,
    "question": "HOTSPOT - An ML engineer needs to automate the rebuild and redeployment of an ML model. Updates will occur when changes are made to the model’s code base. The ML engineer must use AWS services to configure a continuous integration and continuous delivery (CI/CD) pipeline for the rebuild and redeployment. Select and order the steps from the following list to configure the CI/CD pipeline. Each step should be selected one time. (Select and order three.) • Invoke Amazon SageMaker Pipelines to run all steps required for model training and deployment. • Create a pipeline in AWS CodePipeline. Build and test containers in AWS CodeBuild. • Create a Git source code repository.",
    "choices": [
      {
        "letter": "A",
        "text": "Invoke Amazon SageMaker Pipelines to run all steps required for model training and deployment.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a pipeline in AWS CodePipeline. Build and test containers in AWS CodeBuild.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a Git source code repository.",
        "isCorrect": true
      }
    ],
    "comments": "Nota: Esta pregunta HOTSPOT pide ordenar tres pasos exactamente (\"Select and order three\"); las tres opciones listadas en el enunciado son precisamente los tres pasos correctos, por lo que las tres se marcan como parte de la respuesta; lo relevante es el orden.\n\nOpción C (Crear un repositorio Git de código fuente) - Correcta, Paso 1: Según la documentación de SageMaker AI sobre plantillas de proyectos MLOps, el flujo de CI/CD parte de un repositorio Git (por ejemplo, uno de terceros usado con las plantillas de SageMaker Projects) como fuente única de la verdad del código del modelo; cualquier cambio en el código base se detecta a partir de cambios en este repositorio.\n\nOpción B (Crear un pipeline en AWS CodePipeline; construir y probar contenedores en AWS CodeBuild) - Correcta, Paso 2: Un cambio en el repositorio Git dispara, a través de una integración configurada, la ejecución de un pipeline en CodePipeline, que usa CodeBuild para construir y probar las imágenes de contenedor (por ejemplo, la imagen de entrenamiento/inferencia) antes de continuar.\n\nOpción A (Invocar SageMaker Pipelines para ejecutar todos los pasos de entrenamiento y despliegue) - Correcta, Paso 3: Una vez construidas y probadas las imágenes, CodePipeline invoca la ejecución de un SageMaker Pipeline (definido con SageMaker Pipelines) que orquesta el entrenamiento, evaluación, registro y despliegue del modelo actualizado.\n\nOrden correcto: C (crear repositorio Git) → B (pipeline en CodePipeline + CodeBuild) → A (invocar SageMaker Pipelines).\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-projects-templates-sm.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-projects-walkthrough-3rdgit.html",
    "category": "Deployment & Orchestration",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 20197,
    "questionNumber": 197,
    "question": "HOTSPOT - An airline company deploys ML models to one dozen Amazon SageMaker AI inference endpoints. The inference endpoints must be able to handle different types of workloads in a cost-effective way. Select the correct inference option from the following list to handle each type of workload. Select each inference option one time. (Choose four.) • Asynchronous inference • Batch inference • Real-time inference • Serverless inference",
    "choices": [
      {
        "letter": "A",
        "text": "Asynchronous inference",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Batch inference",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Real-time inference",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Serverless inference",
        "isCorrect": true
      }
    ],
    "comments": "Nota: Esta pregunta HOTSPOT pide asignar cada una de las cuatro opciones de inferencia de SageMaker AI listadas a un tipo de carga de trabajo distinto (\"Select each inference option one time. Choose four\"), por lo que las cuatro opciones forman parte de la respuesta correcta; el enunciado scrapeado no conserva los cuatro casos de uso específicos a emparejar.\n\nOpción A (Asynchronous inference) - Correcta: Está pensada para cargas de trabajo que toleran mayor latencia y/o payloads grandes, poniendo en cola las solicitudes y pudiendo escalar la infraestructura a cero cuando no hay tráfico, optimizando el coste para ese tipo de carga.\n\nOpción B (Batch inference / Batch Transform) - Correcta: Diseñada para procesar grandes volúmenes de datos de forma no interactiva, sin necesidad de mantener un endpoint persistente, lo que resulta más económico para cargas de trabajo periódicas/masivas.\n\nOpción C (Real-time inference) - Correcta: Pensada para aplicaciones interactivas de baja latencia que requieren respuesta en milisegundos/segundos, mediante endpoints totalmente gestionados con auto-scaling.\n\nOpción D (Serverless inference) - Correcta: Aprovisiona y escala automáticamente la capacidad de cómputo según la demanda y solo cobra por uso, siendo la opción más rentable para cargas de trabajo intermitentes o con tráfico impredecible, sin necesidad de gestionar instancias.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model-options.html",
    "category": "Deployment & Orchestration",
    "multiSelect": true,
    "requiredCount": 4
  },
  {
    "id": 20198,
    "questionNumber": 198,
    "question": "A company uses Amazon SageMaker AI to support ML workflows such as model training and deployment. Which registry should the company use to catalog and manage versions of its trained ML models, and which registry should it use to store and version the container images used for SageMaker AI training and inference, with the LEAST operational overhead? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Amazon SageMaker Model Registry",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Amazon Elastic Container Registry (ECR)",
        "isCorrect": true
      }
    ],
    "comments": "Nota importante: el texto original de esta pregunta HOTSPOT, tal como quedó capturado por el scraper de ExamTopics, no incluía ni la lista completa de registros disponibles ni la lista de los cuatro casos de uso a los que había que asignarlos (el contenido original era probablemente una tabla o imagen interactiva no capturada por el scraper; el campo \"Most Accepted Answer\" aparecía como \"Not available\"). El único indicio disponible era un comentario de la discusión que mencionaba \"model registry, ECR, registry and ECR\". Para que la pregunta sea usable en esta app se ha reformulado como una selección de dos elementos (en vez de las cuatro asignaciones originales) sobre los dos registros que sí se pueden confirmar con la documentación oficial de AWS.\n\nOpción A (Amazon SageMaker Model Registry) - Correcta: es el catálogo específico de SageMaker AI para registrar versiones de modelos entrenados, gestionar su estado de aprobación (Pending/Approved/Rejected), comparar métricas entre versiones y controlar qué versión de modelo se despliega en producción, con la mínima sobrecarga operativa para el ciclo de vida del modelo (entrenamiento -> aprobación -> despliegue).\n\nOpción B (Amazon Elastic Container Registry - ECR) - Correcta: es el registro utilizado para almacenar y versionar las imágenes de contenedor Docker (por ejemplo, las imágenes de entrenamiento e inferencia personalizadas) que SageMaker AI utiliza para ejecutar trabajos de entrenamiento y alojar endpoints; es el servicio recomendado por AWS para publicar imágenes de algoritmos/inferencia usadas por SageMaker AI.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html\nhttps://docs.aws.amazon.com/marketplace/latest/userguide/ml-uploading-your-images.html",
    "category": "Deployment & Orchestration",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 20199,
    "questionNumber": 199,
    "question": "A travel company wants to create an ML model to recommend the next airport destination for its users. The company has collected millions of data records about user location, recent search history on the company’s website, and 2,000 available airports. The data has several categorical features with a target column that is expected to have a high-dimensional sparse matrix. The company needs to use Amazon SageMaker AI built-in algorithms for the model. An ML engineer converts the categorical features by using one-hot encoding. Which algorithm should the ML engineer implement to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use the CatBoost algorithm to recommend the next airport destination.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use the DeepAR forecasting algorithm to recommend the next airport destination.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the Factorization Machines algorithm to recommend the next airport destination.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use the k-means algorithm to cluster users into groups. Map each group to the next airport destination based on user search history.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (CatBoost): Incorrecta. CatBoost es un algoritmo de gradient boosting orientado a datos tabulares con variables categóricas nativas (sin necesidad de one-hot encoding previo); no es un algoritmo integrado (built-in) de SageMaker AI y no está especialmente diseñado para matrices dispersas de muy alta dimensionalidad como la que resulta de aplicar one-hot encoding sobre miles de usuarios/ubicaciones y 2.000 aeropuertos.\n\nOpción B (DeepAR): Incorrecta. DeepAR es un algoritmo de forecasting de series temporales (predicción de valores futuros de series escalares relacionadas); no está diseñado para tareas de recomendación con características categóricas dispersas codificadas mediante one-hot encoding.\n\nOpción C (Factorization Machines) - Correcta: La documentación de SageMaker AI describe explícitamente el caso de uso de \"item recommendation\" para el algoritmo Factorization Machines, indicando que está diseñado para conjuntos de datos dispersos de alta dimensionalidad (como los que resultan de codificar variables categóricas con one-hot encoding) y para capturar interacciones entre pares de características en ese contexto disperso, que es exactamente el escenario descrito (millones de registros, variables categóricas con one-hot encoding, alta dimensionalidad dispersa, tarea de recomendación).\n\nOpción D (k-means para agrupar usuarios y mapear grupos a destinos): Incorrecta. k-means es un algoritmo de clustering no supervisado; no aprovecha directamente la estructura de un problema de recomendación con una variable objetivo definida ni maneja de forma nativa matrices dispersas de alta dimensionalidad de la misma manera que Factorization Machines, y añade un paso adicional (mapeo manual de clústeres a destinos) menos preciso.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/fact-machines.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/fact-machines-howitworks.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20200,
    "questionNumber": 200,
    "question": "An ML engineer is configuring auto scaling for an inference component of a model that runs behind an Amazon SageMaker AI endpoint. The ML engineer configures SageMaker AI auto scaling with a target tracking scaling policy set to 100 invocations per model per minute. The SageMaker AI endpoint scales appropriately during normal business hours. However, the ML engineer notices that at the start of each business day, there are zero instances available to handle requests, which causes delays in processing. The ML engineer must ensure that the SageMaker AI endpoint can handle incoming requests at the start of each business day. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Reduce the SageMaker AI auto scaling cooldown period to the minimum supported value. Add an auto scaling lifecycle hook to scale the SageMaker AI instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Change the target metric to CPU utilization.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Modify the scaling policy target value to one.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Apply a step scaling policy that scales based on an Amazon CloudWatch alarm. Apply a second CloudWatch alarm and scaling policy to scale the minimum number of instances from zero to one at the start of each business day.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A (Reducir el cooldown al mínimo + lifecycle hook de Auto Scaling): Incorrecta. Reducir el cooldown solo acelera ligeramente la reacción a las métricas, pero no soluciona el problema de fondo: con cero instancias en servicio no hay ninguna métrica de invocaciones que pueda disparar el escalado (target tracking no puede actuar sobre una variante sin tráfico ni instancias). Además, los \"lifecycle hooks\" son un concepto de Amazon EC2 Auto Scaling groups, no de los endpoints de SageMaker AI, que se gestionan mediante Application Auto Scaling.\n\nOpción B (Cambiar la métrica objetivo a utilización de CPU): Incorrecta. Cambiar la métrica de destino no resuelve el problema de partir de cero instancias en servicio al inicio del día: sin ninguna instancia activa tampoco hay métrica de CPU que pueda disparar el escalado.\n\nOpción C (Modificar el valor objetivo de la política de escalado a uno): Incorrecta. Cambiar el valor objetivo de invocaciones por instancia no impide que, tras un período sin tráfico nocturno, el escalado ordinario reduzca las instancias a cero; el problema es la ausencia de un mecanismo que provisione una instancia base antes de que llegue tráfico.\n\nOpción D (Step scaling basado en una alarma de CloudWatch + segunda alarma/política para escalar de cero a uno al inicio del día) - Correcta: La documentación de SageMaker AI sobre \"Scale an endpoint to zero instances\" describe exactamente este mecanismo: cuando un endpoint ha escalado a cero instancias, no puede reaccionar a las métricas de invocación porque no hay tráfico que las genere, por lo que AWS recomienda crear una política de step scaling de Application Auto Scaling asociada a una alarma de CloudWatch para que el endpoint aprovisione automáticamente una instancia en cuanto reciba una solicitud que no pueda atender; combinando esto con una segunda alarma/política que fuerce proactivamente el paso de 0 a 1 instancia a la hora de inicio de la jornada laboral, se evita el retraso de aprovisionamiento (que tarda varios minutos) justo cuando comienza el tráfico.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling-zero-instances.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20201,
    "questionNumber": 201,
    "question": "An ML engineer is using an Amazon SageMaker Studio notebook to train a neural network by creating an estimator. The estimator runs a Python training script that uses Distributed Data Parallel (DDP) on a single instance that has more than one GPU. The ML engineer discovers that the training script is underutilizing GPU resources. The ML engineer must identify the point in the training script where resource utilization can be optimized. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon CloudWatch metrics to create a report that describes GPU utilization over time.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Add SageMaker Profiler annotations to the training script. Run the script and generate a report from the results.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS CloudTrail to create a report that describes GPU utilization and GPU memory utilization over time.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a default monitor in Amazon SageMaker Model Monitor and suggest a baseline. Generate a report based on the constraints and statistics the monitor generates.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Amazon CloudWatch permite ver métricas de utilización de GPU a nivel de instancia, pero no permite localizar el punto exacto del script de entrenamiento (una función, bucle o fase concreta) donde se produce la infrautilización; solo ofrece una vista agregada en el tiempo, no a nivel de código. Incorrecta.\n\nOpción B (Correcta): SageMaker Profiler permite instrumentar el script de entrenamiento con anotaciones (smprof.annotate, annotation_begin/annotation_end) alrededor de secciones específicas del código (carga de datos, forward, backward, optimizer step, etc.). El informe generado por el Profiler correlaciona la línea de tiempo de actividad de GPU con esas anotaciones, permitiendo identificar exactamente en qué parte del script se pierde utilización de GPU en un entrenamiento DDP multi-GPU. Es la herramienta diseñada explícitamente para este caso de uso.\n\nOpción C: AWS CloudTrail registra llamadas a la API de gestión (eventos de auditoría), no métricas de rendimiento de hardware como el uso de GPU o memoria de GPU; no es la herramienta adecuada.\n\nOpción D: Amazon SageMaker Model Monitor evalúa la calidad de los datos y del modelo de un endpoint de inferencia ya desplegado en producción (drift de datos, drift del modelo), no perfiles de utilización de recursos durante un job de entrenamiento. No aplica a este escenario.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/profiler-prepare.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/debugger-profiling-report-walkthrough.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20202,
    "questionNumber": 202,
    "question": "An ML engineer at an insurance company trains a regression model to predict the number of insurance policy sales each month. After training the model, the ML engineer uses Amazon SageMaker AI to deploy the model for inference. The ML engineer wants to monitor the model predictions to detect whether the production data distribution differs from the training data distribution when there are changes in customer behaviors. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Determine whether there is drift in the data quality.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Determine whether there is drift in the model quality.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Determine whether there is drift in the model bias.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Determine whether there is drift in the feature attribution.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Detectar si la distribución de los datos de producción difiere de la distribución de los datos de entrenamiento es, por definición, monitorización de drift de calidad de datos (Data quality). La documentación de Amazon SageMaker Model Monitor define explícitamente este tipo de monitor como el que analiza el drift en la calidad de los datos de entrada comparando estadísticas/restricciones (baseline) calculadas sobre los datos de entrenamiento frente a los datos que llegan en producción. El escenario describe exactamente ese caso: cambios en el comportamiento de los clientes que alteran la distribución de las variables de entrada.\n\nOpción B: El drift de calidad del modelo compara las predicciones del modelo con las etiquetas reales (ground truth) para medir métricas como exactitud, y requiere disponer de esas etiquetas reales a posteriori; el escenario no menciona ground truth ni pérdida de exactitud medida contra etiquetas, sino un cambio en la distribución de entrada. Incorrecta para este caso.\n\nOpción C: El drift de sesgo (bias drift) de SageMaker Clarify mide cambios en métricas de imparcialidad entre grupos protegidos (facets), no cambios generales en la distribución estadística de las variables de entrada. No es lo que se pide.\n\nOpción D: El drift de atribución de características (feature attribution drift) mide cambios en la importancia relativa (ranking SHAP) de las variables para las predicciones del modelo, no cambios directos en la distribución de los valores de entrada. No es lo que se pide.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-data-quality.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20203,
    "questionNumber": 203,
    "question": "A company is developing an internal cost-estimation tool that uses an ML model in Amazon SageMaker AI. Users upload high-resolution images to the tool. The model must process each image and predict the cost of the object in the image. The model also must notify the user when processing is complete. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Store the images in an Amazon S3 bucket. Deploy the model on SageMaker AI. Use batch transform jobs for model inference. Use an Amazon Simple Queue Service (Amazon SQS) queue to notify users.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Store the images in an Amazon S3 bucket. Deploy the model on SageMaker AI. Use an asynchronous inference strategy for model inference. Use an Amazon Simple Notification Service (Amazon SNS) topic to notify users.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Store the images in an Amazon Elastic File System (Amazon EFS) file system. Deploy the model on SageMaker AI. Use batch transform jobs for model inference. Use an Amazon Simple Queue Service (Amazon SQS) queue to notify users.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Store the images in an Amazon Elastic File System (Amazon EFS) file system. Deploy the model on SageMaker AI. Use an asynchronous inference strategy for model inference. Use an Amazon Simple Notification Service (Amazon SNS) topic to notify users.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: El batch transform procesa un conjunto completo de datos de forma asíncrona por lotes; es adecuado para grandes volúmenes offline, pero no está pensado para el patrón «el usuario sube una imagen y se le notifica cuando termine su procesamiento individual»; además usar Amazon SQS obligaría a implementar lógica adicional de sondeo/consumo para notificar al usuario final. Incorrecta como mejor ajuste.\n\nOpción B (Correcta): La inferencia asíncrona de SageMaker AI está diseñada específicamente para cargas de gran tamaño (como imágenes de alta resolución) y tiempos de procesamiento largos: encola las solicitudes, las procesa y, mediante AsyncInferenceNotificationConfig, publica automáticamente un mensaje en un tema de Amazon SNS (de éxito o de error) cuando la inferencia de cada solicitud finaliza, notificando directamente al usuario. Amazon S3 es el mecanismo estándar de entrada/salida de la inferencia asíncrona. Esta combinación (S3 + inferencia asíncrona + SNS) es exactamente la arquitectura documentada por AWS para este tipo de caso de uso.\n\nOpción C: Amazon EFS no es el almacenamiento habitual de entrada para los trabajos de SageMaker con imágenes (se usa S3), y el batch transform no ofrece notificación individual por solicitud de forma nativa.\n\nOpción D: Aunque propone la estrategia de inferencia correcta (asíncrona) y el mecanismo de notificación correcto (SNS), utiliza Amazon EFS en lugar de Amazon S3; la inferencia asíncrona de SageMaker AI usa Amazon S3 para leer las entradas y escribir las salidas, no EFS.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/async-inference.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/async-inference-check-predictions.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20204,
    "questionNumber": 204,
    "question": "A healthcare company uses an Amazon SageMaker AI endpoint to host a model that predicts patient readmission risk to hospitals. The company wants to predict patient readmissions with high accuracy and is willing to tolerate false positives. The current model performance has degraded over the previous year. The company trains and deploys a new model as a shadow variant for testing on live traffic from hospitals. The company monitors the performance of the new model for a month. During the month of testing, the shadow variant has a higher recall than the existing model but has a lower precision. What should the company do next?",
    "choices": [
      {
        "letter": "A",
        "text": "Promote the shadow variant to full production.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Extend the shadow testing period to capture more data. Monitor the new model to determine whether precision improves.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use a blue/green deployment strategy to allocate a small percentage of traffic to the shadow variant to reduce model errors.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Disable the shadow variant and roll back to the main variant.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): La empresa indica explícitamente que prioriza no dejar pasar casos de riesgo («high accuracy» en la detección de reingresos) y que tolera falsos positivos. La variante shadow, tras un mes de pruebas con tráfico real replicado, muestra mayor recall (detecta más verdaderos reingresos, menos falsos negativos) a costa de menor precisión (más falsos positivos), que es justamente el perfil de riesgo que la empresa declara aceptar. El shadow testing de Amazon SageMaker AI está diseñado para comparar el rendimiento de una variante candidata contra la variante de producción con tráfico replicado sin afectar a los usuarios finales; una vez que las métricas confirman que la variante shadow cumple el objetivo de negocio, el paso siguiente es promoverla a producción.\n\nOpción B: Extender la prueba shadow para ver si mejora la precisión contradice el objetivo declarado de la empresa: la empresa no exige mejorar la precisión, exige alta sensibilidad (recall) y tolera los falsos positivos; seguir esperando solo retrasa la mejora ya conseguida sin una justificación de negocio clara en este escenario.\n\nOpción C: Un despliegue blue/green con un pequeño porcentaje de tráfico es una estrategia de migración gradual, pero no es coherente con un shadow test que ya lleva un mes evaluando tráfico replicado con resultados favorables al objetivo de negocio; las buenas prácticas de shadow testing de SageMaker recomiendan aumentar el tráfico de la sombra al 100% antes de promoverla, lo cual ya se ha validado, por lo que introducir un despliegue gradual adicional no es el siguiente paso lógico.\n\nOpción D: Deshacer la variante shadow y volver a la variante principal iría en contra de la evidencia recogida: el modelo anterior es el que se estaba degradando y el nuevo modelo mejora precisamente la métrica (recall) que la empresa más valora.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests-best-practices.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20205,
    "questionNumber": 205,
    "question": "HOTSPOT - A company is using Amazon SageMaker to deploy a new version of its ML model. Select the correct SageMaker traffic shifting strategy from the following list for each use case. Each traffic shifting strategy should be selected one time. (Choose three.) • All at once traffic shifting • Canary traffic shifting • Linear traffic shifting",
    "choices": [
      {
        "letter": "A",
        "text": "All at once traffic shifting",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Canary traffic shifting",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Linear traffic shifting",
        "isCorrect": true
      }
    ],
    "comments": "Esta pregunta es de tipo HOTSPOT/emparejamiento («Select the correct... strategy... for each use case»), y el fichero de origen de ExamTopics no conservó el texto de los tres casos de uso concretos que había que emparejar con cada estrategia (solo se conserva la lista de las tres estrategias y una respuesta agregada «B» sin contexto), por lo que no es posible verificar la pareja exacta caso-estrategia. Para no perder el valor de estudio de la pregunta, se listan las tres estrategias (las tres correctas, ya que se usan una vez cada una en el ejercicio de emparejamiento) con su definición verificada en la documentación oficial de Amazon SageMaker AI:\n\nAll at once traffic shifting: se desplaza el 100% del tráfico del endpoint desde la flota azul (producción) hacia la flota verde (nueva) de una sola vez, y después se supervisa durante un periodo de «baking» con alarmas de CloudWatch; es la estrategia más rápida pero la de mayor riesgo si el nuevo modelo tiene un problema, ya que afecta a todo el tráfico de inmediato.\n\nCanary traffic shifting: se desplaza primero un pequeño porcentaje del tráfico a la flota verde para validar su comportamiento con tráfico real limitado, y solo si las alarmas de CloudWatch no se disparan durante el periodo de baking se desplaza el resto del tráfico; reduce el riesgo frente a all-at-once.\n\nLinear traffic shifting: el tráfico se desplaza en incrementos iguales y sucesivos desde la flota azul a la verde, con un periodo de monitorización entre cada incremento; ofrece una migración más gradual y controlada que canary o all-at-once.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-blue-green.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-blue-green-canary.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-blue-green-linear.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-blue-green-all-at-once.html",
    "category": "Deployment & Orchestration",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 20206,
    "questionNumber": 206,
    "question": "HOTSPOT - A company needs to combine data from multiple sources. The company must use Amazon Redshift Serverless to query an AWS Glue Data Catalog database and underlying data that is stored in an Amazon S3 bucket. Select and order the correct steps from the following list to meet these requirements. Select each step one time or not at all. (Select and order three.) • Attach the IAM role to the Redshift cluster. • Attach the IAM role to the Redshift namespace. • Create an external database in Amazon Redshift to point to the Data Catalog schema. • Create an external schema in Amazon Redshift to point to the Data Catalog database. • Create an IAM role for Amazon Redshift to use to access only the S3 bucket that contains underlying data. • Create an IAM role for Amazon Redshift to use to access the Data Catalog and the S3 bucket that contains underlying data.",
    "choices": [
      {
        "letter": "A",
        "text": "Attach the IAM role to the Redshift cluster.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Attach the IAM role to the Redshift namespace.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an external database in Amazon Redshift to point to the Data Catalog schema.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an external schema in Amazon Redshift to point to the Data Catalog database.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Create an IAM role for Amazon Redshift to use to access only the S3 bucket that contains underlying data.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Create an IAM role for Amazon Redshift to use to access the Data Catalog and the S3 bucket that contains underlying data.",
        "isCorrect": true
      }
    ],
    "comments": "Esta pregunta es de tipo HOTSPOT («Select and order... three»); el orden correcto verificado contra la documentación de Amazon Redshift es: 1) Opción F, 2) Opción B, 3) Opción D.\n\nOpción A (incorrecta): Amazon Redshift Serverless no tiene «clústeres»; los recursos de cómputo se organizan en namespaces y workgroups. Los roles de IAM en Redshift Serverless se asocian al namespace, no a un clúster (eso aplica al Redshift aprovisionado tradicional, no a Serverless).\n\nOpción B (Correcta, paso 2): La documentación de Redshift Serverless («Managing namespace associated IAM roles») confirma que los roles de IAM que Redshift usará para acceder a otros servicios (como el AWS Glue Data Catalog y Amazon S3) se asignan al namespace de Redshift Serverless.\n\nOpción C (incorrecta): La sintaxis real de Redshift es al revés de lo que dice esta opción: se crea un ESQUEMA EXTERNO que apunta a una BASE DE DATOS del Data Catalog (CREATE EXTERNAL SCHEMA ... FROM DATA CATALOG DATABASE '...' IAM_ROLE '...'), no una «base de datos externa que apunta a un esquema del Data Catalog»; esta opción invierte los conceptos.\n\nOpción D (Correcta, paso 3): Coincide exactamente con la sintaxis documentada por AWS: se crea un esquema externo en Redshift que hace referencia a una base de datos del Glue Data Catalog, usando el rol de IAM creado previamente.\n\nOpción E (incorrecta): Un rol de IAM que solo dé acceso al bucket de S3, sin permisos sobre el Glue Data Catalog, es insuficiente: Redshift necesita acceder tanto al Data Catalog (para resolver metadatos de tablas/particiones) como al S3 subyacente (para leer los datos).\n\nOpción F (Correcta, paso 1): Es el primer paso lógico y coincide con la guía de Redshift/Data Catalog: crear un rol de IAM para Amazon Redshift con permisos sobre el Data Catalog y sobre el bucket de S3 que contiene los datos subyacentes.\n\nReferencias:\nhttps://docs.aws.amazon.com/redshift/latest/dg/data-catalog-views-overview.html\nhttps://docs.aws.amazon.com/redshift/latest/dg/glue-irc-federated-catalogs.html\nhttps://docs.aws.amazon.com/redshift/latest/mgmt/serverless-security-other-services.html",
    "category": "Data Preparation",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 20207,
    "questionNumber": 207,
    "question": "An airline company uses an ML model to adjust ticket prices based on demand. The model runs on Amazon SageMaker real-time endpoints. During previous deployments, the model failed to scale quickly enough when website traffic increased, which caused delays in price adjustments. An ML engineer needs to configure auto scaling for the SageMaker endpoints to respond rapidly to traffic changes. The solution must use target tracking scaling policies. Which configuration will be MOST responsive to sudden changes in traffic?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure auto scaling based on the SageMaker AI InvocationsPerInstance standard metric. Configure 10-second interval resolution, and set the default 300-second scale-in cooldown period.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure auto scaling based on the SageMaker AI InvocationsPerInstance metric. Configure high-resolution 10-second intervals, and set a 600-second scale-in cooldown period.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure auto scaling based on the SageMaker InvocationsPerInstance standard metric. Configure 10-second intervals resolution, and set a 600-second scale-in cooldown period.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure auto scaling based on the SageMaker InvocationsPerInstance metric. Configure high-resolution 10-second intervals, and set the default 300-second scale-in cooldown period.",
        "isCorrect": true
      }
    ],
    "comments": "Verificación importante: según la documentación oficial de Amazon SageMaker AI sobre auto scaling de endpoints, la métrica predefinida InvocationsPerInstance (SageMakerVariantInvocationsPerInstance) es una métrica ESTÁNDAR de CloudWatch que emite datos cada 60 segundos (una vez por minuto); las únicas métricas verdaderamente de alta resolución con emisión cada 10 segundos que ofrece SageMaker AI para auto scaling son ConcurrentRequestsPerModel y ConcurrentRequestsPerCopy (métricas distintas de InvocationsPerInstance). Por tanto, ninguna de las cuatro opciones es 100% precisa, ya que todas asocian «intervalos de 10 segundos» a la métrica InvocationsPerInstance, combinación que en realidad no existe: InvocationsPerInstance no puede configurarse a 10 segundos ni es una métrica de alta resolución.\n\nDicho esto, la documentación de Application Auto Scaling confirma que el periodo de enfriamiento (cooldown) por defecto que aplica Application Auto Scaling cuando no se especifica ninguno, para los scalable targets de tipo «SageMaker AI endpoint variants», es de 300 segundos (no 600).\n\nOpción A: Llama «estándar» a la métrica y aun así le asigna 10 segundos de resolución, lo cual contradice la propia definición de «estándar» (60 segundos) recogida en la documentación de AWS.\n\nOpción B: Etiqueta InvocationsPerInstance como «alta resolución» (que documentalmente no lo es) y además usa un cooldown de scale-in de 600 segundos, que no es el valor por defecto de SageMaker (300 s) y ralentiza la respuesta de bajada de instancias.\n\nOpción C: Igual que A, llama «estándar» a la métrica pero le da 10 segundos de resolución (inconsistente), y además usa un cooldown de 600 segundos, no el valor por defecto.\n\nOpción D (marcada como la más correcta de las cuatro): es la única opción que, además de proponer el intervalo corto de 10 segundos para maximizar la rapidez de reacción, mantiene el cooldown de scale-in en su valor por defecto documentado de 300 segundos para los endpoints de SageMaker AI, que es el comportamiento real de Application Auto Scaling cuando no se personaliza. Aunque el nombre «alta resolución» no corresponde estrictamente a InvocationsPerInstance según la documentación, es la opción cuyo dato objetivamente verificable (cooldown por defecto = 300 s) es correcto, por lo que se mantiene como respuesta más defendible entre las cuatro.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling-add-code-define.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling-policy.html\nhttps://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20208,
    "questionNumber": 208,
    "question": "An ML engineer is collecting data to train a classification ML model by using Amazon SageMaker AI. The target column can have two possible values: Class A or Class B. The ML engineer wants to ensure that the number of samples for both Class A and Class B are balanced, without losing any existing training data. The ML engineer must test the balance of the training data. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Use SageMaker Clarify to check for class imbalance (CI). If the value is equal to 0, then use random undersampling in SageMaker Data Wrangler to balance the classes.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use SageMaker Clarify to check for class imbalance (CI). If the value is greater than 0, then use synthetic minority oversampling technique (SMOTE) in SageMaker Data Wrangler to balance the classes.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use SageMaker JumpStart to generate a class imbalance (CI) report. If the value is greater than 0, then use random undersampling in SageMaker Studio to balance the classes.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use SageMaker JumpStart to generate a class imbalance (CI) report. If the value is equal to 0, then use synthetic minority oversampling technique (SMOTE) in SageMaker Studio to balance the classes.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Usar SageMaker Clarify para calcular el CI es correcto, pero la condición está invertida: la documentación de SageMaker Clarify define que un valor de CI igual a 0 indica precisamente una distribución balanceada entre las clases (partición perfectamente equitativa), por lo que no tendría sentido aplicar submuestreo (undersampling) cuando el valor es 0, ya que en ese caso no hay desequilibrio que corregir. Además, el submuestreo elimina datos existentes de la clase mayoritaria, lo que contradice el requisito de no perder ningún dato de entrenamiento existente.\n\nOpción B (Correcta): SageMaker Clarify calcula la métrica de sesgo previo al entrenamiento Class Imbalance (CI), definida como (na - nd)/(na + nd), con valores en el rango [-1, 1]; un valor de CI distinto de 0 (positivo o negativo) indica que una de las clases tiene más muestras que la otra. Cuando existe ese desequilibrio, la documentación recomienda rebalancear la muestra antes de entrenar, y SageMaker Data Wrangler ofrece la operación «Balance data» con la técnica SMOTE (synthetic minority oversampling technique), que genera muestras sintéticas para la clase minoritaria interpolando entre vecinos existentes, en lugar de eliminar datos de la clase mayoritaria; esto cumple el requisito de balancear las clases sin perder datos existentes.\n\nOpción C: SageMaker JumpStart es un hub de modelos preentrenados y soluciones; no genera informes de la métrica de Class Imbalance. Esa capacidad de análisis de sesgo (pre-training bias) es específica de SageMaker Clarify, no de JumpStart. Además, propone submuestreo, que elimina datos existentes.\n\nOpción D: Igual que C, atribuye a JumpStart una capacidad (generar el informe de CI) que en realidad pertenece a Clarify, y además invierte la condición del valor de CI (aplicar SMOTE cuando el valor es igual a 0, es decir, cuando los datos ya están balanceados y no requieren corrección).\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-bias-metric-class-imbalance.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-transform.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20209,
    "questionNumber": 209,
    "question": "An ML engineer is building a logistic regression model to predict customer churn for subscription services. The ML engineer is using a dataset that contains two string variables: location and job_seniority_level. The location variable has 3 distinct values, and the job_seniority_level variable has over 10 distinct values. The ML engineer must perform preprocessing on the variables. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Apply tokenization to location. Apply ordinal encoding to job_seniority_level.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Apply one-hot encoding to location. Apply ordinal encoding to job_seniority_level",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Apply binning to location. Apply standard scaling to job_seniority_level.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Apply one-hot encoding to location. Apply standard scaling to job_seniority_level.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: La tokenización se aplica a texto libre para dividirlo en palabras o subpalabras (NLP), no a una variable categórica de baja cardinalidad como location (solo 3 valores posibles); no es la técnica adecuada para esta variable.\n\nOpción B (Correcta): La documentación de SageMaker Data Wrangler distingue entre categorías nominales (sin orden inherente, como el país o la ubicación) y categorías ordinales (con un orden inherente, como el nivel de estudios). location, al ser una variable nominal de baja cardinalidad (3 valores), es candidata natural para one-hot encoding, que crea una columna binaria por categoría sin imponer una relación de orden inexistente. job_seniority_level es una variable con más de 10 valores que, por su propia naturaleza semántica, tiene un orden jerárquico implícito (de niveles junior a directivos), por lo que la codificación ordinal (que traduce ese orden natural a números consecutivos) es la técnica recomendada, en lugar de generar decenas de columnas binarias adicionales con one-hot.\n\nOpción C: El binning (discretización en intervalos) se usa sobre variables numéricas continuas, no sobre una variable categórica de texto como location; y el escalado estándar (standard scaling) se aplica a variables numéricas continuas, no a una variable categórica como job_seniority_level sin codificar primero.\n\nOpción D: Propone one-hot encoding para location (correcto) pero aplica escalado estándar directamente a job_seniority_level, que es una variable de texto categórica; el escalado estándar no puede aplicarse a datos no numéricos sin codificarlos antes, por lo que esta opción es técnicamente incompleta/incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20210,
    "questionNumber": 210,
    "question": "HOTSPOT - An ML engineer needs to use Amazon SageMaker to develop an ML solution for a company. The solution will use streaming video from cameras to count the number of people who walk past the company's store every day. Select and order the steps from the following list to implement the first version of the algorithm. Each step should be selected one time. (Select and order three.) • Choose a built-in algorithm or pre-trained model. • Decide the data input format and apply data augmentation if necessary. • Determine if the challenge is a classification, detection, or segmentation problem.",
    "choices": [
      {
        "letter": "A",
        "text": "Choose a built-in algorithm or pre-trained model.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Decide the data input format and apply data augmentation if necessary.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Determine if the challenge is a classification, detection, or segmentation problem.",
        "isCorrect": true
      }
    ],
    "comments": "Esta pregunta es de tipo HOTSPOT («Select and order... three»); el fichero de origen no incluye una respuesta oficial («Most Accepted Answer: Not available»), por lo que se ha determinado el orden correcto siguiendo el flujo de trabajo estándar de desarrollo de un modelo de visión por computador en Amazon SageMaker AI. El orden correcto es: 1) Opción C, 2) Opción A, 3) Opción B.\n\nOpción C (Correcta, paso 1): Antes de elegir ningún algoritmo o formato de datos, es necesario enmarcar el problema de negocio (contar personas que pasan frente a la tienda) en un tipo de tarea de visión por computador conocido: clasificación, detección de objetos o segmentación. Esta decisión condiciona todas las decisiones posteriores.\n\nOpción A (Correcta, paso 2): Una vez determinado el tipo de problema (en este caso, detección de personas, ya que se necesita contar objetos individuales en un fotograma), se elige un algoritmo incorporado o un modelo preentrenado de Amazon SageMaker (por ejemplo, un algoritmo de detección de objetos disponible en SageMaker JumpStart) adecuado a ese tipo de tarea.\n\nOpción B (Correcta, paso 3): Solo después de fijar el algoritmo o modelo se puede decidir el formato de entrada de datos que ese algoritmo espera (formato de imagen, resolución, anotaciones) y si es necesario aplicar aumento de datos (data augmentation) para mejorar la robustez del modelo con los datos de vídeo/imagen disponibles.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/algos.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/algorithms-vision.html",
    "category": "Model Development",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 20211,
    "questionNumber": 211,
    "question": "A company needs to deploy a custom-trained classification ML model on AWS. The model must make near real-time predictions with low latency and must handle variable request volumes. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon SageMaker AI batch transform job to process inference requests in batches.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon API Gateway to receive prediction requests. Use an Amazon S3 bucket to host and serve the model.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy an Amazon SageMaker AI endpoint. Configure auto scaling for the endpoint.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Launch AWS Deep Learning AMIs (DLAMI) on two Amazon EC2 instances. Run the instances behind an Application Load Balancer.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Los batch transform jobs de SageMaker AI procesan un conjunto de datos completo de forma asíncrona/por lotes; están pensados para inferencia offline sobre grandes volúmenes, no para predicciones near real-time con baja latencia por solicitud individual. No cumple el requisito de tiempo real.\n\nOpción B: Alojar el modelo directamente en un bucket de Amazon S3 y usar solo Amazon API Gateway no proporciona un mecanismo de cómputo real para ejecutar inferencia del modelo; S3 es almacenamiento de objetos, no un servidor de inferencia. Esta arquitectura no es funcional para servir un modelo de ML entrenado de forma personalizada.\n\nOpción C (Correcta): Un endpoint en tiempo real de Amazon SageMaker AI expone el modelo tras una API HTTPS persistente con baja latencia, y la configuración de auto scaling (mediante Application Auto Scaling con políticas de seguimiento de destino) permite que el número de instancias del endpoint se ajuste automáticamente según el volumen de solicitudes, cumpliendo el requisito de manejar volúmenes de peticiones variables sin intervención manual.\n\nOpción D: Desplegar manualmente AMIs de aprendizaje profundo en instancias EC2 detrás de un Application Load Balancer requiere gestionar y escalar la infraestructura manualmente, lo cual es operativamente más complejo y menos integrado que usar un endpoint gestionado de SageMaker AI con auto scaling nativo.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling-policy.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20212,
    "questionNumber": 212,
    "question": "A company runs a neural network model and retrains the model when the performance degrades. The company uses a training job that uses Amazon SageMaker AI distributed data parallelism (DDP). The training job takes several hours to run. The company wants to decrease the required time for the training job. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Increase the number of epochs.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Increase the number of neurons in the hidden layers.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Increase the number of layers.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Increase the number of instances.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Aumentar el número de épocas incrementa la cantidad de pasadas completas sobre el dataset, lo que generalmente AUMENTA el tiempo total de entrenamiento, no lo reduce; no resuelve el objetivo de la pregunta.\n\nOpción B: Aumentar el número de neuronas en las capas ocultas incrementa la complejidad computacional del modelo (más parámetros que calcular en cada paso), lo que tiende a aumentar el tiempo de entrenamiento por paso, no a reducirlo.\n\nOpción C: Aumentar el número de capas también incrementa la profundidad y el coste computacional del modelo, aumentando el tiempo de entrenamiento en lugar de reducirlo.\n\nOpción D (Correcta): La librería de paralelismo de datos distribuido (SMDDP) de Amazon SageMaker AI está diseñada para lograr una eficiencia de escalado casi lineal repartiendo los lotes de entrenamiento entre múltiples instancias/GPUs que se sincronizan mediante operaciones colectivas (AllReduce) optimizadas para la infraestructura de AWS. Añadir más instancias a un job que ya usa DDP permite procesar más datos en paralelo por paso, reduciendo el tiempo total necesario para completar el entrenamiento, que es precisamente el mecanismo que la documentación de SageMaker describe para este escenario.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-parallel.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-parallel-faq.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20213,
    "questionNumber": 213,
    "question": "An ML engineer decides to use Amazon SageMaker AI automated model tuning (AMT) for hyperparameter optimization (HPO). The ML engineer requires a tuning strategy that uses regression to slowly and sequentially select the next set of hyperparameters based on previous runs. The strategy must work across small hyperparameter ranges. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Grid search",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Random search",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Bayesian optimization",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Hyperband",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: La búsqueda en malla (grid search) prueba combinaciones exhaustivas de valores categóricos predefinidos; no usa regresión ni aprende de los resultados de ejecuciones anteriores para elegir el siguiente conjunto de hiperparámetros, y la documentación de SageMaker AI indica que solo admite parámetros categóricos.\n\nOpción B: La búsqueda aleatoria (random search) elige combinaciones de hiperparámetros de forma aleatoria e independiente de los resultados de los trabajos anteriores; no hay ningún mecanismo secuencial ni de regresión, por lo que no cumple el requisito descrito.\n\nOpción C (Correcta): La documentación oficial de Amazon SageMaker AI sobre estrategias de ajuste automático de modelos describe la optimización bayesiana textualmente como una estrategia que «trata el ajuste de hiperparámetros como un problema de regresión»: tras probar un conjunto de valores, el ajuste de hiperparámetros usa regresión para elegir el siguiente conjunto de valores a probar, explotando lo aprendido de ejecuciones previas. Esto coincide exactamente con el enunciado (usa regresión para seleccionar de forma lenta y secuencial el siguiente conjunto de hiperparámetros basándose en ejecuciones anteriores), y es también la estrategia recomendada para rangos de hiperparámetros pequeños, donde requiere significativamente menos trabajos de entrenamiento que random search.\n\nOpción D: Hyperband es una estrategia multi-fidelidad que asigna recursos dinámicamente y detiene anticipadamente (early stopping) los trabajos con peor rendimiento para reasignar recursos a configuraciones más prometedoras; no se basa en un modelo de regresión secuencial sobre el espacio de hiperparámetros como Bayesian optimization, y está pensada para acelerar la exploración de espacios grandes, no para rangos pequeños.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-how-it-works.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20214,
    "questionNumber": 214,
    "question": "A healthcare company wants to detect irregularities in patient vital signs that could indicate early signs of a medical condition. The company has an unlabeled dataset that includes patient health records, medication history, and lifestyle changes. Which algorithm and hyperparameter should the company use to meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Use the Amazon SageMaker AI XGBoost algorithm. Set max_depth to greater than 100 to regulate tree complexity.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use the Amazon SageMaker AI k-means clustering algorithm. Set k to determine the number of clusters.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the Amazon SageMaker AI DeepAR algorithm. Set epochs to the number of training iterations.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use the Amazon SageMaker AI Random Cut Forest (RCF) algorithm. Set num_trees to greater than 100.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: XGBoost es un algoritmo de aprendizaje supervisado (requiere una variable objetivo etiquetada) usado típicamente para clasificación o regresión sobre datos tabulares; el escenario describe un dataset SIN ETIQUETAR, por lo que XGBoost no es aplicable, independientemente del valor de max_depth.\n\nOpción B: K-means es un algoritmo de clustering no supervisado que agrupa observaciones similares en k grupos, pero su objetivo es la segmentación de datos en grupos, no la detección de observaciones anómalas o irregulares dentro del flujo de datos; no está diseñado específicamente para identificar anomalías puntuales.\n\nOpción C: DeepAR es un algoritmo supervisado de pronóstico de series temporales (forecasting) que requiere series temporales históricas con el fin de predecir valores futuros; no está diseñado para detectar anomalías en datos no etiquetados de signos vitales, sino para predecir la evolución futura de una serie.\n\nOpción D (Correcta): La documentación de Amazon SageMaker AI describe Random Cut Forest (RCF) como un algoritmo NO SUPERVISADO diseñado específicamente para detectar puntos de datos anómalos que se desvían de un patrón bien estructurado, asignando una puntuación de anomalía basada en cómo de fácil es aislar cada punto en un bosque de árboles aleatorios. Esto se ajusta exactamente al caso de detectar irregularidades en signos vitales sin datos etiquetados. El hiperparámetro documentado num_trees controla el número de árboles del bosque; aumentar num_trees (por ejemplo, por encima de 100) reduce el ruido en las puntuaciones de anomalía resultantes.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/rcf_how-it-works.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/rcf_hyperparameters.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20215,
    "questionNumber": 215,
    "question": "An ML engineer at an entertainment company is refining an ML model to predict audience preferences. As the model learns from data, the ML engineer notices that the model's performance peaks early and then begins to gradually decline. The ML engineer must prevent the performance degradation after initial success. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Increase the number of layers.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Implement early stopping.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Add more neurons to each layer to capture complex patterns.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Examine model bias and variance to understand performance issues.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Aumentar el número de capas incrementa la capacidad y complejidad del modelo, lo que normalmente AGRAVA el sobreajuste (la causa típica de que el rendimiento mejore al principio y luego se degrade), en lugar de prevenirlo.\n\nOpción B (Correcta): El patrón descrito (el rendimiento mejora al principio del entrenamiento y luego se degrada gradualmente) es la firma clásica del sobreajuste (overfitting): el modelo empieza a memorizar particularidades del conjunto de entrenamiento en lugar de generalizar. La documentación de Amazon SageMaker AI señala explícitamente que el sobreentrenamiento (overtraining) puede evitarse mediante early stopping, deteniendo el entrenamiento en el punto donde el rendimiento en el conjunto de validación es óptimo, antes de que comience la degradación.\n\nOpción C: Añadir más neuronas a cada capa aumenta aún más la capacidad del modelo, lo que tiende a favorecer el sobreajuste en lugar de prevenirlo; no ataca la causa del problema descrito.\n\nOpción D: Examinar el sesgo (bias) y la varianza puede ser útil como diagnóstico general, pero no es en sí mismo una solución que prevenga la degradación del rendimiento; el enunciado pide una solución concreta para evitar la degradación, no un análisis adicional.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/debugger-built-in-rules.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-early-stopping.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20216,
    "questionNumber": 216,
    "question": "An ML engineer is tuning an image classification model that shows poor performance on one of two available classes during prediction. Analysis reveals that the images whose class the model performed poorly on represent an extremely small fraction of the whole training dataset. The ML engineer must improve the model's performance. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Optimize for accuracy. Use image augmentation on the less common images to generate new samples.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Optimize for F1 score. Use image augmentation on the less common images to generate new samples.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Optimize for accuracy. Use Synthetic Minority Oversampling Technique (SMOTE) on the less common images to generate new samples.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Optimize for F1 score. Use Synthetic Minority Oversampling Technique (SMOTE) on the less common images to generate new samples.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Optimizar para accuracy (exactitud global) es una mala elección de métrica en presencia de un fuerte desequilibrio de clases (una clase representa una fracción extremadamente pequeña del dataset), porque un modelo que casi siempre prediga la clase mayoritaria obtendría una exactitud global alta a pesar de un rendimiento muy pobre en la clase minoritaria, ocultando precisamente el problema que se quiere corregir.\n\nOpción B (Correcta): El F1-score (media armónica de precisión y recall) es la métrica recomendada cuando existe un desequilibrio de clases significativo, porque penaliza los modelos que ignoran la clase minoritaria, a diferencia de la exactitud global. Además, para datos de imagen, la técnica estándar para generar nuevas muestras de la clase minoritaria es el aumento de datos (image augmentation: rotaciones, volteos, recortes, cambios de brillo, etc.), que genera variaciones realistas de las imágenes existentes sin depender de interpolar en un espacio de características tabular.\n\nOpción C: Aunque propone aumento de imágenes (técnica correcta para datos de imagen), mantiene la exactitud (accuracy) como métrica de optimización, que sigue siendo inadecuada en un escenario de fuerte desequilibrio de clases.\n\nOpción D: SMOTE genera muestras sintéticas interpolando entre vecinos más cercanos en un espacio de características numéricas/tabulares; no está diseñado para trabajar directamente sobre píxeles de imágenes en bruto, donde interpolar linealmente entre imágenes no produce muestras realistas ni útiles, a diferencia del aumento de datos de imagen, que sí es la técnica estándar para este tipo de datos.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-transform.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20217,
    "questionNumber": 217,
    "question": "An ML engineer needs to develop an AI assistant by using Retrieval Augmented Generation (RAG) in Amazon Bedrock. The company stores a collection of PDF text files in an Amazon S3 bucket. The ML engineer must create an Amazon Bedrock knowledge base to process the PDF files and to store the processed files in a vector store. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use the latest version of Amazon Titan Text Premier to perform document embedding.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use the latest version of Mistral 7B Instruct to perform instruction tuning.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the latest version of Anthropic Claude Sonnet to perform instruction tuning.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Cohere Embed Multilingual to perform document embedding.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Amazon Titan Text Premier es un modelo de generación de texto (large language model) orientado a tareas de generación/instrucción, no un modelo de embeddings; la lista oficial de «Supported models for vector embeddings» de Amazon Bedrock Knowledge Bases no incluye Titan Text Premier, sino modelos específicos de embeddings como Titan Text Embeddings G1/V2. Esta opción confunde generación de texto con generación de embeddings.\n\nOpción B: Mistral 7B Instruct es un modelo de generación de texto orientado a seguir instrucciones (chat/completions); además, la propia opción describe una tarea incoherente para una base de conocimiento (instruction tuning) que no es lo que hace una base de conocimiento de Bedrock al ingerir documentos. No es un modelo de embeddings soportado para bases de conocimiento.\n\nOpción C: Anthropic Claude Sonnet es un modelo de generación de texto (LLM conversacional), no un modelo de embeddings, y «instruction tuning» tampoco es la operación que se realiza al construir el almacén vectorial de una base de conocimiento.\n\nOpción D (Correcta): La documentación oficial de Amazon Bedrock Knowledge Bases («Supported models for vector embeddings») lista explícitamente Cohere Embed Multilingual (cohere.embed-multilingual-v3) como uno de los modelos de embeddings soportados para convertir los fragmentos de documentos en vectores numéricos que se almacenan en la base de datos vectorial. Es el único de los cuatro modelos mencionados en las opciones que aparece en esa lista oficial de modelos de embeddings.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-supported.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20218,
    "questionNumber": 218,
    "question": "An ML engineer needs to build a processing pipeline to identify and remove personally identifiable information (PII) from petabytes of unstructured data. The ML engineer will use the processed data to train ML models in Amazon SageMaker AI. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use the Apache Spark-based serverless engine from AWS Glue interactive sessions. Use the Detect PII transform feature to identify and remove the PII data.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use AWS Glue Data Wrangler within Amazon SageMaker Canvas to detect and remove the PII.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the Amazon SageMaker Clarify API to detect and mask the PII data.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use the DetectEntities API action in Amazon Comprehend to identify and remove the PII data.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): AWS Glue proporciona el transform «Detect PII» (parte de Sensitive Data Detection), que se ejecuta sobre un motor distribuido Apache Spark sin servidor (incluyendo AWS Glue interactive sessions/Glue Studio), capaz de escanear y enmascarar/eliminar entidades PII (usando patrones predefinidos de AWS o personalizados) a gran escala distribuida, lo que lo hace apto para procesar datos no estructurados del orden de petabytes antes de usarlos para entrenar modelos en SageMaker AI.\n\nOpción B: «AWS Glue Data Wrangler» no existe como tal: Data Wrangler es una funcionalidad de Amazon SageMaker (no de AWS Glue), y aunque SageMaker Canvas ofrece transformaciones de datos, la capacidad de detección y enmascarado de PII a escala de petabytes de datos no estructurados no es una función nativa de SageMaker Canvas/Data Wrangler; el nombre del servicio en la opción es incorrecto y confunde dos productos distintos.\n\nOpción C: La API de SageMaker Clarify está orientada a la detección de sesgo (bias) y explicabilidad del modelo (feature attribution), no a la detección ni al enmascarado de información personal identificable; no es la herramienta adecuada para este caso.\n\nOpción D: Amazon Comprehend DetectEntities es un servicio de NLP que analiza documentos de texto individualmente a través de llamadas a su API; no está diseñado ni es eficiente en coste para procesar de forma distribuida petabytes de datos no estructurados, a diferencia de un motor Spark distribuido y sin servidor como el de AWS Glue.\n\nReferencias:\nhttps://docs.aws.amazon.com/glue/latest/dg/detect-PII.html\nhttps://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-sensitive-data-example.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20219,
    "questionNumber": 219,
    "question": "A company develops a recommendation model and hosts the model on an Amazon SageMaker AI endpoint. The model uses the SageMaker AI endpoint to perform near real-time inference to deliver personalized product recommendations to customers based on browsing history, purchase records, and in-app user interactions. After a major marketing campaign, the company observes a sharp drop in the model's performance. The company needs a solution to proactively monitor, detect, and validate model performance before future marketing campaigns. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use SageMaker Clarify to analyze changes in feature distribution. Configure SageMaker Model Monitor for near real-time input validation.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use Amazon CloudWatch dashboards to monitor endpoint metrics. Use SageMaker Model Monitor to track feature attribution.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use SageMaker Clarify for bias detection. Set up Amazon CloudWatch alarms to monitor model latency.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use SageMaker Model Monitor to monitor constraints. Use Amazon CloudWatch Logs Insights to analyze error patterns.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Tras una campaña de marketing, la causa más probable de una caída brusca del rendimiento es un cambio en el comportamiento de los usuarios que altera la distribución de las variables de entrada (nuevos segmentos de clientes, nuevos patrones de navegación/compra). SageMaker Clarify permite analizar cambios relacionados con la distribución y la importancia de las características (integrado como «Bias drift» y «Feature attribution drift» dentro de SageMaker Model Monitor), mientras que configurar SageMaker Model Monitor (monitor de calidad de datos) permite validar en near real-time que los datos de entrada del endpoint no se desvían de las estadísticas/restricciones de referencia calculadas sobre los datos de entrenamiento. La combinación de ambos permite monitorizar, detectar y validar proactivamente antes de futuras campañas, que es exactamente lo que pide el enunciado.\n\nOpción B: Los dashboards de Amazon CloudWatch para el endpoint muestran métricas operativas (latencia, número de invocaciones, utilización), no métricas de calidad de las predicciones ni cambios en los datos de entrada; no ayudan a detectar el motivo real de la caída de rendimiento relacionado con los datos.\n\nOpción C: La detección de sesgo (bias) de Clarify es útil para medir imparcialidad entre grupos, y las alarmas de CloudWatch sobre latencia solo cubren aspectos de rendimiento operativo del endpoint (tiempo de respuesta), no la calidad ni la relevancia estadística de las predicciones del modelo tras el cambio de comportamiento de los usuarios.\n\nOpción D: Monitorizar las restricciones (constraints) con SageMaker Model Monitor sí es relevante para detectar el drift de calidad de datos, pero limitarse a Amazon CloudWatch Logs Insights para analizar patrones de error solo permite depurar fallos técnicos (excepciones, errores de invocación) registrados en los logs, no evaluar de forma proactiva la validez estadística de las predicciones del modelo de recomendación antes de una futura campaña; carece del componente de análisis de sesgo/atribución que sí aporta Clarify en la opción A.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-data-quality.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20220,
    "questionNumber": 220,
    "question": "A company is using Amazon SageMaker AI to create a classification model to categorize the company's sales performance for each month of the previous 20 years on a scale from 1 to 5. The dataset includes fields for month, sales region, regional aggregate sales, and the number of stores in each sales region. The company notices that during two months of every year, the aggregate sales values are unexpectedly high. The company performs one-hot encoding on all non-numerical features in the training and validation datasets. The company uses the training dataset to train the classification model. When the company evaluates the model against the validation dataset, the results are less accurate than expected. The company must improve the model's accuracy on the validation dataset. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Remove records that include outliers across all features.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use a stratified split on the month and sales region features.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Perform normalization on the aggregate sales feature.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Perform normalization on the aggregate sales feature for each sales region.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Eliminar registros con valores atípicos en todas las variables descartaría precisamente los dos meses de ventas altas que, según el enunciado, son un patrón estacional recurrente y legítimo (no un error de datos); eliminar esos datos empobrecería el dataset y no resuelve el problema de fondo, que es la comparabilidad entre regiones.\n\nOpción B: Un split estratificado por mes y región ayuda a que el conjunto de validación tenga una representación proporcional de meses y regiones, pero no corrige el problema de fondo: que el valor absoluto de ventas agregadas de una región grande (con más tiendas) es intrínsecamente mucho mayor que el de una región pequeña, con independencia de cómo se reparta el split; el modelo seguiría confundiendo el tamaño de la región con el rendimiento relativo de ventas.\n\nOpción C: Normalizar la variable de ventas agregadas de forma global (sin distinguir por región) no resuelve el hecho de que la escala natural de esa variable difiere sustancialmente entre regiones grandes y pequeñas; una normalización global seguiría dejando los valores de las regiones grandes sistemáticamente más altos que los de las pequeñas, sin capturar el rendimiento relativo dentro de cada región.\n\nOpción D (Correcta): Normalizar la variable de ventas agregadas por separado dentro de cada región de ventas (agrupando por sales region) pone las ventas de cada región en una escala comparable relativa a su propio contexto (número de tiendas, tamaño de mercado), de forma que el modelo pueda aprender a clasificar el rendimiento relativo (escala 1-5) sin que el tamaño absoluto de la región distorsione la comparación; esta es una práctica estándar de ingeniería de características (normalización/escalado de variables numéricas, como min-max o z-score, aplicada por grupo) para corregir precisamente este tipo de sesgo de escala entre grupos heterogéneos.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/canvas-transform.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20221,
    "questionNumber": 221,
    "question": "A company is creating an ML model to identify defects in a product. The company has gathered a dataset and has stored the dataset in TIFF format in Amazon S3. The dataset contains 200 images in which the most common defects are visible. The dataset also contains 1,800 images in which there is no defect visible. An ML engineer trains the model and notices poor performance in some classes. The ML engineer identifies a class imbalance problem in the dataset. What should the ML engineer do to solves this problem?",
    "choices": [
      {
        "letter": "A",
        "text": "Use a few hundred images and Amazon Rekognition Custom Labels to train a new model.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Undersample the 200 images in which the most common defects are visible.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Oversample the 200 images in which the most common defects are visible.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use all 2,000 images and Amazon Rekognition Custom Labels to train a new model.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Incorrecta. Cambiar de algoritmo a Amazon Rekognition Custom Labels no resuelve el desbalanceo de clases, y además el dataset está en formato TIFF; la documentación de Rekognition Custom Labels indica que solo admite entrenamiento con imágenes en formato PNG o JPEG, por lo que ni siquiera sería viable usar el dataset sin convertirlo antes.\n\nOpción B: Incorrecta. Submuestrear (undersample) las 200 imágenes con defecto reduciría aún más la clase minoritaria, empeorando el desbalanceo en lugar de solucionarlo.\n\nOpción C (Correcta): El sobremuestreo (oversampling) de las 200 imágenes con defecto -mediante duplicación o técnicas de aumento de datos (data augmentation: rotaciones, flips, cambios de brillo, etc.)- es la técnica estándar para corregir el desbalanceo de clases cuando la clase minoritaria es la de interés (los defectos), incrementando su representación en el entrenamiento sin descartar datos de la clase mayoritaria.\n\nOpción D: Incorrecta por el mismo motivo que A: usar Rekognition Custom Labels con las 2000 imágenes desbalanceadas no corrige el problema de clase minoritaria, y el formato TIFF tampoco es compatible.\n\nReferencias:\nhttps://docs.aws.amazon.com/rekognition/latest/customlabels-dg/md-prepare-images.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20222,
    "questionNumber": 222,
    "question": "An ML engineer is building an ML model in Amazon SageMaker AI. The ML engineer needs to load historical data directly from Amazon S3, Amazon Athena, and Snowflake into SageMaker AI. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Glue DataBrew to import the data into SageMaker AI.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Build a pipeline in SageMaker Pipelines to process the data. Use AWS DataSync to load the processed data into SageMaker AI.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a feature store in SageMaker Feature Store. Use an Apache Spark connector to Feature Store to access the data.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use SageMaker Data Wrangler to query and import the data.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Incorrecta. AWS Glue DataBrew es una herramienta de preparación de datos visual, pero no está diseñada como el mecanismo nativo de importación multi-fuente (S3, Athena, Snowflake) directamente dentro de SageMaker AI.\n\nOpción B: Incorrecta. AWS DataSync está pensado para migrar o sincronizar datos entre sistemas de almacenamiento (on-premises, EFS, FSx, S3), no para consultar bases de datos como Athena o Snowflake ni para cargar datos de forma interactiva en SageMaker.\n\nOpción C: Incorrecta. SageMaker Feature Store almacena features ya procesadas para inferencia/entrenamiento; no es una herramienta de importación de datos crudos desde S3, Athena o Snowflake.\n\nOpción D (Correcta): SageMaker Data Wrangler permite conexiones directas ('direct connections') para consultar e importar datos desde Amazon S3, Amazon Athena y Snowflake (entre otras fuentes), tal como confirma la documentación oficial de importación de datos de Data Wrangler.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-import.html",
    "category": "Data Preparation",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20223,
    "questionNumber": 223,
    "question": "A company is developing an application that reads animal descriptions from user prompts and generates images based on the information from the prompts. The application reads a message from an Amazon Simple Queue Service (Amazon SQS) queue. Then the application uses Amazon Titan Image Generator on Amazon Bedrock to generate an image based on the information in the message. Finally, the application removes the message from SQS queue. Which IAM permissions should the company assign to the application's IAM role? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Allow the bedrock:InvokeModel action for the Amazon Titan Image Generator resource.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Allow the bedrock:Get* action for the Amazon Titan Image Generator resource.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Allow the sqs:ReceiveMessage action and the sqs:DeleteMessage action for the SQS queue resource.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Allow the sqs:GetQueueAttributes action and the sqs:DeleteMessage action for the SQS queue resource.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Allow the sagemaker:PutRecord* action for the Amazon Titan Image Generator resource.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): La aplicación debe invocar el modelo Titan Image Generator en Amazon Bedrock, y la acción de IAM que permite hacer esa llamada de inferencia es bedrock:InvokeModel (usada por la API InvokeModel de Bedrock Runtime para generar la imagen a partir del prompt).\n\nOpción B: Incorrecta. bedrock:Get* corresponde a acciones de lectura de metadatos/configuración de los recursos de Bedrock (por ejemplo GetFoundationModel), no a la invocación del modelo para generar contenido.\n\nOpción C (Correcta): El flujo descrito es leer el mensaje de la cola SQS (sqs:ReceiveMessage) y, tras procesarlo, eliminarlo de la cola (sqs:DeleteMessage). Estas son exactamente las acciones necesarias para un consumidor estándar de SQS, tal como confirman la referencia de permisos de la API de Amazon SQS y los ejemplos de políticas de IAM para consumidores de una cola.\n\nOpción D: Incorrecta. sqs:GetQueueAttributes solo permite leer atributos de configuración de la cola (por ejemplo el número de mensajes visibles), pero no permite recibir el contenido del mensaje; sin sqs:ReceiveMessage la aplicación no podría leer el mensaje que necesita procesar.\n\nOpción E: Incorrecta. sagemaker:PutRecord* es una acción de Amazon SageMaker (relacionada con Feature Store), no de Amazon Bedrock, y no guarda relación con el flujo descrito.\n\nNota sobre discrepancia: el campo 'Most Accepted Answer' extraído del scraping solo muestra la letra A (probable artefacto de extracción, ya que la pregunta es de tipo 'Choose two'), pero la discusión de la comunidad ('Selected Answer: AC') y el análisis técnico de las acciones de IAM confirman que la combinación correcta es A y C.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-runtime_example_bedrock-runtime_InvokeModel_TitanImageGenerator_section.html\nhttps://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-api-permissions-reference.html\nhttps://docs.aws.amazon.com/sns/latest/dg/subscribe-sqs-queue-to-sns-topic.html",
    "category": "Monitoring & Security",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 20224,
    "questionNumber": 224,
    "question": "An ML engineering team is spread across multiple locations. When the lead ML engineer opens an Amazon SageMaker Al notebook, the ML engineer does not see the latest merged notebook made by other team members from a Git repository. The lead ML engineer must see the latest SageMaker AI notebook updates. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Run the !git pull origin master command.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Run the !git commit command.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Run the !git push origin master command.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Run the !git branch command.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): !git pull origin master descarga y fusiona (merge) los últimos cambios del repositorio remoto en la rama local, que es exactamente lo que necesita el ingeniero líder para ver el notebook actualizado que el equipo fusionó en el repositorio Git.\n\nOpción B: Incorrecta. !git commit guarda cambios locales en el historial del repositorio local; no trae cambios remotos.\n\nOpción C: Incorrecta. !git push origin master envía (sube) cambios locales al repositorio remoto; es la operación inversa a la necesaria en este caso.\n\nOpción D: Incorrecta. !git branch solo lista o gestiona ramas locales; no actualiza el contenido del repositorio.\n\nSageMaker Studio integra un cliente Git que opera sobre un repositorio clonado localmente en el entorno del notebook, por lo que las operaciones estándar de Git (clone/pull/push) se aplican igual que en cualquier entorno de desarrollo con Git.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/studio-updated-git-attach-cli.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20225,
    "questionNumber": 225,
    "question": "A company is developing an ML model to forecast future values based on time series data. The dataset includes historical measurements collected at regular intervals and categorical features. The model needs to predict future values based on past patterns and trends. Which algorithm and hyperparameters should the company use to develop the model?",
    "choices": [
      {
        "letter": "A",
        "text": "Use the Amazon SageMaker AI XGBoost algorithm. Set the scale_pos_weight hyperparameter to adjust for class imbalance.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use k-means clustering with k to specify the number of clusters.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the Amazon SageMaker AI DeepAR algorithm with matching context_length and prediction_length hyperparameters.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use the Amazon SageMaker AI Random Cut Forest (RCF) algorithm with contamination to set the expected proportion of anomalies.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Incorrecta. XGBoost es un algoritmo de aprendizaje supervisado para regresión/clasificación tabular; scale_pos_weight se usa para compensar el desbalanceo de clases en problemas de clasificación binaria, no para pronosticar series temporales con patrones y tendencias históricas.\n\nOpción B: Incorrecta. k-means es un algoritmo de clustering no supervisado; no genera pronósticos de valores futuros basados en tendencias temporales.\n\nOpción C (Correcta): El algoritmo DeepAR de SageMaker AI está diseñado específicamente para el pronóstico de series temporales escalares mediante redes neuronales recurrentes, entrenando un único modelo conjunto sobre múltiples series relacionadas y soportando características categóricas asociadas a cada serie. Los hiperparámetros context_length (cuánta historia usa el modelo) y prediction_length (cuántos pasos futuros predice) son parámetros clave que deben configurarse de forma coherente según la documentación oficial de DeepAR.\n\nOpción D: Incorrecta. Random Cut Forest (RCF) es un algoritmo de detección de anomalías (usa 'contamination' para estimar la proporción esperada de anomalías), no un algoritmo de pronóstico de valores futuros.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/deepar_how-it-works.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/algorithms-time-series.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20226,
    "questionNumber": 226,
    "question": "An ML engineer is designing an AI-powered traffic management system to adjust traffic lights during predicted congestion. The system must use near real-time inference to generate predictions to help prevent traffic collisions. The system must use a batch processing pipeline to perform historical analysis of the predictions to continuously refine and improve the model. The historical analysis will take several hours to evaluate how well the predictions correlate with actual outcomes. The system must be able to scale inference endpoints appropriately to meet demand. Which combination of solutions will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon SageMaker real-time inference endpoints. Configure the endpoints to scale automatically based on a target tracking scaling policy that uses the metric ConcurrentInvocationsPerinstance.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure reserved concurrency for AWS Lambda functions to process streaming data. Use Lambda SnapStart to connect the Lambda functions to Amazon SageMaker real-time endpoints to support near real-time traffic predictions.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure an Amazon SageMaker Processing job for batch analysis of historical prediction data. Use Amazon EventBridge to schedule the job to run daily. Allow several hours for in-depth analysis to refine and improve the traffic management model.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use an Amazon EC2 Auto Scaling group to host containers to support the batch analysis of historical prediction data. Configure scaling based on Amazon CloudWatch metrics to analyze historical traffic patterns and model performance over multiple hours.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Use an AWS Lambda function to perform the historical analysis. Use Amazon EventBridge to invoke the Lambda function.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Los endpoints en tiempo real de SageMaker AI se pueden configurar con Application Auto Scaling y una política de 'target tracking' para escalar automáticamente según la carga. La métrica predefinida real documentada por AWS para este propósito es SageMakerVariantInvocationsPerInstance (también referenciada como InvocationsPerInstance); el enunciado la denomina 'ConcurrentInvocationsPerinstance', nombre que no coincide exactamente con ninguna métrica predefinida de auto scaling documentada por AWS para endpoints en tiempo real (existe, en cambio, ConcurrentRequestsPerCopy para Inference Components). A pesar de esa imprecisión de nomenclatura, esta es la única opción que describe correctamente el mecanismo real -escalado automático de endpoints en tiempo real mediante 'target tracking'- necesario para escalar según demanda las predicciones casi en tiempo real.\n\nOpción B: Incorrecta. AWS Lambda SnapStart es una optimización de arranque en frío (cold start) para funciones Lambda con runtimes compatibles; no es un mecanismo para 'conectar' funciones Lambda a endpoints de SageMaker ni aporta nada a la escalabilidad de esos endpoints.\n\nOpción C (Correcta): Un trabajo de SageMaker Processing programado mediante Amazon EventBridge (por ejemplo con una regla diaria) es el mecanismo estándar y totalmente gestionado para ejecutar análisis batch de larga duración (varias horas) sobre datos históricos de predicciones, tal como documenta AWS para la programación de trabajos de Processing con EventBridge y los eventos de cambio de estado de estos trabajos.\n\nOpción D: Incorrecta. Un grupo de Auto Scaling de EC2 para alojar contenedores de análisis batch es viable técnicamente, pero implica mucho más esfuerzo operativo (gestión de instancias, AMIs, parches) que un trabajo de SageMaker Processing totalmente gestionado.\n\nOpción E: Incorrecta. AWS Lambda tiene un límite máximo de tiempo de ejecución de 15 minutos documentado oficialmente, por lo que es técnicamente imposible usar una función Lambda para un análisis histórico que 'tardará varias horas' en completarse.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling-add-code-define.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-data-export.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html",
    "category": "Deployment & Orchestration",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 20227,
    "questionNumber": 227,
    "question": "A company wants to launch a new website feature that predicts home prices based on user-supplied home attributes. The attributes include location, square footage, and number of bedrooms and bathrooms. An ML engineer has trained a regression model by using the Amazon SageMaker AI XGBoost algorithm. The model performs well with training data. However, the model significantly underperforms when it is validated against real-world data. Which solution will improve the model's validation score with the LEAST implementation effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a larger training dataset that includes more real-world data. Retrain the model.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Increase the value of the num_round hyperparameter.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Change the eval_metric hyperparameter from Root Mean Square Error (RMSE) to Error.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Increase the value of the lambda hyperparameter.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Incorrecta. Crear un dataset de entrenamiento más grande con más datos reales podría mejorar la generalización, pero implica un esfuerzo de implementación considerablemente mayor (recolectar, etiquetar y validar nuevos datos reales) que ajustar un hiperparámetro, por lo que no cumple el requisito de 'menor esfuerzo de implementación'.\n\nOpción B: Incorrecta. Aumentar num_round (número de rondas de boosting) generalmente incrementa la capacidad del modelo para ajustarse a los datos de entrenamiento, lo que tendería a agravar el sobreajuste (overfitting) en lugar de solucionarlo.\n\nOpción C: Incorrecta. Cambiar la métrica de evaluación (eval_metric) de RMSE a Error no modifica el comportamiento de aprendizaje del modelo ni corrige el sobreajuste; además 'Error' es una métrica de clasificación, no adecuada para un problema de regresión de precios.\n\nOpción D (Correcta): El síntoma descrito -buen desempeño en entrenamiento pero mal desempeño en datos reales/validación- es un caso clásico de sobreajuste (overfitting). El hiperparámetro lambda de XGBoost en SageMaker AI controla el término de regularización L2 dentro de la función objetivo regularizada del algoritmo; aumentar su valor penaliza más los pesos del modelo, reduciendo su complejidad y el sobreajuste, y esto se logra simplemente cambiando un hiperparámetro y reentrenando, mucho menos esfuerzo que recolectar más datos reales.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/xgboost-HowItWorks.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/xgboost_hyperparameters.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20228,
    "questionNumber": 228,
    "question": "A company is performing A/B testing on a model that provides product recommendations. The company has deployed two versions of the model and is showing each version of the model to 50% of users randomly. Which metric should the company use to evaluate whether users act on a recommendation?",
    "choices": [
      {
        "letter": "A",
        "text": "The conversion rates between the two versions of the model",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "The number of recommendations provided to each user",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "The model accuracy on held-out test data",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "The latency of model inference",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): La tasa de conversión (conversion rate) mide directamente si los usuarios actúan sobre la recomendación (por ejemplo, hacen clic, compran o interactúan con el producto recomendado), que es exactamente lo que la empresa quiere evaluar al comparar las dos versiones del modelo en una prueba A/B. La guía de AWS sobre estrategias de despliegue describe explícitamente el A/B testing como una técnica para 'recopilar y comparar métricas de negocio críticas' entre versiones del modelo.\n\nOpción B: Incorrecta. El número de recomendaciones entregadas a cada usuario es una métrica de volumen/exposición, no de efectividad; no indica si el usuario actuó sobre la recomendación.\n\nOpción C: Incorrecta. La exactitud (accuracy) sobre datos de prueba retenidos (held-out) es una métrica offline de calidad predictiva del modelo, pero no mide el comportamiento real de los usuarios en producción.\n\nOpción D: Incorrecta. La latencia de inferencia es una métrica de rendimiento técnico del servicio, no de si el usuario actuó sobre la recomendación.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-ab-testing.html\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/ml-operations-planning/deployment.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20229,
    "questionNumber": 229,
    "question": "A company is using Amazon SageMaker AI to build an ML model to predict customer behavior. The company needs to explain the bias in the model to an auditor. The explanation must focus on demographics data of the customers. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use SageMaker Clarify to generate a bias report. Send the report to the auditor.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use AWS Glue DataBrew to create a job to detect drift in the model's data quality. Send the job output to the auditor.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon Quick Suite (previously known as Amazon QuickSight) integration with SageMaker AI to generate a bias report from Quick Suite. Send the report to the auditor.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon CloudWatch metrics from the SageMaker AI namespace to create a bias dashboard. Share the dashboard with the auditor.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Amazon SageMaker Clarify está diseñado específicamente para detectar y explicar sesgo (bias) en los datos y en los modelos, generando informes de sesgo (bias reports) con métricas pre-entrenamiento y post-entrenamiento sobre atributos demográficos (facets), que es exactamente lo que necesita la empresa para explicar el sesgo a un auditor centrado en datos demográficos de los clientes.\n\nOpción B: Incorrecta. AWS Glue DataBrew se usa para detectar drift en la calidad de los datos (data quality drift), no para generar explicaciones de sesgo del modelo respecto a atributos demográficos.\n\nOpción C: Incorrecta. Amazon Quick Suite (QuickSight) es una herramienta de business intelligence/visualización; no genera de forma nativa informes de sesgo de modelos de ML, esa es una función específica de SageMaker Clarify.\n\nOpción D: Incorrecta. Las métricas de Amazon CloudWatch para SageMaker AI son métricas operativas del servicio (latencia, invocaciones, errores), no métricas de sesgo o equidad respecto a atributos demográficos.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-detect-data-bias.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/clarify-measure-post-training-bias.html\nhttps://docs.aws.amazon.com/whitepapers/latest/aws-overview/machine-learning.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20230,
    "questionNumber": 230,
    "question": "A digital media entertainment company needs real-time video content moderation to ensure compliance during live streaming events. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Rekognition and AWS Lambda to extract and analyze the metadata from the videos' image frames.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use Amazon Rekognition and a large language model (LLM) hosted on Amazon Bedrock to extract and analyze the metadata from the videos' image frames.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon SageMaker AI to extract and analyze the metadata from the videos' image frames.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon Transcribe and Amazon Comprehend to extract and analyze the metadata from the videos' image frames.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Amazon Rekognition ofrece de forma nativa capacidades de detección de contenido inapropiado u ofensivo en imágenes y vídeo (moderation labels) sin necesidad de entrenar o gestionar modelos propios; usando AWS Lambda para extraer fotogramas del streaming en vivo y llamar a Rekognition para analizarlos se obtiene una solución serverless y totalmente gestionada, con el mínimo esfuerzo operativo. La documentación oficial confirma además que la función de 'Streaming Video' de Rekognition Video ya no está disponible para clientes nuevos, lo que refuerza que el patrón de referencia vigente para moderación de vídeo en vivo es extraer fotogramas y analizarlos con la API de imagen de Rekognition, tal como describe esta opción.\n\nOpción B: Incorrecta. Añadir un LLM en Amazon Bedrock para analizar los metadatos extraídos supone una arquitectura más compleja y con más piezas que mantener (invocaciones adicionales al modelo, prompts, coste añadido) sin necesidad real, dado que las etiquetas de moderación de Rekognition ya cubren de forma nativa la detección de contenido inapropiado.\n\nOpción C: Incorrecta. Usar Amazon SageMaker AI implicaría entrenar, alojar y mantener un modelo propio de moderación de contenido, lo cual añade mucho más esfuerzo operativo que usar un servicio administrado y ya entrenado como Rekognition.\n\nOpción D: Incorrecta. Amazon Transcribe y Amazon Comprehend procesan audio y texto respectivamente; no analizan directamente los fotogramas de imagen de un vídeo para detectar contenido visual inapropiado.\n\nReferencias:\nhttps://docs.aws.amazon.com/rekognition/latest/dg/streaming-video.html\nhttps://docs.aws.amazon.com/rekognition/latest/dg/moderation.html\nhttps://docs.aws.amazon.com/rekognition/latest/dg/what-is.html",
    "category": "Deployment & Orchestration",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20231,
    "questionNumber": 231,
    "question": "An ML engineer uses A/B testing to dynamically select recommendation models. The models are deployed on Amazon SageMaker AI endpoints. The ML engineer needs to monitor system metrics such as latency, call volume, and HTTP status codes when the endpoints are invoked. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS X-Ray tracing to monitor SageMaker AI endpoints.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure Amazon CloudWatch dashboards with AWS Lambda log processors.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Enable AWS Identity and Access Management (IAM) Access Analyzer to track SageMaker AI endpoint metrics.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy AWS Trusted Advisor checks on SageMaker AI endpoint instances.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Incorrecta. AWS X-Ray está orientado al trazado distribuido de solicitudes entre servicios (tracing) para depurar latencia en arquitecturas distribuidas; no es la herramienta pensada para consolidar métricas de sistema como volumen de llamadas o códigos de estado HTTP de un endpoint de SageMaker.\n\nOpción B (Correcta): Amazon SageMaker AI publica de forma automática y nativa en Amazon CloudWatch métricas de endpoint como Invocations, ModelLatency, OverheadLatency, Invocation4XXErrors e Invocation5XXErrors (códigos de estado HTTP), que se pueden visualizar en un dashboard de CloudWatch. Es la única opción de la lista que usa el servicio correcto (CloudWatch) para este propósito. Cabe matizar, según la documentación oficial de métricas de endpoints de SageMaker AI, que dichas métricas ya se publican automáticamente sin necesidad de procesadores de logs adicionales, por lo que el componente 'AWS Lambda log processors' mencionado en la opción no sería estrictamente necesario para lograr el mínimo esfuerzo operativo; aun así, entre las opciones dadas, esta es la más alineada con la práctica recomendada de AWS.\n\nOpción C: Incorrecta. AWS IAM Access Analyzer analiza políticas de recursos para detectar acceso no intencionado, no recopila métricas operativas de latencia o códigos de estado de un endpoint.\n\nOpción D: Incorrecta. AWS Trusted Advisor ofrece comprobaciones de buenas prácticas (coste, seguridad, límites de servicio, tolerancia a fallos), no monitorización en tiempo real de métricas de invocación de un endpoint específico.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints-monitoring.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20232,
    "questionNumber": 232,
    "question": "An ML engineer is importing a custom model from the Hugging Face Hub into Amazon Bedrock. The ML engineer wants to use the model with the Amazon Bedrock API in an agentic AI application. Which combination of steps will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Import the model for deployment by using Amazon Bedrock On-Demand mode.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Convert the model to a quantized format. Import the quantized model after conversion.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Import the model directly by using the Amazon SageMaker AI SDK in the agentic AI application.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "During the model import process, configure an auto-scaling policy before using the model in the agentic AI application.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "In the import job, provide the complete Amazon S3 URI that points to the Hugging Face model files. Ensure that the S3 URI is in the same AWS account as the Amazon Bedrock import job.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A (Correcta): Amazon Bedrock Custom Model Import está diseñado específicamente para poner en producción modelos personalizados/open-source (por ejemplo, provenientes de Hugging Face) mediante inferencia On-Demand; la propia documentación oficial de prerequisitos describe el 'custom model import job' como un mecanismo de importación de Bedrock para modelos personalizados destinados a inferencia on-demand.\n\nOpción B: Incorrecta. No existe un requisito documentado de convertir el modelo a un formato cuantizado antes de importarlo; Bedrock Custom Model Import admite pesos en formato Hugging Face, y aunque puede haber consideraciones según la arquitectura del modelo, la cuantización no figura como paso obligatorio en los prerequisitos oficiales.\n\nOpción C: Incorrecta. Un trabajo de importación de modelo personalizado en Bedrock se crea mediante la consola, la API o el SDK de Bedrock (por ejemplo, CreateModelImportJob), no a través del SDK de Amazon SageMaker AI; este último no es el mecanismo soportado para invocar un modelo importado en Bedrock desde una aplicación agente.\n\nOpción D: Incorrecta. Bedrock Custom Model Import no requiere ni expone una configuración manual de política de auto-scaling como paso del proceso de importación; el servicio gestiona la inferencia on-demand de forma administrada.\n\nOpción E (Correcta): La documentación oficial de prerequisitos de importación de modelos personalizados en Bedrock indica explícitamente que, si se usa un bucket de Amazon S3 (o clave KMS) de otra cuenta, es necesario configurar acceso cross-account adicional; esto confirma que, por defecto, el URI de S3 debe pertenecer a la misma cuenta de AWS que el trabajo de importación de Bedrock, salvo que se configure expresamente el acceso entre cuentas.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/custom-model-import-prereq.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/cross-account-access-cmi.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-import-model.html",
    "category": "Deployment & Orchestration",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 20233,
    "questionNumber": 233,
    "question": "A company is developing ML models by using PyTorch and TensorFlow estimators with Amazon SageMaker AI. An ML engineer configures the SageMaker AI estimator and now needs to initiate a training job that uses a training dataset. Which SageMaker AI SDK method can initiate the training job?",
    "choices": [
      {
        "letter": "A",
        "text": "fit method",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "create_model method",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "deploy method",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "predict method",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): En el SDK de Python de SageMaker AI, el método fit() de la clase Estimator (y de sus subclases como PyTorch o TensorFlow estimator) es el que lanza (inicia) el trabajo de entrenamiento (training job) usando el dataset de entrenamiento especificado, tal como muestran los ejemplos oficiales de uso del Estimator con TrainingInput y la llamada estimator.fit().\n\nOpción B: Incorrecta. create_model no inicia un entrenamiento; crea un objeto de modelo de SageMaker a partir de artefactos ya entrenados, normalmente como paso previo al despliegue.\n\nOpción C: Incorrecta. deploy() despliega un modelo entrenado en un endpoint de inferencia; no entrena el modelo.\n\nOpción D: Incorrecta. predict() se usa para realizar inferencias contra un endpoint ya desplegado, no para entrenar el modelo.\n\nReferencias:\nhttps://docs.aws.amazon.com/nova/latest/nova2-userguide/nova-sft-2-smtj.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20234,
    "questionNumber": 234,
    "question": "An ML engineer used Amazon SageMaker Studio to train a neural network. The neural network logs its information into TensorBoard and uses stochastic gradient descent (SGD) as the optimizer. The ML engineer reviewed training graphs and discovered that the accuracy was not increasing and the loss was decreasing very slowly. The ML engineer needs to improve the model's performance without increasing the total training time. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Increase the initial learning rate.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Decrease the initial learning rate.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Increase the total number of epochs.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Decrease the total number of epochs.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Cuando la exactitud (accuracy) no aumenta y la pérdida (loss) disminuye muy lentamente con SGD, el síntoma típico es que la tasa de aprendizaje (learning rate) es demasiado pequeña, ya que -según la documentación oficial sobre este hiperparámetro- 'un valor demasiado pequeño hace que el algoritmo requiera muchas pasadas (epochs) para acercarse a los pesos óptimos'. Aumentar la tasa de aprendizaje inicial acelera la convergencia sin necesidad de aumentar el número total de épocas, cumpliendo el requisito de no incrementar el tiempo total de entrenamiento.\n\nOpción B: Incorrecta. Disminuir aún más la tasa de aprendizaje empeoraría el problema descrito (convergencia todavía más lenta).\n\nOpción C: Incorrecta. Aumentar el número total de épocas podría eventualmente mejorar el ajuste, pero incrementa directamente el tiempo total de entrenamiento, lo cual viola el requisito explícito de no aumentarlo.\n\nOpción D: Incorrecta. Disminuir el número de épocas reduciría aún más el tiempo de entrenamiento del modelo, que ya es insuficiente, empeorando el desempeño en lugar de mejorarlo.\n\nReferencias:\nhttps://docs.aws.amazon.com/machine-learning/latest/dg/training-parameters1.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20235,
    "questionNumber": 235,
    "question": "A company wants to use large language models (LLMs) that are supported by Amazon Bedrock to develop a chat interface for the company's internal technical documentation. The company stores the documentation as dozens of text files that are several megabytes in total size. The company updates the text files often. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new LLM on Amazon Bedrock. Train the new LLM on the original dataset and the company documentation. Make the new model available in Bedrock for calls from the chat interface.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Integrate the company documentation with Amazon Bedrock guardrails. Invoke the guardrails for all Amazon Bedrock calls from the chat interface.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use all the text files to fine tune a model in Amazon Bedrock. Use the fine-tuned model to process user prompts.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Upload all the text files to an Amazon Bedrock knowledge base. Use the knowledge base to provide context when the chat interface makes calls to Amazon Bedrock.",
        "isCorrect": true
      }
    ],
    "comments": "Opción A: Incorrecta. Entrenar un LLM completamente nuevo desde cero con el dataset original más la documentación de la empresa es extremadamente costoso en cómputo y tiempo, y totalmente desproporcionado para un caso de uso de chat sobre documentación interna que además se actualiza con frecuencia.\n\nOpción B: Incorrecta. Los guardrails de Amazon Bedrock son un mecanismo de seguridad/filtrado de contenido (temas denegados, filtros de contenido dañino, etc.); no proporcionan al modelo contexto o conocimiento sobre la documentación técnica de la empresa.\n\nOpción C: Incorrecta. El fine-tuning de un modelo con todos los archivos de texto es más costoso que usar RAG, y dado que la documentación 'se actualiza con frecuencia', habría que reentrenar (re-fine-tune) el modelo cada vez que cambien los documentos, lo cual es operativa y económicamente ineficiente.\n\nOpción D (Correcta): Subir los archivos de texto a una base de conocimiento (knowledge base) de Amazon Bedrock permite implementar generación aumentada por recuperación (RAG): el conocimiento se indexa como embeddings vectoriales y se recupera dinámicamente en cada consulta para dar contexto al LLM en tiempo de inferencia, sin necesidad de reentrenar el modelo. Esto es mucho más económico y se adapta de forma natural a actualizaciones frecuentes de los documentos, como confirma la documentación oficial de Knowledge Bases for Amazon Bedrock.\n\nReferencias:\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html\nhttps://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/rag-fully-managed-bedrock.html",
    "category": "Model Development",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 20236,
    "questionNumber": 236,
    "question": "A company uses an ML model to recommend videos to users. The model is deployed on Amazon SageMaker AI. The model performed well initially after deployment, but the model's performance has degraded over time. Which solution can the company use to identify model drift in the future?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a monitoring job in SageMaker Model Monitor. Then create a baseline from the training dataset.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a baseline from the training dataset. Then create a monitoring job in SageMaker Model Monitor.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a baseline by using a built-in rule in SageMaker Clarify. Monitor the drift in Amazon CloudWatch.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Retrain the model on new data. Compare the retrained model's performance to the original model's performance.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Incorrecta. El orden está invertido: no se puede crear un trabajo de monitorización (monitoring job) en SageMaker Model Monitor sin haber definido antes una línea base (baseline), ya que el trabajo de monitorización necesita las estadísticas y restricciones (constraints) generadas a partir de esa línea base para poder comparar los datos en producción.\n\nOpción B (Correcta): El flujo oficial de Amazon SageMaker Model Monitor es primero crear una línea base (baseline) a partir del dataset de entrenamiento (mediante un trabajo de tipo 'suggest baseline' que genera estadísticas y restricciones), y después crear una programación de monitorización (monitoring schedule) que compara periódicamente los datos capturados en producción contra esa línea base para detectar drift. La documentación de 'How Amazon SageMaker Model Monitor works' describe exactamente esta secuencia: configurar la captura de datos, crear una línea base, y configurar la programación de monitorización.\n\nOpción C: Incorrecta. SageMaker Clarify puede detectar drift de sesgo o de atribución de características (feature attribution drift) con reglas propias, pero para el drift de modelo en general (calidad de datos/modelo) el mecanismo estándar y más directo es SageMaker Model Monitor, no una combinación de Clarify con CloudWatch como paso principal.\n\nOpción D: Incorrecta. Reentrenar el modelo y comparar el rendimiento es una acción reactiva (una posible respuesta al drift ya detectado), no un mecanismo para identificar proactivamente el drift en el futuro.\n\nReferencias:\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-create-baseline.html\nhttps://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-scheduling.html",
    "category": "Monitoring & Security",
    "multiSelect": false,
    "requiredCount": 1
  }
];
