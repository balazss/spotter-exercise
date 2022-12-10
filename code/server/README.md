# Spotter Backend Node/Express App

## Details

The backend app was created using

- NodeJS
- Express
- PostgreSQL
- Prisma

## To run the app in a container:

In the project directory, run the following command:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

_Note:_ _You should specify the environment as either `production` or `development`._

There is also a docker-compose file for production: `docker-compose.prod.yml` in case one wants to build a production version of the app.

## If you want to deploy the app to AWS, follow this link:

[Infrastrucutre](https://github.com/balazss/spotter-exercise/tree/main/infrastructure/README.md)

## Deploying New Code

CodePipeline will automatically deploy new code when a new commit is pushed to the `main` branch. You can also manually deploy new code by following these steps:

1. Go to the AWS CodePipeline service and select the pipeline created by this Terraform code.
2. Click on the _Release change_ button.

This above will deploy the current code in the `main` branch.

## Seeding the Database

The running database is seeded with the data provided in the exercise. You can seed the database by following these steps:

### Seeding in local container

1. Exec into your running backend container:

```bash
docker exec -it <CONTAINER_ID> bash
```

_Note:_ _You can find the container ID by running `docker ps`._

2. Run the following command to seed the database:

```bash
npx prisma db seed
```

### Seeding on AWS:

The running database is seeded with the data provided in the exercise. You can seed the database by following these steps:

1. Download and install **AWS CLI** [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. Configure AWS CLI with your credentials [Configure AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html)
3. Grab the _cluster name_, _task ARN_ and _container name_ from your ECS console. You can find them in the _Cluster_ and _Tasks_ sections in the AWS ECS Console, respectively.
4. Run the following commands to seed the database:

```bash
aws ecs execute-command --region <YOUR_REGION> --cluster Cluster-prod --task <YOUR_TASK_ARN> --container <YOUR_CONTAINER_NAME> --command "npx prisma db seed"
```

An example command looks like this:

```bash
aws ecs execute-command --region us-west-2 --cluster Cluster-prod --task arn:aws:ecs:us-west-2:671092380128:task/Cluster-prod/2a42c78d0cff49398ec67b3dd10e97f4 --container Container-server --command "npx prisma db seed"
```
