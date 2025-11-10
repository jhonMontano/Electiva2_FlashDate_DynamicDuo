output "jwt_secret_name" {
  value = aws_ssm_parameter.jwt_secret.name
}

output "mongo_uri_name" {
  value = aws_ssm_parameter.mongo_uri.name
}

output "port_name" {
  value = aws_ssm_parameter.port.name
}