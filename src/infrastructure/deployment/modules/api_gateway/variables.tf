variable "api_name" {
  description = "Nombre del API Gateway"
  type        = string
}

variable "lb_url" {
  description = "URL del Load Balancer como backend"
  type        = string
}

variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
}

variable "environment" {
  description = "Ambiente (dev, staging, prod)"
  type        = string
  default     = "prod"
}