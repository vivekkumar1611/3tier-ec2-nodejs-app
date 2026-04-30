pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "3tier-app"
    }

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/vivekkumar1611/3tier-ec2-nodejs-app.git'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Start Containers') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'sleep 10'
                sh 'curl -f http://localhost:3000/health'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful 🚀'
        }
        failure {
            echo '❌ Deployment Failed'
        }
    }
}
