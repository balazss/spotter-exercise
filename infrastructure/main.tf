/*===========================
          Root file
============================*/

# ------- Providers -------
provider "aws" {
  profile = var.aws_profile
  region  = var.aws_region
}

# ------- Random numbers intended to be used as unique identifiers for resources -------
resource "random_id" "RANDOM_ID" {
  byte_length = "2"
}

# ------- Account ID -------
data "aws_caller_identity" "id_current_account" {}

# ------- Networking -------
module "networking" {
  source = "./Modules/Networking"
  cidr   = ["10.120.0.0/16"]
  name   = var.environment_name
}

# ------- Networking -------
module "networking" {
  source = "./modules/Networking"
  cidr   = ["10.120.0.0/16"]
  name   = var.environment_name
}
