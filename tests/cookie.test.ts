import { Cookie, CookieSet } from '../src/index'

describe('Cookie set', () => {
  const cookieConfig: CookieSet = {
    keySet: {
      keyName: 'username',
      assignValue: 'John Doe'
    },
    encodeValues: true,
  }

  it('should register a username cookie with static method', () => {
    expect(Cookie.create(cookieConfig).check()).toBe(true)
  })

  it('should register a username cookie', () => {
    expect(new Cookie(cookieConfig).save().check()).toBe(true)
  })

  it('should register a username cookie and verify the value using the static isRegistered method', () => {
    new Cookie(cookieConfig).save()
    expect(Cookie.isRegistered(cookieConfig.keySet.keyName)).toBe(true)
  })

  it('should delete a username cookie', () => {
    Cookie.create(cookieConfig)
    Cookie.delete(cookieConfig.keySet.keyName)
    expect(Cookie.obtain(cookieConfig.keySet.keyName)).toBeFalsy()
  })
})
