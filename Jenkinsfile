pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials')
        IMAGE_NAME = 'my-node-app'
        REGISTRY = 'docker.io'
        TAG = "${env.BUILD_ID}"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${REGISTRY}/${DOCKER_CREDENTIALS_USR}/${IMAGE_NAME}:${TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh "echo ${DOCKER_CREDENTIALS_PSW} | docker login --username ${DOCKER_CREDENTIALS_USR} --password-stdin ${REGISTRY}"
                    sh "docker push ${REGISTRY}/${DOCKER_CREDENTIALS_USR}/${IMAGE_NAME}:${TAG}"
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh "docker rmi ${REGISTRY}/${DOCKER_CREDENTIALS_USR}/${IMAGE_NAME}:${TAG}"
                cleanWs()
            }
        }
    }

    post {
        success {
            echo "Pipeline executed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}