resource "aws_lb_target_group" "electiva3_tg" {
  name        = var.tg_name
  port        = var.port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc_id

  health_check {
    path                = "/health"
    protocol            = "HTTP"
    port                = "traffic-port"
    healthy_threshold   = 5
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
    matcher             = "200-399"
  }

  tags = {
    Name        = var.tg_name
    Environment = var.environment
    Project     = var.project_name
  }
}