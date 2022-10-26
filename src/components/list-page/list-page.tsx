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
  const [inputIndex, setInputIndex] = useState<number>();
  const [flag, setFlag] = useState<boolean>(false); //флаг для активной кнопки 1
  const [flagTwo, setFlagTwo] = useState<boolean>(false); //флаг для активной кнопки 2
  const [flagThree, setFlagThree] = useState<boolean>(false); //флаг для активной кнопки 3
  const [flagFour, setFlagFour] = useState<boolean>(false); //флаг для активной кнопки 4
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
  const [isValues, setValues] = useState<
    {
      element: string | number;
      color: ElementStates;
      isHeadAdd?: boolean;
      isTailAdd?: boolean;
      isTailRemove?: boolean;
      isHeadRemove?: boolean;
      topCircle?: any;
      bottomCircle?: any;
    }[]
  >(initArray);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.placeholder === "Введите текст") {
      setInputValue(event.target.value);
    } else {
      setInputIndex(Number(event.target.value));
    }
  };
  //функция при клике на кнопку 'Добавить'
  const addElement = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setInputValue("");
    const arr = [...isValues];
    if (event.currentTarget.name === "head") {
      setFlag(true);
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
    }
    //если нажали на кнопку добавить в tail
    else if (event.currentTarget.name === "tail") {
      setFlagTwo(true);
      let index = arr.length - 1;
      list.insertAt(inputValue, index); // добавление элемента в конец списка
      const tail = list.getIndex(index);
      list.print();
      //последний элемент в списке
      arr[index] = {
        ...arr[index],
        isTailAdd: true,
        topCircle: {
          element: tail ? tail : inputValue,
        },
      };
      setValues([...arr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      //указываем ключи для скрытия добавляемого элемента визуально (topCircle)
      arr[index] = {
        ...arr[index],
        isTailAdd: false,
        topCircle: null,
      };
      //новый элемент в начале очереди
      arr.push({
        element: tail ? tail : inputValue,
        color: ElementStates.Modified,
      });
      setValues([...arr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      arr[index + 1].color = ElementStates.Default; //возвращаем стандартный цвет нового 0го элемента
      setFlagTwo(false);
    }
    setInputValue("");
  };

  //функция при клике на кнопку 'Удалить'
  const deleteElement = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setInputValue("");
    const arr = [...isValues];
    //если удаляем начало списка
    if (event.currentTarget.name === "headRemoved") {
      setFlagThree(true);
      list.print();
      //0ой элемент в списке
      arr[0] = {
        ...arr[0],
        element: "",
        isHeadRemove: true,
        bottomCircle: {
          element: arr[0].element,
        },
      };
      setValues([...arr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      //указываем ключи для скрытия добавляемого элемента визуально (bottomCircle)
      arr[0] = {
        ...arr[0],
        isHeadRemove: false,
        bottomCircle: null,
      };
      //новый элемент в начале очереди
      arr.shift();
      setValues([...arr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      arr[0].color = ElementStates.Default; //возвращаем стандартный цвет нового 0го элемента
      setFlagThree(false);
    }
    //если удаляем конец списка
    else if (event.currentTarget.name === "tailRemoved") {
      setFlagThree(true);
      let index = arr.length - 1;
      list.print();
      //последний элемент в списке
      arr[index] = {
        ...arr[index],
        element: "",
        isTailRemove: true,
        bottomCircle: {
          element: arr[index].element,
        },
      };
      setValues([...arr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      //указываем ключи для скрытия добавляемого элемента визуально (bottomCircle)
      arr[index] = {
        ...arr[index],
        isTailRemove: false,
        bottomCircle: null,
      };
      //новый элемент в конце очереди
      arr.pop();
      setValues([...arr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      arr[index + 1].color = ElementStates.Default; //возвращаем стандартный цвет нового 0го элемента
      setFlagThree(false);
    }
    setValues([...arr]);
  };

  //функция при клике на кнопку 'Добавить по индексу'
  const addElementIndex = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setInputValue("");
    const arr = [...isValues];
    if (event.currentTarget.name === "addElementIndex") {
      setFlagFour(true);
      // list.insertAt(inputValue, 0); // добавление элемента в начало списка
      const tail = list.getIndex(arr.length - 1);
      //list.print();
      //последний элемент в списке
      arr[arr.length - 1] = {
        ...arr[arr.length - 1],
        isTailRemove: true,
        topCircle: {
          element: tail ? tail : inputValue,
        },
      };
      setValues([...arr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      //указываем ключи для скрытия добавляемого элемента визуально (topCircle)
      arr[arr.length - 1] = {
        ...arr[arr.length - 1],
        isTailRemove: false,
        topCircle: null,
      };
      //новый элемент в начале очереди
      arr.unshift({
        element: tail ? tail : inputValue,
        color: ElementStates.Modified,
      });
      setValues([...arr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      arr[arr.length + 1].color = ElementStates.Default; //возвращаем стандартный цвет нового 0го элемента
      setFlagFour(false);
    }
    setValues([...arr]);
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
          onClick={(event) => addElement(event)}
          name={`head`}
          isLoader={!flag ? false : true}
          disabled={inputValue ? false : true}
        />
        <Button
          text="Добавить в tail"
          linkedList="small"
          extraClass={styles.button}
          onClick={(event) => addElement(event)}
          name={`tail`}
          isLoader={!flagTwo ? false : true}
          disabled={inputValue ? false : true}
        />
        <Button
          text="Удалить из head"
          linkedList="small"
          extraClass={styles.button}
          name={"headRemoved"}
          onClick={(event) => deleteElement(event)}
          isLoader={!flagThree ? false : true}
          //disabled={inputValue ? false : true}
        />
        <Button
          text="Удалить из tail"
          linkedList="small"
          extraClass={styles.button}
          name={"tailRemoved"}
          onClick={(event) => deleteElement(event)}
          isLoader={!flagFour ? false : true}
          //disabled={inputValue ? false : true}
        />
        <Input
          placeholder="Введите индекс"
          type="text"
          extraClass={styles.frame}
          maxLength={1}
          onChange={handleChange}
          value={inputIndex || ""}
          isLimitText
        />
        <Button
          text="Добавить по индексу"
          linkedList="big"
          extraClass={styles.button__first}
          name={"addElementIndex"}
          disabled={inputIndex ? false : true}
        />
        <Button
          text="Удалить по индексу"
          linkedList="big"
          extraClass={styles.button__second}
          name={"removeElementIndex"}
          disabled={inputIndex ? false : true}
        />
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
                head={index === 0 && !item.isHeadAdd && !item.isHeadRemove ? "head" : ""}
                tail={index === isValues.length - 1 && !item.isTailAdd && !item.isTailRemove ? "tail" : ""}
              />
              {index !== isValues.length - 1 ? (
                <ArrowIcon fill={item.color === ElementStates.Changing ? "#D252E1" : "#0032FF"} />
              ) : null}
              {/* если сработал флаг добавления в начало списка */}
              {(item.isHeadAdd || item.isTailAdd) && (
                <Circle
                  isSmall
                  letter={`${item.topCircle.element}`}
                  key={id}
                  state={ElementStates.Changing}
                  extraClass={styles.top}
                />
              )}
              {/* если сработал флаг добавления в конец списка */}
              {(item.isTailRemove || item.isHeadRemove) && (
                <Circle
                  isSmall
                  letter={`${item.bottomCircle.element}`}
                  key={id}
                  state={ElementStates.Changing}
                  extraClass={styles.bottom}
                />
              )}
            </div>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
