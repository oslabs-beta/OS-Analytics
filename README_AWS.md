
# AWS Bedrock Setup Guide

This guide will help you configure your AWS credentials and IAM permissions to use AWS Bedrock with this application.

## Step 1: Set Up Your IAM User for AWS Bedrock

1. **Log in to the AWS Management Console** by visiting [https://aws.amazon.com/console/](https://aws.amazon.com/console/).
2. In the console, navigate to **IAM** from the services menu.
3. Under **Users**, click **Add user**.
4. **Name the user** (e.g., `bedrock-user`).
5. Click **Next: Permissions**, then choose **Attach policies directly**.
6. Search for and select **AmazonBedrockFullAccess** from the list of policies.
7. Press **Next**, review your settings, and then click **Create user**.

Once the user is created:

1. Go back to the **Users** section and find the user you just created (`bedrock-user`).
2. Click on the user, then go to the **Access key** link.
3. Press **Create access key**.
4. **Name your key** (for your reference) and optionally download it as a **CSV file** for safekeeping.
5. Copy your **Access Key ID** and **Secret Access Key**.


## Step 2: Enter AWS Credentials in the Application

1. Log in to the application and navigate to the **Settings** page.
2. Locate the fields for **Client Access Key**, **Secret Key**, and **Region**.
3. Enter the following details:
   - **Client Access Key**: Your AWS Access Key ID from Step 1.
   - **Secret Key**: Your AWS Secret Access Key from Step 1.
   - **Region**: Your region (e.g., `us-east-1`).
4. Click **Save** to store your credentials.

Once the credentials are saved, you may then navigate to dashboard and use the AWS bedrock feature!

### Securing Your Credentials
Your AWS credentials are securely stored in our database using encryption, ensuring they remain protected and accessible only to you.
