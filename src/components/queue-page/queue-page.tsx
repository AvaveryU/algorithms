import React, { useMemo, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TAIL, HEAD } from "../../constants/element-captions";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./queue";
import styles from "./queue-page.module.css";

type TPropItem = {
  element: string | null;
  color?: ElementStates;
  tail?: string;
  head?: string;
};

export const QueuePage: React.FC = () => {
  let size = 7;
  const queue = useMemo(() => new Queue<string>(size), []);
  //инициализируем начальный массив
  const container: TPropItem[] = [...queue.container].map(() => ({
    element: "",
    color: ElementStates.Default,
  }));
  const [inputValue, setInputValue] = useState<string>("");
  const [isValues, setValues] = useState<TPropItem[]>(container); //стейт для отображаемого массива с пустыми начальными значениями
  const [flag, setFlag] = useState<boolean>(false); //флаг для активной кнопки
  const [isCheckQueue, setCheckQueue] = useState<boolean>(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  //функция при клике на кнопку 'Добавить'
  const addElement = async () => {
    setFlag(true);
    setInputValue("");
    const arr = [...isValues];
    queue.enqueue(inputValue);

    const head = queue.checkHead();
    const tail = queue.checkTail();
    arr[head.index] = {
      element: head.element,
      head: HEAD,
    };
    if (tail.index > 0) {
      arr[tail.index - 1].tail = "";
    }
    arr[tail.index] = {
      element: tail.element,
      tail: TAIL,
      color: ElementStates.Changing,
    };
    setValues([...arr]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    arr[tail.index].color = ElementStates.Default;
    setFlag(false);
    setCheckQueue(true);
  };

  //функция при клике на кнопку 'Удалить'
  const deleteElement = async () => {
    setFlag(true);
    setInputValue("");
    const arr = [...isValues];
    const head = queue.checkHead();
    const tail = queue.checkTail();

    //если head и tail - это один и тот же элемент
    if (head.index === tail.index) {
      setCheckQueue(true);
      queue.peak();
      arr[head.index] = {
        element: "",
        head: "",
      };
      setCheckQueue(false);
    } else {
      queue.dequeue();
      const head = queue.checkHead();
      arr[head.index - 1].color = ElementStates.Changing;
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      if (head.index > 0) {
        arr[head.index - 1] = {
          element: "",
          head: "",
        };
        arr[head.index - 1].color = ElementStates.Default;
      }
      arr[head.index] = {
        element: head.element,
        head: HEAD,
      };
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      arr[head.index].color = ElementStates.Default;
    }
    setValues([...arr]);
    setFlag(false);
  };
  //функция при клике на кнопку 'Очистить'
  const resetElements = () => {
    queue.peak();
    setValues([...container]);
    setCheckQueue(false);
  };

  return (
    <SolutionLayout title="Очередь">
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
          text="Добавить"
          linkedList="small"
          extraClass={styles.button}
          onClick={addElement}
          isLoader={!flag ? false : true}
          disabled={inputValue && isValues[size - 1].element === "" ? false : true}
        />
        <Button
          text="Удалить"
          linkedList="small"
          extraClass={styles.button}
          onClick={deleteElement}
          isLoader={!flag ? false : true}
          disabled={isCheckQueue ? false : true}
        />
        <Button
          text="Очистить"
          linkedList="small"
          extraClass={styles.clear}
          isLoader={!flag ? false : true}
          disabled={isCheckQueue ? false : true}
          onClick={resetElements}
        />
      </div>
      <div className={styles.circle}>
        {isValues.map((item, index) => {
          return (
            <Circle
              letter={`${item.element}`}
              key={index}
              state={item.color}
              index={index}
              head={item.head}
              tail={item.tail}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
