resource "aws_lb" "electiva3_lb" {
  name               = var.lb_name
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.security_group_id]
  subnets            = var.subnet_ids

  tags = {
    Name        = var.lb_name
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.electiva3_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = var.target_group_arn
  }
}