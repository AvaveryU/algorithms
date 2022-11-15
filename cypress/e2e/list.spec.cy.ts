describe("page list display correctly", () => {
  before(() => {
    cy.visit("/list");
  });

  it("page has input field and disabled button and default queue", () => {
    //проверка существования полей ввода и пустые ли они
    cy.get('input[placeholder="Введите текст"]').should("have.value", "");
    cy.get('input[placeholder="Введите текст"]').should("be.empty");
    cy.get('input[placeholder="Введите индекс"]').should("have.value", "");
    cy.get('input[placeholder="Введите индекс"]').should("be.empty");
    //проверка существования кнопок
    cy.get('button[name="head"]').should("be.disabled").contains("Добавить в head");
    cy.get('button[name="tail"]').should("be.disabled").contains("Добавить в tail");
    cy.get('button[name="headRemoved"]').should("be.enabled").contains("Удалить из head");
    cy.get('button[name="tailRemoved"]').should("be.enabled").contains("Удалить из tail");
    cy.get('button[name="addElementIndex"]').should("be.disabled").contains("Добавить по индексу");
    cy.get('button[name="removeElementIndex"]').should("be.disabled").contains("Удалить по индексу");
  });
});
