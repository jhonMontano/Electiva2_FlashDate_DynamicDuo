resource "aws_ecs_cluster" "electiva3" {
  name = var.cluster_name

  tags = {
    Name        = var.cluster_name
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_ecs_task_definition" "electiva3_task" {
  family                   = var.task_family
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = var.execution_role_arn
  task_role_arn            = var.execution_role_arn
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  container_definitions = jsonencode([
    {
      name      = "electiva3-container"
      image     = var.image_uri
      essential = true
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/ecs/electiva3-task"
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "ecs"
        }
      }
      secrets = [
        {
          name      = "JWT_SECRET"
          valueFrom = var.jwt_secret_arn
        },
        {
          name      = "MONGO_URI"
          valueFrom = var.mongo_uri_arn
        },
        {
          name      = "PORT"
          valueFrom = var.port_arn
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "electiva3_service" {
  name            = var.service_name
  cluster         = aws_ecs_cluster.electiva3.id
  task_definition = aws_ecs_task_definition.electiva3_task.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets         = var.subnet_ids
    security_groups = [var.security_group_id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = "electiva3-container"
    container_port   = 3000
  }

  tags = {
    Name        = var.service_name
    Environment = var.environment
    Project     = var.project_name
  }

  depends_on = [aws_ecs_task_definition.electiva3_task]
}