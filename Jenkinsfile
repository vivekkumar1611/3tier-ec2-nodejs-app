pipeline {
    agent any

    environment {
        APP_NAME = "3tier-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/vivekkumar1611/3tier-ec2-nodejs-app.git'
            }
        }

        stage('Verify Docker') {
            steps {
                sh 'docker --version'
                sh 'docker compose version || docker-compose --version'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Wait for Services') {
            steps {
                sh 'sleep 20'
            }
        }

        stage('Health Check') {
            steps {
                sh 'curl -f http://localhost:3000/health'
            }
        }

        stage('Frontend Check') {
            steps {
                sh 'curl -f http://localhost:3001'
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful"
        }
        failure {
            echo "❌ Deployment Failed"
        }
    }
}
