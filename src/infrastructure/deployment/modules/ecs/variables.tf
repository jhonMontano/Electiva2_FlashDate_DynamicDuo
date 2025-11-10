variable "cluster_name" {
  type        = string
  description = "Nombre del ECS Cluster"
}

variable "task_family" {
  type        = string
  description = "Nombre de la Task Definition"
}

variable "service_name" {
  type        = string
  description = "Nombre del ECS Service"
}

variable "image_uri" {
  type        = string
  description = "URI de la imagen en ECR"
}

variable "execution_role_arn" {
  type        = string
  description = "ARN del rol IAM para ECS"
}

variable "jwt_secret_arn" {
  type        = string
}

variable "mongo_uri_arn" {
  type        = string
}

variable "port_arn" {
  type        = string
}

variable "subnet_ids" {
  type        = list(string)
  description = "Subnets para el ECS Service"
}

variable "security_group_id" {
  type        = string
  description = "Security Group para el ECS Service"
}

variable "target_group_arn" {
  type        = string
  description = "ARN del Target Group"
}

variable "project_name" {
  type        = string
}

variable "environment" {
  type        = string
  default     = "prod"
}

variable "aws_region" {
  type        = string
}