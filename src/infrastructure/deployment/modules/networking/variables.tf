variable "sg_name" {
  description = "Nombre del security group"
  type        = string
}

variable "vpc_id" {
  description = "ID de la VPC donde se crea el SG"
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