import { ElementStates } from "../../types/element-states";

//функция для перестановки символов и замены цвета circle
export const swap = (
  arr: { letter: string; color: ElementStates }[],
  firstIndex: number,
  secondIndex: number,
  color: ElementStates,
  setState: any
) => {
  const temp = arr[firstIndex];
  if (firstIndex <= secondIndex) {
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    arr[firstIndex].color = color;
    arr[secondIndex].color = color;
  }
  setState([...arr]);
  arr[firstIndex].color = ElementStates.Modified;
  arr[secondIndex].color = ElementStates.Modified;
};
