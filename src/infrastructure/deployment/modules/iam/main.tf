resource "aws_iam_role" "ecs_task_execution_role" {
  name               = var.role_name
  assume_role_policy = data.aws_iam_policy_document.ecs_assume_role.json

  tags = {
    Name        = var.role_name
    Environment = var.environment
    Project     = var.project_name
  }
}

data "aws_iam_policy_document" "ecs_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role_policy" "ecs_execution_policy" {
  name   = "ecsTaskExecutionRolePolicy"
  role   = aws_iam_role.ecs_task_execution_role.id
  policy = data.aws_iam_policy_document.ecs_execution.json
}

data "aws_iam_policy_document" "ecs_execution" {
  statement {
    effect = "Allow"
    actions = [
      "ecr:GetAuthorizationToken",
      "ecr:BatchCheckLayerAvailability",
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "ecs_service_policy" {
  name   = "ecsServiceRolePolicy"
  role   = aws_iam_role.ecs_task_execution_role.id
  policy = data.aws_iam_policy_document.ecs_service.json
}

data "aws_iam_policy_document" "ecs_service" {
  statement {
    effect = "Allow"
    actions = [
      "ec2:AuthorizeSecurityGroupIngress",
      "ec2:Describe*",
      "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
      "elasticloadbalancing:DeregisterTargets",
      "elasticloadbalancing:Describe*",
      "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
      "elasticloadbalancing:RegisterTargets"
    ]
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "ssm_access_policy" {
  name   = "parameterAccessPolicy"
  role   = aws_iam_role.ecs_task_execution_role.id
  policy = data.aws_iam_policy_document.ssm_access.json
}

data "aws_iam_policy_document" "ssm_access" {
  statement {
    effect = "Allow"
    actions = [
      "ssm:GetParametersByPath",
      "ssm:GetParameters",
      "ssm:GetParameter"
    ]
    resources = [
      "arn:aws:ssm:${var.aws_region}:${var.account_id}:parameter/electiva/prod/*"
    ]
  }
}

resource "aws_iam_role_policy" "lambda_invoke_policy" {
  name   = "lambdaInvokePolicy"
  role   = aws_iam_role.ecs_task_execution_role.id
  policy = data.aws_iam_policy_document.lambda_invoke.json
}

data "aws_iam_policy_document" "lambda_invoke" {
  statement {
    effect = "Allow"
    actions = ["lambda:InvokeFunction"]
    resources = [
      "arn:aws:lambda:${var.aws_region}:${var.account_id}:function:sendEmailMatch"
    ]
  }
}