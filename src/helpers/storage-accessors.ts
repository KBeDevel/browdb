import type { StorageContext } from '../types'

export const STORAGES: Record<StorageContext, Storage> = {
  'local': window.localStorage,
  'session': window.sessionStorage
}
