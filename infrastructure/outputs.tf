output "application_url" {
  value       = module.alb_client.dns_alb
  description = "Copy this value in your browser in order to access the deployed app"
}

output "swagger_endpoint" {
  value       = "${module.alb_server.dns_alb}/api/docs"
  description = "Copy this value in your browser in order to access the swagger documentation"
}

output "db_endpoint" {
  value       = module.rds.db_endpoint
  description = "This is the endpoint of the database (only accessible from the VPC)"
}
