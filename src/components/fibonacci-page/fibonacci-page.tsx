import React, { FormEventHandler, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>();
  const [flag, setFlag] = useState<boolean>(false); //флаг для активной кнопки
  const [numberValue, setnumberValue] = useState<any>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.currentTarget.value));
  };

  const fib = (n: any, memo: Record<number, number> = {}): number => {
    let num = Number(n);

    if (num in memo) {
      setnumberValue(memo[num]);
      return memo[num];
    }
    if (num <= 2) {
      return 1;
    }
    memo[num] = fib(num - 1, memo) + fib(num - 2, memo);
    setnumberValue(memo[num]);
    console.log(memo[num]);
    return memo[num];
  };
  const onExpand = () => {
    fib(inputValue);
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
          value={inputValue}
          isLimitText
        />
        <Button
          text="Рассчитать"
          linkedList="small"
          onClick={onExpand}
          disabled={inputValue !== undefined ? false : true}
          isLoader={!flag ? false : true}
        />
      </div>
      <div className={styles.circle}>
        {numberValue?.map((item: any, index: number) => {
          return <Circle letter={`${item}`} key={index} />;
        })}
      </div>
    </SolutionLayout>
  );
};
