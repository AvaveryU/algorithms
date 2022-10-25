export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => void;
  checkHead: () => { element: T | null; index: number };
  checkTail: () => { element: T | null; index: number };
}

export class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
  head = 0;
  tail = 0;
  private readonly size: number = 0;
  length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Превышена максимальная длина очереди!");
    }
    this.container[this.tail] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("Нет элементов в очереди для удаления");
    }
    this.container[this.head] = null;
    this.head++;
    this.length--;
  };

  peak = () => {
    if (this.isEmpty()) {
      throw new Error("Нет элементов в очереди для удаления");
    }
    this.head = 0;
    this.length = 0;
    this.tail = 0;
  };

  checkHead = (): { element: T | null; index: number } => {
    if (this.isEmpty()) {
      throw new Error("Нет элементов в очереди");
    }
    return { element: this.container[this.head], index: this.head };
  };
  checkTail = (): { element: T | null; index: number } => {
    if (this.isEmpty()) {
      throw new Error("Нет элементов в очереди");
    }
    return { element: this.container[this.tail - 1], index: this.tail - 1 };
  };
  isEmpty = () => this.length === 0;
}
