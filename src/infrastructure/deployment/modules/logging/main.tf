resource "aws_cloudwatch_log_group" "ecs_task_logs" {
  name              = "/ecs/electiva3-task"
  retention_in_days = 7

  tags = {
    Name        = "electiva3-task-logs"
    Environment = var.environment
    Project     = var.project_name
  }
}