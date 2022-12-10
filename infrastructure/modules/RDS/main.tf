resource "aws_db_instance" "db" {
  identifier = "spotterdb"

  allocated_storage = var.allocated_storage
  db_name           = var.db_name
  engine            = var.engine
  engine_version    = var.engine_version
  instance_class    = var.instance_class

  username = var.username
  password = var.password
  port     = var.port

  iam_database_authentication_enabled = var.iam_database_authentication_enabled

  vpc_security_group_ids = var.vpc_security_group_ids
  db_subnet_group_name   = aws_db_subnet_group.default.name
  parameter_group_name   = aws_db_parameter_group.default.name
  # option_group_name = var.option_group_name # TODO: Figure out what this is
  storage_encrypted = false
  network_type      = "IPV4"

  multi_az = var.multi_az # Probably false

  # ca_cert_identifier = var.ca_cert_identifier # TODO: Probably not needed

  skip_final_snapshot = true

  # Instruct terraform to wait before timing out for operations
  timeouts {
    create = "10m" # 2 minutes
    update = "10m" # 2 minutes
    delete = "10m" # 2 minutes
  }
}

resource "aws_db_parameter_group" "default" {
  name        = "prod-db-parameter-group"
  family      = "postgres14"
  description = "Parameter group for prod-db"

  parameter {
    name  = "client_encoding"
    value = "UTF8"
  }
}

resource "aws_db_subnet_group" "default" {
  name        = "prod-db-subnet-group"
  description = "Subnet group for prod-db"
  subnet_ids  = var.db_subnets
}

# resource "aws_security_group" "default" {
#   name        = "prod-db-security-group"
#   description = "Security group for prod-db"
#   vpc_id      = var.vpc_id

#   ingress {
#     from_port   = var.port
#     to_port     = var.port
#     protocol    = "tcp"
#     cidr_blocks = var.db_subnets
#   }

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   tags = {
#     Name = "prod-db-security-group"
#   }
# }
