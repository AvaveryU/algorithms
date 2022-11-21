import { fireEvent, getByTestId, render, waitFor } from "@testing-library/react";
import { StringComponent } from "./string";
import { BrowserRouter as Router } from "react-router-dom";

jest.setTimeout(10000);
describe("Тестирование алгоритма разворота строки", () => {
  it("Корректно разворачивает строку с четным количеством символов", async () => {
    const { container } = render(
      <Router>
        <StringComponent />
      </Router>
    );
    const button = getByTestId(container, "button");
    // Находим инпут и проверяем начальное состояние
    const inputValue = getByTestId(container, "input");
    expect(inputValue.textContent).toBe("");
    // вписываем слово в инпут для разворота
    fireEvent.change(inputValue, { target: { value: "jest" } });
    fireEvent.click(button);
    await waitFor(() => expect(getByTestId(container, "circles").textContent).toBe("tsej"), {
      timeout: 1000 * 4, //1000мс на каждую букву с учетом длины слова
    });
  });

  it("Корректно разворачивает строку с нечетным количеством символов", async () => {
    const { container } = render(
      <Router>
        <StringComponent />
      </Router>
    );
    const button = getByTestId(container, "button");
    // Находим инпут и проверяем начальное состояние
    const inputValue = getByTestId(container, "input");
    expect(inputValue.textContent).toBe("");
    // вписываем слово в инпут для разворота
    fireEvent.change(inputValue, { target: { value: "hello" } });
    fireEvent.click(button);
    await waitFor(() => expect(getByTestId(container, "circles").textContent).toBe("olleh"), {
      timeout: 1000 * 5, //1000мс на каждую букву с учетом длины слова
    });
  });

  it("Корректно разворачивает строку с одним символом", async () => {
    const { container } = render(
      <Router>
        <StringComponent />
      </Router>
    );
    const button = getByTestId(container, "button");
    // Находим инпут и проверяем начальное состояние
    const inputValue = getByTestId(container, "input");
    expect(inputValue.textContent).toBe("");
    // вписываем слово в инпут для разворота
    fireEvent.change(inputValue, { target: { value: "j" } });
    fireEvent.click(button);
    await waitFor(() => expect(getByTestId(container, "circles").textContent).toBe("j"), {
      timeout: 1000 * 1, //1000мс на каждую букву с учетом длины слова
    });
  });

  it("Корректно разворачивает пустую строку", async () => {
    const { container } = render(
      <Router>
        <StringComponent />
      </Router>
    );
    const button = getByTestId(container, "button");
    // Находим инпут и проверяем начальное состояние
    const inputValue = getByTestId(container, "input");
    expect(inputValue.textContent).toBe("");
    // вписываем слово в инпут для разворота
    fireEvent.change(inputValue, { target: { value: "" } });
    fireEvent.click(button);
    await waitFor(() => expect(getByTestId(container, "circles").textContent).toBe(""), {
      timeout: 1000 * 0, //1000мс на каждую букву с учетом длины слова
    });
  });
});
