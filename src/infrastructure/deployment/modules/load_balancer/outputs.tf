output "load_balancer_dns" {
  value = aws_lb.electiva3_lb.dns_name
}