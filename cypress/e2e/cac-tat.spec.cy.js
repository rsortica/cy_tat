/// <reference types="Cypress" />
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(function(){
    // Cenário 1: acessar site
    cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html');
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  //Cenário 2: preencher os campos obrigatórios e enviar o formulário`
  it('preencher campos obrigatorios', () => {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    cy.get('#firstName').type('firstName')
    cy.get('#lastName').type('lastName')
    cy.get('#email').type('test@test.com')
    cy.get('#phone').type('9999999999')

      // Cenário 3: digitar um texto longo na área de texto, passando como segundo argumento do comando `.type()`, um objeto (`{}`) com a propriedade `delay` com valor `0
    cy.get('#open-text-area').type(longText, { delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible') //validacao
  })



  // Cenário 4: exibir mensagem de erro ao submeter o formulário com um email com formatação inválida
  it('exibir mensagem de erro', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    cy.get('#firstName').type('firstName')
    cy.get('#lastName').type('lastName')
    cy.get('#email').type('test@test,com')
    cy.contains('button', 'Enviar').click()

    // deve verificar que uma mensagem é exibida em um elemento com a classe `error`
    cy.get('.error').should('be.visible')
  })
  // Cenário 5: no campo de telefone só aceita números, crie um teste para validar que, se um valor não-numérico for digitado, seu valor continuará vazio
  it('campo telefone deve permanecer vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone')
      .type('eeeeee')
      .should('have.value', '')

  })
  

  // Cenário 6:  exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário`
  it('exibir mensagem de erro para campo obrigatorio', () => {
    cy.get('#firstName').type('firstName')
    cy.get('#lastName').type('lastName')
    cy.get('#email').type('test@test.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('testes')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  // Cenário 7: preenche e limpa os campos nome, sobrenome, email e telefone`
  it('limpar campos com função clear', () => {
    cy.get('#firstName')
      .type('firstName')
      .should('have.value', 'firstName')
      .clear()
      .should('have.value', '')
  })

  // Cenario 8: exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios
  it('exibe msg erro para campos obrigatorios não preenchidos', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })


  // Cenario 9: envia o formuário com sucesso usando um comando customizado
  it('envia formulario com sucesso usando comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit(); // Usa o comando customizado para preencher e submeter o formulário
    cy.get('.success').should('be.visible'); // Verifica se a mensagem de sucesso está visível
  });
  

  // Cenário 10: seleciona um produto (YouTube) por seu texto numa lista
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  // Cenário 11: seleciona um produto (Mentoria) por seu valor (value)
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  // cenário 12: seleciona um produto (Blog) por seu índice
  it('seleciona um produto (Blog) por seu índice', ()=> {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  } )

  // cenario 13: marca o tipo de atendimento "Feedback" - campo do tipo radio
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]') // Corrige a aspas no seletor
      .check()                                // Marca o rádio
      .should('be.checked');                  // Verifica se o rádio está marcado
  });

  // cenario 14: marca cada tipo de atendimento
  it('marca cada tipo de atendimento', () => {
    const tiposDeAtendimento = ['ajuda', 'elogio', 'feedback']; // Exemplo de valores

    tiposDeAtendimento.forEach(tipo => {
      cy.get(`input[type="radio"][value="${tipo}"]`).check();
      cy.get(`input[type="radio"][value="${tipo}"]`).should('be.checked');
    });
  });

  // cenario 15: marca ambos checkboxes, depois desmarca o último
  it('marca ambos checkboxes, depois desmarca o último', () => {
    // Valores dos checkboxes com base no atributo value
    const checkboxes = ['email', 'phone']; //valores reais

    // Marca ambos os checkboxes
    checkboxes.forEach(opcao => {
      cy.get(`input[type="checkbox"][value="${opcao}"]`)
        .should('exist') // Garante que o checkbox existe
        .check(); // Marca o checkbox
      cy.get(`input[type="checkbox"][value="${opcao}"]`)
        .should('be.checked'); // Verifica se está marcado
    });
  });

  // Desmarca o último checkbox
  it('desmarca o ultimo checkbox', () => {
    const ultimoCheckbox = checkboxes[checkboxes.length - 1];
    cy.get(`input[type="checkbox"][value="${ultimoCheckbox}"]`)
      .should('be.visible') // Garante que o checkbox está visível
      .uncheck(); // Desmarca o checkbox
    cy.get(`input[type="checkbox"][value="${ultimoCheckbox}"]`)
      .should('not.be.checked'); // Verifica se está desmarcado
    });


  // cenario 15: marca ambos checkboxes, depois desmarca o último
  it('marca ambos checkbox, logo apos, desmarca o ultimo selecionado', () =>{
    cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    });
  

  // cenario 16: refatorar cenario que exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário, alterando comando  `.click()`, para `.check()`
  it('exibir mensagem de erro para campo obrigatorio', () => {
    cy.get('#firstName').type('firstName');
    cy.get('#lastName').type('lastName');
    cy.get('#email').type('test@test.com');

    // Utiliza .check() para marcar o checkbox
    cy.get('#phone-checkbox').check();

    cy.get('#open-text-area').type('testes');
    cy.contains('button', 'Enviar').click();

    // Verifica se a mensagem de erro está visível
    cy.get('.error').should('be.visible');
  });

  // cenario 17: seleciona um arquivo da pasta fixtures
  it('seleciona um arquivo da pasta fixtures e verifica o nome', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json');
    })
  });
    
  // cenario 18: seleciona um arquivo simulando um drag-and-drop
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json');
      })
  });

  //cenario 19: selecionar arquivo atribuido por alias
  it('seleciona arquivo utilizando fixture atribuida por alias', () => {
    cy.fixture('example').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json');
      })
  })
  //cenario 20: abrir Politica de Privacidade sem clicar no link
  it('abrir politica de privacidade em outra aba sem click', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  //cenario 21: abrir politica de privacidade com click
  it('acessa pagina politica de privacidade removendo o target e clicando no link', () =>{
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  })

});
