import { BrowserStorage, BrowserStorageSet } from '../src/index'

describe('Storage set', () => {
  const storageSet: BrowserStorageSet = { key: 'username', value: 'John Doe' }

  beforeEach(() => {
    const browdbLocalStorage = new BrowserStorage({ context: 'local' })
    const browdbSessionStorage = new BrowserStorage({ context: 'session' })
    browdbLocalStorage.clearAll()
    browdbSessionStorage.clearAll()
  })

  it('should save a key/value set in session storage', () => {
    const browserStorage = new BrowserStorage({ context: 'session' })
    expect(browserStorage.setItem(storageSet, true)).toBeTruthy()
    expect(browserStorage.isRegistered('username')).toBe(true)
  })

  it('should save a key/value set in local storage', () => {
    const browserStorage = new BrowserStorage({ context: 'local' })
    expect(browserStorage.setItem(storageSet, false)).toBeTruthy()
    expect(browserStorage.isRegistered('username')).toBe(true)
  })

  it('should save a key/value set in session storage', () => {
    const browserStorage = new BrowserStorage({ context: 'session' })
    browserStorage.setItem(storageSet, true)
    expect(browserStorage.getItem<string>(storageSet.key)).toBeTruthy()
  })

  it('should check a non-existence storage set key as a falsy object', () => {
    expect(BrowserStorage.obtainItem<null>('nonExistenceKey')).toBeNull()
  })

  it('should save a key/value set using static method', () => {
    expect(BrowserStorage.saveItem(storageSet, 'local', true)).toBe(true)
  })

  it('should get a local key/value set using static method', () => {
    BrowserStorage.saveItem(storageSet, 'local', true)
    expect(BrowserStorage.obtainItem(storageSet.key)).toBeTruthy()
  })

  it('should remove a local key/value set using static method and default config', () => {
    BrowserStorage.saveItem(storageSet)
    expect(BrowserStorage.removeItem(storageSet.key)).toBe(true)
  })

  it('should remove a session key/value set using static method', () => {
    BrowserStorage.saveItem(storageSet, 'session', true)
    expect(BrowserStorage.removeItem(storageSet.key, 'session')).toBe(true)
  })

  it('should erase an specific object', () => {
    const browserStorage = new BrowserStorage({ context: 'local' })
    expect(browserStorage.setItem(storageSet, false)).toBeTruthy()
    expect(browserStorage.removeItem('username')).toBeTruthy()
    expect(browserStorage.isRegistered('username')).toBe(false)
  })

  it('should erase all session object', () => {
    const browserStorage = new BrowserStorage({ context: 'session' })
    expect(browserStorage.setItem(storageSet, true)).toBeTruthy()
    browserStorage.clear()
    expect(browserStorage.isRegistered('username')).toBe(false)
  })

  it('should erase all local object', () => {
    const browserStorage = new BrowserStorage({ context: 'local' })
    expect(browserStorage.setItem(storageSet, true)).toBeTruthy()
    browserStorage.clear()
    expect(browserStorage.isRegistered('username')).toBe(false)
  })
})
