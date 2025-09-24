pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: env.BRANCH_NAME, url: 'https://github.com/jhonMontano/Electiva2_FlashDate_DynamicDuo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Validate Coverage') {
            steps {
                script {
                    def coverage = sh(script: "npx jest --coverage --coverageReporters=text-summary | grep 'All files' | awk '{print \$4}' | sed 's/%//'", returnStdout: true).trim()
                    echo "Coverage: ${coverage}%"

                    if (coverage.toInteger() < 80) {
                        error("Coverage below 80%")
                    }
                }
            }
        }
    }

    post {
        always {
            junit '**/junit.xml'
        }
        failure {
            echo '❌ Pipeline failed'
        }
        success {
            echo '✅ Pipeline succeeded'
        }
    }
}
