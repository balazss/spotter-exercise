# Spotter Exercise Infrastructure

## Prerequisites

There are general steps that you must follow in order to launch the infrastructure resources.

Before launching the solution please follow the next steps:

1. Install Terraform, use Terraform v0.13 or above. You can visit [this](https://releases.hashicorp.com/terraform/) Terraform official webpage to download it.
2. Configure the AWS credentials into your machine (~/.aws/credentials). You need to use the following format:

```shell
    [AWS_PROFILE_NAME]
    aws_access_key_id = Replace_with_the_correct_access_Key
    aws_secret_access_key = Replace_with_the_correct_secret_Key
```

3. Generate a GitHub token. You can follow [this](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) steps to generate it.

## Usage

**1.** Fork this repository and create the GitHub token granting access to the forked repository in your account.

**2.** Clone the forked repository from your account and change the directory to the appropriate one as shown below:

```bash
cd infrastructure/
```

**3.** Run Terraform init to download the providers and install the modules

```shell
terraform init
```

**4.** Update the `terraform.tfvars` file with your variables.
You need to set at least the followign variables:

```properties
aws_profile      = according to the profiles name in ~/.aws/credentials
aws_region       = the AWS region in which you want to create the resources
environment_name = a unique name used for concatenation to give place to the resources names
repository_name  = your GitHub repository name
repository_owner = the owner of the GitHub repository used
```

**5.** Run Terraform plan to see the changes that will be applied to your infrastructure. You need to provide the `github_token` variable:

```shell
terraform plan -var github_token="your-personal-token"
```

**5.** Review the terraform plan, take a look at the changes that terraform will execute:

```shell
terraform apply -var github_token="your-personal-token"
```

**6.** Once Terraform finishes the deployment open the AWS Management Console and go to the AWS CodePipeline service. You will see that the pipeline created by this Terraform code is in progress. Once the pipeline finished successfully, go back to the console where Terraform was executed, copy the _application_url_ value from the output and open it in a browser.

**7.** In order to access the API, copy the _swagger_endpoint_ value from the Terraform output and open it in a browser. You can use the _/api/products_ endpoint to test the API with Postman, Insomnia or `curl`.

## Deploying New Code

CodePipeline will automatically deploy new code when a new commit is pushed to the `main` branch. You can also manually deploy new code by following these steps:

1. Go to the AWS CodePipeline service and select the pipeline created by this Terraform code.
2. Click on the _Release change_ button.

This above will deploy the current code in the `main` branch.

## Cleanup

Run the following command if you want to delete all the resources created before:

```shell
terraform destroy -var github_token="your-personal-token"
```

$\color{red}
{IMPORTANT}$ \
 This will delete all the resources created by this Terraform code. If you don't delete the resources, you will be charged for them by AWS.
