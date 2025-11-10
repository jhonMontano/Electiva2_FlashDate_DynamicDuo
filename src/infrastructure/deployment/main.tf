module "ecr" {
  source          = "./modules/ecr"
  repository_name = var.repository_name
  project_name    = var.project_name
  environment     = var.environment
}

module "networking" {
  source       = "./modules/networking"
  sg_name      = var.sg_name
  vpc_id       = var.vpc_id
  project_name = var.project_name
  environment  = var.environment
}

module "target_group" {
  source       = "./modules/target_group"
  tg_name      = var.tg_name
  port         = var.tg_port
  vpc_id       = var.vpc_id
  project_name = var.project_name
  environment  = var.environment
}

module "load_balancer" {
  source            = "./modules/load_balancer"
  lb_name           = var.lb_name
  security_group_id = module.networking.security_group_id
  subnet_ids        = var.subnet_ids
  target_group_arn  = module.target_group.target_group_arn
  project_name      = var.project_name
  environment       = var.environment
}

module "iam" {
  source       = "./modules/iam"
  role_name    = var.role_name
  project_name = var.project_name
  environment  = var.environment
  aws_region   = var.aws_region
  account_id   = var.account_id
}

module "ssm_parameters" {
  source       = "./modules/ssm_parameters"
  jwt_secret   = var.jwt_secret
  mongo_uri    = var.mongo_uri
  port         = var.port
  project_name = var.project_name
  environment  = var.environment
}

module "logging" {
  source       = "./modules/logging"
  project_name = var.project_name
  environment  = var.environment
}

module "ecs" {
  source              = "./modules/ecs"
  cluster_name        = var.cluster_name
  task_family         = var.task_family
  service_name        = var.service_name
  image_uri           = var.image_uri
  execution_role_arn  = module.iam.ecs_task_execution_role_arn
  jwt_secret_arn      = "arn:aws:ssm:${var.aws_region}:${var.account_id}:parameter/${var.project_name}/${var.environment}/jwtsecret"
  mongo_uri_arn       = "arn:aws:ssm:${var.aws_region}:${var.account_id}:parameter/${var.project_name}/${var.environment}/mogourl"
  port_arn            = "arn:aws:ssm:${var.aws_region}:${var.account_id}:parameter/${var.project_name}/${var.environment}/port"
  subnet_ids          = var.subnet_ids
  security_group_id   = module.networking.security_group_id
  target_group_arn    = module.target_group.target_group_arn
  project_name        = var.project_name
  environment         = var.environment
  aws_region          = var.aws_region
}

module "api_gateway" {
  source       = "./modules/api_gateway"
  api_name     = var.api_name
  lb_url       = var.lb_url
  project_name = var.project_name
  environment  = var.environment
}