import { nanoid } from "nanoid";
import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./list";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const id = nanoid();
  const [inputValue, setInputValue] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false); //флаг для активной кнопки
  const list = new LinkedList<string>();
  //const [isHeadAdd, setHeadAdd] = useState<boolean>(false);

  //функция рандомного массива
  const randomArr = () => {
    let maxLen = 4; // max длина массива
    let maxNum = 30; // max число в массиве
    let length = Math.round(Math.random() + maxLen);
    let max = Math.round(Math.random() * maxNum);
    return Array.apply(null, Array(length)).map(() => {
      return { element: Math.round(Math.random() * max), color: ElementStates.Default }; //определенная структура элементов массива
    });
  };
  const initArray = randomArr();
  const [isValues, setValues] =
    useState<{ element: any; color: ElementStates; isHeadAdd?: boolean; topCircle?: any }[]>(initArray);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addElementHead = async () => {
    setFlag(true);
    setInputValue("");
    const arr = [...isValues];
    list.print();
    list.insertAt(inputValue, 0); // добавление элемента в начало списка
    const head = list.getIndex(0);
    list.print();
    //0ой элемент в списке
    arr[0] = {
      ...arr[0],
      isHeadAdd: true,
      topCircle: {
        element: head ? head : inputValue,
      },
    };

    setValues([...arr]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    //указываем ключи для скрытия добавляемого элемента визуально (topCircle)
    arr[0] = {
      ...arr[0],
      isHeadAdd: false,
      topCircle: null,
    };
    //новый элемент в начале очереди
    arr.unshift({
      element: head ? head : inputValue,
      color: ElementStates.Modified,
    });
    setValues([...arr]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    arr[0].color = ElementStates.Default; //возвращаем стандартный цвет нового 0го элемента
    setFlag(false);
    setInputValue("");
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.content}>
        <Input
          placeholder="Введите текст"
          type="text"
          extraClass={styles.frame}
          maxLength={4}
          isLimitText
          onChange={handleChange}
          value={inputValue || ""}
        />
        <Button
          text="Добавить в head"
          linkedList="small"
          extraClass={styles.button}
          onClick={addElementHead}
          isLoader={!flag ? false : true}
          disabled={inputValue ? false : true}
        />
        <Button text="Добавить в tail" linkedList="small" extraClass={styles.button} />
        <Button text="Удалить из head" linkedList="small" extraClass={styles.button} />
        <Button text="Удалить из tail" linkedList="small" extraClass={styles.button} />
        <Input placeholder="Введите индекс" type="text" extraClass={styles.frame} maxLength={1} />
        <Button text="Добавить по индексу" linkedList="big" extraClass={styles.button__first} />
        <Button text="Удалить по индексу" linkedList="big" extraClass={styles.button__second} />
      </div>
      <div className={styles.circle}>
        {isValues.map((item, index) => {
          return (
            <div className={styles.main}>
              <Circle
                letter={`${item.element}`}
                key={index}
                state={item.color}
                index={index}
                head={index === 0 && !item.isHeadAdd ? "head" : ""}
                //tail={item.tail}
              />
              {index !== isValues.length - 1 ? (
                <ArrowIcon fill={item.color === ElementStates.Changing ? "#D252E1" : "#0032FF"} />
              ) : null}
              {item.isHeadAdd && (
                <Circle
                  isSmall
                  letter={`${item.topCircle.element}`}
                  key={id}
                  state={ElementStates.Changing}
                  extraClass={styles.top}
                />
              )}
            </div>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
