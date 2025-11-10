variable "role_name" {
  description = "Nombre del rol IAM"
  type        = string
}

variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
}

variable "environment" {
  description = "Ambiente (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "Región AWS"
  type        = string
}

variable "account_id" {
  description = "ID de cuenta AWS"
  type        = string
}