# Browdb

A simple JavaScript/TypeScript library to handle browser cookies and storage

Note: this library **is not compatible** for server-side use

[![CircleCI](https://circleci.com/gh/KBeDevel/browdb/tree/main.svg?style=svg)](https://circleci.com/gh/KBeDevel/browdb/tree/main) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/kbedevel/browdb?style=flat-square) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/3580b90a7bf44e68b71d8e45166d6d0c)](https://www.codacy.com/gh/KBeDevel/browdb/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KBeDevel/browdb&amp;utm_campaign=Badge_Grade) [![Codacy Badge](https://app.codacy.com/project/badge/Coverage/3580b90a7bf44e68b71d8e45166d6d0c)](https://www.codacy.com/gh/KBeDevel/browdb/dashboard?utm_source=github.com&utm_medium=referral&utm_content=KBeDevel/browdb&utm_campaign=Badge_Coverage)

## How to use

### Installation

```sh
npm install browdb
```

or

```sh
yarn add browdb
```

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
