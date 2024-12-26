describe("Testes de Carrinho de Compras", () => {
  beforeEach(() => {
    // Acessa a página inicial antes de cada teste
    cy.visit("/");
  });

  //Test Case 7: Adiciona produto ao carrinho
  it("Deve adicionar um produto ao carrinho com sucesso", () => {
    // Pesquisar pelo produto "PNEU GOODYEAR ARO 14"
    cy.get("#twotabsearchtextbox")
      .clear()
      .type("PNEU GOODYEAR ARO 14 DIRECTION TOURING 2 175/70R14 88T{enter}");

    // Selecionar o produto "PNEU GOODYEAR ARO 14"
    cy.get(".s-main-slot .s-result-item")
      .contains("PNEU GOODYEAR ARO 14 DIRECTION TOURING 2 175/70R14 88T")
      .click();

    // Verificar que estamos na página de detalhes do produto
    cy.get("#productTitle")
      .should("be.visible")
      .and(
        "contain.text",
        "PNEU GOODYEAR ARO 14 DIRECTION TOURING 2 175/70R14 88T"
      );

    // Clicar no botão "Adicionar ao carrinho"
    cy.get("#add-to-cart-button")
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    // Verificar a mensagem "Adicionado ao carrinho"
    cy.get("#sw-atc-confirmation")
      .should("be.visible")
      .and("contain.text", "Adicionado ao carrinho");

    // Valida que botão fechar pedido está disponivel
    cy.get("#sc-buy-box-ptc-button")
      .should("be.visible")
      .and("contain.text", "Fechar pedido");

    // Verificar se o botão "Ir para o carrinho" está visível
    cy.get("#sw-gtc")
      .should("be.visible")
      .and("contain.text", "Ir para o carrinho");

    // Quantidade do carrinho é atualizado para uma unidade.
    cy.get("#nav-cart-count")
      .should("be.visible")
      .and(($count) => {
        const countValue = parseInt($count.text().trim());
        expect(countValue).to.be.equal(1);
      });
  });

  //Test Case 8: Adicionar mais produtos que a quantidade disponível em estoque
  it("Deve exibir mensagem de erro ao tentar adicionar mais unidades do que o estoque permite", () => {
    // Pesquisar pelo produto "Kenneth Cole New York Relógio analógico automático redondo masculino"
    cy.get("#twotabsearchtextbox")
      .clear()
      .type(
        "Kenneth Cole New York Relógio analógico automático redondo masculino{enter}"
      );

    // Selecionar o produto "Kenneth Cole New York Relógio analógico automático redondo masculino"
    cy.get(".s-main-slot .s-result-item")
      .contains("Relógio analógico automático redondo masculino")
      .click();

    // Verificar que estamos na página de detalhes do produto
    cy.get("#productTitle")
      .should("be.visible")
      .and("contain.text", "Relógio analógico automático redondo masculino");

    // Adicionar o produto ao carrinho
    cy.get("#add-to-cart-button")
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    // No carrinho incrementa mais um item
    cy.get("#sw-gtc")
      .should("be.visible")
      .and("contain.text", "Ir para o carrinho")
      .click();

    // Incrementa a quantidade
    cy.get('[data-a-selector="increment"]').click();
    cy.contains("No momento há apenas 1 em estoque.").should("exist");

    // Verificar se o carrinho ainda tem apenas 1 unidade
    cy.get("#nav-cart-count")
      .should("be.visible")
      .and(($count) => {
        const countValue = parseInt($count.text().trim());
        expect(countValue).to.be.equal(1); // Garante que há pelo menos um item no carrinho
      });
  });
});
