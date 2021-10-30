import { Cookie, CookieSet } from '../src/index'

describe('Cookie set', () => {
  const cookieConfig: CookieSet = {
    keySet: {
      keyName: 'username',
      assignValue: 'John Doe'
    },
    encodeValues: true,
  }

  beforeEach(() => {
    Cookie.delete(cookieConfig.keySet.keyName)
    Cookie.delete('anonymousSession')
  })

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

  it('should save a set of cookies', () => {
    Cookie.create({
      values: {
        [cookieConfig.keySet.keyName]: cookieConfig.keySet.assignValue,
        sessionId: 'anonymousSession'
      }
    })
    expect(Cookie.obtain(cookieConfig.keySet.keyName)).toBeTruthy()
    expect(Cookie.obtain('sessionId')).toBeTruthy()
  })

  it('should save a set of cookies using an instance', () => {
    const cookie = new Cookie({
      values: {
        [cookieConfig.keySet.keyName]: cookieConfig.keySet.assignValue,
        sessionId: 'anonymousSession'
      }
    })
    expect(cookie.save().check()).toBeTruthy()
  })

  it('should save an expired cookie', () => {
    const futureDate = new Date()
    futureDate.setMonth(futureDate.getMonth() - 1)
    const cookie = new Cookie({
      ...cookieConfig,
      expiresTime: futureDate
    })
    expect(cookie.save().isExpired()).toBe(true)
  })
})
