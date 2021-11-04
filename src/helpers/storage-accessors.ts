import type { StorageContext } from '../types'

/**
 * Browser storage dictionary
 */
export const STORAGES: Record<StorageContext, Storage> = {
  'local': window.localStorage,
  'session': window.sessionStorage
}
