/** Makes each property optional and turns each leaf property into any, allowing for type overrides by narrowing any. */
type DeepPartialAny<T> = {
  [P in keyof T]?: T[P] extends AnyObject ? DeepPartialAny<T[P]> : any
}

type AnyObject = Record<string, any>

export {}

declare global {
  export type ModifyDeep<A extends AnyObject, B extends DeepPartialAny<A>> = {
    [K in keyof A]: B[K] extends never
      ? A[K]
      : B[K] extends AnyObject
      ? ModifyDeep<A[K], B[K]>
      : B[K]
  } & (A extends AnyObject ? Omit<B, keyof A> : A)

  export type Modify<T, R> = Omit<T, keyof R> & R
}
