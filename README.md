# Semint

Semint is a small lib to encode/decode SemVer to/from integer.

# Install

```bash
$ npm install -S @redtea/semint
```

# Usage

```js
// lib also support umd
import {encode, decode, isValid} from 'semint'; 

// first argument is semver in string representation and second argument is max decimals numbers to encode one part of semver
encode('1.1.1', 1); // 1 1 1
encode('1.1.1', 2); // 1 01 01
encode('1.1.1', 3); // 1 001 001
encode('999.999.999', 3); // 999 999 999

// first argument is semver in number representation and second argument is the same as for `encode`
decode(999999999, 3); // '999.999.999'

// `encode` and `decode` function use `isValid` to validate input and throw error if it is not valid
isValid(999999999, 3); // true
isValid(999999999, 1); // false
isValid('999.999.999', 3); // true
isValid('999.999.999', 1); // false
isValid('999.999.999-1', 3); // false
isValid('999.999.', 3); // false
```

