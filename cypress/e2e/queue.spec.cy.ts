describe("page queue display correctly", () => {
  before(() => {
    cy.visit("/queue");
  });

  it("page has input field and disabled button and default queue", () => {
    //проверка существования поля ввода и пустое ли оно
    cy.get('input[type="text"]').should("have.value", "");
    cy.get('input[type="text"]').should("be.empty");
    cy.get("button").should("be.disabled").contains("Добавить");
    cy.get("button").should("be.disabled").contains("Удалить");
    cy.get("button").should("be.disabled").contains("Очистить");
    cy.get('[class*="circle_content"]').should("have.length", 7);
    cy.get('[class*="circle_circle"]').should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });

  //добавление первого элемента
  it("write a first element in input field", () => {
    cy.get('input[type="text"]').type(`30`); //цифра для добавления
    cy.get("button").should("be.enabled").contains("Добавить"); // кнопка Добавить становится активной
  });

  it("click button and add element correсtly and clear input field", () => {
    cy.get("button").contains("Добавить").click();
    cy.get('input[type="text"]').clear(); //пустое поле
    cy.get('[class*="circle_circle"]').each(($div, index) => {
      if (index === 0) {
        cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("30");
        cy.get('[class*="circle_content"]').find('[class*="circle_tail"]').contains("tail");
      }
    });
    cy.wait(500);
  });

  it("first element have default color and buttons activated", () => {
    cy.get('[class*="circle_circle"]').should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("button").should("be.disabled").contains("Добавить");
    cy.get("button").should("be.enabled").contains("Удалить");
    cy.get("button").should("be.enabled").contains("Очистить");
  });

  //добавление второго элемента
  it("write a second element in input field", () => {
    cy.get('input[type="text"]').type(`YP`); //строка для проверки
    cy.get("button").should("be.enabled").contains("Добавить"); // кнопка Добавить становится активной
  });

  it("click button and add element correсtly and clear input field", () => {
    cy.get("button").contains("Добавить").click();
    cy.get('[class^="circle_circle"]').each(($div, index) => {
      if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("30");
      if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("YP");
    });
    cy.wait(500);
    //проверка курсоров head и tail
    cy.get('[class^="circle_content"]').each(($div, index) => {
      if (index === 0) {
        cy.wrap($div).find('[class*="circle_head"]').contains("head");
      }
      if (index === 1) {
        cy.wrap($div).find('[class*="circle_tail"]').contains("tail");
      }
    });
    cy.get('input[type="text"]').clear(); //пустое поле
    cy.get("button").should("be.disabled").contains("Добавить");
  });
  // проверка активности кнопок
  it("all element have default color and buttons activated", () => {
    cy.get('[class*="circle_circle"]').should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("button").should("be.enabled").contains("Удалить");
    cy.get("button").should("be.enabled").contains("Очистить");
  });

  //добавление третьего элемента
  it("write a third element in input field", () => {
    cy.get('input[type="text"]').type(`232`); //строка для проверки
    cy.get("button").should("be.enabled").contains("Добавить"); // кнопка Добавить становится активной
  });

  it("click button and add element correсtly and clear input field", () => {
    cy.get("button").contains("Добавить").click();
    cy.get('[class^="circle_circle"]').each(($div, index) => {
      if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("30");
      if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("YP");
      if (index === 2) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("232");
    });
    cy.wait(500);
    //проверка курсоров head и tail
    cy.get('[class^="circle_content"]').each(($div, index) => {
      if (index === 0) {
        cy.wrap($div).find('[class*="circle_head"]').contains("head");
      }
      if (index === 2) {
        cy.wrap($div).find('[class*="circle_tail"]').contains("tail");
      }
    });
    cy.get('input[type="text"]').clear(); //пустое поле
    cy.get("button").should("be.disabled").contains("Добавить");
  });
  // проверка активности кнопок
  it("all element have default color and buttons activated", () => {
    cy.get('[class*="circle_circle"]').should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("button").should("be.enabled").contains("Удалить");
    cy.get("button").should("be.enabled").contains("Очистить");
  });

  //удаление элементов
  it("click button and element delete correсtly", () => {
    cy.get("button").contains("Удалить").click();
    cy.get('[class*="circle_circle"]').each(($div, index) => {
      if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)");
      if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("YP");
      if (index === 2) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("232");
    });
    //проверка курсоров head и tail
    cy.get('[class^="circle_content"]').each(($div, index) => {
      if (index === 1) {
        cy.wrap($div).find('[class*="circle_head"]').contains("head");
      }
      if (index === 2) {
        cy.wrap($div).find('[class*="circle_tail"]').contains("tail");
      }
    });
    cy.wait(500);
    cy.get("button").should("be.enabled").contains("Удалить");
    cy.get("button").should("be.enabled").contains("Очистить");
  });

  // проверка активности кнопок
  it("all element have default color and buttons activated", () => {
    cy.get('[class*="circle_circle"]').should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("button").should("be.enabled").contains("Удалить");
    cy.get("button").should("be.enabled").contains("Очистить");
  });

  //очистить элементы
  it("click button and clear elements correсtly", () => {
    cy.get("button").contains("Очистить").click();
    cy.get('[class*="circle_circle"]').each(($div) => {
      expect($div.text(" "));
    });
  });

  it("all buttons disabled and circle has default color", () => {
    cy.get('[class^="circle_circle"]').should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("button").should("be.disabled").contains("Добавить");
    cy.get("button").should("be.disabled").contains("Удалить");
    cy.get("button").should("be.disabled").contains("Очистить");
  });
});
