pipeline {
agent any

```
environment {
    DOCKERHUB_CREDENTIALS = 'docker-creds'
    DOCKER_IMAGE_BACKEND = 'vivekkumar1611/backend:latest'
    DOCKER_IMAGE_FRONTEND = 'vivekkumar1611/frontend:latest'
    EC2_PUBLIC_IP = '16.171.84.119'
}

stages {

    stage('Clone Repo') {
        steps {
            git branch: 'main',
            url: 'https://github.com/vivekkumar1611/3tier-ec2-nodejs-app.git'
        }
    }

    stage('Verify Files') {
        steps {
            sh 'ls -l'
        }
    }

    stage('Build Backend Image') {
        steps {
            sh 'docker build -t $DOCKER_IMAGE_BACKEND ./backend'
        }
    }

    stage('Build Frontend Image') {
        steps {
            sh '''
            docker build \
            --build-arg REACT_APP_API_URL=http://$EC2_PUBLIC_IP:30180/api \
            -t $DOCKER_IMAGE_FRONTEND ./frontend
            '''
        }
    }

    stage('Push Images') {
        steps {
            withCredentials([usernamePassword(
                credentialsId: 'docker-creds',
                usernameVariable: 'USER',
                passwordVariable: 'PASS'
            )]) {
                sh '''
                echo $PASS | docker login -u $USER --password-stdin
                docker push $DOCKER_IMAGE_BACKEND
                docker push $DOCKER_IMAGE_FRONTEND
                '''
            }
        }
    }

    stage('Deploy to Kubernetes') {
        steps {
            sh '''
            kubectl apply -f k8s/
            kubectl rollout restart deployment backend
            kubectl rollout restart deployment frontend
            '''
        }
    }

    stage('Verify Deployment') {
        steps {
            sh '''
            kubectl get pods
            kubectl get svc
            '''
        }
    }
}

post {
    success {
        echo 'SUCCESS: Deployment completed'
    }
    failure {
        echo 'FAILED: Check logs'
    }
}
```

}
