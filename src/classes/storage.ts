import type { BrowserStorageConfig, BrowserStorageSet, StorageContext } from '../types'
import { encode as encodeValue } from '../helpers/encoder'
import { STORAGES } from '../helpers/storage-accessors'
import { DEFAULT_STORAGE_CONTEXT } from '../utils/constants'

/**
 * A browser storage accessor. The context is defined in the object instance configuration
 */
export default class BrowserStorage {
  private _interface!: Storage

  constructor (
    config: BrowserStorageConfig
  ) {
    this._interface = STORAGES[config.context]
  }

  public isRegistered (key: string): boolean {
    return !!this._interface.getItem(key)
  }

  public getItem<ExpectedItem = string | null> (key: string): string | ExpectedItem | null {
    const obtainedItem = this._interface.getItem(key)
    if (obtainedItem) {
      try {
        return JSON.parse(obtainedItem) as ExpectedItem
      } catch (reason) {
        return obtainedItem
      }
    }
    return obtainedItem
  }

  public setItem (object: BrowserStorageSet, encode?: boolean): boolean {
    this._interface.setItem(object.key,  encode ? encodeValue(object.value) : object.value)
    return this.isRegistered(object.key)
  }

  public removeItem (key: string): boolean {
    this._interface.removeItem(key)
    return !this.isRegistered(key)
  }

  public clear (): void {
    this._interface.clear()
  }

  public clearAll (): void {
    Object.keys(STORAGES).forEach(key => {
      STORAGES[key as StorageContext].clear()
    })
  }

  public static obtainItem<ExpectedItem = string> (key: string, context = DEFAULT_STORAGE_CONTEXT): string | ExpectedItem | null {
    return new BrowserStorage({ context }).getItem<ExpectedItem>(key)
  }

  public static saveItem (object: BrowserStorageSet, context = DEFAULT_STORAGE_CONTEXT, encode?: boolean): boolean {
    return new BrowserStorage({ context }).setItem(object, !!encode)
  }

  public static removeItem (key: string, context = DEFAULT_STORAGE_CONTEXT): boolean {
    return new BrowserStorage({ context }).removeItem(key)
  }
}
