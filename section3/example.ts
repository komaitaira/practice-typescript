/**
 * 3-1-1 letの型推論
 * 
 */
// let user = "Taro";
// let value = 0;
// let flag = false;

/**
 * 3-1-2 constの型推論
 * constで宣言された値は再代入を行うことができない。値が固定値であるため、プリミティブ型を代入すると適用される型推論はLiteralTypesになる。
 */
const user = "Taro";
const value = 0;
const flag = false;

/**
 * 3-2-1 Arrayの型推論
 * アノテーションなしで配列を宣言した場合、宣言時の初期要素によって配列の型が決定される
 */
// const a1 = [true, false];
// const a2 = [0, 1, "2"];
// const a3 = [false, 1, "2"];

/**
 * 3-2-1 Arrayの型推論
 * 配列に含むことのできる型を固定したい場合、代入時にアサーションを付与すると、配列の型推論に適用される
 */
const a1 = [0 as 0, 1 as 1] // const a1: (0 | 1)[]
a1.push(1);
a1.push(2); // Error

/**
 * 3-2-2 Tupleの型推論
 * Tupleとして確約されているindex値参照を行うと、代入された値は型を推論する。index外の値を参照しようとすると、コンパイルエラーを得ることができる。
 */
const t1 = [false] as [boolean];
const t2 = [false, 1] as [boolean, number];
const t3 = [false, 1, "2"] as [boolean, number, string];

const v3_0 = t3[0];
const v3_1 = t3[1];
const v3_2 = t3[2];
const v3_3 = t3[3]; // Error

/**
 * 3-3 objectの型推論
 * objectの変数宣言時に初期値を与えることで、型推論が適用される。保持するプロパティがLiteralTypesとして推論されるためには、アサーションを使用する
 */
// const obj = {
//   foo: false,
//   bar: 1,
//   baz: "2"
// }
// obj["foo"] = true;

const obj = {
  foo: false as false,
  bar: 1 as 1,
  baz: "2" as "2"
}
obj["foo"] = true;

/**
 * 3-4 関数の戻り型推論
 * 「定義内容の型推論を優先するのか」「定義内容を宣言で制約するのか」は状況に応じてプログラマーの判断で戻り型アノテーションの付与を決定する
 */
function getPriceLabel(amount: number, tax: number) {
  return `¥${amount * tax}`
}

function log(message: string) {
  console.log(message)
}

function getStringValue(value: number, prefix?: string): string {
  if (prefix === undefined) return value // Error
  return `${prefix} ${value}`
}

/**
 * 3-4-2 処理内容により変わる型推論
 * 関数内に条件分岐がある場合など、戻り型が曖昧な物も、定義内容に応じてUnionTypesで型推論が適用される
 */
function getScore(score: number) {
  if (score < 0 || score > 100) return null
  return score
}

function getScoreAmount(score: "A" | "B" | "C") {
  switch (score) {
    case "A":
      return 100
    case "B":
      return 60
    case "C":
      return 30
  }
}

/**
 * 3-5 Promiseの型推論
 * Promiseを含むコードの中では、記述を少し追加する必要がある
 */
// function wait(duration: number) {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(`${duration}ms passed`), duration)
//   })
// }
// wait(1000).then(res => {}) // resは{}型

/**
 * 3-5-2 resolve関数の引数を指定する
 * resolve関数の引数を明示的に指定することにより、先にあげた問題が解決される。
 */

// 関数戻り型アノテーションで指定する方法
// function wait(duration: number): Promise<string> {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(`${duration}ms passed`), duration);
//   })
// }
// wait(1000).then(res => { }) // resはstring型

// Promiseインスタンス作成時に型を付与する方法
function wait(duration: number) {
  return new Promise<string>(resolve => {
    setTimeout(() => resolve(`${duration}ms passed`), duration);
  })
}
wait(1000).then(res => { }) // resはstring型

/**
 * 3-5-3 async関数
 * asunc関数の中でawaitすることでも、適切な型推論が行われる
 */
async function queue() {
  const message = await wait(1000) // const message: string
  return message
}

/**
 * 3-6 import構文の型推論
 * 外部モジュールで定義された変数や関数は、型付与の有無を問わず、そのまま型推論の対象となる。このような振る舞いはimport構文を用いた場合に限られ、require構文では型推論を行わない
 * (test.ts, index.tsを参照)
 */

/**
 * 3-7 JSONの型推論
 * JSONファイルを外部モジュールとしてインポートし、定義内容を型推論できる。利用するためには、tsconfig.jsonのresolveJsonModuleとesModuleInteropをtrueに設定する
 * (users.jsonを参照)
 */