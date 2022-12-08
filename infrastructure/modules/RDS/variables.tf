# RDS Variables

variable "engine" {
  type = string
}

variable "engine_version" {
  type = string
}

variable "instance_class" {
  type = string
}

variable "storage_encrypted" {
  type = bool
}

variable "allocated_storage" {
  type = number
}

variable "max_allocated_storage" {
  type = number
}

variable "db_name" {
  type = string
}

variable "username" {
  type = string
}

variable "password" {
  type = string
}

variable "port" {
  type = number
}

variable "multi_az" {
  type = bool
}

variable "db_subnets" {
  type = list(string)
}

variable "vpc_security_group_ids" {
  type = list(string)
}

variable "iam_database_authentication_enabled" {
  type = bool
}
