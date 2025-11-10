variable "lb_name" {
  description = "Nombre del Load Balancer"
  type        = string
}

variable "security_group_id" {
  description = "ID del Security Group asociado al LB"
  type        = string
}

variable "subnet_ids" {
  description = "Lista de subnets públicas para el LB"
  type        = list(string)
}

variable "target_group_arn" {
  description = "ARN del Target Group al que enruta el listener"
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