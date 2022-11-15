describe("page stack display correctly", () => {
  before(() => {
    cy.visit("/stack");
  });

  it("page has input field and disabled button", () => {
    //проверка существования поля ввода и пустое ли оно
    cy.get('input[type="text"]').should("have.value", "");
    cy.get('input[type="text"]').should("be.empty");

    cy.get("button").should("be.disabled").contains("Добавить");
    cy.get("button").should("be.disabled").contains("Удалить");
    cy.get("button").should("be.disabled").contains("Очистить");
  });

  //добавление первого элемента
  it("write a first number in input field", () => {
    cy.get('input[type="text"]').type(`${30}`); //цифра для проверки
    cy.get("button").should("be.enabled").contains("Добавить"); // кнопка Добавить становится активной
  });

  it("click button and number add correсtly and clear input field", () => {
    cy.get("button").contains("Добавить").click();
    cy.get('input[type="text"]').type(`${undefined}`); //пустое поле
    cy.get('[class^="circle_circle"]').should("have.length", 1).contains(30);
    cy.get('[class^="circle_circle"]').should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.wait(500);
  });

  it("first number have default color and buttons activated", () => {
    cy.get('[class^="circle_circle"]').should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("button").should("be.disabled").contains("Добавить");
    cy.get("button").should("be.enabled").contains("Удалить");
    cy.get("button").should("be.enabled").contains("Очистить");
  });

  //добавление второго элемента
  it("write a second number in input field", () => {
    cy.get('input[type="text"]').type(`${666}`); //цифра для проверки
    cy.get("button").should("be.enabled").contains("Добавить"); // кнопка Добавить становится активной
  });

  it("click button and number add correсtly and clear input field", () => {
    cy.get("button").contains("Добавить").click();
    cy.get('[class*="circle_circle"]')
      .should("have.length", 2)
      .each(($div, index) => {
        if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains(30);
        if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains(666);
      });
    cy.get('input[type="text"]').type(`${undefined}`); //пустое поле

    cy.wait(500);

    cy.get("button").should("be.disabled").contains("Добавить");
  });

  it("all number have default color and buttons activated", () => {
    cy.get('[class*="circle_circle"]').should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("button").should("be.enabled").contains("Удалить");
    cy.get("button").should("be.enabled").contains("Очистить");
  });

  //удаление элементов
  it("click button and number delete correсtly", () => {
    cy.get("button").contains("Удалить").click();
    cy.get('[class*="circle_circle"]')
      .should("have.length", 2)
      .each(($div, index) => {
        if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains(666);
      });
    cy.wait(500);
    cy.get('[class^="circle_circle"]').should("have.length", 1);
    cy.get("button").should("be.enabled").contains("Удалить");
    cy.get("button").should("be.enabled").contains("Очистить");
  });

  //пробуем добавить снова элемент
  it("repeat write a second number in input field", () => {
    cy.get('input[type="text"]').type(`${55}`); //цифра для проверки
    cy.get("button").should("be.enabled").contains("Добавить"); // кнопка Добавить становится активной
  });

  it("repeat click button and number add correсtly and clear input field", () => {
    cy.get("button").contains("Добавить").click();
    cy.get('[class*="circle_circle"]')
      .should("have.length", 2)
      .each(($div, index) => {
        if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains(30);
        if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains(55);
      });
    cy.get('input[type="text"]').type(`${undefined}`); //пустое поле

    cy.wait(500);

    cy.get("button").should("be.disabled").contains("Добавить");
  });

  it("repeat all number have default color and buttons activated", () => {
    cy.get('[class*="circle_circle"]').should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("button").should("be.enabled").contains("Удалить");
    cy.get("button").should("be.enabled").contains("Очистить");
  });

  //очистить элементы
  it("click button and clear numbers correсtly", () => {
    cy.get("button").contains("Очистить").click();
    cy.get('[class*="circle_content"]').should("have.length", 0);
  });

  //пробуем добавить снова элемент
  it("repeat write a first number in input field", () => {
    cy.get('input[type="text"]').type(`${4}`); //цифра для проверки
    cy.get("button").should("be.enabled").contains("Добавить"); // кнопка Добавить становится активной
  });

  it("repeat click button and number add correсtly and clear input field", () => {
    cy.get("button").contains("Добавить").click();
    cy.get('input[type="text"]').type(`${undefined}`); //пустое поле
    cy.get('[class^="circle_circle"]').should("have.length", 1).contains(4);
    cy.get('[class^="circle_circle"]').should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.wait(500);
  });

  it("repeat first number have default color and buttons activated", () => {
    cy.get('[class^="circle_circle"]').should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("button").should("be.disabled").contains("Добавить");
    cy.get("button").should("be.enabled").contains("Удалить");
    cy.get("button").should("be.enabled").contains("Очистить");
  });
});
