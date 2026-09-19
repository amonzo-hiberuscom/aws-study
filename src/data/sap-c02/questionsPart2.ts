import { Question } from '../../types';

export const QUESTIONS_PART_2: Question[] = [
  {
    "id": 30133,
    "questionNumber": 133,
    "question": "A company runs a serverless application in a single AWS Region. The application accesses external URLs and extracts metadata from those sites. The company uses an Amazon Simple Notification Service (Amazon SNS) topic to publish URLs to an Amazon Simple Queue Service (Amazon SQS) queue. An AWS Lambda function uses the queue as an event source and processes the URLs from the queue. Results are saved to an Amazon S3 bucket. The company wants to process each URL in other Regions to compare possible differences in site localization. URLs must be published from the existing Region. Results must be written to the existing S3 bucket in the current Region. Which combination of changes will produce multi-Region deployment that meets these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy the SQS queue with the Lambda function to other Regions.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Subscribe the SNS topic in each Region to the SQS queue.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Subscribe the SQS queue in each Region to the SNS topic.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure the SQS queue to publish URLs to SNS topics in each Region.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Deploy the SNS topic and the Lambda function to other Regions.",
        "isCorrect": false
      }
    ],
    "comments": "Procesar cada URL en varias Regiones para comparar localización; las URLs se publican desde la Región existente (SNS) y los resultados se escriben en el S3 existente de la Región actual.\n\nArquitectura actual: SNS -> SQS -> Lambda -> S3. Para fan-out multi-Región: mantener el SNS en la Región existente y suscribir colas SQS de cada Región a ese SNS.\n\nOpción A (Correcta): Desplegar la cola SQS junto con la Lambda en las otras Regiones (cada Región procesa las URLs y, según el requisito, escribe resultados en el S3 de la Región actual).\n\nOpción B: 'Suscribir el SNS topic en cada Región a la SQS' invierte la relación (SNS no se suscribe a SQS); es al revés.\n\nOpción C (Correcta): Suscribir la cola SQS de cada Región al SNS topic de la Región existente. Así el topic hace fan-out a las colas de todas las Regiones. A + C implementa el fan-out cross-Region manteniendo la publicación desde la Región existente.\n\nOpción D: SQS no 'publica a SNS'; el flujo es SNS -> SQS. Incorrecta.\n\nOpción E: Desplegar SNS en otras Regiones contradice 'las URLs deben publicarse desde la Región existente'. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/sns/latest/dg/sns-cross-region-delivery.html\nhttps://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30134,
    "questionNumber": 134,
    "question": "A company runs a proprietary stateless ETL application on an Amazon EC2 Linux instances. The application is a Linux binary, and the source code cannot be modified. The application is single-threaded, uses 2 GB of RAM, and is highly CPU intensive. The application is scheduled to run every 4 hours and runs for up to 20 minutes. A solutions architect wants to revise the architecture for the solution. Which strategy should the solutions architect use?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Lambda to run the application. Use Amazon CloudWatch Logs to invoke the Lambda function every 4 hours.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Batch to run the application. Use an AWS Step Functions state machine to invoke the AWS Batch job every 4 hours.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Fargate to run the application. Use Amazon EventBridge (Amazon CloudWatch Events) to invoke the Fargate task every 4 hours.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use Amazon EC2 Spot Instances to run the application. Use AWS CodeDeploy to deploy and run the application every 4 hours.",
        "isCorrect": false
      }
    ],
    "comments": "ETL stateless (binario Linux, no modificable), single-thread, 2 GB RAM, muy intensivo en CPU, cada 4 horas hasta 20 minutos.\n\nOpción A: Lambda tiene límite de 15 minutos; el trabajo dura hasta 20 min, así que no cabe en Lambda. Además 'CloudWatch Logs para invocar' no es el disparador correcto. Descartada.\n\nOpción B: AWS Batch funcionaría, pero requiere más configuración (compute environments, job queues) y Step Functions para orquestar; más overhead que una tarea Fargate programada para un binario simple.\n\nOpción C (Correcta): Usar AWS Fargate para ejecutar el binario en un contenedor (sin gestionar servidores, soporta 20 min sin problema, se dimensiona CPU/RAM), invocado por una regla de Amazon EventBridge cada 4 horas. Es la solución serverless de contenedores adecuada para un binario CPU-intensivo por lotes, con el menor overhead. Correcta.\n\nOpción D: Spot Instances + CodeDeploy es más operación (gestionar instancias, despliegues) y las interrupciones de Spot pueden cortar el trabajo. Menos adecuada.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html\nhttps://docs.aws.amazon.com/eventbridge/latest/userguide/eb-run-ecs-task.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30135,
    "questionNumber": 135,
    "question": "A company is creating a sequel for a popular online game. A large number of users from all over the world will play the game within the first week after launch. Currently, the game consists of the following components deployed in a single AWS Region: • Amazon S3 bucket that stores game assets • Amazon DynamoDB table that stores player scores A solutions architect needs to design a multi-Region solution that will reduce latency, improve reliability, and require the least effort to implement. What should the solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon CloudFront distribution to serve assets from the S3 bucket. Configure S3 Cross-Region Replication. Create a new DynamoDB table in a new Region. Use the new table as a replica target for DynamoDB global tables.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon CloudFront distribution to serve assets from the S3 bucket. Configure S3 Same-Region Replication. Create a new DynamoDB table in a new Region. Configure asynchronous replication between the DynamoDB tables by using AWS Database Migration Service (AWS DMS) with change data capture (CDC).",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create another S3 bucket in a new Region, and configure S3 Cross-Region Replication between the buckets. Create an Amazon CloudFront distribution and configure origin failover with two origins accessing the S3 buckets in each Region. Configure DynamoDB global tables by enabling Amazon DynamoDB Streams, and add a replica table in a new Region.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create another S3 bucket in the sine Region, and configure S3 Same-Region Replication between the buckets. Create an Amazon CloudFront distribution and configure origin failover with two origins accessing the S3 buckets. Create a new DynamoDB table in a new Region. Use the new table as a replica target for DynamoDB global tables.",
        "isCorrect": false
      }
    ],
    "comments": "Solución multi-Región para reducir latencia y mejorar fiabilidad con el MENOR esfuerzo: assets en S3 y scores en DynamoDB.\n\nOpción A: CloudFront + CRR + DynamoDB global tables es casi correcto, pero 'usar la nueva tabla como replica target' no describe bien la creación de global tables, y no usa origin failover de CloudFront. C es más preciso.\n\nOpción B: Same-Region Replication no da multi-Región; y usar DMS/CDC para replicar DynamoDB no es el mecanismo (se usan global tables). Incorrecta.\n\nOpción C (Correcta): Crear otro bucket S3 en una nueva Región con S3 Cross-Region Replication entre buckets; una distribución CloudFront con origin failover apuntando a los dos buckets (fiabilidad); y DynamoDB global tables habilitando DynamoDB Streams y añadiendo una replica table en la nueva Región (baja latencia y multi-Región para los scores). Cubre assets y scores multi-Región con el menor esfuerzo usando funciones nativas. Correcta.\n\nOpción D: Same-Region Replication no es multi-Región. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30136,
    "questionNumber": 136,
    "question": "A company has an on-premises website application that provides real estate information for potential renters and buyers. The website uses a Java backend and a NoSQL MongoDB database to store subscriber data. The company needs to migrate the entire application to AWS with a similar structure. The application must be deployed for high availability, and the company cannot make changes to the application. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use an Amazon Aurora DB cluster as the database for the subscriber data. Deploy Amazon EC2 instances in an Auto Scaling group across multiple Availability Zones for the Java backend application.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use MongoDB on Amazon EC2 instances as the database for the subscriber data. Deploy EC2 instances in an Auto Scaling group in a single Availability Zone for the Java backend application.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure Amazon DocumentDB (with MongoDB compatibility) with appropriately sized instances in multiple Availability Zones as the database for the subscriber data. Deploy Amazon EC2 instances in an Auto Scaling group across multiple Availability Zones for the Java backend application.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure Amazon DocumentDB (with MongoDB compatibility) in on-demand capacity mode in multiple Availability Zones as the database for the subscriber data. Deploy Amazon EC2 instances in an Auto Scaling group across multiple Availability Zones for the Java backend application.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar una web Java + MongoDB a AWS con estructura similar, alta disponibilidad, y SIN cambios en la aplicación.\n\nOpción A: Aurora es relacional (MySQL/PostgreSQL), no compatible con MongoDB; obligaría a cambiar la app. No cumple 'sin cambios' ni 'estructura similar'.\n\nOpción B: MongoDB autogestionado en EC2 en UNA sola AZ no es de alta disponibilidad; además es más overhead operativo. Descartada.\n\nOpción C (Correcta): Amazon DocumentDB (compatible con MongoDB) con instancias adecuadas en múltiples AZ para los datos de suscriptores (HA y compatible con la API de MongoDB, sin cambiar la app) y EC2 en un Auto Scaling group multi-AZ para el backend Java. Mantiene la estructura, es HA y no requiere cambios en la aplicación. Correcta.\n\nOpción D: DocumentDB no tiene 'on-demand capacity mode' como DynamoDB; esa descripción es incorrecta. C es la opción válida.\n\nReferencias:\nhttps://docs.aws.amazon.com/documentdb/latest/developerguide/what-is.html\nhttps://docs.aws.amazon.com/documentdb/latest/developerguide/high_availability.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30138,
    "questionNumber": 138,
    "question": "A life sciences company is using a combination of open source tools to manage data analysis workflows and Docker containers running on servers in its on-premises data center to process genomics data. Sequencing data is generated and stored on a local storage area network (SAN), and then the data is processed. The research and development teams are running into capacity issues and have decided to re-architect their genomics analysis platform on AWS to scale based on workload demands and reduce the turnaround time from weeks to days. The company has a high-speed AWS Direct Connect connection. Sequencers will generate around 200 GB of data for each genome, and individual jobs can take several hours to process the data with ideal compute capacity. The end result will be stored in Amazon S3. The company is expecting 10-15 job requests each day. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use regularly scheduled AWS Snowball Edge devices to transfer the sequencing data into AWS. When AWS receives the Snowball Edge device and the data is loaded into Amazon S3, use S3 events to trigger an AWS Lambda function to process the data.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Data Pipeline to transfer the sequencing data to Amazon S3. Use S3 events to trigger an Amazon EC2 Auto Scaling group to launch custom-AMI EC2 instances running the Docker containers to process the data.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS DataSync to transfer the sequencing data to Amazon S3. Use S3 events to trigger an AWS Lambda function that starts an AWS Step Functions workflow. Store the Docker images in Amazon Elastic Container Registry (Amazon ECR) and trigger AWS Batch to run the container and process the sequencing data.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use an AWS Storage Gateway file gateway to transfer the sequencing data to Amazon S3. Use S3 events to trigger an AWS Batch job that executes on Amazon EC2 instances running the Docker containers to process the data.",
        "isCorrect": false
      }
    ],
    "comments": "Plataforma genómica: 200 GB por genoma vía Direct Connect de alta velocidad, jobs de varias horas con capacidad de cómputo ideal, 10-15 jobs/día, resultado en S3, escalar según demanda.\n\nOpción A: Snowball Edge programado es para traslados masivos offline; aquí hay Direct Connect de alta velocidad y jobs continuos, no encaja. Además Lambda no procesa jobs de varias horas (límite 15 min).\n\nOpción B: Data Pipeline + ASG con AMIs personalizadas es más operación y menos elástico/gestionado que Batch para trabajos por lotes de cómputo intensivo.\n\nOpción C (Correcta): AWS DataSync para transferir los datos a S3 (sobre Direct Connect), S3 events que invocan una Lambda que arranca un workflow de AWS Step Functions, imágenes Docker en Amazon ECR y AWS Batch para ejecutar los contenedores y procesar (Batch orquesta cómputo por lotes de varias horas, escalando según la demanda). Es la solución gestionada y escalable adecuada para jobs largos de cómputo intensivo. Correcta.\n\nOpción D: File gateway + AWS Batch en EC2 gestionadas es más operación; DataSync + Batch (C) es más limpio y escalable.\n\nReferencias:\nhttps://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html\nhttps://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30139,
    "questionNumber": 139,
    "question": "A company runs a content management application on a single Windows Amazon EC2 instance in a development environment. The application reads and writes static content to a 2 TB Amazon Elastic Block Store (Amazon EBS) volume that is attached to the instance as the root device. The company plans to deploy this application in production as a highly available and fault-tolerant solution that runs on at least three EC2 instances across multiple Availability Zones. A solutions architect must design a solution that joins all the instances that run the application to an Active Directory domain. The solution also must implement Windows ACLs to control access to file contents. The application always must maintain exactly the same content on all running instances at any given point in time. Which solution will meet these requirements with the LEAST management overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon Elastic File System (Amazon EFS) file share. Create an Auto Scaling group that extends across three Availability Zones and maintains a minimum size of three instances. Implement a user data script to install the application, join the instance to the AD domain, and mount the EFS file share.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a new AMI from the current EC2 Instance that is running. Create an Amazon FSx for Lustre file system. Create an Auto Scaling group that extends across three Availability Zones and maintains a minimum size of three instances. Implement a user data script to join the instance to the AD domain and mount the FSx for Lustre file system.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon FSx for Windows File Server file system. Create an Auto Scaling group that extends across three Availability Zones and maintains a minimum size of three instances. Implement a user data script to install the application and mount the FSx for Windows File Server file system. Perform a seamless domain join to join the instance to the AD domain.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create a new AMI from the current EC2 instance that is running. Create an Amazon Elastic File System (Amazon EFS) file system. Create an Auto Scaling group that extends across three Availability Zones and maintains a minimum size of three Instances. Perform a seamless domain join to join the instance to the AD domain.",
        "isCorrect": false
      }
    ],
    "comments": "App Windows en varias instancias multi-AZ que deben unirse a un dominio Active Directory, con ACLs de Windows para controlar acceso a ficheros, y contenido idéntico en todas las instancias, con el MENOR overhead.\n\nOpción A: EFS es NFS (Linux), no soporta ACLs de Windows ni es el sistema de ficheros nativo para cargas Windows. No cumple el requisito de ACLs de Windows.\n\nOpción B: FSx for Lustre es para HPC (Linux), no para compartición de ficheros Windows con ACLs NTFS. No aplica.\n\nOpción C (Correcta): Crear un sistema Amazon FSx for Windows File Server (sistema de ficheros Windows nativo con soporte de ACLs NTFS e integración con Active Directory), un Auto Scaling group multi-AZ con mínimo 3 instancias, y user data que instala la app y monta el share FSx; hacer un seamless domain join para unir las instancias al dominio AD. FSx da contenido compartido idéntico y ACLs de Windows; el seamless join automatiza la unión al AD. Menor overhead y cumple todo. Correcta.\n\nOpción D: EFS de nuevo (no soporta ACLs de Windows) y no monta un share Windows compartido idéntico. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html\nhttps://docs.aws.amazon.com/fsx/latest/WindowsGuide/aws-ad-integration-fsxW.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30140,
    "questionNumber": 140,
    "question": "A software as a service (SaaS) based company provides a case management solution to customers A3 part of the solution. The company uses a standalone Simple Mail Transfer Protocol (SMTP) server to send email messages from an application. The application also stores an email template for acknowledgement email messages that populate customer data before the application sends the email message to the customer. The company plans to migrate this messaging functionality to the AWS Cloud and needs to minimize operational overhead. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up an SMTP server on Amazon EC2 instances by using an AMI from the AWS Marketplace. Store the email template in an Amazon S3 bucket. Create an AWS Lambda function to retrieve the template from the S3 bucket and to merge the customer data from the application with the template. Use an SDK in the Lambda function to send the email message.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Set up Amazon Simple Email Service (Amazon SES) to send email messages. Store the email template in an Amazon S3 bucket. Create an AWS Lambda function to retrieve the template from the S3 bucket and to merge the customer data from the application with the template. Use an SDK in the Lambda function to send the email message.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Set up an SMTP server on Amazon EC2 instances by using an AMI from the AWS Marketplace. Store the email template in Amazon Simple Email Service (Amazon SES) with parameters for the customer data. Create an AWS Lambda function to call the SES template and to pass customer data to replace the parameters. Use the AWS Marketplace SMTP server to send the email message.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Set up Amazon Simple Email Service (Amazon SES) to send email messages. Store the email template on Amazon SES with parameters for the customer data. Create an AWS Lambda function to call the SendTemplatedEmail API operation and to pass customer data to replace the parameters and the email destination.",
        "isCorrect": true
      }
    ],
    "comments": "Migrar mensajería SMTP con plantillas de email (datos de cliente) a AWS, minimizando overhead operativo y coste.\n\nOpción A/C: Montar un servidor SMTP en EC2 (Marketplace) mantiene un servidor que gestionar (más overhead/coste) frente a SES gestionado. Descartadas.\n\nOpción B: SES es correcto, pero almacenar la plantilla en S3 y hacer el merge en una Lambda con un SDK reinventa lo que SES ya ofrece con plantillas nativas. Más trabajo que D.\n\nOpción D (Correcta): Usar Amazon SES para enviar los emails, almacenar la plantilla EN SES con parámetros para los datos del cliente, y una Lambda que llama a la API SendTemplatedEmail pasando los datos y el destino. SES gestiona el envío y las plantillas de forma nativa (sin servidores, sin merge manual): el menor overhead y coste. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/ses/latest/dg/send-personalized-email-api.html\nhttps://docs.aws.amazon.com/ses/latest/APIReference/API_SendTemplatedEmail.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30141,
    "questionNumber": 141,
    "question": "A company is processing videos in the AWS Cloud by Using Amazon EC2 instances in an Auto Scaling group. It takes 30 minutes to process a video Several EC2 instances scale in and out depending on the number of videos in an Amazon Simple Queue Service (Amazon SQS) queue. The company has configured the SQS queue with a redrive policy that specifies a target dead-letter queue and a maxReceiveCount of 1. The company has set the visibility timeout for the SQS queue to 1 hour. The company has set up an Amazon CloudWatch alarm to notify the development team when there are messages in the dead-letter queue. Several times during the day. the development team receives notification that messages are in the dead-letter queue and that videos have not been processed property. An investigation finds no errors m the application logs. How can the company solve this problem?",
    "choices": [
      {
        "letter": "A",
        "text": "Turn on termination protection tor the EC2 Instances",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Update the visibility timeout for the SQS queue to 3 hours",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure scale-in protection for the instances during processing",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Update the redrive policy and set maxReceiveCount to 0.",
        "isCorrect": false
      }
    ],
    "comments": "Procesar vídeos tarda 30 min; ASG escala in/out según SQS; visibility timeout 1 h; redrive maxReceiveCount=1; llegan mensajes a la DLQ sin errores en logs.\n\nCausa raíz: cuando el ASG hace SCALE-IN, TERMINA instancias que aún están procesando un vídeo (30 min). El mensaje no se borra, y al no completarse, tras el timeout vuelve a la cola; con maxReceiveCount=1 va directo a la DLQ. No hay errores de app porque el problema es la terminación, no el código.\n\nOpción A: La protección contra terminación de EC2 no impide que el ASG haga scale-in de esas instancias (necesita scale-in protection del ASG, no termination protection de EC2). No resuelve.\n\nOpción B: Subir el visibility timeout a 3 h no evita que el scale-in TERMINE la instancia a mitad de proceso; el mensaje seguiría sin procesarse. No ataca la causa.\n\nOpción C (Correcta): Configurar instance scale-in protection en las instancias mientras procesan. Así el Auto Scaling no termina una instancia que está procesando un vídeo, evitando que los mensajes acaben en la DLQ. La documentación de AWS empareja explícitamente SQS con instance scale-in protection para este caso. Correcta.\n\nOpción D: maxReceiveCount=0 no es un valor válido/útil y no resuelve el problema de terminación. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/as-using-sqs-queue.html\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-instance-protection.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30142,
    "questionNumber": 142,
    "question": "A company has developed APIs that use Amazon API Gateway with Regional endpoints. The APIs call AWS Lambda functions that use API Gateway authentication mechanisms. After a design review, a solutions architect identifies a set of APIs that do not require public access. The solutions architect must design a solution to make the set of APIs accessible only from a VPC. All APIs need to be called with an authenticated user Which solution will meet these requirements with the LEAST amount of effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an internal Application Load Balancer (ALB). Create a target group. Select the Lambda function to call. Use the ALB DNS name to call the API from the VPC.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Remove the DNS entry that is associated with the API in API Gateway. Create a hosted zone in Amazon Route 53. Create a CNAME record in the hosted zone. Update the API in API Gateway with the CNAME record. Use the CNAME record to call the API from the VPC.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Update the API endpoint from Regional to private in API Gateway. Create an interface VPC endpoint in the VPCreate a resource policy, and attach it to the API. Use the VPC endpoint to call the API from the VPC.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Deploy the Lambda functions inside the VPC Provision an EC2 instance, and install an Apache server. From the Apache server, call the Lambda functions. Use the internal CNAME record of the EC2 instance to call the API from the VPC.",
        "isCorrect": false
      }
    ],
    "comments": "Hacer que un conjunto de APIs de API Gateway sea accesible SOLO desde una VPC, con usuarios autenticados, con el MENOR esfuerzo.\n\nOpción A: Un ALB interno hacia la Lambda cambia la arquitectura y pierde las funciones de API Gateway (autenticación, etc.); no es de menor esfuerzo.\n\nOpción B: Manipular DNS/CNAME no hace que la API sea privada (solo accesible desde la VPC); la API seguiría siendo pública. No cumple.\n\nOpción C (Correcta): Cambiar el tipo de endpoint de la API de Regional a PRIVATE en API Gateway, crear un interface VPC endpoint (execute-api) en la VPC y adjuntar una resource policy a la API que permita el acceso solo a través de ese endpoint. Así la API solo es alcanzable desde la VPC vía PrivateLink, manteniendo la autenticación. Es el mecanismo nativo con el menor esfuerzo. Correcta.\n\nOpción D: Desplegar las Lambda en la VPC + una EC2 con Apache que llama a las funciones es una solución rara y con mucho overhead. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-apis.html\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-set-up.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30143,
    "questionNumber": 143,
    "question": "A weather service provides high-resolution weather maps from a web application hosted on AWS in the eu-west-1 Region. The weather maps are updated frequently and stored in Amazon S3 along with static HTML content. The web application is fronted by Amazon CloudFront. The company recently expanded to serve users in the us-east-1 Region, and these new users report that viewing their respective weather maps is slow from time to time. Which combination of steps will resolve the us-east-1 performance issues? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the AWS Global Accelerator endpoint for the S3 bucket in eu-west-1. Configure endpoint groups for TCP ports 80 and 443 in us-east-1.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a new S3 bucket in us-east-1. Configure S3 cross-Region replication to synchronize from the S3 bucket in eu-west-1.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use Lambda@Edge to modify requests from North America to use the S3 Transfer Acceleration endpoint in us-east-1.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Lambda@Edge to modify requests from North America to use the S3 bucket in us-east-1.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Configure the AWS Global Accelerator endpoint for us-east-1 as an origin on the CloudFront distribution. Use Lambda@Edge to modify requests from North America to use the new origin.",
        "isCorrect": false
      }
    ],
    "comments": "Mapas meteorológicos en S3 (eu-west-1) tras CloudFront; usuarios en us-east-1 sufren lentitud intermitente. Resolver la latencia en us-east-1.\n\nOpción A: Global Accelerator para el bucket S3 no es el patrón correcto para acelerar entrega de objetos S3 vía CloudFront; no aplica bien.\n\nOpción B (Correcta): Crear un nuevo bucket S3 en us-east-1 y configurar S3 Cross-Region Replication desde el bucket de eu-west-1 para tener una copia local de los mapas cerca de los usuarios de Norteamérica.\n\nOpción C: 'S3 Transfer Acceleration en us-east-1' acelera SUBIDAS a un bucket, no la entrega de lectura a usuarios; no es lo adecuado aquí.\n\nOpción D (Correcta): Usar Lambda@Edge para modificar las peticiones desde Norteamérica y dirigirlas al bucket S3 de us-east-1 (el réplica local). B + D coloca los datos cerca de los usuarios de us-east-1 y enruta sus peticiones al bucket local, resolviendo la latencia.\n\nOpción E: Global Accelerator como origin de CloudFront no es un patrón válido/necesario aquí; B+D es más directo.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30144,
    "questionNumber": 144,
    "question": "A solutions architect is investigating an issue in which a company cannot establish new sessions in Amazon Workspaces. An initial analysis indicates that the issue involves user profiles. The Amazon Workspaces environment is configured to use Amazon FSx for Windows File Server as the profile share storage. The FSx for Windows File Server file system is configured with 10 TB of storage. The solutions architect discovers that the file system has reached Its maximum capacity. The solutions architect must ensure that users can regain access. The solution also must prevent the problem from occurring again. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Remove old user profiles to create space. Migrate the user profiles to an Amazon FSx for Lustre file system.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Increase capacity by using the update-file-system command. Implement an Amazon CloudWatch metric that monitors free space. Use Amazon EventBridge to invoke an AWS Lambda function to increase capacity as required.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Monitor the file system by using the FreeStorageCapacity metric in Amazon CloudWatch. Use AWS Step Functions to increase the capacity as required.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Remove old user profiles to create space. Create an additional FSx for Windows File Server file system. Update the user profile redirection for 50% of the users to use the new file system.",
        "isCorrect": false
      }
    ],
    "comments": "WorkSpaces no crea sesiones porque el FSx for Windows File Server (perfiles) llegó a su capacidad máxima (10 TB). Restaurar acceso y prevenir que se repita.\n\nOpción A: Migrar perfiles a FSx for Lustre no es adecuado (Lustre es HPC, no perfiles Windows); además borrar perfiles a mano no previene el problema.\n\nOpción B (Correcta): Aumentar la capacidad con el comando update-file-system (FSx for Windows soporta aumentar capacidad de almacenamiento) para restaurar el acceso, e implementar una métrica de CloudWatch (FreeStorageCapacity) con EventBridge que invoque una Lambda para aumentar la capacidad automáticamente cuando haga falta. Restaura el acceso y PREVIENE la recurrencia con autoescalado de capacidad. Correcta.\n\nOpción C: Monitorizar con FreeStorageCapacity es correcto, pero usar Step Functions para aumentar capacidad es más pesado que una Lambda; y no menciona restaurar acceso subiendo capacidad. B es la completa.\n\nOpción D: Crear un segundo sistema de ficheros y repartir el 50% de perfiles es operativamente costoso y no previene que cualquiera de los dos se llene. No es lo mejor.\n\nReferencias:\nhttps://docs.aws.amazon.com/fsx/latest/WindowsGuide/managing-storage-capacity.html\nhttps://docs.aws.amazon.com/fsx/latest/WindowsGuide/monitoring-cloudwatch.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30145,
    "questionNumber": 145,
    "question": "An international delivery company hosts a delivery management system on AWS. Drivers use the system to upload confirmation of delivery. Confirmation includes the recipient’s signature or a photo of the package with the recipient. The driver’s handheld device uploads signatures and photos through FTP to a single Amazon EC2 instance. Each handheld device saves a file in a directory based on the signed-in user, and the file name matches the delivery number. The EC2 instance then adds metadata to the file after querying a central database to pull delivery information. The file is then placed in Amazon S3 for archiving. As the company expands, drivers report that the system is rejecting connections. The FTP server is having problems because of dropped connections and memory issues in response to these problems, a system engineer schedules a cron task to reboot the EC2 instance every 30 minutes. The billing team reports that files are not always in the archive and that the central system is not always updated. A solutions architect needs to design a solution that maximizes scalability to ensure that the archive always receives the files and that systems are always updated. The handheld devices cannot be modified, so the company cannot deploy a new application. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AMI of the existing EC2 instance. Create an Auto Scaling group of EC2 instances behind an Application Load Balancer. Configure the Auto Scaling group to have a minimum of three instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Transfer Family to create an FTP server that places the files in Amazon Elastic File System (Amazon EFS). Mount the EFS volume to the existing EC2 instance. Point the EC2 instance to the new path for file processing.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Transfer Family to create an FTP server that places the files in Amazon S3. Use an S3 event notification through Amazon Simple Notification Service (Amazon SNS) to invoke an AWS Lambda function. Configure the Lambda function to add the metadata and update the delivery system.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Update the handheld devices to place the files directly in Amazon S3. Use an S3 event notification through Amazon Simple Queue Service (Amazon SQS) to invoke an AWS Lambda function. Configure the Lambda function to add the metadata and update the delivery system.",
        "isCorrect": false
      }
    ],
    "comments": "Servidor FTP en una única EC2 que rechaza conexiones y se reinicia por memoria; los ficheros no siempre llegan al archivo ni se actualiza el sistema central. Maximizar escalabilidad; los dispositivos NO se pueden modificar (siguen usando FTP).\n\nOpción A: Un ASG de EC2 con la misma app FTP detrás de un ALB no escala bien FTP (protocolo con estado; ALB es HTTP) y mantiene el servidor autogestionado con los mismos problemas. No es lo mejor.\n\nOpción B: AWS Transfer Family a EFS y luego procesar en la misma EC2 mantiene el cuello de botella de la EC2 de procesamiento. No maximiza escalabilidad ni fiabilidad del procesamiento.\n\nOpción C (Correcta): Usar AWS Transfer Family (servidor FTP gestionado y escalable, sin cambiar los dispositivos) que deja los ficheros en S3; una S3 event notification vía SNS invoca una Lambda que añade la metadata (consultando la BD) y actualiza el sistema de entrega. Serverless, escalable y fiable: el archivo siempre recibe los ficheros y el sistema se actualiza. Correcta.\n\nOpción D: Requiere modificar los dispositivos para subir directamente a S3, pero el enunciado dice que NO se pueden modificar. Descartada por el requisito.\n\nReferencias:\nhttps://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30146,
    "questionNumber": 146,
    "question": "A company is running an application in the AWS Cloud. The application runs on containers m an Amazon Elastic Container Service (Amazon ECS) cluster. The ECS tasks use the Fargate launch type. The application's data is relational and is stored in Amazon Aurora MySQL. To meet regulatory requirements, the application must be able to recover to a separate AWS Region in the event of an application failure. In case of a failure, no data can be lost. Which solution will meet these requirements with the LEAST amount of operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Provision an Aurora Replica in a different Region.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Set up AWS DataSync for continuous replication of the data to a different Region.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Set up AWS Database Migration Service (AWS DMS) to perform a continuous replication of the data to a different Region.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon Data Lifecycle Manager (Amazon DLM) to schedule a snapshot every 5 minutes.",
        "isCorrect": false
      }
    ],
    "comments": "Recuperar a otra Región ante fallo, sin pérdida de datos, para datos en Aurora MySQL, con el MENOR overhead.\n\nOpción A (Correcta): Provisionar una Aurora Replica en otra Región (Aurora global database / cross-Region replica). Aurora replica de forma continua y de baja latencia a la otra Región, permitiendo recuperación cross-Region sin pérdida de datos con el menor overhead (es una capacidad nativa gestionada de Aurora). Correcta.\n\nOpción B: DataSync es para ficheros/objetos, no para replicar una base de datos relacional Aurora. No aplica.\n\nOpción C: DMS puede replicar, pero es más overhead operativo (tareas de replicación a gestionar) que la replica cross-Region nativa de Aurora. Menos idónea.\n\nOpción D: Snapshots cada 5 min con DLM implica pérdida de datos (hasta 5 min) y no es continuo; no cumple 'sin pérdida de datos' tan bien como la replica de Aurora.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30147,
    "questionNumber": 147,
    "question": "A financial services company receives a regular data feed from its credit card servicing partner. Approximately 5,000 records are sent every 15 minutes in plaintext, delivered over HTTPS directly into an Amazon S3 bucket with server-side encryption. This feed contains sensitive credit card primary account number (PAN) data. The company needs to automatically mask the PAN before sending the data to another S3 bucket for additional internal processing. The company also needs to remove and merge specific fields, and then transform the record into JSON format. Additionally, extra feeds are likely to be added in the future, so any design needs to be easily expandable. Which solutions will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Invoke an AWS Lambda function on file delivery that extracts each record and writes it to an Amazon SQS queue. Invoke another Lambda function when new messages arrive in the SQS queue to process the records, writing the results to a temporary location in Amazon S3. Invoke a final Lambda function once the SQS queue is empty to transform the records into JSON format and send the results to another S3 bucket for internal processing.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Invoke an AWS Lambda function on file delivery that extracts each record and writes it to an Amazon SQS queue. Configure an AWS Fargate container application to automatically scale to a single instance when the SQS queue contains messages. Have the application process each record, and transform the record into JSON format. When the queue is empty, send the results to another S3 bucket for internal processing and scale down the AWS Fargate instance.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS Glue crawler and custom classifier based on the data feed formats and build a table definition to match. Invoke an AWS Lambda function on file delivery to start an AWS Glue ETL job to transform the entire record according to the processing and transformation requirements. Define the output format as JSON. Once complete, have the ETL job send the results to another S3 bucket for internal processing.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an AWS Glue crawler and custom classifier based upon the data feed formats and build a table definition to match. Perform an Amazon Athena query on file delivery to start an Amazon EMR ETL job to transform the entire record according to the processing and transformation requirements. Define the output format as JSON. Once complete, send the results to another S3 bucket for internal processing and scale down the EMR cluster.",
        "isCorrect": false
      }
    ],
    "comments": "Enmascarar PAN de tarjetas, eliminar/fusionar campos y transformar a JSON de forma automática y FÁCILMENTE EXPANDIBLE para futuros feeds. 5.000 registros cada 15 min en S3.\n\nOpción A: Cadena de tres Lambdas + SQS con lógica de transformación a medida es compleja de mantener y poco expandible para nuevos formatos de feed.\n\nOpción B: Lambda + Fargate escalado manual es más operación y también lógica a medida; menos expandible que un enfoque de catálogo/ETL.\n\nOpción C (Correcta): Crear un AWS Glue crawler y un classifier personalizado según los formatos de feed y una table definition; al llegar el fichero, una Lambda arranca un job ETL de AWS Glue que transforma el registro (enmascara PAN, elimina/fusiona campos) con salida en JSON y lo envía a otro bucket S3. Glue (catálogo + ETL gestionado) es fácilmente expandible añadiendo crawlers/classifiers para nuevos feeds, con transformación gestionada. Correcta.\n\nOpción D: Athena no 'arranca un job EMR' así, y EMR añade gestión de clúster; Glue ETL es más adecuado y expandible. Menos idónea.\n\nReferencias:\nhttps://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html\nhttps://docs.aws.amazon.com/glue/latest/dg/add-classifier.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30148,
    "questionNumber": 148,
    "question": "A company wants to use AWS to create a business continuity solution in case the company's main on-premises application fails. The application runs on physical servers that also run other applications. The on-premises application that the company is planning to migrate uses a MySQL database as a data store. All the company's on-premises applications use operating systems that are compatible with Amazon EC2. Which solution will achieve the company's goal with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Install the AWS Replication Agent on the source servers, including the MySQL servers. Set up replication for all servers. Launch test instances for regular drills. Cut over to the test instances to fail over the workload in the case of a failure event.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Install the AWS Replication Agent on the source servers, including the MySQL servers. Initialize AWS Elastic Disaster Recovery in the target AWS Region. Define the launch settings. Frequently perform failover and fallback from the most recent point in time.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create AWS Database Migration Service (AWS DMS) replication servers and a target Amazon Aurora MySQL DB cluster to host the database. Create a DMS replication task to copy the existing data to the target DB cluster. Create a local AWS Schema Conversion Tool (AWS SCT) change data capture (CDC) task to keep the data synchronized. Install the rest of the software on EC2 instances by starting with a compatible base AMI.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy an AWS Storage Gateway Volume Gateway on premises. Mount volumes on all on-premises servers. Install the application and the MySQL database on the new volumes. Take regular snapshots. Install all the software on EC2 Instances by starting with a compatible base AMI. Launch a Volume Gateway on an EC2 instance. Restore the volumes from the latest snapshot. Mount the new volumes on the EC2 instances in the case of a failure event.",
        "isCorrect": false
      }
    ],
    "comments": "Continuidad de negocio (DR) en AWS ante fallo de la app on-premises (con MySQL), SO compatibles con EC2, con el MENOR overhead.\n\nOpción A: El AWS Replication Agent es de AWS Elastic Disaster Recovery, pero 'cortar a las instancias de prueba' no es el flujo de failover correcto de DRS; B lo describe bien.\n\nOpción B (Correcta): Instalar el AWS Replication Agent en los servidores origen (incluidos los MySQL), inicializar AWS Elastic Disaster Recovery (DRS) en la Región destino, definir los launch settings y realizar failover/fallback desde el punto en el tiempo más reciente. DRS replica servidores enteros (incluida la BD) a bajo coste y orquesta el failover/fallback con el menor overhead operativo. Es el servicio de DR indicado. Correcta.\n\nOpción C: DMS + Aurora + SCT CDC migra la base de datos, pero para un DR de toda la aplicación (servidores + BD) con menor overhead, DRS replica los servidores completos; C es más trabajo y solo cubre la BD.\n\nOpción D: Storage Gateway Volume Gateway + snapshots + reconstruir en EC2 es un procedimiento manual y de alto overhead. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html\nhttps://docs.aws.amazon.com/drs/latest/userguide/failback-overview.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30149,
    "questionNumber": 149,
    "question": "A company is subject to regulatory audits of its financial information. External auditors who use a single AWS account need access to the company's AWS account. A solutions architect must provide the auditors with secure, read-only access to the company's AWS account. The solution must comply with AWS security best practices. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "In the company's AWS account, create resource policies for all resources in the account to grant access to the auditors' AWS account. Assign a unique external ID to the resource policy.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "In the company's AWS account, create an IAM role that trusts the auditors' AWS account. Create an IAM policy that has the required permissions. Attach the policy to the role. Assign a unique external ID to the role's trust policy.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "In the company's AWS account, create an IAM user. Attach the required IAM policies to the IAM user. Create API access keys for the IAM user. Share the access keys with the auditors.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "In the company's AWS account, create an IAM group that has the required permissions. Create an IAM user in the company's account for each auditor. Add the IAM users to the IAM group.",
        "isCorrect": false
      }
    ],
    "comments": "Dar a auditores externos (que usan una sola cuenta AWS) acceso seguro de SOLO LECTURA a la cuenta de la empresa, siguiendo buenas prácticas.\n\nOpción A: Resource policies en todos los recursos con external ID es inviable a escala y no es el patrón recomendado; el acceso cross-account se hace con un rol.\n\nOpción B (Correcta): Crear en la cuenta de la empresa un IAM role que confíe en la cuenta AWS de los auditores, con una política de permisos de solo lectura adjunta, y un external ID único en la trust policy del rol. Es la práctica recomendada de acceso cross-account de terceros (rol asumible + external ID, sin credenciales de larga duración). Correcta.\n\nOpción C: Crear un IAM user y compartir access keys usa credenciales estáticas compartidas (mala práctica). Descartada.\n\nOpción D: Crear usuarios IAM por auditor en la cuenta de la empresa gestiona identidades de terceros dentro de tu cuenta (no recomendado); el patrón correcto es un rol que confíe en su cuenta (B).\n\nReferencias:\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30150,
    "questionNumber": 150,
    "question": "A company has a latency-sensitive trading platform that uses Amazon DynamoDB as a storage backend. The company configured the DynamoDB table to use on-demand capacity mode. A solutions architect needs to design a solution to improve the performance of the trading platform. The new solution must ensure high availability for the trading platform. Which solution will meet these requirements with the LEAST latency?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a two-node DynamoDB Accelerator (DAX) cluster. Configure an application to read and write data by using DAX.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a three-node DynamoDB Accelerator (DAX) cluster. Configure an application to read data by using DAX and to write data directly to the DynamoDB table.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a three-node DynamoDB Accelerator (DAX) cluster. Configure an application to read data directly from the DynamoDB table and to write data by using DAX.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a single-node DynamoDB Accelerator (DAX) cluster. Configure an application to read data by using DAX and to write data directly to the DynamoDB table.",
        "isCorrect": false
      }
    ],
    "comments": "Plataforma de trading latency-sensitive sobre DynamoDB (on-demand); mejorar rendimiento y asegurar alta disponibilidad con la MENOR latencia.\n\nDAX acelera las LECTURAS (caché en memoria, latencia de microsegundos). Para HA, DAX necesita un clúster multi-nodo (mínimo 3 nodos recomendados) repartido en AZ. Las ESCRITURAS deben ir a DynamoDB (DAX es write-through pero para mínima latencia de escritura y consistencia, se escribe directo a la tabla).\n\nOpción A: Un clúster DAX de DOS nodos es HA limitada; tres nodos es la recomendación para alta disponibilidad. Menos idónea.\n\nOpción B (Correcta): Un clúster DAX de TRES nodos (alta disponibilidad multi-AZ), leyendo con DAX (latencia de microsegundos) y escribiendo directamente en la tabla DynamoDB. Da la menor latencia de lectura con HA y escrituras directas. Correcta.\n\nOpción C: Leer directo de DynamoDB y escribir por DAX no aprovecha la caché para lecturas (que es donde DAX reduce latencia); al revés de lo óptimo.\n\nOpción D: Un clúster DAX de UN solo nodo no es de alta disponibilidad. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.cluster.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30151,
    "questionNumber": 151,
    "question": "A company has migrated an application from on premises to AWS. The application frontend is a static website that runs on two Amazon EC2 instances behind an Application Load Balancer (ALB). The application backend is a Python application that runs on three EC2 instances behind another ALB. The EC2 instances are large, general purpose On-Demand Instances that were sized to meet the on-premises specifications for peak usage of the application. The application averages hundreds of thousands of requests each month. However, the application is used mainly during lunchtime and receives minimal traffic during the rest of the day. A solutions architect needs to optimize the infrastructure cost of the application without negatively affecting the application availability. Which combination of steps will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Change all the EC2 instances to compute optimized instances that have the same number of cores as the existing EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Move the application frontend to a static website that is hosted on Amazon S3.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Deploy the application frontend by using AWS Elastic Beanstalk. Use the same instance type for the nodes.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Change all the backend EC2 instances to Spot Instances.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Deploy the backend Python application to general purpose burstable EC2 instances that have the same number of cores as the existing EC2 instances.",
        "isCorrect": true
      }
    ],
    "comments": "Optimizar coste de una app con frontend estático (2 EC2) y backend Python (3 EC2), con tráfico concentrado a mediodía y mínimo el resto, sin afectar la disponibilidad.\n\nOpción A: Cambiar a compute optimized con los mismos cores no reduce el coste del tiempo ocioso ni ataca el sobredimensionamiento; solo cambia la familia. No optimiza para el patrón.\n\nOpción B (Correcta): Mover el frontend estático a un sitio web hospedado en Amazon S3 elimina las 2 EC2 del frontend (S3 es barato, escalable y HA para contenido estático). Gran ahorro sin afectar disponibilidad.\n\nOpción C: Beanstalk con el mismo tipo de instancia no reduce coste; sigue con EC2 aprovisionadas.\n\nOpción D: Spot para TODO el backend arriesga interrupciones que pueden afectar la disponibilidad de la app durante el pico de mediodía. Contradice 'sin afectar disponibilidad'.\n\nOpción E (Correcta): Desplegar el backend Python en instancias EC2 general purpose BURSTABLE (familia T) con los mismos cores. Como el tráfico es esporádico (picos a mediodía, valles el resto), las burstables acumulan créditos de CPU en los valles y los gastan en los picos, a menor coste que las general purpose grandes actuales, sin perder disponibilidad. B + E.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-performance-instances.html",
    "category": "Optimización de Costes",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30152,
    "questionNumber": 152,
    "question": "A company is running an event ticketing platform on AWS and wants to optimize the platform's cost-effectiveness. The platform is deployed on Amazon Elastic Kubernetes Service (Amazon EKS) with Amazon EC2 and is backed by an Amazon RDS for MySQL DB instance. The company is developing new application features to run on Amazon EKS with AWS Fargate. The platform experiences infrequent high peaks in demand. The surges in demand depend on event dates. Which solution will provide the MOST cost-effective setup for the platform?",
    "choices": [
      {
        "letter": "A",
        "text": "Purchase Standard Reserved Instances for the EC2 instances that the EKS cluster uses in its baseline load. Scale the cluster with Spot Instances to handle peaks. Purchase 1-year All Upfront Reserved Instances for the database to meet predicted peak load for the year.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Purchase Compute Savings Plans for the predicted medium load of the EKS cluster. Scale the cluster with On-Demand Capacity Reservations based on event dates for peaks. Purchase 1-year No Upfront Reserved Instances for the database to meet the predicted base load. Temporarily scale out database read replicas during peaks.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Purchase EC2 Instance Savings Plans for the predicted base load of the EKS cluster. Scale the cluster with Spot Instances to handle peaks. Purchase 1-year All Upfront Reserved Instances for the database to meet the predicted base load. Temporarily scale up the DB instance manually during peaks.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Purchase Compute Savings Plans for the predicted base load of the EKS cluster. Scale the cluster with Spot Instances to handle peaks. Purchase 1-year All Upfront Reserved Instances for the database to meet the predicted base load. Temporarily scale up the DB instance manually during peaks.",
        "isCorrect": true
      }
    ],
    "comments": "Plataforma en EKS on EC2 + RDS MySQL, con picos infrecuentes según fechas de eventos. Configuración MÁS rentable.\n\nOpción A: Standard Reserved Instances para la baseline es menos flexible que Savings Plans; y RIs 'para el pico predicho del año' desperdicia dinero pagando pico todo el año.\n\nOpción B: Compute Savings Plans para 'medium load' y On-Demand Capacity Reservations para picos es más caro (capacity reservations reservan capacidad aunque no se use); Spot es más barato para picos.\n\nOpción C: EC2 Instance Savings Plans (menos flexibles que Compute SP para EKS con Fargate futuro) para la base; el resto es razonable pero Compute SP es más flexible para la mezcla EC2/Fargate.\n\nOpción D (Correcta): Compute Savings Plans para la carga BASE del clúster EKS (máxima flexibilidad, cubre EC2 y Fargate), escalar con Spot Instances para los picos infrecuentes (lo más barato para carga elástica tolerante), y RIs 1-year All Upfront para la BASE de la BD (mayor descuento en la base predecible), escalando la BD manualmente en los picos. Es la combinación más rentable para este patrón. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30153,
    "questionNumber": 153,
    "question": "A company has deployed an application on AWS Elastic Beanstalk. The application uses Amazon Aurora for the database layer. An Amazon CloudFront distribution serves web requests and includes the Elastic Beanstalk domain name as the origin server. The distribution is configured with an alternate domain name that visitors use when they access the application. Each week, the company takes the application out of service for routine maintenance. During the time that the application is unavailable, the company wants visitors to receive an informational message instead of a CloudFront error message. A solutions architect creates an Amazon S3 bucket as the first step in the process. Which combination of steps should the solutions architect take next to meet the requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Upload static informational content to the S3 bucket.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a new CloudFront distribution. Set the S3 bucket as the origin.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Set the S3 bucket as a second origin in the original CloudFront distribution. Configure the distribution and the S3 bucket to use an origin access identity (OAI).",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "During the weekly maintenance, edit the default cache behavior to use the S3 origin. Revert the change when the maintenance is complete.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "During the weekly maintenance, create a cache behavior for the S3 origin on the new distribution. Set the path pattern to \\ Set the precedence to 0. Delete the cache behavior when the maintenance is complete.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "During the weekly maintenance, configure Elastic Beanstalk to serve traffic from the S3 bucket.",
        "isCorrect": false
      }
    ],
    "comments": "Durante el mantenimiento semanal, mostrar contenido informativo (desde S3) en vez del error de CloudFront, usando la distribución existente.\n\nOpción A (Correcta): Subir el contenido estático informativo al bucket S3 (el origen de la página de mantenimiento).\n\nOpción B: Crear una NUEVA distribución CloudFront es innecesario; se reutiliza la existente. Descartada.\n\nOpción C (Correcta): Añadir el bucket S3 como SEGUNDO origen en la distribución CloudFront EXISTENTE y configurar la distribución y el bucket con un origin access identity (OAI) para acceso seguro.\n\nOpción D (Correcta): Durante el mantenimiento, editar el default cache behavior para usar el origen S3 (sirviendo la página informativa) y revertir al terminar. A + C + D usa la distribución existente para servir la página de mantenimiento desde S3.\n\nOpción E: Se refiere a 'la nueva distribución' (que no se crea). Incorrecta.\n\nOpción F: Beanstalk no sirve tráfico desde un bucket S3; no es el mecanismo. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistS3AndCustomOrigins.html\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30154,
    "questionNumber": 154,
    "question": "A company gives users the ability to upload images from a custom application. The upload process invokes an AWS Lambda function that processes and stores the image in an Amazon S3 bucket. The application invokes the Lambda function by using a specific function version ARN. The Lambda function accepts image processing parameters by using environment variables. The company often adjusts the environment variables of the Lambda function to achieve optimal image processing output. The company tests different parameters and publishes a new function version with the updated environment variables after validating results. This update process also requires frequent changes to the custom application to invoke the new function version ARN. These changes cause interruptions for users. A solutions architect needs to simplify this process to minimize disruption to users. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Directly modify the environment variables of the published Lambda function version. Use the SLATEST version to test image processing parameters.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon DynamoDB table to store the image processing parameters. Modify the Lambda function to retrieve the image processing parameters from the DynamoDB table.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Directly code the image processing parameters within the Lambda function and remove the environment variables. Publish a new function version when the company updates the parameters.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a Lambda function alias. Modify the client application to use the function alias ARN. Reconfigure the Lambda alias to point to new versions of the function when the company finishes testing.",
        "isCorrect": true
      }
    ],
    "comments": "La app invoca una versión concreta de Lambda por ARN; al publicar nuevas versiones (nuevas env vars) hay que cambiar el ARN en la app, causando interrupciones. Simplificar con el MENOR overhead.\n\nOpción A: Modificar las env vars de una versión publicada NO es posible (las versiones publicadas son inmutables). Inválido.\n\nOpción B: Mover los parámetros a DynamoDB funciona, pero implica cambiar la Lambda para leerlos y añade una tabla; más cambios que usar un alias.\n\nOpción C: Codificar los parámetros y publicar versiones sigue obligando a cambiar el ARN en la app (mismo problema). No resuelve.\n\nOpción D (Correcta): Crear un ALIAS de Lambda y hacer que la app use el ARN del alias (fijo). Cuando la empresa termina las pruebas, se reapunta el alias a la nueva versión. La app nunca cambia (usa siempre el alias), eliminando las interrupciones, con el menor overhead. Es el uso canónico de alias de Lambda. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30155,
    "questionNumber": 155,
    "question": "A global media company is planning a multi-Region deployment of an application. Amazon DynamoDB global tables will back the deployment to keep the user experience consistent across the two continents where users are concentrated. Each deployment will have a public Application Load Balancer (ALB). The company manages public DNS internally. The company wants to make the application available through an apex domain. Which solution will meet these requirements with the LEAST effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate public DNS to Amazon Route 53. Create CNAME records for the apex domain to point to the ALB. Use a geolocation routing policy to route traffic based on user location.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Place a Network Load Balancer (NLB) in front of the ALMigrate public DNS to Amazon Route 53. Create a CNAME record for the apex domain to point to the NLB’s static IP address. Use a geolocation routing policy to route traffic based on user location.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS Global Accelerator accelerator with multiple endpoint groups that target endpoints in appropriate AWS Regions. Use the accelerator’s static IP address to create a record in public DNS for the apex domain.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an Amazon API Gateway API that is backed by AWS Lambda in one of the AWS Regions. Configure a Lambda function to route traffic to application deployments by using the round robin method. Create CNAME records for the apex domain to point to the API's URL.",
        "isCorrect": false
      }
    ],
    "comments": "Despliegue multi-Región con DynamoDB global tables, un ALB público por Región, DNS público gestionado internamente, y disponible por un APEX domain, con el MENOR esfuerzo.\n\nOpción A: Un CNAME NO se puede usar en el APEX (zone apex) de un dominio (limitación de DNS); habría que usar alias de Route 53 (que aquí el DNS lo gestionan internamente, no en Route 53). No cumple el apex fácilmente.\n\nOpción B: Poner un NLB delante del ALB para tener IP estática y un CNAME en el apex tiene el mismo problema de CNAME en apex y añade un NLB. Más complejo.\n\nOpción C (Correcta): Crear un AWS Global Accelerator con endpoint groups que apunten a los endpoints (ALB) en las Regiones apropiadas, y usar las IP ESTÁTICAS ANYCAST del accelerator para crear un registro en el DNS público del apex domain. Global Accelerator da IPs estáticas (que sí pueden ir en un A record del apex) y enruta a la Región óptima, con el menor esfuerzo dado que el DNS es interno. Correcta.\n\nOpción D: API Gateway + Lambda haciendo round robin es una solución artificiosa y con más piezas; no encaja para exponer ALBs multi-Región por un apex.\n\nReferencias:\nhttps://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html\nhttps://docs.aws.amazon.com/global-accelerator/latest/dg/about-endpoint-groups.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30156,
    "questionNumber": 156,
    "question": "A company is developing a new serverless API by using Amazon API Gateway and AWS Lambda. The company integrated the Lambda functions with API Gateway to use several shared libraries and custom classes. A solutions architect needs to simplify the deployment of the solution and optimize for code reuse. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy the shared libraries and custom classes into a Docker image. Store the image in an S3 bucket. Create a Lambda layer that uses the Docker image as the source. Deploy the API's Lambda functions as Zip packages. Configure the packages to use the Lambda layer.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy the shared libraries and custom classes to a Docker image. Upload the image to Amazon Elastic Container Registry (Amazon ECR). Create a Lambda layer that uses the Docker image as the source. Deploy the API's Lambda functions as Zip packages. Configure the packages to use the Lambda layer.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy the shared libraries and custom classes to a Docker container in Amazon Elastic Container Service (Amazon ECS) by using the AWS Fargate launch type. Deploy the API's Lambda functions as Zip packages. Configure the packages to use the deployed container as a Lambda layer.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy the shared libraries, custom classes, and code for the API's Lambda functions to a Docker image. Upload the image to Amazon Elastic Container Registry (Amazon ECR). Configure the API's Lambda functions to use the Docker image as the deployment package.",
        "isCorrect": true
      }
    ],
    "comments": "API serverless (API Gateway + Lambda) con librerías compartidas y clases personalizadas; simplificar el despliegue y optimizar la reutilización de código.\n\nOpción A: Una Lambda layer NO puede 'usar una imagen Docker como source' almacenada en S3; las layers son paquetes .zip. Inválido.\n\nOpción B: Igual problema: una Lambda layer no se crea 'desde una imagen Docker en ECR'; las layers son .zip, no imágenes de contenedor. Inválido.\n\nOpción C: No se puede usar un contenedor de ECS/Fargate 'como una Lambda layer'. Conceptualmente incorrecto.\n\nOpción D (Correcta): Empaquetar las librerías compartidas, las clases personalizadas y el código de las funciones en una imagen Docker, subirla a Amazon ECR y configurar las funciones Lambda para usar la imagen de contenedor como paquete de despliegue (Lambda container image support). Simplifica el despliegue (una imagen con todo) y favorece la reutilización de código. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/lambda/latest/dg/images-create.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-images.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30157,
    "questionNumber": 157,
    "question": "A manufacturing company is building an inspection solution for its factory. The company has IP cameras at the end of each assembly line. The company has used Amazon SageMaker to train a machine learning (ML) model to identify common defects from still images. The company wants to provide local feedback to factory workers when a defect is detected. The company must be able to provide this feedback even if the factory’s internet connectivity is down. The company has a local Linux server that hosts an API that provides local feedback to the workers. How should the company deploy the ML model to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up an Amazon Kinesis video stream from each IP camera to AWS. Use Amazon EC2 instances to take still images of the streams. Upload the images to an Amazon S3 bucket. Deploy a SageMaker endpoint with the ML model. Invoke an AWS Lambda function to call the inference endpoint when new images are uploaded. Configure the Lambda function to call the local API when a defect is detected.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy AWS IoT Greengrass on the local server. Deploy the ML model to the Greengrass server. Create a Greengrass component to take still images from the cameras and run inference. Configure the component to call the local API when a defect is detected.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Order an AWS Snowball device. Deploy a SageMaker endpoint the ML model and an Amazon EC2 instance on the Snowball device. Take still images from the cameras. Run inference from the EC2 instance. Configure the instance to call the local API when a defect is detected.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy Amazon Monitron devices on each IP camera. Deploy an Amazon Monitron Gateway on premises. Deploy the ML model to the Amazon Monitron devices. Use Amazon Monitron health state alarms to call the local API from an AWS Lambda function when a defect is detected.",
        "isCorrect": false
      }
    ],
    "comments": "Feedback local a los trabajadores al detectar defectos con un modelo ML, incluso SIN conectividad a Internet; hay un servidor Linux local con una API.\n\nOpción A: Kinesis + SageMaker endpoint + Lambda depende de la nube/Internet; si la conectividad cae, no hay feedback. No cumple 'incluso si Internet está caído'.\n\nOpción B (Correcta): Desplegar AWS IoT Greengrass en el servidor local, desplegar el modelo ML en Greengrass y crear un componente que tome imágenes de las cámaras y ejecute inferencia LOCALMENTE, llamando a la API local al detectar un defecto. Greengrass ejecuta inferencia ML en el edge sin depender de la nube, cumpliendo el requisito de funcionar offline. Correcta.\n\nOpción C: Un Snowball con SageMaker endpoint no es una solución permanente de edge para inferencia continua en fábrica; Greengrass es lo indicado.\n\nOpción D: Amazon Monitron es para monitorización de vibración/temperatura de maquinaria (mantenimiento predictivo), no para inferencia de visión sobre imágenes de cámaras. No aplica.\n\nReferencias:\nhttps://docs.aws.amazon.com/greengrass/v2/developerguide/what-is-iot-greengrass.html\nhttps://docs.aws.amazon.com/greengrass/v2/developerguide/perform-machine-learning-inference.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30158,
    "questionNumber": 158,
    "question": "A solutions architect must create a business case for migration of a company's on-premises data center to the AWS Cloud. The solutions architect will use a configuration management database (CMDB) export of all the company's servers to create the case. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Well-Architected Tool to import the CMDB data to perform an analysis and generate recommendations.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Migration Evaluator to perform an analysis. Use the data import template to upload the data from the CMDB export.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Implement resource matching rules. Use the CMDB export and the AWS Price List Bulk API to query CMDB data against AWS services in bulk.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Application Discovery Service to import the CMDB data to perform an analysis.",
        "isCorrect": false
      }
    ],
    "comments": "Crear un business case de migración a partir de un export de CMDB de todos los servidores, de la forma MÁS rentable.\n\nOpción A: El Well-Architected Tool revisa arquitecturas frente a buenas prácticas; no genera un business case de migración a partir de un CMDB.\n\nOpción B (Correcta): Usar Migration Evaluator (antes TSO Logic) para el análisis, importando los datos del CMDB con su plantilla de importación. Migration Evaluator está diseñado para construir el business case (costes/ahorro) de migración a partir de datos de inventario como un CMDB, y es la opción más rentable para este fin. Correcta.\n\nOpción C: Reglas de matching + Price List Bulk API es un desarrollo manual costoso; Migration Evaluator ya lo hace.\n\nOpción D: Application Discovery Service descubre el entorno en ejecución (con agentes/connector), pero para un business case a partir de un export de CMDB existente, Migration Evaluator con su plantilla es lo indicado y más directo/rentable.\n\nReferencias:\nhttps://docs.aws.amazon.com/migration-evaluator/latest/userguide/what-is.html\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/migration-portfolio-assessment/welcome.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30159,
    "questionNumber": 159,
    "question": "A company has a website that runs on Amazon EC2 instances behind an Application Load Balancer (ALB). The instances are in an Auto Scaling group. The ALB is associated with an AWS WAF web ACL. The website often encounters attacks in the application layer. The attacks produce sudden and significant increases in traffic on the application server. The access logs show that each attack originates from different IP addresses. A solutions architect needs to implement a solution to mitigate these attacks. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon CloudWatch alarm that monitors server access. Set a threshold based on access by IP address. Configure an alarm action that adds the IP address to the web ACL’s deny list.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy AWS Shield Advanced in addition to AWS WAF. Add the ALB as a protected resource.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an Amazon CloudWatch alarm that monitors user IP addresses. Set a threshold based on access by IP address. Configure the alarm to invoke an AWS Lambda function to add a deny rule in the application server’s subnet route table for any IP addresses that activate the alarm.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Inspect access logs to find a pattern of IP addresses that launched the attacks. Use an Amazon Route 53 geolocation routing policy to deny traffic from the countries that host those IP addresses.",
        "isCorrect": false
      }
    ],
    "comments": "Ataques en la capa de aplicación con picos súbitos de tráfico desde IPs siempre distintas, sobre una web con ALB + WAF. Mitigar con el MENOR overhead.\n\nOpción A: Una alarma de CloudWatch que añade IPs al deny list del web ACL es reactiva y, con IPs siempre distintas, no escala (perseguir IPs una a una) y añade operación. No es efectiva ni de menor overhead.\n\nOpción B (Correcta): Desplegar AWS Shield Advanced además de WAF y añadir el ALB como recurso protegido. Shield Advanced ofrece protección DDoS avanzada (incluida capa 7) con detección/mitigación gestionada y automática, con equipo de respuesta (DRT), ideal para ataques con IPs cambiantes y picos súbitos, con el menor overhead operativo. Correcta.\n\nOpción C: Alarma + Lambda que modifica route tables por IP es frágil, con lógica a medida y no escala con IPs cambiantes.\n\nOpción D: Geolocation routing por países es impreciso (bloquea países enteros, afecta a legítimos) y no mitiga IPs distribuidas. No adecuado.\n\nReferencias:\nhttps://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html\nhttps://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30160,
    "questionNumber": 160,
    "question": "A company has a critical application in which the data tier is deployed in a single AWS Region. The data tier uses an Amazon DynamoDB table and an Amazon Aurora MySQL DB cluster. The current Aurora MySQL engine version supports a global database. The application tier is already deployed in two Regions. Company policy states that critical applications must have application tier components and data tier components deployed across two Regions. The RTO and RPO must be no more than a few minutes each. A solutions architect must recommend a solution to make the data tier compliant with company policy. Which combination of steps will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Add another Region to the Aurora MySQL DB cluster",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Add another Region to each table in the Aurora MySQL DB cluster",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Set up scheduled cross-Region backups for the DynamoDB table and the Aurora MySQL DB cluster",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Convert the existing DynamoDB table to a global table by adding another Region to its configuration",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Use Amazon Route 53 Application Recovery Controller to automate database backup and recovery to the secondary Region",
        "isCorrect": false
      }
    ],
    "comments": "Hacer el data tier (DynamoDB + Aurora MySQL) presente en dos Regiones con RTO/RPO de pocos minutos.\n\nOpción A (Correcta): Añadir otra Región al clúster Aurora MySQL (Aurora global database). Aurora Global Database replica a otra Región con RPO ~1 s y RTO de minutos, cumpliendo la política multi-Región del data tier.\n\nOpción B: 'Añadir otra Región a cada tabla del clúster Aurora' no es cómo funciona Aurora (se añade la Región al clúster/global database, no por tabla). Incorrecta.\n\nOpción C: Backups cross-Region programados dan RPO/RTO altos (no 'pocos minutos'). No cumple.\n\nOpción D (Correcta): Convertir la tabla DynamoDB en una GLOBAL TABLE añadiendo otra Región. Las global tables replican multi-Región activo-activo con RPO/RTO de segundos/minutos. A + D hace ambos componentes del data tier multi-Región cumpliendo RTO/RPO.\n\nOpción E: Route 53 Application Recovery Controller ayuda a orquestar failover, pero no 'automatiza backup/recovery de la BD'; no es lo que hace multi-Región el data tier.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30161,
    "questionNumber": 161,
    "question": "A telecommunications company is running an application on AWS. The company has set up an AWS Direct Connect connection between the company's on-premises data center and AWS. The company deployed the application on Amazon EC2 instances in multiple Availability Zones behind an internal Application Load Balancer (ALB). The company's clients connect from the on-premises network by using HTTPS. The TLS terminates in the ALB. The company has multiple target groups and uses path-based routing to forward requests based on the URL path. The company is planning to deploy an on-premises firewall appliance with an allow list that is based on IP address. A solutions architect must develop a solution to allow traffic flow to AWS from the on-premises network so that the clients can continue to access the application. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the existing ALB to use static IP addresses. Assign IP addresses in multiple Availability Zones to the ALB. Add the ALB IP addresses to the firewall appliance.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a Network Load Balancer (NLB). Associate the NLB with one static IP addresses in multiple Availability Zones. Create an ALB-type target group for the NLB and add the existing ALAdd the NLB IP addresses to the firewall appliance. Update the clients to connect to the NLB.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a Network Load Balancer (NLB). Associate the LNB with one static IP addresses in multiple Availability Zones. Add the existing target groups to the NLB. Update the clients to connect to the NLB. Delete the ALB Add the NLB IP addresses to the firewall appliance.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a Gateway Load Balancer (GWLB). Assign static IP addresses to the GWLB in multiple Availability Zones. Create an ALB-type target group for the GWLB and add the existing ALB. Add the GWLB IP addresses to the firewall appliance. Update the clients to connect to the GWLB.",
        "isCorrect": false
      }
    ],
    "comments": "Clientes on-premises conectan por HTTPS a un ALB interno (TLS termina en el ALB, routing por path). Se instala un firewall on-premises con allow list por IP, por lo que se necesitan IPs ESTÁTICAS de destino. Los ALB no tienen IPs estáticas.\n\nOpción A: Un ALB NO soporta IPs estáticas asignables; no se puede 'configurar el ALB para usar IPs estáticas'. Inválido.\n\nOpción B (Correcta): Crear un Network Load Balancer (NLB) con IPs estáticas (una por AZ), crear un target group de tipo ALB para el NLB y añadir el ALB existente como target (NLB -> ALB), y añadir las IPs del NLB a la allow list del firewall; los clientes conectan al NLB. El NLB da IPs estáticas para la allow list y preserva el ALB (con su routing por path y TLS). Es el patrón 'NLB delante de ALB' para IPs estáticas. Correcta.\n\nOpción C: Poner solo los target groups en el NLB y BORRAR el ALB pierde el routing por path y la terminación TLS del ALB; no conserva la funcionalidad. Descartada.\n\nOpción D: Un Gateway Load Balancer es para appliances de inspección, no para exponer un ALB con IPs estáticas a clientes HTTPS. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/network/network-load-balancers.html\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/network/application-load-balancer-target.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30162,
    "questionNumber": 162,
    "question": "A company runs an application on a fleet of Amazon EC2 instances that are in private subnets behind an internet-facing Application Load Balancer (ALB). The ALB is the origin for an Amazon CloudFront distribution. An AWS WAF web ACL that contains various AWS managed rules is associated with the CloudFront distribution. The company needs a solution that will prevent internet traffic from directly accessing the ALB. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new web ACL that contains the same rules that the existing web ACL contains. Associate the new web ACL with the ALB.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Associate the existing web ACL with the ALB.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Add a security group rule to the ALB to allow traffic from the AWS managed prefix list for CloudFront only.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Add a security group rule to the ALB to allow only the various CloudFront IP address ranges.",
        "isCorrect": false
      }
    ],
    "comments": "Evitar que el tráfico de Internet acceda DIRECTAMENTE al ALB (que es origen de CloudFront con WAF), con el MENOR overhead.\n\nOpción A: Un nuevo web ACL asociado al ALB duplica reglas y no impide el acceso directo por red al ALB; además WAF en el ALB no bloquea a nivel de red el bypass de CloudFront.\n\nOpción B: Asociar el web ACL existente al ALB no impide el acceso directo por red (solo filtra a nivel WAF). No cumple 'evitar acceso directo'.\n\nOpción C (Correcta): Añadir una regla al security group del ALB que permita tráfico SOLO desde la AWS-managed prefix list de CloudFront. Así, a nivel de red (capa 3/4), solo las IPs de los servidores origin-facing de CloudFront pueden alcanzar el ALB, impidiendo el acceso directo desde Internet. La prefix list gestionada se actualiza sola: menor overhead. La documentación de CloudFront lo confirma. Correcta.\n\nOpción D: Listar manualmente los rangos de IP de CloudFront en el security group es alto mantenimiento (cambian con frecuencia); la prefix list gestionada (C) es lo recomendado.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/restrict-access-to-load-balancer.html\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/LocationsOfEdgeServers.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30163,
    "questionNumber": 163,
    "question": "A company is running an application that uses an Amazon ElastiCache for Redis cluster as a caching layer. A recent security audit revealed that the company has configured encryption at rest for ElastiCache. However, the company did not configure ElastiCache to use encryption in transit. Additionally, users can access the cache without authentication. A solutions architect must make changes to require user authentication and to ensure that the company is using end-to-end encryption. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AUTH token. Store the token in AWS System Manager Parameter Store, as an encrypted parameter. Create a new cluster with AUTH, and configure encryption in transit. Update the application to retrieve the AUTH token from Parameter Store when necessary and to use the AUTH token for authentication.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AUTH token. Store the token in AWS Secrets Manager. Configure the existing cluster to use the AUTH token, and configure encryption in transit. Update the application to retrieve the AUTH token from Secrets Manager when necessary and to use the AUTH token for authentication.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an SSL certificate. Store the certificate in AWS Secrets Manager. Create a new cluster, and configure encryption in transit. Update the application to retrieve the SSL certificate from Secrets Manager when necessary and to use the certificate for authentication.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an SSL certificate. Store the certificate in AWS Systems Manager Parameter Store, as an encrypted advanced parameter. Update the existing cluster to configure encryption in transit. Update the application to retrieve the SSL certificate from Parameter Store when necessary and to use the certificate for authentication.",
        "isCorrect": false
      }
    ],
    "comments": "ElastiCache for Redis: falta cifrado en tránsito y autenticación de usuarios. Requerir autenticación (AUTH) y cifrado extremo a extremo.\n\nRedis usa un AUTH token para autenticación; el cifrado en tránsito (TLS) puede activarse en el clúster. El token debe guardarse de forma segura.\n\nOpción A: Guardar el AUTH token en Parameter Store funciona, pero AWS recomienda Secrets Manager para secretos como el AUTH token, y además 'crear un nuevo clúster' es más disruptivo. B es preferible.\n\nOpción B (Correcta): Crear un AUTH token, almacenarlo en AWS Secrets Manager, configurar el clúster existente para usar el AUTH token y activar el cifrado en tránsito, y actualizar la app para recuperar el token de Secrets Manager y usarlo para autenticación. Cumple autenticación (AUTH) + cifrado en tránsito (con el at-rest ya activo = extremo a extremo), con gestión segura del secreto. Correcta.\n\nOpción C/D: Redis no se autentica con 'certificados SSL' de esa forma (usa AUTH token o RBAC); un certificado no es el mecanismo de autenticación de usuarios de Redis. Incorrectas.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth.html\nhttps://docs.aws.amazon.com/AmazonElastiCache/latest/dg/in-transit-encryption.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30164,
    "questionNumber": 164,
    "question": "A company is running a compute workload by using Amazon EC2 Spot Instances that are in an Auto Scaling group. The launch template uses two placement groups and a single instance type. Recently, a monitoring system reported Auto Scaling instance launch failures that correlated with longer wait times for system users. The company needs to improve the overall reliability of the workload. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Replace the launch template with a launch configuration to use an Auto Scaling group that uses attribute-based instance type selection.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a new launch template version that uses attribute-based instance type selection. Configure the Auto Scaling group to use the new launch template version.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Update the launch template Auto Scaling group to increase the number of placement groups.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Update the launch template to use a larger instance type.",
        "isCorrect": false
      }
    ],
    "comments": "ASG de Spot con un único tipo de instancia y dos placement groups sufre fallos de lanzamiento (insuficiente capacidad Spot del único tipo). Mejorar la fiabilidad.\n\nUsar un único tipo de instancia Spot reduce las opciones de capacidad; diversificar tipos mejora la disponibilidad de Spot.\n\nOpción A: Las launch CONFIGURATIONS están obsoletas y NO soportan attribute-based instance type selection; hay que usar launch TEMPLATES. Inválido reemplazar template por configuration.\n\nOpción B (Correcta): Crear una nueva versión del launch TEMPLATE que use attribute-based instance type selection (ABS) y configurar el ASG para usarla. ABS permite al ASG elegir entre MUCHOS tipos de instancia que cumplan los atributos (vCPU/memoria), ampliando enormemente los pools de capacidad Spot disponibles y reduciendo los fallos de lanzamiento. Mejora la fiabilidad. Correcta.\n\nOpción C: Más placement groups no soluciona la escasez de capacidad de un único tipo Spot. No aplica.\n\nOpción D: Un tipo de instancia mayor sigue siendo un único tipo (mismo problema de capacidad Spot). No resuelve.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/create-asg-instance-type-requirements.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-fleet-attribute-based-instance-type-selection.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30165,
    "questionNumber": 165,
    "question": "A company is migrating a document processing workload to AWS. The company has updated many applications to natively use the Amazon S3 API to store, retrieve, and modify documents that a processing server generates at a rate of approximately 5 documents every second. After the document processing is finished, customers can download the documents directly from Amazon S3. During the migration, the company discovered that it could not immediately update the processing server that generates many documents to support the S3 API. The server runs on Linux and requires fast local access to the files that the server generates and modifies. When the server finishes processing, the files must be available to the public for download within 30 minutes. Which solution will meet these requirements with the LEAST amount of effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate the application to an AWS Lambda function. Use the AWS SDK for Java to generate, modify, and access the files that the company stores directly in Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Set up an Amazon S3 File Gateway and configure a file share that is linked to the document store. Mount the file share on an Amazon EC2 instance by using NFS. When changes occur in Amazon S3, initiate a RefreshCache API call to update the S3 File Gateway.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Configure Amazon FSx for Lustre with an import and export policy. Link the new file system to an S3 bucket. Install the Lustre client and mount the document store to an Amazon EC2 instance by using NFS.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure AWS DataSync to connect to an Amazon EC2 instance. Configure a task to synchronize the generated files to and from Amazon S3.",
        "isCorrect": false
      }
    ],
    "comments": "Un servidor Linux que no puede usar la S3 API todavía genera ficheros que deben estar disponibles públicamente en S3 en 30 min, con acceso LOCAL RÁPIDO a los ficheros y el MENOR esfuerzo.\n\nOpción A: Migrar a Lambda y usar el SDK contradice 'no se puede actualizar el servidor para usar la S3 API'. No aplica.\n\nOpción B (Correcta): Configurar un Amazon S3 File Gateway con un file share enlazado al almacén de documentos, montarlo en la EC2 por NFS (acceso local rápido con protocolo de ficheros que el servidor sí soporta) y, cuando ocurren cambios en S3, usar RefreshCache. El File Gateway presenta S3 como un share NFS/SMB (sin cambiar la app a S3 API), da acceso local rápido y sube los ficheros a S3 (disponibles para descarga). Es el de menor esfuerzo. Correcta.\n\nOpción C: FSx for Lustre con import/export y montar por NFS es más complejo y orientado a HPC; el File Gateway es más directo para exponer S3 como ficheros.\n\nOpción D: DataSync sincroniza periódicamente, pero no da un sistema de ficheros montado con acceso local continuo como el File Gateway; menos adecuado para 'acceso local rápido a los ficheros que genera'.\n\nReferencias:\nhttps://docs.aws.amazon.com/filegateway/latest/files3/what-is-file-s3.html\nhttps://docs.aws.amazon.com/filegateway/latest/files3/refresh-cache.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30166,
    "questionNumber": 166,
    "question": "A delivery company is running a serverless solution in the AWS Cloud. The solution manages user data, delivery information, and past purchase details. The solution consists of several microservices. The central user service stores sensitive data in an Amazon DynamoDB table. Several of the other microservices store a copy of parts of the sensitive data in different storage services. The company needs the ability to delete user information upon request. As soon as the central user service deletes a user, every other microservice must also delete its copy of the data immediately. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Activate DynamoDB Streams on the DynamoDB table. Create an AWS Lambda trigger for the DynamoDB stream that will post events about user deletion in an Amazon Simple Queue Service (Amazon SQS) queue. Configure each microservice to poll the queue and delete the user from the DynamoDB table.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Set up DynamoDB event notifications on the DynamoDB table. Create an Amazon Simple Notification Service (Amazon SNS) topic as a target for the DynamoDB event notification. Configure each microservice to subscribe to the SNS topic and to delete the user from the DynamoDB table.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure the central user service to post an event on a custom Amazon EventBridge event bus when the company deletes a user. Create an EventBridge rule for each microservice to match the user deletion event pattern and invoke logic in the microservice to delete the user from the DynamoDB table.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure the central user service to post a message on an Amazon Simple Queue Service (Amazon SQS) queue when the company deletes a user. Configure each microservice to create an event filter on the SQS queue and to delete the user from the DynamoDB table.",
        "isCorrect": false
      }
    ],
    "comments": "Al borrar un usuario en el servicio central, TODOS los microservicios deben borrar su copia INMEDIATAMENTE. Se busca fan-out de eventos desacoplado.\n\nOpción A: DynamoDB Streams -> Lambda -> UNA cola SQS que todos los microservicios sondean no es fan-out limpio (una cola compartida; cada microservicio necesitaría su propia entrega) y añade latencia/acoplamiento. Menos adecuado.\n\nOpción B: 'DynamoDB event notifications' no existe como tal (DynamoDB usa Streams, no 'event notifications' a SNS directas de esa forma). Inválido.\n\nOpción C (Correcta): El servicio central publica un evento en un bus personalizado de Amazon EventBridge al borrar un usuario, y cada microservicio tiene una EventBridge rule que hace match del patrón de evento de borrado e invoca su lógica para borrar su copia. EventBridge hace fan-out desacoplado a múltiples targets (cada microservicio), en tiempo real, y es fácilmente extensible. Es el patrón idóneo. Correcta.\n\nOpción D: SQS es punto a punto (una cola, un consumidor efectivo por mensaje); no hace fan-out a múltiples microservicios como EventBridge/SNS. No cumple 'todos borran inmediatamente'.\n\nReferencias:\nhttps://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html\nhttps://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30167,
    "questionNumber": 167,
    "question": "A company is running a web application in a VPC. The web application runs on a group of Amazon EC2 instances behind an Application Load Balancer (ALB). The ALB is using AWS WAF. An external customer needs to connect to the web application. The company must provide IP addresses to all external customers. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Replace the ALB with a Network Load Balancer (NLB). Assign an Elastic IP address to the NLB.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Allocate an Elastic IP address. Assign the Elastic IP address to the ALProvide the Elastic IP address to the customer.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS Global Accelerator standard accelerator. Specify the ALB as the accelerator's endpoint. Provide the accelerator's IP addresses to the customer.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure an Amazon CloudFront distribution. Set the ALB as the origin. Ping the distribution's DNS name to determine the distribution's public IP address. Provide the IP address to the customer.",
        "isCorrect": false
      }
    ],
    "comments": "Dar IPs a clientes externos para conectar a una web tras ALB (con WAF), con el MENOR overhead. Los ALB no tienen IPs estáticas.\n\nOpción A: Reemplazar el ALB por un NLB con EIP pierde WAF (WAF se asocia a ALB/CloudFront, no a NLB) y obliga a rehacer la capa 7. Más overhead y pierde funcionalidad.\n\nOpción B: No se puede asignar una Elastic IP a un ALB (los ALB no soportan EIP). Inválido.\n\nOpción C (Correcta): Crear un AWS Global Accelerator standard, especificar el ALB como endpoint del accelerator y dar a los clientes las IPs estáticas ANYCAST del accelerator. Global Accelerator proporciona 2 IPs estáticas estables que se pueden entregar a los clientes, delante del ALB (que conserva WAF), con el menor overhead. Correcta.\n\nOpción D: 'Hacer ping a la distribución CloudFront para obtener su IP pública' es incorrecto (las IPs de CloudFront no son estáticas ni se entregan así). Inválido.\n\nReferencias:\nhttps://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-benefits-of-migrating.html\nhttps://docs.aws.amazon.com/global-accelerator/latest/dg/about-endpoints.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30168,
    "questionNumber": 168,
    "question": "A company has a few AWS accounts for development and wants to move its production application to AWS. The company needs to enforce Amazon Elastic Block Store (Amazon EBS) encryption at rest current production accounts and future production accounts only. The company needs a solution that includes built-in blueprints and guardrails. Which combination of steps will meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS CloudFormation StackSets to deploy AWS Config rules on production accounts.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a new AWS Control Tower landing zone in an existing developer account. Create OUs for accounts. Add production and development accounts to production and development OUs, respectively.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a new AWS Control Tower landing zone in the company’s management account. Add production and development accounts to production and development OUs. respectively.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Invite existing accounts to join the organization in AWS Organizations. Create SCPs to ensure compliance.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Create a guardrail from the management account to detect EBS encryption.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Create a guardrail for the production OU to detect EBS encryption.",
        "isCorrect": true
      }
    ],
    "comments": "Forzar cifrado EBS at rest en cuentas de producción actuales y futuras, con blueprints y guardrails integrados (AWS Control Tower).\n\nOpción A: StackSets desplegando Config rules es una alternativa manual; el requisito pide 'blueprints y guardrails integrados' = Control Tower. No es la vía pedida.\n\nOpción B: Crear la landing zone en una cuenta de DESARROLLO existente es incorrecto: Control Tower se despliega desde la cuenta de GESTIÓN de la organización.\n\nOpción C (Correcta): Crear una nueva landing zone de AWS Control Tower en la cuenta de GESTIÓN y añadir las cuentas de producción y desarrollo a sus OUs respectivas. Base de gobierno con blueprints/guardrails.\n\nOpción D (Correcta): Invitar las cuentas existentes a la organización de AWS Organizations y crear SCPs para asegurar el cumplimiento (parte del enrolamiento y control).\n\nOpción E: Un guardrail 'desde la cuenta de gestión para detectar cifrado EBS' aplicado globalmente no cumple 'solo producción'; debe aplicarse al OU de producción (F).\n\nOpción F (Correcta): Crear un guardrail para el OU de PRODUCCIÓN que detecte el cifrado EBS. Así se aplica solo a producción (actual y futura, al entrar nuevas cuentas al OU). C + D + F.\n\nReferencias:\nhttps://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html\nhttps://docs.aws.amazon.com/controltower/latest/controlreference/data-residency-controls.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30169,
    "questionNumber": 169,
    "question": "A company is running a critical stateful web application on two Linux Amazon EC2 instances behind an Application Load Balancer (ALB) with an Amazon RDS for MySQL database. The company hosts the DNS records for the application in Amazon Route 53. A solutions architect must recommend a solution to improve the resiliency of the application. The solution must meet the following objectives: • Application tier: RPO of 2 minutes. RTO of 30 minutes • Database tier: RPO of 5 minutes. RTO of 30 minutes The company does not want to make significant changes to the existing application architecture. The company must ensure optimal latency after a failover. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the EC2 instances to use AWS Elastic Disaster Recovery. Create a cross-Region read replica for the RDS DB instance. Create an ALB in a second AWS Region. Create an AWS Global Accelerator endpoint, and associate the endpoint with the ALBs. Update DNS records to point to the Global Accelerator endpoint.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure the EC2 instances to use Amazon Data Lifecycle Manager (Amazon DLM) to take snapshots of the EBS volumes. Configure RDS automated backups. Configure backup replication to a second AWS Region. Create an ALB in the second Region. Create an AWS Global Accelerator endpoint, and associate the endpoint with the ALBs. Update DNS records to point to the Global Accelerator endpoint.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a backup plan in AWS Backup for the EC2 instances and RDS DB instance. Configure backup replication to a second AWS Region. Create an ALB in the second Region. Configure an Amazon CloudFront distribution in front of the ALB. Update DNS records to point to CloudFront.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure the EC2 instances to use Amazon Data Lifecycle Manager (Amazon DLM) to take snapshots of the EBS volumes. Create a cross-Region read replica for the RDS DB instance. Create an ALB in a second AWS Region. Create an AWS Global Accelerator endpoint, and associate the endpoint with the ALBs.",
        "isCorrect": false
      }
    ],
    "comments": "Mejorar resiliencia de una web stateful (2 EC2 tras ALB + RDS MySQL): app RPO 2 min/RTO 30 min, BD RPO 5 min/RTO 30 min, sin cambios significativos y latencia óptima tras failover.\n\nOpción A (Correcta): Configurar las EC2 con AWS Elastic Disaster Recovery (DRS) (replicación continua a otra Región, RPO de minutos, sin cambiar la app), una cross-Region read replica de RDS (RPO bajo, promovible en el failover), un ALB en la segunda Región y un endpoint de AWS Global Accelerator asociado a ambos ALB, con el DNS apuntando al Global Accelerator. Cumple los RPO/RTO, no cambia la app y Global Accelerator da latencia óptima tras el failover (anycast). Correcta.\n\nOpción B: Snapshots con DLM + backups no cumple el RPO de 2 min de la app (los snapshots son menos frecuentes/lentos que la replicación continua de DRS). No cumple RPO app.\n\nOpción C: AWS Backup + CloudFront no cumple los RPO tan ajustados ni da la latencia/failover de Global Accelerator; los backups no dan RPO de minutos.\n\nOpción D: Es casi como A pero SIN actualizar el DNS al Global Accelerator, por lo que el failover no redirige el tráfico; incompleta.\n\nReferencias:\nhttps://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html\nhttps://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30170,
    "questionNumber": 170,
    "question": "A solutions architect wants to cost-optimize and appropriately size Amazon EC2 instances in a single AWS account. The solutions architect wants to ensure that the instances are optimized based on CPU, memory, and network metrics. Which combination of steps should the solutions architect take to meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Purchase AWS Business Support or AWS Enterprise Support for the account.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Turn on AWS Trusted Advisor and review any “Low Utilization Amazon EC2 Instances” recommendations.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Install the Amazon CloudWatch agent and configure memory metric collection on the EC2 instances.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure AWS Compute Optimizer in the AWS account to receive findings and optimization recommendations.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Create an EC2 Instance Savings Plan for the AWS Regions, instance families, and operating systems of interest.",
        "isCorrect": false
      }
    ],
    "comments": "Rightsizing de EC2 basado en CPU, memoria y red en una sola cuenta.\n\nOpción A: Comprar Business/Enterprise Support no es necesario para Compute Optimizer (que es gratuito) ni para las métricas; no es un paso requerido.\n\nOpción B: Trusted Advisor 'Low Utilization EC2' se basa sobre todo en CPU/red y no incluye memoria de forma nativa; para rightsizing por CPU+MEMORIA+red, Compute Optimizer es lo indicado.\n\nOpción C (Correcta): Instalar el CloudWatch agent y configurar la recolección de métricas de MEMORIA en las EC2 (la memoria no se recopila por defecto y es necesaria para el rightsizing completo).\n\nOpción D (Correcta): Configurar AWS Compute Optimizer en la cuenta para recibir findings y recomendaciones de optimización (usa CPU, red y, con el agent, memoria). C + D da rightsizing basado en CPU, memoria y red.\n\nOpción E: Un EC2 Instance Savings Plan reduce coste por compromiso, pero NO hace rightsizing (no ajusta el tamaño); no cumple el objetivo del análisis.\n\nReferencias:\nhttps://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html",
    "category": "Optimización de Costes",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30171,
    "questionNumber": 171,
    "question": "A company uses an AWS CodeCommit repository. The company must store a backup copy of the data that is in the repository in a second AWS Region. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure AWS Elastic Disaster Recovery to replicate the CodeCommit repository data to the second Region.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Backup to back up the CodeCommit repository on an hourly schedule. Create a cross-Region copy in the second Region.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon EventBridge rule to invoke AWS CodeBuild when the company pushes code to the repository. Use CodeBuild to clone the repository. Create a .zip file of the content. Copy the file to an S3 bucket in the second Region.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an AWS Step Functions workflow on an hourly schedule to take a snapshot of the CodeCommit repository. Configure the workflow to copy the snapshot to an S3 bucket in the second Region",
        "isCorrect": false
      }
    ],
    "comments": "Guardar una copia de respaldo del repositorio de AWS CodeCommit en una segunda Región.\n\nOpción A: Elastic Disaster Recovery replica servidores, no repositorios CodeCommit. No aplica.\n\nOpción B: AWS Backup no soporta CodeCommit como servicio respaldable. Inválido.\n\nOpción C (Correcta): Crear una regla de EventBridge que invoque AWS CodeBuild cuando se hace push al repositorio; CodeBuild clona el repositorio, crea un .zip del contenido y lo copia a un bucket S3 en la segunda Región. Es un mecanismo válido y automatizado para respaldar CodeCommit cross-Region (no hay un backup nativo de CodeCommit, así que se automatiza con CodeBuild). Correcta.\n\nOpción D: No existe una operación de 'snapshot' de un repositorio CodeCommit vía Step Functions; no es un mecanismo real. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/codecommit/latest/userguide/how-to-notify-events.html\nhttps://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30172,
    "questionNumber": 172,
    "question": "A company has multiple business units that each have separate accounts on AWS. Each business unit manages its own network with several VPCs that have CIDR ranges that overlap. The company’s marketing team has created a new internal application and wants to make the application accessible to all the other business units. The solution must use private IP addresses only. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Instruct each business unit to add a unique secondary CIDR range to the business unit's VPC. Peer the VPCs and use a private NAT gateway in the secondary range to route traffic to the marketing team.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon EC2 instance to serve as a virtual appliance in the marketing account's VPC. Create an AWS Site-to-Site VPN connection between the marketing team and each business unit's VPC. Perform NAT where necessary.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS PrivateLink endpoint service to share the marketing application. Grant permission to specific AWS accounts to connect to the service. Create interface VPC endpoints in other accounts to access the application by using private IP addresses.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create a Network Load Balancer (NLB) in front of the marketing application in a private subnet. Create an API Gateway API. Use the Amazon API Gateway private integration to connect the API to the NLB. Activate IAM authorization for the API. Grant access to the accounts of the other business units.",
        "isCorrect": false
      }
    ],
    "comments": "Compartir una app interna del equipo de marketing con otras unidades de negocio (cuentas distintas) usando SOLO IPs privadas, con VPCs de CIDR SOLAPADOS, con el MENOR overhead.\n\nEl solapamiento de CIDR descarta peering/VPN directos (no admiten rangos solapados). PrivateLink funciona con CIDR solapados porque expone el servicio por un endpoint, no conecta redes.\n\nOpción A: Añadir CIDR secundarios y peering con NAT privado es complejo, frágil y no escala; y el peering no admite solape en el rango principal.\n\nOpción B: EC2 appliance + VPN Site-to-Site entre marketing y cada unidad con NAT es mucha operación y no es el patrón para compartir una app con CIDR solapados.\n\nOpción C (Correcta): Crear un AWS PrivateLink endpoint service para compartir la app de marketing, conceder permiso a las cuentas concretas y que cada cuenta cree un interface VPC endpoint para acceder por IPs privadas. PrivateLink funciona aunque los CIDR se solapen (no enruta redes, expone el servicio), usa solo IPs privadas y tiene el menor overhead. Correcta.\n\nOpción D: NLB + API Gateway private + IAM auth es más piezas/overhead que PrivateLink directo para exponer un servicio interno entre cuentas.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30173,
    "questionNumber": 173,
    "question": "A company needs to audit the security posture of a newly acquired AWS account. The company’s data security team requires a notification only when an Amazon S3 bucket becomes publicly exposed. The company has already established an Amazon Simple Notification Service (Amazon SNS) topic that has the data security team's email address subscribed. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an S3 event notification on all S3 buckets for the isPublic event. Select the SNS topic as the target for the event notifications.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an analyzer in AWS Identity and Access Management Access Analyzer. Create an Amazon EventBridge rule for the event type “Access Analyzer Finding” with a filter for “isPublic: true.” Select the SNS topic as the EventBridge rule target.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an Amazon EventBridge rule for the event type “Bucket-Level API Call via CloudTrail” with a filter for “PutBucketPolicy.” Select the SNS topic as the EventBridge rule target.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Activate AWS Config and add the cloudtrail-s3-dataevents-enabled rule. Create an Amazon EventBridge rule for the event type “Config Rules Re-evaluation Status” with a filter for “NON_COMPLIANT.” Select the SNS topic as the EventBridge rule target.",
        "isCorrect": false
      }
    ],
    "comments": "Notificar SOLO cuando un bucket S3 queda PÚBLICAMENTE expuesto; ya hay un SNS topic con el equipo suscrito.\n\nOpción A: No existe un evento 'isPublic' de S3 event notifications; las S3 event notifications son de objetos (put/delete...), no de exposición pública del bucket. Inválido.\n\nOpción B (Correcta): Crear un analyzer en IAM Access Analyzer (que detecta acceso público/externo a recursos como buckets S3), y una regla de EventBridge para el tipo de evento 'Access Analyzer Finding' con filtro 'isPublic: true', con el SNS topic como target. Access Analyzer genera un finding cuando un bucket queda público, y EventBridge lo enruta a SNS. Es la solución precisa para 'notificar solo cuando un bucket se expone públicamente'. Correcta.\n\nOpción C: Filtrar PutBucketPolicy vía CloudTrail notifica cualquier cambio de política (muchos falsos positivos), no específicamente 'quedó público'. Menos preciso.\n\nOpción D: La regla de Config cloudtrail-s3-dataevents-enabled es sobre logging de data events, no sobre exposición pública de buckets. No cumple.\n\nReferencias:\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-resources.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-eventbridge.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30174,
    "questionNumber": 174,
    "question": "A solutions architect needs to assess a newly acquired company’s portfolio of applications and databases. The solutions architect must create a business case to migrate the portfolio to AWS. The newly acquired company runs applications in an on-premises data center. The data center is not well documented. The solutions architect cannot immediately determine how many applications and databases exist. Traffic for the applications is variable. Some applications are batch processes that run at the end of each month. The solutions architect must gain a better understanding of the portfolio before a migration to AWS can begin. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Server Migration Service (AWS SMS) and AWS Database Migration Service (AWS DMS) to evaluate migration. Use AWS Service Catalog to understand application and database dependencies.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Application Migration Service. Run agents on the on-premises infrastructure. Manage the agents by using AWS Migration Hub. Use AWS Storage Gateway to assess local storage needs and database dependencies.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Migration Evaluator to generate a list of servers. Build a report for a business case. Use AWS Migration Hub to view the portfolio. Use AWS Application Discovery Service to gain an understanding of application dependencies.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use AWS Control Tower in the destination account to generate an application portfolio. Use AWS Server Migration Service (AWS SMS) to generate deeper reports and a business case. Use a landing zone for core accounts and resources.",
        "isCorrect": false
      }
    ],
    "comments": "Data center no documentado, número desconocido de apps/BDs, tráfico variable (algunos batch a fin de mes); entender el portfolio y crear un business case antes de migrar.\n\nOpción A: SMS/DMS son de MIGRACIÓN (mover cargas), no de descubrimiento/business case; Service Catalog no descubre dependencias.\n\nOpción B: Application Migration Service (MGN) es para migrar servidores; Storage Gateway no evalúa dependencias de aplicaciones/BD. No es descubrimiento/business case.\n\nOpción C (Correcta): Usar Migration Evaluator para generar la lista de servidores y construir el business case; usar AWS Migration Hub para ver el portfolio; y usar AWS Application Discovery Service para entender las dependencias entre aplicaciones (los agentes/connector capturan uso, procesos y conexiones durante suficiente tiempo para captar los batch de fin de mes). Cubre descubrimiento + dependencias + business case. Correcta.\n\nOpción D: Control Tower gobierna cuentas, no genera un portfolio de aplicaciones on-premises; SMS es migración. No aplica al descubrimiento/business case.\n\nReferencias:\nhttps://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html\nhttps://docs.aws.amazon.com/migration-evaluator/latest/userguide/what-is.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30175,
    "questionNumber": 175,
    "question": "A company has an application that runs as a ReplicaSet of multiple pods in an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. The EKS cluster has nodes in multiple Availability Zones. The application generates many small files that must be accessible across all running instances of the application. The company needs to back up the files and retain the backups for 1 year. Which solution will meet these requirements while providing the FASTEST storage performance?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon Elastic File System (Amazon EFS) file system and a mount target for each subnet that contains nodes in the EKS cluster. Configure the ReplicaSet to mount the file system. Direct the application to store files in the file system. Configure AWS Backup to back up and retain copies of the data for 1 year.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an Amazon Elastic Block Store (Amazon EBS) volume. Enable the EBS Multi-Attach feature. Configure the ReplicaSet to mount the EBS volume. Direct the application to store files in the EBS volume. Configure AWS Backup to back up and retain copies of the data for 1 year.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon S3 bucket. Configure the ReplicaSet to mount the S3 bucket. Direct the application to store files in the S3 bucket. Configure S3 Versioning to retain copies of the data. Configure an S3 Lifecycle policy to delete objects after 1 year.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure the ReplicaSet to use the storage available on each of the running application pods to store the files locally. Use a third-party tool to back up the EKS cluster for 1 year.",
        "isCorrect": false
      }
    ],
    "comments": "ReplicaSet de pods en EKS multi-AZ que generan muchos ficheros pequeños accesibles por TODAS las instancias; respaldar 1 año, con el ALMACENAMIENTO de MEJOR RENDIMIENTO para acceso compartido.\n\nOpción A (Correcta): Crear un Amazon EFS con un mount target por subred (AZ) del clúster EKS, configurar el ReplicaSet para montarlo y que la app guarde los ficheros ahí; usar AWS Backup para respaldar y retener 1 año. EFS es un sistema de ficheros compartido, concurrente y multi-AZ (todas las instancias/pods acceden a los mismos ficheros con buen rendimiento para muchos ficheros pequeños), y AWS Backup cubre la retención de 1 año. Es la solución de acceso compartido de mayor rendimiento entre las opciones. Correcta.\n\nOpción B: EBS Multi-Attach solo funciona en la MISMA AZ y con límites (io1/io2, sistema de ficheros en clúster); no sirve para acceso compartido multi-AZ desde EKS. Descartada.\n\nOpción C: S3 no se 'monta' de forma nativa como sistema de ficheros POSIX para los pods (montarlo es un hack con menor rendimiento); no es el acceso compartido de mayor rendimiento para ficheros.\n\nOpción D: Almacenamiento local en cada pod NO es compartido entre instancias (cada pod vería ficheros distintos) y es efímero. No cumple 'accesible por todas las instancias'.\n\nReferencias:\nhttps://docs.aws.amazon.com/efs/latest/ug/whatisefs.html\nhttps://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30176,
    "questionNumber": 176,
    "question": "A company runs a customer service center that accepts calls and automatically sends all customers a managed, interactive, two-way experience survey by text message. The applications that support the customer service center run on machines that the company hosts in an on-premises data center. The hardware that the company uses is old, and the company is experiencing downtime with the system. The company wants to migrate the system to AWS to improve reliability. Which solution will meet these requirements with the LEAST ongoing operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Connect to replace the old call center hardware. Use Amazon Pinpoint to send text message surveys to customers.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use Amazon Connect to replace the old call center hardware. Use Amazon Simple Notification Service (Amazon SNS) to send text message surveys to customers.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Migrate the call center software to Amazon EC2 instances that are in an Auto Scaling group. Use the EC2 instances to send text message surveys to customers.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon Pinpoint to replace the old call center hardware and to send text message surveys to customers.",
        "isCorrect": false
      }
    ],
    "comments": "Centro de atención (llamadas) + envío de encuestas por SMS interactivas y bidireccionales, migrando a AWS con el MENOR overhead.\n\nOpción A (Correcta): Amazon Connect (centro de contacto gestionado, reemplaza el hardware de call center) + Amazon Pinpoint para enviar encuestas por SMS. Pinpoint soporta mensajería SMS bidireccional/interactiva (two-way) y campañas, que es exactamente lo pedido. Ambos son gestionados: mínimo overhead. Correcta.\n\nOpción B: SNS envía SMS de una sola vía (no interactivo/bidireccional); no soporta la experiencia de encuesta two-way. Por eso Pinpoint (A) y no SNS.\n\nOpción C: Migrar el software del call center a EC2/ASG mantiene la gestión de servidores; más overhead que Connect.\n\nOpción D: Pinpoint no reemplaza el hardware del call center (no gestiona llamadas de voz entrantes); eso es Amazon Connect. Incompleta.\n\nReferencias:\nhttps://docs.aws.amazon.com/connect/latest/adminguide/what-is-amazon-connect.html\nhttps://docs.aws.amazon.com/pinpoint/latest/userguide/channels-sms.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30177,
    "questionNumber": 177,
    "question": "A company is building a call center by using Amazon Connect. The company’s operations team is defining a disaster recovery (DR) strategy across AWS Regions. The contact center has dozens of contact flows, hundreds of users, and dozens of claimed phone numbers. Which solution will provide DR with the LOWEST RTO?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Lambda function to check the availability of the Amazon Connect instance and to send a notification to the operations team in case of unavailability. Create an Amazon EventBridge rule to invoke the Lambda function every 5 minutes. After notification, instruct the operations team to use the AWS Management Console to provision a new Amazon Connect instance in a second Region. Deploy the contact flows, users, and claimed phone numbers by using an AWS CloudFormation template.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Provision a new Amazon Connect instance with all existing users in a second Region. Create an AWS Lambda function to check the availability of the Amazon Connect instance. Create an Amazon EventBridge rule to invoke the Lambda function every 5 minutes. In the event of an issue, configure the Lambda function to deploy an AWS CloudFormation template that provisions contact flows and claimed numbers in the second Region.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Provision a new Amazon Connect instance with all existing contact flows and claimed phone numbers in a second Region. Create an Amazon Route 53 health check for the URL of the Amazon Connect instance. Create an Amazon CloudWatch alarm for failed health checks. Create an AWS Lambda function to deploy an AWS CloudFormation template that provisions all users. Configure the alarm to invoke the Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Provision a new Amazon Connect instance with all existing users and contact flows in a second Region. Create an Amazon Route 53 health check for the URL of the Amazon Connect instance. Create an Amazon CloudWatch alarm for failed health checks. Create an AWS Lambda function to deploy an AWS CloudFormation template that provisions claimed phone numbers. Configure the alarm to invoke the Lambda function.",
        "isCorrect": true
      }
    ],
    "comments": "DR de Amazon Connect entre Regiones con el MENOR RTO (decenas de contact flows, cientos de usuarios, decenas de números).\n\nPara el RTO más bajo hay que tener PRE-APROVISIONADO en la segunda Región lo que más tarda en recrearse. Los números de teléfono reclamados son lo más lento/limitado de reclamar, mientras que usuarios y contact flows se pueden aprovisionar con antelación.\n\nOpción A: Aprovisionar todo tras la notificación (manual, con la consola) da el PEOR RTO. Descartada.\n\nOpción B: Pre-aprovisiona usuarios, pero deja contact flows y números para desplegar en el evento; los números son lo más lento, así que el RTO no es el mínimo.\n\nOpción C: Pre-aprovisiona contact flows y números, pero deja los USUARIOS para el evento (cientos de usuarios tardan); RTO subóptimo.\n\nOpción D (Correcta): Aprovisionar de antemano la instancia de Connect en la segunda Región con TODOS los usuarios y contact flows (lo voluminoso ya listo), un health check de Route 53 sobre la URL de la instancia, una alarma de CloudWatch por health check fallido y una Lambda que despliega una plantilla de CloudFormation que aprovisiona los números de teléfono reclamados. Deja para el evento solo los números (lo que no se puede duplicar de antemano), minimizando el RTO. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/connect/latest/adminguide/what-is-amazon-connect.html\nhttps://docs.aws.amazon.com/connect/latest/adminguide/setup-connect-phone-numbers.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30178,
    "questionNumber": 178,
    "question": "A company runs an application on AWS. The company curates data from several different sources. The company uses proprietary algorithms to perform data transformations and aggregations. After the company performs ETL processes, the company stores the results in Amazon Redshift tables. The company sells this data to other companies. The company downloads the data as files from the Amazon Redshift tables and transmits the files to several data customers by using FTP. The number of data customers has grown significantly. Management of the data customers has become difficult. The company will use AWS Data Exchange to create a data product that the company can use to share data with customers. The company wants to confirm the identities of the customers before the company shares data. The customers also need access to the most recent data when the company publishes the data. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Data Exchange for APIs to share data with customers. Configure subscription verification. In the AWS account of the company that produces the data, create an Amazon API Gateway Data API service integration with Amazon Redshift. Require the data customers to subscribe to the data product.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "In the AWS account of the company that produces the data, create an AWS Data Exchange datashare by connecting AWS Data Exchange to the Redshift cluster. Configure subscription verification. Require the data customers to subscribe to the data product.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Download the data from the Amazon Redshift tables to an Amazon S3 bucket periodically. Use AWS Data Exchange for S3 to share data with customers. Configure subscription verification. Require the data customers to subscribe to the data product.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Publish the Amazon Redshift data to an Open Data on AWS Data Exchange. Require the customers to subscribe to the data product in AWS Data Exchange. In the AWS account of the company that produces the data, attach IAM resource-based policies to the Amazon Redshift tables to allow access only to verified AWS accounts.",
        "isCorrect": false
      }
    ],
    "comments": "Compartir datos de Redshift con clientes verificados que necesitan los datos más recientes al publicarlos, con el MENOR overhead, usando AWS Data Exchange.\n\nOpción A: 'Data Exchange for APIs' + API Gateway/Data API a Redshift es más piezas y desarrollo que un datashare nativo de Redshift.\n\nOpción B (Correcta): En la cuenta productora, crear un AWS Data Exchange datashare conectando Data Exchange al clúster Redshift (AWS Data Exchange for Amazon Redshift), configurar subscription verification (para confirmar la identidad de los clientes) y que los clientes se suscriban al data product. El datashare de Redshift da acceso en vivo a los datos más recientes sin exportar/FTP, y la verificación de suscripción confirma identidades: mínimo overhead. Correcta.\n\nOpción C: Descargar periódicamente a S3 y compartir por Data Exchange for S3 no da acceso a los datos 'más recientes al publicar' de forma inmediata (hay copia periódica) y añade proceso. Menos idónea.\n\nOpción D: Open Data on AWS es para datos públicos gratuitos, no para clientes verificados de pago; y las resource policies de Redshift no son el mecanismo de Data Exchange. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/data-exchange/latest/userguide/redshift-data-sets.html\nhttps://docs.aws.amazon.com/data-exchange/latest/userguide/subscription-verification-sub.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30179,
    "questionNumber": 179,
    "question": "A solutions architect is designing a solution to process events. The solution must have the ability to scale in and out based on the number of events that the solution receives. If a processing error occurs, the event must move into a separate queue for review. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Send event details to an Amazon Simple Notification Service (Amazon SNS) topic. Configure an AWS Lambda function as a subscriber to the SNS topic to process the events. Add an on-failure destination to the function. Set an Amazon Simple Queue Service (Amazon SQS) queue as the target.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Publish events to an Amazon Simple Queue Service (Amazon SQS) queue. Create an Amazon EC2 Auto Scaling group. Configure the Auto Scaling group to scale in and out based on the ApproximateAgeOfOldestMessage metric of the queue. Configure the application to write failed messages to a dead-letter queue.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Write events to an Amazon DynamoDB table. Configure a DynamoDB stream for the table. Configure the stream to invoke an AWS Lambda function. Configure the Lambda function to process the events.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Publish events to an Amazon EventBndge event bus. Create and run an application on an Amazon EC2 instance with an Auto Scaling group that is behind an Application Load Balancer (ALB). Set the ALB as the event bus target. Configure the event bus to retry events. Write messages to a dead-letter queue if the application cannot process the messages.",
        "isCorrect": false
      }
    ],
    "comments": "Procesar eventos con escalado in/out según el número de eventos y, ante error de procesamiento, mover el evento a una cola separada para revisión.\n\nOpción A: SNS -> Lambda con on-failure destination a SQS procesa eventos y captura fallos, pero SNS es push (no permite escalar workers según 'número de eventos en cola' con la métrica de antigüedad de cola); B encaja mejor con 'escalar según número de eventos' y DLQ.\n\nOpción B (Correcta): Publicar eventos en una cola SQS; crear un Auto Scaling group que escale in/out según la métrica ApproximateAgeOfOldestMessage (o profundidad de cola) de SQS; y configurar la aplicación para escribir los mensajes fallidos a una dead-letter queue. La cola desacopla y permite escalar por backlog, y la DLQ es 'la cola separada para revisión'. Cumple ambos requisitos con SQS + ASG + DLQ. Correcta.\n\nOpción C: DynamoDB Streams -> Lambda no escala 'según número de eventos' de la misma forma ni gestiona la cola de revisión por error de la manera pedida.\n\nOpción D: EventBridge con un ALB como target no es un patrón válido (EventBridge no invoca un ALB como target de esa forma). Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/as-using-sqs-queue.html\nhttps://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30180,
    "questionNumber": 180,
    "question": "A company runs a processing engine in the AWS Cloud. The engine processes environmental data from logistics centers to calculate a sustainability index. The company has millions of devices in logistics centers that are spread across Europe. The devices send information to the processing engine through a RESTful API. The API experiences unpredictable bursts of traffic. The company must implement a solution to process all data that the devices send to the processing engine. Data loss is unacceptable. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Application Load Balancer (ALB) for the RESTful API. Create an Amazon Simple Queue Service (Amazon SQS) queue. Create a listener and a target group for the ALB Add the SQS queue as the target. Use a container that runs in Amazon Elastic Container Service (Amazon ECS) with the Fargate launch type to process messages in the queue.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon API Gateway HTTP API that implements the RESTful API. Create an Amazon Simple Queue Service (Amazon SQS) queue. Create an API Gateway service integration with the SQS queue. Create an AWS Lambda function to process messages in the SQS queue.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an Amazon API Gateway REST API that implements the RESTful API. Create a fleet of Amazon EC2 instances in an Auto Scaling group. Create an API Gateway Auto Scaling group proxy integration. Use the EC2 instances to process incoming data.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Amazon CloudFront distribution for the RESTful API. Create a data stream in Amazon Kinesis Data Streams. Set the data stream as the origin for the distribution. Create an AWS Lambda function to consume and process data in the data stream.",
        "isCorrect": false
      }
    ],
    "comments": "API RESTful con ráfagas impredecibles de tráfico desde millones de dispositivos; procesar TODOS los datos, sin pérdida de datos.\n\nOpción A: ALB con una SQS como 'target' no es válido (un ALB no tiene a SQS como target directo). Incorrecta.\n\nOpción B (Correcta): Amazon API Gateway HTTP API que implementa la RESTful API, una cola SQS, una integración de servicio de API Gateway con SQS (API Gateway escribe directamente los mensajes en la cola, absorbiendo las ráfagas y evitando pérdida) y una Lambda que procesa los mensajes de la cola. El buffering en SQS garantiza que no se pierdan datos ante ráfagas, con arquitectura serverless. Correcta.\n\nOpción C: API Gateway REST + 'Auto Scaling group proxy integration' no es un tipo de integración válido, y EC2 no da el buffering para 'no pérdida' ante ráfagas como SQS.\n\nOpción D: 'Kinesis Data Streams como origin de CloudFront' no es un patrón válido (CloudFront no tiene Kinesis como origin así). Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-aws-services.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30181,
    "questionNumber": 181,
    "question": "A company is designing its network configuration in the AWS Cloud. The company uses AWS Organizations to manage a multi-account setup. The company has three OUs. Each OU contains more than 100 AWS accounts. Each account has a single VPC, and all the VPCs in each OU are in the same AWS Region. The CIDR ranges for all the AWS accounts do not overlap. The company needs to implement a solution in which VPCs in the same OU can communicate with each other but cannot communicate with VPCs in other OUs. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS CloudFormation stack set that establishes VPC peering between accounts in each OU. Provision the stack set in each OU.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "In each OU, create a dedicated networking account that has a single VPC. Share this VPC with all the other accounts in the OU by using AWS Resource Access Manager (AWS RAM). Create a VPC peering connection between the networking account and each account in the OU.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Provision a transit gateway in an account in each OU. Share the transit gateway across the organization by using AWS Resource Access Manager (AWS RAM). Create transit gateway VPC attachments for each VPC.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "In each OU, create a dedicated networking account that has a single VPC. Establish a VPN connection between the networking account and the other accounts in the OU. Use third-party routing software to route transitive traffic between the VPCs.",
        "isCorrect": false
      }
    ],
    "comments": "3 OUs con >100 cuentas cada uno (una VPC por cuenta, CIDR no solapados); las VPC del MISMO OU deben comunicarse entre sí pero NO con las de otros OUs, con el MENOR overhead.\n\nOpción A: VPC peering entre >100 cuentas por OU crea una malla enorme (n²) inmanejable; altísimo overhead.\n\nOpción B: Una VPC compartida por RAM + peering con cada cuenta mezcla modelos y no da comunicación limpia entre las VPC existentes de cada cuenta; complejo.\n\nOpción C (Correcta): Provisionar un transit gateway en una cuenta de CADA OU, compartirlo por AWS RAM y crear transit gateway VPC attachments para cada VPC de ese OU. El TGW conecta de forma transitiva y escalable todas las VPC del mismo OU; al tener un TGW por OU (o route tables separadas), las VPC de un OU no alcanzan a las de otro. Menor overhead para cientos de VPC. Correcta.\n\nOpción D: VPN + software de routing de terceros para tráfico transitivo es alto overhead y autogestionado. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html\nhttps://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30182,
    "questionNumber": 182,
    "question": "A company is migrating an application to AWS. It wants to use fully managed services as much as possible during the migration. The company needs to store large important documents within the application with the following requirements: 1. The data must be highly durable and available 2. The data must always be encrypted at rest and in transit 3. The encryption key must be managed by the company and rotated periodically Which of the following solutions should the solutions architect recommend?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy the storage gateway to AWS in file gateway mode. Use Amazon EBS volume encryption using an AWS KMS key to encrypt the storage gateway volumes.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon S3 with a bucket policy to enforce HTTPS for connections to the bucket and to enforce server-side encryption and AWS KMS for object encryption.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use Amazon DynamoDB with SSL to connect to DynamoDB. Use an AWS KMS key to encrypt DynamoDB objects at rest.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy instances with Amazon EBS volumes attached to store this data. Use EBS volume encryption using an AWS KMS key to encrypt the data.",
        "isCorrect": false
      }
    ],
    "comments": "Almacenar documentos importantes: altamente durable y disponible, siempre cifrado en reposo y en tránsito, con clave gestionada por la empresa y rotada periódicamente. Servicios totalmente gestionados.\n\nOpción A: Storage Gateway file gateway + cifrado EBS no es el almacenamiento de documentos totalmente gestionado más durable/disponible; introduce un gateway que gestionar.\n\nOpción B (Correcta): Amazon S3 con una bucket policy que fuerza HTTPS (cifrado EN TRÁNSITO) y server-side encryption con AWS KMS (SSE-KMS) para el cifrado de objetos EN REPOSO. S3 es altamente durable (11 nueves) y disponible; SSE-KMS con una customer managed key permite que la empresa gestione y ROTE la clave periódicamente. Cumple todos los requisitos con servicio gestionado. Correcta.\n\nOpción C: DynamoDB es para datos NoSQL, no para 'documentos grandes'; no encaja como almacén de documentos.\n\nOpción D: EBS obliga a gestionar instancias EC2 (no es 'totalmente gestionado') y no es tan durable/disponible como S3 para documentos.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30183,
    "questionNumber": 183,
    "question": "A company’s public API runs as tasks on Amazon Elastic Container Service (Amazon ECS). The tasks run on AWS Fargate behind an Application Load Balancer (ALB) and are configured with Service Auto Scaling for the tasks based on CPU utilization. This service has been running well for several months. Recently, API performance slowed down and made the application unusable. The company discovered that a significant number of SQL injection attacks had occurred against the API and that the API service had scaled to its maximum amount. A solutions architect needs to implement a solution that prevents SQL injection attacks from reaching the ECS API service. The solution must allow legitimate traffic through and must maximize operational efficiency. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new AWS WAF web ACL to monitor the HTTP requests and HTTPS requests that are forwarded to the ALB in front of the ECS tasks.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a new AWS WAF Bot Control implementation. Add a rule in the AWS WAF Bot Control managed rule group to monitor traffic and allow only legitimate traffic to the ALB in front of the ECS tasks.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a new AWS WAF web ACL. Add a new rule that blocks requests that match the SQL database rule group. Set the web ACL to allow all other traffic that does not match those rules. Attach the web ACL to the ALB in front of the ECS tasks.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create a new AWS WAF web ACL. Create a new empty IP set in AWS WAF. Add a new rule to the web ACL to block requests that originate from IP addresses in the new IP set. Create an AWS Lambda function that scrapes the API logs for IP addresses that send SQL injection attacks, and add those IP addresses to the IP set. Attach the web ACL to the ALB in front of the ECS tasks.",
        "isCorrect": false
      }
    ],
    "comments": "Prevenir ataques de inyección SQL que llegan al servicio ECS/API (tras un ALB), dejando pasar el tráfico legítimo y maximizando la eficiencia operativa.\n\nOpción A: Un web ACL que solo MONITORIZA (no bloquea) no previene los ataques; solo observa. No cumple 'prevenir'.\n\nOpción B: WAF Bot Control es para bots, no específicamente para inyección SQL. No es la protección adecuada.\n\nOpción C (Correcta): Crear un web ACL de AWS WAF con una regla que BLOQUEE las peticiones que coincidan con el managed rule group de SQL database (SQL injection), permitiendo el resto del tráfico, y asociar el web ACL al ALB delante de las tareas ECS. El managed rule group de SQLi de AWS bloquea los ataques de inyección SQL dejando pasar lo legítimo, con máxima eficiencia operativa (regla gestionada). Correcta.\n\nOpción D: Un IP set poblado por una Lambda que rastrea logs es reactivo y de alto mantenimiento; el managed rule group de SQLi (C) es preventivo y eficiente.\n\nReferencias:\nhttps://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-use-case.html\nhttps://docs.aws.amazon.com/waf/latest/developerguide/web-acl.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30184,
    "questionNumber": 184,
    "question": "An environmental company is deploying sensors in major cities throughout a country to measure air quality. The sensors connect to AWS IoT Core to ingest timeseries data readings. The company stores the data in Amazon DynamoDB. For business continuity, the company must have the ability to ingest and store data in two AWS Regions. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon Route 53 alias failover routing policy with values for AWS IoT Core data endpoints in both Regions Migrate data to Amazon Aurora global tables.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a domain configuration for AWS IoT Core in each Region. Create an Amazon Route 53 latency-based routing policy. Use AWS IoT Core data endpoints in both Regions as values. Migrate the data to Amazon MemoryDB for Redis and configure cross-Region replication.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a domain configuration for AWS IoT Core in each Region. Create an Amazon Route 53 health check that evaluates domain configuration health. Create a failover routing policy with values for the domain name from the AWS IoT Core domain configurations. Update the DynamoDB table to a global table.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an Amazon Route 53 latency-based routing policy. Use AWS IoT Core data endpoints in both Regions as values. Configure DynamoDB streams and cross-Region data replication.",
        "isCorrect": false
      }
    ],
    "comments": "Sensores -> AWS IoT Core -> DynamoDB; poder ingerir y almacenar en DOS Regiones (continuidad de negocio).\n\nOpción A: Aurora global tables no existe como tal para migrar datos de sensores de DynamoDB; mezcla conceptos. Y failover simple no cubre bien la ingesta IoT en dos Regiones.\n\nOpción B: MemoryDB con replicación cross-Region cambia el almacén y no es lo pedido (se usa DynamoDB); latency-based no es failover para continuidad.\n\nOpción C (Correcta): Crear una domain configuration de AWS IoT Core en cada Región, un health check de Route 53 que evalúe la salud de la domain configuration, una política de enrutamiento FAILOVER con los nombres de dominio de las domain configurations de IoT Core, y convertir la tabla DynamoDB en GLOBAL TABLE (replicación multi-Región). Así la ingesta IoT conmuta a la segunda Región ante fallo y los datos se almacenan/replican en ambas. Correcta.\n\nOpción D: Latency-based (no failover) + DynamoDB Streams + replicación custom es más frágil que domain configurations + failover + global table. Menos idónea.\n\nReferencias:\nhttps://docs.aws.amazon.com/iot/latest/developerguide/iot-custom-endpoints-configurable.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30185,
    "questionNumber": 185,
    "question": "A company uses AWS Organizations for a multi-account setup in the AWS Cloud. The company's finance team has a data processing application that uses AWS Lambda and Amazon DynamoDB. The company's marketing team wants to access the data that is stored in the DynamoDB table. The DynamoDB table contains confidential data. The marketing team can have access to only specific attributes of data in the DynamoDB table. The finance team and the marketing team have separate AWS accounts. What should a solutions architect do to provide the marketing team with the appropriate access to the DynamoDB table?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an SCP to grant the marketing team's AWS account access to the specific attributes of the DynamoDB table. Attach the SCP to the OU of the finance team.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an IAM role in the finance team's account by using IAM policy conditions for specific DynamoDB attributes (fine-grained access control). Establish trust with the marketing team's account. In the marketing team's account, create an IAM role that has permissions to assume the IAM role in the finance team's account.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a resource-based IAM policy that includes conditions for specific DynamoDB attributes (fine-grained access control). Attach the policy to the DynamoDB table. In the marketing team's account, create an IAM role that has permissions to access the DynamoDB table in the finance team's account.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an IAM role in the finance team's account to access the DynamoDB table. Use an IAM permissions boundary to limit the access to the specific attributes. In the marketing team's account, create an IAM role that has permissions to assume the IAM role in the finance team's account.",
        "isCorrect": false
      }
    ],
    "comments": "El equipo de marketing (otra cuenta) necesita acceso a ATRIBUTOS ESPECÍFICOS de una tabla DynamoDB confidencial de finanzas (fine-grained access control cross-account).\n\nOpción A: Un SCP restringe permisos máximos, NO concede acceso ni hace fine-grained a atributos de DynamoDB. Inválido.\n\nOpción B (Correcta): En la cuenta de finanzas, crear un IAM role con una política que use CONDICIONES de IAM para atributos específicos de DynamoDB (fine-grained access control con dynamodb:Attributes / condiciones), estableciendo confianza con la cuenta de marketing; en la cuenta de marketing, crear un rol que pueda ASUMIR el rol de finanzas. Así marketing asume el rol y solo ve los atributos permitidos. Es el patrón correcto de fine-grained access control cross-account en DynamoDB. Correcta.\n\nOpción C: DynamoDB NO soporta políticas RESOURCE-BASED adjuntas a la tabla de esa forma para fine-grained cross-account (el control de atributos se hace con políticas de identidad/rol con condiciones). Incorrecta.\n\nOpción D: Un permissions boundary limita el máximo, pero no implementa el fine-grained por atributos como las condiciones de IAM; B es el mecanismo correcto.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/specifying-conditions.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30186,
    "questionNumber": 186,
    "question": "A solutions architect is creating an application that stores objects in an Amazon S3 bucket. The solutions architect must deploy the application in two AWS Regions that will be used simultaneously. The objects in the two S3 buckets must remain synchronized with each other. Which combination of steps will meet these requirements with the LEAST operational overhead? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an S3 Multi-Region Access Point Change the application to refer to the Multi-Region Access Point",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure two-way S3 Cross-Region Replication (CRR) between the two S3 buckets",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Modify the application to store objects in each S3 bucket",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an S3 Lifecycle rule for each S3 bucket to copy objects from one S3 bucket to the other S3 bucket",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Enable S3 Versioning for each S3 bucket",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Configure an event notification for each S3 bucket to invoke an AWS Lambda function to copy objects from one S3 bucket to the other S3 bucket",
        "isCorrect": false
      }
    ],
    "comments": "Dos buckets S3 en dos Regiones usados simultáneamente que deben mantenerse sincronizados, con el MENOR overhead.\n\nOpción A (Correcta): Crear un S3 Multi-Region Access Point y hacer que la app lo referencie (un único punto de acceso global que enruta a la Región óptima; simplifica el acceso).\n\nOpción B (Correcta): Configurar S3 Cross-Region Replication BIDIRECCIONAL (two-way CRR) entre los dos buckets para mantenerlos sincronizados automáticamente en ambos sentidos (uso simultáneo).\n\nOpción C: Modificar la app para escribir en cada bucket es lógica a medida propensa a errores; la replicación (B) lo hace automáticamente. Descartada.\n\nOpción D: Lifecycle rules no copian objetos entre buckets de distinta Región. Inválido.\n\nOpción E (Correcta): Habilitar S3 Versioning en cada bucket (REQUISITO para que funcione CRR). A + B + E: MRAP para acceso, CRR bidireccional para sincronizar y versioning como prerrequisito. Menor overhead.\n\nOpción F: Event notifications + Lambda para copiar es código a mantener frente a CRR nativo. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiRegionAccessPoints.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30187,
    "questionNumber": 187,
    "question": "A company has an IoT platform that runs in an on-premises environment. The platform consists of a server that connects to IoT devices by using the MQTT protocol. The platform collects telemetry data from the devices at least once every 5 minutes. The platform also stores device metadata in a MongoDB cluster. An application that is installed on an on-premises machine runs periodic jobs to aggregate and transform the telemetry and device metadata. The application creates reports that users view by using another web application that runs on the same on-premises machine. The periodic jobs take 120-600 seconds to run. However, the web application is always running. The company is moving the platform to AWS and must reduce the operational overhead of the stack. Which combination of steps will meet these requirements with the LEAST operational overhead? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Lambda functions to connect to the IoT devices",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure the IoT devices to publish to AWS IoT Core",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Write the metadata to a self-managed MongoDB database on an Amazon EC2 instance",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Write the metadata to Amazon DocumentDB (with MongoDB compatibility)",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Use AWS Step Functions state machines with AWS Lambda tasks to prepare the reports and to write the reports to Amazon S3. Use Amazon CloudFront with an S3 origin to serve the reports",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Use an Amazon Elastic Kubernetes Service (Amazon EKS) cluster with Amazon EC2 instances to prepare the reports. Use an ingress controller in the EKS cluster to serve the reports",
        "isCorrect": false
      }
    ],
    "comments": "Migrar plataforma IoT (servidor MQTT, MongoDB, jobs periódicos de 120-600 s, web siempre activa) reduciendo el overhead operativo.\n\nOpción A: Lambdas para 'conectar a los dispositivos IoT' no es el patrón; los dispositivos publican a IoT Core (B). Además jobs de hasta 600 s > límite si se usara Lambda para todo.\n\nOpción B (Correcta): Configurar los dispositivos IoT para publicar a AWS IoT Core (broker MQTT gestionado, sin servidor que mantener).\n\nOpción C: MongoDB autogestionado en EC2 mantiene el overhead; se prefiere DocumentDB gestionado (D).\n\nOpción D (Correcta): Escribir la metadata en Amazon DocumentDB (compatible con MongoDB), gestionado, reemplazando el clúster MongoDB autogestionado.\n\nOpción E (Correcta): Usar AWS Step Functions con tareas Lambda para preparar los informes y escribirlos en S3, y servir los informes con CloudFront + origin S3. Step Functions orquesta los jobs (y las tareas Lambda o, si exceden 15 min, otros compute) de forma serverless; CloudFront+S3 sirve la web/reportes. B + D + E reduce el overhead (IoT Core + DocumentDB + serverless reporting).\n\nOpción F: EKS con EC2 para reportes añade gestión de clúster; más overhead que Step Functions + S3/CloudFront.\n\nReferencias:\nhttps://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html\nhttps://docs.aws.amazon.com/documentdb/latest/developerguide/what-is.html",
    "category": "Migración y Modernización",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30188,
    "questionNumber": 188,
    "question": "A global manufacturing company plans to migrate the majority of its applications to AWS. However, the company is concerned about applications that need to remain within a specific country or in the company's central on-premises data center because of data regulatory requirements or requirements for latency of single-digit milliseconds. The company also is concerned about the applications that it hosts in some of its factory sites, where limited network infrastructure exists. The company wants a consistent developer experience so that its developers can build applications once and deploy on premises, in the cloud, or in a hybrid architecture. The developers must be able to use the same tools, APIs, and services that are familiar to them. Which solution will provide a consistent hybrid experience to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate all applications to the closest AWS Region that is compliant. Set up an AWS Direct Connect connection between the central on-premises data center and AWS. Deploy a Direct Connect gateway.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Snowball Edge Storage Optimized devices for the applications that have data regulatory requirements or requirements for latency of single-digit milliseconds. Retain the devices on premises. Deploy AWS Wavelength to host the workloads in the factory sites.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Install AWS Outposts for the applications that have data regulatory requirements or requirements for latency of single-digit milliseconds. Use AWS Snowball Edge Compute Optimized devices to host the workloads in the factory sites.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Migrate the applications that have data regulatory requirements or requirements for latency of single-digit milliseconds to an AWS Local Zone. Deploy AWS Wavelength to host the workloads in the factory sites.",
        "isCorrect": false
      }
    ],
    "comments": "Experiencia híbrida CONSISTENTE (mismas herramientas/APIs/servicios AWS) para apps con requisitos de residencia de datos / latencia de un dígito de ms (on-prem) y para sitios de fábrica con red limitada.\n\nOpción A: Migrar todo a una Región + Direct Connect no cumple 'permanecer on-premises' por residencia/latencia; no da experiencia AWS on-prem.\n\nOpción B: Snowball Edge retenido on-prem no ofrece la experiencia AWS consistente y gestionada de Outposts; Wavelength es para 5G/edge de operadores, no para fábricas con red limitada.\n\nOpción C (Correcta): Instalar AWS Outposts para las apps con requisitos de residencia de datos/latencia de un dígito de ms (Outposts lleva la infraestructura y APIs de AWS al data center on-premises, misma experiencia/herramientas, baja latencia local) y usar AWS Snowball Edge Compute Optimized para las cargas de los sitios de fábrica con red limitada (cómputo en el edge desconectado). Da la experiencia híbrida consistente pedida. Correcta.\n\nOpción D: Local Zones son de AWS (no en el data center del cliente, no cumple residencia estricta on-prem) y Wavelength es para 5G, no fábricas. No encaja.\n\nReferencias:\nhttps://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html\nhttps://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30189,
    "questionNumber": 189,
    "question": "A company is updating an application that customers use to make online orders. The number of attacks on the application by bad actors has increased recently. The company will host the updated application on an Amazon Elastic Container Service (Amazon ECS) cluster. The company will use Amazon DynamoDB to store application data. A public Application Load Balancer (ALB) will provide end users with access to the application. The company must prevent attacks and ensure business continuity with minimal service interruptions during an ongoing attack. Which combination of steps will meet these requirements MOST cost-effectively? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon CloudFront distribution with the ALB as the origin. Add a custom header and random value on the CloudFront domain. Configure the ALB to conditionally forward traffic if the header and value match.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Deploy the application in two AWS Regions. Configure Amazon Route 53 to route to both Regions with equal weight.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure auto scaling for Amazon ECS tasks Create a DynamoDB Accelerator (DAX) cluster.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure Amazon ElastiCache to reduce overhead on DynamoDB.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Deploy an AWS WAF web ACL that includes an appropriate rule group. Associate the web ACL with the Amazon CloudFront distribution.",
        "isCorrect": true
      }
    ],
    "comments": "App en ECS con DynamoDB tras un ALB público; prevenir ataques y asegurar continuidad con mínima interrupción, de la forma MÁS rentable.\n\nOpción A (Correcta): Crear una distribución CloudFront con el ALB como origin, añadir una cabecera personalizada con un valor aleatorio en CloudFront y configurar el ALB para reenviar SOLO si la cabecera/valor coinciden. Así se obliga a que el tráfico pase por CloudFront (donde se aplica WAF) y se impide el acceso directo al ALB (bypass), reforzando la seguridad.\n\nOpción B: Desplegar en dos Regiones con Route 53 a ambas es caro (duplica infraestructura) y no es lo más rentable para 'prevenir ataques'.\n\nOpción C: Auto scaling de ECS + DAX mejora rendimiento, pero no PREVIENE los ataques. No cumple el objetivo principal.\n\nOpción D: ElastiCache reduce carga en DynamoDB, no previene ataques. No aplica.\n\nOpción E (Correcta): Desplegar un AWS WAF web ACL con el rule group apropiado y asociarlo a la distribución CloudFront. WAF filtra/bloquea los ataques en el edge. A + E (CloudFront con WAF + cabecera secreta que fuerza el paso por CloudFront) previene ataques de forma rentable y con mínima interrupción.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/restrict-access-to-load-balancer.html\nhttps://docs.aws.amazon.com/waf/latest/developerguide/web-acl.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30190,
    "questionNumber": 190,
    "question": "A company runs a web application on AWS. The web application delivers static content from an Amazon S3 bucket that is behind an Amazon CloudFront distribution. The application serves dynamic content by using an Application Load Balancer (ALB) that distributes requests to a fleet of Amazon EC2 instances in Auto Scaling groups. The application uses a domain name setup in Amazon Route 53. Some users reported occasional issues when the users attempted to access the website during peak hours. An operations team found that the ALB sometimes returned HTTP 503 Service Unavailable errors. The company wants to display a custom error message page when these errors occur. The page should be displayed immediately for this error code. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up a Route 53 failover routing policy. Configure a health check to determine the status of the ALB endpoint and to fail over to the failover S3 bucket endpoint.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a second CloudFront distribution and an S3 static website to host the custom error page. Set up a Route 53 failover routing policy. Use an active-passive configuration between the two distributions.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a CloudFront origin group that has two origins. Set the ALB endpoint as the primary origin. For the secondary origin, set an S3 bucket that is configured to host a static website Set up origin failover for the CloudFront distribution. Update the S3 static website to incorporate the custom error page.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create a CloudFront function that validates each HTTP response code that the ALB returns. Create an S3 static website in an S3 bucket. Upload the custom error page to the S3 bucket as a failover. Update the function to read the S3 bucket and to serve the error page to the end users.",
        "isCorrect": false
      }
    ],
    "comments": "Mostrar una página de error personalizada INMEDIATAMENTE cuando el ALB devuelve HTTP 503, con el MENOR overhead. CloudFront ya está delante del contenido estático.\n\nOpción A: Route 53 failover con health check reacciona con TTL/propagación DNS (no 'inmediato') y cambia el enrutamiento global; más lento/pesado.\n\nOpción B: Una segunda distribución CloudFront + failover activo-pasivo en Route 53 es más complejo y no sirve la página de error 'inmediatamente' para ese código.\n\nOpción C (Correcta): Crear un CloudFront ORIGIN GROUP con dos orígenes: el ALB como primario y un bucket S3 (sitio estático con la página de error) como secundario, y configurar origin failover. Cuando el origin primario (ALB) devuelve un error como 503, CloudFront hace failover al origin S3 y sirve la página personalizada de forma inmediata. Menor overhead y respuesta inmediata para ese código. Correcta.\n\nOpción D: Una CloudFront function que valida el código y lee S3 para servir la página es más desarrollo y las functions no leen S3 así; el origin failover (C) es el mecanismo nativo.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GeneratingCustomErrorResponses.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30191,
    "questionNumber": 191,
    "question": "A company is planning to migrate an application to AWS. The application runs as a Docker container and uses an NFS version 4 file share. A solutions architect must design a secure and scalable containerized solution that does not require provisioning or management of the underlying infrastructure. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy the application containers by using Amazon Elastic Container Service (Amazon ECS) with the Fargate launch type. Use Amazon Elastic File System (Amazon EFS) for shared storage. Reference the EFS file system ID, container mount point, and EFS authorization IAM role in the ECS task definition.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Deploy the application containers by using Amazon Elastic Container Service (Amazon ECS) with the Fargate launch type. Use Amazon FSx for Lustre for shared storage. Reference the FSx for Lustre file system ID, container mount point, and FSx for Lustre authorization IAM role in the ECS task definition.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy the application containers by using Amazon Elastic Container Service (Amazon ECS) with the Amazon EC2 launch type and auto scaling turned on. Use Amazon Elastic File System (Amazon EFS) for shared storage. Mount the EFS file system on the ECS container instances. Add the EFS authorization IAM role to the EC2 instance profile.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy the application containers by using Amazon Elastic Container Service (Amazon ECS) with the Amazon EC2 launch type and auto scaling turned on. Use Amazon Elastic Block Store (Amazon EBS) volumes with Multi-Attach enabled for shared storage. Attach the EBS volumes to ECS container instances. Add the EBS authorization IAM role to an EC2 instance profile.",
        "isCorrect": false
      }
    ],
    "comments": "Contenedor Docker que usa un NFSv4 file share; solución contenedorizada segura, escalable y SIN aprovisionar/gestionar la infraestructura subyacente.\n\nOpción A (Correcta): Desplegar los contenedores en Amazon ECS con launch type FARGATE (sin gestionar servidores) y usar Amazon EFS (NFS) para el almacenamiento compartido, referenciando el EFS file system ID, el mount point y el rol IAM de autorización de EFS en la task definition. Fargate no requiere gestionar infraestructura y EFS es el equivalente NFS compartido. Cumple todo. Correcta.\n\nOpción B: FSx for Lustre no es NFSv4 estándar para este caso (es para HPC) y el flujo de autorización no aplica igual; EFS es lo adecuado para NFS.\n\nOpción C: ECS con launch type EC2 obliga a gestionar las instancias del clúster (infraestructura subyacente), contradiciendo 'sin aprovisionar/gestionar infraestructura'.\n\nOpción D: EBS Multi-Attach no es un file share NFS compartido y tiene límites (misma AZ, sistema de ficheros en clúster); además EC2 launch type gestiona infraestructura. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/efs-volumes.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30192,
    "questionNumber": 192,
    "question": "A company is running an application in the AWS Cloud. The core business logic is running on a set of Amazon EC2 instances in an Auto Scaling group. An Application Load Balancer (ALB) distributes traffic to the EC2 instances. Amazon Route 53 record api.example.com is pointing to the ALB. The company's development team makes major updates to the business logic. The company has a rule that when changes are deployed, only 10% of customers can receive the new logic during a testing window. A customer must use the same version of the business logic during the testing window. How should the company deploy the updates to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a second ALB, and deploy the new logic to a set of EC2 instances in a new Auto Scaling group. Configure the ALB to distribute traffic to the EC2 instances. Update the Route 53 record to use weighted routing, and point the record to both of the ALBs.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a second target group that is referenced by the ALDeploy the new logic to EC2 instances in this new target group. Update the ALB listener rule to use weighted target groups. Configure ALB target group stickiness.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a new launch configuration for the Auto Scaling group. Specify the launch configuration to use the AutoScalingRollingUpdate policy, and set the MaxBatchSize option to 10. Replace the launch configuration on the Auto Scaling group. Deploy the changes.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a second Auto Scaling group that is referenced by the ALB. Deploy the new logic on a set of EC2 instances in this new Auto Scaling group. Change the ALB routing algorithm to least outstanding requests (LOR). Configure ALB session stickiness.",
        "isCorrect": false
      }
    ],
    "comments": "Desplegar cambios de forma que SOLO el 10% de clientes reciba la nueva lógica durante una ventana de pruebas, y que cada cliente use la MISMA versión durante la ventana (afinidad).\n\nOpción A: Un segundo ALB + Route 53 weighted reparte a nivel DNS, pero no garantiza afinidad de cliente a la misma versión durante la ventana (el DNS puede resolver distinto). Más pesado.\n\nOpción B (Correcta): Crear un segundo target group referenciado por el ALB, desplegar la nueva lógica en las EC2 de ese target group, actualizar la regla del listener del ALB para usar weighted target groups (10% al nuevo) y configurar target group STICKINESS. El peso envía ~10% al nuevo target group y la stickiness asegura que cada cliente permanezca en la misma versión durante la ventana. Es el mecanismo nativo del ALB para canary con afinidad. Correcta.\n\nOpción C: AutoScalingRollingUpdate con MaxBatchSize reemplaza instancias gradualmente (despliegue), no hace split de tráfico 10% con afinidad de cliente.\n\nOpción D: Cambiar el algoritmo a LOR + stickiness no controla el 10% de reparto entre versiones; los weighted target groups (B) sí.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-rules.html\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/application/sticky-sessions.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30193,
    "questionNumber": 193,
    "question": "A large education company recently introduced Amazon Workspaces to provide access to internal applications across multiple universities. The company is storing user profiles on an Amazon FSx for Windows File Server file system. The file system is configured with a DNS alias and is connected to a self-managed Active Directory. As more users begin to use the Workspaces, login time increases to unacceptable levels. An investigation reveals a degradation in performance of the file system. The company created the file system on HDD storage with a throughput of 16 MBps. A solutions architect must improve the performance of the file system during a defined maintenance window. What should the solutions architect do to meet these requirements with the LEAST administrative effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Backup to create a point-in-time backup of the file system. Restore the backup to a new FSx for Windows File Server file system. Select SSD as the storage type. Select 32 MBps as the throughput capacity. When the backup and restore process is completed, adjust the DNS alias accordingly. Delete the original file system.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Disconnect users from the file system. In the Amazon FSx console, update the throughput capacity to 32 MBps. Update the storage type to SSD. Reconnect users to the file system.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Deploy an AWS DataSync agent onto a new Amazon EC2 instance. Create a task. Configure the existing file system as the source location. Configure a new FSx for Windows File Server file system with SSD storage and 32 MBps of throughput as the target location. Schedule the task. When the task is completed, adjust the DNS alias accordingly. Delete the original file system.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Enable shadow copies on the existing file system by using a Windows PowerShell command. Schedule the shadow copy job to create a point-in-time backup of the file system. Choose to restore previous versions. Create a new FSx for Windows File Server file system with SSD storage and 32 MBps of throughput. When the copy job is completed, adjust the DNS alias. Delete the original file system.",
        "isCorrect": false
      }
    ],
    "comments": "FSx for Windows con 16 MBps HDD degradado; mejorar rendimiento durante una ventana de mantenimiento con el MENOR esfuerzo administrativo.\n\nOpción A: Backup + restaurar a un nuevo sistema con SSD/32 MBps y reajustar el DNS y borrar el original es un proceso largo y con más pasos administrativos.\n\nOpción B (Correcta): Desconectar a los usuarios, y en la consola de FSx ACTUALIZAR la throughput capacity a 32 MBps y el tipo de almacenamiento a SSD, y reconectar. FSx for Windows permite cambiar in-place la throughput y el tipo de almacenamiento (de HDD a SSD), lo que resuelve la degradación con el MENOR esfuerzo (sin migrar datos ni cambiar DNS). Correcta.\n\nOpción C: DataSync a un nuevo sistema + cambiar DNS + borrar el original es más trabajo que el cambio in-place.\n\nOpción D: Shadow copies son para versiones de ficheros/backup, no mejoran el rendimiento; y crea un sistema nuevo (más pasos). No aplica.\n\nReferencias:\nhttps://docs.aws.amazon.com/fsx/latest/WindowsGuide/managing-throughput-capacity.html\nhttps://docs.aws.amazon.com/fsx/latest/WindowsGuide/managing-storage-type.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30194,
    "questionNumber": 194,
    "question": "A company hosts an application on AWS. The application reads and writes objects that are stored in a single Amazon S3 bucket. The company must modify the application to deploy the application in two AWS Regions. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up an Amazon CloudFront distribution with the S3 bucket as an origin. Deploy the application to a second Region Modify the application to use the CloudFront distribution. Use AWS Global Accelerator to access the data in the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a new S3 bucket in a second Region. Set up bidirectional S3 Cross-Region Replication (CRR) between the original S3 bucket and the new S3 bucket. Configure an S3 Multi-Region Access Point that uses both S3 buckets. Deploy a modified application to both Regions.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a new S3 bucket in a second Region Deploy the application in the second Region. Configure the application to use the new S3 bucket. Set up S3 Cross-Region Replication (CRR) from the original S3 bucket to the new S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Set up an S3 gateway endpoint with the S3 bucket as an origin. Deploy the application to a second Region. Modify the application to use the new S3 gateway endpoint. Use S3 Intelligent-Tiering on the S3 bucket.",
        "isCorrect": false
      }
    ],
    "comments": "Una app que lee/escribe un único bucket S3 debe desplegarse en DOS Regiones, con el MENOR overhead.\n\nOpción A: CloudFront + Global Accelerator para 'acceder a los datos del bucket' no es el patrón para lecturas/escrituras de la app en dos Regiones; mezcla servicios de entrega con acceso de datos.\n\nOpción B (Correcta): Crear un nuevo bucket en la segunda Región, configurar S3 Cross-Region Replication BIDIRECCIONAL entre ambos, configurar un S3 Multi-Region Access Point que use ambos buckets y desplegar la app modificada en ambas Regiones. El MRAP da un único endpoint que enruta a la Región óptima y la CRR bidireccional mantiene ambos buckets sincronizados para lecturas/escrituras desde ambas Regiones. Menor overhead. Correcta.\n\nOpción C: CRR de una sola dirección (original -> nuevo) no sincroniza las escrituras de la segunda Región de vuelta; no soporta uso simultáneo de lectura/escritura en ambas. Insuficiente.\n\nOpción D: Un gateway endpoint es para acceso privado dentro de una VPC/Región, no replica datos a otra Región. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiRegionAccessPoints.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30195,
    "questionNumber": 195,
    "question": "An online gaming company needs to rehost its gaming platform on AWS. The company's gaming application requires high performance computing (HPC) processing and has a leaderboard that changes frequently. An Ubuntu instance that is optimized for compute generation hosts a Node.js application for game display. Game state is tracked in an on-premises Redis instance. The company needs a migration strategy that optimizes application performance. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Auto Scaling group of m5.large Amazon EC2 Spot Instances behind an Application Load Balancer. Use an Amazon ElastlCache for Redis cluster to maintain the leaderboard.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Auto Scaling group of c5.large Amazon EC2 Spot Instances behind an Application Load Balancer. Use an Amazon OpenSearch Service cluster to maintain the leaderboard.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Auto Scaling group of c5.large Amazon EC2 On-Demand Instances behind an Application Load Balancer. Use an Amazon ElastiCache for Redis cluster to maintain the leaderboard.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an Auto Scaling group of m5.large Amazon EC2 On-Demand Instances behind an Application Load Balancer. Use an Amazon DynamoDB table to maintain the leaderboard.",
        "isCorrect": false
      }
    ],
    "comments": "Rehost de plataforma de gaming: necesita HPC (cómputo), leaderboard que cambia con frecuencia, hoy Node.js en Ubuntu optimizado para cómputo y estado en Redis on-prem. Optimizar rendimiento.\n\nOpción A: m5.large es general purpose (no compute-optimized) y Spot puede interrumpir un juego; ElastiCache Redis para el leaderboard es correcto, pero la familia y Spot no optimizan el rendimiento/estabilidad.\n\nOpción B: c5.large (compute-optimized, bien) pero OpenSearch no es el almacén idóneo para un leaderboard de alta frecuencia (Redis lo es); y Spot arriesga interrupciones.\n\nOpción C (Correcta): Auto Scaling de instancias c5.large (compute-optimized, para HPC/Node.js) On-Demand (estables, sin interrupciones de Spot) detrás de un ALB, y Amazon ElastiCache for Redis para el leaderboard (baja latencia, ideal para un marcador que cambia constantemente, y equivalente gestionado del Redis on-prem). Optimiza rendimiento y mantiene la estructura. Correcta.\n\nOpción D: m5.large (general purpose, no compute-optimized) y DynamoDB para el leaderboard es más lento que Redis para actualizaciones muy frecuentes; menos óptimo.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/compute-optimized-instances.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30196,
    "questionNumber": 196,
    "question": "A solutions architect is designing an application to accept timesheet entries from employees on their mobile devices. Timesheets will be submitted weekly, with most of the submissions occurring on Friday. The data must be stored in a format that allows payroll administrators to run monthly reports. The infrastructure must be highly available and scale to match the rate of incoming data and reporting requests. Which combination of steps meets these requirements while minimizing operational overhead? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy the application to Amazon EC2 On-Demand Instances with load balancing across multiple Availability Zones. Use scheduled Amazon EC2 Auto Scaling to add capacity before the high volume of submissions on Fridays.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy the application in a container using Amazon Elastic Container Service (Amazon ECS) with load balancing across multiple Availability Zones. Use scheduled Service Auto Scaling to add capacity before the high volume of submissions on Fridays.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy the application front end to an Amazon S3 bucket served by Amazon CloudFront. Deploy the application backend using Amazon API Gateway with an AWS Lambda proxy integration.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Store the timesheet submission data in Amazon Redshift. Use Amazon QuickSight to generate the reports using Amazon Redshift as the data source.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Store the timesheet submission data in Amazon S3. Use Amazon Athena and Amazon QuickSight to generate the reports using Amazon S3 as the data source.",
        "isCorrect": true
      }
    ],
    "comments": "Entradas de fichajes desde móviles (pico los viernes), almacenar en formato que permita informes mensuales, HA y escalado automático, minimizando overhead.\n\nOpción A/B: EC2/ECS con scheduled scaling mantiene infraestructura y capacidad que gestionar; más overhead que serverless para picos.\n\nOpción C (Correcta): Front-end en un bucket S3 servido por CloudFront y backend con API Gateway + Lambda (proxy integration). Totalmente serverless: escala solo con la tasa de envíos (picos del viernes) y es HA sin gestionar servidores. Mínimo overhead.\n\nOpción D: Redshift para almacenar los fichajes es un data warehouse pesado/caro para este caso; y no minimiza overhead.\n\nOpción E (Correcta): Almacenar los fichajes en Amazon S3 y usar Amazon Athena + QuickSight para los informes mensuales (consulta serverless sobre S3, sin infraestructura). C + E: ingesta serverless + almacenamiento/consulta serverless. Mínimo overhead, HA y escalable.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html\nhttps://docs.aws.amazon.com/athena/latest/ug/what-is.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30197,
    "questionNumber": 197,
    "question": "A company is storing sensitive data in an Amazon S3 bucket. The company must log all activities for objects in the S3 bucket and must keep the logs for 5 years. The company's security team also must receive an email notification every time there is an attempt to delete data in the S3 bucket. Which combination of steps will meet these requirements MOST cost-effectively? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Configure AWS CloudTrail to log S3 data events.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure S3 server access logging for the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure Amazon S3 to send object deletion events to Amazon Simple Email Service (Amazon SES).",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure Amazon S3 to send object deletion events to an Amazon EventBridge event bus that publishes to an Amazon Simple Notification Service (Amazon SNS) topic.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Configure Amazon S3 to send the logs to Amazon Timestream with data storage tiering.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Configure a new S3 bucket to store the logs with an S3 Lifecycle policy.",
        "isCorrect": true
      }
    ],
    "comments": "Registrar TODA la actividad sobre objetos de un bucket S3, guardar los logs 5 años, y notificar por email cada intento de borrado, de la forma MÁS rentable.\n\nOpción A (Correcta): Configurar AWS CloudTrail para registrar S3 DATA EVENTS (actividad a nivel de objeto: get/put/delete). Es el registro de actividad de objetos requerido.\n\nOpción B: S3 server access logging es una alternativa de logging, pero para 'todas las actividades de objetos' con integración a eventos, CloudTrail data events (A) es lo elegido; B no es necesario aquí.\n\nOpción C: S3 no envía eventos directamente a SES; no es un target válido de S3 event notifications. Incorrecta.\n\nOpción D (Correcta): Configurar S3 para enviar eventos de borrado de objetos a un bus de EventBridge que publica en un topic SNS (con el email del equipo de seguridad suscrito). Así llega la notificación por email en cada intento de borrado.\n\nOpción E: Timestream es para series temporales, no para almacenar logs de CloudTrail. Incorrecta.\n\nOpción F (Correcta): Configurar un bucket S3 nuevo para almacenar los logs con una S3 Lifecycle policy (retención 5 años de forma barata, p. ej. transición a clases de archivo). A + D + F cubre logging de actividad, notificación de borrados y retención económica.\n\nReferencias:\nhttps://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/EventBridge.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30198,
    "questionNumber": 198,
    "question": "A company is building a hybrid environment that includes servers in an on-premises data center and in the AWS Cloud. The company has deployed Amazon EC2 instances in three VPCs. Each VPC is in a different AWS Region. The company has established an AWS Direct. Connect connection to the data center from the Region that is closest to the data center. The company needs the servers in the on-premises data center to have access to the EC2 instances in all three VPCs. The servers in the on-premises data center also must have access to AWS public services. Which combination of steps will meet these requirements with the LEAST cost? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a Direct Connect gateway in the Region that is closest to the data center. Attach the Direct Connect connection to the Direct Connect gateway. Use the Direct Connect gateway to connect the VPCs in the other two Regions.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Set up additional Direct Connect connections from the on-premises data center to the other two Regions.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a private VIF. Establish an AWS Site-to-Site VPN connection over the private VIF to the VPCs in the other two Regions.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a public VIF. Establish an AWS Site-to-Site VPN connection over the public VIF to the VPCs in the other two Regions.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Use VPC peering to establish a connection between the VPCs across the Regions Create a private VIF with the existing Direct Connect connection to connect to the peered VPCs.",
        "isCorrect": false
      }
    ],
    "comments": "On-prem con Direct Connect a la Región más cercana; los servidores on-prem necesitan acceso a EC2 en TRES VPC (en tres Regiones) y a servicios públicos de AWS, con el MENOR coste.\n\nOpción A (Correcta): Crear un Direct Connect gateway en la Región más cercana, adjuntar la conexión DX al DX gateway y usar el DX gateway para conectar las VPC de las otras dos Regiones. Un DX gateway permite alcanzar VPC en múltiples Regiones desde una sola conexión DX (sin pagar conexiones DX adicionales): menor coste para el acceso a las tres VPC.\n\nOpción B: Conexiones DX adicionales a las otras dos Regiones es caro (múltiples circuitos). No es de menor coste.\n\nOpción C: Una PRIVATE VIF no da acceso a SERVICIOS PÚBLICOS de AWS; para los servicios públicos se necesita una PUBLIC VIF.\n\nOpción D (Correcta): Crear una PUBLIC VIF y establecer conectividad para acceder a los servicios públicos de AWS (y, según el diseño, VPN sobre la public VIF). La public VIF cubre el requisito de 'acceso a servicios públicos de AWS'. A + D: DX gateway para las tres VPC (privado) y public VIF para servicios públicos, con el menor coste.\n\nOpción E: VPC peering entre Regiones + private VIF a los peered VPCs no funciona (el peering no es transitivo por la private VIF); no da acceso a las tres VPC de esa forma.\n\nReferencias:\nhttps://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways.html\nhttps://docs.aws.amazon.com/directconnect/latest/UserGuide/WorkingWithVirtualInterfaces.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30199,
    "questionNumber": 199,
    "question": "A company is using an organization in AWS Organizations to manage hundreds of AWS accounts. A solutions architect is working on a solution to provide baseline protection for the Open Web Application Security Project (OWASP) top 10 web application vulnerabilities. The solutions architect is using AWS WAF for all existing and new Amazon CloudFront distributions that are deployed within the organization. Which combination of steps should the solutions architect take to provide the baseline protection? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Enable AWS Config in all accounts",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Enable Amazon GuardDuty in all accounts",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Enable all features for the organization",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use AWS Firewall Manager to deploy AWS WAF rules in all accounts for all CloudFront distributions",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Use AWS Shield Advanced to deploy AWS WAF rules in all accounts for all CloudFront distributions",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Use AWS Security Hub to deploy AWS WAF rules in all accounts for all CloudFront distributions",
        "isCorrect": false
      }
    ],
    "comments": "Protección baseline OWASP Top 10 con AWS WAF para todas las distribuciones CloudFront (actuales y nuevas) en toda la organización (cientos de cuentas).\n\nNota: la respuesta verificada incluye A, C y D. C (habilitar all features de Organizations) y D (Firewall Manager) son imprescindibles; A (habilitar AWS Config) es prerrequisito de Firewall Manager (FMS requiere AWS Config habilitado en las cuentas para evaluar recursos).\n\nOpción A (Correcta): Habilitar AWS Config en todas las cuentas. Firewall Manager depende de AWS Config para descubrir/evaluar recursos y aplicar/remediar las reglas de WAF. Prerrequisito.\n\nOpción B: GuardDuty detecta amenazas, no despliega reglas de WAF OWASP. No aporta al baseline de WAF.\n\nOpción C (Correcta): Habilitar TODAS las features de la organización (requisito para usar Firewall Manager y políticas a nivel organización).\n\nOpción D (Correcta): Usar AWS Firewall Manager para desplegar las reglas de AWS WAF en todas las cuentas y en todas las distribuciones CloudFront (actuales y futuras) de forma centralizada. A + C + D.\n\nOpción E: Shield Advanced es DDoS, no despliega reglas WAF OWASP a escala.\n\nOpción F: Security Hub agrega hallazgos, no despliega reglas de WAF. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html\nhttps://docs.aws.amazon.com/waf/latest/developerguide/fms-prereq.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30200,
    "questionNumber": 200,
    "question": "A solutions architect has implemented a SAML 2.0 federated identity solution with their company's on-premises identity provider (IdP) to authenticate users' access to the AWS environment. When the solutions architect tests authentication through the federated identity web portal, access to the AWS environment is granted. However, when test users attempt to authenticate through the federated identity web portal, they are not able to access the AWS environment. Which items should the solutions architect check to ensure identity federation is properly configured? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "The IAM user's permissions policy has allowed the use of SAML federation for that user.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "The IAM roles created for the federated users' or federated groups' trust policy have set the SAML provider as the principal. B. Test users are not in the AWSFederatedUsers group in the company's IdP.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "The web portal calls the AWS STS AssumeRoleWithSAML API with the ARN of the SAML provider, the ARN of the IAM role, and the SAML assertion from IdP.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "The on-premises IdP's DNS hostname is reachable from the AWS environment VPCs.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "The company's IdP defines SAML assertions that properly map users or groups. In the company to IAM roles with appropriate permissions.",
        "isCorrect": true
      }
    ],
    "comments": "Federación SAML 2.0 con IdP on-prem: el portal funciona para el arquitecto pero los usuarios de prueba no acceden. Qué comprobar para que la federación esté bien configurada.\n\nOpción A: 'La política del IAM USER permite SAML federation para ese usuario' no aplica: en federación SAML no hay usuarios IAM por persona; se asumen roles. No es un ítem correcto.\n\nOpción B (Correcta): Los roles IAM creados para los usuarios/grupos federados deben tener en su TRUST POLICY al proveedor SAML como principal (para permitir AssumeRoleWithSAML). Si el trust no confía en el SAML provider, la asunción falla.\n\nOpción C (Correcta): El portal web debe llamar a la API de STS AssumeRoleWithSAML con el ARN del SAML provider, el ARN del rol IAM y la SAML assertion del IdP. Si esto no está bien, no se obtienen credenciales.\n\nOpción D: Que el hostname DNS del IdP sea alcanzable desde las VPC no es relevante para SAML (el navegador del usuario habla con el IdP y con AWS; AWS no necesita alcanzar el IdP por DNS interno). No es el problema.\n\nOpción E (Correcta): El IdP debe definir SAML assertions que mapeen correctamente usuarios/grupos a los roles IAM con los permisos adecuados. Si el mapeo de los usuarios de prueba a roles no está, no acceden. B + C + E son los ítems a verificar.\n\nReferencias:\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html\nhttps://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRoleWithSAML.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30201,
    "questionNumber": 201,
    "question": "A solutions architect needs to improve an application that is hosted in the AWS Cloud. The application uses an Amazon Aurora MySQL DB instance that is experiencing overloaded connections. Most of the application’s operations insert records into the database. The application currently stores credentials in a text-based configuration file. The solutions architect needs to implement a solution so that the application can handle the current connection load. The solution must keep the credentials secure and must provide the ability to rotate the credentials automatically on a regular basis. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy an Amazon RDS Proxy layer. In front of the DB instance. Store the connection credentials as a secret in AWS Secrets Manager.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Deploy an Amazon RDS Proxy layer in front of the DB instance. Store the connection credentials in AWS Systems Manager Parameter Store",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Aurora Replica. Store the connection credentials as a secret in AWS Secrets Manager",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Aurora Replica. Store the connection credentials in AWS Systems Manager Parameter Store.",
        "isCorrect": false
      }
    ],
    "comments": "Aurora MySQL con conexiones sobrecargadas (muchas inserciones), credenciales en un fichero de texto; hay que manejar la carga de conexiones y mantener las credenciales seguras con rotación automática.\n\nOpción A (Correcta): Desplegar una capa de Amazon RDS Proxy delante de la instancia (pool de conexiones que absorbe la sobrecarga de conexiones) y almacenar las credenciales como secreto en AWS Secrets Manager (seguras y con rotación automática programable). RDS Proxy resuelve la sobrecarga de conexiones y Secrets Manager la seguridad+rotación. Correcta.\n\nOpción B: RDS Proxy es correcto para conexiones, pero Parameter Store no ofrece rotación automática de credenciales de BD como Secrets Manager. Inferior a A.\n\nOpción C: Una Aurora Replica escala LECTURAS, pero la carga es de INSERCIONES (escrituras) y el problema es el número de conexiones; una réplica no resuelve la sobrecarga de conexiones al writer.\n\nOpción D: Igual que C (réplica no ayuda a las escrituras/conexiones) y Parameter Store sin rotación nativa.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy.html\nhttps://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30202,
    "questionNumber": 202,
    "question": "A company needs to build a disaster recovery (DR) solution for its ecommerce website. The web application is hosted on a fleet of t3.large Amazon EC2 instances and uses an Amazon RDS for MySQL DB instance. The EC2 instances are in an Auto Scaling group that extends across multiple Availability Zones. In the event of a disaster, the web application must fail over to the secondary environment with an RPO of 30 seconds and an RTO of 10 minutes. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Use infrastructure as code (IaC) to provision the new infrastructure in the DR Region. Create a cross-Region read replica for the DB instance. Set up a backup plan in AWS Backup to create cross-Region backups for the EC2 instances and the DB instance. Create a cron expression to back up the EC2 instances and the DB instance every 30 seconds to the DR Region. Recover the EC2 instances from the latest EC2 backup. Use an Amazon Route 53 geolocation routing policy to automatically fail over to the DR Region in the event of a disaster.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use infrastructure as code (IaC) to provision the new infrastructure in the DR Region. Create a cross-Region read replica for the DB instance. Set up AWS Elastic Disaster Recovery to continuously replicate the EC2 instances to the DR Region. Run the EC2 instances at the minimum capacity in the DR Region. Use an Amazon Route 53 failover routing policy to automatically fail over to the DR Region in the event of a disaster. Increase the desired capacity of the Auto Scaling group.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Set up a backup plan in AWS Backup to create cross-Region backups for the EC2 instances and the DB instance. Create a cron expression to back up the EC2 instances and the DB instance every 30 seconds to the DR Region. Use infrastructure as code (IaC) to provision the new infrastructure in the DR Region. Manually restore the backed-up data on new instances. Use an Amazon Route 53 simple routing policy to automatically fail over to the DR Region in the event of a disaster.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use infrastructure as code (IaC) to provision the new infrastructure in the DR Region. Create an Amazon Aurora global database. Set up AWS Elastic Disaster Recovery to continuously replicate the EC2 instances to the DR Region. Run the Auto Scaling group of EC2 instances at full capacity in the DR Region. Use an Amazon Route 53 failover routing policy to automatically fail over to the DR Region in the event of a disaster.",
        "isCorrect": false
      }
    ],
    "comments": "DR con RPO 30 s y RTO 10 min para web en EC2/ASG multi-AZ + RDS MySQL, de la forma MÁS rentable.\n\nOpción A: Backups cada 30 s con AWS Backup no es viable (los backups no se hacen cada 30 s) y geolocation no es failover; no cumple RPO/RTO.\n\nOpción B (Correcta): IaC para provisionar en la Región DR, una cross-Region read replica de RDS (RPO bajo, promovible), AWS Elastic Disaster Recovery (DRS) replicando continuamente las EC2 a la Región DR (RPO de segundos), corriendo las EC2 al mínimo (pilot light, económico) y una política de FAILOVER de Route 53 que conmuta automáticamente, aumentando el desired capacity del ASG en el failover. Cumple RPO 30 s / RTO 10 min de forma rentable (capacidad mínima en DR). Correcta.\n\nOpción C: Restaurar manualmente y simple routing no cumple el RTO de 10 min ni el failover automático.\n\nOpción D: Aurora global database + ASG a plena capacidad en DR cumple RPO/RTO pero es MÁS caro (full capacity siempre); B es más rentable con capacidad mínima.\n\nReferencias:\nhttps://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30203,
    "questionNumber": 203,
    "question": "A company is planning a one-time migration of an on-premises MySQL database to Amazon Aurora MySQL in the us-east-1 Region. The company's current internet connection has limited bandwidth. The on-premises MySQL database is 60 TB in size. The company estimates that it will take a month to transfer the data to AWS over the current internet connection. The company needs a migration solution that will migrate the database more quickly. Which solution will migrate the database in the LEAST amount of time?",
    "choices": [
      {
        "letter": "A",
        "text": "Request a 1 Gbps AWS Direct Connect connection between the on-premises data center and AWS. Use AWS Database Migration Service (AWS DMS) to migrate the on-premises MySQL database to Aurora MySQL.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS DataSync with the current internet connection to accelerate the data transfer between the on-premises data center and AWS. Use AWS Application Migration Service to migrate the on-premises MySQL database to Aurora MySQL.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Order an AWS Snowball Edge device. Load the data into an Amazon S3 bucket by using the S3 interface. Use AWS Database Migration Service (AWS DMS) to migrate the data from Amazon S3 to Aurora MySQL.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Order an AWS Snowball device. Load the data into an Amazon S3 bucket by using the S3 Adapter for Snowball. Use AWS Application Migration Service to migrate the data from Amazon S3 to Aurora MySQL.",
        "isCorrect": false
      }
    ],
    "comments": "Migración única de MySQL on-prem de 60 TB a Aurora MySQL con ancho de banda limitado (un mes por Internet). Migrar en el MENOR tiempo.\n\nOpción A: Un DX de 1 Gbps tarda semanas en aprovisionarse y 60 TB por 1 Gbps sigue siendo lento; no es el menor tiempo para un traslado único.\n\nOpción B: DataSync por la conexión actual (limitada) sigue limitado por el ancho de banda; no acelera 60 TB en poco tiempo. Además Application Migration Service no migra bases de datos heterogéneas a Aurora de esa forma.\n\nOpción C (Correcta): Pedir un AWS Snowball Edge, cargar los datos en un bucket S3 mediante la interfaz S3 y usar AWS DMS para migrar de S3 a Aurora MySQL. Snowball transfiere los 60 TB físicamente (sin depender del enlace limitado) y DMS carga a Aurora: el menor tiempo total. Correcta.\n\nOpción D: 'AWS Snowball device' (no Edge) con S3 Adapter y Application Migration Service para migrar de S3 a Aurora no es el flujo correcto (Application Migration Service es para servidores, no BD); DMS (C) es lo indicado.\n\nReferencias:\nhttps://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html\nhttps://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.S3.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30204,
    "questionNumber": 204,
    "question": "A company has an application in the AWS Cloud. The application runs on a fleet of 20 Amazon EC2 instances. The EC2 instances are persistent and store data on multiple attached Amazon Elastic Block Store (Amazon EBS) volumes. The company must maintain backups in a separate AWS Region. The company must be able to recover the EC2 instances and their configuration within 1 business day, with loss of no more than 1 day's worth of data. The company has limited staff and needs a backup solution that optimizes operational efficiency and cost. The company already has created an AWS CloudFormation template that can deploy the required network configuration in a secondary Region. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a second CloudFormation template that can recreate the EC2 instances in the secondary Region. Run daily multivolume snapshots by using AWS Systems Manager Automation runbooks. Copy the snapshots to the secondary Region. In the event of a failure launch the CloudFormation templates, restore the EBS volumes from snapshots, and transfer usage to the secondary Region.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon Data Lifecycle Manager (Amazon DLM) to create daily multivolume snapshots of the EBS volumes. In the event of a failure, launch the CloudFormation template and use Amazon DLM to restore the EBS volumes and transfer usage to the secondary Region.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Backup to create a scheduled daily backup plan for the EC2 instances. Configure the backup task to copy the backups to a vault in the secondary Region. In the event of a failure, launch the CloudFormation template, restore the instance volumes and configurations from the backup vault, and transfer usage to the secondary Region.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Deploy EC2 instances of the same size and configuration to the secondary Region. Configure AWS DataSync daily to copy data from the primary Region to the secondary Region. In the event of a failure, launch the CloudFormation template and transfer usage to the secondary Region.",
        "isCorrect": false
      }
    ],
    "comments": "Backups de 20 EC2 (con múltiples EBS) en otra Región, RTO 1 día laborable, RPO 1 día, con eficiencia operativa/coste y personal limitado. Ya hay una plantilla CloudFormation de red en la Región secundaria.\n\nOpción A: Snapshots multivolumen con SSM Automation runbooks es funcional pero implica scripts/runbooks a mantener; más operación que AWS Backup gestionado.\n\nOpción B: Amazon DLM hace snapshots de EBS, pero 'restaurar con DLM' no es su función (DLM crea/gestiona snapshots, no orquesta la restauración de instancias completas); menos idóneo para recuperar EC2 y su configuración.\n\nOpción C (Correcta): Usar AWS Backup con un plan diario para las EC2 (respalda la instancia y sus EBS/configuración), copiando los backups a un vault en la Región secundaria; ante fallo, lanzar la plantilla CloudFormation, restaurar volúmenes/configuración desde el vault y trasladar el uso. AWS Backup es gestionado, centralizado y de baja operación, cumpliendo RTO/RPO de 1 día. Óptimo para personal limitado. Correcta.\n\nOpción D: EC2 duplicadas siempre encendidas en la secundaria + DataSync es más caro (capacidad ociosa) y DataSync copia datos, no la configuración de instancias completas.\n\nReferencias:\nhttps://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html\nhttps://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30205,
    "questionNumber": 205,
    "question": "A company is designing a new website that hosts static content. The website will give users the ability to upload and download large files. According to company requirements, all data must be encrypted in transit and at rest. A solutions architect is building the solution by using Amazon S3 and Amazon CloudFront. Which combination of steps will meet the encryption requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Turn on S3 server-side encryption for the S3 bucket that the web application uses.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Add a policy attribute of \"aws:SecureTransport\": \"true\" for read and write operations in the S3 ACLs.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a bucket policy that denies any unencrypted operations in the S3 bucket that the web application uses.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure encryption at rest on CloudFront by using server-side encryption with AWS KMS keys (SSE-KMS).",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Configure redirection of HTTP requests to HTTPS requests in CloudFront.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Use the RequireSSL option in the creation of presigned URLs for the S3 bucket that the web application uses.",
        "isCorrect": false
      }
    ],
    "comments": "Cifrado en tránsito y en reposo para un sitio estático con S3 + CloudFront (subida/descarga de ficheros grandes).\n\nOpción A (Correcta): Activar server-side encryption en el bucket S3 (cifrado EN REPOSO de los objetos).\n\nOpción B: 'aws:SecureTransport' se usa en POLÍTICAS de bucket (bucket policy), no en ACLs; además la opción correcta para forzar HTTPS es una bucket policy (C). Incorrecta como está redactada.\n\nOpción C (Correcta): Crear una bucket policy que DENIEGUE cualquier operación no cifrada (p. ej. denegar si aws:SecureTransport es false), forzando conexiones cifradas (EN TRÁNSITO) al bucket.\n\nOpción D: CloudFront no configura 'encryption at rest con SSE-KMS'; el at-rest lo da S3 (A). Incorrecta.\n\nOpción E (Correcta): Configurar en CloudFront la redirección de HTTP a HTTPS (Viewer Protocol Policy), garantizando cifrado en tránsito hacia los usuarios. A + C + E cubre reposo (S3 SSE), tránsito al bucket (bucket policy) y tránsito al usuario (CloudFront HTTPS).\n\nOpción F: 'RequireSSL en la creación de presigned URLs' no es una opción real; no aplica.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30206,
    "questionNumber": 206,
    "question": "A company is implementing a serverless architecture by using AWS Lambda functions that need to access a Microsoft SQL Server DB instance on Amazon RDS. The company has separate environments for development and production, including a clone of the database system. The company's developers are allowed to access the credentials for the development database. However, the credentials for the production database must be encrypted with a key that only members of the IT security team's IAM user group can access. This key must be rotated on a regular basis. What should a solutions architect do in the production environment to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Store the database credentials in AWS Systems Manager Parameter Store by using a SecureString parameter that is encrypted by an AWS Key Management Service (AWS KMS) customer managed key. Attach a role to each Lambda function to provide access to the SecureString parameter. Restrict access to the SecureString parameter and the customer managed key so that only the IT security team can access the parameter and the key.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Encrypt the database credentials by using the AWS Key Management Service (AWS KMS) default Lambda key. Store the credentials in the environment variables of each Lambda function. Load the credentials from the environment variables in the Lambda code. Restrict access to the KMS key so that only the IT security team can access the key.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Store the database credentials in the environment variables of each Lambda function. Encrypt the environment variables by using an AWS Key Management Service (AWS KMS) customer managed key. Restrict access to the customer managed key so that only the IT security team can access the key.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Store the database credentials in AWS Secrets Manager as a secret that is associated with an AWS Key Management Service (AWS KMS) customer managed key. Attach a role to each Lambda function to provide access to the secret. Restrict access to the secret and the customer managed key so that only the IT security team can access the secret and the key.",
        "isCorrect": true
      }
    ],
    "comments": "Credenciales de la BD de PRODUCCIÓN cifradas con una clave que solo el grupo de IAM de seguridad puede usar, con rotación regular; las Lambda deben acceder.\n\nOpción A: Parameter Store SecureString con CMK funciona para almacenar/cifrar, pero NO ofrece rotación automática de credenciales de BD como Secrets Manager (la rotación en Parameter Store no es nativa). Por eso D es superior.\n\nOpción B: Cifrar con la default KMS key de Lambda y guardar en variables de entorno no permite restringir la clave solo al equipo de seguridad de forma efectiva ni rota credenciales. Descartada.\n\nOpción C: Variables de entorno cifradas con CMK no rotan las credenciales de BD; y exponer credenciales en env vars es peor práctica. No cumple rotación.\n\nOpción D (Correcta): Almacenar las credenciales en AWS Secrets Manager asociadas a una CMK de KMS, adjuntar un rol a cada Lambda para acceder al secreto, y restringir el acceso al secreto y a la CMK de modo que solo el equipo de IT security pueda accederlos. Secrets Manager da rotación automática nativa y control de acceso al secreto y a la clave. Cumple todo. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html\nhttps://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30207,
    "questionNumber": 207,
    "question": "An online retail company is migrating its legacy on-premises .NET application to AWS. The application runs on load-balanced frontend web servers, load-balanced application servers, and a Microsoft SQL Server database. The company wants to use AWS managed services where possible and does not want to rewrite the application. A solutions architect needs to implement a solution to resolve scaling issues and minimize licensing costs as the application scales. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer for the web tier and for the application tier. Use Amazon Aurora PostgreSQL with Babelfish turned on to replatform the SQL Server database.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create images of all the servers by using AWS Database Migration Service (AWS DMS). Deploy Amazon EC2 instances that are based on the on-premises imports. Deploy the instances in an Auto Scaling group behind a Network Load Balancer for the web tier and for the application tier. Use Amazon DynamoDB as the database tier.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Containerize the web frontend tier and the application tier. Provision an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. Create an Auto Scaling group behind a Network Load Balancer for the web tier and for the application tier. Use Amazon RDS for SQL Server to host the database.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Separate the application functions into AWS Lambda functions. Use Amazon API Gateway for the web frontend tier and the application tier. Migrate the data to Amazon S3. Use Amazon Athena to query the data.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar .NET (web + app + SQL Server) usando servicios gestionados, sin reescribir la app, resolviendo escalado y minimizando COSTES DE LICENCIA al escalar.\n\nOpción A (Correcta): EC2 en Auto Scaling detrás de un ALB para web y app (resuelve el escalado sin reescribir la app .NET), y Amazon Aurora PostgreSQL con Babelfish activado para replataformar la base SQL Server. Babelfish permite que Aurora PostgreSQL entienda el protocolo/T-SQL de SQL Server, ELIMINANDO las licencias caras de SQL Server (minimiza coste de licencia al escalar) sin reescribir la app. Es la opción más rentable en licencias. Correcta.\n\nOpción B: DMS no crea 'imágenes de servidores'; y DynamoDB no es un reemplazo de SQL Server relacional sin reescribir. Incorrecta.\n\nOpción C: RDS for SQL Server mantiene las LICENCIAS de SQL Server (coste que crece al escalar), justo lo que se quiere minimizar; y EKS añade complejidad. No minimiza licencias.\n\nOpción D: Reescribir a Lambda/Athena contradice 'no reescribir la aplicación'. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/babelfish.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30208,
    "questionNumber": 208,
    "question": "A software-as-a-service (SaaS) provider exposes APIs through an Application Load Balancer (ALB). The ALB connects to an Amazon Elastic Kubernetes Service (Amazon EKS) cluster that is deployed in the us-east-1 Region. The exposed APIs contain usage of a few non-standard REST methods: LINK, UNLINK, LOCK, and UNLOCK. Users outside the United States are reporting long and inconsistent response times for these APIs. A solutions architect needs to resolve this problem with a solution that minimizes operational overhead. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Add an Amazon CloudFront distribution. Configure the ALB as the origin.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Add an Amazon API Gateway edge-optimized API endpoint to expose the APIs. Configure the ALB as the target.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Add an accelerator in AWS Global Accelerator. Configure the ALB as the origin.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Deploy the APIs to two additional AWS Regions: eu-west-1 and ap-southeast-2. Add latency-based routing records in Amazon Route 53.",
        "isCorrect": false
      }
    ],
    "comments": "APIs tras un ALB (EKS en us-east-1) con métodos REST NO estándar (LINK/UNLINK/LOCK/UNLOCK); usuarios fuera de EE. UU. con latencia alta/inconsistente. Resolver con el MENOR overhead.\n\nOpción A: CloudFront cachea y acelera, PERO CloudFront no soporta métodos HTTP no estándar como LINK/UNLINK/LOCK/UNLOCK (solo GET/HEAD/OPTIONS/PUT/POST/PATCH/DELETE). Fallaría con esos métodos.\n\nOpción B: API Gateway edge-optimized tampoco maneja bien esos métodos REST no estándar y añade una capa; menos idóneo.\n\nOpción C (Correcta): Añadir un accelerator de AWS Global Accelerator con el ALB como origin. Global Accelerator opera a nivel de red (TCP/UDP), enruta a la Región/endpoint óptimo por la red backbone de AWS (mejora latencia global) y es AGNÓSTICO al protocolo HTTP, por lo que soporta los métodos no estándar. Con mínimo overhead resuelve la latencia. Correcta.\n\nOpción D: Desplegar en más Regiones + latency routing es mucho más operación (replicar EKS en 3 Regiones) que Global Accelerator. No es de menor overhead.\n\nReferencias:\nhttps://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html\nhttps://docs.aws.amazon.com/global-accelerator/latest/dg/about-endpoints.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30209,
    "questionNumber": 209,
    "question": "A company runs an IoT application in the AWS Cloud. The company has millions of sensors that collect data from houses in the United States. The sensors use the MQTT protocol to connect and send data to a custom MQTT broker. The MQTT broker stores the data on a single Amazon EC2 instance. The sensors connect to the broker through the domain named iot.example.com. The company uses Amazon Route 53 as its DNS service. The company stores the data in Amazon DynamoDB. On several occasions, the amount of data has overloaded the MQTT broker and has resulted in lost sensor data. The company must improve the reliability of the solution. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Application Load Balancer (ALB) and an Auto Scaling group for the MQTT broker. Use the Auto Scaling group as the target for the ALB. Update the DNS record in Route 53 to an alias record. Point the alias record to the ALB. Use the MQTT broker to store the data.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Set up AWS IoT Core to receive the sensor data. Create and configure a custom domain to connect to AWS IoT Core. Update the DNS record in Route 53 to point to the AWS IoT Core Data-ATS endpoint. Configure an AWS IoT rule to store the data.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a Network Load Balancer (NLB). Set the MQTT broker as the target. Create an AWS Global Accelerator accelerator. Set the NLB as the endpoint for the accelerator. Update the DNS record in Route 53 to a multivalue answer record. Set the Global Accelerator IP addresses as values. Use the MQTT broker to store the data.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Set up AWS IoT Greengrass to receive the sensor data. Update the DNS record in Route 53 to point to the AWS IoT Greengrass endpoint. Configure an AWS IoT rule to invoke an AWS Lambda function to store the data.",
        "isCorrect": false
      }
    ],
    "comments": "Millones de sensores MQTT que saturan un broker MQTT autogestionado en una única EC2 (pérdida de datos). Mejorar la fiabilidad.\n\nOpción A: ALB + ASG del broker MQTT no es adecuado (un ALB HTTP no balancea MQTT y sigue siendo un broker autogestionado); no resuelve la escalabilidad de forma fiable.\n\nOpción B (Correcta): Usar AWS IoT Core para recibir los datos de los sensores (broker MQTT totalmente gestionado y masivamente escalable, sin servidor que saturar), crear un custom domain para conectar a IoT Core, actualizar el registro de Route 53 al endpoint Data-ATS de IoT Core y configurar una IoT rule para almacenar los datos. Elimina el punto único y la pérdida de datos con un servicio gestionado y escalable. Correcta.\n\nOpción C: NLB + Global Accelerator + broker MQTT en EC2 sigue dependiendo del broker autogestionado en una instancia (mismo cuello de botella). No resuelve la raíz.\n\nOpción D: IoT Greengrass es para edge/on-prem, no para recibir millones de sensores en la nube; IoT Core (B) es lo correcto.\n\nReferencias:\nhttps://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html\nhttps://docs.aws.amazon.com/iot/latest/developerguide/iot-rules.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30210,
    "questionNumber": 210,
    "question": "A company has Linux-based Amazon EC2 instances. Users must access the instances by using SSH with EC2 SSH key pairs. Each machine requires a unique EC2 key pair. The company wants to implement a key rotation policy that will, upon request, automatically rotate all the EC2 key pairs and keep the keys in a securely encrypted place. The company will accept less than 1 minute of downtime during key rotation. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Store all the keys in AWS Secrets Manager. Define a Secrets Manager rotation schedule to invoke an AWS Lambda function to generate new key pairs. Replace public keys on EC2 instances. Update the private keys in Secrets Manager.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Store all the keys in Parameter Store, a capability of AWS Systems Manager, as a string. Define a Systems Manager maintenance window to invoke an AWS Lambda function to generate new key pairs. Replace public keys on EC2 instances. Update the private keys in Parameter Store.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Import the EC2 key pairs into AWS Key Management Service (AWS KMS). Configure automatic key rotation for these key pairs. Create an Amazon EventBridge scheduled rule to invoke an AWS Lambda function to initiate the key rotation in AWS KMS.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Add all the EC2 instances to Fleet Manager, a capability of AWS Systems Manager. Define a Systems Manager maintenance window to issue a Systems Manager Run Command document to generate new key pairs and to rotate public keys to all the instances in Fleet Manager.",
        "isCorrect": false
      }
    ],
    "comments": "Rotar automáticamente todos los EC2 SSH key pairs (uno único por máquina) bajo demanda, guardándolos cifrados, con <1 min de downtime.\n\nOpción A (Correcta): Almacenar todas las claves en AWS Secrets Manager, definir un rotation schedule que invoque una Lambda que genera nuevos key pairs, reemplaza las claves PÚBLICAS en las EC2 y actualiza las claves PRIVADAS en Secrets Manager. Secrets Manager cifra y rota los secretos de forma nativa y la Lambda automatiza la sustitución de claves. Cumple rotación bajo demanda, almacenamiento cifrado y downtime mínimo. Correcta.\n\nOpción B: Parameter Store como 'string' no cifra por defecto (habría que SecureString) y no tiene rotación nativa; menos adecuado que Secrets Manager.\n\nOpción C: KMS NO gestiona 'EC2 SSH key pairs' ni su rotación automática de esa forma (KMS rota sus propias claves de cifrado, no claves SSH). Incorrecta.\n\nOpción D: Fleet Manager + Run Command puede ejecutar comandos, pero no es el mecanismo de rotación con almacén cifrado de claves como Secrets Manager. Menos idónea.\n\nReferencias:\nhttps://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html\nhttps://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30211,
    "questionNumber": 211,
    "question": "A company wants to migrate to AWS. The company is running thousands of VMs in a VMware ESXi environment. The company has no configuration management database and has little knowledge about the utilization of the VMware portfolio. A solutions architect must provide the company with an accurate inventory so that the company can plan for a cost-effective migration. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Systems Manager Patch Manager to deploy Migration Evaluator to each VM. Review the collected data in Amazon QuickSight. Identify servers that have high utilization. Remove the servers that have high utilization from the migration list. Import the data to AWS Migration Hub.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Export the VMware portfolio to a .csv file. Check the disk utilization for each server. Remove servers that have high utilization. Export the data to AWS Application Migration Service. Use AWS Server Migration Service (AWS SMS) to migrate the remaining servers.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy the Migration Evaluator agentless collector to the ESXi hypervisor. Review the collected data in Migration Evaluator. Identify inactive servers. Remove the inactive servers from the migration list. Import the data to AWS Migration Hub.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Deploy the AWS Application Migration Service Agent to each VM. When the data is collected, use Amazon Redshift to import and analyze the data. Use Amazon QuickSight for data visualization.",
        "isCorrect": false
      }
    ],
    "comments": "Miles de VMs en VMware ESXi, sin CMDB y poca información de utilización; obtener un inventario preciso para planificar una migración rentable, con el MENOR overhead.\n\nOpción A: 'Desplegar Migration Evaluator en cada VM con Patch Manager' no es cómo funciona (Migration Evaluator usa un collector agentless, no se despliega por VM). Incorrecta.\n\nOpción B: Exportar a CSV y revisar disco a mano es manual y poco preciso; y SMS es de migración, no de descubrimiento.\n\nOpción C (Correcta): Desplegar el Migration Evaluator agentless collector en el hipervisor ESXi (sin agentes por VM: menor overhead), revisar los datos recopilados en Migration Evaluator, identificar servidores inactivos, quitarlos de la lista de migración e importar los datos a AWS Migration Hub. El collector agentless da un inventario preciso de utilización con mínimo overhead para planificar una migración rentable. Correcta.\n\nOpción D: Desplegar el agente de Application Migration Service en cada VM (agente por VM = más overhead) y montar Redshift/QuickSight es más pesado que el collector agentless de Migration Evaluator.\n\nReferencias:\nhttps://docs.aws.amazon.com/migration-evaluator/latest/userguide/what-is.html\nhttps://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30212,
    "questionNumber": 212,
    "question": "A company runs a microservice as an AWS Lambda function. The microservice writes data to an on-premises SQL database that supports a limited number of concurrent connections. When the number of Lambda function invocations is too high, the database crashes and causes application downtime. The company has an AWS Direct Connect connection between the company's VPC and the on-premises data center. The company wants to protect the database from crashes. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Write the data to an Amazon Simple Queue Service (Amazon SQS) queue. Configure the Lambda function to read from the queue and write to the existing database. Set a reserved concurrency limit on the Lambda function that is less than the number of connections that the database supports.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a new Amazon Aurora Serverless DB cluster. Use AWS DataSync to migrate the data from the existing database to Aurora Serverless. Reconfigure the Lambda function to write to Aurora.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon RDS Proxy DB instance. Attach the RDS Proxy DB instance to the Amazon RDS DB instance. Reconfigure the Lambda function to write to the RDS Proxy DB instance.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Write the data to an Amazon Simple Notification Service (Amazon SNS) topic. Invoke the Lambda function to write to the existing database when the topic receives new messages. Configure provisioned concurrency for the Lambda function to be equal to the number of connections that the database supports.",
        "isCorrect": false
      }
    ],
    "comments": "Una Lambda escribe a una BD SQL ON-PREMISES (por Direct Connect) con conexiones limitadas; cuando hay muchas invocaciones, la BD se satura y cae. Proteger la BD.\n\nOpción A (Correcta): Escribir los datos a una cola Amazon SQS y hacer que la Lambda lea de la cola y escriba en la BD existente, poniendo un límite de reserved concurrency en la Lambda MENOR que el número de conexiones que soporta la BD. Así SQS absorbe los picos (buffer) y la concurrencia reservada limita las escrituras simultáneas a la BD por debajo de su límite de conexiones, protegiéndola de saturarse. Correcta.\n\nOpción B: Migrar a Aurora Serverless con DataSync no aplica (DataSync es de ficheros) y cambia la BD; el requisito es proteger la BD existente.\n\nOpción C: RDS Proxy es para bases de datos RDS/Aurora en AWS, NO para una BD SQL on-premises; no se puede poner RDS Proxy delante de una BD on-prem. Inválido.\n\nOpción D: SNS es pub/sub y no limita la concurrencia hacia la BD; provisioned concurrency IGUAL al número de conexiones no deja margen y no bufferiza como SQS. Menos adecuada.\n\nReferencias:\nhttps://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30213,
    "questionNumber": 213,
    "question": "A company uses a Grafana data visualization solution that runs on a single Amazon EC2 instance to monitor the health of the company's AWS workloads. The company has invested time and effort to create dashboards that the company wants to preserve. The dashboards need to be highly available and cannot be down for longer than 10 minutes. The company needs to minimize ongoing maintenance. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate to Amazon CloudWatch dashboards. Recreate the dashboards to match the existing Grafana dashboards. Use automatic dashboards where possible.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon Managed Grafana workspace. Configure a new Amazon CloudWatch data source. Export dashboards from the existing Grafana instance. Import the dashboards into the new workspace.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an AMI that has Grafana pre-installed. Store the existing dashboards in Amazon Elastic File System (Amazon EFS). Create an Auto Scaling group that uses the new AMI. Set the Auto Scaling group's minimum, desired, and maximum number of instances to one. Create an Application Load Balancer that serves at least two Availability Zones.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure AWS Backup to back up the EC2 instance that runs Grafana once each hour. Restore the EC2 instance from the most recent snapshot in an alternate Availability Zone when required.",
        "isCorrect": false
      }
    ],
    "comments": "Grafana en una única EC2; los dashboards deben ser HA (no caer >10 min) minimizando el mantenimiento continuo, con el MENOR overhead.\n\nOpción A: Migrar a CloudWatch dashboards y RECREAR todos los dashboards descarta la inversión en Grafana y es mucho trabajo manual; no preserva los dashboards.\n\nOpción B (Correcta): Crear un workspace de Amazon Managed Grafana (servicio gestionado, HA), configurar un data source de CloudWatch, exportar los dashboards de la instancia Grafana existente e importarlos en el workspace. Preserva los dashboards, da alta disponibilidad gestionada y minimiza el mantenimiento (sin servidores que operar). Menor overhead. Correcta.\n\nOpción C: AMI + EFS + ASG(1) + ALB es autogestionado (parches, AMI, etc.); más mantenimiento que Managed Grafana.\n\nOpción D: AWS Backup + restaurar en otra AZ es un proceso manual de recuperación que difícilmente cumple <10 min y sigue autogestionado. No es HA real.\n\nReferencias:\nhttps://docs.aws.amazon.com/grafana/latest/userguide/what-is-Amazon-Managed-Service-Grafana.html\nhttps://docs.aws.amazon.com/grafana/latest/userguide/AMG-configure-data-source-cw.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30214,
    "questionNumber": 214,
    "question": "A company needs to migrate its customer transactions database from on premises to AWS. The database resides on an Oracle DB instance that runs on a Linux server. According to a new security requirement, the company must rotate the database password each year. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Convert the database to Amazon DynamoDB by using the AWS Schema Conversion Tool (AWS SCT). Store the password in AWS Systems Manager Parameter Store. Create an Amazon CloudWatch alarm to invoke an AWS Lambda function for yearly passtard rotation.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Migrate the database to Amazon RDS for Oracle. Store the password in AWS Secrets Manager. Turn on automatic rotation. Configure a yearly rotation schedule.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Migrate the database to an Amazon EC2 instance. Use AWS Systems Manager Parameter Store to keep and rotate the connection string by using an AWS Lambda function on a yearly schedule.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Migrate the database to Amazon Neptune by using the AWS Schema Conversion Tool (AWS SCT). Create an Amazon CloudWatch alarm to invoke an AWS Lambda function for yearly password rotation.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar Oracle on-prem a AWS y rotar la contraseña de la BD cada año, con el MENOR overhead.\n\nOpción A: Convertir a DynamoDB con SCT es una migración heterogénea innecesaria (Oracle relacional a NoSQL cambia el modelo) y Parameter Store + CloudWatch/Lambda para rotar es más operación que Secrets Manager nativo.\n\nOpción B (Correcta): Migrar a Amazon RDS for Oracle (homogéneo, sin cambiar el motor), almacenar la contraseña en AWS Secrets Manager, activar la rotación automática y configurar un schedule anual. RDS for Oracle se integra con Secrets Manager para rotación automática gestionada: el menor overhead para cumplir la rotación anual. Correcta.\n\nOpción C: EC2 con Oracle autogestionado + Parameter Store/Lambda es más mantenimiento (gestionar el motor y la rotación a mano).\n\nOpción D: Neptune es BD de grafos; migrar Oracle relacional a Neptune no tiene sentido. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-secrets-manager.html\nhttps://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30215,
    "questionNumber": 215,
    "question": "A solutions architect is designing an AWS account structure for a company that consists of multiple teams. All the teams will work in the same AWS Region. The company needs a VPC that is connected to the on-premises network. The company expects less than 50 Mbps of total traffic to and from the on-premises network. Which combination of steps will meet these requirements MOST cost-effectively? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS CloudFormation template that provisions a VPC and the required subnets. Deploy the template to each AWS account.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS CloudFormation template that provisions a VPC and the required subnets. Deploy the template to a shared services account. Share the subnets by using AWS Resource Access Manager.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS Transit Gateway along with an AWS Site-to-Site VPN for connectivity to the on-premises network. Share the transit gateway by using AWS Resource Access Manager.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Site-to-Site VPN for connectivity to the on-premises network.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Use AWS Direct Connect for connectivity to the on-premises network.",
        "isCorrect": false
      }
    ],
    "comments": "Estructura multi-equipo en la misma Región, una VPC conectada a on-prem, <50 Mbps de tráfico total, de la forma MÁS rentable.\n\nOpción A: Desplegar una VPC en CADA cuenta duplica infraestructura/coste; se prefiere una VPC compartida.\n\nOpción B (Correcta): Una plantilla CloudFormation que provisiona la VPC y subredes, desplegada en una cuenta de shared services, y compartir las subredes con AWS Resource Access Manager (VPC sharing). Una única VPC compartida entre equipos es lo más rentable (evita múltiples VPC/gateways).\n\nOpción C: Transit Gateway + VPN compartido por RAM añade coste de TGW (attachments/procesamiento) innecesario para <50 Mbps y una sola VPC.\n\nOpción D (Correcta): Usar AWS Site-to-Site VPN para la conectividad on-prem. Para <50 Mbps, la VPN es mucho más barata que Direct Connect. B + D: VPC compartida por RAM + VPN es lo más rentable.\n\nOpción E: Direct Connect es caro (circuito dedicado) e innecesario para <50 Mbps; la VPN basta.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/vpc-sharing.html\nhttps://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30216,
    "questionNumber": 216,
    "question": "A solutions architect at a large company needs to set up network security for outbound traffic to the internet from all AWS accounts within an organization in AWS Organizations. The organization has more than 100 AWS accounts, and the accounts route to each other by using a centralized AWS Transit Gateway. Each account has both an internet gateway and a NAT gateway for outbound traffic to the internet. The company deploys resources only into a single AWS Region. The company needs the ability to add centrally managed rule-based filtering on all outbound traffic to the internet for all AWS accounts in the organization. The peak load of outbound traffic will not exceed 25 Gbps in each Availability Zone. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new VPC for outbound traffic to the internet. Connect the existing transit gateway to the new VPC. Configure a new NAT gateway. Create an Auto Scaling group of Amazon EC2 instances that run an open-source internet proxy for rule-based filtering across all Availability Zones in the Region. Modify all default routes to point to the proxy's Auto Scaling group.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a new VPC for outbound traffic to the internet. Connect the existing transit gateway to the new VPC. Configure a new NAT gateway. Use an AWS Network Firewall firewall for rule-based filtering. Create Network Firewall endpoints in each Availability Zone. Modify all default routes to point to the Network Firewall endpoints.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an AWS Network Firewall firewall for rule-based filtering in each AWS account. Modify all default routes to point to the Network Firewall firewalls in each account.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "In each AWS account, create an Auto Scaling group of network-optimized Amazon EC2 instances that run an open-source internet proxy for rule-based filtering. Modify all default routes to point to the proxy's Auto Scaling group.",
        "isCorrect": false
      }
    ],
    "comments": "Filtrado centralizado, basado en reglas, de TODO el tráfico saliente a Internet de >100 cuentas (una sola Región, TGW central), pico <=25 Gbps por AZ.\n\nOpción A: Un proxy open-source en EC2/ASG para filtrar es autogestionado (parches, escalado, HA a mano); más overhead y menos fiable que un servicio gestionado.\n\nOpción B (Correcta): Crear una VPC de salida (egress) conectada al TGW existente, con un NAT gateway, y usar AWS Network Firewall para el filtrado basado en reglas, con endpoints de Network Firewall en cada AZ, y modificar las rutas por defecto para pasar por los endpoints del firewall. Network Firewall es un firewall gestionado, escalable (soporta el throughput requerido) y con reglas centralizadas para inspeccionar/filtrar todo el egress de la organización a través del TGW central. Es la solución gestionada correcta. Correcta.\n\nOpción C: Un Network Firewall en CADA cuenta es mucha gestión/coste (no centralizado); el patrón es una VPC de inspección central (B).\n\nOpción D: Proxy open-source en cada cuenta es aún más operación y no centralizado. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html\nhttps://docs.aws.amazon.com/network-firewall/latest/developerguide/architectures.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30217,
    "questionNumber": 217,
    "question": "A company uses a load balancer to distribute traffic to Amazon EC2 instances in a single Availability Zone. The company is concerned about security and wants a solutions architect to re-architect the solution to meet the following requirements: • Inbound requests must be filtered for common vulnerability attacks. • Rejected requests must be sent to a third-party auditing application. • All resources should be highly available. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure a Multi-AZ Auto Scaling group using the application's AMI. Create an Application Load Balancer (ALB) and select the previously created Auto Scaling group as the target. Use Amazon Inspector to monitor traffic to the ALB and EC2 instances. Create a web ACL in WAF. Create an AWS WAF using the web ACL and ALB. Use an AWS Lambda function to frequently push the Amazon Inspector report to the third-party auditing application.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure an Application Load Balancer (ALB) and add the EC2 instances as targets. Create a web ACL in WAF. Create an AWS WAF using the web ACL and ALB name and enable logging with Amazon CloudWatch Logs. Use an AWS Lambda function to frequently push the logs to the third-party auditing application.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure an Application Load Balancer (ALB) along with a target group adding the EC2 instances as targets. Create an Amazon Kinesis Data Firehose with the destination of the third-party auditing application. Create a web ACL in WAF. Create an AWS WAF using the web ACL and ALB then enable logging by selecting the Kinesis Data Firehose as the destination. Subscribe to AWS Managed Rules in AWS Marketplace, choosing the WAF as the subscriber.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure a Multi-AZ Auto Scaling group using the application's AMI. Create an Application Load Balancer (ALB) and select the previously created Auto Scaling group as the target. Create an Amazon Kinesis Data Firehose with a destination of the third-party auditing application. Create a web ACL in WAF. Create an AWS WAF using the WebACL and ALB then enable logging by selecting the Kinesis Data Firehose as the destination. Subscribe to AWS Managed Rules in AWS Marketplace, choosing the WAF as the subscriber.",
        "isCorrect": true
      }
    ],
    "comments": "Filtrar peticiones entrantes por vulnerabilidades comunes, enviar las rechazadas a una app de auditoría de terceros, y todo HA.\n\nOpción A: Amazon Inspector evalúa vulnerabilidades de instancias, no filtra peticiones entrantes como WAF; y 'push del report de Inspector' no envía las peticiones rechazadas. No cumple.\n\nOpción B: WAF + logging a CloudWatch Logs + Lambda que empuja logs funciona, pero no usa un ASG multi-AZ (HA de la app) explícito y la entrega a la app de terceros vía Lambda es más frágil que Firehose. Inferior a D.\n\nOpción C: Firehose a la app de terceros + WAF es casi correcto, pero no incluye el ASG Multi-AZ para 'todos los recursos HA'; D lo incluye.\n\nOpción D (Correcta): ASG Multi-AZ con la AMI de la app (HA), un ALB con el ASG como target, un Kinesis Data Firehose cuyo destino es la app de auditoría de terceros, un web ACL de WAF asociado al ALB con AWS Managed Rules (filtra vulnerabilidades comunes) y logging de WAF enviando a Firehose (las peticiones/rechazos van a la app de terceros). Cumple filtrado, envío a auditoría y HA en todos los recursos. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/waf/latest/developerguide/logging.html\nhttps://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30218,
    "questionNumber": 218,
    "question": "A company is running an application in the AWS Cloud. The application consists of microservices that run on a fleet of Amazon EC2 instances in multiple Availability Zones behind an Application Load Balancer. The company recently added a new REST API that was implemented in Amazon API Gateway. Some of the older microservices that run on EC2 instances need to call this new API. The company does not want the API to be accessible from the public internet and does not want proprietary data to traverse the public internet. What should a solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Site-to-Site VPN connection between the VPC and the API Gateway. Use API Gateway to generate a unique API Key for each microservice. Configure the API methods to require the key.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an interface VPC endpoint for API Gateway, and set an endpoint policy to only allow access to the specific API. Add a resource policy to API Gateway to only allow access from the VPC endpoint. Change the API Gateway endpoint type to private.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Modify the API Gateway to use IAM authentication. Update the IAM policy for the IAM role that is assigned to the EC2 instances to allow access to the API Gateway. Move the API Gateway into a new VPDeploy a transit gateway and connect the VPCs.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an accelerator in AWS Global Accelerator, and connect the accelerator to the API Gateway. Update the route table for all VPC subnets with a route to the created Global Accelerator endpoint IP address. Add an API key for each service to use for authentication.",
        "isCorrect": false
      }
    ],
    "comments": "Microservicios en EC2 deben llamar a una nueva REST API de API Gateway sin que sea accesible desde Internet y sin que los datos propietarios crucen Internet.\n\nOpción A: 'VPN Site-to-Site entre la VPC y API Gateway' no es un patrón válido; API Gateway no se expone por VPN. Incorrecta.\n\nOpción B (Correcta): Crear un interface VPC endpoint para API Gateway (execute-api) con una endpoint policy que solo permita esa API, añadir una resource policy a la API que solo permita el acceso desde ese VPC endpoint, y cambiar el tipo de endpoint de la API a PRIVATE. Así la API solo es accesible desde la VPC vía PrivateLink (los datos no cruzan Internet) y no es pública. Es el patrón nativo. Correcta.\n\nOpción C: IAM auth + mover API Gateway 'a una VPC' + transit gateway no es cómo funciona API Gateway (no vive en una VPC); mezcla conceptos. Incorrecta.\n\nOpción D: Global Accelerator delante de API Gateway con rutas a su IP no hace privada la API; expone por Internet. No cumple.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-apis.html\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-set-up.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30219,
    "questionNumber": 219,
    "question": "A company has set up its entire infrastructure on AWS. The company uses Amazon EC2 instances to host its ecommerce website and uses Amazon S3 to store static data. Three engineers at the company handle the cloud administration and development through one AWS account. Occasionally, an engineer alters an EC2 security group configuration of another engineer and causes noncompliance issues in the environment. A solutions architect must set up a system that tracks changes that the engineers make. The system must send alerts when the engineers make noncompliant changes to the security settings for the EC2 instances. What is the FASTEST way for the solutions architect to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up AWS Organizations for the company. Apply SCPs to govern and track noncompliant security group changes that are made to the AWS account.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Enable AWS CloudTrail to capture the changes to EC2 security groups. Enable Amazon CloudWatch rules to provide alerts when noncompliant security settings are detected.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Enable SCPs on the AWS account to provide alerts when noncompliant security group changes are made to the environment.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Enable AWS Config on the EC2 security groups to track any noncompliant changes. Send the changes as alerts through an Amazon Simple Notification Service (Amazon SNS) topic.",
        "isCorrect": true
      }
    ],
    "comments": "Rastrear cambios en security groups de EC2 y alertar cuando los ingenieros hacen cambios NO CONFORMES, de la forma MÁS rápida (una sola cuenta).\n\nOpción A: Organizations + SCPs es para múltiples cuentas y los SCP restringen, no 'rastrean/alertan' cambios de conformidad; sobredimensionado para una cuenta.\n\nOpción B: CloudTrail + CloudWatch rules captura la API pero requiere construir las reglas de detección de 'no conformidad' y alerta a mano; más trabajo que la regla gestionada de Config.\n\nOpción C: Los SCP no 'alertan' sobre cambios; restringen acciones. Incorrecta.\n\nOpción D (Correcta): Habilitar AWS Config sobre los security groups de EC2 para rastrear cambios NO CONFORMES (con reglas de Config gestionadas/personalizadas que evalúan la conformidad) y enviar los cambios como alertas a un topic SNS. AWS Config está diseñado para evaluar conformidad de configuraciones y notificar, siendo la vía más rápida y directa para detectar y alertar cambios no conformes en SG. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html\nhttps://docs.aws.amazon.com/config/latest/developerguide/monitoring-resource-config-changes.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30220,
    "questionNumber": 220,
    "question": "A company has IoT sensors that monitor traffic patterns throughout a large city. The company wants to read and collect data from the sensors and perform aggregations on the data. A solutions architect designs a solution in which the IoT devices are streaming to Amazon Kinesis Data Streams. Several applications are reading from the stream. However, several consumers are experiencing throttling and are periodically encountering a ReadProvisionedThroughputExceeded error. Which actions should the solutions architect take to resolve this issue? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Reshard the stream to increase the number of shards in the stream.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use the Kinesis Producer Library (KPL). Adjust the polling frequency.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use consumers with the enhanced fan-out feature.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Reshard the stream to reduce the number of shards in the stream.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Use an error retry and exponential backoff mechanism in the consumer logic.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Configure the stream to use dynamic partitioning.",
        "isCorrect": false
      }
    ],
    "comments": "Consumidores de Kinesis Data Streams sufren throttling y ReadProvisionedThroughputExceeded. Resolver.\n\nOpción A (Correcta): Hacer reshard AUMENTANDO el número de shards. Cada shard tiene un límite de lectura; más shards aumentan el throughput de lectura agregado, aliviando el throttling.\n\nOpción B: La KPL es para PRODUCTORES (escritura), no resuelve el throttling de LECTURA de los consumidores. No aplica.\n\nOpción C (Correcta): Usar consumidores con enhanced fan-out. Cada consumidor con enhanced fan-out obtiene su propio throughput dedicado (2 MB/s por shard por consumidor), eliminando la contención de lectura entre múltiples consumidores.\n\nOpción D: Reducir el número de shards EMPEORARÍA el throttling (menos throughput). Incorrecta.\n\nOpción E (Correcta): Implementar reintentos con backoff exponencial en los consumidores para manejar el error de forma resiliente ante picos. A + C + E resuelven el throttling de lectura.\n\nOpción F: El dynamic partitioning es de Kinesis Data Firehose, no de Data Streams para este problema. No aplica.\n\nReferencias:\nhttps://docs.aws.amazon.com/streams/latest/dev/enhanced-consumers.html\nhttps://docs.aws.amazon.com/streams/latest/dev/kinesis-using-sdk-java-resharding.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30221,
    "questionNumber": 221,
    "question": "A company uses AWS Organizations to manage its AWS accounts. The company needs a list of all its Amazon EC2 instances that have underutilized CPU or memory usage. The company also needs recommendations for how to downsize these underutilized instances. Which solution will meet these requirements with the LEAST effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Install a CPU and memory monitoring tool from AWS Marketplace on all the EC2 instances. Store the findings in Amazon S3. Implement a Python script to identify underutilized instances. Reference EC2 instance pricing information for recommendations about downsizing options.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Install the Amazon CloudWatch agent on all the EC2 instances by using AWS Systems Manager. Retrieve the resource optimization recommendations from AWS Cost Explorer in the organization’s management account. Use the recommendations to downsize underutilized instances in all accounts of the organization.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Install the Amazon CloudWatch agent on all the EC2 instances by using AWS Systems Manager. Retrieve the resource optimization recommendations from AWS Cost Explorer in each account of the organization. Use the recommendations to downsize underutilized instances in all accounts of the organization.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Install the Amazon CloudWatch agent on all the EC2 instances by using AWS Systems Manager. Create an AWS Lambda function to extract CPU and memory usage from all the EC2 instances. Store the findings as files in Amazon S3. Use Amazon Athena to find underutilized instances. Reference EC2 instance pricing information for recommendations about downsizing options.",
        "isCorrect": false
      }
    ],
    "comments": "Lista de EC2 infrautilizadas (CPU/memoria) y recomendaciones de downsizing en toda la organización, con el MENOR esfuerzo.\n\nOpción A: Herramienta de Marketplace + script Python + precios manuales es mucho trabajo a medida. No es de menor esfuerzo.\n\nOpción B (Correcta): Instalar el CloudWatch agent en todas las EC2 vía Systems Manager (para métricas de memoria) y obtener las resource optimization recommendations de AWS Cost Explorer desde la cuenta de GESTIÓN de la organización (visión de todas las cuentas), usándolas para hacer downsizing. Cost Explorer ofrece recomendaciones de rightsizing/downsizing a nivel organización desde la cuenta de gestión: el menor esfuerzo. Correcta.\n\nOpción C: Obtener las recomendaciones 'en cada cuenta' (no en la cuenta de gestión) es más trabajo repetido; a nivel organización se consolida en la cuenta de gestión (B).\n\nOpción D: Lambda + Athena + precios manuales es un desarrollo a medida; más esfuerzo que las recomendaciones nativas de Cost Explorer.\n\nReferencias:\nhttps://docs.aws.amazon.com/cost-management/latest/userguide/ce-rightsizing.html\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30222,
    "questionNumber": 222,
    "question": "A company wants to run a custom network analysis software package to inspect traffic as traffic leaves and enters a VPC. The company has deployed the solution by using AWS CloudFormation on three Amazon EC2 instances in an Auto Scaling group. All network routing has been established to direct traffic to the EC2 instances. Whenever the analysis software stops working, the Auto Scaling group replaces an instance. The network routes are not updated when the instance replacement occurs. Which combination of steps will resolve this issue? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create alarms based on EC2 status check metrics that will cause the Auto Scaling group to replace the failed instance.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Update the CloudFormation template to install the Amazon CloudWatch agent on the EC2 instances. Configure the CloudWatch agent to send process metrics for the application.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Update the CloudFormation template to install AWS Systems Manager Agent on the EC2 instances. Configure Systems Manager Agent to send process metrics for the application.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an alarm for the custom metric in Amazon CloudWatch for the failure scenarios. Configure the alarm to publish a message to an Amazon Simple Notification Service (Amazon SNS) topic.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Create an AWS Lambda function that responds to the Amazon Simple Notification Service (Amazon SNS) message to take the instance out of service. Update the network routes to point to the replacement instance.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "In the CloudFormation template, write a condition that updates the network routes when a replacement instance is launched.",
        "isCorrect": false
      }
    ],
    "comments": "El software de análisis de red se detiene, el ASG reemplaza la instancia, pero las RUTAS de red no se actualizan a la nueva instancia. Resolver detectando el fallo del software y reencaminando.\n\nEl problema real no es el status check de EC2 (la instancia puede estar 'sana' pero el software caído), sino detectar el fallo del PROCESO y actualizar rutas.\n\nOpción A: Alarmas por status checks de EC2 no detectan que el SOFTWARE de análisis se detuvo (la instancia sigue 'ok'). No resuelve la detección del proceso.\n\nOpción B (Correcta): Actualizar la plantilla para instalar el CloudWatch agent y enviar métricas de PROCESO de la aplicación (para detectar cuándo el software se detiene).\n\nOpción C: SSM Agent no 'envía métricas de proceso de la aplicación' como el CloudWatch agent; B es el correcto.\n\nOpción D (Correcta): Crear una alarma de CloudWatch sobre la métrica personalizada de proceso para los escenarios de fallo, publicando a un topic SNS.\n\nOpción E (Correcta): Una Lambda que responde al mensaje SNS para sacar la instancia de servicio y ACTUALIZAR las rutas de red hacia la instancia de reemplazo. B + D + E: detectar el fallo del proceso, alertar y reencaminar automáticamente.\n\nOpción F: No se pueden 'actualizar rutas con una condición de CloudFormation al lanzar una instancia' de forma reactiva a fallos; la automatización es Lambda (E).\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30223,
    "questionNumber": 223,
    "question": "A company is developing a new on-demand video application that is based on microservices. The application will have 5 million users at launch and will have 30 million users after 6 months. The company has deployed the application on Amazon Elastic Container Service (Amazon ECS) on AWS Fargate. The company developed the application by using ECS services that use the HTTPS protocol. A solutions architect needs to implement updates to the application by using blue/green deployments. The solution must distribute traffic to each ECS service through a load balancer. The application must automatically adjust the number of tasks in response to an Amazon CloudWatch alarm. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the ECS services to use the blue/green deployment type and a Network Load Balancer. Request increases to the service quota for tasks per service to meet the demand.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure the ECS services to use the blue/green deployment type and a Network Load Balancer. Implement Auto Scaling group for each ECS service by using the Cluster Autoscaler.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure the ECS services to use the blue/green deployment type and an Application Load Balancer. Implement an Auto Scaling group for each ECS service by using the Cluster Autoscaler.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure the ECS services to use the blue/green deployment type and an Application Load Balancer. Implement Service Auto Scaling for each ECS service.",
        "isCorrect": true
      }
    ],
    "comments": "App de vídeo bajo demanda en ECS/Fargate (HTTPS), con blue/green, balanceo por servicio y autoescalado de tareas según una alarma de CloudWatch.\n\nOpción A: Solicitar aumento de quota de tareas no es 'autoescalado' según alarma; y NLB es capa 4 (no ideal para HTTPS/rutas). No cumple el autoescalado.\n\nOpción B: NLB no es lo idóneo para HTTPS con blue/green, y 'Cluster Autoscaler' es de Kubernetes/EKS, no de ECS. Incorrecta.\n\nOpción C: ALB es correcto, pero 'Cluster Autoscaler' es de EKS, no de ECS; para escalar tareas ECS se usa Service Auto Scaling (D).\n\nOpción D (Correcta): Configurar los servicios ECS con tipo de despliegue blue/green y un Application Load Balancer (capa 7, HTTPS, integra con CodeDeploy blue/green), e implementar Service Auto Scaling para cada servicio ECS (escala el número de tareas según alarmas de CloudWatch). Es la combinación correcta para ECS/Fargate. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30224,
    "questionNumber": 224,
    "question": "A company is running a containerized application in the AWS Cloud. The application is running by using Amazon Elastic Container Service (Amazon ECS) on a set of Amazon EC2 instances. The EC2 instances run in an Auto Scaling group. The company uses Amazon Elastic Container Registry (Amazon ECR) to store its container images. When a new image version is uploaded, the new image version receives a unique tag. The company needs a solution that inspects new image versions for common vulnerabilities and exposures. The solution must automatically delete new image tags that have Critical or High severity findings. The solution also must notify the development team when such a deletion occurs. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure scan on push on the repository. Use Amazon EventBridge to invoke an AWS Step Functions state machine when a scan is complete for images that have Critical or High severity findings. Use the Step Functions state machine to delete the image tag for those images and to notify the development team through Amazon Simple Notification Service (Amazon SNS).",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure scan on push on the repository. Configure scan results to be pushed to an Amazon Simple Queue Service (Amazon SQS) queue. Invoke an AWS Lambda function when a new message is added to the SQS queue. Use the Lambda function to delete the image tag for images that have Critical or High severity findings. Notify the development team by using Amazon Simple Email Service (Amazon SES).",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Schedule an AWS Lambda function to start a manual image scan every hour. Configure Amazon EventBridge to invoke another Lambda function when a scan is complete. Use the second Lambda function to delete the image tag for images that have Critical or High severity findings. Notify the development team by using Amazon Simple Notification Service (Amazon SNS).",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure periodic image scan on the repository. Configure scan results to be added to an Amazon Simple Queue Service (Amazon SQS) queue. Invoke an AWS Step Functions state machine when a new message is added to the SQS queue. Use the Step Functions state machine to delete the image tag for images that have Critical or High severity findings. Notify the development team by using Amazon Simple Email Service (Amazon SES).",
        "isCorrect": false
      }
    ],
    "comments": "Inspeccionar nuevas versiones de imágenes en ECR por vulnerabilidades (CVE), borrar automáticamente los tags con findings Critical/High y notificar al equipo.\n\nOpción A (Correcta): Configurar scan on push en el repositorio ECR (escanea al subir), usar Amazon EventBridge para invocar una Step Functions state machine cuando un scan finaliza para imágenes con findings Critical/High, y que la state machine borre el image tag y notifique al equipo por SNS. Scan-on-push detecta al subir; EventBridge + Step Functions automatiza el borrado y la notificación. Correcta.\n\nOpción B: scan on push es correcto, pero 'push de resultados a SQS' no es el flujo nativo (ECR emite eventos a EventBridge, no a SQS directamente) y SES es más pesado que SNS para notificar a un equipo. Inferior a A.\n\nOpción C: Escaneo manual programado cada hora es peor que scan-on-push (no inmediato) y añade Lambdas. No es lo óptimo.\n\nOpción D: 'periodic image scan' + SQS no reacciona inmediatamente al push; scan-on-push (A) es lo adecuado.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html\nhttps://docs.aws.amazon.com/AmazonECR/latest/userguide/ecr-eventbridge.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30225,
    "questionNumber": 225,
    "question": "A company runs many workloads on AWS and uses AWS Organizations to manage its accounts. The workloads are hosted on Amazon EC2. AWS Fargate. and AWS Lambda. Some of the workloads have unpredictable demand. Accounts record high usage in some months and low usage in other months. The company wants to optimize its compute costs over the next 3 years. A solutions architect obtains a 6-month average for each of the accounts across the organization to calculate usage. Which solution will provide the MOST cost savings for all the organization's compute usage?",
    "choices": [
      {
        "letter": "A",
        "text": "Purchase Reserved Instances for the organization to match the size and number of the most common EC2 instances from the member accounts.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Purchase a Compute Savings Plan for the organization from the management account by using the recommendation at the management account level.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Purchase Reserved Instances for each member account that had high EC2 usage according to the data from the last 6 months.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Purchase an EC2 Instance Savings Plan for each member account from the management account based on EC2 usage data from the last 6 months.",
        "isCorrect": false
      }
    ],
    "comments": "Optimizar coste de cómputo (EC2, Fargate, Lambda) a 3 años con demanda impredecible por cuenta; se dispone de una media de 6 meses. MÁS ahorro para TODO el cómputo de la organización.\n\nOpción A: Reserved Instances solo cubren EC2 (no Fargate ni Lambda) y son rígidas (tamaño/tipo); no cubren todo el cómputo ni la demanda variable.\n\nOpción B (Correcta): Comprar un Compute Savings Plan para la organización desde la cuenta de GESTIÓN usando la recomendación a nivel de cuenta de gestión. Los Compute Savings Plans cubren EC2, Fargate Y Lambda, con máxima flexibilidad (cualquier Región/familia/tamaño) y el mayor descuento por compromiso, ideal para demanda impredecible y para TODO el cómputo. Comprarlo a nivel de organización (cuenta de gestión) agrega el uso de todas las cuentas para el mejor ahorro. Correcta.\n\nOpción C: RIs por cuenta miembro solo cubren EC2 y no agregan a nivel organización; menos ahorro.\n\nOpción D: EC2 Instance Savings Plans solo cubren EC2 (no Fargate/Lambda) y son menos flexibles que Compute SP; no cubren todo el cómputo.\n\nReferencias:\nhttps://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html\nhttps://docs.aws.amazon.com/cost-management/latest/userguide/sp-recommendations.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30226,
    "questionNumber": 226,
    "question": "A company has hundreds of AWS accounts. The company uses an organization in AWS Organizations to manage all the accounts. The company has turned on all features. A finance team has allocated a daily budget for AWS costs. The finance team must receive an email notification if the organization's AWS costs exceed 80% of the allocated budget. A solutions architect needs to implement a solution to track the costs and deliver the notifications. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "In the organization's management account, use AWS Budgets to create a budget that has a daily period. Add an alert threshold and set the value to 80%. Use Amazon Simple Notification Service (Amazon SNS) to notify the finance team.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "In the organization’s management account, set up the organizational view feature for AWS Trusted Advisor. Create an organizational view report for cost optimization. Set an alert threshold of 80%. Configure notification preferences. Add the email addresses of the finance team.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Register the organization with AWS Control Tower. Activate the optional cost control (guardrail). Set a control (guardrail) parameter of 80%. Configure control (guardrail) notification preferences. Use Amazon Simple Notification Service (Amazon SNS) to notify the finance team.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure the member accounts to save a daily AWS Cost and Usage Report to an Amazon S3 bucket in the organization's management account. Use Amazon EventBridge to schedule a daily Amazon Athena query to calculate the organization’s costs. Configure Athena to send an Amazon CloudWatch alert if the total costs are more than 80% of the allocated budget. Use Amazon Simple Notification Service (Amazon SNS) to notify the finance team.",
        "isCorrect": false
      }
    ],
    "comments": "Notificar por email si los costes de la organización superan el 80% de un presupuesto DIARIO.\n\nOpción A (Correcta): En la cuenta de gestión de la organización, usar AWS Budgets para crear un presupuesto con periodo DIARIO, un umbral de alerta al 80% y notificar al equipo de finanzas por SNS. AWS Budgets es el servicio nativo para presupuestos con alertas por umbral (incluye periodo diario) y notificación por SNS/email. Correcta.\n\nOpción B: Trusted Advisor organizational view es de recomendaciones de optimización, no un presupuesto con umbral de coste diario y alerta al 80%. No aplica.\n\nOpción C: Control Tower no tiene un 'cost guardrail' con parámetro de 80% de presupuesto; no es el mecanismo. Incorrecta.\n\nOpción D: CUR + Athena diario + alarma custom es mucho desarrollo/operación frente a AWS Budgets nativo. No es lo indicado.\n\nReferencias:\nhttps://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html\nhttps://docs.aws.amazon.com/cost-management/latest/userguide/budgets-sns-policy.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30227,
    "questionNumber": 227,
    "question": "A company provides auction services for artwork and has users across North America and Europe. The company hosts its application in Amazon EC2 instances in the us-east-1 Region. Artists upload photos of their work as large-size. high-resolution image files from their mobile phones to a centralized Amazon S3 bucket created in the us-east-1 Region. The users in Europe are reporting slow performance for their image uploads. How can a solutions architect improve the performance of the image upload process?",
    "choices": [
      {
        "letter": "A",
        "text": "Redeploy the application to use S3 multipart uploads.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon CloudFront distribution and point to the application as a custom origin.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure the buckets to use S3 Transfer Acceleration.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an Auto Scaling group for the EC2 instances and create a scaling policy.",
        "isCorrect": false
      }
    ],
    "comments": "Artistas en Europa suben imágenes grandes a un bucket S3 en us-east-1 con lentitud. Mejorar el rendimiento de SUBIDA.\n\nOpción A: Multipart uploads ayuda con ficheros grandes, pero no acelera la transferencia de larga distancia (Europa -> us-east-1) como Transfer Acceleration; parcial.\n\nOpción B: CloudFront con la app como custom origin es para ENTREGA/descarga cacheada, no para acelerar SUBIDAS a S3 desde clientes lejanos. No aplica.\n\nOpción C (Correcta): Configurar S3 Transfer Acceleration en el bucket. Usa la red edge de CloudFront para acelerar transferencias de subida de larga distancia (Europa -> us-east-1), mejorando el rendimiento de las cargas de los usuarios europeos. Es la solución directa. Correcta.\n\nOpción D: Un ASG para las EC2 escala el cómputo, no acelera la subida a S3. No resuelve la latencia de subida.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30228,
    "questionNumber": 228,
    "question": "A company wants to containerize a multi-tier web application and move the application from an on-premises data center to AWS. The application includes web. application, and database tiers. The company needs to make the application fault tolerant and scalable. Some frequently accessed data must always be available across application servers. Frontend web servers need session persistence and must scale to meet increases in traffic. Which solution will meet these requirements with the LEAST ongoing operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Run the application on Amazon Elastic Container Service (Amazon ECS) on AWS Fargate. Use Amazon Elastic File System (Amazon EFS) for data that is frequently accessed between the web and application tiers. Store the frontend web server session data in Amazon Simple Queue Service (Amazon SQS).",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Run the application on Amazon Elastic Container Service (Amazon ECS) on Amazon EC2. Use Amazon ElastiCache for Redis to cache frontend web server session data. Use Amazon Elastic Block Store (Amazon EBS) with Multi-Attach on EC2 instances that are distributed across multiple Availability Zones.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Run the application on Amazon Elastic Kubernetes Service (Amazon EKS). Configure Amazon EKS to use managed node groups. Use ReplicaSets to run the web servers and applications. Create an Amazon Elastic File System (Amazon EFS) file system. Mount the EFS file system across all EKS pods to store frontend web server session data.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy the application on Amazon Elastic Kubernetes Service (Amazon EKS). Configure Amazon EKS to use managed node groups. Run the web servers and application as Kubernetes deployments in the EKS cluster. Store the frontend web server session data in an Amazon DynamoDB table. Create an Amazon Elastic File System (Amazon EFS) volume that all applications will mount at the time of deployment.",
        "isCorrect": true
      }
    ],
    "comments": "Contenerizar una web multi-tier tolerante a fallos y escalable; datos frecuentes disponibles entre servidores de app; los web frontend necesitan persistencia de sesión y escalado, con el MENOR overhead.\n\nOpción A: EFS entre web y app está bien, pero guardar la sesión del frontend en SQS (una cola) NO es un store de sesión válido (SQS no es un almacén de sesión). Incorrecta.\n\nOpción B: ECS on EC2 mantiene la gestión de instancias (más overhead) y EBS Multi-Attach no funciona entre múltiples AZ; no encaja para datos compartidos multi-AZ.\n\nOpción C: EKS con node groups es más overhead operativo (Kubernetes), y usar EFS para 'session data' del frontend no es lo idóneo para persistencia de sesión escalable.\n\nOpción D (Correcta): Desplegar en Amazon EKS con managed node groups (o el enfoque contenedorizado gestionado), ejecutar web y app como deployments, almacenar los datos de SESIÓN del frontend en una tabla DynamoDB (store de sesión escalable, HA, para persistencia de sesión) y un EFS que todas las apps montan para los datos frecuentemente compartidos entre servidores. DynamoDB para sesión + EFS para datos compartidos cumple persistencia de sesión, datos compartidos y escalado. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.html\nhttps://docs.aws.amazon.com/efs/latest/ug/whatisefs.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30229,
    "questionNumber": 229,
    "question": "A solutions architect is planning to migrate critical Microsoft SQL Server databases to AWS. Because the databases are legacy systems, the solutions architect will move the databases to a modern data architecture. The solutions architect must migrate the databases with near-zero downtime. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Application Migration Service and the AWS Schema Conversion Tool (AWS SCT). Perform an in-place upgrade before the migration. Export the migrated data to Amazon Aurora Serverless after cutover. Repoint the applications to Amazon Aurora.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Database Migration Service (AWS DMS) to rehost the database. Set Amazon S3 as a target. Set up change data capture (CDC) replication. When the source and destination are fully synchronized, load the data from Amazon S3 into an Amazon RDS for Microsoft SQL Server DB instance.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use native database high availability tools. Connect the source system to an Amazon RDS for Microsoft SQL Server DB instance. Configure replication accordingly. When data replication is finished, transition the workload to an Amazon RDS for Microsoft SQL Server DB instance.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use AWS Application Migration Service. Rehost the database server on Amazon EC2. When data replication is finished, detach the database and move the database to an Amazon RDS for Microsoft SQL Server DB instance. Reattach the database and then cut over all networking.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar SQL Server legacy a una arquitectura moderna con downtime casi cero.\n\nNota: el requisito clave es NEAR-ZERO DOWNTIME. Entre las opciones dadas, la que usa herramientas nativas de alta disponibilidad de la base de datos para replicar hacia RDS for SQL Server y luego conmutar minimiza el downtime.\n\nOpción A: Application Migration Service + SCT + 'in-place upgrade' antes de migrar y exportar a Aurora Serverless tras el cutover es un flujo confuso que no garantiza near-zero downtime.\n\nOpción B: DMS con S3 como target y luego cargar de S3 a RDS SQL Server añade un paso intermedio (S3) que no da la replicación continua/cutover de bajo downtime directamente a la BD destino.\n\nOpción C (Correcta): Usar las herramientas NATIVAS de alta disponibilidad de la base de datos, conectar el sistema origen a una instancia Amazon RDS for SQL Server, configurar la replicación y, cuando termine, transicionar la carga a RDS for SQL Server. La replicación nativa permite mantener sincronizado y conmutar con downtime casi cero. Correcta entre las opciones.\n\nOpción D: Application Migration Service a EC2 y luego 'detach/move/reattach' la BD a RDS es un procedimiento manual y disruptivo; no es near-zero downtime.\n\nReferencias:\nhttps://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SQLServer.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30230,
    "questionNumber": 230,
    "question": "A company's solutions architect is analyzing costs of a multi-application environment. The environment is deployed across multiple Availability Zones in a single AWS Region. After a recent acquisition, the company manages two organizations in AWS Organizations. The company has created multiple service provider applications as AWS PrivateLink-powered VPC endpoint services in one organization. The company has created multiple service consumer applications in the other organization. Data transfer charges are much higher than the company expected, and the solutions architect needs to reduce the costs. The solutions architect must recommend guidelines for developers to follow when they deploy services. These guidelines must minimize data transfer charges for the whole environment. Which guidelines meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Resource Access Manager to share the subnets that host the service provider applications with other accounts in the organization.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Place the service provider applications and the service consumer applications in AWS accounts in the same organization.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Turn off cross-zone load balancing for the Network Load Balancer in all service provider application deployments.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Ensure that service consumer compute resources use the Availability Zone-specific endpoint service by using the endpoint's local DNS name.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Create a Savings Plan that provides adequate coverage for the organization's planned inter-Availability Zone data transfer usage.",
        "isCorrect": false
      }
    ],
    "comments": "Costes altos de data transfer entre org proveedor (PrivateLink endpoint services con NLB) y org consumidor. Minimizar cargos de transferencia (el tráfico entre AZ distintas se cobra).\n\nOpción A: Compartir subredes con RAM no reduce el data transfer entre AZ del tráfico PrivateLink; no aplica.\n\nOpción B: Poner proveedor y consumidor en cuentas de la MISMA organización no elimina el cargo de transferencia entre AZ; el cargo es por cruce de AZ, no por organización.\n\nOpción C (Correcta): Desactivar el cross-zone load balancing en el NLB de los service providers. Con cross-zone activado, el NLB puede enviar tráfico a targets en OTRA AZ (cruce de AZ = cargo). Desactivarlo mantiene el tráfico dentro de la misma AZ, reduciendo el data transfer inter-AZ.\n\nOpción D (Correcta): Asegurar que los recursos consumidores usen el endpoint service ESPECÍFICO de su AZ mediante el nombre DNS local del endpoint (zonal DNS). Así el consumidor conecta al ENI del endpoint en su MISMA AZ, evitando el cruce de AZ y su cargo. C + D minimizan la transferencia inter-AZ.\n\nOpción E: Un Savings Plan no cubre data transfer; no reduce esos cargos. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/network/network-load-balancers.html",
    "category": "Optimización de Costes",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30231,
    "questionNumber": 231,
    "question": "A company has an on-premises Microsoft SQL Server database that writes a nightly 200 GB export to a local drive. The company wants to move the backups to more robust cloud storage on Amazon S3. The company has set up a 10 Gbps AWS Direct Connect connection between the on-premises data center and AWS. Which solution meets these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new S3 bucket. Deploy an AWS Storage Gateway file gateway within the VPC that is connected to the Direct Connect connection. Create a new SMB file share. Write nightly database exports to the new SMB file share.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an Amazon FSx for Windows File Server Single-AZ file system within the VPC that is connected to the Direct Connect connection. Create a new SMB file share. Write nightly database exports to an SMB file share on the Amazon FSx file system. Enable nightly backups.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon FSx for Windows File Server Multi-AZ file system within the VPC that is connected to the Direct Connect connection. Create a new SMB file share. Write nightly database exports to an SMB file share on the Amazon FSx file system. Enable nightly backups.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a new S3 bucket. Deploy an AWS Storage Gateway volume gateway within the VPC that is connected to the Direct Connect connection. Create a new SMB file share. Write nightly database exports to the new SMB file share on the volume gateway, and automate copies of this data to an S3 bucket.",
        "isCorrect": false
      }
    ],
    "comments": "Mover un backup nocturno de 200 GB de SQL Server (a disco local) a S3, con Direct Connect de 10 Gbps, de la forma MÁS rentable.\n\nOpción A (Correcta): Crear un bucket S3, desplegar un AWS Storage Gateway FILE gateway en la VPC (conectada al DX), crear un SMB file share y escribir los exports nocturnos ahí. El file gateway presenta un share SMB pero almacena los datos directamente en S3 (respaldo robusto y barato en objetos), sin servidor de ficheros que gestionar. Es la opción más rentable para llevar backups a S3 vía SMB. Correcta.\n\nOpción B/C: FSx for Windows (Single/Multi-AZ) es un sistema de ficheros gestionado más caro que S3 para backups; el requisito es almacenar en S3 de forma rentable. Además Multi-AZ es aún más caro (C).\n\nOpción D: El VOLUME gateway presenta volúmenes iSCSI (no SMB file share), y 'SMB file share en volume gateway' es incorrecto; el file gateway (A) es el que da SMB->S3.\n\nReferencias:\nhttps://docs.aws.amazon.com/filegateway/latest/files3/what-is-file-s3.html\nhttps://docs.aws.amazon.com/filegateway/latest/files3/CreatingAnSMBFileShare.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30232,
    "questionNumber": 232,
    "question": "A company needs to establish a connection from its on-premises data center to AWS. The company needs to connect all of its VPCs that are located in different AWS Regions with transitive routing capabilities between VPC networks. The company also must reduce network outbound traffic costs, increase bandwidth throughput, and provide a consistent network experience for end users. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Site-to-Site VPN connection between the on-premises data center and a new central VPC. Create VPC peering connections that initiate from the central VPC to all other VPCs.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Direct Connect connection between the on-premises data center and AWS. Provision a transit VIF, and connect it to a Direct Connect gateway. Connect the Direct Connect gateway to all the other VPCs by using a transit gateway in each Region.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an AWS Site-to-Site VPN connection between the on-premises data center and a new central VPUse a transit gateway with dynamic routing. Connect the transit gateway to all other VPCs.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Direct Connect connection between the on-premises data center and AWS. Establish an AWS Site-to-Site VPN connection between all VPCs in each Region. Create VPC peering connections that initiate from the central VPC to all other VPCs.",
        "isCorrect": false
      }
    ],
    "comments": "Conectar on-prem a AWS y todas las VPC en distintas Regiones con routing transitivo entre VPCs, reducir el coste de tráfico saliente, aumentar el throughput y experiencia de red consistente.\n\nOpción A: VPN + VPC peering no es transitivo (el peering no permite routing transitivo) y la VPN da menos throughput/consistencia que Direct Connect.\n\nOpción B (Correcta): Direct Connect entre on-prem y AWS, una TRANSIT VIF conectada a un Direct Connect gateway, y conectar el DX gateway a las demás VPC usando un transit gateway en cada Región. DX da throughput alto y experiencia consistente (menor coste de salida que Internet), y los TGW por Región dan routing transitivo entre VPC; el DX gateway une on-prem con los TGW. Cumple todo. Correcta.\n\nOpción C: VPN (no DX) no reduce coste de salida ni da el throughput/consistencia de DX; el requisito favorece DX.\n\nOpción D: DX + VPN entre todas las VPC + peering es una malla compleja y el peering no es transitivo. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-transit-gateways.html\nhttps://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30233,
    "questionNumber": 233,
    "question": "A company is migrating its development and production workloads to a new organization in AWS Organizations. The company has created a separate member account for development and a separate member account for production. Consolidated billing is linked to the management account. In the management account, a solutions architect needs to create an IAM user that can stop or terminate resources in both member accounts. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an IAM user and a cross-account role in the management account. Configure the cross-account role with least privilege access to the member accounts.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an IAM user in each member account. In the management account, create a cross-account role that has least privilege access. Grant the IAM users access to the cross-account role by using a trust policy.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an IAM user in the management account. In the member accounts, create an IAM group that has least privilege access. Add the IAM user from the management account to each IAM group in the member accounts.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an IAM user in the management account. In the member accounts, create cross-account roles that have least privilege access. Grant the IAM user access to the roles by using a trust policy.",
        "isCorrect": true
      }
    ],
    "comments": "Un IAM user en la cuenta de GESTIÓN que pueda parar/terminar recursos en ambas cuentas miembro (dev y prod).\n\nOpción A: Crear el rol cross-account EN la cuenta de gestión no da acceso a las cuentas MIEMBRO; el rol con permisos debe estar en las cuentas miembro (donde están los recursos).\n\nOpción B: Crear IAM users en cada cuenta miembro contradice el modelo (se quiere un solo user en la gestión que asuma roles); usuarios por cuenta es peor.\n\nOpción C: Añadir el IAM user de la gestión a un IAM group de las cuentas miembro no es posible (los grupos son locales a cada cuenta; no se añaden usuarios de otra cuenta). Inválido.\n\nOpción D (Correcta): Crear un IAM user en la cuenta de gestión y, en cada cuenta MIEMBRO, crear cross-account roles con permisos de mínimo privilegio (stop/terminate), concediendo al user de la gestión acceso a esos roles mediante trust policy. El user asume el rol en la cuenta miembro correspondiente para actuar sobre sus recursos. Es el patrón correcto cross-account. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30234,
    "questionNumber": 234,
    "question": "A company wants to use AWS for disaster recovery for an on-premises application. The company has hundreds of Windows-based servers that run the application. All the servers mount a common share. The company has an RTO of 15 minutes and an RPO of 5 minutes. The solution must support native failover and fallback capabilities. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Storage Gateway File Gateway. Schedule daily Windows server backups. Save the data to Amazon S3. During a disaster, recover the on-premises servers from the backup. During tailback, run the on-premises servers on Amazon EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a set of AWS CloudFormation templates to create infrastructure. Replicate all data to Amazon Elastic File System (Amazon EFS) by using AWS DataSync. During a disaster, use AWS CodePipeline to deploy the templates to restore the on-premises servers. Fail back the data by using DataSync.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS Cloud Development Kit (AWS CDK) pipeline to stand up a multi-site active-active environment on AWS. Replicate data into Amazon S3 by using the s3 sync command. During a disaster, swap DNS endpoints to point to AWS. Fail back the data by using the s3 sync command.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Elastic Disaster Recovery to replicate the on-premises servers. Replicate data to an Amazon FSx for Windows File Server file system by using AWS DataSync. Mount the file system to AWS servers. During a disaster, fail over the on-premises servers to AWS. Fail back to new or existing servers by using Elastic Disaster Recovery.",
        "isCorrect": true
      }
    ],
    "comments": "DR de cientos de servidores Windows que montan un share común; RTO 15 min, RPO 5 min, con failover Y fallback nativos, de la forma MÁS rentable.\n\nOpción A: File Gateway + backups diarios da RPO de 1 día (no 5 min) y recuperar cientos de servidores desde backup no cumple RTO 15 min. No cumple.\n\nOpción B: CloudFormation + EFS + DataSync + CodePipeline es un montaje complejo; EFS es NFS (Linux), no el share Windows nativo; y no da failover/fallback nativos.\n\nOpción C: Multi-site activo-activo es caro (no 'más rentable') y s3 sync no replica servidores Windows con RPO 5 min.\n\nOpción D (Correcta): Usar AWS Elastic Disaster Recovery (DRS) para replicar los servidores on-prem (replicación continua, RPO de segundos/minutos y RTO de minutos, con failover Y fallback nativos), y replicar los datos del share a un Amazon FSx for Windows File Server con AWS DataSync (share Windows nativo), montado en los servidores AWS. En un desastre, failover con DRS; fallback con DRS a servidores nuevos/existentes. Cumple RTO/RPO, failover/fallback nativos y es rentable (DRS usa área de staging de bajo coste). Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html\nhttps://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30235,
    "questionNumber": 235,
    "question": "A company has built a high performance computing (HPC) cluster in AWS for a tightly coupled workload that generates a large number of shared files stored in Amazon EFS. The cluster was performing well when the number of Amazon EC2 instances in the cluster was 100. However, when the company increased the cluster size to 1.000 EC2 instances, overall performance was well below expectations. Which collection of design choices should a solutions architect make to achieve the maximum performance from the HPC cluster? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Ensure the HPC cluster is launched within a single Availability Zone.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Launch the EC2 instances and attach elastic network interfaces in multiples of four.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Select EC2 instance types with an Elastic Fabric Adapter (EFA) enabled.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Ensure the cluster is launched across multiple Availability Zones.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Replace Amazon EFS with multiple Amazon EBS volumes in a RAID array.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Replace Amazon EFS with Amazon FSx for Lustre.",
        "isCorrect": true
      }
    ],
    "comments": "Cluster HPC tightly-coupled que rinde mal al escalar a 1000 EC2 con EFS compartido. Máximo rendimiento.\n\nOpción A (Correcta): Lanzar el cluster HPC dentro de una ÚNICA Availability Zone. Para cargas tightly-coupled, mantener todo en una AZ (con cluster placement group) minimiza la latencia de red entre nodos.\n\nOpción B: Adjuntar ENIs 'en múltiplos de cuatro' no es una práctica de rendimiento HPC. Irrelevante.\n\nOpción C (Correcta): Elegir tipos de instancia con Elastic Fabric Adapter (EFA) habilitado. EFA da baja latencia y alto ancho de banda entre nodos (MPI), clave para HPC tightly-coupled a gran escala.\n\nOpción D: Repartir en MÚLTIPLES AZ aumenta la latencia entre nodos (malo para tightly-coupled). Contrario a A.\n\nOpción E: EBS en RAID no es un sistema de ficheros compartido paralelo; no escala como Lustre para HPC.\n\nOpción F (Correcta): Reemplazar EFS por Amazon FSx for Lustre, un sistema de ficheros paralelo de alto rendimiento diseñado para HPC, que escala mucho mejor que EFS con miles de nodos. A + C + F maximizan el rendimiento HPC.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html\nhttps://docs.aws.amazon.com/fsx/latest/LustreGuide/what-is.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30236,
    "questionNumber": 236,
    "question": "A company is designing an AWS Organizations structure. The company wants to standardize a process to apply tags across the entire organization. The company will require tags with specific values when a user creates a new resource. Each of the company's OUs will have unique tag values. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use an SCP to deny the creation of resources that do not have the required tags. Create a tag policy that includes the tag values that the company has assigned to each OU. Attach the tag policies to the OUs.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use an SCP to deny the creation of resources that do not have the required tags. Create a tag policy that includes the tag values that the company has assigned to each OU. Attach the tag policies to the organization's management account.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use an SCP to allow the creation of resources only when the resources have the required tags. Create a tag policy that includes the tag values that the company has assigned to each OU. Attach the tag policies to the OUs.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use an SCP to deny the creation of resources that do not have the required tags. Define the list of tags. Attach the SCP to the OUs.",
        "isCorrect": false
      }
    ],
    "comments": "Estandarizar el etiquetado en toda la organización, requerir tags con valores específicos al crear recursos, y valores de tag ÚNICOS por OU.\n\nOpción A (Correcta): Usar un SCP que DENIEGUE la creación de recursos que no tengan los tags requeridos (control preventivo), y crear TAG POLICIES con los valores de tag asignados a cada OU, adjuntando las tag policies a los OUs. Las tag policies definen/estandarizan los valores permitidos por OU y el SCP fuerza que los recursos lleven los tags. Adjuntar a los OUs permite valores únicos por OU. Correcta.\n\nOpción B: Adjuntar las tag policies a la cuenta de gestión no aplica valores por OU; deben ir en los OUs (A).\n\nOpción C: Un SCP de 'allow only when tags' es un modelo de allow-list complejo y menos directo; el patrón estándar es deny si faltan tags (A).\n\nOpción D: Un SCP con 'lista de tags' sin tag policies no estandariza los VALORES por OU; las tag policies (A) son las que definen valores. Incompleta.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30237,
    "questionNumber": 237,
    "question": "A company has more than 10,000 sensors that send data to an on-premises Apache Kafka server by using the Message Queuing Telemetry Transport (MQTT) protocol. The on-premises Kafka server transforms the data and then stores the results as objects in an Amazon S3 bucket. Recently, the Kafka server crashed. The company lost sensor data while the server was being restored. A solutions architect must create a new design on AWS that is highly available and scalable to prevent a similar occurrence. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Launch two Amazon EC2 instances to host the Kafka server in an active/standby configuration across two Availability Zones. Create a domain name in Amazon Route 53. Create a Route 53 failover policy. Route the sensors to send the data to the domain name.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Migrate the on-premises Kafka server to Amazon Managed Streaming for Apache Kafka (Amazon MSK). Create a Network Load Balancer (NLB) that points to the Amazon MSK broker. Enable NLB health checks. Route the sensors to send the data to the NLB.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy AWS IoT Core, and connect it to an Amazon Kinesis Data Firehose delivery stream. Use an AWS Lambda function to handle data transformation. Route the sensors to send the data to AWS IoT Core.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Deploy AWS IoT Core, and launch an Amazon EC2 instance to host the Kafka server. Configure AWS IoT Core to send the data to the EC2 instance. Route the sensors to send the data to AWS IoT Core.",
        "isCorrect": false
      }
    ],
    "comments": ">10.000 sensores MQTT -> Kafka on-prem (que transforma y guarda en S3) que se cayó y perdió datos. Nueva solución HA y escalable en AWS.\n\nOpción A: Kafka autogestionado en EC2 activo/standby sigue siendo autogestionado y con riesgo de saturación/caída; no es la solución gestionada HA/escalable ideal.\n\nOpción B: Amazon MSK es Kafka gestionado, pero requiere gestionar el clúster/brokers y un NLB delante; más operación que IoT Core + Firehose para ingesta de sensores.\n\nOpción C (Correcta): Desplegar AWS IoT Core (broker MQTT gestionado, HA y masivamente escalable) conectado a un Kinesis Data Firehose, con una Lambda para la transformación de datos, y enrutar los sensores a IoT Core. Firehose entrega a S3 de forma gestionada. Elimina el punto único (Kafka on-prem), es totalmente gestionado, HA y escalable, evitando la pérdida de datos. Correcta.\n\nOpción D: IoT Core + Kafka en EC2 vuelve a introducir el Kafka autogestionado (mismo problema). Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html\nhttps://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30238,
    "questionNumber": 238,
    "question": "A company recently started hosting new application workloads in the AWS Cloud. The company is using Amazon EC2 instances. Amazon Elastic File System (Amazon EFS) file systems, and Amazon RDS DB instances. To meet regulatory and business requirements, the company must make the following changes for data backups: • Backups must be retained based on custom daily, weekly, and monthly requirements. • Backups must be replicated to at least one other AWS Region immediately after capture. • The backup solution must provide a single source of backup status across the AWS environment. • The backup solution must send immediate notifications upon failure of any resource backup. Which combination of steps will meet these requirements with the LEAST amount of operational overhead? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Backup plan with a backup rule for each of the retention requirements.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure an AWS Backup plan to copy backups to another Region.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an AWS Lambda function to replicate backups to another Region and send notification if a failure occurs.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Add an Amazon Simple Notification Service (Amazon SNS) topic to the backup plan to send a notification for finished jobs that have any status except BACKUP_JOB_COMPLETED.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Create an Amazon Data Lifecycle Manager (Amazon DLM) snapshot lifecycle policy for each of the retention requirements.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Set up RDS snapshots on each database.",
        "isCorrect": false
      }
    ],
    "comments": "Backups de EC2/EFS/RDS con retención custom (diaria/semanal/mensual), replicados a otra Región de inmediato, estado único de backup y notificación inmediata ante fallo, con el MENOR overhead.\n\nOpción A (Correcta): Crear un AWS Backup plan con una backup rule para CADA requisito de retención (diaria/semanal/mensual). AWS Backup centraliza y gestiona las retenciones custom.\n\nOpción B (Correcta): Configurar el AWS Backup plan para COPIAR los backups a otra Región (copy to another Region) inmediatamente tras la captura.\n\nOpción C: Una Lambda para replicar y notificar es desarrollo a medida; AWS Backup ya replica (B) y notifica (D) nativamente. Más overhead.\n\nOpción D (Correcta): Añadir un topic SNS al backup plan para notificar los jobs con cualquier estado excepto BACKUP_JOB_COMPLETED (es decir, notificar fallos inmediatamente). A + B + D cubre retención, replicación, estado único (consola de AWS Backup) y notificaciones, con el menor overhead.\n\nOpción E/F: DLM/RDS snapshots por separado fragmenta la solución (no 'single source of backup status'); AWS Backup unifica todo.\n\nReferencias:\nhttps://docs.aws.amazon.com/aws-backup/latest/devguide/creating-a-backup-plan.html\nhttps://docs.aws.amazon.com/aws-backup/latest/devguide/backup-notifications.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30239,
    "questionNumber": 239,
    "question": "A company is developing a gene reporting device that will collect genomic information to assist researchers with collecting large samples of data from a diverse population. The device will push 8 KB of genomic data every second to a data platform that will need to process and analyze the data and provide information back to researchers. The data platform must meet the following requirements: • Provide near-real-time analytics of the inbound genomic data • Ensure the data is flexible, parallel, and durable • Deliver results of processing to a data warehouse Which strategy should a solutions architect use to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Kinesis Data Firehose to collect the inbound sensor data, analyze the data with Kinesis clients, and save the results to an Amazon RDS instance.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon Kinesis Data Streams to collect the inbound sensor data, analyze the data with Kinesis clients, and save the results to an Amazon Redshift cluster using Amazon EMR.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use Amazon S3 to collect the inbound device data, analyze the data from Amazon SQS with Kinesis, and save the results to an Amazon Redshift cluster.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use an Amazon API Gateway to put requests into an Amazon SQS queue, analyze the data with an AWS Lambda function, and save the results to an Amazon Redshift cluster using Amazon EMR.",
        "isCorrect": false
      }
    ],
    "comments": "8 KB/segundo de datos genómicos; near-real-time analytics, datos flexibles/paralelos/durables, y resultados a un data warehouse.\n\nOpción A: Kinesis Data Firehose es para ENTREGA (a S3/Redshift), no para analítica near-real-time con clientes que procesan en paralelo; y RDS no es un data warehouse. Menos adecuada.\n\nOpción B (Correcta): Usar Amazon Kinesis Data Streams para recoger los datos entrantes (streaming durable y paralelo por shards, near-real-time), analizarlos con clientes de Kinesis (KCL, procesamiento paralelo) y guardar los resultados en un clúster Amazon Redshift usando Amazon EMR. Data Streams da el streaming flexible/paralelo/durable near-real-time y Redshift es el data warehouse destino. Cumple todo. Correcta.\n\nOpción C: S3 + SQS + Kinesis es un flujo confuso y no da la analítica near-real-time por streaming como Data Streams.\n\nOpción D: API Gateway -> SQS -> Lambda -> Redshift no es streaming near-real-time paralelo/durable como Kinesis Data Streams para 8 KB/s continuos. Menos idónea.\n\nReferencias:\nhttps://docs.aws.amazon.com/streams/latest/dev/introduction.html\nhttps://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30240,
    "questionNumber": 240,
    "question": "A solutions architect needs to define a reference architecture for a solution for three-tier applications with web. application, and NoSQL data layers. The reference architecture must meet the following requirements: • High availability within an AWS Region • Able to fail over in 1 minute to another AWS Region for disaster recovery • Provide the most efficient solution while minimizing the impact on the user experience Which combination of steps will meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use an Amazon Route 53 weighted routing policy set to 100/0 across the two selected Regions. Set Time to Live (TTL) to 1 hour.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use an Amazon Route 53 failover routing policy for failover from the primary Region to the disaster recovery Region. Set Time to Live (TTL) to 30 seconds.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use a global table within Amazon DynamoDB so data can be accessed in the two selected Regions.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Back up data from an Amazon DynamoDB table in the primary Region every 60 minutes and then write the data to Amazon S3. Use S3 cross-Region replication to copy the data from the primary Region to the disaster recovery Region. Have a script import the data into DynamoDB in a disaster recovery scenario.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Implement a hot standby model using Auto Scaling groups for the web and application layers across multiple Availability Zones in the Regions. Use zonal Reserved Instances for the minimum number of servers and On-Demand Instances for any additional resources.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Use Auto Scaling groups for the web and application layers across multiple Availability Zones in the Regions. Use Spot Instances for the required resources.",
        "isCorrect": false
      }
    ],
    "comments": "Three-tier (web, app, NoSQL) HA dentro de una Región y failover a otra Región en 1 minuto (DR), minimizando impacto en el usuario.\n\nOpción A: Weighted 100/0 con TTL de 1 HORA no permite failover en 1 minuto (el TTL alto retrasa la propagación). No cumple.\n\nOpción B (Correcta): Route 53 con política de FAILOVER (primario -> Región DR) y TTL de 30 segundos, que permite conmutar rápidamente (dentro del minuto) a la Región de DR.\n\nOpción C (Correcta): DynamoDB GLOBAL TABLE para que los datos NoSQL estén accesibles en ambas Regiones (replicación multi-Región, sin importar/exportar), soportando el failover rápido.\n\nOpción D: Backup cada 60 min + S3 CRR + import manual da RPO/RTO altos (no 1 min) y es manual. No cumple.\n\nOpción E (Correcta): Modelo hot standby con Auto Scaling groups para web y app en múltiples AZ de las Regiones, usando Reserved Instances zonales para el mínimo y On-Demand para el resto (eficiente en coste manteniendo capacidad lista). B + C + E logra HA regional y failover en ~1 min con datos replicados.\n\nOpción F: Spot para los recursos requeridos arriesga interrupciones (impacto en usuario); no es 'hot standby' fiable.\n\nReferencias:\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30241,
    "questionNumber": 241,
    "question": "A company manufactures smart vehicles. The company uses a custom application to collect vehicle data. The vehicles use the MQTT protocol to connect to the application. The company processes the data in 5-minute intervals. The company then copies vehicle telematics data to on-premises storage. Custom applications analyze this data to detect anomalies. The number of vehicles that send data grows constantly. Newer vehicles generate high volumes of data. The on-premises storage solution is not able to scale for peak traffic, which results in data loss. The company must modernize the solution and migrate the solution to AWS to resolve the scaling challenges. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS IoT Greengrass to send the vehicle data to Amazon Managed Streaming for Apache Kafka (Amazon MSK). Create an Apache Kafka application to store the data in Amazon S3. Use a pretrained model in Amazon SageMaker to detect anomalies.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS IoT Core to receive the vehicle data. Configure rules to route data to an Amazon Kinesis Data Firehose delivery stream that stores the data in Amazon S3. Create an Amazon Kinesis Data Analytics application that reads from the delivery stream to detect anomalies.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS IoT FleetWise to collect the vehicle data. Send the data to an Amazon Kinesis data stream. Use an Amazon Kinesis Data Firehose delivery stream to store the data in Amazon S3. Use the built-in machine learning transforms in AWS Glue to detect anomalies.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon MQ for RabbitMQ to collect the vehicle data. Send the data to an Amazon Kinesis Data Firehose delivery stream to store the data in Amazon S3. Use Amazon Lookout for Metrics to detect anomalies.",
        "isCorrect": false
      }
    ],
    "comments": "Vehículos MQTT, procesar en intervalos de 5 min, almacenamiento on-prem no escala (pérdida de datos), detectar anomalías. Modernizar en AWS con el MENOR overhead.\n\nOpción A: IoT Greengrass es para edge, y crear una app Kafka + SageMaker con modelo preentrenado es más desarrollo/operación. No es de menor overhead.\n\nOpción B (Correcta): Usar AWS IoT Core para recibir los datos (broker MQTT gestionado y escalable), reglas que enrutan a un Kinesis Data Firehose que almacena en S3 (escalable, sin pérdida), y una aplicación de Amazon Kinesis Data Analytics que lee del stream para detectar anomalías (RANDOM_CUT_FOREST). Totalmente gestionado, escalable y de bajo overhead; resuelve el escalado y la detección de anomalías. Correcta.\n\nOpción C: IoT FleetWise es para recolección específica de datos de vehículos y añade complejidad; Glue ML transforms no es near-real-time para anomalías como Kinesis Data Analytics. Menos idónea.\n\nOpción D: Amazon MQ (RabbitMQ) no es el broker MQTT masivo para vehículos como IoT Core; más operación. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/iot/latest/developerguide/iot-rules.html\nhttps://docs.aws.amazon.com/kinesisanalytics/latest/dev/what-is.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30242,
    "questionNumber": 242,
    "question": "During an audit, a security team discovered that a development team was putting IAM user secret access keys in their code and then committing it to an AWS CodeCommit repository. The security team wants to automatically find and remediate instances of this security vulnerability. Which solution will ensure that the credentials are appropriately secured automatically?",
    "choices": [
      {
        "letter": "A",
        "text": "Run a script nightly using AWS Systems Manager Run Command to search for credentials on the development instances. If found, use AWS Secrets Manager to rotate the credentials",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use a scheduled AWS Lambda function to download and scan the application code from CodeCommit. If credentials are found, generate new credentials and store them in AWS KMS.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure Amazon Macie to scan for credentials in CodeCommit repositories. If credentials are found, trigger an AWS Lambda function to disable the credentials and notify the user.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure a CodeCommit trigger to invoke an AWS Lambda function to scan new code submissions for credentials. If credentials are found, disable them in AWS IAM and notify the user.",
        "isCorrect": true
      }
    ],
    "comments": "Desarrolladores ponen secret access keys de IAM en el código y las suben a CodeCommit; encontrar y remediar automáticamente.\n\nOpción A: Un script nocturno con Run Command busca en las instancias, no en el CÓDIGO de CodeCommit; no ataca el problema (credenciales en el repositorio).\n\nOpción B: Lambda programada que descarga y escanea + guardar nuevas credenciales en KMS no es correcto (KMS no almacena credenciales así) y programada (no en cada commit).\n\nOpción C: Amazon Macie escanea datos sensibles en S3, NO en repositorios CodeCommit; no aplica al código de CodeCommit.\n\nOpción D (Correcta): Configurar un CodeCommit TRIGGER que invoque una Lambda para escanear los nuevos commits en busca de credenciales; si las encuentra, DESHABILITARLAS en IAM y notificar al usuario. Reacciona en cada envío de código (automático) y remedia deshabilitando la credencial expuesta. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/codecommit/latest/userguide/how-to-notify.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30243,
    "questionNumber": 243,
    "question": "A company has a data lake in Amazon S3 that needs to be accessed by hundreds of applications across many AWS accounts. The company's information security policy states that the S3 bucket must not be accessed over the public internet and that each application should have the minimum permissions necessary to function. To meet these requirements, a solutions architect plans to use an S3 access point that is restricted to specific VPCs for each application. Which combination of steps should the solutions architect take to implement this solution? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an S3 access point for each application in the AWS account that owns the S3 bucket. Configure each access point to be accessible only from the application’s VPC. Update the bucket policy to require access from an access point.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an interface endpoint for Amazon S3 in each application's VPC. Configure the endpoint policy to allow access to an S3 access point. Create a VPC gateway attachment for the S3 endpoint.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a gateway endpoint for Amazon S3 in each application's VPConfigure the endpoint policy to allow access to an S3 access point. Specify the route table that is used to access the access point.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an S3 access point for each application in each AWS account and attach the access points to the S3 bucket. Configure each access point to be accessible only from the application's VPC. Update the bucket policy to require access from an access point.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Create a gateway endpoint for Amazon S3 in the data lake's VPC. Attach an endpoint policy to allow access to the S3 bucket. Specify the route table that is used to access the bucket.",
        "isCorrect": false
      }
    ],
    "comments": "Data lake en S3 accedido por cientos de apps en muchas cuentas; sin acceso por Internet y mínimo privilegio por app, usando S3 access points restringidos por VPC.\n\nOpción A (Correcta): Crear un S3 access point por aplicación en la cuenta DUEÑA del bucket, configurar cada access point para ser accesible SOLO desde la VPC de esa app (VPC restriction) y actualizar la bucket policy para requerir acceso a través de un access point. Cada app tiene su access point con permisos mínimos.\n\nOpción B: 'VPC gateway attachment for the S3 endpoint' no existe; y para S3 desde la VPC el patrón sin Internet es un GATEWAY endpoint (C), no interface con 'gateway attachment'. Incorrecta.\n\nOpción C (Correcta): Crear un GATEWAY endpoint de S3 en la VPC de cada app, con endpoint policy que permita el acceso al access point, especificando la route table. El gateway endpoint mantiene el tráfico a S3 dentro de la red de AWS (sin Internet). A + C: access points por VPC + gateway endpoints por VPC.\n\nOpción D: Crear access points en CADA cuenta y 'adjuntarlos al bucket' no es cómo funciona (los access points de un bucket se crean en la cuenta del bucket, A). Incorrecta.\n\nOpción E: Un gateway endpoint solo en la VPC del data lake no da acceso privado desde las VPC de las apps. Insuficiente.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30244,
    "questionNumber": 244,
    "question": "A company has developed a hybrid solution between its data center and AWS. The company uses Amazon VPC and Amazon EC2 instances that send application logs to Amazon CloudWatch. The EC2 instances read data from multiple relational databases that are hosted on premises. The company wants to monitor which EC2 instances are connected to the databases in near-real time. The company already has a monitoring solution that uses Splunk on premises. A solutions architect needs to determine how to send networking traffic to Splunk. How should the solutions architect meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Enable VPC flows logs, and send them to CloudWatch. Create an AWS Lambda function to periodically export the CloudWatch logs to an Amazon S3 bucket by using the pre-defined export function. Generate ACCESS_KEY and SECRET_KEY AWS credentials. Configure Splunk to pull the logs from the S3 bucket by using those credentials.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon Kinesis Data Firehose delivery stream with Splunk as the destination. Configure a pre-processing AWS Lambda function with a Kinesis Data Firehose stream processor that extracts individual log events from records sent by CloudWatch Logs subscription filters. Enable VPC flows logs, and send them to CloudWatch. Create a CloudWatch Logs subscription that sends log events to the Kinesis Data Firehose delivery stream.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Ask the company to log every request that is made to the databases along with the EC2 instance IP address. Export the CloudWatch logs to an Amazon S3 bucket. Use Amazon Athena to query the logs grouped by database name. Export Athena results to another S3 bucket. Invoke an AWS Lambda function to automatically send any new file that is put in the S3 bucket to Splunk.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Send the CloudWatch logs to an Amazon Kinesis data stream with Amazon Kinesis Data Analytics for SQL Applications. Configure a 1-minute sliding window to collect the events. Create a SQL query that uses the anomaly detection template to monitor any networking traffic anomalies in near-real time. Send the result to an Amazon Kinesis Data Firehose delivery stream with Splunk as the destination.",
        "isCorrect": false
      }
    ],
    "comments": "Monitorizar en near-real-time qué EC2 se conectan a bases on-prem, enviando el tráfico de red a un Splunk on-prem existente.\n\nOpción A: Exportar CloudWatch Logs a S3 periódicamente y que Splunk haga pull con access keys es batch (no near-real-time) y usa credenciales estáticas. No cumple near-real-time.\n\nOpción B (Correcta): Crear un Kinesis Data Firehose con Splunk como destino, con una Lambda de preprocesado (Firehose stream processor) que extrae los eventos de log individuales de los registros de CloudWatch Logs subscription filters; habilitar VPC Flow Logs enviados a CloudWatch, y una CloudWatch Logs subscription que envía los eventos al Firehose. Firehose entrega en near-real-time a Splunk (integración nativa) el tráfico de red (VPC Flow Logs). Es el patrón correcto para streaming de logs a Splunk. Correcta.\n\nOpción C: 'Pedir a la empresa que loguee cada request' + Athena + Lambda es batch y no near-real-time.\n\nOpción D: Kinesis Data Analytics con anomaly detection es para detectar anomalías, no simplemente enviar el tráfico a Splunk; añade complejidad innecesaria.\n\nReferencias:\nhttps://docs.aws.amazon.com/firehose/latest/dev/create-destination.html\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30245,
    "questionNumber": 245,
    "question": "A company has five development teams that have each created five AWS accounts to develop and host applications. To track spending, the development teams log in to each account every month, record the current cost from the AWS Billing and Cost Management console, and provide the information to the company's finance team. The company has strict compliance requirements and needs to ensure that resources are created only in AWS Regions in the United States. However, some resources have been created in other Regions. A solutions architect needs to implement a solution that gives the finance team the ability to track and consolidate expenditures for all the accounts. The solution also must ensure that the company can create resources only in Regions in the United States. Which combination of steps will meet these requirements in the MOST operationally efficient way? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new account to serve as a management account. Create an Amazon S3 bucket for the finance team. Use AWS Cost and Usage Reports to create monthly reports and to store the data in the finance team's S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a new account to serve as a management account. Deploy an organization in AWS Organizations with all features enabled. Invite all the existing accounts to the organization. Ensure that each account accepts the invitation.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an OU that includes all the development teams. Create an SCP that allows the creation of resources only in Regions that are in the United States. Apply the SCP to the OU.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an OU that includes all the development teams. Create an SCP that denies the creation of resources in Regions that are outside the United States. Apply the SCP to the OU.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Create an IAM role in the management account. Attach a policy that includes permissions to view the Billing and Cost Management console. Allow the finance team users to assume the role. Use AWS Cost Explorer and the Billing and Cost Management console to analyze cost.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Create an IAM role in each AWS account. Attach a policy that includes permissions to view the Billing and Cost Management console. Allow the finance team users to assume the role.",
        "isCorrect": false
      }
    ],
    "comments": "Consolidar/rastrear gastos de 25 cuentas y forzar creación de recursos solo en Regiones de EE. UU., de la forma MÁS eficiente operativamente.\n\nOpción A: CUR a un bucket es una forma de reporting, pero E (rol en la gestión + Cost Explorer/Billing) es más directo y operativamente eficiente para 'rastrear/consolidar'; A no es de las tres elegidas.\n\nOpción B (Correcta): Crear una cuenta de gestión, desplegar una organización en AWS Organizations con TODAS las features e invitar/aceptar todas las cuentas. Base para consolidar facturación y aplicar SCPs.\n\nOpción C: Un SCP que 'permite crear solo en Regiones de EE. UU.' (allow-list) es más frágil; el patrón recomendado es DENEGAR fuera de EE. UU. (D).\n\nOpción D (Correcta): Crear un OU con los equipos de desarrollo y un SCP que DENIEGA la creación de recursos en Regiones fuera de EE. UU., aplicado al OU. Control preventivo de residencia por Región.\n\nOpción E (Correcta): Crear un IAM role en la cuenta de gestión con permisos de Billing/Cost Management, que el equipo de finanzas asume, usando Cost Explorer y la consola de Billing para analizar el coste consolidado. B + D + E: consolidación (Organizations + rol en gestión) y control de Región por SCP de deny.\n\nOpción F: Un rol en CADA cuenta para ver Billing es menos eficiente que consolidar en la cuenta de gestión (E).\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples_general.html\nhttps://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ce-what-is.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30246,
    "questionNumber": 246,
    "question": "A company needs to create and manage multiple AWS accounts for a number of departments from a central location. The security team requires read-only access to all accounts from its own AWS account. The company is using AWS Organizations and created an account for the security team. How should a solutions architect meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use the OrganizationAccountAccessRole IAM role to create a new IAM policy with read-only access in each member account. Establish a trust relationship between the IAM policy in each member account and the security account. Ask the security team to use the IAM policy to gain access.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use the OrganizationAccountAccessRole IAM role to create a new IAM role with read-only access in each member account. Establish a trust relationship between the IAM role in each member account and the security account. Ask the security team to use the IAM role to gain access.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Ask the security team to use AWS Security Token Service (AWS STS) to call the AssumeRole API for the OrganizationAccountAccessRole IAM role in the management account from the security account. Use the generated temporary credentials to gain access.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Ask the security team to use AWS Security Token Service (AWS STS) to call the AssumeRole API for the OrganizationAccountAccessRole IAM role in the member account from the security account. Use the generated temporary credentials to gain access.",
        "isCorrect": false
      }
    ],
    "comments": "El equipo de seguridad (su propia cuenta) necesita acceso de SOLO LECTURA a todas las cuentas miembro. Se usa OrganizationAccountAccessRole.\n\nOpción A: 'Usar OrganizationAccountAccessRole para crear una IAM POLICY con read-only' mezcla conceptos: se crea un ROL (no una policy que se 'asume'); B es lo correcto.\n\nOpción B (Correcta): Usar el rol OrganizationAccountAccessRole (que la gestión tiene en cada miembro) para crear en cada cuenta miembro un nuevo IAM ROLE con acceso de solo lectura, estableciendo una relación de confianza entre ese rol de cada miembro y la cuenta de seguridad, y que el equipo de seguridad asuma ese rol para acceder. Es el patrón correcto de acceso cross-account de solo lectura a las cuentas miembro. Correcta.\n\nOpción C: Asumir OrganizationAccountAccessRole en la cuenta de GESTIÓN no da acceso a las cuentas MIEMBRO. Incorrecta.\n\nOpción D: Asumir directamente OrganizationAccountAccessRole en la cuenta miembro da acceso de ADMINISTRADOR (ese rol es admin), no de solo lectura; el requisito es read-only, por lo que hay que crear un rol read-only (B).\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30247,
    "questionNumber": 247,
    "question": "A large company runs workloads in VPCs that are deployed across hundreds of AWS accounts. Each VPC consists of public subnets and private subnets that span across multiple Availability Zones. NAT gateways are deployed in the public subnets and allow outbound connectivity to the internet from the private subnets. A solutions architect is working on a hub-and-spoke design. All private subnets in the spoke VPCs must route traffic to the internet through an egress VPC. The solutions architect already has deployed a NAT gateway in an egress VPC in a central AWS account. Which set of additional steps should the solutions architect take to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create peering connections between the egress VPC and the spoke VPCs. Configure the required routing to allow access to the internet.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a transit gateway, and share it with the existing AWS accounts. Attach existing VPCs to the transit gateway. Configure the required routing to allow access to the internet.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a transit gateway in every account. Attach the NAT gateway to the transit gateways. Configure the required routing to allow access to the internet.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS PrivateLink connection between the egress VPC and the spoke VPCs. Configure the required routing to allow access to the internet.",
        "isCorrect": false
      }
    ],
    "comments": "Diseño hub-and-spoke: todas las subredes privadas de las VPC spoke deben salir a Internet a través de un NAT gateway en una VPC egress central (cientos de cuentas).\n\nOpción A: VPC peering entre la egress VPC y cada spoke no es transitivo ni escala a cientos de VPC; y el peering no permite usar el NAT de otra VPC de forma transitiva. No aplica.\n\nOpción B (Correcta): Crear un transit gateway y compartirlo con las cuentas existentes (RAM), adjuntar las VPC al TGW y configurar el routing para que las subredes privadas de los spokes salgan por la egress VPC (donde está el NAT gateway). El TGW enruta de forma transitiva y escalable el egress centralizado. Es el patrón hub-and-spoke correcto. Correcta.\n\nOpción C: Un TGW en cada cuenta y 'adjuntar el NAT gateway a los TGW' no es cómo funciona (el NAT no se adjunta a un TGW); un TGW central compartido (B) es lo correcto.\n\nOpción D: PrivateLink expone servicios, no da salida a Internet centralizada para subredes privadas. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/tgw/tgw-nat-gateway.html\nhttps://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30248,
    "questionNumber": 248,
    "question": "An education company is running a web application used by college students around the world. The application runs in an Amazon Elastic Container Service (Amazon ECS) cluster in an Auto Scaling group behind an Application Load Balancer (ALB). A system administrator detects a weekly spike in the number of failed login attempts, which overwhelm the application's authentication service. All the failed login attempts originate from about 500 different IP addresses that change each week. A solutions architect must prevent the failed login attempts from overwhelming the authentication service. Which solution meets these requirements with the MOST operational efficiency?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Firewall Manager to create a security group and security group policy to deny access from the IP addresses.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS WAF web ACL with a rate-based rule, and set the rule action to Block. Connect the web ACL to the ALB.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS Firewall Manager to create a security group and security group policy to allow access only to specific CIDR ranges.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS WAF web ACL with an IP set match rule, and set the rule action to Block. Connect the web ACL to the ALB.",
        "isCorrect": false
      }
    ],
    "comments": "Pico semanal de intentos de login fallidos desde ~500 IPs que CAMBIAN cada semana, saturando la autenticación (tras un ALB). Prevenir con la MAYOR eficiencia operativa.\n\nOpción A/C: Firewall Manager con security groups por IP requiere mantener la lista de IPs (que cambian cada semana); mucho mantenimiento y los SG no hacen rate limiting.\n\nOpción B (Correcta): Crear un AWS WAF web ACL con una regla RATE-BASED en acción Block, conectada al ALB. La rate-based rule bloquea automáticamente las IPs que superan un umbral de peticiones, sin necesidad de conocer/actualizar las IPs (que cambian). Maneja los picos de logins fallidos con la mayor eficiencia operativa (sin listas que mantener). Correcta.\n\nOpción D: Una regla de IP set match requiere mantener la lista de ~500 IPs que cambian cada semana; alto mantenimiento. La rate-based (B) es superior.\n\nReferencias:\nhttps://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based.html\nhttps://docs.aws.amazon.com/waf/latest/developerguide/web-acl.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30249,
    "questionNumber": 249,
    "question": "A company operates an on-premises software-as-a-service (SaaS) solution that ingests several files daily. The company provides multiple public SFTP endpoints to its customers to facilitate the file transfers. The customers add the SFTP endpoint IP addresses to their firewall allow list for outbound traffic. Changes to the SFTP endpoint IP addresses are not permitted. The company wants to migrate the SaaS solution to AWS and decrease the operational overhead of the file transfer service. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Register the customer-owned block of IP addresses in the company's AWS account. Create Elastic IP addresses from the address pool and assign them to an AWS Transfer for SFTP endpoint. Use AWS Transfer to store the files in Amazon S3.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Add a subnet containing the customer-owned block of IP addresses to a VPC. Create Elastic IP addresses from the address pool and assign them to an Application Load Balancer (ALB). Launch EC2 instances hosting FTP services in an Auto Scaling group behind the ALStore the files in attached Amazon Elastic Block Store (Amazon EBS) volumes.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Register the customer-owned block of IP addresses with Amazon Route 53. Create alias records in Route 53 that point to a Network Load Balancer (NLB). Launch EC2 instances hosting FTP services in an Auto Scaling group behind the NLB. Store the files in Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Register the customer-owned block of IP addresses in the company’s AWS account. Create Elastic IP addresses from the address pool and assign them to an Amazon S3 VPC endpoint. Enable SFTP support on the S3 bucket.",
        "isCorrect": false
      }
    ],
    "comments": "SaaS con SFTP y IPs FIJAS que los clientes tienen en su allow list (no se pueden cambiar); migrar a AWS reduciendo el overhead del servicio de transferencia.\n\nOpción A (Correcta): Registrar el bloque de IPs propias del cliente (BYOIP) en la cuenta AWS, crear Elastic IP de ese pool y asignarlas a un endpoint de AWS Transfer for SFTP, que almacena en S3. AWS Transfer Family es gestionado (bajo overhead) y BYOIP + EIP mantiene las IPs FIJAS que los clientes ya tienen en su allow list. Cumple IPs fijas y menor overhead. Correcta.\n\nOpción B: EC2 con FTP en ASG detrás de ALB es autogestionado (más overhead) y EBS no es el almacenamiento idóneo; no reduce operación.\n\nOpción C: NLB + EC2 FTP autogestionado también mantiene servidores; y 'registrar IPs propias en Route 53' no fija IPs de servicio como BYOIP+EIP.\n\nOpción D: 'Asignar EIP a un S3 VPC endpoint' y 'SFTP support en el bucket' no existe; S3 no expone SFTP directamente (eso es AWS Transfer). Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html\nhttps://docs.aws.amazon.com/vpc/latest/userguide/vpc-byoip.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30250,
    "questionNumber": 250,
    "question": "A company has a new application that needs to run on five Amazon EC2 instances in a single AWS Region. The application requires high-throughput, low-latency network connections between all of the EC2 instances where the application will run. There is no requirement for the application to be fault tolerant. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Launch five new EC2 instances into a cluster placement group. Ensure that the EC2 instance type supports enhanced networking.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Launch five new EC2 instances into an Auto Scaling group in the same Availability Zone. Attach an extra elastic network interface to each EC2 instance.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Launch five new EC2 instances into a partition placement group. Ensure that the EC2 instance type supports enhanced networking.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Launch five new EC2 instances into a spread placement group. Attach an extra elastic network interface to each EC2 instance.",
        "isCorrect": false
      }
    ],
    "comments": "5 EC2 en una Región que necesitan red de ALTO throughput y BAJA latencia entre todas; NO se requiere tolerancia a fallos.\n\nOpción A (Correcta): Lanzar las 5 EC2 en un CLUSTER placement group y asegurar que el tipo de instancia soporta enhanced networking. El cluster placement group agrupa las instancias en la misma AZ con interconexión de baja latencia y alto ancho de banda entre ellas (ideal para HPC/red intensiva). Como no se requiere tolerancia a fallos, concentrarlas es aceptable. Cumple alto throughput/baja latencia. Correcta.\n\nOpción B: Un ASG en una AZ con ENIs extra no garantiza la proximidad/interconexión de baja latencia del cluster placement group.\n\nOpción C: Un PARTITION placement group reparte en particiones (para tolerancia a fallos de grandes cargas distribuidas), no optimiza la latencia entre todas las instancias como el cluster PG.\n\nOpción D: Un SPREAD placement group separa las instancias en hardware distinto (para tolerancia a fallos), lo que AUMENTA la latencia entre ellas; contrario al requisito.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  }
];
