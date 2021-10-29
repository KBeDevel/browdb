import { BrowserStorage } from '../src/index'

describe('Storage set', () => {
  it('should save a key/value set in session storage', () => {
    const browserStorage = new BrowserStorage({ context: 'session' })
    expect(browserStorage.setItem({ key: 'username', value: 'John Doe' }, true)).toBeTruthy()
    expect(browserStorage.isRegistered('username')).toBe(true)
  })

  it('should save a key/value set in local storage', () => {
    const browserStorage = new BrowserStorage({ context: 'local' })
    expect(browserStorage.setItem({ key: 'username', value: 'John Doe' }, true)).toBeTruthy()
    expect(browserStorage.isRegistered('username')).toBe(true)
  })

  it('should erase an specific object', () => {
    const browserStorage = new BrowserStorage({ context: 'local' })
    expect(browserStorage.setItem({ key: 'username', value: 'John Doe' }, true)).toBeTruthy()
    expect(browserStorage.removeItem('username')).toBeTruthy()
    expect(browserStorage.isRegistered('username')).toBe(false)
  })

  it('should erase all session object', () => {
    const browserStorage = new BrowserStorage({ context: 'session' })
    expect(browserStorage.setItem({ key: 'username', value: 'John Doe' }, true)).toBeTruthy()
    browserStorage.clear()
    expect(browserStorage.isRegistered('username')).toBe(false)
  })

  it('should erase all local object', () => {
    const browserStorage = new BrowserStorage({ context: 'local' })
    expect(browserStorage.setItem({ key: 'username', value: 'John Doe' }, true)).toBeTruthy()
    browserStorage.clear()
    expect(browserStorage.isRegistered('username')).toBe(false)
  })
})
