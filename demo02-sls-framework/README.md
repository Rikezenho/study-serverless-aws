# Lambda com framework Serverless

1. Instalar - `npm i -g serverless`
2. `sls` na pasta
3. Yes, AWS Node.js, hello-sls
4. Configurar o `serverless.yml` - no caso, adicionar ao `events` da function um `httpApi` com path `/hello` e `method: get`
5. Sempre fazer deploy no ambiente para verificar se as APIs estão corretas, se o ambiente está correto - `sls deploy`
6. Aí, chamar a função: `sls invoke -f hello` ou `sls invoke local -f hello --log` (flag --log é para exibir o log do evento)
7. Para acompanhar os logs de uma função: `sls logs -f hello --tail`
8. Para remover os serviços: `sls remove`