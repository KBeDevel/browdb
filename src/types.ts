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
 * @see https://developer.mozilla.org/en-US/docs/web/api/document/cookie to check the documentation which this type is based in
 */
export type CookieSetConfig = {
  /**
   * Explicit expiration date or timestamp for a cookie
   */
  expiresTime?: Date | number
  /**
   * Maximum age of a cookie in seconds
   */
  maxAge?: number
  /**
   * If not specified, defaults to the current path of the current document location.
   */
  path?: string
  /**
   * If not specified, this defaults to the host portion of the current document location. Contrary to earlier specifications, leading dots in domain names are ignored, but browsers may decline to set the cookie containing such dots. If a domain is specified, subdomains are always included. 
   */
  domain?: string
  /**
   * Secure cookie to only be transmitted over secure protocol as https. Before Chrome 52, this flag could appear with cookies from http domains
   */
  secure?: boolean
  /**
   * Prevents the browser from sending this cookie along with cross-site requests. Possible values are `lax`, `strict` or `none`
   * 
   * `lax`: will send the cookie for all same-site requests and top-level navigation GET requests. This is sufficient for user tracking, but it will prevent many Cross-Site Request Forgery (CSRF) attacks. This is the default value in modern browsers.
   * 
   * `strict`: value will prevent the cookie from being sent by the browser to the target site in all cross-site browsing contexts, even when following a regular link.
   * 
   * `none`: value explicitly states no restrictions will be applied. The cookie will be sent in all requests—both cross-site and same-site.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#samesite_cookies
   */
  sameSite?: 'Lax' | 'Strict' | 'None'
}

/**
 * Configure the Browdb cookie behavior
 */
export type CookieSetMetaConfig = {
  /**
   * Set to true if you need to save the value as a Base64 encoded string
   */
  encodeValues?: boolean
}

/**
 * A configuration scheme type for a `Cookie` constructor
 */
export type CookieSet<T = Exclusive<SingleCookieSet, MultipleCookieSet>> = CookieSetConfig & CookieSetMetaConfig & T

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
