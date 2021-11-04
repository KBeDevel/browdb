/**
 * Generates a cookie string fragment key-value pair
 * @param key - The cookie name
 * @param value - The cookie content string/text
 * @returns a formatted cookie string.
 * @example createCookieFragment('username', 'John Doe') // 'username=John Doe;'
 */
export function createCookieFragment (key: string, value: string): string {
  return `${key}=${value};`
}
