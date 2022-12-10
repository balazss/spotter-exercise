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
  storage_encrypted = false
  network_type      = "IPV4"

  multi_az = var.multi_az # Probably false

  

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

