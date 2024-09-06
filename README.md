# Automação de Testes da Central de Atendimento TAT com Cypress 

Este repositório contém testes automatizados para o **[CAC TAT](https://cac-tat.s3.eu-central-1.amazonaws.com/index.html)**, simulador de uma plataforma de "Central de Atendimento ao Cliente" da escola TAT. Esta automação foi desenvolvida utilizando o framework [Cypress](https://www.cypress.io/). 

Os testes automatizados cobrem diferentes cenários, como casos de sucesso e falhas esperadas, visando garantir que as principais funcionalidades estejam executando corretamente.

## Cenários 

- **Cadastro de Usuário**: Verifica se é possível criar novas contas com diferentes tipos de dados.
- **Login**: Testa a autenticação de usuários com credenciais válidas e inválidas.
- **Transferências**: Simula transferências entre contas, invalidando a conta destinatária.
- **Funcionalidades**: Confirma o funcionamento de botões, seletores e pop-ups.

* Navegar em páginas locais e remotas;
* Mapear elementos em aplicações web;
* Realizar _upload_ de arquivos;
* Realizar as mais diversas verificações de resultados esperados;
* Criar comandos customizados;
* Interagir com links que abrem em outra aba do navegador;
* Rodar testes simulando as dimensões de um dispositivo móvel;
* Resolver os mesmos problemas de diferentes formas, conhecendo a [API do Cypress](https://docs.cypress.io/api/table-of-contents);
* Executar os testes em um _pipeline_ de integração contínua sempre que mudanças ocorrerem no código da aplicação (ou dos testes);

  
## Tecnologias Utilizadas

- [Cypress](https://docs.cypress.io/guides/overview/why-cypress): Framework de testes automatizados E2E.
- Node.js: Ambiente de execução para JavaScript.
  

## Como executar os testes:

1. Faça clone deste projeto para sua máquina local.
2. Certifique-se de que o Cypress está instalado.
3. Navegue até o diretório do projeto.
4. Execute os testes com o comando:

   ```bash
   npx cypress run

## Observação🚨

#### - A aplicação não conta com um BANCO DE DADOS, todas as informações são armazenadas em memória local.


