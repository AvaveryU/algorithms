import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputString, setInputString] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false); //флаг для активной кнопки
  const [massivLetter, setMassivLetter] = useState<number[]>();
  const [change, setChange] = useState<any>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputString(event.target.value);
  };
  const massiv = inputString.split(""); //из строки делаем массив
  const onExpand = () => {
    setFlag(true);
    let start = 0;
    let end = massiv.length - 1;
    let arr: number[] = [];
    setChange(ElementStates.Default);
    for (let i = start; i < end; i++) {
      //arr = swap(massiv, start, end);
      start++;
      end--;
      setChange(ElementStates.Changing);
      setMassivLetter(arr);
    }
    setChange(ElementStates.Modified);
    setInputString(""); //очищаем инпут
    setFlag(false);
  };
  const fib = (n: number, memo: Record<number, number> = {}): number => {
    if (n in memo) {
      return memo[n];
    }
    if (n <= 2) {
      return 1;
    }
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
  };
  console.log(fib(6));
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.content}>
        <Input
          placeholder="Введите текст"
          type="text"
          extraClass={styles.frame}
          maxLength={19}
          onChange={handleChange}
          value={inputString}
          isLimitText
        />
        <Button
          text="Рассчитать"
          linkedList="small"
          onClick={onExpand}
          disabled={inputString !== null ? false : true}
          isLoader={!flag ? false : true}
        />
      </div>
      <div className={styles.circle}>
        {massivLetter?.map((letter: number, index: number) => {
          return <Circle letter={`${letter}`} key={index} state={change} />;
        })}
      </div>
    </SolutionLayout>
  );
};
