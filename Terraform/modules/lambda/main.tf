resource "aws_lambda_function" "html_lambda" {
  filename         = "/Users/ali.davoodi/ali-playground/terraform/music-metadata-lambda-dynamodb/Terraform/modules/lambda/app/build/distributions/myLambdaFunction.zip"  # Path to your ZIP file
  function_name    = "myLambdaFunction"
  role             = aws_iam_role.lambda_role.arn
  handler          = "lambda.LambdaFunctionHandler::handleRequest"  # Correct Java handler
  runtime          = "java11"
  source_code_hash = filebase64sha256("/Users/ali.davoodi/ali-playground/terraform/music-metadata-lambda-dynamodb/Terraform/modules/lambda/app/build/distributions/myLambdaFunction.zip")  # Compute hash directly
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