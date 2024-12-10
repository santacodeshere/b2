pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'b2'
        DOCKER_REGISTRY = 'santacodeshere'  // Your DockerHub username
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_REGISTRY%/%DOCKER_IMAGE% .'
            }
        }

        stage('Test Docker Image') {
            steps {
                bat 'docker run --rm %DOCKER_REGISTRY%/%DOCKER_IMAGE% npm test'
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker push %DOCKER_REGISTRY%/%DOCKER_IMAGE%'
            }
        }
        
        stage('Cleanup') {
            steps {
                bat 'docker rmi %DOCKER_REGISTRY%/%DOCKER_IMAGE%'
            }
        }
    }
}
