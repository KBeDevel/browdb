export type Primitive = string | boolean | number

export type PrimitiveRecord<ValueType = Primitive | unknown> = Record<string, ValueType>

export type Exclusive<K = PrimitiveRecord, P = PrimitiveRecord> = ({
  [T in keyof K]: K[T]
} & {
  [N in keyof P]?: never
}) | ({
  [T in keyof K]?: never
} & {
  [N in keyof P]: P[N]
})

export type SingleCookieSet = {
  keySet: {
    keyName: string
    assignValue: Primitive
  }
}

export type MultipleCookieSet = {
  values: PrimitiveRecord
}

export type CookieSetConfig = {
  expiresTime?: Date | number
  path?: string
}

export type CookieSetMeta = {
  encodeValues?: boolean
}

export type CookieSet<T = Exclusive<SingleCookieSet, MultipleCookieSet>> = CookieSetConfig & CookieSetMeta & T

export type StorageContext = 'local' | 'session'

export type BrowserStorageConfig = {
  context: StorageContext
}
