pipeline {
    agent any

    environment {
        // Set environment variables for Docker Hub
        DOCKER_CREDENTIALS = credentials('4b411c55-e9ce-4c5e-afba-1793ea557856') // Updated with your provided Docker credential ID
        IMAGE_NAME = 'b2'  // Your app name
        REGISTRY = 'docker.io' // Or use a private registry like 'ghcr.io' or 'your-private-registry.com'
        TAG = "${env.BUILD_ID}" // Tag based on Jenkins build ID
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from GitHub using your repo URL
                git 'https://github.com/santacodeshere/b2.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh "docker build -t ${REGISTRY}/${DOCKER_CREDENTIALS_USR}/${IMAGE_NAME}:${TAG} ."
                }
            }
        }

        stage('Test Docker Image') {
            steps {
                script {
                    // Run tests if necessary (optional)
                    // Example: Run unit tests or Docker container health check
                    sh "docker run --rm ${REGISTRY}/${DOCKER_CREDENTIALS_USR}/${IMAGE_NAME}:${TAG} npm test"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Login to Docker registry using Jenkins credentials
                    sh "echo ${DOCKER_CREDENTIALS_PSW} | docker login --username ${DOCKER_CREDENTIALS_USR} --password-stdin ${REGISTRY}"

                    // Push the Docker image to the registry
                    sh "docker push ${REGISTRY}/${DOCKER_CREDENTIALS_USR}/${IMAGE_NAME}:${TAG}"
                }
            }
        }

        stage('Cleanup') {
            steps {
                // Optionally clean up any images after pushing
                sh "docker rmi ${REGISTRY}/${DOCKER_CREDENTIALS_USR}/${IMAGE_NAME}:${TAG}"
            }
        }
    }

    post {
        success {
            echo "Build and push were successful!"
        }
        failure {
            echo "Something went wrong during the pipeline execution."
        }
    }
}
