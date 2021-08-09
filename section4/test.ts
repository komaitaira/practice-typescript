/**
 * 4-1-1 関数でNullable型を使う
 * 引数にnumber | null型を付与する
 */
// function getFormattedValue(value: number | null) {
//   if (value === null) return '-- pt' // 追加することで、string型の値を返すことが確約される
//   return `${value.toFixed(1)} pt`
// }
// console.log(getFormattedValue(0.1))
// console.log(getFormattedValue(0))
// console.log(getFormattedValue(null)) // Error(nullに対してtoFixedを呼び出そうとするとエラー)

/**
 * 4-1-2 関数の引数をオプションにする
 * 必ず引数を指定しなければならない
 */
// function greet(name: string) {
//   return `Hello ${name}`
// }
// console.log(greet()); // Error
// console.log(greet("Taro"));

// // 必ず与える必要がないことを明示するためには「name?」のように引数名の後に「?」を付与する
// function greet(name?: string) {
//   return `Hello ${name}`
// }
// console.log(greet()); // Hello undefined
// console.log(greet("Taro"));

// 与えられない可能性があるnameに対し、toUpperCase関数を実行しようとするとエラー
function greet(name?: string) {
  if (name === undefined) return "Hello"
  return `Hello ${name.toUpperCase()}`
}
console.log(greet()); // Hello
console.log(greet("Taro"));

// 上記のような早期returnをガード節やTypeGuardを呼ぶ


/**
 * 4-1-3 デフォルト引数の型推論
 * 
 */
function getFormattedValue(value: number, unit = "pt") {
  return `${value.toFixed(1)} ${unit.toUpperCase()}`
}
console.log(getFormattedValue(100))
console.log(getFormattedValue(100, "kg"))
console.log(getFormattedValue(100, 0))

/**
 * 4-1-4 オブジェクトの型安全
 * 全てのプロパティがオプショナルな型は「WeakType」と呼ぶ
 */
// type User = {
//   age?: number
//   name?: string
// }
function registerUser(user: User) { }

// 型にはないプロパティを持つオブジェクト
const maybeUser = {
  age: 26,
  name: "Taro",
  gender: "male"
}
// 型と一致するプロパティを一つも持たないオブジェクト
const notUser = {
  gender: "male",
  graduate: "Tokyo"
}
registerUser(maybeUser)
registerUser(notUser)  // Error

/**
 * 4-1-5 読み込み専用プロパティ
 * オブジェクトが保持する値を読み込み専用としたい場合は、型プロパティ名の前にreadonlyシグネチャを付与する
 */
type State = {
  readonly id: number
  name: string
}
const state: State = {
  id: 1,
  name: "Taro"
}
state.name = "Hanako"
state.id = 2 // Error


/**
 * 4-2-1 アップキャスト・ダウンキャスト
 * constでオブジェクトは宣言されていてもプロパティは再代入可能であるため、型を固定できない。
 */
// const defaultTheme = {
//   backgroundColor: "orange",
//   borderColor: "red"
// }
// ダウンキャスト 推論される型よりも詳細な型が自明な場合、型を確約するためにアサーションで型宣言を行う。抽象的な型から詳細な型を付与することをダウンキャストという
const defaultTheme = {
  backgroundColor: "orange" as "orange",
  borderColor: "red" as "red"
}
defaultTheme.backgroundColor = "blue"; // Error

// 反対に抽象度をあげる型の付与をアップキャストという

/**
 * 4-2-2
 * オブジェクトに動的に値を追加する
 */
type User = {
  name: string
  [k: string]: any // [k: string]をインデックスシグネチャという
}
const userA: User = {
  name: "Taro",
  age: 26
}
const x = userA.name
const y = userA.age

