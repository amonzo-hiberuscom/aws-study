import { Question } from '../../types';

export const QUESTIONS_PART_3: Question[] = [
  {
    "id": 30265,
    "questionNumber": 265,
    "question": "A company uses AWS Organizations to manage more than 1,000 AWS accounts. The company has created a new developer organization. There are 540 developer member accounts that must be moved to the new developer organization. All accounts are set up with all the required information so that each account can be operated as a standalone account. Which combination of steps should a solutions architect take to move all of the developer accounts to the new developer organization? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Call the MoveAccount operation in the Organizations API from the old organization's management account to migrate the developer accounts to the new developer organization.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "From the management account, remove each developer account from the old organization using the RemoveAccountFromOrganization operation in the Organizations API.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "From each developer account, remove the account from the old organization using the RemoveAccountFromOrganization operation in the Organizations API.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Sign in to the new developer organization's management account and create a placeholder member account that acts as a target for the developer account migration.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Call the InviteAccountToOrganization operation in the Organizations API from the new developer organization's management account to send invitations to the developer accounts.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Have each developer sign in to their account and confirm to join the new developer organization.",
        "isCorrect": true
      }
    ],
    "comments": "Mover 540 cuentas de desarrollador (ya operables como standalone) de una organización a otra nueva en AWS Organizations (elegir tres).\n\nOpción B (Correcta): retirar cada cuenta de la organización antigua con RemoveAccountFromOrganization desde la management account de origen.\nOpción E (Correcta): invitar las cuentas a la nueva organización con InviteAccountToOrganization desde la management account destino.\nOpción F (Correcta): cada cuenta acepta la invitación para completar la unión a la nueva organización.\nOpción A: no existe MoveAccount para trasladar cuentas entre organizaciones distintas; MoveAccount solo mueve entre OUs de la misma organización.\nOpción C: RemoveAccountFromOrganization no se ejecuta desde la propia cuenta miembro para migrarla; el flujo válido es desde la management account.\nOpción D: no se necesita una cuenta placeholder como destino de migración.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_remove.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_invites.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30266,
    "questionNumber": 266,
    "question": "A company’s interactive web application uses an Amazon CloudFront distribution to serve images from an Amazon S3 bucket. Occasionally, third-party tools ingest corrupted images into the S3 bucket. This image corruption causes a poor user experience in the application later. The company has successfully implemented and tested Python logic to detect corrupt images. A solutions architect must recommend a solution to integrate the detection logic with minimal latency between the ingestion and serving. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use a Lambda@Edge function that is invoked by a viewer-response event.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use a Lambda@Edge function that is invoked by an origin-response event.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use an S3 event notification that invokes an AWS Lambda function.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use an S3 event notification that invokes an AWS Step Functions state machine.",
        "isCorrect": false
      }
    ],
    "comments": "Detectar imágenes corruptas ingeridas en S3 con lógica Python y la MENOR latencia entre ingesta y servicio vía CloudFront.\n\nOpción C (Correcta): una notificación de evento S3 que invoca Lambda actúa en el momento de la ingesta, antes de que la imagen se sirva, minimizando latencia percibida por el usuario.\nOpción A: Lambda@Edge en viewer-response se ejecuta en cada respuesta al cliente, añadiendo latencia en el servicio y coste por petición.\nOpción B: Lambda@Edge en origin-response se ejecuta al recuperar del origen, también en el camino de servicio y no en la ingesta.\nOpción D: S3 event a Step Functions añade orquestación innecesaria para una simple validación puntual.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html\nhttps://docs.aws.amazon.com/lambda/latest/dg/with-s3.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30267,
    "questionNumber": 267,
    "question": "A company has an application that runs on Amazon EC2 instances in an Amazon EC2 Auto Scaling group. The company uses AWS CodePipeline to deploy the application. The instances that run in the Auto Scaling group are constantly changing because of scaling events. When the company deploys new application code versions, the company installs the AWS CodeDeploy agent on any new target EC2 instances and associates the instances with the CodeDeploy deployment group. The application is set to go live within the next 24 hours. What should a solutions architect recommend to automate the application deployment process with the LEAST amount of operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure Amazon EventBridge to invoke an AWS Lambda function when a new EC2 instance is launched into the Auto Scaling group. Code the Lambda function to associate the EC2 instances with the CodeDeploy deployment group.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Write a script to suspend Amazon EC2 Auto Scaling operations before the deployment of new code. When the deployment is complete, create a new AMI and configure the Auto Scaling group's launch template to use the new AMI for new launches. Resume Amazon EC2 Auto Scaling operations.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a new AWS CodeBuild project that creates a new AMI that contains the new code. Configure CodeBuild to update the Auto Scaling group’s launch template to the new AMI. Run an Amazon EC2 Auto Scaling instance refresh operation.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a new AMI that has the CodeDeploy agent installed. Configure the Auto Scaling group’s launch template to use the new AMI. Associate the CodeDeploy deployment group with the Auto Scaling group instead of the EC2 instances.",
        "isCorrect": true
      }
    ],
    "comments": "Automatizar el despliegue con CodeDeploy en un Auto Scaling group cuyas instancias cambian constantemente, con el MENOR overhead operativo.\n\nOpción D (Correcta): crear un AMI con el agente CodeDeploy preinstalado y asociar el deployment group directamente al Auto Scaling group hace que las nuevas instancias reciban despliegues automáticamente sin scripts ni Lambdas.\nOpción A: una Lambda por EventBridge que asocia cada instancia añade código y mantenimiento evitables.\nOpción B: suspender el ASG y crear AMIs manualmente introduce pasos manuales y ventanas de indisponibilidad.\nOpción C: hornear el código en el AMI y refrescar instancias abandona CodeDeploy y complica el pipeline existente.\n\nReferencias:\nhttps://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html\nhttps://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30268,
    "questionNumber": 268,
    "question": "A company has a website that runs on four Amazon EC2 instances that are behind an Application Load Balancer (ALB). When the ALB detects that an EC2 instance is no longer available, an Amazon CloudWatch alarm enters the ALARM state. A member of the company's operations team then manually adds a new EC2 instance behind the ALB. A solutions architect needs to design a highly available solution that automatically handles the replacement of EC2 instances. The company needs to minimize downtime during the switch to the new solution. Which set of steps should the solutions architect take to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Delete the existing ALB. Create an Auto Scaling group that is configured to handle the web application traffic. Attach a new launch template to the Auto Scaling group. Create a new ALB. Attach the Auto Scaling group to the new ALB. Attach the existing EC2 instances to the Auto Scaling group.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Auto Scaling group that is configured to handle the web application traffic. Attach a new launch template to the Auto Scaling group. Attach the Auto Scaling group to the existing ALAttach the existing EC2 instances to the Auto Scaling group.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Delete the existing ALB and the EC2 instances. Create an Auto Scaling group that is configured to handle the web application traffic. Attach a new launch template to the Auto Scaling group. Create a new ALB. Attach the Auto Scaling group to the new ALB. Wait for the Auto Scaling group to launch the minimum number of EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Auto Scaling group that is configured to handle the web application traffic. Attach a new launch template to the Auto Scaling group. Attach the Auto Scaling group to the existing ALB. Wait for the existing ALB to register the existing EC2 instances with the Auto Scaling group.",
        "isCorrect": false
      }
    ],
    "comments": "Sustituir el reemplazo MANUAL de instancias por una solución de alta disponibilidad automática, minimizando el downtime durante la transición.\n\nOpción B (Correcta): crear un Auto Scaling group con launch template, adjuntarlo al ALB existente y añadir las instancias actuales al ASG habilita reemplazo automático sin recrear el ALB ni interrumpir el servicio.\nOpción A: borrar el ALB existente para recrearlo causa downtime y cambio de DNS innecesario.\nOpción C: borrar ALB e instancias provoca corte total del servicio.\nOpción D: esperar a que el ALB registre instancias en el ASG invierte la relación; es el ASG quien registra sus instancias en el ALB.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/attach-load-balancer-asg.html\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/attach-instance-asg.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30269,
    "questionNumber": 269,
    "question": "A company wants to optimize AWS data-transfer costs and compute costs across developer accounts within the company's organization in AWS Organizations. Developers can configure VPCs and launch Amazon EC2 instances in a single AWS Region. The EC2 instances retrieve approximately 1 TB of data each day from Amazon S3. The developer activity leads to excessive monthly data-transfer charges and NAT gateway processing charges between EC2 instances and S3 buckets, along with high compute costs. The company wants to proactively enforce approved architectural patterns for any EC2 instance and VPC infrastructure that developers deploy within the AWS accounts. The company does not want this enforcement to negatively affect the speed at which the developers can perform their tasks. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Create SCPs to prevent developers from launching unapproved EC2 instance types. Provide the developers with an AWS CloudFormation template to deploy an approved VPC configuration with S3 interface endpoints. Scope the developers' IAM permissions so that the developers can launch VPC resources only with CloudFormation.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a daily forecasted budget with AWS Budgets to monitor EC2 compute costs and S3 data-transfer costs across the developer accounts. When the forecasted cost is 75% of the actual budget cost, send an alert to the developer teams. If the actual budget cost is 100%, create a budget action to terminate the developers' EC2 instances and VPC infrastructure.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS Service Catalog portfolio that users can use to create an approved VPC configuration with S3 gateway endpoints and approved EC2 instances. Share the portfolio with the developer accounts. Configure an AWS Service Catalog launch constraint to use an approved IAM role. Scope the developers' IAM permissions to allow access only to AWS Service Catalog.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create and deploy AWS Config rules to monitor the compliance of EC2 and VPC resources in the developer AWS accounts. If developers launch unapproved EC2 instances or if developers create VPCs without S3 gateway endpoints, perform a remediation action to terminate the unapproved resources.",
        "isCorrect": false
      }
    ],
    "comments": "Reducir costes de transferencia (1 TB/día a S3), de NAT gateway y de cómputo en cuentas de desarrollo, imponiendo patrones aprobados de forma PROACTIVA sin frenar a los desarrolladores, MÁS rentable.\n\nOpción C (Correcta): AWS Service Catalog con un producto que despliega VPC con gateway endpoints de S3 (transferencia S3 gratis, sin NAT) y tipos de EC2 aprobados, compartido con las cuentas y con launch constraint, guía a los desarrolladores por patrones aprobados sin bloquearlos.\nOpción A: SCPs más plantillas CloudFormation usan interface endpoints de pago innecesarios y son más rígidas de mantener por cuenta.\nOpción B: los presupuestos de AWS Budgets son reactivos y terminar recursos al 100% interrumpe el trabajo.\nOpción D: AWS Config con remediación que termina recursos es reactivo y afecta a la velocidad de trabajo.\n\nReferencias:\nhttps://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30270,
    "questionNumber": 270,
    "question": "A company is expanding. The company plans to separate its resources into hundreds of different AWS accounts in multiple AWS Regions. A solutions architect must recommend a solution that denies access to any operations outside of specifically designated Regions. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create IAM roles for each account. Create IAM policies with conditional allow permissions that include only approved Regions for the accounts.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an organization in AWS Organizations. Create IAM users for each account. Attach a policy to each user to block access to Regions where an account cannot deploy infrastructure.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Launch an AWS Control Tower landing zone. Create OUs and attach SCPs that deny access to run services outside of the approved Regions.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Enable AWS Security Hub in each account. Create controls to specify the Regions where an account can deploy infrastructure.",
        "isCorrect": false
      }
    ],
    "comments": "Cientos de cuentas en varias Regiones que deben DENEGAR cualquier operación fuera de Regiones designadas.\n\nOpción C (Correcta): un landing zone de AWS Control Tower con OUs y SCPs que denieguen servicios fuera de las Regiones aprobadas aplica el guardrail de forma central y heredada.\nOpción A: políticas IAM por cuenta con allow condicional no se escalan ni impiden que un admin las modifique.\nOpción B: crear usuarios IAM por cuenta y adjuntar políticas es inmanejable y no es un guardrail organizativo.\nOpción D: Security Hub detecta y reporta cumplimiento pero no impide operaciones.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples_general.html\nhttps://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30271,
    "questionNumber": 271,
    "question": "A company wants to refactor its retail ordering web application that currently has a load-balanced Amazon EC2 instance fleet for web hosting, database API services, and business logic. The company needs to create a decoupled, scalable architecture with a mechanism for retaining failed orders while also minimizing operational costs. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon S3 for web hosting with Amazon API Gateway for database API services. Use Amazon Simple Queue Service (Amazon SQS) for order queuing. Use Amazon Elastic Container Service (Amazon ECS) for business logic with Amazon SQS long polling for retaining failed orders.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Elastic Beanstalk for web hosting with Amazon API Gateway for database API services. Use Amazon MQ for order queuing. Use AWS Step Functions for business logic with Amazon S3 Glacier Deep Archive for retaining failed orders.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Amazon S3 for web hosting with AWS AppSync for database API services. Use Amazon Simple Queue Service (Amazon SQS) for order queuing. Use AWS Lambda for business logic with an Amazon SQS dead-letter queue for retaining failed orders.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use Amazon Lightsail for web hosting with AWS AppSync for database API services. Use Amazon Simple Email Service (Amazon SES) for order queuing. Use Amazon Elastic Kubernetes Service (Amazon EKS) for business logic with Amazon OpenSearch Service for retaining failed orders.",
        "isCorrect": false
      }
    ],
    "comments": "Refactorizar una app de pedidos a una arquitectura DESACOPLADA y escalable, reteniendo pedidos fallidos y minimizando costes operativos.\n\nOpción C (Correcta): S3 para hosting estático, AppSync para API de datos, SQS para encolar pedidos, Lambda para lógica de negocio y una dead-letter queue de SQS para retener pedidos fallidos: totalmente serverless, desacoplada y de bajo coste operativo.\nOpción A: usar SQS long polling para retener fallidos no aísla mensajes fallidos como sí lo hace una DLQ; ECS añade gestión de cluster.\nOpción B: Amazon MQ y Step Functions con Glacier Deep Archive para pedidos fallidos son pesados y con recuperación lenta.\nOpción D: SES no es un sistema de colas y OpenSearch no retiene pedidos fallidos; EKS añade overhead.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html\nhttps://docs.aws.amazon.com/appsync/latest/devguide/what-is-appsync.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30272,
    "questionNumber": 272,
    "question": "A company hosts a web application on AWS in the us-east-1 Region. The application servers are distributed across three Availability Zones behind an Application Load Balancer. The database is hosted in a MySQL database on an Amazon EC2 instance. A solutions architect needs to design a cross-Region data recovery solution using AWS services with an RTO of less than 5 minutes and an RPO of less than 1 minute. The solutions architect is deploying application servers in us-west-2, and has configured Amazon Route 53 health checks and DNS failover to us-west-2. Which additional step should the solutions architect take?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate the database to an Amazon RDS for MySQL instance with a cross-Region read replica in us-west-2.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Migrate the database to an Amazon Aurora global database with the primary in us-east-1 and the secondary in us-west-2.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Migrate the database to an Amazon RDS for MySQL instance with a Multi-AZ deployment.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a MySQL standby database on an Amazon EC2 instance in us-west-2.",
        "isCorrect": false
      }
    ],
    "comments": "DR entre Regiones con RTO menor de 5 minutos y RPO menor de 1 minuto, con failover DNS ya configurado a us-west-2.\n\nOpción B (Correcta): Amazon Aurora Global Database replica con latencia típica menor de 1 segundo (RPO menor de 1 min) y permite promover la secundaria en us-west-2 en menos de 1 minuto (RTO menor de 5 min).\nOpción A: la read replica cross-Region de RDS MySQL tiene mayor lag y promoción más lenta, difícil de cumplir el RPO/RTO.\nOpción C: Multi-AZ es alta disponibilidad intra-Región, no DR entre Regiones.\nOpción D: un standby MySQL manual en EC2 no garantiza el RPO/RTO y aumenta el overhead.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30273,
    "questionNumber": 273,
    "question": "A company is using AWS Organizations to manage multiple accounts. Due to regulatory requirements, the company wants to restrict specific member accounts to certain AWS Regions, where they are permitted to deploy resources. The resources in the accounts must be tagged, enforced based on a group standard, and centrally managed with minimal configuration. What should a solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Config rule in the specific member accounts to limit Regions and apply a tag policy.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "From the AWS Billing and Cost Management console, in the management account, disable Regions for the specific member accounts and apply a tag policy on the root.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Associate the specific member accounts with the root. Apply a tag policy and an SCP using conditions to limit Regions.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Associate the specific member accounts with a new OU. Apply a tag policy and an SCP using conditions to limit Regions.",
        "isCorrect": true
      }
    ],
    "comments": "Restringir cuentas miembro a ciertas Regiones y forzar etiquetado por estándar de grupo, gestionado centralmente con MÍNIMA configuración.\n\nOpción D (Correcta): asociar las cuentas a una nueva OU y aplicar una tag policy más un SCP con condición de Región aplica ambas reglas de forma heredada y con mínima configuración.\nOpción A: AWS Config por cuenta es reactivo y no impide despliegues fuera de Región.\nOpción B: deshabilitar Regiones desde facturación no es el mecanismo de control y aplicar tag policy en la raíz afecta a todas las cuentas.\nOpción C: aplicar SCP y tag policy en la raíz impacta a toda la organización, no solo a las cuentas objetivo.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30274,
    "questionNumber": 274,
    "question": "A company has an application that generates reports and stores them in an Amazon S3 bucket. When a user accesses their report, the application generates a signed URL to allow the user to download the report. The company's security team has discovered that the files are public and that anyone can download them without authentication. The company has suspended the generation of new reports until the problem is resolved. Which set of actions will immediately remediate the security issue without impacting the application's normal workflow?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Lambda function that applies a deny all policy for users who are not authenticated. Create a scheduled event to invoke the Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Review the AWS Trusted Advisor bucket permissions check and implement the recommended actions.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Run a script that puts a private ACL on all of the objects in the bucket.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use the Block Public Access feature in Amazon S3 to set the IgnorePublicAcIs option to TRUE on the bucket.",
        "isCorrect": true
      }
    ],
    "comments": "Los reports en S3 son públicos por ACLs pese a usar URLs firmadas; remediar de INMEDIATO sin romper el flujo normal (que usa signed URLs).\n\nOpción D (Correcta): activar Block Public Access con IgnorePublicAcls=TRUE ignora las ACLs públicas al instante sin borrarlas, y las URLs firmadas siguen funcionando porque no dependen de ACLs.\nOpción A: una Lambda con política deny-all programada es lenta de implementar y puede romper el acceso legítimo.\nOpción B: seguir las recomendaciones de Trusted Advisor no es una acción inmediata concreta.\nOpción C: reescribir ACLs privadas objeto a objeto es lento en buckets grandes y no bloquea futuras ACLs públicas.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30275,
    "questionNumber": 275,
    "question": "A company is planning to migrate an Amazon RDS for Oracle database to an RDS for PostgreSQL DB instance in another AWS account. A solutions architect needs to design a migration strategy that will require no downtime and that will minimize the amount of time necessary to complete the migration. The migration strategy must replicate all existing data and any new data that is created during the migration. The target database must be identical to the source database at completion of the migration process. All applications currently use an Amazon Route 53 CNAME record as their endpoint for communication with the RDS for Oracle DB instance. The RDS for Oracle DB instance is in a private subnet. Which combination of steps should the solutions architect take to meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new RDS for PostgreSQL DB instance in the target account. Use the AWS Schema Conversion Tool (AWS SCT) to migrate the database schema from the source database to the target database.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use the AWS Schema Conversion Tool (AWS SCT) to create a new RDS for PostgreSQL DB instance in the target account with the schema and initial data from the source database.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure VPC peering between the VPCs in the two AWS accounts to provide connectivity to both DB instances from the target account. Configure the security groups that are attached to each DB instance to allow traffic on the database port from the VPC in the target account.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Temporarily allow the source DB instance to be publicly accessible to provide connectivity from the VPC in the target account. Configure the security groups that are attached to each DB instance to allow traffic on the database port from the VPC in the target account.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Use AWS Database Migration Service (AWS DMS) in the target account to perform a full load plus change data capture (CDC) migration from the source database to the target database. When the migration is complete, change the CNAME record to point to the target DB instance endpoint.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Use AWS Database Migration Service (AWS DMS) in the target account to perform a change data capture (CDC) migration from the source database to the target database. When the migration is complete, change the CNAME record to point to the target DB instance endpoint.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar RDS for Oracle a RDS for PostgreSQL en otra cuenta SIN downtime y con datos idénticos, replicando datos existentes y nuevos (elegir tres).\n\nOpción A (Correcta): crear la instancia PostgreSQL destino y usar AWS SCT para convertir el esquema Oracle a PostgreSQL.\nOpción C (Correcta): VPC peering entre las dos cuentas y security groups que permitan el puerto de BD dan conectividad privada entre instancias.\nOpción E (Correcta): AWS DMS con full load más CDC replica datos existentes y cambios continuos; al terminar se actualiza el CNAME al endpoint destino, sin downtime.\nOpción B: SCT no crea la instancia con datos; convierte esquema, la carga de datos la hace DMS.\nOpción D: hacer la BD origen pública para dar conectividad viola la seguridad; el peering es la vía privada.\nOpción F: solo CDC sin full load no replica los datos preexistentes, la BD destino no quedaría idéntica.\n\nReferencias:\nhttps://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html\nhttps://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html",
    "category": "Migración y Modernización",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30276,
    "questionNumber": 276,
    "question": "A company has implemented an ordering system using an event-driven architecture. During initial testing, the system stopped processing orders. Further log analysis revealed that one order message in an Amazon Simple Queue Service (Amazon SQS) standard queue was causing an error on the backend and blocking all subsequent order messages. The visibility timeout of the queue is set to 30 seconds, and the backend processing timeout is set to 10 seconds. A solutions architect needs to analyze faulty order messages and ensure that the system continues to process subsequent messages. Which step should the solutions architect take to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Increase the backend processing timeout to 30 seconds to match the visibility timeout.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Reduce the visibility timeout of the queue to automatically remove the faulty message.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure a new SQS FIFO queue as a dead-letter queue to isolate the faulty messages.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure a new SQS standard queue as a dead-letter queue to isolate the faulty messages.",
        "isCorrect": true
      }
    ],
    "comments": "Un mensaje defectuoso en una cola SQS estándar bloquea el resto; hay que aislar los mensajes fallidos y seguir procesando los siguientes.\n\nOpción D (Correcta): configurar una cola SQS estándar como dead-letter queue mueve los mensajes que superan el maxReceiveCount, aislando el fallido y desbloqueando la cola principal (una cola estándar no puede tener DLQ FIFO).\nOpción A: aumentar el timeout de procesamiento a 30 s no resuelve el mensaje envenenado, seguiría fallando.\nOpción B: reducir el visibility timeout no elimina el mensaje fallido y lo reentrega antes.\nOpción C: una DLQ FIFO no es compatible como destino de una cola estándar.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html\nhttps://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30277,
    "questionNumber": 277,
    "question": "A company has automated the nightly retraining of its machine learning models by using AWS Step Functions. The workflow consists of multiple steps that use AWS Lambda. Each step can fail for various reasons, and any failure causes a failure of the overall workflow. A review reveals that the retraining has failed multiple nights in a row without the company noticing the failure. A solutions architect needs to improve the workflow so that notifications are sent for all types of failures in the retraining process. Which combination of steps should the solutions architect take to meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon Simple Notification Service (Amazon SNS) topic with a subscription of type \"Email\" that targets the team's mailing list.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a task named \"Email\" that forwards the input arguments to the SNS topic.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Add a Catch field to all Task, Map, and Parallel states that have a statement of \"ErrorEquals\": [ \"States.ALL\" ] and \"Next”: \"Email\".",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Add a new email address to Amazon Simple Email Service (Amazon SES). Verify the email address.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Create a task named \"Email\" that forwards the input arguments to the SES email address.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Add a Catch field to all Task, Map, and Parallel states that have a statement of \"ErrorEquals\": [ \"States.Runtime\" ] and \"Next\": \"Email\".",
        "isCorrect": false
      }
    ],
    "comments": "Enviar notificaciones ante CUALQUIER tipo de fallo del workflow de Step Functions que reentrena modelos (elegir tres).\n\nOpción A (Correcta): crear un topic SNS con suscripción Email a la lista del equipo.\nOpción B (Correcta): un estado/tarea Email que reenvía los argumentos al topic SNS envía la alerta.\nOpción C (Correcta): añadir un campo Catch con ErrorEquals States.ALL y Next Email a todos los estados Task, Map y Parallel captura todos los errores y los deriva a la notificación.\nOpción D: verificar un email en SES es una vía alternativa; la solución elegida usa SNS de forma más directa para notificar.\nOpción E: una tarea que reenvía a una dirección SES pertenece a la ruta SES no seleccionada.\nOpción F: States.Runtime solo captura errores de runtime, no TODOS los tipos de fallo requeridos.\n\nReferencias:\nhttps://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html\nhttps://docs.aws.amazon.com/step-functions/latest/dg/connect-sns.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30278,
    "questionNumber": 278,
    "question": "A company plans to deploy a new private intranet service on Amazon EC2 instances inside a VPC. An AWS Site-to-Site VPN connects the VPC to the company's on-premises network. The new service must communicate with existing on-premises services. The on-premises services are accessible through the use of hostnames that reside in the company.example DNS zone. This DNS zone is wholly hosted on premises and is available only on the company's private network. A solutions architect must ensure that the new service can resolve hostnames on the company.example domain to integrate with existing services. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an empty private zone in Amazon Route 53 for company.example. Add an additional NS record to the company's on-premises company.example zone that points to the authoritative name servers for the new private zone in Route 53.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Turn on DNS hostnames for the VPC. Configure a new outbound endpoint with Amazon Route 53 Resolver. Create a Resolver rule to forward requests for company.example to the on-premises name servers.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Turn on DNS hostnames for the VPConfigure a new inbound resolver endpoint with Amazon Route 53 Resolver. Configur&the on-premises DNS server to forward requests for company.example to the new resolver.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Systems Manager to configure a run document that will install a hosts file that contains any required hostnames. Use an Amazon EventBridge rule to run the document when an instance is entering the running state.",
        "isCorrect": false
      }
    ],
    "comments": "Instancias EC2 en una VPC (con VPN a on-premises) deben resolver hostnames de una zona DNS privada company.example alojada SOLO on-premises.\n\nOpción B (Correcta): activar DNS hostnames, crear un outbound endpoint de Route 53 Resolver y una regla que reenvíe las consultas de company.example a los servidores DNS on-premises resuelve los nombres desde la VPC.\nOpción A: crear una zona privada vacía en Route 53 con delegación NS no funciona porque Route 53 no reenvía a on-premises así.\nOpción C: un inbound endpoint sirve para que on-premises resuelva contra la VPC, sentido contrario al requerido.\nOpción D: mantener un fichero hosts vía SSM es frágil, no escalable y con alto overhead.\n\nReferencias:\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-outbound-queries.html\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30279,
    "questionNumber": 279,
    "question": "A company uses AWS CloudFormation to deploy applications within multiple VPCs that are all attached to a transit gateway. Each VPC that sends traffic to the public internet must send the traffic through a shared services VPC. Each subnet within a VPC uses the default VPC route table, and the traffic is routed to the transit gateway. The transit gateway uses its default route table for any VPC attachment. A security audit reveals that an Amazon EC2 instance that is deployed within a VPC can communicate with an EC2 instance that is deployed in any of the company's other VPCs. A solutions architect needs to limit the traffic between the VPCs. Each VPC must be able to communicate only with a predefined, limited set of authorized VPCs. What should the solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Update the network ACL of each subnet within a VPC to allow outbound traffic only to the authorized VPCs. Remove all deny rules except the default deny rule.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Update all the security groups that are used within a VPC to deny outbound traffic to security groups that are used within the unauthorized VPCs.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a dedicated transit gateway route table for each VPC attachment. Route traffic only to the authorized VPCs.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Update the main route table of each VPC to route traffic only to the authorized VPCs through the transit gateway.",
        "isCorrect": false
      }
    ],
    "comments": "Con VPCs adjuntas a un transit gateway y una única route table por defecto, cualquier VPC alcanza a las demás; hay que limitar a un conjunto AUTORIZADO por VPC.\n\nOpción C (Correcta): crear una route table dedicada del transit gateway por attachment y enrutar solo a las VPCs autorizadas segmenta el tráfico este-oeste a nivel del propio TGW.\nOpción A: gestionar NACLs por subred es tedioso, propenso a error y difícil de mantener a escala.\nOpción B: los security groups no pueden referenciar SGs de otras VPCs por sus IDs entre cuentas de esta forma.\nOpción D: editar la main route table de cada VPC apuntando al TGW no impide que el TGW enrute a todas con su tabla por defecto.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html\nhttps://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30280,
    "questionNumber": 280,
    "question": "A company has a Windows-based desktop application that is packaged and deployed to the users' Windows machines. The company recently acquired another company that has employees who primarily use machines with a Linux operating system. The acquiring company has decided to migrate and rehost the Windows-based desktop application to AWS. All employees must be authenticated before they use the application. The acquiring company uses Active Directory on premises but wants a simplified way to manage access to the application on AWS for all the employees. Which solution will rehost the application on AWS with the LEAST development effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up and provision an Amazon Workspaces virtual desktop for every employee. Implement authentication by using Amazon Cognito identity pools. Instruct employees to run the application from their provisioned Workspaces virtual desktops.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Auto Scaling group of Windows-based Amazon EC2 instances. Join each EC2 instance to the company’s Active Directory domain. Implement authentication by using the Active Directory that is running on premises. Instruct employees to run the application by using a Windows remote desktop.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use an Amazon AppStream 2.0 image builder to create an image that includes the application and the required configurations. Provision an AppStream 2.0 On-Demand fleet with dynamic Fleet Auto Scaling policies for running the image. Implement authentication by using AppStream 2.0 user pools. Instruct the employees to access the application by starting browser-based AppStream 2.0 streaming sessions.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Refactor and containerize the application to run as a web-based application. Run the application in Amazon Elastic Container Service (Amazon ECS) on AWS Fargate with step scaling policies. Implement authentication by using Amazon Cognito user pools. Instruct the employees to run the application from their browsers.",
        "isCorrect": false
      }
    ],
    "comments": "Rehost de una app de escritorio Windows para usuarios Windows y Linux, con autenticación centralizada y el MENOR esfuerzo de desarrollo.\n\nOpción C (Correcta): AppStream 2.0 transmite la app Windows a cualquier navegador (incluidos clientes Linux) sin cambiar la app; con fleet On-Demand, autoescalado y user pools se autentica de forma simple con esfuerzo mínimo.\nOpción A: WorkSpaces provisiona un escritorio completo por empleado, más costoso y pesado que streaming de una sola app.\nOpción B: instancias EC2 Windows con RDP y AD on-premises no sirven bien a clientes Linux y añaden gestión.\nOpción D: refactorizar y contenerizar a web requiere desarrollo considerable, contrario al requisito de mínimo esfuerzo.\n\nReferencias:\nhttps://docs.aws.amazon.com/appstream2/latest/developerguide/what-is-appstream.html\nhttps://docs.aws.amazon.com/appstream2/latest/developerguide/fleet-autoscaling.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30281,
    "questionNumber": 281,
    "question": "A company is collecting a large amount of data from a fleet of IoT devices. Data is stored as Optimized Row Columnar (ORC) files in the Hadoop Distributed File System (HDFS) on a persistent Amazon EMR cluster. The company's data analytics team queries the data by using SQL in Apache Presto deployed on the same EMR cluster. Queries scan large amounts of data, always run for less than 15 minutes, and run only between 5 PM and 10 PM. The company is concerned about the high cost associated with the current solution. A solutions architect must propose the most cost-effective solution that will allow SQL data queries. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Store data in Amazon S3. Use Amazon Redshift Spectrum to query data.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Store data in Amazon S3. Use the AWS Glue Data Catalog and Amazon Athena to query data.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Store data in EMR File System (EMRFS). Use Presto in Amazon EMR to query data.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Store data in Amazon Redshift. Use Amazon Redshift to query data.",
        "isCorrect": false
      }
    ],
    "comments": "Consultas SQL sobre ORC en HDFS de un EMR persistente que solo se usa 5h/noche con consultas de menos de 15 min; se busca lo MÁS rentable.\n\nOpción B (Correcta): mover los datos a S3 y consultar con Athena sobre el Glue Data Catalog es serverless y se paga por consulta, eliminando el coste del cluster EMR persistente e ideal para ORC intermitente.\nOpción A: Redshift Spectrum requiere un cluster Redshift activo, coste fijo innecesario.\nOpción C: mantener Presto en EMR con EMRFS conserva el cluster persistente caro.\nOpción D: cargar en Redshift añade un data warehouse siempre encendido, mayor coste para uso esporádico.\n\nReferencias:\nhttps://docs.aws.amazon.com/athena/latest/ug/what-is.html\nhttps://docs.aws.amazon.com/athena/latest/ug/glue-athena.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30282,
    "questionNumber": 282,
    "question": "A large company recently experienced an unexpected increase in Amazon RDS and Amazon DynamoDB costs. The company needs to increase visibility into details of AWS Billing and Cost Management. There are various accounts associated with AWS Organizations, including many development and production accounts. There is no consistent tagging strategy across the organization, but there are guidelines in place that require all infrastructure to be deployed using AWS CloudFormation with consistent tagging. Management requires cost center numbers and project ID numbers for all existing and future DynamoDB tables and RDS instances. Which strategy should the solutions architect provide to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Tag Editor to tag existing resources. Create cost allocation tags to define the cost center and project ID and allow 24 hours for tags to propagate to existing resources.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use an AWS Config rule to alert the finance team of untagged resources. Create a centralized AWS Lambda based solution to tag untagged RDS databases and DynamoDB resources every hour using a cross-account role.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Tag Editor to tag existing resources. Create cost allocation tags to define the cost center and project ID. Use SCPs to restrict resource creation that do not have the cost center and project ID on the resource.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create cost allocation tags to define the cost center and project ID and allow 24 hours for tags to propagate to existing resources. Update existing federated roles to restrict privileges to provision resources that do not include the cost center and project ID on the resource.",
        "isCorrect": false
      }
    ],
    "comments": "Ganar visibilidad de costes por centro de coste y project ID en RDS y DynamoDB en toda la organización, con etiquetado consistente vía CloudFormation.\n\nOpción C (Correcta): etiquetar lo existente con Tag Editor, crear cost allocation tags de cost center y project ID, y usar SCPs para impedir crear recursos sin esas etiquetas garantiza cumplimiento presente y futuro.\nOpción A: solo etiqueta lo existente y activa cost tags, pero no impide recursos futuros sin etiquetas.\nOpción B: una Lambda que etiqueta cada hora es reactiva, con overhead y ventanas sin etiquetar.\nOpción D: restringir roles federados es parcial y no cubre todas las vías de creación como sí un SCP organizativo.\n\nReferencias:\nhttps://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30283,
    "questionNumber": 283,
    "question": "A company wants to send data from its on-premises systems to Amazon S3 buckets. The company created the S3 buckets in three different accounts. The company must send the data privately without the data traveling across the internet. The company has no existing dedicated connectivity to AWS. Which combination of steps should a solutions architect take to meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Establish a networking account in the AWS Cloud. Create a private VPC in the networking account. Set up an AWS Direct Connect connection with a private VIF between the on-premises environment and the private VPC.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Establish a networking account in the AWS Cloud. Create a private VPC in the networking account. Set up an AWS Direct Connect connection with a public VIF between the on-premises environment and the private VPC.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Amazon S3 interface endpoint in the networking account.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an Amazon S3 gateway endpoint in the networking account.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Establish a networking account in the AWS Cloud. Create a private VPC in the networking account. Peer VPCs from the accounts that host the S3 buckets with the VPC in the network account.",
        "isCorrect": false
      }
    ],
    "comments": "Enviar datos on-premises a buckets S3 de tres cuentas de forma PRIVADA (sin Internet) sin conectividad dedicada previa (elegir dos).\n\nOpción A (Correcta): una cuenta de networking con VPC privada y Direct Connect con private VIF establece conectividad privada desde on-premises a la VPC.\nOpción C (Correcta): un interface endpoint de S3 (PrivateLink) en la cuenta de networking permite alcanzar S3 de forma privada a través de la VPC, accesible desde on-premises vía la VIF privada.\nOpción B: un public VIF alcanza servicios públicos de AWS pero no enruta hacia una VPC privada como plantea la opción.\nOpción D: un gateway endpoint de S3 solo funciona dentro de la VPC y no es accesible desde on-premises vía Direct Connect.\nOpción E: peering de VPCs no es necesario ni resuelve el acceso privado a S3 desde on-premises.\n\nReferencias:\nhttps://docs.aws.amazon.com/directconnect/latest/UserGuide/WorkingWithVirtualInterfaces.html\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30284,
    "questionNumber": 284,
    "question": "A company operates quick-service restaurants. The restaurants follow a predictable model with high sales traffic for 4 hours daily. Sales traffic is lower outside of those peak hours. The point of sale and management platform is deployed in the AWS Cloud and has a backend that is based on Amazon DynamoDB. The database table uses provisioned throughput mode with 100,000 RCUs and 80,000 WCUs to match known peak resource consumption. The company wants to reduce its DynamoDB cost and minimize the operational overhead for the IT staff. Which solution meets these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Reduce the provisioned RCUs and WCUs.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Change the DynamoDB table to use on-demand capacity.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Enable Dynamo DB auto scaling for the table.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Purchase 1-year reserved capacity that is sufficient to cover the peak load for 4 hours each day.",
        "isCorrect": false
      }
    ],
    "comments": "Tabla DynamoDB provisionada muy sobredimensionada para un pico PREDECIBLE de 4h/día; reducir coste con MÍNIMO overhead operativo, lo MÁS rentable.\n\nOpción C (Correcta): activar DynamoDB Auto Scaling ajusta la capacidad provisionada a la demanda a lo largo del día (baja fuera del pico), reduciendo coste sin gestión manual.\nOpción A: reducir manualmente RCUs/WCUs es estático y no cubre el pico ni el valle a la vez, con riesgo de throttling.\nOpción B: on-demand suele ser más caro que provisionado con auto scaling para un patrón predecible y de gran volumen.\nOpción D: la capacidad reservada de 1 año paga capacidad pico continua aunque solo se use 4h, menos rentable.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30285,
    "questionNumber": 285,
    "question": "A company hosts a blog post application on AWS using Amazon API Gateway, Amazon DynamoDB, and AWS Lambda. The application currently does not use API keys to authorize requests. The API model is as follows: GET /posts/{postId}: to get post details GET /users/{userId}: to get user details GET /comments/{commentId}: to get comments details The company has noticed users are actively discussing topics in the comments section, and the company wants to increase user engagement by making the comments appear in real time. Which design should be used to reduce comment latency and improve user experience?",
    "choices": [
      {
        "letter": "A",
        "text": "Use edge-optimized API with Amazon CloudFront to cache API responses.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Modify the blog application code to request GET/comments/{commentId} every 10 seconds.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS AppSync and leverage WebSockets to deliver comments.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Change the concurrency limit of the Lambda functions to lower the API response time.",
        "isCorrect": false
      }
    ],
    "comments": "Mostrar comentarios en TIEMPO REAL para aumentar el engagement, reduciendo la latencia de los comentarios.\n\nOpción C (Correcta): AWS AppSync con suscripciones GraphQL sobre WebSockets envía los comentarios en tiempo real (push) al cliente, la mejor experiencia y menor latencia.\nOpción A: cachear respuestas con CloudFront sirve contenido estático más rápido pero no entrega actualizaciones en tiempo real.\nOpción B: hacer polling cada 10 s aumenta carga y no es tiempo real.\nOpción D: cambiar la concurrencia de Lambda reduce latencia por petición pero no aporta entrega push en tiempo real.\n\nReferencias:\nhttps://docs.aws.amazon.com/appsync/latest/devguide/aws-appsync-real-time-data.html\nhttps://docs.aws.amazon.com/appsync/latest/devguide/what-is-appsync.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30286,
    "questionNumber": 286,
    "question": "A company manages hundreds of AWS accounts centrally in an organization in AWS Organizations. The company recently started to allow product teams to create and manage their own S3 access points in their accounts. The S3 access points can be accessed only within VPCs, not on the internet. What is the MOST operationally efficient way to enforce this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Set the S3 access point resource policy to deny the s3:CreateAccessPoint action unless the s3:AccessPointNetworkOrigin condition key evaluates to VPC.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an SCP at the root level in the organization to deny the s3:CreateAccessPoint action unless the s3:AccessPointNetworkOrigin condition key evaluates to VPC.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS CloudFormation StackSets to create a new IAM policy in each AWS account that allows the s3:CreateAccessPoint action only if the s3:AccessPointNetworkOrigin condition key evaluates to VPC.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Set the S3 bucket policy to deny the s3:CreateAccessPoint action unless the s3:AccessPointNetworkOrigin condition key evaluates to VPC.",
        "isCorrect": false
      }
    ],
    "comments": "Forzar que los S3 access points creados por los equipos solo sean accesibles desde VPC (no Internet) en cientos de cuentas, de la forma MÁS eficiente operativamente.\n\nOpción B (Correcta): un SCP a nivel raíz que deniega s3:CreateAccessPoint salvo que s3:AccessPointNetworkOrigin sea VPC aplica la regla a toda la organización de forma central y preventiva.\nOpción A: una policy de recurso en el access point se define por recurso, no es central ni escalable a cientos de cuentas.\nOpción C: desplegar una IAM policy por cuenta con StackSets es más pesado y una policy de allow no impide otras vías.\nOpción D: la bucket policy no controla la creación de access points de esta manera.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points-policies.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30287,
    "questionNumber": 287,
    "question": "A solutions architect must update an application environment within AWS Elastic Beanstalk using a blue/green deployment methodology. The solutions architect creates an environment that is identical to the existing application environment and deploys the application to the new environment. What should be done next to complete the update?",
    "choices": [
      {
        "letter": "A",
        "text": "Redirect to the new environment using Amazon Route 53.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Select the Swap Environment URLs option.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Replace the Auto Scaling launch configuration.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Update the DNS records to point to the green environment.",
        "isCorrect": false
      }
    ],
    "comments": "Completar una actualización blue/green en Elastic Beanstalk tras desplegar la app en el nuevo entorno idéntico.\n\nOpción B (Correcta): seleccionar Swap Environment URLs intercambia los CNAME entre el entorno azul y el verde, redirigiendo el tráfico al nuevo entorno de forma nativa y sin downtime.\nOpción A: redirigir manualmente con Route 53 no es el mecanismo nativo de Beanstalk para blue/green.\nOpción C: reemplazar el launch configuration del Auto Scaling no completa el swap de entornos.\nOpción D: editar registros DNS a mano es propenso a error frente al swap integrado de URLs.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html\nhttps://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.deploy-existing-version.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30288,
    "questionNumber": 288,
    "question": "A company is building an image service on the web that will allow users to upload and search random photos. At peak usage, up to 10,000 users worldwide will upload their images. The will then overlay text on the uploaded images, which will then be published on the company website. Which design should a solutions architect implement?",
    "choices": [
      {
        "letter": "A",
        "text": "Store the uploaded images in Amazon Elastic File System (Amazon EFS). Send application log information about each image to Amazon CloudWatch Logs. Create a fleet of Amazon EC2 instances that use CloudWatch Logs to determine which images need to be processed. Place processed images in another directory in Amazon EFS. Enable Amazon CloudFront and configure the origin to be the one of the EC2 instances in the fleet.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Store the uploaded images in an Amazon S3 bucket and configure an S3 bucket event notification to send a message to Amazon Simple Notification Service (Amazon SNS). Create a fleet of Amazon EC2 instances behind an Application Load Balancer (ALB) to pull messages from Amazon SNS to process the images and place them in Amazon Elastic File System (Amazon EFS). Use Amazon CloudWatch metrics for the SNS message volume to scale out EC2 instances. Enable Amazon CloudFront and configure the origin to be the ALB in front of the EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Store the uploaded images in an Amazon S3 bucket and configure an S3 bucket event notification to send a message to the Amazon Simple Queue Service (Amazon SQS) queue. Create a fleet of Amazon EC2 instances to pull messages from the SQS queue to process the images and place them in another S3 bucket. Use Amazon CloudWatch metrics for queue depth to scale out EC2 instances. Enable Amazon CloudFront and configure the origin to be the S3 bucket that contains the processed images.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Store the uploaded images on a shared Amazon Elastic Block Store (Amazon EBS) volume mounted to a fleet of Amazon EC2 Spot instances. Create an Amazon DynamoDB table that contains information about each uploaded image and whether it has been processed. Use an Amazon EventBridge rule to scale out EC2 instances. Enable Amazon CloudFront and configure the origin to reference an Elastic Load Balancer in front of the fleet of EC2 instances.",
        "isCorrect": false
      }
    ],
    "comments": "Servicio de imágenes con hasta 10.000 usuarios que suben fotos, se procesan (overlay de texto) y se publican; diseño escalable y desacoplado.\n\nOpción C (Correcta): almacenar en S3, notificar a una cola SQS y una flota de EC2 que consume la cola para procesar y depositar en otro bucket desacopla la ingesta del procesamiento y absorbe picos sin perder trabajos.\nOpción A: usar CloudWatch Logs para decidir qué imágenes procesar es un mecanismo frágil e inapropiado como cola de trabajo.\nOpción B: SNS es pub/sub sin persistencia ni control de reintentos como una cola; los consumidores no hacen pull de SNS de forma fiable.\nOpción D: EBS compartido en Spot y una tabla DynamoDB de estado propia añaden complejidad y fragilidad frente a SQS.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html\nhttps://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30289,
    "questionNumber": 289,
    "question": "A company has deployed its database on an Amazon RDS for MySQL DB instance in the us-east-1 Region. The company needs to make its data available to customers in Europe. The customers in Europe must have access to the same data as customers in the United States (US) and will not tolerate high application latency or stale data. The customers in Europe and the customers in the US need to write to the database. Both groups of customers need to see updates from the other group in real time. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon Aurora MySQL replica of the RDS for MySQL DB instance. Pause application writes to the RDS DB instance. Promote the Aurora Replica to a standalone DB cluster. Reconfigure the application to use the Aurora database and resume writes. Add eu-west-1 as a secondary Region to the DB cluster. Enable write forwarding on the DB cluster. Deploy the application in eu-west-1. Configure the application to use the Aurora MySQL endpoint in eu-west-1.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Add a cross-Region replica in eu-west-1 for the RDS for MySQL DB instance. Configure the replica to replicate write queries back to the primary DB instance. Deploy the application in eu-west-1. Configure the application to use the RDS for MySQL endpoint in eu-west-1.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Copy the most recent snapshot from the RDS for MySQL DB instance to eu-west-1. Create a new RDS for MySQL DB instance in eu-west-1 from the snapshot. Configure MySQL logical replication from us-east-1 to eu-west-1. Enable write forwarding on the DB cluster. Deploy the application in eu-wes&1. Configure the application to use the RDS for MySQL endpoint in eu-west-1.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Convert the RDS for MySQL DB instance to an Amazon Aurora MySQL DB cluster. Add eu-west-1 as a secondary Region to the DB cluster. Enable write forwarding on the DB cluster. Deploy the application in eu-west-1. Configure the application to use the Aurora MySQL endpoint in eu-west-1.",
        "isCorrect": true
      }
    ],
    "comments": "Clientes en EE. UU. y Europa deben ESCRIBIR en la misma BD, ver cambios en tiempo real y con baja latencia, sin datos obsoletos.\n\nOpción D (Correcta): convertir RDS MySQL a Aurora MySQL, añadir eu-west-1 como Región secundaria del global database y activar write forwarding permite escrituras locales en Europa reenviadas a la primaria con baja latencia de lectura y replicación casi en tiempo real.\nOpción A: promover una réplica Aurora a cluster independiente rompe la unicidad de datos entre grupos de clientes.\nOpción B: RDS MySQL no soporta replicación de escrituras de la réplica a la primaria (no hay write-back nativo).\nOpción C: la replicación lógica MySQL más write forwarding descrita no es una configuración soportada de forma nativa así.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-write-forwarding.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30290,
    "questionNumber": 290,
    "question": "A company is serving files to its customers through an SFTP server that is accessible over the internet. The SFTP server is running on a single Amazon EC2 instance with an Elastic IP address attached. Customers connect to the SFTP server through its Elastic IP address and use SSH for authentication. The EC2 instance also has an attached security group that allows access from all customer IP addresses. A solutions architect must implement a solution to improve availability, minimize the complexity of infrastructure management, and minimize the disruption to customers who access files. The solution must not change the way customers connect. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Disassociate the Elastic IP address from the EC2 instance. Create an Amazon S3 bucket to be used for SFTP file hosting. Create an AWS Transfer Family server. Configure the Transfer Family server with a publicly accessible endpoint. Associate the SFTP Elastic IP address with the new endpoint. Point the Transfer Family server to the S3 bucket. Sync all files from the SFTP server to the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Disassociate the Elastic IP address from the EC2 instance. Create an Amazon S3 bucket to be used for SFTP file hosting. Create an AWS Transfer Family server. Configure the Transfer Family server with a VPC-hosted, internet-facing endpoint. Associate the SFTP Elastic IP address with the new endpoint. Attach the security group with customer IP addresses to the new endpoint. Point the Transfer Family server to the S3 bucket. Sync all files from the SFTP server to the S3 bucket.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Disassociate the Elastic IP address from the EC2 instance. Create a new Amazon Elastic File System (Amazon EFS) file system to be used for SFTP file hosting. Create an AWS Fargate task definition to run an SFTP server. Specify the EFS file system as a mount in the task definition. Create a Fargate service by using the task definition, and place a Network Load Balancer (NLB) in front of the service. When configuring the service, attach the security group with customer IP addresses to the tasks that run the SFTP server. Associate the Elastic IP address with the NLB. Sync all files from the SFTP server to the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Disassociate the Elastic IP address from the EC2 instance. Create a multi-attach Amazon Elastic Block Store (Amazon EBS) volume to be used for SFTP file hosting. Create a Network Load Balancer (NLB) with the Elastic IP address attached. Create an Auto Scaling group with EC2 instances that run an SFTP server. Define in the Auto Scaling group that instances that are launched should attach the new multi-attach EBS volume. Configure the Auto Scaling group to automatically add instances behind the NLB. Configure the Auto Scaling group to use the security group that allows customer IP addresses for the EC2 instances that the Auto Scaling group launches. Sync all files from the SFTP server to the new multi-attach EBS volume.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar un SFTP en una sola EC2 con Elastic IP a una solución de mayor disponibilidad y MENOR complejidad de gestión sin cambiar cómo se conectan los clientes.\n\nOpción B (Correcta): AWS Transfer Family con endpoint VPC-hosted internet-facing permite asociar la Elastic IP existente (se conserva la IP/forma de conexión) y usar S3 como backend gestionado y altamente disponible.\nOpción A: el endpoint publicly accessible de Transfer Family no permite asociar una Elastic IP propia, cambiaría la IP a la que se conectan los clientes.\nOpción C: SFTP en Fargate sobre EFS reintroduce gestión de contenedores y no conserva la Elastic IP directamente.\nOpción D: EBS multi-attach y NLB con EC2 propios aumentan la gestión y complejidad, contrario al requisito.\n\nReferencias:\nhttps://docs.aws.amazon.com/transfer/latest/userguide/create-server-in-vpc.html\nhttps://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30291,
    "questionNumber": 291,
    "question": "A company ingests and processes streaming market data. The data rate is constant. A nightly process that calculates aggregate statistics takes 4 hours to complete. The statistical analysis is not critical to the business, and data points are processed during the next iteration if a particular run fails. The current architecture uses a pool of Amazon EC2 Reserved Instances with 1-year reservations. These EC2 instances run full time to ingest and store the streaming data in attached Amazon Elastic Block Store (Amazon EBS) volumes. A scheduled script launches EC2 On-Demand Instances each night to perform the nightly processing. The instances access the stored data from NFS shares on the ingestion servers. The script terminates the instances when the processing is complete. The Reserved Instance reservations are expiring. The company needs to determine whether to purchase new reservations or implement a new design. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Update the ingestion process to use Amazon Kinesis Data Firehose to save data to Amazon S3. Use a scheduled script to launch a fleet of EC2 On-Demand Instances each night to perform the batch processing of the S3 data. Configure the script to terminate the instances when the processing is complete.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Update the ingestion process to use Amazon Kinesis Data Firehose to save data to Amazon S3. Use AWS Batch with Spot Instances to perform nightly processing with a maximum Spot price that is 50% of the On-Demand price.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Update the ingestion process to use a fleet of EC2 Reserved Instances with 3-year reservations behind a Network LoadBalancer. Use AWS Batch with Spot Instances to perform nightly processing with a maximum Spot price that is 50% of the On-Demand price.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Update the ingestion process to use Amazon Kinesis Data Firehose to save data to Amazon Redshift. Use Amazon EventBridge to schedule an AWS Lambda function to run nightly to query Amazon Redshift to generate the daily statistics.",
        "isCorrect": false
      }
    ],
    "comments": "Ingesta continua y un proceso nocturno de 4h no crítico (reprocesable si falla); las RIs expiran y hay que elegir lo MÁS rentable.\n\nOpción B (Correcta): Kinesis Data Firehose a S3 elimina las EC2 de ingesta full-time con EBS, y AWS Batch con Spot (tope al 50% del On-Demand) ejecuta el proceso nocturno tolerante a fallos al menor coste.\nOpción A: relanzar On-Demand cada noche es más caro que Spot para una carga tolerante a interrupciones.\nOpción C: nuevas RIs de 3 años detrás de un NLB mantienen coste fijo de ingesta que Firehose evita.\nOpción D: Redshift más Lambda para estadísticas añade un data warehouse continuo innecesario y encarece.\n\nReferencias:\nhttps://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html\nhttps://docs.aws.amazon.com/batch/latest/userguide/spot_instances.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30292,
    "questionNumber": 292,
    "question": "A company needs to migrate an on-premises SFTP site to AWS. The SFTP site currently runs on a Linux VM. Uploaded files are made available to downstream applications through an NFS share. As part of the migration to AWS, a solutions architect must implement high availability. The solution must provide external vendors with a set of static public IP addresses that the vendors can allow. The company has set up an AWS Direct Connect connection between its on-premises data center and its VPC. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Transfer Family server. Configure an internet-facing VPC endpoint for the Transfer Family server. Specify an Elastic IP address for each subnet. Configure the Transfer Family server to place files into an Amazon Elastic File System (Amazon EFS) file system that is deployed across multiple Availability Zones. Modify the configuration on the downstream applications that access the existing NFS share to mount the EFS endpoint instead.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an AWS Transfer Family server. Configure a publicly accessible endpoint for the Transfer Family server. Configure the Transfer Family server to place files into an Amazon Elastic File System (Amazon EFS) file system that is deployed across multiple Availability Zones. Modify the configuration on the downstream applications that access the existing NFS share to mount the EFS endpoint instead.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Application Migration Service to migrate the existing Linux VM to an Amazon EC2 instance. Assign an Elastic IP address to the EC2 instance. Mount an Amazon Elastic File System (Amazon EFS) file system to the EC2 instance. Configure the SFTP server to place files in the EFS file system. Modify the configuration on the downstream applications that access the existing NFS share to mount the EFS endpoint instead.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Application Migration Service to migrate the existing Linux VM to an AWS Transfer Family server. Configure a publicly accessible endpoint for the Transfer Family server. Configure the Transfer Family server to place files into an Amazon FSx for Lustre file system that is deployed across multiple Availability Zones. Modify the configuration on the downstream applications that access the existing NFS share to mount the FSx for Lustre endpoint instead.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar un SFTP on-premises a AWS con alta disponibilidad, IPs públicas ESTÁTICAS permitidas por vendors y NFS aguas abajo, con el MENOR overhead operativo.\n\nOpción A (Correcta): AWS Transfer Family con endpoint VPC internet-facing y una Elastic IP por subred da IPs estáticas y HA multi-AZ, colocando ficheros en EFS accesible por las aplicaciones NFS, todo gestionado.\nOpción B: el endpoint publicly accessible no permite fijar Elastic IPs estáticas propias para el allow-list de vendors.\nOpción C: migrar la VM a EC2 con una EIP no es HA (una sola instancia) y aumenta la gestión.\nOpción D: Transfer Family no se despliega migrando una VM con Application Migration Service, y FSx for Lustre no es el destino NFS adecuado.\n\nReferencias:\nhttps://docs.aws.amazon.com/transfer/latest/userguide/create-server-in-vpc.html\nhttps://docs.aws.amazon.com/transfer/latest/userguide/requirements-clients.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30293,
    "questionNumber": 293,
    "question": "A solutions architect has an operational workload deployed on Amazon EC2 instances in an Auto Scaling group. The VPC architecture spans two Availability Zones (AZ) with a subnet in each that the Auto Scaling group is targeting. The VPC is connected to an on-premises environment and connectivity cannot be interrupted. The maximum size of the Auto Scaling group is 20 instances in service. The VPC IPv4 addressing is as follows: VPC CIDR: 10.0.0.0/23 - AZ1 subnet CIDR: 10.0.0.0/24 - AZ2 subnet CIDR: 10.0.1.0/24 - Since deployment, a third AZ has become available in the Region. The solutions architect wants to adopt the new AZ without adding additional IPv4 address space and without service downtime. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Update the Auto Scaling group to use the AZ2 subnet only. Delete and re-create the AZ1 subnet using half the previous address space. Adjust the Auto Scaling group to also use the new AZ1 subnet. When the instances are healthy, adjust the Auto Scaling group to use the AZ1 subnet only. Remove the current AZ2 subnet. Create a new AZ2 subnet using the second half of the address space from the original AZ1 subnet. Create a new AZ3 subnet using half the original AZ2 subnet address space, then update the Auto Scaling group to target all three new subnets.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Terminate the EC2 instances in the AZ1 subnet. Delete and re-create the AZ1 subnet using half the address space. Update the Auto Scaling group to use this new subnet. Repeat this for the second AZ. Define a new subnet in AZ3, then update the Auto Scaling group to target all three new subnets.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a new VPC with the same IPv4 address space and define three subnets, with one for each AZ. Update the existing Auto Scaling group to target the new subnets in the new VPC.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Update the Auto Scaling group to use the AZ2 subnet only. Update the AZ1 subnet to have half the previous address space. Adjust the Auto Scaling group to also use the AZ1 subnet again. When the instances are healthy, adjust the Auto Scaling group to use the AZ1 subnet only. Update the current AZ2 subnet and assign the second half of the address space from the original AZ1 subnet. Create a new AZ3 subnet using half the original AZ2 subnet address space, then update the Auto Scaling group to target all three new subnets.",
        "isCorrect": false
      }
    ],
    "comments": "Adoptar una tercera AZ SIN añadir espacio de direcciones IPv4 y SIN downtime, en una VPC 10.0.0.0/23 con dos /24 ya usados.\n\nOpción A (Correcta): apuntar el ASG solo a AZ2, liberar y recrear AZ1 con la mitad del espacio, reincorporarlo y luego crear la subred de AZ3 con el espacio liberado permite tres AZs dentro del /23 existente migrando por fases sin cortar servicio.\nOpción B: terminar instancias por AZ interrumpe el servicio y la conectividad, incumpliendo el requisito de no downtime.\nOpción C: crear una VPC nueva con el mismo CIDR rompe el peering/VPN existente y causa corte.\nOpción D: intentar reducir el /24 de AZ1 in situ sin recrear no es posible; no se puede reducir el CIDR de una subred existente.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30294,
    "questionNumber": 294,
    "question": "A company uses an organization in AWS Organizations to manage the company's AWS accounts. The company uses AWS CloudFormation to deploy all infrastructure. A finance team wants to build a chargeback model. The finance team asked each business unit to tag resources by using a predefined list of project values. When the finance team used the AWS Cost and Usage Report in AWS Cost Explorer and filtered based on project, the team noticed noncompliant project values. The company wants to enforce the use of project tags for new resources. Which solution will meet these requirements with the LEAST effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a tag policy that contains the allowed project tag values in the organization's management account. Create an SCP that denies the cloudformation:CreateStack API operation unless a project tag is added. Attach the SCP to each OU.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a tag policy that contains the allowed project tag values in each OU. Create an SCP that denies the cloudformation:CreateStack API operation unless a project tag is added. Attach the SCP to each OU.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a tag policy that contains the allowed project tag values in the AWS management account. Create an IAM policy that denies the cloudformation:CreateStack API operation unless a project tag is added. Assign the policy to each user.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Service Catalog to manage the CloudFormation stacks as products. Use a TagOptions library to control project tag values. Share the portfolio with all OUs that are in the organization.",
        "isCorrect": false
      }
    ],
    "comments": "Forzar valores de tag project permitidos para recursos nuevos desplegados vía CloudFormation en toda la organización, con el MENOR esfuerzo.\n\nOpción A (Correcta): una tag policy con los valores permitidos en la management account más un SCP que deniega cloudformation:CreateStack sin el tag project, adjunto a cada OU, impone valores válidos de forma central y preventiva.\nOpción B: definir la tag policy en cada OU duplica configuración; se gestiona mejor de forma centralizada.\nOpción C: una IAM policy por usuario no es escalable ni central como un SCP.\nOpción D: Service Catalog con TagOptions añade más gestión y no fuerza directamente el valor en cualquier CreateStack.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30295,
    "questionNumber": 295,
    "question": "An application is deployed on Amazon EC2 instances that run in an Auto Scaling group. The Auto Scaling group configuration uses only one type of instance. CPU and memory utilization metrics show that the instances are underutilized. A solutions architect needs to implement a solution to permanently reduce the EC2 cost and increase the utilization. Which solution will meet these requirements with the LEAST number of configuration changes in the future?",
    "choices": [
      {
        "letter": "A",
        "text": "List instance types that have properties that are similar to the properties that the current instances have. Modify the Auto Scaling group's launch template configuration to use multiple instance types from the list.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use the information about the application's CPU and memory utilization to select an instance type that matches the requirements. Modify the Auto Scaling group's configuration by adding the new instance type. Remove the current instance type from the configuration.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use the information about the application's CPU and memory utilization to specify CPU and memory requirements in a new revision of the Auto Scaling group's launch template. Remove the current instance type from the configuration.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a script that selects the appropriate instance types from the AWS Price List Bulk API. Use the selected instance types to create a new revision of the Auto Scaling group's launch template.",
        "isCorrect": false
      }
    ],
    "comments": "Instancias infrautilizadas en un ASG de un solo tipo; reducir coste de forma PERMANENTE aumentando utilización con el MENOR número de cambios de configuración futuros.\n\nOpción B (Correcta): dimensionar (rightsizing) a un tipo de instancia que se ajuste a los requisitos reales de CPU/memoria y sustituir el actual reduce coste de forma estable y sin necesidad de ajustes recurrentes.\nOpción A: usar múltiples tipos similares (mixed instances) ayuda a disponibilidad/Spot pero no garantiza reducir coste ni evitar futuros ajustes de forma tan directa.\nOpción C: especificar requisitos de CPU/memoria (attribute-based selection) es válido, pero puede requerir revisiones y no fija un tipo óptimo permanente tan claramente.\nOpción D: un script contra la Price List API añade mantenimiento continuo, contrario a minimizar cambios futuros.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-templates.html\nhttps://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30296,
    "questionNumber": 296,
    "question": "A company implements a containerized application by using Amazon Elastic Container Service (Amazon ECS) and Amazon API Gateway The application data is stored in Amazon Aurora databases and Amazon DynamoDB databases. The company automates infrastructure provisioning by using AWS CloudFormation. The company automates application deployment by using AWS CodePipeline. A solutions architect needs to implement a disaster recovery (DR) strategy that meets an RPO of 2 hours and an RTO of 4 hours. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up an Aurora global database and DynamoDB global tables to replicate the databases to a secondary AWS Region. In the primary Region and in the secondary Region, configure an API Gateway API with a Regional endpoint. Implement Amazon CloudFront with origin failover to route traffic to the secondary Region during a DR scenario.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Database Migration Service (AWS DMS), Amazon EventBridge, and AWS Lambda to replicate the Aurora databases to a secondary AWS Region. Use DynamoDB Streams, EventBridge. and Lambda to replicate the DynamoDB databases to the secondary Region. In the primary Region and in the secondary Region, configure an API Gateway API with a Regional endpoint. Implement Amazon Route 53 failover routing to switch traffic from the primary Region to the secondary Region.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Backup to create backups of the Aurora databases and the DynamoDB databases in a secondary AWS Region. In the primary Region and in the secondary Region, configure an API Gateway API with a Regional endpoint. Implement Amazon Route 53 failover routing to switch traffic from the primary Region to the secondary Region.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Set up an Aurora global database and DynamoDB global tables to replicate the databases to a secondary AWS Region. In the primary Region and in the secondary Region, configure an API Gateway API with a Regional endpoint. Implement Amazon Route 53 failover routing to switch traffic from the primary Region to the secondary Region.",
        "isCorrect": false
      }
    ],
    "comments": "DR con RPO 2h y RTO 4h para Aurora y DynamoDB, buscando lo MÁS rentable.\n\nOpción C (Correcta): AWS Backup replicando copias de Aurora y DynamoDB a otra Región cumple holgadamente RPO 2h/RTO 4h a bajo coste (sin infraestructura activa en la Región secundaria), con Route 53 failover para conmutar.\nOpción A: Aurora global database más DynamoDB global tables ofrecen RPO/RTO mucho menores de lo exigido pero a mayor coste continuo, y CloudFront origin failover encarece.\nOpción B: DMS más EventBridge más Lambda y DynamoDB Streams es una tubería a medida con alto overhead y coste.\nOpción D: Aurora global database más global tables (con Route 53) sigue siendo más caro que backups para el RPO/RTO holgado pedido.\n\nReferencias:\nhttps://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30297,
    "questionNumber": 297,
    "question": "A company has a complex web application that leverages Amazon CloudFront for global scalability and performance. Over time, users report that the web application is slowing down. The company's operations team reports that the CloudFront cache hit ratio has been dropping steadily. The cache metrics report indicates that query strings on some URLs are inconsistently ordered and are specified sometimes in mixed-case letters and sometimes in lowercase letters. Which set of actions should the solutions architect take to increase the cache hit ratio as quickly as possible?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy a Lambda@Edge function to sort parameters by name and force them to be lowercase. Select the CloudFront viewer request trigger to invoke the function.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Update the CloudFront distribution to disable caching based on query string parameters.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy a reverse proxy after the load balancer to post-process the emitted URLs in the application to force the URL strings to be lowercase.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Update the CloudFront distribution to specify casing-insensitive query string processing.",
        "isCorrect": false
      }
    ],
    "comments": "Cae el cache hit ratio de CloudFront porque las query strings llegan desordenadas y en mayúsculas/minúsculas inconsistentes; subir el hit ratio lo MÁS rápido posible.\n\nOpción A (Correcta): una función Lambda@Edge en viewer request que ordene los parámetros por nombre y los pase a minúsculas normaliza las URLs antes del cache lookup, aumentando el hit ratio inmediatamente sin tocar la app.\nOpción B: desactivar el caching por query string cambia el comportamiento funcional y puede servir contenido incorrecto.\nOpción C: un reverse proxy tras el balanceador implica cambios de infraestructura y no normaliza en el borde antes del cache.\nOpción D: CloudFront no ofrece una opción nativa de procesamiento case-insensitive de query strings.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-hit-ratio-explained.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30298,
    "questionNumber": 298,
    "question": "A company runs an ecommerce application in a single AWS Region. The application uses a five-node Amazon Aurora MySQL DB cluster to store information about customers and their recent orders. The DB cluster experiences a large number of write transactions throughout the day. The company needs to replicate the data in the Aurora database to another Region to meet disaster recovery requirements. The company has an RPO of 1 hour. Which solution will meet these requirements with the LOWEST cost?",
    "choices": [
      {
        "letter": "A",
        "text": "Modify the Aurora database to be an Aurora global database. Create a second Aurora database in another Region.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Enable the Backtrack feature for the Aurora database. Create an AWS Lambda function that runs daily to copy the snapshots of the database to a backup Region.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Database Migration Service (AWS DMS). Create a DMS change data capture (CDC) task that replicates the ongoing changes from the Aurora database to an Amazon S3 bucket in another Region.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Turn off automated Aurora backups. Configure Aurora backups with a backup frequency of 1 hour. Specify another Region as the destination Region. Select the Aurora database as the resource assignment.",
        "isCorrect": false
      }
    ],
    "comments": "Replicar datos de un cluster Aurora MySQL con muchas escrituras a otra Región para DR con RPO de 1 hora, al MENOR coste.\n\nOpción C (Correcta): una tarea CDC de AWS DMS que replica los cambios continuos a un bucket S3 en otra Región cumple RPO 1h con el menor coste, sin mantener un cluster Aurora secundario activo.\nOpción A: Aurora global database cumple con RPO mucho menor pero mantiene un cluster secundario siempre activo, mayor coste.\nOpción B: Backtrack es intra-cluster (no cross-Region) y copiar snapshots a diario no cumple RPO de 1 hora.\nOpción D: cambiar la frecuencia de backups a 1h cross-Region no es tan barato ni tan simple como CDC a S3 y complica la recuperación.\n\nReferencias:\nhttps://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.S3.html\nhttps://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30299,
    "questionNumber": 299,
    "question": "A company's solutions architect is evaluating an AWS workload that was deployed several years ago. The application tier is stateless and runs on a single large Amazon EC2 instance that was launched from an AMI. The application stores data in a MySQL database that runs on a single EC2 instance. The CPU utilization on the application server EC2 instance often reaches 100% and causes the application to stop responding. The company manually installs patches on the instances. Patching has caused downtime in the past. The company needs to make the application highly available. Which solution will meet these requirements with the LEAST development me?",
    "choices": [
      {
        "letter": "A",
        "text": "Move the application tier to AWS Lambda functions in the existing VPC. Create an Application Load Balancer to distribute traffic across the Lambda functions. Use Amazon GuardDuty to scan the Lambda functions. Migrate the database to Amazon DocumentDB (with MongoDB compatibility.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Change the EC2 instance type to a smaller Graviton powered instance type. Use the existing AMI to create a launch template for an Auto Scaling group. Create an Application Load Balancer to distribute traffic across the instances in the Auto Scaling group. Set the Auto Scaling group to scale based on CPU utilization. Migrate the database to Amazon DynamoDB.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Move the application tier to containers by using Docker. Run the containers on Amazon Elastic Container Service (Amazon ECS) with EC2 instances. Create an Application Load Balancer to distribute traffic across the ECS cluster. Configure the ECS cluster to scale based on CPU utilization. Migrate the database to Amazon Neptune.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a now AMI that is configured with AWS Systems Manager Agent (SSM Agent). Use the new AMI to create a launch template for an Auto Scaling group. Use smaller instances in the Auto Scaling group. Create an Application Load Balancer to distribute traffic across the instances in the Auto Scaling group. Set the Auto Scaling group to scale based on CPU utilization. Migrate the database to Amazon Aurora MySQL.",
        "isCorrect": true
      }
    ],
    "comments": "App stateless en una EC2 grande que llega al 100% de CPU y BD MySQL en otra EC2; hacerla altamente disponible con el MENOR esfuerzo de desarrollo, y parcheo sin downtime.\n\nOpción D (Correcta): crear un AMI con SSM Agent, un launch template y un Auto Scaling group de instancias más pequeñas tras un ALB da HA y escalado horizontal; SSM permite parcheo sin downtime, con mínimo desarrollo (no cambia la app).\nOpción A: pasar a Lambda y DocumentDB implica reescritura significativa, no es mínimo esfuerzo.\nOpción B: una sola instancia Graviton no aporta HA; escalar necesita ASG y ALB como en D.\nOpción C: contenerizar con ECS y migrar la BD requiere más desarrollo que reutilizar el modelo EC2 con ASG/ALB.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html\nhttps://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-patch.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30300,
    "questionNumber": 300,
    "question": "A company is planning to migrate several applications to AWS. The company does not have a good understanding of its entire application estate. The estate consists of a mixture of physical machines and VMs. One application that the company will migrate has many dependencies that are sensitive to latency. The company is unsure what all the dependencies are. However the company knows that the low-latency communications use a custom IP-based protocol that runs on port 1000. The company wants to migrate the application and these dependencies together to move all the low-latency interfaces to AWS at the same time. The company has installed the AWS Application Discovery Agent and has been collecting data for several months. What should the company do to identify the dependencies that need to be migrated in the same phase as the application?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Migration Hub and select the servers that host the application. Visualize the network graph to find servers that interact with the application. Turn on data exploration in Amazon Athena. Query the data that is transferred between the servers to identify the servers that communicate on port 1000. Return to Migration Hub. Create a move group that is based on the findings from the Athena queries.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use AWS Application Migration Service and select the servers that host the application. Visualize the network graph to find servers that interact with the application. Configure Application Migration Service to launch test instances for all the servers that interact with the application. Perform acceptance tests on the test instances. If no issues are identified, create a move group that is based on the tested servers.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Migration Hub and select the servers that host the application. Turn on data exploration in Network Access Analyzer. Use the Network Access Analyzer console to select the servers that host the application. Select a Network Access Scope of port 1000 and note the matching servers. Return to Migration Hub. Create a move group that is based on the findings from Network Access Analyzer.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Migration Hub and select the servers that host the application. Push the Amazon CloudWalch agent to the identified servers by using the AWS Application Discovery Agent. Export the CloudWatch logs that the agents collect to Amazon S3. Use Amazon Athena to query the logs to find servers that communicate on port 1000. Return to Migration Hub Create a move group that is based on the findings from the Athena queries.",
        "isCorrect": false
      }
    ],
    "comments": "Identificar dependencias sensibles a latencia (protocolo IP custom en puerto 1000) para migrarlas juntas, con datos del Application Discovery Agent recogidos meses.\n\nOpción A (Correcta): en AWS Migration Hub, visualizar el network graph de los servidores de la app y activar data exploration para consultar en Athena el tráfico entre servidores identifica los que comunican por el puerto 1000.\nOpción B: Application Migration Service es de replicación/cutover, no de descubrimiento de dependencias; lanzar instancias de prueba no descubre el grafo por puerto.\nOpción C: Network Access Analyzer analiza rutas de red potenciales en VPCs de AWS, no el tráfico histórico on-premises recogido por el agente.\nOpción D: empujar el agente de CloudWatch para exportar logs es un rodeo frágil frente a la exploración de datos nativa de Migration Hub/Athena.\n\nReferencias:\nhttps://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html\nhttps://docs.aws.amazon.com/application-discovery/latest/userguide/data-exploration.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30301,
    "questionNumber": 301,
    "question": "A company is building an application that will run on an AWS Lambda function. Hundreds of customers will use the application. The company wants to give each customer a quota of requests for a specific time period. The quotas must match customer usage patterns. Some customers must receive a higher quota for a shorter time period. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon API Gateway REST API with a proxy integration to invoke the Lambda function. For each customer, configure an API Gateway usage plan that includes an appropriate request quota. Create an API key from the usage plan for each user that the customer needs.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an Amazon API Gateway HTTP API with a proxy integration to invoke the Lambda function. For each customer configure an API Gateway usage plan that includes an appropriate request quota Configure route-level throttling for each usage plan. Create an API Key from the usage plan for each user that the customer needs.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a Lambda function alias for each customer. Include a concurrency limit with an appropriate request quota. Create a Lambda function URL for each function alias. Share the Lambda function URL for each alias with the relevant customer.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Application Load Balancer (ALB) in a VPC. Configure the Lambda function as a target for the ALB. Configure an AWS WAF web ACL for the ALB. For each customer configure a rale-based rule that includes an appropriate request quota.",
        "isCorrect": false
      }
    ],
    "comments": "Dar a cientos de clientes una CUOTA de peticiones por periodo, ajustable por cliente (algunos con cuota mayor y periodo más corto), sobre una Lambda.\n\nOpción A (Correcta): una API Gateway REST API con integración proxy a la Lambda y un usage plan por cliente (con cuota y API keys) es el mecanismo nativo para cuotas por cliente ajustables.\nOpción B: las HTTP APIs no soportan usage plans ni API keys con cuotas como las REST APIs.\nOpción C: alias de Lambda con límites de concurrencia no implementan cuotas de peticiones por periodo.\nOpción D: un ALB con WAF y reglas rate-based limita tasa por ventana fija, no cuotas por cliente con periodos configurables.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30302,
    "questionNumber": 302,
    "question": "A company is planning to migrate its on-premises VMware cluster of 120 VMs to AWS. The VMs have many different operating systems and many custom software packages installed. The company also has an on-premises NFS server that is 10 TB in size. The company has set up a 10 Gbps AWS Direct Connect connection to AWS for the migration. Which solution will complete the migration to AWS in the LEAST amount of time?",
    "choices": [
      {
        "letter": "A",
        "text": "Export the on-premises VMs and copy them to an Amazon S3 bucket. Use VM Import/Export to create AMIs from the VM images that are stored in Amazon S3. Order an AWS Snowball Edge device. Copy the NFS server data to the device. Restore the NFS server data to an Amazon EC2 instance that has NFS configured.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure AWS Application Migration Service with a connection to the VMware cluster. Create a replication job for the VMS. Create an Amazon Elastic File System (Amazon EFS) file system. Configure AWS DataSync to copy the NFS server data to the EFS file system over the Direct Connect connection.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Recreate the VMs on AWS as Amazon EC2 instances. Install all the required software packages. Create an Amazon FSx for Lustre file system. Configure AWS DataSync to copy the NFS server data to the FSx for Lustre file system over the Direct Connect connection.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Order two AWS Snowball Edge devices. Copy the VMs and the NFS server data to the devices. Run VM Import/Export after the data from the devices is loaded to an Amazon S3 bucket. Create an Amazon Elastic File System (Amazon EFS) file system. Copy the NFS server data from Amazon S3 to the EFS file system.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar 120 VMs VMware muy heterogéneas y un NFS de 10 TB con un Direct Connect de 10 Gbps, en el MENOR tiempo.\n\nOpción B (Correcta): AWS Application Migration Service (MGN) replica las VMs por bloque de forma rápida y agnóstica al SO/software, y DataSync copia el NFS a EFS sobre el Direct Connect existente, la vía más rápida.\nOpción A: exportar VMs a S3 y VM Import/Export es lento y manual, y pedir Snowball para 10 TB con DX de 10 Gbps disponible es innecesario y más lento.\nOpción C: recrear las 120 VMs a mano e instalar todo el software es inviable en tiempo mínimo.\nOpción D: dos Snowball Edge introducen latencia de envío/carga que un DX de 10 Gbps evita para este volumen.\n\nReferencias:\nhttps://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html\nhttps://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30303,
    "questionNumber": 303,
    "question": "An online survey company runs its application in the AWS Cloud. The application is distributed and consists of microservices that run in an automatically scaled Amazon Elastic Container Service (Amazon ECS) cluster. The ECS cluster is a target for an Application Load Balancer (ALB). The ALB is a custom origin for an Amazon CloudFront distribution. The company has a survey that contains sensitive data. The sensitive data must be encrypted when it moves through the application. The application's data-handling microservice is the only microservice that should be able to decrypt the data Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a symmetric AWS Key Management Service (AWS KMS) key that is dedicated to the data-handling microservice. Create a field-level encryption profile and a configuration. Associate the KMS key and the configuration with the CloudFront cache behavior.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an RSA key pair that is dedicated to the data-handing microservice. Upload the public key to the CloudFront distribution. Create a field-level encryption profile and a configuration. Add the configuration to the CloudFront cache behavior.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a symmetric AWS Key Management Service (AWS KMS) key that is dedicated to the data-handling microservice. Create a Lambda@Edge function. Program the function to use the KMS key to encrypt the sensitive data.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an RSA key pair that is dedicated to the data-handling microservice. Create a Lambda@Edge function. Program the function to use the private key of the RSA key pair to encrypt the sensitive data.",
        "isCorrect": false
      }
    ],
    "comments": "Cifrar datos sensibles de extremo a extremo por CloudFront de modo que SOLO el microservicio de manejo de datos pueda descifrarlos.\n\nOpción B (Correcta): field-level encryption de CloudFront cifra campos específicos con la clave pública RSA subida a la distribución; solo el microservicio con la clave privada correspondiente puede descifrar, cumpliendo el requisito de forma nativa.\nOpción A: field-level encryption de CloudFront usa un par RSA, no una clave simétrica KMS asociada al cache behavior.\nOpción C: una Lambda@Edge con KMS para cifrar añade complejidad y no es el mecanismo de field-level encryption de CloudFront.\nOpción D: Lambda@Edge cifrando con la clave privada RSA es incorrecto; en field-level encryption la privada descifra en el backend, no cifra en el borde.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/adding-cloudfront-fle.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30304,
    "questionNumber": 304,
    "question": "A solutions architect is determining the DNS strategy for an existing VPC. The VPC is provisioned to use the 10.24.34.0/24 CIDR block. The VPC also uses Amazon Route 53 Resolver for DNS. New requirements mandate that DNS queries must use private hosted zones. Additionally instances that have public IP addresses must receive corresponding public hostnames Which solution will meet these requirements to ensure that the domain names are correctly resolved within the VPC?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a private hosted zone. Activate the enableDnsSupport attribute and the enableDnsHostnames attribute for the VPC. Update the VPC DHCP options set to include domain-name-servers=10.24.34.2.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a private hosted zone Associate the private hosted zone with the VPC. Activate the enableDnsSupport attribute and the enableDnsHostnames attribute for the VPC. Create a new VPC DHCP options set, and configure domain-name-servers=AmazonProvidedDNS. Associate the new DHCP options set with the VPC.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Deactivate the enableDnsSupport attribute for the VPActivate the enableDnsHostnames attribute for the VPCreate a new VPC DHCP options set, and configure doman-name-servers=10.24.34.2. Associate the new DHCP options set with the VPC.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a private hosted zone. Associate the private hosted zone with the VPC. Activate the enableDnsSupport attribute for the VPC. Deactivate the enableDnsHostnames attribute for the VPC. Update the VPC DHCP options set to include domain-name-servers=AmazonProvidedDNS.",
        "isCorrect": false
      }
    ],
    "comments": "DNS en una VPC que debe usar private hosted zones y, además, dar hostnames públicos a instancias con IP pública.\n\nOpción B (Correcta): crear la private hosted zone y asociarla a la VPC, activar enableDnsSupport y enableDnsHostnames, y usar un DHCP options set con domain-name-servers=AmazonProvidedDNS resuelve las zonas privadas y otorga hostnames públicos a instancias con IP pública.\nOpción A: apuntar el DHCP a una IP concreta en lugar de AmazonProvidedDNS y no asociar la zona privada no cumple los requisitos.\nOpción C: desactivar enableDnsSupport rompe la resolución del resolver de AWS y las zonas privadas.\nOpción D: desactivar enableDnsHostnames impide que las instancias con IP pública reciban hostnames públicos.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/vpc-dns.html\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30305,
    "questionNumber": 305,
    "question": "A data analytics company has an Amazon Redshift cluster that consists of several reserved nodes. The cluster is experiencing unexpected bursts of usage because a team of employees is compiling a deep audit analysis report. The queries to generate the report are complex read queries and are CPU intensive. Business requirements dictate that the cluster must be able to service read and write queries at all times. A solutions architect must devise a solution that accommodates the bursts of usage. Which solution meets these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Provision an Amazon EMR cluster Offload the complex data processing tasks.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy an AWS Lambda function to add capacity to the Amazon Redshift cluster by using a classic resize operation when the cluster’s CPU metrics in Amazon CloudWatch reach 80%.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy an AWS Lambda function to add capacity to the Amazon Redshift cluster by using an elastic resize operation when the cluster’s CPU metrics in Amazon CloudWatch reach 80%.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Turn on the Concurrency Scaling feature for the Amazon Redshift cluster.",
        "isCorrect": true
      }
    ],
    "comments": "Cluster Redshift con nodos reservados que sufre picos de consultas de lectura intensivas, debiendo servir lecturas y escrituras SIEMPRE, al MENOR coste.\n\nOpción D (Correcta): activar Concurrency Scaling añade capacidad de lectura automáticamente durante los picos (con horas gratuitas acumuladas) sin redimensionar el cluster, cumpliendo disponibilidad de lectura/escritura al menor coste.\nOpción A: un cluster EMR para descargar procesamiento añade infraestructura y complejidad innecesarias.\nOpción B: un classic resize deja el cluster en solo lectura durante el redimensionado, incumpliendo servir escrituras siempre.\nOpción C: elastic resize por Lambda es más rápido pero interrumpe brevemente y no es tan económico ni tan simple como Concurrency Scaling para picos de lectura.\n\nReferencias:\nhttps://docs.aws.amazon.com/redshift/latest/dg/concurrency-scaling.html\nhttps://docs.aws.amazon.com/redshift/latest/mgmt/managing-cluster-considerations.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30306,
    "questionNumber": 306,
    "question": "A research center is migrating to the AWS Cloud and has moved its on-premises 1 PB object storage to an Amazon S3 bucket. One hundred scientists are using this object storage to store their work-related documents. Each scientist has a personal folder on the object store. All the scientists are members of a single IAM user group. The research center's compliance officer is worried that scientists will be able to access each other's work. The research center has a strict obligation to report on which scientist accesses which documents. The team that is responsible for these reports has little AWS experience and wants a ready-to-use solution that minimizes operational overhead. Which combination of actions should a solutions architect take to meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an identity policy that grants the user read and write access. Add a condition that specifies that the S3 paths must be prefixed with $(aws:username). Apply the policy on the scientists’ IAM user group.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure a trail with AWS CloudTrail to capture all object-level events in the S3 bucket. Store the trail output in another S3 bucket. Use Amazon Athena to query the logs and generate reports.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Enable S3 server access logging. Configure another S3 bucket as the target for log delivery. Use Amazon Athena to query the logs and generate reports.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an S3 bucket policy that grants read and write access to users in the scientists’ IAM user group.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Configure a trail with AWS CloudTrail to capture all object-level events in the S3 bucket and write the events to Amazon CloudWatch. Use the Amazon Athena CloudWatch connector to query the logs and generate reports.",
        "isCorrect": false
      }
    ],
    "comments": "Aislar carpetas personales de 100 científicos en un bucket S3 y reportar quién accede a qué documentos, con solución lista para usar y MÍNIMO overhead (elegir dos).\n\nOpción A (Correcta): una identity policy en el grupo IAM con condición de que las rutas S3 lleven el prefijo ${aws:username} confina a cada científico a su carpeta personal.\nOpción B (Correcta): un trail de CloudTrail con eventos de nivel objeto guardado en otro bucket y consultado con Athena da la auditoría lista para usar de quién accede a cada documento.\nOpción C: el S3 server access logging es best-effort, menos completo y fiable que CloudTrail data events para auditoría de acceso a objetos.\nOpción D: una bucket policy que da lectura/escritura a todo el grupo no aísla las carpetas personales.\nOpción E: enviar eventos de CloudTrail a CloudWatch y consultarlos con el conector Athena añade complejidad frente a leerlos directamente desde S3.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/amazon-s3-policy-keys.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-cloudtrail-logging-for-s3.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30307,
    "questionNumber": 307,
    "question": "A company uses AWS Organizations to manage a multi-account structure. The company has hundreds of AWS accounts and expects the number of accounts to increase. The company is building a new application that uses Docker images. The company will push the Docker images to Amazon Elastic Container Registry (Amazon ECR). Only accounts that are within the company’s organization should have access to the images. The company has a CI/CD process that runs frequently. The company wants to retain all the tagged images. However, the company wants to retain only the five most recent untagged images. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a private repository in Amazon ECR. Create a permissions policy for the repository that allows only required ECR operations. Include a condition to allow the ECR operations if the value of the aws:PrincipalOrglD condition key is equal to the ID of the company’s organization. Add a lifecycle rule to the ECR repository that deletes all untagged images over the count of five",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a public repository in Amazon ECR. Create an IAM role in the ECR account. Set permissions so that any account can assume the role if the value of the aws:PrincipalOrglD condition key is equal to the ID of the company’s organization. Add a lifecycle rule to the ECR repository that deletes all untagged images over the count of five.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a private repository in Amazon ECR. Create a permissions policy for the repository that includes only required ECR operations. Include a condition to allow the ECR operations for all account IDs in the organization Schedule a daily Amazon EventBridge rule to invoke an AWS Lambda function that deletes all untagged images over the count of five.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a public repository in Amazon ECR. Configure Amazon ECR to use an interface VPC endpoint with an endpoint policy that includes the required permissions for images that the company needs to pull. Include a condition to allow the ECR operations for all account IDs in the company’s organization. Schedule a daily Amazon EventBridge rule to invoke an AWS Lambda function that deletes all untagged images over the count of five.",
        "isCorrect": false
      }
    ],
    "comments": "Repositorio ECR accesible SOLO por cuentas de la organización, reteniendo todas las imágenes etiquetadas y solo las 5 untagged más recientes, con el MENOR overhead operativo.\n\nOpción A (Correcta): un repositorio privado ECR con permissions policy condicionada a aws:PrincipalOrgID igual al ID de la organización restringe el acceso a la org, y una lifecycle rule retiene tagged y expira untagged salvo las 5 más recientes, sin gestión manual.\nOpción B: un repositorio público expone las imágenes fuera de la organización, incumpliendo el requisito.\nOpción C: un EventBridge diario con Lambda para limpiar untagged reinventa lo que hace una lifecycle rule nativa, mayor overhead.\nOpción D: un repositorio público con interface endpoint no restringe realmente el acceso a la organización.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-policy-examples.html\nhttps://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30308,
    "questionNumber": 308,
    "question": "A solutions architect is reviewing a company's process for taking snapshots of Amazon RDS DB instances. The company takes automatic snapshots every day and retains the snapshots for 7 days. The solutions architect needs to recommend a solution that takes snapshots every 6 hours and retains the snapshots for 30 days. The company uses AWS Organizations to manage all of its AWS accounts. The company needs a consolidated view of the health of the RDS snapshots. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Turn on the cross-account management feature in AWS Backup. Create a backup plan that specifies the frequency and retention requirements. Add a tag to the DB instances. Apply the backup plan by using tags. Use AWS Backup to monitor the status of the backups.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Turn on the cross-account management feature in Amazon RDS. Create a snapshot global policy that specifies the frequency and retention requirements. Use the RDS console in the management account to monitor the status of the backups.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Turn on the cross-account management feature in AWS CloudFormation. From the management account, deploy a CloudFormation stack set that contains a backup plan from AWS Backup that specifies the frequency and retention requirements. Create an AWS Lambda function in the management account to monitor the status of the backups. Create an Amazon EventBridge rule in each account to run the Lambda function on a schedule.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure AWS Backup in each account. Create an Amazon Data Lifecycle Manager lifecycle policy that specifies the frequency and retention requirements. Specify the DB instances as the target resource Use the Amazon Data Lifecycle Manager console in each member account to monitor the status of the backups.",
        "isCorrect": false
      }
    ],
    "comments": "Snapshots de RDS cada 6 horas con retención de 30 días y una vista consolidada de su estado en toda la organización, con el MENOR overhead operativo.\n\nOpción A (Correcta): activar la gestión cross-account de AWS Backup y crear un backup plan (frecuencia y retención) aplicado por tags, monitorizado desde AWS Backup, cumple todo de forma nativa y centralizada.\nOpción B: RDS no tiene una feature cross-account con snapshot global policy como se describe.\nOpción C: StackSets con Lambda de monitorización añade complejidad frente a la vista integrada de AWS Backup.\nOpción D: Data Lifecycle Manager por cuenta no da vista consolidada organizativa y aumenta el overhead.\n\nReferencias:\nhttps://docs.aws.amazon.com/aws-backup/latest/devguide/manage-cross-account.html\nhttps://docs.aws.amazon.com/aws-backup/latest/devguide/creating-a-backup-plan.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30309,
    "questionNumber": 309,
    "question": "A company is using AWS Organizations with a multi-account architecture. The company's current security configuration for the account architecture includes SCPs, resource-based policies, identity-based policies, trust policies, and session policies. A solutions architect needs to allow an IAM user in Account A to assume a role in Account B. Which combination of steps must the solutions architect take to meet this requirement? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the SCP for Account A to allow the action.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure the resource-based policies to allow the action.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Configure the identity-based policy on the user in Account A to allow the action.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure the identity-based policy on the user in Account B to allow the action.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Configure the trust policy on the target role in Account B to allow the action.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Configure the session policy to allow the action and to be passed programmatically by the GetSessionToken API operation.",
        "isCorrect": false
      }
    ],
    "comments": "Permitir que un usuario IAM de la Cuenta A asuma un rol en la Cuenta B en un entorno multi-cuenta (elegir tres).\n\nOpción B (Correcta): las resource-based policies (aquí la trust policy del rol es la política basada en recurso) deben permitir la acción sts:AssumeRole.\nOpción C (Correcta): la identity-based policy del usuario en la Cuenta A debe permitir sts:AssumeRole sobre el rol destino.\nOpción E (Correcta): la trust policy del rol en la Cuenta B debe confiar en el principal de la Cuenta A.\nOpción A: no se requiere un SCP para permitir explícitamente; los SCP solo limitan, no conceden, y por defecto no bloquean esta acción.\nOpción D: la identity-based policy en la Cuenta B no es lo que habilita el AssumeRole entre cuentas; lo relevante es la trust policy del rol.\nOpción F: GetSessionToken no interviene en cross-account AssumeRole; la session policy no es necesaria para habilitar la acción.\n\nReferencias:\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30310,
    "questionNumber": 310,
    "question": "A company wants to use Amazon S3 to back up its on-premises file storage solution. The company’s on-premises file storage solution supports NFS, and the company wants its new solution to support NFS. The company wants to archive the backup files after 5 days. If the company needs archived files for disaster recovery, the company is willing to wait a few days for the retrieval of those files. Which solution meets these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy an AWS Storage Gateway file gateway that is associated with an S3 bucket. Move the files from the on-premises file storage solution to the file gateway. Create an S3 Lifecycle rule to move the files to S3 Standard-Infrequent Access (S3 Standard-IA) after 5 days.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy an AWS Storage Gateway volume gateway that is associated with an S3 bucket. Move the files from the on-premises file storage solution to the volume gateway. Create an S3 Lifecycle rule to move the files to S3 Glacier Deep Archive after 5 days.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy an AWS Storage Gateway tape gateway that is associated with an S3 bucket. Move the files from the on-premises file storage solution to the tape gateway. Create an S3 Lifecycle rule to move the files to S3 Standard-Infrequent Access (S3 Standard-IA) after 5 days.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy an AWS Storage Gateway file gateway that is associated with an S3 bucket. Move the files from the on-premises file storage solution to the file gateway. Create an S3 Lifecycle rule to move the files to S3 Glacier Deep Archive after 5 days.",
        "isCorrect": true
      }
    ],
    "comments": "Backup a S3 de un almacenamiento on-premises NFS, con soporte NFS y archivado a los 5 días, tolerando días de espera en recuperación, lo MÁS rentable.\n\nOpción D (Correcta): un file gateway de Storage Gateway (protocolo NFS) sobre un bucket S3, con una lifecycle rule que mueve a S3 Glacier Deep Archive a los 5 días, es lo más barato para archivo de larga duración con recuperación en días.\nOpción A: mover a S3 Standard-IA es más caro para archivo que Glacier Deep Archive y no aprovecha la tolerancia a esperar días.\nOpción B: el volume gateway expone iSCSI, no NFS, incumpliendo el requisito de NFS.\nOpción C: el tape gateway expone VTL (iSCSI), no NFS.\n\nReferencias:\nhttps://docs.aws.amazon.com/filegateway/latest/files3/what-is-file-s3.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30311,
    "questionNumber": 311,
    "question": "A company runs its application on Amazon EC2 instances and AWS Lambda functions. The EC2 instances experience a continuous and stable load. The Lambda functions experience a varied and unpredictable load. The application includes a caching layer that uses an Amazon MemoryDB for Redis cluster. A solutions architect must recommend a solution to minimize the company's overall monthly costs. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Purchase an EC2 instance Savings Plan to cover the EC2 instances. Purchase a Compute Savings Plan for Lambda to cover the minimum expected consumption of the Lambda functions. Purchase reserved nodes to cover the MemoryDB cache nodes.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Purchase a Compute Savings Plan to cover the EC2 instances. Purchase Lambda reserved concurrency to cover the expected Lambda usage. Purchase reserved nodes to cover the MemoryDB cache nodes.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Purchase a Compute Savings Plan to cover the entire expected cost of the EC2 instances, Lambda functions, and MemoryDB cache nodes.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Purchase a Compute Savings Plan to cover the EC2 instances and the MemoryDB cache nodes. Purchase Lambda reserved concurrency to cover the expected Lambda usage.",
        "isCorrect": false
      }
    ],
    "comments": "Cargas mixtas EC2 (estable) + Lambda (variable) + MemoryDB, se busca MINIMIZAR el coste mensual global con el modelo de compra adecuado a cada patrón.\n\nOpción A (Correcta): EC2 Instance Savings Plan cubre la carga estable de EC2 con el máximo descuento; Compute Savings Plan sobre el mínimo esperado de Lambda cubre el consumo base variable; y los reserved nodes cubren MemoryDB. Cada servicio recibe el instrumento correcto.\nOpción B: la concurrencia reservada de Lambda no reduce el precio por invocación (es para latencia/warm), no ahorra coste; falla el objetivo.\nOpción C: un único Compute Savings Plan NO cubre MemoryDB (los nodos de caché no entran en Savings Plans), no aplica.\nOpción D: igual que C, MemoryDB no se cubre con Compute Savings Plan y la concurrencia reservada no ahorra.\n\nReferencias:\nhttps://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html\nhttps://docs.aws.amazon.com/memorydb/latest/devguide/reserved-nodes.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30312,
    "questionNumber": 312,
    "question": "A company is launching a new online game on Amazon EC2 instances. The game must be available globally. The company plans to run the game in three AWS Regions us-east-1, eu-west-1, and ap-southeast-1. The game's leaderboards, player inventory and event status must be available across Regions. A solutions architect must design a solution that will give any Region the ability to scale to handle the load of all Regions. Additionally, users must automatically connect to the Region that provides the least latency. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an EC2 Spot Fleet. Attach the Spot Fleet to a Network Load Balancer (NLB) in each Region. Create an AWS Global Accelerator IP address that points to the NLB. Create an Amazon Route 53 latency-based routing entry for the Global Accelerator IP address. Save the game metadata to an Amazon RDS for MySQL DB instance in each Region. Set up a read replica in the other Regions.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Auto Scaling group for the EC2 instances Attach the Auto Scaling group to a Network Load Balancer (NLB) in each Region. For each Region, create an Amazon Route 53 entry that uses geoproximity routing and points to the NLB in that Region. Save the game metadata to MySQL databases on EC2 instances in each Region. Set up replication between the database EC2 instances in each Region.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Auto Scaling group for the EC2 instances. Attach the Auto Scaling group to a Network Load Balancer (NLB) in each Region. For each Region, create an Amazon Route 53 entry that uses latency-based routing and points to the NLB in that Region. Save the game metadata to an Amazon DynamoDB global table.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use EC2 Global View. Deploy the EC2 instances to each Region. Attach the instances to a Network Load Balancer (NLB). Deploy a DNS server on an EC2 instance in each Region. Set up custom logic on each DNS server to redirect the user to the Region that provides the lowest latency. Save the game metadata to an Amazon Aurora global database.",
        "isCorrect": false
      }
    ],
    "comments": "Juego global en 3 Regiones que necesita datos compartidos entre Regiones (leaderboards, inventario) y enrutar al usuario a la Región de MENOR latencia con el MENOR overhead operativo.\n\nOpción C (Correcta): Auto Scaling + NLB por Región permite escalar la carga; Route 53 latency-based routing dirige a la Región más cercana; y DynamoDB global table ofrece replicación multi-región totalmente gestionada sin administrar réplicas.\nOpción A: Spot Fleet no garantiza disponibilidad para un juego que debe estar siempre activo, y RDS read replicas cross-Region añaden gestión y no son multi-master.\nOpción B: geoproximity enruta por geografía, no por latencia real; y replicar MySQL en EC2 es alto overhead operativo.\nOpción D: DNS custom en EC2 con lógica propia es máximo overhead y frágil; descartado.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30313,
    "questionNumber": 313,
    "question": "A company is deploying a third-party firewall appliance solution from AWS Marketplace to monitor and protect traffic that leaves the company's AWS environments. The company wants to deploy this appliance into a shared services VPC and route all outbound internet-bound traffic through the appliances. A solutions architect needs to recommend a deployment method that prioritizes reliability and minimizes failover time between firewall appliances within a single AWS Region. The company has set up routing from the shared services VPC to other VPCs. Which steps should the solutions architect recommend to meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy two firewall appliances into the shared services VPC, each in a separate Availability Zone.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a new Network Load Balancer in the shared services VPC. Create a new target group, and attach it to the new Network Load Balancer. Add each of the firewall appliance instances to the target group.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a new Gateway Load Balancer in the shared services VPCreate a new target group, and attach it to the new Gateway Load Balancer Add each of the firewall appliance instances to the target group.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create a VPC interface endpoint. Add a route to the route table in the shared services VPC. Designate the new endpoint as the next hop for traffic that enters the shared services VPC from other VPCs.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Deploy two firewall appliances into the shared services VPC, each in the same Availability Zone.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Create a VPC Gateway Load Balancer endpoint. Add a route to the route table in the shared services VPC. Designate the new endpoint as the next hop for traffic that enters the shared services VPC from other VPCs.",
        "isCorrect": true
      }
    ],
    "comments": "Despliegue de appliances de firewall de terceros en una VPC de servicios compartidos para inspeccionar TODO el tráfico saliente, priorizando fiabilidad y MÍNIMO tiempo de failover entre appliances en una sola Región.\n\nOpción A (Correcta): dos appliances en AZ separadas dan alta disponibilidad frente a fallo de una AZ.\nOpción C (Correcta): Gateway Load Balancer (GWLB) es el servicio diseñado para insertar appliances de inspección de forma transparente (usa GENEVE) y hacer health checks/failover rápido.\nOpción F (Correcta): el endpoint de GWLB en la tabla de rutas como next hop encamina el tráfico entrante a los appliances de forma escalable y con failover integrado.\nOpción B: un NLB no preserva flujos para appliances de inspección bump-in-the-wire como lo hace GWLB.\nOpción D: un interface endpoint no es un GWLB endpoint; no encamina tráfico de inspección.\nOpción E: dos appliances en la MISMA AZ no aportan resiliencia ante fallo de AZ.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/gateway-load-balancer-endpoints.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30314,
    "questionNumber": 314,
    "question": "A solutions architect needs to migrate an on-premises legacy application to AWS. The application runs on two servers behind a load balancer. The application requires a license file that is associated with the MAC address of the server's network adapter It takes the software vendor 12 hours to send new license files. The application also uses configuration files with a static IP address to access a database server, host names are not supported. Given these requirements, which combination of steps should be taken to implement highly available architecture for the application servers in AWS? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a pool of ENIs. Request license files from the vendor for the pool, and store the license files in Amazon S3. Create a bootstrap automation script to download a license file and attach the corresponding ENI to an Amazon EC2 instance.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a pool of ENIs. Request license files from the vendor for the pool, store the license files on an Amazon EC2 instance. Create an AMI from the instance and use this AMI for all future EC2 instances.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a bootstrap automation script to request a new license file from the vendor .When the response is received, apply the license file to an Amazon EC2 instance.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Edit the bootstrap automation script to read the database server IP address from the AWS Systems Manager Parameter Store, and inject the value into the local configuration files.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Edit an Amazon EC2 instance to include the database server IP address in the configuration files and re-create the AMI to use for all future EC2 stances.",
        "isCorrect": false
      }
    ],
    "comments": "Migración de app legacy cuya licencia va atada a la MAC del adaptador (ENI) y cuya config usa una IP estática de BD (no hostnames); se busca ALTA DISPONIBILIDAD sin depender de 12 h de espera del proveedor.\n\nOpción A (Correcta): un pool de ENIs con licencias pre-solicitadas guardadas en S3 y un script de bootstrap que engancha la ENI correcta a la instancia mantiene la MAC/licencia válida sin esperar al proveedor en cada arranque.\nOpción D (Correcta): leer la IP de BD desde SSM Parameter Store e inyectarla en los ficheros de config desacopla la IP del AMI y permite reemplazo automático de instancias.\nOpción B: guardar licencias en la instancia y hornearlas en el AMI ata cada AMI a una MAC concreta; no escala en HA.\nOpción C: pedir la licencia al proveedor en cada arranque introduce 12 h de latencia; rompe la HA.\nOpción E: hornear la IP en el AMI obliga a recrear el AMI en cada cambio; frágil y con overhead.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html\nhttps://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html",
    "category": "Migración y Modernización",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30315,
    "questionNumber": 315,
    "question": "A company runs its sales reporting application in an AWS Region in the United States. The application uses an Amazon API Gateway Regional API and AWS Lambda functions to generate on-demand reports from data in an Amazon RDS for MySQL database. The frontend of the application is hosted on Amazon S3 and is accessed by users through an Amazon CloudFront distribution. The company is using Amazon Route 53 as the DNS service for the domain. Route 53 is configured with a simple routing policy to route traffic to the API Gateway API. In the next 6 months, the company plans to expand operations to Europe. More than 90% of the database traffic is read-only traffic. The company has already deployed an API Gateway API and Lambda functions in the new Region. A solutions architect must design a solution that minimizes latency for users who download reports. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use an AWS Database Migration Service (AWS DMS) task with full load to replicate the primary database in the original Region to the database in the new Region. Change the Route 53 record to latency-based routing to connect to the API Gateway API.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use an AWS Database Migration Service (AWS DMS) task with full load plus change data capture (CDC) to replicate the primary database in the original Region to the database in the new Region. Change the Route 53 record to geolocation routing to connect to the API Gateway API.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure a cross-Region read replica for the RDS database in the new Region Change the Route 53 record to latency-based routing to connect to the API Gateway API.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure a cross-Region read replica for the RDS database in the new Region. Change the Route 53 record to geolocation routing to connect to the API Gateway API.",
        "isCorrect": false
      }
    ],
    "comments": "App de informes con RDS MySQL (más del 90% de tráfico de solo lectura) que se expande a Europa; hay que MINIMIZAR la latencia de los usuarios que descargan informes.\n\nOpción C (Correcta): una read replica cross-Region de RDS sirve el tráfico de lectura localmente en la nueva Región, y Route 53 latency-based routing envía a cada usuario a la Región más cercana.\nOpción A: DMS full load es una copia puntual, no mantiene los datos sincronizados de forma continua; no válido para lecturas actualizadas.\nOpción B: DMS aunque use CDC es más operativo que una read replica nativa, y geolocation no optimiza por latencia real.\nOpción D: la read replica es correcta pero geolocation routing enruta por país, no por latencia; latency-based es superior para minimizar latencia.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30316,
    "questionNumber": 316,
    "question": "A software company needs to create short-lived test environments to test pull requests as part of its development process. Each test environment consists of a single Amazon EC2 instance that is in an Auto Scaling group. The test environments must be able to communicate with a central server to report test results. The central server is located in an on-premises data center. A solutions architect must implement a solution so that the company can create and delete test environments without any manual intervention. The company has created a transit gateway with a VPN attachment to the on-premises network. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS CloudFormation template that contains a transit gateway attachment and related routing configurations. Create a CloudFormation stack set that includes this template. Use CloudFormation StackSets to deploy a new stack for each VPC in the account. Deploy a new VPC for each test environment.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a single VPC for the test environments. Include a transit gateway attachment and related routing configurations. Use AWS CloudFormation to deploy all test environments into the VPC.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a new OU in AWS Organizations for testing. Create an AWS CioudFormation template that contains a VPC, necessary networking resources, a transit gateway attachment, and related routing configurations. Create a CloudFormation stack set that includes this template. Use CloudFormation StackSets for deployments into each account under the testing OU. Create a new account for each test environment.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Convert the test environment EC2 instances into Docker images. Use AWS CloudFormation to configure an Amazon Elastic Kubernetes Service (Amazon EKS) cluster in a new VPC, create a transit gateway attachment, and create related routing configurations. Use Kubernetes to manage the deployment and lifecycle of the test environments.",
        "isCorrect": false
      }
    ],
    "comments": "Entornos de test efímeros (una instancia EC2 en ASG) que deben comunicarse con un servidor on-premises vía transit gateway/VPN, creados y borrados sin intervención manual y con el MENOR overhead operativo.\n\nOpción B (Correcta): una única VPC con el attachment al TGW y sus rutas ya listas; CloudFormation despliega/elimina cada entorno de test dentro de esa VPC. Reutilizar la conectividad evita recrear attachments en cada ciclo.\nOpción A: desplegar una VPC nueva por entorno con StackSets multiplica attachments y rutas; alto overhead.\nOpción C: crear una cuenta nueva por entorno de test es máximo overhead operativo y de gobierno.\nOpción D: reconvertir a EKS añade complejidad innecesaria (Kubernetes) para instancias simples de test.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30317,
    "questionNumber": 317,
    "question": "A company is deploying a new API to AWS. The API uses Amazon API Gateway with a Regional API endpoint and an AWS Lambda function for hosting. The API retrieves data from an external vendor API, stores data in an Amazon DynamoDB global table, and retrieves data from the DynamoDB global table The API key for the vendor's API is stored in AWS Secrets Manager and is encrypted with a customer managed key in AWS Key Management Service (AWS KMS). The company has deployed its own API into a single AWS Region. A solutions architect needs to change the API components of the company’s API to ensure that the components can run across multiple Regions in an active-active configuration. Which combination of changes will meet this requirement with the LEAST operational overhead? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy the API to multiple Regions. Configure Amazon Route 53 with custom domain names that route traffic to each Regional API endpoint. Implement a Route 53 multivalue answer routing policy.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a new KMS multi-Region customer managed key. Create a new KMS customer managed replica key in each in-scope Region.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Replicate the existing Secrets Manager secret to other Regions. For each in-scope Region's replicated secret, select the appropriate KMS key.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create a new AWS managed KMS key in each in-scope Region. Convert an existing key to a multiRegion key. Use the multi-Region key in other Regions.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Create a new Secrets Manager secret in each in-scope Region. Copy the secret value from the existing Region to the new secret in each in-scope Region.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Modify the deployment process for the Lambda function to repeat the deployment across in-scope Regions. Turn on the multi-Region option for the existing API. Select the Lambda function that is deployed in each Region as the backend for the multi-Region API.",
        "isCorrect": false
      }
    ],
    "comments": "Hacer la API (API Gateway + Lambda + DynamoDB global table + secreto en Secrets Manager cifrado con CMK) activo-activo multi-Región con el MENOR overhead operativo.\n\nOpción A (Correcta): desplegar la API en varias Regiones con dominios custom en Route 53 y política multivalue answer reparte el tráfico entre endpoints regionales activo-activo.\nOpción B (Correcta): una CMK multi-Región con claves réplica en cada Región permite descifrar el secreto localmente en cada Región.\nOpción C (Correcta): replicar el secreto de Secrets Manager a las demás Regiones (asociando la clave KMS adecuada) da acceso local sin llamadas cross-Region.\nOpción D: una AWS managed key no puede convertirse en multi-Región (solo las customer managed); inválido.\nOpción E: crear secretos independientes y copiar valores a mano es operativo y propenso a desincronización frente a la replicación nativa.\nOpción F: no existe una opción \"multi-Region\" nativa que seleccione una Lambda por Región para una API única de ese modo; describe una capacidad inexistente.\n\nReferencias:\nhttps://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html\nhttps://docs.aws.amazon.com/secretsmanager/latest/userguide/create-manage-multi-region-secrets.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30318,
    "questionNumber": 318,
    "question": "An online retail company hosts its stateful web-based application and MySQL database in an on-premises data center on a single server. The company wants to increase its customer base by conducting more marketing campaigns and promotions. In preparation, the company wants to migrate its application and database to AWS to increase the reliability of its architecture. Which solution should provide the HIGHEST level of reliability?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate the database to an Amazon RDS MySQL Multi-AZ DB instance. Deploy the application in an Auto Scaling group on Amazon EC2 instances behind an Application Load Balancer. Store sessions in Amazon Neptune",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Migrate the database to Amazon Aurora MySQL. Deploy the application in an Auto Scaling group on Amazon EC2 instances behind an Application Load Balancer. Store sessions in an Amazon ElastiCache for Redis replication group.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Migrate the database to Amazon DocumentDB (with MongoDB compatibility). Deploy the application in an Auto Scaling group on Amazon EC2 instances behind a Network Load Balancer Store sessions in Amazon Kinesis Data Firehose.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Migrate the database to an Amazon RDS MariaDB Multi-AZ DB instance. Deploy the application in an Auto Scaling group on Amazon EC2 instances behind an Application Load Balancer. Store sessions in Amazon ElastiCache for Memcached.",
        "isCorrect": false
      }
    ],
    "comments": "App web stateful + MySQL en un único servidor on-premises que migra a AWS buscando el MÁS ALTO nivel de fiabilidad.\n\nOpción B (Correcta): Aurora MySQL (almacenamiento distribuido en 3 AZ, tolerante a fallos) + ASG de EC2 tras ALB + sesiones en ElastiCache for Redis con replication group ofrece HA en todas las capas y sesiones persistentes replicadas.\nOpción A: Neptune es una BD de grafos, no apta para almacenar sesiones; inadecuado.\nOpción C: DocumentDB no es compatible con MySQL y Kinesis Data Firehose no es un almacén de sesiones; incorrecto.\nOpción D: RDS MariaDB Multi-AZ es válido pero ElastiCache for Memcached NO replica ni persiste sesiones (sin failover), inferior en fiabilidad a Redis replication group.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.html\nhttps://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Replication.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30319,
    "questionNumber": 319,
    "question": "A company’s solutions architect needs to provide secure Remote Desktop connectivity to users for Amazon EC2 Windows instances that are hosted in a VPC. The solution must integrate centralized user management with the company's on-premises Active Directory. Connectivity to the VPC is through the internet. The company has hardware that can be used to establish an AWS Site-to-Site VPN connection. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy a managed Active Directory by using AWS Directory Service for Microsoft Active Directory. Establish a trust with the on-premises Active Directory. Deploy an EC2 instance as a bastion host in the VPC. Ensure that the EC2 instance is joined to the domain. Use the bastion host to access the target instances through RDP.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure AWS IAM Identity Center (AWS Single Sign-On) to integrate with the on-premises Active Directory by using the AWS Directory Service for Microsoft Active Directory AD Connector. Configure permission sets against user groups for access to AWS Systems Manager. Use Systems Manager Fleet Manager to access the target instances through RDP.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Implement a VPN between the on-premises environment and the target VPEnsure that the target instances are joined to the on-premises Active Directory domain over the VPN connection. Configure RDP access through the VPN. Connect from the company’s network to the target instances.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Deploy a managed Active Directory by using AWS Directory Service for Microsoft Active Directory. Establish a trust with the on-premises Active Directory. Deploy a Remote Desktop Gateway on AWS by using an AWS Quick Start. Ensure that the Remote Desktop Gateway is joined to the domain. Use the Remote Desktop Gateway to access the target instances through RDP.",
        "isCorrect": false
      }
    ],
    "comments": "Acceso RDP seguro a instancias EC2 Windows integrando gestión de usuarios centralizada con el Active Directory on-premises, disponiendo ya de hardware para Site-to-Site VPN, y de la forma MÁS rentable.\n\nOpción C (Correcta): montar la VPN con el hardware que ya tienen, unir las instancias al AD on-premises existente sobre la VPN y hacer RDP a través de ella evita costes de servicios gestionados adicionales; es lo más económico.\nOpción A: AWS Managed Microsoft AD + trust + bastion añade coste del directorio gestionado y de la instancia bastion.\nOpción B: IAM Identity Center + AD Connector + Fleet Manager es válido pero introduce más servicios/coste que reutilizar el AD y la VPN existentes.\nOpción D: Managed Microsoft AD + RD Gateway también implica coste del directorio gestionado y de la instancia gateway.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html\nhttps://docs.aws.amazon.com/directoryservice/latest/admin-guide/ms_ad_join_instance.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30320,
    "questionNumber": 320,
    "question": "A company's compliance audit reveals that some Amazon Elastic Block Store (Amazon EBS) volumes that were created in an AWS account were not encrypted. A solutions architect must implement a solution to encrypt all new EBS volumes at rest. Which solution will meet this requirement with the LEAST effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon EventBridge rule to detect the creation of unencrypted EBS volumes. Invoke an AWS Lambda function to delete noncompliant volumes.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Audit Manager with data encryption.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS Config rule to detect the creation of a new EBS volume. Encrypt the volume by using AWS Systems Manager Automation.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Turn on EBS encryption by default in all AWS Regions.",
        "isCorrect": true
      }
    ],
    "comments": "Auditoría detecta volúmenes EBS sin cifrar; hay que cifrar TODOS los nuevos volúmenes EBS en reposo con el MENOR esfuerzo.\n\nOpción D (Correcta): activar \"EBS encryption by default\" por Región es un ajuste de cuenta que cifra automáticamente cualquier volumen nuevo sin código ni automatización.\nOpción A: EventBridge + Lambda que borra volúmenes no cifrados es reactivo, destructivo y con más mantenimiento.\nOpción B: Audit Manager es para evaluación de cumplimiento, no cifra volúmenes.\nOpción C: AWS Config + SSM Automation para cifrar tras la creación es más complejo y no cifra en el momento de creación.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/work-with-ebs-encr.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30321,
    "questionNumber": 321,
    "question": "A research company is running daily simulations in the AWS Cloud to meet high demand. The simulations run on several hundred Amazon EC2 instances that are based on Amazon Linux 2. Occasionally, a simulation gets stuck and requires a cloud operations engineer to solve the problem by connecting to an EC2 instance through SSH. Company policy states that no EC2 instance can use the same SSH key and that all connections must be logged in AWS CloudTrail. How can a solutions architect meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Launch new EC2 instances, and generate an individual SSH key for each instance. Store the SSH key in AWS Secrets Manager. Create a new IAM policy, and attach it to the engineers’ IAM role with an Allow statement for the GetSecretValue action. Instruct the engineers to fetch the SSH key from Secrets Manager when they connect through any SSH client.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Systems Manager document to run commands on EC2 instances to set a new unique SSH key. Create a new IAM policy, and attach it to the engineers’ IAM role with an Allow statement to run Systems Manager documents. Instruct the engineers to run the document to set an SSH key and to connect through any SSH client.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Launch new EC2 instances without setting up any SSH key for the instances. Set up EC2 Instance Connect on each instance. Create a new IAM policy, and attach it to the engineers’ IAM role with an Allow statement for the SendSSHPublicKey action. Instruct the engineers to connect to the instance by using a browser-based SSH client from the EC2 console.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Set up AWS Secrets Manager to store the EC2 SSH key. Create a new AWS Lambda function to create a new SSH key and to call AWS Systems Manager Session Manager to set the SSH key on the EC2 instance. Configure Secrets Manager to use the Lambda function for automatic rotation once daily. Instruct the engineers to fetch the SSH key from Secrets Manager when they connect through any SSH client.",
        "isCorrect": false
      }
    ],
    "comments": "Cientos de EC2 Amazon Linux 2 donde ingenieros a veces necesitan SSH; la política exige que NINGUNA instancia use la misma clave SSH y que TODAS las conexiones queden registradas en CloudTrail.\n\nOpción C (Correcta): EC2 Instance Connect no requiere claves fijas: envía una clave pública temporal por instancia (acción SendSSHPublicKey), que se registra en CloudTrail; cumple ambos requisitos sin gestionar claves.\nOpción A: almacenar una clave por instancia en Secrets Manager es operativo y la conexión SSH en sí no queda auditada en CloudTrail.\nOpción B: un documento SSM que fija una nueva clave SSH sigue gestionando claves y no garantiza clave única por instancia de forma limpia.\nOpción D: rotar claves con Lambda/Secrets Manager/Session Manager es complejo y las conexiones SSH directas no se auditan bien.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Connect-using-EC2-Instance-Connect.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-connect-set-up.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30322,
    "questionNumber": 322,
    "question": "A company is migrating mobile banking applications to run on Amazon EC2 instances in a VPC. Backend service applications run in an on-premises data center. The data center has an AWS Direct Connect connection into AWS. The applications that run in the VPC need to resolve DNS requests to an on-premises Active Directory domain that runs in the data center. Which solution will meet these requirements with the LEAST administrative overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Provision a set of EC2 instances across two Availability Zones in the VPC as caching DNS servers to resolve DNS queries from the application servers within the VPC.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Provision an Amazon Route 53 private hosted zone. Configure NS records that point to on-premises DNS servers.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create DNS endpoints by using Amazon Route 53 Resolver. Add conditional forwarding rules to resolve DNS namespaces between the on-premises data center and the VPC.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Provision a new Active Directory domain controller in the VPC with a bidirectional trust between this new domain and the on-premises Active Directory domain.",
        "isCorrect": false
      }
    ],
    "comments": "Apps en VPC que deben resolver DNS de un dominio Active Directory on-premises alcanzable por Direct Connect, con el MENOR overhead administrativo.\n\nOpción C (Correcta): Route 53 Resolver con endpoints (outbound) y reglas de reenvío condicional resuelve los namespaces on-premises desde la VPC de forma totalmente gestionada.\nOpción A: EC2 como servidores DNS de caché implica administrar/parchear instancias; más overhead.\nOpción B: una private hosted zone con NS apuntando a DNS on-premises no es el mecanismo de reenvío condicional adecuado y es frágil.\nOpción D: desplegar un nuevo domain controller con trust bidireccional es mucho más pesado que reenviar consultas.\n\nReferencias:\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-outbound-queries.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30323,
    "questionNumber": 323,
    "question": "A company processes environmental data. The company has set up sensors to provide a continuous stream of data from different areas in a city. The data is available in JSON format. The company wants to use an AWS solution to send the data to a database that does not require fixed schemas for storage. The data must be sent in real time. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Amazon Kinesis Data Firehose to send the data to Amazon Redshift.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon Kinesis Data Streams to send the data to Amazon DynamoDB.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use Amazon Managed Streaming for Apache Kafka (Amazon MSK) to send the data to Amazon Aurora.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon Kinesis Data Firehose to send the data to Amazon Keyspaces (for Apache Cassandra).",
        "isCorrect": false
      }
    ],
    "comments": "Stream continuo de datos de sensores en JSON que debe ir en TIEMPO REAL a una base de datos SIN esquema fijo.\n\nOpción B (Correcta): Kinesis Data Streams ingiere en tiempo real (baja latencia, orden por shard) y DynamoDB es NoSQL sin esquema fijo; encaja con ambos requisitos.\nOpción A: Kinesis Data Firehose entrega casi en tiempo real (buffering) a Redshift, que es un data warehouse con esquema fijo; no cumple \"sin esquema\" ni \"tiempo real\" estricto.\nOpción C: Aurora es relacional con esquema fijo; no aplica.\nOpción D: Firehose no es tiempo real estricto y aunque Keyspaces es NoSQL, la combinación es peor que Streams+DynamoDB para latencia real.\n\nReferencias:\nhttps://docs.aws.amazon.com/streams/latest/dev/introduction.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30324,
    "questionNumber": 324,
    "question": "A company is migrating a legacy application from an on-premises data center to AWS. The application uses MongoDB as a key-value database. According to the company's technical guidelines, all Amazon EC2 instances must be hosted in a private subnet without an internet connection. In addition, all connectivity between applications and databases must be encrypted. The database must be able to scale based on demand. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create new Amazon DocumentDB (with MongoDB compatibility) tables for the application with Provisioned IOPS volumes. Use the instance endpoint to connect to Amazon DocumentDB.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create new Amazon DynamoDB tables for the application with on-demand capacity. Use a gateway VPC endpoint for DynamoDB to connect to the DynamoDB tables.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create new Amazon DynamoDB tables for the application with on-demand capacity. Use an interface VPC endpoint for DynamoDB to connect to the DynamoDB tables.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create new Amazon DocumentDB (with MongoDB compatibility) tables for the application with Provisioned IOPS volumes. Use the cluster endpoint to connect to Amazon DocumentDB.",
        "isCorrect": true
      }
    ],
    "comments": "Migrar app con MongoDB (usado como key-value) donde las EC2 deben estar en subred privada SIN internet, la conectividad app-BD debe ir cifrada y la BD debe escalar según demanda.\n\nOpción D (Correcta): DocumentDB (compatible con MongoDB) reside en la VPC (accesible en privado sin internet), soporta TLS en tránsito y escala añadiendo réplicas; el cluster endpoint conecta a la escritura del clúster.\nOpción A: DocumentDB es válido pero el instance endpoint apunta a una instancia concreta, no aprovecha el escalado/failover del clúster como el cluster endpoint.\nOpción B/C: DynamoDB no es MongoDB (habría que reescribir el acceso a datos) y el enunciado busca compatibilidad MongoDB; además el gateway endpoint (B) y el interface endpoint (C) no cambian el hecho de que exigiría cambiar el modelo de datos. Inadecuadas.\n\nReferencias:\nhttps://docs.aws.amazon.com/documentdb/latest/developerguide/what-is.html\nhttps://docs.aws.amazon.com/documentdb/latest/developerguide/connect.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30325,
    "questionNumber": 325,
    "question": "A company is running an application on Amazon EC2 instances in the AWS Cloud. The application is using a MongoDB database with a replica set as its data tier. The MongoDB database is installed on systems in the company’s on-premises data center and is accessible through an AWS Direct Connect connection to the data center environment. A solutions architect must migrate the on-premises MongoDB database to Amazon DocumentDB (with MongoDB compatibility). Which strategy should the solutions architect choose to perform this migration?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a fleet of EC2 instances. Install MongoDB Community Edition on the EC2 instances, and create a database. Configure continuous synchronous replication with the database that is running in the on-premises data center.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Database Migration Service (AWS DMS) replication instance. Create a source endpoint for the on-premises MongoDB database by using change data capture (CDC). Create a target endpoint for the Amazon DocumentDB database. Create and run a DMS migration task.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a data migration pipeline by using AWS Data Pipeline. Define data nodes for the on-premises MongoDB database and the Amazon DocumentDB database. Create a scheduled task to run the data pipeline.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a source endpoint for the on-premises MongoDB database by using AWS Glue crawlers. Configure continuous asynchronous replication between the MongoDB database and the Amazon DocumentDB database.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar MongoDB on-premises (replica set, accesible por Direct Connect) a Amazon DocumentDB con mínimo impacto.\n\nOpción B (Correcta): AWS DMS con instancia de replicación, endpoint origen MongoDB usando CDC y endpoint destino DocumentDB permite carga completa + captura de cambios en curso, minimizando downtime.\nOpción A: instalar MongoDB Community en EC2 no migra a DocumentDB (destino equivocado) y la replicación síncrona continua es compleja.\nOpción C: Data Pipeline no es la herramienta adecuada ni soporta CDC de MongoDB a DocumentDB.\nOpción D: Glue crawlers catalogan datos, no realizan replicación continua MongoDB→DocumentDB.\n\nReferencias:\nhttps://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.MongoDB.html\nhttps://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.DocumentDB.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30326,
    "questionNumber": 326,
    "question": "A company is rearchitecting its applications to run on AWS. The company’s infrastructure includes multiple Amazon EC2 instances. The company's development team needs different levels of access. The company wants to implement a policy that requires all Windows EC2 instances to be joined to an Active Directory domain on AWS. The company also wants to implement enhanced security processes such as multi-factor authentication (MFA). The company wants to use managed AWS services wherever possible. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Directory Service for Microsoft Active Directory implementation. Launch an Amazon Workspace. Connect to and use the Workspace for domain security configuration tasks.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create an AWS Directory Service for Microsoft Active Directory implementation. Launch an EC2 instance. Connect to and use the EC2 instance for domain security configuration tasks.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS Directory Service Simple AD implementation. Launch an EC2 instance. Connect to and use the EC2 instance for domain security configuration tasks.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Directory Service Simple AD implementation. Launch an Amazon Workspace. Connect to and use the Workspace for domain security configuration tasks.",
        "isCorrect": false
      }
    ],
    "comments": "Requiere unir todas las EC2 Windows a un dominio AD en AWS, con MFA y usando servicios GESTIONADOS siempre que sea posible.\n\nOpción A (Correcta): AWS Managed Microsoft AD (gestionado, soporta MFA y unión de instancias Windows) + un Amazon WorkSpace (escritorio gestionado) para las tareas de configuración del dominio evita administrar una instancia EC2 de gestión.\nOpción B: Managed Microsoft AD es correcto, pero usar una EC2 para administración implica gestionar esa instancia (menos \"gestionado\").\nOpción C: Simple AD no soporta funciones avanzadas como MFA ni todos los requisitos de un AD real de Microsoft.\nOpción D: Simple AD (limitado, sin MFA) descarta la opción aunque use WorkSpace.\n\nReferencias:\nhttps://docs.aws.amazon.com/directoryservice/latest/admin-guide/directory_microsoft_ad.html\nhttps://docs.aws.amazon.com/directoryservice/latest/admin-guide/ms_ad_mfa.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30327,
    "questionNumber": 327,
    "question": "A company wants to migrate its on-premises application to AWS. The database for the application stores structured product data and temporary user session data. The company needs to decouple the product data from the user session data. The company also needs to implement replication in another AWS Region for disaster recovery. Which solution will meet these requirements with the HIGHEST performance?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon RDS DB instance with separate schemas to host the product data and the user session data. Configure a read replica for the DB instance in another Region.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an Amazon RDS DB instance to host the product data. Configure a read replica for the DB instance in another Region. Create a global datastore in Amazon ElastiCache for Memcached to host the user session data.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create two Amazon DynamoDB global tables. Use one global table to host the product data. Use the other global table to host the user session data. Use DynamoDB Accelerator (DAX) for caching.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an Amazon RDS DB instance to host the product data. Configure a read replica for the DB instance in another Region. Create an Amazon DynamoDB global table to host the user session data.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar app que guarda datos de producto (estructurados) y datos de sesión temporales; hay que DESACOPLAR ambos y replicar a otra Región para DR con el MÁS ALTO rendimiento.\n\nOpción C (Correcta): dos DynamoDB global tables (una para producto, otra para sesión) desacoplan ambos conjuntos, dan replicación multi-Región gestionada para DR y DAX aporta caché en memoria de baja latencia (máximo rendimiento).\nOpción A: RDS con esquemas separados no desacopla realmente ambos datos ni ofrece el rendimiento/escala de DynamoDB+DAX; la read replica es solo lectura.\nOpción B: ElastiCache for Memcached no tiene \"global datastore\" (eso es Redis) y como almacén de sesión no persiste ni replica bien.\nOpción D: mezcla RDS + una única DynamoDB global table; el desacople es parcial y el rendimiento de lectura es inferior a dos tablas con DAX.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30328,
    "questionNumber": 328,
    "question": "A company orchestrates a multi-account structure on AWS by using AWS Control Tower. The company is using AWS Organizations, AWS Config, and AWS Trusted Advisor. The company has a specific OU for development accounts that developers use to experiment on AWS. The company has hundreds of developers, and each developer has an individual development account. The company wants to optimize costs in these development accounts. Amazon EC2 instances and Amazon RDS instances in these accounts must be burstable. The company wants to disallow the use of other services that are not relevant. What should a solutions architect recommend to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a custom SCP in AWS Organizations to allow the deployment of only burstable instances and to disallow services that are not relevant. Apply the SCP to the development OU.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a custom detective control (guardrail) in AWS Control Tower. Configure the control (guardrail) to allow the deployment of only burstable instances and to disallow services that are not relevant. Apply the control (guardrail) to the development OU.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a custom preventive control (guardrail) in AWS Control Tower. Configure the control (guardrail) to allow the deployment of only burstable instances and to disallow services that are not relevant. Apply the control (guardrail) to the development OU.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Config rule in the AWS Control Tower account. Configure the AWS Config rule to allow the deployment of only burstable instances and to disallow services that are not relevant. Deploy the AWS Config rule to the development OU by using AWS CloudFormation StackSets.",
        "isCorrect": false
      }
    ],
    "comments": "Cuentas de desarrollo bajo Control Tower/Organizations donde hay que PERMITIR solo instancias burstable (EC2/RDS) y PROHIBIR servicios no relevantes, optimizando coste.\n\nOpción A (Correcta): una SCP personalizada en Organizations aplicada a la OU de desarrollo puede permitir solo el lanzamiento de tipos de instancia burstable (condición sobre ec2:InstanceType) y denegar acciones de servicios no relevantes; es el control preventivo centralizado nativo.\nOpción C: Control Tower NO permite crear controles/guardrails preventivos personalizados con esa granularidad (los preventivos son gestionados/predefinidos, implementados vía SCP); por eso la SCP directa es la respuesta.\nOpción B: un guardrail detective solo detecta a posteriori, no impide el lanzamiento.\nOpción D: una regla de Config detecta incumplimiento pero no impide (no es preventiva) y no puede desplegarse \"a una OU\" directamente de ese modo.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html\nhttps://docs.aws.amazon.com/controltower/latest/userguide/controls.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30329,
    "questionNumber": 329,
    "question": "A financial services company runs a complex, multi-tier application on Amazon EC2 instances and AWS Lambda functions. The application stores temporary data in Amazon S3. The S3 objects are valid for only 45 minutes and are deleted after 24 hours. The company deploys each version of the application by launching an AWS CloudFormation stack. The stack creates all resources that are required to run the application. When the company deploys and validates a new application version, the company deletes the CloudFormation stack of the old version. The company recently tried to delete the CloudFormation stack of an old application version, but the operation failed. An analysis shows that CloudFormation failed to delete an existing S3 bucket. A solutions architect needs to resolve this issue without making major changes to the application's architecture. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Implement a Lambda function that deletes all files from a given S3 bucket. Integrate this Lambda function as a custom resource into the CloudFormation stack. Ensure that the custom resource has a DependsOn attribute that points to the S3 bucket's resource.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Modify the CloudFormation template to provision an Amazon Elastic File System (Amazon EFS) file system to store the temporary files there instead of in Amazon S3. Configure the Lambda functions to run in the same VPC as the file system. Mount the file system to the EC2 instances and Lambda functions.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Modify the CloudF ormation stack to create an S3 Lifecycle rule that expires all objects 45 minutes after creation. Add a DependsOn attribute that points to the S3 bucket’s resource.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Modify the CloudFormation stack to attach a DeletionPolicy attribute with a value of Delete to the S3 bucket.",
        "isCorrect": false
      }
    ],
    "comments": "CloudFormation falla al borrar el stack porque no puede eliminar un bucket S3 que aún tiene objetos; hay que resolverlo SIN cambios mayores en la arquitectura.\n\nOpción A (Correcta): un custom resource (Lambda) que vacía el bucket, con DependsOn hacia el bucket, garantiza que al eliminar el stack primero se borren los objetos y luego el bucket, permitiendo la eliminación limpia.\nOpción B: migrar de S3 a EFS es un cambio arquitectónico mayor; no procede.\nOpción C: una regla de ciclo de vida a 45 min expira objetos, pero no garantiza que el bucket esté vacío en el instante del delete del stack (objetos recién creados pueden seguir).\nOpción D: DeletionPolicy=Delete es el comportamiento por defecto y NO borra un bucket que contiene objetos; no resuelve el fallo.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lambda-function.html\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30330,
    "questionNumber": 330,
    "question": "A company has developed a mobile game. The backend for the game runs on several virtual machines located in an on-premises data center. The business logic is exposed using a REST API with multiple functions. Player session data is stored in central file storage. Backend services use different API keys for throttling and to distinguish between live and test traffic. The load on the game backend varies throughout the day. During peak hours, the server capacity is not sufficient. There are also latency issues when fetching player session data. Management has asked a solutions architect to present a cloud architecture that can handle the game’s varying load and provide low-latency data access. The API model should not be changed. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Implement the REST API using a Network Load Balancer (NLB). Run the business logic on an Amazon EC2 instance behind the NLB. Store player session data in Amazon Aurora Serverless.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Implement the REST API using an Application Load Balancer (ALB). Run the business logic in AWS Lambda. Store player session data in Amazon DynamoDB with on-demand capacity.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Implement the REST API using Amazon API Gateway. Run the business logic in AWS Lambda. Store player session data in Amazon DynamoDB with on-demand capacity.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Implement the REST API using AWS AppSync. Run the business logic in AWS Lambda. Store player session data in Amazon Aurora Serverless.",
        "isCorrect": false
      }
    ],
    "comments": "Backend de juego móvil (REST con API keys para throttling y separar tráfico live/test) con carga variable y latencia al leer datos de sesión; hay que llevarlo a la nube SIN cambiar el modelo de API y con baja latencia de datos.\n\nOpción C (Correcta): API Gateway reproduce el modelo REST y ofrece API keys/usage plans para throttling y separación live/test; Lambda escala automáticamente con la carga variable; y DynamoDB on-demand da baja latencia y escalado sin gestión.\nOpción A: NLB+EC2 no aporta API keys nativas ni escalado sin servidor; Aurora Serverless para sesiones no da la latencia de DynamoDB.\nOpción B: ALB+Lambda funciona pero el ALB no ofrece las API keys/usage plans nativas que exige el modelo de API existente.\nOpción D: AppSync es GraphQL, cambiaría el modelo de API REST; descartado.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30331,
    "questionNumber": 331,
    "question": "A company is migrating an application to the AWS Cloud. The application runs in an on-premises data center and writes thousands of images into a mounted NFS file system each night. After the company migrates the application, the company will host the application on an Amazon EC2 instance with a mounted Amazon Elastic File System (Amazon EFS) file system. The company has established an AWS Direct Connect connection to AWS. Before the migration cutover, a solutions architect must build a process that will replicate the newly created on-premises images to the EFS file system. What is the MOST operationally efficient way to replicate the images?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure a periodic process to run the aws s3 sync command from the on-premises file system to Amazon S3. Configure an AWS Lambda function to process event notifications from Amazon S3 and copy the images from Amazon S3 to the EFS file system.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy an AWS Storage Gateway file gateway with an NFS mount point. Mount the file gateway file system on the on-premises server. Configure a process to periodically copy the images to the mount point.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy an AWS DataSync agent to an on-premises server that has access to the NFS file system. Send data over the Direct Connect connection to an S3 bucket by using a public VIF. Configure an AWS Lambda function to process event notifications from Amazon S3 and copy the images from Amazon S3 to the EFS file system.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy an AWS DataSync agent to an on-premises server that has access to the NFS file system. Send data over the Direct Connect connection to an AWS PrivateLink interface VPC endpoint for Amazon EFS by using a private VIF. Configure a DataSync scheduled task to send the images to the EFS file system every 24 hours.",
        "isCorrect": true
      }
    ],
    "comments": "Replicar imágenes recién creadas del NFS on-premises a un EFS en AWS antes del cutover, sobre Direct Connect, de la forma MÁS eficiente operativamente.\n\nOpción D (Correcta): un agente DataSync en on-premises que envía datos por Direct Connect a un interface VPC endpoint (PrivateLink) de EFS usando una private VIF, con una tarea programada, transfiere directamente NFS→EFS de forma privada y gestionada, sin pasos intermedios por S3.\nOpción A: sincronizar a S3 y luego copiar a EFS con Lambda añade una capa intermedia y lógica de eventos innecesaria.\nOpción B: Storage Gateway file gateway está pensado para respaldar a S3, no para copiar directamente a EFS; más piezas.\nOpción C: usar DataSync hacia S3 (public VIF) y luego Lambda a EFS es más complejo que ir directo a EFS por endpoint privado.\n\nReferencias:\nhttps://docs.aws.amazon.com/datasync/latest/userguide/create-efs-location.html\nhttps://docs.aws.amazon.com/datasync/latest/userguide/datasync-network.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30332,
    "questionNumber": 332,
    "question": "A company recently migrated a web application from an on-premises data center to the AWS Cloud. The web application infrastructure consists of an Amazon CloudFront distribution that routes to an Application Load Balancer (ALB), with Amazon Elastic Container Service (Amazon ECS) to process requests. A recent security audit revealed that the web application is accessible by using both CloudFront and ALB endpoints. However, the company requires that the web application must be accessible only by using the CloudFront endpoint. Which solution will meet this requirement with the LEAST amount of effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new security group and attach it to the CloudFront distribution. Update the ALB security group ingress to allow access only from the CloudFront security group.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Update ALB security group ingress to allow access only from the com.amazonaws.global.cloudfront.origin-facing CloudFront managed prefix list.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a com.amazonaws.region.elasticloadbalancing VPC interface endpoint for Elastic Load Balancing. Update the ALB scheme from internet-facing to internal.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Extract CloudFront IPs from the AWS provided ip-ranges.json document. Update ALB security group ingress to allow access only from CloudFront IPs.",
        "isCorrect": false
      }
    ],
    "comments": "App tras CloudFront→ALB→ECS que es accesible tanto por CloudFront como directamente por el ALB; se requiere que SOLO sea accesible vía CloudFront con el MENOR esfuerzo.\n\nOpción B (Correcta): actualizar el security group del ALB para permitir ingress solo desde la managed prefix list com.amazonaws.global.cloudfront.origin-facing restringe el acceso a las IPs de origen de CloudFront de forma nativa y automantenida.\nOpción A: no se puede adjuntar un security group a una distribución de CloudFront ni referenciarlo desde el SG del ALB; inválido.\nOpción C: un interface endpoint de ELB y cambiar el ALB a interno es un cambio de arquitectura mayor.\nOpción D: extraer IPs de ip-ranges.json y mantenerlas a mano en el SG es frágil y de alto mantenimiento frente a la prefix list gestionada.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/LocationsOfEdgeServers.html\nhttps://docs.aws.amazon.com/vpc/latest/userguide/working-with-aws-managed-prefix-lists.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30333,
    "questionNumber": 333,
    "question": "A company hosts a community forum site using an Application Load Balancer (ALB) and a Docker application hosted in an Amazon ECS cluster. The site data is stored in Amazon RDS for MySQL and the container image is stored in ECR. The company needs to provide their customers with a disaster recovery SLA with an RTO of no more than 24 hours and RPO of no more than 8 hours. Which of the following solutions is the MOST cost-effective way to meet the requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS CloudFormation to deploy identical ALB, EC2, ECS and RDS resources in two regions. Schedule RDS snapshots every 8 hours. Use RDS multi-region replication to update the secondary region's copy of the database. In the event of a failure, restore from the latest snapshot, and use an Amazon Route 53 DNS failover policy to automatically redirect customers to the ALB in the secondary region.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Store the Docker image in ECR in two regions. Schedule RDS snapshots every 8 hours with snapshots copied to the secondary region. In the event of a failure, use AWS CloudFormation to deploy the ALB, EC2, ECS and RDS resources in the secondary region, restore from the latest snapshot, and update the DNS record to point to the ALB in the secondary region.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS CloudFormation to deploy identical ALB, EC2, ECS, and RDS resources in a secondary region. Schedule hourly RDS MySQL backups to Amazon S3 and use cross-region replication to replicate data to a bucket in the secondary region. In the event of a failure, import the latest Docker image to Amazon ECR in the secondary region, deploy to the EC2 instance, restore the latest MySQL backup, and update the DNS record to point to the ALB in the secondary region.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy a pilot light environment in a secondary region with an ALB and a minimal resource EC2 deployment for Docker in an AWS Auto Scaling group with a scaling policy to increase instance size and number of nodes. Create a cross-region read replica of the RDS data. In the event of a failure, promote the replica to primary, and update the DNS record to point to the ALB in the secondary region.",
        "isCorrect": false
      }
    ],
    "comments": "DR para foro (ALB + ECS con imagen en ECR + RDS MySQL) con RTO ≤ 24 h y RPO ≤ 8 h de la forma MÁS RENTABLE.\n\nOpción B (Correcta): estrategia backup & restore: imagen en ECR en dos Regiones y snapshots de RDS cada 8 h copiados a la Región secundaria (cumple RPO 8 h); ante fallo, CloudFormation despliega toda la infra y restaura el snapshot dentro de las 24 h (cumple RTO) sin pagar recursos en caliente. Es la más barata.\nOpción A: mantener ALB/EC2/ECS/RDS idénticos corriendo en dos Regiones (además de \"multi-region replication\" mal definida en RDS) es caro (recursos activos ociosos).\nOpción C: backups horarios a S3 + réplica cross-region es más frecuente de lo necesario y mantiene recursos desplegados; menos rentable.\nOpción D: pilot light con read replica cross-Region mantiene infra mínima activa; más caro que backup&restore y no necesario para RTO de 24 h.\n\nReferencias:\nhttps://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CopySnapshot.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30334,
    "questionNumber": 334,
    "question": "A company is migrating its infrastructure to the AWS Cloud. The company must comply with a variety of regulatory standards for different projects. The company needs a multi-account environment. A solutions architect needs to prepare the baseline infrastructure. The solution must provide a consistent baseline of management and security, but it must allow flexibility for different compliance requirements within various AWS accounts. The solution also needs to integrate with the existing on-premises Active Directory Federation Services (AD FS) server. Which solution meets these requirements with the LEAST amount of operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an organization in AWS Organizations. Create a single SCP for least privilege access across all accounts. Create a single OU for all accounts. Configure an IAM identity provider for federation with the on-premises AD FS server. Configure a central logging account with a defined process for log generating services to send log events to the central account. Enable AWS Config in the central account with conformance packs for all accounts.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an organization in AWS Organizations. Enable AWS Control Tower on the organization. Review included controls (guardrails) for SCPs. Check AWS Config for areas that require additions. Add OUs as necessary. Connect AWS IAM Identity Center (AWS Single Sign-On) to the on-premises AD FS server.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an organization in AWS Organizations. Create SCPs for least privilege access. Create an OU structure, and use it to group AWS accounts. Connect AWS IAM Identity Center (AWS Single Sign-On) to the on-premises AD FS server. Configure a central logging account with a defined process for log generating services to send log events to the central account. Enable AWS Config in the central account with aggregators and conformance packs.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an organization in AWS Organizations. Enable AWS Control Tower on the organization. Review included controls (guardrails) for SCPs. Check AWS Config for areas that require additions. Configure an IAM identity provider for federation with the on-premises AD FS server.",
        "isCorrect": false
      }
    ],
    "comments": "Baseline multi-cuenta con gestión y seguridad consistentes pero flexible por cumplimiento, integrado con AD FS on-premises, con el MENOR overhead operativo.\n\nOpción B (Correcta): Organizations + Control Tower da el baseline gestionado (guardrails/SCPs, Config, OUs), permite añadir OUs para distintos cumplimientos y conecta IAM Identity Center al AD FS on-premises; mínimo overhead al ser gestionado.\nOpción A: una única OU y una única SCP para todo no da flexibilidad por cumplimiento y montar logging/Config a mano es más trabajo.\nOpción C: construir SCPs, OUs y logging central manualmente es más overhead que Control Tower.\nOpción D: Control Tower es correcto, pero usar un IAM identity provider (federación SAML manual) en lugar de IAM Identity Center añade gestión frente a la integración nativa de Identity Center.\n\nReferencias:\nhttps://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html\nhttps://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-ad.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30335,
    "questionNumber": 335,
    "question": "An online magazine will launch its latest edition this month. This edition will be the first to be distributed globally. The magazine's dynamic website currently uses an Application Load Balancer in front of the web tier, a fleet of Amazon EC2 instances for web and application servers, and Amazon Aurora MySQL. Portions of the website include static content and almost all traffic is read-only. The magazine is expecting a significant spike in internet traffic when the new edition is launched. Optimal performance is a top priority for the week following the launch. Which combination of steps should a solutions architect take to reduce system response times for a global audience? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use logical cross-Region replication to replicate the Aurora MySQL database to a secondary Region. Replace the web servers with Amazon S3. Deploy S3 buckets in cross-Region replication mode.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Ensure the web and application tiers are each in Auto Scaling groups. Introduce an AWS Direct Connect connection. Deploy the web and application tiers in Regions across the world.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Migrate the database from Amazon Aurora to Amazon RDS for MySQL. Ensure all three of the application tiers – web, application, and database – are in private subnets.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use an Aurora global database for physical cross-Region replication. Use Amazon S3 with cross-Region replication for static content and resources. Deploy the web and application tiers in Regions across the world.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Introduce Amazon Route 53 with latency-based routing and Amazon CloudFront distributions. Ensure the web and application tiers are each in Auto Scaling groups.",
        "isCorrect": true
      }
    ],
    "comments": "Web dinámica global (ALB + EC2 + Aurora MySQL) casi todo de lectura, con pico de tráfico previsto; hay que REDUCIR tiempos de respuesta para audiencia global (elegir dos).\n\nOpción D (Correcta): Aurora global database replica físicamente cross-Region (lecturas locales de baja latencia), S3 con CRR sirve el contenido estático cerca del usuario y desplegar web/app en varias Regiones acerca el cómputo.\nOpción E (Correcta): Route 53 latency-based routing + CloudFront cachea/aproxima contenido y enruta por menor latencia; ASG garantiza escalado ante el pico.\nOpción A: sustituir los servidores web por S3 no sirve una web dinámica; incorrecto.\nOpción B: Direct Connect es para conectividad on-premises, no reduce latencia de usuarios globales de internet.\nOpción C: migrar de Aurora a RDS MySQL y meter todo en subredes privadas no mejora la latencia global.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30336,
    "questionNumber": 336,
    "question": "An online gaming company needs to optimize the cost of its workloads on AWS. The company uses a dedicated account to host the production environment for its online gaming application and an analytics application. Amazon EC2 instances host the gaming application and must always be available. The EC2 instances run all year. The analytics application uses data that is stored in Amazon S3. The analytics application can be interrupted and resumed without issue. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Purchase an EC2 Instance Savings Plan for the online gaming application instances. Use On-Demand Instances for the analytics application.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Purchase an EC2 Instance Savings Plan for the online gaming application instances. Use Spot Instances for the analytics application.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use Spot Instances for the online gaming application and the analytics application. Set up a catalog in AWS Service Catalog to provision services at a discount.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use On-Demand Instances for the online gaming application. Use Spot Instances for the analytics application. Set up a catalog in AWS Service Catalog to provision services at a discount.",
        "isCorrect": false
      }
    ],
    "comments": "Optimizar coste: la app de juego (EC2 todo el año, siempre disponible) y una app de analítica (datos en S3, interrumpible/reanudable) de la forma MÁS RENTABLE.\n\nOpción B (Correcta): EC2 Instance Savings Plan para el juego (uso constante todo el año, máximo descuento comprometido) y Spot para la analítica (interrumpible), que es la opción más barata para cargas tolerantes a interrupción.\nOpción A: usar On-Demand para la analítica interrumpible desperdicia el ahorro que darían las Spot.\nOpción C: Spot para el juego que \"debe estar siempre disponible\" es inaceptable (las Spot pueden interrumpirse); Service Catalog no da descuentos.\nOpción D: On-Demand para el juego pierde el descuento del Savings Plan sobre una carga constante; menos rentable.\n\nReferencias:\nhttps://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30337,
    "questionNumber": 337,
    "question": "A company runs applications in hundreds of production AWS accounts. The company uses AWS Organizations with all features enabled and has a centralized backup operation that uses AWS Backup. The company is concerned about ransomware attacks. To address this concern, the company has created a new policy that all backups must be resilient to breaches of privileged-user credentials in any production account. Which combination of steps will meet this new requirement? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Implement cross-account backup with AWS Backup vaults in designated non-production accounts.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Add an SCP that restricts the modification of AWS Backup vaults.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Implement AWS Backup Vault Lock in compliance mode. C. Implement least privilege access for the IAM service role that is assigned to AWS Backup.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure the backup frequency, lifecycle, and retention period to ensure that at least one backup always exists in the cold tier.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Configure AWS Backup to write all backups to an Amazon S3 bucket in a designated non-production account. Ensure that the S3 bucket has S3 Object Lock enabled.",
        "isCorrect": false
      }
    ],
    "comments": "Cientos de cuentas con AWS Backup centralizado; los backups deben ser RESILIENTES ante compromiso de credenciales privilegiadas (ransomware) en cualquier cuenta de producción (elegir tres).\n\nOpción A (Correcta): copia cross-account de los backups a vaults en cuentas no productivas dedicadas aísla las copias del blast radius de una cuenta de producción comprometida.\nOpción B (Correcta): una SCP que restrinja la modificación de los vaults de AWS Backup impide que un usuario privilegiado altere/borre los vaults.\nOpción C (Correcta): AWS Backup Vault Lock en modo compliance hace los backups inmutables e imborrables incluso por la raíz durante la retención, más el mínimo privilegio en el rol de Backup.\nOpción D: definir tier frío/retención no protege frente a borrado por credenciales comprometidas.\nOpción E: escribir a un bucket S3 con Object Lock es una alternativa parcial, pero la resiliencia nativa la dan cross-account + Vault Lock + SCP; es la combinación esperada.\n\nReferencias:\nhttps://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html\nhttps://docs.aws.amazon.com/aws-backup/latest/devguide/create-cross-account-backup.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30338,
    "questionNumber": 338,
    "question": "A company needs to aggregate Amazon CloudWatch logs from its AWS accounts into one central logging account. The collected logs must remain in the AWS Region of creation. The central logging account will then process the logs, normalize the logs into standard output format, and stream the output logs to a security tool for more processing. A solutions architect must design a solution that can handle a large volume of logging data that needs to be ingested. Less logging will occur outside normal business hours than during normal business hours. The logging solution must scale with the anticipated load. The solutions architect has decided to use an AWS Control Tower design to handle the multi-account logging process. Which combination of steps should the solutions architect take to meet the requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a destination Amazon Kinesis data stream in the central logging account.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a destination Amazon Simple Queue Service (Amazon SQS) queue in the central logging account.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an IAM role that grants Amazon CloudWatch Logs the permission to add data to the Amazon Kinesis data stream. Create a trust policy. Specify the trust policy in the IAM role. In each member account, create a subscription filter for each log group to send data to the Kinesis data stream.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an IAM role that grants Amazon CloudWatch Logs the permission to add data to the Amazon Simple Queue Service (Amazon SQS) queue. Create a trust policy. Specify the trust policy in the IAM role. In each member account, create a single subscription filter for all log groups to send data to the SQS queue.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Create an AWS Lambda function. Program the Lambda function to normalize the logs in the central logging account and to write the logs to the security tool.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Create an AWS Lambda function. Program the Lambda function to normalize the logs in the member accounts and to write the logs to the security tool.",
        "isCorrect": false
      }
    ],
    "comments": "Agregar logs de CloudWatch de muchas cuentas a una cuenta central (manteniéndolos en su Región de origen), normalizarlos y enviarlos a una herramienta de seguridad, con una solución que ESCALE con el volumen variable (elegir tres).\n\nOpción A (Correcta): un Kinesis Data Stream destino en la cuenta central es el destino escalable para ingesta de gran volumen de logs.\nOpción C (Correcta): un rol IAM que permita a CloudWatch Logs escribir en el stream, con su trust policy, y subscription filters por log group en cada cuenta miembro envían los logs al stream de forma nativa.\nOpción E (Correcta): una Lambda en la cuenta central normaliza los logs y los escribe a la herramienta de seguridad (procesamiento centralizado).\nOpción B/D: SQS no es el patrón de destino de subscription filters de CloudWatch Logs (que van a Kinesis/Firehose/Lambda) y no escala igual para este streaming.\nOpción F: normalizar en las cuentas miembro dispersa el procesamiento y contradice el diseño centralizado.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CrossAccountSubscriptions.html\nhttps://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30339,
    "questionNumber": 339,
    "question": "A company is migrating a legacy application from an on-premises data center to AWS. The application consists of a single application server and a Microsoft SQL Server database server. Each server is deployed on a VMware VM that consumes 500 TB of data across multiple attached volumes. The company has established a 10 Gbps AWS Direct Connect connection from the closest AWS Region to its on-premises data center. The Direct Connect connection is not currently in use by other services. Which combination of steps should a solutions architect take to migrate the application with the LEAST amount of downtime? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use an AWS Server Migration Service (AWS SMS) replication job to migrate the database server VM to AWS.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use VM Import/Export to import the application server VM.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Export the VM images to an AWS Snowball Edge Storage Optimized device.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use an AWS Server Migration Service (AWS SMS) replication job to migrate the application server VM to AWS.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Use an AWS Database Migration Service (AWS DMS) replication instance to migrate the database to an Amazon RDS DB instance.",
        "isCorrect": true
      }
    ],
    "comments": "Migrar app (un servidor de aplicación en VMware + SQL Server con 500 TB) por un Direct Connect de 10 Gbps libre, con el MENOR downtime (elegir dos).\n\nOpción D (Correcta): AWS SMS (Server Migration Service) replica de forma incremental la VM del servidor de aplicación, permitiendo un cutover con mínimo downtime.\nOpción E (Correcta): AWS DMS migra la base de datos SQL Server a RDS con carga continua (CDC), minimizando el tiempo de parada de la BD.\nOpción A: usar SMS para el \"servidor de base de datos\" no es la mejor vía; para BD se usa DMS.\nOpción B: VM Import/Export importa imágenes puntuales (no replicación incremental continua), mayor downtime.\nOpción C: exportar a Snowball para 500 TB con un DC de 10 Gbps disponible añade logística y downtime; el DC ya alcanza para replicar.\n\nReferencias:\nhttps://docs.aws.amazon.com/server-migration-service/latest/userguide/server-migration.html\nhttps://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.SQLServer.html",
    "category": "Migración y Modernización",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30340,
    "questionNumber": 340,
    "question": "A company operates a fleet of servers on premises and operates a fleet of Amazon EC2 instances in its organization in AWS Organizations. The company's AWS accounts contain hundreds of VPCs. The company wants to connect its AWS accounts to its on-premises network. AWS Site-to-Site VPN connections are already established to a single AWS account. The company wants to control which VPCs can communicate with other VPCs. Which combination of steps will achieve this level of control with the LEAST operational effort? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a transit gateway in an AWS account. Share the transit gateway across accounts by using AWS Resource Access Manager (AWS RAM).",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure attachments to all VPCs and VPNs.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Setup transit gateway route tables. Associate the VPCs and VPNs with the route tables.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure VPC peering between the VPCs.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Configure attachments between the VPCs and VPNs.",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Setup route tables on the VPCs and VPNs.",
        "isCorrect": false
      }
    ],
    "comments": "Conectar cientos de VPCs de varias cuentas (Organizations) con la red on-premises (ya hay VPN a una cuenta) y CONTROLAR qué VPCs se comunican entre sí con el MENOR esfuerzo operativo (elegir tres).\n\nOpción A (Correcta): un transit gateway compartido entre cuentas vía AWS RAM centraliza la conectividad hub-and-spoke sin mallas de peering.\nOpción B (Correcta): crear attachments a todas las VPCs y VPNs conecta cada red al TGW.\nOpción C (Correcta): configurar TGW route tables y asociar VPCs/VPNs a ellas permite segmentar y controlar exactamente qué redes se comunican.\nOpción D: VPC peering entre cientos de VPCs es una malla inmanejable (n²); alto esfuerzo.\nOpción E: \"attachments entre VPCs y VPNs\" no es cómo funciona el TGW (los attachments son al TGW).\nOpción F: gestionar el control de comunicación en las route tables de cada VPC dispersa la configuración; el control se hace en las route tables del TGW.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html\nhttps://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30341,
    "questionNumber": 341,
    "question": "A company needs to optimize the cost of its application on AWS. The application uses AWS Lambda functions and Amazon Elastic Container Service (Amazon ECS) containers that run on AWS Fargate. The application is write-heavy and stores data in an Amazon Aurora MySQL database. The load on the application is not consistent. The application experiences long periods of no usage, followed by sudden and significant increases and decreases in traffic. The database runs on a memory optimized DB instance that cannot handle the load. A solutions architect must design a solution that can scale to handle the changes in traffic. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Add additional read replicas to the database. Purchase Instance Savings Plans and RDS Reserved Instances.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Migrate the database to an Aurora DB cluster that has multiple writer instances. Purchase Instance Savings Plans.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Migrate the database to an Aurora global database. Purchase Compute Savings Plans and RDS Reserved instances.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Migrate the database to Aurora Serverless v1. Purchase Compute Savings Plans.",
        "isCorrect": true
      }
    ],
    "comments": "App con Lambda + ECS Fargate, write-heavy sobre Aurora MySQL, con carga intermitente (largos periodos sin uso y picos bruscos); la BD memory-optimized no aguanta. Se busca escalar con la carga de la forma MÁS RENTABLE.\n\nOpción D (Correcta): Aurora Serverless v1 escala/pausa la capacidad automáticamente según la carga intermitente (paga por lo que usa), ideal para periodos sin uso; Compute Savings Plans cubren Lambda y Fargate.\nOpción A: añadir read replicas no ayuda a una carga write-heavy y los RI/Instance SP pagan capacidad fija durante los periodos ociosos.\nOpción B: un clúster Aurora con múltiples writers es para escalado de escritura concurrente extrema, no para carga intermitente; sigue pagando instancias fijas.\nOpción C: Aurora global database es para multi-Región/DR, no resuelve el escalado por carga intermitente y mantiene instancias.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless.html\nhttps://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30342,
    "questionNumber": 342,
    "question": "A company migrated an application to the AWS Cloud. The application runs on two Amazon EC2 instances behind an Application Load Balancer (ALB). Application data is stored in a MySQL database that runs on an additional EC2 instance. The application's use of the database is read-heavy. The application loads static content from Amazon Elastic Block Store (Amazon EBS) volumes that are attached to each EC2 instance. The static content is updated frequently and must be copied to each EBS volume. The load on the application changes throughout the day. During peak hours, the application cannot handle all the incoming requests. Trace data shows that the database cannot handle the read load during peak hours. Which solution will improve the reliability of the application?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate the application to a set of AWS Lambda functions. Set the Lambda functions as targets for the ALB. Create a new single EBS volume for the static content. Configure the Lambda functions to read from the new EBS volume. Migrate the database to an Amazon RDS for MySQL Multi-AZ DB cluster.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Migrate the application to a set of AWS Step Functions state machines. Set the state machines as targets for the ALCreate an Amazon Elastic File System (Amazon EFS) file system for the static content. Configure the state machines to read from the EFS file system. Migrate the database to Amazon Aurora MySQL Serverless v2 with a reader DB instance.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Containerize the application. Migrate the application to an Amazon Elastic Container Service (Amazon ECS) cluster. Use the AWS Fargate launch type for the tasks that host the application. Create a new single EBS volume for the static content. Mount the new EBS volume on the ECS cluster. Configure AWS Application Auto Scaling on the ECS cluster. Set the ECS service as a target for the ALB. Migrate the database to an Amazon RDS for MySQL Multi-AZ DB cluster.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Containerize the application. Migrate the application to an Amazon Elastic Container Service (Amazon ECS) cluster. Use the AWS Fargate launch type for the tasks that host the application. Create an Amazon Elastic File System (Amazon EFS) file system for the static content. Mount the EFS file system to each container. Configure AWS Application Auto Scaling on the ECS cluster. Set the ECS service as a target for the ALB. Migrate the database to Amazon Aurora MySQL Serverless v2 with a reader DB instance.",
        "isCorrect": true
      }
    ],
    "comments": "App en 2 EC2 tras ALB, MySQL en otra EC2 (read-heavy), contenido estático en EBS por instancia (se actualiza a menudo y hay que copiarlo a cada volumen), con picos que saturan la BD en lectura. Mejorar la FIABILIDAD.\n\nOpción D (Correcta): contenerizar en ECS Fargate con Application Auto Scaling elimina la gestión de servidores y escala el cómputo; EFS compartido entre contenedores evita copiar el estático a cada volumen; migrar la BD (a Aurora/RDS con lectores) resuelve la lectura. Fargate + EFS + escalado da la mayor fiabilidad.\nOpción A: Lambda como target del ALB para toda la app y un EBS único (no montable por varias Lambdas) no es viable para contenido compartido.\nOpción B: Step Functions no son destinos de un ALB para servir una app web; inapropiado.\nOpción C: un EBS único montado \"en el clúster ECS\" no se comparte entre tareas Fargate (EBS es de una instancia/tarea); EFS es la opción correcta, por eso D supera a C.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/efs-volumes.html\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30343,
    "questionNumber": 343,
    "question": "A solutions architect wants to make sure that only AWS users or roles with suitable permissions can access a new Amazon API Gateway endpoint. The solutions architect wants an end-to-end view of each request to analyze the latency of the request and create service maps. How can the solutions architect design the API Gateway access control and perform request inspections?",
    "choices": [
      {
        "letter": "A",
        "text": "For the API Gateway method, set the authorization to AWS_IAM. Then, give the IAM user or role execute-api:Invoke permission on the REST API resource. Enable the API caller to sign requests with AWS Signature when accessing the endpoint. Use AWS X-Ray to trace and analyze user requests to API Gateway.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "For the API Gateway resource, set CORS to enabled and only return the company's domain in Access-Control-Allow-Origin headers. Then, give the IAM user or role execute-api:Invoke permission on the REST API resource. Use Amazon CloudWatch to trace and analyze user requests to API Gateway.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS Lambda function as the custom authorizer, ask the API client to pass the key and secret when making the call, and then use Lambda to validate the key/secret pair against the IAM system. Use AWS X-Ray to trace and analyze user requests to API Gateway.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a client certificate for API Gateway. Distribute the certificate to the AWS users and roles that need to access the endpoint. Enable the API caller to pass the client certificate when accessing the endpoint. Use Amazon CloudWatch to trace and analyze user requests to API Gateway.",
        "isCorrect": false
      }
    ],
    "comments": "Se quiere que solo usuarios/roles IAM con permisos accedan a un endpoint de API Gateway y una vista extremo a extremo de cada petición (latencia, service maps).\n\nOpción A (Correcta): autorización AWS_IAM en el método + permiso execute-api:Invoke en el recurso obliga a firmar con SigV4 (solo identidades IAM autorizadas), y AWS X-Ray traza cada petición generando service maps y análisis de latencia.\nOpción B: CORS controla orígenes de navegador, no autenticación de identidades; CloudWatch no genera service maps como X-Ray.\nOpción C: un Lambda authorizer validando key/secret contra IAM es un mecanismo custom innecesario cuando AWS_IAM lo hace nativamente.\nOpción D: los client certificates son para que el backend verifique a API Gateway, no para autorizar usuarios IAM; CloudWatch no da service maps.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/permissions.html\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-xray.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30344,
    "questionNumber": 344,
    "question": "A company is using AWS CodePipeline for the CI/CD of an application to an Amazon EC2 Auto Scaling group. All AWS resources are defined in AWS CloudFormation templates. The application artifacts are stored in an Amazon S3 bucket and deployed to the Auto Scaling group using instance user data scripts. As the application has become more complex, recent resource changes in the CloudFormation templates have caused unplanned downtime. How should a solutions architect improve the CI/CD pipeline to reduce the likelihood that changes in the templates will cause downtime?",
    "choices": [
      {
        "letter": "A",
        "text": "Adapt the deployment scripts to detect and report CloudFormation error conditions when performing deployments. Write test plans for a testing team to run in a non-production environment before approving the change for production.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Implement automated testing using AWS CodeBuild in a test environment. Use CloudFormation change sets to evaluate changes before deployment. Use AWS CodeDeploy to leverage blue/green deployment patterns to allow evaluations and the ability to revert changes, if needed.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use plugins for the integrated development environment (IDE) to check the templates for errors, and use the AWS CLI to validate that the templates are correct. Adapt the deployment code to check for error conditions and generate notifications on errors. Deploy to a test environment and run a manual test plan before approving the change for production.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS CodeDeploy and a blue/green deployment pattern with CloudFormation to replace the user data deployment scripts. Have the operators log in to running instances and go through a manual test plan to verify the application is running as expected.",
        "isCorrect": false
      }
    ],
    "comments": "CI/CD con CodePipeline a un ASG donde cambios recientes en plantillas CloudFormation han causado downtime imprevisto; hay que reducir la probabilidad de que los cambios provoquen caídas.\n\nOpción B (Correcta): pruebas automatizadas con CodeBuild en un entorno de test + change sets de CloudFormation para evaluar el impacto antes de aplicar + CodeDeploy con despliegue blue/green permite validar y revertir sin afectar producción.\nOpción A: depender de scripts que detecten errores y de un plan de test manual es reactivo y propenso a error humano.\nOpción C: validación de plantillas en el IDE/CLI y test manual no evalúa el impacto real del cambio ni permite rollback automático.\nOpción D: blue/green es bueno, pero exigir que operadores entren a las instancias y ejecuten un plan manual reintroduce el error humano; la automatización de B es superior.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html\nhttps://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30345,
    "questionNumber": 345,
    "question": "A North American company with headquarters on the East Coast is deploying a new web application running on Amazon EC2 in the us-east-1 Region. The application should dynamically scale to meet user demand and maintain resiliency. Additionally, the application must have disaster recovery capabilities in an active-passive configuration with the us-west-1 Region. Which steps should a solutions architect take after creating a VPC in the us-east-1 Region?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a VPC in the us-west-1 Region. Use inter-Region VPC peering to connect both VPCs. Deploy an Application Load Balancer (ALB) spanning multiple Availability Zones (AZs) to the VPC in the us-east-1 Region. Deploy EC2 instances across multiple AZs in each Region as part of an Auto Scaling group spanning both VPCs and served by the ALB.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy an Application Load Balancer (ALB) spanning multiple Availability Zones (AZs) to the VPC in the us-east-1 Region. Deploy EC2 instances across multiple AZs as part of an Auto Scaling group served by the ALDeploy the same solution to the us-west-1 Region. Create an Amazon Route 53 record set with a failover routing policy and health checks enabled to provide high availability across both Regions.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a VPC in the us-west-1 Region. Use inter-Region VPC peering to connect both VPCs. Deploy an Application Load Balancer (ALB) that spans both VPCs. Deploy EC2 instances across multiple Availability Zones as part of an Auto Scaling group in each VPC served by the ALB. Create an Amazon Route 53 record that points to the ALB.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy an Application Load Balancer (ALB) spanning multiple Availability Zones (AZs) to the VPC in the us-east-1 Region. Deploy EC2 instances across multiple AZs as part of an Auto Scaling group served by the ALB. Deploy the same solution to the us-west-1 Region. Create separate Amazon Route 53 records in each Region that point to the ALB in the Region. Use Route 53 health checks to provide high availability across both Regions.",
        "isCorrect": false
      }
    ],
    "comments": "Web en EC2 en us-east-1 que debe autoescalar y ser resiliente, con DR activo-pasivo en us-west-1.\n\nOpción B (Correcta): ALB multi-AZ + ASG en us-east-1, la misma solución replicada en us-west-1, y un registro de Route 53 con failover routing + health checks que conmuta a la Región secundaria cuando la primaria falla: exactamente un patrón activo-pasivo.\nOpción A: un ASG que abarque VPCs de dos Regiones no existe (un ASG es regional); inválido.\nOpción C: un ALB no puede abarcar dos VPCs en distintas Regiones; inválido.\nOpción D: registros Route 53 separados por Región sin política de failover no implementan activo-pasivo coordinado; el failover con health checks (B) es lo correcto.\n\nReferencias:\nhttps://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-benefits.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30346,
    "questionNumber": 346,
    "question": "A company has a legacy application that runs on multiple NET Framework components. The components share the same Microsoft SQL Server database and communicate with each other asynchronously by using Microsoft Message Queueing (MSMQ). The company is starting a migration to containerized .NET Core components and wants to refactor the application to run on AWS. The .NET Core components require complex orchestration. The company must have full control over networking and host configuration. The application's database model is strongly relational. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Host the INET Core components on AWS App Runner. Host the database on Amazon RDS for SQL Server. Use Amazon EventBiridge for asynchronous messaging.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Host the .NET Core components on Amazon Elastic Container Service (Amazon ECS) with the AWS Fargate launch type. Host the database on Amazon DynamoDUse Amazon Simple Notification Service (Amazon SNS) for asynchronous messaging.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Host the .NET Core components on AWS Elastic Beanstalk. Host the database on Amazon Aurora PostgreSQL Serverless v2. Use Amazon Managed Streaming for Apache Kafka (Amazon MSK) for asynchronous messaging.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Host the NET Core components on Amazon Elastic Container Service (Amazon ECS) with the Amazon EC2 launch type. Host the database on Amazon Aurora MySQL Serverless v2. Use Amazon Simple Queue Service (Amazon SQS) for asynchronous messaging.",
        "isCorrect": true
      }
    ],
    "comments": "Refactor de componentes .NET Core contenedorizados que requieren orquestación compleja y CONTROL TOTAL de red/host, con BD fuertemente relacional y mensajería asíncrona (venían de MSMQ).\n\nOpción D (Correcta): ECS con launch type EC2 da control total de red y configuración del host (a diferencia de Fargate); Aurora MySQL Serverless v2 cubre el modelo relacional con escalado; y SQS reemplaza MSMQ como cola de mensajería asíncrona.\nOpción A: App Runner no da control de red/host y EventBridge no es un reemplazo directo de colas MSMQ.\nOpción B: Fargate no da control del host; DynamoDB no es relacional; SNS es pub/sub, no una cola equivalente a MSMQ.\nOpción C: Elastic Beanstalk abstrae la infra (poco control) y Kafka (MSK) es overkill frente a SQS para colas punto a punto.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html\nhttps://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30347,
    "questionNumber": 347,
    "question": "A solutions architect has launched multiple Amazon EC2 instances in a placement group within a single Availability Zone. Because of additional load on the system, the solutions architect attempts to add new instances to the placement group. However, the solutions architect receives an insufficient capacity error. What should the solutions architect do to troubleshoot this issue?",
    "choices": [
      {
        "letter": "A",
        "text": "Use a spread placement group. Set a minimum of eight instances for each Availability Zone.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Stop and start all the instances in the placement group. Try the launch again.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a new placement group. Merge the new placement group with the original placement group.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Launch the additional instances as Dedicated Hosts in the placement groups.",
        "isCorrect": false
      }
    ],
    "comments": "Al añadir instancias a un cluster placement group en una sola AZ aparece \"insufficient capacity error\". Cómo resolverlo.\n\nOpción B (Correcta): parar y arrancar todas las instancias del placement group hace que AWS intente reubicar el grupo completo en hardware con capacidad contigua suficiente; luego se reintenta el lanzamiento. Es el procedimiento recomendado ante ese error.\nOpción A: un spread placement group cambia la estrategia (máquinas separadas) y no resuelve la necesidad de baja latencia del cluster; no es un troubleshooting del error.\nOpción C: no se pueden \"fusionar\" placement groups; inválido.\nOpción D: lanzar como Dedicated Hosts dentro del placement group no aborda la capacidad contigua del cluster group.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/troubleshooting-launch.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30348,
    "questionNumber": 348,
    "question": "A company has used infrastructure as code (IaC) to provision a set of two Amazon EC2 instances. The instances have remained the same for several years. The company's business has grown rapidly in the past few months. In response, the company’s operations team has implemented an Auto Scaling group to manage the sudden increases in traffic. Company policy requires a monthly installation of security updates on all operating systems that are running. The most recent security update required a reboot. As a result, the Auto Scaling group terminated the instances and replaced them with new, unpatched instances. Which combination of steps should a solutions architect recommend to avoid a recurrence of this issue? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Modify the Auto Scaling group by setting the Update policy to target the oldest launch configuration for replacement.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a new Auto Scaling group before the next patch maintenance. During the maintenance window, patch both groups and reboot the instances.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Elastic Load Balancer in front of the Auto Scaling group. Configure monitoring to ensure that target group health checks return healthy after the Auto Scaling group replaces the terminated instances.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create automation scripts to patch an AMI, update the launch configuration, and invoke an Auto Scaling instance refresh.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Create an Elastic Load Balancer in front of the Auto Scaling group. Configure termination protection on the instances.",
        "isCorrect": false
      }
    ],
    "comments": "Un ASG terminó y reemplazó instancias por otras SIN parchear tras un update que requería reboot; hay que evitar que se repita (elegir dos).\n\nOpción A (Correcta): configurar la política de actualización del ASG para reemplazar la launch configuration más antigua asegura que los reemplazos usen la configuración/AMI actualizada.\nOpción D (Correcta): automatizar el parcheo de una AMI, actualizar la launch configuration y lanzar un instance refresh sustituye las instancias por otras ya parcheadas de forma controlada.\nOpción B: crear un segundo ASG y parchear ambos a mano en la ventana es operativo y propenso a error.\nOpción C: un ELB con health checks no evita que las nuevas instancias salgan sin parchear.\nOpción E: la protección de terminación no resuelve el parcheo y puede interferir con el escalado normal.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-instance-refresh.html\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-configurations.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30349,
    "questionNumber": 349,
    "question": "A team of data scientists is using Amazon SageMaker instances and SageMaker APIs to train machine learning (ML) models. The SageMaker instances are deployed in a VPC that does not have access to or from the internet. Datasets for ML model training are stored in an Amazon S3 bucket. Interface VPC endpoints provide access to Amazon S3 and the SageMaker APIs. Occasionally, the data scientists require access to the Python Package Index (PyPI) repository to update Python packages that they use as part of their workflow. A solutions architect must provide access to the PyPI repository while ensuring that the SageMaker instances remain isolated from the internet. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS CodeCommit repository for each package that the data scientists need to access. Configure code synchronization between the PyPI repository and the CodeCommit repository. Create a VPC endpoint for CodeCommit.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a NAT gateway in the VPC. Configure VPC routes to allow access to the internet with a network ACL that allows access to only the PyPI repository endpoint.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a NAT instance in the VPConfigure VPC routes to allow access to the internet. Configure SageMaker notebook instance firewall rules that allow access to only the PyPI repository endpoint.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS CodeArtifact domain and repository. Add an external connection for public:pypi to the CodeArtifact repository. Configure the Python client to use the CodeArtifact repository. Create a VPC endpoint for CodeArtifact.",
        "isCorrect": true
      }
    ],
    "comments": "Instancias SageMaker en una VPC SIN internet que ocasionalmente necesitan actualizar paquetes desde PyPI, manteniendo el aislamiento de internet.\n\nOpción D (Correcta): un dominio/repositorio de AWS CodeArtifact con una external connection a public:pypi actúa de proxy gestionado a PyPI; configurando el cliente Python y un VPC endpoint para CodeArtifact, las instancias obtienen paquetes sin salir a internet.\nOpción A: CodeCommit es control de versiones de código, no un repositorio de paquetes Python; sincronizar PyPI a CodeCommit no es viable.\nOpción B: un NAT gateway da acceso a internet (rompe el requisito de aislamiento) y las NACL no filtran por endpoint de PyPI de forma fiable.\nOpción C: una NAT instance también expone a internet; contradice el aislamiento.\n\nReferencias:\nhttps://docs.aws.amazon.com/codeartifact/latest/ug/external-connection.html\nhttps://docs.aws.amazon.com/codeartifact/latest/ug/vpc-endpoints.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30350,
    "questionNumber": 350,
    "question": "A solutions architect works for a government agency that has strict disaster recovery requirements. All Amazon Elastic Block Store (Amazon EBS) snapshots are required to be saved in at least two additional AWS Regions. The agency also is required to maintain the lowest possible operational overhead. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure a policy in Amazon Data Lifecycle Manager (Amazon DLM) to run once daily to copy the EBS snapshots to the additional Regions.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use Amazon EventBridge to schedule an AWS Lambda function to copy the EBS snapshots to the additional Regions.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Setup AWS Backup to create the EBS snapshots. Configure Amazon S3 Cross-Region Replication to copy the EBS snapshots to the additional Regions.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Schedule Amazon EC2 Image Builder to run once daily to create an AMI and copy the AMI to the additional Regions.",
        "isCorrect": false
      }
    ],
    "comments": "DR estricto: todos los snapshots EBS deben copiarse al menos a 2 Regiones adicionales con el MENOR overhead operativo.\n\nOpción A (Correcta): una política de Amazon Data Lifecycle Manager (DLM) que se ejecute a diario puede crear y COPIAR automáticamente los snapshots EBS a Regiones adicionales, todo gestionado sin código.\nOpción B: EventBridge + Lambda para copiar snapshots requiere escribir y mantener código; más overhead.\nOpción C: S3 Cross-Region Replication no aplica a snapshots EBS (no son objetos S3 accesibles así); inválido.\nOpción D: Image Builder crea AMIs, no snapshots EBS puros, y es un flujo distinto al pedido.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/snapshot-lifecycle.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-cross-region-copy.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30351,
    "questionNumber": 351,
    "question": "A company has a project that is launching Amazon EC2 instances that are larger than required. The project's account cannot be part of the company's organization in AWS Organizations due to policy restrictions to keep this activity outside of corporate IT. The company wants to allow only the launch of t3.small EC2 instances by developers in the project's account. These EC2 instances must be restricted to the us-east-2 Region. What should a solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new developer account. Move all EC2 instances, users, and assets into us-east-2. Add the account to the company's organization in AWS Organizations. Enforce a tagging policy that denotes Region affinity.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an SCP that denies the launch of all EC2 instances except t3.small EC2 instances in us-east-2. Attach the SCP to the project's account.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create and purchase a t3.small EC2 Reserved Instance for each developer in us-east-2. Assign each developer a specific EC2 instance with their name as the tag.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an IAM policy than allows the launch of only t3.small EC2 instances in us-east-2. Attach the policy to the roles and groups that the developers use in the project's account.",
        "isCorrect": true
      }
    ],
    "comments": "Una cuenta de proyecto que NO puede estar en Organizations debe permitir a los desarrolladores lanzar solo instancias t3.small y solo en us-east-2.\n\nOpción D (Correcta): como la cuenta no está en Organizations, las SCP no aplican; una política IAM adjunta a los roles/grupos de los desarrolladores que permita ec2:RunInstances solo con t3.small en us-east-2 (condiciones ec2:InstanceType y aws:RequestedRegion) es el control correcto a nivel de identidad.\nOpción A: meter la cuenta en Organizations contradice la restricción de política del enunciado.\nOpción B: una SCP requiere que la cuenta esté en Organizations; no aplica aquí.\nOpción C: comprar RIs no restringe qué tipos se pueden lanzar; no es un control de permisos.\n\nReferencias:\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_ec2_region.html\nhttps://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonec2.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30352,
    "questionNumber": 352,
    "question": "A scientific company needs to process text and image data from an Amazon S3 bucket. The data is collected from several radar stations during a live, time-critical phase of a deep space mission. The radar stations upload the data to the source S3 bucket. The data is prefixed by radar station identification number. The company created a destination S3 bucket in a second account. Data must be copied from the source S3 bucket to the destination S3 bucket to meet a compliance objective. This replication occurs through the use of an S3 replication rule to cover all objects in the source S3 bucket. One specific radar station is identified as having the most accurate data. Data replication at this radar station must be monitored for completion within 30 minutes after the radar station uploads the objects to the source S3 bucket. What should a solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Setup an AWS DataSync agent to replicate the prefixed data from the source S3 bucket to the destination S3 bucket. Select to use all available bandwidth on the task, and monitor the task to ensure that itis in the TRANSFERRING status. Create an Amazon EventBridge rule to initiate an alert if this status changes.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "In the second account, create another S3 bucket to receive data from the radar station with the most accurate data. Set up a new replication rule for this new S3 bucket to separate the replication from the other radar stations. Monitor the maximum replication time to the destination. Create an Amazon EventBridge rule to initiate an alert when the time exceeds the desired threshold.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Enable Amazon S3 Transfer Acceleration on the source S3 bucket, and configure the radar station with the most accurate data to use the new endpoint. Monitor the S3 destination bucket's TotalRequestLatency metric. Create an Amazon EventBridge rule to initiate an alert if this status changes.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a new S3 replication rule on the source S3 bucket that filters for the keys that use the prefix of the radar station with the most accurate data. Enable S3 Replication Time Control (S3 RTC). Monitor the maximum replication time to the destination. Create an Amazon EventBridge rule to initiate an alert when the time exceeds the desired threshold.",
        "isCorrect": true
      }
    ],
    "comments": "Replicación S3 cross-account de todos los objetos; para UNA estación de radar concreta hay que MONITORIZAR que la replicación se complete en menos de 30 minutos tras la subida.\n\nOpción D (Correcta): una regla de replicación con filtro por el prefijo de esa estación y S3 Replication Time Control (S3 RTC) garantiza y monitoriza el tiempo de replicación (SLA de 15 min) publicando métricas; una regla de EventBridge alerta si se supera el umbral.\nOpción A: DataSync no es replicación S3 nativa entre cuentas ni ofrece SLA/métricas de tiempo de replicación por objeto.\nOpción B: crear otro bucket destino y otra regla separa el flujo pero no aporta la garantía/medición de tiempo que da S3 RTC.\nOpción C: Transfer Acceleration acelera subidas, no mide el tiempo de replicación al destino; TotalRequestLatency no es la métrica adecuada.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-time-control.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-metrics.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30353,
    "questionNumber": 353,
    "question": "A company wants to migrate its on-premises data center to the AWS Cloud. This includes thousands of virtualized Linux and Microsoft Windows servers, SAN storage, Java and PHP applications with MySQL, and Oracle databases. There are many dependent services hosted either in the same data center or externally. The technical documentation is incomplete and outdated. A solutions architect needs to understand the current environment and estimate the cloud resource costs after the migration. Which tools or services should the solutions architect use to plan the cloud migration? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "AWS Application Discovery Service",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "AWS SMS",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "AWS X-Ray",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "AWS Cloud Adoption Readiness Tool (CART)",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Amazon Inspector",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "AWS Migration Hub",
        "isCorrect": true
      }
    ],
    "comments": "Planificar la migración de un data center (miles de VMs Linux/Windows, SAN, apps Java/PHP con MySQL/Oracle, muchas dependencias) con documentación incompleta; hay que ENTENDER el entorno y ESTIMAR costes tras la migración (elegir tres).\n\nOpción A (Correcta): AWS Application Discovery Service descubre servidores, configuración, uso y dependencias del entorno on-premises.\nOpción D (Correcta): AWS Cloud Adoption Readiness Tool (CART) evalúa la preparación para la migración y ayuda a la planificación.\nOpción F (Correcta): AWS Migration Hub centraliza el seguimiento del descubrimiento y de la migración (y agrega los datos de Discovery).\nOpción B: AWS SMS es para ejecutar la migración de servidores, no para descubrir/estimar.\nOpción C: X-Ray traza aplicaciones distribuidas en AWS, no descubre el entorno on-premises.\nOpción E: Amazon Inspector evalúa vulnerabilidades, no planifica migraciones.\n\nReferencias:\nhttps://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html\nhttps://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html",
    "category": "Migración y Modernización",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30354,
    "questionNumber": 354,
    "question": "A solutions architect is reviewing an application's resilience before launch. The application runs on an Amazon EC2 instance that is deployed in a private subnet of a VPC. The EC2 instance is provisioned by an Auto Scaling group that has a minimum capacity of 1 and a maximum capacity of 1. The application stores data on an Amazon RDS for MySQL DB instance. The VPC has subnets configured in three Availability Zones and is configured with a single NAT gateway. The solutions architect needs to recommend a solution to ensure that the application will operate across multiple Availability Zones. Which solution will meet this requirement?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy an additional NAT gateway in the other Availability Zones. Update the route tables with appropriate routes. Modify the RDS for MySQL DB instance to a Multi-AZ configuration. Configure the Auto Scaling group to launch the instances across Availability Zones. Set the minimum capacity and maximum capacity of the Auto Scaling group to 3.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Replace the NAT gateway with a virtual private gateway. Replace the RDS for MySQL DB instance with an Amazon Aurora MySQL DB cluster. Configure the Auto Scaling group to launch instances across all subnets in the VPC. Set the minimum capacity and maximum capacity of the Auto Scaling group to 3.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Replace the NAT gateway with a NAT instance. Migrate the RDS for MySQL DB instance to an RDS for PostgreSQL DB instance. Launch a new EC2 instance in the other Availability Zones.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy an additional NAT gateway in the other Availability Zones. Update the route tables with appropriate routes. Modify the RDS for MySQL DB instance to turn on automatic backups and retain the backups for 7 days. Configure the Auto Scaling group to launch instances across all subnets in the VPC. Keep the minimum capacity and the maximum capacity of the Auto Scaling group at 1.",
        "isCorrect": false
      }
    ],
    "comments": "App en EC2 (ASG min=1/max=1) en subred privada con RDS MySQL, VPC con 3 AZ pero un único NAT gateway; hay que asegurar operación MULTI-AZ.\n\nOpción A (Correcta): desplegar un NAT gateway por AZ (con sus rutas) elimina el punto único de fallo de salida; RDS Multi-AZ da failover de BD; y el ASG con min/max=3 lanzando instancias en varias AZ tolera el fallo de una AZ.\nOpción B: sustituir el NAT por un virtual private gateway no da salida a internet (VGW es para VPN); rompe la conectividad.\nOpción C: NAT instance es un punto único gestionado a mano y migrar a PostgreSQL no aporta HA; lanzar EC2 sueltas no es multi-AZ gestionado.\nOpción D: un único NAT gateway sigue siendo SPOF y mantener min/max=1 no permite operar en varias AZ simultáneamente.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30355,
    "questionNumber": 355,
    "question": "A company is planning to migrate its on-premises transaction-processing application to AWS. The application runs inside Docker containers that are hosted on VMs in the company's data center. The Docker containers have shared storage where the application records transaction data. The transactions are time sensitive. The volume of transactions inside the application is unpredictable. The company must implement a low-latency storage solution that will automatically scale throughput to meet increased demand. The company cannot develop the application further and cannot continue to administer the Docker hosting environment. How should the company migrate the application to AWS to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate the containers that run the application to Amazon Elastic Kubernetes Service (Amazon EKS). Use Amazon S3 to store the transaction data that the containers share.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Migrate the containers that run the application to AWS Fargate for Amazon Elastic Container Service (Amazon ECS). Create an Amazon Elastic File System (Amazon EFS) file system. Create a Fargate task definition. Add a volume to the task definition to point to the EFS file system.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Migrate the containers that run the application to AWS Fargate for Amazon Elastic Container Service (Amazon ECS). Create an Amazon Elastic Block Store (Amazon EBS) volume. Create a Fargate task definition. Attach the EBS volume to each running task.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Launch Amazon EC2 instances. Install Docker on the EC2 instances. Migrate the containers to the EC2 instances. Create an Amazon Elastic File System (Amazon EFS) file system. Add a mount point to the EC2 instances for the EFS file system.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar app transaccional en contenedores Docker (con almacenamiento compartido, transacciones time-sensitive, volumen impredecible) SIN poder desarrollar más ni administrar el hosting; se necesita almacenamiento de baja latencia que ESCALE throughput automáticamente.\n\nOpción B (Correcta): AWS Fargate para ECS elimina la administración del entorno de hosting (serverless); EFS ofrece almacenamiento compartido de baja latencia que escala el throughput automáticamente; y se monta como volumen en la task definition.\nOpción A: EKS sigue requiriendo administrar aspectos del clúster y S3 no es un sistema de ficheros compartido montable con la semántica que la app espera.\nOpción C: EBS no se comparte entre múltiples tareas Fargate; no cubre el almacenamiento compartido.\nOpción D: EC2 con Docker obliga a administrar el host, lo que el enunciado prohíbe.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html\nhttps://docs.aws.amazon.com/AmazonECS/latest/developerguide/efs-volumes.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30356,
    "questionNumber": 356,
    "question": "A company is planning to migrate to the AWS Cloud. The company hosts many applications on Windows servers and Linux servers. Some of the servers are physical, and some of the servers are virtual. The company uses several types of databases in its on-premises environment. The company does not have an accurate inventory of its on-premises servers and applications. The company wants to rightsize its resources during migration. A solutions architect needs to obtain information about the network connections and the application relationships. The solutions architect must assess the company’s current environment and develop a migration plan. Which solution will provide the solutions architect with the required information to develop the migration plan?",
    "choices": [
      {
        "letter": "A",
        "text": "Use Migration Evaluator to request an evaluation of the environment from AWS. Use the AWS Application Discovery Service Agentless Collector to import the details into a Migration Evaluator Quick Insights report.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Migration Hub and install the AWS Application Discovery Agent on the servers. Deploy the Migration Hub Strategy Recommendations application data collector. Generate a report by using Migration Hub Strategy Recommendations.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use AWS Migration Hub and run the AWS Application Discovery Service Agentless Collector on the servers. Group the servers and databases by using AWS Application Migration Service. Generate a report by using Migration Hub Strategy Recommendations.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use the AWS Migration Hub import tool to load the details of the company’s on-premises environment. Generate a report by using Migration Hub Strategy Recommendations.",
        "isCorrect": false
      }
    ],
    "comments": "Sin inventario preciso de servidores (físicos/virtuales, Windows/Linux) y BDs variadas; se necesita información de conexiones de red y RELACIONES entre aplicaciones para rightsizing y un plan de migración.\n\nOpción B (Correcta): Migration Hub + el Application Discovery Agent (basado en agente) capturan conexiones de red y dependencias entre procesos/aplicaciones; el data collector de Strategy Recommendations genera un informe con recomendaciones de migración.\nOpción A: Migration Evaluator + el Agentless Collector estima costes pero el agentless no captura las relaciones detalladas entre aplicaciones tan bien como el agente.\nOpción C: el Agentless Collector no da las dependencias a nivel de proceso; y Application Migration Service es para ejecutar, no para descubrir/agrupar así.\nOpción D: la import tool solo carga datos que ya tengas (no hay inventario), no descubre conexiones ni dependencias.\n\nReferencias:\nhttps://docs.aws.amazon.com/application-discovery/latest/userguide/discovery-agent.html\nhttps://docs.aws.amazon.com/migrationhub-strategy/latest/userguide/what-is-mhub-strategy.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30357,
    "questionNumber": 357,
    "question": "A financial services company sells its software-as-a-service (SaaS) platform for application compliance to large global banks. The SaaS platform runs on AWS and uses multiple AWS accounts that are managed in an organization in AWS Organizations. The SaaS platform uses many AWS resources globally. For regulatory compliance, all API calls to AWS resources must be audited, tracked for changes, and stored in a durable and secure data store. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new AWS CloudTrail trail. Use an existing Amazon S3 bucket in the organization's management account to store the logs. Deploy the trail to all AWS Regions. Enable MFA delete and encryption on the S3 bucket.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a new AWS CloudTrail trail in each member account of the organization. Create new Amazon S3 buckets to store the logs. Deploy the trail to all AWS Regions. Enable MFA delete and encryption on the S3 buckets.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a new AWS CloudTrail trail in the organization's management account. Create a new Amazon S3 bucket with versioning turned on to store the logs. Deploy the trail for all accounts in the organization. Enable MFA delete and encryption on the S3 bucket.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create a new AWS CloudTrail trail in the organization's management account. Create a new Amazon S3 bucket to store the logs. Configure Amazon Simple Notification Service (Amazon SNS) to send log-file delivery notifications to an external management system that will track the logs. Enable MFA delete and encryption on the S3 bucket.",
        "isCorrect": false
      }
    ],
    "comments": "Plataforma SaaS multi-cuenta (Organizations) donde, por cumplimiento, TODAS las llamadas API deben auditarse, rastrearse ante cambios y guardarse de forma duradera y segura, con el MENOR overhead operativo.\n\nOpción C (Correcta): un organization trail de CloudTrail en la cuenta de gestión, desplegado a todas las cuentas de la organización, con un bucket S3 nuevo con versioning (rastrea cambios), MFA delete y cifrado, captura todo de una vez con mínimo overhead.\nOpción A: reutilizar un bucket existente y no habilitar versioning debilita el rastreo de cambios; un organization trail nuevo con versioning es mejor.\nOpción B: crear un trail por cada cuenta miembro es alto overhead operativo frente al organization trail único.\nOpción D: añadir SNS a un sistema externo para \"rastrear\" es más complejo y no aporta el versioning/durabilidad que ya da S3.\n\nReferencias:\nhttps://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html\nhttps://docs.aws.amazon.com/awscloudtrail/latest/userguide/best-practices-security.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30358,
    "questionNumber": 358,
    "question": "A company is deploying a distributed in-memory database on a fleet of Amazon EC2 instances. The fleet consists of a primary node and eight worker nodes. The primary node is responsible for monitoring cluster health, accepting user requests, distributing user requests to worker nodes, and sending an aggregate response back to a client. Worker nodes communicate with each other to replicate data partitions. The company requires the lowest possible networking latency to achieve maximum performance. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Launch memory optimized EC2 instances in a partition placement group.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Launch compute optimized EC2 instances in a partition placement group.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Launch memory optimized EC2 instances in a cluster placement group.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Launch compute optimized EC2 instances in a spread placement group.",
        "isCorrect": false
      }
    ],
    "comments": "BD distribuida en memoria (1 nodo primario + 8 workers que se comunican intensamente y replican particiones) que requiere la MENOR latencia de red posible para máximo rendimiento.\n\nOpción C (Correcta): instancias memory optimized (para una BD en memoria) en un cluster placement group agrupan los nodos en hardware muy próximo, dando el mayor ancho de banda y la MÍNIMA latencia entre nodos.\nOpción A: partition placement group separa los nodos en particiones distintas (para reducir fallos correlacionados), lo que AUMENTA la latencia; contrario al objetivo.\nOpción B: compute optimized no es lo idóneo para una BD en memoria (necesita RAM) y partition group aumenta latencia.\nOpción D: spread placement group separa físicamente las instancias (máxima resiliencia, no mínima latencia) y compute optimized no encaja.\n\nReferencias:\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/memory-optimized-instances.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30359,
    "questionNumber": 359,
    "question": "A company maintains information on premises in approximately 1 million.csv files that are hosted on a VM. The data initially is 10 TB in size and grows at a rate of 1 TB each week. The company needs to automate backups of the data to the AWS Cloud. Backups of the data must occur daily. The company needs a solution that applies custom filters to back up only a subset of the data that is located in designated source directories. The company has set up an AWS Direct Connect connection. Which solution will meet the backup requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Use the Amazon S3 CopyObject API operation with multipart upload to copy the existing data to Amazon S3. Use the CopyObject API operation to replicate new data to Amazon S3 daily.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create a backup plan in AWS Backup to back up the data to Amazon S3. Schedule the backup plan to run daily.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Install the AWS DataSync agent as a VM that runs on the on-premises hypervisor. Configure a DataSync task to replicate the data to Amazon S3 daily.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use an AWS Snowball Edge device for the initial backup. Use AWS DataSync for incremental backups to Amazon S3 daily.",
        "isCorrect": false
      }
    ],
    "comments": "~1 millón de ficheros .csv (10 TB creciendo 1 TB/semana) en una VM on-premises que hay que respaldar a AWS a DIARIO, aplicando filtros custom para copiar solo un subconjunto de directorios, con Direct Connect y el MENOR overhead operativo.\n\nOpción C (Correcta): el agente de AWS DataSync como VM en el hipervisor on-premises, con una task que replica a S3 a diario, soporta filtros de inclusión/exclusión (subconjuntos de directorios), maneja millones de ficheros de forma eficiente y es gestionado (bajo overhead).\nOpción A: scripts con CopyObject/multipart son código a mantener y no manejan bien millones de ficheros ni filtros de forma nativa.\nOpción B: AWS Backup no respalda un sistema de ficheros arbitrario en una VM on-premises de este modo ni aplica filtros por directorio como DataSync.\nOpción D: Snowball para el inicial es innecesario si ya hay Direct Connect suficiente; añade logística.\n\nReferencias:\nhttps://docs.aws.amazon.com/datasync/latest/userguide/create-agent-vmware.html\nhttps://docs.aws.amazon.com/datasync/latest/userguide/filtering.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30360,
    "questionNumber": 360,
    "question": "A financial services company has an asset management product that thousands of customers use around the world. The customers provide feedback about the product through surveys. The company is building a new analytical solution that runs on Amazon EMR to analyze the data from these surveys. The following user personas need to access the analytical solution to perform different actions: • Administrator: Provisions the EMR cluster for the analytics team based on the team’s requirements • Data engineer: Runs ETL scripts to process, transform, and enrich the datasets • Data analyst: Runs SQL and Hive queries on the data A solutions architect must ensure that all the user personas have least privilege access to only the resources that they need. The user personas must be able to launch only applications that are approved and authorized. The solution also must ensure tagging for all resources that the user personas create. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create IAM roles for each user persona. Attach identity-based policies to define which actions the user who assumes the role can perform. Create an AWS Config rule to check for noncompliant resources. Configure the rule to notify the administrator to remediate the noncompliant resources.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Setup Kerberos-based authentication for EMR clusters upon launch. Specify a Kerberos security configuration along with cluster-specific Kerberos options.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Service Catalog to control the Amazon EMR versions available for deployment, the cluster configuration, and the permissions for each user persona.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Launch the EMR cluster by using AWS CloudFormation, Attach resource-based policies to the EMR cluster during cluster creation. Create an AWS. Config rule to check for noncompliant clusters and noncompliant Amazon S3 buckets. Configure the rule to notify the administrator to remediate the noncompliant resources.",
        "isCorrect": false
      }
    ],
    "comments": "Solución analítica sobre Amazon EMR con tres personas (administrador, data engineer, data analyst) que necesitan mínimo privilegio, solo poder lanzar aplicaciones aprobadas/autorizadas y etiquetado obligatorio de todos los recursos que creen.\n\nOpción C (Correcta): AWS Service Catalog permite publicar productos aprobados (versiones de EMR, configuración de clúster permitida), controlar los permisos de lanzamiento por persona (launch constraints) y forzar tagging (TagOptions), cubriendo los tres requisitos de forma gobernada.\nOpción A: roles IAM + una regla de Config es reactivo para el tagging (detecta/notifica, no impone) y no restringe qué aplicaciones EMR se pueden lanzar.\nOpción B: Kerberos autentica en el clúster pero no controla qué se puede provisionar ni el tagging.\nOpción D: CloudFormation + Config detecta a posteriori; no impone en el momento del lanzamiento ni ofrece el catálogo aprobado por persona que da Service Catalog.\n\nReferencias:\nhttps://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html\nhttps://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30361,
    "questionNumber": 361,
    "question": "A software as a service (SaaS) company uses AWS to host a service that is powered by AWS PrivateLink. The service consists of proprietary software that runs on three Amazon EC2 instances behind a Network Load Balancer (NLB). The instances are in private subnets in multiple Availability Zones in the eu-west-2 Region. All the company's customers are in eu-west-2. However, the company now acquires a new customer in the us-east-1 Region. The company creates a new VPC and new subnets in us-east-1. The company establishes inter-Region VPC peering between the VPCs in the two Regions. The company wants to give the new customer access to the SaaS service, but the company does not want to immediately deploy new EC2 resources in us-east-1. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure a PrivateLink endpoint service in us-east-1 to use the existing NLB that is in eu-west-2. Grant specific AWS accounts access to connect to the SaaS service.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an NLB in us-east-1. Create an IP target group that uses the IP addresses of the company's instances in eu-west-2 that host the SaaS service. Configure a PrivateLink endpoint service that uses the NLB that is in us-east-1. Grant specific AWS accounts access to connect to the SaaS service.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an Application Load Balancer (ALB) in front of the EC2 instances in eu-west-2. Create an NLB in us-east-1. Associate the NLB that is in us-east-1 with an ALB target group that uses the ALB that is in eu-west-2. Configure a PrivateLink endpoint service that uses the NLB that is in us-east-1. Grant specific AWS accounts access to connect to the SaaS service.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use AWS Resource Access Manager (AWS RAM) to share the EC2 instances that are in eu-west-2. In us-east-1, create an NLB and an instance target group that includes the shared EC2 instances from eu-west-2. Configure a PrivateLink endpoint service that uses the NLB that is in us-east-1. Grant specific AWS accounts access to connect to the SaaS service.",
        "isCorrect": false
      }
    ],
    "comments": "SaaS con PrivateLink (NLB + EC2 en eu-west-2) que debe exponerse a un cliente en us-east-1 SIN desplegar EC2 nuevas; los endpoint services de PrivateLink son REGIONALES.\n\nOpción A: Un endpoint service de PrivateLink no puede apuntar a un NLB de otra Región; el NLB debe estar en la misma Región que el endpoint service. NO válida.\nOpción B (Correcta): Se crea un NLB en us-east-1 con un target group de tipo IP apuntando a las IPs de las instancias en eu-west-2 (alcanzables por VPC peering inter-Región); ese NLB local respalda un endpoint service de PrivateLink en us-east-1. Cumple sin desplegar EC2 nuevas.\nOpción C: Un NLB no admite target group de tipo ALB entre Regiones y añade complejidad innecesaria; no resuelve el requisito regional de PrivateLink.\nOpción D: AWS RAM no comparte instancias EC2 entre Regiones ni permite un instance target group con instancias de otra Región. NO válida.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-target-groups.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30362,
    "questionNumber": 362,
    "question": "A company needs to monitor a growing number of Amazon S3 buckets across two AWS Regions. The company also needs to track the percentage of objects that are encrypted in Amazon S3. The company needs a dashboard to display this information for internal compliance teams. Which solution will meet these requirements with the LEAST operational overhead?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new 3 Storage Lens dashboard in each Region to track bucket and encryption metrics. Aggregate data from both Region dashboards into a single dashboard in Amazon QuickSight for the compliance teams.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy an AWS Lambda function in each Region to list the number of buckets and the encryption status of objects. Store this data in Amazon S3. Use Amazon Athena queries to display the data on a custom dashboard in Amazon QuickSight for the compliance teams.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use the S3 Storage Lens default dashboard to track bucket and encryption metrics. Give the compliance teams access to the dashboard directly in the S3 console.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an Amazon EventBridge rule to detect AWS CloudTrail events for S3 object creation. Configure the rule to invoke an AWS Lambda function to record encryption metrics in Amazon DynamoDB. Use Amazon QuickSight to display the metrics in a dashboard for the compliance teams.",
        "isCorrect": false
      }
    ],
    "comments": "Se necesita monitorizar buckets S3 en dos Regiones, seguir el % de objetos cifrados y dar un dashboard a Compliance con el MENOR overhead operativo.\n\nOpción A: S3 Storage Lens ya agrega métricas a nivel de organización/cuenta multi-Región; crear un dashboard por Región y unirlos en QuickSight añade trabajo innecesario.\nOpción B: Lambdas por Región + Athena + QuickSight es una solución a medida con mucho mantenimiento.\nOpción C (Correcta): El dashboard por defecto de S3 Storage Lens ya cubre buckets y métricas de cifrado de forma agregada; basta con dar acceso a Compliance desde la consola de S3. MÍNIMO overhead.\nOpción D: EventBridge + CloudTrail + Lambda + DynamoDB + QuickSight es la opción con MAYOR complejidad operativa.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens_basics_metrics_recommendations.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30363,
    "questionNumber": 363,
    "question": "A company’s CISO has asked a solutions architect to re-engineer the company's current CI/CD practices to make sure patch deployments to its application can happen as quickly as possible with minimal downtime if vulnerabilities are discovered. The company must also be able to quickly roll back a change in case of errors. The web application is deployed in a fleet of Amazon EC2 instances behind an Application Load Balancer. The company is currently using GitHub to host the application source code, and has configured an AWS CodeBuild project to build the application. The company also intends to use AWS CodePipeline to trigger builds from GitHub commits using the existing CodeBuild project. What CI/CD configuration meets all of the requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Configure CodePipeline with a deploy stage using AWS CodeDeploy configured for in-place deployment. Monitor the newly deployed code, and, if there are any issues, push another code update",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure CodePipeline with a deploy stage using AWS CodeDeploy configured for blue/green deployments. Monitor the newly deployed code, and, if there are any issues, trigger a manual rollback using CodeDeploy.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Configure CodePipeline with a deploy stage using AWS CloudFormation to create a pipeline for test and production stacks. Monitor the newly deployed code, and, if there are any issues, push another code update.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Configure the CodePipeline with a deploy stage using AWS OpsWorks and in-place deployments. Monitor the newly deployed code, and, if there are any issues, push another code update.",
        "isCorrect": false
      }
    ],
    "comments": "CI/CD para parcheo RÁPIDO con MÍNIMO downtime y ROLLBACK inmediato sobre EC2 tras un ALB, usando CodePipeline + CodeBuild.\n\nOpción A: CodeDeploy in-place actualiza las instancias existentes; no permite un rollback instantáneo y el parcheo genera downtime.\nOpción B (Correcta): CodeDeploy con despliegue blue/green levanta un entorno nuevo y conmuta tráfico en el ALB; ante fallos se hace rollback rápido reenrutando al entorno azul. Cumple downtime mínimo y rollback inmediato.\nOpción C: CloudFormation para stacks de test/prod no aporta rollback de tráfico gestionado; \"push another update\" no es rollback rápido.\nOpción D: OpsWorks con in-place es un servicio en desuso y no ofrece conmutación rápida ni rollback nativo.\n\nReferencias:\nhttps://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html\nhttps://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30364,
    "questionNumber": 364,
    "question": "A company is managing many AWS accounts by using an organization in AWS Organizations. Different business units in the company run applications on Amazon EC2 instances. All the EC2 instances must have a BusinessUnit tag so that the company can track the cost for each business unit. A recent audit revealed that some instances were missing this tag. The company manually added the missing tag to the instances. What should a solutions architect do to enforce the tagging requirement in the future?",
    "choices": [
      {
        "letter": "A",
        "text": "Enable tag policies in the organization. Create a tag policy for the BusinessUnit tag. Ensure that compliance with tag key capitalization is turned off. Implement the tag policy for the ec2:instance resource type. Attach the tag policy to the root of the organization.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Enable tag policies in the organization. Create a tag policy for the BusinessUnit tag. Ensure that compliance with tag key capitalization is turned on. Implement the tag policy for the ec2:instance resource type. Attach the tag policy to the organization's management account.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an SCP and attach the SCP to the root of the organization. Include the following statement in the SCP:",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an SCP and attach the SCP to the organization’s management account. Include the following statement in the SCP:",
        "isCorrect": false
      }
    ],
    "comments": "En AWS Organizations se debe FORZAR que toda EC2 lleve el tag BusinessUnit; las tag policies solo detectan/reportan incumplimiento, no lo impiden.\n\nOpción A: Las tag policies no bloquean la creación de recursos sin tag; solo marcan no conformidad. No fuerzan el requisito.\nOpción B: Igual que A y además adjuntar al management account no aplica a las cuentas miembro. NO válida.\nOpción C (Correcta): Una SCP con condición que deniegue ec2:RunInstances (aws:RequestTag) cuando falte BusinessUnit, adjunta a la raíz de la organización, impide realmente lanzar instancias sin el tag.\nOpción D: Una SCP adjunta al management account no restringe al propio management account de forma efectiva y no cubre las cuentas miembro; debe adjuntarse a la raíz/OU.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/control-access-with-tags.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30365,
    "questionNumber": 365,
    "question": "A company is running a workload that consists of thousands of Amazon EC2 instances. The workload is running in a VPC that contains several public subnets and private subnets. The public subnets have a route for 0.0.0.0/0 to an existing internet gateway. The private subnets have a route for 0.0.0.0/0 to an existing NAT gateway. A solutions architect needs to migrate the entire fleet of EC2 instances to use IPv6. The EC2 instances that are in private subnets must not be accessible from the public internet. What should the solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Update the existing VPC, and associate a custom IPv6 CIDR block with the VPC and all subnets. Update all the VPC route tables, and add a route for ::/0 to the internet gateway.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Update the existing VPC, and associate an Amazon-provided IPv6 CIDR block with the VPC and all subnets. Update the VPC route tables for all private subnets, and add a route for ::/0 to the NAT gateway.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Update the existing VPC, and associate an Amazon-provided IPv6 CIDR block with the VPC and all subnets. Create an egress-only internet gateway. Update the VPC route tables for all private subnets, and add a route for ::/0 to the egress-only internet gateway.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Update the existing VPC, and associate a custom IPV6 CIDR block with the VPC and all subnets. Create a new NAT gateway, and enable IPV6 support. Update the VPC route tables for all private subnets, and add a route for ::/0 to the IPv6-enabled NAT gateway.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar la flota a IPv6 manteniendo que las EC2 en subredes privadas NO sean accesibles desde Internet; en IPv6 no hay NAT y las direcciones son públicas por diseño.\n\nOpción A: Añadir ruta ::/0 al internet gateway en todas las subredes expone las instancias privadas a Internet. NO cumple el aislamiento.\nOpción B: El NAT gateway no soporta IPv6; una ruta ::/0 al NAT gateway no funciona para IPv6.\nOpción C (Correcta): Se asocia bloque IPv6 provisto por Amazon y se crea un egress-only internet gateway (equivalente IPv6 del NAT: permite salida pero bloquea conexiones entrantes iniciadas desde Internet). Las privadas enrutan ::/0 al EOIGW.\nOpción D: No existe NAT gateway con soporte IPv6 para este propósito; la salida/aislamiento IPv6 se resuelve con egress-only IGW.\n\nReferencias:\nhttps://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html\nhttps://docs.aws.amazon.com/vpc/latest/userguide/vpc-migrate-ipv6.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30366,
    "questionNumber": 366,
    "question": "A company is using Amazon API Gateway to deploy a private REST API that will provide access to sensitive data. The API must be accessible only from an application that is deployed in a VPC. The company deploys the API successfully. However, the API is not accessible from an Amazon EC2 instance that is deployed in the VPC. Which solution will provide connectivity between the EC2 instance and the API?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an interface VPC endpoint for API Gateway. Attach an endpoint policy that allows apigateway:* actions. Disable private DNS naming for the VPC endpoint. Configure an API resource policy that allows access from the VPC. Use the VPC endpoint's DNS name to access the API.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an interface VPC endpoint for API Gateway. Attach an endpoint policy that allows the execute-api:Invoke action. Enable private DNS naming for the VPC endpoint. Configure an API resource policy that allows access from the VPC endpoint. Use the API endpoint’s DNS names to access the API.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create a Network Load Balancer (NLB) and a VPC link. Configure private integration between API Gateway and the NLB. Use the API endpoint’s DNS names to access the API.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an Application Load Balancer (ALB) and a VPC Link. Configure private integration between API Gateway and the ALB. Use the ALB endpoint’s DNS name to access the API.",
        "isCorrect": false
      }
    ],
    "comments": "API REST PRIVADA de API Gateway que solo debe ser accesible desde una VPC, pero una EC2 en la VPC no la alcanza; falta el endpoint de interfaz correctamente configurado.\n\nOpción A: La acción correcta para invocar es execute-api:Invoke, no apigateway:*; y deshabilitar el DNS privado obliga a usar el DNS del endpoint con host header, complicando el acceso.\nOpción B (Correcta): Interface VPC endpoint para execute-api con política execute-api:Invoke, DNS privado habilitado y resource policy de la API que permite el acceso desde el endpoint. Así la EC2 resuelve el nombre de la API y la invoca de forma privada.\nOpción C: NLB + VPC link es para integraciones privadas de una API pública/regional hacia backends, no para exponer una API privada a clientes en la VPC.\nOpción D: ALB + VPC link tampoco aplica al acceso de un cliente a una API privada.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-apis.html\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30367,
    "questionNumber": 367,
    "question": "A large payroll company recently merged with a small staffing company. The unified company now has multiple business units, each with its own existing AWS account. A solutions architect must ensure that the company can centrally manage the billing and access policies for all the AWS accounts. The solutions architect configures AWS Organizations by sending an invitation to all member accounts of the company from a centralized management account. What should the solutions architect do next to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create the OrganizationAccountAccess IAM group in each member account. Include the necessary IAM roles for each administrator.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create the OrganizationAccountAccessPolicy IAM policy in each member account. Connect the member accounts to the management account by using cross-account access.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create the OrganizationAccountAccessRole IAM role in each member account. Grant permission to the management account to assume the IAM role.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create the OrganizationAccountAccessRole IAM role in the management account. Attach the AdministratorAccess AWS managed policy to the IAM role. Assign the IAM role to the administrators in each member account.",
        "isCorrect": false
      }
    ],
    "comments": "Tras invitar cuentas existentes a AWS Organizations, se necesita gestión centralizada; las cuentas invitadas NO reciben automáticamente el rol de acceso desde el management account.\n\nOpción A: No existe un grupo IAM \"OrganizationAccountAccess\"; el acceso cruzado se hace con un rol, no con un grupo.\nOpción B: No hay una policy \"OrganizationAccountAccessPolicy\" estándar; el mecanismo es un rol asumible.\nOpción C (Correcta): Crear el rol OrganizationAccountAccessRole en cada cuenta miembro (invitada) con una trust policy que permita al management account asumirlo. Es el mecanismo estándar para cuentas invitadas (las creadas por Organizations ya lo traen).\nOpción D: El rol debe existir en las cuentas MIEMBRO, no en el management account; no se \"asigna\" a administradores de cada cuenta de ese modo.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30368,
    "questionNumber": 368,
    "question": "A company has application services that have been containerized and deployed on multiple Amazon EC2 instances with public IPs. An Apache Kafka cluster has been deployed to the EC2 instances. A PostgreSQL database has been migrated to Amazon RDS for PostgreSQL. The company expects a significant increase of orders on its platform when a new version of its flagship product is released. What changes to the current architecture will reduce operational overhead and support the product release?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an EC2 Auto Scaling group behind an Application Load Balancer. Create additional read replicas for the DB instance. Create Amazon Kinesis data streams and configure the application services to use the data streams. Store and serve static content directly from Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an EC2 Auto Scaling group behind an Application Load Balancer. Deploy the DB instance in Multi-AZ mode and enable storage auto scaling. Create Amazon Kinesis data streams and configure the application services to use the data streams. Store and serve static content directly from Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Deploy the application on a Kubernetes cluster created on the EC2 instances behind an Application Load Balancer. Deploy the DB instance in Multi-AZ mode and enable storage auto scaling. Create an Amazon Managed Streaming for Apache Kafka cluster and configure the application services to use the cluster. Store static content in Amazon S3 behind an Amazon CloudFront distribution.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy the application on Amazon Elastic Kubernetes Service (Amazon EKS) with AWS Fargate and enable auto scaling behind an Application Load Balancer. Create additional read replicas for the DB instance. Create an Amazon Managed Streaming for Apache Kafka cluster and configure the application services to use the cluster. Store static content in Amazon S3 behind an Amazon CloudFront distribution.",
        "isCorrect": true
      }
    ],
    "comments": "Contenedores en EC2, Kafka autogestionado y RDS PostgreSQL; se busca soportar un pico de lanzamiento con MENOR overhead operativo.\n\nOpción A: Auto Scaling + read replicas pero Kinesis no reemplaza Kafka sin reescribir la app y sigue gestionando la infra de contenedores manualmente.\nOpción B: Mejora la BD (Multi-AZ) pero reemplaza Kafka por Kinesis (cambio de plataforma) y mantiene EC2 autogestionadas.\nOpción C: Kubernetes sobre EC2 autogestionado mantiene alto overhead de operación del plano de datos/control.\nOpción D (Correcta): EKS con Fargate (sin gestionar nodos) + autoscaling tras ALB, read replicas para lecturas, Amazon MSK (Kafka gestionado compatible, sin reescribir) y contenido estático en S3 + CloudFront. Reduce overhead y escala para el lanzamiento.\n\nReferencias:\nhttps://docs.aws.amazon.com/eks/latest/userguide/fargate.html\nhttps://docs.aws.amazon.com/msk/latest/developerguide/what-is-msk.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30369,
    "questionNumber": 369,
    "question": "A company hosts a VPN in an on-premises data center. Employees currently connect to the VPN to access files in their Windows home directories. Recently, there has been a large growth in the number of employees who work remotely. As a result, bandwidth usage for connections into the data center has begun to reach 100% during business hours. The company must design a solution on AWS that will support the growth of the company's remote workforce, reduce the bandwidth usage for connections into the data center, and reduce operational overhead. Which combination of steps will meet these requirements with the LEAST operational overhead? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Storage Gateway Volume Gateway. Mount a volume from the Volume Gateway to the on-premises file server.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Migrate the home directories to Amazon FSx for Windows File Server.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Migrate the home directories to Amazon FSx for Lustre.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Migrate remote users to AWS Client VPN.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Create an AWS Direct Connect connection from the on-premises data center to AWS.",
        "isCorrect": false
      }
    ],
    "comments": "VPN on-premises saturada por teletrabajo (home directories Windows); hay que descargar el enlace al DC y reducir overhead con el MENOR esfuerzo operativo (elegir dos).\n\nOpción A: Volume Gateway ofrece almacenamiento en bloque iSCSI, no comparticiones SMB de home directories Windows; no descarga el tráfico de usuarios.\nOpción B (Correcta): Migrar los home directories a Amazon FSx for Windows File Server (SMB gestionado, integrado con AD) elimina la dependencia del file server on-premises.\nOpción C: FSx for Lustre es para HPC/POSIX, no para directorios de usuario Windows con SMB.\nOpción D (Correcta): Migrar a AWS Client VPN gestionado desplaza el acceso remoto a AWS, descargando el enlace del data center y reduciendo operación.\nOpción E: Direct Connect requiere aprovisionamiento físico y no reduce el tráfico de usuarios remotos; alto esfuerzo.\n\nReferencias:\nhttps://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html\nhttps://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html",
    "category": "Migración y Modernización",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30370,
    "questionNumber": 370,
    "question": "A company has multiple AWS accounts. The company recently had a security audit that revealed many unencrypted Amazon Elastic Block Store (Amazon EBS) volumes attached to Amazon EC2 instances. A solutions architect must encrypt the unencrypted volumes and ensure that unencrypted volumes will be detected automatically in the future. Additionally, the company wants a solution that can centrally manage multiple AWS accounts with a focus on compliance and security. Which combination of steps should the solutions architect take to meet these requirements? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create an organization in AWS Organizations. Set up AWS Control Tower, and turn on the strongly recommended controls (guardrails). Join all accounts to the organization. Categorize the AWS accounts into OUs.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Use the AWS CLI to list all the unencrypted volumes in all the AWS accounts. Run a script to encrypt all the unencrypted volumes in place.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create a snapshot of each unencrypted volume. Create a new encrypted volume from the unencrypted snapshot. Detach the existing volume, and replace it with the encrypted volume.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an organization in AWS Organizations. Set up AWS Control Tower, and turn on the mandatory controls (guardrails). Join all accounts to the organization. Categorize the AWS accounts into OUs.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Turn on AWS CloudTrail. Configure an Amazon EventBridge rule to detect and automatically encrypt unencrypted volumes.",
        "isCorrect": false
      }
    ],
    "comments": "Múltiples cuentas con volúmenes EBS sin cifrar; hay que cifrarlos y detectar futuros incumplimientos con gobierno centralizado (elegir dos).\n\nOpción A (Correcta): AWS Control Tower con controles \"strongly recommended\" incluye la detección de volúmenes EBS sin cifrar; unir cuentas a la organización y organizarlas en OUs da gobierno de cumplimiento centralizado.\nOpción B: No se puede cifrar un volumen EBS \"en sitio\"; el cifrado se define en la creación, así que un script de cifrado in-place no es viable.\nOpción C (Correcta): Para cifrar los volúmenes existentes: snapshot → crear volumen cifrado desde el snapshot → desasociar el antiguo y adjuntar el cifrado. Procedimiento estándar.\nOpción D: Los controles \"mandatory\" de Control Tower no incluyen la detección de EBS sin cifrar (esa es un control detectivo recomendado).\nOpción E: EventBridge no puede \"cifrar automáticamente\" un volumen en uso; el cifrado no se aplica sobre un volumen existente adjunto.\n\nReferencias:\nhttps://docs.aws.amazon.com/controltower/latest/userguide/controls.html\nhttps://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30371,
    "questionNumber": 371,
    "question": "A company hosts an intranet web application on Amazon EC2 instances behind an Application Load Balancer (ALB). Currently, users authenticate to the application against an internal user database. The company needs to authenticate users to the application by using an existing AWS Directory Service for Microsoft Active Directory directory. All users with accounts in the directory must have access to the application. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a new app client in the directory. Create a listener rule for the ALB. Specify the authenticate-oidc action for the listener rule. Configure the listener rule with the appropriate issuer, client ID and secret, and endpoint details for the Active Directory service. Configure the new app client with the callback URL that the ALB provides.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure an Amazon Cognito user pool. Configure the user pool with a federated identity provider (ldP) that has metadata from the directory. Create an app client. Associate the app client with the user pool. Create a listener rule for the ALSpecify the authenticate-cognito action for the listener rule. Configure the listener rule to use the user pool and app client.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Add the directory as a new IAM identity provider (ldP). Create a new IAM role that has an entity type of SAML 2.0 federation. Configure a role policy that allows access to the ALB. Configure the new role as the default authenticated user role for the ldP. Create a listener rule for the ALB. Specify the authenticate-oidc action for the listener rule.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Enable AWS IAM Identity Center (AWS Single Sign-On). Configure the directory as an external identity provider (ldP) that uses SAML. Use the automatic provisioning method. Create a new IAM role that has an entity type of SAML 2.0 federation. Configure a role policy that allows access to the ALB. Attach the new role to all groups. Create a listener rule for the ALB. Specify the authenticate-cognito action for the listener rule.",
        "isCorrect": false
      }
    ],
    "comments": "Autenticar usuarios de una app intranet tras un ALB contra AWS Managed Microsoft AD, dando acceso a todos los usuarios del directorio.\n\nOpción A: El ALB con authenticate-oidc no se integra directamente con AWS Managed Microsoft AD como IdP OIDC; falta la capa de user pool.\nOpción B (Correcta): Amazon Cognito user pool con un IdP federado que usa metadatos del directorio, un app client asociado y una regla del listener con acción authenticate-cognito. El ALB delega la autenticación en Cognito, que federa con AD. Es el patrón soportado.\nOpción C: SAML federation en IAM da acceso a la consola/API de AWS, no autentica usuarios finales frente a una app web tras un ALB.\nOpción D: IAM Identity Center con SAML es para acceso a AWS; además \"authenticate-cognito\" con un rol IAM SAML mezcla mecanismos incompatibles.\n\nReferencias:\nhttps://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html\nhttps://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-identity-federation.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30372,
    "questionNumber": 372,
    "question": "A company has a website that serves many visitors. The company deploys a backend service for the website in a primary AWS Region and a disaster recovery (DR) Region. A single Amazon CloudFront distribution is deployed for the website. The company creates an Amazon Route 53 record set with health checks and a failover routing policy for the primary Region’s backend service. The company configures the Route 53 record set as an origin for the CloudFront distribution. The company configures another record set that points to the backend service's endpoint in the DR Region as a secondary failover record type. The TTL for both record sets is 60 seconds. Currently, failover takes more than 1 minute. A solutions architect must design a solution that will provide the fastest failover time. Which solution will achieve this goal?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy an additional CloudFront distribution. Create a new Route 53 failover record set with health checks for both CloudFront distributions.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Set the TTL to 4 second for the existing Route 53 record sets that are used for the backend service in each Region.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create new record sets for the backend services by using a latency routing policy. Use the record sets as an origin in the CloudFront distribution.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a CloudFront origin group that includes two origins, one for each backend service Region. Configure origin failover as a cache behavior for the CloudFront distribution.",
        "isCorrect": true
      }
    ],
    "comments": "El failover DR tarda más de 1 minuto por depender de Route 53 (TTL + health checks) como origen de CloudFront; se busca el failover MÁS rápido.\n\nOpción A: Otra distribución CloudFront con failover en Route 53 sigue dependiendo de DNS/TTL; no acelera.\nOpción B: Bajar el TTL a segundos reduce algo, pero el failover por DNS sigue sujeto a propagación y health checks; no es lo más rápido.\nOpción C: Latency routing no es failover; no garantiza conmutación ante fallo del primario.\nOpción D (Correcta): Un CloudFront origin group con dos orígenes (una Región cada uno) y origin failover en el comportamiento de caché conmuta a nivel de CloudFront ante errores del origen primario, sin esperar a DNS. Es el failover más rápido.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html\nhttps://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistS3AndCustomOrigins.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30373,
    "questionNumber": 373,
    "question": "A company is using multiple AWS accounts and has multiple DevOps teams running production and non-production workloads in these accounts. The company would like to centrally-restrict access to some of the AWS services that the DevOps teams do not use. The company decided to use AWS Organizations and successfully invited all AWS accounts into the Organization. They would like to allow access to services that are currently in-use and deny a few specific services. Also they would like to administer multiple accounts together as a single unit. What combination of steps should the solutions architect take to satisfy these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use a Deny list strategy.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Review the Access Advisor in AWS IAM to determine services recently used",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Review the AWS Trusted Advisor report to determine services recently used.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Remove the default FullAWSAccess SCP.",
        "isCorrect": false
      },
      {
        "letter": "E",
        "text": "Define organizational units (OUs) and place the member accounts in the OUs.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Remove the default DenyAWSAccess SCP.",
        "isCorrect": false
      }
    ],
    "comments": "En AWS Organizations se quiere permitir los servicios EN USO y denegar unos pocos, además de administrar varias cuentas como una unidad (elegir tres).\n\nOpción A (Correcta): Estrategia de lista de denegación (Deny list): se mantiene FullAWSAccess y se añaden SCPs que deniegan servicios concretos. Permite lo actual y bloquea lo específico.\nOpción B (Correcta): Revisar IAM Access Advisor identifica qué servicios se han usado recientemente, para no denegar los que están en uso.\nOpción C: Trusted Advisor no reporta el uso reciente de servicios por principal; esa información es de Access Advisor.\nOpción D: Quitar la SCP FullAWSAccess por defecto convierte en lista de permitidos (allow list), lo contrario de lo pedido y arriesga bloquear lo en uso.\nOpción E (Correcta): Definir OUs y colocar las cuentas en ellas permite administrar múltiples cuentas como una unidad y aplicar SCPs por OU.\nOpción F: No existe una SCP \"DenyAWSAccess\" por defecto que quitar.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_strategies.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_access-advisor.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30374,
    "questionNumber": 374,
    "question": "A live-events company is designing a scaling solution for its ticket application on AWS. The application has high peaks of utilization during sale events. Each sale event is a one-time event that is scheduled. The application runs on Amazon EC2 instances that are in an Auto Scaling group. The application uses PostgreSQL for the database layer. The company needs a scaling solution to maximize availability during the sale events. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use a predictive scaling policy for the EC2 instances. Host the database on an Amazon Aurora PostgreSQL Serverless v2 Multi-AZ DB instance with automatically scaling read replicas. Create an AWS Step Functions state machine to run parallel AWS Lambda functions to pre-warm the database before a sale event. Create an Amazon EventBridge rule to invoke the state machine.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use a scheduled scaling policy for the EC2 instances. Host the database on an Amazon RDS for PostgreSQL Mulli-AZ DB instance with automatically scaling read replicas. Create an Amazon EventBridge rule that invokes an AWS Lambda function to create a larger read replica before a sale event. Fail over to the larger read replica. Create another EventBridge rule that invokes another Lambda function to scale down the read replica after the sale event.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use a predictive scaling policy for the EC2 instances. Host the database on an Amazon RDS for PostgreSQL MultiAZ DB instance with automatically scaling read replicas. Create an AWS Step Functions state machine to run parallel AWS Lambda functions to pre-warm the database before a sale event. Create an Amazon EventBridge rule to invoke the state machine.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use a scheduled scaling policy for the EC2 instances. Host the database on an Amazon Aurora PostgreSQL Multi-AZ DB cluster. Create an Amazon EventBridge rule that invokes an AWS Lambda function to create a larger Aurora Replica before a sale event. Fail over to the larger Aurora Replica. Create another EventBridge rule that invokes another Lambda function to scale down the Aurora Replica after the sale event.",
        "isCorrect": true
      }
    ],
    "comments": "Escalado para eventos de venta PROGRAMADOS (fecha conocida) maximizando DISPONIBILIDAD, con EC2 en ASG y PostgreSQL.\n\nOpción A: Aurora Serverless v2 con \"Multi-AZ DB instance\" y pre-warm por Step Functions es más complejo; predictive scaling no encaja bien con picos únicos y programados.\nOpción B: RDS Multi-AZ con creación de una read replica \"más grande\" y failover a ella es un anti-patrón (failover no promueve una réplica más grande de forma limpia) y añade complejidad.\nOpción C: Predictive scaling no es idóneo para eventos puntuales (aprende de patrones recurrentes); pre-warm de RDS es engorroso.\nOpción D (Correcta): Scheduled scaling de EC2 (se conoce la fecha) + Aurora PostgreSQL Multi-AZ cluster; EventBridge/Lambda crean una Aurora Replica mayor antes del evento, se hace failover a ella (Aurora sí lo soporta con réplicas) y se reduce después. Maximiza disponibilidad para el evento programado.\n\nReferencias:\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scheduled-scaling.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30375,
    "questionNumber": 375,
    "question": "A company runs an intranet application on premises. The company wants to configure a cloud backup of the application. The company has selected AWS Elastic Disaster Recovery for this solution. The company requires that replication traffic does not travel through the public internet. The application also must not be accessible from the internet. The company does not want this solution to consume all available network bandwidth because other applications require bandwidth. Which combination of steps will meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Create a VPC that has at least two private subnets, two NAT gateways, and a virtual private gateway.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Create a VPC that has at least two public subnets, a virtual private gateway, and an internet gateway.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an AWS Site-to-Site VPN connection between the on-premises network and the target AWS network.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Direct Connect connection and a Direct Connect gateway between the on-premises network and the target AWS network.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "During configuration of the replication servers, select the option to use private IP addresses for data replication.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "During configuration of the launch settings for the target servers, select the option to ensure that the Recovery instance’s private IP address matches the source server's private IP address.",
        "isCorrect": false
      }
    ],
    "comments": "AWS Elastic Disaster Recovery (DRS): la replicación NO debe pasar por Internet, la app no debe ser accesible desde Internet y no debe consumir todo el ancho de banda (elegir tres).\n\nOpción A (Correcta): VPC con subredes privadas y NAT gateways (y virtual private gateway) para que los servidores de replicación no sean públicos y salgan de forma controlada.\nOpción B: Subredes públicas + internet gateway expondrían recursos a Internet; contradice el requisito de no accesibilidad pública.\nOpción C: Site-to-Site VPN cifra pero viaja por Internet; el requisito de \"no atravesar Internet\" apunta a conectividad privada dedicada.\nOpción D (Correcta): AWS Direct Connect + Direct Connect gateway proporciona conectividad privada dedicada (no Internet) y permite acotar el ancho de banda usado.\nOpción E (Correcta): En la configuración de los servidores de replicación, seleccionar el uso de IPs privadas para la replicación mantiene el tráfico dentro de la red privada.\nOpción F: Igualar la IP privada de la instancia de recuperación a la del origen no es un requisito de red/privacidad aquí.\n\nReferencias:\nhttps://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html\nhttps://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30376,
    "questionNumber": 376,
    "question": "A company that provides image storage services wants to deploy a customer-facing solution to AWS. Millions of individual customers will use the solution. The solution will receive batches of large image files, resize the files, and store the files in an Amazon S3 bucket for up to 6 months. The solution must handle significant variance in demand. The solution must also be reliable at enterprise scale and have the ability to rerun processing jobs in the event of failure. Which solution will meet these requirements MOST cost-effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Step Functions to process the S3 event that occurs when a user stores an image. Run an AWS Lambda function that resizes the image in place and replaces the original file in the S3 bucket. Create an S3 Lifecycle expiration policy to expire all stored images after 6 months.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use Amazon EventBridge to process the S3 event that occurs when a user uploads an image. Run an AWS Lambda function that resizes the image in place and replaces the original file in the S3 bucket. Create an S3 Lifecycle expiration policy to expire all stored images after 6 months.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Use S3 Event Notifications to invoke an AWS Lambda function when a user stores an image. Use the Lambda function to resize the image in place and to store the original file in the S3 bucket. Create an S3 Lifecycle policy to move all stored images to S3 Standard-Infrequent Access (S3 Standard-IA) after 6 months.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon Simple Queue Service (Amazon SQS) to process the S3 event that occurs when a user stores an image. Run an AWS Lambda function that resizes the image and stores the resized file in an S3 bucket that uses S3 Standard-Infrequent Access (S3 Standard-IA). Create an S3 Lifecycle policy to move all stored images to S3 Glacier Deep Archive after 6 months.",
        "isCorrect": false
      }
    ],
    "comments": "Millones de clientes suben imágenes grandes por lotes para redimensionar y guardar en S3 hasta 6 meses; debe manejar picos, ser fiable a escala y REPROCESAR ante fallos, de forma MÁS rentable.\n\nOpción A: Step Functions para reaccionar al evento S3 añade coste/complejidad; \"resize in place\" y expiración a 6 meses es válido pero Step Functions es sobredimensionado frente a EventBridge.\nOpción B (Correcta): EventBridge procesa el evento de subida a S3, invoca Lambda para redimensionar, con reintentos/DLQ que dan reproceso ante fallos; Lifecycle expira a los 6 meses. Serverless, escalable y rentable.\nOpción C: S3 Event Notifications a Lambda funciona, pero mover a S3 Standard-IA \"tras 6 meses\" no cumple \"almacenar hasta 6 meses\" (deberían expirar), y IA no aplica bien a datos que deben borrarse.\nOpción D: SQS + Lambda con destino Standard-IA y Glacier Deep Archive tras 6 meses contradice el borrado a 6 meses y encarece con tiers de archivo innecesarios.\n\nReferencias:\nhttps://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30377,
    "questionNumber": 377,
    "question": "A company has an organization in AWS Organizations that includes a separate AWS account for each of the company’s departments. Application teams from different departments develop and deploy solutions independently. The company wants to reduce compute costs and manage costs appropriately across departments. The company also wants to improve visibility into billing for individual departments. The company does not want to lose operational flexibility when the company selects compute resources. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Budgets for each department. Use Tag Editor to apply tags to appropriate resources. Purchase EC2 Instance Savings Plans.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Configure AWS Organizations to use consolidated billing. Implement a tagging strategy that identifies departments. Use SCPs to apply tags to appropriate resources. Purchase EC2 Instance Savings Plans.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Configure AWS Organizations to use consolidated billing. Implement a tagging strategy that identifies departments. Use Tag Editor to apply tags to appropriate resources. Purchase Compute Savings Plans.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use AWS Budgets for each department. Use SCPs to apply tags to appropriate resources. Purchase Compute Savings Plans.",
        "isCorrect": false
      }
    ],
    "comments": "Organización con una cuenta por departamento; se busca REDUCIR coste de cómputo, imputar costes por departamento y mejorar visibilidad SIN perder flexibilidad al elegir cómputo.\n\nOpción A: AWS Budgets + EC2 Instance Savings Plans limita la flexibilidad (los EC2 Instance SP atan a una familia/Región) y no da la visibilidad consolidada por tags de forma óptima.\nOpción B: Consolidated billing y tagging son buenos, pero las SCP no aplican tags (no etiquetan recursos) y EC2 Instance SP reduce flexibilidad.\nOpción C (Correcta): Consolidated billing en Organizations + estrategia de tags por departamento + Tag Editor para aplicar tags + Compute Savings Plans (aplican a EC2, Fargate y Lambda en cualquier familia/Región), que preservan la flexibilidad de elección de cómputo. Da visibilidad, ahorro y flexibilidad.\nOpción D: Las SCP no aplican tags; Budgets solo alerta. No etiqueta recursos correctamente.\n\nReferencias:\nhttps://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html\nhttps://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html",
    "category": "Optimización de Costes",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30378,
    "questionNumber": 378,
    "question": "A company has a web application that securely uploads pictures and videos to an Amazon S3 bucket. The company requires that only authenticated users are allowed to post content. The application generates a presigned URL that is used to upload objects through a browser interface. Most users are reporting slow upload times for objects larger than 100 MB. What can a solutions architect do to improve the performance of these uploads while ensuring only authenticated users are allowed to post content?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up an Amazon API Gateway with an edge-optimized API endpoint that has a resource as an S3 service proxy. Configure the PUT method for this resource to expose the S3 PutObject operation. Secure the API Gateway using a COGNITO_USER_POOLS authorizer. Have the browser interface use API Gateway instead of the presigned URL to upload objects.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Set up an Amazon API Gateway with a regional API endpoint that has a resource as an S3 service proxy. Configure the PUT method for this resource to expose the S3 PutObject operation. Secure the API Gateway using an AWS Lambda authorizer. Have the browser interface use API Gateway instead of the presigned URL to upload objects.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Enable an S3 Transfer Acceleration endpoint on the S3 bucket. Use the endpoint when generating the presigned URL. Have the browser interface upload the objects to this URL using the S3 multipart upload API.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Configure an Amazon CloudFront distribution for the destination S3 bucket. Enable PUT and POST methods for the CloudFront cache behavior. Update the CloudFront origin to use an origin access identity (OAI). Give the OAI user 3: PutObject permissions in the bucket policy. Have the browser interface upload objects using the CloudFront distribution.",
        "isCorrect": false
      }
    ],
    "comments": "Subidas lentas (>100 MB) por presigned URL desde el navegador; hay que ACELERAR manteniendo que solo usuarios autenticados publiquen.\n\nOpción A: API Gateway edge-optimized como proxy a S3 con COGNITO no acelera subidas grandes y añade límites de payload de API Gateway (10 MB).\nOpción B: Igual problema; API Gateway impone límite de tamaño de carga y latencia adicional, no mejora subidas de >100 MB.\nOpción C (Correcta): Habilitar S3 Transfer Acceleration y generar la presigned URL contra ese endpoint, subiendo con multipart upload. Acelera cargas grandes por la red de borde de CloudFront y la presigned URL mantiene el control de acceso (solo autenticados).\nOpción D: CloudFront con OAI está pensado para distribución/lectura; usar PUT/POST vía CloudFront para subir a S3 no es el patrón recomendado ni el más eficiente aquí.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html\nhttps://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30379,
    "questionNumber": 379,
    "question": "A large company is migrating its entire IT portfolio to AWS. Each business unit in the company has a standalone AWS account that supports both development and test environments. New accounts to support production workloads will be needed soon. The finance department requires a centralized method for payment but must maintain visibility into each group's spending to allocate costs. The security team requires a centralized mechanism to control IAM usage in all the company’s accounts. What combination of the following options meets the company’s needs with the LEAST effort? (Choose two.)",
    "choices": [
      {
        "letter": "A",
        "text": "Use a collection of parameterized AWS CloudFormation templates defining common IAM permissions that are launched into each account. Require all new and existing accounts to launch the appropriate stacks to enforce the least privilege model.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Organizations to create a new organization from a chosen payer account and define an organizational unit hierarchy. Invite the existing accounts to join the organization and create new accounts using Organizations.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Require each business unit to use its own AWS accounts. Tag each AWS account appropriately and enable Cost Explorer to administer chargebacks.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Enable all features of AWS Organizations and establish appropriate service control policies that filter IAM permissions for sub-accounts.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Consolidate all of the company's AWS accounts into a single AWS account. Use tags for billing purposes and the IAM’s Access Advisor feature to enforce the least privilege model.",
        "isCorrect": false
      }
    ],
    "comments": "Migración de todo el portfolio: facturación centralizada con visibilidad por unidad y control centralizado de IAM en todas las cuentas, con el MENOR esfuerzo (elegir dos).\n\nOpción A: Plantillas CloudFormation con permisos IAM comunes lanzadas por cuenta es mucho esfuerzo y no centraliza el control.\nOpción B (Correcta): Crear la organización en AWS Organizations desde una cuenta pagadora con jerarquía de OUs, invitar cuentas existentes y crear nuevas desde Organizations. Da facturación consolidada con visibilidad por cuenta.\nOpción C: Cuentas independientes con tags y Cost Explorer no da control centralizado de IAM ni facturación consolidada nativa.\nOpción D (Correcta): Habilitar todas las features de Organizations y usar SCPs para filtrar permisos IAM en las sub-cuentas da el control centralizado de IAM pedido.\nOpción E: Consolidar todo en una única cuenta pierde aislamiento y no es viable ni recomendado.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 2
  },
  {
    "id": 30380,
    "questionNumber": 380,
    "question": "A company has a solution that analyzes weather data from thousands of weather stations. The weather stations send the data over an Amazon API Gateway REST API that has an AWS Lambda function integration. The Lambda function calls a third-party service for data pre-processing. The third-party service gets overloaded and fails the pre-processing, causing a loss of data. A solutions architect must improve the resiliency of the solution. The solutions architect must ensure that no data is lost and that data can be processed later if failures occur. What should the solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon Simple Queue Service (Amazon SQS) queue. Configure the queue as the dead-letter queue for the API.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create two Amazon Simple Queue Service (Amazon SQS) queues: a primary queue and a secondary queue. Configure the secondary queue as the dead-letter queue for the primary queue. Update the API to use a new integration to the primary queue. Configure the Lambda function as the invocation target for the primary queue.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create two Amazon EventBridge event buses: a primary event bus and a secondary event bus. Update the API to use a new integration to the primary event bus. Configure an EventBridge rule to react to all events on the primary event bus. Specify the Lambda function as the target of the rule. Configure the secondary event bus as the failure destination for the Lambda function.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a custom Amazon EventBridge event bus. Configure the event bus as the failure destination for the Lambda function.",
        "isCorrect": false
      }
    ],
    "comments": "API Gateway → Lambda que llama a un tercero que se satura y falla, con PÉRDIDA de datos; hay que garantizar que NO se pierdan datos y poder reprocesar tras fallos.\n\nOpción A: API Gateway no admite una \"dead-letter queue\" directa; el desacople debe hacerse con una cola entre la API y el procesamiento.\nOpción B (Correcta): Dos colas SQS: la primaria recibe (nueva integración desde la API) y desacopla del procesamiento; la Lambda consume de la primaria y la secundaria actúa como DLQ para los mensajes fallidos, permitiendo reprocesar sin pérdida.\nOpción C: EventBridge con bus secundario como destino de fallo de Lambda es más complejo y no garantiza el buffer/retención de la petición entrante como una cola.\nOpción D: Un único event bus como destino de fallo no proporciona el buffer de ingesta ni el reproceso ordenado que da SQS + DLQ.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazon-sqs/latest/developerguide/sqs-dead-letter-queues.html\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-integrations.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30381,
    "questionNumber": 381,
    "question": "A company built an ecommerce website on AWS using a three-tier web architecture. The application is Java-based and composed of an Amazon CloudFront distribution, an Apache web server layer of Amazon EC2 instances in an Auto Scaling group, and a backend Amazon Aurora MySQL database. Last month, during a promotional sales event, users reported errors and timeouts while adding items to their shopping carts. The operations team recovered the logs created by the web servers and reviewed Aurora DB cluster performance metrics. Some of the web servers were terminated before logs could be collected and the Aurora metrics were not sufficient for query performance analysis. Which combination of steps must the solutions architect take to improve application performance visibility during peak traffic events? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Configure the Aurora MySQL DB cluster to publish slow query and error logs to Amazon CloudWatch Logs.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Implement the AWS X-Ray SDK to trace incoming HTTP requests on the EC2 instances and implement tracing of SQL queries with the X-Ray SDK for Java.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Configure the Aurora MySQL DB cluster to stream slow query and error logs to Amazon Kinesis.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Install and configure an Amazon CloudWatch Logs agent on the EC2 instances to send the Apache logs to CloudWatch Logs.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Enable and configure AWS CloudTrail to collect and analyze application activity from Amazon EC2 and Aurora",
        "isCorrect": false
      },
      {
        "letter": "F",
        "text": "Enable Aurora MySQL DB cluster performance benchmarking and publish the stream to AWS X-Ray.",
        "isCorrect": false
      }
    ],
    "comments": "Web three-tier (CloudFront, EC2 Apache en ASG, Aurora MySQL) con errores en picos; se perdieron logs de EC2 terminadas y faltaba análisis de queries. Mejorar la VISIBILIDAD de rendimiento (elegir tres).\n\nOpción A (Correcta): Publicar los logs de slow query y error de Aurora MySQL a CloudWatch Logs conserva la información de consultas lentas fuera de la instancia.\nOpción B (Correcta): X-Ray SDK para trazar las peticiones HTTP en las EC2 y las queries SQL da trazabilidad extremo a extremo del rendimiento.\nOpción C: Enviar los logs de Aurora a Kinesis añade una tubería innecesaria; CloudWatch Logs ya es la integración nativa.\nOpción D (Correcta): Agente de CloudWatch Logs en las EC2 para enviar los logs de Apache a CloudWatch evita perderlos cuando las instancias se terminan.\nOpción E: CloudTrail registra actividad de API de AWS, no rendimiento de la app ni queries SQL.\nOpción F: No existe \"benchmarking a X-Ray\" de Aurora; no es una integración real.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_LogAccess.html\nhttps://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-java.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30382,
    "questionNumber": 382,
    "question": "A company that provisions job boards for a seasonal workforce is seeing an increase in traffic and usage. The backend services run on a pair of Amazon EC2 instances behind an Application Load Balancer with Amazon DynamoDB as the datastore. Application read and write traffic is slow during peak seasons. Which option provides a scalable application architecture to handle peak seasons with the LEAST development effort?",
    "choices": [
      {
        "letter": "A",
        "text": "Migrate the backend services to AWS Lambda. Increase the read and write capacity of DynamoDB.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Migrate the backend services to AWS Lambda. Configure DynamoDB to use global tables.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use Auto Scaling groups for the backend services. Use DynamoDB auto scaling.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Use Auto Scaling groups for the backend services. Use Amazon Simple Queue Service (Amazon SQS) and an AWS Lambda function to write to DynamoDB.",
        "isCorrect": false
      }
    ],
    "comments": "Backend en EC2 tras ALB con DynamoDB, lento en picos estacionales; escalar con el MENOR esfuerzo de desarrollo.\n\nOpción A: Migrar a Lambda exige reescribir la app (esfuerzo) y aumentar capacidad fija de DynamoDB no gestiona bien la variabilidad.\nOpción B: Migrar a Lambda (reescritura) y global tables es para multi-Región, no para escalar rendimiento estacional.\nOpción C (Correcta): Auto Scaling groups para el backend EC2 + DynamoDB auto scaling ajustan capacidad de lectura/escritura automáticamente ante los picos, sin reescribir la aplicación. MÍNIMO esfuerzo de desarrollo.\nOpción D: Añadir SQS + Lambda para escribir en DynamoDB introduce nuevos componentes y desarrollo, más esfuerzo del necesario.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30383,
    "questionNumber": 383,
    "question": "A company is migrating to the cloud. It wants to evaluate the configurations of virtual machines in its existing data center environment to ensure that it can size new Amazon EC2 instances accurately. The company wants to collect metrics, such as CPU, memory, and disk utilization, and it needs an inventory of what processes are running on each instance. The company would also like to monitor network connections to map communications between servers. Which would enable the collection of this data MOST cost effectively?",
    "choices": [
      {
        "letter": "A",
        "text": "Use AWS Application Discovery Service and deploy the data collection agent to each virtual machine in the data center.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Configure the Amazon CloudWatch agent on all servers within the local environment and publish metrics to Amazon CloudWatch Logs.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Use AWS Application Discovery Service and enable agentless discovery in the existing virtualization environment.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Enable AWS Application Discovery Service in the AWS Management Console and configure the corporate firewall to allow scans over a VPN.",
        "isCorrect": false
      }
    ],
    "comments": "Evaluar VMs on-premises para dimensionar EC2: CPU/memoria/disco, inventario de procesos y MAPA de comunicaciones de red, del modo MÁS rentable.\n\nOpción A (Correcta): AWS Application Discovery Service con el Discovery Agent instalado en cada VM recopila métricas de utilización, procesos en ejecución y conexiones de red (mapeo de dependencias). Cubre todos los requisitos.\nOpción B: El agente de CloudWatch recoge métricas de sistema pero no inventario de procesos ni el mapa de dependencias de red de forma nativa para migración.\nOpción C: El discovery agentless (via appliance en el hipervisor) NO captura procesos en ejecución ni el detalle de conexiones que sí da el agente.\nOpción D: No existe un modo de \"escaneo por VPN\" de Application Discovery Service; se usa agente o agentless.\n\nReferencias:\nhttps://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html\nhttps://docs.aws.amazon.com/application-discovery/latest/userguide/discovery-agent.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30384,
    "questionNumber": 384,
    "question": "A company provides a software as a service (SaaS) application that runs in the AWS Cloud. The application runs on Amazon EC2 instances behind a Network Load Balancer (NLB). The instances are in an Auto Scaling group and are distributed across three Availability Zones in a single AWS Region. The company is deploying the application into additional Regions. The company must provide static IP addresses for the application to customers so that the customers can add the IP addresses to allow lists. The solution must automatically route customers to the Region that is geographically closest to them. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an Amazon CloudFront distribution. Create a CloudFront origin group. Add the NLB for each additional Region to the origin group. Provide customers with the IP address ranges of the distribution’s edge locations.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS Global Accelerator standard accelerator. Create a standard accelerator endpoint for the NLB in each additional Region. Provide customers with the Global Accelerator IP address.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Create an Amazon CloudFront distribution. Create a custom origin for the NLB in each additional Region. Provide customers with the IP address ranges of the distribution’s edge locations.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create an AWS Global Accelerator custom routing accelerator. Create a listener for the custom routing accelerator. Add the IP address and ports for the NLB in each additional Region. Provide customers with the Global Accelerator IP address.",
        "isCorrect": false
      }
    ],
    "comments": "SaaS multi-Región tras NLB que necesita IPs estáticas para allow-lists de clientes y enrutar al usuario a la Región geográficamente MÁS cercana.\n\nOpción A: CloudFront no da IPs estáticas fijas para allow-list; sus edge locations usan rangos cambiantes y es para HTTP(S) cacheable.\nOpción B (Correcta): AWS Global Accelerator estándar aporta 2 IPs estáticas Anycast y enruta por el borde más cercano al backend óptimo (NLB por Región), cumpliendo IPs estáticas + proximidad geográfica.\nOpción C: CloudFront con orígenes personalizados tampoco ofrece IPs estáticas para allow-list.\nOpción D: El custom routing accelerator está pensado para mapear puertos a instancias específicas (p.ej. gaming/VoIP), no para el enrutamiento estándar por proximidad hacia NLBs.\n\nReferencias:\nhttps://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html\nhttps://docs.aws.amazon.com/global-accelerator/latest/dg/about-endpoints.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30385,
    "questionNumber": 385,
    "question": "A company is running multiple workloads in the AWS Cloud. The company has separate units for software development. The company uses AWS Organizations and federation with SAML to give permissions to developers to manage resources in their AWS accounts. The development units each deploy their production workloads into a common production account. Recently, an incident occurred in the production account in which members of a development unit terminated an EC2 instance that belonged to a different development unit. A solutions architect must create a solution that prevents a similar incident from happening in the future. The solution also must allow developers the possibility to manage the instances used for their workloads. Which strategy will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create separate OUs in AWS Organizations for each development unit. Assign the created OUs to the company AWS accounts. Create separate SCP with a deny action and a StringNotEquals condition for the DevelopmentUnit resource tag that matches the development unit name. Assign the SCP to the corresponding OU.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Pass an attribute for DevelopmentUnit as an AWS Security Token Service (AWS STS) session tag during SAML federation. Update the IAM policy for the developers’ assumed IAM role with a deny action and a StringNotEquals condition for the DevelopmentUnit resource tag and aws:PrincipalTag/DevelopmentUnit.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Pass an attribute for DevelopmentUnit as an AWS Security Token Service (AWS STS) session tag during SAML federation. Create an SCP with an allow action and a StringEquals condition for the DevelopmentUnit resource tag and aws:PrincipalTag/DevelopmentUnit. Assign the SCP to the root OU.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create separate IAM policies for each development unit. For every IAM policy, add an allow action and a StringEquals condition for the DevelopmentUnit resource tag and the development unit name. During SAML federation, use AWS Security Token Service (AWS STS) to assign the IAM policy and match the development unit name to the assumed IAM role.",
        "isCorrect": false
      }
    ],
    "comments": "Cuenta de producción compartida con federación SAML; un equipo terminó una EC2 de otro equipo. Impedirlo permitiendo que cada equipo gestione SOLO sus instancias (basado en tags).\n\nOpción A: Poner cada unidad en una OU distinta y SCPs por OU no aplica a una ÚNICA cuenta de producción compartida por todos los equipos.\nOpción B (Correcta): Pasar el atributo DevelopmentUnit como session tag de STS en la federación SAML y, en la policy del rol asumido, denegar acciones cuando aws:PrincipalTag/DevelopmentUnit no coincida con el tag DevelopmentUnit del recurso. Cada equipo solo opera sus instancias.\nOpción C: Una SCP de \"allow\" con StringEquals en la raíz no restringe adecuadamente (las SCP son límites, no conceden permisos) y aplicarla a la raíz afecta a todo.\nOpción D: Policies separadas por unidad asignadas por rol es más gestión y no vincula dinámicamente el principal al tag del recurso como el enfoque de session tags.\n\nReferencias:\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30386,
    "questionNumber": 386,
    "question": "An enterprise company is building an infrastructure services platform for its users. The company has the following requirements: • Provide least privilege access to users when launching AWS infrastructure so users cannot provision unapproved services. • Use a central account to manage the creation of infrastructure services. • Provide the ability to distribute infrastructure services to multiple accounts in AWS Organizations. • Provide the ability to enforce tags on any infrastructure that is started by users. Which combination of actions using AWS services will meet these requirements? (Choose three.)",
    "choices": [
      {
        "letter": "A",
        "text": "Develop infrastructure services using AWS CloudFormation templates. Add the templates to a central Amazon S3 bucket and add the IAM roles or users that require access to the S3 bucket policy.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Develop infrastructure services using AWS CloudFormation templates. Upload each template as an AWS Service Catalog product to portfolios created in a central AWS account. Share these portfolios with the Organizations structure created for the company.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Allow user IAM roles to have AWSCloudFormationFullAccess and AmazonS3ReadOnlyAccess permissions. Add an Organizations SCP at the AWS account root user level to deny all services except AWS CloudFormation and Amazon S3.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Allow user IAM roles to have ServiceCatalogEndUserAccess permissions only. Use an automation script to import the central portfolios to local AWS accounts, copy the TagOption, assign users access, and apply launch constraints.",
        "isCorrect": true
      },
      {
        "letter": "E",
        "text": "Use the AWS Service Catalog TagOption Library to maintain a list of tags required by the company. Apply the TagOption to AWS Service Catalog products or portfolios.",
        "isCorrect": true
      },
      {
        "letter": "F",
        "text": "Use the AWS CloudFormation Resource Tags property to enforce the application of tags to any CloudFormation templates that will be created for users.",
        "isCorrect": false
      }
    ],
    "comments": "Plataforma de servicios de infraestructura: mínimo privilegio para que los usuarios no provisionen servicios no aprobados, gestión central, distribución a varias cuentas de Organizations y ENFORCE de tags (elegir tres).\n\nOpción A: Plantillas CloudFormation en un bucket S3 no controlan qué se provisiona ni imponen tags ni el mínimo privilegio de servicios.\nOpción B (Correcta): Desarrollar los servicios como productos de AWS Service Catalog en portfolios de una cuenta central y compartirlos con la estructura de Organizations distribuye de forma gobernada.\nOpción C: Dar CloudFormationFullAccess + SCP de solo CFN/S3 es demasiado amplio y no impone catálogo aprobado ni tags.\nOpción D (Correcta): Roles de usuario con solo ServiceCatalogEndUserAccess e importación de los portfolios centrales a las cuentas locales con TagOptions, acceso y launch constraints, garantiza mínimo privilegio (solo lanzan productos aprobados).\nOpción E (Correcta): La TagOption Library de Service Catalog mantiene los tags requeridos y se aplica a productos/portfolios, forzando el etiquetado.\nOpción F: La propiedad Resource Tags de CloudFormation no fuerza que los usuarios apliquen tags; no es un mecanismo de gobierno.\n\nReferencias:\nhttps://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html\nhttps://docs.aws.amazon.com/servicecatalog/latest/adminguide/tagoptions.html",
    "category": "Complejidad Organizativa",
    "multiSelect": true,
    "requiredCount": 3
  },
  {
    "id": 30387,
    "questionNumber": 387,
    "question": "A company deploys a new web application. As part of the setup, the company configures AWS WAF to log to Amazon S3 through Amazon Kinesis Data Firehose. The company develops an Amazon Athena query that runs once daily to return AWS WAF log data from the previous 24 hours. The volume of daily logs is constant. However, over time, the same query is taking more time to run. A solutions architect needs to design a solution to prevent the query time from continuing to increase. The solution must minimize operational overhead. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an AWS Lambda function that consolidates each day's AWS WAF logs into one log file.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Reduce the amount of data scanned by configuring AWS WAF to send logs to a different S3 bucket each day.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Update the Kinesis Data Firehose configuration to partition the data in Amazon S3 by date and time. Create external tables for Amazon Redshift. Configure Amazon Redshift Spectrum to query the data source.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Modify the Kinesis Data Firehose configuration and Athena table definition to partition the data by date and time. Change the Athena query to view the relevant partitions.",
        "isCorrect": true
      }
    ],
    "comments": "Logs de WAF en S3 vía Firehose consultados con Athena; la query diaria tarda cada vez más al crecer el volumen. Evitar que crezca el tiempo con MÍNIMO overhead.\n\nOpción A: Consolidar logs del día en un fichero con Lambda no reduce el volumen escaneado por Athena a largo plazo ni el crecimiento acumulado.\nOpción B: Un bucket distinto por día requiere reconfigurar tablas y no es la práctica estándar; el particionado es la solución nativa.\nOpción C: Redshift Spectrum con tablas externas añade otro servicio y coste; sobredimensionado para acotar una query diaria.\nOpción D (Correcta): Particionar los datos en S3 por fecha/hora (configuración de Firehose) y definir la tabla Athena particionada, consultando solo las particiones relevantes. Athena escanea únicamente las últimas 24h, manteniendo el tiempo estable con mínimo overhead.\n\nReferencias:\nhttps://docs.aws.amazon.com/athena/latest/ug/partitions.html\nhttps://docs.aws.amazon.com/firehose/latest/dev/dynamic-partitioning.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30388,
    "questionNumber": 388,
    "question": "A company is developing a web application that runs on Amazon EC2 instances in an Auto Scaling group behind a public-facing Application Load Balancer (ALB). Only users from a specific country are allowed to access the application. The company needs the ability to log the access requests that have been blocked. The solution should require the least possible maintenance. Which solution meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create an IPSet containing a list of IP ranges that belong to the specified country. Create an AWS WAF web ACL. Configure a rule to block any requests that do not originate from an IP range in the IPSet. Associate the rule with the web ACL. Associate the web ACL with the ALB.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an AWS WAF web ACL. Configure a rule to block any requests that do not originate from the specified country. Associate the rule with the web ACL. Associate the web ACL with the ALB.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Configure AWS Shield to block any requests that do not originate from the specified country. Associate AWS Shield with the ALB.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Create a security group rule that allows ports 80 and 443 from IP ranges that belong to the specified country. Associate the security group with the ALB.",
        "isCorrect": false
      }
    ],
    "comments": "App tras ALB público accesible solo desde un PAÍS concreto, registrando las peticiones bloqueadas y con el MENOR mantenimiento.\n\nOpción A: Un IPSet manual con rangos por país exige mantener listas de IP enormes y cambiantes; alto mantenimiento.\nOpción B (Correcta): AWS WAF web ACL con una regla de geo-match que bloquee todo lo que no venga del país indicado, asociada al ALB. WAF gestiona la geolocalización y registra las peticiones bloqueadas; mínimo mantenimiento.\nOpción C: AWS Shield protege frente a DDoS; no hace filtrado geográfico por país.\nOpción D: Los security groups no soportan filtrado por país ni registro de bloqueos, y mantener rangos IP es inviable.\n\nReferencias:\nhttps://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-geo-match.html\nhttps://docs.aws.amazon.com/waf/latest/developerguide/logging.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30389,
    "questionNumber": 389,
    "question": "A company is migrating an application from on-premises infrastructure to the AWS Cloud. During migration design meetings, the company expressed concerns about the availability and recovery options for its legacy Windows file server. The file server contains sensitive business-critical data that cannot be recreated in the event of data corruption or data loss. According to compliance requirements, the data must not travel across the public internet. The company wants to move to AWS managed services where possible. The company decides to store the data in an Amazon FSx for Windows File Server file system. A solutions architect must design a solution that copies the data to another AWS Region for disaster recovery (DR) purposes. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a destination Amazon S3 bucket in the DR Region. Establish connectivity between the FSx for Windows File Server file system in the primary Region and the S3 bucket in the DR Region by using Amazon FSx File Gateway. Configure the S3 bucket as a continuous backup source in FSx File Gateway.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Create an FSx for Windows File Server file system in the DR Region. Establish connectivity between the VPC the primary Region and the VPC in the DR Region by using AWS Site-to-Site VPN. Configure AWS DataSync to communicate by using VPN endpoints.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an FSx for Windows File Server file system in the DR Region. Establish connectivity between the VPC in the primary Region and the VPC in the DR Region by using VPC peering. Configure AWS DataSync to communicate by using interface VPC endpoints with AWS PrivateLink.",
        "isCorrect": true
      },
      {
        "letter": "D",
        "text": "Create an FSx for Windows File Server file system in the DR Region. Establish connectivity between the VPC in the primary Region and the VPC in the DR Region by using AWS Transit Gateway in each Region. Use AWS Transfer Family to copy files between the FSx for Windows File Server file system in the primary Region and the FSx for Windows File Server file system in the DR Region over the private AWS backbone network.",
        "isCorrect": false
      }
    ],
    "comments": "DR de FSx for Windows File Server a otra Región copiando datos SIN atravesar Internet.\n\nOpción A: FSx File Gateway con un bucket S3 no replica un sistema de archivos FSx a otra Región; no encaja para DR file-a-file de FSx.\nOpción B: Crear FSx en la Región DR con Site-to-Site VPN cumple privacidad, pero la VPN viaja por Internet; la opción C usa endpoints privados (PrivateLink) sin depender de VPN.\nOpción C (Correcta): Crear FSx for Windows en la Región DR, conectar las VPCs con VPC peering y usar AWS DataSync a través de interface VPC endpoints (PrivateLink). El tráfico va por la red privada de AWS, sin Internet, y DataSync es el servicio gestionado de copia entre sistemas de archivos.\nOpción D: Transit Gateway + AWS Transfer Family no es el mecanismo idóneo para replicar FSx Windows entre Regiones; añade complejidad y Transfer Family es para SFTP/FTPS, no para réplica de FSx.\n\nReferencias:\nhttps://docs.aws.amazon.com/datasync/latest/userguide/using-vpc-endpoints.html\nhttps://docs.aws.amazon.com/fsx/latest/WindowsGuide/migrate-files-fsx-datasync.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30390,
    "questionNumber": 390,
    "question": "A company is currently in the design phase of an application that will need an RPO of less than 5 minutes and an RTO of less than 10 minutes. The solutions architecture team is forecasting that the database will store approximately 10 TB of data. As part of the design, they are looking for a database solution that will provide the company with the ability to fail over to a secondary Region. Which solution will meet these business requirements at the LOWEST cost?",
    "choices": [
      {
        "letter": "A",
        "text": "Deploy an Amazon Aurora DB cluster and take snapshots of the cluster every 5 minutes. Once a snapshot is complete, copy the snapshot to a secondary Region to serve as a backup in the event of a failure.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Deploy an Amazon RDS instance with a cross-Region read replica in a secondary Region. In the event of a failure, promote the read replica to become the primary.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Deploy an Amazon Aurora DB cluster in the primary Region and another in a secondary Region. Use AWS DMS to keep the secondary Region in sync.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Deploy an Amazon RDS instance with a read replica in the same Region. In the event of a failure, promote the read replica to become the primary.",
        "isCorrect": false
      }
    ],
    "comments": "Diseño con RPO <5 min y RTO <10 min, ~10 TB, con failover a Región secundaria al COSTE MÁS BAJO.\n\nOpción A: Snapshots de Aurora cada 5 min y copia a otra Región no garantiza RPO<5min de forma fiable (los snapshots no son continuos) y restaurar es lento (RTO alto).\nOpción B (Correcta): RDS con read replica cross-Región mantiene replicación asíncrona continua (RPO típicamente de segundos/minutos) y ante desastre se promueve la réplica (RTO bajo). Es la opción más económica que cumple RPO/RTO.\nOpción C: Dos clusters Aurora sincronizados con DMS es caro y operativamente complejo frente a una simple read replica.\nOpción D: Una read replica en la MISMA Región no da failover a otra Región; no cumple el requisito multi-Región.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30391,
    "questionNumber": 391,
    "question": "A financial company needs to create a separate AWS account for a new digital wallet application. The company uses AWS Organizations to manage its accounts. A solutions architect uses the IAM user Support1 from the management account to create a new member account with [email protected] as the email address. What should the solutions architect do to create IAM users in the new member account?",
    "choices": [
      {
        "letter": "A",
        "text": "Sign in to the AWS Management Console with AWS account root user credentials by using the 64-character password from the initial AWS Organizations email sent to [email protected] . Set up the IAM users as required.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "From the management account, switch roles to assume the OrganizationAccountAccessRole role with the account ID of the new member account. Set up the IAM users as required.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Go to the AWS Management Console sign-in page. Choose “Sign in using root account credentials.” Sign in in by using the email address finance [email protected] and the management account's root password. Set up the IAM users as required.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Go to the AWS Management Console sign-in page. Sign in by using the account ID of the new member account and the Support1 IAM credentials. Set up the IAM users as required.",
        "isCorrect": false
      }
    ],
    "comments": "Cuenta miembro creada por AWS Organizations; hay que crear usuarios IAM en ella siguiendo la buena práctica (evitar el root).\n\nOpción A: Iniciar sesión con el root de la cuenta miembro (recuperando contraseña) es una mala práctica de seguridad y no es necesario.\nOpción B (Correcta): Desde el management account, cambiar de rol (switch role) al OrganizationAccountAccessRole de la cuenta nueva (ese rol se crea automáticamente en cuentas creadas por Organizations) y crear allí los usuarios IAM. Es el método recomendado sin usar root.\nOpción C: Usar el root del management account con el email de finanzas es incorrecto y mezcla credenciales; no da acceso a la cuenta miembro.\nOpción D: Un usuario IAM del management account (Support1) no puede iniciar sesión en la cuenta miembro con el ID de esta; se requiere asumir el rol.\n\nReferencias:\nhttps://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html\nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-console.html",
    "category": "Complejidad Organizativa",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30392,
    "questionNumber": 392,
    "question": "A car rental company has built a serverless REST API to provide data to its mobile app. The app consists of an Amazon API Gateway API with a Regional endpoint, AWS Lambda functions, and an Amazon Aurora MySQL Serverless DB cluster. The company recently opened the API to mobile apps of partners. A significant increase in the number of requests resulted, causing sporadic database memory errors. Analysis of the API traffic indicates that clients are making multiple HTTP GET requests for the same queries in a short period of time. Traffic is concentrated during business hours, with spikes around holidays and other events. The company needs to improve its ability to support the additional usage while minimizing the increase in costs associated with the solution. Which strategy meets these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Convert the API Gateway Regional endpoint to an edge-optimized endpoint. Enable caching in the production stage.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Implement an Amazon ElastiCache for Redis cache to store the results of the database calls. Modify the Lambda functions to use the cache.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Modify the Aurora Serverless DB cluster configuration to increase the maximum amount of available memory.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Enable throttling in the API Gateway production stage. Set the rate and burst values to limit the incoming calls.",
        "isCorrect": false
      }
    ],
    "comments": "API Gateway (regional) + Lambda + Aurora Serverless; clientes repiten los mismos GET, causando errores de memoria en la BD. Soportar el uso extra MINIMIZANDO el aumento de coste.\n\nOpción A (Correcta): Convertir a endpoint edge-optimized y habilitar el caché de API Gateway en el stage sirve las respuestas repetidas desde caché, reduciendo llamadas a Lambda/BD y aliviando la memoria de Aurora con coste bajo.\nOpción B: ElastiCache for Redis exige modificar las Lambdas y operar un clúster adicional; más coste y complejidad que el caché nativo de API Gateway.\nOpción C: Aumentar la memoria de Aurora Serverless sube el coste continuamente y no ataca la causa (peticiones repetidas).\nOpción D: El throttling limita peticiones (degrada a clientes) pero no resuelve los GET repetidos ni mejora la experiencia; no es la mejor opción.\n\nReferencias:\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html\nhttps://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-endpoint-types.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30393,
    "questionNumber": 393,
    "question": "A company is migrating an on-premises application and a MySQL database to AWS. The application processes highly sensitive data, and new data is constantly updated in the database. The data must not be transferred over the internet. The company also must encrypt the data in transit and at rest. The database is 5 TB in size. The company already has created the database schema in an Amazon RDS for MySQL DB instance. The company has set up a 1 Gbps AWS Direct Connect connection to AWS. The company also has set up a public VIF and a private VIF. A solutions architect needs to design a solution that will migrate the data to AWS with the least possible downtime. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Perform a database backup. Copy the backup files to an AWS Snowball Edge Storage Optimized device. Import the backup to Amazon S3. Use server-side encryption with Amazon S3 managed encryption keys (SSE-S3) for encryption at rest. Use TLS for encryption in transit. Import the data from Amazon S3 to the DB instance.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Use AWS Database Migration Service (AWS DMS) to migrate the data to AWS. Create a DMS replication instance in a private subnet. Create VPC endpoints for AWS DMS. Configure a DMS task to copy data from the on-premises database to the DB instance by using full load plus change data capture (CDC). Use the AWS Key Management Service (AWS KMS) default key for encryption at rest. Use TLS for encryption in transit.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Perform a database backup. Use AWS DataSync to transfer the backup files to Amazon S3. Use server-side encryption with Amazon S3 managed encryption keys (SSE-S3) for encryption at rest. Use TLS for encryption in transit. Import the data from Amazon S3 to the DB instance.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Use Amazon S3 File Gateway. Set up a private connection to Amazon S3 by using AWS PrivateLink. Perform a database backup. Copy the backup files to Amazon S3. Use server-side encryption with Amazon S3 managed encryption keys (SSE-S3) for encryption at rest. Use TLS for encryption in transit. Import the data from Amazon S3 to the DB instance.",
        "isCorrect": false
      }
    ],
    "comments": "Migrar MySQL on-premises (5 TB, actualizaciones constantes) a RDS MySQL SIN pasar por Internet, cifrado en tránsito y reposo y con el MENOR downtime, sobre Direct Connect.\n\nOpción A: Snowball Edge + S3 implica una carga inicial física y un corte grande de datos cambiantes; no da downtime mínimo con actualizaciones constantes.\nOpción B (Correcta): AWS DMS con instancia de réplica en subred privada y VPC endpoints (privado), tarea full load + CDC replica la carga inicial y luego los cambios en continuo, minimizando el downtime; cifrado con KMS en reposo y TLS en tránsito, todo por Direct Connect (privado).\nOpción C: DataSync a S3 + import es para ficheros/objetos y no captura cambios continuos (CDC); downtime alto.\nOpción D: S3 File Gateway + backup a S3 tampoco ofrece CDC ni migración con downtime mínimo para una BD activa.\n\nReferencias:\nhttps://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.html\nhttps://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html",
    "category": "Migración y Modernización",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30394,
    "questionNumber": 394,
    "question": "Accompany is deploying a new cluster for big data analytics on AWS. The cluster will run across many Linux Amazon EC2 instances that are spread across multiple Availability Zones. All of the nodes in the cluster must have read and write access to common underlying file storage. The file storage must be highly available, must be resilient, must be compatible with the Portable Operating System Interface (POSIX), and must accommodate high levels of throughput. Which storage solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Provision an AWS Storage Gateway file gateway NFS file share that is attached to an Amazon S3 bucket. Mount the NFS file share on each EC2 instance in the cluster.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Provision a new Amazon Elastic File System (Amazon EFS) file system that uses General Purpose performance mode. Mount the EFS file system on each EC2 instance in the cluster.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Provision a new Amazon Elastic Block Store (Amazon EBS) volume that uses the io2 volume type. Attach the EBS volume to all of the EC2 instances in the cluster.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Provision a new Amazon Elastic File System (Amazon EFS) file system that uses Max I/O performance mode. Mount the EFS file system on each EC2 instance in the cluster.",
        "isCorrect": true
      }
    ],
    "comments": "Clúster de big data en muchas EC2 Linux multi-AZ que necesitan almacenamiento COMPARTIDO, HA, resiliente, POSIX y ALTO throughput.\n\nOpción A: Storage Gateway file gateway NFS sobre S3 no está diseñado para acceso concurrente POSIX de alto rendimiento de un clúster; es para integración de ficheros con S3.\nOpción B: EFS General Purpose es POSIX y multi-AZ, pero para niveles muy altos de throughput agregado con muchos nodos, Max I/O escala mejor.\nOpción C: EBS io2 no se puede montar simultáneamente en muchas instancias entre AZs (Multi-Attach es limitado y no cross-AZ); no cumple compartición amplia.\nOpción D (Correcta): Amazon EFS en modo Max I/O da un sistema de archivos POSIX, compartido, altamente disponible y resiliente entre AZs, con throughput escalable para clústeres grandes con acceso concurrente masivo.\n\nReferencias:\nhttps://docs.aws.amazon.com/efs/latest/ug/performance.html\nhttps://docs.aws.amazon.com/efs/latest/ug/whatisefs.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30395,
    "questionNumber": 395,
    "question": "A company hosts a software as a service (SaaS) solution on AWS. The solution has an Amazon API Gateway API that serves an HTTPS endpoint. The API uses AWS Lambda functions for compute. The Lambda functions store data in an Amazon Aurora Serverless v1 database. The company used the AWS Serverless Application Model (AWS SAM) to deploy the solution. The solution extends across multiple Availability Zones and has no disaster recovery (DR) plan. A solutions architect must design a DR strategy that can recover the solution in another AWS Region. The solution has an RTO of 5 minutes and an RPO of 1 minute. What should the solutions architect do to meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Create a read replica of the Aurora Serverless v1 database in the target Region. Use AWS SAM to create a runbook to deploy the solution to the target Region. Promote the read replica to primary in case of disaster.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Change the Aurora Serverless v1 database to a standard Aurora MySQL global database that extends across the source Region and the target Region. Use AWS SAM to create a runbook to deploy the solution to the target Region.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Create an Aurora Serverless v1 DB cluster that has multiple writer instances in the target Region. Launch the solution in the target Region. Configure the two Regional solutions to work in an active-passive configuration.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Change the Aurora Serverless v1 database to a standard Aurora MySQL global database that extends across the source Region and the target Region. Launch the solution in the target Region. Configure the two Regional solutions to work in an active-passive configuration.",
        "isCorrect": true
      }
    ],
    "comments": "SaaS serverless (API Gateway + Lambda + Aurora Serverless v1) sin DR; diseñar DR a otra Región con RTO 5 min y RPO 1 min.\n\nOpción A: Una read replica de Aurora Serverless v1 y \"runbook\" para desplegar bajo demanda no alcanza RTO de 5 min de forma fiable (el despliegue reactivo es lento).\nOpción B: Convertir a Aurora Global Database es correcto para el dato, pero desplegar la solución solo mediante runbook al ocurrir el desastre alarga el RTO.\nOpción C: Aurora Serverless v1 no soporta múltiples writers ni una topología global que dé RPO 1 min entre Regiones de este modo.\nOpción D (Correcta): Migrar a Aurora Global Database (replicación cross-Región con RPO típico de segundos, cumple <1 min) y tener la solución YA lanzada en la Región destino en active-passive, lista para asumir tráfico. Cumple RTO 5 min y RPO 1 min.\n\nReferencias:\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html\nhttps://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html",
    "category": "Mejora Continua (Resiliencia, Seguridad y Rendimiento)",
    "multiSelect": false,
    "requiredCount": 1
  },
  {
    "id": 30396,
    "questionNumber": 396,
    "question": "A company owns a chain of travel agencies and is running an application in the AWS Cloud. Company employees use the application to search for information about travel destinations. Destination content is updated four times each year. Two fixed Amazon EC2 instances serve the application. The company uses an Amazon Route 53 public hosted zone with a multivalue record of travel.example.com that returns the Elastic IP addresses for the EC2 instances. The application uses Amazon DynamoDB as its primary data store. The company uses a self-hosted Redis instance as a caching solution. During content updates, the load on the EC2 instances and the caching solution increases drastically. This increased load has led to downtime on several occasions. A solutions architect must update the application so that the application is highly available and can handle the load that is generated by the content updates. Which solution will meet these requirements?",
    "choices": [
      {
        "letter": "A",
        "text": "Set up DynamoDB Accelerator (DAX) as in-memory cache. Update the application to use DAX. Create an Auto Scaling group for the EC2 instances. Create an Application Load Balancer (ALB). Set the Auto Scaling group as a target for the ALB. Update the Route 53 record to use a simple routing policy that targets the ALB's DNS alias. Configure scheduled scaling for the EC2 instances before the content updates.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Set up Amazon ElastiCache for Redis. Update the application to use ElastiCache. Create an Auto Scaling group for the EC2 instances. Create an Amazon CloudFront distribution, and set the Auto Scaling group as an origin for the distribution. Update the Route 53 record to use a simple routing policy that targets the CloudFront distribution’s DNS alias. Manually scale up EC2 instances before the content updates.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Set up Amazon ElastiCache for Memcached. Update the application to use ElastiCache. Create an Auto Scaling group for the EC2 instances. Create an Application Load Balancer (ALB). Set the Auto Scaling group as a target for the ALB. Update the Route 53 record to use a simple routing policy that targets the ALB's DNS alias. Configure scheduled scaling for the application before the content updates.",
        "isCorrect": false
      },
      {
        "letter": "D",
        "text": "Set up DynamoDB Accelerator (DAX) as in-memory cache. Update the application to use DAX. Create an Auto Scaling group for the EC2 instances. Create an Amazon CloudFront distribution, and set the Auto Scaling group as an origin for the distribution. Update the Route 53 record to use a simple routing policy that targets the CloudFront distribution's DNS alias. Manually scale up EC2 instances before the content updates.",
        "isCorrect": false
      }
    ],
    "comments": "App de destinos de viaje: 2 EC2 fijas con Route 53 multivalue e IPs elásticas, DynamoDB y Redis autogestionado; picos al actualizar contenido (4 veces/año) causan caídas. Hacerla ALTAMENTE DISPONIBLE y capaz de absorber la carga de las actualizaciones.\n\nOpción A (Correcta): DAX como caché in-memory (gestionado, delante de DynamoDB) sustituye al Redis autogestionado; ASG para las EC2 tras un ALB con alias en Route 53 (routing simple); scheduled scaling antes de las actualizaciones (fechas conocidas). HA y absorción de picos con operación gestionada.\nOpción B: ElastiCache Redis sigue requiriendo más gestión que DAX para este caso, CloudFront con ASG como origen no encaja bien y el escalado MANUAL no es fiable para los picos.\nOpción C: ElastiCache Memcached carece de persistencia/HA de Redis/DAX y el resto es correcto, pero DAX es la caché idónea para DynamoDB.\nOpción D: DAX es correcto, pero CloudFront con ASG como origen y escalado MANUAL no garantiza absorber los picos de forma automática ni es el patrón óptimo aquí.\n\nReferencias:\nhttps://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html\nhttps://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scheduled-scaling.html",
    "category": "Diseño de Nuevas Soluciones",
    "multiSelect": false,
    "requiredCount": 1
  }
];
