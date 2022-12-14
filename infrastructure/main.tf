/*===========================
          Root file
============================*/

# ------- Providers -------
provider "aws" {
  profile = var.aws_profile
  region  = var.aws_region
}

# ------- Random numbers intended to be used as unique identifiers for resources -------
resource "random_id" "RANDOM_ID" {
  byte_length = "2"
}

# ------- Account ID -------
data "aws_caller_identity" "id_current_account" {}

# ------- Networking -------
module "networking" {
  source = "./modules/Networking"
  cidr   = ["10.120.0.0/16"]
  name   = var.environment_name
}

# ------- Creating Target Group for the server ALB blue environment -------
module "target_group_server_blue" {
  source              = "./modules/ALB"
  create_target_group = true
  name                = "tg-${var.environment_name}-s-b"
  port                = 80
  protocol            = "HTTP"
  vpc                 = module.networking.aws_vpc
  tg_type             = "ip"
  health_check_path   = "/api/health"
  health_check_port   = var.port_app_server
}

# ------- Creating Target Group for the server ALB green environment -------
module "target_group_server_green" {
  source              = "./modules/ALB"
  create_target_group = true
  name                = "tg-${var.environment_name}-s-g"
  port                = 80
  protocol            = "HTTP"
  vpc                 = module.networking.aws_vpc
  tg_type             = "ip"
  health_check_path   = "/api/health"
  health_check_port   = var.port_app_server
}

# ------- Creating Target Group for the client ALB blue environment -------
module "target_group_client_blue" {
  source              = "./modules/ALB"
  create_target_group = true
  name                = "tg-${var.environment_name}-c-b"
  port                = 80
  protocol            = "HTTP"
  vpc                 = module.networking.aws_vpc
  tg_type             = "ip"
  health_check_path   = "/"
  health_check_port   = var.port_app_client
}

# ------- Creating Target Group for the client ALB green environment -------
module "target_group_client_green" {
  source              = "./modules/ALB"
  create_target_group = true
  name                = "tg-${var.environment_name}-c-g"
  port                = 80
  protocol            = "HTTP"
  vpc                 = module.networking.aws_vpc
  tg_type             = "ip"
  health_check_path   = "/"
  health_check_port   = var.port_app_client
}

# ------- Creating Security Group for the server ALB -------
module "security_group_alb_server" {
  source              = "./modules/SecurityGroup"
  name                = "alb-${var.environment_name}-server"
  description         = "Controls access to the server ALB"
  vpc_id              = module.networking.aws_vpc
  cidr_blocks_ingress = ["0.0.0.0/0"]
  ingress_port        = 80
  security_groups     = [module.security_group_rds_postgres.sg_id]
}

# ------- Creating Security Group for the client ALB -------
module "security_group_alb_client" {
  source              = "./modules/SecurityGroup"
  name                = "alb-${var.environment_name}-client"
  description         = "Controls access to the client ALB"
  vpc_id              = module.networking.aws_vpc
  cidr_blocks_ingress = ["0.0.0.0/0"]
  ingress_port        = 80
}

# ------- Creating Security Group for the Postgres RDS -------
module "security_group_rds_postgres" {
  source              = "./modules/SecurityGroup"
  name                = "rds-${var.environment_name}-postgres"
  description         = "Controls access to the Postgres RDS"
  vpc_id              = module.networking.aws_vpc
  cidr_blocks_ingress = ["0.0.0.0/0"]
  ingress_port        = 5432
  # security_groups     = [module.security_group_alb_server.sg_id]
}

# ------- Creating Security Group for CodeBuild -------
module "security_group_codebuild" {
  source      = "./modules/SecurityGroup"
  name        = "codebuild-${var.environment_name}-sg"
  description = "Controls access to the CodeBuild"
  vpc_id      = module.networking.aws_vpc
  egress_port = 0
}


# ------- Creating Server Application ALB -------
module "alb_server" {
  source         = "./modules/ALB"
  create_alb     = true
  name           = "${var.environment_name}-ser"
  subnets        = [module.networking.public_subnets[0], module.networking.public_subnets[1]]
  security_group = module.security_group_alb_server.sg_id
  target_group   = module.target_group_server_blue.arn_tg
}

# ------- Creating Client Application ALB -------
module "alb_client" {
  source         = "./modules/ALB"
  create_alb     = true
  name           = "${var.environment_name}-cli"
  subnets        = [module.networking.public_subnets[0], module.networking.public_subnets[1]]
  security_group = module.security_group_alb_client.sg_id
  target_group   = module.target_group_client_blue.arn_tg
}

# ------- ECS Role -------
module "ecs_role" {
  source             = "./modules/IAM"
  create_ecs_role    = true
  name               = var.iam_role_name["ecs"]
  name_ecs_task_role = var.iam_role_name["ecs_task_role"]  
}

# ------- Creating a IAM Policy for role -------
module "ecs_role_policy" {
  source        = "./modules/IAM"
  name          = "ecs-ecr-${var.environment_name}"
  create_policy = true
  attach_to     = module.ecs_role.name_role
}

module "ecr_server" {
  source = "./modules/ECR"
  name   = "repo-server"
}

# ------- Creating client ECR Repository to store Docker Images -------
module "ecr_client" {
  source = "./modules/ECR"
  name   = "repo-client"
}

# ------- Creating ECS Task Definition for the server -------
module "ecs_taks_definition_server" {
  source             = "./modules/ECS/TaskDefinition"
  name               = "${var.environment_name}-server"
  container_name     = var.container_name["server"]
  execution_role_arn = module.ecs_role.arn_role
  task_role_arn      = module.ecs_role.arn_role_ecs_task_role
  cpu                = 256
  memory             = "512"
  docker_repo        = module.ecr_server.ecr_repository_url
  region             = var.aws_region
  container_port     = var.port_app_server
}

# ------- Creating ECS Task Definition for the client -------
module "ecs_taks_definition_client" {
  source             = "./modules/ECS/TaskDefinition"
  name               = "${var.environment_name}-client"
  container_name     = var.container_name["client"]
  execution_role_arn = module.ecs_role.arn_role
  task_role_arn      = module.ecs_role.arn_role_ecs_task_role
  cpu                = 256
  memory             = "512"
  docker_repo        = module.ecr_client.ecr_repository_url
  region             = var.aws_region
  container_port     = var.port_app_client
}

# ------- Creating a server Security Group for ECS TASKS -------
module "security_group_ecs_task_server" {
  source          = "./modules/SecurityGroup"
  name            = "ecs-task-${var.environment_name}-server"
  description     = "Controls access to the server ECS task"
  vpc_id          = module.networking.aws_vpc
  ingress_port    = var.port_app_server
  security_groups = [module.security_group_alb_server.sg_id]
}
# ------- Creating a client Security Group for ECS TASKS -------
module "security_group_ecs_task_client" {
  source          = "./modules/SecurityGroup"
  name            = "ecs-task-${var.environment_name}-client"
  description     = "Controls access to the client ECS task"
  vpc_id          = module.networking.aws_vpc
  ingress_port    = var.port_app_client
  security_groups = [module.security_group_alb_client.sg_id]
}

# ------- Creating ECS Cluster -------
module "ecs_cluster" {
  source = "./modules/ECS/Cluster"
  name   = var.environment_name
}

# ------- Creating ECS Service server -------
module "ecs_service_server" {
  depends_on             = [module.alb_server]
  source                 = "./modules/ECS/Service"
  name                   = "${var.environment_name}-server"
  desired_tasks          = 1
  arn_security_group     = module.security_group_ecs_task_server.sg_id
  ecs_cluster_id         = module.ecs_cluster.ecs_cluster_id
  arn_target_group       = module.target_group_server_blue.arn_tg
  arn_task_definition    = module.ecs_taks_definition_server.arn_task_definition
  subnets_id             = [module.networking.private_subnets_server[0], module.networking.private_subnets_server[1], module.networking.rds_subnet[0], module.networking.rds_subnet[1]]
  container_port         = var.port_app_server
  container_name         = var.container_name["server"]
  enable_execute_command = true
}

# ------- Creating ECS Service client -------
module "ecs_service_client" {
  depends_on          = [module.alb_client]
  source              = "./modules/ECS/Service"
  name                = "${var.environment_name}-client"
  desired_tasks       = 1
  arn_security_group  = module.security_group_ecs_task_client.sg_id
  ecs_cluster_id      = module.ecs_cluster.ecs_cluster_id
  arn_target_group    = module.target_group_client_blue.arn_tg
  arn_task_definition = module.ecs_taks_definition_client.arn_task_definition
  subnets_id          = [module.networking.private_subnets_client[0], module.networking.private_subnets_client[1]]
  container_port      = var.port_app_client
  container_name      = var.container_name["client"]
}

# ------- Creating ECS Autoscaling policies for the server application -------
module "ecs_autoscaling_server" {
  depends_on   = [module.ecs_service_server]
  source       = "./modules/ECS/Autoscaling"
  name         = "${var.environment_name}-server"
  cluster_name = module.ecs_cluster.ecs_cluster_name
  min_capacity = 1
  max_capacity = 4
}

# ------- Creating ECS Autoscaling policies for the client application -------
module "ecs_autoscaling_client" {
  depends_on   = [module.ecs_service_client]
  source       = "./modules/ECS/Autoscaling"
  name         = "${var.environment_name}-client"
  cluster_name = module.ecs_cluster.ecs_cluster_name
  min_capacity = 1
  max_capacity = 4
}

# ------- CodePipeline -------

# ------- Creating Bucket to store CodePipeline artifacts -------
module "s3_codepipeline" {
  source      = "./modules/S3"
  bucket_name = "codepipeline-${var.aws_region}-${random_id.RANDOM_ID.hex}"
}

# ------- Creating IAM roles used during the pipeline excecution -------
module "devops_role" {
  source             = "./modules/IAM"
  create_devops_role = true
  name               = var.iam_role_name["devops"]
}

module "codedeploy_role" {
  source                 = "./modules/IAM"
  create_codedeploy_role = true
  name                   = var.iam_role_name["codedeploy"]
}

# ------- Creating an IAM Policy for role ------- 
module "policy_devops_role" {
  source                = "./modules/IAM"
  name                  = "devops-${var.environment_name}"
  create_policy         = true
  attach_to             = module.devops_role.name_role
  create_devops_policy  = true
  ecr_repositories      = [module.ecr_server.ecr_repository_arn, module.ecr_client.ecr_repository_arn]
  code_build_projects   = [module.codebuild_client.project_arn, module.codebuild_server.project_arn]
  code_deploy_resources = [module.codedeploy_server.application_arn, module.codedeploy_server.deployment_group_arn, module.codedeploy_client.application_arn, module.codedeploy_client.deployment_group_arn] 
}

# ------- Creating a SNS topic -------
module "sns" {
  source   = "./modules/SNS"
  sns_name = "sns-${var.environment_name}"
}

# ------- Creating the server CodeBuild project -------
module "codebuild_server" {
  source                 = "./modules/CodeBuild"
  name                   = "codebuild-${var.environment_name}-server"
  iam_role               = module.devops_role.arn_role
  region                 = var.aws_region
  account_id             = data.aws_caller_identity.id_current_account.account_id
  ecr_repo_url           = module.ecr_server.ecr_repository_url
  folder_path            = var.folder_path_server
  buildspec_path         = var.buildspec_path
  task_definition_family = module.ecs_taks_definition_server.task_definition_family
  container_name         = var.container_name["server"]
  service_port           = var.port_app_server
  ecs_role               = var.iam_role_name["ecs"]
  ecs_task_role          = var.iam_role_name["ecs_task_role"]
  server_alb_url         = module.alb_server.dns_alb
  db_endpoint            = module.rds.db_endpoint
  vpc_id                 = module.networking.aws_vpc
  security_group_ids     = [module.security_group_rds_postgres.sg_id]
  subnet_ids             = [module.networking.private_subnets_server[0], module.networking.private_subnets_server[1]]
  depends_on = [
    module.devops_role
  ]

}

# ------- Creating the client CodeBuild project -------
module "codebuild_client" {
  source                 = "./modules/CodeBuild"
  name                   = "codebuild-${var.environment_name}-client"
  iam_role               = module.devops_role.arn_role
  region                 = var.aws_region
  account_id             = data.aws_caller_identity.id_current_account.account_id
  ecr_repo_url           = module.ecr_client.ecr_repository_url
  folder_path            = var.folder_path_client
  buildspec_path         = var.buildspec_path
  task_definition_family = module.ecs_taks_definition_client.task_definition_family
  container_name         = var.container_name["client"]
  service_port           = var.port_app_client
  ecs_role               = var.iam_role_name["ecs"]
  server_alb_url         = module.alb_server.dns_alb
}

# ------- Creating the server CodeDeploy project -------
module "codedeploy_server" {
  source          = "./modules/CodeDeploy"
  name            = "Deploy-${var.environment_name}-server"
  ecs_cluster     = module.ecs_cluster.ecs_cluster_name
  ecs_service     = module.ecs_service_server.ecs_service_name
  alb_listener    = module.alb_server.arn_listener
  tg_blue         = module.target_group_server_blue.tg_name
  tg_green        = module.target_group_server_green.tg_name
  sns_topic_arn   = module.sns.sns_arn
  codedeploy_role = module.codedeploy_role.arn_role_codedeploy
}

# ------- Creating the client CodeDeploy project -------
module "codedeploy_client" {
  source          = "./modules/CodeDeploy"
  name            = "Deploy-${var.environment_name}-client"
  ecs_cluster     = module.ecs_cluster.ecs_cluster_name
  ecs_service     = module.ecs_service_client.ecs_service_name
  alb_listener    = module.alb_client.arn_listener
  tg_blue         = module.target_group_client_blue.tg_name
  tg_green        = module.target_group_client_green.tg_name
  sns_topic_arn   = module.sns.sns_arn
  codedeploy_role = module.codedeploy_role.arn_role_codedeploy
}

# ------- Creating CodePipeline -------
module "codepipeline" {
  source                   = "./modules/CodePipeline"
  name                     = "pipeline-${var.environment_name}"
  pipe_role                = module.devops_role.arn_role
  s3_bucket                = module.s3_codepipeline.s3_bucket_id
  github_token             = var.github_token
  repo_owner               = var.repository_owner
  repo_name                = var.repository_name
  branch                   = var.repository_branch
  codebuild_project_server = module.codebuild_server.project_id
  codebuild_project_client = module.codebuild_client.project_id
  app_name_server          = module.codedeploy_server.application_name
  app_name_client          = module.codedeploy_client.application_name
  deployment_group_server  = module.codedeploy_server.deployment_group_name
  deployment_group_client  = module.codedeploy_client.deployment_group_name

  depends_on = [module.policy_devops_role]
}

# ------- Creating RDS Postgres -------

module "rds" {
  source = "./modules/RDS"

  # All available versions: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html#PostgreSQL.Concepts
  engine         = "postgres"
  engine_version = "14.5"
  family         = "postgres14" # DB parameter group
  # major_engine_version = "14"         # DB option group
  instance_class = "db.t4g.large"

  allocated_storage     = 20
  max_allocated_storage = 20

  # NOTE: Do NOT use 'user' as the value for 'username' as it throws:
  # "Error creating DB Instance: InvalidParameterValue: MasterUsername
  # user cannot be used as it is a reserved word used by the engine"
  db_name                             = var.db_name
  password                            = var.db_password
  username                            = var.db_username
  port                                = var.db_port
  iam_database_authentication_enabled = false
  storage_encrypted                   = true

  multi_az               = false
  vpc_security_group_ids = [module.security_group_rds_postgres.sg_id, module.security_group_ecs_task_server.sg_id, module.security_group_codebuild.sg_id]
  db_subnets             = module.networking.rds_subnet

  # maintenance_window              = "Mon:00:00-Mon:03:00"
  # backup_window                   = "03:00-06:00"
  # enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]
  # create_cloudwatch_log_group     = true

  # backup_retention_period = 1
  # skip_final_snapshot     = true
  # deletion_protection     = false

  # performance_insights_enabled          = true
  # performance_insights_retention_period = 7
  # create_monitoring_role                = true
  # monitoring_interval                   = 60
  # monitoring_role_name                  = "example-monitoring-role-name"
  # monitoring_role_use_name_prefix       = true
  # monitoring_role_description           = "Description for monitoring role"

  # parameters = [
  #   {
  #     name  = "autovacuum"
  #     value = 1
  #   },
  #   {
  #     name  = "client_encoding"
  #     value = "utf8"
  #   }
  # ]

  # tags = local.tags
  # db_option_group_tags = {
  #   "Sensitive" = "low"
  # }
  # db_parameter_group_tags = {
  #   "Sensitive" = "low"
  # }
}

# module "db_default" {
#   source = "../../"

#   identifier                     = "${local.name}-default"
#   instance_use_identifier_prefix = true

#   create_db_option_group    = false
#   create_db_parameter_group = false

#   # All available versions: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html#PostgreSQL.Concepts
#   engine               = "postgres"
#   engine_version       = "14.5"
#   family               = "postgres14" # DB parameter group
#   major_engine_version = "14"         # DB option group
#   instance_class       = "db.t3.micro"

#   allocated_storage = 20

#   # NOTE: Do NOT use 'user' as the value for 'username' as it throws:
#   # "Error creating DB Instance: InvalidParameterValue: MasterUsername
#   # user cannot be used as it is a reserved word used by the engine"
#   db_name  = "spotter"
#   username = "spotter"
#   port     = 5432

#   db_subnet_group_name   = module.vpc.database_subnet_group
#   vpc_security_group_ids = [module.security_group.security_group_id]

#   maintenance_window      = "Mon:00:00-Mon:03:00"
#   backup_window           = "03:00-06:00"
#   backup_retention_period = 0

#   tags = local.tags
# }

# module "db_disabled" {
#   source = "../../"

#   identifier = "${local.name}-disabled"

#   create_db_instance        = false
#   create_db_parameter_group = false
#   create_db_option_group    = false
# }

