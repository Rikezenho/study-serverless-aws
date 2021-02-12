# Criando lambdas sem framework

1. Primeiro, criar uma role no IAM - `aws iam create-role` e salvar o log (pra pegar a role criada)
2. Zipa seu arquivo js - `zip function.zip index.js`
3. Cria uma lambda com essa role, passando o zip
```
aws lambda create-function \
    --function-name hello-cli \
    --zip-file fileb://function.zip \
    --handler index.handler \
    --runtime nodejs12.x \
    --role arn:aws:iam::240129874119:role/lambda-exemplo
    | tee logs/lambda-create.log
```
1. Testa a lambda, salvando num log
```
aws lambda invoke \
    --function-name hello-cli \
    --log-type Tail \
    logs/lambda-exec.log
```
5. Para atualizar o arquivo, tem que zipar de novo e rodar o update-function-code
```
aws lambda update-function-code \
    --zip-file fileb://function.zip \
    --function-name hello-cli \
    --publish \
    | tee logs/lambda-update.log
```
6. Testa a lambda de novo, salvando num log

7. Depois, excluir a lambda e a role
```
aws lambda delete-function \
    --function-name hello-cli

aws iam delete-role \
    --role-name lambda-exemplo
```