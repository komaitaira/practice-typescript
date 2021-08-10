/**
 * 6-1-1 変数のGenerics
 * 型の決定を遅延できる。
 */

interface Box<T> {
  value: T
}
// const box0: Box = { value: "test" }
// const box1: Box<string> = { value: "test" }
// const box2: Box<string> = { value: "test" }

/**
 * 6-1-2 関数のGenerics
 * 関数名に続けて「<T>」のようにT型をエイリアスとして指定する
 */
function boxed<T>(props: T) {
  return { value: props }
}

// 関数定義にGenericsが含まれていても、利用時の型指定は必須ではありません。
const box0 = boxed("test")
const box1 = boxed(1)
const box2 = boxed(false)
const box3 = boxed(null)
console.log(box1)

/**
 * 6-2 Conditional Types
 * 型の互換性を条件分岐にかけ、型推論を導出する型
 */
type IsString<T> = T extends string ? true : false
type X = IsString<"test">
type Y = IsString<0>

/**
 * 6-3-1 従来の組み込み Utility Types
 * 型のライブラリ
 */

// Readonly型　Object型のプロパティを、全てreadonlyに変換し、新しい型を生成する型
interface User {
  name: string
  age: number | null
  gender: "male" | "female" | "other"
  birthplace?: string
}
type ReadonlyWrapUser = Readonly<User>

// Partial型 Object型のプロパティを全てoptionalに変換し、新しい型を生成する型
type PartialWrapUser = Partial<User>

// Required型 Object型のプロパティから、全てoptionalを取り除き、新しい型を生成する型
type RequiredWrapUser = Required<User>

// Record型 第一Genericsに指定したプロパティ名称で、新しいObjectを生成する型
type UserRecord = Record<"user", User>

// Pick型 第二Genericsに指定した名称のプロパティ型を、第一Genericsに指定した型から抽出し、新しいObjectを生成する型
type UserGender = Pick<User, "gender">

// Omit型 第二Genericsに指定した名称のプロパティ型を、第一Genericsから取り除き、新しいObject型を生成する型
type WithoutBirthplace = Omit<User, "birthplace">