# Playlist Wizard

## Lambda + Vault + React: Spotify Top Tracks Image Collage

This project integrates **AWS Lambda**, **Vault**, **Spotify API**, and **React** to generate an image collage of the user’s top tracks. The system uses Lambda to securely retrieve the Spotify **refresh token** from Vault and pass it to the frontend React app, which processes the Spotify **Top Tracks API** to build a beautiful image collage.

---

## Architecture Overview

1. **Lambda Function**  
   - Fetches the **refresh token** from Vault.
   - Uses the refresh token to get a new **Spotify access token**.
   - Returns the access token via **API Gateway** to the React frontend.

2. **React Frontend**  
   - Calls Lambda to retrieve the access token.
   - Uses the access token to fetch **top tracks** from Spotify.
   - Creates a collage of album covers from the top tracks.

---

## Prerequisites

- **AWS Account** with:
  - Lambda setup with Terraform.
  - API Gateway configured to invoke the Lambda function.
- **Spotify Developer Account** with:
  - Registered application (client ID, client secret, redirect URI).
- **Vault Server** installed and running.
- **Node.js** and **npm** installed.
- Terraform installed on your machine.


## How It Works

1. **Spotify Refresh Token Management**  
   - Vault securely stores the **client ID**, **client secret**, and **refresh token** for your Spotify app.  
   - Lambda fetches these secrets from Vault and exchanges the **refresh token** for a new **access token**.

2. **Lambda Execution**  
   - React frontend calls Lambda via API Gateway to retrieve the access token.
   - Lambda returns the token, allowing the frontend to proceed with Spotify API calls.

3. **React Frontend**  
   - The React app fetches top tracks using the access token.
   - The app renders a collage of album covers from the top tracks.

---

## Setup Instructions

### 1. Deploy Lambda with Terraform

1. Navigate to the Terraform directory:
   ```
   bash
   cd terraform/
   terraform init
   terraform apply
   ```
2. Set environment variables for Terraform:
    ```
    export TF_VAR_vault_token="<your-vault-token>"
    export TF_VAR_vault_addr="https://<your-vault-server>:8200"
    ```

To Store Vault's credentials:
    ```
    vault kv put secret/spotify client_id=<your-client-id> client_secret=<your-client-secret> refresh_token=<your-refresh-token>
    ```


### Set Up React Frontend

1. Navigate to the frontend directory:
    ```
    cd frontend/
    npm install
    ```
        
2. Start the React app:
    ```
    npm start
    ```

To Open the results:
    ```
    http://localhost:5173/
    ```