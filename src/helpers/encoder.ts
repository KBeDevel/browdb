import { Buffer } from 'buffer'
import type { Primitive } from '../types'

export function encode (value: Primitive): string {
  return Buffer.from(String(value)).toString('base64')
}
