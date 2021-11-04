/**
 * Basic data type
 */
export type Primitive = string | boolean | number

/**
 * A type for dictionaries of primitive values
 */
export type PrimitiveRecord<ValueType = Primitive | unknown> = Record<string, ValueType>

/**
 * Exclusive OR type definition
 */
export type Exclusive<K = PrimitiveRecord, P = PrimitiveRecord> = ({
  [T in keyof K]: K[T]
} & {
  [N in keyof P]?: never
}) | ({
  [T in keyof K]?: never
} & {
  [N in keyof P]: P[N]
})

/**
 * A unitary key-value set
 */
export type SingleCookieSet = {
  keySet: {
    keyName: string
    assignValue: Primitive
  }
}

/**
 * A type definition for key-value dictionaries
 */
export type MultipleCookieSet = {
  values: PrimitiveRecord
}

/**
 * Settings of a Browdb cookie instance scheme
 */
export type CookieSetConfig = {
  expiresTime?: Date | number
  path?: string
  encodeValues?: boolean
}

/**
 * A configuration scheme type for a `Cookie` constructor
 */
export type CookieSet<T = Exclusive<SingleCookieSet, MultipleCookieSet>> = CookieSetConfig & T

/**
 * Tuple for browser storage reference accessor
 */
export type StorageContext = 'local' | 'session'

/**
 * A configuration scheme type for a `BrowserStorage` constructor
 */
export type BrowserStorageConfig = {
  context: StorageContext
}

/**
 * A key-value set for storage handling purposes
 */
export type BrowserStorageSet = {
  key: string
  value: string
}
