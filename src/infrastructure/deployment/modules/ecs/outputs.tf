output "ecs_service_name" {
  value = aws_ecs_service.electiva3_service.name
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.electiva3.name
}