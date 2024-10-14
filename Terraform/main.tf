provider "aws" {
  region = "us-east-1"
}

module "api-gateway" {
  source = "./modules/api"

  function_name = module.lambda.function_name
  function_uri = module.lambda.function_uri
}

module "lambda" {
    source = "./modules/lambda"
  
}