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