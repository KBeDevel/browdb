import { Buffer } from 'buffer'
import type { Primitive } from '../types'

export function encode (value: Primitive) {
  return Buffer.from(String(value)).toString('base64')
}
