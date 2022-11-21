import { fireEvent, getByTestId, render, waitFor } from "@testing-library/react";
import { ElementStates } from "../../types/element-states";
import { BrowserRouter as Router } from "react-router-dom";
import { SortingPage } from "./sorting-page";
import { sortOnIncrement } from "./utils";

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {
  it("Корректно сортирует массив из нескольких элементов по возрастанию", async () => {
    render(
      <Router>
        <SortingPage />
      </Router>
    );
    const massiv = [
      { num: 8, color: ElementStates.Default },
      { num: 3, color: ElementStates.Default },
      { num: 5, color: ElementStates.Default },
    ];
    const outMassiv = [
      { num: 3, color: ElementStates.Modified },
      { num: 5, color: ElementStates.Modified },
      { num: 8, color: ElementStates.Modified },
    ];
    expect(await sortOnIncrement(massiv, true)).toEqual(outMassiv);
  }, 1500);
});

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {
  it("Корректно сортирует пустой массив", async () => {
    render(
      <Router>
        <SortingPage />
      </Router>
    );
    const massiv = [{}];
    const outMassiv = [{}];
    expect(await sortOnIncrement(massiv, true)).toEqual(outMassiv);
  }, 500);
});

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {
  it("Корректно сортирует массив из одного элемента по возрастанию", async () => {
    render(
      <Router>
        <SortingPage />
      </Router>
    );
    const massiv = [{ num: 4, color: ElementStates.Default }];
    const outMassiv = [{ num: 4, color: ElementStates.Modified }];
    expect(await sortOnIncrement(massiv, true)).toEqual(outMassiv);
  }, 500);
});
