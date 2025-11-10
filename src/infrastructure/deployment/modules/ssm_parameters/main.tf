resource "aws_ssm_parameter" "jwt_secret" {
  name        = "/electiva/prod/jwtsecret"
  type        = "SecureString"
  value       = var.jwt_secret
  description = "JWT secret for electiva3 app"
  tags = {
    Name        = "jwtsecret"
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_ssm_parameter" "mongo_uri" {
  name        = "/electiva/prod/mogourl"
  type        = "SecureString"
  value       = var.mongo_uri
  description = "MongoDB URI for electiva3 app"
  tags = {
    Name        = "mogourl"
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_ssm_parameter" "port" {
  name        = "/electiva/prod/port"
  type        = "SecureString"
  value       = var.port
  description = "Port for electiva3 app"
  tags = {
    Name        = "port"
    Environment = var.environment
    Project     = var.project_name
  }
}