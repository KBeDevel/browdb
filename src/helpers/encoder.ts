import { Buffer } from 'buffer'
import type { Primitive } from '../types'

/**
 * Generates a Base64 ASCII string from a given value
 * @param value - primitive value to be encoded as Base64
 * @returns a formatted base64 ASCII string
 */
export function encode (value: Primitive): string {
  return Buffer.from(String(value)).toString('base64')
}
