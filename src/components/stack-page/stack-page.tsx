import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number | string>();
  const [isDigit, setisDigit] = useState<{ digit: number | string; color: ElementStates }[]>([]);
  const [flag, setFlag] = useState<boolean>(false); //флаг для активной кнопки

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.target.value));
  };
  //функция при клике на кнопку 'Добавить'
  const addElement = async () => {
    setFlag(true);
    setInputValue("");
    if (inputValue) {
      isDigit.push({ digit: inputValue, color: ElementStates.Changing });
      setisDigit([...isDigit]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      isDigit[isDigit.length - 1].color = ElementStates.Default; // цвет последнего элемента в стэке
    }
    setFlag(false);
  };

  //функция при клике на кнопку 'Удалить'
  const deleteElement = async () => {
    setFlag(true);
    setInputValue("");
    isDigit[isDigit.length - 1].color = ElementStates.Changing; // цвет последнего элемента в стэке
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    isDigit.pop();
    setisDigit([...isDigit]);
    setFlag(false);
  };
  const resetElements = () => {
    while (isDigit.length > 0) {
      isDigit.pop();
      setisDigit([...isDigit]);
    }
  };
  return (
    <SolutionLayout title="Стек">
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
          disabled={inputValue ? false : true}
        />
        <Button
          text="Удалить"
          linkedList="small"
          extraClass={styles.button}
          onClick={deleteElement}
          isLoader={!flag ? false : true}
          disabled={isDigit[0] ? false : true}
        />
        <Button
          text="Очистить"
          linkedList="small"
          extraClass={styles.clear}
          onClick={resetElements}
          isLoader={!flag ? false : true}
          disabled={isDigit[0] ? false : true}
        />
      </div>
      <div className={styles.circle}>
        {isDigit &&
          isDigit?.map((item, index) => {
            return (
              <Circle
                letter={`${item.digit}`}
                key={index}
                state={item.color}
                index={index}
                head={index === isDigit.length - 1 ? "top" : ""}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
