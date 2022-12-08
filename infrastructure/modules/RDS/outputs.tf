# Output the endpoint of the database
output "db_endpoint" {
  value = aws_db_instance.db.endpoint
}

# TODO: Add endpoint to buildspec file to update environment variable in ./prisma/.env