import { createCookieFragment } from '../helpers/cookie-generator'
import type { PrimitiveRecord, CookieSet } from '../types'
import { encode } from '../helpers/encoder'
import { EMPTY_STRING, EQUALS_OPERATOR, SEMI_COLON, WHITE_SPACE } from '../utils/constants'

export default class Cookie {
  private _settings!: CookieSet

  constructor (
    settings: CookieSet
  ) {
    this._settings = settings
  }

  public static create (settings: CookieSet): Cookie {
    return new Cookie(settings).save()
  }

  public static obtain (cookieName: string): string {
    return document.cookie.split(SEMI_COLON + WHITE_SPACE).find(
      row => row.startsWith(cookieName + EQUALS_OPERATOR)
    )?.split(EQUALS_OPERATOR)[1] ?? EMPTY_STRING
  }

  public static isRegistered (cookieName: string): boolean {
    return document.cookie.split(SEMI_COLON).some((item) => item.trim().startsWith(cookieName + EQUALS_OPERATOR))
  }

  public static delete (cookieName: string): void {
    document.cookie = [
      createCookieFragment(cookieName, EMPTY_STRING)
    ].join(EMPTY_STRING)
  }

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
