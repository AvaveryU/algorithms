import { render, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("render component Button", () => {
  it("компонент Button без пропса text", () => {
    const component = render(<Button />);
    expect(component).toMatchSnapshot();
  });

  it("компонент Button c пропсом text", () => {
    const component = render(<Button text="test" />);
    expect(component).toMatchSnapshot();
  });

  it("компонент Button c пропсом disabled", () => {
    const component = render(<Button disabled />);
    expect(component).toMatchSnapshot();
  });

  it("компонент Button c пропсом isLoader", () => {
    const component = render(<Button isLoader />);
    expect(component).toMatchSnapshot();
  });

  it("срабатывает событие onClick", () => {
    const onClick = jest.fn(); //имитация колбэка
    const component = render(<Button text="test" onClick={onClick} />);
    fireEvent.click(component.getByText("test")); // имитация нажатия на кнопку
    expect(onClick).toHaveBeenCalled(); //проверка срабатывания колбэка
  });
});
