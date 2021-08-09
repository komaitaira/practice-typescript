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
// type User = {
//   name: string
//   [k: string]: any // [k: string]をインデックスシグネチャという
// }
const userA: User = {
  name: "Taro",
  age: 26
}
const x = userA.name
const y = userA.age

/**
 * 4-3-1
 * typeof type guards
 */

function reset(value: number | string | boolean) {
  const v0 = value
  if (typeof value === "number") {
    const v1 = value
    return 0
  }
  const v2 = value
  if (typeof value === "string") {
    const v3 = value
    return ""
  }
  const v4 = value
  return false
}
console.log(reset(1))
console.log(reset("1"))
console.log(reset(true))

/**
 * 4-3-2
 * in type guards
 */
type User = { gender: string }
type UserA = User & { name: string }
type UserB = User & { age: number; graduate: string }

function judgeUserType(user: UserA | UserB) {
  if ("gender" in user) {
    const u0 = user
    console.log("user type is UserA | UserB")
  }
  if ("name" in user) {
    const u1 = user
    console.log("user type is UserA")
    return
  }
  const u2 = user
  console.log("user type is UserB")
}

/**
 * 4-3-3
 * instanceof type guards
 */
class Creature {
  breathe() {}
}
class Animal extends Creature {
  shakeTail() {}
}
class Human extends Creature {
  greet() {}
}

function action(creature: Animal | Human | Creature) {
  const c0 = creature
  c0.breathe()
  if (creature instanceof Animal) {
    const c1 = creature
    return c1.shakeTail()
  }
  const c2 = creature
  if (creature instanceof Human) {
    const c3 = creature
    return c3.greet()
  }
  const c4 = creature
  return c4.breathe()
}

