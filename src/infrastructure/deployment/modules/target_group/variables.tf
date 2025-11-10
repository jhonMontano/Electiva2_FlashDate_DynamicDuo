variable "tg_name" {
  description = "Nombre del Target Group"
  type        = string
}

variable "port" {
  description = "Puerto de escucha del TG"
  type        = number
  default     = 3000
}

variable "vpc_id" {
  description = "ID de la VPC"
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