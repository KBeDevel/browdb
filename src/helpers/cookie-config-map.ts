import { CookieSetConfig } from '../types'

/**
 * Maps the cookie string elements
 */
export const CookieConfigReferencesMap: Record<keyof CookieSetConfig, string> = {
  expiresTime: 'expires',
  maxAge: 'max-age',
  domain: 'domain',
  path: 'path',
  sameSite: 'SameSite',
  secure: 'Secure'
}
