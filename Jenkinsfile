stage('Build Docker Images') {
    steps {
        sh '''
            docker build -t yourdockerhub/backend ./backend
            docker build -t yourdockerhub/frontend ./frontend
        '''
    }
}

stage('Push Images') {
    steps {
        sh '''
            docker push yourdockerhub/backend
            docker push yourdockerhub/frontend
        '''
    }
}

stage('Deploy to Kubernetes') {
    steps {
        sh '''
            kubectl apply -f k8s/
        '''
    }
}
