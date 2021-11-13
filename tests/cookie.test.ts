import { Cookie, CookieSet, MultipleCookieSet } from '../src/index'

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
    Cookie.delete('sessionId')
  })

  it('should register a username cookie with static method', () => {
    expect(Cookie.create(cookieConfig).check()).toBe(true)
  })

  it('should register a username cookie', () => {
    const cookie = new Cookie(cookieConfig)
    cookie.save()
    expect(cookie.check(cookieConfig.keySet.keyName)).toBe(true)
  })

  it('should register a username cookie and verify the value using the static isRegistered method', () => {
    new Cookie(cookieConfig).save()
    expect(Cookie.isRegistered(cookieConfig.keySet.keyName)).toBe(true)
  })

  it('should delete a username cookie', () => {
    const cookie = new Cookie(cookieConfig)
    cookie.save()
    expect(cookie.remove()).toBe(true)
  })

  it('should delete a username cookie using statics methods', () => {
    Cookie.create(cookieConfig)
    expect(Cookie.delete(cookieConfig.keySet.keyName)).toBe(true)
  })

  it ('should obtain a saved cookie using static methods', () => {
    Cookie.create(cookieConfig)
    expect(Cookie.obtain(cookieConfig.keySet.keyName)).toBeTruthy()
  })

  it('should save a set of cookies', () => {
    const cookie: CookieSet<MultipleCookieSet<string>> = {
      values: {
        [cookieConfig.keySet.keyName]: cookieConfig.keySet.assignValue as string,
        sessionId: 'anonymousSession'
      }
    }
    const instance = Cookie.create(cookie)
    expect(instance.check()).toBe(true)
  })

  it('should save a set of cookies using an instance', () => {
    const cookie = new Cookie({
      values: {
        [cookieConfig.keySet.keyName]: cookieConfig.keySet.assignValue,
        sessionId: 'anonymousSession'
      }
    })
    expect(cookie.save()).toBe(true)
  })

  it('should save a cookie without expiration time and evaluate it as not expired', () => {
    const cookie = new Cookie(cookieConfig)
    cookie.save()
    expect(cookie.isExpired()).toBe(false)
  })

  it('should save a cookie with a complete configuration', () => {
    const futureDate = new Date()
    futureDate.setMonth(futureDate.getMonth() + 1)
    const cookie = new Cookie({
      ...cookieConfig,
      domain: window.location.hostname,
      encodeValues: true,
      expiresTime: futureDate,
      maxAge: parseInt(((Date.now() / 1000) + 5000).toFixed(0)),
      path: '/',
      sameSite: 'Strict',
      secure: false
    })
    expect(cookie.save()).toBe(true)
  })

  // TODO: Set-up an HTTPS testing instance
  // it('should save a cookie with a complete configuration in HTTPS mode', () => {
  //   const futureDate = new Date()
  //   futureDate.setMonth(futureDate.getMonth() + 1)
  //   const cookie = new Cookie({
  //     ...cookieConfig,
  //     domain: window.location.hostname,
  //     encodeValues: true,
  //     expiresTime: futureDate,
  //     maxAge: parseInt(((Date.now() / 1000) + 5000).toFixed(0)),
  //     path: '/',
  //     sameSite: 'Strict',
  //     secure: true
  //   })
  //   expect(cookie.save()).toBe(true)
  // })

  it('should save a cookie set using encoding', () => {
    const cookie = new Cookie({
      values: {
        [cookieConfig.keySet.keyName]: cookieConfig.keySet.assignValue,
        anotherCookieName: 'sampleValue'
      },
      domain: window.location.hostname,
      encodeValues: true,
      maxAge: parseInt(((Date.now() / 1000) + 5000).toFixed(0)),
      path: '/',
      sameSite: 'Strict'
    })
    expect(cookie.save()).toBe(true)
  })

  it('should not save an expired cookie', () => {
    const pastDate = new Date()
    pastDate.setMonth(pastDate.getMonth() - 1)
    const cookie = new Cookie({
      ...cookieConfig,
      expiresTime: pastDate
    })
    cookie.save()
    expect(cookie.isExpired()).toBe(true)
  })
})
