# Проектная работа. МБОУ АЛГОСОШ им. Фибоначчи. Визуализатор алгоритмов

Эта проектная работа заточена на анимацию и поэтапное отображение работы алгоритма, что позволяет детальнее понять каждый шаг его работы.

Проект сделан в соответствии с дизайно по [макету](https://www.figma.com/file/RIkypcTQN5d37g7RRTFid0/Algososh_external_link?node-id=0%3A1) в Figma.

Ссылка на [Vercel](https://algorithms-r17g76p0v-avaveryu.vercel.app/)

## Строка

На этом экране визуализирован разворот строки.

**Компоненты**

![Начальное состояние страницы](README_static/Untitled.png)
Начальное состояние страницы

Введите текст в инпут и нажмите развернуть.

**Визуализация**

Сначала на экране появится слово, буквы которого записаны в синие кружки.
![Строка в исходном виде](README_static/Untitled%201.png)
Строка в исходном виде

Два кандидата на сортировку подсвечены цветом `#D252E1`. Уже отсортированные элементы выделены `#7FE051`.

На скриншоте показана строка, в которой поменяли местами крайние символы:
![Промежуточный этап разворота строки](README_static/Untitled%202.png)
Промежуточный этап разворота строки

## Последовательность Фибоначчи

На этом экране визуализирована генерация `n` чисел последовательности Фибоначчи.

**Компоненты**

![Начальное состояние страницы](README_static/Untitled%203.png)
Начальное состояние страницы

Например, вы ввели 4, тогда на экране должен появиться ряд 1, 1, 2, 3, 5. Можно вводить только положительные целые числа. И так как последовательность бесконечна, есть максимальная граница ввода 1 ≤ `n`≤ 19.

**Визуализация**

Элементы отображаются постепенно: сначала появляется один, потом второй, третий и так до `n`.
![Сгенерированная последовательность](README_static/Untitled%204.png)
Сгенерированная последовательность

## Сортировка массива

На этом экране визуализированы алгоритмы сортировки выбором и пузырьком.

**Компоненты**

На странице основные компоненты:

- RadioInput для выбора способа сортировки (выбором и пузырьком). По умолчанию стоит значение «Выбор».
- Кнопка «По убыванию», по клику на неё элементы массива отсортируются по убыванию, алгоритм сортировки выбираем тот, который указан в RadioInput.
- Кнопка «По возрастанию», по клику на неё элементы массива отсортируются по возрастанию, алгоритм сортировки выбираем тот, который указан в RadioInput.
- Кнопка «Новый массив», по клику на неё генерируется новый массив.

![Начальное состояние страницы](README_static/Untitled%205.png)
Начальное состояние страницы

Чтобы задать массив случайных чисел, написана функция `randomArr` с условиями:

- массив состоит из целых чисел $[0; 100]$,
- минимальное количество элементов массива `minLen = 3`, максимальное `maxLen = 17`.

**Визуализация**

Когда вы нажмёте «По убыванию» или «По возрастанию», запустится процесс сортировки в зависимости от выбранного способа: выбором или пузырьком.

## Стек

На этом экране визуализированы удаление и добавление элементов в структуру данных стек.

**Компоненты**

На странице основные компоненты:

- Инпут для ввода значений, которые будут добавляться в стек.
- Кнопкa «Добавить», по клику на неё вызывается метод стека `push(item)`.
- Кнопкa «Удалить», по клику на неё вызывается метод стека `pop()`.
- Кнопка «Очистить», чтобы по клику на неё сразу удалить все элементы из стека.

![Начальное состояние страницы](README_static/Untitled%206.png)
Начальное состояние страницы

**Визуализация добавления**

Если ввести в инпут значение и нажать «Добавить», в стеке появится первый элемент.

Для отображения элементов стека использован компонент Circle. Внутри записывается введённое значение, сверху компонента — указатель на вершину стека `top`, а снизу — номер индекса элемента (для первого элемента — `0` и так далее).

При добавлении ещё одного элемента справа от предыдущего появится Circle с новым значением и индексом 1. И теперь уже над ним окажется подпись `top`.

**Визуализация удаления**

Если нажать «Удалить», из стека извлекается только верхний элемент. Удаляемый элемент выделяется цветом, надпись `top` перемещается на его левого соседа.

Если в стеке всего один элемент, то после нажатия «Удалить» на странице не отображаются никакие элементы стека.

По клику на кнопку «Очистить» из стека удаляются все элементы сразу.

## Очередь

На этом экране визуализированы удаление и добавление элементов в структуру данных «очередь».

**Компоненты**

На странице основные компоненты:

- инпут для ввода значений, которые будут добавляться в очередь;
- кнопкa «Добавить», по клику на неё вызывается метод очереди `enqueue(item)`;
- кнопкa «Удалить», по клику на неё вызывается метод очереди `dequeue()`;
- кнопка «Очистить», чтобы по клику на неё сразу удалить все элементы из очереди;

![Начальное состояние страницы](README_static/Untitled%207.png)
Начальное состояние страницы

**Визуализация**

Если ввести в инпут значение 2 и нажать «Добавить», элемент отобразится под индексом 0. Также добавлен на элемент указатели `head` и `tail`. Инпут при этом очищается.

![Очередь с одним элементом](README_static/Untitled%208.png)
Очередь с одним элементом

![Очередь из трёх элементов в момент добавления](README_static/Untitled%209.png)
Очередь из трёх элементов в момент добавления

Теперь если нажать «Удалить», из очереди извлечется элемент под индексом 0, a `head` будет перемещён на элемент с индексом 1.

![Очередь после `dequeue();`](README_static/Untitled%2010.png)
Очередь после `dequeue();`

## Связный список

На этом экране реализованы удаление и добавление элементов в связный список.

**Компоненты**

На странице основные компоненты:

Для добавления элемента:

- инпут с плейсхолдером «Введите значение» для ввода значения, которое будете добавлять в список;
- кнопка «Добавить в head», по клику на которую значение из инпута станет новой головой списка, инпут при этом очищается;
- кнопка «Добавить в tail», по клику на которую значение из инпута станет новым хвостом списка, инпут при этом очищается.

Для удаления элемента:

- кнопка «Удалить из head», по клику на которую удаляется первый элемент из списка;
- кнопка «Удалить из tail», по клику на которую удаляется последний элемент из списка.

Для удаления или добавления по индексу:

- инпут с плейсхолдером «Введите индекс» для ввода индекса элемента связного списка;
- кнопка «Добавить по индексу», по клику на которую значение из инпута занимает в списке место под номером, инпут с при этом очищаем;
- кнопка «Удалить по индексу», по клику на которую удаляется элемент по индексу из списка.

Кроме элементов управления, на странице отображается небольшой рандомный связный список.

![Начальное состояние страницы](README_static/Untitled%2011.png)
Начальное состояние страницы

### Визуализация

**При добавлении в head** элемент появится над первым элементом вместо надписи head.

![Добавление в head](README_static/Untitled%2012.png)
Добавление в head

Затем он занимает первое место в списке и на долю секунды выделяется зелёным цветом. Теперь над новым элементом написано head, и он указывает на предыдущий head-элемент.

![Отображение нового элемента в head](README_static/Untitled%2013.png)
Отображение нового элемента в head

**При добавлении в tail** элемент появится в хвосте над элементом с надписью tail. Затем он занимает последнее место в списке и на долю секунды выделяется зелёным цветом. Теперь под новым элементом написано tail.

**При добавлении элемента по индексу** должны быть заполнены два поля: «Введите значение» и «Введите индекс». Помните, что вся анимация выполняется поэтапно:

- По клику на «Добавить по индексу» новый элемент отобразится над первым элементом.
- Пока ищем нужный индекс, поочерёдно подсвечиваем элементы. Добавляемый элемент перепрыгивает по списку до искомого индекса.
- Когда индекс найден, отображается новый элемент над ним и добавлятся.

В этом примере число 10 должно занимать индекс 2.
![Добавление по индексу. Поиск индекса](README_static/Untitled%2014.png)
Добавление по индексу. Поиск индекса

После успешного добавления 10 стоит под порядковым номером 2 и указывает на 34.
![Добавление по индексу. Новый элемент в списке](README_static/Untitled%2015.png)
Добавление по индексу. Новый элемент в списке

**При удалении элемента по индексу** сначала выделяются цветом элементы, пока не достигнем нужного индекса. Затем очищается значение в элементе и снизу отображается маленький кружок с удаляемым значением.

Например, вы ввели индекс 2 и нажали «Удалить по индексу». Сначала цветом выделяется элемент с индексом 0, потом с индексом 1, и когда мы дошли до нужного индекса, то удаляется элемент из связного списка:

![Удаление элемента под индексом 2](README_static/Untitled%2016.png)
Удаление элемента под индексом 2

**При удалении элемента из tail** кружок замещает надпись tail.
![Удаление элемента из tail](README_static/Untitled%2017.png)
Удаление элемента из tail

## План по доработке проекта

- адаптивная верстка
- добавление новых алгоритмов
