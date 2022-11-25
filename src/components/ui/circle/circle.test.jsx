import { render } from "@testing-library/react";
import { Circle } from "./circle";
import React from "react";
import { ElementStates } from "../../../types/element-states";

describe("render component Circle", () => {
  it("компонент Circle без пропса letter", () => {
    const component = render(<Circle />);
    expect(component).toMatchSnapshot();
  });

  it("компонент Circle без пропса letter", () => {
    const component = render(<Circle letter={"j"} />);
    expect(component).toMatchSnapshot();
  });

  it("компонент Circle с пропсом head (текст)", () => {
    const component = render(<Circle head={"head"} />);
    expect(component).toMatchSnapshot();
  });

  it("компонент Circle с пропсом head (react-элемент)", () => {
    const element = React.createElement("div");
    const component = render(<Circle head={element} />);
    expect(component).toMatchSnapshot();
  });

  it("компонент Circle с пропсом tail (текст)", () => {
    const component = render(<Circle tail={"tail"} />);
    expect(component).toMatchSnapshot();
  });

  it("компонент Circle с пропсом tail (react-элемент)", () => {
    const element = React.createElement("div");
    const component = render(<Circle tail={element} />);
    expect(component).toMatchSnapshot();
  });

  it("компонент Circle с пропсом index", () => {
    const component = render(<Circle index={5} />);
    expect(component).toMatchSnapshot();
  });

  it("компонент Circle с пропсом isSmall", () => {
    const component = render(<Circle isSmall />);
    expect(component).toMatchSnapshot();
  });

  it("компонент Circle в состоянии default", () => {
    const component = render(<Circle state />);
    expect(component).toMatchSnapshot();
  });

  it("компонент Circle в состоянии changing", () => {
    const component = render(<Circle state={ElementStates.Changing} />);
    expect(component).toMatchSnapshot();
  });

  it("компонент Circle в состоянии modified", () => {
    const component = render(<Circle state={ElementStates.Modified} />);
    expect(component).toMatchSnapshot();
  });
});
