import { Question } from '../../types';

export const QUESTIONS_PART_1: Question[] = [
  {
    "id": 30001,
    "questionNumber": 1,
    "question": "A company needs to architect a hybrid DNS solution. This solution will use an Amazon Route 53 private hosted zone for the domain cloud.example.com for the resources stored within VPCs. The company has the following DNS resolution requirements: On-premises systems should be able to resolve and connect to cloud.example.com. All VPCs should be able to resolve cloud.example.com. There is already an AWS Direct Connect connection between the on-premises corporate network and AWS Transit Gateway. Which architecture should the company use to meet these requirements with the HIGHEST performance?",
    "choices": [
      {
        "letter": "A",
        "text": "Associate the private hosted zone to all the VPCs. Create a Route 53 inbound resolver in the shared services VPC. Attach all VPCs to the transit gateway and create forwarding rules in the on-premises DNS server for cloud.example.com that point to the inbound resolver.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Associate the private hosted zone to all the VPCs. Deploy an Amazon EC2 conditional forwarder in the shared services VPC. Attach all VPCs to the transit gateway and create forwarding rules in the on-premises DNS server for cloud.example.com that point to the conditional forwarder.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Associate the private hosted zone to the shared services VPCreate a Route 53 outbound resolver in the shared services VPAttach all VPCs to the transit gateway and create forwarding rules in the on-premises DNS server for cloud.example.com that point to the outbound resolver.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Associate the private hosted zone to the shared services VPC. Create a Route 53 inbound resolver in the shared services VPC. Attach the shared services VPC to the transit gateway and create forwarding rules in the on-premises DNS server for cloud.example.com that point to the inbound resolver.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A (Correcta): Para resolución DNS híbrida de MÁXIMO rendimiento se asocia la private hosted zone (PHZ) a TODAS las VPC (una PHZ solo la resuelven las VPC asociadas) y se crea un Route 53 Resolver INBOUND endpoint en la VPC de servicios compartidos; el servidor DNS on-premises reenvía cloud.example.com a las IPs del inbound endpoint. Con Direct Connect/Transit Gateway y el Resolver gestionado es la ruta de mayor rendimiento.\n\nOpción B: Un conditional forwarder en EC2 añade un servidor autogestionado (latencia, mantenimiento, punto único de fallo) frente al Resolver gestionado.\n\nOpción C: Un OUTBOUND resolver sirve para que las VPC consulten HACIA on-premises (lo contrario de lo pedido) y asocia la PHZ solo a una VPC.\n\nOpción D: Usa inbound resolver pero asocia la PHZ y adjunta al TGW solo la VPC de servicios compartidos, dejando al resto de VPC sin resolución.\n\nReferencias:\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-inbound-queries.html\nhttps://docs.aws.amazon.com/whitepapers/latest/hybrid-cloud-dns-options-for-vpc/route-53-resolver-endpoints-and-forwarding-rules.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30002,
    "questionNumber": 2,
    "question": "A company is providing weather data over a REST-based API to several customers. The API is hosted by Amazon API Gateway and is integrated with different AWS Lambda functions for each API operation. The company uses Amazon Route 53 for DNS and has created a resource record of weather.example.com. The company stores data for the API in Amazon DynamoDB tables. The company needs a solution that will give the API the ability to fail over to a different AWS Region. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy a new set of Lambda functions in a new Region. Update the API Gateway API to use an edge-optimized API endpoint with Lambda functions from both Regions as targets. Convert the DynamoDB tables to global tables.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy a new API Gateway API and Lambda functions in another Region. Change the Route 53 DNS record to a multivalue answer. Add both API Gateway APIs to the answer. Enable target health monitoring. Convert the DynamoDB tables to global tables.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy a new API Gateway API and Lambda functions in another Region. Change the Route 53 DNS record to a failover record. Enable target health monitoring. Convert the DynamoDB tables to global tables.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Deploy a new API Gateway API in a new Region. Change the Lambda functions to global functions. Change the Route 53 DNS record to a multivalue answer. Add both API Gateway APIs to the answer. Enable target health monitoring. Convert the DynamoDB tables to global tables.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Un endpoint edge-optimized de API Gateway sigue anclado a una sola Región; no aporta failover regional real y objetivos Lambda 'de ambas Regiones' no es un modelo de integración válido.\n\nOpción B: Un registro multivalue de Route 53 reparte/balancea tráfico devolviendo varias respuestas sanas, no es failover activo-pasivo.\n\nOpción C (Correcta): El patrón recomendado por AWS para failover regional de una API: desplegar API Gateway + Lambda en una segunda Región, usar un registro Route 53 de tipo FAILOVER con health checks (target health monitoring) y convertir las tablas DynamoDB en global tables para replicar los datos. Es el esquema documentado de DNS failover multi-Región para API Gateway.\n\nOpción D: No existen 'Lambda functions globales' y usa multivalue (balanceo, no failover). Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/disaster-recovery-resiliency.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30003,
    "questionNumber": 3,
    "question": "A company uses AWS Organizations with a single OU named Production to manage multiple accounts. All accounts are members of the Production OU. Administrators use deny list SCPs in the root of the organization to manage access to restricted services. The company recently acquired a new business unit and invited the new unit’s existing AWS account to the organization. Once onboarded, the administrators of the new business unit discovered that they are not able to update existing AWS Config rules to meet the company’s policies. Which option will allow administrators to make changes and continue to enforce the current policies without introducing additional long-term maintenance?",
    "choices": [
      {
        "letter": "A",
        "text": "Remove the organization’s root SCPs that limit access to AWS Config. Create AWS Service Catalog products for the company’s standard AWS Config rules and deploy them throughout the organization, including the new account.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a temporary OU named Onboarding for the new account. Apply an SCP to the Onboarding OU to allow AWS Config actions. Move the new account to the Production OU when adjustments to AWS Config are complete.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Convert the organization’s root SCPs from deny list SCPs to allow list SCPs to allow the required services only. Temporarily apply an SCP to the organization’s root that allows AWS Config actions for principals only in the new account.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a temporary OU named Onboarding for the new account. Apply an SCP to the Onboarding OU to allow AWS Config actions. Move the organization’s root SCP to the Production OU. Move the new account to the Production OU when adjustments to AWS Config are complete.",
        "isCorrect": true
      }
    ],
    "comments": "Nota: la respuesta más votada por la comunidad (B) es INCORRECTA según la lógica de evaluación de SCP de AWS. La documentación oficial (Scenario 6) confirma que un Deny en un SCP de nivel superior (root) NO puede anularse con un Allow en un OU inferior: el Deny prevalece y se hereda hacia abajo.\n\nOpción A: Eliminar los SCP deny del root abre AWS Config en TODA la organización (riesgo de seguridad y pérdida de la política). No cumple 'seguir aplicando las políticas'.\n\nOpción B (Descartada pese a ser la más votada): Un OU Onboarding con un SCP que 'permite' AWS Config no funciona porque el deny del root sigue aplicándose a ese OU y bloquea Config.\n\nOpción C: Convertir de deny-list a allow-list obliga a reescribir toda la estrategia de SCP (alto mantenimiento a largo plazo) y es propenso a errores.\n\nOpción D (Correcta): Crear un OU temporal Onboarding con un SCP que permite AWS Config y MOVER el SCP restrictivo del root al OU Production. Al quitar el deny del root, el OU Onboarding deja de heredarlo y se pueden actualizar las reglas de Config; el resto de cuentas siguen protegidas bajo Production. Al terminar, la cuenta se mueve a Production, sin mantenimiento extra.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_evaluation.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30004,
    "questionNumber": 4,
    "question": "A company is running a two-tier web-based application in an on-premises data center. The application layer consists of a single server running a stateful application. The application connects to a PostgreSQL database running on a separate server. The application’s user base is expected to grow significantly, so the company is migrating the application and database to AWS. The solution will use Amazon Aurora PostgreSQL, Amazon EC2 Auto Scaling, and Elastic Load Balancing. Which solution will provide a consistent user experience that will allow the application and database tiers to scale?",
    "choices": [
      {
        "letter": "A",
        "text": "Enable Aurora Auto Scaling for Aurora Replicas. Use a Network Load Balancer with the least outstanding requests routing algorithm and sticky sessions enabled.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Enable Aurora Auto Scaling for Aurora writers. Use an Application Load Balancer with the round robin routing algorithm and sticky sessions enabled.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Enable Aurora Auto Scaling for Aurora Replicas. Use an Application Load Balancer with the round robin routing and sticky sessions enabled.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Enable Aurora Scaling for Aurora writers. Use a Network Load Balancer with the least outstanding requests routing algorithm and sticky sessions enabled.",
        "isCorrect": false
      }
    ],
    "comments": "Opción A: Un Network Load Balancer opera en capa 4 (TCP) y no ofrece sticky sessions basadas en cookies de aplicación como el ALB; para una app web stateful con afinidad de sesión, el ALB es lo correcto.\n\nOpción B: Aurora Auto Scaling escala AÑADIENDO RÉPLICAS DE LECTURA, no 'writers' (Aurora tiene un único writer). 'Aurora Auto Scaling for Aurora writers' no es válido.\n\nOpción C (Correcta): Aurora Auto Scaling se habilita sobre las Aurora Replicas (réplicas de lectura), que es como Aurora escala el tier de BD. Para el tier de aplicación stateful se usa un Application Load Balancer con sticky sessions, garantizando afinidad de usuario (experiencia consistente).\n\nOpción D: Igual que B, 'Aurora Scaling for Aurora writers' no es válido y usa NLB (sin stickiness de aplicación).\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/application/sticky-sessions.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30005,
    "questionNumber": 5,
    "question": "A company uses a service to collect metadata from applications that the company hosts on premises. Consumer devices such as TVs and internet radios access the applications. Many older devices do not support certain HTTP headers and exhibit errors when these headers are present in responses. The company has configured an on-premises load balancer to remove the unsupported headers from responses sent to older devices, which the company identified by the User-Agent headers. The company wants to migrate the service to AWS, adopt serverless technologies, and retain the ability to support the older devices. The company has already migrated the applications into a set of AWS Lambda functions. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon CloudFront distribution for the metadata service. Create an Application Load Balancer (ALB). Configure the CloudFront distribution to forward requests to the ALB. Configure the ALB to invoke the correct Lambda function for each type of request. Create a CloudFront function to remove the problematic headers based on the value of the User-Agent header.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon API Gateway REST API for the metadata service. Configure API Gateway to invoke the correct Lambda function for each type of request. Modify the default gateway responses to remove the problematic headers based on the value of the User-Agent header.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon API Gateway HTTP API for the metadata service. Configure API Gateway to invoke the correct Lambda function for each type of request. Create a response mapping template to remove the problematic headers based on the value of the User-Agent. Associate the response data mapping with the HTTP API.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Amazon CloudFront distribution for the metadata service. Create an Application Load Balancer (ALB). Configure the CloudFront distribution to forward requests to the ALB. Configure the ALB to invoke the correct Lambda function for each type of request. Create a Lambda@Edge function that will remove the problematic headers in response to viewer requests based on the value of the User-Agent header.",
        "isCorrect": true
      }
    ],
    "comments": "Hay que quitar cabeceras HTTP problemáticas de las RESPUESTAS a dispositivos antiguos, identificados por User-Agent, con arquitectura serverless.\n\nOpción A: CloudFront Functions no operan sobre respuestas del origin con la flexibilidad necesaria para eliminar cabeceras según User-Agent en el evento adecuado. Menos adecuada.\n\nOpción B: Los gateway responses de API Gateway REST solo personalizan respuestas de error propias (4xx/5xx), no eliminan cabeceras condicionalmente por User-Agent en respuestas normales.\n\nOpción C: Las HTTP APIs no soportan response mapping templates para reescribir cabeceras condicionalmente por User-Agent como se plantea.\n\nOpción D (Correcta): Lambda@Edge ejecuta código en viewer-response/origin-response y elimina las cabeceras problemáticas según el User-Agent. CloudFront hacia un ALB que invoca las Lambda, y la función Lambda@Edge limpia las cabeceras antes de responder, replicando el balanceador on-premises de forma serverless.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-updating-http-responses.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30006,
    "questionNumber": 6,
    "question": "A retail company needs to provide a series of data files to another company, which is its business partner. These files are saved in an Amazon S3 bucket under Account A, which belongs to the retail company. The business partner company wants one of its IAM users, User_DataProcessor, to access the files from its own AWS account (Account B). Which combination of steps must the companies take so that User_DataProcessor can access the S3 bucket successfully? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Turn on the cross-origin resource sharing (CORS) feature for the S3 bucket in Account A.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "In Account A, set the S3 bucket policy to the following:",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "In Account A, set the S3 bucket policy to the following:",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "In Account B, set the permissions of User_DataProcessor to the following:",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "In Account B, set the permissions of User_DataProcessor to the following:",
        "isCorrect": false
      }
    ],
    "comments": "Para que un usuario IAM (User_DataProcessor) de la Cuenta B acceda a un bucket S3 de la Cuenta A hacen falta permisos en AMBOS lados.\n\nOpción A: CORS controla acceso desde navegadores entre orígenes web; no concede acceso cross-account a un usuario IAM sobre S3.\n\nOpción C (Correcta): En la Cuenta A se fija una BUCKET POLICY que concede explícitamente permisos (s3:GetObject/ListBucket) al ARN del usuario/rol de la Cuenta B. Sin el permiso del lado del recurso, el acceso se deniega.\n\nOpción D (Correcta): En la Cuenta B se concede a User_DataProcessor una política de identidad que permite las acciones S3 sobre el bucket de la Cuenta A. En cross-account ambos permisos (recurso y principal) deben permitir la acción.\n\nOpciones B/E: son las variantes de política que no forman la combinación correcta (la pareja válida es política de bucket en A + permiso de identidad en B).\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/example-walkthroughs-managing-access-example2.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/access-policy-alternatives-guidelines.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30007,
    "questionNumber": 7,
    "question": "A company is running a traditional web application on Amazon EC2 instances. The company needs to refactor the application as microservices that run on containers. Separate versions of the application exist in two distinct environments: production and testing. Load for the application is variable, but the minimum load and the maximum load are known. A solutions architect needs to design the updated application with a serverless architecture that minimizes operational complexity. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Upload the container images to AWS Lambda as functions. Configure a concurrency limit for the associated Lambda functions to handle the expected peak load. Configure two separate Lambda integrations within Amazon API Gateway: one for production and one for testing.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Upload the container images to Amazon Elastic Container Registry (Amazon ECR). Configure two auto scaled Amazon Elastic Container Service (Amazon ECS) clusters with the Fargate launch type to handle the expected load. Deploy tasks from the ECR images. Configure two separate Application Load Balancers to direct traffic to the ECS clusters.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Upload the container images to Amazon Elastic Container Registry (Amazon ECR). Configure two auto scaled Amazon Elastic Kubernetes Service (Amazon EKS) clusters with the Fargate launch type to handle the expected load. Deploy tasks from the ECR images. Configure two separate Application Load Balancers to direct traffic to the EKS clusters.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Upload the container images to AWS Elastic Beanstalk. In Elastic Beanstalk, create separate environments and deployments for production and testing. Configure two separate Application Load Balancers to direct traffic to the Elastic Beanstalk deployments.",
        "isCorrect": false
      }
    ],
    "comments": "Microservicios en contenedores, serverless, mínima complejidad operativa y MÁXIMA rentabilidad, con carga variable de mínimo y máximo conocidos.\n\nOpción A (Correcta): Lambda admite imágenes de contenedor, es totalmente serverless (sin clústeres) y factura por uso, ideal para carga variable con picos conocidos. Un límite de concurrencia acota el pico y dos integraciones Lambda en API Gateway (producción y pruebas) separan entornos con la menor complejidad y coste.\n\nOpción B: ECS Fargate mantiene clústeres, tareas y ALBs que dimensionar; para carga con valles, pagar tareas en ejecución es menos rentable que el pago por invocación de Lambda.\n\nOpción C: EKS Fargate añade más complejidad (plano de control Kubernetes) y coste; contradice 'mínima complejidad operativa'.\n\nOpción D: Elastic Beanstalk se basa en EC2 gestionadas (no serverless) con capacidad aprovisionada; menos rentable para picos y valles.\n\nReferencias:\nhttps://docs.aws.amazon.com/lambda/latest/dg/images-create.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30008,
    "questionNumber": 8,
    "question": "A company has a multi-tier web application that runs on a fleet of Amazon EC2 instances behind an Application Load Balancer (ALB). The instances are in an Auto Scaling group. The ALB and the Auto Scaling group are replicated in a backup AWS Region. The minimum value and the maximum value for the Auto Scaling group are set to zero. An Amazon RDS Multi-AZ DB instance stores the application’s data. The DB instance has a read replica in the backup Region. The application presents an endpoint to end users by using an Amazon Route 53 record. The company needs to reduce its RTO to less than 15 minutes by giving the application the ability to automatically fail over to the backup Region. The company does not have a large enough budget for an active-active strategy. What should a solutions architect recommend to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Reconfigure the application’s Route 53 record with a latency-based routing policy that load balances traffic between the two ALBs. Create an AWS Lambda function in the backup Region to promote the read replica and modify the Auto Scaling group values. Create an Amazon CloudWatch alarm that is based on the HTTPCode_Target_5XX_Count metric for the ALB in the primary Region. Configure the CloudWatch alarm to invoke the Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Lambda function in the backup Region to promote the read replica and modify the Auto Scaling group values. Configure Route 53 with a health check that monitors the web application and sends an Amazon Simple Notification Service (Amazon SNS) notification to the Lambda function when the health check status is unhealthy. Update the application’s Route 53 record with a failover policy that routes traffic to the ALB in the backup Region when a health check failure occurs.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Configure the Auto Scaling group in the backup Region to have the same values as the Auto Scaling group in the primary Region. Reconfigure the application’s Route 53 record with a latency-based routing policy that load balances traffic between the two ALBs. Remove the read replica. Replace the read replica with a standalone RDS DB instance. Configure Cross-Region Replication between the RDS DB instances by using snapshots and Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure an endpoint in AWS Global Accelerator with the two ALBs as equal weighted targets. Create an AWS Lambda function in the backup Region to promote the read replica and modify the Auto Scaling group values. Create an Amazon CloudWatch alarm that is based on the HTTPCode_Target_5XX_Count metric for the ALB in the primary Region. Configure the CloudWatch alarm to invoke the Lambda function.",
        "isCorrect": false
      }
    ],
    "comments": "Failover automático a Región de respaldo con RTO < 15 min, activo-pasivo (sin presupuesto activo-activo). El ASG de respaldo está a 0 (pilot light).\n\nOpción A: El enrutamiento latency-based es activo-activo (envía usuarios al backup en operación normal) y el backup está a 0 instancias (errores). No encaja.\n\nOpción B (Correcta): Una Lambda en la Región de respaldo promueve la read replica de RDS y ajusta el ASG (de 0 a capacidad real). Route 53 con health check monitoriza la app y, al fallar, notifica vía SNS a la Lambda; el registro usa política FAILOVER hacia la ALB de respaldo. Patrón pilot light activo-pasivo con failover DNS automático que cumple el RTO.\n\nOpción C: Snapshots + S3 da RPO/RTO alto (no cumple <15 min) y latency-based no es activo-pasivo.\n\nOpción D: Global Accelerator con ambas ALB de igual peso es activo-activo hacia el backup vacío; no es activo-pasivo de menor coste.\n\nReferencias:\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30009,
    "questionNumber": 9,
    "question": "A company is hosting a critical application on a single Amazon EC2 instance. The application uses an Amazon ElastiCache for Redis single-node cluster for an in-memory data store. The application uses an Amazon RDS for MariaDB DB instance for a relational database. For the application to function, each piece of the infrastructure must be healthy and must be in an active state. A solutions architect needs to improve the application's architecture so that the infrastructure can automatically recover from failure with the least possible downtime. Which combination of steps will meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use an Elastic Load Balancer to distribute traffic across multiple EC2 instances. Ensure that the EC2 instances are part of an Auto Scaling group that has a minimum capacity of two instances.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use an Elastic Load Balancer to distribute traffic across multiple EC2 instances. Ensure that the EC2 instances are configured in unlimited mode.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Modify the DB instance to create a read replica in the same Availability Zone. Promote the read replica to be the primary DB instance in failure scenarios.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Modify the DB instance to create a Multi-AZ deployment that extends across two Availability Zones.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Create a replication group for the ElastiCache for Redis cluster. Configure the cluster to use an Auto Scaling group that has a minimum capacity of two instances.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Create a replication group for the ElastiCache for Redis cluster. Enable Multi-AZ on the cluster.",
        "isCorrect": true
      }
    ],
    "comments": "Recuperación automática con la menor caída para EC2, RDS MariaDB y ElastiCache for Redis.\n\nOpción A (Correcta): ELB + Auto Scaling group con mínimo 2 instancias elimina el punto único de fallo del cómputo y recupera instancias automáticamente.\n\nOpción B: 'unlimited mode' es burst de CPU de instancias T (rendimiento), no HA. No aplica.\n\nOpción C: Una read replica en la MISMA AZ no protege ante fallo de AZ y su promoción es manual; no es recuperación automática.\n\nOpción D (Correcta): RDS MariaDB Multi-AZ (dos AZ) da failover automático a la instancia en espera.\n\nOpción E: ElastiCache no usa ASG de EC2 para HA; se usa replication group + Multi-AZ. Incorrecta por concepto.\n\nOpción F (Correcta): Replication group de ElastiCache for Redis con Multi-AZ habilitado da failover automático promoviendo una réplica en otra AZ.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoFailover.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30010,
    "questionNumber": 10,
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
    "comments": "Mostrar una página de error personalizada en vez del 502 estándar de la ALB, con el MENOR esfuerzo operativo. CloudFront ya está delante.\n\nOpción A (Correcta): Un bucket S3 configurado como sitio web estático con las páginas de error personalizadas aporta el origen de la página de error, gestionado y barato.\n\nOpción B: Alarma CloudWatch + Lambda que reescribe la regla de la ALB hacia otro servidor web es compleja, con lógica personalizada y servidor adicional; mucho esfuerzo.\n\nOpción C: Modificar Route 53 con health checks y fallback cambia el enrutamiento DNS global (TTL/propagación), más frágil y costoso que una respuesta de error de CloudFront.\n\nOpción D: Igual que B, alarma + Lambda + servidor web; alto esfuerzo operativo.\n\nOpción E (Correcta): Una CloudFront custom error response que, ante el 502 del origin, devuelve la página personalizada del bucket S3. CloudFront intercepta el error y sirve la página custom sin tocar la app. A + E cubre origen y mecanismo.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GeneratingCustomErrorResponses.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30011,
    "questionNumber": 11,
    "question": "A company has many AWS accounts and uses AWS Organizations to manage all of them. A solutions architect must implement a solution that the company can use to share a common network across multiple accounts. The company’s infrastructure team has a dedicated infrastructure account that has a VPC. The infrastructure team must use this account to manage the network. Individual accounts cannot have the ability to manage their own networks. However, individual accounts must be able to create AWS resources within subnets. Which combination of actions should the solutions architect perform to meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a transit gateway in the infrastructure account.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Enable resource sharing from the AWS Organizations management account.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create VPCs in each AWS account within the organization in AWS Organizations. Configure the VPCs to share the same CIDR range and subnets as the VPC in the infrastructure account. Peer the VPCs in each individual account with the VPC in the infrastructure account.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a resource share in AWS Resource Access Manager in the infrastructure account. Select the specific AWS Organizations OU that will use the shared network. Select each subnet to associate with the resource share.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Create a resource share in AWS Resource Access Manager in the infrastructure account. Select the specific AWS Organizations OU that will use the shared network. Select each prefix list to associate with the resource share.",
        "isCorrect": false
      }
    ],
    "comments": "Compartir una VPC común (de la cuenta de infraestructura) entre cuentas de la organización: infra gestiona la red y las demás solo crean recursos en las subredes. Es VPC sharing con AWS RAM.\n\nOpción A: Un transit gateway interconecta VPC distintas, no permite crear recursos DENTRO de la misma VPC/subredes centralizadas.\n\nOpción B (Correcta): En Organizations hay que habilitar el uso compartido de recursos desde la cuenta de gestión (enable resource sharing), prerrequisito para compartir con OUs/cuentas.\n\nOpción C: VPC separadas con el mismo CIDR y peering provoca solapamiento de CIDR (no permitido en peering) y no es 'red común gestionada centralmente'.\n\nOpción D (Correcta): En la cuenta de infraestructura se crea un resource share en AWS RAM, se selecciona el OU y se asocian las SUBREDES. Los participantes despliegan recursos en esas subredes pero no gestionan la VPC (sigue siendo del owner). B + D es el patrón correcto.\n\nOpción E: Compartir prefix lists no comparte subredes donde desplegar recursos.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/vpc-sharing.html\nhttps://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30012,
    "questionNumber": 12,
    "question": "A company wants to use a third-party software-as-a-service (SaaS) application. The third-party SaaS application is consumed through several API calls. The third-party SaaS application also runs on AWS inside a VPC. The company will consume the third-party SaaS application from inside a VPC. The company has internal security policies that mandate the use of private connectivity that does not traverse the internet. No resources that run in the company VPC are allowed to be accessed from outside the company’s VPC. All permissions must conform to the principles of least privilege. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS PrivateLink interface VPC endpoint. Connect this endpoint to the endpoint service that the third-party SaaS application provides. Create a security group to limit the access to the endpoint. Associate the security group with the endpoint.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an AWS Site-to-Site VPN connection between the third-party SaaS application and the company VPC. Configure network ACLs to limit access across the VPN tunnels.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a VPC peering connection between the third-party SaaS application and the company VPUpdate route tables by adding the needed routes for the peering connection.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS PrivateLink endpoint service. Ask the third-party SaaS provider to create an interface VPC endpoint for this endpoint service. Grant permissions for the endpoint service to the specific account of the third-party SaaS provider.",
        "isCorrect": false
      }
    ],
    "comments": "Consumir una SaaS de terceros que corre en AWS dentro de una VPC, con conectividad privada que no atraviese internet, sin exponer los recursos de la VPC, y mínimo privilegio.\n\nOpción A (Correcta): AWS PrivateLink con un interface VPC endpoint del lado CONSUMIDOR conectado al endpoint service de la SaaS. El tráfico va por la red privada de AWS (no internet), la empresa consume sin exponer sus recursos (PrivateLink es unidireccional hacia el servicio) y un security group en el endpoint limita el acceso al mínimo. Es el escenario de consumo de SaaS vía PrivateLink.\n\nOpción B: Una VPN Site-to-Site suele atravesar internet (salvo sobre DX), es más pesada y no es el patrón nativo de consumo de SaaS.\n\nOpción C: El VPC peering es bidireccional y expondría los recursos de la VPC de la empresa a la otra VPC, incumpliendo 'nada accesible desde fuera'.\n\nOpción D: Crear un endpoint SERVICE (lado proveedor) invierte los roles; no es cómo se consume una SaaS ajena.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30013,
    "questionNumber": 13,
    "question": "A company needs to implement a patching process for its servers. The on-premises servers and Amazon EC2 instances use a variety of tools to perform patching. Management requires a single report showing the patch status of all the servers and instances. Which set of actions should a solutions architect take to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Systems Manager to manage patches on the on-premises servers and EC2 instances. Use Systems Manager to generate patch compliance reports.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use AWS OpsWorks to manage patches on the on-premises servers and EC2 instances. Use Amazon QuickSight integration with OpsWorks to generate patch compliance reports.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use an Amazon EventBridge rule to apply patches by scheduling an AWS Systems Manager patch remediation job. Use Amazon Inspector to generate patch compliance reports.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS OpsWorks to manage patches on the on-premises servers and EC2 instances. Use AWS X-Ray to post the patch status to AWS Systems Manager OpsCenter to generate patch compliance reports.",
        "isCorrect": false
      }
    ],
    "comments": "Proceso de parcheo unificado para servidores on-premises y EC2, con un único informe de estado de parches.\n\nOpción A (Correcta): AWS Systems Manager gestiona parches en servidores on-premises (hybrid activations / SSM Agent) y en EC2 con Patch Manager, y genera informes de cumplimiento de parches (patch compliance) centralizados. Solución nativa y unificada.\n\nOpción B: OpsWorks se centra en gestión de configuración con Chef/Puppet, no es la herramienta de parcheo/compliance unificada; QuickSight no genera esos informes de forma nativa.\n\nOpción C: Amazon Inspector evalúa vulnerabilidades, no produce el informe de estado de parches de Patch Manager; la combinación es más compleja y no da el informe unificado.\n\nOpción D: OpsWorks + X-Ray (trazado de aplicaciones) no aplica al parcheo/compliance.\n\nReferencias:\nhttps://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-patch.html\nhttps://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-managedinstances.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30014,
    "questionNumber": 14,
    "question": "A company is running an application on several Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer. The load on the application varies throughout the day, and EC2 instances are scaled in and out on a regular basis. Log files from the EC2 instances are copied to a central Amazon S3 bucket every 15 minutes. The security team discovers that log files are missing from some of the terminated EC2 instances. Which set of actions will ensure that log files are copied to the central S3 bucket from the terminated EC2 instances?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a script to copy log files to Amazon S3, and store the script in a file on the EC2 instance. Create an Auto Scaling lifecycle hook and an Amazon EventBridge rule to detect lifecycle events from the Auto Scaling group. Invoke an AWS Lambda function on the autoscaling:EC2_INSTANCE_TERMINATING transition to send ABANDON to the Auto Scaling group to prevent termination, run the script to copy the log files, and terminate the instance using the AWS SDK.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Systems Manager document with a script to copy log files to Amazon S3. Create an Auto Scaling lifecycle hook and an Amazon EventBridge rule to detect lifecycle events from the Auto Scaling group. Invoke an AWS Lambda function on the autoscaling:EC2_INSTANCE_TERMINATING transition to call the AWS Systems Manager API SendCommand operation to run the document to copy the log files and send CONTINUE to the Auto Scaling group to terminate the instance.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Change the log delivery rate to every 5 minutes. Create a script to copy log files to Amazon S3, and add the script to EC2 instance user data. Create an Amazon EventBridge rule to detect EC2 instance termination. Invoke an AWS Lambda function from the EventBridge rule that uses the AWS CLI to run the user-data script to copy the log files and terminate the instance.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Systems Manager document with a script to copy log files to Amazon S3. Create an Auto Scaling lifecycle hook that publishes a message to an Amazon Simple Notification Service (Amazon SNS) topic. From the SNS notification, call the AWS Systems Manager API SendCommand operation to run the document to copy the log files and send ABANDON to the Auto Scaling group to terminate the instance.",
        "isCorrect": false
      }
    ],
    "comments": "Hay que garantizar que los logs de instancias que se terminan por scale-in lleguen a S3 antes de morir.\n\nOpción A: Enviar ABANDON al Auto Scaling group impide la terminación normal y obliga a terminar la instancia manualmente vía SDK; además guarda el script en un fichero dentro de la instancia (menos robusto y gestionable). No es el patrón recomendado.\n\nOpción B (Correcta): Se crea un documento de AWS Systems Manager con el script de copia a S3. Un lifecycle hook de Auto Scaling en la transición autoscaling:EC2_INSTANCE_TERMINATING pausa la instancia en estado Terminating:Wait; una regla de EventBridge detecta el evento e invoca una Lambda que llama a la API SendCommand de SSM para ejecutar el documento (copia los logs) y luego envía CONTINUE al Auto Scaling group para permitir la terminación. Es el patrón oficial y robusto.\n\nOpción C: Ejecutar el user-data script tras el arranque para copiar en terminación es un uso incorrecto de user data (se ejecuta al lanzar, no al terminar) y no garantiza la copia.\n\nOpción D: Publicar en SNS y luego enviar ABANDON termina la instancia por ruta anómala y ABANDON no es el resultado correcto para completar el hook tras copiar; CONTINUE es lo adecuado.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html\nhttps://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30015,
    "questionNumber": 15,
    "question": "A company is using multiple AWS accounts. The DNS records are stored in a private hosted zone for Amazon Route 53 in Account A. The company’s applications and databases are running in Account B. A solutions architect will deploy a two-tier application in a new VPC. To simplify the configuration, the db.example.com CNAME record set for the Amazon RDS endpoint was created in a private hosted zone for Amazon Route 53. During deployment, the application failed to start. Troubleshooting revealed that db.example.com is not resolvable on the Amazon EC2 instance. The solutions architect confirmed that the record set was created correctly in Route 53. Which combination of steps should the solutions architect take to resolve this issue? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy the database on a separate EC2 instance in the new VPC. Create a record set for the instance’s private IP in the private hosted zone.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use SSH to connect to the application tier EC2 instance. Add an RDS endpoint IP address to the /etc/resolv.conf file.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an authorization to associate the private hosted zone in Account A with the new VPC in Account B.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create a private hosted zone for the example com domain in Account B. Configure Route 53 replication between AWS accounts.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Associate a new VPC in Account B with a hosted zone in Account A. Delete the association authorization in Account A.",
        "isCorrect": true
      }
    ],
    "comments": "El problema es que db.example.com (en una PHZ de la Cuenta A) no se resuelve desde una EC2 en la nueva VPC de la Cuenta B. Para resolver una PHZ desde una VPC de OTRA cuenta hay que asociar esa VPC a la PHZ mediante autorización cross-account.\n\nOpción A: Desplegar la base de datos en una EC2 aparte y crear un registro de su IP privada ignora que ya hay un registro correcto para RDS; no arregla la resolución cross-account y cambia la arquitectura innecesariamente.\n\nOpción B: Editar /etc/resolv.conf con la IP del endpoint RDS es un parche frágil (las IP de RDS pueden cambiar) y no resuelve el problema de asociación de la PHZ. Descartada.\n\nOpción C (Correcta): En la Cuenta A (dueña de la PHZ) se crea una autorización de asociación (create-vpc-association-authorization) para permitir asociar la nueva VPC de la Cuenta B con la PHZ.\n\nOpción D: Crear una PHZ duplicada en la Cuenta B y una 'replicación entre cuentas' no existe como tal en Route 53 y duplica gestión; no es el mecanismo correcto.\n\nOpción E (Correcta): Se asocia la nueva VPC de la Cuenta B con la hosted zone de la Cuenta A (associate-vpc-with-hosted-zone) y se elimina la autorización de asociación en la Cuenta A. Tras C + E, la EC2 ya resuelve db.example.com. Es el flujo oficial cross-account.\n\nReferencias:\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html\nhttps://docs.aws.amazon.com/Route53/latest/APIReference/API_CreateVPCAssociationAuthorization.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30016,
    "questionNumber": 16,
    "question": "A company used Amazon EC2 instances to deploy a web fleet to host a blog site. The EC2 instances are behind an Application Load Balancer (ALB) and are configured in an Auto Scaling group. The web application stores all blog content on an Amazon EFS volume. The company recently added a feature for bloggers to add video to their posts, attracting 10 times the previous user traffic. At peak times of day, users report buffering and timeout issues while attempting to reach the site or watch videos. Which is the MOST cost-efficient and scalable deployment that will resolve the issues for users?",
    "choices": [
      {
        "letter": "A",
        "text": "Reconfigure Amazon EFS to enable maximum I/O.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Update the blog site to use instance store volumes for storage. Copy the site contents to the volumes at launch and to Amazon S3 at shutdown.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure an Amazon CloudFront distribution. Point the distribution to an S3 bucket, and migrate the videos from EFS to Amazon S3.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Set up an Amazon CloudFront distribution for all site contents, and point the distribution at the ALB.",
        "isCorrect": false
      }
    ],
    "comments": "Tras añadir vídeo, hay buffering y timeouts por servir contenido pesado desde EFS; se busca la solución MÁS rentable y escalable.\n\nOpción A: Habilitar EFS Maximum I/O mejora el throughput agregado pero mantiene el vídeo en EFS (caro para servir contenido estático a gran escala) y no cachea cerca del usuario; no resuelve buffering globalmente ni es lo más rentable.\n\nOpción B: Usar instance store y copiar contenido al arrancar/apagar es frágil (el instance store es efímero), complejo y no escala para servir vídeo. Descartada.\n\nOpción C (Correcta): Configurar una distribución CloudFront apuntando a un bucket S3 y migrar los vídeos de EFS a S3 desacopla el contenido pesado del fleet EC2, lo sirve desde el almacenamiento de objetos barato y lo cachea en el edge (CloudFront), eliminando buffering y escalando de forma económica. Es el patrón estándar para servir media.\n\nOpción D: Poner CloudFront delante de la ALB cachea, pero el vídeo sigue en EFS servido por EC2 (cuello de botella y coste); menos eficiente que mover el media a S3.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30017,
    "questionNumber": 17,
    "question": "A company with global offices has a single 1 Gbps AWS Direct Connect connection to a single AWS Region. The company’s on-premises network uses the connection to communicate with the company’s resources in the AWS Cloud. The connection has a single private virtual interface that connects to a single VPC. A solutions architect must implement a solution that adds a redundant Direct Connect connection in the same Region. The solution also must provide connectivity to other Regions through the same pair of Direct Connect connections as the company expands into other Regions. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Provision a Direct Connect gateway. Delete the existing private virtual interface from the existing connection. Create the second Direct Connect connection. Create a new private virtual interface on each connection, and connect both private virtual interfaces to the Direct Connect gateway. Connect the Direct Connect gateway to the single VPC.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Keep the existing private virtual interface. Create the second Direct Connect connection. Create a new private virtual interface on the new connection, and connect the new private virtual interface to the single VPC.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Keep the existing private virtual interface. Create the second Direct Connect connection. Create a new public virtual interface on the new connection, and connect the new public virtual interface to the single VPC.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Provision a transit gateway. Delete the existing private virtual interface from the existing connection. Create the second Direct Connect connection. Create a new private virtual interface on each connection, and connect both private virtual interfaces to the transit gateway. Associate the transit gateway with the single VPC.",
        "isCorrect": false
      }
    ],
    "comments": "Se requiere una segunda conexión Direct Connect redundante en la misma Región y, además, conectividad a otras Regiones a través del mismo par de conexiones al expandirse.\n\nOpción A (Correcta): Se aprovisiona un Direct Connect gateway, se elimina la VIF privada existente, se crea la segunda conexión DX y se crea una VIF privada en CADA conexión, conectando ambas al Direct Connect gateway, que a su vez se asocia a la VPC. El DX gateway permite alcanzar VPC en múltiples Regiones desde el mismo par de conexiones, cumpliendo redundancia y expansión multi-Región.\n\nOpción B: Mantener la VIF antigua y una VIF privada nueva conectada directamente a la VPC da redundancia física pero NO habilita conectividad multi-Región futura por el mismo par (una VIF privada apunta a una VPC/Región). No cumple el requisito multi-Región.\n\nOpción C: Una VIF PÚBLICA sirve para servicios públicos de AWS, no para conectar a una VPC privada; conceptualmente incorrecta.\n\nOpción D: Un transit gateway no se 'asocia' directamente a una conexión DX con VIF privadas de esa forma; el componente que agrega múltiples DX y alcanza varias Regiones/VPC es el Direct Connect gateway (opcionalmente con transit VIF + TGW), no el patrón descrito. La opción correcta y directa es el DX gateway.\n\nReferencias:\nhttps://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways.html\nhttps://docs.aws.amazon.com/directconnect/latest/UserGuide/virtualgateways.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30018,
    "questionNumber": 18,
    "question": "A company has a web application that allows users to upload short videos. The videos are stored on Amazon EBS volumes and analyzed by custom recognition software for categorization. The website contains static content that has variable traffic with peaks in certain months. The architecture consists of Amazon EC2 instances running in an Auto Scaling group for the web application and EC2 instances running in an Auto Scaling group to process an Amazon SQS queue. The company wants to re-architect the application to reduce operational overhead using AWS managed services where possible and remove dependencies on third-party software. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon ECS containers for the web application and Spot instances for the Auto Scaling group that processes the SQS queue. Replace the custom software with Amazon Rekognition to categorize the videos.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Store the uploaded videos in Amazon EFS and mount the file system to the EC2 instances for the web application. Process the SQS queue with an AWS Lambda function that calls the Amazon Rekognition API to categorize the videos.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Host the web application in Amazon S3. Store the uploaded videos in Amazon S3. Use S3 event notification to publish events to the SQS queue. Process the SQS queue with an AWS Lambda function that calls the Amazon Rekognition API to categorize the videos.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use AWS Elastic Beanstalk to launch EC2 instances in an Auto Scaling group for the web application and launch a worker environment to process the SQS queue. Replace the custom software with Amazon Rekognition to categorize the videos.",
        "isCorrect": false
      }
    ],
    "comments": "Se re-arquitecta para reducir overhead operativo con servicios gestionados y eliminar software de terceros (reconocimiento propio) para categorizar vídeos.\n\nOpción A: ECS + Spot para procesar la SQS mantiene clústeres/instancias que gestionar; aunque usa Rekognition, no minimiza tanto el overhead como una solución totalmente serverless.\n\nOpción B: Guardar vídeos en EFS montado en EC2 mantiene el fleet EC2 web y un sistema de ficheros; procesar con Lambda + Rekognition está bien, pero seguir en EC2/EFS para la web no minimiza operación tanto como S3.\n\nOpción C (Correcta): Alojar la web (estática) en S3, almacenar los vídeos en S3, usar S3 event notifications para publicar eventos en la cola SQS y procesar la cola con una Lambda que llama a la API de Amazon Rekognition para categorizar. Es la arquitectura con menor overhead operativo (sin EC2/EFS), servicios totalmente gestionados y elimina el software de terceros con Rekognition.\n\nOpción D: Elastic Beanstalk con EC2 en Auto Scaling y worker environment sigue gestionando instancias EC2 (no minimiza overhead como serverless). Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html\nhttps://docs.aws.amazon.com/rekognition/latest/dg/what-is.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30019,
    "questionNumber": 19,
    "question": "A company has a serverless application comprised of Amazon CloudFront, Amazon API Gateway, and AWS Lambda functions. The current deployment process of the application code is to create a new version number of the Lambda function and run an AWS CLI script to update. If the new function version has errors, another CLI script reverts by deploying the previous working version of the function. The company would like to decrease the time to deploy new versions of the application logic provided by the Lambda functions, and also reduce the time to detect and revert when errors are identified. How can this be accomplished?",
    "choices": [
      {
        "letter": "A",
        "text": "Create and deploy nested AWS CloudFormation stacks with the parent stack consisting of the AWS CloudFront distribution and API Gateway, and the child stack containing the Lambda function. For changes to Lambda, create an AWS CloudFormation change set and deploy; if errors are triggered, revert the AWS CloudFormation change set to the previous version.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS SAM and built-in AWS CodeDeploy to deploy the new Lambda version, gradually shift traffic to the new version, and use pre-traffic and post-traffic test functions to verify code. Rollback if Amazon CloudWatch alarms are triggered.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Refactor the AWS CLI scripts into a single script that deploys the new Lambda version. When deployment is completed, the script tests execute. If errors are detected, revert to the previous Lambda version.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create and deploy an AWS CloudFormation stack that consists of a new API Gateway endpoint that references the new Lambda version. Change the CloudFront origin to the new API Gateway endpoint, monitor errors and if detected, change the AWS CloudFront origin to the previous API Gateway endpoint.",
        "isCorrect": false
      }
    ],
    "comments": "Se quiere desplegar nuevas versiones de Lambda más rápido y detectar/revertir errores rápidamente, reduciendo el proceso manual con CLI.\n\nOpción A: CloudFormation con change sets anidados permite versionar infraestructura, pero no ofrece de forma nativa el desplazamiento gradual de tráfico ni pruebas pre/post-traffic ni rollback automático por alarmas para Lambda; más lento para detectar/revertir.\n\nOpción B (Correcta): AWS SAM con la integración nativa de AWS CodeDeploy despliega la nueva versión de la función Lambda desplazando el tráfico gradualmente (canary/linear) mediante alias, ejecuta funciones de validación pre-traffic y post-traffic y hace rollback automático si se disparan alarmas de CloudWatch. Reduce el tiempo de despliegue y de detección/reversión de errores de forma automatizada.\n\nOpción C: Refactorizar los scripts CLI en uno solo sigue siendo un proceso manual, sin shift de tráfico ni rollback automático por métricas. No mejora sustancialmente.\n\nOpción D: Crear nuevos endpoints de API Gateway y cambiar el origin de CloudFront manualmente es lento, propenso a errores y sin automatización de rollback por alarmas. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/lambda-rolling-deployments.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30020,
    "questionNumber": 20,
    "question": "A company is planning to store a large number of archived documents and make the documents available to employees through the corporate intranet. Employees will access the system by connecting through a client VPN service that is attached to a VPC. The data must not be accessible to the public. The documents that the company is storing are copies of data that is held on physical media elsewhere. The number of requests will be low. Availability and speed of retrieval are not concerns of the company. Which solution will meet these requirements at the LOWEST cost?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon S3 bucket. Configure the S3 bucket to use the S3 One Zone-Infrequent Access (S3 One Zone-IA) storage class as default. Configure the S3 bucket for website hosting. Create an S3 interface endpoint. Configure the S3 bucket to allow access only through that endpoint.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Launch an Amazon EC2 instance that runs a web server. Attach an Amazon Elastic File System (Amazon EFS) file system to store the archived data in the EFS One Zone-Infrequent Access (EFS One Zone-IA) storage class Configure the instance security groups to allow access only from private networks.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Launch an Amazon EC2 instance that runs a web server Attach an Amazon Elastic Block Store (Amazon EBS) volume to store the archived data. Use the Cold HDD (sc1) volume type. Configure the instance security groups to allow access only from private networks.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Amazon S3 bucket. Configure the S3 bucket to use the S3 Glacier Deep Archive storage class as default. Configure the S3 bucket for website hosting. Create an S3 interface endpoint. Configure the S3 bucket to allow access only through that endpoint.",
        "isCorrect": true
      }
    ],
    "comments": "Documentos archivados, acceso solo por intranet/Client VPN (no público), copias de datos que existen en otro soporte, pocas peticiones, y la disponibilidad y velocidad de recuperación NO importan. Se busca el MENOR coste.\n\nOpción A: S3 One Zone-IA es más barato que Standard pero mucho más caro que Glacier Deep Archive para datos que casi no se recuperan y sin necesidad de rapidez. No es el mínimo coste.\n\nOpción B: EC2 + EFS One Zone-IA implica pagar una instancia EC2 continuamente y EFS; mucho más caro que almacenamiento de objetos en la clase de archivo. Descartada.\n\nOpción C: EC2 + EBS Cold HDD (sc1) también paga instancia y volumen de forma continua; más caro que Glacier Deep Archive. Descartada.\n\nOpción D (Correcta): Un bucket S3 con la clase S3 Glacier Deep Archive por defecto es el almacenamiento de menor coste de AWS, idóneo cuando la recuperación es rara y la latencia/rapidez no importan (copias de respaldo de datos que existen en otro soporte). El acceso privado se garantiza restringiendo el bucket a un VPC endpoint (los usuarios llegan por Client VPN dentro de la VPC). Es la opción más barata que cumple los requisitos.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/privatelink-interface-endpoints.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30021,
    "questionNumber": 21,
    "question": "A company is using an on-premises Active Directory service for user authentication. The company wants to use the same authentication service to sign in to the company’s AWS accounts, which are using AWS Organizations. AWS Site-to-Site VPN connectivity already exists between the on-premises environment and all the company’s AWS accounts. The company’s security policy requires conditional access to the accounts based on user groups and roles. User identities must be managed in a single location. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure AWS IAM Identity Center (AWS Single Sign-On) to connect to Active Directory by using SAML 2.0. Enable automatic provisioning by using the System for Cross-domain Identity Management (SCIM) v2.0 protocol. Grant access to the AWS accounts by using attribute-based access controls (ABACs).",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure AWS IAM Identity Center (AWS Single Sign-On) by using IAM Identity Center as an identity source. Enable automatic provisioning by using the System for Cross-domain Identity Management (SCIM) v2.0 protocol. Grant access to the AWS accounts by using IAM Identity Center permission sets.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "In one of the company’s AWS accounts, configure AWS Identity and Access Management (IAM) to use a SAML 2.0 identity provider. Provision IAM users that are mapped to the federated users. Grant access that corresponds to appropriate groups in Active Directory. Grant access to the required AWS accounts by using cross-account IAM users.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "In one of the company’s AWS accounts, configure AWS Identity and Access Management (IAM) to use an OpenID Connect (OIDC) identity provider. Provision IAM roles that grant access to the AWS account for the federated users that correspond to appropriate groups in Active Directory. Grant access to the required AWS accounts by using cross-account IAM roles.",
        "isCorrect": false
      }
    ],
    "comments": "Se quiere usar el Active Directory on-premises para iniciar sesión en las cuentas AWS (Organizations), con acceso condicional por grupos/roles, identidades gestionadas en un único sitio, y ya hay VPN Site-to-Site.\n\nOpción A (Correcta): Configurar AWS IAM Identity Center (antes AWS SSO) conectado al Active Directory mediante SAML 2.0, con aprovisionamiento automático por SCIM v2.0 y control de acceso basado en atributos (ABAC), permite autenticar contra el AD corporativo (identidades gestionadas en un único lugar: el AD), federar el inicio de sesión a todas las cuentas de la organización y aplicar acceso condicional por grupos/atributos. Es el patrón recomendado para SSO empresarial hacia Organizations.\n\nOpción B: Usar IAM Identity Center con su propio directorio interno como fuente NO cumple 'identidades gestionadas en un único lugar' cuando ya existe AD corporativo; obligaría a mantener identidades duplicadas.\n\nOpción C: Provisionar usuarios IAM mapeados a usuarios federados y usuarios IAM cross-account es alto mantenimiento, no escala y va contra las buenas prácticas (usuarios IAM por persona). Descartada.\n\nOpción D: OIDC + roles IAM por cuenta también implica configuración por cuenta y no centraliza la gestión como IAM Identity Center; menos adecuado para Organizations con AD.\n\nReferencias:\nhttps://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-ad.html\nhttps://docs.aws.amazon.com/singlesignon/latest/userguide/provision-automatically.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30022,
    "questionNumber": 22,
    "question": "A software company has deployed an application that consumes a REST API by using Amazon API Gateway, AWS Lambda functions, and an Amazon DynamoDB table. The application is showing an increase in the number of errors during PUT requests. Most of the PUT calls come from a small number of clients that are authenticated with specific API keys. A solutions architect has identified that a large number of the PUT requests originate from one client. The API is noncritical, and clients can tolerate retries of unsuccessful calls. However, the errors are displayed to customers and are causing damage to the API’s reputation. What should the solutions architect recommend to improve the customer experience?",
    "choices": [
      {
        "letter": "A",
        "text": "Implement retry logic with exponential backoff and irregular variation in the client application. Ensure that the errors are caught and handled with descriptive error messages.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Implement API throttling through a usage plan at the API Gateway level. Ensure that the client application handles code 429 replies without error.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Turn on API caching to enhance responsiveness for the production stage. Run 10-minute load tests. Verify that the cache capacity is appropriate for the workload.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Implement reserved concurrency at the Lambda function level to provide the resources that are needed during sudden increases in traffic.",
        "isCorrect": false
      }
    ],
    "comments": "Un cliente concreto genera demasiadas PUT y provoca errores visibles; la API no es crítica y los clientes toleran reintentos. Se busca mejorar la experiencia limitando el impacto de ese cliente.\n\nOpción A: Implementar reintentos con backoff exponencial en el cliente ayuda, pero no evita que un cliente sature la API ni protege al resto; además requiere cambios en cada cliente. No ataca la causa (un cliente abusivo).\n\nOpción B (Correcta): Implementar throttling mediante un usage plan en API Gateway (asociado a las API keys) limita la tasa de peticiones por cliente; ese cliente recibirá 429 (Too Many Requests) de forma controlada y el cliente debe manejar el 429 sin mostrarlo como error. Protege la reputación de la API y aísla al cliente ruidoso con configuración nativa.\n\nOpción C: Activar API caching mejora la responsividad de lecturas repetidas, pero no ayuda con PUT (escrituras) ni con un cliente que abusa. No aplica.\n\nOpción D: La concurrencia reservada en Lambda asegura capacidad, pero no limita al cliente abusivo ni evita los errores derivados del volumen; no es la solución adecuada.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30023,
    "questionNumber": 23,
    "question": "A company is running a data-intensive application on AWS. The application runs on a cluster of hundreds of Amazon EC2 instances. A shared file system also runs on several EC2 instances that store 200 TB of data. The application reads and modifies the data on the shared file system and generates a report. The job runs once monthly, reads a subset of the files from the shared file system, and takes about 72 hours to complete. The compute instances scale in an Auto Scaling group, but the instances that host the shared file system run continuously. The compute and storage instances are all in the same AWS Region. A solutions architect needs to reduce costs by replacing the shared file system instances. The file system must provide high performance access to the needed data for the duration of the 72-hour run. Which solution will provide the LARGEST overall cost reduction while meeting these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate the data from the existing shared file system to an Amazon S3 bucket that uses the S3 Intelligent-Tiering storage class. Before the job runs each month, use Amazon FSx for Lustre to create a new file system with the data from Amazon S3 by using lazy loading. Use the new file system as the shared storage for the duration of the job. Delete the file system when the job is complete.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Migrate the data from the existing shared file system to a large Amazon Elastic Block Store (Amazon EBS) volume with Multi-Attach enabled. Attach the EBS volume to each of the instances by using a user data script in the Auto Scaling group launch template. Use the EBS volume as the shared storage for the duration of the job. Detach the EBS volume when the job is complete",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Migrate the data from the existing shared file system to an Amazon S3 bucket that uses the S3 Standard storage class. Before the job runs each month, use Amazon FSx for Lustre to create a new file system with the data from Amazon S3 by using batch loading. Use the new file system as the shared storage for the duration of the job. Delete the file system when the job is complete.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Migrate the data from the existing shared file system to an Amazon S3 bucket. Before the job runs each month, use AWS Storage Gateway to create a file gateway with the data from Amazon S3. Use the file gateway as the shared storage for the job. Delete the file gateway when the job is complete.",
        "isCorrect": false
      }
    ],
    "comments": "Se sustituye un sistema de ficheros compartido de 200 TB que corre 24/7 por instancias, cuando el trabajo solo se ejecuta una vez al mes durante 72 h y lee un subconjunto de los datos. Se busca la MAYOR reducción de coste con alto rendimiento durante la ejecución.\n\nOpción A (Correcta): Migrar los datos a un bucket S3 con la clase S3 Intelligent-Tiering (mueve automáticamente objetos poco accedidos a niveles más baratos, ideal para datos que solo se usan una vez al mes) y, antes de cada ejecución, crear un sistema FSx for Lustre vinculado a ese S3 con lazy loading (solo carga los ficheros al accederlos), usarlo como almacenamiento de alto rendimiento durante las 72 h y eliminarlo al terminar. Así se paga el sistema de alto rendimiento solo 72 h/mes y el almacenamiento persistente barato en S3: la mayor reducción de coste.\n\nOpción B: EBS Multi-Attach tiene límites (io1/io2, número de instancias, mismo AZ) y no escala a cientos de instancias de cómputo como un sistema de ficheros paralelo; además pagar un EBS enorme es caro. No cumple el rendimiento/escala.\n\nOpción C: Es casi igual que A pero usa S3 Standard (más caro para datos casi inactivos) y 'batch loading' en vez de lazy loading; Intelligent-Tiering + lazy loading da mayor ahorro. Menos óptima.\n\nOpción D: Storage Gateway file gateway no ofrece el rendimiento de un sistema de ficheros paralelo tipo Lustre para HPC; no cumple el 'alto rendimiento'. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/fsx/latest/LustreGuide/fsx-data-repositories.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30024,
    "questionNumber": 24,
    "question": "A company is developing a new service that will be accessed using TCP on a static port. A solutions architect must ensure that the service is highly available, has redundancy across Availability Zones, and is accessible using the DNS name my.service.com, which is publicly accessible. The service must use fixed address assignments so other companies can add the addresses to their allow lists. Assuming that resources are deployed in multiple Availability Zones in a single Region, which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create Amazon EC2 instances with an Elastic IP address for each instance. Create a Network Load Balancer (NLB) and expose the static TCP port. Register EC2 instances with the NLB. Create a new name server record set named my.service.com, and assign the Elastic IP addresses of the EC2 instances to the record set. Provide the Elastic IP addresses of the EC2 instances to the other companies to add to their allow lists.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon ECS cluster and a service definition for the application. Create and assign public IP addresses for the ECS cluster. Create a Network Load Balancer (NLB) and expose the TCP port. Create a target group and assign the ECS cluster name to the NLCreate a new A record set named my.service.com, and assign the public IP addresses of the ECS cluster to the record set. Provide the public IP addresses of the ECS cluster to the other companies to add to their allow lists.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create Amazon EC2 instances for the service. Create one Elastic IP address for each Availability Zone. Create a Network Load Balancer (NLB) and expose the assigned TCP port. Assign the Elastic IP addresses to the NLB for each Availability Zone. Create a target group and register the EC2 instances with the NLB. Create a new A (alias) record set named my.service.com, and assign the NLB DNS name to the record set.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an Amazon ECS cluster and a service definition for the application. Create and assign public IP address for each host in the cluster. Create an Application Load Balancer (ALB) and expose the static TCP port. Create a target group and assign the ECS service definition name to the ALB. Create a new CNAME record set and associate the public IP addresses to the record set. Provide the Elastic IP addresses of the Amazon EC2 instances to the other companies to add to their allow lists.",
        "isCorrect": false
      }
    ],
    "comments": "Servicio TCP en puerto estático, alta disponibilidad y redundancia entre AZ, accesible por DNS my.service.com público, con direcciones IP FIJAS para que otras empresas las incluyan en allow lists.\n\nOpción A: Asignar Elastic IP a cada EC2 y crear registros con esas IP salta el balanceador para el DNS y liga las IP a instancias concretas (si una instancia cambia, cambia la IP); no ofrece HA/redundancia limpia detrás de una IP fija estable. Frágil.\n\nOpción B: IP públicas por nodo ECS no son fijas de forma fiable para allow lists y usar A records con esas IP no da la estabilidad requerida. Descartada.\n\nOpción C (Correcta): Un Network Load Balancer (capa 4, TCP) con una Elastic IP asignada por Availability Zone da direcciones IP FIJAS y estables que otras empresas pueden incluir en sus allow lists, alta disponibilidad y redundancia entre AZ. Se registran las EC2 en un target group y se crea un registro A (alias) my.service.com apuntando al DNS del NLB. Es el patrón canónico para TCP con IP fijas.\n\nOpción D: ALB es capa 7 (HTTP/HTTPS), no adecuado para un servicio TCP genérico en puerto estático, y mezcla CNAME con IP de EC2 de forma incoherente. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/network/network-load-balancers.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30025,
    "questionNumber": 25,
    "question": "A company uses an on-premises data analytics platform. The system is highly available in a fully redundant configuration across 12 servers in the company’s data center. The system runs scheduled jobs, both hourly and daily, in addition to one-time requests from users. Scheduled jobs can take between 20 minutes and 2 hours to finish running and have tight SLAs. The scheduled jobs account for 65% of the system usage. User jobs typically finish running in less than 5 minutes and have no SLA. The user jobs account for 35% of system usage. During system failures, scheduled jobs must continue to meet SLAs. However, user jobs can be delayed. A solutions architect needs to move the system to Amazon EC2 instances and adopt a consumption-based model to reduce costs with no long-term commitments. The solution must maintain high availability and must not affect the SLAs. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Split the 12 instances across two Availability Zones in the chosen AWS Region. Run two instances in each Availability Zone as On-Demand Instances with Capacity Reservations. Run four instances in each Availability Zone as Spot Instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Split the 12 instances across three Availability Zones in the chosen AWS Region. In one of the Availability Zones, run all four instances as On-Demand Instances with Capacity Reservations. Run the remaining instances as Spot Instances.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Split the 12 instances across three Availability Zones in the chosen AWS Region. Run two instances in each Availability Zone as On-Demand Instances with a Savings Plan. Run two instances in each Availability Zone as Spot Instances.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Split the 12 instances across three Availability Zones in the chosen AWS Region. Run three instances in each Availability Zone as On-Demand Instances with Capacity Reservations. Run one instance in each Availability Zone as a Spot Instance.",
        "isCorrect": true
      }
    ],
    "comments": "Sistema de analítica con jobs programados con SLA estrictos (65% del uso, deben cumplir SLA incluso ante fallos) y jobs de usuario sin SLA (35%, pueden retrasarse). Migrar a EC2 con modelo por consumo, sin compromisos a largo plazo, alta disponibilidad y sin afectar SLA. 12 instancias.\n\nSin compromisos a largo plazo descarta Savings Plans/Reserved (opción C usa Savings Plan). La clave es garantizar capacidad para los jobs con SLA con On-Demand + Capacity Reservations (reservan capacidad sin compromiso de 1/3 años) y aprovechar Spot para lo que puede retrasarse.\n\nOpción A: Solo dos AZ; con capacidad On-Demand reservada de 2+2 = 4 instancias frente a 8 Spot, si se pierde una AZ o hay interrupciones Spot puede no cumplirse el SLA del 65% del trabajo. Menos resiliente que repartir en tres AZ.\n\nOpción B: Concentrar las 4 On-Demand en UNA sola AZ crea un punto único de fallo: si cae esa AZ, se pierde toda la capacidad garantizada y se incumplen los SLA. Descartada.\n\nOpción C: Usa un Savings Plan, que es un compromiso a largo plazo (1 o 3 años); contradice 'sin compromisos a largo plazo'. Descartada por el requisito.\n\nOpción D (Correcta): Repartir las 12 instancias en TRES AZ, con 3 On-Demand + Capacity Reservations por AZ (9 con capacidad garantizada distribuida, sin compromiso a largo plazo) para los jobs con SLA y 1 Spot por AZ para los jobs de usuario que pueden retrasarse. Cumple SLA ante fallo de una AZ (queda capacidad garantizada en las otras dos), es por consumo y sin compromisos.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-reservations.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30026,
    "questionNumber": 26,
    "question": "A security engineer determined that an existing application retrieves credentials to an Amazon RDS for MySQL database from an encrypted file in Amazon S3. For the next version of the application, the security engineer wants to implement the following application design changes to improve security: The database must use strong, randomly generated passwords stored in a secure AWS managed service. The application resources must be deployed through AWS CloudFormation. The application must rotate credentials for the database every 90 days. A solutions architect will generate a CloudFormation template to deploy the application. Which resources specified in the CloudFormation template will meet the security engineer’s requirements with the LEAST amount of operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Generate the database password as a secret resource using AWS Secrets Manager. Create an AWS Lambda function resource to rotate the database password. Specify a Secrets Manager RotationSchedule resource to rotate the database password every 90 days.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Generate the database password as a SecureString parameter type using AWS Systems Manager Parameter Store. Create an AWS Lambda function resource to rotate the database password. Specify a Parameter Store RotationSchedule resource to rotate the database password every 90 days.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Generate the database password as a secret resource using AWS Secrets Manager. Create an AWS Lambda function resource to rotate the database password. Create an Amazon EventBridge scheduled rule resource to trigger the Lambda function password rotation every 90 days.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Generate the database password as a SecureString parameter type using AWS Systems Manager Parameter Store. Specify an AWS AppSync DataSource resource to automatically rotate the database password every 90 days.",
        "isCorrect": false
      }
    ],
    "comments": "Se necesitan contraseñas fuertes y aleatorias en un servicio gestionado seguro, despliegue por CloudFormation y rotación cada 90 días, con el MENOR overhead.\n\nOpción A (Correcta): Generar la contraseña como un recurso secreto de AWS Secrets Manager (soporta generación de contraseñas aleatorias y su recurso RotationSchedule nativo). Con una Lambda de rotación y un recurso Secrets Manager RotationSchedule a 90 días, la rotación es gestionada de forma nativa e integrada con RDS. Mínimo overhead.\n\nOpción B: Parameter Store SecureString NO tiene un recurso 'RotationSchedule' nativo; no ofrece rotación gestionada de credenciales como Secrets Manager. Inválido.\n\nOpción C: Aunque usa Secrets Manager, orquestar la rotación con una regla programada de EventBridge en vez del RotationSchedule nativo añade componentes y overhead innecesarios frente a A.\n\nOpción D: Parameter Store no rota credenciales, y AppSync DataSource no rota contraseñas de BD. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-secretsmanager-rotationschedule.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30027,
    "questionNumber": 27,
    "question": "A company is storing data in several Amazon DynamoDB tables. A solutions architect must use a serverless architecture to make the data accessible publicly through a simple API over HTTPS. The solution must scale automatically in response to demand. Which solutions meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon API Gateway REST API. Configure this API with direct integrations to DynamoDB by using API Gateway’s AWS integration type.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an Amazon API Gateway HTTP API. Configure this API with direct integrations to Dynamo DB by using API Gateway’s AWS integration type.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon API Gateway HTTP API. Configure this API with integrations to AWS Lambda functions that return data from the DynamoDB tables.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an accelerator in AWS Global Accelerator. Configure this accelerator with AWS Lambda@Edge function integrations that return data from the DynamoDB tables.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Create a Network Load Balancer. Configure listener rules to forward requests to the appropriate AWS Lambda functions.",
        "isCorrect": false
      }
    ],
    "comments": "Exponer datos de DynamoDB públicamente por una API HTTPS sencilla, serverless y con autoescalado.\n\nOpción A (Correcta): API Gateway REST API con integración directa a DynamoDB usando el tipo de integración AWS (service integration). Es serverless, escala automáticamente y no requiere Lambda.\n\nOpción B: Las HTTP APIs de API Gateway NO soportan el tipo de integración 'AWS' directa a servicios como DynamoDB (solo Lambda y HTTP/proxies). Por eso B es inválida y C sí.\n\nOpción C (Correcta): API Gateway HTTP API con integraciones a funciones Lambda que devuelven datos de DynamoDB. Serverless, escala automáticamente. A y C son las dos soluciones válidas.\n\nOpción D: Global Accelerator no integra Lambda@Edge de esa forma ni expone una 'API' sobre DynamoDB. Incorrecta.\n\nOpción E: Un NLB con reglas de listener hacia Lambda no es un patrón de API pública sencilla sobre DynamoDB (además NLB no invoca Lambda como target HTTP de API). Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/integrating-api-with-aws-services-dynamodb.html\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30028,
    "questionNumber": 28,
    "question": "A company has registered 10 new domain names. The company uses the domains for online marketing. The company needs a solution that will redirect online visitors to a specific URL for each domain. All domains and target URLs are defined in a JSON document. All DNS records are managed by Amazon Route 53. A solutions architect must implement a redirect service that accepts HTTP and HTTPS requests. Which combination of steps should the solutions architect take to meet these requirements with the LEAST amount of operational effort? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a dynamic webpage that runs on an Amazon EC2 instance. Configure the webpage to use the JSON document in combination with the event message to look up and respond with a redirect URL.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Application Load Balancer that includes HTTP and HTTPS listeners.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an AWS Lambda function that uses the JSON document in combination with the event message to look up and respond with a redirect URL.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use an Amazon API Gateway API with a custom domain to publish an AWS Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Create an Amazon CloudFront distribution. Deploy a Lambda@Edge function.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Create an SSL certificate by using AWS Certificate Manager (ACM). Include the domains as Subject Alternative Names.",
        "isCorrect": true
      }
    ],
    "comments": "Servicio de redirección para 10 dominios (URLs en un JSON), que acepte HTTP y HTTPS, con el MENOR esfuerzo operativo.\n\nOpción A: Una webpage dinámica en EC2 introduce servidores que gestionar; más overhead que serverless.\n\nOpción B (Correcta): Un Application Load Balancer con listeners HTTP y HTTPS recibe las peticiones de los dominios.\n\nOpción C (Correcta): Una función Lambda que usa el JSON y el mensaje del evento para buscar y responder con la URL de redirección implementa la lógica sin servidores (el ALB puede invocar Lambda como target).\n\nOpción D: Un API Gateway con dominio personalizado es una alternativa, pero la combinación pedida (ALB + Lambda + ACM) es más directa para HTTP/HTTPS multi-dominio con menos piezas.\n\nOpción E: CloudFront + Lambda@Edge también redirige, pero la combinación B+C+F (ALB+Lambda+certificado ACM con SAN) es la solución de menor esfuerzo evaluada aquí.\n\nOpción F (Correcta): Un certificado SSL de ACM que incluya los dominios como Subject Alternative Names (SAN) permite al ALB terminar HTTPS para los 10 dominios con un único certificado. B + C + F.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html\nhttps://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30029,
    "questionNumber": 29,
    "question": "A company that has multiple AWS accounts is using AWS Organizations. The company’s AWS accounts host VPCs, Amazon EC2 instances, and containers. The company’s compliance team has deployed a security tool in each VPC where the company has deployments. The security tools run on EC2 instances and send information to the AWS account that is dedicated for the compliance team. The company has tagged all the compliance-related resources with a key of “costCenter” and a value or “compliance”. The company wants to identify the cost of the security tools that are running on the EC2 instances so that the company can charge the compliance team’s AWS account. The cost calculation must be as accurate as possible. What should a solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "In the management account of the organization, activate the costCenter user-defined tag. Configure monthly AWS Cost and Usage Reports to save to an Amazon S3 bucket in the management account. Use the tag breakdown in the report to obtain the total cost for the costCenter tagged resources.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "In the member accounts of the organization, activate the costCenter user-defined tag. Configure monthly AWS Cost and Usage Reports to save to an Amazon S3 bucket in the management account. Schedule a monthly AWS Lambda function to retrieve the reports and calculate the total cost for the costCenter tagged resources.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "In the member accounts of the organization activate the costCenter user-defined tag. From the management account, schedule a monthly AWS Cost and Usage Report. Use the tag breakdown in the report to calculate the total cost for the costCenter tagged resources.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a custom report in the organization view in AWS Trusted Advisor. Configure the report to generate a monthly billing summary for the costCenter tagged resources in the compliance team’s AWS account.",
        "isCorrect": false
      }
    ],
    "comments": "Se quiere calcular con la MAYOR precisión el coste de recursos etiquetados costCenter=compliance repartidos por cuentas de la organización, para cobrárselo a la cuenta de compliance.\n\nOpción A (Correcta): Las etiquetas de asignación de costes definidas por el usuario (como costCenter) SOLO se activan desde la cuenta de GESTIÓN (management account) de la organización, y una vez activadas aparecen en los AWS Cost and Usage Reports (CUR). Configurando el CUR mensual en un bucket S3 de la cuenta de gestión y usando el desglose por la etiqueta costCenter se obtiene el coste total exacto. Es el método correcto y preciso.\n\nOpción B/C: Activar la etiqueta 'en las cuentas miembro' es incorrecto: la activación de cost allocation tags es una acción de la cuenta de gestión, no de las miembro. Además B añade una Lambda innecesaria.\n\nOpción D: Trusted Advisor no genera un informe de facturación por etiqueta de coste; no es la herramienta para este cálculo preciso.\n\nReferencias:\nhttps://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html\nhttps://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30030,
    "questionNumber": 30,
    "question": "A company has 50 AWS accounts that are members of an organization in AWS Organizations. Each account contains multiple VPCs. The company wants to use AWS Transit Gateway to establish connectivity between the VPCs in each member account. Each time a new member account is created, the company wants to automate the process of creating a new VPC and a transit gateway attachment. Which combination of steps will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "From the management account, share the transit gateway with member accounts by using AWS Resource Access Manager.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "From the management account, share the transit gateway with member accounts by using an AWS Organizations SCP.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Launch an AWS CloudFormation stack set from the management account that automatically creates a new VPC and a VPC transit gateway attachment in a member account. Associate the attachment with the transit gateway in the management account by using the transit gateway ID.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Launch an AWS CloudFormation stack set from the management account that automatically creates a new VPC and a peering transit gateway attachment in a member account. Share the attachment with the transit gateway in the management account by using a transit gateway service-linked role.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "From the management account, share the transit gateway with member accounts by using AWS Service Catalog.",
        "isCorrect": false
      }
    ],
    "comments": "Conectar VPC de cuentas miembro con Transit Gateway y automatizar, al crear cada cuenta, un nuevo VPC y su attachment al TGW.\n\nOpción A (Correcta): Desde la cuenta de gestión se comparte el transit gateway con las cuentas miembro usando AWS Resource Access Manager (RAM). Es el mecanismo soportado para compartir un TGW entre cuentas y poder crear attachments desde ellas.\n\nOpción B: Un SCP de Organizations restringe permisos, no comparte recursos como un TGW. Incorrecta.\n\nOpción C (Correcta): Un CloudFormation StackSet lanzado desde la cuenta de gestión crea automáticamente un nuevo VPC y un VPC transit gateway attachment en la cuenta miembro, asociándolo al TGW compartido por su ID. Automatiza el aprovisionamiento en cada nueva cuenta.\n\nOpción D: 'peering transit gateway attachment' + 'transit gateway service-linked role' no es el patrón para adjuntar una VPC de una cuenta miembro a un TGW compartido; el attachment de VPC estándar sí. Descartada.\n\nOpción E: Service Catalog no comparte un TGW entre cuentas. Incorrecta. A + C.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/tgw/tgw-transit-gateways.html\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30031,
    "questionNumber": 31,
    "question": "An enterprise company wants to allow its developers to purchase third-party software through AWS Marketplace. The company uses an AWS Organizations account structure with full features enabled, and has a shared services account in each organizational unit (OU) that will be used by procurement managers. The procurement team’s policy indicates that developers should be able to obtain third-party software from an approved list only and use Private Marketplace in AWS Marketplace to achieve this requirement. The procurement team wants administration of Private Marketplace to be restricted to a role named procurement-manager-role, which could be assumed by procurement managers. Other IAM users, groups, roles, and account administrators in the company should be denied Private Marketplace administrative access. What is the MOST efficient way to design an architecture to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an IAM role named procurement-manager-role in all AWS accounts in the organization. Add the PowerUserAccess managed policy to the role. Apply an inline policy to all IAM users and roles in every AWS account to deny permissions on the AWSPrivateMarketplaceAdminFullAccess managed policy.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an IAM role named procurement-manager-role in all AWS accounts in the organization. Add the AdministratorAccess managed policy to the role. Define a permissions boundary with the AWSPrivateMarketplaceAdminFullAccess managed policy and attach it to all the developer roles.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an IAM role named procurement-manager-role in all the shared services accounts in the organization. Add the AWSPrivateMarketplaceAdminFullAccess managed policy to the role. Create an organization root-level SCP to deny permissions to administer Private Marketplace to everyone except the role named procurement-manager-role. Create another organization root-level SCP to deny permissions to create an IAM role named procurement-manager-role to everyone in the organization.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an IAM role named procurement-manager-role in all AWS accounts that will be used by developers. Add the AWSPrivateMarketplaceAdminFullAccess managed policy to the role. Create an SCP in Organizations to deny permissions to administer Private Marketplace to everyone except the role named procurement-manager-role. Apply the SCP to all the shared services accounts in the organization.",
        "isCorrect": false
      }
    ],
    "comments": "Solo procurement-manager-role (asumible por procurement managers, en las shared services accounts) debe administrar Private Marketplace; el resto debe ser denegado. Estructura Organizations con full features.\n\nOpción A: PowerUserAccess no da permisos de administración de Private Marketplace y aplicar inline policies de deny a TODOS los usuarios/roles de cada cuenta es alto mantenimiento y frágil. No es lo más eficiente.\n\nOpción B: Un permissions boundary con AWSPrivateMarketplaceAdminFullAccess sobre los roles de desarrolladores no restringe correctamente y AdministratorAccess es excesivo. No cumple limpiamente.\n\nOpción C (Correcta): Crear procurement-manager-role en las shared services accounts con la política gestionada AWSPrivateMarketplaceAdminFullAccess; un SCP a nivel raíz de la organización que DENIEGA administrar Private Marketplace a todos EXCEPTO a ese rol; y otro SCP raíz que deniega a todos crear un rol llamado procurement-manager-role (para que nadie eluda el control creando el rol). Es la solución más eficiente y segura con SCP centralizados.\n\nOpción D: Poner el rol en las cuentas de desarrolladores y aplicar el SCP solo a las shared services accounts no protege al resto de la organización ni sigue el diseño pedido.\n\nReferencias:\nhttps://docs.aws.amazon.com/marketplace/latest/buyer/private-marketplace.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30032,
    "questionNumber": 32,
    "question": "A company is in the process of implementing AWS Organizations to constrain its developers to use only Amazon EC2, Amazon S3, and Amazon DynamoDB. The developers account resides in a dedicated organizational unit (OU). The solutions architect has implemented the following SCP on the developers account: When this policy is deployed, IAM users in the developers account are still able to use AWS services that are not listed in the policy. What should the solutions architect do to eliminate the developers’ ability to use services outside the scope of this policy?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an explicit deny statement for each AWS service that should be constrained.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Remove the FullAWSAccess SCP from the developers account’s OU.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Modify the FullAWSAccess SCP to explicitly deny all services.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Add an explicit deny statement using a wildcard to the end of the SCP.",
        "isCorrect": false
      }
    ],
    "comments": "El SCP de allow-list no surte efecto porque el OU/cuenta todavía tiene adjunto el SCP FullAWSAccess por defecto, que permite todo.\n\nOpción A: Crear un deny explícito por cada servicio es inviable a escala y no es el problema (el problema es el allow amplio de FullAWSAccess). No es la solución correcta.\n\nOpción B (Correcta): Con SCPs de tipo allow-list, hay que ELIMINAR el SCP FullAWSAccess del OU de desarrolladores. FullAWSAccess concede '*' y, al ser un allow, deja pasar todo lo no denegado; con allow-list, solo se debe permitir lo listado, por lo que quitar FullAWSAccess hace que solo los servicios del SCP de allow queden permitidos. Es la corrección correcta.\n\nOpción C: 'Modificar FullAWSAccess para denegar todo' no es correcto; FullAWSAccess es una política gestionada por AWS que no se edita, y no es el enfoque.\n\nOpción D: Añadir un deny con comodín al final del SCP de allow-list bloquearía TODO (incluido lo que se quiere permitir), rompiendo el modelo. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_strategies.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30033,
    "questionNumber": 33,
    "question": "A company is hosting a monolithic REST-based API for a mobile app on five Amazon EC2 instances in public subnets of a VPC. Mobile clients connect to the API by using a domain name that is hosted on Amazon Route 53. The company has created a Route 53 multivalue answer routing policy with the IP addresses of all the EC2 instances. Recently, the app has been overwhelmed by large and sudden increases to traffic. The app has not been able to keep up with the traffic. A solutions architect needs to implement a solution so that the app can handle the new and varying load. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Separate the API into individual AWS Lambda functions. Configure an Amazon API Gateway REST API with Lambda integration for the backend. Update the Route 53 record to point to the API Gateway API.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Containerize the API logic. Create an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. Run the containers in the cluster by using Amazon EC2. Create a Kubernetes ingress. Update the Route 53 record to point to the Kubernetes ingress.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Auto Scaling group. Place all the EC2 instances in the Auto Scaling group. Configure the Auto Scaling group to perform scaling actions that are based on CPU utilization. Create an AWS Lambda function that reacts to Auto Scaling group changes and updates the Route 53 record.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Application Load Balancer (ALB) in front of the API. Move the EC2 instances to private subnets in the VPC. Add the EC2 instances as targets for the ALB. Update the Route 53 record to point to the ALB.",
        "isCorrect": true
      }
    ],
    "comments": "API REST monolítica en 5 EC2 en subredes públicas con multivalue de Route 53; se satura ante picos. Se busca manejar la carga variable con el MENOR overhead operativo.\n\nOpción A: Reescribir la API en funciones Lambda + API Gateway es una re-arquitectura importante (mucho trabajo), no 'mínimo overhead' para una app monolítica existente.\n\nOpción B: Contenerizar y montar EKS sobre EC2 es aún más complejo operativamente. Descartada.\n\nOpción C: Auto Scaling + una Lambda que actualiza registros de Route 53 con las IP de las instancias es frágil y con lógica personalizada; no es el patrón limpio ni de menor overhead.\n\nOpción D (Correcta): Poner un Application Load Balancer delante de la API, mover las EC2 a subredes privadas, registrarlas como targets del ALB y apuntar el registro de Route 53 al ALB. El ALB distribuye la carga y, con Auto Scaling, absorbe los picos con mínimo cambio arquitectónico y menor overhead operativo. Es la solución directa y de menor esfuerzo.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30034,
    "questionNumber": 34,
    "question": "A company has created an OU in AWS Organizations for each of its engineering teams. Each OU owns multiple AWS accounts. The organization has hundreds of AWS accounts. A solutions architect must design a solution so that each OU can view a breakdown of usage costs across its AWS accounts. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Cost and Usage Report (CUR) for each OU by using AWS Resource Access Manager. Allow each team to visualize the CUR through an Amazon QuickSight dashboard.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Cost and Usage Report (CUR) from the AWS Organizations management account. Allow each team to visualize the CUR through an Amazon QuickSight dashboard.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an AWS Cost and Usage Report (CUR) in each AWS Organizations member account. Allow each team to visualize the CUR through an Amazon QuickSight dashboard.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Cost and Usage Report (CUR) by using AWS Systems Manager. Allow each team to visualize the CUR through Systems Manager OpsCenter dashboards.",
        "isCorrect": false
      }
    ],
    "comments": "Cada OU (con cientos de cuentas) debe ver un desglose de costes de sus cuentas.\n\nOpción A: RAM no crea un CUR por OU; RAM comparte recursos, no genera informes de coste. Incorrecta.\n\nOpción B (Correcta): Crear un AWS Cost and Usage Report (CUR) desde la cuenta de gestión de Organizations (que tiene visibilidad de todas las cuentas) y permitir a cada equipo visualizarlo mediante un dashboard de Amazon QuickSight (filtrando por sus cuentas/OU). El CUR consolidado desde la cuenta de gestión es la fuente de datos de facturación de toda la organización.\n\nOpción C: Un CUR por cada cuenta miembro fragmenta los datos y no da el desglose por OU de forma centralizada; más complejo. Descartada.\n\nOpción D: Systems Manager no genera CUR ni OpsCenter visualiza costes. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html\nhttps://docs.aws.amazon.com/cur/latest/userguide/cur-query-quicksight.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30035,
    "questionNumber": 35,
    "question": "A company is storing data on premises on a Windows file server. The company produces 5 GB of new data daily. The company migrated part of its Windows-based workload to AWS and needs the data to be available on a file system in the cloud. The company already has established an AWS Direct Connect connection between the on-premises network and AWS. Which data migration strategy should the company use?",
    "choices": [
      {
        "letter": "A",
        "text": "Use the file gateway option in AWS Storage Gateway to replace the existing Windows file server, and point the existing file share to the new file gateway.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS DataSync to schedule a daily task to replicate data between the on-premises Windows file server and Amazon FSx.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS Data Pipeline to schedule a daily task to replicate data between the on-premises Windows file server and Amazon Elastic File System (Amazon EFS).",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS DataSync to schedule a daily task to replicate data between the on-premises Windows file server and Amazon Elastic File System (Amazon EFS).",
        "isCorrect": false
      }
    ],
    "comments": "Datos en un servidor de ficheros Windows on-premises (5 GB nuevos/día) que deben estar disponibles en un sistema de ficheros en la nube; ya hay Direct Connect.\n\nOpción A: File Gateway de Storage Gateway presenta ficheros respaldados por S3, no es un sistema de ficheros Windows nativo (SMB con compatibilidad Windows completa) equivalente a FSx; además 'reemplazar el servidor' cambia el modelo. Menos adecuada que FSx para una carga Windows.\n\nOpción B (Correcta): AWS DataSync con una tarea diaria para replicar datos entre el servidor de ficheros Windows on-premises y Amazon FSx for Windows File Server. FSx es el sistema de ficheros nativo Windows (SMB) en la nube y DataSync es el servicio de transferencia eficiente y programable. Encaja con la carga Windows.\n\nOpción C: Data Pipeline no es la herramienta de replicación de ficheros Windows→EFS y EFS es NFS (Linux), no idóneo para cargas Windows. Descartada.\n\nOpción D: DataSync a EFS lleva los datos a un sistema NFS (Linux), no al sistema Windows nativo requerido para una carga Windows. Menos adecuada que FSx.\n\nReferencias:\nhttps://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html\nhttps://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30036,
    "questionNumber": 36,
    "question": "A company’s solutions architect is reviewing a web application that runs on AWS. The application references static assets in an Amazon S3 bucket in the us-east-1 Region. The company needs resiliency across multiple AWS Regions. The company already has created an S3 bucket in a second Region. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the application to write each object to both S3 buckets. Set up an Amazon Route 53 public hosted zone with a record set by using a weighted routing policy for each S3 bucket. Configure the application to reference the objects by using the Route 53 DNS name.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Lambda function to copy objects from the S3 bucket in us-east-1 to the S3 bucket in the second Region. Invoke the Lambda function each time an object is written to the S3 bucket in us-east-1. Set up an Amazon CloudFront distribution with an origin group that contains the two S3 buckets as origins.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure replication on the S3 bucket in us-east-1 to replicate objects to the S3 bucket in the second Region. Set up an Amazon CloudFront distribution with an origin group that contains the two S3 buckets as origins.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure replication on the S3 bucket in us-east-1 to replicate objects to the S3 bucket in the second Region. If failover is required, update the application code to load S3 objects from the S3 bucket in the second Region.",
        "isCorrect": false
      }
    ],
    "comments": "Assets estáticos en S3 (us-east-1) que necesitan resiliencia multi-Región; ya hay un bucket en una segunda Región. MENOR overhead.\n\nOpción A: Escribir cada objeto en ambos buckets desde la aplicación y usar Route 53 con weighted routing añade lógica de aplicación y gestión de DNS; más overhead y frágil.\n\nOpción B: Una Lambda que copia objetos en cada escritura es más código y operación que la replicación nativa de S3. Menos eficiente que C.\n\nOpción C (Correcta): Configurar S3 Replication (Cross-Region Replication) del bucket de us-east-1 al de la segunda Región (replicación gestionada, sin código) y montar una distribución CloudFront con un origin group que contenga ambos buckets como orígenes (failover de origen automático de CloudFront). Mínimo overhead operativo y resiliencia multi-Región.\n\nOpción D: Igual replica, pero requiere cambiar el código de la aplicación para el failover manual; más overhead que el origin group de CloudFront. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30037,
    "questionNumber": 37,
    "question": "A company is hosting a three-tier web application in an on-premises environment. Due to a recent surge in traffic that resulted in downtime and a significant financial impact, company management has ordered that the application be moved to AWS. The application is written in .NET and has a dependency on a MySQL database. A solutions architect must design a scalable and highly available solution to meet the demand of 200,000 daily users. Which steps should the solutions architect take to design an appropriate solution?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Elastic Beanstalk to create a new application with a web server environment and an Amazon RDS MySQL Multi-AZ DB instance. The environment should launch a Network Load Balancer (NLB) in front of an Amazon EC2 Auto Scaling group in multiple Availability Zones. Use an Amazon Route 53 alias record to route traffic from the company’s domain to the NLB.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS CloudFormation to launch a stack containing an Application Load Balancer (ALB) in front of an Amazon EC2 Auto Scaling group spanning three Availability Zones. The stack should launch a Multi-AZ deployment of an Amazon Aurora MySQL DB cluster with a Retain deletion policy. Use an Amazon Route 53 alias record to route traffic from the company’s domain to the ALB.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS Elastic Beanstalk to create an automatically scaling web server environment that spans two separate Regions with an Application Load Balancer (ALB) in each Region. Create a Multi-AZ deployment of an Amazon Aurora MySQL DB cluster with a cross-Region read replica. Use Amazon Route 53 with a geoproximity routing policy to route traffic between the two Regions.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS CloudFormation to launch a stack containing an Application Load Balancer (ALB) in front of an Amazon ECS cluster of Spot instances spanning three Availability Zones. The stack should launch an Amazon RDS MySQL DB instance with a Snapshot deletion policy. Use an Amazon Route 53 alias record to route traffic from the company’s domain to the ALB.",
        "isCorrect": false
      }
    ],
    "comments": "App .NET con dependencia MySQL, escalable y de alta disponibilidad para 200.000 usuarios/día.\n\nOpción A: Usa un Network Load Balancer (capa 4) para una app web (mejor ALB en capa 7) y RDS MySQL Multi-AZ; funciona, pero el ALB es más apropiado para web y Aurora escala mejor. Menos idónea que B.\n\nOpción B (Correcta): CloudFormation que despliega un ALB delante de un Auto Scaling group de EC2 en TRES AZ y un clúster Aurora MySQL Multi-AZ con deletion policy Retain (protege los datos). Aurora MySQL da alta disponibilidad y escalado de lecturas, el ALB balancea en capa 7 y el ASG en 3 AZ da resiliencia. Route 53 alias apunta al ALB. Solución escalable y HA correcta.\n\nOpción C: Extenderse a DOS Regiones con geoproximity es sobre-ingeniería para el requisito (una Región con Multi-AZ basta) y más coste/complejidad.\n\nOpción D: ECS con Spot instances para la capa web arriesga interrupciones para tráfico de usuarios y RDS con Snapshot deletion policy es menos protector; menos idónea para HA de producción.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.html\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30038,
    "questionNumber": 38,
    "question": "A company is using AWS Organizations to manage multiple AWS accounts. For security purposes, the company requires the creation of an Amazon Simple Notification Service (Amazon SNS) topic that enables integration with a third-party alerting system in all the Organizations member accounts. A solutions architect used an AWS CloudFormation template to create the SNS topic and stack sets to automate the deployment of CloudFormation stacks. Trusted access has been enabled in Organizations. What should the solutions architect do to deploy the CloudFormation StackSets in all AWS accounts?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a stack set in the Organizations member accounts. Use service-managed permissions. Set deployment options to deploy to an organization. Use CloudFormation StackSets drift detection.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create stacks in the Organizations member accounts. Use self-service permissions. Set deployment options to deploy to an organization. Enable the CloudFormation StackSets automatic deployment.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a stack set in the Organizations management account. Use service-managed permissions. Set deployment options to deploy to the organization. Enable CloudFormation StackSets automatic deployment.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create stacks in the Organizations management account. Use service-managed permissions. Set deployment options to deploy to the organization. Enable CloudFormation StackSets drift detection.",
        "isCorrect": false
      }
    ],
    "comments": "Desplegar un topic SNS en TODAS las cuentas miembro con CloudFormation StackSets; trusted access habilitado en Organizations.\n\nOpción A: Crear el stack set en las cuentas MIEMBRO es incorrecto: los StackSets con permisos service-managed se crean desde la cuenta de gestión (o delegated admin), no en cada miembro.\n\nOpción B: 'self-service permissions' (self-managed) requiere roles de confianza manuales por cuenta; con Organizations y trusted access lo adecuado es service-managed. Menos apropiado.\n\nOpción C (Correcta): Crear el stack set en la cuenta de GESTIÓN de Organizations, usar permisos service-managed (aprovechando el trusted access), configurar el despliegue a toda la organización y habilitar el automatic deployment para que las cuentas nuevas reciban el stack automáticamente. Es el patrón oficial de StackSets con Organizations.\n\nOpción D: Crear 'stacks' (no stack set) en la cuenta de gestión con drift detection no despliega a todas las cuentas miembro automáticamente. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30039,
    "questionNumber": 39,
    "question": "A company wants to migrate its workloads from on premises to AWS. The workloads run on Linux and Windows. The company has a large on-premises infrastructure that consists of physical machines and VMs that host numerous applications. The company must capture details about the system configuration, system performance, running processes, and network connections of its on-premises workloads. The company also must divide the on-premises applications into groups for AWS migrations. The company needs recommendations for Amazon EC2 instance types so that the company can run its workloads on AWS in the most cost-effective manner. Which combination of steps should a solutions architect take to meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Assess the existing applications by installing AWS Application Discovery Agent on the physical machines and VMs.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Assess the existing applications by installing AWS Systems Manager Agent on the physical machines and VMs.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Group servers into applications for migration by using AWS Systems Manager Application Manager.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Group servers into applications for migration by using AWS Migration Hub.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Generate recommended instance types and associated costs by using AWS Migration Hub.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Import data about server sizes into AWS Trusted Advisor. Follow the recommendations for cost optimization.",
        "isCorrect": false
      }
    ],
    "comments": "Capturar config del sistema, rendimiento, procesos y conexiones de red de cargas on-premises (Linux/Windows, físicos y VMs), agrupar apps para migrar y obtener recomendaciones de tipos EC2 rentables.\n\nOpción A (Correcta): Instalar el AWS Application Discovery Agent en las máquinas físicas y VMs captura configuración del sistema, rendimiento, procesos en ejecución y conexiones de red. Es el agente de descubrimiento detallado.\n\nOpción B: El SSM Agent sirve para gestión operativa, no para el descubrimiento/inventario de migración con esas métricas. No es la herramienta indicada.\n\nOpción C: Systems Manager Application Manager no es donde se agrupan servidores en aplicaciones para migración.\n\nOpción D (Correcta): Agrupar servidores en aplicaciones para migración se hace en AWS Migration Hub.\n\nOpción E (Correcta): Migration Hub genera los tipos de instancia EC2 recomendados y sus costes asociados.\n\nOpción F: Trusted Advisor no importa tamaños de servidor ni da recomendaciones de instancias de migración. Incorrecta. A + D + E.\n\nReferencias:\nhttps://docs.aws.amazon.com/application-discovery/latest/userguide/discovery-agent.html\nhttps://docs.aws.amazon.com/migrationhub/latest/ug/ec2-recommendations.html",
    "category": "Migración y Modernización",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30040,
    "questionNumber": 40,
    "question": "A company is hosting an image-processing service on AWS in a VPC. The VPC extends across two Availability Zones. Each Availability Zone contains one public subnet and one private subnet. The service runs on Amazon EC2 instances in the private subnets. An Application Load Balancer in the public subnets is in front of the service. The service needs to communicate with the internet and does so through two NAT gateways. The service uses Amazon S3 for image storage. The EC2 instances retrieve approximately 1 ТВ of data from an S3 bucket each day. The company has promoted the service as highly secure. A solutions architect must reduce cloud expenditures as much as possible without compromising the service’s security posture or increasing the time spent on ongoing operations. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Replace the NAT gateways with NAT instances. In the VPC route table, create a route from the private subnets to the NAT instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Move the EC2 instances to the public subnets. Remove the NAT gateways.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Set up an S3 gateway VPC endpoint in the VPAttach an endpoint policy to the endpoint to allow the required actions on the S3 bucket.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Attach an Amazon Elastic File System (Amazon EFS) volume to the EC2 instances. Host the images on the EFS volume.",
        "isCorrect": false
      }
    ],
    "comments": "EC2 en subredes privadas descargan ~1 TB/día de S3 vía NAT gateways; hay que reducir coste sin comprometer seguridad ni añadir operación.\n\nOpción A: Sustituir NAT gateways por NAT instances traslada a servidores autogestionados (más operación y riesgo) y sigue pagando transferencia; no reduce el coste del tráfico a S3.\n\nOpción B: Mover las EC2 a subredes públicas rompe la postura de seguridad (expone las instancias). Descartada.\n\nOpción C (Correcta): Crear un S3 Gateway VPC endpoint. El tráfico a S3 deja de pasar por los NAT gateways (se evita el coste por GB de NAT y el data processing), va por la red privada de AWS sin coste de endpoint gateway, y una endpoint policy limita las acciones al bucket requerido, manteniendo/ mejorando la seguridad. Reduce mucho el gasto de ~1 TB/día sin operación adicional.\n\nOpción D: EFS no sustituye el acceso a S3 ni reduce el coste del tráfico existente; cambia el almacenamiento y añade coste. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30041,
    "questionNumber": 41,
    "question": "A company recently deployed an application on AWS. The application uses Amazon DynamoDB. The company measured the application load and configured the RCUs and WCUs on the DynamoDB table to match the expected peak load. The peak load occurs once a week for a 4-hour period and is double the average load. The application load is close to the average load for the rest of the week. The access pattern includes many more writes to the table than reads of the table. A solutions architect needs to implement a solution to minimize the cost of the table. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Application Auto Scaling to increase capacity during the peak period. Purchase reserved RCUs and WCUs to match the average load.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure on-demand capacity mode for the table.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure DynamoDB Accelerator (DAX) in front of the table. Reduce the provisioned read capacity to match the new peak load on the table.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure DynamoDB Accelerator (DAX) in front of the table. Configure on-demand capacity mode for the table.",
        "isCorrect": false
      }
    ],
    "comments": "DynamoDB con pico predecible (una vez por semana, 4 h, doble de la media) y resto cercano a la media; muchas más escrituras que lecturas. Minimizar coste.\n\nOpción A (Correcta): Usar Application Auto Scaling para subir capacidad en el periodo pico y comprar reserved capacity (RCU/WCU reservadas) para la carga media. Con carga base estable y conocida, la capacidad reservada abarata la media, y el autoscaling cubre el pico puntual. Es lo más económico para un patrón provisioned predecible.\n\nOpción B: On-demand cobra por petición y, con una carga base sostenida y alta en escrituras, suele salir más caro que provisioned con reservas para una carga predecible. No minimiza coste aquí.\n\nOpción C: DAX es una caché de LECTURAS; el patrón es mayoritariamente ESCRITURAS, así que DAX no ayuda y reducir la capacidad de lectura no aborda el coste de escritura. Incorrecta.\n\nOpción D: DAX (lecturas) + on-demand no minimiza el coste de una carga de escritura predecible. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/reservedcapacity.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30042,
    "questionNumber": 42,
    "question": "A solutions architect needs to advise a company on how to migrate its on-premises data processing application to the AWS Cloud. Currently, users upload input files through a web portal. The web server then stores the uploaded files on NAS and messages the processing server over a message queue. Each media file can take up to 1 hour to process. The company has determined that the number of media files awaiting processing is significantly higher during business hours, with the number of files rapidly declining after business hours. What is the MOST cost-effective migration recommendation?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a queue using Amazon SQS. Configure the existing web server to publish to the new queue. When there are messages in the queue, invoke an AWS Lambda function to pull requests from the queue and process the files. Store the processed files in an Amazon S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a queue using Amazon MQ. Configure the existing web server to publish to the new queue. When there are messages in the queue, create a new Amazon EC2 instance to pull requests from the queue and process the files. Store the processed files in Amazon EFS. Shut down the EC2 instance after the task is complete.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a queue using Amazon MQ. Configure the existing web server to publish to the new queue. When there are messages in the queue, invoke an AWS Lambda function to pull requests from the queue and process the files. Store the processed files in Amazon EFS.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a queue using Amazon SQS. Configure the existing web server to publish to the new queue. Use Amazon EC2 instances in an EC2 Auto Scaling group to pull requests from the queue and process the files. Scale the EC2 instances based on the SQS queue length. Store the processed files in an Amazon S3 bucket.",
        "isCorrect": true
      }
    ],
    "comments": "Procesamiento de ficheros que tarda hasta 1 h por fichero, con cola de trabajos mucho mayor en horario laboral. MÁS rentable.\n\nOpción A: Lambda tiene un límite máximo de 15 minutos de ejecución; un fichero puede tardar hasta 1 HORA, por lo que Lambda no puede procesarlo. Inválida por el timeout.\n\nOpción B: Amazon MQ es un broker gestionado (para protocolos tipo JMS/AMQP), innecesariamente pesado frente a SQS para desacoplar; crear una EC2 por mensaje y EFS es más complejo/caro. No es lo más rentable.\n\nOpción C: Igual que A, Lambda no soporta 1 h de ejecución. Inválida.\n\nOpción D (Correcta): Una cola SQS a la que publica el servidor web, e instancias EC2 en un Auto Scaling group que consumen la cola y procesan los ficheros (EC2 sí soporta trabajos largos de 1 h), escalando según la longitud de la cola SQS (más instancias en horas punta, menos al bajar la carga). Los resultados se guardan en S3. Desacoplado, elástico y rentable.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/as-using-sqs-queue.html\nhttps://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30043,
    "questionNumber": 43,
    "question": "A company is using Amazon OpenSearch Service to analyze data. The company loads data into an OpenSearch Service cluster with 10 data nodes from an Amazon S3 bucket that uses S3 Standard storage. The data resides in the cluster for 1 month for read-only analysis. After 1 month, the company deletes the index that contains the data from the cluster. For compliance purposes, the company must retain a copy of all input data. The company is concerned about ongoing costs and asks a solutions architect to recommend a new solution. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Replace all the data nodes with UltraWarm nodes to handle the expected capacity. Transition the input data from S3 Standard to S3 Glacier Deep Archive when the company loads the data into the cluster.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Reduce the number of data nodes in the cluster to 2 Add UltraWarm nodes to handle the expected capacity. Configure the indexes to transition to UltraWarm when OpenSearch Service ingests the data. Transition the input data to S3 Glacier Deep Archive after 1 month by using an S3 Lifecycle policy.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Reduce the number of data nodes in the cluster to 2. Add UltraWarm nodes to handle the expected capacity. Configure the indexes to transition to UltraWarm when OpenSearch Service ingests the data. Add cold storage nodes to the cluster Transition the indexes from UltraWarm to cold storage. Delete the input data from the S3 bucket after 1 month by using an S3 Lifecycle policy.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Reduce the number of data nodes in the cluster to 2. Add instance-backed data nodes to handle the expected capacity. Transition the input data from S3 Standard to S3 Glacier Deep Archive when the company loads the data into the cluster.",
        "isCorrect": false
      }
    ],
    "comments": "OpenSearch con 10 data nodes; los datos se consultan (solo lectura) 1 mes y luego se borra el índice; hay que retener una copia de todos los datos de entrada por compliance. Minimizar coste.\n\nOpción A: Reemplazar TODOS los data nodes por UltraWarm no es válido (se necesitan hot data nodes) y transicionar la entrada a Glacier Deep Archive al cargar no cumple bien el ciclo. Descartada.\n\nOpción B (Correcta): Reducir a 2 hot data nodes y añadir UltraWarm nodes para la capacidad; configurar los índices para transicionar a UltraWarm al ingerir (almacenamiento cálido más barato respaldado por S3 para lecturas del mes); y transicionar los datos de ENTRADA en S3 a S3 Glacier Deep Archive tras 1 mes mediante una S3 Lifecycle policy (retención barata para compliance). Minimiza coste cubriendo lectura del mes + retención de la copia.\n\nOpción C: Añadir cold storage y borrar los datos de entrada del bucket incumple 'retener una copia de todos los datos de entrada' por compliance. Descartada por el requisito.\n\nOpción D: Nodos con instance store no aportan el ahorro de UltraWarm y transicionar a Deep Archive al cargar no da lecturas eficientes durante el mes. Menos óptima.\n\nReferencias:\nhttps://docs.aws.amazon.com/opensearch-service/latest/developerguide/ultrawarm.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30044,
    "questionNumber": 44,
    "question": "A company has 10 accounts that are part of an organization in AWS Organizations. AWS Config is configured in each account. All accounts belong to either the Prod OU or the NonProd OU. The company has set up an Amazon EventBridge rule in each AWS account to notify an Amazon Simple Notification Service (Amazon SNS) topic when an Amazon EC2 security group inbound rule is created with 0.0.0.0/0 as the source. The company’s security team is subscribed to the SNS topic. For all accounts in the NonProd OU, the security team needs to remove the ability to create a security group inbound rule that includes 0.0.0.0/0 as the source. Which solution will meet this requirement with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Modify the EventBridge rule to invoke an AWS Lambda function to remove the security group inbound rule and to publish to the SNS topic. Deploy the updated rule to the NonProd OU.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Add the vpc-sg-open-only-to-authorized-ports AWS Config managed rule to the NonProd OU.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure an SCP to allow the ec2:AuthorizeSecurityGroupIngress action when the value of the aws:SourceIp condition key is not 0.0.0.0/0. Apply the SCP to the NonProd OU.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure an SCP to deny the ec2:AuthorizeSecurityGroupIngress action when the value of the aws:SourceIp condition key is 0.0.0.0/0. Apply the SCP to the NonProd OU.",
        "isCorrect": true
      }
    ],
    "comments": "Para las cuentas del OU NonProd hay que QUITAR la capacidad de crear una regla de entrada de security group con origen 0.0.0.0/0, con el MENOR overhead.\n\nOpción A: Una Lambda que borra la regla tras crearla es REACTIVA (la regla llega a existir un momento) y añade lógica/operación; no impide la acción. Más overhead y menos seguro que un control preventivo.\n\nOpción B: La regla gestionada de AWS Config vpc-sg-open-only-to-authorized-ports es DETECTIVA (evalúa cumplimiento), no impide crear la regla. No cumple 'quitar la capacidad'.\n\nOpción C: Un SCP que 'permite' la acción cuando la IP no es 0.0.0.0/0 no es la forma correcta de expresar la restricción y los SCP no evalúan bien esa condición de esa manera; además un allow no elimina permisos por sí solo.\n\nOpción D (Correcta): Un SCP que DENIEGA ec2:AuthorizeSecurityGroupIngress cuando el origen es 0.0.0.0/0, aplicado al OU NonProd, es un control PREVENTIVO que impide crear esas reglas, con el menor overhead operativo (política declarativa, sin código ni remediación). Es la mejor opción entre las dadas.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_syntax.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30045,
    "questionNumber": 45,
    "question": "A company hosts a Git repository in an on-premises data center. The company uses webhooks to invoke functionality that runs in the AWS Cloud. The company hosts the webhook logic on a set of Amazon EC2 instances in an Auto Scaling group that the company set as a target for an Application Load Balancer (ALB). The Git server calls the ALB for the configured webhooks. The company wants to move the solution to a serverless architecture. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "For each webhook, create and configure an AWS Lambda function URL. Update the Git servers to call the individual Lambda function URLs.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon API Gateway HTTP API. Implement each webhook logic in a separate AWS Lambda function. Update the Git servers to call the API Gateway endpoint.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Deploy the webhook logic to AWS App Runner. Create an ALB, and set App Runner as the target. Update the Git servers to call the ALB endpoint.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Containerize the webhook logic. Create an Amazon Elastic Container Service (Amazon ECS) cluster, and run the webhook logic in AWS Fargate. Create an Amazon API Gateway REST API, and set Fargate as the target. Update the Git servers to call the API Gateway endpoint.",
        "isCorrect": false
      }
    ],
    "comments": "Mover a serverless una lógica de webhooks (hoy EC2 en ASG detrás de un ALB) con el MENOR overhead.\n\nOpción A: Function URLs de Lambda, una por webhook, obliga a que el servidor Git llame a múltiples URLs distintas y complica la gestión; menos limpio que un único endpoint.\n\nOpción B (Correcta): Un Amazon API Gateway HTTP API con la lógica de cada webhook en una función Lambda separada, y el servidor Git llamando al endpoint de API Gateway. HTTP API es serverless, barato, escala solo y ofrece un único endpoint gestionado con enrutamiento a cada Lambda. Mínimo overhead.\n\nOpción C: App Runner + ALB introduce un balanceador y un servicio de contenedores gestionado; más piezas y coste que HTTP API + Lambda.\n\nOpción D: ECS Fargate + API Gateway REST es más complejo (contenedores, clúster) que HTTP API + Lambda para lógica de webhooks. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30046,
    "questionNumber": 46,
    "question": "A company is planning to migrate 1,000 on-premises servers to AWS. The servers run on several VMware clusters in the company’s data center. As part of the migration plan, the company wants to gather server metrics such as CPU details, RAM usage, operating system information, and running processes. The company then wants to query and analyze the data. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy and configure the AWS Agentless Discovery Connector virtual appliance on the on-premises hosts. Configure Data Exploration in AWS Migration Hub. Use AWS Glue to perform an ETL job against the data. Query the data by using Amazon S3 Select.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Export only the VM performance information from the on-premises hosts. Directly import the required data into AWS Migration Hub. Update any missing information in Migration Hub. Query the data by using Amazon QuickSight.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a script to automatically gather the server information from the on-premises hosts. Use the AWS CLI to run the put-resource-attributes command to store the detailed server data in AWS Migration Hub. Query the data directly in the Migration Hub console.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy the AWS Application Discovery Agent to each on-premises server. Configure Data Exploration in AWS Migration Hub. Use Amazon Athena to run predefined queries against the data in Amazon S3.",
        "isCorrect": true
      }
    ],
    "comments": "Migrar 1.000 servidores VMware, recopilando métricas (CPU, RAM, SO, procesos) para consultarlas y analizarlas.\n\nOpción A: El Agentless Discovery Connector recopila información a nivel de VM (rendimiento) pero NO procesos en ejecución con el detalle del agente; consultar con S3 Select es limitado. Menos completa que el agente + Athena.\n\nOpción B: Exportar solo el rendimiento de VM e importarlo pierde detalle (procesos, SO) y 'rellenar manualmente' no escala a 1.000 servidores. Descartada.\n\nOpción C: Un script + put-resource-attributes es manual, propenso a errores y no captura las métricas detalladas de forma automática. No adecuado.\n\nOpción D (Correcta): Desplegar el AWS Application Discovery Agent en cada servidor captura CPU, RAM, SO y procesos en ejecución; con Data Exploration en Migration Hub los datos se exportan a S3 y se pueden consultar con Amazon Athena (queries predefinidas). Es la solución completa para recopilar y analizar.\n\nReferencias:\nhttps://docs.aws.amazon.com/application-discovery/latest/userguide/discovery-agent.html\nhttps://docs.aws.amazon.com/application-discovery/latest/userguide/explore-data.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30047,
    "questionNumber": 47,
    "question": "A company is building a serverless application that runs on an AWS Lambda function that is attached to a VPC. The company needs to integrate the application with a new service from an external provider. The external provider supports only requests that come from public IPv4 addresses that are in an allow list. The company must provide a single public IP address to the external provider before the application can start using the new service. Which solution will give the application the ability to access the new service?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy a NAT gateway. Associate an Elastic IP address with the NAT gateway. Configure the VPC to use the NAT gateway.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Deploy an egress-only internet gateway. Associate an Elastic IP address with the egress-only internet gateway. Configure the elastic network interface on the Lambda function to use the egress-only internet gateway.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy an internet gateway. Associate an Elastic IP address with the internet gateway. Configure the Lambda function to use the internet gateway.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy an internet gateway. Associate an Elastic IP address with the internet gateway. Configure the default route in the public VPC route table to use the internet gateway.",
        "isCorrect": false
      }
    ],
    "comments": "Una Lambda en una VPC debe salir hacia un servicio externo que solo admite una única IPv4 pública fija (allow list).\n\nOpción A (Correcta): Desplegar un NAT gateway, asociarle una Elastic IP (IP pública fija) y configurar la VPC (tabla de rutas de las subredes privadas de la Lambda) para salir por el NAT gateway. Todo el tráfico saliente de la Lambda usará esa única EIP, que se entrega al proveedor externo. Es el patrón correcto para una IP de salida fija.\n\nOpción B: Un egress-only internet gateway es SOLO para IPv6, no proporciona una IPv4 pública fija. No cumple (se pide IPv4).\n\nOpción C: No se puede 'asociar una EIP a un internet gateway' ni configurar la Lambda para usar el IGW directamente con una IP única de salida; el IGW no da una IP de origen fija a instancias en subredes privadas. Incorrecta.\n\nOpción D: El internet gateway con EIP y ruta por defecto en una tabla pública no fija una única IP de salida para la Lambda en subredes privadas; el mecanismo correcto de SNAT con IP fija es el NAT gateway. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30048,
    "questionNumber": 48,
    "question": "A solutions architect has developed a web application that uses an Amazon API Gateway Regional endpoint and an AWS Lambda function. The consumers of the web application are all close to the AWS Region where the application will be deployed. The Lambda function only queries an Amazon Aurora MySQL database. The solutions architect has configured the database to have three read replicas. During testing, the application does not meet performance requirements. Under high load, the application opens a large number of database connections. The solutions architect must improve the application’s performance. Which actions should the solutions architect take to meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use the cluster endpoint of the Aurora database.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use RDS Proxy to set up a connection pool to the reader endpoint of the Aurora database.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use the Lambda Provisioned Concurrency feature.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Move the code for opening the database connection in the Lambda function outside of the event handler.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Change the API Gateway endpoint to an edge-optimized endpoint.",
        "isCorrect": false
      }
    ],
    "comments": "La Lambda abre demasiadas conexiones a Aurora bajo carga; la función solo consulta (lecturas) y hay 3 réplicas de lectura.\n\nOpción A: Usar el cluster endpoint dirige al writer (escrituras), no aprovecha las réplicas de lectura ni resuelve el exceso de conexiones. No es lo idóneo para una carga de solo lectura.\n\nOpción B (Correcta): Usar RDS Proxy para crear un pool de conexiones hacia el READER endpoint de Aurora. RDS Proxy multiplexa y reutiliza conexiones, evitando el agotamiento por la apertura masiva desde Lambda, y el reader endpoint reparte lecturas entre réplicas.\n\nOpción C: Provisioned Concurrency reduce cold starts, no el número de conexiones a la BD ni el agotamiento; no ataca la causa.\n\nOpción D (Correcta): Mover la apertura de la conexión FUERA del handler de la Lambda (a la inicialización, ámbito global) permite reutilizar la conexión entre invocaciones del mismo contenedor, reduciendo el número de conexiones abiertas. Buenas prácticas de Lambda + BD. B + D.\n\nOpción E: Un endpoint edge-optimized mejora latencia de red del API, no las conexiones de BD; además los consumidores están cerca de la Región.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/best-practices.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30049,
    "questionNumber": 49,
    "question": "A company is planning to host a web application on AWS and wants to load balance the traffic across a group of Amazon EC2 instances. One of the security requirements is to enable end-to-end encryption in transit between the client and the web server. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Place the EC2 instances behind an Application Load Balancer (ALB). Provision an SSL certificate using AWS Certificate Manager (ACM), and associate the SSL certificate with the ALB. Export the SSL certificate and install it on each EC2 instance. Configure the ALB to listen on port 443 and to forward traffic to port 443 on the instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Associate the EC2 instances with a target group. Provision an SSL certificate using AWS Certificate Manager (ACM). Create an Amazon CloudFront distribution and configure it to use the SSL certificate. Set CloudFront to use the target group as the origin server.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Place the EC2 instances behind an Application Load Balancer (ALB) Provision an SSL certificate using AWS Certificate Manager (ACM), and associate the SSL certificate with the ALB. Provision a third-party SSL certificate and install it on each EC2 instance. Configure the ALB to listen on port 443 and to forward traffic to port 443 on the instances.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Place the EC2 instances behind a Network Load Balancer (NLB). Provision a third-party SSL certificate and install it on the NLB and on each EC2 instance. Configure the NLB to listen on port 443 and to forward traffic to port 443 on the instances.",
        "isCorrect": false
      }
    ],
    "comments": "Se requiere cifrado en tránsito extremo a extremo entre cliente y servidor web, con balanceo entre EC2.\n\nOpción A: Los certificados de ACM NO se pueden exportar para instalarlos en las EC2 (ACM no permite exportar la clave privada de sus certificados públicos para uso en instancias). Por eso 'exportar el certificado ACM e instalarlo en cada EC2' es inviable.\n\nOpción B: CloudFront con la target group como 'origin' no describe una terminación TLS en el servidor web y no garantiza cifrado extremo a extremo hasta la EC2 de la forma planteada; además mezcla conceptos.\n\nOpción C (Correcta): Poner las EC2 detrás de un ALB, aprovisionar un certificado ACM y asociarlo al ALB (HTTPS en el listener 443), y aprovisionar un certificado SSL de TERCEROS instalado en cada EC2, con el ALB reenviando al puerto 443 de las instancias. Así hay TLS del cliente al ALB y TLS del ALB a la EC2: cifrado extremo a extremo. Como ACM no exporta claves para las EC2, se usa un certificado de terceros en las instancias. Es la opción correcta.\n\nOpción D: Un NLB con certificados de terceros en NLB y EC2 es posible, pero terminar/gestionar TLS en un NLB de capa 4 es menos habitual y el patrón estándar para HTTPS extremo a extremo con balanceo web es el ALB (opción C). Menos idónea.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html\nhttps://docs.aws.amazon.com/acm/latest/userguide/acm-services.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30050,
    "questionNumber": 50,
    "question": "A company wants to migrate its data analytics environment from on premises to AWS. The environment consists of two simple Node.js applications. One of the applications collects sensor data and loads it into a MySQL database. The other application aggregates the data into reports. When the aggregation jobs run, some of the load jobs fail to run correctly. The company must resolve the data loading issue. The company also needs the migration to occur without interruptions or changes for the company’s customers. What should a solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up an Amazon Aurora MySQL database as a replication target for the on-premises database. Create an Aurora Replica for the Aurora MySQL database, and move the aggregation jobs to run against the Aurora Replica. Set up collection endpoints as AWS Lambda functions behind a Network Load Balancer (NLB), and use Amazon RDS Proxy to write to the Aurora MySQL database. When the databases are synced, disable the replication job and restart the Aurora Replica as the primary instance. Point the collector DNS record to the NLB.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Set up an Amazon Aurora MySQL database. Use AWS Database Migration Service (AWS DMS) to perform continuous data replication from the on-premises database to Aurora. Move the aggregation jobs to run against the Aurora MySQL database. Set up collection endpoints behind an Application Load Balancer (ALB) as Amazon EC2 instances in an Auto Scaling group. When the databases are synced, point the collector DNS record to the ALDisable the AWS DMS sync task after the cutover from on premises to AWS.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Set up an Amazon Aurora MySQL database. Use AWS Database Migration Service (AWS DMS) to perform continuous data replication from the on-premises database to Aurora. Create an Aurora Replica for the Aurora MySQL database, and move the aggregation jobs to run against the Aurora Replica. Set up collection endpoints as AWS Lambda functions behind an Application Load Balancer (ALB), and use Amazon RDS Proxy to write to the Aurora MySQL database. When the databases are synced, point the collector DNS record to the ALB. Disable the AWS DMS sync task after the cutover from on premises to AWS.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Set up an Amazon Aurora MySQL database. Create an Aurora Replica for the Aurora MySQL database, and move the aggregation jobs to run against the Aurora Replica. Set up collection endpoints as an Amazon Kinesis data stream. Use Amazon Kinesis Data Firehose to replicate the data to the Aurora MySQL database. When the databases are synced, disable the replication job and restart the Aurora Replica as the primary instance. Point the collector DNS record to the Kinesis data stream.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar analítica (dos apps Node.js: una carga datos en MySQL, otra agrega en informes) sin interrupciones ni cambios para clientes, resolviendo que algunas cargas fallan cuando corren los jobs de agregación.\n\nCausa raíz: los jobs de agregación (lecturas pesadas) interfieren con las cargas (escrituras) en la misma BD. Solución: separar lecturas de escrituras y migrar sin cortes.\n\nOpción A: Usar un NLB para los endpoints de recolección (Lambda) y 'reiniciar la réplica como primaria' es un procedimiento de cutover extraño y frágil; no es el patrón limpio de migración continua.\n\nOpción B: Mueve la agregación contra la Aurora primaria (no separa lecturas del writer), por lo que el conflicto carga/agregación persiste; y usa EC2 en ASG (más operación). No resuelve la causa tan bien como C.\n\nOpción C (Correcta): Crear Aurora MySQL, usar AWS DMS para replicación continua desde la BD on-premises a Aurora (migración sin interrupciones), crear una Aurora Replica y mover los jobs de AGREGACIÓN a la réplica (separando las lecturas pesadas del writer, lo que evita que interfieran con las cargas/escrituras). Endpoints de recolección como Lambda detrás de un ALB, con RDS Proxy para escribir en Aurora. Tras sincronizar, se apunta el DNS del colector al ALB y se desactiva la tarea de DMS. Resuelve el fallo de cargas y migra sin cortes ni cambios para clientes.\n\nOpción D: Kinesis Data Stream/Firehose reescribe el mecanismo de ingesta (cambio para el flujo) y 'reiniciar la réplica como primaria' es frágil; no es la migración transparente pedida.\n\nReferencias:\nhttps://docs.aws.amazon.com/dms/latest/userguide/Welcome.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30051,
    "questionNumber": 51,
    "question": "A health insurance company stores personally identifiable information (PII) in an Amazon S3 bucket. The company uses server-side encryption with S3 managed encryption keys (SSE-S3) to encrypt the objects. According to a new requirement, all current and future objects in the S3 bucket must be encrypted by keys that the company’s security team manages. The S3 bucket does not have versioning enabled. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "In the S3 bucket properties, change the default encryption to SSE-S3 with a customer managed key. Use the AWS CLI to re-upload all objects in the S3 bucket. Set an S3 bucket policy to deny unencrypted PutObject requests.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "In the S3 bucket properties, change the default encryption to server-side encryption with AWS KMS managed encryption keys (SSE-KMS). Set an S3 bucket policy to deny unencrypted PutObject requests. Use the AWS CLI to re-upload all objects in the S3 bucket.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "In the S3 bucket properties, change the default encryption to server-side encryption with AWS KMS managed encryption keys (SSE-KMS). Set an S3 bucket policy to automatically encrypt objects on GetObject and PutObject requests.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "In the S3 bucket properties, change the default encryption to AES-256 with a customer managed key. Attach a policy to deny unencrypted PutObject requests to any entities that access the S3 bucket. Use the AWS CLI to re-upload all objects in the S3 bucket.",
        "isCorrect": false
      }
    ],
    "comments": "Todos los objetos (actuales y futuros) deben cifrarse con claves que gestione el equipo de seguridad. El bucket no tiene versioning.\n\nOpción A: 'SSE-S3 con customer managed key' es una contradicción: SSE-S3 usa claves gestionadas por S3, no una CMK del cliente. Para claves gestionadas por el cliente se usa SSE-KMS.\n\nOpción B (Correcta): Cambiar el cifrado por defecto del bucket a SSE-KMS (claves gestionadas en AWS KMS por el equipo de seguridad), poner una bucket policy que deniegue PutObject sin cifrado, y re-subir todos los objetos existentes con la AWS CLI para que se re-cifren con KMS (como no hay versioning, se sobrescriben). Cumple 'actuales y futuros' con claves gestionadas por seguridad.\n\nOpción C: SSE-KMS es correcto, pero 'cifrar automáticamente en GetObject/PutObject mediante bucket policy' no re-cifra los objetos ya existentes; los objetos actuales seguirían con SSE-S3. No cumple 'todos los actuales'.\n\nOpción D: 'AES-256 con customer managed key' mezcla conceptos (AES-256 es SSE-S3); no es la forma de usar KMS. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30052,
    "questionNumber": 52,
    "question": "A company is running a web application in the AWS Cloud. The application consists of dynamic content that is created on a set of Amazon EC2 instances. The EC2 instances run in an Auto Scaling group that is configured as a target group for an Application Load Balancer (ALB). The company is using an Amazon CloudFront distribution to distribute the application globally. The CloudFront distribution uses the ALB as an origin. The company uses Amazon Route 53 for DNS and has created an A record of www.example.com for the CloudFront distribution. A solutions architect must configure the application so that itis highly available and fault tolerant. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Provision a full, secondary application deployment in a different AWS Region. Update the Route 53 A record to be a failover record. Add both of the CloudFront distributions as values. Create Route 53 health checks.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Provision an ALB, an Auto Scaling group, and EC2 instances in a different AWS Region. Update the CloudFront distribution, and create a second origin for the new ALCreate an origin group for the two origins. Configure one origin as primary and one origin as secondary.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Provision an Auto Scaling group and EC2 instances in a different AWS Region. Create a second target for the new Auto Scaling group in the ALB. Set up the failover routing algorithm on the ALB.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Provision a full, secondary application deployment in a different AWS Region. Create a second CloudFront distribution, and add the new application setup as an origin. Create an AWS Global Accelerator accelerator. Add both of the CloudFront distributions as endpoints.",
        "isCorrect": false
      }
    ],
    "comments": "App con contenido dinámico en EC2/ASG detrás de un ALB, con CloudFront delante (ALB como origin) y Route 53 A record. Se busca HA y tolerancia a fallos.\n\nOpción A: Dos distribuciones CloudFront como valores de un failover A record es innecesariamente complejo; CloudFront ya es global y el failover se resuelve mejor con origin groups.\n\nOpción B (Correcta): Aprovisionar ALB + ASG + EC2 en otra Región, añadir a la distribución CloudFront un segundo origin (el nuevo ALB) y crear un origin group con un origin primario y otro secundario. CloudFront hace failover de origen automático a la segunda Región si el primario falla. Es el patrón limpio de HA/tolerancia a fallos con una sola distribución CloudFront.\n\nOpción C: 'Failover routing algorithm on the ALB' no existe; un ALB no hace failover entre Regiones. Incorrecta.\n\nOpción D: Un segundo CloudFront + Global Accelerator con distribuciones CloudFront como endpoints no es un patrón válido (GA no usa CloudFront como endpoint). Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistS3AndCustomOrigins.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30053,
    "questionNumber": 53,
    "question": "A company has an organization in AWS Organizations that has a large number of AWS accounts. One of the AWS accounts is designated as a transit account and has a transit gateway that is shared with all of the other AWS accounts. AWS Site-to-Site VPN connections are configured between all of the company’s global offices and the transit account. The company has AWS Config enabled on all of its accounts. The company’s networking team needs to centrally manage a list of internal IP address ranges that belong to the global offices. Developers will reference this list to gain access to their applications securely. Which solution meets these requirements with the LEAST amount of operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a JSON file that is hosted in Amazon S3 and that lists all of the internal IP address ranges. Configure an Amazon Simple Notification Service (Amazon SNS) topic in each of the accounts that can be invoked when the JSON file is updated. Subscribe an AWS Lambda function to the SNS topic to update all relevant security group rules with the updated IP address ranges.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a new AWS Config managed rule that contains all of the internal IP address ranges. Use the rule to check the security groups in each of the accounts to ensure compliance with the list of IP address ranges. Configure the rule to automatically remediate any noncompliant security group that is detected.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "In the transit account, create a VPC prefix list with all of the internal IP address ranges. Use AWS Resource Access Manager to share the prefix list with all of the other accounts. Use the shared prefix list to configure security group rules in the other accounts.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "In the transit account, create a security group with all of the internal IP address ranges. Configure the security groups in the other accounts to reference the transit account’s security group by using a nested security group reference of “ /sg-1a2b3c4d”.",
        "isCorrect": false
      }
    ],
    "comments": "Gestionar centralmente una lista de rangos IP internos de las oficinas para que los developers la referencien en sus security groups, con el MENOR overhead.\n\nOpción A: Un JSON en S3 + SNS + Lambda que actualiza reglas de SG en cada cuenta es una solución con código y mantenimiento en todas las cuentas; mucho overhead.\n\nOpción B: Una regla gestionada de AWS Config comprueba cumplimiento pero no es una 'lista central de rangos IP' referenciable en reglas de SG; no es el mecanismo pedido.\n\nOpción C (Correcta): En la cuenta de tránsito, crear una VPC prefix list (managed prefix list) con todos los rangos IP internos y compartirla con las demás cuentas usando AWS Resource Access Manager (RAM). Los security groups de las otras cuentas referencian la prefix list compartida; al actualizar la lista central, todas las reglas que la referencian se actualizan solas. Mínimo overhead y gestión centralizada.\n\nOpción D: Referenciar un SG de otra cuenta requiere peering/misma VPC y no es una 'lista de rangos IP' gestionable centralmente de esta forma; no aplica bien entre muchas cuentas.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/managed-prefix-lists.html\nhttps://docs.aws.amazon.com/vpc/latest/userguide/sharing-managed-prefix-lists.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30054,
    "questionNumber": 54,
    "question": "A company runs a new application as a static website in Amazon S3. The company has deployed the application to a production AWS account and uses Amazon CloudFront to deliver the website. The website calls an Amazon API Gateway REST API. An AWS Lambda function backs each API method. The company wants to create a CSV report every 2 weeks to show each API Lambda function’s recommended configured memory, recommended cost, and the price difference between current configurations and the recommendations. The company will store the reports in an S3 bucket. Which solution will meet these requirements with the LEAST development time?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a Lambda function that extracts metrics data for each API Lambda function from Amazon CloudWatch Logs for the 2-week period. Collate the data into tabular format. Store the data as a .csv file in an S3 bucket. Create an Amazon EventBridge rule to schedule the Lambda function to run every 2 weeks.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Opt in to AWS Compute Optimizer. Create a Lambda function that calls the ExportLambdaFunctionRecommendations operation. Export the .csv file to an S3 bucket. Create an Amazon EventBridge rule to schedule the Lambda function to run every 2 weeks.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Opt in to AWS Compute Optimizer. Set up enhanced infrastructure metrics. Within the Compute Optimizer console, schedule a job to export the Lambda recommendations to a .csv file. Store the file in an S3 bucket every 2 weeks.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Purchase the AWS Business Support plan for the production account. Opt in to AWS Compute Optimizer for AWS Trusted Advisor checks. In the Trusted Advisor console, schedule a job to export the cost optimization checks to a .csv file. Store the file in an S3 bucket every 2 weeks.",
        "isCorrect": false
      }
    ],
    "comments": "Generar cada 2 semanas un CSV con la memoria recomendada, el coste recomendado y la diferencia de precio de cada Lambda, con el MENOR tiempo de desarrollo.\n\nOpción A: Extraer métricas de CloudWatch Logs y calcular recomendaciones a mano es mucho desarrollo (lógica de recomendación propia). No es lo de menor desarrollo.\n\nOpción B (Correcta): Activar AWS Compute Optimizer (que ya genera recomendaciones de memoria/coste para Lambda) y una Lambda que llame a la operación ExportLambdaFunctionRecommendations para exportar el CSV a S3, programada con una regla de EventBridge cada 2 semanas. Reutiliza las recomendaciones ya calculadas por Compute Optimizer: mínimo desarrollo.\n\nOpción C: Compute Optimizer no ofrece un 'job programado en consola' para exportar cada 2 semanas; la exportación programada se hace con la API/Lambda (opción B).\n\nOpción D: Comprar Business Support y usar Trusted Advisor no es la vía para las recomendaciones de Lambda ni tiene ese export programado; más coste y no encaja.\n\nReferencias:\nhttps://docs.aws.amazon.com/compute-optimizer/latest/ug/getting-started.html\nhttps://docs.aws.amazon.com/compute-optimizer/latest/ug/exporting-recommendations.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30055,
    "questionNumber": 55,
    "question": "A company’s factory and automation applications are running in a single VPC. More than 20 applications run on a combination of Amazon EC2, Amazon Elastic Container Service (Amazon ECS), and Amazon RDS. The company has software engineers spread across three teams. One of the three teams owns each application, and each time is responsible for the cost and performance of all of its applications. Team resources have tags that represent their application and team. The teams use IAM access for daily activities. The company needs to determine which costs on the monthly AWS bill are attributable to each application or team. The company also must be able to create reports to compare costs from the last 12 months and to help forecast costs for the next 12 months. A solutions architect must recommend an AWS Billing and Cost Management solution that provides these cost reports. Which combination of actions will meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Activate the user-define cost allocation tags that represent the application and the team.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Activate the AWS generated cost allocation tags that represent the application and the team.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a cost category for each application in Billing and Cost Management.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Activate IAM access to Billing and Cost Management.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Create a cost budget.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Enable Cost Explorer.",
        "isCorrect": true
      }
    ],
    "comments": "Determinar costes por aplicación/equipo (recursos etiquetados), comparar 12 meses y prever los próximos 12.\n\nOpción A (Correcta): Activar las cost allocation tags DEFINIDAS POR EL USUARIO que representan la aplicación y el equipo, para que el coste se pueda desglosar por esas etiquetas.\n\nOpción B: Las AWS generated tags (p. ej. aws:createdBy) no son las etiquetas de aplicación/equipo propias; no cubren el requisito. Descartada.\n\nOpción C (Correcta): Crear una cost category por aplicación en Billing and Cost Management permite agrupar y reportar costes por aplicación de forma flexible.\n\nOpción D: Activar el acceso IAM a Billing es un tema de permisos de consola, no genera los informes de coste requeridos. No aporta al análisis.\n\nOpción E: Un budget controla/alerta sobre gasto, no genera el informe comparativo/predictivo pedido.\n\nOpción F (Correcta): Habilitar Cost Explorer proporciona los informes para comparar los últimos 12 meses y la previsión (forecast) de los próximos 12 meses. A + C + F.\n\nReferencias:\nhttps://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html\nhttps://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ce-what-is.html",
    "category": "Optimización de Costes",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30056,
    "questionNumber": 56,
    "question": "An AWS customer has a web application that runs on premises. The web application fetches data from a third-party API that is behind a firewall. The third party accepts only one public CIDR block in each client’s allow list. The customer wants to migrate their web application to the AWS Cloud. The application will be hosted on a set of Amazon EC2 instances behind an Application Load Balancer (ALB) in a VPC. The ALB is located in public subnets. The EC2 instances are located in private subnets. NAT gateways provide internet access to the private subnets. How should a solutions architect ensure that the web application can continue to call the third-party API after the migration?",
    "choices": [
      {
        "letter": "A",
        "text": "Associate a block of customer-owned public IP addresses to the VPC. Enable public IP addressing for public subnets in the VPC.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Register a block of customer-owned public IP addresses in the AWS account. Create Elastic IP addresses from the address block and assign them to the NAT gateways in the VPC.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create Elastic IP addresses from the block of customer-owned IP addresses. Assign the static Elastic IP addresses to the ALB.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Register a block of customer-owned public IP addresses in the AWS account. Set up AWS Global Accelerator to use Elastic IP addresses from the address block. Set the ALB as the accelerator endpoint.",
        "isCorrect": false
      }
    ],
    "comments": "La API de terceros solo admite UN bloque CIDR público en su allow list; tras migrar, las EC2 en subredes privadas salen por NAT gateways. Hay que mantener una IP de salida fija y conocida.\n\nOpción A: Asociar IP públicas propias a la VPC y habilitar direccionamiento público en subredes públicas no fija la IP de SALIDA de las EC2 privadas hacia la API; no aplica al tráfico saliente por NAT.\n\nOpción B (Correcta): Registrar el bloque de IP públicas propias (BYOIP) en la cuenta AWS, crear Elastic IP de ese bloque y asignarlas a los NAT gateways. Así el tráfico saliente de las EC2 privadas hacia la API de terceros sale siempre por esas EIP conocidas del bloque en la allow list. Es la forma de controlar la IP pública de salida.\n\nOpción C: Asignar EIP al ALB afecta al tráfico de ENTRADA, no a la IP de salida hacia la API de terceros. No resuelve.\n\nOpción D: Global Accelerator con el ALB de endpoint es para entrada de tráfico de clientes, no para fijar la IP de salida de las EC2 hacia la API externa.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html\nhttps://docs.aws.amazon.com/vpc/latest/userguide/vpc-byoip.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30057,
    "questionNumber": 57,
    "question": "A company with several AWS accounts is using AWS Organizations and service control policies (SCPs). An administrator created the following SCP and has attached it to an organizational unit (OU) that contains AWS account 1111-1111-1111: Developers working in account 1111-1111-1111 complain that they cannot create Amazon S3 buckets. How should the administrator address this problem?",
    "choices": [
      {
        "letter": "A",
        "text": "Add s3:CreateBucket with “Allow” effect to the SCP.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Remove the account from the OU, and attach the SCP directly to account 1111-1111-1111.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Instruct the developers to add Amazon S3 permissions to their IAM entities.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Remove the SCP from account 1111-1111-1111.",
        "isCorrect": false
      }
    ],
    "comments": "Un SCP restringe permisos MÁXIMOS pero NO concede permisos; los desarrolladores no pueden crear buckets porque, aunque el SCP lo permita, sus entidades IAM no tienen el permiso s3:CreateBucket.\n\nOpción A: Añadir s3:CreateBucket con Allow al SCP no concede el permiso a los usuarios; los SCP solo delimitan, no otorgan. No resuelve.\n\nOpción B: Sacar la cuenta del OU y adjuntar el SCP directamente no cambia que a los usuarios IAM les falta el permiso. No es la causa.\n\nOpción C (Correcta): Los SCP definen el límite máximo, pero los permisos EFECTIVOS los dan las políticas IAM de identidad. Hay que instruir a los desarrolladores para que añadan permisos de Amazon S3 (s3:CreateBucket) a sus entidades IAM. Con el SCP permitiendo S3 y la política IAM otorgándolo, ya pueden crear buckets.\n\nOpción D: Quitar el SCP no es necesario ni correcto; el problema es la falta de permiso IAM, no el SCP en sí.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30058,
    "questionNumber": 58,
    "question": "A company has a monolithic application that is critical to the company’s business. The company hosts the application on an Amazon EC2 instance that runs Amazon Linux 2. The company’s application team receives a directive from the legal department to back up the data from the instance’s encrypted Amazon Elastic Block Store (Amazon EBS) volume to an Amazon S3 bucket. The application team does not have the administrative SSH key pair for the instance. The application must continue to serve the users. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Attach a role to the instance with permission to write to Amazon S3. Use the AWS Systems Manager Session Manager option to gain access to the instance and run commands to copy data into Amazon S3.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an image of the instance with the reboot option turned on. Launch a new EC2 instance from the image. Attach a role to the new instance with permission to write to Amazon S3. Run a command to copy data into Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Take a snapshot of the EBS volume by using Amazon Data Lifecycle Manager (Amazon DLM). Copy the data to Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an image of the instance. Launch a new EC2 instance from the image. Attach a role to the new instance with permission to write to Amazon S3. Run a command to copy data into Amazon S3.",
        "isCorrect": false
      }
    ],
    "comments": "Hay que copiar datos del volumen EBS cifrado de una instancia crítica a S3, sin tener la clave SSH y sin dejar de servir a los usuarios.\n\nOpción A (Correcta): Adjuntar a la instancia un rol con permiso de escritura en S3 y usar AWS Systems Manager Session Manager para acceder a la instancia (sin SSH ni clave) y ejecutar comandos que copien los datos a S3. La app sigue sirviendo (no se reinicia) y no se necesita la clave SSH. Cumple todo.\n\nOpción B: Crear una imagen con reboot activado reinicia la instancia (interrumpe el servicio) y lanzar otra instancia copia datos de una imagen, no del volumen en caliente de la crítica. No cumple 'seguir sirviendo'.\n\nOpción C: Un snapshot con DLM respalda el volumen, pero 'copiar los datos a S3' desde el snapshot no es directo y no responde al requisito de copiar el contenido a S3 sin la clave; menos directo que Session Manager.\n\nOpción D: Igual que B, lanzar una instancia nueva desde una imagen no copia los datos vivos de la instancia crítica y añade pasos; Session Manager es la vía correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30059,
    "questionNumber": 59,
    "question": "A solutions architect needs to copy data from an Amazon S3 bucket m an AWS account to a new S3 bucket in a new AWS account. The solutions architect must implement a solution that uses the AWS CLI. Which combination of steps will successfully copy the data? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a bucket policy to allow the source bucket to list its contents and to put objects and set object ACLs in the destination bucket. Attach the bucket policy to the destination bucket.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a bucket policy to allow a user in the destination account to list the source bucket’s contents and read the source bucket’s objects. Attach the bucket policy to the source bucket.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an IAM policy in the source account. Configure the policy to allow a user in the source account to list contents and get objects in the source bucket, and to list contents, put objects, and set object ACLs in the destination bucket. Attach the policy to the user.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an IAM policy in the destination account. Configure the policy to allow a user in the destination account to list contents and get objects in the source bucket, and to list contents, put objects, and set objectACLs in the destination bucket. Attach the policy to the user.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Run the aws s3 sync command as a user in the source account. Specify the source and destination buckets to copy the data.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Run the aws s3 sync command as a user in the destination account. Specify the source and destination buckets to copy the data.",
        "isCorrect": true
      }
    ],
    "comments": "Copiar objetos de un bucket S3 (cuenta origen) a un bucket nuevo (cuenta destino) usando la AWS CLI. Patrón: que un usuario de la cuenta DESTINO lea el origen y escriba en el destino, con una bucket policy en el origen y una política IAM en el destino, y ejecutar 'aws s3 sync' desde el destino.\n\nOpción A: Poner en el bucket DESTINO una policy que 'permita al bucket origen listar/poner objetos' mezcla principales (los buckets no son principales); no es el mecanismo correcto.\n\nOpción B (Correcta): Crear una bucket policy en el bucket ORIGEN que permita a un usuario de la cuenta destino listar el contenido y leer los objetos del origen. (Permiso del lado del recurso origen.)\n\nOpción C: Una política IAM en la cuenta ORIGEN para un usuario del origen no sirve, porque el copiado lo ejecuta un usuario de la cuenta DESTINO.\n\nOpción D (Correcta): Crear una política IAM en la cuenta DESTINO para el usuario que ejecuta la copia, permitiéndole listar/get en el origen y listar/put/set-ACL en el destino. (Permiso del lado del principal en destino.)\n\nOpción E: Ejecutar 'aws s3 sync' como usuario del ORIGEN no encaja con el diseño (el destino tiene los permisos); F es la correcta.\n\nOpción F (Correcta): Ejecutar 'aws s3 sync' como el usuario de la cuenta DESTINO, indicando bucket origen y destino. B + D + F es la combinación válida.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/example-walkthroughs-managing-access-example2.html\nhttps://docs.aws.amazon.com/cli/latest/reference/s3/sync.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30060,
    "questionNumber": 60,
    "question": "A company built an application based on AWS Lambda deployed in an AWS CloudFormation stack. The last production release of the web application introduced an issue that resulted in an outage lasting several minutes. A solutions architect must adjust the deployment process to support a canary release. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an alias for every new deployed version of the Lambda function. Use the AWS CLI update-alias command with the routing-config parameter to distribute the load.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Deploy the application into a new CloudFormation stack. Use an Amazon Route 53 weighted routing policy to distribute the load.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a version for every new deployed Lambda function. Use the AWS CLI update-function-configuration command with the routing-config parameter to distribute the load.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure AWS CodeDeploy and use CodeDeployDefault.OneAtATime in the Deployment configuration to distribute the load.",
        "isCorrect": false
      }
    ],
    "comments": "Se quiere un canary release para una función Lambda desplegada por CloudFormation, para desplazar tráfico gradualmente y revertir rápido.\n\nOpción A (Correcta): Crear un ALIAS para cada nueva versión de la función Lambda y usar el parámetro routing-config del comando update-alias (AWS CLI) para distribuir el tráfico entre dos versiones (weighted alias routing). Esto es exactamente un canary/traffic-shifting a nivel de alias de Lambda, permitiendo enviar un pequeño porcentaje a la nueva versión y revertir cambiando los pesos.\n\nOpción B: Un nuevo stack + Route 53 weighted es a nivel de DNS/stack, más pesado y no es el mecanismo nativo de canary de Lambda.\n\nOpción C: update-function-configuration NO tiene un parámetro routing-config para repartir tráfico entre versiones; el traffic shifting se hace en el ALIAS (update-alias). Incorrecta.\n\nOpción D: CodeDeployDefault.OneAtATime es una configuración de despliegue de EC2/on-premises de CodeDeploy, no un canary de tráfico para Lambda (para Lambda se usan configuraciones Canary/Linear). No es lo pedido con la CLI de alias.\n\nReferencias:\nhttps://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/lambda-traffic-shifting-using-aliases.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30061,
    "questionNumber": 61,
    "question": "A finance company hosts a data lake in Amazon S3. The company receives financial data records over SFTP each night from several third parties. The company runs its own SFTP server on an Amazon EC2 instance in a public subnet of a VPC. After the files are uploaded, they are moved to the data lake by a cron job that runs on the same instance. The SFTP server is reachable on DNS sftp.example.com through the use of Amazon Route 53. What should a solutions architect do to improve the reliability and scalability of the SFTP solution?",
    "choices": [
      {
        "letter": "A",
        "text": "Move the EC2 instance into an Auto Scaling group. Place the EC2 instance behind an Application Load Balancer (ALB). Update the DNS record sftp.example.com in Route 53 to point to the ALB.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Migrate the SFTP server to AWS Transfer for SFTP. Update the DNS record sftp.example.com in Route 53 to point to the server endpoint hostname.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Migrate the SFTP server to a file gateway in AWS Storage Gateway. Update the DNS record sftp.example.com in Route 53 to point to the file gateway endpoint.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Place the EC2 instance behind a Network Load Balancer (NLB). Update the DNS record sftp.example.com in Route 53 to point to the NLB.",
        "isCorrect": false
      }
    ],
    "comments": "Servidor SFTP propio en una EC2 que recibe ficheros y los mueve al data lake por cron. Se busca mejorar fiabilidad y escalabilidad.\n\nOpción A: Poner la EC2 en un ASG detrás de un ALB no encaja: SFTP es un protocolo sobre TCP con estado y sesiones, y un ALB (capa 7 HTTP) no balancea SFTP; además sigue autogestionando el servidor.\n\nOpción B (Correcta): Migrar a AWS Transfer Family (AWS Transfer for SFTP), un servicio gestionado y escalable que expone un endpoint SFTP y deja los ficheros directamente en S3 (el data lake), eliminando el servidor autogestionado y el cron. Se actualiza el registro DNS sftp.example.com para apuntar al hostname del endpoint. Máxima fiabilidad/escalabilidad con mínimo mantenimiento.\n\nOpción C: File Gateway expone NFS/SMB, no SFTP; no sustituye un servidor SFTP.\n\nOpción D: Un NLB delante de una única EC2 no escala el servidor ni elimina el punto único; sigue siendo autogestionado.\n\nReferencias:\nhttps://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html\nhttps://docs.aws.amazon.com/transfer/latest/userguide/create-server-sftp.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30062,
    "questionNumber": 62,
    "question": "A company wants to migrate an application to Amazon EC2 from VMware Infrastructure that runs in an on-premises data center. A solutions architect must preserve the software and configuration settings during the migration. What should the solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the AWS DataSync agent to start replicating the data store to Amazon FSx for Windows File Server. Use the SMB share to host the VMware data store. Use VM Import/Export to move the VMs to Amazon EC2.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use the VMware vSphere client to export the application as an image in Open Virtualization Format (OVF) format. Create an Amazon S3 bucket to store the image in the destination AWS Region. Create and apply an IAM role for VM Import. Use the AWS CLI to run the EC2 import command.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Configure AWS Storage Gateway for files service to export a Common Internet File System (CIFS) share. Create a backup copy to the shared folder. Sign in to the AWS Management Console and create an AMI from the backup copy. Launch an EC2 instance that is based on the AMI.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a managed-instance activation for a hybrid environment in AWS Systems Manager. Download and install Systems Manager Agent on the on-premises VM. Register the VM with Systems Manager to be a managed instance. Use AWS Backup to create a snapshot of the VM and create an AMI. Launch an EC2 instance that is based on the AMI.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar una app desde VMware a EC2 preservando software y configuración.\n\nOpción A: DataSync a FSx y usar la SMB share 'para alojar el data store de VMware' no es el flujo de importación de VMs; mezcla servicios y no preserva la VM como imagen importable.\n\nOpción B (Correcta): Exportar la aplicación/VM desde vSphere como imagen en formato OVF, subirla a un bucket S3 en la Región destino, crear y aplicar el rol IAM para VM Import y ejecutar el comando de importación de EC2 (VM Import/Export). Esto crea una AMI/instancia preservando software y configuración de la VM original. Es el procedimiento estándar de VM Import/Export.\n\nOpción C: Storage Gateway (CIFS) + AMI desde una copia de backup no es el mecanismo de importación de VMs; no preserva la VM correctamente.\n\nOpción D: SSM managed-instance + AWS Backup para 'crear una AMI de la VM' no es cómo se importa una VM VMware a EC2 preservando el SO/config. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/vm-import/latest/userguide/vmimport-image-import.html\nhttps://docs.aws.amazon.com/vm-import/latest/userguide/vmie_prereqs.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30063,
    "questionNumber": 63,
    "question": "A video processing company has an application that downloads images from an Amazon S3 bucket, processes the images, stores a transformed image in a second S3 bucket, and updates metadata about the image in an Amazon DynamoDB table. The application is written in Node.js and runs by using an AWS Lambda function. The Lambda function is invoked when a new image is uploaded to Amazon S3. The application ran without incident for a while. However, the size of the images has grown significantly. The Lambda function is now failing frequently with timeout errors. The function timeout is set to its maximum value. A solutions architect needs to refactor the application’s architecture to prevent invocation failures. The company does not want to manage the underlying infrastructure. Which combination of steps should the solutions architect take to meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Modify the application deployment by building a Docker image that contains the application code. Publish the image to Amazon Elastic Container Registry (Amazon ECR).",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a new Amazon Elastic Container Service (Amazon ECS) task definition with a compatibility type of AWS Fargate. Configure the task definition to use the new image in Amazon Elastic Container Registry (Amazon ECR). Adjust the Lambda function to invoke an ECS task by using the ECS task definition when a new file arrives in Amazon S3.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an AWS Step Functions state machine with a Parallel state to invoke the Lambda function. Increase the provisioned concurrency of the Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a new Amazon Elastic Container Service (Amazon ECS) task definition with a compatibility type of Amazon EC2. Configure the task definition to use the new image in Amazon Elastic Container Registry (Amazon ECR). Adjust the Lambda function to invoke an ECS task by using the ECS task definition when a new file arrives in Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Modify the application to store images on Amazon Elastic File System (Amazon EFS) and to store metadata on an Amazon RDS DB instance. Adjust the Lambda function to mount the EFS file share.",
        "isCorrect": false
      }
    ],
    "comments": "La Lambda de procesamiento de imágenes falla por timeout (ya al máximo de 15 min) porque las imágenes crecieron. Hay que refactorizar sin gestionar infraestructura subyacente.\n\nOpción A (Correcta): Construir una imagen Docker con el código de la aplicación y publicarla en Amazon ECR. Es el empaquetado para ejecutar el procesamiento en contenedores.\n\nOpción B (Correcta): Crear una task definition de ECS con tipo de compatibilidad AWS Fargate (sin servidores que gestionar), usando la imagen de ECR, y ajustar la Lambda para que, al llegar un nuevo fichero a S3, invoque una tarea ECS mediante esa task definition. Fargate no tiene el límite de 15 min de Lambda y no requiere gestionar la infraestructura. A + B.\n\nOpción C: Step Functions con Parallel + más concurrencia provisionada de Lambda no elimina el límite de 15 min de Lambda; el problema es el tiempo de ejecución, no la concurrencia.\n\nOpción D: ECS con tipo de compatibilidad EC2 obliga a gestionar las instancias EC2 del clúster (infraestructura subyacente), lo que contradice 'no gestionar infraestructura'. Por eso Fargate (B) y no EC2.\n\nOpción E: EFS + RDS + montar EFS en Lambda sigue con el límite de 15 min de Lambda; no resuelve el timeout.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html\nhttps://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html",
    "category": "Migración y Modernización",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30064,
    "questionNumber": 64,
    "question": "A company has an organization in AWS Organizations. The company is using AWS Control Tower to deploy a landing zone for the organization. The company wants to implement governance and policy enforcement. The company must implement a policy that will detect Amazon RDS DB instances that are not encrypted at rest in the company’s production OU. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Turn on mandatory guardrails in AWS Control Tower. Apply the mandatory guardrails to the production OU.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Enable the appropriate guardrail from the list of strongly recommended guardrails in AWS Control Tower. Apply the guardrail to the production OU.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS Config to create a new mandatory guardrail. Apply the rule to all accounts in the production OU.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a custom SCP in AWS Control Tower. Apply the SCP to the production OU.",
        "isCorrect": false
      }
    ],
    "comments": "Con AWS Control Tower, detectar instancias RDS no cifradas en reposo en el OU de producción (control DETECTIVO).\n\nOpción A: Los guardrails obligatorios (mandatory) ya se aplican a todos los OU automáticamente y no incluyen específicamente 'detectar RDS sin cifrar'; no es el guardrail correcto para este requisito.\n\nOpción B (Correcta): Habilitar el guardrail apropiado de la lista de 'strongly recommended' de AWS Control Tower que detecta si las instancias RDS están cifradas en reposo (un control detective basado en AWS Config) y aplicarlo al OU de producción. Es la forma nativa de Control Tower para este requisito de detección.\n\nOpción C: 'Crear un guardrail mandatory con AWS Config' no es cómo funciona Control Tower (los mandatory los define AWS); además sería reinventar el guardrail existente.\n\nOpción D: Un SCP es PREVENTIVO (impide acciones), no DETECTA recursos existentes no cifrados; el requisito es detectar. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/controltower/latest/userguide/controls.html\nhttps://docs.aws.amazon.com/controltower/latest/controlreference/strongly-recommended-controls.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30065,
    "questionNumber": 65,
    "question": "A startup company hosts a fleet of Amazon EC2 instances in private subnets using the latest Amazon Linux 2 AMI. The company’s engineers rely heavily on SSH access to the instances for troubleshooting. The company’s existing architecture includes the following: • A VPC with private and public subnets, and a NAT gateway. • Site-to-Site VPN for connectivity with the on-premises environment. • EC2 security groups with direct SSH access from the on-premises environment. The company needs to increase security controls around SSH access and provide auditing of commands run by the engineers. Which strategy should a solutions architect use?",
    "choices": [
      {
        "letter": "A",
        "text": "Install and configure EC2 Instance Connect on the fleet of EC2 instances. Remove all security group rules attached to EC2 instances that allow inbound TCP on port 22. Advise the engineers to remotely access the instances by using the EC2 Instance Connect CLI.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Update the EC2 security groups to only allow inbound TCP on port 22 to the IP addresses of the engineer’s devices. Install the Amazon CloudWatch agent on all EC2 instances and send operating system audit logs to CloudWatch Logs.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Update the EC2 security groups to only allow inbound TCP on port 22 to the IP addresses of the engineer’s devices. Enable AWS Config for EC2 security group resource changes. Enable AWS Firewall Manager and apply a security group policy that automatically remediates changes to rules.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an IAM role with the AmazonSSMManagedInstanceCore managed policy attached. Attach the IAM role to all the EC2 instances. Remove all security group rules attached to the EC2 instances that allow inbound TCP on port 22. Have the engineers install the AWS Systems Manager Session Manager plugin for their devices and remotely access the instances by using the start-session API call from Systems Manager.",
        "isCorrect": true
      }
    ],
    "comments": "Aumentar el control de acceso SSH a EC2 en subredes privadas y auditar los comandos de los ingenieros.\n\nOpción A: EC2 Instance Connect está pensado para instancias con IP pública/acceso desde consola y no ofrece auditoría de comandos ni funciona igual en subredes privadas sin más; no cubre la auditoría de comandos.\n\nOpción B: Restringir el puerto 22 a IP de los ingenieros + CloudWatch agent mejora algo, pero sigue dependiendo de SSH directo (puerto 22 abierto) y no da la auditoría centralizada de comandos de Session Manager.\n\nOpción C: Restringir el puerto 22 + Config + Firewall Manager gestiona cambios de reglas, pero mantiene SSH directo y no aporta la auditoría de comandos requerida.\n\nOpción D (Correcta): Crear un rol IAM con la política AmazonSSMManagedInstanceCore y adjuntarlo a las EC2, ELIMINAR todas las reglas de entrada en el puerto 22 (se cierra SSH directo) y que los ingenieros usen AWS Systems Manager Session Manager (start-session) para acceder. Session Manager no necesita puertos abiertos ni claves, y registra/audita los comandos y sesiones (logging a CloudWatch/S3). Es la solución más segura y auditable.\n\nReferencias:\nhttps://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html\nhttps://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-logging-auditing.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30066,
    "questionNumber": 66,
    "question": "A company that uses AWS Organizations allows developers to experiment on AWS. As part of the landing zone that the company has deployed, developers use their company email address to request an account. The company wants to ensure that developers are not launching costly services or running services unnecessarily. The company must give developers a fixed monthly budget to limit their AWS costs. Which combination of steps will meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an SCP to set a fixed monthly account usage limit. Apply the SCP to the developer accounts.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Budgets to create a fixed monthly budget for each developer’s account as part of the account creation process.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an SCP to deny access to costly services and components. Apply the SCP to the developer accounts.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an IAM policy to deny access to costly services and components. Apply the IAM policy to the developer accounts.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Create an AWS Budgets alert action to terminate services when the budgeted amount is reached. Configure the action to terminate all services.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Create an AWS Budgets alert action to send an Amazon Simple Notification Service (Amazon SNS) notification when the budgeted amount is reached. Invoke an AWS Lambda function to terminate all services.",
        "isCorrect": true
      }
    ],
    "comments": "Dar a los developers un presupuesto mensual fijo y evitar que lancen servicios costosos o innecesarios.\n\nOpción A: Un SCP NO puede fijar un 'límite mensual de uso/gasto'; los SCP restringen acciones, no importes. Inválido para presupuesto.\n\nOpción B (Correcta): Usar AWS Budgets para crear un presupuesto mensual fijo por cada cuenta de developer como parte de la creación de la cuenta. Es el servicio de presupuestos.\n\nOpción C (Correcta): Un SCP que DENIEGA el acceso a servicios/componentes costosos, aplicado a las cuentas de developers, impide de forma preventiva que lancen esos servicios caros.\n\nOpción D: Una política IAM de deny se aplica a entidades IAM y es más difícil de gobernar centralmente que un SCP a nivel de cuenta/OU; el control organizativo correcto es el SCP (C).\n\nOpción E: Una acción de Budgets que 'termine todos los servicios' al alcanzar el importe es peligrosa y no es una acción soportada tal cual; no es la práctica recomendada.\n\nOpción F (Correcta): Una alerta de AWS Budgets que envíe una notificación SNS al alcanzar el importe e invoque una Lambda para actuar (p. ej. detener servicios) es el mecanismo de acción soportado ante el umbral. B + C + F.\n\nReferencias:\nhttps://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    "category": "Optimización de Costes",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30067,
    "questionNumber": 67,
    "question": "A company has applications in an AWS account that is named Source. The account is in an organization in AWS Organizations. One of the applications uses AWS Lambda functions and stores inventory data in an Amazon Aurora database. The application deploys the Lambda functions by using a deployment package. The company has configured automated backups for Aurora. The company wants to migrate the Lambda functions and the Aurora database to a new AWS account that is named Target. The application processes critical data, so the company must minimize downtime. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Download the Lambda function deployment package from the Source account. Use the deployment package and create new Lambda functions in the Target account. Share the automated Aurora DB cluster snapshot with the Target account.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Download the Lambda function deployment package from the Source account. Use the deployment package and create new Lambda functions in the Target account. Share the Aurora DB cluster with the Target account by using AWS Resource Access Manager {AWS RAM). Grant the Target account permission to clone the Aurora DB cluster.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS Resource Access Manager (AWS RAM) to share the Lambda functions and the Aurora DB cluster with the Target account. Grant the Target account permission to clone the Aurora DB cluster.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Resource Access Manager (AWS RAM) to share the Lambda functions with the Target account. Share the automated Aurora DB cluster snapshot with the Target account.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar Lambdas y una base Aurora de la cuenta Source a la cuenta Target minimizando downtime.\n\nOpción A: Compartir el snapshot automático de Aurora con la cuenta Target obliga a restaurar desde snapshot (más downtime que clonar) y no minimiza tanto el corte. Menos óptima.\n\nOpción B (Correcta): Descargar el deployment package de las Lambdas y recrearlas en Target; y compartir el DB cluster de Aurora con la cuenta Target mediante AWS RAM, concediendo permiso para CLONAR el clúster. El clonado de Aurora es rápido (copy-on-write) y minimiza el downtime frente a restaurar un snapshot. Es la opción de menor corte.\n\nOpción C: No se pueden 'compartir funciones Lambda' vía RAM para ejecutarlas en otra cuenta de esa forma; el patrón es recrearlas desde el package. Incorrecta.\n\nOpción D: Compartir las Lambdas por RAM (no válido) y el snapshot automático (más downtime) no cumple. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Clone.html\nhttps://docs.aws.amazon.com/ram/latest/userguide/shareable.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30068,
    "questionNumber": 68,
    "question": "A company runs a Python script on an Amazon EC2 instance to process data. The script runs every 10 minutes. The script ingests files from an Amazon S3 bucket and processes the files. On average, the script takes approximately 5 minutes to process each file The script will not reprocess a file that the script has already processed. The company reviewed Amazon CloudWatch metrics and noticed that the EC2 instance is idle for approximately 40% of the time because of the file processing speed. The company wants to make the workload highly available and scalable. The company also wants to reduce long-term management overhead. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate the data processing script to an AWS Lambda function. Use an S3 event notification to invoke the Lambda function to process the objects when the company uploads the objects.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an Amazon Simple Queue Service (Amazon SQS) queue. Configure Amazon S3 to send event notifications to the SQS queue. Create an EC2 Auto Scaling group with a minimum size of one instance. Update the data processing script to poll the SQS queue. Process the S3 objects that the SQS message identifies.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Migrate the data processing script to a container image. Run the data processing container on an EC2 instance. Configure the container to poll the S3 bucket for new objects and to process the resulting objects.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Migrate the data processing script to a container image that runs on Amazon Elastic Container Service (Amazon ECS) on AWS Fargate. Create an AWS Lambda function that calls the Fargate RunTaskAPI operation when the container processes the file. Use an S3 event notification to invoke the Lambda function.",
        "isCorrect": false
      }
    ],
    "comments": "Un script Python en EC2 procesa ficheros de S3 cada 10 min (5 min/fichero, sin reprocesar), con la EC2 ociosa ~40%. Se busca HA, escalable, menos gestión y MÁS rentable.\n\nOpción A (Correcta): Migrar el script a una función Lambda invocada por una S3 event notification al subir cada objeto. Serverless (sin gestionar servidores), escala automáticamente con la carga, es HA por diseño y solo se paga por ejecución (elimina el 40% de tiempo ocioso de la EC2). El procesado de 5 min cabe en el límite de 15 min de Lambda. Máxima rentabilidad y mínima gestión.\n\nOpción B: SQS + ASG con mínimo 1 instancia sigue manteniendo EC2 (gestión y coste base). Menos rentable que Lambda por evento.\n\nOpción C: Un contenedor en una EC2 que hace polling mantiene servidor y overhead; no reduce el ocioso ni la gestión.\n\nOpción D: ECS Fargate + Lambda que llama RunTask es más complejo que una simple Lambda por evento S3, para un trabajo de 5 min que cabe en Lambda. Sobredimensionado.\n\nReferencias:\nhttps://docs.aws.amazon.com/lambda/latest/dg/with-s3.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30069,
    "questionNumber": 69,
    "question": "A financial services company in North America plans to release a new online web application to its customers on AWS. The company will launch the application in the us-east-1 Region on Amazon EC2 instances. The application must be highly available and must dynamically scale to meet user traffic. The company also wants to implement a disaster recovery environment for the application in the us-west-1 Region by using active-passive failover. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a VPC in us-east-1 and a VPC in us-west-1. Configure VPC peering. In the us-east-1 VPC, create an Application Load Balancer (ALB) that extends across multiple Availability Zones in both VPCs. Create an Auto Scaling group that deploys the EC2 instances across the multiple Availability Zones in both VPCs. Place the Auto Scaling group behind the ALB.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a VPC in us-east-1 and a VPC in us-west-1. In the us-east-1 VPC, create an Application Load Balancer (ALB) that extends across multiple Availability Zones in that VPC. Create an Auto Scaling group that deploys the EC2 instances across the multiple Availability Zones in the us-east-1 VPC. Place the Auto Scaling group behind the ALSet up the same configuration in the us-west-1 VPC. Create an Amazon Route 53 hosted zone. Create separate records for each ALEnable health checks to ensure high availability between Regions.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a VPC in us-east-1 and a VPC in us-west-1. In the us-east-1 VPC, create an Application Load Balancer (ALB) that extends across multiple Availability Zones in that VPCreate an Auto Scaling group that deploys the EC2 instances across the multiple Availability Zones in the us-east-1 VPPlace the Auto Scaling group behind the ALB. Set up the same configuration in the us-west-1 VPCreate an Amazon Route 53 hosted zone. Create separate records for each ALB. Enable health checks and configure a failover routing policy for each record.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create a VPC in us-east-1 and a VPC in us-west-1. Configure VPC peering. In the us-east-1 VPC, create an Application Load Balancer (ALB) that extends across multiple Availability Zones in both VPCs. Create an Auto Scaling group that deploys the EC2 instances across the multiple Availability Zones in both VPCs. Place the Auto Scaling group behind the ALB. Create an Amazon Route 53 hosted zone. Create a record for the ALB.",
        "isCorrect": false
      }
    ],
    "comments": "App HA con autoescalado en us-east-1 y DR activo-pasivo en us-west-1.\n\nOpción A: Un ALB no puede 'extenderse' a AZ de otra Región ni a dos VPC; un ALB es regional. Inválido.\n\nOpción B: Configura ambas Regiones y health checks, pero 'registros separados con health checks' sin política de FAILOVER describe más un activo-activo/HA entre Regiones, no el activo-pasivo pedido.\n\nOpción C (Correcta): Crear la misma configuración (ALB + ASG multi-AZ) en us-east-1 y en us-west-1, una hosted zone de Route 53 con registros separados por cada ALB, habilitar health checks y configurar una política de enrutamiento FAILOVER por registro (primario us-east-1, secundario us-west-1). Da HA con autoescalado en cada Región y DR activo-pasivo por failover DNS. Es la solución correcta.\n\nOpción D: Un solo ALB que 'se extiende a ambas VPC/Regiones' no es posible (ALB regional) y un único record no da failover activo-pasivo. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30070,
    "questionNumber": 70,
    "question": "A company has an environment that has a single AWS account. A solutions architect is reviewing the environment to recommend what the company could improve specifically in terms of access to the AWS Management Console. The company’s IT support workers currently access the console for administrative tasks, authenticating with named IAM users that have been mapped to their job role. The IT support workers no longer want to maintain both their Active Directory and IAM user accounts. They want to be able to access the console by using their existing Active Directory credentials. The solutions architect is using AWS IAM Identity Center (AWS Single Sign-On) to implement this functionality. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an organization in AWS Organizations. Turn on the IAM Identity Center feature in Organizations. Create and configure a directory in AWS Directory Service for Microsoft Active Directory (AWS Managed Microsoft AD) with a two-way trust to the company’s on-premises Active Directory. Configure IAM Identity Center and set the AWS Managed Microsoft AD directory as the identity source. Create permission sets and map them to the existing groups within the AWS Managed Microsoft AD directory.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an organization in AWS Organizations. Turn on the IAM Identity Center feature in Organizations. Create and configure an AD Connector to connect to the company’s on-premises Active Directory. Configure IAM Identity Center and select the AD Connector as the identity source. Create permission sets and map them to the existing groups within the company’s Active Directory.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an organization in AWS Organizations. Turn on all features for the organization. Create and configure a directory in AWS Directory Service for Microsoft Active Directory (AWS Managed Microsoft AD) with a two-way trust to the company’s on-premises Active Directory. Configure IAM Identity Center and select the AWS Managed Microsoft AD directory as the identity source. Create permission sets and map them to the existing groups within the AWS Managed Microsoft AD directory.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an organization in AWS Organizations. Turn on all features for the organization. Create and configure an AD Connector to connect to the company’s on-premises Active Directory. Configure IAM Identity Center and set the AD Connector as the identity source. Create permission sets and map them to the existing groups within the company’s Active Directory.",
        "isCorrect": false
      }
    ],
    "comments": "Los trabajadores de IT quieren acceder a la consola con sus credenciales de Active Directory on-premises existentes, sin mantener también usuarios IAM, con IAM Identity Center y de la forma MÁS rentable.\n\nOpción A: AWS Managed Microsoft AD con trust bidireccional al AD on-premises implica desplegar y pagar un directorio gestionado completo; más caro que AD Connector cuando ya existe el AD on-premises.\n\nOpción B (Correcta): Crear la organización, activar IAM Identity Center, y configurar un AD Connector que conecta con el AD on-premises existente (es un gateway que redirige las peticiones al AD self-managed SIN cachear en la nube, más barato que Managed AD). Seleccionar el AD Connector como identity source de IAM Identity Center y crear permission sets mapeados a los grupos del AD. Los usuarios inician sesión con sus credenciales AD existentes. Es la opción de MENOR coste.\n\nOpción C: Igual que A (Managed Microsoft AD), más caro; además 'turn on all features' no es lo que abarata (Identity Center ya requiere all features, pero el coste lo marca Managed AD vs AD Connector).\n\nOpción D: Usa AD Connector (bien), pero 'turn on all features' es correcto y no es el diferenciador; frente a B, ambas usan AD Connector. La opción canónica de la comunidad y AWS para el menor coste con AD Connector es B (activar la feature de Identity Center en Organizations). Se elige B como respuesta de menor coste con AD Connector.\n\nReferencias:\nhttps://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-ad.html\nhttps://docs.aws.amazon.com/directoryservice/latest/admin-guide/directory_ad_connector.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30071,
    "questionNumber": 71,
    "question": "A video streaming company recently launched a mobile app for video sharing. The app uploads various files to an Amazon S3 bucket in the us-east-1 Region. The files range in size from 1 GB to 10 GB. Users who access the app from Australia have experienced uploads that take long periods of time. Sometimes the files fail to completely upload for these users. A solutions architect must improve the app’s performance for these uploads. Which solutions will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Enable S3 Transfer Acceleration on the S3 bucket. Configure the app to use the Transfer Acceleration endpoint for uploads.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure an S3 bucket in each Region to receive the uploads. Use S3 Cross-Region Replication to copy the files to the distribution S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Set up Amazon Route 53 with latency-based routing to route the uploads to the nearest S3 bucket Region.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure the app to break the video files into chunks. Use a multipart upload to transfer files to Amazon S3.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Modify the app to add random prefixes to the files before uploading.",
        "isCorrect": false
      }
    ],
    "comments": "Usuarios en Australia suben ficheros de 1-10 GB a un bucket en us-east-1; subidas lentas y a veces fallidas. Mejorar el rendimiento de subida.\n\nOpción A (Correcta): Habilitar S3 Transfer Acceleration en el bucket y usar su endpoint acelerado para las subidas. Transfer Acceleration usa la red edge de CloudFront para acelerar transferencias de larga distancia (Australia → us-east-1). Ideal para este caso.\n\nOpción B: Un bucket por Región + Cross-Region Replication cambia la arquitectura y no acelera la subida inicial del usuario lejano; añade complejidad. No es la mejora directa.\n\nOpción C: Route 53 latency-based hacia 'el bucket más cercano' implica múltiples buckets regionales; no es el mecanismo de aceleración de subida a un bucket concreto. Descartada.\n\nOpción D (Correcta): Trocear los ficheros y usar multipart upload mejora el rendimiento y la fiabilidad de subidas grandes (partes en paralelo, reintento por parte), reduciendo fallos en ficheros de varios GB. A + D.\n\nOpción E: Prefijos aleatorios ayudaban al rendimiento de particionado antiguo de S3, pero ya no es necesario y no acelera la subida de larga distancia. No aplica.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30072,
    "questionNumber": 72,
    "question": "An application is using an Amazon RDS for MySQL Multi-AZ DB instance in the us-east-1 Region. After a failover test, the application lost the connections to the database and could not re-establish the connections. After a restart of the application, the application re-established the connections. A solutions architect must implement a solution so that the application can re-establish connections to the database without requiring a restart. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon Aurora MySQL Serverless v1 DB instance. Migrate the RDS DB instance to the Aurora Serverless v1 DB instance. Update the connection settings in the application to point to the Aurora reader endpoint.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an RDS proxy. Configure the existing RDS endpoint as a target. Update the connection settings in the application to point to the RDS proxy endpoint.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a two-node Amazon Aurora MySQL DB cluster. Migrate the RDS DB instance to the Aurora DB cluster. Create an RDS proxy. Configure the existing RDS endpoint as a target. Update the connection settings in the application to point to the RDS proxy endpoint.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Amazon S3 bucket. Export the database to Amazon S3 by using AWS Database Migration Service (AWS DMS). Configure Amazon Athena to use the S3 bucket as a data store. Install the latest Open Database Connectivity (ODBC) driver for the application. Update the connection settings in the application to point to the Athena endpoint",
        "isCorrect": false
      }
    ],
    "comments": "Tras un failover de RDS MySQL Multi-AZ, la app pierde las conexiones y no las restablece sin reiniciar. Hay que permitir reconexión sin reiniciar la app.\n\nOpción A: Migrar a Aurora Serverless v1 y apuntar al reader endpoint es un cambio grande y no aborda directamente la reconexión tras failover; además el reader es para lecturas.\n\nOpción B (Correcta): Crear un RDS Proxy con el endpoint RDS existente como target y apuntar la app al endpoint del proxy. RDS Proxy mantiene un pool de conexiones y gestiona el failover de forma transparente: durante un failover, preserva las conexiones de la aplicación y las reencamina a la nueva instancia, evitando tener que reiniciar la app. Es la solución mínima y correcta.\n\nOpción C: Migrar a un clúster Aurora de dos nodos + RDS Proxy funciona, pero migrar a Aurora es innecesario; basta con poner RDS Proxy delante del RDS MySQL existente (opción B). Sobredimensionado.\n\nOpción D: Exportar a S3 con DMS y usar Athena convierte la BD transaccional en analítica; no tiene sentido para una app que necesita conexiones a MySQL. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.howitworks.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30073,
    "questionNumber": 73,
    "question": "A company is building a solution in the AWS Cloud. Thousands or devices will connect to the solution and send data. Each device needs to be able to send and receive data in real time over the MQTT protocol. Each device must authenticate by using a unique X.509 certificate. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up AWS IoT Core. For each device, create a corresponding Amazon MQ queue and provision a certificate. Connect each device to Amazon MQ.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a Network Load Balancer (NLB) and configure it with an AWS Lambda authorizer. Run an MQTT broker on Amazon EC2 instances in an Auto Scaling group. Set the Auto Scaling group as the target for the NLConnect each device to the NLB.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Set up AWS IoT Core. For each device, create a corresponding AWS IoT thing and provision a certificate. Connect each device to AWS IoT Core.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Set up an Amazon API Gateway HTTP API and a Network Load Balancer (NLB). Create integration between API Gateway and the NLB. Configure a mutual TLS certificate authorizer on the HTTP API. Run an MQTT broker on an Amazon EC2 instance that the NLB targets. Connect each device to the NLB.",
        "isCorrect": false
      }
    ],
    "comments": "Miles de dispositivos que envían/reciben en tiempo real por MQTT y se autentican con un certificado X.509 único cada uno, con el MENOR overhead.\n\nOpción A: AWS IoT Core es correcto, pero crear una cola Amazon MQ por dispositivo es un despropósito operativo (miles de colas) y Amazon MQ no es el broker para este patrón masivo de dispositivos. Overhead enorme.\n\nOpción B: Un broker MQTT autogestionado en EC2/ASG detrás de un NLB con Lambda authorizer implica operar el broker, la autenticación por certificado y el escalado a mano. Mucho overhead.\n\nOpción C (Correcta): Usar AWS IoT Core, crear un 'thing' por dispositivo y aprovisionar un certificado X.509 por dispositivo, conectando cada uno a IoT Core. IoT Core es un broker MQTT gestionado y escalable con autenticación mutua por certificados X.509 nativa, en tiempo real, sin servidores que gestionar. Mínimo overhead.\n\nOpción D: API Gateway HTTP + NLB + broker MQTT en EC2 con mutual TLS es autogestionado y complejo; IoT Core lo resuelve de forma nativa. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html\nhttps://docs.aws.amazon.com/iot/latest/developerguide/x509-client-certs.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30074,
    "questionNumber": 74,
    "question": "A company is running several workloads in a single AWS account. A new company policy states that engineers can provision only approved resources and that engineers must use AWS CloudFormation to provision these resources. A solutions architect needs to create a solution to enforce the new restriction on the IAM role that the engineers use for access. What should the solutions architect do to create the solution?",
    "choices": [
      {
        "letter": "A",
        "text": "Upload AWS CloudFormation templates that contain approved resources to an Amazon S3 bucket. Update the IAM policy for the engineers’ IAM role to only allow access to Amazon S3 and AWS CloudFormation. Use AWS CloudFormation templates to provision resources.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Update the IAM policy for the engineers’ IAM role with permissions to only allow provisioning of approved resources and AWS CloudFormation. Use AWS CloudFormation templates to create stacks with approved resources.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Update the IAM policy for the engineers’ IAM role with permissions to only allow AWS CloudFormation actions. Create a new IAM policy with permission to provision approved resources, and assign the policy to a new IAM service role. Assign the IAM service role to AWS CloudFormation during stack creation.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Provision resources in AWS CloudFormation stacks. Update the IAM policy for the engineers’ IAM role to only allow access to their own AWS CloudFormation stack.",
        "isCorrect": false
      }
    ],
    "comments": "Obligar a que los ingenieros solo aprovisionen recursos aprobados y SOLO mediante CloudFormation, restringiendo su rol IAM.\n\nOpción A: Restringir el rol a S3 + CloudFormation y subir plantillas a S3 no impide que, si el rol tuviera permisos, se creen recursos fuera; además no separa los permisos de aprovisionamiento del usuario. No cumple bien.\n\nOpción B: Dar al rol de los ingenieros permisos para 'aprovisionar recursos aprobados y CloudFormation' significa que el propio rol puede crear recursos directamente (no solo vía CloudFormation). No fuerza el uso exclusivo de CloudFormation.\n\nOpción C (Correcta): Actualizar la política del rol de los ingenieros para permitir SOLO acciones de CloudFormation (no pueden crear recursos directamente). Crear una política aparte con permiso para aprovisionar los recursos aprobados y asignarla a un IAM SERVICE ROLE, que se pasa a CloudFormation al crear el stack. Así CloudFormation (con su service role) crea los recursos aprobados, y los ingenieros solo pueden operar a través de CloudFormation. Es el patrón correcto (roles de servicio de CloudFormation).\n\nOpción D: Restringir a los ingenieros a 'su propio stack' no limita los recursos que se crean ni obliga a recursos aprobados. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/control-access-with-iam.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30075,
    "questionNumber": 75,
    "question": "A solutions architect is designing the data storage and retrieval architecture for a new application that a company will be launching soon. The application is designed to ingest millions of small records per minute from devices all around the world. Each record is less than 4 KB in size and needs to be stored in a durable location where it can be retrieved with low latency. The data is ephemeral and the company is required to store the data for 120 days only, after which the data can be deleted. The solutions architect calculates that, during the course of a year, the storage requirements would be about 10-15 TB. Which storage strategy is the MOST cost-effective and meets the design requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Design the application to store each incoming record as a single .csv file in an Amazon S3 bucket to allow for indexed retrieval. Configure a lifecycle policy to delete data older than 120 days.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Design the application to store each incoming record in an Amazon DynamoDB table properly configured for the scale. Configure the DynamoDB Time to Live (TTL) feature to delete records older than 120 days.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Design the application to store each incoming record in a single table in an Amazon RDS MySQL database. Run a nightly cron job that runs a query to delete any records older than 120 days.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Design the application to batch incoming records before writing them to an Amazon S3 bucket. Update the metadata for the object to contain the list of records in the batch and use the Amazon S3 metadata search feature to retrieve the data. Configure a lifecycle policy to delete the data after 120 days.",
        "isCorrect": false
      }
    ],
    "comments": "Millones de registros pequeños (<4 KB) por minuto, almacenamiento durable con recuperación de baja latencia, datos efímeros retenidos solo 120 días, 10-15 TB/año. MÁS rentable.\n\nOpción A: Un fichero .csv por registro en S3 genera millones de objetos diminutos (sobrecoste de peticiones/gestión) y S3 no da la recuperación indexada de baja latencia por registro que se pide. No es lo idóneo.\n\nOpción B (Correcta): Almacenar cada registro en una tabla DynamoDB bien dimensionada (maneja millones de escrituras/min de items pequeños con baja latencia y es durable) y usar la función TTL de DynamoDB para borrar automáticamente los registros de más de 120 días. Es la opción rentable que cumple durabilidad, baja latencia y expiración automática.\n\nOpción C: RDS MySQL con un cron nocturno de borrado no escala a millones de inserciones por minuto y añade gestión; más caro y menos escalable.\n\nOpción D: Agrupar en lotes en S3 y usar 'búsqueda por metadatos de S3' no existe como recuperación de baja latencia por registro; S3 no ofrece búsqueda de metadatos así. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30076,
    "questionNumber": 76,
    "question": "A retail company is hosting an ecommerce website on AWS across multiple AWS Regions. The company wants the website to be operational at all times for online purchases. The website stores data in an Amazon RDS for MySQL DB instance. Which solution will provide the HIGHEST availability for the database?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure automated backups on Amazon RDS. In the case of disruption, promote an automated backup to be a standalone DB instance. Direct database traffic to the promoted DB instance. Create a replacement read replica that has the promoted DB instance as its source.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure global tables and read replicas on Amazon RDS. Activate the cross-Region scope. In the case of disruption, use AWS Lambda to copy the read replicas from one Region to another Region.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure global tables and automated backups on Amazon RDS. In the case of disruption, use AWS Lambda to copy the read replicas from one Region to another Region.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure read replicas on Amazon RDS. In the case of disruption, promote a cross-Region and read replica to be a standalone DB instance. Direct database traffic to the promoted DB instance. Create a replacement read replica that has the promoted DB instance as its source.",
        "isCorrect": true
      }
    ],
    "comments": "Web multi-Región que debe estar siempre operativa; datos en RDS for MySQL. MÁXIMA disponibilidad de la base de datos.\n\nOpción A: Promover un backup automático a instancia standalone es un proceso lento (RTO alto) y no da alta disponibilidad multi-Región continua.\n\nOpción B/C: 'global tables' es una función de DynamoDB, NO de RDS MySQL; RDS no tiene global tables. Ambas son técnicamente inválidas para RDS MySQL.\n\nOpción D (Correcta): Configurar read replicas en RDS (incluida una cross-Region) y, ante una interrupción, promover la read replica cross-Region a instancia standalone, dirigir el tráfico a ella y crear una nueva read replica con esa como origen. Es el mecanismo de RDS MySQL para dar la mayor disponibilidad/DR multi-Región (las cross-Region read replicas permiten failover a otra Región). Correcta entre las opciones dadas.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30077,
    "questionNumber": 77,
    "question": "Example Corp. has an on-premises data center and a VPC named VPC A in the Example Corp. AWS account. The on-premises network connects to VPC A through an AWS Site-To-Site VPN. The on-premises servers can properly access VPC A. Example Corp. just acquired AnyCompany, which has a VPC named VPC B. There is no IP address overlap among these networks. Example Corp. has peered VPC A and VPC B. Example Corp. wants to connect from its on-premise servers to VPC B. Example Corp. has properly set up the network ACL and security groups. Which solution will meet this requirement with the LEAST operational effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a transit gateway. Attach the Site-to-Site VPN, VPC A, and VPC B to the transit gateway. Update the transit gateway route tables for all networks to add IP range routes for all other networks.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a transit gateway. Create a Site-to-Site VPN connection between the on-premises network and VPC B, and connect the VPN connection to the transit gateway. Add a route to direct traffic to the peered VPCs, and add an authorization rule to give clients access to the VPCs A and B.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Update the route tables for the Site-to-Site VPN and both VPCs for all three networks. Configure BGP propagation for all three networks. Wait for up to 5 minutes for BGP propagation to finish.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Modify the Site-to-Site VPN’s virtual private gateway definition to include VPC A and VPC B. Split the two routers of the virtual private getaway between the two VPCs.",
        "isCorrect": false
      }
    ],
    "comments": "On-premises llega a VPC A por Site-to-Site VPN; VPC A y VPC B están peered; se quiere llegar desde on-premises a VPC B con el MENOR esfuerzo. El peering NO es transitivo, por lo que el tráfico de la VPN no cruza de VPC A a VPC B por el peering.\n\nOpción A (Correcta): Crear un Transit Gateway y adjuntar la Site-to-Site VPN, VPC A y VPC B al TGW; actualizar las route tables del TGW para añadir rutas a todas las redes. El TGW enruta de forma transitiva entre on-premises y ambas VPC, resolviendo el problema con el menor esfuerzo operativo (un hub central en lugar de VPNs/peerings adicionales).\n\nOpción B: Crear una segunda VPN dedicada a VPC B es más trabajo y coste que centralizar en un TGW; además mezcla conceptos de Client VPN ('authorization rule'). Menos eficiente.\n\nOpción C: El peering de VPC no es transitivo aunque se toquen route tables/BGP; no se puede propagar así. Incorrecta técnicamente.\n\nOpción D: Un virtual private gateway se asocia a UNA VPC; no se puede 'incluir VPC A y VPC B' ni repartir routers entre VPC. Inválido.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html\nhttps://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30078,
    "questionNumber": 78,
    "question": "A company recently completed the migration from an on-premises data center to the AWS Cloud by using a replatforming strategy. One of the migrated servers is running a legacy Simple Mail Transfer Protocol (SMTP) service that a critical application relies upon. The application sends outbound email messages to the company’s customers. The legacy SMTP server does not support TLS encryption and uses TCP port 25. The application can use SMTP only. The company decides to use Amazon Simple Email Service (Amazon SES) and to decommission the legacy SMTP server. The company has created and validated the SES domain. The company has lifted the SES limits. What should the company do to modify the application to send email messages from Amazon SES?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the application to connect to Amazon SES by using TLS Wrapper. Create an IAM role that has ses:SendEmail and ses:SendRawEmail permissions. Attach the IAM role to an Amazon EC2 instance.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure the application to connect to Amazon SES by using STARTTLS. Obtain Amazon SES SMTP credentials. Use the credentials to authenticate with Amazon SES.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Configure the application to use the SES API to send email messages. Create an IAM role that has ses:SendEmail and ses:SendRawEmail permissions. Use the IAM role as a service role for Amazon SES.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure the application to use AWS SDKs to send email messages. Create an IAM user for Amazon SES. Generate API access keys. Use the access keys to authenticate with Amazon SES.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar el envío de correo a Amazon SES; la app solo habla SMTP. Dominio SES validado y límites levantados.\n\nOpción A: TLS Wrapper es un método de conexión SMTP de SES válido, pero la autenticación SMTP de SES usa CREDENCIALES SMTP específicas, no un rol IAM adjunto a EC2; 'IAM role con ses:SendEmail' aplica a la API, no al endpoint SMTP. Mezcla conceptos.\n\nOpción B (Correcta): Configurar la app para conectar a Amazon SES por SMTP usando STARTTLS y obtener las credenciales SMTP de SES para autenticarse. Es el método correcto cuando la aplicación solo puede hablar SMTP: SES expone un endpoint SMTP que soporta STARTTLS (puerto 587/2587) y se autentica con credenciales SMTP de SES.\n\nOpción C: Usar la API de SES contradice 'la app solo puede usar SMTP'. No aplica.\n\nOpción D: Usar los SDK/API con access keys tampoco es SMTP; la app no puede usar la API. Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/ses/latest/dg/send-email-smtp.html\nhttps://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30079,
    "questionNumber": 79,
    "question": "A company recently acquired several other companies. Each company has a separate AWS account with a different billing and reporting method. The acquiring company has consolidated all the accounts into one organization in AWS Organizations. However, the acquiring company has found it difficult to generate a cost report that contains meaningful groups for all the teams. The acquiring company’s finance team needs a solution to report on costs for all the companies through a self-managed application. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Cost and Usage Report for the organization. Define tags and cost categories in the report. Create a table in Amazon Athena. Create an Amazon QuickSight dataset based on the Athena table. Share the dataset with the finance team.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an AWS Cost and Usage Report for the organization. Define tags and cost categories in the report. Create a specialized template in AWS Cost Explorer that the finance department will use to build reports.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon QuickSight dataset that receives spending information from the AWS Price List Query API. Share the dataset with the finance team.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use the AWS Price List Query API to collect account spending information. Create a specialized template in AWS Cost Explorer that the finance department will use to build reports.",
        "isCorrect": false
      }
    ],
    "comments": "Informe de costes con grupos significativos para todos los equipos/empresas de la organización, consumible por una aplicación autogestionada del equipo de finanzas.\n\nOpción A (Correcta): Crear un AWS Cost and Usage Report (CUR) para la organización con tags y cost categories, cargarlo en una tabla de Amazon Athena, crear un dataset de Amazon QuickSight sobre esa tabla y compartirlo con finanzas. El CUR es el dato más granular; Athena+QuickSight permite una aplicación de informes autogestionada y flexible con grupos significativos. Es la solución correcta.\n\nOpción B: Cost Explorer no ofrece 'plantillas especializadas' para construir una aplicación autogestionada de informes con la granularidad del CUR; es más limitado para este caso.\n\nOpción C/D: La Price List Query API devuelve PRECIOS de servicios, no el GASTO real de las cuentas; no sirve para reportar costes incurridos. Incorrectas.\n\nReferencias:\nhttps://docs.aws.amazon.com/cur/latest/userguide/cur-query-athena.html\nhttps://docs.aws.amazon.com/cur/latest/userguide/cur-query-quicksight.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30080,
    "questionNumber": 80,
    "question": "A company runs an IoT platform on AWS. IoT sensors in various locations send data to the company’s Node.js API servers on Amazon EC2 instances running behind an Application Load Balancer. The data is stored in an Amazon RDS MySQL DB instance that uses a 4 TB General Purpose SSD volume. The number of sensors the company has deployed in the field has increased over time, and is expected to grow significantly. The API servers are consistently overloaded and RDS metrics show high write latency. Which of the following steps together will resolve the issues permanently and enable growth as new sensors are provisioned, while keeping this platform cost-efficient? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Resize the MySQL General Purpose SSD storage to 6 TB to improve the volume’s IOPS.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Re-architect the database tier to use Amazon Aurora instead of an RDS MySQL DB instance and add read replicas.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Leverage Amazon Kinesis Data Streams and AWS Lambda to ingest and process the raw data.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use AWS X-Ray to analyze and debug application issues and add more API servers to match the load.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Re-architect the database tier to use Amazon DynamoDB instead of an RDS MySQL DB instance.",
        "isCorrect": true
      }
    ],
    "comments": "Plataforma IoT: sensores en crecimiento, API servers sobrecargados y RDS MySQL con alta latencia de escritura. Resolver permanentemente y permitir crecimiento, de forma rentable.\n\nOpción A: Ampliar el gp2 a 6 TB solo sube IOPS proporcionalmente; es un parche que no resuelve el patrón de ingesta masiva de escrituras a largo plazo.\n\nOpción B: Migrar a Aurora + read replicas ayuda con LECTURAS, pero el problema es la ALTA LATENCIA DE ESCRITURA por ingesta masiva; las réplicas de lectura no aceleran las escrituras. No resuelve la causa.\n\nOpción C (Correcta): Usar Amazon Kinesis Data Streams + AWS Lambda para ingerir y procesar los datos crudos desacopla la ingesta de alto volumen del almacenamiento, absorbe picos y escala con los sensores. Alivia los API servers y la presión de escritura.\n\nOpción D: X-Ray depura, no resuelve la escalabilidad; añadir API servers no arregla la latencia de escritura de RDS. Descartada.\n\nOpción E (Correcta): Re-arquitectar el almacén a Amazon DynamoDB, diseñado para escrituras masivas de items de telemetría IoT con escalado y baja latencia consistentes, eliminando el cuello de botella de escritura de RDS. C + E resuelven ingesta y almacenamiento de forma escalable y rentable.\n\nReferencias:\nhttps://docs.aws.amazon.com/streams/latest/dev/introduction.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-modeling-nosql.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30081,
    "questionNumber": 81,
    "question": "A company is building an electronic document management system in which users upload their documents. The application stack is entirely serverless and runs on AWS in the eu-central-1 Region. The system includes a web application that uses an Amazon CloudFront distribution for delivery with Amazon S3 as the origin. The web application communicates with Amazon API Gateway Regional endpoints. The API Gateway APIs call AWS Lambda functions that store metadata in an Amazon Aurora Serverless database and put the documents into an S3 bucket. The company is growing steadily and has completed a proof of concept with its largest customer. The company must improve latency outside of Europe. Which combination of actions will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Enable S3 Transfer Acceleration on the S3 bucket. Ensure that the web application uses the Transfer Acceleration signed URLs.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an accelerator in AWS Global Accelerator. Attach the accelerator to the CloudFront distribution.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Change the API Gateway Regional endpoints to edge-optimized endpoints.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Provision the entire stack in two other locations that are spread across the world. Use global databases on the Aurora Serverless cluster.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Add an Amazon RDS proxy between the Lambda functions and the Aurora Serverless database.",
        "isCorrect": false
      }
    ],
    "comments": "Stack serverless en eu-central-1 (CloudFront+S3, API Gateway Regional+Lambda+Aurora Serverless). Mejorar la latencia FUERA de Europa.\n\nOpción A (Correcta): Habilitar S3 Transfer Acceleration en el bucket y usar URLs firmadas de Transfer Acceleration acelera la subida/entrega de objetos S3 para usuarios lejanos usando la red edge.\n\nOpción B: No se puede 'adjuntar un accelerator de Global Accelerator a una distribución CloudFront'; GA y CloudFront no se acoplan así. Inválido.\n\nOpción C (Correcta): Cambiar los endpoints Regional de API Gateway a edge-optimized enruta las peticiones de API a través de la red edge de CloudFront, reduciendo la latencia para clientes fuera de la Región. A + C mejoran latencia global con cambios mínimos.\n\nOpción D: Aprovisionar todo el stack en dos ubicaciones más con Aurora global es una reingeniería costosa y compleja; excesivo frente a A+C.\n\nOpción E: RDS Proxy mejora la gestión de conexiones, no la latencia geográfica para usuarios lejanos.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-endpoint-types.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30082,
    "questionNumber": 82,
    "question": "An adventure company has launched a new feature on its mobile app. Users can use the feature to upload their hiking and rafting photos and videos anytime. The photos and videos are stored in Amazon S3 Standard storage in an S3 bucket and are served through Amazon CloudFront. The company needs to optimize the cost of the storage. A solutions architect discovers that most of the uploaded photos and videos are accessed infrequently after 30 days. However, some of the uploaded photos and videos are accessed frequently after 30 days. The solutions architect needs to implement a solution that maintains millisecond retrieval availability of the photos and videos at the lowest possible cost. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure S3 Intelligent-Tiering on the S3 bucket.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure an S3 Lifecycle policy to transition image objects and video objects from S3 Standard to S3 Glacier Deep Archive after 30 days.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Replace Amazon S3 with an Amazon Elastic File System (Amazon EFS) file system that is mounted on Amazon EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Add a Cache-Control: max-age header to the S3 image objects and S3 video objects. Set the header to 30 days.",
        "isCorrect": false
      }
    ],
    "comments": "Fotos/vídeos con patrón de acceso mixto tras 30 días (algunos frecuentes, otros no), recuperación en milisegundos al menor coste.\n\nOpción A (Correcta): Configurar S3 Intelligent-Tiering en el bucket. Mueve automáticamente los objetos entre niveles de acceso frecuente e infrecuente según el patrón real, sin penalización de recuperación y manteniendo latencia de milisegundos. Ideal cuando el patrón es impredecible/mixto y se quiere el menor coste sin gestión.\n\nOpción B: Transicionar a Glacier Deep Archive rompe la 'recuperación en milisegundos' (Deep Archive tarda horas). No cumple el requisito de latencia.\n\nOpción C: EFS montado en EC2 es más caro y operativamente pesado que S3 para servir media; no es lo más barato.\n\nOpción D: Un header Cache-Control no cambia la clase de almacenamiento ni el coste de S3; solo afecta a la caché. No optimiza el almacenamiento.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30083,
    "questionNumber": 83,
    "question": "A company uses Amazon S3 to store files and images in a variety of storage classes. The company's S3 costs have increased substantially during the past year. A solutions architect needs to review data trends for the past 12 months and identity the appropriate storage class for the objects. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Download AWS Cost and Usage Reports for the last 12 months of S3 usage. Review AWS Trusted Advisor recommendations for cost savings.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use S3 storage class analysis. Import data trends into an Amazon QuickSight dashboard to analyze storage trends.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon S3 Storage Lens. Upgrade the default dashboard to include advanced metrics for storage trends.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use Access Analyzer for S3. Download the Access Analyzer for S3 report for the last 12 months. Import the .csv file to an Amazon QuickSight dashboard.",
        "isCorrect": false
      }
    ],
    "comments": "Revisar tendencias de 12 meses de S3 e identificar la clase de almacenamiento apropiada para los objetos.\n\nOpción A: El CUR + Trusted Advisor da facturación y recomendaciones genéricas, pero no el análisis de tendencias de uso por clase/objeto de S3 con el detalle de Storage Lens. Menos adecuado.\n\nOpción B: S3 storage class analysis analiza patrones de acceso para recomendar transiciones, pero el requisito de 'tendencias de 12 meses' y visión de toda la cuenta lo cubre mejor Storage Lens con métricas avanzadas.\n\nOpción C (Correcta): Usar Amazon S3 Storage Lens y actualizar el dashboard por defecto para incluir métricas avanzadas (advanced metrics) da visibilidad de tendencias de almacenamiento (incluido histórico y desglose por clase) para identificar la clase apropiada. Es la herramienta nativa de análisis de uso/coste de S3 a escala.\n\nOpción D: Access Analyzer for S3 evalúa ACCESO/permisos (seguridad), no tendencias de almacenamiento ni clases. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens_metrics_glossary.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30084,
    "questionNumber": 84,
    "question": "A company has its cloud infrastructure on AWS. A solutions architect needs to define the infrastructure as code. The infrastructure is currently deployed in one AWS Region. The company’s business expansion plan includes deployments in multiple Regions across multiple AWS accounts. What should the solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS CloudFormation templates. Add IAM policies to control the various accounts, Deploy the templates across the multiple Regions.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Organizations. Deploy AWS CloudFormation templates from the management account Use AWS Control Tower to manage deployments across accounts.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Organizations and AWS CloudFormation StackSets. Deploy a Cloud Formation template from an account that has the necessary IAM permissions.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use nested stacks with AWS CloudFormation templates. Change the Region by using nested stacks.",
        "isCorrect": false
      }
    ],
    "comments": "Infraestructura como código desplegada en múltiples Regiones y múltiples cuentas.\n\nOpción A: Plantillas CloudFormation con políticas IAM y despliegue por Región no automatiza el despliegue MULTI-CUENTA de forma centralizada. Insuficiente.\n\nOpción B: Organizations + desplegar plantillas desde la cuenta de gestión + Control Tower gestiona gobierno/landing zone, pero el mecanismo específico para desplegar la MISMA plantilla en muchas cuentas y Regiones son los StackSets. B no nombra StackSets.\n\nOpción C (Correcta): Usar AWS Organizations y AWS CloudFormation StackSets, desplegando una plantilla desde una cuenta con los permisos IAM necesarios. StackSets despliega y gestiona stacks en múltiples cuentas y Regiones desde un punto central, que es exactamente el requisito.\n\nOpción D: Los nested stacks organizan recursos dentro de un stack, no despliegan en múltiples cuentas/Regiones. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30085,
    "questionNumber": 85,
    "question": "A company has its cloud infrastructure on AWS. A solutions architect needs to define the infrastructure as code. The infrastructure is currently deployed in one AWS Region. The company’s business expansion plan includes deployments in multiple Regions across multiple AWS accounts. What should the solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS CloudFormation templates. Add IAM policies to control the various accounts, Deploy the templates across the multiple Regions.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Organizations. Deploy AWS CloudFormation templates from the management account Use AWS Control Tower to manage deployments across accounts.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Organizations and AWS CloudFormation StackSets. Deploy a Cloud Formation template from an account that has the necessary IAM permissions.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use nested stacks with AWS CloudFormation templates. Change the Region by using nested stacks.",
        "isCorrect": false
      }
    ],
    "comments": "(Pregunta idéntica a la anterior sobre IaC multi-Región y multi-cuenta.)\n\nOpción A: Plantillas CloudFormation + políticas IAM por Región no automatiza el despliegue multi-cuenta centralizado. Insuficiente.\n\nOpción B: Organizations + Control Tower aporta gobierno, pero el mecanismo de despliegue de la misma plantilla en muchas cuentas/Regiones son los StackSets, que B no nombra.\n\nOpción C (Correcta): AWS Organizations + AWS CloudFormation StackSets, desplegando desde una cuenta con los permisos IAM necesarios. StackSets es la solución nativa para IaC en múltiples cuentas y Regiones de forma centralizada.\n\nOpción D: Los nested stacks no despliegan en múltiples cuentas/Regiones. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30086,
    "questionNumber": 86,
    "question": "A company plans to refactor a monolithic application into a modern application design deployed on AWS. The CI/CD pipeline needs to be upgraded to support the modern design for the application with the following requirements: • It should allow changes to be released several times every hour. • It should be able to roll back the changes as quickly as possible. Which design will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy a CI/CD pipeline that incorporates AMIs to contain the application and their configurations. Deploy the application by replacing Amazon EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Specify AWS Elastic Beanstalk to stage in a secondary environment as the deployment target for the CI/CD pipeline of the application. To deploy, swap the staging and production environment URLs.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS Systems Manager to re-provision the infrastructure for each deployment. Update the Amazon EC2 user data to pull the latest code artifact from Amazon S3 and use Amazon Route 53 weighted routing to point to the new environment.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Roll out the application updates as part of an Auto Scaling event using prebuilt AMIs. Use new versions of the AMIs to add instances. and phase out all instances that use the previous AMI version with the configured termination policy during a deployment event.",
        "isCorrect": false
      }
    ],
    "comments": "CI/CD que permita liberar varias veces por hora y revertir lo más rápido posible.\n\nOpción A: Reemplazar instancias EC2 con AMIs en cada despliegue es lento (crear AMI, reemplazar instancias) y el rollback no es inmediato. No cumple 'varias veces por hora' ni rollback rápido.\n\nOpción B (Correcta): Usar AWS Elastic Beanstalk con un entorno secundario de staging como destino del pipeline y desplegar intercambiando las URLs de staging y producción (swap de CNAME, blue/green). El swap es casi instantáneo y el rollback también (se vuelve a intercambiar), permitiendo despliegues frecuentes con reversión inmediata. Cumple ambos requisitos.\n\nOpción C: Re-aprovisionar infraestructura con SSM y user data + Route 53 weighted en cada despliegue es lento y complejo; no es el rollback más rápido.\n\nOpción D: Rotar AMIs vía Auto Scaling también es lento (build de AMI, reemplazo gradual); el rollback no es inmediato.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html\nhttps://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.deploy-existing-version.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30087,
    "questionNumber": 87,
    "question": "A company has an application that runs on Amazon EC2 instances. A solutions architect is designing VPC infrastructure in an AWS Region where the application needs to access an Amazon Aurora DB Cluster. The EC2 instances are all associated with the same security group. The DB cluster is associated with its own security group. The solutions architect needs to add rules to the security groups to provide the application with least privilege access to the DB Cluster. Which combination of steps will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Add an inbound rule to the EC2 instances' security group. Specify the DB cluster's security group as the source over the default Aurora port.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Add an outbound rule to the EC2 instances' security group. Specify the DB cluster's security group as the destination over the default Aurora port.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Add an inbound rule to the DB cluster's security group. Specify the EC2 instances' security group as the source over the default Aurora port.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Add an outbound rule to the DB cluster's security group. Specify the EC2 instances' security group as the destination over the default Aurora port.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Add an outbound rule to the DB cluster's security group. Specify the EC2 instances' security group as the destination over the ephemeral ports.",
        "isCorrect": false
      }
    ],
    "comments": "Dar a las EC2 acceso de mínimo privilegio al clúster Aurora usando referencias entre security groups.\n\nPrincipio: los security groups son stateful (la respuesta al tráfico permitido se permite automáticamente), así que basta con permitir la salida desde las EC2 hacia el SG de la BD y la entrada en el SG de la BD desde el SG de las EC2, en el puerto de Aurora.\n\nOpción A: Una regla de ENTRADA en el SG de las EC2 con origen el SG de la BD no corresponde al flujo (las EC2 inician la conexión hacia la BD, no al revés). Incorrecta.\n\nOpción B (Correcta): Regla de SALIDA en el SG de las EC2 con destino el SG de la BD en el puerto de Aurora (permite a las EC2 conectar a la BD).\n\nOpción C (Correcta): Regla de ENTRADA en el SG de la BD con origen el SG de las EC2 en el puerto de Aurora (la BD acepta conexiones de las EC2). B + C es el mínimo privilegio con referencias entre SG.\n\nOpción D/E: Reglas de SALIDA en el SG de la BD no son necesarias (el tráfico de respuesta es stateful) y de ephemeral ports tampoco; añadir reglas de salida en la BD viola el mínimo privilegio.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30088,
    "questionNumber": 88,
    "question": "A company wants to change its internal cloud billing strategy for each of its business units. Currently, the cloud governance team shares reports for overall cloud spending with the head of each business unit. The company uses AWS Organizations to manage the separate AWS accounts for each business unit. The existing tagging standard in Organizations includes the application, environment, and owner. The cloud governance team wants a centralized solution so each business unit receives monthly reports on its cloud spending. The solution should also send notifications for any cloud spending that exceeds a set threshold. Which solution is the MOST cost-effective way to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure AWS Budgets in each account and configure budget alerts that are grouped by application, environment, and owner. Add each business unit to an Amazon SNS topic for each alert. Use Cost Explorer in each account to create monthly reports for each business unit.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure AWS Budgets in the organization's management account and configure budget alerts that are grouped by application, environment, and owner. Add each business unit to an Amazon SNS topic for each alert. Use Cost Explorer in the organization's management account to create monthly reports for each business unit.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Configure AWS Budgets in each account and configure budget alerts that are grouped by application, environment, and owner. Add each business unit to an Amazon SNS topic for each alert. Use the AWS Billing and Cost Management dashboard in each account to create monthly reports for each business unit.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Enable AWS Cost and Usage Reports in the organization's management account and configure reports grouped by application, environment. and owner. Create an AWS Lambda function that processes AWS Cost and Usage Reports, sends budget alerts, and sends monthly reports to each business unit's email list.",
        "isCorrect": false
      }
    ],
    "comments": "Solución centralizada para informes mensuales de gasto por unidad de negocio y notificaciones al superar un umbral. Etiquetas: application, environment, owner. Cuentas separadas en Organizations. MÁS rentable.\n\nOpción A: Configurar AWS Budgets EN CADA CUENTA es descentralizado y más operación; el requisito es centralizado.\n\nOpción B (Correcta): Configurar AWS Budgets en la cuenta de GESTIÓN de la organización, con alertas de presupuesto agrupadas por application/environment/owner y SNS por alerta a cada unidad de negocio, y usar Cost Explorer en la cuenta de gestión para crear los informes mensuales por unidad. Centralizado, cubre alertas por umbral e informes, y es la opción más rentable (una sola configuración central).\n\nOpción C: Igual que A, por cuenta (descentralizado) y usando el dashboard de Billing por cuenta; más operación.\n\nOpción D: Un CUR + Lambda que envía alertas e informes por email es más desarrollo/operación (código a mantener) que Budgets + Cost Explorer nativos. Menos rentable/operativamente eficiente.\n\nReferencias:\nhttps://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html\nhttps://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ce-what-is.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30089,
    "questionNumber": 89,
    "question": "A company is using AWS CloudFormation to deploy its infrastructure. The company is concerned that, if a production CloudFormation stack is deleted, important data stored in Amazon RDS databases or Amazon EBS volumes might also be deleted. How can the company prevent users from accidentally deleting data in this way?",
    "choices": [
      {
        "letter": "A",
        "text": "Modify the CloudFormation templates to add a DeletionPolicy attribute to RDS and EBS resources.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure a stack policy that disallows the deletion of RDS and EBS resources.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Modify IAM policies lo deny deleting RDS and EBS resources that are tagged with an \"aws:cloudformation:stack-name\" tag.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Config rules to prevent deleting RDS and EBS resources.",
        "isCorrect": false
      }
    ],
    "comments": "Evitar que, al borrar un stack de CloudFormation, se borren datos de RDS o volúmenes EBS.\n\nOpción A (Correcta): Añadir el atributo DeletionPolicy (p. ej. Retain o Snapshot) a los recursos RDS y EBS en las plantillas de CloudFormation. Con DeletionPolicy: Retain/Snapshot, al eliminar el stack esos recursos/datos se conservan (o se guarda un snapshot), evitando el borrado accidental. Es el mecanismo nativo de CloudFormation para este fin.\n\nOpción B: Una stack policy protege recursos frente a ACTUALIZACIONES del stack, no frente a la ELIMINACIÓN del stack. No cumple el objetivo.\n\nOpción C: Políticas IAM que denieguen borrar recursos etiquetados es frágil y no es el control específico de CloudFormation para preservar datos al borrar el stack. Menos adecuado.\n\nOpción D: AWS Config es detectivo (evalúa cumplimiento), no impide el borrado al eliminar el stack. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stacks.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30090,
    "questionNumber": 90,
    "question": "A company has VPC flow logs enabled for Its NAT gateway. The company is seeing Action = ACCEPT for inbound traffic that comes from public IP address 198.51.100.2 destined for a private Amazon EC2 instance. A solutions architect must determine whether the traffic represents unsolicited inbound connections from the internet. The first two octets of the VPC CIDR block are 203.0. Which set of steps should the solutions architect take to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Open the AWS CloudTrail console. Select the log group that contains the NAT gateway's elastic network interface and the private instance's elastic network interlace. Run a query to filter with the destination address set as \"like 203.0\" and the source address set as \"like 198.51.100.2\". Run the stats command to filter the sum of bytes transferred by the source address and the destination address.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Open the Amazon CloudWatch console. Select the log group that contains the NAT gateway's elastic network interface and the private instance's elastic network interface. Run a query to filter with the destination address set as \"like 203.0\" and the source address set as \"like 198.51.100.2\". Run the stats command to filter the sum of bytes transferred by the source address and the destination address.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Open the AWS CloudTrail console. Select the log group that contains the NAT gateway's elastic network interface and the private instance’s elastic network interface. Run a query to filter with the destination address set as \"like 198.51.100.2\" and the source address set as \"like 203.0\". Run the stats command to filter the sum of bytes transferred by the source address and the destination address.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Open the Amazon CloudWatch console. Select the log group that contains the NAT gateway's elastic network interface and the private instance's elastic network interface. Run a query to filter with the destination address set as \"like 198.51.100.2\" and the source address set as \"like 203.0\". Run the stats command to filter the sum of bytes transferred by the source address and the destination address.",
        "isCorrect": true
      }
    ],
    "comments": "Analizar VPC Flow Logs para determinar si hay conexiones entrantes no solicitadas desde 198.51.100.2 hacia una instancia privada (VPC CIDR empieza 203.0). Los Flow Logs se consultan en CloudWatch Logs Insights, no en CloudTrail.\n\nOpción A/C: Usan la consola de AWS CloudTrail, que NO contiene VPC Flow Logs (los flow logs van a CloudWatch Logs o S3). Descartadas por la herramienta incorrecta.\n\nOpción B: Usa CloudWatch (correcto) pero filtra destino 'like 203.0' y origen 'like 198.51.100.2'. Para el TRÁFICO ENTRANTE desde la IP pública hacia la instancia privada, el destino es la instancia privada (203.0...) — sin embargo, para analizar la CONEXIÓN entrante y sus bytes correctamente en el sentido pedido, la consulta canónica invierte el filtro (ver D). Se descarta frente a D según la respuesta verificada de la comunidad.\n\nOpción D (Correcta): Abrir la consola de Amazon CloudWatch, seleccionar el log group con las ENI del NAT gateway y de la instancia privada, y ejecutar una query filtrando destino 'like 198.51.100.2' y origen 'like 203.0', con stats de suma de bytes por origen/destino. Analiza el tráfico saliente iniciado desde la instancia privada (203.0) hacia 198.51.100.2 para determinar si el ACCEPT entrante es realmente respuesta a una conexión solicitada (stateful) y no una conexión entrante no solicitada. Herramienta correcta (CloudWatch Logs Insights sobre Flow Logs) y sentido de análisis correcto.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30091,
    "questionNumber": 91,
    "question": "A company consists or two separate business units. Each business unit has its own AWS account within a single organization in AWS Organizations. The business units regularly share sensitive documents with each other. To facilitate sharing, the company created an Amazon S3 bucket in each account and configured low-way replication between the S3 buckets. The S3 buckets have millions of objects. Recently, a security audit identified that neither S3 bucket has encryption at rest enabled. Company policy requires that all documents must be stored with encryption at rest. The company wants to implement server-side encryption with Amazon S3 managed encryption keys (SSE-S3). What is the MOST operationally efficient solution that meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Turn on SSE-S3 on both S3 buckets. Use S3 Batch Operations to copy and encrypt the objects in the same location.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an AWS Key Management Service (AWS KMS) key in each account. Turn on server-side encryption with AWS KMS keys (SSE-KMS) on each S3 bucket by using the corresponding KMS key in that AWS account. Encrypt the existing objects by using an S3 copy command in the AWS CLI.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Turn on SSE-S3 on both S3 buckets. Encrypt the existing objects by using an S3 copy command in the AWS CLI.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Key Management Service, (AWS KMS) key in each account. Turn on server-side encryption with AWS KMS keys (SSE-KMS) on each S3 bucket by using the corresponding KMS key in that AWS account. Use S3 Batch Operations to copy the objects into the same location.",
        "isCorrect": false
      }
    ],
    "comments": "Activar cifrado en reposo SSE-S3 en dos buckets con millones de objetos y cifrar los existentes, de la forma MÁS eficiente operativamente.\n\nOpción A (Correcta): Activar SSE-S3 en ambos buckets (cifra los nuevos) y usar S3 Batch Operations para copiar y cifrar los objetos existentes en la misma ubicación. S3 Batch Operations está diseñado para operar sobre MILLONES de objetos de forma gestionada y escalable, siendo lo más eficiente para re-cifrar en masa.\n\nOpción B/D: Usan SSE-KMS, pero el requisito es SSE-S3 explícitamente; además KMS añade coste/limits de peticiones para millones de objetos. No cumplen 'SSE-S3'.\n\nOpción C: SSE-S3 es correcto, pero re-cifrar 'con un s3 copy en la CLI' para millones de objetos es lento y frágil frente a S3 Batch Operations. Menos eficiente que A.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/batch-ops.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30092,
    "questionNumber": 92,
    "question": "A company is running an application in the AWS Cloud. The application collects and stores a large amount of unstructured data in an Amazon S3 bucket. The S3 bucket contains several terabytes of data and uses the S3 Standard storage class. The data increases in size by several gigabytes every day. The company needs to query and analyze the data. The company does not access data that is more than 1 year old. However, the company must retain all the data indefinitely for compliance reasons. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Use S3 Select to query the data. Create an S3 Lifecycle policy to transition data that is more than 1 year old to S3 Glacier Deep Archive.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon Redshift Spectrum to query the data. Create an S3 Lifecycle policy to transition data that is more than 1 year old 10 S3 Glacier Deep Archive.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use an AWS Glue Data Catalog and Amazon Athena to query the data. Create an S3 Lifecycle policy to transition data that is more than 1 year old to S3 Glacier Deep Archive.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use Amazon Redshift Spectrum to query the data. Create an S3 Lifecycle policy to transition data that is more than 1 year old to S3 Intelligent-Tiering.",
        "isCorrect": false
      }
    ],
    "comments": "Consultar/analizar TB de datos no estructurados en S3, no se accede a datos de más de 1 año pero deben retenerse indefinidamente por compliance. MÁS rentable.\n\nOpción A: S3 Select consulta objetos individuales, no es un motor de consulta analítica sobre todo el dataset como Athena; menos adecuado para 'consultar y analizar' a escala.\n\nOpción B: Redshift Spectrum requiere un clúster Redshift (coste/gestión) para consultar S3; para consultas ad hoc serverless, Athena es más económico.\n\nOpción C (Correcta): Usar un AWS Glue Data Catalog + Amazon Athena para consultar los datos (serverless, se paga por consulta) y una S3 Lifecycle policy que transiciona los datos de más de 1 año a S3 Glacier Deep Archive (retención barata indefinida por compliance, sin necesidad de acceso rápido). Es la combinación más rentable.\n\nOpción D: Redshift Spectrum (clúster) + Intelligent-Tiering es más caro que Athena + Deep Archive para este patrón (datos antiguos que no se acceden y solo se retienen).\n\nReferencias:\nhttps://docs.aws.amazon.com/athena/latest/ug/what-is.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30093,
    "questionNumber": 93,
    "question": "A video processing company wants to build a machine learning (ML) model by using 600 TB of compressed data that is stored as thousands of files in the company's on-premises network attached storage system. The company does not have the necessary compute resources on premises for ML experiments and wants to use AWS. The company needs to complete the data transfer to AWS within 3 weeks. The data transfer will be a one-time transfer. The data must be encrypted in transit. The measured upload speed of the company's internet connection is 100 Mbps. and multiple departments share the connection. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Order several AWS Snowball Edge Storage Optimized devices by using the AWS Management Console. Configure the devices with a destination S3 bucket. Copy the data to the devices. Ship the devices back to AWS.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Set up a 10 Gbps AWS Direct Connect connection between the company location and the nearest AWS Region. Transfer the data over a VPN connection into the Region to store the data in Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a VPN connection between the on-premises network attached storage and the nearest AWS Region. Transfer the data over the VPN connection.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy an AWS Storage Gateway file gateway on premises. Configure the file gateway with a destination S3 bucket. Copy the data to the file gateway.",
        "isCorrect": false
      }
    ],
    "comments": "Transferir 600 TB (una sola vez) en 3 semanas, cifrado en tránsito, con solo 100 Mbps compartidos. MÁS rentable.\n\nCálculo: a 100 Mbps (compartidos), 600 TB tardarían meses; la red no es viable en 3 semanas.\n\nOpción A (Correcta): Pedir varios dispositivos AWS Snowball Edge Storage Optimized, configurarlos con el bucket S3 destino, copiar los datos y enviarlos de vuelta a AWS. Snowball transfiere petabytes por envío físico (cifrado), cumpliendo el plazo de 3 semanas sin saturar el enlace compartido, y de forma rentable para un traslado único de 600 TB.\n\nOpción B: Direct Connect de 10 Gbps tarda semanas en aprovisionarse y es un coste alto/permanente para una transferencia única; no encaja en 3 semanas ni es lo más rentable.\n\nOpción C: VPN sobre los 100 Mbps compartidos es demasiado lenta para 600 TB en 3 semanas. Inviable.\n\nOpción D: File Gateway sigue transfiriendo por el mismo enlace de 100 Mbps; no acelera 600 TB. Inviable.\n\nReferencias:\nhttps://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html\nhttps://docs.aws.amazon.com/snowball/latest/developer-guide/using-device.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30094,
    "questionNumber": 94,
    "question": "A company has migrated Its forms-processing application to AWS. When users interact with the application, they upload scanned forms as files through a web application. A database stores user metadata and references to files that are stored in Amazon S3. The web application runs on Amazon EC2 instances and an Amazon RDS for PostgreSQL database. When forms are uploaded, the application sends notifications to a team through Amazon Simple Notification Service (Amazon SNS). A team member then logs in and processes each form. The team member performs data validation on the form and extracts relevant data before entering the information into another system that uses an API. A solutions architect needs to automate the manual processing of the forms. The solution must provide accurate form extraction. minimize time to market, and minimize tong-term operational overhead. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Develop custom libraries to perform optical character recognition (OCR) on the forms. Deploy the libraries to an Amazon Elastic Kubernetes Service (Amazon EKS) cluster as an application tier. Use this tier to process the forms when forms are uploaded. Store the output in Amazon S3. Parse this output by extracting the data into an Amazon DynamoDB table. Submit the data to the target system's APL. Host the new application tier on EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Extend the system with an application tier that uses AWS Step Functions and AWS Lambda. Configure this tier to use artificial intelligence and machine learning (AI/ML) models that are trained and hosted on an EC2 instance to perform optical character recognition (OCR) on the forms when forms are uploaded. Store the output in Amazon S3. Parse this output by extracting the data that is required within the application tier. Submit the data to the target system's API.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Host a new application tier on EC2 instances. Use this tier to call endpoints that host artificial intelligence and machine teaming (AI/ML) models that are trained and hosted in Amazon SageMaker to perform optical character recognition (OCR) on the forms. Store the output in Amazon ElastiCache. Parse this output by extracting the data that is required within the application tier. Submit the data to the target system's API.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Extend the system with an application tier that uses AWS Step Functions and AWS Lambda. Configure this tier to use Amazon Textract and Amazon Comprehend to perform optical character recognition (OCR) on the forms when forms are uploaded. Store the output in Amazon S3. Parse this output by extracting the data that is required within the application tier. Submit the data to the target system's API.",
        "isCorrect": true
      }
    ],
    "comments": "Automatizar el procesamiento de formularios escaneados con extracción precisa, mínimo time-to-market y mínimo overhead a largo plazo.\n\nOpción A: Desarrollar librerías OCR propias en EKS es mucho desarrollo y operación (entrenar/mantener OCR, clúster). Contradice 'mínimo time-to-market' y 'mínimo overhead'.\n\nOpción B: Modelos AI/ML propios de OCR entrenados y alojados en EC2 también implica construir/entrenar/operar modelos; alto esfuerzo y mantenimiento.\n\nOpción C: Modelos propios en SageMaker + EC2 + ElastiCache sigue requiriendo construir y operar modelos; no es lo de menor esfuerzo ni la mayor precisión out-of-the-box para formularios.\n\nOpción D (Correcta): Extender el sistema con Step Functions + Lambda usando Amazon Textract (extracción de texto/campos/tablas de formularios, muy preciso) y Amazon Comprehend (NLP) cuando se sube un formulario; guardar la salida en S3, extraer los datos y enviarlos a la API destino. Servicios gestionados de IA, sin entrenar modelos: máxima precisión, mínimo time-to-market y mínimo overhead operativo.\n\nReferencias:\nhttps://docs.aws.amazon.com/textract/latest/dg/what-is.html\nhttps://docs.aws.amazon.com/comprehend/latest/dg/what-is.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30095,
    "questionNumber": 95,
    "question": "A company is refactoring its on-premises order-processing platform in the AWS Cloud. The platform includes a web front end that is hosted on a fleet of VMs, RabbitMQ to connect the front end to the backend, and a Kubernetes cluster to run a containerized backend system to process the orders. The company does not want to make any major changes to the application. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AMI of the web server VM. Create an Amazon EC2 Auto Scaling group that uses the AMI and an Application Load Balancer. Set up Amazon MQ to replace the on-premises messaging queue. Configure Amazon Elastic Kubernetes Service (Amazon EKS) to host the order-processing backend.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a custom AWS Lambda runtime to mimic the web server environment. Create an Amazon API Gateway API to replace the front-end web servers. Set up Amazon MQ to replace the on-premises messaging queue. Configure Amazon Elastic Kubernetes Service (Amazon EKS) to host the order-processing backend.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AMI of the web server VM. Create an Amazon EC2 Auto Scaling group that uses the AMI and an Application Load Balancer. Set up Amazon MQ to replace the on-premises messaging queue. Install Kubernetes on a fleet of different EC2 instances to host the order-processing backend.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AMI of the web server VM. Create an Amazon EC2 Auto Scaling group that uses the AMI and an Application Load Balancer. Set up an Amazon Simple Queue Service (Amazon SQS) queue to replace the on-premises messaging queue. Configure Amazon Elastic Kubernetes Service (Amazon EKS) to host the order-processing backend.",
        "isCorrect": false
      }
    ],
    "comments": "Refactor de una plataforma con front web en VMs, RabbitMQ y un clúster Kubernetes de backend, sin cambios mayores y con el MENOR overhead.\n\nOpción A (Correcta): Crear una AMI de la VM del web server y un Auto Scaling group con esa AMI detrás de un ALB (rehost del front sin cambios); usar Amazon MQ (broker gestionado compatible con RabbitMQ/AMQP) para reemplazar la cola on-premises sin cambiar la app; y usar Amazon EKS (Kubernetes gestionado) para el backend contenerizado. Reutiliza lo existente con servicios gestionados: mínimo overhead y sin cambios mayores. Correcta.\n\nOpción B: Reescribir el front como runtime Lambda + API Gateway es un cambio mayor; contradice 'sin cambios mayores'.\n\nOpción C: Instalar Kubernetes en EC2 a mano (self-managed) en lugar de EKS aumenta mucho el overhead operativo. Descartada.\n\nOpción D: Reemplazar RabbitMQ por SQS obliga a cambiar el código de mensajería de la app (SQS no es AMQP/RabbitMQ); Amazon MQ es el reemplazo directo. No cumple 'sin cambios mayores'.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazon-mq/latest/developer-guide/welcome.html\nhttps://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30096,
    "questionNumber": 96,
    "question": "A solutions architect needs to implement a client-side encryption mechanism for objects that will be stored in a new Amazon S3 bucket. The solutions architect created a CMK that is stored in AWS Key Management Service (AWS KMS) for this purpose. The solutions architect created the following IAM policy and attached it to an IAM role: During tests, the solutions architect was able to successfully get existing test objects in the S3 bucket. However, attempts to upload a new object resulted in an error message. The error message stated that the action was forbidden. Which action must the solutions architect add to the IAM policy to meet all the requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "kms:GenerateDataKey",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "kms:GetKeyPolicy",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "kms:GetPublicKey",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "kms:Sign",
        "isCorrect": false
      }
    ],
    "comments": "El rol puede GET objetos existentes pero al SUBIR uno nuevo (cifrado con la CMK de KMS) da 'forbidden'. Falta el permiso de KMS para generar la clave de datos al cifrar.\n\nOpción A (Correcta): Añadir kms:GenerateDataKey a la política. Para cifrar un objeto nuevo con SSE-KMS/cliente usando la CMK, se necesita kms:GenerateDataKey (genera la clave de datos para cifrar). El GET funcionaba porque tenía kms:Decrypt, pero el PUT (cifrado) falla sin GenerateDataKey. La documentación de S3 confirma que subir objetos cifrados con KMS requiere kms:GenerateDataKey.\n\nOpción B: kms:GetKeyPolicy lee la política de la clave; no habilita cifrar objetos. No resuelve.\n\nOpción C: kms:GetPublicKey es para claves asimétricas (obtener la clave pública); no aplica al cifrado de datos S3 con clave simétrica.\n\nOpción D: kms:Sign es para firmar con claves asimétricas; no cifra objetos. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/troubleshoot-403-errors.html\nhttps://docs.aws.amazon.com/kms/latest/APIReference/API_GenerateDataKey.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30097,
    "questionNumber": 97,
    "question": "A company has developed a web application. The company is hosting the application on a group of Amazon EC2 instances behind an Application Load Balancer. The company wants to improve the security posture of the application and plans to use AWS WAF web ACLs. The solution must not adversely affect legitimate traffic to the application. How should a solutions architect configure the web ACLs to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Set the action of the web ACL rules to Count. Enable AWS WAF logging. Analyze the requests for false positives. Modify the rules to avoid any false positive. Over time, change the action of the web ACL rules from Count to Block.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use only rate-based rules in the web ACLs, and set the throttle limit as high as possible. Temporarily block all requests that exceed the limit. Define nested rules to narrow the scope of the rate tracking.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Set the action of the web ACL rules to Block. Use only AWS managed rule groups in the web ACLs. Evaluate the rule groups by using Amazon CloudWatch metrics with AWS WAF sampled requests or AWS WAF logs.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use only custom rule groups in the web ACLs, and set the action to Allow. Enable AWS WAF logging. Analyze the requests for false positives. Modify the rules to avoid any false positive. Over time, change the action of the web ACL rules from Allow to Block.",
        "isCorrect": false
      }
    ],
    "comments": "Implantar AWS WAF sin afectar al tráfico legítimo.\n\nOpción A (Correcta): Poner las reglas del web ACL en acción Count, habilitar el logging de WAF, analizar las peticiones en busca de falsos positivos, ajustar las reglas para evitarlos y, con el tiempo, cambiar la acción de Count a Block. El modo Count observa sin bloquear, permitiendo afinar antes de bloquear y así no afectar al tráfico legítimo. Es la práctica recomendada de despliegue de WAF.\n\nOpción B: Solo reglas rate-based con el límite muy alto no protege bien y 'bloquear temporalmente todo lo que exceda' puede afectar a legítimos; no es el enfoque de despliegue seguro.\n\nOpción C: Poner todo en Block desde el inicio con managed rules puede generar falsos positivos y afectar al tráfico legítimo antes de evaluar. Contradice el requisito.\n\nOpción D: Reglas custom con acción Allow no aporta protección (allow no bloquea) y el enfoque es confuso; no es la práctica correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/waf/latest/developerguide/web-acl-rule-action.html\nhttps://docs.aws.amazon.com/waf/latest/developerguide/logging.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30098,
    "questionNumber": 98,
    "question": "A company has an organization that has many AWS accounts in AWS Organizations. A solutions architect must improve how the company manages common security group rules for the AWS accounts in the organization. The company has a common set of IP CIDR ranges in an allow list in each AWS account to allow access to and from the company’s on-premises network. Developers within each account are responsible for adding new IP CIDR ranges to their security groups. The security team has its own AWS account. Currently, the security team notifies the owners of the other AWS accounts when changes are made to the allow list. The solutions architect must design a solution that distributes the common set of CIDR ranges across all accounts. Which solution meets these requirements with the LEAST amount of operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up an Amazon Simple Notification Service (Amazon SNS) topic in the security team's AWS account. Deploy an AWS Lambda function in each AWS account. Configure the Lambda function to run every time an SNS topic receives a message. Configure the Lambda function to take an IP address as input and add it to a list of security groups in the account. Instruct the security team to distribute changes by publishing messages to its SNS topic.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create new customer-managed prefix lists in each AWS account within the organization. Populate the prefix lists in each account with all internal CIDR ranges. Notify the owner of each AWS account to allow the new customer-managed prefix list IDs in their accounts in their security groups. Instruct the security team to share updates with each AWS account owner.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a new customer-managed prefix list in the security team’s AWS account. Populate the customer-managed prefix list with all internal CIDR ranges. Share the customer-managed prefix list with the organization by using AWS Resource Access Manager. Notify the owner of each AWS account to allow the new customer-managed prefix list ID in their security groups.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an IAM role in each account in the organization. Grant permissions to update security groups. Deploy an AWS Lambda function in the security team’s AWS account. Configure the Lambda function to take a list of internal IP addresses as input, assume a role in each organization account, and add the list of IP addresses to the security groups in each account.",
        "isCorrect": false
      }
    ],
    "comments": "Distribuir un conjunto común de rangos CIDR a todas las cuentas de la organización con el MENOR overhead; el equipo de seguridad gestiona la lista.\n\nOpción A: SNS + Lambda en cada cuenta que añade IPs a los SG es una solución con código y despliegue por cuenta; mucho overhead y frágil.\n\nOpción B: Crear prefix lists customer-managed EN CADA cuenta y notificar para sincronizar manualmente duplica la gestión en todas las cuentas; alto overhead.\n\nOpción C (Correcta): Crear UNA customer-managed prefix list en la cuenta del equipo de seguridad, poblarla con todos los rangos CIDR internos y COMPARTIRLA con la organización mediante AWS Resource Access Manager (RAM). Cada cuenta referencia el ID de la prefix list compartida en sus security groups; al actualizar la lista central, todas las reglas que la referencian se actualizan automáticamente. Gestión centralizada con mínimo overhead.\n\nOpción D: Un rol IAM por cuenta + Lambda que asume roles y modifica SG en cada cuenta es más código/operación que una prefix list compartida por RAM. Menos eficiente.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/sharing-managed-prefix-lists.html\nhttps://docs.aws.amazon.com/vpc/latest/userguide/managed-prefix-lists.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30099,
    "questionNumber": 99,
    "question": "A company has introduced a new policy that allows employees to work remotely from their homes if they connect by using a VPN. The company is hosting internal applications with VPCs in multiple AWS accounts. Currently, the applications are accessible from the company's on-premises office network through an AWS Site-to-Site VPN connection. The VPC in the company's main AWS account has peering connections established with VPCs in other AWS accounts. A solutions architect must design a scalable AWS Client VPN solution for employees to use while they work from home. What is the MOST cost-effective solution that meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a Client VPN endpoint in each AWS account. Configure required routing that allows access to internal applications.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a Client VPN endpoint in the main AWS account. Configure required routing that allows access to internal applications.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a Client VPN endpoint in the main AWS account. Provision a transit gateway that is connected to each AWS account. Configure required routing that allows access to internal applications.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a Client VPN endpoint in the main AWS account. Establish connectivity between the Client VPN endpoint and the AWS Site-to-Site VPN.",
        "isCorrect": false
      }
    ],
    "comments": "Client VPN escalable para teletrabajo; apps internas en VPC de varias cuentas; la VPC de la cuenta principal tiene peering con las VPC de las otras cuentas. MÁS rentable.\n\nOpción A: Un Client VPN endpoint en CADA cuenta multiplica el coste (los endpoints de Client VPN se facturan por asociación/hora y por conexión). No es lo más rentable.\n\nOpción B (Correcta): Crear UN Client VPN endpoint en la cuenta principal y configurar el enrutamiento necesario para llegar a las apps internas. Como la VPC principal ya tiene peering con las demás VPC, desde ese único endpoint se puede enrutar a las aplicaciones, minimizando coste (un solo endpoint). Es la solución más rentable dado el peering existente.\n\nOpción C: Añadir un transit gateway conectado a cada cuenta añade coste (attachments/procesamiento) innecesario cuando ya existe el peering; no es lo más rentable.\n\nOpción D: 'Conectar el Client VPN con la Site-to-Site VPN' no es un patrón válido de conectividad para los clientes remotos hacia las VPC. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html\nhttps://docs.aws.amazon.com/vpn/latest/clientvpn-admin/scenario-peered.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30100,
    "questionNumber": 100,
    "question": "A company is running an application in the AWS Cloud. Recent application metrics show inconsistent response times and a significant increase in error rates. Calls to third-party services are causing the delays. Currently, the application calls third-party services synchronously by directly invoking an AWS Lambda function. A solutions architect needs to decouple the third-party service calls and ensure that all the calls are eventually completed. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use an Amazon Simple Queue Service (Amazon SQS) queue to store events and invoke the Lambda function.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use an AWS Step Functions state machine to pass events to the Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use an Amazon EventBridge rule to pass events to the Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use an Amazon Simple Notification Service (Amazon SNS) topic to store events and Invoke the Lambda function.",
        "isCorrect": false
      }
    ],
    "comments": "Desacoplar llamadas síncronas a servicios de terceros (lentos/con errores) y garantizar que TODAS se completen eventualmente.\n\nOpción A (Correcta): Usar una cola Amazon SQS para almacenar los eventos e invocar la Lambda desde la cola. SQS desacopla el productor del consumidor, absorbe picos y, con reintentos y DLQ, garantiza que las llamadas se procesen eventualmente aunque el tercero falle temporalmente. Es el patrón de desacople con entrega garantizada.\n\nOpción B: Step Functions orquesta flujos, pero no es principalmente un buffer de desacople para 'garantizar que todas se completen' ante un tercero lento como lo hace una cola; más orientado a orquestación de estados.\n\nOpción C: EventBridge enruta eventos, pero para almacenar y reintentar de forma fiable hasta completar, SQS (con DLQ) es el mecanismo de cola idóneo; EventBridge no 'almacena' para consumo garantizado igual que una cola.\n\nOpción D: SNS es pub/sub (fan-out) y no retiene mensajes para reintento/consumo garantizado como una cola; si el consumidor falla, no reencola igual que SQS. Menos adecuado para 'eventualmente completadas'.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30101,
    "questionNumber": 101,
    "question": "A company is running applications on AWS in a multi-account environment. The company's sales team and marketing team use separate AWS accounts in AWS Organizations. The sales team stores petabytes of data in an Amazon S3 bucket. The marketing team uses Amazon QuickSight for data visualizations. The marketing team needs access to data that the sates team stores in the S3 bucket. The company has encrypted the S3 bucket with an AWS Key Management Service (AWS KMS) key. The marketing team has already created the IAM service role for QuickSight to provide QuickSight access in the marketing AWS account. The company needs a solution that will provide secure access to the data in the S3 bucket across AWS accounts. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new S3 bucket in the marketing account. Create an S3 replication rule in the sales account to copy the objects to the new S3 bucket in the marketing account. Update the QuickSight permissions in the marketing account to grant access to the new S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an SCP to grant access to the S3 bucket to the marketing account. Use AWS Resource Access Manager (AWS RAM) to share the KMS key from the sates account with the marketing account. Update the QuickSight permissions in the marketing account to grant access to the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Update the S3 bucket policy in the marketing account to grant access to the QuickSight role. Create a KMS grant for the encryption key that is used in the S3 bucket. Grant decrypt access to the QuickSight role. Update the QuickSight permissions in the marketing account to grant access to the S3 bucket.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an IAM role in the sales account and grant access to the S3 bucket. From the marketing account, assume the IAM role in the sales account to access the S3 bucket. Update the QuickSight rote, to create a trust relationship with the new IAM role in the sales account.",
        "isCorrect": false
      }
    ],
    "comments": "El equipo de marketing (cuenta B) necesita que su rol de QuickSight acceda a un bucket S3 cifrado con KMS de la cuenta de ventas (A), con el MENOR overhead.\n\nOpción A: Replicar petabytes a un bucket en marketing duplica almacenamiento y coste enormemente; no es de menor overhead.\n\nOpción B: Un SCP NO concede acceso a un bucket (solo restringe), y no se comparte una KMS key con RAM de esa forma para este caso; conceptualmente incorrecto.\n\nOpción C (Correcta): Actualizar la bucket policy (en la cuenta de ventas) para conceder acceso al rol de QuickSight de marketing, y crear un KMS grant sobre la clave de cifrado dando permiso de descifrado (decrypt) al rol de QuickSight; luego actualizar los permisos de QuickSight en marketing para acceder al bucket. Cross-account con bucket policy + KMS grant de decrypt es el patrón de menor overhead para leer datos cifrados de otra cuenta (sin copiar datos). Correcta.\n\nOpción D: Assume-role adicional añade una capa de rol intermedia y más configuración que el acceso directo con bucket policy + KMS grant. Más overhead.\n\nReferencias:\nhttps://docs.aws.amazon.com/kms/latest/developerguide/grants.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/example-walkthroughs-managing-access-example2.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30102,
    "questionNumber": 102,
    "question": "A company is planning to migrate its business-critical applications from an on-premises data center to AWS. The company has an on-premises installation of a Microsoft SQL Server Always On cluster. The company wants to migrate to an AWS managed database service. A solutions architect must design a heterogeneous database migration on AWS. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate the SQL Server databases to Amazon RDS for MySQL by using backup and restore utilities.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use an AWS Snowball Edge Storage Optimized device to transfer data to Amazon S3. Set up Amazon RDS for MySQL. Use S3 integration with SQL Server features, such as BULK INSERT.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the AWS Schema Conversion Tool to translate the database schema to Amazon RDS for MySQL. Then use AWS Database Migration Service (AWS DMS) to migrate the data from on-premises databases to Amazon RDS.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use AWS DataSync to migrate data over the network between on-premises storage and Amazon S3. Set up Amazon RDS for MySQL. Use S3 integration with SQL Server features, such as BULK INSERT.",
        "isCorrect": false
      }
    ],
    "comments": "Migración HETEROGÉNEA (SQL Server -> servicio gestionado, aquí RDS for MySQL): cambia el motor, por lo que hay conversión de esquema.\n\nOpción A: 'Backup y restore' entre SQL Server y MySQL no funciona (motores distintos); no es una migración heterogénea válida.\n\nOpción B: Snowball a S3 + BULK INSERT no convierte el esquema de SQL Server a MySQL ni migra la lógica; incompleto.\n\nOpción C (Correcta): Usar el AWS Schema Conversion Tool (SCT) para convertir el esquema de SQL Server a RDS for MySQL y luego AWS Database Migration Service (DMS) para migrar los datos. SCT + DMS es el patrón estándar de AWS para migraciones heterogéneas (motor origen distinto del destino). Correcta.\n\nOpción D: DataSync mueve ficheros, no convierte esquemas ni migra bases de datos relacionales heterogéneas. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html\nhttps://docs.aws.amazon.com/dms/latest/userguide/Welcome.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30103,
    "questionNumber": 103,
    "question": "A publishing company's design team updates the icons and other static assets that an ecommerce web application uses. The company serves the icons and assets from an Amazon S3 bucket that is hosted in the company's production account. The company also uses a development account that members of the design team can access. After the design team tests the static assets in the development account, the design team needs to load the assets into the S3 bucket in the production account. A solutions architect must provide the design team with access to the production account without exposing other parts of the web application to the risk of unwanted changes. Which combination of steps will meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "In the production account, create a new IAM policy that allows read and write access to the S3 bucket.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "In the development account, create a new IAM policy that allows read and write access to the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "In the production account, create a role Attach the new policy to the role. Define the development account as a trusted entity.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "In the development account, create a role. Attach the new policy to the role Define the production account as a trusted entity.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "In the development account, create a group that contains all the IAM users of the design team Attach a different IAM policy to the group to allow the sts:AssumeRole action on the role In the production account.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "In the development account, create a group that contains all the IAM users of the design team Attach a different IAM policy to the group to allow the sts:AssumeRole action on the role in the development account.",
        "isCorrect": false
      }
    ],
    "comments": "El equipo de diseño (cuenta de desarrollo) debe poder cargar assets en el bucket S3 de producción sin exponer el resto de la app de producción. Patrón: rol cross-account con AssumeRole.\n\nOpción A (Correcta): En la cuenta de PRODUCCIÓN, crear una política IAM que permita lectura/escritura SOLO en ese bucket S3.\n\nOpción B: Crear la política en la cuenta de desarrollo no aplica: el permiso sobre el recurso (bucket) vive en producción. Descartada.\n\nOpción C (Correcta): En PRODUCCIÓN, crear un rol, adjuntarle esa política y definir la cuenta de desarrollo como entidad de confianza (trusted entity), de modo que los usuarios de desarrollo puedan asumir el rol.\n\nOpción D: Crear el rol en desarrollo con producción como trusted entity es al revés; el rol con acceso al bucket debe estar en producción. Incorrecta.\n\nOpción E (Correcta): En DESARROLLO, crear un grupo con los usuarios del equipo de diseño y adjuntar una política que permita sts:AssumeRole sobre el rol de PRODUCCIÓN. A + C + E implementa el acceso cross-account de mínimo privilegio.\n\nOpción F: sts:AssumeRole sobre un rol 'en la cuenta de desarrollo' no da acceso al bucket de producción. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30104,
    "questionNumber": 104,
    "question": "A company developed a pilot application by using AWS Elastic Beanstalk and Java. To save costs during development, the company's development team deployed the application into a single-instance environment. Recent tests indicate that the application consumes more CPU than expected. CPU utilization is regularly greater than 85%, which causes some performance bottlenecks. A solutions architect must mitigate the performance issues before the company launches the application to production. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new Elastic Beanstalk application. Select a load-balanced environment type. Select all Availability Zones. Add a scale-out rule that will run if the maximum CPU utilization is over 85% for 5 minutes.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a second Elastic Beanstalk environment. Apply the traffic-splitting deployment policy. Specify a percentage of incoming traffic to direct to the new environment in the average CPU utilization is over 85% for 5 minutes.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Modify the existing environment’s capacity configuration to use a load-balanced environment type. Select all Availability Zones. Add a scale-out rule that will run if the average CPU utilization is over 85% for 5 minutes.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Select the Rebuild environment action with the load balancing option. Select an Availability Zones. Add a scale-out rule that will run if the sum CPU utilization is over 85% for 5 minutes.",
        "isCorrect": false
      }
    ],
    "comments": "Un entorno Elastic Beanstalk single-instance con CPU >85%; hay que mitigar el rendimiento con el MENOR overhead.\n\nOpción A: Crear una NUEVA aplicación Beanstalk es innecesario; reconfigurar el entorno existente basta. Más trabajo del necesario.\n\nOpción B: La política de traffic-splitting es para despliegues (canary), no para escalar por carga de CPU; no resuelve el cuello de botella de capacidad.\n\nOpción C (Correcta): Modificar la configuración de capacidad del entorno EXISTENTE a tipo load-balanced, seleccionar todas las AZ y añadir una regla de scale-out si la CPU media supera el 85% durante 5 minutos. Convierte el single-instance en balanceado con autoescalado, mitigando el cuello de botella con el menor overhead (se cambia el entorno actual). Correcta.\n\nOpción D: 'Rebuild environment' recrea el entorno (más disruptivo) y 'sum CPU' no es la métrica adecuada; la media de CPU es la correcta. Menos apropiada.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.as.html\nhttps://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environments-cfg-autoscaling.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30105,
    "questionNumber": 105,
    "question": "A finance company is running its business-critical application on current-generation Linux EC2 instances. The application includes a self-managed MySQL database performing heavy I/O operations. The application is working fine to handle a moderate amount of traffic during the month. However, it slows down during the final three days of each month due to month-end reporting, even though the company is using Elastic Load Balancers and Auto Scaling within its infrastructure to meet the increased demand. Which of the following actions would allow the database to handle the month-end load with the LEAST impact on performance?",
    "choices": [
      {
        "letter": "A",
        "text": "Pre-warming Elastic Load Balancers, using a bigger instance type, changing all Amazon EBS volumes to GP2 volumes.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Performing a one-time migration of the database cluster to Amazon RDS, and creating several additional read replicas to handle the load during end of month.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Using Amazon CloudWatch with AWS Lambda to change the type, size, or IOPS of Amazon EBS volumes in the cluster based on a specific CloudWatch metric.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Replacing all existing Amazon EBS volumes with new PIOPS volumes that have the maximum available storage size and I/O per second by taking snapshots before the end of the month and reverting back afterwards.",
        "isCorrect": false
      }
    ],
    "comments": "MySQL autogestionado con mucha I/O que se ralentiza a fin de mes (reporting), pese a ELB/Auto Scaling en el resto de la infra. Manejar el pico con el MENOR impacto en rendimiento.\n\nOpción A: Pre-warming de ELB, instancia mayor y pasar EBS a gp2 son parches que no resuelven la escalabilidad de lectura de la BD para el reporting mensual.\n\nOpción B (Correcta): Migrar (una vez) el clúster de base de datos a Amazon RDS y crear varias read replicas adicionales para absorber la carga de lectura del fin de mes (reporting). RDS gestionado + read replicas escala las lecturas pesadas del reporting sin impactar la BD principal; es la solución de menor impacto en rendimiento y sostenible.\n\nOpción C: CloudWatch + Lambda cambiando tipo/tamaño/IOPS de EBS al vuelo es complejo, arriesgado y no escala lecturas como las read replicas.\n\nOpción D: Snapshots a PIOPS máximos antes de fin de mes y revertir después es operativamente frágil y caro; no es la solución de menor impacto.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30106,
    "questionNumber": 106,
    "question": "A company runs a Java application that has complex dependencies on VMs that are in the company's data center. The application is stable. but the company wants to modernize the technology stack. The company wants to migrate the application to AWS and minimize the administrative overhead to maintain the servers. Which solution will meet these requirements with the LEAST code changes?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate the application to Amazon Elastic Container Service (Amazon ECS) on AWS Fargate by using AWS App2Container. Store container images in Amazon Elastic Container Registry (Amazon ECR). Grant the ECS task execution role permission 10 access the ECR image repository. Configure Amazon ECS to use an Application Load Balancer (ALB). Use the ALB to interact with the application.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Migrate the application code to a container that runs in AWS Lambda. Build an Amazon API Gateway REST API with Lambda integration. Use API Gateway to interact with the application.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Migrate the application to Amazon Elastic Kubernetes Service (Amazon EKS) on EKS managed node groups by using AWS App2Container. Store container images in Amazon Elastic Container Registry (Amazon ECR). Give the EKS nodes permission to access the ECR image repository. Use Amazon API Gateway to interact with the application.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Migrate the application code to a container that runs in AWS Lambda. Configure Lambda to use an Application Load Balancer (ALB). Use the ALB to interact with the application.",
        "isCorrect": false
      }
    ],
    "comments": "App Java estable con dependencias complejas en VMs; modernizar a contenedores minimizando overhead de servidores y con los MENOS cambios de código.\n\nOpción A (Correcta): Migrar a Amazon ECS on AWS Fargate usando AWS App2Container (A2C automatiza contenerizar apps Java/.NET existentes con pocos cambios de código), guardar las imágenes en ECR, dar permiso al ECS task execution role sobre ECR y usar un ALB para interactuar. Fargate elimina la gestión de servidores. Es la opción con menos cambios de código y menor overhead administrativo.\n\nOpción B/D: Meter una app Java con dependencias complejas en un contenedor Lambda implica adaptarla al modelo de eventos/límites de Lambda (más cambios) y no es idóneo para apps con dependencias complejas y de larga ejecución.\n\nOpción C: EKS con managed node groups sigue obligando a gestionar nodos EC2 (más overhead que Fargate) y añade complejidad de Kubernetes; más administración que A.\n\nReferencias:\nhttps://docs.aws.amazon.com/app2container/latest/UserGuide/what-is-a2c.html\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30107,
    "questionNumber": 107,
    "question": "A company has an asynchronous HTTP application that is hosted as an AWS Lambda function. A public Amazon API Gateway endpoint invokes the Lambda function. The Lambda function and the API Gateway endpoint reside in the us-east-1 Region. A solutions architect needs to redesign the application to support failover to another AWS Region. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an API Gateway endpoint in the us-west-2 Region to direct traffic to the Lambda function in us-east-1. Configure Amazon Route 53 to use a failover routing policy to route traffic for the two API Gateway endpoints.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon Simple Queue Service (Amazon SQS) queue. Configure API Gateway to direct traffic to the SQS queue instead of to the Lambda function. Configure the Lambda function to pull messages from the queue for processing.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy the Lambda function to the us-west-2 Region. Create an API Gateway endpoint in us-west-2 10 direct traffic to the Lambda function in us-west-2. Configure AWS Global Accelerator and an Application Load Balancer to manage traffic across the two API Gateway endpoints.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy the Lambda function and an API Gateway endpoint to the us-west-2 Region. Configure Amazon Route 53 to use a failover routing policy to route traffic for the two API Gateway endpoints.",
        "isCorrect": true
      }
    ],
    "comments": "App HTTP en Lambda tras API Gateway en us-east-1; añadir failover a otra Región.\n\nOpción A: Un API Gateway en us-west-2 que apunta a la Lambda de us-east-1 no da failover real (si cae us-east-1, la Lambda también cae). No cumple.\n\nOpción B: Meter una cola SQS entre API Gateway y la Lambda cambia el patrón a asíncrono/desacople, pero no aporta failover regional. No es lo pedido.\n\nOpción C: 'Global Accelerator + ALB para gestionar dos API Gateway endpoints' no es un patrón válido (GA/ALB no fronting de API Gateway así). Incorrecta.\n\nOpción D (Correcta): Desplegar la Lambda Y un endpoint de API Gateway en us-west-2, y configurar Route 53 con una política de enrutamiento FAILOVER entre los dos endpoints de API Gateway. Cada Región tiene su stack completo (API Gateway + Lambda) y Route 53 conmuta al secundario si el primario falla. Es el patrón correcto de failover regional. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/disaster-recovery-resiliency.html\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30108,
    "questionNumber": 108,
    "question": "A retail company has structured its AWS accounts to be part of an organization in AWS Organizations. The company has set up consolidated billing and has mapped its departments to the following OUs: Finance, Sales, Human Resources (HR), Marketing, and Operations. Each OU has multiple AWS accounts, one for each environment within a department. These environments are development, test, pre-production, and production. The HR department is releasing a new system that will launch in 3 months. In preparation, the HR department has purchased several Reserved Instances (RIs) in its production AWS account. The HR department will install the new application on this account. The HR department wants to make sure that other departments cannot share the RI discounts. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "In the AWS Billing and Cost Management console for the HR department's production account turn off RI sharing.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Remove the HR department's production AWS account from the organization. Add the account 10 the consolidating billing configuration only.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "In the AWS Billing and Cost Management console. use the organization’s management account 10 turn off RI Sharing for the HR departments production AWS account.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an SCP in the organization to restrict access to the RIs. Apply the SCP to the OUs of the other departments.",
        "isCorrect": false
      }
    ],
    "comments": "El departamento de RRHH compró RIs en su cuenta de producción y quiere que otros departamentos NO compartan los descuentos de esos RI.\n\nOpción A: 'Turn off RI sharing' desde la propia cuenta de producción de RRHH no es donde se controla; la compartición de RI en consolidated billing se gestiona desde la cuenta de GESTIÓN.\n\nOpción B: Sacar la cuenta de la organización y dejarla 'solo en consolidated billing' es disruptivo y no es la forma correcta de desactivar el RI sharing.\n\nOpción C (Correcta): En la consola de Billing and Cost Management, usar la cuenta de GESTIÓN de la organización para desactivar el RI sharing para la cuenta de producción de RRHH. El control de compartición de descuentos de RI/Savings Plans se ejerce desde la cuenta de gestión, por cuenta. Así solo la cuenta de RRHH aprovecha sus RI. Correcta.\n\nOpción D: Un SCP restringe acciones/API, no controla la compartición de descuentos de RI en la facturación consolidada. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ri-turn-off.html\nhttps://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/con-bill-blended-rates.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30109,
    "questionNumber": 109,
    "question": "A large company is running a popular web application. The application runs on several Amazon EC2 Linux instances in an Auto Scaling group in a private subnet. An Application Load Balancer is targeting the instances in the Auto Scaling group in the private subnet. AWS Systems Manager Session Manager is configured, and AWS Systems Manager Agent is running on all the EC2 instances. The company recently released a new version of the application. Some EC2 instances are now being marked as unhealthy and are being terminated. As a result, the application is running at reduced capacity. A solutions architect tries to determine the root cause by analyzing Amazon CloudWatch logs that are collected from the application, but the logs are inconclusive. How should the solutions architect gain access to an EC2 instance to troubleshoot the issue?",
    "choices": [
      {
        "letter": "A",
        "text": "Suspend the Auto Scaling group’s HealthCheck scaling process. Use Session Manager to log in to an instance that is marked as unhealthy.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Enable EC2 instance termination protection. Use Session Manager to log in to an instance that is marked as unhealthy.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Set the termination policy to OldestInstance on the Auto Scaling group. Use Session Manager to log in to an instance that is marked an unhealthy.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Suspend the Auto Scaling group’s Terminate process. Use Session Manager to log in to an instance that is marked as unhealthy.",
        "isCorrect": true
      }
    ],
    "comments": "Instancias marcadas unhealthy y TERMINADAS por el ASG; hay que acceder a una para diagnosticar (con Session Manager) antes de que se destruya.\n\nOpción A: Suspender el proceso HealthCheck evita que se marquen unhealthy, pero no impide la terminación en curso de forma tan directa; el proceso clave a suspender para que no se TERMINEN es Terminate.\n\nOpción B: La protección contra terminación de instancia EC2 no impide que el Auto Scaling group termine la instancia por scale-in/health (el ASG puede terminarla igualmente salvo scale-in protection); no es el control correcto aquí.\n\nOpción C: OldestInstance es una política de qué instancia terminar, no evita la terminación; no ayuda a conservar la instancia para diagnosticar.\n\nOpción D (Correcta): Suspender el proceso Terminate del Auto Scaling group para que NO termine las instancias unhealthy, y usar Session Manager para entrar en una instancia marcada como unhealthy y diagnosticar. Suspender Terminate conserva la instancia problemática para el troubleshooting. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/as-suspend-resume-processes.html\nhttps://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30110,
    "questionNumber": 110,
    "question": "A company wants to deploy an AWS WAF solution to manage AWS WAF rules across multiple AWS accounts. The accounts are managed under different OUs in AWS Organizations. Administrators must be able to add or remove accounts or OUs from managed AWS WAF rule sets as needed. Administrators also must have the ability to automatically update and remediate noncompliant AWS WAF rules in all accounts. Which solution meets these requirements with the LEAST amount of operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Firewall Manager to manage AWS WAF rules across accounts in the organization. Use an AWS Systems Manager Parameter Store parameter to store account numbers and OUs to manage. Update the parameter as needed to add or remove accounts or OUs. Use an Amazon EventBridge rule to identify any changes to the parameter and to invoke an AWS Lambda function to update the security policy in the Firewall Manager administrative account.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Deploy an organization-wide AWS Config rule that requires all resources in the selected OUs to associate the AWS WAF rules. Deploy automated remediation actions by using AWS Lambda to fix noncompliant resources. Deploy AWS WAF rules by using an AWS CloudFormation stack set to target the same OUs where the AWS Config rule is applied.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create AWS WAF rules in the management account of the organization. Use AWS Lambda environment variables to store account numbers and OUs to manage. Update environment variables as needed to add or remove accounts or OUs. Create cross-account IAM roles in member accounts. Assume the roles by using AWS Security Token Service (AWS STS) in the Lambda function to create and update AWS WAF rules in the member accounts.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Control Tower to manage AWS WAF rules across accounts in the organization. Use AWS Key Management Service (AWS KMS) to store account numbers and OUs to manage. Update AWS KMS as needed to add or remove accounts or OUs. Create IAM users in member accounts. Allow AWS Control Tower in the management account to use the access key and secret access key to create and update AWS WAF rules in the member accounts.",
        "isCorrect": false
      }
    ],
    "comments": "Gestionar reglas de AWS WAF en múltiples cuentas/OUs, poder añadir/quitar cuentas u OUs y remediar automáticamente reglas no conformes, con el MENOR overhead.\n\nOpción A (Correcta): Usar AWS Firewall Manager para gestionar las reglas de WAF en toda la organización (aplica y remedia políticas de WAF de forma centralizada y automática en las cuentas/OUs), y usar un parámetro de SSM Parameter Store para almacenar las cuentas/OUs a gestionar, actualizándolo según haga falta; una regla de EventBridge detecta cambios en el parámetro e invoca una Lambda que actualiza la security policy en la cuenta administrativa de Firewall Manager. Firewall Manager es el servicio nativo para gobernar WAF a escala con remediación automática: mínimo overhead.\n\nOpción B: Config rule + Lambda + StackSet es más piezas y desarrollo que Firewall Manager, que ya hace esto de forma gestionada.\n\nOpción C: Roles cross-account + Lambda + STS para crear/actualizar WAF por cuenta es mucho código y operación.\n\nOpción D: Control Tower no gestiona reglas de WAF, y almacenar cuentas en KMS o usar access keys de usuarios IAM es incorrecto e inseguro.\n\nReferencias:\nhttps://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/services-that-can-integrate-fms.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30111,
    "questionNumber": 111,
    "question": "A solutions architect is auditing the security setup or an AWS Lambda function for a company. The Lambda function retrieves, the latest changes from an Amazon Aurora database. The Lambda function and the database run in the same VPC. Lambda environment variables are providing the database credentials to the Lambda function. The Lambda function aggregates data and makes the data available in an Amazon S3 bucket that is configured for server-side encryption with AWS KMS managed encryption keys (SSE-KMS). The data must not travel across the Internet. If any database credentials become compromised, the company needs a solution that minimizes the impact of the compromise. What should the solutions architect recommend to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Enable IAM database authentication on the Aurora DB cluster. Change the IAM role for the Lambda function to allow the function to access the database by using IAM database authentication. Deploy a gateway VPC endpoint for Amazon S3 in the VPC.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Enable IAM database authentication on the Aurora DB cluster. Change the IAM role for the Lambda function to allow the function to access the database by using IAM database authentication. Enforce HTTPS on the connection to Amazon S3 during data transfers.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Save the database credentials in AWS Systems Manager Parameter Store. Set up password rotation on the credentials in Parameter Store. Change the IAM role for the Lambda function to allow the function to access Parameter Store. Modify the Lambda function to retrieve the credentials from Parameter Store. Deploy a gateway VPC endpoint for Amazon S3 in the VPC.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Save the database credentials in AWS Secrets Manager. Set up password rotation on the credentials in Secrets Manager. Change the IAM role for the Lambda function to allow the function to access Secrets Manager. Modify the Lambda function to retrieve the credentials from Secrets Manager. Enforce HTTPS on the connection to Amazon S3 during data transfers.",
        "isCorrect": false
      }
    ],
    "comments": "Reducir el impacto si se comprometen las credenciales de BD que hoy están en variables de entorno de la Lambda, y que los datos NO viajen por Internet hacia S3.\n\nOpción A (Correcta): Habilitar IAM database authentication en Aurora y cambiar el rol IAM de la Lambda para que acceda a la BD mediante autenticación IAM (tokens temporales, sin contraseña estática que robar: minimiza el impacto de un compromiso). Y desplegar un gateway VPC endpoint para S3 en la VPC, de modo que el tráfico a S3 vaya por la red privada de AWS y NO por Internet. Cumple ambos requisitos de forma nativa.\n\nOpción B: IAM database auth es correcto, pero 'forzar HTTPS' hacia S3 no evita que el tráfico salga a Internet (HTTPS cifra, pero no lo mantiene en la red privada); el requisito es que NO viaje por Internet, lo que exige el VPC endpoint. Por eso A y no B.\n\nOpción C: Parameter Store con rotación reduce algo el riesgo, pero sigue habiendo una credencial estática; IAM database auth (tokens temporales) minimiza más el impacto. Además usa gateway endpoint (bien), pero la parte de credenciales es inferior a A.\n\nOpción D: Secrets Manager con rotación mejora la gestión, pero mantiene credencial estática y 'forzar HTTPS' no cumple 'no por Internet'. Inferior a A en ambos ejes.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.html\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30112,
    "questionNumber": 112,
    "question": "A large mobile gaming company has successfully migrated all of its on-premises infrastructure to the AWS Cloud. A solutions architect is reviewing the environment to ensure that it was built according to the design and that it is running in alignment with the Well-Architected Framework. While reviewing previous monthly costs in Cost Explorer, the solutions architect notices that the creation and subsequent termination of several large instance types account for a high proportion of the costs. The solutions architect finds out that the company’s developers are launching new Amazon EC2 instances as part of their testing and that the developers are not using the appropriate instance types. The solutions architect must implement a control mechanism to limit the instance types that only the developers can launch. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a desired-instance-type managed rule in AWS Config. Configure the rule with the instance types that are allowed. Attach the rule to an event to run each time a new EC2 instance is launched.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "In the EC2 console, create a launch template that specifies the instance types that are allowed. Assign the launch template to the developers’ IAM accounts.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a new IAM policy. Specify the instance types that are allowed. Attach the policy to an IAM group that contains the IAM accounts for the developers",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use EC2 Image Builder to create an image pipeline for the developers and assist them in the creation of a golden image.",
        "isCorrect": false
      }
    ],
    "comments": "Limitar los tipos de instancia EC2 que los desarrolladores pueden lanzar (control preventivo).\n\nOpción A: Una regla de AWS Config es DETECTIVA (evalúa cumplimiento tras el lanzamiento), no IMPIDE lanzar tipos no permitidos.\n\nOpción B: Un launch template sugiere/define configuración por defecto, pero no IMPIDE que el desarrollador elija otro tipo al lanzar; no es un control efectivo.\n\nOpción C (Correcta): Crear una política IAM que permita solo los tipos de instancia autorizados (con condición sobre ec2:InstanceType) y adjuntarla al grupo IAM de los desarrolladores. Es un control PREVENTIVO que impide lanzar tipos no permitidos. Correcta.\n\nOpción D: EC2 Image Builder crea AMIs (golden images), no restringe tipos de instancia. No aplica.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ExamplePolicies_EC2.html\nhttps://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonec2.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30113,
    "questionNumber": 113,
    "question": "A company is developing and hosting several projects in the AWS Cloud. The projects are developed across multiple AWS accounts under the same organization in AWS Organizations. The company requires the cost for cloud infrastructure to be allocated to the owning project. The team responsible for all of the AWS accounts has discovered that several Amazon EC2 instances are lacking the Project tag used for cost allocation. Which actions should a solutions architect lake to resolve the problem and prevent it from happening in the future? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Config rule in each account to find resources with missing tags.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an SCP in the organization with a deny action for ec2:RunInstances if the Project tag is missing.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use Amazon Inspector in the organization to find resources with missing tags.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an IAM policy in each account with a deny action for ec2:RunInstances if the Project tag is missing.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Create an AWS Config aggregator for the organization to collect a list of EC2 instances with the missing Project tag.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Use AWS Security Hub to aggregate a list of EC2 instances with the missing Project tag.",
        "isCorrect": false
      }
    ],
    "comments": "Resolver instancias EC2 sin la etiqueta Project (asignación de costes) y PREVENIR que vuelva a pasar, en múltiples cuentas de la organización.\n\nOpción A (Correcta): Crear una regla de AWS Config en cada cuenta para ENCONTRAR recursos sin la etiqueta requerida (detección de existentes).\n\nOpción B (Correcta): Crear un SCP en la organización con deny de ec2:RunInstances si falta la etiqueta Project (control PREVENTIVO organizativo que impide lanzar instancias sin la etiqueta). Previene el problema a futuro.\n\nOpción C: Amazon Inspector evalúa vulnerabilidades, no etiquetas faltantes. No aplica.\n\nOpción D: Una política IAM de deny por cuenta funcionaría, pero el control organizativo correcto y escalable es el SCP (B); además el par preventivo elegido es SCP.\n\nOpción E (Correcta): Crear un AWS Config aggregator para la organización que recopile la lista de instancias EC2 sin la etiqueta Project de todas las cuentas (visión centralizada). A + B + E: detectar en cada cuenta, agregar la lista a nivel organización y prevenir con SCP.\n\nOpción F: Security Hub agrega hallazgos de seguridad, no es el mecanismo para listar recursos sin una etiqueta de coste de forma nativa como Config aggregator.\n\nReferencias:\nhttps://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30114,
    "questionNumber": 114,
    "question": "A company has an on-premises monitoring solution using a PostgreSQL database for persistence of events. The database is unable to scale due to heavy ingestion and it frequently runs out of storage. The company wants to create a hybrid solution and has already set up a VPN connection between its network and AWS. The solution should include the following attributes: • Managed AWS services to minimize operational complexity. • A buffer that automatically scales to match the throughput of data and requires no ongoing administration. • A visualization tool to create dashboards to observe events in near-real time. • Support for semi-structured JSON data and dynamic schemas. Which combination of components will enable the company to create a monitoring solution that will satisfy these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Kinesis Data Firehose to buffer events. Create an AWS Lambda function to process and transform events.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an Amazon Kinesis data stream to buffer events. Create an AWS Lambda function to process and transform events.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure an Amazon Aurora PostgreSQL DB cluster to receive events. Use Amazon QuickSight to read from the database and create near-real-time visualizations and dashboards.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure Amazon Elasticsearch Service (Amazon ES) to receive events. Use the Kibana endpoint deployed with Amazon ES to create near-real-time visualizations and dashboards.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Configure an Amazon Neptune DB instance to receive events. Use Amazon QuickSight to read from the database and create near-real-time visualizations and dashboards.",
        "isCorrect": false
      }
    ],
    "comments": "Solución de monitorización híbrida gestionada: buffer que autoescala sin administración, visualización near-real-time, soporte de JSON semiestructurado/esquemas dinámicos.\n\nOpción A (Correcta): Amazon Kinesis Data Firehose como buffer que autoescala a la tasa de datos sin administración continua, con una Lambda para procesar/transformar los eventos. Firehose es totalmente gestionado y escala solo.\n\nOpción B: Kinesis Data Streams requiere gestionar shards/capacidad (más administración) frente a Firehose, que 'no requiere administración continua'. Por eso A (Firehose) y no B.\n\nOpción C: Aurora PostgreSQL es relacional (esquema fijo), no ideal para JSON semiestructurado/esquemas dinámicos; y QuickSight sobre BD no es la visualización near-real-time de eventos que da Kibana/OpenSearch.\n\nOpción D (Correcta): Amazon Elasticsearch/OpenSearch Service para recibir los eventos (soporta JSON semiestructurado y esquemas dinámicos) y su endpoint Kibana para crear dashboards near-real-time. A + D cumple buffer gestionado + visualización + JSON dinámico.\n\nOpción E: Neptune es una BD de grafos; no encaja con eventos JSON/dashboards de series temporales.\n\nReferencias:\nhttps://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html\nhttps://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30115,
    "questionNumber": 115,
    "question": "A team collects and routes behavioral data for an entire company. The company runs a Multi-AZ VPC environment with public subnets, private subnets, and in internet gateway. Each public subnet also contains a NAT gateway. Most of the company’s applications read from and write to Amazon Kinesis Data Streams. Most of the workloads run in private subnets. A solutions architect must review the infrastructure. The solution architect needs to reduce costs and maintain the function of the applications. The solutions architect uses Cost Explorer and notices that the cost in the EC2-Other category is consistently high. A further review shows that NatGateway-Bytes charges are increasing the cost in the EC2-Other category. What should the solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Enable VPC Flow Logs. Use Amazon Athena to analyze the logs for traffic that can be removed. Ensure that security groups are blocking traffic that is responsible for high costs.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Add an interface VPC endpoint for Kinesis Data Streams to the VPC. Ensure that applications have the correct IAM permissions to use the interface VPC endpoint.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Enable VPC Flow Logs and Amazon Detective. Review Detective findings for traffic that is not related to Kinesis Data Streams. Configure security groups to block that traffic.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Add an interface VPC endpoint for Kinesis Data Streams to the VPC. Ensure that the VPC endpoint policy allows traffic from the applications.",
        "isCorrect": true
      }
    ],
    "comments": "El coste alto en EC2-Other viene de NatGateway-Bytes: las apps en subredes privadas leen/escriben mucho en Kinesis Data Streams a través del NAT gateway (se paga por GB procesado). Reducir coste manteniendo la función.\n\nOpción A: Flow Logs + Athena + bloquear tráfico con security groups no elimina el coste del NAT para el tráfico legítimo a Kinesis; además bloquear tráfico necesario rompe la función.\n\nOpción B: Añadir un interface VPC endpoint (PrivateLink) para Kinesis es correcto, pero falta el detalle del endpoint policy que permita el tráfico; la opción D es la completa (endpoint + policy que permite el tráfico de las apps).\n\nOpción C: Flow Logs + Detective y bloquear tráfico no relacionado no ataca el coste del NAT por el tráfico a Kinesis.\n\nOpción D (Correcta): Añadir un interface VPC endpoint (PrivateLink) para Kinesis Data Streams a la VPC y asegurar que la endpoint policy permite el tráfico de las aplicaciones. Así el tráfico a Kinesis va por el endpoint privado y NO por el NAT gateway, eliminando los cargos NatGateway-Bytes de ese tráfico manteniendo la función. Correcta (incluye la política del endpoint).\n\nReferencias:\nhttps://docs.aws.amazon.com/streams/latest/dev/vpc.html\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30116,
    "questionNumber": 116,
    "question": "A retail company has an on-premises data center in Europe. The company also has a multi-Region AWS presence that includes the eu-west-1 and us-east-1 Regions. The company wants to be able to route network traffic from its on-premises infrastructure into VPCs in either of those Regions. The company also needs to support traffic that is routed directly between VPCs in those Regions. No single points of failure can exist on the network. The company already has created two 1 Gbps AWS Direct Connect connections from its on-premises data center. Each connection goes into a separate Direct Connect location in Europe for high availability. These two locations are named DX-A and DX-B, respectively. Each Region has a single AWS Transit Gateway that is configured to route all inter-VPC traffic within that Region. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a private VIF from the DX-A connection into a Direct Connect gateway. Create a private VIF from the DX-B connection into the same Direct Connect gateway for high availability. Associate both the eu-west-1 and us-east-1 transit gateways with the Direct Connect gateway. Peer the transit gateways with each other to support cross-Region routing.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a transit VIF from the DX-A connection into a Direct Connect gateway. Associate the eu-west-1 transit gateway with this Direct Connect gateway. Create a transit VIF from the DX-8 connection into a separate Direct Connect gateway. Associate the us-east-1 transit gateway with this separate Direct Connect gateway. Peer the Direct Connect gateways with each other to support high availability and cross-Region routing.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a transit VIF from the DX-A connection into a Direct Connect gateway. Create a transit VIF from the DX-B connection into the same Direct Connect gateway for high availability. Associate both the eu-west-1 and us-east-1 transit gateways with this Direct Connect gateway. Configure the Direct Connect gateway to route traffic between the transit gateways.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a transit VIF from the DX-A connection into a Direct Connect gateway. Create a transit VIF from the DX-B connection into the same Direct Connect gateway for high availability. Associate both the eu-west-1 and us-east-1 transit gateways with this Direct Connect gateway. Peer the transit gateways with each other to support cross-Region routing.",
        "isCorrect": true
      }
    ],
    "comments": "Enrutar desde on-premises (dos DX en DX-A y DX-B para HA) a VPCs en eu-west-1 y us-east-1, con tráfico directo entre VPCs de esas Regiones (hay un TGW por Región) y sin puntos únicos de fallo.\n\nOpción A: Una PRIVATE VIF conecta a una VPC/virtual private gateway, no a transit gateways; para asociar transit gateways a un Direct Connect gateway se usa una TRANSIT VIF. A es técnicamente incorrecta.\n\nOpción B: Usar Direct Connect gateways SEPARADOS y 'peer' entre ellos no es el patrón; los DX gateways no se emparejan entre sí y un solo DX gateway puede asociar ambos TGW. Incorrecta.\n\nOpción C: Un DX gateway NO enruta tráfico ENTRE transit gateways asociados (no hace de router inter-TGW); el tráfico inter-Región entre TGW requiere TGW peering. Por eso C es incorrecta.\n\nOpción D (Correcta): Crear una TRANSIT VIF desde DX-A a un Direct Connect gateway y otra TRANSIT VIF desde DX-B al MISMO DX gateway (HA de las dos conexiones), asociar los transit gateways de eu-west-1 y us-east-1 a ese DX gateway, y hacer PEERING entre los dos transit gateways para el enrutamiento cross-Región. Da conectividad on-prem->ambas Regiones, tráfico directo inter-VPC/inter-Región vía TGW peering y sin puntos únicos de fallo. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-transit-gateways.html\nhttps://docs.aws.amazon.com/vpc/latest/tgw/tgw-peering.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30117,
    "questionNumber": 117,
    "question": "A company is running an application in the AWS Cloud. The company's security team must approve the creation of all new IAM users. When a new IAM user is created, all access for the user must be removed automatically. The security team must then receive a notification to approve the user. The company has a multi-Region AWS CloudTrail trail in the AWS account. Which combination of steps will meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon EventBridge (Amazon CloudWatch Events) rule. Define a pattern with the detail-type value set to AWS API Call via CloudTrail and an eventName of CreateUser.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure CloudTrail to send a notification for the CreateUser event to an Amazon Simple Notification Service (Amazon SNS) topic.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Invoke a container that runs in Amazon Elastic Container Service (Amazon ECS) with AWS Fargate technology to remove access.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Invoke an AWS Step Functions state machine to remove access.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Use Amazon Simple Notification Service (Amazon SNS) to notify the security team.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Use Amazon Pinpoint to notify the security team.",
        "isCorrect": false
      }
    ],
    "comments": "Cuando se crea un IAM user: quitar automáticamente todo el acceso y notificar al equipo de seguridad para aprobar. Hay un trail multi-Región de CloudTrail.\n\nOpción A (Correcta): Crear una regla de EventBridge con patrón detail-type 'AWS API Call via CloudTrail' y eventName 'CreateUser' para disparar la automatización cuando se crea un usuario.\n\nOpción B: CloudTrail no 'envía notificaciones a SNS por un evento' directamente; el disparo por evento se hace con EventBridge (A). Descartada.\n\nOpción C: Invocar un contenedor ECS/Fargate para quitar acceso es más pesado que una Step Functions/Lambda; la opción elegida usa Step Functions (D).\n\nOpción D (Correcta): Invocar una máquina de estados de AWS Step Functions para quitar el acceso del nuevo usuario (orquesta las acciones de remediación).\n\nOpción E (Correcta): Usar Amazon SNS para notificar al equipo de seguridad (para que aprueben). A + D + E cubre detección, remediación y notificación.\n\nOpción F: Amazon Pinpoint es para mensajería/marketing a clientes, no para notificar a un equipo interno de seguridad; SNS (E) es lo adecuado.\n\nReferencias:\nhttps://docs.aws.amazon.com/eventbridge/latest/userguide/eb-events.html\nhttps://docs.aws.amazon.com/step-functions/latest/dg/welcome.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30118,
    "questionNumber": 118,
    "question": "A company wants to migrate to AWS. The company wants to use a multi-account structure with centrally managed access to all accounts and applications. The company also wants to keep the traffic on a private network. Multi-factor authentication (MFA) is required at login, and specific roles are assigned to user groups. The company must create separate accounts for development. staging, production, and shared network. The production account and the shared network account must have connectivity to all accounts. The development account and the staging account must have access only to each other. Which combination of steps should a solutions architect take 10 meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy a landing zone environment by using AWS Control Tower. Enroll accounts and invite existing accounts into the resulting organization in AWS Organizations.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Enable AWS Security Hub in all accounts to manage cross-account access. Collect findings through AWS CloudTrail to force MFA login.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create transit gateways and transit gateway VPC attachments in each account. Configure appropriate route tables.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Set up and enable AWS IAM Identity Center (AWS Single Sign-On). Create appropriate permission sets with required MFA for existing accounts.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Enable AWS Control Tower in all accounts to manage routing between accounts. Collect findings through AWS CloudTrail to force MFA login.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Create IAM users and groups. Configure MFA for all users. Set up Amazon Cognoto user pools and Identity pools to manage access to accounts and between accounts.",
        "isCorrect": false
      }
    ],
    "comments": "Estructura multi-cuenta con acceso centralizado, red privada, MFA en login, roles por grupos, y conectividad específica: producción y red compartida con todas; desarrollo y staging solo entre sí.\n\nOpción A (Correcta): Desplegar una landing zone con AWS Control Tower y enrolar/invitar las cuentas a la organización de AWS Organizations. Base de gobierno multi-cuenta.\n\nOpción B: Security Hub gestiona hallazgos de seguridad, no 'acceso cross-account' ni fuerza MFA vía CloudTrail. Incorrecta.\n\nOpción C (Correcta): Crear transit gateways y attachments de VPC en las cuentas y configurar las route tables adecuadas para lograr la conectividad privada requerida (producción/red compartida con todas; dev/staging solo entre sí). Con route tables del TGW se implementa esa segmentación.\n\nOpción D (Correcta): Configurar AWS IAM Identity Center (SSO) con permission sets que exijan MFA, para acceso centralizado y roles por grupos. A + C + D cubre gobierno, red privada segmentada y acceso centralizado con MFA.\n\nOpción E: 'Habilitar Control Tower en todas las cuentas para enrutar entre cuentas' no es cómo funciona (Control Tower no enruta red); el enrutamiento es del TGW (C).\n\nOpción F: Usuarios/grupos IAM + Cognito no es el acceso centralizado empresarial (Cognito es para apps/clientes, no SSO a cuentas). Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html\nhttps://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30119,
    "questionNumber": 119,
    "question": "A company runs its application in the eu-west-1 Region and has one account for each of its environments: development, testing, and production. All the environments are running 24 hours a day, 7 days a week by using stateful Amazon EC2 instances and Amazon RDS for MySQL databases. The databases are between 500 GB and 800 GB in size. The development team and testing team work on business days during business hours, but the production environment operates 24 hours a day, 7 days a week. The company wants to reduce costs. All resources are tagged with an environment tag with either development, testing, or production as the key. What should a solutions architect do to reduce costs with the LEAST operational effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon EventBridge rule that runs once every day. Configure the rule to invoke one AWS Lambda function that starts or slops instances based on me tag, day, and time.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon EventBridge rule that runs every business day in the evening. Configure the rule to invoke an AWS Lambda function that stops instances based on the tag. Create a second EventBridge rule that runs every business day in the morning. Configure the second rule lo invoke another Lambda function that starts instances based on the tag.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an Amazon EventBridge rule that runs every business day in the evening, Configure the rule to invoke an AWS Lambda function that terminates, instances based on the lag. Create a second EventBridge rule that runs every business day in the morning. Configure the second rule lo invoke another Lambda function that restores the instances from their last backup based on the tag.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Amazon EventBridge rule that runs every hour. Configure the rule to invoke one AWS Lambda function that terminates or restores instances from their last backup based on the tag. day, and time.",
        "isCorrect": false
      }
    ],
    "comments": "Reducir coste apagando dev/test fuera de horario laboral (producción 24x7), con el MENOR esfuerzo operativo. Recursos etiquetados por environment.\n\nOpción A: Una sola regla diaria con una Lambda que decide arrancar/parar 'según tag, día y hora' concentra la lógica de horarios en el código; funciona pero es menos claro/robusto que dos reglas dedicadas.\n\nOpción B (Correcta): Una regla de EventBridge que corre cada tarde de día laborable e invoca una Lambda que DETIENE (stop) las instancias con tag development/testing, y una segunda regla cada mañana de día laborable que invoca otra Lambda que las ARRANCA (start). Detener (no terminar) conserva las instancias/estado y datos; dos reglas simples cubren el horario laboral con mínimo esfuerzo. Correcta (stop/start preserva estado, apto para instancias stateful y RDS).\n\nOpción C: TERMINAR y 'restaurar desde backup' destruye las instancias y complica (restaurar RDS de 500-800 GB cada día es lento y arriesgado). No es de menor esfuerzo.\n\nOpción D: Terminar/restaurar cada hora es aún más frágil y costoso operativamente.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/TerminatingInstances.html#Stop_Start\nhttps://docs.aws.amazon.com/eventbridge/latest/userguide/eb-run-lambda-schedule.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30120,
    "questionNumber": 120,
    "question": "A company is building a software-as-a-service (SaaS) solution on AWS. The company has deployed an Amazon API Gateway REST API with AWS Lambda integration in multiple AWS Regions and in the same production account. The company offers tiered pricing that gives customers the ability to pay for the capacity to make a certain number of API calls per second. The premium tier offers up to 3,000 calls per second, and customers are identified by a unique API key. Several premium tier customers in various Regions report that they receive error responses of 429 Too Many Requests from multiple API methods during peak usage hours. Logs indicate that the Lambda function is never invoked. What could be the cause of the error messages for these customers?",
    "choices": [
      {
        "letter": "A",
        "text": "The Lambda function reached its concurrency limit.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "The Lambda function its Region limit for concurrency.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "The company reached its API Gateway account limit for calls per second.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "The company reached its API Gateway default per-method limit for calls per second.",
        "isCorrect": false
      }
    ],
    "comments": "Clientes premium en varias Regiones reciben 429 Too Many Requests en múltiples métodos y la Lambda NUNCA se invoca (el 429 lo genera API Gateway antes de llegar a Lambda).\n\nComo la Lambda no se invoca, el problema NO es de concurrencia de Lambda (descarta A y B).\n\nOpción A: Límite de concurrencia de Lambda daría errores de invocación, pero la Lambda ni se invoca. No es la causa.\n\nOpción B: 'Region limit for concurrency' de Lambda: mismo motivo, la Lambda no se invoca. Descartada.\n\nOpción C (Correcta): La empresa alcanzó el límite de API Gateway a nivel de CUENTA de llamadas por segundo (steady-state rate) de la cuenta de producción, compartido por todas las Regiones/APIs. Como afecta a múltiples métodos y varias Regiones simultáneamente y el 429 lo emite API Gateway sin invocar Lambda, la causa es el límite de cuenta de API Gateway. Correcta.\n\nOpción D: El límite por método por defecto afectaría a un método concreto, no a 'múltiples métodos en varias Regiones' a la vez; el patrón apunta al límite de cuenta (C), no al per-method.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30121,
    "questionNumber": 121,
    "question": "A financial company is planning to migrate its web application from on premises to AWS. The company uses a third-party security tool to monitor the inbound traffic to the application. The company has used the security tool for the last 15 years, and the tool has no cloud solutions available from its vendor. The company's security team is concerned about how to integrate the security tool with AWS technology. The company plans to deploy the application migration to AWS on Amazon EC2 instances. The EC2 instances will run in an Auto Scaling group in a dedicated VPC. The company needs to use the security tool to inspect all packets that come in and out of the VPC. This inspection must occur in real time and must not affect the application's performance. A solutions architect must design a target architecture on AWS that is highly available within an AWS Region. Which combination of steps should the solutions architect take to meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy the security tool on EC2 instances m a new Auto Scaling group in the existing VPC",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Deploy the web application behind a Network Load Balancer",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy an Application Load Balancer in front of the security tool instances",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Provision a Gateway Load Balancer for each Availability Zone to redirect the traffic to the security tool",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Provision a transit gateway to facilitate communication between VPCs.",
        "isCorrect": false
      }
    ],
    "comments": "Inspeccionar en tiempo real todos los paquetes de entrada/salida de la VPC con una herramienta de seguridad de terceros (sin solución cloud), HA dentro de una Región, sin afectar al rendimiento.\n\nOpción A (Correcta): Desplegar la herramienta de seguridad en instancias EC2 en un nuevo Auto Scaling group en la VPC (los appliances de terceros corren como EC2, con HA/escalado).\n\nOpción B: Poner la app tras un NLB no tiene que ver con inspeccionar todo el tráfico de la VPC con el appliance. No aporta a la inspección inline.\n\nOpción C: Un ALB delante de los appliances de seguridad no es el mecanismo para inspección inline transparente de paquetes; el servicio correcto es Gateway Load Balancer.\n\nOpción D (Correcta): Provisionar un Gateway Load Balancer por AZ para redirigir el tráfico a las instancias de la herramienta de seguridad. GWLB inserta appliances de terceros de forma transparente e inline (capa 3, protocolo GENEVE) con HA por AZ, sin afectar al rendimiento. A + D es el patrón oficial de inspección con appliance de terceros.\n\nOpción E: Un transit gateway facilita comunicación entre VPCs, no es lo que inserta el appliance de inspección; GWLB (D) es lo requerido.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html\nhttps://docs.aws.amazon.com/prescriptive-guidance/latest/inline-traffic-inspection-third-party-appliances/introduction.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30122,
    "questionNumber": 122,
    "question": "A company has purchased appliances from different vendors. The appliances all have IoT sensors. The sensors send status information in the vendors' proprietary formats to a legacy application that parses the information into JSON. The parsing is simple, but each vendor has a unique format. Once daily, the application parses all the JSON records and stores the records in a relational database for analysis. The company needs to design a new data analysis solution that can deliver faster and optimize costs. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Connect the IoT sensors to AWS IoT Core. Set a rule to invoke an AWS Lambda function to parse the information and save a .csv file to Amazon. S3 Use AWS Glue to catalog the files. Use Amazon Athena and Amazon QuickSight for analysis.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Migrate the application server to AWS Fargate, which will receive the information from IoT sensors and parse the information into a relational format. Save the parsed information to Amazon Redshlft for analysis.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS Transfer for SFTP server. Update the IoT sensor code to send the information as a .csv file through SFTP to the server. Use AWS Glue to catalog the files. Use Amazon Athena for analysis.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Snowball Edge to collect data from the IoT sensors directly to perform local analysis. Periodically collect the data into Amazon Redshift to perform global analysis.",
        "isCorrect": false
      }
    ],
    "comments": "Sensores IoT con formatos propietarios parseados a JSON por una app legacy una vez al día y almacenados en una BD relacional. Nueva solución de análisis más rápida y de menor coste.\n\nOpción A (Correcta): Conectar los sensores a AWS IoT Core, con una regla que invoque una Lambda para parsear la información y guardar un .csv en S3; catalogar con AWS Glue y analizar con Amazon Athena y QuickSight. Es una arquitectura serverless, ingesta en tiempo real (no una vez al día), y análisis barato sobre S3. Entrega más rápida y optimiza costes. Correcta.\n\nOpción B: Migrar el servidor a Fargate y guardar en Redshift mantiene un servidor de parseo y un data warehouse (coste), menos ágil/barato que IoT Core + Lambda + Athena.\n\nOpción C: Cambiar el código de los sensores para enviar CSV por SFTP es intrusivo (modificar firmware de dispositivos) y no aprovecha IoT Core. Menos adecuado.\n\nOpción D: Snowball Edge para 'análisis local' de sensores no encaja con ingesta continua ni con análisis en la nube barato. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/iot/latest/developerguide/iot-rules.html\nhttps://docs.aws.amazon.com/athena/latest/ug/what-is.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30123,
    "questionNumber": 123,
    "question": "A company is migrating some of its applications to AWS. The company wants to migrate and modernize the applications quickly after it finalizes networking and security strategies. The company has set up an AWS Direct Connect connection in a central network account. The company expects to have hundreds of AWS accounts and VPCs in the near future. The corporate network must be able to access the resources on AWS seamlessly and also must be able to communicate with all the VPCs. The company also wants to route its cloud resources to the internet through its on-premises data center. Which combination of steps will meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a Direct Connect gateway in the central account. In each of the accounts, create an association proposal by using the Direct Connect gateway and the account ID for every virtual private gateway.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a Direct Connect gateway and a transit gateway in the central network account. Attach the transit gateway to the Direct Connect gateway by using a transit VIF.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Provision an internet gateway. Attach the internet gateway to subnets. Allow internet traffic through the gateway.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Share the transit gateway with other accounts. Attach VPCs to the transit gateway.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Provision VPC peering as necessary.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Provision only private subnets. Open the necessary route on the transit gateway and customer gateway to allow outbound internet traffic from AWS to flow through NAT services that run in the data center.",
        "isCorrect": true
      }
    ],
    "comments": "Cientos de cuentas/VPCs futuras; DX en una cuenta central; la red corporativa debe acceder a todas las VPCs, y las cargas de AWS deben salir a Internet a través del data center on-premises.\n\nOpción A: Asociar cada virtual private gateway al DX gateway por cuenta no escala a cientos de VPCs ni da comunicación entre VPCs; el patrón escalable es TGW.\n\nOpción B (Correcta): Crear un Direct Connect gateway y un transit gateway en la cuenta central y adjuntar el TGW al DX gateway mediante una TRANSIT VIF. Da conectividad on-prem <-> AWS a escala.\n\nOpción C: Un internet gateway daría salida directa a Internet desde AWS, justo lo contrario de 'salir a Internet a través del data center'. Descartada.\n\nOpción D (Correcta): Compartir el transit gateway con las demás cuentas (RAM) y adjuntar las VPCs al TGW. Permite que cientos de VPCs/cuentas se comuniquen entre sí y con on-prem de forma centralizada.\n\nOpción E: VPC peering no escala a cientos de VPCs (malla n²) ni es transitivo; el TGW lo sustituye.\n\nOpción F (Correcta): Provisionar solo subredes privadas y abrir la ruta necesaria en el TGW y el customer gateway para que el tráfico saliente a Internet desde AWS fluya por los servicios NAT del data center on-premises. Cumple 'salir a Internet por el data center'. B + D + F.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/tgw/tgw-dcg-attachments.html\nhttps://docs.aws.amazon.com/vpc/latest/tgw/tgw-transit-gateways.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30124,
    "questionNumber": 124,
    "question": "A company has hundreds of AWS accounts. The company recently implemented a centralized internal process for purchasing new Reserved Instances and modifying existing Reserved Instances. This process requires all business units that want to purchase or modify Reserved Instances to submit requests to a dedicated team for procurement. Previously, business units directly purchased or modified Reserved Instances in their own respective AWS accounts autonomously. A solutions architect needs to enforce the new process in the most secure way possible. Which combination of steps should the solutions architect take to meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Ensure that all AWS accounts are part of an organization in AWS Organizations with all features enabled.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use AWS Config to report on the attachment of an IAM policy that denies access to the ec2:PurchaseReservedInstancesOffering action and the ec2:ModifyReservedInstances action.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "In each AWS account, create an IAM policy that denies the ec2:PurchaseReservedInstancesOffering action and the ec2:ModifyReservedInstances action.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an SCP that denies the ec2:PurchaseReservedInstancesOffering action and the ec2:ModifyReservedInstances action. Attach the SCP to each OU of the organization.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Ensure that all AWS accounts are part of an organization in AWS Organizations that uses the consolidated billing feature.",
        "isCorrect": false
      }
    ],
    "comments": "Forzar que las compras/modificaciones de Reserved Instances pasen por un equipo central, de la forma MÁS segura, en cientos de cuentas.\n\nOpción A (Correcta): Asegurar que todas las cuentas están en una organización de AWS Organizations con TODAS las features habilitadas (requisito para poder aplicar SCPs). Base necesaria.\n\nOpción B: AWS Config solo REPORTA si existe la política; no IMPIDE la acción. No es preventivo ni el más seguro.\n\nOpción C: Políticas IAM de deny en cada cuenta funcionan, pero son por cuenta y un admin de cuenta podría alterarlas; el control organizativo más seguro y centralizado es el SCP (D). Menos seguro/escalable que SCP.\n\nOpción D (Correcta): Crear un SCP que deniegue ec2:PurchaseReservedInstancesOffering y ec2:ModifyReservedInstances y adjuntarlo a los OUs de la organización. Como los SCP se imponen a nivel organización (ni los admin de cuenta pueden saltárselos), es la forma más segura de impedir compras/modificaciones autónomas. A + D.\n\nOpción E: Consolidated billing (sin all features) NO permite SCPs; se necesita all features (A). Descartada.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30125,
    "questionNumber": 125,
    "question": "A company is running a critical application that uses an Amazon RDS for MySQL database to store data. The RDS DB instance is deployed in Multi-AZ mode. A recent RDS database failover test caused a 40-second outage to the application. A solutions architect needs to design a solution to reduce the outage time to less than 20 seconds. Which combination of steps should the solutions architect take to meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon ElastiCache for Memcached in front of the database",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon ElastiCache for Redis in front of the database",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use RDS Proxy in front of the database.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Migrate the database to Amazon Aurora MySQL.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Create an Amazon Aurora Replica.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Create an RDS for MySQL read replica",
        "isCorrect": false
      }
    ],
    "comments": "Reducir el tiempo de failover de RDS MySQL Multi-AZ (40 s) a menos de 20 s.\n\nOpción A/B: ElastiCache (Memcached/Redis) delante de la BD acelera lecturas cacheadas, pero NO reduce el tiempo de failover de la base de datos. No cumplen el objetivo.\n\nOpción C (Correcta): Usar RDS Proxy delante de la base de datos. RDS Proxy reduce los tiempos de failover hasta un 66% preservando las conexiones de la aplicación y evitando la caché DNS.\n\nOpción D (Correcta): Migrar a Amazon Aurora MySQL, cuyo failover es mucho más rápido (típicamente <30 s y a menudo pocos segundos) que RDS Multi-AZ tradicional.\n\nOpción E (Correcta): Crear una Aurora Replica, que sirve de objetivo de failover rápido dentro del clúster Aurora. C + D + E combinados llevan el failover por debajo de 20 s.\n\nOpción F: Una read replica de RDS for MySQL no proporciona failover automático rápido (su promoción es manual); no ayuda al objetivo como Aurora + réplica.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30126,
    "questionNumber": 126,
    "question": "An AWS partner company is building a service in AWS Organizations using its organization named org1. This service requires the partner company to have access to AWS resources in a customer account, which is in a separate organization named org2. The company must establish least privilege security access using an API or command line tool to the customer account. What is the MOST secure way to allow org1 to access resources in org2?",
    "choices": [
      {
        "letter": "A",
        "text": "The customer should provide the partner company with their AWS account access keys to log in and perform the required tasks.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "The customer should create an IAM user and assign the required permissions to the IAM user. The customer should then provide the credentials to the partner company to log in and perform the required tasks.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "The customer should create an IAM role and assign the required permissions to the IAM role. The partner company should then use the IAM role’s Amazon Resource Name (ARN) when requesting access to perform the required tasks.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "The customer should create an IAM role and assign the required permissions to the IAM role. The partner company should then use the IAM role’s Amazon Resource Name (ARN), including the external ID in the IAM role’s trust policy, when requesting access to perform the required tasks.",
        "isCorrect": true
      }
    ],
    "comments": "Un tercero (org1) necesita acceso de mínimo privilegio a recursos de un cliente (org2) vía API/CLI, de la forma MÁS segura.\n\nOpción A: Compartir access keys de la cuenta del cliente es la peor práctica de seguridad (credenciales de larga duración compartidas). Descartada.\n\nOpción B: Crear un IAM user y compartir sus credenciales también expone credenciales estáticas compartidas; no es lo más seguro.\n\nOpción C: Crear un IAM role y que el tercero lo asuma por su ARN es correcto, PERO en escenarios de acceso de terceros falta el external ID para prevenir el 'confused deputy'.\n\nOpción D (Correcta): Crear un IAM role con los permisos requeridos y que el tercero lo asuma usando el ARN del rol, INCLUYENDO un external ID en la trust policy del rol. El external ID es la práctica recomendada por AWS para acceso cross-account de terceros: evita el problema del 'confused deputy' y no usa credenciales estáticas. Es la opción más segura.\n\nReferencias:\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30127,
    "questionNumber": 127,
    "question": "A delivery company needs to migrate its third-party route planning application to AWS. The third party supplies a supported Docker image from a public registry. The image can run in as many containers as required to generate the route map. The company has divided the delivery area into sections with supply hubs so that delivery drivers travel the shortest distance possible from the hubs to the customers. To reduce the time necessary to generate route maps, each section uses its own set of Docker containers with a custom configuration that processes orders only in the section's area. The company needs the ability to allocate resources cost-effectively based on the number of running containers. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon Elastic Kubernetes Service (Amazon EKS) cluster on Amazon EC2. Use the Amazon EKS CLI to launch the planning application in pods by using the --tags option to assign a custom tag to the pod.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon Elastic Kubernetes Service (Amazon EKS) cluster on AWS Fargate. Use the Amazon EKS CLI to launch the planning application. Use the AWS CLI tag-resource API call to assign a custom tag to the pod.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon Elastic Container Service (Amazon ECS) cluster on Amazon EC2. Use the AWS CLI with run-tasks set to true to launch the planning application by using the --tags option to assign a custom tag to the task.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Amazon Elastic Container Service (Amazon ECS) cluster on AWS Fargate. Use the AWS CLI run-task command and set enableECSManagedTags to true to launch the planning application. Use the --tags option to assign a custom tag to the task.",
        "isCorrect": true
      }
    ],
    "comments": "Imagen Docker de terceros, muchos contenedores con configuración por sección, y asignar recursos de forma rentable según el número de contenedores en ejecución, con el MENOR overhead.\n\nOpción A: EKS on EC2 obliga a gestionar nodos EC2 (más overhead) y '--tags' no es cómo se etiquetan pods de EKS. Descartada.\n\nOpción B: EKS on Fargate reduce nodos, pero Kubernetes añade complejidad operativa frente a ECS, y el flujo de tags descrito no es el correcto.\n\nOpción C: ECS on EC2 obliga a gestionar el clúster de instancias EC2 (más overhead) frente a Fargate.\n\nOpción D (Correcta): ECS on AWS Fargate (sin servidores que gestionar), lanzando la aplicación con 'run-task' y enableECSManagedTags=true, usando --tags para asignar una etiqueta personalizada a la tarea. Fargate factura por tarea/recursos en ejecución (asignación de coste según contenedores) y elimina la gestión de infraestructura: menor overhead. Correcta.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-using-tags.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30128,
    "questionNumber": 128,
    "question": "A software company hosts an application on AWS with resources in multiple AWS accounts and Regions. The application runs on a group of Amazon EC2 instances in an application VPC located in the us-east-1 Region with an IPv4 CIDR block of 10.10.0.0/16. In a different AWS account, a shared services VPC is located in the us-east-2 Region with an IPv4 CIDR block of 10.10.10.0/24. When a cloud engineer uses AWS CloudFormation to attempt to peer the application VPC with the shared services VPC, an error message indicates a peering failure. Which factors could cause this error? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "The IPv4 CIDR ranges of the two VPCs overlap",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "The VPCs are not in the same Region",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "One or both accounts do not have access to an Internet gateway",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "One of the VPCs was not shared through AWS Resource Access Manager",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "The IAM role in the peer accepter account does not have the correct permissions",
        "isCorrect": true
      }
    ],
    "comments": "Falla el peering entre la app VPC (10.10.0.0/16) y la shared services VPC (10.10.10.0/24). Se pide qué factores podrían causar el error.\n\nOpción A (Correcta): Los rangos CIDR se SOLAPAN: 10.10.10.0/24 está contenido dentro de 10.10.0.0/16. El VPC peering NO permite CIDR solapados, lo que causa el fallo.\n\nOpción B: El peering entre Regiones (inter-Region peering) SÍ está soportado; que estén en Regiones distintas no impide el peering por sí mismo. No es causa del fallo.\n\nOpción C: El peering no requiere internet gateway; no es un factor.\n\nOpción D: El peering no requiere compartir la VPC por RAM. No es un factor.\n\nOpción E (Correcta): En peering cross-account, la cuenta ACEPTORA debe aceptar la solicitud; si el rol/permisos IAM en la cuenta aceptante no son correctos, el peering falla. Es un factor válido. A + E.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html\nhttps://docs.aws.amazon.com/vpc/latest/peering/create-vpc-peering-connection.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30129,
    "questionNumber": 129,
    "question": "An external audit of a company’s serverless application reveals IAM policies that grant too many permissions. These policies are attached to the company's AWS Lambda execution roles. Hundreds of the company's Lambda functions have broad access permissions such as full access to Amazon S3 buckets and Amazon DynamoDB tables. The company wants each function to have only the minimum permissions that the function needs to complete its task. A solutions architect must determine which permissions each Lambda function needs. What should the solutions architect do to meet this requirement with the LEAST amount of effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up Amazon CodeGuru to profile the Lambda functions and search for AWS API calls. Create an inventory of the required API calls and resources for each Lambda function. Create new IAM access policies for each Lambda function. Review the new policies to ensure that they meet the company's business requirements.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Turn on AWS CloudTrail logging for the AWS account. Use AWS Identity and Access Management Access Analyzer to generate IAM access policies based on the activity recorded in the CloudTrail log. Review the generated policies to ensure that they meet the company's business requirements.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Turn on AWS CloudTrail logging for the AWS account. Create a script to parse the CloudTrail log, search for AWS API calls by Lambda execution role, and create a summary report. Review the report. Create IAM access policies that provide more restrictive permissions for each Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Turn on AWS CloudTrail logging for the AWS account. Export the CloudTrail logs to Amazon S3. Use Amazon EMR to process the CloudTrail logs in Amazon S3 and produce a report of API calls and resources used by each execution role. Create a new IAM access policy for each role. Export the generated roles to an S3 bucket. Review the generated policies to ensure that they meet the company’s business requirements.",
        "isCorrect": false
      }
    ],
    "comments": "Ajustar cientos de roles de ejecución de Lambda al mínimo privilegio determinando qué permisos usa cada función, con el MENOR esfuerzo.\n\nOpción A: CodeGuru perfila rendimiento/código, no genera políticas IAM de mínimo privilegio a partir del uso. No es la herramienta.\n\nOpción B (Correcta): Activar CloudTrail y usar IAM Access Analyzer para GENERAR políticas de acceso basadas en la actividad registrada en CloudTrail (Access Analyzer policy generation), y revisar las políticas generadas. Access Analyzer analiza CloudTrail y produce políticas de mínimo privilegio automáticamente: el menor esfuerzo para cientos de funciones. Correcta.\n\nOpción C: Escribir un script propio para parsear CloudTrail y resumir llamadas es mucho trabajo manual frente a Access Analyzer.\n\nOpción D: EMR sobre logs de CloudTrail es aún más complejo y costoso; no es de menor esfuerzo.\n\nReferencias:\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html\nhttps://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30130,
    "questionNumber": 130,
    "question": "A solutions architect must analyze a company’s Amazon EC2 instances and Amazon Elastic Block Store (Amazon EBS) volumes to determine whether the company is using resources efficiently. The company is running several large, high-memory EC2 instances to host database clusters that are deployed in active/passive configurations. The utilization of these EC2 instances varies by the applications that use the databases, and the company has not identified a pattern. The solutions architect must analyze the environment and take action based on the findings. Which solution meets these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a dashboard by using AWS Systems Manager OpsCenter. Configure visualizations for Amazon CloudWatch metrics that are associated with the EC2 instances and their EBS volumes. Review the dashboard periodically, and identify usage patterns. Rightsize the EC2 instances based on the peaks in the metrics.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Turn on Amazon CloudWatch detailed monitoring for the EC2 instances and their EBS volumes. Create and review a dashboard that is based on the metrics. Identify usage patterns. Rightsize the EC2 instances based on the peaks in the metrics.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Install the Amazon CloudWatch agent on each of the EC2 instances. Turn on AWS Compute Optimizer, and let it run for at least 12 hours. Review the recommendations from Compute Optimizer, and rightsize the EC2 instances as directed.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Sign up for the AWS Enterprise Support plan. Turn on AWS Trusted Advisor. Wait 12 hours. Review the recommendations from Trusted Advisor, and rightsize the EC2 instances as directed.",
        "isCorrect": false
      }
    ],
    "comments": "Analizar EC2/EBS para rightsizing cuando la utilización es variable/sin patrón claro, de la forma MÁS rentable.\n\nOpción A: OpsCenter no es para dashboards de métricas de rightsizing; construir dashboards y hacerlo a mano es más trabajo y menos preciso.\n\nOpción B: El detailed monitoring + dashboard manual funciona pero requiere análisis manual de picos; menos eficiente/preciso que Compute Optimizer.\n\nOpción C (Correcta): Instalar el CloudWatch agent en las EC2 (para métricas de memoria, clave en instancias high-memory), activar AWS Compute Optimizer y dejarlo recopilar (al menos las horas necesarias), y aplicar sus recomendaciones de rightsizing. Compute Optimizer usa ML sobre las métricas para recomendar el tamaño óptimo automáticamente: la forma más rentable y precisa, especialmente con utilización variable. Correcta.\n\nOpción D: El plan Enterprise Support + Trusted Advisor es caro y sus checks de rightsizing son más limitados que Compute Optimizer para este análisis. No es lo más rentable.\n\nReferencias:\nhttps://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30131,
    "questionNumber": 131,
    "question": "A company uses AWS Organizations for a multi-account setup in the AWS Cloud. The company uses AWS Control Tower for governance and uses AWS Transit Gateway for VPC connectivity across accounts. In an AWS application account, the company’s application team has deployed a web application that uses AWS Lambda and Amazon RDS. The company's database administrators have a separate DBA account and use the account to centrally manage all the databases across the organization. The database administrators use an Amazon EC2 instance that is deployed in the DBA account to access an RDS database that is deployed m the application account. The application team has stored the database credentials as secrets in AWS Secrets Manager in the application account. The application team is manually sharing the secrets with the database administrators. The secrets are encrypted by the default AWS managed key for Secrets Manager in the application account. A solutions architect needs to implement a solution that gives the database administrators access to the database and eliminates the need to manually share the secrets. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Resource Access Manager (AWS RAM) to share the secrets from the application account with the DBA account. In the DBA account, create an IAM role that is named DBA-Admin. Grant the role the required permissions to access the shared secrets. Attach the DBA-Admin role to the EC2 instance for access to the cross-account secrets.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "In the application account, create an IAM role that is named DBA-Secret. Grant the role the required permissions to access the secrets. In the DBA account, create an IAM role that is named DBA-Admin. Grant the DBA-Admin role the required permissions to assume the DBA-Secret role in the application account. Attach the DBA-Admin role to the EC2 instance for access to the cross-account secrets",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "In the DBA account create an IAM role that is named DBA-Admin. Grant the role the required permissions to access the secrets and the default AWS managed key in the application account. In the application account, attach resource-based policies to the key to allow access from the DBA account. Attach the DBA-Admin role to the EC2 instance for access to the cross-account secrets.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "In the DBA account, create an IAM role that is named DBA-Admin. Grant the role the required permissions to access the secrets in the application account. Attach an SCP to the application account to allow access to the secrets from the DBA account. Attach the DBA-Admin role to the EC2 instance for access to the cross-account secrets.",
        "isCorrect": false
      }
    ],
    "comments": "Dar a los DBA (cuenta DBA) acceso a un secreto de Secrets Manager de la cuenta de aplicación sin compartirlo manualmente. El secreto está cifrado con la clave AWS managed por defecto de Secrets Manager.\n\nClave: NO se puede conceder acceso cross-account a la clave AWS MANAGED por defecto (aws/secretsmanager) mediante políticas; solo las customer managed keys permiten políticas cross-account. Por eso las opciones que dependen de dar acceso a la default key (C) no funcionan.\n\nOpción A: RAM no comparte secretos de Secrets Manager de esa forma; no es el mecanismo. Descartada.\n\nOpción B (Correcta): En la cuenta de aplicación, crear un rol DBA-Secret con permisos para acceder al secreto; en la cuenta DBA, crear un rol DBA-Admin con permiso para ASUMIR el rol DBA-Secret de la cuenta de aplicación; adjuntar DBA-Admin a la EC2. Al asumir un rol EN la cuenta de aplicación, el acceso al secreto (y a su default key, que confía en los principales de su propia cuenta) funciona sin compartir la clave cross-account. Es el patrón correcto. Correcta.\n\nOpción C: Depende de conceder acceso cross-account a la clave AWS managed por defecto, lo cual no es posible con la default key. Incorrecta.\n\nOpción D: Un SCP no CONCEDE acceso (solo restringe) y no resuelve el cifrado con la default key. Incorrecta.\n\nReferencias:\nhttps://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples_cross.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30132,
    "questionNumber": 132,
    "question": "A company manages multiple AWS accounts by using AWS Organizations. Under the root OU, the company has two OUs: Research and DataOps. Because of regulatory requirements, all resources that the company deploys in the organization must reside in the ap-northeast-1 Region. Additionally, EC2 instances that the company deploys in the DataOps OU must use a predefined list of instance types. A solutions architect must implement a solution that applies these restrictions. The solution must maximize operational efficiency and must minimize ongoing maintenance. Which combination of steps will meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an IAM role in one account under the DataOps OU. Use the ec2:InstanceType condition key in an inline policy on the role to restrict access to specific instance type.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an IAM user in all accounts under the root OU. Use the aws:RequestedRegion condition key in an inline policy on each user to restrict access to all AWS Regions except ap-northeast-1.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an SCP. Use the aws:RequestedRegion condition key to restrict access to all AWS Regions except ap-northeast-1. Apply the SCP to the root OU.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an SCP. Use the ec2:Region condition key to restrict access to all AWS Regions except ap-northeast-1. Apply the SCP to the root OU, the DataOps OU, and the Research OU.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Create an SCP. Use the ec2:InstanceType condition key to restrict access to specific instance types. Apply the SCP to the DataOps OU.",
        "isCorrect": true
      }
    ],
    "comments": "Restringir todos los recursos a ap-northeast-1 (toda la organización) y, en el OU DataOps, limitar los tipos de instancia EC2 a una lista predefinida, maximizando eficiencia y minimizando mantenimiento.\n\nOpción A: Un rol IAM en una sola cuenta no aplica a todo el OU ni es escalable; el control organizativo es el SCP.\n\nOpción B: Usuarios IAM en todas las cuentas con inline policies es alto mantenimiento y no escala; el SCP con aws:RequestedRegion es lo correcto.\n\nOpción C (Correcta): Un SCP que usa la condición aws:RequestedRegion para denegar todas las Regiones excepto ap-northeast-1, aplicado al ROOT OU (afecta a toda la organización). Restringe la Región de forma global y de bajo mantenimiento.\n\nOpción D: 'ec2:Region' no es la clave de condición correcta para restringir Regiones a nivel global (la clave general es aws:RequestedRegion); C es la correcta.\n\nOpción E (Correcta): Un SCP que usa ec2:InstanceType para restringir a los tipos permitidos, aplicado SOLO al OU DataOps. C + E cumple ambas restricciones con SCPs (máxima eficiencia, mínimo mantenimiento).\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples_general.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples_ec2.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  }
];
