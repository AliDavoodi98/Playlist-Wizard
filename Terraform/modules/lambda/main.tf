resource "aws_lambda_function" "send_token" {
  filename         = "${path.module}/lambda-token.zip"  # Path to your ZIP file
  function_name    = "send_token_lambda"
  role             = aws_iam_role.lambda_role.arn
  handler          = "lambda-token.handler"
  runtime          = "nodejs18.x"
  source_code_hash = filebase64sha256("${path.module}/lambda-token.zip")  # Compute hash directly
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
    {
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }
  ]
})
}

output "function_name" {
  value = aws_lambda_function.send_token.function_name
}

output "function_uri" {
  value = aws_lambda_function.send_token.invoke_arn
}