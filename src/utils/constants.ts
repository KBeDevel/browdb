import type { StorageContext } from '../types'

/**
 * A constant equivalent to `''`
 */
export const EMPTY_STRING = String()

/**
 * A constant equivalent to `' '`
 */
export const WHITE_SPACE = String(' ')

/**
 * A constant equivalent to `';'`
 */
export const SEMI_COLON = String(';')

/**
 * A constant equivalent to `'='`
 */
export const EQUALS_OPERATOR = String('=')

/**
 * A constant equivalent to an `StorageContext` value. By default, its value is `'local'`
 */
export const DEFAULT_STORAGE_CONTEXT: StorageContext = 'local'
