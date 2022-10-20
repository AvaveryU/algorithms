import React, { useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [inputString, setInputString] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false); //флаг для активной кнопки
  const [massivLetter, setMassivLetter] = useState<{ letter: string; color: ElementStates }[]>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputString(event.target.value);
  };
  //функция для перестановки символов и замены цвета circle
  const swap = (
    arr: { letter: string; color: ElementStates }[],
    firstIndex: number,
    secondIndex: number,
    color: ElementStates
  ) => {
    const temp = arr[firstIndex];
    if (firstIndex <= secondIndex) {
      arr[firstIndex] = arr[secondIndex];
      arr[secondIndex] = temp;
      arr[firstIndex].color = color;
      arr[secondIndex].color = color;
    }
    setMassivLetter([...arr]);
    arr[firstIndex].color = ElementStates.Modified;
    arr[secondIndex].color = ElementStates.Modified;
  };
  //функция при клике на кнопку 'Развернуть'
  const onExpand = async () => {
    setFlag(true);
    const massiv = inputString.split(""); //из строки делаем массив
    let arr = massiv.map((item) => {
      return { letter: item, color: ElementStates.Default };
    });
    let start = 0;
    let end = arr.length - 1;

    setMassivLetter([...arr]);
    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS)); //пауза для отображения начального импута в визуале

    for (let i = start; i <= end; i++) {
      swap(arr, start, end, ElementStates.Changing);
      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS)); //пауза для визуала переключения цвета circle
      start++;
      end--;
      setMassivLetter([...arr]);
    }
    setFlag(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.content}>
        <Input
          placeholder="Введите текст"
          type="text"
          extraClass={styles.frame}
          maxLength={11}
          isLimitText
          onChange={handleChange}
          value={inputString}
        />
        <Button
          text="Развернуть"
          linkedList="small"
          onClick={onExpand}
          disabled={inputString !== `` ? false : true}
          isLoader={!flag ? false : true}
        />
      </div>
      <div className={styles.circle}>
        {massivLetter &&
          massivLetter.map((item, index) => {
            return <Circle letter={item.letter} key={index} state={item.color} />;
          })}
      </div>
    </SolutionLayout>
  );
};
