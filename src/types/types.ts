import { ElementStates } from "./element-states";

export type TPropItem = {
  num: number;
  color: ElementStates;
};

export type TPropItemInList = {
  element: string | number;
  color: ElementStates;
  isHeadAdd?: boolean; //флаг добавления в начало списка
  isTailAdd?: boolean; //флаг добавления в конец списка
  isTailRemove?: boolean; //флаг удаления с начала списка
  isHeadRemove?: boolean; //флаг удаления с конца списка
  isElementAdd?: boolean; //флаг добавления элемента по индексу
  isElementRemove?: boolean; //флаг удаления элемента по индексу
  topCircle?: {
    element: string;
  }; //флаг для визуала элемента сверху списка
  bottomCircle?: {
    element: string;
  }; //флаг для визуала элемента снизу списка
};
