# Image Analysis

- É possível usar módulos npm no handler
- Instalar o `aws-sdk`
- Configuradas roles de permissão no `serverless.yml` - `rekognition:DetectLabels` e `translate:TranslateText`
- Possível realizar um request passando parâmetros setando um `request.json` - `sls invoke local -f img-analysis --path request.json`
- Depois de validar local, `sls deploy` e usar o endpoint público passando a querystring corretamente
- Depois de terminar, `sls remove`.