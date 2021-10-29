import type { BrowserStorageConfig, StorageContext } from '../types'
import { encode as encodeValue } from '../helpers/encoder'
import { STORAGES } from '../helpers/storage-accessors'
import { DEFAULT_STORAGE_CONTEXT } from '../utils/constants'

export default class BrowserStorage {
  private _interface!: Storage

  constructor (
    config: BrowserStorageConfig
  ) {
    this._interface = STORAGES[config.context]
  }

  public isRegistered (key: string) {
    return !!this._interface.getItem(key)
  }

  public getItem<ExpectedItem = string | null> (key: string) {
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

  public setItem (object: { key: string, value: string }, encode?: boolean): boolean {
    this._interface.setItem(object.key,  encode ? encodeValue(object.value) : object.value)
    return this.isRegistered(object.key)
  }

  public removeItem (key: string): boolean {
    this._interface.removeItem(key)
    return !this.isRegistered(key)
  }

  public clear () {
    this._interface.clear()
  }

  public clearAll () {
    Object.keys(STORAGES).forEach(key => {
      STORAGES[key as StorageContext].clear()
    })
  }

  public static obtainItem<ExpectedItem = string> (key: string, context = DEFAULT_STORAGE_CONTEXT) {
    return new BrowserStorage({ context }).getItem<ExpectedItem>(key)
  }

  public static saveItem (object: { key: string; value: string }, context = DEFAULT_STORAGE_CONTEXT) {
    return new BrowserStorage({ context }).setItem(object)
  }

  public static removeItem (key: string, context = DEFAULT_STORAGE_CONTEXT) {
    return new BrowserStorage({ context }).removeItem(key)
  }
}
