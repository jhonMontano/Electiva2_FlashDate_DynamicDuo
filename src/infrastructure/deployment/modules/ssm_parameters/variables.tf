variable "jwt_secret" {
  description = "Valor del JWT_SECRET"
  type        = string
}

variable "mongo_uri" {
  description = "Valor del MONGO_URI"
  type        = string
}

variable "port" {
  description = "Valor del PORT"
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