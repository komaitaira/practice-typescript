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