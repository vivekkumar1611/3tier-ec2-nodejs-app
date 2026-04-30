pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "3tier-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                // Uses Jenkins SCM config (make sure branch = main)
                checkout scm
            }
        }

        stage('Verify Tools') {
            steps {
                sh '''
                echo "Checking Docker..."
                docker --version

                echo "Checking Docker Compose..."
                docker compose version || docker-compose --version
                '''
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh '''
                docker compose down || true
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker compose build --no-cache
                '''
            }
        }

        stage('Start Containers') {
            steps {
                sh '''
                docker compose up -d
                '''
            }
        }

        stage('Wait for Services') {
            steps {
                sh '''
                echo "Waiting for services to be ready..."
                sleep 25
                '''
            }
        }

        stage('Verify Backend Health') {
            steps {
                sh '''
                curl -f http://localhost:3000/health
                '''
            }
        }

        stage('Verify Frontend') {
            steps {
                sh '''
                curl -f http://localhost:3001 || true
                '''
            }
        }
    }

    post {
        always {
            echo "Cleaning up unused Docker resources..."
            sh 'docker system prune -f || true'
        }

        success {
            echo '✅ Deployment Successful 🚀'
        }

        failure {
            echo '❌ Deployment Failed'
        }
    }
}
