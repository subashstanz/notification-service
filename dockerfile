# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install  # <----- This installs express, bullmq, ioredis, dotenv

# Copy the rest of the files
COPY . .

# Expose the API port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]




# 📌 1. What is a Dockerfile?
# A Dockerfile defines how to build a Docker image. It is like a recipe that specifies:

# The base image (e.g., node:18)
# The dependencies to install
# The commands to run inside the container


# ✅ Key Takeaways:
# ✔ Defines how the image is built
# ✔ Creates a self-contained environment for the app
# ✔ Runs a single container at a time




# 📌 2. What is docker-compose.yml?
# A docker-compose.yml file is used to orchestrate multiple containers. It allows you to:

# Define multiple services (e.g., API, database, Redis, worker)
# Set environment variables
# Define networking between containers
# Start all services with one command


# ✅ Key Takeaways:
# ✔ Defines multiple services (API, Redis, Worker)
# ✔ Automatically handles networking between services
# ✔ Uses Dockerfile to build images
# ✔ Allows running multiple containers together

# 📌 3. When to Use Which?
# Feature	Dockerfile	docker-compose.yml
# Defines how to build an image	✅ Yes	❌ No
# Runs multiple containers	❌ No	✅ Yes
# Manages environment variables	❌ No	✅ Yes
# Handles networking between containers	❌ No	✅ Yes
# Used for CI/CD & Kubernetes	✅ Yes	✅ Yes

