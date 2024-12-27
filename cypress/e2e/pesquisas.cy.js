describe("Pesquisa Vazia na Amazon", () => {
  // Acessa a página da Amazon antes de cada teste
  beforeEach(() => {
    cy.visit("https://www.amazon.com.br");
  });

  // Test Case 1: Pesquisa Vazia
  it("Deve exibir pagina home padrão quando a pesquisa estiver vazia", () => {
    // Limpa o campo de pesquisa e pressiona "Enter" sem digitar nada
    cy.get("#twotabsearchtextbox") // Localiza o campo de pesquisa
      .clear()
      .type("{enter}");

    it("Deve exibir os itens do menu corretamente", () => {
      // Verificar se o menu "Todos" está visível
      cy.contains("Todos", { timeout: 10000 }).should("be.visible");

      // Verificar se o menu "Vendas na Amazon" está visível
      cy.contains("Vendas na Amazon").should("be.visible");

      // Verificar se o menu "Ofertas do dia" está visível
      cy.contains("Ofertas do dia").should("be.visible");

      // Verificar se o menu "Mais Vendidos" está visível
      cy.contains("Mais Vendidos").should("be.visible");

      // Verificar se o menu "Prime" está visível
      cy.contains("Prime").should("be.visible");

      // Verificar se o menu "Livros" está visível
      cy.contains("Livros").should("be.visible");
    });

    // Verificar se a seção "Conheça os Novos E-readers Kindle" está visível
    cy.contains("Conheça os Novos E-readers Kindle", { timeout: 5000 }).should(
      "be.visible"
    );

    // Verificar se a seção "Ofertas melhores avaliadas" está visível
    cy.contains("Ofertas melhores avaliadas", { timeout: 5000 });

    // Verificar se a seção "Ofertas do Dia: Até 40% de desconto"
    cy.contains("Ofertas do Dia: Até 40% de desconto", {
      timeout: 5000,
    }).should("be.visible");
  });

  // Test Case 2: Realizar pesquisa com nome de produto válido
  it('Deve exibir produtos relacionados à palavra "Pneu" com preços, avalições e imagens', () => {
    // Localizar o campo de pesquisa e digitar "Pneu"
    cy.get("#twotabsearchtextbox").clear().type("Pneu{enter}");

    // Verificar se a página exibe produtos relacionados à palavra "Pneu"
    cy.get(".s-main-slot .s-result-item").should("have.length.greaterThan", 2);

    // Verificar se ao menos um produto contém a palavra "Pneu" no nome e exibe um valor
    cy.get(".s-main-slot .s-result-item").then(($items) => {
      const validProduct = Array.from($items).some((item) => {
        const nameElement = item.querySelector(
          ".a-size-base-plus.a-spacing-none"
        );
        const priceElement = item.querySelector(".a-price .a-offscreen");
        const imageElement = item.querySelector(".s-image");
        const ratingElement = item.querySelector(".a-icon-alt");
        const hasPneuInName =
          nameElement && nameElement.textContent.toLowerCase().includes("pneu"); // VErifica se tem pneu no nome
        const hasPrice = priceElement && priceElement.textContent.trim() !== "";
        const hasImage = imageElement !== null;
        const hasAvaliações = ratingElement !== null;
        return hasPneuInName && hasPrice && hasImage && hasAvaliações;
      });
      expect(
        validProduct,
        "Nenhum produto com a palavra 'Pneu', Avaliações, Preço e Imagem"
      ).to.be.true; // Valida que há pelo menos um produto com "Pneu" e preço
    });
  });

  // Test Case 3: Pesquisa por produto inexistente
  it("O usuário pesquisa por um produto que não retorna resultados", () => {
    cy.visit("https://www.amazon.com.br"); // Acessa o site da Amazon

    // Localizar o campo de pesquisa e digitar "Pneu"
    cy.get("#twotabsearchtextbox").clear().type("produtofake321{enter}");

    // Verificar se a página exibe produtos relacionados à palavra "Pneu"
    cy.get(".s-main-slot .s-result-item").should("have.length.lessThan", 4);

    // Verificar se ao menos um produto contém a palavra "Pneu" no nome e exibe um valor
    cy.get(".s-main-slot .s-result-item") // Seleciona os itens de resultado
      .then(($items) => {
        const validProduct = Array.from($items).some((item) => {
          const nameElement = item.querySelector(
            ".a-size-base-plus.a-spacing-none"
          );
          const hasPneuInName =
            nameElement &&
            nameElement.textContent.toLowerCase().includes("pneu"); // VErifica se tem pneu no nome
          return hasPneuInName; // Retorna true se o nome contém "Pneu"
        });
        expect(validProduct, "Foi Encontrado um item para a pesquisa").to.be
          .false; // Valida que não existe nenhum item para a pesquisa realizada
      });

    // Verificar que a mensagem "Nenhum resultado para" é exibida
    cy.get(".s-main-slot")
      .should("be.visible")
      .and("contain.text", "Nenhum resultado para");
  });

  // Test Case 4: Exibir detalhes do produto
  it("Deve exibir detalhes do produto", () => {
    // Selecionar o produto disponível na tela
    cy.get('[data-csa-c-item-id="amzn1.deal.91e9a762:amzn1.asin.B0BT4Z9LZB"]')
    .find('a.a-link-normal') 
    .scrollIntoView() 
    .should('be.visible')
    .click(); // Clica no link

    // Validações na pagina de detalhes do produto
    // Nome do produto
    cy.get("#productTitle").should("be.visible").and("not.be.empty"); // Verifica que o nome não está vazio

    // Verifica que a marca está visível
    cy.get("#bylineInfo").should("be.visible").and("not.be.empty");

    // Detalhes técnicos (Exemplo: Detalhes do produto abaixo da descrição ou título)
    cy.get("#productDetails_techSpec_section_1")
      .should("be.visible")
      .and("not.be.empty");

    // Descrição detalhada do produto contento todas as informações do produto
    cy.get(".premium-aplus").should("be.visible").and("not.be.empty");

    // Preço do produto
    cy.get(".a-price-whole") // Selecionando o preço completo, parte inteira
      .should("be.visible")
      .and("not.be.empty");

    // Avaliações e comentários
    cy.get("#averageCustomerReviews")
      .should("be.visible") // Verifica que a seção de avaliações está visível e não estão vazias
      .and("not.be.empty");

    // Verifica se o botão está visivel e não está desabilitado
    cy.get("#add-to-cart-button", { timeout: 5000 })
      .should("be.visible")
      .and("not.be.disabled")
      .and("not.have.attr", "aria-disabled", "true")
      .and("have.attr", "value")
      .and("not.be.empty");
  });

  // Test Case 5: Exibir produtos relacionados
  it("Deve exibir produtos relacionados ao produto pesquisado", () => {
    // Pesquisar pelo produto "PNEU GOODYEAR ARO 14"
    cy.get("#twotabsearchtextbox")
      .clear() // Limpa o campo, caso haja algo
      .type("PNEU GOODYEAR ARO 14{enter}");

    // Selecionar o produto "PNEU GOODYEAR ARO 14"
    cy.get(".s-main-slot .s-result-item") // Encontra todos os itens de resultado
      .contains("PNEU GOODYEAR ARO 14")
      .click();

    // Verificar se existe uma seção de "Produtos relacionados a este item"
    cy.get(".a-carousel-display-swap") // Seleciona a seção de produtos relacionados
      .should("be.visible")
      .and("not.be.empty")
      .and("contain.text", "Produtos relacionados a este item");

    cy.get(".a-carousel-card")
      .should("have.length.greaterThan", 0) // Verifica que tem produtos relacionados validos
      .each(($card) => {
        cy.wrap($card)
          .find("img")
          .should("have.attr", "src")
          .and("match", /https?:\/\/.+/); // Verifica validade da URL da imagem
      });

    //Test Case 6: Exibir detalhes técnicos
    it("Deve exibir detalhes do produto", () => {
      // Selecionar o primeiro produto disponível na tela
      cy.get(
        ".a-section.a-spacing-none.aok-float-left.aok-relative._quad-multi-asin-card-v2_style_quadrant__3xH-V"
      ) //Pega itens da primeira sessão de produtos
        .first() // Seleciona o primeiro item da lista
        .find("a.a-link-normal") // Localiza e clica no Link
        .click();

      // Validações na pagina de detalhes do produto
      // Valida detalhes técnicos
      cy.get("#productDetails_techSpec_section_1")
        .should("be.visible") // Verifica que os detalhes técnicos estão visíveis e não estão vazios
        .and("not.be.empty")
        .and("contain.text", "Dimensões do produto")
        .and("contain.text", "Cor")
        .and("contain.text", "Peso");
    });
  });
});
