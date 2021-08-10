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
