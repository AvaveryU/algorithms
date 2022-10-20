import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputNumber, setInputNumber] = useState<number>();
  const [flag, setFlag] = useState<boolean>(false); //флаг для активной кнопки
  const [massivItem, setMassivItem] = useState<number[]>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNumber(Number(event.currentTarget.value));
  };
  //функция для последовательности фибоначчи
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
  //функция при клике на кнопку 'Развернуть'
  const onExpand = async () => {
    setFlag(true);
    let start = 1;
    let arr: number[] = [];

    if (inputNumber !== undefined) {
      for (let i = start; i <= inputNumber + 1; i++) {
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
        arr.push(fib(i));
        setMassivItem([...arr]);
      }
    }
    setFlag(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.content}>
        <Input
          placeholder="Введите текст"
          type="text"
          extraClass={styles.frame}
          maxLength={19}
          onChange={handleChange}
          value={inputNumber || ""}
          isLimitText
        />
        <Button
          text="Рассчитать"
          linkedList="small"
          onClick={onExpand}
          disabled={inputNumber ? false : true}
          isLoader={!flag ? false : true}
        />
      </div>
      <div className={styles.circle}>
        {massivItem?.map((item, index) => {
          return <Circle letter={`${item}`} key={index} tail={`${index}`} />;
        })}
      </div>
    </SolutionLayout>
  );
};
