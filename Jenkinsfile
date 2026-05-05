pipeline {
agent any

```
environment {
    DOCKER_IMAGE_BACKEND = 'vivekkumar1611/backend:latest'
    DOCKER_IMAGE_FRONTEND = 'vivekkumar1611/frontend:latest'
    EC2_PUBLIC_IP = '16.171.84.119'
}

stages {

    stage('Clone Code') {
        steps {
            git branch: 'main',
            url: 'https://github.com/vivekkumar1611/3tier-ec2-nodejs-app.git'
        }
    }

    stage('Check Files') {
        steps {
            sh 'ls -l'
        }
    }

    stage('Build Backend') {
        steps {
            sh 'docker build -t vivekkumar1611/backend:latest ./backend'
        }
    }

    stage('Build Frontend') {
        steps {
            sh """
            docker build \
            --build-arg REACT_APP_API_URL=http://$EC2_PUBLIC_IP:30180/api \
            -t vivekkumar1611/frontend:latest ./frontend
            """
        }
    }

    stage('Push Images') {
        steps {
            withCredentials([usernamePassword(
                credentialsId: 'docker-creds',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )]) {
                sh """
                echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                docker push vivekkumar1611/backend:latest
                docker push vivekkumar1611/frontend:latest
                """
            }
        }
    }

    stage('Deploy') {
        steps {
            sh """
            kubectl apply -f k8s/
            kubectl rollout restart deployment backend
            kubectl rollout restart deployment frontend
            """
        }
    }
}

post {
    success {
        echo "SUCCESS"
    }
    failure {
        echo "FAILED"
    }
}


}
