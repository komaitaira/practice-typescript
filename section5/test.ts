/**
 * 5-1-1 互換性の基礎
 * 詳細な型に抽象的な型を代入するとコンパイルエラーになる
 */
let s1: "test" = "test"
let s2: string = s1
let s3: string = "test"
let s4: "test" = s3