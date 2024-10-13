provider "aws" {
  region = "us-east-1"
}

module "api-gateway" {
  source = "./modules/api"
}

module "labda" {
    source = "./modules/lambda"
  
}