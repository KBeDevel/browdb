import { createCookieFragment } from '../helpers/cookie-generator'
import type { PrimitiveRecord, CookieSet, CookieSetConfig, Primitive } from '../types'
import { encode } from '../helpers/encoder'
import { EMPTY_STRING, EQUALS_OPERATOR, SEMI_COLON, WHITE_SPACE } from '../utils/constants'
import { CookieConfigReferencesMap } from '../helpers/cookie-config-map'

/**
 * A browser cookie powered with Browdb to make the management easier
 */
export default class Cookie {
  private _settings!: CookieSet

  constructor (
    /**
     * Values to be saved and its processing configuration
     */
    settings: CookieSet
  ) {
    this._settings = settings
  }

  /**
   * Checks if the current cookie configuration is already expired or not
   * @returns a timestamp range validation result
   */
  public isExpired (): boolean {
    if (this._settings.expiresTime) {
      const expirationTimestamp = this._settings.expiresTime instanceof Date
        ? Math.round(this._settings.expiresTime.getTime())
        : this._settings.expiresTime
      return expirationTimestamp <= Date.now()
    }
    return false
  }

  /**
   * Validates if the current cookies or an specific cookie is registered
   * @param cookieName - an string cookie name
   * @returns dynamic search validation of one or more cookies
   */
  public check (cookieName?: string): boolean {
    if (cookieName) {
      return Cookie.searchCookie(cookieName)
    }
    if (this._settings.keySet) {
      return Cookie.searchCookie(this._settings.keySet.keyName)
    } else {
      return Object.keys(this._settings.values).filter(key => !Cookie.searchCookie(key)).length === 0
    }
  }

  /**
   * Save the current cookie set.
   * 
   * If the configuration of the cookie specifies an already expired time set, the cookie set will **not** be saved
   * @returns `true` if the cookie set is successfully registered. If not, returns `false`
   */
  public save (): boolean {
    const cookies = this._settings.encodeValues
      ? this.getEncodedValues()
      : (this._settings.keySet || this._settings.values)
    const cookieConfig: CookieSetConfig = {
      domain: this._settings.domain,
      expiresTime: typeof this._settings.expiresTime === 'number'
        ? new Date(this._settings.expiresTime)
        : this._settings.expiresTime,
      maxAge: this._settings.maxAge,
      path: this._settings.path,
      sameSite: this._settings.sameSite,
      secure: this._settings.secure
    }
    Object.keys(cookies).forEach(cookie => {
      // Prevents exception when the implementation force to use an object as value
      const cookieValue = typeof cookies[cookie] === 'object' ? JSON.stringify(cookies[cookie]) : cookies[cookie] as Primitive
      const cookieFragments = [
        createCookieFragment(cookie, String(cookieValue))
      ]

      if (cookieConfig.path)
        cookieFragments.push(createCookieFragment(CookieConfigReferencesMap.path, cookieConfig.path))

      if (cookieConfig.expiresTime && cookieConfig.expiresTime instanceof Date)
        cookieFragments.push(createCookieFragment(CookieConfigReferencesMap.expiresTime, cookieConfig.expiresTime.toUTCString()))

      if (cookieConfig.domain)
        cookieFragments.push(createCookieFragment(CookieConfigReferencesMap.domain, cookieConfig.domain))

      if (cookieConfig.maxAge)
        cookieFragments.push(createCookieFragment(CookieConfigReferencesMap.maxAge, cookieConfig.maxAge.toString()))

      if (cookieConfig.path)
        cookieFragments.push(createCookieFragment(CookieConfigReferencesMap.path, cookieConfig.path))

      if (cookieConfig.sameSite)
        cookieFragments.push(createCookieFragment(CookieConfigReferencesMap.sameSite, cookieConfig.sameSite))
      
      if (cookieConfig.secure)
        cookieFragments.push(createCookieFragment(CookieConfigReferencesMap.secure))

      const cookieString = cookieFragments.join(EMPTY_STRING)

      // Now, register the cookie in the current document cookie
      document.cookie = cookieString
    })
    return this.check()
  }

  /**
   * Remove all the cookie set configuration from the current document
   * @returns `true` if all the specified cookies are removed, if not returns `false`
   */
  public remove (): boolean {
    const cookieSetRaw = this._settings.keySet
      ? Cookie.searchCookie(this._settings.keySet.keyName)
      : this._settings.values
    const cookieSet = this._settings.encodeValues
      ? this.getEncodedValues()
      : cookieSetRaw
    Object.keys(cookieSet).forEach(cookie => {
      Cookie.delete(cookie)
    })
    return !this.check()
  }

  /**
   * Encode the cookie set values as Base64 ASCII strings
   * @returns a dictionary of the encoded cookie set values
   */
  private getEncodedValues (): PrimitiveRecord<string> {
    if (this._settings.keySet) {
      const { keyName, assignValue } = this._settings.keySet
      return {
        [keyName]: encode(assignValue)
      }
    } else {
      const encoded: PrimitiveRecord<string> = { }
      Object.keys(this._settings.values).forEach(key => {
        Object.assign(encoded, { [key]: encode(encoded[key]) })
      })
      return encoded
    }
  }

  private static searchCookie (cookieIdentifier: string): boolean {
    return document.cookie.split(SEMI_COLON).some((item) => item.trim().startsWith(cookieIdentifier + EQUALS_OPERATOR))
  }

  /**
   * Register a cookie according to a given cookie configuration
   * @param settings - Values to be saved and its processing configuration
   * @returns an instance of a Browdb Cookie
   */
  public static create (settings: CookieSet): Cookie {
    const cookie = new Cookie(settings)
    cookie.save()
    return cookie
  }

  /**
   * Get a cookie value according to a given cookie name
   * @param cookieName - an string cookie name
   * @param decode - specify if the method should try to decode from Base64 the current cookie value
   * @returns the current cookie value as a string. By default, if the cookie is not registered, this method will return
   * an empty string
   */
  public static obtain (cookieName: string, decode?: boolean): string {
    const rawValue = decodeURIComponent(document.cookie.split(SEMI_COLON + WHITE_SPACE).find(
      row => row.startsWith(cookieName + EQUALS_OPERATOR)
    )?.split(EQUALS_OPERATOR)[1] ?? EMPTY_STRING)
    try {
      if (decode)
        return Buffer.from(rawValue, 'base64').toString('ascii')
    } catch (_) {
      return rawValue
    }
    return rawValue
  }

  /**
   * Checks if a given cookie name is already saved in the current browser or not
   * @param cookieName - an string cookie name
   * @returns an string search result validation
   */
  public static isRegistered (cookieName: string): boolean {
    return Cookie.searchCookie(cookieName)
  }

  /**
   * Remove a cookie from the current browser environment according to a given cookie name
   * @param cookieName - an string cookie name
   */
  public static delete (cookieName: string): boolean {
    document.cookie = [
      [
        createCookieFragment(cookieName, EMPTY_STRING),
        createCookieFragment(CookieConfigReferencesMap.maxAge, String(0))
      ].join(EMPTY_STRING)
    ].join(EMPTY_STRING)
    return !Cookie.isRegistered(cookieName)
  }
}
