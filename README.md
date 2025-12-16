# TcPdfObtainer

## Deployment Process (Docker)

This project uses a **Node.js Backend** and an **Angular Frontend (served by Nginx)**, orchestrated via Docker Compose. The deployment is performed via offline image transfer (using a `.tar` file).

### 1. On the Development Machine (Build)

Generate the images and the package for transfer:

```bash
# 1. Build the Backend image
# (Run inside the backend directory)
docker build -t meu-projeto-backend:v1 .

# 2. Build the Frontend image
# (Run inside the frontend directory)
docker build -t meu-projeto-frontend:v1 .

# 3. Create a single package (.tar) containing both images
docker save -o app-pacote.tar meu-projeto-backend:v1 meu-projeto-frontend:v1
```

> **Files required to transfer to the server/VM:**

> 1. `app-pacote.tar` (The images)
> 2. `docker-compose.prod.yml` (The orchestration)
> 3. `.env` (Production environment variables)

### 2. On the Server / VM (Execution)Once the files are transferred to the server, execute the following commands:

```bash
# 1. Load the images from the tar file into the Docker daemon
sudo docker load -i app-pacote.tar

# 2. Start the containers (using the production file)
sudo docker compose -f docker-compose.prod.yml up -d
```

The application will be available at: `http://server-ip:8080`

## Configuration Files

### docker-compose.prod.yml

This file defines the production infrastructure. It uses the pre-built images loaded from the `.tar` file instead of building them from source.

```yaml
services:
  app:
    image: meu-projeto-backend:v1
    container_name: backend-api
    restart: always
    env_file: .env
    networks:
      - minha-rede-app

  frontend:
    image: meu-projeto-frontend:v1
    container_name: frontend-app
    restart: always
    ports:
      - "8080:80"
    depends_on:
      - app
    networks:
      - minha-rede-app

networks:
  minha-rede-app:
    external: false
```
