# Vue3

1、vue3 根组件可以不用包裹再一个容器中，交给 main.js 中的 createApp(App).mount('#app')

2、创建 vue-router 不一样

3、vue3cli 不支持 element

4、element 的标签上的 slot 属性被废弃，不止 element

# TS

1、安装 ts 依赖

2、console 不存在，直接安装 npm install @types/node

| 数据类型        |             栗子             |
| --------------- | :--------------------------: |
| boolean         | let isPerson: boolean= true; |
| number          |      let age:number=18;      |
| string          |  let name: string = 'Tom';   |
| void(空值)      | let address: void=undefined  |
| null            |   let height: number=null    |
| undefined       | let weight: number=undefined |
| any（任意类型） |             任意             |

注意：null 和 undefined 是所有类型的子类型，所有类型都可以用他来复制，void 不能赋值给 number

概念：

1、类型推断：没有明确指定类型，ts 会根据类型推断的规则推出一个类型

2、联合类型：取值可以为多种类型的一种

```typescript
let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 7
```

3、接口：是对行为的抽象，常用作于对类型的描述

```typescript
// 接口中的属性必须一个也不能少，一个也不能多
interface Person {
  name: string
  age: number
}

let tom: Person = {
  name: 'Tom',
  age: 25,
}
```

```typescript
// 接口中的age属性可有可无，但仍不可添加属性
interface Person {
  name: string
  age?: number
}

let tom: Person = {
  name: 'Tom',
  age: 25,
}
```

```typescript
// 接口中可以添加一个任意类型的属性
interface Person {
  name: string
  age?: number
  [propName: string]: any
}

let tom: Person = {
  name: 'Tom',
  age: 25,
}
```

```typescript
// 接口中可以添加一个string类型的属性，但是age属性的类型必须为string的子类型，不然就会报错
interface Person {
  name: string
  age?: number //报错
  [propName: string]: string // [propName: string]: string | number; 这样写不报错
}

let tom: Person = {
  name: 'Tom',
  age: 25,
}
```

```typescript
// 创建时可以对name进行赋值，但不能对那么进行修改
interface Person {
  readonly name: string
  age?: number
  [propName: string]: any
}

let tom: Person = {
  name: 'Tom',
  gender: 'male',
}

tom.name = 9527 // 报错
```

4、数组的类型

```typescript
// 数组中不能出现其他类型
let nums: number[] = [1, 2, 3, 4]

let strs: string[] = ['jack', 'rose']

// 泛型表示数组
let nums: Array<number> = [1, 1, 2, 3, 5]

// 接口表示数组
interface NumberArray {
  [index: number]: number
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5]
```

5、函数的类型

```typescript
// 不能多或者少输入参数
function sum(x: number, y: number): number {
  return x + y
}
sum(1, 2)

// =>：与ES6不同，左边代表输入类型，右边是输出类型
let calc: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y
}

// 接口定义函数
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1
}

// 可选的参数，这个可选参数必须是在参数的最后
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName
  } else {
    return firstName
  }
}
let tomcat = buildName('Tom', 'Cat')
let tom = buildName('Tom')

// 参数默认值
function buildName(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName
}
let tomcat = buildName('Tom', 'Cat')
let tom = buildName('Tom')

// 获取剩余参数
function getRest(array: number[], ...argus: number[]) {
  return argus
}
getRest([1, 2, 3], 2, 3, 4)

// 重载：允许一个函数接受不同数量或类型的参数，进行不同的处理
// 前几次是函数定义，最后一次是函数实现，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}
```

6、类型断言

```typescript
//1、将联合类型断言为其中的一个类型
interface Cat {
  name: string
  run(): void
}
interface Fish {
  name: string
  swim(): void
}

function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true
  }
  return false
}

// 2、将一个父类断言为更加具体的子类
interface ApiError extends Error {
  code: number
}
interface HttpError extends Error {
  statusCode: number
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === 'number') {
    return true
  }
  return false
}

// 3、将任何一个类型断言为any（不能滥用）
;(window as any).foo = 1

// 4、将any类型的属性断言为具体类型
function getCacheData(key: string): any {
  return (window as any).cache[key]
}

interface Cat {
  name: string
  run(): void
}

const tom = getCacheData('tom') as Cat
tom.run()

// 5、要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可（Animal和Cat互相兼容）
interface Animal {
  name: string
}
interface Cat {
  name: string
  run(): void
}

function testAnimal(animal: Animal) {
  return animal as Cat
}
function testCat(cat: Cat) {
  return cat as Animal
}
```

7、类型别名

```typescript
// 给一个类型起新名字,常用于联合类型
type name = string
type address = () => string // 无输入类型，输出类型为
type Info = name | address
function getInfo(n: Info): string {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}
function getAddress(): string {
  return 'beijing'
}
getInfo(getAddress)
```

8、字符串字面量类型

```typescript
// 只能取字符串中的任意一个，类似于类型联合，只不过这是字符串联合
type EventNames = 'click' | 'scroll' | 'mousemove'
function handleEvent(ele: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById('hello'), 'scroll') // 没问题
handleEvent(document.getElementById('world'), 'dblclick') // 报错，event 不能为 'dblclick'
```

9、元组

```typescript
let person: [string, number]
person[0] = 'jack'
person[1] = 18

let person: [string, number] = ['rose', 18]

person.push('tom')
```

10、枚举

```typescript
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

// 常数枚举
const enum Directions {
  Up,
  Down,
  Left,
  Right,
}
let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
]
// 编译结果
var directions = [0, 1, 2, 3]

// 外部枚举
declare enum Directions {
  Up,
  Down,
  Left,
  Right,
}
let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
]

var directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
]

//declare和const一起用
declare const enum Directions {
  Up,
  Down,
  Left,
  Right,
}
let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
]
var directions = [0, 1, 2, 3]
```

11、类的用法

```typescript
// public：被修饰的属性和方法是公有的，在内部、外部、子类都可以被访问，所有的属性和方法都被public修饰
class Animal {
  public name
  public constructor(name) {
    this.name = name
  }
}

let a = new Animal('Jack')
console.log(a.name) // Jack
a.name = 'Tom'
console.log(a.name) // Tom

// private：被修饰的属性和方法是私有的，只能在类的内部被访问
class Animal {
  private name
  public constructor(name) {
    this.name = name
  }
}

let a = new Animal('Jack')
console.log(a.name) //报错
a.name = 'Tom' //报错

// protected：被修饰的属性和方法是受保护的，在内部、子类可被访问
class Animal {
  protected name
  public constructor(name: string) {
    this.name = name
  }
}
class Cat extends Animal {
  public constructor(name: string) {
    super(name)
  }
}

let a = new Cat('Jack')
console.log(a.name) //报错
a.name = 'Tom' //报错

// 类的类型
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  sayHi(): string {
    return `My name is ${this.name}`
  }
}

let a: Animal = new Animal('Jack')
console.log(a.sayHi()) // My name is Jack
```

12、抽象类

```typescript
//抽象类：只用来形容类的属性和方法，不允许被实例化但可被继承，且抽象类中的抽象方法必须被子类实现
abstract class Animal {
  public name
  public constructor(name) {
    this.name = name
  }
  public abstract sayHi()
}

class Cat extends Animal {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`)
  }
}

let cat = new Cat('Tom')
```

13、类与接口

```typescript
// 类实现接口：实现（implements）
// 打个比方：门，有防盗门，其中的功能就是警报；车，也有警报功能；所以可以将警报功能做成一个接口，调用不同的类去实现
interface Alarm {
  alert(): void
}

class Door {}

class SecurityDoor extends Door implements Alarm {
  alert() {
    console.log('SecurityDoor alert')
  }
}

class Car implements Alarm {
  alert() {
    console.log('Car alert')
  }
}

//一个类实现多个接口
interface Alarm {
  alert(): void
}

interface Light {
  lightOn(): void
  lightOff(): void
}

class Car implements Alarm, Light {
  alert() {
    console.log('Car alert')
  }
  lightOn() {
    console.log('Car light on')
  }
  lightOff() {
    console.log('Car light off')
  }
}

// 接口继承接口
interface Alarm {
  alert(): void
}

interface LightableAlarm extends Alarm {
  lightOn(): void
  lightOff(): void
}

// 接口继承类：因为实例一个类的同时，也创建了一个类型
class Point {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

interface Point3d extends Point {
  z: number
}

let point3d: Point3d = { x: 1, y: 2, z: 3 }
```

14、泛型

```typescript
// 类似于占位符，在声明的时候可以使用<T>来占位，在使用时，可以将T改成想要的类型
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray<string>(3, 'x') // ['x', 'x', 'x']

// 多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

swap([7, 'seven']) // ['seven', 7]

// 泛型约束
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}
loggingIdentity({ size: 'big', length: 18 })

// 泛型接口定义函数
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>
}

let createArray: CreateArrayFunc<string>
createArray = function <T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

// 泛型类
class GenericNumber<T = string> {
  // 默认为string的泛型
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
  return x + y
}
```

15、合并

```typescript
// 接口合并：值得注意的是，合并的属性必须是不一样的，如果属性名一样，那么类型必须一样，否则报错
interface Alarm {
  price: number
}
interface Alarm {
  weight: number
}
// 相当于
interface Alarm {
  price: number
  weight: number
}

// 错误
interface Alarm {
  price: number
}
interface Alarm {
  price: string // 类型不一致，会报错
  weight: number
}

// 函数合并
interface Alarm {
  price: number
  alert(s: string): string
}
interface Alarm {
  weight: number
  alert(s: string, n: number): string
}
// 相当于
interface Alarm {
  price: number
  weight: number
  alert(s: string): string
  alert(s: string, n: number): string
}
```
