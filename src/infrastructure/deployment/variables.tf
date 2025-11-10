# --- Configuración general ---
variable "aws_region" {
  description = "Región de AWS donde se desplegarán los recursos"
  type        = string
}

variable "project_name" {
  description = "Nombre del proyecto (usado para nombrar recursos)"
  type        = string
}

variable "repository_name" {
  description = "Nombre del repositorio ECR"
  type        = string
}

variable "environment" {
  description = "Ambiente de despliegue (dev, staging, prod)"
  type        = string
}

# --- Red y seguridad ---
variable "vpc_id" {
  description = "ID de la VPC donde se desplegarán los recursos"
  type        = string
}

variable "subnet_ids" {
  description = "Lista de subnets para el ECS y el Load Balancer"
  type        = list(string)
}

variable "sg_name" {
  description = "Nombre del Security Group principal del ECS"
  type        = string
}

# --- Target Group ---
variable "tg_name" {
  description = "Nombre del Target Group para el Load Balancer"
  type        = string
}

variable "tg_port" {
  description = "Puerto del Target Group"
  type        = number
}

# --- Load Balancer ---
variable "lb_name" {
  description = "Nombre del Load Balancer"
  type        = string
}

# --- IAM ---
variable "role_name" {
  description = "Nombre del rol IAM de ejecución de ECS"
  type        = string
}

variable "account_id" {
  description = "ID de cuenta AWS"
  type        = string
}

# --- Parámetros SSM ---
variable "jwt_secret" {
  description = "Clave JWT que se guarda en SSM Parameter Store"
  type        = string
}

variable "mongo_uri" {
  description = "URI de conexión a MongoDB"
  type        = string
}

variable "port" {
  description = "Puerto en el que corre la aplicación"
  type        = string
}

# --- ECS ---
variable "cluster_name" {
  description = "Nombre del cluster ECS"
  type        = string
}

variable "task_family" {
  description = "Nombre de la familia de tareas ECS"
  type        = string
}

variable "service_name" {
  description = "Nombre del servicio ECS"
  type        = string
}

variable "image_uri" {
  description = "URI de la imagen en ECR"
  type        = string
}

# --- API Gateway ---
variable "api_name" {
  description = "Nombre del API Gateway"
  type        = string
}

variable "lb_url" {
  description = "URL del Load Balancer para integrarlo con el API Gateway"
  type        = string
}
