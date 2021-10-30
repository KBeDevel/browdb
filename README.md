# Browdb

A simple JavaScript/TypeScript library to handle browser cookies and storage

Note: this library **is not compatible** for server-side use

## How to use

### Using browser storage

```typescript
import { BrowserStorage } from 'browdb'

const dataToSave = {
  key: 'username',
  value: 'John Doe'
}

const saveInLocalStorage = () => {
  const browdbLocalStorage = new BrowserStorage({ context: 'local' })
  browdbLocalStorage.setItem(dataToSave)
}

const saveInSessionStorage = () => {
  const browdbLocalStorage = new BrowserStorage({ context: 'session' })
  browdbLocalStorage.setItem(dataToSave)
}
```

### Using browser cookies

```typescript
import { Cookies, CookieSet } from 'browdb'

const cookieConfig: CookieSet = {
  keySet: {
    keyName: 'username',
    assignValue: 'John Doe'
  },
  encodeValues: true,
}

const saveCookie = () => {
  const cookie = new Cookie(cookieConfig)
  cookie.save()
}
```
