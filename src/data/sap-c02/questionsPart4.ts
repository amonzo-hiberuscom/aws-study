import { Question } from '../../types';

export const QUESTIONS_PART_4: Question[] = [
  {
    "id": 30397,
    "questionNumber": 397,
    "question": "A company needs to store and process image data that will be uploaded from mobile devices using a custom mobile app. Usage peaks between 8 AM and 5 PM on weekdays, with thousands of uploads per minute. The app is rarely used at any other time. A user is notified when image processing is complete. Which combination of actions should a solutions architect take to ensure image processing can scale to handle the load? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Upload files from the mobile software directly to Amazon S3. Use S3 event notifications to create a message in an Amazon MQ queue.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Upload files from the mobile software directly to Amazon S3. Use S3 event notifications to create a message in an Amazon Simple Queue Service (Amazon SQS) standard queue.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Invoke an AWS Lambda function to perform image processing when a message is available in the queue.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Invoke an S3 Batch Operations job to perform image processing when a message is available in the queue.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Send a push notification to the mobile app by using Amazon Simple Notification Service (Amazon SNS) when processing is complete.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Send a push notification to the mobile app by using Amazon Simple Email Service (Amazon SES) when processing is complete.",
        "isCorrect": false
      }
    ],
    "comments": "Procesado de imágenes subidas desde móvil con picos (miles/min en horario laboral) y notificación al terminar; escalar el procesamiento (elegir tres).\n\nOpción A: Subir a S3 y notificar a Amazon MQ añade un broker que hay que gestionar; SQS es más simple y elástico para desacoplar.\nOpción B (Correcta): Subir directo a S3 y usar S3 event notifications para encolar en una cola SQS estándar desacopla y absorbe los picos.\nOpción C (Correcta): Invocar una Lambda que procesa la imagen cuando hay mensaje en la cola escala automáticamente con la carga.\nOpción D: S3 Batch Operations es para operaciones masivas sobre objetos existentes, no para procesar por evento desde una cola.\nOpción E (Correcta): Enviar una push notification a la app con Amazon SNS al completar el procesamiento es el mecanismo adecuado.\nOpción F: Amazon SES es email, no push notifications a la app móvil.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30398,
    "questionNumber": 398,
    "question": "A company is building an application on AWS. The application sends logs to an Amazon OpenSearch Service cluster for analysis. All data must be stored within a VPC. Some of the company’s developers work from home. Other developers work from three different company office locations. The developers need to access OpenSearch Service to analyze and visualize logs directly from their local development machines. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure and set up an AWS Client VPN endpoint. Associate the Client VPN endpoint with a subnet in the VPC. Configure a Client VPN self-service portal. Instruct the developers to connect by using the client for Client VPN.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a transit gateway, and connect it to the VPC. Create an AWS Site-to-Site VPN. Create an attachment to the transit gateway. Instruct the developers to connect by using an OpenVPN client.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a transit gateway, and connect it to the VPOrder an AWS Direct Connect connection. Set up a public VIF on the Direct Connect connection. Associate the public VIF with the transit gateway. Instruct the developers to connect to the Direct Connect connection.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create and configure a bastion host in a public subnet of the VPC. Configure the bastion host security group to allow SSH access from the company CIDR ranges. Instruct the developers to connect by using SSH.",
        "isCorrect": false
      }
    ],
    "comments": "Desarrolladores (en casa y en 3 oficinas) que deben acceder a OpenSearch dentro de una VPC desde sus máquinas locales; los datos deben quedarse en la VPC.\n\nOpción A (Correcta): AWS Client VPN (endpoint asociado a una subred de la VPC) con portal self-service permite a los desarrolladores conectarse desde cualquier ubicación a la red privada y alcanzar OpenSearch, sin exponerlo a Internet y con mínimo overhead.\nOpción B: Transit Gateway + Site-to-Site VPN conecta redes de sitios fijos, no máquinas individuales de trabajadores remotos en casa; no encaja bien.\nOpción C: Transit Gateway + Direct Connect con public VIF es caro, lento de aprovisionar y el public VIF no da acceso privado a la VPC de este modo.\nOpción D: Un bastion con SSH no permite usar los dashboards de OpenSearch desde el navegador local de forma práctica y añade superficie de ataque.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html\nhttps://docs.aws.amazon.com/opensearch-service/latest/developerguide/vpc.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30399,
    "questionNumber": 399,
    "question": "A company wants to migrate its website from an on-premises data center onto AWS. At the same time, it wants to migrate the website to a containerized microservice-based architecture to improve the availability and cost efficiency. The company’s security policy states that privileges and network permissions must be configured according to best practice, using least privilege. A solutions architect must create a containerized architecture that meets the security requirements and has deployed the application to an Amazon ECS cluster. What steps are required after the deployment to meet the requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create tasks using the bridge network mode.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create tasks using the awsvpc network mode.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Apply security groups to Amazon EC2 instances, and use IAM roles for EC2 instances to access other resources.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Apply security groups to the tasks, and pass IAM credentials into the container at launch time to access other resources.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Apply security groups to the tasks, and use IAM roles for tasks to access other resources.",
        "isCorrect": true
      }
    ],
    "comments": "App containerizada en Amazon ECS con seguridad de MÍNIMO privilegio en permisos y red (elegir dos).\n\nOpción A: El modo de red bridge comparte la ENI del host y no permite security groups por tarea; menos granularidad de red.\nOpción B (Correcta): El modo awsvpc asigna a cada tarea su propia ENI, permitiendo aplicar security groups a nivel de tarea (aislamiento de red de mínimo privilegio).\nOpción C: Usar IAM roles a nivel de instancia EC2 concede permisos a todas las tareas del host; no es mínimo privilegio por tarea.\nOpción D: Pasar credenciales IAM al contenedor en el arranque es una mala práctica de seguridad; se deben usar roles de tarea.\nOpción E (Correcta): Aplicar security groups a las tareas (posible con awsvpc) y usar IAM roles for tasks da permisos específicos por tarea. Mínimo privilegio en red e IAM.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking.html\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30400,
    "questionNumber": 400,
    "question": "A company is running a serverless application that consists of several AWS Lambda functions and Amazon DynamoDB tables. The company has created new functionality that requires the Lambda functions to access an Amazon Neptune DB cluster. The Neptune DB cluster is located in three subnets in a VPC. Which of the possible solutions will allow the Lambda functions to access the Neptune DB cluster and DynamoDB tables? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create three public subnets in the Neptune VPC, and route traffic through an internet gateway. Host the Lambda functions in the three new public subnets.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create three private subnets in the Neptune VPC, and route internet traffic through a NAT gateway. Host the Lambda functions in the three new private subnets.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Host the Lambda functions outside the VPUpdate the Neptune security group to allow access from the IP ranges of the Lambda functions.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Host the Lambda functions outside the VPC. Create a VPC endpoint for the Neptune database, and have the Lambda functions access Neptune over the VPC endpoint.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Create three private subnets in the Neptune VPC. Host the Lambda functions in the three new isolated subnets. Create a VPC endpoint for DynamoDB, and route DynamoDB traffic to the VPC endpoint.",
        "isCorrect": true
      }
    ],
    "comments": "Lambdas que deben acceder a un clúster Neptune (en subredes de una VPC) y también a DynamoDB; para hablar con Neptune la Lambda debe estar EN la VPC (elegir dos).\n\nOpción A: Alojar Lambdas en subredes públicas con ruta a internet gateway no es un patrón válido/seguro para Lambda; Lambda no obtiene IP pública así.\nOpción B (Correcta): Crear subredes privadas en la VPC de Neptune con NAT gateway para salida a Internet y alojar allí las Lambdas les da acceso a Neptune (dentro de la VPC) y a servicios públicos vía NAT.\nOpción C: Lambdas fuera de la VPC no alcanzan Neptune (endpoint privado en la VPC); permitir por rangos de IP de Lambda no es fiable ni posible.\nOpción D: No existe un VPC endpoint (PrivateLink) para Neptune que permita a una Lambda fuera de la VPC acceder al clúster de ese modo.\nOpción E (Correcta): Lambdas en subredes privadas aisladas de la VPC de Neptune y un VPC endpoint (gateway) para DynamoDB permite acceder a DynamoDB sin salir a Internet, además de a Neptune dentro de la VPC.\n\nReferencias:\nhttps://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/vpc-endpoints-dynamodb.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30401,
    "questionNumber": 401,
    "question": "A company wants to design a disaster recovery (DR) solution for an application that runs in the company’s data center. The application writes to an SMB file share and creates a copy on a second file share. Both file shares are in the data center. The application uses two types of files: metadata files and image files. The company wants to store the copy on AWS. The company needs the ability to use SMB to access the data from either the data center or AWS if a disaster occurs. The copy of the data is rarely accessed but must be available within 5 minutes.",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy AWS Outposts with Amazon S3 storage. Configure a Windows Amazon EC2 instance on Outposts as a file server.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy an Amazon FSx File Gateway. Configure an Amazon FSx for Windows File Server Multi-AZ file system that uses SSD storage.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy an Amazon S3 File Gateway. Configure the S3 File Gateway to use Amazon S3 Standard-Infrequent Access (S3 Standard-IA) for the metadata files and to use S3 Glacier Deep Archive for the image files.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy an Amazon S3 File Gateway. Configure the S3 File Gateway to use Amazon S3 Standard-Infrequent Access (S3 Standard-IA) for the metadata files and image files.",
        "isCorrect": true
      }
    ],
    "comments": "DR de una app on-premises que escribe en SMB (ficheros de metadatos e imágenes); guardar la copia en AWS, accesible por SMB desde el DC o desde AWS, raramente accedida pero disponible en <5 min.\n\nOpción A: AWS Outposts con EC2 Windows es caro y de alto overhead para una copia de DR raramente accedida.\nOpción B: FSx File Gateway + FSx for Windows Multi-AZ con SSD es sobredimensionado y costoso para datos rara vez accedidos.\nOpción C: S3 File Gateway con Glacier Deep Archive para las imágenes NO cumple \"disponible en 5 minutos\" (Deep Archive tarda horas en restaurar).\nOpción D (Correcta): S3 File Gateway con S3 Standard-IA tanto para metadatos como para imágenes ofrece acceso SMB, coste bajo para datos poco accedidos y disponibilidad inmediata (<5 min), cumpliendo el objetivo.\n\nReferencias:\nhttps://docs.aws.amazon.com/filegateway/latest/files3/what-is-file-s3.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30402,
    "questionNumber": 402,
    "question": "A company is creating a solution that can move 400 employees into a remote working environment in the event of an unexpected disaster. The user desktops have a mix of Windows and Linux operating systems. Multiple types of software, such as web browsers and mail clients, are installed on each desktop. A solutions architect needs to implement a solution that can be integrated with the company’s on-premises Active Directory to allow employees to use their existing identity credentials. The solution must provide multifactor authentication (MFA) and must replicate the user experience from the existing desktops. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon WorkSpaces for the cloud desktop service. Set up a VPN connection to the on-premises network. Create an AD Connector, and connect to the on-premises Active Directory. Activate MFA for Amazon WorkSpaces by using the AWS Management Console.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon AppStream 2.0 as an application streaming service. Configure Desktop View for the employees. Set up a VPN connection to the on-premises network. Set up Active Directory Federation Services (AD FS) on premises. Connect the VPC network to AD FS through the VPN connection.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon WorkSpaces for the cloud desktop service. Set up a VPN connection to the on-premises network. Create an AD Connector, and connect to the on-premises Active Directory. Configure a RADIUS server for MFA.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use Amazon AppStream 2.0 as an application streaming service. Set up Active Directory Federation Services on premises. Configure MFA to grant users access on AppStream 2.0.",
        "isCorrect": false
      }
    ],
    "comments": "DR de puestos de trabajo: 400 empleados con escritorios Windows y Linux, software variado, integración con AD on-premises, MFA y misma experiencia de escritorio.\n\nOpción A: Amazon WorkSpaces con AD Connector es correcto, pero activar MFA \"desde la consola\" no es el mecanismo real; el MFA de WorkSpaces con AD Connector se hace con RADIUS.\nOpción B: AppStream 2.0 hace streaming de aplicaciones, no reproduce la experiencia completa de escritorio Windows/Linux del usuario.\nOpción C (Correcta): Amazon WorkSpaces (escritorios Windows y Linux gestionados) con VPN al on-premises, AD Connector hacia el AD existente (credenciales actuales) y un servidor RADIUS para MFA. Reproduce la experiencia de escritorio con MFA e identidad corporativa.\nOpción D: AppStream 2.0 no da escritorios completos ni replica la experiencia de los puestos existentes.\n\nReferencias:\nhttps://docs.aws.amazon.com/workspaces/latest/adminguide/amazon-workspaces.html\nhttps://docs.aws.amazon.com/workspaces/latest/adminguide/mfa-integration.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30403,
    "questionNumber": 403,
    "question": "A company has deployed an Amazon Connect contact center. Contact center agents are reporting large numbers of computer-generated calls. The company is concerned about the cost and productivity effects of these calls. The company wants a solution that will allow agents to flag the call as spam and automatically block the numbers from going to an agent in the future. What is the MOST operationally efficient solution to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Customize the Contact Control Panel (CCP) by adding a flag call button that will invoke an AWS Lambda function that calls the UpdateContactAttributes API. Use an Amazon DynamoDB table to store the spam numbers. Modify the contact flows to look for the updated attribute and to use a Lambda function to read and write to the DynamoDB table.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use a Contact Lens for Amazon Connect rule that will look for spam calls. Use an Amazon DynamoDB table to store the spam numbers. Modify the contact flows to look for the rule and to invoke an AWS Lambda function to read and write to the DynamoDB table.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use an Amazon DynamoDB table to store the spam numbers. Create a quick connect that the agents can transfer the spam call to from the Contact Control Panel (CCP). Modify the quick connect contact flow to invoke an AWS Lambda function to write to the DynamoDB table.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Modify the initial contact flow to ask for caller input. If the agent does not receive input, the agent should mark the caller as spam. Use an Amazon DynamoDB table to store the spam numbers. Use an AWS Lambda function to read and write to the DynamoDB table.",
        "isCorrect": false
      }
    ],
    "comments": "Amazon Connect con muchas llamadas spam; los agentes deben poder MARCAR una llamada como spam y bloquear ese número en el futuro, de forma MÁS eficiente operativamente.\n\nOpción A (Correcta): Personalizar el Contact Control Panel (CCP) con un botón que invoque una Lambda (UpdateContactAttributes), almacenar los números spam en DynamoDB y modificar los contact flows para leer/escribir en DynamoDB vía Lambda y desviar futuras llamadas de esos números. Permite el flag manual del agente y el bloqueo automático.\nOpción B: Contact Lens analiza conversaciones (sentimiento/palabras), no permite que el agente marque un número como spam para bloquearlo; no encaja con el requisito de flag manual.\nOpción C: Un quick connect para transferir la llamada spam es un rodeo poco eficiente y no bloquea automáticamente futuras llamadas del número.\nOpción D: Pedir input al llamante para inferir spam es indirecto, degrada la experiencia y no cumple el flag directo del agente.\n\nReferencias:\nhttps://docs.aws.amazon.com/connect/latest/adminguide/what-is-amazon-connect.html\nhttps://docs.aws.amazon.com/connect/latest/adminguide/contact-attributes.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30404,
    "questionNumber": 404,
    "question": "A company has mounted sensors to collect information about environmental parameters such as humidity and light throughout all the company's factories. The company needs to stream and analyze the data in the AWS Cloud in real time. If any of the parameters fall out of acceptable ranges, the factory operations team must receive a notification immediately. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Stream the data to an Amazon Kinesis Data Firehose delivery stream. Use AWS Step Functions to consume and analyze the data in the Kinesis Data Firehose delivery stream. Use Amazon Simple Notification Service (Amazon SNS) to notify the operations team.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Stream the data to an Amazon Managed Streaming for Apache Kafka (Amazon MSK) cluster. Set up a trigger in Amazon MSK to invoke an AWS Fargate task to analyze the data. Use Amazon Simple Email Service (Amazon SES) to notify the operations team.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Stream the data to an Amazon Kinesis data stream. Create an AWS Lambda function to consume the Kinesis data stream and to analyze the data. Use Amazon Simple Notification Service (Amazon SNS) to notify the operations team.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Stream the data to an Amazon Kinesis Data Analytics application. Use an automatically scaled and containerized service in Amazon Elastic Container Service (Amazon ECS) to consume and analyze the data. Use Amazon Simple Email Service (Amazon SES) to notify the operations team.",
        "isCorrect": false
      }
    ],
    "comments": "Sensores de fábricas cuyos datos deben analizarse en TIEMPO REAL y notificar de inmediato si un parámetro sale de rango.\n\nOpción A: Kinesis Data Firehose es de entrega casi en tiempo real (con buffering a destinos), no ideal para análisis inmediato por registro; Step Functions no es el consumidor natural de un stream.\nOpción B: MSK es válido pero requiere gestionar Kafka y \"trigger a Fargate\" añade complejidad; SES es email, no la notificación inmediata idónea.\nOpción C (Correcta): Kinesis Data Streams (ingesta en tiempo real) + una Lambda que consume el stream y analiza cada registro + Amazon SNS para notificar de inmediato al equipo de operaciones. Baja latencia, serverless y directo.\nOpción D: Kinesis Data Analytics + ECS auto-escalado y SES (email) es más complejo y la notificación por email no es inmediata como SNS.\n\nReferencias:\nhttps://docs.aws.amazon.com/streams/latest/dev/introduction.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30405,
    "questionNumber": 405,
    "question": "A company is preparing to deploy an Amazon Elastic Kubernetes Service (Amazon EKS) cluster for a workload. The company expects the cluster to support an unpredictable number of stateless pods. Many of the pods will be created during a short time period as the workload automatically scales the number of replicas that the workload uses. Which solution will MAXIMIZE node resilience?",
    "choices": [
      {
        "letter": "A",
        "text": "Use a separate launch template to deploy the EKS control plane into a second cluster that is separate from the workload node groups.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Update the workload node groups. Use a smaller number of node groups and larger instances in the node groups.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure the Kubernetes Cluster Autoscaler to ensure that the compute capacity of the workload node groups stays underprovisioned.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure the workload to use topology spread constraints that are based on Availability Zone.",
        "isCorrect": true
      }
    ],
    "comments": "Clúster EKS con número IMPREDECIBLE de pods stateless que se crean en ráfaga al escalar; MAXIMIZAR la resiliencia de nodos.\n\nOpción A: Desplegar el control plane en un segundo clúster no tiene sentido (EKS gestiona el control plane) y no mejora la resiliencia de nodos del workload.\nOpción B: Menos node groups con instancias más grandes concentra los pods y reduce la resiliencia (mayor impacto si cae un nodo).\nOpción C: Mantener la capacidad infra-aprovisionada (underprovisioned) provoca pods sin poder programarse; empeora la disponibilidad.\nOpción D (Correcta): Usar topology spread constraints por Availability Zone distribuye los pods entre AZs, de modo que el fallo de un nodo o una AZ no tumba el workload. Maximiza la resiliencia de nodos.\n\nReferencias:\nhttps://docs.aws.amazon.com/eks/latest/best-practices/scale-workloads.html\nhttps://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30406,
    "questionNumber": 406,
    "question": "A company needs to implement a disaster recovery (DR) plan for a web application. The application runs in a single AWS Region. The application uses microservices that run in containers. The containers are hosted on AWS Fargate in Amazon Elastic Container Service (Amazon ECS). The application has an Amazon RDS for MySQL DB instance as its data layer and uses Amazon Route 53 for DNS resolution. An Amazon CloudWatch alarm invokes an Amazon EventBridge rule if the application experiences a failure. A solutions architect must design a DR solution to provide application recovery to a separate Region. The solution must minimize the time that is necessary to recover from a failure. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Setup a second ECS cluster and ECS service on Fargate in the separate Region. Create an AWS Lambda function to perform the following actions: take a snapshot of the RDS DB instance, copy the snapshot to the separate Region, create a new RDS DB instance from the snapshot, and update Route 53 to route traffic to the second ECS cluster. Update the EventBridge rule to add a target that will invoke the Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Lambda function that creates a second ECS cluster and ECS service in the separate Region. Configure the Lambda function to perform the following actions: take a snapshot of the RDS DB instance, copy the snapshot to the separate Region, create a new RDS DB instance from the snapshot, and update Route 53 to route traffic to the second ECS cluster. Update the EventBridge rule to add a target that will invoke the Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Setup a second ECS cluster and ECS service on Fargate in the separate Region. Create a cross-Region read replica of the RDS DB instance in the separate Region. Create an AWS Lambda function to promote the read replica to the primary database. Configure the Lambda function to update Route 53 to route traffic to the second ECS cluster. Update the EventBridge rule to add a target that will invoke the Lambda function.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Setup a second ECS cluster and ECS service on Fargate in the separate Region. Take a snapshot of the RDS DB instance. Convert the snapshot to an Amazon DynamoDB global table. Create an AWS Lambda function to update Route 53 to route traffic to the second ECS cluster. Update the EventBridge rule to add a target that will invoke the Lambda function.",
        "isCorrect": false
      }
    ],
    "comments": "DR a otra Región de una app en ECS Fargate con RDS MySQL y Route 53, MINIMIZANDO el tiempo de recuperación tras un fallo (disparado por EventBridge).\n\nOpción A: Tomar snapshot, copiarlo, crear RDS desde snapshot y actualizar Route 53 en el momento del fallo es LENTO (crear BD desde snapshot lleva tiempo); RTO alto.\nOpción B: Crear el clúster ECS y la BD desde cero en el fallo con Lambda es aún más lento; no minimiza el tiempo.\nOpción C (Correcta): Tener ya un segundo clúster/servicio ECS Fargate en la otra Región y una read replica cross-Región de RDS; una Lambda promueve la réplica a primaria y actualiza Route 53. Con la infraestructura preexistente y datos ya replicados, el RTO es mínimo (patrón warm standby).\nOpción D: Convertir un snapshot de RDS a DynamoDB global table no tiene sentido (cambio de motor de datos) y no es un mecanismo de DR válido.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html\nhttps://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30407,
    "questionNumber": 407,
    "question": "A company has AWS accounts that are in an organization in AWS Organizations. The company wants to track Amazon EC2 usage as a metric. The company’s architecture team must receive a daily alert if the EC2 usage is more than 10% higher the average EC2 usage from the last 30 days. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure AWS Budgets in the organization's management account. Specify a usage type of EC2 running hours. Specify a daily period. Set the budget amount to be 10% more than the reported average usage for the last 30 days from AWS Cost Explorer. Configure an alert to notify the architecture team if the usage threshold is met",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure AWS Cost Anomaly Detection in the organization's management account. Configure a monitor type of AWS Service. Apply a filter of Amazon EC2. Configure an alert subscription to notify the architecture team if the usage is 10% more than the average usage for the last 30 days.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Enable AWS Trusted Advisor in the organization's management account. Configure a cost optimization advisory alert to notify the architecture team if the EC2 usage is 10% more than the reported average usage for the last 30 days.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure Amazon Detective in the organization's management account. Configure an EC2 usage anomaly alert to notify the architecture team if Detective identifies a usage anomaly of more than 10%.",
        "isCorrect": false
      }
    ],
    "comments": "Alerta DIARIA si el uso de EC2 supera en más de un 10% la media de uso de los últimos 30 días, en una organización de Organizations.\n\nOpción A: AWS Budgets con un umbral fijo (media + 10%) requiere recalcular manualmente la media cada periodo y no detecta anomalías dinámicas; frágil.\nOpción B (Correcta): AWS Cost Anomaly Detection en el management account, con monitor de tipo AWS Service filtrado a Amazon EC2 y una suscripción de alerta. Aprende el patrón y notifica automáticamente las desviaciones (uso anómalo por encima de lo esperado), cubriendo la comparación con la tendencia reciente.\nOpción C: Trusted Advisor no genera alertas de \"uso 10% sobre la media de 30 días\"; sus checks de coste son recomendaciones, no detección de anomalías diaria.\nOpción D: Amazon Detective es para investigación de seguridad (GuardDuty/VPC Flow Logs), no para anomalías de uso/coste de EC2.\n\nReferencias:\nhttps://docs.aws.amazon.com/cost-management/latest/userguide/getting-started-ad.html\nhttps://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30408,
    "questionNumber": 408,
    "question": "An e-commerce company is revamping its IT infrastructure and is planning to use AWS services. The company’s CIO has asked a solutions architect to design a simple, highly available, and loosely coupled order processing application. The application is responsible for receiving and processing orders before storing them in an Amazon DynamoDB table. The application has a sporadic traffic pattern and should be able to scale during marketing campaigns to process the orders with minimal delays. Which of the following is the MOST reliable approach to meet the requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Receive the orders in an Amazon EC2-hosted database and use EC2 instances to process them.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Receive the orders in an Amazon SQS queue and invoke an AWS Lambda function to process them.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Receive the orders using the AWS Step Functions program and launch an Amazon ECS container to process them.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Receive the orders in Amazon Kinesis Data Streams and use Amazon EC2 instances to process them.",
        "isCorrect": false
      }
    ],
    "comments": "Procesamiento de pedidos SIMPLE, altamente disponible y DESACOPLADO, con tráfico esporádico y picos en campañas, que almacena en DynamoDB; el enfoque MÁS fiable.\n\nOpción A: Recibir pedidos en una BD en EC2 y procesarlos con EC2 no es desacoplado, ni serverless, ni escala automáticamente; menos fiable.\nOpción B (Correcta): Recibir los pedidos en una cola SQS e invocar una Lambda para procesarlos desacopla, escala automáticamente con el tráfico esporádico/picos y es simple y fiable; SQS retiene los mensajes ante fallos.\nOpción C: Step Functions + ECS es más complejo de lo necesario para un patrón simple de ingestión y procesamiento de pedidos.\nOpción D: Kinesis Data Streams + EC2 está orientado a streaming ordenado de alto volumen y añade gestión de EC2; sobredimensionado y menos simple.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazon-sqs/latest/developerguide/welcome.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30409,
    "questionNumber": 409,
    "question": "A company is deploying AWS Lambda functions that access an Amazon RDS for PostgreSQL database. The company needs to launch the Lambda functions in a QA environment and in a production environment. The company must not expose credentials within application code and must rotate passwords automatically. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Store the database credentials for both environments in AWS Systems Manager Parameter Store. Encrypt the credentials by using an AWS Key Management Service (AWS KMS) key. Within the application code of the Lambda functions, pull the credentials from the Parameter Store parameter by using the AWS SDK for Python (Boto3). Add a role to the Lambda functions to provide access to the Parameter Store parameter.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Store the database credentials for both environments in AWS Secrets Manager with distinct key entry for the QA environment and the production environment. Turn on rotation. Provide a reference to the Secrets Manager key as an environment variable for the Lambda functions.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Store the database credentials for both environments in AWS Key Management Service (AWS KMS). Turn on rotation. Provide a reference to the credentials that are stored in AWS KMS as an environment variable for the Lambda functions.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create separate S3 buckets for the QA environment and the production environment. Turn on server-side encryption with AWS KMS keys (SSE-KMS) for the S3 buckets. Use an object naming pattern that gives each Lambda function’s application code the ability to pull the correct credentials for the function's corresponding environment. Grant each Lambda function's execution role access to Amazon S3.",
        "isCorrect": false
      }
    ],
    "comments": "Lambdas que acceden a RDS PostgreSQL en QA y producción; no exponer credenciales en el código y ROTAR contraseñas automáticamente.\n\nOpción A: Parameter Store puede guardar secretos cifrados, pero NO rota contraseñas automáticamente de forma nativa; requiere lógica propia. No cumple la rotación automática.\nOpción B (Correcta): AWS Secrets Manager con entradas distintas para QA y producción, rotación automática activada e integración con RDS; se referencia el secreto (por variable de entorno) sin credenciales en el código. Cumple ambos requisitos.\nOpción C: AWS KMS gestiona claves de cifrado, no almacena ni rota credenciales de BD; no aplica.\nOpción D: Guardar credenciales en S3 (aunque cifrado) es una mala práctica y no ofrece rotación automática de contraseñas.\n\nReferencias:\nhttps://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html\nhttps://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30410,
    "questionNumber": 410,
    "question": "A company is using AWS Control Tower to manage AWS accounts in an organization in AWS Organizations. The company has an OU that contains accounts. The company must prevent any new or existing Amazon EC2 instances in the OU's accounts from gaining a public IP address. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure all instances in each account in the OU to use AWS Systems Manager. Use a Systems Manager Automation runbook to prevent public IP addresses from being attached to the instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Implement the AWS Control Tower proactive control to check whether instances in the OU's accounts have a public IP address. Set the AssociatePublicIpAddress property to False. Attach the proactive control to the OU.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an SCP that prevents the launch of instances that have a public IP address. Additionally, configure the SCP to prevent the attachment of a public IP address to existing instances. Attach the SCP to the OU.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an AWS Config custom rule that detects instances that have a public IP address. Configure a remediation action that uses an AWS Lambda function to detach the public IP addresses from the instances.",
        "isCorrect": false
      }
    ],
    "comments": "En AWS Control Tower/Organizations, impedir que EC2 nuevas o existentes en una OU obtengan una IP pública.\n\nOpción A: Systems Manager Automation es reactivo/operativo y no impide de forma preventiva la asignación de IP pública en el lanzamiento.\nOpción B: Un proactive control de Control Tower valida plantillas en despliegue vía CloudFormation, pero no cubre instancias existentes ni lanzamientos fuera de ese flujo; no garantiza el bloqueo completo.\nOpción C (Correcta): Una SCP adjunta a la OU que deniega ec2:RunInstances cuando se asocia IP pública (y restringe la asociación de IPs públicas) impide de forma preventiva y en todas las cuentas de la OU que las instancias obtengan IP pública. Es el control de gobierno adecuado (consenso de la comunidad).\nOpción D: AWS Config con remediación por Lambda es detectivo/correctivo (elimina la IP después), no preventivo; deja una ventana de exposición.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html\nhttps://docs.aws.amazon.com/controltower/latest/userguide/controls.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30411,
    "questionNumber": 411,
    "question": "A company is deploying a third-party web application on AWS. The application is packaged as a Docker image. The company has deployed the Docker image as an AWS Fargate service in Amazon Elastic Container Service (Amazon ECS). An Application Load Balancer (ALB) directs traffic to the application. The company needs to give only a specific list of users the ability to access the application from the internet. The company cannot change the application and cannot integrate the application with an identity provider. All users must be authenticated through multi-factor authentication (MFA). Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a user pool in Amazon Cognito. Configure the pool for the application. Populate the pool with the required users. Configure the pool to require MFConfigure a listener rule on the ALB to require authentication through the Amazon Cognito hosted UI.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure the users in AWS Identity and Access Management (IAM). Attach a resource policy to the Fargate service to require users to use MFA. Configure a listener rule on the ALB to require authentication through IAM.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure the users in AWS Identity and Access Management (IAM). Enable AWS IAM Identity Center (AWS Single Sign-On). Configure resource protection for the ALB. Create a resource protection rule to require users to use MFA.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a user pool in AWS Amplify. Configure the pool for the application. Populate the pool with the required users. Configure the pool to require MFA. Configure a listener rule on the ALB to require authentication through the Amplify hosted UI.",
        "isCorrect": false
      }
    ],
    "comments": "App de terceros en Fargate detrás de un ALB que NO se puede modificar ni integrar con un IdP; solo una lista concreta de usuarios debe acceder desde internet y TODOS con MFA.\n\nOpción A (Correcta): un user pool de Amazon Cognito con MFA obligatorio y una regla de listener del ALB que exige autenticación contra la UI alojada de Cognito resuelve la autenticación sin tocar la app.\nOpción B: IAM no autentica peticiones de usuarios finales web ni existe integración nativa del ALB con IAM para login de usuarios.\nOpción C: IAM Identity Center no ofrece 'resource protection' para ALB; no es el mecanismo de autenticación de un ALB.\nOpción D: AWS Amplify no tiene 'user pools' propios (usa Cognito por debajo) ni una integración de listener del ALB con una UI de Amplify.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html\nhttps://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30412,
    "questionNumber": 412,
    "question": "A solutions architect is preparing to deploy a new security tool into several previously unused AWS Regions. The solutions architect will deploy the tool by using an AWS CloudFormation stack set. The stack set's template contains an IAM role that has a custom name. Upon creation of the stack set, no stack instances are created successfully. What should the solutions architect do to deploy the stacks successfully?",
    "choices": [
      {
        "letter": "A",
        "text": "Enable the new Regions in all relevant accounts. Specify the CAPABILITY_NAMED_IAM capability during the creation of the stack set.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use the Service Quotas console to request a quota increase for the number of CloudFormation stacks in each new Region in all relevant accounts. Specify the CAPABILITY_IAM capability during the creation of the stack set.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Specify the CAPABILITY_NAMED_IAM capability and the SELF_MANAGED permissions model during the creation of the stack set.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Specify an administration role ARN and the CAPABILITY_IAM capability during the creation of the stack set.",
        "isCorrect": false
      }
    ],
    "comments": "Despliegue de un StackSet en Regiones AWS NO habilitadas previamente, con una plantilla que crea un rol IAM con nombre personalizado; no se crea ninguna instancia de stack.\n\nOpción A (Correcta): las Regiones opt-in deben habilitarse en las cuentas de destino y, como el rol IAM tiene nombre propio, hace falta la capability CAPABILITY_NAMED_IAM.\nOpción B: el problema no es una cuota de numero de stacks; ademas CAPABILITY_IAM no basta para recursos IAM con nombre personalizado.\nOpción C: el modelo SELF_MANAGED no arregla que las Regiones esten deshabilitadas; el fallo es la Región, no el modelo de permisos.\nOpción D: CAPABILITY_IAM es insuficiente para nombres personalizados y no resuelve las Regiones deshabilitadas.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#capabilities\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30413,
    "questionNumber": 413,
    "question": "A company has an application that uses an Amazon Aurora PostgreSQL DB cluster for the application's database. The DB cluster contains one small primary instance and three larger replica instances. The application runs on an AWS Lambda function. The application makes many short-lived connections to the database's replica instances to perform read-only operations. During periods of high traffic, the application becomes unreliable and the database reports that too many connections are being established. The frequency of high-traffic periods is unpredictable. Which solution will improve the reliability of the application?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon RDS Proxy to create a proxy for the DB cluster. Configure a read-only endpoint for the proxy. Update the Lambda function to connect to the proxy endpoint.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Increase the max_connections setting on the DB cluster's parameter group. Reboot all the instances in the DB cluster. Update the Lambda function to connect to the DB cluster endpoint.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure instance scaling for the DB cluster to occur when the DatabaseConnections metric is close to the max connections setting. Update the Lambda function to connect to the Aurora reader endpoint.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon RDS Proxy to create a proxy for the DB cluster. Configure a read-only endpoint for the Aurora Data API on the proxy. Update the Lambda function to connect to the proxy endpoint.",
        "isCorrect": false
      }
    ],
    "comments": "Lambda que abre MUCHAS conexiones cortas a las réplicas de lectura de Aurora PostgreSQL; en picos impredecibles la BD reporta demasiadas conexiones.\n\nOpción A (Correcta): Amazon RDS Proxy hace pooling y reutiliza conexiones, y con un endpoint de solo lectura enruta a las réplicas, eliminando el agotamiento de conexiones desde Lambda.\nOpción B: subir max_connections y reiniciar es fragil, requiere downtime y no resuelve el patrón de conexiones efimeras de Lambda.\nOpción C: escalar instancias por métrica de conexiones es lento y reactivo; no controla la explosión de conexiones en el pico.\nOpción D: el Data API de Aurora no se configura como 'read-only endpoint' sobre RDS Proxy; descripción invalida.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30414,
    "questionNumber": 414,
    "question": "A retail company is mounting IoT sensors in all of its stores worldwide. During the manufacturing of each sensor, the company’s private certificate authority (CA) issues an X.509 certificate that contains a unique serial number. The company then deploys each certificate to its respective sensor. A solutions architect needs to give the sensors the ability to send data to AWS after they are installed. Sensors must not be able to send data to AWS until they are installed. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Lambda function that can validate the serial number. Create an AWS IoT Core provisioning template. Include the SerialNumber parameter in the Parameters section. Add the Lambda function as a pre-provisioning hook. During manufacturing, call the RegisterThing API operation and specify the template and parameters.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Step Functions state machine that can validate the serial number. Create an AWS IoT Core provisioning template. Include the SerialNumber parameter in the Parameters section. Specify the Step Functions state machine to validate parameters. Call the StartThingRegistrationTask API operation during installation.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS Lambda function that can validate the serial number. Create an AWS IoT Core provisioning template. Include the SerialNumber parameter in the Parameters section. Add the Lambda function as a pre-provisioning hook. Register the CA with AWS IoT Core, specify the provisioning template, and set the allow-auto-registration parameter.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an AWS IoT Core provisioning template. Include the SerialNumber parameter in the Parameters section. Include parameter validation in the template. Provision a claim certificate and a private key for each device that uses the CA. Grant AWS IoT Core service permissions to update AWS IoT things during provisioning.",
        "isCorrect": false
      }
    ],
    "comments": "Sensores IoT con certificados X.509 emitidos por una CA privada; deben poder enviar datos a AWS SOLO tras instalarse, validando el numero de serie.\n\nOpción C (Correcta): registrar la CA en AWS IoT Core y usar una plantilla de aprovisionamiento con un pre-provisioning hook (Lambda) que valida el SerialNumber implementa el aprovisionamiento por reclamación activado en la instalación.\nOpción A: llamar a RegisterThing durante la fabricación aprovisionaria el dispositivo antes de instalarlo, incumpliendo el requisito.\nOpción B: Step Functions no es un pre-provisioning hook valido de IoT Core; el hook debe ser una Lambda.\nOpción D: sin hook de validación real ni registro de la CA, no se garantiza validar el serie ni impedir el envio previo a la instalación.\n\nReferencias:\nhttps://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html\nhttps://docs.aws.amazon.com/iot/latest/developerguide/provisioning-template.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30415,
    "questionNumber": 415,
    "question": "A startup company recently migrated a large ecommerce website to AWS. The website has experienced a 70% increase in sales. Software engineers are using a private GitHub repository to manage code. The DevOps team is using Jenkins for builds and unit testing. The engineers need to receive notifications for bad builds and zero downtime during deployments. The engineers also need to ensure any changes to production are seamless for users and can be rolled back in the event of a major issue. The software engineers have decided to use AWS CodePipeline to manage their build and deployment process. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use GitHub websockets to trigger the CodePipeline pipeline. Use the Jenkins plugin for AWS CodeBuild to conduct unit testing. Send alerts to an Amazon SNS topic for any bad builds. Deploy in an in-place, all-at-once deployment configuration using AWS CodeDeploy.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use GitHub webhooks to trigger the CodePipeline pipeline. Use the Jenkins plugin for AWS CodeBuild to conduct unit testing. Send alerts to an Amazon SNS topic for any bad builds. Deploy in a blue/green deployment using AWS CodeDeploy.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use GitHub websockets to trigger the CodePipeline pipeline. Use AWS X-Ray for unit testing and static code analysis. Send alerts to an Amazon SNS topic for any bad builds. Deploy in a blue/green deployment using AWS CodeDeploy.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use GitHub webhooks to trigger the CodePipeline pipeline. Use AWS X-Ray for unit testing and static code analysis. Send alerts to an Amazon SNS topic for any bad builds. Deploy in an in-place, all-at-once deployment configuration using AWS CodeDeploy.",
        "isCorrect": false
      }
    ],
    "comments": "CI/CD con CodePipeline: repo privado en GitHub, Jenkins para builds/tests; se requieren notificaciones de builds fallidos, CERO downtime y rollback sencillo.\n\nOpción B (Correcta): GitHub webhooks disparan el pipeline, el plugin de Jenkins para CodeBuild ejecuta tests, SNS notifica builds malos y CodeDeploy blue/green da cero downtime y rollback inmediato.\nOpción A: despliegue in-place all-at-once provoca downtime y no permite rollback limpio; 'websockets' no es el mecanismo de disparo.\nOpción C: X-Ray es trazado distribuido, no una herramienta de unit testing; 'websockets' es incorrecto.\nOpción D: in-place all-at-once causa downtime y X-Ray no hace unit testing.\n\nReferencias:\nhttps://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html\nhttps://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30416,
    "questionNumber": 416,
    "question": "A software as a service (SaaS) company has developed a multi-tenant environment. The company uses Amazon DynamoDB tables that the tenants share for the storage layer. The company uses AWS Lambda functions for the application services. The company wants to offer a tiered subscription model that is based on resource consumption by each tenant. Each tenant is identified by a unique tenant ID that is sent as part of each request to the Lambda functions. The company has created an AWS Cost and Usage Report (AWS CUR) in an AWS account. The company wants to allocate the DynamoDB costs to each tenant to match that tenant's resource consumption. Which solution will provide a granular view of the DynamoDB cost for each tenant with the LEAST operational effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Associate a new tag that is named tenant ID with each table in DynamoDB. Activate the tag as a cost allocation tag in the AWS Billing and Cost Management console. Deploy new Lambda function code to log the tenant ID in Amazon CloudWatch Logs. Use the AWS CUR to separate DynamoDB consumption cost for each tenant ID.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure the Lambda functions to log the tenant ID and the number of RCUs and WCUs consumed from DynamoDB for each transaction to Amazon CloudWatch Logs. Deploy another Lambda function to calculate the tenant costs by using the logged capacity units and the overall DynamoDB cost from the AWS Cost Explorer API. Create an Amazon EventBridge rule to invoke the calculation Lambda function on a schedule.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a new partition key that associates DynamoDB items with individual tenants. Deploy a Lambda function to populate the new column as part of each transaction. Deploy another Lambda function to calculate the tenant costs by using Amazon Athena to calculate the number of tenant items from DynamoDB and the overall DynamoDB cost from the AWS CUR. Create an Amazon EventBridge rule to invoke the calculation Lambda function on a schedule.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy a Lambda function to log the tenant ID, the size of each response, and the duration of the transaction call as custom metrics to Amazon CloudWatch Logs. Use CloudWatch Logs Insights to query the custom metrics for each tenant. Use AWS Pricing Calculator to obtain the overall DynamoDB costs and to calculate the tenant costs.",
        "isCorrect": false
      }
    ],
    "comments": "SaaS multi-tenant con tablas DynamoDB COMPARTIDAS y Lambdas; se quiere imputar el coste de DynamoDB a cada tenant segun su consumo, con el MENOR esfuerzo operativo.\n\nOpción B (Correcta): como las tablas son compartidas, las cost allocation tags no separan por tenant; registrar tenantID con RCU/WCU consumidas por transacción en CloudWatch y calcular la parte proporcional del coste total es el enfoque viable de atribución granular.\nOpción A: etiquetar la tabla no reparte coste entre tenants que comparten la misma tabla.\nOpción C: rediseñar la partition key y usar Athena implica gran refactor y esfuerzo, no el menor.\nOpción D: tamaño de respuesta y duración no reflejan el consumo real de capacidad de DynamoDB; Pricing Calculator no da coste real facturado.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30417,
    "questionNumber": 417,
    "question": "A company has an application that stores data in a single Amazon S3 bucket. The company must keep all data for 1 year. The company’s security team is concerned that an attacker could gain access to the AWS account through leaked long-term credentials. Which solution will ensure that existing and future objects in the S3 bucket are protected?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new AWS account that is accessible only to the security team through an assumed role. Create an S3 bucket in the new account. Enable S3 Versioning and S3 Object Lock. Configure a default retention period of 1 year. Set up replication from the existing S3 bucket to the new S3 bucket. Create an S3 Batch Replication job to copy all existing data.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use the s3-bucket-versioning-enabled AWS Config managed rule. Configure an automatic remediation action that uses an AWS Lambda function to enable S3 Versioning and MFA Delete on noncompliant resources. Add an S3 Lifecycle rule to delete objects after 1 year.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Explicitly deny bucket creation from all users and roles except for an AWS Service Catalog launch constraint role. Define a Service Catalog product for the creation of the S3 bucket to force S3 Versioning and MFA Delete to be enabled. Authorize users to launch the product when they need to create an S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Enable Amazon GuardDuty with the S3 protection feature for the account and the AWS Region. Add an S3 Lifecycle rule to delete objects after 1 year.",
        "isCorrect": false
      }
    ],
    "comments": "Bucket S3 con datos a conservar 1 año; el temor es que un atacante con credenciales de larga duración filtradas borre o altere objetos existentes y futuros.\n\nOpción A (Correcta): una cuenta separada (solo accesible por seguridad via rol asumido) con S3 Object Lock + Versioning y retención de 1 año, y replicación desde el bucket original, protege los objetos aunque las credenciales de la cuenta original se vean comprometidas.\nOpción B: activar versioning/MFA Delete via Config no protege frente a un atacante con acceso a la cuenta y no aisla el blast radius.\nOpción C: Service Catalog controla la creación de buckets, no protege los objetos ya existentes de un compromiso de credenciales.\nOpción D: GuardDuty detecta, no previene la manipulación; el ciclo de vida a 1 año no protege ni cumple retención inmutable.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30418,
    "questionNumber": 418,
    "question": "A company needs to improve the security of its web-based application on AWS. The application uses Amazon CloudFront with two custom origins. The first custom origin routes requests to an Amazon API Gateway HTTP API. The second custom origin routes traffic to an Application Load Balancer (ALB). The application integrates with an OpenID Connect (OIDC) identity provider (IdP) for user management. A security audit shows that a JSON Web Token (JWT) authorizer provides access to the API. The security audit also shows that the ALB accepts requests from unauthenticated users. A solutions architect must design a solution to ensure that all backend services respond to only authenticated users. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the ALB to enforce authentication and authorization by integrating the ALB with the IdP. Allow only authenticated users to access the backend services.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Modify the CloudFront configuration to use signed URLs. Implement a permissive signing policy that allows any request to access the backend services.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS WAF web ACL that filters out unauthenticated requests at the ALB level. Allow only authenticated traffic to reach the backend services.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Enable AWS CloudTrail to log all requests that come to the ALB. Create an AWS Lambda function to analyze the logs and block any requests that come from unauthenticated users.",
        "isCorrect": false
      }
    ],
    "comments": "CloudFront con dos origenes (API Gateway con JWT authorizer y un ALB); el ALB acepta usuarios NO autenticados y hay que exigir que todos los backends respondan solo a usuarios autenticados con el IdP OIDC.\n\nOpción A (Correcta): configurar la autenticación/autorización del ALB integrandolo con el IdP OIDC hace que el ALB solo deje pasar usuarios autenticados, igualando el nivel del API con JWT.\nOpción B: signed URLs con politica permisiva no autentican usuarios reales y contradice el objetivo.\nOpción C: WAF filtra por reglas de patrón/IP, no realiza autenticación OIDC de usuarios.\nOpción D: CloudTrail no registra trafico de usuarios al ALB ni sirve para bloquear en tiempo real; enfoque reactivo e invalido.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html#oidc-requirements",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30419,
    "questionNumber": 419,
    "question": "A company creates an AWS Control Tower landing zone to manage and govern a multi-account AWS environment. The company's security team will deploy preventive controls and detective controls to monitor AWS services across all the accounts. The security team needs a centralized view of the security state of all the accounts. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "From the AWS Control Tower management account, use AWS CloudFormation StackSets to deploy an AWS Config conformance pack to all accounts in the organization.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Enable Amazon Detective for the organization in AWS Organizations. Designate one AWS account as the delegated administrator for Detective.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "From the AWS Control Tower management account, deploy an AWS CloudFormation stack set that uses the automatic deployment option to enable Amazon Detective for the organization.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Enable AWS Security Hub for the organization in AWS Organizations. Designate one AWS account as the delegated administrator for Security Hub.",
        "isCorrect": true
      }
    ],
    "comments": "Control Tower multi-cuenta con controles preventivos y detectivos; el equipo de seguridad necesita una VISTA CENTRALIZADA del estado de seguridad de todas las cuentas.\n\nOpción D (Correcta): AWS Security Hub habilitado para la organización con una cuenta como administrador delegado agrega hallazgos de seguridad de todas las cuentas en un panel central.\nOpción A: un conformance pack de Config evalua cumplimiento pero no ofrece la vista consolidada del estado de seguridad como Security Hub.\nOpción B: Detective sirve para investigación de incidentes, no para un panel del estado de seguridad global.\nOpción C: Detective con StackSets tampoco proporciona la vista de postura de seguridad centralizada buscada.\n\nReferencias:\nhttps://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html\nhttps://docs.aws.amazon.com/securityhub/latest/userguide/designate-orgs-admin-account.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30420,
    "questionNumber": 420,
    "question": "A company that develops consumer electronics with offices in Europe and Asia has 60 TB of software images stored on premises in Europe. The company wants to transfer the images to an Amazon S3 bucket in the ap-northeast-1 Region. New software images are created daily and must be encrypted in transit. The company needs a solution that does not require custom development to automatically transfer all existing and new software images to Amazon S3. What is the next step in the transfer process?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy an AWS DataSync agent and configure a task to transfer the images to the S3 bucket.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure Amazon Kinesis Data Firehose to transfer the images using S3 Transfer Acceleration.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use an AWS Snowball device to transfer the images with the S3 bucket as the target.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Transfer the images over a Site-to-Site VPN connection using the S3 API with multipart upload.",
        "isCorrect": false
      }
    ],
    "comments": "60 TB en Europa a transferir a un bucket S3 en ap-northeast-1, con imagenes nuevas a diario, cifrado en transito y SIN desarrollo a medida.\n\nOpción A (Correcta): desplegar un agente de AWS DataSync y crear una tarea transfiere automaticamente los datos existentes y los nuevos, con cifrado en transito y sin código propio.\nOpción B: Kinesis Data Firehose es para streaming de registros, no para sincronizar ficheros de imagenes de un share on-premises.\nOpción C: Snowball mueve el volumen inicial pero no cubre la transferencia continua diaria automatizada.\nOpción D: usar la API S3 con multipart sobre VPN requiere desarrollo a medida y no automatiza la sincronización.\n\nReferencias:\nhttps://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html\nhttps://docs.aws.amazon.com/datasync/latest/userguide/create-task.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30421,
    "questionNumber": 421,
    "question": "A company has a web application that uses Amazon API Gateway. AWS Lambda, and Amazon DynamoDB. A recent marketing campaign has increased demand. Monitoring software reports that many requests have significantly longer response times than before the marketing campaign. A solutions architect enabled Amazon CloudWatch Logs for API Gateway and noticed that errors are occurring on 20% of the requests. In CloudWatch, the Lambda function Throttles metric represents 1% of the requests and the Errors metric represents 10% of the requests. Application logs indicate that, when errors occur, there is a call to DynamoDB. What change should the solutions architect make to improve the current response times as the web application becomes more popular?",
    "choices": [
      {
        "letter": "A",
        "text": "Increase the concurrency limit of the Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Implement DynamoDB auto scaling on the table.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Increase the API Gateway throttle limit.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Re-create the DynamoDB table with a better-partitioned primary index.",
        "isCorrect": false
      }
    ],
    "comments": "API Gateway + Lambda + DynamoDB con campaña que dispara demanda; 20% de errores, throttles de Lambda solo 1%, errores 10% y los logs muestran que el fallo ocurre al llamar a DynamoDB.\n\nOpción B (Correcta): los errores se concentran en las llamadas a DynamoDB por throttling de capacidad; activar auto scaling en la tabla ajusta RCU/WCU a la demanda y elimina los errores y latencias.\nOpción A: subir la concurrencia de Lambda no ayuda: los throttles de Lambda son solo el 1%.\nOpción C: subir el throttle de API Gateway no ataca la causa (DynamoDB).\nOpción D: recrear la tabla con otra partition key es un cambio drastico; el sintoma apunta a capacidad, resuelto con auto scaling.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ProvisionedThroughput.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30422,
    "questionNumber": 422,
    "question": "A company has an application that has a web frontend. The application runs in the company's on-premises data center and requires access to file storage for critical data. The application runs on three Linux VMs for redundancy. The architecture includes a load balancer with HTTP request-based routing. The company needs to migrate the application to AWS as quickly as possible. The architecture on AWS must be highly available. Which solution will meet these requirements with the FEWEST changes to the architecture?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate the application to Amazon Elastic Container Service (Amazon ECS) containers that use the Fargate launch type in three Availability Zones. Use Amazon S3 to provide file storage for all three containers. Use a Network Load Balancer to direct traffic to the containers.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Migrate the application to Amazon EC2 instances in three Availability Zones. Use Amazon Elastic File System (Amazon EFS) for file storage. Mount the file storage on all three EC2 instances. Use an Application Load Balancer to direct traffic to the EC2 instances.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Migrate the application to Amazon Elastic Kubernetes Service (Amazon EKS) containers that use the Fargate launch type in three Availability Zones. Use Amazon FSx for Lustre to provide file storage for all three containers. Use a Network Load Balancer to direct traffic to the containers.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Migrate the application to Amazon EC2 instances in three AWS Regions. Use Amazon Elastic Block Store (Amazon EBS) for file storage. Enable Cross-Region Replication (CRR) for all three EC2 instances. Use an Application Load Balancer to direct traffic to the EC2 instances.",
        "isCorrect": false
      }
    ],
    "comments": "App on-premises con frontend web en 3 VMs Linux redundantes, balanceador con enrutado por HTTP y almacenamiento de ficheros compartido; migrar a AWS rapido, con alta disponibilidad y los MENOS cambios de arquitectura.\n\nOpción B (Correcta): EC2 en tres AZ (equivalente a las VMs), EFS montado en las tres (almacenamiento de ficheros compartido) y un ALB (enrutado por HTTP) replica la arquitectura con minimos cambios y HA.\nOpción A: S3 no es un sistema de ficheros montable como el share actual; NLB no hace enrutado por peticiones HTTP.\nOpción C: EKS/Fargate y FSx for Lustre implican reempaquetar en contenedores: muchos mas cambios.\nOpción D: EC2 en tres Regiones y EBS con CRR no es un share compartido ni una topologia multi-AZ simple; complejidad innecesaria.\n\nReferencias:\nhttps://docs.aws.amazon.com/efs/latest/ug/how-it-works.html\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30423,
    "questionNumber": 423,
    "question": "A company is planning to migrate an on-premises data center to AWS. The company currently hosts the data center on Linux-based VMware VMs. A solutions architect must collect information about network dependencies between the VMs. The information must be in the form of a diagram that details host IP addresses, hostnames, and network connection information. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Application Discovery Service. Select an AWS Migration Hub home AWS Region. Install the AWS Application Discovery Agent on the on-premises servers for data collection. Grant permissions to Application Discovery Service to use the Migration Hub network diagrams.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use the AWS Application Discovery Service Agentless Collector for server data collection. Export the network diagrams from the AWS Migration Hub in .png format.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Install the AWS Application Migration Service agent on the on-premises servers for data collection. Use AWS Migration Hub data in Workload Discovery on AWS to generate network diagrams.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Install the AWS Application Migration Service agent on the on-premises servers for data collection. Export data from AWS Migration Hub in .csv format into an Amazon CloudWatch dashboard to generate network diagrams.",
        "isCorrect": false
      }
    ],
    "comments": "Migración de un CPD VMware (VMs Linux) a AWS; se necesita recopilar dependencias de red entre VMs y obtener un DIAGRAMA con IPs, hostnames e info de conexiones.\n\nOpción A (Correcta): AWS Application Discovery Service con Migration Hub y el Discovery Agent instalado en los servidores captura las dependencias de red y permite generar los diagramas de red en Migration Hub.\nOpción B: el Agentless Collector recopila menos detalle de conexiones; Migration Hub no exporta 'network diagrams' en .png de forma nativa.\nOpción C: Application Migration Service (MGN) es para replicar/migrar servidores, no para descubrir dependencias de red.\nOpción D: MGN + exportar a .csv a un dashboard de CloudWatch no genera diagramas de dependencias de red.\n\nReferencias:\nhttps://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html\nhttps://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30424,
    "questionNumber": 424,
    "question": "A company runs a software-as-a-service (SaaS) application on AWS. The application consists of AWS Lambda functions and an Amazon RDS for MySQL Multi-AZ database. During market events, the application has a much higher workload than normal. Users notice slow response times during the peak periods because of many database connections. The company needs to improve the scalable performance and availability of the database. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon CloudWatch alarm action that triggers a Lambda function to add an Amazon RDS for MySQL read replica when resource utilization hits a threshold.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Migrate the database to Amazon Aurora, and add a read replica. Add a database connection pool outside of the Lambda handler function.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Migrate the database to Amazon Aurora, and add a read replica. Use Amazon Route 53 weighted records.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Migrate the database to Amazon Aurora, and add an Aurora Replica. Configure Amazon RDS Proxy to manage database connection pools.",
        "isCorrect": true
      }
    ],
    "comments": "SaaS con Lambda y RDS for MySQL Multi-AZ; en picos de mercado hay lentitud por MUCHAS conexiones a la BD. Hay que mejorar escalabilidad de rendimiento y disponibilidad.\n\nOpción D (Correcta): migrar a Aurora con una Aurora Replica (lecturas y failover) y RDS Proxy para gestionar el pool de conexiones resuelve el agotamiento de conexiones desde Lambda y mejora la disponibilidad.\nOpción A: una alarma que crea réplicas es reactiva y lenta; no gestiona el pooling de conexiones.\nOpción B: un pool 'fuera del handler' en Lambda no persiste bien entre invocaciones/concurrencia; RDS Proxy es la solución nativa.\nOpción C: Route 53 weighted no gestiona conexiones ni failover de BD adecuadamente para este problema.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30425,
    "questionNumber": 425,
    "question": "A company is planning to migrate an application from on premises to the AWS Cloud. The company will begin the migration by moving the application’s underlying data storage to AWS. The application data is stored on a shared file system on premises, and the application servers connect to the shared file system through SMB. A solutions architect must implement a solution that uses an Amazon S3 bucket for shared storage. Until the application is fully migrated and code is rewritten to use native Amazon S3 APIs, the application must continue to have access to the data through SMB. The solutions architect must migrate the application data to AWS to its new location while still allowing the on-premises application to access the data. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new Amazon FSx for Windows File Server file system. Configure AWS DataSync with one location for the on-premises file share and one location for the new Amazon FSx file system. Create a new DataSync task to copy the data from the on-premises file share location to the Amazon FSx file system.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an S3 bucket for the application. Copy the data from the on-premises storage to the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy an AWS Server Migration Service (AWS SMS) VM to the on-premises environment. Use AWS SMS to migrate the file storage server from on premises to an Amazon EC2 instance.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an S3 bucket for the application. Deploy a new AWS Storage Gateway file gateway on an on-premises VM. Create a new file share that stores data in the S3 bucket and is associated with the file gateway. Copy the data from the on-premises storage to the new file gateway endpoint.",
        "isCorrect": true
      }
    ],
    "comments": "Migrar datos de un share on-premises accedido por SMB a un bucket S3, pero la app debe seguir accediendo por SMB hasta reescribirse para usar las APIs nativas de S3.\n\nOpción D (Correcta): un AWS Storage Gateway File Gateway on-premises expone un file share (SMB/NFS) respaldado por S3; se copian los datos por el gateway y la app on-premises sigue accediendo mientras los objetos quedan en S3.\nOpción A: FSx for Windows con DataSync no deja los datos en S3 (requisito), sino en un sistema de ficheros distinto.\nOpción B: copiar a S3 no da acceso SMB continuado a la app on-premises.\nOpción C: SMS migra servidores, no ofrece acceso SMB a datos alojados en S3.\n\nReferencias:\nhttps://docs.aws.amazon.com/filegateway/latest/files3/what-is-file-s3.html\nhttps://docs.aws.amazon.com/filegateway/latest/files3/CreatingAnSMBFileShare.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30426,
    "questionNumber": 426,
    "question": "A global company has a mobile app that displays ticket barcodes. Customers use the tickets on the mobile app to attend live events. Event scanners read the ticket barcodes and call a backend API to validate the barcode data against data in a database. After the barcode is scanned, the backend logic writes to the database's single table to mark the barcode as used. The company needs to deploy the app on AWS with a DNS name of api.example.com. The company will host the database in three AWS Regions around the world. Which solution will meet these requirements with the LOWEST latency?",
    "choices": [
      {
        "letter": "A",
        "text": "Host the database on Amazon Aurora global database clusters. Host the backend on three Amazon Elastic Container Service (Amazon ECS) clusters that are in the same Regions as the database. Create an accelerator in AWS Global Accelerator to route requests to the nearest ECS cluster. Create an Amazon Route 53 record that maps api.example.com to the accelerator endpoint",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Host the database on Amazon Aurora global database clusters. Host the backend on three Amazon Elastic Kubernetes Service (Amazon EKS) clusters that are in the same Regions as the database. Create an Amazon CloudFront distribution with the three clusters as origins. Route requests to the nearest EKS cluster. Create an Amazon Route 53 record that maps api.example.com to the CloudFront distribution.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Host the database on Amazon DynamoDB global tables. Create an Amazon CloudFront distribution. Associate the CloudFront distribution with a CloudFront function that contains the backend logic to validate the barcodes. Create an Amazon Route 53 record that maps api.example.com to the CloudFront distribution.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Host the database on Amazon DynamoDB global tables. Create an Amazon CloudFront distribution. Associate the CloudFront distribution with a Lambda@Edge function that contains the backend logic to validate the barcodes. Create an Amazon Route 53 record that maps api.example.com to the CloudFront distribution.",
        "isCorrect": true
      }
    ],
    "comments": "App de tickets con backend que valida códigos de barras contra una BD de una unica tabla y marca el ticket como usado; DNS api.example.com y BD en TRES Regiones, con la MENOR latencia.\n\nOpción D (Correcta): DynamoDB global tables (multi-Región, escritura activa) con CloudFront y Lambda@Edge ejecutando la lógica de validación en el edge y Route 53 apuntando a CloudFront ofrece la menor latencia y escritura global.\nOpción A: Global Accelerator + ECS reduce latencia de red pero mantiene la lógica en Regiones concretas, con mas saltos que ejecutar en el edge.\nOpción B: CloudFront con tres origenes EKS no ejecuta la validación en el edge; mayor latencia.\nOpción C: CloudFront Functions no permite acceso a DynamoDB ni lógica de backend con escritura; no sirve para validar y marcar el ticket.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30427,
    "questionNumber": 427,
    "question": "A medical company is running a REST API on a set of Amazon EC2 instances. The EC2 instances run in an Auto Scaling group behind an Application Load Balancer (ALB). The ALB runs in three public subnets, and the EC2 instances run in three private subnets. The company has deployed an Amazon CloudFront distribution that has the ALB as the only origin. Which solution should a solutions architect recommend to enhance the origin security?",
    "choices": [
      {
        "letter": "A",
        "text": "Store a random string in AWS Secrets Manager. Create an AWS Lambda function for automatic secret rotation. Configure CloudFront to inject the random string as a custom HTTP header for the origin request. Create an AWS WAF web ACL rule with a string match rule for the custom header. Associate the web ACL with the ALB.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an AWS WAF web ACL rule with an IP match condition of the CloudFront service IP address ranges. Associate the web ACL with the ALMove the ALB into the three private subnets.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Store a random string in AWS Systems Manager Parameter Store. Configure Parameter Store automatic rotation for the string. Configure CloudFront to inject the random string as a custom HTTP header for the origin request. Inspect the value of the custom HTTP header, and block access in the ALB.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure AWS Shield Advanced Create a security group policy to allow connections from CloudFront service IP address ranges. Add the policy to AWS Shield Advanced, and attach the policy to the ALB.",
        "isCorrect": false
      }
    ],
    "comments": "REST API en EC2 (ASG) detras de un ALB, con CloudFront como unico frontal; hay que reforzar la seguridad del origen para que solo CloudFront alcance el ALB.\n\nOpción A (Correcta): guardar un secreto rotado en Secrets Manager (con Lambda de rotación), inyectarlo como cabecera HTTP personalizada desde CloudFront y crear una regla de WAF en el ALB que exija esa cabecera bloquea el acceso directo que no pase por CloudFront.\nOpción B: WAF con rangos IP de CloudFront es fragil (los rangos cambian) y meter el ALB en subredes privadas rompe el acceso desde CloudFront por internet.\nOpción C: Parameter Store no rota cadenas automaticamente como se describe; solución peor que Secrets Manager + WAF.\nOpción D: Shield Advanced es anti-DDoS; una 'security group policy' con rangos IP de CloudFront no es el mecanismo idoneo ni robusto.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/restrict-access-to-load-balancer.html\nhttps://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30428,
    "questionNumber": 428,
    "question": "To abide by industry regulations, a solutions architect must design a solution that will store a company's critical data in multiple public AWS Regions, including in the United States, where the company's headquarters is located. The solutions architect is required to provide access to the data stored in AWS to the company’s global WAN network. The security team mandates that no traffic accessing this data should traverse the public internet. How should the solutions architect design a highly available solution that meets the requirements and is cost-effective?",
    "choices": [
      {
        "letter": "A",
        "text": "Establish AWS Direct Connect connections from the company headquarters to all AWS Regions in use. Use the company WAN to send traffic over to the headquarters and then to the respective DX connection to access the data.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Establish two AWS Direct Connect connections from the company headquarters to an AWS Region. Use the company WAN to send traffic over a DX connection. Use inter-region VPC peering to access the data in other AWS Regions.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Establish two AWS Direct Connect connections from the company headquarters to an AWS Region. Use the company WAN to send traffic over a DX connection. Use an AWS transit VPC solution to access data in other AWS Regions.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Establish two AWS Direct Connect connections from the company headquarters to an AWS Region. Use the company WAN to send traffic over a DX connection. Use Direct Connect Gateway to access data in other AWS Regions.",
        "isCorrect": true
      }
    ],
    "comments": "Datos criticos replicados en varias Regiones publicas; acceso desde la WAN corporativa SIN que el trafico pase por internet, con alta disponibilidad y coste-efectivo.\n\nOpción D (Correcta): dos conexiones Direct Connect (HA) a una Región y un Direct Connect Gateway permite alcanzar VPCs en multiples Regiones sin salir a internet, de forma escalable y económica.\nOpción A: una DX por cada Región es cara y no es la forma nativa de acceso multi-Región.\nOpción B: el inter-region VPC peering no transporta el trafico de la DX de forma directa como un DX Gateway; menos idoneo.\nOpción C: una 'transit VPC' añade appliances y complejidad/coste frente al DX Gateway nativo.\n\nReferencias:\nhttps://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways.html\nhttps://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30429,
    "questionNumber": 429,
    "question": "A company has developed an application that is running Windows Server on VMware vSphere VMs that the company hosts on premises. The application data is stored in a proprietary format that must be read through the application. The company manually provisioned the servers and the application. As part of its disaster recovery plan, the company wants the ability to host its application on AWS temporarily if the company's on-premises environment becomes unavailable. The company wants the application to return to on-premises hosting after a disaster recovery event is complete. The RPO is 5 minutes. Which solution meets these requirements with the LEAST amount of operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure AWS DataSync. Replicate the data to Amazon Elastic Block Store (Amazon EBS) volumes. When the on-premises environment is unavailable, use AWS CloudFormation templates to provision Amazon EC2 instances and attach the EBS volumes.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure AWS Elastic Disaster Recovery. Replicate the data to replication Amazon EC2 instances that are attached to Amazon Elastic Block Store (Amazon EBS) volumes. When the on-premises environment is unavailable, use Elastic Disaster Recovery to launch EC2 instances that use the replicated volumes.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Provision an AWS Storage Gateway file gateway. Replicate the data to an Amazon S3 bucket. When the on-premises environment is unavailable, use AWS Backup to restore the data to Amazon Elastic Block Store (Amazon EBS) volumes and launch Amazon EC2 instances from these EBS volumes.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Provision an Amazon FSx for Windows File Server file system on AWS. Replicate the data to the file system. When the on-premises environment is unavailable, use AWS CloudFormation templates to provision Amazon EC2 instances and use AWS::CloudFormation::Init commands to mount the Amazon FSx file shares.",
        "isCorrect": false
      }
    ],
    "comments": "App Windows en VMware on-premises con datos en formato propietario; DR temporal en AWS con RPO de 5 minutos y vuelta on-premises tras el evento, con el MENOR overhead operativo.\n\nOpción B (Correcta): AWS Elastic Disaster Recovery (DRS) replica en bloque de forma continua (RPO en minutos), lanza EC2 al fallar y permite failback a on-premises, con minimo esfuerzo operativo.\nOpción A: DataSync replica ficheros, no da RPO de 5 min ni recuperación consistente a nivel de servidor.\nOpción C: File Gateway + Backup no alcanza RPO de 5 min ni orquesta el failover/failback de forma sencilla.\nOpción D: FSx for Windows + CloudFormation es manual y no garantiza RPO de 5 min del servidor completo.\n\nReferencias:\nhttps://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html\nhttps://docs.aws.amazon.com/drs/latest/userguide/failback-overview.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30430,
    "questionNumber": 430,
    "question": "A company runs a highly available data collection application on Amazon EC2 in the eu-north-1 Region. The application collects data from end-user devices and writes records to an Amazon Kinesis data stream and a set of AWS Lambda functions that process the records. The company persists the output of the record processing to an Amazon S3 bucket in eu-north-1. The company uses the data in the S3 bucket as a data source for Amazon Athena. The company wants to increase its global presence. A solutions architect must launch the data collection capabilities in the sa-east-1 and ap-northeast-1 Regions. The solutions architect deploys the application, the Kinesis data stream, and the Lambda functions in the two new Regions. The solutions architect keeps the S3 bucket in eu-north-1 to meet a requirement to centralize the data analysis. During testing of the new setup, the solutions architect notices a significant lag on the arrival of data from the new Regions to the S3 bucket. Which solution will improve this lag time the MOST?",
    "choices": [
      {
        "letter": "A",
        "text": "In each of the two new Regions, set up the Lambda functions to run in a VPC. Set up an S3 gateway endpoint in that VPC.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Turn on S3 Transfer Acceleration on the S3 bucket in eu-north-1. Change the application to use the new S3 accelerated endpoint when the application uploads data to the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an S3 bucket in each of the two new Regions. Set the application in each new Region to upload to its respective S3 bucket. Set up S3 Cross-Region Replication to replicate data to the S3 bucket in eu-north-1.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Increase the memory requirements of the Lambda functions to ensure that they have multiple cores available. Use the multipart upload feature when the application uploads data to Amazon S3 from Lambda.",
        "isCorrect": false
      }
    ],
    "comments": "App de recolección en eu-north-1 que escribe en S3; se expande a sa-east-1 y ap-northeast-1 manteniendo el bucket en eu-north-1 para analisis central, pero aparecen problemas al subir cross-Region.\n\nOpción C (Correcta): crear un bucket en cada Región nueva, subir localmente y usar S3 Cross-Region Replication hacia el bucket de eu-north-1 evita las subidas cross-Region problematicas y mantiene el analisis centralizado.\nOpción A: un gateway endpoint de S3 solo sirve para S3 en la misma Región, no arregla subidas cross-Region.\nOpción B: Transfer Acceleration mejora latencia pero no es la solución robusta para la ingesta multi-Región descrita.\nOpción D: mas memoria/multipart no resuelve la problematica de subir a un bucket en otra Región.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-what-is-isnot-replicated.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30431,
    "questionNumber": 431,
    "question": "A company provides a centralized Amazon EC2 application hosted in a single shared VPC. The centralized application must be accessible from client applications running in the VPCs of other business units. The centralized application front end is configured with a Network Load Balancer (NLB) for scalability. Up to 10 business unit VPCs will need to be connected to the shared VPC. Some of the business unit VPC CIDR blocks overlap with the shared VPC, and some overlap with each other Network connectivity to the centralized application in the shared VPC should be allowed from authorized business unit VPCs only. Which network configuration should a solutions architect use to provide connectivity from the client applications in the business unit VPCs to the centralized application in the shared VPC?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Transit Gateway. Attach the shared VPC and the authorized business unit VPCs to the transit gateway. Create a single transit gateway route table and associate it with all of the attached VPCs. Allow automatic propagation of routes from the attachments into the route table. Configure VPC routing tables to send traffic to the transit gateway.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a VPC endpoint service using the centralized application NLB and enable the option to require endpoint acceptance. Create a VPC endpoint in each of the business unit VPCs using the service name of the endpoint service. Accept authorized endpoint requests from the endpoint service console.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a VPC peering connection from each business unit VPC to the shared VPAccept the VPC peering connections from the shared VPC console. Configure VPC routing tables to send traffic to the VPC peering connection.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure a virtual private gateway for the shared VPC and create customer gateways for each of the authorized business unit VPCs. Establish a Site-to-Site VPN connection from the business unit VPCs to the shared VPC. Configure VPC routing tables to send traffic to the VPN connection.",
        "isCorrect": false
      }
    ],
    "comments": "App centralizada en una shared VPC tras un NLB, que deben consumir hasta 10 VPCs de unidades de negocio; algunos CIDR SE SOLAPAN entre si y con la shared VPC, y solo VPCs autorizadas deben conectar.\n\nOpción B (Correcta): un VPC endpoint service (AWS PrivateLink) sobre el NLB, con aceptación de endpoints obligatoria y un interface endpoint en cada VPC de negocio, funciona con CIDR solapados y limita el acceso a las VPCs aprobadas.\nOpción A: Transit Gateway no admite rutas con CIDR solapados; no sirve aqui.\nOpción C: el VPC peering no funciona con CIDR solapados.\nOpción D: VPN Site-to-Site entre VPCs es compleja, cara y tambien sufre con solapamientos de rutas.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30432,
    "questionNumber": 432,
    "question": "A company wants to migrate its website to AWS. The website uses microservices and runs on containers that are deployed in an on-premises, self-managed Kubernetes cluster. All the manifests that define the deployments for the containers in the Kubernetes deployment are in source control. All data for the website is stored in a PostgreSQL database. An open source container image repository runs alongside the on-premises environment. A solutions architect needs to determine the architecture that the company will use for the website on AWS. Which solution will meet these requirements with the LEAST effort to migrate?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS App Runner service. Connect the App Runner service to the open source container image repository. Deploy the manifests from on premises to the App Runner service. Create an Amazon RDS for PostgreSQL database.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon Elastic Kubernetes Service (Amazon EKS) cluster that has managed node groups. Copy the application containers to a new Amazon Elastic Container Registry (Amazon ECR) repository. Deploy the manifests from on premises to the EKS cluster. Create an Amazon Aurora PostgreSQL DB cluster.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an Amazon Elastic Container Service (Amazon ECS) cluster that has an Amazon EC2 capacity pool. Copy the application containers to a new Amazon Elastic Container Registry (Amazon ECR) repository. Register each container image as a new task definition. Configure ECS services for each task definition to match the original Kubernetes deployments. Create an Amazon Aurora PostgreSQL DB cluster.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Rebuild the on-premises Kubernetes cluster by hosting the cluster on Amazon EC2 instances. Migrate the open source container image repository to the EC2 instances. Deploy the manifests from on premises to the new cluster on AWS. Deploy an open source PostgreSQL database on the new cluster.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar una web de microservicios en Kubernetes autogestionado (manifiestos en control de versiones) con BD PostgreSQL y un registro de imagenes open source; con el MENOR esfuerzo de migración.\n\nOpción B (Correcta): Amazon EKS con managed node groups permite reutilizar los manifiestos de Kubernetes casi sin cambios; se copian las imagenes a ECR y la BD pasa a Aurora PostgreSQL: minimo esfuerzo de migración desde K8s.\nOpción A: App Runner no consume manifiestos de Kubernetes; requeriria rehacer el despliegue.\nOpción C: ECS obliga a reescribir manifiestos como task definitions/servicios: mas esfuerzo.\nOpción D: autogestionar Kubernetes en EC2 replica la carga operativa on-premises; no aporta gestión gestionada ni reduce esfuerzo.\n\nReferencias:\nhttps://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html\nhttps://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30433,
    "questionNumber": 433,
    "question": "A company uses a mobile app on AWS to run online contests. The company selects a winner at random at the end of each contest. The contests run for variable lengths of time. The company does not need to retain any data from a contest after the contest is finished. The company uses custom code that is hosted on Amazon EC2 instances to process the contest data and select a winner. The EC2 instances run behind an Application Load Balancer and store contest entries on Amazon RDS DB instances. The company must design a new architecture to reduce the cost of running the contests. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate storage of the contest entries to Amazon DynamoDB. Create a DynamoDB Accelerator (DAX) cluster. Rewrite the code to run as Amazon Elastic Container Service (Amazon ECS) containers that use the Fargate launch type. At the end of the contest, delete the DynamoDB table.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Migrate the storage of the contest entries to Amazon Redshift. Rewrite the code as AWS Lambda functions. At the end of the contest, delete the Redshift cluster.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Add an Amazon ElastiCache for Redis cluster in front of the RDS DB instances to cache the contest entries. Rewrite the code to run as Amazon Elastic Container Service (Amazon ECS) containers that use the Fargate launch type. Set the ElastiCache TTL attribute on each entry to expire each entry at the end of the contest.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Migrate the storage of the contest entries to Amazon DynamoDB. Rewrite the code as AWS Lambda functions. Set the DynamoDB TTL attribute on each entry to expire each entry at the end of the contest.",
        "isCorrect": true
      }
    ],
    "comments": "Concursos de duración variable sin necesidad de retener datos tras finalizar; código propio en EC2 tras ALB con RDS. Rediseñar para reducir coste del modo MAS coste-efectivo.\n\nOpción D (Correcta): DynamoDB (pago por uso) con atributo TTL que expira las entradas al terminar el concurso, y el código como funciones Lambda (sin servidores en reposo), es lo mas económico para cargas intermitentes.\nOpción A: DynamoDB + DAX + ECS Fargate añade coste de DAX y de contenedores en ejecución continua, innecesario.\nOpción B: Redshift es un data warehouse sobredimensionado y caro para este caso.\nOpción C: ElastiCache + Fargate mantiene RDS y añade coste de cache/contenedores; no es lo mas barato.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30434,
    "questionNumber": 434,
    "question": "A company has implemented a new security requirement. According to the new requirement, the company must scan all traffic from corporate AWS instances in the company's VPC for violations of the company's security policies. As a result of these scans, the company can block access to and from specific IP addresses. To meet the new requirement, the company deploys a set of Amazon EC2 instances in private subnets to serve as transparent proxies. The company installs approved proxy server software on these EC2 instances. The company modifies the route tables on all subnets to use the corresponding EC2 instances with proxy software as the default route. The company also creates security groups that are compliant with the security policies and assigns these security groups to the EC2 instances. Despite these configurations, the traffic of the EC2 instances in their private subnets is not being properly forwarded to the internet. What should a solutions architect do to resolve this issue?",
    "choices": [
      {
        "letter": "A",
        "text": "Disable source/destination checks on the EC2 instances that run the proxy software.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Add a rule to the security group that is assigned to the proxy EC2 instances to allow all traffic between instances that have this security group. Assign this security group to all EC2 instances in the VPC.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Change the VPCs DHCP options set. Set the DNS server options to point to the addresses of the proxy EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Assign one additional elastic network interface to each proxy EC2 instance. Ensure that one of these network interfaces has a route to the private subnets. Ensure that the other network interface has a route to the internet.",
        "isCorrect": false
      }
    ],
    "comments": "Proxies transparentes en EC2 en subredes privadas como ruta por defecto para inspeccionar trafico; pese a rutas y security groups, el trafico de las instancias no fluye por los proxies.\n\nOpción A (Correcta): una instancia EC2 que reenvia trafico que no es suyo debe tener deshabilitado el source/destination check; si no, descarta esos paquetes.\nOpción B: reglas de security group entre instancias no habilitan el reenvio de trafico por la instancia proxy.\nOpción C: cambiar DHCP para apuntar el DNS a los proxies no encamina el trafico de red por ellos.\nOpción D: añadir ENIs no resuelve el problema de fondo, que es el source/destination check activo.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30435,
    "questionNumber": 435,
    "question": "A company is running its solution on AWS in a manually created VPC. The company is using AWS CloudFormation to provision other parts of the infrastructure. According to a new requirement, the company must manage all infrastructure in an automatic way. What should the company do to meet this new requirement with the LEAST effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new AWS Cloud Development Kit (AWS CDK) stack that strictly provisions the existing VPC resources and configuration. Use AWS CDK to import the VPC into the stack and to manage the VPC.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a CloudFormation stack set that creates the VPC. Use the stack set to import the VPC into the stack.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a new CloudFormation template that strictly provisions the existing VPC resources and configuration. From the CloudFormation console, create a new stack by importing the Existing resources.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create a new CloudFormation template that creates the VPC. Use the AWS Serverless Application Model (AWS SAM) CLI to import the VPC.",
        "isCorrect": false
      }
    ],
    "comments": "VPC creada manualmente y otras partes con CloudFormation; se quiere gestionar TODA la infraestructura de forma automatica con el MENOR esfuerzo.\n\nOpción C (Correcta): crear una plantilla CloudFormation que describa exactamente la VPC existente e importarla como recursos a un nuevo stack (resource import) pone la VPC bajo gestión de CFN sin recrearla.\nOpción A: CDK tambien podria, pero implica mas esfuerzo (nuevo framework) que un simple import a CloudFormation ya usado.\nOpción B: un StackSet crea recursos en varias cuentas/Regiones; no es el mecanismo para importar una VPC existente.\nOpción D: SAM CLI no importa una VPC existente; SAM es para serverless.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resource-import.html\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resource-import-new-stack.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30436,
    "questionNumber": 436,
    "question": "A company has developed a new release of a popular video game and wants to make it available for public download. The new release package is approximately 5 GB in size. The company provides downloads for existing releases from a Linux-based, publicly facing FTP site hosted in an on-premises data center. The company expects the new release will be downloaded by users worldwide. The company wants a solution that provides improved download performance and low transfer costs, regardless of a user's location.",
    "choices": [
      {
        "letter": "A",
        "text": "Store the game files on Amazon EBS volumes mounted on Amazon EC2 instances within an Auto Scaling group. Configure an FTP service on the EC2 instances. Use an Application Load Balancer in front of the Auto Scaling group. Publish the game download URL for users to download the package.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Store the game files on Amazon EFS volumes that are attached to Amazon EC2 instances within an Auto Scaling group. Configure an FTP service on each of the EC2 instances. Use an Application Load Balancer in front of the Auto Scaling group. Publish the game download URL for users to download the package.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure Amazon Route 53 and an Amazon S3 bucket for website hosting. Upload the game files to the S3 bucket. Use Amazon CloudFront for the website. Publish the game download URL for users to download the package.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure Amazon Route 53 and an Amazon S3 bucket for website hosting. Upload the game files to the S3 bucket. Set Requester Pays for the S3 bucket. Publish the game download URL for users to download the package.",
        "isCorrect": false
      }
    ],
    "comments": "Distribución global de un paquete de juego de ~5 GB descargado por usuarios de todo el mundo; se busca mejor rendimiento de descarga y bajo coste de transferencia sin importar la ubicación.\n\nOpción C (Correcta): alojar los ficheros en S3 y servirlos por CloudFront (con Route 53) da baja latencia global por caché en el edge y menor coste de transferencia que EC2/FTP.\nOpción A: EC2 + EBS + FTP tras ALB no cachea globalmente ni es barato; alto overhead.\nOpción B: EC2 + EFS + FTP tampoco ofrece distribución global cacheada.\nOpción D: Requester Pays traslada el coste al usuario, pero no mejora el rendimiento global; CloudFront es lo idóneo.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30437,
    "questionNumber": 437,
    "question": "A company runs an application in the cloud that consists of a database and a website. Users can post data to the website, have the data processed, and have the data sent back to them in an email. Data is stored in a MySQL database running on an Amazon EC2 instance. The database is running in a VPC with two private subnets. The website is running on Apache Tomcat in a single EC2 instance in a different VPC with one public subnet. There is a single VPC peering connection between the database and website VPC. The website has suffered several outages during the last month due to high traffic. Which actions should a solutions architect take to increase the reliability of the application? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Place the Tomcat server in an Auto Scaling group with multiple EC2 instances behind an Application Load Balancer.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Provision an additional VPC peering connection.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Migrate the MySQL database to Amazon Aurora with one Aurora Replica.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Provision two NAT gateways in the database VPC.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Move the Tomcat server to the database VPC.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Create an additional public subnet in a different Availability Zone in the website VPC.",
        "isCorrect": true
      }
    ],
    "comments": "App con web en Tomcat (una sola EC2, una subred publica) y BD MySQL en EC2 (dos subredes privadas), con caidas por trafico alto. Aumentar la FIABILIDAD (elegir tres).\n\nOpción A (Correcta): poner Tomcat en un Auto Scaling group con varias EC2 tras un ALB elimina el punto unico y escala con el trafico.\nOpción C (Correcta): migrar MySQL a Aurora con una Aurora Replica aporta redundancia y failover de la capa de datos.\nOpción F (Correcta): crear una subred publica adicional en otra AZ habilita el despliegue multi-AZ del frontend tras el ALB.\nOpción B: una segunda conexión de VPC peering no aporta fiabilidad a la app.\nOpción D: dos NAT gateways ayudan a salida a internet, no a la disponibilidad del frontend/BD aqui.\nOpción E: mover Tomcat a la VPC de la BD no aumenta la disponibilidad.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30438,
    "questionNumber": 438,
    "question": "A retail company is operating its ecommerce application on AWS. The application runs on Amazon EC2 instances behind an Application Load Balancer (ALB). The company uses an Amazon RDS DB instance as the database backend. Amazon CloudFront is configured with one origin that points to the ALB. Static content is cached. Amazon Route 53 is used to host all public zones. After an update of the application, the ALB occasionally returns a 502 status code (Bad Gateway) error. The root cause is malformed HTTP headers that are returned to the ALB. The webpage returns successfully when a solutions architect reloads the webpage immediately after the error occurs. While the company is working on the problem, the solutions architect needs to provide a custom error page instead of the standard ALB error page to visitors. Which combination of steps will meet this requirement with the LEAST amount of operational overhead? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon S3 bucket. Configure the S3 bucket to host a static webpage. Upload the custom error pages to Amazon S3.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an Amazon CloudWatch alarm to invoke an AWS Lambda function if the ALB health check response Target.FailedHealthChecks is greater than 0. Configure the Lambda function to modify the forwarding rule at the ALB to point to a publicly accessible web server.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Modify the existing Amazon Route 53 records by adding health checks. Configure a fallback target if the health check fails. Modify DNS records to point to a publicly accessible webpage.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Amazon CloudWatch alarm to invoke an AWS Lambda function if the ALB health check response Elb.InternalError is greater than 0. Configure the Lambda function to modify the forwarding rule at the ALB to point to a public accessible web server.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Add a custom error response by configuring a CloudFront custom error page. Modify DNS records to point to a publicly accessible web page.",
        "isCorrect": true
      }
    ],
    "comments": "CloudFront->ALB->EC2 con RDS; el ALB devuelve 502 esporadicos por cabeceras HTTP mal formadas. Mientras se corrige, mostrar una pagina de error personalizada con el MENOR esfuerzo (elegir dos).\n\nOpción A (Correcta): crear un bucket S3 con hosting estatico y subir las paginas de error personalizadas provee el contenido de error a servir.\nOpción E (Correcta): configurar una custom error response en CloudFront que apunte a esa pagina muestra el error personalizado sin tocar el backend.\nOpción B: una Lambda que reescribe reglas del ALB por health checks es complejo y reactivo.\nOpción C: health checks de Route 53 con failover no sustituye la pagina de error de un 502 puntual y añade cambios de DNS.\nOpción D: igual que B, usa una metrica que no aplica y añade complejidad.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GeneratingCustomErrorResponses.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30439,
    "questionNumber": 439,
    "question": "A company wants to migrate an Amazon Aurora MySQL DB cluster from an existing AWS account to a new AWS account in the same AWS Region. Both accounts are members of the same organization in AWS Organizations. The company must minimize database service interruption before the company performs DNS cutover to the new database. Which migration strategy will meet this requirement? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Take a snapshot of the existing Aurora database. Share the snapshot with the new AWS account. Create an Aurora DB cluster in the new account from the snapshot.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an Aurora DB cluster in the new AWS account. Use AWS Database Migration Service (AWS DMS) to migrate data between the two Aurora DB clusters.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS Backup to share an Aurora database backup from the existing AWS account to the new AWS account. Create an Aurora DB cluster in the new AWS account from the snapshot.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Aurora DB cluster in the new AWS account. Use AWS Application Migration Service to migrate data between the two Aurora DB clusters.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar un Aurora MySQL de una cuenta a otra en la misma Región (misma organización), minimizando la interrupción antes del cutover de DNS (elegir dos).\n\nOpción A (Correcta): tomar un snapshot, compartirlo con la nueva cuenta y crear el cluster desde el snapshot es un metodo valido y directo de migración entre cuentas.\nOpción B (Correcta): crear el cluster en la nueva cuenta y usar AWS DMS para migrar/replicar datos minimiza la interrupción manteniendo sincronia hasta el cutover.\nOpción C: AWS Backup no comparte 'snapshots de Aurora' entre cuentas de esa forma para recrear el cluster como se describe.\nOpción D: Application Migration Service (MGN) migra servidores, no datos entre clusters Aurora.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-copy-snapshot.html\nhttps://docs.aws.amazon.com/dms/latest/userguide/Welcome.html",
    "category": "Migración y Modernización",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30440,
    "questionNumber": 440,
    "question": "A software as a service (SaaS) company provides a media software solution to customers. The solution is hosted on 50 VPCs across various AWS Regions and AWS accounts. One of the VPCs is designated as a management VPC. The compute resources in the VPCs work independently. The company has developed a new feature that requires all 50 VPCs to be able to communicate with each other. The new feature also requires one-way access from each customer's VPC to the company's management VPC. The management VPC hosts a compute resource that validates licenses for the media software solution. The number of VPCs that the company will use to host the solution will continue to increase as the solution grows. Which combination of steps will provide the required VPC connectivity with the LEAST operational overhead? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a transit gateway. Attach all the company's VPCs and relevant subnets to the transit gateway.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create VPC peering connections between all the company's VPCs.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a Network Load Balancer (NLB) that points to the compute resource for license validation. Create an AWS PrivateLink endpoint service that is available to each customer's VPAssociate the endpoint service with the NLB.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create a VPN appliance in each customer's VPC. Connect the company's management VPC to each customer's VPC by using AWS Site-to-Site VPN.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Create a VPC peering connection between the company's management VPC and each customer's VPC.",
        "isCorrect": false
      }
    ],
    "comments": "SaaS con 50 VPCs en varias Regiones/cuentas que deben comunicarse entre si, mas acceso unidireccional de cada VPC de cliente a la VPC de gestión (validación de licencias), creciendo en numero. MENOR overhead (elegir dos).\n\nOpción A (Correcta): un Transit Gateway al que se adjuntan todas las VPCs escala la conectividad any-to-any con minimo overhead operativo.\nOpción C (Correcta): un NLB + AWS PrivateLink (endpoint service) para el recurso de validación de licencias ofrece acceso unidireccional y seguro desde cada VPC de cliente al servicio de gestión.\nOpción B: peering full-mesh entre 50 VPCs es inmanejable (N^2) y no escala.\nOpción D: appliances VPN por cada VPC de cliente añaden mucho overhead.\nOpción E: peering de gestión con cada VPC de cliente no da la comunicación any-to-any requerida ni escala bien.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30441,
    "questionNumber": 441,
    "question": "A company has multiple lines of business (LOBs) that roll up to the parent company. The company has asked its solutions architect to develop a solution with the following requirements: • Produce a single AWS invoice for all of the AWS accounts used by its LOBs. • The costs for each LOB account should be broken out on the invoice. • Provide the ability to restrict services and features in the LOB accounts, as defined by the company's governance policy. • Each LOB account should be delegated full administrator permissions, regardless of the governance policy. Which combination of steps should the solutions architect take to meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Organizations to create an organization in the parent account for each LOB. Then invite each LOB account to the appropriate organization.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Organizations to create a single organization in the parent account. Then, invite each LOB's AWS account to join the organization.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Implement service quotas to define the services and features that are permitted and apply the quotas to each LOB. as appropriate.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an SCP that allows only approved services and features, then apply the policy to the LOB accounts.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Enable consolidated billing in the parent account's billing console and link the LOB accounts.",
        "isCorrect": false
      }
    ],
    "comments": "LOBs bajo una matriz: factura AWS unica con costes desglosados por cuenta, restringir servicios segun gobierno, pero cada cuenta LOB con permisos de administrador completos (elegir dos).\n\nOpción B (Correcta): una unica organización en AWS Organizations en la cuenta matriz con las cuentas LOB invitadas da facturación consolidada (factura unica con desglose por cuenta).\nOpción D (Correcta): una SCP que solo permita los servicios/funciones aprobados aplica el gobierno; las SCP restringen incluso a administradores, dejando 'admin completo dentro de lo permitido'.\nOpción A: crear una organización por LOB rompe la factura unica consolidada.\nOpción C: los service quotas limitan cuotas de uso, no habilitan/deshabilitan servicios por gobierno.\nOpción E: la facturación consolidada ya viene con Organizations; 'enable consolidated billing' aislado no cubre el gobierno.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html\nhttps://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30442,
    "questionNumber": 442,
    "question": "A solutions architect has deployed a web application that serves users across two AWS Regions under a custom domain. The application uses Amazon Route 53 latency-based routing. The solutions architect has associated weighted record sets with a pair of web servers in separate Availability Zones for each Region. The solutions architect runs a disaster recovery scenario. When all the web servers in one Region are stopped, Route 53 does not automatically redirect users to the other Region. Which of the following are possible root causes of this issue? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "The weight for the Region where the web servers were stopped is higher than the weight for the other Region.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "One of the web servers in the secondary Region did not pass its HTTP health check.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Latency resource record sets cannot be used in combination with weighted resource record sets.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "The setting to evaluate target health is not turned on for the latency alias resource record set that is associated with the domain in the Region where the web servers were stopped.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "An HTTP health check has not been set up for one or more of the weighted resource record sets associated with the stopped web servers.",
        "isCorrect": true
      }
    ],
    "comments": "Route 53 latency-based con weighted record sets por Región (dos AZ por Región); al parar todos los servidores de una Región, Route 53 NO redirige. Causas raiz probables (elegir dos).\n\nOpción D (Correcta): si 'Evaluate Target Health' no esta activado en el alias de latencia de esa Región, Route 53 no detecta que no hay endpoints sanos y sigue enviando trafico.\nOpción E (Correcta): si no hay health checks configurados en los weighted record sets de los servidores parados, Route 53 no sabe que estan caidos.\nOpción A: un peso mayor no impide el failover si la salud se evalua correctamente; no es la causa raiz.\nOpción B: un fallo en un servidor de la Región secundaria no explica que no se redirija desde la primaria.\nOpción C: falso; latency y weighted si pueden combinarse.\n\nReferencias:\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-complex-configs.html\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30443,
    "questionNumber": 443,
    "question": "A flood monitoring agency has deployed more than 10,000 water-level monitoring sensors. Sensors send continuous data updates, and each update is less than 1 MB in size. The agency has a fleet of on-premises application servers. These servers receive updates from the sensors, convert the raw data into a human readable format, and write the results to an on-premises relational database server. Data analysts then use simple SQL queries to monitor the data. The agency wants to increase overall application availability and reduce the effort that is required to perform maintenance tasks. These maintenance tasks, which include updates and patches to the application servers, cause downtime. While an application server is down, data is lost from sensors because the remaining servers cannot handle the entire workload. The agency wants a solution that optimizes operational overhead and costs. A solutions architect recommends the use of AWS IoT Core to collect the sensor data. What else should the solutions architect recommend to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Send the sensor data to Amazon Kinesis Data Firehose. Use an AWS Lambda function to read the Kinesis Data Firehose data, convert it to .csv format, and insert it into an Amazon Aurora MySQL DB instance. Instruct the data analysts to query the data directly from the DB instance.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Send the sensor data to Amazon Kinesis Data Firehose. Use an AWS Lambda function to read the Kinesis Data Firehose data, convert it to Apache Parquet format, and save it to an Amazon S3 bucket. Instruct the data analysts to query the data by using Amazon Athena.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Send the sensor data to an Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) application to convert the data to .csv format and store it in an Amazon S3 bucket. Import the data into an Amazon Aurora MySQL DB instance. Instruct the data analysts to query the data directly from the DB instance.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Send the sensor data to an Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) application to convert the data to Apache Parquet format and store it in an Amazon S3 bucket. Instruct the data analysts to query the data by using Amazon Athena.",
        "isCorrect": false
      }
    ],
    "comments": ">10.000 sensores enviando actualizaciones continuas (<1 MB); servidores on-premises convierten y escriben en una BD relacional; se quiere mas disponibilidad y menos mantenimiento, optimizando overhead y coste, con analistas usando SQL.\n\nOpción B (Correcta): Kinesis Data Firehose + Lambda que convierte a Apache Parquet y guarda en S3, consultado con Athena, es serverless, altamente disponible, barato y evita la perdida de datos por caidas de servidores.\nOpción A: escribir en Aurora MySQL en .csv mantiene una BD que operar y no es tan barato/escalable como S3+Athena.\nOpción C: Flink + Aurora añade complejidad operativa y coste frente a S3+Athena.\nOpción D: aunque usa Parquet+Athena, Managed Flink es mas caro/complejo que Firehose+Lambda para esta simple conversión.\n\nReferencias:\nhttps://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html\nhttps://docs.aws.amazon.com/athena/latest/ug/what-is.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30444,
    "questionNumber": 444,
    "question": "A public retail web application uses an Application Load Balancer (ALB) in front of Amazon EC2 instances running across multiple Availability Zones (AZs) in a Region backed by an Amazon RDS MySQL Multi-AZ deployment. Target group health checks are configured to use HTTP and pointed at the product catalog page. Auto Scaling is configured to maintain the web fleet size based on the ALB health check. Recently, the application experienced an outage. Auto Scaling continuously replaced the instances during the outage. A subsequent investigation determined that the web server metrics were within the normal range, but the database tier was experiencing high load, resulting in severely elevated query response times. Which of the following changes together would remediate these issues while improving monitoring capabilities for the availability and functionality of the entire application stack for future growth? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Configure read replicas for Amazon RDS MySQL and use the single reader endpoint in the web application to reduce the load on the backend database tier.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure the target group health check to point at a simple HTML page instead of a product catalog page and the Amazon Route 53 health check against the product page to evaluate full application functionality. Configure Amazon CloudWatch alarms to notify administrators when the site fails.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Configure the target group health check to use a TCP check of the Amazon EC2 web server and the Amazon Route 53 health check against the product page to evaluate full application functionality. Configure Amazon CloudWatch alarms to notify administrators when the site fails.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure an Amazon CloudWatch alarm for Amazon RDS with an action to recover a high-load, impaired RDS instance in the database tier.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Configure an Amazon ElastiCache cluster and place it between the web application and RDS MySQL instances to reduce the load on the backend database tier.",
        "isCorrect": true
      }
    ],
    "comments": "ALB->EC2 multi-AZ con RDS MySQL Multi-AZ; health check apunta a la pagina de catalogo. Durante un pico de carga de BD, Auto Scaling reemplazaba instancias en bucle. Remediar y mejorar la monitorización de todo el stack (elegir dos).\n\nOpción B (Correcta): apuntar el health check del target group a una pagina HTML simple (evita reemplazos por lentitud de BD) y usar un health check de Route 53 contra la pagina de producto para evaluar la funcionalidad completa, con alarmas de CloudWatch.\nOpción E (Correcta): añadir ElastiCache entre la web y RDS reduce la carga de la BD, atacando la causa raiz de la latencia.\nOpción A: réplicas de lectura con un unico reader endpoint ayudan a lecturas pero no evitan el bucle de reemplazos ni mejoran la monitorización descrita.\nOpción C: un health check TCP oculta fallos de aplicación y no da la visibilidad de funcionalidad requerida.\nOpción D: 'recover' de RDS es para fallos de instancia, no para alta carga de consultas.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html\nhttps://docs.aws.amazon.com/AmazonElastiCache/latest/mem-ug/WhatIs.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30445,
    "questionNumber": 445,
    "question": "A company has an on-premises data center and is using Kubernetes to develop a new solution on AWS. The company uses Amazon Elastic Kubernetes Service (Amazon EKS) clusters for its development and test environments. The EKS control plane and data plane for production workloads must reside on premises. The company needs an AWS managed solution for Kubernetes management. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Install an AWS Outposts server in the on-premises data center. Deploy Amazon EKS by using a local cluster configuration on the Outposts server for the production workloads.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Install Amazon EKS Anywhere on the company's hardware in the on-premises data center. Deploy the production workloads on an EKS Anywhere cluster.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Install an AWS Outposts server in the on-premises data center. Deploy Amazon EKS by using an extended cluster configuration on the Outposts server for the production workloads.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Install an AWS Outposts server in the on-premises data center. Install Amazon EKS Anywhere on the Outposts server. Deploy the production workloads on an EKS Anywhere cluster.",
        "isCorrect": false
      }
    ],
    "comments": "EKS para dev/test en AWS, pero el control plane y data plane de PRODUCCIÓN deben residir ON-PREMISES; se quiere una solución de Kubernetes GESTIONADA por AWS con el MENOR overhead.\n\nOpción A (Correcta): un AWS Outposts en el CPD con EKS en configuración de 'local cluster' mantiene control y data plane on-premises con un servicio gestionado por AWS.\nOpción B: EKS Anywhere se ejecuta en tu hardware pero NO es gestionado por AWS (el cliente lo opera), no cumple 'AWS managed'.\nOpción C: la configuración 'extended' de EKS en Outposts mantiene el control plane en la Región AWS, no on-premises.\nOpción D: instalar EKS Anywhere sobre Outposts mezcla dos productos y no reduce overhead.\n\nReferencias:\nhttps://docs.aws.amazon.com/eks/latest/userguide/eks-outposts-local-cluster-overview.html\nhttps://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30446,
    "questionNumber": 446,
    "question": "A company uses AWS Organizations to manage its development environment. Each development team at the company has its own AWS account. Each account has a single VPC and CIDR blocks that do not overlap. The company has an Amazon Aurora DB cluster in a shared services account. All the development teams need to work with live data from the DB cluster. Which solution will provide the required connectivity to the DB cluster with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Resource Access Manager (AWS RAM) resource share for the DB cluster. Share the DB cluster with all the development accounts.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a transit gateway in the shared services account. Create an AWS Resource Access Manager (AWS RAM) resource share for the transit gateway. Share the transit gateway with all the development accounts. Instruct the developers to accept the resource share. Configure networking.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an Application Load Balancer (ALB) that points to the IP address of the DB cluster. Create an AWS PrivateLink endpoint service that uses the ALB. Add permissions to allow each development account to connect to the endpoint service.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Site-to-Site VPN connection in the shared services account. Configure networking. Use AWS Marketplace VPN software in each development account to connect to the Site-to-Site VPN connection.",
        "isCorrect": false
      }
    ],
    "comments": "Organización con una cuenta por equipo (VPC con CIDR no solapados); todos los equipos necesitan acceso a datos en vivo de un Aurora en la cuenta de shared services, con el MENOR overhead.\n\nOpción B (Correcta): un Transit Gateway en shared services compartido via AWS RAM con las cuentas de desarrollo, y el enrutado configurado, da conectividad de red escalable y de bajo overhead a la BD.\nOpción A: RAM no comparte un cluster Aurora entre cuentas para conexión directa de red.\nOpción C: ALB apuntando a la IP del cluster + PrivateLink es fragil (IP cambiante) y mas complejo.\nOpción D: Site-to-Site VPN con software de Marketplace en cada cuenta añade mucho overhead operativo.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/tgw/tgw-transit-gateways.html\nhttps://docs.aws.amazon.com/ram/latest/userguide/what-is.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30447,
    "questionNumber": 447,
    "question": "A company used AWS CloudFormation to create all new infrastructure in its AWS member accounts. The resources rarely change and are properly sized for the expected load. The monthly AWS bill is consistent. Occasionally, a developer creates a new resource for testing and forgets to remove the resource when the test is complete. Most of these tests last a few days before the resources are no longer needed. The company wants to automate the process of finding unused resources. A solutions architect needs to design a solution that determines whether the cost in the AWS bill is increasing. The solution must help identify resources that cause an increase in cost and must automatically notify the company's operations team. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Turn on billing alerts. Use AWS Cost Explorer to determine the costs for the past month. Create an Amazon CloudWatch alarm for total estimated charges. Specify a cost threshold that is higher than the costs that Cost Explorer determined. Add a notification to alert the operations team if the alarm threshold is breached.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Turn on billing alerts. Use AWS Cost Explorer to determine the average monthly costs for the past 3 months. Create an Amazon CloudWatch alarm for total estimated charges. Specify a cost threshold that is higher than the costs that Cost Explorer determined. Add a notification to alert the operations team if the alarm threshold is breached.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Cost Anomaly Detection to create a cost monitor that has a monitor type of Linked account. Create a subscription to send daily AWS cost summaries to the operations team. Specify a threshold for cost variance.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Cost Anomaly Detection to create a cost monitor that has a monitor type of AWS services. Create a subscription to send daily AWS cost summaries to the operations team. Specify a threshold for cost variance.",
        "isCorrect": true
      }
    ],
    "comments": "Infra estable con factura constante, pero recursos de prueba olvidados suben el coste; se quiere detectar automaticamente incrementos, identificar los recursos causantes y NOTIFICAR al equipo de operaciones.\n\nOpción D (Correcta): AWS Cost Anomaly Detection con un monitor de tipo 'AWS services' detecta anomalias por servicio (identifica el causante) y con una suscripción notifica al equipo segun umbral de varianza.\nOpción A/B: alarmas de CloudWatch sobre cargos estimados detectan que el coste sube, pero no identifican el recurso/servicio causante ni son 'anomalia'.\nOpción C: el monitor 'Linked account' agrupa por cuenta, menos util aqui que 'AWS services' para señalar el servicio con el gasto anómalo.\n\nReferencias:\nhttps://docs.aws.amazon.com/cost-management/latest/userguide/getting-started-ad.html\nhttps://docs.aws.amazon.com/cost-management/latest/userguide/ad-subscriptions.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30448,
    "questionNumber": 448,
    "question": "A company is deploying a new web-based application and needs a storage solution for the Linux application servers. The company wants to create a single location for updates to application data for all instances. The active dataset will be up to 100 GB in size. A solutions architect has determined that peak operations will occur for 3 hours daily and will require a total of 225 MiBps of read throughput. The solutions architect must design a Multi-AZ solution that makes a copy of the data available in another AWS Region for disaster recovery (DR). The DR copy has an RPO of less than 1 hour. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy a new Amazon Elastic File System (Amazon EFS) Multi-AZ file system. Configure the file system for 75 MiBps of provisioned throughput. Implement replication to a file system in the DR Region.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Deploy a new Amazon FSx for Lustre file system. Configure Bursting Throughput mode for the file system. Use AWS Backup to back up the file system to the DR Region.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy a General Purpose SSD (gp3) Amazon Elastic Block Store (Amazon EBS) volume with 225 MiBps of throughput. Enable Multi-Attach for the EBS volume. Use AWS Elastic Disaster Recovery to replicate the EBS volume to the DR Region.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy an Amazon FSx for OpenZFS file system in both the production Region and the DR Region. Create an AWS DataSync scheduled task to replicate the data from the production file system to the DR file system every 10 minutes.",
        "isCorrect": false
      }
    ],
    "comments": "Almacenamiento compartido para servidores Linux (una unica ubicación de datos), dataset <=100 GB, pico de 3h/dia con 225 MiBps de lectura, Multi-AZ y copia en otra Región para DR con RPO<1h.\n\nOpción A (Correcta): EFS Multi-AZ con throughput aprovisionado y replicación a un sistema de ficheros en la Región de DR cumple almacenamiento compartido, Multi-AZ y RPO<1h nativo de EFS Replication.\nOpción B: FSx for Lustre en modo Bursting no garantiza el throughput y AWS Backup no da RPO<1h continuo entre Regiones para este caso.\nOpción C: un volumen EBS Multi-Attach no es un share NFS multi-AZ; es limitado y no idoneo.\nOpción D: FSx OpenZFS + DataSync cada 10 min es mas operativo y complejo que la replicación nativa de EFS.\n\nReferencias:\nhttps://docs.aws.amazon.com/efs/latest/ug/efs-replication.html\nhttps://docs.aws.amazon.com/efs/latest/ug/performance.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30449,
    "questionNumber": 449,
    "question": "A company needs to gather data from an experiment in a remote location that does not have internet connectivity. During the experiment, sensors that are connected to a local network will generate 6 TB of data in a proprietary format over the course of 1 week. The sensors can be configured to upload their data files to an FTP server periodically, but the sensors do not have their own FTP server. The sensors also do not support other protocols. The company needs to collect the data centrally and move the data to object storage in the AWS Cloud as soon as possible after the experiment. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Order an AWS Snowball Edge Compute Optimized device. Connect the device to the local network. Configure AWS DataSync with a target bucket name, and unload the data over NFS to the device. After the experiment, return the device to AWS so that the data can be loaded into Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Order an AWS Snowcone device, including an Amazon Linux 2 AMI. Connect the device to the local network. Launch an Amazon EC2 instance on the device. Create a shell script that periodically downloads data from each sensor. After the experiment, return the device to AWS so that the data can be loaded as an Amazon Elastic Block Store (Amazon EBS) volume.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Order an AWS Snowcone device, including an Amazon Linux 2 AMI. Connect the device to the local network. Launch an Amazon EC2 instance on the device. Install and configure an FTP server on the EC2 instance. Configure the sensors to upload data to the EC2 instance. After the experiment, return the device to AWS so that the data can be loaded into Amazon S3.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Order an AWS Snowcone device. Connect the device to the local network. Configure the device to use Amazon FSx. Configure the sensors to upload data to the device. Configure AWS DataSync on the device to synchronize the uploaded data with an Amazon S3 bucket. Return the device to AWS so that the data can be loaded as an Amazon Elastic Block Store (Amazon EBS) volume.",
        "isCorrect": false
      }
    ],
    "comments": "Ubicación remota SIN internet; sensores generan 6 TB en 1 semana y SOLO pueden subir por FTP, pero no tienen servidor FTP. Recoger centralmente y mover a S3 cuanto antes tras el experimento.\n\nOpción C (Correcta): un AWS Snowcone con una EC2 (Amazon Linux 2) ejecutando un servidor FTP recibe los datos de los sensores localmente; tras el experimento se devuelve el dispositivo y los datos cargan en S3.\nOpción A: DataSync sobre NFS no ofrece el servidor FTP que los sensores necesitan.\nOpción B: un script que 'descarga' de cada sensor no aplica: los sensores suben por FTP, no exponen descarga.\nOpción D: configurar FSx en Snowcone y DataSync no da un endpoint FTP para los sensores.\n\nReferencias:\nhttps://docs.aws.amazon.com/snowball/latest/snowcone-guide/whatissnowcone.html\nhttps://docs.aws.amazon.com/snowball/latest/snowcone-guide/snowcone-using-ec2.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30450,
    "questionNumber": 450,
    "question": "A company that has multiple business units is using AWS Organizations with all features enabled. The company has implemented an account structure in which each business unit has its own AWS account. Administrators in each AWS account need to view detailed cost and utilization data for their account by using Amazon Athena. Each business unit can have access to only its own cost and utilization data. The IAM policies that govern the ability to set up AWS Cost and Usage Reports are in place. A central Cost and Usage Report that contains all data for the organization is already available in an Amazon S3 bucket. Which solution will meet these requirements with the LEAST operational complexity?",
    "choices": [
      {
        "letter": "A",
        "text": "In the organization's management account, use AWS Resource Access Manager (AWS RAM) to share the Cost and Usage Report data with each member account.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "In the organization's management account, configure an S3 event to invoke an AWS Lambda function each time a new file arrives in the S3 bucket that contains the central Cost and Usage Report. Configure the Lambda function to extract each member account’s data and to place the data in Amazon S3 under a separate prefix. Modify the S3 bucket policy to allow each member account to access its own prefix.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "In each member account, access AWS Cost Explorer. Create a new report that contains relevant cost information for the account. Save the report in Cost Explorer. Provide instructions that the account administrators can use to access the saved report.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "In each member account, create a new S3 bucket to store Cost and Usage Report data. Set up a Cost and Usage Report to deliver the data to the new S3 bucket.",
        "isCorrect": true
      }
    ],
    "comments": "Organizations con una cuenta por unidad; cada admin necesita ver el detalle de coste/uso de SU cuenta con Athena, sin ver el de otras. Existe un CUR central. MENOR complejidad operativa.\n\nOpción D (Correcta): crear en cada cuenta miembro su propio bucket y su propio Cost and Usage Report entrega a cada admin solo los datos de su cuenta, listos para consultar con Athena, con minima complejidad.\nOpción A: RAM no comparte datos de un CUR por cuenta de esa forma.\nOpción B: una Lambda que trocea el CUR central por cuenta es una solución a medida con mas mantenimiento.\nOpción C: Cost Explorer no es Athena ni da el detalle/consulta SQL requerido por cuenta.\n\nReferencias:\nhttps://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html\nhttps://docs.aws.amazon.com/cur/latest/userguide/cur-query-athena.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30451,
    "questionNumber": 451,
    "question": "A company is designing an AWS environment for a manufacturing application. The application has been successful with customers, and the application's user base has increased. The company has connected the AWS environment to the company's on-premises data center through a 1 Gbps AWS Direct Connect connection. The company has configured BGP for the connection. The company must update the existing network connectivity solution to ensure that the solution is highly available, fault tolerant, and secure. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Add a dynamic private IP AWS Site-to-Site VPN as a secondary path to secure data in transit and provide resilience for the Direct Connect connection. Configure MACsec to encrypt traffic inside the Direct Connect connection.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Provision another Direct Connect connection between the company's on-premises data center and AWS to increase the transfer speed and provide resilience. Configure MACsec to encrypt traffic inside the Direct Connect connection.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure multiple private VIFs. Load balance data across the VIFs between the on-premises data center and AWS to provide resilience.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Add a static AWS Site-to-Site VPN as a secondary path to secure data in transit and to provide resilience for the Direct Connect connection.",
        "isCorrect": true
      }
    ],
    "comments": "Direct Connect de 1 Gbps con BGP entre el CPD y AWS; hay que hacer la conectividad altamente disponible, tolerante a fallos y segura del modo MAS coste-efectivo.\n\nOpción D (Correcta): añadir una Site-to-Site VPN estatica como camino secundario da resiliencia y cifrado en transito con el menor coste, sin duplicar la costosa DX.\nOpción A: la VPN dinamica con IP privada y MACsec es mas cara/compleja que una VPN estatica de respaldo.\nOpción B: una segunda DX es la opción de mayor coste.\nOpción C: multiples VIFs sobre la misma DX no aportan tolerancia a fallos de la conexión fisica.\n\nReferencias:\nhttps://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect-plus-vpn-network-to-amazon.html\nhttps://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30452,
    "questionNumber": 452,
    "question": "A company needs to modernize an application and migrate the application to AWS. The application stores user profile data as text in a single table in an on-premises MySQL database. After the modernization, users will use the application to upload video files that are up to 4 GB in size. Other users must be able to download the video files from the application. The company needs a video storage solution that provides rapid scaling. The solution must not affect application performance. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate the database to Amazon Aurora PostgreSQL by using AWS Database Migration Service (AWS DMS). Store the videos as base64-encoded strings in a TEXT column in the database.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Migrate the database to Amazon DynamoDB by using AWS Database Migration Service (AWS DMS) with the AWS Schema Conversion Tool (AWS SCT). Store the videos as objects in Amazon S3. Store the S3 key in the corresponding DynamoDB item.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Migrate the database to Amazon Keyspaces (for Apache Cassandra) by using AWS Database Migration Service (AWS DMS) with the AWS Schema Conversion Tool (AWS SCT). Store the videos as objects in Amazon S3. Store the S3 object identifier in the corresponding Amazon Keyspaces entry.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Migrate the database to Amazon DynamoDB by using AWS Database Migration Service (AWS DMS) with the AWS Schema Conversion Tool (AWS SCT). Store the videos as base64-encoded strings in the corresponding DynamoDB item.",
        "isCorrect": false
      }
    ],
    "comments": "Modernizar y migrar: perfiles de usuario (texto, una tabla MySQL) y subida/descarga de videos de hasta 4 GB con escalado rapido sin afectar al rendimiento de la app.\n\nOpción B (Correcta): migrar la BD a DynamoDB (con DMS+SCT) y guardar los videos como objetos en S3 con la clave S3 en el item de DynamoDB escala automaticamente y no penaliza el rendimiento de la app.\nOpción A: guardar videos como base64 en una columna TEXT es una mala practica que degrada la BD.\nOpción C: Keyspaces + S3 funciona, pero DynamoDB es el destino natural para un unico tabla de perfiles clave-valor con menor overhead.\nOpción D: base64 en el item de DynamoDB supera limites de tamaño de item y es inviable para 4 GB.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-use-s3-too.html\nhttps://docs.aws.amazon.com/dms/latest/userguide/Welcome.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30453,
    "questionNumber": 453,
    "question": "A company stores and manages documents in an Amazon Elastic File System (Amazon EFS) file system. The file system is encrypted with an AWS Key Management Service (AWS KMS) key. The file system is mounted to an Amazon EC2 instance that runs proprietary software. The company has enabled automatic backups for the file system. The automatic backups use the AWS Backup default backup plan. A solutions architect must ensure that deleted documents can be recovered within an RPO of 100 minutes. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new IAM role. Create a new backup plan. Use the new IAM role to create backups. Update the KMS key policy to allow the new IAM role to use the key. Implement an hourly backup schedule for the file system.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a new backup plan. Update the KMS key policy to allow the AWSServiceRoleForBackup IAM role to use the key. Implement a custom cron expression to run a backup of the file system every 30 minutes.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a new IAM role. Use the existing backup plan. Update the KMS key policy to allow the new IAM role to use the key. Enable continuous backups for point-in-time recovery.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use the existing backup plan. Update the KMS key policy to allow the AWSServiceRoleForBackup IAM role to use the key. Enable Cross-Region Replication for the file system.",
        "isCorrect": false
      }
    ],
    "comments": "Documentos en EFS cifrado con KMS montado en EC2; backups automaticos con el plan por defecto de AWS Backup. Garantizar recuperación de borrados con RPO de 100 minutos.\n\nOpción A (Correcta): crear un nuevo IAM role y un nuevo backup plan con schedule horario (RPO<=100 min) y actualizar la politica de la clave KMS para permitir a ese role usar la clave cumple el RPO.\nOpción B: EFS con AWS Backup no admite un backup cada 30 minutos via cron (la frecuencia minima practica no lo soporta como se plantea); ademas el plan por defecto es diario.\nOpción C: EFS con AWS Backup no ofrece 'continuous backups / PITR' (eso es para servicios como RDS/DynamoDB/S3), no aplica a EFS.\nOpción D: la Cross-Region Replication de EFS es DR, no recuperación granular de documentos borrados con este RPO.\n\nReferencias:\nhttps://docs.aws.amazon.com/aws-backup/latest/devguide/backup-frequency.html\nhttps://docs.aws.amazon.com/efs/latest/ug/awsbackup.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30454,
    "questionNumber": 454,
    "question": "A solutions architect must provide a secure way for a team of cloud engineers to use the AWS CLI to upload objects into an Amazon S3 bucket. Each cloud engineer has an IAM user, IAM access keys, and a virtual multi-factor authentication (MFA) device. The IAM users for the cloud engineers are in a group that is named S3-access. The cloud engineers must use MFA to perform any actions in Amazon S3. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Attach a policy to the S3 bucket to prompt the IAM user for an MFA code when the IAM user performs actions on the S3 bucket. Use IAM access keys with the AWS CLI to call Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Update the trust policy for the S3-access group to require principals to use MFA when principals assume the group. Use IAM access keys with the AWS CLI to call Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Attach a policy to the S3-access group to deny all S3 actions unless MFA is present. Use IAM access keys with the AWS CLI to call Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Attach a policy to the S3-access group to deny all S3 actions unless MFA is present. Request temporary credentials from AWS Security Token Service (AWS STS). Attach the temporary credentials in a profile that Amazon S3 will reference when the user performs actions in Amazon S3.",
        "isCorrect": true
      }
    ],
    "comments": "Ingenieros con IAM user, access keys y MFA virtual (grupo S3-access) deben subir objetos a S3 por CLI y usar MFA para CUALQUIER acción en S3.\n\nOpción D (Correcta): una politica en el grupo que deniega acciones S3 salvo que haya MFA (aws:MultiFactorAuthPresent), obteniendo credenciales temporales de STS con GetSessionToken y usandolas en un perfil de la CLI, cumple el requisito.\nOpción A: una bucket policy no 'pide un código MFA' interactivamente; y las access keys de larga duración no llevan el contexto MFA.\nOpción B: no existe 'trust policy' para asumir un grupo IAM; los grupos no se asumen.\nOpción C: denegar sin MFA es correcto, pero usar las access keys directas no aporta el contexto de MFA; hacen falta credenciales temporales de STS con MFA.\n\nReferencias:\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_configure-api-require.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_request.html#api_getsessiontoken",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30455,
    "questionNumber": 455,
    "question": "A company needs to migrate 60 on-premises legacy applications to AWS. The applications are based on the NET Framework and run on Windows. The company needs a solution that minimizes migration time and requires no application code changes. The company also does not want to manage the infrastructure. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Refactor the applications and containerize them by using AWS Toolkit for NET Refactoring. Use Amazon Elastic Container Service (Amazon ECS) with the Fargate launch type to host the containerized applications.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use the Windows Web Application Migration Assistant to migrate the applications to AWS Elastic Beanstalk. Use Elastic Beanstalk to deploy and manage the applications.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use the Windows Web Application Migration Assistant to migrate the applications to Amazon EC2 instances. Use the EC2 instances to deploy and manage the applications.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Refactor the applications and containerize them by using AWS Toolkit for NET Refactoring. Use Amazon Elastic Kubernetes Service (Amazon EKS) with the Fargate launch type to host the containerized applications.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar 60 apps .NET Framework en Windows a AWS minimizando tiempo, SIN cambios de código y SIN gestionar la infraestructura.\n\nOpción B (Correcta): el Windows Web Application Migration Assistant migra las apps a AWS Elastic Beanstalk, que despliega y gestiona la infraestructura por ti sin cambios de código.\nOpción A: refactorizar y contenerizar con el Toolkit for .NET Refactoring implica cambios de código, contradiciendo el requisito.\nOpción C: migrar a EC2 obliga a gestionar la infraestructura.\nOpción D: como A, refactorizar/contenerizar a EKS implica cambios y esfuerzo.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticbeanstalk/latest/dg/dotnet-console-tutorial.html\nhttps://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30456,
    "questionNumber": 456,
    "question": "A company needs to run large batch-processing jobs on data that is stored in an Amazon S3 bucket. The jobs perform simulations. The results of the jobs are not time sensitive, and the process can withstand interruptions. Each job must process 15-20 GB of data when the data is stored in the S3 bucket. The company will store the output from the jobs in a different Amazon S3 bucket for further analysis. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a serverless data pipeline. Use AWS Step Functions for orchestration. Use AWS Lambda functions with provisioned capacity to process the data.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Batch compute environment that includes Amazon EC2 Spot Instances. Specify the SPOT_CAPACITY_OPTIMIZED allocation strategy.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an AWS Batch compute environment that includes Amazon EC2 On-Demand Instances and Spot Instances. Specify the SPOT_CAPACITY_OPTIMIZED allocation strategy for the Spot Instances.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon Elastic Kubernetes Service (Amazon EKS) to run the processing jobs. Use managed node groups that contain a combination of Amazon EC2 On-Demand Instances and Spot Instances.",
        "isCorrect": false
      }
    ],
    "comments": "Jobs batch de simulación sobre datos en S3 (15-20 GB por job), no urgentes y tolerantes a interrupciones, con salida a otro bucket. MAS coste-efectivo.\n\nOpción B (Correcta): un compute environment de AWS Batch con EC2 Spot y estrategia SPOT_CAPACITY_OPTIMIZED aprovecha el descuento Spot para cargas interrumpibles, siendo lo mas barato.\nOpción A: Lambda con provisioned concurrency es caro y esta limitado en duración/recursos para estos jobs.\nOpción C: mezclar On-Demand con Spot encarece innecesariamente al ser la carga tolerante a interrupciones (Spot puro basta).\nOpción D: EKS con mezcla On-Demand/Spot añade overhead operativo y coste frente a AWS Batch con Spot.\n\nReferencias:\nhttps://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html\nhttps://docs.aws.amazon.com/batch/latest/userguide/allocation-strategies.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30457,
    "questionNumber": 457,
    "question": "A company has an application that analyzes and stores image data on premises. The application receives millions of new image files every day. Files are an average of 1 MB in size. The files are analyzed in batches of 1 GB. When the application analyzes a batch, the application zips the images together. The application then archives the images as a single file in an on-premises NFS server for long-term storage. The company has a Microsoft Hyper-V environment on premises and has compute capacity available. The company does not have storage capacity and wants to archive the images on AWS. The company needs the ability to retrieve archived data within 1 week of a request. The company has a 10 Gbps AWS Direct Connect connection between its on-premises data center and AWS. The company needs to set bandwidth limits and schedule archived images to be copied to AWS during non-business hours. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy an AWS DataSync agent on a new GPU-based Amazon EC2 instance. Configure the DataSync agent to copy the batch of files from the NFS on-premises server to Amazon S3 Glacier Instant Retrieval. After the successful copy, delete the data from the on-premises storage.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy an AWS DataSync agent as a Hyper-V VM on premises. Configure the DataSync agent to copy the batch of files from the NFS on-premises server to Amazon S3 Glacier Deep Archive. After the successful copy, delete the data from the on-premises storage.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Deploy an AWS DataSync agent on a new general purpose Amazon EC2 instance. Configure the DataSync agent to copy the batch of files from the NFS on-premises server to Amazon S3 Standard. After the successful copy, delete the data from the on-premises storage. Create an S3 Lifecycle rule to transition objects from S3 Standard to S3 Glacier Deep Archive after 1 day.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy an AWS Storage Gateway Tape Gateway on premises in the Hyper-V environment. Connect the Tape Gateway to AWS. Use automatic tape creation. Specify an Amazon S3 Glacier Deep Archive pool. Eject the tape after the batch of images is copied.",
        "isCorrect": false
      }
    ],
    "comments": "Millones de imagenes/dia (1 MB) archivadas en lotes de 1 GB en NFS on-premises; entorno Hyper-V con computo disponible pero sin almacenamiento; recuperar en <=1 semana; limitar ancho de banda y programar copias fuera de horario. DX de 10 Gbps.\n\nOpción B (Correcta): un agente de AWS DataSync como VM Hyper-V copia los lotes del NFS a S3 Glacier Deep Archive (recuperación en horas/dias, <1 semana), permitiendo limites de ancho de banda y programación por horario.\nOpción A: Glacier Instant Retrieval es innecesariamente caro para recuperación en 1 semana; una EC2 GPU no aporta nada.\nOpción C: copiar a S3 Standard y luego ciclo de vida es mas caro y no aprovecha Deep Archive directamente.\nOpción D: Tape Gateway es un flujo VTL mas complejo; DataSync es mas directo con la programación y limites pedidos.\n\nReferencias:\nhttps://docs.aws.amazon.com/datasync/latest/userguide/agent-requirements.html\nhttps://docs.aws.amazon.com/datasync/latest/userguide/configure-bandwidth.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30458,
    "questionNumber": 458,
    "question": "A company wants to record key performance indicators (KPIs) from its application as part of a strategy to convert to a user-based licensing schema. The application is a multi-tier application with a web-based UI. The company saves all log files to Amazon CloudWatch by using the CloudWatch agent. All logins to the application are saved in a log file. As part of the new license schema, the company needs to find out how many unique users each client has on a daily basis, weekly basis, and monthly basis. Which solution will provide this information with the LEAST change to the application?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure an Amazon CloudWatch Logs metric filter that saves each successful login as a metric. Configure the user name and client name as dimensions for the metric.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Change the application logic to make each successful login generate a call to the AWS SDK to increment a custom metric that records user name and client name dimensions in CloudWatch.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure the CloudWatch agent to extract successful login metrics from the logs. Additionally, configure the CloudWatch agent to save the successful login metrics as a custom metric that uses the user name and client name as dimensions for the metric.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure an AWS Lambda function to consume an Amazon CloudWatch Logs stream of the application logs. Additionally, configure the Lambda function to increment a custom metric in CloudWatch that uses the user name and client name as dimensions for the metric.",
        "isCorrect": false
      }
    ],
    "comments": "Registrar KPIs: logins guardados en logs enviados a CloudWatch por el agente; se necesita contar usuarios UNICOS por cliente en base diaria/semanal/mensual con el MENOR cambio en la app.\n\nOpción A (Correcta): un metric filter de CloudWatch Logs que emite una metrica por login exitoso, con user name y client name como dimensiones, no requiere tocar la app (ya envia los logs).\nOpción B: cambiar la lógica de la app para llamar al SDK exige modificar la aplicación.\nOpción C: el CloudWatch agent no extrae metricas con dimensiones arbitrarias de logins de esa forma; ademas es mas configuración.\nOpción D: una Lambda que consume el stream de logs es una solución a medida con mas mantenimiento que un metric filter nativo.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CountOccurrencesExample.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30459,
    "questionNumber": 459,
    "question": "A company is using GitHub Actions to run a CI/CD pipeline that accesses resources on AWS. The company has an IAM user that uses a secret key in the pipeline to authenticate to AWS. An existing IAM role with an attached policy grants the required permissions to deploy resources. The company’s security team implements a new requirement that pipelines can no longer use long-lived secret keys. A solutions architect must replace the secret key with a short-lived solution. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an IAM SAML 2.0 identity provider (IdP) in AWS Identity and Access Management (IAM). Create a new IAM role with the appropriate trust policy that allows the sts:AssumeRole API call. Attach the existing IAM policy to the new IAM role. Update GitHub to use SAML authentication for the pipeline.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an IAM OpenID Connect (OIDC) identity provider (IdP) in AWS Identity and Access Management (IAM). Create a new IAM role with the appropriate trust policy that allows the sts:AssumeRoleWithWebIdentity API call from the GitHub OIDC IdP. Update GitHub to assume the role for the pipeline.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an Amazon Cognito identity pool. Configure the authentication provider to use GitHub. Create a new IAM role with the appropriate trust policy that allows the sts:AssumeRoleWithWebIdentity API call from the GitHub authentication provider. Configure the pipeline to use Cognito as its authentication provider.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a trust anchor to AWS Private Certificate Authority. Generate a client certificate to use with AWS IAM Roles Anywhere. Create a new IAM role with the appropriate trust policy that allows the sts:AssumeRole API call. Attach the existing IAM policy to the new IAM role. Configure the pipeline to use the credential helper tool and to reference the client certificate public key to assume the new IAM role.",
        "isCorrect": false
      }
    ],
    "comments": "GitHub Actions accede a AWS con una IAM user y secret key de larga duración; seguridad exige eliminar las claves de larga vida por una solución de corta duración con el MENOR overhead.\n\nOpción B (Correcta): un IAM OIDC identity provider para GitHub y un rol con trust policy que permita sts:AssumeRoleWithWebIdentity desde el OIDC de GitHub da credenciales temporales sin secretos de larga vida, con minimo overhead.\nOpción A: SAML 2.0 es mas complejo de configurar para GitHub Actions que OIDC nativo.\nOpción C: Cognito identity pool para un pipeline de CI/CD es un rodeo innecesario.\nOpción D: IAM Roles Anywhere con PCA y certificados añade gestión de certificados; mas overhead que OIDC.\n\nReferencias:\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_oidc_verification-github.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30460,
    "questionNumber": 460,
    "question": "A company is running a web-crawling process on a list of target URLs to obtain training documents for machine learning training algorithms. A fleet of Amazon EC2 t2.micro instances pulls the target URLs from an Amazon Simple Queue Service (Amazon SQS) queue. The instances then write the result of the crawling algorithm as a .csv file to an Amazon Elastic File System (Amazon EFS) volume. The EFS volume is mounted on all instances of the fleet. A separate system adds the URLs to the SQS queue at infrequent rates. The instances crawl each URL in 10 seconds or less. Metrics indicate that some instances are idle when no URLs are in the SQS queue. A solutions architect needs to redesign the architecture to optimize costs. Which combination of steps will meet these requirements MOST cost-effectively? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use m5.8xlarge instances instead of t2.micro instances for the web-crawling process. Reduce the number of instances in the fleet by 50%.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Convert the web-crawling process into an AWS Lambda function. Configure the Lambda function to pull URLs from the SQS queue.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Modify the web-crawling process to store results in Amazon Neptune.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Modify the web-crawling process to store results in an Amazon Aurora Serverless MySQL instance.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Modify the web-crawling process to store results in Amazon S3.",
        "isCorrect": true
      }
    ],
    "comments": "Web-crawling con flota de EC2 t2.micro que sacan URLs de SQS (llegadas infrecuentes) y escriben .csv en EFS montado en todas; hay instancias ociosas sin URLs. Optimizar coste (elegir dos).\n\nOpción B (Correcta): convertir el crawling en una Lambda que consume de SQS elimina el coste de instancias ociosas (pago por invocación) para una carga esporadica.\nOpción E (Correcta): almacenar los resultados en S3 en lugar de EFS reduce coste y se adapta mejor a un flujo serverless.\nOpción A: instancias m5.8xlarge son enormes y caras para tareas de 10 s; empeora el coste.\nOpción C: Neptune (grafos) no aplica ni reduce coste.\nOpción D: Aurora Serverless MySQL para guardar .csv añade coste de BD innecesario frente a S3.\n\nReferencias:\nhttps://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html",
    "category": "Optimización de Costes",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30461,
    "questionNumber": 461,
    "question": "A company needs to migrate its website from an on-premises data center to AWS. The website consists of a load balancer, a content management system (CMS) that runs on a Linux operating system, and a MySQL database. The CMS requires persistent NFS-compatible storage for a file system. The new solution on AWS must be able to scale from 2 Amazon EC2 instances to 30 EC2 instances in response to unpredictable traffic increases. The new solution also must require no changes to the website and must prevent data loss. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon Elastic File System (Amazon EFS) file system. Deploy the CMS to AWS Elastic Beanstalk with an Application Load Balancer and an Auto Scaling group. Use .ebextensions to mount the EFS file system to the EC2 instances. Create an Amazon Aurora MySQL database that is separate from the Elastic Beanstalk environment.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an Amazon Elastic Block Store (Amazon EBS) Multi-Attach volume. Deploy the CMS to AWS Elastic Beanstalk with a Network Load Balancer and an Auto Scaling group. Use .ebextensions to mount the EBS volume to the EC2 instances. Create an Amazon RDS for MySQL database in the Elastic Beanstalk environment.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon Elastic File System (Amazon EFS) file system. Create a launch template and an Auto Scaling group to launch EC2 instances to support the CMS. Create a Network Load Balancer to distribute traffic. Create an Amazon Aurora MySQL database. Use an EC2 Auto Scaling scale-in lifecycle hook to mount the EFS file system to the EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Amazon Elastic Block Store (Amazon EBS) Multi-Attach volume. Create a launch template and an Auto Scaling group to launch EC2 instances to support the CMS. Create an Application Load Balancer to distribute traffic. Create an Amazon ElastiCache for Redis cluster to support the MySQL database. Use EC2 user data to attach the EBS volume to the EC2 instances.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar una web (LB + CMS Linux + MySQL) con almacenamiento persistente NFS-compatible; escalar de 2 a 30 EC2 ante trafico impredecible, sin cambios en la web y sin perdida de datos.\n\nOpción A (Correcta): EFS (NFS compartido persistente) con el CMS en Elastic Beanstalk (ALB + Auto Scaling), montando EFS via .ebextensions, y Aurora MySQL, escala sin cambios de código y sin perder datos.\nOpción B: EBS Multi-Attach no es NFS ni se comparte entre 30 instancias de forma general; no encaja.\nOpción C: es plausible pero un NLB no es lo idoneo para HTTP de un CMS y Beanstalk simplifica mas; ademas EFS+Aurora en A es la combinación completa recomendada.\nOpción D: EBS Multi-Attach + ElastiCache no provee el share NFS ni la BD requerida.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-cfg-efs.html\nhttps://docs.aws.amazon.com/efs/latest/ug/how-it-works.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30462,
    "questionNumber": 462,
    "question": "A company needs to implement disaster recovery for a critical application that runs in a single AWS Region. The application's users interact with a web frontend that is hosted on Amazon EC2 instances behind an Application Load Balancer (ALB). The application writes to an Amazon RDS for MySQL DB instance. The application also outputs processed documents that are stored in an Amazon S3 bucket. The company’s finance team directly queries the database to run reports. During busy periods, these queries consume resources and negatively affect application performance. A solutions architect must design a solution that will provide resiliency during a disaster. The solution must minimize data loss and must resolve the performance problems that result from the finance team's queries. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate the database to Amazon DynamoDB and use DynamoDB global tables. Instruct the finance team to query a global table in a separate Region. Create an AWS Lambda function to periodically synchronize the contents of the original S3 bucket to a new S3 bucket in the separate Region. Launch EC2 instances and create an ALB in the separate Region. Configure the application to point to the new S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Launch additional EC2 instances that host the application in a separate Region. Add the additional instances to the existing ALIn the separate Region, create a read replica of the RDS DB instance. Instruct the finance team to run queries against the read replica. Use S3 Cross-Region Replication (CRR) from the original S3 bucket to a new S3 bucket in the separate Region. During a disaster, promote the read replica to a standalone DB instance. Configure the application to point to the new S3 bucket and to the newly promoted read replica.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a read replica of the RDS DB instance in a separate Region. Instruct the finance team to run queries against the read replica. Create AMIs of the EC2 instances that host the application frontend. Copy the AMIs to the separate Region. Use S3 Cross-Region Replication (CRR) from the original S3 bucket to a new S3 bucket in the separate Region. During a disaster, promote the read replica to a standalone DB instance. Launch EC2 instances from the AMIs and create an ALB to present the application to end users. Configure the application to point to the new S3 bucket.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create hourly snapshots of the RDS DB instance. Copy the snapshots to a separate Region. Add an Amazon ElastiCache cluster in front of the existing RDS database. Create AMIs of the EC2 instances that host the application frontend. Copy the AMIs to the separate Region. Use S3 Cross-Region Replication (CRR) from the original S3 bucket to a new S3 bucket in the separate Region. During a disaster, restore the database from the latest RDS snapshot. Launch EC2 instances from the AMIs and create an ALB to present the application to end users. Configure the application to point to the new S3 bucket.",
        "isCorrect": false
      }
    ],
    "comments": "DR de una app en una sola Región (EC2 tras ALB, RDS MySQL, salida a S3); ademas el equipo de finanzas consulta la BD y degrada el rendimiento. Minimizar perdida de datos y resolver el problema de rendimiento.\n\nOpción C (Correcta): una read replica de RDS en otra Región (finanzas consulta la réplica -> descarga la BD principal y sirve de DR con minima perdida), AMIs de las EC2 copiadas a la otra Región y S3 CRR cubre DR y rendimiento.\nOpción A: migrar a DynamoDB global tables es un rediseño mayor y cambia el modelo relacional; excesivo.\nOpción B: añadir instancias a 'el mismo ALB' en otra Región no es valido (un ALB es regional) y complica el diseño.\nOpción D: snapshots horarios dan peor RPO que una réplica y ElastiCache no descarga las consultas de finanzas directamente sobre la BD.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30463,
    "questionNumber": 463,
    "question": "A company has many services running in its on-premises data center. The data center is connected to AWS using AWS Direct Connect (DX) and an IPSec VPN. The service data is sensitive and connectivity cannot traverse the internet. The company wants to expand into a new market segment and begin offering its services to other companies that are using AWS. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a VPC Endpoint Service that accepts TCP traffic, host it behind a Network Load Balancer, and make the service available over DX.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a VPC Endpoint Service that accepts HTTP or HTTPS traffic, host it behind an Application Load Balancer, and make the service available over DX.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Attach an internet gateway to the VPC, and ensure that network access control and security group rules allow the relevant inbound and outbound traffic.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Attach a NAT gateway to the VPC, and ensure that network access control and security group rules allow the relevant inbound and outbound traffic.",
        "isCorrect": false
      }
    ],
    "comments": "Servicios on-premises conectados por DX + VPN IPSec, datos sensibles que NO pueden ir por internet; se quiere ofrecer los servicios a otras empresas que usan AWS.\n\nOpción A (Correcta): un VPC Endpoint Service (PrivateLink) que acepta TCP tras un Network Load Balancer, disponible sobre DX, expone el servicio de forma privada a otras cuentas sin atravesar internet.\nOpción B: PrivateLink usa un NLB (capa 4), no un ALB; 'acepta HTTP/HTTPS tras ALB' no es la configuración de endpoint service.\nOpción C: un internet gateway expone el trafico a internet, incumpliendo el requisito.\nOpción D: un NAT gateway tambien implica salida a internet; no aplica.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30464,
    "questionNumber": 464,
    "question": "A company uses AWS Organizations to manage its AWS accounts. A solutions architect must design a solution in which only administrator roles are allowed to use IAM actions. However, the solutions architect does not have access to all the AWS accounts throughout the company. Which solution meets these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an SCP that applies to all the AWS accounts to allow IAM actions only for administrator roles. Apply the SCP to the root OU.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure AWS CloudTrail to invoke an AWS Lambda function for each event that is related to IAM actions. Configure the function to deny the action if the user who invoked the action is not an administrator.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an SCP that applies to all the AWS accounts to deny IAM actions for all users except for those with administrator roles. Apply the SCP to the root OU.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Set an IAM permissions boundary that allows IAM actions. Attach the permissions boundary to every administrator role across all the AWS accounts.",
        "isCorrect": false
      }
    ],
    "comments": "Organizations: solo los roles de administrador deben poder usar acciones IAM; el arquitecto no tiene acceso a todas las cuentas. MENOR overhead.\n\nOpción C (Correcta): una SCP aplicada a la OU raiz que DENIEGA acciones IAM a todos salvo a los roles de administrador se impone en todas las cuentas de forma centralizada, sin necesidad de acceso a cada cuenta.\nOpción A: una SCP que 'permite' IAM solo a administradores no basta: las SCP son limites; una condición de denegación explicita es la forma correcta y robusta.\nOpción B: CloudTrail + Lambda para denegar es reactivo, complejo y no impide la acción a tiempo.\nOpción D: permission boundaries hay que adjuntarlos rol por rol en cada cuenta: no escala sin acceso a todas.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30465,
    "questionNumber": 465,
    "question": "A company uses an organization in AWS Organizations to manage multiple AWS accounts. The company hosts some applications in a VPC in the company's shared services account. The company has attached a transit gateway to the VPC in the shared services account. The company is developing a new capability and has created a development environment that requires access to the applications that are in the shared services account. The company intends to delete and recreate resources frequently in the development account. The company also wants to give a development team the ability to recreate the team's connection to the shared services account as required. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a transit gateway in the development account. Create a transit gateway peering request to the shared services account. Configure the shared services transit gateway to automatically accept peering connections.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Turn on automatic acceptance for the transit gateway in the shared services account. Use AWS Resource Access Manager (AWS RAM) to share the transit gateway resource in the shared services account with the development account. Accept the resource in the development account. Create a transit gateway attachment in the development account.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Turn on automatic acceptance for the transit gateway in the shared services account. Create a VPC endpoint. Use the endpoint policy to grant permissions on the VPC endpoint for the development account. Configure the endpoint service to automatically accept connection requests. Provide the endpoint details to the development team.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Amazon EventBridge rule to invoke an AWS Lambda function that accepts the transit gateway attachment when the development account makes an attachment request. Use AWS Network Manager to share the transit gateway in the shared services account with the development account. Accept the transit gateway in the development account.",
        "isCorrect": false
      }
    ],
    "comments": "Organizations con un transit gateway en la shared services account; entorno de desarrollo que borra/recrea recursos con frecuencia y necesita reconectar su conexión al TGW por si mismo.\n\nOpción B (Correcta): activar la aceptación automatica del TGW en shared services y compartir el TGW via AWS RAM con la cuenta de desarrollo permite al equipo crear/recrear su attachment cuando quiera, con baja fricción.\nOpción A: peering entre dos TGWs es innecesario y mas complejo cuando basta compartir el TGW existente.\nOpción C: un VPC endpoint/endpoint service no da la conectividad de red general del TGW requerida.\nOpción D: EventBridge+Lambda para aceptar attachments es una automatización a medida con mas overhead que RAM + auto-accept.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/tgw/tgw-transit-gateways.html\nhttps://docs.aws.amazon.com/ram/latest/userguide/shareable.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30466,
    "questionNumber": 466,
    "question": "A company wants to migrate virtual Microsoft workloads from an on-premises data center to AWS. The company has successfully tested a few sample workloads on AWS. The company also has created an AWS Site-to-Site VPN connection to a VPC. A solutions architect needs to generate a total cost of ownership (TCO) report for the migration of all the workloads from the data center. Simple Network Management Protocol (SNMP) has been enabled on each VM in the data center. The company cannot add more VMs in the data center and cannot install additional software on the VMs. The discovery data must be automatically imported into AWS Migration Hub. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use the AWS Application Migration Service agentless service and the AWS Migration Hub Strategy Recommendations to generate the TCO report.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Launch a Windows Amazon EC2 instance. Install the Migration Evaluator agentless collector on the EC2 instance. Configure Migration Evaluator to generate the TCO report.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Launch a Windows Amazon EC2 instance. Install the Migration Evaluator agentless collector on the EC2 instance. Configure Migration Hub to generate the TCO report.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use the AWS Migration Readiness Assessment tool inside the VPC. Configure Migration Evaluator to generate the TCO report.",
        "isCorrect": false
      }
    ],
    "comments": "Generar un informe TCO para migrar workloads Windows virtuales; SNMP habilitado en cada VM, NO se pueden añadir VMs ni instalar software en las VMs; el descubrimiento debe importarse automaticamente en Migration Hub.\n\nOpción B (Correcta): lanzar una EC2 Windows e instalar el Migration Evaluator agentless collector recoge datos via SNMP sin tocar las VMs y Migration Evaluator genera el informe TCO.\nOpción A: Application Migration Service agentless + Strategy Recommendations no es la herramienta de TCO adecuada aqui.\nOpción C: el TCO lo genera Migration Evaluator, no 'Migration Hub'; la redacción es incorrecta.\nOpción D: la Migration Readiness Assessment no es el mecanismo de recolección/TCO de Migration Evaluator descrito.\n\nReferencias:\nhttps://docs.aws.amazon.com/migrationhub-strategy/latest/userguide/what-is-mhub-strategy.html\nhttps://aws.amazon.com/migration-evaluator/",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30467,
    "questionNumber": 467,
    "question": "A company that is developing a mobile game is making game assets available in two AWS Regions. Game assets are served from a set of Amazon EC2 instances behind an Application Load Balancer (ALB) in each Region. The company requires game assets to be fetched from the closest Region. If game assets become unavailable in the closest Region, they should be fetched from the other Region. What should a solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon CloudFront distribution. Create an origin group with one origin for each ALB. Set one of the origins as primary.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon Route 53 health check for each ALCreate a Route 53 failover routing record pointing to the two ALBs. Set the Evaluate Target Health value to Yes.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create two Amazon CloudFront distributions, each with one ALB as the origin. Create an Amazon Route 53 failover routing record pointing to the two CloudFront distributions. Set the Evaluate Target Health value to Yes.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Amazon Route 53 health check for each ALB. Create a Route 53 latency alias record pointing to the two ALBs. Set the Evaluate Target Health value to Yes.",
        "isCorrect": true
      }
    ],
    "comments": "Assets de un juego servidos por ALB en DOS Regiones; hay que traerlos de la Región mas cercana y, si no estan disponibles alli, de la otra Región.\n\nOpción D (Correcta): health checks de Route 53 por ALB y un registro de latencia (latency alias) apuntando a los dos ALBs con Evaluate Target Health = Yes sirve desde la Región mas cercana y hace failover si esa esta insana.\nOpción A: un origin group de CloudFront con primario/secundario da failover pero no elige por cercania/latencia entre Regiones del modo pedido.\nOpción B: failover routing sirve activo/pasivo, no 'la mas cercana primero'.\nOpción C: dos distribuciones CloudFront con failover routing añade complejidad y no cumple el criterio de latencia como el latency record.\n\nReferencias:\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30468,
    "questionNumber": 468,
    "question": "A company deploys workloads in multiple AWS accounts. Each account has a VPC with VPC flow logs published in text log format to a centralized Amazon S3 bucket. Each log file is compressed with gzip compression. The company must retain the log files indefinitely. A security engineer occasionally analyzes the logs by using Amazon Athena to query the VPC flow logs. The query performance is degrading over time as the number of ingested logs is growing. A solutions architect must improve the performance of the log analysis and reduce the storage space that the VPC flow logs use. Which solution will meet these requirements with the LARGEST performance improvement?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Lambda function to decompress the gzip files and to compress the files with bzip2 compression. Subscribe the Lambda function to an s3:ObjectCreated:Put S3 event notification for the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Enable S3 Transfer Acceleration for the S3 bucket. Create an S3 Lifecycle configuration to move files to the S3 Intelligent-Tiering storage class as soon as the files are uploaded.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Update the VPC flow log configuration to store the files in Apache Parquet format. Specify hourly partitions for the log files.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create a new Athena workgroup without data usage control limits. Use Athena engine version 2.",
        "isCorrect": false
      }
    ],
    "comments": "VPC flow logs en texto gzip en un bucket S3 central, analizados con Athena; el rendimiento se degrada al crecer los logs. MAYOR mejora de rendimiento y menos espacio.\n\nOpción C (Correcta): configurar los VPC flow logs para almacenarse en Apache Parquet con particiones horarias reduce el escaneo de Athena (columnar + particionado) y el espacio: la mayor mejora de rendimiento.\nOpción A: recomprimir a bzip2 no mejora las consultas de Athena (sigue siendo texto row-based) y añade una Lambda.\nOpción B: Transfer Acceleration e Intelligent-Tiering no aceleran las consultas Athena.\nOpción D: un nuevo workgroup/engine v2 aporta poco frente al cambio a Parquet particionado.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html\nhttps://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30469,
    "questionNumber": 469,
    "question": "A company wants to establish a dedicated connection between its on-premises infrastructure and AWS. The company is setting up a 1 Gbps AWS Direct Connect connection to its account VPC. The architecture includes a transit gateway and a Direct Connect gateway to connect multiple VPCs and the on-premises infrastructure. The company must connect to VPC resources over a transit VIF by using the Direct Connect connection. Which combination of steps will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Update the 1 Gbps Direct Connect connection to 10 Gbps.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Advertise the on-premises network prefixes over the transit VIF.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Advertise the VPC prefixes from the Direct Connect gateway to the on-premises network over the transit VIF.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Update the Direct Connect connection's MACsec encryption mode attribute to must_encrypt.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Associate a MACsec Connection Key Name/Connectivity Association Key (CKN/CAK) pair with the Direct Connect connection.",
        "isCorrect": false
      }
    ],
    "comments": "DX de 1 Gbps con transit gateway y Direct Connect gateway para conectar varias VPCs y el on-premises; conectar a recursos de VPC por una transit VIF. Combinación de pasos (elegir dos).\n\nOpción B (Correcta): anunciar (advertise) los prefijos de la red on-premises sobre la transit VIF por BGP es necesario para que AWS conozca las rutas hacia on-premises.\nOpción C (Correcta): anunciar los prefijos de las VPC desde el Direct Connect gateway hacia on-premises sobre la transit VIF permite que on-premises alcance los recursos de las VPC.\nOpción A: subir a 10 Gbps no es necesario para establecer la conectividad pedida.\nOpción D: MACsec must_encrypt no es requisito de conectividad y depende de soporte del enlace.\nOpción E: asociar un par CKN/CAK de MACsec tampoco es necesario para la conectividad basica.\n\nReferencias:\nhttps://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-transit-virtual-interfaces.html\nhttps://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways-intro.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30470,
    "questionNumber": 470,
    "question": "A company wants to use Amazon WorkSpaces in combination with thin client devices to replace aging desktops. Employees use the desktops to access applications that work with Clinical trial data. Corporate security policy states that access to the applications must be restricted to only company branch office locations. The company is considering adding an additional branch office in the next 6 months. Which solution meets these requirements with the MOST operational efficiency?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an IP access control group rule with the list of public addresses from the branch offices. Associate the IP access control group with the WorkSpaces directory.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use AWS Firewall Manager to create a web ACL rule with an IPSet with the list of public addresses from the branch office locations. Associate the web ACL with the WorkSpaces directory.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Certificate Manager (ACM) to issue trusted device certificates to the machines deployed in the branch office locations. Enable restricted access on the WorkSpaces directory.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a custom WorkSpace image with Windows Firewall configured to restrict access to the public addresses of the branch offices. Use the image to deploy the WorkSpaces.",
        "isCorrect": false
      }
    ],
    "comments": "WorkSpaces con thin clients para datos de ensayos clinicos; el acceso debe restringirse SOLO a las ubicaciones de las oficinas (con una nueva oficina prevista en 6 meses). MAS eficiencia operativa.\n\nOpción A (Correcta): una IP access control group con las IPs publicas de las oficinas asociada al directorio de WorkSpaces restringe el acceso por origen de forma nativa y facil de ampliar cuando abra la nueva oficina.\nOpción B: Firewall Manager + web ACL no es el mecanismo nativo de restricción por IP de WorkSpaces.\nOpción C: certificados de dispositivo de confianza controlan el dispositivo, no la ubicación/oficina requerida.\nOpción D: una imagen personalizada con Windows Firewall es dificil de mantener y no es la forma eficiente de restringir por ubicación.\n\nReferencias:\nhttps://docs.aws.amazon.com/workspaces/latest/adminguide/amazon-workspaces-ip-access-control-groups.html\nhttps://docs.aws.amazon.com/workspaces/latest/adminguide/manage-workspaces-directory.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30471,
    "questionNumber": 471,
    "question": "A company uses AWS Organizations. The company runs two firewall appliances in a centralized networking account. Each firewall appliance runs on a manually configured highly available Amazon EC2 instance. A transit gateway connects the VPC from the centralized networking account to VPCs of member accounts. Each firewall appliance uses a static private IP address that is then used to route traffic from the member accounts to the internet. During a recent incident, a badly configured script initiated the termination of both firewall appliances. During the rebuild of the firewall appliances, the company wrote a new script to configure the firewall appliances at startup. The company wants to modernize the deployment of the firewall appliances. The firewall appliances need the ability to scale horizontally to handle increased traffic when the network expands. The company must continue to use the firewall appliances to comply with company policy. The provider of the firewall appliances has confirmed that the latest version of the firewall code will work with all AWS services. Which combination of steps should the solutions architect recommend to meet these requirements MOST cost-effectively? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy a Gateway Load Balancer in the centralized networking account. Set up an endpoint service that uses AWS PrivateLink.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Deploy a Network Load Balancer in the centralized networking account. Set up an endpoint service that uses AWS PrivateLink.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Auto Scaling group and a launch template that uses the new script as user data to configure the firewall appliances. Create a target group that uses the instance target type.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an Auto Scaling group. Configure an AWS Launch Wizard deployment that uses the new script as user data to configure the firewall appliances. Create a target group that uses the IP target type.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Create VPC endpoints in each member account. Update the route tables to point to the VPC endpoints.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Create VPC endpoints in the centralized networking account. Update the route tables in each member account to point to the VPC endpoints.",
        "isCorrect": false
      }
    ],
    "comments": "Se moderniza el despliegue de appliances de firewall en una cuenta de red centralizada con Organizations y Transit Gateway; deben escalar horizontalmente de forma MÁS rentable manteniendo el appliance.\n\nOpción A (Correcta): Gateway Load Balancer + endpoint service con PrivateLink es el patrón nativo para insertar appliances de inspección transparente y distribuir tráfico entre varias instancias.\nOpción B: Un Network Load Balancer no soporta el modelo de inspección transparente GENEVE de los appliances de firewall como el GWLB.\nOpción C (Correcta): Auto Scaling group con launch template (user data = script) y target group de tipo instance permite el escalado horizontal automático de los firewalls.\nOpción D: AWS Launch Wizard es para cargas específicas (SAP, SQL), no para configurar appliances con user data; innecesario.\nOpción E (Correcta): Crear GWLB endpoints en cada cuenta miembro y apuntar las route tables a ellos enruta el tráfico a la flota centralizada de firewalls.\nOpción F: Los GWLB endpoints (consumidores) van en las VPC miembro, no junto al servicio en la cuenta centralizada.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/gateway-load-balancer-endpoint.html\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30472,
    "questionNumber": 472,
    "question": "A solutions architect must implement a multi-Region architecture for an Amazon RDS for PostgreSQL database that supports a web application. The database launches from an AWS CloudFormation template that includes AWS services and features that are present in both the primary and secondary Regions. The database is configured for automated backups, and it has an RTO of 15 minutes and an RPO of 2 hours. The web application is configured to use an Amazon Route 53 record to route traffic to the database. Which combination of steps will result in a highly available architecture that meets all the requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a cross-Region read replica of the database in the secondary Region. Configure an AWS Lambda function in the secondary Region to promote the read replica during a failover event.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "In the primary Region, create a health check on the database that will invoke an AWS Lambda function when a failure is detected. Program the Lambda function to recreate the database from the latest database snapshot in the secondary Region and update the Route 53 host records for the database.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS Lambda function to copy the latest automated backup to the secondary Region every 2 hours.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a failover routing policy in Route 53 for the database DNS record. Set the primary and secondary endpoints to the endpoints in each Region.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Create a hot standby database in the secondary Region. Use an AWS Lambda function to restore the secondary database to the latest RDS automatic backup in the event that the primary database fails.",
        "isCorrect": false
      }
    ],
    "comments": "Arquitectura multi-Región para RDS PostgreSQL con RTO de 15 min y RPO de 2 h, usando Route 53 para el failover; se busca ALTA disponibilidad cumpliendo esos objetivos.\n\nOpción A (Correcta): Read replica cross-Región + Lambda que la promueve en el failover cumple el RPO (replicación casi continua) y el RTO de 15 min al promover rápidamente.\nOpción B: Recrear la BD desde el último snapshot tarda demasiado y no cumple el RTO de 15 min de forma fiable.\nOpción C: Copiar backups cada 2 h da RPO pero no aporta un destino promocionable rápido para el RTO; por sí sola es insuficiente.\nOpción D (Correcta): Política de enrutamiento failover en Route 53 con endpoints primario y secundario redirige el tráfico automáticamente cuando falla el primario.\nOpción E: Un hot standby restaurado desde backup automático es contradictorio y de mayor coste/complejidad frente a la read replica.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30473,
    "questionNumber": 473,
    "question": "An ecommerce company runs an application on AWS. The application has an Amazon API Gateway API that invokes an AWS Lambda function. The data is stored in an Amazon RDS for PostgreSQL DB instance. During the company’s most recent flash sale, a sudden increase in API calls negatively affected the application's performance. A solutions architect reviewed the Amazon CloudWatch metrics during that time and noticed a significant increase in Lambda invocations and database connections. The CPU utilization also was high on the DB instance. What should the solutions architect recommend to optimize the application's performance?",
    "choices": [
      {
        "letter": "A",
        "text": "Increase the memory of the Lambda function. Modify the Lambda function to close the database connections when the data is retrieved.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Add an Amazon ElastiCache for Redis cluster to store the frequently accessed data from the RDS database.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an RDS proxy by using the Lambda console. Modify the Lambda function to use the proxy endpoint.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Modify the Lambda function to connect to the database outside of the function's handler. Check for an existing database connection before creating a new connection.",
        "isCorrect": false
      }
    ],
    "comments": "App con API Gateway + Lambda + RDS PostgreSQL; en un flash sale las invocaciones de Lambda y las conexiones a BD se disparan y la CPU de la BD se satura. Se busca OPTIMIZAR el rendimiento.\n\nOpción A: Aumentar memoria y cerrar conexiones no resuelve la explosión de conexiones concurrentes desde miles de Lambdas.\nOpción B: ElastiCache ayuda a lecturas frecuentes pero exige cambios de código para caché y no ataca el agotamiento de conexiones.\nOpción C (Correcta): RDS Proxy agrupa y reutiliza conexiones (connection pooling), reduciendo el número de conexiones abiertas contra la BD y la carga en picos con cambios mínimos.\nOpción D: Reutilizar conexión fuera del handler ayuda algo, pero con concurrencia masiva sigue abriendo muchas conexiones; RDS Proxy es la solución dedicada.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/services-rds.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30474,
    "questionNumber": 474,
    "question": "A retail company wants to improve its application architecture. The company's applications register new orders, handle returns of merchandise, and provide analytics. The applications store retail data in a MySQL database and an Oracle OLAP analytics database. All the applications and databases are hosted on Amazon EC2 instances. Each application consists of several components that handle different parts of the order process. These components use incoming data from different sources. A separate ETL job runs every week and copies data from each application to the analytics database. A solutions architect must redesign the architecture into an event-driven solution that uses serverless services. The solution must provide updated analytics in near real time. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate the individual applications as microservices to Amazon Elastic Container Service (Amazon ECS) containers that use AWS Fargate. Keep the retail MySQL database on Amazon EC2. Move the analytics database to Amazon Neptune. Use Amazon Simple Queue Service (Amazon SQS) to send all the incoming data to the microservices and the analytics database.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Auto Scaling group for each application. Specify the necessary number of EC2 instances in each Auto Scaling group. Migrate the retail MySQL database and the analytics database to Amazon Aurora MySQL. Use Amazon Simple Notification Service (Amazon SNS) to send all the incoming data to the correct EC2 instances and the analytics database.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Migrate the individual applications as microservices to Amazon Elastic Kubernetes Service (Amazon EKS) containers that use AWS Fargate. Migrate the retail MySQL database to Amazon Aurora Serverless MySQL. Migrate the analytics database to Amazon Redshift Serverless. Use Amazon EventBridge to send all the incoming data to the microservices and the analytics database.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Migrate the individual applications as microservices to Amazon AppStream 2.0. Migrate the retail MySQL database to Amazon Aurora MySQL. Migrate the analytics database to Amazon Redshift Serverless. Use AWS IoT Core to send all the incoming data to the microservices and the analytics database.",
        "isCorrect": false
      }
    ],
    "comments": "Rediseñar aplicaciones de retail (MySQL + OLAP Oracle en EC2, ETL semanal) hacia una solución EVENT-DRIVEN y SERVERLESS con analítica casi en tiempo real.\n\nOpción A: Neptune es base de grafos (no analítica OLAP) y SQS acopla peor que un bus de eventos; MySQL sigue en EC2 (no serverless).\nOpción B: Auto Scaling de EC2 no es serverless y SNS por sí solo no es un bus de enrutamiento de eventos adecuado.\nOpción C (Correcta): EKS Fargate para microservicios, Aurora Serverless MySQL, Redshift Serverless para analítica y EventBridge como bus de eventos logra arquitectura event-driven serverless con analítica casi en tiempo real.\nOpción D: AppStream 2.0 es streaming de escritorios e IoT Core no es el bus adecuado para este flujo de datos empresarial.\n\nReferencias:\nhttps://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html\nhttps://docs.aws.amazon.com/redshift/latest/mgmt/serverless-whatis.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30475,
    "questionNumber": 475,
    "question": "A company is planning a migration from an on-premises data center to the AWS Cloud. The company plans to use multiple AWS accounts that are managed in an organization in AWS Organizations. The company will create a small number of accounts initially and will add accounts as needed. A solutions architect must design a solution that turns on AWS CloudTrail in all AWS accounts. What is the MOST operationally efficient solution that meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Lambda function that creates a new CloudTrail trail in all AWS accounts in the organization. Invoke the Lambda function daily by using a scheduled action in Amazon EventBridge.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a new CloudTrail trail in the organization's management account. Configure the trail to log all events for all AWS accounts in the organization.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a new CloudTrail trail in all AWS accounts in the organization. Create new trails whenever a new account is created. Define an SCP that prevents deletion or modification of trails. Apply the SCP to the root OU.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Systems Manager Automation runbook that creates a CloudTrail trail in all AWS accounts in the organization. Invoke the automation by using Systems Manager State Manager.",
        "isCorrect": false
      }
    ],
    "comments": "Migración a múltiples cuentas en Organizations; activar CloudTrail en TODAS las cuentas, incluidas las futuras, con la MAYOR eficiencia operativa.\n\nOpción A: Una Lambda diaria que crea trails es un mecanismo frágil y con mantenimiento innecesario.\nOpción B (Correcta): Un organization trail creado en la cuenta de gestión registra eventos de todas las cuentas actuales y futuras automáticamente, con mínimo esfuerzo operativo.\nOpción C: Crear trails por cuenta y añadir SCPs implica trabajo manual continuo cada vez que se crea una cuenta.\nOpción D: Un runbook de Systems Manager con State Manager añade complejidad frente al trail de organización nativo.\n\nReferencias:\nhttps://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html\nhttps://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30476,
    "questionNumber": 476,
    "question": "A software development company has multiple engineers who are working remotely. The company is running Active Directory Domain Services (AD DS) on an Amazon EC2 instance. The company's security policy states that all internal, nonpublic services that are deployed in a VPC must be accessible through a VPN. Multi-factor authentication (MFA) must be used for access to a VPN. What should a solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Site-to-Site VPN connection. Configure integration between a VPN and AD DS. Use an Amazon WorkSpaces client with MFA support enabled to establish a VPN connection.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Client VPN endpoint. Create an AD Connector directory for integration with AD DS. Enable MFA for AD Connector. Use AWS Client VPN to establish a VPN connection.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create multiple AWS Site-to-Site VPN connections by using AWS VPN CloudHub. Configure integration between AWS VPN CloudHub and AD DS. Use AWS Copilot to establish a VPN connection.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Amazon WorkLink endpoint. Configure integration between Amazon WorkLink and AD DS. Enable MFA in Amazon WorkLink. Use AWS Client VPN to establish a VPN connection.",
        "isCorrect": false
      }
    ],
    "comments": "Ingenieros remotos con AD DS en EC2; toda conexión a servicios internos debe pasar por VPN con MFA obligatorio.\n\nOpción A: WorkSpaces es un servicio de escritorios virtuales, no un cliente VPN para acceso de red interno con MFA.\nOpción B (Correcta): AWS Client VPN con AD Connector integrado a AD DS y MFA habilitado proporciona VPN de acceso remoto por usuario con autenticación multifactor.\nOpción C: VPN CloudHub conecta sedes site-to-site, no clientes remotos individuales con MFA; AWS Copilot no crea VPNs.\nOpción D: Amazon WorkLink (descatalogado) daba acceso a webs internas móviles, no una VPN de red completa.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html\nhttps://docs.aws.amazon.com/vpn/latest/clientvpn-admin/client-authentication.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30477,
    "questionNumber": 477,
    "question": "A company is running a three-tier web application in an on-premises data center. The frontend is served by an Apache web server, the middle tier is a monolithic Java application, and the storage tier is a PostgreSQL database. During a recent marketing promotion, customers could not place orders through the application because the application crashed. An analysis showed that all three tiers were overloaded. The application became unresponsive, and the database reached its capacity limit because of read operations. The company already has several similar promotions scheduled in the near future. A solutions architect must develop a plan for migration to AWS to resolve these issues. The solution must maximize scalability and must minimize operational effort Which combination of steps will meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Refactor the frontend so that static assets can be hosted on Amazon S3. Use Amazon CloudFront to serve the frontend to customers. Connect the frontend to the Java application.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Rehost the Apache web server of the frontend on Amazon EC2 instances that are in an Auto Scaling group. Use a load balancer in front of the Auto Scaling group. Use Amazon Elastic File System (Amazon EFS) to host the static assets that the Apache web server needs.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Rehost the Java application in an AWS Elastic Beanstalk environment that includes auto scaling.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Refactor the Java application, Develop a Docker container to run the Java application. Use AWS Fargate to host the container.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Use AWS Database Migration Service (AWS DMS) to replatform the PostgreSQL database to an Amazon Aurora PostgreSQL database. Use Aurora Auto Scaling for read replicas.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Rehost the PostgreSQL database on an Amazon EC2 instance that has twice as much memory as the on-premises server.",
        "isCorrect": false
      }
    ],
    "comments": "App de 3 capas on-premises (Apache, monolito Java, PostgreSQL) que se saturó en una promoción; migrar a AWS MAXIMIZANDO escalabilidad y MINIMIZANDO esfuerzo operativo.\n\nOpción A (Correcta): Servir assets estáticos desde S3 con CloudFront descarga el frontend y escala globalmente con mínimo esfuerzo.\nOpción B: Rehost del Apache en EC2 con EFS mantiene la gestión de instancias y no es la opción de menor esfuerzo frente a S3/CloudFront.\nOpción C (Correcta): Rehost del Java en Elastic Beanstalk con auto scaling gestiona la capacidad sin administrar la infraestructura.\nOpción D: Contenerizar en Fargate exige refactor y esfuerzo mayor que Beanstalk para una migración rápida.\nOpción E (Correcta): Migrar PostgreSQL a Aurora PostgreSQL con Aurora Auto Scaling de réplicas de lectura resuelve el cuello de botella de lecturas y escala automáticamente.\nOpción F: PostgreSQL en una sola EC2 con más memoria no escala ni añade réplicas de lectura; sigue siendo punto único.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html",
    "category": "Migración y Modernización",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30478,
    "questionNumber": 478,
    "question": "A company is deploying a new application on AWS. The application consists of an Amazon Elastic Kubernetes Service (Amazon EKS) cluster and an Amazon Elastic Container Registry (Amazon ECR) repository. The EKS cluster has an AWS managed node group. The company's security guidelines state that all resources on AWS must be continuously scanned for security vulnerabilities. Which solution will meet this requirement with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Activate AWS Security Hub. Configure Security Hub to scan the EKS nodes and the ECR repository.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Activate Amazon Inspector to scan the EKS nodes and the ECR repository.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Launch a new Amazon EC2 instance and install a vulnerability scanning tool from AWS Marketplace. Configure the EC2 instance to scan the EKS nodes. Configure Amazon ECR to perform a basic scan on push.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Install the Amazon CloudWatch agent on the EKS nodes. Configure the CloudWatch agent to scan continuously. Configure Amazon ECR to perform a basic scan on push.",
        "isCorrect": false
      }
    ],
    "comments": "Cluster EKS con node group gestionado y repositorio ECR; se exige escaneo CONTINUO de vulnerabilidades con el MENOR overhead operativo.\n\nOpción A: Security Hub agrega hallazgos de otros servicios pero no escanea directamente nodos ni imágenes ECR.\nOpción B (Correcta): Amazon Inspector escanea de forma continua y automática las instancias EC2 (nodos EKS) y las imágenes en ECR sin infraestructura adicional.\nOpción C: Una herramienta de terceros en EC2 añade instalación y mantenimiento; el scan básico de ECR no es continuo por sí solo.\nOpción D: El agente de CloudWatch recoge métricas/logs, no realiza escaneo de vulnerabilidades.\n\nReferencias:\nhttps://docs.aws.amazon.com/inspector/latest/user/scanning-ecr.html\nhttps://docs.aws.amazon.com/inspector/latest/user/scanning-ec2.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30479,
    "questionNumber": 479,
    "question": "A company needs to improve the reliability of its ticketing application. The application runs on an Amazon Elastic Container Service (Amazon ECS) cluster. The company uses Amazon CloudFront to serve the application. A single ECS service of the ECS cluster is the CloudFront distribution’s origin. The application allows only a specific number of active users to enter a ticket purchasing flow. These users are identified by an encrypted attribute in their JSON Web Token (JWT). All other users are redirected to a waiting room module until there is available capacity for purchasing. The application is experiencing high loads. The waiting room module is working as designed, but load on the waiting room is disrupting the applications availability. This disruption is negatively affecting the application's ticket sale transactions. Which solution will provide the MOST reliability for ticket sale transactions during periods of high load?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a separate service in the ECS cluster for the waiting room. Use a separate scaling configuration. Ensure that the ticketing service uses the JWT information and appropriately forwards requests to the waiting room service.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Move the application to an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. Split the waiting room module into a pod that is separate from the ticketing pod. Make the ticketing pod part of a StatefulSet. Ensure that the ticketing pod uses the JWT information and appropriately forwards requests to the waiting room pod.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a separate service in the ECS cluster for the waiting room. Use a separate scaling configuration. Create a CloudFront function that inspects the JWT information and appropriately forwards requests to the ticketing service or the waiting room service.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Move the application to an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. Split the waiting room module into a pod that is separate from the ticketing pod. Use AWS App Mesh by provisioning the App Mesh controller for Kubernetes. Enable mTLS authentication and service-to-service authentication for communication between the ticketing pod and the waiting room pod. Ensure that the ticketing pod uses the JWT information and appropriately forwards requests to the waiting room pod.",
        "isCorrect": false
      }
    ],
    "comments": "App de venta de entradas en ECS tras CloudFront; una waiting room satura la disponibilidad de las transacciones. Se busca la MAYOR fiabilidad para las ventas separando ambos flujos en el borde.\n\nOpción A: Reenviar desde el servicio de ticketing hace pasar toda la carga por ECS antes de derivar; no aísla en el borde.\nOpción B: Migrar a EKS con StatefulSet es un cambio grande e innecesario y no desacopla en el borde.\nOpción C (Correcta): Un servicio ECS separado para la waiting room con su propio escalado y una CloudFront Function que inspecciona el JWT y enruta a ticketing o waiting room aísla la carga en el borde, protegiendo las ventas.\nOpción D: EKS + App Mesh + mTLS añade complejidad enorme sin resolver el enrutamiento en el borde.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30480,
    "questionNumber": 480,
    "question": "A solutions architect is creating an AWS CloudFormation template from an existing manually created non-production AWS environment. The CloudFormation template can be destroyed and recreated as needed. The environment contains an Amazon EC2 instance. The EC2 instance has an instance profile that the EC2 instance uses to assume a role in a parent account. The solutions architect recreates the role in a CloudFormation template and uses the same role name. When the CloudFormation template is launched in the child account, the EC2 instance can no longer assume the role in the parent account because of insufficient permissions What should the solutions architect do to resolve this issue?",
    "choices": [
      {
        "letter": "A",
        "text": "In the parent account, edit the trust policy for the role that the EC2 instance needs to assume. Ensure that the target role ARN in the existing statement that allows the sts:AssumeRole action is correct. Save the trust policy.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "In the parent account, edit the trust policy for the role that the EC2 instance needs to assume. Add a statement that allows the sts:AssumeRole action for the root principal of the child account. Save the trust policy.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Update the CloudFormation stack again. Specify only the CAPABILITY_NAMED_IAM capability.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Update the CloudFormation stack again. Specify the CAPABILITY_IAM capability and the CAPABILITY_NAMED_IAM capability.",
        "isCorrect": false
      }
    ],
    "comments": "CloudFormation recrea un rol (mismo nombre) que una EC2 usa para asumir un rol en la cuenta padre; tras recrearlo, la EC2 ya no puede asumirlo por permisos insuficientes.\n\nOpción A (Correcta): Al recrear el rol cambia su identidad; hay que editar la trust policy del rol en la cuenta padre para que el ARN objetivo del sts:AssumeRole sea correcto.\nOpción B: Confiar en el root principal de toda la cuenta hija es demasiado amplio e inseguro; basta corregir el ARN concreto.\nOpción C: CAPABILITY_NAMED_IAM solo autoriza crear recursos IAM con nombre; no arregla la relación de confianza en la otra cuenta.\nOpción D: Las capabilities de IAM tampoco corrigen la trust policy del rol en la cuenta padre.\n\nReferencias:\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30481,
    "questionNumber": 481,
    "question": "A company's web application has reliability issues. The application serves customers globally. The application runs on a single Amazon EC2 instance and performs read-intensive operations on an Amazon RDS for MySQL database. During high load, the application becomes unresponsive and requires a manual restart of the EC2 instance. A solutions architect must improve the application's reliability. Which solution will meet this requirement with the LEAST development effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon CloudFront distribution. Specify the EC2 instance as the distribution’s origin. Configure a Multi-AZ deployment for the RDS for MySQL database. Use the standby DB instance for the read-intensive operations.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Run the application on EC2 instances that are in an Auto Scaling group. Place the EC2 instances behind an Elastic Load Balancing (ELB) load balancer. Replace the database service with Amazon Aurora. Use Aurora Replicas for the read-intensive operations.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Deploy AWS Global Accelerator. Configure a Multi-AZ deployment for the RDS for MySQL database. Use the standby DB instance for the read-intensive operations.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Migrate the application to AWS Lambda functions. Create read replicas for the RDS for MySQL database. Use the read replicas for the read-intensive operations.",
        "isCorrect": false
      }
    ],
    "comments": "App global en una sola EC2 con RDS MySQL de lecturas intensivas que se cuelga en picos y requiere reinicio manual; mejorar la fiabilidad con el MENOR esfuerzo de desarrollo.\n\nOpción A: CloudFront con la EC2 como origen y Multi-AZ no aporta escalado de cómputo; el standby Multi-AZ NO sirve lecturas.\nOpción B (Correcta): EC2 en Auto Scaling group tras un ELB elimina el punto único de cómputo y Aurora con Réplicas de lectura absorbe las lecturas intensivas, con poco desarrollo.\nOpción C: Global Accelerator mejora el enrutamiento pero no soluciona el cuello de cómputo; el standby Multi-AZ tampoco sirve lecturas.\nOpción D: Migrar a Lambda implica reescribir la aplicación (mucho desarrollo).\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30482,
    "questionNumber": 482,
    "question": "A company needs to use an AWS Transfer Family SFTP-enabled server with an Amazon S3 bucket to receive updates from a third-party data supplier. The data is encrypted with Pretty Good Privacy (PGP) encryption. The company needs a solution that will automatically decrypt the data after the company receives the data. A solutions architect will use a Transfer Family managed workflow. The company has created an IAM service role by using an IAM policy that allows access to AWS Secrets Manager and the S3 bucket. The role’s trust relationship allows the transfer amazonaws.com service to assume the role. What should the solutions architect do next to complete the solution for automatic decryption?",
    "choices": [
      {
        "letter": "A",
        "text": "Store the PGP public key in Secrets Manager. Add a nominal step in the Transfer Family managed workflow to decrypt files. Configure PGP encryption parameters in the nominal step. Associate the workflow with the Transfer Family server.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Store the PGP private key in Secrets Manager. Add an exception-handling step in the Transfer Family managed workflow to decrypt files. Configure PGP encryption parameters in the exception handler. Associate the workflow with the SFTP user.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Store the PGP private key in Secrets Manager. Add a nominal step in the Transfer Family managed workflow to decrypt files. Configure PGP decryption parameters in the nominal step. Associate the workflow with the Transfer Family server.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Store the PGP public key in Secrets Manager. Add an exception-handling step in the Transfer Family managed workflow to decrypt files. Configure PGP decryption parameters in the exception handler. Associate the workflow with the SFTP user.",
        "isCorrect": false
      }
    ],
    "comments": "Transfer Family SFTP con S3 recibe datos cifrados PGP; se necesita descifrado AUTOMÁTICO tras la recepción mediante un managed workflow.\n\nOpción A: Para descifrar hace falta la clave PRIVADA, no la pública; y son parámetros de descifrado, no de cifrado.\nOpción B: El descifrado va en un paso NOMINAL del flujo (no en el manejador de excepciones) y el workflow se asocia al servidor, no al usuario.\nOpción C (Correcta): Guardar la clave PRIVADA PGP en Secrets Manager, añadir un paso nominal de descifrado y asociar el workflow al servidor Transfer Family descifra automáticamente.\nOpción D: Clave pública y manejador de excepciones son incorrectos para el descifrado nominal.\n\nReferencias:\nhttps://docs.aws.amazon.com/transfer/latest/userguide/key-management.html\nhttps://docs.aws.amazon.com/transfer/latest/userguide/decrypt-workflow-steps.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30483,
    "questionNumber": 483,
    "question": "A company is migrating infrastructure for its massive multiplayer game to AWS. The game’s application features a leaderboard where players can see rankings in real time. The leaderboard requires microsecond reads and single-digit-millisecond write latencies. The datasets are single-digit terabytes in size and must be available to accept writes in less than a minute if a primary node failure occurs. The company needs a solution in which data can persist for further analytical processing through a data pipeline. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon ElastiCache tor Redis cluster with cluster mode enabled, Configure the application to interact with the primary node.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon ROS database with a read replica. Configure the application to point writes to the writer endpoint. Configure the application to point reads to the reader endpoint.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon MemoryDB for Redis cluster in Muit-AZ mode Configure the application to interact with the primary node.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create multiple Redis nodes on Amazon EC2 instances that are spread across multiple Availability Zones. Configure backups to Amazon S3.",
        "isCorrect": false
      }
    ],
    "comments": "Leaderboard de juego con lecturas en microsegundos, escrituras de milisegundos de un dígito, datos de pocos TB, disponible para escrituras en <1 min ante fallo del primario y persistencia para analítica, con el MENOR overhead.\n\nOpción A: ElastiCache for Redis es una caché en memoria sin durabilidad garantizada; no persiste de forma fiable para analítica.\nOpción B: RDS relacional no da lecturas en microsegundos.\nOpción C (Correcta): MemoryDB for Redis en Multi-AZ ofrece lecturas en microsegundos, escrituras de milisegundos, durabilidad (log Multi-AZ) y failover en menos de un minuto, gestionado.\nOpción D: Redis autogestionado en EC2 implica un overhead operativo enorme.\n\nReferencias:\nhttps://docs.aws.amazon.com/memorydb/latest/devguide/what-is-memorydb.html\nhttps://docs.aws.amazon.com/memorydb/latest/devguide/availability.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30484,
    "questionNumber": 484,
    "question": "A company is running several applications in the AWS Cloud. The applications are specific to separate business units in the company. The company is running the components of the applications in several AWS accounts that are in an organization in AWS Organizations. Every cloud resource in the company’s organization has a tag that is named BusinessUnit. Every tag already has the appropriate value of the business unit name. The company needs to allocate its cloud costs to different business units. The company also needs to visualize the cloud costs for each business unit. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "In the organization's management account, create a cost allocation tag that is named BusinessUnit. Also in the management account, create an Amazon S3 bucket and an AWS Cost and Usage Report (AWS CUR). Configure the S3 bucket as the destination for the AWS CUR. From the management account, query the AWS CUR data by using Amazon Athena. Use Amazon QuickSight for visualization.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "In each member account, create a cost allocation tag that is named BusinessUnit. In the organization’s management account, create an Amazon S3 bucket and an AWS Cost and Usage Report (AWS CUR). Configure the S3 bucket as the destination for the AWS CUR. Create an Amazon CloudWatch dashboard for visualization.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "In the organization's management account, create a cost allocation tag that is named BusinessUnit. In each member account, create an Amazon S3 bucket and an AWS Cost and Usage Report (AWS CUR). Configure each S3 bucket as the destination for its respective AWS CUR. In the management account, create an Amazon CloudWatch dashboard for visualization.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "In each member account, create a cost allocation tag that is named BusinessUnit. Also in each member account, create an Amazon S3 bucket and an AWS Cost and Usage Report (AWS CUR). Configure each S3 bucket as the destination for its respective AWS CUR. From the management account, query the AWS CUR data by using Amazon Athena. Use Amazon QuickSight for visualization.",
        "isCorrect": false
      }
    ],
    "comments": "Varias cuentas en Organizations con tag BusinessUnit ya aplicado; se necesita ASIGNAR costes por unidad de negocio y VISUALIZARLOS.\n\nOpción A (Correcta): Activar el cost allocation tag BusinessUnit en la cuenta de gestión, generar el CUR en un bucket S3, consultarlo con Athena y visualizarlo con QuickSight es el flujo estándar y completo.\nOpción B: Los cost allocation tags se activan en la cuenta de gestión, no en cada miembro; un dashboard de CloudWatch no consulta el CUR.\nOpción C: Un CUR por cuenta miembro fragmenta los datos; los tags se activan en la gestión.\nOpción D: Los tags de asignación deben activarse en la cuenta de gestión; un CUR por cuenta complica la visión consolidada.\n\nReferencias:\nhttps://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html\nhttps://docs.aws.amazon.com/cur/latest/userguide/cur-query-athena.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30485,
    "questionNumber": 485,
    "question": "A utility company wants to collect usage data every 5 minutes from its smart meters to facilitate time-of-use metering. When a meter sends data to AWS, the data is sent to Amazon API Gateway, processed by an AWS Lambda function. and stored in an Amazon DynamoDB table. During the pilot phase, the Lambda functions took from 3 to 5 seconds to complete. As more smart meters are deployed, the engineers notice the Lambda functions are taking from 1 to 2 minutes to complete. The functions are also increasing in duration as new types of metrics are collected from the devices. There are many ProvisionedThroughputExceededException errors while performing PUT operations on DynamoDB, and there are also many TooManyRequestsException errors from Lambda. Which combination of changes will resolve these issues? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Increase the write capacity units to the DynamoDB table.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Increase the memory available to the Lambda functions.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Increase the payload size from the smart meters to send more data.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Stream the data into an Amazon Kinesis data stream from API Gateway and process the data in batches.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Collect data in an Amazon SQS FIFO queue, which triggers a Lambda function to process each message",
        "isCorrect": false
      }
    ],
    "comments": "Contadores inteligentes envían datos cada 5 min a API Gateway -> Lambda -> DynamoDB; aparecen ProvisionedThroughputExceededException en DynamoDB y TooManyRequestsException en Lambda. Resolver el cuello de escritura y la concurrencia.\n\nOpción A (Correcta): Aumentar las unidades de capacidad de escritura (WCU) de DynamoDB elimina los ProvisionedThroughputExceededException en los PUT.\nOpción B: Más memoria de Lambda no resuelve el throttling de concurrencia ni el límite de escrituras de DynamoDB.\nOpción C: Aumentar el payload no reduce el throttling; agravaría la carga.\nOpción D (Correcta): Introducir Kinesis Data Stream desde API Gateway y procesar por lotes amortigua los picos y reduce las invocaciones concurrentes de Lambda y las escrituras individuales.\nOpción E: SQS FIFO limita el throughput y una Lambda por mensaje no aporta el batching eficiente de Kinesis.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ProvisionedThroughput.html\nhttps://docs.aws.amazon.com/streams/latest/dev/introduction.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30486,
    "questionNumber": 486,
    "question": "A company recently completed a successful proof of concept of Amazon WorkSpaces. A solutions architect needs to make the solution highly available across two AWS Regions. Amazon WorkSpaces is deployed in a failover Region, and a hosted zone is deployed in Amazon Route 53. What should the solutions architect do to configure high availability for the solution?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a connection alias in the primary Region and in the failover Region. Associate the connection aliases with a directory in each Region. Create a Route 53 failover routing policy. Set Evaluate Target Health to Yes.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a connection alias in the primary Region and in the failover Region. Associate the connection aliases with a directory in the primary Region. Create a Route 53 multivalue answer routing policy.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a connection alias in the primary Region. Associate the connection alias with a directory in the primary Region. Create a Route 53 weighted routing policy.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a connection alias in the primary Region Associate the connection alias with a directory in the failover Region. Create a Route 53 failover routing policy. Set Evaluate Target Health to Yes.",
        "isCorrect": false
      }
    ],
    "comments": "Hacer WorkSpaces ALTAMENTE DISPONIBLE entre dos Regiones con failover en Route 53 usando connection aliases.\n\nOpción A (Correcta): Crear connection alias en la Región primaria y en la de failover, asociarlos a un directorio en CADA Región y una política de failover en Route 53 con Evaluate Target Health = Yes proporciona la redundancia cross-Región correcta.\nOpción B: Asociar ambos alias solo al directorio de la Región primaria no da failover regional real; multivalue no es failover.\nOpción C: Un solo alias en la primaria con weighted routing no cubre la caída de la Región primaria.\nOpción D: Un único alias asociado al directorio de failover no habilita el par primario-secundario correctamente.\n\nReferencias:\nhttps://docs.aws.amazon.com/workspaces/latest/adminguide/cross-region-redirection.html\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30487,
    "questionNumber": 487,
    "question": "A company plans to migrate many VMs from an on-premises environment to AWS. The company requires an initial assessment of the on-premises environment before the migration, a visualization of the dependencies between applications that run on the VMs, and a report that provides an assessment of the on-premises environment. To get this information, the company has initiated a Migration Evaluator assessment request. The company has the ability to install collector software in its on-premises environment without any constraints Which solution will provide the company with the required information with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Install the AWS Application Discovery Agent on each on-premises VM. After the data collection period ends, use AWS Migration Hub to view the application dependencies. Download the Quick insights assessment report from Migration Hub.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Install the Migration Evaluator Collector on each on-premises VM. After the data collection period ends, use Migration Evaluator to view the application dependencies. Download and export the discovered server list from Migration Evaluator. Upload the list to Amazon QuickSight When the QuickSight report is generated, download the Quick Insights assessment report.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Setup the AWS Application Discovery Service Agentless Collector in the on-premises environment. After the data collection period ends, use AWS Migration Hub to view the application dependencies. Export the discovered server list from Application Discovery Service. Upload the list to Migration Evaluator. When the Migration Evaluator report is generated, download the Quick Insights assessment.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Set up the Migration Evaluator Collector in the on-premises environment. Install the AWS Application Discovery Agent on each VM. After the data collection period ends, use AWS Migration Hub to view the application dependencies. Download the Quick Insights assessment report from Migration Evaluator.",
        "isCorrect": false
      }
    ],
    "comments": "Evaluación previa a migrar muchas VMs: dependencias entre aplicaciones y reporte de assessment; se puede instalar software colector sin restricciones. Menor overhead operativo.\n\nOpción A (Correcta): Instalar el AWS Application Discovery Agent en cada VM permite ver dependencias de aplicaciones en Migration Hub y descargar el reporte Quick Insights, todo integrado y con mínimo esfuerzo.\nOpción B: Exportar la lista y subirla manualmente a QuickSight añade pasos innecesarios; el Collector de Migration Evaluator no ofrece el mapa de dependencias como el agente.\nOpción C: El colector agentless no captura dependencias a nivel de proceso tan bien como el agente y añade exportaciones manuales.\nOpción D: Combinar ambos colectores es redundante y aumenta el overhead.\n\nReferencias:\nhttps://docs.aws.amazon.com/application-discovery/latest/userguide/discovery-agent.html\nhttps://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30488,
    "questionNumber": 488,
    "question": "A company hosts its primary API on AWS by using an Amazon API Gateway API and AWS Lambda functions that contain the logic for the API methods. The company’s internal applications use the API for core functionality and business logic. The company’s customers use the API to access data from their accounts. Several customers also have access to a legacy API that is running on a single standalone Amazon EC2 instance. The company wants to increase the security for these APIs to better prevent denial of service (DoS) attacks, check for vulnerabilities, and guard against common exploits. What should a solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS WAF to protect both APIs. Configure Amazon Inspector to analyze the legacy API. Configure Amazon GuardDuty to monitor for malicious attempts to access the APIs.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS WAF to protect the API Gateway API. Configure Amazon Inspector to analyze both APIs. Configure Amazon GuardDuty to block malicious attempts to access the APIs.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS WAF to protect the API Gateway API. Configure Amazon Inspector to analyze the legacy API. Configure Amazon GuardDuty to monitor for malicious attempts to access the APIs.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use AWS WAF to protect the API Gateway AP! Configure Amazon Inspector to protect the legacy API. Configure Amazon GuardDuty to block malicious attempts to access the APIs.",
        "isCorrect": false
      }
    ],
    "comments": "Proteger una API Gateway+Lambda y una API legacy en EC2 frente a DoS, vulnerabilidades y exploits comunes.\n\nOpción A: WAF no puede asociarse directamente a una API en una EC2 standalone del mismo modo; Inspector no analiza una API sino instancias.\nOpción B: Inspector no analiza APIs Gateway; GuardDuty no bloquea por sí mismo.\nOpción C (Correcta): WAF protege la API Gateway (exploits/DoS), Inspector analiza vulnerabilidades de la instancia EC2 legacy y GuardDuty MONITORIZA intentos maliciosos; cada servicio en su rol correcto.\nOpción D: GuardDuty detecta, no bloquea; e Inspector no 'protege' la API legacy, la analiza.\n\nReferencias:\nhttps://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html\nhttps://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30489,
    "questionNumber": 489,
    "question": "A company is running a serverless ecommerce application on AWS. The application uses Amazon API Gateway to invoke AWS Lambda Java functions. The Lambda functions connect to an Amazon RDS for MySQL database to store data. During a recent sale event, a sudden increase in web traffic resulted in poor API performance and database connection failures. The company needs to implement a solution to minimize the latency for the Lambda functions and to support bursts in traffic. Which solution will meet these requirements with the LEAST amount of change to the application?",
    "choices": [
      {
        "letter": "A",
        "text": "Update the code of the Lambda functions so that the Lambda functions open the database connection outside of the function handler. Increase the provisioned concurrency for the Lambda functions.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an RDS Proxy endpoint for the database. Store database secrets in AWS Secrets Manager. Set up the required IAM permissions. Update the Lambda functions to connect to the RDS Proxy endpoint. Increase the provisioned concurrency for the Lambda functions.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a custom parameter group. Increase the value of the max_connections parameter. Associate the custom parameter group with the RDS DB instance and schedule a reboot. Increase the reserved concurrency for the Lambda functions.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an RDS Proxy endpoint for the database. Store database secrets in AWS Secrets Manager. Set up the required IAM permissions. Update the Lambda functions to connect to the RDS Proxy endpoint. Increase the reserved concurrency for the Lambda functions.",
        "isCorrect": false
      }
    ],
    "comments": "App serverless (API Gateway + Lambda Java + RDS MySQL) con mal rendimiento y fallos de conexión a BD en picos; minimizar latencia de Lambda y soportar ráfagas con el MENOR cambio en la app.\n\nOpción A: Abrir la conexión fuera del handler ayuda poco; sin RDS Proxy sigue agotando conexiones en ráfagas.\nOpción B (Correcta): RDS Proxy agrupa conexiones (evita fallos de conexión) y la provisioned concurrency reduce los cold starts para las ráfagas, con cambios mínimos.\nOpción C: Subir max_connections y reserved concurrency no agrupa conexiones ni reduce cold starts; el reboot causa interrupción.\nOpción D: La reserved concurrency LIMITA la concurrencia (no reduce latencia de arranque); provisioned concurrency es lo adecuado.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30490,
    "questionNumber": 490,
    "question": "A company requires that all internal application connectivity use private IP addresses. To facilitate this policy, a solutions architect has created interface endpoints to connect to AWS Public services. Upon testing, the solutions architect notices that the service names are resolving to public IP addresses, and that internal services cannot connect to the interface endpoints. Which step should the solutions architect take to resolve this issue?",
    "choices": [
      {
        "letter": "A",
        "text": "Update the subnet route table with a route to the interface endpoint.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Enable the private DNS option on the VPC attributes.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Configure the security group on the interface endpoint to allow connectivity to the AWS services.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure an Amazon Route 53 private hosted zone with a conditional forwarder for the internal application.",
        "isCorrect": false
      }
    ],
    "comments": "Se crean interface endpoints para servicios AWS pero los nombres resuelven a IPs públicas y los servicios internos no conectan; hay que forzar resolución privada.\n\nOpción A: Los interface endpoints (PrivateLink) no usan rutas en la route table como los gateway endpoints.\nOpción B (Correcta): Habilitar la opción Private DNS del endpoint (requiere enableDnsHostnames y enableDnsSupport en la VPC) hace que el nombre del servicio resuelva a la IP privada del endpoint.\nOpción C: El security group controla el acceso, pero no cambia la resolución DNS a pública.\nOpción D: Una zona privada con forwarder condicional es un rodeo innecesario cuando existe la opción nativa de Private DNS.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-aws-services.html\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-dns.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30491,
    "questionNumber": 491,
    "question": "A company is developing a latency-sensitive application. Part of the application includes several AWS Lambda functions that need to initialize as quickly as possible. The Lambda functions are written in Java and contain initialization code outside the handlers to load libraries, initialize classes, and generate unique IDs. Which solution will meet the startup performance requirement MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Move all the initialization code to the handlers for each Lambda function. Activate Lambda SnapStart for each Lambda function. Configure SnapStart to reference the $LATEST version of each Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Publish a version of each Lambda function. Create an alias for each Lambda function. Configure each alias to point to its corresponding version. Set up a provisioned concurrency configuration for each Lambda function to point to the corresponding alias.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Publish a version of each Lambda function. Set up a provisioned concurrency configuration for each Lambda function to point to the corresponding version. Activate Lambda SnapStar for the published versions of the Lambda functions.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Update the Lambda functions to add a pre-snapshot hook. Move the code that generates unique IDs into the handlers. Publish a version of each Lambda function. Activate Lambda SnapStart for the published versions of the Lambda functions.",
        "isCorrect": true
      }
    ],
    "comments": "Lambdas en Java latencia-sensibles con código de inicialización fuera del handler (librerías, clases, IDs únicos); arranque rápido de la forma MÁS rentable.\n\nOpción A: SnapStart no funciona con $LATEST (requiere versiones publicadas); mover todo al handler pierde el beneficio del snapshot.\nOpción B: Provisioned concurrency reduce cold starts pero tiene coste continuo; no es la opción MÁS rentable.\nOpción C: Combinar provisioned concurrency con SnapStart es incompatible/redundante y más caro.\nOpción D (Correcta): SnapStart (gratis) sobre versiones publicadas cachea el estado inicializado; un pre-snapshot hook y mover la generación de IDs únicos al handler evita reutilizar valores del snapshot, logrando arranque rápido sin coste extra.\n\nReferencias:\nhttps://docs.aws.amazon.com/lambda/latest/dg/snapstart.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/snapstart-uniqueness.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30492,
    "questionNumber": 492,
    "question": "A solutions architect is importing a VM from an on-premises environment by using the Amazon EC2 VM Import feature of AWS Import/Export. The solutions architect has created an AMI and has provisioned an Amazon EC2 instance that is based on that AMI. The EC2 instance runs inside a public subnet in a VPC and has a public IP address assigned. The EC2 instance does not appear as a managed instance in the AWS Systems Manager console. Which combination of steps should the solutions architect take to troubleshoot this issue? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Verify that Systems Manager Agent is installed on the instance and is running.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Verify that the instance is assigned an appropriate IAM role for Systems Manager.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Verify the existence of a VPC endpoint on the VPC.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Verity that the AWS Application Discovery Agent is configured.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Verify the correct configuration of service-linked roles for Systems Manager.",
        "isCorrect": false
      }
    ],
    "comments": "Una EC2 (importada por VM Import, subnet pública con IP pública) no aparece como instancia gestionada en Systems Manager; diagnosticar la causa.\n\nOpción A (Correcta): Verificar que el agente SSM esté instalado y en ejecución es requisito básico para que la instancia sea gestionada.\nOpción B (Correcta): Verificar que la instancia tenga un rol IAM con permisos de Systems Manager (AmazonSSMManagedInstanceCore) es imprescindible para el registro.\nOpción C: Con IP pública y salida a internet no es obligatorio un VPC endpoint para SSM.\nOpción D: El Application Discovery Agent no tiene relación con el registro en Systems Manager.\nOpción E: Los service-linked roles de SSM no son la causa habitual; el problema es el rol de instancia o el agente.\n\nReferencias:\nhttps://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-install-ssm-agent.html\nhttps://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-profile.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30493,
    "questionNumber": 493,
    "question": "A company is using AWS CloudFormation as its deployment tool for all applications. It stages all application binaries and templates within Amazon S3 buckets with versioning enabled. Developers have access to an Amazon EC2 instance that hosts the integrated development environment (IDE). The developers download the application binaries from Amazon S3 to the EC2 instance, make changes, and upload the binaries to an S3 bucket after running the unit tests locally. The developers want to improve the existing deployment mechanism and implement CI/CD using AWS CodePipeline. The developers have the following requirements: • Use AWS CodeCommit for source control. • Automate unit testing and security scanning. • Alert the developers when unit tests fail. • Turn application features on and off, and customize deployment dynamically as part of CI/CD. • Have the lead developer provide approval before deploying an application. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS CodeBuild to run unit tests and security scans. Use an Amazon EventBridge rule to send Amazon SNS alerts to the developers when unit tests fail. Write AWS Cloud Development Kit (AWS CDK) constructs for different solution features, and use a manifest file to tum features on and off in the AWS CDK application. Use a manual approval stage in the pipeline to allow the lead developer to approve applications.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use AWS Lambda to run unit tests and security scans. Use Lambda in a subsequent stage in the pipeline to send Amazon SNS alerts to the developers when unit tests fail. Write AWS Amplify plugins for different solution features and utilize user prompts to tum features on and off. Use Amazon SES in the pipeline to allow the lead developer to approve applications.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Jenkins to run unit tests and security scans. Use an Amazon EventBridge rule in the pipeline to send Amazon SES alerts to the developers when unit tests fail Use AWS CloudFormation nested stacks for different solution features and parameters to turn features on and off. Use AWS Lambda in the pipeline to allow the lead developer to approve applications.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS CodeDeploy to run unit tests and security scans. Use an Amazon CloudWatch alarm in the pipeline to send Amazon SNS alerts to the developers when unit tests fail. Use Docker images for different solution features and the AWS CLI to turn features on and off. Use a manual approval stage in the pipeline to allow the lead developer to approve applications.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar despliegues a CI/CD con CodePipeline: CodeCommit, tests y security scan automatizados, alerta al fallar tests, activar/desactivar features dinámicamente y aprobación manual del lead.\n\nOpción A (Correcta): CodeBuild ejecuta tests y scans, una regla de EventBridge envía SNS al fallar, constructs de CDK con manifiesto activan/desactivan features y una etapa de aprobación manual permite al lead aprobar; todo nativo y coherente.\nOpción B: Lambda para tests, Amplify plugins con prompts de usuario y SES para 'aprobar' no encajan con el flujo de pipeline requerido.\nOpción C: Jenkins añade infraestructura no gestionada; SES para alertas y Lambda para aprobación no es el mecanismo estándar.\nOpción D: CodeDeploy no ejecuta tests unitarios; usar la CLI para features es manual y frágil.\n\nReferencias:\nhttps://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html\nhttps://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30494,
    "questionNumber": 494,
    "question": "A global ecommerce company has many data centers around the world. With the growth of its stored data, the company needs to set up a solution to provide scalable storage for legacy on-premises file applications. The company must be able to take point-in-time copies of volumes by using AWS Backup and must retain low-latency access to frequently accessed data. The company also needs to have storage volumes that can be mounted as Internet Small Computer System Interface (iSCSI) devices from the company’s on-premises application servers. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Provision an AWS Storage Gateway tape gateway. Configure the tape gateway to store data in an Amazon S3 bucket. Deploy AWS Backup to take point-in-time copies of the volumes.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Provision an Amazon FSx File Gateway and an Amazon S3 File Gateway. Deploy AWS Backup to take point-in-time copies of the data.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Provision an AWS Storage Gateway volume gateway in cache mode. Back up the on-premises Storage Gateway volumes with AWS Backup.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Provision an AWS Storage Gateway file gateway in cache mode. Deploy AWS Backup to take point-in-time copies of the volumes.",
        "isCorrect": false
      }
    ],
    "comments": "Almacenamiento escalable para apps de ficheros legacy on-premises, con copias point-in-time vía AWS Backup, baja latencia a datos frecuentes y volúmenes montables como iSCSI.\n\nOpción A: El tape gateway es para backup en cinta virtual (VTL), no volúmenes iSCSI de bloque de baja latencia.\nOpción B: FSx File Gateway / S3 File Gateway exponen NFS/SMB (archivos), no volúmenes iSCSI de bloque.\nOpción C (Correcta): El Volume Gateway en modo cached expone volúmenes iSCSI con caché local de baja latencia y se respalda con AWS Backup (point-in-time).\nOpción D: El file gateway no ofrece volúmenes iSCSI de bloque.\n\nReferencias:\nhttps://docs.aws.amazon.com/storagegateway/latest/vgw/StorageGatewayConcepts.html\nhttps://docs.aws.amazon.com/aws-backup/latest/devguide/backup-gateway.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30495,
    "questionNumber": 495,
    "question": "A company has an application that uses AWS Key Management Service (AWS KMS) to encrypt and decrypt data. The application stores data in an Amazon S3 bucket in an AWS Region. Company security policies require the data to be encrypted before the data is placed into the S3 bucket. The application must decrypt the data when the application reads files from the S3 bucket. The company replicates the S3 bucket to other Regions. A solutions architect must design a solution so that the application can encrypt and decrypt data across Regions. The application must use the same key to decrypt the data in each Region. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a KMS multi-Region primary key. Use the KMS multi-Region primary key to create a KMS multi-Region replica key in each additional Region where the application is running. Update the application code to use the specific replica key in each Region.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a new customer managed KMS key in each additional Region where the application is running. Update the application code to use the specific KMS key in each Region.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Private Certificate Authority to create a new certificate authority (CA) in the primary Region. Issue a new private certificate from the CA for the application’s website URL. Share the CA with the additional Regions by using AWS Resource Access Manager (AWS RAM). Update the application code to use the shared CA certificates in each Region.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Systems Manager Parameter Store to create a parameter in each additional Region where the application is running. Export the key material from the KMS key in the primary Region. Store the key material in the parameter in each Region. Update the application code to use the key data from the parameter in each Region.",
        "isCorrect": false
      }
    ],
    "comments": "App que cifra/descifra con KMS y replica el bucket S3 a otras Regiones; debe usar la MISMA clave para descifrar en cada Región.\n\nOpción A (Correcta): Una KMS multi-Region primary key con sus replica keys en cada Región comparte el mismo material de clave (mismo key ID), por lo que se descifra en cualquier Región con la clave equivalente.\nOpción B: Claves independientes por Región no permiten descifrar datos cifrados con otra clave.\nOpción C: Una CA de certificados privados no es cifrado de objetos S3 con KMS.\nOpción D: Exportar material de clave a Parameter Store es inseguro y no es el patrón soportado; las multi-Region keys resuelven esto de forma nativa.\n\nReferencias:\nhttps://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-config-for-kms-objects.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30496,
    "questionNumber": 496,
    "question": "A company hosts an application that uses several Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer (ALB). During the initial startup of the EC2 instances, the EC2 instances run user data scripts to download critical content for the application from an Amazon S3 bucket. The EC2 instances are launching correctly. However, after a period of time, the EC2 instances are terminated with the following error message: “An instance was taken out of service in response to an ELB system health check failure.” EC2 instances continue to launch and be terminated because of Auto Scaling events in an endless loop. The only recent change to the deployment is that the company added a large amount of critical content to the S3 bucket. The company does not want to alter the user data scripts in production. What should a solutions architect do so that the production environment can deploy successfully?",
    "choices": [
      {
        "letter": "A",
        "text": "Increase the size of the EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Increase the health check timeout for the ALB.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Change the health check path for the ALB.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Increase the health check grace period for the Auto Scaling group.",
        "isCorrect": true
      }
    ],
    "comments": "EC2 en ASG tras ALB ejecutan user data que descarga contenido grande de S3 al arrancar; tras añadir mucho contenido, la ELB las marca no sanas y entran en bucle de terminación. No se quiere tocar el user data.\n\nOpción A: Instancias más grandes no cambian el tiempo de descarga inicial que agota el health check.\nOpción B: El timeout del health check del ALB es por intento, no cubre el largo arranque completo.\nOpción C: Cambiar el path del health check no soluciona que la app aún no esté lista durante la descarga.\nOpción D (Correcta): Aumentar el health check grace period del Auto Scaling group da tiempo a que el user data termine de descargar el contenido antes de evaluar la salud, rompiendo el bucle sin tocar el script.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/health-check-grace-period.html\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-health-checks.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30497,
    "questionNumber": 497,
    "question": "A company needs to move some on-premises Oracle databases to AWS. The company has chosen to keep some of the databases on premises for business compliance reasons. The on-premises databases contain spatial data and run cron jobs for maintenance. The company needs to connect to the on-premises systems directly from AWS to query data as a foreign table. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create Amazon DynamoDB global tables with auto scaling enabled. Use the AWS Schema Conversion Tool (AWS SCT) and AWS Database Migration Service (AWS DMS) to move the data from on premises to DynamoDB. Create an AWS Lambda function to move the spatial data to Amazon S3. Query the data by using Amazon Athena. Use Amazon EventBridge to schedule jobs in DynamoDB for maintenance. Use Amazon API Gateway for foreign table support.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon RDS for Microsoft SQL Server DB instance. Use native replication to move the data from on premises to the DB instance. Use the AWS Schema Conversion Tool (AWS SCT) to modify the SQL Server schema as needed after replication. Move the spatial data to Amazon Redshift. Use stored procedures for system maintenance. Create AWS Glue crawlers to connect to the on-premises Oracle databases for foreign table support.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Launch Amazon EC2 instances to host the Oracle databases. Place the EC2 instances in an Auto Scaling group. Use AWS Application Migration Service to move the data from on premises to the EC2 instances and for real-time bidirectional change data capture (CDC) synchronization. Use Oracle native spatial data support. Create an AWS Lambda function to run maintenance jobs as part of an AWS Step Functions workflow. Create an internet gateway for foreign table support.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Amazon RDS for PostgreSQL DB instance. Use the AWS Schema Conversion Tool (AWS SCT) and AWS Database Migration Service (AWS DMS) to move the data from on premises to the DB instance. Use PostgreSQL native spatial data support. Run cron jobs on the DB instance for maintenance. Use AWS Direct Connect to connect the DB instance to the on-premises environment for foreign table support.",
        "isCorrect": true
      }
    ],
    "comments": "Mover algunas BD Oracle a AWS manteniendo otras on-premises (compliance); hay datos espaciales y cron jobs, y hay que consultar los sistemas on-premises directamente como foreign table.\n\nOpción A: DynamoDB no es relacional ni soporta foreign tables ni datos espaciales de Oracle.\nOpción B: Glue crawlers no proporcionan foreign tables en tiempo de consulta; mover espacial a Redshift es forzado.\nOpción C: EC2 con Oracle añade overhead operativo alto frente a un servicio gestionado.\nOpción D (Correcta): RDS for PostgreSQL (con SCT+DMS para migrar), soporte espacial nativo (PostGIS), cron en la BD y Direct Connect con foreign data wrappers permite consultar las tablas on-premises como foreign tables.\n\nReferencias:\nhttps://docs.aws.amazon.com/dms/latest/userguide/Welcome.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.PostgreSQL.CommonDBATasks.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30498,
    "questionNumber": 498,
    "question": "Accompany runs an application on Amazon EC2 and AWS Lambda. The application stores temporary data in Amazon S3. The S3 objects are deleted after 24 hours. The company deploys new versions of the application by launching AWS CloudFormation stacks. The stacks create the required resources. After validating a new version, the company deletes the old stack. The deletion of an old development stack recently failed. A solutions architect needs to resolve this issue without major architecture changes. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a Lambda function to delete objects from an S3 bucket. Add the Lambda function as a custom resource in the CloudFormation stack with a DependsOn attribute that points to the S3 bucket resource.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Modify the CloudFormation stack to attach a DeletionPolicy attribute with a value of Delete to the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Update the CloudFormation stack to add a DeletionPolicy attribute with a value of Snapshot for the S3 bucket resource",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Update the CloudFormation template to create an Amazon Elastic File System (Amazon EFS) file system to store temporary files instead of Amazon S3. Configure the Lambda functions to run in the same VPC as the EFS file system.",
        "isCorrect": false
      }
    ],
    "comments": "El borrado de un stack de CloudFormation falla porque el bucket S3 (con objetos temporales) no puede eliminarse; resolver sin grandes cambios de arquitectura.\n\nOpción A (Correcta): Una Lambda como custom resource que vacía el bucket, con DependsOn al bucket, borra los objetos antes de que CloudFormation elimine el bucket, permitiendo el delete.\nOpción B: DeletionPolicy=Delete es el comportamiento por defecto y no vacía un bucket con objetos (el delete de bucket no vacío falla).\nOpción C: DeletionPolicy=Snapshot no aplica a buckets S3.\nOpción D: Cambiar a EFS es un cambio de arquitectura mayor e innecesario.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30499,
    "questionNumber": 499,
    "question": "A company has an application that stores user-uploaded videos in an Amazon S3 bucket that uses S3 Standard storage. Users access the videos frequently in the first 180 days after the videos are uploaded. Access after 180 days is rare. Named users and anonymous users access the videos. Most of the videos are more than 100 MB in size. Users often have poor internet connectivity when they upload videos, resulting in failed uploads. The company uses multipart uploads for the videos. A solutions architect needs to optimize the S3 costs of the application. Which combination of actions will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the S3 bucket to be a Requester Pays bucket.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use S3 Transfer Acceleration to upload the videos to the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an S3 Lifecycle configuration o expire incomplete multipart uploads 7 days after initiation.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an S3 Lifecycle configuration to transition objects to S3 Glacier Instant Retrieval after 1 day.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Create an S3 Lifecycle configuration to transition objects to S3 Standard-infrequent Access (S3 Standard- IA) after 180 days.",
        "isCorrect": true
      }
    ],
    "comments": "Vídeos en S3 Standard, acceso frecuente los primeros 180 días y raro después; subidas multipart que fallan por mala conexión. OPTIMIZAR costes de S3.\n\nOpción A: Requester Pays cambia quién paga, no reduce el coste de almacenamiento del propietario.\nOpción B: Transfer Acceleration mejora la velocidad de subida pero añade coste, no lo optimiza.\nOpción C (Correcta): Una regla de ciclo de vida que expira las subidas multipart incompletas a los 7 días elimina almacenamiento huérfano de subidas fallidas, reduciendo coste.\nOpción D: Transicionar a Glacier Instant Retrieval al día 1 penaliza el acceso frecuente de los primeros 180 días.\nOpción E (Correcta): Transicionar a S3 Standard-IA tras 180 días reduce el coste del acceso poco frecuente posterior.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-configuration-examples.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/mpu-abort-incomplete-mpu-lifecycle-config.html",
    "category": "Optimización de Costes",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30500,
    "questionNumber": 500,
    "question": "A company runs an ecommerce web application on AWS. The web application is hosted as a static website on Amazon S3 with Amazon CloudFront for content delivery. An Amazon API Gateway API invokes AWS Lambda functions to handle user requests and order processing for the web application The Lambda functions store data in an Amazon ROS for MySQL DB cluster that uses On-Demand instances. The DB cluster usage has been consistent in the past 12 months. Recently, the website has experienced SQL injection and web exploit attempts. Customers also report that order processing time has increased during periods of peak usage. During these periods, the Lambda functions often have cold starts. As the company grows, the company needs to ensure scalability and low-latency access during traffic peaks. The company also must optimize the database costs and add protection against the SQL injection and web exploit attempts. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the Lambda functions to have an increased timeout value during peak periods. Use RDS Reserved Instances for the database. Use CloudFront and subscribe to AWS Shield Advanced to protect against the SQL injection and web exploit attempts.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Increase the memory of the Lambda functions, Transition to Amazon Redshift for the database. Integrate Amazon Inspector with CloudFront to protect against the SQL injection and web exploit attempts.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Lambda functions with provisioned concurrency for compute during peak periods, Transition to Amazon Aurora Serverless for the database. Use CloudFront and subscribe to AWS Shield Advanced to protect against the SQL injection and web exploit attempts.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Lambda functions with provisioned concurrency for compute during peak periods. Use RDS Reserved Instances for the database. Integrate AWS WAF with CloudFront to protect against the SQL injection and web exploit attempts.",
        "isCorrect": true
      }
    ],
    "comments": "Web estática en S3+CloudFront, API Gateway+Lambda+RDS MySQL de uso consistente; sufre SQL injection/exploits y cold starts en picos. Escalabilidad, baja latencia, OPTIMIZAR coste de BD y proteger contra inyección/exploits.\n\nOpción A: Subir el timeout no resuelve cold starts; Shield Advanced es anti-DDoS, no protege específicamente contra SQL injection como WAF.\nOpción B: Más memoria no arregla cold starts; Redshift es analítico, no OLTP; Inspector no filtra tráfico web.\nOpción C: Aurora Serverless encarece un uso CONSISTENTE frente a Reserved Instances; Shield no cubre SQL injection.\nOpción D (Correcta): Provisioned concurrency elimina cold starts en picos, RDS Reserved Instances optimizan el coste del uso consistente y AWS WAF en CloudFront bloquea SQL injection y exploits comunes.\n\nReferencias:\nhttps://docs.aws.amazon.com/waf/latest/developerguide/waf-managed-rule-groups.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30501,
    "questionNumber": 501,
    "question": "A company runs a web application on a single Amazon EC2 instance. End users experience slow application performance during times of peak usage, when CPU utilization is consistently more than 95%. A user data script installs required custom packages on the EC2 instance. The process of launching the instance takes several minutes. The company is creating an Auto Scaling group that has mixed instance groups, varied CPUs, and a maximum capacity limit. The Auto Scaling group will use a launch template for various configuration options. The company needs to decrease application latency when new instances are launched during auto scaling. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use a predictive scaling policy. Use an instance maintenance policy to run the user data script. Set the default instance warmup time to 0 seconds.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use a dynamic scaling policy. Use lifecycle hooks to run the user data script. Set the default instance warmup time to 0 seconds.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use a predictive scaling policy. Enable warm pools for the Auto Scaling group. Use an instance maintenance policy to run the user data script.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use a dynamic scaling policy. Enable warm pools for the Auto Scaling group. Use lifecycle hooks to run the user data script.",
        "isCorrect": true
      }
    ],
    "comments": "Web en una sola EC2 saturada (>95% CPU) con arranque lento por user data; se crea un ASG con grupos mixtos y launch template. DISMINUIR la latencia de la app cuando se lanzan instancias nuevas al escalar.\n\nOpción A: Instance maintenance policy no ejecuta user data para prearrancar; warmup en 0 s no ayuda al arranque lento.\nOpción B: Lifecycle hooks ayudan, pero sin warm pools cada nueva instancia sigue tardando varios minutos en instalar paquetes.\nOpción C: Predictive scaling + warm pools es bueno, pero instance maintenance policy no es el mecanismo para ejecutar user data de preparación.\nOpción D (Correcta): Dynamic scaling + warm pools mantiene instancias pre-inicializadas (paquetes ya instalados) y los lifecycle hooks ejecutan el user data antes de ponerlas en servicio, reduciendo la latencia al escalar.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30502,
    "questionNumber": 502,
    "question": "A company needs to migrate its on-premises database fleet to Amazon RDS. The company is currently using a mixture of Microsoft SQL Server, MySQL, and Oracle databases. Some of the databases have custom schemas and stored procedures. Which combination of steps should the company take for the migration? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use Migration Evaluator Quick Insights to analyze the source databases and to identify the stored procedures that need to be migrated.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Application Migration Service to analyze the source databases and to identify the stored procedures that need to be migrated.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the AWS Schema Conversion Tool (AWS SCT) to analyze the source databases for changes that are required",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use AWS Database Migration Service (AWS DMS) to migrate the source databases to Amazon RDS.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Use AWS DataSync to migrate the data from the source databases to Amazon RDS.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar una flota heterogénea on-premises (SQL Server, MySQL, Oracle) con esquemas y stored procedures a Amazon RDS. Combinación de pasos correcta.\n\nOpción A: Migration Evaluator Quick Insights es para TCO/dimensionamiento, no analiza cambios de esquema/stored procedures.\nOpción B: Application Migration Service (MGN) migra servidores enteros (rehost), no analiza esquemas de BD.\nOpción C (Correcta): AWS SCT analiza los esquemas de origen e identifica los cambios/conversiones necesarios (incluidos objetos como procedimientos).\nOpción D (Correcta): AWS DMS migra los datos de las bases de origen a Amazon RDS.\nOpción E: DataSync mueve ficheros/objetos, no realiza migración de bases de datos relacionales.\n\nReferencias:\nhttps://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html\nhttps://docs.aws.amazon.com/dms/latest/userguide/Welcome.html",
    "category": "Migración y Modernización",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30503,
    "questionNumber": 503,
    "question": "A company is migrating its blog platform to AWS. The company's on-premises servers connect to AWS through an AWS Site-to-Site VPN connection. The blog content is updated several times a day by multiple authors and is served from a file share on a network-attached storage (NAS) server. The company needs to migrate the blog platform without delaying the content updates. The company has deployed Amazon EC2 instances across multiple Availability Zones to run the blog platform behind an Application Load Balancer. The company also needs to move 200 TB of archival data from its on-premises servers to Amazon S3 as soon as possible. Which combination of stops will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a weekly cron job in Amazon EventBridge. Use the cron job to invoke an AWS Lambda function to update the EC2 instances from the NAS server.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure an Amazon Elastic Block Store (Amazon EBS) Multi-Attach volume for the EC2 instances to share for content access. Write code to synchronize the EBS volume with the NAS server weekly.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Mount an Amazon Elastic File System (Amazon EFS) file system to the on-premises servers to act as the NAS server. Copy the blog data to the EFS file system. Mount the EFS file system to the C2 instances to serve the content.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Order an AWS Snowball Edge Storage Optimized device. Copy the static data artifacts to the device. Ship the device to AWS.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Order an AWS Snowcons SSD device. Copy the static data artifacts to the device. Ship the device to AWS.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar un blog (contenido actualizado varias veces al día desde un NAS) sin retrasar las actualizaciones, con EC2 multi-AZ tras ALB, y mover 200 TB de datos de archivo a S3 CUANTO ANTES.\n\nOpción A: Un cron semanal que actualiza EC2 desde el NAS introduce retrasos en el contenido; contradice el requisito.\nOpción B: EBS Multi-Attach + sincronización semanal no da acceso compartido continuo ni evita retrasos.\nOpción C (Correcta): Montar un EFS (accesible on-premises vía VPN y desde las EC2) como almacenamiento compartido permite servir el contenido actualizado sin retrasos.\nOpción D (Correcta): Un Snowball Edge Storage Optimized transfiere los 200 TB de archivo a S3 mucho más rápido que la VPN.\nOpción E: Snowcone SSD tiene capacidad muy pequeña (TB), insuficiente para 200 TB.\n\nReferencias:\nhttps://docs.aws.amazon.com/efs/latest/ug/whatisefs.html\nhttps://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html",
    "category": "Migración y Modernización",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30504,
    "questionNumber": 504,
    "question": "A company plans to migrate a legacy on-premises application to AWS. The application is a Java web application that runs on Apache Tomcat with a PostgreSQL database. The company does not have access to the source code but can deploy the application Java Archive (JAR) files. The application has increased traffic at the end of each month. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Launch Amazon EC2 instances in multiple Availability Zones. Deploy Tomcat and PostgreSQL to all the instances by using Amazon Elastic File System (Amazon EFS) mount points. Use AWS Step Functions to deploy additional EC2 instances to scale for increased traffic.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Provision Amazon Elastic Kubernetes Service (Amazon EKS) in an Auto Scaling group across multiple AWS Regions. Deploy Tomcat and PostgreSQL in the container images. Use a Network Load Balancer to scale for increased traffic.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Refactor the Java application into Python-based containers. Use AWS Lambda functions for the application logic. Store application data in Amazon DynamoDB global tables. Use AWS Storage Gateway and Lambda concurrency to scale for increased traffic.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Elastic Beanstalk to deploy the Tomcat servers with auto scaling in multiple Availability Zones. Store application data in an Amazon RDS for PostgreSQL database. Deploy Amazon CloudFront and an Application Load Balancer to scale for increased traffic.",
        "isCorrect": true
      }
    ],
    "comments": "Migrar una app Java (Tomcat + PostgreSQL) de la que solo se tienen los JAR, con picos de tráfico a fin de mes, con el MENOR overhead operativo.\n\nOpción A: Gestionar Tomcat y PostgreSQL en EC2 con EFS y Step Functions para escalar es de alto overhead operativo.\nOpción B: EKS multi-Región con PostgreSQL en contenedores es complejo y no minimiza el esfuerzo.\nOpción C: Refactorizar a Python/Lambda es imposible sin código fuente y añade trabajo enorme.\nOpción D (Correcta): Elastic Beanstalk despliega los JAR en Tomcat con auto scaling multi-AZ (plataforma gestionada), RDS PostgreSQL gestiona la BD y CloudFront+ALB absorben los picos, con mínimo overhead.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_Java.html\nhttps://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.db.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30505,
    "questionNumber": 505,
    "question": "A company is migrating its on-premises IoT platform to AWS. The platform consists of the following components: • A MongoDB cluster as a data store for all collected and processed IoT data. • An application that uses Message Queuing Telemetry Transport (MQTT) to connect to IoT devices every 5 minutes to collect data. • An application that runs jobs periodically to generate reports from the IoT data. The jobs take 120-600 seconds to finish running. • A web application that runs on a web server. End users use the web application to generate reports that are accessible to the general public. The company needs to migrate the platform to AWS to reduce operational overhead while maintaining performance. Which combination of steps will meet these requirements with the LEAST operational overhead? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create AWS Step Functions state machines with AUS Lambda tasks to prepare the reports and to write the reports to Amazon S3. Configure an Amazon CloudFront distribution that has an S3 origin to serve the reports",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an AWS Lambda function. Program the Lambda function to connect to the IoT devices. process the data, and write the data to the data store. Configure a Lambda layer to temporarily store messages for processing.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure an Amazon Elastic Kubernetes Service (Amazon EKS) cluster with Amazon EC2 instances to prepare the reports. Create an ingress controller on the EKS cluster to serve the reports.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Connect the IoT devices to AWS IoT Core to publish messages. Create an AWS IoT rule that runs when a message is received. Configure the rule to call an AWS Lambda function. Program the Lambda function to parse, transform, and store device message data to the data store.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Migrate the MongoDB cluster to Amazon DocumentDB (with MongoDB compatibility).",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Migrate the MongoDB cluster to Amazon EC2 instances.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar una plataforma IoT (MongoDB, ingesta MQTT cada 5 min, jobs de informes de 120-600 s, web pública de informes) con el MENOR overhead operativo.\n\nOpción A (Correcta): Step Functions con tareas Lambda para generar informes y escribirlos en S3, servidos por CloudFront con origen S3, es serverless y de bajo overhead para informes públicos.\nOpción B: Una Lambda que se conecta a dispositivos y una 'Lambda layer' para almacenar mensajes es un uso incorrecto de layers y no aprovecha IoT Core.\nOpción C: EKS con EC2 para informes añade gestión de cluster; mayor overhead que Step Functions/Lambda.\nOpción D (Correcta): Conectar los dispositivos a AWS IoT Core y una IoT rule que invoca Lambda para procesar y almacenar los mensajes es el patrón gestionado nativo para MQTT.\nOpción E (Correcta): Migrar MongoDB a Amazon DocumentDB (compatible MongoDB) reduce el overhead operativo frente a autogestionar MongoDB.\nOpción F: MongoDB en EC2 mantiene todo el overhead operativo de administrar la BD.\n\nReferencias:\nhttps://docs.aws.amazon.com/iot/latest/developerguide/iot-rules.html\nhttps://docs.aws.amazon.com/documentdb/latest/developerguide/what-is.html",
    "category": "Migración y Modernización",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30506,
    "questionNumber": 506,
    "question": "A company creates an Amazon API Gateway API and shares the API with an external development team. The API uses AWS Lambda functions and is deployed to a stage that is named Production. The external development team is the sole consumer of the API. The API experiences sudden increases of usage at specific times, leading to concerns about increased costs. The company needs to limit cost and usage without reworking the Lambda functions. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the API to send requests to Amazon Simple Queue Service (Amazon SQS) queues instead of directly to the Lambda functions. Update the Lambda functions to consume messages from the queues and to process the requests. Set up the queues to invoke the Lambda functions when new messages arrive.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure provisioned concurrency for each Lambda function. Use AWS Application Auto Scaling to register the Lambda functions as targets. Set up scaling schedules to increase and decrease capacity to match changes in API usage.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an API Gateway API key and an AWS WAF Regional web ACL. Associate the web ACL with the Production stage. Add a rate-based rule to the web ACL. In the rule, specify the rate limit and a custom request aggregation that uses the X-API-Key header. Share the API key with the external development team.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an API Gateway API Key and usage plan. Define throttling limits and quotas in the usage plan. Associate the usage plan with the Production stage and the API key. Share the API key with the external development team.",
        "isCorrect": true
      }
    ],
    "comments": "Una API Gateway compartida con un equipo externo (único consumidor) sufre picos de uso que elevan costes; LIMITAR coste y uso sin rehacer las Lambdas, de la forma MÁS rentable.\n\nOpción A: Insertar SQS y reescribir las Lambdas para consumir colas es rehacer las funciones (prohibido) y añade complejidad.\nOpción B: Provisioned concurrency con auto scaling aumenta el coste base, no lo limita.\nOpción C: Una web ACL de WAF con rate-based rule por X-API-Key es más cara y compleja que el mecanismo nativo de usage plans.\nOpción D (Correcta): Una API key + usage plan con throttling y quotas asociado al stage Production limita peticiones y volumen de forma nativa, barata y sin tocar las Lambdas.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30507,
    "questionNumber": 507,
    "question": "An entertainment company hosts a ticketing service on a fleet of Linux Amazon EC2 instances that are in an Auto Scaling group. The ticketing service uses a pricing file. The pricing file is stored in an Amazon S3 bucket that has S3 Standard storage. A central pricing solution that is hosted by a third party updates the pricing file. The pricing file is updated every 1-15 minutes and has several thousand line items. The pricing file is downloaded to each EC2 instance when the instance launches. The EC2 instances occasionally use outdated pricing information that can result in incorrect charges for customers. Which solution will resolve this problem MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Lambda function to update an Amazon DynamoDB table with new prices each time the pricing file is updated. Update the ticketing service to use DynramoDB to look up pricing",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Lambda function to update an Amazon Elastic File System (Amazon EFS) file share with the pricing file each time the file is updated. Update the ticketing service to use Amazon EFS to access the pricing file.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Load Mountpoint for Amazon S3 onto the AMI of the EC2 instances. Configure Mountpoint for Amazon S3 to mount the S3 bucket that contains the pricing file. Update the ticketing service to point to the mount point and path to access the $3 object,",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an Amazon Elastic Block Store (Amazon EBS) volume. Use EBS Multi-Attach to attach the volume to every EC2 instance. When a new EC2 instance launches, configure the new instance to update the pricing file on the EBS volume. Update the ticketing service to point to the new local source.",
        "isCorrect": false
      }
    ],
    "comments": "EC2 en ASG descargan al arrancar un fichero de precios de S3 que cambia cada 1-15 min; las instancias usan precios obsoletos causando cargos incorrectos. Resolver de la forma MÁS rentable.\n\nOpción A: Lambda + DynamoDB añade una BD y cambios de la app para lookups; más coste/complejidad que leer S3 directamente.\nOpción B: EFS sincronizado por Lambda añade un sistema de ficheros y coste frente a leer directamente de S3.\nOpción C (Correcta): Montar el bucket con Mountpoint for Amazon S3 en la AMI y apuntar el servicio al fichero montado hace que cada instancia lea siempre la versión actual del objeto en S3, sin infraestructura extra y de bajo coste.\nOpción D: EBS Multi-Attach tiene restricciones (mismo AZ, tipos concretos) y no es apto para difundir un fichero que cambia continuamente entre muchas instancias.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/mountpoint.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/mountpoint-usage.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30508,
    "questionNumber": 508,
    "question": "A company has an application that uses Amazon EC2 instances in an Auto Scaling group. The quality assurance (QA) department needs to launch a large number of short-lived environments to test the application. The application environments are currently launched by the manager of the department using an AWS CloudFormation template. To launch the stack, the manager uses a role with permission to use CloudFormation, EC2, and Auto Scaling APIs. The manager wants to allow testers to launch their own environments, but does not want to grant broad permissions to each user. Which set up would achieve these goals?",
    "choices": [
      {
        "letter": "A",
        "text": "Upload the AWS CloudFormation template to Amazon S3. Give users in the QA department permission to assume the manager’s role and add a policy that restricts the permissions to the template and the resources it creates. Train users to launch the template from the CloudFormation console.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Service Catalog product from the environment template. Add a launch constraint to the product with the existing role. Give users in the QA department permission to use AWS Service Catalog APIs only. Train users to launch the template from the AWS Service Catalog console.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Upload the AWS CloudFormation template to Amazon S3. Give users in the QA department permission to use CloudFormation and S3 APIs, with conditions that restrict the permissions to the template and the resources it creates. Train users to launch the template from the CloudFormation console.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Elastic Beanstalk application from the environment template. Give users in the QA department permission to use Elastic Beanstalk permissions only. Train users to launch Elastic Beanstalk environments with the Elastic Beanstalk CLI, passing the existing role to the environment as a service role.",
        "isCorrect": false
      }
    ],
    "comments": "QA necesita lanzar muchos entornos efímeros con una plantilla CloudFormation, sin conceder permisos amplios a cada usuario. Delegar el lanzamiento de forma controlada.\n\nOpción A: Permitir que los usuarios asuman el rol del manager expone permisos amplios; restringir por plantilla es frágil.\nOpción B (Correcta): Un producto de AWS Service Catalog con launch constraint que usa el rol existente permite a QA lanzar solo mediante Service Catalog (permisos mínimos), sin darles permisos directos de CFN/EC2/ASG.\nOpción C: Dar permisos de CloudFormation y S3 con condiciones sigue siendo amplio y difícil de acotar a los recursos creados.\nOpción D: Elastic Beanstalk no reproduce la plantilla arbitraria ni el control por launch constraint de Service Catalog.\n\nReferencias:\nhttps://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html\nhttps://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30509,
    "questionNumber": 509,
    "question": "A company is using a single AWS Region for its ecommerce website. The website includes a web application that runs on several Amazon EC2 instances behind an Application Load Balancer (ALB). The website also includes an Amazon DynamoDB table. A custom domain name in Amazon Route 53 is linked to the ALB. The company created an SSL/TLS certificate in AWS Certificate Manager (ACM) and attached the certificate to the ALB. The company is not using a content delivery network as part of its design. The company wants to replicate its entire application stack in a second Region to provide disaster recovery, plan for future growth, and provide improved access time to users. A solutions architect needs to implement a solution that achieves these goals and minimizes administrative overhead. Which combination of steps should the solutions architect take to meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS CloudFormation template for the current infrastructure design. Use parameters for important system values, including Region. Use the CloudFormation template to create the new infrastructure in the second Region.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use the AWS Management Console to document the existing infrastructure design in the first Region and to create the new infrastructure in the second Region.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Update the Route 53 hosted zone record for the application to use weighted routing. Send 50% of the traffic to the ALB in each Region.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Update the Route 53 hosted zone record for the application to use latency-based routing. Send traffic to the ALB in each Region.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Update the configuration of the existing DynamoDB table by enabling DynamoDB Streams. Add the second Region to create a global table.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Create a new DynamoDB table. Enable DynamoDB Streams for the new table. Add the second Region to create a global table. Copy the data from the existing DynamoDB table to the new table as a one-time operation.",
        "isCorrect": false
      }
    ],
    "comments": "Replicar toda la pila (EC2 tras ALB, DynamoDB, Route 53, ACM) en una segunda Región para DR, crecimiento y menor tiempo de acceso, MINIMIZANDO el overhead administrativo.\n\nOpción A (Correcta): Una plantilla CloudFormation parametrizada (incluida la Región) permite recrear la infraestructura en la segunda Región de forma repetible y con bajo overhead.\nOpción B: Documentar y crear a mano por consola es propenso a errores y de alto overhead.\nOpción C: Weighted 50/50 no optimiza el tiempo de acceso por geografía como el latency-based.\nOpción D (Correcta): Latency-based routing en Route 53 envía a cada usuario al ALB de la Región de menor latencia, mejorando el tiempo de acceso.\nOpción E (Correcta): Habilitar Streams en la tabla existente y añadir la segunda Región para crear una global table replica los datos automáticamente sin migración manual.\nOpción F: Crear una tabla nueva y copiar los datos una vez es innecesario cuando se puede convertir la existente en global table.\n\nReferencias:\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30510,
    "questionNumber": 510,
    "question": "A company wants to create a single Amazon S3 bucket for its data scientists to store work-related documents. The company uses AWS IAM Identity Center to authenticate all users. A group for the data scientists was created. The company wants to give the data scientists access to only their own work. The company also wants to create monthly reports that show which documents each user accessed. Which combination of steps will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a custom IAM Identity Center permission set to grant the data scientists access to an S3 bucket prefix that matches their username tag. Use a policy to limit access to paths with the ${aws:PrincipalTag/userName}/* condition.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an IAM Identity Center role for the data scientists group that has Amazon S3 read access and write access. Add an S3 bucket policy that allows access to the IAM Identity Center role.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure AWS CloudTrail to log S3 data events and deliver the logs to an S3 bucket. Use Amazon Athena to run queries on the CloudTrail logs in Amazon S3 and generate reports.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure AWS CloudTrail to log S3 management events to CloudWatch. Use Amazon Athena’s CloudWatch connector to query the logs and generate reports.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Enable S3 access logging to EMR File System (EMRFS). Use Amazon S3 Select to query logs and generate reports.",
        "isCorrect": false
      }
    ],
    "comments": "Un único bucket S3 para científicos de datos autenticados con IAM Identity Center; cada uno debe acceder SOLO a su trabajo, y se necesitan informes mensuales de qué documentos accedió cada usuario.\n\nOpción A (Correcta): Un permission set con política que limita el acceso al prefijo del bucket que coincide con el tag de usuario (condición ${aws:PrincipalTag/userName}/*) aísla el trabajo de cada científico.\nOpción B: Un rol de grupo con acceso completo al bucket no limita a cada usuario a su propio prefijo.\nOpción C (Correcta): Registrar los data events de S3 en CloudTrail hacia un bucket y consultarlos con Athena permite generar los informes mensuales de acceso por documento y usuario.\nOpción D: Los management events no registran accesos a objetos; y no existe un conector de Athena directo a CloudWatch para esto.\nOpción E: El logging de S3 a EMRFS y S3 Select no es el mecanismo adecuado ni escalable para estos informes.\n\nReferencias:\nhttps://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/cloudtrail-logging-s3-info.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30511,
    "questionNumber": 511,
    "question": "A company hosts a data-processing application on Amazon EC2 instances. The application polls an Amazon Elastic File System (Amazon EFS) file system for newly uploaded files. When a new file is detected, the application extracts data from the file and runs logic to select a Docker container image to process the file. The application starts the appropriate container image and passes the file location as a parameter. The data processing that the container performs can take up to 2 hours. When the processing is complete, the code that runs inside the container writes the file back to Amazon EFS and exits. The company needs to refactor the application to eliminate the EC2 instances that are running the containers. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon Elastic Container Service (Amazon ECS) cluster. Configure the processing to run as AWS Fargate tasks. Extract the container selection logic to run as an Amazon EventBridge rule that starts the appropriate Fargate task. Configure the EventBridge rule to run when files are added to the EFS file system.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon Elastic Container Service (Amazon ECS) cluster. Configure the processing to run as AWS Fargate tasks. Update and containerize the container selection logic to run as a Fargate service that starts the appropriate Fargate task. Configure an EFS event notification to invoke the Fargate service when files are added to the EFS file system.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon Elastic Container Service (Amazon ECS) cluster. Configure the processing to run as AWS Fargate tasks. Extract the container selection logic to run as an AWS Lambda function that starts the appropriate Fargate task. Migrate the storage of file uploads to an Amazon S3 bucket. Update the processing code to use Amazon S3. Configure an S3 event notification to invoke the Lambda function when objects are created.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create AWS Lambda container images for the processing. Configure Lambda functions to use the container images. Extract the container selection logic to run as a decision Lambda function that invokes the appropriate Lambda processing function. Migrate the storage of file uploads to an Amazon S3 bucket. Update the processing code to use Amazon S3. Configure an S3 event notification to invoke the decision Lambda function when objects are created.",
        "isCorrect": false
      }
    ],
    "comments": "App en EC2 que sondea EFS por ficheros nuevos, elige una imagen de contenedor y la ejecuta hasta 2 h para procesar, escribiendo el resultado de vuelta. ELIMINAR las EC2 que ejecutan los contenedores.\n\nOpción A: EventBridge no puede disparar por adición de ficheros en EFS (no hay notificaciones de eventos de EFS).\nOpción B: EFS no emite notificaciones de eventos para invocar un servicio; el diseño no es viable.\nOpción C (Correcta): ECS Fargate ejecuta el procesamiento (hasta horas, sin límite de 15 min de Lambda), una Lambda de selección arranca la tarea Fargate adecuada, y migrar el almacenamiento a S3 permite disparar la Lambda con notificaciones de evento S3.\nOpción D: Las Lambdas tienen límite de 15 minutos; el procesamiento de hasta 2 h no cabe en Lambda.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30512,
    "questionNumber": 512,
    "question": "A media company has a 30-T8 repository of digital news videos. These videos are stored on tape in an on-premises tape library and referenced by a Media Asset Management (MAM) system. The company wants to enrich the metadata for these videos in an automated fashion and put them into a searchable catalog by using a MAM feature. The company must be able to search based on information in the video, such as objects, scenery items, or people’s faces. A catalog is available that contains faces of people who have appeared in the videos that include an image of each person. The company would like to migrate these videos to AWS. The company has a high-speed AWS Direct Connect connection with AWS and would like to move the MAM solution video content directly from its current file system. How can these requirements be met by using the LEAST amount of ongoing management overhead and causing MINIMAL disruption to the existing system?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up an AWS Storage Gateway, file gateway appliance on-premises. Use the MAM solution to extract the videos from the current archive and push them into the file gateway. Use the catalog of faces to build a collection in Amazon Rekognition. Build an AWS Lambda function that invokes the Rekognition Javascript SDK to have Rekognition pull the video from the Amazon S3 files backing the file gateway, retrieve the required metadata, and push the metadata into the MAM solution.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Set up an AWS Storage Gateway, tape gateway appliance on-premises. Use the MAM solution to extract the videos from the current archive and push them into the tape gateway. Use the catalog of faces to build a collection in Amazon Rekognition. Build an AWS Lambda function that invokes the Rekognition Javascript SDK to have Amazon Rekognition process the video in the tape gateway, retrieve the required metadata, and push the metadata into the MAM solution.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure a video ingestion stream by using Amazon Kinesis Video Streams. Use the catalog of faces to build a collection in Amazon Rekognition. Stream the videos from the MAM solution into Kinesis Video Streams. Configure Amazon Rekognition to process the streamed videos. Then, use a stream consumer to retrieve the required metadata, and push the metadata into the MAM solution. Configure the stream to store the videos in Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Set up an Amazon EC2 instance that runs the OpenCV libraries. Copy the videos, images, and face catalog from the on-premises library into an Amazon EBS volume mounted on this EC2 instance. Process the videos to retrieve the required metadata, and push the metadata into the MAM solution, while also copying the video files to an Amazon S3 bucket.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar 30 TB de vídeos de un tape library on-premises (referenciados por un MAM) a AWS por Direct Connect, enriquecer metadatos (objetos, escenas, caras) con el MENOR overhead y MÍNIMA disrupción del sistema actual.\n\nOpción A (Correcta): Un File Gateway on-premises permite al MAM empujar los vídeos (que quedan en S3) con mínima disrupción; Rekognition con una colección de caras procesa los vídeos desde S3 y una Lambda inyecta los metadatos en el MAM.\nOpción B: El tape gateway (VTL) es para backup en cinta; Rekognition no procesa vídeos 'en el tape gateway'.\nOpción C: Kinesis Video Streams es para streaming en vivo, no para catalogar un archivo de vídeos existentes; añade complejidad.\nOpción D: EC2 con OpenGV/OpenCV autogestionado es de alto overhead frente a Rekognition gestionado.\n\nReferencias:\nhttps://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html\nhttps://docs.aws.amazon.com/rekognition/latest/dg/video.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30513,
    "questionNumber": 513,
    "question": "A company needs to optimize the cost of an AWS environment that contains multiple accounts in an organization in AWS Organizations. The company conducted cost optimization activities 3 years ago and purchased Amazon EC2 Standard Reserved Instances that recently expired. The company needs EC2 instances for 3 more years. Additionally, the company has deployed a new serverless workload. Which strategy will provide the company with the MOST cost savings?",
    "choices": [
      {
        "letter": "A",
        "text": "Purchase the same Reserved Instances for an additional 3-year term with All Upfront payment. Purchase a 3-year Compute Savings Plan with All Upfront payment in the management account to cover any additional compute costs",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Purchase a 1-year Compute Savings Plan with No Upfront payment in each member account. Use the Savings Plans recommendations in the AWS Cost Management console to choose the Compute Savings Plan.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Purchase a 3-year EC2 Instance Savings Plan with No Upfront payment in the management account to cover EC2 costs in each AWS Region. Purchase a 3-year Compute Savings Plan with No Upfront payment in the management account to cover any additional compute costs.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Purchase a 3-year EC2 Instance Savings Plan with All Upfront payment in each member account. Use the Savings Plans recommendations in the AWS Cost Management console to choose the EC2 Instance Savings Plan.",
        "isCorrect": false
      }
    ],
    "comments": "Organización multi-cuenta; expiraron unas Reserved Instances EC2 Standard y se necesitan EC2 durante 3 años más, además de una nueva carga serverless. MÁXIMO ahorro.\n\nOpción A (Correcta): Recomprar las mismas Reserved Instances a 3 años con All Upfront (máximo descuento para carga EC2 estable y conocida) y un Compute Savings Plan a 3 años All Upfront en la cuenta de gestión para cubrir el resto de cómputo (incluido serverless) maximiza el ahorro.\nOpción B: Un Compute SP a 1 año No Upfront ofrece mucho menos descuento que 3 años All Upfront.\nOpción C: EC2 Instance SP + Compute SP a 3 años No Upfront ahorra menos que All Upfront y las RIs Standard para carga fija.\nOpción D: EC2 Instance SP All Upfront por cuenta miembro no cubre la carga serverless y es menos flexible que combinar RI + Compute SP.\n\nReferencias:\nhttps://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30514,
    "questionNumber": 514,
    "question": "A company operates a static content distribution platform that serves customers globally. The customers consume content from their own AWS accounts. The company serves its content from an Amazon S3 bucket. The company uploads the content from its on-premises environment to the S3 bucket by using an S3 File Gateway. The company wants to improve the platform’s performance and reliability by serving content from the AWS Region that is geographically closest to customers. The company must route the on-premises data to Amazon S3 with minimal latency and without public internet exposure. Which combination of steps will meet these requirements with the LEAST operational overhead? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Implement S3 Multi-Region Access Points",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use S3 Cross-Region Replication (CRR) to copy content to different Regions",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS Lambda function that tracks the routing of clients to Regions",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use an AWS Site-to-Site VPN connection to connect to a Multi-Region Access Point.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Use AWS PrivateLink and AWS Direct Connect to connect to a Multi-Region Access Point.",
        "isCorrect": true
      }
    ],
    "comments": "Distribución de contenido estático global desde S3 (subido on-premises vía S3 File Gateway); servir desde la Región más cercana y enrutar los datos on-premises a S3 con mínima latencia, SIN exposición a internet pública y con el MENOR overhead.\n\nOpción A (Correcta): S3 Multi-Region Access Points dan un único endpoint global que enruta automáticamente a la Región más cercana, con bajo overhead.\nOpción B: CRR replica contenido pero no proporciona el enrutamiento inteligente ni el endpoint único como los MRAP.\nOpción C: Una Lambda que 'rastrea' el enrutamiento de clientes es una solución manual y frágil.\nOpción D: Site-to-Site VPN pasa por internet (cifrado) y no cumple 'sin exposición pública' con la mínima latencia de Direct Connect.\nOpción E (Correcta): AWS PrivateLink + Direct Connect conecta el entorno on-premises al Multi-Region Access Point de forma privada y de baja latencia, sin internet público.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiRegionAccessPoints.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/accessing-mrap-vpc.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30515,
    "questionNumber": 515,
    "question": "A company is migrating its data center to the AWS Cloud and needs to complete the migration as quickly as possible. The company has many applications that are running on hundreds of VMware VMs in the data center. Each VM is configured with a shared Windows folder that contains common shared files. The file share is larger than 100 GB in size. The company’s compliance team requires a change request to be fled and approved for every software installation and modification to each VM. The company has an AWS Direct Connect connection with 10 GB of bandwidth between AWS and the data center. Which set of steps should the company take to complete the migration in the LEAST amount of time?",
    "choices": [
      {
        "letter": "A",
        "text": "Use VM ImporvExport to create images of each VM. Use AWS Application Migration Service to manage and view the images. Copy the Windows file share data to an Amazon Elastic File System (Amazon EFS) file system. After migration, remap the file share to the EFS file system.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy the AWS Application Discovery Service agentless appliance to VMware vCenter. Review the portfolio of discovered VMs in AWS Migration Hub.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy the AWS Application Migration Service agentless appliance to VMware vCenter. Copy the Windows file share data to a new Amazon FSx for Windows File Server file system. After migration, remap the file share on each VM to the FSx for Windows File Server file system. C. Create and review a portfolio in AWS Migration Hub. Order an AWS Snowcone device. Deploy AWS Application Migration Service to VMware vCenter and export all the VMs to the Snowcone device. Copy all Windows file share data to the Snowcone device. Ship the Snowcone device to AWS. Use Application Migration Service to deploy all the migrated instances.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Deploy the AWS Application Discovery Service Agent and the AWS Application Migration Service Agent onto each VMware hypervisor directly. Review the portfolio in AWS Migration Hub. Copy each VM’s file share data to a new Amazon FSx for Windows File Server file system. After migration, remap the file share on each VM to the FSx for Windows File Server file system.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar cientos de VMs VMware con carpetas Windows compartidas (>100 GB) lo ANTES posible, con control de cambios estricto por instalación (evitar agentes/instalaciones), sobre Direct Connect de 10 Gb.\n\nOpción A: VM Import/Export es más lento y manual; EFS es NFS/Linux, no ideal para file share Windows.\nOpción B: Solo descubre con Application Discovery Service agentless; no migra ni resuelve el file share.\nOpción C (Correcta): El appliance agentless de AWS Application Migration Service en vCenter migra sin instalar agentes en cada VM (respeta el control de cambios) y FSx for Windows File Server reemplaza el file share Windows; es lo más rápido y adecuado.\nOpción D: Instalar agentes de Discovery y MGN en cada hipervisor/VM viola la política de control de cambios y añade trabajo.\n\nReferencias:\nhttps://docs.aws.amazon.com/mgn/latest/ug/agentless-mgn.html\nhttps://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30516,
    "questionNumber": 516,
    "question": "A company has multiple AWS accounts that are in an organization in AWS Organizations. The company needs to store AWS account activity and query the data from a central location by using SQL. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS CloudTraii trail in each account. Specify CloudTrail management events for the trail. Configure CloudTrail to send the events to Amazon CloudWatch Logs. Configure CloudWatch cross-account observability. Query the data in CloudWatch Logs Insights.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use a delegated administrator account to create an AWS CloudTrail Lake data store. Specify CloudTrail management events for the data store. Enable the data store for all accounts in the organization. Query the data in CloudTrail Lake.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use a delegated administrator account to create an AWS CloudTral trail. Specify CloudTrail management events for the trail. Enable the trail for all accounts in the organization. Keep all other settings as default. Query the CloudTrail data from the CloudTrail event history page.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS CloudFormation StackSets to deploy AWS CloudTrail Lake data stores in each account. Specify CloudTrail management events for the data stores. Keep all other settings as default, Query the data in CloudTrail Lake.",
        "isCorrect": false
      }
    ],
    "comments": "Múltiples cuentas en Organizations; almacenar la actividad de las cuentas y consultarla desde un lugar CENTRAL usando SQL.\n\nOpción A: CloudWatch Logs Insights no es SQL estándar y la observabilidad cross-account es más compleja para este fin.\nOpción B (Correcta): Desde una cuenta administradora delegada, crear un CloudTrail Lake data store de eventos de gestión habilitado para toda la organización permite consultar la actividad centralizada con SQL en CloudTrail Lake.\nOpción C: El event history de CloudTrail no permite consultas SQL centralizadas ni retención larga.\nOpción D: Desplegar data stores por cuenta con StackSets fragmenta los datos y no da consulta central única.\n\nReferencias:\nhttps://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html\nhttps://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake-organization.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30517,
    "questionNumber": 517,
    "question": "A company is using AWS to develop and manage its production web application. The application includes an Amazon API Gateway HTTP API that invokes an AWS Lambda function. The Lambda function processes and then stores data in a database. The company wants to implement user authorization for the web application in an integrated way. The company already uses a third-party identity provider that issues OAuth tokens for the company’s other applications. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Integrate the company’s third-party identity provider with API Gateway. Configure an API Gateway Lambda authorizer to validate tokens from the identity provider. Require the Lambda authorizer on all API routes. Update the web application to get tokens from the identity provider and include the tokens in the Authorization header when calling the API Gateway HTTP API.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Integrate the company's third-party identity provider with AWS Directory Service. Configure Directory Service as an API Gateway authorizer to validate tokens from the identity provider. Require the Directory Service authorizer on all API routes. Configure AWS IAM Identity Center as a SAML 2.0 identity Provider. Configure the web application as a custom SAML 2.0 application.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Integrate the company’s third-party identity provider with AWS IAM Identity Center. Configure API Gateway to use IAM Identity Center for zero-configuration authentication and authorization. Update the web application to retrieve AWS Security Token Service (AWS STS) tokens from IAM Identity Center and include the tokens in the Authorization header when calling the API Gateway HTTP API.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Integrate the company’s third-party identity provider with AWS IAM Identity Center. Configure IAM users with permissions to call the API Gateway HTTP API. Update the web application to extract request parameters from the IAM users and include the parameters in the Authorization header when calling the API Gateway HTTP API.",
        "isCorrect": false
      }
    ],
    "comments": "API Gateway HTTP API + Lambda; implementar autorización de usuarios integrada con un IdP de terceros que ya emite tokens OAuth.\n\nOpción A (Correcta): Integrar el IdP de terceros con API Gateway mediante un Lambda authorizer que valida los tokens, requerirlo en todas las rutas y que la web obtenga tokens del IdP y los envíe en la cabecera Authorization es el patrón correcto.\nOpción B: Directory Service no actúa como authorizer de API Gateway para tokens OAuth; el flujo SAML descrito no aplica.\nOpción C: No existe una 'autenticación zero-config' de API Gateway con IAM Identity Center basada en STS para este caso.\nOpción D: Usar usuarios IAM para llamar a la API no integra los tokens OAuth del IdP existente.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30518,
    "questionNumber": 518,
    "question": "A company has deployed applications to thousands of Amazon EC2 instances in an AWS account. A security audit discovers that several unencrypted Amazon Elastic Block Store (Amazon EBS) volumes are attached to the EC2 instances. The company’s security policy requires the EBS volumes to be encrypted. The company needs to implement an automated solution to encrypt the EBS volumes. The solution also must prevent development teams from creating unencrypted EBS volumes. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the AWS Config managed rule that identifies unencrypted EBS volumes. Configure an automatic remediation action. Associate an AWS Systems Manager Automation runbook that includes the steps to create a new encrypted EBS volume. Create an AWS Key Management Service (AWS KMS) customer managed key. In the key policy, include a statement to deny the creation of unencrypted EBS volumes.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Systems Manager Fleet Manager to create a list of unencrypted EBS volumes, Create a Systems Manager Automation runbook that includes the steps to create a new encrypted EBS volume. Create an SCP to deny the creation of unencrypted EBS volumes.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Systems Manager Fleet Manager to create a list of unencrypted EBS volumes. Create a Systems Manager Automation runbook that includes the steps to create a new encrypted EBS volume. Modify the AWS account setting for EBS encryption to always encrypt new EBS volumes.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure the AWS Config managed rule that identifies unencrypted EBS volumes. Configure an automatic remediation action. Associate an AWS Systems Manager Automation runbook that includes the steps to create a new encrypted EBS volume. Modify the AWS account setting for EBS encryption to always encrypt new EBS volumes.",
        "isCorrect": true
      }
    ],
    "comments": "Se detectan volúmenes EBS sin cifrar; se necesita una solución AUTOMATIZADA para cifrar los existentes y PREVENIR la creación de volúmenes sin cifrar.\n\nOpción A: Denegar creación mediante una key policy de KMS no es el mecanismo correcto para impedir volúmenes sin cifrar a nivel de cuenta.\nOpción B: Fleet Manager no lista volúmenes sin cifrar de este modo; un SCP es viable pero la remediación automática de Config es más directa aquí.\nOpción C: Fleet Manager no es la herramienta de inventario adecuada para esto.\nOpción D (Correcta): La regla gestionada de AWS Config detecta volúmenes sin cifrar y remedia automáticamente con un runbook de Systems Manager que crea un volumen cifrado; además, activar el ajuste de cuenta 'EBS encryption by default' impide crear nuevos volúmenes sin cifrar.\n\nReferencias:\nhttps://docs.aws.amazon.com/config/latest/developerguide/encrypted-volumes.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#encryption-by-default",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30519,
    "questionNumber": 519,
    "question": "A company is running a large containerized workload in the AWS Cloud. The workload consists of approximately 100 different services. The company uses Amazon Elastic Container Service (Amazon ECS) to orchestrate the workload. Recently the company’s development team started using AWS Fargate instead of Amazon EC2 instances in the ECS cluster. In the past, the workload has come close to running the maximum number of EC2 instances that are available in the account. The company is worried that the workload could reach the maximum number of ECS tasks that are allowed. A solutions architect must implement a solution that will notify the development team when Fargate reaches 80% of the maximum number of tasks. What should the solutions architect do to meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon CloudWatch to monitor the Sample Count statistic for each service in the ECS cluster. Set an alarm for when the math expression sample count/SERVICE_QUOTA(service)*100 is greater than 80. Notify the development team by using Amazon Simple Notification Service (Amazon SNS).",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon CloudWatch to monitor service quotas that are published under the AWS/Usage metric namespace. Set an alarm for when the math expression metric/SERVICE_QUOTA(metric)*100 is greater than 80. Notify the development team by using Amazon Simple Notification Service (Amazon SNS).",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an AWS Lambda function to poll detailed metrics from the ECS cluster. When the number of running Fargate tasks is greater than 80, invoke Amazon Simple Email Service (Amazon SES) to notify the development team.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Config rule to evaluate whether the Fargate SERVICE_QUOTA is greater than 80. Use Amazon Simple Email Service (Amazon SES) to notify the development team when the AWS Config rule is not compliant.",
        "isCorrect": false
      }
    ],
    "comments": "Workload con ~100 servicios en ECS que empezó a usar Fargate; NOTIFICAR al equipo cuando Fargate alcance el 80% del máximo de tareas permitidas.\n\nOpción A: El Sample Count por servicio no representa el uso frente a la cuota de tareas Fargate de la cuenta.\nOpción B (Correcta): CloudWatch expone métricas de uso frente a cuotas en el namespace AWS/Usage; una alarma con la expresión metric/SERVICE_QUOTA(metric)*100 > 80 notifica por SNS al superar el 80%.\nOpción C: Una Lambda que sondea 'tasks > 80' compara contra un número absoluto, no contra la cuota; frágil.\nOpción D: AWS Config no evalúa cuotas de servicio de este modo.\n\nReferencias:\nhttps://docs.aws.amazon.com/servicequotas/latest/userguide/configure-cloudwatch.html\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Service-Quota-Integration.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30520,
    "questionNumber": 520,
    "question": "A company has several AWS Lambda functions written in Python. The functions are deployed with the .zip package deployment type. The functions use a Lambda layer that contains common libraries and packages in a .zip file. The Lambda .zip packages and Lambda layer .zip file are stored in an Amazon S3 bucket. The company must implement automatic scanning of the Lambda functions and the Lambda layer to identify CVEs. A subset of the Lambda functions must receive automated code scans to detect potential data leaks and other vulnerabilities. The code scans must occur only for selected Lambda functions, not all the Lambda functions. Which combination of actions will meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Activate Amazon Inspector. Start automated CVE scans.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Activate Lambda standard scanning and Lambda code scanning in Amazon Inspector.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Enable Amazon GuardDuty. Enable the Lambda Protection feature in GuardDuty.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Enable scanning in the Monitor settings of the Lambda functions that need code scans.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Tag Lambda functions that do not need code scans. In the tag, include a key of InspectorCodeExclusion and a value of LambdaCodeScanning.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Use Amazon Inspector to scan the 3 bucket that contains the Lambda .zip packages and the Lambda layer .zip file for code scans.",
        "isCorrect": false
      }
    ],
    "comments": "Lambdas Python (.zip) y una Lambda layer; escanear automáticamente funciones y layer por CVEs, y aplicar escaneo de CÓDIGO solo a un SUBCONJUNTO de funciones (no todas).\n\nOpción A (Correcta): Activar Amazon Inspector e iniciar los escaneos automáticos de CVE cubre las funciones y la layer.\nOpción B: El 'Lambda code scanning' de Inspector se activa a nivel de servicio, pero por sí solo no permite la exclusión selectiva; se gestiona con etiquetado (ver E).\nOpción C: GuardDuty Lambda Protection detecta actividad maliciosa en tiempo de ejecución, no escaneo de CVEs/código.\nOpción D (Correcta): Habilitar el escaneo en los ajustes de Monitor de las funciones que sí necesitan code scan permite dirigir el escaneo de código al subconjunto deseado.\nOpción E (Correcta): Etiquetar con clave InspectorCodeExclusion y valor LambdaCodeScanning las funciones que NO deben escanearse las excluye del code scanning.\nOpción F: Inspector no escanea el bucket S3 con los .zip como método de code scan de Lambda.\n\nReferencias:\nhttps://docs.aws.amazon.com/inspector/latest/user/scanning-lambda.html\nhttps://docs.aws.amazon.com/inspector/latest/user/lambda-code-scan-exclusion.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30521,
    "questionNumber": 521,
    "question": "A company is changing the way that it handles patching of Amazon EC2 instances in its application account. The company currently patches instances over the internet by using a NAT gateway in a VPC in the application account. The company has EC2 instances set up as a patch source repository in a dedicated private VPC in a core account. The company wants to use AWS Systems Manager Patch Manager and the patch source repository in the core account to patch the EC2 instances in the application account. The company must prevent all EC2 instances in the application account from accessing the internet. The EC2 instances in the application account need to access Amazon S3, where the application data is stored. These EC2 instances need connectivity to Systems Manager and to the patch source repository in the private VPC in the core account. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a network ACL that blocks outbound traffic on port 80. Associate the network ACL with all subnets in the application account. In the application account and the core account, deploy one EC2 instance that runs a custom VPN server. Create a VPN tunnel to access the private VPC. Update the route table in the application account.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create private VIFs for Systems Manager and Amazon S3. Delete the NAT gateway from the VPC in the application account. Create a transit gateway to access the patch source repository EC2 instances in the core account. Update the route table in the core account.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create VPC endpoints for Systems Manager and Amazon S3. Delete the NAT gateway from the VPC in the application account. Create a VPC peering connection to access the patch source repository EC2 instances in the core account. Update the route tables in both accounts.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create a network ACL that blocks inbound traffic on port 80. Associate the network ACL with all subnets in the application account. Create a transit gateway to access the patch source repository EC2 instances in the core account. Update the route tables in both accounts.",
        "isCorrect": false
      }
    ],
    "comments": "Parchear EC2 de una cuenta de aplicación usando Patch Manager y un repositorio de parches en una VPC privada de la cuenta core, SIN acceso a internet, pero con acceso a S3, Systems Manager y al repositorio de la cuenta core.\n\nOpción A: VPN casera en EC2 y NACL en puerto 80 es complejo, frágil y de alto mantenimiento.\nOpción B: Los private VIFs son de Direct Connect (on-premises), no el mecanismo para acceder a S3/SSM sin internet dentro de AWS.\nOpción C (Correcta): VPC endpoints para Systems Manager y S3 dan acceso privado a esos servicios, eliminar el NAT gateway corta internet, y un VPC peering con la VPC core (con rutas en ambas cuentas) alcanza el repositorio de parches.\nOpción D: Una NACL de entrada en puerto 80 no impide la salida a internet; el enfoque no cumple los requisitos de acceso privado.\n\nReferencias:\nhttps://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html\nhttps://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30522,
    "questionNumber": 522,
    "question": "A company in the United States (US) has acquired a company in Europe. Both companies use the AWS Cloud. The US company has built a new application with a microservices architecture. The US company is hosting the application across five VPCs in the us-east-2 Region. The application must be able to access resources in one VPC in the eu-west-1 Region. However, the application must not be able to access any other VPCs. The VPCs in both Regions have no overlapping CIDR ranges. All accounts are already consolidated in one organization in AWS Organizations. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Create one transit gateway in eu-west-1. Attach the VPCs in us-east-2 and the VPC in eu-west-1 to the transit gateway. Create the necessary route entries in each VPC so that the traffic is routed through the transit gateway.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create one transit gateway in each Region. Attach the involved subnets to the regional transit gateway. Create the necessary route entries in the associated route tables for each subnet so that the traffic is routed through the regional transit gateway. Peer the two transit gateways.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a full mesh VPC peering connection configuration between all the VPCs. Create the necessary route entries in each VPC so that the traffic is routed through the VPC peering connection.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create one VPC peering connection for each VPC in us-east-2 to the VPC in eu-west-1. Create the necessary route entries in each VPC so that the traffic is routed through the VPC peering connection.",
        "isCorrect": true
      }
    ],
    "comments": "App con 5 VPCs en us-east-2 debe acceder a UNA VPC en eu-west-1 y a ninguna otra; CIDRs sin solape, todas las cuentas en una Organización. MÁS rentable.\n\nOpción A: Un solo Transit Gateway no conecta VPCs de dos Regiones distintas directamente (es regional).\nOpción B: Dos Transit Gateways peered funcionan, pero para solo 5+1 VPCs es más caro (horas de TGW y attachments) que el peering directo.\nOpción C: Un full mesh entre todas las VPCs crea conectividad no deseada (viola 'ninguna otra') y más conexiones.\nOpción D (Correcta): Una VPC peering inter-Región desde cada una de las 5 VPCs de us-east-2 a la VPC de eu-west-1 da exactamente la conectividad requerida al menor coste (sin cargos horarios de TGW).\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html\nhttps://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30523,
    "questionNumber": 523,
    "question": "A travel company built a web application that uses Amazon Simple Email Service (Amazon SES) to send email notifications to users. The company needs to enable logging to help troubleshoot email delivery issues. The company also needs the ability to do searches that are based on recipient, subject, and time sent. Which combination of steps should a solutions architect take to meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon SES configuration set with Amazon Data Firehose as the destination. Choose to send logs to an Amazon S3 bucket.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Enable AWS CloudTrail logging. Specify an Amazon S3 bucket as the destination for the logs.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon Athena to query the logs in the Amazon S3 bucket for recipient, subject, and time sent.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an Amazon CloudWatch log group. Configure Amazon SES to send logs to the log group.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Use Amazon Athena to query the logs in Amazon CloudWatch for recipient, subject, and time sent.",
        "isCorrect": false
      }
    ],
    "comments": "App que usa Amazon SES para notificaciones; habilitar logging para diagnosticar entrega y poder BUSCAR por destinatario, asunto y hora de envío.\n\nOpción A (Correcta): Un configuration set de SES con destino Amazon Data Firehose que entrega los logs de eventos a un bucket S3 captura los eventos de envío/entrega con sus atributos.\nOpción B: CloudTrail registra llamadas de API de administración, no los eventos de entrega de correos ni sus asuntos/destinatarios.\nOpción C (Correcta): Amazon Athena consulta los logs en S3 para buscar por destinatario, asunto y hora de envío.\nOpción D: SES no envía este tipo de logs de eventos directamente a un log group de CloudWatch con esos campos consultables para el objetivo pedido de forma tan directa como Firehose->S3->Athena.\nOpción E: No se pueden ejecutar consultas de Athena directamente sobre logs en CloudWatch.\n\nReferencias:\nhttps://docs.aws.amazon.com/ses/latest/dg/monitor-using-event-publishing.html\nhttps://docs.aws.amazon.com/athena/latest/ug/what-is.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30524,
    "questionNumber": 524,
    "question": "A company migrated to AWS and uses AWS Business Support. The company wants to monitor the cost-effectiveness of Amazon EC2 instances across AWS accounts. The EC2 instances have tags for department, business unit, and environment. Development EC2 instances have high cost but low utilization. The company needs to detect and stop any underutilized development EC2 instances. Instances are underutilized if they had 10% or less average daily CPU utilization and 5 MB or less network I/O for at least 4 of the past 14 days. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure Amazon CloudWatch dashboards to monitor EC2 instance utilization based on tags for department, business unit, and environment. Create an Amazon EventBridge rule that invokes an AWS Lambda function to stop underutilized development EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure AWS Systems Manager to track EC2 instance utilization and report underutilized instances to Amazon CloudWatch. Filter the CloudWatch data by tags for department, business unit, and environment. Create an Amazon EventBridge rule that invokes an AWS Lambda function to stop underutilized development EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon EventBridge rule to detect low utilization of EC2 instances reported by AWS Trusted Advisor. Configure the rule to invoke an AWS Lambda function that filters the data by tags for department, business unit, and environment and stops underutilized development EC2 instances.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an AWS Lambda function to run daily to retrieve utilization data for all EC2 instances. Save the data to an Amazon DynamoDB table. Create an Amazon QuickSight dashboard that uses the DynamoDB table as a data source to identify and stop underutilized development EC2 instances.",
        "isCorrect": false
      }
    ],
    "comments": "Con AWS Business Support, monitorizar la eficiencia de coste de EC2 (tags dept/BU/env) y DETENER instancias de desarrollo infrautilizadas (<=10% CPU y <=5 MB I/O al menos 4 de los últimos 14 días), con el MENOR overhead.\n\nOpción A: Construir dashboards de CloudWatch para replicar esa lógica de 14 días es trabajo manual considerable.\nOpción B: Systems Manager no calcula por defecto esa métrica de infrautilización de 14 días; añade complejidad.\nOpción C (Correcta): Trusted Advisor (disponible con Business Support) ya identifica 'Low Utilization Amazon EC2 Instances' con exactamente ese criterio; una regla de EventBridge dispara una Lambda que filtra por tags y detiene las de desarrollo, con mínimo overhead.\nOpción D: Recolectar datos a diario con Lambda+DynamoDB+QuickSight reimplementa lo que Trusted Advisor ya da.\n\nReferencias:\nhttps://docs.aws.amazon.com/awssupport/latest/user/cost-optimization-checks.html\nhttps://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-events-ta.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30525,
    "questionNumber": 525,
    "question": "A company is hosting an application on AWS for a project that will run for the next 3 years. The application consists of 20 Amazon EC2 On-Demand Instances that are registered in a target group for a Network Load Balancer (NLB). The instances are spread across two Availability Zones. The application is stateless and runs 24 hours a day, 7 days a week. The company receives reports from users who are experiencing slow responses from the application. Performance metrics show that the instances are at 10% CPU utilization during normal application use. However, the CPU utilization increases to 100% at busy times, which typically last for a few hours. The company needs a new architecture to resolve the problem of slow responses from the application. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Auto Scaling group. Attach the Auto Scaling group to the target group of the NLB. Set the minimum capacity to 20 and the desired capacity to 28. Purchase Reserved Instances for 20 instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a Spot Fleet that has a request type of request. Set the TotalTargetCapacity parameter to 20. Set the DefaultTargetCapacityType parameter to On-Demand. Specify the NLB when creating the Spot Fleet.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a Spot Fleet that has a request type of maintain. Set the TotalTargetCapacity parameter to 20. Set the DefaultTargetCapacityType parameter to Spot. Replace the NLB with an Application Load Balancer.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Auto Scaling group. Attach the Auto Scaling group to the target group of the NLB. Set the minimum capacity to 4 and the maximum capacity to 28. Purchase Reserved Instances for four instances.",
        "isCorrect": true
      }
    ],
    "comments": "App stateless 24/7 durante 3 años en 20 EC2 On-Demand tras un NLB; 10% CPU normal y 100% en picos de pocas horas causando lentitud. Resolver de la forma MÁS rentable.\n\nOpción A: Mínimo 20 y deseada 28 con RIs para 20 sobredimensiona la base (no baja de 20 aunque se use el 10%); poco eficiente.\nOpción B: Spot Fleet 'request' de tipo On-Demand no auto-escala ni ahorra respecto al problema.\nOpción C: Spot para toda la capacidad arriesga la disponibilidad de una app crítica (interrupciones).\nOpción D (Correcta): Un Auto Scaling group (min 4, max 28) escala en los picos y baja a 4 en horas valle; comprar RIs solo para las 4 instancias base cubre la carga constante al mejor coste sin sacrificar disponibilidad.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30526,
    "questionNumber": 526,
    "question": "Accompany is building an application to collect and transmit sensor data from a factory. The application will use AWS IoT Core to send data from hundreds of devices to an Amazon S3 data lake. The company must enrich the data before loading the data into Amazon S3. The application will transmit the sensor data every 5 seconds. New sensor data must be available in Amazon S3 less than 30 minutes after the application collects the data. No other applications are processing the sensor data from AWS IoT Core. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a topic in AWS IoT Core to ingest the sensor data. Create an AWS Lambda function to enrich the data and to write the data to Amazon S3. Configure an AWS IoT rule action to invoke the Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS IoT Core Basic Ingest to ingest the sensor data. Configure an AWS IoT rule action to write the data to Amazon Kinesis Data Firehose. Set the Kinesis Data Firehose buffering interval to 900 seconds. Use Kinesis Data Firehose to invoke an AWS Lambda function to enrich the data, Configure Kinesis Data Firehose to deliver the data to Amazon S3.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a topic in AWS IoT Core to ingest the sensor data. Configure an AWS IoT rule action to send the data to an Amazon Timestream table. Create an AWS Lambda, function to read the data from Timestream. Configure the Lambda function to enrich the data and to write the data to Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS loT Core Basic Ingest to ingest the sensor data. Configure an AWS IoT rule action to write the data to Amazon Kinesis Data Streams. Create a consumer AWS Lambda function to process the data from Kinesis Data Streams and to enrich the data. Call the S3 PutObject API operation from the Lambda function to write the data to Amazon S3.",
        "isCorrect": false
      }
    ],
    "comments": "IoT Core recibe datos de sensores cada 5 s de cientos de dispositivos; ENRIQUECER antes de cargar en un data lake S3, con disponibilidad en S3 en <30 min y sin otros consumidores. MÁS rentable.\n\nOpción A: Una IoT rule que invoca Lambda por cada mensaje y escribe a S3 genera muchísimas invocaciones y muchos objetos pequeños; menos rentable que agrupar con Firehose.\nOpción B (Correcta): Basic Ingest (más barato, sin motor de reglas de pub/sub) con una IoT rule action a Kinesis Data Firehose (buffer 900 s = 15 min, cumple <30 min), Firehose invoca Lambda para enriquecer y entrega a S3 en lotes: rentable y con menos objetos.\nOpción C: Timestream + Lambda añade una base de datos de series temporales innecesaria y más coste.\nOpción D: Kinesis Data Streams + Lambda consumidora que hace PutObject por registro añade gestión de shards y objetos pequeños; más caro que Firehose para este caso.\n\nReferencias:\nhttps://docs.aws.amazon.com/iot/latest/developerguide/iot-basic-ingest.html\nhttps://docs.aws.amazon.com/firehose/latest/dev/data-transformation.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30527,
    "questionNumber": 527,
    "question": "A company is collecting data from a large set of IoT devices. The data is stored in an Amazon S3 data lake. Data scientists perform analytics on Amazon EC2 instances that run in two public subnets in a VPC in a separate AWS account. The data scientists need access to the data lake from the EC2 instances. The EC2 instances already have an assigned role with permissions to access Amazon S3. According to company policies, only authorized networks are allowed to have access to the IoT data. Which combination of steps should a solutions architect take to meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a gateway VPC endpoint for Amazon S3 in the data scientists’ VPC.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an S3 access point in the data scientists' AWS account for the data lake.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Update the EC2 instance role. Add a policy with a condition that allows the s3:GetObject action when the value for the s3:DataAccessPointArn condition key is a valid access point ARN.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Update the VPC route table to route S3 traffic to an S3 access point.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Add an S3 bucket policy with a condition that allows the s3:GetObject action when the value for the s3:DataAccessPointArn condition key is a valid access point ARN.",
        "isCorrect": true
      }
    ],
    "comments": "Científicos de datos en EC2 (subredes públicas, otra cuenta AWS) necesitan acceder al data lake S3; solo redes autorizadas pueden acceder a los datos IoT. Combinación de pasos.\n\nOpción A (Correcta): Un gateway VPC endpoint para S3 en la VPC de los científicos permite acceso privado a S3 y aporta el vpce-id usable en condiciones de política (red autorizada).\nOpción B: Un S3 access point en la cuenta de los científicos no controla por sí mismo el acceso desde redes autorizadas al data lake.\nOpción C: Modificar el rol de la EC2 con condición de access point no es lo que restringe por red; el rol ya tiene permisos de S3.\nOpción D: No se enruta 'a un access point' por route table; los access points no funcionan así.\nOpción E (Correcta): Una bucket policy con condición que permita s3:GetObject solo desde el VPC endpoint/red autorizada (p. ej. aws:sourceVpce) restringe el acceso a las redes permitidas.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies-vpc-endpoint.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30528,
    "questionNumber": 528,
    "question": "A company wants to migrate its website to AWS. The website uses containers that are deployed in an on-premises, self-managed Kubernetes cluster. All data for the website is stored in an on-premises PostgreSQL database. The company has decided to migrate the on-premises Kubernetes cluster to an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. The EKS cluster will use EKS managed node groups with a static number of nodes. The company will also migrate the on-premises database to an Amazon RDS for PostgreSQL database. A solutions architect needs to estimate the total cost of ownership (TCO) for this workload before the migration. Which solution will provide the required TCO information?",
    "choices": [
      {
        "letter": "A",
        "text": "Request access to Migration Evaluator. Run the Migration Evaluator Collector and import the data. Configure a scenario. Export a Quick Insights report from Migration Evaluator.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Launch AWS Database Migration Service (AWS DMS) for the on-premises database. Generate an assessment report. Create an estimate in AWS Pricing Calculator for the costs of the EKS migration.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Initialize AWS Application Migration Service. Add the on-premises servers as source servers. Launch a test instance. Output a TCO report from Application Migration Service.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Access the AWS Cloud Economics Center webpage to assess the AWS Cloud Value Framework. Create an AWS Cost and Usage report from the Cloud Value Framework.",
        "isCorrect": false
      }
    ],
    "comments": "Estimar el TCO antes de migrar un Kubernetes on-premises a EKS (node groups estáticos) y una PostgreSQL a RDS.\n\nOpción A (Correcta): Migration Evaluator con su Collector recopila el uso real on-premises, permite configurar un escenario y exportar un informe Quick Insights con la estimación de TCO, que es exactamente lo pedido.\nOpción B: DMS migra datos y genera reportes de assessment de esquema, no un TCO del conjunto; combinar con Pricing Calculator manual es más trabajoso e impreciso.\nOpción C: Application Migration Service (MGN) no produce un informe de TCO.\nOpción D: El Cloud Value Framework es material conceptual; no genera un TCO a partir de un CUR (que además requiere ya estar en AWS).\n\nReferencias:\nhttps://docs.aws.amazon.com/migrationhub-strategy/latest/userguide/migration-evaluator.html\nhttps://aws.amazon.com/migration-evaluator/",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30529,
    "questionNumber": 529,
    "question": "An events company runs a ticketing platform on AWS. The company’s customers configure and schedule their events on the platform. The events result in large increases of traffic to the platform. The company knows the date and time of each customer’s events. The company runs the platform on an Amazon Elastic Container Service (Amazon ECS) cluster. The ECS cluster consists of Amazon EC2 On-Demand Instances that are in an Auto Scaling group. The Auto Scaling group uses a predictive scaling policy. The ECS cluster makes frequent requests to an Amazon S3 bucket to download ticket assets. The ECS cluster and the S3 bucket are in the same AWS Region and the same AWS account. Traffic between the ECS cluster and the S3 bucket flows across a NAT gateway. The company needs to optimize the cost of the platform without decreasing the platform's availability. Which combination of steps will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a gateway VPC endpoint for the S3 bucket.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Add another ECS capacity provider that uses an Auto Scaling group of Spot Instances. Configure the new capacity provider strategy to have the same weight as the existing capacity provider strategy.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create On-Demand Capacity Reservations for the applicable instance type for the time period of the scheduled scaling policies.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Enable S3 Transfer Acceleration on the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Replace the predictive scaling policy with scheduled scaling policies for the scheduled events.",
        "isCorrect": true
      }
    ],
    "comments": "Plataforma de tickets en ECS (EC2 On-Demand en ASG con predictive scaling) con picos en fechas/horas CONOCIDAS; el tráfico a S3 pasa por un NAT gateway. OPTIMIZAR coste sin reducir disponibilidad.\n\nOpción A (Correcta): Un gateway VPC endpoint para S3 elimina el tráfico a S3 a través del NAT gateway (que cobra por datos procesados), reduciendo costes sin afectar disponibilidad.\nOpción B: Añadir Spot puede reducir coste pero introduce riesgo de interrupción que puede afectar disponibilidad en picos.\nOpción C: On-Demand Capacity Reservations garantizan capacidad pero no reducen coste (se pagan igual).\nOpción D: Transfer Acceleration añade coste y es para subidas por internet, no aplica al tráfico interno a S3.\nOpción E (Correcta): Como las fechas/horas de los eventos son conocidas, sustituir el predictive scaling por scheduled scaling ajusta la capacidad exactamente a los eventos programados, optimizando coste sin perder disponibilidad.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scheduled-scaling.html",
    "category": "Optimización de Costes",
    "multiSelect": true,
    "requiredCount": 2
  }
];
