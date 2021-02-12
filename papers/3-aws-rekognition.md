# Introdução à apps Serverless - Analisando imagens com AWS Rekognition

Programação orientada a eventos.

Exemplos:
- HTTP Events
- New Message
- Someone wrote a new file
- Log pattern
- CRON routine
- New item on DB

![](img/serverless-faas-architecture.png)

- Pague o que usar!
- Plataformas gerenciam a execução de seu código - "vendor lock-in"

Concorrentes serverless:
- IBM OpenWhisk
- AWS Lambda
- Azure Functions
- Google Cloud Functions
- Auth0 Webtask

## Lambda

- Procurar serviço "Lambda"
- Criar novo, com um nome, configurações default
- Alteração dos dados pegando `event.queryStringParameters`