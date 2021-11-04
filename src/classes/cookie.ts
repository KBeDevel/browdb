import { createCookieFragment } from '../helpers/cookie-generator'
import type { PrimitiveRecord, CookieSet } from '../types'
import { encode } from '../helpers/encoder'
import { EMPTY_STRING, EQUALS_OPERATOR, SEMI_COLON, WHITE_SPACE } from '../utils/constants'

/**
 * A browser cookie
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
   * Register a cookie according to a given cookie configuration
   * @param settings - Values to be saved and its processing configuration
   * @returns an instance of a Browdb Cookie
   */
  public static create (settings: CookieSet): Cookie {
    return new Cookie(settings).save()
  }

  /**
   * Get a cookie value according to a given cookie name
   * @param cookieName - an string cookie name
   * @returns the current cookie value as a string. By default, if the cookie is not registered, this method will return
   * an empty string
   */
  public static obtain (cookieName: string): string {
    return document.cookie.split(SEMI_COLON + WHITE_SPACE).find(
      row => row.startsWith(cookieName + EQUALS_OPERATOR)
    )?.split(EQUALS_OPERATOR)[1] ?? EMPTY_STRING
  }

  /**
   * Checks if a given cookie name is already saved in the current browser or not
   * @param cookieName - an string cookie name
   * @returns an string search result validation
   */
  public static isRegistered (cookieName: string): boolean {
    return document.cookie.split(SEMI_COLON).some((item) => item.trim().startsWith(cookieName + EQUALS_OPERATOR))
  }

  /**
   * Remove a cookie from the current browser environment according to a given cookie name
   * @param cookieName - an string cookie name
   */
  public static delete (cookieName: string): void {
    document.cookie = [
      [
        createCookieFragment(cookieName, EMPTY_STRING),
        createCookieFragment('max-age', String(0))
      ].join(EMPTY_STRING)
    ].join(EMPTY_STRING)
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
      return Cookie.isRegistered(cookieName)
    }
    if (this._settings.keySet) {
      return Cookie.isRegistered(this._settings.keySet.keyName)
    } else {
      return Object.keys(this._settings.values).filter(key => !Cookie.isRegistered(key)).length === 0
    }
  }

  /**
   * Save the current cookie set
   * @returns the current cookie instance object
   */
  public save (): Cookie {
    const dataToSave = {
      values: this._settings.encodeValues
        ? this.getEncodedValues()
        : (this._settings.keySet || this._settings.values),
      expirationDate: typeof this._settings.expiresTime === 'number'
        ? new Date(this._settings.expiresTime).toUTCString()
        : this._settings.expiresTime?.toUTCString(),
      usePath: this._settings.path
    }
    Object.keys(dataToSave.values).forEach(key => {
      const cookieFragments = [ createCookieFragment(key, String(dataToSave.values[key])) ]
      if (dataToSave.expirationDate)
        cookieFragments.push(createCookieFragment('expires', dataToSave.expirationDate))
      if (dataToSave.usePath)
        cookieFragments.push(createCookieFragment('path', dataToSave.usePath))
      document.cookie = cookieFragments.join(EMPTY_STRING)
    })
    return this
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
}
