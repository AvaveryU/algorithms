import React, { useCallback, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [inputString, setInputString] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false); //флаг для активной кнопки
  const [massivLetter, setMassivLetter] = useState<string[]>();
  const [change, setChange] = useState<any>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputString(event.target.value);
  };

  const swap = (arr: string[], firstIndex: number, secondIndex: number): string[] => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
  };
  const massiv = inputString.split(""); //из строки делаем массив
  const onExpand = () => {
    setFlag(true);

    let start = 0;
    let end = massiv.length - 1;
    let arr: string[] = [];
    setChange(ElementStates.Default);

    for (let i = start; i < end; i++) {
      arr = swap(massiv, start, end);
      start++;
      end--;
      setChange(ElementStates.Changing);
      setMassivLetter(arr);
    }
    setChange(ElementStates.Modified);

    setInputString(""); //очищаем инпут
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
        <Button text="Развернуть" linkedList="small" onClick={onExpand} disabled={inputString !== `` ? false : true} />
      </div>
      <div className={styles.circle}>
        {massivLetter?.map((letter: string, index: number) => {
          return <Circle letter={letter} key={index} state={change} />;
        })}
      </div>
    </SolutionLayout>
  );
};
