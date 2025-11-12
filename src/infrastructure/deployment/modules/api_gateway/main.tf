resource "aws_apigatewayv2_api" "electiva3_api" {
  name          = var.api_name
  protocol_type = "HTTP"
  target        = var.lb_url

  tags = {
    Name        = var.api_name
    Environment = var.environment
    Project     = var.project_name
  }
}
