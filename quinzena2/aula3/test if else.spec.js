/// <reference types="Cypress" />
const faker = require('faker')
import loc from '../../support/locators'

context('Testar o Login', () => {
  beforeEach(() => {
    cy.visit('https://exemples.com.br/#!/integracao/fornecedor');
    cy.get(loc.login.user).type(`${Cypress.env('usuario')}`)//variavel e locators
    cy.get("[class=ng-scope]").should("contain", "ACESSAR")
    cy.get(loc.login.password).type('1234')//variavel e locators
    cy.contains('ACESSAR').click({timeout: 20000})
        if(cy.get('.toast').should('contain', 'Usuário e/ou senha inválido.') ){
        cy.get('.md-icon-button > .ng-scope').click()
        cy.get(loc.login.password).clear().type(`${Cypress.env('senha')}`)//variavel e locators  
    }
    cy.contains('ACESSAR').click({timeout: 20000})
    cy.contains('Selecionar...').click({timeout: 10000})
    cy.contains('DEMONSTRAÇÃO').click({timeout: 10000})
    cy.contains('SELECIONAR FILIAL').click({timeout: 10000})
    cy.get("[class=ng-binding]").should("contain", "Inicio");
    //abrir a navigator bar
    // cy.get(loc.menu.navigator).click()//locators 
    // cy.wait(500)
    // cy.get(loc.menu.fixar).click()//locators
 })
 
  it('TESTE A - Cadastro grupo de fornecedores', () => {
   
    // //seleciona cliente no menu
    // cy.get(loc.integracao.icone).click()
    // cy.get(':nth-child(1) > :nth-child(2) > ul.ng-scope > :nth-child(2) > .navigation-menu-item > .navigation-menu-button > .title').click()
    // //Fechar navigator bar
    // cy.get(loc.menu.fixar).click({timeout: 10000})
    // cy.get(':nth-child(3) > .ng-binding').should('contain', ' Grupo de Fornecedor')

    // //adicioanr
    cy.get('#btn-adicionar > span.ng-scope').click()
    cy.get('#descricao').type('CYTESTE')
    cy.get('#btn-salvar > span.ng-scope').click()
    
    //verifica se ja existe
    cy.get('.toast').then((toast) => {
        if (toast.text().includes( 'contain', 'Já existe um cadastro com esta mesma descrição, não será possível criar outro grupo de fornecedor com o mesmo nome' ) ) {

        cy.get('.toast').click()
        cy.wait(1000)
        cy.get('[ng-click="ctrl.voltarListagem()"] > .ng-scope').click()
        cy.contains('CYTESTE').click()
        cy.get('#btn-excluir > span.ng-scope').click()
        cy.get('.swal2-confirm').click()
        cy.get('.toast').should('contain', 'Excluído') 
    } else {
    cy.get('.toast').should('contain', 'Registro salvo com sucesso!') 
    cy.contains('CYTESTE').click()    
    cy.get('#btn-editar > span.ng-scope').click()
    cy.get('#descricao').clear().type('CYEDITADO')
    cy.get('#btn-salvar > span.ng-scope').click()
    cy.get('.toast').should('contain', 'sucesso!') 
    cy.contains('CYEDITADO').click()
    cy.get('#btn-excluir > span.ng-scope').click()
    cy.get('.swal2-confirm').click()
    cy.get('.toast').should('contain', 'Excluído') 
    }
})
     
  })


  })
   