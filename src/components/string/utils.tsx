import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

//функция для перестановки символов и замены цвета circle
export const swap = async (
  arr: { letter: string; color: ElementStates }[],
  firstIndex: number,
  secondIndex: number,
  color: ElementStates,
  setState: any
) => {
  const temp = arr[firstIndex];
  //изменяем цвет circle, с которыми производим действие
  arr[firstIndex].color = color;
  arr[secondIndex].color = color;
  //пауза для визуализации переключения цвета circle
  await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
  if (firstIndex <= secondIndex) {
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  }
  setState([...arr]);
  arr[firstIndex].color = ElementStates.Modified;
  arr[secondIndex].color = ElementStates.Modified;
};
